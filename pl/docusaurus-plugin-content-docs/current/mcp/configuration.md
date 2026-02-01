---
id: configuration
title: Konfiguracja
---

Ta strona dokumentuje wszystkie opcje konfiguracyjne dla serwera WebdriverIO MCP.

## Konfiguracja serwera MCP

Serwer MCP jest konfigurowany poprzez pliki konfiguracyjne Claude Desktop lub Claude Code.

### Podstawowa konfiguracja

#### macOS

Edytuj `~/Library/Application Support/Claude/claude_desktop_config.json`:

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

#### Windows

Edytuj `%APPDATA%\Claude\claude_desktop_config.json`:

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

#### Claude Code

Edytuj `.claude/settings.json` swojego projektu:

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

---

## Zmienne środowiskowe

Skonfiguruj połączenie z serwerem Appium i inne ustawienia za pomocą zmiennych środowiskowych.

### Połączenie Appium

| Zmienna | Typ | Wartość domyślna | Opis |
|----------|------|---------|-------------|
| `APPIUM_URL` | string | `127.0.0.1` | Nazwa hosta serwera Appium |
| `APPIUM_URL_PORT` | number | `4723` | Port serwera Appium |
| `APPIUM_PATH` | string | `/` | Ścieżka serwera Appium |

### Przykład ze zmiennymi środowiskowymi

```json
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"],
            "env": {
                "APPIUM_URL": "192.168.1.100",
                "APPIUM_URL_PORT": "4724",
                "APPIUM_PATH": "/wd/hub"
            }
        }
    }
}
```

---

## Opcje sesji przeglądarki

Opcje dostępne podczas uruchamiania sesji przeglądarki za pomocą narzędzia `start_browser`.

### `headless`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `false`

Uruchamia Chrome w trybie headless (bez widocznego okna przeglądarki). Przydatne w środowiskach CI/CD lub gdy nie potrzebujesz widzieć przeglądarki.

### `windowWidth`

-   **Typ:** `number`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `1920`
-   **Zakres:** `400` - `3840`

Początkowa szerokość okna przeglądarki w pikselach.

### `windowHeight`

-   **Typ:** `number`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `1080`
-   **Zakres:** `400` - `2160`

Początkowa wysokość okna przeglądarki w pikselach.

### `navigationUrl`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie

URL, do którego nastąpi nawigacja natychmiast po uruchomieniu przeglądarki. Jest to bardziej efektywne niż wywołanie `start_browser`, a następnie oddzielnie `navigate`.

**Przykład:** Uruchom przeglądarkę i nawiguj w jednym wywołaniu:
```
Start Chrome and navigate to https://webdriver.io
```

---

## Opcje sesji mobilnej

Opcje dostępne podczas uruchamiania sesji aplikacji mobilnej za pomocą narzędzia `start_app_session`.

### Opcje platformy

#### `platform`

-   **Typ:** `string`
-   **Obowiązkowe:** Tak
-   **Wartości:** `iOS` | `Android`

Platforma mobilna do automatyzacji.

#### `platformVersion`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie

Wersja systemu operacyjnego urządzenia/symulatora/emulatora (np. `17.0` dla iOS, `14` dla Android).

#### `automationName`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie
-   **Wartości:** `XCUITest` (iOS), `UiAutomator2` | `Espresso` (Android)

Sterownik automatyzacji do użycia. Domyślnie `XCUITest` dla iOS i `UiAutomator2` dla Androida.

### Opcje urządzenia

#### `deviceName`

-   **Typ:** `string`
-   **Obowiązkowe:** Tak

Nazwa urządzenia, symulatora lub emulatora do użycia.

**Przykłady:**
-   Symulator iOS: `iPhone 15 Pro`, `iPad Air (5th generation)`
-   Emulator Android: `Pixel 7`, `Nexus 5X`
-   Rzeczywiste urządzenie: Nazwa urządzenia wyświetlana w systemie

#### `udid`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie (Wymagane dla rzeczywistych urządzeń iOS)

Unikalny identyfikator urządzenia. Wymagany dla rzeczywistych urządzeń iOS (40-znakowy identyfikator) i zalecany dla rzeczywistych urządzeń Android.

**Znajdowanie UDID:**
-   **iOS:** Podłącz urządzenie, otwórz Finder/iTunes, kliknij na urządzenie → Numer seryjny (kliknij, aby ujawnić UDID)
-   **Android:** Uruchom `adb devices` w terminalu

### Opcje aplikacji

#### `appPath`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie*

Ścieżka do pliku aplikacji do zainstalowania i uruchomienia.

**Obsługiwane formaty:**
-   Symulator iOS: katalog `.app`
-   Rzeczywiste urządzenie iOS: plik `.ipa`
-   Android: plik `.apk`

*Albo `appPath` musi być dostarczone, albo `noReset: true`, aby połączyć się z już uruchomioną aplikacją.

#### `appWaitActivity`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie (tylko Android)

Aktywność, na którą należy poczekać przy uruchomieniu aplikacji. Jeśli nie określono, używana jest główna/startowa aktywność aplikacji.

**Przykład:** `com.example.app.MainActivity`

### Opcje stanu sesji

#### `noReset`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `false`

Zachowuje stan aplikacji między sesjami. Gdy `true`:
-   Dane aplikacji są zachowywane (stan logowania, preferencje itp.)
-   Sesja zostanie **odłączona** zamiast zamknięta (aplikacja pozostanie uruchomiona)
-   Przydatne do testowania ścieżek użytkownika w wielu sesjach
-   Można używać bez `appPath` do połączenia z już uruchomioną aplikacją

#### `fullReset`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `true`

Całkowicie resetuje aplikację przed sesją. Gdy `true`:
-   iOS: Odinstalowuje i ponownie instaluje aplikację
-   Android: Czyści dane i pamięć podręczną aplikacji
-   Przydatne do rozpoczynania z czystym stanem

Ustaw `fullReset: false` z `noReset: true`, aby całkowicie zachować stan aplikacji.

### Timeout sesji

#### `newCommandTimeout`

-   **Typ:** `number`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `60`

Jak długo (w sekundach) Appium będzie czekać na nową komendę, zanim uzna, że klient zakończył działanie i zakończy sesję. Zwiększ tę wartość dla dłuższych sesji debugowania.

**Przykłady:**
-   `60` - Domyślnie, odpowiednie dla większości automatyzacji
-   `300` - 5 minut, do debugowania lub wolniejszych operacji
-   `600` - 10 minut, do bardzo długo działających testów

### Opcje automatycznej obsługi

#### `autoGrantPermissions`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `true`

Automatycznie przyznaje uprawnienia aplikacji podczas instalacji/uruchomienia. Gdy `true`:
-   Uprawnienia do kamery, mikrofonu, lokalizacji itp. są automatycznie przyznawane
-   Nie jest potrzebna ręczna obsługa dialogów uprawnień
-   Usprawnia automatyzację poprzez unikanie okien dialogowych uprawnień

:::note Tylko Android
Ta opcja dotyczy głównie Androida. Uprawnienia iOS muszą być obsługiwane inaczej ze względu na ograniczenia systemowe.
:::

#### `autoAcceptAlerts`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `true`

Automatycznie akceptuje alerty systemowe (dialogi) pojawiające się podczas automatyzacji.

**Przykłady automatycznie akceptowanych alertów:**
-   "Zezwolić na powiadomienia?"
-   "Aplikacja chciałaby uzyskać dostęp do Twojej lokalizacji"
-   "Zezwolić aplikacji na dostęp do zdjęć?"

#### `autoDismissAlerts`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `false`

Odrzuca (anuluje) alerty systemowe zamiast je akceptować. Ma pierwszeństwo przed `autoAcceptAlerts`, gdy ustawione na `true`.

### Nadpisanie serwera Appium

Możesz nadpisać połączenie z serwerem Appium dla konkretnej sesji:

#### `appiumHost`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie

Nazwa hosta serwera Appium. Nadpisuje zmienną środowiskową `APPIUM_URL`.

#### `appiumPort`

-   **Typ:** `number`
-   **Obowiązkowe:** Nie

Port serwera Appium. Nadpisuje zmienną środowiskową `APPIUM_URL_PORT`.

#### `appiumPath`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie

Ścieżka serwera Appium. Nadpisuje zmienną środowiskową `APPIUM_PATH`.

---

## Opcje wykrywania elementów

Opcje dla narzędzia `get_visible_elements`.

### `elementType`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `interactable`
-   **Wartości:** `interactable` | `visual` | `all`

Typ elementów do zwrócenia:
-   `interactable`: Przyciski, linki, pola wejściowe i inne elementy klikalne
-   `visual`: Obrazy, SVG i elementy wizualne
-   `all`: Zarówno elementy interaktywne, jak i wizualne

### `inViewportOnly`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `true`

Zwraca tylko elementy, które są widoczne w bieżącym obszarze widocznym. Gdy `false`, zwraca wszystkie elementy w hierarchii widoku (przydatne do znajdowania elementów poza ekranem).

### `includeContainers`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `false`

Dołącza elementy kontenera/layoutu w wynikach. Gdy `true`:

**Dołączane kontenery Android:**
-   `ViewGroup`, `FrameLayout`, `LinearLayout`
-   `RelativeLayout`, `ConstraintLayout`
-   `ScrollView`, `RecyclerView`

**Dołączane kontenery iOS:**
-   `View`, `StackView`, `CollectionView`
-   `ScrollView`, `TableView`

Przydatne do debugowania problemów z layoutem lub zrozumienia hierarchii widoku.

### `includeBounds`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `false`

Dołącza granice/współrzędne elementów (x, y, szerokość, wysokość) w odpowiedzi. Ustaw na `true` dla:
-   Interakcji opartych na współrzędnych
-   Debugowania layoutu
-   Pozycjonowania elementów wizualnych

### Opcje paginacji

Dla dużych stron z wieloma elementami, użyj paginacji, aby zmniejszyć zużycie tokenów:

#### `limit`

-   **Typ:** `number`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `0` (nieograniczony)

Maksymalna liczba elementów do zwrócenia.

#### `offset`

-   **Typ:** `number`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `0`

Liczba elementów do pominięcia przed zwróceniem wyników.

**Przykład:** Pobierz elementy 21-40:
```
Get visible elements with limit 20 and offset 20
```

---

## Opcje drzewa dostępności

Opcje dla narzędzia `get_accessibility` (tylko przeglądarka).

### `limit`

-   **Typ:** `number`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `100`

Maksymalna liczba węzłów do zwrócenia. Użyj `0` dla nieograniczonej liczby (niezalecane dla dużych stron).

### `offset`

-   **Typ:** `number`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `0`

Liczba węzłów do pominięcia dla paginacji.

### `roles`

-   **Typ:** `string[]`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** Wszystkie role

Filtruj do określonych ról dostępności.

**Popularne role:** `button`, `link`, `textbox`, `checkbox`, `radio`, `heading`, `img`, `listitem`

**Przykład:** Pobierz tylko przyciski i linki:
```
Get accessibility tree filtered to button and link roles
```

### `namedOnly`

-   **Typ:** `boolean`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `true`

Zwraca tylko węzły, które mają nazwę/etykietę. Filtruje anonimowe kontenery i redukuje szum w wynikach.

---

## Opcje zrzutu ekranu

Opcje dla narzędzia `take_screenshot`.

### `outputPath`

-   **Typ:** `string`
-   **Obowiązkowe:** Nie

Ścieżka, gdzie zapisać plik zrzutu ekranu. Jeśli nie podano, zwraca dane obrazu zakodowane w base64.

### Automatyczna optymalizacja

Zrzuty ekranu są automatycznie przetwarzane w celu optymalizacji dla konsumpcji LLM:

| Optymalizacja | Wartość | Opis |
|--------------|-------|-------------|
| Maksymalny wymiar | 2000px | Obrazy większe niż 2000px są skalowane |
| Maksymalny rozmiar pliku | 1MB | Obrazy są kompresowane, aby pozostać poniżej 1MB |
| Format | PNG/JPEG | PNG z maksymalną kompresją; JPEG, jeśli potrzebny dla rozmiaru |

Ta optymalizacja zapewnia, że zrzuty ekranu mogą być efektywnie przetwarzane bez przekraczania limitów tokenów.

---

## Zachowanie sesji

### Typy sesji

Serwer MCP śledzi typy sesji, aby zapewnić odpowiednie narzędzia i zachowanie:

| Typ | Opis | Auto-odłączanie |
|------|-------------|-------------|
| `browser` | Sesja przeglądarki Chrome | Nie |
| `ios` | Sesja aplikacji iOS | Tak (jeśli `noReset: true` lub brak `appPath`) |
| `android` | Sesja aplikacji Android | Tak (jeśli `noReset: true` lub brak `appPath`) |

### Model pojedynczej sesji

Serwer MCP działa z **modelem pojedynczej sesji**:

-   Tylko jedna sesja przeglądarki LUB aplikacji może być aktywna jednocześnie
-   Rozpoczęcie nowej sesji zamknie/odłączy bieżącą sesję
-   Stan sesji jest utrzymywany globalnie we wszystkich wywołaniach narzędzi

### Odłączanie vs Zamykanie

| Akcja | `detach: false` (Zamknij) | `detach: true` (Odłącz) |
|--------|-------------------------|-------------------------|
| Przeglądarka | Całkowicie zamyka Chrome | Utrzymuje Chrome działające, rozłącza WebDriver |
| Aplikacja mobilna | Zamyka aplikację | Utrzymuje aplikację działającą w aktualnym stanie |
| Przypadek użycia | Czysta sytuacja dla następnej sesji | Zachowanie stanu, ręczna inspekcja |

---

## Kwestie wydajnościowe

Serwer MCP jest zoptymalizowany pod kątem efektywnej komunikacji LLM przy użyciu formatu **TOON (Token-Oriented Object Notation)**, który minimalizuje użycie tokenów podczas wysyłania danych do Claude.

### Automatyzacja przeglądarki

-   **Tryb headless** jest szybszy, ale nie renderuje elementów wizualnych
-   **Mniejsze rozmiary okna** zmniejszają czas przechwytywania zrzutów ekranu
-   **Wykrywanie elementów** jest zoptymalizowane poprzez pojedyncze wykonanie skryptu
-   **Optymalizacja zrzutów ekranu** utrzymuje obrazy poniżej 1MB dla wydajnego przetwarzania
-   **`inViewportOnly: true`** (domyślnie) filtruje tylko do widocznych elementów

### Automatyzacja mobilna

-   **Parsowanie źródła strony XML** używa tylko 2 wywołań HTTP (w porównaniu do 600+ dla tradycyjnych zapytań elementów)
-   **Selektory Accessibility ID** są najszybsze i najbardziej niezawodne
-   **Selektory XPath** są najwolniejsze - używaj tylko w ostateczności
-   **`inViewportOnly: true`** (domyślnie) znacząco redukuje liczbę elementów
-   **Paginacja** (`limit` i `offset`) zmniejsza użycie tokenów dla ekranów z wieloma elementami
-   **`includeBounds: false`** (domyślnie) pomija dane o współrzędnych, chyba że są potrzebne

### Wskazówki dotyczące użycia tokenów

| Ustawienie | Wpływ |
|---------|--------|
| `inViewportOnly: true` | Filtruje elementy poza ekranem, zmniejszając rozmiar odpowiedzi |
| `includeContainers: false` | Wyklucza elementy układu (ViewGroup itp.) |
| `includeBounds: false` | Pomija dane x/y/szerokość/wysokość |
| `limit` z paginacją | Przetwarzaj elementy partiami zamiast wszystkie naraz |
| `namedOnly: true` (dostępność) | Filtruje anonimowe węzły |

---

## Konfiguracja serwera Appium

Przed użyciem automatyzacji mobilnej upewnij się, że Appium jest poprawnie skonfigurowany.

### Podstawowa konfiguracja

```sh
# Instaluj Appium globalnie
npm install -g appium

# Instaluj sterowniki
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

# Testuj połączenie
curl http://localhost:4723/status
```

---

## Rozwiązywanie problemów z konfiguracją

### Serwer MCP nie uruchamia się

1. Sprawdź, czy npm/npx jest zainstalowany: `npm --version`
2. Spróbuj uruchomić ręcznie: `npx @wdio/mcp`
3. Sprawdź logi Claude Desktop pod kątem błędów

### Problemy z połączeniem Appium

1. Sprawdź, czy Appium działa: `curl http://localhost:4723/status`
2. Sprawdź, czy zmienne środowiskowe pasują do ustawień serwera Appium
3. Upewnij się, że firewall zezwala na połączenia na porcie Appium

### Sesja nie uruchamia się

1. **Przeglądarka:** Upewnij się, że Chrome jest zainstalowany
2. **iOS:** Sprawdź, czy Xcode i symulatory są dostępne
3. **Android:** Sprawdź `ANDROID_HOME` i czy emulator jest uruchomiony
4. Przejrzyj logi serwera Appium pod kątem szczegółowych komunikatów o błędach

### Przekroczenie limitu czasu sesji

Jeśli sesje przekraczają limit czasu podczas debugowania:
1. Zwiększ `newCommandTimeout` podczas uruchamiania sesji
2. Użyj `noReset: true`, aby zachować stan między sesjami
3. Użyj `detach: true` podczas zamykania, aby aplikacja działała dalej