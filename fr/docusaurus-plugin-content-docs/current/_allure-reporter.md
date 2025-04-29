---
id: allure-reporter
title: Rapporteur Allure
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-allure-reporter/README.md
---


> Un plugin de rapporteur WebdriverIO pour créer des [Rapports de Test Allure](https://allurereport.org/docs/webdriverio/).

![Exemple de Rapporteur Allure](/img/allure.png)

## Installation

La façon la plus simple est d'inclure `@wdio/allure-reporter` comme devDependency dans votre `package.json`.

```json
{
  "devDependencies": {
    "@wdio/allure-reporter": "^7.0.0"
  }
}
```

Vous pouvez simplement le faire par :

```sh
npm install @wdio/allure-reporter --save-dev
```

## Configuration

Configurez le répertoire de sortie dans votre fichier wdio.conf.js :

```js
export const config = {
    // ...
    reporters: [['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
    }]],
    // ...
}
```
- `outputDir` est par défaut `./allure-results`. Après l'exécution d'un test, vous trouverez ce répertoire rempli d'un fichier `.xml` pour chaque spécification, ainsi que plusieurs fichiers `.txt` et `.png` et d'autres pièces jointes.
- `disableWebdriverStepsReporting` - paramètre optionnel (`false` par défaut), afin de n'enregistrer que les étapes personnalisées dans le rapporteur.
- `issueLinkTemplate` - paramètre optionnel, afin de spécifier le modèle de lien d'issue. Le rapporteur remplacera le caractère de remplacement `{}` par la valeur spécifiée dans le paramètre d'appel `addIssue(value)`. La même logique est appliquée si Cucumber est utilisé et que le tag `issue` est défini à n'importe quel niveau, il sera converti en lien dans le rapport. Exemple de valeur du paramètre :
  ```
  https://example.org/issue/{}
  ```
- `tmsLinkTemplate` - paramètre optionnel, afin de spécifier le modèle de lien TMS (Test Management System). Le rapporteur remplacera le caractère de remplacement `{}` par la valeur spécifiée dans le paramètre d'appel `addTestId(value)`. La même logique est appliquée si Cucumber est utilisé et que le tag `testId` est défini à n'importe quel niveau, il sera converti en lien dans le rapport. Exemple de valeur du paramètre :
  ```
  https://example.org/tms/{}
  ```
- `disableWebdriverScreenshotsReporting` - paramètre optionnel (`false` par défaut), afin de ne pas joindre les captures d'écran au rapporteur.
- `useCucumberStepReporter` - paramètre optionnel (`false` par défaut), définissez-le sur true pour modifier la hiérarchie des rapports lors de l'utilisation de cucumber. Essayez-le vous-même pour voir comment cela se présente.
- `disableMochaHooks` - paramètre optionnel (`false` par défaut), définissez-le sur true pour ne pas récupérer les hooks de trace/capture d'écran/résultat `before/after` dans le Rapporteur Allure.
- `addConsoleLogs` - paramètre optionnel (`false` par défaut), définissez-le sur true pour joindre les logs de console de l'étape au rapporteur.
- `reportedEnvironmentVars` (**type:** `Record<string, string>`) - Définissez cette option pour afficher les variables d'environnement dans le rapport. Notez que cette configuration ne modifie pas les variables d'environnement réelles.

## API Allure supportée
* `addLabel(name, value)` - attribuer une étiquette personnalisée au test
* `addFeature(featureName)` – attribuer des fonctionnalités au test
* `addStory(storyName)` – attribuer une user story au test
* `addSeverity(value)` – attribuer une sévérité au test, accepte l'une des valeurs suivantes : blocker, critical, normal, minor, trivial
* `addTag(value)` – attribuer une étiquette de tag au test
* `addEpic(value)` – attribuer une étiquette d'épopée au test
* `addOwner(value)` – attribuer une étiquette de propriétaire au test
* `addSuite(value)` – attribuer une étiquette de suite au test
* `addSubSuite(value)` – attribuer une étiquette de sous-suite au test
* `addParentSuite(value)` – attribuer une étiquette de suite parente au test
* `addIssue(value)` – attribuer un identifiant de problème au test
* `addAllureId(value)` – attribuer une étiquette d'identifiant de test Allure au test
* `addTestId(value)` – attribuer un identifiant de test TMS au test
* ~~`addEnvironment(name, value)` ~~ – une fonction obsolète qui ne fonctionne plus. Utilisez `reportedEnvironmentVars` à la place
* `addAttachment(name, content, [type])` – enregistrer une pièce jointe au test.
    * `name` (*String*) - nom de la pièce jointe.
    * `content` – contenu de la pièce jointe.
    * `type` (*String*, optionnel) – type MIME de la pièce jointe, `text/plain` par défaut
* `addArgument(name, value)` - ajouter un argument supplémentaire au test
* `addDescription(description, [type])` – ajouter une description au test.
    * `description` (*String*) - description du test.
    * `type` (*String*, optionnel) – type de description, `text` par défaut. Valeurs ['text', 'html','markdown']
* `addStep(title, [{content, name = 'attachment'}], [status])` - ajouter une étape au test.
    * `title` (*String*) - nom de l'étape.
    * `content` (*String*, optionnel) - pièce jointe de l'étape
    * `name` (*String*, optionnel) - nom de la pièce jointe de l'étape, `attachment` par défaut.
    * `status` (*String*, optionnel) - statut de l'étape, `passed` par défaut. Doit être "failed", "passed" ou "broken"
* `startStep(title)` - commencer avec une étape
    * `title` (*String*) - nom de l'étape.
* `endStep(status)` - terminer avec une étape
    * `status` (*String*, optionnel) - statut de l'étape, `passed` par défaut. Doit être "failed", "passed" ou "broken"
* `step(name, body)` - commence l'étape avec une fonction de contenu à l'intérieur. Permet de créer des étapes avec une hiérarchie infinie
    * `body` (*Function*) - la fonction async du corps de l'étape

### Utilisation
L'API Allure peut être accédée en utilisant :

CJS

```js
const allureReporter = require('@wdio/allure-reporter').default
```

ESM

```js
import allureReporter from '@wdio/allure-reporter'
```

Exemple Mocha

```js
describe('Suite', () => {
    it('Case', () => {
        allureReporter.addFeature('Feature')
    })
})
```

#### Cucumber

Exemple de base Cucumber :

```js
Given('I include feature and story name', () => {
    allureReporter.addFeature('Feature_name');
    allureReporter.addStory('Story_name');
})
```

#### Étapes personnalisées

La méthode `step` simplifie la gestion des étapes car chaque étape est présentée comme une fonction async avec n'importe quel contenu à l'intérieur.
Le premier argument de la fonction est l'étape actuelle, qui dispose de la plupart des méthodes de l'API Allure (comme `label`, `epic`, `attach`, etc.) :

```js
allureReporter.step('my step name', async (s1) => {
    s1.label('foo', 'bar')
    await s1.step('my child step name', async (s2) => {
        // you can add any combination of steps in the body function
    })
})
```

##### Tags Cucumber

Les tags Cucumber avec des noms spéciaux (`issue` et `testId`) sont convertis en liens (les modèles de liens correspondants doivent être configurés au préalable) :
```gherkin
@issue=BUG-1
@testId=TST-2
Feature: This is a feature with global tags that will be converted to Allure links

  @issue=BUG-3
  @testId=TST-4
  Scenario: This is a scenario with tags that will be converted to Allure links
    Given I do something
```

Les tags Cucumber avec des noms spéciaux (`feature`) sont mappés aux étiquettes Allure :

```gherkin
Feature: Test user role

  @feature=login
  Scenario: Login
    Given I test login
```

## Affichage du rapport

Les résultats peuvent être utilisés par n'importe lequel des [outils de rapports](https://allurereport.org/) proposés par Allure. Par exemple :

### Ligne de commande

Installez l'[outil de ligne de commande Allure](https://www.npmjs.com/package/allure-commandline), et traitez le répertoire des résultats :

```sh
allure generate [allure_output_dir] && allure open
```

Cela générera un rapport (par défaut dans `./allure-report`), et l'ouvrira dans votre navigateur.

### Génération automatique du rapport

Vous pouvez également générer automatiquement le rapport en utilisant l'outil de ligne de commande Allure de manière programmatique. Pour ce faire, installez le package dans votre projet par :

```sh
npm i allure-commandline
```

Ensuite, ajoutez ou étendez votre hook `onComplete` ou créez un [service personnalisé](/docs/customservices) pour cela :

```js
// wdio.conf.js
const allure = require('allure-commandline')

export const config = {
    // ...
    onComplete: function() {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000)

            generation.on('exit', function(exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve()
            })
        })
    }
    // ...
}
```

### Jenkins

Installez et configurez le [plugin Jenkins Allure](https://allurereport.org/docs/integrations-jenkins/)

## Ajouter des captures d'écran

Des captures d'écran peuvent être jointes au rapport en utilisant la fonction `takeScreenshot` de WebDriverIO dans le hook `afterTest` pour Mocha et Jasmine ou le hook `afterStep` pour Cucumber.
Définissez d'abord `disableWebdriverScreenshotsReporting: false` dans les options du rapporteur, puis ajoutez dans le hook afterStep :

### Mocha / Jasmine

```js title="wdio.conf.js"
afterTest: async function(test, context, { error, result, duration, passed, retries }) {
    if (error) {
        await browser.takeScreenshot();
    }
}
```

### Cucumber

```js title="wdio.conf.js"
afterStep: async function (step, scenario, { error, duration, passed }, context) {
  if (error) {
    await browser.takeScreenshot();
  }
}
```

Comme montré dans l'exemple ci-dessus, lorsque cette fonction est appelée, une image de capture d'écran sera jointe au rapport Allure.