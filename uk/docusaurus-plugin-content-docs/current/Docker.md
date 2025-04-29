---
id: docker
title: Docker
---

Docker - це потужна технологія контейнеризації, яка дозволяє інкапсулювати ваш тестовий набір у контейнер, що поводиться однаково на будь-якій системі. Це може допомогти уникнути нестабільності через різні версії браузерів або платформ. Щоб запустити тести в контейнері, створіть файл `Dockerfile` у вашому проектному каталозі, наприклад:

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # Змініть браузер і версію відповідно до ваших потреб
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

Переконайтеся, що ви не включаєте свою папку `node_modules` у Docker-образ, і встановіть ці залежності під час побудови образу. Для цього додайте файл `.dockerignore` з наступним вмістом:

```
node_modules
```

:::info
Ми використовуємо тут Docker-образ, який поставляється з попередньо встановленими Selenium і Google Chrome. Доступні різні образи з різними налаштуваннями браузерів та версіями. Перегляньте образи, що підтримуються проєктом Selenium [на Docker Hub](https://hub.docker.com/u/selenium).
:::

Оскільки ми можемо запускати Google Chrome лише в режимі headless у нашому Docker-контейнері, нам потрібно змінити наш `wdio.conf.js`, щоб забезпечити це:

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

Як згадувалося в [Протоколах автоматизації](/docs/automationProtocols), ви можете запускати WebdriverIO за допомогою протоколу WebDriver або протоколу WebDriver BiDi. Переконайтеся, що версія Chrome, встановлена у вашому образі, відповідає версії [Chromedriver](https://www.npmjs.com/package/chromedriver), визначеній у вашому `package.json`.

Щоб побудувати Docker-контейнер, ви можете виконати:

```sh
docker build -t mytest -f Dockerfile .
```

Потім для запуску тестів виконайте:

```sh
docker run -it mytest
```

Щоб отримати більше інформації про налаштування Docker-образу, перегляньте [документацію Docker](https://docs.docker.com/).