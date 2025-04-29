---
id: wdio-slack-service
title: Slack Service
custom_edit_url: https://github.com/carmenmitru/wdio-slack-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-slack-service är ett paket från tredje part, för mer information se [GitHub](https://github.com/carmenmitru/wdio-slack-service) | [npm](https://www.npmjs.com/package/wdio-slack-service)
Webdriverio bibliotek för att skicka testresultat som en slack-notifikation/meddelande till kanaler

## Installation

Det enklaste sättet är att behålla `wdio-slack-service` som en devDependency i din `package.json`.

```json
{
  "devDependencies": {
    "wdio-slack-service": "2.0.8"
  }
}
```

Du kan enkelt göra det genom:

```bash
npm install wdio-slack-service --save-dev
```

Instruktioner om hur man installerar `WebdriverIO` finns [här.](https://webdriver.io/docs/gettingstarted.html)

## Konfiguration

Först importerar du tjänsten till wdio konfigurationsfil `wdio.conf.js`

```js
// wdio.conf.js
const slack = require('wdio-slack-service');
```

För att använda tjänsten behöver du ha slack webhook url för att skicka notifikationen och du behöver lägga till `slack` i din `services` array

Exempel:

```js
// wdio.conf.js
export.config = {
    // ...
    services: [
        [slack, {
            webHookUrl: "<SLACK_WEBHOOK_URL>", // Används för att skicka notifikation till en specifik kanal
            notifyOnlyOnFailure: true, // Skicka notifikation endast vid testmisslyckande
            messageTitle: "<NOTIFICATION_TITLE>" // Namn på notifikationen
        }]
]
```
## Funktioner

- Skicka notifikation oavsett testresultat
- Skicka notifikation endast vid testmisslyckande
- Stöd för `mocha`, `jasmine` och `cucumber`
- Omförsök/omkörning av tester loggas med ytterligare information
- Information om testets varaktighet
- Felinformation
- Cucumber scenario/steg rapportering
- Information om webbläsare och version

## Hur det fungerar
För `mocha`/`jasmine` skickas notifikationer på spec-nivå och för `cucumber` sker det på feature-nivå. Om du har 10 spec/feature-filer kommer du att få 10 notifikationer eftersom det utlöses i `after`-kroken

## Alternativ

För att skicka en notifikation måste du ha en slack webhook url. För att veta hur man skapar en slack webhook URL, se denna [sida](https://api.slack.com/messaging/webhooks)

### webHookUrl

Denna url används för att identifiera/autentisera postmeddelandet och skickar det till en slack-kanal

Typ: `String` <br/>
Valfritt: `NEJ` <br/>
Standard: `NA`

### notifyOnlyOnFailure

Om du vill ta emot slack-notifikationer endast vid testmisslyckande, ställ då in detta alternativ till `true`. Annars skickas notifikation för alla testkörningar oavsett godkänt/misslyckat

Typ: `Boolean` <br/>
Valfritt: `JA` <br/>
Standard: `false`

### messageTitle

Titel på notifikationen

Typ: `String` <br/>
Valfritt: `JA` <br/>
Standard: `Webdriverio Slack Reporter`

## Skärmbilder

### Cucumber Godkänd/Misslyckad

![Cucumber Godkänd/Misslyckad](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/Cucumber.PNG)

### Cucumber Omförsök

![Cucumber Omförsök](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/Cucumberretry.PNG)

### Alla Godkända

![Alla Godkända](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/allpass.PNG)

### Misslyckade Godkända

![Misslyckade Godkända](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/failpass.PNG)

### Omförsök Misslyckade

![Omförsök Misslyckade](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/retryfail.PNG)

### Omförsök Godkända

![Omförsök Godkända](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/retrypassed.PNG)

---

För mer information om WebdriverIO se [hemsidan](https://webdriver.io).