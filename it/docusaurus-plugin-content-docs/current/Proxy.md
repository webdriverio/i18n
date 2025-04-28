---
id: proxy
title: Configurazione del Proxy
---

Puoi incanalare due diversi tipi di richieste attraverso un proxy:

- connessione tra il tuo script di test e il driver del browser (o endpoint WebDriver)
- connessione tra il browser e internet

## Proxy Tra Driver E Test

Se la tua azienda ha un proxy aziendale (ad esempio su `http://my.corp.proxy.com:9090`) per tutte le richieste in uscita, segui i passaggi seguenti per installare e configurare [undici](https://github.com/nodejs/undici).

### Installa undici

```bash npm2yarn
npm install undici --save-dev
```

### Aggiungi undici setGlobalDispatcher al tuo file di configurazione

Aggiungi la seguente dichiarazione require all'inizio del tuo file di configurazione.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy).toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

Ulteriori informazioni sulla configurazione del proxy possono essere trovate [qui](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md).

Se utilizzi [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5), avvialo tramite:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## Proxy Tra Browser E Internet

Per incanalare la connessione tra il browser e internet, puoi configurare un proxy che può essere utile (ad esempio) per catturare informazioni di rete e altri dati con strumenti come [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy).

I parametri `proxy` possono essere applicati tramite le capacità standard nel seguente modo:

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

Per ulteriori informazioni, consulta la [specifica WebDriver](https://w3c.github.io/webdriver/#proxy).