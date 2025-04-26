---
id: organizingsuites
title: Test-Suite organisieren
---

Mit dem Wachstum von Projekten werden unweigerlich immer mehr Integrationstests hinzugefügt. Dies erhöht die Build-Zeit und verlangsamt die Produktivität.

Um dies zu verhindern, sollten Sie Ihre Tests parallel ausführen. WebdriverIO testet bereits jede Spec (oder _Feature-Datei_ in Cucumber) parallel innerhalb einer einzelnen Sitzung. Im Allgemeinen sollten Sie versuchen, nur ein einzelnes Feature pro Spec-Datei zu testen. Versuchen Sie, nicht zu viele oder zu wenige Tests in einer Datei zu haben. (Es gibt jedoch keine goldene Regel hierfür.)

Sobald Ihre Tests mehrere Spec-Dateien haben, sollten Sie beginnen, Ihre Tests gleichzeitig auszuführen. Passen Sie dazu die Eigenschaft `maxInstances` in Ihrer Konfigurationsdatei an. WebdriverIO ermöglicht es Ihnen, Ihre Tests mit maximaler Parallelität auszuführen – das bedeutet, dass unabhängig davon, wie viele Dateien und Tests Sie haben, alle parallel ausgeführt werden können. (Dies unterliegt immer noch bestimmten Einschränkungen, wie der CPU Ihres Computers, Parallelitätsbeschränkungen usw.)

> Angenommen, Sie haben 3 verschiedene Capabilities (Chrome, Firefox und Safari) und Sie haben `maxInstances` auf `1` gesetzt. Der WDIO-Testrunner wird 3 Prozesse starten. Wenn Sie also 10 Spec-Dateien haben und `maxInstances` auf `10` setzen, werden _alle_ Spec-Dateien gleichzeitig getestet und 30 Prozesse gestartet.

Sie können die Eigenschaft `maxInstances` global definieren, um das Attribut für alle Browser festzulegen.

Wenn Sie Ihr eigenes WebDriver-Grid betreiben, haben Sie möglicherweise (zum Beispiel) mehr Kapazität für einen Browser als für einen anderen. In diesem Fall können Sie `maxInstances` in Ihrem Capability-Objekt _begrenzen_:

```js
// wdio.conf.js
export const config = {
    // ...
    // set maxInstance for all browser
    maxInstances: 10,
    // ...
    capabilities: [{
        browserName: 'firefox'
    }, {
        // maxInstances can get overwritten per capability. So if you have an in-house WebDriver
        // grid with only 5 firefox instance available you can make sure that not more than
        // 5 instance gets started at a time.
        browserName: 'chrome'
    }],
    // ...
}
```

## Von der Hauptkonfigurationsdatei erben

Wenn Sie Ihre Testsuite in mehreren Umgebungen ausführen (z.B. Entwicklung und Integration), kann es hilfreich sein, mehrere Konfigurationsdateien zu verwenden, um die Verwaltung zu erleichtern.

Ähnlich wie beim [Page-Object-Konzept](pageobjects) benötigen Sie zunächst eine Hauptkonfigurationsdatei. Sie enthält alle Konfigurationen, die Sie über Umgebungen hinweg teilen.

Erstellen Sie dann eine weitere Konfigurationsdatei für jede Umgebung und ergänzen Sie die Hauptkonfiguration mit den umgebungsspezifischen:

```js
// wdio.dev.config.js
import { deepmerge } from 'deepmerge-ts'
import wdioConf from './wdio.conf.js'

// have main config file as default but overwrite environment specific information
export const config = deepmerge(wdioConf.config, {
    capabilities: [
        // more caps defined here
        // ...
    ],

    // run tests on sauce instead locally
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    services: ['sauce']
}, { clone: false })

// add an additional reporter
config.reporters.push('allure')
```

## Gruppieren von Test-Specs in Suites

Sie können Test-Specs in Suites gruppieren und einzelne spezifische Suites anstelle aller ausführen.

Definieren Sie zunächst Ihre Suites in Ihrer WDIO-Konfiguration:

```js
// wdio.conf.js
export const config = {
    // define all tests
    specs: ['./test/specs/**/*.spec.js'],
    // ...
    // define specific suites
    suites: {
        login: [
            './test/specs/login.success.spec.js',
            './test/specs/login.failure.spec.js'
        ],
        otherFeature: [
            // ...
        ]
    },
    // ...
}
```

Wenn Sie nun nur eine einzelne Suite ausführen möchten, können Sie den Suite-Namen als CLI-Argument übergeben:

```sh
wdio wdio.conf.js --suite login
```

Oder führen Sie mehrere Suites gleichzeitig aus:

```sh
wdio wdio.conf.js --suite login --suite otherFeature
```

## Gruppieren von Test-Specs zur sequentiellen Ausführung

Wie oben beschrieben, gibt es Vorteile bei der gleichzeitigen Ausführung der Tests. Es gibt jedoch Fälle, in denen es vorteilhaft wäre, Tests zu gruppieren, um sie sequentiell in einer einzigen Instanz auszuführen. Beispiele hierfür sind hauptsächlich Fälle, in denen hohe Einrichtungskosten anfallen, z.B. beim Transpilieren von Code oder bei der Bereitstellung von Cloud-Instanzen, aber es gibt auch fortgeschrittene Nutzungsmodelle, die von dieser Funktion profitieren.

Um Tests zu gruppieren, die in einer einzigen Instanz ausgeführt werden sollen, definieren Sie sie als Array innerhalb der Specs-Definition.

```json
    "specs": [
        [
            "./test/specs/test_login.js",
            "./test/specs/test_product_order.js",
            "./test/specs/test_checkout.js"
        ],
        "./test/specs/test_b*.js",
    ],
```
Im obigen Beispiel werden die Tests 'test_login.js', 'test_product_order.js' und 'test_checkout.js' sequentiell in einer einzigen Instanz ausgeführt, und jeder der "test_b*"-Tests wird gleichzeitig in einzelnen Instanzen ausgeführt.

Es ist auch möglich, in Suites definierte Specs zu gruppieren, sodass Sie Suites jetzt auch so definieren können:
```json
    "suites": {
        end2end: [
            [
                "./test/specs/test_login.js",
                "./test/specs/test_product_order.js",
                "./test/specs/test_checkout.js"
            ]
        ],
        allb: ["./test/specs/test_b*.js"]
},
```
und in diesem Fall würden alle Tests der "end2end"-Suite in einer einzigen Instanz ausgeführt werden.

Bei der sequentiellen Ausführung von Tests mit einem Muster werden die Spec-Dateien in alphabetischer Reihenfolge ausgeführt

```json
  "suites": {
    end2end: ["./test/specs/test_*.js"]
  },
```

Dies führt die Dateien, die dem obigen Muster entsprechen, in der folgenden Reihenfolge aus:

```
  [
      "./test/specs/test_checkout.js",
      "./test/specs/test_login.js",
      "./test/specs/test_product_order.js"
  ]
```

## Ausgewählte Tests ausführen

In einigen Fällen möchten Sie möglicherweise nur einen einzelnen Test (oder eine Teilmenge von Tests) Ihrer Suites ausführen.

Mit dem Parameter `--spec` können Sie angeben, welche _Suite_ (Mocha, Jasmine) oder _Feature_ (Cucumber) ausgeführt werden soll. Der Pfad wird relativ zu Ihrem aktuellen Arbeitsverzeichnis aufgelöst.

Um beispielsweise nur Ihren Login-Test auszuführen:

```sh
wdio wdio.conf.js --spec ./test/specs/e2e/login.js
```

Oder führen Sie mehrere Specs gleichzeitig aus:

```sh
wdio wdio.conf.js --spec ./test/specs/signup.js --spec ./test/specs/forgot-password.js
```

Wenn der `--spec`-Wert nicht auf eine bestimmte Spec-Datei verweist, wird er stattdessen verwendet, um die in Ihrer Konfiguration definierten Spec-Dateinamen zu filtern.

Um alle Specs mit dem Wort "dialog" in den Spec-Dateinamen auszuführen, könnten Sie Folgendes verwenden:

```sh
wdio wdio.conf.js --spec dialog
```

Beachten Sie, dass jede Testdatei in einem einzelnen Testrunner-Prozess ausgeführt wird. Da wir Dateien nicht im Voraus scannen (siehe den nächsten Abschnitt für Informationen zum Piping von Dateinamen zu `wdio`), _können_ Sie nicht (zum Beispiel) `describe.only` am Anfang Ihrer Spec-Datei verwenden, um Mocha anzuweisen, nur diese Suite auszuführen.

Diese Funktion hilft Ihnen, dasselbe Ziel zu erreichen.

Wenn die Option `--spec` angegeben wird, überschreibt sie alle Muster, die durch den Parameter `specs` auf Konfigurations- oder Capability-Ebene definiert sind.

## Ausgewählte Tests ausschließen

Bei Bedarf können Sie mit dem Parameter `--exclude` bestimmte Spec-Datei(en) (Mocha, Jasmine) oder Feature (Cucumber) von einem Lauf ausschließen.

Um beispielsweise Ihren Login-Test vom Testlauf auszuschließen:

```sh
wdio wdio.conf.js --exclude ./test/specs/e2e/login.js
```

Oder schließen Sie mehrere Spec-Dateien aus:

 ```sh
wdio wdio.conf.js --exclude ./test/specs/signup.js --exclude ./test/specs/forgot-password.js
```

Oder schließen Sie eine Spec-Datei aus, wenn Sie nach einer Suite filtern:

```sh
wdio wdio.conf.js --suite login --exclude ./test/specs/e2e/login.js
```

Wenn der `--exclude`-Wert nicht auf eine bestimmte Spec-Datei verweist, wird er stattdessen verwendet, um die in Ihrer Konfiguration definierten Spec-Dateinamen zu filtern.

Um alle Specs mit dem Wort "dialog" in den Spec-Dateinamen auszuschließen, könnten Sie Folgendes verwenden:

```sh
wdio wdio.conf.js --exclude dialog
```

Wenn die Option `--exclude` angegeben wird, überschreibt sie alle Muster, die durch den Parameter `exclude` auf Konfigurations- oder Capability-Ebene definiert sind.

## Suites und Test-Specs ausführen

Führen Sie eine gesamte Suite zusammen mit einzelnen Specs aus.

```sh
wdio wdio.conf.js --suite login --spec ./test/specs/signup.js
```

## Mehrere, spezifische Test-Specs ausführen

Es ist manchmal notwendig – im Kontext der kontinuierlichen Integration und anderweitig – mehrere Sätze von Specs anzugeben, die ausgeführt werden sollen. Das Befehlszeilenprogramm `wdio` von WebdriverIO akzeptiert über Pipe eingegebene Dateinamen (von `find`, `grep` oder anderen).

Über Pipe eingegebene Dateinamen überschreiben die Liste der Globmuster oder Dateinamen, die in der `spec`-Liste der Konfiguration angegeben sind.

```sh
grep -r -l --include "*.js" "myText" | wdio wdio.conf.js
```

_**Hinweis:** Dies wird das Flag `--spec` für die Ausführung einer einzelnen Spec_ nicht _überschreiben._

## Ausführen spezifischer Tests mit MochaOpts

Sie können auch filtern, welche spezifischen `suite|describe` und/oder `it|test` Sie ausführen möchten, indem Sie ein Mocha-spezifisches Argument übergeben: `--mochaOpts.grep` an die wdio CLI.

```sh
wdio wdio.conf.js --mochaOpts.grep myText
wdio wdio.conf.js --mochaOpts.grep "Text with spaces"
```

_**Hinweis:** Mocha filtert die Tests, nachdem der WDIO-Testrunner die Instanzen erstellt hat, sodass Sie möglicherweise mehrere Instanzen sehen, die gestartet, aber nicht tatsächlich ausgeführt werden._

## Spezifische Tests mit MochaOpts ausschließen

Sie können auch filtern, welche spezifischen `suite|describe` und/oder `it|test` Sie ausschließen möchten, indem Sie ein Mocha-spezifisches Argument übergeben: `--mochaOpts.invert` an die wdio CLI. `--mochaOpts.invert` führt das Gegenteil von `--mochaOpts.grep` aus

```sh
wdio wdio.conf.js --mochaOpts.grep "string|regex" --mochaOpts.invert
wdio wdio.conf.js --spec ./test/specs/e2e/login.js --mochaOpts.grep "string|regex" --mochaOpts.invert
```

_**Hinweis:** Mocha filtert die Tests, nachdem der WDIO-Testrunner die Instanzen erstellt hat, sodass Sie möglicherweise mehrere Instanzen sehen, die gestartet, aber nicht tatsächlich ausgeführt werden._

## Testen nach Fehlern stoppen

Mit der Option `bail` können Sie WebdriverIO anweisen, das Testen zu beenden, nachdem ein Test fehlschlägt.

Dies ist hilfreich bei großen Testsuiten, wenn Sie bereits wissen, dass Ihr Build fehlschlagen wird, aber Sie die lange Wartezeit eines vollständigen Testlaufs vermeiden möchten.

Die Option `bail` erwartet eine Zahl, die angibt, wie viele Testfehler auftreten können, bevor WebDriver den gesamten Testlauf stoppt. Der Standardwert ist `0`, was bedeutet, dass immer alle Testspezifikationen ausgeführt werden, die gefunden werden können.

Weitere Informationen zur Bail-Konfiguration finden Sie auf der [Optionsseite](configuration).
## Hierarchie der Ausführungsoptionen

Bei der Deklaration, welche Specs ausgeführt werden sollen, gibt es eine bestimmte Hierarchie, die definiert, welches Muster Vorrang hat. Derzeit funktioniert es so, von höchster Priorität zu niedrigster:

> CLI `--spec`-Argument > Capability `specs`-Muster > Konfigurations-`specs`-Muster
> CLI `--exclude`-Argument > Konfigurations-`exclude`-Muster > Capability `exclude`-Muster

Wenn nur der Konfigurationsparameter angegeben wird, wird er für alle Capabilities verwendet. Wenn Sie jedoch das Muster auf Capability-Eb