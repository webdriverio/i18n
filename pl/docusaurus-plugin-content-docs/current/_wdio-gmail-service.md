---
id: wdio-gmail-service
title: Usługa Gmail
custom_edit_url: https://github.com/webdriverio-community/wdio-gmail-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-gmail-service jest pakietem zewnętrznym, więcej informacji znajdziesz na [GitHub](https://github.com/webdriverio-community/wdio-gmail-service) | [npm](https://www.npmjs.com/package/wdio-gmail-service)

Plugin WebdriverIO do pobierania e-maili z Google Mail przy użyciu [Gmail Tester](https://github.com/levz0r/gmail-tester).

## Instalacja

Najłatwiejszym sposobem jest utrzymywanie `wdio-gmail-service` jako `devDependency` w twoim package.json.

```json
{
  "devDependencies": {
    "wdio-gmail-service": "^2.0.0"
  }
}
```

Możesz to zrobić po prostu przez:

```sh
npm install wdio-gmail-service --save-dev
```

## Użycie

### Uwierzytelnianie Gmail

Musisz postępować zgodnie z instrukcjami [Gmail Tester](https://github.com/levz0r/gmail-tester), aby utworzyć plik `credentials.json` (plik uwierzytelniania OAuth2) oraz `token.json` (token OAuth2).

### Konfiguracja

Dodaj usługę, dodając `gmail` do listy usług, np.:

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

## Opcje usługi

### credentialsJsonPath
Ścieżka bezwzględna do pliku credentials JSON.

Typ: `string`

Wymagane: `true`

### tokenJsonPath
Ścieżka bezwzględna do pliku token JSON.

Typ: `string`

Wymagane: `true`

### intervalSec
Interwał między sprawdzaniem skrzynki odbiorczej Gmail.

Typ: `number`

Domyślnie: `10`

Wymagane: `false`

### timeoutSec
Maksymalny czas oczekiwania na znalezienie e-maila dla podanych filtrów.

Typ: `number`

Domyślnie: `60`

Wymagane: `false`


## Pisanie testów

W swoim teście WebdriverIO możesz teraz sprawdzić, czy otrzymano wiadomość e-mail.

```js
describe('Example', () => {
    it('Should check email', () => {
        // perform some actions that will send an email to setup gmail account
        const emails = await browser.checkInbox({ from: 'AccountSupport@ubi.com', subject: 'Ubisoft Password Change Request' });
        expect(emails[0].body.html).toContain('https://account-uplay.ubi.com/en-GB/action/change-password?genomeid=')
    })
})
```

## Parametry `checkInbox`

Parametry polecenia wymagają co najmniej jednego z `from`, `to` lub `subject`:

### `from`
Filtrowanie według adresu e-mail odbiorcy.

Typ: `String`

### `to`
Filtrowanie według adresu e-mail nadawcy.

Typ: `String`

### `subject`
Filtrowanie według tematu wiadomości e-mail.

Typ: `String`

### `includeBody`
Ustaw na true, aby pobrać zdekodowane treści wiadomości e-mail.

Typ: `boolean`

### `includeAttachments`
Ustaw na true, aby pobrać załączniki e-mail zakodowane w base64.

Typ: `boolean`

### `before`
Filtruj wiadomości otrzymane przed określoną datą.

Typ: `Date`

### `after`
Filtruj wiadomości otrzymane po określonej dacie.

Typ: `Date`

### `label`
Domyślna etykieta to 'INBOX', ale można ją zmienić na 'SPAM', 'TRASH' lub niestandardową etykietę. Pełną listę wbudowanych etykiet znajdziesz na https://developers.google.com/gmail/api/guides/labels?hl=en

Typ: `String`

---

Więcej informacji na temat WebdriverIO znajdziesz na [stronie głównej](https://webdriver.io).