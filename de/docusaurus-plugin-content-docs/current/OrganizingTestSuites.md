---
id: organizingsuites
title: Organisation der Test-Suite
description: "Organisieren Sie eine wachsende Test-Suite, indem Sie Konfigurationsdateien teilen, Specs in Suites gruppieren, Specs sequenziell ausführen und Tests ein- oder ausschließen."
---

Wenn Projekte wachsen, werden unweigerlich immer mehr Integrationstests hinzugefügt. Dies erhöht die Build-Zeit und verringert die Produktivität.

Um dies zu verhindern, sollten Sie Ihre Tests parallel ausführen. WebdriverIO testet bereits jede Spec (oder _Feature-Datei_ in Cucumber) parallel innerhalb einer einzelnen Session. Versuchen Sie im Allgemeinen, nur ein einzelnes Feature pro Spec-Datei zu testen. Versuchen Sie, nicht zu viele oder zu wenige Tests in einer Datei zu haben. (Allerdings gibt es hier keine goldene Regel.)

Sobald Ihre Tests mehrere Spec-Dateien umfassen, sollten Sie damit beginnen, Ihre Tests gleichzeitig auszuführen. Passen Sie dazu die Eigenschaft `maxInstances` in Ihrer Konfigurationsdatei an. WebdriverIO ermöglicht es Ihnen, Ihre Tests mit maximaler Parallelität auszuführen – das bedeutet, dass unabhängig davon, wie viele Dateien und Tests Sie haben, alle parallel ausgeführt werden können. (Dies unterliegt dennoch bestimmten Grenzen, wie der CPU Ihres Computers, Parallelitätsbeschränkungen usw.)

> Angenommen, Sie haben 3 verschiedene Capabilities (Chrome, Firefox und Safari) und haben `maxInstances` auf `1` gesetzt. Der WDIO-Testrunner startet dann 3 Prozesse. Wenn Sie also 10 Spec-Dateien haben und `maxInstances` auf `10` setzen, werden _alle_ Spec-Dateien gleichzeitig getestet und 30 Prozesse gestartet.

Sie können die Eigenschaft `maxInstances` global definieren, um das Attribut für alle Browser festzulegen.

Wenn Sie Ihr eigenes WebDriver-Grid betreiben, haben Sie möglicherweise (zum Beispiel) mehr Kapazität für einen Browser als für einen anderen. In diesem Fall können Sie `maxInstances` in Ihrem Capability-Objekt _begrenzen_:

```js
// wdio.conf.js
export const config = {
    // ...
    // maxInstance für alle Browser festlegen
    maxInstances: 10,
    // ...
    capabilities: [{
        browserName: 'firefox'
    }, {
        // maxInstances kann pro Capability überschrieben werden. Wenn Sie also ein internes WebDriver-
        // Grid mit nur 5 verfügbaren Firefox-Instanzen haben, können Sie sicherstellen, dass nicht mehr als
        // 5 Instanzen gleichzeitig gestartet werden.
        browserName: 'chrome'
    }],
    // ...
}
```

## Von der Hauptkonfigurationsdatei erben

Wenn Sie Ihre Test-Suite in mehreren Umgebungen ausführen (z. B. Dev und Integration), kann es hilfreich sein, mehrere Konfigurationsdateien zu verwenden, um alles übersichtlich zu halten.

Ähnlich wie beim [Page-Object-Konzept](pageobjects) benötigen Sie zunächst eine Hauptkonfigurationsdatei. Sie enthält alle Konfigurationen, die Sie umgebungsübergreifend gemeinsam nutzen.

Erstellen Sie dann für jede Umgebung eine weitere Konfigurationsdatei und ergänzen Sie die Hauptkonfiguration um die umgebungsspezifischen Einstellungen:

```js
// wdio.dev.config.js
import { deepmerge } from 'deepmerge-ts'
import wdioConf from './wdio.conf.js'

// Hauptkonfigurationsdatei als Standard verwenden, aber umgebungsspezifische Informationen überschreiben
export const config = deepmerge(wdioConf.config, {
    capabilities: [
        // weitere Caps hier definiert
        // ...
    ],

    // Tests auf Sauce statt lokal ausführen
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    services: ['sauce']
}, { clone: false })

// einen zusätzlichen Reporter hinzufügen
config.reporters.push('allure')
```

## Test-Specs in Suites gruppieren

Sie können Test-Specs in Suites gruppieren und einzelne bestimmte Suites statt aller ausführen.

Definieren Sie zunächst Ihre Suites in Ihrer WDIO-Konfiguration:

```js
// wdio.conf.js
export const config = {
    // alle Tests definieren
    specs: ['./test/specs/**/*.spec.js'],
    // ...
    // bestimmte Suites definieren
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

Oder mehrere Suites gleichzeitig ausführen:

```sh
wdio wdio.conf.js --suite login --suite otherFeature
```

## Test-Specs zur sequenziellen Ausführung gruppieren

Wie oben beschrieben, bietet die gleichzeitige Ausführung der Tests Vorteile. Es gibt jedoch Fälle, in denen es vorteilhaft wäre, Tests zu gruppieren, um sie sequenziell in einer einzelnen Instanz auszuführen. Beispiele hierfür sind hauptsächlich Fälle mit hohen Einrichtungskosten, z. B. das Transpilieren von Code oder das Bereitstellen von Cloud-Instanzen, aber es gibt auch fortgeschrittene Nutzungsmodelle, die von dieser Möglichkeit profitieren.

Um Tests für die Ausführung in einer einzelnen Instanz zu gruppieren, definieren Sie sie als Array innerhalb der Specs-Definition.

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
Im obigen Beispiel werden die Tests 'test_login.js', 'test_product_order.js' und 'test_checkout.js' sequenziell in einer einzelnen Instanz ausgeführt, und jeder der "test_b*"-Tests wird gleichzeitig in einzelnen Instanzen ausgeführt.

Es ist auch möglich, in Suites definierte Specs zu gruppieren, sodass Sie Suites nun auch so definieren können:
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
In diesem Fall würden alle Tests der Suite "end2end" in einer einzelnen Instanz ausgeführt.

Bei der sequenziellen Ausführung von Tests mithilfe eines Musters werden die Spec-Dateien in alphabetischer Reihenfolge ausgeführt

```json
  "suites": {
    end2end: ["./test/specs/test_*.js"]
  },
```

Dadurch werden die Dateien, die dem obigen Muster entsprechen, in folgender Reihenfolge ausgeführt:

```
  [
      "./test/specs/test_checkout.js",
      "./test/specs/test_login.js",
      "./test/specs/test_product_order.js"
  ]
```

## Ausgewählte Tests ausführen

In manchen Fällen möchten Sie möglicherweise nur einen einzelnen Test (oder eine Teilmenge von Tests) Ihrer Suites ausführen.

Mit dem Parameter `--spec` können Sie angeben, welche _Suite_ (Mocha, Jasmine) oder welches _Feature_ (Cucumber) ausgeführt werden soll. Der Pfad wird relativ zu Ihrem aktuellen Arbeitsverzeichnis aufgelöst.

Um beispielsweise nur Ihren Login-Test auszuführen:

```sh
wdio wdio.conf.js --spec ./test/specs/e2e/login.js
```

Oder mehrere Specs gleichzeitig ausführen:

```sh
wdio wdio.conf.js --spec ./test/specs/signup.js --spec ./test/specs/forgot-password.js
```

Wenn der Wert von `--spec` nicht auf eine bestimmte Spec-Datei verweist, wird er stattdessen verwendet, um die in Ihrer Konfiguration definierten Spec-Dateinamen zu filtern.

Um alle Specs mit dem Wort „dialog“ im Spec-Dateinamen auszuführen, könnten Sie Folgendes verwenden:

```sh
wdio wdio.conf.js --spec dialog
```

Beachten Sie, dass jede Testdatei in einem einzelnen Testrunner-Prozess ausgeführt wird. Da wir Dateien nicht im Voraus scannen (siehe den nächsten Abschnitt für Informationen zum Weiterleiten von Dateinamen an `wdio`), _können_ Sie (zum Beispiel) `describe.only` am Anfang Ihrer Spec-Datei _nicht_ verwenden, um Mocha anzuweisen, nur diese Suite auszuführen.

Diese Funktion hilft Ihnen, dasselbe Ziel zu erreichen.

Wenn die Option `--spec` angegeben wird, überschreibt sie alle Muster, die in der Konfiguration unter `specs` oder in einer Capability unter `wdio:specs` definiert sind.

## Ausgewählte Tests ausschließen

Wenn Sie bestimmte Spec-Datei(en) von einem Durchlauf ausschließen müssen, können Sie den Parameter `--exclude` (Mocha, Jasmine) bzw. für Features (Cucumber) verwenden.

Um beispielsweise Ihren Login-Test vom Testlauf auszuschließen:

```sh
wdio wdio.conf.js --exclude ./test/specs/e2e/login.js
```

Oder mehrere Spec-Dateien ausschließen:

 ```sh
wdio wdio.conf.js --exclude ./test/specs/signup.js --exclude ./test/specs/forgot-password.js
```

Oder eine Spec-Datei beim Filtern mit einer Suite ausschließen:

```sh
wdio wdio.conf.js --suite login --exclude ./test/specs/e2e/login.js
```

Wenn der Wert von `--exclude` nicht auf eine bestimmte Spec-Datei verweist, wird er stattdessen verwendet, um die in Ihrer Konfiguration definierten Spec-Dateinamen zu filtern.

Um alle Specs mit dem Wort „dialog“ im Spec-Dateinamen auszuschließen, könnten Sie Folgendes verwenden:

```sh
wdio wdio.conf.js --exclude dialog
```

### Eine gesamte Suite ausschließen

Sie können auch eine gesamte Suite anhand ihres Namens ausschließen. Wenn der Ausschlusswert mit einem in Ihrer Konfiguration definierten Suite-Namen übereinstimmt und nicht wie ein Dateipfad aussieht, wird die gesamte Suite übersprungen:

```sh
wdio wdio.conf.js --suite login --suite checkout --exclude login
```

Dadurch wird nur die Suite `checkout` ausgeführt und die Suite `login` vollständig übersprungen.

Gemischte Ausschlüsse (Suites und Spec-Muster) funktionieren wie erwartet:

```sh
wdio wdio.conf.js --suite login --exclude dialog --exclude signup
```

Wenn in diesem Beispiel `signup` ein definierter Suite-Name ist, wird diese Suite ausgeschlossen. Das Muster `dialog` filtert alle Spec-Dateien heraus, die "dialog" in ihrem Dateinamen enthalten.

:::note
Wenn Sie sowohl `--suite X` als auch `--exclude X` angeben, hat der Ausschluss Vorrang und die Suite `X` wird nicht ausgeführt.
:::

Wenn die Option `--exclude` angegeben wird, überschreibt sie alle Muster, die in der Konfiguration unter `exclude` oder in einer Capability unter `wdio:exclude` definiert sind.

## Suites und Test-Specs ausführen

Führen Sie eine gesamte Suite zusammen mit einzelnen Specs aus.

```sh
wdio wdio.conf.js --suite login --spec ./test/specs/signup.js
```

## Mehrere, bestimmte Test-Specs ausführen

Manchmal ist es notwendig&mdash;im Kontext von Continuous Integration und auch anderweitig&mdash;mehrere Gruppen von Specs zur Ausführung anzugeben. Das Kommandozeilenwerkzeug `wdio` von WebdriverIO akzeptiert per Pipe übergebene Dateinamen (von `find`, `grep` oder anderen).

Per Pipe übergebene Dateinamen überschreiben die Liste der Globs oder Dateinamen, die in der `spec`-Liste der Konfiguration angegeben sind.

```sh
grep -r -l --include "*.js" "myText" | wdio wdio.conf.js
```

_**Hinweis:** Dies überschreibt_ nicht _das Flag `--spec` zum Ausführen einer einzelnen Spec._

## Bestimmte Tests mit MochaOpts ausführen

Sie können auch filtern, welche bestimmten `suite|describe` und/oder `it|test` Sie ausführen möchten, indem Sie ein Mocha-spezifisches Argument `--mochaOpts.grep` an die wdio-CLI übergeben.

```sh
wdio wdio.conf.js --mochaOpts.grep myText
wdio wdio.conf.js --mochaOpts.grep "Text with spaces"
```

_**Hinweis:** Mocha filtert die Tests, nachdem der WDIO-Testrunner die Instanzen erstellt hat, daher sehen Sie möglicherweise mehrere Instanzen, die gestartet, aber nicht tatsächlich ausgeführt werden._

## Bestimmte Tests mit MochaOpts ausschließen

Sie können auch filtern, welche bestimmten `suite|describe` und/oder `it|test` Sie ausschließen möchten, indem Sie ein Mocha-spezifisches Argument `--mochaOpts.invert` an die wdio-CLI übergeben. `--mochaOpts.invert` bewirkt das Gegenteil von `--mochaOpts.grep`

```sh
wdio wdio.conf.js --mochaOpts.grep "string|regex" --mochaOpts.invert
wdio wdio.conf.js --spec ./test/specs/e2e/login.js --mochaOpts.grep "string|regex" --mochaOpts.invert
```

_**Hinweis:** Mocha filtert die Tests, nachdem der WDIO-Testrunner die Instanzen erstellt hat, daher sehen Sie möglicherweise mehrere Instanzen, die gestartet, aber nicht tatsächlich ausgeführt werden._

## Tests nach einem Fehler beenden

Mit der Option `bail` können Sie WebdriverIO anweisen, die Tests zu beenden, sobald ein Test fehlschlägt.

Dies ist bei großen Test-Suites hilfreich, wenn Sie bereits wissen, dass Ihr Build fehlschlagen wird, Sie aber die lange Wartezeit eines vollständigen Testdurchlaufs vermeiden möchten.

Die Option `bail` erwartet eine Zahl, die angibt, wie viele Testfehler auftreten dürfen, bevor WebDriver den gesamten Testdurchlauf beendet. Der Standardwert ist `0`, was bedeutet, dass immer alle Test-Specs ausgeführt werden, die gefunden werden können.

Weitere Informationen zur bail-Konfiguration finden Sie auf der [Optionen-Seite](configuration).
## Hierarchie der Ausführungsoptionen

Bei der Festlegung, welche Specs ausgeführt werden sollen, gibt es eine bestimmte Hierarchie, die definiert, welches Muster Vorrang hat. Derzeit funktioniert es so, von höchster zu niedrigster Priorität:

> CLI-Argument `--spec` > Capability `wdio:specs` > Konfiguration `specs`
> CLI-Argument `--exclude` > Konfiguration `exclude` > Capability `wdio:exclude`

Wenn nur der Konfigurationsparameter angegeben ist, wird er für alle Capabilities verwendet. Wird das Muster jedoch auf Capability-Ebene definiert, wird es anstelle des Konfigurationsmusters verwendet. Schließlich überschreibt jedes auf der Kommandozeile definierte Spec-Muster alle anderen angegebenen Muster.

### Verwendung von auf Capability-Ebene definierten Spec-Mustern

Wenn Sie ein Spec-Muster auf Capability-Ebene definieren, überschreibt es alle auf Konfigurationsebene definierten Muster. Dies ist nützlich, wenn Tests anhand unterschiedlicher Geräte-Capabilities getrennt werden müssen. In solchen Fällen ist es sinnvoller, auf Konfigurationsebene ein generisches Spec-Muster und auf Capability-Ebene spezifischere Muster zu verwenden.

Angenommen, Sie hätten zwei Verzeichnisse, eines für Android-Tests und eines für iOS-Tests.

Ihre Konfigurationsdatei könnte das Muster für nicht gerätespezifische Tests so definieren:

```js
{
    specs: ['tests/general/**/*.js']
}
```

Sie haben dann jedoch unterschiedliche Capabilities für Ihre Android- und iOS-Geräte, bei denen die Muster so aussehen könnten:

```json
{
  "platformName": "Android",
  "wdio:specs": [
    "tests/android/**/*.js"
  ]
}
```

```json
{
  "platformName": "iOS",
  "wdio:specs": [
    "tests/ios/**/*.js"
  ]
}
```

Wenn Sie beide Capabilities in Ihrer Konfigurationsdatei benötigen, führt das Android-Gerät nur die Tests unter dem Namespace "android" aus, und die iOS-Tests führen nur Tests unter dem Namespace "ios" aus!

```js
//wdio.conf.js
export const config = {
    "specs": [
        "tests/general/**/*.js"
    ],
    "capabilities": [
        {
            platformName: "Android",
            "wdio:specs": ["tests/android/**/*.js"],
            //...
        },
        {
            platformName: "iOS",
            "wdio:specs": ["tests/ios/**/*.js"],
            //...
        },
        {
            platformName: "Chrome",
            //Specs auf Konfigurationsebene werden verwendet
        }
    ]
}
```