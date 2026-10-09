---
id: docker
title: Docker
description: "Запускайте набор тестов WebdriverIO внутри Docker-контейнера с предустановленным браузером, чтобы получать одинаковые результаты на разных машинах."
---

Docker — это мощная технология контейнеризации, которая позволяет упаковать ваш набор тестов в контейнер, работающий одинаково на любой системе. Это помогает избежать нестабильности тестов, вызванной различиями в версиях браузеров или платформ. Чтобы запускать тесты внутри контейнера, создайте `Dockerfile` в директории вашего проекта, например:

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # Измените браузер и версию в соответствии с вашими потребностями
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

Убедитесь, что вы не включаете `node_modules` в Docker-образ, а устанавливаете зависимости во время сборки образа. Для этого добавьте файл `.dockerignore` со следующим содержимым:

```
node_modules
```

:::info
Здесь мы используем Docker-образ, в котором уже предустановлены Selenium и Google Chrome. Существуют различные образы с разными конфигурациями и версиями браузеров. Ознакомьтесь с образами, поддерживаемыми проектом Selenium, [на Docker Hub](https://hub.docker.com/u/selenium).
:::

Поскольку в нашем Docker-контейнере Google Chrome можно запускать только в headless-режиме, необходимо изменить `wdio.conf.js`, чтобы обеспечить это:

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

Как упоминалось в разделе [Протоколы автоматизации](/docs/automationProtocols), вы можете запускать WebdriverIO, используя протокол WebDriver или протокол WebDriver BiDi. Убедитесь, что версия Chrome, установленная в вашем образе, соответствует версии [Chromedriver](https://www.npmjs.com/package/chromedriver), указанной в вашем `package.json`.

Чтобы собрать Docker-контейнер, выполните:

```sh
docker build -t mytest -f Dockerfile .
```

Затем, чтобы запустить тесты, выполните:

```sh
docker run -it mytest
```

Дополнительную информацию о настройке Docker-образа можно найти в [документации Docker](https://docs.docker.com/).