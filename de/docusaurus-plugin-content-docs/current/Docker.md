---
id: docker
title: Docker
description: "Führen Sie Ihre WebdriverIO-Testsuite in einem Docker-Container mit einem vorinstallierten Browser aus, um auf allen Rechnern konsistente Ergebnisse zu erhalten."
---

Docker ist eine leistungsstarke Containerisierungstechnologie, mit der Sie Ihre Testsuite in einen Container kapseln können, der sich auf jedem System gleich verhält. Dadurch lassen sich instabile Tests aufgrund unterschiedlicher Browser- oder Plattformversionen vermeiden. Um Ihre Tests in einem Container auszuführen, erstellen Sie eine `Dockerfile` in Ihrem Projektverzeichnis, z. B.:

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # Ändern Sie Browser und Version entsprechend Ihren Anforderungen
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

Stellen Sie sicher, dass Sie Ihre `node_modules` nicht in Ihr Docker-Image aufnehmen, sondern diese beim Erstellen des Images installieren lassen. Fügen Sie dazu eine `.dockerignore`-Datei mit folgendem Inhalt hinzu:

```
node_modules
```

:::info
Wir verwenden hier ein Docker-Image, in dem Selenium und Google Chrome bereits vorinstalliert sind. Es stehen verschiedene Images mit unterschiedlichen Browser-Setups und Browserversionen zur Verfügung. Sehen Sie sich die vom Selenium-Projekt gepflegten Images [auf Docker Hub](https://hub.docker.com/u/selenium) an.
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

Wie unter [Automatisierungsprotokolle](/docs/automationProtocols) erwähnt, können Sie WebdriverIO mit dem WebDriver-Protokoll oder dem WebDriver-BiDi-Protokoll ausführen. Stellen Sie sicher, dass die auf Ihrem Image installierte Chrome-Version mit der [Chromedriver](https://www.npmjs.com/package/chromedriver)-Version übereinstimmt, die Sie in Ihrer `package.json` definiert haben.

Um den Docker-Container zu erstellen, können Sie Folgendes ausführen:

```sh
docker build -t mytest -f Dockerfile .
```

Um anschließend die Tests auszuführen, führen Sie Folgendes aus:

```sh
docker run -it mytest
```

Weitere Informationen zur Konfiguration des Docker-Images finden Sie in der [Docker-Dokumentation](https://docs.docker.com/).