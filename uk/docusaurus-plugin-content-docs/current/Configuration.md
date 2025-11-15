---
id: configuration
title: Конфігурація
---

В залежності від [типу налаштування](/docs/setuptypes) (наприклад, використання необроблених протокольних прив'язок, WebdriverIO як окремого пакету або тестового раннера WDIO) доступний різний набір опцій для керування середовищем.

## Опції WebDriver

Наступні опції визначені при використанні пакету протоколу [`webdriver`](https://www.npmjs.com/package/webdriver):

### protocol

Протокол, який використовується при комунікації з сервером драйвера.

Тип: `String`<br />
За замовчуванням: `http`

### hostname

Хост вашого сервера драйвера.

Тип: `String`<br />
За замовчуванням: `0.0.0.0`

### port

Порт, на якому знаходиться ваш сервер драйвера.

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

Ваше ім'я користувача хмарного сервісу (працює лише для облікових записів [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) або [LambdaTest](https://www.lambdatest.com)). Якщо встановлено, WebdriverIO автоматично налаштує параметри з'єднання для вас. Якщо ви не використовуєте хмарний провайдер, це можна використати для автентифікації в будь-якому іншому бекенді WebDriver.

Тип: `String`<br />
За замовчуванням: `undefined`

### key

Ваш ключ доступу або секретний ключ хмарного сервісу (працює лише для облікових записів [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) або [LambdaTest](https://www.lambdatest.com)). Якщо встановлено, WebdriverIO автоматично налаштує параметри з'єднання для вас. Якщо ви не використовуєте хмарний провайдер, це можна використати для автентифікації в будь-якому іншому бекенді WebDriver.

Тип: `String`<br />
За замовчуванням: `undefined`

### capabilities

Визначає можливості, які ви хочете використовувати у вашій сесії WebDriver. Перегляньте [протокол WebDriver](https://w3c.github.io/webdriver/#capabilities) для отримання більш детальної інформації. Якщо ви використовуєте старий драйвер, який не підтримує протокол WebDriver, вам потрібно буде використовувати [можливості JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities), щоб успішно запустити сесію.

Окрім можливостей, заснованих на WebDriver, ви можете застосувати опції, специфічні для браузера та постачальника, які дозволяють глибше налаштувати віддалений браузер або пристрій. Вони документовані у відповідних документах постачальників, наприклад:

- `goog:chromeOptions`: для [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: для [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: для [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: для [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: для [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: для [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Крім того, корисним інструментом є [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) від Sauce Labs, який допомагає створити цей об'єкт, клікаючи разом потрібні можливості.

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

Якщо ви запускаєте веб- або нативні тести на мобільних пристроях, `capabilities` відрізняється від протоколу WebDriver. Див. [документацію Appium](https://appium.io/docs/en/latest/guides/caps/) для отримання більш детальної інформації.

### logLevel

Рівень детальності логування.

Тип: `String`<br />
За замовчуванням: `info`<br />
Опції: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

Директорія для зберігання всіх лог-файлів тестового раннера (включаючи логи репортерів та логи `wdio`). Якщо не встановлено, всі логи передаються на `stdout`. Оскільки більшість репортерів створені для логування на `stdout`, рекомендується використовувати цю опцію лише для конкретних репортерів, де більш доцільно передавати звіти у файл (наприклад, для репортера `junit`).

При запуску в режимі standalone, єдиним логом, що генерується WebdriverIO, буде лог `wdio`.

Тип: `String`<br />
За замовчуванням: `null`

### connectionRetryTimeout

Таймаут для будь-якого запиту WebDriver до драйвера чи грід.

Тип: `Number`<br />
За замовчуванням: `120000`

### connectionRetryCount

Максимальна кількість повторних запитів до сервера Selenium.

Тип: `Number`<br />
За замовчуванням: `3`

### agent

Дозволяє використовувати власний агент `http`/`https`/`http2` [agent](https://www.npmjs.com/package/got#agent) для надсилання запитів.

Тип: `Object`<br />
За замовчуванням:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

Вказати користувацькі `headers` для передачі у кожен запит WebDriver. Якщо ваш Selenium Grid вимагає базової автентифікації, ми рекомендуємо передати заголовок `Authorization` через цю опцію для автентифікації ваших запитів WebDriver, наприклад:

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

Функція перехоплення [опцій HTTP-запиту](https://github.com/sindresorhus/got#options) перед виконанням запиту WebDriver

Тип: `(RequestOptions) => RequestOptions`<br />
За замовчуванням: *немає*

### transformResponse

Функція перехоплення об'єктів HTTP-відповіді після надходження відповіді WebDriver. Функції передається оригінальний об'єкт відповіді як перший аргумент та відповідні `RequestOptions` як другий аргумент.

Тип: `(Response, RequestOptions) => Response`<br />
За замовчуванням: *немає*

### strictSSL

Чи не вимагається дійсний сертифікат SSL.
Може бути встановлено через змінні середовища як `STRICT_SSL` або `strict_ssl`.

Тип: `Boolean`<br />
За замовчуванням: `true`

### enableDirectConnect

Чи активувати [функцію прямого з'єднання Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments).
Нічого не робить, якщо відповідь не містить правильних ключів при активованому прапорці.

Тип: `Boolean`<br />
За замовчуванням: `true`

### cacheDir

Шлях до кореневого каталогу кешу. Ця директорія використовується для зберігання всіх драйверів, які завантажуються при спробі розпочати сесію.

Тип: `String`<br />
За замовчуванням: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

Для більш безпечного логування, регулярні вирази, встановлені за допомогою `maskingPatterns`, можуть обфускувати конфіденційну інформацію з логів.
 - Формат рядка — це регулярний вираз з прапорцями або без них (наприклад, `/.../i`) та через кому для кількох регулярних виразів.
 - Для отримання більш детальної інформації про шаблони маскування, див. [розділ Masking Patterns у README WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

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

Наступні опції (включаючи перераховані вище) можуть бути використані з WebdriverIO в режимі standalone:

### automationProtocol

Визначте протокол, який ви хочете використовувати для автоматизації браузера. Наразі підтримується лише [`webdriver`](https://www.npmjs.com/package/webdriver), оскільки це основна технологія автоматизації браузера, яку використовує WebdriverIO.

Якщо ви хочете автоматизувати браузер за допомогою іншої технології автоматизації, переконайтеся, що ви встановили цю властивість на шлях, який вказує на модуль, що відповідає такому інтерфейсу:

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
- Якщо ваш параметр `url` починається з `/`, то `baseUrl` додається перед ним (за винятком шляху `baseUrl`, якщо він існує).
- Якщо ваш параметр `url` починається без схеми або `/` (наприклад, `some/path`), то повний `baseUrl` додається безпосередньо перед ним.

Тип: `String`<br />
За замовчуванням: `null`

### waitforTimeout

Таймаут за замовчуванням для всіх команд `waitFor*`. (Зауважте маленьку літеру `f` в назві опції.) Цей таймаут __тільки__ впливає на команди, що починаються з `waitFor*`, та їх час очікування за замовчуванням.

Щоб збільшити таймаут для _тесту_, будь ласка, зверніться до документації фреймворка.

Тип: `Number`<br />
За замовчуванням: `5000`

### waitforInterval

Інтервал за замовчуванням для всіх команд `waitFor*` для перевірки, чи змінився очікуваний стан (наприклад, видимість).

Тип: `Number`<br />
За замовчуванням: `100`

### region

При запуску на Sauce Labs ви можете вибрати запуск тестів у різних центрах обробки даних: US або EU.
Щоб змінити регіон на EU, додайте `region: 'eu'` до вашої конфігурації.

__Примітка:__ Це має ефект лише якщо ви надаєте опції `user` і `key`, які пов'язані з вашим обліковим записом Sauce Labs.

Тип: `String`<br />
За замовчуванням: `us`

*(тільки для vm та або em/simulators)*

---

## Опції тестраннера

Наступні опції (включаючи перераховані вище) визначені лише для запуску WebdriverIO з тестраннером WDIO:

### specs

Визначте специфікації для виконання тесту. Ви можете вказати шаблон glob для співставлення кількох файлів одночасно або загорнути glob чи набір шляхів у масив, щоб запустити їх в рамках одного процесу-воркера. Усі шляхи розглядаються як відносні від шляху файлу конфігурації.

Тип: `(String | String[])[]`<br />
За замовчуванням: `[]`

### exclude

Виключити специфікації з виконання тесту. Усі шляхи розглядаються як відносні від шляху файлу конфігурації.

Тип: `String[]`<br />
За замовчуванням: `[]`

### suites

Об'єкт, що описує різні набори (suites), які ви можете вказати за допомогою опції `--suite` в CLI `wdio`.

Тип: `Object`<br />
За замовчуванням: `{}`

### capabilities

Те саме, що і секція `capabilities`, описана вище, за винятком можливості вказати об'єкт [`multiremote`](/docs/multiremote) або кілька сесій WebDriver у масиві для паралельного виконання.

Ви можете застосовувати ті самі можливості, специфічні для постачальника та браузера, як визначено [вище](/docs/configuration#capabilities).

Тип: `Object`|`Object[]`<br />
За замовчуванням: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

Максимальна кількість загальних паралельно працюючих воркерів.

__Примітка:__ це може бути число до `100`, коли тести виконуються на деяких зовнішніх постачальниках, таких як машини Sauce Labs. Там тести проводяться не на одній машині, а на кількох віртуальних машинах. Якщо тести мають запускатися на локальній машині для розробки, використовуйте більш розумне число, наприклад `3`, `4` або `5`. По суті, це кількість браузерів, які будуть одночасно запущені та виконуватимуть ваші тести одночасно, тому це залежить від того, скільки оперативної пам'яті є на вашій машині і скільки інших додатків працює на вашій машині.

Ви також можете застосувати `maxInstances` в об'єктах можливостей за допомогою можливості `wdio:maxInstances`. Це обмежить кількість паралельних сесій для цієї конкретної можливості.

Тип: `Number`<br />
За замовчуванням: `100`

### maxInstancesPerCapability

Максимальна кількість загальних паралельно працюючих воркерів для кожної можливості.

Тип: `Number`<br />
За замовчуванням: `100`

### injectGlobals

Вставляє глобальні об'єкти WebdriverIO (наприклад, `browser`, `$` та `$$`) в глобальне середовище.
Якщо ви встановите на `false`, вам слід імпортувати з `@wdio/globals`, наприклад:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Примітка: WebdriverIO не обробляє ін'єкцію глобальних змінних, специфічних для тестового фреймворка.

Тип: `Boolean`<br />
За замовчуванням: `true`

### bail

Якщо ви хочете, щоб ваш тестовий запуск зупинявся після певної кількості невдалих тестів, використовуйте `bail`.
(За замовчуванням `0`, що запускає всі тести незалежно від результату.) **Примітка:** Тест в цьому контексті - це всі тести в межах одного файлу специфікації (при використанні Mocha або Jasmine) або всі кроки в файлі функцій (при використанні Cucumber). Якщо ви хочете контролювати поведінку bail в межах тестів одного тестового файлу, зверніть увагу на доступні опції [фреймворку](frameworks).

Тип: `Number`<br />
За замовчуванням: `0` (не зупиняти; запустити всі тести)

### specFileRetries

Кількість повторних спроб для всього файлу специфікації, коли він повністю не проходить.

Тип: `Number`<br />
За замовчуванням: `0`

### specFileRetriesDelay

Затримка в секундах між спробами повторного запуску файлу специфікації

Тип: `Number`<br />
За замовчуванням: `0`

### specFileRetriesDeferred

Чи повинні повторні спроби для файлів специфікації повторюватися негайно або бути відкладеними в кінець черги.

Тип: `Boolean`<br />
За замовчуванням: `true`

### groupLogsByTestSpec

Виберіть вигляд виведення логів.

Якщо встановлено на `false`, логи з різних тестових файлів будуть виводитися в реальному часі. Зауважте, що це може призвести до змішування виводу логів з різних файлів при паралельному запуску.

Якщо встановлено на `true`, виводи логів будуть згруповані за Test Spec і надруковані лише після завершення Test Spec.

За замовчуванням це встановлено на `false`, тому логи виводяться в реальному часі.

Тип: `Boolean`<br />
За замовчуванням: `false`

### autoAssertOnTestEnd

Контролює, чи WebdriverIO автоматично перевіряє всі м'які твердження в кінці кожного тесту. Коли встановлено на `true`, будь-які накопичені м'які твердження будуть автоматично перевірені і викличуть збій тесту, якщо будь-які твердження не пройшли. Коли встановлено на `false`, ви повинні вручну викликати метод assert для перевірки м'яких тверджень.

Тип: `Boolean`<br />
За замовчуванням: `true`

### services

Сервіси беруть на себе конкретну роботу, про яку ви не хочете піклуватися. Вони покращують вашу тестову конфігурацію практично без зусиль.

Тип: `String[]|Object[]`<br />
За замовчуванням: `[]`

### framework

Визначає тестовий фреймворк, який буде використовуватися тестраннером WDIO.

Тип: `String`<br />
За замовчуванням: `mocha`<br />
Опції: `mocha` | `jasmine`

### mochaOpts, jasmineOpts та cucumberOpts

Специфічні для фреймворка опції. Див. документацію адаптера фреймворка щодо доступних опцій. Детальніше про це у [Frameworks](frameworks).

Тип: `Object`<br />
За замовчуванням: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

Список функцій cucumber з номерами рядків (при [використанні фреймворка cucumber](./Frameworks.md#using-cucumber)).

Тип: `String[]`
За замовчуванням: `[]`

### reporters

Список репортерів для використання. Репортер може бути рядком або масивом
`['reporterName', { /* reporter options */}]`, де перший елемент - це рядок з ім'ям репортера, а другий елемент - об'єкт з опціями репортера.

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

Визначає, з яким інтервалом репортери повинні перевіряти, чи вони синхронізовані, якщо вони асинхронно повідомляють про свої логи (наприклад, якщо логи передаються сторонньому постачальнику).

Тип: `Number`<br />
За замовчуванням: `100` (мс)

### reporterSyncTimeout

Визначає максимальний час, який мають репортери для завершення завантаження всіх своїх логів, перш ніж тестраннер викине помилку.

Тип: `Number`<br />
За замовчуванням: `5000` (мс)

### execArgv

Аргументи Node, які потрібно вказати при запуску дочірніх процесів.

Тип: `String[]`<br />
За замовчуванням: `null`

### filesToWatch

Список рядкових шаблонів з підтримкою glob, які вказують тестраннеру додатково спостерігати за іншими файлами, наприклад, файлами додатків, при запуску з прапорцем `--watch`. За замовчуванням тестраннер вже спостерігає за всіма файлами специфікацій.

Тип: `String[]`<br />
За замовчуванням: `[]`

### updateSnapshots

Встановіть на true, якщо ви хочете оновити свої знімки. В ідеалі використовується як частина параметра CLI, наприклад, `wdio run wdio.conf.js --s`.

Тип: `'new' | 'all' | 'none'`<br />
За замовчуванням: `none` якщо не вказано і тести запускаються в CI, `new` якщо не вказано, інакше те, що було вказано

### resolveSnapshotPath

Перевизначає шлях до знімків за замовчуванням. Наприклад, щоб зберігати знімки поряд з тестовими файлами.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

Тип: `(testPath: string, snapExtension: string) => string`<br />
За замовчуванням: зберігає файли знімків у директорії `__snapshots__` поряд з тестовим файлом

### tsConfigPath

WDIO використовує `tsx` для компіляції файлів TypeScript. Ваш TSConfig автоматично визначається з поточного робочого каталогу, але ви можете вказати користувацький шлях тут або встановивши змінну середовища TSX_TSCONFIG_PATH.

Дивіться документацію `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

Тип: `String`<br />
За замовчуванням: `null`<br />

## Хуки

Тестраннер WDIO дозволяє встановлювати хуки, які спрацьовують у певний час життєвого циклу тесту. Це дозволяє виконувати користувацькі дії (наприклад, робити знімки екрана, якщо тест не пройшов).

Кожен хук має в якості параметра конкретну інформацію про життєвий цикл (наприклад, інформацію про тестовий набір або тест). Детальніше про всі властивості хуків читайте в [нашому прикладі конфігурації](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Примітка:** Деякі хуки (`onPrepare`, `onWorkerStart`, `onWorkerEnd` та `onComplete`) виконуються в іншому процесі і тому не можуть ділитися будь-якими глобальними даними з іншими хуками, які живуть у процесі-воркері.

### onPrepare

Виконується один раз перед запуском всіх воркерів.

Параметри:

- `config` (`object`): об'єкт конфігурації WebdriverIO
- `param` (`object[]`): список деталей можливостей

### onWorkerStart

Виконується перед створенням процесу-воркера і може бути використаний для ініціалізації конкретного сервісу для цього воркера, а також для модифікації середовища виконання в асинхронному режимі.

Параметри:

- `cid` (`string`): ідентифікатор можливості (наприклад, 0-0)
- `caps` (`object`): містить можливості для сесії, яка буде створена в воркері
- `specs` (`string[]`): специфікації, які будуть запущені в процесі-воркері
- `args` (`object`): об'єкт, який буде об'єднаний з основною конфігурацією після ініціалізації воркера
- `execArgv` (`string[]`): список рядкових аргументів, переданих процесу-воркеру

### onWorkerEnd

Виконується відразу після завершення процесу-воркера.

Параметри:

- `cid` (`string`): ідентифікатор можливості (наприклад, 0-0)
- `exitCode` (`number`): 0 - успіх, 1 - невдача
- `specs` (`string[]`): специфікації, які були запущені в процесі-воркері
- `retries` (`number`): кількість повторних спроб на рівні специфікації, як визначено в [_"Додавання повторних спроб на основі файлу специфікації"_](./Retry.md#add-retries-on-a-per-specfile-basis)

### beforeSession

Виконується безпосередньо перед ініціалізацією сесії webdriver та тестового фреймворка. Це дозволяє маніпулювати конфігураціями в залежності від можливостей або специфікації.

Параметри:

- `config` (`object`): об'єкт конфігурації WebdriverIO
- `caps` (`object`): містить можливості для сесії, яка буде створена в воркері
- `specs` (`string[]`): специфікації, які будуть запущені в процесі-воркері

### before

Виконується перед початком виконання тесту. На цьому етапі ви маєте доступ до всіх глобальних змінних, таких як `browser`. Це ідеальне місце для визначення користувацьких команд.

Параметри:

- `caps` (`object`): містить можливості для сесії, яка буде створена в воркері
- `specs` (`string[]`): специфікації, які будуть запущені в процесі-воркері
- `browser` (`object`): екземпляр створеної сесії браузера/пристрою

### beforeSuite

Хук, який виконується перед початком набору (тільки в Mocha/Jasmine)

Параметри:

- `suite` (`object`): деталі набору

### beforeHook

Хук, який виконується *перед* хуком в наборі (наприклад, запускається перед викликом beforeEach в Mocha)

Параметри:

- `test` (`object`): деталі тесту
- `context` (`object`): контекст тесту (представляє об'єкт World в Cucumber)

### afterHook

Хук, який виконується *після* хука в наборі (наприклад, запускається після виклику afterEach в Mocha)

Параметри:

- `test` (`object`): деталі тесту
- `context` (`object`): контекст тесту (представляє об'єкт World в Cucumber)
- `result` (`object`): результат хука (містить властивості `error`, `result`, `duration`, `passed`, `retries`)

### beforeTest

Функція, яка виконується перед тестом (тільки в Mocha/Jasmine).

Параметри:

- `test` (`object`): деталі тесту
- `context` (`object`): об'єкт області видимості, з яким був виконаний тест

### beforeCommand

Запускається перед виконанням команди WebdriverIO.

Параметри:

- `commandName` (`string`): ім'я команди
- `args` (`*`): аргументи, які б отримала команда

### afterCommand

Запускається після виконання команди WebdriverIO.

Параметри:

- `commandName` (`string`): ім'я команди
- `args` (`*`): аргументи, які б отримала команда
- `result` (`*`): результат команди
- `error` (`Error`): об'єкт помилки, якщо є

### afterTest

Функція, яка виконується після завершення тесту (в Mocha/Jasmine).

Параметри:

- `test` (`object`): деталі тесту
- `context` (`object`): об'єкт області видимості, з яким був виконаний тест
- `result.error` (`Error`): об'єкт помилки, якщо тест не пройшов, інакше `undefined`
- `result.result` (`Any`): повертаємий об'єкт тестової функції
- `result.duration` (`Number`): тривалість тесту
- `result.passed` (`Boolean`): true, якщо тест пройшов, інакше false
- `result.retries` (`Object`): інформація про повторні спроби окремих тестів, як визначено для [Mocha та Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha), а також [Cucumber](./Retry.md#rerunning-in-cucumber), наприклад, `{ attempts: 0, limit: 0 }`, див.
- `result` (`object`): результат хука (містить властивості `error`, `result`, `duration`, `passed`, `retries`)

### afterSuite

Хук, який виконується після завершення набору (тільки в Mocha/Jasmine)

Параметри:

- `suite` (`object`): деталі набору

### after

Виконується після завершення всіх тестів. У вас все ще є доступ до всіх глобальних змінних з тесту.

Параметри:

- `result` (`number`): 0 - тест пройшов, 1 - тест не пройшов
- `caps` (`object`): містить можливості для сесії, яка буде створена в воркері
- `specs` (`string[]`): специфікації, які будуть запущені в процесі-воркері

### afterSession

Виконується відразу після завершення сесії webdriver.

Параметри:

- `config` (`object`): об'єкт конфігурації WebdriverIO
- `caps` (`object`): містить можливості для сесії, яка буде створена в воркері
- `specs` (`string[]`): специфікації, які будуть запущені в процесі-воркері

### onComplete

Виконується після завершення роботи всіх воркерів і перед завершенням процесу. Помилка, викинута в хуці onComplete, призведе до невдачі тестового запуску.

Параметри:

- `exitCode` (`number`): 0 - успіх, 1 - невдача
- `config` (`object`): об'єкт конфігурації WebdriverIO
- `caps` (`object`): містить можливості для сесії, яка буде створена в воркері
- `result` (`object`): об'єкт результатів, що містить результати тестів

### onReload

Виконується при оновленні.

Параметри:

- `oldSessionId` (`string`): ідентифікатор сесії старої сесії
- `newSessionId` (`string`): ідентифікатор сесії нової сесії

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

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): об'єкт світу, що містить інформацію про pickle та тестовий крок
- `context` (`object`): об'єкт Cucumber World

### afterScenario

Запускається після сценарію Cucumber.

Параметри:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): об'єкт світу, що містить інформацію про pickle та тестовий крок
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
- `result`: (`object`): об'єкт результатів, що містить результати кроку
- `result.passed` (`boolean`): true, якщо сценарій пройшов
- `result.error` (`string`): стек помилок, якщо сценарій не пройшов
- `result.duration` (`number`): тривалість сценарію в мілісекундах
- `context` (`object`): об'єкт Cucumber World

### beforeAssertion

Хук, який виконується перед твердженням WebdriverIO.

Параметри:

- `params`: інформація про твердження
- `params.matcherName` (`string`): ім'я матчера (наприклад, `toHaveTitle`)
- `params.expectedValue`: значення, що передається в матчер
- `params.options`: опції твердження

### afterAssertion

Хук, який виконується після твердження WebdriverIO.

Параметри:

- `params`: інформація про твердження
- `params.matcherName` (`string`): ім'я матчера (наприклад, `toHaveTitle`)
- `params.expectedValue`: значення, що передається в матчер
- `params.options`: опції твердження
- `params.result`: результати твердження