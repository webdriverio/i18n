---
id: wdio-gmail-service
title: Servicio de Gmail
custom_edit_url: https://github.com/webdriverio-community/wdio-gmail-service/edit/main/README.md
---


> wdio-gmail-service es un paquete de terceros, para más información por favor consulta [GitHub](https://github.com/webdriverio-community/wdio-gmail-service) | [npm](https://www.npmjs.com/package/wdio-gmail-service)

Un plugin de WebdriverIO para obtener correos electrónicos de Google Mail usando [Gmail Tester](https://github.com/levz0r/gmail-tester).

## Instalación

La forma más sencilla es mantener `wdio-gmail-service` como una `devDependency` en tu package.json.

```json
{
  "devDependencies": {
    "wdio-gmail-service": "^2.0.0"
  }
}
```

Puedes hacerlo simplemente con:

```sh
npm install wdio-gmail-service --save-dev
```

## Uso

### Autenticación de Gmail

Necesitarás seguir las instrucciones en [Gmail Tester](https://github.com/levz0r/gmail-tester) para crear el `credentials.json` (el archivo de autenticación OAuth2) y `token.json` (el token OAuth2).

### Configuración

Añade el servicio agregando `gmail` a la lista de servicios, por ejemplo:

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

## Opciones del Servicio

### credentialsJsonPath
Ruta absoluta a un archivo JSON de credenciales.

Type: `string`

Required: `true`

### tokenJsonPath
Ruta absoluta a un archivo JSON de token.

Type: `string`

Required: `true`

### intervalSec
El intervalo entre las comprobaciones de la bandeja de entrada de Gmail.

Type: `number`

Default: `10`

Required: `false`

### timeoutSec
El tiempo máximo de espera para encontrar el correo electrónico con los filtros dados.

Type: `number`

Default: `60`

Required: `false`


## Escribiendo pruebas

En tu prueba de WebdriverIO, ahora puedes comprobar si se recibió un correo electrónico.

```js
describe('Example', () => {
    it('Should check email', () => {
        // perform some actions that will send an email to setup gmail account
        const emails = await browser.checkInbox({ from: 'AccountSupport@ubi.com', subject: 'Ubisoft Password Change Request' });
        expect(emails[0].body.html).toContain('https://account-uplay.ubi.com/en-GB/action/change-password?genomeid=')
    })
})
```

## Parámetros de `checkInbox`

Los parámetros del comando requieren al menos uno de `from`, `to` o `subject`:

### `from`
Filtrar por la dirección de correo electrónico del remitente.

Type: `String`

### `to`
Filtrar por la dirección de correo electrónico del destinatario.

Type: `String`

### `subject`
Filtrar por el asunto del correo electrónico.

Type: `String`

### `includeBody`
Establecer a true para obtener los cuerpos de correo electrónico decodificados.

Type: `boolean`

### `includeAttachments`
Establecer a true para obtener los archivos adjuntos de correo electrónico codificados en base64.

Type: `boolean`

### `before`
Filtrar mensajes recibidos antes de la fecha especificada.

Type: `Date`

### `after`
Filtrar mensajes recibidos después de la fecha especificada.

Type: `Date`

### `label`
La etiqueta predeterminada es 'INBOX', pero puede cambiarse a 'SPAM', 'TRASH' o una etiqueta personalizada. Para una lista completa de etiquetas integradas, consulta https://developers.google.com/gmail/api/guides/labels?hl=en

Type: `String`

---

Para más información sobre WebdriverIO, consulta la [página principal](https://webdriver.io).