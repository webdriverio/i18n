---
id: wdio-gmail-service
title: Gmail Service
custom_edit_url: https://github.com/webdriverio-community/wdio-gmail-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-gmail-service ist ein Paket von Drittanbietern. Weitere Informationen finden Sie auf [GitHub](https://github.com/webdriverio-community/wdio-gmail-service) | [npm](https://www.npmjs.com/package/wdio-gmail-service)

Ein WebdriverIO-Plugin zum Abrufen von E-Mails von Google Mail mit [Gmail Tester](https://github.com/levz0r/gmail-tester).

## Installation

Am einfachsten ist es, `wdio-gmail-service` als `devDependency` in Ihrer package.json zu behalten.

```json
{
  "devDependencies": {
    "wdio-gmail-service": "^2.0.0"
  }
}
```

Sie können dies einfach tun mit:

```sh
npm install wdio-gmail-service --save-dev
```

## Verwendung

### Gmail-Authentifizierung

Sie müssen die Anweisungen von [Gmail Tester](https://github.com/levz0r/gmail-tester) befolgen, um die `credentials.json` (die OAuth2-Authentifizierungsdatei) und `token.json` (das OAuth2-Token) zu erstellen.

### Konfiguration

Fügen Sie den Dienst hinzu, indem Sie `gmail` zur Dienstliste hinzufügen, z.B.:

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

## Service-Optionen

### credentialsJsonPath
Absoluter Pfad zu einer Anmeldeinformationsdatei im JSON-Format.

Type: `string`

Required: `true`

### tokenJsonPath
Absoluter Pfad zu einer Token-Datei im JSON-Format.

Type: `string`

Required: `true`

### intervalSec
Das Intervall zwischen den Überprüfungen des Gmail-Posteingangs.

Type: `number`

Default: `10`

Required: `false`

### timeoutSec
Die maximale Wartezeit für das Finden der E-Mail für die angegebenen Filter.

Type: `number`

Default: `60`

Required: `false`


## Tests schreiben

In Ihrem WebdriverIO-Test können Sie jetzt prüfen, ob eine E-Mail empfangen wurde.

```js
describe('Example', () => {
    it('Should check email', () => {
        // perform some actions that will send an email to setup gmail account
        const emails = await browser.checkInbox({ from: 'AccountSupport@ubi.com', subject: 'Ubisoft Password Change Request' });
        expect(emails[0].body.html).toContain('https://account-uplay.ubi.com/en-GB/action/change-password?genomeid=')
    })
})
```

## `checkInbox` Parameter

Die Befehlsparameter erfordern mindestens einen der Parameter `from`, `to` oder `subject`:

### `from`
Filter für die E-Mail-Adresse des Empfängers.

Type: `String`

### `to`
Filter für die E-Mail-Adresse des Absenders.

Type: `String`

### `subject`
Filter für den Betreff der E-Mail.

Type: `String`

### `includeBody`
Auf true setzen, um dekodierte E-Mail-Inhalte abzurufen.

Type: `boolean`

### `includeAttachments`
Auf true setzen, um die Base64-codierten E-Mail-Anhänge abzurufen.

Type: `boolean`

### `before`
Filtert Nachrichten, die vor dem angegebenen Datum empfangen wurden.

Type: `Date`

### `after`
Filtert Nachrichten, die nach dem angegebenen Datum empfangen wurden.

Type: `Date`

### `label`
Das Standardlabel ist 'INBOX', kann aber zu 'SPAM', 'TRASH' oder einem benutzerdefinierten Label geändert werden. Eine vollständige Liste der integrierten Labels finden Sie unter https://developers.google.com/gmail/api/guides/labels?hl=en

Type: `String`

---

Weitere Informationen zu WebdriverIO finden Sie auf der [Homepage](https://webdriver.io).