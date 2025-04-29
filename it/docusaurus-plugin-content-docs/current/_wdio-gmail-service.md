---
id: wdio-gmail-service
title: Servizio Gmail
custom_edit_url: https://github.com/webdriverio-community/wdio-gmail-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-gmail-service è un pacchetto di terze parti, per maggiori informazioni consultare [GitHub](https://github.com/webdriverio-community/wdio-gmail-service) | [npm](https://www.npmjs.com/package/wdio-gmail-service)

Un plugin WebdriverIO per recuperare le e-mail da Google Mail utilizzando [Gmail Tester](https://github.com/levz0r/gmail-tester).

## Installazione

Il modo più semplice è mantenere `wdio-gmail-service` come `devDependency` nel tuo package.json.

```json
{
  "devDependencies": {
    "wdio-gmail-service": "^2.0.0"
  }
}
```

Puoi farlo semplicemente con:

```sh
npm install wdio-gmail-service --save-dev
```

## Utilizzo

### Autenticazione Gmail

Dovrai seguire le istruzioni su [Gmail Tester](https://github.com/levz0r/gmail-tester) per creare il file `credentials.json` (il file di autenticazione OAuth2) e `token.json` (il token OAuth2).

### Configurazione

Aggiungi il servizio inserendo `gmail` nell'elenco dei servizi, ad esempio:

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

## Opzioni del Servizio

### credentialsJsonPath
Percorso assoluto a un file JSON delle credenziali.

Tipo: `string`

Richiesto: `true`

### tokenJsonPath
Percorso assoluto a un file JSON del token.

Tipo: `string`

Richiesto: `true`

### intervalSec
L'intervallo tra i controlli della casella di posta Gmail.

Tipo: `number`

Predefinito: `10`

Richiesto: `false`

### timeoutSec
Il tempo massimo di attesa per trovare l'email per i filtri specificati.

Tipo: `number`

Predefinito: `60`

Richiesto: `false`


## Scrittura dei test

Nel tuo test WebdriverIO, ora puoi verificare se è stata ricevuta un'email.

```js
describe('Example', () => {
    it('Should check email', () => {
        // perform some actions that will send an email to setup gmail account
        const emails = await browser.checkInbox({ from: 'AccountSupport@ubi.com', subject: 'Ubisoft Password Change Request' });
        expect(emails[0].body.html).toContain('https://account-uplay.ubi.com/en-GB/action/change-password?genomeid=')
    })
})
```

## Parametri di `checkInbox`

I parametri del comando richiedono almeno uno tra `from`, `to` o `subject`:

### `from`
Filtra per indirizzo email del mittente.

Tipo: `String`

### `to`
Filtra per indirizzo email del destinatario.

Tipo: `String`

### `subject`
Filtra per oggetto dell'email.

Tipo: `String`

### `includeBody`
Imposta a true per recuperare i corpi delle email decodificati.

Tipo: `boolean`

### `includeAttachments`
Imposta a true per recuperare gli allegati email codificati in base64.

Tipo: `boolean`

### `before`
Filtra i messaggi ricevuti prima della data specificata.

Tipo: `Date`

### `after`
Filtra i messaggi ricevuti dopo la data specificata.

Tipo: `Date`

### `label`
L'etichetta predefinita è 'INBOX', ma può essere modificata in 'SPAM', 'TRASH' o un'etichetta personalizzata. Per un elenco completo delle etichette predefinite, consulta https://developers.google.com/gmail/api/guides/labels?hl=en

Tipo: `String`

---

Per maggiori informazioni su WebdriverIO consulta la [homepage](https://webdriver.io).