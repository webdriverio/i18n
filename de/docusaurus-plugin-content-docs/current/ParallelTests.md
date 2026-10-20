---
id: parallel-tests
title: Parallele Tests in einer Spec-Datei
description: "Führe die Mocha-Tests oder Cucumber-Szenarien einer Spec-Datei gleichzeitig aus, jeweils in einem eigenen WebDriver BiDi Browsing Context, mit mochaOpts.parallelMode oder cucumberOpts.parallelMode – eine Form von Browser-Pooling, ähnlich wie fullyParallel in Playwright."
---

Seit v10 kann WebdriverIO die Tests einer Spec-Datei gleichzeitig ausführen. Jedes Mocha-`it()` oder Cucumber-Szenario erhält ein eigenes Browserfenster (einen WebDriver BiDi [Browsing Context](https://w3c.github.io/webdriver-bidi/#browsing-context)) in einem Worker und einer Browser-Session. Nutze dies für Spec-Dateien mit vielen unabhängigen Tests: Sie laufen schneller durch, und du brauchst weder mehr Worker-Prozesse noch mehr Browser-Sessions, da jeder Test nur das Öffnen eines Fensters kostet.

Es handelt sich um eine Form von Browser-Pooling: Die Tests teilen sich einen Pool von Fenstern in einem Browser, nicht einen Pool von Browsern. Wenn du von Playwright kommst, ist `parallelMode: 'userContexts'` das nächste Äquivalent zu [`fullyParallel: true`](https://playwright.dev/docs/test-parallel#parallelize-tests-in-a-single-file): Jeder Test erhält seinen eigenen isolierten Kontext. Der Unterschied besteht darin, dass Playwright die Tests einer Datei auf Worker-Prozesse verteilt, jeder mit einem eigenen Browser, während WebdriverIO sie gleichzeitig in einem Worker und einem Browser ausführt.

Dies ist unabhängig von [`maxInstances`](./OrganizingTestSuites.md), das ganze Spec-Dateien parallel ausführt, mit einem Worker und einer Session pro Spec. Du kannst beides kombinieren: `maxInstances` legt fest, wie viele Spec-Dateien gleichzeitig laufen, und `maxParallelContexts` legt fest, wie viele Tests innerhalb jeder dieser Dateien gleichzeitig laufen.

:::warning Experimentell
Der parallele Modus erfordert die experimentelle Capability `'wdio:experimentalBiDiCommands'`, die die Implementierung der Element-Befehle in jedem Test ändert, nicht nur in parallelen. Siehe [Verhaltensänderungen der BiDi-Element-Befehle](#behavior-changes-of-the-bidi-element-commands).
:::

## Parallelen Modus aktivieren

Du benötigst:

- eine WebDriver BiDi Session (der Standard, sofern du nicht `'wdio:enforceWebDriverClassic': true` setzt),
- die Capability `'wdio:experimentalBiDiCommands': true`,
- `@wdio/mocha-framework` oder `@wdio/cucumber-framework`. Jasmine unterstützt den parallelen Modus nicht.

Wenn die Session kein BiDi verwendet oder die Capability fehlt, protokolliert WebdriverIO eine Warnung und führt die Tests nacheinander aus. Ohne `parallelMode` ändert sich nichts.

### Mocha

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    specs: ['./test/specs/**/*.e2e.ts'],
    maxInstances: 1,
    capabilities: [{
        browserName: 'chrome',
        'wdio:experimentalBiDiCommands': true
    }],
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
        parallelMode: 'contexts',
        maxParallelContexts: 4
    }
}
```

Die Spec-Datei benötigt keine Änderungen:

```ts title="test/specs/pages.e2e.ts"
import { browser, $, expect } from '@wdio/globals'

describe('webdriver.io', () => {
    it('shows the API page', async () => {
        await browser.url('https://webdriver.io/docs/api')
        await expect($('h1')).toHaveText('Introduction')
    })

    it('shows the getting started page', async () => {
        await browser.url('https://webdriver.io/docs/gettingstarted')
        await expect($('h1')).toHaveText('Getting Started')
    })
})
```

Beide Tests laufen gleichzeitig, jeder in seinem eigenen Fenster. `browser.url()`, `$()` und `expect()` wirken auf das Fenster des Tests, der sie aufruft.

### Cucumber

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    specs: ['./features/**/*.feature'],
    capabilities: [{
        browserName: 'chrome',
        'wdio:experimentalBiDiCommands': true
    }],
    framework: 'cucumber',
    cucumberOpts: {
        require: ['./features/step-definitions/**/*.ts'],
        parallelMode: 'contexts',
        maxParallelContexts: 4
    }
}
```

Jedes Szenario einer Feature-Datei läuft in seinem eigenen Fenster. Profile (`cucumberOpts.profiles`, `cucumberOpts.file`) sowie die Optionen `tags`, `name`, `strict`, `dryRun`, `failFast`, `retry` und `retryTagFilter` funktionieren wie bei einer sequenziellen Ausführung.

## Optionen

| Option | Werte | Standard | Beschreibung |
| --- | --- | --- | --- |
| `parallelMode` | `'contexts'`, `'userContexts'` | nicht gesetzt (sequenziell) | Aktiviert den parallelen Modus und legt fest, wie viel die Tests gemeinsam nutzen. |
| `maxParallelContexts` | Zahl | `os.cpus().length` | Wie viele Tests gleichzeitig laufen. |

Setze beide in `mochaOpts` oder in `cucumberOpts`.

`maxParallelContexts` legt die Anzahl der Slots fest. Jeder Slot führt jeweils einen Test aus, öffnet das Fenster für seinen nächsten Test, während der aktuelle Test läuft, und schließt das vorherige Fenster im Hintergrund. Bis zu 3 × `maxParallelContexts` Fenster, plus das erste Fenster der Session, können daher kurzzeitig geöffnet sein: Jeder Slot kann ein aktives, ein vorab geöffnetes und ein sich schließendes Fenster halten. Der parallele Modus schließt nur die Fenster, die er selbst geöffnet hat.

## Zwischen `contexts` und `userContexts` wählen

| | `'contexts'` | `'userContexts'` |
| --- | --- | --- |
| Fenster pro Test | ja | ja |
| Cookies, `localStorage`, Service Worker | von allen Tests gemeinsam genutzt | pro Test isoliert ([User Context](https://w3c.github.io/webdriver-bidi/#user-context)) |
| Login | einmal, wenn die Tests das Session-Cookie wiederverwenden | in jedem Test |
| Treiberunterstützung | jeder BiDi-Browser | benötigt Unterstützung für `browser.createUserContext()`, andernfalls schlägt die Ausführung fehl |

Wähle standardmäßig `'contexts'`. Wähle `'userContexts'`, wenn Tests die Cookies oder den Speicher der anderen nicht sehen dürfen, zum Beispiel bei Tests, die sich als unterschiedliche Benutzer anmelden. Wie `'contexts'` fällt auch `'userContexts'` mit einer Warnung auf eine sequenzielle Ausführung zurück, wenn die Session kein WebDriver BiDi ist oder `'wdio:experimentalBiDiCommands'` in den Capabilities fehlt. Wenn der Treiber `browser.createUserContext` nicht unterstützt, schlägt die Ausführung fehl, anstatt zurückzufallen.

`browser.newWindow()` öffnet das Fenster im Standard-User-Context, daher liegt ein auf diese Weise geöffnetes Fenster außerhalb der Cookie- und Speicherisolation des Tests.

## Was jedem Test gehört

Innerhalb eines parallelen Tests wirken diese Befehle auf das eigene Fenster des Tests:

- Navigation: `url`, `back`, `forward`, `refresh`, `getUrl`, `getTitle`
- Element-Befehle: `$`, `$$`, `shadow$`, `click`, `setValue`, `getText`, die `waitFor*`-Befehle und weitere
- `execute`, `actions`, `addInitScript`
- Cookies: `getCookies`, `setCookies`, `deleteCookies` verwenden die Cookie-Partition des Tests
- `mock()`: Ein in einem parallelen Test erstellter Mock fängt nur Anfragen des Fensters dieses Tests und seiner Frames ab und zeichnet sie auf, sodass zwei Tests dieselbe URL mocken können
- Screenshots: `saveScreenshot`, `takeElementScreenshot`

## Befehle, die im parallelen Modus einen Fehler werfen

Einige Befehle wirken auf den gesamten Browser oder die gesamte Session und können daher nicht auf das Fenster eines einzelnen Tests abzielen. Innerhalb eines parallelen Tests werfen sie einen Fehler, anstatt einen anderen Test zu beeinflussen:

| Befehle | Warum | Stattdessen verwenden |
| --- | --- | --- |
| `getWindowSize`, `setWindowSize` | das OS-Fenster wird gemeinsam genutzt | verwende `browser.setViewport()`, um die Seite eines Tests zu dimensionieren. Parallele Tests teilen sich ein OS-Fenster |
| `throttleNetwork`, `throttleCPU` | sie gelten für den gesamten Browser | führe diese Tests ohne parallelen Modus aus |
| `closeWindow`, `switchToParentFrame` | sie ändern das fokussierte Fenster, das alle Tests gemeinsam nutzen | belasse jeden Test in seinem eigenen Fenster |
| `reloadSession`, `setTimeout` | sie ändern die Session, die alle Tests gemeinsam nutzen | rufe sie im `before`-Hook in `wdio.conf.ts` auf |
| `acceptAlert`, `dismissAlert`, `getAlertText`, `sendAlertText` | Alerts gehören zu einem Browsing Context | rufe sie auf dem Kontext auf, den `browser.url()` zurückgibt: `const page = await browser.url('https://webdriver.io'); await page.acceptAlert()`. Verwende `page.acceptAlert(text)` statt `sendAlertText(text)`. `dismissAlert()` und `getAlertText()` funktionieren ebenfalls auf dem Kontext |
| `getComputedRole`, `getComputedLabel` | WebDriver BiDi kann sie nicht auslesen | führe diese Tests ohne parallelen Modus aus |

`switchWindow` wurde in v10 für alle WebDriver BiDi Sessions entfernt, nicht nur im parallelen Modus. Es wirft ``switchWindow` was removed for WebDriver BiDi sessions in WebdriverIO v10. Hold the browsing context returned by `browser.url()` or `browser.newWindow()`, or find one with `browser.browsingContexts()`.`` Behalte das Kontextobjekt, anstatt zu ihm zu wechseln.

WebdriverIO schließt Prompts automatisch, sofern nichts auf das `dialog`-Event hört. Registriere daher einen Listener (`browser.on('dialog', () => {})`), bevor du in einem Test auf einen Prompt antwortest.

Jeder andere WebDriver Classic-Befehl wirft ebenfalls einen Fehler. Nur `status`, `getTimeouts` und `getWindowHandles` sind erlaubt. Wenn ein WebdriverIO-Befehl im parallelen Modus auf WebDriver Classic zurückfällt, ohne dass du einen Classic-Befehl aufgerufen hast, [melde dies bitte](https://github.com/webdriverio/webdriverio/issues/new/choose).

## Hooks und Timeouts

### Mocha

- `before()` und `after()` in einer Spec-Datei laufen **einmal pro Test**, nicht einmal pro `describe`, da jeder Test sein eigenes Fenster hat. Jeder Test führt `before`, `beforeEach`, den Test, `afterEach` und `after` in seinem Fenster aus. Lege Setup, das einmal pro Spec-Datei laufen soll, in die Hooks `beforeSuite` / `afterSuite` in `wdio.conf.ts`. Diese laufen einmal, außerhalb jedes Testfensters.
- Nur `mochaOpts.timeout` gilt. `this.timeout()` in einem Test oder Hook wirft einen Fehler, und `it(...).timeout()` oder ein `describe`-Timeout wird mit einer Warnung ignoriert. Siehe [Mocha-Timeouts und die WebdriverIO-Hooks](./Timeouts.md#mocha-timeouts-and-the-webdriverio-hooks).
- `mochaOpts.bail` und `mochaOpts.retries` werden nicht unterstützt und lassen die Ausführung fehlschlagen. `this.retries()` wirft einen Fehler.
- `.only()`, `this.skip()`, `grep`, `fgrep` und `invert` funktionieren wie bei einer sequenziellen Ausführung.

### Cucumber

- `BeforeAll` / `AfterAll` und die Hooks `beforeFeature` / `afterFeature` in `wdio.conf.ts` laufen einmal pro Worker, nicht einmal pro Feature. `beforeFeature` / `afterFeature` erhalten nur die URI und das Feature der ersten Feature-Datei, was relevant ist, wenn ein Worker mehrere Feature-Dateien ausführt, zum Beispiel bei gruppierten Specs. Sie laufen außerhalb des Fensters eines Szenarios und dürfen daher keine Befehle verwenden, die eines benötigen.
- `Before` / `After`, `BeforeStep` / `AfterStep` sowie die Szenario- und Step-Hooks in `wdio.conf.ts` laufen für jedes Szenario im Fenster dieses Szenarios.
- `cucumberOpts.strict` ist in WebdriverIO standardmäßig `false`. Ein ausstehender (pending) Step lässt das Szenario nur mit `strict: true` fehlschlagen.

### Beide Frameworks

Das Fenster eines Tests wird geschlossen, sobald der Test beendet ist. Starte keine Timer oder Promises, die nach dem Ende des Tests weiterlaufen.

## Verhaltensänderungen der BiDi-Element-Befehle

`'wdio:experimentalBiDiCommands': true` tauscht die Implementierung mehrerer Element-Befehle in jedem Test der Session aus, egal ob sequenziell oder parallel:

- `addValue` und `clearValue` lösen synthetische DOM-Events aus, keine vertrauenswürdigen (trusted) Tastatur-Events.
- `getAttribute` folgt den WebDriver-Regeln für Property- und Attributwerte.
- `click` wird über die Actions API gesendet.

Führe deine Suite einmal mit der Capability und ohne `parallelMode` aus, um Tests zu finden, die vom Classic-Verhalten abhängen.

## Reporter

Reporter, die [`@wdio/reporter`](./CustomReporter.md) erweitern, melden parallele Tests unter der richtigen Suite und ordnen einen Befehl dem Test zu, dessen Browsing Context ihn gesendet hat.

`@wdio/allure-reporter` und `@wdio/junit-reporter` unterstützen den parallelen Modus noch nicht. Sie verfolgen einen aktuellen Test pro Worker, sodass bei sich überschneidenden Tests Allure-Ergebnisse, Steps und Anhänge sowie JUnit-Properties und Worker-Logs unter dem falschen Test landen können. Verwende sie bei sequenziellen Ausführungen. Mit `addConsoleLogs` ordnet `@wdio/spec-reporter` die Konsolenausgabe sich überschneidender Tests nicht zuverlässig zu.

Ein benutzerdefinierter Reporter darf nicht davon ausgehen, dass ein Test endet, bevor der nächste beginnt. Siehe [Reporter und parallele Tests](./CustomReporter.md#reporters-and-parallel-tests).

## Fehlerbehebung

### `parallelMode: "contexts" requires 'wdio:experimentalBiDiCommands': true to be set in capabilities`

Füge `'wdio:experimentalBiDiCommands': true` zur Capability hinzu. Ohne sie laufen die Tests nacheinander. Bei Cucumber lautet die Meldung `Parallel mode (cucumberOpts.parallelMode: "contexts") requires "wdio:experimentalBiDiCommands" to be set in capabilities`.

### `... is set but the browser session does not support WebDriver Bidi`

Die Session verwendet WebDriver Classic. Entferne `'wdio:enforceWebDriverClassic': true` aus der Capability oder verwende einen Browser und Treiber mit WebDriver BiDi-Unterstützung. Bei Cucumber lautet die Meldung `Parallel mode (cucumberOpts.parallelMode: "contexts") requires a WebDriver Bidi session. Falling back to sequential execution.`

### `parallelMode: "userContexts" requires browser.createUserContext and browser.removeUserContext, which this driver does not support`

Der Treiber kann keine User Contexts erstellen. Verwende `parallelMode: 'contexts'` oder aktualisiere Browser und Treiber. Bei Cucumber lautet die Meldung `cucumberOpts.parallelMode "userContexts" requires browser.createUserContext, which this driver does not provide. Use a driver with BiDi user context support or set parallelMode to "contexts" (shares cookies and storage between scenarios).`

### `... is not supported inside parallel mode tests because ...` oder `... is not supported in parallel mode`

Der Test hat einen Befehl aus [Befehle, die im parallelen Modus einen Fehler werfen](#commands-that-throw-in-parallel-mode) aufgerufen. Verwende die Alternative aus der Tabelle.

### `bail is not supported in parallel mode` / `retries is not supported in parallel mode`

Entferne `mochaOpts.bail` oder `mochaOpts.retries` oder führe die Spec-Datei ohne `parallelMode` aus.

### `Suite-level hooks (before()/after()) run once per test in parallel mode`

Die Spec-Datei enthält `before()`- oder `after()`-Hooks. Sie laufen für jeden Test. Verschiebe Setup, das nur einmal laufen soll, nach `beforeSuite` / `afterSuite` in `wdio.conf.ts`.

## Verwandte Seiten

- [Test-Suites organisieren](./OrganizingTestSuites.md): Spec-Dateien mit `maxInstances` parallel ausführen
- [Sharding](./Sharding.md): die Suite auf mehrere Maschinen aufteilen
- [Frameworks](./Frameworks.md): alle Mocha- und Cucumber-Optionen
- [Automatisierungsprotokolle](./AutomationProtocols.md): WebDriver BiDi und WebDriver Classic