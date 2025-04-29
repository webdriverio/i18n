---
id: wdio-vscode-service
title: VSCode-tilläggstest Service
custom_edit_url: https://github.com/webdriverio-community/wdio-vscode-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-vscode-service är ett tredjepartspaket, för mer information se [GitHub](https://github.com/webdriverio-community/wdio-vscode-service) | [npm](https://www.npmjs.com/package/wdio-vscode-service)

Testad på:

[![VSCode Version](https://img.shields.io/badge/VSCode%20Version-insiders%20/%20stable%20/%20v1.86.0%20/%20web-brightgreen)](https://github.com/webdriverio-community/wdio-vscode-service/actions/workflows/ci.yml) [![CI Status](https://img.shields.io/badge/Platform-windows%20%2F%20macos%20%2F%20ubuntu-brightgreen)](https://github.com/webdriverio-community/wdio-vscode-service/actions/workflows/ci.yml)

> WebdriverIO service för att testa VSCode-tillägg.

Denna WebdriverIO-tjänst låter dig sömlöst testa dina VSCode-tillägg från end-to-end i VSCode Desktop IDE eller som ett webbtillägg. Du behöver bara tillhandahålla en sökväg till ditt tillägg och tjänsten gör resten genom att:

- 🏗️ Installera VSCode (antingen `stable`, `insiders` eller en specifik version)
- ⬇️ Ladda ner Chromedriver specifik för en given VSCode-version
- 🚀 Gör det möjligt för dig att komma åt VSCode API från dina tester
- 🖥️ Starta VSCode med anpassade användarinställningar (inklusive stöd för VSCode på Ubuntu, MacOS och Windows)
- 🌐 Eller serverar VSCode från en server för att nås av valfri webbläsare för testning av [webbtillägg](https://code.visualstudio.com/api/extension-guides/web-extensions)
- 📔 Bootstrappar sidobjekt med lokalisatorer som matchar din VSCode-version

Detta projekt var mycket inspirerat av projektet [vscode-extension-tester](https://www.npmjs.com/package/vscode-extension-tester) som är baserat på Selenium. Detta paket tar idén och anpassar den till WebdriverIO.

Från och med VSCode v1.86 krävs det att du använder `webdriverio` v8.14 eller senare för att installera Chromedriver utan att någon konfiguration behövs. Om du behöver testa tidigare versioner av VSCode, se avsnittet [Chromedriver-konfiguration](#chromedriver) nedan.

## Installation

För att starta ett nytt WebdriverIO-projekt, kör:

```bash
npm create wdio ./
```

En installationsguide kommer att guida dig genom processen. Se till att du väljer TypeScript som kompilator och låt den inte generera sidobjekt för dig eftersom detta projekt kommer med alla sidobjekt som behövs. Se sedan till att välja `vscode` i listan över tjänster:

![Install Demo](https://raw.githubusercontent.com/webdriverio-community/wdio-vscode-service/main/.github/assets/demo.gif "Install Demo")

För mer information om hur du installerar `WebdriverIO`, vänligen kolla [projektdokumentationen](https://webdriver.io/docs/gettingstarted).

## Exempelkonfiguration

För att använda tjänsten behöver du lägga till `vscode` i din lista över tjänster, eventuellt följt av ett konfigurationsobjekt. Detta kommer att få WebdriverIO att ladda ner givna VSCode-binärer och lämplig Chromedriver-version:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.86.0', // "insiders" eller "stable" för senaste VSCode-versionen
        'wdio:vscodeOptions': {
            extensionPath: __dirname,
            userSettings: {
                "editor.fontSize": 14
            }
        }
    }],
    services: ['vscode'],
    /**
     * Valfritt definiera sökvägen där WebdriverIO lagrar alla VSCode-binärer, t.ex.:
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

_Obs:_ när du testar webbtillägg kan du bara välja mellan `stable` eller `insiders` som `browserVersion`.

### TypeScript-konfiguration

I din `tsconfig.json` se till att lägga till `wdio-vscode-service` i din lista över typer:

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
        "target": "es2019",
        "moduleResolution": "node",
        "esModuleInterop": true
    }
}
```

## Användning

Du kan sedan använda metoden `getWorkbench` för att komma åt sidobjekten för de lokalisatorer som matchar din önskade VSCode-version:

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

### Åtkomst till VSCode API:er

Om du vill köra viss automatisering genom [VSCode API](https://code.visualstudio.com/api/references/vscode-api) kan du göra det genom att köra fjärrkommandon via det anpassade kommandot `executeWorkbench`. Detta kommando låter dig fjärrstyra kod från ditt test inuti VSCode-miljön och gör det möjligt för dig att komma åt VSCode API. Du kan skicka in godtyckliga parametrar i funktionen som sedan kommer att propageras in i funktionen. Objektet `vscode` kommer alltid att skickas in som det första argumentet följt av de yttre funktionsparametrarna. Observera att du inte kan komma åt variabler utanför funktionsomfånget eftersom callbacken körs på distans. Här är ett exempel:

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // outputs: "I am an API call!"
```

För fullständig dokumentation om sidobjekt, kolla [dokumentationen](https://webdriverio-community.github.io/wdio-vscode-service/modules.html). Du kan hitta olika användningsexempel i detta [projekts testsvit](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs).

## Konfiguration

Genom tjänstkonfiguration kan du hantera VSCode-versionen samt användarinställningar för VSCode:

### Tjänstalternativ

Tjänstalternativ är alternativ som behövs för att tjänsten ska kunna konfigurera testmiljön.

#### `cachePath`

Definiera en cache-sökväg för att undvika att ladda ner VS Code-paket igen. Detta är användbart för CI/CD för att undvika att ladda ner VSCode för varje testkörning.

Typ: `string`<br />
Standard: `process.cwd()`

### VSCode-kapaciteter (`wdio:vscodeOptions`)

För att köra tester genom VSCode måste du definiera `vscode` som `browserName`. Du kan specificera VSCode-versionen genom att ange en `browserVersion`-kapacitet. Anpassade VSCode-alternativ definieras sedan inom den anpassade `wdio:vscodeOptions`-kapaciteten. Alternativen är följande:

#### `binary`

Sökväg till en lokalt installerad VSCode-installation. Om alternativet inte tillhandahålls kommer tjänsten att ladda ner VSCode baserat på den angivna `browserVersion` (eller `stable` om inte angiven).

Typ: `string`

#### `extensionPath`

Definiera katalogen till tillägget du vill testa.

Typ: `string`

#### `storagePath`

Definiera en anpassad plats för VS Code att lagra all sin data. Detta är roten för interna VS Code-kataloger som (partiell lista)
* **user-data-dir**: Katalogen där alla användarinställningar (globala inställningar), tilläggloggar etc. lagras.
* **extension-install-dir**: Katalogen där VS Code-tillägg installeras.

Om den inte anges används en temporär katalog.

Typ: `string`

#### `userSettings`

Definiera anpassade användarinställningar som ska tillämpas på VSCode.

Typ: `Record<string, number | string | object | boolean>`<br />
Standard: `{}`

#### `workspacePath`

Öppnar VSCode för en specifik arbetsyta. Om den inte anges startar VSCode utan någon arbetsyta öppnad.

Typ: `string`

#### `filePath`

Öppnar VSCode med en specifik fil öppnad.

Typ: `string`

#### `vscodeArgs`

Ytterligare uppstartsargument som ett objekt, t.ex.

```ts
vscodeArgs: { fooBar: true, 'bar-foo': '/foobar' }
```

kommer att skickas in som:

```ts
--foo-bar --fooBar --bar-foo=/foobar
```

Typ: `Record<string, string | boolean>`<br />
Standard: se [`constants.ts#L5-L14`](https://github.com/webdriverio-community/wdio-vscode-service/blob/196a69be3ac2fb82d9c7e4f19a2a1c8ccbaec1e2/src/constants.ts#L5-L14)

#### `verboseLogging`

Om inställt på true loggar tjänsten VSCode-utdata från tilläggshosten och konsol-API:et.

Typ: `boolean`<br />
Standard: `false`

#### `vscodeProxyOptions`

VSCode API proxykonfigurationer definierar hur WebdriverIO ansluter till VSCode-arbetsytan för att ge dig tillgång till VSCode API.

Typ: `VSCodeProxyOptions`<br />
Standard:

```ts
{
    /**
     * Om inställt på true försöker tjänsten etablera en anslutning med
     * VSCode-arbetsytan för att möjliggöra åtkomst till VSCode API
     */
    enable: true,
    /**
     * Port för WebSocket-anslutningen som används för att ansluta till arbetsytan.
     * Som standard inställd på en tillgänglig port i ditt operativsystem.
     */
    // port?: number
    /**
     * Timeout för att ansluta till WebSocket inuti VSCode
     */
    connectionTimeout: 5000,
    /**
     * Timeout för kommando som ska köras inom VSCode
     */
    commandTimeout: 5000
}
```

### Chromedriver

Från och med VSCode v1.86 krävs det att du använder `webdriverio` v8.14 eller senare för att installera Chromedriver utan att någon konfiguration behövs. [Förenklad webbläsarautomatiseringsuppsättning](https://webdriver.io/blog/2023/07/31/driver-management) hanterar allt åt dig.

För att testa tidigare versioner av VS Code, hitta den förväntade versionen av Chromedriver från loggarna, ladda ner [Chromedriver](https://chromedriver.chromium.org/downloads) och konfigurera sökvägen. Till exempel:

```
[0-0] ERROR webdriver: Failed downloading chromedriver v108: Download failed: ...
```

```ts
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.80.0',
        'wdio:chromedriverOptions': {
            binary: path.join(cacheDir, 'chromedriver-108.0.5359.71')
```

## Skapa dina egna PageObjects

Du kan återanvända komponenterna som används i denna tjänst för dina egna granskningssidoobjekt. För det, skapa först en fil som definierar alla dina väljare, t.ex.:

```ts
// t.ex. i /test/pageobjects/locators.ts
export const componentA = {
    elem: 'form', // komponentbehållarelement
    submit: 'button[type="submit"]', // skicka-knapp
    username: 'input.username', // användarnamninmatning
    password: 'input.password' // lösenordsinmatning
}
```

Nu kan du skapa ett sidobjekt enligt följande:

```ts
// t.ex. i /test/pageobjects/loginForm.ts
import { PageDecorator, IPageDecorator, BasePage } from 'wdio-vscode-service'
import * as locatorMap, { componentA as componentALocators } from './locators'
export interface LoginForm extends IPageDecorator<typeof componentALocators> {}
@PageDecorator(componentALocators)
export class LoginForm extends BasePage<typeof componentALocators, typeof locatorMap> {
    /**
     * @private locator-nyckel för att identifiera locator-mappning (se locators.ts)
     */
    public locatorKey = 'componentA' as const

    public login (username: string, password: string) {
        await this.username$.setValue(username)
        await this.password$.setValue(password)
        await this.submit$.click()
    }
}
```

Nu i ditt test kan du använda ditt sidobjekt enligt följande:

```ts
import { LoginForm } from '../pageobjects/loginForm'
import * as locatorMap from '../locators'

// t.ex. i /test/specs/example.e2e.ts
describe('my extension', () => {
    it('should login', async () => {
        const loginForm = new LoginForm(locatorMap)
        await loginForm.login('admin', 'test123')

        // du kan också använda sidoobjektelement direkt via `[selector]$`
        // eller `[selector]$$`, t.ex.:
        await loginForm.submit$.click()

        // eller komma åt lokalisatorer direkt
        console.log(loginForm.locators.username)
        // outputs: "input.username"
    })
})
```

## TypeScript-stöd

Om du använder WebdriverIO med TypeScript, se till att lägga till `wdio-vscode-service` till dina `types` i din `tsconfig.json`, t.ex.:

```json
{
    "compilerOptions": {
        "moduleResolution": "node",
        "types": [
            "webdriverio/async",
            "@wdio/mocha-framework",
            "expect-webdriverio",
            // lägg till denna tjänst till dina typer
            "wdio-devtools-service"
        ],
        "target": "es2019"
    }
}
```

## Proxy-stöd

Under initieringen av denna tjänst laddas en ChromeDriver och VSCode-distribution ner. Du kan tunnla dessa förfrågningar genom en proxy genom att ställa in miljövariabeln `HTTPS_PROXY` eller `https_proxy`. Till exempel:

```bash
HTTPS_PROXY=http://127.0.0.1:1080 npm run wdio
```

## Referenser

Följande VS Code-tillägg använder `wdio-vscode-service`:

- [Marquee](https://marketplace.visualstudio.com/items?itemName=stateful.marquee) (27k nedladdningar)
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (27.8m nedladdningar)
- [DVC Extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=Iterative.dvc) (11.2k nedladdningar)
- [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) (1.2m nedladdningar)
- [inlang – i18n supercharged](https://marketplace.visualstudio.com/items?itemName=inlang.vs-code-extension) (3k nedladdningar)

## Bidra

Innan du postar en pull request, vänligen kör följande:

1. `git clone git@github.com:webdriverio-community/wdio-vscode-service.git`
1. `cd wdio-vscode-service`
1. `npm install`
1. `npm run build`
1. `npm run test` (eller `npm run ci`)

## Lär dig mer

Om du vill lära dig mer om att testa VSCode-tillägg, kolla [Christian Bromanns](https://twitter.com/bromann) föredrag på [OpenJS World 2022](https://www.youtube.com/watch?v=PhGNTioBUiU):

[![Testing VSCode Extensions at OpenJS World 2022](https://img.youtube.com/vi/PhGNTioBUiU/sddefault.jpg)](https://www.youtube.com/watch?v=PhGNTioBUiU)

---

För mer information om WebdriverIO, kolla projektets [hemsida](https://webdriver.io).