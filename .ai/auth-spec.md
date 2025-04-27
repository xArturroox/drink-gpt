# Specyfikacja modułu autentykacji i logowania - DrinkGPT

## 1. ARCHITEKTURA INTERFEJSU UŻYTKOWNIKA

### 1.1 Strony i layouty Astro

- **frontend/src/layouts/AuthLayout.astro**
    - Layout dedykowany stronom publicznym (np. `/login`).
    - Zapewnia wspólne style i strukturę dla widoku logowania.
- **frontend/src/layouts/ProtectedLayout.astro**
    - Wrapper chroniący strony tylko dla zalogowanych.
    - W metodzie `getStaticPaths` lub w hooku loader sprawdza obecność sesji (cookie).
    - Jeśli brak uwierzytelnienia: przekierowanie do `/login`.
- Modyfikacja **frontend/src/layouts/MainLayout.astro**
    - Dodanie w nagłówku przycisku `Zaloguj` (dla niezalogowanych) lub `Wyloguj` i wyświetlenia nazwy użytkownika (dla
      zalogowanych).
    - Komponenty reagują na stan sesji (fetch `/api/auth/session`).

### 1.2 Strony klienta (Astro Pages)

- **frontend/src/pages/login.astro**
    - Importuje `AuthLayout`.
    - Osadza komponent React `LoginForm`.
- **frontend/src/pages/logout.astro**
    - Importuje `ProtectedLayout`.
    - Po załadowaniu wywołuje `/api/auth/logout`, a następnie przekierowuje na `/login`.
- Rozszerzenie istniejących stron gospodarz (drinki, składniki, zamówienia) by używały `ProtectedLayout`.

### 1.3 Komponenty React

- **frontend/src/components/LoginForm.tsx**
    - Pola: `login: string`, `password: string`.
    - Walidacja po stronie klienta:
        - Login: wymagany, walidacja długości (min. 3 znaki, brak spacji).
        - Hasło: wymagane (min. 6 znaków).
    - Obsługa submit:
        - Wywołanie `POST /api/auth/login` z JSON: `{ login, password }`.
        - Przy statusie 200: przekierowanie do `/`.
        - Przy statusie 400/401: wyświetlenie komunikatu błędu.
    - Komunikaty walidacyjne: pod polami formularza (Shadcn/ui `FormError`).
- **frontend/src/components/LogoutButton.tsx**
    - Wywołuje `POST /api/auth/logout`.
    - Po sukcesie: przekierowanie do `/login`.

### 1.4 Walidacja i komunikaty błędów

- **Walidacja klienta**
    - Wymagane: pola nie mogą być puste.
- **Wyświetlanie błędów**
    - Polowe: komunikaty pod polami formularza.
    - Globalne: toast (Shadcn/ui) dla błędów serwera lub nieoczekiwanych.

### 1.5 Najważniejsze scenariusze użytkownika

1. Niezalogowany gość próbuje wejść na `/drinks` → przekierowanie do `/login`.
2. Poprawne logowanie → przekierowanie do głównego dashboard (np. `/drinks`).
3. Błędne dane logowania → komunikat "Nieprawidłowy login lub hasło".
4. Kliknięcie `Wyloguj` → wywołanie logout, reset sesji, redirect do `/login`.

## 2. LOGIKA BACKENDOWA

### 2.1 Endpointy API i kontrolery

- **AuthController** (`backend/src/main/java/com/art/drinkgpt/controllers/AuthController.java`):
    - `@PostMapping("/api/auth/login")`
        - RequestBody: `LoginRequestDTO { String login; String password; }`.
        - Uwierzytelnienie przez Spring AuthenticationManager.
        - Przy sukcesie: zwraca 200 OK, JSON `{ username }` lub 204 No Content.
        - Przy nieudanym uwierzytelnieniu: 401 Unauthorized.
    - `@PostMapping("/api/auth/logout")`
        - Wywołanie `SecurityContextLogoutHandler` lub invalidacja sesji.
        - Zwraca 204 No Content.

### 2.2 Modele danych (DTO)

- **LoginRequestDTO** (`backend/src/main/java/com/art/drinkgpt/models/dto/LoginRequestDTO.java`)
    - Pola: `@NotBlank String login; @NotBlank String password;`
- **ErrorResponseDTO**
    - Map<String, String> errors — klucz: pole, wartość: komunikat.

### 2.3 Konfiguracja Spring Security

- **WebSecurityConfig** (`backend/src/main/java/com/art/drinkgpt/config/WebSecurityConfig.java`):
    - Bean `InMemoryUserDetailsManager` – lista użytkowników z Java config (
      `User.withUsername("gospodarz").password(...).roles("HOST")`).
    - Bean `PasswordEncoder` – `BCryptPasswordEncoder`.
    - HttpSecurity:
        - Wyłącz CORS: `http.cors().disable()` (aplikacja działa w tej samej domenie).
        - `csrf().disable()` (MVP).
        - `authorizeHttpRequests()`
            - `/api/auth/**` – `permitAll()`.
            - **GET `/api/drinks/**`** – `permitAll()` (US-005 dla gości).
            - **POST `/api/orders`** – `permitAll()` (US-005 dodawanie zamówienia przez gości).
            - **POST `/api/ai/suggestion`** – `permitAll()` (US-006 sugestia AI dla gości).
            - `anyRequest()` – `authenticated()`.
        - `formLogin().loginProcessingUrl("/api/auth/login").permitAll()`.
        - `logout().logoutUrl("/api/auth/logout").invalidateHttpSession(true)`.

### 2.4 Walidacja i obsługa wyjątków

- Adnotacje `@Valid` i `@NotBlank` na polach DTO.
- **GlobalExceptionHandler** (`backend/src/main/java/com/art/drinkgpt/advice/GlobalExceptionHandler.java`):
    - `@ExceptionHandler(MethodArgumentNotValidException.class)` → 400 + `ErrorResponseDTO`.
    - `@ExceptionHandler(BadCredentialsException.class)` → 401 + `{ message: "Nieprawidłowy login lub hasło" }`.
    - `@ExceptionHandler(AccessDeniedException.class)` → 403 + odpowiedni komunikat.

## 3. SYSTEM UWIERZYTELNIANIA

### 3.1 Mechanizm logowania i sesje

- Autentykacja oparta na Spring Security i HTTP Session.
- `InMemoryUserDetailsManager` przechowuje gospodarza (dla MVP).
- Sesja HTTP przechowywana w pamięci (domyślnie w kontenerze lub H2).

### 3.2 Endpoints w Spring Security

- POST `/api/auth/login`: mechanizm formLogin Spring Security.
- POST `/api/auth/logout`: mechanizm logout Spring Security.

### 3.3 Kontrakt komunikacji (frontend ↔ backend)

- **Login**
    - Request: `POST /api/auth/login`, JSON `{ "login": "...", "password": "..." }`.
    - Response 200 OK: `{ "username": "gospodarz" }` lub 204 No Content.
    - Response 400/401: `{ "message": "..." }` lub mapę błędów.
- **Logout**
    - Request: `POST /api/auth/logout`
    - Response 204 No Content.

---

*Powyższa specyfikacja opisuje architekturę i komponenty niezbędne do wdrożenia bezpiecznego modułu logowania gospodarza
w aplikacji DrinkGPT zgodnie z wymaganiami US-001 i US-007.* 