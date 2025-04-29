---
id: wdio-gmail-service
title: Serviço Gmail
custom_edit_url: https://github.com/webdriverio-community/wdio-gmail-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-gmail-service é um pacote de terceiros, para mais informações, consulte [GitHub](https://github.com/webdriverio-community/wdio-gmail-service) | [npm](https://www.npmjs.com/package/wdio-gmail-service)

Um plugin WebdriverIO para buscar e-mails do Google Mail usando [Gmail Tester](https://github.com/levz0r/gmail-tester).

## Instalação

A maneira mais fácil é manter o `wdio-gmail-service` como uma `devDependency` no seu package.json.

```json
{
  "devDependencies": {
    "wdio-gmail-service": "^2.0.0"
  }
}
```

Você pode simplesmente fazer isso através de:

```sh
npm install wdio-gmail-service --save-dev
```

## Uso

### Autenticação Gmail

Você precisa seguir as instruções em [Gmail Tester](https://github.com/levz0r/gmail-tester) para criar o `credentials.json` (o arquivo de autenticação OAuth2) e `token.json` (o token OAuth2).

### Configuração

Adicione o serviço incluindo `gmail` na lista de serviços, por exemplo:

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

## Opções de Serviço

### credentialsJsonPath
Caminho absoluto para um arquivo JSON de credenciais.

Tipo: `string`

Obrigatório: `true`

### tokenJsonPath
Caminho absoluto para um arquivo JSON de token.

Tipo: `string`

Obrigatório: `true`

### intervalSec
O intervalo entre verificações da caixa de entrada do Gmail.

Tipo: `number`

Padrão: `10`

Obrigatório: `false`

### timeoutSec
O tempo máximo de espera para encontrar o e-mail para os filtros fornecidos.

Tipo: `number`

Padrão: `60`

Obrigatório: `false`


## Escrevendo testes

Em seu teste WebdriverIO, você agora pode verificar se um e-mail foi recebido.

```js
describe('Example', () => {
    it('Should check email', () => {
        // perform some actions that will send an email to setup gmail account
        const emails = await browser.checkInbox({ from: 'AccountSupport@ubi.com', subject: 'Ubisoft Password Change Request' });
        expect(emails[0].body.html).toContain('https://account-uplay.ubi.com/en-GB/action/change-password?genomeid=')
    })
})
```

## Parâmetros `checkInbox`

Os parâmetros do comando requerem pelo menos um dos seguintes: `from`, `to` ou `subject`:

### `from`
Filtro pelo endereço de e-mail do remetente.

Tipo: `String`

### `to`
Filtro pelo endereço de e-mail do destinatário.

Tipo: `String`

### `subject`
Filtro pelo assunto do e-mail.

Tipo: `String`

### `includeBody`
Defina como true para buscar corpos de e-mail decodificados.

Tipo: `boolean`

### `includeAttachments`
Defina como true para buscar anexos de e-mail codificados em base64.

Tipo: `boolean`

### `before`
Filtrar mensagens recebidas antes da data especificada.

Tipo: `Date`

### `after`
Filtrar mensagens recebidas após a data especificada.

Tipo: `Date`

### `label`
O rótulo padrão é 'INBOX', mas pode ser alterado para 'SPAM', 'TRASH' ou um rótulo personalizado. Para uma lista completa de rótulos incorporados, consulte https://developers.google.com/gmail/api/guides/labels?hl=en

Tipo: `String`

---

Para mais informações sobre WebdriverIO, consulte a [página inicial](https://webdriver.io).