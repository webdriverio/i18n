---
id: capabilities
title: Возможности
---

Capability (возможность) — это определение для удаленного интерфейса. Это помогает WebdriverIO понять, в какой браузерной или мобильной среде вы хотите запускать свои тесты. Capabilities менее критичны при локальной разработке тестов, так как чаще всего вы запускаете их на одном удаленном интерфейсе, но становятся более важными при запуске большого набора интеграционных тестов в CI/CD.

:::info

Формат объекта capability хорошо определен [спецификацией WebDriver](https://w3c.github.io/webdriver/#capabilities). Тестовый раннер WebdriverIO выдаст ошибку, если определенные пользователем capabilities не соответствуют этой спецификации.

:::

## Пользовательские Capabilities

Хотя количество фиксированных определенных capabilities очень мало, каждый может предоставлять и принимать пользовательские capabilities, которые специфичны для драйвера автоматизации или удаленного интерфейса:

### Расширения Capability для конкретных браузеров

- `goog:chromeOptions`: расширения [Chromedriver](https://chromedriver.chromium.org/capabilities), применимые только для тестирования в Chrome
- `moz:firefoxOptions`: расширения [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html), применимые только для тестирования в Firefox
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) для указания среды при использовании EdgeDriver для тестирования Chromium Edge

### Расширения Capability от облачных провайдеров

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- `LT:Options`: [LambdaTest](https://www.lambdatest.com/support/docs/webdriverio-with-selenium-running-webdriverio-automation-scripts-on-lambdatest-selenium-grid/)
- и многие другие...

### Расширения Capability для движков автоматизации

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- и многие другие...

### Capabilities WebdriverIO для управления опциями браузерных драйверов

WebdriverIO управляет установкой и запуском браузерного драйвера за вас. WebdriverIO использует пользовательский capability, который позволяет передавать параметры в драйвер.

#### `wdio:chromedriverOptions`

Специальные опции, передаваемые в Chromedriver при его запуске.

#### `wdio:geckodriverOptions`

Специальные опции, передаваемые в Geckodriver при его запуске.

#### `wdio:edgedriverOptions`

Специальные опции, передаваемые в Edgedriver при его запуске.

#### `wdio:safaridriverOptions`

Специальные опции, передаваемые в Safari при его запуске.

#### `wdio:maxInstances`

Максимальное количество параллельно работающих воркеров для конкретного браузера/capability. Имеет приоритет над [maxInstances](#configuration#maxInstances) и [maxInstancesPerCapability](configuration/#maxinstancespercapability).

Тип: `number`

#### `wdio:specs`

Определяет спецификации для выполнения тестов для этого браузера/capability. То же, что и [обычная опция конфигурации `specs`](configuration#specs), но специфичная для браузера/capability. Имеет приоритет над `specs`.

Тип: `(String | String[])[]`

#### `wdio:exclude`

Исключает спецификации из выполнения тестов для этого браузера/capability. То же, что и [обычная опция конфигурации `exclude`](configuration#exclude), но специфичная для браузера/capability. Исключения применяются после глобальной опции конфигурации `exclude`.

Тип: `String[]`

#### `wdio:enforceWebDriverClassic`

По умолчанию WebdriverIO пытается установить сессию WebDriver Bidi. Если вы предпочитаете не использовать это, вы можете установить этот флаг для отключения этого поведения.

Тип: `boolean`

#### Общие опции драйвера

Хотя все драйверы предлагают разные параметры для конфигурации, есть некоторые общие, которые WebdriverIO понимает и использует для настройки вашего драйвера или браузера:

##### `cacheDir`

Путь к корню каталога кэша. Этот каталог используется для хранения всех драйверов, которые загружаются при попытке начать сеанс.

Тип: `string`<br />
По умолчанию: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

Путь к пользовательскому бинарному файлу драйвера. Если установлен, WebdriverIO не будет пытаться скачать драйвер, а будет использовать тот, который предоставлен этим путем. Убедитесь, что драйвер совместим с используемым браузером.

Вы можете предоставить этот путь через переменные среды `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` или `EDGEDRIVER_PATH`.

Тип: `string`

:::caution

Если `binary` для драйвера установлен, WebdriverIO не будет пытаться скачать драйвер, а будет использовать тот, который предоставлен этим путем. Убедитесь, что драйвер совместим с используемым браузером.

:::

#### Опции драйвера для конкретных браузеров

Чтобы передать опции драйверу, вы можете использовать следующие пользовательские capabilities:

- Chrome или Chromium: `wdio:chromedriverOptions`
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
Порт, на котором должен работать драйвер ADB.

Пример: `9515`

Тип: `number`

##### urlBase
Базовый префикс пути URL для команд, например, `wd/url`.

Пример: `/`

Тип: `string`

##### logPath
Запись журнала сервера в файл вместо stderr, увеличивает уровень журнала до `INFO`

Тип: `string`

##### logLevel
Установить уровень журнала. Возможные варианты: `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`.

Тип: `string`

##### verbose
Подробное журналирование (эквивалент `--log-level=ALL`)

Тип: `boolean`

##### silent
Ничего не записывать в журнал (эквивалент `--log-level=OFF`)

Тип: `boolean`

##### appendLog
Добавлять в файл журнала вместо перезаписи.

Тип: `boolean`

##### replayable
Вести подробный журнал и не обрезать длинные строки, чтобы журнал можно было воспроизвести (экспериментально).

Тип: `boolean`

##### readableTimestamp
Добавить читаемые временные метки в журнал.

Тип: `boolean`

##### enableChromeLogs
Показывать журналы из браузера (переопределяет другие опции журналирования).

Тип: `boolean`

##### bidiMapperPath
Путь к пользовательскому bidi маппингу.

Тип: `string`

##### allowedIps
Разделенный запятыми список разрешенных удаленных IP-адресов, которым разрешено подключаться к EdgeDriver.

Тип: `string[]`<br />
По умолчанию: `['']`

##### allowedOrigins
Разделенный запятыми список разрешенных источников запросов, которым разрешено подключаться к EdgeDriver. Использование `*` для разрешения любого источника хоста опасно!

Тип: `string[]`<br />
По умолчанию: `['*']`

##### spawnOpts
Опции, передаваемые в процесс драйвера.

Тип: `SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>`<br />
По умолчанию: `undefined`

</TabItem>
<TabItem value="firefox">

См. все опции Geckodriver в официальном [пакете драйвера](https://github.com/webdriverio-community/node-geckodriver#options).

</TabItem>
<TabItem value="msedge">

См. все опции Edgedriver в официальном [пакете драйвера](https://github.com/webdriverio-community/node-edgedriver#options).

</TabItem>
<TabItem value="safari">

См. все опции Safaridriver в официальном [пакете драйвера](https://github.com/webdriverio-community/node-safaridriver#options).

</TabItem>
</Tabs>

## Специальные Capabilities для особых случаев использования

Это список примеров, показывающих, какие capabilities нужно применять для достижения определенного случая использования.

### Запуск браузера в режиме Headless

Запуск браузера в режиме headless означает запуск экземпляра браузера без окна или пользовательского интерфейса. Это в основном используется в средах CI/CD, где не используется дисплей. Чтобы запустить браузер в режиме headless, примените следующие capabilities:

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
    browserName: 'chrome',   // или 'chromium'
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

Похоже, что Safari [не поддерживает](https://discussions.apple.com/thread/251837694) запуск в режиме headless.

</TabItem>
</Tabs>

### Автоматизация разных каналов браузера

Если вы хотите тестировать версию браузера, которая еще не выпущена как стабильная, например, Chrome Canary, вы можете сделать это, установив capabilities и указав браузер, который вы хотите запустить, например:

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

При тестировании в Chrome, WebdriverIO автоматически загрузит нужную версию браузера и драйвера на основе определенного `browserVersion`, например:

```ts
{
    browserName: 'chrome', // или 'chromium'
    browserVersion: '116' // или '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' или 'latest' (то же, что и 'canary')
}
```

Если вы хотите тестировать вручную загруженный браузер, вы можете указать путь к бинарному файлу браузера:

```ts
{
    browserName: 'chrome',  // или 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

Кроме того, если вы хотите использовать вручную загруженный драйвер, вы можете указать путь к бинарному файлу драйвера:

```ts
{
    browserName: 'chrome', // или 'chromium'
    'wdio:chromedriverOptions': {
        binary: '/path/to/chromdriver'
    }
}
```

</TabItem>
<TabItem value="firefox">

При тестировании в Firefox, WebdriverIO автоматически загрузит нужную версию браузера и драйвера на основе определенного `browserVersion`, например:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // или 'latest'
}
```

Если вы хотите тестировать вручную загруженную версию, вы можете указать путь к бинарному файлу браузера:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

Кроме того, если вы хотите использовать вручную загруженный драйвер, вы можете указать путь к бинарному файлу драйвера:

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

При тестировании в Microsoft Edge убедитесь, что у вас установлена нужная версия браузера на вашем компьютере. Вы можете указать WebdriverIO на браузер для выполнения:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIO автоматически загрузит нужную версию драйвера на основе определенного `browserVersion`, например:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // или '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

Кроме того, если вы хотите использовать вручную загруженный драйвер, вы можете указать путь к бинарному файлу драйвера:

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

При тестировании в Safari убедитесь, что у вас установлен [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) на вашем компьютере. Вы можете указать WebdriverIO на эту версию:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## Расширение пользовательских Capabilities

Если вы хотите определить свой собственный набор capabilities, например, для хранения произвольных данных, которые будут использоваться в тестах для этого конкретного capability, вы можете сделать это, например, установив:

```js title=wdio.conf.ts
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        'custom:caps': {
            // пользовательские конфигурации
        }
    }]
}
```

Рекомендуется следовать [протоколу W3C](https://w3c.github.io/webdriver/#dfn-extension-capability) при именовании capabilities, что требует символа `:` (двоеточие), обозначающего пространство имен, специфичное для реализации. В своих тестах вы можете получить доступ к вашему пользовательскому capability через, например:

```ts
browser.capabilities['custom:caps']
```

Чтобы обеспечить безопасность типов, вы можете расширить интерфейс capability WebdriverIO:

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