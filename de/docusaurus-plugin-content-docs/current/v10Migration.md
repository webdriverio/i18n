---
id: v10-migration
title: Von v9 zu v10
description: Ein WebdriverIO-v9-Projekt auf v10 aktualisieren, einschließlich aller Breaking Changes und eines Coding-Agent-Skills, der diesen Leitfaden anwendet.
---

Dieser Leitfaden sammelt die Breaking Changes von WebdriverIO `v10` und beschreibt, was Sie jeweils tun müssen.

Anders als bei früheren Major-Versionen können die meisten dieser Änderungen nicht durch den WebdriverIO-[Codemod](https://github.com/webdriverio/codemod) angewendet werden, da sie davon abhängen, was Ihre Tests tatsächlich bedeuten. Die unten beschriebenen [veralteten Befehlssignaturen](#legacy-command-signatures) sind mechanische Ersetzungen. Jeder andere Abschnitt beschreibt, wie Sie die betroffenen Stellen in Ihrer Suite finden.

## Mit einem Coding-Agent migrieren {#migrate-with-a-coding-agent}

Geben Sie Ihrem Agent den v10-Migrations-Skill und bitten Sie ihn, die Suite gemäß dieser Seite auf WebdriverIO v10 zu migrieren. Der Skill ist die Vorgehensweise: wonach gesucht werden soll, welcher Codemod ausgeführt werden soll und wann aufgehört werden soll. Diese Seite ist die maßgebliche Quelle für jede Änderung.

Installieren Sie ihn aus dem Projekt, das Sie aktualisieren. Die [Skills-CLI](https://skills.sh) liest [`.agents/skills/wdio-v10-migration/SKILL.md`](https://github.com/webdriverio/webdriverio/blob/main/.agents/skills/wdio-v10-migration/SKILL.md) aus diesem Repository und schreibt ihn in das Skill-Verzeichnis der von Ihnen ausgewählten Agents:

```sh
npx skills add webdriverio/webdriverio --skill wdio-v10-migration
```

`--skill wdio-v10-migration` installiert diesen Skill. Skills für die Arbeit am WebdriverIO-Repository sind als intern markiert und werden nicht angeboten. Die CLI fragt, für welche Agents installiert werden soll, und schreibt den Skill in das Projektverzeichnis jedes Agents. Sie können diese Datei auch an den Chat anhängen.

Strikte Selektoren und reine `specs`- / `exclude`-Listen in Capabilities zeigen sich erst, wenn die Suite läuft. Der Skill kann diese nicht allein anhand des Quellcodes beurteilen.

## Node.js

WebdriverIO v10 erfordert Node.js 22.19.0 oder neuer. Node.js 18 und 20 werden nicht mehr unterstützt. Die CI deckt Node.js 22, 24 und 26 ab.

## Komponententests

Der Browser-Runner läuft weiterhin in Chrome 90, Edge 90, Firefox 90 und Safari 14.1 oder neuer. Siehe [Browserunterstützung](/docs/component-testing#browser-support).

Code, der an `browser.execute` übergeben wird, bleibt bei ES2021, damit er in älteren getesteten Browsern laufen kann. Diese Untergrenze hat sich nicht geändert.

## Mocha

`@wdio/mocha-framework` und `@wdio/browser-runner` hängen von [Mocha 12](https://mochajs.org/blog/mocha-12-stable/) ab. Mocha 12 benötigt Node.js `^20.19.0 || >=22.12.0`, was durch die v10-Untergrenze von 22.19.0 abgedeckt ist.

```diff
- mochaOpts: { compilers: ['ts:ts-node/register'] }
+ mochaOpts: { require: ['ts-node/register'] }
```

`mochaOpts.compilers` entfällt. Mocha hat das lange veraltete Flag `--compilers` entfernt, daher werden verbliebene Compiler-Zuordnungen ignoriert. Laden Sie Transpiler oder andere Setup-Dateien mit `mochaOpts.require`.

WebdriverIO folgt dem Mocha-Timeout: `this.timeout()` in einem Test oder Hook sowie `mochaOpts.timeout: 0`, das den Timeout deaktiviert. In v9 ignorierte WebdriverIO `this.timeout()` in einem Test, und ab 9.22 ließ `mochaOpts.timeout: 0` jeden Test fehlschlagen ("Timeout after -3ms"). Das `retry`-Argument von WebdriverIO führt einen Test nach einem Timeout nicht erneut aus. Siehe [Mocha-Timeouts und die WebdriverIO-Hooks](./Timeouts.md#mocha-timeouts-and-the-webdriverio-hooks), auch zu `mochaOpts.parallelMode`. Neu in v10: [parallele Tests in einer Spec-Datei](./ParallelTests.md) mit `mochaOpts.parallelMode` oder `cucumberOpts.parallelMode`.

`failHookAffectedTests` ist standardmäßig `true`. Ein fehlschlagender `before`- oder `beforeEach`-Hook lässt die Tests fehlschlagen, die dieser Hook übersprungen hat. Setzen Sie `mochaOpts.failHookAffectedTests` auf `false`, um nur den Hook zu melden.

Verwenden Sie `expect-webdriverio` 8, siehe [expect-webdriverio 8](#expect-webdriverio-8). Mocha kann dieses Paket in einem Prozess zweimal laden; es teilt den Assertion-Zustand zwischen diesen Kopien ([expect-webdriverio#2221](https://github.com/webdriverio/expect-webdriverio/pull/2221)).

Mocha-12-Änderungen, die über `mochaOpts` durchschlagen können:

- `grep` akzeptiert moderne RegExp-Flags.
- `ui` ist weiterhin `bdd`, `tdd`, `qunit` oder `exports`. Benutzerdefinierte Interfaces sollten das Suffix `*-bdd`, `*-tdd` oder `*-qunit` beibehalten.
- `parallel` wird weiterhin nicht unterstützt. WDIO steuert die Spec-Parallelität; Mochas Worker-Pool löst einen Fehler aus, wenn Sie ihn aktivieren.

Mocha 12 ist ESM-first (`"type": "module"`). Programmatisches `require('mocha')` funktioniert unter Node 22 weiterhin über `require(esm)`. Die WDIO-Mocha-CLI (`wdio run … --mochaOpts.*`) ist unverändert; Mochas eigene CLI verwendet jetzt `util.parseArgs` statt yargs.

## Cucumber

`@wdio/cucumber-framework` hängt von [`@cucumber/cucumber` 13](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300) ab.

Cucumber 13 erfordert Node.js 22, 24 oder 26 oder neuer. Es läuft nicht unter Node.js 20, 23 oder 25. Das Framework-Paket deklariert denselben Bereich, beginnend bei der v10-Untergrenze von 22.19.0.

```diff
- cucumberOpts: { tagExpression: '@smoke' }
+ cucumberOpts: { tags: '@smoke' }
```

`tagExpression` hat keinen Alias. Wenn es gesetzt wird, wird ein Fehler ausgelöst, sodass ein verbliebener Filter nicht stillschweigend jedes Szenario ausführen kann.

Cucumber 13 exportiert `Cli` nicht mehr. Programmatische Ausführungen laufen über `runCucumber` aus `@cucumber/cucumber/api`, was der Adapter bereits verwendet.

Weitere Breaking Changes in Cucumber 13 (mehrdeutige Formatter-Pfade, parallele Worker, `BeforeAll` / `AfterAll`) sind im [Upgrade-Leitfaden von Cucumber](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300) beschrieben.

## Jasmine

`@wdio/jasmine-framework` hängt von [Jasmine 6](https://jasmine.github.io/upgrade-guides/6.0) ab. Jasmine 6 wird unter Node.js 20, 22 und 24 getestet. Die v10-Untergrenze von 22.19.0 deckt diesen Bereich bereits ab.

`jasmineNodeOpts` wurde entfernt. Konfigurieren Sie Jasmine mit `jasmineOpts`. Das Setzen von `jasmineNodeOpts` löst einen Fehler aus:

```text
The option "jasmineNodeOpts" was removed in WebdriverIO v10. Use "jasmineOpts" instead.
```

```diff
- jasmineNodeOpts: { defaultTimeoutInterval: 60000 }
+ jasmineOpts: { defaultTimeoutInterval: 60000 }
```

`jasmineOpts.failFast` wird nicht mehr gelesen. Verwenden Sie `jasmineOpts.stopOnSpecFailure`. Ein verbliebenes `failFast` stoppt die Suite nicht. Cucumbers `failFast` ist eine andere Option und funktioniert weiterhin.

```diff
- jasmineOpts: { failFast: true }
+ jasmineOpts: { stopOnSpecFailure: true }
```

`jasmineOpts.stopSpecOnExpectationFailure` wurde entfernt. Verwenden Sie `jasmineOpts.oneFailurePerSpec`. Das Setzen des alten Schlüssels löst einen Fehler aus:

```text
The option "jasmineOpts.stopSpecOnExpectationFailure" was removed in WebdriverIO v10. Use "jasmineOpts.oneFailurePerSpec" instead.
```

```diff
- jasmineOpts: { stopSpecOnExpectationFailure: true }
+ jasmineOpts: { oneFailurePerSpec: true }
```

Jasmines synchrone Matcher sind wieder synchron. In v9 war das globale `expect` Jasmines `expectAsync`, sodass `expect(1).toBe(1)` ein Promise zurückgab. In v10 geben Jasmines eingebaute Matcher und die Matcher, die Sie mit `jasmine.addMatchers` hinzufügen, `undefined` zurück. WebdriverIO-Matcher, Jasmines asynchrone Matcher und `jasmine.addAsyncMatchers`-Matcher geben weiterhin ein Promise zurück, verwenden Sie für sie also weiterhin `await`. Sie müssen `await expect($('#logo')).toBeDisplayed()` nicht in `expectAsync()` ändern: Das globale `expect` leitet WebdriverIO-Matcher für Sie an `expectAsync` weiter. `await expect(1).toBe(1)` funktioniert weiterhin.

Eine fehlgeschlagene synchrone Assertion ohne `await` lässt jetzt die Spec fehlschlagen. In v9 war sie ein abgelehntes Promise: Wenn nichts darauf wartete, konnte die Spec bestehen, mit nur einer unbehandelten Ablehnung im Log. Sehen Sie sich nach dem Upgrade die Specs an, die anfangen fehlzuschlagen. Sie hatten in v9 einen verborgenen Fehler, und die Korrektur liegt im Test oder in der Anwendung, nicht im `expect`-Aufruf:

```js
it('saves the form', async () => {
    const onSave = jasmine.createSpy('onSave')
    await submitForm(onSave)
    // v9: bestand auch, wenn `onSave` nicht aufgerufen wurde
    // v10: schlägt fehl, wenn `onSave` nicht aufgerufen wurde
    expect(onSave).toHaveBeenCalled()
})
```

Das Ergebnis eines synchronen Matchers ist jetzt `undefined`, daher löst `.then()` oder `.catch()` darauf einen `TypeError` aus:

```diff
- expect(total).toBe(3).then(() => log('ok'))
+ expect(total).toBe(3)
+ log('ok')
```

Weitere Auswirkungen dieser Änderung:

- `oneFailurePerSpec` stoppt die Spec jetzt bei ihrer ersten fehlgeschlagenen Assertion: sofort bei einem synchronen Matcher und, sobald das Promise abgeschlossen ist, bei einem mit `await` erwarteten asynchronen Matcher.
- Jasmines Spy-Matcher funktionieren ohne `await`. In v9 schlugen `toHaveBeenCalled`, `toHaveSpyInteractions` und `toHaveNoOtherSpyInteractions` mit "Does not take arguments" fehl, und ein nicht aufgerufener Spy bestand ohne `await`.
- `jasmine.addMatchers` wird nicht mehr ersetzt, daher zeigt Jasmine seine Warnung "Monkey patching detected" nicht mehr an.

`toHaveSize` hat zwei Bedeutungen. Bei einem WebdriverIO-Wert ist es der WebdriverIO-Matcher und prüft die Größe des Elements: ein Element, ein Element-Array (einschließlich des Ergebnisses von `$$().filter()`), ein `Element[]`, ein Multi-Remote-Element, ein Browser, ein Browsing-Context, ein Mock, der `some()`-Wrapper oder ein Promise wie ein verkettbares `$()`. Bei jedem anderen Wert ist es Jasmines Matcher und prüft die Länge. In v9 lief immer Jasmines Matcher.

```js
expect([1, 2]).toHaveSize(2)                                   // Jasmine, synchron
await expect($('#logo')).toHaveSize({ width: 32, height: 32 }) // WebdriverIO, asynchron
```

Die Typen folgen denselben Regeln. `@wdio/jasmine-framework` typisiert das globale `expect` jetzt mit Jasmines Matchern sowie den WebdriverIO-Matchern und den asynchronen Jasmine-Matchern, die ein Promise zurückgeben. Entfernen Sie `expect-webdriverio/jasmine-wdio-expect-async` aus `types` in Ihrer `tsconfig.json`, da es jeden Matcher als asynchron typisiert. Fügen Sie `jasmine` hinzu, falls es nicht vorhanden ist:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "types": ["node", "@wdio/globals/types", "expect-webdriverio/jasmine-wdio-expect-async", "@wdio/jasmine-framework"]
+        "types": ["node", "jasmine", "@wdio/globals/types", "@wdio/jasmine-framework"]
     }
 }
```

`expect.oneOf()` und `expect.multiRemote()` funktionieren jetzt auch in Jasmine-Specs. Zuvor waren sie zur Laufzeit nicht im Jasmine-`expect` vorhanden.

## expect-webdriverio 8

`@wdio/globals`, `@wdio/runner` und `@wdio/browser-runner` erfordern `expect-webdriverio` 8 als Peer-Dependency. In v9 war es `expect-webdriverio` 5, 6 oder 7. Wenn Ihre `package.json` `expect-webdriverio` auflistet, aktualisieren Sie es in derselben Änderung wie die `@wdio/*`-Pakete auf Version 8.

`expect-webdriverio` 8 hat eigene Breaking Changes. Sein [Migrationsleitfaden von v7 zu v8](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/Migrations.md#migration-guide-v7-to-v8) listet jede Änderung und ihren Ersatz auf. Wenn Sie von `expect-webdriverio` 5 oder 6 kommen, lesen Sie auch den [Migrationsleitfaden von v5 zu v6](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/Migrations.md#migration-guide-v5-to-v6): Version 8 entfernt die APIs, die von 5.6.9 bis 6.0.0 als veraltet markiert wurden. Für Version 7 gibt es keinen Migrationsleitfaden. Sie fügt Multi-Remote-Unterstützung hinzu, und `toMatchSnapshot()` und `toMatchInlineSnapshot()` auf `$$()` speichern jetzt das `outerHTML` jedes Elements: Aktualisieren Sie diese Snapshots. Diese Änderungen betreffen eine Testsuite am wahrscheinlichsten:

- `toHaveText` auf `$$()` vergleicht die Elemente Index für Index. Ein erwartetes Array in einer anderen Reihenfolge als auf der Seite schlägt fehl. Verwenden Sie die Reihenfolge der Seite, `expect.oneOf()` oder `expect.arrayContaining()`.
- Ein Array erwarteter Werte bei einem einzelnen Element lässt `toHaveText`, `toHaveHTML`, `toHaveComputedLabel`, `toHaveComputedRole` und `toHaveElementClass` fehlschlagen. Verwenden Sie `expect.oneOf()`. Bei `toHaveElementClass` bedeutete ein Array "hat eine dieser Klassen": Verwenden Sie `expect.oneOf()` oder eine Assertion pro Klasse, wenn das Element alle haben muss.
- Ein Listen-Matcher (`expect.arrayContaining()`, `expect.arrayOf()`) bei einem einzelnen Element oder mit `some()` löst einen Fehler aus. Auf `$$()` vergleicht er die Werte aller Elemente auf einmal.
- Ein fehlendes Attribut oder eine fehlende Eigenschaft passt nie, auch nicht zu einem Matcher, der keinen Wert akzeptiert, wie `expect.not.stringContaining()`.
- `URL`, `Set`, `Map` und Binärwerte werden nach ihrem Inhalt verglichen. Eine Assertion, die versehentlich bestanden hat, kann jetzt fehlschlagen.
- Die Hilfstypen sind nicht mehr global. Eine Datei, die `Test`, `TestResult`, `Scenario` oder `WdioCustomMatchers` ohne Import verwendet, schlägt mit `Cannot find name` fehl: Verwenden Sie `Frameworks.Test`, `Frameworks.TestResult` und `Frameworks.Scenario` aus `@wdio/types` sowie `ExpectWebdriverIO.Matchers`.
- `setFeatureFlags()` und die Option `featureFlags` wurden entfernt.
- Diese veralteten APIs wurden entfernt: `setOptions` (verwenden Sie `setDefaultOptions`), `getConfig` (verwenden Sie `getDefaultOptions`), `matchers` (verwenden Sie `wdioCustomMatchers`), `toHaveAttr` (verwenden Sie `toHaveAttribute`), `toHaveClass` (verwenden Sie `toHaveElementClass`), `toBeRequestedWithResponse()` (verwenden Sie `toBeRequestedWith({ response })`) und `expect-webdriverio/types` (verwenden Sie `expect-webdriverio/expect-global`).
- Die Hooks `beforeAssertion` und `afterAssertion` erhalten den Namen des Alias, den der Test aufgerufen hat, für `toBeExisting`, `toBePresent`, `toHaveLink`, `toHaveValue` und `toBeRequested`. In v9 erhielten sie den Namen des Matchers hinter dem Alias, zum Beispiel `toExist` für `toBeExisting`.
- Übergeben Sie bei einem Multi-Remote-Browser das Ergebnis von `$$()` an `expect`. Ein einfaches Array wie `[...elements]` oder `Array.from(elements)` wird nicht als Elemente erkannt, und die Assertion schlägt fehl.

Bei einem Multi-Remote-Browser prüft eine Assertion jede Instanz, und `expect.multiRemote()` gibt einen erwarteten Wert pro Instanz an. Siehe [Multiremote-Assertions](/docs/multiremote#assertions).

## Treiberpakete

WebdriverIO v10 startet Firefox, Edge und Safari mit `geckodriver` 8, `edgedriver` 8 und `safaridriver` 3. In v9 verwendete es `geckodriver` und `edgedriver` 6 oder 7 sowie `safaridriver` 1 oder 2. WebdriverIO installiert sie, sodass Sie sie nicht selbst auflisten müssen. Wenn Ihre `package.json` eines davon auflistet, aktualisieren Sie es in derselben Änderung wie die `@wdio/*`-Pakete.

`geckodriver` und `edgedriver` haben `@wdio/logger` als Peer-Dependency, sodass sie über den Logger Ihrer WebdriverIO-Installation loggen. In v9 brachten `geckodriver` und `edgedriver` ihre eigene Kopie von `@wdio/logger` mit, und diese zweite Kopie leerte die Logdatei in `outputDir`. Führen Sie `npm ls @wdio/logger` aus: Jede Kopie sollte Version 10 sein. Ein Plugin oder Service, das noch von Version 9 abhängt, hat denselben Effekt.

Die [Treiber-Upgrade-Hinweise](https://github.com/webdriverio/driver#upgrading-to-geckodriver-8-edgedriver-8-and-safaridriver-3) listen jede Änderung auf. Diese Änderungen können ein WebdriverIO-Projekt betreffen:

- Die Treiber-Downloads verwenden `HTTPS_PROXY` und `HTTP_PROXY`. In v9 ignorierten die Downloads von `geckodriver` und `edgedriver` diese. Wenn in Ihrer Umgebung ein Proxy gesetzt ist, das Treiber-CDN aber direkt erreicht werden muss, fügen Sie dessen Host zu `NO_PROXY` hinzu.
- `geckodriver` liest `GECKODRIVER_FILEPATH` nicht mehr. Verwenden Sie `GECKODRIVER_PATH`.
- `wdio:edgedriverOptions` und `wdio:safaridriverOptions` akzeptieren `spawnOpts`, wie es `wdio:chromedriverOptions` tut.

## Browser-Downloads

In v9 entpackte WebdriverIO die Zip-Dateien von Chrome, Chromium und Chromedriver selbst. In v10 verwendet es den System-Befehl `unzip` unter Linux und macOS (`tar.exe` oder PowerShell unter Windows). Schlanke Docker-Images wie `node:24-slim` enthalten ihn nicht: Installieren Sie ihn, siehe [Docker](/docs/docker#images-where-webdriverio-downloads-the-browser).

In v9 verwendeten die Downloads von Chrome, Chromium, Firefox und Chromedriver `HTTPS_PROXY` und `HTTP_PROXY`. In v10 verwenden sie diese nur, wenn `proxy-agent` in Ihrem Projekt installiert ist oder wenn Node.js mit `NODE_USE_ENV_PROXY=1` läuft (Node.js 22.21.0 / 24.5.0 oder neuer). WebdriverIO protokolliert eine Warnung, wenn eine Proxy-Variable gesetzt ist, der Download sie aber ignorieren würde. Siehe [Proxy für Browser- und Treiber-Downloads](/docs/proxy#proxy-for-browser-and-driver-downloads).

## Multi-Remote-Global

Die kleingeschriebene globale Variable `multiremotebrowser` wurde entfernt, sowohl aus `@wdio/globals` als auch aus den Globals von `eslint-plugin-wdio`. Verwenden Sie `multiRemoteBrowser`.

```diff
- import { multiremotebrowser } from '@wdio/globals'
+ import { multiRemoteBrowser } from '@wdio/globals'
```

## Capabilities

`specs` und `exclude` in Capabilities werden nicht mehr gelesen. Verwenden Sie `wdio:specs` und `wdio:exclude`.

```diff
  capabilities: [{
      browserName: 'chrome',
-     specs: ['./test/specs/chrome/**/*.js'],
-     exclude: ['./test/specs/chrome/skip.js']
+     'wdio:specs': ['./test/specs/chrome/**/*.js'],
+     'wdio:exclude': ['./test/specs/chrome/skip.js']
  }]
```

Die Konfigurationsschlüssel der obersten Ebene bleiben `specs` und `exclude`. Eine verbliebene reine Liste in einer Capability wählt keine Dateien für diese Capability aus. Die Capability verwendet dann `specs` und `exclude` der obersten Ebene.

Die Aliase `tunnelIdentifier` und `parentTunnel` wurden aus den Typen der Sauce-Labs-Optionen entfernt. Verwenden Sie `tunnelName` und `tunnelOwner`.

## TypeScript

Die von `webdriverio` exportierten Typen `Element`, `MultiRemoteBrowser` und `MultiRemoteElement` wurden entfernt. Verwenden Sie den globalen Namespace `WebdriverIO`.

```diff
- import type { Element } from 'webdriverio'
- const elem: Element = await $('#foo')
+ const elem: WebdriverIO.Element = await $('#foo')
```

`ChainablePromiseElement` deklariert jetzt `then`, und `ChainablePromiseArray` deklariert `then`, `catch` und `finally`. Die verkettbaren Typen beschreiben den Wert vor `await`. Sie passen nicht mehr zum Wert nach `await`:

```ts
let elem: ChainablePromiseElement
elem = await $('h1')
// TS2741: Property 'then' is missing in type 'Element' but required in type 'ChainablePromiseElement'.

let elems: ChainablePromiseArray
elems = await $$('li')
// TS2322: Type 'ElementArray' is not assignable to type 'ChainablePromiseArray'.
```

Typisieren Sie den Wert nach `await` als `WebdriverIO.Element` oder `WebdriverIO.ElementArray`:

```diff
- let elem: ChainablePromiseElement = await $('h1')
- let elems: ChainablePromiseArray = await $$('li')
+ let elem: WebdriverIO.Element = await $('h1')
+ let elems: WebdriverIO.ElementArray = await $$('li')
```

Beide verkettbaren Typen erfüllen jetzt `T extends PromiseLike<unknown>`. Ein bedingter Typ, der auf `PromiseLike` prüft, nimmt für `$()` und `$$()` einen anderen Zweig als in v9. Zum Beispiel ist `Awaited<ChainablePromiseElement>` jetzt `WebdriverIO.Element`, und `Awaited<ChainablePromiseArray>` ist `WebdriverIO.ElementArray`.

Die Eigenschaften eines `$$()` ohne `await` haben einen geänderten Typ. Sie sind sofort verfügbar, bevor die Abfrage aufgelöst wird, lesen Sie sie also ohne `await` oder `.then()`:

| Eigenschaft | v9 | v10 |
|---|---|---|
| `selector` | `Promise<Selector>` | `Selector \| undefined` |
| `parent` | `Promise<...>` | das Elternelement, kein Promise (siehe unten) |
| `foundWith` | keine | der Befehl, der die Liste gefunden hat, z. B. `$$` oder `custom$$` |
| `props` | keine | die zusätzlichen Argumente dieses Befehls |

```diff
- const selector = await $$('li').selector
+ const selector = $$('li').selector
```

Bei einer verketteten Abfrage wie `$('form').$$('input')` ist `parent` das verkettbare `$('form')`, bis die Liste aufgelöst ist, und danach das aufgelöste Element. Warten Sie mit `await` auf die Liste, bevor Sie `parent` als Element verwenden.

Zur Laufzeit geben `filter()`, `filterSeries()` und `slice()` auf einer `$$()`-Liste eine Elementliste zurück, kein einfaches Array. Das Ergebnis behält `selector`, `foundWith`, `parent` und `props` der Quellliste. In v9 gab `filter()` ein einfaches Array ohne diese Eigenschaften zurück. Die Typen bilden dies noch nicht ab: `filter()` und `filterSeries()` sind so deklariert, dass sie `Promise<WebdriverIO.Element[]>` zurückgeben, und `slice()` gibt `WebdriverIO.Element[]` zurück, daher meldet TypeScript einen Fehler, wenn Sie diese Eigenschaften im Ergebnis lesen.

WebdriverIO führt die Abfrage für die abgeleitete Liste selbst nicht erneut aus: Ein Index jenseits ihres Endes wartet nicht auf weitere Treffer und gibt nie ein Element zurück, das der Filter ausgeschlossen hat. Ihre Mitglieder sind weiterhin die Elemente der Quellabfrage, mit ihrem ursprünglichen `selector` und `index`. Wenn ein Mitglied veraltet (stale) wird, ruft WebdriverIO es erneut aus der Quellabfrage an diesem Index ab, was ein anderes Element sein kann, wenn sich die Seite geändert hat. Code, der die Abfrage einer Liste anhand ihrer Eigenschaften erneut ausführt, zum Beispiel `parent[foundWith](selector, ...props)`, erhält die vollständige Liste, nicht die gefilterte.

Veröffentlichte Pakete setzen `typeScriptVersion` auf 6.0.3, passend zu der TypeScript-Version, mit der dieses Repository kompiliert wird.

`browser.mock()` akzeptiert das `URLPattern` von `urlpattern-polyfill` und das native `URLPattern` (global in Node.js 24 und typisiert durch die `dom`-Bibliothek von TypeScript 6).

TypeScript 6 markiert `"moduleResolution": "node"` und `"baseUrl"` als veraltet und macht `strict` zum Standard. `create-wdio` erzeugt jetzt `"moduleResolution": "bundler"` für ESM-Projekte und `"NodeNext"` für CommonJS-Projekte. Wenn Sie TypeScript in einem bestehenden Projekt aktualisieren, ändern Sie diese Optionen in Ihrer `tsconfig.json`.

Für ein ESM-Projekt:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "moduleResolution": "node",
+        "moduleResolution": "bundler",
         "module": "ESNext"
     }
 }
```

Für ein CommonJS-Projekt verwenden Sie `NodeNext` für beide Optionen, wie es `create-wdio` tut:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "moduleResolution": "node",
-        "module": "CommonJS"
+        "moduleResolution": "NodeNext",
+        "module": "NodeNext"
     }
 }
```

TypeScript 6 ändert außerdem den Standardwert von `types` auf `[]`, sodass nicht mehr jedes installierte `@types/*`-Paket geladen wird. Wenn Ihre `tsconfig.json` keine `types`-Liste hat, schlagen Globals wie Mochas `describe` und `it` mit `Cannot find name` fehl. Listen Sie die Typpakete auf, die Ihre Tests verwenden, wie es `create-wdio` tut. Zum Beispiel mit Mocha:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
+        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
     }
 }
```

`npm create wdio@latest` schreibt `compilerOptions.target` und `compilerOptions.lib` als `es2024`. Die Typprüfung dieser Datei erfordert TypeScript 5.7 oder neuer. `tsx`, das die Konfiguration und die Tests ausführt, führt keine Typprüfung durch, daher spielt ein älterer Compiler nur eine Rolle, wenn Sie `tsc` selbst ausführen.

Eine bestehende `tsconfig.json` wird nicht neu geschrieben. Eine erzeugte Konfiguration, die eine andere Konfiguration erweitert, behält `target` und `lib` der übergeordneten Konfiguration.

Im `afterAssertion`-Hook ist der Typ von `params.result` jetzt `{ pass, message }`, so wie die Matcher es liefern. In v9 war der Typ `{ result, message }`, aber `params.result.result` war zur Laufzeit immer `undefined`. Lesen Sie `params.result.pass`:

```diff
  afterAssertion (params) {
-     console.log(params.matcherName, params.result.result)
+     console.log(params.matcherName, params.result.pass)
  }
```

`pass` ist `true`, wenn der Wert dem erwarteten Wert entspricht, auch mit `.not`. Mit `.not` besteht die Assertion also, wenn `pass` `false` ist. Der Hook gibt nicht an, ob der Test `.not` verwendet hat.

## Befehls-Hooks

Ein Element-Befehl führt die Hooks `beforeCommand` und `afterCommand` einmal aus, mit den Argumenten des Befehls. In v9 führte er sie 2- oder 3-mal aus, und der erste Aufruf erhielt `[]` als `args`. Ein Befehl, der innerhalb eines anderen läuft (zum Beispiel `getElementText` in `getText`), hat weiterhin sein eigenes Paar. Die Hooks laufen nicht für die Event-Funktion `emit`. Ein Hook, der Befehle zählt oder ihre Dauer misst, sieht jeden Befehl einmal.

Bei einem Element-Befehl läuft `beforeCommand`, bevor WebdriverIO auf das Element wartet, sodass das Element dort noch fehlen kann. `afterCommand` läuft nach dem Warten und allen Wiederholungen, mit dem Ergebnis oder dem Fehler des letzten Versuchs. Ein Hook, der das gefundene Element benötigt, verwendet `afterCommand`.

Ein mit `overwriteCommand()` geänderter Befehl und eine verkettete Abfrage auf einem Promise (`$('a').$('b')`) können die Hooks weiterhin mehr als einmal ausführen.

## Reporter

Das Browser-Event `result` wird als `client:afterCommand` an Reporter weitergeleitet. Diese Payload und der Typ `AfterCommandArgs` haben keine Eigenschaft `name` mehr. Lesen Sie stattdessen `command`. Benutzerdefinierte Befehle haben bereits `command` gesendet.

```diff
  onAfterCommand(args) {
-     console.log(args.name)
+     console.log(args.command)
  }
```

### Allure

`addEnvironment(name, value)` in `@wdio/allure-reporter` wurde entfernt. Es hatte keine Wirkung. Setzen Sie Umgebungszeilen mit [`reportedEnvironmentVars`](/docs/allure-reporter) in den Optionen des Allure-Reporters.

## `$` ist strikt

`$` repräsentiert jetzt __genau ein__ Element. Wenn der Selektor zu mehr als einem Element aufgelöst wird, löst der Befehl einen `StrictSelectorError` aus, statt stillschweigend den ersten Treffer zu verwenden:

```js
// v9 — klickt auf den ersten Button, auch wenn es 12 gibt
await $('button').click()

// v10
await $('button').click()
// StrictSelectorError: strict mode violation: `$("button")` resolved to 12 elements, expected 1.
// Use `$$("button")` to work with all matches, `$$("button")[0]` if you explicitly want the first one,
// or narrow down the selector so it matches a single element.
```

Dies entspricht den [Playwright-Locators](https://playwright.dev/docs/locators#strictness). Cypress unterscheidet sich: Seine Abfragen können zu mehreren Elementen aufgelöst werden, und es sind die Aktionsbefehle wie [`.click()`](https://docs.cypress.io/api/commands/click#Click-all-elements-with-id-starting-with-btn), die ein Subjekt mit mehreren Elementen standardmäßig ablehnen. Ein Selektor, der stillschweigend zu mehreren Elementen aufgelöst wird, ist fast immer ein latenter Bug: Er besteht heute und interagiert mit dem falschen Element, sobald jemand einen zweiten Button zur Seite hinzufügt.

Die Regel gilt für jeden Schritt einer Kette (`$('form').$('input')`) und für jeden Selektortyp, den `$` akzeptiert — String-Selektoren (einschließlich solcher, die das Shadow DOM durchdringen), JS-Funktionen, mobile Selektoren und Verweise auf benutzerdefinierte Strategien.

### Was sich nicht geändert hat

- `$$` gibt weiterhin null oder mehrere Elemente zurück.
- Die dedizierten Hilfsbefehle `custom$`, `shadow$` und `react$` sind nicht strikt — sie geben weiterhin ihren ersten Treffer zurück, ebenso wie ihre `$$`-Gegenstücke.
- Ein Selektor, der nichts findet, gibt weiterhin ein verzögert aufgelöstes Element zurück, sodass sich `waitForExist` und [Auto-Waiting](/docs/autowait) wie bisher verhalten.
- Das Übergeben einer Elementreferenz, z. B. `$(await browser.getActiveElement())`, bezieht sich immer auf einen einzelnen Knoten und wird nie geprüft.

### So überprüfen Sie Ihre Suite

Dafür gibt es keinen Codemod: Nur Sie können beurteilen, ob ein zweiter Treffer ein Bug oder beabsichtigt ist. Zwei praktische Ansätze:

1. __Führen Sie Ihre Suite aus.__ Jeder Verstoß löst einen Fehler mit dem Selektor und der Anzahl der Treffer aus, was normalerweise ausreicht, um ihn sofort zu beheben.
2. __Prüfen Sie die breiten Selektoren vorab.__ Geben Sie für jedes generische `$(...)` in Ihren Page Objects aus, wie viele Elemente es tatsächlich findet:

   ```js
   console.log(await $$('button').length) // 12 → `$('button')` ist zu breit
   ```

Grenzen Sie dann entweder den Selektor ein — idealerweise in Richtung einer nutzerorientierten Abfrage wie `$('button=Submit')` oder `$('aria/Submit')`, siehe [Selektoren](/docs/selectors) — oder geben Sie explizit an, dass Sie den ersten Treffer wollen:

```js
await $('button[type="submit"]').click()
// ...oder, wenn wirklich der erste gemeint ist
await $$('button')[0].click()
```

### Deaktivieren

Für eine einzelne Abfrage:

```js
await $('button', { strict: false }).click()
```

Für ein ganzes Projekt, um das v9-Verhalten wiederherzustellen:

```js title="wdio.conf.js"
export const config = {
    // ...
    strictSelectors: false
}
```

Ein Element merkt sich, wie es abgefragt wurde, sodass ein erneutes Abrufen — nach einer veralteten Elementreferenz oder über `waitForExist` — die Striktheit des ursprünglichen Aufrufs beibehält.

:::info

Intern sendet ein striktes `$` eine `findElements`-Anfrage statt `findElement`, da das Zählen der Treffer die einzige Möglichkeit ist, die Regel durchzusetzen. Es ist in beiden Fällen ein einzelner Roundtrip, aber dies ist für benutzerdefinierte Services und WebDriver-Mocks sichtbar, die auf den Befehl `findElement` reagieren.

:::

## Elementlisten vor `await`

Seit v10 gibt `$$()` ein [`ElementArray`](/docs/api/browser/$$) zurück: ein echtes Array, auf das Sie mit `await` warten können. In v9 war ein `$$()` ohne `await` ein Promise.

| `$$('li')` vor `await` | v9 | v10 |
| --- | --- | --- |
| `instanceof Promise` | `true` | `false` |
| `Array.isArray()` | `false` | `true` |
| `then`, `catch`, `finally` | Funktionen | Funktionen, bis die Liste geladen ist |

Bis die Liste geladen ist, ist `length` ein Promise, und `[...list]`, `Array.from(list)` und `for...of` lösen `Cannot synchronously iterate over an element list that has not resolved yet` aus.

Dasselbe gilt für `custom$$`, `shadow$$` und `react$$` sowie für `$$()` auf einem Multi-Remote-Browser. Ein `$()` ohne `await` ist weiterhin ein Promise.

`await` liefert dieselbe Liste, geladen und ohne `then`. Dann ist `length` eine Zahl, und `for...of`, `[...list]` und `Array.from()` funktionieren. Vor `await` können Sie `for await`, einen Index (`$$('li')[0]`), `at()`, `slice()` und die asynchronen Iterationsmethoden (`map`, `filter`, `forEach`, ...) verwenden. Diese Methoden liefern ein Promise: Warten Sie mit `await` auf das Ergebnis von `filter()`, bevor Sie einen Index lesen.

Ein Index jenseits des Endes einer `$$(selector)`-Liste ist nicht `undefined`, auch nicht nach `await`. Er ist ein Element, das darauf wartet, dass die Liste diesen Index erreicht, wie es `$$('li')[5]` vor `await` tut: `isExisting()` liefert `false`, und ein Befehl wie `getText()` löst `Index out of bounds` aus, beides nach `waitforTimeout`. In v9 war `(await $$('li'))[5]` `undefined`. Daher ist `if (list[5])` immer wahr, und `list.at(5)` ist nie `undefined`. Vergleichen Sie den Index mit `length`, das nicht wartet:

```diff
  const list = await $$('li')
- if (list[5]) {
+ if (list.length > 5) {
```

Nach `await` liefern ein negativer Index sowie eine Liste aus `slice()` oder `filter()` jenseits des Endes `undefined`. Vor `await` liefern `list[i]` mit einem ganzzahligen Index von 0 oder mehr sowie `at()` ein Promise, das immer truthy ist.

Code, der einen Wert nur dann mit `await` erwartet, wenn er ein `Promise` ist, oder der `length` ohne `await` liest, löst keinen Fehler aus. Er liest ein Promise als Länge: `list.length > 0` und eine Schleife wie `for (let i = 0; i < list.length; i++)` sehen `false`, aber `if (list.length)` und `list.length !== 0` sehen `true`. Verwenden Sie immer `await` für den Wert. `await` auf einen bereits geladenen Wert liefert diesen Wert:

```diff
- if (value instanceof Promise) {
-     value = await value
- }
+ value = await value
```

```diff
- if ($$('button').length > 0) {
+ if (await $$('button').length > 0) {
```

## Veraltete Befehlssignaturen {#legacy-command-signatures}

v9 akzeptierte noch ältere positionelle Formen und gab eine Warnung aus. v10 akzeptiert nur das Options-Objekt.

Der v10-[Codemod](https://github.com/webdriverio/codemod) schreibt `addCommand` und `overwriteCommand` um, wenn das dritte Argument ein Boolean ist, ebenso `getHTML(true)` und `getHTML(false)` sowie `getCookies`, wenn der Filter ein String oder ein Array mit einem Element ist. Ein `getCookies`-Aufruf mit mehr als einem Namen bleibt unverändert, weil ein Filter auf genau einen Namen passt.

Installieren Sie zuerst den Codemod. WebdriverIO hängt nicht davon ab.

```sh
npm install jscodeshift @wdio/codemod
npx jscodeshift -t ./node_modules/@wdio/codemod/v10 ./e2e/
```

Verwenden Sie `--parser=tsx` für TypeScript-Dateien.

### `addCommand` und `overwriteCommand`

```diff
- browser.addCommand('myFn', fn, true)
+ browser.addCommand('myFn', fn, { attachToElement: true })

- browser.overwriteCommand('click', fn, true)
+ browser.overwriteCommand('click', fn, { attachToElement: true })
```

Ein boolesches drittes Argument ist ein TypeScript-Fehler. Zur Laufzeit wird folgender Fehler ausgelöst:

```
Passing a boolean as the third argument to `addCommand` was removed in WebdriverIO v10. Use `addCommand(name, fn, { attachToElement: true })`.
```

`proto` und `instances` gehören in dasselbe Options-Objekt. Lassen Sie das dritte Argument weg, um einen Befehl an den Browser anzuhängen.

### `getCookies`

String- und String-Array-Filter werden abgelehnt. Übergeben Sie ein [Cookie-Filter-Objekt](https://w3c.github.io/webdriver-bidi/#type-storage-CookieFilter). Ein Aufruf filtert einen Namen; rufen Sie ihn für einen weiteren Namen erneut auf.

```diff
- await browser.getCookies('session')
- await browser.getCookies(['session', 'auth'])
+ await browser.getCookies({ name: 'session' })
+ await browser.getCookies({ name: 'auth' })
```

`getCookies()` ohne Argumente gibt weiterhin jedes für die Seite sichtbare Cookie zurück.

### `getHTML`

```diff
- await $('h1').getHTML(false)
+ await $('h1').getHTML({ includeSelectorTag: false })
```

`getHTML()` ohne Argumente schließt weiterhin das eigene Tag des Elements ein.

### `newWindow`

`windowName` und `windowFeatures` entfallen. Sie galten nur für WebDriver Classic. Der Befehl akzeptiert weiterhin `type`:

```diff
- await browser.newWindow('https://webdriver.io', {
-     windowName: 'WebdriverIO window',
-     windowFeatures: 'width=420,height=230,resizable,scrollbars=yes,status=1',
- })
+ await browser.newWindow('https://webdriver.io', { type: 'window' })
```

Verwenden Sie `type: 'tab'`, um einen Tab zu öffnen.

In einer WebDriver-BiDi-Sitzung gibt `newWindow()` den neuen [Browsing-Context](/docs/api/browsingContext) zurück und wechselt nicht dorthin. In v9 wechselte es. Daher schließt `browser.closeWindow()` nach `newWindow()` jetzt den ersten Tab, nicht den neuen. Führen Sie die Befehle für den neuen Tab auf dem Kontext aus, den `newWindow()` zurückgibt, und schließen Sie ihn mit `closeWindow()` auf diesem Kontext:

```diff
- await browser.newWindow('https://webdriver.io', { type: 'tab' })
- console.log(await browser.getTitle())
- await browser.closeWindow()
+ const tab = await browser.newWindow('https://webdriver.io', { type: 'tab' })
+ console.log(await tab.getTitle())
+ await tab.closeWindow()
```

In TypeScript ist der Ergebnistyp `WebdriverIO.BrowsingContext | { handle, type }`, weil eine WebDriver-Classic-Sitzung das Window-Handle zurückgibt. Grenzen Sie ihn in einer BiDi-Sitzung ein: `await browser.newWindow(url, { type: 'tab' }) as WebdriverIO.BrowsingContext`.

Der Browser bleibt auf dem ersten Tab. Entfernen Sie einen `switchWindow()`-Aufruf, der zu ihm zurückgewechselt ist: `switchWindow` löst in einer BiDi-Sitzung einen Fehler aus. Siehe [`switchToFrame`](#switchtoframe) für das Browsing-Context-Modell.

### `startActivity`

Nur das Options-Objekt wird akzeptiert. `appWaitPackage`, `appWaitActivity` und `optionalIntentArguments` entfallen. Sie galten nur für den entfernten Appium-HTTP-Endpunkt. `mobile: startActivity` akzeptiert sie nicht, und ihre Übergabe löst einen Fehler aus.

```diff
- await browser.startActivity('com.example.app', '.MainActivity')
- await browser.startActivity({
-     appPackage: 'com.example.app',
-     appActivity: '.MainActivity',
-     appWaitPackage: 'com.example.app',
-     appWaitActivity: '.MainActivity',
-     optionalIntentArguments: '--ez extra true',
- })
+ await browser.startActivity({
+     appPackage: 'com.example.app',
+     appActivity: '.MainActivity',
+ })
```

## Entfernte Befehle

`browser.throttle` und die veralteten `touchAction`-Befehle wurden entfernt.

| v9 | v10 |
| --- | --- |
| `browser.throttle('Regular3G')` | [`browser.throttleNetwork('Regular3G')`](/docs/api/browser/throttleNetwork) |
| `browser.touchAction(...)` / `element.touchAction(...)` | Die [Actions API](/docs/api/browser/action) mit einem Touch-Pointer oder die mobilen Befehle [`tap`](/docs/api/mobile/tap) und [`swipe`](/docs/api/mobile/swipe) |

Eine Touch-Geste mit der Actions API:

```js
await browser.action('pointer', { parameters: { pointerType: 'touch' } })
    .move({ x: 100, y: 500 })
    .down()
    .move({ x: 100, y: 100, duration: 300 })
    .up()
    .perform()
```

## `uploadFile`

`browser.uploadFile()` wurde entfernt. Es zippte eine lokale Datei und sendete sie an den Selenium-Endpunkt `file`, der nicht Teil von WebDriver oder WebDriver BiDi ist. Setzen Sie ein Datei-Input mit [`element.setFiles()`](/docs/api/element/setFiles).

```diff
- const remotePath = await browser.uploadFile('/path/to/file.png')
- await $('#file-upload').setValue(remotePath)
+ await $('#file-upload').setFiles('/path/to/file.png')
+ await $('#file-upload').setFiles(['/path/to/a.png', '/path/to/b.png'])
```

`setFiles` benötigt eine BiDi-Sitzung. Die Pfade werden vom Browser geöffnet. Ein relativer Pfad wird gegen `process.cwd()` aufgelöst. Das Bereitstellen von Dateien über Selenium Grid ist nicht Teil von v10. Eine Suite, die sich auf `uploadFile` verlassen hat, um Bytes an einen Node zu übertragen, muss die Datei dort ablegen, wo der Browser sie lesen kann, und dann `setFiles` aufrufen.

In einer klassischen lokalen Sitzung tippt `element.setValue('/local/path')` weiterhin einen Pfad ein, den der lokale Browser bereits sehen kann. Der rohe Selenium-Endpunkt bleibt als `browser.file()` für Grid-Nutzer erhalten, die ihn direkt aufrufen.

## `executeAsync`

`browser.executeAsync` und `element.executeAsync` wurden entfernt. Übergeben Sie eine `async`-Funktion an [`execute`](/docs/api/browser/execute). Der Rückgabewert der Funktion, einschließlich eines zurückgegebenen Promise, ist das Befehlsergebnis. Der `script`-Timeout gilt weiterhin, auch in einer WebDriver-BiDi-Sitzung: Ein Skript, das länger läuft, schlägt mit einem `script timeout`-Fehler fehl. Für einen `script`-Timeout, der länger ist als [`bidiResponseTimeout`](/docs/configuration#bidiresponsetimeout) (standardmäßig 180 Sekunden), erhöhen Sie beide.

```ts
const result = await browser.execute(async (a, b) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return a + b
}, 1, 2)
```

Entfernen Sie den WebDriver-Callback `done`. Ein String-Skript, das diesen Callback als letztes Argument erwartete, muss stattdessen ein Promise zurückgeben. Zur Laufzeit ist `executeAsync` keine Funktion.

## `switchToFrame`

`browser.switchToFrame` ist kein öffentlicher Befehl mehr.

In einer WebDriver-BiDi-Sitzung lösen `switchFrame` und `switchWindow` einen Fehler aus. Ein Tab, ein Fenster und ein Frame sind jeweils ein `WebdriverIO.BrowsingContext`, den Sie halten. `browser.url()` navigiert den anfänglichen Top-Level-Kontext der Sitzung und gibt ihn zurück. `browser.newWindow()` gibt den neuen Kontext zurück und wechselt nicht dorthin. `context.frame()` gibt einen Kind-Frame zurück. `context.parent` ist der Frame, aus dem Sie ihn geöffnet haben.

```ts
const page = await browser.url('https://example.com')
const other = await browser.newWindow('https://webdriver.io', { type: 'tab' })
console.log(await page.getTitle())
const frame = await page.frame('iframe')
console.log(await frame.$('h1').getText())
const pages = await browser.browsingContexts()
```

`context.url` ist der URL-String des Dokuments. Navigieren Sie einen gehaltenen Kontext mit `context.navigate(url)`. Die Lade-Metadaten von `browser.url()` sind `context.request`.

Rufen Sie in einer Classic-Sitzung weiterhin `switchFrame` mit einem Element auf, oder mit `null` für den obersten Frame. Ein String oder eine Funktion wird dort abgelehnt.

```diff
- await browser.switchToFrame(await $('iframe'))
- await browser.switchToFrame(null)
+ await browser.switchFrame($('iframe'))
+ await browser.switchFrame(null)
```

## `setTimeout`

Der JSON-Wire-Protocol-Schlüssel `page load` wird abgelehnt. Verwenden Sie `pageLoad`.

```diff
- await browser.setTimeout({ 'page load': 10000 })
+ await browser.setTimeout({ pageLoad: 10000 })
```

`implicit` und `script` sind unverändert.

## Zugriff auf Multi-Remote-Instanzen

Ein Multi-Remote-Browser speichert nicht mehr jede Sitzung als eigene Eigenschaft. Dasselbe gilt für ein Multi-Remote-Element. Mit `getInstance` und `select` sprechen Sie eine einzelne Sitzung an.

```diff
- await browser.myChromeBrowser.url('https://webdriver.io')
- await (await browser.$('button')).myChromeBrowser.click()
+ await browser.getInstance('myChromeBrowser').url('https://webdriver.io')
+ await (await browser.$('button')).getInstance('myChromeBrowser').click()
```

Eine TypeScript-Augmentation, die `myChromeBrowser: WebdriverIO.Browser` zu `WebdriverIO.MultiRemoteBrowser` hinzufügt, entspricht keiner Laufzeiteigenschaft mehr. Löschen Sie diese Augmentation und rufen Sie `getInstance` auf.

Mit dem Testrunner und aktiviertem `injectGlobals` ist der Instanzname weiterhin eine globale Variable (`myChromeBrowser.url(...)`). Diese globale Variable ist die einzelne Sitzung. Sie ist nicht `browser.myChromeBrowser`.

Befehlsergebnisse bleiben in der Reihenfolge der Capabilities: Der erste Eintrag gehört zum ersten Schlüssel im Capabilities-Objekt.

`browser.$$()` auf einem Multi-Remote-Browser gibt ein `WebdriverIO.MultiRemoteElementArray` zurück, kein einfaches `MultiRemoteElement[]`. Es ist weiterhin ein Array, sodass ein Indexzugriff wie `elements[0]` weiterhin funktioniert.

Seine Methoden `map`, `filter`, `forEach`, `find`, `findIndex`, `some`, `every` und `reduce` sind asynchron, wie bei einem `WebdriverIO.ElementArray`, und geben ein Promise zurück, auch nach `await`. Dasselbe gilt für die Listen, die `custom$$()`, `react$$()` und `shadow$$()` zurückgeben. In v9 waren dies die synchronen Methoden eines einfachen Arrays:

```diff
  const items = await browser.$$('li')
- const ids = items.map((item) => item.selector)
+ const ids = await items.map((item) => item.selector)
```

`custom$()`, `react$()` und, auf einem Element, `shadow$()`, `nextElement()`, `previousElement()` und `parentElement()` geben ein einzelnes `WebdriverIO.MultiRemoteElement` zurück, wie es `$()` tut. In v9 gaben sie ein Element pro Instanz in einem einfachen Array zurück. Lesen Sie das Element eines Browsers mit `getInstance`:

```diff
- const [chromeHost, firefoxHost] = await browser.custom$('byTestId', 'host')
- await chromeHost.click()
+ const host = await browser.custom$('byTestId', 'host')
+ await host.getInstance('myChromeBrowser').click()
```

`custom$$()`, `react$$()` und, auf einem Element, `shadow$$()` geben ein einzelnes `WebdriverIO.MultiRemoteElementArray` zurück, wie es `$$()` tut. In v9 gaben sie eine Liste pro Instanz in einem einfachen Array zurück. Jeder Eintrag spricht jede Instanz an. Eine Instanz, die weniger Elemente findet, hat an diesem Index kein Element:

```diff
- const [chromeItems, firefoxItems] = await browser.custom$$('byTestId', 'item')
- await chromeItems[0].click()
+ const items = await browser.custom$$('byTestId', 'item')
+ await items[0].getInstance('myChromeBrowser').click()
```

`WebdriverIO.MultiRemoteElement['selector']` hat den Typ `Selector`, wie `WebdriverIO.Element['selector']`. In v9 hatte es den Typ `string`, aber der Wert konnte auch eine Funktion oder ein Verweis auf eine benutzerdefinierte Strategie sein. TypeScript-Code, der ihn als String verwendet, zum Beispiel `element.selector.includes('…')`, muss zuerst den Typ prüfen.

`WDIO_ENABLE_MULTI_REMOTE_SELECT` und `WDIO_ENABLE_MULTI_REMOTE_ELEMENT_ARRAY` wurden entfernt. `select()` ist immer verfügbar, und `$$()` gibt immer das oben beschriebene Element-Array zurück. Löschen Sie beide Variablen.

## Binäre Mock-Antworten

`mock.respond()` und `mock.respondOnce()` akzeptieren `Uint8Array`- und `ArrayBuffer`-Payloads, einschließlich eines per Polyfill bereitgestellten `Buffer` in Komponententests ohne globalen `Buffer`.

`mock.getBinaryResponse()` ist jetzt als `Uint8Array | null` typisiert. In Node.js gibt es weiterhin einen `Buffer` zurück, im Browser jedoch ein `Uint8Array`. Um Buffer-spezifische Methoden in Node.js zu verwenden, konvertieren Sie zuerst ein Ergebnis, das nicht null ist:

```diff
- const base64 = mock.getBinaryResponse(requestId)?.toString('base64')
+ const bytes = mock.getBinaryResponse(requestId)
+ const base64 = bytes === null ? undefined : Buffer.from(bytes).toString('base64')
```

## Multi-Remote-Netzwerk-Mocks

`browser.mock()` auf einem Multi-Remote-Browser gibt ein `WebdriverIO.MultiRemoteMock` zurück, kein Array von Mocks. `respond`, `restore` und die anderen Mock-Methoden laufen auf jeder Instanz. Lesen Sie erfasste Anfragen aus dem Mock für einen einzelnen Browser. Verwenden Sie den Typ `WebdriverIO.MultiRemoteMock` aus dem globalen Namespace `WebdriverIO`.

```diff
- const [chromeMock, firefoxMock] = await browser.mock('*/api')
- expect(chromeMock.calls).toHaveLength(1)
+ const mock = await browser.mock('*/api')
+ mock.respond({ ok: true })
+ expect(mock.getInstance('myChromeBrowser').calls).toHaveLength(1)
+ expect(mock.instances).toEqual(['myChromeBrowser', 'myFirefoxBrowser'])
```

`getInstance` löst `Multi-remote object has no instance named "<name>"` aus, wenn der Name nicht zu `instances` gehört. Ein Mock aus `browser.select('myFirefoxBrowser', 'myChromeBrowser')` listet diese Instanzen in dieser Reihenfolge auf, die von `browser.instances` abweichen kann. Gehen Sie nicht davon aus, dass `mocks[0]` ein bestimmter Browser ist.

## Mock-Antworten, die das Backend überspringen

`mock.respond(..., { fetchResponse: false })` ruft das Backend nicht auf. In v9 ignorierte ein Mock, der zusätzlich nach `statusCode` oder `responseHeaders` filterte, diesen Filter und beantwortete trotzdem jede passende Anfrage. In v10 lösen `respond()` und `respondOnce()` einen Fehler aus, weil diese Filter nur anhand der Backend-Antwort entschieden werden können.

```diff
- const mock = await browser.mock('**/users', { statusCode: 200 })
- mock.respond({ name: 'Ada' }, { fetchResponse: false })
+ const mock = await browser.mock('**/users')
+ mock.respond({ name: 'Ada' }, { fetchResponse: false })
```

Um den Filter beizubehalten, lassen Sie `fetchResponse` weg, sodass der Mock die Antwort abruft, den Status oder die Header prüft und dann den Body ersetzt.

## Elementreferenzen {#element-references}

Element-IDs verwenden den W3C-WebDriver-Schlüssel `element-6066-11e4-a52e-4f735466cecf` und die Eigenschaft `elementId`. Das JSON-Wire-Protocol-Feld `ELEMENT` ist nicht mehr Teil des Elementvertrags.

`WebdriverIO.Element` deklariert `ELEMENT` nicht mehr. Lesen Sie `element.elementId`, das Elementinstanzen bereits bereitstellen.

`browser.execute` und die eingebauten Skripte, die ein Element in die Seite senden (`getHTML`, `isClickable`, `isDisplayed`, `scrollIntoView` und die übrigen), übergeben nur die W3C-Referenz:

```diff
- await browser.execute((el) => el.ELEMENT, elem)
+ await browser.execute(
+     (el) => el['element-6066-11e4-a52e-4f735466cecf'],
+     elem
+ )
```

Ein Find-Element-Body, der nur `{ ELEMENT: '...' }` enthält, ist kein Element. Fügen Sie den W3C-Schlüssel hinzu. Wenn beide Schlüssel vorhanden sind, verwendet WebdriverIO die W3C-ID.

Jasmine gibt ein verkettetes `$()`-Ergebnis über `toJSON` aus. Dieser Wert ist dieselbe W3C-Referenz, `{ 'element-6066-11e4-a52e-4f735466cecf': elementId }`.

Mit WebDriver BiDi liefert ein Skript, das eine `NodeList` (zum Beispiel von `querySelectorAll`) oder eine `HTMLCollection` (zum Beispiel `element.children`) zurückgibt, jetzt eine Liste von Elementreferenzen, wie es WebDriver Classic tut. In v9 lieferte es rohe BiDi-Werte, sodass `browser.execute` Objekte zurückgab, die keine Elemente sind, und eine `custom$`- oder `custom$$`-Strategie, die `querySelectorAll(...)` zurückgab, kein Element fand. Ein Workaround wie `Array.from(document.querySelectorAll(...))` funktioniert weiterhin, und Sie können ihn entfernen:

```diff
  browser.addLocatorStrategy('byCss', (selector) =>
-     Array.from(document.querySelectorAll(selector))
+     document.querySelectorAll(selector)
  )
```

## React-Selektoren

`react$` und `react$$` funktionieren jetzt mit React 16 bis 19, für eine App, die mit `createRoot` oder mit `ReactDOM.render` startet. Zuvor schlugen `browser.react$` und `browser.react$$` mit React 18 und neuer fehl (`Could not find the root element of your application`), und in jeder Version konnte ein Ergebnis aus dem Render vor dem letzten Update stammen, sodass eine Komponente, die durch eine Zustandsänderung hinzugefügt wurde, nicht gefunden wurde.

Auf einer Seite, auf der React noch keinen Root gerendert hat, warten die Befehle jetzt bis zu 5 Sekunden darauf, bevor sie fehlschlagen. Zuvor schlugen sie sofort fehl, sodass eine App, die spät startete, nicht gefunden wurde.

Die Befehle verwenden die Bibliothek [resq](https://github.com/baruchvlz/resq) nicht mehr, und WebdriverIO installiert sie nicht mehr. Die Selektorregeln ändern sich nicht (siehe [React-Selektoren](/docs/selectors#react-selectors)), mit diesen Ausnahmen:

- `react$` mit sowohl `props` als auch `state` findet eine Komponente, die auf beides passt. Zuvor ignorierte es `props`, wenn auch `state` angegeben war.
- `react$$` liefert jeden DOM-Knoten einmal. Zuvor lieferten eine Higher-Order-Komponente und ihr Kind in manchen Browsern dasselbe Element zweimal.
- Ein Fragment, das ein Fragment enthält, liefert eine flache Liste von Knoten. Zuvor konnte `react$` eine Liste zurückgeben.
- Ein Filter mit einem `null`-Wert funktioniert. Zuvor schlug er mit `Cannot convert undefined or null to object` fehl.
- Ohne Element-Scope durchsuchen die Befehle alle React-Roots der Seite in Dokumentreihenfolge, auch Roots innerhalb anderer Roots und Roots in offenen Shadow Roots. `react$` liefert den ersten Treffer. Zuvor durchsuchten sie nur den ersten Root, auch einen, den React noch nicht gerendert oder bereits ausgehängt hatte, und durchsuchten keine Shadow Roots. Auf einer Seite mit mehr als einem Root kann `react$$` jetzt mehr Elemente liefern: Um nur einen Root zu durchsuchen, rufen Sie den Befehl auf dessen Container auf, zum Beispiel `$('#root').react$$('MyComponent')`.
- Auf dem Container eines Roots innerhalb eines anderen Roots durchsuchen die Befehle den inneren Root. Zuvor durchsuchten sie den äußeren Root.
- Auf dem Browsing-Context eines Frames und auf einem Element eines Frames funktionieren die Befehle. Zuvor schlug der Kontextbefehl mit `this.executeScript is not a function` fehl, und der Elementbefehl schlug mit `Could not find instance of React in given element` fehl.

Das interne Skript `webdriverio/scripts/resq` wurde entfernt.

## Komponenten-Testing

`@wdio/browser-runner` re-exportiert `fn`, `spyOn` und die Mock-Typen aus `@vitest/spy` 5 (zuvor 3). Ein Mock, den Ihr Code mit `new` aufruft, benötigt eine `function`- oder `class`-Implementierung. Eine Arrow-Function löst `is not a constructor` aus, und `mockReturnValue` löst einen Fehler aus, wenn der Mock mit `new` aufgerufen wird.

```diff
- const Client = fn(() => ({ close: fn() }))
+ const Client = fn(function () { return { close: fn() } })
```

Weitere Spy-Änderungen finden Sie im [Vitest-Migrationsleitfaden](https://vitest.dev/guide/migration).

## Puppeteer

`webdriverio` akzeptiert `puppeteer-core` `>=24 <26`, einschließlich Puppeteer 25. `getPuppeteer()` und `@wdio/lighthouse-service` werden gegen diese Versionslinie getestet.

## ESLint

`eslint-plugin-wdio` erfordert ESLint 10. ESLint 9 hat am 2026-08-06 sein [End of Life](https://eslint.org/version-support/) erreicht und wird nicht mehr unterstützt. Mit TypeScript verwenden Sie `typescript-eslint` 8.56.0 oder neuer.

```sh
npm install --save-dev eslint@10 eslint-plugin-wdio
```

`eslint-plugin-wdio` exportiert nur die Flat-Config `flat/recommended`. Der eslintrc-Name `plugin:wdio/recommended` wurde entfernt.

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    wdioConfig['flat/recommended'],
]
```

Die empfohlene Konfiguration wechselt zur typbewussten Regel `wdio/no-floating-promise` anstelle von `wdio/await-expect`, wenn das Paket `typescript-eslint` installiert ist. Nur `@typescript-eslint/eslint-plugin` zu installieren reicht nicht aus.

```sh
npm install --save-dev typescript typescript-eslint
```

In diesem Modus parst die Konfiguration jede Datei, auf die sie zutrifft, mit dem TypeScript Project Service. Beschränken Sie sie auf TypeScript-Dateien und stellen Sie sicher, dass diese Teil einer `tsconfig.json` sind:

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    { files: ['**/*.{ts,mts,cts,tsx}'], ...wdioConfig['flat/recommended'] },
]
```

Eine erfasste JavaScript-Datei, die nicht Teil des TypeScript-Projekts ist, wie `wdio.conf.js`, schlägt mit "was not found by the project service" fehl. Um auch JavaScript-Dateien zu linten, setzen Sie `"allowJs": true`, fügen Sie sie zu `include` in `tsconfig.json` hinzu und erweitern Sie das Muster auf `**/*.{js,mjs,cjs,ts,mts,cts,tsx}`.

## Benutzerdefinierte Frameworks

`setupExpect` in einem benutzerdefinierten Framework-Adapter akzeptiert keine `Map` von Matchern mehr, und der Runner fügt dem Matcher-Objekt keine `entries`-Methode mehr hinzu. Iterieren Sie mit `Object.entries(wdioMatchers)`.

## Firefox-Profil

`@wdio/firefox-profile-service` behandelt `legacy` nicht mehr als Service-Option. Dieses Flag galt nur für Firefox 55 und älter. Löschen Sie es. Ein verbliebenes `legacy: true` wird als Präferenz namens `legacy` in das Profil geschrieben.

## WebDriver-Protokoll

Jede Sitzung ist eine [W3C-WebDriver](https://w3c.github.io/webdriver/)-Sitzung. WebdriverIO spricht weder das JSON Wire Protocol noch das Mobile JSON Wire Protocol. v9 hat diese Befehle entfernt. v10 entfernt außerdem den Antwort-Umschlag, den diese Protokolle verwendeten, sodass ein Server, der ihn noch zurückgibt, keine Sitzung starten kann.

`browser.isW3C` wurde entfernt, einschließlich des Werts, der zuvor in der Worker-Nachricht `sessionStarted` weitergeleitet wurde. Die Übergabe von `isW3C` an `attach` wird ignoriert. Der BiDi-Befehlssatz bleibt auf dem Client. Eine aktive BiDi-Verbindung hängt weiterhin von `webSocketUrl` ab.

### `browser.back()` und `browser.forward()` mit BiDi

Aufrufstellen bleiben `await browser.back()` und `await browser.forward()`. Keiner der beiden Befehle nimmt ein Argument entgegen oder gibt einen Wert zurück.

In einer BiDi-Sitzung rufen diese Befehle `browsingContext.traverseHistory` mit `delta` `-1` oder `1` auf dem Top-Level-Browsing-Context auf und warten dann auf die Dokumentbereitschaft, der `pageLoadStrategy` entspricht. `none` kehrt zurück, sobald der Traversal-Befehl akzeptiert wurde. `eager` wartet auf `browsingContext.domContentLoaded`. `normal`, der Standard, wartet auf `browsingContext.load`. Eine Wiederherstellung aus dem Back-Forward-Cache sendet diese Events nicht; der Befehl kehrt zurück, wenn der `readyState` des festgeschriebenen Dokuments bereits der Strategie entspricht. Das Warten verwendet den Page-Load-Timeout der Sitzung (`timeouts.pageLoad`, 300000 ms, wenn nicht gesetzt). Classic-Sitzungen senden weiterhin an `POST /session/:sessionId/back` und `POST /session/:sessionId/forward`.

Ein fehlender Verlaufseintrag führt weiterhin zu einer Ablehnung. Bei BiDi stammt die Meldung von `browsingContext.traverseHistory` und enthält `no such history entry` statt des klassischen WebDriver-Fehlertexts. Eine Traversierung, die die erwartete Bereitschaft nie erreicht, wird mit `History traversal timed out after <ms>ms waiting for browsingContext.domContentLoaded` oder `browsingContext.load` abgelehnt.

### Antwort auf New Session

Create Session muss den W3C-Body zurückgeben. WebdriverIO liest `value.sessionId` und `value.capabilities`:

```json
{
  "value": {
    "sessionId": "8e8a5c2e",
    "capabilities": {
      "browserName": "chrome",
      "browserVersion": "131.0.6778.85"
    }
  }
}
```

Ein JSON-Wire-Protocol-Body wird abgelehnt. Dieser Body platziert `sessionId` und `status` neben `value` und legt die Capabilities direkt in `value` ab:

```json
{
  "sessionId": "8e8a5c2e",
  "status": 0,
  "value": {
    "browserName": "chrome",
    "version": "131.0"
  }
}
```

Die Sitzungserstellung löst dann `WebDriver new session response is missing a session id or capabilities. WebdriverIO requires a W3C WebDriver server.` aus. Derselbe Fehler tritt auf, wenn `value.capabilities` fehlt, selbst wenn `value.sessionId` vorhanden ist.

Ein flaches Capability-Objekt in Ihrer Konfiguration ist weiterhin gültig. WebdriverIO verpackt `{ browserName: 'chrome' }` in `alwaysMatch`, bevor die Anfrage gesendet wird. Herstellerpräfixierte Schlüssel, gemischt mit Schlüsseln außerhalb des W3C-Capability-Sets, werden weiterhin abgelehnt. Legen Sie Herstellereinstellungen in `sauce:options`, `bstack:options`, `appium:options` oder einem anderen präfixierten Schlüssel ab.

### Befehlsantworten

Ein Befehlsergebnis ist `{ "value": … }`. HTTP 200 ohne `error` in `value` bedeutet Erfolg. Ein fehlendes Element ist HTTP 404 mit `value.error` auf `"no such element"` gesetzt, was weiterhin eine verzögerte Elementsuche ermöglicht. Ein numerischer `status` im Body wird ignoriert, einschließlich `status: 0` und des alten Codes `status: 7` ("no such element"). Senden Sie stattdessen das W3C-Fehlerobjekt.

Der exportierte Fehlertyp `JSONWPCommandError` heißt jetzt `SessionRequestError`.

### Server

Die Treiber, gegen die WebdriverIO läuft, sprechen auf der Client-Verbindung bereits W3C:

- ChromeDriver ist seit Chrome 75 standardmäßig W3C. Chromium-basiertes Edge entspricht dem. Aktueller ChromeDriver akzeptiert weiterhin `goog:chromeOptions.w3c: false`, was diese eine Sitzung auf das Legacy-Protokoll zurückschaltet. WebdriverIO unterstützt diesen Schalter nicht.
- geckodriver und Apples safaridriver sind ausschließlich W3C. Eine Safari-Antwort, die `platformName` oder `browserVersion` auslässt, ist weiterhin W3C.
- Selenium 4 und Grid 4 sprechen W3C. Grid hat in 4.9 aufgehört, das JSON Wire Protocol zu übersetzen.
- Appium 2 hat das JSON Wire Protocol und das Mobile JSON Wire Protocol entfernt. Appium 3 hat zudem die verbliebenen Parameterformen entfernt. v10 erfordert Appium 3, siehe unten. Eine mobile Sitzung, die `setWindowRect` auslässt, ist weiterhin W3C; diese Capability bedeutet, dass das Gerät die Größe eines Fensters nicht ändern kann.

Diese Server sprechen noch das JSON Wire Protocol und werden nicht unterstützt: Selenium 3, PhantomJS, EdgeHTML (`--jwp`) und direkt verbundener WinAppDriver. Der Appium-Windows-Treiber bleibt als W3C-Client unterstützt. Er übersetzt Befehle für WinAppDriver, einschließlich Get Element Property in den Attribut-Endpunkt. Richten Sie WebdriverIO auf Appium, nicht auf den Port von WinAppDriver.

[`@wdio/jsonwp-service`](https://www.npmjs.com/package/@wdio/jsonwp-service) bringt diese Server nicht mit v10 zum Laufen. Der Sitzungsstart erfordert weiterhin den obigen W3C-Body, und Befehlsergebnisse ignorieren weiterhin einen numerischen `status`. Bleiben Sie bei WebdriverIO 9, wenn dieser Server weiterhin benötigt wird.

`webdriver.remote.sessionid` kennzeichnet keine Selenium-Standalone-Sitzung mehr. Selenium Grid 4 wird weiterhin über `se:cdp` erkannt.

Der Timeout-Schlüssel `page load` wird unter [`setTimeout`](#settimeout) behandelt. Element-IDs werden unter [Elementreferenzen](#element-references) behandelt. Auf dem Desktop ist `[name="..."]` ein CSS-Selektor. Die Locator-Strategie `name` bleibt für mobile Sitzungen erhalten.

## Appium

WebdriverIO 10 erfordert **Appium 3** und aktuelle offizielle Treiber (UiAutomator2, XCUITest, Espresso, Windows, Mac2 usw.). Appium 1.x und 2.x werden nicht unterstützt. Bleiben Sie bei WebdriverIO 9, wenn Sie den Server nicht aktualisieren können.

```sh
npm i -D appium@^3
appium driver update installed
```

`@wdio/appium-service` deklariert einen optionalen `appium`-Peer von `>=3` und verweigert den Start eines älteren Servers. `create-wdio` installiert `appium@^3`, wenn Appium fehlt oder älter als 3 ist.

Cloud-Anbieter, die noch Appium 2 bereitstellen, benötigen ein Appium-3-Image, oder Sie müssen bei WebdriverIO 9 bleiben.

### Mobile Befehle greifen nicht mehr auf HTTP zurück

In v9 versuchten viele mobile Helfer `browser.execute('mobile: …')` und griffen bei einem Unknown-Method-Fehler auf einen entfernten Appium-HTTP-Endpunkt zurück. In v10 entfällt dieser Fallback: Derselbe Fehler fordert Sie auf, auf Appium 3 zu aktualisieren. Bevorzugen Sie die mobilen WebdriverIO-Befehle (`browser.lock()`, `browser.shake()`, …) oder direkt `browser.execute('mobile: …')`.

### Entfernte Protokollbefehle

Appium 3 hat [viele veraltete Base-Driver-Endpunkte entfernt](https://appium.io/docs/en/latest/guides/migrating-2-to-3/). WebdriverIO stellt für die meisten dieser Routen keine Client-Methoden mehr bereit (zum Beispiel `appiumLock`, `touchPerform` und die Mobile-JSON-Wire-Protocol-Map). Verwenden Sie stattdessen W3C Actions, den entsprechenden mobilen Befehl oder eine `mobile:`-Execute-Methode des Treibers.

### Scope von Appium `--allow-insecure`

Appium 3 erfordert ein Treiber- oder `*`-Scope-Präfix bei `--allow-insecure`-Features, zum Beispiel `uiautomator2:adb_shell` oder `*:adb_shell`.

### Appium-Capabilities ohne Präfix wählen keine Appium-Sitzung mehr aus

`automationName`, `deviceName` und `appiumVersion` ohne `appium:`-Präfix veranlassen WebdriverIO nicht mehr, den Browsertreiber zu überspringen und den Appium-Service anzuhängen. Verwenden Sie die präfixierte Capability oder verschachteln Sie sie unter `appium:options`:

```diff
- capabilities: { platformName: 'Android', automationName: 'UiAutomator2', deviceName: 'emulator' }
+ capabilities: {
+     platformName: 'Android',
+     'appium:automationName': 'UiAutomator2',
+     'appium:deviceName': 'emulator'
+ }
```

`wdio repl` gibt jetzt diese präfixierten Schlüssel aus, einschließlich `appium:app`, `appium:platformVersion` und `appium:udid`.

### `getValue` auf Mobilgeräten liest die Element-Eigenschaft

`element.getValue()` ruft in jeder Sitzung Get Element Property auf, einschließlich Appium 3. In einer mobilen Sitzung rief es zuvor Get Element Attribute auf.

### Signatur von `stopRecordingScreen` an `startRecordingScreen` angeglichen

`driver.stopRecordingScreen` akzeptiert jetzt nur noch ein einzelnes `options`-Argument statt der bisherigen 4 Argumente, angeglichen an `driver.startRecordingScreen`. Verschieben Sie die einzelnen Argumente in ein Objekt:

```diff
- driver.stopRecordingScreen('webdriver.io', undefined, undefined, 'POST')
+ driver.stopRecordingScreen({ remotePath: 'webdriver.io', method: 'POST' })
```

## Multi-Remote-Benennung

APIs, die als `multiremote` oder `Multiremote` geschrieben wurden, heißen jetzt in camelCase / PascalCase `multiRemote` / `MultiRemote`. Für die alten Namen gibt es keine Aliase.

| v9 | v10 |
|----|-----|
| `multiremote()` (`webdriverio`) | `multiRemote()` |
| `WebdriverIO.MultiremoteConfig` | `WebdriverIO.MultiRemoteConfig` |
| `isMultiremote` auf dem Browser und den Ergebnissen von `$` und `$$` | `isMultiRemote` |
| `Capabilities.RequestedMultiremoteCapabilities` | `Capabilities.RequestedMultiRemoteCapabilities` |
| `Capabilities.WithRequestedMultiremoteCapabilities` | `Capabilities.WithRequestedMultiRemoteCapabilities` |
| `runner.isMultiremote` (Reporter) | `runner.isMultiRemote` |
| `Launcher#isMultiremote`, `Launcher#isParallelMultiremote` (`@wdio/cli`) | `isMultiRemote`, `isParallelMultiRemote` |
| `isMultiremote` in `Workers.WorkerMessage`, `WorkerInstance` (`@wdio/local-runner`) und `SpecReporter#getTestLink()` | `isMultiRemote` |
| `browser.multiremoteFetch()` (`@wdio/webdriver-mock-service`) | `browser.multiRemoteFetch()` |

Suchen Sie nach `multiremote` und `Multiremote` (unter Beachtung der Groß-/Kleinschreibung) und ersetzen Sie jeden Treffer. Allure-Berichte kennzeichnen Multi-Remote-Tests außerdem mit `isMultiRemote` statt `isMultiremote`.

## Virtuelle Displays unter Linux

`@wdio/xvfb` wird durch `@wdio/display-server` ersetzt. Statt jeden Worker in `xvfb-run` zu verpacken, startet der Testrunner einen Display-Server für den gesamten Lauf, vor dem `onPrepare`-Hook jedes Services. Er bevorzugt Weston im Headless-Modus und greift auf Xvfb zurück. Details finden Sie unter [Headless & Display-Server](/docs/headless-and-display-servers).

Die Optionen wurden umbenannt. Die alten Namen funktionieren in v10 weiterhin, protokollieren aber eine Deprecation-Warnung und werden in v11 entfernt. Wenn Sie beide Namen setzen, hat der neue Vorrang:

```diff
- autoXvfb: false,
+ displayServerEnabled: false,
- xvfbAutoInstall: true,
+ displayServerAutoInstall: true,
- xvfbAutoInstallMode: 'sudo',
+ displayServerAutoInstallMode: 'sudo',
- xvfbAutoInstallCommand: 'my-install-command',
+ displayServerAutoInstallCommand: 'my-install-command',
```

`xvfbMaxRetries` und `xvfbRetryDelay` haben keine Wirkung und werden ebenfalls in v11 entfernt. Der Start wird nicht mehr wiederholt: Wenn Weston nicht startet, versucht der Testrunner Xvfb, und wenn keiner von beiden startet, läuft der Lauf ohne Display weiter.

Eine Konfiguration, die eine der vier umbenannten Optionen ohne ihren Ersatz setzt und `displayServer` nicht setzt, verwendet weiterhin Xvfb wie in v9. Sofern sie den Display-Server nicht deaktiviert, protokolliert sie außerdem `Preferring Xvfb, as v9 did, because the config sets v9 display keys`. Sobald Sie die Optionen umbenennen, fügen Sie `displayServer: 'xvfb'` hinzu, um Xvfb beizubehalten, oder lassen Sie es weg, um Weston zu bevorzugen. Im Auto-Modus wird ein benutzerdefinierter Installationsbefehl zuerst für Weston ausgeführt und für Xvfb nur dann erneut, wenn Weston weiterhin nicht verfügbar ist oder nicht startet und Xvfb noch fehlt. Setzen Sie daher `displayServer` auf den Server, den der Befehl installiert, um den Versuch für den anderen Server zu überspringen.

Die automatische Installation unterstützt `yum` nicht mehr, das v9 auf Hosts ohne `dnf` verwendete. v10 erkennt nur `apt-get`, `dnf`, `zypper`, `pacman`, `apk` und `xbps-install`, installieren Sie Xvfb daher auf einem Host, der nur `yum` hat, selbst.

Ein `xvfbAutoInstallCommand`-Array lief in v9 über eine Shell, sodass Elemente wie `&&` oder `VAR=value` funktionierten. Arrays laufen jetzt unter beiden Optionsnamen ohne Shell, verwenden Sie für Shell-Syntax daher einen String.

Weitere Änderungen, die Ihnen auffallen könnten:

- Alle Worker teilen sich ein Display. In v9 hatte jeder Worker ein eigenes Display. Chrome- und Edge-Seiten kann jetzt der Fokus fehlen, siehe [Fensterfokus](/docs/headless-and-display-servers#window-focus).
- Die Xvfb-Display-Nummer ist nicht festgelegt. Lesen Sie sie aus `DISPLAY`, statt `:99` anzunehmen.
- Ein Host, auf dem nur `WAYLAND_DISPLAY` gesetzt ist, gilt jetzt als Host mit Display. v9 ließ Worker dort unter Xvfb laufen, da `DISPLAY` nicht gesetzt war. v10 startet nichts, öffnet Browserfenster auf Ihrem Compositor und setzt `XDG_SESSION_TYPE`, `GDK_BACKEND` und `ELECTRON_OZONE_PLATFORM_HINT` für den Lauf auf `wayland`. Um sie wie zuvor unter Xvfb auszuführen, entfernen Sie `WAYLAND_DISPLAY` und setzen Sie `displayServer: 'xvfb'`.
- Der Standardbildschirm ist 1920x1080. v9 verwendete den Standard von `xvfb-run`, der unter Debian und Ubuntu 1280x1024 und unter Fedora, RHEL und Arch 640x480 beträgt. Um die Größe beizubehalten, die Ihre Baselines verwenden, setzen Sie `displayServerWidth` und `displayServerHeight` entsprechend.
- Browser wählen Wayland oder X11 anhand des `XDG_SESSION_TYPE`, den der Display-Server setzt. Unter Weston fügt WebdriverIO außerdem `--ozone-platform=wayland` zu den von ihm gestarteten Chrome- und Edge-Instanzen hinzu, da Chrome und Edge vor 140 (Chrome for Testing vor 135) `XDG_SESSION_TYPE` ignorieren. Weston stellt kein `DISPLAY` bereit; wenn Ihre Tests oder Tools also X11 benötigen, setzen Sie `displayServer: 'xvfb'`.
- Wenn Sie `XvfbManager` oder die `xvfb`-Instanz aus `@wdio/xvfb` direkt verwendet haben, verwenden Sie stattdessen `DisplayServerManager` aus `@wdio/display-server`. Wo Sie `xvfb.init()` ausgeführt und Befehle in `xvfb-run` verpackt oder Prozesse über `ProcessFactory` gestartet haben, starten Sie ein Display und übergeben Sie dessen Umgebung an die Prozesse, die sie benötigen. Das Beispiel verwendet Xvfb mit 1280x1024, wie v9 unter Debian und Ubuntu. Auf einem Host, auf dem nur `WAYLAND_DISPLAY` gesetzt ist, entfernen Sie diese Variable zuerst, sonst startet `startDaemon()` nichts:

  ```js
  import { spawn } from 'node:child_process'
  import { once } from 'node:events'
  import { DisplayServerManager } from '@wdio/display-server'

  const manager = new DisplayServerManager({ displayServer: 'xvfb' })
  const daemon = await manager.startDaemon({ width: 1280, height: 1024 })
  // startDaemon() gibt auch null zurück, wenn bereits ein Display existiert
  if (!daemon && manager.shouldRun()) {
      throw new Error('Xvfb could not be started')
  }
  try {
      const child = spawn('your-command', { shell: true, stdio: 'inherit', env: { ...process.env, ...daemon?.env } })
      const [code] = await once(child, 'exit')
      process.exitCode = code ?? 1
  } finally {
      await daemon?.stop()
  }
  ```

## Emulation

`browser.emulate()` steuert das WebDriver-BiDi-Emulationsmodul für den aktuellen Top-Level-Browsing-Context. v9 injizierte ein Preload-Skript, das `navigator.geolocation.getCurrentPosition`, `navigator.userAgent`, `window.matchMedia` und `navigator.onLine` patchte. Diese Skripte entfallen. `browser.emulate('clock', …)` installiert weiterhin Fake-Timer in die aktuelle Seite und in danach geöffnete Seiten.

Für die BiDi-Scopes ist kein Neuladen mehr erforderlich.

```diff
  await browser.emulate('onLine', false)
- // nur `navigator.onLine` änderte sich; der Datenverkehr lief weiter
+ // der Browsing-Context ist offline, einschließlich fetch, WebSocket und WebTransport
```

- `onLine: false` ruft `emulation.setNetworkConditions` mit `{ type: 'offline' }` auf. `true` und das Wiederherstellen des Scopes heben dies auf. Durchsatz und Latenz bleiben bei `browser.throttleNetwork()`.
- `colorScheme` setzt das Media-Feature `prefers-color-scheme`, sodass CSS `@media (prefers-color-scheme)` `matchMedia` folgt.
- `userAgent` ist die User-Agent-Überschreibung des Browsers, keine gepatchte Eigenschaft `navigator.userAgent`.
- `geolocation` verwendet den Geolocation-Stack des Browsers. Eine Seite kann weiterhin `browser.setPermissions({ name: 'geolocation' }, 'granted')` benötigen. `{ error: 'positionUnavailable' }` meldet diesen Fehler statt Koordinaten.
- `colorScheme` und `media` teilen sich eine Media-Feature-Map. Der spätere Aufruf ersetzt die gesamte Map, und das Wiederherstellen eines der beiden Scopes leert sie.
- `device` setzt User-Agent, Viewport, Touch, mobiles Textlayout und Viewport-Meta aus dem Gerätedeskriptor. Es ändert weder `screen` noch `orientation`.

Neue Scopes sind `media`, `locale`, `timezone`, `touch`, `orientation`, `screen`, `viewportMeta`, `textLayout`, `scripting`, `scrollbar` und `forcedColors`. Ein Browser, der einen Befehl nicht implementiert, lehnt den Aufruf mit seinem eigenen Fehler ab (`unknown command` oder `unsupported operation`). WebdriverIO greift weder auf ein Preload-Skript noch auf CDP zurück. Wenn `device` mittendrin abgelehnt wird, werden der vorherige User-Agent, Viewport, Touch, Textlayout und Viewport-Meta wiederhergestellt.

`wdio session emulate` akzeptiert dieselben Scopes. Es fordert bei einer Überschreibung, die sofort gilt, nicht mehr zum Neuladen auf. Die Presets von `emulate network` sowie `emulate cpu` sind unverändert und bleiben auf Chromium beschränkt. Siehe [Emulation](/docs/emulation).

## Nächste Schritte

- Kopieren Sie den [Migrations-Skill](#migrate-with-a-coding-agent) in das Projekt und bitten Sie einen Agent, ihn anzuwenden.
- [WebdriverIO für Coding-Agents](/docs/ai-agents) zum Schreiben neuer v10-Tests.
- [Headless und Display-Server](/docs/headless-and-display-servers), wenn die Suite unter Linux läuft.