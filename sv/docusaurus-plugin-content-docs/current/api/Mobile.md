---
id: mobile
title: Mobilkommandon
---

# Introduktion till anpassade och förbättrade mobilkommandon i WebdriverIO

Att testa mobilappar och mobila webbapplikationer medför sina egna utmaningar, särskilt när det gäller plattformsspecifika skillnader mellan Android och iOS. Även om Appium ger flexibiliteten att hantera dessa skillnader kräver det ofta att du gräver djupt i komplex, plattformsberoende dokumentation ([Android](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md), [iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/)) och kommandon. Detta kan göra det mer tidskrävande, felbenäget och svårt att underhålla testskript.

För att förenkla processen introducerar WebdriverIO **anpassade och förbättrade mobilkommandon** som är skräddarsydda specifikt för testning av mobilwebb och native-appar. Dessa kommandon abstraherar bort komplexiteten i de underliggande Appium-API:erna, vilket gör att du kan skriva koncisa, intuitiva och plattformsoberoende testskript. Genom att fokusera på användarvänlighet vill vi minska den extra belastningen vid utveckling av Appium-skript och ge dig möjlighet att automatisera mobilappar utan ansträngning.

<LiteYouTubeEmbed
    id="tN0LmKgWjPw"
    title="WebdriverIO Tutorials - Enhanced Mobile Commands"
/>

## Varför anpassade mobilkommandon?

### 1. **Förenkling av komplexa API:er**
Vissa Appium-kommandon, som gester eller elementinteraktioner, innebär utförlig och invecklad syntax. Till exempel kräver en långtrycksåtgärd med det inbyggda Appium-API:et att du manuellt konstruerar en `action`-kedja:

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

Med WebdriverIO:s anpassade kommandon kan samma åtgärd utföras med en enda, uttrycksfull kodrad:

```ts
await $('~Contacts').longPress();
```

Detta minskar drastiskt mängden standardkod, vilket gör dina skript renare och lättare att förstå.

### 2. **Plattformsoberoende abstraktion**
Mobilappar kräver ofta plattformsspecifik hantering. Till exempel skiljer sig scrollning i native-appar avsevärt mellan [Android](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-scrollgesture) och [iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-scroll). WebdriverIO överbryggar detta gap genom att tillhandahålla enhetliga kommandon som `scrollIntoView()` som fungerar sömlöst på alla plattformar, oavsett den underliggande implementationen.

```ts
await $('~element').scrollIntoView();
```

Denna abstraktion säkerställer att dina tester är portabla och inte kräver ständig förgrening eller villkorslogik för att hantera skillnader mellan operativsystem.

### 3. **Ökad produktivitet**
Genom att minska behovet av att förstå och implementera Appium-kommandon på låg nivå gör WebdriverIO:s mobilkommandon det möjligt för dig att fokusera på att testa appens funktionalitet istället för att brottas med plattformsspecifika nyanser. Detta är särskilt fördelaktigt för team med begränsad erfarenhet av mobilautomatisering eller de som vill påskynda sin utvecklingscykel.

### 4. **Konsekvens och underhållbarhet**
Anpassade kommandon ger enhetlighet i dina testskript. Istället för att ha varierande implementationer för liknande åtgärder kan ditt team förlita sig på standardiserade, återanvändbara kommandon. Detta gör inte bara kodbasen mer underhållbar utan sänker också tröskeln för att introducera nya teammedlemmar.

## Varför förbättra vissa mobilkommandon?

### 1. Ökad flexibilitet
Vissa mobilkommandon är förbättrade för att erbjuda ytterligare alternativ och parametrar som inte finns i Appiums standard-API:er. Till exempel lägger WebdriverIO till logik för återförsök, timeouts och möjligheten att filtrera webviews efter specifika kriterier, vilket ger mer kontroll över komplexa scenarier.

```ts
// Exempel: Anpassa intervall för återförsök och timeouts för webview-detektering
await driver.getContexts({
  returnDetailedContexts: true,
  androidWebviewConnectionRetryTime: 1000, // Försök igen varje sekund
  androidWebviewConnectTimeout: 10000,    // Timeout efter 10 sekunder
});
```

Dessa alternativ hjälper till att anpassa automatiseringsskript till dynamiskt appbeteende utan ytterligare standardkod.

### 2. Förbättrad användbarhet
Förbättrade kommandon abstraherar bort komplexitet och repetitiva mönster som finns i de inbyggda API:erna. De låter dig utföra fler åtgärder med färre kodrader, vilket minskar inlärningskurvan för nya användare och gör skript lättare att läsa och underhålla.

```ts
// Exempel: Förbättrat kommando för att byta kontext via titel
await driver.switchContext({
  title: 'My Webview Title',
});
```

Jämfört med Appiums standardmetoder eliminerar förbättrade kommandon behovet av ytterligare steg, som att manuellt hämta tillgängliga kontexter och filtrera bland dem.

### 3. Standardiserat beteende
WebdriverIO säkerställer att förbättrade kommandon beter sig konsekvent på plattformar som Android och iOS. Denna plattformsoberoende abstraktion minimerar behovet av villkorlig förgreningslogik baserad på operativsystemet, vilket leder till mer underhållbara testskript.

```ts
// Exempel: Enhetligt scrollkommando för båda plattformarna
await $('~element').scrollIntoView();
```

Denna standardisering förenklar kodbaser, särskilt för team som automatiserar tester på flera plattformar.

### 4. Ökad tillförlitlighet
Genom att införliva mekanismer för återförsök, smarta standardvärden och detaljerade felmeddelanden minskar förbättrade kommandon risken för instabila tester. Dessa förbättringar säkerställer att dina tester är motståndskraftiga mot problem som fördröjningar vid initiering av webviews eller tillfälliga apptillstånd.

```ts
// Exempel: Förbättrat byte av webview med robust matchningslogik
await driver.switchContext({
  url: /.*my-app\/dashboard/,
  androidWebviewConnectionRetryTime: 500,
  androidWebviewConnectTimeout: 7000,
});
```

Detta gör testkörningen mer förutsägbar och mindre benägen att misslyckas på grund av miljöfaktorer.

### 5. Förbättrade felsökningsmöjligheter
Förbättrade kommandon returnerar ofta rikare metadata, vilket underlättar felsökning av komplexa scenarier, särskilt i hybridappar. Till exempel kan kommandon som getContext och getContexts returnera detaljerad information om webviews, inklusive titel, url och synlighetsstatus.

```ts
// Exempel: Hämta detaljerad metadata för felsökning
const contexts = await driver.getContexts({ returnDetailedContexts: true });
console.log(contexts);
```

Denna metadata hjälper till att identifiera och lösa problem snabbare, vilket förbättrar den övergripande felsökningsupplevelsen.


Genom att förbättra mobilkommandon gör WebdriverIO inte bara automatisering enklare utan ligger också i linje med sitt uppdrag att förse utvecklare med verktyg som är kraftfulla, pålitliga och intuitiva att använda.

## Hybridappar

Hybridappar kombinerar webbinnehåll med native-funktionalitet och kräver specialiserad hantering vid automatisering. Dessa appar använder webviews för att rendera webbinnehåll i en native-applikation. WebdriverIO tillhandahåller förbättrade metoder för att arbeta effektivt med hybridappar.

### Förstå webviews
En webview är en webbläsarliknande komponent som är inbäddad i en native-app:

- **Android:** Webviews baseras på Chrome/System Webview och kan innehålla flera sidor (liknande webbläsarflikar). Dessa webviews kräver ChromeDriver för att automatisera interaktioner. Appium kan automatiskt avgöra vilken ChromeDriver-version som krävs baserat på versionen av System WebView eller Chrome som är installerad på enheten och ladda ner den automatiskt om den inte redan finns. Detta tillvägagångssätt säkerställer sömlös kompatibilitet och minimerar manuell konfiguration. Se [Appium UIAutomator2-dokumentationen](https://github.com/appium/appium-uiautomator2-driver?tab=readme-ov-file#automatic-discovery-of-compatible-chromedriver) för att lära dig hur Appium automatiskt laddar ner rätt ChromeDriver-version.
- **iOS:** Webviews drivs av Safari (WebKit) och identifieras med generiska ID:n som `WEBVIEW_{id}`.

### Utmaningar med hybridappar
1. Identifiera rätt webview bland flera alternativ.
2. Hämta ytterligare metadata som titel, URL eller paketnamn för bättre sammanhang.
3. Hantera plattformsspecifika skillnader mellan Android och iOS.
4. Byta till rätt kontext i en hybridapp på ett tillförlitligt sätt.

### Viktiga kommandon för hybridappar

#### 1. `getContext`
Hämtar sessionens aktuella kontext. Som standard beter den sig som Appiums getContext-metod, men kan ge detaljerad kontextinformation när `returnDetailedContext` är aktiverat. För mer information se [`getContext`](/docs/api/mobile/getContext)

#### 2. `getContexts`
Returnerar en detaljerad lista över tillgängliga kontexter, en förbättring av Appiums contexts-metod. Detta gör det lättare att identifiera rätt webview för interaktion utan att anropa extra kommandon för att avgöra titel, url eller aktivt `bundleId|packageName`. För mer information se [`getContexts`](/docs/api/mobile/getContexts)

#### 3. `switchContext`
Byter till en specifik webview baserat på namn, titel eller url. Ger ytterligare flexibilitet, till exempel möjligheten att använda reguljära uttryck för matchning. För mer information se [`switchContext`](/docs/api/mobile/switchContext)

### Viktiga funktioner för hybridappar
1. Detaljerad metadata: Hämta omfattande detaljer för felsökning och tillförlitligt kontextbyte.
2. Plattformsoberoende konsekvens: Enhetligt beteende för Android och iOS som hanterar plattformsspecifika egenheter sömlöst.
3. Anpassad logik för återförsök (Android): Justera intervall för återförsök och timeouts för webview-detektering.


:::info Anmärkningar och begränsningar
- Android tillhandahåller ytterligare metadata, såsom `packageName` och `webviewPageId`, medan iOS fokuserar på `bundleId`.
- Logiken för återförsök kan anpassas för Android men är inte tillämplig för iOS.
- Det finns flera fall där iOS inte kan hitta webviewn. Appium tillhandahåller olika extra capabilities för `appium-xcuitest-driver` för att hitta webviewn. Om du tror att webviewn inte hittas kan du prova att ställa in någon av följande capabilities:
    - `appium:includeSafariInWebviews`: Lägg till Safaris webbkontexter i listan över kontexter som är tillgängliga under ett test av en native-/webview-app. Detta är användbart om testet öppnar Safari och behöver kunna interagera med den. Standardvärdet är `false`.
    - `appium:webviewConnectRetries`: Det maximala antalet återförsök innan detekteringen av webview-sidor ges upp. Fördröjningen mellan varje återförsök är 500 ms, standard är `10` återförsök.
    - `appium:webviewConnectTimeout`: Den maximala tiden i millisekunder att vänta på att en webview-sida ska detekteras. Standard är `5000` ms.

För avancerade exempel och detaljer, se WebdriverIO:s dokumentation för Mobile API.
:::


---

Vår växande uppsättning kommandon återspeglar vårt engagemang för att göra mobilautomatisering tillgänglig och elegant. Oavsett om du utför invecklade gester eller arbetar med element i native-appar ligger dessa kommandon i linje med WebdriverIO:s filosofi att skapa en sömlös automatiseringsupplevelse. Och vi stannar inte här – om det finns en funktion du vill se välkomnar vi din feedback. Skicka gärna in dina önskemål via [denna länk](https://github.com/webdriverio/webdriverio/issues/new/choose).