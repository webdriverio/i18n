---
id: docker
title: Docker
---

Docker - это мощная технология контейнеризации, которая позволяет инкапсулировать ваш набор тестов в контейнер, который ведет себя одинаково на любой системе. Это может помочь избежать нестабильности из-за различных версий браузера или платформы. Чтобы запустить ваши тесты внутри контейнера, создайте файл `Dockerfile` в каталоге вашего проекта, например:

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # Change the browser and version according to your needs
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

Убедитесь, что вы не включаете папку `node_modules` в ваш Docker-образ, и установите их при сборке образа. Для этого добавьте файл `.dockerignore` со следующим содержимым:

```
node_modules
```

:::info
Здесь мы используем Docker-образ, который поставляется с предустановленными Selenium и Google Chrome. Существует множество доступных образов с различными настройками браузеров и их версиями. Ознакомьтесь с образами, поддерживаемыми проектом Selenium [на Docker Hub](https://hub.docker.com/u/selenium).
:::

Поскольку мы можем запускать Google Chrome только в безголовом режиме в нашем Docker-контейнере, нам необходимо изменить наш `wdio.conf.js`, чтобы обеспечить это:

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

Как упоминалось в [Automation Protocols](/docs/automationProtocols), вы можете запускать WebdriverIO, используя протокол WebDriver или протокол WebDriver BiDi. Убедитесь, что версия Chrome, установленная в вашем образе, соответствует версии [Chromedriver](https://www.npmjs.com/package/chromedriver), которую вы определили в своем `package.json`.

Для сборки Docker-контейнера вы можете выполнить:

```sh
docker build -t mytest -f Dockerfile .
```

Затем для запуска тестов выполните:

```sh
docker run -it mytest
```

Для получения дополнительной информации о настройке Docker-образа ознакомьтесь с [документацией Docker](https://docs.docker.com/).