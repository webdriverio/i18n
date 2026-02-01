---
id: configuration
title: Konfiguration
---

Den här sidan dokumenterar alla konfigurationsalternativ för WebdriverIO MCP-servern.

## MCP-serverkonfiguration

MCP-servern konfigureras genom Claude Desktop eller Claude Code konfigurationsfiler.

### Grundläggande konfiguration

#### macOS

Redigera `~/Library/Application Support/Claude/claude_desktop_config.json`:

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

Redigera `%APPDATA%\Claude\claude_desktop_config.json`:

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

Redigera projektets `.claude/settings.json`:

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

## Miljövariabler

Konfigurera Appium-serveranslutningen och andra inställningar via miljövariabler.

### Appium-anslutning

| Variabel | Typ | Standard | Beskrivning |
|----------|------|---------|-------------|
| `APPIUM_URL` | string | `127.0.0.1` | Appium-serverns värdnamn |
| `APPIUM_URL_PORT` | number | `4723` | Appium-serverns port |
| `APPIUM_PATH` | string | `/` | Appium-serverns sökväg |

### Exempel med miljövariabler

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

## Webbläsarsessionsalternativ

Alternativ tillgängliga när en webbläsarsession startas via verktyget `start_browser`.

### `headless`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `false`

Kör Chrome i headless-läge (inget synligt webbläsarfönster). Användbart för CI/CD-miljöer eller när du inte behöver se webbläsaren.

### `windowWidth`

-   **Typ:** `number`
-   **Obligatorisk:** Nej
-   **Standard:** `1920`
-   **Intervall:** `400` - `3840`

Initial fönsterbredd för webbläsaren i pixlar.

### `windowHeight`

-   **Typ:** `number`
-   **Obligatorisk:** Nej
-   **Standard:** `1080`
-   **Intervall:** `400` - `2160`

Initial fönsterhöjd för webbläsaren i pixlar.

### `navigationUrl`

-   **Typ:** `string`
-   **Obligatorisk:** Nej

URL att navigera till direkt efter webbläsarstart. Detta är mer effektivt än att anropa `start_browser` följt av `navigate` separat.

**Exempel:** Starta webbläsare och navigera i ett anrop:
```
Start Chrome and navigate to https://webdriver.io
```

---

## Mobilsessionsalternativ

Alternativ tillgängliga när en mobilappsession startas via verktyget `start_app_session`.

### Plattformsalternativ

#### `platform`

-   **Typ:** `string`
-   **Obligatorisk:** Ja
-   **Värden:** `iOS` | `Android`

Den mobila plattformen som ska automatiseras.

#### `platformVersion`

-   **Typ:** `string`
-   **Obligatorisk:** Nej

OS-versionen för enheten/simulatorn/emulatorn (t.ex. `17.0` för iOS, `14` för Android).

#### `automationName`

-   **Typ:** `string`
-   **Obligatorisk:** Nej
-   **Värden:** `XCUITest` (iOS), `UiAutomator2` | `Espresso` (Android)

Automatiseringsdrivrutinen som ska användas. Standardvärdet är `XCUITest` för iOS och `UiAutomator2` för Android.

### Enhetsalternativ

#### `deviceName`

-   **Typ:** `string`
-   **Obligatorisk:** Ja

Namnet på enheten, simulatorn eller emulatorn som ska användas.

**Exempel:**
-   iOS Simulator: `iPhone 15 Pro`, `iPad Air (5th generation)`
-   Android Emulator: `Pixel 7`, `Nexus 5X`
-   Fysisk enhet: Enhetsnamnet som visas i ditt system

#### `udid`

-   **Typ:** `string`
-   **Obligatorisk:** Nej (Krävs för fysiska iOS-enheter)

Unik enhetsidentifierare. Krävs för fysiska iOS-enheter (40-teckens identifierare) och rekommenderas för fysiska Android-enheter.

**Hitta UDID:**
-   **iOS:** Anslut enhet, öppna Finder/iTunes, klicka på enheten → Serienummer (klicka för att visa UDID)
-   **Android:** Kör `adb devices` i terminalen

### Appalternativ

#### `appPath`

-   **Typ:** `string`
-   **Obligatorisk:** Nej*

Sökväg till applikationsfilen som ska installeras och startas.

**Stödda format:**
-   iOS Simulator: `.app`-katalog
-   iOS fysisk enhet: `.ipa`-fil
-   Android: `.apk`-fil

*Antingen måste `appPath` anges, eller `noReset: true` för att ansluta till en app som redan körs.

#### `appWaitActivity`

-   **Typ:** `string`
-   **Obligatorisk:** Nej (Endast Android)

Aktivitet att vänta på vid app-start. Om den inte anges används appens huvudaktivitet.

**Exempel:** `com.example.app.MainActivity`

### Sessionstillståndsalternativ

#### `noReset`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `false`

Bevara appens tillstånd mellan sessioner. När `true`:
-   Appdata bevaras (inloggningsstatus, inställningar, etc.)
-   Sessionen kommer att **kopplas bort** istället för att stängas (håller appen igång)
-   Användbart för att testa användarresor över flera sessioner
-   Kan användas utan `appPath` för att ansluta till en app som redan körs

#### `fullReset`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `true`

Återställ appen helt före sessionen. När `true`:
-   iOS: Avinstallerar och återinstallerar appen
-   Android: Rensar appdata och cache
-   Användbart för att starta med ett rent tillstånd

Ställ in `fullReset: false` med `noReset: true` för att bevara apptillståndet helt.

### Sessionstimeout

#### `newCommandTimeout`

-   **Typ:** `number`
-   **Obligatorisk:** Nej
-   **Standard:** `60`

Hur länge (i sekunder) Appium ska vänta på ett nytt kommando innan den antar att klienten har avslutat och avslutar sessionen. Öka detta värde för längre felsökningssessioner.

**Exempel:**
-   `60` - Standard, lämplig för de flesta automatiseringar
-   `300` - 5 minuter, för felsökning eller långsammare operationer
-   `600` - 10 minuter, för mycket långvariga tester

### Automatiska hanteringsalternativ

#### `autoGrantPermissions`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `true`

Bevilja automatiskt appbehörigheter vid installation/start. När `true`:
-   Kamera, mikrofon, plats, etc. behörigheter beviljas automatiskt
-   Ingen manuell hantering av behörighetsdialoger behövs
-   Effektiviserar automatisering genom att undvika behörighetsmeddelanden

:::note Endast Android
Detta alternativ påverkar främst Android. iOS-behörigheter måste hanteras annorlunda på grund av systembegränsningar.
:::

#### `autoAcceptAlerts`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `true`

Acceptera automatiskt systemvarningar (dialogrutor) som visas under automatisering.

**Exempel på automatiskt accepterade varningar:**
-   "Tillåt notifieringar?"
-   "Appen vill ha åtkomst till din plats"
-   "Tillåt appen att komma åt foton?"

#### `autoDismissAlerts`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `false`

Stäng (avbryt) systemvarningar istället för att acceptera dem. Har företräde framför `autoAcceptAlerts` när den är inställd på `true`.

### Appium-server-åsidosättning

Du kan åsidosätta Appium-serveranslutningen per session:

#### `appiumHost`

-   **Typ:** `string`
-   **Obligatorisk:** Nej

Appium-serverns värdnamn. Åsidosätter miljövariabeln `APPIUM_URL`.

#### `appiumPort`

-   **Typ:** `number`
-   **Obligatorisk:** Nej

Appium-serverns port. Åsidosätter miljövariabeln `APPIUM_URL_PORT`.

#### `appiumPath`

-   **Typ:** `string`
-   **Obligatorisk:** Nej

Appium-serverns sökväg. Åsidosätter miljövariabeln `APPIUM_PATH`.

---

## Elementdetekteringsalternativ

Alternativ för verktyget `get_visible_elements`.

### `elementType`

-   **Typ:** `string`
-   **Obligatorisk:** Nej
-   **Standard:** `interactable`
-   **Värden:** `interactable` | `visual` | `all`

Typ av element att returnera:
-   `interactable`: Knappar, länkar, inmatningsfält och andra klickbara element
-   `visual`: Bilder, SVG:er och visuella element
-   `all`: Både interaktiva och visuella element

### `inViewportOnly`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `true`

Returnera endast element som är synliga inom den aktuella visningsrutan. När `false` returneras alla element i vyhierarkin (användbart för att hitta element utanför skärmen).

### `includeContainers`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `false`

Inkludera container/layout-element i resultaten. När `true`:

**Android-behållare som inkluderas:**
-   `ViewGroup`, `FrameLayout`, `LinearLayout`
-   `RelativeLayout`, `ConstraintLayout`
-   `ScrollView`, `RecyclerView`

**iOS-behållare som inkluderas:**
-   `View`, `StackView`, `CollectionView`
-   `ScrollView`, `TableView`

Användbart för att felsöka layoutproblem eller förstå vyhierarkin.

### `includeBounds`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `false`

Inkludera elementgränser/koordinater (x, y, bredd, höjd) i svaret. Ange till `true` för:
-   Koordinatbaserade interaktioner
-   Layout-felsökning
-   Visuell elementpositionering

### Pagineringsalternativ

För stora sidor med många element, använd paginering för att minska tokenanvändningen:

#### `limit`

-   **Typ:** `number`
-   **Obligatorisk:** Nej
-   **Standard:** `0` (obegränsat)

Maximalt antal element att returnera.

#### `offset`

-   **Typ:** `number`
-   **Obligatorisk:** Nej
-   **Standard:** `0`

Antal element att hoppa över innan resultat returneras.

**Exempel:** Hämta element 21-40:
```
Get visible elements with limit 20 and offset 20
```

---

## Alternativ för tillgänglighetsträd

Alternativ för verktyget `get_accessibility` (endast webbläsare).

### `limit`

-   **Typ:** `number`
-   **Obligatorisk:** Nej
-   **Standard:** `100`

Maximalt antal noder att returnera. Använd `0` för obegränsat (rekommenderas inte för stora sidor).

### `offset`

-   **Typ:** `number`
-   **Obligatorisk:** Nej
-   **Standard:** `0`

Antal noder att hoppa över för paginering.

### `roles`

-   **Typ:** `string[]`
-   **Obligatorisk:** Nej
-   **Standard:** Alla roller

Filtrera till specifika tillgänglighetsroller.

**Vanliga roller:** `button`, `link`, `textbox`, `checkbox`, `radio`, `heading`, `img`, `listitem`

**Exempel:** Hämta endast knappar och länkar:
```
Get accessibility tree filtered to button and link roles
```

### `namedOnly`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `true`

Returnera endast noder som har ett namn/etikett. Filtrerar bort anonyma containrar och reducerar brus i resultaten.

---

## Skärmbildsalternativ

Alternativ för verktyget `take_screenshot`.

### `outputPath`

-   **Typ:** `string`
-   **Obligatorisk:** Nej

Sökväg där skärmbildsfilen ska sparas. Om den inte anges returneras base64-kodad bilddata.

### Automatisk optimering

Skärmbilder bearbetas automatiskt för att optimera för LLM-förbrukning:

| Optimering | Värde | Beskrivning |
|--------------|-------|-------------|
| Max dimension | 2000px | Bilder större än 2000px skalas ned |
| Max filstorlek | 1MB | Bilder komprimeras för att hålla sig under 1MB |
| Format | PNG/JPEG | PNG med maximal komprimering; JPEG om det behövs för storleken |

Denna optimering säkerställer att skärmbilder kan bearbetas effektivt utan att överskrida tokengränser.

---

## Sessionsbeteende

### Sessionstyper

MCP-servern spårar sessionstyper för att tillhandahålla lämpliga verktyg och beteende:

| Typ | Beskrivning | Auto-frånkoppling |
|------|-------------|-------------|
| `browser` | Chrome webbläsarsession | Nej |
| `ios` | iOS app-session | Ja (om `noReset: true` eller ingen `appPath`) |
| `android` | Android app-session | Ja (om `noReset: true` eller ingen `appPath`) |

### Enkelssionsmodell

MCP-servern arbetar med en **ensessionmodell**:

-   Endast en webbläsare ELLER app-session kan vara aktiv åt gången
-   Start av en ny session kommer att stänga/koppla bort den aktuella sessionen
-   Sessionstillstånd upprätthålls globalt över verktygsanrop

### Frånkoppling vs stängning

| Åtgärd | `detach: false` (Stäng) | `detach: true` (Koppla från) |
|--------|-------------------------|-------------------------|
| Webbläsare | Stänger Chrome helt | Håller Chrome igång, kopplar från WebDriver |
| Mobilapp | Avslutar appen | Håller appen igång i nuvarande tillstånd |
| Användningsfall | Rent utgångsläge för nästa session | Bevara tillstånd, manuell inspektion |

---

## Prestandaöverväganden

MCP-servern är optimerad för effektiv LLM-kommunikation med formatet **TOON (Token-Oriented Object Notation)**, vilket minimerar tokenanvändningen vid sändning av data till Claude.

### Webbläsarautomatisering

-   **Headless-läge** är snabbare men renderar inte visuella element
-   **Mindre fönsterstorlekar** minskar tiden för skärmbildstagning
-   **Elementdetektering** är optimerad med en enda skriptexekvering
-   **Skärmbildsoptimering** håller bilder under 1MB för effektiv bearbetning
-   **`inViewportOnly: true`** (standard) filtrerar till endast synliga element

### Mobilautomatisering

-   **XML-sidkällsanalys** använder endast 2 HTTP-anrop (mot 600+ för traditionella elementfrågor)
-   **Accessibility ID-väljare** är snabbast och mest pålitliga
-   **XPath-väljare** är långsammast - använd endast som en sista utväg
-   **`inViewportOnly: true`** (standard) minskar antalet element avsevärt
-   **Paginering** (`limit` och `offset`) minskar tokenanvändningen för skärmar med många element
-   **`includeBounds: false`** (standard) utelämnar koordinatdata om det inte behövs

### Tips för tokenanvändning

| Inställning | Påverkan |
|---------|--------|
| `inViewportOnly: true` | Filtrerar element utanför skärmen, minskar svarsstorlek |
| `includeContainers: false` | Utesluter layoutelement (ViewGroup, etc.) |
| `includeBounds: false` | Utelämnar x/y/bredd/höjd-data |
| `limit` med paginering | Bearbeta element i satser istället för alla på en gång |
| `namedOnly: true` (tillgänglighet) | Filtrerar anonyma noder |

---

## Appium-serverinställning

Innan du använder mobilautomatisering, se till att Appium är korrekt konfigurerat.

### Grundinställning

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

### Verifiera installation

```sh
# Kontrollera installerade drivrutiner
appium driver list --installed

# Kontrollera Appium-version
appium --version

# Testa anslutning
curl http://localhost:4723/status
```

---

## Felsökning av konfiguration

### MCP-servern startar inte

1. Verifiera att npm/npx är installerat: `npm --version`
2. Försök köra manuellt: `npx @wdio/mcp`
3. Kontrollera Claude Desktop-loggarna för fel

### Appium-anslutningsproblem

1. Verifiera att Appium körs: `curl http://localhost:4723/status`
2. Kontrollera att miljövariabler matchar Appium-serverinställningar
3. Se till att brandväggen tillåter anslutningar på Appium-porten

### Sessionen startar inte

1. **Webbläsare:** Se till att Chrome är installerat
2. **iOS:** Verifiera att Xcode och simulatorer är tillgängliga
3. **Android:** Kontrollera `ANDROID_HOME` och att emulatorn körs
4. Granska Appium-serverloggar för detaljerade felmeddelanden

### Sessionstidsbegränsningar

Om sessioner får timeout under felsökning:
1. Öka `newCommandTimeout` när du startar sessionen
2. Använd `noReset: true` för att bevara tillstånd mellan sessioner
3. Använd `detach: true` vid stängning för att hålla appen igång