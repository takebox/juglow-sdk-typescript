// Auth internals are shared via symlink, not via package exports.
export * from './client';
export { JuglowAws as default } from './client';
export type { AwsClientOptions } from './client';
