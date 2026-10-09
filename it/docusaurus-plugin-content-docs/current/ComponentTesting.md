---
id: component-testing
title: Test dei Componenti
description: "Esegui test unitari e di componenti in browser reali con il browser runner di WebdriverIO, basato su Vite, inclusi configurazione, test harness e debugging."
---

Con il [Browser Runner](/docs/runner#browser-runner) di WebdriverIO puoi eseguire test all'interno di un vero browser desktop o mobile, utilizzando WebdriverIO e il protocollo WebDriver per automatizzare e interagire con ciò che viene renderizzato sulla pagina. Questo approccio presenta [molti vantaggi](/docs/runner#browser-runner) rispetto ad altri framework di test che consentono di testare solo su [JSDOM](https://www.npmjs.com/package/jsdom).

## Supporto dei browser

Il browser runner esegue il bundle dei test nel browser. Tale bundle funziona in Chrome 90, Edge 90, Firefox 90 e Safari 14.1, e nelle versioni successive di questi browser.

I test end-to-end vengono eseguiti in Node.js. Il codice passato a [`browser.execute`](/docs/api/browser/execute) viene invece eseguito nel browser automatizzato, che può essere più vecchio delle versioni indicate sopra. Mantieni quel codice conforme a ES2021.

## Come funziona?

Il Browser Runner utilizza [Vite](https://vitejs.dev/) per renderizzare una pagina di test e inizializzare un framework di test per eseguire i tuoi test nel browser. Attualmente supporta solo Mocha, ma Jasmine e Cucumber sono [nella roadmap](https://github.com/orgs/webdriverio/projects/1). Questo consente di testare qualsiasi tipo di componente, anche per progetti che non utilizzano Vite.

Il server Vite viene avviato dal testrunner di WebdriverIO e configurato in modo che tu possa utilizzare tutti i reporter e i servizi come sei abituato a fare per i normali test e2e. Inoltre, inizializza un'istanza [`browser`](/docs/api/browser) che ti consente di accedere a un sottoinsieme della [API di WebdriverIO](/docs/api) per interagire con qualsiasi elemento della pagina. Analogamente ai test e2e, puoi accedere a tale istanza tramite la variabile `browser` collegata allo scope globale oppure importandola da `@wdio/globals`, a seconda di come è impostato [`injectGlobals`](/docs/api/globals).

WebdriverIO offre supporto integrato per i seguenti framework:

- [__Nuxt__](https://nuxt.com/): il testrunner di WebdriverIO rileva un'applicazione Nuxt e configura automaticamente i composable del tuo progetto, aiutandoti a simulare il backend di Nuxt; leggi di più nella [documentazione di Nuxt](/docs/component-testing/vue#testing-vue-components-in-nuxt)
- [__TailwindCSS__](https://tailwindcss.com/): il testrunner di WebdriverIO rileva se stai utilizzando TailwindCSS e carica correttamente l'ambiente nella pagina di test

## Configurazione

Per configurare WebdriverIO per i test unitari o dei componenti nel browser, inizializza un nuovo progetto WebdriverIO tramite:

```bash
npm init wdio@latest ./
# or
yarn create wdio ./
```

Una volta avviata la procedura guidata di configurazione, scegli `browser` per eseguire test unitari e di componenti e, se lo desideri, seleziona uno dei preset; altrimenti scegli _"Other"_ se vuoi eseguire solo test unitari di base. Puoi anche configurare una configurazione Vite personalizzata se utilizzi già Vite nel tuo progetto. Per maggiori informazioni consulta tutte le [opzioni del runner](/docs/runner#runner-options).

:::info

__Nota:__ per impostazione predefinita WebdriverIO eseguirà i test del browser in CI in modalità headless, ad esempio quando una variabile d'ambiente `CI` è impostata su `'1'` o `'true'`. Puoi configurare manualmente questo comportamento utilizzando l'opzione [`headless`](/docs/runner#headless) del runner.

:::

Al termine di questo processo dovresti trovare un file `wdio.conf.js` contenente varie configurazioni di WebdriverIO, inclusa una proprietà `runner`, ad esempio:

```ts reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/wdio.comp.conf.js
```

Definendo diverse [capabilities](/docs/configuration#capabilities) puoi eseguire i tuoi test in browser diversi, anche in parallelo se lo desideri.

Se non sei ancora sicuro di come funzioni il tutto, guarda il seguente tutorial su come iniziare con il Component Testing in WebdriverIO:

<LiteYouTubeEmbed
    id="5vp_3tGtnMc"
    title="Getting Started with Component Testing in WebdriverIO"
/>

## Test Harness

Sta completamente a te decidere cosa eseguire nei tuoi test e come renderizzare i componenti. Tuttavia consigliamo di utilizzare [Testing Library](https://testing-library.com/) come framework di utilità, poiché fornisce plugin per vari framework di componenti, come React, Preact, Svelte e Vue. È molto utile per renderizzare i componenti nella pagina di test e li ripulisce automaticamente dopo ogni test.

Puoi combinare le primitive di Testing Library con i comandi di WebdriverIO come preferisci, ad esempio:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/component-testing/svelte-example.js
```

__Nota:__ l'utilizzo dei metodi di render di Testing Library aiuta a rimuovere i componenti creati tra un test e l'altro. Se non utilizzi Testing Library, assicurati di collegare i tuoi componenti di test a un contenitore che venga ripulito tra un test e l'altro.

## Script di configurazione

Puoi configurare i tuoi test eseguendo script arbitrari in Node.js o nel browser, ad esempio per iniettare stili, simulare API del browser o connetterti a un servizio di terze parti. Gli [hook](/docs/configuration#hooks) di WebdriverIO possono essere utilizzati per eseguire codice in Node.js, mentre [`mochaOpts.require`](/docs/frameworks#require) ti consente di importare script nel browser prima che i test vengano caricati, ad esempio:

```js wdio.conf.js
export const config = {
    // ...
    mochaOpts: {
        ui: 'tdd',
        // fornisci uno script di configurazione da eseguire nel browser
        require: './__fixtures__/setup.js'
    },
    before: () => {
        // configura l'ambiente di test in Node.js
    }
    // ...
}
```

Ad esempio, se desideri simulare tutte le chiamate [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) nel tuo test con il seguente script di configurazione:

```js ./fixtures/setup.js
import { fn } from '@wdio/browser-runner'

// esegui codice prima che tutti i test vengano caricati
window.fetch = fn()

export const mochaGlobalSetup = () => {
    // esegui codice dopo il caricamento del file di test
}

export const mochaGlobalTeardown = () => {
    // esegui codice dopo l'esecuzione del file spec
}

```

Ora nei tuoi test puoi fornire valori di risposta personalizzati per tutte le richieste del browser. Leggi di più sulle fixture globali nella [documentazione di Mocha](https://mochajs.org/#global-fixtures).

## Monitorare i file di test e dell'applicazione

Esistono diversi modi per eseguire il debug dei tuoi test nel browser. Il più semplice è avviare il testrunner di WebdriverIO con il flag `--watch`, ad esempio:

```sh
$ npx wdio run ./wdio.conf.js --watch
```

In questo modo verranno eseguiti inizialmente tutti i test e l'esecuzione si fermerà una volta completati. Potrai quindi apportare modifiche ai singoli file, che verranno rieseguiti individualmente. Se imposti un [`filesToWatch`](/docs/configuration#filestowatch) che punta ai file della tua applicazione, tutti i test verranno rieseguiti quando vengono apportate modifiche alla tua app.

## Debugging

Sebbene non sia (ancora) possibile impostare breakpoint nel tuo IDE e farli riconoscere dal browser remoto, puoi utilizzare il comando [`debug`](/docs/api/browser/debug) per interrompere il test in qualsiasi punto. Questo ti consente di aprire i DevTools per poi eseguire il debug del test impostando breakpoint nella [scheda sources](https://buddy.works/tutorials/debugging-javascript-efficiently-with-chrome-devtools).

Quando viene chiamato il comando `debug`, otterrai anche un'interfaccia REPL di Node.js nel tuo terminale, che mostra:

```
The execution has stopped!
You can now go into the browser or use the command line as REPL
(To exit, press ^C again or type .exit)
```

Premi `Ctrl` o `Command` + `c` oppure digita `.exit` per continuare con il test.

## Esecuzione tramite Selenium Grid

Se hai configurato una [Selenium Grid](https://www.selenium.dev/documentation/grid/) ed esegui il tuo browser tramite tale grid, devi impostare l'opzione `host` del browser runner per consentire al browser di accedere all'host corretto in cui vengono serviti i file di test, ad esempio:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        // IP di rete della macchina che esegue il processo WebdriverIO
        host: 'http://172.168.0.2'
    }]
}
```

Questo garantirà che il browser apra correttamente l'istanza del server ospitata sulla macchina che esegue i test WebdriverIO.

## Esempi

Puoi trovare vari esempi di test di componenti con i framework di componenti più popolari nel nostro [repository di esempi](https://github.com/webdriverio/component-testing-examples).