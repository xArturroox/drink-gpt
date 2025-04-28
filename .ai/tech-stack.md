Frontend - Astro z React dla komponentów interaktywnych:
- Astro 5 pozwala na tworzenie szybkich, wydajnych stron i aplikacji z minimalną ilością JavaScript
- React 19 zapewni interaktywność tam, gdzie jest potrzebna
- TypeScript 5 dla statycznego typowania kodu i lepszego wsparcia IDE
- Tailwind 4 pozwala na wygodne stylowanie aplikacji
- Shadcn/ui zapewnia bibliotekę dostępnych komponentów React, na których oprzemy UI

Backend - Spring Boot kompleksowe rozwiązanie backendowe:
- Java 21
- Zostanie wykorzystana baza H2
- Komunikacja z modelami AI zostanie zaimplementowana przez Spring AI
- Posiada wbudowaną autentykację użytkowników
- Spring Security
- Spring AI

AI - Komunikacja z modelami przez usługę Openrouter.ai i Spring AI:
- Dostęp do szerokiej gamy modeli (OpenAI, Anthropic, Google i wiele innych), które pozwolą nam znaleźć rozwiązanie zapewniające wysoką efektywność i niskie koszta
- Pozwala na ustawianie limitów finansowych na klucze API

Testy - Kompleksowe podejście do zapewnienia jakości:

- Testy jednostkowe:
  - Frontend: Vitest i React Testing Library
  - Backend: JUnit 5, Mockito, AssertJ
- Testy integracyjne:
  - Frontend: Vitest i React Testing Library
  - Backend: Spring Boot Test, JUnit 5 z bazą H2 in-memory
- Testy end-to-end:
  - Playwright do automatyzacji testów w przeglądarce oraz testów wizualnych
- Narzędzia jakości kodu:
  - ESLint i Prettier dla frontendu
  - GitHub Actions do automatycznego uruchamiania testów w pipeline CI/CD

CI/CD i Hosting:

- Github Actions do tworzenia pipeline'ów CI/CD
- DigitalOcean do hostowania aplikacji za pośrednictwem obrazu docker