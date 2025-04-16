# Schemat Bazy Danych dla DrinkGPT

## 1. Lista Tabel

### 1.1 Tabela Drinks
- **id**: INT, PRIMARY KEY, AUTO_INCREMENT  
- **name**: VARCHAR(255), NOT NULL, UNIQUE  
- **recipe**: VARCHAR(2000), NOT NULL  
  *Opis*: Przechowuje pełny przepis drinka (z miarami i krokami przygotowania).

### 1.2 Tabela Ingredients
- **id**: INT, PRIMARY KEY, AUTO_INCREMENT  
- **name**: VARCHAR(255), NOT NULL, UNIQUE  
- **available**: BOOLEAN, NOT NULL  
  *Opis*: Określa dostępność składnika.

### 1.3 Tabela Drink_Ingredients (Tabela Łącząca)
- **drink_id**: INT, NOT NULL  
- **ingredient_id**: INT, NOT NULL  
- **quantity**: DECIMAL, NOT NULL  
- **unit**: VARCHAR(50), NOT NULL  
  *Constraints*:  
  - PRIMARY KEY (drink_id, ingredient_id) – unikalność pary  
  - FOREIGN KEY (drink_id) REFERENCES Drinks(id)  
  - FOREIGN KEY (ingredient_id) REFERENCES Ingredients(id)  
  *Opis*: Przechowuje ilość i jednostkę danego składnika wymaganą do przygotowania drinka.

### 1.4 Tabela Orders
- **id**: UUID, PRIMARY KEY  
- **drink_name**: VARCHAR(255), NOT NULL  
- **ingredients**: VARCHAR(1000), NOT NULL  
- **recipe**: VARCHAR(2000), NOT NULL  
- **guest_name**: VARCHAR(255), NOT NULL  
- **order_timestamp**: TIMESTAMP, NOT NULL
- **served**: BOOLEAN, NOT NULL 
  *Opis*: Dane kopiowane w momencie złożenia zamówienia – zawiera nazwę drinka, szczegółowy przepis, kroki przygotowania, listę składników, dane gościa oraz czas zamówienia. Brak klucza obcego do tabeli Drinks.

## 2. Relacje Między Tabelami
- **Drinks ↔ Ingredients**: Relacja wiele-do-wielu realizowana przez tabelę `Drink_Ingredients`.
- **Orders**: Tabela denormalizowana – dane drinka są kopiowane w chwili zamówienia, bez bezpośredniej relacji z tabelą `Drinks`.

## 3. Indeksy
- **Ingredients**: Indeks na kolumnie `available` w celu optymalizacji zapytań filtrujących składniki pod kątem dostępności.
- **Orders**: Indeks na kolumnie `order_timestamp` dla szybkiego wyszukiwania zamówień według daty.

## 4. Uwagi i Wyjaśnienia
- Wszystkie pola w tabelach `Drinks` i `Ingredients` są obowiązkowe (NOT NULL), a nazwy muszą być unikalne.
- Tabela `Orders` nie posiada klucza obcego do `Drinks` – dane drinka są kopiowane w sposób denormalizowany.
- Dane czasowe są zapisywane jako `TIMESTAMP` w strefie UTC.
- Migracje schematu bazy danych będą realizowane przy użyciu Flyway, zgodnie z ustalonym standardem nazewnictwa i dokumentowaniem zmian.
- Typy danych dobrano z uwzględnieniem możliwości H2 i wymagań technologicznych: INT, UUID, TIMESTAMP, VARCHAR, DECIMAL, BOOLEAN.