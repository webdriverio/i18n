---
id: configurationfile
title: Archivo de Configuración
---

El archivo de configuración contiene toda la información necesaria para ejecutar tu suite de pruebas. Es un módulo de NodeJS que exporta un JSON.

Aquí hay un ejemplo de configuración con todas las propiedades soportadas e información adicional:

```js
export const config = {

    // ==================================
    // Dónde deberían lanzarse tus pruebas
    // ==================================
    //
    runner: 'local',
    //
    // =====================
    // Configuraciones del servidor
    // =====================
    // Dirección del host del servidor Selenium en ejecución. Esta información generalmente es obsoleta,
    // ya que WebdriverIO se conecta automáticamente a localhost. Además, si estás utilizando uno de los
    // servicios en la nube compatibles como Sauce Labs, Browserstack, Testing Bot o LambdaTest, tampoco
    // necesitas definir la información de host y puerto (porque WebdriverIO puede averiguarlo
    // a partir de tu información de usuario y clave). Sin embargo, si estás utilizando un backend
    // de Selenium privado, deberías definir `hostname`, `port` y `path` aquí.
    //
    hostname: 'localhost',
    port: 4444,
    path: '/',
    // Protocolo: http | https
    // protocol: 'http',
    //
    // =================
    // Proveedores de Servicios
    // =================
    // WebdriverIO admite Sauce Labs, Browserstack, Testing Bot y LambdaTest. (Otros proveedores en la nube
    // también deberían funcionar). Estos servicios definen valores específicos de `user` y `key` (o clave de acceso)
    // que debes colocar aquí para conectarte a estos servicios.
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // Si ejecutas tus pruebas en Sauce Labs, puedes especificar la región donde quieres ejecutar tus pruebas
    // mediante la propiedad `region`. Los nombres cortos disponibles para las regiones son `us` (por defecto) y `eu`.
    // Estas regiones se utilizan para la nube de VM de Sauce Labs y la Nube de Dispositivos Reales de Sauce Labs.
    // Si no proporcionas la región, el valor predeterminado es `us`.
    region: 'us',
    //
    // Sauce Labs proporciona una [oferta headless](https://saucelabs.com/products/web-testing/sauce-headless-testing)
    // que te permite ejecutar pruebas de Chrome y Firefox en modo headless.
    //
    headless: false,
    //
    // ==================
    // Especificar Archivos de Prueba
    // ==================
    // Define qué especificaciones de prueba deben ejecutarse. El patrón es relativo al directorio
    // del archivo de configuración que se está ejecutando.
    //
    // Las especificaciones se definen como una matriz de archivos de especificaciones (opcionalmente utilizando comodines
    // que se expandirán). La prueba para cada archivo de especificación se ejecutará en un proceso
    // de trabajo separado. Para tener un grupo de archivos de especificaciones ejecutándose en el mismo proceso
    // de trabajo, inclúyelos en una matriz dentro de la matriz specs.
    //
    // La ruta de los archivos de especificaciones se resolverá relativamente desde el directorio
    // del archivo de configuración a menos que sea absoluta.
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
    // Define tus capacidades aquí. WebdriverIO puede ejecutar múltiples capacidades al mismo
    // tiempo. Dependiendo del número de capacidades, WebdriverIO lanza varias sesiones
    // de prueba. Dentro de tus `capabilities`, puedes sobrescribir las opciones `spec` y `exclude`
    // para agrupar especificaciones específicas a una capacidad específica.
    //
    // Primero, puedes definir cuántas instancias deben iniciarse al mismo tiempo. Digamos
    // que tienes 3 capacidades diferentes (Chrome, Firefox y Safari) y has
    // establecido `maxInstances` en 1. wdio generará 3 procesos.
    //
    // Por lo tanto, si tienes 10 archivos de especificaciones y estableces `maxInstances` en 10, todos los archivos de especificaciones
    // se probarán al mismo tiempo y se generarán 30 procesos.
    //
    // La propiedad controla cuántas capacidades de la misma prueba deben ejecutar pruebas.
    //
    maxInstances: 10,
    //
    // O establece un límite para ejecutar pruebas con una capacidad específica.
    maxInstancesPerCapability: 10,
    //
    // Inserta los globales de WebdriverIO (por ejemplo, `browser`, `$` y `$$`) en el entorno global.
    // Si lo estableces en `false`, deberías importar desde `@wdio/globals`. Nota: WebdriverIO no
    // maneja la inyección de globales específicos del framework de pruebas.
    //
    injectGlobals: true,
    //
    // Si tienes problemas para reunir todas las capacidades importantes, consulta el
    // configurador de plataforma de Sauce Labs - una excelente herramienta para configurar tus capacidades:
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // para ejecutar chrome en modo headless se requieren las siguientes flags
        // (ver https://developers.google.com/web/updates/2017/04/headless-chrome)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // Parámetro para ignorar algunas o todas las flags predeterminadas
        // - si el valor es true: ignora todas las 'flags predeterminadas' de DevTools y los 'argumentos predeterminados' de Puppeteer
        // - si el valor es un array: DevTools filtra los argumentos predeterminados dados
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // maxInstances puede sobrescribirse por capacidad. Así que si tienes una red Selenium
        // interna con solo 5 instancias de firefox disponibles, puedes asegurarte de que no más de
        // 5 instancias se inicien a la vez.
        'wdio:maxInstances': 5,
        browserName: 'firefox',
        'wdio:specs': [
            'test/ffOnly/*'
        ],
        'moz:firefoxOptions': {
          // flag para activar el modo headless de Firefox (ver https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities para más detalles sobre moz:firefoxOptions)
          // args: ['-headless']
        },
        // Si se proporciona outputDir, WebdriverIO puede capturar registros de sesión del controlador
        // es posible configurar qué logTypes excluir.
        excludeDriverLogs: ['bugreport', 'server'], // pasa '*' para excluir todos los logs de sesión del controlador
        //
        // Parámetro para ignorar algunos o todos los argumentos predeterminados de Puppeteer
        // ignoreDefaultArgs: ['-foreground'], // establece el valor en true para ignorar todos los argumentos predeterminados
    }],
    //
    // Lista adicional de argumentos de nodo para usar al iniciar procesos secundarios
    execArgv: [],
    //
    // ===================
    // Configuraciones de Prueba
    // ===================
    // Define todas las opciones relevantes para la instancia de WebdriverIO aquí
    //
    // Nivel de verbosidad del registro: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // Establece niveles de registro específicos por registrador
    // usa el nivel 'silent' para deshabilitar un registrador
    logLevels: {
        webdriver: 'info',
        '@wdio/appium-service': 'info'
    },
    //
    // Establece el directorio para almacenar todos los registros
    outputDir: __dirname,
    //
    // Si solo quieres ejecutar tus pruebas hasta que una cantidad específica de pruebas hayan fallado, usa
    // bail (el valor predeterminado es 0 - no hacer bail, ejecutar todas las pruebas).
    bail: 0,
    //
    // Establece una URL base para acortar las llamadas al comando `url()`. Si tu parámetro `url` comienza
    // con `/`, se antepone el `baseUrl`, sin incluir la parte de ruta de `baseUrl`.
    //
    // Si tu parámetro `url` comienza sin un esquema o `/` (como `some/path`), el `baseUrl`
    // se antepone directamente.
    baseUrl: 'http://localhost:8080',
    //
    // Tiempo de espera predeterminado para todos los comandos waitForXXX.
    waitforTimeout: 1000,
    //
    // Agrega archivos para observar (por ejemplo, código de aplicación u objetos de página) al ejecutar el comando `wdio`
    // con la bandera `--watch`. Se admiten comodines.
    filesToWatch: [
        // p.ej. volver a ejecutar las pruebas si cambio mi código de aplicación
        // './app/**/*.js'
    ],
    //
    // Framework con el que quieres ejecutar tus especificaciones.
    // Los siguientes son compatibles: 'mocha', 'jasmine' y 'cucumber'
    // Ver también: https://webdriver.io/docs/frameworks.html
    //
    // Asegúrate de tener instalado el paquete adaptador wdio para el framework específico antes de ejecutar cualquier prueba.
    framework: 'mocha',
    //
    // El número de veces que se reintenta todo el archivo de especificación cuando falla en su conjunto
    specFileRetries: 1,
    // Retraso en segundos entre los intentos de reintento del archivo de especificaciones
    specFileRetriesDelay: 0,
    // Si los archivos de especificaciones reintentados deben reintentarse inmediatamente o diferirse al final de la cola
    specFileRetriesDeferred: false,
    //
    // Reportero de pruebas para stdout.
    // El único compatible por defecto es 'dot'
    // Ver también: https://webdriver.io/docs/dot-reporter.html , y haz clic en "Reporters" en la columna izquierda
    reporters: [
        'dot',
        ['allure', {
            //
            // Si estás usando el reportero "allure" debes definir el directorio donde
            // WebdriverIO debe guardar todos los informes de allure.
            outputDir: './'
        }]
    ],
    //
    // Opciones que se pasarán a Mocha.
    // Ver la lista completa en: http://mochajs.org
    mochaOpts: {
        ui: 'bdd'
    },
    //
    // Opciones que se pasarán a Jasmine.
    // Ver también: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-jasmine-framework#jasmineopts-options
    jasmineOpts: {
        //
        // Tiempo de espera predeterminado de Jasmine
        defaultTimeoutInterval: 5000,
        //
        // El framework Jasmine permite interceptar cada afirmación para registrar el estado de la aplicación
        // o sitio web dependiendo del resultado. Por ejemplo, es muy útil tomar una captura de pantalla cada vez
        // que falla una afirmación.
        expectationResultHandler: function(passed, assertion) {
            // hacer algo
        },
        //
        // Usa la funcionalidad específica de grep de Jasmine
        grep: null,
        invertGrep: null
    },
    //
    // Si estás usando Cucumber, necesitas especificar dónde están ubicadas tus definiciones de paso.
    // Ver también: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (archivo/dir) requiere archivos antes de ejecutar características
        backtrace: false,   // <boolean> muestra el seguimiento completo de los errores
        compiler: [],       // <string[]> ("extensión:módulo") requiere archivos con la EXTENSIÓN dada después de requerir el MÓDULO (repetible)
        dryRun: false,      // <boolean> invocar formateadores sin ejecutar pasos
        failFast: false,    // <boolean> abortar la ejecución en el primer fallo
        snippets: true,     // <boolean> oculta fragmentos de definición de pasos para pasos pendientes
        source: true,       // <boolean> oculta URIs de origen
        strict: false,      // <boolean> falla si hay pasos indefinidos o pendientes
        tagExpression: '',  // <string> (expresión) solo ejecuta las características o escenarios con etiquetas que coinciden con la expresión
        timeout: 20000,     // <number> tiempo de espera para definiciones de pasos
        ignoreUndefinedDefinitions: false, // <boolean> Habilita esta configuración para tratar las definiciones indefinidas como advertencias.
        scenarioLevelReporter: false // Habilita esto para hacer que webdriver.io se comporte como si los escenarios y no los pasos fueran las pruebas.
    },
    // Especifica una ruta personalizada de tsconfig - WDIO usa `tsx` para compilar archivos TypeScript
    // Tu TSConfig se detecta automáticamente desde el directorio de trabajo actual
    // pero puedes especificar una ruta personalizada aquí o configurando la variable de entorno TSX_TSCONFIG_PATH
    // Consulta la documentación de `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    //
    // Nota: Esta configuración será anulada por la variable de entorno TSX_TSCONFIG_PATH y/o el argumento de línea de comandos --tsConfigPath si se especifican.
    // Esta configuración se ignorará si node no puede analizar tu archivo wdio.conf.ts sin la ayuda de tsx, por ejemplo, si tienes alias de ruta
    // configurados en tsconfig.json y usas esos alias de ruta dentro de tu archivo wdio.config.ts.
    // Solo usa esto si estás usando un archivo de configuración .js o tu archivo de configuración .ts es JavaScript válido.
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO proporciona varios hooks que puedes usar para interferir en el proceso de prueba con el fin de mejorarlo
    // y construir servicios a su alrededor. Puedes aplicar una sola función o una matriz de
    // métodos. Si uno de ellos devuelve una promesa, WebdriverIO esperará hasta que esa promesa se
    // resuelva para continuar.
    //
    /**
     * Se ejecuta una vez antes de que se lancen todos los trabajadores.
     * @param {object} config objeto de configuración wdio
     * @param {Array.<Object>} capabilities lista de detalles de capacidades
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * Se ejecuta antes de que se genere un proceso de trabajador y puede usarse para inicializar un servicio específico
     * para ese trabajador, así como para modificar entornos de tiempo de ejecución de forma asíncrona.
     * @param  {string} cid      id de capacidad (p. ej. 0-0)
     * @param  {object} caps     objeto que contiene capacidades para la sesión que se generará en el trabajador
     * @param  {object} specs    especificaciones que se ejecutarán en el proceso del trabajador
     * @param  {object} args     objeto que se fusionará con la configuración principal una vez que se inicialice el trabajador
     * @param  {object} execArgv lista de argumentos de cadena pasados al proceso del trabajador
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * Se ejecuta después de que un proceso de trabajador ha salido.
     * @param  {string} cid      id de capacidad (p. ej. 0-0)
     * @param  {number} exitCode 0 - éxito, 1 - fallo
     * @param  {object} specs    especificaciones que se ejecutarán en el proceso del trabajador
     * @param  {number} retries  número de reintentos utilizados
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * Se ejecuta antes de inicializar la sesión del webdriver y el framework de pruebas. Te permite
     * manipular configuraciones dependiendo de la capacidad o especificación.
     * @param {object} config objeto de configuración wdio
     * @param {Array.<Object>} capabilities lista de detalles de capacidades
     * @param {Array.<String>} specs Lista de rutas de archivos de especificaciones que se ejecutarán
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * Se ejecuta antes de que comience la ejecución de la prueba. En este punto puedes acceder a todas las variables
     * globales como `browser`. Es el lugar perfecto para definir comandos personalizados.
     * @param {Array.<Object>} capabilities lista de detalles de capacidades
     * @param {Array.<String>} specs        Lista de rutas de archivos de especificaciones que se ejecutarán
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
     * Este hook se ejecuta _antes_ de cada hook dentro de la suite.
     * (Por ejemplo, esto se ejecuta antes de llamar a `before`, `beforeEach`, `after`, `afterEach` en Mocha). En Cucumber `context` es el objeto World.
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * Hook que se ejecuta _después_ de cada hook dentro de la suite.
     * (Por ejemplo, esto se ejecuta después de llamar a `before`, `beforeEach`, `after`, `afterEach` en Mocha). En Cucumber `context` es el objeto World.
     */
    afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
    },
    /**
     * Función que se ejecuta antes de una prueba (solo en Mocha/Jasmine)
     * @param {object} test    objeto de prueba
     * @param {object} context objeto de ámbito con el que se ejecutó la prueba
     */
    beforeTest: function (test, context) {
    },
    /**
     * Se ejecuta antes de que se ejecute un comando de WebdriverIO.
     * @param {string} commandName nombre del comando hook
     * @param {Array} args argumentos que recibiría el comando
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * Se ejecuta después de que se ejecuta un comando de WebdriverIO
     * @param {string} commandName nombre del comando hook
     * @param {Array} args argumentos que recibiría el comando
     * @param {*} result resultado del comando
     * @param {Error} error objeto de error, si lo hay
     */
    afterCommand: function (commandName, args, result, error) {
    },
    /**
     * Función que se ejecuta después de una prueba (solo en Mocha/Jasmine)
     * @param {object}  test             objeto de prueba
     * @param {object}  context          objeto de ámbito con el que se ejecutó la prueba
     * @param {Error}   result.error     objeto de error en caso de que la prueba falle, de lo contrario `undefined`
     * @param {*}       result.result    objeto de retorno de la función de prueba
     * @param {number}  result.duration  duración de la prueba
     * @param {boolean} result.passed    verdadero si la prueba ha pasado, falso en caso contrario
     * @param {object}  result.retries   información sobre los reintentos relacionados con la especificación, p. ej. `{ attempts: 0, limit: 0 }`
     */
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
    },
    /**
     * Hook que se ejecuta después de que la suite ha terminado (solo en Mocha/Jasmine).
     * @param {object} suite detalles de la suite
     */
    afterSuite: function (suite) {
    },
    /**
     * Se ejecuta después de que se completan todas las pruebas. Todavía tienes acceso a todas las variables globales
     * de la prueba.
     * @param {number} result 0 - prueba pasada, 1 - prueba fallida
     * @param {Array.<Object>} capabilities lista de detalles de capacidades
     * @param {Array.<String>} specs Lista de rutas de archivos de especificaciones que se ejecutaron
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * Se ejecuta justo después de terminar la sesión de webdriver.
     * @param {object} config objeto de configuración wdio
     * @param {Array.<Object>} capabilities lista de detalles de capacidades
     * @param {Array.<String>} specs Lista de rutas de archivos de especificaciones que se ejecutaron
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * Se ejecuta después de que todos los trabajadores han cerrado y el proceso está a punto de salir.
     * Un error lanzado en el hook `onComplete` resultará en el fallo de la ejecución de la prueba.
     * @param {object} exitCode 0 - éxito, 1 - fallo
     * @param {object} config objeto de configuración wdio
     * @param {Array.<Object>} capabilities lista de detalles de capacidades
     * @param {<Object>} results objeto que contiene los resultados de las pruebas
     */
    onComplete: function (exitCode, config, capabilities, results) {
    },
    /**
    * Se ejecuta cuando ocurre una actualización.
    * @param {string} oldSessionId ID de sesión de la sesión anterior
    * @param {string} newSessionId ID de sesión de la nueva sesión
    */
    onReload: function(oldSessionId, newSessionId) {
    },
    /**
     * Hooks de Cucumber
     *
     * Se ejecuta antes de una Característica de Cucumber.
     * @param {string}                   uri      ruta al archivo de característica
     * @param {GherkinDocument.IFeature} feature  objeto de característica de Cucumber
     */
    beforeFeature: function (uri, feature) {
    },
    /**
     *
     * Se ejecuta antes de un Escenario de Cucumber.
     * @param {ITestCaseHookParameter} world    objeto mundo que contiene información sobre pickle y paso de prueba
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
     * @param {boolean}            result.passed    verdadero si el escenario ha pasado
     * @param {string}             result.error     pila de errores si el escenario falló
     * @param {number}             result.duration  duración del escenario en milisegundos
     * @param {object}             context          objeto World de Cucumber
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * Se ejecuta después de un Escenario de Cucumber.
     * @param {ITestCaseHookParameter} world            objeto mundo que contiene información sobre pickle y paso de prueba
     * @param {object}                 result           objeto de resultados que contiene los resultados del escenario `{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    verdadero si el escenario ha pasado
     * @param {string}                 result.error     pila de errores si el escenario falló
     * @param {number}                 result.duration  duración del escenario en milisegundos
     * @param {object}                 context          objeto World de Cucumber
     */
    afterScenario: function (world, result, context) {
    },
    /**
     *
     * Se ejecuta después de una Característica de Cucumber.
     * @param {string}                   uri      ruta al archivo de característica
     * @param {GherkinDocument.IFeature} feature  objeto de característica de Cucumber
     */
    afterFeature: function (uri, feature) {
    },
    /**
     * Se ejecuta antes de que una biblioteca de aserción de WebdriverIO haga una aserción.
     * @param commandName nombre del comando
     * @param args        argumentos que recibiría el comando
     */
    beforeAssertion: function (params) {
    },
    /**
     * Se ejecuta después de que se ejecuta un comando de WebdriverIO
     * @param commandName  nombre del comando
     * @param args         argumentos que recibiría el comando
     * @param result       resultado del comando
     * @param error        error en caso de que algo saliera mal
     */
    afterAssertion: function (params) {
    }
}
```

También puedes encontrar un archivo con todas las opciones posibles y variaciones en la [carpeta de ejemplos](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js).