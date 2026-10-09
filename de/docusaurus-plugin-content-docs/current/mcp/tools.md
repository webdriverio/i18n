---
id: tools
title: Tools
description: "Nachschlagewerk der Tools, die der WebdriverIO-MCP-Server für Sessions, Navigation, Elementinteraktion, Screenshots, Gesten und App-Lebenszyklus bereitstellt."
---

Der WebdriverIO-MCP-Server stellt 29 Tools bereit, die nach Funktion gegliedert sind. Mit **Browser-only** gekennzeichnete Tools erfordern eine Session mit `platform: "browser"`. Mit **Mobile-only** gekennzeichnete Tools erfordern `platform: "ios"` oder `platform: "android"`.

## Session-Verwaltung

### `start_session`

Startet eine neue Browser- oder Mobile-Automatisierungssession. Es kann jeweils nur eine Session aktiv sein; das Starten einer neuen Session schließt die bestehende.

| Parameter              | Typ                                                                    | Erforderlich | Standard         | Beschreibung                                                                                                                      |
| ---------------------- | ---------------------------------------------------------------------- | ------------ | ---------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `platform`             | `"browser" \| "ios" \| "android"`                                      | ✓            | —                | Plattform der Session                                                                                                             |
| `provider`             | `"local" \| "browserstack" \| "saucelabs" \| "testmu" \| "testingbot"` | —            | `"local"`        | Anbieter der Session                                                                                                              |
| `browser`              | `"chrome" \| "firefox" \| "edge" \| "safari"`                          | nur Browser  | —                | Zu startender Browser                                                                                                             |
| `browserVersion`       | string                                                                 | —            | latest           | Browserversion (nur Cloud-Anbieter, Standard: latest)                                                                             |
| `os`                   | string                                                                 | —            | —                | Betriebssystem (nur Cloud-Anbieter, z. B. `"Windows"`, `"OS X"`)                                                                  |
| `osVersion`            | string                                                                 | —            | —                | Betriebssystemversion (nur Cloud-Anbieter, z. B. `"11"`, `"Sequoia"`)                                                             |
| `headless`             | boolean                                                                | —            | `true`           | Browser im Headless-Modus ausführen                                                                                               |
| `windowWidth`          | number                                                                 | —            | `1920`           | Breite des Browserfensters (400–3840)                                                                                             |
| `windowHeight`         | number                                                                 | —            | `1080`           | Höhe des Browserfensters (400–2160)                                                                                               |
| `navigationUrl`        | string                                                                 | —            | —                | URL, zu der nach dem Start navigiert wird                                                                                         |
| `deviceName`           | string                                                                 | nur Mobile   | —                | Name des Geräts/Emulators/Simulators                                                                                              |
| `platformVersion`      | string                                                                 | —            | —                | Betriebssystemversion (z. B. `"17.0"`, `"14"`)                                                                                    |
| `appPath`              | string                                                                 | —            | —                | Pfad zu `.app` / `.apk` / `.ipa`                                                                                                  |
| `app`                  | string                                                                 | —            | —                | App-URL (`bs://...` für BrowserStack, `storage:filename=` für Sauce Labs, `lt://...` für TestMu, TestingBot app_url) oder custom_id |
| `automationName`       | `"XCUITest" \| "UiAutomator2"`                                         | —            | auto             | Automatisierungstreiber                                                                                                           |
| `autoGrantPermissions` | boolean                                                                | —            | `true`           | App-Berechtigungen automatisch erteilen                                                                                           |
| `autoAcceptAlerts`     | boolean                                                                | —            | `true`           | Alerts automatisch akzeptieren                                                                                                    |
| `autoDismissAlerts`    | boolean                                                                | —            | `false`          | Alerts automatisch verwerfen                                                                                                      |
| `appWaitActivity`      | string                                                                 | —            | —                | Android-Activity, auf die beim Start gewartet wird                                                                                |
| `udid`                 | string                                                                 | —            | —                | UDID eines realen iOS-Geräts                                                                                                      |
| `noReset`              | boolean                                                                | —            | —                | App-Daten zwischen Sessions beibehalten                                                                                           |
| `fullReset`            | boolean                                                                | —            | —                | App vor/nach der Session deinstallieren                                                                                           |
| `newCommandTimeout`    | number                                                                 | —            | `300`            | Appium-Befehls-Timeout (Sekunden)                                                                                                 |
| `attach`               | boolean                                                                | —            | `false`          | Über CDP an ein bestehendes Chrome anhängen                                                                                       |
| `attachConfig`         | object                                                                 | —            | —                | CDP-Verbindung: `{ port: 9222, host: "localhost" }`                                                                               |
| `appiumConfig`         | object                                                                 | —            | —                | Appium-Server: `{ host, port, path }`                                                                                             |
| `tunnel`               | `boolean \| "external"`                                                | —            | `false`          | Lokales Tunnel-Routing (Cloud-Anbieter). `true` = automatischer Start, `"external"` = Tunnel läuft bereits extern                 |
| `reporting`            | object                                                                 | —            | —                | Reporting-Labels für Cloud-Anbieter: `{ project, build, session }`                                                                |
| `trace`                | boolean                                                                | —            | `false`          | Trace-Aufzeichnung aktivieren – erzeugt ein Playwright-kompatibles `.trace`-Zip                                                   |
| `region`               | `"us-west-1" \| "eu-central-1" \| "apac-southeast-1"`                  | —            | `"eu-central-1"` | Rechenzentrumsregion von Sauce Labs                                                                                               |
| `tunnelName`           | string                                                                 | —            | —                | Name zur Identifizierung des Tunnels (erforderlich für `tunnel: "external"`)                                                      |
| `capabilities`         | object                                                                 | —            | —                | Zusätzliche Roh-Capabilities, die zusammengeführt werden                                                                          |

```js
// Lokaler Chrome-Browser
start_session({ platform: "browser", browser: "chrome" })

// iOS-Simulator
start_session({ platform: "ios", deviceName: "iPhone 16", platformVersion: "18.0", appPath: "/path/to/app.app" })

// BrowserStack Android
start_session({ platform: "android", provider: "browserstack", deviceName: "Samsung Galaxy S24", app: "bs://abc123" })

// Sauce Labs iOS
start_session({ platform: "ios", provider: "saucelabs", deviceName: "iPhone 15", platformVersion: "17.0", app: "storage:filename=MyApp.ipa" })

// TestMu-Browser
start_session({ platform: "browser", provider: "testmu", browser: "chrome", os: "Windows", osVersion: "11" })

// TestingBot-Browser
start_session({ platform: "browser", provider: "testingbot", browser: "chrome", os: "Windows", osVersion: "11" })

// Cloud-Anbieter mit Tunnel
start_session({ platform: "browser", provider: "browserstack", browser: "chrome", tunnel: true })

// An bestehendes Chrome anhängen (nach launch_chrome)
start_session({ platform: "browser", browser: "chrome", attach: true })
```

---

### `close_session`

Schließt die aktuelle Session oder trennt die Verbindung zu ihr.

| Parameter | Typ     | Erforderlich | Standard | Beschreibung                                                          |
| --------- | ------- | ------------ | -------- | --------------------------------------------------------------------- |
| `detach`  | boolean | —            | `false`  | Verbindung trennen, ohne zu beenden (erhält den App-Zustand in Appium) |

Sessions, die mit `noReset: true` gestartet wurden, trennen sich standardmäßig automatisch.

---

### `launch_chrome`

Bereitet eine Chrome-Instanz mit aktiviertem Remote-Debugging vor, damit sich `start_session({ attach: true })` verbinden kann. Zwei Modi:

- `newInstance` (Standard): öffnet Chrome neben Ihrer bestehenden Instanz mit einem separaten Profilverzeichnis; Ihre aktuelle Sitzung bleibt unberührt.
- `freshSession`: startet Chrome mit einem leeren Profil (keine Cookies, keine Logins). Verwenden Sie `copyProfileFiles: true`, um Cookies und Logins zu übernehmen.

| Parameter          | Typ                               | Erforderlich | Standard        | Beschreibung                                                                  |
| ------------------ | --------------------------------- | ------------ | --------------- | ----------------------------------------------------------------------------- |
| `port`             | number                            | —            | `9222`          | Remote-Debugging-Port                                                         |
| `mode`             | `"newInstance" \| "freshSession"` | —            | `"newInstance"` | Startmodus                                                                    |
| `copyProfileFiles` | boolean                           | —            | `false`         | Chrome-Standardprofil (Cookies, Logins) in die Debug-Session kopieren         |

Nachdem dieses Tool erfolgreich ausgeführt wurde, rufen Sie `start_session({ platform: "browser", browser: "chrome", attach: true })` auf.

## Navigation & Tabs

### `navigate`

Lädt eine URL im aktuellen Tab und wartet auf das Page-Load-Event. Setzt den Seitenzustand (DOM, JS-Laufzeit) zurück. **Browser-only.**

| Parameter | Typ    | Erforderlich | Beschreibung                  |
| --------- | ------ | ------------ | ----------------------------- |
| `url`     | string | ✓            | URL, zu der navigiert wird    |

---

### `get_tabs`

Listet alle Browser-Tabs mit Handle, Titel, URL und Angabe des aktiven Tabs auf. Verwenden Sie dies vor `switch_tab`, um das Ziel-Handle zu ermitteln. **Browser-only.**

Keine Parameter.

---

### `switch_tab`

Fokussiert einen Browser-Tab anhand des Window-Handles oder eines 0-basierten Index. Alle nachfolgenden Tool-Aufrufe wirken auf den neu aktivierten Tab. **Browser-only.**

| Parameter | Typ    | Erforderlich | Beschreibung                          |
| --------- | ------ | ------------ | ------------------------------------- |
| `handle`  | string | —            | Window-Handle, zu dem gewechselt wird |
| `index`   | number | —            | 0-basierter Tab-Index (≥ 0)           |

Geben Sie entweder `handle` oder `index` an. Handles erhalten Sie über `get_tabs` oder `wdio://session/current/tabs`.

---

### `switch_frame`

Wechselt den WebDriver-Frame-Kontext per CSS/XPath-Selektor in ein iframe oder zurück zur obersten Ebene, wenn der Selektor weggelassen wird. Die Änderung bleibt bestehen; alle nachfolgenden Aufrufe von `click_element`, `set_value` und `get_elements` wirken innerhalb des gewechselten Frames, bis Sie zurückwechseln. Wartet bis zu 5 s auf das iframe. **Browser-only.**

| Parameter  | Typ    | Erforderlich | Beschreibung                                                                                        |
| ---------- | ------ | ------------ | --------------------------------------------------------------------------------------------------- |
| `selector` | string | —            | CSS/XPath-Selektor für das iframe-Element. Weglassen, um zum Frame der obersten Ebene zurückzukehren. |

```js
// In ein iframe wechseln
switch_frame({ selector: "#my-iframe" })

// Mit Elementen innerhalb des iframes interagieren
click_element({ selector: "button.submit" })

// Zurück zur obersten Ebene wechseln
switch_frame()
```

## Elementinteraktion

### `click_element`

Wartet, bis ein Element existiert, scrollt es in den sichtbaren Bereich und klickt darauf. Funktioniert im Browser und auf Mobilgeräten. Auf iOS sollten Sie `tap_element` bevorzugen; `click_element` wird von der nativen Ebene manchmal ignoriert.

| Parameter      | Typ     | Erforderlich | Standard | Beschreibung                                             |
| -------------- | ------- | ------------ | -------- | -------------------------------------------------------- |
| `selector`     | string  | ✓            | —        | CSS-, XPath- oder Text-Selektor                          |
| `scrollToView` | boolean | —            | `true`   | Element vor dem Klicken in den sichtbaren Bereich scrollen |
| `timeout`      | number  | —            | —        | Maximale Wartezeit (ms)                                  |

---

### `set_value`

Leert ein Input- oder Textarea-Feld und tippt den angegebenen Text ein. Ersetzt immer den vorhandenen Inhalt.

| Parameter      | Typ     | Erforderlich | Standard | Beschreibung                                             |
| -------------- | ------- | ------------ | -------- | -------------------------------------------------------- |
| `selector`     | string  | ✓            | —        | CSS-, XPath- oder Text-Selektor                          |
| `value`        | string  | ✓            | —        | Einzugebender Text                                       |
| `scrollToView` | boolean | —            | `true`   | Element vor dem Tippen in den sichtbaren Bereich scrollen |
| `timeout`      | number  | —            | —        | Maximale Wartezeit (ms)                                  |

---

### `scroll`

Scrollt die Seite um eine Anzahl von Pixeln. **Browser-only.** Verwenden Sie auf Mobilgeräten `swipe`.

| Parameter   | Typ              | Erforderlich | Standard | Beschreibung          |
| ----------- | ---------------- | ------------ | -------- | --------------------- |
| `direction` | `"up" \| "down"` | ✓            | —        | Scrollrichtung        |
| `pixels`    | number           | —            | `500`    | Zu scrollende Pixel   |

## Elementanalyse

### `get_elements`

Gibt interagierbare Elemente auf der aktuellen Seite mit sofort verwendbaren Selektoren zurück. Bevorzugen Sie die Ressource `wdio://session/current/elements` für die laufende Kontextwahrnehmung; verwenden Sie dieses Tool, wenn Sie Filterung oder Paginierung benötigen.

| Parameter           | Typ     | Erforderlich | Standard | Beschreibung                                         |
| ------------------- | ------- | ------------ | -------- | ---------------------------------------------------- |
| `inViewportOnly`    | boolean | —            | `false`  | Nur im Viewport sichtbare Elemente zurückgeben       |
| `includeContainers` | boolean | —            | `false`  | Container-Elemente (divs, sections) einschließen     |
| `includeBounds`     | boolean | —            | `false`  | Koordinaten der Bounding Box einschließen            |
| `limit`             | number  | —            | `0`      | Maximale Anzahl zurückgegebener Elemente (0 = unbegrenzt) |
| `offset`            | number  | —            | `0`      | Zu überspringende Elemente (Paginierung)             |

---

### `get_accessibility_tree`

Gibt den Accessibility-Tree der Seite mit Rollen, Namen und Selektoren zurück. Unterstützt Filterung und Paginierung. **Browser-only.**

| Parameter | Typ      | Erforderlich | Standard | Beschreibung                                                   |
| --------- | -------- | ------------ | -------- | -------------------------------------------------------------- |
| `limit`   | number   | —            | `0`      | Maximale Anzahl zurückgegebener Knoten (0 = unbegrenzt)        |
| `offset`  | number   | —            | `0`      | Zu überspringende Knoten (Paginierung)                         |
| `roles`   | string[] | —            | —        | Nach ARIA-Rollen filtern, z. B. `["button", "link", "heading"]` |

## Screenshots

### `get_screenshot`

Erstellt einen Screenshot der aktuellen Seite bzw. des aktuellen Bildschirms. Gibt ein base64-codiertes Bild zurück, das automatisch skaliert und komprimiert wird, um innerhalb der Kontextgrenzen des Modells zu bleiben (max. 1 MB, max. 2000 px).

Keine Parameter. Bevorzugen Sie zur Elementerkennung `wdio://session/current/elements` gegenüber Screenshots; das ist schneller und verbraucht deutlich weniger Tokens. Verwenden Sie Screenshots zur visuellen Überprüfung oder zum Debuggen des Layouts.

## Cookie-Verwaltung

### `get_cookies`

Gibt alle Cookies der aktuellen Session oder ein einzelnes Cookie anhand des Namens zurück. **Browser-only.**

| Parameter | Typ    | Erforderlich | Beschreibung                                         |
| --------- | ------ | ------------ | ---------------------------------------------------- |
| `name`    | string | —            | Cookie-Name. Weglassen, um alle Cookies zurückzugeben. |

---

### `set_cookie`

Setzt ein Browser-Cookie. Der Browser muss sich bereits auf der Ziel-Domain befinden – Cookies können nicht domainübergreifend gesetzt werden. Nützlich, um Session-Tokens oder Feature-Flags einzuschleusen, ohne Login-Abläufe durchlaufen zu müssen. **Browser-only.**

| Parameter  | Typ                           | Erforderlich | Beschreibung                                    |
| ---------- | ----------------------------- | ------------ | ----------------------------------------------- |
| `name`     | string                        | ✓            | Cookie-Name                                     |
| `value`    | string                        | ✓            | Cookie-Wert                                     |
| `domain`   | string                        | —            | Cookie-Domain (Standard: aktuelle Domain)       |
| `path`     | string                        | —            | Cookie-Pfad (Standard: `/`)                     |
| `expiry`   | number                        | —            | Ablaufzeit als Unix-Zeitstempel (Sekunden)      |
| `httpOnly` | boolean                       | —            | HttpOnly-Flag                                   |
| `secure`   | boolean                       | —            | Secure-Flag                                     |
| `sameSite` | `"strict" \| "lax" \| "none"` | —            | SameSite-Attribut                               |

---

### `delete_cookies`

Löscht alle Cookies oder ein bestimmtes Cookie anhand des Namens. **Browser-only.**

| Parameter | Typ    | Erforderlich | Beschreibung                                                     |
| --------- | ------ | ------------ | ---------------------------------------------------------------- |
| `name`    | string | —            | Name des zu löschenden Cookies. Weglassen, um alle Cookies zu löschen. |

## Touch-Gesten (Mobile)

### `tap_element`

Ruft `element.tap()` auf einem gefundenen Element auf oder tippt auf absolute Bildschirmkoordinaten. Verwenden Sie dies auf iOS, wenn `click_element` ignoriert wird; Tippen ist die native Geste, auf die iOS reagiert. **Mobile-only.**

| Parameter  | Typ    | Erforderlich | Beschreibung                                              |
| ---------- | ------ | ------------ | --------------------------------------------------------- |
| `selector` | string | —            | Element-Selektor                                          |
| `x`        | number | —            | X-Koordinate für das Tippen auf den Bildschirm (ohne Selektor) |
| `y`        | number | —            | Y-Koordinate für das Tippen auf den Bildschirm (ohne Selektor) |

Geben Sie entweder `selector` oder `x`/`y`-Koordinaten an.

---

### `swipe`

Führt eine Wischgeste über den gesamten Bildschirm aus. Die Richtung entspricht der Bewegungsrichtung des Inhalts (z. B. scrollt `"up"` eine Liste nach oben). Verwenden Sie dies zum Scrollen über die sichtbaren Grenzen hinaus. Um ein bestimmtes Element zu bewegen, verwenden Sie `drag_and_drop`. **Mobile-only.** Verwenden Sie in Browsern `scroll`.

| Parameter   | Typ                                   | Erforderlich | Standard       | Beschreibung                                 |
| ----------- | ------------------------------------- | ------------ | -------------- | -------------------------------------------- |
| `direction` | `"up" \| "down" \| "left" \| "right"` | ✓            | —              | Wischrichtung                                |
| `duration`  | number                                | —            | `500`          | Dauer des Wischens (ms, 100–5000)            |
| `percent`   | number                                | —            | `0.5` / `0.95` | Anteil des Bildschirms, über den gewischt wird (0–1) |

---

### `drag_and_drop`

Zieht ein Element auf ein anderes Element oder zu Koordinaten. **Mobile-only.**

| Parameter        | Typ    | Erforderlich | Standard | Beschreibung                                  |
| ---------------- | ------ | ------------ | -------- | --------------------------------------------- |
| `sourceSelector` | string | ✓            | —        | Zu ziehendes Quellelement                     |
| `targetSelector` | string | —            | —        | Zielelement, auf das abgelegt wird            |
| `x`              | number | —            | —        | X-Zielversatz (ohne targetSelector)           |
| `y`              | number | —            | —        | Y-Zielversatz (ohne targetSelector)           |
| `duration`       | number | —            | —        | Dauer des Ziehens (ms, 100–5000)              |

## Kontextwechsel (Mobile)

### `get_contexts`

Gibt die verfügbaren Automatisierungskontexte sowie den aktuell aktiven Kontext zurück. Verwenden Sie dies vor `switch_context`, um `NATIVE_APP`- und `WEBVIEW_*`-Ziele zu ermitteln. **Mobile-only.**

Keine Parameter.

---

### `switch_context`

Wechselt in einer hybriden Mobile-App zwischen nativen und Webview-Automatisierungskontexten. Erforderlich, bevor CSS/XPath-Selektoren innerhalb einer eingebetteten Webview verwendet werden. **Mobile-only.**

| Parameter | Typ    | Erforderlich | Beschreibung                                                       |
| --------- | ------ | ------------ | ------------------------------------------------------------------ |
| `context` | string | ✓            | Kontextname, z. B. `"NATIVE_APP"`, `"WEBVIEW_com.example.app"`     |

Verfügbare Kontextnamen erhalten Sie über `get_contexts` oder `wdio://session/current/contexts`.

```js
// 1. Prüfen, was verfügbar ist
get_contexts()
// → { contexts: ["NATIVE_APP", "WEBVIEW_com.example.app"], currentContext: "NATIVE_APP" }

// 2. Für CSS/XPath in die Webview wechseln
switch_context({ context: "WEBVIEW_com.example.app" })

// 3. Mit Webview-Elementen über CSS-Selektoren interagieren
click_element({ selector: "#login-button" })

// 4. Für die native UI zurück zu nativ wechseln
switch_context({ context: "NATIVE_APP" })
```

## Gerätesteuerung (Mobile)

### `rotate_device`

Dreht das Gerät in Hoch- oder Querformat und wartet, bis die Drehung durch das Betriebssystem abgeschlossen ist. Verwenden Sie dies, um ausrichtungsabhängige Layouts zu testen. **Mobile-only.**

| Parameter     | Typ                         | Erforderlich | Beschreibung       |
| ------------- | --------------------------- | ------------ | ------------------ |
| `orientation` | `"PORTRAIT" \| "LANDSCAPE"` | ✓            | Zielausrichtung    |

---

### `hide_keyboard`

Blendet die Bildschirmtastatur aus. Rufen Sie dies nach einer Texteingabe auf, wenn die Tastatur Elemente verdeckt, die Sie als Nächstes benötigen. Hat keine Wirkung, wenn sie bereits ausgeblendet ist. **Mobile-only.**

Keine Parameter.

---

### `set_geolocation`

Überschreibt die GPS-Koordinaten des Geräts für die Session. Wirkt sich auf `navigator.geolocation` im Web und auf Standortdienste auf Mobilgeräten aus. Der App müssen zuvor Standortberechtigungen erteilt worden sein.

| Parameter   | Typ    | Erforderlich | Beschreibung               |
| ----------- | ------ | ------------ | -------------------------- |
| `latitude`  | number | ✓            | Breitengrad (−90 bis 90)   |
| `longitude` | number | ✓            | Längengrad (−180 bis 180)  |
| `altitude`  | number | —            | Höhe in Metern             |

## App-Lebenszyklus (Mobile)

### `get_app_state`

Gibt den aktuellen Lebenszyklus-Zustand einer Mobile-App zurück. **Mobile-only.**

| Parameter  | Typ    | Erforderlich | Beschreibung                                                          |
| ---------- | ------ | ------------ | --------------------------------------------------------------------- |
| `bundleId` | string | ✓            | iOS-Bundle-ID oder Android-Paketname, z. B. `"com.example.app"`       |

Gibt einen der folgenden Werte zurück: `not installed`, `not running`, `background (suspended)`, `background`, `foreground`.

## Browser-Hilfsprogramme

### `emulate_device`

Emuliert ein Mobil- oder Tablet-Gerät in der aktuellen Browser-Session (setzt Viewport, DPR, User-Agent, Touch-Events). Erfordert eine BiDi-fähige Session: `start_session({ capabilities: { webSocketUrl: true } })`. **Browser-only.**

| Parameter | Typ    | Erforderlich | Beschreibung                                                                                                                              |
| --------- | ------ | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `device`  | string | —            | Name der Geräte-Voreinstellung (z. B. `"iPhone 15"`, `"Pixel 7"`). Weglassen, um Voreinstellungen aufzulisten. `"reset"` übergeben, um Desktop-Standards wiederherzustellen. |

---

### `execute_script`

Führt JavaScript im Browser oder mobile Befehle über Appium aus.

| Parameter | Typ    | Erforderlich | Beschreibung                                                         |
| --------- | ------ | ------------ | -------------------------------------------------------------------- |
| `script`  | string | ✓            | JS-Code (Browser) oder Appium-Befehl wie `"mobile: pressKey"`        |
| `args`    | any[]  | —            | Argumente, die an das Skript oder den Befehl übergeben werden        |

**Browser:** Verwenden Sie `return`, um Werte zurückzuerhalten.

```javascript
// Seitentitel abrufen
execute_script({ script: "return document.title" })

// Element in den sichtbaren Bereich scrollen
execute_script({ script: "arguments[0].scrollIntoView()", args: ["#my-element"] })
```

**Mobile (Appium):** verwendet die Syntax `mobile: <command>`.

```javascript
// Android-Zurück-Taste drücken
execute_script({ script: "mobile: pressKey", args: [{ keycode: 4 }] })

// App aktivieren (iOS/Android)
execute_script({ script: "mobile: activateApp", args: [{ bundleId: "com.example.app" }] })

// Deep Link (iOS)
execute_script({ script: "mobile: deepLink", args: [{ url: "myapp://route", bundleId: "com.example.app" }] })
```

## Cloud-Anbieter

### `list_apps`

Listet Apps auf, die zu einem Cloud-Anbieter hochgeladen wurden (BrowserStack App Automate, Sauce Labs App Storage, TestMu oder TestingBot Storage). Liest anbieterspezifische Zugangsdaten aus der Umgebung.

| Parameter          | Typ                                                         | Erforderlich | Standard         | Beschreibung                                         |
| ------------------ | ----------------------------------------------------------- | ------------ | ---------------- | ---------------------------------------------------- |
| `provider`         | `"browserstack" \| "saucelabs" \| "testmu" \| "testingbot"` | ✓            | —                | Cloud-Anbieter                                       |
| `sortBy`           | `"app_name" \| "uploaded_at"`                               | —            | `"uploaded_at"`  | Sortierreihenfolge                                   |
| `organizationWide` | boolean                                                     | —            | `false`          | (Nur BrowserStack) Alle Uploads der Organisation auflisten |
| `limit`            | number                                                      | —            | `20`             | Maximale Anzahl an Ergebnissen                       |
| `region`           | `"us-west-1" \| "eu-central-1" \| "apac-southeast-1"`       | —            | `"eu-central-1"` | Sauce-Labs-Region                                    |

```js
// Alle vier Anbieter auflisten
list_apps({ provider: "browserstack" })
list_apps({ provider: "saucelabs", region: "us-west-1" })
list_apps({ provider: "testmu" })
list_apps({ provider: "testingbot" })
```

---

### `upload_app`

Lädt eine lokale `.apk` oder `.ipa` zu einem Cloud-Anbieter hoch (BrowserStack, Sauce Labs, TestMu oder TestingBot). Gibt die App-URL zur Verwendung in `start_session` zurück.

| Parameter  | Typ                                                         | Erforderlich | Standard         | Beschreibung                                                  |
| ---------- | ----------------------------------------------------------- | ------------ | ---------------- | ------------------------------------------------------------- |
| `provider` | `"browserstack" \| "saucelabs" \| "testmu" \| "testingbot"` | ✓            | —                | Cloud-Anbieter                                                |
| `path`     | string                                                      | ✓            | —                | Absoluter Pfad zur `.apk`- oder `.ipa`-Datei                  |
| `customId` | string                                                      | —            | —                | Optionale benutzerdefinierte ID, um später auf die App zu verweisen |
| `region`   | `"us-west-1" \| "eu-central-1" \| "apac-southeast-1"`       | —            | `"eu-central-1"` | Sauce-Labs-Region                                             |

```js
// Zu jedem Anbieter hochladen
upload_app({ provider: "browserstack", path: "/path/to/app.apk" })
upload_app({ provider: "saucelabs", path: "/path/to/app.ipa", region: "us-west-1" })
upload_app({ provider: "testmu", path: "/path/to/app.apk" })
upload_app({ provider: "testingbot", path: "/path/to/app.apk" })
```