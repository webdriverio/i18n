---
id: configuration
title: Конфігурація
---

Залежно від [типу налаштування](/docs/setuptypes) (наприклад, використання необроблених зв'язків протоколу, WebdriverIO як окремого пакету або тестраннера WDIO) доступний різний набір опцій для керування середовищем.

## Опції WebDriver

Наступні опції визначені при використанні пакету протоколу [`webdriver`](https://www.npmjs.com/package/webdriver):

### protocol

Протокол для спілкування з сервером драйвера.

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

Ваше ім'я користувача хмарного сервісу (працює лише для облікових записів [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) або [LambdaTest](https://www.lambdatest.com)). Якщо встановлено, WebdriverIO автоматично налаштує параметри з'єднання для вас. Якщо ви не використовуєте хмарний провайдер, це можна використовувати для автентифікації будь-якого іншого бекенду WebDriver.

Тип: `String`<br />
За замовчуванням: `undefined`

### key

Ваш ключ доступу до хмарного сервісу або секретний ключ (працює лише для облікових записів [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) або [LambdaTest](https://www.lambdatest.com)). Якщо встановлено, WebdriverIO автоматично налаштує параметри з'єднання для вас. Якщо ви не використовуєте хмарний провайдер, це можна використовувати для автентифікації будь-якого іншого бекенду WebDriver.

Тип: `String`<br />
За замовчуванням: `undefined`

### capabilities

Визначає можливості, які ви хочете використовувати у вашій сесії WebDriver. Для більш детальної інформації перегляньте [WebDriver Protocol](https://w3c.github.io/webdriver/#capabilities). Якщо ви використовуєте старий драйвер, який не підтримує протокол WebDriver, вам потрібно використовувати [можливості JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities), щоб успішно запустити сесію.

Окрім можливостей на базі WebDriver, ви можете застосувати специфічні для браузера та постачальника опції, які дозволяють більш глибоко налаштувати віддалений браузер або пристрій. Вони задокументовані у відповідних документах постачальників, наприклад:

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

Якщо ви виконуєте веб-тести або нативні тести на мобільних пристроях, `capabilities` відрізняється від протоколу WebDriver. Для більш детальної інформації див. [Appium Docs](https://appium.github.io/appium.io/docs/en/writing-running-appium/caps/).

### logLevel

Рівень деталізації логування.

Тип: `String`<br />
За замовчуванням: `info`<br />
Опції: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

Директорія для зберігання всіх лог-файлів тестраннера (включаючи логи репортера та логи `wdio`). Якщо не встановлено, всі логи транслюються до `stdout`. Оскільки більшість репортерів створені для логування в `stdout`, рекомендується використовувати цю опцію лише для конкретних репортерів, коли має більше сенсу надсилати звіт у файл (наприклад, для репортера `junit`).

При запуску в автономному режимі, єдиний лог, що генерується WebdriverIO, буде лог `wdio`.

Тип: `String`<br />
За замовчуванням: `null`

### connectionRetryTimeout

Таймаут для будь-якого запиту WebDriver до драйвера чи мережі.

Тип: `Number`<br />
За замовчуванням: `120000`

### connectionRetryCount

Максимальна кількість повторних спроб запиту до сервера Selenium.

Тип: `Number`<br />
За замовчуванням: `3`

### agent

Дозволяє використовувати власний `http`/`https`/`http2` [агент](https://www.npmjs.com/package/got#agent) для здійснення запитів.

Тип: `Object`<br />
За замовчуванням:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

Вказує користувацькі `headers`, які будуть передані до кожного запиту WebDriver. Якщо ваша мережа Selenium вимагає базової автентифікації, ми рекомендуємо передати заголовок `Authorization` через цю опцію для автентифікації запитів WebDriver, наприклад:

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

Функція, яка перехоплює [опції HTTP-запиту](https://github.com/sindresorhus/got#options) перед здійсненням запиту WebDriver

Тип: `(RequestOptions) => RequestOptions`<br />
За замовчуванням: *немає*

### transformResponse

Функція, яка перехоплює об'єкти HTTP-відповіді після отримання відповіді WebDriver. Функція отримує оригінальний об'єкт відповіді як перший аргумент і відповідні `RequestOptions` як другий аргумент.

Тип: `(Response, RequestOptions) => Response`<br />
За замовчуванням: *немає*

### strictSSL

Чи не вимагає дійсності SSL-сертифіката.
Може бути встановлено через змінні середовища як `STRICT_SSL` або `strict_ssl`.

Тип: `Boolean`<br />
За замовчуванням: `true`

### enableDirectConnect

Чи вмикати [функцію прямого з'єднання Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments).
Не має ефекту, якщо відповідь не містить відповідних ключів, коли прапорець ввімкнено.

Тип: `Boolean`<br />
За замовчуванням: `true`

### cacheDir

Шлях до кореня директорії кешу. Ця директорія використовується для зберігання всіх драйверів, які завантажуються при спробі запустити сесію.

Тип: `String`<br />
За замовчуванням: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

---

## WebdriverIO

Наступні опції (включаючи перераховані вище) можуть бути використані з WebdriverIO в автономному режимі:

### automationProtocol

Визначте протокол, який ви хочете використовувати для автоматизації браузера. На даний момент підтримується лише [`webdriver`](https://www.npmjs.com/package/webdriver), оскільки це основна технологія автоматизації браузера, яку використовує WebdriverIO.

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
- Якщо ваш параметр `url` починається з `/`, тоді `baseUrl` додається на початок (за винятком шляху `baseUrl`, якщо він є).
- Якщо ваш параметр `url` починається без схеми або `/` (наприклад, `some/path`), тоді повний `baseUrl` додається безпосередньо на початок.

Тип: `String`<br />
За замовчуванням: `null`

### waitforTimeout

Таймаут за замовчуванням для всіх команд `waitFor*`. (Зверніть увагу на малу літеру `f` у назві опції). Цей таймаут __тільки__ впливає на команди, що починаються з `waitFor*`, та їх час очікування за замовчуванням.

Щоб збільшити таймаут для _тесту_, будь ласка, зверніться до документації фреймворку.

Тип: `Number`<br />
За замовчуванням: `5000`

### waitforInterval

Інтервал за замовчуванням для всіх команд `waitFor*` для перевірки, чи змінився очікуваний стан (наприклад, видимість).

Тип: `Number`<br />
За замовчуванням: `100`

### region

Якщо ви працюєте на Sauce Labs, ви можете вибрати, в якому центрі даних запускати тести: US або EU.
Щоб змінити регіон на EU, додайте `region: 'eu'` до вашої конфігурації.

__Примітка:__ Це діє тільки якщо ви надаєте опції `user` і `key`, які пов'язані з вашим обліковим записом Sauce Labs.

Тип: `String`<br />
За замовчуванням: `us`

*(лише для vm та/або em/simulators)*

---

## Опції Testrunner

Наступні опції (включаючи перераховані вище) визначені лише для запуску WebdriverIO з тестраннером WDIO:

### specs

Визначає специфікації для виконання тестів. Ви можете або вказати шаблон glob для відповідності кільком файлам одночасно, або обгорнути glob чи набір шляхів в масив, щоб запустити їх у межах одного робочого процесу. Всі шляхи розглядаються як відносні від шляху файлу конфігурації.

Тип: `(String | String[])[]`<br />
За замовчуванням: `[]`

### exclude

Виключає специфікації з виконання тестів. Всі шляхи розглядаються як відносні від шляху файлу конфігурації.

Тип: `String[]`<br />
За замовчуванням: `[]`

### suites

Об'єкт, що описує різні набори тестів, які ви можете вказати з опцією `--suite` на CLI `wdio`.

Тип: `Object`<br />
За замовчуванням: `{}`

### capabilities

Те саме, що і розділ `capabilities`, описаний вище, за винятком можливості вказати об'єкт [`multiremote`](/docs/multiremote) або кілька сесій WebDriver у масиві для паралельного виконання.

Ви можете застосовувати ті самі специфічні для постачальника та браузера можливості, як визначено [вище](/docs/configuration#capabilities).

Тип: `Object`|`Object[]`<br />
За замовчуванням: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

Максимальна кількість паралельно запущених робочих процесів.

__Примітка:__ це може бути число до `100`, коли тести виконуються на зовнішніх постачальниках, таких як машини Sauce Labs. Там тести не тестуються на одній машині, а скоріше на кількох віртуальних машинах. Якщо тести запускаються на локальній машині розробки, використовуйте більш розумне число, наприклад `3`, `4` або `5`. По суті, це кількість браузерів, які будуть одночасно запущені та виконувати ваші тести одночасно, тому це залежить від кількості оперативної пам'яті на вашій машині та кількості інших запущених додатків.

Ви також можете застосувати `maxInstances` у ваших об'єктах capabilities, використовуючи можливість `wdio:maxInstances`. Це обмежить кількість паралельних сесій для цієї конкретної можливості.

Тип: `Number`<br />
За замовчуванням: `100`

### maxInstancesPerCapability

Максимальна кількість паралельно запущених робочих процесів на можливість.

Тип: `Number`<br />
За замовчуванням: `100`

### injectGlobals

Вставляє глобальні змінні WebdriverIO (наприклад, `browser`, `$` та `$$`) у глобальне середовище.
Якщо встановлено `false`, ви повинні імпортувати їх з `@wdio/globals`, наприклад:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Примітка: WebdriverIO не керує вставленням глобальних змінних тестового фреймворку.

Тип: `Boolean`<br />
За замовчуванням: `true`

### bail

Якщо ви хочете, щоб ваш тестовий запуск зупинився після певної кількості невдалих тестів, використовуйте `bail`.
(За замовчуванням `0`, що означає виконання всіх тестів незалежно від результату). **Примітка:** Тест у цьому контексті - це всі тести в одному файлі специфікації (при використанні Mocha або Jasmine) або всі кроки в файлі функцій (при використанні Cucumber). Якщо ви хочете контролювати поведінку bail в рамках тестів одного тестового файлу, подивіться на доступні опції [фреймворку](frameworks).

Тип: `Number`<br />
За замовчуванням: `0` (без bail; запуск всіх тестів)

### specFileRetries

Кількість спроб повторення всього файлу специфікації, коли він повністю не вдається.

Тип: `Number`<br />
За замовчуванням: `0`

### specFileRetriesDelay

Затримка в секундах між спробами повторення файлу специфікації

Тип: `Number`<br />
За замовчуванням: `0`

### specFileRetriesDeferred

Чи повинні повторені файли специфікації повторюватися негайно або відкладатися в кінець черги.

Тип: `Boolean`<br />
За замовчуванням: `true`

### groupLogsByTestSpec

Виберіть вид виводу логів.

Якщо встановлено `false`, логи з різних тестових файлів будуть друкуватися в реальному часі. Зверніть увагу, що це може призвести до змішування виводів логів з різних файлів при паралельному запуску.

Якщо встановлено `true`, виводи логів будуть згруповані за Test Spec і надруковані тільки коли Test Spec завершено.

За замовчуванням встановлено `false`, тому логи друкуються в реальному часі.

Тип: `Boolean`<br />
За замовчуванням: `false`

### services

Сервіси беруть на себе конкретну роботу, про яку ви не хочете турбуватися. Вони покращують ваше тестове налаштування практично без зусиль.

Тип: `String[]|Object[]`<br />
За замовчуванням: `[]`

### framework

Визначає тестовий фреймворк, який буде використовуватися тестраннером WDIO.

Тип: `String`<br />
За замовчуванням: `mocha`<br />
Опції: `mocha` | `jasmine`

### mochaOpts, jasmineOpts та cucumberOpts

Специфічні для фреймворку опції. Дивіться документацію адаптера фреймворку, які опції доступні. Детальніше про це в [Frameworks](frameworks).

Тип: `Object`<br />
За замовчуванням: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

Список функцій cucumber з номерами рядків (при [використанні фреймворку cucumber](./Frameworks.md#using-cucumber)).

Тип: `String[]`
За замовчуванням: `[]`

### reporters

Список репортерів для використання. Репортер може бути або рядком, або масивом
`['reporterName', { /* reporter options */}]`, де перший елемент — рядок з назвою репортера, а другий елемент — об'єкт з опціями репортера.

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

Визначає інтервал, через який репортер має перевіряти, чи вони синхронізовані, якщо вони звітують про свої логи асинхронно (наприклад, якщо логи транслюються до стороннього постачальника).

Тип: `Number`<br />
За замовчуванням: `100` (мс)

### reporterSyncTimeout

Визначає максимальний час, який репортери мають для завершення завантаження всіх своїх логів до того, як тестраннер згенерує помилку.

Тип: `Number`<br />
За замовчуванням: `5000` (мс)

### execArgv

Аргументи Node для вказівки при запуску дочірніх процесів.

Тип: `String[]`<br />
За замовчуванням: `null`

### filesToWatch

Список патернів рядків з підтримкою glob, які вказують тестраннеру додатково спостерігати за іншими файлами, наприклад, файлами додатків, при запуску з прапорцем `--watch`. За замовчуванням тестраннер вже спостерігає за всіма файлами специфікацій.

Тип: `String[]`<br />
За замовчуванням: `[]`

### updateSnapshots

Встановіть у true, якщо хочете оновити знімки. Ідеально використовувати як частину параметра CLI, наприклад, `wdio run wdio.conf.js --s`.

Тип: `'new' | 'all' | 'none'`<br />
За замовчуванням: `none`, якщо не вказано і тести запускаються в CI, `new`, якщо не вказано, інакше те, що було вказано

### resolveSnapshotPath

Перевизначає шлях до знімка за замовчуванням. Наприклад, щоб зберігати знімки поруч з тестовими файлами.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

Тип: `(testPath: string, snapExtension: string) => string`<br />
За замовчуванням: зберігає файли знімків у директорії `__snapshots__` поруч з тестовим файлом

### tsConfigPath

WDIO використовує `tsx` для компіляції файлів TypeScript. Ваш TSConfig автоматично визначається з поточної робочої директорії, але ви можете вказати власний шлях тут або встановивши змінну середовища TSX_TSCONFIG_PATH.

Див. документацію `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

Тип: `String`<br />
За замовчуванням: `null`<br />

## Хуки

Тестраннер WDIO дозволяє встановлювати хуки, які спрацьовують у певний час життєвого циклу тесту. Це дозволяє виконувати користувацькі дії (наприклад, робити знімок екрана, якщо тест не вдається).

Кожен хук має як параметр специфічну інформацію про життєвий цикл (наприклад, інформацію про набір тестів або тест). Детальніше про всі властивості хуків у [нашому прикладі конфігурації](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Примітка:** Деякі хуки (`onPrepare`, `onWorkerStart`, `onWorkerEnd` та `onComplete`) виконуються в іншому процесі і тому не можуть ділитися глобальними даними з іншими хуками, які працюють у робочому процесі.

### onPrepare

Виконується один раз перед запуском усіх робочих процесів.

Параметри:

- `config` (`object`): об'єкт конфігурації WebdriverIO
- `param` (`object[]`): список деталей можливостей

### onWorkerStart

Виконується перед створенням робочого процесу і може бути використаний для ініціалізації конкретного сервісу для цього робочого процесу, а також для модифікації середовища виконання в асинхронному режимі.

Параметри:

- `cid` (`string`): ідентифікатор можливості (наприклад, 0-0)
- `caps` (`object`): містить можливості для сесії, яка буде створена в робочому процесі
- `specs` (`string[]`): специфікації, які будуть запущені в робочому процесі
- `args` (`object`): об'єкт, який буде об'єднаний з основною конфігурацією після ініціалізації робочого процесу
- `execArgv` (`string[]`): список аргументів рядка, переданих робочому процесу

### onWorkerEnd

Виконується відразу після завершення робочого процесу.

Параметри:

- `cid` (`string`): ідентифікатор можливості (наприклад, 0-0)
- `exitCode` (`number`): 0 - успіх, 1 - помилка
- `specs` (`string[]`): специфікації, які були запущені в робочому процесі
- `retries` (`number`): кількість повторних спроб на рівні специфікації, як визначено в [_"Add retries on a per-specfile basis"_](./Retry.md#add-retries-on-a-per-specfile-basis)

### beforeSession

Виконується безпосередньо перед ініціалізацією сесії webdriver та тестового фреймворку. Це дозволяє маніпулювати конфігураціями в залежності від можливості або специфікації.

Параметри:

- `config` (`object`): об'єкт конфігурації WebdriverIO
- `caps` (`object`): містить можливості для сесії, яка буде створена в робочому процесі
- `specs` (`string[]`): специфікації, які будуть запущені в робочому процесі

### before

Виконується перед початком виконання тесту. На цьому етапі ви можете отримати доступ до всіх глобальних змінних, таких як `browser`. Це ідеальне місце для визначення користувацьких команд.

Параметри:

- `caps` (`object`): містить можливості для сесії, яка буде створена в робочому процесі
- `specs` (`string[]`): специфікації, які будуть запущені в робочому процесі
- `browser` (`object`): екземпляр створеної сесії браузера/пристрою

### beforeSuite

Хук, який виконується перед початком набору тестів (тільки в Mocha/Jasmine)

Параметри:

- `suite` (`object`): деталі набору тестів

### beforeHook

Хук, який виконується *перед* хуком в рамках набору тестів (наприклад, виконується перед викликом beforeEach в Mocha)

Параметри:

- `test` (`object`): деталі тесту
- `context` (`object`): контекст тесту (представляє об'єкт World в Cucumber)

### afterHook

Хук, який виконується *після* хука в рамках набору тестів (наприклад, виконується після виклику afterEach в Mocha)

Параметри:

- `test` (`object`): деталі тесту
- `context` (`object`): контекст тесту (представляє об'єкт World в Cucumber)
- `result` (`object`): результат хука (містить властивості `error`, `result`, `duration`, `passed`, `retries`)

### beforeTest

Функція, яка виконується перед тестом (тільки в Mocha/Jasmine).

Параметри:

- `test` (`object`): деталі тесту
- `context` (`object`): об'єкт області, з яким був виконаний тест

### beforeCommand

Виконується перед виконанням команди WebdriverIO.

Параметри:

- `commandName` (`string`): назва команди
- `args` (`*`): аргументи, які команда отримає

### afterCommand

Виконується після виконання команди WebdriverIO.

Параметри:

- `commandName` (`string`): назва команди
- `args` (`*`): аргументи, які команда отримає
- `result` (`number`): 0 - успіх команди, 1 - помилка команди
- `error` (`Error`): об'єкт помилки, якщо є

### afterTest

Функція, яка виконується після завершення тесту (в Mocha/Jasmine).

Параметри:

- `test` (`object`): деталі тесту
- `context` (`object`): об'єкт області, з яким був виконаний тест
- `result.error` (`Error`): об'єкт помилки у випадку невдачі тесту, інакше `undefined`
- `result.result` (`Any`): об'єкт повернення функції тесту
- `result.duration` (`Number`): тривалість тесту
- `result.passed` (`Boolean`): true, якщо тест пройшов, інакше false
- `result.retries` (`Object`): інформація про повторні спроби окремого тесту, як визначено для [Mocha та Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha), а також [Cucumber](./Retry.md#rerunning-in-cucumber), наприклад, `{ attempts: 0, limit: 0 }`, див.
- `result` (`object`): результат хука (містить властивості `error`, `result`, `duration`, `passed`, `retries`)

### afterSuite

Хук, який виконується після завершення набору тестів (тільки в Mocha/Jasmine)

Параметри:

- `suite` (`object`): деталі набору тестів

### after

Виконується після завершення всіх тестів. У вас все ще є доступ до всіх глобальних змінних з тесту.

Параметри:

- `result` (`number`): 0 - тест пройшов, 1 - тест не вдався
- `caps` (`object`): містить можливості для сесії, яка буде створена в робочому процесі
- `specs` (`string[]`): специфікації, які будуть запущені в робочому процесі

### afterSession

Виконується відразу після завершення сесії webdriver.

Параметри:

- `config` (`object`): об'єкт конфігурації WebdriverIO
- `caps` (`object`): містить можливості для сесії, яка буде створена в робочому процесі
- `specs` (`string[]`): специфікації, які будуть запущені в робочому процесі

### onComplete

Виконується після завершення роботи всіх робочих процесів і процес готовий до завершення. Помилка, викинута в хуку onComplete, призведе до невдачі тестового запуску.

Параметри:

- `exitCode` (`number`): 0 - успіх, 1 - невдача
- `config` (`object`): об'єкт конфігурації WebdriverIO
- `caps` (`object`): містить можливості для сесії, яка буде створена в робочому процесі
- `result` (`object`): об'єкт результатів, що містить результати тестів

### onReload

Виконується при оновленні.

Параметри:

- `oldSessionId` (`string`): ID сесії старої сесії
- `newSessionId` (`string`): ID сесії нової сесії

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

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): об'єкт світу, що містить інформацію про pickle і тестовий крок
- `context` (`object`): об'єкт Cucumber World

### afterScenario

Виконується після сценарію Cucumber.

Параметри:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): об'єкт світу, що містить інформацію про pickle і тестовий крок
- `result` (`object`): об'єкт результатів, що містить результати сценарію
- `result.passed` (`boolean`): true, якщо сценарій пройшов
- `result.error` (`string`): стек помилок, якщо сценарій не вдався
- `result.duration` (`number`): тривалість сценарію в мілісекундах
- `context` (`object`): об'єкт Cucumber World

### beforeStep

Виконується перед кроком Cucumber.

Параметри:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): об'єкт кроку Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): об'єкт сценарію Cucumber
- `context` (`object`): об'єкт Cucumber World

### afterStep

Виконується після кроку Cucumber.

Параметри:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): об'єкт кроку Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): об'єкт сценарію Cucumber
- `result`: (`object`): об'єкт результатів, що містить результати кроку
- `result.passed` (`boolean`): true, якщо сценарій пройшов
- `result.error` (`string`): стек помилок, якщо сценарій не вдався
- `result.duration` (`number`): тривалість сценарію в мілісекундах
- `context` (`object`): об'єкт Cucumber World

### beforeAssertion

Хук, який виконується перед тим, як відбувається ствердження WebdriverIO.

Параметри:

- `params`: інформація про твердження
- `params.matcherName` (`string`): назва матчера (наприклад, `toHaveTitle`)
- `params.expectedValue`: значення, яке передається в матчер
- `params.options`: опції ствердження

### afterAssertion

Хук, який виконується після завершення ствердження WebdriverIO.

Параметри:

- `params`: інформація про твердження
- `params.matcherName` (`string`): назва матчера (наприклад, `toHaveTitle`)
- `params.expectedValue`: значення, яке передається в матчер
- `params.options`: опції ствердження
- `params.result`: результати ствердження