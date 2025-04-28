---
id: mobile
title: Mobilkommandon
---

# Introduction to custom and enhanced Mobile Commands in WebdriverIO

Testing mobile apps and mobile web applications comes with its own challenges, especially when dealing with platform-specific differences between Android and iOS. While Appium provides the flexibility to handle these differences, it often requires you to dive deep into complex, platform-dependent docs ([Android](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md), [iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/)) and commands. This can make writing test scripts more time-consuming, error-prone, and difficult to maintain.

För att förenkla processen introducerar WebdriverIO **anpassade och förbättrade mobilkommandon** speciellt utformade för testning av mobila webbapplikationer och nativa appar. Dessa kommandon abstraherar komplexiteten i de underliggande Appium-API:erna, vilket gör det möjligt för dig att skriva koncisa, intuitiva och plattformsoberoende testskript. Genom att fokusera på användarvänlighet strävar vi efter att minska extra belastning vid utveckling av Appium-skript och ge dig möjlighet att automatisera mobilappar utan ansträngning.

<LiteYouTubeEmbed
    id="tN0LmKgWjPw"
    title="WebdriverIO Tutorials - Enhanced Mobile Commands"
/>

## Varför anpassade mobilkommandon?

### 1. **Förenkla komplexa API:er**
Vissa Appium-kommandon, som gester eller elementinteraktioner, innefattar omfattande och komplicerad syntax. Till exempel kräver utförandet av en långtrycksåtgärd med det inhemska Appium-API:et att man manuellt konstruerar en `action`-kedja:

```ts
const element = $('~Contacts')

await browser
    .action( 'pointer', { parameters: { pointerType: 'touch' } })
    .move({ origin: element })
    .down()
    .pause(1500)
    .up()
    .perform()
```

Med WebdriverIOs anpassade kommandon kan samma åtgärd utföras med en enda, uttrycksfull kodrad:

```ts
await $('~Contacts').longPress();
```

Detta minskar drastiskt mängden standardkod, vilket gör dina skript renare och lättare att förstå.

### 2. **Plattformsöverskridande abstraktion**
Mobilappar kräver ofta plattformsspecifik hantering. Till exempel skiljer sig scrollning i nativa appar betydligt mellan [Android](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-scrollgesture) och [iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-scroll). WebdriverIO överbryggar denna klyfta genom att tillhandahålla enhetliga kommandon som `scrollIntoView()` som fungerar sömlöst över plattformar, oavsett den underliggande implementationen.

```ts
await $('~element').scrollIntoView();
```

Denna abstraktion säkerställer att dina tester är portabla och inte kräver konstant förgrening eller villkorlig logik för att ta hänsyn till OS-skillnader.

### 3. **Ökad produktivitet**
Genom att minska behovet av att förstå och implementera lågniväkommandon i Appium, gör WebdriverIOs mobilkommandon det möjligt för dig att fokusera på att testa appens funktionalitet istället för att brottas med plattformsspecifika nyanser. Detta är särskilt fördelaktigt för team med begränsad erfarenhet av mobilautomatisering eller de som söker att påskynda sin utvecklingscykel.

### 4. **Konsekvens och underhållbarhet**
Anpassade kommandon ger enhetlighet till dina testskript. Istället för att ha varierande implementationer för liknande åtgärder kan ditt team förlita sig på standardiserade, återanvändbara kommandon. Detta gör inte bara kodbasen mer underhållbar utan sänker också tröskeln för att introducera nya teammedlemmar.

## Varför förbättra vissa mobilkommandon?

### 1. Öka flexibiliteten
Vissa mobilkommandon förbättras för att ge ytterligare alternativ och parametrar som inte finns tillgängliga i standardiserade Appium-API:er. Till exempel lägger WebdriverIO till återförsökslogik, tidsgränser och möjligheten att filtrera webview efter specifika kriterier, vilket möjliggör mer kontroll över komplexa scenarier.

```ts
// Example: Customizing retry intervals and timeouts for webview detection
await driver.getContexts({
  returnDetailedContexts: true,
  androidWebviewConnectionRetryTime: 1000, // Retry every 1 second
  androidWebviewConnectTimeout: 10000,    // Timeout after 10 seconds
});
```

Dessa alternativ hjälper till att anpassa automatiseringsskript till dynamiska appbeteenden utan ytterligare standardkod.

### 2. Förbättra användbarheten
Förbättrade kommandon abstraherar komplexitet och repetitiva mönster som finns i de ursprungliga API:erna. De gör det möjligt att utföra fler åtgärder med färre kodrader, vilket minskar inlärningskurvan för nya användare och gör skript enklare att läsa och underhålla.

```ts
// Example: Enhanced command for switching context by title
await driver.switchContext({
  title: 'My Webview Title',
});
```

Jämfört med standardmetoderna i Appium eliminerar förbättrade kommandon behovet av ytterligare steg som att manuellt hämta tillgängliga kontexter och filtrera igenom dem.

### 3. Standardisera beteende
WebdriverIO säkerställer att förbättrade kommandon beter sig konsekvent över plattformar som Android och iOS. Denna plattformsöverskridande abstraktion minimerar behovet av villkorlig förgreningslogik baserad på operativsystemet, vilket leder till mer underhållbara testskript.

```ts
// Example: Unified scroll command for both platforms
await $('~element').scrollIntoView();
```

Denna standardisering förenklar kodbaser, särskilt för team som automatiserar tester på flera plattformar.

### 4. Öka tillförlitligheten
Genom att införliva återförsöksmekanismer, smarta standardvärden och detaljerade felmeddelanden, minskar förbättrade kommandon sannolikheten för instabila tester. Dessa förbättringar säkerställer att dina tester är motståndskraftiga mot problem som fördröjningar i webview-initiering eller övergående apptillstånd.

```ts
// Example: Enhanced webview switching with robust matching logic
await driver.switchContext({
  url: /.*my-app\/dashboard/,
  androidWebviewConnectionRetryTime: 500,
  androidWebviewConnectTimeout: 7000,
});
```

Detta gör testexekveringen mer förutsägbar och mindre benägen för fel orsakade av miljöfaktorer.

### 5. Förbättra felsökningsfunktioner
Förbättrade kommandon återger ofta rikare metadata, vilket möjliggör enklare felsökning av komplexa scenarier, särskilt i hybridappar. Till exempel kan kommandon som getContext och getContexts returnera detaljerad information om webview, inklusive titel, url och synlighetsstatus.

```ts
// Example: Retrieving detailed metadata for debugging
const contexts = await driver.getContexts({ returnDetailedContexts: true });
console.log(contexts);
```

Denna metadata hjälper till att identifiera och lösa problem snabbare, vilket förbättrar den övergripande felsökningsupplevelsen.


Genom att förbättra mobilkommandon gör WebdriverIO inte bara automatisering enklare utan anpassar sig också till sin mission att förse utvecklare med verktyg som är kraftfulla, pålitliga och intuitiva att använda.

---

## Hybridappar

Hybridappar kombinerar webbinnehåll med nativ funktionalitet och kräver specialiserad hantering under automatisering. Dessa appar använder webview för att visa webbinnehåll inom en nativ applikation. WebdriverIO tillhandahåller förbättrade metoder för att effektivt arbeta med hybridappar.

### Förstå Webviews
En webview är en webbläsarliknande komponent inbäddad i en nativ app:

- **Android:** Webviews baseras på Chrome/System Webview och kan innehålla flera sidor (liknande webbläsarflikar). Dessa webviews kräver ChromeDriver för att automatisera interaktioner. Appium kan automatiskt avgöra vilken ChromeDriver-version som krävs baserat på versionen av System WebView eller Chrome installerat på enheten och ladda ner den automatiskt om den inte redan finns tillgänglig. Detta tillvägagångssätt säkerställer sömlös kompatibilitet och minimerar manuell konfiguration. Se [Appium UIAutomator2-dokumentationen](https://github.com/appium/appium-uiautomator2-driver?tab=readme-ov-file#automatic-discovery-of-compatible-chromedriver) för att lära dig hur Appium automatiskt laddar ner rätt ChromeDriver-version.
- **iOS:** Webviews drivs av Safari (WebKit) och identifieras av generiska ID:n som `WEBVIEW_{id}`.

### Utmaningar med hybridappar
1. Identifiera rätt webview bland flera alternativ.
2. Hämta ytterligare metadata som titel, URL eller paketnamn för bättre kontext.
3. Hantera plattformsspecifika skillnader mellan Android och iOS.
4. Byta till rätt kontext i en hybridapp på ett tillförlitligt sätt.

### Nyckelkommandon för hybridappar

#### 1. `getContext`
Hämtar den aktuella kontexten för sessionen. Som standard fungerar den som Appiums getContext-metod men kan tillhandahålla detaljerad kontextinformation när `returnDetailedContext` är aktiverat. För mer information se [`getContext`](/docs/api/mobile/getContext)

#### 2. `getContexts`
Returnerar en detaljerad lista över tillgängliga kontexter, vilket förbättrar Appiums contexts-metod. Detta gör det enklare att identifiera rätt webview för interaktion utan att behöva anropa extra kommandon för att avgöra titel, url eller aktivt `bundleId|packageName`. För mer information se [`getContexts`](/docs/api/mobile/getContexts)

#### 3. `switchContext`
Byter till en specifik webview baserat på namn, titel eller url. Ger ytterligare flexibilitet, såsom att använda reguljära uttryck för matchning. För mer information se [`switchContext`](/docs/api/mobile/switchContext)

### Nyckelfunktioner för hybridappar
1. Detaljerad metadata: Hämta omfattande detaljer för felsökning och tillförlitligt kontextbyte.
2. Plattformsöverskridande konsekvens: Enhetligt beteende för Android och iOS, hantering av plattformsspecifika egenheter sömlöst.
3. Anpassad återförsökslogik (Android): Justera återförsöksintervall och tidsgränser för webview-detektion.


:::info Anteckningar och begränsningar
- Android tillhandahåller ytterligare metadata, såsom `packageName` och `webviewPageId`, medan iOS fokuserar på `bundleId`.
- Återförsökslogik är anpassningsbar för Android men inte tillämplig på iOS.
- Det finns flera fall där iOS inte kan hitta Webview. Appium tillhandahåller olika extra funktioner för `appium-xcuitest-driver` för att hitta Webview. Om du tror att Webview inte hittas kan du försöka ställa in en av följande förmågor:
    - `appium:includeSafariInWebviews`: Lägg till Safari-webbkontexter i listan över kontexter som är tillgängliga under ett test av en nativ/webview-app. Detta är användbart om testet öppnar Safari och behöver kunna interagera med det. Standard är `false`.
    - `appium:webviewConnectRetries`: Det maximala antalet återförsök innan man ger upp detektering av webbvy-sidor. Fördröjningen mellan varje återförsök är 500 ms, standard är `10` återförsök.
    - `appium:webviewConnectTimeout`: Den maximala tiden i millisekunder att vänta på att en webbvy-sida ska upptäckas. Standard är `5000` ms.

För avancerade exempel och detaljer, se WebdriverIO Mobile API-dokumentationen.
:::


---

Vår växande uppsättning kommandon återspeglar vårt engagemang för att göra mobilautomatisering tillgänglig och elegant. Oavsett om du utför komplicerade gester eller arbetar med nativa appelement, överensstämmer dessa kommandon med WebdriverIOs filosofi om att skapa en sömlös automatiseringsupplevelse. Och vi stannar inte där – om det finns en funktion du skulle vilja se, välkomnar vi din feedback. Tveka inte att skicka dina förfrågningar via [denna länk](https://github.com/webdriverio/webdriverio/issues/new/choose).