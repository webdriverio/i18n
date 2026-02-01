---
id: tools
title: Werkzeuge
---

Die folgenden Werkzeuge stehen über den WebdriverIO MCP-Server zur Verfügung. Diese Werkzeuge ermöglichen es KI-Assistenten, Browser und mobile Anwendungen zu automatisieren.

## Session-Management

### `start_browser`

Startet eine Chrome-Browser-Sitzung.

#### Parameter

| Parameter | Typ | Erforderlich | Standard | Beschreibung |
|-----------|------|-----------|---------|-------------|
| `headless` | boolean | Nein | `false` | Chrome im Headless-Modus ausführen |
| `windowWidth` | number | Nein | `1920` | Browserbreite (400-3840) |
| `windowHeight` | number | Nein | `1080` | Browserhöhe (400-2160) |
| `navigationUrl` | string | Nein | - | URL, zu der nach dem Start des Browsers navigiert werden soll |

#### Beispiel

```
Start a browser with 1920x1080 resolution and navigate to webdriver.io
```

#### Unterstützung

- Desktop-Browser

---

### `start_app_session`

Startet eine mobile App-Sitzung auf iOS oder Android über Appium.

#### Parameter

| Parameter | Typ | Erforderlich | Standard | Beschreibung |
|-----------|------|-----------|---------|-------------|
| `platform` | string | Ja | - | Zu automatisierende Plattform: `iOS` oder `Android` |
| `deviceName` | string | Ja | - | Name des Geräts oder Simulators/Emulators |
| `appPath` | string | Nein* | - | Pfad zur App-Datei (.app, .ipa oder .apk) |
| `platformVersion` | string | Nein | - | Betriebssystemversion (z.B. `17.0`, `14`) |
| `automationName` | string | Nein | Auto | `XCUITest` (iOS), `UiAutomator2` oder `Espresso` (Android) |
| `udid` | string | Nein | - | Eindeutige Gerätekennung (erforderlich für echte iOS-Geräte) |
| `noReset` | boolean | Nein | `false` | App-Status zwischen Sitzungen beibehalten |
| `fullReset` | boolean | Nein | `true` | App vor der Sitzung deinstallieren und neu installieren |
| `autoGrantPermissions` | boolean | Nein | `true` | App-Berechtigungen automatisch gewähren |
| `autoAcceptAlerts` | boolean | Nein | `true` | Systembenachrichtigungen automatisch akzeptieren |
| `autoDismissAlerts` | boolean | Nein | `false` | Benachrichtigungen ablehnen (statt akzeptieren) |
| `appWaitActivity` | string | Nein | - | Activity, auf die beim Start gewartet werden soll (nur Android) |
| `newCommandTimeout` | number | Nein | `60` | Sekunden bis zum Timeout der Sitzung bei Inaktivität |
| `appiumHost` | string | Nein | `127.0.0.1` | Appium-Server-Hostname |
| `appiumPort` | number | Nein | `4723` | Appium-Server-Port |
| `appiumPath` | string | Nein | `/` | Appium-Server-Pfad |

*Entweder muss `appPath` angegeben werden oder `noReset: true`, um eine Verbindung zu einer bereits laufenden App herzustellen.

#### Beispiel

```
Start an iOS app session on iPhone 15 simulator with my app at /path/to/app.app
```

#### Unterstützung

- iOS-Simulatoren
- Echte iOS-Geräte
- Android-Emulatoren
- Echte Android-Geräte

---

### `close_session`

Schließt die aktuelle Browser- oder App-Sitzung.

#### Parameter

| Parameter | Typ | Erforderlich | Standard | Beschreibung |
|-----------|------|-----------|---------|-------------|
| `detach` | boolean | Nein | `false` | Von der Sitzung trennen, statt sie zu schließen (Browser/App bleibt geöffnet) |

#### Hinweise

Sitzungen mit `noReset: true` oder ohne `appPath` werden beim Schließen automatisch getrennt, um den Status beizubehalten.

#### Unterstützung

- Desktop-Browser
- Mobile Apps

---

## Navigation

### `navigate`

Navigiert zu einer URL.

#### Parameter

| Parameter | Typ | Erforderlich | Beschreibung |
|-----------|------|-----------|-------------|
| `url` | string | Ja | Die URL, zu der navigiert werden soll |

#### Beispiel

```
Navigate to https://webdriver.io
```

#### Unterstützung

- Desktop-Browser

---

## Element-Interaktion

### `click_element`

Klickt auf ein Element, das durch einen Selektor identifiziert wird.

#### Parameter

| Parameter | Typ | Erforderlich | Standard | Beschreibung |
|-----------|------|-----------|---------|-------------|
| `selector` | string | Ja | - | CSS-Selektor, XPath oder mobiler Selektor |
| `scrollToView` | boolean | Nein | `true` | Element vor dem Klicken in den sichtbaren Bereich scrollen |
| `timeout` | number | Nein | `3000` | Maximale Wartezeit für das Element (ms) |

#### Hinweise

- Unterstützt WebdriverIO-Textselektoren: `button=Exakter Text` oder `a*=Enthaltener Text`
- Verwendet Zentrierung für die Scrollposition

#### Beispiel

```
Click the element with selector "#submit-button"
```

#### Unterstützung

- Desktop-Browser
- Mobile Native Apps

---

### `set_value`

Gibt Text in ein Eingabefeld ein.

#### Parameter

| Parameter | Typ | Erforderlich | Standard | Beschreibung |
|-----------|------|-----------|---------|-------------|
| `selector` | string | Ja | - | Selektor für das Eingabeelement |
| `value` | string | Ja | - | Einzugebender Text |
| `scrollToView` | boolean | Nein | `true` | Element vor der Eingabe in den sichtbaren Bereich scrollen |
| `timeout` | number | Nein | `3000` | Maximale Wartezeit für das Element (ms) |

#### Hinweise

Löscht den vorhandenen Wert, bevor neuer Text eingegeben wird.

#### Beispiel

```
Set the value "john@example.com" in the element with selector "#email"
```

#### Unterstützung

- Desktop-Browser
- Mobile Native Apps

---

## Seitenanalyse

### `get_visible_elements`

Ermittelt sichtbare und interaktive Elemente auf der aktuellen Seite oder dem Bildschirm. Dies ist das primäre Werkzeug, um zu erkennen, welche Elemente für Interaktionen verfügbar sind.

#### Parameter

| Parameter | Typ | Erforderlich | Standard | Beschreibung |
|-----------|------|-----------|---------|-------------|
| `elementType` | string | Nein | `interactable` | Elementtyp: `interactable` (Buttons/Links/Inputs), `visual` (Bilder/SVGs) oder `all` |
| `inViewportOnly` | boolean | Nein | `true` | Nur Elemente zurückgeben, die im Viewport sichtbar sind |
| `includeContainers` | boolean | Nein | `false` | Layout-Container einschließen (ViewGroup, ScrollView, etc.) |
| `includeBounds` | boolean | Nein | `false` | Elementkoordinaten einschließen (x, y, Breite, Höhe) |
| `limit` | number | Nein | `0` | Maximale Anzahl zurückzugebender Elemente (0 = unbegrenzt) |
| `offset` | number | Nein | `0` | Anzahl zu überspringender Elemente (für Paginierung) |

#### Rückgabe

```json
{
  "total": 42,
  "showing": 20,
  "hasMore": true,
  "elements": [...]
}
```

**Web-Elemente enthalten:** tagName, type, id, className, textContent, value, placeholder, href, ariaLabel, role, cssSelector, isInViewport

**Mobile Elemente enthalten:** Mehrere Locator-Strategien (Accessibility ID, Resource ID, XPath, UiAutomator/Predicates), Elementtyp, Text und optional Begrenzungen

#### Hinweise

- **Web**: Verwendet ein optimiertes Browserscript für schnelle Elementerkennung
- **Mobile**: Verwendet effiziente XML-Seitenquellenanalyse (2 HTTP-Aufrufe vs. 600+ für Elementabfragen)
- Verwenden Sie Paginierung (`limit` und `offset`) für große Seiten, um den Token-Verbrauch zu reduzieren

#### Beispiel

```
Get all visible elements on the page with their coordinates
```

#### Unterstützung

- Desktop-Browser
- Mobile Apps

---

### `get_accessibility`

Ruft den Accessibility-Baum der aktuellen Seite mit semantischen Informationen zu Rollen, Namen und Status ab.

#### Parameter

| Parameter | Typ | Erforderlich | Standard | Beschreibung |
|-----------|------|-----------|---------|-------------|
| `limit` | number | Nein | `100` | Maximale Anzahl zurückzugebender Knoten (0 = unbegrenzt) |
| `offset` | number | Nein | `0` | Anzahl zu überspringender Knoten (für Paginierung) |
| `roles` | string[] | Nein | Alle | Filter für bestimmte Rollen (z.B. `["button", "link", "textbox"]`) |
| `namedOnly` | boolean | Nein | `true` | Nur Knoten mit Namen/Label zurückgeben |

#### Rückgabe

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

#### Hinweise

- Nur für Browser. Für mobile Apps verwenden Sie stattdessen `get_visible_elements`
- Nützlich, wenn `get_visible_elements` nicht die erwarteten Elemente zurückgibt
- `namedOnly: true` filtert anonyme Container heraus und reduziert Störsignale

#### Unterstützung

- Desktop-Browser

---

## Screenshots

### `take_screenshot`

Macht einen Screenshot des aktuellen Viewports.

#### Parameter

| Parameter | Typ | Erforderlich | Beschreibung |
|-----------|------|-----------|-------------|
| `outputPath` | string | Nein | Pfad zum Speichern der Screenshot-Datei. Wenn nicht angegeben, werden Base64-Daten zurückgegeben |

#### Rückgabe

Base64-codierte Bilddaten (PNG oder JPEG) mit Größeninformationen.

#### Hinweise

Screenshots werden automatisch optimiert:
- Maximale Dimension: 2000px (wird bei größeren Bildern herunterskaliert)
- Maximale Dateigröße: 1MB
- Format: PNG mit maximaler Komprimierung oder JPEG, wenn nötig, um das Größenlimit einzuhalten

#### Unterstützung

- Desktop-Browser
- Mobile Apps

---

## Scrollen

### `scroll`

Scrollt die Seite um eine bestimmte Anzahl von Pixeln nach oben oder unten.

#### Parameter

| Parameter | Typ | Erforderlich | Standard | Beschreibung |
|-----------|------|-----------|---------|-------------|
| `direction` | string | Ja | - | Scrollrichtung: `up` oder `down` |
| `pixels` | number | Nein | `500` | Anzahl der zu scrollenden Pixel |

#### Hinweise

Nur für Browser. Verwenden Sie für mobiles Scrollen stattdessen das `swipe`-Tool.

#### Unterstützung

- Desktop-Browser

---

## Cookie-Management

### `get_cookies`

Ruft Cookies aus der aktuellen Sitzung ab.

#### Parameter

| Parameter | Typ | Erforderlich | Beschreibung |
|-----------|------|-----------|-------------|
| `name` | string | Nein | Bestimmter Cookie-Name, der abgerufen werden soll (weglassen für alle Cookies) |

#### Rückgabe

Cookie-Objekte mit name, value, domain, path, expiry, secure und httpOnly-Eigenschaften.

#### Unterstützung

- Desktop-Browser

---

### `set_cookie`

Setzt einen Cookie in der aktuellen Sitzung.

#### Parameter

| Parameter | Typ | Erforderlich | Standard | Beschreibung |
|-----------|------|-----------|---------|-------------|
| `name` | string | Ja | - | Cookie-Name |
| `value` | string | Ja | - | Cookie-Wert |
| `domain` | string | Nein | Aktuelle | Cookie-Domain |
| `path` | string | Nein | `/` | Cookie-Pfad |
| `expiry` | number | Nein | - | Ablauf als Unix-Zeitstempel (Sekunden) |
| `secure` | boolean | Nein | - | Secure-Flag |
| `httpOnly` | boolean | Nein | - | HttpOnly-Flag |
| `sameSite` | string | Nein | - | SameSite-Attribut: `strict`, `lax` oder `none` |

#### Unterstützung

- Desktop-Browser

---

### `delete_cookies`

Löscht Cookies aus der aktuellen Sitzung.

#### Parameter

| Parameter | Typ | Erforderlich | Beschreibung |
|-----------|------|-----------|-------------|
| `name` | string | Nein | Bestimmter Cookie-Name, der gelöscht werden soll (weglassen, um alle zu löschen) |

#### Unterstützung

- Desktop-Browser

---

## Touch-Gesten (Mobil)

### `tap_element`

Tippt auf ein Element oder Bildschirmkoordinaten.

#### Parameter

| Parameter | Typ | Erforderlich | Beschreibung |
|-----------|------|-----------|-------------|
| `selector` | string | Nein* | Selektor für das Element, auf das getippt werden soll |
| `x` | number | Nein* | X-Koordinate für den Tipp |
| `y` | number | Nein* | Y-Koordinate für den Tipp |

*Entweder `selector` oder sowohl `x` als auch `y` sind erforderlich.

#### Unterstützung

- Mobile Apps

---

### `swipe`

Führt eine Wischgeste in die angegebene Richtung aus.

#### Parameter

| Parameter | Typ | Erforderlich | Standard | Beschreibung |
|-----------|------|-----------|---------|-------------|
| `direction` | string | Ja | - | Wischrichtung: `up`, `down`, `left`, `right` |
| `duration` | number | Nein | `500` | Wischdauer in Millisekunden (100-5000) |
| `percent` | number | Nein | 0,5/0,95 | Prozentsatz des Bildschirms, der gewischt werden soll (0-1) |

#### Hinweise

- Standard-Prozentsatz: 0,5 für vertikales Wischen, 0,95 für horizontales Wischen
- Richtung gibt die Inhaltsbewegung an: "Wischen nach oben" scrollt den Inhalt nach oben

#### Beispiel

```
Swipe up to scroll down the screen
```

#### Unterstützung

- Mobile Apps

---

### `drag_and_drop`

Zieht ein Element zu einem anderen Element oder zu Koordinaten.

#### Parameter

| Parameter | Typ | Erforderlich | Beschreibung |
|-----------|------|-----------|-------------|
| `sourceSelector` | string | Ja | Quell-Element-Selektor zum Ziehen |
| `targetSelector` | string | Nein* | Ziel-Element-Selektor zum Ablegen |
| `x` | number | Nein* | Ziel-X-Offset (wenn kein targetSelector) |
| `y` | number | Nein* | Ziel-Y-Offset (wenn kein targetSelector) |
| `duration` | number | Nein | Standard | Zugdauer in Millisekunden (100-5000) |

*Entweder `targetSelector` oder sowohl `x` als auch `y` sind erforderlich.

#### Unterstützung

- Mobile Apps

---

## App-Lebenszyklus (Mobil)

### `get_app_state`

Ruft den aktuellen Status einer App ab.

#### Parameter

| Parameter | Typ | Erforderlich | Beschreibung |
|-----------|------|-----------|-------------|
| `bundleId` | string | Ja | App-Kennung (Bundle-ID für iOS, Paketname für Android) |

#### Rückgabe

App-Status: `not installed`, `not running`, `running in background (suspended)`, `running in background` oder `running in foreground`.

#### Unterstützung

- Mobile Apps

---

## Kontextwechsel (Hybrid-Apps)

### `get_contexts`

Listet alle verfügbaren Kontexte auf (nativ und Webviews).

#### Parameter

Keine

#### Rückgabe

Array von Kontextnamen (z.B. `["NATIVE_APP", "WEBVIEW_com.example.app"]`).

#### Unterstützung

- Mobile Hybrid-Apps

---

### `get_current_context`

Ruft den aktuell aktiven Kontext ab.

#### Parameter

Keine

#### Rückgabe

Aktueller Kontextname (z.B. `NATIVE_APP` oder `WEBVIEW_*`).

#### Unterstützung

- Mobile Hybrid-Apps

---

### `switch_context`

Wechselt zwischen nativen und Webview-Kontexten.

#### Parameter

| Parameter | Typ | Erforderlich | Beschreibung |
|-----------|------|-----------|-------------|
| `context` | string | Ja | Kontextname oder Index (1-basiert) aus `get_contexts` |

#### Beispiel

```
Switch to the WEBVIEW_com.example.app context
```

#### Unterstützung

- Mobile Hybrid-Apps

---

## Gerätesteuerung (Mobil)

### `rotate_device`

Dreht das Gerät in eine bestimmte Ausrichtung.

#### Parameter

| Parameter | Typ | Erforderlich | Beschreibung |
|-----------|------|-----------|-------------|
| `orientation` | string | Ja | `PORTRAIT` oder `LANDSCAPE` |

#### Unterstützung

- Mobile Apps

---

### `hide_keyboard`

Blendet die Bildschirmtastatur aus.

#### Parameter

Keine

#### Unterstützung

- Mobile Apps

---

### `get_geolocation`

Ruft die aktuellen GPS-Koordinaten ab.

#### Parameter

Keine

#### Rückgabe

Objekt mit `latitude`, `longitude` und `altitude`.

#### Unterstützung

- Mobile Apps

---

### `set_geolocation`

Setzt die GPS-Koordinaten des Geräts.

#### Parameter

| Parameter | Typ | Erforderlich | Beschreibung |
|-----------|------|-----------|-------------|
| `latitude` | number | Ja | Breitengrad (-90 bis 90) |
| `longitude` | number | Ja | Längengrad (-180 bis 180) |
| `altitude` | number | Nein | Höhe in Metern |

#### Beispiel

```
Set geolocation to San Francisco (37.7749, -122.4194)
```

#### Unterstützung

- Mobile Apps

---

## Skriptausführung

### `execute_script`

Führt JavaScript im Browser oder mobile Befehle über Appium aus.

#### Parameter

| Parameter | Typ | Erforderlich | Beschreibung |
|-----------|------|-----------|-------------|
| `script` | string | Ja | JavaScript-Code (Browser) oder mobiler Befehl (z.B. `mobile: pressKey`) |
| `args` | array | Nein | Argumente für das Skript |

#### Browser-Beispiele

```javascript
// Get page title
execute_script({ script: "return document.title" })

// Get scroll position
execute_script({ script: "return window.scrollY" })

// Click element by selector
execute_script({ script: "arguments[0].click()", args: ["#myButton"] })
```

#### Mobile (Appium) Beispiele

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

#### Häufige Android-Keycodes

| Taste | Code |
|-----|------|
| BACK | 4 |
| HOME | 3 |
| ENTER | 66 |
| MENU | 82 |
| SEARCH | 84 |

#### Weitere Mobile-Befehle

Eine vollständige Liste der verfügbaren Appium Mobile-Befehle finden Sie unter:
- [XCUITest Mobile Commands](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/) (iOS)
- [UiAutomator2 Mobile Commands](https://github.com/appium/appium-uiautomator2-driver#mobile-commands) (Android)

#### Unterstützung

- Desktop-Browser
- Mobile Apps (über Appium Mobile-Befehle)