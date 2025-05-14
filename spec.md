# Quick Meeting – Specyfikacja Projektu

## Opis projektu

**Quick Meeting** to progresywna webowa aplikacja do zarządzania rezerwacjami spotkań, stworzona w technologii React. Pozwala użytkownikom na rezerwowanie, edytowanie i anulowanie spotkań, a administratorowi na zarządzanie wszystkimi rezerwacjami i użytkownikami. Projekt zakłada prostą integrację z backendem (mockowany JSON Server) oraz nowoczesny, responsywny interfejs.

## Technologie

- React (vite)
- Vite-PWA
- Material UI
- JSON Server

## Zakres funkcjonalny

### 1. Rejestracja, logowanie i autoryzacja

- Rejestracja użytkownika (email, hasło, imię, nazwisko)
- Logowanie z JWT
- Role: **Administrator** (pełny dostęp), **Użytkownik** (zarządza własnymi rezerwacjami)

### 2. Zarządzanie rezerwacjami

- Dodawanie rezerwacji (data, godzina, tytuł, opis, uczestnicy)
- Edycja i anulowanie rezerwacji
- Widok kalendarza i lista rezerwacji

### 3. Filtrowanie i sortowanie

- Filtrowanie po dacie, uczestnikach, statusie
- Sortowanie po godzinie lub dacie utworzenia

### 4. Interfejs użytkownika (UI/UX)

- Responsywny design (MUI lub TailwindCSS 4.0)
- Oddzielny widok dla admina i użytkownika
- Widok kalendarza (np. react-calendar/fullcalendar)

### 5. Komunikacja z backendem

- Mockowany backend (JSON Server)
- REST API lub GraphQL (CRUD dla rezerwacji)

### 6. Walidacja i obsługa błędów

- Walidacja pól (data, email)
- Obsługa błędów backendu i UI

## Modele danych

### Meeting (Rezerwacja Spotkania)

| Nazwa pola   | Typ danych                     | Opis                              |
| ------------ | ------------------------------ | --------------------------------- |
| id           | string/number                  | Unikalny identyfikator rezerwacji |
| title        | string                         | Nazwa spotkania                   |
| description  | string                         | Opis spotkania                    |
| date         | Date                           | Data spotkania                    |
| startTime    | string (hh:mm)                 | Godzina rozpoczęcia               |
| endTime      | string (hh:mm)                 | Godzina zakończenia               |
| participants | string[]                       | Lista uczestników (adresy email)  |
| createdBy    | string                         | Twórca rezerwacji                 |
| status       | enum ('scheduled', 'canceled') | Status spotkania                  |

### User (Użytkownik)

| Nazwa pola | Typ danych             | Opis                               |
| ---------- | ---------------------- | ---------------------------------- |
| id         | string/number          | Unikalny identyfikator użytkownika |
| username   | string                 | Login/nazwa użytkownika            |
| email      | string                 | Adres email                        |
| password   | string                 | Hasło (zahashowane)                |
| role       | enum ('admin', 'user') | Rola użytkownika                   |
| createdAt  | Date                   | Data utworzenia konta              |

## Kryteria oceny

- Kod źródłowy (czytelność, modularność) – 30%
- Funkcjonalność (CRUD, logowanie, autoryzacja) – 30%
- Interfejs użytkownika (UX, responsywność) – 20%
- Dodatkowe funkcje (np. powiadomienia, integracje) – 10%
- Dokumentacja (README, instrukcja) – 10%

## Dodatkowe punkty za:

- Integrację z Google Calendar API
- Powiadomienia e-mail (np. Nodemailer)
- Obsługę WebSockets (aktualizacja w czasie rzeczywistym)
