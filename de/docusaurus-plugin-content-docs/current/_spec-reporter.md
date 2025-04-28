---
id: spec-reporter
title: Spec Reporter
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-spec-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Ein WebdriverIO-Plugin für Berichte im Spec-Stil.

![Spec Reporter](/img/spec.png "Spec Reporter")

## Installation

Der einfachste Weg ist, `@wdio/spec-reporter` als devDependency in Ihrer `package.json` zu behalten, über:

```sh
npm install @wdio/spec-reporter --save-dev
```

Anweisungen zur Installation von `WebdriverIO` finden Sie [hier](https://webdriver.io/docs/gettingstarted).

## Konfiguration

Der folgende Code zeigt die Standard-Konfiguration des WDIO-Testrunners. Fügen Sie einfach `'spec'` als Reporter zum Array hinzu.

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot', 'spec'],
  // ...
};
```

## Spec Reporter Optionen
### symbols
Bieten Sie benutzerdefinierte Symbole für `passed`, `failed` und/oder `skipped` Tests an

Type: `object`
Default: `{passed: '✓', skipped: '-', failed: '✖'}`

#### Beispiel
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
Standardmäßig können die Testergebnisse in Sauce Labs nur von einem Teammitglied aus demselben Team eingesehen werden, nicht von einem Teammitglied aus einem anderen Team. Diese Option aktiviert standardmäßig [teilbare Links](https://docs.saucelabs.com/test-results/sharing-test-results/#building-sharable-links), was bedeutet, dass alle Tests, die in Sauce Labs ausgeführt werden, von jedem eingesehen werden können.
Fügen Sie einfach `sauceLabsSharableLinks: false`, wie unten gezeigt, in den Reporter-Optionen hinzu, um diese Funktion zu deaktivieren.

Type: `boolean`
Default: `true`

#### Beispiel
```js
[
  "spec",
  {
    sauceLabsSharableLinks: false,
  },
]
```

### onlyFailures
Druckt nur fehlgeschlagene Spec-Ergebnisse aus.

Type: `boolean`
Default: `false`

#### Beispiel
```js
[
  "spec",
  {
    onlyFailures: true,
  },
]
```

### addConsoleLogs
Auf `true` setzen, um Konsolenprotokolle aus den Schritten im Abschlussbericht anzuzeigen

Type: `boolean`
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
Auf `true` setzen, um den Teststatus in Echtzeit anzuzeigen, anstatt nur am Ende des Durchlaufs

Type: `boolean`
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
Auf `false` setzen, um das Präfix `[ MutliRemoteBrowser ... ]` in den Berichten zu deaktivieren.

Type: `boolean`
Default: `true`

```js
[
  "spec",
  {
    showPreface: false,
  },
]
```

Wenn es auf `false` gesetzt ist, sehen Sie die Ausgabe wie folgt:
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

und mit `true` (Standard) wird jeder Zeile das Präfix vorangestellt:
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
Auf `true` setzen, um farbige Ausgabe im Terminal anzuzeigen

Type: `boolean`
Default: `true`

```js
[
  "spec",
  {
    color: true,
  },
]
```

## Umgebungsoptionen

Es gibt bestimmte Optionen, die Sie über Umgebungsvariablen festlegen können:

### `FORCE_COLOR`

Wenn auf true gesetzt, z.B. über `FORCE_COLOR=0 npx wdio run wdio.conf.js`, wird die gesamte Terminalfärbung deaktiviert.