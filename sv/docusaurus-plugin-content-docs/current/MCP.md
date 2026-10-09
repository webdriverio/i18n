---
id: mcp
title: MCP (Model Context Protocol)
description: "Låt AI-assistenter automatisera webbläsare och mobilappar via WebdriverIO MCP-servern, inklusive installation, användning med Claude och tillgängliga verktyg."
---

## Vad kan den göra?

WebdriverIO MCP är en **Model Context Protocol (MCP)-server** som gör det möjligt för AI-assistenter att automatisera och interagera med webbläsare och mobilapplikationer.

### Varför WebdriverIO MCP?

-   **Mobile-First**: Till skillnad från MCP-servrar som bara stöder webbläsare har WebdriverIO MCP stöd för automatisering av native-appar på iOS och Android via Appium
-   **Plattformsoberoende selektorer**: Smart elementdetektering genererar automatiskt flera lokaliseringsstrategier (accessibility ID, XPath, UiAutomator, iOS predicates)
-   **WebdriverIO-ekosystemet**: Byggt på det beprövade WebdriverIO-ramverket med dess rika ekosystem av tjänster och rapportörer

Den tillhandahåller ett enhetligt gränssnitt för:

-   🖥️ **Skrivbordswebbläsare** (Chrome, Firefox, Edge, Safari, med eller utan grafiskt gränssnitt)
-   📱 **Native mobilappar** (iOS-simulatorer / Android-emulatorer / riktiga enheter via Appium)
-   📳 **Hybrida mobilappar** (växling mellan Native- och WebView-kontext via Appium)
-   ☁️ **Molnenheter** (BrowserStack, Sauce Labs, TestMu-moln med riktiga enheter och webbläsare)

genom paketet [`@wdio/mcp`](https://www.npmjs.com/package/@wdio/mcp).

Detta gör det möjligt för AI-assistenter att:

-   **Starta och styra webbläsare** med konfigurerbara dimensioner, headless-läge och valfri initial navigering
-   **Navigera på webbplatser** och interagera med element (klicka, skriva, scrolla)
-   **Analysera sidinnehåll** via tillgänglighetsträdet och detektering av synliga element med stöd för paginering
-   **Ta skärmdumpar** som optimeras automatiskt (storleksändras, komprimeras till max 1 MB)
-   **Hantera cookies** för sessionshantering
-   **Styra mobila enheter** inklusive gester (tryck, svep, dra och släpp)
-   **Växla kontext** i hybridappar mellan native och webview
-   **Köra skript** - JavaScript i webbläsare, Appium-mobilkommandon på enheter
-   **Hantera enhetsfunktioner** som rotation, tangentbord, geolokalisering
-   och mycket mer, se alternativen för [Verktyg](./mcp/tools) och [Konfiguration](./mcp/configuration)

:::info

OBS för mobilappar
Mobilautomatisering kräver en körande Appium-server med lämpliga drivrutiner installerade. Se [Förutsättningar](#prerequisites) för installationsinstruktioner.

:::

## Installation

Det enklaste sättet att använda `@wdio/mcp` är via npx utan någon lokal installation:

```sh
npx @wdio/mcp
```

Eller installera det globalt:

```sh
npm install -g @wdio/mcp
```

## Användning med Claude

För att använda WebdriverIO MCP med Claude, ändra konfigurationsfilen:

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

Efter att du har lagt till konfigurationen, starta om din klient. WebdriverIO MCP-verktygen blir då tillgängliga för automatiseringsuppgifter i webbläsare och på mobil.

### Användning med Claude Code

Claude Code upptäcker MCP-servrar automatiskt. Du kan konfigurera den i ditt projekts `.claude/settings.json` eller `.mcp.json`.

Eller lägg till den globalt i .claude.json genom att köra:
```bash
claude mcp add --transport stdio wdio-mcp -- npx -y @wdio/mcp
```
Verifiera den genom att köra kommandot `/mcp` i Claude Code.

## Snabbstartsexempel

### Webbläsarautomatisering

Be Claude att automatisera webbläsaruppgifter:

```
"Open Chrome and navigate to https://webdriver.io"
"Click the 'Get Started' button"
"Take a screenshot of the page"
"Find all visible links on the page"
```

### Automatisering av mobilappar

Be Claude att automatisera mobilappar:

```
"Start my iOS app on the iPhone 15 simulator"
"Tap the login button"
"Swipe up to scroll down"
"Take a screenshot of the current screen"
```

## Funktioner

### Webbläsarautomatisering

| Funktion | Beskrivning |
|---------|-------------|
| **Sessionshantering** | Starta Chrome, Firefox, Edge eller Safari i headed/headless-läge med anpassade dimensioner; anslut till en befintlig Chrome-instans via CDP |
| **Navigering** | Navigera till URL:er; hantera flera flikar |
| **Elementinteraktion** | Klicka på element, skriva text, hitta element med olika selektorer |
| **Sidanalys** | Hämta interagerbara element (med paginering), tillgänglighetsträd (med rollfiltrering) |
| **Skärmdumpar** | Ta skärmdumpar (automatiskt optimerade till max 1 MB) |
| **Scrollning** | Scrolla upp/ner med konfigurerbart antal pixlar |
| **Cookiehantering** | Hämta, sätta och ta bort cookies |
| **Enhetsemulering** | Emulera mobil-/surfplatte-viewports i webbläsaren (kräver BiDi) |
| **Skriptkörning** | Kör anpassad JavaScript i webbläsarkontexten |

### Automatisering av mobilappar (iOS/Android)

| Funktion | Beskrivning |
|---------|-------------|
| **Sessionshantering** | Starta appar på simulatorer, emulatorer eller riktiga enheter |
| **Pekgester** | Tryck (element eller koordinater), svep, dra och släpp |
| **Elementdetektering** | Smart elementdetektering med flera lokaliseringsstrategier och paginering |
| **Appens livscykel** | Hämta appens tillstånd (förgrund, bakgrund, körs inte, inte installerad) |
| **Kontextväxling** | Växla mellan native- och webview-kontexter i hybridappar |
| **Enhetskontroll** | Rotera enheten, tangentbordskontroll, GPS-åsidosättning |
| **Behörigheter** | Automatisk hantering av behörigheter och aviseringar |
| **Skriptkörning** | Kör Appium-mobilkommandon (pressKey, deepLink, shell, etc.) |

### Molnleverantörer

| Funktion | Beskrivning |
|---------|-------------|
| **Webbläsarsessioner** | Kör webbläsarsessioner på BrowserStack, Sauce Labs, TestMu eller TestingBot (Windows, macOS, Linux) |
| **Mobilsessioner** | Kör appsessioner på riktiga enheter via BrowserStack, Sauce Labs, TestMu eller TestingBot |
| **Apphantering** | Ladda upp `.apk`/`.ipa`-filer; lista tidigare uppladdade appar hos alla fyra leverantörerna |
| **Lokal tunnel** | Hanterar automatiskt leverantörsspecifika tunnelbinärer för åtkomst till localhost |
| **Rapportering** | Tagga sessioner med projekt-/bygg-/sessionsetiketter (fungerar identiskt hos alla leverantörer) |

## Förutsättningar

### Webbläsarautomatisering

-   **Chrome, Firefox, Edge eller Safari** måste vara installerad
-   WebdriverIO hanterar drivrutinerna automatiskt

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
7. **För riktiga enheter**: Du behöver enhetens UDID (unik identifierare på 40 tecken)

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
7. **Starta emulatorn** innan du kör tester

## Arkitektur

### Hur det fungerar

WebdriverIO MCP fungerar som en brygga mellan AI-assistenter och automatisering av webbläsare/mobil:

```
┌─────────────────┐     MCP Protocol      ┌─────────────────┐
│  Claude Desktop │ ◄──────────────────►  │    @wdio/mcp    │
│  or Claude Code │   (stdio or HTTP)     │     Server      │
└─────────────────┘                       └────────┬────────┘
                                                   │
                                             WebDriverIO API
                                                   │
                    ┌──────────────────────────────┼──────────────────────────────┐
                    │                              │                              │
            ┌───────▼───────┐             ┌───────▼───────┐             ┌───────▼───────┐
            │    Browser    │             │    Appium     │             │   Cloud        │
            │ (local/CDP)   │             │  (iOS/Android)│             │   Providers    │
            └───────────────┘             └───────────────┘             └───────────────┘
```

### Sessionshantering

-   **Enkelsessionsmodell**: Endast en webbläsar- ELLER appsession kan vara aktiv åt gången
-   **Sessionstillståndet** upprätthålls globalt mellan verktygsanrop
-   **Automatisk frånkoppling**: Sessioner med bevarat tillstånd (`noReset: true`) kopplas automatiskt från vid stängning

### Elementdetektering

#### Webbläsare (webb)

-   Använder ett optimerat webbläsarskript för att hitta alla synliga, interagerbara element
-   Returnerar element med CSS-selektorer, ID:n, klasser och ARIA-information
-   Stöder viewport-filtrering och paginering

#### Mobil (native-appar)

-   Använder effektiv parsning av XML-sidkällan (2 HTTP-anrop jämfört med 600+ för traditionella förfrågningar)
-   Plattformsspecifik elementklassificering för Android och iOS
-   Genererar flera lokaliseringsstrategier per element:
    -   Accessibility ID (plattformsoberoende, mest stabil)
    -   Resource ID / Name-attribut
    -   Matchning av text / etikett
    -   XPath (fullständig och förenklad)
    -   UiAutomator (Android) / Predicates (iOS)

## Selektorsyntax

MCP-servern stöder flera selektorstrategier. Se [Selektorer](./mcp/selectors) för detaljerad dokumentation.

### Webb (CSS/XPath)

```
# CSS-selektorer
button.my-class
#element-id
[data-testid="login"]

# XPath
//button[@class='submit']
//a[contains(text(), 'Click')]

# Textselektorer (WebdriverIO-specifika)
button=Exact Button Text
a*=Partial Link Text
```

### Mobil (plattformsoberoende)

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

MCP-servern tillhandahåller 29 verktyg för automatisering av webbläsare och mobil. Se [Verktyg](./mcp/tools) för den fullständiga referensen.

| Verktyg | Plattform | Beskrivning |
|------|----------|-------------|
| `start_session` | alla | Starta en webbläsar- eller mobilsession (lokal eller molnleverantör) |
| `close_session` | alla | Stäng eller koppla från den aktuella sessionen |
| `launch_chrome` | webbläsare | Öppna Chrome med fjärrfelsökning för CDP-anslutning |
| `navigate` | webbläsare | Ladda en URL i den aktuella fliken |
| `get_tabs` | webbläsare | Lista alla öppna flikar |
| `switch_tab` | webbläsare | Fokusera en flik via handle eller index |
| `switch_frame` | webbläsare | Växla in i en iframe via selektor, eller tillbaka till toppnivån |
| `click_element` | webbläsare | Klicka på ett element |
| `set_value` | alla | Skriv text i ett inmatningsfält |
| `scroll` | webbläsare | Scrolla sidan uppåt eller nedåt |
| `get_elements` | alla | Hämta interagerbara element (med filtrering + paginering) |
| `get_accessibility_tree` | webbläsare | Hämta tillgänglighetsträdet (med rollfiltrering) |
| `get_screenshot` | alla | Ta en skärmdump (automatiskt optimerad) |
| `get_cookies` | webbläsare | Hämta alla cookies eller en specifik cookie |
| `set_cookie` | webbläsare | Sätt en webbläsarcookie |
| `delete_cookies` | webbläsare | Ta bort alla eller en cookie |
| `emulate_device` | webbläsare | Emulera en mobil-/surfplatte-viewport |
| `execute_script` | alla | Kör JavaScript (webbläsare) eller Appium-kommandon (mobil) |
| `tap_element` | mobil | Tryck på ett element eller skärmkoordinater |
| `swipe` | mobil | Svepgest i en riktning |
| `drag_and_drop` | mobil | Dra mellan element eller koordinater |
| `get_contexts` | mobil | Lista tillgängliga native-/webview-kontexter |
| `switch_context` | mobil | Växla mellan native- och webview-kontexter |
| `rotate_device` | mobil | Rotera till stående eller liggande läge |
| `hide_keyboard` | mobil | Dölj programvarutangentbordet |
| `set_geolocation` | alla | Åsidosätt enhetens GPS-koordinater |
| `get_app_state` | mobil | Hämta appens livscykeltillstånd |
| `list_apps` | moln | Lista uppladdade appar (BrowserStack, Sauce Labs, TestMu, TestingBot) |
| `upload_app` | moln | Ladda upp en `.apk`/`.ipa` till en molnleverantör |

## MCP-resurser

Utöver verktyg exponerar servern det aktuella sessionstillståndet som MCP-resurser. Se [Resurser](./mcp/resources) för den fullständiga referensen.

| Resurs-URI | Beskrivning |
|-------------|-------------|
| `wdio://sessions` | Index över alla sessioner |
| `wdio://session/current/elements` | Interagerbara element (föredra framför skärmdump) |
| `wdio://session/current/screenshot` | Skärmdump som base64 |
| `wdio://session/current/accessibility` | Tillgänglighetsträd |
| `wdio://session/current/cookies` | Webbläsarcookies |
| `wdio://session/current/tabs` | Öppna webbläsarflikar |
| `wdio://session/current/contexts` | Tillgängliga mobilkontexter |
| `wdio://session/current/context` | Aktiv mobilkontext |
| `wdio://session/current/app-state/{bundleId}` | Mobilappens livscykeltillstånd |
| `wdio://session/current/geolocation` | Aktuell GPS-åsidosättning |
| `wdio://session/current/logs` | Sessionsloggar (webbläsarkonsol, logcat, kraschlogg) |
| `wdio://session/current/capabilities` | Råa WebDriver-capabilities |
| `wdio://session/current/code` | Genererad WebdriverIO JS |
| `wdio://session/current/steps` | Sessionens steglogg |
| `wdio://session/{sessionId}/code` | Genererad JS för tidigare session |
| `wdio://session/{sessionId}/steps` | Steg för tidigare session |
| `wdio://browserstack/local-binary` | Installationsinstruktioner för BrowserStack Local |
| `wdio://saucelabs/local-binary` | Installationsinstruktioner för Sauce Connect Proxy |
| `wdio://testmu/local-binary` | Installationsinstruktioner för TestMu Tunnel |
| `wdio://testingbot/local-binary` | Installationsinstruktioner för TestingBot Tunnel |

## Automatisk hantering

### Behörigheter

Som standard beviljar MCP-servern automatiskt appbehörigheter (`autoGrantPermissions: true`), vilket eliminerar behovet av att manuellt hantera behörighetsdialoger under automatiseringen.

### Systemaviseringar

Systemaviseringar (som "Tillåt notiser?") accepteras automatiskt som standard (`autoAcceptAlerts: true`). Detta kan konfigureras att istället avvisa dem med `autoDismissAlerts: true`.

## Transport

Som standard körs servern över **stdio** (startas som en underprocess av AI-klienten). För klienter som inte stöder underprocessbaserad MCP (llama.cpp, Codex secure mode), använd **HTTP-transport**:

```bash
npx @wdio/mcp --http --port 3000
```

Se [Transport](./mcp/transport) för alla alternativ, inklusive `--allowedHosts` och `--allowedOrigins`.

## Prestandaoptimering

MCP-servern är optimerad för effektiv kommunikation med AI-assistenter:

-   **TOON-format**: Använder Token-Oriented Object Notation för minimal tokenanvändning
-   **XML-parsning**: Detektering av mobilelement använder 2 HTTP-anrop (jämfört med 600+ traditionellt)
-   **Komprimering av skärmdumpar**: Bilder komprimeras automatiskt till max 1 MB
-   **Viewport-filtrering**: Endast synliga element returneras som standard
-   **Paginering**: Stora elementlistor kan pagineras för att minska svarsstorleken

## Felhantering

Alla verktyg är utformade med robust felhantering:

-   Fel returneras som textinnehåll (kastas aldrig), vilket bibehåller MCP-protokollets stabilitet
-   Beskrivande felmeddelanden hjälper till att diagnostisera problem
-   Sessionstillståndet bevaras även när enskilda operationer misslyckas

## Användningsområden

### Kvalitetssäkring

-   AI-driven körning av testfall
-   Visuell regressionstestning med skärmdumpar
-   Tillgänglighetsgranskning via analys av tillgänglighetsträdet

### Webbskrapning och dataextraktion

-   Navigera komplexa flöden över flera sidor
-   Extrahera strukturerad data från dynamiskt innehåll
-   Hantera autentisering och sessionshantering

### Testning av mobilappar

-   Plattformsoberoende testautomatisering (iOS + Android)
-   Validering av onboarding-flöden
-   Testning av djuplänkar och navigering

### Integrationstestning

-   End-to-end-testning av arbetsflöden
-   Verifiering av API- + UI-integration
-   Konsekvenskontroller över flera plattformar

## Felsökning

### Webbläsaren startar inte

-   Se till att målwebbläsaren är installerad
-   Kontrollera att ingen annan process använder standardporten för felsökning (9222)
-   Prova headless-läge om problem med skärmen uppstår

### Anslutningen till Appium misslyckades

-   Kontrollera att Appium-servern körs (`appium`)
-   Kontrollera Appium-värd och port i `appiumConfig`
-   Se till att rätt drivrutin är installerad (`appium driver list`)

### Problem med iOS-simulatorn

-   Se till att Xcode är installerat och uppdaterat
-   Kontrollera att simulatorer finns tillgängliga (`xcrun simctl list devices`)
-   För riktiga enheter, kontrollera att UDID är korrekt

### Problem med Android-emulatorn

-   Se till att Android SDK är korrekt konfigurerat
-   Kontrollera att emulatorn körs (`adb devices`)
-   Kontrollera att miljövariabeln `ANDROID_HOME` är satt

## Resurser

-   [Verktygsreferens](./mcp/tools) - Fullständig lista över tillgängliga verktyg
-   [Resursreferens](./mcp/resources) - MCP-resurser för aktuellt sessionstillstånd
-   [Selektorguide](./mcp/selectors) - Dokumentation av selektorsyntax
-   [Konfiguration](./mcp/configuration) - Konfigurationsalternativ
-   [Transport](./mcp/transport) - Konfiguration av HTTP-transport
-   [Molnleverantörer](./mcp/cloud-providers) - Molnintegration med BrowserStack, Sauce Labs, TestMu och TestingBot
-   [Vanliga frågor](./mcp/faq) - Vanliga frågor och svar
-   [GitHub-repository](https://github.com/webdriverio/mcp) - Källkod och ärenden
-   [NPM-paket](https://www.npmjs.com/package/@wdio/mcp) - Paketet på npm
-   [Model Context Protocol](https://modelcontextprotocol.io/) - MCP-specifikationen