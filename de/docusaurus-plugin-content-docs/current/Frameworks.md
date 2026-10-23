---
id: frameworks
title: Frameworks
description: "Konfigurieren Sie Mocha, Jasmine oder Cucumber.js als Test-Framework für den WDIO-Testrunner oder integrieren Sie Drittanbieter-Frameworks wie Serenity/JS."
---

Der WebdriverIO Runner bietet integrierte Unterstützung für [Mocha](http://mochajs.org/), [Jasmine](http://jasmine.github.io/) und [Cucumber.js](https://cucumber.io/). Sie können ihn auch mit Open-Source-Frameworks von Drittanbietern integrieren, wie z. B. [Serenity/JS](#using-serenityjs).

:::tip WebdriverIO mit Test-Frameworks integrieren
Um WebdriverIO mit einem Test-Framework zu integrieren, benötigen Sie ein Adapter-Paket, das auf NPM verfügbar ist.
Beachten Sie, dass das Adapter-Paket am selben Ort installiert sein muss, an dem auch WebdriverIO installiert ist.
Wenn Sie WebdriverIO also global installiert haben, stellen Sie sicher, dass Sie auch das Adapter-Paket global installieren.
:::

Durch die Integration von WebdriverIO mit einem Test-Framework können Sie in Ihren Spec-Dateien oder Step-Definitionen über die globale Variable `browser`
auf die WebDriver-Instanz zugreifen.
Beachten Sie, dass WebdriverIO sich auch um das Erstellen und Beenden der Selenium-Session kümmert, sodass Sie dies nicht
selbst tun müssen.

## Mocha verwenden

Installieren Sie zunächst das Adapter-Paket von NPM:

```bash npm2yarn
npm install @wdio/mocha-framework --save-dev
```

Standardmäßig stellt WebdriverIO eine integrierte [Assertion-Bibliothek](assertion) bereit, mit der Sie sofort loslegen können:

```js
describe('my awesome website', () => {
    it('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

WebdriverIO v10 wird mit [Mocha 12](https://mochajs.org/) ausgeliefert und unterstützt die Mocha-[Interfaces](https://mochajs.org/#interfaces) `BDD` (Standard), `TDD` und `QUnit`.

Wenn Sie Ihre Specs im TDD-Stil schreiben möchten, setzen Sie die Eigenschaft `ui` in Ihrer `mochaOpts`-Konfiguration auf `tdd`. Ihre Testdateien sollten dann wie folgt geschrieben werden:

```js
suite('my awesome website', () => {
    test('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

Wenn Sie weitere Mocha-spezifische Einstellungen festlegen möchten, können Sie dies mit dem Schlüssel `mochaOpts` in Ihrer Konfigurationsdatei tun. Eine Liste aller Optionen finden Sie auf der [Website des Mocha-Projekts](https://mochajs.org/api/mocha).

__Hinweis:__ WebdriverIO unterstützt die veraltete Verwendung von `done`-Callbacks in Mocha nicht:

```js
it('should test something', (done) => {
    done() // wirft "done is not a function"
})
```

### Mocha-Optionen

Die folgenden Optionen können in Ihrer `wdio.conf.js` angewendet werden, um Ihre Mocha-Umgebung zu konfigurieren. __Hinweis:__ Nicht alle Mocha-Optionen werden unterstützt. `parallel` gehört weiterhin zu Mochas eigenem Worker-Pool und führt hier zu einem Fehler – der WDIO-Testrunner parallelisiert Specs bereits über Capabilities und Worker hinweg. Um die Tests einer Spec-Datei gleichzeitig auszuführen, verwenden Sie [`parallelMode`](#parallelmode). Die CLI von Mocha 12 ist außerdem von yargs auf Nodes `util.parseArgs` umgestiegen; dies betrifft nur einen direkten `mocha`-Aufruf, nicht jedoch `mochaOpts`, die über `wdio` übergeben werden. Sie können diese Framework-Optionen als Argumente übergeben, z. B.:

```sh
wdio run wdio.conf.ts --mochaOpts.grep "my test" --mochaOpts.bail --no-mochaOpts.checkLeaks
```

Dadurch werden die folgenden Mocha-Optionen übergeben:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

Die folgenden Mocha-Optionen werden unterstützt:

#### require

<Option type="string|string[]" default="[]">

Die Option `require` ist nützlich, wenn Sie grundlegende Funktionalität hinzufügen oder erweitern möchten (WebdriverIO-Framework-Option).

</Option>

#### allowUncaught

<Option type="boolean" default="false">

Nicht abgefangene Fehler weitergeben.

</Option>

#### bail

<Option type="boolean" default="false">

Nach dem ersten fehlgeschlagenen Test abbrechen.

</Option>

#### checkLeaks

<Option type="boolean" default="false">

Auf Lecks globaler Variablen prüfen.

</Option>

#### delay

<Option type="boolean" default="false">

Ausführung der Root-Suite verzögern.

</Option>

#### failHookAffectedTests

<Option type="boolean" default="true">

Jeden Test, der durch einen fehlschlagenden `before`- oder `beforeEach`-Hook übersprungen wurde, als Fehlschlag melden. WebdriverIO aktiviert dies, damit ein defekter Setup-Hook bei jeder übersprungenen Spec sichtbar ist. Setzen Sie die Option auf `false`, um nur den Hook zu melden.

</Option>

#### fgrep

<Option type="string" default="null">

Testfilter anhand eines gegebenen Strings.

</Option>

#### forbidOnly

<Option type="boolean" default="false">

Mit `only` markierte Tests lassen die Suite fehlschlagen.

</Option>

#### forbidPending

<Option type="boolean" default="false">

Ausstehende Tests lassen die Suite fehlschlagen.

</Option>

#### fullTrace

<Option type="boolean" default="false">

Vollständiger Stacktrace bei Fehlschlag.

</Option>

#### global

<Option type="string[]" default="[]">

Im globalen Gültigkeitsbereich erwartete Variablen.

</Option>

#### grep

<Option type="RegExp|string" default="null">

Testfilter anhand eines gegebenen regulären Ausdrucks. Mocha 12 akzeptiert in diesem Filter moderne RegExp-Flags (zum Beispiel `s` oder `d`).

</Option>

#### invert

<Option type="boolean" default="false">

Treffer des Testfilters umkehren.

</Option>

#### maxParallelContexts

<Option type="number" default="os.cpus().length">

Anzahl der Tests, die gleichzeitig ausgeführt werden, wenn [`parallelMode`](#parallelmode) gesetzt ist. Siehe [Parallele Tests in einer Spec-Datei](./ParallelTests.md#options).

</Option>

#### parallelMode

<Option type="'contexts' | 'userContexts'" default="undefined">

Die Tests einer Spec-Datei gleichzeitig ausführen, jeweils in einem eigenen WebDriver-BiDi-Browsing-Context. `'contexts'` teilt Cookies und Storage zwischen den Tests, `'userContexts'` isoliert sie. Erfordert die Capability `'wdio:experimentalBiDiCommands': true`. `bail` und `retries` werden in diesem Modus nicht unterstützt. Siehe [Parallele Tests in einer Spec-Datei](./ParallelTests.md).

</Option>

#### retries

<Option type="number" default="0">

Anzahl der Wiederholungsversuche für fehlgeschlagene Tests.

</Option>

#### timeout

<Option type="number" default="30000">

Timeout-Schwellenwert (in ms).

</Option>

## Jasmine verwenden

Installieren Sie zunächst das Adapter-Paket von NPM:

```bash npm2yarn
npm install @wdio/jasmine-framework --save-dev
```

Anschließend können Sie Ihre Jasmine-Umgebung konfigurieren, indem Sie in Ihrer Konfiguration die Eigenschaft `jasmineOpts` setzen. Eine Liste aller Optionen finden Sie auf der [Website des Jasmine-Projekts](https://jasmine.github.io/api/edge/Configuration.html).

### Jasmine-Optionen

Die folgenden Optionen können in Ihrer `wdio.conf.js` über die Eigenschaft `jasmineOpts` angewendet werden, um Ihre Jasmine-Umgebung zu konfigurieren. Weitere Informationen zu diesen Konfigurationsoptionen finden Sie in der [Jasmine-Dokumentation](https://jasmine.github.io/api/edge/Configuration). Sie können diese Framework-Optionen als Argumente übergeben, z. B.:

```sh
wdio run wdio.conf.ts --jasmineOpts.grep "my test" --jasmineOpts.failSpecWithNoExpectations --no-jasmineOpts.random
```

Dadurch werden die folgenden Jasmine-Optionen übergeben:

```ts
{
    grep: 'my test',
    failSpecWithNoExpectations: true,
    random: false
}
```

Die folgenden Jasmine-Optionen werden unterstützt:

#### defaultTimeoutInterval

<Option type="number" default="60000">

Standard-Timeout-Intervall für Jasmine-Operationen.

</Option>

#### helpers

<Option type="string[]" default="[]">

Array von Dateipfaden (und Globs) relativ zu spec_dir, die vor den Jasmine-Specs eingebunden werden.

</Option>

#### requires

<Option type="string[]" default="[]">

Die Option `requires` ist nützlich, wenn Sie grundlegende Funktionalität hinzufügen oder erweitern möchten.

</Option>

#### random

<Option type="boolean" default="false">

Ob die Ausführungsreihenfolge der Specs zufällig sein soll. Jasmines eigener Standardwert ist `true`, aber WebdriverIO führt die Specs der Reihe nach aus, sofern Sie diese Option nicht setzen.

</Option>

#### seed

<Option type="Function" default="null">

Seed, der als Grundlage für die Randomisierung verwendet wird. Null bewirkt, dass der Seed zu Beginn der Ausführung zufällig bestimmt wird.

</Option>

#### failSpecWithNoExpectations

<Option type="boolean" default="false">

Ob die Spec fehlschlagen soll, wenn sie keine Expectations ausgeführt hat. Standardmäßig wird eine Spec, die keine Expectations ausgeführt hat, als bestanden gemeldet. Wenn Sie dies auf true setzen, wird eine solche Spec als Fehlschlag gemeldet.

</Option>

#### oneFailurePerSpec

<Option type="boolean" default="false">

Eine Spec bei ihrer ersten fehlgeschlagenen Expectation stoppen. Ein fehlgeschlagener synchroner Matcher stoppt die Spec sofort, und ein mit await erwarteter asynchroner Matcher stoppt sie, sobald sein Promise abgeschlossen ist. Die anderen Specs werden weiter ausgeführt.

</Option>

#### specFilter

<Option type="Function" default="(spec) => true">

Funktion zum Filtern von Specs.

</Option>

#### grep

<Option type="string|Regexp" default="null">

Nur Tests ausführen, die zu diesem String oder regulären Ausdruck passen. (Nur anwendbar, wenn keine benutzerdefinierte `specFilter`-Funktion gesetzt ist)

</Option>

#### invertGrep

<Option type="boolean" default="false">

Wenn true, werden die passenden Tests umgekehrt und nur Tests ausgeführt, die nicht zu dem in `grep` verwendeten Ausdruck passen. (Nur anwendbar, wenn keine benutzerdefinierte `specFilter`-Funktion gesetzt ist)

</Option>

#### stopOnSpecFailure

<Option type="boolean" default="false">

Die Spec-Datei bei ihrer ersten fehlgeschlagenen Spec (`it`) stoppen: Die anderen Specs der Datei werden nicht ausgeführt, auch nicht in anderen `describe`-Blöcken. Andere Spec-Dateien laufen in ihren eigenen Workern und werden fortgesetzt.

</Option>

#### cleanStack

<Option type="boolean" default="true">

Die Zeilen von `node_modules`-Paketen aus den Stacktraces von Fehlschlägen entfernen.

</Option>

#### expectationResultHandler

<Option type="Function" default="null">

Wird für jede Expectation mit `(passed, assertion)` aufgerufen, zum Beispiel um einen Screenshot zu erstellen, wenn eine Expectation fehlschlägt. Wenn die Funktion bei einer bestandenen Expectation einen Fehler wirft, schlägt die Expectation mit diesem Fehler fehl.

</Option>

### Assertions

Mit Jasmine kombiniert das globale `expect` die Matcher von Jasmine und die [WebdriverIO-Matcher](/docs/api/expect-webdriverio):

- Die Matcher von Jasmine (`toBe`, `toEqual`, `toHaveBeenCalled`, …) und die Matcher, die Sie mit `jasmine.addMatchers` hinzufügen, sind synchron. Sie geben `undefined` zurück, daher benötigen Sie kein `await`.
- WebdriverIO-Matcher, die asynchronen Matcher von Jasmine (`toBeResolved`, `toBeRejectedWith`, …) und die Matcher, die Sie mit `jasmine.addAsyncMatchers` hinzufügen, geben ein Promise zurück. Verwenden Sie bei ihnen immer `await`.

Verwenden Sie `expect()` für beide Arten: Es leitet jeden Matcher für Sie an Jasmines `expect` oder `expectAsync` weiter. `await expectAsync($('#logo')).toBeDisplayed()` funktioniert ebenfalls. Für TypeScript stellt `@wdio/jasmine-framework` in `types` die WebdriverIO-Matcher auch für `expectAsync()` bereit.

```js
it('checks the page', async () => {
    expect([1, 2]).toHaveSize(2)                                   // Jasmine, synchron
    await expect($('#logo')).toHaveSize({ width: 32, height: 32 }) // WebdriverIO, asynchron
    await expect(loadData()).toBeResolved()                        // asynchroner Jasmine-Matcher
})
```

`toHaveSize` existiert in beiden Bibliotheken. Der WebdriverIO-Matcher wird bei WebdriverIO-Werten ausgeführt: einem Element, einem Element-Array oder `Element[]` (zum Beispiel dem Ergebnis von `$$().filter()`), einem Multiremote-Element, einem Browser, einem Browsing-Context, einem Mock, dem `some()`-Wrapper oder einem Promise wie einem verkettbaren `$()`. Der Matcher von Jasmine wird bei allen anderen Werten ausgeführt.

Die asymmetrischen Matcher beider Bibliotheken funktionieren, sowohl in Jasmine- als auch in WebdriverIO-Matchern: `jasmine.any()`, `jasmine.objectContaining()`, `jasmine.stringMatching()`, … sowie `expect.any()`, `expect.stringContaining()`, `expect.oneOf()`, `expect.multiRemote()`, `expect.not.stringContaining()`, …. Um `some()` zu verwenden, importieren Sie es:

```js
import { some } from 'expect-webdriverio/api'

await expect(some($$('li'))).toHaveAttribute('data-state', 'on')
```

Die Jest-Teile von `expect` sind mit Jasmine nicht verfügbar: reine Jest-Matcher wie `toStrictEqual` oder `toHaveLength` sowie `expect.soft()`. Um einen benutzerdefinierten Matcher hinzuzufügen, verwenden Sie `expect.extend()` in einer Spec-Datei oder im `before`-Hook (siehe [Benutzerdefinierte Matcher](/docs/custommatchers)), oder `jasmine.addMatchers` für einen synchronen Matcher und `jasmine.addAsyncMatchers` für einen asynchronen Matcher.

Für TypeScript fügen Sie `jasmine` zu `types` hinzu, siehe [TypeScript-Einrichtung](/docs/typescript).

## Cucumber verwenden

Installieren Sie zunächst das Adapter-Paket von NPM:

```bash npm2yarn
npm install @wdio/cucumber-framework --save-dev
```

Wenn Sie Cucumber verwenden möchten, setzen Sie die Eigenschaft `framework` auf `cucumber`, indem Sie `framework: 'cucumber'` zur [Konfigurationsdatei](configurationfile) hinzufügen.

Optionen für Cucumber können in der Konfigurationsdatei mit `cucumberOpts` angegeben werden. Die vollständige Liste der Optionen finden Sie [hier](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options). Der Adapter verwendet Cucumber 13. `tagExpression` wurde entfernt; filtern Sie mit `tags`. Siehe den [v10-Migrationsleitfaden](v10-migration#cucumber).

Um schnell mit Cucumber loszulegen, werfen Sie einen Blick auf unser [`cucumber-boilerplate`](https://github.com/webdriverio/cucumber-boilerplate)-Projekt, das alle Step-Definitionen enthält, die Sie für den Einstieg benötigen, sodass Sie sofort Feature-Dateien schreiben können.

### Cucumber-Optionen

Die folgenden Optionen können in Ihrer `wdio.conf.js` über die Eigenschaft `cucumberOpts` angewendet werden, um Ihre Cucumber-Umgebung zu konfigurieren:

:::tip Optionen über die Kommandozeile anpassen
Die `cucumberOpts`, wie z. B. benutzerdefinierte `tags` zum Filtern von Tests, können über die Kommandozeile angegeben werden. Dies geschieht im Format `cucumberOpts.{optionName}="value"`.

Wenn Sie beispielsweise nur die Tests ausführen möchten, die mit `@smoke` getaggt sind, können Sie den folgenden Befehl verwenden:

```sh
# Wenn Sie nur Tests ausführen möchten, die den Tag "@smoke" tragen
npx wdio run ./wdio.conf.js --cucumberOpts.tags="@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.name="some scenario name" --cucumberOpts.failFast
```

Dieser Befehl setzt die Option `tags` in `cucumberOpts` auf `@smoke` und stellt so sicher, dass nur Tests mit diesem Tag ausgeführt werden.

:::

#### backtrace

<Option type="Boolean" default="false">

Vollständigen Backtrace für Fehler anzeigen.

</Option>

#### requireModule

<Option type="string[]" default="[]">

Module laden, bevor Support-Dateien geladen werden.

</Option>
Beispiel:

```js
cucumberOpts: {
    requireModule: ['@babel/register']
    // oder
    requireModule: [
        [
            '@babel/register',
            {
                rootMode: 'upward',
                ignore: ['node_modules']
            }
        ]
    ]
 }
 ```

#### failFast

<Option type="boolean" default="false">

Den Lauf beim ersten Fehlschlag abbrechen.

</Option>

#### name

<Option type="RegExp[]" default="[]">

Nur die Szenarien ausführen, deren Name zum Ausdruck passt (wiederholbar).

</Option>

#### require

<Option type="string[]" default="[]">

Dateien mit Ihren Step-Definitionen laden, bevor Features ausgeführt werden. Sie können auch einen Glob für Ihre Step-Definitionen angeben.

</Option>
Beispiel:

```js
cucumberOpts: {
    require: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### import

<Option type="String[]" default="[]">

Pfade zu Ihrem Support-Code, für ESM.

</Option>
Beispiel:

```js
cucumberOpts: {
    import: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### strict

<Option type="boolean" default="false">

Den Lauf bei einem ausstehenden Step fehlschlagen lassen. Ein undefinierter Step lässt den Lauf auch ohne `strict` fehlschlagen, es sei denn, [`ignoreUndefinedDefinitions`](#ignoreundefineddefinitions) ist `true`.

</Option>

#### tags

<Option type="String" default="">

Nur die Features oder Szenarien ausführen, deren Tags zum Ausdruck passen. Eine Feature-Datei ohne passendes Szenario wird als übersprungen gemeldet und startet keine Browser-Session.
Weitere Details finden Sie in der [Cucumber-Dokumentation](https://docs.cucumber.io/cucumber/api/#tag-expressions).

</Option>

#### timeout

<Option type="Number" default="60000">

Timeout in Millisekunden für Step-Definitionen.

</Option>

#### retry

<Option type="Number" default="0">

Anzahl der Wiederholungsversuche für fehlschlagende Testfälle angeben.

</Option>

#### retryTagFilter

<Option type="String">

Nur die Szenarien wiederholen, deren Tags zum Tag-Ausdruck passen. Erfordert [`retry`](#retry).

</Option>

#### language

<Option type="String" default="en">

Standardsprache für Ihre Feature-Dateien

</Option>

#### order

<Option type="String" default="defined">

Die Szenarien in der Reihenfolge der Feature-Dateien (`'defined'`) oder in zufälliger Reihenfolge (`'random'`) ausführen. Mit `'random:<seed>'`, zum Beispiel `'random:42'`, ist eine zufällige Reihenfolge bei jedem Lauf gleich. Mit `'random'` zeigt das Log den Seed des Laufs an (`Random order using seed: 42`).

</Option>

#### format

<Option type="string[]">

Name und Ausgabedateipfad des zu verwendenden Formatters.
WebdriverIO unterstützt in erster Linie nur die [Formatter](https://github.com/cucumber/cucumber-js/blob/main/docs/formatters.md), die ihre Ausgabe in eine Datei schreiben. Formatter werden mit [`parallelMode`](#parallelmode-1) nicht ausgeführt.

</Option>

#### formatOptions

<Option type="object">

Optionen, die an Formatter übergeben werden

</Option>

#### tagsInTitle

<Option type="Boolean" default="false">

Cucumber-Tags zum Feature- oder Szenarionamen hinzufügen

</Option>
***Bitte beachten Sie, dass dies eine spezifische Option von @wdio/cucumber-framework ist und von cucumber-js selbst nicht erkannt wird***<br/>

#### ignoreUndefinedDefinitions

<Option type="Boolean" default="false">

Einen undefinierten Step als ausstehend melden, mit ` (undefined step)` am Ende seines Titels, und den Lauf deswegen nicht fehlschlagen lassen.

</Option>
***Bitte beachten Sie, dass dies eine spezifische Option von @wdio/cucumber-framework ist und von cucumber-js selbst nicht erkannt wird***<br/>

#### failAmbiguousDefinitions

<Option type="Boolean" default="false">

Einen mehrdeutigen Step (einen Step, der zu mehr als einer Step-Definition passt) als fehlgeschlagen melden, zusammen mit der Liste der passenden Step-Definitionen. Mit `false` wird der Step als übersprungen gemeldet, mit der Liste als Begründung. In beiden Fällen schlägt der Lauf fehl. Ausnahme: Ohne `parallelMode` ist der Lauf mit `ignoreUndefinedDefinitions: true` und `failAmbiguousDefinitions: false` erfolgreich.

</Option>
***Bitte beachten Sie, dass dies eine spezifische Option von @wdio/cucumber-framework ist und von cucumber-js selbst nicht erkannt wird***<br/>

#### profiles

<Option type="string[]" default="[]">

Die zu verwendenden Profile der Cucumber-Konfigurationsdatei.

</Option>
***Bitte beachten Sie, dass innerhalb von Profilen nur bestimmte Werte (worldParameters, name, retryTagFilter) unterstützt werden, da `cucumberOpts` Vorrang hat. Stellen Sie außerdem bei Verwendung eines Profils sicher, dass die genannten Werte nicht in `cucumberOpts` deklariert sind.***

#### file

<Option type="string | false" default="undefined">

Pfad der zu ladenden Cucumber-Konfigurationsdatei oder `false`, um keine zu laden. Ohne diese Option sucht Cucumber nach seinen Standard-Konfigurationsdateien.

</Option>

#### dryRun

<Option type="Boolean" default="false">

Keinen Step und keinen Hook ausführen: Cucumber gleicht nur jeden Step mit seinen Step-Definitionen ab, sodass undefinierte und mehrdeutige Steps weiterhin gemeldet werden. Der Lauf schlägt nicht fehl.

</Option>

#### worldParameters

<Option type="object" default="{}">

Parameter für Ihre World, als `this.parameters`.

</Option>

#### scenarioLevelReporter

<Option type="Boolean" default="false">

Jedes Szenario als einen Test melden. Seine Steps und Hooks werden nicht gemeldet.

</Option>
***Bitte beachten Sie, dass dies eine spezifische Option von @wdio/cucumber-framework ist und von cucumber-js selbst nicht erkannt wird***<br/>

#### parallelMode

<Option type="'contexts' | 'userContexts'" default="undefined">

Die Szenarien einer Feature-Datei gleichzeitig ausführen, jeweils in einem eigenen WebDriver-BiDi-Browsing-Context. `'contexts'` teilt Cookies und Storage zwischen den Szenarien, `'userContexts'` isoliert sie. Erfordert die Capability `'wdio:experimentalBiDiCommands': true`. Siehe [Parallele Tests in einer Spec-Datei](./ParallelTests.md).

</Option>
***Bitte beachten Sie, dass dies eine spezifische Option von @wdio/cucumber-framework ist und von cucumber-js selbst nicht erkannt wird***<br/>

#### maxParallelContexts

<Option type="number" default="os.cpus().length">

Anzahl der Szenarien, die gleichzeitig ausgeführt werden, wenn [`parallelMode`](#parallelmode-1) gesetzt ist. Siehe [Parallele Tests in einer Spec-Datei](./ParallelTests.md#options).

</Option>
***Bitte beachten Sie, dass dies eine spezifische Option von @wdio/cucumber-framework ist und von cucumber-js selbst nicht erkannt wird***<br/>

### Tests in Cucumber überspringen

Beachten Sie: Wenn Sie einen Test mithilfe der regulären Cucumber-Testfilterfunktionen in `cucumberOpts` überspringen möchten, tun Sie dies für alle in den Capabilities konfigurierten Browser und Geräte. Um Szenarien nur für bestimmte Kombinationen von Capabilities überspringen zu können, ohne dass unnötigerweise eine Session gestartet wird, stellt WebdriverIO die folgende spezielle Tag-Syntax für Cucumber bereit:

`@skip([condition])`

wobei condition eine optionale Kombination von Capability-Eigenschaften mit ihren Werten ist, die – wenn **alle** zutreffen – dazu führt, dass das getaggte Szenario oder Feature übersprungen wird. Natürlich können Sie Szenarien und Features mehrere Tags hinzufügen, um einen Test unter verschiedenen Bedingungen zu überspringen.

Sie können die Annotation '@skip' auch verwenden, um Tests zu überspringen, ohne `tags` zu ändern. In diesem Fall werden die übersprungenen Tests im Testbericht angezeigt.

Hier einige Beispiele für diese Syntax:
- `@skip` oder `@skip()`: überspringt das getaggte Element immer
- `@skip(browserName="chrome")`: Der Test wird nicht in Chrome-Browsern ausgeführt.
- `@skip(browserName="firefox";platformName="linux")`: überspringt den Test bei Ausführungen in Firefox unter Linux.
- `@skip(browserName=["chrome","firefox"])`: Getaggte Elemente werden sowohl für Chrome- als auch für Firefox-Browser übersprungen.
- `@skip(browserName=/i.*explorer/)`: Capabilities mit Browsern, die zum regulären Ausdruck passen, werden übersprungen (wie `iexplorer`, `internet explorer`, `internet-explorer`, ...).

### Step-Definition-Helper importieren

Um Step-Definition-Helper wie `Given`, `When` oder `Then` oder Hooks zu verwenden, sollten Sie diese aus `@cucumber/cucumber` importieren, z. B. so:

```js
import { Given, When, Then } from '@cucumber/cucumber'
```

Wenn Sie Cucumber bereits für andere, nicht mit WebdriverIO zusammenhängende Testarten verwenden, für die Sie eine bestimmte Version nutzen, müssen Sie diese Helper in Ihren E2E-Tests aus dem WebdriverIO-Cucumber-Paket importieren, z. B.:

```js
import { Given, When, Then, world, context } from '@wdio/cucumber-framework'
```

Dadurch wird sichergestellt, dass Sie innerhalb des WebdriverIO-Frameworks die richtigen Helper verwenden, und Sie können eine unabhängige Cucumber-Version für andere Testarten verwenden.

### Bericht veröffentlichen

Cucumber bietet eine Funktion, um Ihre Testlauf-Berichte auf `https://reports.cucumber.io/` zu veröffentlichen. Dies kann entweder durch Setzen des Flags `publish` in `cucumberOpts` oder durch Konfigurieren der Umgebungsvariable `CUCUMBER_PUBLISH_TOKEN` gesteuert werden. Wenn Sie jedoch `WebdriverIO` zur Testausführung verwenden, gibt es bei diesem Ansatz eine Einschränkung: Die Berichte werden für jede Feature-Datei separat aktualisiert, was es schwierig macht, einen konsolidierten Bericht anzuzeigen.

Um diese Einschränkung zu umgehen, haben wir eine Promise-basierte Methode namens `publishCucumberReport` in `@wdio/cucumber-framework` eingeführt. Diese Methode sollte im `onComplete`-Hook aufgerufen werden, der der optimale Ort dafür ist. `publishCucumberReport` benötigt als Eingabe das Berichtsverzeichnis, in dem die Cucumber-Message-Berichte gespeichert sind.

Sie können `cucumber message`-Berichte erzeugen, indem Sie die Option `format` in Ihren `cucumberOpts` konfigurieren. Es wird dringend empfohlen, in der `cucumber message`-Formatoption einen dynamischen Dateinamen anzugeben, um das Überschreiben von Berichten zu verhindern und sicherzustellen, dass jeder Testlauf korrekt erfasst wird.

Bevor Sie diese Funktion verwenden, stellen Sie sicher, dass die folgenden Umgebungsvariablen gesetzt sind:
- CUCUMBER_PUBLISH_REPORT_URL: Die URL, unter der Sie den Cucumber-Bericht veröffentlichen möchten. Wenn sie nicht angegeben wird, wird die Standard-URL 'https://messages.cucumber.io/api/reports' verwendet.
- CUCUMBER_PUBLISH_REPORT_TOKEN: Das Autorisierungstoken, das zum Veröffentlichen des Berichts erforderlich ist. Wenn dieses Token nicht gesetzt ist, wird die Funktion beendet, ohne den Bericht zu veröffentlichen.

Hier ein Beispiel für die notwendigen Konfigurationen und Codebeispiele zur Umsetzung:

```javascript
import { v4 as uuidv4 } from 'uuid'
import { publishCucumberReport } from '@wdio/cucumber-framework';

export const config = {
    // ... Weitere Konfigurationsoptionen
    cucumberOpts: {
        // ... Konfiguration der Cucumber-Optionen
        format: [
            ['message', `./reports/${uuidv4()}.ndjson`],
            ['json', './reports/test-report.json']
        ]
    },
    async onComplete() {
        await publishCucumberReport('./reports');
    }
}
```

Bitte beachten Sie, dass `./reports/` das Verzeichnis ist, in dem die `cucumber message`-Berichte gespeichert werden.

## Serenity/JS verwenden

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) ist ein Open-Source-Framework, das Akzeptanz- und Regressionstests komplexer Softwaresysteme schneller, kollaborativer und leichter skalierbar machen soll.

Für WebdriverIO-Testsuiten bietet Serenity/JS:
- [Erweitertes Reporting](https://serenity-js.org/handbook/reporting/?pk_campaign=wdio8&pk_source=webdriver.io) – Sie können Serenity/JS
  als direkten Ersatz für jedes integrierte WebdriverIO-Framework verwenden, um detaillierte Testausführungsberichte und eine lebendige Dokumentation Ihres Projekts zu erstellen.
- [Screenplay-Pattern-APIs](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) – Um Ihren Testcode über Projekte und Teams hinweg portabel und wiederverwendbar zu machen,
  bietet Ihnen Serenity/JS eine optionale [Abstraktionsschicht](https://serenity-js.org/api/webdriverio?pk_campaign=wdio8&pk_source=webdriver.io) über den nativen WebdriverIO-APIs.
- [Integrationsbibliotheken](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io) – Für Testsuiten, die dem Screenplay Pattern folgen,
  stellt Serenity/JS außerdem optionale Integrationsbibliotheken bereit, die Ihnen helfen, [API-Tests](https://serenity-js.org/api/rest/?pk_campaign=wdio8&pk_source=webdriver.io) zu schreiben,
  [lokale Server zu verwalten](https://serenity-js.org/api/local-server/?pk_campaign=wdio8&pk_source=webdriver.io), [Assertions durchzuführen](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io) und vieles mehr!

![Serenity BDD Report Example](/img/serenity-bdd-reporter.png)

### Serenity/JS installieren

Um Serenity/JS zu einem [bestehenden WebdriverIO-Projekt](https://webdriver.io/docs/gettingstarted) hinzuzufügen, installieren Sie die folgenden Serenity/JS-Module von NPM:

```sh npm2yarn
npm install @serenity-js/{core,web,webdriverio,assertions,console-reporter,serenity-bdd} --save-dev
```

Erfahren Sie mehr über die Serenity/JS-Module:
- [`@serenity-js/core`](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/web`](https://serenity-js.org/api/web/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/webdriverio`](https://serenity-js.org/api/webdriverio/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/assertions`](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/console-reporter`](https://serenity-js.org/api/console-reporter/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)

### Serenity/JS konfigurieren

Um die Integration mit Serenity/JS zu aktivieren, konfigurieren Sie WebdriverIO wie folgt:

<Tabs>
<TabItem value="wdio-conf-typescript" label="TypeScript" default>

```typescript title="wdio.conf.ts"
import { WebdriverIOConfig } from '@serenity-js/webdriverio';

export const config: WebdriverIOConfig = {

    // WebdriverIO anweisen, das Serenity/JS-Framework zu verwenden
    framework: '@serenity-js/webdriverio',

    // Serenity/JS-Konfiguration
    serenity: {
        // Serenity/JS so konfigurieren, dass der passende Adapter für Ihren Testrunner verwendet wird
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Serenity/JS-Reporting-Services registrieren, auch bekannt als die "stage crew"
        crew: [
            // Optional, Testausführungsergebnisse auf der Standardausgabe ausgeben
            '@serenity-js/console-reporter',

            // Optional, Serenity BDD-Berichte und lebendige Dokumentation (HTML) erzeugen
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],

            // Optional, bei fehlgeschlagener Interaktion automatisch Screenshots aufnehmen
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Ihren Cucumber-Runner konfigurieren
    cucumberOpts: {
        // siehe Cucumber-Konfigurationsoptionen unten
    },

    // ... oder Jasmine-Runner
    jasmineOpts: {
        // siehe Jasmine-Konfigurationsoptionen unten
    },

    // ... oder Mocha-Runner
    mochaOpts: {
        // siehe Mocha-Konfigurationsoptionen unten
    },

    runner: 'local',

    // Beliebige weitere WebdriverIO-Konfiguration
};
```

</TabItem>
<TabItem value="wdio-conf-javascript" label="JavaScript">

```typescript title="wdio.conf.js"
export const config = {

    // WebdriverIO anweisen, das Serenity/JS-Framework zu verwenden
    framework: '@serenity-js/webdriverio',

    // Serenity/JS-Konfiguration
    serenity: {
        // Serenity/JS so konfigurieren, dass der passende Adapter für Ihren Testrunner verwendet wird
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Serenity/JS-Reporting-Services registrieren, auch bekannt als die "stage crew"
        crew: [
            '@serenity-js/console-reporter',
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Ihren Cucumber-Runner konfigurieren
    cucumberOpts: {
        // siehe Cucumber-Konfigurationsoptionen unten
    },

    // ... oder Jasmine-Runner
    jasmineOpts: {
        // siehe Jasmine-Konfigurationsoptionen unten
    },

    // ... oder Mocha-Runner
    mochaOpts: {
        // siehe Mocha-Konfigurationsoptionen unten
    },

    runner: 'local',

    // Beliebige weitere WebdriverIO-Konfiguration
};
```

</TabItem>
</Tabs>

Erfahren Sie mehr über:
- [Serenity/JS-Cucumber-Konfigurationsoptionen](https://serenity-js.org/api/cucumber-adapter/interface/CucumberConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Serenity/JS-Jasmine-Konfigurationsoptionen](https://serenity-js.org/api/jasmine-adapter/interface/JasmineConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Serenity/JS-Mocha-Konfigurationsoptionen](https://serenity-js.org/api/mocha-adapter/interface/MochaConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [WebdriverIO-Konfigurationsdatei](configurationfile)

### Serenity BDD-Berichte und lebendige Dokumentation erzeugen

[Serenity BDD-Berichte und lebendige Dokumentation](https://serenity-bdd.github.io/docs/reporting/the_serenity_reports) werden von der [Serenity BDD CLI](https://github.com/serenity-bdd/serenity-core/tree/main/serenity-cli) erzeugt,
einem Java-Programm, das vom Modul [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io) heruntergeladen und verwaltet wird.

Um Serenity BDD-Berichte zu erzeugen, muss Ihre Testsuite:
- die Serenity BDD CLI herunterladen, indem `serenity-bdd update` aufgerufen wird, wodurch die CLI-`jar` lokal zwischengespeichert wird
- Serenity BDD-Zwischenberichte im `.json`-Format erzeugen, indem [`SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io) gemäß den [Konfigurationsanweisungen](#configuring-serenityjs) registriert wird
- die Serenity BDD CLI aufrufen, wenn Sie den Bericht erzeugen möchten, indem `serenity-bdd run` aufgerufen wird

Das Muster, das von allen [Serenity/JS-Projektvorlagen](https://serenity-js.org/handbook/project-templates/?pk_campaign=wdio8&pk_source=webdriver.io#webdriverio) verwendet wird, basiert
auf der Verwendung von:
- einem [`postinstall`](https://docs.npmjs.com/cli/v9/using-npm/scripts#life-cycle-operation-order)-NPM-Skript zum Herunterladen der Serenity BDD CLI
- [`npm-failsafe`](https://www.npmjs.com/package/npm-failsafe), um den Reporting-Prozess auch dann auszuführen, wenn die Testsuite selbst fehlgeschlagen ist (also genau dann, wenn Sie Testberichte am dringendsten benötigen...).
- [`rimraf`](https://www.npmjs.com/package/rimraf) als praktische Methode, um alle vom vorherigen Lauf übrig gebliebenen Testberichte zu entfernen

```json title="package.json"
{
  "scripts": {
    "postinstall": "serenity-bdd update",
    "clean": "rimraf target",
    "test": "failsafe clean test:execute test:report",
    "test:execute": "wdio wdio.conf.ts",
    "test:report": "serenity-bdd run"
  }
}
```

Um mehr über den `SerenityBDDReporter` zu erfahren, konsultieren Sie bitte:
- die Installationsanweisungen in der [`@serenity-js/serenity-bdd`-Dokumentation](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io),
- die Konfigurationsbeispiele in der [`SerenityBDDReporter`-API-Dokumentation](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io),
- die [Serenity/JS-Beispiele auf GitHub](https://github.com/serenity-js/serenity-js/tree/main/examples).

### Serenity/JS-Screenplay-Pattern-APIs verwenden

Das [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) ist ein innovativer, nutzerzentrierter Ansatz zum Schreiben hochwertiger automatisierter Akzeptanztests. Es leitet Sie zu einem effektiven Einsatz von Abstraktionsschichten an,
hilft Ihren Testszenarien, die Fachsprache Ihrer Domäne abzubilden, und fördert gute Test- und Software-Engineering-Gewohnheiten in Ihrem Team.

Wenn Sie `@serenity-js/webdriverio` als Ihr WebdriverIO-`framework` registrieren,
konfiguriert Serenity/JS standardmäßig einen [Cast](https://serenity-js.org/api/core/class/Cast/?pk_campaign=wdio8&pk_source=webdriver.io) von [Actors](https://serenity-js.org/api/core/class/Actor/?pk_campaign=wdio8&pk_source=webdriver.io),
wobei jeder Actor Folgendes kann:
- [`BrowseTheWebWithWebdriverIO`](https://serenity-js.org/api/webdriverio/class/BrowseTheWebWithWebdriverIO/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`TakeNotes.usingAnEmptyNotepad()`](https://serenity-js.org/api/core/class/TakeNotes/?pk_campaign=wdio8&pk_source=webdriver.io)

Dies sollte ausreichen, um Ihnen den Einstieg zu erleichtern und Testszenarien, die dem Screenplay Pattern folgen, sogar in eine bestehende Testsuite einzuführen, zum Beispiel:

```typescript title="specs/example.spec.ts"
import { actorCalled } from '@serenity-js/core'
import { Navigate, Page } from '@serenity-js/web'
import { Ensure, equals } from '@serenity-js/assertions'

describe('My awesome website', () => {
    it('can have test scenarios that follow the Screenplay Pattern', async () => {
        await actorCalled('Alice').attemptsTo(
            Navigate.to(`https://webdriver.io`),
            Ensure.that(
                Page.current().title(),
                equals(`WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO`)
            ),
        )
    })

    it('can have non-Screenplay scenarios too', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser)
            .toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

Um mehr über das Screenplay Pattern zu erfahren, sehen Sie sich Folgendes an:
- [Das Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Web-Testing mit Serenity/JS](https://serenity-js.org/handbook/web-testing/?pk_campaign=wdio8&pk_source=webdriver.io)
- ["BDD in Action, Second Edition"](https://www.manning.com/books/bdd-in-action-second-edition)