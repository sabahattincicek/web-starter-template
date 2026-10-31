/**
 * Proves the template's wiring in the real app: the page renders in each language, and the auth API
 * reaches the database. Replace or extend it as features arrive.
 */
import { randomUUID } from "node:crypto";
import { expect, test } from "@playwright/test";

test("the start page shows the app name", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("the default language has no prefix", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveURL("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByText("Your project is ready.")).toBeVisible();
});

test("other languages have their own address", async ({ page }) => {
  await page.goto("/tr");

  await expect(page.locator("html")).toHaveAttribute("lang", "tr");
  await expect(page.getByText("Projen hazır.")).toBeVisible();
});

test("an unknown language is not found", async ({ page }) => {
  const response = await page.goto("/xx");

  expect(response?.status()).toBe(404);
});

test.describe("a browser set to Turkish", () => {
  test.use({ locale: "tr-TR" });

  test("is sent to the Turkish site", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveURL("/tr");
  });
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
