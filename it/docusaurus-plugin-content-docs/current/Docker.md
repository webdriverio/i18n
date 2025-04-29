---
id: docker
title: Docker
---

Docker è una potente tecnologia di containerizzazione che permette di incapsulare la tua suite di test in un container che si comporta allo stesso modo su ogni sistema. Questo può evitare instabilità dovute a diverse versioni di browser o piattaforme. Per eseguire i tuoi test all'interno di un container, crea un file `Dockerfile` nella directory del tuo progetto, ad esempio:

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # Modifica il browser e la versione in base alle tue esigenze
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

Assicurati di non includere la tua cartella `node_modules` nell'immagine Docker e di avere questi moduli installati durante la creazione dell'immagine. Per fare ciò aggiungi un file `.dockerignore` con il seguente contenuto:

```
node_modules
```

:::info
Qui stiamo utilizzando un'immagine Docker che include Selenium e Google Chrome preinstallati. Sono disponibili diverse immagini con diverse configurazioni di browser e versioni. Dai un'occhiata alle immagini gestite dal progetto Selenium [su Docker Hub](https://hub.docker.com/u/selenium).
:::

Poiché possiamo eseguire Google Chrome solo in modalità headless nel nostro container Docker, dobbiamo modificare il nostro `wdio.conf.js` per assicurarci di farlo:

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

Come menzionato in [Automation Protocols](/docs/automationProtocols) puoi eseguire WebdriverIO utilizzando il protocollo WebDriver o il protocollo WebDriver BiDi. Assicurati che la versione di Chrome installata sulla tua immagine corrisponda alla versione di [Chromedriver](https://www.npmjs.com/package/chromedriver) che hai definito nel tuo `package.json`.

Per costruire il container Docker puoi eseguire:

```sh
docker build -t mytest -f Dockerfile .
```

Quindi, per eseguire i test, esegui:

```sh
docker run -it mytest
```

Per maggiori informazioni su come configurare l'immagine Docker, consulta la [documentazione di Docker](https://docs.docker.com/).