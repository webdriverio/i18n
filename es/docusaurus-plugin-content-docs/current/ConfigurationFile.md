---
id: configurationfile
title: Archivo de Configuración
description: "Explora un ejemplo comentado de wdio.conf.js que enumera todas las opciones del testrunner, capacidades y hooks compatibles, con explicaciones."
---

El archivo de configuración contiene toda la información necesaria para ejecutar tu suite de pruebas. Es un módulo de NodeJS que exporta un JSON.

Aquí tienes un ejemplo de configuración con todas las propiedades compatibles e información adicional:

```js
export const config = {

    // ==================================
    // Dónde se deben lanzar tus pruebas
    // ==================================
    //
    runner: 'local',
    //
    // =====================
    // Configuraciones del servidor
    // =====================
    // Dirección del host del servidor Selenium en ejecución. Esta información suele ser obsoleta, ya que
    // WebdriverIO se conecta automáticamente a localhost. Además, si utilizas uno de los
    // servicios en la nube compatibles como Sauce Labs, Browserstack, Testing Bot o TestMu AI (anteriormente LambdaTest), tampoco
    // necesitas definir la información de host y puerto (porque WebdriverIO puede deducirla
    // a partir de tu información de usuario y clave). Sin embargo, si utilizas un backend
    // privado de Selenium, debes definir aquí el `hostname`, `port` y `path`.
    //
    hostname: 'localhost',
    port: 4444,
    path: '/',
    // Protocolo: http | https
    // protocol: 'http',
    //
    // =================
    // Proveedores de servicios
    // =================
    // WebdriverIO es compatible con Sauce Labs, Browserstack, Testing Bot y TestMu AI (anteriormente LambdaTest). (Otros proveedores
    // en la nube también deberían funcionar.) Estos servicios definen valores específicos de `user` y `key` (o clave de acceso)
    // que debes indicar aquí para conectarte a ellos.
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // Si ejecutas tus pruebas en Sauce Labs, puedes especificar la región en la que quieres ejecutarlas
    // mediante la propiedad `region`. Los identificadores cortos disponibles para las regiones son `us` (predeterminado) y `eu`.
    // Estas regiones se utilizan para la nube de máquinas virtuales de Sauce Labs y para Sauce Labs Real Device Cloud.
    // Si no indicas la región, se usa `us` por defecto.
    region: 'us',
    //
    // Sauce Labs ofrece una [opción headless](https://saucelabs.com/products/web-testing/sauce-headless-testing)
    // que te permite ejecutar pruebas de Chrome y Firefox en modo headless.
    //
    headless: false,
    //
    // ==================
    // Especificar archivos de prueba
    // ==================
    // Define qué specs de prueba deben ejecutarse. El patrón es relativo al directorio
    // del archivo de configuración que se está ejecutando.
    //
    // Los specs se definen como un array de archivos spec (opcionalmente usando comodines
    // que se expandirán). La prueba de cada archivo spec se ejecutará en un proceso
    // worker independiente. Para que un grupo de archivos spec se ejecute en el mismo proceso
    // worker, agrúpalos en un array dentro del array specs.
    //
    // La ruta de los archivos spec se resolverá de forma relativa al directorio
    // del archivo de configuración, a menos que sea absoluta.
    //
    specs: [
        'test/spec/**',
        ['group/spec/**']
    ],
    // Patrones a excluir.
    exclude: [
        'test/spec/multibrowser/**',
        'test/spec/mobile/**'
    ],
    //
    // ============
    // Capacidades
    // ============
    // Define aquí tus capacidades. WebdriverIO puede ejecutar varias capacidades al mismo
    // tiempo. Dependiendo del número de capacidades, WebdriverIO lanza varias sesiones
    // de prueba. Dentro de tus `capabilities`, puedes sobrescribir qué archivos se ejecutan con
    // `wdio:specs` y `wdio:exclude` para agrupar specs concretos en una capacidad específica.
    //
    // Primero, puedes definir cuántas instancias deben iniciarse al mismo tiempo. Supongamos
    // que tienes 3 capacidades diferentes (Chrome, Firefox y Safari) y has
    // establecido `maxInstances` en 1. wdio generará 3 procesos.
    //
    // Por lo tanto, si tienes 10 archivos spec y estableces `maxInstances` en 10, todos los archivos spec
    // se probarán al mismo tiempo y se generarán 30 procesos.
    //
    // La propiedad controla cuántas capacidades de la misma prueba deben ejecutar pruebas.
    //
    maxInstances: 10,
    //
    // O establece un límite para ejecutar pruebas con una capacidad específica.
    maxInstancesPerCapability: 10,
    //
    // Inserta los globales de WebdriverIO (p. ej. `browser`, `$` y `$$`) en el entorno global.
    // Si lo estableces en `false`, deberás importarlos desde `@wdio/globals`. Nota: WebdriverIO no
    // gestiona la inyección de globales específicos del framework de pruebas.
    //
    injectGlobals: true,
    //
    // Si tienes problemas para reunir todas las capacidades importantes, consulta el
    // configurador de plataformas de Sauce Labs, una gran herramienta para configurar tus capacidades:
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // para ejecutar chrome en modo headless se requieren los siguientes flags
        // (consulta https://developers.google.com/web/updates/2017/04/headless-chrome)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // Parámetro para ignorar algunos o todos los flags predeterminados
        // - si el valor es true: ignora todos los 'flags predeterminados' de DevTools y los 'argumentos predeterminados' de Puppeteer
        // - si el valor es un array: DevTools filtra los argumentos predeterminados indicados
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // maxInstances puede sobrescribirse por capacidad. Así, si tienes un grid de Selenium
        // interno con solo 5 instancias de firefox disponibles, puedes asegurarte de que no se
        // inicien más de 5 instancias a la vez.
        'wdio:maxInstances': 5,
        browserName: 'firefox',
        'wdio:specs': [
            'test/ffOnly/*'
        ],
        'moz:firefoxOptions': {
          // flag para activar el modo headless de Firefox (consulta https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities para más detalles sobre moz:firefoxOptions)
          // args: ['-headless']
        },
        // Si se proporciona outputDir, WebdriverIO puede capturar los logs de sesión del driver
        // es posible configurar qué logTypes excluir.
        // excludeDriverLogs: ['*'], // pasa '*' para excluir todos los logs de sesión del driver
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // Parámetro para ignorar algunos o todos los argumentos predeterminados de Puppeteer
        // ignoreDefaultArgs: ['-foreground'], // establece el valor en true para ignorar todos los argumentos predeterminados
    }],
    //
    // Lista adicional de argumentos de node a usar al iniciar procesos hijos
    execArgv: [],
    //
    // ===================
    // Configuraciones de pruebas
    // ===================
    // Define aquí todas las opciones relevantes para la instancia de WebdriverIO
    //
    // Nivel de detalle de los logs: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // Establece niveles de log específicos por logger
    // usa el nivel 'silent' para desactivar el logger
    logLevels: {
        webdriver: 'info',
        '@wdio/appium-service': 'info'
    },
    //
    // Establece el directorio donde almacenar todos los logs
    outputDir: __dirname,
    //
    // Si solo quieres ejecutar tus pruebas hasta que falle una cantidad específica de pruebas, usa
    // bail (el valor predeterminado es 0: no detenerse, ejecutar todas las pruebas).
    bail: 0,
    //
    // Establece una URL base para acortar las llamadas al comando `url()`. Si tu parámetro `url` empieza
    // con `/`, se antepone la `baseUrl`, sin incluir la parte de la ruta de `baseUrl`.
    //
    // Si tu parámetro `url` empieza sin un esquema ni `/` (como `some/path`), la `baseUrl`
    // se antepone directamente.
    baseUrl: 'http://localhost:8080',
    //
    // Tiempo de espera predeterminado para todos los comandos waitForXXX.
    waitforTimeout: 1000,
    //
    // Añade archivos a vigilar (p. ej. código de la aplicación o page objects) al ejecutar el comando `wdio`
    // con el flag `--watch`. Se admite globbing.
    filesToWatch: [
        // p. ej. volver a ejecutar las pruebas si cambio el código de mi aplicación
        // './app/**/*.js'
    ],
    //
    // Framework con el que quieres ejecutar tus specs.
    // Se admiten los siguientes: 'mocha', 'jasmine' y 'cucumber'
    // Consulta también: https://webdriver.io/docs/frameworks.html
    //
    // Asegúrate de tener instalado el paquete adaptador de wdio para el framework específico antes de ejecutar cualquier prueba.
    framework: 'mocha',
    //
    // Número de veces que se reintenta el archivo spec completo cuando falla en su totalidad
    specFileRetries: 1,
    // Retraso en segundos entre los intentos de reintento del archivo spec
    specFileRetriesDelay: 0,
    // Si los archivos spec reintentados deben reintentarse inmediatamente o aplazarse al final de la cola
    specFileRetriesDeferred: false,
    //
    // Reporter de pruebas para stdout.
    // El único compatible por defecto es 'dot'
    // Consulta también: https://webdriver.io/docs/dot-reporter.html , y haz clic en "Reporters" en la columna izquierda
    reporters: [
        'dot',
        ['allure', {
            //
            // Si utilizas el reporter "allure", debes definir el directorio donde
            // WebdriverIO debe guardar todos los informes de allure.
            outputDir: './'
        }]
    ],
    //
    // Opciones que se pasarán a Mocha.
    // Consulta la lista completa en: http://mochajs.org
    mochaOpts: {
        ui: 'bdd'
    },
    //
    // Opciones que se pasarán a Jasmine.
    // Consulta también: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-jasmine-framework#jasmineopts-options
    jasmineOpts: {
        //
        // Tiempo de espera predeterminado de Jasmine
        defaultTimeoutInterval: 5000,
        //
        // El framework Jasmine permite interceptar cada aserción para registrar el estado de la aplicación
        // o del sitio web según el resultado. Por ejemplo, es muy útil tomar una captura de pantalla cada vez
        // que falla una aserción.
        expectationResultHandler: function(passed, assertion) {
            // hacer algo
        },
        //
        // Utiliza la funcionalidad grep específica de Jasmine
        grep: null,
        invertGrep: null
    },
    //
    // Si utilizas Cucumber, debes especificar dónde se encuentran tus definiciones de pasos.
    // Consulta también: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (archivo/dir) requiere archivos antes de ejecutar las features
        backtrace: false,   // <boolean> muestra el backtrace completo de los errores
        compiler: [],       // <string[]> ("extension:module") requiere archivos con la EXTENSION dada después de requerir MODULE (repetible)
        dryRun: false,      // <boolean> invoca los formatters sin ejecutar los pasos
        failFast: false,    // <boolean> aborta la ejecución en el primer fallo
        snippets: true,     // <boolean> oculta los snippets de definición de pasos para pasos pendientes
        source: true,       // <boolean> oculta las URIs de origen
        strict: false,      // <boolean> falla si hay pasos indefinidos o pendientes
        tags: '',           // <string> (expresión) solo ejecuta las features o escenarios con tags que coincidan con la expresión
        timeout: 20000,     // <number> tiempo de espera para las definiciones de pasos
        ignoreUndefinedDefinitions: false, // <boolean> Activa esta configuración para tratar las definiciones indefinidas como advertencias.
        scenarioLevelReporter: false // Activa esto para que webdriver.io se comporte como si los escenarios, y no los pasos, fueran las pruebas.
    },
    // Especifica una ruta personalizada de tsconfig - WDIO usa `tsx` para compilar archivos TypeScript
    // Tu TSConfig se detecta automáticamente desde el directorio de trabajo actual
    // pero puedes especificar una ruta personalizada aquí o estableciendo la variable de entorno TSX_TSCONFIG_PATH
    // Consulta la documentación de `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    //
    // Nota: esta configuración será sobrescrita por la variable de entorno TSX_TSCONFIG_PATH y/o el argumento de cli --tsConfigPath si se especifican.
    // Esta configuración se ignorará si node no puede analizar tu archivo wdio.conf.ts sin la ayuda de tsx, p. ej. si tienes alias
    // de rutas configurados en tsconfig.json y usas esos alias dentro de tu archivo wdio.config.ts.
    // Úsala solo si utilizas un archivo de configuración .js o si tu archivo de configuración .ts es JavaScript válido.
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO proporciona varios hooks que puedes usar para intervenir en el proceso de pruebas con el fin de mejorarlo
    // y crear servicios en torno a él. Puedes aplicarle una sola función o un array de
    // métodos. Si uno de ellos devuelve una promesa, WebdriverIO esperará hasta que esa promesa se
    // resuelva para continuar.
    //
    /**
     * Se ejecuta una vez antes de que se lancen todos los workers.
     * @param {object} config objeto de configuración de wdio
     * @param {Array.<Object>} capabilities lista de detalles de las capacidades
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * Se ejecuta antes de que se genere un proceso worker y puede usarse para inicializar un servicio específico
     * para ese worker, así como para modificar entornos de ejecución de forma asíncrona.
     * @param  {string} cid      id de la capacidad (p. ej. 0-0)
     * @param  {object} caps     objeto que contiene las capacidades para la sesión que se generará en el worker
     * @param  {object} specs    specs que se ejecutarán en el proceso worker
     * @param  {object} args     objeto que se fusionará con la configuración principal una vez inicializado el worker
     * @param  {object} execArgv lista de argumentos de tipo string pasados al proceso worker
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * Se ejecuta después de que un proceso worker haya terminado.
     * @param  {string} cid      id de la capacidad (p. ej. 0-0)
     * @param  {number} exitCode 0 - éxito, 1 - fallo
     * @param  {object} specs    specs que se ejecutarán en el proceso worker
     * @param  {number} retries  número de reintentos utilizados
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * Se ejecuta antes de inicializar la sesión de webdriver y el framework de pruebas. Te permite
     * manipular configuraciones según la capacidad o el spec.
     * @param {object} config objeto de configuración de wdio
     * @param {Array.<Object>} capabilities lista de detalles de las capacidades
     * @param {Array.<String>} specs Lista de rutas de archivos spec que se van a ejecutar
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * Se ejecuta antes de que comience la ejecución de las pruebas. En este punto puedes acceder a todas las
     * variables globales como `browser`. Es el lugar perfecto para definir comandos personalizados.
     * @param {Array.<Object>} capabilities lista de detalles de las capacidades
     * @param {Array.<String>} specs        Lista de rutas de archivos spec que se van a ejecutar
     * @param {object}         browser      instancia de la sesión de navegador/dispositivo creada
     */
    before: function (capabilities, specs, browser) {
    },
    /**
     * Se ejecuta antes de que comience la suite (solo en Mocha/Jasmine).
     * @param {object} suite detalles de la suite
     */
    beforeSuite: function (suite) {
    },
    /**
     * Este hook se ejecuta _antes_ de que comience cada hook dentro de la suite.
     * (Por ejemplo, se ejecuta antes de llamar a `before`, `beforeEach`, `after`, `afterEach` en Mocha.). En Cucumber, `context` es el objeto World.
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * Hook que se ejecuta _después_ de que termine cada hook dentro de la suite.
     * (Por ejemplo, se ejecuta después de llamar a `before`, `beforeEach`, `after`, `afterEach` en Mocha.). En Cucumber, `context` es el objeto World.
     */
    afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
    },
    /**
     * Función que se ejecuta antes de una prueba (solo en Mocha/Jasmine)
     * @param {object} test    objeto de la prueba
     * @param {object} context objeto de ámbito con el que se ejecutó la prueba
     */
    beforeTest: function (test, context) {
    },
    /**
     * Se ejecuta antes de que se ejecute un comando de WebdriverIO.
     * @param {string} commandName nombre del comando del hook
     * @param {Array} args argumentos que recibiría el comando
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * Se ejecuta después de que se ejecute un comando de WebdriverIO
     * @param {string} commandName nombre del comando del hook
     * @param {Array} args argumentos que recibiría el comando
     * @param {*} result resultado del comando
     * @param {Error} error objeto de error, si lo hay
     */
    afterCommand: function (commandName, args, result, error) {
    },
    /**
     * Función que se ejecuta después de una prueba (solo en Mocha/Jasmine)
     * @param {object}  test             objeto de la prueba
     * @param {object}  context          objeto de ámbito con el que se ejecutó la prueba
     * @param {Error}   result.error     objeto de error en caso de que la prueba falle; de lo contrario, `undefined`
     * @param {*}       result.result    objeto devuelto por la función de prueba
     * @param {number}  result.duration  duración de la prueba
     * @param {boolean} result.passed    true si la prueba ha pasado; de lo contrario, false
     * @param {object}  result.retries   información sobre los reintentos relacionados con el spec, p. ej. `{ attempts: 0, limit: 0 }`
     */
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
    },
    /**
     * Hook que se ejecuta después de que la suite haya terminado (solo en Mocha/Jasmine).
     * @param {object} suite detalles de la suite
     */
    afterSuite: function (suite) {
    },
    /**
     * Se ejecuta después de que todas las pruebas hayan terminado. Todavía tienes acceso a todas las variables globales de
     * la prueba.
     * @param {number} result 0 - prueba superada, 1 - prueba fallida
     * @param {Array.<Object>} capabilities lista de detalles de las capacidades
     * @param {Array.<String>} specs Lista de rutas de archivos spec que se ejecutaron
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * Se ejecuta justo después de terminar la sesión de webdriver.
     * @param {object} config objeto de configuración de wdio
     * @param {Array.<Object>} capabilities lista de detalles de las capacidades
     * @param {Array.<String>} specs Lista de rutas de archivos spec que se ejecutaron
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * Se ejecuta después de que todos los workers se hayan cerrado y el proceso esté a punto de terminar.
     * Un error lanzado en el hook `onComplete` hará que la ejecución de pruebas falle.
     * @param {object} exitCode 0 - éxito, 1 - fallo
     * @param {object} config objeto de configuración de wdio
     * @param {Array.<Object>} capabilities lista de detalles de las capacidades
     * @param {<Object>} results objeto que contiene los resultados de las pruebas
     */
    onComplete: function (exitCode, config, capabilities, results) {
    },
    /**
    * Se ejecuta cuando ocurre una recarga.
    * @param {string} oldSessionId ID de sesión de la sesión anterior
    * @param {string} newSessionId ID de sesión de la nueva sesión
    */
    onReload: function(oldSessionId, newSessionId) {
    },
    /**
     * Hooks de Cucumber
     *
     * Se ejecuta antes de una Feature de Cucumber.
     * @param {string}                   uri      ruta al archivo de la feature
     * @param {GherkinDocument.IFeature} feature  objeto feature de Cucumber
     */
    beforeFeature: function (uri, feature) {
    },
    /**
     *
     * Se ejecuta antes de un Escenario de Cucumber.
     * @param {ITestCaseHookParameter} world    objeto world que contiene información sobre el pickle y el paso de prueba
     * @param {object}                 context  objeto World de Cucumber
     */
    beforeScenario: function (world, context) {
    },
    /**
     *
     * Se ejecuta antes de un Paso de Cucumber.
     * @param {Pickle.IPickleStep} step     datos del paso
     * @param {IPickle}            scenario pickle del escenario
     * @param {object}             context  objeto World de Cucumber
     */
    beforeStep: function (step, scenario, context) {
    },
    /**
     *
     * Se ejecuta después de un Paso de Cucumber.
     * @param {Pickle.IPickleStep} step             datos del paso
     * @param {IPickle}            scenario         pickle del escenario
     * @param {object}             result           objeto de resultados que contiene los resultados del escenario
     * @param {boolean}            result.passed    true si el escenario ha pasado
     * @param {string}             result.error     pila de errores si el escenario falló
     * @param {number}             result.duration  duración del escenario en milisegundos
     * @param {object}             context          objeto World de Cucumber
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * Se ejecuta después de un Escenario de Cucumber.
     * @param {ITestCaseHookParameter} world            objeto world que contiene información sobre el pickle y el paso de prueba
     * @param {object}                 result           objeto de resultados que contiene los resultados del escenario `{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    true si el escenario ha pasado
     * @param {string}                 result.error     pila de errores si el escenario falló
     * @param {number}                 result.duration  duración del escenario en milisegundos
     * @param {object}                 context          objeto World de Cucumber
     */
    afterScenario: function (world, result, context) {
    },
    /**
     *
     * Se ejecuta después de una Feature de Cucumber.
     * @param {string}                   uri      ruta al archivo de la feature
     * @param {GherkinDocument.IFeature} feature  objeto feature de Cucumber
     */
    afterFeature: function (uri, feature) {
    },
    /**
     * Se ejecuta antes de que una biblioteca de aserciones de WebdriverIO realice una aserción.
     * @param {object} params                 información de la aserción
     * @param {string} params.matcherName     nombre del matcher que llamó la prueba (para un alias, el nombre del alias)
     * @param {*}      params.expectedValue   valor que se pasa al matcher
     * @param {object} params.options         opciones de la aserción
     */
    beforeAssertion: function (params) {
    },
    /**
     * Se ejecuta después de que una biblioteca de aserciones de WebdriverIO realice una aserción.
     * @param {object} params                 información de la aserción, la misma que en `beforeAssertion`
     * @param {object} params.result          resultado del matcher, con `pass` (boolean) y `message()`.
     *                                        `pass` es true cuando el valor coincide, también con `.not`
     */
    afterAssertion: function (params) {
    }
}
```

También puedes encontrar un archivo con todas las opciones y variaciones posibles en la [carpeta de ejemplos](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js).