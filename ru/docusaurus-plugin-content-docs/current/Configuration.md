---
id: configuration
title: Конфигурация
---

В зависимости от [типа настройки](/docs/setuptypes) (например, использование необработанных привязок протокола, WebdriverIO в качестве отдельного пакета или тестраннера WDIO) доступен различный набор опций для управления окружением.

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

Ваше имя пользователя облачного сервиса (работает только для аккаунтов [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) или [LambdaTest](https://www.lambdatest.com)). Если установлено, WebdriverIO автоматически настроит параметры соединения для вас. Если вы не используете облачный провайдер, это можно использовать для аутентификации любого другого бэкенда WebDriver.

Тип: `String`<br />
По умолчанию: `undefined`

### key

Ваш ключ доступа или секретный ключ облачного сервиса (работает только для аккаунтов [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) или [LambdaTest](https://www.lambdatest.com)). Если установлено, WebdriverIO автоматически настроит параметры соединения для вас. Если вы не используете облачный провайдер, это можно использовать для аутентификации любого другого бэкенда WebDriver.

Тип: `String`<br />
По умолчанию: `undefined`

### capabilities

Определяет возможности, которые вы хотите использовать в вашей сессии WebDriver. Подробнее смотрите в [WebDriver Protocol](https://w3c.github.io/webdriver/#capabilities). Если вы используете старый драйвер, который не поддерживает протокол WebDriver, вам нужно использовать [возможности JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) для успешного запуска сессии.

Помимо возможностей на основе WebDriver, вы можете применять специфические для браузера и вендора параметры, которые позволяют более глубоко настраивать удаленный браузер или устройство. Они документированы в соответствующих документах вендора, например:

- `goog:chromeOptions`: для [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: для [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: для [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: для [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: для [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: для [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Кроме того, полезным инструментом является [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) от Sauce Labs, который помогает создать этот объект, подбирая нужные возможности.

Тип: `Object`<br />
По умолчанию: `null`

**Пример:**

```js
{
    browserName: 'chrome', // варианты: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // версия браузера
    platformName: 'Windows 10' // ОС платформа
}
```

Если вы запускаете веб-тесты или нативные тесты на мобильных устройствах, `capabilities` отличается от протокола WebDriver. Смотрите [документацию Appium](https://appium.io/docs/en/latest/guides/caps/) для получения дополнительной информации.

### logLevel

Уровень подробности логирования.

Тип: `String`<br />
По умолчанию: `info`<br />
Варианты: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

Директория для хранения всех файлов логов тестраннера (включая логи репортеров и логи `wdio`). Если не установлено, все логи направляются в `stdout`. Поскольку большинство репортеров предназначены для вывода в `stdout`, рекомендуется использовать эту опцию только для определенных репортеров, для которых имеет смысл записывать отчет в файл (например, репортер `junit`).

При запуске в автономном режиме WebdriverIO создает только лог `wdio`.

Тип: `String`<br />
По умолчанию: `null`

### connectionRetryTimeout

Тайм-аут для любого запроса WebDriver к драйверу или сетке.

Тип: `Number`<br />
По умолчанию: `120000`

### connectionRetryCount

Максимальное количество повторных запросов к серверу Selenium.

Тип: `Number`<br />
По умолчанию: `3`

### agent

Позволяет использовать пользовательский агент `http`/`https`/`http2` [agent](https://www.npmjs.com/package/got#agent) для выполнения запросов.

Тип: `Object`<br />
По умолчанию:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

Указывает пользовательские `headers` для передачи в каждый запрос WebDriver. Если ваша сетка Selenium требует базовой аутентификации, мы рекомендуем передавать заголовок `Authorization` через эту опцию для аутентификации ваших запросов WebDriver, например:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// Чтение имени пользователя и пароля из переменных окружения
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// Объединение имени пользователя и пароля с разделителем-двоеточием
const credentials = `${username}:${password}`;
// Кодирование учетных данных с использованием Base64
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

Функция, перехватывающая [опции HTTP-запроса](https://github.com/sindresorhus/got#options) перед выполнением запроса WebDriver

Тип: `(RequestOptions) => RequestOptions`<br />
По умолчанию: *нет*

### transformResponse

Функция, перехватывающая объекты HTTP-ответа после получения ответа WebDriver. Функции передается исходный объект ответа в качестве первого аргумента и соответствующие `RequestOptions` в качестве второго аргумента.

Тип: `(Response, RequestOptions) => Response`<br />
По умолчанию: *нет*

### strictSSL

Требуется ли действительный SSL-сертификат.
Может быть установлено через переменные окружения как `STRICT_SSL` или `strict_ssl`.

Тип: `Boolean`<br />
По умолчанию: `true`

### enableDirectConnect

Включить ли [функцию прямого подключения Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments).
Не выполняет никаких действий, если в ответе нет соответствующих ключей, когда флаг включен.

Тип: `Boolean`<br />
По умолчанию: `true`

### cacheDir

Путь к корневому каталогу кэша. Этот каталог используется для хранения всех драйверов, которые загружаются при попытке начать сессию.

Тип: `String`<br />
По умолчанию: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

Для более безопасного логирования регулярные выражения, установленные с помощью `maskingPatterns`, могут скрывать конфиденциальную информацию из лога.
 - Строковый формат представляет собой регулярное выражение с флагами или без них (например, `/.../i`) и разделенный запятыми для нескольких регулярных выражений.
 - Для получения дополнительной информации о шаблонах маскирования см. [раздел о шаблонах маскирования в README логгера WDIO](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

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

Следующие опции (включая перечисленные выше) могут быть использованы с WebdriverIO в автономном режиме:

### automationProtocol

Определите протокол, который вы хотите использовать для автоматизации браузера. В настоящее время поддерживается только [`webdriver`](https://www.npmjs.com/package/webdriver), так как это основная технология автоматизации браузера, используемая WebdriverIO.

Если вы хотите автоматизировать браузер с помощью другой технологии автоматизации, убедитесь, что вы установили это свойство на путь, который разрешается в модуль, соответствующий следующему интерфейсу:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * Запускает сессию автоматизации и возвращает [монаду](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts) WebdriverIO
     * с соответствующими командами автоматизации. См. пакет [webdriver](https://www.npmjs.com/package/webdriver)
     * в качестве эталонной реализации
     *
     * @param {Capabilities.RemoteConfig} options Опции WebdriverIO
     * @param {Function} hook позволяет модифицировать клиента перед его освобождением из функции
     * @param {PropertyDescriptorMap} userPrototype позволяет пользователю добавлять пользовательские команды протокола
     * @param {Function} customCommandWrapper позволяет модифицировать выполнение команды
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
     * Изменяет идентификатор сессии экземпляра и возможности браузера для новой сессии
     * непосредственно в переданном объекте браузера
     *
     * @optional
     * @param   {object} instance  объект, который мы получаем из новой сессии браузера.
     * @returns {string}           новый идентификатор сессии браузера
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

Сокращает вызовы команды `url` путем установки базового URL.
- Если ваш параметр `url` начинается с `/`, то `baseUrl` добавляется в начало (кроме пути `baseUrl`, если он есть).
- Если ваш параметр `url` начинается без схемы или `/` (например, `some/path`), то полный `baseUrl` добавляется непосредственно в начало.

Тип: `String`<br />
По умолчанию: `null`

### waitforTimeout

Тайм-аут по умолчанию для всех команд `waitFor*`. (Обратите внимание на строчную букву `f` в названии опции.) Этот тайм-аут __только__ влияет на команды, начинающиеся с `waitFor*`, и их время ожидания по умолчанию.

Чтобы увеличить тайм-аут для _теста_, смотрите документацию по фреймворку.

Тип: `Number`<br />
По умолчанию: `5000`

### waitforInterval

Интервал по умолчанию для всех команд `waitFor*` для проверки, изменилось ли ожидаемое состояние (например, видимость).

Тип: `Number`<br />
По умолчанию: `100`

### region

При работе с Sauce Labs вы можете выбрать запуск тестов между разными центрами обработки данных: US или EU.
Чтобы изменить регион на EU, добавьте `region: 'eu'` в вашу конфигурацию.

__Примечание:__ Это действует только если вы предоставили опции `user` и `key`, связанные с вашей учетной записью Sauce Labs.

Тип: `String`<br />
По умолчанию: `us`

*(только для vm и/или em/симуляторов)*

---

## Опции Testrunner

Следующие опции (включая перечисленные выше) определены только для запуска WebdriverIO с тестраннером WDIO:

### specs

Определяет спецификации для выполнения тестов. Вы можете указать шаблон glob для сопоставления нескольких файлов сразу или обернуть glob или набор путей в массив, чтобы запустить их в одном рабочем процессе. Все пути рассматриваются как относительные от пути к файлу конфигурации.

Тип: `(String | String[])[]`<br />
По умолчанию: `[]`

### exclude

Исключает спецификации из выполнения тестов. Все пути рассматриваются как относительные от пути к файлу конфигурации.

Тип: `String[]`<br />
По умолчанию: `[]`

### suites

Объект, описывающий различные наборы тестов, которые вы можете затем указать с помощью опции `--suite` в CLI `wdio`.

Тип: `Object`<br />
По умолчанию: `{}`

### capabilities

То же, что и раздел `capabilities`, описанный выше, за исключением возможности указать либо объект [`multiremote`](/docs/multiremote), либо несколько сессий WebDriver в массиве для параллельного выполнения.

Вы можете применять те же специфические для поставщика и браузера возможности, как определено [выше](/docs/configuration#capabilities).

Тип: `Object`|`Object[]`<br />
По умолчанию: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

Максимальное количество параллельно работающих воркеров.

__Примечание:__ это может быть число до `100`, когда тесты выполняются на внешних сервисах, таких как машины Sauce Labs. Там тесты проводятся не на одной машине, а на нескольких виртуальных машинах. Если тесты выполняются на локальной машине разработки, используйте более разумное число, например, `3`, `4` или `5`. По сути, это количество браузеров, которые будут одновременно запущены и выполнять ваши тесты одновременно, поэтому это зависит от объема оперативной памяти на вашей машине и того, сколько других приложений работает на вашей машине.

Вы также можете применять `maxInstances` в объектах capabilities, используя возможность `wdio:maxInstances`. Это ограничит количество параллельных сессий для этой конкретной возможности.

Тип: `Number`<br />
По умолчанию: `100`

### maxInstancesPerCapability

Максимальное количество параллельно работающих воркеров на одну возможность.

Тип: `Number`<br />
По умолчанию: `100`

### injectGlobals

Вставляет глобальные переменные WebdriverIO (например, `browser`, `$` и `$$`) в глобальное окружение.
Если вы установите значение `false`, вы должны импортировать из `@wdio/globals`, например:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Примечание: WebdriverIO не обрабатывает внедрение глобальных переменных, специфичных для тестового фреймворка.

Тип: `Boolean`<br />
По умолчанию: `true`

### bail

Если вы хотите, чтобы выполнение тестов останавливалось после определенного числа неудачных тестов, используйте `bail`.
(По умолчанию он равен `0`, что означает выполнение всех тестов независимо от результата.) **Примечание:** Тест в этом контексте - это все тесты в одном файле спецификации (при использовании Mocha или Jasmine) или все шаги в файле функции (при использовании Cucumber). Если вы хотите управлять поведением bail внутри тестов одного тестового файла, посмотрите доступные опции [фреймворка](frameworks).

Тип: `Number`<br />
По умолчанию: `0` (не останавливаться; выполнять все тесты)

### specFileRetries

Количество повторов всего файла спецификации, когда он полностью не проходит.

Тип: `Number`<br />
По умолчанию: `0`

### specFileRetriesDelay

Задержка в секундах между попытками повторного запуска файла спецификации.

Тип: `Number`<br />
По умолчанию: `0`

### specFileRetriesDeferred

Следует ли повторять файлы спецификаций немедленно или отложить их до конца очереди.

Тип: `Boolean`<br />
По умолчанию: `true`

### groupLogsByTestSpec

Выберите представление вывода логов.

Если установлено значение `false`, логи из разных тестовых файлов будут печататься в реальном времени. Обратите внимание, что это может привести к смешиванию выводов логов из разных файлов при параллельном выполнении.

Если установлено значение `true`, выводы логов будут сгруппированы по Тестовой Спецификации и печататься только после завершения Тестовой Спецификации.

По умолчанию установлено значение `false`, поэтому логи печатаются в реальном времени.

Тип: `Boolean`<br />
По умолчанию: `false`

### services

Сервисы выполняют определенную работу, о которой вы не хотите заботиться. Они улучшают вашу тестовую установку практически без усилий.

Тип: `String[]|Object[]`<br />
По умолчанию: `[]`

### framework

Определяет тестовый фреймворк, который будет использоваться тестраннером WDIO.

Тип: `String`<br />
По умолчанию: `mocha`<br />
Опции: `mocha` | `jasmine`

### mochaOpts, jasmineOpts и cucumberOpts

Специфические для фреймворка опции. См. документацию адаптера фреймворка для получения информации о доступных опциях. Подробнее об этом в [Frameworks](frameworks).

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

Определяет, в каком интервале репортер должен проверять, синхронизированы ли они, если они сообщают свои логи асинхронно (например, если логи передаются стороннему поставщику).

Тип: `Number`<br />
По умолчанию: `100` (мс)

### reporterSyncTimeout

Определяет максимальное время, которое репортеры имеют для завершения загрузки всех своих логов, пока тестраннер не выдаст ошибку.

Тип: `Number`<br />
По умолчанию: `5000` (мс)

### execArgv

Аргументы Node для указания при запуске дочерних процессов.

Тип: `String[]`<br />
По умолчанию: `null`

### filesToWatch

Список шаблонов строк, поддерживающих glob, которые указывают тестраннеру дополнительно отслеживать другие файлы, например, файлы приложения, при запуске с флагом `--watch`. По умолчанию тестраннер уже отслеживает все файлы спецификаций.

Тип: `String[]`<br />
По умолчанию: `[]`

### updateSnapshots

Установите в true, если вы хотите обновить ваши снапшоты. В идеале используется как часть параметра CLI, например, `wdio run wdio.conf.js --s`.

Тип: `'new' | 'all' | 'none'`<br />
По умолчанию: `none`, если не указано и тесты выполняются в CI, `new`, если не указано, в противном случае то, что было указано

### resolveSnapshotPath

Переопределяет путь к снапшоту по умолчанию. Например, для хранения снапшотов рядом с файлами тестов.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

Тип: `(testPath: string, snapExtension: string) => string`<br />
По умолчанию: сохраняет файлы снапшотов в директории `__snapshots__` рядом с файлом теста

### tsConfigPath

WDIO использует `tsx` для компиляции файлов TypeScript. Ваш TSConfig автоматически определяется из текущего рабочего каталога, но вы можете указать пользовательский путь здесь или установив переменную окружения TSX_TSCONFIG_PATH.

См. документацию `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

Тип: `String`<br />
По умолчанию: `null`<br />

## Хуки

Тестраннер WDIO позволяет установить хуки, которые будут вызываться в определенные моменты жизненного цикла теста. Это позволяет выполнять пользовательские действия (например, делать скриншот, если тест не пройден).

Каждый хук имеет в качестве параметра специфическую информацию о жизненном цикле (например, информацию о тестовом наборе или тесте). Подробнее о всех свойствах хуков в [нашем примере конфигурации](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Примечание:** Некоторые хуки (`onPrepare`, `onWorkerStart`, `onWorkerEnd` и `onComplete`) выполняются в другом процессе и поэтому не могут обмениваться глобальными данными с другими хуками, которые работают в рабочем процессе.

### onPrepare

Выполняется один раз перед запуском всех воркеров.

Параметры:

- `config` (`object`): объект конфигурации WebdriverIO
- `param` (`object[]`): список деталей возможностей

### onWorkerStart

Выполняется перед запуском рабочего процесса и может быть использован для инициализации определенного сервиса для этого воркера, а также для модификации среды выполнения асинхронным образом.

Параметры:

- `cid` (`string`): идентификатор возможности (например, 0-0)
- `caps` (`object`): содержит возможности для сессии, которая будет создана в воркере
- `specs` (`string[]`): спецификации, которые будут запущены в рабочем процессе
- `args` (`object`): объект, который будет объединен с основной конфигурацией после инициализации воркера
- `execArgv` (`string[]`): список строковых аргументов, переданных рабочему процессу

### onWorkerEnd

Выполняется сразу после завершения рабочего процесса.

Параметры:

- `cid` (`string`): идентификатор возможности (например, 0-0)
- `exitCode` (`number`): 0 - успех, 1 - неудача
- `specs` (`string[]`): спецификации, которые будут запущены в рабочем процессе
- `retries` (`number`): количество повторов на уровне спецификации, как определено в [_"Добавление повторов на основе спецификации"_](./Retry.md#add-retries-on-a-per-specfile-basis)

### beforeSession

Выполняется непосредственно перед инициализацией сессии webdriver и тестового фреймворка. Это позволяет манипулировать конфигурациями в зависимости от возможностей или спецификации.

Параметры:

- `config` (`object`): объект конфигурации WebdriverIO
- `caps` (`object`): содержит возможности для сессии, которая будет создана в воркере
- `specs` (`string[]`): спецификации, которые будут запущены в рабочем процессе

### before

Выполняется перед началом выполнения теста. На этом этапе вы можете получить доступ ко всем глобальным переменным, таким как `browser`. Это идеальное место для определения пользовательских команд.

Параметры:

- `caps` (`object`): содержит возможности для сессии, которая будет создана в воркере
- `specs` (`string[]`): спецификации, которые будут запущены в рабочем процессе
- `browser` (`object`): экземпляр созданной сессии браузера/устройства

### beforeSuite

Хук, который выполняется перед началом набора тестов (только в Mocha/Jasmine)

Параметры:

- `suite` (`object`): детали набора тестов

### beforeHook

Хук, который выполняется *перед* хуком внутри набора тестов (например, выполняется перед вызовом beforeEach в Mocha)

Параметры:

- `test` (`object`): детали теста
- `context` (`object`): контекст теста (представляет объект World в Cucumber)

### afterHook

Хук, который выполняется *после* завершения хука внутри набора тестов (например, выполняется после вызова afterEach в Mocha)

Параметры:

- `test` (`object`): детали теста
- `context` (`object`): контекст теста (представляет объект World в Cucumber)
- `result` (`object`): результат хука (содержит свойства `error`, `result`, `duration`, `passed`, `retries`)

### beforeTest

Функция, которая выполняется перед тестом (только в Mocha/Jasmine).

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

Функция, которая выполняется после завершения теста (в Mocha/Jasmine).

Параметры:

- `test` (`object`): детали теста
- `context` (`object`): объект области видимости, с которым был выполнен тест
- `result.error` (`Error`): объект ошибки в случае неудачи теста, иначе `undefined`
- `result.result` (`Any`): возвращаемый объект функции теста
- `result.duration` (`Number`): продолжительность теста
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
- `caps` (`object`): содержит возможности для сессии, которая будет создана в воркере
- `specs` (`string[]`): спецификации, которые будут запущены в рабочем процессе

### afterSession

Выполняется сразу после завершения сессии webdriver.

Параметры:

- `config` (`object`): объект конфигурации WebdriverIO
- `caps` (`object`): содержит возможности для сессии, которая будет создана в воркере
- `specs` (`string[]`): спецификации, которые будут запущены в рабочем процессе

### onComplete

Выполняется после завершения работы всех воркеров и перед выходом из процесса. Ошибка, возникающая в хуке onComplete, приведет к неудачному выполнению тестов.

Параметры:

- `exitCode` (`number`): 0 - успех, 1 - неудача
- `config` (`object`): объект конфигурации WebdriverIO
- `caps` (`object`): содержит возможности для сессии, которая будет создана в воркере
- `result` (`object`): объект результатов, содержащий результаты тестов

### onReload

Выполняется при обновлении.

Параметры:

- `oldSessionId` (`string`): идентификатор сессии старой сессии
- `newSessionId` (`string`): идентификатор сессии новой сессии

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

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): объект мира, содержащий информацию о выборке и шаге теста
- `context` (`object`): объект мира Cucumber

### afterScenario

Выполняется после сценария Cucumber.

Параметры:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): объект мира, содержащий информацию о выборке и шаге теста
- `result` (`object`): объект результатов, содержащий результаты сценария
- `result.passed` (`boolean`): true, если сценарий пройден
- `result.error` (`string`): стек ошибок, если сценарий не пройден
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
- `result`: (`object`): объект результатов, содержащий результаты шага
- `result.passed` (`boolean`): true, если сценарий пройден
- `result.error` (`string`): стек ошибок, если сценарий не пройден
- `result.duration` (`number`): продолжительность сценария в миллисекундах
- `context` (`object`): объект мира Cucumber

### beforeAssertion

Хук, который выполняется перед утверждением WebdriverIO.

Параметры:

- `params`: информация об утверждении
- `params.matcherName` (`string`): имя сопоставителя (например, `toHaveTitle`)
- `params.expectedValue`: значение, которое передается в сопоставитель
- `params.options`: параметры утверждения

### afterAssertion

Хук, который выполняется после утверждения WebdriverIO.

Параметры:

- `params`: информация об утверждении
- `params.matcherName` (`string`): имя сопоставителя (например, `toHaveTitle`)
- `params.expectedValue`: значение, которое передается в сопоставитель
- `params.options`: параметры утверждения
- `params.result`: результаты утверждения