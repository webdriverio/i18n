---
id: docker
title: Docker
---

Docker - це потужна технологія контейнеризації, яка дозволяє інкапсулювати ваш набір тестів у контейнер, що однаково поводиться на будь-якій системі. Це допомагає уникнути нестабільності через різні версії браузера чи платформи. Щоб запустити ваші тести всередині контейнера, створіть файл `Dockerfile` у каталозі вашого проекту, наприклад:

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # Змініть браузер і версію відповідно до ваших потреб
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

Переконайтеся, що ви не включаєте свій `node_modules` у Docker-образ і встановлюєте його під час збірки образу. Для цього додайте файл `.dockerignore` з наступним вмістом:

```
node_modules
```

:::info
Тут ми використовуємо Docker-образ, який поставляється з передвстановленими Selenium і Google Chrome. Доступні різноманітні образи з різними налаштуваннями браузерів та їх версіями. Перегляньте образи, підтримувані проектом Selenium [на Docker Hub](https://hub.docker.com/u/selenium).
:::

Оскільки ми можемо запускати Google Chrome у нашому Docker-контейнері лише в режимі headless, нам потрібно модифікувати наш `wdio.conf.js`, щоб забезпечити це:

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

Як зазначено в [Протоколах автоматизації](/docs/automationProtocols), ви можете запускати WebdriverIO, використовуючи протокол WebDriver або протокол WebDriver BiDi. Переконайтеся, що версія Chrome, встановлена у вашому образі, відповідає версії [Chromedriver](https://www.npmjs.com/package/chromedriver), яку ви визначили у вашому `package.json`.

Щоб зібрати Docker-контейнер, ви можете виконати:

```sh
docker build -t mytest -f Dockerfile .
```

Потім для запуску тестів виконайте:

```sh
docker run -it mytest
```

Для отримання додаткової інформації про налаштування Docker-образу, перегляньте [документацію Docker](https://docs.docker.com/).