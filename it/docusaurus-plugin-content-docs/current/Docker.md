---
id: docker
title: Docker
description: "Esegui la tua suite di test WebdriverIO all'interno di un container Docker con un browser preinstallato per ottenere risultati coerenti su tutte le macchine."
---

Docker è una potente tecnologia di containerizzazione che consente di incapsulare la tua suite di test in un container che si comporta allo stesso modo su ogni sistema. Questo può evitare instabilità dovute a versioni diverse di browser o piattaforme. Per eseguire i tuoi test all'interno di un container, crea un `Dockerfile` nella directory del tuo progetto, ad esempio:

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # Cambia il browser e la versione in base alle tue esigenze
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

Assicurati di non includere i tuoi `node_modules` nell'immagine Docker e di installarli durante la build dell'immagine. Per farlo, aggiungi un file `.dockerignore` con il seguente contenuto:

```
node_modules
```

:::info
Qui stiamo utilizzando un'immagine Docker che include Selenium e Google Chrome preinstallati. Sono disponibili varie immagini con diverse configurazioni e versioni di browser. Dai un'occhiata alle immagini mantenute dal progetto Selenium [su Docker Hub](https://hub.docker.com/u/selenium).
:::

Poiché nel nostro container Docker possiamo eseguire Google Chrome solo in modalità headless, dobbiamo modificare il nostro `wdio.conf.js` per assicurarci di farlo:

```js title="wdio.conf.js"
export const config = {
    // ...
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--no-sandbox',
                '--disable-infobars',
                '--headless',
                '--disable-gpu',
                '--window-size=1440,735'
            ],
        }
    }],
    // ...
}
```

Come indicato in [Protocolli di automazione](/docs/automationProtocols), puoi eseguire WebdriverIO utilizzando il protocollo WebDriver o il protocollo WebDriver BiDi. Assicurati che la versione di Chrome installata nella tua immagine corrisponda alla versione di [Chromedriver](https://www.npmjs.com/package/chromedriver) che hai definito nel tuo `package.json`.

Per effettuare la build del container Docker puoi eseguire:

```sh
docker build -t mytest -f Dockerfile .
```

Quindi, per eseguire i test, esegui:

```sh
docker run -it mytest
```

Per maggiori informazioni su come configurare l'immagine Docker, consulta la [documentazione di Docker](https://docs.docker.com/).

## Immagini in cui WebdriverIO scarica il browser

Quando l'immagine non contiene alcun browser, WebdriverIO scarica autonomamente Chrome, Chromium, Firefox e Chromedriver. Chrome, Chromium e Chromedriver vengono forniti come file zip, e WebdriverIO li estrae con il comando `unzip` su Linux e macOS (`tar.exe` o PowerShell su Windows). Le immagini slim, come `node:24-slim`, e le immagini Alpine minimali non includono `unzip`, quindi installalo nel tuo `Dockerfile`:

```Dockerfile
FROM node:24-slim
RUN apt-get update && apt-get install -y --no-install-recommends unzip && rm -rf /var/lib/apt/lists/*
```

Su Alpine, usa `RUN apk add --no-cache unzip`. Senza di esso, il download fallisce con `Extraction failed: no zip archiver is available`.