---
id: customservices
title: Пользовательские сервисы
description: "Создайте собственный сервис запуска (launcher) или рабочий сервис (worker) для тестраннера WDIO с использованием хуков тестраннера, обрабатывайте ошибки сервиса и публикуйте его в NPM."
---

Вы можете написать собственный сервис для тестраннера WDIO, адаптированный под ваши потребности.

Сервисы — это дополнения, создаваемые для повторно используемой логики, чтобы упростить тесты, управлять набором тестов и интегрировать результаты. Сервисы имеют доступ ко всем тем же [хукам](/docs/configurationfile), которые доступны в `wdio.conf.js`.

Можно определить два типа сервисов: сервис запуска (launcher), который имеет доступ только к хукам `onPrepare`, `onWorkerStart`, `onWorkerEnd` и `onComplete`, выполняемым только один раз за тестовый прогон, и рабочий сервис (worker), который имеет доступ ко всем остальным хукам и выполняется для каждого воркера. Обратите внимание, что вы не можете совместно использовать (глобальные) переменные между этими двумя типами сервисов, поскольку рабочие сервисы выполняются в другом (рабочем) процессе.

Сервис запуска можно определить следующим образом:

```js
export default class CustomLauncherService {
    // Если хук возвращает промис, WebdriverIO будет ждать, пока этот промис не будет выполнен, чтобы продолжить.
    async onPrepare(config, capabilities) {
        // TODO: что-то перед запуском всех воркеров
    }

    onComplete(exitCode, config, capabilities) {
        // TODO: что-то после завершения работы воркеров
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
     * объект browser передаётся сюда впервые
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

Рекомендуется сохранять объект browser через параметр, переданный в конструктор. Наконец, экспортируйте оба типа воркеров следующим образом:

```js
import CustomLauncherService from './launcher'
import CustomWorkerService from './service'

export default CustomWorkerService
export const launcher = CustomLauncherService
```

Если вы используете TypeScript и хотите убедиться, что параметры методов хуков типобезопасны, вы можете определить класс сервиса следующим образом:

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

## Условные рабочие сервисы

Сервис может решать, нужен ли его рабочий код для тестового прогона или для конкретного воркера. Существуют две необязательные проверки:

| Проверка | Где выполняется | Аргументы | Результат возврата `false` |
| --- | --- | --- | --- |
| Именованный экспорт модуля `shouldLoad` | Процесс запуска (launcher), после импорта модуля сервиса | Конфигурация, все настроенные capabilities | Модуль сервиса не импортируется ни в одном воркере. Его сервис запуска по-прежнему выполняется. |
| Статический метод рабочего сервиса `shouldRun` | Рабочий процесс, перед созданием сервиса | Опции сервиса, capabilities данного воркера, конфигурация | Рабочий сервис не создаётся, поэтому ни один из его хуков не выполняется в этом воркере. |

Используйте `shouldLoad(config, capabilities)` для модулей сервисов, настроенных по имени или пути. Это решение на уровне всего пакета: если один и тот же сервис указан несколько раз с разными опциями, результат применяется ко всем этим записям. Например, пользовательский сервис, которому требуются удалённые учётные данные, может экспортировать:

```js
// wdio-custom-service/index.js
import CustomLauncherService from './launcher.js'
import CustomWorkerService from './service.js'

export function shouldLoad(config, capabilities) {
    return Boolean(config.user && config.key)
}

export default CustomWorkerService
export const launcher = CustomLauncherService
```

Используйте `static shouldRun(options, capabilities, config)`, чтобы принимать решение отдельно для каждой записи сервиса и каждого воркера. Это также работает с пользовательскими классами сервисов, переданными напрямую в `services`. Например, этот сервис может ограничить свои хуки настроенным браузером:

```js
// wdio-custom-service/service.js
export default class CustomWorkerService {
    static shouldRun(options, capabilities, config) {
        return !options.browserName || options.browserName === capabilities.browserName
    }

    before(capabilities, specs, browser) {
        // Выполняется только в воркерах, прошедших проверку shouldRun.
    }
}
```

При `services: [['custom', { browserName: 'chrome' }]]` этот рабочий сервис создаётся только для capabilities Chrome, при условии что проверка `shouldLoad` пакета также это разрешает. Воркер должен импортировать модуль сервиса, чтобы вызвать `shouldRun`; возврат `false` из этого метода не предотвращает этот импорт и не влияет на сервис запуска.

Обе проверки могут возвращать булево значение или промис булева значения. WebdriverIO ожидает каждый результат, и только `false` отключает загрузку или создание. Сервисы без этих проверок сохраняют своё прежнее поведение. Уже созданные объекты сервисов, содержащие хуки, остаются без изменений.

Если любая из проверок выбрасывает исключение или промис отклоняется, инициализация сервиса завершается ошибкой с указанием сервиса. Это отличается от ошибок, выбрасываемых хуками сервиса, описанных ниже.

## Обработка ошибок сервиса

Ошибка, выброшенная во время выполнения хука сервиса, будет записана в лог, а раннер продолжит работу. Если хук в вашем сервисе критически важен для настройки или завершения работы тестраннера, можно использовать `SevereServiceError`, экспортируемый из пакета `webdriverio`, чтобы остановить раннер.

```js
import { SevereServiceError } from 'webdriverio'

export default class CustomServiceLauncher {
    async onPrepare(config, capabilities) {
        // TODO: что-то критически важное для настройки перед запуском всех воркеров

        throw new SevereServiceError('Something went wrong.')
    }

    // пользовательские методы сервиса ...
}
```

## Импорт сервиса из модуля

Единственное, что теперь нужно сделать, чтобы использовать этот сервис, — это назначить его свойству `services`.

Измените ваш файл `wdio.conf.js`, чтобы он выглядел так:

```js
import CustomService from './service/my.custom.service'

export const config = {
    // ...
    services: [
        /**
         * использование импортированного класса сервиса
         */
        [CustomService, {
            someOption: true
        }],
        /**
         * использование абсолютного пути к сервису
         */
        ['/path/to/service.js', {
            someOption: true
        }]
    ],
    // ...
}
```

## Публикация сервиса в NPM

Чтобы сообществу WebdriverIO было проще находить и использовать сервисы, пожалуйста, следуйте этим рекомендациям:

* Сервисы должны использовать следующее соглашение об именовании: `wdio-*-service`
* Используйте ключевые слова NPM: `wdio-plugin`, `wdio-service`
* Точка входа `main` должна экспортировать (`export`) экземпляр сервиса
* Пример сервисов: [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)

Следование рекомендуемому шаблону именования позволяет добавлять сервисы по имени:

```js
// Добавление wdio-custom-service
export const config = {
    // ...
    services: ['custom'],
    // ...
}
```

### Добавление опубликованного сервиса в WDIO CLI и документацию

Мы очень ценим каждый новый плагин, который может помочь другим людям запускать более качественные тесты! Если вы создали такой плагин, пожалуйста, рассмотрите возможность добавления его в наш CLI и документацию, чтобы его было проще найти.

Пожалуйста, создайте pull request со следующими изменениями:

- добавьте ваш сервис в список [поддерживаемых сервисов](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L92-L128)) в модуле CLI
- дополните [список сервисов](https://github.com/webdriverio/webdriverio/blob/main/infra/docs/src/3rd-party/services.json), чтобы добавить вашу документацию на официальную страницу Webdriver.io