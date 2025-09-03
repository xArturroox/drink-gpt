# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DrinkGPT is a full-stack web application for managing drink orders at social events. The application consists of:
- **Frontend**: Astro 5 + React 19 + TypeScript with Tailwind CSS
- **Backend**: Spring Boot 3.5.5 + Java 24 with Spring AI integration
- **Database**: H2 with Flyway migrations

The app provides two interfaces:
- Guest interface: Browse drinks or get AI-powered drink suggestions
- Host interface: Manage ingredients, drinks, and order queue (authentication required)

## Project Structure

- `backend/`: Spring Boot application with Java 24
  - `src/main/java/com/art/drinkgpt/`: Main package structure
    - `controllers/`: REST API endpoints 
    - `models/entities/`: JPA entities (Drink, Ingredient, Order, etc.)
    - `models/dto/`: Data transfer objects for API communication
    - `config/`: Spring configuration classes (CORS, Security, etc.)
  - `src/main/resources/db/migration/`: Flyway database migration scripts
- `frontend/`: Astro application with React components
  - `src/pages/`: Astro pages (routing)
  - `src/components/`: React components and hooks
  - `src/lib/`: Utilities including API client
  - `src/types.ts`: TypeScript type definitions

## Development Commands

### Backend (Maven/Spring Boot)
Run from root directory or `backend/` directory:
```bash
# Start backend server
mvn spring-boot:run

# Run tests
mvn test

# Build
mvn clean install

# Run with coverage (Jacoco)
mvn test jacoco:report
```

### Frontend (Node.js/npm)
Run from `frontend/` directory:
```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Linting and formatting
npm run lint
npm run lint:fix
npm run format

# Testing
npm run test              # Unit tests (Vitest)
npm run test:watch        # Watch mode
npm run test:coverage     # With coverage
npm run test:e2e          # End-to-end (Playwright)
```

## Architecture Notes

### Multi-Module Maven Setup
The project uses a parent POM structure with frontend and backend as separate modules. The backend Maven configuration automatically copies the built frontend assets to `src/main/resources/static/` during the build process.

### Spring AI Integration
The backend uses Spring AI with OpenAI for drink suggestions based on user preferences. The `AISuggestionController` handles AI-powered drink recommendations.

### Authentication
Spring Security is configured for host functionality. Guest features are publicly accessible.

### Database
- Uses H2 in-memory database for development
- Flyway handles database migrations in `backend/src/main/resources/db/migration/`
- Main entities: `Drink`, `Ingredient`, `Order`, `DrinkIngredient` (many-to-many relationship)

### Frontend State Management
- React hooks for state management
- Context providers for shared state (e.g., `GuestNameContext`)
- Custom hooks for API integration (e.g., `useDrinks`, `useAuth`)

### Testing Strategy
- **Backend**: JUnit 5 + Mockito + Spring Boot Test
- **Frontend**: Vitest + React Testing Library (unit), Playwright (e2e)
- **Coverage**: Jacoco (backend), Vitest coverage (frontend)

## Key Development Notes

- The project requires Java 24 and Node.js version specified in `.nvmrc` (v22.14.0)
- Frontend uses shadcn/ui components with Tailwind CSS
- API endpoints follow REST conventions under `/api/` prefix
- The application supports both Polish and English UI text