# Plan implementacji widoku Zarządzania Drinkami (Widok Gospodarza)

## 1. Przegląd

Widok służy hostowi do zarządzania recepturami drinków: przeglądania listy, dodawania nowych, edytowania istniejących
oraz usuwania. Dostępny wyłącznie po uwierzytelnieniu.

## 2. Routing widoku

Ścieżka: `/host/drinks`
Frontend: plik `frontend/src/pages/host/drinks.astro` lub `drinks.tsx`, renderujący komponent React `HostDrinksView`.

## 3. Struktura komponentów

HostDrinksView
├─ DrinkList
│ └─ DrinkCard (x N)
├─ DrinkFormModal
│ └─ IngredientSelector
└─ ConfirmDialog

## 4. Szczegóły komponentów

### HostDrinksView

- Opis: Główny kontener widoku, zarządza stanem CRUD i modalami.
- Główne elementy:
    - Nagłówek z przyciskiem "Dodaj drink"
    - `<DrinkList />`
    - `<DrinkFormModal />` (client:load)
    - `<ConfirmDialog />`
- Obsługiwane zdarzenia:
    - addClick → otwórz modal w trybie add
    - editClick(drink) → otwórz modal w trybie edit z initialValues
    - deleteClick(drink) → otwórz ConfirmDialog
- Walidacja: brak bezpośrednia (delegacja do formularza)
- Typy:
    - ViewModel: `DrinkViewModel`
    - FormValues: `DrinkFormValues`
- Propsy: brak (sam inicjuje dane)

### DrinkList

- Opis: Renderuje listę `DrinkCard` na podstawie tablicy.
- Główne elementy: `<ul>` lub `<div grid>` z mapowaniem po `drinks`
- Obsługiwane zdarzenia: onEdit, onDelete propowane dalej
- Walidacja: brak
- Typy: `DrinkViewModel[]`
- Propsy:
    - drinks: DrinkViewModel[]
    - onEdit(drink: DrinkViewModel)
    - onDelete(drink: DrinkViewModel)

### DrinkCard

- Opis: Karta pojedynczego drinka – pokazuje nazwę, składniki i fragment przepisu.
- Główne elementy:
    - Tytuł (nazwa)
    - Lista składników (nazwa + quantity + unit)
    - Fragment przepisu (np. pierwsze 100 znaków)
    - Przycisk Edytuj, Przycisk Usuń
- Obsługiwane zdarzenia:
    - click Edit → onEdit(drink)
    - click Delete → onDelete(drink)
- Walidacja: brak
- Typy: DrinkViewModel
- Propsy:
    - drink: DrinkViewModel
    - onEdit: (drink) => void
    - onDelete: (drink) => void

### DrinkFormModal

- Opis: Modal z formularzem tworzenia/edycji drinka.
- Główne elementy:
    - Pole TextInput: nazwa (required)
    - `<IngredientSelector />` (multi-field)
    - Textarea: przepis (required)
    - Buttons: Zapisz, Anuluj
- Obsługiwane zdarzenia:
    - onSubmit(values: DrinkFormValues)
    - onClose()
- Walidacja:
    - name !== ''
    - ingredients.length > 0
    - każdy quantity > 0, unit !== ''
    - recipe !== ''
- Typy:
    - initialValues?: DrinkFormValues
    - onSubmit: (values: DrinkFormValues) => void
    - isOpen: boolean
- Propsy:
    - isOpen
    - initialValues?
    - onSubmit
    - onClose

### IngredientSelector

- Opis: Pozwala wybierać składniki dostępne i definiować ich quantity i unit.
- Główne elementy:
    - Select lub Combobox dla dostępnych składników (z `fetchIngredients({available:true})`)
    - Lista wybranych: wiersz z quantity, unit, przycisk usuń
    - Przycisk dodaj kolejny składnik
- Obsługiwane zdarzenia:
    - addIngredient(id)
    - updateIngredient(index, {quantity, unit})
    - removeIngredient(index)
- Walidacja:
    - co najmniej jeden element
    - quantity > 0, unit !== ''
- Typy:
    - ingredients: Array<{ id: number; quantity: number; unit: string }>
    - onChange: (ingredients) => void
- Propsy:
    - ingredients, onChange

### ConfirmDialog

- Opis: Dialog potwierdzenia usunięcia drinka.
- Propsy:
    - isOpen, message: string, onConfirm, onCancel

## 5. Typy

```ts
// ViewModel
interface DrinkViewModel {
  id: number;
  name: string;
  ingredients: { id: number; name: string; quantity: number; unit: string }[];
  recipe: string;
}

// Form
interface DrinkFormValues {
  name: string;
  ingredients: { id: number; quantity: number; unit: string }[];
  recipe: string;
}
```

## 6. Zarządzanie stanem

- Custom hooks:
    - `useDrinks()` zwraca: drinks, loading, error + metody fetchAll, create, update, remove
    - `useIngredients()` zwraca: ingredients, loading, error
- HostDrinksView utrzymuje:
    - modalMode: 'add' | 'edit'
    - selectedDrink?: DrinkViewModel
    - isFormModalOpen, isConfirmOpen, drinkToDelete

## 7. Integracja API

- fetchDrinks() → DrinkDTO[] → map → DrinkViewModel[]
- fetchIngredients({available:true}) → IngredientDTO[]
- createDrink({ name, ingredientIds: [..], recipe })
- updateDrink(id, payload)
- deleteDrink(id)

## 8. Interakcje użytkownika

1. Otwórz widok → lista drinków ładuje się automatycznie.
2. Klik "Dodaj drink" → modal otwarty w trybie add.
3. Wybierz składniki, wypełnij nazwę i przepis → klik Zapisz.
4. Po sukcesie modal zamknięty + toast + lista odświeżona.
5. Klik "Edytuj" przy drinku → modal z wypełnionymi polami
6. Edytuj i zatwierdź → update + refresh.
7. Klik "Usuń" → ConfirmDialog → po potwierdzeniu delete + refresh.

## 9. Warunki i walidacja

- UI wymusza wymagane pola: name, recipe, ingredients.
- quantity > 0, unit niepusty.
- Przed wywołaniem API walidacja w formie.
- Na błędy 400/validation z backendu: mapować do pól formularza.

## 10. Obsługa błędów

- Globalny alert lub toast dla błędów fetch.
- W modalach wyświetlenie błędu inline + alert.
- Po błędzie operacji: zachować modal otwarty, by użytkownik spróbował ponownie.

## 11. Kroki implementacji

1. Stworzyć DSL routingu: `frontend/src/pages/host/drinks.astro` importujący `HostDrinksView`.
2. Utworzyć plik `frontend/src/components/host/HostDrinksView.tsx` (kontener):
    - Podłączyć hooki useDrinks i useIngredients.
3. Zaimplementować `DrinkList` i `DrinkCard`.
4. Zaimplementować `DrinkFormModal` + `IngredientSelector` (sugerowany React Hook Form + useFieldArray).
5. Dodaj `ConfirmDialog` (można użyć Shadcn/ui `<Dialog>`).
6. Zaimplementować mapping DTO ↔ ViewModel.
7. Dodać toasty (Shadcn/ui `<Toast>`).
8. Napisać testy integracyjne komponentów (najlepiej React Testing Library).
9. Zweryfikować dostępność (ARIA) i responsywność (Tailwind Breakpoints).
10. Dokładnie przetestować scenariusze błędów i edge case'y. 