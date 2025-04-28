# DrinkGPT Testing Setup

This document outlines the testing setup for both the frontend and backend of the DrinkGPT application.

## Frontend Testing

The frontend testing environment is set up with:

### Unit Testing (Vitest)

- **Configuration:** `vitest.config.ts`
- **Test Files Location:** `frontend/src/test/unit/*.test.tsx`
- **Setup File:** `frontend/src/test/setup.ts`

**Commands:**

```bash
# Run all unit tests
npm run test

# Run tests in watch mode for development
npm run test:watch

# Open the Vitest UI for visualization
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

**Features:**

- JSDOM for DOM testing
- React Testing Library for component testing
- Vi object for mocks, spies, and stubs
- Code coverage reports

### End-to-End Testing (Playwright)

- **Configuration:** `playwright.config.ts`
- **Test Files Location:** `frontend/src/test/e2e/*.spec.ts`

**Commands:**

```bash
# Run all E2E tests
npm run test:e2e

# Run tests with UI mode
npx playwright test --ui

# Generate test code
npx playwright codegen http://localhost:4321
```

**Features:**

- Chromium browser testing
- Page Object Model support
- Visual comparison testing
- Test tracing for debugging

## Backend Testing

The backend testing environment is set up with Spring Boot Test:

### Unit Testing

- **Test Files Location:** `backend/src/test/java/com/art/drinkgpt/**/*Test.java`
- **Technology:** JUnit 5 with Mockito

**Commands:**

```bash
# Run all tests
./mvnw test

# Run specific test class
./mvnw test -Dtest=ExampleServiceTest
```

### Controller Testing

- Uses `@WebMvcTest` to test REST controllers in isolation
- MockMvc for request/response testing

### Repository Testing

- Uses `@DataJpaTest` for repository layer tests
- TestEntityManager for test data setup

### Integration Testing

- Uses `@SpringBootTest` for full application context testing

## Best Practices

### Frontend

1. Write tests for React components and services
2. Use page objects for E2E tests
3. Mock API calls in unit tests
4. Implement visual testing for UI components

### Backend

1. Write tests for each layer (controller, service, repository)
2. Use mocks for external dependencies
3. Implement test data builders for entities
4. Test happy paths and edge cases 