---
id: debugging
title: Отладка
---

Отладка значительно усложняется, когда несколько процессов запускают десятки тестов в нескольких браузерах.

<iframe width="560" height="315" src="https://www.youtube.com/embed/_bw_VWn5IzU" frameborder="0" allowFullScreen></iframe>

Для начала, крайне полезно ограничить параллелизм, установив `maxInstances` в `1`, и нацеливаться только на те спецификации и браузеры, которые нуждаются в отладке.

В `wdio.conf`:

```js
export const config = {
    // ...
    maxInstances: 1,
    specs: [
        '**/myspec.spec.js'
    ],
    capabilities: [{
        browserName: 'firefox'
    }],
    // ...
}
```

## Команда Debug

Во многих случаях вы можете использовать [`browser.debug()`](/docs/api/browser/debug) для приостановки теста и проверки браузера.

Ваш интерфейс командной строки также переключится в режим REPL. Этот режим позволяет вам экспериментировать с командами и элементами на странице. В режиме REPL вы можете обращаться к объекту `browser` или функциям `$` и `$$`, как в ваших тестах.

При использовании `browser.debug()` вам, вероятно, потребуется увеличить таймаут в тест-раннере, чтобы предотвратить завершение теста из-за превышения времени. Например:

В `wdio.conf`:

```js
jasmineOpts: {
    defaultTimeoutInterval: (24 * 60 * 60 * 1000)
}
```

Смотрите [timeouts](timeouts) для получения дополнительной информации о том, как сделать это с использованием других фреймворков.

Чтобы продолжить тесты после отладки, в оболочке используйте сочетание клавиш `^C` или команду `.exit`.
## Динамическая конфигурация

Обратите внимание, что `wdio.conf.js` может содержать JavaScript. Поскольку вы, вероятно, не хотите навсегда изменить значение таймаута на 1 день, часто бывает полезно изменять эти настройки из командной строки с помощью переменной среды.

Используя этот метод, вы можете динамически изменять конфигурацию:

```js
const debug = process.env.DEBUG
const defaultCapabilities = ...
const defaultTimeoutInterval = ...
const defaultSpecs = ...

export const config = {
    // ...
    maxInstances: debug ? 1 : 100,
    capabilities: debug ? [{ browserName: 'chrome' }] : defaultCapabilities,
    execArgv: debug ? ['--inspect'] : [],
    jasmineOpts: {
      defaultTimeoutInterval: debug ? (24 * 60 * 60 * 1000) : defaultTimeoutInterval
    }
    // ...
}
```

Затем вы можете добавить префикс `debug` к команде `wdio`:

```
$ DEBUG=true npx wdio wdio.conf.js --spec ./tests/e2e/myspec.test.js
```

...и отлаживать свой файл спецификации с помощью DevTools!

## Отладка с Visual Studio Code (VSCode)

Если вы хотите отлаживать свои тесты с точками останова в последней версии VSCode, у вас есть два варианта для запуска отладчика, из которых вариант 1 является самым простым методом:
 1. автоматическое подключение отладчика
 2. подключение отладчика с использованием файла конфигурации

### VSCode Toggle Auto Attach

Вы можете автоматически подключить отладчик, выполнив следующие действия в VSCode:
 - Нажмите CMD + Shift + P (Linux и Macos) или CTRL + Shift + P (Windows)
 - Введите "attach" в поле ввода
 - Выберите "Debug: Toggle Auto Attach"
 - Выберите "Only With Flag"

 Вот и всё! Теперь, когда вы запускаете свои тесты (не забудьте, что вам понадобится флаг --inspect, установленный в вашей конфигурации, как показано ранее), он автоматически запустит отладчик и остановится на первой точке останова, которую он достигнет.

### Файл конфигурации VSCode

Возможно запустить все или выбранные файлы спецификаций. Конфигурации отладки должны быть добавлены в `.vscode/launch.json`. Для отладки выбранной спецификации добавьте следующую конфигурацию:
```
{
    "name": "run select spec",
    "type": "node",
    "request": "launch",
    "args": ["wdio.conf.js", "--spec", "${file}"],
    "cwd": "${workspaceFolder}",
    "autoAttachChildProcesses": true,
    "program": "${workspaceRoot}/node_modules/@wdio/cli/bin/wdio.js",
    "console": "integratedTerminal",
    "skipFiles": [
        "${workspaceFolder}/node_modules/**/*.js",
        "${workspaceFolder}/lib/**/*.js",
        "<node_internals>/**/*.js"
    ]
},
```

Чтобы запустить все файлы спецификаций, удалите `"--spec", "${file}"` из `"args"`

Пример: [.vscode/launch.json](https://github.com/mgrybyk/webdriverio-devtools/blob/master/.vscode/launch.json)

Дополнительная информация: https://code.visualstudio.com/docs/nodejs/nodejs-debugging

## Динамический Repl с Atom

Если вы хакер [Atom](https://atom.io/), вы можете попробовать [`wdio-repl`](https://github.com/kurtharriger/wdio-repl) от [@kurtharriger](https://github.com/kurtharriger), который представляет собой динамический repl, позволяющий выполнять отдельные строки кода в Atom. Посмотрите [это](https://www.youtube.com/watch?v=kdM05ChhLQE) видео на YouTube, чтобы увидеть демонстрацию.

## Отладка с WebStorm / Intellij
Вы можете создать конфигурацию отладки node.js следующим образом:
![Screenshot from 2021-05-29 17-33-33](https://user-images.githubusercontent.com/18728354/120088460-81844c00-c0a5-11eb-916b-50f21c8472a8.png)
Посмотрите это [видео на YouTube](https://www.youtube.com/watch?v=Qcqnmle6Wu8) для получения дополнительной информации о том, как создать конфигурацию.

## Отладка нестабильных тестов

Нестабильные тесты может быть действительно сложно отлаживать, поэтому вот несколько советов о том, как вы можете попытаться воспроизвести локально те нестабильные результаты, которые вы получили в своем CI.

### Сеть
Для отладки нестабильности, связанной с сетью, используйте команду [throttleNetwork](https://webdriver.io/docs/api/browser/throttleNetwork).
```js
await browser.throttleNetwork('Regular3G')
```

### Скорость рендеринга
Для отладки нестабильности, связанной со скоростью устройства, используйте команду [throttleCPU](https://webdriver.io/docs/api/browser/throttleCPU).
Это заставит ваши страницы рендериться медленнее, что может быть вызвано многими факторами, например, запуском нескольких процессов в вашем CI, что может замедлять ваши тесты.
```js
await browser.throttleCPU(4)
```

### Скорость выполнения тестов

Если ваши тесты, кажется, не затронуты, возможно, WebdriverIO быстрее, чем обновления от frontend-фреймворка / браузера. Это происходит при использовании синхронных утверждений, поскольку у WebdriverIO больше нет возможности повторить эти утверждения. Вот некоторые примеры кода, который может сломаться из-за этого:
```js
expect(elementList.length).toEqual(7) // список может быть еще не заполнен на момент утверждения
expect(await elem.getText()).toEqual('this button was clicked 3 times') // текст может быть еще не обновлен на момент утверждения, что приведет к ошибке ("this button was clicked 2 times" не соответствует ожидаемому "this button was clicked 3 times")
expect(await elem.isDisplayed()).toBe(true) // может быть еще не отображен
```
Для решения этой проблемы следует использовать асинхронные утверждения. Приведенные выше примеры будут выглядеть так:
```js
await expect(elementList).toBeElementsArrayOfSize(7)
await expect(elem).toHaveText('this button was clicked 3 times')
await expect(elem).toBeDisplayed()
```
Используя эти утверждения, WebdriverIO будет автоматически ждать, пока условие не совпадет. При утверждении текста это означает, что элемент должен существовать, и текст должен быть равен ожидаемому значению.
Мы подробнее говорим об этом в нашем [Руководстве по лучшим практикам](https://webdriver.io/docs/bestpractices#use-the-built-in-assertions).