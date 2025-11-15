---
id: configurationfile
title: Файл конфигурации
---

Файл конфигурации содержит всю необходимую информацию для запуска ваших тестов. Это модуль NodeJS, который экспортирует JSON.

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
    // Адрес хоста запущенного Selenium сервера. Эта информация обычно устаревшая, так как
    // WebdriverIO автоматически подключается к localhost. Также если вы используете одну из
    // поддерживаемых облачных служб, таких как Sauce Labs, Browserstack, Testing Bot или LambdaTest, вам также не
    // нужно определять информацию о хосте и порте (потому что WebdriverIO может определить это
    // из информации о пользователе и ключе). Однако, если вы используете приватный сервер Selenium,
    // вам следует определить здесь `hostname`, `port` и `path`.
    //
    hostname: 'localhost',
    port: 4444,
    path: '/',
    // Protocol: http | https
    // protocol: 'http',
    //
    // =================
    // Поставщики услуг
    // =================
    // WebdriverIO поддерживает Sauce Labs, Browserstack, Testing Bot и LambdaTest. (Другие облачные провайдеры
    // также должны работать.) Эти сервисы определяют определенные значения `user` и `key` (или ключ доступа),
    // которые вы должны указать здесь для подключения к этим сервисам.
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // Если вы запускаете тесты на Sauce Labs, вы можете указать регион, в котором вы хотите запускать тесты
    // через свойство `region`. Доступные краткие обозначения для регионов: `us` (по умолчанию) и `eu`.
    // Эти регионы используются для облака виртуальных машин Sauce Labs и облака реальных устройств Sauce Labs.
    // Если вы не указываете регион, по умолчанию используется `us`.
    region: 'us',
    //
    // Sauce Labs предоставляет [headless решение](https://saucelabs.com/products/web-testing/sauce-headless-testing),
    // которое позволяет запускать тесты Chrome и Firefox в headless режиме.
    //
    headless: false,
    //
    // ==================
    // Указание тестовых файлов
    // ==================
    // Определите, какие тестовые спецификации должны выполняться. Шаблон относится к директории
    // файла конфигурации, который выполняется.
    //
    // Спецификации определяются как массив файлов спецификаций (опционально с использованием подстановочных знаков,
    // которые будут расширены). Тест для каждого файла спецификации будет запускаться в отдельном
    // рабочем процессе. Чтобы группа файлов спецификаций выполнялась в одном рабочем
    // процессе, заключите их в массив внутри массива specs.
    //
    // Путь к файлам спецификаций будет разрешен относительно директории
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
    // В зависимости от количества capabilities WebdriverIO запускает несколько тестовых
    // сессий. В рамках ваших `capabilities` вы можете перезаписать опции `spec` и `exclude`,
    // чтобы сгруппировать определенные спецификации для конкретных capabilities.
    //
    // Сначала вы можете определить, сколько экземпляров должно быть запущено одновременно. Допустим,
    // у вас есть 3 разных capabilities (Chrome, Firefox и Safari), и вы
    // установили `maxInstances` на 1. wdio запустит 3 процесса.
    //
    // Поэтому, если у вас 10 файлов спецификаций и вы установили `maxInstances` на 10, все файлы спецификаций
    // будут тестироваться одновременно и будет запущено 30 процессов.
    //
    // Свойство определяет, сколько capabilities из одного и того же теста должны запускать тесты.
    //
    maxInstances: 10,
    //
    // Или установите лимит для запуска тестов с определенными capability.
    maxInstancesPerCapability: 10,
    //
    // Вставляет глобальные переменные WebdriverIO (например, `browser`, `$` и `$$`) в глобальную среду.
    // Если установлено значение `false`, вам следует импортировать из `@wdio/globals`. Примечание: WebdriverIO не
    // обрабатывает внедрение глобальных переменных, специфичных для тестового фреймворка.
    //
    injectGlobals: true,
    //
    // Если у вас возникают проблемы с получением всех важных capabilities вместе, проверьте
    // конфигуратор платформы Sauce Labs - отличный инструмент для настройки ваших capabilities:
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // для запуска chrome в headless режиме необходимы следующие флаги
        // (см. https://developers.google.com/web/updates/2017/04/headless-chrome)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // Параметр для игнорирования некоторых или всех флагов по умолчанию
        // - если значение true: игнорировать все 'стандартные флаги' DevTools и 'стандартные аргументы' Puppeteer
        // - если значение - массив: DevTools фильтрует указанные стандартные аргументы
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // maxInstances может быть перезаписан для каждого capability. Таким образом, если у вас есть локальная
        // сетка Selenium с только 5 доступными экземплярами firefox, вы можете убедиться, что не более
        // 5 экземпляров запускается одновременно.
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
        excludeDriverLogs: ['bugreport', 'server'], // передайте '*', чтобы исключить все логи сессии драйвера
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
    // Определите все параметры, которые имеют отношение к экземпляру WebdriverIO здесь
    //
    // Уровень детализации логирования: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // Установите определенные уровни логирования для каждого логгера
    // используйте уровень 'silent' для отключения логгера
    logLevels: {
        webdriver: 'info',
        '@wdio/appium-service': 'info'
    },
    //
    // Установите директорию для хранения всех логов
    outputDir: __dirname,
    //
    // Если вы хотите запускать тесты только до тех пор, пока не произойдет определенное количество ошибок, используйте
    // bail (по умолчанию 0 - не прерывать, запускать все тесты).
    bail: 0,
    //
    // Установите базовый URL, чтобы сократить вызовы команды `url()`. Если ваш параметр `url` начинается
    // с `/`, baseUrl добавляется впереди, не включая часть пути `baseUrl`.
    //
    // Если ваш параметр `url` начинается без схемы или `/` (например, `some/path`), `baseUrl`
    // добавляется напрямую в начало.
    baseUrl: 'http://localhost:8080',
    //
    // Тайм-аут по умолчанию для всех команд waitForXXX.
    waitforTimeout: 1000,
    //
    // Добавьте файлы для отслеживания (например, код приложения или объекты страницы) при выполнении команды `wdio`
    // с флагом `--watch`. Поддерживаются подстановочные знаки.
    filesToWatch: [
        // например, перезапуск тестов при изменении кода приложения
        // './app/**/*.js'
    ],
    //
    // Фреймворк, с которым вы хотите запускать свои спецификации.
    // Поддерживаются следующие: 'mocha', 'jasmine' и 'cucumber'
    // См. также: https://webdriver.io/docs/frameworks.html
    //
    // Убедитесь, что у вас установлен пакет адаптера wdio для конкретного фреймворка перед запуском любых тестов.
    framework: 'mocha',
    //
    // Количество повторов всего файла спецификации, когда он полностью завершается с ошибкой
    specFileRetries: 1,
    // Задержка в секундах между попытками повторного запуска файла спецификации
    specFileRetriesDelay: 0,
    // Должны ли повторные запуски файлов спецификаций выполняться немедленно или отложены до конца очереди
    specFileRetriesDeferred: false,
    //
    // Репортер тестов для stdout.
    // Единственный поддерживаемый по умолчанию - 'dot'
    // См. также: https://webdriver.io/docs/dot-reporter.html и нажмите на "Reporters" в левой колонке
    reporters: [
        'dot',
        ['allure', {
            //
            // Если вы используете репортер "allure", вы должны определить директорию, где
            // WebdriverIO должен сохранять все отчеты allure.
            outputDir: './'
        }]
    ],
    //
    // Параметры для передачи в Mocha.
    // См. полный список на: http://mochajs.org
    mochaOpts: {
        ui: 'bdd'
    },
    //
    // Параметры для передачи в Jasmine.
    // См. также: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-jasmine-framework#jasmineopts-options
    jasmineOpts: {
        //
        // Тайм-аут Jasmine по умолчанию
        defaultTimeoutInterval: 5000,
        //
        // Фреймворк Jasmine позволяет перехватывать каждое утверждение, чтобы логировать состояние приложения
        // или веб-сайта в зависимости от результата. Например, удобно делать скриншот каждый раз,
        // когда утверждение не проходит.
        expectationResultHandler: function(passed, assertion) {
            // сделать что-то
        },
        //
        // Использование функциональности grep, специфичной для Jasmine
        grep: null,
        invertGrep: null
    },
    //
    // Если вы используете Cucumber, вам нужно указать, где находятся ваши определения шагов.
    // См. также: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (файл/директория) требуемые файлы перед выполнением функций
        backtrace: false,   // <boolean> показывать полную трассировку для ошибок
        compiler: [],       // <string[]> ("расширение:модуль") требуемые файлы с указанным РАСШИРЕНИЕМ после требования МОДУЛЯ (повторяемо)
        dryRun: false,      // <boolean> вызывать форматтеры без выполнения шагов
        failFast: false,    // <boolean> прервать выполнение при первой ошибке
        snippets: true,     // <boolean> скрыть сниппеты определения шагов для ожидающих шагов
        source: true,       // <boolean> скрыть URI источников
        strict: false,      // <boolean> завершить с ошибкой, если есть неопределенные или ожидающие шаги
        tagExpression: '',  // <string> (выражение) выполнять только функции или сценарии с тегами, соответствующими выражению
        timeout: 20000,     // <number> тайм-аут для определений шагов
        ignoreUndefinedDefinitions: false, // <boolean> Включите эту конфигурацию, чтобы считать неопределенные определения предупреждениями.
        scenarioLevelReporter: false // Включите это, чтобы webdriver.io работал так, как будто сценарии, а не шаги, являются тестами.
    },
    // Укажите пользовательский путь к tsconfig - WDIO использует `tsx` для компиляции файлов TypeScript
    // Ваш TSConfig автоматически определяется из текущего рабочего каталога,
    // но вы можете указать пользовательский путь здесь или установив переменную среды TSX_TSCONFIG_PATH
    // См. документацию `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    //
    // Примечание: Этот параметр будет переопределен переменной среды TSX_TSCONFIG_PATH и/или аргументом cli --tsConfigPath, если они указаны.
    // Этот параметр будет игнорироваться, если node не может разобрать ваш файл wdio.conf.ts без помощи tsx, например, если у вас есть
    // псевдонимы путей, настроенные в tsconfig.json, и вы используете эти псевдонимы путей внутри вашего файла wdio.config.ts.
    // Используйте это только если вы используете файл конфигурации .js или ваш файл конфигурации .ts является действительным JavaScript.
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // Хуки
    // =====
    // WebdriverIO предоставляет несколько хуков, которые вы можете использовать для вмешательства в процесс тестирования, чтобы улучшить
    // его и создавать вокруг него сервисы. Вы можете применить к нему одну функцию или массив
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
     * Выполняется перед созданием рабочего процесса и может быть использован для инициализации определенного сервиса
     * для этого рабочего процесса, а также для модификации среды выполнения в асинхронном режиме.
     * @param  {string} cid      id capability (например, 0-0)
     * @param  {object} caps     объект, содержащий capabilities для сессии, которая будет создана в рабочем процессе
     * @param  {object} specs    спецификации, которые будут выполняться в рабочем процессе
     * @param  {object} args     объект, который будет объединен с основной конфигурацией после инициализации рабочего процесса
     * @param  {object} execArgv список строковых аргументов, переданных рабочему процессу
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * Выполняется после завершения рабочего процесса.
     * @param  {string} cid      id capability (например, 0-0)
     * @param  {number} exitCode 0 - успех, 1 - ошибка
     * @param  {object} specs    спецификации, которые будут выполняться в рабочем процессе
     * @param  {number} retries  количество использованных повторов
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * Выполняется перед инициализацией сессии webdriver и тестового фреймворка. Это позволяет вам
     * манипулировать конфигурациями в зависимости от capability или спецификации.
     * @param {object} config объект конфигурации wdio
     * @param {Array.<Object>} capabilities список деталей capabilities
     * @param {Array.<String>} specs Список путей к файлам спецификаций, которые должны быть запущены
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * Выполняется перед началом выполнения теста. В этот момент вы можете получить доступ ко всем глобальным
     * переменным, таким как `browser`. Это идеальное место для определения пользовательских команд.
     * @param {Array.<Object>} capabilities список деталей capabilities
     * @param {Array.<String>} specs        Список путей к файлам спецификаций, которые должны быть запущены
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
     * Этот хук выполняется _перед_ каждым хуком внутри набора.
     * (Например, это выполняется перед вызовом `before`, `beforeEach`, `after`, `afterEach` в Mocha.). В Cucumber `context` - это объект World.
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * Хук, который выполняется _после_ каждого хука внутри набора.
     * (Например, это выполняется после вызова `before`, `beforeEach`, `after`, `afterEach` в Mocha.). В Cucumber `context` - это объект World.
     */
    afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
    },
    /**
     * Функция, которая выполняется перед тестом (только в Mocha/Jasmine)
     * @param {object} test    объект теста
     * @param {object} context объект области видимости, с которым был выполнен тест
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
     * Функция, которая выполняется после теста (только в Mocha/Jasmine)
     * @param {object}  test             объект теста
     * @param {object}  context          объект области видимости, с которым был выполнен тест
     * @param {Error}   result.error     объект ошибки в случае неудачи теста, иначе `undefined`
     * @param {*}       result.result    возвращаемый объект функции теста
     * @param {number}  result.duration  продолжительность теста
     * @param {boolean} result.passed    true, если тест прошел успешно, иначе false
     * @param {object}  result.retries   информация о повторах, связанных со спецификацией, например, `{ attempts: 0, limit: 0 }`
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
     * Выполняется после завершения всех тестов. У вас все еще есть доступ ко всем глобальным переменным из
     * теста.
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
     * Выполняется после завершения работы всех рабочих процессов и перед завершением процесса.
     * Ошибка, возникшая в хуке `onComplete`, приведет к неудачному выполнению тестов.
     * @param {object} exitCode 0 - успех, 1 - ошибка
     * @param {object} config объект конфигурации wdio
     * @param {Array.<Object>} capabilities список деталей capabilities
     * @param {<Object>} results объект, содержащий результаты тестов
     */
    onComplete: function (exitCode, config, capabilities, results) {
    },
    /**
    * Выполняется при обновлении.
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
     * @param {ITestCaseHookParameter} world    объект мира, содержащий информацию о pickle и шаге теста
     * @param {object}                 context  объект Cucumber World
     */
    beforeScenario: function (world, context) {
    },
    /**
     *
     * Выполняется перед шагом Cucumber.
     * @param {Pickle.IPickleStep} step     данные шага
     * @param {IPickle}            scenario pickle сценария
     * @param {object}             context  объект Cucumber World
     */
    beforeStep: function (step, scenario, context) {
    },
    /**
     *
     * Выполняется после шага Cucumber.
     * @param {Pickle.IPickleStep} step             данные шага
     * @param {IPickle}            scenario         pickle сценария
     * @param {object}             result           объект результатов, содержащий результаты сценария
     * @param {boolean}            result.passed    true, если сценарий прошел успешно
     * @param {string}             result.error     стек ошибки, если сценарий не прошел
     * @param {number}             result.duration  продолжительность сценария в миллисекундах
     * @param {object}             context          объект Cucumber World
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * Выполняется после сценария Cucumber.
     * @param {ITestCaseHookParameter} world            объект мира, содержащий информацию о pickle и шаге теста
     * @param {object}                 result           объект результатов, содержащий результаты сценария `{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    true, если сценарий прошел успешно
     * @param {string}                 result.error     стек ошибки, если сценарий не прошел
     * @param {number}                 result.duration  продолжительность сценария в миллисекундах
     * @param {object}                 context          объект Cucumber World
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
     * Выполняется перед тем, как библиотека утверждений WebdriverIO делает утверждение.
     * @param commandName имя команды
     * @param args        аргументы, которые получила бы команда
     */
    beforeAssertion: function (params) {
    },
    /**
     * Выполняется после выполнения команды WebdriverIO
     * @param commandName  имя команды
     * @param args         аргументы, которые получила бы команда
     * @param result       результат команды
     * @param error        ошибка в случае, если что-то пошло не так
     */
    afterAssertion: function (params) {
    }
}
```

Вы также можете найти файл со всеми возможными опциями и вариациями в [папке примеров](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js).