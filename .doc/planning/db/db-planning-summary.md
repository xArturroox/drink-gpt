<conversation_summary>
<decisions>
1. Ustalono, że nie będą tworzone osobne encje dla użytkowników (gospodarzy) ani dla kroków przepisu.
2. Przepis dla drinka będzie przechowywany jako pojedynczy tekst w tabeli Drinks, a w przypadku wyboru drinka dane (nazwa drinka, kroki przygotowania, składniki oraz przepis) zostaną przekopiowane do tabeli Orders jako pola niezależne.
3. Tabela Orders nie będzie zawierała klucza obcego do tabeli Drinks.
4. Zastosujemy następujące typy danych: INT, UUID, TIMESTAMP, VARCHAR, DECIMAL, BOOLEAN.
5. Relacja między tabelami Drinks i Ingredients będzie modelowana jako relacja wiele-do-wielu, z dedykowaną tabelą łączącą zawierającą dodatkowe kolumny na wymaganą ilość składnika oraz jednostkę, z ograniczeniem unikalności par (drink_id, ingredient_id).
6. W tabelach Ingredients i Drinks nazwy muszą być unikalne, a wszystkie pola w encjach Drinks i Ingredients mają być obowiązkowe (NOT NULL).
7. Dodatkowe ograniczenia i walidacje (np. format danych tekstowych, limity dla pól liczbowych) zostaną wprowadzone.
8. Polityki RLS (Row Level Security) zostaną zaimplementowane jednolicie we wszystkich tabelach, przy czym dla publicznego dostępu polityka może zwracać true.
9. Indeksy zostaną utworzone na kolumnie dostępności w tabeli Ingredients oraz na kolumnie timestamp w tabeli Orders.
10. Migracje schematu bazy danych będą realizowane za pomocą Flyway zgodnie z wytycznymi (m.in. nazewnictwo plików migracji oraz komentarze w migracjach).
</decisions>

<matched_recommendations>
1. Utworzenie trzech głównych tabel: Drinks, Ingredients oraz Orders
2. Implementacja tabeli łączącej Drinks i Ingredients z dodatkowym zapisem informacji o wymaganej ilości składnika i jednostce, wraz z ograniczeniem unikalności.
3. Zastosowanie obowiązkowych pól z unikalnymi nazwami w tabelach Drinks i Ingredients.
4. Implementacja jednolitych polityk RLS dla wszystkich tabel.
5. Wdrożenie dodatkowych ograniczeń i walidacji, takich jak format danych tekstowych oraz limity dla pól liczbowych.
6. Użycie typów danych: INT, UUID, TIMESTAMP, VARCHAR, DECIMAL, BOOLEAN.
7. Zastosowanie indeksów na kolumnach kluczowych dla wydajności zapytań.
8. Realizacja migracji schematu bazy danych wg zaleceń Flyway.
</matched_recommendations>

<database_planning_summary>
Główne wymagania dotyczące schematu bazy danych obejmują utworzenie trzech głównych tabel (Drinks, Ingredients, Orders) oraz jednej tabeli łączącej dla relacji wiele-do-wielu między Drinks a Ingredients. Dane drinka (nazwa, przepis, kroki przygotowania, składniki) będą kopiowane do tabeli Orders jako niezależne pola, a Orders nie będzie posiadała klucza obcego do Drinks. Wszystkie pola w tabelach Drinks i Ingredients mają być obowiązkowe, przy czym nazwy muszą być unikalne. Typy danych zostaną dobrane spośród INT, UUID, TIMESTAMP, VARCHAR, DECIMAL i BOOLEAN, a dane czasowe zapisane w formacie TIMESTAMP w strefie UTC. Specyficzne wymagania obejmują także wprowadzenie dedykowanych indeksów oraz jednolitych polityk RLS dla wszystkich tabel, co zapewni spójność i bezpieczeństwo danych. Migracje bazy danych będą realizowane przy użyciu Flyway, zgodnie ze standardem nazewnictwa i szczegółowym dokumentowaniem zmian.
</database_planning_summary>
</conversation_summary>
