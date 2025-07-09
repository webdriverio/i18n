---
id: proxy
title: Configuración de Proxy
---

Puedes dirigir dos tipos diferentes de peticiones a través de un proxy:

- conexión entre tu script de prueba y el controlador del navegador (o punto final de WebDriver)
- conexión entre el navegador e internet

## Proxy Entre el Controlador y la Prueba

Si tu empresa tiene un proxy corporativo (por ejemplo, en `http://my.corp.proxy.com:9090`) para todas las solicitudes salientes, tienes dos opciones para configurar WebdriverIO para usar el proxy:

### Opción 1: Usando Variables de Entorno (Recomendado)

A partir de WebdriverIO v9.12.0, puedes simplemente establecer las variables de entorno estándar para proxy:

```bash
export HTTP_PROXY=http://my.corp.proxy.com:9090
export HTTPS_PROXY=http://my.corp.proxy.com:9090
# Opcional: omitir proxy para ciertos hosts
export NO_PROXY=localhost,127.0.0.1,.internal.domain
```

Luego ejecuta tus pruebas como de costumbre. WebdriverIO usará automáticamente estas variables de entorno para la configuración del proxy.

### Opción 2: Usando setGlobalDispatcher de undici

Para configuraciones de proxy más avanzadas o si necesitas control programático, puedes usar el método `setGlobalDispatcher` de undici:

#### Instalar undici

```bash npm2yarn
npm install undici --save-dev
```

#### Añadir undici setGlobalDispatcher a tu archivo de configuración

Añade la siguiente declaración require en la parte superior de tu archivo de configuración.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy || 'http://my.corp.proxy.com:9090').toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

Información adicional sobre la configuración del proxy se puede encontrar [aquí](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md).

### ¿Qué Método Debería Usar?

- **Usa variables de entorno** si quieres un enfoque simple y estándar que funcione con diferentes herramientas y no requiera cambios en el código.
- **Usa setGlobalDispatcher** si necesitas características avanzadas de proxy como autenticación personalizada, diferentes configuraciones de proxy por entorno, o quieres controlar programáticamente el comportamiento del proxy.

Ambos métodos son totalmente compatibles y WebdriverIO comprobará primero si hay un dispatcher global antes de recurrir a las variables de entorno.

### Sauce Connect Proxy

Si utilizas [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5), inícialo mediante:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## Proxy Entre el Navegador e Internet

Para dirigir la conexión entre el navegador e internet, puedes configurar un proxy que puede ser útil para (por ejemplo) capturar información de red y otros datos con herramientas como [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy).

Los parámetros de `proxy` se pueden aplicar a través de las capacidades estándar de la siguiente manera:

```js title="wdio.conf.js"
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        // ...
        proxy: {
            proxyType: "manual",
            httpProxy: "corporate.proxy:8080",
            socksUsername: "codeceptjs",
            socksPassword: "secret",
            noProxy: "127.0.0.1,localhost"
        },
        // ...
    }],
    // ...
}
```

Para más información, consulta la [especificación de WebDriver](https://w3c.github.io/webdriver/#proxy).