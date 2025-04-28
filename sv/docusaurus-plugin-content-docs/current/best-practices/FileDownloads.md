---
id: file-download
title: Filnedladdning
---

När man automatiserar filnedladdningar i webbtestning är det viktigt att hantera dem konsekvent över olika webbläsare för att säkerställa tillförlitlig testexekvering.

Här tillhandahåller vi bästa praxis för filnedladdningar och visar hur man konfigurerar nedladdningskataloger för **Google Chrome**, **Mozilla Firefox** och **Microsoft Edge**.

## Nedladdningssökvägar

Att **hårdkoda** nedladdningssökvägar i testskript kan leda till underhållsproblem och portabilitetsproblem. Använd **relativa sökvägar** för nedladdningskataloger för att säkerställa portabilitet och kompatibilitet mellan olika miljöer.

```javascript
// 👎
// Hardcoded download path
const downloadPath = '/path/to/downloads';

// 👍
// Relative download path
const downloadPath = path.join(__dirname, 'downloads');
```

## Väntstrategier

Underlåtenhet att implementera korrekta väntstrategier kan leda till tävlingsvillkor eller opålitliga tester, särskilt för nedladdningskomplettering. Implementera **explicita** väntstrategier för att vänta på att filnedladdningar ska slutföras, vilket säkerställer synkronisering mellan teststeg.

```javascript
// 👎
// No explicit wait for download completion
await browser.pause(5000);

// 👍
// Wait for file download completion
await waitUntil(async ()=> await fs.existsSync(downloadPath), 5000);
```

## Konfigurering av nedladdningskataloger

För att åsidosätta filnedladdningsbeteende för **Google Chrome**, **Mozilla Firefox** och **Microsoft Edge**, ange nedladdningskatalogen i WebDriverIO-funktionerna:

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

För ett exempel på implementation, se [WebdriverIO Test Download Behavior Recipe](https://github.com/webdriverio/example-recipes/tree/main/testDownloadBehavior).

## Konfigurering av Chromium-webbläsarnedladdningar

För att ändra nedladdningssökvägen för __Chromium-baserade__ webbläsare (som Chrome, Edge, Brave, etc.) med hjälp av WebDriverIOs `getPuppeteer`-metod för åtkomst till Chrome DevTools.

```javascript
const page = await browser.getPuppeteer();
// Initiate a CDP Session:
const cdpSession = await page.target().createCDPSession();
// Set the Download Path:
await cdpSession.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: downloadPath });
```

## Hantering av flera filnedladdningar

När det gäller scenarier som involverar flera filnedladdningar är det viktigt att implementera strategier för att hantera och validera varje nedladdning effektivt. Överväg följande tillvägagångssätt:

__Sekventiell nedladdningshantering:__ Ladda ner filer en i taget och verifiera varje nedladdning innan du påbörjar nästa för att säkerställa en ordnad exekvering och noggrann validering.

__Parallell nedladdningshantering:__ Använd asynkrona programmeringstekniker för att initiera flera filnedladdningar samtidigt, optimera testexekveringstiden. Implementera robusta valideringsmekanismer för att verifiera alla nedladdningar vid slutförandet.

## Överväganden kring webbläsarkompatibilitet

Medan WebDriverIO tillhandahåller ett enhetligt gränssnitt för webbläsarautomation är det viktigt att ta hänsyn till variationer i webbläsarbeteende och funktioner. Överväg att testa din filnedladdningsfunktionalitet över olika webbläsare för att säkerställa kompatibilitet och konsekvens.

__Webbläsarspecifika konfigurationer:__ Justera inställningar för nedladdningssökvägar och väntstrategier för att rymma skillnader i webbläsarbeteende och preferenser över Chrome, Firefox, Edge och andra webbläsare som stöds.

__Webbläsarversionskompatibilitet:__ Uppdatera regelbundet dina WebDriverIO- och webbläsarversioner för att utnyttja de senaste funktionerna och förbättringarna samtidigt som du säkerställer kompatibilitet med din befintliga testsvit.