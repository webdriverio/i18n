---
id: configuration
title: Конфігурація
---

Залежно від [типу налаштування](/docs/setuptypes) (наприклад, використання прямих протокольних прив'язок, WebdriverIO як окремий пакет або тестовий раннер WDIO) існує різний набір опцій для керування середовищем.

## Опції WebDriver

Наступні опції визначені при використанні пакету протоколу [`webdriver`](https://www.npmjs.com/package/webdriver):

### protocol

Протокол для взаємодії з сервером драйвера.

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

Параметри запиту, які передаються до сервера драйвера.

Тип: `Object`<br />
За замовчуванням: `undefined`

### user

Ваш логін для хмарного сервісу (працює лише для облікових записів [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) або [TestMu AI](https://www.testmuai.com/)). Якщо встановлено, WebdriverIO автоматично налаштує параметри підключення для вас. Якщо ви не використовуєте хмарного провайдера, це можна використовувати для аутентифікації на будь-якому іншому бекенді WebDriver.

Тип: `String`<br />
За замовчуванням: `undefined`

### key

Ваш ключ доступу або секретний ключ для хмарного сервісу (працює лише для облікових записів [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) або [TestMu AI](https://www.testmuai.com/)). Якщо встановлено, WebdriverIO автоматично налаштує параметри підключення для вас. Якщо ви не використовуєте хмарного провайдера, це можна використовувати для аутентифікації на будь-якому іншому бекенді WebDriver.

Тип: `String`<br />
За замовчуванням: `undefined`

### capabilities

Визначає можливості, які ви хочете запустити у вашій сесії WebDriver. Перегляньте [Протокол WebDriver](https://w3c.github.io/webdriver/#capabilities) для отримання додаткової інформації. Якщо ви використовуєте старий драйвер, який не підтримує протокол WebDriver, вам потрібно буде використовувати [можливості JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) для успішного запуску сесії.

Окрім capabilities на основі WebDriver, ви можете застосувати браузерні та специфічні для постачальника опції, які дозволяють глибше налаштувати віддалений браузер або пристрій. Вони документовані у відповідних документах постачальників, наприклад:

- `goog:chromeOptions`: для [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: для [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: для [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: для [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: для [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: для [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Додатково, корисним інструментом є [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) від Sauce Labs, який допомагає створити цей об'єкт, клацаючи разом потрібні можливості.

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

Якщо ви запускаєте веб- або нативні тести на мобільних пристроях, `capabilities` відрізняється від протоколу WebDriver. Див. [документацію Appium](https://appium.io/docs/en/latest/guides/caps/) для отримання додаткової інформації.

### logLevel

Рівень деталізації логування.

Тип: `String`<br />
За замовчуванням: `info`<br />
Опції: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

Каталог для зберігання всіх файлів логів тестового раннера (включаючи логи репортерів та логи `wdio`). Якщо не встановлено, усі логи будуть передаватися до `stdout`. Оскільки більшість репортерів призначені для логування в `stdout`, рекомендується використовувати цю опцію лише для конкретних репортерів, де має сенс зберігати звіт у файл (наприклад, для репортера `junit`).

При запуску в автономному режимі, єдиним логом, створеним WebdriverIO, буде лог `wdio`.

Тип: `String`<br />
За замовчуванням: `null`

### connectionRetryTimeout

Час очікування для будь-якого запиту WebDriver до драйвера або сітки.

Тип: `Number`<br />
За замовчуванням: `120000`

### connectionRetryCount

Максимальна кількість повторних спроб запиту до сервера Selenium.

Тип: `Number`<br />
За замовчуванням: `3`

### agent

Дозволяє використовувати власний `http`/`https`/`http2` [агент](https://www.npmjs.com/package/got#agent) для виконання запитів.

Тип: `Object`<br />
За замовчуванням:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

Вказати власні `headers`, які будуть передані в кожен запит WebDriver. Якщо ваша Selenium Grid вимагає базової аутентифікації, ми рекомендуємо передавати заголовок `Authorization` через цю опцію для аутентифікації ваших запитів WebDriver, наприклад:

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

Функція перехоплення об'єктів HTTP-відповіді після отримання відповіді WebDriver. Функція отримує оригінальний об'єкт відповіді як перший аргумент і відповідні `RequestOptions` як другий аргумент.

Тип: `(Response, RequestOptions) => Response`<br />
За замовчуванням: *немає*

### strictSSL

Чи потрібно, щоб SSL сертифікат був дійсним.
Може бути встановлено через змінні середовища як `STRICT_SSL` або `strict_ssl`.

Тип: `Boolean`<br />
За замовчуванням: `true`

### enableDirectConnect

Чи увімкнути [функцію прямого підключення Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments).
Не має ефекту, якщо відповідь не містить відповідних ключів, коли прапор увімкнено.

Тип: `Boolean`<br />
За замовчуванням: `true`

### cacheDir

Шлях до кореня каталогу кешу. Цей каталог використовується для зберігання всіх драйверів, які завантажуються при спробі запустити сесію.

Тип: `String`<br />
За замовчуванням: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

Для більш безпечного логування, регулярні вирази, встановлені за допомогою `maskingPatterns`, можуть приховати конфіденційну інформацію з логу.
 - Формат рядка - це регулярний вираз з прапорцями або без них (наприклад, `/.../i`) і через кому для кількох регулярних виразів.
 - Для отримання додаткової інформації про маскуючі патерни, див. [розділ Masking Patterns у README логера WDIO](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

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

Наступні опції (включаючи перелічені вище) можуть бути використані з WebdriverIO в автономному режимі:

### automationProtocol

Визначте протокол, який ви хочете використовувати для автоматизації браузера. На даний момент підтримується лише [`webdriver`](https://www.npmjs.com/package/webdriver), оскільки це основна технологія автоматизації браузера, яку використовує WebdriverIO.

Якщо ви хочете автоматизувати браузер за допомогою іншої технології автоматизації, переконайтеся, що встановили цю властивість на шлях, який вказує на модуль, що відповідає наступному інтерфейсу:

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
- Якщо ваш параметр `url` починається з `/`, то `baseUrl` додається як префікс (за винятком шляху `baseUrl`, якщо він є).
- Якщо ваш параметр `url` починається без схеми або `/` (наприклад, `some/path`), то повний `baseUrl` додається як префікс безпосередньо.

Тип: `String`<br />
За замовчуванням: `null`

### waitforTimeout

Час очікування за замовчуванням для всіх команд `waitFor*`. (Зверніть увагу на малу літеру `f` в назві опції.) Цей тайм-аут __тільки__ впливає на команди, що починаються з `waitFor*` та їхній час очікування за замовчуванням.

Щоб збільшити тайм-аут для _тесту_, будь ласка, зверніться до документації фреймворку.

Тип: `Number`<br />
За замовчуванням: `5000`

### waitforInterval

Інтервал за замовчуванням для всіх команд `waitFor*` для перевірки, чи змінився очікуваний стан (наприклад, видимість).

Тип: `Number`<br />
За замовчуванням: `100`

### region

Якщо ви використовуєте Sauce Labs, ви можете обрати запуск тестів між різними дата-центрами: US або EU.
Щоб змінити регіон на EU, додайте `region: 'eu'` до вашої конфігурації.

__Примітка:__ Це впливає лише якщо ви надали опції `user` та `key`, які пов'язані з вашим обліковим записом Sauce Labs.

Тип: `String`<br />
За замовчуванням: `us`

*(тільки для віртуальних машин та/або емуляторів/симуляторів)*

---

## Опції тестового раннера

Наступні опції (включаючи перелічені вище) визначені лише для запуску WebdriverIO з тестовим раннером WDIO:

### specs

Визначити спеки для виконання тестів. Ви можете або вказати шаблон glob для відповідності кільком файлам одночасно, або обернути glob чи набір шляхів у масив, щоб запустити їх в межах одного робочого процесу. Усі шляхи розглядаються як відносні від шляху файлу конфігурації.

Тип: `(String | String[])[]`<br />
За замовчуванням: `[]`

### exclude

Виключити специфікації з виконання тестів. Усі шляхи розглядаються як відносні від шляху файлу конфігурації.

Тип: `String[]`<br />
За замовчуванням: `[]`

### suites

Об'єкт, що описує різні набори тестів, які ви можете вказати за допомогою опції `--suite` в CLI `wdio`.

Тип: `Object`<br />
За замовчуванням: `{}`

### capabilities

Те ж саме, що і розділ `capabilities`, описаний вище, за винятком можливості вказати об'єкт [`multiremote`](/docs/multiremote) або кілька сесій WebDriver у масиві для паралельного виконання.

Ви можете застосувати ті ж можливості, специфічні для постачальника та браузера, як визначено [вище](/docs/configuration#capabilities).

Тип: `Object`|`Object[]`<br />
За замовчуванням: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

Максимальна кількість загальних паралельних робочих процесів.

__Примітка:__ це може бути число, таке високе як `100`, коли тести виконуються на зовнішніх постачальниках, таких як машини Sauce Labs. Там тести не тестуються на одній машині, а на кількох віртуальних машинах. Якщо тести повинні виконуватися на локальній машині розробки, використовуйте більш розумне число, таке як `3`, `4` або `5`. По суті, це кількість браузерів, які будуть одночасно запущені та виконувати ваші тести одночасно, тому це залежить від того, скільки оперативної пам'яті є на вашій машині та скільки інших програм працює на вашій машині.

Ви також можете застосувати `maxInstances` в об'єктах можливостей, використовуючи можливість `wdio:maxInstances`. Це обмежить кількість паралельних сесій для цієї конкретної можливості.

Тип: `Number`<br />
За замовчуванням: `100`

### maxInstancesPerCapability

Максимальна кількість загальних паралельних робочих процесів на одну можливість.

Тип: `Number`<br />
За замовчуванням: `100`

### injectGlobals

Вставляє глобальні змінні WebdriverIO (наприклад, `browser`, `$` та `$$`) у глобальне середовище.
Якщо ви встановите значення `false`, вам слід імпортувати з `@wdio/globals`, наприклад:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Примітка: WebdriverIO не обробляє ін'єкцію глобальних змінних, специфічних для тестового фреймворку.

Тип: `Boolean`<br />
За замовчуванням: `true`

### bail

Якщо ви хочете, щоб ваш тестовий запуск зупинявся після певної кількості невдалих тестів, використовуйте `bail`.
(За замовчуванням `0`, що запускає всі тести, незалежно від результату.) **Примітка:** Тест в цьому контексті - це всі тести в одному файлі специфікації (при використанні Mocha або Jasmine) або всі кроки в одному файлі функцій (при використанні Cucumber). Якщо ви хочете контролювати поведінку bail всередині тестів одного тестового файлу, перегляньте доступні опції [фреймворку](frameworks).

Тип: `Number`<br />
За замовчуванням: `0` (не зупиняти; запускати всі тести)

### specFileRetries

Кількість повторних спроб для цілого файлу специфікації, коли він повністю не пройшов.

Тип: `Number`<br />
За замовчуванням: `0`

### specFileRetriesDelay

Затримка в секундах між повторними спробами файлу специфікації

Тип: `Number`<br />
За замовчуванням: `0`

### specFileRetriesDeferred

Чи повинні повторні спроби файлів специфікації повторюватися негайно або бути відкладені в кінець черги.

Тип: `Boolean`<br />
За замовчуванням: `true`

### groupLogsByTestSpec

Виберіть вигляд виводу логів.

Якщо встановлено значення `false`, логи з різних тестових файлів будуть виводитися в реальному часі. Зверніть увагу, що це може призвести до змішування виводу логів з різних файлів при паралельному запуску.

Якщо встановлено значення `true`, виводи логів будуть згруповані за специфікацією тесту і виводитися лише після завершення специфікації тесту.

За замовчуванням встановлено значення `false`, тому логи виводяться в реальному часі.

Тип: `Boolean`<br />
За замовчуванням: `false`

### autoAssertOnTestEnd

Контролює, чи WebdriverIO автоматично перевіряє всі м'які твердження в кінці кожного тесту. Коли встановлено значення `true`, будь-які накопичені м'які твердження будуть автоматично перевірені і викличуть збій тесту, якщо будь-які твердження не пройшли. Коли встановлено значення `false`, ви повинні вручну викликати метод assert для перевірки м'яких тверджень.

Тип: `Boolean`<br />
За замовчуванням: `true`

### services

Сервіси беруть на себе конкретні завдання, про які ви не хочете дбати. Вони покращують ваше тестове середовище майже без зусиль.

Тип: `String[]|Object[]`<br />
За замовчуванням: `[]`

### framework

Визначає тестовий фреймворк, який буде використовуватися тестовим раннером WDIO.

Тип: `String`<br />
За замовчуванням: `mocha`<br />
Опції: `mocha` | `jasmine`

### mochaOpts, jasmineOpts та cucumberOpts

Специфічні опції, пов'язані з фреймворком. Див. документацію адаптера фреймворку, щоб дізнатися, які опції доступні. Детальніше про це у [Frameworks](frameworks).

Тип: `Object`<br />
За замовчуванням: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

Список cucumber функцій з номерами рядків (при [використанні cucumber framework](./Frameworks.md#using-cucumber)).

Тип: `String[]`
За замовчуванням: `[]`

### reporters

Список репортерів для використання. Репортер може бути або рядком, або масивом
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

Визначає, з яким інтервалом репортер повинен перевіряти, чи вони синхронізовані, якщо вони повідомляють свої логи асинхронно (наприклад, якщо логи передаються до стороннього постачальника).

Тип: `Number`<br />
За замовчуванням: `100` (мс)

### reporterSyncTimeout

Визначає максимальний час, який репортери мають для завершення завантаження всіх своїх логів, перш ніж тестовий раннер видасть помилку.

Тип: `Number`<br />
За замовчуванням: `5000` (мс)

### execArgv

Аргументи Node для вказівки при запуску дочірніх процесів.

Тип: `String[]`<br />
За замовчуванням: `null`

### filesToWatch

Список шаблонів рядків, що підтримують glob, які вказують тестовому раннеру додатково стежити за іншими файлами, наприклад, файлами додатків, при запуску з прапором `--watch`. За замовчуванням тестовий раннер вже відстежує всі файли специфікацій.

Тип: `String[]`<br />
За замовчуванням: `[]`

### updateSnapshots

Встановіть значення true, якщо ви хочете оновити свої знімки. Ідеально використовувати як частину параметра CLI, наприклад, `wdio run wdio.conf.js --s`.

Тип: `'new' | 'all' | 'none'`<br />
За замовчуванням: `none` якщо не вказано і тести запускаються в CI, `new` якщо не вказано, інакше те, що було вказано

### resolveSnapshotPath

Перевизначає шлях до знімка за замовчуванням. Наприклад, щоб зберігати знімки поруч з тестовими файлами.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

Тип: `(testPath: string, snapExtension: string) => string`<br />
За замовчуванням: зберігає файли знімків у каталозі `__snapshots__` поряд із тестовим файлом

### tsConfigPath

WDIO використовує `tsx` для компіляції файлів TypeScript. Ваш TSConfig автоматично виявляється з поточного робочого каталогу, але ви можете вказати власний шлях тут або встановивши змінну середовища TSX_TSCONFIG_PATH.

Див. документацію `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

Тип: `String`<br />
За замовчуванням: `null`<br />

## Хуки

Тестовий раннер WDIO дозволяє встановлювати хуки, які будуть запущені в певні моменти життєвого циклу тесту. Це дозволяє виконувати власні дії (наприклад, робити знімок екрана, якщо тест не пройшов).

Кожен хук має як параметр конкретну інформацію про життєвий цикл (наприклад, інформацію про тестовий набір або тест). Дізнайтеся більше про всі властивості хуків у [нашому прикладі конфігурації](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Примітка:** Деякі хуки (`onPrepare`, `onWorkerStart`, `onWorkerEnd` та `onComplete`) виконуються в іншому процесі, і тому не можуть ділитися будь-якими глобальними даними з іншими хуками, які працюють у робочому процесі.

### onPrepare

Виконується один раз перед запуском усіх робочих процесів.

Параметри:

- `config` (`object`): об'єкт конфігурації WebdriverIO
- `param` (`object[]`): список деталей можливостей

### onWorkerStart

Виконується перед створенням робочого процесу і може бути використаний для ініціалізації конкретного сервісу для цього робочого процесу, а також для модифікації середовища виконання асинхронним способом.

Параметри:

- `cid` (`string`): ідентифікатор можливості (наприклад, 0-0)
- `caps` (`object`): містить можливості для сесії, яка буде створена в робочому процесі
- `specs` (`string[]`): специфікації, які будуть запущені в робочому процесі
- `args` (`object`): об'єкт, який буде об'єднаний з основною конфігурацією після ініціалізації робочого процесу
- `execArgv` (`string[]`): список рядкових аргументів, переданих робочому процесу

### onWorkerEnd

Виконується відразу після завершення роботи робочого процесу.

Параметри:

- `cid` (`string`): ідентифікатор можливості (наприклад, 0-0)
- `exitCode` (`number`): 0 - успіх, 1 - невдача
- `specs` (`string[]`): специфікації, які були запущені в робочому процесі
- `retries` (`number`): кількість повторних спроб на рівні специфікації, використаних як визначено в [_"Додавання повторних спроб на основі специфікації"_](./Retry.md#add-retries-on-a-per-specfile-basis)

### beforeSession

Виконується перед ініціалізацією сесії webdriver та тестового фреймворку. Дозволяє маніпулювати конфігураціями залежно від можливостей або специфікацій.

Параметри:

- `config` (`object`): об'єкт конфігурації WebdriverIO
- `caps` (`object`): містить можливості для сесії, яка буде створена в робочому процесі
- `specs` (`string[]`): специфікації, які будуть запущені в робочому процесі

### before

Виконується перед початком виконання тестів. У цей момент ви можете отримати доступ до всіх глобальних змінних, таких як `browser`. Це ідеальне місце для визначення власних команд.

Параметри:

- `caps` (`object`): містить можливості для сесії, яка була створена
- `specs` (`string[]`): специфікації, які будуть запущені в робочому процесі
- `browser` (`object`): екземпляр створеної сесії браузера/пристрою

### beforeSuite

Хук, який виконується перед початком набору (лише в Mocha/Jasmine)

Параметри:

- `suite` (`object`): деталі набору

### beforeHook

Хук, який виконується *перед* хуком всередині набору (наприклад, виконується перед викликом beforeEach у Mocha)

Параметри:

- `test` (`object`): деталі тесту
- `context` (`object`): контекст тесту (представляє об'єкт World в Cucumber)

### afterHook

Хук, який виконується *після* хуку всередині набору (наприклад, виконується після виклику afterEach у Mocha)

Параметри:

- `test` (`object`): деталі тесту
- `context` (`object`): контекст тесту (представляє об'єкт World в Cucumber)
- `result` (`object`): результат хуку (містить властивості `error`, `result`, `duration`, `passed`, `retries`)

### beforeTest

Функція, яка виконується перед тестом (лише в Mocha/Jasmine).

Параметри:

- `test` (`object`): деталі тесту
- `context` (`object`): об'єкт області, з яким був виконаний тест

### beforeCommand

Виконується перед виконанням команди WebdriverIO.

Параметри:

- `commandName` (`string`): ім'я команди
- `args` (`*`): аргументи, які команда отримає

### afterCommand

Виконується після виконання команди WebdriverIO.

Параметри:

- `commandName` (`string`): ім'я команди
- `args` (`*`): аргументи, які команда отримала
- `result` (`*`): результат команди
- `error` (`Error`): об'єкт помилки, якщо є

### afterTest

Функція, яка виконується після завершення тесту (в Mocha/Jasmine).

Параметри:

- `test` (`object`): деталі тесту
- `context` (`object`): об'єкт області, з яким був виконаний тест
- `result.error` (`Error`): об'єкт помилки у випадку невдачі тесту, інакше `undefined`
- `result.result` (`Any`): об'єкт повернення тестової функції
- `result.duration` (`Number`): тривалість тесту
- `result.passed` (`Boolean`): true, якщо тест пройшов, інакше false
- `result.retries` (`Object`): інформація про повторні спроби окремих тестів, як визначено для [Mocha та Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha), а також [Cucumber](./Retry.md#rerunning-in-cucumber), наприклад, `{ attempts: 0, limit: 0 }`, див.
- `result` (`object`): результат хуку (містить властивості `error`, `result`, `duration`, `passed`, `retries`)

### afterSuite

Хук, який виконується після завершення набору (лише в Mocha/Jasmine)

Параметри:

- `suite` (`object`): деталі набору

### after

Виконується після завершення всіх тестів. У вас все ще є доступ до всіх глобальних змінних з тесту.

Параметри:

- `result` (`number`): 0 - тест пройшов, 1 - тест не пройшов
- `caps` (`object`): містить можливості для сесії, яка була створена
- `specs` (`string[]`): специфікації, які були запущені в робочому процесі

### afterSession

Виконується відразу після завершення сесії webdriver.

Параметри:

- `config` (`object`): об'єкт конфігурації WebdriverIO
- `caps` (`object`): містить можливості для сесії, яка була створена
- `specs` (`string[]`): специфікації, які були запущені в робочому процесі

### onComplete

Виконується після завершення роботи всіх робочих процесів і процес готовий до виходу. Помилка, видана в хуку onComplete, призведе до невдачі тестового запуску.

Параметри:

- `exitCode` (`number`): 0 - успіх, 1 - невдача
- `config` (`object`): об'єкт конфігурації WebdriverIO
- `caps` (`object`): містить можливості для сесії, яка була створена
- `result` (`object`): об'єкт результатів, що містить результати тестів

### onReload

Виконується при оновленні сторінки.

Параметри:

- `oldSessionId` (`string`): ідентифікатор сесії старої сесії
- `newSessionId` (`string`): ідентифікатор сесії нової сесії

### beforeFeature

Виконується перед функцією Cucumber.

Параметри:

- `uri` (`string`): шлях до файлу функцій
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): об'єкт функції Cucumber

### afterFeature

Виконується після функції Cucumber.

Параметри:

- `uri` (`string`): шлях до файлу функцій
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): об'єкт функції Cucumber

### beforeScenario

Виконується перед сценарієм Cucumber.

Параметри:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): об'єкт світу, що містить інформацію про pickle та тестовий крок
- `context` (`object`): об'єкт світу Cucumber

### afterScenario

Виконується після сценарію Cucumber.

Параметри:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): об'єкт світу, що містить інформацію про pickle та тестовий крок
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
- `result`: (`object`): об'єкт результатів, що містить результати кроків
- `result.passed` (`boolean`): true, якщо сценарій пройшов
- `result.error` (`string`): стек помилок, якщо сценарій не пройшов
- `result.duration` (`number`): тривалість сценарію в мілісекундах
- `context` (`object`): об'єкт світу Cucumber

### beforeAssertion

Хук, який виконується перед виконанням твердження WebdriverIO.

Параметри:

- `params`: інформація про твердження
- `params.matcherName` (`string`): ім'я матчера (наприклад, `toHaveTitle`)
- `params.expectedValue`: значення, яке передається в матчер
- `params.options`: опції твердження

### afterAssertion

Хук, який виконується після виконання твердження WebdriverIO.

Параметри:

- `params`: інформація про твердження
- `params.matcherName` (`string`): ім'я матчера (наприклад, `toHaveTitle`)
- `params.expectedValue`: значення, яке передається в матчер
- `params.options`: опції твердження
- `params.result`: результати твердження