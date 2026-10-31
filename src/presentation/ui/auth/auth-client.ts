/**
 * OPTIONAL (auth). Calls the auth API from the browser: `authClient.signIn.email(...)`,
 * `authClient.signUp.email(...)`, `authClient.signOut()`. For use in client components.
 */
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();
