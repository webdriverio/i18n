---
id: spec-reporter
title: Raportujący Spec
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-spec-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Wtyczka WebdriverIO do raportowania w stylu spec.

![Spec Reporter](/img/spec.png "Spec Reporter")

## Instalacja

Najłatwiejszym sposobem jest utrzymanie `@wdio/spec-reporter` jako devDependency w twoim `package.json`, poprzez:

```sh
npm install @wdio/spec-reporter --save-dev
```

Instrukcje dotyczące instalacji `WebdriverIO` można znaleźć [tutaj](https://webdriver.io/docs/gettingstarted).

## Konfiguracja

Poniższy kod pokazuje domyślną konfigurację test runnera wdio. Wystarczy dodać `'spec'` jako reporter do tablicy.

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot', 'spec'],
  // ...
};
```

## Opcje Spec Reportera
### symbols
Dostarcz niestandardowe symbole dla testów `passed`, `failed` i/lub `skipped`

Typ: `object`
Domyślnie: `{passed: '✓', skipped: '-', failed: '✖'}`

#### Przykład
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
Domyślnie wyniki testów w Sauce Labs mogą być przeglądane tylko przez członka tego samego zespołu, nie przez członka innego zespołu. Ta opcja włączy [linki do udostępniania](https://docs.saucelabs.com/test-results/sharing-test-results/#building-sharable-links) domyślnie, co oznacza, że wszystkie testy wykonane w Sauce Labs mogą być przeglądane przez każdego. Wystarczy dodać `sauceLabsSharableLinks: false`, jak pokazano poniżej, w opcjach reportera, aby wyłączyć tę funkcję.

Typ: `boolean`
Domyślnie: `true`

#### Przykład
```js
[
  "spec",
  {
    sauceLabsSharableLinks: false,
  },
]
```

### onlyFailures
Wyświetl tylko wyniki nieudanych testów.

Typ: `boolean`
Domyślnie: `false`

#### Przykład
```js
[
  "spec",
  {
    onlyFailures: true,
  },
]
```

### addConsoleLogs
Ustaw na `true`, aby pokazać logi konsoli z kroków w końcowym raporcie

Typ: `boolean`
Domyślnie: `false`

```js
[
  "spec",
  {
    addConsoleLogs: true,
  },
]
```

### realtimeReporting
Ustaw na `true`, aby wyświetlać status testu w czasie rzeczywistym, a nie tylko na końcu uruchomienia

Typ: `boolean`
Domyślnie: `false`

```js
[
  "spec",
  {
    realtimeReporting: true,
  },
]
```

### showPreface
Ustaw na `false`, aby wyłączyć przedrostek `[ MutliRemoteBrowser ... ]` w raportach.

Typ: `boolean`
Domyślnie: `true`

```js
[
  "spec",
  {
    showPreface: false,
  },
]
```

Gdy ustawione na `false`, zobaczysz wyjście jako:
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

a przy `true` (domyślnie) każda linia będzie poprzedzona przedrostkiem:
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
Ustaw na `true`, aby wyświetlać kolorowe wyjście w terminalu

Typ: `boolean`
Domyślnie: `true`

```js
[
  "spec",
  {
    color: true,
  },
]
```

## Opcje środowiskowe

Istnieją pewne opcje, które możesz ustawić za pomocą zmiennych środowiskowych:

### `FORCE_COLOR`

Jeśli ustawione na true, np. poprzez `FORCE_COLOR=0 npx wdio run wdio.conf.js`, wszystkie kolory w terminalu zostaną wyłączone.