---
id: junit-reporter
title: Reporter Junit
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-junit-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Un reporter WebdriverIO che crea report JUnit basati su XML compatibili con [Jenkins](http://jenkins-ci.org/)

## Installazione

Il modo più semplice è mantenere `@wdio/junit-reporter` come devDependency nel tuo `package.json`, tramite:

```sh
npm install @wdio/junit-reporter --save-dev
```

Le istruzioni su come installare `WebdriverIO` possono essere trovate [qui](https://webdriver.io/docs/gettingstarted).

## Output

Questo reporter produrrà un report per ogni runner, quindi a sua volta riceverai un report xml per ogni file spec. Di seguito
ci sono esempi di output XML relativi a diversi scenari nel file spec.

### Blocco describe singolo
```javascript
describe('a test suite', () => {
    it('a test case', function () {
      // do something
      // assert something
    });
});
```
diventa
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

### Blocco describe annidato
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
diventa
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

### Blocco describe multiplo
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
diventa
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

### Fallimenti ed Errori
Tutti i fallimenti dei casi di test sono mappati come errori di casi di test JUnit. Un caso di test fallito a causa di un fallimento di asserzione o di un errore apparirà così:

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

## Configurazione

Il seguente codice mostra la configurazione predefinita del test runner WDIO. Basta aggiungere `'junit'` come reporter
nell'array. Per ottenere un output durante il test, puoi eseguire il [WDIO Dot Reporter](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter) e il WDIO JUnit Reporter contemporaneamente:

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

Sono supportate le seguenti opzioni:

### outputDir
Definisce una directory dove i tuoi file xml devono essere archiviati.

Tipo: `String`<br />
Obbligatorio

### outputFileFormat
Definisce i file xml creati dopo l'esecuzione del test.

Tipo: `Object`<br />
Default: ``function (opts) { return `wdio-${this.cid}-${name}-reporter.log` }``

```
outputFileFormat: function (options) {
    return 'mycustomfilename.xml';
}
```

> Nota: `options.capabilities` sono le tue capabilities per quel runner, quindi specificando `${options.capabilities}` nella tua stringa restituirà [Object object]. Devi specificare quali proprietà delle capabilities vuoi nel tuo nome file.

### suiteNameFormat

Offre la possibilità di fornire regex personalizzate per formattare il nome della suite di test (ad esempio, nell'xml di output).

Tipo: `Regex`,<br />
Default: `/[^a-zA-Z0-9@]+/`

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

Aggiunge un attributo file a ogni testcase. Questa configurazione è principalmente per CircleCI. Questa impostazione fornisce dettagli più ricchi ma potrebbe non funzionare su altre piattaforme CI.

Tipo: `Boolean`,<br />
Default: `false`


### packageName

Puoi suddividere i pacchetti per un livello aggiuntivo impostando `'packageName'`. Ad esempio, se volessi iterare su una suite di test con diverse variabili d'ambiente impostate:

Tipo: `String`<br />
Esempio:

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

Consente di impostare varie combinazioni di notifiche di errore all'interno dell'xml.<br />
Dato un test Jasmine come `expect(true).toBe(false, 'my custom message')` otterrai questo errore di test:

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

Pertanto, puoi scegliere *quale* chiave sarà utilizzata *dove*, vedi l'esempio di seguito.

Tipo: `Object`,<br />
Default: `errorOptions: { error: "message" }`<br />
Esempio:

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

Parametro opzionale, imposta questo parametro su true per allegare i log della console dal test nel reporter.

Tipo: `Boolean`<br />
Default: `false`<br />
Esempio:

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

## Aggiungere proprietà personalizzate ai testcase

Questo plugin fornisce una funzione `addProperty(name, value)`. Questa funzione può essere utilizzata per aggiungere proprietà aggiuntive del testcase junit al passaggio di test attualmente in esecuzione. Queste proprietà verranno riportate nell'xml risultante come `<property name="${name}" value="${value}" />`.

Un caso d'uso tipico è l'aggiunta di un collegamento a un problema o a un caso di test.


### Esempio di utilizzo

Un esempio per mocha:

```js
import { addProperty } from '@wdio/junit-reporter'

describe('Suite', () => {
    it('Case', () => {
        addProperty('test_case', 'TC-1234')
    })
})
```

## Configurazione Jenkins

Infine devi dire al tuo job CI (ad es. Jenkins) dove può trovare il file xml. Per farlo, aggiungi un'azione post-build al tuo job che viene eseguita dopo che il test è stato eseguito e indica a Jenkins (o al tuo sistema CI desiderato) i tuoi risultati di test XML:

![Point Jenkins to XML files](https://webdriver.io/img/jenkins-postjob.png "Point Jenkins to XML files")

Se non esiste una fase post-build di questo tipo nel tuo sistema CI, probabilmente esiste un plugin per questo da qualche parte su internet.

----

Per ulteriori informazioni su WebdriverIO, visita la [homepage](https://webdriver.io).