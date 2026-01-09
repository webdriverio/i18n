---
id: organizingsuites
title: Test-Suites organisieren
---

Mit dem Wachstum von Projekten werden unvermeidlich immer mehr Integrationstests hinzugefügt. Dies erhöht die Build-Zeit und verlangsamt die Produktivität.

Um dies zu verhindern, sollten Sie Ihre Tests parallel ausführen. WebdriverIO testet bereits jede Spec (oder _Feature-Datei_ in Cucumber) parallel innerhalb einer einzelnen Sitzung. Im Allgemeinen sollten Sie versuchen, nur ein einzelnes Feature pro Spec-Datei zu testen. Versuchen Sie, nicht zu viele oder zu wenige Tests in einer Datei zu haben. (Es gibt jedoch keine goldene Regel hierfür.)

Sobald Ihre Tests mehrere Spec-Dateien haben, sollten Sie beginnen, Ihre Tests gleichzeitig auszuführen. Passen Sie dazu die `maxInstances`-Eigenschaft in Ihrer Konfigurationsdatei an. WebdriverIO ermöglicht es Ihnen, Ihre Tests mit maximaler Gleichzeitigkeit auszuführen – das bedeutet, dass unabhängig davon, wie viele Dateien und Tests Sie haben, alle parallel ausgeführt werden können. (Dies unterliegt natürlich gewissen Einschränkungen wie der CPU Ihres Computers, Einschränkungen der Gleichzeitigkeit usw.)

> Angenommen, Sie haben 3 verschiedene Capabilities (Chrome, Firefox und Safari) und Sie haben `maxInstances` auf `1` gesetzt. Der WDIO-Testrunner wird 3 Prozesse starten. Wenn Sie also 10 Spec-Dateien haben und `maxInstances` auf `10` setzen, werden _alle_ Spec-Dateien gleichzeitig getestet und 30 Prozesse gestartet.

Sie können die `maxInstances`-Eigenschaft global definieren, um das Attribut für alle Browser festzulegen.

Wenn Sie Ihr eigenes WebDriver-Grid betreiben, haben Sie möglicherweise (zum Beispiel) mehr Kapazität für einen Browser als für einen anderen. In diesem Fall können Sie `maxInstances` in Ihrem Capability-Objekt _begrenzen_:

```js
// wdio.conf.js
export const config = {
    // ...
    // maxInstance für alle Browser setzen
    maxInstances: 10,
    // ...
    capabilities: [{
        browserName: 'firefox'
    }, {
        // maxInstances kann pro Capability überschrieben werden. Wenn Sie also ein eigenes WebDriver-
        // Grid mit nur 5 verfügbaren Firefox-Instanzen haben, können Sie sicherstellen, dass nicht mehr als
        // 5 Instanzen gleichzeitig gestartet werden.
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

// Hauptkonfigurationsdatei als Standard verwenden, aber umgebungsspezifische Informationen überschreiben
export const config = deepmerge(wdioConf.config, {
    capabilities: [
        // weitere Capabilities hier definieren
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

Sie können Test-Specs in Suites gruppieren und einzelne spezifische Suites statt aller ausführen.

Definieren Sie zunächst Ihre Suites in Ihrer WDIO-Konfiguration:

```js
// wdio.conf.js
export const config = {
    // alle Tests definieren
    specs: ['./test/specs/**/*.spec.js'],
    // ...
    // spezifische Suites definieren
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

## Test-Specs gruppieren, um sie sequentiell auszuführen

Wie oben beschrieben, gibt es Vorteile bei der parallelen Ausführung von Tests. Es gibt jedoch Fälle, in denen es von Vorteil wäre, Tests zu gruppieren, um sie sequentiell in einer einzelnen Instanz auszuführen. Beispiele dafür sind hauptsächlich Situationen, in denen hohe Setup-Kosten anfallen, z.B. beim Transpilieren von Code oder bei der Bereitstellung von Cloud-Instanzen, aber es gibt auch fortgeschrittene Nutzungsmodelle, die von dieser Funktion profitieren.

Um Tests zu gruppieren, damit sie in einer einzigen Instanz ausgeführt werden, definieren Sie sie als Array innerhalb der Specs-Definition.

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
Im obigen Beispiel werden die Tests 'test_login.js', 'test_product_order.js' und 'test_checkout.js' sequentiell in einer einzelnen Instanz ausgeführt, und jeder der "test_b*"-Tests wird gleichzeitig in einzelnen Instanzen ausgeführt.

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
In diesem Fall würden alle Tests der "end2end"-Suite in einer einzigen Instanz ausgeführt werden.

Wenn Tests sequentiell mit einem Muster ausgeführt werden, werden die Spec-Dateien in alphabetischer Reihenfolge ausgeführt

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

Mit dem Parameter `--spec` können Sie angeben, welche _Suite_ (Mocha, Jasmine) oder welches _Feature_ (Cucumber) ausgeführt werden soll. Der Pfad wird relativ zu Ihrem aktuellen Arbeitsverzeichnis aufgelöst.

Um beispielsweise nur Ihren Login-Test auszuführen:

```sh
wdio wdio.conf.js --spec ./test/specs/e2e/login.js
```

Oder mehrere Specs gleichzeitig ausführen:

```sh
wdio wdio.conf.js --spec ./test/specs/signup.js --spec ./test/specs/forgot-password.js
```

Wenn der `--spec`-Wert nicht auf eine bestimmte Spec-Datei verweist, wird er stattdessen verwendet, um die in Ihrer Konfiguration definierten Spec-Dateinamen zu filtern.

Um alle Specs mit dem Wort "dialog" in den Spec-Dateinamen auszuführen, könnten Sie verwenden:

```sh
wdio wdio.conf.js --spec dialog
```

Beachten Sie, dass jede Testdatei in einem einzelnen Test-Runner-Prozess ausgeführt wird. Da wir Dateien nicht im Voraus scannen (siehe den nächsten Abschnitt für Informationen zum Pipen von Dateinamen an `wdio`), _können_ Sie (zum Beispiel) nicht `describe.only` am Anfang Ihrer Spec-Datei verwenden, um Mocha anzuweisen, nur diese Suite auszuführen.

Diese Funktion wird Ihnen helfen, dasselbe Ziel zu erreichen.

Wenn die Option `--spec` angegeben wird, überschreibt sie alle Muster, die durch den Parameter `specs` auf Konfigurations- oder Capability-Ebene definiert sind.

## Ausgewählte Tests ausschließen

Bei Bedarf können Sie mit dem Parameter `--exclude` bestimmte Spec-Datei(en) (Mocha, Jasmine) oder Features (Cucumber) von einem Lauf ausschließen.

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

Um alle Specs mit dem Wort "dialog" in den Spec-Dateinamen auszuschließen, könnten Sie verwenden:

```sh
wdio wdio.conf.js --exclude dialog
```

### Eine ganze Suite ausschließen

Sie können auch eine ganze Suite nach Namen ausschließen. Wenn der Ausschlusswert mit einem in Ihrer Konfiguration definierten Suite-Namen übereinstimmt und nicht wie ein Dateipfad aussieht, wird die gesamte Suite übersprungen:

```sh
wdio wdio.conf.js --suite login --suite checkout --exclude login
```

Dies führt nur die `checkout`-Suite aus und überspringt die `login`-Suite vollständig.

Gemischte Ausschlüsse (Suites und Spec-Muster) funktionieren wie erwartet:

```sh
wdio wdio.conf.js --suite login --exclude dialog --exclude signup
```

In diesem Beispiel wird die Suite `signup` ausgeschlossen, wenn `signup` ein definierter Suite-Name ist. Das Muster `dialog` filtert alle Spec-Dateien heraus, die "dialog" in ihrem Dateinamen enthalten.

:::note
Wenn Sie sowohl `--suite X` als auch `--exclude X` angeben, hat der Ausschluss Vorrang und Suite `X` wird nicht ausgeführt.
:::

Wenn die Option `--exclude` angegeben wird, überschreibt sie alle Muster, die durch den Parameter `exclude` auf Konfigurations- oder Capability-Ebene definiert sind.

## Suites und Test-Specs ausführen

Führen Sie eine ganze Suite zusammen mit einzelnen Specs aus.

```sh
wdio wdio.conf.js --suite login --spec ./test/specs/signup.js
```

## Mehrere, spezifische Test-Specs ausführen

Es ist manchmal notwendig – im Kontext der kontinuierlichen Integration und anderweitig – mehrere Sätze von Specs anzugeben, die ausgeführt werden sollen. Das Kommandozeilenprogramm `wdio` von WebdriverIO akzeptiert über Pipe eingegebene Dateinamen (von `find`, `grep` oder anderen).

Über Pipe eingegebene Dateinamen überschreiben die Liste der Globs oder Dateinamen, die in der `spec`-Liste der Konfiguration angegeben sind.

```sh
grep -r -l --include "*.js" "myText" | wdio wdio.conf.js
```

_**Hinweis:** Dies wird das Flag `--spec` für die Ausführung einer einzelnen Spec_ nicht _überschreiben._

## Spezifische Tests mit MochaOpts ausführen

Sie können auch filtern, welche spezifischen `suite|describe` und/oder `it|test` Sie ausführen möchten, indem Sie ein Mocha-spezifisches Argument übergeben: `--mochaOpts.grep` an die WDIO-CLI.

```sh
wdio wdio.conf.js --mochaOpts.grep myText
wdio wdio.conf.js --mochaOpts.grep "Text with spaces"
```

_**Hinweis:** Mocha filtert die Tests, nachdem der WDIO-Testrunner die Instanzen erstellt hat, so dass Sie möglicherweise sehen, wie mehrere Instanzen erzeugt, aber nicht tatsächlich ausgeführt werden._

## Spezifische Tests mit MochaOpts ausschließen

Sie können auch filtern, welche spezifischen `suite|describe` und/oder `it|test` Sie ausschließen möchten, indem Sie ein Mocha-spezifisches Argument übergeben: `--mochaOpts.invert` an die WDIO-CLI. `--mochaOpts.invert` führt das Gegenteil von `--mochaOpts.grep` aus

```sh
wdio wdio.conf.js --mochaOpts.grep "string|regex" --mochaOpts.invert
wdio wdio.conf.js --spec ./test/specs/e2e/login.js --mochaOpts.grep "string|regex" --mochaOpts.invert
```

_**Hinweis:** Mocha filtert die Tests, nachdem der WDIO-Testrunner die Instanzen erstellt hat, so dass Sie möglicherweise sehen, wie mehrere Instanzen erzeugt, aber nicht tatsächlich ausgeführt werden._

## Tests nach Fehlern beenden

Mit der Option `bail` können Sie WebdriverIO anweisen, das Testen zu beenden, nachdem ein Test fehlschlägt.

Dies ist bei großen Testsuiten hilfreich, wenn Sie bereits wissen, dass Ihr Build fehlschlagen wird, aber Sie die lange Wartezeit eines vollständigen Testlaufs vermeiden möchten.

Die Option `bail` erwartet eine Zahl, die angibt, wie viele Testfehler auftreten können, bevor WebDriver den gesamten Testlauf beendet. Der Standardwert ist `0`, was bedeutet, dass immer alle Testspezifikationen ausgeführt werden, die gefunden werden können.

Weitere Informationen zur Bail-Konfiguration finden Sie auf der [Optionen-Seite](configuration).

## Hierarchie der Ausführungsoptionen

Bei der Deklaration, welche Specs ausgeführt werden sollen, gibt es eine bestimmte Hierarchie, die definiert, welches Muster Vorrang hat. Derzeit funktioniert es so, von der höchsten Priorität zur niedrigsten:

> CLI `--spec` Argument > Capability `specs` Muster > Konfigurations `specs` Muster
> CLI `--exclude` Argument > Konfigurations `exclude` Muster > Capability `exclude` Muster

Wenn nur der Konfigurationsparameter angegeben wird, wird er für alle Capabilities verwendet. Wenn Sie jedoch das Muster auf Capability-Ebene definieren, wird es anstelle des Konfigurationsmusters verwendet. Schließlich überschreibt jedes auf der Kommandozeile definierte Spec-Muster alle anderen angegebenen Muster.

### Verwendung von auf Capability-Ebene definierten Spec-Mustern

Wenn Sie ein Spec-Muster auf Capability-Ebene definieren, überschreibt es alle auf Konfigurationsebene definierten Muster. Dies ist nützlich, wenn Tests basierend auf unterschiedlichen Gerätecapabilities getrennt werden müssen. In solchen Fällen ist es sinnvoller, ein generisches Spec-Muster auf Konfigurationsebene und spezifischere Muster auf Capability-Ebene zu verwenden.

Angenommen, Sie haben zwei Verzeichnisse, eines für Android-Tests und eines für iOS-Tests.

Ihre Konfigurationsdatei könnte das Muster wie folgt definieren, für nicht-gerätespezifische Tests:

```js
{
    specs: ['tests/general/**/*.js']
}
```

Aber dann haben Sie unterschiedliche Capabilities für Ihre Android- und iOS-Geräte, wobei die Muster wie folgt aussehen könnten:

```json
{
  "platformName": "Android",
  "specs": [
    "tests/android/**/*.js"
  ]
}
```

```json
{
  "platformName": "iOS",
  "specs": [
    "tests/ios/**/*.js"
  ]
}
```

Wenn Sie beide Capabilities in Ihrer Konfigurationsdatei benötigen, dann führt das Android-Gerät nur die Tests unter dem "android"-Namespace aus, und die iOS-Tests führen nur Tests unter dem "ios"-Namespace aus!

```js
//wdio.conf.js
export const config = {
    "specs": [
        "tests/general/**/*.js"
    ],
    "capabilities": [
        {
            platformName: "Android",
            specs: ["tests/android/**/*.js"],
            //...
        },
        {
            platformName: "iOS",
            specs: ["tests/ios/**/*.js"],
            //...
        },
        {
            platformName: "Chrome",
            //Specs der Konfigurationsebene werden verwendet
        }
    ]
}
```