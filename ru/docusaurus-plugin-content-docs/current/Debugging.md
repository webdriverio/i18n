---
id: debugging
title: Отладка
description: "Отладка тестов WebdriverIO с помощью browser.debug, точек останова в VS Code или WebStorm, стратегии для нестабильных тестов, а также профилирование CPU и кучи."
---

Отладка значительно усложняется, когда несколько процессов запускают десятки тестов в нескольких браузерах.

<iframe width="560" height="315" src="https://www.youtube.com/embed/_bw_VWn5IzU" frameborder="0" allowFullScreen></iframe>

Для начала крайне полезно ограничить параллелизм, установив `maxInstances` в `1`, и выбрать только те спецификации и браузеры, которые необходимо отладить.

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

Во многих случаях вы можете использовать [`browser.debug()`](/docs/api/browser/debug), чтобы приостановить тест и исследовать браузер.

Ваш интерфейс командной строки также переключится в режим REPL. Этот режим позволяет экспериментировать с командами и элементами на странице. В режиме REPL вы можете обращаться к объекту `browser`&mdash;или функциям `$` и `$$`&mdash;так же, как в своих тестах.

При использовании `browser.debug()` вам, скорее всего, потребуется увеличить таймаут тест-раннера, чтобы он не завершил тест с ошибкой из-за слишком долгого выполнения. Например:

В `wdio.conf`:

```js
jasmineOpts: {
    defaultTimeoutInterval: (24 * 60 * 60 * 1000)
}
```

Подробнее о том, как сделать это в других фреймворках, см. в разделе [таймауты](timeouts).

Чтобы продолжить выполнение тестов после отладки, используйте в оболочке сочетание клавиш `^C` или команду `.exit`.

### Пауза для агента-программиста (`--debug=agent`)

`wdio run --debug=agent` увеличивает таймаут фреймворка до 24 часов и приостанавливает воркер, когда спецификация вызывает `await browser.debug()` или когда тест завершается с ошибкой. При запуске выводится строка вида:

```text
Paused in cart.e2e.ts › adds a blue t-shirt. Inspect with `wdio session -s debug-0-0 snapshot`, continue with `wdio session -s debug-0-0 resume`.
```

Исследуйте приостановленный браузер с помощью [`wdio session`](/docs/session/debug) (`snapshot`, `exec`, …), затем выполните `wdio session -s debug-0-0 resume`, чтобы продолжить. `wdio session -s debug-0-0 close` завершает приостановленный тест с ошибкой `Session closed from wdio session`. Имя сессии — `debug-<cid>` (`debug-0-0` для первого воркера). Остальная часть этого рабочего процесса описана в разделе [WebdriverIO Session](/docs/session).
## Динамическая конфигурация

Обратите внимание, что `wdio.conf.js` может содержать Javascript. Поскольку вы, вероятно, не хотите навсегда менять значение таймаута на 1 день, часто бывает полезно изменять эти настройки из командной строки с помощью переменной окружения.

Используя этот приём, вы можете динамически изменять конфигурацию:

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

Затем вы можете добавить флаг `debug` перед командой `wdio`:

```
$ DEBUG=true npx wdio wdio.conf.js --spec ./tests/e2e/myspec.test.js
```

...и отлаживать файл спецификации с помощью DevTools!

## Отладка в Visual Studio Code (VSCode)

Если вы хотите отлаживать тесты с точками останова в последней версии VSCode, у вас есть два варианта запуска отладчика, из которых вариант 1 — самый простой:
 1. автоматическое подключение отладчика
 2. подключение отладчика с помощью файла конфигурации

### Автоподключение в VSCode (Toggle Auto Attach)

Вы можете автоматически подключить отладчик, выполнив следующие шаги в VSCode:
 - Нажмите CMD + Shift + P (Linux и Macos) или CTRL + Shift + P (Windows)
 - Введите "attach" в поле ввода
 - Выберите "Debug: Toggle Auto Attach"
 - Выберите "Only With Flag"

 Вот и всё! Теперь при запуске тестов (помните, что в конфигурации должен быть установлен флаг --inspect, как показано ранее) отладчик будет запускаться автоматически и останавливаться на первой достигнутой точке останова.

### Файл конфигурации VSCode

Можно запускать все или выбранные файлы спецификаций. Конфигурации отладки необходимо добавить в `.vscode/launch.json`; для отладки выбранной спецификации добавьте следующую конфигурацию:
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

## Динамический REPL в Atom

Если вы пользуетесь [Atom](https://atom.io/), можете попробовать [`wdio-repl`](https://github.com/kurtharriger/wdio-repl) от [@kurtharriger](https://github.com/kurtharriger) — динамический REPL, позволяющий выполнять отдельные строки кода в Atom. Посмотрите [это](https://www.youtube.com/watch?v=kdM05ChhLQE) видео на YouTube, чтобы увидеть демонстрацию.

## Отладка в WebStorm / Intellij
Вы можете создать конфигурацию отладки node.js следующим образом:
![Screenshot from 2021-05-29 17-33-33](https://user-images.githubusercontent.com/18728354/120088460-81844c00-c0a5-11eb-916b-50f21c8472a8.png)
Посмотрите это [видео на YouTube](https://www.youtube.com/watch?v=Qcqnmle6Wu8), чтобы узнать больше о том, как создать конфигурацию.

## Отладка нестабильных тестов

Нестабильные (flaky) тесты бывает очень трудно отлаживать, поэтому вот несколько советов, как попытаться воспроизвести локально нестабильный результат, полученный в CI.

### Сеть
Для отладки нестабильности, связанной с сетью, используйте команду [throttleNetwork](https://webdriver.io/docs/api/browser/throttleNetwork).
```js
await browser.throttleNetwork('Regular3G')
```

### Скорость рендеринга
Для отладки нестабильности, связанной со скоростью устройства, используйте команду [throttleCPU](https://webdriver.io/docs/api/browser/throttleCPU).
Это заставит ваши страницы рендериться медленнее, что может быть вызвано многими причинами, например запуском нескольких процессов в CI, которые могут замедлять ваши тесты.
```js
await browser.throttleCPU(4)
```

### Скорость выполнения тестов

Если на ваши тесты это, по-видимому, не влияет, возможно, WebdriverIO работает быстрее, чем происходит обновление со стороны фронтенд-фреймворка / браузера. Это случается при использовании синхронных утверждений, поскольку у WebdriverIO больше нет возможности повторять такие утверждения. Несколько примеров кода, который может сломаться из-за этого:
```js
expect(elementList.length).toEqual(7) // список может быть ещё не заполнен на момент проверки
expect(await elem.getText()).toEqual('this button was clicked 3 times') // текст может быть ещё не обновлён на момент проверки, что приведёт к ошибке ("this button was clicked 2 times" не совпадает с ожидаемым "this button was clicked 3 times")
expect(await elem.isDisplayed()).toBe(true) // элемент может быть ещё не отображён
```
Чтобы решить эту проблему, следует использовать асинхронные утверждения. Приведённые выше примеры будут выглядеть так:
```js
await expect(elementList).toBeElementsArrayOfSize(7)
await expect(elem).toHaveText('this button was clicked 3 times')
await expect(elem).toBeDisplayed()
```
При использовании этих утверждений WebdriverIO будет автоматически ждать, пока условие не выполнится. При проверке текста это означает, что элемент должен существовать, а текст должен совпадать с ожидаемым значением.
Подробнее об этом мы рассказываем в нашем [руководстве по лучшим практикам](https://webdriver.io/docs/bestpractices#use-the-built-in-assertions).

## Профилирование производительности

WebdriverIO позволяет записывать профили производительности ваших тестов, чтобы выявлять узкие места при выполнении тестов или утечки памяти. Для этого используются встроенные возможности профилирования Node.js.

### Профилирование CPU

Чтобы записать профиль CPU, используйте флаг CLI `--cpu-prof` или установите `cpuProf: true` в конфигурации.

```bash
npx wdio run wdio.conf.js --cpu-prof
```

В результате для каждого процесса-воркера в директории `./profiles` (по умолчанию) будет создан файл `.cpuprofile`. Вы можете загрузить этот файл в **Chrome DevTools > Performance > Load Profile**, чтобы проанализировать выполнение.

### Профилирование кучи

Чтобы записать профиль кучи, используйте флаг CLI `--heap-prof` или установите `heapProf: true` в конфигурации.

```bash
npx wdio run wdio.conf.js --heap-prof
```

В результате в директории `./profiles` будет создан файл `.heapprofile` (используется сэмплирующий профилировщик кучи). Вы можете загрузить его в **Chrome DevTools > Memory > Load**, чтобы проанализировать использование памяти.

### Метрики времени

Когда профилирование включено, WebdriverIO также автоматически выводит в лог метрики времени для фаз подготовки, выполнения и завершения теста, помогая понять, на что тратится время.

```
📊 Performance Metrics:
────────────────────────────────────────
  Setup:     1.25s
  Execution: 3.42s
  Teardown:  0.15s
```