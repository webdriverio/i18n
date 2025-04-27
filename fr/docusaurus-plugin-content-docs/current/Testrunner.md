---
id: testrunner
title: Testrunner
---

WebdriverIO est livré avec son propre testrunner pour vous aider à commencer les tests aussi rapidement que possible. Il est censé faire tout le travail pour vous, permet d'intégrer des services tiers et vous aide à exécuter vos tests aussi efficacement que possible.

Le testrunner de WebdriverIO est regroupé séparément dans le package NPM `@wdio/cli`.

Installez-le comme ceci :

```sh npm2yarn
npm install @wdio/cli
```

Pour voir l'aide de l'interface en ligne de commande, tapez la commande suivante dans votre terminal :

```sh
$ npx wdio --help

wdio <command>

Commands:
  wdio config                           Initialize WebdriverIO and setup configuration in
                                        your current project.
  wdio install <type> <name>            Add a `reporter`, `service`, or `framework` to
                                        your WebdriverIO project
  wdio repl <option> [capabilities]     Run WebDriver session in command line
  wdio run <configPath>                 Run your WDIO configuration file to initialize
                                        your tests.

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

Super ! Maintenant, vous devez définir un fichier de configuration où toutes les informations sur vos tests, capacités et paramètres sont définis. Passez à la section [Fichier de configuration](/docs/configuration) pour voir à quoi ce fichier devrait ressembler.

Avec l'utilitaire de configuration `wdio`, il est super facile de générer votre fichier de configuration. Il suffit d'exécuter :

```sh
$ npx wdio config
```

...et cela lance l'utilitaire d'aide.

Il vous posera des questions et générera un fichier de configuration pour vous en moins d'une minute.

![Utilitaire de configuration WDIO](/img/config-utility.gif)

Une fois que vous avez configuré votre fichier de configuration, vous pouvez démarrer vos tests en exécutant :

```sh
npx wdio run wdio.conf.js
```

Vous pouvez également initialiser votre test sans la commande `run` :

```sh
npx wdio wdio.conf.js
```

C'est tout ! Maintenant, vous pouvez accéder à l'instance selenium via la variable globale `browser`.

## Commandes

### `wdio config`

La commande `config` exécute l'assistant de configuration WebdriverIO. Cet assistant vous posera quelques questions sur votre projet WebdriverIO et créera un fichier `wdio.conf.js` basé sur vos réponses.

Exemple :

```sh
wdio config
```

Options :

```
--help            affiche le menu d'aide de WebdriverIO                      [boolean]
--npm             Installer les packages en utilisant NPM au lieu de yarn    [boolean]
```

### `wdio run`

> C'est la commande par défaut pour exécuter votre configuration.

La commande `run` initialise votre fichier de configuration WebdriverIO et exécute vos tests.

Exemple :

```sh
wdio run ./wdio.conf.js --watch
```

Options :

```
--help                affiche le menu d'aide de WebdriverIO         [boolean]
--version             affiche la version de WebdriverIO             [boolean]
--hostname, -h        adresse hôte du pilote d'automatisation        [string]
--port, -p            port du pilote d'automatisation                [number]
--user, -u            nom d'utilisateur si vous utilisez un service cloud comme backend d'automatisation
                                                                        [string]
--key, -k             clé d'accès correspondant à l'utilisateur      [string]
--watch               surveille les modifications des specs          [boolean]
--logLevel, -l        niveau de verbosité de la journalisation
                            [choices: "trace", "debug", "info", "warn", "error", "silent"]
--bail                arrête le test runner après qu'un nombre spécifique de tests aient
                        échoué                                         [number]
--baseUrl             raccourcit les appels de commande d'URL en définissant une URL de base [string]
--waitforTimeout, -w  délai d'attente pour toutes les commandes waitForXXX [number]
--framework, -f       définit le framework (Mocha, Jasmine ou Cucumber) pour
                        exécuter les specs                             [string]
--reporters, -r       reporters pour afficher les résultats sur stdout  [array]
--suite               remplace l'attribut specs et exécute la suite
                        définie                                         [array]
--spec                exécute un certain fichier spec ou des caractères génériques - remplace les specs transmis
                        depuis stdin                                    [array]
--exclude             exclut le(s) fichier(s) spec d'une exécution - remplace les specs transmis
                        depuis stdin                                    [array]
--repeat              Répète des specs et/ou suites spécifiques N fois  [number]
--mochaOpts           Options Mocha
--jasmineOpts         Options Jasmine
--cucumberOpts        Options Cucumber
```

> Remarque : La compilation automatique peut être facilement contrôlée avec les variables d'environnement `tsx`. Voir aussi la [documentation TypeScript](/docs/typescript).

### `wdio install`
La commande `install` vous permet d'ajouter des reporters et des services à vos projets WebdriverIO via la CLI.

Exemple :

```sh
wdio install service sauce # installe @wdio/sauce-service
wdio install reporter dot # installe @wdio/dot-reporter
wdio install framework mocha # installe @wdio/mocha-framework
```

Si vous souhaitez installer les packages en utilisant `yarn` à la place, vous pouvez passer le drapeau `--yarn` à la commande :

```sh
wdio install service sauce --yarn
```

Vous pouvez également passer un chemin de configuration personnalisé si votre fichier de configuration WDIO ne se trouve pas dans le même dossier sur lequel vous travaillez :

```sh
wdio install service sauce --config="./path/to/wdio.conf.js"
```

#### Liste des services pris en charge

```
sauce
testingbot
firefox-profile
devtools
browserstack
appium
intercept
zafira-listener
reportportal
docker
wiremock
lambdatest
vite
nuxt
```

#### Liste des reporters pris en charge

```
dot
spec
junit
allure
sumologic
concise
reportportal
video
html
json
mochawesome
timeline
```

#### Liste des frameworks pris en charge

```
mocha
jasmine
cucumber
```

### `wdio repl`

La commande repl permet de démarrer une interface de ligne de commande interactive pour exécuter des commandes WebdriverIO. Elle peut être utilisée à des fins de test ou simplement pour démarrer rapidement une session WebdriverIO.

Exécuter des tests dans Chrome local :

```sh
wdio repl chrome
```

ou exécuter des tests sur Sauce Labs :

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

Vous pouvez appliquer les mêmes arguments que dans la [commande run](#wdio-run).