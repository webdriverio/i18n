---
id: capabilities
title: Можливості
---

Можливість - це визначення для віддаленого інтерфейсу. Це допомагає WebdriverIO зрозуміти, в якому браузері або мобільному середовищі ви хочете запускати свої тести. Можливості менш важливі при розробці тестів локально, оскільки ви здебільшого запускаєте їх на одному віддаленому інтерфейсі, але стають більш важливими при запуску великого набору інтеграційних тестів у CI/CD.

:::info

Формат об'єкта можливостей чітко визначений [специфікацією WebDriver](https://w3c.github.io/webdriver/#capabilities). Тестовий запускач WebdriverIO завершиться помилкою, якщо визначені користувачем можливості не відповідають цій специфікації.

:::

## Користувацькі можливості

Хоча кількість фіксованих визначених можливостей дуже мала, будь-хто може надавати та приймати спеціальні можливості, які є специфічними для драйвера автоматизації або віддаленого інтерфейсу:

### Розширення можливостей, специфічні для браузера

- `goog:chromeOptions`: розширення [Chromedriver](https://chromedriver.chromium.org/capabilities), застосовуються лише для тестування в Chrome
- `moz:firefoxOptions`: розширення [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html), застосовуються лише для тестування в Firefox
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) для вказання середовища при використанні EdgeDriver для тестування Chromium Edge

### Розширення можливостей від постачальників хмарних сервісів

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- і багато інших...

### Розширення можливостей двигуна автоматизації

- `appium:xxx`: [Appium](https://appium.github.io/appium.io/docs/en/writing-running-appium/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- і багато інших...

### Можливості WebdriverIO для керування параметрами драйверів браузера

WebdriverIO керує встановленням і запуском драйверів браузера за вас. WebdriverIO використовує спеціальну можливість, яка дозволяє передавати параметри драйверу.

#### `wdio:chromedriverOptions`

Специфічні параметри, які передаються в Chromedriver при його запуску.

#### `wdio:geckodriverOptions`

Специфічні параметри, які передаються в Geckodriver при його запуску.

#### `wdio:edgedriverOptions`

Специфічні параметри, які передаються в Edgedriver при його запуску.

#### `wdio:safaridriverOptions`

Специфічні параметри, які передаються в Safari при його запуску.

#### `wdio:maxInstances`

Максимальна кількість паралельно працюючих робочих процесів для конкретного браузера/можливості. Має пріоритет над [maxInstances](#configuration#maxInstances) та [maxInstancesPerCapability](configuration/#maxinstancespercapability).

Тип: `number`

#### `wdio:specs`

Визначає специфікації для виконання тестів для цього браузера/можливості. Те саме, що і [звичайна опція конфігурації `specs`](configuration#specs), але специфічна для браузера/можливості. Має пріоритет над `specs`.

Тип: `(String | String[])[]`

#### `wdio:exclude`

Виключає специфікації з виконання тестів для цього браузера/можливості. Те саме, що і [звичайна опція конфігурації `exclude`](configuration#exclude), але специфічна для браузера/можливості. Має пріоритет над `exclude`.

Тип: `String[]`

#### `wdio:enforceWebDriverClassic`

За замовчуванням WebdriverIO намагається встановити сеанс WebDriver Bidi. Якщо ви не надаєте перевагу цьому, ви можете встановити цей прапорець, щоб вимкнути цю поведінку.

Тип: `boolean`

#### Загальні параметри драйвера

Хоча всі драйвери пропонують різні параметри для налаштування, є деякі спільні, які WebdriverIO розуміє і використовує для налаштування вашого драйвера або браузера:

##### `cacheDir`

Шлях до кореня директорії кешу. Ця директорія використовується для зберігання всіх драйверів, які завантажуються при спробі розпочати сеанс.

Тип: `string`<br />
За замовчуванням: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

Шлях до користувацького бінарного файлу драйвера. Якщо встановлено, WebdriverIO не намагатиметься завантажити драйвер, а використовуватиме той, що вказаний за цим шляхом. Переконайтеся, що драйвер сумісний з браузером, який ви використовуєте.

Ви можете надати цей шлях через змінні середовища `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` або `EDGEDRIVER_PATH`.

Тип: `string`

:::caution

Якщо встановлено `binary` драйвера, WebdriverIO не намагатиметься завантажити драйвер, а використовуватиме той, що вказаний за цим шляхом. Переконайтеся, що драйвер сумісний з браузером, який ви використовуєте.

:::

#### Специфічні параметри драйвера для браузерів

Для передачі параметрів драйверу можна використовувати такі спеціальні можливості:

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
Порт, на якому повинен працювати ADB драйвер.

Приклад: `9515`

Тип: `number`

##### urlBase
Префікс базового URL-шляху для команд, наприклад, `wd/url`.

Приклад: `/`

Тип: `string`

##### logPath
Запис журналу сервера у файл замість stderr, збільшує рівень журналу до `INFO`

Тип: `string`

##### logLevel
Встановити рівень журналу. Можливі опції `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`.

Тип: `string`

##### verbose
Детальне журналювання (еквівалент `--log-level=ALL`)

Тип: `boolean`

##### silent
Не журналювати нічого (еквівалент `--log-level=OFF`)

Тип: `boolean`

##### appendLog
Додавання до файлу журналу замість перезапису.

Тип: `boolean`

##### replayable
Детальне журналювання та відсутність обрізання довгих рядків, щоб журнал можна було відтворити (експериментально).

Тип: `boolean`

##### readableTimestamp
Додати читабельні мітки часу до журналу.

Тип: `boolean`

##### enableChromeLogs
Показувати журнали з браузера (перевизначає інші параметри журналювання).

Тип: `boolean`

##### bidiMapperPath
Шлях до користувацького bidi-маппера.

Тип: `string`

##### allowedIps
Розділений комами список дозволених IP-адрес, яким дозволено підключатися до EdgeDriver.

Тип: `string[]`<br />
За замовчуванням: `['']`

##### allowedOrigins
Розділений комами список дозволених джерел запитів, яким дозволено підключатися до EdgeDriver. Використання `*` для дозволу будь-якого джерела є небезпечним!

Тип: `string[]`<br />
За замовчуванням: `['*']`

##### spawnOpts
Параметри, які передаються до процесу драйвера.

Тип: `SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>`<br />
За замовчуванням: `undefined`

</TabItem>
<TabItem value="firefox">

Перегляньте всі параметри Geckodriver у офіційному [пакеті драйвера](https://github.com/webdriverio-community/node-geckodriver#options).

</TabItem>
<TabItem value="msedge">

Перегляньте всі параметри Edgedriver у офіційному [пакеті драйвера](https://github.com/webdriverio-community/node-edgedriver#options).

</TabItem>
<TabItem value="safari">

Перегляньте всі параметри Safaridriver у офіційному [пакеті драйвера](https://github.com/webdriverio-community/node-safaridriver#options).

</TabItem>
</Tabs>

## Спеціальні можливості для особливих випадків

Це список прикладів, які показують, які можливості потрібно застосувати для досягнення певного випадку використання.

### Запуск браузера в режимі Headless

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

Здається, що Safari [не підтримує](https://discussions.apple.com/thread/251837694) запуск у режимі headless.

</TabItem>
</Tabs>

### Автоматизація різних версій браузерів

Якщо ви хочете протестувати версію браузера, яка ще не випущена як стабільна, наприклад, Chrome Canary, ви можете зробити це, встановивши можливості та вказавши на браузер, який ви хочете запустити, наприклад:

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

При тестуванні в Chrome, WebdriverIO автоматично завантажить потрібну версію браузера та драйвера на основі визначеного `browserVersion`, наприклад:

```ts
{
    browserName: 'chrome', // або 'chromium'
    browserVersion: '116' // або '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' чи 'latest' (те саме, що 'canary')
}
```

Якщо ви хочете протестувати вручну завантажений браузер, ви можете вказати шлях до бінарного файлу браузера:

```ts
{
    browserName: 'chrome',  // або 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

Крім того, якщо ви хочете використовувати вручну завантажений драйвер, ви можете вказати шлях до бінарного файлу драйвера:

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

При тестуванні в Firefox, WebdriverIO автоматично завантажить потрібну версію браузера та драйвера на основі визначеного `browserVersion`, наприклад:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // або 'latest'
}
```

Якщо ви хочете протестувати вручну завантажену версію, ви можете вказати шлях до бінарного файлу браузера:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

Крім того, якщо ви хочете використовувати вручну завантажений драйвер, ви можете вказати шлях до бінарного файлу драйвера:

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

При тестуванні в Microsoft Edge переконайтеся, що потрібна версія браузера встановлена на вашому комп'ютері. Ви можете вказати WebdriverIO шлях до браузера для виконання:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIO автоматично завантажить потрібну версію драйвера на основі визначеного `browserVersion`, наприклад:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // або '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

Крім того, якщо ви хочете використовувати вручну завантажений драйвер, ви можете вказати шлях до бінарного файлу драйвера:

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

При тестуванні в Safari переконайтеся, що у вас встановлена [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) на вашому комп'ютері. Ви можете вказати WebdriverIO на цю версію:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## Розширення користувацьких можливостей

Якщо ви хочете визначити власний набір можливостей, наприклад, для зберігання довільних даних, які будуть використовуватися в тестах для цієї конкретної можливості, ви можете зробити це, наприклад, встановивши:

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

Рекомендується дотримуватися [протоколу W3C](https://w3c.github.io/webdriver/#dfn-extension-capability) при іменуванні можливостей, який вимагає символу `:` (двокрапка), що позначає специфічний для реалізації простір імен. У своїх тестах ви можете отримати доступ до своєї користувацької можливості через, наприклад:

```ts
browser.capabilities['custom:caps']
```

Щоб забезпечити безпеку типів, ви можете розширити інтерфейс можливостей WebdriverIO:

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