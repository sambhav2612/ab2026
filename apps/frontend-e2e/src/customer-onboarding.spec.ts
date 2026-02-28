import { test, expect } from '@playwright/test';

test.describe('Customer Onboarding E2E', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Positive: Should successfully create and display a new adult customer', async ({ page }) => {
    // 1. Fill out the form with valid data (Over 18)
    await page.locator('#firstName').fill('Alan');
    await page.locator('#lastName').fill('Turing');
    await page.locator('#dateOfBirth').fill('1912-06-23');

    // 2. Click the submit button
    await page.getByRole('button', { name: 'Create Customer' }).click();

    // 3. Verify the form clears (indicating success)
    await expect(page.locator('#firstName')).toHaveValue('');

    // 4. Verify the new customer immediately appears in the ledger list
    await expect(page.getByText('Alan Turing (DOB: 1912-06-23)')).toBeVisible();
  });

  test('Negative: Should display a server error when creating an underage customer', async ({ page }) => {
    // 1. Calculate a date of birth for a 10-year-old
    const today = new Date();
    const tenYearsAgo = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());
    const underageDob = tenYearsAgo.toISOString().split('T')[0];

    // 2. Fill out the form
    await page.locator('#firstName').fill('Dennis');
    await page.locator('#lastName').fill('Ritchie');
    await page.locator('#dateOfBirth').fill(underageDob);

    // 3. Click the submit button
    await page.getByRole('button', { name: 'Create Customer' }).click();

    // 4. Verify the backend's GlobalExceptionHandler message is displayed on the UI
    await expect(page.getByText('Customer must be at least 18 years old')).toBeVisible();
    
    // 5. Verify the user was NOT added to the ledger
    await expect(page.getByText('Ritchie, Dennis')).toBeHidden();
  });
});