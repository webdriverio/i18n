---
id: customreporter
title: Пользовательский репортер
description: "Создайте пользовательский репортер для тестраннера WDIO на основе @wdio/reporter, обрабатывайте события раннера и опубликуйте его в NPM."
---

Вы можете написать собственный репортер для тестраннера WDIO, адаптированный под ваши нужды. И это просто!

Всё, что нужно сделать, — это создать node-модуль, который наследуется от пакета `@wdio/reporter`, чтобы он мог получать сообщения от теста.

Базовая структура должна выглядеть так:

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    constructor(options) {
        /*
         * по умолчанию репортер пишет в поток вывода
         */
        options = Object.assign(options, { stdout: true })
        super(options)
    }

    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

Чтобы использовать этот репортер, достаточно указать его в свойстве `reporter` вашей конфигурации.


Ваш файл `wdio.conf.js` должен выглядеть так:

```js
import CustomReporter from './reporter/my.custom.reporter'

export const config = {
    // ...
    reporters: [
        /**
         * использовать импортированный класс репортера
         */
        [CustomReporter, {
            someOption: 'foobar'
        }],
        /**
         * использовать абсолютный путь к репортеру
         */
        ['/path/to/reporter.js', {
            someOption: 'foobar'
        }]
    ],
    // ...
}
```

Вы также можете опубликовать репортер в NPM, чтобы им могли пользоваться все. Назовите пакет по аналогии с другими репортерами — `wdio-<reportername>-reporter` — и добавьте ключевые слова, такие как `wdio` или `wdio-reporter`.

## Обработчики событий

Вы можете зарегистрировать обработчики для ряда событий, возникающих во время тестирования. Все перечисленные ниже обработчики получают данные с полезной информацией о текущем состоянии и ходе выполнения.

Структура этих объектов зависит от события и унифицирована для всех фреймворков (Mocha, Jasmine и Cucumber). Реализовав пользовательский репортер, вы получите решение, которое работает со всеми фреймворками.

Ниже приведён список всех возможных методов, которые можно добавить в класс вашего репортера:

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onRunnerStart() {}
    onBeforeCommand() {}
    onAfterCommand() {}
    onSuiteStart() {}
    onHookStart() {}
    onHookEnd() {}
    onTestStart() {}
    onTestPass() {}
    onTestFail() {}
    onTestSkip() {}
    onTestEnd() {}
    onSuiteEnd() {}
    onRunnerEnd() {}
}
```

Названия методов говорят сами за себя.

Чтобы вывести что-либо при определённом событии, используйте метод `this.write(...)`, предоставляемый родительским классом `WDIOReporter`. Он передаёт содержимое либо в `stdout`, либо в файл лога (в зависимости от опций репортера).

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

Обратите внимание, что вы никак не можете отложить выполнение теста.

Все обработчики событий должны выполнять синхронные операции (иначе вы столкнётесь с состоянием гонки).

Обязательно загляните в [раздел с примерами](https://github.com/webdriverio/webdriverio/tree/main/examples/wdio), где можно найти пример пользовательского репортера, выводящего название каждого события.

Если вы реализовали пользовательский репортер, который может быть полезен сообществу, не стесняйтесь создать Pull Request, чтобы мы могли сделать репортер общедоступным!

Кроме того, если вы запускаете тестраннер WDIO через интерфейс `Launcher`, вы не можете применить пользовательский репортер в виде функции следующим образом:

```js
import Launcher from '@wdio/cli'

import CustomReporter from './reporter/my.custom.reporter'

const launcher = new Launcher('/path/to/config.file.js', {
    // это НЕ сработает, потому что CustomReporter не сериализуем
    reporters: ['dot', CustomReporter]
})
```

## Ожидание `isSynchronised`

Если вашему репортеру необходимо выполнять асинхронные операции для передачи данных (например, загрузку файлов логов или других ресурсов), вы можете переопределить метод `isSynchronised` в своём репортере, чтобы раннер WebdriverIO дождался завершения всех вычислений. Пример можно увидеть в [`@wdio/sumologic-reporter`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sumologic-reporter/src/index.ts):

```js
export default class SumoLogicReporter extends WDIOReporter {
    constructor (options) {
        // ...
        this.unsynced = []
        this.interval = setInterval(::this.sync, this.options.syncInterval)
        // ...
    }

    /**
     * переопределение метода isSynchronised
     */
    get isSynchronised () {
        return this.unsynced.length === 0
    }

    /**
     * синхронизация файлов логов
     */
    sync () {
        // ...
        request({
            method: 'POST',
            uri: this.options.sourceAddress,
            body: logLines
        }, (err, resp) => {
            // ...
            /**
             * удаление переданных логов из буфера логов
             */
            this.unsynced.splice(0, MAX_LINES)
            // ...
        }
    }
}
```

Таким образом раннер будет ждать, пока вся информация из логов не будет загружена.

## Публикация репортера в NPM

Чтобы сообществу WebdriverIO было проще находить и использовать ваш репортер, следуйте этим рекомендациям:

* Сервисы должны использовать следующее соглашение об именовании: `wdio-*-reporter`
* Используйте ключевые слова NPM: `wdio-plugin`, `wdio-reporter`
* Точка входа `main` должна экспортировать (`export`) экземпляр репортера
* Пример репортера: [`@wdio/dot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter)

Соблюдение рекомендуемого шаблона именования позволяет добавлять сервисы по имени:

```js
// Добавление wdio-custom-reporter
export const config = {
    // ...
    reporter: ['custom'],
    // ...
}
```

### Добавление опубликованного сервиса в WDIO CLI и документацию

Мы очень ценим каждый новый плагин, который помогает другим людям писать более качественные тесты! Если вы создали такой плагин, пожалуйста, рассмотрите возможность добавить его в наш CLI и документацию, чтобы его было проще найти.

Создайте pull request со следующими изменениями:

- добавьте ваш сервис в список [поддерживаемых репортеров](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L74-L91)) в модуле CLI
- дополните [список репортеров](https://github.com/webdriverio/webdriverio/blob/main/infra/docs/src/3rd-party/reporters.json), чтобы добавить вашу документацию на официальную страницу Webdriver.io