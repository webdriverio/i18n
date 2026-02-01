---
id: faq
title: Vanliga frågor
---

Vanligt förekommande frågor om WebdriverIO MCP.

## Allmänt

### Vad är MCP?

MCP (Model Context Protocol) är ett öppet protokoll som gör det möjligt för AI-assistenter som Claude att interagera med externa verktyg och tjänster. WebdriverIO MCP implementerar detta protokoll för att tillhandahålla webbläsar- och mobilautomatiseringsmöjligheter till Claude Desktop och Claude Code.

### Vad kan jag automatisera med WebdriverIO MCP?

Du kan automatisera:
-   **Skrivbordswebbläsare** (Chrome) - navigering, klickning, skrivning, skärmdumpar
-   **iOS-appar** - på simulatorer eller fysiska enheter
-   **Android-appar** - på emulatorer eller fysiska enheter
-   **Hybridappar** - växla mellan native- och webbkontext

### Behöver jag skriva kod?

Nej! Det är den största fördelen med MCP. Du kan beskriva vad du vill göra med naturligt språk, och Claude kommer att använda de lämpliga verktygen för att utföra uppgiften.

**Exempel på uppmaningar:**
-   "Öppna Chrome och navigera till webdriver.io"
-   "Klicka på knappen Kom igång"
-   "Ta en skärmdump av den aktuella sidan"
-   "Starta min iOS-app och logga in som testanvändare"

---

## Installation och konfiguration

### Hur installerar jag WebdriverIO MCP?

Du behöver inte installera det separat. MCP-servern körs automatiskt via npx när du konfigurerar den i Claude Desktop eller Claude Code.

Lägg till detta i din Claude Desktop-konfiguration:

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

### Var finns Claude Desktop-konfigurationsfilen?

-   **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
-   **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

### Behöver jag Appium för webbläsarautomatisering?

Nej. Webbläsarautomatisering kräver bara att Chrome är installerat. WebdriverIO hanterar ChromeDriver automatiskt.

### Behöver jag Appium för mobilautomatisering?

Ja. Mobilautomatisering kräver:
1. Appium-server som körs (`npm install -g appium && appium`)
2. Plattformsdrivrutiner installerade (`appium driver install xcuitest` för iOS, `appium driver install uiautomator2` för Android)
3. Lämpliga utvecklingsverktyg (Xcode för iOS, Android SDK för Android)

---

## Webbläsarautomatisering

### Vilka webbläsare stöds?

För närvarande stöds endast **Chrome**. Stöd för andra webbläsare kan läggas till i framtida versioner.

### Kan jag köra Chrome i headless-läge?

Ja! Be Claude att starta webbläsaren i headless-läge:

"Starta Chrome i headless-läge"

Eller så kommer Claude att använda detta alternativ när det är lämpligt (t.ex. i CI/CD-sammanhang).

### Kan jag ställa in webbläsarens fönsterstorlek?

Ja. Du kan ange dimensioner när du startar webbläsaren:

"Starta Chrome med en fönsterstorlek på 1920x1080"

Stödda dimensioner: 400-3840 pixlar bred, 400-2160 pixlar hög. Standard är 1920x1080.

### Kan jag starta webbläsaren och navigera i ett steg?

Ja! Använd parametern `navigationUrl`:

"Starta Chrome och navigera till https://webdriver.io"

Detta är mer effektivt än att starta webbläsaren och sedan navigera separat.

### Hur tar jag skärmdumpar?

Be Claude helt enkelt:

"Ta en skärmdump av den aktuella sidan"

Skärmdumpar optimeras automatiskt:
- Skalade till max 2000px dimension
- Komprimerade till max 1MB filstorlek
- Format: PNG eller JPEG (väljs automatiskt för optimal kvalitet)

### Kan jag interagera med iframes?

För närvarande fungerar MCP-servern på huvuddokumentet. iframe-interaktion kan läggas till i framtida versioner.

### Kan jag köra anpassad JavaScript?

Ja! Använd verktyget `execute_script`:

"Kör skript för att hämta sidans titel"
"Kör skript: return document.querySelectorAll('button').length"

---

## Mobilautomatisering

### Hur startar jag en iOS-app?

Be Claude med nödvändiga detaljer:

"Starta min iOS-app som finns på /path/to/MyApp.app på iPhone 15-simulatorn"

Eller för en installerad app:

"Starta appen med noReset aktiverat på iPhone 15-simulatorn"

### Hur startar jag en Android-app?

"Starta min Android-app på /path/to/app.apk på Pixel 7-emulatorn"

Eller för en installerad app:

"Starta appen med noReset aktiverat på Pixel 7-emulatorn"

### Kan jag testa på fysiska enheter?

Ja! För fysiska enheter behöver du enhetens UDID:

-   **iOS:** Anslut enheten, öppna Finder, klicka på enheten, klicka på serienumret för att visa UDID
-   **Android:** Kör `adb devices` i terminalen

Be sedan Claude:

"Starta min iOS-app på den fysiska enheten med UDID abc123..."

### Hur hanterar jag behörighetsdialoger?

Som standard beviljas behörigheter automatiskt (`autoGrantPermissions: true`). Om du behöver testa behörighetsflöden kan du inaktivera detta:

"Starta min app utan att automatiskt bevilja behörigheter"

### Vilka gester stöds?

-   **Tryck:** Tryck på element eller koordinater
-   **Svep:** Svep upp, ner, vänster eller höger
-   **Dra och släpp:** Dra från ett element till ett annat eller till koordinater

Obs: `long_press` är tillgängligt via `execute_script` med Appiums mobilkommandon.

### Hur rullar jag i mobilappar?

Använd svepgester:

"Svep uppåt för att rulla nedåt"
"Svep nedåt för att rulla uppåt"

### Kan jag rotera enheten?

Ja:

"Rotera enheten till liggande läge"
"Rotera enheten till stående läge"

### Hur hanterar jag hybridappar?

För appar med webvyer kan du växla kontext:

"Hämta tillgängliga kontexter"
"Växla till webview-kontext"
"Växla tillbaka till native-kontext"

### Kan jag köra Appium mobilkommandon?

Ja! Använd verktyget `execute_script`:

```
Kör skript "mobile: pressKey" med argumenten [{ keycode: 4 }]  // Tryck på TILLBAKA på Android
Kör skript "mobile: activateApp" med argumenten [{ appId: "com.example.app" }]
Kör skript "mobile: terminateApp" med argumenten [{ bundleId: "com.example.app" }]
```

---

## Elementval

### Hur vet Claude vilket element som ska interageras med?

Claude använder verktyget `get_visible_elements` för att identifiera interaktiva element på sidan/skärmen. Varje element kommer med flera väljarstrategier.

### Vad händer om det finns för många element på sidan?

Använd paginering för att hantera stora elementlistor:

"Hämta de första 20 synliga elementen"
"Hämta synliga element med offset 20 och begränsa till 20"

Svaret inkluderar `total`, `showing` och `hasMore` för att hjälpa till att navigera genom elementen.

### Kan jag hämta endast specifika typer av element?

Ja! Använd parametern `elementType`:

-   `interactable` (standard): Knappar, länkar, inmatningsfält
-   `visual`: Bilder, SVG:er
-   `all`: Båda typerna

"Hämta synliga visuella element på sidan"

### Vad gör jag om Claude klickar på fel element?

Du kan vara mer specifik:

-   Ange exakt text: "Klicka på knappen som säger 'Skicka beställning'"
-   Ange väljare: "Klicka på elementet med väljare #submit-btn"
-   Ange tillgänglighets-ID: "Klicka på elementet med tillgänglighets-ID loginButton"

### Vilken är den bästa väljarstrategin för mobil?

1. **Tillgänglighets-ID** (bäst) - `~loginButton`
2. **Resurs-ID** (Android) - `id=login_button`
3. **Predicate String** (iOS) - `-ios predicate string:label == "Login"`
4. **XPath** (sista utväg) - långsammare men fungerar överallt

### Vad är tillgänglighetsträdet och när bör jag använda det?

Tillgänglighetsträdet tillhandahåller semantisk information om sidelement (roller, namn, tillstånd). Använd `get_accessibility` när:
- `get_visible_elements` inte returnerar förväntade element
- Du behöver hitta element efter tillgänglighetsroll (knapp, länk, textfält osv.)
- Du behöver detaljerad semantisk information om element

"Hämta tillgänglighetsträdet filtrerat till knapp- och länkroller"

---

## Sessionshantering

### Kan jag ha flera sessioner samtidigt?

Nej. MCP-servern använder en modell med en session. Endast en webbläsar- eller appsession kan vara aktiv åt gången.

### Vad händer när jag stänger en session?

Det beror på sessionstyp och inställningar:

-   **Webbläsare:** Chrome stängs helt
-   **Mobil med `noReset: false`:** Appen avslutas
-   **Mobil med `noReset: true` eller utan `appPath`:** Appen förblir öppen (sessionen kopplas bort automatiskt)

### Kan jag bevara apptillstånd mellan sessioner?

Ja! Använd alternativet `noReset`:

"Starta min app med noReset aktiverat"

Detta bevarar inloggningsstatus, inställningar och andra appdata.

### Vad är skillnaden mellan stänga och koppla bort?

-   **Stänga:** Avslutar webbläsaren/appen helt
-   **Koppla bort:** Kopplar bort automatisering men håller webbläsaren/appen igång

Bortkoppling är användbart när du vill inspektera tillståndet manuellt efter automatisering.

### Min session löper ut under felsökning

Öka kommandots tidsgräns:

"Starta min app med newCommandTimeout på 300 sekunder"

Standard är 60 sekunder. För långa felsökningssessioner, prova 300-600 sekunder.

---

## Felsökning

### "Session not found"-fel

Detta betyder att ingen aktiv session finns. Starta en webbläsar- eller appsession först:

"Starta Chrome och navigera till google.com"

### "Element not found"-fel

Elementet kanske inte är synligt eller kan ha en annan väljare. Prova:

1. Be Claude att först hämta alla synliga element
2. Ange en mer specifik väljare
3. Vänta tills sidan/appen har laddats helt
4. Använd `inViewportOnly: false` för att hitta element utanför skärmen

### Webbläsaren startar inte

1. Se till att Chrome är installerat
2. Kontrollera om en annan process använder felsökningsporten (9222)
3. Prova headless-läge

### Appium-anslutning misslyckades

Detta är det vanligaste problemet när mobilautomatisering startas.

1. **Verifiera att Appium körs**: `curl http://localhost:4723/status`
2. Starta Appium om det behövs: `appium`
3. Kontrollera att din Appium URL-konfiguration matchar servern
4. Se till att drivrutiner är installerade: `appium driver list --installed`

:::tip
MCP-servern kräver att Appium körs innan mobilsessioner startas. Se till att starta Appium först:
```sh
appium
```
Framtida versioner kan inkludera automatisk hantering av Appium-tjänsten.
:::

### iOS Simulator startar inte

1. Se till att Xcode är installerat: `xcode-select --install`
2. Lista tillgängliga simulatorer: `xcrun simctl list devices`
3. Kontrollera specifika simulatorfel i Console.app

### Android Emulator startar inte

1. Ställ in `ANDROID_HOME`: `export ANDROID_HOME=$HOME/Library/Android/sdk`
2. Kontrollera emulatorer: `emulator -list-avds`
3. Starta emulatorn manuellt: `emulator -avd <avd-name>`
4. Verifiera att enheten är ansluten: `adb devices`

### Skärmdumpar fungerar inte

1. För mobil, se till att sessionen är aktiv
2. För webbläsare, prova en annan sida (vissa sidor blockerar skärmdumpar)
3. Kontrollera Claude Desktop-loggar för fel

Skärmdumpar komprimeras automatiskt till max 1MB, så stora skärmdumpar fungerar men kan ha lägre kvalitet.

---

## Prestanda

### Varför är mobilautomatisering långsam?

Mobilautomatisering involverar:
1. Nätverkskommunikation med Appium-server
2. Appium kommunicerar med enheten/simulatorn
3. Enhetsrendering och svar

Tips för snabbare automatisering:
-   Använd emulatorer/simulatorer istället för fysiska enheter för utveckling
-   Använd tillgänglighets-ID istället för XPath
-   Aktivera `inViewportOnly: true` för elementdetektering
-   Använd paginering (`limit`) för att minska tokenanvändning

### Hur kan jag påskynda elementdetektering?

MCP-servern optimerar redan elementdetektering med XML-sidkällparsning (2 HTTP-anrop vs 600+ för traditionella elementfrågor). Ytterligare tips:

-   Håll `inViewportOnly: true` (standard)
-   Ställ in `includeContainers: false` (standard)
-   Använd `limit` och `offset` för paginering på stora skärmar
-   Använd specifika väljare istället för att hitta alla element

### Skärmdumpar är långsamma eller misslyckas

Skärmdumpar optimeras automatiskt:
- Storleksändras om de är större än 2000px
- Komprimeras för att stanna under 1MB
- Konverteras till JPEG om PNG är för stor

Denna optimering minskar bearbetningstiden och säkerställer att Claude kan hantera bilden.

---

## Begränsningar

### Vilka är de nuvarande begränsningarna?

-   **En session:** Endast en webbläsare/app åt gången
-   **Webbläsarstöd:** Endast Chrome (för närvarande)
-   **iframe-stöd:** Begränsat stöd för iframes
-   **Filuppladdningar:** Stöds inte direkt via verktyg
-   **Ljud/Video:** Kan inte interagera med mediauppspelning
-   **Webbläsartillägg:** Stöds inte

### Kan jag använda detta för produktionstestning?

WebdriverIO MCP är utformat för interaktiv AI-assisterad automatisering. För produktions-CI/CD-testning, överväg att använda WebdriverIOs traditionella testrunner med full programmatisk kontroll.

---

## Säkerhet

### Är mina data säkra?

MCP-servern körs lokalt på din dator. All automatisering sker genom lokala webbläsar-/Appium-anslutningar. Inga data skickas till externa servrar utöver vad du uttryckligen navigerar till.

### Kan Claude komma åt mina lösenord?

Claude kan se sidinnehåll och interagera med element, men:
-   Lösenord i `<input type="password">`-fält är maskerade
-   Du bör undvika att automatisera känsliga uppgifter
-   Använd testkonton för automatisering

---

## Bidra

### Hur kan jag bidra?

Besök [GitHub-repositoriet](https://github.com/webdriverio/mcp) för att:
-   Rapportera buggar
-   Begära funktioner
-   Skicka in pull-förfrågningar

### Var kan jag få hjälp?

-   [WebdriverIO Discord](https://discord.webdriver.io/)
-   [GitHub Issues](https://github.com/webdriverio/mcp/issues)
-   [WebdriverIO Documentation](https://webdriver.io/)