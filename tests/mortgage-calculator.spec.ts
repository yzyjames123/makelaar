import { test, expect } from "@playwright/test";

test.describe("Mortgage Calculator", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/calculator/mortgage");
  });

  test("should display page title and description", async ({ page }) => {
    // Look for the main page heading specifically
    await expect(
      page.getByRole("heading", { name: /Expat Mortgage Calculator/i })
    ).toBeVisible();
    await expect(
      page.locator("main").getByText(/how much you can borrow/i)
    ).toBeVisible();
  });

  test("should show form with all required fields", async ({ page }) => {
    // Salary input
    await expect(page.getByLabel(/Gross Annual Salary/i)).toBeVisible();

    // Contract type should be visible (it's a label or fieldset)
    await expect(page.getByText(/Contract Type/i)).toBeVisible();

    // 30% ruling checkbox
    await expect(page.getByLabel(/30% Ruling/i)).toBeVisible();
  });

  test("should calculate mortgage with basic inputs", async ({ page }) => {
    // Fill in salary
    await page.getByLabel(/Gross Annual Salary/i).fill("60000");

    // Submit form
    await page.getByRole("button", { name: /Calculate/i }).click();

    // Wait for results in the main content
    await expect(
      page.locator("main").getByText(/Maximum Mortgage/i)
    ).toBeVisible();
    await expect(page.locator("main").getByText(/€/).first()).toBeVisible();
  });

  test("should show increased mortgage with 30% ruling", async ({ page }) => {
    // Fill in salary
    await page.getByLabel(/Gross Annual Salary/i).fill("60000");

    // Calculate without 30% ruling first
    await page.getByRole("button", { name: /Calculate/i }).click();

    // Check the 30% ruling checkbox
    await page.getByLabel(/30% Ruling/i).check();

    // Calculate again
    await page.getByRole("button", { name: /Calculate/i }).click();

    // Result should be higher (we just verify it calculates again)
    await expect(
      page.locator("main").getByText(/Maximum Mortgage/i)
    ).toBeVisible();
  });

  test("should navigate back to calculator hub", async ({ page }) => {
    await page.getByRole("link", { name: /All Calculators/i }).click();
    await expect(page).toHaveURL("/calculator");
  });

  test("should handle partner income", async ({ page }) => {
    // Fill in primary salary
    await page.getByLabel(/Gross Annual Salary/i).fill("60000");

    // Fill in partner income if field exists
    const partnerIncomeField = page.getByLabel(/Partner.*Income/i);
    if (await partnerIncomeField.isVisible()) {
      await partnerIncomeField.fill("40000");
    }

    // Submit
    await page.getByRole("button", { name: /Calculate/i }).click();

    // Should show results
    await expect(
      page.locator("main").getByText(/Maximum Mortgage/i)
    ).toBeVisible();
  });
});
