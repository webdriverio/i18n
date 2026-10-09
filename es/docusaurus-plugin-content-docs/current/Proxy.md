---
id: proxy
title: Configuración de Proxy
description: "Enruta las solicitudes a través de un proxy, ya sea entre tus pruebas y el driver o entre el navegador e internet."
---

Puedes canalizar dos tipos diferentes de solicitudes a través de un proxy:

- la conexión entre tu script de prueba y el driver del navegador (o endpoint de WebDriver)
- la conexión entre el navegador e internet

## Proxy entre el Driver y la Prueba

Si tu empresa tiene un proxy corporativo (por ejemplo, en `http://my.corp.proxy.com:9090`) para todas las solicitudes salientes, tienes dos opciones para configurar WebdriverIO para que use el proxy:

### Opción 1: Usando Variables de Entorno (Recomendado)

A partir de WebdriverIO v9.12.0, simplemente puedes establecer las variables de entorno estándar de proxy:

```bash
export HTTP_PROXY=http://my.corp.proxy.com:9090
export HTTPS_PROXY=http://my.corp.proxy.com:9090
# Opcional: omitir el proxy para ciertos hosts
export NO_PROXY=localhost,127.0.0.1,.internal.domain
```

Luego ejecuta tus pruebas como de costumbre. WebdriverIO utilizará automáticamente estas variables de entorno para la configuración del proxy.

### Opción 2: Usando setGlobalDispatcher de undici

Para configuraciones de proxy más avanzadas o si necesitas control programático, puedes usar el método `setGlobalDispatcher` de undici:

#### Instalar undici

```bash npm2yarn
npm install undici --save-dev
```

#### Agregar setGlobalDispatcher de undici a tu archivo de configuración

Agrega la siguiente instrucción require al inicio de tu archivo de configuración.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy || 'http://my.corp.proxy.com:9090').toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

Puedes encontrar información adicional sobre la configuración del proxy [aquí](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md).

### ¿Qué Método Debo Usar?

- **Usa variables de entorno** si quieres un enfoque simple y estándar que funcione con diferentes herramientas y no requiera cambios en el código.
- **Usa setGlobalDispatcher** si necesitas funciones de proxy avanzadas como autenticación personalizada, diferentes configuraciones de proxy por entorno, o si quieres controlar programáticamente el comportamiento del proxy.

Ambos métodos son totalmente compatibles y WebdriverIO buscará primero un dispatcher global antes de recurrir a las variables de entorno.

### Sauce Connect Proxy

Si usas [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5), inícialo mediante:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## Proxy entre el Navegador e Internet

Para canalizar la conexión entre el navegador e internet, puedes configurar un proxy, lo cual puede ser útil, por ejemplo, para capturar información de red y otros datos con herramientas como [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy).

Los parámetros de `proxy` se pueden aplicar mediante las capabilities estándar de la siguiente manera:

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