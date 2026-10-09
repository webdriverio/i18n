---
id: customreporter
title: Benutzerdefinierter Reporter
description: "Erstellen Sie einen benutzerdefinierten Reporter für den WDIO-Testrunner auf Basis von @wdio/reporter, verarbeiten Sie Runner-Events und veröffentlichen Sie ihn auf NPM."
---

Sie können Ihren eigenen benutzerdefinierten Reporter für den WDIO-Testrunner schreiben, der auf Ihre Bedürfnisse zugeschnitten ist. Und es ist ganz einfach!

Alles, was Sie tun müssen, ist ein Node-Modul zu erstellen, das vom `@wdio/reporter`-Paket erbt, damit es Nachrichten vom Test empfangen kann.

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

Sie können den Reporter auch auf NPM veröffentlichen, damit jeder ihn verwenden kann. Benennen Sie das Paket wie andere Reporter `wdio-<reportername>-reporter` und versehen Sie es mit Schlüsselwörtern wie `wdio` oder `wdio-reporter`.

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
    onSuiteEnd() {}
    onRunnerEnd() {}
}
```

Die Methodennamen sind ziemlich selbsterklärend.

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

Alle Event-Handler sollten synchrone Routinen ausführen (andernfalls kommt es zu Race Conditions).

Schauen Sie sich unbedingt den [Beispielbereich](https://github.com/webdriverio/webdriverio/tree/main/examples/wdio) an, in dem Sie einen beispielhaften benutzerdefinierten Reporter finden, der für jedes Event den Event-Namen ausgibt.

Wenn Sie einen benutzerdefinierten Reporter implementiert haben, der für die Community nützlich sein könnte, zögern Sie nicht, einen Pull Request zu erstellen, damit wir den Reporter öffentlich verfügbar machen können!

Außerdem gilt: Wenn Sie den WDIO-Testrunner über die `Launcher`-Schnittstelle ausführen, können Sie einen benutzerdefinierten Reporter nicht wie folgt als Funktion übergeben:

```js
import Launcher from '@wdio/cli'

import CustomReporter from './reporter/my.custom.reporter'

const launcher = new Launcher('/path/to/config.file.js', {
    // dies wird NICHT funktionieren, da CustomReporter nicht serialisierbar ist
    reporters: ['dot', CustomReporter]
})
```

## Warten bis `isSynchronised`

Wenn Ihr Reporter asynchrone Operationen ausführen muss, um die Daten zu berichten (z. B. das Hochladen von Logdateien oder anderen Assets), können Sie die Methode `isSynchronised` in Ihrem benutzerdefinierten Reporter überschreiben, damit der WebdriverIO-Runner wartet, bis Sie alles verarbeitet haben. Ein Beispiel dafür finden Sie im [`@wdio/sumologic-reporter`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sumologic-reporter/src/index.ts):

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
* Der `main`-Eintrag sollte eine Instanz des Reporters `export`ieren
* Beispiel-Reporter: [`@wdio/dot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter)

Wenn Sie dem empfohlenen Namensmuster folgen, können Services über ihren Namen hinzugefügt werden:

```js
// wdio-custom-reporter hinzufügen
export const config = {
    // ...
    reporter: ['custom'],
    // ...
}
```

### Veröffentlichten Service zur WDIO CLI und Dokumentation hinzufügen

Wir freuen uns sehr über jedes neue Plugin, das anderen helfen könnte, bessere Tests auszuführen! Wenn Sie ein solches Plugin erstellt haben, ziehen Sie bitte in Betracht, es zu unserer CLI und Dokumentation hinzuzufügen, damit es leichter gefunden werden kann.

Bitte erstellen Sie einen Pull Request mit den folgenden Änderungen:

- fügen Sie Ihren Service zur Liste der [unterstützten Reporter](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L74-L91)) im CLI-Modul hinzu
- erweitern Sie die [Reporter-Liste](https://github.com/webdriverio/webdriverio/blob/main/infra/docs/src/3rd-party/reporters.json), um Ihre Dokumentation zur offiziellen Webdriver.io-Seite hinzuzufügen