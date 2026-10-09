---
id: vscode-extensions
title: Testning av VS Code-tillägg
description: "Testa VS Code-tillägg från början till slut i skrivbords-IDE:n eller som webbtillägg med WebdriverIO och VS Code-tjänsten."
---

WebdriverIO låter dig smidigt testa dina [VS Code](https://code.visualstudio.com/)-tillägg från början till slut i VS Code Desktop IDE eller som webbtillägg. Du behöver bara ange en sökväg till ditt tillägg så sköter ramverket resten. Med [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) tas allt om hand och mycket mer:

- 🏗️ Installerar VSCode (antingen stable, insiders eller en angiven version)
- ⬇️ Laddar ner Chromedriver specifik för den angivna VSCode-versionen
- 🚀 Gör det möjligt att komma åt VSCode API från dina tester
- 🖥️ Startar VSCode med anpassade användarinställningar (inklusive stöd för VSCode på Ubuntu, MacOS och Windows)
- 🌐 Eller serverar VSCode från en server så att det kan nås av valfri webbläsare för att testa webbtillägg
- 📔 Initierar sidobjekt med lokaliserare som matchar din VSCode-version

## Kom igång

För att initiera ett nytt WebdriverIO-projekt, kör:

```sh
npm create wdio@latest ./
```

En installationsguide kommer att leda dig genom processen. Se till att du väljer _"VS Code Extension Testing"_ när den frågar vilken typ av testning du vill göra, och behåll sedan standardinställningarna eller ändra dem efter dina önskemål.

## Exempelkonfiguration

För att använda tjänsten behöver du lägga till `vscode` i din lista över tjänster, eventuellt följt av ett konfigurationsobjekt. Detta får WebdriverIO att ladda ner de angivna VSCode-binärfilerna och lämplig Chromedriver-version:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.71.0', // "insiders" eller "stable" för senaste VSCode-versionen
        'wdio:vscodeOptions': {
            extensionPath: __dirname,
            userSettings: {
                "editor.fontSize": 14
            }
        }
    }],
    services: ['vscode'],
    /**
     * du kan valfritt ange sökvägen där WebdriverIO lagrar alla
     * VSCode- och Chromedriver-binärfiler, t.ex.:
     * services: [['vscode', { cachePath: __dirname }]]
     */
    // ...
};
```

Om du definierar `wdio:vscodeOptions` med något annat `browserName` än `vscode`, t.ex. `chrome`, kommer tjänsten att servera tillägget som ett webbtillägg. Om du testar i Chrome krävs ingen ytterligare drivrutinstjänst, t.ex.:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'chrome',
        'wdio:vscodeOptions': {
            extensionPath: __dirname
        }
    }],
    services: ['vscode'],
    // ...
};
```

_Obs:_ när du testar webbtillägg kan du bara välja mellan `stable` eller `insiders` som `browserVersion`.

### TypeScript-konfiguration

I din `tsconfig.json`, se till att lägga till `wdio-vscode-service` i din lista över typer:

```json
{
    "compilerOptions": {
        "types": [
            "node",
            "webdriverio/async",
            "@wdio/mocha-framework",
            "expect-webdriverio",
            "wdio-vscode-service"
        ],
        "target": "es2020",
        "moduleResolution": "node16"
    }
}
```

## Användning

Du kan sedan använda metoden `getWorkbench` för att komma åt sidobjekten för lokaliserarna som matchar din önskade VSCode-version:

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

Därifrån kan du komma åt alla sidobjekt genom att använda rätt sidobjektmetoder. Läs mer om alla tillgängliga sidobjekt och deras metoder i [dokumentationen för sidobjekt](https://webdriverio-community.github.io/wdio-vscode-service/).

### Åtkomst till VSCode API:er

Om du vill utföra viss automatisering via [VSCode API](https://code.visualstudio.com/api/references/vscode-api) kan du göra det genom att köra fjärrkommandon via det anpassade kommandot `executeWorkbench`. Detta kommando låter dig fjärrköra kod från ditt test inuti VSCode-miljön och ger åtkomst till VSCode API. Du kan skicka godtyckliga parametrar till funktionen, som sedan vidarebefordras in i funktionen. Objektet `vscode` skickas alltid in som första argument, följt av den yttre funktionens parametrar. Observera att du inte kan komma åt variabler utanför funktionens räckvidd eftersom callback-funktionen körs på distans. Här är ett exempel:

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // skriver ut: "I am an API call!"
```

För fullständig dokumentation om sidobjekt, se [dokumentationen](https://webdriverio-community.github.io/wdio-vscode-service/modules.html). Du hittar olika användningsexempel i detta [projekts testsvit](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs).

## Mer information

Du kan lära dig mer om hur du konfigurerar [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) och hur du skapar anpassade sidobjekt i [tjänstens dokumentation](/docs/wdio-vscode-service). Du kan också titta på följande föredrag av [Christian Bromann](https://twitter.com/bromann) om [_Testing Complex VSCode Extensions With the Power of Web Standards_](https://www.youtube.com/watch?v=PhGNTioBUiU):

<LiteYouTubeEmbed
    id="PhGNTioBUiU"
    title="Testing Complex VSCode Extensions With the Power of Web Standards"
/>