---
id: configuration
title: Конфігурація
---

Залежно від [типу налаштування](/docs/setuptypes) (наприклад, використання сирих протокольних з'єднань, WebdriverIO як окремого пакету або тестраннера WDIO) існує різний набір опцій для керування середовищем.

## Опції WebDriver

Наступні опції визначені при використанні пакету протоколу [`webdriver`](https://www.npmjs.com/package/webdriver):

### protocol

Протокол для зв'язку з сервером драйвера.

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

Параметри запиту, які передаються серверу драйвера.

Тип: `Object`<br />
За замовчуванням: `undefined`

### user

Ваше ім'я користувача хмарного сервісу (працює тільки для облікових записів [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) або [LambdaTest](https://www.lambdatest.com)). Якщо встановлено, WebdriverIO автоматично налаштує параметри підключення для вас. Якщо ви не використовуєте хмарного провайдера, це можна використовувати для аутентифікації будь-якого іншого бекенду WebDriver.

Тип: `String`<br />
За замовчуванням: `undefined`

### key

Ваш ключ доступу або секретний ключ хмарного сервісу (працює тільки для облікових записів [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) або [LambdaTest](https://www.lambdatest.com)). Якщо встановлено, WebdriverIO автоматично налаштує параметри підключення для вас. Якщо ви не використовуєте хмарного провайдера, це можна використовувати для аутентифікації будь-якого іншого бекенду WebDriver.

Тип: `String`<br />
За замовчуванням: `undefined`

### capabilities

Визначає можливості, які ви хочете використовувати в своїй сесії WebDriver. Детальніше див. у [протоколі WebDriver](https://w3c.github.io/webdriver/#capabilities). Якщо ви використовуєте старіший драйвер, який не підтримує протокол WebDriver, вам потрібно використовувати [можливості JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities), щоб успішно запустити сесію.

Окрім можливостей на основі WebDriver, ви можете застосовувати специфічні опції для браузерів та постачальників, які дозволяють більш глибоку конфігурацію віддаленого браузера або пристрою. Вони задокументовані у відповідних документах постачальників, наприклад:

- `goog:chromeOptions`: для [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: для [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: для [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: для [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: для [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: для [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Крім того, корисним інструментом є [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) від Sauce Labs, який допомагає створити цей об'єкт, вибираючи бажані можливості.

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

Якщо ви запускаєте веб-тести або нативні тести на мобільних пристроях, `capabilities` відрізняються від протоколу WebDriver. Див. [документацію Appium](https://appium.io/docs/en/latest/guides/caps/) для отримання додаткової інформації.

### logLevel

Рівень детальності логування.

Тип: `String`<br />
За замовчуванням: `info`<br />
Опції: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

Директорія для зберігання всіх лог-файлів тестраннера (включаючи логи репортерів та логи `wdio`). Якщо не встановлено, всі логи передаються у `stdout`. Оскільки більшість репортерів створені для логування у `stdout`, рекомендується використовувати цю опцію тільки для певних репортерів, де має сенс надсилати звіт у файл (наприклад, репортер `junit`).

При запуску в автономному режимі, єдиним логом, що генерується WebdriverIO, буде лог `wdio`.

Тип: `String`<br />
За замовчуванням: `null`

### connectionRetryTimeout

Час очікування для будь-якого запиту WebDriver до драйвера або сітки.

Тип: `Number`<br />
За замовчуванням: `120000`

### connectionRetryCount

Максимальна кількість повторів запитів до сервера Selenium.

Тип: `Number`<br />
За замовчуванням: `3`

### agent

Дозволяє використовувати власний агент `http`/`https`/`http2` [agent](https://www.npmjs.com/package/got#agent) для здійснення запитів.

Тип: `Object`<br />
За замовчуванням:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

Вказати власні `headers`, які будуть передані у кожен запит WebDriver. Якщо ваша сітка Selenium вимагає базової аутентифікації, ми рекомендуємо передати заголовок `Authorization` через цю опцію для аутентифікації ваших запитів WebDriver, наприклад:

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

Функція, що перехоплює [опції HTTP-запиту](https://github.com/sindresorhus/got#options) перед виконанням запиту WebDriver

Тип: `(RequestOptions) => RequestOptions`<br />
За замовчуванням: *немає*

### transformResponse

Функція, що перехоплює об'єкти HTTP-відповіді після отримання відповіді WebDriver. Функції передається оригінальний об'єкт відповіді як перший аргумент та відповідні `RequestOptions` як другий аргумент.

Тип: `(Response, RequestOptions) => Response`<br />
За замовчуванням: *немає*

### strictSSL

Чи вимагається, щоб SSL-сертифікат був дійсним.
Може бути встановлено через змінні середовища як `STRICT_SSL` або `strict_ssl`.

Тип: `Boolean`<br />
За замовчуванням: `true`

### enableDirectConnect

Чи вмикати [функцію прямого підключення Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments).
Не робить нічого, якщо відповідь не містить відповідних ключів, коли прапорець увімкнено.

Тип: `Boolean`<br />
За замовчуванням: `true`

### cacheDir

Шлях до кореня каталогу кешу. Цей каталог використовується для зберігання всіх драйверів, які завантажуються при спробі запустити сесію.

Тип: `String`<br />
За замовчуванням: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

Для більш безпечного логування, регулярні вирази, встановлені за допомогою `maskingPatterns`, можуть приховувати конфіденційну інформацію з логу.
 - Формат рядка - це регулярний вираз з прапорцями або без них (наприклад, `/.../i`) і через кому для кількох регулярних виразів.
 - Для отримання додаткової інформації про маскування, див. [розділ про шаблони маскування в README WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

Тип: `String`<br />
За замовчуванням: `undefined`

**Приклад:**

```js
{
    maskingPatterns: '/--key=([^ ]*)/i,/RESULT (.*)/'
}
```

---

## WebdriverIO

Наступні опції (включаючи перераховані вище) можна використовувати з WebdriverIO в автономному режимі:

### automationProtocol

Визначте протокол, який ви хочете використовувати для автоматизації браузера. Наразі підтримується лише [`webdriver`](https://www.npmjs.com/package/webdriver), оскільки це основна технологія автоматизації браузера, яку використовує WebdriverIO.

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

Скорочує виклики команди `url` шляхом встановлення базового URL.
- Якщо ваш параметр `url` починається з `/`, то перед ним додається `baseUrl` (за винятком шляху `baseUrl`, якщо він є).
- Якщо ваш параметр `url` починається без схеми або `/` (наприклад, `some/path`), то `baseUrl` додається перед ним повністю.

Тип: `String`<br />
За замовчуванням: `null`

### waitforTimeout

Час очікування за замовчуванням для всіх команд `waitFor*`. (Зверніть увагу на малу літеру `f` у назві опції.) Цей час очікування __впливає лише__ на команди, які починаються з `waitFor*`, та їх час очікування за замовчуванням.

Щоб збільшити час очікування для _тесту_, зверніться до документації фреймворку.

Тип: `Number`<br />
За замовчуванням: `5000`

### waitforInterval

Інтервал за замовчуванням для всіх команд `waitFor*` для перевірки, чи змінився очікуваний стан (наприклад, видимість).

Тип: `Number`<br />
За замовчуванням: `100`

### region

Якщо ви працюєте на Sauce Labs, ви можете вибрати запуск тестів між різними центрами даних: US або EU.
Щоб змінити регіон на EU, додайте `region: 'eu'` до вашої конфігурації.

__Примітка:__ Це має ефект лише якщо ви надаєте опції `user` та `key`, які пов'язані з вашим обліковим записом Sauce Labs.

Тип: `String`<br />
За замовчуванням: `us`

*(тільки для vm та/або em/симуляторів)*

---

## Опції Testrunner

Наступні опції (включаючи перераховані вище) визначені лише для роботи WebdriverIO з тестраннером WDIO:

### specs

Визначте специфікації для виконання тестів. Ви можете вказати шаблон glob для одночасного відповідності кільком файлам або загорнути glob чи набір шляхів у масив, щоб запустити їх в одному робочому процесі. Усі шляхи розглядаються як відносні від шляху файлу конфігурації.

Тип: `(String | String[])[]`<br />
За замовчуванням: `[]`

### exclude

Виключити специфікації з виконання тестів. Усі шляхи розглядаються як відносні від шляху файлу конфігурації.

Тип: `String[]`<br />
За замовчуванням: `[]`

### suites

Об'єкт, що описує різні набори, які ви можете вказати за допомогою опції `--suite` у CLI `wdio`.

Тип: `Object`<br />
За замовчуванням: `{}`

### capabilities

Те саме, що і розділ `capabilities`, описаний вище, але з можливістю вказати об'єкт [`multiremote`](/docs/multiremote) або кілька сесій WebDriver у масиві для паралельного виконання.

Ви можете застосувати ті самі специфічні для постачальника та браузера можливості, як визначено [вище](/docs/configuration#capabilities).

Тип: `Object`|`Object[]`<br />
За замовчуванням: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

Максимальна кількість паралельно працюючих воркерів.

__Примітка:__ це може бути число таке високе, як `100`, коли тести виконуються на деяких зовнішніх вендорах, таких як машини Sauce Labs. Там тести не виконуються на одній машині, а на декількох віртуальних машинах. Якщо тести повинні виконуватися на локальній машині розробки, використовуйте більш розумне число, як `3`, `4` або `5`. По суті, це кількість браузерів, які будуть одночасно запущені і будуть виконувати ваші тести одночасно, тому це залежить від того, скільки оперативної пам'яті є на вашій машині і скільки інших додатків працює на вашій машині.

Ви також можете застосувати `maxInstances` всередині об'єктів capabilities, використовуючи можливість `wdio:maxInstances`. Це обмежить кількість паралельних сесій для цієї конкретної можливості.

Тип: `Number`<br />
За замовчуванням: `100`

### maxInstancesPerCapability

Максимальна кількість паралельно працюючих воркерів на одну можливість.

Тип: `Number`<br />
За замовчуванням: `100`

### injectGlobals

Вставляє глобальні змінні WebdriverIO (наприклад, `browser`, `$` та `$$`) у глобальне середовище.
Якщо встановлено значення `false`, ви повинні імпортувати з `@wdio/globals`, наприклад:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Примітка: WebdriverIO не займається вставкою глобальних змінних, специфічних для тестового фреймворку.

Тип: `Boolean`<br />
За замовчуванням: `true`

### bail

Якщо ви хочете, щоб ваш тестовий запуск зупинився після певної кількості невдалих тестів, використовуйте `bail`.
(За замовчуванням `0`, що запускає всі тести незалежно від результату.) **Примітка:** Тест у цьому контексті - це всі тести в одному файлі специфікації (при використанні Mocha або Jasmine) або всі кроки в файлі функцій (при використанні Cucumber). Якщо ви хочете контролювати поведінку bail всередині тестів одного тестового файлу, перегляньте доступні опції [фреймворку](frameworks).

Тип: `Number`<br />
За замовчуванням: `0` (не зупиняти; запускати всі тести)

### specFileRetries

Кількість повторних спроб для всього файлу специфікації, коли він повністю не вдається.

Тип: `Number`<br />
За замовчуванням: `0`

### specFileRetriesDelay

Затримка в секундах між спробами повторення файлу специфікації

Тип: `Number`<br />
За замовчуванням: `0`

### specFileRetriesDeferred

Чи повинні повторні спроби файлів специфікації виконуватися негайно або відкладатися в кінець черги.

Тип: `Boolean`<br />
За замовчуванням: `true`

### groupLogsByTestSpec

Виберіть вигляд виводу логів.

Якщо встановлено значення `false`, логи з різних тестових файлів будуть виводитися в реальному часі. Зверніть увагу, що це може призвести до змішування виводів логів з різних файлів при паралельному запуску.

Якщо встановлено значення `true`, виводи логів будуть згруповані за Test Spec і виведені тільки тоді, коли Test Spec завершено.

За замовчуванням встановлено значення `false`, щоб логи виводились у реальному часі.

Тип: `Boolean`<br />
За замовчуванням: `false`

### services

Сервіси виконують певну роботу, якою ви не хочете займатися. Вони покращують налаштування тестів майже без зусиль.

Тип: `String[]|Object[]`<br />
За замовчуванням: `[]`

### framework

Визначає тестовий фреймворк, який буде використовуватися тестраннером WDIO.

Тип: `String`<br />
За замовчуванням: `mocha`<br />
Опції: `mocha` | `jasmine`

### mochaOpts, jasmineOpts та cucumberOpts

Специфічні для фреймворку опції. Див. документацію адаптера фреймворку щодо доступних опцій. Детальніше про це у [Frameworks](frameworks).

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

Визначає, в якому інтервалі репортер повинен перевіряти, чи вони синхронізовані, якщо вони звітують про свої логи асинхронно (наприклад, якщо логи передаються стороннім постачальникам).

Тип: `Number`<br />
За замовчуванням: `100` (мс)

### reporterSyncTimeout

Визначає максимальний час, який репортери мають для завершення завантаження всіх своїх логів, перш ніж тестраннер видасть помилку.

Тип: `Number`<br />
За замовчуванням: `5000` (мс)

### execArgv

Аргументи Node для вказання при запуску дочірніх процесів.

Тип: `String[]`<br />
За замовчуванням: `null`

### filesToWatch

Список шаблонів рядків з підтримкою glob, які вказують тестраннеру додатково стежити за іншими файлами, наприклад, файлами додатків, при запуску з прапорцем `--watch`. За замовчуванням тестраннер вже стежить за всіма файлами специфікацій.

Тип: `String[]`<br />
За замовчуванням: `[]`

### updateSnapshots

Встановіть значення true, якщо ви хочете оновити свої знімки. В ідеалі використовується як частина параметра CLI, наприклад, `wdio run wdio.conf.js --s`.

Тип: `'new' | 'all' | 'none'`<br />
За замовчуванням: `none`, якщо не вказано і тести запускаються в CI, `new`, якщо не вказано, інакше те, що було надано

### resolveSnapshotPath

Перевизначає шлях знімків за замовчуванням. Наприклад, щоб зберігати знімки поруч з тестовими файлами.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

Тип: `(testPath: string, snapExtension: string) => string`<br />
За замовчуванням: зберігає файли знімків у директорії `__snapshots__` поруч з тестовим файлом

### tsConfigPath

WDIO використовує `tsx` для компіляції файлів TypeScript. Ваш TSConfig автоматично виявляється з поточного робочого каталогу, але ви можете вказати власний шлях тут або встановивши змінну середовища TSX_TSCONFIG_PATH.

Див. документацію `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

Тип: `String`<br />
За замовчуванням: `null`<br />

## Hooks

Тестраннер WDIO дозволяє встановлювати хуки, які будуть викликатися у певні моменти життєвого циклу тесту. Це дозволяє виконувати власні дії (наприклад, робити знімок екрану, якщо тест не пройшов).

Кожен хук має в якості параметра специфічну інформацію про життєвий цикл (наприклад, інформацію про тестовий набір або тест). Дізнайтеся більше про всі властивості хуків у [нашому прикладі конфігурації](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Примітка:** Деякі хуки (`onPrepare`, `onWorkerStart`, `onWorkerEnd` та `onComplete`) виконуються в іншому процесі і тому не можуть ділитися глобальними даними з іншими хуками, які знаходяться в процесі воркера.

### onPrepare

Виконується один раз перед запуском всіх воркерів.

Параметри:

- `config` (`object`): об'єкт конфігурації WebdriverIO
- `param` (`object[]`): список деталей можливостей

### onWorkerStart

Виконується перед тим, як буде створено процес воркера, і може використовуватися для ініціалізації конкретного сервісу для цього воркера, а також для зміни середовищ виконання асинхронним способом.

Параметри:

- `cid` (`string`): id можливості (наприклад, 0-0)
- `caps` (`object`): можливості для сесії, яка буде створена у воркері
- `specs` (`string[]`): специфікації для запуску в процесі воркера
- `args` (`object`): об'єкт, який буде об'єднаний з основною конфігурацією після ініціалізації воркера
- `execArgv` (`string[]`): список аргументів рядка, переданих процесу воркера

### onWorkerEnd

Виконується одразу після завершення процесу воркера.

Параметри:

- `cid` (`string`): id можливості (наприклад, 0-0)
- `exitCode` (`number`): 0 - успіх, 1 - невдача
- `specs` (`string[]`): специфікації для запуску в процесі воркера
- `retries` (`number`): кількість повторних спроб на рівні специфікації, як визначено в [_"Додати повторні спроби на основі specfile"_](./Retry.md#add-retries-on-a-per-specfile-basis)

### beforeSession

Виконується безпосередньо перед ініціалізацією сесії webdriver та тестового фреймворку. Це дозволяє маніпулювати конфігураціями в залежності від можливості або специфікації.

Параметри:

- `config` (`object`): об'єкт конфігурації WebdriverIO
- `caps` (`object`): можливості для сесії, яка буде створена у воркері
- `specs` (`string[]`): специфікації для запуску в процесі воркера

### before

Виконується перед початком виконання тесту. У цей момент ви можете отримати доступ до всіх глобальних змінних, таких як `browser`. Це ідеальне місце для визначення власних команд.

Параметри:

- `caps` (`object`): можливості для сесії, яка буде створена у воркері
- `specs` (`string[]`): специфікації для запуску в процесі воркера
- `browser` (`object`): екземпляр створеної сесії браузера/пристрою

### beforeSuite

Хук, який виконується перед початком набору (тільки в Mocha/Jasmine)

Параметри:

- `suite` (`object`): деталі набору

### beforeHook

Хук, який виконується *перед* хуком всередині набору (наприклад, запускається перед викликом beforeEach в Mocha)

Параметри:

- `test` (`object`): деталі тесту
- `context` (`object`): контекст тесту (представляє об'єкт World в Cucumber)

### afterHook

Хук, який виконується *після* хука всередині набору (наприклад, запускається після виклику afterEach в Mocha)

Параметри:

- `test` (`object`): деталі тесту
- `context` (`object`): контекст тесту (представляє об'єкт World в Cucumber)
- `result` (`object`): результат хука (містить властивості `error`, `result`, `duration`, `passed`, `retries`)

### beforeTest

Функція, яка виконується перед тестом (тільки в Mocha/Jasmine).

Параметри:

- `test` (`object`): деталі тесту
- `context` (`object`): об'єкт області, з яким виконувався тест

### beforeCommand

Запускається перед виконанням команди WebdriverIO.

Параметри:

- `commandName` (`string`): назва команди
- `args` (`*`): аргументи, які отримає команда

### afterCommand

Запускається після виконання команди WebdriverIO.

Параметри:

- `commandName` (`string`): назва команди
- `args` (`*`): аргументи, які отримає команда
- `result` (`number`): 0 - успіх команди, 1 - помилка команди
- `error` (`Error`): об'єкт помилки, якщо є

### afterTest

Функція, яка виконується після завершення тесту (в Mocha/Jasmine).

Параметри:

- `test` (`object`): деталі тесту
- `context` (`object`): об'єкт області, з яким виконувався тест
- `result.error` (`Error`): об'єкт помилки у випадку невдачі тесту, інакше `undefined`
- `result.result` (`Any`): об'єкт повернення функції тесту
- `result.duration` (`Number`): тривалість тесту
- `result.passed` (`Boolean`): true, якщо тест пройшов, інакше false
- `result.retries` (`Object`): інформація про повторні спроби одного тесту, як визначено для [Mocha та Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) та [Cucumber](./Retry.md#rerunning-in-cucumber), наприклад, `{ attempts: 0, limit: 0 }`, дивіться
- `result` (`object`): результат хука (містить властивості `error`, `result`, `duration`, `passed`, `retries`)

### afterSuite

Хук, який виконується після завершення набору (тільки в Mocha/Jasmine)

Параметри:

- `suite` (`object`): деталі набору

### after

Виконується після завершення всіх тестів. У вас все ще є доступ до всіх глобальних змінних з тесту.

Параметри:

- `result` (`number`): 0 - тест пройдений, 1 - тест не пройдений
- `caps` (`object`): можливості для сесії, яка буде створена у воркері
- `specs` (`string[]`): специфікації для запуску в процесі воркера

### afterSession

Виконується одразу після завершення сесії webdriver.

Параметри:

- `config` (`object`): об'єкт конфігурації WebdriverIO
- `caps` (`object`): можливості для сесії, яка буде створена у воркері
- `specs` (`string[]`): специфікації для запуску в процесі воркера

### onComplete

Виконується після того, як всі воркери завершили роботу і процес готується до завершення. Помилка, виникла в хуку onComplete, призведе до невдачі тестового запуску.

Параметри:

- `exitCode` (`number`): 0 - успіх, 1 - невдача
- `config` (`object`): об'єкт конфігурації WebdriverIO
- `caps` (`object`): можливості для сесії, яка буде створена у воркері
- `result` (`object`): об'єкт результатів, що містить результати тестів

### onReload

Виконується при оновленні.

Параметри:

- `oldSessionId` (`string`): ID сесії старої сесії
- `newSessionId` (`string`): ID сесії нової сесії

### beforeFeature

Запускається перед функцією Cucumber.

Параметри:

- `uri` (`string`): шлях до файлу функції
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): об'єкт функції Cucumber

### afterFeature

Запускається після функції Cucumber.

Параметри:

- `uri` (`string`): шлях до файлу функції
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): об'єкт функції Cucumber

### beforeScenario

Запускається перед сценарієм Cucumber.

Параметри:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): об'єкт world, що містить інформацію про pickle та тестовий крок
- `context` (`object`): об'єкт Cucumber World

### afterScenario

Запускається після сценарію Cucumber.

Параметри:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): об'єкт world, що містить інформацію про pickle та тестовий крок
- `result` (`object`): об'єкт результатів, що містить результати сценарію
- `result.passed` (`boolean`): true, якщо сценарій пройшов
- `result.error` (`string`): стек помилок, якщо сценарій не пройшов
- `result.duration` (`number`): тривалість сценарію в мілісекундах
- `context` (`object`): об'єкт Cucumber World

### beforeStep

Запускається перед кроком Cucumber.

Параметри:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): об'єкт кроку Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): об'єкт сценарію Cucumber
- `context` (`object`): об'єкт Cucumber World

### afterStep

Запускається після кроку Cucumber.

Параметри:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): об'єкт кроку Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): об'єкт сценарію Cucumber
- `result`: (`object`): об'єкт результатів, що містить результати кроків
- `result.passed` (`boolean`): true, якщо сценарій пройшов
- `result.error` (`string`): стек помилок, якщо сценарій не пройшов
- `result.duration` (`number`): тривалість сценарію в мілісекундах
- `context` (`object`): об'єкт Cucumber World

### beforeAssertion

Хук, який виконується перед твердженням WebdriverIO.

Параметри:

- `params`: інформація про твердження
- `params.matcherName` (`string`): назва співставника (наприклад, `toHaveTitle`)
- `params.expectedValue`: значення, яке передається у співставник
- `params.options`: опції твердження

### afterAssertion

Хук, який виконується після твердження WebdriverIO.

Параметри:

- `params`: інформація про твердження
- `params.matcherName` (`string`): назва співставника (наприклад, `toHaveTitle`)
- `params.expectedValue`: значення, яке передається у співставник
- `params.options`: опції твердження
- `params.result`: результати твердження