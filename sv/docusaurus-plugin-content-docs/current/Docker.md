---
id: docker
title: Docker
description: "Kör din WebdriverIO-testsvit i en Docker-container med en förinstallerad webbläsare för konsekventa resultat på olika maskiner."
---

Docker är en kraftfull containeriseringsteknik som gör det möjligt att kapsla in din testsvit i en container som beter sig likadant på alla system. Detta kan undvika instabilitet på grund av olika webbläsar- eller plattformsversioner. För att köra dina tester i en container, skapa en `Dockerfile` i din projektkatalog, t.ex.:

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # Ändra webbläsare och version efter dina behov
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

Se till att du inte inkluderar dina `node_modules` i din Docker-image och att de istället installeras när imagen byggs. Lägg till en `.dockerignore`-fil med följande innehåll för detta:

```
node_modules
```

:::info
Vi använder här en Docker-image som levereras med Selenium och Google Chrome förinstallerade. Det finns olika images tillgängliga med olika webbläsaruppsättningar och webbläsarversioner. Kolla in de images som underhålls av Selenium-projektet [på Docker Hub](https://hub.docker.com/u/selenium).
:::

Eftersom vi endast kan köra Google Chrome i headless-läge i vår Docker-container måste vi ändra vår `wdio.conf.js` för att säkerställa att vi gör det:

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

Som nämnts i [Automation Protocols](/docs/automationProtocols) kan du köra WebdriverIO med WebDriver-protokollet eller WebDriver BiDi-protokollet. Se till att Chrome-versionen som är installerad i din image matchar den [Chromedriver](https://www.npmjs.com/package/chromedriver)-version som du har definierat i din `package.json`.

För att bygga Docker-containern kan du köra:

```sh
docker build -t mytest -f Dockerfile .
```

För att sedan köra testerna, kör:

```sh
docker run -it mytest
```

För mer information om hur du konfigurerar Docker-imagen, kolla in [Docker-dokumentationen](https://docs.docker.com/).