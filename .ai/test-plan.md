# Plan Testów dla Aplikacji DrinkGpt

## 1. Wprowadzenie i Cele Testowania

### 1.1. Wprowadzenie

Niniejszy dokument opisuje plan testów dla aplikacji DrinkGpt. Aplikacja ma na celu proponowanie użytkownikom drinków i
przepisów na nie, wykorzystując do tego sztuczną inteligencję za pośrednictwem usługi Openrouter.ai. Projekt składa się
z frontendowej aplikacji webowej (Astro, React, TypeScript) oraz backendu (Spring Boot, Java) komunikującego się z AI i
bazą danych H2.

### 1.2. Cele Testowania

Główne cele procesu testowania to:

* Weryfikacja, czy aplikacja spełnia zdefiniowane wymagania funkcjonalne i niefunkcjonalne.
* Zapewnienie wysokiej jakości, stabilności i niezawodności aplikacji.
* Identyfikacja i zaraportowanie defektów przed wdrożeniem na środowisko produkcyjne.
* Potwierdzenie poprawnej integracji pomiędzy komponentami frontendowymi, backendowymi, bazą danych i usługą AI.
* Ocena użyteczności i doświadczenia użytkownika (UX).
* Weryfikacja bezpieczeństwa aplikacji, w szczególności mechanizmów autentykacji i ochrony danych.
* Ocena wydajności kluczowych funkcjonalności, zwłaszcza interakcji z AI.

## 2. Zakres Testów

### 2.1. Funkcjonalności objęte testami

* **Frontend:**
    * Interfejs użytkownika (UI) i doświadczenie użytkownika (UX).
    * Nawigacja i routing (Astro).
    * Interaktywne komponenty (React).
    * Wyświetlanie propozycji drinków i przepisów.
    * Formularze wprowadzania danych (np. preferencje użytkownika, jeśli zostaną zaimplementowane).
    * Komunikacja z API backendu.
* **Backend:**
    * Endpointy API (REST): poprawność działania, obsługa metod HTTP, walidacja danych wejściowych, format odpowiedzi.
    * Logika biznesowa: przetwarzanie zapytań, generowanie rekomendacji.
    * Integracja z usługą AI (Spring AI, Openrouter.ai): wysyłanie zapytań, obsługa odpowiedzi, obsługa błędów.
    * Integracja z bazą danych (H2/JPA): operacje CRUD, poprawność zapytań.
    * Mechanizmy bezpieczeństwa (Spring Security): autentykacja, autoryzacja (jeśli dotyczy).
    * Migracje bazy danych (Flyway).
* **Integracja:**
    * Pełny przepływ zapytania od użytkownika (frontend) do uzyskania propozycji (frontend).
    * Integracja frontend-backend.
    * Integracja backend-AI.
    * Integracja backend-baza danych.

### 2.2. Funkcjonalności wyłączone z testów

* Testowanie wewnętrznej implementacji usługi Openrouter.ai (traktowana jako "czarna skrzynka").
* Testowanie infrastruktury hostingowej poza weryfikacją poprawności deploymentu.
* Szczegółowe testy bibliotek zewnętrznych (np. React, Spring Boot) - zakładamy ich poprawność, testujemy jedynie
  integrację z nimi.

## 3. Typy Testów do Przeprowadzenia

* **Testy jednostkowe (Unit Tests):**
    * Frontend: Testowanie pojedynczych komponentów React, funkcji pomocniczych (utility functions), logiki w
      TypeScript.
    * Backend: Testowanie klas serwisów, repozytoriów, logiki biznesowej, DTO, funkcji pomocniczych w Javie. Mockowanie
      zależności (np. repozytoriów, usług zewnętrznych, AI).
* **Testy integracyjne (Integration Tests):**
    * Frontend: Testowanie interakcji między komponentami React, integracji z usługami frontendowymi.
    * Backend: Testowanie interakcji między warstwami aplikacji (kontroler-serwis-repozytorium), integracji z bazą
      danych (np. przy użyciu testowej bazy H2), integracji z endpointami API (Spring Boot Test), integracji z Spring
      AI (mockując Openrouter.ai ). Testowanie migracji Flyway.
* **Testy End-to-End (E2E):**
    * Symulowanie pełnych scenariuszy użytkownika w przeglądarce, obejmujących interakcję z UI, komunikację z backendem
      i weryfikację wyników. Testowanie kluczowych przepływów aplikacji.
* **Testy API:**
    * Bezpośrednie testowanie endpointów API backendu (niezależnie od frontendu) pod kątem poprawności kontraktu,
      odpowiedzi, obsługi błędów, walidacji.

## 4. Scenariusze Testowe dla Kluczowych Funkcjonalności

* **Generowanie propozycji drinka:**
    * Użytkownik otwiera stronę główną.
    * Użytkownik inicjuje proces generowania propozycji (np. klika przycisk).
    * Użytkownik wprowadza preferencje (składniki, typ drinka itp.).
    * Aplikacja wysyła zapytanie do backendu.
    * Backend przetwarza zapytanie i komunikuje się z AI.
    * AI zwraca propozycję.
    * Backend przetwarza odpowiedź AI i zwraca ją do frontendu.
    * Frontend wyświetla użytkownikowi nazwę drinka, składniki i przepis.
    * **Przypadki brzegowe:** Brak odpowiedzi z AI, błąd AI, nieprawidłowe dane wejściowe, timeout.

* **Dodawanie składnika przez gospodarza (Host):**
    * Gospodarz (zalogowany użytkownik z odpowiednimi uprawnieniami) przechodzi do panelu zarządzania składnikami.
    * Gospodarz wypełnia formularz dodawania nowego składnika (nazwa, jednostka, ilość, itp.).
    * Gospodarz zatwierdza formularz.
    * Aplikacja wysyła zapytanie do API backendu w celu zapisania składnika.
    * Backend zapisuje składnik w bazie danych.
    * Frontend wyświetla potwierdzenie dodania składnika i/lub aktualizuje listę składników.
    * **Przypadki brzegowe:** Niepoprawna walidacja danych (np. pusta nazwa), błąd zapisu do bazy, brak uprawnień.

* **Dodawanie drinka przez gospodarza (Host):**
    * Gospodarz (zalogowany) przechodzi do panelu zarządzania drinkami.
    * Gospodarz wypełnia formularz dodawania nowego drinka (nazwa, opis, przepis, wymagane składniki i ich ilości).
    * Gospodarz zatwierdza formularz.
    * Aplikacja wysyła zapytanie do API backendu.
    * Backend waliduje dane i zapisuje drinka oraz powiązania ze składnikami w bazie danych.
    * Frontend wyświetla potwierdzenie dodania drinka i/lub aktualizuje listę drinków.
    * **Przypadki brzegowe:** Niepoprawna walidacja (brak nazwy, brak przepisu, nieistniejący składnik), błąd zapisu,
      brak uprawnień.

* **Oznaczanie zamówienia jako zrealizowane (Served) przez gospodarza (Host):**
    * Gospodarz (zalogowany) widzi listę aktywnych zamówień.
    * Gospodarz wybiera zamówienie do oznaczenia jako zrealizowane.
    * Gospodarz klika przycisk/opcję "Oznacz jako zrealizowane".
    * Aplikacja wysyła zapytanie do API backendu w celu aktualizacji statusu zamówienia.
    * Backend aktualizuje status zamówienia w bazie danych.
    * Frontend odświeża listę zamówień, pokazując zaktualizowany status.
    * **Przypadki brzegowe:** Próba oznaczenia już zrealizowanego zamówienia, błąd aktualizacji w bazie, brak uprawnień,
      nieistniejące zamówienie.

* **Autentykacja użytkownika:**
    * Użytkownik wchodzi na stronę logowania.
    * Użytkownik wprowadza niepoprawne dane logowania -> widzi błąd.
    * Użytkownik wprowadza poprawne dane logowania -> uzyskuje dostęp.
    * Użytkownik wylogowuje się.
* **Obsługa błędów API:**
    * Frontend poprawnie obsługuje i informuje użytkownika o błędach zwróconych przez API (np. 4xx, 5xx).
* **Walidacja danych wejściowych:**
    * Testowanie endpointów API i formularzy frontendowych pod kątem odrzucania nieprawidłowych danych.

## 5. Środowisko Testowe

* **Środowisko deweloperskie:** Lokalne maszyny deweloperów (uruchamianie aplikacji, testy jednostkowe, podstawowe testy
  integracyjne).
* **Środowisko testowe CI (Continuous Integration):** Serwer CI (np. GitHub Actions) automatycznie uruchamiający testy
  jednostkowe i integracyjne po każdym pushu do repozytorium. Może wykorzystywać bazę H2 in-memory.
* **Środowisko Staging/Testowe:** Dedykowane środowisko możliwie zbliżone do produkcyjnego. Używane do testów E2E,
  testów API, testów wydajnościowych, UAT (User Acceptance Testing). Powinno korzystać z testowego konta Openrouter.ai.
* **Środowisko produkcyjne:** Monitorowanie i ewentualne testy typu "smoke test" po wdrożeniu.

## 6. Narzędzia do Testowania

* **Frontend:**
    * Testy jednostkowe/integracyjne: `Vitest`, `React Testing Library`.
    * Testy E2E: `Playwright`.
    * Testy wizualne: `Playwright` (zrzuty ekranu) lub dedykowane narzędzia.
    * Linter: `ESLint`, `Prettier`.
* **Backend:**
    * Testy jednostkowe/integracyjne: `JUnit 5`, `Mockito`, `Spring Boot Test`, `AssertJ`.
    * Baza danych dla testów: H2 Database (in-memory lub plikowa).
* **Ogólne:**
    * System kontroli wersji: `Git`, `GitHub`.
    * CI/CD: `GitHub Actions`.
    * Zarządzanie zadaniami/błędami: `GitHub Issues` lub dedykowane narzędzie (np. Jira).

## 7. Harmonogram Testów

* Testy jednostkowe i integracyjne będą tworzone równolegle z rozwojem funkcjonalności przez deweloperów.
* Testy będą automatycznie uruchamiane w pipeline CI po każdym pushu do głównych gałęzi (np. `main`, `develop`).
* Testy E2E będą rozwijane stopniowo dla kluczowych przepływów.
* Faza dedykowanych testów (E2E, API, wydajnościowe, bezpieczeństwa, UAT) będzie przeprowadzana na środowisku Staging
  przed każdym planowanym wydaniem (np. w ramach sprintu lub przed wdrożeniem nowej wersji).
* Testy regresji (automatyczne i manualne) będą wykonywane przed każdym wdrożeniem na produkcję.

## 8. Kryteria Akceptacji Testów

### 8.1. Kryteria wejścia (rozpoczęcia testów)

* Dostępna stabilna wersja aplikacji na odpowiednim środowisku testowym.
* Ukończony rozwój zaplanowanych funkcjonalności.
* Dostępna dokumentacja (jeśli dotyczy).
* Przygotowane środowisko testowe i narzędzia.

### 8.2. Kryteria wyjścia (zakończenia testów)

* Wszystkie zaplanowane scenariusze testowe (zgodnie z priorytetami) zostały wykonane.
* Osiągnięty zdefiniowany poziom pokrycia kodu testami (np. 80% dla testów jednostkowych backendu).
* Brak krytycznych i wysokich błędów (blokujących) w systemie.
* Wszystkie zidentyfikowane błędy o niższym priorytecie zostały zaraportowane i ocenione przez zespół.
* Wyniki testów zostały udokumentowane i zaakceptowane przez interesariuszy.

## 9. Role i Odpowiedzialności w Procesie Testowania

* **Deweloperzy:**
    * Pisanie testów jednostkowych i integracyjnych dla tworzonego kodu.
    * Naprawianie błędów wykrytych na wszystkich etapach testowania.
    * Utrzymanie i aktualizacja testów automatycznych.
    * Dbanie o jakość kodu i przestrzeganie standardów.
* **Inżynier QA (jeśli dedykowany):**
    * Tworzenie i utrzymanie planu testów.
    * Projektowanie i implementacja testów E2E, API, wydajnościowych, bezpieczeństwa.
    * Wykonywanie testów manualnych (eksploracyjnych, UAT).
    * Zarządzanie procesem zgłaszania i śledzenia błędów.
    * Raportowanie wyników testów.
    * Współpraca z deweloperami w celu zapewnienia jakości.
* **Product Owner / Interesariusze:**
    * Udział w definiowaniu kryteriów akceptacji.
    * Udział w testach akceptacyjnych użytkownika (UAT).
    * Podejmowanie decyzji dotyczących priorytetów błędów i gotowości do wydania.

## 10. Procedury Raportowania Błędów

* Wszystkie wykryte defekty będą raportowane w systemie śledzenia błędów (np. GitHub Issues).
* Każdy raport błędu powinien zawierać:
    * Tytuł: Krótki, zwięzły opis problemu.
    * Opis: Szczegółowy opis błędu, kroki do reprodukcji.
    * Środowisko: Wersja aplikacji, przeglądarka/system operacyjny (jeśli dotyczy).
    * Oczekiwany rezultat.
    * Rzeczywisty rezultat.
    * Priorytet/Waga (np. Krytyczny, Wysoki, Średni, Niski).
    * Zrzuty ekranu/logi (jeśli pomocne).
* Błędy będą przypisywane do odpowiednich członków zespołu.
* Status błędu będzie aktualizowany w miarę postępów (Nowy -> W toku -> Do weryfikacji -> Zamknięty / Odrzucony).
* Błędy krytyczne i wysokie muszą zostać naprawione przed wdrożeniem na produkcję. 