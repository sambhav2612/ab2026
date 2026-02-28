# Allica Onboarding - Backend

This module is a Spring Boot application that serves as the core API for the customer onboarding system.

## Features

* **Create Customers:** Exposes an HTTP endpoint to post customer details (First Name, Last Name, Date of Birth).
* **Retrieve Customers:** Creates an HTTP endpoint to retrieve the customer details.
* **Domain Validation:** Enforces business invariants, specifically ensuring all new customers are at least 18 years old.
* **Data Persistence:** Uses an in-memory database to persist customer details via Spring Data JPA and H2.

## Architecture: Hexagonal (Ports & Adapters)

* **Domain:** Contains the pure `Customer` Java record and business rules.
* **Application:** Contains the Use Cases (`CustomerService`) and interface Ports.
* **Infrastructure:** Contains the Web adapters (`CustomerController`) and Persistence adapters (`InMemoryCustomerRepositoryAdapter`).

## Running Locally

If you want to run the backend in isolation without the Nx wrapper:

* **Start the server:** `./gradlew bootRun`
* **Run tests:** `./gradlew test`
* **View Database:** Navigate to `http://localhost:8080/h2-console` (URL: `jdbc:h2:mem:customerdb`, User: `allica`, Password: `<leave blank>`).