---
id: resources
title: Zasoby
description: "Odczytuj bieżący stan sesji, historię sesji oraz szczegóły konfiguracji dostawców chmurowych za pomocą zasobów wdio:// serwera WebdriverIO MCP, dostępnych tylko do odczytu."
---

Zasoby MCP zapewniają dostęp tylko do odczytu do bieżącego stanu sesji. W przeciwieństwie do narzędzi, zasoby są pobierane przez model AI według jego uznania; nie wykonują one żadnych akcji. Wszystkie zasoby używają schematu URI `wdio://`.

## Kiedy używać zasobów, a kiedy narzędzi

- **Zasoby** — stan otoczenia, który zmienia się w trakcie interakcji: bieżące elementy, zrzut ekranu, ciasteczka, drzewo dostępności. Odczytaj je przed wykonaniem akcji, aby zrozumieć, co znajduje się na ekranie.
- **Narzędzia** — akcje, które zmieniają stan: kliknięcie, nawigacja, ustawienie wartości.

Do wykrywania elementów preferuj `wdio://session/current/elements` zamiast `get_screenshot`; zwraca on gotowe do użycia selektory i zużywa znacznie mniej tokenów.

## Historia sesji

### `wdio://sessions`

Indeks wszystkich sesji przeglądarki i aplikacji wraz z metadanymi i liczbą kroków.

```json
{
  "sessions": [
    {
      "sessionId": "abc-123",
      "type": "browser",
      "startedAt": "2024-01-15T10:00:00.000Z",
      "endedAt": "2024-01-15T10:05:00.000Z",
      "stepCount": 12,
      "isCurrent": false
    }
  ]
}
```

---

### `wdio://session/current/steps`

Dziennik kroków w formacie JSON dla aktualnie aktywnej sesji. Zawiera wszystkie zarejestrowane kroki automatyzacji z nazwami narzędzi, parametrami i znacznikami czasu.

---

### `wdio://session/current/code`

Wygenerowany kod JavaScript WebdriverIO dla aktualnie aktywnej sesji. Generowany automatycznie na podstawie zarejestrowanych kroków. Wklej go do pliku testowego WebdriverIO, aby odtworzyć sesję.

---

### `wdio://session/{sessionId}/steps`

Dziennik kroków dla konkretnej sesji według ID. Szablon URI — zastąp `{sessionId}` identyfikatorem z `wdio://sessions`.

---

### `wdio://session/{sessionId}/code`

Wygenerowany kod JavaScript WebdriverIO dla konkretnej sesji według ID. Szablon URI — zastąp `{sessionId}` identyfikatorem z `wdio://sessions`.

## Bieżący stan strony (bieżąca sesja)

### `wdio://session/current/elements`

Elementy interaktywne na bieżącej stronie. Zwraca gotowe do użycia selektory, tekst elementów oraz informacje o ich widoczności.

**To podstawowy zasób do zrozumienia, co znajduje się na ekranie.** Odczytaj go przed kliknięciem lub wpisywaniem tekstu. Jest znacznie szybszy i tańszy niż zrzut ekranu.

Do zaawansowanego filtrowania (tylko obszar widoku, kontenery, ramki ograniczające, paginacja) użyj zamiast tego narzędzia `get_elements`.

---

### `wdio://session/current/accessibility`

Drzewo dostępności dla bieżącej strony. Domyślnie zwraca wszystkie węzły wraz z atrybutami roli, nazwy, selektora i stanu. Tylko dla przeglądarek. Na urządzeniach mobilnych użyj `wdio://session/current/elements`.

```json
{
  "total": 84,
  "showing": 84,
  "hasMore": false,
  "nodes": [
    {
      "role": "button",
      "name": "Submit",
      "selector": "button.submit-btn",
      "disabled": false
    }
  ]
}
```

Aby uzyskać przefiltrowane wyniki (według roli, z paginacją), użyj narzędzia `get_accessibility_tree`.

---

### `wdio://session/current/screenshot`

Zrzut ekranu bieżącej strony lub ekranu jako obraz zakodowany w base64. Automatycznie skalowany (maks. 2000px) i kompresowany (maks. 1 MB).

Używaj go do weryfikacji wizualnej lub debugowania układu. Do wykrywania elementów preferuj `wdio://session/current/elements`.

---

### `wdio://session/current/cookies`

Wszystkie ciasteczka dla bieżącej sesji przeglądarki.

```json
[
  {
    "name": "session_token",
    "value": "abc123",
    "domain": "example.com",
    "path": "/",
    "httpOnly": true,
    "secure": true
  }
]
```

---

### `wdio://session/current/tabs`

Wszystkie otwarte karty przeglądarki w bieżącej sesji. Tylko dla przeglądarek.

```json
[
  {
    "handle": "CDwindow-ABC",
    "title": "My App",
    "url": "https://example.com/dashboard",
    "isActive": true
  }
]
```

Użyj przed `switch_tab`, aby znaleźć docelowy uchwyt lub indeks.

---

### `wdio://session/current/contexts`

Dostępne konteksty automatyzacji (NATIVE_APP, WEBVIEW). Tylko dla urządzeń mobilnych.

```json
["NATIVE_APP", "WEBVIEW_com.example.app"]
```

---

### `wdio://session/current/context`

Aktualnie aktywny kontekst automatyzacji. Tylko dla urządzeń mobilnych.

```json
"NATIVE_APP"
```

---

### `wdio://session/current/app-state/{bundleId}`

Stan cyklu życia aplikacji dla danego bundle ID. Tylko dla urządzeń mobilnych. Szablon URI — zastąp `{bundleId}` identyfikatorem bundle ID systemu iOS lub nazwą pakietu Androida.

Zwraca jedną z wartości:
- `0` — niezainstalowana
- `1` — nieuruchomiona
- `2` — działa w tle (wstrzymana)
- `3` — działa w tle
- `4` — działa na pierwszym planie

Aby uzyskać nazwane wartości, użyj zamiast tego narzędzia `get_app_state`.

---

### `wdio://session/current/geolocation`

Bieżące nadpisanie geolokalizacji urządzenia ustawione przez `set_geolocation`.

```json
{
  "latitude": 51.5074,
  "longitude": -0.1278,
  "altitude": 0
}
```

---

### `wdio://session/current/logs`

Logi sesji dla bieżącej sesji. Zwraca komunikaty konsoli przeglądarki i wyjątki JavaScript (sesje Chromium), wyjście logcat (Android) lub crash/syslog (iOS).

```json
{
  "type": "browser",
  "logs": [
    { "level": "SEVERE", "message": "Uncaught TypeError: ...", "source": "javascript" },
    { "level": "INFO", "message": "Page loaded", "source": "console" }
  ]
}
```

---

### `wdio://session/current/capabilities`

Surowe capabilities zwrócone przez serwer WebDriver lub Appium dla bieżącej sesji. Służy do debugowania; pokazuje rzeczywiste wartości zaakceptowane przez sterownik, w tym wartości domyślne zastosowane przez dostawcę chmurowego lub Appium.

## Dostawcy chmurowi

### `wdio://browserstack/local-binary`

Adres URL pobierania specyficzny dla platformy oraz instrukcje konfiguracji demona dla pliku binarnego BrowserStack Local. Przeczytaj to przed użyciem `tunnel: true` lub `tunnel: "external"` z `provider: "browserstack"`; zawiera dokładne polecenia dla Twojego systemu operacyjnego i architektury.

```json
{
  "platform": "macOS",
  "arch": "arm64",
  "downloadUrl": "https://...",
  "setup": ["step 1", "step 2", "step 3", "step 4"],
  "commands": {
    "start": "./BrowserStackLocal --key YOUR_KEY",
    "stop": "...",
    "status": "..."
  }
}
```

---

### `wdio://saucelabs/local-binary`

Adres URL pobierania specyficzny dla platformy oraz instrukcje konfiguracji demona dla Sauce Connect Proxy. Przeczytaj to przed użyciem `tunnel: "external"` z `provider: "saucelabs"`; w przypadku `tunnel: true` SDK automatycznie zarządza Sauce Connect.

```json
{
  "platform": "Linux",
  "arch": "x64",
  "downloadUrl": "https://saucelabs.com/downloads/sc-4.9.2-linux.tar.gz",
  "setup": ["step 1", "step 2", "step 3", "step 4"],
  "commands": {
    "start": "./sc -u YOUR_USERNAME -k YOUR_ACCESS_KEY --region eu-central-1",
    "stop": "./sc --stop",
    "status": "./sc --status"
  }
}
```

---

### `wdio://testmu/local-binary`

Adres URL pobierania specyficzny dla platformy oraz instrukcje konfiguracji demona dla TestMu Tunnel. Potrzebne tylko w przypadku `tunnel: "external"` z `provider: "testmu"` — w przypadku `tunnel: true` SDK automatycznie zarządza tunelem za pomocą `@lambdatest/node-tunnel`.

```json
{
  "platform": "Linux",
  "arch": "x64",
  "downloadUrl": "https://downloads.lambdatest.com/tunnel/v4/linux/64bit/LT_Linux.zip",
  "setup": ["step 1", "step 2", "step 3", "step 4"],
  "commands": {
    "start": "./LT --user YOUR_USERNAME --key YOUR_ACCESS_KEY",
    "stop": "./LT --user YOUR_USERNAME --key YOUR_ACCESS_KEY --stop",
    "status": "./LT --status"
  }
}
```

---

### `wdio://testingbot/local-binary`

Adres URL pobierania oraz instrukcje konfiguracji demona dla TestingBot Tunnel. Tunel jest wieloplatformowym plikiem Java JAR (wymaga Java 11+). Potrzebne tylko w przypadku `tunnel: "external"` z `provider: "testingbot"` — w przypadku `tunnel: true` SDK automatycznie zarządza tunelem za pomocą `testingbot-tunnel-launcher`.

```json
{
  "requirement": "MUST start the TestingBot Tunnel BEFORE calling start_session with tunnel: \"external\".",
  "runtime": "Java 11+ (17 LTS recommended)",
  "downloadUrl": "https://testingbot.com/downloads/testingbot-tunnel.zip",
  "setup": [
    "1. Download: curl -O https://testingbot.com/downloads/testingbot-tunnel.zip",
    "2. Unzip: unzip testingbot-tunnel.zip",
    "3. Start: java -jar testingbot-tunnel.jar YOUR_KEY YOUR_SECRET"
  ],
  "commands": {
    "start": "java -jar testingbot-tunnel.jar YOUR_KEY YOUR_SECRET",
    "stop": "Press Ctrl+C in the tunnel terminal, or kill the java process."
  }
}
```