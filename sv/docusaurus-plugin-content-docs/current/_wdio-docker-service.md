---
id: wdio-docker-service
title: Docker Tjänst
custom_edit_url: https://github.com/stsvilik/wdio-docker-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-docker-service är ett tredjepartspaket, för mer information se [GitHub](https://github.com/stsvilik/wdio-docker-service) | [npm](https://www.npmjs.com/package/wdio-docker-service)

Denna tjänst är avsedd att användas med [WebdriverIO](http://webdriver.io/) och hjälper till att köra funktionella/integrationstester 
mot/med containeriserade applikationer. Den använder den populära [Docker](https://www.docker.com/) tjänsten (installeras separat) för att köra containrar.

## Varför använda den?
Idealt skulle dina tester köras i någon form av CI/CD-pipeline där det ofta inte finns några "riktiga" webbläsare och andra resurser
som din applikation är beroende av. Med Docker kan praktiskt taget alla nödvändiga applikationsberoenden containeriseras.
Med denna tjänst kan du köra din applikationscontainer eller en [docker-selenium](https://github.com/SeleniumHQ/docker-selenium) i din CI och i fullständig isolering 
(förutsatt att CI kan ha Docker installerat som ett beroende). Samma kan gälla för lokal utveckling om din applikation behöver ha en nivå
av isolering från ditt huvudsakliga operativsystem.

## Hur det fungerar
Tjänsten kommer att köra en befintlig docker-image och när den är redo, kommer den att initiera WebdriverIO-tester som ska köras mot din containeriserade applikation.

## Installation

Kör:

```bash
npm install wdio-docker-service --save-dev
```

Instruktioner om hur man installerar WebdriverIO finns [här](https://webdriver.io/docs/gettingstarted).

## Konfiguration
Som standard är Google Chrome, Firefox och PhantomJS tillgängliga när de är installerade på värdsystemet. 
För att använda tjänsten behöver du lägga till `docker` i din service-array:

```javascript
// wdio.conf.js
exports.config = {
   // ...
   services: ['docker'],
   // ...
};
```

## Alternativ

### dockerOptions
Olika alternativ som krävs för att köra docker-container

Typ: `Object`

Standard: `{ 
    options: {
        rm: true
    }
}`

Exempel:

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
Docker-containerns namntagg. Kan vara lokal eller från Docker HUB.

Typ: `String`

Krävs: `true`

### dockerOptions.healthCheck
Konfiguration som kontrollerar dina containrars beredskap innan tester initieras. Normalt skulle detta vara en localhost-url.
Om healthCheck inte är konfigurerad, kommer Webdriver att börja köra tester omedelbart efter att Docker-containern startar, vilket
kan vara för tidigt med tanke på att det tar tid för en webbtjänst att starta inne i en Docker-container.

Typ: `String|Object`

Alternativ för objektanvändning:
- *url* - url till en app som körs inuti din container
- *maxRetries* - antal försök tills hälsokontrollen misslyckas. Standard: 10
- *inspectInterval* - intervall mellan varje försök i ms. Standard: 500
- *startDelay* - initial fördröjning för att påbörja hälsokontrollen i ms. Standard: 0

Exempel 1 (Sträng): `healthCheck: 'http://localhost:4444'`

Exempel 2 (Objekt):

```javascript
healthCheck: {
    url: 'http://localhost:4444',
    maxRetries: 3,
    inspectInterval: 1000,
    startDelay: 2000
}
```

### dockerOptions.options
Karta över alternativ som används av kommandot `docker run`. För mer information om kommandot `run`, klicka [här](https://docs.docker.com/edge/engine/reference/commandline/run/).

Alla alternativ med en bokstav kommer att konverteras till `-[alternativ]` (d.v.s. `d: true` -> `-d`). 

Alla alternativ med två tecken eller fler kommer
att konverteras till `--[alternativ]` (d.v.s. `rm: true` -> `--rm`). 

För alternativ som kan användas mer än en gång 
(d.v.s. `-e`,`-add-host`, `--expose`, etc.), använd array-notation (d.v.s. `e: ["NODE_ENV=development", "FOO=bar"]`).

Typ: `Object`

Exempel:

```javascript
options: {
    e: ['NODE_ENV=development', 'PROXY=http://myproxy:80']
    p: ['4444:4444', '5900:5900'],
    shmSize: '2g'
}
```

### dockerOptions.args
Alla argument du vill skicka in i containern. Motsvarar `[ARG...]` i Docker run CLI.

Typ: `String`

### dockerOptions.command
Alla kommandon du vill skicka in i containern. Motsvarar `[COMMAND]` i Docker run CLI.

Typ: `String`

### onDockerReady
En callback-metod som anropas när Docker-applikationen är redo. Beredskap bestäms av möjligheten att pinga `healthCheck`-url.

Typ: `Function`

### dockerLogs
Sökväg till var loggar från docker-containern ska lagras

Typ: `String`

## Testningsfall / Recept
Besök vår [Wiki](https://github.com/stsvilik/wdio-docker-service/wiki) för mer information.