---
id: json-reporter
title: Raporter Json
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-json-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Instalacja

```bash
npm install @wdio/json-reporter --save-dev
```

## Konfiguracja

### Wyniki do `stdout`

```js
reporters: [
    'dot',
    ['json', { stdout: true }]
],
```

### Wyniki do pliku

```js
reporters: [
    'dot',
    ['json',{
        outputDir: './results'
    }]
],
```

### Wyniki do pliku z niestandardową nazwą pliku

```js
reporters: [
    'dot',
    ['json',{
        outputDir: './results',
        outputFileFormat: (opts) => {
            return `results-${opts.cid}.${opts.capabilities.browserName}.json`
        }
    }]
],
```

## Pliki wynikowe

W WDIO v5 i nowszych, raportowanie zostało przeniesione z scentralizowanego procesu do takiego, który jest obsługiwany przez każdą z "sesji" uruchamianych do równoległego wykonania testów. Ta zmiana pomogła zmniejszyć ilość komunikacji podczas wykonywania testów WDIO, a tym samym poprawić wydajność. Wadą jest to, że nie jest już możliwe uzyskanie jednego raportu dla całego wykonania testu.

`@wdio/json-reporter` dostarcza funkcję narzędziową do łączenia wielu plików json w jeden plik. Postępuj zgodnie z poniższymi krokami, aby skorzystać z tego narzędzia.

Możesz to wykonać w [`onComplete`](https://webdriver.io/docs/configuration#oncomplete) w swoim pliku `wdio.conf.js`:

```javascript
// wdio.conf.js
import mergeResults from '@wdio/json-reporter/mergeResults'

export const config = {
    // ...
    onComplete: function (exitCode, config, capabilities, results) {
        mergeResults('./results', 'wdio-.*-json-reporter.json', 'wdio-custom-filename.json')
    }
    // ...
}
```

_Uwaga:_ `wdio-custom-filename.json` jest opcjonalny, jeśli parametr nie zostanie podany, domyślną wartością jest `wdio-merged.json`.

## Wkład

Kod źródłowy tego reportera był mocno inspirowany przez [`wdio-json-reporter`](https://github.com/fijijavis/wdio-json-reporter) społecznościowy reporter stworzony przez [Jim Davis](https://github.com/fijijavis). Dziękujemy za całą pracę przy utrzymaniu projektu!

---

Aby uzyskać więcej informacji na temat WebdriverIO, zobacz [stronę główną](http://webdriver.io).