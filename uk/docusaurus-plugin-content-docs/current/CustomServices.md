---
id: customservices
title: Користувацькі Сервіси
---

Ви можете написати свій власний користувацький сервіс для тест-раннера WDIO, щоб адаптувати його під ваші потреби.

Сервіси - це доповнення, які створені для багаторазової логіки, щоб спростити тести, керувати вашим набором тестів та інтегрувати результати. Сервіси мають доступ до всіх тих самих [хуків](/docs/configurationfile), які доступні в `wdio.conf.js`.

Існує два типи сервісів, які можна визначити: сервіс-запускач, який має доступ лише до хуків `onPrepare`, `onWorkerStart`, `onWorkerEnd` та `onComplete`, які виконуються лише один раз за тестовий запуск, та сервіс-робітник, який має доступ до всіх інших хуків і виконується для кожного робітника. Зауважте, що ви не можете ділитися (глобальними) змінними між обома типами сервісів, оскільки сервіси-робітники виконуються в іншому (робочому) процесі.

Сервіс-запускач можна визначити наступним чином:

```js
export default class CustomLauncherService {
    // If a hook returns a promise, WebdriverIO will wait until that promise is resolved to continue.
    async onPrepare(config, capabilities) {
        // TODO: something before all workers launch
    }

    onComplete(exitCode, config, capabilities) {
        // TODO: something after the workers shutdown
    }

    // custom service methods ...
}
```

У той час як сервіс-робітник повинен виглядати так:

```js
export default class CustomWorkerService {
    /**
     * `serviceOptions` contains all options specific to the service
     * e.g. if defined as follows:
     *
     * ```
     * services: [['custom', { foo: 'bar' }]]
     * ```
     *
     * the `serviceOptions` parameter will be: `{ foo: 'bar' }`
     */
    constructor (serviceOptions, capabilities, config) {
        this.options = serviceOptions
    }

    /**
     * this browser object is passed in here for the first time
     */
    async before(config, capabilities, browser) {
        this.browser = browser

        // TODO: something before all tests are run, e.g.:
        await this.browser.setWindowSize(1024, 768)
    }

    after(exitCode, config, capabilities) {
        // TODO: something after all tests are run
    }

    beforeTest(test, context) {
        // TODO: something before each Mocha/Jasmine test run
    }

    beforeScenario(test, context) {
        // TODO: something before each Cucumber scenario run
    }

    // other hooks or custom service methods ...
}
```

Рекомендується зберігати об'єкт браузера через параметр, який передається в конструктор. Нарешті, представте обидва типи робітників наступним чином:

```js
import CustomLauncherService from './launcher'
import CustomWorkerService from './service'

export default CustomWorkerService
export const launcher = CustomLauncherService
```

Якщо ви використовуєте TypeScript і хочете переконатися, що параметри методів хука типобезпечні, ви можете визначити свій клас сервісу наступним чином:

```ts
import type { Capabilities, Options, Services } from '@wdio/types'

export default class CustomWorkerService implements Services.ServiceInstance {
    constructor (
        private _options: MyServiceOptions,
        private _capabilities: Capabilities.RemoteCapability,
        private _config: WebdriverIO.Config,
    ) {
        // ...
    }

    // ...
}
```

## Обробка помилок сервісу

Помилка, що виникає під час хука сервісу, буде зареєстрована, а раннер продовжить роботу. Якщо хук у вашому сервісі є критичним для налаштування або завершення раннера тесту, можна використовувати `SevereServiceError`, який надається пакетом `webdriverio`, щоб зупинити раннер.

```js
import { SevereServiceError } from 'webdriverio'

export default class CustomServiceLauncher {
    async onPrepare(config, capabilities) {
        // TODO: something critical for setup before all workers launch

        throw new SevereServiceError('Something went wrong.')
    }

    // custom service methods ...
}
```

## Імпорт сервісу з модуля

Єдине, що потрібно зробити зараз для використання цього сервісу, це призначити його властивості `services`.

Змініть свій файл `wdio.conf.js`, щоб він виглядав так:

```js
import CustomService from './service/my.custom.service'

export const config = {
    // ...
    services: [
        /**
         * use imported service class
         */
        [CustomService, {
            someOption: true
        }],
        /**
         * use absolute path to service
         */
        ['/path/to/service.js', {
            someOption: true
        }]
    ],
    // ...
}
```

## Публікація сервісу на NPM

Щоб зробити сервіси легшими для використання та відкриття спільнотою WebdriverIO, дотримуйтеся цих рекомендацій:

* Сервіси повинні використовувати таку конвенцію найменування: `wdio-*-service`
* Використовуйте ключові слова NPM: `wdio-plugin`, `wdio-service`
* Основний запис `main` повинен `export` екземпляр сервісу
* Приклади сервісів: [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)

Дотримання рекомендованого шаблону найменування дозволяє додавати сервіси за назвою:

```js
// Add wdio-custom-service
export const config = {
    // ...
    services: ['custom'],
    // ...
}
```

### Додавання опублікованого сервісу до CLI WDIO та документації

Ми дуже цінуємо кожен новий плагін, який може допомогти іншим людям запускати кращі тести! Якщо ви створили такий плагін, будь ласка, розгляньте можливість додати його до нашого CLI та документації, щоб його було легше знайти.

Будь ласка, створіть пул-реквест з наступними змінами:

- додайте ваш сервіс до списку [підтримуваних сервісів](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L92-L128)) у модулі CLI
- розширте [список сервісів](https://github.com/webdriverio/webdriverio/blob/main/scripts/docs-generation/3rd-party/services.json) для додавання вашої документації на офіційну сторінку Webdriver.io