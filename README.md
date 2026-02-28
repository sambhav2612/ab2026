# Allica Onboarding Application

This project is a simple full-stack application to manage customer records. It is built using an Nx monorepo to seamlessly manage the React frontend, Spring Boot backend, and Playwright end-to-end tests in a unified workspace.

## System Architecture & Design Choices

- **Monorepo (Nx):** Chosen to streamline developer experience (DX). It allows us to run both the frontend and backend with a single command, share configurations, and easily run integrated tests.
- **Backend (Spring Boot):** Utilizes Hexagonal Architecture (Ports and Adapters) to strictly isolate the core domain logic (e.g., age validation) from infrastructure concerns (like web controllers and database adapters).
- **Frontend (React):** Designed as a simple UI to create and display customers. It uses controlled forms, `react-hook-form`, and `zod` for robust client-side validation before hitting the API.
- **Error Handling:** The system maps deep backend domain exceptions (e.g., `IllegalArgumentException` for underage customers) directly to user-friendly UI form errors.

## Trade-offs

- **In-Memory Database:** To keep the setup lightweight and fulfill the requirements, we use an in-memory database to persist customer details (H2 via Spring Data JPA). _Trade-off:_ Data is lost every time the server restarts. In a real-world scenario, this adapter would point to a persistent store like PostgreSQL.
- **Simplicity vs. Abstraction:** The frontend keeps component hierarchy relatively flat. While a larger app might require complex state management (like Redux), standard React Hooks (`useCustomers`) were sufficient and kept the codebase clean.

## Quick Start (Local Development)

Ensure you have Node.js (v18+) and Java (JDK 25) installed.

1.  **Install dependencies:** `npm install`
2.  **Run the full stack:** `npm run dev`
    - _This boots the Spring Boot backend on `localhost:8080` and the React frontend on `localhost:4200`._
3.  **Run Unit Tests:** `npm run test`
4.  **Run E2E Tests:** `npm run e2e:ui` (Make sure `npm run dev` is running first).

## Path to Production

While this application implements production-grade architectural patterns (like Hexagonal Architecture on the backend and strict schema validation on the frontend), certain trade-offs were made to keep the submission lightweight and easily runnable locally.

To deploy this to a live, enterprise-scale environment, I would implement the following:

- **Persistent Storage & Migrations:**
  - Replace the in-memory H2 database with a persistent relational database like PostgreSQL or MySQL.
  - Introduce a database migration tool (e.g., Flyway or Liquibase) to manage schema versions across environments.
- **Scalability & Performance:**
  - The current `GET /api/customers` endpoint fetches all records into memory. As the user base grows, this requires implementing offset or cursor-based pagination (via Spring Data `Pageable`) and pushing sorting operations down to the database layer.
- **Security & Authentication:**
  - Secure the API using OAuth2 or JWT-based authentication.
  - Lock down the currently open CORS policy to explicitly allow only the production frontend domain (e.g., `https://onboarding.allica.bank`).
  - Enforce HTTPS/TLS at the API gateway or load balancer level.
- **Observability:**
  - Implement structured JSON logging (e.g., via SLF4J/Logback) for easy ingestion into tools like Datadog or ELK.
  - Enable Spring Boot Actuator for health checks and metrics monitoring.
  - Add distributed tracing (e.g., OpenTelemetry) to track request flows across the stack.
- **App Configuration & Deployment:**
  - Extract hardcoded values (like the API base URL in the React app) into environment variables for clean promotion through `dev`, `staging`, and `prod` environments.
  - Wrap both the frontend and backend in Docker containers
