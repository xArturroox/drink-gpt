# DrinkGPT

## Table of Contents
1. [Project Name](#project-name)
2. [Project Description](#project-description)
3. [Tech Stack](#tech-stack)
4. [Getting Started Locally](#getting-started-locally)
5. [Available Scripts](#available-scripts)
6. [Project Scope](#project-scope)
7. [Project Status](#project-status)
8. [License](#license)

## Project Name
**DrinkGPT**

## Project Description
DrinkGPT is a minimal viable product (MVP) designed to streamline the process of selecting, ordering, and preparing drinks during social events. The application offers a dual interface:
- **For Hosts:** Manage ingredients, drinks (with detailed recipes), and monitor the order queue. Host functionalities are protected by authentication.
- **For Guests:** Choose from a list of available drink proposals or input personal preferences (or mood) in a single text field. The guest input, combined with available ingredients, is processed by an AI to suggest a suitable drink. Every order is uniquely identified with a UUID, ensuring clear tracking even if guest names repeat.

## Tech Stack
**Frontend:**
- Astro 5
- React 19
- TypeScript 5
- Tailwind 4
- Shadcn/ui

**Backend:**
- Java 21
- Spring Boot 3.4.4
- Flyway for database migrations
- H2 Database
- Spring Security
- Spring AI for integrating AI-driven suggestions

**Testing:**

- **Unit Testing:**
    - Frontend: Vitest, React Testing Library
    - Backend: JUnit 5, Mockito, AssertJ
- **Integration Testing:**
    - Frontend: Vitest, React Testing Library
    - Backend: Spring Boot Test, JUnit 5, H2 Database (in-memory)
- **End-to-End Testing:**
    - Playwright for browser automation and visual testing
- **Tooling:**
    - GitHub Actions for CI/CD test automation

## Getting Started Locally

### Prerequisites
- **Node.js:** Version specified in the `.nvmrc` file (v22.14.0 recommended)
- **Maven:** For managing and building the backend (ensure Maven is installed)
- **Java:** Java 21 or later

### Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd drink-gpt
   ```
2. **Setup Frontend:**
   - Navigate to the frontend module:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Run the development server:
     ```bash
     npm run dev
     ```
   - To build the frontend for production:
     ```bash
     npm run build
     ```
3. **Setup Backend:**
   - Navigate to the backend module:
     ```bash
     cd ../backend
     ```
   - Run the Spring Boot application using Maven:
     ```bash
     mvn spring-boot:run
     ```

## Available Scripts

From the **frontend** `package.json`, the following npm scripts are available:
- **dev:** Starts the development server (`npm run dev`)
- **build:** Builds the frontend for production (`npm run build`)
- **preview:** Previews the production build locally (`npm run preview`)
- **lint:** Runs ESLint to check for code issues (`npm run lint`)
- **lint:fix:** Automatically fixes linting errors (`npm run lint:fix`)
- **format:** Formats the codebase using Prettier (`npm run format`)

## Project Scope
DrinkGPT is designed with the following functionalities:
- **Ingredient Management:** Hosts can add, edit, and remove ingredients, ensuring updated stock information for drink preparation.
- **Drink Management:** Hosts can manage drink proposals by adding detailed recipes, including a list of required ingredients and preparation instructions.
- **Order Queue Management:** Displays current orders with details such as drink name, recipe, guest information, and order time. Hosts can remove orders after fulfillment.
- **Guest Interaction:** Guests have the option to select a drink from a list of available suggestions (filtered by available ingredients) or enter their preferences via a text field. The application leverages AI to generate a personalized drink recommendation based on the input.
- **Authentication:** Access to host functionalities is secured via a login system.

## Project Status
This project is currently in its **MVP** stage.

## License
This project is licensed under the **MIT License**.
