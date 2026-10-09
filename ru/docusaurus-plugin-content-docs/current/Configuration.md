---
id: configuration
title: Конфигурация
description: "Справочник по всем параметрам конфигурации WebDriver, автономного WebdriverIO и тестраннера WDIO, включая все хуки тестраннера."
---

В зависимости от [типа настройки](/docs/setuptypes) (например, использование низкоуровневых привязок протокола, WebdriverIO как автономного пакета или тестраннера WDIO) для управления окружением доступен разный набор параметров.

## Параметры WebDriver

Следующие параметры определяются при использовании пакета протокола [`webdriver`](https://www.npmjs.com/package/webdriver):

### protocol

<Option type="String" default="http">

Протокол, используемый для связи с сервером драйвера.

</Option>

### hostname

<Option type="String" default="0.0.0.0">

Хост вашего сервера драйвера.

</Option>

### port

<Option type="Number" default="undefined">

Порт, на котором работает ваш сервер драйвера.

</Option>

### path

<Option type="String" default="/">

Путь к эндпоинту сервера драйвера.

</Option>

### queryParams

<Option type="Object" default="undefined">

Параметры запроса, передаваемые серверу драйвера.

</Option>

### user

<Option type="String" default="undefined">

Имя пользователя вашего облачного сервиса (работает только для аккаунтов [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) или [TestMu AI](https://www.testmuai.com/)). Если задано, WebdriverIO автоматически установит параметры подключения за вас. Если вы не используете облачного провайдера, этот параметр можно использовать для аутентификации в любом другом бэкенде WebDriver.

</Option>

### key

<Option type="String" default="undefined">

Ключ доступа или секретный ключ вашего облачного сервиса (работает только для аккаунтов [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) или [TestMu AI](https://www.testmuai.com/)). Если задано, WebdriverIO автоматически установит параметры подключения за вас. Если вы не используете облачного провайдера, этот параметр можно использовать для аутентификации в любом другом бэкенде WebDriver.

</Option>

### capabilities

<Option type="Object" default="null">

Определяет capabilities, которые вы хотите использовать в своей сессии WebDriver. Подробнее см. в [протоколе WebDriver](https://w3c.github.io/webdriver/#capabilities).

Помимо capabilities, основанных на WebDriver, вы можете применять специфичные для браузера и вендора параметры, позволяющие более глубоко настроить удалённый браузер или устройство. Они описаны в документации соответствующих вендоров, например:

- `goog:chromeOptions`: для [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: для [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: для [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: для [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: для [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: для [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Кроме того, полезным инструментом является [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) от Sauce Labs, который помогает создать этот объект, позволяя выбрать нужные capabilities с помощью нескольких кликов.

</Option>
**Пример:**

```js
{
    browserName: 'chrome', // варианты: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // версия браузера
    platformName: 'Windows 10' // платформа ОС
}
```

Если вы запускаете веб- или нативные тесты на мобильных устройствах, `capabilities` отличаются от протокола WebDriver. Подробнее см. в [документации Appium](https://appium.io/docs/en/latest/guides/caps/).

### logLevel

<Option type="String" default="info" values="trace | debug | info | warn | error | silent">

Уровень детализации логирования.

</Option>

### outputDir

<Option type="String" default="null">

Директория для хранения всех лог-файлов тестраннера (включая логи репортеров и логи `wdio`). Если не задано, все логи выводятся в `stdout`. Поскольку большинство репортеров предназначены для вывода в `stdout`, рекомендуется использовать этот параметр только для определённых репортеров, для которых имеет смысл записывать отчёт в файл (например, репортер `junit`).

При работе в автономном режиме единственным логом, создаваемым WebdriverIO, будет лог `wdio`.

</Option>

### connectionRetryTimeout

<Option type="Number" default="120000">

Тайм-аут для любого запроса WebDriver к драйверу или гриду.

</Option>

### connectionRetryCount

<Option type="Number" default="3">

Максимальное количество повторных попыток запроса к серверу Selenium.

</Option>

### bidiResponseTimeout

<Option type="Number" default="180000">

Тайм-аут (в мс) для получения ответа от браузера на команду WebDriver Bidi. Увеличьте его, если вы выполняете команды, например [`execute`](/docs/api/browser/execute), которые обоснованно выполняются дольше значения по умолчанию, иначе WebdriverIO прекратит ожидание до того, как браузер завершит работу.

</Option>

### agent

<Option type="Object" default={`{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}`}>

Позволяет использовать собственный ` http`/`https`/`http2` [агент](https://www.npmjs.com/package/got#agent) для выполнения запросов.

</Option>

### headers

<Option type="Object" default={`{}`}>

Укажите пользовательские `headers`, которые будут передаваться в каждом запросе WebDriver. Если ваш Selenium Grid требует базовой аутентификации (Basic Authentication), рекомендуем передавать заголовок `Authorization` через этот параметр для аутентификации ваших запросов WebDriver, например:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// Читаем имя пользователя и пароль из переменных окружения
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// Объединяем имя пользователя и пароль через двоеточие
const credentials = `${username}:${password}`;
// Кодируем учётные данные в Base64
const encodedCredentials = Buffer.from(credentials).toString('base64');

export const config: WebdriverIO.Config = {
    // ...
    headers: {
        Authorization: `Basic ${encodedCredentials}`
    }
    // ...
}
```

</Option>

### transformRequest

<Option type="(RequestOptions) => RequestOptions" default="none">

Функция, перехватывающая [параметры HTTP-запроса](https://github.com/sindresorhus/got#options) перед выполнением запроса WebDriver

</Option>

### transformResponse

<Option type="(Response, RequestOptions) => Response" default="none">

Функция, перехватывающая объекты HTTP-ответа после получения ответа WebDriver. Функции передаётся исходный объект ответа в качестве первого аргумента и соответствующие `RequestOptions` в качестве второго.

</Option>

### strictSSL

<Option type="Boolean" default="true">

Определяет, требуется ли валидность SSL-сертификата.
Может быть задан через переменные окружения `STRICT_SSL` или `strict_ssl`.

</Option>

### enableDirectConnect

<Option type="Boolean" default="true">

Включает ли [функцию прямого подключения Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments).
Ничего не делает, если ответ не содержит нужных ключей при включённом флаге.

</Option>

### cacheDir

<Option type="String" default="process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()">

Путь к корню директории кэша. Эта директория используется для хранения всех драйверов, загружаемых при попытке запустить сессию.

</Option>

### maskingPatterns

<Option type="String" default="undefined">

Для более безопасного логирования регулярные выражения, заданные с помощью `maskingPatterns`, могут скрывать конфиденциальную информацию в логе.
 - Формат строки — регулярное выражение с флагами или без них (например, `/.../i`); несколько регулярных выражений разделяются запятыми.
 - Подробнее о шаблонах маскирования см. в [разделе Masking Patterns в README WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

</Option>
**Пример:**

```js
{
    maskingPatterns: '/--key=([^ ]*)/i,/RESULT (.*)/'
}
```

## WebdriverIO

Следующие параметры (включая перечисленные выше) можно использовать с WebdriverIO в автономном режиме:

### automationProtocol

<Option type="String" default="webdriver">

Определите протокол, который вы хотите использовать для автоматизации браузера. В настоящее время поддерживается только [`webdriver`](https://www.npmjs.com/package/webdriver), так как это основная технология автоматизации браузера, используемая WebdriverIO.

Если вы хотите автоматизировать браузер с помощью другой технологии автоматизации, установите в этом свойстве путь, который указывает на модуль, соответствующий следующему интерфейсу:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * Запускает сессию автоматизации и возвращает [монаду](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts) WebdriverIO
     * с соответствующими командами автоматизации. См. пакет [webdriver](https://www.npmjs.com/package/webdriver)
     * в качестве эталонной реализации
     *
     * @param {Capabilities.RemoteConfig} options параметры WebdriverIO
     * @param {Function} hook, позволяющий изменить клиент до того, как он будет возвращён из функции
     * @param {PropertyDescriptorMap} userPrototype позволяет пользователю добавлять собственные команды протокола
     * @param {Function} customCommandWrapper позволяет изменять выполнение команд
     * @returns экземпляр клиента, совместимый с WebdriverIO
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * позволяет пользователю подключаться к существующим сессиям
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * Изменяет id сессии экземпляра и capabilities браузера для новой сессии
     * непосредственно в переданном объекте браузера
     *
     * @optional
     * @param   {object} instance  объект, получаемый из новой сессии браузера.
     * @returns {string}           новый id сессии браузера
     */
    static reloadSession(
        instance: Client,
        newCapabilities?: WebdriverIO.Capabilitie
    ): Promise<string>;
}
```

</Option>

### baseUrl

<Option type="String" default="null">

Сокращает вызовы команды `url` за счёт установки базового URL.
- Если ваш параметр `url` начинается с `/`, то к нему добавляется `baseUrl` (за исключением пути `baseUrl`, если он есть).
- Если ваш параметр `url` начинается без схемы или `/` (например, `some/path`), то к нему напрямую добавляется полный `baseUrl`.

</Option>

### waitforTimeout

<Option type="Number" default="5000">

Тайм-аут по умолчанию для всех команд `waitFor*`. (Обратите внимание на строчную `f` в названии параметра.) Этот тайм-аут влияет __только__ на команды, начинающиеся с `waitFor*`, и их время ожидания по умолчанию.

Чтобы увеличить тайм-аут для _теста_, обратитесь к документации фреймворка.

</Option>

### waitforInterval

<Option type="Number" default="100">

Интервал по умолчанию для всех команд `waitFor*`, с которым проверяется, изменилось ли ожидаемое состояние (например, видимость).

</Option>

### strictSelectors

<Option type="Boolean" default="true">

Заставляет команду [`$`](/docs/api/browser/$) выбрасывать `StrictSelectorError`, если заданный селектор соответствует более чем одному элементу, вместо того чтобы молча использовать первое совпадение. На `$$` это не влияет.

Вы можете отключить это поведение для отдельного запроса, передав `{ strict: false }` вторым аргументом, например `$('button', { strict: false })`.

Подробнее см. в руководстве по [селекторам](/docs/selectors#strict-mode).

</Option>

### maxSpyCollectedBodySize

<Option type="Number" default="10485760 (10MB)">

Максимальный размер тела ответа (в байтах), который может быть возвращён при использовании команды [`mock`](/docs/api/browser/mock). Используйте `0`, чтобы отключить сбор данных отслеживаемой полезной нагрузки.

</Option>

### region

<Option type="String" default="us" values="us | eu | us-west-1 | eu-central-1 | us-east-4 | asia-south-2 | staging">

При запуске на Sauce Labs вы можете выбрать, в каком из дата-центров запускать тесты.
Используйте краткие обозначения регионов `us` (по умолчанию, соответствует `us-west-1`) или `eu` (соответствует `eu-central-1`) либо напрямую полные названия регионов.

__Примечание:__ Это имеет эффект только в том случае, если вы указали параметры `user` и `key`, связанные с вашим аккаунтом Sauce Labs.

</Option>
*(только для виртуальных машин и/или эмуляторов/симуляторов, за исключением `us-east-4` и `asia-south-2`, в которых размещаются только реальные устройства)*

## Параметры тестраннера

Следующие параметры (включая перечисленные выше) определены только для запуска WebdriverIO с тестраннером WDIO:

### specs

<Option type="(String | String[])[]" default="[]">

Определяет спецификации для выполнения тестов. Вы можете указать glob-шаблон для сопоставления сразу нескольких файлов или обернуть glob или набор путей в массив, чтобы запустить их в рамках одного рабочего процесса. Все пути считаются относительными от пути к файлу конфигурации.

</Option>

### exclude

<Option type="String[]" default="[]">

Исключает спецификации из выполнения тестов. Все пути считаются относительными от пути к файлу конфигурации.

</Option>

### suites

<Option type="Object" default={`{}`}>

Объект, описывающий различные наборы тестов (suites), которые затем можно указать с помощью параметра `--suite` в CLI `wdio`.

</Option>

### capabilities

<Option type="Object|Object[]" default={`[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`}>

То же, что и описанный выше раздел `capabilities`, но с возможностью указать либо объект [multi-remote](/docs/multiremote), либо несколько сессий WebDriver в массиве для параллельного выполнения.

Вы можете применять те же специфичные для вендора и браузера capabilities, что определены [выше](/docs/configuration#capabilities).

</Option>

### maxInstances

<Option type="Number" default="100">

Максимальное общее количество параллельно работающих воркеров.

__Примечание:__ это число может достигать `100`, когда тесты выполняются у внешних вендоров, например на машинах Sauce Labs. Там тесты выполняются не на одной машине, а на нескольких виртуальных машинах. Если тесты запускаются на локальной машине разработчика, используйте более разумное число, например `3`, `4` или `5`. По сути, это количество браузеров, которые будут одновременно запущены и будут выполнять ваши тесты в одно и то же время, поэтому оно зависит от объёма оперативной памяти на вашей машине и от того, сколько других приложений на ней запущено.

Вы также можете применить `maxInstances` в своих объектах capabilities с помощью capability `wdio:maxInstances`. Это ограничит количество параллельных сессий для конкретной capability.

</Option>

### maxInstancesPerCapability

<Option type="Number" default="100">

Максимальное общее количество параллельно работающих воркеров на одну capability.

</Option>

### injectGlobals

<Option type="Boolean" default="true">

Добавляет глобальные объекты WebdriverIO (например, `browser`, `$` и `$$`) в глобальное окружение.
Если установить значение `false`, вам следует импортировать их из `@wdio/globals`, например:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Примечание: WebdriverIO не занимается внедрением глобальных объектов, специфичных для тестового фреймворка.

</Option>

### bail

<Option type="Number" default="0 (don't bail; run all tests)">

Если вы хотите, чтобы прогон тестов останавливался после определённого количества неудачных тестов, используйте `bail`.
(По умолчанию `0`, что означает запуск всех тестов в любом случае.) **Примечание:** Под тестом в данном контексте понимаются все тесты в одном файле спецификации (при использовании Mocha или Jasmine) или все шаги в одном feature-файле (при использовании Cucumber). Если вы хотите управлять поведением bail внутри тестов одного тестового файла, ознакомьтесь с доступными параметрами [фреймворка](frameworks).

</Option>

### specFileRetries

<Option type="Number" default="0">

Количество повторных запусков всего файла спецификации, если он завершился неудачей целиком.

</Option>

### specFileRetriesDelay

<Option type="Number" default="0">

Задержка в секундах между попытками повторного запуска файла спецификации

</Option>

### specFileRetriesDeferred

<Option type="Boolean" default="true">

Определяет, следует ли повторно запускать файлы спецификаций немедленно или отложить их в конец очереди.

</Option>

### groupLogsByTestSpec

<Option type="Boolean" default="false">

Выбор режима вывода логов.

Если установлено значение `false`, логи из разных тестовых файлов будут выводиться в реальном времени. Учтите, что при параллельном запуске это может привести к смешиванию вывода логов из разных файлов.

Если установлено значение `true`, вывод логов будет сгруппирован по спецификациям тестов и выведен только после завершения соответствующей спецификации.

По умолчанию установлено значение `false`, поэтому логи выводятся в реальном времени.

</Option>

### autoAssertOnTestEnd

<Option type="Boolean" default="true">

Определяет, будет ли WebdriverIO автоматически проверять все мягкие утверждения (soft assertions) в конце каждого теста. При значении `true` все накопленные мягкие утверждения будут автоматически проверены, и тест завершится неудачей, если какое-либо из утверждений не выполнилось. При значении `false` для проверки мягких утверждений необходимо вручную вызвать метод assert.

</Option>

### services

<Option type="String[]|Object[]" default="[]">

Сервисы берут на себя определённую работу, которой вы не хотите заниматься. Они расширяют вашу тестовую конфигурацию практически без усилий.

</Option>

### framework

<Option type="String" default="mocha" values="mocha | jasmine | cucumber">

Определяет тестовый фреймворк, используемый тестраннером WDIO.

</Option>

### mochaOpts, jasmineOpts and cucumberOpts

<Option type="Object" default={`{ timeout: 10000 }`}>

Параметры, специфичные для фреймворка. Список доступных параметров см. в документации адаптера фреймворка. Подробнее читайте в разделе [Фреймворки](frameworks).

</Option>

### cucumberFeaturesWithLineNumbers

<Option type="String[]" default="[]">

Список фич cucumber с номерами строк (при [использовании фреймворка cucumber](./Frameworks.md#using-cucumber)).

</Option>

### reporters

<Option type="String[]|Object[]" default="[]">

Список используемых репортеров. Репортер может быть либо строкой, либо массивом вида
`['reporterName', { /* reporter options */}]`, где первый элемент — строка с именем репортера, а второй — объект с параметрами репортера.

</Option>
Пример:

```js
reporters: [
    'dot',
    'spec'
    ['junit', {
        outputDir: `${__dirname}/reports`,
        otherOption: 'foobar'
    }]
]
```

### reporterSyncInterval

<Option type="Number" default="100 (ms)">

Определяет интервал, с которым репортеры должны проверять, синхронизированы ли они, если они передают свои логи асинхронно (например, если логи передаются стороннему вендору).

</Option>

### reporterSyncTimeout

<Option type="Number" default="5000 (ms)">

Определяет максимальное время, отведённое репортерам на завершение загрузки всех их логов, после которого тестраннер выбросит ошибку.

</Option>

### execArgv

<Option type="String[]" default="null">

Аргументы Node, указываемые при запуске дочерних процессов.

</Option>

### cpuProf

<Option type="Boolean" default="false">

Включает профилирование CPU для рабочего процесса. Профиль будет сгенерирован автоматически при завершении рабочего процесса.

</Option>

### heapProf

<Option type="Boolean" default="false">

Включает профилирование кучи (Heap) для рабочего процесса. Снимок будет сгенерирован автоматически при завершении рабочего процесса (используется сэмплирующий профилировщик кучи).

</Option>

### profileOutputDir

<Option type="String" default="./profiles">

Директория, в которой будут сохраняться профили CPU (`.cpuprofile`) и профили кучи (`.heapprofile`).

</Option>

### filesToWatch

<Option type="String[]" default="[]">

Список строковых шаблонов с поддержкой glob, указывающих тестраннеру дополнительно отслеживать другие файлы, например файлы приложения, при запуске с флагом `--watch`. По умолчанию тестраннер уже отслеживает все файлы спецификаций.

</Option>

### updateSnapshots

<Option type="'new' | 'all' | 'none'" default="none if not provided and tests run in CI, new if not provided, otherwise what's been provided">

Установите значение true, если хотите обновить свои снимки (snapshots). В идеале используется как часть параметра CLI, например `wdio run wdio.conf.js --s`.

</Option>

### resolveSnapshotPath

<Option type="(testPath: string, snapExtension: string) => string" default="stores snapshot files in __snapshots__ directory next to test file">

Переопределяет путь к снимкам по умолчанию. Например, чтобы хранить снимки рядом с тестовыми файлами.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

</Option>

### tsConfigPath

<Option type="String" default="null">

WDIO использует `tsx` для компиляции файлов TypeScript. Ваш TSConfig автоматически определяется из текущей рабочей директории, но вы можете указать собственный путь здесь или с помощью переменной окружения TSX_TSCONFIG_PATH.

См. документацию `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

</Option>

### displayServerEnabled

<Option type="Boolean" default="true">

Запускает виртуальный дисплей для прогона в Linux, если не задана ни переменная `DISPLAY`, ни `WAYLAND_DISPLAY`. Установите значение `false`, если вы запускаете тесты в headless-режиме или только в облачном сервисе или удалённом гриде. Параметр управляет только тем, запускается ли сервер дисплея: если задана только `WAYLAND_DISPLAY`, тестраннер всё равно устанавливает `XDG_SESSION_TYPE`, `GDK_BACKEND` и `ELECTRON_OZONE_PLATFORM_HINT` в значение `wayland` для прогона. См. [Headless и серверы дисплея](/docs/headless-and-display-servers).

</Option>

### displayServer

<Option type="String" default="auto" values="auto | wayland | xvfb">

Какой сервер дисплея запускать. `auto` пытается запустить Weston и переключается на Xvfb, если Weston отсутствует или не удаётся его запустить. `wayland` и `xvfb` пытаются запустить только соответствующий сервер.

</Option>

### displayServerAutoInstall

<Option type="Boolean" default="false">

Устанавливает отсутствующий сервер дисплея с помощью системного менеджера пакетов, если ни один из установленных не запускается.

</Option>

### displayServerAutoInstallMode

<Option type="String" default="sudo" values="root | sudo">

Способ выполнения встроенной установки: `root` устанавливает только при запуске от имени root, `sudo` использует неинтерактивный `sudo -n`, если запуск выполняется не от root, или устанавливает без него, если `sudo` не установлен.

</Option>

### displayServerAutoInstallCommand

<Option type="String | String[]">

Команда, выполняемая вместо встроенной установки — как есть и без `sudo`. Выполняется только при `displayServerAutoInstall: true`. Строка выполняется в оболочке (shell), массив — без неё. При `auto` команда сначала выполняется для Weston, а затем повторно для Xvfb, только если Weston по-прежнему недоступен или не запускается, а Xvfb всё ещё отсутствует. Установите в `displayServer` тот сервер, который устанавливает команда, чтобы пропустить попытку для другого сервера.

</Option>

### displayServerWidth

<Option type="Number" default="1920">

Ширина экрана виртуального дисплея в пикселях.

</Option>

### displayServerHeight

<Option type="Number" default="1080">

Высота экрана виртуального дисплея в пикселях.

</Option>

### displayServerDepth

<Option type="Number" default="24">

Глубина цвета виртуального дисплея. Только для Xvfb.

</Option>

## Хуки

Тестраннер WDIO позволяет задавать хуки, срабатывающие в определённые моменты жизненного цикла теста. Это позволяет выполнять пользовательские действия (например, сделать скриншот, если тест не прошёл).

Каждый хук получает в качестве параметра специфичную информацию о жизненном цикле (например, информацию о наборе тестов или о тесте). Подробнее обо всех свойствах хуков читайте в [нашем примере конфигурации](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Примечание:** Некоторые хуки (`onPrepare`, `onWorkerStart`, `onWorkerEnd` и `onComplete`) выполняются в другом процессе и поэтому не могут разделять глобальные данные с другими хуками, которые работают в рабочем процессе.

### onPrepare

Выполняется один раз перед запуском всех воркеров.

Параметры:

- `config` (`object`): объект конфигурации WebdriverIO
- `param` (`object[]`): список сведений о capabilities

### onWorkerStart

Выполняется перед порождением рабочего процесса и может использоваться для инициализации определённого сервиса для этого воркера, а также для асинхронного изменения окружения выполнения.

Параметры:

- `cid` (`string`): id capability (например, 0-0)
- `caps` (`object`): содержит capabilities для сессии, которая будет создана в воркере
- `specs` (`string[]`): спецификации, которые будут выполняться в рабочем процессе
- `args` (`object`): объект, который будет объединён с основной конфигурацией после инициализации воркера
- `execArgv` (`string[]`): список строковых аргументов, передаваемых рабочему процессу

### onWorkerEnd

Выполняется сразу после завершения рабочего процесса.

Параметры:

- `cid` (`string`): id capability (например, 0-0)
- `exitCode` (`number`): 0 — успех, 1 — неудача. Воркер, завершённый сигналом, вместо этого сообщает `128` + номер сигнала, например `139` для `SIGSEGV`
- `specs` (`string[]`): спецификации, которые будут выполняться в рабочем процессе
- `retries` (`number`): количество использованных повторных попыток на уровне спецификации, как определено в [_"Добавление повторных попыток для отдельных файлов спецификаций"_](./Retry.md#add-retries-on-a-per-specfile-basis)
- `signal` (`string`): сигнал, завершивший воркер, например `SIGSEGV`, или `null`, если воркер завершился самостоятельно

### beforeSession

Выполняется непосредственно перед инициализацией сессии webdriver и тестового фреймворка. Позволяет изменять конфигурацию в зависимости от capability или спецификации.

Параметры:

- `config` (`object`): объект конфигурации WebdriverIO
- `caps` (`object`): содержит capabilities для сессии, которая будет создана в воркере
- `specs` (`string[]`): спецификации, которые будут выполняться в рабочем процессе

### before

Выполняется перед началом выполнения тестов. На этом этапе вы имеете доступ ко всем глобальным переменным, таким как `browser`. Это идеальное место для определения пользовательских команд.

Параметры:

- `caps` (`object`): содержит capabilities для сессии, которая будет создана в воркере
- `specs` (`string[]`): спецификации, которые будут выполняться в рабочем процессе
- `browser` (`object`): экземпляр созданной сессии браузера/устройства

### beforeSuite

Хук, выполняемый перед началом набора тестов (только в Mocha/Jasmine)

Параметры:

- `suite` (`object`): сведения о наборе тестов

### beforeHook

Хук, выполняемый *перед* началом хука внутри набора тестов (например, выполняется перед вызовом beforeEach в Mocha)

Параметры:

- `test` (`object`): сведения о тесте
- `context` (`object`): контекст теста (представляет объект World в Cucumber)

### afterHook

Хук, выполняемый *после* завершения хука внутри набора тестов (например, выполняется после вызова afterEach в Mocha)

Параметры:

- `test` (`object`): сведения о тесте
- `context` (`object`): контекст теста (представляет объект World в Cucumber)
- `result` (`object`): результат хука (содержит свойства `error`, `result`, `duration`, `passed`, `retries`)

### beforeTest

Функция, выполняемая перед тестом (только в Mocha/Jasmine).

Параметры:

- `test` (`object`): сведения о тесте
- `context` (`object`): объект области видимости, с которым был выполнен тест

### beforeCommand

Выполняется перед выполнением команды WebdriverIO.

Параметры:

- `commandName` (`string`): имя команды
- `args` (`*`): аргументы, которые получит команда

### afterCommand

Выполняется после выполнения команды WebdriverIO.

Параметры:

- `commandName` (`string`): имя команды
- `args` (`*`): аргументы, которые получит команда
- `result` (`*`): результат команды
- `error` (`Error`): объект ошибки, если она есть

### afterTest

Функция, выполняемая после завершения теста (в Mocha/Jasmine).

Параметры:

- `test` (`object`): сведения о тесте
- `context` (`object`): объект области видимости, с которым был выполнен тест
- `result.error` (`Error`): объект ошибки, если тест не прошёл, иначе `undefined`
- `result.result` (`Any`): возвращаемый объект тестовой функции
- `result.duration` (`Number`): продолжительность теста
- `result.passed` (`Boolean`): true, если тест прошёл, иначе false
- `result.retries` (`Object`): информация о повторных попытках отдельного теста, как определено для [Mocha и Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha), а также для [Cucumber](./Retry.md#rerunning-in-cucumber), например `{ attempts: 0, limit: 0 }`, см.
- `result` (`object`): результат хука (содержит свойства `error`, `result`, `duration`, `passed`, `retries`)

### afterSuite

Хук, выполняемый после завершения набора тестов (только в Mocha/Jasmine)

Параметры:

- `suite` (`object`): сведения о наборе тестов

### after

Выполняется после завершения всех тестов. У вас по-прежнему есть доступ ко всем глобальным переменным из теста.

Параметры:

- `result` (`number`): 0 — тест пройден, 1 — тест не пройден
- `caps` (`object`): содержит capabilities для сессии, которая будет создана в воркере
- `specs` (`string[]`): спецификации, которые будут выполняться в рабочем процессе

### afterSession

Выполняется сразу после завершения сессии webdriver.

Параметры:

- `config` (`object`): объект конфигурации WebdriverIO
- `caps` (`object`): содержит capabilities для сессии, которая будет создана в воркере
- `specs` (`string[]`): спецификации, которые будут выполняться в рабочем процессе

### onComplete

Выполняется после завершения работы всех воркеров, когда процесс собирается завершиться. Ошибка, выброшенная в хуке onComplete, приведёт к тому, что прогон тестов будет считаться неудачным.

Параметры:

- `exitCode` (`number`): 0 — успех, 1 — неудача
- `config` (`object`): объект конфигурации WebdriverIO
- `caps` (`object`): содержит capabilities для сессии, которая будет создана в воркере
- `result` (`object`): объект результатов, содержащий результаты тестов

### onReload

Выполняется при обновлении (refresh).

Параметры:

- `oldSessionId` (`string`): ID старой сессии
- `newSessionId` (`string`): ID новой сессии

### beforeFeature

Выполняется перед фичей Cucumber.

Параметры:

- `uri` (`string`): путь к feature-файлу
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): объект фичи Cucumber

### afterFeature

Выполняется после фичи Cucumber.

Параметры:

- `uri` (`string`): путь к feature-файлу
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): объект фичи Cucumber

### beforeScenario

Выполняется перед сценарием Cucumber.

Параметры:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): объект world, содержащий информацию о pickle и шаге теста
- `context` (`object`): объект World в Cucumber

### afterScenario

Выполняется после сценария Cucumber.

Параметры:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): объект world, содержащий информацию о pickle и шаге теста
- `result` (`object`): объект результатов, содержащий результаты сценария
- `result.passed` (`boolean`): true, если сценарий прошёл
- `result.error` (`string`): стек ошибки, если сценарий не прошёл
- `result.duration` (`number`): продолжительность сценария в миллисекундах
- `context` (`object`): объект World в Cucumber

### beforeStep

Выполняется перед шагом Cucumber.

Параметры:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): объект шага Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): объект сценария Cucumber
- `context` (`object`): объект World в Cucumber

### afterStep

Выполняется после шага Cucumber.

Параметры:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): объект шага Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): объект сценария Cucumber
- `result`: (`object`): объект результатов, содержащий результаты шага
- `result.passed` (`boolean`): true, если сценарий прошёл
- `result.error` (`string`): стек ошибки, если сценарий не прошёл
- `result.duration` (`number`): продолжительность сценария в миллисекундах
- `context` (`object`): объект World в Cucumber

### beforeAssertion

Хук, выполняемый перед выполнением утверждения WebdriverIO.

Параметры:

- `params`: информация об утверждении
- `params.matcherName` (`string`): имя матчера, вызванного тестом (например, `toHaveTitle`). Для псевдонима это имя псевдонима (например, `toBeExisting`, а не `toExist`).
- `params.expectedValue`: значение, передаваемое в матчер
- `params.options`: параметры утверждения

### afterAssertion

Хук, выполняемый после выполнения утверждения WebdriverIO.

Параметры:

- `params`: информация об утверждении
- `params.matcherName` (`string`): имя матчера, вызванного тестом (например, `toHaveTitle`). Для псевдонима это имя псевдонима (например, `toBeExisting`, а не `toExist`).
- `params.expectedValue`: значение, передаваемое в матчер
- `params.options`: параметры утверждения
- `params.result` (`object`): результат матчера, содержащий `pass` (`boolean`) и `message()`. `pass` равно `true`, когда значение соответствует ожидаемому, в том числе и с `.not`: с `.not` утверждение проходит, когда `pass` равно `false`.