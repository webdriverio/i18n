---
id: debugging
title: Відлагодження
---

Відлагодження значно ускладнюється, коли кілька процесів запускають десятки тестів у багатьох браузерах.

<iframe width="560" height="315" src="https://www.youtube.com/embed/_bw_VWn5IzU" frameborder="0" allowFullScreen></iframe>

Для початку, надзвичайно корисно обмежити паралелізм, встановивши `maxInstances` на `1`, і націлюватися лише на ті специфікації та браузери, які потрібно відлагоджувати.

У `wdio.conf`:

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

У багатьох випадках ви можете використовувати [`browser.debug()`](/docs/api/browser/debug), щоб призупинити тест і перевірити браузер.

Інтерфейс командного рядка також перейде в режим REPL. Цей режим дозволяє експериментувати з командами та елементами на сторінці. У режимі REPL ви можете отримати доступ до об'єкта `browser`&mdash;або функцій `$` та `$$`&mdash;так само, як у тестах.

При використанні `browser.debug()` вам, ймовірно, знадобиться збільшити час очікування тест-ранера, щоб запобігти провалу тесту через занадто довге виконання. Наприклад:

У `wdio.conf`:

```js
jasmineOpts: {
    defaultTimeoutInterval: (24 * 60 * 60 * 1000)
}
```

Перегляньте [timeouts](timeouts) для отримання додаткової інформації про те, як це зробити з використанням інших фреймворків.

Щоб продовжити тести після відлагодження, у командній оболонці використовуйте комбінацію клавіш `^C` або команду `.exit`.
## Динамічна конфігурація

Зауважте, що `wdio.conf.js` може містити JavaScript. Оскільки ви, ймовірно, не хочете постійно змінювати значення таймауту на 1 день, часто буває корисно змінювати ці налаштування з командного рядка, використовуючи змінну середовища.

Використовуючи цю техніку, ви можете динамічно змінювати конфігурацію:

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

Потім ви можете додати префікс `debug` до команди `wdio`:

```
$ DEBUG=true npx wdio wdio.conf.js --spec ./tests/e2e/myspec.test.js
```

...і відлагоджувати файл специфікації за допомогою DevTools!

## Відлагодження з Visual Studio Code (VSCode)

Якщо ви хочете відлагоджувати свої тести з точками зупинки в останній версії VSCode, у вас є два варіанти запуску відладчика, з яких варіант 1 є найпростішим методом:
 1. автоматичне приєднання відладчика
 2. приєднання відладчика за допомогою файлу конфігурації

### VSCode Toggle Auto Attach

Ви можете автоматично приєднати відладчик, виконавши ці кроки у VSCode:
 - Натисніть CMD + Shift + P (Linux та MacOS) або CTRL + Shift + P (Windows)
 - Введіть "attach" у поле вводу
 - Виберіть "Debug: Toggle Auto Attach"
 - Виберіть "Only With Flag"

 Це все! Тепер, коли ви запускаєте свої тести (пам'ятайте, що вам потрібно встановити прапор --inspect у вашій конфігурації, як показано раніше), він автоматично запустить відладчик і зупиниться на першій точці зупинки, яку він досягне.

### Файл конфігурації VSCode

Можливо запускати всі або вибрані файли специфікацій. Конфігурацію(ї) відлагодження потрібно додати до `.vscode/launch.json`, щоб відлагоджувати обрану специфікацію, додайте наступну конфігурацію:
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

Щоб запустити всі файли специфікацій, видаліть `"--spec", "${file}"` з `"args"`

Приклад: [.vscode/launch.json](https://github.com/mgrybyk/webdriverio-devtools/blob/master/.vscode/launch.json)

Додаткова інформація: https://code.visualstudio.com/docs/nodejs/nodejs-debugging

## Динамічний Repl з Atom

Якщо ви користуєтесь [Atom](https://atom.io/), ви можете спробувати [`wdio-repl`](https://github.com/kurtharriger/wdio-repl) від [@kurtharriger](https://github.com/kurtharriger), який є динамічним repl, що дозволяє виконувати окремі рядки коду в Atom. Перегляньте [це](https://www.youtube.com/watch?v=kdM05ChhLQE) відео на YouTube, щоб побачити демонстрацію.

## Відлагодження з WebStorm / Intellij
Ви можете створити конфігурацію відлагодження node.js ось так:
![Screenshot from 2021-05-29 17-33-33](https://user-images.githubusercontent.com/18728354/120088460-81844c00-c0a5-11eb-916b-50f21c8472a8.png)
Перегляньте це [відео на YouTube](https://www.youtube.com/watch?v=Qcqnmle6Wu8) для отримання додаткової інформації про те, як створити конфігурацію.

## Відлагодження нестабільних тестів

Нестабільні тести може бути справді важко відлагодити, тому ось кілька порад, як ви можете спробувати відтворити локально ті нестабільні результати, які ви отримали у вашому CI.

### Мережа
Для відлагодження нестабільності, пов'язаної з мережею, використовуйте команду [throttleNetwork](https://webdriver.io/docs/api/browser/throttleNetwork).
```js
await browser.throttleNetwork('Regular3G')
```

### Швидкість рендерингу
Для відлагодження нестабільності, пов'язаної зі швидкістю пристрою, використовуйте команду [throttleCPU](https://webdriver.io/docs/api/browser/throttleCPU).
Це призведе до повільнішого рендерингу ваших сторінок, що може бути спричинено багатьма факторами, наприклад, запуском кількох процесів у вашому CI, що може уповільнювати ваші тести.
```js
await browser.throttleCPU(4)
```

### Швидкість виконання тестів

Якщо ваші тести не здаються ураженими, можливо, WebdriverIO швидший за оновлення з фронтенд-фреймворка / браузера. Це відбувається при використанні синхронних тверджень, оскільки WebdriverIO не має можливості повторно перевірити ці твердження. Деякі приклади коду, який може зламатися через це:
```js
expect(elementList.length).toEqual(7) // список може не бути заповнений на момент твердження
expect(await elem.getText()).toEqual('this button was clicked 3 times') // текст може ще не оновитися на момент твердження, що призведе до помилки ("this button was clicked 2 times" не відповідає очікуваному "this button was clicked 3 times")
expect(await elem.isDisplayed()).toBe(true) // може ще не відображатися
```
Для вирішення цієї проблеми слід використовувати асинхронні твердження. Наведені вище приклади будуть виглядати так:
```js
await expect(elementList).toBeElementsArrayOfSize(7)
await expect(elem).toHaveText('this button was clicked 3 times')
await expect(elem).toBeDisplayed()
```
Використовуючи ці твердження, WebdriverIO автоматично чекатиме, поки умова не співпаде. При перевірці тексту це означає, що елемент повинен існувати і текст повинен бути рівним очікуваному значенню.
Ми більше говоримо про це в нашому [Посібнику з найкращих практик](https://webdriver.io/docs/bestpractices#use-the-built-in-assertions).