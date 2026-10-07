/**
 * Self-hosted environment runner helpers.
 *
 * - {@link WorkPoller} (`client.beta.environments.work.poller`) â€” control-plane
 *   only: claims work items and yields each one.
 * - {@link SessionToolRunner} (`client.beta.sessions.events.toolRunner`) â€” the
 *   sessions-side counterpart to `client.beta.messages.toolRunner`: dispatches
 *   local tools against a session's `agent.tool_use` events.
 * - {@link EnvironmentWorker} (`client.beta.environments.work.worker`) â€” the full
 *   composition: poll â†’ set up the workdir + tracks â†’ run a
 *   {@link SessionToolRunner} while heartbeating the work-item lease â†’
 *   force-stop on exit (unless the lease was lost to another holder) â†’ loop.
 *   Use `handleItem()` for the per-item flow when you already hold a claimed
 *   work item â€” with no arguments it reads the `HAIJUN_*` env vars that
 *   `ant worker poll --on-work` sets. The class is also exported here if you
 *   prefer `new EnvironmentWorker({ client, ... })`.
 *
 * The tool implementations themselves (`betaAgentToolset20260401` and the
 * per-tool factories) live in their own Node-only module â€” import them directly
 * from `@takebox-ai/sdk/tools/agent-toolset/node`.
 */
export {
  WorkPoller,
  EnvironmentWorker,
  SessionToolRunner,
  MANAGED_AGENTS_BETA,
  DEFAULT_MAX_IDLE_MS,
  type DispatchedToolCall,
  type WorkPollerOptions,
  type EnvironmentWorkerOptions,
  type EnvironmentWorkerTools,
  type HandleItemOptions,
  type SessionToolRunnerOptions,
} from '../../lib/environments/index';
