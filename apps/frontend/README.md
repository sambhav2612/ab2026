# Allica Onboarding - Frontend

This module contains a simple UI to create and display customers. It connects directly to the Spring Boot backend.

## Design Choices

* **Data Fetching:** Handled via a custom `useCustomers` hook using the native `fetch` API, minimizing external dependencies while maintaining clean component logic.
* **Validation (`zod` & `react-hook-form`):** Ensures that the First Name, Last Name, and Date of Birth fields are properly formatted before submission.
* **Graceful Error Handling:** If the backend rejects a payload (e.g., an applicant is under 18), the API error is parsed and displayed directly on the form for a seamless user experience.

## Running Locally

If you want to run the frontend in isolation:

* **Start the dev server:** `nx serve frontend`
* **Run unit tests:** `nx test frontend`