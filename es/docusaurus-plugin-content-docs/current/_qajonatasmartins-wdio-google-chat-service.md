---
id: qajonatasmartins-wdio-google-chat-service
title: Servicio de Google Chat
custom_edit_url: https://github.com/qajonatasmartins/wdio-google-chat-service/edit/main/README.md
---


> @qajonatasmartins/wdio-google-chat-service es un paquete de terceros, para más información por favor consulta [GitHub](https://github.com/qajonatasmartins/wdio-google-chat-service) | [npm](https://www.npmjs.com/package/wdio-google-chat-service)

Biblioteca Webdriverio para enviar resultados de pruebas como notificación/mensaje a los espacios de Google Chat.

## Instalación

`npm install wdio-google-chat-service --save-dev`

o

`yarn add wdio-google-chat-service`

## configuración

Primero, importa el servicio en el archivo de configuración wdio `wdio.conf.js`

```
// wdio.conf.js
const GoogleChatService = require('wdio-google-chat-service');
```

Para usar el servicio necesitas tener la URL del webhook de Google Chat para enviar la notificación y agregarla en 'webhook'

Ejemplo:

```
services: [[GoogleChatService, {
            webhookUrl: 'https://chat.googleapis.com/v1/spaces/xxxxxxxxx/messages?key=xxxxxxxx&token=xxxxxxxxx',
            notifyOnlyOnFailure: false //Send notification only in case of test failure
        }]
],
```

## Obtener webhook de Google Chat

Nota: Google Chat solo tiene el webhook para cuentas empresariales. Si usas una cuenta personal no deberías tener la opción de webhook.

1. Crea un espacio en Google Chat
2. Haz clic en la flecha del nombre del espacio de chat
3. Haz clic en [Manage Webhooks]
4. Agrega uno o copia la URL del webhook presentada.
5. Pega la URL del webhook en el servicio dentro de la opción 'webhookUrl' como en el ejemplo anterior.

## Características

- Soporte para el ejecutor mocha
- Detalles de errores
- Enviar notificación solo en caso de fallo de prueba

## Resultados

![Prueba aprobada y fallida](https://github.com/qajonatasmartins/wdio-google-chat-service/blob/main/./img/testPassAndFail.png)