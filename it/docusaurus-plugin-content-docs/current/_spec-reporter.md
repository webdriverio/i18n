---
id: spec-reporter
title: Reporter Spec
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-spec-reporter/README.md
---


> Un plugin WebdriverIO per generare report in stile spec.

![Spec Reporter](/img/spec.png "Spec Reporter")

## Installazione

Il modo più semplice è mantenere `@wdio/spec-reporter` come devDependency nel tuo `package.json`, tramite:

```sh
npm install @wdio/spec-reporter --save-dev
```

Le istruzioni su come installare `WebdriverIO` possono essere trovate [qui](https://webdriver.io/docs/gettingstarted).

## Configurazione

Il codice seguente mostra la configurazione predefinita del test runner wdio. Basta aggiungere `'spec'` come reporter all'array.

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot', 'spec'],
  // ...
};
```

## Opzioni dello Spec Reporter
### symbols
Fornisce simboli personalizzati per i test `passed`, `failed` e/o `skipped`

Tipo: `object`
Default: `{passed: '✓', skipped: '-', failed: '✖'}`

#### Esempio
```js
[
  "spec",
  {
    symbols: {
      passed: '[PASS]',
      failed: '[FAIL]',
    },
  },
]
```

### sauceLabsSharableLinks
Per impostazione predefinita, i risultati dei test in Sauce Labs possono essere visualizzati solo da un membro del team dello stesso team, non da un membro di un team diverso. Questa opzione abiliterà [link condivisibili](https://docs.saucelabs.com/test-results/sharing-test-results/#building-sharable-links) per impostazione predefinita, il che significa che tutti i test eseguiti in Sauce Labs possono essere visualizzati da tutti.
Aggiungi semplicemente `sauceLabsSharableLinks: false`, come mostrato di seguito, nelle opzioni del reporter per disabilitare questa funzione.

Tipo: `boolean`
Default: `true`

#### Esempio
```js
[
  "spec",
  {
    sauceLabsSharableLinks: false,
  },
]
```

### onlyFailures
Stampa solo i risultati degli spec falliti.

Tipo: `boolean`
Default: `false`

#### Esempio
```js
[
  "spec",
  {
    onlyFailures: true,
  },
]
```

### addConsoleLogs
Imposta su `true` per mostrare i log della console dai passaggi nel report finale

Tipo: `boolean`
Default: `false`

```js
[
  "spec",
  {
    addConsoleLogs: true,
  },
]
```

### realtimeReporting
Imposta su `true` per visualizzare lo stato del test in tempo reale anziché solo alla fine dell'esecuzione

Tipo: `boolean`
Default: `false`

```js
[
  "spec",
  {
    realtimeReporting: true,
  },
]
```

### showPreface
Imposta su `false` per disabilitare la prefazione `[ MutliRemoteBrowser ... ]` nei report.

Tipo: `boolean`
Default: `true`

```js
[
  "spec",
  {
    showPreface: false,
  },
]
```

Con questo impostato su `false` vedrai un output del tipo:
```
Running: loremipsum (v50) on Windows 10
Session ID: foobar

» /foo/bar/loo.e2e.js
Foo test
   green ✓ foo
   green ✓ bar

» /bar/foo/loo.e2e.js
Bar test
   green ✓ some test
   red ✖ a failed test
   red ✖ a failed test with no stack
```

e con `true` (predefinito) ogni riga sarà preceduta dalla prefazione:
```
[loremipsum 50 Windows 10 #0-0] Running: loremipsum (v50) on Windows 10
[loremipsum 50 Windows 10 #0-0] Session ID: foobar
[loremipsum 50 Windows 10 #0-0]
[loremipsum 50 Windows 10 #0-0] » /foo/bar/loo.e2e.js
[loremipsum 50 Windows 10 #0-0] Foo test
[loremipsum 50 Windows 10 #0-0]    green ✓ foo
[loremipsum 50 Windows 10 #0-0]    green ✓ bar
[loremipsum 50 Windows 10 #0-0]
[loremipsum 50 Windows 10 #0-0] » /bar/foo/loo.e2e.js
[loremipsum 50 Windows 10 #0-0] Bar test
[loremipsum 50 Windows 10 #0-0]    green ✓ some test
[loremipsum 50 Windows 10 #0-0]    red ✖ a failed test
[loremipsum 50 Windows 10 #0-0]    red ✖ a failed test with no stack
[loremipsum 50 Windows 10 #0-0]
```

### color
Imposta su `true` per visualizzare l'output colorato nel terminale

Tipo: `boolean`
Default: `true`

```js
[
  "spec",
  {
    color: true,
  },
]
```

## Opzioni dell'Ambiente

Ci sono alcune opzioni che puoi impostare attraverso le variabili d'ambiente:

### `FORCE_COLOR`

Se impostato su true, ad esempio tramite `FORCE_COLOR=0 npx wdio run wdio.conf.js`, tutti i colori del terminale saranno disabilitati.