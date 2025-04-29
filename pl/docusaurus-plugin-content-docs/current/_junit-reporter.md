---
id: junit-reporter
title: Raportowanie Junit
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-junit-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Reporter WebdriverIO, który tworzy raporty JUnit w formacie XML kompatybilne z [Jenkins](http://jenkins-ci.org/)

## Instalacja

Najłatwiejszym sposobem jest utrzymanie `@wdio/junit-reporter` jako devDependency w twoim pliku `package.json`, poprzez:

```sh
npm install @wdio/junit-reporter --save-dev
```

Instrukcje jak zainstalować `WebdriverIO` można znaleźć [tutaj](https://webdriver.io/docs/gettingstarted).

## Wynik

Ten reporter wygeneruje raport dla każdego uruchomienia, więc w rezultacie otrzymasz raport XML dla każdego pliku specyfikacji. Poniżej
znajdują się przykłady danych wyjściowych XML dla różnych scenariuszy w pliku specyfikacji.

### Pojedynczy blok describe
```javascript
describe('a test suite', () => {
    it('a test case', function () {
      // do something
      // assert something
    });
});
```
staje się
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

### Zagnieżdżony blok describe
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
staje się
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

### Wielokrotny blok describe
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
staje się
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

### Niepowodzenia i błędy
Wszystkie niepowodzenia przypadków testowych są mapowane jako błędy przypadków testowych JUnit. Niepowodzenie przypadku testowego z powodu błędu asercji lub błędu będzie wyglądać tak:

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

## Konfiguracja

Poniższy kod pokazuje domyślną konfigurację testera wdio. Wystarczy dodać `'junit'` jako reporter
do tablicy. Aby uzyskać jakieś dane wyjściowe podczas testu, możesz uruchomić [WDIO Dot Reporter](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter) i WDIO JUnit Reporter jednocześnie:

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

Obsługiwane są następujące opcje:

### outputDir
Zdefiniuj katalog, w którym mają być przechowywane pliki xml.

Typ: `String`<br />
Wymagane

### outputFileFormat
Zdefiniuj pliki xml tworzone po wykonaniu testu.

Typ: `Object`<br />
Domyślnie: ``function (opts) { return `wdio-${this.cid}-${name}-reporter.log` }``

```
outputFileFormat: function (options) {
    return 'mycustomfilename.xml';
}
```

> Uwaga: `options.capabilities` to obiekt capabilities dla tego runnera, więc określenie `${options.capabilities}` w ciągu znaków zwróci [Object object]. Musisz określić, które właściwości capabilities chcesz w nazwie pliku.

### suiteNameFormat

Daje możliwość dostarczenia niestandardowego regex do formatowania nazwy zestawu testów (np. w wyjściowym xml).

Typ: `Regex`,<br />
Domyślnie: `/[^a-zA-Z0-9@]+/`

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

Dodaje atrybut pliku do każdego przypadku testowego. Ta konfiguracja jest głównie dla CircleCI. To ustawienie zapewnia bogatsze szczegóły, ale może nie działać na innych platformach CI.

Typ: `Boolean`,<br />
Domyślnie: `false`


### packageName

Możesz podzielić pakiety na dodatkowy poziom, ustawiając `'packageName'`. Na przykład, jeśli chcesz iterować przez zestaw testów z różnymi zmiennymi środowiskowymi:

Typ: `String`<br />
Przykład:

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

Pozwala ustawić różne kombinacje powiadomień o błędach wewnątrz xml.<br />
Dla testu Jasmine, takiego jak `expect(true).toBe(false, 'my custom message')`, otrzymasz taki błąd testu:

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

Dlatego możesz wybrać *który* klucz będzie używany *gdzie*, zobacz przykład poniżej.

Typ: `Object`,<br />
Domyślnie: `errorOptions: { error: "message" }`<br />
Przykład:

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

Opcjonalny parametr, ustaw ten parametr na true, aby dołączyć logi konsoli z testu w reporterze.

Typ: `Boolean`<br />
Domyślnie: `false`<br />
Przykład:

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

## Dodawanie niestandardowych właściwości do testów

Wtyczka ta udostępnia funkcję `addProperty(name, value)`. Funkcja ta może być używana do dodawania dodatkowych właściwości testcase junit do aktualnie wykonywanego kroku testowego. Te właściwości będą raportowane w wynikowym pliku xml jako `<property name="${name}" value="${value}" />`.

Typowym przypadkiem użycia jest dodanie linku do zgłoszenia lub przypadku testowego.


### Przykład użycia

Przykład dla mocha:

```js
import { addProperty } from '@wdio/junit-reporter'

describe('Suite', () => {
    it('Case', () => {
        addProperty('test_case', 'TC-1234')
    })
})
```

## Konfiguracja Jenkins

Na koniec musisz poinformować swoje zadanie CI (np. Jenkins), gdzie może znaleźć plik xml. Aby to zrobić, dodaj akcję post-build do swojego zadania, która zostanie wykonana po uruchomieniu testu i wskaż Jenkinsowi (lub wybranemu systemowi CI) na twoje wyniki testów XML:

![Point Jenkins to XML files](https://webdriver.io/img/jenkins-postjob.png "Point Jenkins to XML files")

Jeśli w twoim systemie CI nie ma takiej akcji post-build, prawdopodobnie istnieje do tego wtyczka gdzieś w Internecie.

----

Więcej informacji na temat WebdriverIO można znaleźć na [stronie głównej](https://webdriver.io).