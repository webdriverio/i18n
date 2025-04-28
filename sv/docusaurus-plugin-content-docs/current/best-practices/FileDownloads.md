---
id: file-download
title: Filnedladdning
---

När man automatiserar filnedladdningar i webbtestning är det viktigt att hantera dem konsekvent över olika webbläsare för att säkerställa pålitlig testexekvering.

Här tillhandahåller vi bästa praxis för filnedladdningar och visar hur man konfigurerar nedladdningskataloger för **Google Chrome**, **Mozilla Firefox** och **Microsoft Edge**.

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

## Väntstrategier

Om man inte implementerar korrekta väntstrategier kan det leda till tävlingsvillkor eller opålitliga tester, särskilt för nedladdningsfullbordande. Implementera **explicita** väntstrategier för att vänta på att filnedladdningar ska slutföras, vilket säkerställer synkronisering mellan teststeg.

```javascript
// 👎
// Ingen explicit väntan på nedladdningsfullbordande
await browser.pause(5000);

// 👍
// Vänta på att filnedladdningen slutförs
await waitUntil(async ()=> await fs.existsSync(downloadPath), 5000);
```

## Konfigurering av nedladdningskataloger

För att åsidosätta filnedladdningsbeteendet för **Google Chrome**, **Mozilla Firefox** och **Microsoft Edge**, ange nedladdningskatalogen i WebDriverIO-kapaciteterna:

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

För ett exempel på implementering, se [WebdriverIO Test Download Behavior Recipe](https://github.com/webdriverio/example-recipes/tree/main/testDownloadBehavior).

## Konfigurering av nedladdningar för Chromium-webbläsare

För att ändra nedladdningssökvägen för __Chromium-baserade__ webbläsare (som Chrome, Edge, Brave, etc.) med hjälp av WebDriverIOs `getPuppeteer`-metod för åtkomst till Chrome DevTools.

```javascript
const page = await browser.getPuppeteer();
// Initiera en CDP-session:
const cdpSession = await page.target().createCDPSession();
// Ställ in nedladdningssökvägen:
await cdpSession.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: downloadPath });
```

## Hantering av flera filnedladdningar

När man hanterar scenarier som involverar flera filnedladdningar är det viktigt att implementera strategier för att hantera och validera varje nedladdning effektivt. Överväg följande tillvägagångssätt:

__Sekventiell nedladdningshantering:__ Ladda ner filer en i taget och verifiera varje nedladdning innan du initierar nästa för att säkerställa ordnad exekvering och korrekt validering.

__Parallell nedladdningshantering:__ Använd asynkrona programmeringstekniker för att initiera flera filnedladdningar samtidigt, vilket optimerar testexekveringstiden. Implementera robusta valideringsmekanismer för att verifiera alla nedladdningar vid slutförande.

## Överväganden för kompatibilitet mellan webbläsare

Även om WebDriverIO tillhandahåller ett enhetligt gränssnitt för webbläsarautomatisering är det viktigt att ta hänsyn till variationer i webbläsarbeteende och kapacitet. Överväg att testa din filnedladdningsfunktionalitet över olika webbläsare för att säkerställa kompatibilitet och konsekvens.

__Webbläsarspecifika konfigurationer:__ Justera inställningar för nedladdningssökväg och väntstrategier för att anpassa sig till skillnader i webbläsarbeteende och preferenser mellan Chrome, Firefox, Edge och andra webbläsare som stöds.

__Kompatibilitet med webbläsarversion:__ Uppdatera regelbundet dina WebDriverIO- och webbläsarversioner för att utnyttja de senaste funktionerna och förbättringarna samtidigt som du säkerställer kompatibilitet med din befintliga testsvit.