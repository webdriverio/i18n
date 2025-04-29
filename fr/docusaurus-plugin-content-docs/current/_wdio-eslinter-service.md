---
id: wdio-eslinter-service
title: Détection automatique des importations manquantes avec le service eslint
custom_edit_url: https://github.com/jamesmortensen/wdio-eslinter-service/edit/main/README.md
---


> wdio-eslinter-service est un package tiers, pour plus d'informations veuillez consulter [GitHub](https://github.com/jamesmortensen/wdio-eslinter-service) | [npm](https://www.npmjs.com/package/wdio-eslinter-service)

Avez-vous déjà lancé vos tests e2e, pour découvrir 10, 15 ou 30 minutes plus tard qu'il y avait une importation manquante/mal orthographiée, qui n'est apparue qu'au milieu de l'exécution du test ? Lorsque cela se produit, le test runner signale ces tests comme défectueux.

eslint est un excellent outil pour détecter différentes erreurs avant l'exécution, et ce service exécute l'outil eslint, avant d'exécuter les tests WebdriverIO, comme une étape automatisée au lieu d'une étape manuelle.

Il est souvent préférable d'échouer plus rapidement afin de pouvoir résoudre les problèmes plus tôt que tard.

La configuration recommandée consiste à utiliser le runner "unresolved" pour vérifier uniquement les importations manquantes, mais si vous le souhaitez, vous pouvez également configurer le service pour exécuter l'eslinter dans votre projet en utilisant le runner npm ou yarn, ou en passant un indicateur qui indique au système d'utiliser également votre configuration .eslintrc.

## Installation

Installez le wdio-eslinter-service :

```
$ npm i wdio-eslinter-service --save-dev 
```


### Démarrage rapide - Vérifier uniquement les importations manquantes ou non résolues

Par défaut, cette configuration minimale, le runner "unresolved", vérifie les importations require non résolues et génère une erreur si des importations non résolues sont trouvées. Le service arrête alors l'exécution. Vous pouvez personnaliser .eslintrc.js pour effectuer davantage de vérifications en utilisant les runners "npm" ou "yarn", si vous le souhaitez. Voir [eslint](https://www.npmjs.com/package/eslint) pour plus de détails.

Si vous n'avez pas de configuration `.eslintrc.js` dans votre projet, wdio-eslinter-service peut être configuré pour utiliser une configuration par défaut qui vérifie simplement les importations manquantes avant d'exécuter les tests. C'est pratique pour que vous découvriez les importations incorrectes plus tôt que tard. Pour configurer cela, ajoutez la configuration eslinter suivante à votre tableau de services (en supposant que vous utilisez déjà le service chromedriver ; sinon, omettez cette partie) :

**wdio.conf.js:**
```
    services: ['chromedriver', [
        'eslinter',
        {
            runnerType: 'unresolved'
        }
    ]],
```

À ce stade, commencez à exécuter les tests, et s'il y a une importation manquante ou incorrecte, WebdriverIO l'enregistrera et mettra immédiatement fin à l'exécution du test :

```
$ npx wdio
```


#### Optionnel - si vous utilisez module-alias

Si vous utilisez le module [module-alias](https://www.npmjs.com/package/module-alias), qui vous permet de configurer des alias pour remplacer les chemins relatifs, vous devrez le transmettre à la configuration eslinter en utilisant le plugin eslint-import-resolver-custom-alias. Voici un exemple :

```
    services: ['chromedriver', [
        'eslinter',
        {
            runnerType: 'unresolved',
            eslintOverride: {
                "settings": {
                    "import/resolver": {
                        "eslint-import-resolver-custom-alias": {
                            "alias": {
                                "@utils": "./utils",
                                "@specs": "./test-sync/specs",
                                "@pageobjects": "./test-sync/pageobjects",
                                "@": "./"
                            }
                        }
                    }
                }
            }
        }
    ]],
```

Installez le plugin dans votre projet :

```
$ npm i eslint-import-resolver-custom-alias
```

Exécutez les tests et vérifiez que le système trouvera les importations incorrectes qui utilisent des alias de modules :

```
$ npx wdio
```

#### Expérimental - Utiliser avec une configuration eslintrc existante dans votre projet

Pour que le service eslinter utilise également une configuration eslintrc existante dans votre projet, définissez `includeProjectEslintrc` sur true dans le tableau de services de configuration wdio.conf.js.

J'ai rencontré des problèmes avec des plugins conflictuels. Si votre configuration eslint de projet recherche également des importations non résolues, cela peut ne pas fonctionner et nécessiter des ajustements à votre .eslintrc.js. Ce n'est pas recommandé pour le moment.


### Alternatives avancées - Utilisation des runners npm et yarn

Les runners npm et yarn vous aident à avoir un contrôle supplémentaire sur l'exécution d'une configuration eslinter existante dans votre projet. Avec cette configuration, vous pouvez définir des commandes supplémentaires à exécuter dans la section run-scripts de votre package.json :

Dans votre `package.json`, ajoutez cette entrée à vos scripts de course :

```json
{
    "scripts": {
        "eslint": "eslint ."
    }
}
```

**REMARQUE : L'ajout d'eslint au package.json est requis pour que le service fonctionne lors de l'utilisation des runners npm ou yarn.**

Si vous n'avez pas encore installé et configuré eslint, vous devrez l'installer et le configurer dans votre projet, ainsi que tous les plugins que vous utilisez, comme eslint-plugin-import :

```
$ npm i eslint eslint-plugin-import
```

Si vous utilisez le plugin eslint-import-resolver-custom-alias pour mapper les alias de modules à leurs chemins réels, vous devrez également l'installer :

```
$ npm i eslint-import-resolver-custom-alias
```

Vous devrez également créer un fichier `.eslintrc.js`, si vous n'avez pas déjà l'un des fichiers de configuration eslintrc dans votre projet. Voici une configuration de base pour simplement rechercher les importations non résolues, et vous pouvez étendre cette configuration pour valider d'autres vérifications de qualité de code avant d'exécuter les tests :

```
// .eslintrc.js
module.exports = {
    "parserOptions": {
        "ecmaVersion": 2022
    },
    "plugins": [
        "import"
    ],
    "rules": {
        "import/no-unresolved": [
            2,
            {
                "commonjs": true,
                "amd": false,
                "caseSensitive": true
            }
        ]
    }
}
```

Enfin, ajoutez le service `eslinter` au tableau de services dans `wdio.conf.js` :

```javascript
    services: ['eslinter']
```

Exécutez `npm run eslint` pour vérifier et rechercher les erreurs.

Si vous utilisez `yarn`, vous pouvez configurer l'option de service `runnerType` :

```javascript
    services: [
        ['eslinter', { runnerType: 'yarn' }]
    ]
```

Si vous avez déjà un script linter que vous souhaitez réutiliser (au lieu de `eslint`), vous pouvez configurer l'option de service `scriptName` :

```javascript
    services: [
        ['eslinter', { scriptName: 'eslint:check' }]
    ]
```

## Utilisation dans WebdriverIO

Démarrez le test runner de WebdriverIO normalement. eslint vérifiera le code. Si des erreurs sont trouvées, l'exécution cesse immédiatement.

```bash
$ npx wdio
```


**Exemple :**

```bash
$ npx wdio --spec ./test/specs/example.e2e.js 

Execution of 1 spec files started at 2021-05-15T12:04:05.388Z

2021-05-15T12:04:05.793Z WARN wdio-eslinter-service: initialize wdio-eslint-service using npm runner.
Deleted files and directories:
 /Users/jem/Dev/wdio-example/allure-results

/Users/jem/Dev/wdio-example/test/specs/login.js
  1:22  error  Unable to resolve path to module '.../pageObjects/Auth.page'  import/no-unresolved

✖ 1 problem (1 error, 0 warnings)

2021-05-15T12:04:08.581Z ERROR wdio-eslinter-service: SEVERE: Code contains eslint errors or eslint not installed.
```