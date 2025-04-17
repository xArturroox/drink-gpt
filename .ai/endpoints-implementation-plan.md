
## Endpoint: GET /api/ingredients

### 1. Przegląd punktu końcowego
Endpoint służy do pobierania listy dostępnych składników z możliwością paginacji oraz filtrowania po dostępności.

### 2. Szczegóły żądania
- Metoda HTTP: GET
- Struktura URL: `/api/ingredients`
- Parametry:
  - Wymagane: brak
  - Opcjonalne: 
    - `page` (default: 0)
    - `size` (default: 20)
    - `available` (boolean, filtr dostępności)
- Request Body: Brak

### 3. Wykorzystywane typy
- DTO: `IngredientDTO`

### 4. Szczegóły odpowiedzi
- Odpowiedź: Lista obiektów `IngredientDTO`
- Kody statusu: 200 OK

### 5. Przepływ danych
Dane przechodzą z warstwy Controller do `IngredientsService`, a następnie do repozytorium (`IngredientRepository`). Wynik jest mapowany do `IngredientDTO` i zwracany do klienta.

### 6. Względy bezpieczeństwa
Endpoint publiczny, nie wymaga uwierzytelnienia. Walidacja parametrów wejściowych jest niezbędna.

### 7. Obsługa błędów
- Błąd walidacji parametrów: 400 Bad Request
- Błąd serwera: 500 Internal Server Error

### 8. Rozważania dotyczące wydajności
Stosowanie paginacji pozwala ograniczyć ilość przesyłanych danych i poprawić wydajność.

### 9. Etapy wdrożenia
1. Utworzenie metody w kontrolerze obsługującej GET `/api/ingredients`.
2. Implementacja logiki w serwisie korzystającego z repozytorium.
3. Mapowanie encji do `IngredientDTO`.
4. Dodanie walidacji parametrów zapytania.
5. Testowanie endpointu.

---

## Endpoint: POST /api/ingredients

### 1. Przegląd punktu końcowego
Endpoint umożliwia tworzenie nowego składnika.

### 2. Szczegóły żądania
- Metoda HTTP: POST
- Struktura URL: `/api/ingredients`
- Request Body:
  ```json
  {
    "name": "string",
    "available": true
  }
  ```

### 3. Wykorzystywane typy
- DTO: `IngredientRequestDTO` (dla walidacji wejściowej)
- DTO: `IngredientDTO` (dla odpowiedzi)

### 4. Szczegóły odpowiedzi
- Odpowiedź: Utworzony obiekt `IngredientDTO` z przypisanym `id`
- Kody statusu: 201 Created (sukces), 400 Bad Request (błędne dane)

### 5. Przepływ danych
Dane trafiają do kontrolera, następnie do `IngredientsService`, gdzie następuje walidacja i zapis przez `IngredientRepository`. Po zapisie obiekt jest konwertowany do `IngredientDTO` i zwracany.

### 6. Względy bezpieczeństwa
Wymagane uwierzytelnienie hosta (Spring Security). Walidacja przy użyciu Bean Validation (@Valid).

### 7. Obsługa błędów
- Walidacja danych wejściowych: 400 Bad Request
- Błąd zapisu w bazie: 500 Internal Server Error

### 8. Rozważania dotyczące wydajności
Operacja zapisu jest wykonywana synchronicznie; potencjalne przetwarzanie walidacji odbywa się na poziomie serwisu.

### 9. Etapy wdrożenia
1. Utworzenie endpointu w kontrolerze.
2. Implementacja metody w `IngredientsService` z użyciem walidacji.
3. Integracja z `IngredientRepository`.
4. Testy jednostkowe i integracyjne.

---

## Endpoint: GET /api/ingredients/{id}

### 1. Przegląd punktu końcowego
Endpoint zwraca szczegóły składnika na podstawie jego identyfikatora.

### 2. Szczegóły żądania
- Metoda HTTP: GET
- Struktura URL: `/api/ingredients/{id}`
- Parametry: `id` (ścieżkowy, wymagany)
- Request Body: Brak

### 3. Wykorzystywane typy
- DTO: `IngredientDTO`

### 4. Szczegóły odpowiedzi
- Odpowiedź: Obiekt `IngredientDTO`
- Kody statusu: 200 OK, 404 Not Found (gdy składnik nie istnieje)

### 5. Przepływ danych
Kontroler przekazuje `id` do `IngredientsService`, który odczytuje dane z repozytorium. W przypadku braku wyniku zwraca wyjątek NotFound.

### 6. Względy bezpieczeństwa
Endpoint publiczny, walidacja identyfikatora wejściowego.

### 7. Obsługa błędów
- Składnik nie znaleziony: 404 Not Found
- Błąd serwera: 500 Internal Server Error

### 8. Rozważania dotyczące wydajności
Bezpośredni dostęp do pojedynczego rekordu; optymalizacja indeksów w bazie.

### 9. Etapy wdrożenia
1. Utworzenie metody w kontrolerze.
2. Implementacja metody wyszukiwania w serwisie.
3. Rzucanie wyjątku dla nieistniejących rekordów.
4. Testowanie poprawności odpowiedzi.

---

## Endpoint: PATCH /api/ingredients/{id}

### 1. Przegląd punktu końcowego
Endpoint służy do aktualizacji właściwości istniejącego składnika.

### 2. Szczegóły żądania
- Metoda HTTP: PATCH
- Struktura URL: `/api/ingredients/{id}`
- Parametry: `id` (ścieżkowy, wymagany)
- Request Body:
  ```json
  {
    "name": "string",
    "available": true
  }
  ```

### 3. Wykorzystywane typy
- DTO: `IngredientRequestDTO`

### 4. Szczegóły odpowiedzi
- Odpowiedź: Zaktualizowany obiekt `IngredientDTO`
- Kody statusu: 200 OK, 400 Bad Request, 404 Not Found

### 5. Przepływ danych
Kontroler odbiera żądanie, przekazuje do `IngredientsService`, który weryfikuje istnienie składnika, aktualizuje pola i zapisuje zmiany w bazie.

### 6. Względy bezpieczeństwa
Wymagane uwierzytelnienie (Spring Security) oraz walidacja danych wejściowych (@Valid).

### 7. Obsługa błędów
- Niezgodność danych: 400 Bad Request
- Składnik nie istnieje: 404 Not Found

### 8. Rozważania dotyczące wydajności
Operacja przeprowadzana na pojedynczym rekordzie, minimalny wpływ na wydajność.

### 9. Etapy wdrożenia
1. Dodanie endpointu do kontrolera.
2. Implementacja logiki aktualizacji w serwisie.
3. Dodanie walidacji i mapowania zmian.
4. Testy jednostkowe.

---

## Endpoint: DELETE /api/ingredients/{id}

### 1. Przegląd punktu końcowego
Endpoint usuwa składnik na podstawie identyfikatora.

### 2. Szczegóły żądania
- Metoda HTTP: DELETE
- Struktura URL: `/api/ingredients/{id}`
- Parametry: `id` (ścieżkowy, wymagany)
- Request Body: Brak

### 3. Wykorzystywane typy
Brak dodatkowych DTO.

### 4. Szczegóły odpowiedzi
- Odpowiedź: Brak treści
- Kody statusu: 204 No Content, 404 Not Found

### 5. Przepływ danych
Kontroler przekazuje żądanie do `IngredientsService`, który wykonuje operację usunięcia poprzez `IngredientRepository`.

### 6. Względy bezpieczeństwa
Wymagane uwierzytelnienie hosta.

### 7. Obsługa błędów
- Składnik nie znaleziony: 404 Not Found
- Błąd usunięcia: 500 Internal Server Error

### 8. Rozważania dotyczące wydajności
Operacja usuwa pojedynczy rekord; kluczowe jest prawidłowe indeksowanie.

### 9. Etapy wdrożenia
1. Implementacja metody DELETE w kontrolerze.
2. Dodanie logiki usuwania w serwisie.
3. Obsługa wyjątków i testowanie.

---

## Endpoint: GET /api/drinks

### 1. Przegląd punktu końcowego
Pobiera listę drinków z możliwością paginacji oraz filtrowania po składnikach.

### 2. Szczegóły żądania
- Metoda HTTP: GET
- Struktura URL: `/api/drinks`
- Parametry:
  - Wymagane: brak
  - Opcjonalne:
    - `page` (default: 0)
    - `size` (default: 20)
    - `ingredient` (filtr według nazwy lub identyfikatora składnika)
- Request Body: Brak

### 3. Wykorzystywane typy
- DTO: `DrinkDTO` zawierający listę `DrinkIngredientDTO`

### 4. Szczegóły odpowiedzi
- Odpowiedź: Lista drinków z przepisami i listą składników
- Kody statusu: 200 OK

### 5. Przepływ danych
Kontroler przekazuje parametry do `DrinksService`, który wykonuje zapytanie z paginacją i filtrowaniem, a wyniki mapuje do `DrinkDTO`.

### 6. Względy bezpieczeństwa
Endpoint publiczny; walidacja parametrów wejściowych.

### 7. Obsługa błędów
- Błędy walidacji: 400 Bad Request
- Błąd odczytu z bazy: 500 Internal Server Error

### 8. Rozważania dotyczące wydajności
Stosowanie paginacji zmniejsza obciążenie bazy i transfer danych.

### 9. Etapy wdrożenia
1. Utworzenie metody GET w kontrolerze.
2. Implementacja logiki filtrowania i paginacji w `DrinksService`.
3. Mapowanie wyników do `DrinkDTO`.
4. Testowanie endpointu.

---

## Endpoint: POST /api/drinks

### 1. Przegląd punktu końcowego
Endpoint umożliwia tworzenie nowego drinka wraz z listą składników i instrukcjami receptury.

### 2. Szczegóły żądania
- Metoda HTTP: POST
- Struktura URL: `/api/drinks`
- Request Body:
  ```json
  {
    "name": "string",
    "ingredientIds": [1, 2, 3],
    "recipe": "Detailed preparation instructions"
  }
  ```

### 3. Wykorzystywane typy
- DTO: `DrinkDTO` (wyjściowy)
- Model wejściowy: struktura z listą identyfikatorów składników

### 4. Szczegóły odpowiedzi
- Odpowiedź: Utworzony drink z unikalnym identyfikatorem
- Kody statusu: 201 Created, 400 Bad Request, 404 Not Found (dla nieistniejących składników)

### 5. Przepływ danych
Dane trafiają do `DrinksService`, gdzie:
1. Walidowana jest obecność każdego składnika.
2. Tworzony jest nowy obiekt drinka.
3. Obiekt jest zapisywany w bazie danych i mapowany do `DrinkDTO`.

### 6. Względy bezpieczeństwa
Wymagane uwierzytelnienie hosta; walidacja danych wejściowych (@Valid).

### 7. Obsługa błędów
- Błędne dane wejściowe: 400 Bad Request
- Nieistniejące składniki: 404 Not Found
- Błąd serwera: 500 Internal Server Error

### 8. Rozważania dotyczące wydajności
Optymalizacja zapytań przy walidacji składników (fetch join, batch processing).

### 9. Etapy wdrożenia
1. Utworzenie endpointu w kontrolerze.
2. Implementacja logiki tworzenia drinka w `DrinksService`.
3. Implementacja walidacji i mapowania DTO.
4. Testy jednostkowe i integracyjne.

---

## Endpoint: GET /api/drinks/{id}

### 1. Przegląd punktu końcowego
Pobiera szczegóły drinka na podstawie identyfikatora.

### 2. Szczegóły żądania
- Metoda HTTP: GET
- Struktura URL: `/api/drinks/{id}`
- Parametry: `id` (ścieżkowy, wymagany)
- Request Body: Brak

### 3. Wykorzystywane typy
- DTO: `DrinkDTO` oraz `DrinkIngredientDTO`

### 4. Szczegóły odpowiedzi
- Odpowiedź: Obiekt `DrinkDTO` z przepisem i składnikami
- Kody statusu: 200 OK, 404 Not Found

### 5. Przepływ danych
Kontroler przekazuje `id` do `DrinksService`, który odczytuje dane z repozytorium i mapuje wynik do `DrinkDTO`.

### 6. Względy bezpieczeństwa
Endpoint publiczny; walidacja identyfikatora.

### 7. Obsługa błędów
- Drink nie znaleziony: 404 Not Found
- Błąd serwera: 500 Internal Server Error

### 8. Rozważania dotyczące wydajności
Bezpośredni dostęp do pojedynczego rekordu; minimalny wpływ na wydajność.

### 9. Etapy wdrożenia
1. Utworzenie metody w kontrolerze.
2. Implementacja logiki pobierania w `DrinksService`.
3. Obsługa wyjątków przy nieistniejących rekordach.
4. Testowanie poprawności odpowiedzi.

---

## Endpoint: PUT /api/drinks/{id}

### 1. Przegląd punktu końcowego
Aktualizuje istniejący drink, umożliwiając modyfikację nazwy, listy składników oraz przepisu.

### 2. Szczegóły żądania
- Metoda HTTP: PUT
- Struktura URL: `/api/drinks/{id}`
- Parametry: `id` (ścieżkowy, wymagany)
- Request Body:
  ```json
  {
    "name": "string",
    "ingredientIds": [1, 2, 3],
    "recipe": "Updated preparation instructions"
  }
  ```

### 3. Wykorzystywane typy
- DTO: `DrinkDTO`

### 4. Szczegóły odpowiedzi
- Odpowiedź: Zaktualizowany drink w formie `DrinkDTO`
- Kody statusu: 200 OK, 400 Bad Request, 404 Not Found

### 5. Przepływ danych
Serwis najpierw waliduje istnienie drinka, następnie aktualizuje dane i zapisuje zmiany. Wynik jest mapowany na `DrinkDTO`.

### 6. Względy bezpieczeństwa
Wymagane uwierzytelnienie, walidacja danych wejściowych (@Valid).

### 7. Obsługa błędów
- Błędne dane wejściowe: 400 Bad Request
- Drink nie znaleziony: 404 Not Found
- Błąd serwera: 500 Internal Server Error

### 8. Rozważania dotyczące wydajności
Optymalizacja zapytań aktualizujących rekord oraz minimalizacja operacji na bazie.

### 9. Etapy wdrożenia
1. Dodanie endpointu PUT w kontrolerze.
2. Implementacja logiki aktualizacji w `DrinksService`.
3. Testy walidacji i poprawności działania.

---

## Endpoint: DELETE /api/drinks/{id}

### 1. Przegląd punktu końcowego
Usuwa drink na podstawie przekazanego identyfikatora.

### 2. Szczegóły żądania
- Metoda HTTP: DELETE
- Struktura URL: `/api/drinks/{id}`
- Parametry: `id` (ścieżkowy, wymagany)
- Request Body: Brak

### 3. Wykorzystywane typy
Brak dodatkowych DTO.

### 4. Szczegóły odpowiedzi
- Odpowiedź: Brak treści
- Kody statusu: 204 No Content, 404 Not Found

### 5. Przepływ danych
Kontroler wywołuje metodę usunięcia w `DrinksService`, która komunikuje się z repozytorium.

### 6. Względy bezpieczeństwa
Wymagane uwierzytelnienie; ochrona przed nieautoryzowanym usunięciem.

### 7. Obsługa błędów
- Drink nie znaleziony: 404 Not Found
- Błąd podczas usuwania: 500 Internal Server Error

### 8. Rozważania dotyczące wydajności
Bezpośrednie usunięcie pojedynczego rekordu; ważne jest indeksowanie identyfikatora.

### 9. Etapy wdrożenia
1. Utworzenie endpointu DELETE w kontrolerze.
2. Implementacja logiki usuwania w `DrinksService`.
3. Obsługa wyjątków i testowanie.

---

## Endpoint: GET /api/orders

### 1. Przegląd punktu końcowego
Pobiera listę zamówień z możliwością paginacji oraz filtrowania po statusie lub dacie.

### 2. Szczegóły żądania
- Metoda HTTP: GET
- Struktura URL: `/api/orders`
- Parametry:
  - Wymagane: brak
  - Opcjonalne:
    - `page` (default: 0)
    - `size` (default: 20)
    - Filtry (np. status, timestamp)
- Request Body: Brak

### 3. Wykorzystywane typy
- DTO: `OrderDTO`

### 4. Szczegóły odpowiedzi
- Odpowiedź: Lista zamówień w formie `OrderDTO`
- Kody statusu: 200 OK

### 5. Przepływ danych
Zapytanie przechodzi przez kontroler do `OrdersService`, który pobiera dane z repozytorium z paginacją i opcjonalnymi filtrami.

### 6. Względy bezpieczeństwa
Endpoint publiczny; w razie potrzeby dodatkowych filtrów, walidacja danych wejściowych.

### 7. Obsługa błędów
- Błędne parametry zapytania: 400 Bad Request
- Błąd dostępu do bazy: 500 Internal Server Error

### 8. Rozważania dotyczące wydajności
Stosowanie paginacji oraz optymalizacja zapytań są kluczowe przy dużej liczbie zamówień.

### 9. Etapy wdrożenia
1. Utworzenie metody GET w kontrolerze.
2. Implementacja logiki paginacji w `OrdersService`.
3. Mapowanie wyników do `OrderDTO`.
4. Testy integracyjne.

---

## Endpoint: POST /api/orders

### 1. Przegląd punktu końcowego
Tworzy nowe zamówienie na drinka.

### 2. Szczegóły żądania
- Metoda HTTP: POST
- Struktura URL: `/api/orders`
- Request Body:
  ```json
  {
    "drinkName": "Mojito",
    "ingredients": "string",
    "recipe": "Add lime..",
    "guestName": "JOE"
  }
  ```

### 3. Wykorzystywane typy
- DTO: `OrderRequestDTO` (wejściowy)
- DTO: `OrderDTO` (wyjściowy)

### 4. Szczegóły odpowiedzi
- Odpowiedź: Utworzony obiekt `OrderDTO` z unikalnym UUID
- Kody statusu: 201 Created, 400 Bad Request, 404 Not Found (gdy drink nie istnieje)

### 5. Przepływ danych
Dane wejściowe są walidowane przez `OrdersService`, który zapisuje zamówienie w bazie i mapuje wynik do `OrderDTO`.

### 6. Względy bezpieczeństwa
Endpoint może być publiczny; konieczna walidacja danych wejściowych.

### 7. Obsługa błędów
- Błędne dane wejściowe: 400 Bad Request
- Nieistniejący drink: 404 Not Found
- Błąd serwera: 500 Internal Server Error

### 8. Rozważania dotyczące wydajności
Operacja zapisu jest lekka; zamówienia są przetwarzane pojedynczo.

### 9. Etapy wdrożenia
1. Utworzenie endpointu POST w kontrolerze.
2. Implementacja walidacji oraz logiki zapisu w `OrdersService`.
3. Testy walidacyjne i integracyjne.

---

## Endpoint: PATCH /api/orders/{orderId}/served

### 1. Przegląd punktu końcowego
Oznacza zamówienie jako obsłużone.

### 2. Szczegóły żądania
- Metoda HTTP: PATCH
- Struktura URL: `/api/orders/{orderId}/served`
- Parametry: `orderId` (ścieżkowy, wymagany)
- Request Body: Brak

### 3. Wykorzystywane typy
Brak dodatkowych DTO (operacja aktualizacji statusu).

### 4. Szczegóły odpowiedzi
- Odpowiedź: Brak treści
- Kody statusu: 200 No Content, 404 Not Found

### 5. Przepływ danych
Kontroler przekazuje `orderId` do `OrdersService`, gdzie następuje weryfikacja istnienia zamówienia, aktualizacja statusu oraz zapis zmian.

### 6. Względy bezpieczeństwa
Endpoint chroniony; wymaga uwierzytelnienia hosta (Spring Security).

### 7. Obsługa błędów
- Zamówienie nie znalezione: 404 Not Found
- Błąd aktualizacji: 500 Internal Server Error

### 8. Rozważania dotyczące wydajności
Operacja dotyczy pojedynczego rekordu – minimalne obciążenie.

### 9. Etapy wdrożenia
1. Dodanie endpointu PATCH w kontrolerze.
2. Implementacja logiki aktualizacji w `OrdersService`.
3. Testy bezpieczeństwa i poprawności działania.

---

## Endpoint: DELETE /api/orders/{orderId}

### 1. Przegląd punktu końcowego
Usuwa istniejące zamówienie z kolejki po przygotowaniu drinka.

### 2. Szczegóły żądania
- Metoda HTTP: DELETE
- Struktura URL: `/api/orders/{orderId}`
- Parametry: `orderId` (ścieżkowy, wymagany)
- Request Body: Brak

### 3. Wykorzystywane typy
Brak dodatkowych DTO.

### 4. Szczegóły odpowiedzi
- Odpowiedź: Brak treści
- Kody statusu: 204 No Content, 404 Not Found

### 5. Przepływ danych
Kontroler deleguje operację usunięcia do `OrdersService`, która usuwa rekord przez repozytorium.

### 6. Względy bezpieczeństwa
Wymagane uwierzytelnienie hosta; operacja dostępna tylko dla upoważnionych użytkowników.

### 7. Obsługa błędów
- Zamówienie nie znalezione: 404 Not Found
- Błąd usunięcia: 500 Internal Server Error

### 8. Rozważania dotyczące wydajności
Operacja usuwa pojedynczy rekord; wysoka wydajność przy prawidłowym indeksowaniu.

### 9. Etapy wdrożenia
1. Utworzenie endpointu DELETE w kontrolerze.
2. Implementacja logiki usuwania w `OrdersService`.
3. Testy funkcjonalne.

---

## Endpoint: POST /api/ai/suggestion

### 1. Przegląd punktu końcowego
Endpoint wykorzystuje integrację z Spring AI do generowania rekomendacji drinka na podstawie preferencji klienta.

### 2. Szczegóły żądania
- Metoda HTTP: POST
- Struktura URL: `/api/ai/suggestion`
- Request Body:
  ```json
  {
    "preferences": "Guest's description or mood"
  }
  ```

### 3. Wykorzystywane typy
- DTO: `AISuggestionRequestDTO` (wejściowy)
- DTO: `SuggestedDrinkDTO` (wyjściowy, zawiera: name, description, ingredients, recipe)

### 4. Szczegóły odpowiedzi
- Odpowiedź:
  ```json
  {
    "suggestedDrink": {
      "name": "string",
      "description": "string",
      "ingredients": "string",
      "recipe": "Detailed recipe generated by AI"
    }
  }
  ```
- Kody statusu:
  - 200 OK (sukces)
  - 400 Bad Request (błędne dane wejściowe)
  - 500 Internal Server Error (problemy z integracją AI)

### 5. Przepływ danych
Dane wejściowe są walidowane i przetwarzane przez `AISuggestionService`, który komunikuje się z zewnętrznym serwisem AI (np. Openrouter.ai). Wynik przetwarzania jest mapowany do `SuggestedDrinkDTO` i zwracany do klienta.

### 6. Względy bezpieczeństwa
- Walidacja danych wejściowych
- Ograniczenie nadużyć (np. rate limiting) dla wywołań usługi AI
- Monitorowanie i logowanie wywołań zewnętrznych

### 7. Obsługa błędów
- Błędne dane wejściowe: 400 Bad Request
- Problemy z integracją: 500 Internal Server Error
- Centralny mechanizm obsługi wyjątków (@ControllerAdvice) zwraca jednolity format błędów

### 8. Rozważania dotyczące wydajności
Synchronizacja wywołań zewnętrznych. W przyszłości można rozważyć asynchroniczne przetwarzanie lub cache'owanie wyników.

### 9. Etapy wdrożenia
1. Utworzenie endpointu w kontrolerze.
2. Implementacja `AISuggestionService` integrującego funkcjonalność AI.
3. Walidacja danych wejściowych i obsługa wywołań zewnętrznych.
4. Testy jednostkowe i integracyjne.

---

# Wspólne Rozważania dla Całego API

### Walidacja i Bezpieczeństwo
- Użycie @Valid oraz adnotacji Bean Validation zapewnia poprawność danych wejściowych.
- Centralizacja obsługi błędów przy użyciu @ControllerAdvice oraz jednolitego formatu odpowiedzi błędów (ErrorResponseDto).

### Logowanie i Monitorowanie
- Logowanie operacji na poziomie serwisów za pomocą SLF4J (np. z użyciem @Slf4j z Lombok).

### Strategie Wydajności
- Stosowanie paginacji przy operacjach odczytu.
- Rozważenie asynchronicznego przetwarzania dla zasobożernych operacji (np. integracja AI).

### Etapy Wdrożenia Całości
1. Definicja interfejsów REST w kontrolerach.
2. Implementacja logiki biznesowej w warstwie serwisów.
3. Integracja z repozytoriami Spring Data JPA.
4. Walidacja i mapowanie danych przy użyciu DTO.
5. Konfiguracja Spring Security do ochrony endpointów gospodarza
6. Implementacja centralnego mechanizmu obsługi błędów.
7. Testowanie jednostkowe i integracyjne wszystkich endpointów.

---

# Podsumowanie
Powyższy plan wdrożenia dostarcza szczegółowych wskazówek implementacyjnych dla endpointów REST API, z uwzględnieniem specyfikacji, walidacji, bezpieczeństwa, wydajności oraz obsługi błędów. Zastosowanie technologii Spring Boot, Spring Data JPA i Spring Security zapewnia nowoczesne podejście do implementacji oraz umożliwia skalowalność i niezawodność systemu. 