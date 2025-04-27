---
id: customservices
title: Пользовательские сервисы
---

Вы можете написать свой собственный пользовательский сервис для тест-раннера WDIO, чтобы настроить его под свои потребности.

Сервисы — это дополнения, созданные для многократно используемой логики, упрощающей тесты, управления вашим набором тестов и интеграции результатов. Сервисы имеют доступ ко всем тем же [хукам](/docs/configurationfile), доступным в `wdio.conf.js`.

Существует два типа сервисов, которые можно определить: сервис запуска, который имеет доступ только к хукам `onPrepare`, `onWorkerStart`, `onWorkerEnd` и `onComplete`, выполняемым только один раз за тестовый запуск, и рабочий сервис, который имеет доступ ко всем остальным хукам и выполняется для каждого рабочего процесса. Обратите внимание, что вы не можете совместно использовать (глобальные) переменные между обоими типами сервисов, так как рабочие сервисы выполняются в другом (рабочем) процессе.

Сервис запуска можно определить следующим образом:

```js
export default class CustomLauncherService {
    // Если хук возвращает обещание, WebdriverIO будет ждать, пока это обещание не будет разрешено, чтобы продолжить.
    async onPrepare(config, capabilities) {
        // TODO: что-то перед запуском всех рабочих процессов
    }

    onComplete(exitCode, config, capabilities) {
        // TODO: что-то после завершения работы рабочих процессов
    }

    // пользовательские методы сервиса ...
}
```

В то время как рабочий сервис должен выглядеть так:

```js
export default class CustomWorkerService {
    /**
     * `serviceOptions` содержит все опции, специфичные для сервиса
     * например, если определено следующим образом:
     *
     * ```
     * services: [['custom', { foo: 'bar' }]]
     * ```
     *
     * параметр `serviceOptions` будет: `{ foo: 'bar' }`
     */
    constructor (serviceOptions, capabilities, config) {
        this.options = serviceOptions
    }

    /**
     * этот объект браузера передается сюда в первый раз
     */
    async before(config, capabilities, browser) {
        this.browser = browser

        // TODO: что-то перед запуском всех тестов, например:
        await this.browser.setWindowSize(1024, 768)
    }

    after(exitCode, config, capabilities) {
        // TODO: что-то после выполнения всех тестов
    }

    beforeTest(test, context) {
        // TODO: что-то перед каждым запуском теста Mocha/Jasmine
    }

    beforeScenario(test, context) {
        // TODO: что-то перед каждым запуском сценария Cucumber
    }

    // другие хуки или пользовательские методы сервиса ...
}
```

Рекомендуется сохранять объект браузера через переданный параметр в конструкторе. Наконец, экспортируйте оба типа сервисов следующим образом:

```js
import CustomLauncherService from './launcher'
import CustomWorkerService from './service'

export default CustomWorkerService
export const launcher = CustomLauncherService
```

Если вы используете TypeScript и хотите убедиться, что параметры методов хуков типобезопасны, вы можете определить свой класс сервиса следующим образом:

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

## Обработка ошибок сервиса

Ошибка, возникшая во время хука сервиса, будет записана в журнал, в то время как раннер продолжит работу. Если хук в вашем сервисе критически важен для настройки или завершения работы тест-раннера, можно использовать `SevereServiceError`, экспортируемый из пакета `webdriverio`, чтобы остановить раннер.

```js
import { SevereServiceError } from 'webdriverio'

export default class CustomServiceLauncher {
    async onPrepare(config, capabilities) {
        // TODO: что-то критически важное для настройки перед запуском всех рабочих процессов

        throw new SevereServiceError('Что-то пошло не так.')
    }

    // пользовательские методы сервиса ...
}
```

## Импорт сервиса из модуля

Единственное, что нужно сделать теперь, чтобы использовать этот сервис, — назначить его свойству `services`.

Измените файл `wdio.conf.js` так:

```js
import CustomService from './service/my.custom.service'

export const config = {
    // ...
    services: [
        /**
         * использовать импортированный класс сервиса
         */
        [CustomService, {
            someOption: true
        }],
        /**
         * использовать абсолютный путь к сервису
         */
        ['/path/to/service.js', {
            someOption: true
        }]
    ],
    // ...
}
```

## Публикация сервиса в NPM

Чтобы сделать сервисы более удобными для использования и обнаружения сообществом WebdriverIO, следуйте этим рекомендациям:

* Сервисы должны использовать следующее соглашение об именовании: `wdio-*-service`
* Используйте ключевые слова NPM: `wdio-plugin`, `wdio-service`
* Основная запись должна `export` экземпляр сервиса
* Примеры сервисов: [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)

Следование рекомендуемому шаблону именования позволяет добавлять сервисы по имени:

```js
// Добавить wdio-custom-service
export const config = {
    // ...
    services: ['custom'],
    // ...
}
```

### Добавление опубликованного сервиса в WDIO CLI и документацию

Мы очень ценим каждый новый плагин, который может помочь другим людям запускать лучшие тесты! Если вы создали такой плагин, пожалуйста, рассмотрите возможность добавления его в наш CLI и документацию, чтобы его было легче найти.

Пожалуйста, создайте pull request со следующими изменениями:

- добавьте ваш сервис в список [поддерживаемых сервисов](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L92-L128)) в модуле CLI
- дополните [список сервисов](https://github.com/webdriverio/webdriverio/blob/main/scripts/docs-generation/3rd-party/services.json) для добавления вашей документации на официальную страницу Webdriver.io