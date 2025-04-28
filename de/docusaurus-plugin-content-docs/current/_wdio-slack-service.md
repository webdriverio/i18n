---
id: wdio-slack-service
title: Slack Service
custom_edit_url: https://github.com/carmenmitru/wdio-slack-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-slack-service ist ein Paket von Drittanbietern, weitere Informationen finden Sie auf [GitHub](https://github.com/carmenmitru/wdio-slack-service) | [npm](https://www.npmjs.com/package/wdio-slack-service)
Webdriverio-Bibliothek zum Senden von Testergebnissen als Slack-Benachrichtigung/Nachricht an Kanäle

## Installation

Der einfachste Weg ist, `wdio-slack-service` als devDependency in Ihrer `package.json` zu behalten.

```json
{
  "devDependencies": {
    "wdio-slack-service": "2.0.8"
  }
}
```

Sie können dies einfach tun mit:

```bash
npm install wdio-slack-service --save-dev
```

Anweisungen zur Installation von `WebdriverIO` finden Sie [hier.](https://webdriver.io/docs/gettingstarted.html)

## Konfiguration

Importieren Sie zunächst den Service in die wdio-Konfigurationsdatei `wdio.conf.js`

```js
// wdio.conf.js
const slack = require('wdio-slack-service');
```

Um den Service nutzen zu können, benötigen Sie die Slack-Webhook-URL für die Benachrichtigung und müssen `slack` zu Ihrem `services`-Array hinzufügen

Beispiel:

```js
// wdio.conf.js
export.config = {
    // ...
    services: [
        [slack, {
            webHookUrl: "<SLACK_WEBHOOK_URL>", // Wird verwendet, um Benachrichtigungen an einen bestimmten Kanal zu senden
            notifyOnlyOnFailure: true, // Benachrichtigung nur bei Testfehlern senden
            messageTitle: "<NOTIFICATION_TITLE>" // Name der Benachrichtigung
        }]
]
```
## Funktionen

- Benachrichtigungen unabhängig von Testergebnissen senden
- Benachrichtigungen nur bei Testfehlern senden
- Unterstützung für `mocha`, `jasmine` und `cucumber`
- Wiederholungen/Neustarts von Tests werden mit zusätzlichen Informationen protokolliert
- Testdauerinformationen
- Fehlerdetails
- Cucumber Szenario/Schritt-Berichterstattung
- Browser- und Versionsinformationen

## Wie es funktioniert
Für `mocha`/`jasmine` wird die Benachrichtigung auf Spec-Ebene gesendet und für `cucumber` auf Feature-Ebene. Wenn Sie beispielsweise 10 Spec/Feature-Dateien haben, erhalten Sie 10 Benachrichtigungen, da diese im `after`-Hook ausgelöst werden

## Optionen

Um eine Benachrichtigung zu senden, benötigen Sie eine Slack-Webhook-URL. Wie Sie eine Slack-Webhook-URL erstellen, erfahren Sie auf dieser [Seite](https://api.slack.com/messaging/webhooks)

### webHookUrl

Diese URL dient zur Identifizierung/Authentifizierung der Nachricht und sendet sie an einen Slack-Kanal

Typ: `String` <br/>
Optional: `NEIN` <br/>
Standard: `NA`

### notifyOnlyOnFailure

Wenn Sie Slack-Benachrichtigungen nur bei Testfehlern erhalten möchten, setzen Sie diese Option auf `true`. Andernfalls werden Benachrichtigungen für alle Testausführungen unabhängig vom Ergebnis (bestanden/nicht bestanden) gesendet

Typ: `Boolean` <br/>
Optional: `JA` <br/>
Standard: `false`

### messageTitle

Titel der Benachrichtigung

Typ: `String` <br/>
Optional: `JA` <br/>
Standard: `Webdriverio Slack Reporter`

## Screenshots

### Cucumber Bestanden/Nicht bestanden

![Cucumber Pass/fail](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/Cucumber.PNG)

### Cucumber Wiederholung

![Cucumber Retry](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/Cucumberretry.PNG)

### Alle bestanden

![All Pass](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/allpass.PNG)

### Fehlgeschlagen/Bestanden

![Fail Pass](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/failpass.PNG)

### Wiederholung fehlgeschlagen

![Retry Failed](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/retryfail.PNG)

### Wiederholung bestanden

![Retry Passed](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/retrypassed.PNG)

---

Weitere Informationen zu WebdriverIO finden Sie auf der [Homepage](https://webdriver.io).