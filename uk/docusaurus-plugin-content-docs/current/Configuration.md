---
id: configuration
title: Конфігурація
---

В залежності від [типу налаштування](/docs/setuptypes) (наприклад, використання сирих прив'язок протоколу, WebdriverIO як окремого пакету або тестраннера WDIO) доступний різний набір опцій для керування середовищем.

## Опції WebDriver

Наступні опції визначені при використанні пакету протоколу [`webdriver`](https://www.npmjs.com/package/webdriver):

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

Ваше ім'я користувача хмарного сервісу (працює лише для облікових записів [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) або [LambdaTest](https://www.lambdatest.com)). Якщо встановлено, WebdriverIO автоматично налаштує параметри з'єднання для вас. Якщо ви не використовуєте хмарного провайдера, це можна використовувати для аутентифікації будь-якого іншого бекенду WebDriver.

Тип: `String`<br />
За замовчуванням: `undefined`

### key

Ваш ключ доступу до хмарного сервісу або секретний ключ (працює лише для облікових записів [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) або [LambdaTest](https://www.lambdatest.com)). Якщо встановлено, WebdriverIO автоматично налаштує параметри з'єднання для вас. Якщо ви не використовуєте хмарного провайдера, це можна використовувати для аутентифікації будь-якого іншого бекенду WebDriver.

Тип: `String`<br />
За замовчуванням: `undefined`

### capabilities

Визначає можливості, які ви хочете використовувати у вашій сесії WebDriver. Перегляньте [WebDriver Protocol](https://w3c.github.io/webdriver/#capabilities) для отримання детальної інформації. Якщо ви використовуєте старіший драйвер, який не підтримує протокол WebDriver, вам потрібно буде використовувати можливості [JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) для успішного запуску сесії.

Окрім можливостей на основі WebDriver, ви можете застосовувати специфічні для браузера та постачальника опції, які дозволяють глибше налаштовувати віддалений браузер або пристрій. Вони документовані у відповідних документах постачальників, наприклад:

- `goog:chromeOptions`: для [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: для [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: для [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: для [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: для [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: для [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Крім того, корисним інструментом є [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) від Sauce Labs, який допоможе вам створити цей об'єкт, вибравши бажані можливості.

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

Якщо ви запускаєте веб- або нативні тести на мобільних пристроях, `capabilities` відрізняється від протоколу WebDriver. Дивіться [Appium Docs](https://appium.io/docs/en/latest/guides/caps/) для отримання додаткової інформації.

### logLevel

Рівень детальності логування.

Тип: `String`<br />
За замовчуванням: `info`<br />
Опції: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

Директорія для зберігання всіх лог-файлів тестраннера (включаючи логи репортерів та логи `wdio`). Якщо не встановлено, всі логи транслюються в `stdout`. Оскільки більшість репортерів налаштовані для запису в `stdout`, рекомендується використовувати цю опцію лише для конкретних репортерів, де має більше сенсу виводити звіт у файл (наприклад, для репортера `junit`).

При роботі в автономному режимі, єдиним логом, який генерує WebdriverIO, буде лог `wdio`.

Тип: `String`<br />
За замовчуванням: `null`

### connectionRetryTimeout

Таймаут для будь-якого запиту WebDriver до драйвера або гріда.

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

Вказати власні `headers` для передачі в кожен запит WebDriver. Якщо ваш Selenium Grid вимагає Basic Authentication, ми рекомендуємо передати заголовок `Authorization` через цю опцію для аутентифікації ваших запитів WebDriver, наприклад:

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

Функція перехоплення об'єктів HTTP-відповіді після надходження відповіді WebDriver. Функції передається оригінальний об'єкт відповіді як перший параметр та відповідний `RequestOptions` як другий параметр.

Тип: `(Response, RequestOptions) => Response`<br />
За замовчуванням: *немає*

### strictSSL

Чи потрібно, щоб SSL-сертифікат був дійсним.
Може бути встановлено через змінні середовища як `STRICT_SSL` або `strict_ssl`.

Тип: `Boolean`<br />
За замовчуванням: `true`

### enableDirectConnect

Чи включити [функцію прямого підключення Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments).
Не робить нічого, якщо відповідь не мала потрібних ключів, коли прапорець увімкнено.

Тип: `Boolean`<br />
За замовчуванням: `true`

### cacheDir

Шлях до кореня каталогу кешу. Цей каталог використовується для зберігання всіх драйверів, які завантажуються при спробі запустити сесію.

Тип: `String`<br />
За замовчуванням: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

Для більш безпечного логування, регулярні вирази, встановлені за допомогою `maskingPatterns`, можуть приховувати конфіденційну інформацію з логу.
 - Формат рядка — це регулярний вираз з прапорами або без них (наприклад, `/.../i`) і розділений комами для кількох регулярних виразів.
 - Для отримання додаткової інформації про шаблони маскування, див. [розділ Шаблони маскування в README WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

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

Визначте протокол, який ви хочете використовувати для автоматизації браузера. В даний час підтримується лише [`webdriver`](https://www.npmjs.com/package/webdriver), оскільки це основна технологія автоматизації браузера, яку використовує WebdriverIO.

Якщо ви хочете автоматизувати браузер за допомогою іншої технології автоматизації, переконайтеся, що ви встановили цю властивість на шлях, який веде до модуля, що відповідає такому інтерфейсу:

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

Скорочує виклики команд `url` шляхом встановлення базового URL.
- Якщо ваш параметр `url` починається з `/`, то `baseUrl` додається спереду (за винятком шляху `baseUrl`, якщо він є).
- Якщо ваш параметр `url` починається без схеми або `/` (наприклад, `some/path`), то повний `baseUrl` додається безпосередньо спереду.

Тип: `String`<br />
За замовчуванням: `null`

### waitforTimeout

Стандартний таймаут для всіх команд `waitFor*`. (Зверніть увагу на маленьку літеру `f` у назві опції.) Цей таймаут __лише__ впливає на команди, які починаються з `waitFor*`, та їхній стандартний час очікування.

Щоб збільшити таймаут для _тесту_, дивіться документацію фреймворку.

Тип: `Number`<br />
За замовчуванням: `5000`

### waitforInterval

Стандартний інтервал для всіх команд `waitFor*` для перевірки, чи змінився очікуваний стан (наприклад, видимість).

Тип: `Number`<br />
За замовчуванням: `100`

### region

Якщо ви працюєте на Sauce Labs, ви можете вибрати запуск тестів між різними центрами обробки даних: US або EU.
Щоб змінити регіон на EU, додайте `region: 'eu'` до вашої конфігурації.

__Примітка:__ Це має вплив лише якщо ви надали параметри `user` і `key`, які пов'язані з вашим обліковим записом Sauce Labs.

Тип: `String`<br />
За замовчуванням: `us`

*(тільки для віртуальних машин та/або емуляторів/симуляторів)*

---

## Опції Testrunner

Наступні опції (включаючи перераховані вище) визначені лише для запуску WebdriverIO з тестраннером WDIO:

### specs

Визначте специфікації для виконання тестів. Ви можете вказати шаблон glob для відповідності декільком файлам одночасно або обгорнути glob або набір шляхів у масив, щоб запустити їх в одному робочому процесі. Усі шляхи розглядаються як відносні від шляху до файлу конфігурації.

Тип: `(String | String[])[]`<br />
За замовчуванням: `[]`

### exclude

Виключити специфікації з виконання тестів. Усі шляхи розглядаються як відносні від шляху до файлу конфігурації.

Тип: `String[]`<br />
За замовчуванням: `[]`

### suites

Об'єкт, що описує різні набори тестів, які ви потім можете вказати за допомогою опції `--suite` в інтерфейсі командного рядка `wdio`.

Тип: `Object`<br />
За замовчуванням: `{}`

### capabilities

Те саме, що і розділ `capabilities`, описаний вище, за винятком можливості вказати об'єкт [`multiremote`](/docs/multiremote) або кілька сесій WebDriver в масиві для паралельного виконання.

Ви можете застосувати ті самі специфічні для постачальника та браузера можливості, як визначено [вище](/docs/configuration#capabilities).

Тип: `Object`|`Object[]`<br />
За замовчуванням: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

Максимальна кількість усіх паралельних робочих процесів.

__Примітка:__ це може бути число аж до `100`, коли тести виконуються на зовнішніх вендорах, таких як машини Sauce Labs. Там тести не тестуються на одній машині, а на декількох віртуальних машинах. Якщо тести мають запускатися на локальній машині розробки, використовуйте більш розумне число, наприклад `3`, `4` або `5`. По суті, це кількість браузерів, які будуть одночасно запущені та виконувати ваші тести одночасно, тому це залежить від кількості оперативної пам'яті на вашій машині та кількості інших додатків, що працюють на вашій машині.

Ви також можете застосувати `maxInstances` в об'єктах capabilities, використовуючи можливість `wdio:maxInstances`. Це обмежить кількість паралельних сесій для цієї конкретної можливості.

Тип: `Number`<br />
За замовчуванням: `100`

### maxInstancesPerCapability

Максимальна кількість усіх паралельних робочих процесів на кожну можливість.

Тип: `Number`<br />
За замовчуванням: `100`

### injectGlobals

Вставляє глобальні об'єкти WebdriverIO (наприклад, `browser`, `$` і `$$`) у глобальне середовище.
Якщо встановлено значення `false`, ви повинні імпортувати з `@wdio/globals`, наприклад:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Примітка: WebdriverIO не керує вставкою глобальних об'єктів, специфічних для тестового фреймворку.

Тип: `Boolean`<br />
За замовчуванням: `true`

### bail

Якщо ви хочете, щоб ваш тестовий запуск зупинився після певної кількості невдалих тестів, використовуйте `bail`.
(За замовчуванням це `0`, що виконує всі тести незалежно від результату.) **Примітка:** Тест в цьому контексті — це всі тести в межах одного файлу специфікації (при використанні Mocha або Jasmine) або всі кроки в межах файлу функцій (при використанні Cucumber). Якщо ви хочете контролювати поведінку bail в тестах одного тестового файлу, перегляньте доступні опції [фреймворку](frameworks).

Тип: `Number`<br />
За замовчуванням: `0` (не зупиняється; виконати всі тести)

### specFileRetries

Кількість спроб повторення всього файлу специфікації, коли він повністю не проходить.

Тип: `Number`<br />
За замовчуванням: `0`

### specFileRetriesDelay

Затримка в секундах між спробами повторення файлу специфікації

Тип: `Number`<br />
За замовчуванням: `0`

### specFileRetriesDeferred

Чи повинні повторні спроби файлів специфікації повторюватися негайно або відкладатися в кінець черги.

Тип: `Boolean`<br />
За замовчуванням: `true`

### groupLogsByTestSpec

Виберіть вигляд виводу логів.

Якщо встановлено значення `false`, логи з різних тестових файлів будуть виводитися в реальному часі. Зверніть увагу, що це може призвести до змішування виводів логів з різних файлів при паралельному запуску.

Якщо встановлено значення `true`, виводи логів будуть згруповані за тестовою специфікацією і виводитися лише після завершення тестової специфікації.

За замовчуванням встановлено значення `false`, тому логи виводяться в реальному часі.

Тип: `Boolean`<br />
За замовчуванням: `false`

### autoAssertOnTestEnd

Контролює, чи WebdriverIO автоматично перевіряє всі м'які твердження в кінці кожного тесту. Коли встановлено значення `true`, будь-які накопичені м'які твердження будуть автоматично перевірені і спричинять збій тесту, якщо будь-які твердження не пройшли. Коли встановлено значення `false`, ви повинні вручну викликати метод assert для перевірки м'яких тверджень.

Тип: `Boolean`<br />
За замовчуванням: `true`

### services

Сервіси виконують конкретну роботу, про яку ви не хочете дбати. Вони покращують ваше тестове середовище майже без зусиль.

Тип: `String[]|Object[]`<br />
За замовчуванням: `[]`

### framework

Визначає тестовий фреймворк, який буде використовуватися тестраннером WDIO.

Тип: `String`<br />
За замовчуванням: `mocha`<br />
Опції: `mocha` | `jasmine`

### mochaOpts, jasmineOpts and cucumberOpts

Специфічні для фреймворку опції. Дивіться документацію адаптера фреймворку, які опції доступні. Дізнайтеся більше про це в [Frameworks](frameworks).

Тип: `Object`<br />
За замовчуванням: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

Список функцій cucumber з номерами рядків (при [використанні фреймворку cucumber](./Frameworks.md#using-cucumber)).

Тип: `String[]`
За замовчуванням: `[]`

### reporters

Список репортерів для використання. Репортер може бути або рядком, або масивом
`['reporterName', { /* reporter options */}]`, де перший елемент — це рядок з ім'ям репортера, а другий елемент — об'єкт з опціями репортера.

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

Визначає, через який інтервал репортер повинен перевіряти, чи вони синхронізовані, якщо вони повідомляють свої логи асинхронно (наприклад, якщо логи передаються стрімом до стороннього постачальника).

Тип: `Number`<br />
За замовчуванням: `100` (мс)

### reporterSyncTimeout

Визначає максимальний час, який репортери мають для завершення завантаження всіх своїх логів, поки тестраннер не видасть помилку.

Тип: `Number`<br />
За замовчуванням: `5000` (мс)

### execArgv

Аргументи Node, які потрібно вказати при запуску дочірніх процесів.

Тип: `String[]`<br />
За замовчуванням: `null`

### filesToWatch

Список шаблонів рядків з підтримкою glob, які вказують тестраннеру, щоб він додатково стежив за іншими файлами, наприклад, файлами додатків, при запуску з прапорцем `--watch`. За замовчуванням тестраннер вже стежить за всіма файлами специфікацій.

Тип: `String[]`<br />
За замовчуванням: `[]`

### updateSnapshots

Встановіть значення true, якщо ви хочете оновити свої знімки. Ідеально використовувати як частину параметра CLI, наприклад `wdio run wdio.conf.js --s`.

Тип: `'new' | 'all' | 'none'`<br />
За замовчуванням: `none`, якщо не вказано і тести запускаються в CI, `new`, якщо не вказано, інакше те, що було вказано

### resolveSnapshotPath

Перевизначає шлях до знімків за замовчуванням. Наприклад, щоб зберігати знімки поруч з тестовими файлами.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

Тип: `(testPath: string, snapExtension: string) => string`<br />
За замовчуванням: зберігає файли знімків у директорії `__snapshots__` поруч з тестовим файлом

### tsConfigPath

WDIO використовує `tsx` для компіляції файлів TypeScript. Ваш TSConfig автоматично виявляється з поточного робочого каталогу, але ви можете вказати власний шлях тут або встановивши змінну середовища TSX_TSCONFIG_PATH.

Дивіться документацію `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

Тип: `String`<br />
За замовчуванням: `null`<br />

## Хуки

Тестраннер WDIO дозволяє встановлювати хуки, які запускаються в певні моменти життєвого циклу тесту. Це дозволяє виконувати власні дії (наприклад, робити знімок екрану, якщо тест не пройшов).

Кожен хук має як параметр конкретну інформацію про життєвий цикл (наприклад, інформацію про набір тестів або тест). Дізнайтеся більше про всі властивості хуків у [нашому прикладі конфігурації](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Примітка:** Деякі хуки (`onPrepare`, `onWorkerStart`, `onWorkerEnd` та `onComplete`) виконуються в іншому процесі, і тому не можуть ділитися будь-якими глобальними даними з іншими хуками, які живуть у робочому процесі.

### onPrepare

Виконується один раз перед запуском усіх робочих процесів.

Параметри:

- `config` (`object`): об'єкт конфігурації WebdriverIO
- `param` (`object[]`): список деталей можливостей

### onWorkerStart

Виконується перед запуском робочого процесу і може використовуватися для ініціалізації конкретного сервісу для цього процесу, а також для модифікації середовищ виконання в асинхронному режимі.

Параметри:

- `cid` (`string`): ідентифікатор можливості (наприклад, 0-0)
- `caps` (`object`): містить можливості для сесії, яка буде запущена в робочому процесі
- `specs` (`string[]`): специфікації, які будуть запущені в робочому процесі
- `args` (`object`): об'єкт, який буде об'єднаний з основною конфігурацією після ініціалізації робочого процесу
- `execArgv` (`string[]`): список рядкових аргументів, переданих до робочого процесу

### onWorkerEnd

Виконується відразу після завершення робочого процесу.

Параметри:

- `cid` (`string`): ідентифікатор можливості (наприклад, 0-0)
- `exitCode` (`number`): 0 - успіх, 1 - невдача
- `specs` (`string[]`): специфікації, які були запущені в робочому процесі
- `retries` (`number`): кількість повторних спроб на рівні специфікації, які використовуються як визначено в [_"Додати повторні спроби на основі файлу специфікації"_](./Retry.md#add-retries-on-a-per-specfile-basis)

### beforeSession

Виконується безпосередньо перед ініціалізацією сесії webdriver та тестового фреймворку. Дозволяє маніпулювати конфігураціями в залежності від можливості або специфікації.

Параметри:

- `config` (`object`): об'єкт конфігурації WebdriverIO
- `caps` (`object`): містить можливості для сесії, яка буде запущена в робочому процесі
- `specs` (`string[]`): специфікації, які будуть запущені в робочому процесі

### before

Виконується перед початком виконання тесту. На цьому етапі ви можете отримати доступ до всіх глобальних змінних, таких як `browser`. Це ідеальне місце для визначення власних команд.

Параметри:

- `caps` (`object`): містить можливості для сесії, яка буде запущена в робочому процесі
- `specs` (`string[]`): специфікації, які будуть запущені в робочому процесі
- `browser` (`object`): екземпляр створеної сесії браузера/пристрою

### beforeSuite

Хук, який виконується перед початком набору тестів (тільки в Mocha/Jasmine)

Параметри:

- `suite` (`object`): деталі набору тестів

### beforeHook

Хук, який виконується *перед* хуком всередині набору тестів (наприклад, виконується перед викликом beforeEach в Mocha)

Параметри:

- `test` (`object`): деталі тесту
- `context` (`object`): контекст тесту (представляє об'єкт World в Cucumber)

### afterHook

Хук, який виконується *після* завершення хука всередині набору тестів (наприклад, виконується після виклику afterEach в Mocha)

Параметри:

- `test` (`object`): деталі тесту
- `context` (`object`): контекст тесту (представляє об'єкт World в Cucumber)
- `result` (`object`): результат хука (містить властивості `error`, `result`, `duration`, `passed`, `retries`)

### beforeTest

Функція, яка виконується перед тестом (тільки в Mocha/Jasmine).

Параметри:

- `test` (`object`): деталі тесту
- `context` (`object`): об'єкт області видимості, з яким виконувався тест

### beforeCommand

Виконується перед виконанням команди WebdriverIO.

Параметри:

- `commandName` (`string`): назва команди
- `args` (`*`): аргументи, які отримає команда

### afterCommand

Виконується після виконання команди WebdriverIO.

Параметри:

- `commandName` (`string`): назва команди
- `args` (`*`): аргументи, які отримала команда
- `result` (`number`): 0 - успіх команди, 1 - помилка команди
- `error` (`Error`): об'єкт помилки, якщо є

### afterTest

Функція, яка виконується після завершення тесту (в Mocha/Jasmine).

Параметри:

- `test` (`object`): деталі тесту
- `context` (`object`): об'єкт області видимості, з яким виконувався тест
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

Виконується після завершення всіх тестів. Ви все ще маєте доступ до всіх глобальних змінних з тесту.

Параметри:

- `result` (`number`): 0 - тест пройшов, 1 - тест не пройшов
- `caps` (`object`): містить можливості для сесії, яка була запущена в робочому процесі
- `specs` (`string[]`): специфікації, які були запущені в робочому процесі

### afterSession

Виконується відразу після завершення сесії webdriver.

Параметри:

- `config` (`object`): об'єкт конфігурації WebdriverIO
- `caps` (`object`): містить можливості для сесії, яка була запущена в робочому процесі
- `specs` (`string[]`): специфікації, які були запущені в робочому процесі

### onComplete

Виконується після завершення роботи всіх робочих процесів і перед виходом із процесу. Помилка, викинута в хуці onComplete, призведе до невдачі тестового запуску.

Параметри:

- `exitCode` (`number`): 0 - успіх, 1 - невдача
- `config` (`object`): об'єкт конфігурації WebdriverIO
- `caps` (`object`): містить можливості для сесії, яка була запущена в робочому процесі
- `result` (`object`): об'єкт результатів, що містить результати тестів

### onReload

Виконується при оновленні.

Параметри:

- `oldSessionId` (`string`): ідентифікатор сесії старої сесії
- `newSessionId` (`string`): ідентифікатор сесії нової сесії

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

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): об'єкт світу, що містить інформацію про pickle та тестовий крок
- `context` (`object`): об'єкт Cucumber World

### afterScenario

Виконується після сценарію Cucumber.

Параметри:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): об'єкт світу, що містить інформацію про pickle та тестовий крок
- `result` (`object`): об'єкт результатів, що містить результати сценарію
- `result.passed` (`boolean`): true, якщо сценарій пройшов
- `result.error` (`string`): стек помилки, якщо сценарій не пройшов
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
- `result.error` (`string`): стек помилки, якщо сценарій не пройшов
- `result.duration` (`number`): тривалість сценарію в мілісекундах
- `context` (`object`): об'єкт Cucumber World

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