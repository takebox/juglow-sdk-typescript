import JuGloW from '@takebox-ai/sdk/index';

const Juglow = new JuGloW();

async function main() {
  const batch_id = process.argv[2];
  if (!batch_id) {
    throw new Error('must specify a message batch ID, `yarn tsn examples/batch-results.ts msgbatch_123`');
  }

  console.log(`fetching results for ${batch_id}`);

  const results = await Juglow.messages.batches.results(batch_id);

  for await (const result of results) {
    console.log(result);
  }
}

main();
