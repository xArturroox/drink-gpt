# Plan implementacji widoku Strona Główna (Widok Gościa)

## 1. Przegląd

Strona Główna (widok gościa) umożliwia gościom wybór drinka spośród dostępnych propozycji lub wprowadzenie własnych
preferencji, a także wpisanie imienia, w celu złożenia zamówienia.

## 2. Routing widoku

Ścieżka: `/`

## 3. Struktura komponentów

```
HomePage
├── TopBar
├── AISuggestionPanel
│   ├── PreferenceInput
│   ├── GuestNameInput
│   └── SuggestionResultModal
├── DrinksList
│   └── DrinkCard
└── OrderConfirmationModal
```

## 4. Szczegóły komponentów

### HomePage

- Opis: Kontener zarządzający stanem, wywołaniami API i koordynujący podkomponenty.
- Główne elementy:
    - `<TopBar />`
    - `<DrinksList />`
    - `<AISuggestionPanel />`
    - `<OrderConfirmationModal />`
- Obsługiwane zdarzenia:
    - `onSelectDrink(drink: DrinkViewModel, guestName: string)`
    - `onSubmitPreferences(preferences: string, guestName: string)`
- Walidacja:
    - Imię gościa nie może być puste.
    - Przy zamawianiu alkoholu lista składników musi być dostępna.
- Typy/propsy:
    - `drinks: DrinkViewModel[]`
    - `availableIngredients: IngredientDTO[]`
    - `guestName: string`
    - `isLoading: boolean`

### TopBar

- Opis: Pasek nawigacyjny z przyciskiem logowania.
- Główne elementy:
    - Logo/aplikacja
    - Przycisk `<LoginButton />`
- Zdarzenia:
    - `onLoginClick()`
- Propsy:
    - `isAuthenticated: boolean`

### AISuggestionPanel

- Opis: Formularz do wprowadzenia preferencji i imienia oraz wyświetlania wyniku AI.
- Główne elementy:
    - `<PreferenceInput />`
    - `<GuestNameInput />`
    - `<SubmitButton />`
- Zdarzenia:
    - `onChangePreferences(value: string)`
    - `onChangeGuestName(value: string)`
    - `onSubmit()`
- Walidacja:
    - Preferencje nie mogą być puste.
    - Imię gościa nie może być puste.
- Propsy:
    - `preferences: string`
    - `guestName: string`
    - `onSubmit(preferences: string, guestName: string)`
    - `suggestion?: AISuggestionViewModel`

### PreferenceInput / GuestNameInput

- Opis: Pola tekstowe z walidacją puste/rodzaju.
- Zdarzenia:
    - `onChange(value: string)`
- Propsy:
    - `value: string`
    - `placeholder: string`
    - `error?: string`

### SuggestionResultModal

- Opis: Modal prezentujący wynik AI z opcją potwierdzenia.
- Główne elementy:
    - Nazwa sugerowanego drinka
    - Opis
    - Lista składników
    - Przepis
    - Przyciski: `Potwierdź zamówienie`, `Anuluj`
- Zdarzenia:
    - `onConfirm(suggested: AISuggestionViewModel)`
    - `onCancel()`
- Propsy:
    - `suggestion: AISuggestionViewModel`

### OrderConfirmationModal

- Opis: Modal potwierdzający udane złożenie zamówienia.
- Główne elementy:
    - Komunikat sukcesu
    - UUID zamówienia
    - Przycisk `OK`
- Zdarzenia:
    - `onClose()`
- Propsy:
    - `order: OrderDTO`

### DrinksList

- Opis: Wyświetla listę kart drinków, filtrowanych po dostępnych składnikach.
- Główne elementy:
    - Lista `<DrinkCard />`
- Propsy:
    - `drinks: DrinkViewModel[]`
    - `onSelect(drink: DrinkViewModel)`

### DrinkCard

- Opis: Prezentacja pojedynczego drinka.
- Główne elementy:
    - Nazwa drinka
    - Krótki opis (opcjonalnie)
    - Przyciski: `Zamów` (wywołuje `onOrder`)
- Zdarzenia:
    - `onOrder(drink: DrinkViewModel)`
- Propsy:
    - `drink: DrinkViewModel`
    - `onOrder(drink: DrinkViewModel)`

## 5. Typy

### Nowe ViewModel

typ DrinkViewModel = {
id: number;
name: string;
ingredients: string; // połączona lista składników np. "Rum:50ml; Limonka:20g"
recipe: string;
};

typ AISuggestionViewModel = {
name: string;
description: string;
ingredients: string;
recipe: string;
};

### Wykorzystane DTO

- `IngredientDTO` (z `types.ts`)
- `DrinkDTO`
- `SuggestedDrinkDTO`
- `OrderRequestDTO`, `OrderDTO`

## 6. Zarządzanie stanem

- Użycie React `useState` w `HomePage` dla:
    - `drinks: DrinkViewModel[]`
    - `preferences: string`
    - `guestName: string`
    - `suggestion: AISuggestionViewModel | null`
    - `selectedDrink: DrinkViewModel | null`
    - `orderResult: OrderDTO | null`
    - `isLoading: boolean` i `error: string | null`
- Custom hook: `useDrinks()` do pobierania listy drinków filtrowanej po dostępności.

## 7. Integracja API

- `GET /api/drinks` → hook `useDrinks({available=true})` zwraca `DrinkDTO[]` → map na `DrinkViewModel`
- `POST /api/ai/suggestion` → `suggestDrink({preferences})` → `SuggestedDrinkDTO` → `AISuggestionViewModel`
- `POST /api/orders` → `createOrder({ drinkName, ingredients, recipe, guestName })` → `OrderDTO`

## 8. Interakcje użytkownika

1. Kliknięcie przycisku `Zamów` na `DrinkCard`:
    - Walidacja pola imienia.
    - Wywołanie `createOrder`.
    - Pokazanie `OrderConfirmationModal`.
2. Wypełnienie formularza AI i kliknięcie `Proponuj`:
    - Walidacja pól.
    - Wywołanie `suggestDrink`.
    - Otwarcie `SuggestionResultModal` z odpowiedzią.
3. Potwierdzenie sugestii AI:
    - Wywołanie `createOrder`.
    - Zamknięcie modala, pokazanie `OrderConfirmationModal`.

## 9. Warunki i walidacja

- Imię gościa: niepuste.
- Preferencje: niepuste.
- Lista dostępnych składników musi być niepusta przy zamówieniu z listy.
- Inline error messages przy błędach walidacji.

## 10. Obsługa błędów

- API errors: wyświetlanie toastów lub inline error messages.
- `catch` w hookach i metodach wywołujących API.
- Modal błędu w razie niepowodzenia AI lub zamówienia.

## 11. Kroki implementacji

1. Utworzyć plik strony: `frontend/src/pages/index.astro` lub `index.tsx` w Astro.
2. Zaimplementować strukturę komponentów według drzewa.
3. Napisać hook `useDrinks()`.
4. Zdefiniować nowe typy `DrinkViewModel`, `AISuggestionViewModel`.
5. Zaimplementować `TopBar` i podłączyć przycisk logowania.
6. Zaimplementować `DrinksList` i `DrinkCard`, połączyć z hookiem.
7. Stworzyć `AISuggestionPanel` z formularzem i walidacją.
8. Dodać modale `SuggestionResultModal` i `OrderConfirmationModal`.
9. Połączyć wywołania API i obsługę stanu w `HomePage`.
10. Przeprowadzić testy manualne i upewnić się o poprawności walidacji oraz UX. 