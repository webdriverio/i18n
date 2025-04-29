---
id: wdio-vscode-service
title: Servizio di Testing per Estensioni VSCode
custom_edit_url: https://github.com/webdriverio-community/wdio-vscode-service/edit/main/README.md
---


> wdio-vscode-service è un pacchetto di terze parti, per maggiori informazioni si prega di consultare [GitHub](https://github.com/webdriverio-community/wdio-vscode-service) | [npm](https://www.npmjs.com/package/wdio-vscode-service)

Testato su:

[![VSCode Version](https://img.shields.io/badge/VSCode%20Version-insiders%20/%20stable%20/%20v1.86.0%20/%20web-brightgreen)](https://github.com/webdriverio-community/wdio-vscode-service/actions/workflows/ci.yml) [![CI Status](https://img.shields.io/badge/Platform-windows%20%2F%20macos%20%2F%20ubuntu-brightgreen)](https://github.com/webdriverio-community/wdio-vscode-service/actions/workflows/ci.yml)

> Servizio WebdriverIO per testare le estensioni VSCode.

Questo servizio WebdriverIO ti permette di testare senza problemi le tue estensioni VSCode end-to-end nell'IDE Desktop VSCode o come estensione web. Devi solo fornire un percorso alla tua estensione e il servizio fa il resto:

- 🏗️ Installando VSCode (sia `stable`, `insiders` o una versione specifica)
- ⬇️ Scaricando Chromedriver specifico per una determinata versione di VSCode
- 🚀 Ti permette di accedere all'API VSCode dai tuoi test
- 🖥️ Avviando VSCode con impostazioni utente personalizzate (incluso il supporto per VSCode su Ubuntu, MacOS e Windows)
- 🌐 O serve VSCode da un server per essere accessibile da qualsiasi browser per testare [estensioni web](https://code.visualstudio.com/api/extension-guides/web-extensions)
- 📔 Creando page object con locatori corrispondenti alla tua versione VSCode

Questo progetto è stato fortemente ispirato dal progetto [vscode-extension-tester](https://www.npmjs.com/package/vscode-extension-tester) basato su Selenium. Questo pacchetto prende l'idea e la adatta a WebdriverIO.

A partire da VSCode v1.86 è necessario utilizzare `webdriverio` v8.14 o successivo per installare Chromedriver senza configurazione necessaria. Se hai bisogno di testare versioni precedenti di VSCode, consulta la sezione [Configurazione di Chromedriver](#chromedriver) qui sotto.

## Installazione

Per iniziare un nuovo progetto WebdriverIO, esegui:

```bash
npm create wdio ./
```

Una procedura guidata di installazione ti guiderà attraverso il processo. Assicurati di selezionare TypeScript come compilatore e non generare page object poiché questo progetto include già tutti i page object necessari. Quindi assicurati di selezionare `vscode` nell'elenco dei servizi:

![Install Demo](https://raw.githubusercontent.com/webdriverio-community/wdio-vscode-service/main/.github/assets/demo.gif "Install Demo")

Per maggiori informazioni su come installare `WebdriverIO`, consulta la [documentazione del progetto](https://webdriver.io/docs/gettingstarted).

## Configurazione di Esempio

Per utilizzare il servizio devi aggiungere `vscode` alla tua lista di servizi, opzionalmente seguito da un oggetto di configurazione. Questo farà sì che WebdriverIO scarichi i binari di VSCode e la versione appropriata di Chromedriver:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.86.0', // "insiders" o "stable" per l'ultima versione di VSCode
        'wdio:vscodeOptions': {
            extensionPath: __dirname,
            userSettings: {
                "editor.fontSize": 14
            }
        }
    }],
    services: ['vscode'],
    /**
     * Opzionalmente definisci il percorso in cui WebdriverIO memorizza tutti i binari VSCode, es.:
     * services: [['vscode', { cachePath: __dirname }]]
     */
    // ...
};
```

Se definisci `wdio:vscodeOptions` con qualsiasi altro `browserName` diverso da `vscode`, ad esempio `chrome`, il servizio servirà l'estensione come estensione web. Se testi su Chrome non è richiesto alcun servizio driver aggiuntivo, ad esempio:

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

_Nota:_ quando si testano estensioni web è possibile scegliere solo tra `stable` o `insiders` come `browserVersion`.

### Configurazione TypeScript

Nel tuo `tsconfig.json` assicurati di aggiungere `wdio-vscode-service` alla tua lista di tipi:

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

## Utilizzo

Puoi quindi utilizzare il metodo `getWorkbench` per accedere ai page object per i locatori corrispondenti alla versione VSCode desiderata:

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

### Accesso alle API VSCode

Se desideri eseguire determinate automazioni attraverso l'[API VSCode](https://code.visualstudio.com/api/references/vscode-api), puoi farlo eseguendo comandi remoti tramite il comando personalizzato `executeWorkbench`. Questo comando ti consente di eseguire codice in remoto dai tuoi test all'interno dell'ambiente VSCode e ti permette di accedere all'API VSCode. Puoi passare parametri arbitrari alla funzione che verranno poi propagati nella funzione. L'oggetto `vscode` verrà sempre passato come primo argomento, seguito dai parametri della funzione esterna. Nota che non puoi accedere a variabili al di fuori dell'ambito della funzione poiché la callback viene eseguita in remoto. Ecco un esempio:

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // outputs: "I am an API call!"
```

Per la documentazione completa dei page object, consulta la [documentazione](https://webdriverio-community.github.io/wdio-vscode-service/modules.html). Puoi trovare vari esempi di utilizzo nella [suite di test di questo progetto](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs).

## Configurazione

Attraverso la configurazione del servizio, puoi gestire la versione di VSCode e le impostazioni utente per VSCode:

### Opzioni del Servizio

Le opzioni del servizio sono opzioni necessarie per configurare l'ambiente di test.

#### `cachePath`

Definisci un percorso cache per evitare di scaricare nuovamente i bundle VS Code. Questo è utile per CI/CD per evitare di scaricare nuovamente VSCode per ogni esecuzione del test.

Tipo: `string`<br />
Default: `process.cwd()`

### Capabilities VSCode (`wdio:vscodeOptions`)

Per eseguire test tramite VSCode devi definire `vscode` come `browserName`. Puoi specificare la versione di VSCode fornendo una capability `browserVersion`. Le opzioni personalizzate di VSCode sono poi definite all'interno della capability personalizzata `wdio:vscodeOptions`. Le opzioni sono le seguenti:

#### `binary`

Percorso di un'installazione VSCode locale. Se l'opzione non viene fornita, il servizio scaricherà VSCode in base al `browserVersion` fornito (o `stable` se non specificato).

Tipo: `string`

#### `extensionPath`

Definisci la directory dell'estensione che vuoi testare.

Tipo: `string`

#### `storagePath`

Definisci una posizione personalizzata in cui VS Code memorizza tutti i suoi dati. Questa è la radice per le directory interne di VS Code come (elenco parziale)
* **user-data-dir**: La directory in cui sono memorizzate tutte le impostazioni utente (impostazioni globali), i log delle estensioni, ecc.
* **extension-install-dir**: La directory in cui sono installate le estensioni VS Code.

Se non specificato, viene utilizzata una directory temporanea.

Tipo: `string`

#### `userSettings`

Definisci impostazioni utente personalizzate da applicare a VSCode.

Tipo: `Record<string, number | string | object | boolean>`<br />
Default: `{}`

#### `workspacePath`

Apre VSCode per uno specifico workspace. Se non fornito, VSCode si avvia senza un workspace aperto.

Tipo: `string`

#### `filePath`

Apre VSCode con un file specifico aperto.

Tipo: `string`

#### `vscodeArgs`

Argomenti di avvio aggiuntivi come oggetto, ad esempio:

```ts
vscodeArgs: { fooBar: true, 'bar-foo': '/foobar' }
```

verranno passati come:

```ts
--foo-bar --fooBar --bar-foo=/foobar
```

Tipo: `Record<string, string | boolean>`<br />
Default: vedi [`constants.ts#L5-L14`](https://github.com/webdriverio-community/wdio-vscode-service/blob/196a69be3ac2fb82d9c7e4f19a2a1c8ccbaec1e2/src/constants.ts#L5-L14)

#### `verboseLogging`

Se impostato su true, il servizio registra l'output di VSCode dall'host di estensione e dall'API della console.

Tipo: `boolean`<br />
Default: `false`

#### `vscodeProxyOptions`

Le configurazioni del proxy dell'API VSCode definiscono come WebdriverIO si connette al workbench VSCode per darti accesso all'API VSCode.

Tipo: `VSCodeProxyOptions`<br />
Default:

```ts
{
    /**
     * Se impostato su true, il servizio tenta di stabilire una connessione con il
     * workbench VSCode per abilitare l'accesso all'API VSCode
     */
    enable: true,
    /**
     * Porta della connessione WebSocket utilizzata per connettersi al workbench.
     * Per impostazione predefinita è impostata su una porta disponibile nel tuo sistema operativo.
     */
    // port?: number
    /**
     * Timeout per la connessione a WebSocket all'interno di VSCode
     */
    connectionTimeout: 5000,
    /**
     * Timeout per il comando da eseguire all'interno di VSCode
     */
    commandTimeout: 5000
}
```

### Chromedriver

A partire da VSCode v1.86 è necessario utilizzare `webdriverio` v8.14 o successivo per installare Chromedriver senza configurazione necessaria. La [configurazione semplificata dell'automazione del browser](https://webdriver.io/blog/2023/07/31/driver-management) gestisce tutto per te.

Per testare versioni precedenti di VS Code, trova la versione prevista di Chromedriver dai log, scarica [Chromedriver](https://chromedriver.chromium.org/downloads) e configura il percorso. Ad esempio:

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

## Crea i Tuoi PageObjects

Puoi riutilizzare i componenti utilizzati in questo servizio per i tuoi page object di revisione. Per farlo, crea prima un file che definisce tutti i tuoi selettori, ad esempio:

```ts
// e.g. in /test/pageobjects/locators.ts
export const componentA = {
    elem: 'form', // elemento contenitore del componente
    submit: 'button[type="submit"]', // pulsante di invio
    username: 'input.username', // input per il nome utente
    password: 'input.password' // input per la password
}
```

Ora puoi creare un page object come segue:

```ts
// e.g. in /test/pageobjects/loginForm.ts
import { PageDecorator, IPageDecorator, BasePage } from 'wdio-vscode-service'
import * as locatorMap, { componentA as componentALocators } from './locators'
export interface LoginForm extends IPageDecorator<typeof componentALocators> {}
@PageDecorator(componentALocators)
export class LoginForm extends BasePage<typeof componentALocators, typeof locatorMap> {
    /**
     * @private chiave di locator per identificare la mappa dei locator (vedi locators.ts)
     */
    public locatorKey = 'componentA' as const

    public login (username: string, password: string) {
        await this.username$.setValue(username)
        await this.password$.setValue(password)
        await this.submit$.click()
    }
}
```

Ora nel tuo test, puoi usare il tuo page object come segue:

```ts
import { LoginForm } from '../pageobjects/loginForm'
import * as locatorMap from '../locators'

// e.g. in /test/specs/example.e2e.ts
describe('my extension', () => {
    it('should login', async () => {
        const loginForm = new LoginForm(locatorMap)
        await loginForm.login('admin', 'test123')

        // puoi anche usare direttamente gli elementi del page object tramite `[selector]$`
        // o `[selector]$$`, ad esempio:
        await loginForm.submit$.click()

        // o accedere direttamente ai locator
        console.log(loginForm.locators.username)
        // outputs: "input.username"
    })
})
```

## Supporto TypeScript

Se utilizzi WebdriverIO con TypeScript assicurati di aggiungere `wdio-vscode-service` ai tuoi `types` nel tuo `tsconfig.json`, ad esempio:

```json
{
    "compilerOptions": {
        "moduleResolution": "node",
        "types": [
            "webdriverio/async",
            "@wdio/mocha-framework",
            "expect-webdriverio",
            // aggiungi questo servizio ai tuoi tipi
            "wdio-devtools-service"
        ],
        "target": "es2019"
    }
}
```

## Supporto Proxy

Durante l'inizializzazione di questo servizio, vengono scaricati ChromeDriver e la distribuzione VSCode. Puoi instradare queste richieste attraverso un proxy impostando la variabile d'ambiente `HTTPS_PROXY` o `https_proxy`. Ad esempio:

```bash
HTTPS_PROXY=http://127.0.0.1:1080 npm run wdio
```

## Riferimenti

Le seguenti estensioni VS Code utilizzano `wdio-vscode-service`:

- [Marquee](https://marketplace.visualstudio.com/items?itemName=stateful.marquee) (27k download)
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (27.8m download)
- [DVC Extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=Iterative.dvc) (11.2k download)
- [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) (1.2m download)
- [inlang – i18n supercharged](https://marketplace.visualstudio.com/items?itemName=inlang.vs-code-extension) (3k download)

## Contribuire

Prima di inviare una pull request, esegui quanto segue:

1. `git clone git@github.com:webdriverio-community/wdio-vscode-service.git`
1. `cd wdio-vscode-service`
1. `npm install`
1. `npm run build`
1. `npm run test` (o `npm run ci`)

## Ulteriori Informazioni

Se vuoi saperne di più sui test delle estensioni VSCode, dai un'occhiata al talk di [Christian Bromann](https://twitter.com/bromann) all'[OpenJS World 2022](https://www.youtube.com/watch?v=PhGNTioBUiU):

[![Testing VSCode Extensions at OpenJS World 2022](https://img.youtube.com/vi/PhGNTioBUiU/sddefault.jpg)](https://www.youtube.com/watch?v=PhGNTioBUiU)

---

Per ulteriori informazioni su WebdriverIO, consulta la [homepage](https://webdriver.io) del progetto.