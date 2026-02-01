---
id: mcp
title: MCP (Model Context Protocol)
---

## Vad kan det göra?

WebdriverIO MCP är en **Model Context Protocol (MCP) server** som gör det möjligt för AI-assistenter som Claude Desktop och Claude Code att automatisera och interagera med webbläsare och mobilapplikationer.

### Varför WebdriverIO MCP?

-   **Mobil-först**: Till skillnad från enbart webbläsarbaserade MCP-servrar stöder WebdriverIO MCP automatisering av iOS- och Android-appar via Appium
-   **Plattformsoberoende selektorer**: Smart elementdetektering genererar automatiskt flera lokaliseringsstrategier (accessibility ID, XPath, UiAutomator, iOS predicates)
-   **WebdriverIO-ekosystem**: Byggt på det beprövade WebdriverIO-ramverket med dess rika ekosystem av tjänster och rapportverktyg

Det tillhandahåller ett enhetligt gränssnitt för:

-   🖥️ **Skrivbordsbrowsers** (Chrome - med eller utan huvud)
-   📱 **Nativa mobilappar** (iOS-simulatorer / Android-emulatorer / fysiska enheter via Appium)
-   📳 **Hybrida mobilappar** (Native + WebView-kontextbyte via Appium)

genom paketet [`@wdio/mcp`](https://www.npmjs.com/package/@wdio/mcp).

Detta låter AI-assistenter:

-   **Starta och kontrollera webbläsare** med konfigurerbara dimensioner, headless-läge och valfri initial navigering
-   **Navigera webbplatser** och interagera med element (klicka, skriva, scrolla)
-   **Analysera sidinnehåll** via tillgänglighetsträd och detektering av synliga element med stöd för paginering
-   **Ta skärmdumpar** automatiskt optimerade (skalade, komprimerade till max 1MB)
-   **Hantera cookies** för sessionshantering
-   **Kontrollera mobilenheter** inklusive gester (trycka, svepa, dra och släppa)
-   **Byta kontext** i hybridappar mellan native och webview
-   **Köra skript** - JavaScript i webbläsare, Appium-mobilkommandon på enheter
-   **Hantera enhetsfunktioner** som rotation, tangentbord, geolokalisering
-   och mycket mer, se [Verktyg](./mcp/tools) och [Konfiguration](./mcp/configuration) för alternativ

:::info

OBS För mobilappar
Mobilautomatisering kräver en körande Appium-server med lämpliga drivrutiner installerade. Se [Förutsättningar](#prerequisites) för installationsinstruktioner.

:::

## Installation

Det enklaste sättet att använda `@wdio/mcp` är via npx utan lokal installation:

```sh
npx @wdio/mcp
```

Eller installera det globalt:

```sh
npm install -g @wdio/mcp
```

## Användning med Claude

För att använda WebdriverIO MCP med Claude, modifiera konfigurationsfilen:

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

Efter att ha lagt till konfigurationen, starta om Claude. WebdriverIO MCP-verktygen kommer att vara tillgängliga för automatiseringsuppgifter för webbläsare och mobil.

### Användning med Claude Code

Claude Code upptäcker automatiskt MCP-servrar. Du kan konfigurera det i ditt projekts `.claude/settings.json`, eller `.mcp.json`.

Eller lägg till det i .claude.json globalt genom att köra:
```bash
claude mcp add --transport stdio wdio-mcp -- npx -y @wdio/mcp
```
Validera det genom att köra kommandot `/mcp` inuti Claude Code.

## Snabbstartsexempel

### Webbläsarautomatisering

Be Claude att automatisera webbläsaruppgifter:

```
"Öppna Chrome och navigera till https://webdriver.io"
"Klicka på 'Get Started'-knappen"
"Ta en skärmdump av sidan"
"Hitta alla synliga länkar på sidan"
```

### Mobilappsautomatisering

Be Claude att automatisera mobilappar:

```
"Starta min iOS-app på iPhone 15-simulatorn"
"Tryck på inloggningsknappen"
"Svep upp för att scrolla ner"
"Ta en skärmdump av den nuvarande skärmen"
```

## Funktioner

### Webbläsarautomatisering (Chrome)

| Funktion | Beskrivning |
|---------|-------------|
| **Sessionshantering** | Starta Chrome i headed/headless-läge med anpassade dimensioner och valfri navigerings-URL |
| **Navigering** | Navigera till URL:er |
| **Elementinteraktion** | Klicka på element, skriv text, hitta element med olika selektorer |
| **Sidanalys** | Få synliga element (med paginering), tillgänglighetsträd (med filtrering) |
| **Skärmdumpar** | Ta skärmdumpar (auto-optimerade till max 1MB) |
| **Scrollning** | Scrolla upp/ner med konfigurerbara pixelmängder |
| **Cookie-hantering** | Hämta, sätta och ta bort cookies |
| **Skriptexekvering** | Kör anpassad JavaScript i webbläsarkontext |

### Mobilappsautomatisering (iOS/Android)

| Funktion | Beskrivning |
|---------|-------------|
| **Sessionshantering** | Starta appar på simulatorer, emulatorer eller fysiska enheter |
| **Tryckgester** | Trycka, svepa, dra och släppa |
| **Elementdetektering** | Smart elementdetektering med flera lokaliseringsstrategier och paginering |
| **Applivscykel** | Få appstatus (via `execute_script` för aktivera/avsluta) |
| **Kontextbyte** | Byt mellan native- och webview-kontexter i hybridappar |
| **Enhetskontroll** | Rotera enhet, tangentbordskontroll |
| **Geolokalisering** | Hämta och sätt enhetens GPS-koordinater |
| **Behörigheter** | Automatisk hantering av behörigheter och varningar |
| **Skriptexekvering** | Kör Appium mobilkommandon (pressKey, deepLink, shell, etc.) |

## Förutsättningar

### Webbläsarautomatisering

-   **Chrome** måste vara installerat på ditt system
-   WebdriverIO hanterar automatiserad ChromeDriver-hantering

### Mobilautomatisering

#### iOS

1. **Installera Xcode** från Mac App Store
2. **Installera Xcode Command Line Tools**:
   ```sh
   xcode-select --install
   ```
3. **Installera Appium**:
   ```sh
   npm install -g appium
   ```
4. **Installera XCUITest-drivrutinen**:
   ```sh
   appium driver install xcuitest
   ```
5. **Starta Appium-servern**:
   ```sh
   appium
   ```
6. **För simulatorer**: Öppna Xcode → Window → Devices and Simulators för att skapa/hantera simulatorer
7. **För fysiska enheter**: Du behöver enhetens UDID (40-teckens unik identifierare)

#### Android

1. **Installera Android Studio** och konfigurera Android SDK
2. **Ställ in miljövariabler**:
   ```sh
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```
3. **Installera Appium**:
   ```sh
   npm install -g appium
   ```
4. **Installera UiAutomator2-drivrutinen**:
   ```sh
   appium driver install uiautomator2
   ```
5. **Starta Appium-servern**:
   ```sh
   appium
   ```
6. **Skapa en emulator** via Android Studio → Virtual Device Manager
7. **Starta emulatorn** innan tester körs

## Arkitektur

### Hur det fungerar

WebdriverIO MCP fungerar som en brygga mellan AI-assistenter och webbläsar-/mobilautomatisering:

```
┌─────────────────┐     MCP Protocol      ┌─────────────────┐
│  Claude Desktop │ ◄──────────────────►  │    @wdio/mcp    │
│  or Claude Code │      (stdio)          │     Server      │
└─────────────────┘                       └────────┬────────┘
                                                   │
                                             WebDriverIO API
                                                   │
                    ┌──────────────────────────────┼──────────────────────────────┐
                    │                              │                              │
            ┌───────▼───────┐             ┌───────▼───────┐             ┌───────▼───────┐
            │    Chrome     │             │    Appium     │             │    Appium     │
            │   (Browser)   │             │     (iOS)     │             │   (Android)   │
            └───────────────┘             └───────────────┘             └───────────────┘
```

### Sessionshantering

-   **Enkeltsessionsmodell**: Endast en webbläsar- ELLER appsession kan vara aktiv åt gången
-   **Sessionstillstånd** upprätthålls globalt över verktygsanrop
-   **Auto-detach**: Sessioner med bevarat tillstånd (`noReset: true`) kopplas automatiskt bort vid stängning

### Elementdetektering

#### Webbläsare (Web)

-   Använder ett optimerat webbläsarskript för att hitta alla synliga, interaktiva element
-   Returnerar element med CSS-selektorer, ID:n, klasser och ARIA-information
-   Filtrerar som standard till viewport-synliga element

#### Mobil (Nativa appar)

-   Använder effektiv XML-sidkällsparsning (2 HTTP-anrop mot 600+ för traditionella sökningar)
-   Plattformsspecifik elementklassificering för Android och iOS
-   Genererar flera lokaliseringsstrategier per element:
    -   Accessibility ID (plattformsoberoende, mest stabilt)
    -   Resource ID / Name-attribut
    -   Text / Label-matchning
    -   XPath (fullständig och förenklad)
    -   UiAutomator (Android) / Predicates (iOS)

## Selektorsyntax

MCP-servern stöder flera selektorstrategier. Se [Selektorer](./mcp/selectors) för detaljerad dokumentation.

### Webb (CSS/XPath)

```
# CSS Selektorer
button.my-class
#element-id
[data-testid="login"]

# XPath
//button[@class='submit']
//a[contains(text(), 'Click')]

# Text Selektorer (WebdriverIO-specifika)
button=Exact Button Text
a*=Partial Link Text
```

### Mobil (Plattformsoberoende)

```
# Accessibility ID (rekommenderas - fungerar på iOS & Android)
~loginButton

# Android UiAutomator
android=new UiSelector().text("Login")

# iOS Predicate String
-ios predicate string:label == "Login"

# iOS Class Chain
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# XPath (fungerar på båda plattformarna)
//android.widget.Button[@text="Login"]
//XCUIElementTypeButton[@label="Login"]
```

## Tillgängliga verktyg

MCP-servern tillhandahåller 25 verktyg för webbläsar- och mobilautomatisering. Se [Verktyg](./mcp/tools) för fullständig referens.

### Webbläsarverktyg

| Verktyg | Beskrivning |
|------|-------------|
| `start_browser` | Starta Chrome-webbläsare (med valfri initial URL) |
| `close_session` | Stäng eller koppla från session |
| `navigate` | Navigera till en URL |
| `click_element` | Klicka på ett element |
| `set_value` | Skriv text i inmatningsfält |
| `get_visible_elements` | Hämta synliga/interaktiva element (med paginering) |
| `get_accessibility` | Hämta tillgänglighetsträd (med filtrering) |
| `take_screenshot` | Ta skärmdump (auto-optimerad) |
| `scroll` | Scrolla sidan upp eller ner |
| `get_cookies` / `set_cookie` / `delete_cookies` | Cookie-hantering |
| `execute_script` | Kör JavaScript i webbläsarkontext |

### Mobilverktyg

| Verktyg | Beskrivning |
|------|-------------|
| `start_app_session` | Starta iOS/Android-app |
| `tap_element` | Tryck på element eller koordinater |
| `swipe` | Svep i en riktning |
| `drag_and_drop` | Dra mellan platser |
| `get_app_state` | Kontrollera om appen körs |
| `get_contexts` / `switch_context` | Kontextbyte i hybridappar |
| `rotate_device` | Rotera till porträtt/landskap |
| `get_geolocation` / `set_geolocation` | Hämta eller ställ in GPS-koordinater |
| `hide_keyboard` | Göm skärmtangentbord |
| `execute_script` | Kör Appium mobilkommandon |

## Automatisk hantering

### Behörigheter

Som standard beviljar MCP-servern automatiskt appbehörigheter (`autoGrantPermissions: true`), vilket eliminerar behovet av att manuellt hantera behörighetsdialogrutor under automatisering.

### Systemvarningar

Systemvarningar (som "Tillåt notiser?") accepteras automatiskt som standard (`autoAcceptAlerts: true`). Detta kan konfigureras för att avvisa istället med `autoDismissAlerts: true`.

## Konfiguration

### Miljövariabler

Konfigurera Appium-serveranslutningen:

| Variabel | Standard | Beskrivning |
|----------|---------|-------------|
| `APPIUM_URL` | `127.0.0.1` | Appium-server värdnamn |
| `APPIUM_URL_PORT` | `4723` | Appium-server port |
| `APPIUM_PATH` | `/` | Appium-server sökväg |

### Exempel med anpassad Appium-server

```json
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"],
            "env": {
                "APPIUM_URL": "192.168.1.100",
                "APPIUM_URL_PORT": "4724"
            }
        }
    }
}
```

## Prestandaoptimering

MCP-servern är optimerad för effektiv AI-assistentkommunikation:

-   **TOON-format**: Använder Token-Oriented Object Notation för minimal tokenanvändning
-   **XML-parsning**: Mobilelementdetektering använder 2 HTTP-anrop (mot 600+ traditionellt)
-   **Skärmdumpkompression**: Bilder auto-komprimeras till max 1MB med hjälp av Sharp
-   **Viewport-filtrering**: Som standard returneras endast synliga element
-   **Paginering**: Stora elementlistor kan pagineras för att minska svarsstorlek

## TypeScript-stöd

MCP-servern är skriven i TypeScript och inkluderar fullständiga typdefinitioner. Om du utökar eller integrerar med servern programmatiskt kommer du att dra nytta av auto-komplettering och typsäkerhet.

## Felhantering

Alla verktyg är designade med robust felhantering:

-   Fel returneras som textinnehåll (aldrig kastade), vilket bibehåller MCP-protokollets stabilitet
-   Beskrivande felmeddelanden hjälper till att diagnostisera problem
-   Sessionstillståndet bevaras även när enskilda operationer misslyckas

## Användningsfall

### Kvalitetssäkring

-   AI-driven testkörning
-   Visuell regressionstestning med skärmdumpar
-   Tillgänglighetsgranskningar via analys av tillgänglighetsträd

### Webbskrapning & Dataextraktion

-   Navigera komplexa flersidesflöden
-   Extrahera strukturerad data från dynamiskt innehåll
-   Hantera autentisering och sessionshantering

### Mobilapptestning

-   Plattformsoberoende testautomatisering (iOS + Android)
-   Onboardingflödesvalidering
-   Djuplänkning och navigeringstestning

### Integrationstestning

-   End-to-end-arbetsflödestestning
-   API + UI-integrationsverifiering
-   Multiplattformskonsistenskontroller

## Felsökning

### Webbläsaren startar inte

-   Säkerställ att Chrome är installerat
-   Kontrollera att ingen annan process använder standardfelsökningsporten (9222)
-   Försök med headless-läge om displayproblem uppstår

### Appium-anslutning misslyckades

-   Verifiera att Appium-servern körs (`appium`)
-   Kontrollera Appium URL- och portkonfigurationen
-   Säkerställ att lämplig drivrutin är installerad (`appium driver list`)

### iOS Simulator-problem

-   Säkerställ att Xcode är installerat och uppdaterat
-   Kontrollera att simulatorer är tillgängliga (`xcrun simctl list devices`)
-   För fysiska enheter, verifiera att UDID är korrekt

### Android Emulator-problem

-   Säkerställ att Android SDK är korrekt konfigurerat
-   Verifiera att emulatorn körs (`adb devices`)
-   Kontrollera att miljövariabeln `ANDROID_HOME` är inställd

## Resurser

-   [Verktygsreferens](./mcp/tools) - Komplett lista över tillgängliga verktyg
-   [Selektorguide](./mcp/selectors) - Dokumentation för selektorsyntax
-   [Konfiguration](./mcp/configuration) - Konfigurationsalternativ
-   [FAQ](./mcp/faq) - Vanliga frågor
-   [GitHub-repository](https://github.com/webdriverio/mcp) - Källkod och problem
-   [NPM-paket](https://www.npmjs.com/package/@wdio/mcp) - Paket på npm
-   [Model Context Protocol](https://modelcontextprotocol.io/) - MCP-specifikation