---
id: faq
title: Vanliga frågor
description: "Hitta svar på vanliga frågor om installation, användning och felsökning av WebdriverIO MCP-servern för webbläsar- och mobilautomatisering."
---

Vanliga frågor om WebdriverIO MCP.

## Allmänt

### Vad är MCP?

MCP (Model Context Protocol) är ett öppet protokoll som gör det möjligt för AI-assistenter som Claude att interagera med externa verktyg och tjänster. WebdriverIO MCP implementerar detta protokoll för att erbjuda funktioner för webbläsar- och mobilautomatisering till Claude Desktop och Claude Code.

### Vad kan jag automatisera med WebdriverIO MCP?

Du kan automatisera:
-   **Skrivbordswebbläsare** (Chrome, Firefox, Edge, Safari) - navigering, klickning, skrivning, skärmdumpar
-   **iOS-appar** - på simulatorer eller riktiga enheter
-   **Android-appar** - på emulatorer eller riktiga enheter
-   **Hybridappar** - växling mellan native- och webbkontexter
-   **Molnenheter** - via enhetsmolnen BrowserStack, Sauce Labs, TestMu och TestingBot

### Behöver jag skriva kod?

Nej! Det är den största fördelen med MCP. Du kan beskriva vad du vill göra med naturligt språk, och Claude använder lämpliga verktyg för att utföra uppgiften.

**Exempel på prompter:**
-   "Öppna Chrome och navigera till webdriver.io"
-   "Klicka på knappen Get Started"
-   "Ta en skärmdump av den aktuella sidan"
-   "Starta min iOS-app och logga in som testanvändare"

## Installation och konfiguration

### Hur installerar jag WebdriverIO MCP?

Du behöver inte installera den separat. MCP-servern körs automatiskt via npx när du konfigurerar den i din harness. Lägg till detta i din konfiguration:

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

### Var finns konfigurationsfilen för Claude Desktop?

-   **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
-   **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

### Behöver jag Appium för webbläsarautomatisering?

Nej. Webbläsarautomatisering kräver bara att målwebbläsaren är installerad. WebdriverIO hanterar drivrutinerna automatiskt.

### Behöver jag Appium för mobilautomatisering?

Ja. Mobilautomatisering kräver:
1. En körande Appium-server (`npm install -g appium && appium`)
2. Installerade plattformsdrivrutiner (`appium driver install xcuitest` för iOS, `appium driver install uiautomator2` för Android)
3. Lämpliga utvecklingsverktyg (Xcode för iOS, Android SDK för Android)

## Webbläsarautomatisering

### Vilka webbläsare stöds?

Chrome, Firefox, Edge och Safari stöds alla. Använd parametern `browser` i `start_session`:

```text
"Start a Firefox session"
"Start Chrome in headless mode"
```

### Kan jag köra webbläsaren i headless-läge?

Ja. Headless är standard (`headless: true`). Be Claude att köra med synligt fönster om du vill se webbläsaren:

"Starta Chrome i headed-läge (inte headless)"

### Kan jag ställa in webbläsarfönstrets storlek?

Ja. Du kan ange dimensioner när du startar webbläsaren:

"Starta Chrome med en fönsterstorlek på 1920x1080"

Dimensioner som stöds: 400–3840 pixlar breda, 400–2160 pixlar höga. Standard är 1920×1080.

### Kan jag starta webbläsaren och navigera i ett steg?

Ja! Använd parametern `navigationUrl`:

"Starta Chrome och navigera till https://webdriver.io"

Detta är effektivare än att starta webbläsaren och sedan navigera separat.

### Hur tar jag skärmdumpar?

Fråga helt enkelt:

"Ta en skärmdump av den aktuella sidan"

Skärmdumpar optimeras automatiskt:
- Skalas till max 2000px
- Komprimeras till max 1MB filstorlek
- Format: PNG eller JPEG (väljs automatiskt för optimal kvalitet)

### Kan jag interagera med iframes?

Ja. Använd verktyget `switch_frame` för att växla in i en iframe med en CSS- eller XPath-selektor. Alla efterföljande anrop till `click_element`, `set_value` och `get_elements` utförs inom den valda ramen. Utelämna selektorn för att växla tillbaka till ramen på toppnivå. Iframes måste ha samma ursprung som huvudsidan.

### Kan jag köra egen JavaScript?

Ja! Använd verktyget `execute_script`:

"Kör skript för att hämta sidans titel"
"Kör skript: return document.querySelectorAll('button').length"

### Kan jag ansluta till en befintlig Chrome-session?

Ja. Använd först `launch_chrome` (öppnar Chrome med fjärrfelsökning), sedan `start_session` med `attach: true`.

"Starta Chrome med fjärrfelsökning och anslut sedan till den"

### Kan jag arbeta med flera flikar?

Ja. Använd `get_tabs` för att lista öppna flikar och `switch_tab` för att fokusera på en specifik flik:

"Hämta alla öppna flikar"
"Växla till fliken med index 1"

## Mobilautomatisering

### Hur startar jag en iOS- eller Android-session?

Använd `start_session` med lämplig plattform:

"Starta min iOS-app som finns på /path/to/MyApp.app på iPhone 15-simulatorn"

"Starta min Android-app på /path/to/app.apk på Pixel 7-emulatorn"

Eller för en redan installerad app:

"Starta appen med noReset aktiverat på iPhone 15-simulatorn"

### Kan jag testa på riktiga enheter?

Ja! För riktiga enheter behöver du enhetens UDID:

-   **iOS:** Anslut enheten, öppna Finder, klicka på enheten och klicka på serienumret för att visa UDID
-   **Android:** Kör `adb devices` i terminalen

Fråga sedan:

"Starta min iOS-app på den riktiga enheten med UDID abc123..."

### Hur hanterar jag behörighetsdialoger?

Som standard beviljas behörigheter automatiskt (`autoGrantPermissions: true`). Om du behöver testa behörighetsflöden kan du inaktivera detta:

"Starta min app utan att automatiskt bevilja behörigheter"

### Vilka gester stöds?

-   **Tryck:** Tryck på element eller koordinater (`tap_element`)
-   **Svep:** Svep uppåt, nedåt, åt vänster eller höger (`swipe`)
-   **Dra och släpp:** Dra från ett element till ett annat eller till koordinater (`drag_and_drop`)

Obs: `long_press` är tillgängligt via `execute_script` med Appiums mobilkommandon.

### Hur scrollar jag i mobilappar?

Använd svepgester:

"Svep uppåt för att scrolla nedåt"
"Svep nedåt för att scrolla uppåt"

### Kan jag rotera enheten?

Ja:

"Rotera enheten till liggande läge"
"Rotera enheten till stående läge"

### Hur hanterar jag hybridappar?

För appar med webbvyer kan du växla kontext:

"Hämta tillgängliga kontexter"
"Växla till webview-kontexten"
"Växla tillbaka till native-kontexten"

### Kan jag köra Appiums mobilkommandon?

Ja! Använd verktyget `execute_script`:

```text
Execute script "mobile: pressKey" with args [{ keycode: 4 }]  // Tryck på BACK på Android
Execute script "mobile: activateApp" with args [{ bundleId: "com.example.app" }]
Execute script "mobile: terminateApp" with args [{ bundleId: "com.example.app" }]
```

## Elementval

### Hur vet AI-assistenten vilket element den ska interagera med?

Den använder resursen `wdio://session/current/elements` eller verktyget `get_elements` för att identifiera interaktiva element på sidan/skärmen. Varje element levereras med färdiga selektorer.

### Vad händer om det finns för många element på sidan?

Använd paginering för att hantera stora elementlistor:

"Hämta de första 20 elementen"
"Hämta element med offset 20 och limit 20"

Svaret innehåller `total`, `showing` och `hasMore` för att hjälpa dig att navigera bland elementen.

### Vad händer om Claude klickar på fel element?

Du kan vara mer specifik:

-   Ange exakt text: "Klicka på knappen med texten 'Submit Order'"
-   Ange selektor: "Klicka på elementet med selektorn #submit-btn"
-   Ange tillgänglighets-ID: "Klicka på elementet med tillgänglighets-ID loginButton"

### Vilken är den bästa selektorstrategin för mobil?

1. **Accessibility ID** (bäst) - `~loginButton`
2. **Resource ID** (Android) - `id=login_button`
3. **Predicate String** (iOS) - `-ios predicate string:label == "Login"`
4. **XPath** (sista utväg) - långsammare men fungerar överallt

### Vad är tillgänglighetsträdet och när ska jag använda det?

Tillgänglighetsträdet ger semantisk information om sidans element (roller, namn, tillstånd). Använd `get_accessibility_tree` när:
- `get_elements` inte returnerar förväntade element
- Du behöver hitta element efter tillgänglighetsroll (button, link, textbox osv.)
- Du behöver detaljerad semantisk information om element

"Hämta tillgänglighetsträdet filtrerat på rollerna button och link"

## Sessionshantering

### Kan jag ha flera sessioner samtidigt?

Nej. MCP-servern använder en modell med en enda session. Endast en webbläsar- eller appsession kan vara aktiv åt gången.

### Vad händer när jag stänger en session?

Det beror på sessionstyp och inställningar:

-   **Webbläsare:** Webbläsaren stängs helt
-   **Mobil med `noReset: false`:** Appen avslutas
-   **Mobil med `noReset: true` eller utan `appPath`:** Appen förblir öppen (sessionen kopplas från automatiskt)

### Kan jag bevara appens tillstånd mellan sessioner?

Ja! Använd alternativet `noReset`:

"Starta min app med noReset aktiverat"

Detta bevarar inloggningsstatus, inställningar och annan appdata.

### Vad är skillnaden mellan att stänga och koppla från?

-   **Stäng:** Avslutar webbläsaren/appen helt
-   **Koppla från:** Kopplar bort automatiseringen men låter webbläsaren/appen fortsätta köras

Att koppla från är användbart när du vill inspektera tillståndet manuellt efter automatiseringen.

### Min session får hela tiden timeout under felsökning

Öka kommandots timeout:

"Starta min app med newCommandTimeout på 300 sekunder"

Standard är 300 sekunder. För mycket långa felsökningssessioner, prova 600 sekunder.

## Felsökning

### Felet "Session not found"

Detta betyder att det inte finns någon aktiv session. Starta först en webbläsar- eller appsession:

"Starta Chrome och navigera till google.com"

### Felet "Element not found"

Elementet kanske inte är synligt eller har en annan selektor. Prova att:

1. Be Claude att först hämta alla synliga element
2. Ange en mer specifik selektor
3. Vänta tills sidan/appen har laddats helt
4. Använda `inViewportOnly: false` för att hitta element utanför skärmen

### Webbläsaren startar inte

1. Kontrollera att målwebbläsaren är installerad
2. Kontrollera om en annan process använder felsökningsporten (9222)
3. Prova headless-läge

### Anslutningen till Appium misslyckades

Detta är det vanligaste problemet när man startar mobilautomatisering.

1. **Kontrollera att Appium körs**: `curl http://localhost:4723/status`
2. Starta Appium vid behov: `appium`
3. Kontrollera att din Appium-anslutning matchar servern (använd `appiumConfig` i `start_session`)
4. Säkerställ att drivrutinerna är installerade: `appium driver list --installed`

:::tip
MCP-servern kräver att Appium körs innan mobilsessioner startas. Se till att starta Appium först:
```sh
appium
```
Framtida versioner kan komma att inkludera automatisk hantering av Appium-tjänsten.
:::

### iOS-simulatorn startar inte

1. Kontrollera att Xcode är installerat: `xcode-select --install`
2. Lista tillgängliga simulatorer: `xcrun simctl list devices`
3. Leta efter specifika simulatorfel i Console.app

### Android-emulatorn startar inte

1. Ställ in `ANDROID_HOME`: `export ANDROID_HOME=$HOME/Library/Android/sdk`
2. Kontrollera emulatorer: `emulator -list-avds`
3. Starta emulatorn manuellt: `emulator -avd <avd-name>`
4. Kontrollera att enheten är ansluten: `adb devices`

### Skärmdumpar fungerar inte

1. För mobil, säkerställ att sessionen är aktiv
2. För webbläsare, prova en annan sida (vissa sidor blockerar skärmdumpar)
3. Kontrollera loggarna i Claude Desktop efter fel

Skärmdumpar komprimeras automatiskt till max 1MB, så stora skärmdumpar fungerar men kan få lägre kvalitet.

## Prestanda

### Varför är mobilautomatisering långsam?

Mobilautomatisering innefattar:
1. Nätverkskommunikation med Appium-servern
2. Appiums kommunikation med enheten/simulatorn
3. Enhetens rendering och svar

Tips för snabbare automatisering:
-   Använd emulatorer/simulatorer i stället för riktiga enheter under utveckling
-   Använd tillgänglighets-ID:n i stället för XPath
-   Aktivera `inViewportOnly: true` för elementdetektering
-   Använd paginering (`limit`) för att minska tokenanvändningen

### Hur kan jag snabba upp elementdetekteringen?

MCP-servern optimerar redan elementdetekteringen genom att tolka XML-sidkällan (2 HTTP-anrop jämfört med 600+ för traditionella elementförfrågningar). Ytterligare tips:

-   Ställ in `inViewportOnly: true` för att filtrera bort element utanför skärmen
-   Ställ in `includeContainers: false` (standard)
-   Använd `limit` och `offset` för paginering på stora skärmar
-   Använd specifika selektorer i stället för att hämta alla element

### Skärmdumpar är långsamma eller misslyckas

Skärmdumpar optimeras automatiskt:
- Storleksändras om de är större än 2000px
- Komprimeras för att hålla sig under 1MB
- Konverteras till JPEG om PNG blir för stor

Denna optimering minskar bearbetningstiden och säkerställer att Claude kan hantera bilden.

## Begränsningar

### Vilka är de nuvarande begränsningarna?

-   **En session:** Endast en webbläsare/app åt gången
-   **Stöd för iframes:** Iframes med samma ursprung stöds via `switch_frame`; iframes med annat ursprung är inte åtkomliga på grund av webbläsarens säkerhetsbegränsningar
-   **Filuppladdningar:** Stöds inte direkt via verktyg
-   **Ljud/video:** Kan inte interagera med mediauppspelning
-   **Webbläsartillägg:** Stöds inte

### Kan jag använda detta för produktionstestning?

WebdriverIO MCP är utformat för interaktiv AI-assisterad automatisering. För CI/CD-testning i produktion bör du överväga att använda WebdriverIO:s traditionella testkörare med full programmatisk kontroll.

## Säkerhet

### Är mina data säkra?

MCP-servern körs lokalt på din dator. All automatisering sker via lokala webbläsar-/Appium-anslutningar. Inga data skickas till externa servrar utöver det du uttryckligen navigerar till.

När du använder HTTP-transportläget (`--http`) accepterar servern som standard endast anslutningar från `localhost`; använd `--allowedHosts` och `--allowedOrigins` för att styra åtkomsten. Se [Transport](./transport) för mer information.

### Kan Claude komma åt mina lösenord?

Claude kan se sidinnehåll och interagera med element, men:
-   Lösenord i fält av typen `<input type="password">` är maskerade
-   Du bör undvika att automatisera känsliga inloggningsuppgifter
-   Använd testkonton för automatisering

## Bidra

### Hur kan jag bidra?

Besök [GitHub-repositoriet](https://github.com/webdriverio/mcp) för att:
-   Rapportera buggar
-   Önska funktioner
-   Skicka in pull requests

### Var kan jag få hjälp?

-   [WebdriverIO Discord](https://discord.webdriver.io/)
-   [GitHub Issues](https://github.com/webdriverio/mcp/issues)
-   [WebdriverIO-dokumentation](https://webdriver.io/)