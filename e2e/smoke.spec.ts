/**
 * Proves the template's wiring in the real app: the page renders, and the auth API reaches the
 * database. Replace or extend it as features arrive.
 */
import { randomUUID } from "node:crypto";
import { expect, test } from "@playwright/test";

test("the start page shows the app name", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("a new account gets a session stored in the database", async ({
  request,
}) => {
  const email = `${randomUUID()}@example.com`;

  const signUp = await request.post("/api/auth/sign-up/email", {
    data: { name: "Ada", email, password: "correct-horse-battery" },
  });
  expect(signUp.ok()).toBe(true);

  const session = await request.get("/api/auth/get-session");
  expect((await session.json()).user.email).toBe(email);
});
