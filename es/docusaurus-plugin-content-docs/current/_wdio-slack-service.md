---
id: wdio-slack-service
title: Servicio de Slack
custom_edit_url: https://github.com/carmenmitru/wdio-slack-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-slack-service es un paquete de terceros, para más información vea [GitHub](https://github.com/carmenmitru/wdio-slack-service) | [npm](https://www.npmjs.com/package/wdio-slack-service)
Biblioteca de Webdriverio para enviar resultados de pruebas como notificación/mensaje de Slack a canales

## Instalación

La forma más fácil es mantener `wdio-slack-service` como una devDependency en tu `package.json`.

```json
{
  "devDependencies": {
    "wdio-slack-service": "2.0.8"
  }
}
```

Puedes hacerlo simplemente mediante:

```bash
npm install wdio-slack-service --save-dev
```

Las instrucciones sobre cómo instalar `WebdriverIO` se pueden encontrar [aquí.](https://webdriver.io/docs/gettingstarted.html)

## Configuración

Primero, importa el servicio al archivo de configuración wdio `wdio.conf.js`

```js
// wdio.conf.js
const slack = require('wdio-slack-service');
```

Para utilizar el servicio necesitas tener una URL de webhook de Slack para enviar la notificación y necesitas añadir `slack` a tu array de `services`

Ejemplo:

```js
// wdio.conf.js
export.config = {
    // ...
    services: [
        [slack, {
            webHookUrl: "<SLACK_WEBHOOK_URL>", // Usado para publicar notificaciones a un canal particular
            notifyOnlyOnFailure: true, // Enviar notificación solo en caso de fallos en las pruebas
            messageTitle: "<NOTIFICATION_TITLE>" // Nombre de la notificación
        }]
]
```
## Características

- Enviar notificación independientemente de los resultados de las pruebas
- Enviar notificación solo en caso de fallo en las pruebas
- Soporte para `mocha`, `jasmine` y `cucumber`
- Los reintentos/repeticiones de pruebas se registrarán con información adicional
- Información sobre la duración de la prueba
- Detalles de error
- Informe de escenario/paso de Cucumber
- Información del navegador y versión

## Cómo funciona
Para `mocha`/`jasmine`, la notificación se enviará a nivel de especificación y para `cucumber`, será a nivel de característica. Por ejemplo, si tienes 10 archivos de especificación/característica, recibirás 10 notificaciones ya que se activa en el hook `after`

## Opciones

Para enviar una notificación, debes tener una URL de webhook de Slack. Para saber cómo crear una URL de webhook de Slack, consulta esta [página](https://api.slack.com/messaging/webhooks)

### webHookUrl

Esta URL se utiliza para identificar/autenticar el mensaje publicado y enviarlo a un canal de Slack

Tipo: `String` <br/>
Opcional: `NO` <br/>
Predeterminado: `NA`

### notifyOnlyOnFailure

Si deseas recibir notificaciones de Slack solo cuando falla una prueba, establece esta opción en `true`. De lo contrario, enviará notificaciones para todas las ejecuciones de prueba independientemente de si pasan o fallan

Tipo: `Boolean` <br/>
Opcional: `SÍ` <br/>
Predeterminado: `false`

### messageTitle

Título de la notificación

Tipo: `String` <br/>
Opcional: `SÍ` <br/>
Predeterminado: `Webdriverio Slack Reporter`

## Capturas de pantalla

### Cucumber Pasa/Falla

![Cucumber Pasa/falla](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/Cucumber.PNG)

### Cucumber Reintento

![Cucumber Reintento](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/Cucumberretry.PNG)

### Todos Pasan

![Todos Pasan](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/allpass.PNG)

### Fallo Pasa

![Fallo Pasa](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/failpass.PNG)

### Reintento Fallido

![Reintento Fallido](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/retryfail.PNG)

### Reintento Pasado

![Reintento Pasado](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/retrypassed.PNG)

---

Para más información sobre WebdriverIO, consulta la [página principal](https://webdriver.io).