import pRetry from "p-retry";

export function withRetry<T>(fn: () => Promise<T>) {
  return pRetry(fn, {
    retries: 3,
    minTimeout: 150,
    maxTimeout: 800,
    factor: 2,
  });
}
