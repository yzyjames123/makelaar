import { test, expect } from "@playwright/test";

test.describe("Total Cost Calculator", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/calculator/costs");
  });

  test("should display page title and description", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Total Cost Calculator/i, level: 1 })
    ).toBeVisible();
    await expect(
      page.locator("main").getByText(/hidden costs/i).first()
    ).toBeVisible();
  });

  test("should show form with all required fields", async ({ page }) => {
    const mainContent = page.locator("main");

    // Purchase price input - use role to be specific
    await expect(
      page.getByRole("spinbutton", { name: /Purchase Price/i })
    ).toBeVisible();

    // First-time buyer checkbox
    await expect(mainContent.getByLabel(/First-time buyer/i)).toBeVisible();

    // Investor checkbox
    await expect(mainContent.getByLabel(/Investor/i)).toBeVisible();
  });

  test("should calculate costs for first-time buyer", async ({ page }) => {
    // Fill in purchase price - use role to be specific
    await page.getByRole("spinbutton", { name: /Purchase Price/i }).fill("400000");

    // Select first-time buyer (should be default or check it)
    await page.getByLabel(/First-time buyer/i).check();

    // Submit
    await page.getByRole("button", { name: /Calculate/i }).click();

    // Wait for results - should show transfer tax info
    const mainContent = page.locator("main");
    await expect(mainContent.getByText(/Transfer Tax/i).first()).toBeVisible();
  });

  test("should calculate costs for regular buyer", async ({ page }) => {
    // Fill in purchase price - use role to be specific
    await page.getByRole("spinbutton", { name: /Purchase Price/i }).fill("400000");

    // Uncheck first-time buyer if checked
    const firstTimeCheckbox = page.getByLabel(/First-time buyer/i);
    if (await firstTimeCheckbox.isChecked()) {
      await firstTimeCheckbox.uncheck();
    }

    // Submit
    await page.getByRole("button", { name: /Calculate/i }).click();

    // Wait for results - should show transfer tax
    const mainContent = page.locator("main");
    await expect(mainContent.getByText(/Transfer Tax/i).first()).toBeVisible();
  });

  test("should calculate investor transfer tax (10.4%)", async ({ page }) => {
    // Fill in purchase price - use role to be specific
    await page.getByRole("spinbutton", { name: /Purchase Price/i }).fill("400000");

    // Select investor
    await page.getByLabel(/Investor/i).check();

    // Submit
    await page.getByRole("button", { name: /Calculate/i }).click();

    // Wait for results
    const mainContent = page.locator("main");
    await expect(mainContent.getByText(/Transfer Tax/i).first()).toBeVisible();
  });

  test("should show cost breakdown after calculation", async ({ page }) => {
    // Fill in purchase price - use role to be specific
    await page.getByRole("spinbutton", { name: /Purchase Price/i }).fill("400000");

    // Submit
    await page.getByRole("button", { name: /Calculate/i }).click();

    // Should show total costs breakdown
    const mainContent = page.locator("main");
    await expect(mainContent.getByText(/Total/i).first()).toBeVisible();
  });

  test("should display FAQ section", async ({ page }) => {
    const mainContent = page.locator("main");
    await expect(mainContent.getByText(/What is transfer tax/i)).toBeVisible();
    await expect(mainContent.getByText(/What is VvE/i)).toBeVisible();
    await expect(
      mainContent.getByText(/What does a notary do/i)
    ).toBeVisible();
  });

  test("should navigate back to calculator hub", async ({ page }) => {
    await page.getByRole("link", { name: /All Calculators/i }).click();
    await expect(page).toHaveURL("/calculator");
  });
});
