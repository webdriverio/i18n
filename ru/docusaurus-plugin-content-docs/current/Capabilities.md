---
id: capabilities
title: Capabilities
description: "Определите capabilities, чтобы выбрать браузер или мобильное окружение, в котором будут запускаться ваши тесты, включая пользовательские capabilities от вендоров и особые сценарии использования."
---

Capability — это определение удалённого интерфейса. Оно помогает WebdriverIO понять, в каком браузере или мобильном окружении вы хотите запускать свои тесты. Capabilities не так важны при локальной разработке тестов, поскольку чаще всего вы запускаете их на одном удалённом интерфейсе, но становятся гораздо важнее при запуске большого набора интеграционных тестов в CI/CD.

:::info

Формат объекта capability чётко определён [спецификацией WebDriver](https://w3c.github.io/webdriver/#capabilities). Тестраннер WebdriverIO завершится с ошибкой на раннем этапе, если пользовательские capabilities не соответствуют этой спецификации.

:::

## Пользовательские capabilities

Хотя количество строго определённых capabilities очень невелико, любой может предоставлять и принимать пользовательские capabilities, специфичные для драйвера автоматизации или удалённого интерфейса:

### Расширения capabilities для конкретных браузеров

- `goog:chromeOptions`: расширения [Chromedriver](https://chromedriver.chromium.org/capabilities), применимы только для тестирования в Chrome
- `moz:firefoxOptions`: расширения [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html), применимы только для тестирования в Firefox
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) для задания окружения при использовании EdgeDriver для тестирования Chromium Edge

### Расширения capabilities облачных вендоров

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- `LT:Options`: [LambdaTest](https://www.lambdatest.com/support/docs/webdriverio-with-selenium-running-webdriverio-automation-scripts-on-lambdatest-selenium-grid/)
- и многие другие...

### Расширения capabilities движков автоматизации

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- и многие другие...

### Capabilities WebdriverIO для управления параметрами драйвера браузера

WebdriverIO берёт на себя установку и запуск драйвера браузера. WebdriverIO использует пользовательскую capability, которая позволяет передавать параметры драйверу.

#### `wdio:chromedriverOptions`

Специальные параметры, передаваемые в Chromedriver при его запуске.

#### `wdio:geckodriverOptions`

Специальные параметры, передаваемые в Geckodriver при его запуске.

#### `wdio:edgedriverOptions`

Специальные параметры, передаваемые в Edgedriver при его запуске.

#### `wdio:safaridriverOptions`

Специальные параметры, передаваемые в Safari при его запуске.

#### `wdio:maxInstances`

<Option type="number">

Максимальное общее количество параллельно работающих воркеров для конкретного браузера/capability. Имеет приоритет над [maxInstances](#configuration#maxInstances) и [maxInstancesPerCapability](configuration/#maxinstancespercapability).

</Option>

#### `wdio:specs`

<Option type="(String | String[])[]">

Определяет спецификации для выполнения тестов в этом браузере/capability. То же самое, что и [обычный параметр конфигурации `specs`](configuration#specs), но применяется к конкретному браузеру/capability. Имеет приоритет над `specs`.

</Option>

#### `wdio:exclude`

<Option type="String[]">

Исключает спецификации из выполнения тестов для этого браузера/capability. То же самое, что и [обычный параметр конфигурации `exclude`](configuration#exclude), но применяется к конкретному браузеру/capability. Исключение выполняется после применения глобального параметра конфигурации `exclude`.

</Option>

#### `wdio:enforceWebDriverClassic`

<Option type="boolean">

По умолчанию WebdriverIO пытается установить сессию WebDriver Bidi. Если вы этого не хотите, вы можете установить этот флаг, чтобы отключить такое поведение.

</Option>

#### `wdio:electronVersion`

<Option type="string">

Загружает Chromedriver, поставляемый с этим релизом Electron, вместо Chromedriver из Chrome for Testing — для тестирования приложения Electron, указанного в `goog:chromeOptions.binary`. Если также задан `browserVersion`, WebdriverIO использует Chromedriver для этой версии, когда релиз Electron не удаётся загрузить или когда задана переменная `CHROMEDRIVER_CDNURL`. Ночные версии берутся из [electron/nightlies](https://github.com/electron/nightlies/releases). Сервис Electron устанавливает это значение за вас на основе версии Electron приложения.

```ts
{
    browserName: 'chrome',
    'wdio:electronVersion': '33.2.1',
    // сессия BiDi заменяет окно приложения на `data:,`
    'wdio:enforceWebDriverClassic': true,
    'goog:chromeOptions': {
        binary: './out/my-app-darwin-arm64/my-app.app/Contents/MacOS/my-app'
    }
}
```

</Option>

#### Общие параметры драйверов

Хотя все драйверы предлагают разные параметры конфигурации, есть несколько общих, которые WebdriverIO понимает и использует для настройки вашего драйвера или браузера:

##### `cacheDir`

<Option type="string" default="process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()">

Путь к корню директории кэша. Эта директория используется для хранения всех драйверов, загружаемых при попытке запустить сессию.

</Option>

##### `binary`

<Option type="string">

Путь к пользовательскому бинарному файлу драйвера. Если он задан, WebdriverIO не будет пытаться загрузить драйвер, а использует тот, что указан по этому пути. Убедитесь, что драйвер совместим с используемым вами браузером.

Вы можете указать этот путь через переменные окружения `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` или `EDGEDRIVER_PATH`.

</Option>
:::caution

Если задан `binary` драйвера, WebdriverIO не будет пытаться загрузить драйвер, а использует тот, что указан по этому пути. Убедитесь, что драйвер совместим с используемым вами браузером.

:::

#### Пользовательский хост для загрузки драйверов

Если публичные CDN драйверов недоступны из вашего окружения, например потому что вы запускаете тесты за корпоративным прокси или зеркалируете драйверы во внутреннем реестре артефактов, вы можете перенаправить загрузку на пользовательский хост с помощью следующих переменных окружения:

- Chrome: `CHROMEDRIVER_CDNURL`, по умолчанию `https://storage.googleapis.com/chrome-for-testing-public`
- Microsoft Edge: `EDGEDRIVER_CDNURL`, по умолчанию `https://msedgedriver.microsoft.com`

Ожидается, что зеркало раздаёт архивы драйверов по тем же путям, что и оригинальный CDN, например для Chrome:

```sh
CHROMEDRIVER_CDNURL=https://artifactory.company.com/chrome-for-testing npx wdio run wdio.conf.js
```

что разрешает драйвер в `https://artifactory.company.com/chrome-for-testing/<buildId>/<platform>/chromedriver-<platform>.zip`, где `<platform>` — одно из значений `linux64`, `linux-arm64`, `mac-x64`, `mac-arm64`, `win32` или `win64`, например `.../140.0.7339.207/mac-arm64/chromedriver-mac-arm64.zip`.

:::info Полностью офлайн-окружения

Эти переменные перенаправляют только загрузку драйвера. Чтобы WebdriverIO вообще не обращался к публичному интернету, должны выполняться ещё четыре условия:

- **Браузер должен быть доступен локально.** Если WebdriverIO не может найти установленный Chrome или Firefox, он также загружает браузер, и эта загрузка не учитывает данные переменные. Либо установите браузер на машину, либо укажите WebdriverIO путь к нему через `goog:chromeOptions.binary` / `moz:firefoxOptions.binary`.
- **Используйте полный номер версии.** Если `browserVersion` не указан, WebdriverIO считывает точную версию из локального браузера, и поиск версии не требуется. Если же вы его задаёте, используйте полную версию из четырёх частей, например `140.0.7339.207`. Канал релиза (`stable`), milestone (`140`) или неполная версия (`140.0.7339`) требуют поиска версии через публичный эндпоинт Google, который нельзя перенаправить.
- **Chromedriver должен загружаться из Chrome for Testing.** Для Chrome старее `153.0.8001.0` на Linux ARM64, а также при использовании `wdio:electronVersion` без `browserVersion`, Chromedriver загружается из релизов Electron на GitHub, которые эти переменные не перенаправляют.
- **Убедитесь, что в зеркале действительно есть нужная вам версия.** Если драйвер не удаётся получить с вашего хоста — потому что версия не зеркалирована, а равно потому что URL неверен или учётные данные отклонены, — WebdriverIO выводит предупреждение в лог, а затем ищет ближайшую известную рабочую версию, что снова приводит к запросу к публичному эндпоинту. Если запуск неожиданно обращается к интернету или выбирает версию, которую вы не запрашивали, проверьте в предупреждении, к какому хосту была попытка обращения.

:::

#### Параметры драйверов для конкретных браузеров

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

<Option type="number">

Порт, на котором должен работать драйвер ADB.

Пример: `9515`

</Option>

##### urlBase

<Option type="string">

Префикс базового URL-пути для команд, например `wd/url`.

Пример: `/`

</Option>

##### logPath

<Option type="string">

Записывать лог сервера в файл вместо stderr, повышает уровень логирования до `INFO`

</Option>

##### logLevel

<Option type="string">

Устанавливает уровень логирования. Возможные значения: `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`.

</Option>

##### verbose

<Option type="boolean">

Подробное логирование (эквивалентно `--log-level=ALL`)

</Option>

##### silent

<Option type="boolean">

Ничего не логировать (эквивалентно `--log-level=OFF`)

</Option>

##### appendLog

<Option type="boolean">

Дописывать в файл лога вместо его перезаписи.

</Option>

##### replayable

<Option type="boolean">

Подробное логирование без обрезки длинных строк, чтобы лог можно было воспроизвести (экспериментально).

</Option>

##### readableTimestamp

<Option type="boolean">

Добавлять в лог читаемые временные метки.

</Option>

##### enableChromeLogs

<Option type="boolean">

Показывать логи браузера (переопределяет другие параметры логирования).

</Option>

##### bidiMapperPath

<Option type="string">

Пользовательский путь к bidi mapper.

</Option>

##### allowedIps

<Option type="string[]" default="['']">

Разделённый запятыми список разрешённых удалённых IP-адресов, которым разрешено подключаться к EdgeDriver.

</Option>

##### allowedOrigins

<Option type="string[]" default="['*']">

Разделённый запятыми список разрешённых источников запросов (origins), которым разрешено подключаться к EdgeDriver. Использование `*` для разрешения любого источника опасно!

</Option>

##### spawnOpts

<Option type="SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>" default="undefined">

Параметры, передаваемые в процесс драйвера.

</Option>
</TabItem>
<TabItem value="firefox">

Все параметры Geckodriver смотрите в официальном [пакете драйвера](https://github.com/webdriverio-community/node-geckodriver#options).

</TabItem>
<TabItem value="msedge">

Все параметры Edgedriver смотрите в официальном [пакете драйвера](https://github.com/webdriverio-community/node-edgedriver#options).

</TabItem>
<TabItem value="safari">

Все параметры Safaridriver смотрите в официальном [пакете драйвера](https://github.com/webdriverio-community/node-safaridriver#options).

</TabItem>
</Tabs>

## Специальные capabilities для конкретных сценариев

Это список примеров, показывающих, какие capabilities нужно применить для реализации определённого сценария.

### Запуск браузера в headless-режиме

Запуск браузера в headless-режиме означает запуск экземпляра браузера без окна и пользовательского интерфейса. Чаще всего это используется в окружениях CI/CD, где нет дисплея. Чтобы запустить браузер в headless-режиме, примените следующие capabilities:

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

Похоже, что Safari [не поддерживает](https://discussions.apple.com/thread/251837694) запуск в headless-режиме.

</TabItem>
</Tabs>

### Автоматизация различных каналов браузера

Если вы хотите протестировать версию браузера, которая ещё не выпущена как стабильная, например Chrome Canary, вы можете сделать это, задав capabilities и указав браузер, который хотите запустить, например:

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

При тестировании в Chrome WebdriverIO автоматически загрузит нужную версию браузера и драйвер на основе заданного `browserVersion`, например:

```ts
{
    browserName: 'chrome', // или 'chromium'
    browserVersion: '116' // или '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' или 'latest' (то же, что 'canary')
}
```

Если вы хотите протестировать вручную загруженный браузер, вы можете указать путь к бинарному файлу браузера через:

```ts
{
    browserName: 'chrome',  // или 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

Кроме того, если вы хотите использовать вручную загруженный драйвер, вы можете указать путь к бинарному файлу драйвера через:

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

При тестировании в Firefox WebdriverIO автоматически загрузит нужную версию браузера и драйвер на основе заданного `browserVersion`, например:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // или 'latest'
}
```

Если вы хотите протестировать вручную загруженную версию, вы можете указать путь к бинарному файлу браузера через:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

Кроме того, если вы хотите использовать вручную загруженный драйвер, вы можете указать путь к бинарному файлу драйвера через:

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

При тестировании в Microsoft Edge убедитесь, что на вашей машине установлена нужная версия браузера. Вы можете указать WebdriverIO браузер для запуска через:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIO автоматически загрузит нужную версию драйвера на основе заданного `browserVersion`, например:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // или '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

Кроме того, если вы хотите использовать вручную загруженный драйвер, вы можете указать путь к бинарному файлу драйвера через:

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

При тестировании в Safari убедитесь, что на вашей машине установлен [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/). Вы можете указать WebdriverIO эту версию через:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## Расширение пользовательских capabilities

Если вы хотите определить собственный набор capabilities, например чтобы хранить произвольные данные для использования в тестах для конкретной capability, вы можете сделать это, например, так:

```js title=wdio.conf.ts
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        'custom:caps': {
            // пользовательские настройки
        }
    }]
}
```

Рекомендуется следовать [протоколу W3C](https://w3c.github.io/webdriver/#dfn-extension-capability) в отношении именования capabilities, который требует наличия символа `:` (двоеточие), обозначающего пространство имён конкретной реализации. В своих тестах вы можете получить доступ к пользовательской capability, например, так:

```ts
browser.capabilities['custom:caps']
```

Чтобы обеспечить типобезопасность, вы можете расширить интерфейс capabilities WebdriverIO следующим образом:

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