---
id: spec-reporter
title: Specifikationsrapportör
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-spec-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> En WebdriverIO-plugin för rapportering i specifik stil.

![Spec Reporter](/img/spec.png "Spec Reporter")

## Installation

Det enklaste sättet är att behålla `@wdio/spec-reporter` som en devDependency i din `package.json`, via:

```sh
npm install @wdio/spec-reporter --save-dev
```

Instruktioner om hur man installerar `WebdriverIO` kan hittas [här](https://webdriver.io/docs/gettingstarted).

## Konfiguration

Följande kod visar standardkonfigurationen för wdio test runner. Lägg bara till `'spec'` som rapportör i arrayen.

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot', 'spec'],
  // ...
};
```

## Specifikationsrapportör-alternativ
### symbols
Tillhandahåll anpassade symboler för `passed`, `failed` och/eller `skipped` tester

Typ: `object`
Standard: `{passed: '✓', skipped: '-', failed: '✖'}`

#### Exempel
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
Som standard kan testresultaten i Sauce Labs endast ses av en teammedlem från samma team, inte av en teammedlem från ett annat team. Det här alternativet aktiverar [delbara länkar](https://docs.saucelabs.com/test-results/sharing-test-results/#building-sharable-links) som standard, vilket innebär att alla tester som körs i Sauce Labs kan ses av alla. Lägg bara till `sauceLabsSharableLinks: false`, som visas nedan, i rapportöralternativen för att inaktivera denna funktion.

Typ: `boolean`
Standard: `true`

#### Exempel
```js
[
  "spec",
  {
    sauceLabsSharableLinks: false,
  },
]
```

### onlyFailures
Skriv ut endast misslyckade specifikationsresultat.

Typ: `boolean`
Standard: `false`

#### Exempel
```js
[
  "spec",
  {
    onlyFailures: true,
  },
]
```

### addConsoleLogs
Ställ in till `true` för att visa konsolloggar från steg i slutrapporten

Typ: `boolean`
Standard: `false`

```js
[
  "spec",
  {
    addConsoleLogs: true,
  },
]
```

### realtimeReporting
Ställ in till `true` för att visa teststatus i realtid istället för bara i slutet av körningen

Typ: `boolean`
Standard: `false`

```js
[
  "spec",
  {
    realtimeReporting: true,
  },
]
```

### showPreface
Ställ in till `false` för att inaktivera `[ MutliRemoteBrowser ... ]` förord i rapporterna.

Typ: `boolean`
Standard: `true`

```js
[
  "spec",
  {
    showPreface: false,
  },
]
```

Med detta inställt till `false` kommer du att se utdata som:
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

och med `true` (standard) kommer varje rad att ha ett prefix med förordet:
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
Ställ in till `true` för att visa färgad utdata i terminalen

Typ: `boolean`
Standard: `true`

```js
[
  "spec",
  {
    color: true,
  },
]
```

## Miljöalternativ

Det finns vissa alternativ du kan ställa in genom miljövariabler:

### `FORCE_COLOR`

Om satt till true, t.ex. via `FORCE_COLOR=0 npx wdio run wdio.conf.js`, kommer all terminalfärgning att inaktiveras.