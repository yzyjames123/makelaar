import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should load homepage", async ({ page }) => {
    await expect(page).toHaveTitle(/Makelaar|Home/i);
  });

  test("should have navigation header", async ({ page }) => {
    // Header should be visible
    await expect(page.getByRole("navigation")).toBeVisible();
  });

  test("should have tools dropdown in navigation", async ({ page }) => {
    // Tools dropdown should be visible
    const toolsButton = page.getByRole("button", { name: /Tools/i });
    await expect(toolsButton).toBeVisible();

    // Click to open dropdown
    await toolsButton.click();

    // Should show calculator links in dropdown
    await expect(
      page.getByRole("menuitem", { name: /Mortgage Calculator/i })
    ).toBeVisible();
  });

  test("should navigate to calculators via explore section", async ({
    page,
  }) => {
    // Scroll to Explore Tools section
    const exploreSection = page.getByRole("heading", {
      name: /Explore our free tools/i,
    });
    await exploreSection.scrollIntoViewIfNeeded();

    // Click the calculator card
    const calcLink = page
      .locator("section")
      .filter({ hasText: "Explore our free tools" })
      .getByRole("link", { name: /Explore/i })
      .first();
    await calcLink.click();

    await expect(page).toHaveURL(/calculator/);
  });

  test("should navigate to schools via explore section", async ({ page }) => {
    // Scroll to Explore Tools section
    const exploreSection = page.getByRole("heading", {
      name: /Explore our free tools/i,
    });
    await exploreSection.scrollIntoViewIfNeeded();

    // Click the schools card
    const schoolsLink = page
      .locator("section")
      .filter({ hasText: "Explore our free tools" })
      .getByRole("link", { name: /Find Schools/i });
    await schoolsLink.click();

    await expect(page).toHaveURL(/schools/);
  });
});
