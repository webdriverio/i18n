---
id: configurationfile
title: Файл конфигурации
---

Файл конфигурации содержит всю необходимую информацию для запуска вашего набора тестов. Это модуль NodeJS, который экспортирует JSON.

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
    // Конфигурации сервера
    // =====================
    // Адрес хоста запущенного Selenium сервера. Эта информация обычно избыточна, так как
    // WebdriverIO автоматически подключается к localhost. Также, если вы используете один из
    // поддерживаемых облачных сервисов, таких как Sauce Labs, Browserstack, Testing Bot или TestMu AI (ранее LambdaTest), вам также не
    // нужно определять информацию о хосте и порте (потому что WebdriverIO может определить это
    // из ваших данных пользователя и ключа). Однако, если вы используете приватный Selenium
    // бэкенд, вам следует определить здесь `hostname`, `port` и `path`.
    //
    hostname: 'localhost',
    port: 4444,
    path: '/',
    // Протокол: http | https
    // protocol: 'http',
    //
    // =================
    // Поставщики услуг
    // =================
    // WebdriverIO поддерживает Sauce Labs, Browserstack, Testing Bot и TestMu AI (ранее LambdaTest). (Другие облачные провайдеры
    // также должны работать.) Эти сервисы определяют конкретные значения `user` и `key` (или ключ доступа),
    // которые вы должны указать здесь для подключения к этим сервисам.
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // Если вы запускаете тесты на Sauce Labs, вы можете указать регион, в котором хотите запускать тесты
    // через свойство `region`. Доступные сокращения для регионов: `us` (по умолчанию) и `eu`.
    // Эти регионы используются для облака VM Sauce Labs и Real Device Cloud Sauce Labs.
    // Если вы не укажете регион, по умолчанию используется `us`.
    region: 'us',
    //
    // Sauce Labs предоставляет [headless-решение](https://saucelabs.com/products/web-testing/sauce-headless-testing),
    // которое позволяет запускать тесты Chrome и Firefox в режиме headless.
    //
    headless: false,
    //
    // ==================
    // Указание тестовых файлов
    // ==================
    // Определите, какие тестовые спецификации должны запускаться. Шаблон указывается относительно директории
    // файла конфигурации, который запускается.
    //
    // Спецификации определяются как массив файлов спецификаций (опционально используя подстановочные знаки,
    // которые будут раскрыты). Тест для каждого файла спецификаций будет запущен в отдельном
    // рабочем процессе. Чтобы группа файлов спецификаций выполнялась в одном рабочем
    // процессе, заключите их в массив внутри массива specs.
    //
    // Путь к файлам спецификаций будет определен относительно директории
    // файла конфигурации, если это не абсолютный путь.
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
    // Определите ваши capabilities здесь. WebdriverIO может запускать несколько capabilities одновременно.
    // В зависимости от количества capabilities, WebdriverIO запускает несколько тестовых
    // сессий. В рамках ваших `capabilities` вы можете переопределить опции `spec` и `exclude`
    // для группировки определенных спецификаций для конкретной capability.
    //
    // Сначала вы можете определить, сколько экземпляров должно быть запущено одновременно. Допустим,
    // у вас есть 3 разные capabilities (Chrome, Firefox и Safari), и вы
    // установили `maxInstances` равным 1. wdio запустит 3 процесса.
    //
    // Следовательно, если у вас 10 файлов спецификаций и вы установили `maxInstances` равным 10, все файлы спецификаций
    // будут проверены одновременно, и будет создано 30 процессов.
    //
    // Это свойство определяет, сколько capabilities из одного и того же теста должно запускать тесты.
    //
    maxInstances: 10,
    //
    // Или установите лимит для запуска тестов с определенной capability.
    maxInstancesPerCapability: 10,
    //
    // Внедряет глобальные переменные WebdriverIO (например, `browser`, `$` и `$$`) в глобальное окружение.
    // Если установить значение `false`, следует импортировать из `@wdio/globals`. Примечание: WebdriverIO не
    // управляет внедрением глобальных переменных, специфичных для тестового фреймворка.
    //
    injectGlobals: true,
    //
    // Если у вас возникают проблемы с получением всех важных capabilities, ознакомьтесь с
    // конфигуратором платформы Sauce Labs - отличным инструментом для настройки ваших capabilities:
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // для запуска chrome в режиме headless требуются следующие флаги
        // (см. https://developers.google.com/web/updates/2017/04/headless-chrome)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // Параметр для игнорирования некоторых или всех флагов по умолчанию
        // - если значение true: игнорировать все флаги DevTools 'по умолчанию' и аргументы Puppeteer 'по умолчанию'
        // - если значение - массив: DevTools фильтрует указанные аргументы по умолчанию
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // maxInstances может быть переопределен для каждой capability. Так, если у вас есть внутренняя сеть Selenium
        // с только 5 экземплярами firefox, вы можете убедиться, что одновременно не запускается больше
        // 5 экземпляров.
        'wdio:maxInstances': 5,
        browserName: 'firefox',
        'wdio:specs': [
            'test/ffOnly/*'
        ],
        'moz:firefoxOptions': {
          // флаг для активации режима Firefox headless (см. https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities для более подробной информации о moz:firefoxOptions)
          // args: ['-headless']
        },
        // Если указан outputDir, WebdriverIO может захватывать логи сессии драйвера
        // можно настроить, какие типы логов исключать.
        // excludeDriverLogs: ['*'], // передайте '*', чтобы исключить все логи сессии драйвера
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // Параметр для игнорирования некоторых или всех аргументов Puppeteer по умолчанию
        // ignoreDefaultArgs: ['-foreground'], // установите значение true, чтобы игнорировать все аргументы по умолчанию
    }],
    //
    // Дополнительный список аргументов node для использования при запуске дочерних процессов
    execArgv: [],
    //
    // ===================
    // Конфигурации тестов
    // ===================
    // Определите все опции, относящиеся к экземпляру WebdriverIO, здесь
    //
    // Уровень подробности логирования: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // Установить конкретные уровни логирования для каждого логгера
    // используйте уровень 'silent', чтобы отключить логгер
    logLevels: {
        webdriver: 'info',
        '@wdio/appium-service': 'info'
    },
    //
    // Установить директорию для хранения всех логов
    outputDir: __dirname,
    //
    // Если вы хотите запускать тесты только до определенного количества неудачных тестов, используйте
    // bail (по умолчанию 0 - не прерывать, запускать все тесты).
    bail: 0,
    //
    // Установите базовый URL, чтобы сократить вызовы команд `url()`. Если ваш параметр `url` начинается
    // с `/`, то `baseUrl` добавляется в начало, не включая часть пути `baseUrl`.
    //
    // Если ваш параметр `url` начинается без схемы или `/` (например, `some/path`), то `baseUrl`
    // добавляется непосредственно в начало.
    baseUrl: 'http://localhost:8080',
    //
    // Таймаут по умолчанию для всех команд waitForXXX.
    waitforTimeout: 1000,
    //
    // Добавьте файлы для отслеживания (например, код приложения или объекты страниц) при запуске команды `wdio`
    // с флагом `--watch`. Поддерживается использование подстановочных знаков.
    filesToWatch: [
        // например, перезапускать тесты при изменении кода приложения
        // './app/**/*.js'
    ],
    //
    // Фреймворк, с которым вы хотите запускать спецификации.
    // Поддерживаются следующие: 'mocha', 'jasmine' и 'cucumber'
    // См. также: https://webdriver.io/docs/frameworks.html
    //
    // Убедитесь, что у вас установлен пакет адаптера wdio для конкретного фреймворка перед запуском любых тестов.
    framework: 'mocha',
    //
    // Количество повторных попыток для всего файла спецификаций, когда он полностью завершается неудачей
    specFileRetries: 1,
    // Задержка в секундах между попытками повторного запуска файла спецификаций
    specFileRetriesDelay: 0,
    // Следует ли повторять файлы спецификаций немедленно или отложить до конца очереди
    specFileRetriesDeferred: false,
    //
    // Репортер тестов для stdout.
    // Единственный поддерживаемый по умолчанию - 'dot'
    // См. также: https://webdriver.io/docs/dot-reporter.html , и нажмите на "Reporters" в левой колонке
    reporters: [
        'dot',
        ['allure', {
            //
            // Если вы используете репортер "allure", вы должны определить директорию, куда
            // WebdriverIO должен сохранять все отчеты allure.
            outputDir: './'
        }]
    ],
    //
    // Опции, передаваемые в Mocha.
    // См. полный список на: http://mochajs.org
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
        // Фреймворк Jasmine позволяет перехватывать каждое утверждение, чтобы логировать состояние приложения
        // или веб-сайта в зависимости от результата. Например, очень удобно делать скриншот каждый раз,
        // когда утверждение не проходит.
        expectationResultHandler: function(passed, assertion) {
            // сделать что-то
        },
        //
        // Использование специфичной для Jasmine функциональности grep
        grep: null,
        invertGrep: null
    },
    //
    // Если вы используете Cucumber, вам нужно указать, где находятся ваши определения шагов.
    // См. также: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (file/dir) требовать файлы перед выполнением функций
        backtrace: false,   // <boolean> показывать полный backtrace для ошибок
        compiler: [],       // <string[]> ("extension:module") требовать файлы с данным EXTENSION после требования MODULE (повторяемо)
        dryRun: false,      // <boolean> вызывать форматеры без выполнения шагов
        failFast: false,    // <boolean> прервать выполнение при первой неудаче
        snippets: true,     // <boolean> скрыть сниппеты определения шагов для ожидающих шагов
        source: true,       // <boolean> скрыть URI источников
        strict: false,      // <boolean> завершать неудачей, если есть неопределенные или ожидающие шаги
        tagExpression: '',  // <string> (выражение) выполнять только функции или сценарии с тегами, соответствующими выражению
        timeout: 20000,     // <number> таймаут для определений шагов
        ignoreUndefinedDefinitions: false, // <boolean> Включите эту опцию, чтобы рассматривать неопределенные определения как предупреждения.
        scenarioLevelReporter: false // Включите это, чтобы webdriver.io вел себя так, как будто сценарии, а не шаги, были тестами.
    },
    // Укажите пользовательский путь к tsconfig - WDIO использует `tsx` для компиляции файлов TypeScript
    // Ваш TSConfig автоматически определяется из текущей рабочей директории
    // но вы можете указать пользовательский путь здесь или установив переменную окружения TSX_TSCONFIG_PATH
    // См. документацию `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    //
    // Примечание: Этот параметр будет переопределен переменной окружения TSX_TSCONFIG_PATH и/или аргументом командной строки --tsConfigPath, если они указаны.
    // Этот параметр будет игнорироваться, если node не может разобрать ваш файл wdio.conf.ts без помощи от tsx, например, если у вас настроены псевдонимы путей
    // в tsconfig.json, и вы используете эти псевдонимы путей в файле wdio.config.ts.
    // Используйте это только если вы используете файл конфигурации .js или ваш файл конфигурации .ts является допустимым JavaScript.
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO предоставляет несколько хуков, которые вы можете использовать для вмешательства в процесс тестирования,
    // чтобы улучшить его и создать вокруг него сервисы. Вы можете применить к ним одну функцию или массив
    // методов. Если один из них возвращает промис, WebdriverIO будет ждать, пока этот промис не будет
    // разрешен, чтобы продолжить.
    //
    /**
     * Выполняется один раз перед запуском всех рабочих процессов.
     * @param {object} config объект конфигурации wdio
     * @param {Array.<Object>} capabilities список деталей capabilities
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * Выполняется перед созданием рабочего процесса и может использоваться для инициализации определенного сервиса
     * для этого рабочего процесса, а также для модификации среды выполнения в асинхронном режиме.
     * @param  {string} cid      id capability (например, 0-0)
     * @param  {object} caps     объект, содержащий capabilities для сессии, которая будет создана в рабочем процессе
     * @param  {object} specs    спецификации для запуска в рабочем процессе
     * @param  {object} args     объект, который будет объединен с основной конфигурацией после инициализации рабочего процесса
     * @param  {object} execArgv список строковых аргументов, переданных рабочему процессу
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * Выполняется после завершения работы рабочего процесса.
     * @param  {string} cid      id capability (например, 0-0)
     * @param  {number} exitCode 0 - успех, 1 - неудача
     * @param  {object} specs    спецификации для запуска в рабочем процессе
     * @param  {number} retries  количество использованных повторных попыток
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * Выполняется перед инициализацией сессии webdriver и тестового фреймворка. Позволяет вам
     * манипулировать конфигурациями в зависимости от capability или спецификации.
     * @param {object} config объект конфигурации wdio
     * @param {Array.<Object>} capabilities список деталей capabilities
     * @param {Array.<String>} specs Список путей к файлам спецификаций, которые будут запущены
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * Выполняется перед началом выполнения теста. На этом этапе вы имеете доступ ко всем глобальным
     * переменным, таким как `browser`. Это идеальное место для определения пользовательских команд.
     * @param {Array.<Object>} capabilities список деталей capabilities
     * @param {Array.<String>} specs        Список путей к файлам спецификаций, которые будут запущены
     * @param {object}         browser      экземпляр созданной сессии браузера/устройства
     */
    before: function (capabilities, specs, browser) {
    },
    /**
     * Выполняется перед началом набора тестов (только в Mocha/Jasmine).
     * @param {object} suite детали набора тестов
     */
    beforeSuite: function (suite) {
    },
    /**
     * Этот хук выполняется _перед_ каждым хуком в наборе.
     * (Например, это запускается перед вызовом `before`, `beforeEach`, `after`, `afterEach` в Mocha.). В Cucumber `context` - это объект World.
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * Хук, который выполняется _после_ каждого хука в наборе.
     * (Например, это запускается после вызова `before`, `beforeEach`, `after`, `afterEach` в Mocha.). В Cucumber `context` - это объект World.
     */
    afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
    },
    /**
     * Функция, выполняемая перед тестом (только в Mocha/Jasmine)
     * @param {object} test    объект теста
     * @param {object} context объект области видимости, в которой выполнялся тест
     */
    beforeTest: function (test, context) {
    },
    /**
     * Запускается перед выполнением команды WebdriverIO.
     * @param {string} commandName имя команды хука
     * @param {Array} args аргументы, которые команда должна получить
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * Запускается после выполнения команды WebdriverIO
     * @param {string} commandName имя команды хука
     * @param {Array} args аргументы, которые команда должна получить
     * @param {*} result результат выполнения команды
     * @param {Error} error объект ошибки, если есть
     */
    afterCommand: function (commandName, args, result, error) {
    },
    /**
     * Функция, выполняемая после теста (только в Mocha/Jasmine)
     * @param {object}  test             объект теста
     * @param {object}  context          объект области видимости, в которой выполнялся тест
     * @param {Error}   result.error     объект ошибки в случае неудачи теста, иначе `undefined`
     * @param {*}       result.result    объект возврата функции теста
     * @param {number}  result.duration  продолжительность теста
     * @param {boolean} result.passed    true, если тест пройден, иначе false
     * @param {object}  result.retries   информация о повторных попытках, связанных со спецификацией, например `{ attempts: 0, limit: 0 }`
     */
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
    },
    /**
     * Хук, который выполняется после завершения набора тестов (только в Mocha/Jasmine).
     * @param {object} suite детали набора тестов
     */
    afterSuite: function (suite) {
    },
    /**
     * Выполняется после завершения всех тестов. У вас все еще есть доступ ко всем глобальным переменным
     * из теста.
     * @param {number} result 0 - тест пройден, 1 - тест не пройден
     * @param {Array.<Object>} capabilities список деталей capabilities
     * @param {Array.<String>} specs Список путей к файлам спецификаций, которые были запущены
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * Выполняется сразу после завершения сессии webdriver.
     * @param {object} config объект конфигурации wdio
     * @param {Array.<Object>} capabilities список деталей capabilities
     * @param {Array.<String>} specs Список путей к файлам спецификаций, которые были запущены
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * Выполняется после завершения работы всех рабочих процессов и перед выходом из процесса.
     * Ошибка, выброшенная в хуке `onComplete`, приведет к неудачному запуску теста.
     * @param {object} exitCode 0 - успех, 1 - неудача
     * @param {object} config объект конфигурации wdio
     * @param {Array.<Object>} capabilities список деталей capabilities
     * @param {<Object>} results объект, содержащий результаты тестов
     */
    onComplete: function (exitCode, config, capabilities, results) {
    },
    /**
    * Выполняется при обновлении страницы.
    * @param {string} oldSessionId ID сессии старой сессии
    * @param {string} newSessionId ID сессии новой сессии
    */
    onReload: function(oldSessionId, newSessionId) {
    },
    /**
     * Хуки Cucumber
     *
     * Запускается перед функцией Cucumber.
     * @param {string}                   uri      путь к файлу функции
     * @param {GherkinDocument.IFeature} feature  объект функции Cucumber
     */
    beforeFeature: function (uri, feature) {
    },
    /**
     *
     * Запускается перед сценарием Cucumber.
     * @param {ITestCaseHookParameter} world    объект world, содержащий информацию о pickle и шаге теста
     * @param {object}                 context  объект World Cucumber
     */
    beforeScenario: function (world, context) {
    },
    /**
     *
     * Запускается перед шагом Cucumber.
     * @param {Pickle.IPickleStep} step     данные шага
     * @param {IPickle}            scenario pickle сценария
     * @param {object}             context  объект World Cucumber
     */
    beforeStep: function (step, scenario, context) {
    },
    /**
     *
     * Запускается после шага Cucumber.
     * @param {Pickle.IPickleStep} step             данные шага
     * @param {IPickle}            scenario         pickle сценария
     * @param {object}             result           объект результатов, содержащий результаты сценария
     * @param {boolean}            result.passed    true, если сценарий пройден
     * @param {string}             result.error     стек ошибки, если сценарий не пройден
     * @param {number}             result.duration  продолжительность сценария в миллисекундах
     * @param {object}             context          объект World Cucumber
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * Запускается после сценария Cucumber.
     * @param {ITestCaseHookParameter} world            объект world, содержащий информацию о pickle и шаге теста
     * @param {object}                 result           объект результатов, содержащий результаты сценария `{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    true, если сценарий пройден
     * @param {string}                 result.error     стек ошибки, если сценарий не пройден
     * @param {number}                 result.duration  продолжительность сценария в миллисекундах
     * @param {object}                 context          объект World Cucumber
     */
    afterScenario: function (world, result, context) {
    },
    /**
     *
     * Запускается после функции Cucumber.
     * @param {string}                   uri      путь к файлу функции
     * @param {GherkinDocument.IFeature} feature  объект функции Cucumber
     */
    afterFeature: function (uri, feature) {
    },
    /**
     * Запускается перед тем, как библиотека утверждений WebdriverIO делает утверждение.
     * @param commandName имя команды
     * @param args        аргументы, которые команда должна получить
     */
    beforeAssertion: function (params) {
    },
    /**
     * Запускается после выполнения команды WebdriverIO
     * @param commandName  имя команды
     * @param args         аргументы, которые команда должна получить
     * @param result       результат выполнения команды
     * @param error        ошибка в случае, если что-то пошло не так
     */
    afterAssertion: function (params) {
    }
}
```

Вы также можете найти файл со всеми возможными опциями и вариациями в [папке с примерами](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js).