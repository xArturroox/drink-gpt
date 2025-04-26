# Plan implementacji widoku Zarządzania Składnikami (Host Ingredients)

## 1. Przegląd

Widok Zarządzania Składnikami służy gospodarzowi do bieżącego zarządzania składnikami: przeglądu listy, dodawania
nowych, edytowania istniejących oraz ich usuwania. Interfejs minimalizuje liczbę kliknięć dzięki modalom oraz
natychmiastowej walidacji.

## 2. Routing widoku

Ścieżka: `/host/ingredients` (Astro Page w `frontend/src/pages/host/ingredients.astro` lub `tsx` z React).

## 3. Struktura komponentów

- HostIngredientsPage
    - IngredientListToolbar (przycisk "Dodaj składnik")
    - IngredientList
        - IngredientItem (pozycja listy, przyciski Edytuj i Usuń)
    - IngredientModalForm (modal/drawer do Add/Edit)
    - ConfirmationDialog (modal do potwierdzenia Usunięcia)

## 4. Szczegóły komponentów

### HostIngredientsPage

- Opis: kontener strony, ładuje dane, zarządza stanem listy i formularzy.
- Główne elementy: nagłówek, `IngredientListToolbar`, `IngredientList`, modale.
- Obsługiwane zdarzenia: onLoad, onAddClick, onEditClick, onDeleteClick.
- Warunki walidacji: brak (zarządzane w formularzu).
- Typy: none bezpośrednio.
- Propsy: —

### IngredientListToolbar

- Opis: pasek narzędzi z przyciskiem Dodaj.
- Główne elementy: Button "Dodaj składnik".
- Obsługiwane zdarzenia: onAddClick.
- Warunki walidacji: —
- Typy:
  ```ts
  interface IngredientListToolbarProps { onAddClick: () => void; }
  ```

### IngredientList

- Opis: wyświetla listę składników.
- Główne elementy: tabela lub `<ul>` pozycji `IngredientItem`.
- Obsługiwane zdarzenia: przekazuje edytuj/usuwaj z Item do strony.
- Typy:
  ```ts
  interface IngredientListProps { items: IngredientDTO[]; onEdit: (item: IngredientDTO) => void; onDelete: (id: number) => void; }
  ```

### IngredientItem

- Opis: pojedynczy wiersz z nazwą, stanem dostępności i akcjami.
- Główne elementy: nazwa, switch/ikonka dostępności, przyciski Edytuj, Usuń.
- Obsługiwane zdarzenia: onEditClick, onDeleteClick.
- Typy:
  ```ts
  interface IngredientItemProps { item: IngredientDTO; onEdit: (item: IngredientDTO) => void; onDelete: (id: number) => void; }
  ```

### IngredientModalForm

- Opis: formularz dodawania/edycji w modalu.
- Główne elementy: pole tekstowe `name`, przełącznik `available`, Button Save, Button Cancel.
- Obsługiwane zdarzenia: onSubmit, onCancel.
- Warunki walidacji:
    - `name`: wymagane, nie puste.
- Typy:
  ```ts
  interface IngredientFormValues { name: string; available: boolean; }
  interface IngredientModalFormProps { initialValues?: IngredientFormValues; onSubmit: (data: IngredientFormValues) => void; onCancel: () => void; }
  ```

### ConfirmationDialog

- Opis: prośba o potwierdzenie usunięcia.
- Główne elementy: tekst, Button Confirm, Button Cancel.
- Obsługiwane zdarzenia: onConfirm, onCancel.
- Typy:
  ```ts
  interface ConfirmationDialogProps { message: string; onConfirm: () => void; onCancel: () => void; }
  ```

## 5. Typy

- Z istniejących:
  ```ts
  interface IngredientDTO { id: number; name: string; available: boolean; }
  interface IngredientRequestDTO { name: string; available: boolean; }
  ```
- Nowe ViewModel:
  ```ts
  interface IngredientFormValues { name: string; available: boolean; }
  ```

## 6. Zarządzanie stanem

- React `useState` i `useEffect` w `HostIngredientsPage`:
    - `ingredients: IngredientDTO[]`
    - `isLoading: boolean`
    - `showModal: boolean` + `editingItem?: IngredientDTO`
    - `showConfirm: boolean` + `deletingId?: number`
- Możliwy custom hook `useIngredients` obsługujący fetch/create/update/delete oraz stan ładowania.

## 7. Integracja API

- `fetchIngredients({ available?: boolean })` – ładowanie listy.
- `createIngredient(request: IngredientRequestDTO)` – dodawanie.
- `updateIngredient(id, request: IngredientRequestDTO)` – edycja.
- `deleteIngredient(id)` – usuwanie.
- Typy żądań i odpowiedzi: zgodnie z `frontend/src/lib/api.ts` i `frontend/src/types.ts`.

## 8. Interakcje użytkownika

1. Otworzenie widoku -> ładowanie listy -> wyświetlenie.
2. Klik "Dodaj składnik" -> otwarcie `IngredientModalForm` (puste pola).
3. Wypełnienie i submit -> walidacja -> call API -> zamknięcie, odświeżenie listy.
4. Klik Edytuj przy pozycji -> modal z wypełnionymi wartościami -> edycja -> call API -> zamknięcie, odświeżenie.
5. Klik Usuń -> otwarcie `ConfirmationDialog` -> potwierdzenie -> call API -> zamknięcie, odświeżenie.

## 9. Warunki i walidacja

- `name`: wymagane, min długość 1 (frontendowa walidacja).
- `available`: boolean.
- Block submit jeśli walidacja nie przejdzie.

## 10. Obsługa błędów

- Pokazywać komunikat toast/error banner przy błędach sieci/API.
- W formularzu inline validation.
- Fallback: ponów fetch przy błędzie.

## 11. Kroki implementacji

1. Stworzyć stronę Astro/React w `src/pages/host/ingredients`.
2. Zaimportować typy i API z `lib/api.ts`.
3. Zaimplementować `useIngredients` hook.
4. Utworzyć i otestować komponenty: `IngredientListToolbar`, `IngredientList`, `IngredientItem`, `IngredientModalForm`,
   `ConfirmationDialog`.
5. Złożyć `HostIngredientsPage`, zarządzanie stanem i integracja API.
6. Dodać walidację formularza (React Hook Form lub własna).
7. Dodać obsługę błędów i toasty.
8. Przetestować przypadki: CRUD, walidacja, błędy.
9. Dodać style Tailwind/Shadcn/ui.
10. Przeprowadzić code review i merge. 