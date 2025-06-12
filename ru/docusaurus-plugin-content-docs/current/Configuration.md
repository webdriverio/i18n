---
id: configuration
title: Конфигурация
---

В зависимости от [типа настройки](/docs/setuptypes) (например, использование сырых привязок протокола, WebdriverIO как отдельный пакет или тестовый раннер WDIO) доступен различный набор опций для управления средой.

## Опции WebDriver

Следующие опции определены при использовании пакета протокола [`webdriver`](https://www.npmjs.com/package/webdriver):

### protocol

Протокол для связи с сервером драйвера.

Тип: `String`<br />
По умолчанию: `http`

### hostname

Хост вашего сервера драйвера.

Тип: `String`<br />
По умолчанию: `0.0.0.0`

### port

Порт, на котором работает ваш сервер драйвера.

Тип: `Number`<br />
По умолчанию: `undefined`

### path

Путь к конечной точке сервера драйвера.

Тип: `String`<br />
По умолчанию: `/`

### queryParams

Параметры запроса, которые передаются на сервер драйвера.

Тип: `Object`<br />
По умолчанию: `undefined`

### user

Ваше имя пользователя в облачном сервисе (работает только для учетных записей [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) или [LambdaTest](https://www.lambdatest.com)). Если задано, WebdriverIO автоматически установит параметры подключения для вас. Если вы не используете облачного провайдера, это можно использовать для аутентификации на любом другом бэкенде WebDriver.

Тип: `String`<br />
По умолчанию: `undefined`

### key

Ваш ключ доступа или секретный ключ облачного сервиса (работает только для учетных записей [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) или [LambdaTest](https://www.lambdatest.com)). Если задано, WebdriverIO автоматически установит параметры подключения для вас. Если вы не используете облачного провайдера, это можно использовать для аутентификации на любом другом бэкенде WebDriver.

Тип: `String`<br />
По умолчанию: `undefined`

### capabilities

Определяет возможности, которые вы хотите использовать в вашей сессии WebDriver. Подробнее см. в [WebDriver Protocol](https://w3c.github.io/webdriver/#capabilities). Если вы используете старый драйвер, который не поддерживает протокол WebDriver, вам нужно использовать [возможности JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) для успешного запуска сессии.

Помимо возможностей на основе WebDriver, вы можете применять опции для конкретных браузеров и вендоров, которые позволяют глубже настраивать удаленный браузер или устройство. Они документированы в соответствующих документах вендоров, например:

- `goog:chromeOptions`: для [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: для [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: для [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: для [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: для [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: для [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Кроме того, полезным инструментом является [Автоматический конфигуратор тестов Sauce Labs](https://docs.saucelabs.com/basics/platform-configurator/), который помогает создать этот объект, выбирая нужные возможности.

Тип: `Object`<br />
По умолчанию: `null`

**Пример:**

```js
{
    browserName: 'chrome', // варианты: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // версия браузера
    platformName: 'Windows 10' // платформа ОС
}
```

Если вы запускаете веб или нативные тесты на мобильных устройствах, `capabilities` отличается от протокола WebDriver. Подробнее см. в [Документации Appium](https://appium.io/docs/en/latest/guides/caps/).

### logLevel

Уровень подробности логирования.

Тип: `String`<br />
По умолчанию: `info`<br />
Варианты: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

Директория для хранения всех лог-файлов тестового раннера (включая логи репортеров и логи `wdio`). Если не задано, все логи передаются в `stdout`. Поскольку большинство репортеров созданы для вывода в `stdout`, рекомендуется использовать эту опцию только для конкретных репортеров, где имеет больше смысла отправлять отчет в файл (например, для репортера `junit`).

При запуске в автономном режиме единственным генерируемым логом WebdriverIO будет лог `wdio`.

Тип: `String`<br />
По умолчанию: `null`

### connectionRetryTimeout

Таймаут для любого запроса WebDriver к драйверу или сетке.

Тип: `Number`<br />
По умолчанию: `120000`

### connectionRetryCount

Максимальное количество повторных запросов к серверу Selenium.

Тип: `Number`<br />
По умолчанию: `3`

### agent

Позволяет использовать пользовательский [`http`/`https`/`http2` агент](https://www.npmjs.com/package/got#agent) для выполнения запросов.

Тип: `Object`<br />
По умолчанию:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

Укажите пользовательские `headers` для передачи в каждый запрос WebDriver. Если ваша сетка Selenium требует базовой аутентификации, мы рекомендуем передать заголовок `Authorization` через эту опцию для аутентификации ваших запросов WebDriver, например:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// Read the username and password from environment variables
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// Combine the username and password with a colon separator
const credentials = `${username}:${password}`;
// Encode the credentials using Base64
const encodedCredentials = Buffer.from(credentials).toString('base64');

export const config: WebdriverIO.Config = {
    // ...
    headers: {
        Authorization: `Basic ${encodedCredentials}`
    }
    // ...
}
```

Тип: `Object`<br />
По умолчанию: `{}`

### transformRequest

Функция перехвата [опций HTTP-запроса](https://github.com/sindresorhus/got#options) перед выполнением запроса WebDriver

Тип: `(RequestOptions) => RequestOptions`<br />
По умолчанию: *нет*

### transformResponse

Функция перехвата объектов HTTP-ответа после получения ответа WebDriver. Функции передается исходный объект ответа в качестве первого аргумента и соответствующий `RequestOptions` в качестве второго аргумента.

Тип: `(Response, RequestOptions) => Response`<br />
По умолчанию: *нет*

### strictSSL

Требуется ли действительный SSL-сертификат.
Может быть установлено через переменные окружения как `STRICT_SSL` или `strict_ssl`.

Тип: `Boolean`<br />
По умолчанию: `true`

### enableDirectConnect

Включает ли [функцию прямого подключения Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments).
Не делает ничего, если ответ не содержит нужных ключей, когда флаг включен.

Тип: `Boolean`<br />
По умолчанию: `true`

### cacheDir

Путь к корневому каталогу кэша. Этот каталог используется для хранения всех драйверов, которые загружаются при попытке начать сессию.

Тип: `String`<br />
По умолчанию: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

Для более безопасного логирования регулярные выражения, установленные с помощью `maskingPatterns`, могут скрывать конфиденциальную информацию из лога.
 - Строковый формат представляет собой регулярное выражение с флагами или без них (например, `/.../i`), разделенное запятыми для нескольких регулярных выражений.
 - Подробнее о шаблонах маскирования см. в [разделе Masking Patterns в README WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

Тип: `String`<br />
По умолчанию: `undefined`

**Пример:**

```js
{
    maskingPatterns: '/--key=([^ ]*)/i,/RESULT (.*)/'
}
```

---

## WebdriverIO

Следующие опции (включая перечисленные выше) могут использоваться с WebdriverIO в автономном режиме:

### automationProtocol

Определите протокол, который вы хотите использовать для автоматизации браузера. В настоящее время поддерживается только [`webdriver`](https://www.npmjs.com/package/webdriver), так как это основная технология автоматизации браузера, используемая WebdriverIO.

Если вы хотите автоматизировать браузер с помощью другой технологии автоматизации, убедитесь, что вы задали это свойство как путь, который разрешается в модуль, соответствующий следующему интерфейсу:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * Start a automation session and return a WebdriverIO [monad](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)
     * with respective automation commands. See the [webdriver](https://www.npmjs.com/package/webdriver) package
     * as a reference implementation
     *
     * @param {Capabilities.RemoteConfig} options WebdriverIO options
     * @param {Function} hook that allows to modify the client before it gets released from the function
     * @param {PropertyDescriptorMap} userPrototype allows user to add custom protocol commands
     * @param {Function} customCommandWrapper allows to modify the command execution
     * @returns a WebdriverIO compatible client instance
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * allows user to attach to existing sessions
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * Changes The instance session id and browser capabilities for the new session
     * directly into the passed in browser object
     *
     * @optional
     * @param   {object} instance  the object we get from a new browser session.
     * @returns {string}           the new session id of the browser
     */
    static reloadSession(
        instance: Client,
        newCapabilities?: WebdriverIO.Capabilitie
    ): Promise<string>;
}
```

Тип: `String`<br />
По умолчанию: `webdriver`

### baseUrl

Сокращение вызовов команды `url` путем установки базового URL.
- Если ваш параметр `url` начинается с `/`, то `baseUrl` добавляется в начало (кроме пути `baseUrl`, если он есть).
- Если ваш параметр `url` начинается без схемы или `/` (например, `some/path`), то полный `baseUrl` добавляется в начало напрямую.

Тип: `String`<br />
По умолчанию: `null`

### waitforTimeout

Таймаут по умолчанию для всех команд `waitFor*`. (Обратите внимание на строчную букву `f` в названии опции.) Этот таймаут __только__ влияет на команды, начинающиеся с `waitFor*`, и их время ожидания по умолчанию.

Чтобы увеличить таймаут для _теста_, пожалуйста, смотрите документацию фреймворка.

Тип: `Number`<br />
По умолчанию: `5000`

### waitforInterval

Интервал по умолчанию для всех команд `waitFor*` для проверки, изменилось ли ожидаемое состояние (например, видимость).

Тип: `Number`<br />
По умолчанию: `100`

### region

При запуске на Sauce Labs вы можете выбрать запуск тестов между разными центрами обработки данных: US или EU.
Чтобы изменить регион на EU, добавьте `region: 'eu'` в вашу конфигурацию.

__Примечание:__ Это действует только если вы предоставляете опции `user` и `key`, связанные с вашей учетной записью Sauce Labs.

Тип: `String`<br />
По умолчанию: `us`

*(только для виртуальных машин и/или эмуляторов/симуляторов)*

---

## Опции тестового раннера

Следующие опции (включая перечисленные выше) определены только для запуска WebdriverIO с тестовым раннером WDIO:

### specs

Определите спецификации для выполнения тестов. Вы можете указать glob-шаблон для сопоставления нескольких файлов одновременно или обернуть glob или набор путей в массив для их запуска в рамках одного рабочего процесса. Все пути рассматриваются как относительные от пути файла конфигурации.

Тип: `(String | String[])[]`<br />
По умолчанию: `[]`

### exclude

Исключите спецификации из выполнения тестов. Все пути рассматриваются как относительные от пути файла конфигурации.

Тип: `String[]`<br />
По умолчанию: `[]`

### suites

Объект, описывающий различные наборы, которые затем можно указать с помощью опции `--suite` в CLI `wdio`.

Тип: `Object`<br />
По умолчанию: `{}`

### capabilities

То же, что и раздел `capabilities`, описанный выше, за исключением возможности указать либо объект [`multiremote`](/docs/multiremote), либо несколько сессий WebDriver в массиве для параллельного выполнения.

Вы можете применять те же вендорные и браузерные возможности, как определено [выше](/docs/configuration#capabilities).

Тип: `Object`|`Object[]`<br />
По умолчанию: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

Максимальное количество параллельно работающих экземпляров.

__Примечание:__ это может быть число до `100`, когда тесты выполняются на внешних серверах, таких как машины Sauce Labs. Там тесты выполняются не на одной машине, а на нескольких виртуальных машинах. Если тесты выполняются на локальной машине разработки, используйте более разумное число, например `3`, `4` или `5`. По сути, это количество браузеров, которые будут одновременно запущены и выполняют ваши тесты одновременно, поэтому это зависит от объема оперативной памяти на вашей машине и количества других запущенных приложений.

Вы также можете применить `maxInstances` в объектах возможностей, используя возможность `wdio:maxInstances`. Это ограничит количество параллельных сессий для этой конкретной возможности.

Тип: `Number`<br />
По умолчанию: `100`

### maxInstancesPerCapability

Максимальное количество параллельно работающих экземпляров на одну возможность.

Тип: `Number`<br />
По умолчанию: `100`

### injectGlobals

Вставляет глобальные объекты WebdriverIO (например, `browser`, `$` и `$$`) в глобальное окружение.
Если вы установите значение `false`, вам следует импортировать из `@wdio/globals`, например:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Примечание: WebdriverIO не обрабатывает внедрение глобальных объектов, специфичных для тестового фреймворка.

Тип: `Boolean`<br />
По умолчанию: `true`

### bail

Если вы хотите, чтобы ваш тестовый запуск останавливался после определенного количества сбоев тестов, используйте `bail`.
(По умолчанию `0`, что означает выполнение всех тестов независимо от результата.) **Примечание:** тестом в этом контексте являются все тесты в одном файле спецификации (при использовании Mocha или Jasmine) или все шаги в файле функций (при использовании Cucumber). Если вы хотите контролировать поведение bail внутри тестов одного тестового файла, посмотрите доступные опции [фреймворка](frameworks).

Тип: `Number`<br />
По умолчанию: `0` (не останавливаться; выполнять все тесты)

### specFileRetries

Количество повторных попыток для всего файла спецификации, когда он полностью не проходит.

Тип: `Number`<br />
По умолчанию: `0`

### specFileRetriesDelay

Задержка в секундах между попытками повторного запуска файла спецификации

Тип: `Number`<br />
По умолчанию: `0`

### specFileRetriesDeferred

Должны ли повторные попытки файлов спецификации выполняться немедленно или откладываться в конец очереди.

Тип: `Boolean`<br />
По умолчанию: `true`

### groupLogsByTestSpec

Выберите представление вывода лога.

Если установлено в `false`, логи из разных тестовых файлов будут выводиться в реальном времени. Обратите внимание, что это может привести к смешиванию выводов логов из разных файлов при параллельном выполнении.

Если установлено в `true`, выводы логов будут сгруппированы по тестовой спецификации и выведены только по завершении тестовой спецификации.

По умолчанию установлено значение `false`, поэтому логи выводятся в реальном времени.

Тип: `Boolean`<br />
По умолчанию: `false`

### autoAssertOnTestEnd

Управляет тем, автоматически ли WebdriverIO проверяет все мягкие утверждения в конце каждого теста. Когда установлено значение `true`, любые накопленные мягкие утверждения будут автоматически проверены и вызовут сбой теста, если какие-либо утверждения не прошли. Когда установлено значение `false`, вы должны вручную вызвать метод assert для проверки мягких утверждений.

Тип: `Boolean`<br />
По умолчанию: `true`

### services

Сервисы выполняют определенную работу, о которой вы не хотите заботиться. Они улучшают вашу тестовую настройку практически без усилий.

Тип: `String[]|Object[]`<br />
По умолчанию: `[]`

### framework

Определяет тестовый фреймворк, который будет использоваться тестовым раннером WDIO.

Тип: `String`<br />
По умолчанию: `mocha`<br />
Варианты: `mocha` | `jasmine`

### mochaOpts, jasmineOpts и cucumberOpts

Специфические для фреймворка опции. См. документацию адаптера фреймворка о том, какие опции доступны. Подробнее об этом в [Frameworks](frameworks).

Тип: `Object`<br />
По умолчанию: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

Список функций cucumber с номерами строк (при [использовании фреймворка cucumber](./Frameworks.md#using-cucumber)).

Тип: `String[]`
По умолчанию: `[]`

### reporters

Список репортеров для использования. Репортер может быть либо строкой, либо массивом
`['reporterName', { /* reporter options */}]`, где первый элемент - строка с именем репортера, а второй элемент - объект с опциями репортера.

Тип: `String[]|Object[]`<br />
По умолчанию: `[]`

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

Определяет, с каким интервалом репортер должен проверять, синхронизированы ли они, если они сообщают свои логи асинхронно (например, если логи передаются стороннему поставщику).

Тип: `Number`<br />
По умолчанию: `100` (мс)

### reporterSyncTimeout

Определяет максимальное время, которое репортеры имеют для завершения загрузки всех своих логов, пока тестовый раннер не выдаст ошибку.

Тип: `Number`<br />
По умолчанию: `5000` (мс)

### execArgv

Аргументы Node для указания при запуске дочерних процессов.

Тип: `String[]`<br />
По умолчанию: `null`

### filesToWatch

Список шаблонов строк с поддержкой glob, которые указывают тестовому раннеру дополнительно отслеживать другие файлы, например, файлы приложения, при запуске с флагом `--watch`. По умолчанию тестовый раннер уже отслеживает все файлы спецификаций.

Тип: `String[]`<br />
По умолчанию: `[]`

### updateSnapshots

Установите в true, если вы хотите обновить свои снимки. Идеально использовать как часть параметра CLI, например, `wdio run wdio.conf.js --s`.

Тип: `'new' | 'all' | 'none'`<br />
По умолчанию: `none`, если не указано и тесты выполняются в CI, `new`, если не указано, в противном случае то, что было указано

### resolveSnapshotPath

Переопределяет путь к снимку по умолчанию. Например, для хранения снимков рядом с тестовыми файлами.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

Тип: `(testPath: string, snapExtension: string) => string`<br />
По умолчанию: хранит файлы снимков в директории `__snapshots__` рядом с тестовым файлом

### tsConfigPath

WDIO использует `tsx` для компиляции файлов TypeScript. Ваш TSConfig автоматически обнаруживается из текущего рабочего каталога, но вы можете указать пользовательский путь здесь или установив переменную окружения TSX_TSCONFIG_PATH.

См. документацию `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

Тип: `String`<br />
По умолчанию: `null`<br />

## Хуки

Тестовый раннер WDIO позволяет устанавливать хуки, которые запускаются в определенные моменты жизненного цикла теста. Это позволяет выполнять пользовательские действия (например, делать скриншот, если тест не проходит).

Каждый хук имеет в качестве параметра специфическую информацию о жизненном цикле (например, информацию о тестовом наборе или тесте). Подробнее о всех свойствах хуков читайте в [нашем примере конфигурации](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Примечание:** Некоторые хуки (`onPrepare`, `onWorkerStart`, `onWorkerEnd` и `onComplete`) выполняются в другом процессе и поэтому не могут делиться глобальными данными с другими хуками, которые живут в рабочем процессе.

### onPrepare

Выполняется один раз перед запуском всех рабочих процессов.

Параметры:

- `config` (`object`): объект конфигурации WebdriverIO
- `param` (`object[]`): список деталей возможностей

### onWorkerStart

Выполняется перед созданием рабочего процесса и может использоваться для инициализации конкретных сервисов для этого рабочего процесса, а также для модификации среды выполнения асинхронным образом.

Параметры:

- `cid` (`string`): идентификатор возможности (например, 0-0)
- `caps` (`object`): возможности для сессии, которая будет создана в рабочем процессе
- `specs` (`string[]`): спецификации для выполнения в рабочем процессе
- `args` (`object`): объект, который будет объединен с основной конфигурацией после инициализации рабочего процесса
- `execArgv` (`string[]`): список строковых аргументов, переданных рабочему процессу

### onWorkerEnd

Выполняется сразу после завершения рабочего процесса.

Параметры:

- `cid` (`string`): идентификатор возможности (например, 0-0)
- `exitCode` (`number`): 0 - успех, 1 - ошибка
- `specs` (`string[]`): спецификации, выполняемые в рабочем процессе
- `retries` (`number`): количество повторных попыток на уровне спецификации, как определено в [_"Добавление повторных попыток на основе файла спецификации"_](./Retry.md#add-retries-on-a-per-specfile-basis)

### beforeSession

Выполняется непосредственно перед инициализацией сессии webdriver и тестового фреймворка. Позволяет манипулировать конфигурациями в зависимости от возможностей или спецификации.

Параметры:

- `config` (`object`): объект конфигурации WebdriverIO
- `caps` (`object`): возможности для сессии, которая будет создана в рабочем процессе
- `specs` (`string[]`): спецификации для выполнения в рабочем процессе

### before

Выполняется перед началом выполнения теста. На этом этапе вы можете получить доступ ко всем глобальным переменным, таким как `browser`. Это идеальное место для определения пользовательских команд.

Параметры:

- `caps` (`object`): возможности для сессии, которая будет создана в рабочем процессе
- `specs` (`string[]`): спецификации для выполнения в рабочем процессе
- `browser` (`object`): экземпляр созданной сессии браузера/устройства

### beforeSuite

Хук, который выполняется перед началом набора (только в Mocha/Jasmine)

Параметры:

- `suite` (`object`): детали набора

### beforeHook

Хук, который выполняется *перед* хуком внутри набора (например, выполняется перед вызовом beforeEach в Mocha)

Параметры:

- `test` (`object`): детали теста
- `context` (`object`): контекст теста (представляет объект World в Cucumber)

### afterHook

Хук, который выполняется *после* завершения хука внутри набора (например, выполняется после вызова afterEach в Mocha)

Параметры:

- `test` (`object`): детали теста
- `context` (`object`): контекст теста (представляет объект World в Cucumber)
- `result` (`object`): результат хука (содержит свойства `error`, `result`, `duration`, `passed`, `retries`)

### beforeTest

Функция, выполняемая перед тестом (только в Mocha/Jasmine).

Параметры:

- `test` (`object`): детали теста
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
- `result` (`number`): 0 - успех команды, 1 - ошибка команды
- `error` (`Error`): объект ошибки, если есть

### afterTest

Функция, выполняемая после завершения теста (в Mocha/Jasmine).

Параметры:

- `test` (`object`): детали теста
- `context` (`object`): объект области видимости, с которым был выполнен тест
- `result.error` (`Error`): объект ошибки в случае неудачи теста, иначе `undefined`
- `result.result` (`Any`): возвращаемый объект тестовой функции
- `result.duration` (`Number`): продолжительность теста
- `result.passed` (`Boolean`): true, если тест прошел, иначе false
- `result.retries` (`Object`): информация о повторных попытках отдельных тестов, как определено для [Mocha и Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha), а также [Cucumber](./Retry.md#rerunning-in-cucumber), например, `{ attempts: 0, limit: 0 }`, см.
- `result` (`object`): результат хука (содержит свойства `error`, `result`, `duration`, `passed`, `retries`)

### afterSuite

Хук, который выполняется после завершения набора (только в Mocha/Jasmine)

Параметры:

- `suite` (`object`): детали набора

### after

Выполняется после завершения всех тестов. У вас все еще есть доступ ко всем глобальным переменным из теста.

Параметры:

- `result` (`number`): 0 - тест пройден, 1 - тест не пройден
- `caps` (`object`): возможности для сессии, которая будет создана в рабочем процессе
- `specs` (`string[]`): спецификации для выполнения в рабочем процессе

### afterSession

Выполняется сразу после завершения сессии webdriver.

Параметры:

- `config` (`object`): объект конфигурации WebdriverIO
- `caps` (`object`): возможности для сессии, которая будет создана в рабочем процессе
- `specs` (`string[]`): спецификации для выполнения в рабочем процессе

### onComplete

Выполняется после завершения работы всех рабочих процессов и перед завершением процесса. Ошибка, возникшая в хуке onComplete, приведет к сбою тестового запуска.

Параметры:

- `exitCode` (`number`): 0 - успех, 1 - ошибка
- `config` (`object`): объект конфигурации WebdriverIO
- `caps` (`object`): возможности для сессии, которая будет создана в рабочем процессе
- `result` (`object`): объект результатов, содержащий результаты тестов

### onReload

Выполняется при обновлении.

Параметры:

- `oldSessionId` (`string`): ID старой сессии
- `newSessionId` (`string`): ID новой сессии

### beforeFeature

Выполняется перед функцией Cucumber.

Параметры:

- `uri` (`string`): путь к файлу функции
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): объект функции Cucumber

### afterFeature

Выполняется после функции Cucumber.

Параметры:

- `uri` (`string`): путь к файлу функции
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): объект функции Cucumber

### beforeScenario

Выполняется перед сценарием Cucumber.

Параметры:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): объект мира, содержащий информацию о pickle и тестовом шаге
- `context` (`object`): объект мира Cucumber

### afterScenario

Выполняется после сценария Cucumber.

Параметры:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): объект мира, содержащий информацию о pickle и тестовом шаге
- `result` (`object`): объект результатов, содержащий результаты сценария
- `result.passed` (`boolean`): true, если сценарий прошел
- `result.error` (`string`): стек ошибки, если сценарий не прошел
- `result.duration` (`number`): продолжительность сценария в миллисекундах
- `context` (`object`): объект мира Cucumber

### beforeStep

Выполняется перед шагом Cucumber.

Параметры:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): объект шага Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): объект сценария Cucumber
- `context` (`object`): объект мира Cucumber

### afterStep

Выполняется после шага Cucumber.

Параметры:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): объект шага Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): объект сценария Cucumber
- `result`: (`object`): объект результатов, содержащий результаты шагов
- `result.passed` (`boolean`): true, если сценарий прошел
- `result.error` (`string`): стек ошибки, если сценарий не прошел
- `result.duration` (`number`): продолжительность сценария в миллисекундах
- `context` (`object`): объект мира Cucumber

### beforeAssertion

Хук, который выполняется перед утверждением WebdriverIO.

Параметры:

- `params`: информация об утверждении
- `params.matcherName` (`string`): имя сопоставителя (например, `toHaveTitle`)
- `params.expectedValue`: значение, которое передается в сопоставитель
- `params.options`: опции утверждения

### afterAssertion

Хук, который выполняется после утверждения WebdriverIO.

Параметры:

- `params`: информация об утверждении
- `params.matcherName` (`string`): имя сопоставителя (например, `toHaveTitle`)
- `params.expectedValue`: значение, которое передается в сопоставитель
- `params.options`: опции утверждения
- `params.result`: результаты утверждения