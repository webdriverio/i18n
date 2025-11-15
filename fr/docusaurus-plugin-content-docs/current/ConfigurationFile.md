---
id: configurationfile
title: Fichier de Configuration
---

Le fichier de configuration contient toutes les informations nécessaires pour exécuter votre suite de tests. C'est un module NodeJS qui exporte un JSON.

Voici un exemple de configuration avec toutes les propriétés supportées et des informations supplémentaires :

```js
export const config = {

    // ==================================
    // Où vos tests doivent être lancés
    // ==================================
    //
    runner: 'local',
    //
    // =====================
    // Configurations du serveur
    // =====================
    // Adresse de l'hôte du serveur Selenium en cours d'exécution. Cette information est généralement obsolète, car
    // WebdriverIO se connecte automatiquement à localhost. De même, si vous utilisez l'un des
    // services cloud pris en charge comme Sauce Labs, Browserstack, Testing Bot ou LambdaTest, vous n'avez pas non plus
    // besoin de définir les informations d'hôte et de port (car WebdriverIO peut les déterminer
    // à partir de vos informations d'utilisateur et de clé). Cependant, si vous utilisez un Selenium
    // backend privé, vous devez définir `hostname`, `port` et `path` ici.
    //
    hostname: 'localhost',
    port: 4444,
    path: '/',
    // Protocole: http | https
    // protocol: 'http',
    //
    // =================
    // Fournisseurs de services
    // =================
    // WebdriverIO prend en charge Sauce Labs, Browserstack, Testing Bot et LambdaTest. (D'autres fournisseurs cloud
    // devraient fonctionner aussi.) Ces services définissent des valeurs spécifiques `user` et `key` (ou clé d'accès)
    // que vous devez indiquer ici, afin de vous connecter à ces services.
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // Si vous exécutez vos tests sur Sauce Labs, vous pouvez spécifier la région dans laquelle vous souhaitez exécuter vos tests
    // via la propriété `region`. Les identifiants courts disponibles pour les régions sont `us` (par défaut) et `eu`.
    // Ces régions sont utilisées pour le cloud VM de Sauce Labs et le Cloud d'appareils réels de Sauce Labs.
    // Si vous ne fournissez pas la région, elle est définie par défaut sur `us`.
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
    // Définissez quelles spécifications de test doivent s'exécuter. Le modèle est relatif au répertoire
    // du fichier de configuration en cours d'exécution.
    //
    // Les spécifications sont définies comme un tableau de fichiers de spécification (utilisant éventuellement des caractères génériques
    // qui seront développés). Le test pour chaque fichier de spécification sera exécuté dans un processus
    // de travail séparé. Pour avoir un groupe de fichiers de spécification exécutés dans le même processus
    // de travail, incluez-les dans un tableau au sein du tableau specs.
    //
    // Le chemin des fichiers de spécification sera résolu par rapport au répertoire
    // du fichier de configuration, sauf s'il est absolu.
    //
    specs: [
        'test/spec/**',
        ['group/spec/**']
    ],
    // Modèles à exclure.
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
    // de test. Dans vos `capabilities`, vous pouvez remplacer les options `spec` et `exclude`
    // afin de regrouper des spécifications spécifiques pour une capacité spécifique.
    //
    // Tout d'abord, vous pouvez définir combien d'instances doivent être démarrées en même temps. Supposons
    // que vous ayez 3 capacités différentes (Chrome, Firefox et Safari) et que vous avez
    // défini `maxInstances` à 1. wdio lancera 3 processus.
    //
    // Par conséquent, si vous avez 10 fichiers de spécification et que vous définissez `maxInstances` à 10, tous les fichiers de spécification
    // seront testés en même temps et 30 processus seront lancés.
    //
    // La propriété gère combien de capacités du même test doivent exécuter des tests.
    //
    maxInstances: 10,
    //
    // Ou définissez une limite pour exécuter des tests avec une capacité spécifique.
    maxInstancesPerCapability: 10,
    //
    // Insère les variables globales de WebdriverIO (par ex. `browser`, `$` et `$$`) dans l'environnement global.
    // Si vous définissez sur `false`, vous devriez importer depuis `@wdio/globals`. Remarque : WebdriverIO ne
    // gère pas l'injection de variables globales spécifiques au framework de test.
    //
    injectGlobals: true,
    //
    // Si vous avez du mal à rassembler toutes les capacités importantes, consultez le
    // configurateur de plateforme Sauce Labs - un excellent outil pour configurer vos capacités :
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // pour exécuter chrome en mode headless, les drapeaux suivants sont requis
        // (voir https://developers.google.com/web/updates/2017/04/headless-chrome)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // Paramètre pour ignorer certains ou tous les drapeaux par défaut
        // - si la valeur est true : ignore tous les 'drapeaux par défaut' de DevTools et les 'arguments par défaut' de Puppeteer
        // - si la valeur est un tableau : DevTools filtre les arguments par défaut donnés
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // maxInstances peut être écrasé par capacité. Donc si vous avez une grille Selenium
        // interne avec seulement 5 instances firefox disponibles, vous pouvez vous assurer que pas plus de
        // 5 instances sont démarrées à la fois.
        'wdio:maxInstances': 5,
        browserName: 'firefox',
        'wdio:specs': [
            'test/ffOnly/*'
        ],
        'moz:firefoxOptions': {
          // drapeau pour activer le mode headless de Firefox (voir https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities pour plus de détails sur moz:firefoxOptions)
          // args: ['-headless']
        },
        // Si outputDir est fourni, WebdriverIO peut capturer les journaux de session du pilote
        // il est possible de configurer quels logTypes exclure.
        // excludeDriverLogs: ['*'], // passez '*' pour exclure tous les journaux de session du pilote
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
    // Configurations de test
    // ===================
    // Définissez toutes les options pertinentes pour l'instance WebdriverIO ici
    //
    // Niveau de verbosité des journaux : trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // Définir des niveaux de journal spécifiques par logger
    // utilisez le niveau 'silent' pour désactiver le logger
    logLevels: {
        webdriver: 'info',
        '@wdio/appium-service': 'info'
    },
    //
    // Définir le répertoire pour stocker tous les journaux
    outputDir: __dirname,
    //
    // Si vous ne voulez exécuter vos tests que jusqu'à ce qu'un nombre spécifique de tests échouent, utilisez
    // bail (la valeur par défaut est 0 - pas d'arrêt, exécuter tous les tests).
    bail: 0,
    //
    // Définissez une URL de base afin de raccourcir les appels de commande `url()`. Si votre paramètre `url` commence
    // par `/`, le `baseUrl` est ajouté en préfixe, sans inclure la partie chemin de `baseUrl`.
    //
    // Si votre paramètre `url` commence sans schéma ni `/` (comme `some/path`), le `baseUrl`
    // est ajouté directement en préfixe.
    baseUrl: 'http://localhost:8080',
    //
    // Délai par défaut pour toutes les commandes waitForXXX.
    waitforTimeout: 1000,
    //
    // Ajoutez des fichiers à surveiller (par ex. code d'application ou objets de page) lors de l'exécution de la commande `wdio`
    // avec le drapeau `--watch`. Les caractères génériques sont pris en charge.
    filesToWatch: [
        // par exemple, relancer les tests si je modifie mon code d'application
        // './app/**/*.js'
    ],
    //
    // Framework que vous voulez utiliser pour exécuter vos spécifications.
    // Les suivants sont pris en charge : 'mocha', 'jasmine' et 'cucumber'
    // Voir aussi : https://webdriver.io/docs/frameworks.html
    //
    // Assurez-vous d'avoir installé le package adaptateur wdio pour le framework spécifique avant d'exécuter des tests.
    framework: 'mocha',
    //
    // Le nombre de fois pour réessayer l'ensemble du fichier de spécification lorsqu'il échoue dans son ensemble
    specFileRetries: 1,
    // Délai en secondes entre les tentatives de réessai du fichier de spécification
    specFileRetriesDelay: 0,
    // Si les fichiers de spécification réessayés doivent être réessayés immédiatement ou différés à la fin de la file d'attente
    specFileRetriesDeferred: false,
    //
    // Rapporteur de test pour stdout.
    // Le seul pris en charge par défaut est 'dot'
    // Voir aussi : https://webdriver.io/docs/dot-reporter.html , et cliquez sur "Reporters" dans la colonne de gauche
    reporters: [
        'dot',
        ['allure', {
            //
            // Si vous utilisez le rapporteur "allure", vous devez définir le répertoire où
            // WebdriverIO doit enregistrer tous les rapports allure.
            outputDir: './'
        }]
    ],
    //
    // Options à passer à Mocha.
    // Voir la liste complète sur : http://mochajs.org
    mochaOpts: {
        ui: 'bdd'
    },
    //
    // Options à passer à Jasmine.
    // Voir aussi : https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-jasmine-framework#jasmineopts-options
    jasmineOpts: {
        //
        // Délai d'attente par défaut de Jasmine
        defaultTimeoutInterval: 5000,
        //
        // Le framework Jasmine permet d'intercepter chaque assertion afin de journaliser l'état de l'application
        // ou du site Web en fonction du résultat. Par exemple, il est très pratique de prendre une capture d'écran chaque fois
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
        require: [],        // <string[]> (fichier/répertoire) requiert des fichiers avant d'exécuter les fonctionnalités
        backtrace: false,   // <boolean> affiche la trace d'appel complète pour les erreurs
        compiler: [],       // <string[]> ("extension:module") requiert des fichiers avec l'EXTENSION donnée après avoir requis MODULE (répétable)
        dryRun: false,      // <boolean> invoque les formateurs sans exécuter les étapes
        failFast: false,    // <boolean> abandonne l'exécution à la première défaillance
        snippets: true,     // <boolean> masque les extraits de définition d'étape pour les étapes en attente
        source: true,       // <boolean> masque les URI sources
        strict: false,      // <boolean> échoue s'il y a des étapes non définies ou en attente
        tagExpression: '',  // <string> (expression) exécute uniquement les fonctionnalités ou scénarios avec des balises correspondant à l'expression
        timeout: 20000,     // <number> délai d'attente pour les définitions d'étape
        ignoreUndefinedDefinitions: false, // <boolean> Activez cette configuration pour traiter les définitions non définies comme des avertissements.
        scenarioLevelReporter: false // Activez ceci pour faire en sorte que webdriver.io se comporte comme si les scénarios et non les étapes étaient les tests.
    },
    // Spécifiez un chemin tsconfig personnalisé - WDIO utilise `tsx` pour compiler les fichiers TypeScript
    // Votre TSConfig est automatiquement détecté à partir du répertoire de travail actuel
    // mais vous pouvez spécifier un chemin personnalisé ici ou en définissant la variable d'environnement TSX_TSCONFIG_PATH
    // Consultez la documentation `tsx` : https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    //
    // Remarque: Ce paramètre sera remplacé par la variable d'environnement TSX_TSCONFIG_PATH et/ou l'argument cli --tsConfigPath s'ils sont spécifiés.
    // Ce paramètre sera ignoré si node ne peut pas analyser votre fichier wdio.conf.ts sans l'aide de tsx, par exemple si vous avez
    // des alias de chemin configurés dans tsconfig.json et que vous utilisez ces alias de chemin dans votre fichier wdio.config.ts.
    // Utilisez ceci uniquement si vous utilisez un fichier de configuration .js ou si votre fichier de configuration .ts est du JavaScript valide.
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO fournit plusieurs hooks que vous pouvez utiliser pour interférer dans le processus de test afin de l'améliorer
    // et de construire des services autour de lui. Vous pouvez appliquer une seule fonction ou un tableau de
    // méthodes. Si l'une d'entre elles renvoie une promesse, WebdriverIO attendra que cette promesse soit
    // résolue pour continuer.
    //
    /**
     * S'exécute une fois avant que tous les workers ne soient lancés.
     * @param {object} config objet de configuration wdio
     * @param {Array.<Object>} capabilities liste des détails de capacités
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * S'exécute avant qu'un processus worker ne soit généré et peut être utilisé pour initialiser un service spécifique
     * pour ce worker ainsi que pour modifier les environnements d'exécution de manière asynchrone.
     * @param  {string} cid      id de capacité (par ex. 0-0)
     * @param  {object} caps     objet contenant les capacités pour la session qui sera générée dans le worker
     * @param  {object} specs    spécifications à exécuter dans le processus worker
     * @param  {object} args     objet qui sera fusionné avec la configuration principale une fois que le worker sera initialisé
     * @param  {object} execArgv liste d'arguments de chaîne passés au processus worker
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * S'exécute après qu'un processus worker a quitté.
     * @param  {string} cid      id de capacité (par ex. 0-0)
     * @param  {number} exitCode 0 - succès, 1 - échec
     * @param  {object} specs    spécifications à exécuter dans le processus worker
     * @param  {number} retries  nombre de tentatives utilisées
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * S'exécute avant l'initialisation de la session webdriver et du framework de test. Il vous permet
     * de manipuler les configurations en fonction de la capacité ou de la spécification.
     * @param {object} config objet de configuration wdio
     * @param {Array.<Object>} capabilities liste des détails de capacités
     * @param {Array.<String>} specs Liste des chemins de fichiers de spécification à exécuter
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * S'exécute avant le début de l'exécution du test. À ce stade, vous pouvez accéder à toutes les variables
     * globales comme `browser`. C'est l'endroit idéal pour définir des commandes personnalisées.
     * @param {Array.<Object>} capabilities liste des détails de capacités
     * @param {Array.<String>} specs        Liste des chemins de fichiers de spécification à exécuter
     * @param {object}         browser      instance de la session navigateur/appareil créée
     */
    before: function (capabilities, specs, browser) {
    },
    /**
     * S'exécute avant le démarrage de la suite (uniquement dans Mocha/Jasmine).
     * @param {object} suite détails de la suite
     */
    beforeSuite: function (suite) {
    },
    /**
     * Ce hook s'exécute _avant_ chaque hook dans la suite.
     * (Par exemple, cela s'exécute avant d'appeler `before`, `beforeEach`, `after`, `afterEach` dans Mocha.). Dans Cucumber, `context` est l'objet World.
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * Hook qui s'exécute _après_ chaque hook dans la suite.
     * (Par exemple, cela s'exécute après avoir appelé `before`, `beforeEach`, `after`, `afterEach` dans Mocha.). Dans Cucumber, `context` est l'objet World.
     */
    afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
    },
    /**
     * Fonction à exécuter avant un test (uniquement dans Mocha/Jasmine)
     * @param {object} test    objet de test
     * @param {object} context objet de portée avec lequel le test a été exécuté
     */
    beforeTest: function (test, context) {
    },
    /**
     * S'exécute avant l'exécution d'une commande WebdriverIO.
     * @param {string} commandName nom de la commande hook
     * @param {Array} args arguments que la commande recevrait
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * S'exécute après l'exécution d'une commande WebdriverIO
     * @param {string} commandName nom de la commande hook
     * @param {Array} args arguments que la commande recevrait
     * @param {*} result résultat de la commande
     * @param {Error} error objet d'erreur, le cas échéant
     */
    afterCommand: function (commandName, args, result, error) {
    },
    /**
     * Fonction à exécuter après un test (uniquement dans Mocha/Jasmine)
     * @param {object}  test             objet de test
     * @param {object}  context          objet de portée avec lequel le test a été exécuté
     * @param {Error}   result.error     objet d'erreur en cas d'échec du test, sinon `undefined`
     * @param {*}       result.result    objet de retour de la fonction de test
     * @param {number}  result.duration  durée du test
     * @param {boolean} result.passed    true si le test a réussi, sinon false
     * @param {object}  result.retries   informations sur les tentatives liées à la spécification, par ex. `{ attempts: 0, limit: 0 }`
     */
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
    },
    /**
     * Hook qui s'exécute après la fin de la suite (uniquement dans Mocha/Jasmine).
     * @param {object} suite détails de la suite
     */
    afterSuite: function (suite) {
    },
    /**
     * S'exécute après que tous les tests soient terminés. Vous avez toujours accès à toutes les variables globales du
     * test.
     * @param {number} result 0 - test réussi, 1 - test échoué
     * @param {Array.<Object>} capabilities liste des détails de capacités
     * @param {Array.<String>} specs Liste des chemins de fichiers de spécification qui ont été exécutés
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * S'exécute juste après avoir terminé la session webdriver.
     * @param {object} config objet de configuration wdio
     * @param {Array.<Object>} capabilities liste des détails de capacités
     * @param {Array.<String>} specs Liste des chemins de fichiers de spécification qui ont été exécutés
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * S'exécute après que tous les workers se sont arrêtés et que le processus est sur le point de se terminer.
     * Une erreur levée dans le hook `onComplete` entraînera l'échec de l'exécution du test.
     * @param {object} exitCode 0 - succès, 1 - échec
     * @param {object} config objet de configuration wdio
     * @param {Array.<Object>} capabilities liste des détails de capacités
     * @param {<Object>} results objet contenant les résultats des tests
     */
    onComplete: function (exitCode, config, capabilities, results) {
    },
    /**
    * S'exécute lors d'un rafraîchissement.
    * @param {string} oldSessionId ID de session de l'ancienne session
    * @param {string} newSessionId ID de session de la nouvelle session
    */
    onReload: function(oldSessionId, newSessionId) {
    },
    /**
     * Hooks Cucumber
     *
     * S'exécute avant une fonctionnalité Cucumber.
     * @param {string}                   uri      chemin vers le fichier de fonctionnalité
     * @param {GherkinDocument.IFeature} feature  objet de fonctionnalité Cucumber
     */
    beforeFeature: function (uri, feature) {
    },
    /**
     *
     * S'exécute avant un scénario Cucumber.
     * @param {ITestCaseHookParameter} world    objet world contenant des informations sur le pickle et l'étape de test
     * @param {object}                 context  objet World de Cucumber
     */
    beforeScenario: function (world, context) {
    },
    /**
     *
     * S'exécute avant une étape Cucumber.
     * @param {Pickle.IPickleStep} step     données de l'étape
     * @param {IPickle}            scenario pickle du scénario
     * @param {object}             context  objet World de Cucumber
     */
    beforeStep: function (step, scenario, context) {
    },
    /**
     *
     * S'exécute après une étape Cucumber.
     * @param {Pickle.IPickleStep} step             données de l'étape
     * @param {IPickle}            scenario         pickle du scénario
     * @param {object}             result           objet de résultats contenant les résultats du scénario
     * @param {boolean}            result.passed    true si le scénario a réussi
     * @param {string}             result.error     pile d'erreurs si le scénario a échoué
     * @param {number}             result.duration  durée du scénario en millisecondes
     * @param {object}             context          objet World de Cucumber
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * S'exécute après un scénario Cucumber.
     * @param {ITestCaseHookParameter} world            objet world contenant des informations sur le pickle et l'étape de test
     * @param {object}                 result           objet de résultats contenant les résultats du scénario `{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    true si le scénario a réussi
     * @param {string}                 result.error     pile d'erreurs si le scénario a échoué
     * @param {number}                 result.duration  durée du scénario en millisecondes
     * @param {object}                 context          objet World de Cucumber
     */
    afterScenario: function (world, result, context) {
    },
    /**
     *
     * S'exécute après une fonctionnalité Cucumber.
     * @param {string}                   uri      chemin vers le fichier de fonctionnalité
     * @param {GherkinDocument.IFeature} feature  objet de fonctionnalité Cucumber
     */
    afterFeature: function (uri, feature) {
    },
    /**
     * S'exécute avant qu'une bibliothèque d'assertion WebdriverIO ne fasse une assertion.
     * @param commandName nom de la commande
     * @param args        arguments que la commande recevrait
     */
    beforeAssertion: function (params) {
    },
    /**
     * S'exécute après l'exécution d'une commande WebdriverIO
     * @param commandName  nom de la commande
     * @param args         arguments que la commande recevrait
     * @param result       résultat de la commande
     * @param error        erreur en cas de problème
     */
    afterAssertion: function (params) {
    }
}
```

Vous pouvez également trouver un fichier avec toutes les options et variations possibles dans le [dossier d'exemples](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js).