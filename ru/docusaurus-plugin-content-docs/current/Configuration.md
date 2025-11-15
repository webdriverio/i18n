---
id: configuration
title: Конфигурация
---

В зависимости от [типа настройки](/docs/setuptypes) (например, использование привязок необработанного протокола, WebdriverIO как автономного пакета или тестового раннера WDIO) доступен различный набор опций для управления окружением.

## Опции WebDriver

Следующие опции определяются при использовании пакета протокола [`webdriver`](https://www.npmjs.com/package/webdriver):

### protocol

Протокол, используемый при взаимодействии с сервером драйвера.

Тип: `String`<br />
По умолчанию: `http`

### hostname

Хост вашего сервера драйвера.

Тип: `String`<br />
По умолчанию: `0.0.0.0`

### port

Порт, на котором находится ваш сервер драйвера.

Тип: `Number`<br />
По умолчанию: `undefined`

### path

Путь к конечной точке сервера драйвера.

Тип: `String`<br />
По умолчанию: `/`

### queryParams

Параметры запроса, которые передаются серверу драйвера.

Тип: `Object`<br />
По умолчанию: `undefined`

### user

Ваше имя пользователя облачного сервиса (работает только для аккаунтов [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) или [LambdaTest](https://www.lambdatest.com)). Если установлено, WebdriverIO автоматически настроит параметры подключения для вас. Если вы не используете облачного провайдера, это можно использовать для аутентификации любого другого бэкенда WebDriver.

Тип: `String`<br />
По умолчанию: `undefined`

### key

Ваш ключ доступа или секретный ключ облачного сервиса (работает только для аккаунтов [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) или [LambdaTest](https://www.lambdatest.com)). Если установлено, WebdriverIO автоматически настроит параметры подключения для вас. Если вы не используете облачного провайдера, это можно использовать для аутентификации любого другого бэкенда WebDriver.

Тип: `String`<br />
По умолчанию: `undefined`

### capabilities

Определяет возможности, которые вы хотите использовать в вашей сессии WebDriver. Более подробную информацию можно найти в [протоколе WebDriver](https://w3c.github.io/webdriver/#capabilities). Если вы используете старый драйвер, который не поддерживает протокол WebDriver, вам нужно использовать [возможности JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) для успешного запуска сессии.

Помимо основанных на WebDriver возможностей, вы можете применять специфичные для браузера и поставщика опции, которые позволяют более глубоко настраивать удаленный браузер или устройство. Они документированы в соответствующих документах поставщиков, например:

- `goog:chromeOptions`: для [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: для [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: для [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: для [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: для [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: для [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Кроме того, полезным инструментом является [Автоматический конфигуратор тестов](https://docs.saucelabs.com/basics/platform-configurator/) от Sauce Labs, который помогает создать этот объект, выбирая необходимые возможности.

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

Если вы выполняете веб-тесты или нативные тесты на мобильных устройствах, `capabilities` отличается от протокола WebDriver. Дополнительную информацию см. в [документации Appium](https://appium.io/docs/en/latest/guides/caps/).

### logLevel

Уровень подробности логирования.

Тип: `String`<br />
По умолчанию: `info`<br />
Варианты: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

Директория для хранения всех файлов логов тестового раннера (включая логи репортеров и логи `wdio`). Если не установлено, все логи будут выводиться в `stdout`. Поскольку большинство репортеров созданы для вывода в `stdout`, рекомендуется использовать эту опцию только для определенных репортеров, для которых имеет смысл отправлять отчеты в файл (например, репортер `junit`).

При работе в автономном режиме единственным логом, генерируемым WebdriverIO, будет лог `wdio`.

Тип: `String`<br />
По умолчанию: `null`

### connectionRetryTimeout

Время ожидания для любого запроса WebDriver к драйверу или грид-системе.

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

Указывает пользовательские `заголовки`, которые будут переданы в каждый запрос WebDriver. Если ваша сетка Selenium требует базовой аутентификации, мы рекомендуем передать заголовок `Authorization` через эту опцию для аутентификации ваших запросов WebDriver, например:

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

Функция, перехватывающая [опции HTTP-запроса](https://github.com/sindresorhus/got#options) перед выполнением запроса WebDriver

Тип: `(RequestOptions) => RequestOptions`<br />
По умолчанию: *нет*

### transformResponse

Функция, перехватывающая объекты HTTP-ответа после получения ответа WebDriver. Функция получает исходный объект ответа в качестве первого аргумента и соответствующий `RequestOptions` в качестве второго аргумента.

Тип: `(Response, RequestOptions) => Response`<br />
По умолчанию: *нет*

### strictSSL

Требуется ли действительный SSL-сертификат.
Может быть установлено через переменные среды как `STRICT_SSL` или `strict_ssl`.

Тип: `Boolean`<br />
По умолчанию: `true`

### enableDirectConnect

Включить ли [функцию прямого подключения Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments).
Не делает ничего, если ответ не содержит нужных ключей при включенном флаге.

Тип: `Boolean`<br />
По умолчанию: `true`

### cacheDir

Путь к корню директории кэша. Эта директория используется для хранения всех драйверов, загружаемых при попытке начать сессию.

Тип: `String`<br />
По умолчанию: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

Для более безопасного логирования регулярные выражения, установленные с помощью `maskingPatterns`, могут скрывать конфиденциальную информацию из лога.
 - Строковый формат представляет собой регулярное выражение с флагами или без них (например, `/.../i`) и разделяется запятыми для нескольких регулярных выражений.
 - Для получения дополнительной информации о паттернах маскирования см. [раздел "Паттерны маскирования" в README WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

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

Определяет протокол, который вы хотите использовать для автоматизации браузера. В настоящее время поддерживается только [`webdriver`](https://www.npmjs.com/package/webdriver), так как это основная технология автоматизации браузера, используемая WebdriverIO.

Если вы хотите автоматизировать браузер, используя другую технологию автоматизации, убедитесь, что вы установили это свойство на путь, который указывает на модуль, соответствующий следующему интерфейсу:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * Запускает сеанс автоматизации и возвращает [монаду](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts) WebdriverIO
     * с соответствующими командами автоматизации. См. пакет [webdriver](https://www.npmjs.com/package/webdriver)
     * в качестве эталонной реализации
     *
     * @param {Capabilities.RemoteConfig} options Опции WebdriverIO
     * @param {Function} hook позволяет модифицировать клиент перед его освобождением из функции
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
     * @param   {object} instance  объект, полученный из новой сессии браузера.
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
- Если параметр `url` начинается с `/`, то `baseUrl` добавляется в начало (за исключением пути `baseUrl`, если он есть).
- Если параметр `url` начинается без схемы или `/` (например, `some/path`), то полный `baseUrl` добавляется напрямую в начало.

Тип: `String`<br />
По умолчанию: `null`

### waitforTimeout

Время ожидания по умолчанию для всех команд `waitFor*`. (Обратите внимание на строчную букву `f` в названии опции.) Этот тайм-аут __только__ влияет на команды, начинающиеся с `waitFor*`, и их время ожидания по умолчанию.

Чтобы увеличить тайм-аут для _теста_, пожалуйста, обратитесь к документации фреймворка.

Тип: `Number`<br />
По умолчанию: `5000`

### waitforInterval

Интервал по умолчанию для всех команд `waitFor*` для проверки изменения ожидаемого состояния (например, видимости).

Тип: `Number`<br />
По умолчанию: `100`

### region

При работе с Sauce Labs вы можете выбрать запуск тестов между разными центрами обработки данных: США или ЕС.
Чтобы изменить регион на ЕС, добавьте `region: 'eu'` в вашу конфигурацию.

__Примечание:__ Это имеет эффект только если вы предоставляете опции `user` и `key`, которые связаны с вашей учетной записью Sauce Labs.

Тип: `String`<br />
По умолчанию: `us`

*(только для vm и/или em/симуляторов)*

---

## Опции тестового раннера

Следующие опции (включая перечисленные выше) определены только для запуска WebdriverIO с тестовым раннером WDIO:

### specs

Определяет спеки для выполнения тестов. Вы можете указать либо шаблон глобального поиска для соответствия нескольким файлам одновременно, либо обернуть глобальный шаблон или набор путей в массив, чтобы запустить их в рамках одного рабочего процесса. Все пути рассматриваются как относительные от пути файла конфигурации.

Тип: `(String | String[])[]`<br />
По умолчанию: `[]`

### exclude

Исключить спеки из выполнения тестов. Все пути рассматриваются как относительные от пути файла конфигурации.

Тип: `String[]`<br />
По умолчанию: `[]`

### suites

Объект, описывающий различные наборы тестов, которые затем можно указать с помощью опции `--suite` в CLI `wdio`.

Тип: `Object`<br />
По умолчанию: `{}`

### capabilities

То же самое, что и раздел `capabilities`, описанный выше, за исключением возможности указать либо объект [`multiremote`](/docs/multiremote), либо несколько сессий WebDriver в массиве для параллельного выполнения.

Вы можете применять те же специфичные для поставщика и браузера возможности, которые определены [выше](/docs/configuration#capabilities).

Тип: `Object`|`Object[]`<br />
По умолчанию: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

Максимальное количество параллельно работающих воркеров.

__Примечание:__ это может быть число до `100`, когда тесты выполняются на внешних поставщиках, таких как машины Sauce Labs. Там тесты проходят не на одной машине, а на нескольких виртуальных машинах. Если тесты будут запускаться на локальной машине разработки, используйте более разумное число, такое как `3`, `4` или `5`. По сути, это количество браузеров, которые будут одновременно запущены и выполнять ваши тесты в одно и то же время, поэтому это зависит от объема оперативной памяти на вашей машине и от того, какие другие приложения работают на вашей машине.

Вы также можете применить `maxInstances` внутри объектов возможностей, используя возможность `wdio:maxInstances`. Это ограничит количество параллельных сессий для конкретной возможности.

Тип: `Number`<br />
По умолчанию: `100`

### maxInstancesPerCapability

Максимальное количество параллельно работающих воркеров на одну возможность.

Тип: `Number`<br />
По умолчанию: `100`

### injectGlobals

Вставляет глобальные переменные WebdriverIO (например, `browser`, `$` и `$$`) в глобальное окружение.
Если вы установите в `false`, вам следует импортировать из `@wdio/globals`, например:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Примечание: WebdriverIO не обрабатывает внедрение глобальных переменных, специфичных для тестового фреймворка.

Тип: `Boolean`<br />
По умолчанию: `true`

### bail

Если вы хотите, чтобы ваш тестовый запуск останавливался после определенного количества неудачных тестов, используйте `bail`.
(По умолчанию `0`, что означает запуск всех тестов независимо от результата.) **Примечание:** Тест в этом контексте - это все тесты внутри одного файла спецификации (при использовании Mocha или Jasmine) или все шаги в файле функций (при использовании Cucumber). Если вы хотите контролировать поведение остановки внутри тестов одного тестового файла, ознакомьтесь с доступными опциями [фреймворка](frameworks).

Тип: `Number`<br />
По умолчанию: `0` (не останавливать; запускать все тесты)

### specFileRetries

Количество повторных попыток выполнения всего файла спецификации, когда он полностью не проходит.

Тип: `Number`<br />
По умолчанию: `0`

### specFileRetriesDelay

Задержка в секундах между попытками повторного выполнения файла спецификации

Тип: `Number`<br />
По умолчанию: `0`

### specFileRetriesDeferred

Следует ли повторно выполнять файлы спецификаций немедленно или отложить до конца очереди.

Тип: `Boolean`<br />
По умолчанию: `true`

### groupLogsByTestSpec

Выберите вид вывода логов.

Если установлено в `false`, логи из разных тестовых файлов будут выводиться в реальном времени. Обратите внимание, что это может привести к смешению выводов логов из разных файлов при параллельном выполнении.

Если установлено в `true`, выводы логов будут группироваться по тестовой спецификации и выводиться только после завершения тестовой спецификации.

По умолчанию установлено в `false`, поэтому логи выводятся в реальном времени.

Тип: `Boolean`<br />
По умолчанию: `false`

### autoAssertOnTestEnd

Контролирует, автоматически ли WebdriverIO проверяет все мягкие утверждения в конце каждого теста. При установке в `true` любые накопленные мягкие утверждения будут автоматически проверяться и вызывать неудачу теста, если какие-либо утверждения не прошли. При установке в `false` необходимо вручную вызывать метод assert для проверки мягких утверждений.

Тип: `Boolean`<br />
По умолчанию: `true`

### services

Сервисы выполняют определенную задачу, о которой вы не хотите заботиться. Они улучшают вашу тестовую настройку практически без усилий.

Тип: `String[]|Object[]`<br />
По умолчанию: `[]`

### framework

Определяет тестовый фреймворк, который будет использоваться тестовым раннером WDIO.

Тип: `String`<br />
По умолчанию: `mocha`<br />
Варианты: `mocha` | `jasmine`

### mochaOpts, jasmineOpts и cucumberOpts

Специфические для фреймворка опции. См. документацию адаптера фреймворка, чтобы узнать, какие опции доступны. Подробнее об этом в разделе [Фреймворки](frameworks).

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

Определяет, с каким интервалом репортер должен проверять, синхронизированы ли они, если они сообщают свои логи асинхронно (например, если логи передаются на сторонний сервер).

Тип: `Number`<br />
По умолчанию: `100` (мс)

### reporterSyncTimeout

Определяет максимальное время, которое репортеры имеют для завершения загрузки всех своих логов, прежде чем тестовый раннер выдаст ошибку.

Тип: `Number`<br />
По умолчанию: `5000` (мс)

### execArgv

Аргументы Node, которые нужно указать при запуске дочерних процессов.

Тип: `String[]`<br />
По умолчанию: `null`

### filesToWatch

Список шаблонов строк с поддержкой глобального поиска, которые указывают тестовому раннеру дополнительно отслеживать другие файлы, например, файлы приложений, при запуске с флагом `--watch`. По умолчанию тестовый раннер уже отслеживает все файлы спецификаций.

Тип: `String[]`<br />
По умолчанию: `[]`

### updateSnapshots

Установите в true, если вы хотите обновить свои снапшоты. Идеально использовать в качестве параметра CLI, например, `wdio run wdio.conf.js --s`.

Тип: `'new' | 'all' | 'none'`<br />
По умолчанию: `none` если не указано и тесты выполняются в CI, `new` если не указано, иначе то, что было указано

### resolveSnapshotPath

Переопределяет путь к снапшоту по умолчанию. Например, для хранения снапшотов рядом с тестовыми файлами.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

Тип: `(testPath: string, snapExtension: string) => string`<br />
По умолчанию: сохраняет файлы снапшотов в директорию `__snapshots__` рядом с тестовым файлом

### tsConfigPath

WDIO использует `tsx` для компиляции файлов TypeScript. Ваш TSConfig автоматически определяется из текущей рабочей директории, но вы можете указать пользовательский путь здесь или установив переменную окружения TSX_TSCONFIG_PATH.

См. документацию `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

Тип: `String`<br />
По умолчанию: `null`<br />

## Хуки

Тестовый раннер WDIO позволяет устанавливать хуки, которые будут вызываться в определенные моменты жизненного цикла теста. Это позволяет выполнять пользовательские действия (например, делать скриншот, если тест не прошел).

Каждый хук имеет в качестве параметра конкретную информацию о жизненном цикле (например, информацию о наборе тестов или тесте). Подробнее о всех свойствах хуков читайте в [нашем примере конфигурации](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Примечание:** Некоторые хуки (`onPrepare`, `onWorkerStart`, `onWorkerEnd` и `onComplete`) выполняются в другом процессе и поэтому не могут делиться глобальными данными с другими хуками, которые существуют в рабочем процессе.

### onPrepare

Выполняется один раз перед запуском всех воркеров.

Параметры:

- `config` (`object`): объект конфигурации WebdriverIO
- `param` (`object[]`): список деталей возможностей

### onWorkerStart

Выполняется перед созданием рабочего процесса и может использоваться для инициализации определенных сервисов для этого воркера, а также для модификации среды выполнения асинхронным способом.

Параметры:

- `cid` (`string`): идентификатор возможности (например, 0-0)
- `caps` (`object`): содержит возможности для сессии, которая будет создана в воркере
- `specs` (`string[]`): спеки, которые будут запущены в рабочем процессе
- `args` (`object`): объект, который будет объединен с основной конфигурацией после инициализации воркера
- `execArgv` (`string[]`): список строковых аргументов, переданных рабочему процессу

### onWorkerEnd

Выполняется сразу после завершения рабочего процесса.

Параметры:

- `cid` (`string`): идентификатор возможности (например, 0-0)
- `exitCode` (`number`): 0 - успех, 1 - неудача
- `specs` (`string[]`): спеки, запущенные в рабочем процессе
- `retries` (`number`): количество повторных попыток на уровне спека, используемых согласно [_"Добавление повторных попыток на основе спецификации"_](./Retry.md#add-retries-on-a-per-specfile-basis)

### beforeSession

Выполняется непосредственно перед инициализацией сессии webdriver и тестового фреймворка. Это позволяет манипулировать конфигурациями в зависимости от возможностей или спеков.

Параметры:

- `config` (`object`): объект конфигурации WebdriverIO
- `caps` (`object`): содержит возможности для сессии, которая будет создана в воркере
- `specs` (`string[]`): спеки, которые будут запущены в рабочем процессе

### before

Выполняется перед началом выполнения теста. В этот момент вы можете получить доступ ко всем глобальным переменным, таким как `browser`. Это идеальное место для определения пользовательских команд.

Параметры:

- `caps` (`object`): содержит возможности для сессии, созданной в воркере
- `specs` (`string[]`): спеки, запущенные в рабочем процессе
- `browser` (`object`): экземпляр созданной сессии браузера/устройства

### beforeSuite

Хук, который выполняется перед началом набора тестов (только в Mocha/Jasmine)

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
- `context` (`object`): объект области, с которым выполнялся тест

### beforeCommand

Выполняется перед выполнением команды WebdriverIO.

Параметры:

- `commandName` (`string`): имя команды
- `args` (`*`): аргументы, которые получит команда

### afterCommand

Выполняется после выполнения команды WebdriverIO.

Параметры:

- `commandName` (`string`): имя команды
- `args` (`*`): аргументы, которые получила команда
- `result` (`*`): результат команды
- `error` (`Error`): объект ошибки, если таковая имеется

### afterTest

Функция, выполняемая после завершения теста (в Mocha/Jasmine).

Параметры:

- `test` (`object`): детали теста
- `context` (`object`): объект области, с которым выполнялся тест
- `result.error` (`Error`): объект ошибки в случае неудачи теста, иначе `undefined`
- `result.result` (`Any`): возвращаемый объект тестовой функции
- `result.duration` (`Number`): продолжительность теста
- `result.passed` (`Boolean`): true, если тест прошел, иначе false
- `result.retries` (`Object`): информация о повторных попытках для отдельных тестов, как определено для [Mocha и Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha), а также [Cucumber](./Retry.md#rerunning-in-cucumber), например, `{ attempts: 0, limit: 0 }`, см.
- `result` (`object`): результат хука (содержит свойства `error`, `result`, `duration`, `passed`, `retries`)

### afterSuite

Хук, который выполняется после завершения набора тестов (только в Mocha/Jasmine)

Параметры:

- `suite` (`object`): детали набора

### after

Выполняется после завершения всех тестов. У вас по-прежнему есть доступ ко всем глобальным переменным из теста.

Параметры:

- `result` (`number`): 0 - тест пройден, 1 - тест не пройден
- `caps` (`object`): содержит возможности для сессии, созданной в воркере
- `specs` (`string[]`): спеки, запущенные в рабочем процессе

### afterSession

Выполняется сразу после завершения сессии webdriver.

Параметры:

- `config` (`object`): объект конфигурации WebdriverIO
- `caps` (`object`): содержит возможности для сессии, созданной в воркере
- `specs` (`string[]`): спеки, запущенные в рабочем процессе

### onComplete

Выполняется после того, как все воркеры завершили работу и процесс готов к завершению. Ошибка, возникшая в хуке onComplete, приведет к неудачному завершению тестового запуска.

Параметры:

- `exitCode` (`number`): 0 - успех, 1 - неудача
- `config` (`object`): объект конфигурации WebdriverIO
- `caps` (`object`): содержит возможности для сессии, созданной в воркере
- `result` (`object`): объект результатов, содержащий результаты тестов

### onReload

Выполняется при обновлении.

Параметры:

- `oldSessionId` (`string`): ID сессии старой сессии
- `newSessionId` (`string`): ID сессии новой сессии

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
- `context` (`object`): объект Cucumber World

### afterScenario

Выполняется после сценария Cucumber.

Параметры:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): объект мира, содержащий информацию о pickle и тестовом шаге
- `result` (`object`): объект результатов, содержащий результаты сценария
- `result.passed` (`boolean`): true, если сценарий пройден
- `result.error` (`string`): стек ошибок, если сценарий не пройден
- `result.duration` (`number`): продолжительность сценария в миллисекундах
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
- `result.error` (`string`): стек ошибок, если сценарий не пройден
- `result.duration` (`number`): продолжительность сценария в миллисекундах
- `context` (`object`): объект Cucumber World

### beforeAssertion

Хук, который выполняется перед выполнением утверждения WebdriverIO.

Параметры:

- `params`: информация об утверждении
- `params.matcherName` (`string`): имя сопоставителя (например, `toHaveTitle`)
- `params.expectedValue`: значение, которое передается в сопоставитель
- `params.options`: опции утверждения

### afterAssertion

Хук, который выполняется после выполнения утверждения WebdriverIO.

Параметры:

- `params`: информация об утверждении
- `params.matcherName` (`string`): имя сопоставителя (например, `toHaveTitle`)
- `params.expectedValue`: значение, которое передается в сопоставитель
- `params.options`: опции утверждения
- `params.result`: результаты утверждения