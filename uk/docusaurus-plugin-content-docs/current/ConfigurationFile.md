---
id: configurationfile
title: Файл конфігурації
---

Файл конфігурації містить всю необхідну інформацію для запуску вашого набору тестів. Це модуль NodeJS, який експортує JSON.

Ось приклад конфігурації з усіма підтримуваними властивостями та додатковою інформацією:

```js
export const config = {

    // ==================================
    // Де мають запускатися ваші тести
    // ==================================
    //
    runner: 'local',
    //
    // =====================
    // Конфігурації сервера
    // =====================
    // Адреса хоста запущеного Selenium сервера. Ця інформація зазвичай застаріла, оскільки
    // WebdriverIO автоматично підключається до localhost. Також якщо ви використовуєте один із
    // підтримуваних хмарних сервісів, як Sauce Labs, Browserstack, Testing Bot або LambdaTest, вам також не
    // потрібно визначати інформацію про хост і порт (бо WebdriverIO може визначити це
    // з інформації про користувача та ключ). Однак, якщо ви використовуєте приватний Selenium
    // бекенд, вам слід визначити `hostname`, `port` та `path` тут.
    //
    hostname: 'localhost',
    port: 4444,
    path: '/',
    // Protocol: http | https
    // protocol: 'http',
    //
    // =================
    // Постачальники послуг
    // =================
    // WebdriverIO підтримує Sauce Labs, Browserstack, Testing Bot та LambdaTest. (Інші хмарні провайдери
    // також повинні працювати.) Ці сервіси визначають певні значення `user` та `key` (або ключ доступу),
    // які ви повинні вказати тут, щоб підключитися до цих сервісів.
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // Якщо ви запускаєте тести на Sauce Labs, ви можете вказати регіон, де ви хочете запускати тести
    // через властивість `region`. Доступні скорочення для регіонів: `us` (за замовчуванням) та `eu`.
    // Ці регіони використовуються для VM cloud Sauce Labs та Real Device Cloud Sauce Labs.
    // Якщо ви не вказуєте регіон, за замовчуванням використовується `us`.
    region: 'us',
    //
    // Sauce Labs надає [headless пропозицію](https://saucelabs.com/products/web-testing/sauce-headless-testing),
    // яка дозволяє запускати тести Chrome та Firefox в headless режимі.
    //
    headless: false,
    //
    // ==================
    // Вказати тестові файли
    // ==================
    // Визначте, які тестові спеки повинні запускатися. Шаблон вказується відносно каталогу
    // файлу конфігурації, що виконується.
    //
    // Спеки визначаються як масив файлів спеків (можливо, з використанням шаблонів,
    // які будуть розширені). Тест для кожного файлу спеків буде запущений в окремому
    // робочому процесі. Щоб мати групу файлів спеків, що виконуються в одному робочому
    // процесі, об'єднайте їх у масив у межах масиву specs.
    //
    // Шлях до файлів спеків буде вирішуватися відносно каталогу
    // файлу конфігурації, якщо він не є абсолютним.
    //
    specs: [
        'test/spec/**',
        ['group/spec/**']
    ],
    // Шаблони для виключення.
    exclude: [
        'test/spec/multibrowser/**',
        'test/spec/mobile/**'
    ],
    //
    // ============
    // Можливості
    // ============
    // Визначте свої можливості тут. WebdriverIO може запускати кілька можливостей одночасно.
    // Залежно від кількості можливостей, WebdriverIO запускає кілька тестових
    // сесій. У межах ваших `capabilities` ви можете перезаписати опції `spec` та `exclude`,
    // щоб згрупувати певні спеки для певної можливості.
    //
    // Спочатку ви можете визначити, скільки екземплярів повинно бути запущено одночасно. Скажімо,
    // у вас є 3 різні можливості (Chrome, Firefox і Safari), і ви
    // встановили `maxInstances` на 1. wdio запустить 3 процеси.
    //
    // Тому, якщо у вас є 10 файлів спеків і ви встановили `maxInstances` на 10, всі файли спеків
    // будуть тестовані одночасно, і буде запущено 30 процесів.
    //
    // Властивість визначає, скільки можливостей з одного тесту повинні запускати тести.
    //
    maxInstances: 10,
    //
    // Або встановіть обмеження на запуск тестів з певною можливістю.
    maxInstancesPerCapability: 10,
    //
    // Вставляє глобальні об'єкти WebdriverIO (напр. `browser`, `$` та `$$`) в глобальне середовище.
    // Якщо встановлено `false`, вам потрібно імпортувати з `@wdio/globals`. Зауважте: WebdriverIO не
    // обробляє вставку глобальних змінних, специфічних для тестового фреймворку.
    //
    injectGlobals: true,
    //
    // Якщо у вас виникають проблеми з отриманням всіх важливих можливостей, перевірте
    // конфігуратор платформи Sauce Labs - чудовий інструмент для налаштування ваших можливостей:
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // щоб запустити chrome в headless режимі потрібні наступні прапори
        // (див. https://developers.google.com/web/updates/2017/04/headless-chrome)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // Параметр для ігнорування деяких або всіх прапорів за замовчуванням
        // - якщо значення true: ігнорує всі 'прапори за замовчуванням' DevTools та 'аргументи за замовчуванням' Puppeteer
        // - якщо значення є масивом: DevTools фільтрує вказані аргументи за замовчуванням
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // maxInstances може бути перезаписано для кожної можливості. Тому, якщо у вас є внутрішня Selenium
        // grid з лише 5 доступними екземплярами firefox, ви можете переконатися, що не більше ніж
        // 5 екземплярів запускаються одночасно.
        'wdio:maxInstances': 5,
        browserName: 'firefox',
        'wdio:specs': [
            'test/ffOnly/*'
        ],
        'moz:firefoxOptions': {
          // прапор для активації headless режиму Firefox (див. https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities для більш детальної інформації про moz:firefoxOptions)
          // args: ['-headless']
        },
        // Якщо надано outputDir, WebdriverIO може захоплювати логи сесії драйвера
        // можна налаштувати, які типи логів виключати.
        excludeDriverLogs: ['*'], // передайте '*', щоб виключити всі логи сесії драйвера
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // Параметр для ігнорування деяких або всіх аргументів Puppeteer за замовчуванням
        // ignoreDefaultArgs: ['-foreground'], // встановіть значення true, щоб ігнорувати всі аргументи за замовчуванням
    }],
    //
    // Додатковий список аргументів node, які використовуються при запуску дочірніх процесів
    execArgv: [],
    //
    // ===================
    // Тестові конфігурації
    // ===================
    // Визначте всі опції, які мають відношення до екземпляра WebdriverIO тут
    //
    // Рівень деталізації логування: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // Встановити конкретні рівні логування для кожного логгера
    // використовуйте рівень 'silent' для відключення логгера
    logLevels: {
        webdriver: 'info',
        '@wdio/appium-service': 'info'
    },
    //
    // Встановіть каталог для зберігання всіх логів
    outputDir: __dirname,
    //
    // Якщо ви хочете запускати тести тільки до певної кількості невдалих тестів, використовуйте
    // bail (за замовчуванням 0 - не зупиняти, запускати всі тести).
    bail: 0,
    //
    // Встановіть базовий URL для скорочення викликів команди `url()`. Якщо ваш параметр `url` починається
    // з `/`, `baseUrl` додається перед ним, не включаючи частину шляху `baseUrl`.
    //
    // Якщо ваш параметр `url` починається без схеми або `/` (як `some/path`), `baseUrl`
    // додається безпосередньо.
    baseUrl: 'http://localhost:8080',
    //
    // Тайм-аут за замовчуванням для всіх команд waitForXXX.
    waitforTimeout: 1000,
    //
    // Додайте файли для відстеження (наприклад, код програми або об'єкти сторінок) при запуску команди `wdio`
    // з прапором `--watch`. Підтримуються шаблони.
    filesToWatch: [
        // наприклад, перезапустити тести, якщо я змінюю код програми
        // './app/**/*.js'
    ],
    //
    // Фреймворк, з яким ви хочете запускати свої спеки.
    // Підтримуються наступні: 'mocha', 'jasmine' та 'cucumber'
    // Також див.: https://webdriver.io/docs/frameworks.html
    //
    // Переконайтеся, що ви встановили пакет wdio-адаптера для конкретного фреймворку перед запуском будь-яких тестів.
    framework: 'mocha',
    //
    // Кількість спроб повторного запуску всього specfile, коли він повністю не проходить
    specFileRetries: 1,
    // Затримка в секундах між спробами повторного запуску файлу спеків
    specFileRetriesDelay: 0,
    // Чи повинні повторно запущені файли спеків повторюватися негайно або бути відкладеними в кінець черги
    specFileRetriesDeferred: false,
    //
    // Тестовий репортер для stdout.
    // Єдиний, який підтримується за замовчуванням, — 'dot'
    // Також див.: https://webdriver.io/docs/dot-reporter.html , і натисніть на "Reporters" у лівій колонці
    reporters: [
        'dot',
        ['allure', {
            //
            // Якщо ви використовуєте репортер "allure", ви повинні визначити каталог, де
            // WebdriverIO повинен зберігати всі звіти allure.
            outputDir: './'
        }]
    ],
    //
    // Опції, які будуть передані в Mocha.
    // Повний список див.: http://mochajs.org
    mochaOpts: {
        ui: 'bdd'
    },
    //
    // Опції, які будуть передані в Jasmine.
    // Також див.: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-jasmine-framework#jasmineopts-options
    jasmineOpts: {
        //
        // Тайм-аут Jasmine за замовчуванням
        defaultTimeoutInterval: 5000,
        //
        // Фреймворк Jasmine дозволяє перехоплювати кожне твердження для логування стану програми
        // або веб-сайту залежно від результату. Наприклад, зручно робити знімок екрану кожного разу,
        // коли твердження не виконується.
        expectationResultHandler: function(passed, assertion) {
            // зробіть щось
        },
        //
        // Використовувати специфічну для Jasmine функціональність grep
        grep: null,
        invertGrep: null
    },
    //
    // Якщо ви використовуєте Cucumber, вам потрібно вказати, де знаходяться ваші визначення кроків.
    // Також див.: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (file/dir) потрібні файли перед виконанням функцій
        backtrace: false,   // <boolean> показати повний трасування для помилок
        compiler: [],       // <string[]> ("extension:module") потрібні файли з даним EXTENSION після потрібного MODULE (повторюваний)
        dryRun: false,      // <boolean> викликати форматери без виконання кроків
        failFast: false,    // <boolean> перервати запуск при першій невдачі
        snippets: true,     // <boolean> приховати фрагменти визначення кроків для очікуваних кроків
        source: true,       // <boolean> приховати URI джерела
        strict: false,      // <boolean> невдача, якщо є невизначені або очікувані кроки
        tagExpression: '',  // <string> (expression) виконувати лише функції або сценарії з тегами, що відповідають виразу
        timeout: 20000,     // <number> тайм-аут для визначень кроків
        ignoreUndefinedDefinitions: false, // <boolean> Увімкніть цю конфігурацію, щоб розглядати невизначені визначення як попередження.
        scenarioLevelReporter: false // Увімкніть це, щоб webdriver.io поводився так, ніби сценарії, а не кроки були тестами.
    },
    // Вкажіть користувацький шлях до tsconfig - WDIO використовує `tsx` для компіляції файлів TypeScript
    // Ваш TSConfig автоматично визначається з поточного робочого каталогу
    // але ви можете вказати користувацький шлях тут або встановивши env змінну TSX_TSCONFIG_PATH
    // Дивіться документацію `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // Хуки
    // =====
    // WebdriverIO надає кілька хуків, які ви можете використовувати для втручання в процес тестування, щоб покращити
    // його та створювати сервіси навколо нього. Ви можете застосувати до нього одну функцію або масив
    // методів. Якщо один з них повертається з обіцянкою, WebdriverIO чекатиме, поки ця обіцянка буде
    // вирішена, щоб продовжити.
    //
    /**
     * Виконується один раз перед запуском всіх робочих процесів.
     * @param {object} config об'єкт конфігурації wdio
     * @param {Array.<Object>} capabilities список деталей можливостей
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * Виконується перед створенням робочого процесу і може використовуватися для ініціалізації певного сервісу
     * для цього робочого процесу, а також для модифікації середовищ виконання в асинхронному режимі.
     * @param  {string} cid      ідентифікатор можливості (наприклад, 0-0)
     * @param  {object} caps     об'єкт, що містить можливості для сеансу, який буде створено в робочому процесі
     * @param  {object} specs    спеки, які будуть запущені в робочому процесі
     * @param  {object} args     об'єкт, який буде об'єднаний з основною конфігурацією після ініціалізації робочого процесу
     * @param  {object} execArgv список аргументів рядка, переданих в робочий процес
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * Виконується після завершення робочого процесу.
     * @param  {string} cid      ідентифікатор можливості (наприклад, 0-0)
     * @param  {number} exitCode 0 - успіх, 1 - невдача
     * @param  {object} specs    спеки, які будуть запущені в робочому процесі
     * @param  {number} retries  кількість використаних повторних спроб
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * Виконується перед ініціалізацією сеансу webdriver і тестового фреймворку. Це дозволяє вам
     * маніпулювати конфігураціями залежно від можливості або спека.
     * @param {object} config об'єкт конфігурації wdio
     * @param {Array.<Object>} capabilities список деталей можливостей
     * @param {Array.<String>} specs Список шляхів до файлів спеків, які будуть запущені
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * Виконується перед початком виконання тесту. У цей момент ви можете отримати доступ до всіх глобальних
     * змінних, таких як `browser`. Це ідеальне місце для визначення користувацьких команд.
     * @param {Array.<Object>} capabilities список деталей можливостей
     * @param {Array.<String>} specs        Список шляхів до файлів спеків, які будуть запущені
     * @param {object}         browser      екземпляр створеного сеансу браузера/пристрою
     */
    before: function (capabilities, specs, browser) {
    },
    /**
     * Виконується перед початком набору тестів (тільки в Mocha/Jasmine).
     * @param {object} suite деталі набору тестів
     */
    beforeSuite: function (suite) {
    },
    /**
     * Цей хук виконується _перед_ кожним хуком у наборі тестів.
     * (Наприклад, це виконується перед викликом `before`, `beforeEach`, `after`, `afterEach` в Mocha). У Cucumber `context` - це об'єкт World.
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * Хук, який виконується _після_ кожного хука в наборі тестів.
     * (Наприклад, це виконується після виклику `before`, `beforeEach`, `after`, `afterEach` в Mocha). У Cucumber `context` - це об'єкт World.
     */
    afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
    },
    /**
     * Функція, яка виконується перед тестом (тільки в Mocha/Jasmine)
     * @param {object} test    об'єкт тесту
     * @param {object} context об'єкт області, в якій виконувався тест
     */
    beforeTest: function (test, context) {
    },
    /**
     * Виконується перед виконанням команди WebdriverIO.
     * @param {string} commandName назва команди хука
     * @param {Array} args аргументи, які отримає команда
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * Виконується після виконання команди WebdriverIO
     * @param {string} commandName назва команди хука
     * @param {Array} args аргументи, які отримала б команда
     * @param {number} result 0 - успіх команди, 1 - помилка команди
     * @param {object} error об'єкт помилки, якщо є
     */
    afterCommand: function (commandName, args, result, error) {
    },
    /**
     * Функція, яка виконується після тесту (тільки в Mocha/Jasmine)
     * @param {object}  test             об'єкт тесту
     * @param {object}  context          об'єкт області, в якій виконувався тест
     * @param {Error}   result.error     об'єкт помилки у випадку невдачі тесту, інакше `undefined`
     * @param {*}       result.result    об'єкт повернення функції тесту
     * @param {number}  result.duration  тривалість тесту
     * @param {boolean} result.passed    true, якщо тест пройшов, інакше false
     * @param {object}  result.retries   інформація про повторні спроби, пов'язані зі спеком, наприклад `{ attempts: 0, limit: 0 }`
     */
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
    },
    /**
     * Хук, який виконується після завершення набору тестів (тільки в Mocha/Jasmine).
     * @param {object} suite деталі набору тестів
     */
    afterSuite: function (suite) {
    },
    /**
     * Виконується після завершення всіх тестів. У вас все ще є доступ до всіх глобальних змінних з
     * тесту.
     * @param {number} result 0 - тест пройшов, 1 - тест не пройшов
     * @param {Array.<Object>} capabilities список деталей можливостей
     * @param {Array.<String>} specs Список шляхів до файлів спеків, які були запущені
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * Виконується відразу після завершення сеансу webdriver.
     * @param {object} config об'єкт конфігурації wdio
     * @param {Array.<Object>} capabilities список деталей можливостей
     * @param {Array.<String>} specs Список шляхів до файлів спеків, які були запущені
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * Виконується після того, як всі робочі процеси завершили роботу і процес майже завершується.
     * Помилка, викликана в хуку `onComplete`, призведе до невдачі тестового запуску.
     * @param {object} exitCode 0 - успіх, 1 - невдача
     * @param {object} config об'єкт конфігурації wdio
     * @param {Array.<Object>} capabilities список деталей можливостей
     * @param {<Object>} results об'єкт, що містить результати тестів
     */
    onComplete: function (exitCode, config, capabilities, results) {
    },
    /**
    * Виконується при оновленні.
    * @param {string} oldSessionId ідентифікатор старого сеансу
    * @param {string} newSessionId ідентифікатор нового сеансу
    */
    onReload: function(oldSessionId, newSessionId) {
    },
    /**
     * Хуки Cucumber
     *
     * Виконується перед функцією Cucumber.
     * @param {string}                   uri      шлях до файлу функції
     * @param {GherkinDocument.IFeature} feature  об'єкт функції Cucumber
     */
    beforeFeature: function (uri, feature) {
    },
    /**
     *
     * Виконується перед сценарієм Cucumber.
     * @param {ITestCaseHookParameter} world    світовий об'єкт, що містить інформацію про pickle та тестовий крок
     * @param {object}                 context  Об'єкт Cucumber World
     */
    beforeScenario: function (world, context) {
    },
    /**
     *
     * Виконується перед кроком Cucumber.
     * @param {Pickle.IPickleStep} step     дані кроку
     * @param {IPickle}            scenario pickle сценарію
     * @param {object}             context  Об'єкт Cucumber World
     */
    beforeStep: function (step, scenario, context) {
    },
    /**
     *
     * Виконується після кроку Cucumber.
     * @param {Pickle.IPickleStep} step             дані кроку
     * @param {IPickle}            scenario         pickle сценарію
     * @param {object}             result           об'єкт результатів, що містить результати сценарію
     * @param {boolean}            result.passed    true, якщо сценарій пройшов
     * @param {string}             result.error     стек помилок, якщо сценарій не пройшов
     * @param {number}             result.duration  тривалість сценарію в мілісекундах
     * @param {object}             context          Об'єкт Cucumber World
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * Виконується після сценарію Cucumber.
     * @param {ITestCaseHookParameter} world            світовий об'єкт, що містить інформацію про pickle та тестовий крок
     * @param {object}                 result           об'єкт результатів, що містить результати сценарію `{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    true, якщо сценарій пройшов
     * @param {string}                 result.error     стек помилок, якщо сценарій не пройшов
     * @param {number}                 result.duration  тривалість сценарію в мілісекундах
     * @param {object}                 context          Об'єкт Cucumber World
     */
    afterScenario: function (world, result, context) {
    },
    /**
     *
     * Виконується після функції Cucumber.
     * @param {string}                   uri      шлях до файлу функції
     * @param {GherkinDocument.IFeature} feature  об'єкт функції Cucumber
     */
    afterFeature: function (uri, feature) {
    },
    /**
     * Виконується перед тим, як бібліотека тверджень WebdriverIO робить твердження.
     * @param commandName назва команди
     * @param args        аргументи, які б отримала команда
     */
    beforeAssertion: function (params) {
    },
    /**
     * Виконується після виконання команди WebdriverIO
     * @param commandName  назва команди
     * @param args         аргументи, які б отримала команда
     * @param result       результат команди
     * @param error        помилка, якщо щось пішло не так
     */
    afterAssertion: function (params) {
    }
}
```

Ви також можете знайти файл з усіма можливими опціями та варіаціями в [папці з прикладами](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js).