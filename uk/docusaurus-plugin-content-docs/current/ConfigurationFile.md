---
id: configurationfile
title: Конфігураційний файл
---

Конфігураційний файл містить всю необхідну інформацію для запуску вашого набору тестів. Це модуль NodeJS, який експортує JSON.

Ось приклад конфігурації з усіма підтримуваними властивостями та додатковою інформацією:

```js
export const config = {

    // ==================================
    // Де повинен запускатися ваш тест
    // ==================================
    //
    runner: 'local',
    //
    // =====================
    // Конфігурації сервера
    // =====================
    // Адреса хосту запущеного Selenium сервера. Ця інформація зазвичай застаріла,
    // оскільки WebdriverIO автоматично підключається до localhost. Також, якщо ви використовуєте один із
    // підтримуваних хмарних сервісів, таких як Sauce Labs, Browserstack, Testing Bot або TestMu AI (Раніше LambdaTest), вам також не потрібно
    // визначати інформацію про хост і порт (тому що WebdriverIO може визначити це
    // з вашої інформації про користувача та ключ). Однак, якщо ви використовуєте приватний Selenium
    // бекенд, вам слід визначити `hostname`, `port` і `path` тут.
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
    // WebdriverIO підтримує Sauce Labs, Browserstack, Testing Bot та TestMu AI (Раніше LambdaTest). (Інші хмарні провайдери
    // також повинні працювати.) Ці сервіси визначають конкретні значення `user` та `key` (або ключ доступу),
    // які ви повинні вказати тут, щоб підключитися до цих сервісів.
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // Якщо ви запускаєте тести на Sauce Labs, ви можете вказати регіон, в якому ви хочете запускати тести
    // через властивість `region`. Доступні короткі позначення для регіонів: `us` (за замовчуванням) та `eu`.
    // Ці регіони використовуються для VM хмари Sauce Labs та Sauce Labs Real Device Cloud.
    // Якщо ви не вказуєте регіон, за замовчуванням використовується `us`.
    region: 'us',
    //
    // Sauce Labs пропонує [безголову пропозицію](https://saucelabs.com/products/web-testing/sauce-headless-testing)
    // яка дозволяє запускати тести Chrome та Firefox в безголовому режимі.
    //
    headless: false,
    //
    // ==================
    // Вказати тестові файли
    // ==================
    // Визначте, які тестові специфікації повинні запускатися. Шаблон відносний до директорії
    // конфігураційного файлу, який запускається.
    //
    // Специфікації визначаються як масив файлів специфікацій (опціонально використовуючи шаблони підстановки,
    // які будуть розширені). Тест для кожного файлу специфікації буде запущено в окремому
    // робочому процесі. Щоб запустити групу файлів специфікації в одному робочому
    // процесі, включіть їх в масив всередині масиву specs.
    //
    // Шлях файлів специфікації буде розв'язано відносно директорії
    // конфігураційного файлу, якщо він не є абсолютним.
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
    // Залежно від кількості можливостей WebdriverIO запускає кілька тестових
    // сесій. В межах ваших `capabilities` ви можете перезаписати опції `spec` та `exclude`,
    // щоб згрупувати конкретні специфікації для конкретної можливості.
    //
    // Спочатку ви можете визначити, скільки екземплярів повинно бути запущено одночасно. Скажімо,
    // у вас є 3 різні можливості (Chrome, Firefox та Safari), і ви
    // встановили `maxInstances` на 1. wdio створить 3 процеси.
    //
    // Таким чином, якщо у вас 10 файлів специфікацій і ви встановили `maxInstances` на 10, всі файли специфікацій
    // будуть тестуватися одночасно і буде створено 30 процесів.
    //
    // Властивість визначає, скільки можливостей з одного тесту повинні запускати тести.
    //
    maxInstances: 10,
    //
    // Або встановіть обмеження на запуск тестів з конкретною можливістю.
    maxInstancesPerCapability: 10,
    //
    // Вставляє глобальні об'єкти WebdriverIO (наприклад, `browser`, `$` і `$$`) в глобальне середовище.
    // Якщо встановити значення `false`, вам слід імпортувати з `@wdio/globals`. Примітка: WebdriverIO не
    // обробляє впровадження специфічних глобальних об'єктів тестового фреймворку.
    //
    injectGlobals: true,
    //
    // Якщо у вас виникають проблеми з отриманням усіх важливих можливостей, перевірте
    // конфігуратор платформи Sauce Labs - чудовий інструмент для налаштування ваших можливостей:
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // для запуску chrome у безголовому режимі необхідні наступні прапорці
        // (див. https://developers.google.com/web/updates/2017/04/headless-chrome)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // Параметр для ігнорування деяких або всіх стандартних прапорців
        // - якщо значення true: ігнорувати всі 'стандартні прапорці' DevTools і 'стандартні аргументи' Puppeteer
        // - якщо значення є масивом: DevTools фільтрує вказані стандартні аргументи
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // maxInstances може бути перезаписано на кожну можливість. Тому, якщо у вас є внутрішня сітка Selenium
        // з лише 5 доступними екземплярами firefox, ви можете переконатися, що не більше ніж
        // 5 екземплярів запускається одночасно.
        'wdio:maxInstances': 5,
        browserName: 'firefox',
        'wdio:specs': [
            'test/ffOnly/*'
        ],
        'moz:firefoxOptions': {
          // прапорець для активації безголового режиму Firefox (див. https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities для отримання додаткової інформації про moz:firefoxOptions)
          // args: ['-headless']
        },
        // Якщо надано outputDir, WebdriverIO може захоплювати журнали сеансів драйвера
        // можна налаштувати, які типи журналів виключити.
        excludeDriverLogs: ['*'], // передайте '*' щоб виключити всі журнали сеансів драйвера
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // Параметр для ігнорування деяких або всіх стандартних аргументів Puppeteer
        // ignoreDefaultArgs: ['-foreground'], // встановіть значення true, щоб ігнорувати всі стандартні аргументи
    }],
    //
    // Додатковий список аргументів node для використання при запуску дочірніх процесів
    execArgv: [],
    //
    // ===================
    // Тестові конфігурації
    // ===================
    // Визначте всі опції, які відповідають екземпляру WebdriverIO тут
    //
    // Рівень деталізації журналу: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // Встановіть конкретні рівні журналу на журнал
    // використовуйте рівень 'silent' для відключення логера
    logLevels: {
        webdriver: 'info',
        '@wdio/appium-service': 'info'
    },
    //
    // Встановіть директорію для зберігання всіх журналів
    outputDir: __dirname,
    //
    // Якщо ви хочете запускати тести тільки до того, як певна кількість тестів не вдасться, використовуйте
    // bail (за замовчуванням 0 - не зупинятися, запустити всі тести).
    bail: 0,
    //
    // Встановіть базовий URL, щоб скоротити виклики команд `url()`. Якщо ваш параметр `url` починається
    // з `/`, `baseUrl` додається перед ним, не включаючи шлях з `baseUrl`.
    //
    // Якщо ваш параметр `url` починається без схеми або `/` (наприклад, `some/path`), `baseUrl`
    // додається безпосередньо перед ним.
    baseUrl: 'http://localhost:8080',
    //
    // Стандартний час очікування для всіх команд waitForXXX.
    waitforTimeout: 1000,
    //
    // Додайте файли для перегляду (наприклад, код додатку або об'єкти сторінок) при запуску команди `wdio`
    // з прапорцем `--watch`. Підтримується використання шаблонів.
    filesToWatch: [
        // наприклад, перезапустити тести, якщо я змінив код мого додатку
        // './app/**/*.js'
    ],
    //
    // Фреймворк, з яким ви хочете запускати свої специфікації.
    // Підтримуються наступні: 'mocha', 'jasmine' та 'cucumber'
    // Див. також: https://webdriver.io/docs/frameworks.html
    //
    // Переконайтеся, що у вас встановлений пакет адаптера wdio для конкретного фреймворку, перш ніж запускати будь-які тести.
    framework: 'mocha',
    //
    // Кількість спроб повторення всього файлу специфікації, коли він не спрацьовує в цілому
    specFileRetries: 1,
    // Затримка в секундах між спробами повторення файлу специфікації
    specFileRetriesDelay: 0,
    // Чи повинні повторювані файли специфікацій бути повторені негайно або відкладені в кінець черги
    specFileRetriesDeferred: false,
    //
    // Тестовий репортер для stdout.
    // Єдиний, підтримуваний за замовчуванням, - це 'dot'
    // Див. також: https://webdriver.io/docs/dot-reporter.html , та натисніть на "Reporters" в лівій колонці
    reporters: [
        'dot',
        ['allure', {
            //
            // Якщо ви використовуєте репортер "allure", ви повинні визначити директорію, куди
            // WebdriverIO повинен зберігати всі звіти allure.
            outputDir: './'
        }]
    ],
    //
    // Опції, які передаються в Mocha.
    // Повний список на: http://mochajs.org
    mochaOpts: {
        ui: 'bdd'
    },
    //
    // Опції, які передаються в Jasmine.
    // Див. також: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-jasmine-framework#jasmineopts-options
    jasmineOpts: {
        //
        // Стандартний час очікування Jasmine
        defaultTimeoutInterval: 5000,
        //
        // Фреймворк Jasmine дозволяє перехоплювати кожне твердження для логування стану додатку
        // або веб-сайту в залежності від результату. Наприклад, дуже зручно робити скріншот кожного разу,
        // коли твердження не вдається.
        expectationResultHandler: function(passed, assertion) {
            // зробити щось
        },
        //
        // Використовувати специфічний для Jasmine функціонал grep
        grep: null,
        invertGrep: null
    },
    //
    // Якщо ви використовуєте Cucumber, вам потрібно вказати, де розташовані ваші визначення кроків.
    // Див. також: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (file/dir) вимагати файли перед виконанням функцій
        backtrace: false,   // <boolean> показувати повний трасування для помилок
        compiler: [],       // <string[]> ("extension:module") вимагати файли з даним EXTENSION після вимагання MODULE (повторюваний)
        dryRun: false,      // <boolean> викликати форматери без виконання кроків
        failFast: false,    // <boolean> перервати запуск при першій невдачі
        snippets: true,     // <boolean> приховати фрагменти визначення кроків для очікуючих кроків
        source: true,       // <boolean> приховати URI джерела
        strict: false,      // <boolean> не спрацьовувати, якщо є будь-які невизначені або очікуючі кроки
        tagExpression: '',  // <string> (вираз) виконувати лише функції або сценарії з тегами, що відповідають виразу
        timeout: 20000,     // <number> час очікування для визначень кроків
        ignoreUndefinedDefinitions: false, // <boolean> Увімкніть цю конфігурацію, щоб вважати невизначені визначення попередженнями.
        scenarioLevelReporter: false // Увімкніть це, щоб змусити webdriver.io поводитися так, ніби сценарії, а не кроки були тестами.
    },
    // Вказати власний шлях tsconfig - WDIO використовує `tsx` для компіляції файлів TypeScript
    // Ваш TSConfig автоматично виявляється з поточної робочої директорії
    // але ви можете вказати власний шлях тут або встановивши змінну середовища TSX_TSCONFIG_PATH
    // Див. документацію `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    //
    // Примітка: Цей параметр буде перезаписано змінною середовища TSX_TSCONFIG_PATH та/або аргументом командного рядка --tsConfigPath, якщо вони вказані.
    // Цей параметр буде ігноровано, якщо node не може розібрати ваш файл wdio.conf.ts без допомоги від tsx, наприклад, якщо у вас налаштовані
    // псевдоніми шляхів у tsconfig.json і ви використовуєте ці псевдоніми шляхів всередині вашого файлу wdio.config.ts.
    // Використовуйте це лише якщо ви використовуєте файл конфігурації .js або ваш файл конфігурації .ts є дійсним JavaScript.
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // Хуки
    // =====
    // WebdriverIO надає кілька хуків, які ви можете використовувати для втручання в процес тестування, щоб покращити
    // його та створити навколо нього сервіси. Ви можете застосувати до них або одну функцію, або масив
    // методів. Якщо один з них повертається з промісом, WebdriverIO чекатиме, поки цей проміс буде
    // розв'язано для продовження.
    //
    /**
     * Виконується один раз перед запуском всіх робочих процесів.
     * @param {object} config об'єкт конфігурації wdio
     * @param {Array.<Object>} capabilities список деталей можливостей
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * Виконується перед створенням робочого процесу і може використовуватися для ініціалізації конкретного сервісу
     * для цього робочого процесу, а також для модифікації середовищ виконання асинхронним способом.
     * @param  {string} cid      ідентифікатор можливості (наприклад, 0-0)
     * @param  {object} caps     об'єкт, що містить можливості для сеансу, який буде створено в робочому процесі
     * @param  {object} specs    специфікації, які будуть запущені в робочому процесі
     * @param  {object} args     об'єкт, який буде об'єднано з основною конфігурацією після ініціалізації робочого процесу
     * @param  {object} execArgv список рядкових аргументів, переданих робочому процесу
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * Виконується після того, як робочий процес завершився.
     * @param  {string} cid      ідентифікатор можливості (наприклад, 0-0)
     * @param  {number} exitCode 0 - успішно, 1 - невдача
     * @param  {object} specs    специфікації, які запускалися в робочому процесі
     * @param  {number} retries  кількість використаних повторних спроб
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * Виконується перед ініціалізацією сеансу webdriver і тестового фреймворку. Це дозволяє вам
     * маніпулювати конфігураціями в залежності від можливості чи специфікації.
     * @param {object} config об'єкт конфігурації wdio
     * @param {Array.<Object>} capabilities список деталей можливостей
     * @param {Array.<String>} specs Список шляхів файлів специфікації, які будуть запущені
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * Виконується перед початком виконання тесту. На цьому етапі ви маєте доступ до всіх глобальних
     * змінних, таких як `browser`. Це ідеальне місце для визначення користувацьких команд.
     * @param {Array.<Object>} capabilities список деталей можливостей
     * @param {Array.<String>} specs        Список шляхів файлів специфікації, які будуть запущені
     * @param {object}         browser      екземпляр створеного сеансу браузера/пристрою
     */
    before: function (capabilities, specs, browser) {
    },
    /**
     * Виконується перед початком набору тестів (тільки в Mocha/Jasmine).
     * @param {object} suite деталі набору
     */
    beforeSuite: function (suite) {
    },
    /**
     * Цей хук виконується _перед_ кожним хуком всередині набору.
     * (Наприклад, це виконується перед викликом `before`, `beforeEach`, `after`, `afterEach` в Mocha.). У Cucumber `context` є об'єктом World.
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * Хук, який виконується _після_ кожного хука всередині набору.
     * (Наприклад, це виконується після виклику `before`, `beforeEach`, `after`, `afterEach` в Mocha.). У Cucumber `context` є об'єктом World.
     */
    afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
    },
    /**
     * Функція, яка виконується перед тестом (тільки в Mocha/Jasmine)
     * @param {object} test    тестовий об'єкт
     * @param {object} context об'єкт області, з яким був виконаний тест
     */
    beforeTest: function (test, context) {
    },
    /**
     * Виконується перед виконанням команди WebdriverIO.
     * @param {string} commandName ім'я команди хука
     * @param {Array} args аргументи, які отримає команда
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * Виконується після виконання команди WebdriverIO
     * @param {string} commandName ім'я команди хука
     * @param {Array} args аргументи, які отримала б команда
     * @param {*} result результат команди
     * @param {Error} error об'єкт помилки, якщо є
     */
    afterCommand: function (commandName, args, result, error) {
    },
    /**
     * Функція, яка виконується після тесту (тільки в Mocha/Jasmine)
     * @param {object}  test             тестовий об'єкт
     * @param {object}  context          об'єкт області, з яким був виконаний тест
     * @param {Error}   result.error     об'єкт помилки у випадку невдачі тесту, інакше `undefined`
     * @param {*}       result.result    повертаючий об'єкт тестової функції
     * @param {number}  result.duration  тривалість тесту
     * @param {boolean} result.passed    true, якщо тест пройшов, інакше false
     * @param {object}  result.retries   інформація про повторні спроби, пов'язані зі специфікацією, наприклад, `{ attempts: 0, limit: 0 }`
     */
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
    },
    /**
     * Хук, який виконується після завершення набору (тільки в Mocha/Jasmine).
     * @param {object} suite деталі набору
     */
    afterSuite: function (suite) {
    },
    /**
     * Виконується після завершення всіх тестів. У вас все ще є доступ до всіх глобальних змінних з
     * тесту.
     * @param {number} result 0 - тест пройшов, 1 - тест не вдався
     * @param {Array.<Object>} capabilities список деталей можливостей
     * @param {Array.<String>} specs Список шляхів файлів специфікації, які були запущені
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * Виконується відразу після завершення сеансу webdriver.
     * @param {object} config об'єкт конфігурації wdio
     * @param {Array.<Object>} capabilities список деталей можливостей
     * @param {Array.<String>} specs Список шляхів файлів специфікації, які були запущені
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * Виконується після того, як всі робочі процеси завершились, і процес готовий до завершення.
     * Помилка, викинута в хуці `onComplete`, призведе до невдачі тестового запуску.
     * @param {object} exitCode 0 - успішно, 1 - невдача
     * @param {object} config об'єкт конфігурації wdio
     * @param {Array.<Object>} capabilities список деталей можливостей
     * @param {<Object>} results об'єкт, що містить результати тестів
     */
    onComplete: function (exitCode, config, capabilities, results) {
    },
    /**
    * Виконується при оновленні.
    * @param {string} oldSessionId ID сеансу старого сеансу
    * @param {string} newSessionId ID сеансу нового сеансу
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
     * @param {ITestCaseHookParameter} world    об'єкт world, що містить інформацію про pickle і тестовий крок
     * @param {object}                 context  об'єкт Cucumber World
     */
    beforeScenario: function (world, context) {
    },
    /**
     *
     * Виконується перед кроком Cucumber.
     * @param {Pickle.IPickleStep} step     дані кроку
     * @param {IPickle}            scenario pickle сценарію
     * @param {object}             context  об'єкт Cucumber World
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
     * @param {string}             result.error     стек помилок, якщо сценарій не вдався
     * @param {number}             result.duration  тривалість сценарію в мілісекундах
     * @param {object}             context          об'єкт Cucumber World
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * Виконується після сценарію Cucumber.
     * @param {ITestCaseHookParameter} world            об'єкт world, що містить інформацію про pickle і тестовий крок
     * @param {object}                 result           об'єкт результатів, що містить результати сценарію `{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    true, якщо сценарій пройшов
     * @param {string}                 result.error     стек помилок, якщо сценарій не вдався
     * @param {number}                 result.duration  тривалість сценарію в мілісекундах
     * @param {object}                 context          об'єкт Cucumber World
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
     * @param commandName ім'я команди
     * @param args        аргументи, які б отримала команда
     */
    beforeAssertion: function (params) {
    },
    /**
     * Виконується після виконання команди WebdriverIO
     * @param commandName  ім'я команди
     * @param args         аргументи, які б отримала команда
     * @param result       результат команди
     * @param error        помилка у випадку, якщо щось пішло не так
     */
    afterAssertion: function (params) {
    }
}
```

Ви також можете знайти файл з усіма можливими опціями та варіаціями в [папці прикладів](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js).