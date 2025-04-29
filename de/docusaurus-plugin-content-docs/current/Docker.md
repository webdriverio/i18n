---
id: docker
title: Docker
---

Docker ist eine leistungsstarke Containerisierungstechnologie, die es ermöglicht, Ihre Testsuite in einen Container zu kapseln, der sich auf jedem System gleich verhält. Dies kann Instabilitäten aufgrund unterschiedlicher Browser- oder Plattformversionen vermeiden. Um Ihre Tests in einem Container auszuführen, erstellen Sie eine `Dockerfile` in Ihrem Projektverzeichnis, z.B.:

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # Ändern Sie den Browser und die Version entsprechend Ihren Anforderungen
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

Stellen Sie sicher, dass Sie Ihre `node_modules` nicht in Ihr Docker-Image einbeziehen und diese beim Erstellen des Images installieren. Fügen Sie dazu eine `.dockerignore`-Datei mit folgendem Inhalt hinzu:

```
node_modules
```

:::info
Wir verwenden hier ein Docker-Image, das mit Selenium und Google Chrome vorinstalliert ist. Es sind verschiedene Images mit unterschiedlichen Browser-Setups und Browser-Versionen verfügbar. Schauen Sie sich die vom Selenium-Projekt verwalteten Images [auf Docker Hub](https://hub.docker.com/u/selenium) an.
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

Wie in [Automation Protocols](/docs/automationProtocols) erwähnt, können Sie WebdriverIO mit dem WebDriver-Protokoll oder dem WebDriver BiDi-Protokoll ausführen. Stellen Sie sicher, dass die auf Ihrem Image installierte Chrome-Version mit der [Chromedriver](https://www.npmjs.com/package/chromedriver)-Version übereinstimmt, die Sie in Ihrer `package.json` definiert haben.

Um den Docker-Container zu erstellen, können Sie Folgendes ausführen:

```sh
docker build -t mytest -f Dockerfile .
```

Um die Tests auszuführen, führen Sie Folgendes aus:

```sh
docker run -it mytest
```

Weitere Informationen zur Konfiguration des Docker-Images finden Sie in der [Docker-Dokumentation](https://docs.docker.com/).