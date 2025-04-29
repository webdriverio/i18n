---
id: wdio-teamcity-reporter
title: Teamcity Reporter Reporter
custom_edit_url: https://github.com/webdriverio-community/wdio-teamcity-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-teamcity-reporter jest pakietem zewnętrznym, więcej informacji można znaleźć na [GitHub](https://github.com/webdriverio-community/wdio-teamcity-reporter) | [npm](https://www.npmjs.com/package/wdio-teamcity-reporter)

WebdriverIO Teamcity reporter umożliwia wyświetlanie wyników testów w czasie rzeczywistym, udostępnia informacje o testach na karcie Testy na stronie Wyników Kompilacji.


## Instalacja

```bash
npm install wdio-teamcity-reporter --save-dev
```

Instrukcje dotyczące instalacji WebdriverIO można znaleźć tutaj: https://webdriver.io/docs/gettingstarted


## Konfiguracja

Dodaj reporter w pliku [wdio.conf.js](http://webdriver.io/guide/testrunner/configurationfile.html):

```javascript
exports.config = {
  // ...
  reporters: [
    [
      'teamcity',
      {
        captureStandardOutput: false, // optional
        flowId: true, // optional
        message: '[title]', // optional
      }
    ]
  ],
  // ...
}
```

### Opcje

- `captureStandardOutput (boolean)` — jeśli `true`, wszystkie komunikaty standardowego wyjścia (i standardowego błędu) otrzymane między komunikatami `testStarted` i `testFinished` będą uważane za wyjście testu. Domyślna wartość to `false` i zakłada użycie komunikatów serwisowych testStdOut i testStdErr do raportowania wyjścia testu. Domyślnie `false`.
- `flowId (boolean)` — jeśli `true`, właściwość `flowId` zostanie dodana do wszystkich komunikatów. Śledzenie przepływu jest niezbędne na przykład do rozróżnienia oddzielnych procesów działających równolegle. Domyślnie `true`.
- `message (string)` — możliwość określenia konkretnego formatu dla właściwości name. Możliwe klucze: `[browser]`, `[title]`. Przykład, `[browser] / [title]`. Domyślnie `[title]`.


## Linki

- Odniesienie do dokumentacji Teamcity dotyczącej komunikatów raportowania: https://confluence.jetbrains.com/display/TCD65/Build+Script+Interaction+with+TeamCity
- Wersja testowa Teamcity: https://blog.jetbrains.com/teamcity/2019/08/getting-started-with-teamcity-testdrive/


## Licencja

> The MIT License