---
id: web
title: Browser Web
description: Configura ed esegui test end-to-end, di componenti, visivi e di accessibilità con WebdriverIO in Chrome, Firefox, Microsoft Edge e Safari.
---

WebdriverIO automatizza i browser desktop (Chrome, Chromium, Firefox, Microsoft Edge e Safari) tramite i driver standard dei browser. Per impostazione predefinita tenta di aprire una sessione [WebDriver BiDi](/docs/automationProtocols), il successore bidirezionale del classico protocollo WebDriver. BiDi abilita funzionalità come il mocking di rete e l'emulazione delle Web API. Imposta `wdio:enforceWebDriverClassic: true` nelle tue capabilities per disattivarlo. Non è necessario installare i driver manualmente: imposta un `browserName` e WebdriverIO scaricherà e avvierà il Chromedriver, Geckodriver o Edgedriver corrispondente. Installa inoltre Chrome, Chromium o Firefox quando non viene trovata un'installazione locale. Microsoft Edge deve essere già installato, mentre Safaridriver è incluso in macOS. Lo stesso testrunner può anche eseguire test all'interno del browser con il Browser Runner. Questo copre test unitari e di componenti per React, Vue, Svelte, SolidJS, Preact, Lit e Stencil.

## Avvio rapido

Crea la struttura di un progetto in modo interattivo con `npm init wdio@latest .`. Passando `--yes` vengono scelte le impostazioni predefinite: Mocha, Chrome e page object. Per configurare un progetto manualmente, installa il testrunner, un adattatore per il framework, un reporter e `tsx` per TypeScript:

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

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    maxInstances: 10,
    capabilities: [{
        browserName: 'chrome'
    }, {
        browserName: 'firefox'
    }],
    logLevel: 'info',
    waitforTimeout: 10000,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/login.e2e.ts"
import { expect, browser, $ } from '@wdio/globals'

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await browser.url('https://the-internet.herokuapp.com/login')

        await $('#username').setValue('tomsmith')
        await $('#password').setValue('SuperSecretPassword!')
        await $('button[type="submit"]').click()

        await expect($('#flash')).toBeExisting()
        await expect($('#flash')).toHaveText(
            expect.stringContaining('You logged into a secure area!'))
    })
})
```

```sh
npx wdio run ./wdio.conf.ts
```

Ogni capability ottiene i propri processi worker, quindi questo esegue la spec sia in Chrome che in Firefox. Altri valori validi per `browserName` sono `chromium`, `msedge` e `safari`. Per l'esecuzione headless, aggiungi argomenti del browser come `'goog:chromeOptions': { args: ['headless', 'disable-gpu'] }`. Consulta [Run Browser Headless](/docs/capabilities#run-browser-headless) per Firefox ed Edge; Safari non dispone di una modalità headless.

## Scegli il tuo percorso

Test end-to-end su più browser:

- [Capabilities](/docs/capabilities): opzioni del browser, modalità headless, canali dei browser (Canary, Nightly, Safari Technology Preview) e opzioni dei driver `wdio:*`.
- [Driver Binaries](/docs/driverbinaries): come funziona la configurazione automatica di browser e driver e come puntare a binari personalizzati.
- [Automation Protocols](/docs/automationProtocols): WebDriver vs. WebDriver BiDi.
- [Comandi WebDriver BiDi](/docs/api/webdriverBidi): comandi grezzi del protocollo BiDi disponibili sull'oggetto `browser`.
- [Selettori](/docs/selectors): selettori CSS, di testo, ARIA, deep (shadow DOM) e React.
- [Auto-waiting](/docs/autowait) e [Timeout](/docs/timeouts): come WebdriverIO attende gli elementi e cosa regolare.
- [Multi-remote](/docs/multiremote): controlla più browser in un unico test, ad esempio per app di chat o WebRTC.

Funzionalità del browser che richiedono WebDriver BiDi (Chrome, Edge e Firefox; non Safari):

- [Request Mocks and Spies](/docs/mocksandspies): intercetta, modifica o simula le richieste di rete con `browser.mock()`. Vedi anche l'[oggetto Mock](/docs/api/mock).
- [Emulazione](/docs/emulation): emula geolocalizzazione, media feature, user agent, stato offline, impostazioni locali, fuso orario, schermo e dispositivi con `browser.emulate()`.

Test di componenti e unitari in un browser reale:

- [Component Testing](/docs/component-testing): come funziona il [Browser Runner](/docs/runner#browser-runner) basato su Vite e come configurarlo.
- Guide per i framework: [React](/docs/component-testing/react), [Vue.js](/docs/component-testing/vue), [Svelte](/docs/component-testing/svelte), [SolidJS](/docs/component-testing/solid), [Preact](/docs/component-testing/preact), [Lit](/docs/component-testing/lit), [Stencil](/docs/component-testing/stencil).
- [Mocking](/docs/component-testing/mocking) e [Coverage](/docs/component-testing/coverage) per i test di componenti.

Test visivi e di accessibilità:

- [Visual Testing](/docs/visual-testing): confronto di immagini di schermo, elementi e pagine intere con `@wdio/visual-service`.
- [Snapshot](/docs/snapshot): asserzioni snapshot su DOM e oggetti.
- [Axe Core](/docs/accessibility-testing/axe-core): esegui scansioni di accessibilità Deque axe dai tuoi test.

Scalabilità:

- [Selenium Grid](/docs/seleniumgrid), [Cloud Services](/docs/cloudservices) e [Docker](/docs/docker): esegui i browser da remoto.
- [Sharding](/docs/sharding): suddividi una suite tra più macchine CI.

Un test di componenti utilizza lo stesso file di configurazione con un runner diverso. Ad esempio, per usare il preset React:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        preset: 'react'
    }],
    specs: ['./src/**/*.test.tsx'],
    capabilities: [{
        browserName: 'chrome'
    }],
    framework: 'mocha',
    reporters: ['spec']
}
```

Il Browser Runner richiede `@wdio/browser-runner`. Il preset React necessita anche di `@vitejs/plugin-react`, e le guide raccomandano `@testing-library/react` per il rendering. Esistono preset per `vue`, `svelte`, `solid`, `react`, `preact` e `stencil`. Per qualsiasi altro caso, usa invece `viteConfig`.

## Risoluzione dei problemi

- Chrome non si avvia in CI con "user data directory is already in use" o "DevToolsActivePort file doesn't exist": consulta [Headless & Display Servers](/docs/headless-and-display-servers#troubleshooting).
- `browser.mock()` o `browser.emulate()` non hanno effetto: la sessione non sta usando WebDriver BiDi. Controlla il tuo browser (Safari non supporta BiDi), il tuo fornitore cloud e `wdio:enforceWebDriverClassic`.
- Non è possibile scaricare driver o browser dietro un proxy: consulta [Custom Driver Download Host](/docs/capabilities#custom-driver-download-host) e [Proxy Setup](/docs/proxy).
- Test instabili: consulta [Retry Flaky Tests](/docs/retry) e [Debugging](/docs/debugging).

## Prossimi passi

- Riferimento della [Configurazione](/docs/configuration) per ogni opzione di `wdio.conf.ts`.
- [TypeScript Setup](/docs/typescript) e [Framework](/docs/frameworks) (Mocha, Jasmine, Cucumber).
- [Page Object Pattern](/docs/pageobjects) per strutturare suite più grandi.
- [MCP](/docs/mcp) per consentire a un agente AI di controllare una sessione del browser tramite WebdriverIO.
- Altre piattaforme: [App mobili](/docs/platforms/mobile), [App desktop](/docs/platforms/desktop), [Estensioni ed editor](/docs/platforms/apps-and-extensions).