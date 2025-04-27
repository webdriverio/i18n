---
id: configurationfile
title: Fichier de Configuration
---

Le fichier de configuration contient toutes les informations nécessaires pour exécuter votre suite de tests. C'est un module NodeJS qui exporte un JSON.

Voici un exemple de configuration avec toutes les propriétés prises en charge et des informations supplémentaires :

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
    // Adresse hôte du serveur Selenium en cours d'exécution. Cette information est généralement obsolète, car
    // WebdriverIO se connecte automatiquement à localhost. De plus, si vous utilisez l'un des
    // services cloud pris en charge comme Sauce Labs, Browserstack, Testing Bot ou LambdaTest, vous n'avez pas non plus
    // besoin de définir les informations d'hôte et de port (car WebdriverIO peut les déterminer
    // à partir de vos informations d'utilisateur et de clé). Cependant, si vous utilisez un backend Selenium
    // privé, vous devez définir ici `hostname`, `port` et `path`.
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
    // devraient également fonctionner.) Ces services définissent des valeurs spécifiques `user` et `key` (ou clé d'accès)
    // que vous devez indiquer ici, afin de vous connecter à ces services.
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // Si vous exécutez vos tests sur Sauce Labs, vous pouvez spécifier la région dans laquelle vous souhaitez exécuter vos tests
    // via la propriété `region`. Les raccourcis disponibles pour les régions sont `us` (par défaut) et `eu`.
    // Ces régions sont utilisées pour le cloud VM de Sauce Labs et le Sauce Labs Real Device Cloud.
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
    // Définissez quelles spécifications de test doivent être exécutées. Le modèle est relatif au répertoire
    // du fichier de configuration en cours d'exécution.
    //
    // Les spécifications sont définies comme un tableau de fichiers de spécification (utilisant éventuellement des caractères génériques
    // qui seront développés). Le test pour chaque fichier de spécification sera exécuté dans un processus
    // de travail séparé. Pour avoir un groupe de fichiers de spécification exécutés dans le même processus
    // de travail, encadrez-les dans un tableau à l'intérieur du tableau specs.
    //
    // Le chemin des fichiers de spécification sera résolu relativement au répertoire
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
    // Tout d'abord, vous pouvez définir combien d'instances doivent être démarrées en même temps. Disons
    // que vous avez 3 capacités différentes (Chrome, Firefox et Safari) et que vous avez
    // défini `maxInstances` à 1. wdio va générer 3 processus.
    //
    // Par conséquent, si vous avez 10 fichiers de spécification et que vous définissez `maxInstances` à 10, tous les fichiers de spécification
    // seront testés en même temps et 30 processus seront générés.
    //
    // La propriété gère combien de capacités du même test doivent exécuter des tests.
    //
    maxInstances: 10,
    //
    // Ou définissez une limite pour exécuter des tests avec une capacité spécifique.
    maxInstancesPerCapability: 10,
    //
    // Insère les variables globales de WebdriverIO (par exemple `browser`, `$` et `$$`) dans l'environnement global.
    // Si vous définissez sur `false`, vous devez importer depuis `@wdio/globals`. Remarque : WebdriverIO ne
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
        // pour exécuter chrome en mode headless, les flags suivants sont requis
        // (voir https://developers.google.com/web/updates/2017/04/headless-chrome)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // Paramètre pour ignorer certains ou tous les flags par défaut
        // - si la valeur est true : ignore tous les 'flags par défaut' de DevTools et les 'arguments par défaut' de Puppeteer
        // - si la valeur est un tableau : DevTools filtre les arguments par défaut donnés
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // maxInstances peut être écrasé par capacité. Donc si vous avez une grille Selenium
        // interne avec seulement 5 instances firefox disponibles, vous pouvez vous assurer que pas plus de
        // 5 instances ne sont démarrées en même temps.
        'wdio:maxInstances': 5,
        browserName: 'firefox',
        'wdio:specs': [
            'test/ffOnly/*'
        ],
        'moz:firefoxOptions': {
          // flag pour activer le mode headless de Firefox (voir https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities pour plus de détails sur moz:firefoxOptions)
          // args: ['-headless']
        },
        // Si outputDir est fourni, WebdriverIO peut capturer les journaux de session du pilote
        // il est possible de configurer quels logTypes exclure.
        excludeDriverLogs: ['bugreport', 'server'], // passez '*' pour exclure tous les journaux de session du pilote
        //
        // Paramètre pour ignorer certains ou tous les arguments par défaut de Puppeteer
        // ignoreDefaultArgs: ['-foreground'], // définissez la valeur sur true pour ignorer tous les arguments par défaut
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
    // Niveau de verbosité de la journalisation : trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // Définir des niveaux de journalisation spécifiques par logger
    // utilisez le niveau 'silent' pour désactiver le logger
    logLevels: {
        webdriver: 'info',
        '@wdio/appium-service': 'info'
    },
    //
    // Définir le répertoire pour stocker tous les journaux
    outputDir: __dirname,
    //
    // Si vous souhaitez exécuter vos tests uniquement jusqu'à ce qu'un nombre spécifique de tests aient échoué, utilisez
    // bail (la valeur par défaut est 0 - ne pas arrêter, exécuter tous les tests).
    bail: 0,
    //
    // Définissez une URL de base afin de raccourcir les appels de commande `url()`. Si votre paramètre `url` commence
    // par `/`, le `baseUrl` est ajouté, sans inclure la partie chemin de `baseUrl`.
    //
    // Si votre paramètre `url` commence sans schéma ni `/` (comme `some/path`), le `baseUrl`
    // est ajouté directement.
    baseUrl: 'http://localhost:8080',
    //
    // Délai d'attente par défaut pour toutes les commandes waitForXXX.
    waitforTimeout: 1000,
    //
    // Ajouter des fichiers à surveiller (par exemple, code d'application ou objets de page) lors de l'exécution de la commande `wdio`
    // avec le flag `--watch`. La prise en charge des caractères génériques est disponible.
    filesToWatch: [
        // par exemple, relancer les tests si je modifie mon code d'application
        // './app/**/*.js'
    ],
    //
    // Framework avec lequel vous souhaitez exécuter vos spécifications.
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
    // Si les fichiers de spécification réessayés doivent être réessayés immédiatement ou reportés à la fin de la file d'attente
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
    // Voir la liste complète à : http://mochajs.org
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
        backtrace: false,   // <boolean> affiche la trace complète pour les erreurs
        compiler: [],       // <string[]> ("extension:module") requiert des fichiers avec l'EXTENSION donnée après avoir requis MODULE (répétable)
        dryRun: false,      // <boolean> invoque les formateurs sans exécuter les étapes
        failFast: false,    // <boolean> abandonne l'exécution au premier échec
        snippets: true,     // <boolean> masque les extraits de définition d'étape pour les étapes en attente
        source: true,       // <boolean> masque les URI source
        strict: false,      // <boolean> échoue s'il y a des étapes non définies ou en attente
        tagExpression: '',  // <string> (expression) exécute uniquement les fonctionnalités ou scénarios avec des balises correspondant à l'expression
        timeout: 20000,     // <number> délai d'attente pour les définitions d'étape
        ignoreUndefinedDefinitions: false, // <boolean> Activez cette configuration pour traiter les définitions non définies comme des avertissements.
        scenarioLevelReporter: false // Activez ceci pour que webdriver.io se comporte comme si les scénarios et non les étapes étaient les tests.
    },
    // Spécifiez un chemin tsconfig personnalisé - WDIO utilise `tsx` pour compiler les fichiers TypeScript
    // Votre TSConfig est automatiquement détecté à partir du répertoire de travail actuel
    // mais vous pouvez spécifier un chemin personnalisé ici ou en définissant la variable d'environnement TSX_TSCONFIG_PATH
    // Voir la documentation `tsx` : https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO fournit plusieurs hooks que vous pouvez utiliser pour interférer dans le processus de test afin de l'améliorer
    // et de créer