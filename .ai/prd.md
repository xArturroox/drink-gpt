# Dokument wymagań produktu (PRD) - DrinkGPT

## 1. Przegląd produktu
DrinkGPT to minimalna wersja produktu (MVP) zaprojektowana z myślą o ułatwieniu wyboru drinka lub napoju podczas domówek. Aplikacja umożliwia gospodarzowi zarządzanie składnikami oraz gotowymi propozycjami drinków, a także obsługuje zamówienia składane przez gości. Goście mogą wybierać spośród listy gotowych drinków lub wprowadzić swoje preferencje w pojedynczym polu tekstowym, z których na podstawie danych generowane są sugestie drinków przez AI. System przypisuje unikalny identyfikator (UUID) każdemu zamówieniu, co pozwala na rozróżnienie gości, nawet jeśli posługują się tym samym imieniem.

## 2. Problem użytkownika
Na domówkach wybór napoju lub drinka bywa trudny, ponieważ:
- Goście często nie wiedzą, na co mają ochotę, oraz nie są pewni, jakie składniki są dostępne.
- Brak intuicyjnego mechanizmu do składania zamówień oraz określenia preferencji wpływa na nieefektywność organizowania domowej zabawy.

## 3. Wymagania funkcjonalne
- Zarządzanie składnikami:
    - Możliwość dodawania nowych składników poprzez formularz zawierający nazwę składnika oraz przełącznik określający dostępność.
    - Opcje edycji i usuwania istniejących składników.
- Zarządzanie drinkami:
    - Możliwość dodawania, edycji i usuwania drinków, gdzie każdy drink zawiera nazwę, listę wymaganych składników oraz szczegółowy przepis (miary i kroki przygotowania).
- Zarządzanie kolejką zamówień:
    - Kolejka zamówień wyświetla zamówienia z informacjami o nazwie drinka, szczegółowym przepisie, czasie złożenia zamówienia oraz danych gościa.
    - Gospodarz ma możliwość usunięcia zamówienia z kolejki po wykonaniu drinka.
- Funkcjonalności dla gości:
    - Goście 
    - Goście mogą wybierać drinki z listy gotowych propozycji, która prezentuje tylko drinki z dostępnych składników.
    - Goście mogą wpisać preferencje lub stan emocjonalny w pojedyncze pole tekstowe, co wraz z aktualnie dostępnymi składnikami umożliwia AI zaproponowanie drinka.
    - System automatycznie przypisuje unikalny UUID do każdego zamówienia, nawet przy powtarzających się imionach.
- Uwierzytelnianie:
    - Dostęp do funkcjonalności gospodarza wymaga logowania, aby zapewnić bezpieczeństwo i autoryzację.
- Integracja z AI:
    - System wysyła dane wejściowe (swobodny tekst) oraz listę dostępnych składników do AI, która na ich podstawie generuje propozycję drinka z krótkim opisem i szczegółowym przepisem (miary i kroki przygotowania).

## 4. Granice produktu
- Rejestracja kont gości nie wchodzi w zakres MVP – goście nie posiadają dedykowanych kont.
- Gospodarze nie potrzebują rejestracji – ich konta są tworzone automatycznie.
- Brak integracji z zewnętrznym systemem kolejkowania zamówień.
- Nie przewiduje się dodania obrazów poglądowych dla składników i drinków.
- Nie implementujemy funkcjonalności deklarowania ilości dostępnych składników.
- Aplikacja będzie dostępna wyłącznie w wersji web – aplikacje mobilne nie są uwzględnione.
- Standardy walidacji formularzy pozostają uproszczone, bez rygorystycznych wymagań.

## 5. Historyjki użytkowników

US-001  
Tytuł: Logowanie gospodarza  
Opis: Jako gospodarz chcę móc zalogować się do systemu, aby uzyskać dostęp do funkcjonalności zarządzania składnikami, drinkami i kolejką zamówień.  
Kryteria akceptacji:
- Użytkownik wprowadza poprawne dane logowania.
- Po logowaniu gospodarz widzi strony z drinkami, składnikami i zamówieniami.
- Funkcje dostępne są tylko dla zalogowanych użytkowników.

US-002  
Tytuł: Zarządzanie składnikami  
Opis: Jako gospodarz chcę mieć możliwość dodawania, edycji i usuwania składników, aby na bieżąco zarządzać zapasami potrzebnymi do przygotowania drinków.  
Kryteria akceptacji:
- Formularz dodawania składników zawiera pole na nazwę i przełącznik dostępności.
- Nowy składnik pojawia się na liście po dodaniu.
- Edycja umożliwia zmianę nazwy oraz statusu dostępności.
- Usunięcie składnika powoduje jego natychmiastowe usunięcie z listy.

US-003  
Tytuł: Zarządzanie drinkami  
Opis: Jako gospodarz chcę mieć możliwość dodawania, edycji i usuwania drinków, aby oferować gościom różnorodne propozycje wraz ze szczegółowymi przepisami.  
Kryteria akceptacji:
- Formularz dodawania drinka zawiera pola: nazwa, lista składników oraz szczegółowy przepis (z miarami i krokami przygotowania).
- Po dodaniu, drink pojawia się na liście dostępnych propozycji.
- Edycja umożliwia modyfikację wszystkich danych drinka.
- Usunięcie drinka powoduje jego całkowite usunięcie z systemu.

US-004  
Tytuł: Zarządzanie kolejką zamówień  
Opis: Jako gospodarz chcę widzieć kolejkę zamówień, która prezentuje nazwę drinka, szczegółowy przepis, czas zamówienia oraz dane gościa, aby efektywnie zarządzać przygotowywaniem drinków.  
Kryteria akceptacji:
- Kolejka zamówień wyświetla wszystkie niezbędne informacje (nazwa drinka, przepis, imię gościa, czas zamówienia).
- Gospodarz może usuwać zamówienia po wykonaniu drinka.

US-005  
Tytuł: Zamawianie drinka przez wybór gotowej propozycji  
Opis: Jako gość chcę móc wybrać drinka spośród gotowych propozycji, aby szybko złożyć zamówienie na drink.  
Kryteria akceptacji:
- Lista dostępnych drinków wyświetla tylko te, do których wszystkie składniki są dostępne.
- Po wyborze drinka, zamówienie jest dodawane do kolejki, a do zamówienia przypisywany jest unikalny UUID oraz wyświetlane jest imię gościa.
- Gość otrzymuje potwierdzenie złożenia zamówienia.

US-006  
Tytuł: Zamawianie drinka z wykorzystaniem preferencji (AI)  
Opis: Jako gość chcę wpisać swoje preferencje lub opis samopoczucia w pojedynczym polu tekstowym, aby system mógł na tej podstawie oraz liście dostępnych składników
zaproponować odpowiedni drink.  
Kryteria akceptacji:
- Formularz zawiera jedno pole tekstowe do wprowadzenia preferencji.
- Po wysłaniu tekstu system wysyła dane do AI wraz z listą dostępnych składników, która zwraca propozycję drinka wraz z krótkim opisem.
- Propozycja drinka jest wyświetlana gościowi, który może ją zaakceptować.
- Po akceptacji propozycji, zamówienie zostaje dodane do kolejki z przypisaniem unikalnego UUID.

US-007: Bezpieczny dostęp i uwierzytelnianie

- Tytuł: Bezpieczny dostęp
- Opis: Jako gospodarz chcę mieć możliwość logowania się do systemu w sposób zapewniający bezpieczeństwo moich danych.
- Kryteria akceptacji:
  - Logowanie się na dedykowanych stronach.
  - Logowanie wymaga podania adresu loginu i hasła.
  - Użytkownik Nie MOŻE korzystać z stron z drinkami, składnikami i zamówieniami bez logowania się do systemu (US-001).
  - Użytkownik NIE MOŻE korzystać z funkcji US-002, US-003, US-004 bez logowania się do systemu.
  - Użytkownik może logować się do systemu poprzez przycisk w prawym górnym rogu.
  - Użytkownik może się wylogować z systemu poprzez przycisk w prawym górnym rogu w głównym
  - Nie korzystamy z zewnętrznych serwisów logowania (np. Google, GitHub).
  - Do logowania używamy sbudowanych endpointów dostarczonych przez Spring Security

## 6. Metryki sukcesu
- Aplikacja musi generować propozycję drinka na podstawie każdego wpisanego przez gościa opisu preferencji.