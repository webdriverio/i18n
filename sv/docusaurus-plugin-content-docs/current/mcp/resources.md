---
id: resources
title: Resurser
description: "Läs live-sessionstillstånd, sessionshistorik och konfigurationsdetaljer för molnleverantörer via de skrivskyddade wdio://-resurserna i WebdriverIO MCP-servern."
---

MCP-resurser ger skrivskyddad åtkomst till live-sessionstillstånd. Till skillnad från verktyg hämtas resurser av AI-modellen efter behov; de utför inga åtgärder. Alla resurser använder URI-schemat `wdio://`.

## När ska man använda resurser respektive verktyg

- **Resurser** — omgivande tillstånd som ändras när du interagerar: aktuella element, skärmdump, cookies, tillgänglighetsträd. Läs dem innan du agerar för att förstå vad som visas på skärmen.
- **Verktyg** — åtgärder som ändrar tillstånd: klicka, navigera, ange värde.

Föredra `wdio://session/current/elements` framför `get_screenshot` för att hitta element; den returnerar färdiga selektorer och kostar betydligt färre tokens.

## Sessionshistorik

### `wdio://sessions`

Index över alla webbläsar- och appsessioner med metadata och antal steg.

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

JSON-stegslogg för den aktuella aktiva sessionen. Innehåller alla inspelade automatiseringssteg med verktygsnamn, parametrar och tidsstämplar.

---

### `wdio://session/current/code`

Genererad WebdriverIO-JavaScript för den aktuella aktiva sessionen. Autogenereras från inspelade steg. Klistra in i en WebdriverIO-testfil för att spela upp sessionen igen.

---

### `wdio://session/{sessionId}/steps`

Stegslogg för en specifik session via ID. URI-mall — ersätt `{sessionId}` med ID:t från `wdio://sessions`.

---

### `wdio://session/{sessionId}/code`

Genererad WebdriverIO-JavaScript för en specifik session via ID. URI-mall — ersätt `{sessionId}` med ID:t från `wdio://sessions`.

## Live-sidtillstånd (aktuell session)

### `wdio://session/current/elements`

Interagerbara element på den aktuella sidan. Returnerar färdiga selektorer, elementtext och synlighetsinformation.

**Detta är den primära resursen för att förstå vad som visas på skärmen.** Läs den innan du klickar eller skriver. Mycket snabbare och billigare än en skärmdump.

För avancerad filtrering (endast viewport, containrar, avgränsningsrutor, paginering), använd istället verktyget `get_elements`.

---

### `wdio://session/current/accessibility`

Tillgänglighetsträd för den aktuella sidan. Returnerar som standard alla noder med attributen roll, namn, selektor och tillstånd. Endast webbläsare. På mobil, använd `wdio://session/current/elements`.

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

För filtrerade resultat (efter roll, paginerade), använd verktyget `get_accessibility_tree`.

---

### `wdio://session/current/screenshot`

Skärmdump av den aktuella sidan eller skärmen som en base64-kodad bild. Storleksändras automatiskt (max 2000px) och komprimeras (max 1 MB).

Använd för visuell verifiering eller felsökning av layout. För att hitta element, föredra `wdio://session/current/elements`.

---

### `wdio://session/current/cookies`

Alla cookies för den aktuella webbläsarsessionen.

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

Alla öppna webbläsarflikar i den aktuella sessionen. Endast webbläsare.

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

Använd före `switch_tab` för att hitta målets handle eller index.

---

### `wdio://session/current/contexts`

Tillgängliga automatiseringskontexter (NATIVE_APP, WEBVIEW). Endast mobil.

```json
["NATIVE_APP", "WEBVIEW_com.example.app"]
```

---

### `wdio://session/current/context`

Aktuell aktiv automatiseringskontext. Endast mobil.

```json
"NATIVE_APP"
```

---

### `wdio://session/current/app-state/{bundleId}`

Appens livscykeltillstånd för ett givet bundle-ID. Endast mobil. URI-mall — ersätt `{bundleId}` med ett iOS-bundle-ID eller Android-paketnamn.

Returnerar något av:
- `0` — inte installerad
- `1` — körs inte
- `2` — körs i bakgrunden (pausad)
- `3` — körs i bakgrunden
- `4` — körs i förgrunden

För namngiven utdata, använd istället verktyget `get_app_state`.

---

### `wdio://session/current/geolocation`

Aktuell åsidosättning av enhetens geolokalisering, angiven av `set_geolocation`.

```json
{
  "latitude": 51.5074,
  "longitude": -0.1278,
  "altitude": 0
}
```

---

### `wdio://session/current/logs`

Sessionsloggar för den aktuella sessionen. Returnerar konsolmeddelanden från webbläsaren och JavaScript-undantag (Chromium-sessioner), logcat-utdata (Android) eller krasch-/syslog (iOS).

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

Råa capabilities som returneras av WebDriver- eller Appium-servern för den aktuella sessionen. Använd för felsökning; visar de faktiska värden som drivrutinen accepterade, inklusive standardvärden som tillämpats av molnleverantören eller Appium.

## Molnleverantörer

### `wdio://browserstack/local-binary`

Plattformsspecifik nedladdnings-URL och instruktioner för daemon-konfiguration för BrowserStack Local-binären. Läs detta innan du använder `tunnel: true` eller `tunnel: "external"` med `provider: "browserstack"`; den innehåller de exakta kommandona för ditt operativsystem och din arkitektur.

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

Plattformsspecifik nedladdnings-URL och instruktioner för daemon-konfiguration för Sauce Connect Proxy. Läs detta innan du använder `tunnel: "external"` med `provider: "saucelabs"`; för `tunnel: true` hanterar SDK:n Sauce Connect automatiskt.

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

Plattformsspecifik nedladdnings-URL och instruktioner för daemon-konfiguration för TestMu Tunnel. Behövs endast för `tunnel: "external"` med `provider: "testmu"` — för `tunnel: true` hanterar SDK:n tunneln automatiskt via `@lambdatest/node-tunnel`.

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

Nedladdnings-URL och instruktioner för daemon-konfiguration för TestingBot Tunnel. Tunneln är en plattformsoberoende Java-JAR (kräver Java 11+). Behövs endast för `tunnel: "external"` med `provider: "testingbot"` — för `tunnel: true` hanterar SDK:n tunneln automatiskt via `testingbot-tunnel-launcher`.

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