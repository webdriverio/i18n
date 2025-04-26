---
id: customservices
title: Benutzerdefinierte Dienste
---

Sie können Ihren eigenen benutzerdefinierten Dienst für den WDIO-Testrunner schreiben, um Ihre Bedürfnisse individuell zu erfüllen.

Dienste sind Add-ons, die für wiederverwendbare Logik erstellt werden, um Tests zu vereinfachen, Ihre Testsuite zu verwalten und Ergebnisse zu integrieren. Dienste haben Zugriff auf alle [Hooks](/docs/configurationfile), die in der `wdio.conf.js` verfügbar sind.

Es gibt zwei Arten von Diensten, die definiert werden können: ein Launcher-Dienst, der nur Zugriff auf die Hooks `onPrepare`, `onWorkerStart`, `onWorkerEnd` und `onComplete` hat, die nur einmal pro Testlauf ausgeführt werden, und ein Worker-Dienst, der Zugriff auf alle anderen Hooks hat und für jeden Worker ausgeführt wird. Beachten Sie, dass Sie keine (globalen) Variablen zwischen beiden Arten von Diensten teilen können, da Worker-Dienste in einem anderen (Worker-)Prozess laufen.

Ein Launcher-Dienst kann wie folgt definiert werden:

```js
export default class CustomLauncherService {
    // Wenn ein Hook ein Promise zurückgibt, wartet WebdriverIO, bis dieses Promise aufgelöst ist, um fortzufahren.
    async onPrepare(config, capabilities) {
        // TODO: etwas vor dem Start aller Worker
    }

    onComplete(exitCode, config, capabilities) {
        // TODO: etwas nach dem Herunterfahren der Worker
    }

    // benutzerdefinierte Dienstmethoden ...
}
```

Während ein Worker-Dienst so aussehen sollte:

```js
export default class CustomWorkerService {
    /**
     * `serviceOptions` enthält alle dienstspezifischen Optionen
     * z.B. wenn wie folgt definiert:
     *
     * ```
     * services: [['custom', { foo: 'bar' }]]
     * ```
     *
     * wird der Parameter `serviceOptions` sein: `{ foo: 'bar' }`
     */
    constructor (serviceOptions, capabilities, config) {
        this.options = serviceOptions
    }

    /**
     * dieses Browser-Objekt wird hier zum ersten Mal übergeben
     */
    async before(config, capabilities, browser) {
        this.browser = browser

        // TODO: etwas vor der Ausführung aller Tests, z.B.:
        await this.browser.setWindowSize(1024, 768)
    }

    after(exitCode, config, capabilities) {
        // TODO: etwas nach der Ausführung aller Tests
    }

    beforeTest(test, context) {
        // TODO: etwas vor jedem Mocha/Jasmine-Test
    }

    beforeScenario(test, context) {
        // TODO: etwas vor jedem Cucumber-Szenario
    }

    // andere Hooks oder benutzerdefinierte Dienstmethoden ...
}
```

Es wird empfohlen, das Browser-Objekt über den übergebenen Parameter im Konstruktor zu speichern. Schließlich stellen Sie beide Arten von Workern wie folgt bereit:

```js
import CustomLauncherService from './launcher'
import CustomWorkerService from './service'

export default CustomWorkerService
export const launcher = CustomLauncherService
```

Wenn Sie TypeScript verwenden und sicherstellen möchten, dass die Parameter der Hook-Methoden typsicher sind, können Sie Ihre Dienstklasse wie folgt definieren:

```ts
import type { Capabilities, Options, Services } from '@wdio/types'

export default class CustomWorkerService implements Services.ServiceInstance {
    constructor (
        private _options: MyServiceOptions,
        private _capabilities: Capabilities.RemoteCapability,
        private _config: WebdriverIO.Config,
    ) {
        // ...
    }

    // ...
}
```

## Fehlerbehandlung im Dienst

Ein Fehler, der während eines Dienst-Hooks auftritt, wird protokolliert, während der Runner weiterläuft. Wenn ein Hook in Ihrem Dienst für die Einrichtung oder den Abbau des Testrunners kritisch ist, kann der `SevereServiceError`, der aus dem Paket `webdriverio` exportiert wird, verwendet werden, um den Runner zu stoppen.

```js
import { SevereServiceError } from 'webdriverio'

export default class CustomServiceLauncher {
    async onPrepare(config, capabilities) {
        // TODO: etwas Kritisches für die Einrichtung vor dem Start aller Worker

        throw new SevereServiceError('Etwas ist schiefgelaufen.')
    }

    // benutzerdefinierte Dienstmethoden ...
}
```

## Dienst aus Modul importieren

Das Einzige, was jetzt zu tun ist, um diesen Dienst zu verwenden, ist, ihn der Eigenschaft `services` zuzuweisen.

Ändern Sie Ihre `wdio.conf.js`-Datei wie folgt:

```js
import CustomService from './service/my.custom.service'

export const config = {
    // ...
    services: [
        /**
         * importierte Dienstklasse verwenden
         */
        [CustomService, {
            someOption: true
        }],
        /**
         * absoluten Pfad zum Dienst verwenden
         */
        ['/path/to/service.js', {
            someOption: true
        }]
    ],
    // ...
}
```

## Dienst auf NPM veröffentlichen

Um Dienste für die WebdriverIO-Community leichter nutzbar und auffindbar zu machen, befolgen Sie bitte diese Empfehlungen:

* Dienste sollten diese Namenskonvention verwenden: `wdio-*-service`
* Verwenden Sie NPM-Schlüsselwörter: `wdio-plugin`, `wdio-service`
* Der `main`-Eintrag sollte eine Instanz des Dienstes `exportieren`
* Beispieldienste: [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)

Die Einhaltung des empfohlenen Namensmusters ermöglicht es, Dienste nach Namen hinzuzufügen:

```js
// wdio-custom-service hinzufügen
export const config = {
    // ...
    services: ['custom'],
    // ...
}
```

### Veröffentlichten Dienst zur WDIO CLI und Dokumentation hinzufügen

Wir schätzen jeden neuen Plugin, der anderen Menschen helfen könnte, bessere Tests durchzuführen! Wenn Sie einen solchen Plugin erstellt haben, sollten Sie in Erwägung ziehen, ihn zu unserer CLI und Dokumentation hinzuzufügen, damit er leichter gefunden werden kann.

Bitte stellen Sie einen Pull Request mit den folgenden Änderungen:

- Fügen Sie Ihren Dienst zur Liste der [unterstützten Dienste](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L92-L128)) im CLI-Modul hinzu
- Erweitern Sie die [Dienstliste](https://github.com/webdriverio/webdriverio/blob/main/scripts/docs-generation/3rd-party/services.json), um Ihre Dokumentation zur offiziellen Webdriver.io-Seite hinzuzufügen