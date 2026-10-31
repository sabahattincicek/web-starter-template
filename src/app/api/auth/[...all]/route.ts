/**
 * OPTIONAL (auth). Serves the Better Auth API under `/api/auth/*`.
 */
import { toNextJsHandler } from "better-auth/next-js";
import { getAuth } from "@/di/container";

export function GET(request: Request) {
  return toNextJsHandler(getAuth()).GET(request);
}

export function POST(request: Request) {
  return toNextJsHandler(getAuth()).POST(request);
}
