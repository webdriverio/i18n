---
id: faq
title: FAQ
---

Najczęściej zadawane pytania dotyczące WebdriverIO MCP.

## Ogólne

### Czym jest MCP?

MCP (Model Context Protocol) to otwarty protokół, który umożliwia asystentom AI, takim jak Claude, interakcję z zewnętrznymi narzędziami i usługami. WebdriverIO MCP implementuje ten protokół, aby zapewnić możliwości automatyzacji przeglądarek i urządzeń mobilnych dla Claude Desktop i Claude Code.

### Co mogę automatyzować za pomocą WebdriverIO MCP?

Możesz automatyzować:
-   **Przeglądarki desktopowe** (Chrome) - nawigację, klikanie, pisanie, zrzuty ekranu
-   **Aplikacje iOS** - na symulatorach lub rzeczywistych urządzeniach
-   **Aplikacje Android** - na emulatorach lub rzeczywistych urządzeniach
-   **Aplikacje hybrydowe** - przełączanie między kontekstami natywnym i webowym

### Czy muszę pisać kod?

Nie! To główna zaleta MCP. Możesz opisać, co chcesz zrobić, w języku naturalnym, a Claude użyje odpowiednich narzędzi, aby wykonać zadanie.

**Przykładowe zapytania:**
-   "Otwórz Chrome i przejdź do webdriver.io"
-   "Kliknij przycisk Get Started"
-   "Zrób zrzut ekranu aktualnej strony"
-   "Uruchom moją aplikację iOS i zaloguj się jako użytkownik testowy"

---

## Instalacja i konfiguracja

### Jak zainstalować WebdriverIO MCP?

Nie musisz instalować go osobno. Serwer MCP uruchamia się automatycznie przez npx, gdy skonfigurujesz go w Claude Desktop lub Claude Code.

Dodaj to do swojej konfiguracji Claude Desktop:

```json
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"]
        }
    }
}
```

### Gdzie znajduje się plik konfiguracyjny Claude Desktop?

-   **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
-   **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

### Czy potrzebuję Appium do automatyzacji przeglądarki?

Nie. Automatyzacja przeglądarki wymaga tylko zainstalowania Chrome. WebdriverIO automatycznie obsługuje ChromeDriver.

### Czy potrzebuję Appium do automatyzacji urządzeń mobilnych?

Tak. Automatyzacja mobilna wymaga:
1. Uruchomionego serwera Appium (`npm install -g appium && appium`)
2. Zainstalowanych sterowników platformy (`appium driver install xcuitest` dla iOS, `appium driver install uiautomator2` dla Androida)
3. Odpowiednich narzędzi programistycznych (Xcode dla iOS, Android SDK dla Androida)

---

## Automatyzacja przeglądarki

### Które przeglądarki są obsługiwane?

Obecnie obsługiwany jest tylko **Chrome**. Wsparcie dla innych przeglądarek może zostać dodane w przyszłych wersjach.

### Czy mogę uruchomić Chrome w trybie headless?

Tak! Poproś Claude o uruchomienie przeglądarki w trybie headless:

"Uruchom Chrome w trybie headless"

Lub Claude użyje tej opcji, gdy będzie to odpowiednie (np. w kontekstach CI/CD).

### Czy mogę ustawić rozmiar okna przeglądarki?

Tak. Możesz określić wymiary podczas uruchamiania przeglądarki:

"Uruchom Chrome z rozmiarem okna 1920x1080"

Obsługiwane wymiary: 400-3840 pikseli szerokości, 400-2160 pikseli wysokości. Domyślnie to 1920x1080.

### Czy mogę uruchomić przeglądarkę i przejść do strony w jednym kroku?

Tak! Użyj parametru `navigationUrl`:

"Uruchom Chrome i przejdź do https://webdriver.io"

Jest to bardziej efektywne niż uruchamianie przeglądarki, a następnie osobna nawigacja.

### Jak robić zrzuty ekranu?

Po prostu poproś Claude:

"Zrób zrzut ekranu aktualnej strony"

Zrzuty ekranu są automatycznie optymalizowane:
- Skalowane do maksymalnie 2000px wymiarów
- Kompresowane do maksymalnie 1MB rozmiaru pliku
- Format: PNG lub JPEG (automatycznie wybierany dla optymalnej jakości)

### Czy mogę wchodzić w interakcję z iframe'ami?

Obecnie serwer MCP działa na głównym dokumencie. Interakcja z iframe'ami może zostać dodana w przyszłych wersjach.

### Czy mogę wykonywać niestandardowy JavaScript?

Tak! Użyj narzędzia `execute_script`:

"Wykonaj skrypt, aby pobrać tytuł strony"
"Wykonaj skrypt: return document.querySelectorAll('button').length"

---

## Automatyzacja mobilna

### Jak uruchomić aplikację iOS?

Poproś Claude o niezbędne szczegóły:

"Uruchom moją aplikację iOS znajdującą się w /path/to/MyApp.app na symulatorze iPhone 15"

Lub dla zainstalowanej aplikacji:

"Uruchom aplikację z włączoną opcją noReset na symulatorze iPhone 15"

### Jak uruchomić aplikację Android?

"Uruchom moją aplikację Android w /path/to/app.apk na emulatorze Pixel 7"

Lub dla zainstalowanej aplikacji:

"Uruchom aplikację z włączoną opcją noReset na emulatorze Pixel 7"

### Czy mogę testować na rzeczywistych urządzeniach?

Tak! Dla rzeczywistych urządzeń potrzebujesz UDID urządzenia:

-   **iOS:** Podłącz urządzenie, otwórz Finder, kliknij urządzenie, kliknij numer seryjny, aby pokazać UDID
-   **Android:** Uruchom `adb devices` w terminalu

Następnie poproś Claude:

"Uruchom moją aplikację iOS na rzeczywistym urządzeniu z UDID abc123..."

### Jak obsługiwać dialogi uprawnień?

Domyślnie uprawnienia są automatycznie przyznawane (`autoGrantPermissions: true`). Jeśli potrzebujesz testować przepływy uprawnień, możesz wyłączyć tę opcję:

"Uruchom moją aplikację bez automatycznego przyznawania uprawnień"

### Jakie gesty są obsługiwane?

-   **Stuknięcie:** Stukanie w elementy lub współrzędne
-   **Przesuwanie:** Przesuwanie w górę, w dół, w lewo lub w prawo
-   **Przeciągnij i upuść:** Przeciąganie z jednego elementu do drugiego lub do współrzędnych

Uwaga: `long_press` jest dostępny przez `execute_script` z poleceniami mobilnymi Appium.

### Jak przewijać w aplikacjach mobilnych?

Użyj gestów przesuwania:

"Przesuń w górę, aby przewinąć w dół"
"Przesuń w dół, aby przewinąć w górę"

### Czy mogę obrócić urządzenie?

Tak:

"Obróć urządzenie do pozycji poziomej"
"Obróć urządzenie do pozycji pionowej"

### Jak obsługiwać aplikacje hybrydowe?

W przypadku aplikacji z webview możesz przełączać konteksty:

"Pobierz dostępne konteksty"
"Przełącz na kontekst webview"
"Przełącz z powrotem na kontekst natywny"

### Czy mogę wykonywać polecenia mobilne Appium?

Tak! Użyj narzędzia `execute_script`:

```
Execute script "mobile: pressKey" with args [{ keycode: 4 }]  // Naciśnij BACK na Androidzie
Execute script "mobile: activateApp" with args [{ appId: "com.example.app" }]
Execute script "mobile: terminateApp" with args [{ bundleId: "com.example.app" }]
```

---

## Wybór elementów

### Skąd Claude wie, z którym elementem wchodzić w interakcję?

Claude używa narzędzia `get_visible_elements` do identyfikacji interaktywnych elementów na stronie/ekranie. Każdy element zawiera wiele strategii selektora.

### Co jeśli na stronie jest zbyt wiele elementów?

Użyj paginacji do zarządzania dużymi listami elementów:

"Pobierz pierwsze 20 widocznych elementów"
"Pobierz widoczne elementy z offsetem 20 i limitem 20"

Odpowiedź zawiera `total`, `showing` i `hasMore`, aby pomóc w nawigacji przez elementy.

### Czy mogę pobrać tylko określone typy elementów?

Tak! Użyj parametru `elementType`:

-   `interactable` (domyślnie): Przyciski, linki, pola wprowadzania
-   `visual`: Obrazy, SVG
-   `all`: Oba typy

"Pobierz widoczne elementy wizualne na stronie"

### Co jeśli Claude kliknie niewłaściwy element?

Możesz być bardziej precyzyjny:

-   Podaj dokładny tekst: "Kliknij przycisk z napisem 'Złóż zamówienie'"
-   Podaj selektor: "Kliknij element z selektorem #submit-btn"
-   Podaj ID dostępności: "Kliknij element z ID dostępności loginButton"

### Jaka jest najlepsza strategia selektora dla urządzeń mobilnych?

1. **Accessibility ID** (najlepszy) - `~loginButton`
2. **Resource ID** (Android) - `id=login_button`
3. **Predicate String** (iOS) - `-ios predicate string:label == "Login"`
4. **XPath** (ostatnia opcja) - wolniejszy, ale działa wszędzie

### Czym jest drzewo dostępności i kiedy powinienem go używać?

Drzewo dostępności dostarcza semantycznych informacji o elementach strony (role, nazwy, stany). Użyj `get_accessibility` gdy:
- `get_visible_elements` nie zwraca oczekiwanych elementów
- Potrzebujesz znaleźć elementy według roli dostępności (przycisk, link, pole tekstowe itp.)
- Potrzebujesz szczegółowych informacji semantycznych o elementach

"Pobierz drzewo dostępności przefiltrowane do ról przycisków i linków"

---

## Zarządzanie sesjami

### Czy mogę mieć wiele sesji jednocześnie?

Nie. Serwer MCP używa modelu jednej sesji. Tylko jedna sesja przeglądarki lub aplikacji może być aktywna w danym momencie.

### Co się dzieje po zamknięciu sesji?

Zależy to od typu sesji i ustawień:

-   **Przeglądarka:** Chrome całkowicie się zamyka
-   **Urządzenie mobilne z `noReset: false`:** Aplikacja kończy działanie
-   **Urządzenie mobilne z `noReset: true` lub bez `appPath`:** Aplikacja pozostaje otwarta (sesja automatycznie się odłącza)

### Czy mogę zachować stan aplikacji między sesjami?

Tak! Użyj opcji `noReset`:

"Uruchom moją aplikację z włączoną opcją noReset"

To zachowuje stan logowania, preferencje i inne dane aplikacji.

### Jaka jest różnica między zamknięciem a odłączeniem?

-   **Zamknięcie:** Całkowicie kończy działanie przeglądarki/aplikacji
-   **Odłączenie:** Odłącza automatyzację, ale pozostawia przeglądarkę/aplikację działającą

Odłączenie jest przydatne, gdy chcesz ręcznie sprawdzić stan po automatyzacji.

### Moja sesja ciągle wygasa podczas debugowania

Zwiększ limit czasu polecenia:

"Uruchom moją aplikację z newCommandTimeout ustawionym na 300 sekund"

Domyślnie to 60 sekund. Dla długich sesji debugowania spróbuj 300-600 sekund.

---

## Rozwiązywanie problemów

### Błąd "Session not found"

To oznacza, że nie istnieje aktywna sesja. Najpierw uruchom sesję przeglądarki lub aplikacji:

"Uruchom Chrome i przejdź do google.com"

### Błąd "Element not found"

Element może nie być widoczny lub może mieć inny selektor. Spróbuj:

1. Najpierw poprosić Claude o pobranie wszystkich widocznych elementów
2. Podać bardziej precyzyjny selektor
3. Poczekać na pełne załadowanie strony/aplikacji
4. Użyć `inViewportOnly: false`, aby znaleźć elementy poza ekranem

### Przeglądarka nie uruchamia się

1. Upewnij się, że Chrome jest zainstalowany
2. Sprawdź, czy inny proces nie używa portu debugowania (9222)
3. Spróbuj trybu headless

### Nieudane połączenie z Appium

Jest to najczęstszy problem podczas uruchamiania automatyzacji mobilnej.

1. **Sprawdź, czy Appium jest uruchomiony**: `curl http://localhost:4723/status`
2. Uruchom Appium, jeśli to konieczne: `appium`
3. Sprawdź, czy konfiguracja URL Appium pasuje do serwera
4. Upewnij się, że sterowniki są zainstalowane: `appium driver list --installed`

:::tip
Serwer MCP wymaga, aby Appium działał przed rozpoczęciem sesji mobilnych. Upewnij się, że najpierw uruchomisz Appium:
```sh
appium
```
Przyszłe wersje mogą zawierać automatyczne zarządzanie usługą Appium.
:::

### Symulator iOS nie uruchamia się

1. Upewnij się, że Xcode jest zainstalowany: `xcode-select --install`
2. Lista dostępnych symulatorów: `xcrun simctl list devices`
3. Sprawdź konkretne błędy symulatora w Console.app

### Emulator Androida nie uruchamia się

1. Ustaw `ANDROID_HOME`: `export ANDROID_HOME=$HOME/Library/Android/sdk`
2. Sprawdź emulatory: `emulator -list-avds`
3. Uruchom emulator ręcznie: `emulator -avd <avd-name>`
4. Sprawdź, czy urządzenie jest podłączone: `adb devices`

### Zrzuty ekranu nie działają

1. W przypadku urządzeń mobilnych, upewnij się, że sesja jest aktywna
2. W przypadku przeglądarki, spróbuj innej strony (niektóre strony blokują zrzuty ekranu)
3. Sprawdź logi Claude Desktop pod kątem błędów

Zrzuty ekranu są automatycznie kompresowane do maksymalnie 1MB, więc duże zrzuty ekranu będą działać, ale mogą mieć niższą jakość.

---

## Wydajność

### Dlaczego automatyzacja mobilna jest wolna?

Automatyzacja mobilna obejmuje:
1. Komunikację sieciową z serwerem Appium
2. Komunikację Appium z urządzeniem/symulatorem
3. Renderowanie i odpowiedź urządzenia

Wskazówki dla szybszej automatyzacji:
-   Używaj emulatorów/symulatorów zamiast rzeczywistych urządzeń do rozwoju
-   Używaj accessibility ID zamiast XPath
-   Włącz `inViewportOnly: true` do wykrywania elementów
-   Używaj paginacji (`limit`), aby zmniejszyć użycie tokenów

### Jak przyspieszyć wykrywanie elementów?

Serwer MCP już optymalizuje wykrywanie elementów za pomocą parsowania źródła strony XML (2 wywołania HTTP vs 600+ dla tradycyjnych zapytań o elementy). Dodatkowe wskazówki:

-   Zachowaj `inViewportOnly: true` (domyślnie)
-   Ustaw `includeContainers: false` (domyślnie)
-   Użyj `limit` i `offset` do paginacji na dużych ekranach
-   Używaj konkretnych selektorów zamiast znajdowania wszystkich elementów

### Zrzuty ekranu są wolne lub nie działają

Zrzuty ekranu są automatycznie optymalizowane:
- Zmiana rozmiaru, jeśli są większe niż 2000px
- Kompresja, aby zmieścić się w 1MB
- Konwersja do JPEG, jeśli PNG jest zbyt duży

Ta optymalizacja zmniejsza czas przetwarzania i zapewnia, że Claude może obsłużyć obraz.

---

## Ograniczenia

### Jakie są obecne ograniczenia?

-   **Pojedyncza sesja:** Tylko jedna przeglądarka/aplikacja jednocześnie
-   **Wsparcie przeglądarek:** Tylko Chrome (na razie)
-   **Wsparcie iframe'ów:** Ograniczone wsparcie dla iframe'ów
-   **Przesyłanie plików:** Nie jest bezpośrednio obsługiwane przez narzędzia
-   **Audio/Wideo:** Brak możliwości interakcji z odtwarzaniem mediów
-   **Rozszerzenia przeglądarki:** Nieobsługiwane

### Czy mogę używać tego do testowania produkcyjnego?

WebdriverIO MCP jest zaprojektowany do interaktywnej automatyzacji wspomaganej przez AI. W przypadku produkcyjnych testów CI/CD rozważ użycie tradycyjnego test runnera WebdriverIO z pełną kontrolą programistyczną.

---

## Bezpieczeństwo

### Czy moje dane są bezpieczne?

Serwer MCP działa lokalnie na Twoim komputerze. Cała automatyzacja odbywa się za pośrednictwem lokalnych połączeń przeglądarki/Appium. Żadne dane nie są wysyłane do zewnętrznych serwerów poza tym, do czego wyraźnie nawigujesz.

### Czy Claude może uzyskać dostęp do moich haseł?

Claude może widzieć zawartość strony i wchodzić w interakcję z elementami, ale:
-   Hasła w polach `<input type="password">` są maskowane
-   Powinieneś unikać automatyzacji wrażliwych poświadczeń
-   Używaj kont testowych do automatyzacji

---

## Wkład

### Jak mogę wnieść swój wkład?

Odwiedź [repozytorium GitHub](https://github.com/webdriverio/mcp), aby:
-   Zgłaszać błędy
-   Żądać funkcji
-   Przesyłać pull requesty

### Gdzie mogę uzyskać pomoc?

-   [Discord WebdriverIO](https://discord.webdriver.io/)
-   [GitHub Issues](https://github.com/webdriverio/mcp/issues)
-   [Dokumentacja WebdriverIO](https://webdriver.io/)