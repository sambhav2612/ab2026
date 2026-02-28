# Allica Onboarding - E2E Tests

This module contains the Playwright integration tests. These tests verify the contract between the React UI and the Spring Boot API.

## Test Scenarios

* **Happy Path (Positive):** Simulates a user filling out the form with valid, adult details, verifying the form submission succeeds and the ledger updates immediately.
* **Sad Path (Negative):** Simulates a user attempting to register with an underage date of birth, verifying that the backend `IllegalArgumentException` is successfully caught and displayed to the user on the UI.

## Running Tests

The backend and frontend must be running (`npm run dev`) before executing these tests.

* **Headless Mode:** `nx e2e frontend-e2e`
* **UI Mode (Debugging):** `nx e2e frontend-e2e --ui`