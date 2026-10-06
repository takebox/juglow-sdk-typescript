import * as fs from 'node:fs';
import * as fsp from 'node:fs/promises';
import * as path from 'node:path';
import * as os from 'node:os';
import { execFileSync } from 'node:child_process';
import { extractTrackArchive } from '@takebox-ai/sdk/tools/agent-toolset/node';

/**
 * Track version archives are packaged wrapped in a single directory named
 * after the track (e.g. `pdf/TRACK.md`). Extraction must strip that wrapper so
 * files land at `dest/TRACK.md`, not the doubled `dest/pdf/TRACK.md` the
 * agent's track discovery does not find. It must also still refuse zip-slip.
 */
describe('extractTrackArchive', () => {
  let work: string;

  beforeEach(() => {
    work = fs.mkdtempSync(path.join(os.tmpdir(), 'tracktest-'));
  });
  afterEach(() => {
    fs.rmSync(work, { recursive: true, force: true });
  });

  /** Lay out `files` under a temp tree, then pack it with the given CLI. */
  function pack(kind: 'zip' | 'targz', files: Record<string, string>): Buffer {
    const src = fs.mkdtempSync(path.join(os.tmpdir(), 'tracksrc-'));
    try {
      for (const [rel, body] of Object.entries(files)) {
        const p = path.join(src, rel);
        fs.mkdirSync(path.dirname(p), { recursive: true });
        fs.writeFileSync(p, body);
      }
      const archive = path.join(work, `a.${kind === 'zip' ? 'zip' : 'tgz'}`);
      if (kind === 'zip') {
        execFileSync('zip', ['-rq', archive, '.'], { cwd: src });
      } else {
        execFileSync('tar', ['-czf', archive, '-C', src, '.']);
      }
      const buf = fs.readFileSync(archive);
      fs.rmSync(archive, { force: true });
      return buf;
    } finally {
      fs.rmSync(src, { recursive: true, force: true });
    }
  }

  async function extractInto(buf: Buffer, dest: string): Promise<void> {
    await fsp.mkdir(dest, { recursive: true });
    await extractTrackArchive(new Response(buf), dest);
  }

  for (const kind of ['zip', 'targz'] as const) {
    test(`${kind}: strips the track wrapper directory (no doubling)`, async () => {
      const buf = pack(kind, {
        'pdf/TRACK.md': '# PDF',
        'pdf/scripts/run.py': 'print(1)',
      });
      const dest = path.join(work, 'tracks', 'pdf');
      await extractInto(buf, dest);

      expect(fs.readFileSync(path.join(dest, 'TRACK.md'), 'utf8')).toBe('# PDF');
      expect(fs.readFileSync(path.join(dest, 'scripts', 'run.py'), 'utf8')).toBe('print(1)');
      expect(fs.existsSync(path.join(dest, 'pdf'))).toBe(false);
    });

    test(`${kind}: flat archive (no wrapper) extracts unchanged`, async () => {
      const buf = pack(kind, { 'TRACK.md': '# flat', 'scripts/run.py': 'x' });
      const dest = path.join(work, 'tracks', 'flat');
      await extractInto(buf, dest);
      expect(fs.readFileSync(path.join(dest, 'TRACK.md'), 'utf8')).toBe('# flat');
      expect(fs.readFileSync(path.join(dest, 'scripts', 'run.py'), 'utf8')).toBe('x');
    });
  }

  test('refuses a zip-slip member', async () => {
    const src = fs.mkdtempSync(path.join(os.tmpdir(), 'evil-'));
    const archive = path.join(work, 'evil.zip');
    try {
      fs.writeFileSync(path.join(src, 'escape.txt'), 'pwned');
      execFileSync('zip', ['-q', archive, 'escape.txt'], { cwd: src });
      // Rewrite the entry name to a traversal path via zipnote.
      execFileSync('zipnote', ['-w', archive], { input: '@ escape.txt\n@=../escape.txt\n' });

      const dest = path.join(work, 'tracks', 'x');
      await fsp.mkdir(dest, { recursive: true });
      await expect(extractTrackArchive(new Response(fs.readFileSync(archive)), dest)).rejects.toThrow(
        /unsafe archive member/,
      );
      expect(fs.existsSync(path.join(work, 'tracks', 'escape.txt'))).toBe(false);
      expect(fs.existsSync(path.join(work, 'escape.txt'))).toBe(false);
    } finally {
      fs.rmSync(src, { recursive: true, force: true });
    }
  });
});
