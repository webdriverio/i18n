---
id: capabilities
title: Можливості
---

Можливість (capability) - це визначення для віддаленого інтерфейсу. Вона допомагає WebdriverIO зрозуміти, в якому браузері чи мобільному середовищі ви хочете запускати свої тести. Можливості менш важливі при розробці тестів локально, оскільки ви запускаєте їх на одному віддаленому інтерфейсі більшість часу, але стають більш важливими при запуску великого набору інтеграційних тестів у CI/CD.

:::info

Формат об'єкта можливостей чітко визначений [специфікацією WebDriver](https://w3c.github.io/webdriver/#capabilities). Тестраннер WebdriverIO завершиться помилкою, якщо визначені користувачем можливості не відповідають цій специфікації.

:::

## Користувацькі можливості

Хоча кількість фіксованих визначених можливостей дуже низька, кожен може надавати та приймати користувацькі можливості, які специфічні для драйвера автоматизації або віддаленого інтерфейсу:

### Розширення можливостей, специфічні для браузера

- `goog:chromeOptions`: розширення [Chromedriver](https://chromedriver.chromium.org/capabilities), застосовуються тільки для тестування в Chrome
- `moz:firefoxOptions`: розширення [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html), застосовуються тільки для тестування в Firefox
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) для визначення середовища при використанні EdgeDriver для тестування Chromium Edge

### Розширення можливостей хмарних вендорів

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- і багато інших...

### Розширення можливостей движка автоматизації

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- і багато інших...

### Можливості WebdriverIO для керування параметрами драйвера браузера

WebdriverIO керує встановленням і запуском драйвера браузера для вас. WebdriverIO використовує спеціальну можливість, яка дозволяє передавати параметри до драйвера.

#### `wdio:chromedriverOptions`

Спеціальні параметри, що передаються в Chromedriver при його запуску.

#### `wdio:geckodriverOptions`

Спеціальні параметри, що передаються в Geckodriver при його запуску.

#### `wdio:edgedriverOptions`

Спеціальні параметри, що передаються в Edgedriver при його запуску.

#### `wdio:safaridriverOptions`

Спеціальні параметри, що передаються в Safari при його запуску.

#### `wdio:maxInstances`

Максимальна кількість загальних паралельних робочих екземплярів для конкретного браузера/можливості. Має пріоритет над [maxInstances](#configuration#maxInstances) та [maxInstancesPerCapability](configuration/#maxinstancespercapability).

Тип: `number`

#### `wdio:specs`

Визначає специфікації для виконання тестів для цього браузера/можливості. Аналогічно [звичайному параметру конфігурації `specs`](configuration#specs), але специфічно для браузера/можливості. Має пріоритет над `specs`.

Тип: `(String | String[])[]`

#### `wdio:exclude`

Виключає специфікації з виконання тестів для цього браузера/можливості. Аналогічно [звичайному параметру конфігурації `exclude`](configuration#exclude), але специфічно для браузера/можливості. Виключення застосовуються після застосування глобального параметра конфігурації `exclude`.

Тип: `String[]`

#### `wdio:enforceWebDriverClassic`

За замовчуванням WebdriverIO намагається встановити сесію WebDriver Bidi. Якщо ви не віддаєте перевагу цьому, ви можете встановити цей прапорець для вимкнення цієї поведінки.

Тип: `boolean`

#### Загальні параметри драйвера

Хоча всі драйвери пропонують різні параметри для конфігурації, є деякі загальні, які WebdriverIO розуміє і використовує для налаштування вашого драйвера або браузера:

##### `cacheDir`

Шлях до кореня каталогу кешу. Цей каталог використовується для зберігання всіх драйверів, які завантажуються при спробі запустити сесію.

Тип: `string`<br />
За замовчуванням: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

Шлях до користувацького бінарного файлу драйвера. Якщо встановлено, WebdriverIO не буде намагатися завантажити драйвер, а використовуватиме той, що надається за цим шляхом. Переконайтеся, що драйвер сумісний з браузером, який ви використовуєте.

Ви можете надати цей шлях через змінні середовища `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` або `EDGEDRIVER_PATH`.

Тип: `string`

:::caution

Якщо `binary` драйвера встановлено, WebdriverIO не буде намагатися завантажити драйвер, а використовуватиме той, що надається за цим шляхом. Переконайтеся, що драйвер сумісний з браузером, який ви використовуєте.

:::

#### Специфічні для браузера параметри драйвера

Для передачі параметрів драйверу ви можете використовувати наступні користувацькі можливості:

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
Порт, на якому повинен працювати ADB-драйвер.

Приклад: `9515`

Тип: `number`

##### urlBase
Базовий префікс шляху URL для команд, наприклад `wd/url`.

Приклад: `/`

Тип: `string`

##### logPath
Записує лог сервера у файл замість stderr, збільшує рівень логування до `INFO`

Тип: `string`

##### logLevel
Встановлює рівень логування. Можливі варіанти `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`.

Тип: `string`

##### verbose
Логувати детально (еквівалентно `--log-level=ALL`)

Тип: `boolean`

##### silent
Не логувати нічого (еквівалентно `--log-level=OFF`)

Тип: `boolean`

##### appendLog
Додавати до лог-файлу замість перезапису.

Тип: `boolean`

##### replayable
Логувати детально і не обрізати довгі рядки, щоб лог можна було відтворити (експериментально).

Тип: `boolean`

##### readableTimestamp
Додавати читабельні часові мітки до логу.

Тип: `boolean`

##### enableChromeLogs
Показувати логи з браузера (перевизначає інші параметри логування).

Тип: `boolean`

##### bidiMapperPath
Шлях до користувацького bidi-маппера.

Тип: `string`

##### allowedIps
Список дозволених віддалених IP-адрес, яким дозволено підключатися до EdgeDriver, розділених комами.

Тип: `string[]`<br />
За замовчуванням: `['']`

##### allowedOrigins
Список дозволених джерел запитів, яким дозволено підключатися до EdgeDriver, розділених комами. Використання `*` для дозволу будь-якого джерела є небезпечним!

Тип: `string[]`<br />
За замовчуванням: `['*']`

##### spawnOpts
Параметри, які будуть передані до процесу драйвера.

Тип: `SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>`<br />
За замовчуванням: `undefined`

</TabItem>
<TabItem value="firefox">

Перегляньте всі параметри Geckodriver в офіційному [пакеті драйвера](https://github.com/webdriverio-community/node-geckodriver#options).

</TabItem>
<TabItem value="msedge">

Перегляньте всі параметри Edgedriver в офіційному [пакеті драйвера](https://github.com/webdriverio-community/node-edgedriver#options).

</TabItem>
<TabItem value="safari">

Перегляньте всі параметри Safaridriver в офіційному [пакеті драйвера](https://github.com/webdriverio-community/node-safaridriver#options).

</TabItem>
</Tabs>

## Спеціальні можливості для особливих випадків

Це список прикладів, що показують, які можливості потрібно застосувати для досягнення певного випадку використання.

### Запуск браузера в безголовому режимі

Запуск браузера в безголовому режимі означає запуск екземпляра браузера без вікна або інтерфейсу користувача. Це переважно використовується в середовищах CI/CD, де не використовується дисплей. Щоб запустити браузер у безголовому режимі, застосуйте наступні можливості:

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

### Автоматизація різних каналів браузера

Якщо ви хочете протестувати версію браузера, яка ще не випущена як стабільна, наприклад Chrome Canary, ви можете зробити це, встановивши можливості та вказавши на браузер, який ви хочете запустити, наприклад:

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

При тестуванні на Chrome, WebdriverIO автоматично завантажить потрібну версію браузера та драйвер для вас на основі визначеного `browserVersion`, наприклад:

```ts
{
    browserName: 'chrome', // або 'chromium'
    browserVersion: '116' // або '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' або 'latest' (те саме, що 'canary')
}
```

Якщо ви хочете протестувати вручну завантажений браузер, ви можете вказати шлях до бінарного файлу браузера через:

```ts
{
    browserName: 'chrome',  // або 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

Крім того, якщо ви хочете використовувати вручну завантажений драйвер, ви можете вказати шлях до бінарного файлу драйвера через:

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

При тестуванні на Firefox, WebdriverIO автоматично завантажить потрібну версію браузера та драйвер для вас на основі визначеного `browserVersion`, наприклад:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // або 'latest'
}
```

Якщо ви хочете протестувати вручну завантажену версію, ви можете вказати шлях до бінарного файлу браузера через:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

Крім того, якщо ви хочете використовувати вручну завантажений драйвер, ви можете вказати шлях до бінарного файлу драйвера через:

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

При тестуванні на Microsoft Edge, переконайтеся, що у вас встановлена потрібна версія браузера на вашій машині. Ви можете вказати WebdriverIO на браузер для виконання через:

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

Крім того, якщо ви хочете використовувати вручну завантажений драйвер, ви можете вказати шлях до бінарного файлу драйвера через:

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

При тестуванні на Safari, переконайтеся, що у вас встановлений [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) на вашій машині. Ви можете вказати WebdriverIO на цю версію через:

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
            // користувацькі конфігурації
        }
    }]
}
```

Рекомендується дотримуватися [протоколу W3C](https://w3c.github.io/webdriver/#dfn-extension-capability) при іменуванні можливостей, що вимагає символу `:` (двокрапка), що позначає специфічний для реалізації простір імен. У ваших тестах ви можете отримати доступ до вашої користувацької можливості через, наприклад:

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