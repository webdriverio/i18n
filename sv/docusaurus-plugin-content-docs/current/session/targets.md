---
id: targets
title: Sessionsmål
description: Öppna en webbläsare, mobilapp, skrivbordsapp, Electron-app eller en molnenhet med wdio session.
---

`wdio session open` startar sessionen. Det första argumentet är målet. Återanvänd sessionen `default`. Ange `-s <name>` bara när du behöver två sessioner samtidigt. Kör `npx wdio session doctor <target>` först när målet kräver Appium, en skrivbordsdrivrutin eller molnautentiseringsuppgifter.

Spelarna för Chrome, Android och Electron styr samma [WebdriverIO-demoapp](https://github.com/webdriverio/native-demo-app) (Expo-försökskaninen, tagg `v2.2.0`). Chrome och Electron använder en lokal Expo-webbserver i ett vanligt skrivbordsfönster. Android installerar [v2.2.0-releasens apk](https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/android.wdio.native.app.v2.2.0.apk) (`com.wdiodemoapp`). iOS installerar simulatorappen v2.2.0 (`org.wdiodemoapp`) och använder `touchId`. Varje spelare skriver kommandot, och sedan visar fönstret resultatet. Pausa, eller stega till föregående eller nästa kommando, för att läsa raden som ändrade fönstret.

Den gemensamma vägen är: öppna appen, logga in som `alice@webdriver.io` / `supersecret`, nå robotlogotypen ("You found me!!!") och lös sedan pusslet med 9 bitar. Chrome och Electron ställer dessutom in en plats och en nattklocka i Weather-vyn, öppnar appens inbyggda WebView med WebdriverIO:s startsida och drar i karusellen. Android-spelaren skrollar den nativa swipe-skärmen fram till roboten. `export` skriver en Mocha-spec av den session du just styrde.

<a id="postcard"></a>

## Webbläsare

```sh
npx wdio session open chrome http://localhost:3000
npx wdio session open firefox http://localhost:3000
npx wdio session open edge http://localhost:3000
npx wdio session open safari http://localhost:3000
```

Chrome öppnas headless. Lägg till `--headed` för att visa fönstret. Chrome, Firefox och Edge laddas ner vid första användningen om de inte är installerade. Safari kräver macOS.

### User agent i headless-läge

Headless Chrome och Edge identifierar sig som `HeadlessChrome/<version>` i user agent. Ett synligt fönster av samma webbläsare skickar `Chrome/<version>`. Många webbplatser nekar förfrågningar med headless-token: Akamai svarar "Access Denied" och Cloudflare visar "Just a moment...". De avgör det utifrån förfrågan, innan något sidskript körs. En agent skulle då se en blockeringssida som en person som öppnar samma webbplats aldrig får.

En headless Chrome- eller Edge-session skickar därför den user agent som ett synligt fönster av samma webbläsare skulle skicka. Detta ändrar bara token. Det döljer inte automatiseringen:

- `navigator.webdriver` förblir `true`.
- chromedrivers egna markörer finns fortfarande på sidan.
- Webbplatser som letar efter automatisering ser den fortfarande.

Medan user agent är åsidosatt skickar Chrome inga user agent client hints, så `navigator.userAgentData.brands` är tom. Åsidosättningen kräver WebDriver BiDi, så en session som öppnats med `--no-bidi` behåller headless-user agent.

För att skicka en specifik user agent anger du den som ett webbläsarargument. Sessionen lämnar då user agent orörd:

```sh
npx wdio session open chrome https://example.com --arg=--user-agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/154.0.0.0 Safari/537.36"
```

Om en webbplats fortfarande visar en botkontroll, prova ett synligt fönster med `--headed`. Om även det blockeras släpper webbplatsen inte in automatiserade webbläsare. Rapportera det i stället för att försöka ta dig förbi kontrollen.

Ett Chrome-fönster i headed-läge behåller sin flikrad och adressfält, vilket är hur du skiljer det från ett Electron-fönster. `--viewport 1280x800` är en vanlig webbläsarsida. På webben använder appen ett vänster sidofält. WebdriverIO-logotypen finns högst upp i sidofältet. Posterna är Home, Weather, Web, Login, Forms, Swipe, Drag, Perms och Data. Startskärmen listar webbläsare och skrivbord bredvid iOS och Android.

Weather läser `navigator.geolocation` och `Date`. `geolocation 35.6762 139.6503` är Tokyo. Det tillämpas vid nästa inläsning, så kör `reload` före `click "aria/Weather"`. Widgeten visar då Tokyo, 21° och regn. `emulate clock 2026-06-21T23:30:00Z` växlar samma kort från dagshimmel till natthimmel och ställer klockan på 11:30 PM. Ett andra `emulate clock` ersätter det första.

WebView-fliken läser in `https://webdriver.io/` inuti appen. Login väntar cirka 1,5 sekunder och öppnar sedan en dialog vars text är `Success` och `You are logged in!`. LOGIN-knappen förblir en orange kontroll på 200×50 medan väntan visas på skärmen. `dialog accept` stänger dialogen. `swipe` är endast för mobil. Dra `[data-testid=Carousel]` till `aria/Next card` två gånger för att bläddra i karusellen. Den inspelade webbversionen lyssnar efter `pointerup` på `document`, så dragningen kan börja på karusellen och pekaren kan släppas på `Next card`, som ligger utanför karusellen. `scroll down --px 560` för fram WebdriverIO-roboten i bild. Bildtexten under den är "You found me!!!". Pusselbitarna är `aria/drag-l2` till `aria/drag-l3`, som släpps på motsvarande `aria/drop-…`-mål. Ordningen i brickan är `l2`, `r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1`, `l3`.

```sh
npx wdio session open chrome http://127.0.0.1:8081 --headed --viewport 1280x800
npx wdio session geolocation 35.6762 139.6503
npx wdio session reload
npx wdio session click "aria/Weather"
npx wdio session emulate clock 2026-06-21T23:30:00Z
npx wdio session click "aria/Webview"
npx wdio session click "aria/Login"
npx wdio session fill "aria/input-email" "alice@webdriver.io"
npx wdio session fill "aria/input-password" "supersecret"
npx wdio session click "aria/button-LOGIN"
npx wdio session dialog accept
npx wdio session click "aria/Swipe"
npx wdio session drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session scroll down --px 560
npx wdio session click "aria/Drag"
npx wdio session drag "aria/drag-l2" "aria/drop-l2"
```

Upprepa `drag` för `r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1` och `l3`.

<SessionTarget id="browser" />

`--viewport 1280x720` anger den initiala storleken. `--arg` lägger till ett webbläsarargument och kan upprepas. `--profile <dir>` behåller en profil mellan öppningar.

<a id="boarding-pass"></a>
<a id="on-your-laptop"></a>
<a id="on-a-phone"></a>

## Android och iOS

Android och iOS körs via Appium 3. `doctor android` rapporterar en saknad server eller drivrutin tillsammans med installationskommandot.

```sh
npx wdio session doctor android
npx wdio session open android --app ./shop.apk
npx wdio session snapshot --interactive
npx wdio session tap e3
```

iOS: `open ios --bundle-id com.example.shop`. Ett installerat Android-paket använder `--package` och `--activity`. Mobilwebb använder `--browser chrome` eller `--browser safari` i stället för en app. `--appium-url http://127.0.0.1:4723/` ansluter till en server som redan körs. En molnapp-URL som `bs://…` skickas vidare som `--app` och behandlas inte som en lokal fil.

<a id="native-boarding-pass"></a>

### Nativ demoapp

På en emulator eller en enhet är samma försökskanin apk-filen v2.2.0:

```sh
curl -fsSL -o android.wdio.native.app.v2.2.0.apk \
    https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/android.wdio.native.app.v2.2.0.apk
adb install -r android.wdio.native.app.v2.2.0.apk
```

`open` väntar i upp till åtta minuter. UiAutomator2 installerar en server och startar instrumentering innan appen går att använda, och det är långsammare än att starta en webbläsare. Den första förfrågan görs inte om: ett nytt försök startar en andra Appium-session på samma enhet medan den första fortfarande installeras. `tap "~Login"`, `fill` och sedan `tap "~button-LOGIN"` loggar in med samma e-postadress och lösenord. På en kort skärm ligger LOGIN-knappen nedanför den synliga delen, så skrolla `~Login-screen` före det trycket. `dialog accept` stänger lyckat-meddelandet, och det måste köras efter att meddelandet visas på skärmen. Meddelandetexten är `Success` / `You are logged in!`.

Fingeravtrycksknappen är `~button-biometric`. Den finns i inloggningsformuläret först när ett fingeravtryck har registrerats, så den här spelaren trycker inte på den. `exec -e "await browser.fingerPrint(1)"` besvarar systemprompten (`fingerPrint` är endast för Android; det finns inget `wdio session`-underkommando för det).

`tap "~Webview"` är appens inbyggda WebView med `https://webdriver.io/`. På en mjukvaruemulator med en CPU dör WebView-renderaren med `SIGTRAP` i `libmonochrome` efter etiketten LOADING, och sidan ritas aldrig upp. Spelaren låter den fliken vara.

`tap "~Swipe"` öppnar karusellen. `swipe left` bläddrar inte i den: karusellen är `react-native-reanimated-carousel`, och ett UIAutomator-svep fjädrar tillbaka till det första kortet. En upprepad `exec` av `mobile: swipeGesture` på skrollvyn är det som för fram roboten och bildtexten "You found me!!!". Ett helskärms-`swipe up` från nederkanten öppnar i stället Androids skärmbildsgränssnitt. `drag "~drag-l2" "~drop-l2"` (och de andra åtta paren, i brickans ordning) löser pusslet. Den sista bildrutan är den ihopsatta roboten och kontrollen för att försöka igen.

`-s android` håller den här sessionen bredvid webbläsarsessionen. Ta bort `-s android` när det är den enda sessionen. `open` använder paketet och aktiviteten som redan installerats av apk-filen, med `--no-reset` så att ett registrerat fingeravtryck finns kvar. `"~Login"` är flikens tillgänglighetsetikett. `wait` gäller inte för en nativ session.

```sh
npx wdio session -s android open android --package com.wdiodemoapp --activity com.wdiodemoapp.MainActivity --no-reset
npx wdio session -s android tap "~Login"
npx wdio session -s android fill "~input-email" "alice@webdriver.io"
npx wdio session -s android fill "~input-password" "supersecret"
npx wdio session -s android exec -e 'await browser.execute("mobile: scrollGesture", { elementId: (await $("~Login-screen")).elementId, direction: "down", percent: 0.75 }); return "scrolled the login form"'
npx wdio session -s android tap "~button-LOGIN"
npx wdio session -s android dialog accept
npx wdio session -s android tap "~Swipe"
npx wdio session -s android exec -e 'for (let i = 0; i < 6; i++) { await browser.execute("mobile: swipeGesture", { left: 80, top: 180, width: 560, height: 320, direction: "up", percent: 0.95 }) } for (let i = 0; i < 4; i++) { await browser.execute("mobile: swipeGesture", { left: 40, top: 700, width: 640, height: 280, direction: "up", percent: 0.9 }) } return "revealed the robot"'
npx wdio session -s android tap "~Drag"
npx wdio session -s android drag "~drag-l2" "~drop-l2"
```

Upprepa `drag` för `r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1` och `l3`.

<SessionTarget id="android" />

### iOS-simulator

Samma skärmar finns i simulatorversionen v2.2.0, [ios.simulator.wdio.native.app.v2.2.0.zip](https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/ios.simulator.wdio.native.app.v2.2.0.zip). Packa upp den och installera `wdiodemoapp.app` på en startad simulator (`xcrun simctl install booted`). Bundle-id är `org.wdiodemoapp`. Den binären är en iPhone Simulator-app (arm64, iOS 15.1 eller nyare). Den kräver macOS och Xcode. Det finns ingen iOS-spelare på den här sidan.

Inloggning, svep och dragning använder samma tillgänglighetsetiketter som Android. `swipe left` kördes inte på simulatorn. På Android-apk:n bläddrar det inte i den här karusellen. Det biometriska anropet är `browser.touchId(true)`, inte `fingerPrint`. `touchId` kräver att capability `appium:allowTouchIdEnroll` är satt till `true` (ange den med `--capabilities`). Registrera Touch ID på simulatorn innan du öppnar inloggningsformuläret, annars förblir den biometriska knappen dold.

```sh
npx wdio session -s ios open ios --bundle-id org.wdiodemoapp --capabilities '{"appium:allowTouchIdEnroll":true}'
npx wdio session -s ios tap "~Webview"
npx wdio session -s ios tap "~Login"
npx wdio session -s ios fill "~input-email" "alice@webdriver.io"
npx wdio session -s ios fill "~input-password" "supersecret"
npx wdio session -s ios tap "~button-LOGIN"
npx wdio session -s ios dialog accept
npx wdio session -s ios tap "~button-biometric"
npx wdio session -s ios exec -e "await browser.touchId(true)"
npx wdio session -s ios dialog accept
npx wdio session -s ios tap "~Swipe"
npx wdio session -s ios swipe left
npx wdio session -s ios swipe left
npx wdio session -s ios swipe up
npx wdio session -s ios tap "~Drag"
npx wdio session -s ios drag "~drag-l2" "~drop-l2"
```

Upprepa `drag` för de andra åtta bitarna, i samma brickordning som för Android.

## Skrivbordsappar

```sh
npx wdio session open macos --bundle-id com.example.shop
npx wdio session open windows --app Root
```

`macos` kräver macOS. `windows` kräver Windows. `--app Root` ansluter till skrivbordet. En installerad Windows-app anges med sitt applikations-id, till exempel `--app Microsoft.WindowsCalculator`. En sökväg eller en `.exe` tolkas som en fil.

<a id="launch-console"></a>

## Electron, Tauri och Dioxus

```sh
npx wdio session open electron ./main.js
npx wdio session snapshot --interactive
npx wdio session click e2
```

`open tauri ./my-app` och `open dioxus ./my-app` behöver sin drivrutin i `PATH` om inte servicepaketet startar sessionen självt. På Linux utan `DISPLAY` eller `WAYLAND_DISPLAY`, installera Xvfb eller weston. Electron använder fortsatt det klassiska WebDriver-protokollet. Använd `--app-arg` för att vidarebefordra en flagga till appen, inklusive `--app-arg=--no-sandbox` när miljön kräver det. Ett värde som börjar med `-` måste använda `=`, eftersom den strikta parsern annars behandlar det som ett eget alternativ.

Installera `electron` och `@wdio/electron-service` i katalogen du öppnar. `main.js` använder `import`, så katalogens `package.json` behöver `"type": "module"` (eller döp filen till `main.mjs`). Anpassa fönstrets storlek till arbetsytan så att en mindre skärm inte placerar namnlisten utanför skärmen:

```json
{ "type": "module" }
```

```js
import { app, BrowserWindow, screen } from 'electron'

app.whenReady().then(() => {
    const area = screen.getPrimaryDisplay().workArea
    const width = Math.min(1280, area.width)
    const height = Math.min(800, area.height)
    const win = new BrowserWindow({
        width,
        height,
        x: area.x + Math.max(0, Math.round((area.width - width) / 2)),
        y: area.y + Math.max(0, Math.round((area.height - height) / 2)),
        autoHideMenuBar: true,
        webPreferences: { contextIsolation: true, sandbox: true }
    })
    win.loadURL('http://127.0.0.1:8081/')
})
```

Open-kommandot nedan inaktiverar inte renderarens sandlåda. Lägg bara till `--app-arg=--no-sandbox` när miljön inte kan starta Electron med sandlådan, till exempel i vissa Linux-containrar. Electron-spelaren läser in samma Expo-URL i ett fönster på 1280×800 utan adressfält. Logotypen, sidofältet, väderkortet, inloggningskortet, karusellen och pusslet är desamma som i webbläsaren. `-s electron` är sessionsnamnet som används bredvid webbläsardemon. Electron använder fortsatt det klassiska protokollet, så `geolocation` och `emulate clock` går via Chromedriver i stället för BiDi. Kommandona är desamma som för Chrome, inklusive `reload` före Weather, förutom lyckat-dialogen. På Linux accepterar `dialog accept` den nativa varningen, men bubblan ligger kvar uppritad. Den bubblan är inte en del av sidan, så ett senare klick kan inte nå den. Inspelningen ersätter `window.alert` med en dialog på sidan och kör `click "aria/OK"`. LOGIN-knappen förblir en orange kontroll på 200×50 medan den väntar. Karusellen, skrollningen och pusslet använder samma kommandon som Chrome.

```sh
npx wdio session -s electron open electron ./main.js
npx wdio session -s electron geolocation 35.6762 139.6503
npx wdio session -s electron reload
npx wdio session -s electron click "aria/Weather"
npx wdio session -s electron emulate clock 2026-06-21T23:30:00Z
npx wdio session -s electron click "aria/Webview"
npx wdio session -s electron click "aria/Login"
npx wdio session -s electron fill "aria/input-email" "alice@webdriver.io"
npx wdio session -s electron fill "aria/input-password" "supersecret"
npx wdio session -s electron click "aria/button-LOGIN"
npx wdio session -s electron click "aria/OK"
npx wdio session -s electron click "aria/Swipe"
npx wdio session -s electron drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session -s electron drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session -s electron scroll down --px 560
npx wdio session -s electron click "aria/Drag"
npx wdio session -s electron drag "aria/drag-l2" "aria/drop-l2"
```

Upprepa `drag` för `r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1` och `l3`.

<SessionTarget id="electron" />

## Molnenheter

```sh
npx wdio session open chrome https://webdriver.io --provider browserstack
```

`--provider` är `browserstack`, `saucelabs`, `testingbot` eller `testmu`. Exportera leverantörens användarnamn och åtkomstnyckel. `doctor <provider>` kontrollerar att de är satta och skriver inte ut värdena. `--tunnel` startar leverantörens tunnel när appen som testas finns på din dator.

## En WebdriverIO-konfiguration

`open` kan ta en konfigurationsfil och ett capability-index i stället för ett målnamn:

```sh
npx wdio session open ./wdio.conf.ts 0
```

En TypeScript-konfiguration läses in med `tsx` när ditt projekt har det. `tsx` är valfritt: utan det läses konfigurationen in via Nodes type stripping eller jiti, och en konfiguration som inte kan läsas in rapporterar `MISSING_DEPENDENCY` med en installationsrad.

`--hostname`, `--port`, `--path` och `--protocol` riktar sessionen mot en WebDriver-endpoint som redan körs. Att stänga sessionen stoppar inte den endpointen.

## Felsökning

| Meddelande | Vad du gör |
| --- | --- |
| `MISSING_DEPENDENCY` | Installera paketet som nämns i felet. `doctor <target>` skriver ut samma installationsrad. Electron behöver `@wdio/electron-service` och `electron` i katalogen du öppnar. |
| `MISSING_APPIUM_DRIVER` | Kör raden `npx appium driver install …` från felet. |
| `MISSING_BINARY` | Lägg den nämnda drivrutinen (`tauri-driver` eller `wdio-dioxus-driver`) i `PATH`. |
| `MISSING_CREDENTIALS` | Exportera variablerna som nämns i felet. |
| `NOT_SUPPORTED` | `macos` fungerar endast på macOS och `windows` endast på Windows. `swipe` är endast för mobil. På Chrome och Electron, dra `[data-testid=Carousel]` till `aria/Next card`. |
| `No dialog open.` | Varningen är inte öppen. På Android, vänta tills lyckat-meddelandet syns innan `dialog accept`. På Linux Electron kan den nativa bubblan ligga kvar uppritad efter `acceptAlert` och ändå rapportera att ingen dialog finns. Spelaren använder i stället en dialog på sidan och `click "aria/OK"`. |
| `The instrumentation process cannot be initialized` | UiAutomator2 började inte lyssna i tid. Sessionen tillåter 240 s för den starten, efter upp till 180 s för att installera servern. På en mjukvaruemulator tar en CPU och ett 720×1280-skin v2.2.0-apk:n till startskärmen. En 1080×2400-avbild med två CPU:er ger ANR i `system_server` och servern börjar aldrig lyssna. |
| `Request timed out! Consider increasing the "connectionRetryTimeout" option.` | Klienten gav upp medan Appium fortfarande skapade sessionen. Android och iOS väntar 480 s på den första förfrågan och skickar den inte igen. |
| `"wait" is not supported for android (UiAutomator2) sessions.` | `wait` är för webbläsarsessioner. |
| `The fingerPrint command is only available for Android.` | `browser.fingerPrint` är Android-anropet. iOS använder `browser.touchId`. |
| `App not found:` | Ange en apk-sökväg som finns, eller använd `--package` och `--activity` för en app som redan är installerad. |
| `Pass --package <id>.` | `deeplink` kräver `--package` på Android. |

## Nästa steg

- [Ögonblicksbilder och referenser](/docs/session/snapshots) — läs av skärmen efter `open`
- [Kommandon](/docs/session-commands) — alla `open`-flaggor
- [wdio session](/docs/session) — standardloopen