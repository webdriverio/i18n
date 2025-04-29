---
id: junit-reporter
title: Junit Reporter
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-junit-reporter/README.md
---


> Ein WebdriverIO Reporter, der [Jenkins](http://jenkins-ci.org/) kompatible XML-basierte JUnit-Berichte erstellt

## Installation

Am einfachsten ist es, `@wdio/junit-reporter` als devDependency in Ihrer `package.json` zu behalten, über:

```sh
npm install @wdio/junit-reporter --save-dev
```

Anweisungen zur Installation von `WebdriverIO` finden Sie [hier](https://webdriver.io/docs/gettingstarted).

## Ausgabe

Dieser Reporter erstellt einen Bericht für jeden Runner, sodass Sie für jede Spec-Datei einen XML-Bericht erhalten. Nachfolgend
finden Sie Beispiele für die XML-Ausgabe bei verschiedenen Szenarien in der Spec-Datei.

### Einzelner describe-Block
```javascript
describe('a test suite', () => {
    it('a test case', function () {
      // do something
      // assert something
    });
});
```
wird zu
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

### Verschachtelter describe-Block
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
wird zu
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

### Mehrere describe-Blöcke
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
wird zu
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

### Fehler und Fehlermeldungen
Alle Testfallfehler werden als JUnit-Testfallfehler abgebildet. Ein fehlgeschlagener Testfall aufgrund eines Assertions-Fehlers oder eines Fehlers sieht wie folgt aus:

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

## Konfiguration

Der folgende Code zeigt die Standard-Konfiguration des WDIO-Testrunners. Fügen Sie einfach `'junit'` als Reporter zum Array hinzu. Um während des Tests Ausgaben zu erhalten, können Sie den [WDIO Dot Reporter](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter) und den WDIO JUnit Reporter gleichzeitig ausführen:

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

Die folgenden Optionen werden unterstützt:

### outputDir
Definieren Sie ein Verzeichnis, in dem Ihre XML-Dateien gespeichert werden sollen.

Typ: `String`<br />
Erforderlich

### outputFileFormat
Definieren Sie die XML-Dateien, die nach der Testausführung erstellt werden.

Typ: `Object`<br />
Standard: ``function (opts) { return `wdio-${this.cid}-${name}-reporter.log` }``

```
outputFileFormat: function (options) {
    return 'mycustomfilename.xml';
}
```

> Hinweis: `options.capabilities` ist Ihr Capabilities-Objekt für diesen Runner, wenn Sie also `${options.capabilities}` in Ihrem String angeben, wird [Object object] zurückgegeben. Sie müssen angeben, welche Eigenschaften von capabilities Sie in Ihrem Dateinamen haben möchten.

### suiteNameFormat

Gibt die Möglichkeit, benutzerdefinierte Regex für die Formatierung des Testsuitenamens bereitzustellen (z.B. in der Ausgabe-XML).

Typ: `Regex`,<br />
Standard: `/[^a-zA-Z0-9@]+/`

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

Fügt jedem Testfall ein Dateiattribut hinzu. Diese Konfiguration ist hauptsächlich für CircleCI gedacht. Diese Einstellung bietet reichhaltigere Details, kann aber auf anderen CI-Plattformen Probleme verursachen.

Typ: `Boolean`,<br />
Standard: `false`


### packageName

Sie können Pakete auf einer zusätzlichen Ebene aufteilen, indem Sie `'packageName'` setzen. Wenn Sie beispielsweise über eine Testsuite mit verschiedenen Umgebungsvariablen iterieren möchten:

Typ: `String`<br />
Beispiel:

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

Ermöglicht die Einstellung verschiedener Kombinationen von Fehlerbenachrichtigungen innerhalb von XML.<br />
Bei einem Jasmine-Test wie `expect(true).toBe(false, 'my custom message')` erhalten Sie diesen Testfehler:

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

Daher können Sie wählen, *welcher* Schlüssel *wo* verwendet wird, siehe das Beispiel unten.

Typ: `Object`,<br />
Standard: `errorOptions: { error: "message" }`<br />
Beispiel:

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

Optionaler Parameter, setzen Sie diesen Parameter auf true, um Konsolenprotokolle des Tests im Reporter anzuhängen.

Typ: `Boolean`<br />
Standard: `false`<br />
Beispiel:

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

## Hinzufügen benutzerdefinierter Eigenschaften zu Testfällen

Dieses Plugin stellt eine Funktion `addProperty(name, value)` bereit. Diese Funktion kann verwendet werden, um dem aktuell laufenden Testschritt zusätzliche JUnit-Testfalleigenschaften hinzuzufügen. Diese Eigenschaften werden in der resultierenden XML als `<property name="${name}" value="${value}" />` gemeldet.

Ein typischer Anwendungsfall dafür ist das Hinzufügen eines Links zu einem Problem oder einem Testfall.


### Verwendungsbeispiel

Ein Beispiel für mocha:

```js
import { addProperty } from '@wdio/junit-reporter'

describe('Suite', () => {
    it('Case', () => {
        addProperty('test_case', 'TC-1234')
    })
})
```

## Jenkins-Einrichtung

Zu guter Letzt müssen Sie Ihrem CI-Job (z.B. Jenkins) mitteilen, wo die XML-Datei zu finden ist. Fügen Sie dazu Ihrem Job eine Post-Build-Aktion hinzu, die nach dem Testlauf ausgeführt wird, und verweisen Sie Jenkins (oder Ihr gewünschtes CI-System) auf Ihre XML-Testergebnisse:

![Jenkins auf XML-Dateien verweisen](https://webdriver.io/img/jenkins-postjob.png "Jenkins auf XML-Dateien verweisen")

Wenn es in Ihrem CI-System keinen solchen Post-Build-Schritt gibt, gibt es wahrscheinlich irgendwo im Internet ein Plugin dafür.

----

Weitere Informationen zu WebdriverIO finden Sie auf der [Homepage](https://webdriver.io).