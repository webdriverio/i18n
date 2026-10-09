---
id: configuration
title: Konfiguracja
description: "Skonfiguruj serwer WebdriverIO MCP, w tym opcje sesji, przeglądarki, urządzeń mobilnych, dostawców chmurowych, wykrywania elementów oraz Appium."
---

Ta strona opisuje wszystkie opcje konfiguracyjne serwera WebdriverIO MCP.

## Konfiguracja serwera MCP

Serwer MCP konfiguruje się za pomocą plików konfiguracyjnych lub poleceń.

### Podstawowa konfiguracja

Edytuj plik konfiguracyjny MCP (np. `./.mcp.json`) i dodaj następującą zawartość:

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

## Opcje sesji

Wszystkie opcje sesji są przekazywane do narzędzia `start_session`. Istnieje jedno ujednolicone narzędzie dla sesji przeglądarkowych i mobilnych; parametr `platform` określa typ sesji.

### Opcje wspólne

#### `platform`

<Option type={`"browser" | "ios" | "android"`} required="Yes">

Platforma do automatyzacji.

</Option>
#### `provider`

<Option type={`"local" | "browserstack" | "saucelabs" | "testmu" | "testingbot"`} default={`"local"`} required="No">

Miejsce, w którym działa sesja. Użyj nazwy dostawcy chmurowego dla zdalnych urządzeń; każdy z nich wymaga własnych zmiennych środowiskowych. Szczegóły znajdziesz w sekcji [Dostawcy chmurowi](./cloud-providers).

</Option>
## Opcje sesji przeglądarki

Opcje dla sesji `platform: "browser"`.

### `browser`

<Option type={`"chrome" | "firefox" | "edge" | "safari"`} required="Yes (for browser platform)">

Przeglądarka do uruchomienia.

</Option>
### `browserVersion`

<Option type="string" default={`"latest"`} required="No">

Wersja przeglądarki. Tylko dla dostawców chmurowych (domyślnie: latest).

</Option>
### `os` / `osVersion`

<Option type="string" required="No">

System operacyjny dla sesji przeglądarkowych u dostawców chmurowych. Przykłady: `os: "Windows"`, `osVersion: "11"` lub `os: "OS X"`, `osVersion: "Sequoia"`.

</Option>
### `headless`

<Option type="boolean" default="true" required="No">

Uruchom przeglądarkę w trybie headless (bez widocznego okna). Ustaw na `false`, aby widzieć przeglądarkę.

</Option>
### `windowWidth`

<Option type="number" default="1920" required="No">

-   **Zakres:** `400` - `3840`

Początkowa szerokość okna przeglądarki w pikselach.

</Option>
### `windowHeight`

<Option type="number" default="1080" required="No">

-   **Zakres:** `400` - `2160`

Początkowa wysokość okna przeglądarki w pikselach.

</Option>
### `navigationUrl`

<Option type="string" required="No">

URL, do którego należy przejść natychmiast po uruchomieniu przeglądarki. Bardziej wydajne niż osobne wywołanie `start_session`, a następnie `navigate`.

</Option>
### `attach`

<Option type="boolean" default="false" required="No">

Podłącz się do istniejącej instancji Chrome zamiast uruchamiać nową. Użyj po `launch_chrome`, aby połączyć się przez CDP.

</Option>
### `attachConfig`

<Option type={`{ port?: number; host?: string }`} default={`{ port: 9222, host: "localhost" }`} required="No">

Konfiguracja połączenia zdalnego debugowania Chrome. Ma zastosowanie tylko przy `attach: true`.

</Option>
## Opcje sesji mobilnej

Opcje dla sesji `platform: "ios"` lub `platform: "android"`.

### `deviceName`

<Option type="string" required="Yes (for mobile platforms)">

Nazwa urządzenia, symulatora lub emulatora.

**Przykłady:**
-   Symulator iOS: `"iPhone 16"`, `"iPad Air (5th generation)"`
-   Emulator Android: `"Pixel 7"`, `"Nexus 5X"`
-   Prawdziwe urządzenie: nazwa urządzenia wyświetlana w Twoim systemie

</Option>
### `platformVersion`

<Option type="string" required="No">

Wersja systemu operacyjnego urządzenia/symulatora/emulatora (np. `"18.0"` dla iOS, `"14"` dla Androida).

</Option>
### `automationName`

<Option type={`"XCUITest" | "UiAutomator2"`} required="No">

Sterownik automatyzacji. Domyślnie `XCUITest` dla iOS i `UiAutomator2` dla Androida.

</Option>
### `udid`

<Option type="string" required="No (Required for real iOS devices)">

Unikalny identyfikator urządzenia (Unique Device Identifier). Wymagany dla prawdziwych urządzeń iOS (identyfikator 40-znakowy).

**Jak znaleźć UDID:**
-   **iOS:** Podłącz urządzenie, otwórz Finder, kliknij urządzenie → Numer seryjny (kliknij, aby wyświetlić UDID)
-   **Android:** Uruchom `adb devices` w terminalu

</Option>
### `appPath`

<Option type="string" required="No">

Ścieżka do pliku aplikacji, która ma zostać zainstalowana i uruchomiona.

**Obsługiwane formaty:**
-   Symulator iOS: katalog `.app`
-   Prawdziwe urządzenie iOS: plik `.ipa`
-   Android: plik `.apk`

Należy podać `appPath` albo ustawić `noReset: true`, aby połączyć się z już uruchomioną aplikacją.

</Option>
### `app`

<Option type="string" required="No">

URL aplikacji u dostawcy chmurowego (`bs://...` dla BrowserStack, `storage:filename=` dla Sauce Labs, `lt://...` dla TestMu, app_url dla TestingBot) lub `customId`. Używany zamiast `appPath` w chmurowych sesjach mobilnych.

</Option>
### `appWaitActivity`

<Option type="string" required="No (Android only)">

Aktywność, na którą należy czekać podczas uruchamiania aplikacji. Jeśli nie zostanie określona, używana jest główna aktywność (launcher) aplikacji.

**Przykład:** `"com.example.app.MainActivity"`

</Option>
### Opcje stanu sesji

#### `noReset`

<Option type="boolean" required="No">

Zachowaj stan aplikacji między sesjami. Gdy ustawione na `true`:
-   Dane aplikacji są zachowywane (stan logowania, preferencje itp.)
-   Sesja zostanie **odłączona** zamiast zamknięta (aplikacja nadal działa)
-   Można używać bez `appPath`, aby połączyć się z już uruchomioną aplikacją

</Option>
#### `fullReset`

<Option type="boolean" required="No">

Całkowicie zresetuj aplikację przed sesją:
-   iOS: odinstalowuje i ponownie instaluje aplikację
-   Android: czyści dane i pamięć podręczną aplikacji

Ustaw `fullReset: false` razem z `noReset: true`, aby w pełni zachować stan aplikacji.

</Option>
### Limit czasu sesji

#### `newCommandTimeout`

<Option type="number" default="300" required="No">

Jak długo (w sekundach) Appium będzie czekać na nowe polecenie przed zakończeniem sesji. Zwiększ tę wartość przy dłuższych sesjach debugowania.

</Option>
### Automatyczna obsługa

#### `autoGrantPermissions`

<Option type="boolean" default="true" required="No">

Automatycznie przyznawaj aplikacji uprawnienia podczas instalacji/uruchamiania (kamera, mikrofon, lokalizacja itp.).

:::note Tylko Android
Ta opcja dotyczy głównie Androida. Uprawnienia w iOS muszą być obsługiwane inaczej ze względu na ograniczenia systemowe.
:::

</Option>
#### `autoAcceptAlerts`

<Option type="boolean" default="true" required="No">

Automatycznie akceptuj alerty systemowe (okna dialogowe) podczas automatyzacji („Zezwolić na powiadomienia?” itp.).

</Option>
#### `autoDismissAlerts`

<Option type="boolean" default="false" required="No">

Odrzucaj alerty systemowe zamiast je akceptować. Ma pierwszeństwo przed `autoAcceptAlerts`, gdy ustawione na `true`.

</Option>
### Połączenie z serwerem Appium

Nadpisz połączenie z serwerem Appium dla pojedynczej sesji za pomocą `appiumConfig`:

```js
start_session({
  platform: "ios",
  deviceName: "iPhone 16",
  appPath: "/path/to/app.app",
  appiumConfig: { host: "192.168.1.100", port: 4724, path: "/wd/hub" }
})
```

#### `appiumConfig`

<Option type={`{ host?: string; port?: number; path?: string }`} required="No">

Połączenie z serwerem Appium. Domyślnie `{ host: "127.0.0.1", port: 4723, path: "/" }`.

</Option>
## Opcje dostawców chmurowych

### Dane uwierzytelniające

Każdy dostawca chmurowy wymaga własnych zmiennych środowiskowych:

| Dostawca     | Zmienna nazwy użytkownika | Zmienna klucza dostępu    |
| ------------ | ------------------------- | ------------------------- |
| BrowserStack | `BROWSERSTACK_USERNAME`   | `BROWSERSTACK_ACCESS_KEY` |
| Sauce Labs   | `SAUCE_USERNAME`          | `SAUCE_ACCESS_KEY`        |
| TestMu       | `TESTMU_USERNAME`         | `TESTMU_ACCESS_KEY`       |
| TestingBot   | `TESTINGBOT_KEY`          | `TESTINGBOT_SECRET`       |

Ustaw je przed uruchomieniem serwera MCP.

### `region`

<Option type={`"us-west-1" | "eu-central-1" | "apac-southeast-1"`} default={`"eu-central-1"`} required="No">

Region centrum danych Sauce Labs. Ignorowany w przypadku innych dostawców.

</Option>
### `tunnel`

<Option type={`boolean | "external"`} default="false" required="No">

Włącz routing przez lokalny tunel dla sesji u dostawców chmurowych (dostęp do localhost, środowisk stagingowych, usług wewnętrznych).

-   `true` — automatycznie uruchamia tunel przed sesją i zatrzymuje go przy zamknięciu
-   `"external"` — tunel jest już uruchomiony zewnętrznie; ustawia jedynie flagi odpowiednie dla danego dostawcy

Przed użyciem `true` zapoznaj się z zasobem local-binary danego dostawcy (`wdio://browserstack/local-binary`, `wdio://saucelabs/local-binary`, `wdio://testmu/local-binary` lub `wdio://testingbot/local-binary`), aby uzyskać instrukcje konfiguracji specyficzne dla Twojego systemu operacyjnego i architektury.

</Option>
### `tunnelName`

<Option type="string" required="No">

Nazwa identyfikująca tunel. Wymagana przy `tunnel: "external"`, aby dopasować działający tunel. Przy `tunnel: true` unikalna nazwa jest generowana automatycznie, jeśli nie zostanie podana.

</Option>
### `reporting`

<Option type={`{ project?: string; build?: string; session?: string }`} required="No">

Etykiety sesji widoczne w panelu dostawcy chmurowego. Działają identycznie w BrowserStack, Sauce Labs, TestMu i TestingBot.

</Option>
### `trace`

<Option type="boolean" default="false" required="No">

Włącz nagrywanie śladu (trace). Tworzy kompatybilny z Playwright plik zip `.trace`, zapisywany w `.trace/` podczas `close_session`. Ślady można przeglądać na [player.vibium.dev](https://player.vibium.dev).

</Option>
## Opcje wykrywania elementów

Opcje dla narzędzia `get_elements`.

### `inViewportOnly`

<Option type="boolean" default="false" required="No">

Zwracaj tylko elementy widoczne w bieżącym obszarze widoku. Ustaw na `true`, aby ograniczyć liczbę wyników na długich stronach.

</Option>
### `includeContainers`

<Option type="boolean" default="false" required="No">

Uwzględnij w wynikach elementy kontenerowe/układu:

**Kontenery Android:** `ViewGroup`, `FrameLayout`, `LinearLayout`, `RelativeLayout`, `ConstraintLayout`, `ScrollView`, `RecyclerView`

**Kontenery iOS:** `View`, `StackView`, `CollectionView`, `ScrollView`, `TableView`

</Option>
### `includeBounds`

<Option type="boolean" default="false" required="No">

Uwzględnij w odpowiedzi współrzędne prostokąta ograniczającego element (x, y, szerokość, wysokość).

</Option>
### Paginacja

#### `limit`

<Option type="number" default="0 (unlimited)" required="No">

Maksymalna liczba zwracanych elementów.

</Option>
#### `offset`

<Option type="number" default="0" required="No">

Liczba elementów do pominięcia przed zwróceniem wyników.

**Przykład:** Pobierz elementy 21–40:
```text
Get elements with limit 20 and offset 20
```

</Option>
## Opcje drzewa dostępności

Opcje dla narzędzia `get_accessibility_tree` (tylko przeglądarka).

### `limit`

<Option type="number" default="0 (unlimited)" required="No">

Maksymalna liczba zwracanych węzłów.

</Option>
### `offset`

<Option type="number" default="0" required="No">

Liczba węzłów do pominięcia w ramach paginacji.

</Option>
### `roles`

<Option type="string[]" default="All roles" required="No">

Filtruj według określonych ról dostępności.

**Popularne role:** `button`, `link`, `textbox`, `checkbox`, `radio`, `heading`, `img`, `listitem`

**Przykład:** Pobierz tylko przyciski i linki:
```text
Get accessibility tree filtered to button and link roles
```

</Option>
## Zrzut ekranu

Narzędzie `get_screenshot` nie przyjmuje żadnych parametrów. Zrzuty ekranu są przetwarzane automatycznie:

| Optymalizacja          | Wartość  | Opis                                                          |
| ---------------------- | -------- | ------------------------------------------------------------- |
| Maksymalny wymiar      | 2000px   | Obrazy większe niż 2000px są pomniejszane                     |
| Maksymalny rozmiar pliku | 1MB    | Obrazy są kompresowane, aby nie przekraczały 1MB              |
| Format                 | PNG/JPEG | PNG z maksymalną kompresją; JPEG, jeśli wymaga tego rozmiar   |

## Zachowanie sesji

### Typy sesji

| Typ       | Opis                    | Automatyczne odłączanie                   |
| --------- | ----------------------- | ----------------------------------------- |
| `browser` | Sesja przeglądarki      | Nie                                       |
| `ios`     | Sesja aplikacji iOS     | Tak (jeśli `noReset: true` lub brak `appPath`) |
| `android` | Sesja aplikacji Android | Tak (jeśli `noReset: true` lub brak `appPath`) |

### Model pojedynczej sesji

Serwer MCP działa w oparciu o **model pojedynczej sesji**:

-   W danym momencie może być aktywna tylko jedna sesja przeglądarki LUB aplikacji
-   Uruchomienie nowej sesji zamknie/odłączy bieżącą sesję
-   Stan sesji jest utrzymywany globalnie pomiędzy wywołaniami narzędzi

### Odłączanie a zamykanie

| Akcja               | `detach: false` (Zamknięcie)        | `detach: true` (Odłączenie)                         |
| ------------------- | ----------------------------------- | --------------------------------------------------- |
| Przeglądarka        | Całkowicie zamyka przeglądarkę      | Przeglądarka nadal działa, WebDriver zostaje rozłączony |
| Aplikacja mobilna   | Kończy działanie aplikacji          | Aplikacja nadal działa w bieżącym stanie            |
| Zastosowanie        | Czysty start dla kolejnej sesji     | Zachowanie stanu, ręczna inspekcja                  |

## Kwestie wydajnościowe

### Automatyzacja przeglądarki

-   **Tryb headless** jest szybszy, ale nie renderuje elementów wizualnych
-   **Mniejsze rozmiary okna** skracają czas wykonywania zrzutów ekranu
-   **Wykrywanie elementów** jest zoptymalizowane dzięki pojedynczemu wykonaniu skryptu
-   **Optymalizacja zrzutów ekranu** utrzymuje obrazy poniżej 1MB dla wydajnego przetwarzania

### Automatyzacja mobilna

-   **Parsowanie źródła strony XML** wykorzystuje tylko 2 wywołania HTTP (w porównaniu z ponad 600 przy tradycyjnych zapytaniach o elementy)
-   **Selektory Accessibility ID** są najszybsze i najbardziej niezawodne
-   **Selektory XPath** są najwolniejsze; używaj ich tylko w ostateczności
-   **Paginacja** (`limit` i `offset`) zmniejsza zużycie tokenów na ekranach z wieloma elementami

### Wskazówki dotyczące zużycia tokenów

| Ustawienie                 | Wpływ                                                         |
| -------------------------- | ------------------------------------------------------------- |
| `inViewportOnly: true`     | Odfiltrowuje elementy poza ekranem, zmniejszając rozmiar odpowiedzi |
| `includeContainers: false` | Wyklucza elementy układu (ViewGroup itp.)                     |
| `includeBounds: false`     | Pomija dane x/y/szerokość/wysokość                            |
| `limit` z paginacją        | Przetwarzanie elementów partiami zamiast wszystkich naraz     |

## Konfiguracja serwera Appium

Przed rozpoczęciem automatyzacji mobilnej upewnij się, że Appium jest poprawnie skonfigurowane.

### Podstawowa konfiguracja

```sh
# Zainstaluj Appium globalnie
npm install -g appium

# Zainstaluj sterowniki
appium driver install xcuitest    # iOS
appium driver install uiautomator2  # Android

# Uruchom serwer
appium
```

### Niestandardowa konfiguracja serwera

```sh
# Uruchom z niestandardowym hostem i portem
appium --address 0.0.0.0 --port 4724

# Uruchom z logowaniem
appium --log-level debug

# Uruchom z określoną ścieżką bazową
appium --base-path /wd/hub
```

### Weryfikacja instalacji

```sh
# Sprawdź zainstalowane sterowniki
appium driver list --installed

# Sprawdź wersję Appium
appium --version

# Przetestuj połączenie
curl http://localhost:4723/status
```

## Rozwiązywanie problemów z konfiguracją

### Serwer MCP się nie uruchamia

1. Sprawdź, czy npm/npx jest zainstalowany: `npm --version`
2. Spróbuj uruchomić ręcznie: `npx @wdio/mcp`
3. Sprawdź logi swojego narzędzia pod kątem błędów

### Problemy z połączeniem z Appium

1. Sprawdź, czy Appium działa: `curl http://localhost:4723/status`
2. Sprawdź, czy `appiumConfig` w `start_session` odpowiada ustawieniom serwera Appium
3. Upewnij się, że zapora sieciowa zezwala na połączenia na porcie Appium

### Sesja się nie uruchamia

1. **Przeglądarka:** upewnij się, że docelowa przeglądarka jest zainstalowana
2. **iOS:** sprawdź, czy Xcode i symulatory są dostępne
3. **Android:** sprawdź `ANDROID_HOME` oraz czy emulator jest uruchomiony
4. Przejrzyj logi serwera Appium, aby uzyskać szczegółowe komunikaty o błędach

### Przekroczenie limitu czasu sesji

Jeśli sesje wygasają podczas debugowania:
1. Zwiększ `newCommandTimeout` podczas uruchamiania sesji
2. Użyj `noReset: true`, aby zachować stan między sesjami
3. Użyj `detach: true` podczas zamykania, aby aplikacja nadal działała