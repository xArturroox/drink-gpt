import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect the page to contain drink-gpt in the title
  await expect(page).toHaveTitle(/drink-gpt/i);
});

test("navigation works", async ({ page }) => {
  await page.goto("/");

  // Example test, replace with actual navigation tests for the app
  await expect(page).toBeVisible();
}); 