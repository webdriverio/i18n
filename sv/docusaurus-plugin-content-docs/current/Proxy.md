---
id: proxy
title: Proxykonfiguration
description: "Dirigera förfrågningar via en proxy, antingen mellan dina tester och drivrutinen eller mellan webbläsaren och internet."
---

Du kan tunnla två olika typer av förfrågningar genom en proxy:

- anslutningen mellan ditt testskript och webbläsardrivrutinen (eller WebDriver-endpointen)
- anslutningen mellan webbläsaren och internet

## Proxy mellan drivrutin och test

Om ditt företag har en företagsproxy (t.ex. på `http://my.corp.proxy.com:9090`) för alla utgående förfrågningar har du två alternativ för att konfigurera WebdriverIO att använda proxyn:

### Alternativ 1: Använda miljövariabler (rekommenderas)

Från och med WebdriverIO v9.12.0 kan du helt enkelt ställa in de vanliga proxymiljövariablerna:

```bash
export HTTP_PROXY=http://my.corp.proxy.com:9090
export HTTPS_PROXY=http://my.corp.proxy.com:9090
# Valfritt: kringgå proxyn för vissa värdar
export NO_PROXY=localhost,127.0.0.1,.internal.domain
```

Kör sedan dina tester som vanligt. WebdriverIO använder automatiskt dessa miljövariabler för proxykonfigurationen.

### Alternativ 2: Använda undicis setGlobalDispatcher

För mer avancerade proxykonfigurationer eller om du behöver programmatisk kontroll kan du använda undicis metod `setGlobalDispatcher`:

#### Installera undici

```bash npm2yarn
npm install undici --save-dev
```

#### Lägg till undicis setGlobalDispatcher i din konfigurationsfil

Lägg till följande require-sats högst upp i din konfigurationsfil.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy || 'http://my.corp.proxy.com:9090').toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

Mer information om hur du konfigurerar proxyn finns [här](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md).

### Vilken metod ska jag använda?

- **Använd miljövariabler** om du vill ha en enkel, standardiserad metod som fungerar i olika verktyg och inte kräver kodändringar.
- **Använd setGlobalDispatcher** om du behöver avancerade proxyfunktioner som anpassad autentisering, olika proxykonfigurationer per miljö, eller vill styra proxybeteendet programmatiskt.

Båda metoderna stöds fullt ut, och WebdriverIO kontrollerar först om det finns en global dispatcher innan miljövariablerna används som reserv.

### Sauce Connect Proxy

Om du använder [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5), starta den med:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## Proxy mellan webbläsare och internet

För att tunnla anslutningen mellan webbläsaren och internet kan du konfigurera en proxy, vilket kan vara användbart för att (till exempel) fånga nätverksinformation och annan data med verktyg som [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy).

Parametrarna för `proxy` kan anges via standard-capabilities på följande sätt:

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

Mer information finns i [WebDriver-specifikationen](https://w3c.github.io/webdriver/#proxy).