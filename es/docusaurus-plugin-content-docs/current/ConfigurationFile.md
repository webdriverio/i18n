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
    // Configuraciones del Servidor
    // =====================
    // Dirección del host del servidor Selenium en ejecución. Esta información suele ser obsoleta,
    // ya que WebdriverIO se conecta automáticamente a localhost. Además, si estás utilizando uno de los
    // servicios en la nube compatibles como Sauce Labs, Browserstack, Testing Bot o LambdaTest, tampoco
    // necesitas definir la información de host y puerto (porque WebdriverIO puede averiguarlo
    // a partir de tu información de usuario y clave). Sin embargo, si estás utilizando un Selenium
    // backend privado, debes definir `hostname`, `port` y `path` aquí.
    //
    hostname: 'localhost',
    port: 4444,
    path: '/',
    // Protocol: http | https
    // protocol: 'http',
    //
    // =================
    // Proveedores de Servicios
    // =================
    // WebdriverIO soporta Sauce Labs, Browserstack, Testing Bot y LambdaTest. (Otros proveedores en la nube
    // también deberían funcionar.) Estos servicios definen valores específicos de `user` y `key` (o clave de acceso)
    // que debes colocar aquí para conectarte a estos servicios.
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // Si ejecutas tus pruebas en Sauce Labs, puedes especificar la región en la que quieres ejecutar tus pruebas
    // a través de la propiedad `region`. Los identificadores cortos disponibles para las regiones son `us` (predeterminado) y `eu`.
    // Estas regiones se utilizan para la nube VM de Sauce Labs y la Nube de Dispositivos Reales de Sauce Labs.
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
    // Las especificaciones se definen como un array de archivos de especificación (opcionalmente usando comodines
    // que se expandirán). La prueba para cada archivo de especificación se ejecutará en un proceso
    // de trabajo separado. Para tener un grupo de archivos de especificación ejecutándose en el mismo proceso
    // de trabajo, enciérralos en un array dentro del array specs.
    //
    // La ruta de los archivos de especificación se resolverá relativamente desde el directorio
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
    // tiempo. Dependiendo del número de capacidades, WebdriverIO lanza varias sesiones de prueba.
    // Dentro de tus `capabilities`, puedes sobrescribir las opciones `spec` y `exclude`
    // para agrupar especificaciones específicas a una capacidad específica.
    //
    // Primero, puedes definir cuántas instancias deben iniciarse al mismo tiempo. Digamos
    // que tienes 3 capacidades diferentes (Chrome, Firefox y Safari) y has
    // establecido `maxInstances` en 1. wdio generará 3 procesos.
    //
    // Por lo tanto, si tienes 10 archivos de especificación y estableces `maxInstances` en 10, todos los archivos de especificación
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
    // configurador de plataforma de Sauce Labs - una gran herramienta para configurar tus capacidades:
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // para ejecutar chrome headless se requieren las siguientes flags
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
        // maxInstances puede ser sobrescrito por capacidad. Así que si tienes una grid de Selenium
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
        // Si se proporciona outputDir, WebdriverIO puede capturar logs de sesión del controlador
        // es posible configurar qué logTypes excluir.
        excludeDriverLogs: ['*'], // pasa '*' para excluir todos los logs de sesión del controlador
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // Parámetro para ignorar algunos o todos los argumentos predeterminados de Puppeteer
        // ignoreDefaultArgs: ['-foreground'], // establece el valor en true para ignorar todos los argumentos predeterminados
    }],
    //
    // Lista adicional de argumentos de node para usar al iniciar procesos hijo
    execArgv: [],
    //
    // ===================
    // Configuraciones de Prueba
    // ===================
    // Define todas las opciones que son relevantes para la instancia de WebdriverIO aquí
    //
    // Nivel de detalle de registro: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // Establece niveles de registro específicos por logger
    // usa el nivel 'silent' para desactivar el logger
    logLevels: {
        webdriver: 'info',
        '@wdio/appium-service': 'info'
    },
    //
    // Establece el directorio para almacenar todos los logs
    outputDir: __dirname,
    //
    // Si solo quieres ejecutar tus pruebas hasta que una cantidad específica de pruebas hayan fallado, usa
    // bail (el valor predeterminado es 0 - no hacer bail, ejecutar todas las pruebas).
    bail: 0,
    //
    // Establece una URL base para acortar las llamadas al comando `url()`. Si tu parámetro `url` comienza
    // con `/`, se antepone la `baseUrl`, sin incluir la parte de ruta de `baseUrl`.
    //
    // Si tu parámetro `url` comienza sin un esquema o `/` (como `some/path`), la `baseUrl`
    // se antepone directamente.
    baseUrl: 'http://localhost:8080',
    //
    // Tiempo de espera predeterminado para todos los comandos waitForXXX.
    waitforTimeout: 1000,
    //
    // Agrega archivos para observar (por ejemplo, código de aplicación u objetos de página) al ejecutar el comando `wdio`
    // con la flag `--watch`. Se admite el uso de comodines.
    filesToWatch: [
        // por ejemplo, volver a ejecutar pruebas si cambio mi código de aplicación
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
    // Retraso en segundos entre los intentos de reintento del archivo de especificación
    specFileRetriesDelay: 0,
    // Si los archivos de especificación reintentados deben reintentarse inmediatamente o diferirse al final de la cola
    specFileRetriesDeferred: false,
    //
    // Reportero de pruebas para stdout.
    // El único compatible por defecto es 'dot'
    // Ver también: https://webdriver.io/docs/dot-reporter.html , y haz clic en "Reporters" en la columna izquierda
    reporters: [
        'dot',
        ['allure', {
            //
            // Si estás utilizando el reportero "allure", debes definir el directorio donde
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
        // El framework Jasmine permite interceptar cada aserción para registrar el estado de la aplicación
        // o sitio web dependiendo del resultado. Por ejemplo, es muy útil tomar una captura de pantalla cada vez
        // que falla una aserción.
        expectationResultHandler: function(passed, assertion) {
            // hacer algo
        },
        //
        // Utilizar la funcionalidad grep específica de Jasmine
        grep: null,
        invertGrep: null
    },
    //
    // Si estás utilizando Cucumber, debes especificar dónde se encuentran tus definiciones de pasos.
    // Ver también: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (archivo/dir) requiere archivos antes de ejecutar características
        backtrace: false,   // <boolean> muestra backtrace completo para errores
        compiler: [],       // <string[]> ("extensión:módulo") requiere archivos con la EXTENSIÓN dada después de requerir MÓDULO (repetible)
        dryRun: false,      // <boolean> invoca formateadores sin ejecutar pasos
        failFast: false,    // <boolean> aborta la ejecución en el primer fallo
        snippets: true,     // <boolean> oculta fragmentos de definición de pasos para pasos pendientes
        source: true,       // <boolean> oculta URIs de origen
        strict: false,      // <boolean> falla si hay pasos indefinidos o pendientes
        tagExpression: '',  // <string> (expresión) solo ejecuta las características o escenarios con etiquetas que coincidan con la expresión
        timeout: 20000,     // <number> tiempo de espera para definiciones de pasos
        ignoreUndefinedDefinitions: false, // <boolean> Habilita esta configuración para tratar las definiciones indefinidas como advertencias.
        scenarioLevelReporter: false // Habilita esto para hacer que webdriver.io se comporte como si los escenarios y no los pasos fueran las pruebas.
    },
    // Especifica una ruta de tsconfig personalizada - WDIO usa `tsx` para compilar archivos TypeScript
    // Tu TSConfig se detecta automáticamente desde el directorio de trabajo actual
    // pero puedes especificar una ruta personalizada aquí o configurando la variable de entorno TSX_TSCONFIG_PATH
    // Consulta la documentación de `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO proporciona varios hooks que puedes usar para interferir en el proceso de prueba con el fin de mejorarlo
    // y construir servicios a su alrededor. Puedes aplicar una sola función o un array de
    // métodos. Si uno de ellos devuelve una promesa, WebdriverIO esperará hasta que esa promesa se
    // resuelva para continuar.
    //
    /**
     * Se ejecuta una vez antes de que se lancen todos los workers.
     * @param {object} config objeto de configuración wdio
     * @param {Array.<Object>} capabilities lista de detalles de capacidades
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * Se ejecuta antes de que se genere un proceso worker y puede usarse para inicializar servicios específicos
     * para ese worker, así como para modificar entornos de ejecución de