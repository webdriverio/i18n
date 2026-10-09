---
id: customservices
title: Benutzerdefinierte Services
description: "Schreiben Sie einen benutzerdefinierten Launcher- oder Worker-Service für den WDIO-Testrunner mithilfe von Testrunner-Hooks, behandeln Sie Service-Fehler und veröffentlichen Sie ihn auf NPM."
---

Sie können Ihren eigenen benutzerdefinierten Service für den WDIO-Testrunner schreiben, um ihn genau an Ihre Bedürfnisse anzupassen.

Services sind Add-ons, die für wiederverwendbare Logik erstellt werden, um Tests zu vereinfachen, Ihre Testsuite zu verwalten und Ergebnisse zu integrieren. Services haben Zugriff auf dieselben [Hooks](/docs/configurationfile), die auch in der `wdio.conf.js` verfügbar sind.

Es gibt zwei Arten von Services, die definiert werden können: einen Launcher-Service, der nur Zugriff auf die Hooks `onPrepare`, `onWorkerStart`, `onWorkerEnd` und `onComplete` hat, die nur einmal pro Testlauf ausgeführt werden, und einen Worker-Service, der Zugriff auf alle anderen Hooks hat und für jeden Worker ausgeführt wird. Beachten Sie, dass Sie keine (globalen) Variablen zwischen beiden Arten von Services teilen können, da Worker-Services in einem anderen (Worker-)Prozess laufen.

Ein Launcher-Service kann wie folgt definiert werden:

```js
export default class CustomLauncherService {
    // Wenn ein Hook ein Promise zurückgibt, wartet WebdriverIO, bis dieses Promise aufgelöst ist, bevor es fortfährt.
    async onPrepare(config, capabilities) {
        // TODO: etwas, bevor alle Worker gestartet werden
    }

    onComplete(exitCode, config, capabilities) {
        // TODO: etwas, nachdem die Worker heruntergefahren wurden
    }

    // benutzerdefinierte Service-Methoden ...
}
```

Ein Worker-Service sollte hingegen so aussehen:

```js
export default class CustomWorkerService {
    /**
     * `serviceOptions` enthält alle für den Service spezifischen Optionen
     * z. B. wenn wie folgt definiert:
     *
     * ```
     * services: [['custom', { foo: 'bar' }]]
     * ```
     *
     * ist der Parameter `serviceOptions`: `{ foo: 'bar' }`
     */
    constructor (serviceOptions, capabilities, config) {
        this.options = serviceOptions
    }

    /**
     * das browser-Objekt wird hier zum ersten Mal übergeben
     */
    async before(config, capabilities, browser) {
        this.browser = browser

        // TODO: etwas, bevor alle Tests ausgeführt werden, z. B.:
        await this.browser.setWindowSize(1024, 768)
    }

    after(exitCode, config, capabilities) {
        // TODO: etwas, nachdem alle Tests ausgeführt wurden
    }

    beforeTest(test, context) {
        // TODO: etwas vor jedem Mocha/Jasmine-Testlauf
    }

    beforeScenario(test, context) {
        // TODO: etwas vor jedem Cucumber-Szenario-Lauf
    }

    // weitere Hooks oder benutzerdefinierte Service-Methoden ...
}
```

Es wird empfohlen, das browser-Objekt über den im Konstruktor übergebenen Parameter zu speichern. Exportieren Sie abschließend beide Arten von Workern wie folgt:

```js
import CustomLauncherService from './launcher'
import CustomWorkerService from './service'

export default CustomWorkerService
export const launcher = CustomLauncherService
```

Wenn Sie TypeScript verwenden und sicherstellen möchten, dass die Parameter der Hook-Methoden typsicher sind, können Sie Ihre Service-Klasse wie folgt definieren:

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

## Bedingte Worker-Services

Ein Service kann entscheiden, ob sein Worker-Code für einen Testlauf oder für einen bestimmten Worker benötigt wird. Es gibt zwei optionale Prüfungen:

| Prüfung | Wo sie ausgeführt wird | Argumente | Auswirkung der Rückgabe von `false` |
| --- | --- | --- | --- |
| Benannter Modul-Export `shouldLoad` | Launcher-Prozess, nach dem Importieren des Service-Moduls | Konfiguration, alle konfigurierten Capabilities | Das Service-Modul wird in keinem Worker importiert. Sein Launcher-Service läuft trotzdem. |
| Statische Worker-Service-Methode `shouldRun` | Worker-Prozess, vor der Erstellung des Service | Service-Optionen, die Capabilities dieses Workers, Konfiguration | Der Worker-Service wird nicht erstellt, daher wird keiner seiner Hooks in diesem Worker ausgeführt. |

Verwenden Sie `shouldLoad(config, capabilities)` für Service-Module, die per Name oder Pfad konfiguriert sind. Dies ist eine paketweite Entscheidung: Wenn derselbe Service mehrmals mit unterschiedlichen Optionen auftaucht, gilt das Ergebnis für alle diese Einträge. Ein benutzerdefinierter Service, der Remote-Zugangsdaten benötigt, könnte zum Beispiel Folgendes exportieren:

```js
// wdio-custom-service/index.js
import CustomLauncherService from './launcher.js'
import CustomWorkerService from './service.js'

export function shouldLoad(config, capabilities) {
    return Boolean(config.user && config.key)
}

export default CustomWorkerService
export const launcher = CustomLauncherService
```

Verwenden Sie `static shouldRun(options, capabilities, config)`, um für jeden Service-Eintrag und jeden Worker separat zu entscheiden. Dies funktioniert auch mit benutzerdefinierten Service-Klassen, die direkt in `services` übergeben werden. Dieser Service kann seine Hooks beispielsweise auf einen konfigurierten Browser beschränken:

```js
// wdio-custom-service/service.js
export default class CustomWorkerService {
    static shouldRun(options, capabilities, config) {
        return !options.browserName || options.browserName === capabilities.browserName
    }

    before(capabilities, specs, browser) {
        // Wird nur in Workern ausgeführt, die shouldRun bestanden haben.
    }
}
```

Mit `services: [['custom', { browserName: 'chrome' }]]` wird dieser Worker-Service nur für Chrome-Capabilities erstellt, sofern die `shouldLoad`-Prüfung des Pakets dies ebenfalls zulässt. Der Worker muss das Service-Modul importieren, um `shouldRun` aufzurufen; die Rückgabe von `false` aus dieser Methode verhindert diesen Import nicht und wirkt sich nicht auf den Launcher-Service aus.

Beide Prüfungen können einen Boolean oder ein Promise eines Booleans zurückgeben. WebdriverIO wartet auf jedes Ergebnis, und nur `false` deaktiviert das Laden bzw. die Erstellung. Services ohne diese Prüfungen behalten ihr bisheriges Verhalten bei. Bereits erstellte Service-Objekte mit Hooks bleiben unverändert.

Wenn eine der Prüfungen einen Fehler wirft oder das Promise abgelehnt wird, schlägt die Service-Initialisierung mit einem Fehler fehl, der den Service identifiziert. Dies unterscheidet sich von Fehlern, die von Service-Hooks geworfen werden, wie unten beschrieben.

## Fehlerbehandlung in Services

Ein Fehler, der während eines Service-Hooks geworfen wird, wird protokolliert, während der Runner weiterläuft. Wenn ein Hook in Ihrem Service für die Einrichtung oder das Herunterfahren des Testrunners kritisch ist, kann der aus dem `webdriverio`-Paket exportierte `SevereServiceError` verwendet werden, um den Runner zu stoppen.

```js
import { SevereServiceError } from 'webdriverio'

export default class CustomServiceLauncher {
    async onPrepare(config, capabilities) {
        // TODO: etwas Kritisches für die Einrichtung, bevor alle Worker gestartet werden

        throw new SevereServiceError('Something went wrong.')
    }

    // benutzerdefinierte Service-Methoden ...
}
```

## Service aus einem Modul importieren

Um diesen Service zu verwenden, müssen Sie ihn jetzt nur noch der Eigenschaft `services` zuweisen.

Passen Sie Ihre `wdio.conf.js`-Datei wie folgt an:

```js
import CustomService from './service/my.custom.service'

export const config = {
    // ...
    services: [
        /**
         * importierte Service-Klasse verwenden
         */
        [CustomService, {
            someOption: true
        }],
        /**
         * absoluten Pfad zum Service verwenden
         */
        ['/path/to/service.js', {
            someOption: true
        }]
    ],
    // ...
}
```

## Service auf NPM veröffentlichen

Um Services für die WebdriverIO-Community leichter nutzbar und auffindbar zu machen, befolgen Sie bitte diese Empfehlungen:

* Services sollten diese Namenskonvention verwenden: `wdio-*-service`
* Verwenden Sie die NPM-Keywords: `wdio-plugin`, `wdio-service`
* Der `main`-Eintrag sollte eine Instanz des Service `export`ieren
* Beispiel-Services: [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)

Wenn Sie dem empfohlenen Namensmuster folgen, können Services über ihren Namen hinzugefügt werden:

```js
// wdio-custom-service hinzufügen
export const config = {
    // ...
    services: ['custom'],
    // ...
}
```

### Veröffentlichten Service zur WDIO CLI und zur Dokumentation hinzufügen

Wir freuen uns sehr über jedes neue Plugin, das anderen helfen könnte, bessere Tests auszuführen! Wenn Sie ein solches Plugin erstellt haben, ziehen Sie bitte in Betracht, es zu unserer CLI und Dokumentation hinzuzufügen, damit es leichter gefunden werden kann.

Bitte erstellen Sie einen Pull Request mit den folgenden Änderungen:

- fügen Sie Ihren Service zur Liste der [unterstützten Services](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L92-L128)) im CLI-Modul hinzu
- erweitern Sie die [Service-Liste](https://github.com/webdriverio/webdriverio/blob/main/infra/docs/src/3rd-party/services.json), um Ihre Dokumentation zur offiziellen Webdriver.io-Seite hinzuzufügen