---
id: mcp
title: MCP (Model Context Protocol)
---

## Co potrafi?

WebdriverIO MCP to **serwer Model Context Protocol (MCP)**, który umożliwia asystentom AI, takim jak Claude Desktop i Claude Code, automatyzację i interakcję z przeglądarkami internetowymi i aplikacjami mobilnymi.

### Dlaczego WebdriverIO MCP?

-   **Mobile First**: W przeciwieństwie do serwerów MCP działających tylko w przeglądarce, WebdriverIO MCP obsługuje automatyzację natywnych aplikacji iOS i Android poprzez Appium
-   **Selektory międzyplatformowe**: Inteligentne wykrywanie elementów generuje automatycznie wiele strategii lokalizacji (ID dostępności, XPath, UiAutomator, predykaty iOS)
-   **Ekosystem WebdriverIO**: Zbudowany na sprawdzonym frameworku WebdriverIO z bogatym ekosystemem usług i narzędzi raportowania

Zapewnia ujednolicony interfejs dla:

-   🖥️ **Przeglądarek desktopowych** (Chrome - tryb z interfejsem lub bezinterfejsowy)
-   📱 **Natywnych aplikacji mobilnych** (Symulatory iOS / Emulatory Android / Rzeczywiste urządzenia przez Appium)
-   📳 **Hybrydowych aplikacji mobilnych** (Przełączanie między kontekstem natywnym a WebView przez Appium)

poprzez pakiet [`@wdio/mcp`](https://www.npmjs.com/package/@wdio/mcp).

Pozwala to asystentom AI na:

-   **Uruchamianie i kontrolowanie przeglądarek** z konfigurowalnymi wymiarami, trybem bezinterfejsowym i opcjonalną początkową nawigacją
-   **Nawigację po stronach internetowych** i interakcję z elementami (klikanie, wpisywanie, przewijanie)
-   **Analizę zawartości strony** za pomocą drzewa dostępności i wykrywania widocznych elementów z obsługą paginacji
-   **Wykonywanie zrzutów ekranu** automatycznie zoptymalizowanych (zmiana rozmiaru, kompresja do maks. 1MB)
-   **Zarządzanie ciasteczkami** do obsługi sesji
-   **Kontrolę urządzeń mobilnych** w tym gesty (dotknięcie, przesuwanie, przeciąganie i upuszczanie)
-   **Przełączanie kontekstów** w aplikacjach hybrydowych między natywnym a webview
-   **Wykonywanie skryptów** - JavaScript w przeglądarkach, polecenia mobilne Appium na urządzeniach
-   **Obsługę funkcji urządzenia** takich jak rotacja, klawiatura, geolokalizacja
-   i wiele więcej, zobacz [Narzędzia](./mcp/tools) i opcje [Konfiguracji](./mcp/configuration)

:::info

UWAGA dla aplikacji mobilnych
Automatyzacja mobilna wymaga działającego serwera Appium z zainstalowanymi odpowiednimi sterownikami. Zobacz [Wymagania wstępne](#prerequisites), aby poznać instrukcje konfiguracji.

:::

## Instalacja

Najłatwiejszym sposobem korzystania z `@wdio/mcp` jest użycie npx bez lokalnej instalacji:

```sh
npx @wdio/mcp
```

Lub instalacja globalna:

```sh
npm install -g @wdio/mcp
```

## Użycie z Claude

Aby używać WebdriverIO MCP z Claude, zmodyfikuj plik konfiguracyjny:

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

Po dodaniu konfiguracji, uruchom ponownie Claude. Narzędzia WebdriverIO MCP będą dostępne do zadań automatyzacji przeglądarki i urządzeń mobilnych.

### Użycie z Claude Code

Claude Code automatycznie wykrywa serwery MCP. Możesz skonfigurować go w pliku `.claude/settings.json` twojego projektu lub w `.mcp.json`.

Lub dodaj go globalnie do .claude.json, wykonując:
```bash
claude mcp add --transport stdio wdio-mcp -- npx -y @wdio/mcp
```
Sprawdź, czy działa, uruchamiając polecenie `/mcp` w claude code.

## Szybki start - przykłady

### Automatyzacja przeglądarki

Poproś Claude o automatyzację zadań w przeglądarce:

```
"Otwórz Chrome i przejdź do https://webdriver.io"
"Kliknij przycisk 'Get Started'"
"Zrób zrzut ekranu strony"
"Znajdź wszystkie widoczne linki na stronie"
```

### Automatyzacja aplikacji mobilnych

Poproś Claude o automatyzację aplikacji mobilnych:

```
"Uruchom moją aplikację iOS na symulatorze iPhone 15"
"Dotknij przycisku logowania"
"Przesuń w górę, aby przewinąć w dół"
"Zrób zrzut ekranu aktualnego ekranu"
```

## Możliwości

### Automatyzacja przeglądarki (Chrome)

| Funkcja | Opis |
|---------|-------------|
| **Zarządzanie sesją** | Uruchamianie Chrome w trybie z interfejsem/bezinterfejsowym z niestandardowymi wymiarami i opcjonalnym URL-em nawigacyjnym |
| **Nawigacja** | Nawigacja do URL-i |
| **Interakcja z elementami** | Klikanie elementów, wpisywanie tekstu, znajdowanie elementów za pomocą różnych selektorów |
| **Analiza strony** | Pobieranie widocznych elementów (z paginacją), drzewo dostępności (z filtrowaniem) |
| **Zrzuty ekranu** | Robienie zrzutów ekranu (automatycznie zoptymalizowanych do maks. 1MB) |
| **Przewijanie** | Przewijanie w górę/w dół o konfigurowalną liczbę pikseli |
| **Zarządzanie ciasteczkami** | Pobieranie, ustawianie i usuwanie ciasteczek |
| **Wykonywanie skryptów** | Wykonywanie niestandardowego JavaScriptu w kontekście przeglądarki |

### Automatyzacja aplikacji mobilnych (iOS/Android)

| Funkcja | Opis |
|---------|-------------|
| **Zarządzanie sesją** | Uruchamianie aplikacji na symulatorach, emulatorach lub rzeczywistych urządzeniach |
| **Gesty dotykowe** | Dotykanie, przesuwanie, przeciąganie i upuszczanie |
| **Wykrywanie elementów** | Inteligentne wykrywanie elementów z wieloma strategiami lokalizacji i paginacją |
| **Cykl życia aplikacji** | Pobieranie stanu aplikacji (przez `execute_script` do aktywacji/zakończenia) |
| **Przełączanie kontekstów** | Przełączanie między kontekstami natywnym i webview w aplikacjach hybrydowych |
| **Sterowanie urządzeniem** | Obracanie urządzenia, sterowanie klawiaturą |
| **Geolokalizacja** | Pobieranie i ustawianie współrzędnych GPS urządzenia |
| **Uprawnienia** | Automatyczna obsługa uprawnień i alertów |
| **Wykonywanie skryptów** | Wykonywanie mobilnych poleceń Appium (pressKey, deepLink, shell, itp.) |

## Wymagania wstępne

### Automatyzacja przeglądarki

-   **Chrome** musi być zainstalowany w systemie
-   WebdriverIO obsługuje automatyczne zarządzanie ChromeDriverem

### Automatyzacja mobilna

#### iOS

1. **Zainstaluj Xcode** z Mac App Store
2. **Zainstaluj Xcode Command Line Tools**:
   ```sh
   xcode-select --install
   ```
3. **Zainstaluj Appium**:
   ```sh
   npm install -g appium
   ```
4. **Zainstaluj sterownik XCUITest**:
   ```sh
   appium driver install xcuitest
   ```
5. **Uruchom serwer Appium**:
   ```sh
   appium
   ```
6. **Dla Symulatorów**: Otwórz Xcode → Window → Devices and Simulators, aby utworzyć/zarządzać symulatorami
7. **Dla rzeczywistych urządzeń**: Potrzebujesz UDID urządzenia (40-znakowy unikalny identyfikator)

#### Android

1. **Zainstaluj Android Studio** i skonfiguruj Android SDK
2. **Ustaw zmienne środowiskowe**:
   ```sh
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```
3. **Zainstaluj Appium**:
   ```sh
   npm install -g appium
   ```
4. **Zainstaluj sterownik UiAutomator2**:
   ```sh
   appium driver install uiautomator2
   ```
5. **Uruchom serwer Appium**:
   ```sh
   appium
   ```
6. **Utwórz emulator** przez Android Studio → Virtual Device Manager
7. **Uruchom emulator** przed uruchomieniem testów

## Architektura

### Jak to działa

WebdriverIO MCP działa jako most między asystentami AI a automatyzacją przeglądarki/urządzeń mobilnych:

```
┌─────────────────┐     Protokół MCP      ┌─────────────────┐
│  Claude Desktop │ ◄──────────────────►  │    @wdio/mcp    │
│  lub Claude Code│      (stdio)          │     Serwer      │
└─────────────────┘                       └────────┬────────┘
                                                   │
                                             WebDriverIO API
                                                   │
                    ┌──────────────────────────────┼──────────────────────────────┐
                    │                              │                              │
            ┌───────▼───────┐             ┌───────▼───────┐             ┌───────▼───────┐
            │    Chrome     │             │    Appium     │             │    Appium     │
            │  (Przeglądarka)│            │     (iOS)     │             │   (Android)   │
            └───────────────┘             └───────────────┘             └───────────────┘
```

### Zarządzanie sesją

-   **Model jednej sesji**: Tylko jedna sesja przeglądarki LUB aplikacji może być aktywna jednocześnie
-   **Stan sesji** jest utrzymywany globalnie w wywołaniach narzędzi
-   **Auto-odłączanie**: Sesje z zachowanym stanem (`noReset: true`) automatycznie odłączają się przy zamknięciu

### Wykrywanie elementów

#### Przeglądarka (Web)

-   Wykorzystuje zoptymalizowany skrypt przeglądarki do znajdowania wszystkich widocznych, interaktywnych elementów
-   Zwraca elementy z selektorami CSS, identyfikatorami, klasami i informacjami ARIA
-   Domyślnie filtruje elementy widoczne w obszarze widocznym

#### Mobile (Aplikacje natywne)

-   Wykorzystuje wydajne parsowanie źródła XML strony (2 wywołania HTTP zamiast 600+ dla tradycyjnych zapytań)
-   Klasyfikacja elementów specyficzna dla platform Android i iOS
-   Generuje wiele strategii lokalizacji dla każdego elementu:
    -   Accessibility ID (międzyplatformowy, najbardziej stabilny)
    -   Resource ID / atrybut Name
    -   Dopasowanie tekstu / etykiety
    -   XPath (pełny i uproszczony)
    -   UiAutomator (Android) / Predicates (iOS)

## Składnia selektorów

Serwer MCP obsługuje wiele strategii wyboru selektorów. Zobacz [Selektory](./mcp/selectors) dla szczegółowej dokumentacji.

### Web (CSS/XPath)

```
# Selektory CSS
button.my-class
#element-id
[data-testid="login"]

# XPath
//button[@class='submit']
//a[contains(text(), 'Click')]

# Selektory tekstowe (specyficzne dla WebdriverIO)
button=Exact Button Text
a*=Partial Link Text
```

### Mobile (międzyplatformowe)

```
# Accessibility ID (zalecane - działa na iOS i Android)
~loginButton

# Android UiAutomator
android=new UiSelector().text("Login")

# iOS Predicate String
-ios predicate string:label == "Login"

# iOS Class Chain
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# XPath (działa na obu platformach)
//android.widget.Button[@text="Login"]
//XCUIElementTypeButton[@label="Login"]
```

## Dostępne narzędzia

Serwer MCP oferuje 25 narzędzi do automatyzacji przeglądarek i urządzeń mobilnych. Zobacz [Narzędzia](./mcp/tools) dla pełnej dokumentacji.

### Narzędzia przeglądarki

| Narzędzie | Opis |
|------|-------------|
| `start_browser` | Uruchamia przeglądarkę Chrome (z opcjonalnym początkowym URL) |
| `close_session` | Zamyka lub odłącza od sesji |
| `navigate` | Przechodzi do URL |
| `click_element` | Klika element |
| `set_value` | Wpisuje tekst do pola |
| `get_visible_elements` | Pobiera widoczne/interaktywne elementy (z paginacją) |
| `get_accessibility` | Pobiera drzewo dostępności (z filtrowaniem) |
| `take_screenshot` | Robi zrzut ekranu (auto-zoptymalizowany) |
| `scroll` | Przewija stronę w górę lub w dół |
| `get_cookies` / `set_cookie` / `delete_cookies` | Zarządzanie ciasteczkami |
| `execute_script` | Wykonuje JavaScript w kontekście przeglądarki |

### Narzędzia mobilne

| Narzędzie | Opis |
|------|-------------|
| `start_app_session` | Uruchamia aplikację iOS/Android |
| `tap_element` | Dotyka element lub współrzędne |
| `swipe` | Przesuwa w określonym kierunku |
| `drag_and_drop` | Przeciąga między lokalizacjami |
| `get_app_state` | Sprawdza czy aplikacja działa |
| `get_contexts` / `switch_context` | Przełączanie kontekstu w aplikacjach hybrydowych |
| `rotate_device` | Obraca do orientacji pionowej/poziomej |
| `get_geolocation` / `set_geolocation` | Pobiera lub ustawia współrzędne GPS |
| `hide_keyboard` | Ukrywa klawiaturę ekranową |
| `execute_script` | Wykonuje polecenia mobilne Appium |

## Automatyczna obsługa

### Uprawnienia

Domyślnie serwer MCP automatycznie przyznaje uprawnienia aplikacjom (`autoGrantPermissions: true`), eliminując potrzebę ręcznej obsługi okien dialogowych uprawnień podczas automatyzacji.

### Alerty systemowe

Alerty systemowe (np. "Zezwolić na powiadomienia?") są automatycznie akceptowane domyślnie (`autoAcceptAlerts: true`). Można to skonfigurować, aby zamiast tego odrzucać alerty za pomocą `autoDismissAlerts: true`.

## Konfiguracja

### Zmienne środowiskowe

Skonfiguruj połączenie z serwerem Appium:

| Zmienna | Domyślnie | Opis |
|----------|---------|-------------|
| `APPIUM_URL` | `127.0.0.1` | Nazwa hosta serwera Appium |
| `APPIUM_URL_PORT` | `4723` | Port serwera Appium |
| `APPIUM_PATH` | `/` | Ścieżka serwera Appium |

### Przykład z niestandardowym serwerem Appium

```json
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"],
            "env": {
                "APPIUM_URL": "192.168.1.100",
                "APPIUM_URL_PORT": "4724"
            }
        }
    }
}
```

## Optymalizacja wydajności

Serwer MCP jest zoptymalizowany pod kątem wydajnej komunikacji z asystentem AI:

-   **Format TOON**: Używa Token-Oriented Object Notation dla minimalnego zużycia tokenów
-   **Parsowanie XML**: Wykrywanie elementów mobilnych wykorzystuje 2 wywołania HTTP (zamiast tradycyjnie 600+)
-   **Kompresja zrzutów ekranu**: Obrazy automatycznie kompresowane do maks. 1MB za pomocą Sharp
-   **Filtrowanie widoku**: Domyślnie zwracane są tylko widoczne elementy
-   **Paginacja**: Duże listy elementów mogą być podzielone na strony, aby zmniejszyć rozmiar odpowiedzi

## Obsługa TypeScript

Serwer MCP jest napisany w TypeScript i zawiera pełne definicje typów. Jeśli rozszerzasz lub integrujesz się z serwerem programistycznie, skorzystasz z automatycznego uzupełniania i bezpieczeństwa typów.

## Obsługa błędów

Wszystkie narzędzia są zaprojektowane z solidną obsługą błędów:

-   Błędy są zwracane jako zawartość tekstowa (nigdy nie są rzucane), utrzymując stabilność protokołu MCP
-   Opisowe komunikaty błędów pomagają w diagnozie problemów
-   Stan sesji jest zachowany nawet gdy poszczególne operacje się nie powodzą

## Przypadki użycia

### Zapewnienie jakości

-   Wykonywanie przypadków testowych z wykorzystaniem AI
-   Testy regresji wizualnej za pomocą zrzutów ekranu
-   Audyt dostępności za pomocą analizy drzewa dostępności

### Web Scraping i ekstrakcja danych

-   Nawigacja po złożonych przepływach wielostronicowych
-   Ekstrakcja ustrukturyzowanych danych z dynamicznej zawartości
-   Obsługa uwierzytelniania i zarządzania sesją

### Testowanie aplikacji mobilnych

-   Automatyzacja testów międzyplatformowych (iOS + Android)
-   Walidacja procesu wdrażania
-   Testowanie deep linking i nawigacji

### Testy integracyjne

-   Testowanie przepływu pracy end-to-end
-   Weryfikacja integracji API + UI
-   Kontrole spójności wieloplatformowej

## Rozwiązywanie problemów

### Przeglądarka nie uruchamia się

-   Upewnij się, że Chrome jest zainstalowany
-   Sprawdź, czy żaden inny proces nie używa domyślnego portu debugowania (9222)
-   Spróbuj trybu bezinterfejsowego, jeśli występują problemy z wyświetlaniem

### Połączenie z Appium nie powiodło się

-   Sprawdź, czy serwer Appium jest uruchomiony (`appium`)
-   Sprawdź konfigurację URL i portu Appium
-   Upewnij się, że odpowiedni sterownik jest zainstalowany (`appium driver list`)

### Problemy z symulatorem iOS

-   Upewnij się, że Xcode jest zainstalowany i aktualny
-   Sprawdź, czy symulatory są dostępne (`xcrun simctl list devices`)
-   Dla rzeczywistych urządzeń sprawdź, czy UDID jest poprawny

### Problemy z emulatorem Android

-   Upewnij się, że Android SDK jest prawidłowo skonfigurowany
-   Sprawdź, czy emulator jest uruchomiony (`adb devices`)
-   Sprawdź, czy zmienna środowiskowa `ANDROID_HOME` jest ustawiona

## Zasoby

-   [Dokumentacja narzędzi](./mcp/tools) - Pełna lista dostępnych narzędzi
-   [Przewodnik po selektorach](./mcp/selectors) - Dokumentacja składni selektorów
-   [Konfiguracja](./mcp/configuration) - Opcje konfiguracji
-   [FAQ](./mcp/faq) - Często zadawane pytania
-   [Repozytorium GitHub](https://github.com/webdriverio/mcp) - Kod źródłowy i zgłoszenia
-   [Pakiet NPM](https://www.npmjs.com/package/@wdio/mcp) - Pakiet na npm
-   [Model Context Protocol](https://modelcontextprotocol.io/) - Specyfikacja MCP