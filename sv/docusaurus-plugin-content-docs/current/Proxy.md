---
id: proxy
title: Proxyinställningar
---

Du kan tunnla två olika typer av förfrågningar genom en proxy:

- anslutning mellan ditt testskript och webbläsardrivrutinen (eller WebDriver-slutpunkt)
- anslutning mellan webbläsaren och internet

## Proxy mellan drivrutin och test

Om ditt företag har en företagsproxy (t.ex. på `http://my.corp.proxy.com:9090`) för alla utgående förfrågningar, har du två alternativ för att konfigurera WebdriverIO att använda proxyn:

### Alternativ 1: Använda miljövariabler (Rekommenderas)

Från och med WebdriverIO v9.12.0 kan du helt enkelt ange de standardiserade proxy-miljövariablerna:

```bash
export HTTP_PROXY=http://my.corp.proxy.com:9090
export HTTPS_PROXY=http://my.corp.proxy.com:9090
# Valfritt: kringgå proxy för vissa värdar
export NO_PROXY=localhost,127.0.0.1,.internal.domain
```

Kör sedan dina tester som vanligt. WebdriverIO kommer automatiskt att använda dessa miljövariabler för proxykonfiguration.

### Alternativ 2: Använda undici's setGlobalDispatcher

För mer avancerade proxykonfigurationer eller om du behöver programmatisk kontroll kan du använda undici's `setGlobalDispatcher`-metod:

#### Installera undici

```bash npm2yarn
npm install undici --save-dev
```

#### Lägg till undici setGlobalDispatcher i din konfigurationsfil

Lägg till följande require-sats överst i din konfigurationsfil.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy || 'http://my.corp.proxy.com:9090').toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

Ytterligare information om konfigurering av proxyn finns [här](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md).

### Vilken metod bör jag använda?

- **Använd miljövariabler** om du vill ha ett enkelt, standardiserat tillvägagångssätt som fungerar över olika verktyg och inte kräver kodändringar.
- **Använd setGlobalDispatcher** om du behöver avancerade proxyfunktioner som anpassad autentisering, olika proxykonfigurationer per miljö, eller vill programmatiskt kontrollera proxybeteende.

Båda metoderna stöds fullt ut och WebdriverIO kommer att kontrollera efter en global dispatcher först innan den faller tillbaka till miljövariabler.

### Sauce Connect Proxy

Om du använder [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5), starta den via:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## Proxy mellan webbläsare och internet

För att tunnla anslutningen mellan webbläsaren och internet kan du ställa in en proxy som kan vara användbar för att (till exempel) fånga nätverksinformation och andra data med verktyg som [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy).

`proxy`-parametrarna kan tillämpas via standardkapaciteterna på följande sätt:

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