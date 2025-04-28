---
id: vscode-extensions
title: Testning av VS Code-tillägg
---

WebdriverIO låter dig sömlöst testa dina [VS Code](https://code.visualstudio.com/)-tillägg från end-to-end i VS Code Desktop IDE eller som webbtillägg. Du behöver bara ange en sökväg till ditt tillägg så sköter ramverket resten. Med [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) tas allt om hand och mycket mer:

- 🏗️ Installerar VSCode (antingen stabil, insiders eller en specificerad version)
- ⬇️ Laddar ner Chromedriver specifikt för given VSCode-version
- 🚀 Gör det möjligt att komma åt VSCode API från dina tester
- 🖥️ Startar VSCode med anpassade användarinställningar (inklusive stöd för VSCode på Ubuntu, MacOS och Windows)
- 🌐 Eller serverar VSCode från en server för att nås av vilken webbläsare som helst för testning av webbtillägg
- 📔 Skapar page objects med lokalisatorer som matchar din VSCode-version

## Komma igång

För att starta ett nytt WebdriverIO-projekt, kör:

```sh
npm create wdio@latest ./
```

En installationsguide kommer att vägleda dig genom processen. Se till att välja _"VS Code Extension Testing"_ när den frågar vilken typ av testning du vill göra, därefter kan du behålla standardinställningarna eller ändra efter dina preferenser.

## Exempelkonfiguration

För att använda tjänsten behöver du lägga till `vscode` i din lista över tjänster, eventuellt följt av ett konfigurationsobjekt. Detta gör att WebdriverIO laddar ner angivna VSCode-binärer och lämplig Chromedriver-version:

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
     * valfritt kan du definiera sökvägen där WebdriverIO lagrar alla
     * VSCode- och Chromedriver-binärer, t.ex.:
     * services: [['vscode', { cachePath: __dirname }]]
     */
    // ...
};
```

Om du definierar `wdio:vscodeOptions` med något annat `browserName` än `vscode`, t.ex. `chrome`, kommer tjänsten att servera tillägget som ett webbtillägg. Om du testar på Chrome behövs ingen ytterligare drivrutinstjänst, t.ex.:

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

_Observera:_ när du testar webbtillägg kan du bara välja mellan `stable` eller `insiders` som `browserVersion`.

### TypeScript-inställning

I din `tsconfig.json`, se till att lägga till `wdio-vscode-service` till din lista över typer:

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

Du kan sedan använda metoden `getWorkbench` för att komma åt page objects för lokalisatorerna som matchar din önskade VSCode-version:

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

Därifrån kan du komma åt alla page objects genom att använda rätt page object-metoder. Ta reda på mer om alla tillgängliga page objects och deras metoder i [page object-dokumentationen](https://webdriverio-community.github.io/wdio-vscode-service/).

### Åtkomst till VSCode APIs

Om du vill utföra viss automatisering genom [VSCode API](https://code.visualstudio.com/api/references/vscode-api) kan du göra det genom att köra fjärrkommandon via det anpassade kommandot `executeWorkbench`. Detta kommando låter dig fjärrutföra kod från ditt test inne i VSCode-miljön och ger möjlighet att komma åt VSCode API. Du kan skicka godtyckliga parametrar till funktionen som sedan kommer att propageras till funktionen. Objektet `vscode` kommer alltid att skickas in som första argument följt av de yttre funktionsparametrarna. Observera att du inte kan komma åt variabler utanför funktionens omfattning eftersom callback-funktionen utförs på distans. Här är ett exempel:

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // skriver ut: "I am an API call!"
```

För fullständig page object-dokumentation, kolla in [dokumentationen](https://webdriverio-community.github.io/wdio-vscode-service/modules.html). Du kan hitta olika användningsexempel i detta [projekts testsvit](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs).

## Mer information

Du kan lära dig mer om hur du konfigurerar [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) och hur du skapar anpassade page objects i [tjänstdokumentationen](/docs/wdio-vscode-service). Du kan också titta på följande föredrag av [Christian Bromann](https://twitter.com/bromann) om [_Testing Complex VSCode Extensions With the Power of Web Standards_](https://www.youtube.com/watch?v=PhGNTioBUiU):

<LiteYouTubeEmbed
    id="PhGNTioBUiU"
    title="Testing Complex VSCode Extensions With the Power of Web Standards"
/>