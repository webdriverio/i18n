---
id: configuration
title: Konfiguration
description: "Konfigurera WebdriverIO MCP-servern, inklusive alternativ för session, webbläsare, mobil, molnleverantör, elementdetektering och Appium."
---

Den här sidan dokumenterar alla konfigurationsalternativ för WebdriverIO MCP-servern.

## Konfiguration av MCP-server

MCP-servern konfigureras via konfigurationsfiler eller kommandon.

### Grundläggande konfiguration

Redigera din MCP-konfigurationsfil (t.ex. `./.mcp.json`) och lägg till följande:

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

## Sessionsalternativ

Alla sessionsalternativ skickas till verktyget `start_session`. Det finns ett enda enhetligt verktyg för webbläsar- och mobilsessioner; parametern `platform` avgör sessionstypen.

### Gemensamma alternativ

#### `platform`

<Option type={`"browser" | "ios" | "android"`} required="Ja">

Plattformen som ska automatiseras.

</Option>
#### `provider`

<Option type={`"local" | "browserstack" | "saucelabs" | "testmu" | "testingbot"`} default={`"local"`} required="Nej">

Var sessionen körs. Använd namnet på en molnleverantör för fjärrenheter; var och en kräver sina egna miljövariabler. Se [Molnleverantörer](./cloud-providers) för detaljer.

</Option>
## Alternativ för webbläsarsessioner

Alternativ för sessioner med `platform: "browser"`.

### `browser`

<Option type={`"chrome" | "firefox" | "edge" | "safari"`} required="Ja (för webbläsarplattform)">

Webbläsare som ska startas.

</Option>
### `browserVersion`

<Option type="string" default={`"latest"`} required="Nej">

Webbläsarversion. Endast molnleverantörer (standard: latest).

</Option>
### `os` / `osVersion`

<Option type="string" required="Nej">

Operativsystem för webbläsarsessioner hos molnleverantörer. Exempel: `os: "Windows"`, `osVersion: "11"` eller `os: "OS X"`, `osVersion: "Sequoia"`.

</Option>
### `headless`

<Option type="boolean" default="true" required="Nej">

Kör webbläsaren i headless-läge (inget synligt fönster). Sätt till `false` för att se webbläsaren.

</Option>
### `windowWidth`

<Option type="number" default="1920" required="Nej">

-   **Intervall:** `400` - `3840`

Webbläsarfönstrets initiala bredd i pixlar.

</Option>
### `windowHeight`

<Option type="number" default="1080" required="Nej">

-   **Intervall:** `400` - `2160`

Webbläsarfönstrets initiala höjd i pixlar.

</Option>
### `navigationUrl`

<Option type="string" required="Nej">

URL att navigera till direkt efter att webbläsaren har startats. Effektivare än att anropa `start_session` följt av `navigate` separat.

</Option>
### `attach`

<Option type="boolean" default="false" required="Nej">

Anslut till en befintlig Chrome-instans i stället för att starta en ny. Använd efter `launch_chrome` för att ansluta via CDP.

</Option>
### `attachConfig`

<Option type={`{ port?: number; host?: string }`} default={`{ port: 9222, host: "localhost" }`} required="Nej">

Anslutningskonfiguration för Chromes fjärrfelsökning. Gäller endast när `attach: true`.

</Option>
## Alternativ för mobilsessioner

Alternativ för sessioner med `platform: "ios"` eller `platform: "android"`.

### `deviceName`

<Option type="string" required="Ja (för mobilplattformar)">

Namnet på enheten, simulatorn eller emulatorn.

**Exempel:**
-   iOS-simulator: `"iPhone 16"`, `"iPad Air (5th generation)"`
-   Android-emulator: `"Pixel 7"`, `"Nexus 5X"`
-   Riktig enhet: Enhetsnamnet som det visas i ditt system

</Option>
### `platformVersion`

<Option type="string" required="Nej">

OS-version för enheten/simulatorn/emulatorn (t.ex. `"18.0"` för iOS, `"14"` för Android).

</Option>
### `automationName`

<Option type={`"XCUITest" | "UiAutomator2"`} required="Nej">

Automationsdrivrutin. Standard är `XCUITest` för iOS och `UiAutomator2` för Android.

</Option>
### `udid`

<Option type="string" required="Nej (krävs för riktiga iOS-enheter)">

Unik enhetsidentifierare (Unique Device Identifier). Krävs för riktiga iOS-enheter (identifierare på 40 tecken).

**Hitta UDID:**
-   **iOS:** Anslut enheten, öppna Finder, klicka på enheten → Serienummer (klicka för att visa UDID)
-   **Android:** Kör `adb devices` i terminalen

</Option>
### `appPath`

<Option type="string" required="Nej">

Sökväg till applikationsfilen som ska installeras och startas.

**Format som stöds:**
-   iOS-simulator: `.app`-katalog
-   Riktig iOS-enhet: `.ipa`-fil
-   Android: `.apk`-fil

Antingen måste `appPath` anges, eller `noReset: true` för att ansluta till en app som redan körs.

</Option>
### `app`

<Option type="string" required="Nej">

App-URL hos molnleverantören (`bs://...` för BrowserStack, `storage:filename=` för Sauce Labs, `lt://...` för TestMu, TestingBot app_url) eller `customId`. Används i stället för `appPath` för mobilsessioner i molnet.

</Option>
### `appWaitActivity`

<Option type="string" required="Nej (endast Android)">

Aktivitet att vänta på vid appstart. Om den inte anges används appens huvud-/startaktivitet.

**Exempel:** `"com.example.app.MainActivity"`

</Option>
### Alternativ för sessionstillstånd

#### `noReset`

<Option type="boolean" required="Nej">

Bevara apptillståndet mellan sessioner. När `true`:
-   Appdata bevaras (inloggningsstatus, inställningar osv.)
-   Sessionen kommer att **kopplas från** i stället för att stängas (appen fortsätter köras)
-   Kan användas utan `appPath` för att ansluta till en app som redan körs

</Option>
#### `fullReset`

<Option type="boolean" required="Nej">

Återställ appen helt före sessionen:
-   iOS: Avinstallerar och installerar om appen
-   Android: Rensar appdata och cache

Sätt `fullReset: false` tillsammans med `noReset: true` för att bevara apptillståndet helt.

</Option>
### Sessionstimeout

#### `newCommandTimeout`

<Option type="number" default="300" required="Nej">

Hur länge (i sekunder) Appium väntar på ett nytt kommando innan sessionen avslutas. Öka för längre felsökningssessioner.

</Option>
### Automatisk hantering

#### `autoGrantPermissions`

<Option type="boolean" default="true" required="Nej">

Bevilja automatiskt appbehörigheter vid installation/start (kamera, mikrofon, plats osv.).

:::note Endast Android
Det här alternativet påverkar främst Android. iOS-behörigheter måste hanteras på annat sätt på grund av systembegränsningar.
:::

</Option>
#### `autoAcceptAlerts`

<Option type="boolean" default="true" required="Nej">

Acceptera automatiskt systemaviseringar (dialogrutor) under automatisering ("Tillåt notiser?" osv.).

</Option>
#### `autoDismissAlerts`

<Option type="boolean" default="false" required="Nej">

Avvisa systemaviseringar i stället för att acceptera dem. Har företräde framför `autoAcceptAlerts` när `true`.

</Option>
### Anslutning till Appium-server

Åsidosätt anslutningen till Appium-servern per session med `appiumConfig`:

```js
start_session({
  platform: "ios",
  deviceName: "iPhone 16",
  appPath: "/path/to/app.app",
  appiumConfig: { host: "192.168.1.100", port: 4724, path: "/wd/hub" }
})
```

#### `appiumConfig`

<Option type={`{ host?: string; port?: number; path?: string }`} required="Nej">

Anslutning till Appium-servern. Standard är `{ host: "127.0.0.1", port: 4723, path: "/" }`.

</Option>
## Alternativ för molnleverantörer

### Autentiseringsuppgifter

Varje molnleverantör kräver sina egna miljövariabler:

| Leverantör   | Variabel för användarnamn | Variabel för åtkomstnyckel |
| ------------ | ------------------------- | -------------------------- |
| BrowserStack | `BROWSERSTACK_USERNAME`   | `BROWSERSTACK_ACCESS_KEY`  |
| Sauce Labs   | `SAUCE_USERNAME`          | `SAUCE_ACCESS_KEY`         |
| TestMu       | `TESTMU_USERNAME`         | `TESTMU_ACCESS_KEY`        |
| TestingBot   | `TESTINGBOT_KEY`          | `TESTINGBOT_SECRET`        |

Ange dessa innan du startar MCP-servern.

### `region`

<Option type={`"us-west-1" | "eu-central-1" | "apac-southeast-1"`} default={`"eu-central-1"`} required="Nej">

Region för Sauce Labs datacenter. Ignoreras för andra leverantörer.

</Option>
### `tunnel`

<Option type={`boolean | "external"`} default="false" required="Nej">

Aktivera lokal tunnelroutning för sessioner hos molnleverantörer (åtkomst till localhost, stagingmiljöer, interna tjänster).

-   `true` — Startar tunneln automatiskt före sessionen och stoppar den vid stängning
-   `"external"` — Tunneln körs redan externt; sätter endast leverantörsspecifika flaggor

Innan du använder `true`, läs leverantörens local-binary-resurs (`wdio://browserstack/local-binary`, `wdio://saucelabs/local-binary`, `wdio://testmu/local-binary` eller `wdio://testingbot/local-binary`) för installationsinstruktioner specifika för ditt OS och din arkitektur.

</Option>
### `tunnelName`

<Option type="string" required="Nej">

Tunnelns identifierarnamn. Krävs när `tunnel: "external"` för att matcha den körande tunneln. När `tunnel: true` genereras ett unikt namn automatiskt om inget anges.

</Option>
### `reporting`

<Option type={`{ project?: string; build?: string; session?: string }`} required="Nej">

Sessionsetiketter hos molnleverantören som visas i leverantörens dashboard. Fungerar identiskt för BrowserStack, Sauce Labs, TestMu och TestingBot.

</Option>
### `trace`

<Option type="boolean" default="false" required="Nej">

Aktivera spårningsinspelning. Skapar en Playwright-kompatibel `.trace`-zipfil som sparas i `.trace/` vid `close_session`. Visa spårningar på [player.vibium.dev](https://player.vibium.dev).

</Option>
## Alternativ för elementdetektering

Alternativ för verktyget `get_elements`.

### `inViewportOnly`

<Option type="boolean" default="false" required="Nej">

Returnera endast element som är synliga i den aktuella vyporten. Sätt till `true` för att minska antalet resultat på långa sidor.

</Option>
### `includeContainers`

<Option type="boolean" default="false" required="Nej">

Inkludera container-/layoutelement i resultaten:

**Android-containrar:** `ViewGroup`, `FrameLayout`, `LinearLayout`, `RelativeLayout`, `ConstraintLayout`, `ScrollView`, `RecyclerView`

**iOS-containrar:** `View`, `StackView`, `CollectionView`, `ScrollView`, `TableView`

</Option>
### `includeBounds`

<Option type="boolean" default="false" required="Nej">

Inkludera elementens koordinater för avgränsningsramen (x, y, width, height) i svaret.

</Option>
### Paginering

#### `limit`

<Option type="number" default="0 (obegränsat)" required="Nej">

Maximalt antal element att returnera.

</Option>
#### `offset`

<Option type="number" default="0" required="Nej">

Antal element att hoppa över innan resultat returneras.

**Exempel:** Hämta element 21–40:
```text
Get elements with limit 20 and offset 20
```

</Option>
## Alternativ för tillgänglighetsträd

Alternativ för verktyget `get_accessibility_tree` (endast webbläsare).

### `limit`

<Option type="number" default="0 (obegränsat)" required="Nej">

Maximalt antal noder att returnera.

</Option>
### `offset`

<Option type="number" default="0" required="Nej">

Antal noder att hoppa över vid paginering.

</Option>
### `roles`

<Option type="string[]" default="Alla roller" required="Nej">

Filtrera på specifika tillgänglighetsroller.

**Vanliga roller:** `button`, `link`, `textbox`, `checkbox`, `radio`, `heading`, `img`, `listitem`

**Exempel:** Hämta endast knappar och länkar:
```text
Get accessibility tree filtered to button and link roles
```

</Option>
## Skärmdump

Verktyget `get_screenshot` tar inga parametrar. Skärmdumpar bearbetas automatiskt:

| Optimering        | Värde    | Beskrivning                                              |
| ----------------- | -------- | -------------------------------------------------------- |
| Max dimension     | 2000px   | Bilder större än 2000px skalas ned                       |
| Max filstorlek    | 1MB      | Bilder komprimeras för att hålla sig under 1MB           |
| Format            | PNG/JPEG | PNG med maximal komprimering; JPEG om det behövs för storleken |

## Sessionsbeteende

### Sessionstyper

| Typ       | Beskrivning          | Automatisk frånkoppling                     |
| --------- | -------------------- | ------------------------------------------- |
| `browser` | Webbläsarsession     | Nej                                         |
| `ios`     | iOS-appsession       | Ja (om `noReset: true` eller ingen `appPath`) |
| `android` | Android-appsession   | Ja (om `noReset: true` eller ingen `appPath`) |

### Modell med en session

MCP-servern arbetar med en **modell med en enda session**:

-   Endast en webbläsar- ELLER appsession kan vara aktiv åt gången
-   Att starta en ny session stänger/kopplar från den aktuella sessionen
-   Sessionstillståndet upprätthålls globalt över verktygsanrop

### Koppla från vs stänga

| Åtgärd     | `detach: false` (Stäng)          | `detach: true` (Koppla från)                     |
| ---------- | -------------------------------- | ------------------------------------------------ |
| Webbläsare | Stänger webbläsaren helt         | Låter webbläsaren köras, kopplar från WebDriver  |
| Mobilapp   | Avslutar appen                   | Låter appen köras i aktuellt tillstånd           |
| Användning | Rent blad för nästa session      | Bevara tillstånd, manuell inspektion             |

## Prestandaöverväganden

### Webbläsarautomatisering

-   **Headless-läge** är snabbare men renderar inte visuella element
-   **Mindre fönsterstorlekar** minskar tiden för att ta skärmdumpar
-   **Elementdetektering** är optimerad med en enda skriptkörning
-   **Skärmdumpsoptimering** håller bilder under 1MB för effektiv bearbetning

### Mobilautomatisering

-   **Tolkning av XML-sidkälla** använder endast 2 HTTP-anrop (jämfört med 600+ för traditionella elementförfrågningar)
-   **Accessibility ID-selektorer** är snabbast och mest tillförlitliga
-   **XPath-selektorer** är långsammast; använd dem endast som sista utväg
-   **Paginering** (`limit` och `offset`) minskar tokenanvändningen för skärmar med många element

### Tips för tokenanvändning

| Inställning                | Effekt                                                    |
| -------------------------- | --------------------------------------------------------- |
| `inViewportOnly: true`     | Filtrerar bort element utanför skärmen, minskar svarsstorleken |
| `includeContainers: false` | Exkluderar layoutelement (ViewGroup osv.)                 |
| `includeBounds: false`     | Utelämnar x/y/width/height-data                           |
| `limit` med paginering     | Bearbeta element i omgångar i stället för alla på en gång |

## Installation av Appium-server

Innan du använder mobilautomatisering, se till att Appium är korrekt konfigurerat.

### Grundläggande installation

```sh
# Installera Appium globalt
npm install -g appium

# Installera drivrutiner
appium driver install xcuitest    # iOS
appium driver install uiautomator2  # Android

# Starta servern
appium
```

### Anpassad serverkonfiguration

```sh
# Starta med anpassad värd och port
appium --address 0.0.0.0 --port 4724

# Starta med loggning
appium --log-level debug

# Starta med specifik bassökväg
appium --base-path /wd/hub
```

### Verifiera installationen

```sh
# Kontrollera installerade drivrutiner
appium driver list --installed

# Kontrollera Appium-version
appium --version

# Testa anslutningen
curl http://localhost:4723/status
```

## Felsökning av konfiguration

### MCP-servern startar inte

1. Verifiera att npm/npx är installerat: `npm --version`
2. Prova att köra manuellt: `npx @wdio/mcp`
3. Kontrollera din miljös loggar efter fel

### Problem med Appium-anslutning

1. Verifiera att Appium körs: `curl http://localhost:4723/status`
2. Kontrollera att `appiumConfig` i `start_session` matchar Appium-serverns inställningar
3. Se till att brandväggen tillåter anslutningar på Appium-porten

### Sessionen startar inte

1. **Webbläsare:** Se till att målwebbläsaren är installerad
2. **iOS:** Verifiera att Xcode och simulatorer är tillgängliga
3. **Android:** Kontrollera `ANDROID_HOME` och att emulatorn körs
4. Granska Appium-serverns loggar för detaljerade felmeddelanden

### Sessionstimeouts

Om sessioner får timeout under felsökning:
1. Öka `newCommandTimeout` när du startar sessionen
2. Använd `noReset: true` för att bevara tillståndet mellan sessioner
3. Använd `detach: true` vid stängning för att låta appen fortsätta köras