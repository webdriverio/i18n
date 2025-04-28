---
id: runner
title: Runner
---

import CodeBlock from '@theme/CodeBlock';

Un runner in WebdriverIO orchestra come e dove vengono eseguiti i test quando si utilizza il testrunner. WebdriverIO supporta attualmente due diversi tipi di runner: runner locale e runner browser.

## Runner Locale

Il [Runner Locale](https://www.npmjs.com/package/@wdio/local-runner) avvia il tuo framework (ad esempio Mocha, Jasmine o Cucumber) all'interno di un processo worker ed esegue tutti i tuoi file di test all'interno del tuo ambiente Node.js. Ogni file di test viene eseguito in un processo worker separato per capacità, consentendo la massima concorrenza. Ogni processo worker utilizza una singola istanza del browser e quindi esegue la propria sessione del browser, consentendo la massima isolazione.

Dato che ogni test viene eseguito nel proprio processo isolato, non è possibile condividere dati tra file di test. Ci sono due modi per aggirare questo problema:

- utilizzare il [`@wdio/shared-store-service`](https://www.npmjs.com/package/@wdio/shared-store-service) per condividere dati tra tutti i worker
- raggruppare i file spec (leggi di più in [Organizing Test Suite](https://webdriver.io/docs/organizingsuites#grouping-test-specs-to-run-sequentially))

Se non è definito nient'altro nel `wdio.conf.js`, il Runner Locale è il runner predefinito in WebdriverIO.

### Installazione

Per utilizzare il Runner Locale puoi installarlo tramite:

```sh
npm install --save-dev @wdio/local-runner
```

### Configurazione

Il Runner Locale è il runner predefinito in WebdriverIO, quindi non è necessario definirlo all'interno del tuo `wdio.conf.js`. Se desideri impostarlo esplicitamente, puoi definirlo come segue:

```js
// wdio.conf.js
export const {
    // ...
    runner: 'local',
    // ...
}
```

## Runner Browser

A differenza del [Runner Locale](https://www.npmjs.com/package/@wdio/local-runner), il [Runner Browser](https://www.npmjs.com/package/@wdio/browser-runner) avvia ed esegue il framework all'interno del browser. Questo ti permette di eseguire test unitari o test di componenti in un browser reale piuttosto che in un JSDOM come molti altri framework di test.

Mentre [JSDOM](https://www.npmjs.com/package/jsdom) è ampiamente utilizzato per scopi di testing, alla fine non è un browser reale né puoi emulare ambienti mobili con esso. Con questo runner, WebdriverIO ti consente di eseguire facilmente i tuoi test nel browser e utilizzare i comandi WebDriver per interagire con gli elementi renderizzati sulla pagina.

Ecco una panoramica dell'esecuzione di test all'interno di JSDOM rispetto al Runner Browser di WebdriverIO:

| | JSDOM | WebdriverIO Browser Runner |
|-|-------|----------------------------|
|1.| Esegue i test all'interno di Node.js utilizzando una reimplementazione degli standard web, in particolare i WHATWG DOM e HTML Standards | Esegue il test in un browser reale ed esegue il codice in un ambiente che i tuoi utenti utilizzano |
|2.| Le interazioni con i componenti possono essere imitate solo tramite JavaScript | Puoi utilizzare [l'API WebdriverIO](api) per interagire con gli elementi attraverso il protocollo WebDriver |
|3.| Il supporto Canvas richiede [dipendenze aggiuntive](https://www.npmjs.com/package/canvas) e [ha limitazioni](https://github.com/Automattic/node-canvas/issues) | Hai accesso alla vera [API Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) |
|4.| JSDOM ha alcune [avvertenze](https://github.com/jsdom/jsdom#caveats) e API Web non supportate | Tutte le API Web sono supportate poiché i test vengono eseguiti in un browser reale |
|5.| Impossibile rilevare errori cross browser | Supporto per tutti i browser, inclusi i browser mobili |
|6.| __Non__ può testare gli stati pseudo degli elementi | Supporto per stati pseudo come `:hover` o `:active` |

Questo runner utilizza [Vite](https://vitejs.dev/) per compilare il codice di test e caricarlo nel browser. Viene fornito con preset per i seguenti framework di componenti:

- React
- Preact
- Vue.js
- Svelte
- SolidJS
- Stencil

Ogni file di test / gruppo di file di test viene eseguito all'interno di una singola pagina, il che significa che tra un test e l'altro la pagina viene ricaricata per garantire l'isolamento tra i test.

### Installazione

Per utilizzare il Runner Browser puoi installarlo tramite:

```sh
npm install --save-dev @wdio/browser-runner
```

### Configurazione

Per utilizzare il runner Browser, devi definire una proprietà `runner` nel tuo file `wdio.conf.js`, ad esempio:

```js
// wdio.conf.js
export const {
    // ...
    runner: 'browser',
    // ...
}
```

### Opzioni del Runner

Il runner Browser consente le seguenti configurazioni:

#### `preset`

Se testi componenti utilizzando uno dei framework menzionati sopra, puoi definire un preset che garantisce che tutto sia configurato automaticamente. Questa opzione non può essere utilizzata insieme a `viteConfig`.

__Tipo:__ `vue` | `svelte` | `solid` | `react` | `preact` | `stencil`<br />
__Esempio:__

```js title="wdio.conf.js"
export const {
    // ...
    runner: ['browser', {
        preset: 'svelte'
    }],
    // ...
}
```

#### `viteConfig`

Definisci la tua [configurazione Vite](https://vitejs.dev/config/). Puoi passare un oggetto personalizzato o importare un file `vite.conf.ts` esistente se utilizzi Vite.js per lo sviluppo. Nota che WebdriverIO mantiene configurazioni Vite personalizzate per impostare l'ambiente di test.

__Tipo:__ `string` o [`UserConfig`](https://github.com/vitejs/vite/blob/52e64eb43287d241f3fd547c332e16bd9e301e95/packages/vite/src/node/config.ts#L119-L272) o `(env: ConfigEnv) => UserConfig | Promise<UserConfig>`<br />
__Esempio:__

```js title="wdio.conf.ts"
import viteConfig from '../vite.config.ts'

export const {
    // ...
    runner: ['browser', { viteConfig }],
    // o semplicemente:
    runner: ['browser', { viteConfig: '../vites.config.ts' }],
    // o usa una funzione se la tua configurazione vite contiene molti plugin
    // che vuoi risolvere solo quando il valore viene letto
    runner: ['browser', {
        viteConfig: () => ({
            // ...
        })
    }],
    // ...
}
```

#### `headless`

Se impostato su `true`, il runner aggiornerà le capabilities per eseguire i test in modalità headless. Per impostazione predefinita, questa opzione è abilitata negli ambienti CI dove una variabile d'ambiente `CI` è impostata su `'1'` o `'true'`.

__Tipo:__ `boolean`<br />
__Default:__ `false`, impostato su `true` se la variabile d'ambiente `CI` è impostata

#### `rootDir`

Directory root del progetto.

__Tipo:__ `string`<br />
__Default:__ `process.cwd()`

#### `coverage`

WebdriverIO supporta il reporting della copertura dei test tramite [`istanbul`](https://istanbul.js.org/). Vedi [Opzioni Coverage](#coverage-options) per maggiori dettagli.

__Tipo:__ `object`<br />
__Default:__ `undefined`

### Opzioni di Coverage

Le seguenti opzioni consentono di configurare il reporting della copertura.

#### `enabled`

Abilita la raccolta della copertura.

__Tipo:__ `boolean`<br />
__Default:__ `false`

#### `include`

Elenco di file inclusi nella copertura come pattern glob.

__Tipo:__ `string[]`<br />
__Default:__ `[**]`

#### `exclude`

Elenco di file esclusi dalla copertura come pattern glob.

__Tipo:__ `string[]`<br />
__Default:__

```
[
  'coverage/**',
  'dist/**',
  'packages/*/test{,s}/**',
  '**/*.d.ts',
  'cypress/**',
  'test{,s}/**',
  'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}',
  '**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}',
  '**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}',
  '**/__tests__/**',
  '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
  '**/.{eslint,mocha,prettier}rc.{js,cjs,yml}',
]
```

#### `extension`

Elenco delle estensioni di file che il report dovrebbe includere.

__Tipo:__ `string | string[]`<br />
__Default:__ `['.js', '.cjs', '.mjs', '.ts', '.mts', '.cts', '.tsx', '.jsx', '.vue', '.svelte']`

#### `reportsDirectory`

Directory in cui scrivere il report di copertura.

__Tipo:__ `string`<br />
__Default:__ `./coverage`

#### `reporter`

Reporter di copertura da utilizzare. Vedi la [documentazione di istanbul](https://istanbul.js.org/docs/advanced/alternative-reporters/) per un elenco dettagliato di tutti i reporter.

__Tipo:__ `string[]`<br />
__Default:__ `['text', 'html', 'clover', 'json-summary']`

#### `perFile`

Controlla le soglie per file. Vedi `lines`, `functions`, `branches` e `statements` per le soglie effettive.

__Tipo:__ `boolean`<br />
__Default:__ `false`

#### `clean`

Pulisci i risultati di copertura prima di eseguire i test.

__Tipo:__ `boolean`<br />
__Default:__ `true`

#### `lines`

Soglia per le linee.

__Tipo:__ `number`<br />
__Default:__ `undefined`

#### `functions`

Soglia per le funzioni.

__Tipo:__ `number`<br />
__Default:__ `undefined`

#### `branches`

Soglia per i rami.

__Tipo:__ `number`<br />
__Default:__ `undefined`

#### `statements`

Soglia per le istruzioni.

__Tipo:__ `number`<br />
__Default:__ `undefined`

### Limitazioni

Quando si utilizza il browser runner di WebdriverIO, è importante notare che i dialoghi che bloccano il thread come `alert` o `confirm` non possono essere utilizzati nativamente. Questo perché bloccano la pagina web, il che significa che WebdriverIO non può continuare a comunicare con la pagina, causando il blocco dell'esecuzione.

In tali situazioni, WebdriverIO fornisce mock predefiniti con valori restituiti predefiniti per queste API. Ciò garantisce che se l'utente utilizza accidentalmente API web di popup sincrone, l'esecuzione non si blocchi. Tuttavia, è comunque consigliabile che l'utente simuli queste API web per una migliore esperienza. Leggi di più in [Mocking](/docs/component-testing/mocking).

### Esempi

Assicurati di controllare la documentazione sul [component testing](https://webdriver.io/docs/component-testing) e dai un'occhiata al [repository di esempi](https://github.com/webdriverio/component-testing-examples) per esempi che utilizzano questi e vari altri framework.