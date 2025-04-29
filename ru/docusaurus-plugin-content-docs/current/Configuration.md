---
id: configuration
title: Конфигурация
---

В зависимости от [типа настройки](/docs/setuptypes) (например, использование необработанных привязок протокола, WebdriverIO в качестве отдельного пакета или тестраннера WDIO) доступен различный набор опций для управления средой.

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

Ваше имя пользователя облачного сервиса (работает только для аккаунтов [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) или [LambdaTest](https://www.lambdatest.com)). Если задано, WebdriverIO автоматически установит параметры соединения для вас. Если вы не используете облачного провайдера, это можно использовать для аутентификации на любом другом бэкенде WebDriver.

Тип: `String`<br />
По умолчанию: `undefined`

### key

Ваш ключ доступа или секретный ключ облачного сервиса (работает только для аккаунтов [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) или [LambdaTest](https://www.lambdatest.com)). Если задано, WebdriverIO автоматически установит параметры соединения для вас. Если вы не используете облачного провайдера, это можно использовать для аутентификации на любом другом бэкенде WebDriver.

Тип: `String`<br />
По умолчанию: `undefined`

### capabilities

Определяет возможности, которые вы хотите использовать в вашей сессии WebDriver. Подробнее см. в [WebDriver Protocol](https://w3c.github.io/webdriver/#capabilities). Если вы запускаете более старый драйвер, который не поддерживает протокол WebDriver, вам потребуется использовать [возможности JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) для успешного запуска сессии.

Помимо возможностей на основе WebDriver, вы можете применять специфические для браузера и вендора опции, которые позволяют более глубоко настраивать удаленный браузер или устройство. Они документированы в соответствующих документах вендоров, например:

- `goog:chromeOptions`: для [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: для [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: для [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: для [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: для [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: для [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Кроме того, полезным инструментом является [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) от Sauce Labs, который помогает создать этот объект, собирая вместе нужные вам возможности.

Тип: `Object`<br />
По умолчанию: `null`

**Пример:**

```js
{
    browserName: 'chrome', // опции: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // версия браузера
    platformName: 'Windows 10' // платформа ОС
}
```

Если вы выполняете веб-тесты или нативные тесты на мобильных устройствах, `capabilities` отличается от протокола WebDriver. Подробнее см. в [документации Appium](https://appium.github.io/appium.io/docs/en/writing-running-appium/caps/).

### logLevel

Уровень подробности логирования.

Тип: `String`<br />
По умолчанию: `info`<br />
Варианты: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

Директория для хранения всех лог-файлов тестраннера (включая логи репортеров и логи `wdio`). Если не установлено, все логи передаются в `stdout`. Поскольку большинство репортеров предназначены для вывода в `stdout`, рекомендуется использовать эту опцию только для определенных репортеров, где имеет смысл отправлять отчет в файл (например, репортер `junit`).

При запуске в автономном режиме единственным создаваемым логом будет лог `wdio`.

Тип: `String`<br />
По умолчанию: `null`

### connectionRetryTimeout

Тайм-аут для любого запроса WebDriver к драйверу или грид-системе.

Тип: `Number`<br />
По умолчанию: `120000`

### connectionRetryCount

Максимальное количество повторных попыток запроса к серверу Selenium.

Тип: `Number`<br />
По умолчанию: `3`

### agent

Позволяет использовать пользовательский [агент](https://www.npmjs.com/package/got#agent) для `http`/`https`/`http2` запросов.

Тип: `Object`<br />
По умолчанию:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

Укажите пользовательские `headers` для передачи в каждый запрос WebDriver. Если ваш Selenium Grid требует базовой аутентификации, мы рекомендуем передавать заголовок `Authorization` через эту опцию для аутентификации ваших запросов WebDriver, например:

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

Функция перехвата объектов HTTP-ответа после получения ответа WebDriver. Функции передается исходный объект ответа в качестве первого аргумента и соответствующие `RequestOptions` в качестве второго аргумента.

Тип: `(Response, RequestOptions) => Response`<br />
По умолчанию: *нет*

### strictSSL

Требуется ли действительный SSL-сертификат.
Может быть установлено через переменные окружения как `STRICT_SSL` или `strict_ssl`.

Тип: `Boolean`<br />
По умолчанию: `true`

### enableDirectConnect

Включить ли [функцию прямого подключения Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments).
Не делает ничего, если ответ не содержит соответствующие ключи, когда флаг включен.

Тип: `Boolean`<br />
По умолчанию: `true`

### cacheDir

Путь к корневой директории кэша. Эта директория используется для хранения всех драйверов, которые загружаются при попытке запустить сессию.

Тип: `String`<br />
По умолчанию: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

---

## WebdriverIO

Следующие опции (включая перечисленные выше) могут использоваться с WebdriverIO в автономном режиме:

### automationProtocol

Определите протокол, который вы хотите использовать для автоматизации браузера. В настоящее время поддерживается только [`webdriver`](https://www.npmjs.com/package/webdriver), так как это основная технология автоматизации браузера, используемая WebdriverIO.

Если вы хотите автоматизировать браузер с использованием другой технологии автоматизации, укажите свойство как путь к модулю, который соответствует следующему интерфейсу:

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
- Если ваш параметр `url` начинается с `/`, то `baseUrl` добавляется в начало (за исключением пути `baseUrl`, если он есть).
- Если ваш параметр `url` начинается без схемы или `/` (например, `some/path`), то полный `baseUrl` добавляется в начало напрямую.

Тип: `String`<br />
По умолчанию: `null`

### waitforTimeout

Тайм-аут по умолчанию для всех команд `waitFor*`. (Обратите внимание на строчную букву `f` в названии опции.) Этот тайм-аут __только__ влияет на команды, начинающиеся с `waitFor*`, и их время ожидания по умолчанию.

Чтобы увеличить тайм-аут для _теста_, см. документацию по фреймворку.

Тип: `Number`<br />
По умолчанию: `5000`

### waitforInterval

Интервал по умолчанию для всех команд `waitFor*` для проверки, изменилось ли ожидаемое состояние (например, видимость).

Тип: `Number`<br />
По умолчанию: `100`

### region

При запуске на Sauce Labs вы можете выбрать запуск тестов между разными центрами обработки данных: US или EU.
Чтобы изменить регион на EU, добавьте `region: 'eu'` в вашу конфигурацию.

__Примечание:__ Это действует только если вы предоставляете опции `user` и `key`, которые связаны с вашей учетной записью Sauce Labs.

Тип: `String`<br />
По умолчанию: `us`

*(только для виртуальных машин и/или эмуляторов/симуляторов)*

---

## Опции Testrunner

Следующие опции (включая перечисленные выше) определены только для запуска WebdriverIO с тестраннером WDIO:

### specs

Определите спецификации для выполнения тестов. Вы можете либо указать шаблон glob для сопоставления нескольких файлов одновременно, либо обернуть glob или набор путей в массив, чтобы запустить их в рамках одного рабочего процесса. Все пути рассматриваются как относительные от пути файла конфигурации.

Тип: `(String | String[])[]`<br />
По умолчанию: `[]`

### exclude

Исключить спецификации из выполнения теста. Все пути рассматриваются как относительные от пути файла конфигурации.

Тип: `String[]`<br />
По умолчанию: `[]`

### suites

Объект, описывающий различные наборы тестов, которые затем можно указать с помощью опции `--suite` в CLI `wdio`.

Тип: `Object`<br />
По умолчанию: `{}`

### capabilities

То же, что и раздел `capabilities`, описанный выше, за исключением возможности указать либо объект [`multiremote`](/docs/multiremote), либо несколько сессий WebDriver в массиве для параллельного выполнения.

Вы можете применять те же специфические для вендора и браузера возможности, как определено [выше](/docs/configuration#capabilities).

Тип: `Object`|`Object[]`<br />
По умолчанию: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

Максимальное количество параллельно работающих процессов.

__Примечание:__ это может быть число до `100`, когда тесты выполняются на внешних серверах, например, на машинах Sauce Labs. Там тесты выполняются не на одной машине, а на нескольких виртуальных машинах. Если тесты должны выполняться на локальной машине разработки, используйте разумное число, например, `3`, `4` или `5`. По сути, это количество браузеров, которые будут одновременно запущены и выполнять ваши тесты одновременно, поэтому это зависит от того, сколько оперативной памяти имеется на вашей машине и какие другие приложения запущены на вашей машине.

Вы также можете применить `maxInstances` в ваших объектах возможностей, используя возможность `wdio:maxInstances`. Это ограничит количество параллельных сессий для этой конкретной возможности.

Тип: `Number`<br />
По умолчанию: `100`

### maxInstancesPerCapability

Максимальное количество параллельно работающих процессов на каждую возможность.

Тип: `Number`<br />
По умолчанию: `100`

### injectGlobals

Вставляет глобальные переменные WebdriverIO (например, `browser`, `$` и `$$`) в глобальное окружение.
Если установить значение `false`, вы должны импортировать из `@wdio/globals`, например:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Примечание: WebdriverIO не управляет внедрением глобальных переменных, специфичных для тестового фреймворка.

Тип: `Boolean`<br />
По умолчанию: `true`

### bail

Если вы хотите, чтобы выполнение тестов останавливалось после определенного количества сбоев тестов, используйте `bail`.
(По умолчанию `0`, что означает запуск всех тестов независимо от результата.) **Примечание:** Тест в этом контексте - это все тесты в одном spec-файле (при использовании Mocha или Jasmine) или все шаги в файле функций (при использовании Cucumber). Если вы хотите контролировать поведение bail внутри тестов одного тестового файла, обратите внимание на доступные опции [фреймворка](frameworks).

Тип: `Number`<br />
По умолчанию: `0` (не останавливаться; запускать все тесты)

### specFileRetries

Количество повторных попыток выполнения всего spec-файла при его полном сбое.

Тип: `Number`<br />
По умолчанию: `0`

### specFileRetriesDelay

Задержка в секундах между попытками повторного выполнения spec-файла.

Тип: `Number`<br />
По умолчанию: `0`

### specFileRetriesDeferred

Следует ли повторно пытаться выполнить spec-файлы немедленно или отложить их до конца очереди.

Тип: `Boolean`<br />
По умолчанию: `true`

### groupLogsByTestSpec

Выберите вид вывода логов.

Если установлено значение `false`, логи из разных тестовых файлов будут выводиться в реальном времени. Обратите внимание, что это может привести к смешению выводов логов из разных файлов при параллельном запуске.

Если установлено значение `true`, выводы логов будут группироваться по Test Spec и выводиться только после завершения Test Spec.

По умолчанию установлено значение `false`, поэтому логи выводятся в реальном времени.

Тип: `Boolean`<br />
По умолчанию: `false`

### services

Сервисы берут на себя определенную работу, о которой вы не хотите заботиться. Они улучшают вашу настройку тестирования с минимальными усилиями.

Тип: `String[]|Object[]`<br />
По умолчанию: `[]`

### framework

Определяет тестовый фреймворк, который будет использоваться тестраннером WDIO.

Тип: `String`<br />
По умолчанию: `mocha`<br />
Варианты: `mocha` | `jasmine`

### mochaOpts, jasmineOpts и cucumberOpts

Специфические опции фреймворка. См. документацию адаптера фреймворка, какие опции доступны. Подробнее об этом в [Frameworks](frameworks).

Тип: `Object`<br />
По умолчанию: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

Список функций cucumber с номерами строк (при [использовании фреймворка cucumber](./Frameworks.md#using-cucumber)).

Тип: `String[]`
По умолчанию: `[]`

### reporters

Список репортеров для использования. Репортер может быть строкой или массивом
`['reporterName', { /* опции репортера */}]`, где первый элемент - строка с именем репортера, а второй элемент - объект с опциями репортера.

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

Определяет, с каким интервалом репортер должен проверять синхронизацию, если они сообщают свои логи асинхронно (например, если логи передаются сторонним вендорам).

Тип: `Number`<br />
По умолчанию: `100` (мс)

### reporterSyncTimeout

Определяет максимальное время, которое репортеры имеют для завершения загрузки всех своих логов до того, как тестраннер выдаст ошибку.

Тип: `Number`<br />
По умолчанию: `5000` (мс)

### execArgv

Аргументы Node для указания при запуске дочерних процессов.

Тип: `String[]`<br />
По умолчанию: `null`

### filesToWatch

Список шаблонов строк, поддерживающих glob, которые указывают тестраннеру дополнительно наблюдать за другими файлами, например, файлами приложения, при запуске с флагом `--watch`. По умолчанию тестраннер уже наблюдает за всеми spec-файлами.

Тип: `String[]`<br />
По умолчанию: `[]`

### updateSnapshots

Установите `true`, если вы хотите обновить ваши снапшоты. Идеально использовать как часть параметра CLI, например, `wdio run wdio.conf.js --s`.

Тип: `'new' | 'all' | 'none'`<br />
По умолчанию: `none`, если не указано и тесты запускаются в CI, `new`, если не указано, иначе то, что было указано

### resolveSnapshotPath

Переопределяет путь к снапшоту по умолчанию. Например, для хранения снапшотов рядом с тестовыми файлами.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

Тип: `(testPath: string, snapExtension: string) => string`<br />
По умолчанию: хранит файлы снапшотов в директории `__snapshots__` рядом с тестовым файлом

### tsConfigPath

WDIO использует `tsx` для компиляции файлов TypeScript. Ваш TSConfig автоматически определяется из текущей рабочей директории, но вы можете указать пользовательский путь здесь или установив переменную окружения TSX_TSCONFIG_PATH.

См. документацию `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

Тип: `String`<br />
По умолчанию: `null`<br />

## Хуки

Тестраннер WDIO позволяет устанавливать хуки, которые будут срабатывать в определенные моменты жизненного цикла теста. Это позволяет выполнять пользовательские действия (например, делать скриншот при сбое теста).

Каждый хук имеет в качестве параметра специфическую информацию о жизненном цикле (например, информацию о наборе тестов или тесте). Подробнее обо всех свойствах хуков читайте в [нашем примере конфигурации](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Примечание:** Некоторые хуки (`onPrepare`, `onWorkerStart`, `onWorkerEnd` и `onComplete`) выполняются в другом процессе и поэтому не могут обмениваться глобальными данными с другими хуками, которые живут в рабочем процессе.

### onPrepare

Выполняется один раз перед запуском всех работников.

Параметры:

- `config` (`object`): объект конфигурации WebdriverIO
- `param` (`object[]`): список деталей возможностей

### onWorkerStart

Выполняется перед запуском рабочего процесса и может использоваться для инициализации специфических сервисов для этого работника, а также для изменения среды выполнения асинхронно.

Параметры:

- `cid` (`string`): id возможности (например 0-0)
- `caps` (`object`): содержит возможности для сессии, которая будет создана в рабочем процессе
- `specs` (`string[]`): спецификации для запуска в рабочем процессе
- `args` (`object`): объект, который будет объединен с основной конфигурацией после инициализации работника
- `execArgv` (`string[]`): список строковых аргументов, переданных рабочему процессу

### onWorkerEnd

Выполняется сразу после завершения рабочего процесса.

Параметры:

- `cid` (`string`): id возможности (например 0-0)
- `exitCode` (`number`): 0 - успех, 1 - неудача
- `specs` (`string[]`): спецификации для запуска в рабочем процессе
- `retries` (`number`): количество используемых повторных попыток на уровне спецификации, как определено в [_"Add retries on a per-specfile basis"_](./Retry.md#add-retries-on-a-per-specfile-basis)

### beforeSession

Выполняется непосредственно перед инициализацией сессии webdriver и тестового фреймворка. Это позволяет манипулировать конфигурациями в зависимости от возможностей или спецификаций.

Параметры:

- `config` (`object`): объект конфигурации WebdriverIO
- `caps` (`object`): содержит возможности для сессии, которая будет создана в рабочем процессе
- `specs` (`string[]`): спецификации для запуска в рабочем процессе

### before

Выполняется перед началом выполнения тестов. В этот момент вы можете получить доступ ко всем глобальным переменным, таким как `browser`. Это идеальное место для определения пользовательских команд.

Параметры:

- `caps` (`object`): содержит возможности для сессии, которая будет создана в рабочем процессе
- `specs` (`string[]`): спецификации для запуска в рабочем процессе
- `browser` (`object`): экземпляр созданной сессии браузера/устройства

### beforeSuite

Хук, который выполняется перед началом набора тестов (только в Mocha/Jasmine)

Параметры:

- `suite` (`object`): детали набора тестов

### beforeHook

Хук, который выполняется *перед* хуком внутри набора тестов (например, выполняется перед вызовом beforeEach в Mocha)

Параметры:

- `test` (`object`): детали теста
- `context` (`object`): контекст теста (представляет собой объект World в Cucumber)

### afterHook

Хук, который выполняется *после* завершения хука внутри набора тестов (например, выполняется после вызова afterEach в Mocha)

Параметры:

- `test` (`object`): детали теста
- `context` (`object`): контекст теста (представляет собой объект World в Cucumber)
- `result` (`object`): результат хука (содержит свойства `error`, `result`, `duration`, `passed`, `retries`)

### beforeTest

Функция, которая выполняется перед тестом (только в Mocha/Jasmine).

Параметры:

- `test` (`object`): детали теста
- `context` (`object`): объект области видимости, с которым выполнялся тест

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

Функция, которая выполняется после завершения теста (в Mocha/Jasmine).

Параметры:

- `test` (`object`): детали теста
- `context` (`object`): объект области видимости, с которым выполнялся тест
- `result.error` (`Error`): объект ошибки в случае сбоя теста, иначе `undefined`
- `result.result` (`Any`): возвращаемый объект функции теста
- `result.duration` (`Number`): длительность теста
- `result.passed` (`Boolean`): true, если тест пройден, иначе false
- `result.retries` (`Object`): информация о повторных попытках отдельных тестов, как определено для [Mocha и Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha), а также [Cucumber](./Retry.md#rerunning-in-cucumber), например, `{ attempts: 0, limit: 0 }`, см.
- `result` (`object`): результат хука (содержит свойства `error`, `result`, `duration`, `passed`, `retries`)

### afterSuite

Хук, который выполняется после завершения набора тестов (только в Mocha/Jasmine)

Параметры:

- `suite` (`object`): детали набора тестов

### after

Выполняется после завершения всех тестов. У вас все еще есть доступ ко всем глобальным переменным из теста.

Параметры:

- `result` (`number`): 0 - тест пройден, 1 - тест не пройден
- `caps` (`object`): содержит возможности для сессии, которая будет создана в рабочем процессе
- `specs` (`string[]`): спецификации для запуска в рабочем процессе

### afterSession

Выполняется сразу после завершения сессии webdriver.

Параметры:

- `config` (`object`): объект конфигурации WebdriverIO
- `caps` (`object`): содержит возможности для сессии, которая будет создана в рабочем процессе
- `specs` (`string[]`): спецификации для запуска в рабочем процессе

### onComplete

Выполняется после завершения работы всех рабочих процессов и перед выходом из процесса. Ошибка, возникшая в хуке onComplete, приведет к сбою выполнения тестов.

Параметры:

- `exitCode` (`number`): 0 - успех, 1 - неудача
- `config` (`object`): объект конфигурации WebdriverIO
- `caps` (`object`): содержит возможности для сессии, которая будет создана в рабочем процессе
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

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): объект world, содержащий информацию о pickle и шаге теста
- `context` (`object`): объект Cucumber World

### afterScenario

Выполняется после сценария Cucumber.

Параметры:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): объект world, содержащий информацию о pickle и шаге теста
- `result` (`object`): объект результатов, содержащий результаты сценария
- `result.passed` (`boolean`): true, если сценарий пройден
- `result.error` (`string`): стек ошибки, если сценарий не пройден
- `result.duration` (`number`): длительность сценария в миллисекундах
- `context` (`object`): объект Cucumber World

### beforeStep

Выполняется перед шагом Cucumber.

Параметры:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): объект шага Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): объект сценария Cucumber
- `context` (`object`): объект Cucumber World

### afterStep

Выполняется после шага Cucumber.

Параметры:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): объект шага Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): объект сценария Cucumber
- `result`: (`object`): объект результатов, содержащий результаты шага
- `result.passed` (`boolean`): true, если сценарий пройден
- `result.error` (`string`): стек ошибки, если сценарий не пройден
- `result.duration` (`number`): длительность сценария в миллисекундах
- `context` (`object`): объект Cucumber World

### beforeAssertion

Хук, который выполняется перед проверкой WebdriverIO.

Параметры:

- `params`: информация о проверке
- `params.matcherName` (`string`): имя сопоставителя (например, `toHaveTitle`)
- `params.expectedValue`: значение, которое передается в сопоставитель
- `params.options`: опции проверки

### afterAssertion

Хук, который выполняется после проверки WebdriverIO.

Параметры:

- `params`: информация о проверке
- `params.matcherName` (`string`): имя сопоставителя (например, `toHaveTitle`)
- `params.expectedValue`: значение, которое передается в сопоставитель
- `params.options`: опции проверки
- `params.result`: результаты проверки