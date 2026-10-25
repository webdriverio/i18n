---
id: customreporter
title: Benutzerdefinierter Reporter
description: "Erstellen Sie einen benutzerdefinierten Reporter für den WDIO-Testrunner auf Basis von @wdio/reporter, verarbeiten Sie Runner-Events und veröffentlichen Sie ihn auf NPM."
---

Sie können Ihren eigenen benutzerdefinierten Reporter für den WDIO-Testrunner schreiben, der auf Ihre Bedürfnisse zugeschnitten ist. Und es ist ganz einfach!

Alles, was Sie tun müssen, ist ein Node-Modul zu erstellen, das vom Paket `@wdio/reporter` erbt, damit es Nachrichten vom Test empfangen kann.

Die grundlegende Einrichtung sollte so aussehen:

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    constructor(options) {
        /*
         * Reporter standardmäßig in den Ausgabestream schreiben lassen
         */
        options = Object.assign(options, { stdout: true })
        super(options)
    }

    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

Um diesen Reporter zu verwenden, müssen Sie ihn lediglich der Eigenschaft `reporter` in Ihrer Konfiguration zuweisen.


Ihre `wdio.conf.js`-Datei sollte so aussehen:

```js
import CustomReporter from './reporter/my.custom.reporter'

export const config = {
    // ...
    reporters: [
        /**
         * importierte Reporter-Klasse verwenden
         */
        [CustomReporter, {
            someOption: 'foobar'
        }],
        /**
         * absoluten Pfad zum Reporter verwenden
         */
        ['/path/to/reporter.js', {
            someOption: 'foobar'
        }]
    ],
    // ...
}
```

Sie können den Reporter auch auf NPM veröffentlichen, damit jeder ihn nutzen kann. Benennen Sie das Paket wie andere Reporter `wdio-<reportername>-reporter` und versehen Sie es mit Schlüsselwörtern wie `wdio` oder `wdio-reporter`.

## Event-Handler

Sie können einen Event-Handler für verschiedene Events registrieren, die während des Testens ausgelöst werden. Alle folgenden Handler erhalten Payloads mit nützlichen Informationen über den aktuellen Zustand und Fortschritt.

Die Struktur dieser Payload-Objekte hängt vom Event ab und ist über die Frameworks (Mocha, Jasmine und Cucumber) hinweg vereinheitlicht. Sobald Sie einen benutzerdefinierten Reporter implementiert haben, sollte er für alle Frameworks funktionieren.

Die folgende Liste enthält alle möglichen Methoden, die Sie Ihrer Reporter-Klasse hinzufügen können:

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onRunnerStart() {}
    onBeforeCommand() {}
    onAfterCommand() {}
    onSuiteStart() {}
    onHookStart() {}
    onHookEnd() {}
    onTestStart() {}
    onTestPass() {}
    onTestFail() {}
    onTestSkip() {}
    onTestEnd() {}
    onContextEnd() {} // experimentell, siehe "Reporter und parallele Tests"
    onSuiteEnd() {}
    onRunnerEnd() {}
}
```

Die Methodennamen sind weitgehend selbsterklärend.

Um bei einem bestimmten Event etwas auszugeben, verwenden Sie die Methode `this.write(...)`, die von der übergeordneten Klasse `WDIOReporter` bereitgestellt wird. Sie streamt den Inhalt entweder nach `stdout` oder in eine Logdatei (abhängig von den Optionen des Reporters).

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

Beachten Sie, dass Sie die Testausführung in keiner Weise verzögern können.

Alle Event-Handler sollten synchrone Routinen ausführen (sonst geraten Sie in Race Conditions).

Schauen Sie sich unbedingt den [Beispielbereich](https://github.com/webdriverio/webdriverio/tree/main/examples/wdio) an, in dem Sie einen beispielhaften benutzerdefinierten Reporter finden, der für jedes Event den Event-Namen ausgibt.

Wenn Sie einen benutzerdefinierten Reporter implementiert haben, der für die Community nützlich sein könnte, zögern Sie nicht, einen Pull Request zu erstellen, damit wir den Reporter der Öffentlichkeit zur Verfügung stellen können!

Außerdem gilt: Wenn Sie den WDIO-Testrunner über die `Launcher`-Schnittstelle ausführen, können Sie einen benutzerdefinierten Reporter nicht wie folgt als Funktion übergeben:

```js
import Launcher from '@wdio/cli'

import CustomReporter from './reporter/my.custom.reporter'

const launcher = new Launcher('/path/to/config.file.js', {
    // das wird NICHT funktionieren, da CustomReporter nicht serialisierbar ist
    reporters: ['dot', CustomReporter]
})
```

## Reporter und parallele Tests

Bei [parallelen Tests in einer Spec-Datei](./ParallelTests.md) überlappen sich die Tests einer Spec-Datei: `onTestStart` eines Tests kann vor `onTestEnd` eines anderen kommen, und Befehle verschiedener Tests verschränken sich. `WDIOReporter` übernimmt dies für Sie. Im parallelen Modus enthalten die Framework-Events zwei zusätzliche Felder:

- `parentUid` bei `suite:start`, `hook:start` und `test:start`: die uid der zugehörigen Suite (`null` für eine Suite auf oberster Ebene). Der Reporter fügt die Suite, den Hook oder den Test zu dieser Suite hinzu, nicht zu der Suite, die zuletzt gestartet wurde.
- `contextId` bei Test- und Befehls-Events: der Browsing-Kontext des Tests. Der Reporter fügt die Befehlsausgabe dem Test hinzu, der in diesem Kontext lief.

Die Test-, Hook- und Suite-Statistiken behalten diese Felder, wenn das Event sie enthält: In `onTestEnd(test)` ist `test.contextId` der Browsing-Kontext des Tests und `test.parentUid` die uid seiner Suite. Ohne parallelen Modus haben die Statistiken keine solchen Eigenschaften.

Die Bäume `suites`, `tests` und `hooks` des Reporters sind daher korrekt. Wenn Ihr Reporter einen eigenen Zustand verwaltet, verwenden Sie die `uid` des Tests oder der Suite als Schlüssel, anstatt einen einzelnen aktuellen Test zu verfolgen.

Ausgaben, die ohne ein Event kommen, wie Konsolenausgaben oder ein benutzerdefiniertes `process.emit`-Event, haben keine `uid`. Rufen Sie `this.getContextTest()` auf, um den Test zu erhalten, dessen Browsing-Kontext sie geschrieben hat. Im parallelen Modus gibt es den Test zurück, der zuletzt in diesem Kontext gestartet wurde, auch nach dessen `test:end`, wenn seine `afterEach`- und `after`-Hooks laufen, und `undefined`, wenn in diesem Kontext kein Test gestartet wurde oder nach dessen `context:end`; ohne parallelen Modus gibt es den zuletzt gestarteten Test zurück. `before()`-Hooks eines parallelen Tests laufen vor dessen `test:start`, sodass noch kein Test den Kontext besitzt; `this.getContextId()` gibt die rohe Kontext-ID zurück, die für den gesamten Test gleich bleibt.

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestStart(test) {
        this.write(`start ${test.uid} ${test.title}\n`)
    }
    onTestEnd(test) {
        this.write(`end   ${test.uid} ${test.state}\n`)
    }
}
```

Die `afterEach`- und `after`-Hooks eines parallelen Tests laufen nach dessen `test:end`. Um zu erfahren, wann ein Kontext abgeschlossen ist, verwenden Sie `onContextEnd(payload)`. Es wird nach dem letzten Hook des Tests aufgerufen, und der Kontext sendet danach keine weiteren Events mehr. Die Payload enthält `cid`, `specs`, `uid` (der letzte Test des Kontexts) und `contextId`. Schließen oder schreiben Sie dort, was Ihr Reporter für diesen Kontext vorhält.

:::warning Experimentell

`context:end` und `onContextEnd` sind experimentell: Vorerst sendet nur der Mocha-`parallelMode` sie, und der Name sowie die Payload können sich ändern.

:::

## Warten bis `isSynchronised`

Wenn Ihr Reporter asynchrone Operationen ausführen muss, um die Daten zu melden (z. B. das Hochladen von Logdateien oder anderen Assets), können Sie die Methode `isSynchronised` in Ihrem benutzerdefinierten Reporter überschreiben, damit der WebdriverIO-Runner wartet, bis Sie alles verarbeitet haben. Ein Beispiel dafür finden Sie im [`@wdio/sumologic-reporter`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sumologic-reporter/src/index.ts):

```js
export default class SumoLogicReporter extends WDIOReporter {
    constructor (options) {
        // ...
        this.unsynced = []
        this.interval = setInterval(::this.sync, this.options.syncInterval)
        // ...
    }

    /**
     * isSynchronised-Methode überschreiben
     */
    get isSynchronised () {
        return this.unsynced.length === 0
    }

    /**
     * Logdateien synchronisieren
     */
    sync () {
        // ...
        request({
            method: 'POST',
            uri: this.options.sourceAddress,
            body: logLines
        }, (err, resp) => {
            // ...
            /**
             * übertragene Logs aus dem Log-Bucket entfernen
             */
            this.unsynced.splice(0, MAX_LINES)
            // ...
        }
    }
}
```

Auf diese Weise wartet der Runner, bis alle Log-Informationen hochgeladen sind.

## Reporter auf NPM veröffentlichen

Um den Reporter für die WebdriverIO-Community leichter nutzbar und auffindbar zu machen, befolgen Sie bitte diese Empfehlungen:

* Services sollten diese Namenskonvention verwenden: `wdio-*-reporter`
* Verwenden Sie NPM-Schlüsselwörter: `wdio-plugin`, `wdio-reporter`
* Der `main`-Einstiegspunkt sollte eine Instanz des Reporters `export`ieren
* Beispiel-Reporter: [`@wdio/dot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter)

Wenn Sie dem empfohlenen Benennungsmuster folgen, können Services über ihren Namen hinzugefügt werden:

```js
// wdio-custom-reporter hinzufügen
export const config = {
    // ...
    reporter: ['custom'],
    // ...
}
```

### Veröffentlichten Service zur WDIO CLI und Dokumentation hinzufügen

Wir schätzen jedes neue Plugin sehr, das anderen Menschen helfen könnte, bessere Tests durchzuführen! Wenn Sie ein solches Plugin erstellt haben, ziehen Sie bitte in Betracht, es zu unserer CLI und Dokumentation hinzuzufügen, damit es leichter gefunden werden kann.

Bitte erstellen Sie einen Pull Request mit den folgenden Änderungen:

- fügen Sie Ihren Service zur Liste der [unterstützten Reporter](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L74-L91)) im CLI-Modul hinzu
- erweitern Sie die [Reporter-Liste](https://github.com/webdriverio/webdriverio/blob/main/infra/docs/src/3rd-party/reporters.json), um Ihre Dokumentation zur offiziellen Webdriver.io-Seite hinzuzufügen