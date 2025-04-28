---
id: proxy
title: Proxyinställning
---

Du kan tunnla två olika typer av förfrågningar genom en proxy:

- anslutning mellan ditt testskript och webbläsardrivrutinen (eller WebDriver-slutpunkt)
- anslutning mellan webbläsaren och internet

## Proxy mellan drivrutin och test

Om ditt företag har en företagsproxy (t.ex. på `http://my.corp.proxy.com:9090`) för alla utgående förfrågningar, följ stegen nedan för att installera och konfigurera [undici](https://github.com/nodejs/undici).

### Installera undici

```bash npm2yarn
npm install undici --save-dev
```

### Lägg till undici setGlobalDispatcher i din konfigurationsfil

Lägg till följande require-sats högst upp i din konfigurationsfil.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy).toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

Ytterligare information om hur du konfigurerar proxyn finns [här](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md).

Om du använder [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5), starta den via:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## Proxy mellan webbläsare och internet

För att tunnla anslutningen mellan webbläsaren och internet kan du sätta upp en proxy som kan vara användbar för att (till exempel) fånga nätverksinformation och annan data med verktyg som [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy).

`proxy`-parametrarna kan tillämpas via standardfunktionerna på följande sätt:

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

För mer information, se [WebDriver-specifikationen](https://w3c.github.io/webdriver/#proxy).