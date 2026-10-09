---
id: tools
title: Narzędzia
description: "Przegląd narzędzi udostępnianych przez serwer WebdriverIO MCP do obsługi sesji, nawigacji, interakcji z elementami, zrzutów ekranu, gestów i cyklu życia aplikacji."
---

Serwer WebdriverIO MCP udostępnia 29 narzędzi pogrupowanych według funkcji. Narzędzia oznaczone jako **tylko przeglądarka** wymagają sesji `platform: "browser"`. Narzędzia oznaczone jako **tylko mobilne** wymagają `platform: "ios"` lub `platform: "android"`.

## Zarządzanie sesjami

### `start_session`

Uruchamia nową sesję automatyzacji przeglądarki lub urządzenia mobilnego. W danym momencie może być aktywna tylko jedna sesja; uruchomienie nowej zamyka istniejącą.

| Parametr               | Typ                                                                    | Wymagany              | Domyślnie        | Opis                                                                                                                                  |
| ---------------------- | ---------------------------------------------------------------------- | --------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `platform`             | `"browser" \| "ios" \| "android"`                                      | ✓                     | —                | Platforma sesji                                                                                                                       |
| `provider`             | `"local" \| "browserstack" \| "saucelabs" \| "testmu" \| "testingbot"` | —                     | `"local"`        | Dostawca sesji                                                                                                                        |
| `browser`              | `"chrome" \| "firefox" \| "edge" \| "safari"`                          | tylko przeglądarka    | —                | Przeglądarka do uruchomienia                                                                                                          |
| `browserVersion`       | string                                                                 | —                     | najnowsza        | Wersja przeglądarki (tylko dostawcy chmurowi, domyślnie: najnowsza)                                                                   |
| `os`                   | string                                                                 | —                     | —                | System operacyjny (tylko dostawcy chmurowi, np. `"Windows"`, `"OS X"`)                                                                |
| `osVersion`            | string                                                                 | —                     | —                | Wersja systemu operacyjnego (tylko dostawcy chmurowi, np. `"11"`, `"Sequoia"`)                                                        |
| `headless`             | boolean                                                                | —                     | `true`           | Uruchom przeglądarkę w trybie headless                                                                                                |
| `windowWidth`          | number                                                                 | —                     | `1920`           | Szerokość okna przeglądarki (400–3840)                                                                                                |
| `windowHeight`         | number                                                                 | —                     | `1080`           | Wysokość okna przeglądarki (400–2160)                                                                                                 |
| `navigationUrl`        | string                                                                 | —                     | —                | URL, do którego nastąpi przejście po uruchomieniu                                                                                     |
| `deviceName`           | string                                                                 | tylko mobilne         | —                | Nazwa urządzenia/emulatora/symulatora                                                                                                 |
| `platformVersion`      | string                                                                 | —                     | —                | Wersja systemu (np. `"17.0"`, `"14"`)                                                                                                 |
| `appPath`              | string                                                                 | —                     | —                | Ścieżka do `.app` / `.apk` / `.ipa`                                                                                                   |
| `app`                  | string                                                                 | —                     | —                | URL aplikacji (`bs://...` dla BrowserStack, `storage:filename=` dla Sauce Labs, `lt://...` dla TestMu, app_url TestingBot) lub custom_id |
| `automationName`       | `"XCUITest" \| "UiAutomator2"`                                         | —                     | auto             | Sterownik automatyzacji                                                                                                               |
| `autoGrantPermissions` | boolean                                                                | —                     | `true`           | Automatycznie przyznawaj uprawnienia aplikacji                                                                                        |
| `autoAcceptAlerts`     | boolean                                                                | —                     | `true`           | Automatycznie akceptuj alerty                                                                                                         |
| `autoDismissAlerts`    | boolean                                                                | —                     | `false`          | Automatycznie odrzucaj alerty                                                                                                         |
| `appWaitActivity`      | string                                                                 | —                     | —                | Aktywność Androida, na którą należy czekać przy uruchomieniu                                                                          |
| `udid`                 | string                                                                 | —                     | —                | UDID rzeczywistego urządzenia iOS                                                                                                     |
| `noReset`              | boolean                                                                | —                     | —                | Zachowaj dane aplikacji między sesjami                                                                                                |
| `fullReset`            | boolean                                                                | —                     | —                | Odinstaluj aplikację przed/po sesji                                                                                                   |
| `newCommandTimeout`    | number                                                                 | —                     | `300`            | Limit czasu polecenia Appium (sekundy)                                                                                                |
| `attach`               | boolean                                                                | —                     | `false`          | Podłącz się do istniejącego Chrome przez CDP                                                                                          |
| `attachConfig`         | object                                                                 | —                     | —                | Połączenie CDP: `{ port: 9222, host: "localhost" }`                                                                                   |
| `appiumConfig`         | object                                                                 | —                     | —                | Serwer Appium: `{ host, port, path }`                                                                                                 |
| `tunnel`               | `boolean \| "external"`                                                | —                     | `false`          | Routing przez lokalny tunel (dostawcy chmurowi). `true` = automatyczne uruchomienie, `"external"` = tunel już działa zewnętrznie      |
| `reporting`            | object                                                                 | —                     | —                | Etykiety raportowania dostawcy chmurowego: `{ project, build, session }`                                                              |
| `trace`                | boolean                                                                | —                     | `false`          | Włącz nagrywanie śladu — tworzy plik zip `.trace` zgodny z Playwright                                                                 |
| `region`               | `"us-west-1" \| "eu-central-1" \| "apac-southeast-1"`                  | —                     | `"eu-central-1"` | Region centrum danych Sauce Labs                                                                                                      |
| `tunnelName`           | string                                                                 | —                     | —                | Nazwa identyfikująca tunel (wymagana dla `tunnel: "external"`)                                                                        |
| `capabilities`         | object                                                                 | —                     | —                | Dodatkowe surowe capabilities do scalenia                                                                                             |

```js
// Lokalna przeglądarka Chrome
start_session({ platform: "browser", browser: "chrome" })

// Symulator iOS
start_session({ platform: "ios", deviceName: "iPhone 16", platformVersion: "18.0", appPath: "/path/to/app.app" })

// BrowserStack Android
start_session({ platform: "android", provider: "browserstack", deviceName: "Samsung Galaxy S24", app: "bs://abc123" })

// Sauce Labs iOS
start_session({ platform: "ios", provider: "saucelabs", deviceName: "iPhone 15", platformVersion: "17.0", app: "storage:filename=MyApp.ipa" })

// Przeglądarka TestMu
start_session({ platform: "browser", provider: "testmu", browser: "chrome", os: "Windows", osVersion: "11" })

// Przeglądarka TestingBot
start_session({ platform: "browser", provider: "testingbot", browser: "chrome", os: "Windows", osVersion: "11" })

// Dostawca chmurowy z tunelem
start_session({ platform: "browser", provider: "browserstack", browser: "chrome", tunnel: true })

// Podłączenie do istniejącego Chrome (po launch_chrome)
start_session({ platform: "browser", browser: "chrome", attach: true })
```

---

### `close_session`

Zamyka bieżącą sesję lub odłącza się od niej.

| Parametr  | Typ     | Wymagany | Domyślnie | Opis                                                               |
| --------- | ------- | -------- | --------- | ------------------------------------------------------------------ |
| `detach`  | boolean | —        | `false`   | Rozłącz bez kończenia sesji (zachowuje stan aplikacji w Appium)    |

Sesje uruchomione z `noReset: true` domyślnie odłączają się automatycznie.

---

### `launch_chrome`

Przygotowuje instancję Chrome z włączonym zdalnym debugowaniem, aby `start_session({ attach: true })` mógł się z nią połączyć. Dwa tryby:

- `newInstance` (domyślny): otwiera Chrome obok istniejącej instancji, używając osobnego katalogu profilu; Twoja bieżąca sesja pozostaje nienaruszona.
- `freshSession`: uruchamia Chrome z pustym profilem (bez plików cookie, bez zalogowań). Użyj `copyProfileFiles: true`, aby przenieść pliki cookie i dane logowania.

| Parametr           | Typ                               | Wymagany | Domyślnie       | Opis                                                                          |
| ------------------ | --------------------------------- | -------- | --------------- | ----------------------------------------------------------------------------- |
| `port`             | number                            | —        | `9222`          | Port zdalnego debugowania                                                     |
| `mode`             | `"newInstance" \| "freshSession"` | —        | `"newInstance"` | Tryb uruchomienia                                                             |
| `copyProfileFiles` | boolean                           | —        | `false`         | Skopiuj domyślny profil Chrome (pliki cookie, dane logowania) do sesji debugowania |

Po pomyślnym wykonaniu tego narzędzia wywołaj `start_session({ platform: "browser", browser: "chrome", attach: true })`.

## Nawigacja i karty

### `navigate`

Wczytuje URL w bieżącej karcie i czeka na zdarzenie załadowania strony. Resetuje stan strony (DOM, środowisko uruchomieniowe JS). **Tylko przeglądarka.**

| Parametr  | Typ    | Wymagany | Opis                        |
| --------- | ------ | -------- | --------------------------- |
| `url`     | string | ✓        | URL, do którego przejść     |

---

### `get_tabs`

Wyświetla wszystkie karty przeglądarki z uchwytem, tytułem, adresem URL oraz informacją, która jest aktywna. Użyj przed `switch_tab`, aby znaleźć docelowy uchwyt. **Tylko przeglądarka.**

Brak parametrów.

---

### `switch_tab`

Przełącza fokus na kartę przeglądarki według uchwytu okna lub indeksu liczonego od 0. Wszystkie kolejne wywołania narzędzi działają na nowo aktywnej karcie. **Tylko przeglądarka.**

| Parametr  | Typ    | Wymagany | Opis                                    |
| --------- | ------ | -------- | --------------------------------------- |
| `handle`  | string | —        | Uchwyt okna, na które przełączyć        |
| `index`   | number | —        | Indeks karty liczony od 0 (≥ 0)         |

Podaj `handle` lub `index`. Uchwyty można pobrać z `get_tabs` lub `wdio://session/current/tabs`.

---

### `switch_frame`

Przełącza kontekst ramki WebDriver do elementu iframe według selektora CSS/XPath lub z powrotem do najwyższego poziomu, jeśli selektor zostanie pominięty. Zmiany są trwałe; wszystkie kolejne wywołania `click_element`, `set_value`, `get_elements` działają w obrębie przełączonej ramki, dopóki nie przełączysz się z powrotem. Czeka do 5 s na iframe. **Tylko przeglądarka.**

| Parametr   | Typ    | Wymagany | Opis                                                                                              |
| ---------- | ------ | -------- | ------------------------------------------------------------------------------------------------- |
| `selector` | string | —        | Selektor CSS/XPath elementu iframe. Pomiń, aby wrócić do ramki najwyższego poziomu.               |

```js
// Przełącz do iframe
switch_frame({ selector: "#my-iframe" })

// Interakcja z elementami wewnątrz iframe
click_element({ selector: "button.submit" })

// Powrót do najwyższego poziomu
switch_frame()
```

## Interakcja z elementami

### `click_element`

Czeka, aż element zaistnieje, przewija go do widoku i klika. Działa w przeglądarce i na urządzeniach mobilnych. Na iOS preferuj `tap_element`; `click_element` bywa czasem ignorowane przez warstwę natywną.

| Parametr       | Typ     | Wymagany | Domyślnie | Opis                                          |
| -------------- | ------- | -------- | --------- | --------------------------------------------- |
| `selector`     | string  | ✓        | —         | Selektor CSS, XPath lub tekstowy              |
| `scrollToView` | boolean | —        | `true`    | Przewiń element do widoku przed kliknięciem   |
| `timeout`      | number  | —        | —         | Maksymalny czas oczekiwania (ms)              |

---

### `set_value`

Czyści pole input lub textarea i wpisuje podany tekst. Zawsze zastępuje istniejącą zawartość.

| Parametr       | Typ     | Wymagany | Domyślnie | Opis                                         |
| -------------- | ------- | -------- | --------- | -------------------------------------------- |
| `selector`     | string  | ✓        | —         | Selektor CSS, XPath lub tekstowy             |
| `value`        | string  | ✓        | —         | Tekst do wpisania                            |
| `scrollToView` | boolean | —        | `true`    | Przewiń element do widoku przed wpisywaniem  |
| `timeout`      | number  | —        | —         | Maksymalny czas oczekiwania (ms)             |

---

### `scroll`

Przewija stronę o określoną liczbę pikseli. **Tylko przeglądarka.** Na urządzeniach mobilnych użyj `swipe`.

| Parametr    | Typ              | Wymagany | Domyślnie | Opis                       |
| ----------- | ---------------- | -------- | --------- | -------------------------- |
| `direction` | `"up" \| "down"` | ✓        | —         | Kierunek przewijania       |
| `pixels`    | number           | —        | `500`     | Liczba pikseli do przewinięcia |

## Analiza elementów

### `get_elements`

Zwraca interaktywne elementy bieżącej strony z gotowymi do użycia selektorami. Do bieżącej orientacji w stanie strony preferuj zasób `wdio://session/current/elements`; użyj tego narzędzia, gdy potrzebujesz filtrowania lub paginacji.

| Parametr            | Typ     | Wymagany | Domyślnie | Opis                                                 |
| ------------------- | ------- | -------- | --------- | ---------------------------------------------------- |
| `inViewportOnly`    | boolean | —        | `false`   | Zwracaj tylko elementy widoczne w obszarze widoku    |
| `includeContainers` | boolean | —        | `false`   | Uwzględnij elementy kontenerowe (divy, sekcje)       |
| `includeBounds`     | boolean | —        | `false`   | Uwzględnij współrzędne prostokąta ograniczającego    |
| `limit`             | number  | —        | `0`       | Maksymalna liczba zwracanych elementów (0 = bez limitu) |
| `offset`            | number  | —        | `0`       | Liczba elementów do pominięcia (paginacja)           |

---

### `get_accessibility_tree`

Zwraca drzewo dostępności strony z rolami, nazwami i selektorami. Obsługuje filtrowanie i paginację. **Tylko przeglądarka.**

| Parametr  | Typ      | Wymagany | Domyślnie | Opis                                                          |
| --------- | -------- | -------- | --------- | ------------------------------------------------------------- |
| `limit`   | number   | —        | `0`       | Maksymalna liczba zwracanych węzłów (0 = bez limitu)          |
| `offset`  | number   | —        | `0`       | Liczba węzłów do pominięcia (paginacja)                       |
| `roles`   | string[] | —        | —         | Filtruj według ról ARIA, np. `["button", "link", "heading"]`  |

## Zrzuty ekranu

### `get_screenshot`

Wykonuje zrzut ekranu bieżącej strony lub ekranu. Zwraca obraz zakodowany w base64, automatycznie przeskalowany i skompresowany, aby zmieścić się w limitach kontekstu modelu (maks. 1 MB, maks. 2000 px).

Brak parametrów. Do wyszukiwania elementów preferuj `wdio://session/current/elements` zamiast zrzutów ekranu; jest to szybsze i zużywa znacznie mniej tokenów. Używaj zrzutów ekranu do weryfikacji wizualnej lub debugowania układu.

## Zarządzanie plikami cookie

### `get_cookies`

Zwraca wszystkie pliki cookie bieżącej sesji lub pojedynczy plik cookie według nazwy. **Tylko przeglądarka.**

| Parametr  | Typ    | Wymagany | Opis                                                     |
| --------- | ------ | -------- | -------------------------------------------------------- |
| `name`    | string | —        | Nazwa pliku cookie. Pomiń, aby zwrócić wszystkie pliki cookie. |

---

### `set_cookie`

Ustawia plik cookie w przeglądarce. Przeglądarka musi już znajdować się w docelowej domenie — plików cookie nie można ustawiać między domenami. Użyj, aby wstrzyknąć tokeny sesji lub flagi funkcji bez przechodzenia przez proces logowania. **Tylko przeglądarka.**

| Parametr   | Typ                           | Wymagany | Opis                                                  |
| ---------- | ----------------------------- | -------- | ----------------------------------------------------- |
| `name`     | string                        | ✓        | Nazwa pliku cookie                                    |
| `value`    | string                        | ✓        | Wartość pliku cookie                                  |
| `domain`   | string                        | —        | Domena pliku cookie (domyślnie bieżąca domena)        |
| `path`     | string                        | —        | Ścieżka pliku cookie (domyślnie `/`)                  |
| `expiry`   | number                        | —        | Czas wygaśnięcia jako znacznik czasu Unix (sekundy)   |
| `httpOnly` | boolean                       | —        | Flaga HttpOnly                                        |
| `secure`   | boolean                       | —        | Flaga Secure                                          |
| `sameSite` | `"strict" \| "lax" \| "none"` | —        | Atrybut SameSite                                      |

---

### `delete_cookies`

Usuwa wszystkie pliki cookie lub konkretny plik cookie według nazwy. **Tylko przeglądarka.**

| Parametr  | Typ    | Wymagany | Opis                                                               |
| --------- | ------ | -------- | ------------------------------------------------------------------ |
| `name`    | string | —        | Nazwa pliku cookie do usunięcia. Pomiń, aby usunąć wszystkie pliki cookie. |

## Gesty dotykowe (mobilne)

### `tap_element`

Wywołuje `element.tap()` na dopasowanym elemencie lub stuka w bezwzględne współrzędne ekranu. Używaj na iOS, gdy `click_element` jest ignorowane; stuknięcie to natywny gest, na który reaguje iOS. **Tylko mobilne.**

| Parametr   | Typ    | Wymagany | Opis                                                    |
| ---------- | ------ | -------- | ------------------------------------------------------- |
| `selector` | string | —        | Selektor elementu                                       |
| `x`        | number | —        | Współrzędna X stuknięcia w ekran (jeśli brak selektora) |
| `y`        | number | —        | Współrzędna Y stuknięcia w ekran (jeśli brak selektora) |

Podaj `selector` lub współrzędne `x`/`y`.

---

### `swipe`

Wykonuje gest przesunięcia na całym ekranie. Kierunek to kierunek ruchu treści (np. `"up"` przewija listę w górę). Używaj do przewijania poza widoczne granice. Do przenoszenia konkretnego elementu użyj `drag_and_drop`. **Tylko mobilne.** W przeglądarkach użyj `scroll`.

| Parametr    | Typ                                   | Wymagany | Domyślnie      | Opis                                         |
| ----------- | ------------------------------------- | -------- | -------------- | -------------------------------------------- |
| `direction` | `"up" \| "down" \| "left" \| "right"` | ✓        | —              | Kierunek przesunięcia                        |
| `duration`  | number                                | —        | `500`          | Czas trwania przesunięcia (ms, 100–5000)     |
| `percent`   | number                                | —        | `0.5` / `0.95` | Część ekranu do przesunięcia (0–1)           |

---

### `drag_and_drop`

Przeciąga element na inny element lub do współrzędnych. **Tylko mobilne.**

| Parametr         | Typ    | Wymagany | Domyślnie | Opis                                         |
| ---------------- | ------ | -------- | --------- | -------------------------------------------- |
| `sourceSelector` | string | ✓        | —         | Element źródłowy do przeciągnięcia           |
| `targetSelector` | string | —        | —         | Element docelowy, na który upuścić           |
| `x`              | number | —        | —         | Docelowe przesunięcie X (jeśli brak targetSelector) |
| `y`              | number | —        | —         | Docelowe przesunięcie Y (jeśli brak targetSelector) |
| `duration`       | number | —        | —         | Czas trwania przeciągania (ms, 100–5000)     |

## Przełączanie kontekstu (mobilne)

### `get_contexts`

Zwraca dostępne konteksty automatyzacji oraz aktualnie aktywny. Użyj przed `switch_context`, aby wykryć cele `NATIVE_APP` i `WEBVIEW_*`. **Tylko mobilne.**

Brak parametrów.

---

### `switch_context`

Przełącza między natywnym kontekstem automatyzacji a kontekstem webview w hybrydowej aplikacji mobilnej. Wymagane przed użyciem selektorów CSS/XPath wewnątrz osadzonego webview. **Tylko mobilne.**

| Parametr  | Typ    | Wymagany | Opis                                                               |
| --------- | ------ | -------- | ------------------------------------------------------------------ |
| `context` | string | ✓        | Nazwa kontekstu, np. `"NATIVE_APP"`, `"WEBVIEW_com.example.app"`   |

Dostępne nazwy kontekstów można pobrać z `get_contexts` lub `wdio://session/current/contexts`.

```js
// 1. Sprawdź, co jest dostępne
get_contexts()
// → { contexts: ["NATIVE_APP", "WEBVIEW_com.example.app"], currentContext: "NATIVE_APP" }

// 2. Przełącz do webview, aby używać CSS/XPath
switch_context({ context: "WEBVIEW_com.example.app" })

// 3. Interakcja z elementami webview za pomocą selektorów CSS
click_element({ selector: "#login-button" })

// 4. Powrót do kontekstu natywnego dla natywnego UI
switch_context({ context: "NATIVE_APP" })
```

## Sterowanie urządzeniem (mobilne)

### `rotate_device`

Obraca urządzenie do orientacji pionowej lub poziomej i czeka na zakończenie obrotu przez system. Używaj do testowania układów zależnych od orientacji. **Tylko mobilne.**

| Parametr      | Typ                         | Wymagany | Opis                  |
| ------------- | --------------------------- | -------- | --------------------- |
| `orientation` | `"PORTRAIT" \| "LANDSCAPE"` | ✓        | Docelowa orientacja   |

---

### `hide_keyboard`

Ukrywa klawiaturę ekranową. Wywołaj po wprowadzeniu tekstu, gdy klawiatura zasłania elementy potrzebne w następnej kolejności. Nie robi nic, jeśli klawiatura jest już ukryta. **Tylko mobilne.**

Brak parametrów.

---

### `set_geolocation`

Nadpisuje współrzędne GPS urządzenia na czas sesji. Wpływa na `navigator.geolocation` w sieci oraz na usługi lokalizacji na urządzeniach mobilnych. Uprawnienia do lokalizacji muszą zostać wcześniej przyznane aplikacji.

| Parametr    | Typ    | Wymagany | Opis                                  |
| ----------- | ------ | -------- | ------------------------------------- |
| `latitude`  | number | ✓        | Szerokość geograficzna (od −90 do 90)   |
| `longitude` | number | ✓        | Długość geograficzna (od −180 do 180)   |
| `altitude`  | number | —        | Wysokość w metrach                    |

## Cykl życia aplikacji (mobilne)

### `get_app_state`

Zwraca bieżący stan cyklu życia aplikacji mobilnej. **Tylko mobilne.**

| Parametr   | Typ    | Wymagany | Opis                                                                      |
| ---------- | ------ | -------- | ------------------------------------------------------------------------- |
| `bundleId` | string | ✓        | Bundle ID iOS lub nazwa pakietu Androida, np. `"com.example.app"`         |

Zwraca jedną z wartości: `not installed`, `not running`, `background (suspended)`, `background`, `foreground`.

## Narzędzia przeglądarki

### `emulate_device`

Emuluje urządzenie mobilne lub tablet w bieżącej sesji przeglądarki (ustawia obszar widoku, DPR, user-agent, zdarzenia dotykowe). Wymaga sesji z obsługą BiDi: `start_session({ capabilities: { webSocketUrl: true } })`. **Tylko przeglądarka.**

| Parametr  | Typ    | Wymagany | Opis                                                                                                                                         |
| --------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `device`  | string | —        | Nazwa predefiniowanego urządzenia (np. `"iPhone 15"`, `"Pixel 7"`). Pomiń, aby wyświetlić listę. Przekaż `"reset"`, aby przywrócić ustawienia desktopowe. |

---

### `execute_script`

Wykonuje JavaScript w przeglądarce lub polecenia mobilne przez Appium.

| Parametr  | Typ    | Wymagany | Opis                                                                  |
| --------- | ------ | -------- | --------------------------------------------------------------------- |
| `script`  | string | ✓        | Kod JS (przeglądarka) lub polecenie Appium, np. `"mobile: pressKey"`  |
| `args`    | any[]  | —        | Argumenty przekazywane do skryptu lub polecenia                       |

**Przeglądarka:** użyj `return`, aby otrzymać wartości.

```javascript
// Pobierz tytuł strony
execute_script({ script: "return document.title" })

// Przewiń element do widoku
execute_script({ script: "arguments[0].scrollIntoView()", args: ["#my-element"] })
```

**Mobilne (Appium):** używa składni `mobile: <command>`.

```javascript
// Naciśnij klawisz wstecz w Androidzie
execute_script({ script: "mobile: pressKey", args: [{ keycode: 4 }] })

// Aktywuj aplikację (iOS/Android)
execute_script({ script: "mobile: activateApp", args: [{ bundleId: "com.example.app" }] })

// Deep link (iOS)
execute_script({ script: "mobile: deepLink", args: [{ url: "myapp://route", bundleId: "com.example.app" }] })
```

## Dostawcy chmurowi

### `list_apps`

Wyświetla aplikacje przesłane do dostawcy chmurowego (BrowserStack App Automate, Sauce Labs App Storage, TestMu lub TestingBot Storage). Odczytuje dane uwierzytelniające specyficzne dla dostawcy ze zmiennych środowiskowych.

| Parametr           | Typ                                                         | Wymagany | Domyślnie        | Opis                                                  |
| ------------------ | ----------------------------------------------------------- | -------- | ---------------- | ----------------------------------------------------- |
| `provider`         | `"browserstack" \| "saucelabs" \| "testmu" \| "testingbot"` | ✓        | —                | Dostawca chmurowy                                     |
| `sortBy`           | `"app_name" \| "uploaded_at"`                               | —        | `"uploaded_at"`  | Kolejność sortowania                                  |
| `organizationWide` | boolean                                                     | —        | `false`          | (Tylko BrowserStack) Wyświetl wszystkie przesłane pliki organizacji |
| `limit`            | number                                                      | —        | `20`             | Maksymalna liczba wyników                             |
| `region`           | `"us-west-1" \| "eu-central-1" \| "apac-southeast-1"`       | —        | `"eu-central-1"` | Region Sauce Labs                                     |

```js
// Lista dla wszystkich czterech dostawców
list_apps({ provider: "browserstack" })
list_apps({ provider: "saucelabs", region: "us-west-1" })
list_apps({ provider: "testmu" })
list_apps({ provider: "testingbot" })
```

---

### `upload_app`

Przesyła lokalny plik `.apk` lub `.ipa` do dostawcy chmurowego (BrowserStack, Sauce Labs, TestMu lub TestingBot). Zwraca URL aplikacji do użycia w `start_session`.

| Parametr   | Typ                                                         | Wymagany | Domyślnie        | Opis                                                         |
| ---------- | ----------------------------------------------------------- | -------- | ---------------- | ------------------------------------------------------------ |
| `provider` | `"browserstack" \| "saucelabs" \| "testmu" \| "testingbot"` | ✓        | —                | Dostawca chmurowy                                            |
| `path`     | string                                                      | ✓        | —                | Bezwzględna ścieżka do pliku `.apk` lub `.ipa`               |
| `customId` | string                                                      | —        | —                | Opcjonalny niestandardowy identyfikator do późniejszego odwoływania się do aplikacji |
| `region`   | `"us-west-1" \| "eu-central-1" \| "apac-southeast-1"`       | —        | `"eu-central-1"` | Region Sauce Labs                                            |

```js
// Przesyłanie do każdego z dostawców
upload_app({ provider: "browserstack", path: "/path/to/app.apk" })
upload_app({ provider: "saucelabs", path: "/path/to/app.ipa", region: "us-west-1" })
upload_app({ provider: "testmu", path: "/path/to/app.apk" })
upload_app({ provider: "testingbot", path: "/path/to/app.apk" })
```