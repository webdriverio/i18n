---
id: proxy
title: Configuración de Proxy
---

Puedes canalizar dos tipos diferentes de solicitudes a través de un proxy:

- conexión entre tu script de prueba y el controlador del navegador (o punto final de WebDriver)
- conexión entre el navegador e internet

## Proxy Entre el Controlador y la Prueba

Si tu empresa tiene un proxy corporativo (por ejemplo, en `http://my.corp.proxy.com:9090`) para todas las solicitudes salientes, sigue los pasos a continuación para instalar y configurar [undici](https://github.com/nodejs/undici).

### Instalar undici

```bash npm2yarn
npm install undici --save-dev
```

### Añadir undici setGlobalDispatcher a tu archivo de configuración

Añade la siguiente declaración require en la parte superior de tu archivo de configuración.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy).toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

Información adicional sobre la configuración del proxy se puede encontrar [aquí](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md).

Si utilizas [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5), inícialo mediante:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## Proxy Entre el Navegador e Internet

Para canalizar la conexión entre el navegador e internet, puedes configurar un proxy que puede ser útil para (por ejemplo) capturar información de red y otros datos con herramientas como [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy).

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