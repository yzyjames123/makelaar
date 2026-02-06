import { test, expect } from "@playwright/test";

test.describe("School Finder", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/schools");
  });

  test("should display page title and stats", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /International Schools/i })
    ).toBeVisible();
    // Stats should show total schools
    await expect(
      page.locator("main").getByText(/Schools/i).first()
    ).toBeVisible();
  });

  test("should display school cards", async ({ page }) => {
    // Should show school cards with names
    await expect(
      page.getByText(/International School of Amsterdam/i)
    ).toBeVisible();
  });

  test("should filter by curriculum using badge click", async ({ page }) => {
    // Filters use Badge components, not buttons - click on IB badge
    const filterSection = page.locator("main").locator("div").filter({ hasText: /Curriculum/ }).first();
    const ibBadge = filterSection.getByText("IB", { exact: true });
    await ibBadge.click();

    // Results should still show IB schools
    await expect(page.getByText(/IB/i).first()).toBeVisible();
  });

  test("should search by school name", async ({ page }) => {
    // Type in search box
    await page.getByPlaceholder(/School name|location/i).fill("British");

    // Should filter results
    await expect(page.getByText(/British/i).first()).toBeVisible();
  });

  test("should show no results message when search matches nothing", async ({
    page,
  }) => {
    // Search for something that doesn't exist
    await page
      .getByPlaceholder(/School name|location/i)
      .fill("XYZ123NonexistentSchool");

    // Should show no results
    await expect(page.getByText(/No schools found/i)).toBeVisible();
  });

  test("should clear filters when clicking clear button", async ({ page }) => {
    // Apply a filter by searching
    await page.getByPlaceholder(/School name|location/i).fill("Test");

    // Clear filters button should appear
    const clearButton = page.getByRole("button", { name: /Clear/i });
    await expect(clearButton).toBeVisible();

    // Click clear
    await clearButton.click();

    // Search should be empty
    await expect(page.getByPlaceholder(/School name|location/i)).toHaveValue(
      ""
    );
  });

  test("should display school information", async ({ page }) => {
    // Each school card should have key info
    await expect(
      page.getByText(/International School of Amsterdam/i)
    ).toBeVisible();
    // Tuition (Euro symbol)
    await expect(page.locator("main").getByText(/€/i).first()).toBeVisible();
    // Website link
    await expect(
      page.getByRole("link", { name: /Website/i }).first()
    ).toBeVisible();
  });

  test("should show curriculum information section", async ({ page }) => {
    // Scroll to curriculum info section
    await expect(
      page.getByRole("heading", { name: /Choosing an International School/i })
    ).toBeVisible();
  });

  test("should have CTA to property search", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Looking for a Home/i })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Search Properties/i })
    ).toBeVisible();
  });
});
