# Instrukcja Instalacji

1. Zainstaluj zależności:
   ```bash
   npm install
   ```
2. Zbuduj aplikację:
   ```bash
   npm run build
   ```
3. Uruchom serwer developerski:
   ```bash
   npm run start
   ```
4. Otwórz stronę pod adresem http://localhost:3000/

5. Zaloguj się na konto testowe ([dane kont znajdziesz poniżej](#konta-testowe)) lub utwórz własne

---

# Opis projektu

**Quick Meeting** to progresywna aplikacja webowa do zarządzania rezerwacjami spotkań. Pozwala użytkownikom na rezerwowanie, edytowanie i anulowanie spotkań, a administratorowi na zarządzanie wszystkimi rezerwacjami.

## Technologie

- React (Vite)
- Vite-PWA
- Material UI
- Fullcalendar
- JSON Server (mock backend)

## Funkcjonalności

- Rejestracja i logowanie użytkowników
- Role: administrator (pełny dostęp) i użytkownik (zarządza własnymi rezerwacjami)
- Dodawanie, edycja i anulowanie rezerwacji spotkań
- Widok kalendarza i lista rezerwacji
- Filtrowanie i sortowanie rezerwacji (po dacie, uczestnikach, statusie)
- Responsywny design
- Walidacja pól i obsługa błędów

## Role użytkowników

- **Administrator**: pełny dostęp do wszystkich rezerwacji i użytkowników
- **Użytkownik**: zarządza własnymi rezerwacjami

# Opis działania aplikacji

Po uruchomieniu aplikacji użytkownik może się zarejestrować lub zalogować. Po zalogowaniu dostępny jest widok kalendarza oraz lista rezerwacji. Użytkownik może dodawać, edytować i anulować własne rezerwacje. Administrator ma dostęp do wszystkich rezerwacji i użytkowników. System umożliwia filtrowanie i sortowanie spotkań oraz zapewnia walidację danych i obsługę błędów.

## Konta testowe

- Konto administratora: **admin@admin.com** / hasło: **admin**
- Konto użytkownika: **jan.kowalski@example.com** / hasło: **$2b$10$hashuser1**
- Możesz także utworzyć nowe konto przez formularz rejestracji.
