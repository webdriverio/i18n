---
id: wdio-docker-service
title: Servizio Docker
custom_edit_url: https://github.com/stsvilik/wdio-docker-service/edit/master/README.md
---


> wdio-docker-service è un pacchetto di terze parti, per maggiori informazioni consultare [GitHub](https://github.com/stsvilik/wdio-docker-service) | [npm](https://www.npmjs.com/package/wdio-docker-service)

Questo servizio è destinato all'uso con [WebdriverIO](http://webdriver.io/) e aiuta a eseguire test funzionali/integrativi contro/usando applicazioni containerizzate. Utilizza il popolare servizio [Docker](https://www.docker.com/) (installato separatamente) per eseguire container.

## Perché usarlo?
Idealmente i tuoi test verrebbero eseguiti in una varietà di pipeline CI/CD dove spesso non ci sono browser "reali" e altre risorse da cui dipende la tua applicazione. Con l'avvento di Docker praticamente tutte le dipendenze necessarie dell'applicazione possono essere containerizzate. Con questo servizio puoi eseguire il container della tua applicazione o un [docker-selenium](https://github.com/SeleniumHQ/docker-selenium) nel tuo CI e in completo isolamento (presumendo che CI possa avere Docker installato come dipendenza). Lo stesso può applicarsi allo sviluppo locale se la tua applicazione ha bisogno di avere un livello di isolamento dal tuo sistema operativo principale.

## Come funziona
Il servizio eseguirà un'immagine docker esistente e una volta pronta, inizierà i test WebdriverIO che dovrebbero essere eseguiti contro la tua applicazione containerizzata.

## Installazione

Esegui:

```bash
npm install wdio-docker-service --save-dev
```

Le istruzioni su come installare WebdriverIO si trovano [qui](https://webdriver.io/docs/gettingstarted).

## Configurazione
Per impostazione predefinita, Google Chrome, Firefox e PhantomJS sono disponibili quando installati sul sistema host.
Per utilizzare il servizio devi aggiungere `docker` al tuo array di servizi:

```javascript
// wdio.conf.js
exports.config = {
   // ...
   services: ['docker'],
   // ...
};
```

## Opzioni

### dockerOptions
Varie opzioni necessarie per eseguire il container docker

Tipo: `Object`

Default: `{ 
    options: {
        rm: true
    }
}`

Esempio:

```javascript
dockerOptions: {
    image: 'selenium/standalone-chrome',
    healthCheck: 'http://localhost:4444',
    options: {
        p: ['4444:4444'],
        shmSize: '2g'
    }
}
```

### dockerOptions.image
Tag del nome del container Docker. Potrebbe essere locale o da Docker HUB.

Tipo: `String`

Richiesto: `true`

### dockerOptions.healthCheck
Configurazione che verifica che i tuoi container siano pronti prima di iniziare i test. Normalmente questo sarebbe un url localhost.
Se healthCheck non è configurato, Webdriver inizierà a eseguire i test immediatamente dopo l'avvio del container Docker, il che
potrebbe essere troppo presto considerando che ci vuole tempo affinché il servizio web si avvii all'interno di un container Docker.

Tipo: `String|Object`

Opzioni per l'uso dell'oggetto:
- *url* - url di un'app in esecuzione all'interno del tuo container
- *maxRetries* - numero di tentativi fino a quando l'healthcheck fallisce. Default: 10
- *inspectInterval* - intervallo tra ogni tentativo in ms. Default: 500
- *startDelay* - ritardo iniziale per iniziare l'healthcheck in ms. Default: 0

Esempio 1 (String): `healthCheck: 'http://localhost:4444'`

Esempio 2 (Object):

```javascript
healthCheck: {
    url: 'http://localhost:4444',
    maxRetries: 3,
    inspectInterval: 1000,
    startDelay: 2000
}
```

### dockerOptions.options
Mappa delle opzioni utilizzate dal comando `docker run`. Per ulteriori dettagli sul comando `run` clicca [qui](https://docs.docker.com/edge/engine/reference/commandline/run/).

Qualsiasi opzione a lettera singola sarà convertita in `-[option]` (es. `d: true` -> `-d`).

Qualsiasi opzione di due o più caratteri sarà convertita in `--[option]` (es. `rm: true` -> `--rm`).

Per le opzioni che possono essere utilizzate più di una volta (es. `-e`, `-add-host`, `--expose`, ecc.), utilizzare la notazione array (es. `e: ["NODE_ENV=development", "FOO=bar"]`).

Tipo: `Object`

Esempio:

```javascript
options: {
    e: ['NODE_ENV=development', 'PROXY=http://myproxy:80']
    p: ['4444:4444', '5900:5900'],
    shmSize: '2g'
}
```

### dockerOptions.args
Qualsiasi argomento che potresti voler passare al container. Corrisponde a `[ARG...]` nel CLI di Docker run.

Tipo: `String`

### dockerOptions.command
Qualsiasi comando che potresti voler passare al container. Corrisponde a `[COMMAND]` nel CLI di Docker run.

Tipo: `String`

### onDockerReady
Un metodo di callback che viene chiamato quando l'applicazione Docker è pronta. La prontezza è determinata dalla capacità di eseguire un ping all'url `healthCheck`.

Tipo: `Function`

### dockerLogs
Percorso dove dovrebbero essere memorizzati i log dal container docker

Tipo: `String`

## Casi d'uso di test / Ricette
Visita la nostra [Wiki](https://github.com/stsvilik/wdio-docker-service/wiki) per maggiori dettagli.