---
id: wdio-cucumber-viewport-logger-service
title: Servicio de Registro de Viewport para Cucumber
custom_edit_url: https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service/edit/main/README.md
---


> wdio-cucumber-viewport-logger-service es un paquete de terceros, para más información por favor visita [GitHub](https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service) | [npm](https://www.npmjs.com/package/wdio-cucumber-viewport-logger-service)
## Servicio de Registro de Viewport para Cucumber en WebdriverIO

Este servicio añade la posibilidad de registrar tus pasos de Cucumber y otra información de depuración directamente en la ventana de tu navegador en
tu solución basada en WebdriverIO. Puede ser especialmente útil en casos donde se usan dispositivos o máquinas virtuales sin acceso
*físico* directo a ellos y la posibilidad de configurar una sesión interactiva para depurar en profundidad tus pruebas e2e.

![demo](https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service/raw/main/img/demo.gif)

### Inicio Rápido

Instala el paquete:

```bash
npm install wdio-cucumber-viewport-logger-service --save-dev
```

Añade el servicio a la sección de `services` en tu configuración, por ejemplo:

```js
  services: [
    //...
    'cucumber-viewport-logger',
    //...
]
```

### Opciones del servicio

| Opción  | Descripción | Tipo |Valor predeterminado |
| --- | --- | --- | --- |
| `numberOfSteps`  | el número de pasos que estarán presentes en el viewport  | number |3 |
| `enabled`  | activar/desactivar el servicio | boolean |true |
| `styles`  | Estilos CSS para el wrapper del logger, *palabra clave del paso* y *texto del paso*, ver el ejemplo abajo  | object |{} |

```js
// wdio.conf.js
exports.config = {
    // ...
    services: [
        ['cucumber-viewport-logger', {
            numberOfSteps: 5,
            enabled: process.env.VP_LOGGER === '1', // el servicio se habilitará solo cuando configures la variable de entorno `VP_LOGGER` a `1`
            // establecer estilos CSS personalizados para elementos particulares
            styles: {
                wrapper: { backgroundColor: 'white' },
                keyword: { color: 'red' },
                text: {
                    fontSize: '30px',
                    color: 'green',
                },
                closeButton: {
                    color: 'red',
                },
            },
        },]
    ]
    // ...
};
```

### API

> `logToViewport(message, styles)` - renderizar un mensaje personalizado con estilo CSS personalizado (no obligatorio), puedes usar esto en tus definiciones de pasos
por ejemplo:
>```js
>When(/^I render message: "([^"]*)"$/, { timeout: 120000 }, function (message) {
>    browser.logToViewport(message, { text: { color: 'green' } });
>});
>```


> `removeViewportLogMessage()` - eliminar la sección de mensajes del viewport, puede ser útil por ejemplo para hacer una verificación visual

### pointerEvents: 'none'

Por defecto, todos los eventos del ratón (clic, hover, etc.) pasan a través de la sección de mensajes, por ejemplo: en lugar de hacer clic en la sección de mensajes, tu clic "pasa" al elemento junto al mensaje (el elemento de tu aplicación), si deseas cambiar este comportamiento, configura la opción de estilo del wrapper 'pointerEvents' a 'auto', ejemplo:
```js

/ wdio.conf.js
exports.config = {
    // ...
    services: [
        ['cucumber-viewport-logger', {
     
            styles: {
                wrapper: { pointerEvents: 'auto' },
            },
        },]
    ]
    // ...
};
```