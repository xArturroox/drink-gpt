# Project: DrinkGPT

## Project Overview

DrinkGPT is a web application designed for social events, allowing hosts to manage drinks and ingredients, and guests to order drinks. The application features an AI-powered drink suggestion engine. It is a full-stack application with a Java/Spring Boot backend and a React/Astro frontend. The project is configured as a multi-module Maven project.

**Backend:**
*   **Framework:** Spring Boot
*   **Language:** Java
*   **Database:** H2 (for development), with Flyway for database migrations.
*   **Authentication:** Spring Security
*   **AI:** Spring AI with OpenAI integration
*   **Build Tool:** Maven

**Frontend:**
*   **Framework:** Astro with React
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS, shadcn/ui
*   **Build Tool:** npm/Vite
*   **Testing:** Vitest, React Testing Library, Playwright

## Building and Running

### Prerequisites

*   Java 24+
*   Maven
*   Node.js (as specified in `.nvmrc`)

### Development

1.  **Run the backend:**
    ```bash
    cd backend
    mvn spring-boot:run
    ```

2.  **Run the frontend:**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

### Production Build

1.  **Build the frontend:**
    ```bash
    cd frontend
    npm run build
    ```

2.  **Build the backend:**
    The backend is configured to automatically include the frontend build artifacts in the final JAR.
    ```bash
    cd backend
    mvn package
    ```
    The application will be packaged as a single JAR file in `backend/target`.

## Development Conventions

*   The project is structured as a multi-module Maven project.
*   The backend is a Spring Boot application.
*   The frontend is an Astro application with React.
*   The frontend is built and then copied into the backend's static resources for a single-artifact deployment.
*   The project includes a full suite of tests, including unit, integration, and end-to-end tests.
*   Linting and code formatting are enforced in the frontend using ESLint and Prettier.
