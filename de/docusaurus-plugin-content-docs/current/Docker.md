---
id: docker
title: Docker
description: "Führen Sie Ihre WebdriverIO-Testsuite in einem Docker-Container mit einem vorinstallierten Browser aus, um auf allen Rechnern konsistente Ergebnisse zu erzielen."
---

Docker ist eine leistungsstarke Containerisierungstechnologie, mit der Sie Ihre Testsuite in einem Container kapseln können, der sich auf jedem System gleich verhält. Dadurch lässt sich Instabilität (Flakiness) aufgrund unterschiedlicher Browser- oder Plattformversionen vermeiden. Um Ihre Tests in einem Container auszuführen, erstellen Sie eine `Dockerfile` in Ihrem Projektverzeichnis, z. B.:

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # Change the browser and version according to your needs
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

Stellen Sie sicher, dass Sie Ihre `node_modules` nicht in Ihr Docker-Image aufnehmen, sondern diese beim Erstellen des Images installieren. Fügen Sie dazu eine `.dockerignore`-Datei mit folgendem Inhalt hinzu:

```
node_modules
```

:::info
Wir verwenden hier ein Docker-Image, in dem Selenium und Google Chrome bereits vorinstalliert sind. Es gibt verschiedene Images mit unterschiedlichen Browser-Setups und Browserversionen. Sehen Sie sich die vom Selenium-Projekt gepflegten Images [auf Docker Hub](https://hub.docker.com/u/selenium) an.
:::

Da wir Google Chrome in unserem Docker-Container nur im Headless-Modus ausführen können, müssen wir unsere `wdio.conf.js` anpassen, um dies sicherzustellen:

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

Wie in [Automatisierungsprotokolle](/docs/automationProtocols) erwähnt, können Sie WebdriverIO mit dem WebDriver-Protokoll oder dem WebDriver-BiDi-Protokoll ausführen. Stellen Sie sicher, dass die auf Ihrem Image installierte Chrome-Version mit der [Chromedriver](https://www.npmjs.com/package/chromedriver)-Version übereinstimmt, die Sie in Ihrer `package.json` definiert haben.

Um den Docker-Container zu erstellen, können Sie Folgendes ausführen:

```sh
docker build -t mytest -f Dockerfile .
```

Um anschließend die Tests auszuführen, führen Sie Folgendes aus:

```sh
docker run -it mytest
```

Weitere Informationen zur Konfiguration des Docker-Images finden Sie in der [Docker-Dokumentation](https://docs.docker.com/).

## Images, bei denen WebdriverIO den Browser herunterlädt

Wenn das Image keinen Browser enthält, lädt WebdriverIO Chrome, Chromium, Firefox und Chromedriver selbst herunter. Chrome, Chromium und Chromedriver werden als Zip-Dateien bereitgestellt, und WebdriverIO entpackt sie unter Linux und macOS mit dem Befehl `unzip` (unter Windows mit `tar.exe` oder PowerShell). Schlanke Images wie `node:24-slim` sowie minimale Alpine-Images enthalten kein `unzip`. Installieren Sie es daher in Ihrer `Dockerfile`:

```Dockerfile
FROM node:24-slim
RUN apt-get update && apt-get install -y --no-install-recommends unzip && rm -rf /var/lib/apt/lists/*
```

Verwenden Sie unter Alpine `RUN apk add --no-cache unzip`. Ohne dieses Paket schlägt der Download mit `Extraction failed: no zip archiver is available` fehl.