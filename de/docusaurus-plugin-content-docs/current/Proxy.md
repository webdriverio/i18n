---
id: proxy
title: Proxy-Einrichtung
---

Sie können zwei verschiedene Arten von Anfragen durch einen Proxy tunneln:

- Verbindung zwischen Ihrem Testskript und dem Browser-Treiber (oder WebDriver-Endpunkt)
- Verbindung zwischen dem Browser und dem Internet

## Proxy zwischen Treiber und Test

Wenn Ihr Unternehmen einen Unternehmens-Proxy (z.B. auf `http://my.corp.proxy.com:9090`) für alle ausgehenden Anfragen hat, folgen Sie den unten stehenden Schritten, um [undici](https://github.com/nodejs/undici) zu installieren und zu konfigurieren.

### Undici installieren

```bash npm2yarn
npm install undici --save-dev
```

### Fügen Sie undici setGlobalDispatcher zu Ihrer Konfigurationsdatei hinzu

Fügen Sie die folgende require-Anweisung am Anfang Ihrer Konfigurationsdatei hinzu.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy).toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

Weitere Informationen zur Konfiguration des Proxys finden Sie [hier](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md).

Wenn Sie [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5) verwenden, starten Sie ihn über:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## Proxy zwischen Browser und Internet

Um die Verbindung zwischen dem Browser und dem Internet zu tunneln, können Sie einen Proxy einrichten, der nützlich sein kann, um (zum Beispiel) Netzwerkinformationen und andere Daten mit Tools wie [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy) zu erfassen.

Die `proxy`-Parameter können über die Standardfähigkeiten auf folgende Weise angewendet werden:

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

Weitere Informationen finden Sie in der [WebDriver-Spezifikation](https://w3c.github.io/webdriver/#proxy).