import { test, expect } from "@playwright/test";

test.describe("Calculator Hub", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/calculator");
  });

  test("should display page title", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Financial Calculators/i })
    ).toBeVisible();
  });

  test("should show mortgage calculator card", async ({ page }) => {
    // Look for the card specifically in the main content area
    const mainContent = page.locator("main");
    await expect(
      mainContent.getByRole("heading", { name: /Mortgage Calculator/i })
    ).toBeVisible();
    await expect(mainContent.getByText(/maximum mortgage/i)).toBeVisible();
  });

  test("should show cost calculator card", async ({ page }) => {
    const mainContent = page.locator("main");
    await expect(
      mainContent.getByRole("heading", { name: /Total Cost Calculator/i })
    ).toBeVisible();
    await expect(mainContent.getByText(/hidden costs/i).first()).toBeVisible();
  });

  test("should navigate to mortgage calculator", async ({ page }) => {
    // Click the link in the card, not in the header nav
    const mainContent = page.locator("main");
    await mainContent.getByRole("link", { name: /Mortgage Calculator/i }).click();
    await expect(page).toHaveURL("/calculator/mortgage");
  });

  test("should navigate to cost calculator", async ({ page }) => {
    const mainContent = page.locator("main");
    await mainContent
      .getByRole("link", { name: /Total Cost Calculator/i })
      .click();
    await expect(page).toHaveURL("/calculator/costs");
  });

  test("should show affordability calculator as coming soon", async ({
    page,
  }) => {
    const mainContent = page.locator("main");
    await expect(
      mainContent.getByRole("heading", { name: /Affordability Calculator/i })
    ).toBeVisible();
    // Look for Coming Soon badge within the affordability card section
    const affordabilitySection = mainContent
      .locator("div")
      .filter({ hasText: /Affordability Calculator/i })
      .first();
    await expect(
      affordabilitySection.getByText(/Coming Soon/i).first()
    ).toBeVisible();
  });
});
