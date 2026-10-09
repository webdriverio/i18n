---
id: configurationfile
title: Fichier de configuration
description: "Parcourez un exemple annoté de wdio.conf.js qui répertorie chaque option du testrunner, capacité et hook pris en charge, avec des explications."
---

Le fichier de configuration contient toutes les informations nécessaires pour exécuter votre suite de tests. Il s'agit d'un module NodeJS qui exporte un JSON.

Voici un exemple de configuration avec toutes les propriétés prises en charge et des informations supplémentaires :

```js
export const config = {

    // ==================================
    // Où votre test doit-il être lancé
    // ==================================
    //
    runner: 'local',
    //
    // =====================
    // Configurations du serveur
    // =====================
    // Adresse de l'hôte du serveur Selenium en cours d'exécution. Cette information est généralement inutile, car
    // WebdriverIO se connecte automatiquement à localhost. De plus, si vous utilisez l'un des
    // services cloud pris en charge comme Sauce Labs, Browserstack, Testing Bot ou TestMu AI (anciennement LambdaTest), vous n'avez pas
    // non plus besoin de définir les informations d'hôte et de port (car WebdriverIO peut les déduire
    // de vos informations d'utilisateur et de clé). Cependant, si vous utilisez un backend Selenium
    // privé, vous devez définir ici le `hostname`, le `port` et le `path`.
    //
    hostname: 'localhost',
    port: 4444,
    path: '/',
    // Protocole : http | https
    // protocol: 'http',
    //
    // =================
    // Fournisseurs de services
    // =================
    // WebdriverIO prend en charge Sauce Labs, Browserstack, Testing Bot et TestMu AI (anciennement LambdaTest). (D'autres fournisseurs cloud
    // devraient également fonctionner.) Ces services définissent des valeurs spécifiques de `user` et `key` (ou clé d'accès)
    // que vous devez indiquer ici afin de vous connecter à ces services.
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // Si vous exécutez vos tests sur Sauce Labs, vous pouvez spécifier la région dans laquelle vous souhaitez exécuter vos tests
    // via la propriété `region`. Les abréviations disponibles pour les régions sont `us` (par défaut) et `eu`.
    // Ces régions sont utilisées pour le cloud de VM Sauce Labs et le Real Device Cloud de Sauce Labs.
    // Si vous ne fournissez pas de région, la valeur par défaut est `us`.
    region: 'us',
    //
    // Sauce Labs propose une [offre headless](https://saucelabs.com/products/web-testing/sauce-headless-testing)
    // qui vous permet d'exécuter des tests Chrome et Firefox en mode headless.
    //
    headless: false,
    //
    // ==================
    // Spécifier les fichiers de test
    // ==================
    // Définissez quelles specs de test doivent s'exécuter. Le motif est relatif au répertoire
    // du fichier de configuration en cours d'exécution.
    //
    // Les specs sont définies sous forme de tableau de fichiers spec (utilisant éventuellement des caractères génériques
    // qui seront développés). Le test de chaque fichier spec sera exécuté dans un processus
    // worker distinct. Pour qu'un groupe de fichiers spec s'exécute dans le même processus
    // worker, placez-les dans un tableau à l'intérieur du tableau specs.
    //
    // Le chemin des fichiers spec sera résolu relativement au répertoire
    // du fichier de configuration, sauf s'il est absolu.
    //
    specs: [
        'test/spec/**',
        ['group/spec/**']
    ],
    // Motifs à exclure.
    exclude: [
        'test/spec/multibrowser/**',
        'test/spec/mobile/**'
    ],
    //
    // ============
    // Capacités
    // ============
    // Définissez vos capacités ici. WebdriverIO peut exécuter plusieurs capacités en même
    // temps. Selon le nombre de capacités, WebdriverIO lance plusieurs sessions
    // de test. Dans vos `capabilities`, vous pouvez redéfinir quels fichiers s'exécutent avec
    // `wdio:specs` et `wdio:exclude` afin de regrouper des specs spécifiques pour une capacité spécifique.
    //
    // Tout d'abord, vous pouvez définir combien d'instances doivent être démarrées en même temps. Supposons
    // que vous ayez 3 capacités différentes (Chrome, Firefox et Safari) et que vous ayez
    // défini `maxInstances` à 1. wdio lancera 3 processus.
    //
    // Par conséquent, si vous avez 10 fichiers spec et que vous définissez `maxInstances` à 10, tous les fichiers spec
    // seront testés en même temps et 30 processus seront lancés.
    //
    // Cette propriété détermine combien de capacités d'un même test doivent exécuter des tests.
    //
    maxInstances: 10,
    //
    // Ou définissez une limite pour exécuter des tests avec une capacité spécifique.
    maxInstancesPerCapability: 10,
    //
    // Insère les globales de WebdriverIO (par ex. `browser`, `$` et `$$`) dans l'environnement global.
    // Si vous le définissez à `false`, vous devez les importer depuis `@wdio/globals`. Remarque : WebdriverIO ne
    // gère pas l'injection des globales spécifiques au framework de test.
    //
    injectGlobals: true,
    //
    // Si vous avez du mal à rassembler toutes les capacités importantes, consultez le
    // configurateur de plateforme de Sauce Labs - un excellent outil pour configurer vos capacités :
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // pour exécuter Chrome en mode headless, les options suivantes sont requises
        // (voir https://developers.google.com/web/updates/2017/04/headless-chrome)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // Paramètre pour ignorer certaines ou toutes les options par défaut
        // - si la valeur est true : ignore toutes les 'options par défaut' de DevTools et les 'arguments par défaut' de Puppeteer
        // - si la valeur est un tableau : DevTools filtre les arguments par défaut donnés
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // maxInstances peut être redéfini par capacité. Ainsi, si vous disposez d'une grille Selenium
        // interne avec seulement 5 instances Firefox disponibles, vous pouvez vous assurer que pas plus de
        // 5 instances ne sont démarrées à la fois.
        'wdio:maxInstances': 5,
        browserName: 'firefox',
        'wdio:specs': [
            'test/ffOnly/*'
        ],
        'moz:firefoxOptions': {
          // option pour activer le mode headless de Firefox (voir https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities pour plus de détails sur moz:firefoxOptions)
          // args: ['-headless']
        },
        // Si outputDir est fourni, WebdriverIO peut capturer les logs de session du driver
        // il est possible de configurer quels logTypes exclure.
        // excludeDriverLogs: ['*'], // passez '*' pour exclure tous les logs de session du driver
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // Paramètre pour ignorer certains ou tous les arguments par défaut de Puppeteer
        // ignoreDefaultArgs: ['-foreground'], // définissez la valeur à true pour ignorer tous les arguments par défaut
    }],
    //
    // Liste supplémentaire d'arguments node à utiliser lors du démarrage des processus enfants
    execArgv: [],
    //
    // ===================
    // Configurations des tests
    // ===================
    // Définissez ici toutes les options pertinentes pour l'instance WebdriverIO
    //
    // Niveau de verbosité des logs : trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // Définir des niveaux de log spécifiques par logger
    // utilisez le niveau 'silent' pour désactiver un logger
    logLevels: {
        webdriver: 'info',
        '@wdio/appium-service': 'info'
    },
    //
    // Définir le répertoire dans lequel stocker tous les logs
    outputDir: __dirname,
    //
    // Si vous souhaitez exécuter vos tests seulement jusqu'à ce qu'un certain nombre de tests aient échoué, utilisez
    // bail (la valeur par défaut est 0 - ne pas interrompre, exécuter tous les tests).
    bail: 0,
    //
    // Définissez une URL de base afin de raccourcir les appels à la commande `url()`. Si votre paramètre `url` commence
    // par `/`, le `baseUrl` est ajouté au début, sans inclure la partie chemin de `baseUrl`.
    //
    // Si votre paramètre `url` ne commence ni par un schéma ni par `/` (comme `some/path`), le `baseUrl`
    // est ajouté directement au début.
    baseUrl: 'http://localhost:8080',
    //
    // Délai d'attente par défaut pour toutes les commandes waitForXXX.
    waitforTimeout: 1000,
    //
    // Ajoutez des fichiers à surveiller (par ex. le code de l'application ou les page objects) lors de l'exécution de la commande `wdio`
    // avec l'option `--watch`. Les motifs glob sont pris en charge.
    filesToWatch: [
        // par ex. relancer les tests si je modifie le code de mon application
        // './app/**/*.js'
    ],
    //
    // Framework avec lequel vous souhaitez exécuter vos specs.
    // Les suivants sont pris en charge : 'mocha', 'jasmine' et 'cucumber'
    // Voir aussi : https://webdriver.io/docs/frameworks.html
    //
    // Assurez-vous d'avoir installé le paquet adaptateur wdio pour le framework spécifique avant d'exécuter des tests.
    framework: 'mocha',
    //
    // Le nombre de fois où réessayer l'ensemble du fichier spec lorsqu'il échoue dans sa globalité
    specFileRetries: 1,
    // Délai en secondes entre les tentatives de réexécution du fichier spec
    specFileRetriesDelay: 0,
    // Indique si les fichiers spec réessayés doivent être relancés immédiatement ou reportés à la fin de la file d'attente
    specFileRetriesDeferred: false,
    //
    // Reporter de test pour stdout.
    // Le seul pris en charge par défaut est 'dot'
    // Voir aussi : https://webdriver.io/docs/dot-reporter.html , et cliquez sur "Reporters" dans la colonne de gauche
    reporters: [
        'dot',
        ['allure', {
            //
            // Si vous utilisez le reporter "allure", vous devez définir le répertoire dans lequel
            // WebdriverIO doit enregistrer tous les rapports allure.
            outputDir: './'
        }]
    ],
    //
    // Options à transmettre à Mocha.
    // Voir la liste complète sur : http://mochajs.org
    mochaOpts: {
        ui: 'bdd'
    },
    //
    // Options à transmettre à Jasmine.
    // Voir aussi : https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-jasmine-framework#jasmineopts-options
    jasmineOpts: {
        //
        // Délai d'attente par défaut de Jasmine
        defaultTimeoutInterval: 5000,
        //
        // Le framework Jasmine permet d'intercepter chaque assertion afin de journaliser l'état de l'application
        // ou du site web en fonction du résultat. Par exemple, il est très pratique de prendre une capture d'écran chaque fois
        // qu'une assertion échoue.
        expectationResultHandler: function(passed, assertion) {
            // faire quelque chose
        },
        //
        // Utiliser la fonctionnalité grep spécifique à Jasmine
        grep: null,
        invertGrep: null
    },
    //
    // Si vous utilisez Cucumber, vous devez spécifier où se trouvent vos définitions d'étapes.
    // Voir aussi : https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (fichier/répertoire) charger les fichiers avant d'exécuter les features
        backtrace: false,   // <boolean> afficher la trace complète des erreurs
        compiler: [],       // <string[]> ("extension:module") charger les fichiers avec l'EXTENSION donnée après avoir chargé le MODULE (répétable)
        dryRun: false,      // <boolean> invoquer les formateurs sans exécuter les étapes
        failFast: false,    // <boolean> interrompre l'exécution au premier échec
        snippets: true,     // <boolean> masquer les extraits de définition d'étapes pour les étapes en attente
        source: true,       // <boolean> masquer les URI des sources
        strict: false,      // <boolean> échouer s'il existe des étapes non définies ou en attente
        tags: '',           // <string> (expression) n'exécuter que les features ou scénarios dont les tags correspondent à l'expression
        timeout: 20000,     // <number> délai d'attente pour les définitions d'étapes
        ignoreUndefinedDefinitions: false, // <boolean> Activez cette configuration pour traiter les définitions non définies comme des avertissements.
        scenarioLevelReporter: false // Activez ceci pour que webdriver.io se comporte comme si les tests étaient les scénarios et non les étapes.
    },
    // Spécifiez un chemin tsconfig personnalisé - WDIO utilise `tsx` pour compiler les fichiers TypeScript
    // Votre TSConfig est automatiquement détecté depuis le répertoire de travail courant
    // mais vous pouvez spécifier un chemin personnalisé ici ou en définissant la variable d'environnement TSX_TSCONFIG_PATH
    // Voir la documentation de `tsx` : https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    //
    // Remarque : ce paramètre sera remplacé par la variable d'environnement TSX_TSCONFIG_PATH et/ou l'argument cli --tsConfigPath s'ils sont spécifiés.
    // Ce paramètre sera ignoré si node ne parvient pas à analyser votre fichier wdio.conf.ts sans l'aide de tsx, par ex. si vous avez des alias
    // de chemin configurés dans tsconfig.json et que vous utilisez ces alias de chemin dans votre fichier wdio.config.ts.
    // N'utilisez ceci que si vous utilisez un fichier de configuration .js ou si votre fichier de configuration .ts est du JavaScript valide.
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO fournit plusieurs hooks que vous pouvez utiliser pour intervenir dans le processus de test afin de l'améliorer
    // et de construire des services autour de celui-ci. Vous pouvez y appliquer une seule fonction ou un tableau de
    // méthodes. Si l'une d'elles renvoie une promesse, WebdriverIO attendra que cette promesse soit
    // résolue pour continuer.
    //
    /**
     * Exécuté une seule fois avant le lancement de tous les workers.
     * @param {object} config objet de configuration wdio
     * @param {Array.<Object>} capabilities liste des détails des capacités
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * Exécuté avant qu'un processus worker ne soit lancé et peut être utilisé pour initialiser un service spécifique
     * pour ce worker ainsi que pour modifier les environnements d'exécution de manière asynchrone.
     * @param  {string} cid      identifiant de la capacité (par ex. 0-0)
     * @param  {object} caps     objet contenant les capacités de la session qui sera lancée dans le worker
     * @param  {object} specs    specs à exécuter dans le processus worker
     * @param  {object} args     objet qui sera fusionné avec la configuration principale une fois le worker initialisé
     * @param  {object} execArgv liste d'arguments sous forme de chaînes transmis au processus worker
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * Exécuté après la fin d'un processus worker.
     * @param  {string} cid      identifiant de la capacité (par ex. 0-0)
     * @param  {number} exitCode 0 - succès, 1 - échec
     * @param  {object} specs    specs à exécuter dans le processus worker
     * @param  {number} retries  nombre de tentatives utilisées
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * Exécuté avant l'initialisation de la session webdriver et du framework de test. Il vous permet
     * de manipuler les configurations en fonction de la capacité ou de la spec.
     * @param {object} config objet de configuration wdio
     * @param {Array.<Object>} capabilities liste des détails des capacités
     * @param {Array.<String>} specs Liste des chemins des fichiers spec à exécuter
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * Exécuté avant le début de l'exécution des tests. À ce stade, vous pouvez accéder à toutes les variables
     * globales comme `browser`. C'est l'endroit idéal pour définir des commandes personnalisées.
     * @param {Array.<Object>} capabilities liste des détails des capacités
     * @param {Array.<String>} specs        Liste des chemins des fichiers spec à exécuter
     * @param {object}         browser      instance de la session navigateur/appareil créée
     */
    before: function (capabilities, specs, browser) {
    },
    /**
     * Exécuté avant le démarrage de la suite (dans Mocha/Jasmine uniquement).
     * @param {object} suite détails de la suite
     */
    beforeSuite: function (suite) {
    },
    /**
     * Ce hook est exécuté _avant_ le démarrage de chaque hook de la suite.
     * (Par exemple, il s'exécute avant l'appel de `before`, `beforeEach`, `after`, `afterEach` dans Mocha.). Dans Cucumber, `context` est l'objet World.
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * Hook exécuté _après_ la fin de chaque hook de la suite.
     * (Par exemple, il s'exécute après l'appel de `before`, `beforeEach`, `after`, `afterEach` dans Mocha.). Dans Cucumber, `context` est l'objet World.
     */
    afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
    },
    /**
     * Fonction à exécuter avant un test (dans Mocha/Jasmine uniquement)
     * @param {object} test    objet test
     * @param {object} context objet de portée avec lequel le test a été exécuté
     */
    beforeTest: function (test, context) {
    },
    /**
     * S'exécute avant l'exécution d'une commande WebdriverIO.
     * @param {string} commandName nom de la commande du hook
     * @param {Array} args arguments que la commande recevrait
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * S'exécute après l'exécution d'une commande WebdriverIO
     * @param {string} commandName nom de la commande du hook
     * @param {Array} args arguments que la commande recevrait
     * @param {*} result résultat de la commande
     * @param {Error} error objet d'erreur, le cas échéant
     */
    afterCommand: function (commandName, args, result, error) {
    },
    /**
     * Fonction à exécuter après un test (dans Mocha/Jasmine uniquement)
     * @param {object}  test             objet test
     * @param {object}  context          objet de portée avec lequel le test a été exécuté
     * @param {Error}   result.error     objet d'erreur si le test échoue, sinon `undefined`
     * @param {*}       result.result    objet renvoyé par la fonction de test
     * @param {number}  result.duration  durée du test
     * @param {boolean} result.passed    true si le test a réussi, sinon false
     * @param {object}  result.retries   informations sur les nouvelles tentatives liées à la spec, par ex. `{ attempts: 0, limit: 0 }`
     */
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
    },
    /**
     * Hook exécuté après la fin de la suite (dans Mocha/Jasmine uniquement).
     * @param {object} suite détails de la suite
     */
    afterSuite: function (suite) {
    },
    /**
     * Exécuté une fois tous les tests terminés. Vous avez toujours accès à toutes les variables globales
     * du test.
     * @param {number} result 0 - test réussi, 1 - test échoué
     * @param {Array.<Object>} capabilities liste des détails des capacités
     * @param {Array.<String>} specs Liste des chemins des fichiers spec exécutés
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * Exécuté juste après la fermeture de la session webdriver.
     * @param {object} config objet de configuration wdio
     * @param {Array.<Object>} capabilities liste des détails des capacités
     * @param {Array.<String>} specs Liste des chemins des fichiers spec exécutés
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * Exécuté après l'arrêt de tous les workers, lorsque le processus est sur le point de se terminer.
     * Une erreur levée dans le hook `onComplete` entraînera l'échec de l'exécution des tests.
     * @param {object} exitCode 0 - succès, 1 - échec
     * @param {object} config objet de configuration wdio
     * @param {Array.<Object>} capabilities liste des détails des capacités
     * @param {<Object>} results objet contenant les résultats des tests
     */
    onComplete: function (exitCode, config, capabilities, results) {
    },
    /**
    * Exécuté lorsqu'un rafraîchissement a lieu.
    * @param {string} oldSessionId identifiant de session de l'ancienne session
    * @param {string} newSessionId identifiant de session de la nouvelle session
    */
    onReload: function(oldSessionId, newSessionId) {
    },
    /**
     * Hooks Cucumber
     *
     * S'exécute avant une Feature Cucumber.
     * @param {string}                   uri      chemin vers le fichier feature
     * @param {GherkinDocument.IFeature} feature  objet feature Cucumber
     */
    beforeFeature: function (uri, feature) {
    },
    /**
     *
     * S'exécute avant un Scénario Cucumber.
     * @param {ITestCaseHookParameter} world    objet world contenant des informations sur le pickle et l'étape de test
     * @param {object}                 context  objet World de Cucumber
     */
    beforeScenario: function (world, context) {
    },
    /**
     *
     * S'exécute avant une Étape Cucumber.
     * @param {Pickle.IPickleStep} step     données de l'étape
     * @param {IPickle}            scenario pickle du scénario
     * @param {object}             context  objet World de Cucumber
     */
    beforeStep: function (step, scenario, context) {
    },
    /**
     *
     * S'exécute après une Étape Cucumber.
     * @param {Pickle.IPickleStep} step             données de l'étape
     * @param {IPickle}            scenario         pickle du scénario
     * @param {object}             result           objet de résultats contenant les résultats du scénario
     * @param {boolean}            result.passed    true si le scénario a réussi
     * @param {string}             result.error     pile d'erreur si le scénario a échoué
     * @param {number}             result.duration  durée du scénario en millisecondes
     * @param {object}             context          objet World de Cucumber
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * S'exécute après un Scénario Cucumber.
     * @param {ITestCaseHookParameter} world            objet world contenant des informations sur le pickle et l'étape de test
     * @param {object}                 result           objet de résultats contenant les résultats du scénario `{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    true si le scénario a réussi
     * @param {string}                 result.error     pile d'erreur si le scénario a échoué
     * @param {number}                 result.duration  durée du scénario en millisecondes
     * @param {object}                 context          objet World de Cucumber
     */
    afterScenario: function (world, result, context) {
    },
    /**
     *
     * S'exécute après une Feature Cucumber.
     * @param {string}                   uri      chemin vers le fichier feature
     * @param {GherkinDocument.IFeature} feature  objet feature Cucumber
     */
    afterFeature: function (uri, feature) {
    },
    /**
     * S'exécute avant qu'une bibliothèque d'assertions WebdriverIO n'effectue une assertion.
     * @param {object} params                 informations sur l'assertion
     * @param {string} params.matcherName     nom du matcher appelé par le test (pour un alias, le nom de l'alias)
     * @param {*}      params.expectedValue   valeur transmise au matcher
     * @param {object} params.options         options de l'assertion
     */
    beforeAssertion: function (params) {
    },
    /**
     * S'exécute après qu'une bibliothèque d'assertions WebdriverIO a effectué une assertion.
     * @param {object} params                 informations sur l'assertion, identiques à celles de `beforeAssertion`
     * @param {object} params.result          résultat du matcher, avec `pass` (booléen) et `message()`.
     *                                        `pass` vaut true lorsque la valeur correspond, y compris avec `.not`
     */
    afterAssertion: function (params) {
    }
}
```

Vous pouvez également trouver un fichier contenant toutes les options et variantes possibles dans le [dossier d'exemples](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js).