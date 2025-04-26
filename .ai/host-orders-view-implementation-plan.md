# Plan implementacji widoku Kolejki Zamówień (Widok Gospodarza)

## 1. Przegląd

Widok umożliwia gospodarzowi monitorowanie i zarządzanie wszystkimi złożonymi przez gości zamówieniami. Wyświetla listę
zamówień ze szczegółami (nazwa drinka, składniki, przepis, imię gościa, czas złożenia). Umożliwia oznaczanie zamówień
jako zrealizowane oraz usuwanie ich z kolejki.

## 2. Routing widoku

Ścieżka: `/host/orders`
Strona zostanie zaimplementowana jako plik Astro w `frontend/src/pages/host/orders.astro` lub jako komponent React
renderowany przez layout gospodarza.

## 3. Struktura komponentów

- **HostOrdersPage** (strona/komponent główny)
  ├─ FilterSortControls
  ├─ OrderTable
  │ └─ OrderRow* (lista wierszy)
  │ ├─ ServeButton
  │ └─ DeleteButton
  ├─ PaginationControls
  └─ ConfirmationDialog

## 4. Szczegóły komponentów

### HostOrdersPage

- Opis: Ładuje dane zamówień, zarządza stanem (filtry, paginacja), obsługuje akcje serve/delete.
- Główne elementy: FilterSortControls, OrderTable, PaginationControls, ConfirmationDialog.
- Obsługiwane zdarzenia: zmiana filtra, sortowanie, paginacja, klik serve, klik delete.
- Typy: używa `OrderViewModel[]`, `FilterOptions`, `Pagination`.
- Propsy: brak (sam zarządza logiką i stanem).

### FilterSortControls

- Opis: Formularz do filtrowania statusu (pending/served) i zakresu dat.
- Elementy: dropdown status, date picker from/to.
- Zdarzenia: onFilterChange(filterOptions).
- Walidacja: data "from" ≤ "to".
- Typy: `FilterOptions`.
- Propsy: `filters: FilterOptions`, `onChange: (newFilters) => void`.

### OrderTable

- Opis: Tabela z nagłówkami i mapowaniem wierszy.
- Elementy: `<table>` z kolumnami: Numer, Drink, Składniki, Przepis, Gość, Czas, Akcje.
- Zdarzenia: brak, przekazuje onServe/onDelete dla wierszy.
- Typy: `OrderViewModel[]`.
- Propsy: `orders: OrderViewModel[]`, `onServe: (id:string)=>void`, `onDelete: (id:string)=>void`, `loading:boolean`.

### OrderRow

- Opis: Reprezentuje jeden wiersz zamówienia.
- Elementy: `<tr>` z `<td>` dla każdego pola, przyciski Serve i Delete (Shadcn/UI Button).
- Zdarzenia: onClick ServeButton → `onServe(id)`, onClick DeleteButton → `onDelete(id)`.
- Walidacja: dezaktywacja przycisków podczas ładowania.
- Typy: `OrderViewModel`.
- Propsy: `order: OrderViewModel`, `onServe`, `onDelete`.

### ConfirmationDialog

- Opis: Modal potwierdzający usunięcie zamówienia.
- Elementy: Title, Text, Button Cancel, Button Confirm.
- Zdarzenia: onConfirm, onCancel.
- Typy: `ConfirmationDialogProps { isOpen: boolean; onConfirm: ()=>void; onCancel: ()=>void; }`.
- Propsy: jak w typach.

### PaginationControls

- Opis: Nawigacja między stronami.
- Elementy: Button Prev, Button Next, opcjonalny dropdown size.
- Zdarzenia: onPageChange(page), onSizeChange(size).
- Typy: `Pagination { page:number; size:number; }`.
- Propsy: `pagination: Pagination`, `onChange: (pag)=>void`.

## 5. Typy

```ts
interface OrderViewModel {
  id: string;
  drinkName: string;
  ingredients: string;
  recipe: string;
  guestName: string;
  orderTimestamp: string; // sformatowany
  served: boolean;
}

interface FilterOptions {
  status?: 'pending' | 'served';
  from?: Date;
  to?: Date;
}

interface Pagination {
  page: number;
  size: number;
}
```

## 6. Zarządzanie stanem

- Custom hook `useOrders`:
  ```ts
  function useOrders() {
    const [orders, setOrders] = useState<OrderViewModel[]>([]);
    const [filters, setFilters] = useState<FilterOptions>({ page: 0, size: 20 });
    const [pagination, setPagination] = useState<Pagination>({ page: 0, size: 20 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    
    const fetchOrders = async () => { ... };
    const serveOrder = async (id: string) => { ... };
    const deleteOrder = async (id: string) => { ... };
    
    return { orders, filters, pagination, loading, error, fetchOrders, serveOrder, deleteOrder, setFilters, setPagination };
  }
  ```
- Dialog potwierdzenia: `useConfirmationDialog` (stan isOpen, targetId).

## 7. Integracja API

- GET `/api/orders?page={page}&size={size}&status={status}` → fetchOrders → OrderDTO[] → map → OrderViewModel.
- PATCH `/api/orders/{orderId}/served` → markOrderAsServed → refetch.
- DELETE `/api/orders/{orderId}` → deleteOrder → refetch.

## 8. Interakcje użytkownika

1. Wczytanie strony → useEffect → fetchOrders.
2. Zmiana filtra → setFilters → fetchOrders.
3. Kliknięcie Serve → serveOrder(id) → odśwież.
4. Kliknięcie Delete → otwarcie ConfirmationDialog → Confirm → deleteOrder(id) → odśwież.
5. Stronicowanie → zmiana page/size → fetchOrders.

## 9. Warunki i walidacja

- FilterControls: fromDate ≤ toDate.
- Pagination: page ≥ 0, size > 0.
- Przyciski wyłączone przy loading.
- Brak uprawnień → przyciski serve/delete niewidoczne.

## 10. Obsługa błędów

- Globalny banner lub toast (Shadcn/ui Toast) na błędy fetch, serve, delete.
- Fallback UI: "Brak zamówień" lub "Błąd ładowania".

## 11. Kroki implementacji

1. Utworzyć stronę `frontend/src/pages/host/orders.astro` (lub .tsx) i wstawić `HostOrdersPage`.
2. Napisać hook `useOrders` w `frontend/src/lib/hooks/useOrders.ts`.
3. Stworzyć komponenty: FilterSortControls, OrderTable, OrderRow, PaginationControls, ConfirmationDialog w
   `frontend/src/components/host/orders/`.
4. Zdefiniować typy w `frontend/src/types.ts` lub `host-orders-types.ts`.
5. Zaimplementować mapowanie `OrderDTO` → `OrderViewModel` (formatowanie daty).
6. Użyć Shadcn/ui do stylizacji tabeli, przycisków, dialogów.
7. Dodać obsługę loading i error w UI.
8. Przetestować scenariusze: bez zamówień, błąd sieci, serve, delete.
9. Zapewnić dostępność (aria-label, focus trap) i responsywność.
10. Code review i ewentualne poprawki. 