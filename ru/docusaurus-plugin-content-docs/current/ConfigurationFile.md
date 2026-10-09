---
id: configurationfile
title: Конфигурационный файл
description: "Аннотированный пример wdio.conf.js со всеми поддерживаемыми опциями testrunner, capabilities и хуками с пояснениями."
---

Конфигурационный файл содержит всю необходимую информацию для запуска вашего набора тестов. Это модуль NodeJS, который экспортирует JSON.

Вот пример конфигурации со всеми поддерживаемыми свойствами и дополнительной информацией:

```js
export const config = {

    // ==================================
    // Где должны запускаться ваши тесты
    // ==================================
    //
    runner: 'local',
    //
    // =====================
    // Конфигурация сервера
    // =====================
    // Адрес хоста запущенного сервера Selenium. Обычно эта информация не нужна, так как
    // WebdriverIO автоматически подключается к localhost. Также, если вы используете один из
    // поддерживаемых облачных сервисов, таких как Sauce Labs, Browserstack, Testing Bot или TestMu AI (ранее LambdaTest), вам также не
    // нужно указывать хост и порт (потому что WebdriverIO может определить их
    // по вашим данным user и key). Однако, если вы используете частный бэкенд Selenium,
    // вам следует указать здесь `hostname`, `port` и `path`.
    //
    hostname: 'localhost',
    port: 4444,
    path: '/',
    // Протокол: http | https
    // protocol: 'http',
    //
    // =================
    // Поставщики сервисов
    // =================
    // WebdriverIO поддерживает Sauce Labs, Browserstack, Testing Bot и TestMu AI (ранее LambdaTest). (Другие облачные провайдеры
    // тоже должны работать.) Эти сервисы определяют конкретные значения `user` и `key` (или ключ доступа),
    // которые вы должны указать здесь, чтобы подключиться к этим сервисам.
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // Если вы запускаете тесты в Sauce Labs, вы можете указать регион, в котором хотите запускать тесты,
    // с помощью свойства `region`. Доступные короткие обозначения регионов: `us` (по умолчанию) и `eu`.
    // Эти регионы используются для облака виртуальных машин Sauce Labs и Sauce Labs Real Device Cloud.
    // Если вы не укажете регион, по умолчанию используется `us`.
    region: 'us',
    //
    // Sauce Labs предоставляет [headless-решение](https://saucelabs.com/products/web-testing/sauce-headless-testing),
    // которое позволяет запускать тесты Chrome и Firefox в headless-режиме.
    //
    headless: false,
    //
    // ==================
    // Указание тестовых файлов
    // ==================
    // Определите, какие тестовые спецификации должны выполняться. Шаблон указывается относительно директории
    // запускаемого конфигурационного файла.
    //
    // Спецификации определяются как массив файлов спецификаций (опционально с использованием подстановочных знаков,
    // которые будут развернуты). Тесты каждого файла спецификации будут запускаться в отдельном
    // рабочем процессе. Чтобы группа файлов спецификаций выполнялась в одном рабочем
    // процессе, поместите их в массив внутри массива specs.
    //
    // Путь к файлам спецификаций будет разрешаться относительно директории
    // конфигурационного файла, если он не является абсолютным.
    //
    specs: [
        'test/spec/**',
        ['group/spec/**']
    ],
    // Шаблоны для исключения.
    exclude: [
        'test/spec/multibrowser/**',
        'test/spec/mobile/**'
    ],
    //
    // ============
    // Capabilities
    // ============
    // Определите здесь ваши capabilities. WebdriverIO может запускать несколько capabilities одновременно.
    // В зависимости от количества capabilities WebdriverIO запускает несколько тестовых
    // сессий. В ваших `capabilities` вы можете переопределить, какие файлы запускаются, с помощью
    // `wdio:specs` и `wdio:exclude`, чтобы привязать определенные спецификации к определенной capability.
    //
    // Во-первых, вы можете определить, сколько экземпляров должно запускаться одновременно. Допустим,
    // у вас есть 3 разные capabilities (Chrome, Firefox и Safari) и вы
    // установили `maxInstances` равным 1. wdio запустит 3 процесса.
    //
    // Следовательно, если у вас 10 файлов спецификаций и вы установили `maxInstances` равным 10, все файлы спецификаций
    // будут тестироваться одновременно, и будет запущено 30 процессов.
    //
    // Это свойство определяет, сколько capabilities из одного теста должны запускать тесты.
    //
    maxInstances: 10,
    //
    // Или установите ограничение на запуск тестов с конкретной capability.
    maxInstancesPerCapability: 10,
    //
    // Добавляет глобальные переменные WebdriverIO (например, `browser`, `$` и `$$`) в глобальное окружение.
    // Если установить значение `false`, вам нужно импортировать их из `@wdio/globals`. Примечание: WebdriverIO не
    // занимается внедрением глобальных переменных, специфичных для тестового фреймворка.
    //
    injectGlobals: true,
    //
    // Если у вас возникают трудности с подбором всех важных capabilities, воспользуйтесь
    // конфигуратором платформы Sauce Labs — отличным инструментом для настройки capabilities:
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // для запуска chrome в headless-режиме требуются следующие флаги
        // (см. https://developers.google.com/web/updates/2017/04/headless-chrome)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // Параметр для игнорирования некоторых или всех флагов по умолчанию
        // - если значение true: игнорировать все 'флаги по умолчанию' DevTools и 'аргументы по умолчанию' Puppeteer
        // - если значение — массив: DevTools отфильтрует указанные аргументы по умолчанию
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // maxInstances можно переопределить для каждой capability. Например, если у вас есть внутренний
        // Selenium grid, в котором доступно только 5 экземпляров firefox, вы можете гарантировать, что одновременно
        // будет запущено не более 5 экземпляров.
        'wdio:maxInstances': 5,
        browserName: 'firefox',
        'wdio:specs': [
            'test/ffOnly/*'
        ],
        'moz:firefoxOptions': {
          // флаг для активации headless-режима Firefox (подробнее о moz:firefoxOptions см. https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities)
          // args: ['-headless']
        },
        // Если указан outputDir, WebdriverIO может сохранять логи сессии драйвера;
        // можно настроить, какие logTypes исключить.
        // excludeDriverLogs: ['*'], // передайте '*', чтобы исключить все логи сессии драйвера
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // Параметр для игнорирования некоторых или всех аргументов Puppeteer по умолчанию
        // ignoreDefaultArgs: ['-foreground'], // установите значение true, чтобы игнорировать все аргументы по умолчанию
    }],
    //
    // Дополнительный список аргументов node, используемых при запуске дочерних процессов
    execArgv: [],
    //
    // ===================
    // Конфигурация тестов
    // ===================
    // Определите здесь все опции, относящиеся к экземпляру WebdriverIO
    //
    // Уровень детализации логирования: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // Установите отдельные уровни логирования для каждого логгера
    // используйте уровень 'silent', чтобы отключить логгер
    logLevels: {
        webdriver: 'info',
        '@wdio/appium-service': 'info'
    },
    //
    // Укажите директорию для хранения всех логов
    outputDir: __dirname,
    //
    // Если вы хотите выполнять тесты только до тех пор, пока не упадет определенное количество тестов, используйте
    // bail (по умолчанию 0 — не прерывать, выполнять все тесты).
    bail: 0,
    //
    // Укажите базовый URL, чтобы сократить вызовы команды `url()`. Если ваш параметр `url` начинается
    // с `/`, к нему добавляется `baseUrl` без учета части пути из `baseUrl`.
    //
    // Если ваш параметр `url` начинается без схемы или `/` (например, `some/path`), `baseUrl`
    // добавляется непосредственно в начало.
    baseUrl: 'http://localhost:8080',
    //
    // Таймаут по умолчанию для всех команд waitForXXX.
    waitforTimeout: 1000,
    //
    // Добавьте файлы для отслеживания (например, код приложения или page objects) при запуске команды `wdio`
    // с флагом `--watch`. Поддерживаются glob-шаблоны.
    filesToWatch: [
        // например, перезапускать тесты при изменении кода приложения
        // './app/**/*.js'
    ],
    //
    // Фреймворк, с помощью которого вы хотите запускать спецификации.
    // Поддерживаются следующие: 'mocha', 'jasmine' и 'cucumber'
    // См. также: https://webdriver.io/docs/frameworks.html
    //
    // Перед запуском тестов убедитесь, что у вас установлен пакет адаптера wdio для соответствующего фреймворка.
    framework: 'mocha',
    //
    // Количество повторных попыток выполнения всего файла спецификации, если он падает целиком
    specFileRetries: 1,
    // Задержка в секундах между повторными попытками выполнения файла спецификации
    specFileRetriesDelay: 0,
    // Должны ли повторные попытки выполнения файлов спецификаций выполняться сразу или откладываться в конец очереди
    specFileRetriesDeferred: false,
    //
    // Тестовый репортер для stdout.
    // По умолчанию поддерживается только 'dot'
    // См. также: https://webdriver.io/docs/dot-reporter.html и нажмите "Reporters" в левой колонке
    reporters: [
        'dot',
        ['allure', {
            //
            // Если вы используете репортер "allure", вам следует указать директорию, в которую
            // WebdriverIO должен сохранять все отчеты allure.
            outputDir: './'
        }]
    ],
    //
    // Опции, передаваемые в Mocha.
    // Полный список см. на: http://mochajs.org
    mochaOpts: {
        ui: 'bdd'
    },
    //
    // Опции, передаваемые в Jasmine.
    // См. также: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-jasmine-framework#jasmineopts-options
    jasmineOpts: {
        //
        // Таймаут Jasmine по умолчанию
        defaultTimeoutInterval: 5000,
        //
        // Фреймворк Jasmine позволяет перехватывать каждую проверку, чтобы логировать состояние приложения
        // или веб-сайта в зависимости от результата. Например, очень удобно делать скриншот каждый раз,
        // когда проверка не проходит.
        expectationResultHandler: function(passed, assertion) {
            // сделать что-нибудь
        },
        //
        // Использовать функциональность grep, специфичную для Jasmine
        grep: null,
        invertGrep: null
    },
    //
    // Если вы используете Cucumber, вам нужно указать, где находятся определения шагов.
    // См. также: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (файл/директория) подключить файлы перед выполнением фич
        backtrace: false,   // <boolean> показывать полную трассировку стека для ошибок
        compiler: [],       // <string[]> ("extension:module") подключать файлы с указанным EXTENSION после подключения MODULE (можно повторять)
        dryRun: false,      // <boolean> вызвать форматтеры без выполнения шагов
        failFast: false,    // <boolean> прервать выполнение при первой ошибке
        snippets: true,     // <boolean> скрыть сниппеты определений шагов для ожидающих шагов
        source: true,       // <boolean> скрыть URI источников
        strict: false,      // <boolean> завершиться с ошибкой, если есть неопределенные или ожидающие шаги
        tags: '',           // <string> (выражение) выполнять только фичи или сценарии с тегами, соответствующими выражению
        timeout: 20000,     // <number> таймаут для определений шагов
        ignoreUndefinedDefinitions: false, // <boolean> Включите эту опцию, чтобы считать неопределенные определения предупреждениями.
        scenarioLevelReporter: false // Включите, чтобы webdriver.io считал тестами сценарии, а не шаги.
    },
    // Укажите пользовательский путь к tsconfig — WDIO использует `tsx` для компиляции файлов TypeScript
    // Ваш TSConfig автоматически определяется из текущей рабочей директории,
    // но вы можете указать пользовательский путь здесь или с помощью переменной окружения TSX_TSCONFIG_PATH
    // См. документацию `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    //
    // Примечание: эта настройка будет переопределена переменной окружения TSX_TSCONFIG_PATH и/или аргументом cli --tsConfigPath, если они указаны.
    // Эта настройка будет проигнорирована, если node не сможет разобрать ваш файл wdio.conf.ts без помощи tsx, например, если у вас
    // настроены псевдонимы путей в tsconfig.json и вы используете эти псевдонимы внутри файла wdio.config.ts.
    // Используйте эту опцию, только если у вас конфигурационный файл .js или ваш конфигурационный файл .ts является валидным JavaScript.
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // Хуки
    // =====
    // WebdriverIO предоставляет несколько хуков, которые можно использовать для вмешательства в процесс тестирования, чтобы расширить
    // его и создавать вокруг него сервисы. Вы можете назначить им как одну функцию, так и массив
    // методов. Если один из них возвращает promise, WebdriverIO будет ждать, пока этот promise
    // не будет выполнен, прежде чем продолжить.
    //
    /**
     * Выполняется один раз перед запуском всех воркеров.
     * @param {object} config объект конфигурации wdio
     * @param {Array.<Object>} capabilities список сведений о capabilities
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * Выполняется перед запуском рабочего процесса и может использоваться для инициализации конкретного сервиса
     * для этого воркера, а также для асинхронного изменения окружения выполнения.
     * @param  {string} cid      идентификатор capability (например, 0-0)
     * @param  {object} caps     объект, содержащий capabilities для сессии, которая будет запущена в воркере
     * @param  {object} specs    спецификации, которые будут выполняться в рабочем процессе
     * @param  {object} args     объект, который будет объединен с основной конфигурацией после инициализации воркера
     * @param  {object} execArgv список строковых аргументов, передаваемых рабочему процессу
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * Выполняется после завершения рабочего процесса.
     * @param  {string} cid      идентификатор capability (например, 0-0)
     * @param  {number} exitCode 0 - успех, 1 - ошибка
     * @param  {object} specs    спецификации, которые будут выполняться в рабочем процессе
     * @param  {number} retries  количество использованных повторных попыток
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * Выполняется перед инициализацией сессии webdriver и тестового фреймворка. Позволяет
     * изменять конфигурацию в зависимости от capability или спецификации.
     * @param {object} config объект конфигурации wdio
     * @param {Array.<Object>} capabilities список сведений о capabilities
     * @param {Array.<String>} specs список путей к файлам спецификаций, которые будут выполнены
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * Выполняется перед началом выполнения тестов. В этот момент вы имеете доступ ко всем глобальным
     * переменным, таким как `browser`. Это идеальное место для определения пользовательских команд.
     * @param {Array.<Object>} capabilities список сведений о capabilities
     * @param {Array.<String>} specs        список путей к файлам спецификаций, которые будут выполнены
     * @param {object}         browser      экземпляр созданной сессии браузера/устройства
     */
    before: function (capabilities, specs, browser) {
    },
    /**
     * Выполняется перед началом набора тестов (только в Mocha/Jasmine).
     * @param {object} suite сведения о наборе тестов
     */
    beforeSuite: function (suite) {
    },
    /**
     * Этот хук выполняется _перед_ началом каждого хука внутри набора тестов.
     * (Например, он выполняется перед вызовом `before`, `beforeEach`, `after`, `afterEach` в Mocha.). В Cucumber `context` — это объект World.
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * Хук, который выполняется _после_ завершения каждого хука внутри набора тестов.
     * (Например, он выполняется после вызова `before`, `beforeEach`, `after`, `afterEach` в Mocha.). В Cucumber `context` — это объект World.
     */
    afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
    },
    /**
     * Функция, выполняемая перед тестом (только в Mocha/Jasmine)
     * @param {object} test    объект теста
     * @param {object} context объект области видимости, в которой был выполнен тест
     */
    beforeTest: function (test, context) {
    },
    /**
     * Выполняется перед выполнением команды WebdriverIO.
     * @param {string} commandName имя команды хука
     * @param {Array} args аргументы, которые получила бы команда
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * Выполняется после выполнения команды WebdriverIO
     * @param {string} commandName имя команды хука
     * @param {Array} args аргументы, которые получила бы команда
     * @param {*} result результат команды
     * @param {Error} error объект ошибки, если есть
     */
    afterCommand: function (commandName, args, result, error) {
    },
    /**
     * Функция, выполняемая после теста (только в Mocha/Jasmine)
     * @param {object}  test             объект теста
     * @param {object}  context          объект области видимости, в которой был выполнен тест
     * @param {Error}   result.error     объект ошибки, если тест не прошел, иначе `undefined`
     * @param {*}       result.result    возвращаемый объект тестовой функции
     * @param {number}  result.duration  длительность теста
     * @param {boolean} result.passed    true, если тест прошел, иначе false
     * @param {object}  result.retries   информация о повторных попытках для спецификации, например `{ attempts: 0, limit: 0 }`
     */
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
    },
    /**
     * Хук, который выполняется после завершения набора тестов (только в Mocha/Jasmine).
     * @param {object} suite сведения о наборе тестов
     */
    afterSuite: function (suite) {
    },
    /**
     * Выполняется после завершения всех тестов. У вас по-прежнему есть доступ ко всем глобальным переменным
     * из теста.
     * @param {number} result 0 - тест прошел, 1 - тест не прошел
     * @param {Array.<Object>} capabilities список сведений о capabilities
     * @param {Array.<String>} specs список путей к выполненным файлам спецификаций
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * Выполняется сразу после завершения сессии webdriver.
     * @param {object} config объект конфигурации wdio
     * @param {Array.<Object>} capabilities список сведений о capabilities
     * @param {Array.<String>} specs список путей к выполненным файлам спецификаций
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * Выполняется после завершения работы всех воркеров, когда процесс вот-вот завершится.
     * Ошибка, выброшенная в хуке `onComplete`, приведет к провалу запуска тестов.
     * @param {object} exitCode 0 - успех, 1 - ошибка
     * @param {object} config объект конфигурации wdio
     * @param {Array.<Object>} capabilities список сведений о capabilities
     * @param {<Object>} results объект, содержащий результаты тестов
     */
    onComplete: function (exitCode, config, capabilities, results) {
    },
    /**
    * Выполняется при обновлении сессии.
    * @param {string} oldSessionId идентификатор старой сессии
    * @param {string} newSessionId идентификатор новой сессии
    */
    onReload: function(oldSessionId, newSessionId) {
    },
    /**
     * Хуки Cucumber
     *
     * Выполняется перед фичей Cucumber.
     * @param {string}                   uri      путь к файлу фичи
     * @param {GherkinDocument.IFeature} feature  объект фичи Cucumber
     */
    beforeFeature: function (uri, feature) {
    },
    /**
     *
     * Выполняется перед сценарием Cucumber.
     * @param {ITestCaseHookParameter} world    объект world, содержащий информацию о pickle и шаге теста
     * @param {object}                 context  объект World Cucumber
     */
    beforeScenario: function (world, context) {
    },
    /**
     *
     * Выполняется перед шагом Cucumber.
     * @param {Pickle.IPickleStep} step     данные шага
     * @param {IPickle}            scenario pickle сценария
     * @param {object}             context  объект World Cucumber
     */
    beforeStep: function (step, scenario, context) {
    },
    /**
     *
     * Выполняется после шага Cucumber.
     * @param {Pickle.IPickleStep} step             данные шага
     * @param {IPickle}            scenario         pickle сценария
     * @param {object}             result           объект с результатами сценария
     * @param {boolean}            result.passed    true, если сценарий прошел
     * @param {string}             result.error     стек ошибки, если сценарий не прошел
     * @param {number}             result.duration  длительность сценария в миллисекундах
     * @param {object}             context          объект World Cucumber
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * Выполняется после сценария Cucumber.
     * @param {ITestCaseHookParameter} world            объект world, содержащий информацию о pickle и шаге теста
     * @param {object}                 result           объект с результатами сценария `{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    true, если сценарий прошел
     * @param {string}                 result.error     стек ошибки, если сценарий не прошел
     * @param {number}                 result.duration  длительность сценария в миллисекундах
     * @param {object}                 context          объект World Cucumber
     */
    afterScenario: function (world, result, context) {
    },
    /**
     *
     * Выполняется после фичи Cucumber.
     * @param {string}                   uri      путь к файлу фичи
     * @param {GherkinDocument.IFeature} feature  объект фичи Cucumber
     */
    afterFeature: function (uri, feature) {
    },
    /**
     * Выполняется перед тем, как библиотека проверок WebdriverIO выполнит проверку.
     * @param {object} params                 информация о проверке
     * @param {string} params.matcherName     имя матчера, вызванного тестом (для псевдонима — имя псевдонима)
     * @param {*}      params.expectedValue   значение, переданное в матчер
     * @param {object} params.options         опции проверки
     */
    beforeAssertion: function (params) {
    },
    /**
     * Выполняется после того, как библиотека проверок WebdriverIO выполнит проверку.
     * @param {object} params                 информация о проверке, такая же, как в `beforeAssertion`
     * @param {object} params.result          результат матчера с `pass` (boolean) и `message()`.
     *                                        `pass` равен true, когда значение совпадает, в том числе с `.not`
     */
    afterAssertion: function (params) {
    }
}
```

Вы также можете найти файл со всеми возможными опциями и вариантами в [папке с примерами](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js).