---
id: vscode-extensions
title: Test delle Estensioni di VS Code
---

WebdriverIO ti permette di testare senza problemi le tue estensioni [VS Code](https://code.visualstudio.com/) end-to-end nell'IDE VS Code Desktop o come estensione web. Devi solo fornire un percorso alla tua estensione e il framework fa il resto. Con il [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) tutto è gestito e molto altro:

- 🏗️ Installazione di VSCode (stabile, insider o una versione specifica)
- ⬇️ Download di Chromedriver specifico per la versione di VSCode
- 🚀 Ti consente di accedere all'API di VSCode dai tuoi test
- 🖥️ Avvio di VSCode con impostazioni utente personalizzate (incluso supporto per VSCode su Ubuntu, MacOS e Windows)
- 🌐 O serve VSCode da un server per essere accessibile da qualsiasi browser per testare estensioni web
- 📔 Bootstrap di page object con locator corrispondenti alla tua versione di VSCode

## Per iniziare

Per avviare un nuovo progetto WebdriverIO, esegui:

```sh
npm create wdio@latest ./
```

Una procedura guidata di installazione ti guiderà attraverso il processo. Assicurati di selezionare _"VS Code Extension Testing"_ quando ti chiede che tipo di test vorresti fare, successivamente mantieni le impostazioni predefinite o modificale in base alle tue preferenze.

## Esempio di Configurazione

Per utilizzare il servizio devi aggiungere `vscode` alla tua lista di servizi, opzionalmente seguito da un oggetto di configurazione. Questo farà sì che WebdriverIO scarichi i binari di VSCode specificati e la versione appropriata di Chromedriver:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.71.0', // "insiders" o "stable" per l'ultima versione di VSCode
        'wdio:vscodeOptions': {
            extensionPath: __dirname,
            userSettings: {
                "editor.fontSize": 14
            }
        }
    }],
    services: ['vscode'],
    /**
     * opzionalmente puoi definire il percorso in cui WebdriverIO archivia tutti
     * i binari di VSCode e Chromedriver, ad esempio:
     * services: [['vscode', { cachePath: __dirname }]]
     */
    // ...
};
```

Se definisci `wdio:vscodeOptions` con qualsiasi altro `browserName` diverso da `vscode`, ad esempio `chrome`, il servizio offrirà l'estensione come estensione web. Se testi su Chrome non è richiesto alcun servizio driver aggiuntivo, ad esempio:

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

_Nota:_ quando testi le estensioni web puoi scegliere solo tra `stable` o `insiders` come `browserVersion`.

### Configurazione TypeScript

Nel tuo `tsconfig.json` assicurati di aggiungere `wdio-vscode-service` all'elenco dei tipi:

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

## Utilizzo

Puoi quindi usare il metodo `getWorkbench` per accedere ai page object per i locator corrispondenti alla versione di VSCode desiderata:

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

Da lì puoi accedere a tutti i page object utilizzando i metodi giusti. Scopri di più su tutti i page object disponibili e i loro metodi nella [documentazione dei page object](https://webdriverio-community.github.io/wdio-vscode-service/).

### Accesso alle API di VSCode

Se desideri eseguire determinate automazioni attraverso l'[API di VSCode](https://code.visualstudio.com/api/references/vscode-api), puoi farlo eseguendo comandi remoti tramite il comando personalizzato `executeWorkbench`. Questo comando consente di eseguire codice da remoto dal tuo test all'interno dell'ambiente VSCode e permette di accedere all'API di VSCode. Puoi passare parametri arbitrari nella funzione che verranno poi propagati nella funzione. L'oggetto `vscode` sarà sempre passato come primo argomento seguito dai parametri della funzione esterna. Nota che non puoi accedere a variabili al di fuori dell'ambito della funzione poiché la callback viene eseguita in remoto. Ecco un esempio:

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // outputs: "I am an API call!"
```

Per la documentazione completa dei page object, consulta la [documentazione](https://webdriverio-community.github.io/wdio-vscode-service/modules.html). Puoi trovare vari esempi di utilizzo nella [suite di test di questo progetto](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs).

## Ulteriori Informazioni

Puoi saperne di più su come configurare il [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) e come creare page object personalizzati nella [documentazione del servizio](/docs/wdio-vscode-service). Puoi anche guardare il seguente intervento di [Christian Bromann](https://twitter.com/bromann) su [_Testing Complex VSCode Extensions With the Power of Web Standards_](https://www.youtube.com/watch?v=PhGNTioBUiU):

<LiteYouTubeEmbed
    id="PhGNTioBUiU"
    title="Testing Complex VSCode Extensions With the Power of Web Standards"
/>