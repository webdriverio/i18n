---
id: junit-reporter
title: Rapporteur Junit
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-junit-reporter/README.md
---


> Un rapporteur WebdriverIO qui crée des rapports JUnit basés sur XML compatibles avec [Jenkins](http://jenkins-ci.org/)

## Installation

La façon la plus simple est de garder `@wdio/junit-reporter` comme devDependency dans votre `package.json`, via :

```sh
npm install @wdio/junit-reporter --save-dev
```

Les instructions sur l'installation de `WebdriverIO` peuvent être trouvées [ici](https://webdriver.io/docs/gettingstarted).

## Sortie

Ce rapporteur produira un rapport pour chaque exécuteur, vous recevrez donc un rapport XML pour chaque fichier de spécification. Ci-dessous
se trouvent des exemples de sortie XML pour différents scénarios dans le fichier de spécification.

### Bloc describe unique
```javascript
describe('a test suite', () => {
    it('a test case', function () {
      // do something
      // assert something
    });
});
```
devient
```xml
<testsuites>
    <testsuite name="a test suite" timestamp="2019-04-18T13:45:21" time="11.735" tests="0" failures="0" errors="0" skipped="0">
        <properties>
          <property name="specId" value="0"/>
          <property name="suiteName" value="a test suite"/>
          <property name="capabilities" value="chrome"/>
          <property name="file" value=".\test\specs\asuite.spec.js"/>
        </properties>
        <testcase classname="chrome.a_test_case" name="a_test_suite_a_test_case" time="11.706"/>
    </testsuite>
</testsuites>
```

### Bloc describe imbriqué
```javascript
describe('a test suite', () => {
    describe('a nested test suite', function() {
        it('a test case', function () {
          // do something
          // assert something
        });
    });
});
```
devient
```xml
<testsuites>
    <testsuite name="a test suite" timestamp="2019-04-18T13:45:21" time="11.735" tests="0" failures="0" errors="0" skipped="0">
    <properties>
      <property name="specId" value="0"/>
      <property name="suiteName" value="a test suite"/>
      <property name="capabilities" value="chrome"/>
      <property name="file" value=".\test\specs\asuite.spec.js"/>
    </properties>
  </testsuite>
  <testsuite name="a nested test suite" timestamp="2019-04-18T13:45:21" time="11.735" tests="0" failures="0" errors="0" skipped="0">
    <properties>
      <property name="specId" value="0"/>
      <property name="suiteName" value="a nested test suite"/>
      <property name="capabilities" value="chrome"/>
      <property name="file" value=".\test\specs\asuite.spec.js"/>
    </properties>
    <testcase classname="chrome.a_test_case" name="a nested test suite a test case" time="11.706"/>
  </testsuite>
</testsuites>
```

### Plusieurs blocs describe
```javascript
describe('a test suite', () => {
    it('a test case', function () {
      // do something
      // assert something
    });
});
describe('a second test suite', () => {
    it('a second test case', function () {
      // do something
      // assert something
    });
});
```
devient
```xml
<testsuites>
    <testsuite name="a test suite" timestamp="2019-04-18T13:45:21" time="11.735" tests="0" failures="0" errors="0" skipped="0">
    <properties>
      <property name="specId" value="0"/>
      <property name="suiteName" value="a test suite"/>
      <property name="capabilities" value="chrome"/>
      <property name="file" value=".\test\specs\asuite.spec.js"/>
      <testcase classname="chrome.a_test_case" name="a nested test suite a test case" time="11.706"/>
    </properties>
  </testsuite>
  <testsuite name="a second test suite" timestamp="2019-04-18T13:45:21" time="11.735" tests="0" failures="0" errors="0" skipped="0">
    <properties>
      <property name="specId" value="0"/>
      <property name="suiteName" value="a second test suite"/>
      <property name="capabilities" value="chrome"/>
      <property name="file" value=".\test\specs\asuite.spec.js"/>
    </properties>
    <testcase classname="chrome.a_second_test_case" name="a_second_test_suite_a_second_test_case" time="11.706"/>
  </testsuite>
</testsuites>
```

### Échecs et erreurs
Tous les échecs de cas de test sont mappés comme des erreurs de cas de test JUnit. Un cas de test échoué en raison d'une assertion non satisfaite ou d'une erreur ressemblera à :

```xml
<testcase classname="chrome.a_test_case" name="a_test_suite_a_test_case" time="0.372">
  <failure message="Error: some error"/>
    <system-err>
        <![CDATA[
Error: some assertion failure
    at UserContext.<anonymous> (C:\repo\webdriver-example\test\specs/a_test_suite.spec.js:22:17)
]]>
  </system-err>
</testcase>
```

## Configuration

Le code suivant montre la configuration par défaut du lanceur de test wdio. Ajoutez simplement `'junit'` comme rapporteur
au tableau. Pour obtenir une sortie pendant le test, vous pouvez exécuter le [WDIO Dot Reporter](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter) et le WDIO JUnit Reporter en même temps :

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './',
            outputFileFormat: function(options) { // optional
                return `results-${options.cid}.${options.capabilities}.xml`
            }
        }]
    ],
    // ...
};
```

Les options suivantes sont prises en charge :

### outputDir
Définissez un répertoire où vos fichiers xml doivent être stockés.

Type : `String`<br />
Requis

### outputFileFormat
Définissez les fichiers xml créés après l'exécution du test.

Type : `Object`<br />
Par défaut : ``function (opts) { return `wdio-${this.cid}-${name}-reporter.log` }``

```
outputFileFormat: function (options) {
    return 'mycustomfilename.xml';
}
```

> Remarque : `options.capabilities` est votre objet de capacités pour cet exécuteur, donc spécifier `${options.capabilities}` dans votre chaîne renverra [Object object]. Vous devez spécifier quelles propriétés de capabilities vous voulez dans votre nom de fichier.

### suiteNameFormat

Donne la possibilité de fournir une regex personnalisée pour formater le nom de la suite de tests (par exemple, dans la sortie xml).

Type : `Regex`,<br />
Par défaut : `/[^a-zA-Z0-9@]+/`

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './',
            suiteNameFormat: /[^a-zA-Z0-9@]+/
            outputFileFormat: function(options) { // optional
                return `results-${options.cid}.${options.capabilities}.xml`
            }
        }]
    ],
    // ...
};
```

### addFileAttribute

Ajoute un attribut de fichier à chaque cas de test. Cette configuration est principalement pour CircleCI. Ce paramètre fournit des détails plus riches mais peut ne pas fonctionner sur d'autres plateformes CI.

Type : `Boolean`,<br />
Par défaut : `false`


### packageName

Vous pouvez décomposer les packages par un niveau supplémentaire en définissant `'packageName'`. Par exemple, si vous vouliez itérer sur une suite de tests avec différentes variables d'environnement définies :

Type : `String`<br />
Exemple :

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './',
            packageName: process.env.USER_ROLE // chrome.41 - administrator
        }]
    ]
    // ...
};
```

### errorOptions

Permet de définir diverses combinaisons de notifications d'erreur dans le xml.<br />
Étant donné un test Jasmine comme `expect(true).toBe(false, 'my custom message')`, vous obtiendrez cette erreur de test :

```
{
    matcherName: 'toBe',
    message: 'Expected true to be false, \'my custom message\'.',
    stack: 'Error: Expected true to be false, \'my custom message\'.\n    at UserContext.it (/home/mcelotti/Workspace/WebstormProjects/forcebeatwio/test/marco/prova1.spec.js:3:22)',
    passed: false,
    expected: [ false, 'my custom message' ],
    actual: true
}
```

Par conséquent, vous pouvez choisir *quelle* clé sera utilisée *où*, voir l'exemple ci-dessous.

Type : `Object`,<br />
Par défaut : `errorOptions: { error: "message" }`<br />
Exemple :

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './',
            errorOptions: {
                error: 'message',
                failure: 'message',
                stacktrace: 'stack'
            }
        }]
    ],
    // ...
};
```

### addWorkerLogs

Paramètre optionnel, définissez ce paramètre à true pour joindre les logs de console du test dans le rapporteur.

Type : `Boolean`<br />
Par défaut : `false`<br />
Exemple :

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './',
            addWorkerLogs: true
        }]
    ],
    // ...
};
```

## Ajout de propriétés personnalisées aux cas de test

Ce plugin fournit une fonction `addProperty(name, value)`. Cette fonction peut être utilisée pour ajouter des propriétés supplémentaires de cas de test junit à l'étape de test en cours d'exécution. Ces propriétés seront rapportées dans le xml résultant comme `<property name="${name}" value="${value}" />`.

Le cas d'utilisation typique pour cela est d'ajouter un lien vers un problème ou un cas de test.


### Exemple d'utilisation

Un exemple pour mocha :

```js
import { addProperty } from '@wdio/junit-reporter'

describe('Suite', () => {
    it('Case', () => {
        addProperty('test_case', 'TC-1234')
    })
})
```

## Configuration Jenkins

Enfin, vous devez indiquer à votre job CI (par exemple Jenkins) où il peut trouver le fichier xml. Pour ce faire, ajoutez une action post-build à votre job qui s'exécute après le test et dirigez Jenkins (ou votre système CI souhaité) vers vos résultats de test XML :

![Point Jenkins to XML files](https://webdriver.io/img/jenkins-postjob.png "Point Jenkins to XML files")

S'il n'y a pas de telle étape post-build dans votre système CI, il existe probablement un plugin pour cela quelque part sur internet.

----

Pour plus d'informations sur WebdriverIO, consultez la [page d'accueil](https://webdriver.io).