---
id: wdio-slack-service
title: Usługa Slack
custom_edit_url: https://github.com/carmenmitru/wdio-slack-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-slack-service jest pakietem firm trzecich, więcej informacji znajdziesz na [GitHub](https://github.com/carmenmitru/wdio-slack-service) | [npm](https://www.npmjs.com/package/wdio-slack-service)
Biblioteka Webdriverio do wysyłania wyników testów jako powiadomień/wiadomości Slack do kanałów

## Instalacja

Najłatwiejszym sposobem jest zachowanie `wdio-slack-service` jako devDependency w pliku `package.json`.

```json
{
  "devDependencies": {
    "wdio-slack-service": "2.0.8"
  }
}
```

Możesz to prosto zrobić poprzez:

```bash
npm install wdio-slack-service --save-dev
```

Instrukcje dotyczące instalacji `WebdriverIO` można znaleźć [tutaj.](https://webdriver.io/docs/gettingstarted.html)

## Konfiguracja

Najpierw zaimportuj usługę do pliku konfiguracyjnego wdio `wdio.conf.js`

```js
// wdio.conf.js
const slack = require('wdio-slack-service');
```

Aby korzystać z usługi, potrzebujesz adresu URL webhooka Slack do wysyłania powiadomień oraz musisz dodać `slack` do tablicy `services`

Przykład:

```js
// wdio.conf.js
export.config = {
    // ...
    services: [
        [slack, {
            webHookUrl: "<SLACK_WEBHOOK_URL>", // Używany do wysyłania powiadomień do określonego kanału
            notifyOnlyOnFailure: true, // Wysyłaj powiadomienia tylko przy niepowodzeniu testu
            messageTitle: "<NOTIFICATION_TITLE>" // Nazwa powiadomienia
        }]
]
```
## Funkcje

- Wysyłanie powiadomień niezależnie od wyników testów
- Wysyłanie powiadomień tylko przy niepowodzeniu testu
- Wsparcie dla `mocha`, `jasmine` i `cucumber`
- Ponowne próby/powtórki testów będą rejestrowane z dodatkowymi informacjami
- Informacje o czasie trwania testu
- Szczegóły błędów
- Raportowanie scenariuszy/kroków Cucumber
- Informacje o przeglądarce i wersji

## Jak to działa
Dla `mocha`/`jasmine`, powiadomienia będą wysyłane na poziomie specyfikacji, a dla `cucumber` na poziomie funkcji. Jeśli na przykład masz 10 plików spec/feature, otrzymasz 10 powiadomień, ponieważ są one wyzwalane w hooku `after`

## Opcje

Aby wysłać powiadomienie, powinieneś mieć URL webhooka Slack. Aby dowiedzieć się, jak utworzyć URL webhooka Slack, zobacz tę [stronę](https://api.slack.com/messaging/webhooks)

### webHookUrl

Ten adres URL służy do identyfikacji/uwierzytelniania wiadomości i wysyłania jej do kanału Slack

Typ: `String` <br/>
Opcjonalny: `NIE` <br/>
Domyślnie: `NA`

### notifyOnlyOnFailure

Jeśli chcesz otrzymywać powiadomienia Slack tylko w przypadku niepowodzenia testu, ustaw tę opcję na `true`. W przeciwnym razie wysyła powiadomienia dla wszystkich wykonań testów, niezależnie od tego, czy są one udane/nieudane

Typ: `Boolean` <br/>
Opcjonalny: `TAK` <br/>
Domyślnie: `false`

### messageTitle

Tytuł powiadomienia

Typ: `String` <br/>
Opcjonalny: `TAK` <br/>
Domyślnie: `Webdriverio Slack Reporter`

## Zrzuty ekranu

### Cucumber Pass/Fail

![Cucumber Pass/fail](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/Cucumber.PNG)

### Cucumber Retry

![Cucumber Retry](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/Cucumberretry.PNG)

### All Pass

![All Pass](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/allpass.PNG)

### Fail Pass

![Fail Pass](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/failpass.PNG)

### Retry Failed

![Retry Failed](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/retryfail.PNG)

### Retry Passed

![Retry Passed](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/retrypassed.PNG)

---

Więcej informacji na temat WebdriverIO można znaleźć na [stronie głównej](https://webdriver.io).