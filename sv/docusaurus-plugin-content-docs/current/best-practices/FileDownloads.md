---
id: file-download
title: Filnedladdning
description: "Konfigurera nedladdningskataloger för Chrome, Firefox och Edge, vänta på att nedladdningar slutförs och verifiera nedladdade filer i olika webbläsare."
---

Vid automatisering av filnedladdningar i webbtestning är det viktigt att hantera dem konsekvent i olika webbläsare för att säkerställa tillförlitlig testkörning.

Här presenterar vi bästa praxis för filnedladdningar och visar hur du konfigurerar nedladdningskataloger för **Google Chrome**, **Mozilla Firefox** och **Microsoft Edge**.

## Nedladdningssökvägar

Att **hårdkoda** nedladdningssökvägar i testskript kan leda till underhållsproblem och portabilitetsproblem. Använd **relativa sökvägar** för nedladdningskataloger för att säkerställa portabilitet och kompatibilitet mellan olika miljöer.

```javascript
// 👎
// Hårdkodad nedladdningssökväg
const downloadPath = '/path/to/downloads';

// 👍
// Relativ nedladdningssökväg
const downloadPath = path.join(__dirname, 'downloads');
```

## Väntestrategier

Om du inte implementerar lämpliga väntestrategier kan det leda till kapplöpningstillstånd (race conditions) eller opålitliga tester, särskilt när det gäller att nedladdningar slutförs. Implementera **explicita** väntestrategier för att vänta på att filnedladdningar slutförs, vilket säkerställer synkronisering mellan teststegen.

```javascript
// 👎
// Ingen explicit väntan på att nedladdningen slutförs
await browser.pause(5000);

// 👍
// Vänta på att filnedladdningen slutförs
await waitUntil(async ()=> await fs.existsSync(downloadPath), 5000);
```

## Konfigurera nedladdningskataloger

För att åsidosätta beteendet för filnedladdning i **Google Chrome**, **Mozilla Firefox** och **Microsoft Edge** anger du nedladdningskatalogen i WebDriverIO-capabilities:

<Tabs
defaultValue="chrome"
values={[
{label: 'Chrome', value: 'chrome'},
{label: 'Firefox', value: 'firefox'},
{label: 'Microsoft Edge', value: 'edge'},
]
}>

<TabItem value='chrome'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L8-L16

```

</TabItem>

<TabItem value='firefox'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L20-L32

```

</TabItem>

<TabItem value='edge'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L36-L44

```

</TabItem>

</Tabs>

För ett exempel på en implementation, se [WebdriverIO Test Download Behavior Recipe](https://github.com/webdriverio/example-recipes/tree/main/testDownloadBehavior).

## Konfigurera nedladdningar i Chromium-webbläsare

Så här ändrar du nedladdningssökvägen för __Chromium-baserade__ webbläsare (som Chrome, Edge, Brave m.fl.) med hjälp av WebDriverIOs `getPuppeteer`-metod för att komma åt Chrome DevTools.

```javascript
const page = await browser.getPuppeteer();
// Initiera en CDP-session:
const cdpSession = await page.target().createCDPSession();
// Ange nedladdningssökvägen:
await cdpSession.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: downloadPath });
```

## Hantera flera filnedladdningar

När du hanterar scenarier som omfattar flera filnedladdningar är det viktigt att implementera strategier för att hantera och validera varje nedladdning på ett effektivt sätt. Överväg följande tillvägagångssätt:

__Sekventiell nedladdningshantering:__ Ladda ner filer en i taget och verifiera varje nedladdning innan nästa påbörjas för att säkerställa ordnad körning och korrekt validering.

__Parallell nedladdningshantering:__ Använd tekniker för asynkron programmering för att starta flera filnedladdningar samtidigt och därmed optimera testkörningstiden. Implementera robusta valideringsmekanismer för att verifiera alla nedladdningar när de är slutförda.

## Att tänka på gällande kompatibilitet mellan webbläsare

Även om WebDriverIO tillhandahåller ett enhetligt gränssnitt för webbläsarautomatisering är det viktigt att ta hänsyn till skillnader i webbläsares beteende och funktioner. Överväg att testa din filnedladdningsfunktionalitet i olika webbläsare för att säkerställa kompatibilitet och konsekvens.

__Webbläsarspecifika konfigurationer:__ Justera inställningar för nedladdningssökvägar och väntestrategier för att hantera skillnader i beteende och inställningar mellan Chrome, Firefox, Edge och andra webbläsare som stöds.

__Kompatibilitet mellan webbläsarversioner:__ Uppdatera regelbundet dina versioner av WebDriverIO och webbläsare för att dra nytta av de senaste funktionerna och förbättringarna, samtidigt som du säkerställer kompatibilitet med din befintliga testsvit.