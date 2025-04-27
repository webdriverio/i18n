---
id: configuration
title: Конфігурація
---

Залежно від [типу налаштування](/docs/setuptypes) (наприклад, використання необроблених прив'язок протоколу, WebdriverIO як окремого пакету чи тестраннера WDIO) доступний різний набір опцій для керування середовищем.

## Опції WebDriver

Наступні опції визначаються при використанні пакету протоколу [`webdriver`](https://www.npmjs.com/package/webdriver):

### protocol

Протокол для комунікації з сервером драйвера.

Тип: `String`<br />
За замовчуванням: `http`

### hostname

Хост вашого сервера драйвера.

Тип: `String`<br />
За замовчуванням: `0.0.0.0`

### port

Порт, на якому працює ваш сервер драйвера.

Тип: `Number`<br />
За замовчуванням: `undefined`

### path

Шлях до кінцевої точки сервера драйвера.

Тип: `String`<br />
За замовчуванням: `/`

### queryParams

Параметри запиту, які передаються на сервер драйвера.

Тип: `Object`<br />
За замовчуванням: `undefined`

### user

Ваше ім'я користувача хмарного сервісу (працює лише для облікових записів [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) або [LambdaTest](https://www.lambdatest.com)). Якщо встановлено, WebdriverIO автоматично налаштує опції підключення. Якщо ви не використовуєте хмарного провайдера, це можна використовувати для аутентифікації будь-якого іншого бекенду WebDriver.

Тип: `String`<br />
За замовчуванням: `undefined`

### key

Ваш ключ доступу або секретний ключ хмарного сервісу (працює лише для облікових записів [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) або [LambdaTest](https://www.lambdatest.com)). Якщо встановлено, WebdriverIO автоматично налаштує опції підключення. Якщо ви не використовуєте хмарного провайдера, це можна використовувати для аутентифікації будь-якого іншого бекенду WebDriver.

Тип: `String`<br />
За замовчуванням: `undefined`

### capabilities

Визначає можливості, які ви хочете використовувати в сеансі WebDriver. Перегляньте [протокол WebDriver](https://w3c.github.io/webdriver/#capabilities) для отримання додаткової інформації. Якщо ви використовуєте старіший драйвер, який не підтримує протокол WebDriver, вам потрібно буде використовувати [можливості JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) для успішного запуску сеансу.

Окрім можливостей, заснованих на WebDriver, ви можете застосовувати специфічні опції для браузера та постачальника, які дозволяють глибше налаштувати віддалений браузер або пристрій. Вони документовані у відповідних документах постачальників, наприклад:

- `goog:chromeOptions`: для [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: для [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: для [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: для [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: для [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: для [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Крім того, корисною утилітою є [Автоматичний конфігуратор тестів](https://docs.saucelabs.com/basics/platform-configurator/) Sauce Labs, який допомагає створити цей об'єкт шляхом вибору бажаних можливостей.

Тип: `Object`<br />
За замовчуванням: `null`

**Приклад:**

```js
{
    browserName: 'chrome', // опції: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // версія браузера
    platformName: 'Windows 10' // платформа ОС
}
```

Якщо ви запускаєте веб- або нативні тести на мобільних пристроях, `capabilities` відрізняється від протоколу WebDriver. Дивіться [документацію Appium](https://appium.github.io/appium.io/docs/en/writing-running-appium/caps/) для отримання додаткової інформації.

### logLevel

Рівень детальності логування.

Тип: `String`<br />
За замовчуванням: `info`<br />
Опції: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

Каталог для зберігання всіх файлів журналів тестраннера (включаючи журнали репортера та журнали `wdio`). Якщо не встановлено, всі журнали передаються в `stdout`. Оскільки більшість репортерів призначені для виводу в `stdout`, рекомендується використовувати цю опцію лише для певних репортерів, для яких більш доцільно передавати звіт у файл (наприклад, для репортера `junit`).

При запуску в автономному режимі єдиним журналом, створеним WebdriverIO, буде журнал `wdio`.

Тип: `String`<br />
За замовчуванням: `null`

### connectionRetryTimeout

Час очікування для будь-якого запиту WebDriver до драйвера або сітки.

Тип: `Number`<br />
За замовчуванням: `120000`

### connectionRetryCount

Максимальна кількість повторних запитів до сервера Selenium.

Тип: `Number`<br />
За замовчуванням: `3`

### agent

Дозволяє використовувати власний агент `http`/`https`/`http2` [agent](https://www.npmjs.com/package/got#agent) для виконання запитів.

Тип: `Object`<br />
За замовчуванням:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

Вказує користувацькі `headers` для передачі в кожен запит WebDriver. Якщо ваша сітка Selenium вимагає основної аутентифікації, ми рекомендуємо передати заголовок `Authorization` через цю опцію для аутентифікації ваших запитів WebDriver, наприклад:

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
За замовчуванням: `{}`

### transformRequest

Функція перехоплення [параметрів HTTP-запиту](https://github.com/sindresorhus/got#options) перед виконанням запиту WebDriver

Тип: `(RequestOptions) => RequestOptions`<br />
За замовчуванням: *немає*

### transformResponse

Функція перехоплення об'єктів відповіді HTTP після отримання відповіді WebDriver. Функції передається вихідний об'єкт відповіді як перший аргумент та відповідні `RequestOptions` як другий аргумент.

Тип: `(Response, RequestOptions) => Response`<br />
За замовчуванням: *немає*

### strictSSL

Чи не потрібно, щоб сертифікат SSL був дійсним.
Його можна встановити через змінні середовища як `STRICT_SSL` або `strict_ssl`.

Тип: `Boolean`<br />
За замовчуванням: `true`

### enableDirectConnect

Чи увімкнути [функцію прямого підключення Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments).
Не робить нічого, якщо відповідь не має відповідних ключів, коли прапор увімкнено.

Тип: `Boolean`<br />
За замовчуванням: `true`

### cacheDir

Шлях до кореня каталогу кешу. Цей каталог використовується для зберігання всіх драйверів, які завантажуються при спробі розпочати сеанс.

Тип: `String`<br />
За замовчуванням: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

---

## WebdriverIO

Наступні опції (включаючи перелічені вище) можна використовувати з WebdriverIO в автономному режимі:

### automationProtocol

Визначає протокол, який ви хочете використовувати для автоматизації браузера. На даний момент підтримується тільки [`webdriver`](https://www.npmjs.com/package/webdriver), оскільки це основна технологія автоматизації браузера, яку використовує WebdriverIO.

Якщо ви хочете автоматизувати браузер за допомогою іншої технології автоматизації, переконайтеся, що ви встановили цю властивість на шлях, який вказує на модуль, що відповідає наступному інтерфейсу:

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
За замовчуванням: `webdriver`

### baseUrl

Скорочує виклики команди `url` шляхом встановлення базової URL-адреси.
- Якщо ваш параметр `url` починається з `/`, то `baseUrl` додається на початок (за винятком шляху `baseUrl`, якщо він є).
- Якщо ваш параметр `url` починається без схеми або `/` (наприклад, `some/path`), то повний `baseUrl` додається на початок безпосередньо.

Тип: `String`<br />
За замовчуванням: `null`

### waitforTimeout

Час очікування за замовчуванням для всіх команд `waitFor*`. (Зверніть увагу на малу літеру `f` у назві опції.) Цей тайм-аут __лише__ впливає на команди, що починаються з `waitFor*` та їхній стандартний час очікування.

Щоб збільшити тайм-аут для _тесту_, дивіться документацію до фреймворку.

Тип: `Number`<br />
За замовчуванням: `5000`

### waitforInterval

Інтервал за замовчуванням для всіх команд `waitFor*` для перевірки, чи змінився очікуваний стан (наприклад, видимість).

Тип: `Number`<br />
За замовчуванням: `100`

### region

При запуску на Sauce Labs ви можете вибрати запуск тестів між різними центрами обробки даних: US або EU.
Щоб змінити регіон на EU, додайте `region: 'eu'` до вашої конфігурації.

__Примітка:__ Це матиме ефект лише якщо ви надасте опції `user` та `key`, які пов'язані з вашим обліковим записом Sauce Labs.

Тип: `String`<br />
За замовчуванням: `us`

*(тільки для vm та/або em/симуляторів)*

---

## Опції тестраннера

Наступні опції (включаючи перелічені вище) визначені лише для запуску WebdriverIO з тестраннером WDIO:

### specs

Визначає специфікації для виконання тестів. Ви можете вказати шаблон glob для відповідності кільком файлам одночасно або обгорнути glob або набір шляхів у масив, щоб запустити їх в одному робочому процесі. Усі шляхи вважаються відносними від шляху до файлу конфігурації.

Тип: `(String | String[])[]`<br />
За замовчуванням: `[]`

### exclude

Виключає специфікації з виконання тестів. Усі шляхи вважаються відносними від шляху до файлу конфігурації.

Тип: `String[]`<br />
За замовчуванням: `[]`

### suites

Об'єкт, що описує різні набори тестів, які ви можете вказати за допомогою опції `--suite` в CLI `wdio`.

Тип: `Object`<br />
За замовчуванням: `{}`

### capabilities

Те саме, що й розділ `capabilities`, описаний вище, за винятком можливості вказати об'єкт [`multiremote`](/docs/multiremote) або кілька сеансів WebDriver у масиві для паралельного виконання.

Ви можете застосувати ті самі можливості, специфічні для постачальника та браузера, як визначено [вище](/docs/configuration#capabilities).

Тип: `Object`|`Object[]`<br />
За замовчуванням: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

Максимальна кількість паралельно працюючих робочих процесів.

__Примітка:__ це може бути число до `100`, коли тести виконуються на зовнішніх постачальниках, таких як машини Sauce Labs. Там тести виконуються не на одній машині, а на кількох віртуальних машинах. Якщо тести мають запускатися на локальній машині розробки, використовуйте більш розумне число, наприклад, `3`, `4` або `5`. По суті, це кількість браузерів, які будуть одночасно запущені та виконуватимуть ваші тести одночасно, тому це залежить від того, скільки ОЗП є на вашій машині, і скільки інших програм працює на вашій машині.

Ви також можете застосувати `maxInstances` в об'єктах можливостей, використовуючи можливість `wdio:maxInstances`. Це обмежить кількість паралельних сеансів для цієї конкретної можливості.

Тип: `Number`<br />
За замовчуванням: `100`

### maxInstancesPerCapability

Максимальна кількість паралельно працюючих робочих процесів на можливість.

Тип: `Number`<br />
За замовчуванням: `100`

### injectGlobals

Вставляє глобальні змінні WebdriverIO (наприклад, `browser`, `$` та `$$`) у глобальне середовище.
Якщо ви встановите значення `false`, вам слід імпортувати з `@wdio/globals`, наприклад:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Примітка: WebdriverIO не керує вставкою глобальних змінних, специфічних для тестових фреймворків.

Тип: `Boolean`<br />
За замовчуванням: `true`

### bail

Якщо ви хочете, щоб ваш тестовий запуск зупинився після певної кількості невдалих тестів, використовуйте `bail`.
(За замовчуванням `0`, що запускає всі тести незалежно від результату.) **Примітка:** У цьому контексті тестами є всі тести в одному файлі специфікації (при використанні Mocha або Jasmine) або всі кроки в файлі функцій (при використанні Cucumber). Якщо ви хочете контролювати поведінку bail всередині тестів одного тестового файлу, зверніть увагу на доступні опції [фреймворку](frameworks).

Тип: `Number`<br />
За замовчуванням: `0` (не зупиняти; запускати всі тести)

### specFileRetries

Кількість повторних спроб для всього файлу специфікації, коли він повністю не проходить.

Тип: `Number`<br />
За замовчуванням: `0`

### specFileRetriesDelay

Затримка в секундах між спробами повторного запуску файлу специфікації

Тип: `Number`<br />
За замовчуванням: `0`

### specFileRetriesDeferred

Чи повинні файли специфікацій, які повторно запускаються, повторюватися негайно або відкладатися в кінець черги.

Тип: `Boolean`<br />
За замовчуванням: `true`

### groupLogsByTestSpec

Виберіть вигляд виводу журналу.

Якщо встановлено на `false`, журнали з різних тестових файлів будуть виводитися в реальному часі. Зверніть увагу, що це може призвести до змішування журналів з різних файлів при паралельному запуску.

Якщо встановлено на `true`, виводи журналів будуть згруповані за тестовою специфікацією та виводитися лише після завершення тестової специфікації.

За замовчуванням встановлено `false`, тому журнали виводяться в реальному часі.

Тип: `Boolean`<br />
За замовчуванням: `false`

### services

Сервіси виконують конкретну роботу, якою ви не хочете займатися. Вони покращують вашу тестову конфігурацію з мінімальними зусиллями.

Тип: `String[]|Object[]`<br />
За замовчуванням: `[]`

### framework

Визначає тестовий фреймворк, який буде використовуватися тестраннером WDIO.

Тип: `String`<br />
За замовчуванням: `mocha`<br />
Опції: `mocha` | `jasmine`

### mochaOpts, jasmineOpts та cucumberOpts

Специфічні для фреймворку опції. Дивіться документацію адаптера фреймворку, щоб дізнатися, які опції доступні. Детальніше про це можна прочитати в [Frameworks](frameworks).

Тип: `Object`<br />
За замовчуванням: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

Список функцій cucumber з номерами рядків (при [використанні фреймворку cucumber](./Frameworks.md#using-cucumber)).

Тип: `String[]`
За замовчуванням: `[]`

### reporters

Список репортерів для використання. Репортер може бути рядком або масивом
`['reporterName', { /* reporter options */}]`, де перший елемент - це рядок з назвою репортера, а другий елемент - об'єкт з опціями репортера.

Тип: `String[]|Object[]`<br />
За замовчуванням: `[]`

Приклад:

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

Визначає, в якому інтервалі репортер повинен перевіряти, чи вони синхронізовані, якщо вони звітують свої журнали асинхронно (наприклад, якщо журнали передаються до стороннього постачальника).

Тип: `Number`<br />
За замовчуванням: `100` (мс)

### reporterSyncTimeout

Визначає максимальний час, протягом якого репортери мають завершити завантаження всіх своїх журналів, до того як тестраннер видасть помилку.

Тип: `Number`<br />
За замовчуванням: `5000` (мс)

### execArgv

Аргументи Node для вказівки при запуску дочірніх процесів.

Тип: `String[]`<br />
За замовчуванням: `null`

### filesToWatch

Список шаблонів рядків, що підтримують glob, які вказують тестраннеру додатково стежити за іншими файлами, наприклад, файлами додатків, при запуску з прапорцем `--watch`. За замовчуванням тестраннер вже стежить за всіма файлами специфікацій.

Тип: `String[]`<br />
За замовчуванням: `[]`

### updateSnapshots

Встановіть на true, якщо ви хочете оновити ваші знімки. Ідеально використовувати як частину параметра CLI, наприклад, `wdio run wdio.conf.js --s`.

Тип: `'new' | 'all' | 'none'`<br />
За замовчуванням: `none`, якщо не вказано і тести запускаються в CI, `new`, якщо не вказано, інакше те, що було надано

### resolveSnapshotPath

Перевизначає шлях знімка за замовчуванням. Наприклад, для зберігання знімків поряд з тестовими файлами.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

Тип: `(testPath: string, snapExtension: string) => string`<br />
За замовчуванням: зберігає файли знімків у каталозі `__snapshots__` поряд з тестовим файлом

### tsConfigPath

WDIO використовує `tsx` для компіляції файлів TypeScript. Ваш TSConfig автоматично визначається з поточного робочого каталогу, але ви можете вказати власний шлях тут або шляхом встановлення змінної середовища TSX_TSCONFIG_PATH.

Дивіться документацію `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

Тип: `String`<br />
За замовчуванням: `null`<br />

## Хуки

Тестраннер WDIO дозволяє встановлювати хуки, які запускаються в певні моменти життєвого циклу тесту. Це дозволяє виконувати користувацькі дії (наприклад, робити знімок екрану, якщо тест не пройшов).

Кожен хук має як параметр специфічну інформацію про життєвий цикл (наприклад, інформацію про набір тестів або тест). Детальніше про всі властивості хуків можна прочитати в [нашому прикладі конфігурації](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Примітка:** Деякі хуки (`onPrepare`, `onWorkerStart`, `onWorkerEnd` та `onComplete`) виконуються в іншому процесі і тому не можуть обмінюватися глобальними даними з іншими хуками, які живуть у робочому процесі.

### onPrepare

Виконується один раз перед запуском всіх робочих процесів.

Параметри:

- `config` (`object`): об'єкт конфігурації WebdriverIO
- `param` (`object[]`): список деталей можливостей

### onWorkerStart

Виконується перед породженням робочого процесу і може використовуватися для ініціалізації певного сервісу для цього робочого процесу, а також для модифікації середовищ виконання асинхронним чином.

Параметри:

- `cid` (`string`): ідентифікатор можливості (наприклад, 0-0)
- `caps` (`object`): містить можливості для сеансу, який буде породжений у робочому процесі
- `specs` (`string[]`): специфікації для запуску в робочому процесі
- `args` (`object`): об'єкт, який буде об'єднаний з основною конфігурацією після ініціалізації робочого процесу
- `execArgv` (`string[]`): список аргументів рядка, переданих робочому процесу

### onWorkerEnd

Виконується одразу після завершення робочого процесу.

Параметри:

- `cid` (`string`): ідентифікатор можливості (наприклад, 0-0)
- `exitCode` (`number`): 0 - успіх, 1 - невдача
- `specs` (`string[]`): специфікації для запуску в робочому процесі
- `retries` (`number`): кількість повторних спроб на рівні специфікацій, визначених у [_"Додавання повторних спроб на основі файлу специфікації"_](./Retry.md#add-retries-on-a-per-specfile-basis)

### beforeSession

Виконується безпосередньо перед ініціалізацією сеансу webdriver та тестового фреймворку. Це дозволяє вам маніпулювати конфігураціями залежно від можливості або специфікації.

Параметри:

- `config` (`object`): об'єкт конфігурації WebdriverIO
- `caps` (`object`): містить можливості для сеансу, який буде породжений у робочому процесі
- `specs` (`string[]`): специфікації для запуску в робочому процесі

### before

Виконується до початку виконання тесту. У цей момент ви можете отримати доступ до всіх глобальних змінних, таких як `browser`. Це ідеальне місце для визначення власних команд.

Параметри:

- `caps` (`object`): містить можливості для сеансу, який буде породжений у робочому процесі
- `specs` (`string[]`): специфікації для запуску в робочому процесі
- `browser` (`object`): екземпляр створеного сеансу браузера/пристрою

### beforeSuite

Хук, який виконується до початку набору (тільки в Mocha/Jasmine)

Параметри:

- `suite` (`object`): деталі набору

### beforeHook

Хук, який виконується *до* хука в наборі (наприклад, виконується перед викликом beforeEach у Mocha)

Параметри:

- `test` (`object`): деталі тесту
- `context` (`object`): контекст тесту (представляє об'єкт World у Cucumber)

### afterHook

Хук, який виконується *після* хука в наборі (наприклад, виконується після виклику afterEach у Mocha)

Параметри:

- `test` (`object`): деталі тесту
- `context` (`object`): контекст тесту (представляє об'єкт World у Cucumber)
- `result` (`object`): результат хука (містить властивості `error`, `result`, `duration`, `passed`, `retries`)

### beforeTest

Функція, яка виконується перед тестом (тільки в Mocha/Jasmine).

Параметри:

- `test` (`object`): деталі тесту
- `context` (`object`): об'єкт області дії, з яким виконувався тест

### beforeCommand

Виконується перед виконанням команди WebdriverIO.

Параметри:

- `commandName` (`string`): назва команди
- `args` (`*`): аргументи, які отримає команда

### afterCommand

Виконується після виконання команди WebdriverIO.

Параметри:

- `commandName` (`string`): назва команди
- `args` (`*`): аргументи, які отримає команда
- `result` (`number`): 0 - команда успішна, 1 - помилка команди
- `error` (`Error`): об'єкт помилки, якщо є

### afterTest

Функція, яка виконується після завершення тесту (в Mocha/Jasmine).

Параметри:

- `test` (`object`): деталі тесту
- `context` (`object`): об'єкт області дії, з яким виконувався тест
- `result.error` (`Error`): об'єкт помилки у випадку невдачі тесту, інакше `undefined`
- `result.result` (`Any`): об'єкт повернення тестової функції
- `result.duration` (`Number`): тривалість тесту
- `result.passed` (`Boolean`): true, якщо тест пройшов, інакше false
- `result.retries` (`Object`): інформація про повторні спроби окремих тестів, як визначено для [Mocha і Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha), а також для [Cucumber](./Retry.md#rerunning-in-cucumber), наприклад, `{ attempts: 0, limit: 0 }`, див.
- `result` (`object`): результат хука (містить властивості `error`, `result`, `duration`, `passed`, `retries`)

### afterSuite

Хук, який виконується після завершення набору (тільки в Mocha/Jasmine)

Параметри:

- `suite` (`object`): деталі набору

### after

Виконується після завершення всіх тестів. У вас все ще є доступ до всіх глобальних змінних з тесту.

Параметри:

- `result` (`number`): 0 - тест пройшов, 1 - тест не пройшов
- `caps` (`object`): містить можливості для сеансу, який буде породжений у робочому процесі
- `specs` (`string[]`): специфікації для запуску в робочому процесі

### afterSession

Виконується одразу після завершення сеансу webdriver.

Параметри:

- `config` (`object`): об'єкт конфігурації WebdriverIO
- `caps` (`object`): містить можливості для сеансу, який буде породжений у робочому процесі
- `specs` (`string[]`): специфікації для запуску в робочому процесі

### onComplete

Виконується після зупинки всіх робочих процесів і перед завершенням процесу. Помилка, викинута в хуку onComplete, призведе до невдачі тестового запуску.

Параметри:

- `exitCode` (`number`): 0 - успіх, 1 - невдача
- `config` (`object`): об'єкт конфігурації WebdriverIO
- `caps` (`object`): містить можливості для сеансу, який буде породжений у робочому процесі
- `result` (`object`): об'єкт результатів, що містить результати тестів

### onReload

Виконується при оновленні сторінки.

Параметри:

- `oldSessionId` (`string`): ідентифікатор сеансу старого сеансу
- `newSessionId` (`string`): ідентифікатор сеансу нового сеансу

### beforeFeature

Виконується перед функцією Cucumber.

Параметри:

- `uri` (`string`): шлях до файлу функції
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): об'єкт функції Cucumber

### afterFeature

Виконується після функції Cucumber.

Параметри:

- `uri` (`string`): шлях до файлу функції
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): об'єкт функції Cucumber

### beforeScenario

Виконується перед сценарієм Cucumber.

Параметри:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): об'єкт світу, що містить інформацію про pickle та крок тесту
- `context` (`object`): об'єкт світу Cucumber

### afterScenario

Виконується після сценарію Cucumber.

Параметри:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): об'єкт світу, що містить інформацію про pickle та крок тесту
- `result` (`object`): об'єкт результатів, що містить результати сценарію
- `result.passed` (`boolean`): true, якщо сценарій пройшов
- `result.error` (`string`): стек помилок, якщо сценарій не пройшов
- `result.duration` (`number`): тривалість сценарію в мілісекундах
- `context` (`object`): об'єкт світу Cucumber

### beforeStep

Виконується перед кроком Cucumber.

Параметри:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): об'єкт кроку Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): об'єкт сценарію Cucumber
- `context` (`object`): об'єкт світу Cucumber

### afterStep

Виконується після кроку Cucumber.

Параметри:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): об'єкт кроку Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): об'єкт сценарію Cucumber
- `result`: (`object`): об'єкт результатів, що містить результати кроку
- `result.passed` (`boolean`): true, якщо сценарій пройшов
- `result.error` (`string`): стек помилок, якщо сценарій не пройшов
- `result.duration` (`number`): тривалість сценарію в мілісекундах
- `context` (`object`): об'єкт світу Cucumber

### beforeAssertion

Хук, який виконується перед твердженням WebdriverIO.

Параметри:

- `params`: інформація про твердження
- `params.matcherName` (`string`): назва матчера (наприклад, `toHaveTitle`)
- `params.expectedValue`: значення, яке передається в матчер
- `params.options`: опції твердження

### afterAssertion

Хук, який виконується після твердження WebdriverIO.

Параметри:

- `params`: інформація про твердження
- `params.matcherName` (`string`): назва матчера (наприклад, `toHaveTitle`)
- `params.expectedValue`: значення, яке передається в матчер
- `params.options`: опції твердження
- `params.result`: результати твердження