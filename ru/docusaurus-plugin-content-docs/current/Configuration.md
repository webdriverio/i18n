---
id: configuration
title: Конфигурация
---

В зависимости от [типа настройки](/docs/setuptypes) (например, использование необработанных привязок протокола, WebdriverIO в качестве отдельного пакета или тестового исполнителя WDIO) доступен различный набор опций для управления окружением.

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

Ваше имя пользователя облачного сервиса (работает только для учетных записей [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) или [TestMu AI](https://www.testmuai.com/)). Если установлено, WebdriverIO автоматически настроит параметры подключения для вас. Если вы не используете облачного провайдера, это можно использовать для аутентификации любого другого бэкенда WebDriver.

Тип: `String`<br />
По умолчанию: `undefined`

### key

Ваш ключ доступа или секретный ключ облачного сервиса (работает только для учетных записей [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) или [TestMu AI](https://www.testmuai.com/)). Если установлено, WebdriverIO автоматически настроит параметры подключения для вас. Если вы не используете облачного провайдера, это можно использовать для аутентификации любого другого бэкенда WebDriver.

Тип: `String`<br />
По умолчанию: `undefined`

### capabilities

Определяет возможности, которые вы хотите использовать в своей сессии WebDriver. Ознакомьтесь с [протоколом WebDriver](https://w3c.github.io/webdriver/#capabilities) для получения дополнительной информации. Если вы используете более старый драйвер, который не поддерживает протокол WebDriver, вам нужно будет использовать [возможности JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) для успешного запуска сессии.

Помимо возможностей на основе WebDriver, вы можете применять специфические опции для браузера и поставщика, которые позволяют более глубоко настраивать удаленный браузер или устройство. Они документированы в соответствующей документации поставщика, например:

- `goog:chromeOptions`: для [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: для [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: для [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: для [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: для [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: для [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Кроме того, полезным инструментом является [Конфигуратор автоматизированных тестов](https://docs.saucelabs.com/basics/platform-configurator/) Sauce Labs, который помогает создать этот объект, собирая вместе нужные вам возможности.

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

Если вы выполняете веб-тесты или нативные тесты на мобильных устройствах, `capabilities` отличается от протокола WebDriver. Смотрите [документацию Appium](https://appium.io/docs/en/latest/guides/caps/) для получения дополнительной информации.

### logLevel

Уровень подробности ведения журнала.

Тип: `String`<br />
По умолчанию: `info`<br />
Варианты: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

Директория для хранения всех файлов журнала тестового исполнителя (включая журналы репортеров и журналы `wdio`). Если не задано, все журналы передаются в `stdout`. Поскольку большинство репортеров созданы для записи в `stdout`, рекомендуется использовать эту опцию только для конкретных репортеров, для которых более логично отправлять отчет в файл (например, для репортера `junit`).

При запуске в автономном режиме единственным журналом, генерируемым WebdriverIO, будет журнал `wdio`.

Тип: `String`<br />
По умолчанию: `null`

### connectionRetryTimeout

Тайм-аут для любого запроса WebDriver к драйверу или грид.

Тип: `Number`<br />
По умолчанию: `120000`

### connectionRetryCount

Максимальное количество повторных попыток запроса к серверу Selenium.

Тип: `Number`<br />
По умолчанию: `3`

### agent

Позволяет использовать пользовательский [агент](https://www.npmjs.com/package/got#agent) `http`/`https`/`http2` для выполнения запросов.

Тип: `Object`<br />
По умолчанию:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

Указать пользовательские `headers` для передачи в каждый запрос WebDriver. Если ваш Selenium Grid требует Basic Authentication, мы рекомендуем передать заголовок `Authorization` через эту опцию для аутентификации ваших запросов WebDriver, например:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// Чтение имени пользователя и пароля из переменных окружения
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// Объединение имени пользователя и пароля с разделителем в виде двоеточия
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

Функция перехвата [опций HTTP-запроса](https://github.com/sindresorhus/got#options) перед выполнением запроса WebDriver

Тип: `(RequestOptions) => RequestOptions`<br />
По умолчанию: *нет*

### transformResponse

Функция перехвата объектов HTTP-ответа после получения ответа WebDriver. Функции передается исходный объект ответа в качестве первого аргумента и соответствующие `RequestOptions` в качестве второго аргумента.

Тип: `(Response, RequestOptions) => Response`<br />
По умолчанию: *нет*

### strictSSL

Требуется ли действительный SSL-сертификат.
Может быть установлено через переменные окружения `STRICT_SSL` или `strict_ssl`.

Тип: `Boolean`<br />
По умолчанию: `true`

### enableDirectConnect

Включить ли [функцию прямого подключения Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments).
Не делает ничего, если ответ не содержит соответствующих ключей при включенном флаге.

Тип: `Boolean`<br />
По умолчанию: `true`

### cacheDir

Путь к корню каталога кэша. Этот каталог используется для хранения всех драйверов, загруженных при попытке запустить сессию.

Тип: `String`<br />
По умолчанию: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

Для более безопасного ведения журнала, регулярные выражения, установленные с помощью `maskingPatterns`, могут скрывать конфиденциальную информацию из журнала.
 - Строковый формат — это регулярное выражение с флагами или без них (например, `/.../i`), разделенное запятыми для нескольких регулярных выражений.
 - Для получения дополнительной информации о шаблонах маскирования см. [раздел Шаблоны маскирования в README логгера WDIO](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

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

Определите протокол, который вы хотите использовать для автоматизации браузера. В настоящее время поддерживается только [`webdriver`](https://www.npmjs.com/package/webdriver), так как это основная технология автоматизации браузера, которую использует WebdriverIO.

Если вы хотите автоматизировать браузер с использованием другой технологии автоматизации, убедитесь, что вы установили это свойство на путь, который разрешается в модуль, соответствующий следующему интерфейсу:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * Запустить сессию автоматизации и вернуть WebdriverIO [монаду](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)
     * с соответствующими командами автоматизации. См. пакет [webdriver](https://www.npmjs.com/package/webdriver)
     * в качестве эталонной реализации
     *
     * @param {Capabilities.RemoteConfig} options Опции WebdriverIO
     * @param {Function} hook который позволяет изменять клиента перед тем, как он будет освобожден из функции
     * @param {PropertyDescriptorMap} userPrototype позволяет пользователю добавлять пользовательские команды протокола
     * @param {Function} customCommandWrapper позволяет изменять выполнение команды
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

Сокращение вызовов команды `url` путем установки базового URL.
- Если ваш параметр `url` начинается с `/`, то `baseUrl` добавляется в начало (за исключением пути `baseUrl`, если он есть).
- Если ваш параметр `url` начинается без схемы или `/` (например, `some/path`), то полный `baseUrl` добавляется в начало напрямую.

Тип: `String`<br />
По умолчанию: `null`

### waitforTimeout

Тайм-аут по умолчанию для всех команд `waitFor*`. (Обратите внимание на строчную `f` в названии опции.) Этот тайм-аут __только__ влияет на команды, начинающиеся с `waitFor*`, и их время ожидания по умолчанию.

Чтобы увеличить тайм-аут для _теста_, см. документацию по фреймворку.

Тип: `Number`<br />
По умолчанию: `5000`

### waitforInterval

Интервал по умолчанию для всех команд `waitFor*` для проверки изменения ожидаемого состояния (например, видимости).

Тип: `Number`<br />
По умолчанию: `100`

### region

При работе с Sauce Labs вы можете выбрать запуск тестов между разными центрами обработки данных: US или EU.
Чтобы изменить регион на EU, добавьте `region: 'eu'` в вашу конфигурацию.

__Примечание:__ Это действует только если вы предоставляете опции `user` и `key`, которые связаны с вашей учетной записью Sauce Labs.

Тип: `String`<br />
По умолчанию: `us`

*(только для виртуальных машин и/или эмуляторов/симуляторов)*

---

## Опции тестового исполнителя

Следующие опции (включая перечисленные выше) определены только для запуска WebdriverIO с тестовым исполнителем WDIO:

### specs

Определите спецификации для выполнения тестов. Вы можете либо указать шаблон glob для сопоставления нескольких файлов одновременно, либо обернуть glob или набор путей в массив, чтобы запустить их в одном процессе рабочего. Все пути рассматриваются как относительные от пути к файлу конфигурации.

Тип: `(String | String[])[]`<br />
По умолчанию: `[]`

### exclude

Исключить спецификации из выполнения тестов. Все пути рассматриваются как относительные от пути к файлу конфигурации.

Тип: `String[]`<br />
По умолчанию: `[]`

### suites

Объект, описывающий различные наборы, которые затем можно указать с помощью опции `--suite` в CLI `wdio`.

Тип: `Object`<br />
По умолчанию: `{}`

### capabilities

То же, что и раздел `capabilities`, описанный выше, за исключением возможности указать объект [`multiremote`](/docs/multiremote) или несколько сессий WebDriver в массиве для параллельного выполнения.

Вы можете применять те же специфические возможности поставщика и браузера, как определено [выше](/docs/configuration#capabilities).

Тип: `Object`|`Object[]`<br />
По умолчанию: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

Максимальное количество параллельно работающих рабочих процессов.

__Примечание:__ Это может быть число до `100`, когда тесты выполняются на внешних поставщиках, таких как машины Sauce Labs. Там тесты выполняются не на одной машине, а на нескольких виртуальных машинах. Если тесты должны выполняться на локальной машине разработки, используйте более разумное число, например `3`, `4` или `5`. По сути, это количество браузеров, которые будут одновременно запущены и выполнять ваши тесты одновременно, поэтому это зависит от объема ОЗУ на вашей машине и количества других приложений, запущенных на вашей машине.

Вы также можете применить `maxInstances` внутри объектов capability, используя возможность `wdio:maxInstances`. Это ограничит количество параллельных сессий для этой конкретной возможности.

Тип: `Number`<br />
По умолчанию: `100`

### maxInstancesPerCapability

Максимальное количество параллельно работающих рабочих процессов для каждой возможности.

Тип: `Number`<br />
По умолчанию: `100`

### injectGlobals

Вставляет глобальные переменные WebdriverIO (например, `browser`, `$` и `$$`) в глобальную среду.
Если вы установите значение `false`, вам следует импортировать из `@wdio/globals`, например:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Примечание: WebdriverIO не управляет внедрением глобальных переменных, специфичных для тестового фреймворка.

Тип: `Boolean`<br />
По умолчанию: `true`

### bail

Если вы хотите, чтобы ваш тестовый прогон останавливался после определенного количества неудачных тестов, используйте `bail`.
(По умолчанию `0`, что выполняет все тесты независимо от результата.) **Примечание:** Тест в этом контексте — это все тесты внутри одного файла спецификации (при использовании Mocha или Jasmine) или все шаги внутри файла функции (при использовании Cucumber). Если вы хотите контролировать поведение bail внутри тестов отдельного тестового файла, посмотрите доступные опции [фреймворка](frameworks).

Тип: `Number`<br />
По умолчанию: `0` (не bail; выполнять все тесты)

### specFileRetries

Количество попыток повторного выполнения всего файла спецификации, когда он полностью не проходит.

Тип: `Number`<br />
По умолчанию: `0`

### specFileRetriesDelay

Задержка в секундах между попытками повторного выполнения файла спецификации

Тип: `Number`<br />
По умолчанию: `0`

### specFileRetriesDeferred

Должны ли повторяемые файлы спецификации повторяться немедленно или откладываться в конец очереди.

Тип: `Boolean`<br />
По умолчанию: `true`

### groupLogsByTestSpec

Выберите вид вывода журнала.

Если установлено значение `false`, журналы из разных тестовых файлов будут выводиться в реальном времени. Обратите внимание, что это может привести к смешиванию выходных данных журнала из разных файлов при параллельном выполнении.

Если установлено значение `true`, выходные данные журнала будут сгруппированы по тестовой спецификации и выводиться только после завершения тестовой спецификации.

По умолчанию установлено значение `false`, поэтому журналы выводятся в реальном времени.

Тип: `Boolean`<br />
По умолчанию: `false`

### autoAssertOnTestEnd

Контролирует, автоматически ли WebdriverIO проверяет все мягкие утверждения в конце каждого теста. Когда установлено значение `true`, любые накопленные мягкие утверждения будут автоматически проверены, и если какие-либо утверждения не прошли, тест будет считаться неудачным. Когда установлено значение `false`, вы должны вручную вызвать метод assert для проверки мягких утверждений.

Тип: `Boolean`<br />
По умолчанию: `true`

### services

Сервисы выполняют определенную работу, о которой вы не хотите заботиться. Они улучшают вашу тестовую настройку с минимальными усилиями.

Тип: `String[]|Object[]`<br />
По умолчанию: `[]`

### framework

Определяет тестовый фреймворк, который будет использоваться тестовым исполнителем WDIO.

Тип: `String`<br />
По умолчанию: `mocha`<br />
Варианты: `mocha` | `jasmine`

### mochaOpts, jasmineOpts и cucumberOpts

Специфические для фреймворка опции. См. документацию адаптера фреймворка о доступных опциях. Подробнее об этом в разделе [Фреймворки](frameworks).

Тип: `Object`<br />
По умолчанию: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

Список функций cucumber с номерами строк (при [использовании фреймворка cucumber](./Frameworks.md#using-cucumber)).

Тип: `String[]`
По умолчанию: `[]`

### reporters

Список репортеров для использования. Репортер может быть либо строкой, либо массивом
`['reporterName', { /* reporter options */}]`, где первый элемент — строка с именем репортера, а второй элемент — объект с опциями репортера.

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

Определяет, в каком интервале репортер должен проверять, синхронизированы ли они, если они сообщают свои журналы асинхронно (например, если журналы передаются поставщику третьей стороны).

Тип: `Number`<br />
По умолчанию: `100` (мс)

### reporterSyncTimeout

Определяет максимальное время, которое репортеры имеют для завершения загрузки всех своих журналов до того, как тестовый исполнитель выдаст ошибку.

Тип: `Number`<br />
По умолчанию: `5000` (мс)

### execArgv

Аргументы Node для указания при запуске дочерних процессов.

Тип: `String[]`<br />
По умолчанию: `null`

### filesToWatch

Список шаблонов строк, поддерживающих glob, которые указывают тестовому исполнителю дополнительно следить за другими файлами, например, файлами приложения, при запуске с флагом `--watch`. По умолчанию тестовый исполнитель уже следит за всеми файлами спецификаций.

Тип: `String[]`<br />
По умолчанию: `[]`

### updateSnapshots

Установите значение true, если вы хотите обновить свои снимки. Идеально использовать как часть параметра CLI, например, `wdio run wdio.conf.js --s`.

Тип: `'new' | 'all' | 'none'`<br />
По умолчанию: `none` если не указано и тесты выполняются в CI, `new` если не указано, иначе то, что было указано

### resolveSnapshotPath

Переопределяет путь снимка по умолчанию. Например, для хранения снимков рядом с тестовыми файлами.

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

Тестовый исполнитель WDIO позволяет установить хуки, которые будут срабатывать в определенные моменты жизненного цикла теста. Это позволяет выполнять пользовательские действия (например, делать снимок экрана, если тест не прошел).

Каждый хук имеет в качестве параметра определенную информацию о жизненном цикле (например, информацию о тестовом наборе или тесте). Подробнее о всех свойствах хуков читайте в [нашем примере конфигурации](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Примечание:** Некоторые хуки (`onPrepare`, `onWorkerStart`, `onWorkerEnd` и `onComplete`) выполняются в другом процессе и поэтому не могут делиться глобальными данными с другими хуками, которые живут в рабочем процессе.

### onPrepare

Выполняется один раз перед запуском всех рабочих процессов.

Параметры:

- `config` (`object`): объект конфигурации WebdriverIO
- `param` (`object[]`): список деталей возможностей

### onWorkerStart

Выполняется перед созданием рабочего процесса и может использоваться для инициализации определенного сервиса для этого рабочего процесса, а также для изменения среды выполнения в асинхронном режиме.

Параметры:

- `cid` (`string`): идентификатор возможности (например, 0-0)
- `caps` (`object`): содержит возможности для сессии, которая будет создана в рабочем процессе
- `specs` (`string[]`): спецификации, которые будут выполнены в рабочем процессе
- `args` (`object`): объект, который будет объединен с основной конфигурацией после инициализации рабочего процесса
- `execArgv` (`string[]`): список строковых аргументов, переданных рабочему процессу

### onWorkerEnd

Выполняется сразу после завершения рабочего процесса.

Параметры:

- `cid` (`string`): идентификатор возможности (например, 0-0)
- `exitCode` (`number`): 0 - успех, 1 - неудача
- `specs` (`string[]`): спецификации, выполняемые в рабочем процессе
- `retries` (`number`): количество повторных попыток на уровне спецификации, определенных в [_"Добавить повторные попытки на основе файла спецификации"_](./Retry.md#add-retries-on-a-per-specfile-basis)

### beforeSession

Выполняется непосредственно перед инициализацией сессии webdriver и тестового фреймворка. Это позволяет манипулировать конфигурациями в зависимости от возможностей или спецификаций.

Параметры:

- `config` (`object`): объект конфигурации WebdriverIO
- `caps` (`object`): содержит возможности для сессии, которая будет создана в рабочем процессе
- `specs` (`string[]`): спецификации, выполняемые в рабочем процессе

### before

Выполняется до начала выполнения тестов. На этом этапе вы можете получить доступ ко всем глобальным переменным, таким как `browser`. Это идеальное место для определения пользовательских команд.

Параметры:

- `caps` (`object`): содержит возможности для сессии, которая будет создана в рабочем процессе
- `specs` (`string[]`): спецификации, выполняемые в рабочем процессе
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

Хук, который выполняется *после* хука внутри набора (например, выполняется после вызова afterEach в Mocha)

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

Запускается перед выполнением команды WebdriverIO.

Параметры:

- `commandName` (`string`): имя команды
- `args` (`*`): аргументы, которые получит команда

### afterCommand

Запускается после выполнения команды WebdriverIO.

Параметры:

- `commandName` (`string`): имя команды
- `args` (`*`): аргументы, которые получит команда
- `result` (`*`): результат команды
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
- `result.retries` (`Object`): информация о повторных попытках отдельного теста, как определено для [Mocha и Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha), а также для [Cucumber](./Retry.md#rerunning-in-cucumber), например, `{ attempts: 0, limit: 0 }`, см.
- `result` (`object`): результат хука (содержит свойства `error`, `result`, `duration`, `passed`, `retries`)

### afterSuite

Хук, который выполняется после завершения набора (только в Mocha/Jasmine)

Параметры:

- `suite` (`object`): детали набора

### after

Выполняется после завершения всех тестов. У вас по-прежнему есть доступ ко всем глобальным переменным из теста.

Параметры:

- `result` (`number`): 0 - тест пройден, 1 - тест не пройден
- `caps` (`object`): содержит возможности для сессии, которая будет создана в рабочем процессе
- `specs` (`string[]`): спецификации, выполняемые в рабочем процессе

### afterSession

Выполняется сразу после завершения сессии webdriver.

Параметры:

- `config` (`object`): объект конфигурации WebdriverIO
- `caps` (`object`): содержит возможности для сессии, которая будет создана в рабочем процессе
- `specs` (`string[]`): спецификации, выполняемые в рабочем процессе

### onComplete

Выполняется после того, как все рабочие процессы завершились, и процесс готов к завершению. Ошибка, возникшая в хуке onComplete, приведет к неудаче тестового запуска.

Параметры:

- `exitCode` (`number`): 0 - успех, 1 - неудача
- `config` (`object`): объект конфигурации WebdriverIO
- `caps` (`object`): содержит возможности для сессии, которая будет создана в рабочем процессе
- `result` (`object`): объект результатов, содержащий результаты тестов

### onReload

Выполняется при обновлении.

Параметры:

- `oldSessionId` (`string`): идентификатор старой сессии
- `newSessionId` (`string`): идентификатор новой сессии

### beforeFeature

Запускается перед функцией Cucumber.

Параметры:

- `uri` (`string`): путь к файлу функции
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): объект функции Cucumber

### afterFeature

Запускается после функции Cucumber.

Параметры:

- `uri` (`string`): путь к файлу функции
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): объект функции Cucumber

### beforeScenario

Запускается перед сценарием Cucumber.

Параметры:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): объект мира, содержащий информацию о pickle и шаге теста
- `context` (`object`): объект Cucumber World

### afterScenario

Запускается после сценария Cucumber.

Параметры:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): объект мира, содержащий информацию о pickle и шаге теста
- `result` (`object`): объект результатов, содержащий результаты сценария
- `result.passed` (`boolean`): true, если сценарий пройден
- `result.error` (`string`): стек ошибки, если сценарий не прошел
- `result.duration` (`number`): продолжительность сценария в миллисекундах
- `context` (`object`): объект Cucumber World

### beforeStep

Запускается перед шагом Cucumber.

Параметры:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): объект шага Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): объект сценария Cucumber
- `context` (`object`): объект Cucumber World

### afterStep

Запускается после шага Cucumber.

Параметры:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): объект шага Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): объект сценария Cucumber
- `result`: (`object`): объект результатов, содержащий результаты шага
- `result.passed` (`boolean`): true, если сценарий пройден
- `result.error` (`string`): стек ошибки, если сценарий не прошел
- `result.duration` (`number`): продолжительность сценария в миллисекундах
- `context` (`object`): объект Cucumber World

### beforeAssertion

Хук, который выполняется перед утверждением WebdriverIO.

Параметры:

- `params`: информация об утверждении
- `params.matcherName` (`string`): имя матчера (например, `toHaveTitle`)
- `params.expectedValue`: значение, которое передается в матчер
- `params.options`: опции утверждения

### afterAssertion

Хук, который выполняется после утверждения WebdriverIO.

Параметры:

- `params`: информация об утверждении
- `params.matcherName` (`string`): имя матчера (например, `toHaveTitle`)
- `params.expectedValue`: значение, которое передается в матчер
- `params.options`: опции утверждения
- `params.result`: результаты утверждения