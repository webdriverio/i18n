---
id: tools
title: Tools
description: "Schlagen Sie die vom WebdriverIO MCP-Server bereitgestellten Tools für Sessions, Navigation, Elementinteraktion, Screenshots, Gesten und App-Lebenszyklus nach."
---

Der WebdriverIO MCP-Server stellt 29 Tools bereit, die nach Funktion gegliedert sind. Mit **nur Browser** gekennzeichnete Tools erfordern eine Session mit `platform: "browser"`. Mit **nur Mobil** gekennzeichnete Tools erfordern `platform: "ios"` oder `platform: "android"`.

## Session-Verwaltung

### `start_session`

Startet eine neue Browser- oder Mobile-Automatisierungssession. Es ist jeweils nur eine aktive Session möglich; das Starten einer neuen Session schließt die bestehende.

| Parameter              | Typ                                                                    | Erforderlich | Standard         | Beschreibung                                                                                                                      |
| ---------------------- | ---------------------------------------------------------------------- | ------------ | ---------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `platform`             | `"browser" \| "ios" \| "android"`                                      | ✓            | —                | Plattform der Session                                                                                                             |
| `provider`             | `"local" \| "browserstack" \| "saucelabs" \| "testmu" \| "testingbot"` | —            | `"local"`        | Anbieter der Session                                                                                                              |
| `browser`              | `"chrome" \| "firefox" \| "edge" \| "safari"`                          | nur Browser  | —                | Zu startender Browser                                                                                                             |
| `browserVersion`       | string                                                                 | —            | neueste          | Browserversion (nur Cloud-Anbieter, Standard: neueste)                                                                            |
| `os`                   | string                                                                 | —            | —                | Betriebssystem (nur Cloud-Anbieter, z. B. `"Windows"`, `"OS X"`)                                                                  |
| `osVersion`            | string                                                                 | —            | —                | Betriebssystemversion (nur Cloud-Anbieter, z. B. `"11"`, `"Sequoia"`)                                                             |
| `headless`             | boolean                                                                | —            | `true`           | Browser headless ausführen                                                                                                        |
| `windowWidth`          | number                                                                 | —            | `1920`           | Breite des Browserfensters (400–3840)                                                                                             |
| `windowHeight`         | number                                                                 | —            | `1080`           | Höhe des Browserfensters (400–2160)                                                                                               |
| `navigationUrl`        | string                                                                 | —            | —                | URL, zu der nach dem Start navigiert wird                                                                                         |
| `deviceName`           | string                                                                 | nur Mobil    | —                | Name des Geräts/Emulators/Simulators                                                                                              |
| `platformVersion`      | string                                                                 | —            | —                | Betriebssystemversion (z. B. `"17.0"`, `"14"`)                                                                                    |
| `appPath`              | string                                                                 | —            | —                | Pfad zu `.app` / `.apk` / `.ipa`                                                                                                  |
| `app`                  | string                                                                 | —            | —                | App-URL (`bs://...` für BrowserStack, `storage:filename=` für Sauce Labs, `lt://...` für TestMu, TestingBot app_url) oder custom_id |
| `automationName`       | `"XCUITest" \| "UiAutomator2"`                                         | —            | auto             | Automatisierungstreiber                                                                                                           |
| `autoGrantPermissions` | boolean                                                                | —            | `true`           | App-Berechtigungen automatisch erteilen                                                                                           |
| `autoAcceptAlerts`     | boolean                                                                | —            | `true`           | Alerts automatisch akzeptieren                                                                                                    |
| `autoDismissAlerts`    | boolean                                                                | —            | `false`          | Alerts automatisch verwerfen                                                                                                      |
| `appWaitActivity`      | string                                                                 | —            | —                | Android-Activity, auf die beim Start gewartet wird                                                                                |
| `udid`                 | string                                                                 | —            | —                | UDID eines echten iOS-Geräts                                                                                                      |
| `noReset`              | boolean                                                                | —            | —                | App-Daten zwischen Sessions beibehalten                                                                                           |
| `fullReset`            | boolean                                                                | —            | —                | App vor/nach der Session deinstallieren                                                                                           |
| `newCommandTimeout`    | number                                                                 | —            | `300`            | Appium-Befehls-Timeout (Sekunden)                                                                                                 |
| `attach`               | boolean                                                                | —            | `false`          | Über CDP an ein bestehendes Chrome anhängen                                                                                       |
| `attachConfig`         | object                                                                 | —            | —                | CDP-Verbindung: `{ port: 9222, host: "localhost" }`                                                                               |
| `appiumConfig`         | object                                                                 | —            | —                | Appium-Server: `{ host, port, path }`                                                                                             |
| `tunnel`               | `boolean \| "external"`                                                | —            | `false`          | Lokales Tunnel-Routing (Cloud-Anbieter). `true` = automatischer Start, `"external"` = Tunnel läuft bereits extern                 |
| `reporting`            | object                                                                 | —            | —                | Reporting-Labels des Cloud-Anbieters: `{ project, build, session }`                                                               |
| `trace`                | boolean                                                                | —            | `false`          | Trace-Aufzeichnung aktivieren — erzeugt ein Playwright-kompatibles `.trace`-Zip                                                   |
| `region`               | `"us-west-1" \| "eu-central-1" \| "apac-southeast-1"`                  | —            | `"eu-central-1"` | Rechenzentrumsregion von Sauce Labs                                                                                               |
| `tunnelName`           | string                                                                 | —            | —                | Name des Tunnel-Bezeichners (erforderlich für `tunnel: "external"`)                                                               |
| `capabilities`         | object                                                                 | —            | —                | Zusätzliche rohe Capabilities, die zusammengeführt werden                                                                         |

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

Schließt die aktuelle Session oder trennt sich von ihr.

| Parameter | Typ     | Erforderlich | Standard | Beschreibung                                                          |
| --------- | ------- | ------------ | -------- | --------------------------------------------------------------------- |
| `detach`  | boolean | —            | `false`  | Verbindung trennen, ohne zu beenden (bewahrt den App-Zustand bei Appium) |

Mit `noReset: true` gestartete Sessions werden standardmäßig automatisch getrennt.

---

### `launch_chrome`

Bereitet eine Chrome-Instanz mit aktiviertem Remote-Debugging vor, damit sich `start_session({ attach: true })` verbinden kann. Zwei Modi:

- `newInstance` (Standard): öffnet Chrome neben Ihrer bestehenden Instanz mit einem separaten Profilverzeichnis; Ihre aktuelle Session bleibt unberührt.
- `freshSession`: startet Chrome mit einem leeren Profil (keine Cookies, keine Logins). Verwenden Sie `copyProfileFiles: true`, um Cookies und Logins zu übernehmen.

| Parameter          | Typ                               | Erforderlich | Standard        | Beschreibung                                                               |
| ------------------ | --------------------------------- | ------------ | --------------- | -------------------------------------------------------------------------- |
| `port`             | number                            | —            | `9222`          | Remote-Debugging-Port                                                      |
| `mode`             | `"newInstance" \| "freshSession"` | —            | `"newInstance"` | Startmodus                                                                 |
| `copyProfileFiles` | boolean                           | —            | `false`         | Chrome-Standardprofil (Cookies, Logins) in die Debug-Session kopieren      |

Nachdem dieses Tool erfolgreich ausgeführt wurde, rufen Sie `start_session({ platform: "browser", browser: "chrome", attach: true })` auf.

## Navigation & Tabs

### `navigate`

Lädt eine URL im aktuellen Tab und wartet auf das Page-Load-Event. Setzt den Seitenzustand (DOM, JS-Runtime) zurück. **Nur Browser.**

| Parameter | Typ    | Erforderlich | Beschreibung                    |
| --------- | ------ | ------------ | ------------------------------- |
| `url`     | string | ✓            | URL, zu der navigiert werden soll |

---

### `get_tabs`

Listet alle Browser-Tabs mit Handle, Titel, URL und dem aktiven Tab auf. Verwenden Sie dies vor `switch_tab`, um das Ziel-Handle zu finden. **Nur Browser.**

Keine Parameter.

---

### `switch_tab`

Fokussiert einen Browser-Tab anhand des Window-Handles oder eines 0-basierten Index. Alle nachfolgenden Tool-Aufrufe arbeiten auf dem neu aktiven Tab. **Nur Browser.**

| Parameter | Typ    | Erforderlich | Beschreibung                              |
| --------- | ------ | ------------ | ----------------------------------------- |
| `handle`  | string | —            | Window-Handle, zu dem gewechselt wird     |
| `index`   | number | —            | 0-basierter Tab-Index (≥ 0)               |

Geben Sie entweder `handle` oder `index` an. Handles erhalten Sie von `get_tabs` oder `wdio://session/current/tabs`.

---

### `switch_frame`

Wechselt den WebDriver-Frame-Kontext anhand eines CSS/XPath-Selektors in einen iframe oder zurück zur obersten Ebene, wenn der Selektor weggelassen wird. Änderungen bleiben bestehen; alle nachfolgenden Aufrufe von `click_element`, `set_value` und `get_elements` arbeiten innerhalb des gewechselten Frames, bis Sie zurückwechseln. Wartet bis zu 5 s auf den iframe. **Nur Browser.**

| Parameter  | Typ    | Erforderlich | Beschreibung                                                                                      |
| ---------- | ------ | ------------ | ------------------------------------------------------------------------------------------------- |
| `selector` | string | —            | CSS/XPath-Selektor für das iframe-Element. Weglassen, um zum Frame der obersten Ebene zurückzukehren. |

```js
// In einen iframe wechseln
switch_frame({ selector: "#my-iframe" })

// Mit Elementen innerhalb des iframes interagieren
click_element({ selector: "button.submit" })

// Zurück zur obersten Ebene wechseln
switch_frame()
```

## Elementinteraktion

### `click_element`

Wartet, bis ein Element existiert, scrollt es in den sichtbaren Bereich und klickt darauf. Funktioniert im Browser und auf Mobilgeräten. Unter iOS sollten Sie `tap_element` bevorzugen; `click_element` wird von der nativen Ebene manchmal ignoriert.

| Parameter      | Typ     | Erforderlich | Standard | Beschreibung                                         |
| -------------- | ------- | ------------ | -------- | ---------------------------------------------------- |
| `selector`     | string  | ✓            | —        | CSS-, XPath- oder Text-Selektor                      |
| `scrollToView` | boolean | —            | `true`   | Element vor dem Klicken in den sichtbaren Bereich scrollen |
| `timeout`      | number  | —            | —        | Maximale Wartezeit (ms)                              |

---

### `set_value`

Leert ein Input- oder Textarea-Feld und tippt den angegebenen Text ein. Ersetzt immer den vorhandenen Inhalt.

| Parameter      | Typ     | Erforderlich | Standard | Beschreibung                                        |
| -------------- | ------- | ------------ | -------- | --------------------------------------------------- |
| `selector`     | string  | ✓            | —        | CSS-, XPath- oder Text-Selektor                     |
| `value`        | string  | ✓            | —        | Einzugebender Text                                  |
| `scrollToView` | boolean | —            | `true`   | Element vor dem Tippen in den sichtbaren Bereich scrollen |
| `timeout`      | number  | —            | —        | Maximale Wartezeit (ms)                             |

---

### `scroll`

Scrollt die Seite um eine Anzahl von Pixeln. **Nur Browser.** Verwenden Sie auf Mobilgeräten `swipe`.

| Parameter   | Typ              | Erforderlich | Standard | Beschreibung          |
| ----------- | ---------------- | ------------ | -------- | --------------------- |
| `direction` | `"up" \| "down"` | ✓            | —        | Scrollrichtung        |
| `pixels`    | number           | —            | `500`    | Zu scrollende Pixel   |

## Elementanalyse

### `get_elements`

Gibt interagierbare Elemente auf der aktuellen Seite mit sofort verwendbaren Selektoren zurück. Bevorzugen Sie die Ressource `wdio://session/current/elements` für ein allgemeines Kontextbewusstsein; verwenden Sie dieses Tool, wenn Sie Filterung oder Paginierung benötigen.

| Parameter           | Typ     | Erforderlich | Standard | Beschreibung                                         |
| ------------------- | ------- | ------------ | -------- | ---------------------------------------------------- |
| `inViewportOnly`    | boolean | —            | `false`  | Nur im Viewport sichtbare Elemente zurückgeben       |
| `includeContainers` | boolean | —            | `false`  | Container-Elemente (divs, sections) einschließen     |
| `includeBounds`     | boolean | —            | `false`  | Koordinaten der Bounding Box einschließen            |
| `limit`             | number  | —            | `0`      | Maximale Anzahl zurückgegebener Elemente (0 = unbegrenzt) |
| `offset`            | number  | —            | `0`      | Zu überspringende Elemente (Paginierung)             |

---

### `get_accessibility_tree`

Gibt den Accessibility-Tree der Seite mit Rollen, Namen und Selektoren zurück. Unterstützt Filterung und Paginierung. **Nur Browser.**

| Parameter | Typ      | Erforderlich | Standard | Beschreibung                                                     |
| --------- | -------- | ------------ | -------- | ---------------------------------------------------------------- |
| `limit`   | number   | —            | `0`      | Maximale Anzahl zurückgegebener Knoten (0 = unbegrenzt)          |
| `offset`  | number   | —            | `0`      | Zu überspringende Knoten (Paginierung)                           |
| `roles`   | string[] | —            | —        | Nach ARIA-Rollen filtern, z. B. `["button", "link", "heading"]`  |

## Screenshots

### `get_screenshot`

Erstellt einen Screenshot der aktuellen Seite bzw. des Bildschirms. Gibt ein base64-kodiertes Bild zurück, das automatisch verkleinert und komprimiert wird, um innerhalb der Kontextgrenzen des Modells zu bleiben (max. 1 MB, max. 2000px).

Keine Parameter. Bevorzugen Sie für die Elementerkennung `wdio://session/current/elements` gegenüber Screenshots; das ist schneller und verbraucht deutlich weniger Tokens. Verwenden Sie Screenshots zur visuellen Überprüfung oder zum Debuggen von Layouts.

## Cookie-Verwaltung

### `get_cookies`

Gibt alle Cookies der aktuellen Session oder ein einzelnes Cookie anhand des Namens zurück. **Nur Browser.**

| Parameter | Typ    | Erforderlich | Beschreibung                                        |
| --------- | ------ | ------------ | --------------------------------------------------- |
| `name`    | string | —            | Cookie-Name. Weglassen, um alle Cookies zurückzugeben. |

---

### `set_cookie`

Setzt ein Browser-Cookie. Der Browser muss sich bereits auf der Ziel-Domain befinden — Cookies können nicht domainübergreifend gesetzt werden. Verwenden Sie dies, um Session-Tokens oder Feature-Flags einzuschleusen, ohne Login-Abläufe durchlaufen zu müssen. **Nur Browser.**

| Parameter  | Typ                           | Erforderlich | Beschreibung                                        |
| ---------- | ----------------------------- | ------------ | --------------------------------------------------- |
| `name`     | string                        | ✓            | Cookie-Name                                         |
| `value`    | string                        | ✓            | Cookie-Wert                                         |
| `domain`   | string                        | —            | Cookie-Domain (Standard: aktuelle Domain)           |
| `path`     | string                        | —            | Cookie-Pfad (Standard: `/`)                         |
| `expiry`   | number                        | —            | Ablaufzeitpunkt als Unix-Timestamp (Sekunden)       |
| `httpOnly` | boolean                       | —            | HttpOnly-Flag                                       |
| `secure`   | boolean                       | —            | Secure-Flag                                         |
| `sameSite` | `"strict" \| "lax" \| "none"` | —            | SameSite-Attribut                                   |

---

### `delete_cookies`

Löscht alle Cookies oder ein bestimmtes Cookie anhand des Namens. **Nur Browser.**

| Parameter | Typ    | Erforderlich | Beschreibung                                                   |
| --------- | ------ | ------------ | -------------------------------------------------------------- |
| `name`    | string | —            | Name des zu löschenden Cookies. Weglassen, um alle Cookies zu löschen. |

## Touch-Gesten (Mobil)

### `tap_element`

Ruft `element.tap()` für ein gefundenes Element auf oder tippt auf absolute Bildschirmkoordinaten. Verwenden Sie dies unter iOS, wenn `click_element` ignoriert wird; Tippen ist die native Geste, auf die iOS reagiert. **Nur Mobil.**

| Parameter  | Typ    | Erforderlich | Beschreibung                                         |
| ---------- | ------ | ------------ | ---------------------------------------------------- |
| `selector` | string | —            | Element-Selektor                                     |
| `x`        | number | —            | X-Koordinate für das Tippen (falls kein Selektor)    |
| `y`        | number | —            | Y-Koordinate für das Tippen (falls kein Selektor)    |

Geben Sie entweder `selector` oder `x`/`y`-Koordinaten an.

---

### `swipe`

Führt eine bildschirmfüllende Wischgeste aus. Die Richtung ist die Bewegungsrichtung des Inhalts (z. B. scrollt `"up"` eine Liste nach oben). Verwenden Sie dies zum Scrollen über die sichtbaren Grenzen hinaus. Um ein bestimmtes Element zu verschieben, verwenden Sie `drag_and_drop`. **Nur Mobil.** Verwenden Sie in Browsern `scroll`.

| Parameter   | Typ                                   | Erforderlich | Standard       | Beschreibung                                   |
| ----------- | ------------------------------------- | ------------ | -------------- | ---------------------------------------------- |
| `direction` | `"up" \| "down" \| "left" \| "right"` | ✓            | —              | Wischrichtung                                  |
| `duration`  | number                                | —            | `500`          | Wischdauer (ms, 100–5000)                      |
| `percent`   | number                                | —            | `0.5` / `0.95` | Anteil des Bildschirms, der gewischt wird (0–1) |

---

### `drag_and_drop`

Zieht ein Element auf ein anderes Element oder auf Koordinaten. **Nur Mobil.**

| Parameter        | Typ    | Erforderlich | Standard | Beschreibung                                    |
| ---------------- | ------ | ------------ | -------- | ----------------------------------------------- |
| `sourceSelector` | string | ✓            | —        | Zu ziehendes Quellelement                       |
| `targetSelector` | string | —            | —        | Zielelement, auf dem abgelegt wird              |
| `x`              | number | —            | —        | X-Offset des Ziels (falls kein targetSelector)  |
| `y`              | number | —            | —        | Y-Offset des Ziels (falls kein targetSelector)  |
| `duration`       | number | —            | —        | Ziehdauer (ms, 100–5000)                        |

## Kontextwechsel (Mobil)

### `get_contexts`

Gibt die verfügbaren Automatisierungskontexte und den aktuell aktiven Kontext zurück. Verwenden Sie dies vor `switch_context`, um `NATIVE_APP`- und `WEBVIEW_*`-Ziele zu ermitteln. **Nur Mobil.**

Keine Parameter.

---

### `switch_context`

Wechselt in einer hybriden Mobile-App zwischen nativen und Webview-Automatisierungskontexten. Erforderlich, bevor CSS/XPath-Selektoren innerhalb einer eingebetteten Webview verwendet werden. **Nur Mobil.**

| Parameter | Typ    | Erforderlich | Beschreibung                                                     |
| --------- | ------ | ------------ | ---------------------------------------------------------------- |
| `context` | string | ✓            | Kontextname, z. B. `"NATIVE_APP"`, `"WEBVIEW_com.example.app"`   |

Verfügbare Kontextnamen erhalten Sie von `get_contexts` oder `wdio://session/current/contexts`.

```js
// 1. Prüfen, was verfügbar ist
get_contexts()
// → { contexts: ["NATIVE_APP", "WEBVIEW_com.example.app"], currentContext: "NATIVE_APP" }

// 2. Für CSS/XPath in die Webview wechseln
switch_context({ context: "WEBVIEW_com.example.app" })

// 3. Mit Webview-Elementen über CSS-Selektoren interagieren
click_element({ selector: "#login-button" })

// 4. Für native UI zurück zum nativen Kontext wechseln
switch_context({ context: "NATIVE_APP" })
```

## Gerätesteuerung (Mobil)

### `rotate_device`

Dreht das Gerät in das Hoch- oder Querformat und wartet, bis die Drehung durch das Betriebssystem abgeschlossen ist. Verwenden Sie dies, um ausrichtungsabhängige Layouts zu testen. **Nur Mobil.**

| Parameter     | Typ                         | Erforderlich | Beschreibung       |
| ------------- | --------------------------- | ------------ | ------------------ |
| `orientation` | `"PORTRAIT" \| "LANDSCAPE"` | ✓            | Zielausrichtung    |

---

### `hide_keyboard`

Blendet die Bildschirmtastatur aus. Rufen Sie dies nach einer Texteingabe auf, wenn die Tastatur Elemente verdeckt, die Sie als Nächstes benötigen. Hat keine Wirkung, wenn die Tastatur bereits ausgeblendet ist. **Nur Mobil.**

Keine Parameter.

---

### `set_geolocation`

Überschreibt die GPS-Koordinaten des Geräts für die Session. Wirkt sich auf `navigator.geolocation` im Web und auf Standortdienste auf Mobilgeräten aus. Der App müssen vorher Standortberechtigungen erteilt worden sein.

| Parameter   | Typ    | Erforderlich | Beschreibung                  |
| ----------- | ------ | ------------ | ----------------------------- |
| `latitude`  | number | ✓            | Breitengrad (−90 bis 90)      |
| `longitude` | number | ✓            | Längengrad (−180 bis 180)     |
| `altitude`  | number | —            | Höhe in Metern                |

## App-Lebenszyklus (Mobil)

### `get_app_state`

Gibt den aktuellen Lebenszyklusstatus einer Mobile-App zurück. **Nur Mobil.**

| Parameter  | Typ    | Erforderlich | Beschreibung                                                          |
| ---------- | ------ | ------------ | --------------------------------------------------------------------- |
| `bundleId` | string | ✓            | iOS-Bundle-ID oder Android-Paketname, z. B. `"com.example.app"`       |

Gibt einen der folgenden Werte zurück: `not installed`, `not running`, `background (suspended)`, `background`, `foreground`.

## Browser-Hilfsmittel

### `emulate_device`

Emuliert ein Mobil- oder Tablet-Gerät in der aktuellen Browser-Session (setzt Viewport, DPR, User-Agent, Touch-Events). Erfordert eine BiDi-fähige Session: `start_session({ capabilities: { webSocketUrl: true } })`. **Nur Browser.**

| Parameter | Typ    | Erforderlich | Beschreibung                                                                                                                                  |
| --------- | ------ | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `device`  | string | —            | Name der Geräte-Voreinstellung (z. B. `"iPhone 15"`, `"Pixel 7"`). Weglassen, um Voreinstellungen aufzulisten. `"reset"` übergeben, um die Desktop-Standardwerte wiederherzustellen. |

---

### `execute_script`

Führt JavaScript im Browser oder mobile Befehle über Appium aus.

| Parameter | Typ    | Erforderlich | Beschreibung                                                       |
| --------- | ------ | ------------ | ------------------------------------------------------------------ |
| `script`  | string | ✓            | JS-Code (Browser) oder Appium-Befehl wie `"mobile: pressKey"`      |
| `args`    | any[]  | —            | An das Skript oder den Befehl übergebene Argumente                 |

**Browser:** Verwenden Sie `return`, um Werte zurückzuerhalten.

```javascript
// Seitentitel abrufen
execute_script({ script: "return document.title" })

// Element in den sichtbaren Bereich scrollen
execute_script({ script: "arguments[0].scrollIntoView()", args: ["#my-element"] })
```

**Mobil (Appium):** verwendet die Syntax `mobile: <command>`.

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

| Parameter          | Typ                                                         | Erforderlich | Standard         | Beschreibung                                              |
| ------------------ | ----------------------------------------------------------- | ------------ | ---------------- | --------------------------------------------------------- |
| `provider`         | `"browserstack" \| "saucelabs" \| "testmu" \| "testingbot"` | ✓            | —                | Cloud-Anbieter                                            |
| `sortBy`           | `"app_name" \| "uploaded_at"`                               | —            | `"uploaded_at"`  | Sortierreihenfolge                                        |
| `organizationWide` | boolean                                                     | —            | `false`          | (Nur BrowserStack) Alle Uploads der Organisation auflisten |
| `limit`            | number                                                      | —            | `20`             | Maximale Anzahl an Ergebnissen                            |
| `region`           | `"us-west-1" \| "eu-central-1" \| "apac-southeast-1"`       | —            | `"eu-central-1"` | Sauce-Labs-Region                                         |

```js
// Alle vier Anbieter auflisten
list_apps({ provider: "browserstack" })
list_apps({ provider: "saucelabs", region: "us-west-1" })
list_apps({ provider: "testmu" })
list_apps({ provider: "testingbot" })
```

---

### `upload_app`

Lädt eine lokale `.apk`- oder `.ipa`-Datei zu einem Cloud-Anbieter hoch (BrowserStack, Sauce Labs, TestMu oder TestingBot). Gibt die App-URL zur Verwendung in `start_session` zurück.

| Parameter  | Typ                                                         | Erforderlich | Standard         | Beschreibung                                                     |
| ---------- | ----------------------------------------------------------- | ------------ | ---------------- | ---------------------------------------------------------------- |
| `provider` | `"browserstack" \| "saucelabs" \| "testmu" \| "testingbot"` | ✓            | —                | Cloud-Anbieter                                                   |
| `path`     | string                                                      | ✓            | —                | Absoluter Pfad zur `.apk`- oder `.ipa`-Datei                     |
| `customId` | string                                                      | —            | —                | Optionale benutzerdefinierte ID, um später auf die App zu verweisen |
| `region`   | `"us-west-1" \| "eu-central-1" \| "apac-southeast-1"`       | —            | `"eu-central-1"` | Sauce-Labs-Region                                                |

```js
// Zu jedem Anbieter hochladen
upload_app({ provider: "browserstack", path: "/path/to/app.apk" })
upload_app({ provider: "saucelabs", path: "/path/to/app.ipa", region: "us-west-1" })
upload_app({ provider: "testmu", path: "/path/to/app.apk" })
upload_app({ provider: "testingbot", path: "/path/to/app.apk" })
```