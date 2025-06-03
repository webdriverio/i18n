---
id: capabilities
title: Возможности
---

Capability (возможность) - это определение для удаленного интерфейса. Она помогает WebdriverIO понять, в какой браузерной или мобильной среде вы хотите запускать свои тесты. Capabilities менее важны при локальной разработке тестов, так как вы обычно запускаете их на одном удаленном интерфейсе, но становятся более важными при запуске большого набора интеграционных тестов в CI/CD.

:::info

Формат объекта capability хорошо определен в [спецификации WebDriver](https://w3c.github.io/webdriver/#capabilities). Тестовый исполнитель WebdriverIO завершится с ошибкой, если пользовательские capabilities не соответствуют этой спецификации.

:::

## Пользовательские Capabilities

Хотя количество фиксированных определенных capabilities невелико, каждый может предоставлять и принимать пользовательские capabilities, специфичные для драйвера автоматизации или удаленного интерфейса:

### Расширения Capabilities для конкретных браузеров

- `goog:chromeOptions`: расширения [Chromedriver](https://chromedriver.chromium.org/capabilities), применимы только для тестирования в Chrome
- `moz:firefoxOptions`: расширения [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html), применимы только для тестирования в Firefox
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) для указания среды при использовании EdgeDriver для тестирования Chromium Edge

### Расширения Capabilities от облачных поставщиков

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- и многие другие...

### Расширения Capabilities для движков автоматизации

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- и многие другие...

### Capabilities WebdriverIO для управления параметрами драйвера браузера

WebdriverIO управляет установкой и запуском драйвера браузера за вас. WebdriverIO использует пользовательскую capability, которая позволяет передавать параметры в драйвер.

#### `wdio:chromedriverOptions`

Специфические параметры, передаваемые в Chromedriver при его запуске.

#### `wdio:geckodriverOptions`

Специфические параметры, передаваемые в Geckodriver при его запуске.

#### `wdio:edgedriverOptions`

Специфические параметры, передаваемые в Edgedriver при его запуске.

#### `wdio:safaridriverOptions`

Специфические параметры, передаваемые в Safari при его запуске.

#### `wdio:maxInstances`

Максимальное количество параллельно работающих процессов для конкретного браузера/capability. Имеет приоритет над [maxInstances](#configuration#maxInstances) и [maxInstancesPerCapability](configuration/#maxinstancespercapability).

Тип: `number`

#### `wdio:specs`

Определяет спецификации для выполнения тестов для этого браузера/capability. Аналогично обычной опции конфигурации [regular `specs`](configuration#specs), но специфично для браузера/capability. Имеет приоритет над `specs`.

Тип: `(String | String[])[]`

#### `wdio:exclude`

Исключает спецификации из выполнения тестов для этого браузера/capability. Аналогично обычной опции конфигурации [regular `exclude`](configuration#exclude), но специфично для браузера/capability. Имеет приоритет над `exclude`.

Тип: `String[]`

#### `wdio:enforceWebDriverClassic`

По умолчанию WebdriverIO пытается установить сессию WebDriver Bidi. Если вы не предпочитаете это, вы можете установить этот флаг, чтобы отключить такое поведение.

Тип: `boolean`

#### Общие параметры драйвера

Хотя все драйверы предлагают различные параметры для конфигурации, есть некоторые общие, которые WebdriverIO понимает и использует для настройки вашего драйвера или браузера:

##### `cacheDir`

Путь к корневому каталогу кэша. Этот каталог используется для хранения всех драйверов, которые загружаются при попытке начать сессию.

Тип: `string`<br />
По умолчанию: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

Путь к пользовательскому бинарному файлу драйвера. Если установлено, WebdriverIO не будет пытаться загрузить драйвер, а будет использовать тот, который указан по этому пути. Убедитесь, что драйвер совместим с используемым браузером.

Вы можете указать этот путь через переменные среды `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` или `EDGEDRIVER_PATH`.

Тип: `string`

:::caution

Если параметр `binary` для драйвера установлен, WebdriverIO не будет пытаться загрузить драйвер, а будет использовать тот, который указан по этому пути. Убедитесь, что драйвер совместим с используемым браузером.

:::

#### Специфические параметры драйвера для браузеров

Чтобы передать параметры драйверу, вы можете использовать следующие пользовательские capabilities:

- Chrome или Chromium: `wdio:chromedriverOptions`
- Firefox: `wdio:geckodriverOptions`
- Microsoft Egde: `wdio:edgedriverOptions`
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
Префикс базового URL-пути для команд, например `wd/url`.

Пример: `/`

Тип: `string`

##### logPath
Запись журнала сервера в файл вместо stderr, увеличивает уровень журнала до `INFO`

Тип: `string`

##### logLevel
Установка уровня журнала. Возможные варианты: `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`.

Тип: `string`

##### verbose
Подробное логирование (эквивалентно `--log-level=ALL`)

Тип: `boolean`

##### silent
Не логировать ничего (эквивалентно `--log-level=OFF`)

Тип: `boolean`

##### appendLog
Добавление в файл журнала вместо перезаписи.

Тип: `boolean`

##### replayable
Подробное логирование без обрезки длинных строк, чтобы журнал можно было воспроизвести (экспериментально).

Тип: `boolean`

##### readableTimestamp
Добавление читаемых временных меток в журнал.

Тип: `boolean`

##### enableChromeLogs
Показывать журналы из браузера (переопределяет другие параметры логирования).

Тип: `boolean`

##### bidiMapperPath
Путь к пользовательскому bidi маппингу.

Тип: `string`

##### allowedIps
Разделенный запятыми список разрешенных удаленных IP-адресов, которым разрешено подключаться к EdgeDriver.

Тип: `string[]`<br />
По умолчанию: `['']`

##### allowedOrigins
Разделенный запятыми список разрешенных источников запросов, которым разрешено подключаться к EdgeDriver. Использование `*` для разрешения любого хоста опасно!

Тип: `string[]`<br />
По умолчанию: `['*']`

##### spawnOpts
Параметры, передаваемые в процесс драйвера.

Тип: `SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>`<br />
По умолчанию: `undefined`

</TabItem>
<TabItem value="firefox">

Смотрите все параметры Geckodriver в официальном [пакете драйвера](https://github.com/webdriverio-community/node-geckodriver#options).

</TabItem>
<TabItem value="msedge">

Смотрите все параметры Edgedriver в официальном [пакете драйвера](https://github.com/webdriverio-community/node-edgedriver#options).

</TabItem>
<TabItem value="safari">

Смотрите все параметры Safaridriver в официальном [пакете драйвера](https://github.com/webdriverio-community/node-safaridriver#options).

</TabItem>
</Tabs>

## Специальные Capabilities для конкретных случаев использования

Это список примеров, показывающих, какие capabilities нужно применить для достижения определенного случая использования.

### Запуск браузера в режиме Headless

Запуск браузера в режиме headless означает запуск экземпляра браузера без окна или пользовательского интерфейса. В основном это используется в средах CI/CD, где не используется дисплей. Чтобы запустить браузер в режиме headless, примените следующие capabilities:

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

### Автоматизация различных каналов браузера

Если вы хотите тестировать версию браузера, которая еще не выпущена как стабильная, например, Chrome Canary, вы можете сделать это, установив capabilities и указав на браузер, который вы хотите запустить, например:

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

При тестировании в Chrome, WebdriverIO автоматически загрузит желаемую версию браузера и драйвер для вас на основе определенного `browserVersion`, например:

```ts
{
    browserName: 'chrome', // или 'chromium'
    browserVersion: '116' // или '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' или 'latest' (то же самое, что и 'canary')
}
```

Если вы хотите тестировать вручную загруженный браузер, вы можете указать двоичный путь к браузеру через:

```ts
{
    browserName: 'chrome',  // или 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

Кроме того, если вы хотите использовать вручную загруженный драйвер, вы можете указать двоичный путь к драйверу через:

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

При тестировании в Firefox, WebdriverIO автоматически загрузит желаемую версию браузера и драйвер для вас на основе определенного `browserVersion`, например:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // или 'latest'
}
```

Если вы хотите тестировать вручную загруженную версию, вы можете указать двоичный путь к браузеру через:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

Кроме того, если вы хотите использовать вручную загруженный драйвер, вы можете указать двоичный путь к драйверу через:

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

При тестировании в Microsoft Edge убедитесь, что у вас установлена желаемая версия браузера на вашем компьютере. Вы можете указать WebdriverIO на браузер для выполнения через:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIO автоматически загрузит нужную версию драйвера для вас на основе определенного `browserVersion`, например:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // или '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

Кроме того, если вы хотите использовать вручную загруженный драйвер, вы можете указать двоичный путь к драйверу через:

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

При тестировании в Safari убедитесь, что у вас установлен [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) на вашем компьютере. Вы можете указать WebdriverIO на эту версию через:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## Расширение пользовательских Capabilities

Если вы хотите определить свой собственный набор capabilities, чтобы, например, хранить произвольные данные для использования в тестах для конкретной capability, вы можете сделать это, например, установив:

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

Рекомендуется следовать [протоколу W3C](https://w3c.github.io/webdriver/#dfn-extension-capability) при именовании capability, который требует символа `:` (двоеточия), обозначающего пространство имен, специфичное для реализации. В ваших тестах вы можете получить доступ к своей пользовательской capability через, например:

```ts
browser.capabilities['custom:caps']
```

Чтобы обеспечить безопасность типов, вы можете расширить интерфейс capability WebdriverIO через:

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