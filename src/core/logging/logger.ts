/**
 * The app's logger. Every layer logs through it instead of calling `console`, so the output format
 * and the level live in one place. Debug logs are dropped in production.
 */
type LogLevel = "debug" | "info" | "warn" | "error";

const LEVEL_ORDER: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

function minimumLevel(): LogLevel {
  return process.env.NODE_ENV === "production" ? "info" : "debug";
}

function write(level: LogLevel, message: string, details: unknown[]): void {
  if (LEVEL_ORDER[level] < LEVEL_ORDER[minimumLevel()]) return;
  console[level](`[${level}] ${message}`, ...details);
}

export const logger = {
  debug: (message: string, ...details: unknown[]) =>
    write("debug", message, details),
  info: (message: string, ...details: unknown[]) =>
    write("info", message, details),
  warn: (message: string, ...details: unknown[]) =>
    write("warn", message, details),
  /** Pass the caught error as a detail, so its stack trace is logged. */
  error: (message: string, ...details: unknown[]) =>
    write("error", message, details),
};
