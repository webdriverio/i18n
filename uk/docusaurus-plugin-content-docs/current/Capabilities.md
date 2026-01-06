---
id: capabilities
title: Можливості
---

Можливість (capability) - це визначення для віддаленого інтерфейсу. Це допомагає WebdriverIO розуміти, в якому браузері чи мобільному середовищі ви хочете запускати свої тести. Можливості менш важливі при розробці тестів локально, оскільки ви більшість часу запускаєте їх на одному віддаленому інтерфейсі, але стають важливішими при запуску великого набору інтеграційних тестів у CI/CD.

:::info

Формат об'єкта можливостей чітко визначений [специфікацією WebDriver](https://w3c.github.io/webdriver/#capabilities). Виконавець тестів WebdriverIO завершить роботу з помилкою, якщо визначені користувачем можливості не відповідають цій специфікації.

:::

## Користувацькі можливості

Хоча кількість фіксованих визначених можливостей дуже мала, кожен може надавати та приймати користувацькі можливості, які специфічні для драйвера автоматизації або віддаленого інтерфейсу:

### Розширення можливостей для конкретних браузерів

- `goog:chromeOptions`: розширення [Chromedriver](https://chromedriver.chromium.org/capabilities), застосовні лише для тестування в Chrome
- `moz:firefoxOptions`: розширення [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html), застосовні лише для тестування в Firefox
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) для визначення середовища при використанні EdgeDriver для тестування Chromium Edge

### Розширення можливостей хмарних провайдерів

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- `LT:Options`: [LambdaTest](https://www.lambdatest.com/support/docs/webdriverio-with-selenium-running-webdriverio-automation-scripts-on-lambdatest-selenium-grid/)
- та багато інших...

### Розширення можливостей для двигунів автоматизації

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- та багато інших...

### Можливості WebdriverIO для керування опціями драйверів браузера

WebdriverIO керує встановленням та запуском драйверів браузера для вас. WebdriverIO використовує спеціальну можливість, яка дозволяє передавати параметри до драйвера.

#### `wdio:chromedriverOptions`

Специфічні опції, які передаються в Chromedriver при його запуску.

#### `wdio:geckodriverOptions`

Специфічні опції, які передаються в Geckodriver при його запуску.

#### `wdio:edgedriverOptions`

Специфічні опції, які передаються в Edgedriver при його запуску.

#### `wdio:safaridriverOptions`

Специфічні опції, які передаються в Safari при його запуску.

#### `wdio:maxInstances`

Максимальна кількість паралельно працюючих робочих процесів для конкретного браузера/можливості. Має пріоритет над [maxInstances](#configuration#maxInstances) та [maxInstancesPerCapability](configuration/#maxinstancespercapability).

Тип: `number`

#### `wdio:specs`

Визначає специфікації для виконання тестів для цього браузера/можливості. Те саме, що й [звичайна опція конфігурації `specs`](configuration#specs), але специфічна для браузера/можливості. Має пріоритет над `specs`.

Тип: `(String | String[])[]`

#### `wdio:exclude`

Виключає специфікації з виконання тестів для цього браузера/можливості. Те саме, що й [звичайна опція конфігурації `exclude`](configuration#exclude), але специфічна для браузера/можливості. Виключає після застосування глобальної опції конфігурації `exclude`.

Тип: `String[]`

#### `wdio:enforceWebDriverClassic`

За замовчуванням WebdriverIO намагається встановити сесію WebDriver Bidi. Якщо вам це не подобається, ви можете встановити цей прапорець, щоб вимкнути цю поведінку.

Тип: `boolean`

#### Загальні опції драйверів

Хоча всі драйвери пропонують різні параметри для налаштування, є кілька спільних, які WebdriverIO розуміє та використовує для налаштування вашого драйвера чи браузера:

##### `cacheDir`

Шлях до кореня каталогу кешу. Цей каталог використовується для зберігання всіх драйверів, які завантажуються при спробі почати сесію.

Тип: `string`<br />
За замовчуванням: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

Шлях до спеціального бінарного файлу драйвера. Якщо встановлено, WebdriverIO не намагатиметься завантажити драйвер, а використовуватиме той, що надається за цим шляхом. Переконайтеся, що драйвер сумісний з браузером, який ви використовуєте.

Ви можете вказати цей шлях через змінні середовища `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` або `EDGEDRIVER_PATH`.

Тип: `string`

:::caution

Якщо встановлено `binary` драйвера, WebdriverIO не намагатиметься завантажити драйвер, а використовуватиме той, що надається за цим шляхом. Переконайтеся, що драйвер сумісний з браузером, який ви використовуєте.

:::

#### Специфічні опції драйверів браузерів

Щоб передати опції до драйвера, ви можете використовувати такі спеціальні можливості:

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
Порт, на якому має працювати драйвер ADB.

Приклад: `9515`

Тип: `number`

##### urlBase
Базовий префікс шляху URL для команд, наприклад, `wd/url`.

Приклад: `/`

Тип: `string`

##### logPath
Записувати журнал сервера в файл замість stderr, підвищує рівень журналу до `INFO`

Тип: `string`

##### logLevel
Встановити рівень журналу. Можливі опції: `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`.

Тип: `string`

##### verbose
Детальне ведення журналу (еквівалентно `--log-level=ALL`)

Тип: `boolean`

##### silent
Не вести журнал (еквівалентно `--log-level=OFF`)

Тип: `boolean`

##### appendLog
Додавати до файлу журналу замість перезапису.

Тип: `boolean`

##### replayable
Детально записувати журнал і не обрізати довгі рядки, щоб журнал можна було відтворити (експериментально).

Тип: `boolean`

##### readableTimestamp
Додати читабельні часові мітки до журналу.

Тип: `boolean`

##### enableChromeLogs
Показувати журнали з браузера (перекриває інші опції журналу).

Тип: `boolean`

##### bidiMapperPath
Шлях до спеціального маппера bidi.

Тип: `string`

##### allowedIps
Список дозволених віддалених IP-адрес, які можуть підключатися до EdgeDriver, розділених комами.

Тип: `string[]`<br />
За замовчуванням: `['']`

##### allowedOrigins
Список дозволених джерел запитів, які можуть підключатися до EdgeDriver, розділених комами. Використання `*` для дозволу будь-якого джерела хоста є небезпечним!

Тип: `string[]`<br />
За замовчуванням: `['*']`

##### spawnOpts
Опції, які мають бути передані в процес драйвера.

Тип: `SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>`<br />
За замовчуванням: `undefined`

</TabItem>
<TabItem value="firefox">

Дивіться всі опції Geckodriver в офіційному [пакеті драйвера](https://github.com/webdriverio-community/node-geckodriver#options).

</TabItem>
<TabItem value="msedge">

Дивіться всі опції Edgedriver в офіційному [пакеті драйвера](https://github.com/webdriverio-community/node-edgedriver#options).

</TabItem>
<TabItem value="safari">

Дивіться всі опції Safaridriver в офіційному [пакеті драйвера](https://github.com/webdriverio-community/node-safaridriver#options).

</TabItem>
</Tabs>

## Спеціальні можливості для конкретних випадків використання

Це список прикладів, що показують, які можливості потрібно застосувати для досягнення певного випадку використання.

### Запуск браузера в безголовому режимі

Запуск браузера в безголовому режимі означає запуск екземпляру браузера без вікна чи UI. Це здебільшого використовується в середовищах CI/CD, де не використовується дисплей. Щоб запустити браузер у безголовому режимі, застосуйте наступні можливості:

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

Здається, Safari [не підтримує](https://discussions.apple.com/thread/251837694) запуск у безголовому режимі.

</TabItem>
</Tabs>

### Автоматизація різних каналів браузерів

Якщо ви хочете тестувати версію браузера, яка ще не випущена як стабільна, наприклад, Chrome Canary, ви можете зробити це, встановивши можливості та вказавши на браузер, який ви хочете запустити, наприклад:

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

При тестуванні на Chrome, WebdriverIO автоматично завантажить бажану версію браузера та драйвера для вас на основі визначеного `browserVersion`, наприклад:

```ts
{
    browserName: 'chrome', // або 'chromium'
    browserVersion: '116' // або '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' або 'latest' (те саме, що й 'canary')
}
```

Якщо ви хочете тестувати браузер, завантажений вручну, ви можете вказати шлях до бінарного файлу браузера через:

```ts
{
    browserName: 'chrome',  // або 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

Крім того, якщо ви хочете використовувати драйвер, завантажений вручну, ви можете вказати шлях до бінарного файлу драйвера через:

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

При тестуванні на Firefox, WebdriverIO автоматично завантажить бажану версію браузера та драйвера для вас на основі визначеного `browserVersion`, наприклад:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // або 'latest'
}
```

Якщо ви хочете тестувати версію, завантажену вручну, ви можете вказати шлях до бінарного файлу браузера через:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

Крім того, якщо ви хочете використовувати драйвер, завантажений вручну, ви можете вказати шлях до бінарного файлу драйвера через:

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

При тестуванні на Microsoft Edge, переконайтесь, що у вас встановлена бажана версія браузера на вашому комп'ютері. Ви можете вказати WebdriverIO шлях до браузера для виконання через:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIO автоматично завантажить бажану версію драйвера для вас на основі визначеного `browserVersion`, наприклад:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // або '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

Крім того, якщо ви хочете використовувати драйвер, завантажений вручну, ви можете вказати шлях до бінарного файлу драйвера через:

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

При тестуванні на Safari, переконайтесь, що у вас встановлений [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) на вашому комп'ютері. Ви можете вказати WebdriverIO цю версію через:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## Розширення користувацьких можливостей

Якщо ви хочете визначити власний набір можливостей, наприклад, для зберігання довільних даних для використання в тестах для цієї конкретної можливості, ви можете зробити це, наприклад, встановивши:

```js title=wdio.conf.ts
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        'custom:caps': {
            // користувацькі налаштування
        }
    }]
}
```

Рекомендується слідувати [протоколу W3C](https://w3c.github.io/webdriver/#dfn-extension-capability) при іменуванні можливостей, що вимагає символу `:` (двокрапка), який позначає простір імен, специфічний для реалізації. У ваших тестах ви можете отримати доступ до своєї спеціальної можливості через, наприклад:

```ts
browser.capabilities['custom:caps']
```

Для забезпечення типової безпеки ви можете розширити інтерфейс можливостей WebdriverIO через:

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