---
id: wdio-teamcity-reporter
title: Teamcity Reporter Reporter
custom_edit_url: https://github.com/webdriverio-community/wdio-teamcity-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-teamcity-reporter är ett tredjepartspaket, för mer information se [GitHub](https://github.com/webdriverio-community/wdio-teamcity-reporter) | [npm](https://www.npmjs.com/package/wdio-teamcity-reporter)

WebdriverIO Teamcity reporter som gör det möjligt att visa testresultat i realtid, gör testinformation tillgänglig på fliken Tester på sidan för byggresultat.


## Installation

```bash
npm install wdio-teamcity-reporter --save-dev
```

Instruktioner om hur man installerar WebdriverIO finns här: https://webdriver.io/docs/gettingstarted


## Konfiguration

Lägg till reporter i din [wdio.conf.js](http://webdriver.io/guide/testrunner/configurationfile.html) fil:

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

### Alternativ

- `captureStandardOutput (boolean)` — om `true`, kommer alla standardutdata (och standardfelmeddelanden) som tas emot mellan `testStarted` och `testFinished` meddelanden att betraktas som testutdata. Standardvärdet är `false` och förutsätter användning av testStdOut och testStdErr tjänstmeddelanden för att rapportera testutdata. Standard `false`.
- `flowId (boolean)` — om `true`, kommer `flowId` egenskap att läggas till på alla meddelanden. Flödesspårning är nödvändig till exempel för att skilja separata processer som körs parallellt. Standard `true`.
- `message (string)` — möjlighet att tillhandahålla ett särskilt format för namnegenskapen. Möjliga nycklar: `[browser]`, `[title]`. Exempel, `[browser] / [title]`. Standard `[title]`.


## Länkar

- Referens till Teamcity-dokumentationen om rapporteringsmeddelanden: https://confluence.jetbrains.com/display/TCD65/Build+Script+Interaction+with+TeamCity
- Teamcity testdrive: https://blog.jetbrains.com/teamcity/2019/08/getting-started-with-teamcity-testdrive/


## Licens

> The MIT License