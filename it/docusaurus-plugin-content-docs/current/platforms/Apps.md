---
id: apps-and-extensions
title: Estensioni ed editor
description: Carica un'estensione del browser o un'estensione di VS Code in una sessione WebdriverIO e testala end to end.
---

WebdriverIO testa le estensioni del browser e le estensioni degli editor caricandole nell'applicazione host reale. Le estensioni del browser (web) vengono eseguite all'interno di Chrome o Firefox. Le carichi tramite le capability del browser: `--load-extension` o un `.crx` in base64 tramite `goog:chromeOptions` in Chrome, oppure `browser.installAddOn()` per un `.xpi` in Firefox. In una sessione WebDriver BiDi puoi anche installare e rimuovere un'estensione durante la sessione con `browser.installExtension()` e `browser.uninstallExtension()`. Safari non dispone di una sessione BiDi, quindi questo comando non copre Safari. A partire da lì, testi i content script e le pagine popup con i normali comandi WebDriver. Le estensioni di VS Code vengono testate con il servizio della community [`wdio-vscode-service`](/docs/wdio-vscode-service). Questo scarica VS Code (stable, insiders o una versione specifica) e il Chromedriver corrispondente, quindi avvia VS Code con la tua estensione e impostazioni utente personalizzate. I page object per il workbench sono disponibili tramite `browser.getWorkbench()`, e `browser.executeWorkbench()` esegue codice sulle API di VS Code. Lo stesso servizio può anche servire VS Code in un browser per testare le estensioni web. Anche i plugin di Obsidian hanno un servizio della community.

## Avvio rapido

Installa prima il testrunner e il supporto per TypeScript:

```sh
npm install --save-dev @wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter tsx
```

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
    }
}
```

### Estensione di Chrome

Compila la tua estensione in una cartella (qui `./dist`) e caricala con l'argomento di Chrome `--load-extension`:

```ts title="wdio.conf.ts"
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [`--load-extension=${path.join(__dirname, 'dist')}`]
        }
    }],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/extension.e2e.ts"
import { expect, browser, $ } from '@wdio/globals'

describe('My Web Extension', () => {
    it('should inject its content script', async () => {
        await browser.url('https://webdriver.io')
        // sostituisci con un elemento che il tuo content script aggiunge alla pagina
        await expect($('#my-extension-root')).toBeExisting()
    })
})
```

Fare clic sull'icona dell'estensione nella barra degli strumenti non funziona. Per testare un `default_popup`, trova l'id dell'estensione su `chrome://extensions/` e apri `chrome-extension://<id>/<popup>.html` con `browser.url()`. La [guida alle estensioni web](/docs/extension-testing/web-extensions#test-popup-modal-in-chrome) include un comando personalizzato `openExtensionPopup` già pronto per questo scopo.

### Estensione di VS Code

```sh
npm install --save-dev wdio-vscode-service
```

Aggiungi `"wdio-vscode-service"` all'array `types` in `tsconfig.json`.

```ts title="wdio.conf.ts"
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        browserName: 'vscode',
        browserVersion: 'stable', // possibile anche: "insiders" o una versione specifica, ad es. "1.80.0"
        'wdio:vscodeOptions': {
            // punta alla directory in cui si trova il package.json dell'estensione
            extensionPath: __dirname,
            userSettings: {
                'editor.fontSize': 14
            }
        }
    }],
    services: ['vscode'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/vscode.e2e.ts"
import { browser, expect } from '@wdio/globals'

describe('VS Code Extension Testing', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toContain('[Extension Development Host]')
    })
})
```

Per testare l'estensione come estensione web di VS Code, imposta `browserName: 'chrome'` e mantieni `wdio:vscodeOptions`. In questa modalità, `browserVersion` può essere solo `stable` o `insiders`. `npm create wdio@latest ./` con "VS Code Extension Testing" genera questa configurazione per te.

## Scegli il tuo percorso

- [Test delle estensioni web](/docs/extension-testing/web-extensions): carica estensioni in Chrome (cartella o `.crx`) e Firefox (`.xpi` tramite [`installAddOn`](/docs/api/gecko#installaddon)), oppure installane e rimuovine una durante la sessione con [`installExtension`](/docs/api/browser/installExtension). Le estensioni web di Safari non sono supportate.
- [Firefox Profile Service](/docs/firefox-profile-service): crea un profilo Firefox che include estensioni.
- [Test delle estensioni di VS Code](/docs/extension-testing/vscode-extensions): configurazione, setup di TypeScript, page object del workbench e `executeWorkbench`.
- [VS Code Service](/docs/wdio-vscode-service): tutte le opzioni del servizio, come `cachePath`, e come scrivere page object personalizzati.
- [Obsidian Plugin Testing Service](/docs/wdio-obsidian-service): un servizio della community che testa i plugin di Obsidian su diverse versioni di Obsidian su Windows, macOS, Linux e Android.
- [Comandi personalizzati](/docs/customcommands): impacchetta helper come `openExtensionPopup` per riutilizzarli.

I test delle estensioni web vengono eseguiti in una normale sessione di Chrome o Firefox, quindi tutto ciò che è descritto in [Browser web](/docs/platforms/web) si applica, inclusi selettori, mocking della rete e test visivi.

## Risoluzione dei problemi

- Firefox rifiuta un'estensione compilata localmente a causa della firma: installala nell'hook `before` con `browser.installAddOn(extension.toString('base64'), true)` invece che tramite un profilo. Compila il `.xpi` con `npx web-ext build`.
- Usi Edge, Brave o Opera invece di Chrome: gli stessi argomenti di solito funzionano con la capability delle opzioni di quel browser, ad es. `ms:edgeOptions`.
- I binari di VS Code e Chromedriver vengono scaricati in una directory di cache. Per controllare dove vengono salvati, ad es. per memorizzarli nella cache in CI, imposta `services: [['vscode', { cachePath: __dirname }]]`.
- TypeScript non trova `getWorkbench` o `executeWorkbench`: aggiungi `wdio-vscode-service` a `compilerOptions.types`.

## Passi successivi

- Riferimento della [configurazione](/docs/configuration) per ogni opzione di `wdio.conf.ts`.
- [Electron](/docs/desktop-testing/electron) per testare app desktop complete basate su Chromium.
- Altre piattaforme: [Browser web](/docs/platforms/web), [App mobili](/docs/platforms/mobile), [App desktop](/docs/platforms/desktop).