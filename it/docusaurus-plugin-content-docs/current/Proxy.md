---
id: proxy
title: Configurazione del Proxy
description: "Instrada le richieste attraverso un proxy, sia tra i tuoi test e il driver sia tra il browser e internet."
---

Puoi instradare due diversi tipi di richieste attraverso un proxy:

- la connessione tra il tuo script di test e il driver del browser (o l'endpoint WebDriver)
- la connessione tra il browser e internet

## Proxy tra Driver e Test

Se la tua azienda dispone di un proxy aziendale (ad es. su `http://my.corp.proxy.com:9090`) per tutte le richieste in uscita, hai due opzioni per configurare WebdriverIO affinché utilizzi il proxy:

### Opzione 1: Utilizzo delle Variabili d'Ambiente (Consigliato)

A partire da WebdriverIO v9.12.0, puoi semplicemente impostare le variabili d'ambiente standard per il proxy:

```bash
export HTTP_PROXY=http://my.corp.proxy.com:9090
export HTTPS_PROXY=http://my.corp.proxy.com:9090
# Optional: bypass proxy for certain hosts
export NO_PROXY=localhost,127.0.0.1,.internal.domain
```

Quindi esegui i tuoi test come di consueto. WebdriverIO utilizzerà automaticamente queste variabili d'ambiente per la configurazione del proxy.

### Opzione 2: Utilizzo di setGlobalDispatcher di undici

Per configurazioni del proxy più avanzate o se hai bisogno di un controllo programmatico, puoi utilizzare il metodo `setGlobalDispatcher` di undici:

#### Installare undici

```bash npm2yarn
npm install undici --save-dev
```

#### Aggiungere setGlobalDispatcher di undici al tuo file di configurazione

Aggiungi la seguente istruzione require all'inizio del tuo file di configurazione.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy || 'http://my.corp.proxy.com:9090').toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

Ulteriori informazioni sulla configurazione del proxy sono disponibili [qui](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md).

### Quale Metodo Dovrei Usare?

- **Usa le variabili d'ambiente** se desideri un approccio semplice e standard che funzioni con diversi strumenti e non richieda modifiche al codice.
- **Usa setGlobalDispatcher** se hai bisogno di funzionalità avanzate del proxy come l'autenticazione personalizzata, configurazioni del proxy diverse per ogni ambiente, o se vuoi controllare il comportamento del proxy in modo programmatico.

Entrambi i metodi sono pienamente supportati e WebdriverIO verificherà prima la presenza di un dispatcher globale, per poi ricorrere alle variabili d'ambiente.

### Sauce Connect Proxy

Se utilizzi [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5), avvialo tramite:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## Proxy tra Browser e Internet

Per instradare la connessione tra il browser e internet, puoi configurare un proxy, il che può essere utile (ad esempio) per acquisire informazioni di rete e altri dati con strumenti come [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy).

I parametri del `proxy` possono essere applicati tramite le capabilities standard nel seguente modo:

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

Per maggiori informazioni, consulta la [specifica WebDriver](https://w3c.github.io/webdriver/#proxy).