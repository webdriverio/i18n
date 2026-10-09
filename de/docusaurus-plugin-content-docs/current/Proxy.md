---
id: proxy
title: Proxy-Einrichtung
description: "Leiten Sie Anfragen über einen Proxy, entweder zwischen Ihren Tests und dem Treiber oder zwischen dem Browser und dem Internet."
---

Sie können zwei verschiedene Arten von Anfragen über einen Proxy tunneln:

- Verbindung zwischen Ihrem Testskript und dem Browser-Treiber (oder WebDriver-Endpunkt)
- Verbindung zwischen dem Browser und dem Internet

## Proxy zwischen Treiber und Test

Wenn Ihr Unternehmen einen Unternehmens-Proxy (z. B. unter `http://my.corp.proxy.com:9090`) für alle ausgehenden Anfragen verwendet, haben Sie zwei Möglichkeiten, WebdriverIO für die Nutzung des Proxys zu konfigurieren:

### Option 1: Verwendung von Umgebungsvariablen (empfohlen)

Ab WebdriverIO v9.12.0 können Sie einfach die standardmäßigen Proxy-Umgebungsvariablen setzen:

```bash
export HTTP_PROXY=http://my.corp.proxy.com:9090
export HTTPS_PROXY=http://my.corp.proxy.com:9090
# Optional: Proxy für bestimmte Hosts umgehen
export NO_PROXY=localhost,127.0.0.1,.internal.domain
```

Führen Sie Ihre Tests dann wie gewohnt aus. WebdriverIO verwendet diese Umgebungsvariablen automatisch für die Proxy-Konfiguration.

### Option 2: Verwendung von undicis setGlobalDispatcher

Für fortgeschrittenere Proxy-Konfigurationen oder wenn Sie programmatische Kontrolle benötigen, können Sie die Methode `setGlobalDispatcher` von undici verwenden:

#### undici installieren

```bash npm2yarn
npm install undici --save-dev
```

#### undici setGlobalDispatcher zu Ihrer Konfigurationsdatei hinzufügen

Fügen Sie die folgende require-Anweisung am Anfang Ihrer Konfigurationsdatei hinzu.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy || 'http://my.corp.proxy.com:9090').toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

Weitere Informationen zur Konfiguration des Proxys finden Sie [hier](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md).

### Welche Methode sollte ich verwenden?

- **Verwenden Sie Umgebungsvariablen**, wenn Sie einen einfachen, standardisierten Ansatz wünschen, der mit verschiedenen Tools funktioniert und keine Codeänderungen erfordert.
- **Verwenden Sie setGlobalDispatcher**, wenn Sie erweiterte Proxy-Funktionen wie benutzerdefinierte Authentifizierung oder unterschiedliche Proxy-Konfigurationen pro Umgebung benötigen oder das Proxy-Verhalten programmatisch steuern möchten.

Beide Methoden werden vollständig unterstützt, und WebdriverIO prüft zuerst, ob ein globaler Dispatcher vorhanden ist, bevor es auf Umgebungsvariablen zurückgreift.

### Sauce Connect Proxy

Wenn Sie [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5) verwenden, starten Sie ihn über:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## Proxy zwischen Browser und Internet

Um die Verbindung zwischen dem Browser und dem Internet zu tunneln, können Sie einen Proxy einrichten. Dies kann nützlich sein, um (zum Beispiel) Netzwerkinformationen und andere Daten mit Tools wie [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy) zu erfassen.

Die `proxy`-Parameter können über die Standard-Capabilities auf folgende Weise angewendet werden:

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