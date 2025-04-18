# Architektura UI dla DrinkGPT

## 1. Przegląd struktury UI

Aplikacja DrinkGPT dzieli interfejs na dwa główne obszary: widok dla gościa oraz widok dla gospodarza. Interfejs został
zaprojektowany z myślą o prostocie, przejrzystości oraz intuicyjnej nawigacji, przy utrzymaniu spójności z backendowym
API. Całość opiera się na responsywnym, desktopowym designie, z naciskiem na jasne komunikaty błędów i intuicyjną
interakcję.

## 2. Lista widoków

- **Strona Główna (Widok Gościa)**
    - Ścieżka: `/`
    - Główny cel: Umożliwienie gościom wyboru drinka poprzez kliknięcie gotowej propozycji lub wpisanie własnych
      preferencji.
    - Kluczowe informacje: Lista drinków opartych na dostępnych składnikach, panel AI z polem tekstowym do wpisania
      preferencji oraz pole do wpisania imienia gościa.
    - Kluczowe komponenty: Topbar z przyciskiem logowania, interaktywna lista drinków, panel formularza AI, modal
      potwierdzający złożenie zamówienia.
    - UX, dostępność i bezpieczeństwo: Przejrzysty interfejs z wyraźnymi przyciskami, natychmiastowa walidacja
      formularzy i komunikaty błędów inline, zabezpieczenia minimalne po stronie klienta.

- **Widok Logowania (Modal)**
    - Ścieżka: Uruchamiany z przycisku logowania w topbarze
    - Główny cel: Umożliwienie gospodarzu bezpiecznego zalogowania się i uzyskania dostępu do panelu gospodarza.
    - Kluczowe informacje: Formularz logowania z polami na dane uwierzytelniające takie jak login i hasło oraz
      komunikaty o błędach.
    - Kluczowe komponenty: Modal z formularzem logowania, przyciski potwierdzające.
    - UX, dostępność i bezpieczeństwo: Automatyczne skupienie na pierwszym polu, możliwość zamknięcia modala, walidacja
      danych przed wysłaniem, zabezpieczenie transmisji danych (np. HTTPS, JWT po logowaniu).


- **Widok Zarządzania Składnikami (Widok Gospodarza)**
    - Ścieżka: `/host/ingredients`
    - Główny cel: Umożliwienie dodawania, edytowania i usuwania składników wykorzystywanych do tworzenia drinków.
    - Kluczowe informacje: Lista składników wraz ze statusem dostępności, formularz do szybkiej modyfikacji.
    - Kluczowe komponenty: Lista składników, formularze modalne lub inline, przyciski akcji (edycja, usunięcie),
      wizualny wskaźnik statusu.
    - UX, dostępność i bezpieczeństwo: Czytelny interfejs z natychmiastową walidacją, potwierdzenia akcji, odpowiednia
      nawigacja klawiaturowa.

- **Widok Zarządzania Drinkami (Widok Gospodarza)**
    - Ścieżka: `/host/drinks`
    - Główny cel: Zarządzanie przepisami drinków, czyli dodawanie, aktualizacja i usuwanie drinków.
    - Kluczowe informacje: Lista drinków, szczegółowe przepisy, przypisane składniki.
    - Kluczowe komponenty: Interaktywny edytor przepisów, formularze do modyfikacji, karta podsumowująca drinki.
    - UX, dostępność i bezpieczeństwo: Intuicyjna edycja z wizualnym podziałem na sekcje, walidacja powiązań między
      drinkami a składnikami, ograniczenie dostępu do operacji modyfikacji.

- **Widok Kolejki Zamówień (Widok Gospodarza)**
    - Ścieżka: `/host/orders`
    - Główny cel: Monitorowanie i zarządzanie zamówieniami gości oraz oznaczanie zamówień jako zrealizowane.
    - Kluczowe informacje: Lista zamówień ze szczegółami: nazwa drinka, przepis, imię gościa, czas składania zamówienia.
    - Kluczowe komponenty: Tabela zamówień, narzędzia do filtrowania i sortowania, interaktywne przyciski usuwania lub
      oznaczania jako zrealizowane.
    - UX, dostępność i bezpieczeństwo: Czytelny układ tabelaryczny, potwierdzenia przed usunięciem, możliwość
      filtrowania zamówień, autoryzacja operacji.

## 3. Mapa podróży użytkownika

- Użytkownik (gość):
    1. Wejście na stronę główną.
    2. Przeglądanie listy dostępnych drinków.
    3. Wprowadzenie imienia i preferencji w panelu AI w celu uzyskania rekomendacji drinka.
    4. Kliknięcie w wybrany drink celem złożenia zamówienia lub w rekomendacje AI, otrzymanie potwierdzenia.

- Użytkownik (gospodarz):
    1. Wejście na stronę główną.
    2. Kliknięcie przycisku logowania w topbarze, co otwiera modal logowania.
    3. Po poprawnym logowaniu, widok główny zmienia się (token JWT zapisany w localStorage), a topbar rozszerza się o
       zakładki administracyjne.
    4. Przechodzenie między widokami: zarządzania składnikami, drinkami oraz kolejką zamówień.
    5. Wykonywanie operacji CRUD z odpowiednimi potwierdzeniami i komunikatami błędów.

## 4. Układ i struktura nawigacji

- **Topbar/Nawigacja główna**:
    - Domyślny topbar zawiera logo i przycisk logowania.
    - Po zalogowaniu, topbar rozszerza się o dodatkowe zakładki: "Składniki", "Drinki", "Zamówienia".


- **Nawigacja wewnątrz widoków**:
    - Interaktywne elementy (jak karty drinków) umożliwiają łatwe przechodzenie do szczegółowych podglądów lub
      formularzy modyfikacji.

## 5. Kluczowe komponenty

- **Topbar/Nawigacja**: Centralny element nawigacyjny widoczny we wszystkich widokach, dynamicznie zmieniający się w
  zależności od stanu uwierzytelnienia.
- **Lista Drinków/Karty**: Interaktywny komponent wyświetlający drinki z informacjami o składnikach oraz możliwością
  szybkiego zamówienia.
- **Panel AI**: Formularz do wpisywania preferencji z dynamicznie aktualizowaną sugestią drinka, zintegrowany z
  backendowym API AI.
- **Formularze CRUD**: Wielokrotnego użytku formularze dla operacji dodawania, edycji oraz usuwania składników i
  drinków, z walidacją i komunikatami błędów inline.
- **Tabele/Lista**: Komponenty wyświetlające dane w widokach zarządzania (składniki, drinki, zamówienia) z funkcjami
  filtrowania, sortowania i paginacji.
- **Modal**: Globalny komponent wykorzystywany do logowania oraz potwierdzeń krytycznych operacji.