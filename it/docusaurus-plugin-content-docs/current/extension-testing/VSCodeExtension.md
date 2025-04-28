---
id: vscode-extensions
title: Test delle Estensioni di VS Code
---

WebdriverIO ti permette di testare senza problemi le tue estensioni di [VS Code](https://code.visualstudio.com/) end-to-end nell'IDE desktop VS Code o come estensioni web. Devi solo fornire un percorso alla tua estensione e il framework fa il resto. Con il [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) tutto è gestito e molto altro:

- 🏗️ Installazione di VSCode (stabile, insiders o una versione specifica)
- ⬇️ Download di Chromedriver specifico per la versione di VSCode fornita
- 🚀 Ti permette di accedere all'API di VSCode dai tuoi test
- 🖥️ Avvio di VSCode con impostazioni utente personalizzate (incluso il supporto per VSCode su Ubuntu, MacOS e Windows)
- 🌐 Oppure serve VSCode da un server per essere accessibile da qualsiasi browser per testare le estensioni web
- 📔 Creazione di page object con localizzatori corrispondenti alla tua versione di VSCode

## Iniziare

Per iniziare un nuovo progetto WebdriverIO, esegui:

```sh
npm create wdio@latest ./
```

Una procedura guidata di installazione ti guiderà attraverso il processo. Assicurati di selezionare _"VS Code Extension Testing"_ quando ti chiede che tipo di test vorresti fare, successivamente mantieni le impostazioni predefinite o modificale in base alle tue preferenze.

## Configurazione di Esempio

Per utilizzare il servizio è necessario aggiungere `vscode` all'elenco dei servizi, opzionalmente seguito da un oggetto di configurazione. Questo farà sì che WebdriverIO scarichi i binari di VSCode specificati e la versione appropriata di Chromedriver:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.71.0', // "insiders" o "stable" per la versione più recente di VSCode
        'wdio:vscodeOptions': {
            extensionPath: __dirname,
            userSettings: {
                "editor.fontSize": 14
            }
        }
    }],
    services: ['vscode'],
    /**
     * opzionalmente puoi definire il percorso in cui WebdriverIO memorizza tutti
     * i binari di VSCode e Chromedriver, ad esempio:
     * services: [['vscode', { cachePath: __dirname }]]
     */
    // ...
};
```

Se definisci `wdio:vscodeOptions` con qualsiasi altro `browserName` diverso da `vscode`, ad esempio `chrome`, il servizio servirà l'estensione come estensione web. Se si esegue il test su Chrome non è richiesto alcun servizio driver aggiuntivo, ad esempio:

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

_Nota:_ quando si testano estensioni web, è possibile scegliere solo tra `stable` o `insiders` come `browserVersion`.

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
        "target": "es2020",
        "moduleResolution": "node16"
    }
}
```

## Utilizzo

Puoi quindi utilizzare il metodo `getWorkbench` per accedere agli oggetti pagina per i localizzatori corrispondenti alla versione di VSCode desiderata:

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

Da lì puoi accedere a tutti gli oggetti pagina utilizzando i metodi appropriati. Scopri di più su tutti gli oggetti pagina disponibili e i loro metodi nella [documentazione degli oggetti pagina](https://webdriverio-community.github.io/wdio-vscode-service/).

### Accesso alle API di VSCode

Se desideri eseguire determinate automazioni tramite l'[API di VSCode](https://code.visualstudio.com/api/references/vscode-api), puoi farlo eseguendo comandi remoti tramite il comando personalizzato `executeWorkbench`. Questo comando consente di eseguire codice da remoto dal tuo test all'interno dell'ambiente VSCode e permette di accedere all'API di VSCode. Puoi passare parametri arbitrari nella funzione che verranno quindi propagati nella funzione. L'oggetto `vscode` sarà sempre passato come primo argomento seguito dai parametri della funzione esterna. Nota che non puoi accedere a variabili al di fuori dell'ambito della funzione poiché il callback viene eseguito da remoto. Ecco un esempio:

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // stampa: "I am an API call!"
```

Per la documentazione completa degli oggetti pagina, consulta la [documentazione](https://webdriverio-community.github.io/wdio-vscode-service/modules.html). Puoi trovare vari esempi di utilizzo nella [suite di test di questo progetto](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs).

## Ulteriori Informazioni

Puoi saperne di più su come configurare il [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) e come creare oggetti pagina personalizzati nella [documentazione del servizio](/docs/wdio-vscode-service). Puoi anche guardare il seguente talk di [Christian Bromann](https://twitter.com/bromann) su [_Testing Complex VSCode Extensions With the Power of Web Standards_](https://www.youtube.com/watch?v=PhGNTioBUiU):

<LiteYouTubeEmbed
    id="PhGNTioBUiU"
    title="Testing Complex VSCode Extensions With the Power of Web Standards"
/>