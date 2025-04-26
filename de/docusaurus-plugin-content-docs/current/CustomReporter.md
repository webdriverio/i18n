---
id: customreporter
title: Benutzerdefinierter Reporter
---

Sie können Ihren eigenen benutzerdefinierten Reporter für den WDIO-Testrunner erstellen, der auf Ihre Bedürfnisse zugeschnitten ist. Und es ist einfach!

Alles, was Sie tun müssen, ist ein Node-Modul zu erstellen, das vom `@wdio/reporter`-Paket erbt, damit es Nachrichten vom Test empfangen kann.

Die grundlegende Einrichtung sollte so aussehen:

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    constructor(options) {
        /*
         * make reporter to write to the output stream by default
         */
        options = Object.assign(options, { stdout: true })
        super(options)
    }

    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

Um diesen Reporter zu verwenden, müssen Sie ihn lediglich der `reporter`-Eigenschaft in Ihrer Konfiguration zuweisen.


Ihre `wdio.conf.js`-Datei sollte so aussehen:

```js
import CustomReporter from './reporter/my.custom.reporter'

export const config = {
    // ...
    reporters: [
        /**
         * use imported reporter class
         */
        [CustomReporter, {
            someOption: 'foobar'
        }],
        /**
         * use absolute path to reporter
         */
        ['/path/to/reporter.js', {
            someOption: 'foobar'
        }]
    ],
    // ...
}
```

Sie können den Reporter auch auf NPM veröffentlichen, damit jeder ihn nutzen kann. Benennen Sie das Paket wie andere Reporter `wdio-<reportername>-reporter` und versehen Sie es mit Schlüsselwörtern wie `wdio` oder `wdio-reporter`.

## Event Handler

Sie können einen Event-Handler für verschiedene Ereignisse registrieren, die während des Testens ausgelöst werden. Alle der folgenden Handler erhalten Nutzlasten mit nützlichen Informationen über den aktuellen Status und Fortschritt.

Die Struktur dieser Nutzlastobjekte hängt vom Ereignis ab und ist über alle Frameworks (Mocha, Jasmine und Cucumber) einheitlich. Sobald Sie einen benutzerdefinierten Reporter implementieren, sollte er für alle Frameworks funktionieren.

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

Um bei einem bestimmten Ereignis etwas auszugeben, verwenden Sie die Methode `this.write(...)`, die von der übergeordneten Klasse `WDIOReporter` bereitgestellt wird. Sie streamt den Inhalt entweder nach `stdout` oder in eine Protokolldatei (abhängig von den Optionen des Reporters).

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

Schauen Sie sich unbedingt den [Beispielbereich](https://github.com/webdriverio/webdriverio/tree/main/examples/wdio) an, wo Sie ein Beispiel für einen benutzerdefinierten Reporter finden, der den Ereignisnamen für jedes Ereignis ausgibt.

Wenn Sie einen benutzerdefinierten Reporter implementiert haben, der für die Community nützlich sein könnte, zögern Sie nicht, einen Pull Request zu erstellen, damit wir den Reporter der Öffentlichkeit zur Verfügung stellen können!

Wenn Sie den WDIO-Testrunner über die `Launcher`-Schnittstelle ausführen, können Sie keinen benutzerdefinierten Reporter als Funktion wie folgt anwenden:

```js
import Launcher from '@wdio/cli'

import CustomReporter from './reporter/my.custom.reporter'

const launcher = new Launcher('/path/to/config.file.js', {
    // this will NOT work, because CustomReporter is not serializable
    reporters: ['dot', CustomReporter]
})
```

## Warten bis `isSynchronised`

Wenn Ihr Reporter asynchrone Operationen ausführen muss, um die Daten zu melden (z.B. Upload von Protokolldateien oder anderen Assets), können Sie die Methode `isSynchronised` in Ihrem benutzerdefinierten Reporter überschreiben, damit der WebdriverIO-Runner wartet, bis Sie alles berechnet haben. Ein Beispiel dafür ist im [`@wdio/sumologic-reporter`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sumologic-reporter/src/index.ts) zu sehen:

```js
export default class SumoLogicReporter extends WDIOReporter {
    constructor (options) {
        // ...
        this.unsynced = []
        this.interval = setInterval(::this.sync, this.options.syncInterval)
        // ...
    }

    /**
     * overwrite isSynchronised method
     */
    get isSynchronised () {
        return this.unsynced.length === 0
    }

    /**
     * sync log files
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
             * remove transferred logs from log bucket
             */
            this.unsynced.splice(0, MAX_LINES)
            // ...
        }
    }
}
```

Auf diese Weise wartet der Runner, bis alle Protokollinformationen hochgeladen sind.

## Reporter auf NPM veröffentlichen

Um Reporter für die WebdriverIO-Community leichter nutzbar und auffindbar zu machen, befolgen Sie bitte diese Empfehlungen:

* Services sollten diese Namenskonvention verwenden: `wdio-*-reporter`
* Verwenden Sie NPM-Schlüsselwörter: `wdio-plugin`, `wdio-reporter`
* Der `main`-Eintrag sollte eine Instanz des Reporters `exportieren`
* Beispiel-Reporter: [`@wdio/dot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter)

Die Einhaltung des empfohlenen Namensmusters ermöglicht es, Services nach Namen hinzuzufügen:

```js
// Add wdio-custom-reporter
export const config = {
    // ...
    reporter: ['custom'],
    // ...
}
```

### Veröffentlichten Service zur WDIO CLI und Dokumentation hinzufügen

Wir schätzen jeden neuen Plugin, der anderen Menschen helfen könnte, bessere Tests durchzuführen! Wenn Sie einen solchen Plugin erstellt haben, sollten Sie in Erwägung ziehen, ihn zu unserer CLI und Dokumentation hinzuzufügen, damit er leichter gefunden werden kann.

Bitte stellen Sie einen Pull Request mit den folgenden Änderungen:

- Fügen Sie Ihren Service zur Liste der [unterstützten Reporter](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L74-L91)) im CLI-Modul hinzu
- Erweitern Sie die [Reporter-Liste](https://github.com/webdriverio/webdriverio/blob/main/scripts/docs-generation/3rd-party/reporters.json), um Ihre Dokumentation zur offiziellen Webdriver.io-Seite hinzuzufügen