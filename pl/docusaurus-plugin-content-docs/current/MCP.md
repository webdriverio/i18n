---
id: mcp
title: MCP (Model Context Protocol)
description: "Pozwól asystentom AI automatyzować przeglądarki i aplikacje mobilne za pomocą serwera WebdriverIO MCP, w tym instalacja, użycie z Claude i dostępne narzędzia."
---

## Co potrafi?

WebdriverIO MCP to **serwer Model Context Protocol (MCP)**, który umożliwia asystentom AI automatyzację przeglądarek internetowych i aplikacji mobilnych oraz interakcję z nimi.

### Dlaczego WebdriverIO MCP?

-   **Mobile-First**: W przeciwieństwie do serwerów MCP obsługujących wyłącznie przeglądarki, WebdriverIO MCP wspiera automatyzację natywnych aplikacji iOS i Android za pomocą Appium
-   **Selektory wieloplatformowe**: Inteligentne wykrywanie elementów automatycznie generuje wiele strategii lokalizatorów (accessibility ID, XPath, UiAutomator, predykaty iOS)
-   **Ekosystem WebdriverIO**: Zbudowany na sprawdzonym w boju frameworku WebdriverIO z bogatym ekosystemem usług i reporterów

Zapewnia ujednolicony interfejs dla:

-   🖥️ **Przeglądarek desktopowych** (Chrome, Firefox, Edge, Safari, w trybie z interfejsem lub headless)
-   📱 **Natywnych aplikacji mobilnych** (symulatory iOS / emulatory Android / prawdziwe urządzenia przez Appium)
-   📳 **Hybrydowych aplikacji mobilnych** (przełączanie kontekstu Native + WebView przez Appium)
-   ☁️ **Urządzeń w chmurze** (chmury prawdziwych urządzeń i przeglądarek BrowserStack, Sauce Labs, TestMu)

za pośrednictwem pakietu [`@wdio/mcp`](https://www.npmjs.com/package/@wdio/mcp).

Pozwala to asystentom AI na:

-   **Uruchamianie i sterowanie przeglądarkami** z konfigurowalnymi wymiarami, trybem headless i opcjonalną początkową nawigacją
-   **Nawigację po stronach internetowych** i interakcję z elementami (klikanie, wpisywanie tekstu, przewijanie)
-   **Analizę zawartości strony** za pomocą drzewa dostępności i wykrywania widocznych elementów z obsługą paginacji
-   **Wykonywanie zrzutów ekranu** automatycznie optymalizowanych (zmniejszanych, kompresowanych do maks. 1 MB)
-   **Zarządzanie ciasteczkami** do obsługi sesji
-   **Sterowanie urządzeniami mobilnymi**, w tym gestami (dotknięcie, przesunięcie, przeciągnij i upuść)
-   **Przełączanie kontekstów** w aplikacjach hybrydowych między natywnym a webview
-   **Wykonywanie skryptów** - JavaScript w przeglądarkach, polecenia mobilne Appium na urządzeniach
-   **Obsługę funkcji urządzenia**, takich jak obrót, klawiatura, geolokalizacja
-   i wiele więcej, zobacz opcje [Narzędzia](./mcp/tools) i [Konfiguracja](./mcp/configuration)

:::info

UWAGA dotycząca aplikacji mobilnych
Automatyzacja mobilna wymaga uruchomionego serwera Appium z zainstalowanymi odpowiednimi sterownikami. Instrukcje konfiguracji znajdziesz w sekcji [Wymagania wstępne](#prerequisites).

:::

## Instalacja

Najprostszym sposobem użycia `@wdio/mcp` jest npx, bez żadnej lokalnej instalacji:

```sh
npx @wdio/mcp
```

Lub zainstaluj go globalnie:

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

Po dodaniu konfiguracji uruchom ponownie swoje środowisko. Narzędzia WebdriverIO MCP będą dostępne do zadań automatyzacji przeglądarek i urządzeń mobilnych.

### Użycie z Claude Code

Claude Code automatycznie wykrywa serwery MCP. Możesz go skonfigurować w pliku `.claude/settings.json` lub `.mcp.json` swojego projektu.

Lub dodaj go globalnie do .claude.json, wykonując:
```bash
claude mcp add --transport stdio wdio-mcp -- npx -y @wdio/mcp
```
Zweryfikuj to, uruchamiając polecenie `/mcp` w Claude Code.

## Przykłady szybkiego startu

### Automatyzacja przeglądarki

Poproś Claude o automatyzację zadań w przeglądarce:

```
"Open Chrome and navigate to https://webdriver.io"
"Click the 'Get Started' button"
"Take a screenshot of the page"
"Find all visible links on the page"
```

### Automatyzacja aplikacji mobilnych

Poproś Claude o automatyzację aplikacji mobilnych:

```
"Start my iOS app on the iPhone 15 simulator"
"Tap the login button"
"Swipe up to scroll down"
"Take a screenshot of the current screen"
```

## Możliwości

### Automatyzacja przeglądarki

| Funkcja | Opis |
|---------|-------------|
| **Zarządzanie sesją** | Uruchamianie Chrome, Firefox, Edge lub Safari w trybie z interfejsem/headless z niestandardowymi wymiarami; podłączanie do istniejącej instancji Chrome przez CDP |
| **Nawigacja** | Przechodzenie do adresów URL; zarządzanie wieloma kartami |
| **Interakcja z elementami** | Klikanie elementów, wpisywanie tekstu, wyszukiwanie elementów za pomocą różnych selektorów |
| **Analiza strony** | Pobieranie interaktywnych elementów (z paginacją), drzewa dostępności (z filtrowaniem ról) |
| **Zrzuty ekranu** | Przechwytywanie zrzutów ekranu (automatycznie optymalizowanych do maks. 1 MB) |
| **Przewijanie** | Przewijanie w górę/w dół o konfigurowalną liczbę pikseli |
| **Zarządzanie ciasteczkami** | Pobieranie, ustawianie i usuwanie ciasteczek |
| **Emulacja urządzeń** | Emulacja widoków mobilnych/tabletów w przeglądarce (wymagane BiDi) |
| **Wykonywanie skryptów** | Wykonywanie niestandardowego JavaScriptu w kontekście przeglądarki |

### Automatyzacja aplikacji mobilnych (iOS/Android)

| Funkcja | Opis |
|---------|-------------|
| **Zarządzanie sesją** | Uruchamianie aplikacji na symulatorach, emulatorach lub prawdziwych urządzeniach |
| **Gesty dotykowe** | Dotknięcie (elementu lub współrzędnych), przesunięcie, przeciągnij i upuść |
| **Wykrywanie elementów** | Inteligentne wykrywanie elementów z wieloma strategiami lokalizatorów i paginacją |
| **Cykl życia aplikacji** | Pobieranie stanu aplikacji (na pierwszym planie, w tle, nieuruchomiona, niezainstalowana) |
| **Przełączanie kontekstu** | Przełączanie między kontekstami natywnym i webview w aplikacjach hybrydowych |
| **Sterowanie urządzeniem** | Obracanie urządzenia, sterowanie klawiaturą, nadpisywanie GPS |
| **Uprawnienia** | Automatyczna obsługa uprawnień i alertów |
| **Wykonywanie skryptów** | Wykonywanie poleceń mobilnych Appium (pressKey, deepLink, shell itp.) |

### Dostawcy chmurowi

| Funkcja | Opis |
|---------|-------------|
| **Sesje przeglądarki** | Uruchamianie sesji przeglądarki w BrowserStack, Sauce Labs, TestMu lub TestingBot (Windows, macOS, Linux) |
| **Sesje mobilne** | Uruchamianie sesji aplikacji na prawdziwych urządzeniach przez BrowserStack, Sauce Labs, TestMu lub TestingBot |
| **Zarządzanie aplikacjami** | Przesyłanie plików `.apk`/`.ipa`; wyświetlanie listy wcześniej przesłanych aplikacji u wszystkich czterech dostawców |
| **Lokalny tunel** | Automatyczne zarządzanie plikami binarnymi tuneli specyficznymi dla dostawcy w celu dostępu do localhost |
| **Raportowanie** | Oznaczanie sesji etykietami projektu/buildu/sesji (działa identycznie u wszystkich dostawców) |

## Wymagania wstępne

### Automatyzacja przeglądarki

-   **Chrome, Firefox, Edge lub Safari** musi być zainstalowany
-   WebdriverIO obsługuje automatyczne zarządzanie sterownikami

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
6. **Dla symulatorów**: Otwórz Xcode → Window → Devices and Simulators, aby tworzyć symulatory i nimi zarządzać
7. **Dla prawdziwych urządzeń**: Będziesz potrzebować UDID urządzenia (40-znakowy unikalny identyfikator)

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

WebdriverIO MCP działa jako most między asystentami AI a automatyzacją przeglądarek/urządzeń mobilnych:

```
┌─────────────────┐     MCP Protocol      ┌─────────────────┐
│  Claude Desktop │ ◄──────────────────►  │    @wdio/mcp    │
│  or Claude Code │   (stdio or HTTP)     │     Server      │
└─────────────────┘                       └────────┬────────┘
                                                   │
                                             WebDriverIO API
                                                   │
                    ┌──────────────────────────────┼──────────────────────────────┐
                    │                              │                              │
            ┌───────▼───────┐             ┌───────▼───────┐             ┌───────▼───────┐
            │    Browser    │             │    Appium     │             │   Cloud        │
            │ (local/CDP)   │             │  (iOS/Android)│             │   Providers    │
            └───────────────┘             └───────────────┘             └───────────────┘
```

### Zarządzanie sesją

-   **Model pojedynczej sesji**: W danym momencie może być aktywna tylko jedna sesja przeglądarki LUB aplikacji
-   **Stan sesji** jest utrzymywany globalnie pomiędzy wywołaniami narzędzi
-   **Automatyczne odłączanie**: Sesje z zachowanym stanem (`noReset: true`) są automatycznie odłączane przy zamknięciu

### Wykrywanie elementów

#### Przeglądarka (Web)

-   Używa zoptymalizowanego skryptu przeglądarki do znalezienia wszystkich widocznych, interaktywnych elementów
-   Zwraca elementy z selektorami CSS, identyfikatorami, klasami i informacjami ARIA
-   Obsługuje filtrowanie według widoku i paginację

#### Mobile (aplikacje natywne)

-   Używa wydajnego parsowania źródła strony XML (2 wywołania HTTP w porównaniu do ponad 600 w przypadku tradycyjnych zapytań)
-   Klasyfikacja elementów specyficzna dla platformy Android i iOS
-   Generuje wiele strategii lokalizatorów dla każdego elementu:
    -   Accessibility ID (wieloplatformowy, najbardziej stabilny)
    -   Atrybut Resource ID / Name
    -   Dopasowanie tekstu / etykiety
    -   XPath (pełny i uproszczony)
    -   UiAutomator (Android) / Predykaty (iOS)

## Składnia selektorów

Serwer MCP obsługuje wiele strategii selektorów. Szczegółową dokumentację znajdziesz w sekcji [Selektory](./mcp/selectors).

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

### Mobile (wieloplatformowo)

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

Serwer MCP udostępnia 29 narzędzi do automatyzacji przeglądarek i urządzeń mobilnych. Pełne zestawienie znajdziesz w sekcji [Narzędzia](./mcp/tools).

| Narzędzie | Platforma | Opis |
|------|----------|-------------|
| `start_session` | all | Uruchamia sesję przeglądarki lub mobilną (lokalnie lub u dostawcy chmurowego) |
| `close_session` | all | Zamyka bieżącą sesję lub odłącza się od niej |
| `launch_chrome` | browser | Otwiera Chrome ze zdalnym debugowaniem do podłączenia przez CDP |
| `navigate` | browser | Ładuje adres URL w bieżącej karcie |
| `get_tabs` | browser | Wyświetla listę wszystkich otwartych kart |
| `switch_tab` | browser | Ustawia fokus na karcie według uchwytu lub indeksu |
| `switch_frame` | browser | Przełącza do iframe według selektora lub z powrotem na najwyższy poziom |
| `click_element` | browser | Klika element |
| `set_value` | all | Wpisuje tekst w pole wejściowe |
| `scroll` | browser | Przewija stronę w górę lub w dół |
| `get_elements` | all | Pobiera interaktywne elementy (z filtrowaniem + paginacją) |
| `get_accessibility_tree` | browser | Pobiera drzewo dostępności (z filtrowaniem ról) |
| `get_screenshot` | all | Przechwytuje zrzut ekranu (automatycznie optymalizowany) |
| `get_cookies` | browser | Pobiera wszystkie ciasteczka lub konkretne ciasteczko |
| `set_cookie` | browser | Ustawia ciasteczko przeglądarki |
| `delete_cookies` | browser | Usuwa wszystkie lub jedno ciasteczko |
| `emulate_device` | browser | Emuluje widok urządzenia mobilnego/tabletu |
| `execute_script` | all | Uruchamia JavaScript (przeglądarka) lub polecenia Appium (mobile) |
| `tap_element` | mobile | Dotyka elementu lub współrzędnych ekranu |
| `swipe` | mobile | Gest przesunięcia w określonym kierunku |
| `drag_and_drop` | mobile | Przeciąga między elementami lub współrzędnymi |
| `get_contexts` | mobile | Wyświetla listę dostępnych kontekstów natywnych/webview |
| `switch_context` | mobile | Przełącza między kontekstami natywnym i webview |
| `rotate_device` | mobile | Obraca do orientacji pionowej lub poziomej |
| `hide_keyboard` | mobile | Ukrywa klawiaturę programową |
| `set_geolocation` | all | Nadpisuje współrzędne GPS urządzenia |
| `get_app_state` | mobile | Pobiera stan cyklu życia aplikacji |
| `list_apps` | cloud | Wyświetla listę przesłanych aplikacji (BrowserStack, Sauce Labs, TestMu, TestingBot) |
| `upload_app` | cloud | Przesyła plik `.apk`/`.ipa` do dostawcy chmurowego |

## Zasoby MCP

Oprócz narzędzi serwer udostępnia bieżący stan sesji jako zasoby MCP. Pełne zestawienie znajdziesz w sekcji [Zasoby](./mcp/resources).

| URI zasobu | Opis |
|-------------|-------------|
| `wdio://sessions` | Indeks wszystkich sesji |
| `wdio://session/current/elements` | Interaktywne elementy (preferowane zamiast zrzutu ekranu) |
| `wdio://session/current/screenshot` | Zrzut ekranu w formacie base64 |
| `wdio://session/current/accessibility` | Drzewo dostępności |
| `wdio://session/current/cookies` | Ciasteczka przeglądarki |
| `wdio://session/current/tabs` | Otwarte karty przeglądarki |
| `wdio://session/current/contexts` | Dostępne konteksty mobilne |
| `wdio://session/current/context` | Aktywny kontekst mobilny |
| `wdio://session/current/app-state/{bundleId}` | Stan cyklu życia aplikacji mobilnej |
| `wdio://session/current/geolocation` | Bieżące nadpisanie GPS |
| `wdio://session/current/logs` | Logi sesji (konsola przeglądarki, logcat, crashlog) |
| `wdio://session/current/capabilities` | Surowe capabilities WebDriver |
| `wdio://session/current/code` | Wygenerowany kod JS WebdriverIO |
| `wdio://session/current/steps` | Log kroków sesji |
| `wdio://session/{sessionId}/code` | Wygenerowany kod JS dla poprzedniej sesji |
| `wdio://session/{sessionId}/steps` | Kroki poprzedniej sesji |
| `wdio://browserstack/local-binary` | Instrukcje konfiguracji BrowserStack Local |
| `wdio://saucelabs/local-binary` | Instrukcje konfiguracji Sauce Connect Proxy |
| `wdio://testmu/local-binary` | Instrukcje konfiguracji TestMu Tunnel |
| `wdio://testingbot/local-binary` | Instrukcje konfiguracji TestingBot Tunnel |

## Automatyczna obsługa

### Uprawnienia

Domyślnie serwer MCP automatycznie przyznaje uprawnienia aplikacji (`autoGrantPermissions: true`), eliminując potrzebę ręcznej obsługi okien dialogowych uprawnień podczas automatyzacji.

### Alerty systemowe

Alerty systemowe (takie jak „Zezwolić na powiadomienia?”) są domyślnie automatycznie akceptowane (`autoAcceptAlerts: true`). Można to skonfigurować tak, aby zamiast tego były odrzucane, za pomocą `autoDismissAlerts: true`.

## Transport

Domyślnie serwer działa przez **stdio** (uruchamiany jako podproces przez klienta AI). Dla klientów, które nie obsługują MCP opartego na podprocesach (llama.cpp, tryb bezpieczny Codex), użyj **transportu HTTP**:

```bash
npx @wdio/mcp --http --port 3000
```

Pełne opcje, w tym `--allowedHosts` i `--allowedOrigins`, znajdziesz w sekcji [Transport](./mcp/transport).

## Optymalizacja wydajności

Serwer MCP jest zoptymalizowany pod kątem wydajnej komunikacji z asystentem AI:

-   **Format TOON**: Używa Token-Oriented Object Notation w celu minimalizacji zużycia tokenów
-   **Parsowanie XML**: Wykrywanie elementów mobilnych wykorzystuje 2 wywołania HTTP (w porównaniu do ponad 600 tradycyjnie)
-   **Kompresja zrzutów ekranu**: Obrazy są automatycznie kompresowane do maks. 1 MB
-   **Filtrowanie według widoku**: Domyślnie zwracane są tylko widoczne elementy
-   **Paginacja**: Duże listy elementów mogą być paginowane w celu zmniejszenia rozmiaru odpowiedzi

## Obsługa błędów

Wszystkie narzędzia zaprojektowano z solidną obsługą błędów:

-   Błędy są zwracane jako treść tekstowa (nigdy nie są rzucane), co zapewnia stabilność protokołu MCP
-   Opisowe komunikaty o błędach pomagają diagnozować problemy
-   Stan sesji jest zachowywany nawet wtedy, gdy pojedyncze operacje zakończą się niepowodzeniem

## Przypadki użycia

### Zapewnienie jakości

-   Wykonywanie przypadków testowych wspomagane przez AI
-   Wizualne testy regresji za pomocą zrzutów ekranu
-   Audyty dostępności poprzez analizę drzewa dostępności

### Web scraping i ekstrakcja danych

-   Nawigacja po złożonych, wielostronicowych przepływach
-   Wyodrębnianie ustrukturyzowanych danych z dynamicznej zawartości
-   Obsługa uwierzytelniania i zarządzania sesją

### Testowanie aplikacji mobilnych

-   Wieloplatformowa automatyzacja testów (iOS + Android)
-   Walidacja przepływu onboardingu
-   Testowanie deep linków i nawigacji

### Testy integracyjne

-   Testowanie przepływów end-to-end
-   Weryfikacja integracji API + UI
-   Sprawdzanie spójności na wielu platformach

## Rozwiązywanie problemów

### Przeglądarka się nie uruchamia

-   Upewnij się, że docelowa przeglądarka jest zainstalowana
-   Sprawdź, czy żaden inny proces nie używa domyślnego portu debugowania (9222)
-   Spróbuj trybu headless, jeśli występują problemy z wyświetlaniem

### Nie udało się połączyć z Appium

-   Sprawdź, czy serwer Appium jest uruchomiony (`appium`)
-   Sprawdź host i port Appium w `appiumConfig`
-   Upewnij się, że zainstalowano odpowiedni sterownik (`appium driver list`)

### Problemy z symulatorem iOS

-   Upewnij się, że Xcode jest zainstalowany i aktualny
-   Sprawdź, czy symulatory są dostępne (`xcrun simctl list devices`)
-   W przypadku prawdziwych urządzeń sprawdź, czy UDID jest poprawny

### Problemy z emulatorem Android

-   Upewnij się, że Android SDK jest poprawnie skonfigurowany
-   Sprawdź, czy emulator jest uruchomiony (`adb devices`)
-   Sprawdź, czy ustawiono zmienną środowiskową `ANDROID_HOME`

## Zasoby

-   [Dokumentacja narzędzi](./mcp/tools) - Pełna lista dostępnych narzędzi
-   [Dokumentacja zasobów](./mcp/resources) - Zasoby MCP dla bieżącego stanu sesji
-   [Przewodnik po selektorach](./mcp/selectors) - Dokumentacja składni selektorów
-   [Konfiguracja](./mcp/configuration) - Opcje konfiguracji
-   [Transport](./mcp/transport) - Konfiguracja transportu HTTP
-   [Dostawcy chmurowi](./mcp/cloud-providers) - Integracja z chmurami BrowserStack, Sauce Labs, TestMu i TestingBot
-   [FAQ](./mcp/faq) - Często zadawane pytania
-   [Repozytorium GitHub](https://github.com/webdriverio/mcp) - Kod źródłowy i zgłoszenia
-   [Pakiet NPM](https://www.npmjs.com/package/@wdio/mcp) - Pakiet w npm
-   [Model Context Protocol](https://modelcontextprotocol.io/) - Specyfikacja MCP