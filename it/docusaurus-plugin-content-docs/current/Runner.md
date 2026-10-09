---
id: runner
title: Runner
description: "Scegli tra il local runner e il browser runner, e configura le opzioni del browser runner come preset, configurazione Vite e coverage."
---

import CodeBlock from '@theme/CodeBlock';

Un runner in WebdriverIO orchestra come e dove vengono eseguiti i test quando si utilizza il testrunner. WebdriverIO attualmente supporta due diversi tipi di runner: local runner e browser runner.

## Local Runner

Il [Local Runner](https://www.npmjs.com/package/@wdio/local-runner) avvia il tuo framework (ad es. Mocha, Jasmine o Cucumber) all'interno di un processo worker ed esegue tutti i tuoi file di test nel tuo ambiente Node.js. Ogni file di test viene eseguito in un processo worker separato per ogni capability, consentendo la massima concorrenza. Ogni processo worker utilizza una singola istanza del browser e quindi esegue la propria sessione del browser, consentendo il massimo isolamento.

Poiché ogni test viene eseguito nel proprio processo isolato, non è possibile condividere dati tra i file di test. Ci sono due modi per aggirare questo problema:

- utilizzare il [`@wdio/shared-store-service`](https://www.npmjs.com/package/@wdio/shared-store-service) per condividere dati tra tutti i worker
- raggruppare i file spec (leggi di più in [Organizzare la Test Suite](https://webdriver.io/docs/organizingsuites#grouping-test-specs-to-run-sequentially))

Se non viene definito nient'altro nel `wdio.conf.js`, il Local Runner è il runner predefinito in WebdriverIO.

### Installazione

Per utilizzare il Local Runner puoi installarlo tramite:

```sh
npm install --save-dev @wdio/local-runner
```

### Configurazione

Il Local Runner è il runner predefinito in WebdriverIO, quindi non è necessario definirlo all'interno del tuo `wdio.conf.js`. Se vuoi impostarlo esplicitamente, puoi definirlo come segue:

```js
// wdio.conf.js
export const {
    // ...
    runner: 'local',
    // ...
}
```

## Browser Runner

A differenza del [Local Runner](https://www.npmjs.com/package/@wdio/local-runner), il [Browser Runner](https://www.npmjs.com/package/@wdio/browser-runner) avvia ed esegue il framework all'interno del browser. Questo ti permette di eseguire unit test o test di componenti in un browser reale anziché in un JSDOM come molti altri framework di test. Il bundle di test viene eseguito in Chrome 90, Edge 90, Firefox 90 e Safari 14.1 o versioni successive. Vedi [Supporto browser](/docs/component-testing#browser-support).

Sebbene [JSDOM](https://www.npmjs.com/package/jsdom) sia ampiamente utilizzato per scopi di test, alla fine non è un vero browser né è possibile emulare ambienti mobili con esso. Con questo runner, WebdriverIO ti consente di eseguire facilmente i tuoi test nel browser e di utilizzare i comandi WebDriver per interagire con gli elementi renderizzati sulla pagina.

Ecco una panoramica dell'esecuzione dei test in JSDOM rispetto al Browser Runner di WebdriverIO

| | JSDOM | WebdriverIO Browser Runner |
|-|-------|----------------------------|
|1.| Esegue i tuoi test all'interno di Node.js utilizzando una reimplementazione degli standard web, in particolare gli standard WHATWG DOM e HTML | Esegue il tuo test in un browser reale ed esegue il codice in un ambiente che i tuoi utenti utilizzano |
|2.| Le interazioni con i componenti possono essere solo imitate tramite JavaScript | Puoi utilizzare la [WebdriverIO API](api) per interagire con gli elementi attraverso il protocollo WebDriver |
|3.| Il supporto Canvas richiede [dipendenze aggiuntive](https://www.npmjs.com/package/canvas) e [ha limitazioni](https://github.com/Automattic/node-canvas/issues) | Hai accesso alla vera [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) |
|4.| JSDOM ha alcune [avvertenze](https://github.com/jsdom/jsdom#caveats) e Web API non supportate | Tutte le Web API sono supportate poiché i test vengono eseguiti in un browser reale |
|5.| Impossibile rilevare errori cross browser | Supporto per tutti i browser inclusi i browser mobili |
|6.| __Non__ può testare gli pseudo stati degli elementi | Supporto per pseudo stati come `:hover` o `:active` |

Questo runner utilizza [Vite](https://vitejs.dev/) per compilare il tuo codice di test e caricarlo nel browser. Include preset per i seguenti framework di componenti:

- React
- Preact
- Vue.js
- Svelte
- SolidJS
- Stencil

Ogni file di test / gruppo di file di test viene eseguito all'interno di una singola pagina, il che significa che tra un test e l'altro la pagina viene ricaricata per garantire l'isolamento tra i test.

### Installazione

Per utilizzare il Browser Runner puoi installarlo tramite:

```sh
npm install --save-dev @wdio/browser-runner
```

### Configurazione

Per utilizzare il Browser runner, devi definire una proprietà `runner` all'interno del tuo file `wdio.conf.js`, ad es.:

```js
// wdio.conf.js
export const {
    // ...
    runner: 'browser',
    // ...
}
```

### Opzioni del Runner

Il Browser runner consente le seguenti configurazioni:

#### `preset`

Se testi componenti utilizzando uno dei framework sopra menzionati, puoi definire un preset che garantisce che tutto sia configurato immediatamente. Questa opzione non può essere utilizzata insieme a `viteConfig`.

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

Definisci la tua [configurazione Vite](https://vitejs.dev/config/). Puoi passare un oggetto personalizzato o importare un file `vite.conf.ts` esistente se utilizzi Vite.js per lo sviluppo. Nota che WebdriverIO mantiene le configurazioni Vite personalizzate per impostare l'ambiente di test.

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

Se impostato su `true`, il runner aggiornerà le capabilities per eseguire i test in modalità headless. Per impostazione predefinita, questo è abilitato negli ambienti CI in cui una variabile d'ambiente `CI` è impostata su `'1'` o `'true'`.

__Tipo:__ `boolean`<br />
__Predefinito:__ `false`, impostato su `true` se la variabile d'ambiente `CI` è impostata

#### `rootDir`

Directory radice del progetto.

__Tipo:__ `string`<br />
__Predefinito:__ `process.cwd()`

#### `coverage`

WebdriverIO supporta il reporting della coverage dei test tramite [`istanbul`](https://istanbul.js.org/). Vedi [Opzioni di Coverage](#coverage-options) per maggiori dettagli.

__Tipo:__ `object`<br />
__Predefinito:__ `undefined`

### Opzioni di Coverage

Le seguenti opzioni consentono di configurare il reporting della coverage.

#### `enabled`

Abilita la raccolta della coverage.

__Tipo:__ `boolean`<br />
__Predefinito:__ `false`

#### `include`

Elenco dei file inclusi nella coverage come pattern glob.

__Tipo:__ `string[]`<br />
__Predefinito:__ `[**]`

#### `exclude`

Elenco dei file esclusi dalla coverage come pattern glob.

__Tipo:__ `string[]`<br />
__Predefinito:__

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
__Predefinito:__ `['.js', '.cjs', '.mjs', '.ts', '.mts', '.cts', '.tsx', '.jsx', '.vue', '.svelte']`

#### `reportsDirectory`

Directory in cui scrivere il report della coverage.

__Tipo:__ `string`<br />
__Predefinito:__ `./coverage`

#### `reporter`

Reporter di coverage da utilizzare. Vedi la [documentazione di istanbul](https://istanbul.js.org/docs/advanced/alternative-reporters/) per un elenco dettagliato di tutti i reporter.

__Tipo:__ `string[]`<br />
__Predefinito:__ `['text', 'html', 'clover', 'json-summary']`

#### `perFile`

Controlla le soglie per ogni file. Vedi `lines`, `functions`, `branches` e `statements` per le soglie effettive.

__Tipo:__ `boolean`<br />
__Predefinito:__ `false`

#### `clean`

Pulisce i risultati della coverage prima di eseguire i test.

__Tipo:__ `boolean`<br />
__Predefinito:__ `true`

#### `lines`

Soglia per le righe.

__Tipo:__ `number`<br />
__Predefinito:__ `undefined`

#### `functions`

Soglia per le funzioni.

__Tipo:__ `number`<br />
__Predefinito:__ `undefined`

#### `branches`

Soglia per i branch.

__Tipo:__ `number`<br />
__Predefinito:__ `undefined`

#### `statements`

Soglia per gli statement.

__Tipo:__ `number`<br />
__Predefinito:__ `undefined`

### Limitazioni

Quando si utilizza il browser runner di WebdriverIO, è importante notare che i dialoghi che bloccano il thread come `alert` o `confirm` non possono essere utilizzati nativamente. Questo perché bloccano la pagina web, il che significa che WebdriverIO non può continuare a comunicare con la pagina, causando il blocco dell'esecuzione.

In tali situazioni, WebdriverIO fornisce mock predefiniti con valori di ritorno predefiniti per queste API. Ciò garantisce che, se l'utente utilizza accidentalmente le web API sincrone dei popup, l'esecuzione non si blocchi. Tuttavia, è comunque consigliato all'utente di creare mock per queste web API per un'esperienza migliore. Leggi di più in [Mocking](/docs/component-testing/mocking).

### Esempi

Assicurati di consultare la documentazione sul [test dei componenti](https://webdriver.io/docs/component-testing) e di dare un'occhiata al [repository di esempi](https://github.com/webdriverio/component-testing-examples) per esempi che utilizzano questi e vari altri framework.