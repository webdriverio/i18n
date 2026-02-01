---
id: tools
title: Narzędzia
---

Następujące narzędzia są dostępne za pośrednictwem serwera WebdriverIO MCP. Narzędzia te umożliwiają asystentom AI automatyzację przeglądarek i aplikacji mobilnych.

## Zarządzanie sesją

### `start_browser`

Uruchamia sesję przeglądarki Chrome.

#### Parametry

| Parametr | Typ | Obowiązkowy | Domyślny | Opis |
|-----------|------|-----------|---------|-------------|
| `headless` | boolean | Nie | `false` | Uruchamia Chrome w trybie headless |
| `windowWidth` | number | Nie | `1920` | Szerokość okna przeglądarki (400-3840) |
| `windowHeight` | number | Nie | `1080` | Wysokość okna przeglądarki (400-2160) |
| `navigationUrl` | string | Nie | - | URL, do którego nastąpi przekierowanie po uruchomieniu przeglądarki |

#### Przykład

```
Start a browser with 1920x1080 resolution and navigate to webdriver.io
```

#### Wsparcie

- Przeglądarki desktopowe

---

### `start_app_session`

Uruchamia sesję aplikacji mobilnej na iOS lub Android za pośrednictwem Appium.

#### Parametry

| Parametr | Typ | Obowiązkowy | Domyślny | Opis |
|-----------|------|-----------|---------|-------------|
| `platform` | string | Tak | - | Platforma do automatyzacji: `iOS` lub `Android` |
| `deviceName` | string | Tak | - | Nazwa urządzenia lub symulatora/emulatora |
| `appPath` | string | Nie* | - | Ścieżka do pliku aplikacji (.app, .ipa lub .apk) |
| `platformVersion` | string | Nie | - | Wersja systemu operacyjnego (np. `17.0`, `14`) |
| `automationName` | string | Nie | Auto | `XCUITest` (iOS), `UiAutomator2` lub `Espresso` (Android) |
| `udid` | string | Nie | - | Unikalny identyfikator urządzenia (wymagany dla rzeczywistych urządzeń iOS) |
| `noReset` | boolean | Nie | `false` | Zachowuje stan aplikacji między sesjami |
| `fullReset` | boolean | Nie | `true` | Odinstalowuje i ponownie instaluje aplikację przed sesją |
| `autoGrantPermissions` | boolean | Nie | `true` | Automatycznie przyznaje uprawnienia aplikacji |
| `autoAcceptAlerts` | boolean | Nie | `true` | Automatycznie akceptuje alerty systemowe |
| `autoDismissAlerts` | boolean | Nie | `false` | Odrzuca (zamiast akceptować) alerty |
| `appWaitActivity` | string | Nie | - | Aktywność, na którą należy czekać przy uruchomieniu (tylko Android) |
| `newCommandTimeout` | number | Nie | `60` | Sekundy przed zakończeniem sesji z powodu braku aktywności |
| `appiumHost` | string | Nie | `127.0.0.1` | Nazwa hosta serwera Appium |
| `appiumPort` | number | Nie | `4723` | Port serwera Appium |
| `appiumPath` | string | Nie | `/` | Ścieżka serwera Appium |

*Albo należy podać `appPath`, albo ustawić `noReset: true`, aby połączyć się z już uruchomioną aplikacją.

#### Przykład

```
Start an iOS app session on iPhone 15 simulator with my app at /path/to/app.app
```

#### Wsparcie

- Symulatory iOS
- Rzeczywiste urządzenia iOS
- Emulatory Android
- Rzeczywiste urządzenia Android

---

### `close_session`

Zamyka bieżącą sesję przeglądarki lub aplikacji.

#### Parametry

| Parametr | Typ | Obowiązkowy | Domyślny | Opis |
|-----------|------|-----------|---------|-------------|
| `detach` | boolean | Nie | `false` | Odłącza od sesji zamiast zamykać (pozostawia przeglądarkę/aplikację uruchomioną) |

#### Uwagi

Sesje z `noReset: true` lub bez `appPath` automatycznie odłączają się przy zamknięciu, aby zachować stan.

#### Wsparcie

- Przeglądarki desktopowe
- Aplikacje mobilne

---

## Nawigacja

### `navigate`

Przechodzi do określonego URL-a.

#### Parametry

| Parametr | Typ | Obowiązkowy | Opis |
|-----------|------|-----------|-------------|
| `url` | string | Tak | URL, do którego nastąpi przekierowanie |

#### Przykład

```
Navigate to https://webdriver.io
```

#### Wsparcie

- Przeglądarki desktopowe

---

## Interakcja z elementami

### `click_element`

Klika element zidentyfikowany przez selektor.

#### Parametry

| Parametr | Typ | Obowiązkowy | Domyślny | Opis |
|-----------|------|-----------|---------|-------------|
| `selector` | string | Tak | - | Selektor CSS, XPath lub selektor mobilny |
| `scrollToView` | boolean | Nie | `true` | Przewija widok do elementu przed kliknięciem |
| `timeout` | number | Nie | `3000` | Maksymalny czas oczekiwania na element (ms) |

#### Uwagi

- Obsługuje selektory tekstowe WebdriverIO: `button=Dokładny tekst` lub `a*=Zawiera tekst`
- Używa wyrównania środkowego do pozycjonowania przewijania

#### Przykład

```
Click the element with selector "#submit-button"
```

#### Wsparcie

- Przeglądarki desktopowe
- Natywne aplikacje mobilne

---

### `set_value`

Wpisuje tekst w pole wprowadzania.

#### Parametry

| Parametr | Typ | Obowiązkowy | Domyślny | Opis |
|-----------|------|-----------|---------|-------------|
| `selector` | string | Tak | - | Selektor dla elementu wprowadzania |
| `value` | string | Tak | - | Tekst do wpisania |
| `scrollToView` | boolean | Nie | `true` | Przewija widok do elementu przed wpisaniem |
| `timeout` | number | Nie | `3000` | Maksymalny czas oczekiwania na element (ms) |

#### Uwagi

Czyści istniejącą wartość przed wpisaniem nowego tekstu.

#### Przykład

```
Set the value "john@example.com" in the element with selector "#email"
```

#### Wsparcie

- Przeglądarki desktopowe
- Natywne aplikacje mobilne

---

## Analiza strony

### `get_visible_elements`

Pobiera widoczne i interaktywne elementy na bieżącej stronie lub ekranie. Jest to podstawowe narzędzie do odkrywania, jakie elementy są dostępne do interakcji.

#### Parametry

| Parametr | Typ | Obowiązkowy | Domyślny | Opis |
|-----------|------|-----------|---------|-------------|
| `elementType` | string | Nie | `interactable` | Typ elementów: `interactable` (przyciski/linki/pola), `visual` (obrazy/SVG) lub `all` |
| `inViewportOnly` | boolean | Nie | `true` | Zwraca tylko elementy widoczne w obszarze widocznym |
| `includeContainers` | boolean | Nie | `false` | Uwzględnia kontenery układu (ViewGroup, ScrollView, itp.) |
| `includeBounds` | boolean | Nie | `false` | Uwzględnia współrzędne elementu (x, y, szerokość, wysokość) |
| `limit` | number | Nie | `0` | Maksymalna liczba elementów do zwrócenia (0 = bez limitu) |
| `offset` | number | Nie | `0` | Liczba elementów do pominięcia (do paginacji) |

#### Zwraca

```json
{
  "total": 42,
  "showing": 20,
  "hasMore": true,
  "elements": [...]
}
```

**Elementy webowe zawierają:** tagName, type, id, className, textContent, value, placeholder, href, ariaLabel, role, cssSelector, isInViewport

**Elementy mobilne zawierają:** Wiele strategii lokalizacji (accessibility ID, resource ID, XPath, UiAutomator/predicates), typ elementu, tekst i opcjonalnie granice

#### Uwagi

- **Web**: Używa zoptymalizowanego skryptu przeglądarki do szybkiego wykrywania elementów
- **Mobile**: Używa wydajnej analizy źródła strony XML (2 wywołania HTTP zamiast 600+ dla zapytań o elementy)
- Użyj paginacji (`limit` i `offset`) dla dużych stron, aby zmniejszyć zużycie tokenów

#### Przykład

```
Get all visible elements on the page with their coordinates
```

#### Wsparcie

- Przeglądarki desktopowe
- Aplikacje mobilne

---

### `get_accessibility`

Pobiera drzewo dostępności bieżącej strony z semantycznymi informacjami o rolach, nazwach i stanach.

#### Parametry

| Parametr | Typ | Obowiązkowy | Domyślny | Opis |
|-----------|------|-----------|---------|-------------|
| `limit` | number | Nie | `100` | Maksymalna liczba węzłów do zwrócenia (0 = bez limitu) |
| `offset` | number | Nie | `0` | Liczba węzłów do pominięcia (do paginacji) |
| `roles` | string[] | Nie | Wszystkie | Filtruj do określonych ról (np. `["button", "link", "textbox"]`) |
| `namedOnly` | boolean | Nie | `true` | Zwróć tylko węzły z nazwą/etykietą |

#### Zwraca

```json
{
  "total": 85,
  "showing": 100,
  "hasMore": false,
  "nodes": [
    { "role": "button", "name": "Submit" },
    { "role": "link", "name": "Home" }
  ]
}
```

#### Uwagi

- Tylko dla przeglądarek. Dla aplikacji mobilnych użyj `get_visible_elements`
- Przydatne, gdy `get_visible_elements` nie zwraca oczekiwanych elementów
- `namedOnly: true` filtruje anonimowe kontenery i redukuje szum

#### Wsparcie

- Przeglądarki desktopowe

---

## Zrzuty ekranu

### `take_screenshot`

Wykonuje zrzut ekranu bieżącego widoku.

#### Parametry

| Parametr | Typ | Obowiązkowy | Opis |
|-----------|------|-----------|-------------|
| `outputPath` | string | Nie | Ścieżka do zapisania pliku zrzutu ekranu. Jeśli pominięto, zwraca dane base64 |

#### Zwraca

Dane obrazu zakodowane base64 (PNG lub JPEG) z informacjami o rozmiarze.

#### Uwagi

Zrzuty ekranu są automatycznie optymalizowane:
- Maksymalny wymiar: 2000px (skalowany w dół, jeśli większy)
- Maksymalny rozmiar pliku: 1MB
- Format: PNG z maksymalną kompresją lub JPEG, jeśli potrzebny do osiągnięcia limitu rozmiaru

#### Wsparcie

- Przeglądarki desktopowe
- Aplikacje mobilne

---

## Przewijanie

### `scroll`

Przewija stronę w górę lub w dół o określoną liczbę pikseli.

#### Parametry

| Parametr | Typ | Obowiązkowy | Domyślny | Opis |
|-----------|------|-----------|---------|-------------|
| `direction` | string | Tak | - | Kierunek przewijania: `up` lub `down` |
| `pixels` | number | Nie | `500` | Liczba pikseli do przewinięcia |

#### Uwagi

Tylko dla przeglądarek. Do przewijania w aplikacjach mobilnych użyj narzędzia `swipe`.

#### Wsparcie

- Przeglądarki desktopowe

---

## Zarządzanie ciasteczkami

### `get_cookies`

Pobiera ciasteczka z bieżącej sesji.

#### Parametry

| Parametr | Typ | Obowiązkowy | Opis |
|-----------|------|-----------|-------------|
| `name` | string | Nie | Określona nazwa ciasteczka do pobrania (pomiń, aby pobrać wszystkie ciasteczka) |

#### Zwraca

Obiekty ciasteczek z właściwościami name, value, domain, path, expiry, secure i httpOnly.

#### Wsparcie

- Przeglądarki desktopowe

---

### `set_cookie`

Ustawia ciasteczko w bieżącej sesji.

#### Parametry

| Parametr | Typ | Obowiązkowy | Domyślny | Opis |
|-----------|------|-----------|---------|-------------|
| `name` | string | Tak | - | Nazwa ciasteczka |
| `value` | string | Tak | - | Wartość ciasteczka |
| `domain` | string | Nie | Bieżący | Domena ciasteczka |
| `path` | string | Nie | `/` | Ścieżka ciasteczka |
| `expiry` | number | Nie | - | Czas wygaśnięcia jako znacznik czasu Unix (sekundy) |
| `secure` | boolean | Nie | - | Flaga Secure |
| `httpOnly` | boolean | Nie | - | Flaga HttpOnly |
| `sameSite` | string | Nie | - | Atrybut SameSite: `strict`, `lax` lub `none` |

#### Wsparcie

- Przeglądarki desktopowe

---

### `delete_cookies`

Usuwa ciasteczka z bieżącej sesji.

#### Parametry

| Parametr | Typ | Obowiązkowy | Opis |
|-----------|------|-----------|-------------|
| `name` | string | Nie | Określona nazwa ciasteczka do usunięcia (pomiń, aby usunąć wszystkie) |

#### Wsparcie

- Przeglądarki desktopowe

---

## Gesty dotykowe (Mobile)

### `tap_element`

Dotyka element lub współrzędne ekranu.

#### Parametry

| Parametr | Typ | Obowiązkowy | Opis |
|-----------|------|-----------|-------------|
| `selector` | string | Nie* | Selektor elementu do dotknięcia |
| `x` | number | Nie* | Współrzędna X do dotknięcia |
| `y` | number | Nie* | Współrzędna Y do dotknięcia |

*Albo `selector`, albo zarówno `x` jak i `y` są wymagane.

#### Wsparcie

- Aplikacje mobilne

---

### `swipe`

Wykonuje gest przeciągnięcia w określonym kierunku.

#### Parametry

| Parametr | Typ | Obowiązkowy | Domyślny | Opis |
|-----------|------|-----------|---------|-------------|
| `direction` | string | Tak | - | Kierunek przeciągnięcia: `up`, `down`, `left`, `right` |
| `duration` | number | Nie | `500` | Czas trwania przeciągnięcia w milisekundach (100-5000) |
| `percent` | number | Nie | 0.5/0.95 | Procent ekranu do przeciągnięcia (0-1) |

#### Uwagi

- Domyślny procent: 0.5 dla przeciągnięć pionowych, 0.95 dla poziomych
- Kierunek wskazuje ruch zawartości: "przeciągnij w górę" przewija zawartość w górę

#### Przykład

```
Swipe up to scroll down the screen
```

#### Wsparcie

- Aplikacje mobilne

---

### `drag_and_drop`

Przeciąga element do innego elementu lub współrzędnych.

#### Parametry

| Parametr | Typ | Obowiązkowy | Opis |
|-----------|------|-----------|-------------|
| `sourceSelector` | string | Tak | Selektor elementu źródłowego do przeciągnięcia |
| `targetSelector` | string | Nie* | Selektor elementu docelowego do upuszczenia |
| `x` | number | Nie* | Przesunięcie docelowe X (jeśli brak targetSelector) |
| `y` | number | Nie* | Przesunięcie docelowe Y (jeśli brak targetSelector) |
| `duration` | number | Nie | Domyślny | Czas trwania przeciągnięcia w milisekundach (100-5000) |

*Albo `targetSelector`, albo zarówno `x` jak i `y` są wymagane.

#### Wsparcie

- Aplikacje mobilne

---

## Cykl życia aplikacji (Mobile)

### `get_app_state`

Pobiera aktualny stan aplikacji.

#### Parametry

| Parametr | Typ | Obowiązkowy | Opis |
|-----------|------|-----------|-------------|
| `bundleId` | string | Tak | Identyfikator aplikacji (bundle ID dla iOS, nazwa pakietu dla Android) |

#### Zwraca

Stan aplikacji: `not installed`, `not running`, `running in background (suspended)`, `running in background` lub `running in foreground`.

#### Wsparcie

- Aplikacje mobilne

---

## Przełączanie kontekstu (aplikacje hybrydowe)

### `get_contexts`

Wyświetla listę wszystkich dostępnych kontekstów (natywnych i webview).

#### Parametry

Brak

#### Zwraca

Tablica nazw kontekstów (np. `["NATIVE_APP", "WEBVIEW_com.example.app"]`).

#### Wsparcie

- Aplikacje mobilne hybrydowe

---

### `get_current_context`

Pobiera aktualnie aktywny kontekst.

#### Parametry

Brak

#### Zwraca

Nazwa bieżącego kontekstu (np. `NATIVE_APP` lub `WEBVIEW_*`).

#### Wsparcie

- Aplikacje mobilne hybrydowe

---

### `switch_context`

Przełącza między kontekstami natywnym i webview.

#### Parametry

| Parametr | Typ | Obowiązkowy | Opis |
|-----------|------|-----------|-------------|
| `context` | string | Tak | Nazwa kontekstu lub indeks (od 1) z `get_contexts` |

#### Przykład

```
Switch to the WEBVIEW_com.example.app context
```

#### Wsparcie

- Aplikacje mobilne hybrydowe

---

## Kontrola urządzenia (Mobile)

### `rotate_device`

Obraca urządzenie do określonej orientacji.

#### Parametry

| Parametr | Typ | Obowiązkowy | Opis |
|-----------|------|-----------|-------------|
| `orientation` | string | Tak | `PORTRAIT` lub `LANDSCAPE` |

#### Wsparcie

- Aplikacje mobilne

---

### `hide_keyboard`

Ukrywa klawiaturę ekranową.

#### Parametry

Brak

#### Wsparcie

- Aplikacje mobilne

---

### `get_geolocation`

Pobiera aktualne współrzędne GPS.

#### Parametry

Brak

#### Zwraca

Obiekt z `latitude`, `longitude` i `altitude`.

#### Wsparcie

- Aplikacje mobilne

---

### `set_geolocation`

Ustawia współrzędne GPS urządzenia.

#### Parametry

| Parametr | Typ | Obowiązkowy | Opis |
|-----------|------|-----------|-------------|
| `latitude` | number | Tak | Współrzędna szerokości geograficznej (-90 do 90) |
| `longitude` | number | Tak | Współrzędna długości geograficznej (-180 do 180) |
| `altitude` | number | Nie | Wysokość w metrach |

#### Przykład

```
Set geolocation to San Francisco (37.7749, -122.4194)
```

#### Wsparcie

- Aplikacje mobilne

---

## Wykonywanie skryptów

### `execute_script`

Wykonuje JavaScript w przeglądarce lub polecenia mobilne za pośrednictwem Appium.

#### Parametry

| Parametr | Typ | Obowiązkowy | Opis |
|-----------|------|-----------|-------------|
| `script` | string | Tak | Kod JavaScript (przeglądarka) lub polecenie mobilne (np. `mobile: pressKey`) |
| `args` | array | Nie | Argumenty dla skryptu |

#### Przykłady w przeglądarce

```javascript
// Get page title
execute_script({ script: "return document.title" })

// Get scroll position
execute_script({ script: "return window.scrollY" })

// Click element by selector
execute_script({ script: "arguments[0].click()", args: ["#myButton"] })
```

#### Przykłady mobilne (Appium)

```javascript
// Press back key (Android)
execute_script({ script: "mobile: pressKey", args: [{ keycode: 4 }] })

// Activate app
execute_script({ script: "mobile: activateApp", args: [{ appId: "com.example" }] })

// Terminate app
execute_script({ script: "mobile: terminateApp", args: [{ appId: "com.example" }] })

// Deep link
execute_script({ script: "mobile: deepLink", args: [{ url: "myapp://screen", package: "com.example" }] })

// Shell command (Android)
execute_script({ script: "mobile: shell", args: [{ command: "dumpsys", args: ["battery"] }] })
```

#### Popularne kody klawiszy Androida

| Klawisz | Kod |
|-----|------|
| BACK | 4 |
| HOME | 3 |
| ENTER | 66 |
| MENU | 82 |
| SEARCH | 84 |

#### Więcej poleceń mobilnych

Aby uzyskać pełną listę dostępnych poleceń mobilnych Appium, zobacz:
- [Polecenia mobilne XCUITest](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/) (iOS)
- [Polecenia mobilne UiAutomator2](https://github.com/appium/appium-uiautomator2-driver#mobile-commands) (Android)

#### Wsparcie

- Przeglądarki desktopowe
- Aplikacje mobilne (za pośrednictwem poleceń mobilnych Appium)