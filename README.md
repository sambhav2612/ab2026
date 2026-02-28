# Allica Onboarding Application

This project is a simple full-stack application to manage customer records. It is built using an Nx monorepo to seamlessly manage the React frontend, Spring Boot backend, and Playwright end-to-end tests in a unified workspace.

## System Architecture & Design Choices

* **Monorepo (Nx):** Chosen to streamline developer experience (DX). It allows us to run both the frontend and backend with a single command, share configurations, and easily run integrated tests.
* **Backend (Spring Boot):** Utilizes Hexagonal Architecture (Ports and Adapters) to strictly isolate the core domain logic (e.g., age validation) from infrastructure concerns (like web controllers and database adapters). 
* **Frontend (React):** Designed as a simple UI to create and display customers. It uses controlled forms, `react-hook-form`, and `zod` for robust client-side validation before hitting the API.
* **Error Handling:** The system maps deep backend domain exceptions (e.g., `IllegalArgumentException` for underage customers) directly to user-friendly UI form errors.

## Trade-offs

* **In-Memory Database:** To keep the setup lightweight and fulfill the requirements, we use an in-memory database to persist customer details (H2 via Spring Data JPA). *Trade-off:* Data is lost every time the server restarts. In a real-world scenario, this adapter would point to a persistent store like PostgreSQL.
* **Simplicity vs. Abstraction:** The frontend keeps component hierarchy relatively flat. While a larger app might require complex state management (like Redux), standard React Hooks (`useCustomers`) were sufficient and kept the codebase clean.

## Quick Start (Local Development)

Ensure you have Node.js (v18+) and Java (JDK 25) installed.

1.  **Install dependencies:** `npm install`
2.  **Run the full stack:** `npm run dev`
    * *This boots the Spring Boot backend on `localhost:8080` and the React frontend on `localhost:4200`.*
3.  **Run Unit Tests:** `npm run test`
4.  **Run E2E Tests:** `npm run e2e:ui` (Make sure `npm run dev` is running first).

## Future Improvements

* **Database Migration:** Swap the H2 in-memory adapter for a PostgreSQL or MySQL adapter and introduce Flyway/Liquibase for schema management.
* **Pagination:** The current ledger fetches all customers. As the database grows, the `GET` endpoint and UI should implement pagination.
* **Containerization:** Add `Dockerfile`s and a `docker-compose.yml` to spin up the entire stack without local Node/Java dependencies.