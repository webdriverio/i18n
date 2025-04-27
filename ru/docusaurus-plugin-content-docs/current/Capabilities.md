---
id: capabilities
title: Возможности
---

Возможность (capability) - это определение для удаленного интерфейса. Она помогает WebdriverIO понять, в какой среде браузера или мобильного устройства вы хотите запускать свои тесты. Возможности менее важны при локальной разработке тестов, поскольку вы обычно запускаете их на одном удаленном интерфейсе, но становятся более важными при запуске большого набора интеграционных тестов в CI/CD.

:::info

Формат объекта возможности хорошо определен в [спецификации WebDriver](https://w3c.github.io/webdriver/#capabilities). Тестовый запускатель WebdriverIO завершит работу с ошибкой, если пользовательские возможности не соответствуют этой спецификации.

:::

## Пользовательские возможности

Хотя количество фиксированных определенных возможностей очень мало, каждый может предоставлять и принимать пользовательские возможности, которые специфичны для драйвера автоматизации или удаленного интерфейса:

### Расширения возможностей, специфичные для браузера

- `goog:chromeOptions`: Расширения [Chromedriver](https://chromedriver.chromium.org/capabilities), применимы только для тестирования в Chrome
- `moz:firefoxOptions`: Расширения [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html), применимы только для тестирования в Firefox
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) для указания среды при использовании EdgeDriver для тестирования Chromium Edge

### Расширения возможностей облачных вендоров

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- и многие другие...

### Расширения возможностей движка автоматизации

- `appium:xxx`: [Appium](https://appium.github.io/appium.io/docs/en/writing-running-appium/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- и многие другие...

### Возможности WebdriverIO для управления опциями драйвера браузера

WebdriverIO управляет установкой и запуском драйвера браузера за вас. WebdriverIO использует пользовательскую возможность, которая позволяет передавать параметры в драйвер.

#### `wdio:chromedriverOptions`

Специфические опции, передаваемые в Chromedriver при его запуске.

#### `wdio:geckodriverOptions`

Специфические опции, передаваемые в Geckodriver при его запуске.

#### `wdio:edgedriverOptions`

Специфические опции, передаваемые в Edgedriver при его запуске.

#### `wdio:safaridriverOptions`

Специфические опции, передаваемые в Safari при его запуске.

#### `wdio:maxInstances`

Максимальное количество параллельно работающих воркеров для конкретного браузера/возможности. Имеет приоритет над [maxInstances](#configuration#maxInstances) и [maxInstancesPerCapability](configuration/#maxinstancespercapability).

Тип: `number`

#### `wdio:specs`

Определяет спецификации для выполнения тестов для этого браузера/возможности. То же, что и [обычная опция конфигурации `specs`](configuration#specs), но специфичная для браузера/возможности. Имеет приоритет над `specs`.

Тип: `(String | String[])[]`

#### `wdio:exclude`

Исключает спецификации из выполнения тестов для этого браузера/возможности. То же, что и [обычная опция конфигурации `exclude`](configuration#exclude), но специфичная для браузера/возможности. Имеет приоритет над `exclude`.

Тип: `String[]`

#### `wdio:enforceWebDriverClassic`

По умолчанию WebdriverIO пытается установить сессию WebDriver Bidi. Если вы не предпочитаете это, вы можете установить этот флаг, чтобы отключить такое поведение.

Тип: `boolean`

#### Общие опции драйвера

Хотя все драйверы предлагают разные параметры для конфигурации, есть некоторые общие, которые WebdriverIO понимает и использует для настройки вашего драйвера или браузера:

##### `cacheDir`

Путь к корню каталога кэша. Этот каталог используется для хранения всех драйверов, загруженных при попытке начать сессию.

Тип: `string`<br />
По умолчанию: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

Путь к пользовательскому бинарному файлу драйвера. Если установлено, WebdriverIO не будет пытаться загрузить драйвер, а будет использовать тот, который предоставлен по этому пути. Убедитесь, что драйвер совместим с браузером, который вы используете.

Вы можете предоставить этот путь через переменные среды `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` или `EDGEDRIVER_PATH`.

Тип: `string`

:::caution

Если `binary` драйвера установлен, WebdriverIO не будет пытаться загрузить драйвер, а будет использовать тот, который предоставлен по этому пути. Убедитесь, что драйвер совместим с браузером, который вы используете.

:::

#### Специфичные для браузера опции драйвера

Чтобы передать опции драйверу, вы можете использовать следующие пользовательские возможности:

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
Префикс базового URL-пути для команд, например, `wd/url`.

Пример: `/`

Тип: `string`

##### logPath
Запись лога сервера в файл вместо stderr, увеличивает уровень лога до `INFO`

Тип: `string`

##### logLevel
Установить уровень лога. Возможные опции: `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`.

Тип: `string`

##### verbose
Подробное логирование (эквивалентно `--log-level=ALL`)

Тип: `boolean`

##### silent
Ничего не логировать (эквивалентно `--log-level=OFF`)

Тип: `boolean`

##### appendLog
Добавлять в файл лога, а не перезаписывать его.

Тип: `boolean`

##### replayable
Подробно логировать и не обрезать длинные строки, чтобы лог можно было воспроизвести (экспериментально).

Тип: `boolean`

##### readableTimestamp
Добавлять читаемые временные метки в лог.

Тип: `boolean`

##### enableChromeLogs
Показывать логи из браузера (переопределяет другие опции логирования).

Тип: `boolean`

##### bidiMapperPath
Путь к пользовательскому bidi-мапперу.

Тип: `string`

##### allowedIps
Разделенный запятыми список разрешенных удаленных IP-адресов, которым разрешено подключаться к EdgeDriver.

Тип: `string[]`<br />
По умолчанию: `['']`

##### allowedOrigins
Разделенный запятыми список разрешенных источников запросов, которым разрешено подключаться к EdgeDriver. Использование `*` для разрешения любого хост-источника опасно!

Тип: `string[]`<br />
По умолчанию: `['*']`

##### spawnOpts
Опции, которые будут переданы в процесс драйвера.

Тип: `SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>`<br />
По умолчанию: `undefined`

</TabItem>
<TabItem value="firefox">

Все опции Geckodriver см. в официальном [пакете драйвера](https://github.com/webdriverio-community/node-geckodriver#options).

</TabItem>
<TabItem value="msedge">

Все опции Edgedriver см. в официальном [пакете драйвера](https://github.com/webdriverio-community/node-edgedriver#options).

</TabItem>
<TabItem value="safari">

Все опции Safaridriver см. в официальном [пакете драйвера](https://github.com/webdriverio-community/node-safaridriver#options).

</TabItem>
</Tabs>

## Специальные возможности для конкретных случаев использования

Это список примеров, показывающих, какие возможности необходимо применить для достижения определенного варианта использования.

### Запуск браузера в безголовом режиме

Запуск браузера в безголовом режиме означает запуск экземпляра браузера без окна или пользовательского интерфейса. Это в основном используется в средах CI/CD, где дисплей не используется. Чтобы запустить браузер в безголовом режиме, примените следующие возможности:

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

Кажется, что Safari [не поддерживает](https://discussions.apple.com/thread/251837694) запуск в безголовом режиме.

</TabItem>
</Tabs>

### Автоматизация разных каналов браузера

Если вы хотите тестировать версию браузера, которая еще не выпущена как стабильная, например, Chrome Canary, вы можете сделать это, установив возможности и указав на браузер, который вы хотите запустить, например:

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

При тестировании в Chrome, WebdriverIO автоматически загрузит для вас нужную версию браузера и драйвер на основе определенного `browserVersion`, например:

```ts
{
    browserName: 'chrome', // или 'chromium'
    browserVersion: '116' // или '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' или 'latest' (то же, что и 'canary')
}
```

Если вы хотите протестировать вручную загруженный браузер, вы можете указать бинарный путь к браузеру через:

```ts
{
    browserName: 'chrome',  // или 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

Кроме того, если вы хотите использовать вручную загруженный драйвер, вы можете указать бинарный путь к драйверу через:

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

При тестировании в Firefox, WebdriverIO автоматически загрузит для вас нужную версию браузера и драйвер на основе определенного `browserVersion`, например:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // или 'latest'
}
```

Если вы хотите протестировать вручную загруженную версию, вы можете указать бинарный путь к браузеру через:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

Кроме того, если вы хотите использовать вручную загруженный драйвер, вы можете указать бинарный путь к драйверу через:

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

При тестировании в Microsoft Edge убедитесь, что нужная версия браузера установлена на вашем компьютере. Вы можете указать WebdriverIO на браузер для выполнения через:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIO автоматически загрузит для вас нужную версию драйвера на основе определенного `browserVersion`, например:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // или '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

Кроме того, если вы хотите использовать вручную загруженный драйвер, вы можете указать бинарный путь к драйверу через:

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

При тестировании в Safari убедитесь, что [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) установлен на вашем компьютере. Вы можете указать WebdriverIO на эту версию через:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## Расширение пользовательских возможностей

Если вы хотите определить свой собственный набор возможностей, например, для хранения произвольных данных, которые будут использоваться в тестах для этой конкретной возможности, вы можете сделать это, например, установив:

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

Рекомендуется следовать [протоколу W3C](https://w3c.github.io/webdriver/#dfn-extension-capability) при именовании возможностей, который требует символ `:` (двоеточие), обозначающий специфическое для реализации пространство имен. В своих тестах вы можете получить доступ к своей пользовательской возможности через, например:

```ts
browser.capabilities['custom:caps']
```

Чтобы обеспечить безопасность типов, вы можете расширить интерфейс возможностей WebdriverIO через:

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