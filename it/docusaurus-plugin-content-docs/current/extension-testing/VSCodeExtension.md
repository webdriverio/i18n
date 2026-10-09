---
id: vscode-extensions
title: Test delle estensioni VS Code
description: "Testa le estensioni VS Code end-to-end nell'IDE desktop o come estensioni web con WebdriverIO e il servizio VS Code."
---

WebdriverIO ti permette di testare senza problemi le tue estensioni [VS Code](https://code.visualstudio.com/) end-to-end nell'IDE VS Code Desktop o come estensione web. Devi solo fornire un percorso alla tua estensione e il framework fa il resto. Con il [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) tutto viene gestito automaticamente, e molto altro:

- 🏗️ Installazione di VSCode (versione stable, insiders o una versione specifica)
- ⬇️ Download di Chromedriver specifico per la versione di VSCode indicata
- 🚀 Ti consente di accedere all'API di VSCode dai tuoi test
- 🖥️ Avvio di VSCode con impostazioni utente personalizzate (incluso il supporto per VSCode su Ubuntu, MacOS e Windows)
- 🌐 Oppure serve VSCode da un server, accessibile da qualsiasi browser, per testare estensioni web
- 📔 Inizializzazione di page object con locator corrispondenti alla tua versione di VSCode

## Per iniziare

Per avviare un nuovo progetto WebdriverIO, esegui:

```sh
npm create wdio@latest ./
```

Una procedura guidata di installazione ti accompagnerà nel processo. Assicurati di selezionare _"VS Code Extension Testing"_ quando ti viene chiesto che tipo di test desideri eseguire, dopodiché mantieni semplicemente le impostazioni predefinite o modificale in base alle tue preferenze.

## Configurazione di esempio

Per utilizzare il servizio devi aggiungere `vscode` al tuo elenco di servizi, seguito facoltativamente da un oggetto di configurazione. In questo modo WebdriverIO scaricherà i binari di VSCode indicati e la versione appropriata di Chromedriver:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.71.0', // "insiders" or "stable" for latest VSCode version
        'wdio:vscodeOptions': {
            extensionPath: __dirname,
            userSettings: {
                "editor.fontSize": 14
            }
        }
    }],
    services: ['vscode'],
    /**
     * optionally you can define the path WebdriverIO stores all
     * VSCode and Chromedriver binaries, e.g.:
     * services: [['vscode', { cachePath: __dirname }]]
     */
    // ...
};
```

Se definisci `wdio:vscodeOptions` con un `browserName` diverso da `vscode`, ad esempio `chrome`, il servizio servirà l'estensione come estensione web. Se esegui i test su Chrome non è richiesto alcun servizio driver aggiuntivo, ad esempio:

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

_Nota:_ quando testi estensioni web puoi scegliere solo tra `stable` o `insiders` come `browserVersion`.

### Configurazione di TypeScript

Nel tuo `tsconfig.json` assicurati di aggiungere `wdio-vscode-service` al tuo elenco di tipi:

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

Puoi quindi utilizzare il metodo `getWorkbench` per accedere ai page object per i locator corrispondenti alla versione di VSCode desiderata:

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

Da lì puoi accedere a tutti i page object utilizzando gli appositi metodi dei page object. Scopri di più su tutti i page object disponibili e sui loro metodi nella [documentazione dei page object](https://webdriverio-community.github.io/wdio-vscode-service/).

### Accesso alle API di VSCode

Se desideri eseguire determinate automazioni tramite l'[API di VSCode](https://code.visualstudio.com/api/references/vscode-api) puoi farlo eseguendo comandi remoti tramite il comando personalizzato `executeWorkbench`. Questo comando consente di eseguire in remoto codice dal tuo test all'interno dell'ambiente VSCode e permette di accedere all'API di VSCode. Puoi passare parametri arbitrari alla funzione, che verranno poi propagati al suo interno. L'oggetto `vscode` verrà sempre passato come primo argomento, seguito dai parametri della funzione esterna. Tieni presente che non puoi accedere a variabili al di fuori dello scope della funzione, poiché la callback viene eseguita in remoto. Ecco un esempio:

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // outputs: "I am an API call!"
```

Per la documentazione completa dei page object, consulta la [documentazione](https://webdriverio-community.github.io/wdio-vscode-service/modules.html). Puoi trovare vari esempi di utilizzo nella [suite di test di questo progetto](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs).

## Ulteriori informazioni

Puoi saperne di più su come configurare il [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) e su come creare page object personalizzati nella [documentazione del servizio](/docs/wdio-vscode-service). Puoi anche guardare il seguente intervento di [Christian Bromann](https://twitter.com/bromann) su [_Testing Complex VSCode Extensions With the Power of Web Standards_](https://www.youtube.com/watch?v=PhGNTioBUiU):

<LiteYouTubeEmbed
    id="PhGNTioBUiU"
    title="Testing Complex VSCode Extensions With the Power of Web Standards"
/>