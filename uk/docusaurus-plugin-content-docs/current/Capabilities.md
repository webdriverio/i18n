---
id: capabilities
title: Можливості
---

Можливість - це визначення для віддаленого інтерфейсу. Воно допомагає WebdriverIO зрозуміти, в якому браузері чи мобільному середовищі ви хочете запускати свої тести. Можливості менш важливі при розробці тестів локально, оскільки ви зазвичай запускаєте їх на одному віддаленому інтерфейсі, але стають більш важливими при запуску великого набору інтеграційних тестів у CI/CD.

:::info

Формат об'єкта можливостей чітко визначений [специфікацією WebDriver](https://w3c.github.io/webdriver/#capabilities). Тестовий запускач WebdriverIO завершиться з помилкою, якщо визначені користувачем можливості не відповідають цій специфікації.

:::

## Користувацькі можливості

Хоча кількість фіксованих визначених можливостей дуже мала, кожен може надавати та приймати користувацькі можливості, специфічні для драйвера автоматизації або віддаленого інтерфейсу:

### Розширення можливостей для конкретних браузерів

- `goog:chromeOptions`: розширення [Chromedriver](https://chromedriver.chromium.org/capabilities), застосовне лише для тестування в Chrome
- `moz:firefoxOptions`: розширення [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html), застосовне лише для тестування в Firefox
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) для вказівки середовища при використанні EdgeDriver для тестування Chromium Edge

### Розширення можливостей хмарних постачальників

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- та багато інших...

### Розширення можливостей двигуна автоматизації

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- та багато інших...

### Можливості WebdriverIO для керування опціями драйверів браузерів

WebdriverIO керує встановленням та запуском драйверів браузера за вас. WebdriverIO використовує спеціальну можливість, яка дозволяє передавати параметри драйверу.

#### `wdio:chromedriverOptions`

Спеціальні опції, які передаються в Chromedriver при його запуску.

#### `wdio:geckodriverOptions`

Спеціальні опції, які передаються в Geckodriver при його запуску.

#### `wdio:edgedriverOptions`

Спеціальні опції, які передаються в Edgedriver при його запуску.

#### `wdio:safaridriverOptions`

Спеціальні опції, які передаються в Safari при його запуску.

#### `wdio:maxInstances`

Максимальна кількість паралельно працюючих робочих процесів для конкретного браузера/можливості. Має пріоритет над [maxInstances](#configuration#maxInstances) та [maxInstancesPerCapability](configuration/#maxinstancespercapability).

Тип: `number`

#### `wdio:specs`

Визначає специфікації для виконання тестів для цього браузера/можливості. Аналогічно [звичайній опції конфігурації `specs`](configuration#specs), але специфічно для браузера/можливості. Має пріоритет над `specs`.

Тип: `(String | String[])[]`

#### `wdio:exclude`

Виключає специфікації з виконання тестів для цього браузера/можливості. Аналогічно [звичайній опції конфігурації `exclude`](configuration#exclude), але специфічно для браузера/можливості. Має пріоритет над `exclude`.

Тип: `String[]`

#### `wdio:enforceWebDriverClassic`

За замовчуванням WebdriverIO намагається встановити сесію WebDriver Bidi. Якщо ви цього не бажаєте, ви можете встановити цей прапорець, щоб вимкнути цю поведінку.

Тип: `boolean`

#### Загальні опції драйвера

Хоча всі драйвери пропонують різні параметри для конфігурації, є деякі загальні, які WebdriverIO розуміє і використовує для налаштування вашого драйвера або браузера:

##### `cacheDir`

Шлях до кореня каталогу кешу. Цей каталог використовується для зберігання всіх драйверів, які завантажуються при спробі запустити сесію.

Тип: `string`<br />
За замовчуванням: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

Шлях до користувацького бінарного файлу драйвера. Якщо вказано, WebdriverIO не намагатиметься завантажити драйвер, а використовуватиме той, що вказаний за цим шляхом. Переконайтеся, що драйвер сумісний з браузером, який ви використовуєте.

Ви можете вказати цей шлях через змінні середовища `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` або `EDGEDRIVER_PATH`.

Тип: `string`

:::caution

Якщо встановлено `binary` драйвера, WebdriverIO не намагатиметься завантажити драйвер, а використовуватиме той, що вказаний за цим шляхом. Переконайтеся, що драйвер сумісний з браузером, який ви використовуєте.

:::

#### Опції драйвера для конкретних браузерів

Щоб передати опції драйверу, ви можете використовувати такі користувацькі можливості:

- Chrome або Chromium: `wdio:chromedriverOptions`
- Firefox: `wdio:geckodriverOptions`
- Microsoft Edge: `wdio:edgedriverOptions`
- Safari: `wdio:safaridriverOptions`

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'wdio:chromedriverOptions', value: 'chrome'},
    {label: 'wdio:geckodriverOptions', value: 'firefox'},
    {label: 'wdio:edgedriverOptions', value: 'msedge'},
    {label: 'wdio:safaridriverOptions', value: 'safari'},
  ]
}>
<TabItem value="chrome">

##### adbPort
Порт, на якому повинен працювати драйвер ADB.

Приклад: `9515`

Тип: `number`

##### urlBase
Базовий префікс URL-шляху для команд, наприклад `wd/url`.

Приклад: `/`

Тип: `string`

##### logPath
Записує журнал сервера у файл замість stderr, збільшує рівень журналювання до `INFO`

Тип: `string`

##### logLevel
Встановлює рівень журналювання. Можливі опції `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`.

Тип: `string`

##### verbose
Детальне журналювання (еквівалентно `--log-level=ALL`)

Тип: `boolean`

##### silent
Не журналювати нічого (еквівалентно `--log-level=OFF`)

Тип: `boolean`

##### appendLog
Додавати до файлу журналу замість перезапису.

Тип: `boolean`

##### replayable
Детальне журналювання без обрізання довгих рядків, щоб журнал можна було відтворити (експериментально).

Тип: `boolean`

##### readableTimestamp
Додавати зрозумілі часові мітки до журналу.

Тип: `boolean`

##### enableChromeLogs
Показувати журнали з браузера (перевизначає інші опції журналювання).

Тип: `boolean`

##### bidiMapperPath
Шлях до користувацького bidi маппера.

Тип: `string`

##### allowedIps
Розділений комами список дозволених віддалених IP-адрес, яким дозволено підключатися до EdgeDriver.

Тип: `string[]`<br />
За замовчуванням: `['']`

##### allowedOrigins
Розділений комами список дозволених джерел запитів, яким дозволено підключатися до EdgeDriver. Використання `*` для дозволу будь-якого джерела є небезпечним!

Тип: `string[]`<br />
За замовчуванням: `['*']`

##### spawnOpts
Опції, які передаються в процес драйвера.

Тип: `SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>`<br />
За замовчуванням: `undefined`

</TabItem>
<TabItem value="firefox">

Усі опції Geckodriver дивіться в офіційному [пакеті драйвера](https://github.com/webdriverio-community/node-geckodriver#options).

</TabItem>
<TabItem value="msedge">

Усі опції Edgedriver дивіться в офіційному [пакеті драйвера](https://github.com/webdriverio-community/node-edgedriver#options).

</TabItem>
<TabItem value="safari">

Усі опції Safaridriver дивіться в офіційному [пакеті драйвера](https://github.com/webdriverio-community/node-safaridriver#options).

</TabItem>
</Tabs>

## Спеціальні можливості для конкретних випадків використання

Це список прикладів, які показують, які можливості потрібно застосувати для досягнення певного випадку використання.

### Запуск браузера в режимі без графічного інтерфейсу (Headless)

Запуск браузера в режимі headless означає запуск екземпляра браузера без вікна або інтерфейсу користувача. Це здебільшого використовується в середовищах CI/CD, де не використовується дисплей. Щоб запустити браузер у режимі headless, застосуйте такі можливості:

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'Chrome', value: 'chrome'},
    {label: 'Firefox', value: 'firefox'},
    {label: 'Microsoft Edge', value: 'msedge'},
    {label: 'Safari', value: 'safari'},
  ]
}>
<TabItem value="chrome">

```ts
{
    browserName: 'chrome',   // або 'chromium'
    'goog:chromeOptions': {
        args: ['headless', 'disable-gpu']
    }
}
```

</TabItem>
<TabItem value="firefox">

```ts
    browserName: 'firefox',
    'moz:firefoxOptions': {
        args: ['-headless']
    }
```

</TabItem>
<TabItem value="msedge">

```ts
    browserName: 'msedge',
    'ms:edgeOptions': {
        args: ['--headless']
    }
```

</TabItem>
<TabItem value="safari">

Здається, Safari [не підтримує](https://discussions.apple.com/thread/251837694) роботу в режимі headless.

</TabItem>
</Tabs>

### Автоматизація різних каналів браузерів

Якщо ви хочете тестувати версію браузера, яка ще не випущена як стабільна, наприклад Chrome Canary, ви можете зробити це, встановивши можливості та вказавши на браузер, який ви хочете запустити, наприклад:

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'Chrome', value: 'chrome'},
    {label: 'Firefox', value: 'firefox'},
    {label: 'Microsoft Edge', value: 'msedge'},
    {label: 'Safari', value: 'safari'},
  ]
}>
<TabItem value="chrome">

При тестуванні в Chrome, WebdriverIO автоматично завантажить потрібну версію браузера та драйвера для вас на основі визначеного `browserVersion`, наприклад:

```ts
{
    browserName: 'chrome', // або 'chromium'
    browserVersion: '116' // або '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' або 'latest' (те саме, що і 'canary')
}
```

Якщо ви хочете тестувати вручну завантажений браузер, ви можете вказати бінарний шлях до браузера через:

```ts
{
    browserName: 'chrome',  // або 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

Крім того, якщо ви хочете використовувати вручну завантажений драйвер, ви можете вказати бінарний шлях до драйвера через:

```ts
{
    browserName: 'chrome', // або 'chromium'
    'wdio:chromedriverOptions': {
        binary: '/path/to/chromdriver'
    }
}
```

</TabItem>
<TabItem value="firefox">

При тестуванні в Firefox, WebdriverIO автоматично завантажить потрібну версію браузера та драйвера для вас на основі визначеного `browserVersion`, наприклад:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // або 'latest'
}
```

Якщо ви хочете тестувати вручну завантажену версію, ви можете вказати бінарний шлях до браузера через:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

Крім того, якщо ви хочете використовувати вручну завантажений драйвер, ви можете вказати бінарний шлях до драйвера через:

```ts
{
    browserName: 'firefox',
    'wdio:geckodriverOptions': {
        binary: '/path/to/geckodriver'
    }
}
```

</TabItem>
<TabItem value="msedge">

При тестуванні в Microsoft Edge, переконайтеся, що у вас встановлена потрібна версія браузера на вашій машині. Ви можете вказати WebdriverIO на браузер для виконання через:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIO автоматично завантажить потрібну версію драйвера для вас на основі визначеного `browserVersion`, наприклад:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // або '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

Крім того, якщо ви хочете використовувати вручну завантажений драйвер, ви можете вказати бінарний шлях до драйвера через:

```ts
{
    browserName: 'msedge',
    'wdio:edgedriverOptions': {
        binary: '/path/to/msedgedriver'
    }
}
```

</TabItem>
<TabItem value="safari">

При тестуванні в Safari, переконайтеся, що у вас встановлена [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) на вашій машині. Ви можете вказати WebdriverIO на цю версію через:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## Розширення користувацьких можливостей

Якщо ви хочете визначити власний набір можливостей, наприклад, для зберігання довільних даних, що використовуються в тестах для конкретної можливості, ви можете зробити це, наприклад, встановивши:

```js title=wdio.conf.ts
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        'custom:caps': {
            // користувацькі конфігурації
        }
    }]
}
```

Рекомендується дотримуватися [протоколу W3C](https://w3c.github.io/webdriver/#dfn-extension-capability) щодо іменування можливостей, який вимагає символу `:` (двокрапка), що позначає простір імен, специфічний для реалізації. У своїх тестах ви можете отримати доступ до своєї користувацької можливості через, наприклад:

```ts
browser.capabilities['custom:caps']
```

Щоб забезпечити безпеку типів, ви можете розширити інтерфейс можливостей WebdriverIO через:

```ts
declare global {
    namespace WebdriverIO {
        interface Capabilities {
            'custom:caps': {
                // ...
            }
        }
    }
}
```