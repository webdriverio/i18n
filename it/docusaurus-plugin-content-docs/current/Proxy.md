---
id: proxy
title: Configurazione del Proxy
description: "Instrada le richieste attraverso un proxy, tra i tuoi test e il driver oppure tra il browser e internet."
---

Puoi instradare due diversi tipi di richieste attraverso un proxy:

- connessione tra il tuo script di test e il driver del browser (o l'endpoint WebDriver)
- connessione tra il browser e internet

## Proxy tra Driver e Test

Se la tua azienda dispone di un proxy aziendale (ad es. su `http://my.corp.proxy.com:9090`) per tutte le richieste in uscita, hai due opzioni per configurare WebdriverIO affinché utilizzi il proxy:

### Opzione 1: Utilizzo delle Variabili d'Ambiente (Consigliato)

A partire da WebdriverIO v9.12.0, puoi semplicemente impostare le variabili d'ambiente standard per il proxy:

```bash
export HTTP_PROXY=http://my.corp.proxy.com:9090
export HTTPS_PROXY=http://my.corp.proxy.com:9090
# Opzionale: ignora il proxy per determinati host
export NO_PROXY=localhost,127.0.0.1,.internal.domain
```

Quindi esegui i tuoi test come al solito. WebdriverIO utilizzerà automaticamente queste variabili d'ambiente per la configurazione del proxy.

### Opzione 2: Utilizzo di setGlobalDispatcher di undici

Per configurazioni del proxy più avanzate o se hai bisogno di un controllo programmatico, puoi utilizzare il metodo `setGlobalDispatcher` di undici:

#### Installa undici

```bash npm2yarn
npm install undici --save-dev
```

#### Aggiungi setGlobalDispatcher di undici al tuo file di configurazione

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

### Quale Metodo Dovrei Utilizzare?

- **Usa le variabili d'ambiente** se desideri un approccio semplice e standard che funzioni con diversi strumenti e non richieda modifiche al codice.
- **Usa setGlobalDispatcher** se hai bisogno di funzionalità proxy avanzate come autenticazione personalizzata, configurazioni proxy diverse per ogni ambiente, o se vuoi controllare il comportamento del proxy in modo programmatico.

Entrambi i metodi sono pienamente supportati e WebdriverIO verificherà prima la presenza di un dispatcher globale prima di ricorrere alle variabili d'ambiente.

### Sauce Connect Proxy

Se utilizzi [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5), avvialo tramite:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## Proxy per il Download di Browser e Driver

WebdriverIO scarica il browser e il driver di cui ha bisogno quando non sono ancora installati.

- I download di **Geckodriver ed Edgedriver** utilizzano `HTTPS_PROXY`, `HTTP_PROXY` e `NO_PROXY`. Un dispatcher impostato con `setGlobalDispatcher` ha la precedenza su queste variabili.
- I download di **Chrome, Chromium, Firefox e Chromedriver** utilizzano `HTTPS_PROXY`, `HTTP_PROXY` e `NO_PROXY` solo quando una di queste condizioni è vera:
  - il pacchetto `proxy-agent` è installato nel tuo progetto:

    ```bash
    npm install --save-dev proxy-agent
    ```

  - Node.js viene eseguito con il suo supporto proxy integrato:

    ```bash
    NODE_USE_ENV_PROXY=1 npx wdio run ./wdio.conf.ts
    ```

  WebdriverIO non installa `proxy-agent` al posto tuo, perché il suo albero delle dipendenze presenta avvisi di sicurezza senza una correzione disponibile. Quando una variabile proxy è impostata e nessuna delle due opzioni è attiva, WebdriverIO registra un avviso prima del primo download.

## Proxy tra Browser e Internet

Per instradare la connessione tra il browser e internet, puoi configurare un proxy, il che può essere utile (ad esempio) per acquisire informazioni di rete e altri dati con strumenti come [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy).

I parametri `proxy` possono essere applicati tramite le capability standard nel seguente modo:

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