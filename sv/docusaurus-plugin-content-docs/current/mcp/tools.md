---
id: tools
title: Verktyg
description: "Slå upp de verktyg som WebdriverIO MCP-servern exponerar för sessioner, navigering, elementinteraktion, skärmbilder, gester och appens livscykel."
---

WebdriverIO MCP-servern exponerar 29 verktyg, ordnade efter funktion. Verktyg markerade med **endast webbläsare** kräver en session med `platform: "browser"`. Verktyg markerade med **endast mobil** kräver `platform: "ios"` eller `platform: "android"`.

## Sessionshantering

### `start_session`

Startar en ny automatiseringssession för webbläsare eller mobil. Endast en session kan vara aktiv åt gången; om du startar en ny stängs den befintliga.

| Parameter              | Typ                                                                    | Obligatorisk     | Standard         | Beskrivning                                                                                                                       |
| ---------------------- | ---------------------------------------------------------------------- | ---------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `platform`             | `"browser" \| "ios" \| "android"`                                      | ✓                | —                | Sessionens plattform                                                                                                              |
| `provider`             | `"local" \| "browserstack" \| "saucelabs" \| "testmu" \| "testingbot"` | —                | `"local"`        | Sessionsleverantör                                                                                                                |
| `browser`              | `"chrome" \| "firefox" \| "edge" \| "safari"`                          | endast webbläsare | —               | Webbläsare som ska startas                                                                                                        |
| `browserVersion`       | string                                                                 | —                | senaste          | Webbläsarversion (endast molnleverantörer, standard: senaste)                                                                     |
| `os`                   | string                                                                 | —                | —                | Operativsystem (endast molnleverantörer, t.ex. `"Windows"`, `"OS X"`)                                                             |
| `osVersion`            | string                                                                 | —                | —                | OS-version (endast molnleverantörer, t.ex. `"11"`, `"Sequoia"`)                                                                   |
| `headless`             | boolean                                                                | —                | `true`           | Kör webbläsaren headless                                                                                                          |
| `windowWidth`          | number                                                                 | —                | `1920`           | Webbläsarfönstrets bredd (400–3840)                                                                                               |
| `windowHeight`         | number                                                                 | —                | `1080`           | Webbläsarfönstrets höjd (400–2160)                                                                                                |
| `navigationUrl`        | string                                                                 | —                | —                | URL att navigera till efter start                                                                                                 |
| `deviceName`           | string                                                                 | endast mobil     | —                | Namn på enhet/emulator/simulator                                                                                                  |
| `platformVersion`      | string                                                                 | —                | —                | OS-version (t.ex. `"17.0"`, `"14"`)                                                                                               |
| `appPath`              | string                                                                 | —                | —                | Sökväg till `.app` / `.apk` / `.ipa`                                                                                              |
| `app`                  | string                                                                 | —                | —                | App-URL (`bs://...` för BrowserStack, `storage:filename=` för Sauce Labs, `lt://...` för TestMu, TestingBot app_url) eller custom_id |
| `automationName`       | `"XCUITest" \| "UiAutomator2"`                                         | —                | auto             | Automatiseringsdrivrutin                                                                                                          |
| `autoGrantPermissions` | boolean                                                                | —                | `true`           | Bevilja appbehörigheter automatiskt                                                                                               |
| `autoAcceptAlerts`     | boolean                                                                | —                | `true`           | Acceptera aviseringar automatiskt                                                                                                 |
| `autoDismissAlerts`    | boolean                                                                | —                | `false`          | Avfärda aviseringar automatiskt                                                                                                   |
| `appWaitActivity`      | string                                                                 | —                | —                | Android-aktivitet att vänta på vid start                                                                                          |
| `udid`                 | string                                                                 | —                | —                | UDID för fysisk iOS-enhet                                                                                                         |
| `noReset`              | boolean                                                                | —                | —                | Bevara appdata mellan sessioner                                                                                                   |
| `fullReset`            | boolean                                                                | —                | —                | Avinstallera appen före/efter sessionen                                                                                           |
| `newCommandTimeout`    | number                                                                 | —                | `300`            | Timeout för Appium-kommandon (sekunder)                                                                                           |
| `attach`               | boolean                                                                | —                | `false`          | Anslut till befintlig Chrome via CDP                                                                                              |
| `attachConfig`         | object                                                                 | —                | —                | CDP-anslutning: `{ port: 9222, host: "localhost" }`                                                                               |
| `appiumConfig`         | object                                                                 | —                | —                | Appium-server: `{ host, port, path }`                                                                                             |
| `tunnel`               | `boolean \| "external"`                                                | —                | `false`          | Routning via lokal tunnel (molnleverantörer). `true` = starta automatiskt, `"external"` = tunneln körs redan externt              |
| `reporting`            | object                                                                 | —                | —                | Rapporteringsetiketter för molnleverantör: `{ project, build, session }`                                                          |
| `trace`                | boolean                                                                | —                | `false`          | Aktivera spårningsinspelning — skapar en Playwright-kompatibel `.trace`-zip                                                       |
| `region`               | `"us-west-1" \| "eu-central-1" \| "apac-southeast-1"`                  | —                | `"eu-central-1"` | Region för Sauce Labs datacenter                                                                                                  |
| `tunnelName`           | string                                                                 | —                | —                | Tunnelns identifierande namn (krävs för `tunnel: "external"`)                                                                     |
| `capabilities`         | object                                                                 | —                | —                | Ytterligare råa capabilities att slå samman                                                                                       |

```js
// Lokal Chrome-webbläsare
start_session({ platform: "browser", browser: "chrome" })

// iOS-simulator
start_session({ platform: "ios", deviceName: "iPhone 16", platformVersion: "18.0", appPath: "/path/to/app.app" })

// BrowserStack Android
start_session({ platform: "android", provider: "browserstack", deviceName: "Samsung Galaxy S24", app: "bs://abc123" })

// Sauce Labs iOS
start_session({ platform: "ios", provider: "saucelabs", deviceName: "iPhone 15", platformVersion: "17.0", app: "storage:filename=MyApp.ipa" })

// TestMu-webbläsare
start_session({ platform: "browser", provider: "testmu", browser: "chrome", os: "Windows", osVersion: "11" })

// TestingBot-webbläsare
start_session({ platform: "browser", provider: "testingbot", browser: "chrome", os: "Windows", osVersion: "11" })

// Molnleverantör med tunnel
start_session({ platform: "browser", provider: "browserstack", browser: "chrome", tunnel: true })

// Anslut till befintlig Chrome (efter launch_chrome)
start_session({ platform: "browser", browser: "chrome", attach: true })
```

---

### `close_session`

Stänger eller kopplar från den aktuella sessionen.

| Parameter | Typ     | Obligatorisk | Standard | Beskrivning                                                       |
| --------- | ------- | ------------ | -------- | ----------------------------------------------------------------- |
| `detach`  | boolean | —            | `false`  | Koppla från utan att avsluta (bevarar apptillståndet i Appium)    |

Sessioner som startats med `noReset: true` kopplas som standard från automatiskt.

---

### `launch_chrome`

Förbereder en Chrome-instans med fjärrfelsökning aktiverad så att `start_session({ attach: true })` kan ansluta. Två lägen:

- `newInstance` (standard): öppnar Chrome bredvid din befintliga instans med en separat profilkatalog; din nuvarande session påverkas inte.
- `freshSession`: startar Chrome med en tom profil (inga cookies, inga inloggningar). Använd `copyProfileFiles: true` för att föra över cookies och inloggningar.

| Parameter          | Typ                               | Obligatorisk | Standard        | Beskrivning                                                               |
| ------------------ | --------------------------------- | ------------ | --------------- | ------------------------------------------------------------------------- |
| `port`             | number                            | —            | `9222`          | Port för fjärrfelsökning                                                  |
| `mode`             | `"newInstance" \| "freshSession"` | —            | `"newInstance"` | Startläge                                                                 |
| `copyProfileFiles` | boolean                           | —            | `false`         | Kopiera Chromes standardprofil (cookies, inloggningar) till felsökningssessionen |

När detta verktyg har lyckats anropar du `start_session({ platform: "browser", browser: "chrome", attach: true })`.

## Navigering och flikar

### `navigate`

Laddar en URL i den aktuella fliken och väntar på sidans load-händelse. Återställer sidans tillstånd (DOM, JS-körmiljö). **Endast webbläsare.**

| Parameter | Typ    | Obligatorisk | Beskrivning              |
| --------- | ------ | ------------ | ------------------------ |
| `url`     | string | ✓            | URL att navigera till    |

---

### `get_tabs`

Listar alla webbläsarflikar med handle, titel, URL och vilken som är aktiv. Använd före `switch_tab` för att hitta målets handle. **Endast webbläsare.**

Inga parametrar.

---

### `switch_tab`

Fokuserar en webbläsarflik via window handle eller 0-baserat index. Alla efterföljande verktygsanrop körs mot den nyligen aktiva fliken. **Endast webbläsare.**

| Parameter | Typ    | Obligatorisk | Beskrivning                       |
| --------- | ------ | ------------ | --------------------------------- |
| `handle`  | string | —            | Window handle att växla till      |
| `index`   | number | —            | 0-baserat flikindex (≥ 0)         |

Ange antingen `handle` eller `index`. Hämta handles från `get_tabs` eller `wdio://session/current/tabs`.

---

### `switch_frame`

Växlar WebDrivers ramkontext till en iframe via CSS/XPath-selektor, eller tillbaka till toppnivån om selektorn utelämnas. Ändringarna kvarstår; alla efterföljande anrop till `click_element`, `set_value` och `get_elements` körs inom den valda ramen tills du växlar tillbaka. Väntar upp till 5 s på iframen. **Endast webbläsare.**

| Parameter  | Typ    | Obligatorisk | Beskrivning                                                                                   |
| ---------- | ------ | ------------ | --------------------------------------------------------------------------------------------- |
| `selector` | string | —            | CSS/XPath-selektor för iframe-elementet. Utelämna för att växla tillbaka till toppnivåramen.  |

```js
// Växla in i en iframe
switch_frame({ selector: "#my-iframe" })

// Interagera med element inuti iframen
click_element({ selector: "button.submit" })

// Växla tillbaka till toppnivån
switch_frame()
```

## Elementinteraktion

### `click_element`

Väntar på att ett element ska finnas, scrollar det till synligt läge och klickar på det. Fungerar i webbläsare och på mobil. På iOS bör du föredra `tap_element`; `click_element` ignoreras ibland av det native lagret.

| Parameter      | Typ     | Obligatorisk | Standard | Beskrivning                                      |
| -------------- | ------- | ------------ | -------- | ------------------------------------------------ |
| `selector`     | string  | ✓            | —        | CSS-, XPath- eller textselektor                  |
| `scrollToView` | boolean | —            | `true`   | Scrolla elementet till synligt läge före klick   |
| `timeout`      | number  | —            | —        | Maximal väntetid (ms)                            |

---

### `set_value`

Rensar ett input- eller textarea-fält och skriver den angivna texten. Ersätter alltid befintligt innehåll.

| Parameter      | Typ     | Obligatorisk | Standard | Beskrivning                                          |
| -------------- | ------- | ------------ | -------- | ---------------------------------------------------- |
| `selector`     | string  | ✓            | —        | CSS-, XPath- eller textselektor                      |
| `value`        | string  | ✓            | —        | Text att skriva                                      |
| `scrollToView` | boolean | —            | `true`   | Scrolla elementet till synligt läge före inmatning   |
| `timeout`      | number  | —            | —        | Maximal väntetid (ms)                                |

---

### `scroll`

Scrollar sidan ett visst antal pixlar. **Endast webbläsare.** För mobil, använd `swipe`.

| Parameter   | Typ              | Obligatorisk | Standard | Beskrivning               |
| ----------- | ---------------- | ------------ | -------- | ------------------------- |
| `direction` | `"up" \| "down"` | ✓            | —        | Scrollriktning            |
| `pixels`    | number           | —            | `500`    | Antal pixlar att scrolla  |

## Elementanalys

### `get_elements`

Returnerar interaktiva element på den aktuella sidan med färdiga selektorer. Föredra resursen `wdio://session/current/elements` för löpande överblick; använd detta verktyg när du behöver filtrering eller paginering.

| Parameter           | Typ     | Obligatorisk | Standard | Beskrivning                                         |
| ------------------- | ------- | ------------ | -------- | --------------------------------------------------- |
| `inViewportOnly`    | boolean | —            | `false`  | Returnera endast element som syns i viewporten      |
| `includeContainers` | boolean | —            | `false`  | Inkludera containerelement (divs, sections)         |
| `includeBounds`     | boolean | —            | `false`  | Inkludera koordinater för omslutande ruta           |
| `limit`             | number  | —            | `0`      | Max antal element att returnera (0 = obegränsat)    |
| `offset`            | number  | —            | `0`      | Antal element att hoppa över (paginering)           |

---

### `get_accessibility_tree`

Returnerar sidans tillgänglighetsträd med roller, namn och selektorer. Stöder filtrering och paginering. **Endast webbläsare.**

| Parameter | Typ      | Obligatorisk | Standard | Beskrivning                                                    |
| --------- | -------- | ------------ | -------- | -------------------------------------------------------------- |
| `limit`   | number   | —            | `0`      | Max antal noder att returnera (0 = obegränsat)                 |
| `offset`  | number   | —            | `0`      | Antal noder att hoppa över (paginering)                        |
| `roles`   | string[] | —            | —        | Filtrera efter ARIA-roller, t.ex. `["button", "link", "heading"]` |

## Skärmbilder

### `get_screenshot`

Tar en skärmbild av den aktuella sidan eller skärmen. Returnerar en base64-kodad bild som automatiskt skalas om och komprimeras för att hålla sig inom modellens kontextgränser (max 1 MB, max 2000 px).

Inga parametrar. Föredra `wdio://session/current/elements` framför skärmbilder för att hitta element; det går snabbare och använder betydligt färre tokens. Använd skärmbilder för visuell verifiering eller felsökning av layout.

## Cookiehantering

### `get_cookies`

Returnerar alla cookies för den aktuella sessionen, eller en enskild cookie via namn. **Endast webbläsare.**

| Parameter | Typ    | Obligatorisk | Beskrivning                                         |
| --------- | ------ | ------------ | --------------------------------------------------- |
| `name`    | string | —            | Cookiens namn. Utelämna för att returnera alla cookies. |

---

### `set_cookie`

Sätter en webbläsarcookie. Webbläsaren måste redan befinna sig på måldomänen — cookies kan inte sättas mellan domäner. Använd för att injicera sessionstokens eller funktionsflaggor utan att gå igenom inloggningsflöden. **Endast webbläsare.**

| Parameter  | Typ                           | Obligatorisk | Beskrivning                                       |
| ---------- | ----------------------------- | ------------ | ------------------------------------------------- |
| `name`     | string                        | ✓            | Cookiens namn                                     |
| `value`    | string                        | ✓            | Cookiens värde                                    |
| `domain`   | string                        | —            | Cookiens domän (standard är aktuell domän)        |
| `path`     | string                        | —            | Cookiens sökväg (standard är `/`)                 |
| `expiry`   | number                        | —            | Utgångstid som Unix-tidsstämpel (sekunder)        |
| `httpOnly` | boolean                       | —            | HttpOnly-flagga                                   |
| `secure`   | boolean                       | —            | Secure-flagga                                     |
| `sameSite` | `"strict" \| "lax" \| "none"` | —            | SameSite-attribut                                 |

---

### `delete_cookies`

Raderar alla cookies eller en specifik cookie via namn. **Endast webbläsare.**

| Parameter | Typ    | Obligatorisk | Beskrivning                                                       |
| --------- | ------ | ------------ | ----------------------------------------------------------------- |
| `name`    | string | —            | Namn på cookien som ska raderas. Utelämna för att radera alla cookies. |

## Pekgester (mobil)

### `tap_element`

Anropar `element.tap()` på ett matchat element eller trycker på absoluta skärmkoordinater. Använd på iOS när `click_element` ignoreras; tryck är den native gest som iOS reagerar på. **Endast mobil.**

| Parameter  | Typ    | Obligatorisk | Beskrivning                                           |
| ---------- | ------ | ------------ | ----------------------------------------------------- |
| `selector` | string | —            | Elementselektor                                       |
| `x`        | number | —            | X-koordinat för skärmtryck (om ingen selektor anges)  |
| `y`        | number | —            | Y-koordinat för skärmtryck (om ingen selektor anges)  |

Ange antingen `selector` eller `x`/`y`-koordinater.

---

### `swipe`

Utför en svepgest över hela skärmen. Riktningen är innehållets rörelseriktning (t.ex. `"up"` scrollar en lista uppåt). Använd för att scrolla bortom det synliga området. För att flytta ett specifikt element, använd `drag_and_drop`. **Endast mobil.** För webbläsare, använd `scroll`.

| Parameter   | Typ                                   | Obligatorisk | Standard       | Beskrivning                              |
| ----------- | ------------------------------------- | ------------ | -------------- | ---------------------------------------- |
| `direction` | `"up" \| "down" \| "left" \| "right"` | ✓            | —              | Svepriktning                             |
| `duration`  | number                                | —            | `500`          | Svepets varaktighet (ms, 100–5000)       |
| `percent`   | number                                | —            | `0.5` / `0.95` | Andel av skärmen att svepa (0–1)         |

---

### `drag_and_drop`

Drar ett element till ett annat element eller till koordinater. **Endast mobil.**

| Parameter        | Typ    | Obligatorisk | Standard | Beskrivning                                      |
| ---------------- | ------ | ------------ | -------- | ------------------------------------------------ |
| `sourceSelector` | string | ✓            | —        | Källelement att dra                              |
| `targetSelector` | string | —            | —        | Målelement att släppa på                         |
| `x`              | number | —            | —        | Mål-X-förskjutning (om ingen targetSelector)     |
| `y`              | number | —            | —        | Mål-Y-förskjutning (om ingen targetSelector)     |
| `duration`       | number | —            | —        | Dragets varaktighet (ms, 100–5000)               |

## Kontextväxling (mobil)

### `get_contexts`

Returnerar tillgängliga automatiseringskontexter och den som för närvarande är aktiv. Använd före `switch_context` för att upptäcka `NATIVE_APP`- och `WEBVIEW_*`-mål. **Endast mobil.**

Inga parametrar.

---

### `switch_context`

Växlar mellan native- och webview-automatiseringskontexter i en hybrid mobilapp. Krävs innan CSS/XPath-selektorer används inuti en inbäddad webview. **Endast mobil.**

| Parameter | Typ    | Obligatorisk | Beskrivning                                                        |
| --------- | ------ | ------------ | ------------------------------------------------------------------ |
| `context` | string | ✓            | Kontextnamn, t.ex. `"NATIVE_APP"`, `"WEBVIEW_com.example.app"`     |

Hämta tillgängliga kontextnamn från `get_contexts` eller `wdio://session/current/contexts`.

```js
// 1. Kontrollera vad som är tillgängligt
get_contexts()
// → { contexts: ["NATIVE_APP", "WEBVIEW_com.example.app"], currentContext: "NATIVE_APP" }

// 2. Växla in i webviewen för CSS/XPath
switch_context({ context: "WEBVIEW_com.example.app" })

// 3. Interagera med webview-element med CSS-selektorer
click_element({ selector: "#login-button" })

// 4. Växla tillbaka till native för native UI
switch_context({ context: "NATIVE_APP" })
```

## Enhetskontroll (mobil)

### `rotate_device`

Roterar enheten till stående eller liggande läge och väntar tills operativsystemets rotation är klar. Använd för att testa orienteringsberoende layouter. **Endast mobil.**

| Parameter     | Typ                         | Obligatorisk | Beskrivning         |
| ------------- | --------------------------- | ------------ | ------------------- |
| `orientation` | `"PORTRAIT" \| "LANDSCAPE"` | ✓            | Målorientering      |

---

### `hide_keyboard`

Döljer det virtuella tangentbordet. Anropa efter textinmatning när tangentbordet skymmer element du behöver härnäst. Gör ingenting om det redan är dolt. **Endast mobil.**

Inga parametrar.

---

### `set_geolocation`

Åsidosätter enhetens GPS-koordinater för sessionen. Påverkar `navigator.geolocation` på webben och platstjänster på mobil. Platsbehörigheter måste ha beviljats appen i förväg.

| Parameter   | Typ    | Obligatorisk | Beskrivning                  |
| ----------- | ------ | ------------ | ---------------------------- |
| `latitude`  | number | ✓            | Latitud (−90 till 90)        |
| `longitude` | number | ✓            | Longitud (−180 till 180)     |
| `altitude`  | number | —            | Höjd över havet i meter      |

## Appens livscykel (mobil)

### `get_app_state`

Returnerar det aktuella livscykeltillståndet för en mobilapp. **Endast mobil.**

| Parameter  | Typ    | Obligatorisk | Beskrivning                                                          |
| ---------- | ------ | ------------ | -------------------------------------------------------------------- |
| `bundleId` | string | ✓            | iOS-bundle-ID eller Android-paketnamn, t.ex. `"com.example.app"`     |

Returnerar ett av: `not installed`, `not running`, `background (suspended)`, `background`, `foreground`.

## Webbläsarverktyg

### `emulate_device`

Emulerar en mobil- eller surfplatteenhet i den aktuella webbläsarsessionen (ställer in viewport, DPR, user-agent och touch-händelser). Kräver en BiDi-aktiverad session: `start_session({ capabilities: { webSocketUrl: true } })`. **Endast webbläsare.**

| Parameter | Typ    | Obligatorisk | Beskrivning                                                                                                                       |
| --------- | ------ | ------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `device`  | string | —            | Namn på enhetsförinställning (t.ex. `"iPhone 15"`, `"Pixel 7"`). Utelämna för att lista förinställningar. Ange `"reset"` för att återställa skrivbordsstandard. |

---

### `execute_script`

Kör JavaScript i webbläsaren eller mobilkommandon via Appium.

| Parameter | Typ    | Obligatorisk | Beskrivning                                                          |
| --------- | ------ | ------------ | -------------------------------------------------------------------- |
| `script`  | string | ✓            | JS-kod (webbläsare) eller Appium-kommando som `"mobile: pressKey"`   |
| `args`    | any[]  | —            | Argument som skickas till skriptet eller kommandot                   |

**Webbläsare:** använd `return` för att få tillbaka värden.

```javascript
// Hämta sidans titel
execute_script({ script: "return document.title" })

// Scrolla elementet till synligt läge
execute_script({ script: "arguments[0].scrollIntoView()", args: ["#my-element"] })
```

**Mobil (Appium):** använder syntaxen `mobile: <command>`.

```javascript
// Tryck på Androids bakåtknapp
execute_script({ script: "mobile: pressKey", args: [{ keycode: 4 }] })

// Aktivera app (iOS/Android)
execute_script({ script: "mobile: activateApp", args: [{ bundleId: "com.example.app" }] })

// Djuplänk (iOS)
execute_script({ script: "mobile: deepLink", args: [{ url: "myapp://route", bundleId: "com.example.app" }] })
```

## Molnleverantörer

### `list_apps`

Listar appar som laddats upp till en molnleverantör (BrowserStack App Automate, Sauce Labs App Storage, TestMu eller TestingBot Storage). Läser leverantörsspecifika autentiseringsuppgifter från miljön.

| Parameter          | Typ                                                         | Obligatorisk | Standard         | Beskrivning                                          |
| ------------------ | ----------------------------------------------------------- | ------------ | ---------------- | ---------------------------------------------------- |
| `provider`         | `"browserstack" \| "saucelabs" \| "testmu" \| "testingbot"` | ✓            | —                | Molnleverantör                                       |
| `sortBy`           | `"app_name" \| "uploaded_at"`                               | —            | `"uploaded_at"`  | Sorteringsordning                                    |
| `organizationWide` | boolean                                                     | —            | `false`          | (Endast BrowserStack) Lista organisationens alla uppladdningar |
| `limit`            | number                                                      | —            | `20`             | Max antal resultat                                   |
| `region`           | `"us-west-1" \| "eu-central-1" \| "apac-southeast-1"`       | —            | `"eu-central-1"` | Sauce Labs-region                                    |

```js
// Lista för alla fyra leverantörer
list_apps({ provider: "browserstack" })
list_apps({ provider: "saucelabs", region: "us-west-1" })
list_apps({ provider: "testmu" })
list_apps({ provider: "testingbot" })
```

---

### `upload_app`

Laddar upp en lokal `.apk` eller `.ipa` till en molnleverantör (BrowserStack, Sauce Labs, TestMu eller TestingBot). Returnerar app-URL:en för användning i `start_session`.

| Parameter  | Typ                                                         | Obligatorisk | Standard         | Beskrivning                                                  |
| ---------- | ----------------------------------------------------------- | ------------ | ---------------- | ------------------------------------------------------------ |
| `provider` | `"browserstack" \| "saucelabs" \| "testmu" \| "testingbot"` | ✓            | —                | Molnleverantör                                               |
| `path`     | string                                                      | ✓            | —                | Absolut sökväg till `.apk`- eller `.ipa`-filen               |
| `customId` | string                                                      | —            | —                | Valfritt anpassat ID för att referera till appen senare      |
| `region`   | `"us-west-1" \| "eu-central-1" \| "apac-southeast-1"`       | —            | `"eu-central-1"` | Sauce Labs-region                                            |

```js
// Ladda upp till varje leverantör
upload_app({ provider: "browserstack", path: "/path/to/app.apk" })
upload_app({ provider: "saucelabs", path: "/path/to/app.ipa", region: "us-west-1" })
upload_app({ provider: "testmu", path: "/path/to/app.apk" })
upload_app({ provider: "testingbot", path: "/path/to/app.apk" })
```