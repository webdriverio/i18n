---
id: junit-reporter
title: Junit-rapportör
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-junit-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> En WebdriverIO-rapportör som skapar [Jenkins](http://jenkins-ci.org/)-kompatibla XML-baserade JUnit-rapporter

## Installation

Det enklaste sättet är att behålla `@wdio/junit-reporter` som en devDependency i din `package.json`, via:

```sh
npm install @wdio/junit-reporter --save-dev
```

Instruktioner om hur man installerar `WebdriverIO` finns [här](https://webdriver.io/docs/gettingstarted).

## Output

Denna rapportör kommer att skapa en rapport för varje körning, så du kommer att få en xml-rapport för varje specifikationsfil. Nedan
är exempel på XML-utdata för olika scenarier i specifikationsfilen.

### Enskilt describe-block
```javascript
describe('a test suite', () => {
    it('a test case', function () {
      // do something
      // assert something
    });
});
```
blir
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

### Nästlat describe-block
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
blir
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

### Flera describe-block
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
blir
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

### Misslyckanden och fel
Alla testfall som misslyckas mappas som JUnit-testfallsfel. Ett misslyckat testfall på grund av bekräftelsefel eller fel kommer att se ut så här:

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

Följande kod visar standardkonfigurationen för wdio-testrunner. Lägg bara till `'junit'` som rapportör
i arrayen. För att få viss utdata under testet kan du köra [WDIO Dot Reporter](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter) och WDIO JUnit Reporter samtidigt:

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

Följande alternativ stöds:

### outputDir
Definiera en katalog där dina xml-filer ska lagras.

Typ: `String`<br />
Krävs

### outputFileFormat
Definiera xml-filerna som skapas efter testkörningen.

Typ: `Object`<br />
Standard: ``function (opts) { return `wdio-${this.cid}-${name}-reporter.log` }``

```
outputFileFormat: function (options) {
    return 'mycustomfilename.xml';
}
```

> Obs: `options.capabilities` är ditt capabilities-objekt för den körningen, så att specificera `${options.capabilities}` i din sträng kommer att returnera [Object object]. Du måste ange vilka egenskaper för capabilities du vill ha i ditt filnamn.

### suiteNameFormat

Ger möjlighet att tillhandahålla anpassade regex för formatering av testsuitens namn (t.ex. i output xml).

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

Lägger till ett filattribut till varje testfall. Denna konfiguration är främst för CircleCI. Denna inställning ger rikare detaljer men kan bryta på andra CI-plattformar.

Typ: `Boolean`,<br />
Standard: `false`


### packageName

Du kan bryta ut paket på en ytterligare nivå genom att ställa in `'packageName'`. Till exempel, om du vill iterera över en testsuite med olika miljövariabler inställda:

Typ: `String`<br />
Exempel:

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

Tillåter att ställa in olika kombinationer av felmeddelanden i xml.<br />
Givet ett Jasmine-test som `expect(true).toBe(false, 'my custom message')` får du detta testfel:

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

Därför kan du välja *vilken* nyckel som ska användas *var*, se exemplet nedan.

Typ: `Object`,<br />
Standard: `errorOptions: { error: "message" }`<br />
Exempel:

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

Valfri parameter, ställ in denna parameter till true för att bifoga konsolloggar från testet i rapportören.

Typ: `Boolean`<br />
Standard: `false`<br />
Exempel:

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

## Lägga till anpassade egenskaper till testfall

Detta plugin tillhandahåller en funktion `addProperty(name, value)`. Denna funktion kan användas för att lägga till ytterligare junit-testfallegenskaper till det nuvarande teststeget. Dessa egenskaper kommer att rapporteras i den resulterande xml som `<property name="${name}" value="${value}" />`.

Typiskt användningsfall för detta är att lägga till en länk till ett ärende eller ett testfall.


### Användningsexempel

Ett exempel för mocha:

```js
import { addProperty } from '@wdio/junit-reporter'

describe('Suite', () => {
    it('Case', () => {
        addProperty('test_case', 'TC-1234')
    })
})
```

## Jenkins-konfiguration

Sist men inte minst behöver du tala om för ditt CI-jobb (t.ex. Jenkins) var det kan hitta xml-filen. För att göra det, lägg till en post-build-åtgärd till ditt jobb som körs efter att testet har körts och peka Jenkins (eller ditt önskade CI-system) till dina XML-testresultat:

![Point Jenkins to XML files](https://webdriver.io/img/jenkins-postjob.png "Point Jenkins to XML files")

Om det inte finns ett sådant post-build-steg i ditt CI-system finns det förmodligen ett plugin för det någonstans på internet.

----

För mer information om WebdriverIO, se [hemsidan](https://webdriver.io).