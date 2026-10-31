/**
 * The outcome of an operation that can fail. Repositories and use cases return it instead of
 * throwing, so callers must handle the failure, and a Server Action can send it to the browser.
 */
export type AppError = {
  code: string;
  /** For logs and developers. Do not show it to users. */
  message: string;
};

export type Result<T> = { ok: true; data: T } | { ok: false; error: AppError };

export function success<T>(data: T): Result<T> {
  return { ok: true, data };
}

export function failure<T = never>(code: string, message: string): Result<T> {
  return { ok: false, error: { code, message } };
}

/** Runs `work` and turns a thrown error into a failure with the given code. */
export async function resultOf<T>(
  code: string,
  work: () => Promise<T>,
): Promise<Result<T>> {
  try {
    return success(await work());
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return failure(code, message);
  }
}
