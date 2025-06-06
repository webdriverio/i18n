---
id: component-testing
title: Test dei Componenti
---

Con il [Browser Runner](/docs/runner#browser-runner) di WebdriverIO puoi eseguire test all'interno di un vero browser desktop o mobile mentre utilizzi WebdriverIO e il protocollo WebDriver per automatizzare e interagire con ciò che viene renderizzato sulla pagina. Questo approccio ha [molti vantaggi](/docs/runner#browser-runner) rispetto ad altri framework di test che consentono di testare solo contro [JSDOM](https://www.npmjs.com/package/jsdom).

## Come funziona?

Il Browser Runner utilizza [Vite](https://vitejs.dev/) per renderizzare una pagina di test e inizializzare un framework di test per eseguire i tuoi test nel browser. Attualmente supporta solo Mocha, ma Jasmine e Cucumber sono [nella roadmap](https://github.com/orgs/webdriverio/projects/1). Questo permette di testare qualsiasi tipo di componente anche per progetti che non utilizzano Vite.

Il server Vite viene avviato dal testrunner di WebdriverIO e configurato in modo da poter utilizzare tutti i reporter e i servizi come sei abituato a fare per i normali test e2e. Inoltre, inizializza un'istanza [`browser`](/docs/api/browser) che ti consente di accedere a un sottoinsieme dell'[API WebdriverIO](/docs/api) per interagire con qualsiasi elemento nella pagina. Come nei test e2e, puoi accedere a quell'istanza attraverso la variabile `browser` collegata allo scope globale o importandola da `@wdio/globals` a seconda di come è impostato [`injectGlobals`](/docs/api/globals).

WebdriverIO ha supporto integrato per i seguenti framework:

- [__Nuxt__](https://nuxt.com/): il testrunner di WebdriverIO rileva un'applicazione Nuxt e configura automaticamente i composable del tuo progetto e aiuta a simulare il backend di Nuxt, leggi di più nella [documentazione di Nuxt](/docs/component-testing/vue#testing-vue-components-in-nuxt)
- [__TailwindCSS__](https://tailwindcss.com/): il testrunner di WebdriverIO rileva se stai utilizzando TailwindCSS e carica correttamente l'ambiente nella pagina di test

## Configurazione

Per configurare WebdriverIO per i test unitari o dei componenti nel browser, inizia un nuovo progetto WebdriverIO tramite:

```bash
npm init wdio@latest ./
# o
yarn create wdio ./
```

Una volta avviata la procedura guidata di configurazione, scegli `browser` per eseguire test unitari e dei componenti e scegli uno dei preset se desideri, altrimenti vai con _"Other"_ se vuoi eseguire solo test unitari di base. Puoi anche configurare una configurazione Vite personalizzata se utilizzi già Vite nel tuo progetto. Per maggiori informazioni consulta tutte le [opzioni del runner](/docs/runner#runner-options).

:::info

__Nota:__ WebdriverIO per impostazione predefinita eseguirà i test del browser in CI in modalità headless, ad esempio se una variabile d'ambiente `CI` è impostata su `'1'` o `'true'`. Puoi configurare manualmente questo comportamento utilizzando l'opzione [`headless`](/docs/runner#headless) per il runner.

:::

Al termine di questo processo dovresti trovare un `wdio.conf.js` che contiene varie configurazioni WebdriverIO, inclusa una proprietà `runner`, ad esempio:

```ts reference useHTTPS runmeRepository="git@github.com:webdriverio/example-recipes.git" runmeFileToOpen="component-testing%2FREADME.md"
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/wdio.comp.conf.js
```

Definendo diverse [capabilities](/docs/configuration#capabilities) puoi eseguire i tuoi test in diversi browser, in parallelo se lo desideri.

Se sei ancora insicuro su come funziona tutto, guarda il seguente tutorial su come iniziare con i Test dei Componenti in WebdriverIO:

<LiteYouTubeEmbed
    id="5vp_3tGtnMc"
    title="Getting Started with Component Testing in WebdriverIO"
/>

## Test Harness

Sta totalmente a te decidere cosa eseguire nei tuoi test e come renderizzare i componenti. Tuttavia, consigliamo di utilizzare [Testing Library](https://testing-library.com/) come framework di utilità poiché fornisce plugin per vari framework di componenti, come React, Preact, Svelte e Vue. È molto utile per renderizzare i componenti nella pagina di test e pulisce automaticamente questi componenti dopo ogni test.

Puoi combinare le primitive di Testing Library con i comandi WebdriverIO come preferisci, ad esempio:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/component-testing/svelte-example.js
```

__Nota:__ l'utilizzo dei metodi di rendering da Testing Library aiuta a rimuovere i componenti creati tra i test. Se non utilizzi Testing Library, assicurati di collegare i tuoi componenti di test a un contenitore che viene pulito tra un test e l'altro.

## Script di Setup

Puoi configurare i tuoi test eseguendo script arbitrari in Node.js o nel browser, ad esempio iniettando stili, simulando API del browser o connettendoti a un servizio di terze parti. I [hooks](/docs/configuration#hooks) di WebdriverIO possono essere utilizzati per eseguire codice in Node.js mentre l'opzione [`mochaOpts.require`](/docs/frameworks#require) consente di importare script nel browser prima che i test vengano caricati, ad esempio:

```js wdio.conf.js
export const config = {
    // ...
    mochaOpts: {
        ui: 'tdd',
        // fornisci uno script di setup da eseguire nel browser
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
    // esegui codice dopo che il file di test è stato caricato
}

export const mochaGlobalTeardown = () => {
    // esegui codice dopo che il file di test è stato eseguito
}

```

Ora nei tuoi test puoi fornire valori di risposta personalizzati per tutte le richieste del browser. Leggi di più sui fixture globali nella [documentazione di Mocha](https://mochajs.org/#global-fixtures).

## Osservare i File di Test e dell'Applicazione

Ci sono diversi modi per debuggare i tuoi test del browser. Il più semplice è avviare il testrunner WebdriverIO con il flag `--watch`, ad esempio:

```sh
$ npx wdio run ./wdio.conf.js --watch
```

Questo eseguirà inizialmente tutti i test e si fermerà una volta che tutti saranno stati eseguiti. Puoi quindi apportare modifiche ai singoli file che verranno poi rieseguiti individualmente. Se imposti un [`filesToWatch`](/docs/configuration#filestowatch) che punta ai file della tua applicazione, rieseguirà tutti i test quando vengono apportate modifiche alla tua app.

## Debugging

Anche se non è (ancora) possibile impostare breakpoint nel tuo IDE e farli riconoscere dal browser remoto, puoi utilizzare il comando [`debug`](/docs/api/browser/debug) per fermare il test in qualsiasi punto. Questo ti permette di aprire DevTools per poi debuggare il test impostando breakpoint nella [scheda sorgenti](https://buddy.works/tutorials/debugging-javascript-efficiently-with-chrome-devtools).

Quando viene chiamato il comando `debug`, otterrai anche un'interfaccia repl Node.js nel tuo terminale, che dice:

```
The execution has stopped!
You can now go into the browser or use the command line as REPL
(To exit, press ^C again or type .exit)
```

Premi `Ctrl` o `Command` + `c` o inserisci `.exit` per continuare con il test.

## Esecuzione utilizzando una Selenium Grid

Se hai configurato una [Selenium Grid](https://www.selenium.dev/documentation/grid/) ed esegui il tuo browser attraverso quella grid, devi impostare l'opzione `host` del browser runner per consentire al browser di accedere all'host corretto dove vengono serviti i file di test, ad esempio:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        // IP di rete della macchina che esegue il processo WebdriverIO
        host: 'http://172.168.0.2'
    }]
}
```

Questo garantirà che il browser apra correttamente l'istanza del server giusta ospitata sull'istanza che esegue i test WebdriverIO.

## Esempi

Puoi trovare vari esempi di test di componenti utilizzando framework di componenti popolari nel nostro [repository di esempi](https://github.com/webdriverio/component-testing-examples).