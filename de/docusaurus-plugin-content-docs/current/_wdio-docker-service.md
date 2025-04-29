---
id: wdio-docker-service
title: Docker Service
custom_edit_url: https://github.com/stsvilik/wdio-docker-service/edit/master/README.md
---


> wdio-docker-service ist ein Paket von Drittanbietern, weitere Informationen finden Sie auf [GitHub](https://github.com/stsvilik/wdio-docker-service) | [npm](https://www.npmjs.com/package/wdio-docker-service)

Dieser Service ist für die Verwendung mit [WebdriverIO](http://webdriver.io/) gedacht und hilft bei der Durchführung von Funktions-/Integrationstests 
gegen/mit containerisierten Anwendungen. Er verwendet den beliebten [Docker](https://www.docker.com/)-Service (separat installiert), um Container auszuführen.

## Warum sollte man ihn verwenden?
Idealerweise würden Ihre Tests in einer Art CI/CD-Pipeline laufen, wo es oft keine "echten" Browser und andere Ressourcen gibt,
von denen Ihre Anwendung abhängt. Mit dem Aufkommen von Docker können praktisch alle notwendigen Anwendungsabhängigkeiten containerisiert werden.
Mit diesem Service können Sie Ihren Anwendungscontainer oder [docker-selenium](https://github.com/SeleniumHQ/docker-selenium) in Ihrer CI-Umgebung und in vollständiger Isolation ausführen
(vorausgesetzt, CI kann Docker als Abhängigkeit installiert haben). Dasselbe kann für die lokale Entwicklung gelten, wenn Ihre Anwendung ein gewisses Maß
an Isolation von Ihrem Haupt-Betriebssystem benötigt.

## Wie es funktioniert
Der Service führt ein vorhandenes Docker-Image aus und sobald es bereit ist, werden WebdriverIO-Tests gestartet, die gegen Ihre containerisierte Anwendung laufen sollten.

## Installation

Führen Sie aus:

```bash
npm install wdio-docker-service --save-dev
```

Anweisungen zur Installation von WebdriverIO finden Sie [hier](https://webdriver.io/docs/gettingstarted).

## Konfiguration
Standardmäßig sind Google Chrome, Firefox und PhantomJS verfügbar, wenn sie auf dem Host-System installiert sind.
Um den Service zu nutzen, müssen Sie `docker` zu Ihrem Service-Array hinzufügen:

```javascript
// wdio.conf.js
exports.config = {
   // ...
   services: ['docker'],
   // ...
};
```

## Optionen

### dockerOptions
Verschiedene Optionen, die zum Ausführen des Docker-Containers erforderlich sind

Typ: `Object`

Standard: `{ 
    options: {
        rm: true
    }
}`

Beispiel:

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
Docker-Container-Name-Tag. Kann lokal oder aus Docker HUB sein.

Typ: `String`

Erforderlich: `true`

### dockerOptions.healthCheck
Konfiguration, die die Bereitschaft Ihrer Container überprüft, bevor Tests gestartet werden. Normalerweise wäre dies eine localhost-URL.
Wenn healthCheck nicht konfiguriert ist, beginnt Webdriver sofort nach dem Start des Docker-Containers mit der Ausführung von Tests, was
möglicherweise zu früh ist, da es Zeit braucht, bis ein Webdienst in einem Docker-Container startet.

Typ: `String|Object`

Optionen für die Objektverwendung:
- *url* - URL zu einer Anwendung, die in Ihrem Container läuft
- *maxRetries* - Anzahl der Wiederholungen bis zum Fehlschlag der Gesundheitsprüfung. Standard: 10
- *inspectInterval* - Intervall zwischen den einzelnen Wiederholungen in ms. Standard: 500
- *startDelay* - Anfangsverzögerung bis zum Beginn der Gesundheitsprüfung in ms. Standard: 0

Beispiel 1 (String): `healthCheck: 'http://localhost:4444'`

Beispiel 2 (Object):

```javascript
healthCheck: {
    url: 'http://localhost:4444',
    maxRetries: 3,
    inspectInterval: 1000,
    startDelay: 2000
}
```

### dockerOptions.options
Zuordnung von Optionen, die vom Befehl `docker run` verwendet werden. Weitere Details zum Befehl `run` finden Sie [hier](https://docs.docker.com/edge/engine/reference/commandline/run/).

Jede einbuchstabige Option wird in `-[option]` umgewandelt (z.B. `d: true` -> `-d`).

Jede Option mit zwei oder mehr Zeichen wird
in `--[option]` umgewandelt (z.B. `rm: true` -> `--rm`).

Für Optionen, die mehrmals verwendet werden können
(z.B. `-e`,`-add-host`, `--expose` usw.), verwenden Sie bitte die Array-Notation (z.B. `e: ["NODE_ENV=development", "FOO=bar"]`).

Typ: `Object`

Beispiel:

```javascript
options: {
    e: ['NODE_ENV=development', 'PROXY=http://myproxy:80']
    p: ['4444:4444', '5900:5900'],
    shmSize: '2g'
}
```

### dockerOptions.args
Alle Argumente, die Sie in den Container übergeben möchten. Entspricht `[ARG...]` in der Docker-Run-CLI.

Typ: `String`

### dockerOptions.command
Jeder Befehl, den Sie in den Container übergeben möchten. Entspricht `[COMMAND]` in der Docker-Run-CLI.

Typ: `String`

### onDockerReady
Eine Callback-Methode, die aufgerufen wird, wenn die Docker-Anwendung bereit ist. Die Bereitschaft wird durch die Fähigkeit bestimmt, die `healthCheck`-URL anzupingen.

Typ: `Function`

### dockerLogs
Pfad, unter dem Logs aus dem Docker-Container gespeichert werden sollen

Typ: `String`

## Anwendungsfälle / Rezepte für Tests
Bitte besuchen Sie unser [Wiki](https://github.com/stsvilik/wdio-docker-service/wiki) für weitere Details.