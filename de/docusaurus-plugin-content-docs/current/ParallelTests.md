---
id: parallel-tests
title: Parallele Tests in einer Spec-Datei
description: "Führe die Mocha-Tests oder Cucumber-Szenarien einer Spec-Datei gleichzeitig aus, jeweils in einem eigenen WebDriver BiDi Browsing Context, mit mochaOpts.parallelMode oder cucumberOpts.parallelMode – eine Form von Browser-Pooling ähnlich wie Playwrights fullyParallel."
---

Seit v10 kann WebdriverIO die Tests einer Spec-Datei gleichzeitig ausführen. Jedes Mocha-`it()` oder Cucumber-Szenario erhält ein eigenes Browserfenster (einen WebDriver BiDi [Browsing Context](https://w3c.github.io/webdriver-bidi/#browsing-context)) in einem Worker und einer Browser-Session. Nutze dies für Spec-Dateien mit vielen unabhängigen Tests: Sie sind schneller fertig, und du brauchst keine zusätzlichen Worker-Prozesse oder Browser-Sessions, da jeder Test nur das Öffnen eines Fensters kostet.

Es handelt sich um eine Form von Browser-Pooling: Die Tests teilen sich einen Pool von Fenstern in einem Browser, nicht einen Pool von Browsern. Wenn du von Playwright kommst, ist `parallelMode: 'userContexts'` das nächste Äquivalent zu [`fullyParallel: true`](https://playwright.dev/docs/test-parallel#parallelize-tests-in-a-single-file): Jeder Test erhält seinen eigenen isolierten Kontext. Der Unterschied ist, dass Playwright die Tests einer Datei auf Worker-Prozesse mit jeweils eigenem Browser verteilt, während WebdriverIO sie gleichzeitig in einem Worker und einem Browser ausführt.

Dies ist unabhängig von [`maxInstances`](./OrganizingTestSuites.md), das ganze Spec-Dateien parallel ausführt, mit einem Worker und einer Session pro Spec. Du kannst beides kombinieren: `maxInstances` legt fest, wie viele Spec-Dateien gleichzeitig laufen, und `maxParallelContexts` legt fest, wie viele Tests innerhalb jeder dieser Dateien gleichzeitig laufen.

:::warning Experimentell
Der Parallel-Modus erfordert die experimentelle Capability `'wdio:experimentalBiDiCommands'`, die die Implementierung der Element-Befehle in jedem Test ändert, nicht nur in parallelen. Siehe [Verhaltensänderungen der BiDi-Element-Befehle](#behavior-changes-of-the-bidi-element-commands).
:::

## Parallel-Modus aktivieren

Du benötigst:

- eine WebDriver-BiDi-Session (Standard, sofern du nicht `'wdio:enforceWebDriverClassic': true` setzt),
- die Capability `'wdio:experimentalBiDiCommands': true`,
- `@wdio/mocha-framework` oder `@wdio/cucumber-framework`. Jasmine unterstützt den Parallel-Modus nicht.

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

Jedes Szenario einer Feature-Datei läuft in seinem eigenen Fenster. Profile (`cucumberOpts.profiles`, `cucumberOpts.file`), Specs mit Zeilennummern (`--spec ./features/login.feature:5`) sowie die Optionen `tags`, `name`, `order`, `strict`, `dryRun`, `failFast`, `retry` und `retryTagFilter` funktionieren wie bei einem sequenziellen Lauf. Features, Szenarien, Steps und Hooks werden wie bei einem sequenziellen Lauf gemeldet, auch mit `ignoreUndefinedDefinitions`, `failAmbiguousDefinitions`, `tagsInTitle` und `scenarioLevelReporter`.

## Optionen

| Option | Werte | Standard | Beschreibung |
| --- | --- | --- | --- |
| `parallelMode` | `'contexts'`, `'userContexts'` | nicht gesetzt (sequenziell) | Aktiviert den Parallel-Modus und legt fest, wie viel sich die Tests teilen. |
| `maxParallelContexts` | Zahl | `os.cpus().length` | Wie viele Tests gleichzeitig laufen. |

Setze beide in `mochaOpts` oder in `cucumberOpts`.

`maxParallelContexts` legt die Anzahl der Slots fest. Jeder Slot führt jeweils einen Test aus, öffnet das Fenster für seinen nächsten Test, während der aktuelle Test läuft, und schließt das vorherige Fenster im Hintergrund. Daher können kurzzeitig bis zu 3 × `maxParallelContexts` Fenster plus das erste Fenster der Session geöffnet sein: Jeder Slot kann ein aktives, ein vorab geöffnetes und ein sich schließendes Fenster halten. Der Parallel-Modus schließt nur die Fenster, die er selbst geöffnet hat.

## Zwischen `contexts` und `userContexts` wählen

| | `'contexts'` | `'userContexts'` |
| --- | --- | --- |
| Fenster pro Test | ja | ja |
| Cookies, `localStorage`, Service Worker | von allen Tests geteilt | pro Test isoliert ([User Context](https://w3c.github.io/webdriver-bidi/#user-context)) |
| Login | einmal, wenn die Tests das Session-Cookie wiederverwenden | in jedem Test |
| Treiberunterstützung | jeder BiDi-Browser | benötigt Unterstützung für `browser.createUserContext()`, andernfalls schlägt der Lauf fehl |

Wähle standardmäßig `'contexts'`. Wähle `'userContexts'`, wenn Tests die Cookies oder den Speicher anderer Tests nicht sehen dürfen, zum Beispiel bei Tests, die sich als unterschiedliche Benutzer anmelden. Wie `'contexts'` fällt auch `'userContexts'` mit einer Warnung auf einen sequenziellen Lauf zurück, wenn die Session kein WebDriver BiDi verwendet oder `'wdio:experimentalBiDiCommands'` in den Capabilities fehlt. Wenn der Treiber `browser.createUserContext` nicht unterstützt, schlägt der Lauf fehl, statt zurückzufallen.

Ein Tab oder Fenster, das ein Test mit `browser.newWindow(url)` öffnet, wird aus dem Fenster des Tests heraus geöffnet und hat daher die Cookies und den Speicher des Tests. Um ein Fenster außerhalb der Cookie- und Speicherisolation des Tests zu öffnen, erstelle es mit `browser.browsingContextCreate()` und hole dir seinen Browsing Context über `browser.browsingContexts()`:

```js
const { context } = await browser.browsingContextCreate({ type: 'window' })
await browser.browsingContextNavigate({ context, url: 'https://example.com', wait: 'complete' })
const outside = (await browser.browsingContexts()).find((c) => c.contextId === context)
await outside.$('h1').getText()
```

## Was jedem Test gehört

Innerhalb eines parallelen Tests wirken diese Befehle auf das eigene Fenster des Tests:

- Navigation: `url`, `back`, `forward`, `refresh`, `getUrl`, `getTitle`
- Element-Befehle: `$`, `$$`, `shadow$`, `click`, `setValue`, `getText`, die `waitFor*`-Befehle und andere
- `execute`, `actions`, `addInitScript`
- Cookies: `getCookies`, `setCookies`, `deleteCookies` verwenden die Cookie-Partition des Tests
- `mock()`: Ein in einem parallelen Test erstellter Mock fängt nur Requests des Fensters dieses Tests und seiner Frames ab und zeichnet sie auf, sodass zwei Tests dieselbe URL mocken können
- Screenshots: `saveScreenshot`, `takeElementScreenshot`

## Befehle, die im Parallel-Modus einen Fehler werfen

Einige Befehle wirken auf den gesamten Browser oder die gesamte Session und können daher nicht auf das Fenster eines einzelnen Tests abzielen. Innerhalb eines parallelen Tests werfen sie einen Fehler, statt einen anderen Test zu beeinflussen:

| Befehle | Grund | Stattdessen verwenden |
| --- | --- | --- |
| `getWindowSize`, `setWindowSize` | das OS-Fenster wird geteilt | verwende `browser.setViewport()`, um die Seite eines Tests zu dimensionieren. Parallele Tests teilen sich ein OS-Fenster |
| `throttleNetwork`, `throttleCPU` | sie gelten für den gesamten Browser | führe diese Tests ohne Parallel-Modus aus |
| `closeWindow`, `switchToParentFrame` | sie ändern das fokussierte Fenster, das alle Tests teilen | belasse jeden Test in seinem eigenen Fenster |
| `reloadSession`, `setTimeout` | sie ändern die Session, die alle Tests teilen | rufe sie im `before`-Hook in `wdio.conf.ts` auf |
| `acceptAlert`, `dismissAlert`, `getAlertText`, `sendAlertText` | Alerts gehören zu einem Browsing Context | rufe sie auf dem Kontext auf, den `browser.url()` zurückgibt: `const page = await browser.url('https://webdriver.io'); await page.acceptAlert()`. Verwende `page.acceptAlert(text)` statt `sendAlertText(text)`. `dismissAlert()` und `getAlertText()` funktionieren ebenfalls auf dem Kontext |
| `getComputedRole`, `getComputedLabel` | WebDriver BiDi kann sie nicht auslesen | führe diese Tests ohne Parallel-Modus aus |

`switchWindow` wurde in v10 für alle WebDriver-BiDi-Sessions entfernt, nicht nur im Parallel-Modus. Es wirft ``switchWindow` was removed for WebDriver BiDi sessions in WebdriverIO v10. Hold the browsing context returned by `browser.url()` or `browser.newWindow()`, or find one with `browser.browsingContexts()`.`` Behalte das Kontext-Objekt, statt zu ihm zu wechseln.

WebdriverIO schließt Prompts automatisch, sofern nichts auf das `dialog`-Event hört. Registriere daher einen Listener (`browser.on('dialog', () => {})`), bevor du in einem Test auf einen Prompt antwortest.

Jeder andere WebDriver-Classic-Befehl wirft ebenfalls einen Fehler. Nur `status`, `getTimeouts` und `getWindowHandles` sind erlaubt. Wenn ein WebdriverIO-Befehl im Parallel-Modus auf WebDriver Classic zurückfällt, ohne dass du einen Classic-Befehl aufrufst, [melde es bitte](https://github.com/webdriverio/webdriverio/issues/new/choose).

## Hooks und Timeouts

### Mocha

- `before()` und `after()` in einer Spec-Datei laufen **einmal pro Test**, nicht einmal pro `describe`, da jeder Test sein eigenes Fenster hat. Jeder Test führt `before`, `beforeEach`, den Test, `afterEach` und `after` in seinem Fenster aus. Lege Setup, das einmal pro Spec-Datei laufen soll, in die Hooks `beforeSuite` / `afterSuite` in `wdio.conf.ts`. Diese laufen einmal, außerhalb jedes Testfensters.
- Da jeder Test seine eigenen Hooks ausführt, betrifft ein fehlschlagender Hook nur seinen eigenen Test. Ein fehlschlagendes `before()` wird einmal für jeden Test gemeldet, nicht einmal für das `describe`. Ein fehlschlagendes `beforeEach()` oder `afterEach()` stoppt die anderen Tests des `describe` nicht. Bei einem sequenziellen Lauf überspringt Mocha sie. Mit `failHookAffectedTests` (Standard) schlägt der Test, den ein fehlgeschlagenes `before()` oder `beforeEach()` überspringt, mit demselben Text wie bei einem sequenziellen Lauf fehl. Nur der Hook-Titel kann abweichen: Ein fehlgeschlagenes `beforeEach()` nennt den Test seines eigenen Fensters (`"before each" hook for "t2"`), während ein sequenzieller Lauf für alle den ersten Test nennt.
- Nur `mochaOpts.timeout` gilt. `this.timeout()` in einem Test oder Hook wirft einen Fehler, und `it(...).timeout()` oder ein `describe`-Timeout wird mit einer Warnung ignoriert. Siehe [Mocha-Timeouts und die WebdriverIO-Hooks](./Timeouts.md#mocha-timeouts-and-the-webdriverio-hooks).
- `mochaOpts.bail` und Mocha-Retries werden nicht unterstützt und lassen den Lauf fehlschlagen: `mochaOpts.retries`, `this.retries(n)` in einem `describe` und `it(...).retries(n)`. `this.retries()` in einem Test oder Hook wirft einen Fehler. Die [WebdriverIO-Retries](./Retry.md) (`it(title, fn, retries)`) funktionieren im Parallel-Modus.
- `.only()`, `this.skip()`, `grep`, `fgrep` und `invert` funktionieren wie bei einem sequenziellen Lauf.
- Ein Fehler, auf den kein Test wartet (zum Beispiel ein Timer, der einen Fehler wirft), lässt den Test oder Hook des Fensters fehlschlagen, aus dem er stammt, und die anderen Tests laufen weiter. Wie bei einem sequenziellen Lauf lässt eine unbehandelte Rejection keinen Test fehlschlagen, und mit `mochaOpts.allowUncaught` beendet der Fehler den Worker. Ein Fehler, der nach dem Ende seines Tests auftritt, während andere Tests noch laufen, lässt den Lauf fehlschlagen und wird protokolliert, aber kein Test zeigt ihn an (ein sequenzieller Lauf zeigt ihn bei dem Test an, der zu diesem Zeitpunkt läuft). Nachdem das letzte Fenster geschlossen wurde, beendet ein solcher Fehler den Worker, wie bei einem sequenziellen Lauf. Dasselbe gilt für einen Fehler eines Event-Emitters, den dein Code außerhalb eines Tests erstellt hat, und unter Node.js 22 für einen Fehler aus `queueMicrotask()`, da das Fenster des Tests dort nicht bekannt ist.
- `mochaOpts.dryRun`, `forbidPending` und `checkLeaks` greifen im Parallel-Modus noch nicht: Die Tests laufen, ein ausstehender Test schlägt nicht fehl, und ein globales Leak wird nicht gemeldet.

### Cucumber

- `BeforeAll` / `AfterAll` und die Hooks `beforeFeature` / `afterFeature` in `wdio.conf.ts` laufen einmal pro Worker, nicht einmal pro Feature. `beforeFeature` / `afterFeature` erhalten nur die URI und das Feature der ersten Feature-Datei. Das ist relevant, wenn ein Worker mehrere Feature-Dateien ausführt, zum Beispiel bei gruppierten Specs. Sie laufen außerhalb des Fensters jedes Szenarios und dürfen daher keine Befehle verwenden, die ein Fenster benötigen.
- `Before` / `After`, `BeforeStep` / `AfterStep` sowie die Szenario- und Step-Hooks in `wdio.conf.ts` laufen für jedes Szenario im Fenster dieses Szenarios.
- `cucumberOpts.strict` ist in WebdriverIO standardmäßig `false`. Ein ausstehender Step lässt das Szenario nur mit `strict: true` fehlschlagen.
- Mit `failFast` laufen die Szenarien, die bereits in anderen Fenstern laufen, nach dem ersten Fehlschlag zu Ende. Die Szenarien, die noch nicht gestartet sind, werden wie bei einem sequenziellen Lauf als übersprungen gemeldet.
- Mit `ignoreUndefinedDefinitions: true` lässt ein mehrdeutiger Step (mit `failAmbiguousDefinitions: false`) oder ein ausstehender Step mit `strict: true` den Lauf fehlschlagen. Ein sequenzieller Lauf ist dann erfolgreich.
- Cucumber-Formatter (`format`, `formatOptions`, `publish`) laufen nicht und schreiben daher keine Datei.

### Beide Frameworks

Das Fenster eines Tests wird geschlossen, sobald der Test beendet ist. Starte keine Timer oder Promises, die nach dem Ende des Tests weiterlaufen.

## Verhaltensänderungen der BiDi-Element-Befehle

`'wdio:experimentalBiDiCommands': true` tauscht die Implementierung mehrerer Element-Befehle in jedem Test der Session aus, ob sequenziell oder parallel:

- `addValue` und `clearValue` lösen synthetische DOM-Events aus, keine vertrauenswürdigen Tastatur-Events.
- `getAttribute` folgt den WebDriver-Regeln für Property- und Attributwerte.
- `click` wird über die Actions-API gesendet.

Führe deine Suite einmal mit der Capability und ohne `parallelMode` aus, um Tests zu finden, die vom Classic-Verhalten abhängen.

## Reporter

Reporter, die [`@wdio/reporter`](./CustomReporter.md) erweitern, melden parallele Tests unter der richtigen Suite und ordnen einen Befehl dem Test zu, dessen Browsing Context ihn gesendet hat.

`@wdio/allure-reporter` unterstützt den Parallel-Modus mit Mocha. Er schreibt das Ergebnis eines Tests, wenn der Test und seine `afterEach()`- und `after()`-Hooks enden. `before()`- und `after()`-Hooks laufen im Parallel-Modus einmal pro Test, daher zeigt der Report ihre Fixtures einmal pro Test. Mit Cucumber unterstützt Allure den Parallel-Modus noch nicht: Ergebnisse, Steps und Anhänge überlappender Szenarien können unter dem falschen Szenario landen, verwende ihn daher bei sequenziellen Läufen.

`@wdio/spec-reporter` unterstützt den Parallel-Modus noch nicht: Ein Mocha-`describe`-Block, der nach einem anderen kommt, oder ein Cucumber-Szenario, das startet, während ein anderes läuft, wird verschachtelt darunter angezeigt, und mit Cucumber-`retry` kann die Anzahl bestandener Tests falsch sein. Die Ergebnisse der Tests und der Exit-Code sind korrekt.

`@wdio/cucumberjs-json-reporter` unterstützt den Parallel-Modus noch nicht: Steps und Anhänge überlappender Szenarien können im falschen Szenario landen, und der Reporter protokolliert eine Warnung. Verwende ihn bei sequenziellen Läufen.

`@wdio/html-reporter` unterstützt den Parallel-Modus noch nicht: Logs, Screenshots und Videos, die ein Test sendet, nachdem ein anderer Test gestartet ist, können unter dem falschen Test landen. Verwende ihn bei sequenziellen Läufen.

`@wdio/video-reporter` zeichnet jeden parallelen Test in einem eigenen Video auf. Mit Cucumber hängt er die Videos nicht an Allure an.

Ein eigener Reporter darf nicht davon ausgehen, dass ein Test endet, bevor der nächste startet. Siehe [Reporter und parallele Tests](./CustomReporter.md#reporters-and-parallel-tests).

## Cloud-Anbieter

Cloud-Anbieter zeichnen ein Video, einen Satz Logs und einen Teststatus pro Browser-Session auf. Im Parallel-Modus teilen sich viele Tests diese Session, sodass das Dashboard des Anbieters Video, Logs oder Bestanden/Fehlgeschlagen-Status nicht nach Test aufteilen kann. `userContexts` erfordert außerdem, dass das Grid des Anbieters `browser.createUserContext` unterstützt (und mit Mocha `browser.removeUserContext`). Der Parallel-Modus wurde bisher bei keinem Cloud-Anbieter getestet.

Wir empfehlen, den Parallel-Modus deaktiviert zu lassen, wenn du bei einem Cloud-Anbieter ausführst, und [`maxInstances`](./OrganizingTestSuites.md) zu verwenden, um Spec-Dateien parallel auszuführen. Um ihn zu deaktivieren, entferne `parallelMode` aus den Framework-Optionen. Wenn du nur `'wdio:experimentalBiDiCommands'` entfernst, laufen die Tests nacheinander und jeder Lauf protokolliert eine Warnung.

## Fehlerbehebung

### `parallelMode: "contexts" requires 'wdio:experimentalBiDiCommands': true to be set in capabilities`

Füge `'wdio:experimentalBiDiCommands': true` zur Capability hinzu. Ohne sie laufen die Tests nacheinander. Mit Cucumber lautet die Meldung `Parallel mode (cucumberOpts.parallelMode: "contexts") requires "wdio:experimentalBiDiCommands" to be set in capabilities`.

### `... is set but the browser session does not support WebDriver Bidi`

Die Session verwendet WebDriver Classic. Entferne `'wdio:enforceWebDriverClassic': true` aus der Capability oder verwende einen Browser und Treiber mit WebDriver-BiDi-Unterstützung. Mit Cucumber lautet die Meldung `Parallel mode (cucumberOpts.parallelMode: "contexts") requires a WebDriver Bidi session. Falling back to sequential execution.`

### `parallelMode: "userContexts" requires browser.createUserContext and browser.removeUserContext, which this driver does not support`

Der Treiber kann keine User Contexts erstellen. Verwende `parallelMode: 'contexts'` oder aktualisiere Browser und Treiber. Mit Cucumber lautet die Meldung `cucumberOpts.parallelMode "userContexts" requires browser.createUserContext, which this driver does not provide. Use a driver with BiDi user context support or set parallelMode to "contexts" (shares cookies and storage between scenarios).`

### `... is not supported inside parallel mode tests because ...` oder `... is not supported in parallel mode`

Der Test hat einen Befehl aus [Befehle, die im Parallel-Modus einen Fehler werfen](#commands-that-throw-in-parallel-mode) aufgerufen. Verwende die Alternative aus der Tabelle.

### `bail is not supported in parallel mode` / `retries is not supported in parallel mode`

Entferne `mochaOpts.bail` oder `mochaOpts.retries` bzw. das `this.retries(n)` / `.retries(n)` des Tests, den der Fehler nennt, oder führe die Spec-Datei ohne `parallelMode` aus. Um einen Test im Parallel-Modus zu wiederholen, verwende die [WebdriverIO-Retries](./Retry.md) (`it(title, fn, retries)`).

### `Suite-level hooks (before()/after()) run once per test in parallel mode`

Die Spec-Datei enthält `before()`- oder `after()`-Hooks. Sie laufen für jeden Test. Verschiebe Setup, das nur einmal laufen soll, nach `beforeSuite` / `afterSuite` in `wdio.conf.ts`.

## Verwandte Seiten

- [Testsuiten organisieren](./OrganizingTestSuites.md): Spec-Dateien mit `maxInstances` parallel ausführen
- [Sharding](./Sharding.md): die Suite auf mehrere Maschinen aufteilen
- [Frameworks](./Frameworks.md): alle Mocha- und Cucumber-Optionen
- [Automatisierungsprotokolle](./AutomationProtocols.md): WebDriver BiDi und WebDriver Classic