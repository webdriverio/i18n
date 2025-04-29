---
id: wdio-gmail-service
title: Gmail-tjänst
custom_edit_url: https://github.com/webdriverio-community/wdio-gmail-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-gmail-service is a 3rd party package, for more information please see [GitHub](https://github.com/webdriverio-community/wdio-gmail-service) | [npm](https://www.npmjs.com/package/wdio-gmail-service)

En WebdriverIO-plugin för att hämta e-postmeddelanden från Google Mail med hjälp av [Gmail Tester](https://github.com/levz0r/gmail-tester).

## Installation

Det enklaste sättet är att behålla `wdio-gmail-service` som en `devDependency` i din package.json.

```json
{
  "devDependencies": {
    "wdio-gmail-service": "^2.0.0"
  }
}
```

Du kan enkelt göra det genom att:

```sh
npm install wdio-gmail-service --save-dev
```

## Användning

### Gmail-autentisering

Du behöver följa instruktionerna på [Gmail Tester](https://github.com/levz0r/gmail-tester) för att skapa `credentials.json` (OAuth2-autentiseringsfilen) och `token.json` (OAuth2-token).

### Konfiguration

Lägg till tjänsten genom att lägga till `gmail` i tjänstlistan, t.ex.:

```js
// wdio.conf.js
import path from 'path'

export const config = {
    // ...
    services: [['gmail', {
        credentialsJsonPath: path.join(process.cwd(), './credentials.json'),
        tokenJsonPath: join(process.cwd(), './token.json'),
        intervalSec: 10,
        timeoutSec: 60
    }]]
    // ...
};
```

## Tjänstalternativ

### credentialsJsonPath
Absolut sökväg till en credentials JSON-fil.

Typ: `string`

Krävs: `true`

### tokenJsonPath
Absolut sökväg till en token JSON-fil.

Typ: `string`

Krävs: `true`

### intervalSec
Intervallet mellan kontroller av Gmail-inkorgen.

Typ: `number`

Standard: `10`

Krävs: `false`

### timeoutSec
Den maximala tiden att vänta på att hitta e-postmeddelandet för de angivna filtren.

Typ: `number`

Standard: `60`

Krävs: `false`


## Skriva tester

I ditt WebdriverIO-test kan du nu kontrollera om ett e-postmeddelande har tagits emot.

```js
describe('Example', () => {
    it('Should check email', () => {
        // perform some actions that will send an email to setup gmail account
        const emails = await browser.checkInbox({ from: 'AccountSupport@ubi.com', subject: 'Ubisoft Password Change Request' });
        expect(emails[0].body.html).toContain('https://account-uplay.ubi.com/en-GB/action/change-password?genomeid=')
    })
})
```

## `checkInbox`-parametrar

Kommandoparametrarna kräver minst en av `from`, `to`, eller `subject`:

### `from`
Filtrera på e-postadressen till mottagaren.

Typ: `String`

### `to`
Filtrera på e-postadressen till avsändaren.

Typ: `String`

### `subject`
Filtrera på ämnet för e-postmeddelandet.

Typ: `String`

### `includeBody`
Ange till true för att hämta avkodade e-postinnehåll.

Typ: `boolean`

### `includeAttachments`
Ange till true för att hämta base64-kodade e-postbilagor.

Typ: `boolean`

### `before`
Filtrera meddelanden mottagna före det angivna datumet.

Typ: `Date`

### `after`
Filtrera meddelanden mottagna efter det angivna datumet.

Typ: `Date`

### `label`
Standardetiketten är 'INBOX', men kan ändras till 'SPAM', 'TRASH' eller en anpassad etikett. För en fullständig lista över inbyggda etiketter, se https://developers.google.com/gmail/api/guides/labels?hl=en

Typ: `String`

---

För mer information om WebdriverIO, se [hemsidan](https://webdriver.io).