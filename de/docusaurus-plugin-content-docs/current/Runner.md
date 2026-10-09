---
id: runner
title: Runner
description: "Wählen Sie zwischen dem Local Runner und dem Browser Runner und konfigurieren Sie Browser-Runner-Optionen wie Presets, Vite-Konfiguration und Coverage."
---

import CodeBlock from '@theme/CodeBlock';

Ein Runner in WebdriverIO steuert, wie und wo Tests ausgeführt werden, wenn der Testrunner verwendet wird. WebdriverIO unterstützt derzeit zwei verschiedene Arten von Runnern: den Local Runner und den Browser Runner.

## Local Runner

Der [Local Runner](https://www.npmjs.com/package/@wdio/local-runner) initialisiert Ihr Framework (z. B. Mocha, Jasmine oder Cucumber) innerhalb eines Worker-Prozesses und führt alle Ihre Testdateien in Ihrer Node.js-Umgebung aus. Jede Testdatei wird pro Capability in einem separaten Worker-Prozess ausgeführt, was maximale Parallelität ermöglicht. Jeder Worker-Prozess verwendet eine einzelne Browser-Instanz und führt daher seine eigene Browser-Session aus, was maximale Isolation ermöglicht.

Da jeder Test in seinem eigenen isolierten Prozess ausgeführt wird, ist es nicht möglich, Daten zwischen Testdateien zu teilen. Es gibt zwei Möglichkeiten, dies zu umgehen:

- verwenden Sie den [`@wdio/shared-store-service`](https://www.npmjs.com/package/@wdio/shared-store-service), um Daten zwischen allen Workern zu teilen
- gruppieren Sie Spec-Dateien (mehr dazu unter [Organizing Test Suite](https://webdriver.io/docs/organizingsuites#grouping-test-specs-to-run-sequentially))

Wenn in der `wdio.conf.js` nichts anderes definiert ist, ist der Local Runner der Standard-Runner in WebdriverIO.

### Installation

Um den Local Runner zu verwenden, können Sie ihn wie folgt installieren:

```sh
npm install --save-dev @wdio/local-runner
```

### Einrichtung

Der Local Runner ist der Standard-Runner in WebdriverIO, daher muss er nicht in Ihrer `wdio.conf.js` definiert werden. Wenn Sie ihn explizit festlegen möchten, können Sie ihn wie folgt definieren:

```js
// wdio.conf.js
export const {
    // ...
    runner: 'local',
    // ...
}
```

## Browser Runner

Im Gegensatz zum [Local Runner](https://www.npmjs.com/package/@wdio/local-runner) initialisiert und führt der [Browser Runner](https://www.npmjs.com/package/@wdio/browser-runner) das Framework innerhalb des Browsers aus. Dadurch können Sie Unit-Tests oder Komponententests in einem echten Browser ausführen, anstatt wie viele andere Test-Frameworks in einem JSDOM. Das Test-Bundle läuft in Chrome 90, Edge 90, Firefox 90 und Safari 14.1 oder neuer. Siehe [Browser-Unterstützung](/docs/component-testing#browser-support).

Obwohl [JSDOM](https://www.npmjs.com/package/jsdom) für Testzwecke weit verbreitet ist, ist es letztlich kein echter Browser, und man kann damit auch keine mobilen Umgebungen emulieren. Mit diesem Runner ermöglicht WebdriverIO es Ihnen, Ihre Tests einfach im Browser auszuführen und WebDriver-Befehle zu verwenden, um mit auf der Seite gerenderten Elementen zu interagieren.

Hier ist ein Überblick über die Ausführung von Tests in JSDOM im Vergleich zum Browser Runner von WebdriverIO

| | JSDOM | WebdriverIO Browser Runner |
|-|-------|----------------------------|
|1.| Führt Ihre Tests in Node.js mithilfe einer Neuimplementierung von Webstandards aus, insbesondere der WHATWG DOM- und HTML-Standards | Führt Ihren Test in einem echten Browser aus und führt den Code in einer Umgebung aus, die Ihre Benutzer verwenden |
|2.| Interaktionen mit Komponenten können nur über JavaScript imitiert werden | Sie können die [WebdriverIO API](api) verwenden, um über das WebDriver-Protokoll mit Elementen zu interagieren |
|3.| Canvas-Unterstützung erfordert [zusätzliche Abhängigkeiten](https://www.npmjs.com/package/canvas) und [hat Einschränkungen](https://github.com/Automattic/node-canvas/issues) | Sie haben Zugriff auf die echte [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) |
|4.| JSDOM hat einige [Einschränkungen](https://github.com/jsdom/jsdom#caveats) und nicht unterstützte Web-APIs | Alle Web-APIs werden unterstützt, da Tests in einem echten Browser ausgeführt werden |
|5.| Unmöglich, browserübergreifende Fehler zu erkennen | Unterstützung für alle Browser, einschließlich mobiler Browser |
|6.| Kann __keine__ Pseudo-Zustände von Elementen testen | Unterstützung für Pseudo-Zustände wie `:hover` oder `:active` |

Dieser Runner verwendet [Vite](https://vitejs.dev/), um Ihren Testcode zu kompilieren und im Browser zu laden. Er enthält Presets für die folgenden Komponenten-Frameworks:

- React
- Preact
- Vue.js
- Svelte
- SolidJS
- Stencil

Jede Testdatei / Testdateigruppe wird innerhalb einer einzelnen Seite ausgeführt, was bedeutet, dass die Seite zwischen den einzelnen Tests neu geladen wird, um die Isolation zwischen den Tests zu gewährleisten.

### Installation

Um den Browser Runner zu verwenden, können Sie ihn wie folgt installieren:

```sh
npm install --save-dev @wdio/browser-runner
```

### Einrichtung

Um den Browser Runner zu verwenden, müssen Sie eine `runner`-Eigenschaft in Ihrer `wdio.conf.js`-Datei definieren, z. B.:

```js
// wdio.conf.js
export const {
    // ...
    runner: 'browser',
    // ...
}
```

### Runner-Optionen

Der Browser Runner ermöglicht folgende Konfigurationen:

#### `preset`

Wenn Sie Komponenten mit einem der oben genannten Frameworks testen, können Sie ein Preset definieren, das sicherstellt, dass alles sofort einsatzbereit konfiguriert ist. Diese Option kann nicht zusammen mit `viteConfig` verwendet werden.

__Typ:__ `vue` | `svelte` | `solid` | `react` | `preact` | `stencil`<br />
__Beispiel:__

```js title="wdio.conf.js"
export const {
    // ...
    runner: ['browser', {
        preset: 'svelte'
    }],
    // ...
}
```

#### `viteConfig`

Definieren Sie Ihre eigene [Vite-Konfiguration](https://vitejs.dev/config/). Sie können entweder ein benutzerdefiniertes Objekt übergeben oder eine vorhandene `vite.conf.ts`-Datei importieren, wenn Sie Vite.js für die Entwicklung verwenden. Beachten Sie, dass WebdriverIO benutzerdefinierte Vite-Konfigurationen beibehält, um die Testumgebung einzurichten.

__Typ:__ `string` oder [`UserConfig`](https://github.com/vitejs/vite/blob/52e64eb43287d241f3fd547c332e16bd9e301e95/packages/vite/src/node/config.ts#L119-L272) oder `(env: ConfigEnv) => UserConfig | Promise<UserConfig>`<br />
__Beispiel:__

```js title="wdio.conf.ts"
import viteConfig from '../vite.config.ts'

export const {
    // ...
    runner: ['browser', { viteConfig }],
    // oder einfach:
    runner: ['browser', { viteConfig: '../vites.config.ts' }],
    // oder verwenden Sie eine Funktion, wenn Ihre Vite-Konfiguration viele Plugins enthält,
    // die Sie erst auflösen möchten, wenn der Wert gelesen wird
    runner: ['browser', {
        viteConfig: () => ({
            // ...
        })
    }],
    // ...
}
```

#### `headless`

Wenn auf `true` gesetzt, aktualisiert der Runner die Capabilities, um Tests headless auszuführen. Standardmäßig ist dies in CI-Umgebungen aktiviert, in denen eine `CI`-Umgebungsvariable auf `'1'` oder `'true'` gesetzt ist.

__Typ:__ `boolean`<br />
__Standard:__ `false`, wird auf `true` gesetzt, wenn die `CI`-Umgebungsvariable gesetzt ist

#### `rootDir`

Stammverzeichnis des Projekts.

__Typ:__ `string`<br />
__Standard:__ `process.cwd()`

#### `coverage`

WebdriverIO unterstützt Test-Coverage-Berichte über [`istanbul`](https://istanbul.js.org/). Weitere Details finden Sie unter [Coverage-Optionen](#coverage-options).

__Typ:__ `object`<br />
__Standard:__ `undefined`

### Coverage-Optionen

Mit den folgenden Optionen können Sie die Coverage-Berichterstattung konfigurieren.

#### `enabled`

Aktiviert die Coverage-Erfassung.

__Typ:__ `boolean`<br />
__Standard:__ `false`

#### `include`

Liste der in die Coverage einbezogenen Dateien als Glob-Muster.

__Typ:__ `string[]`<br />
__Standard:__ `[**]`

#### `exclude`

Liste der von der Coverage ausgeschlossenen Dateien als Glob-Muster.

__Typ:__ `string[]`<br />
__Standard:__

```
[
  'coverage/**',
  'dist/**',
  'packages/*/test{,s}/**',
  '**/*.d.ts',
  'cypress/**',
  'test{,s}/**',
  'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}',
  '**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}',
  '**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}',
  '**/__tests__/**',
  '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
  '**/.{eslint,mocha,prettier}rc.{js,cjs,yml}',
]
```

#### `extension`

Liste der Dateierweiterungen, die der Bericht enthalten soll.

__Typ:__ `string | string[]`<br />
__Standard:__ `['.js', '.cjs', '.mjs', '.ts', '.mts', '.cts', '.tsx', '.jsx', '.vue', '.svelte']`

#### `reportsDirectory`

Verzeichnis, in das der Coverage-Bericht geschrieben wird.

__Typ:__ `string`<br />
__Standard:__ `./coverage`

#### `reporter`

Zu verwendende Coverage-Reporter. Eine detaillierte Liste aller Reporter finden Sie in der [istanbul-Dokumentation](https://istanbul.js.org/docs/advanced/alternative-reporters/).

__Typ:__ `string[]`<br />
__Standard:__ `['text', 'html', 'clover', 'json-summary']`

#### `perFile`

Schwellenwerte pro Datei prüfen. Die eigentlichen Schwellenwerte finden Sie unter `lines`, `functions`, `branches` und `statements`.

__Typ:__ `boolean`<br />
__Standard:__ `false`

#### `clean`

Coverage-Ergebnisse vor dem Ausführen der Tests bereinigen.

__Typ:__ `boolean`<br />
__Standard:__ `true`

#### `lines`

Schwellenwert für Zeilen.

__Typ:__ `number`<br />
__Standard:__ `undefined`

#### `functions`

Schwellenwert für Funktionen.

__Typ:__ `number`<br />
__Standard:__ `undefined`

#### `branches`

Schwellenwert für Verzweigungen.

__Typ:__ `number`<br />
__Standard:__ `undefined`

#### `statements`

Schwellenwert für Anweisungen.

__Typ:__ `number`<br />
__Standard:__ `undefined`

### Einschränkungen

Bei der Verwendung des WebdriverIO Browser Runners ist zu beachten, dass Thread-blockierende Dialoge wie `alert` oder `confirm` nicht nativ verwendet werden können. Der Grund dafür ist, dass sie die Webseite blockieren, was bedeutet, dass WebdriverIO nicht weiter mit der Seite kommunizieren kann, wodurch die Ausführung hängen bleibt.

In solchen Situationen stellt WebdriverIO Standard-Mocks mit standardmäßigen Rückgabewerten für diese APIs bereit. Dadurch wird sichergestellt, dass die Ausführung nicht hängen bleibt, wenn der Benutzer versehentlich synchrone Popup-Web-APIs verwendet. Es wird dem Benutzer jedoch dennoch empfohlen, diese Web-APIs für eine bessere Erfahrung zu mocken. Mehr dazu unter [Mocking](/docs/component-testing/mocking).

### Beispiele

Sehen Sie sich unbedingt die Dokumentation zum [Komponententesten](https://webdriver.io/docs/component-testing) an und werfen Sie einen Blick in das [Beispiel-Repository](https://github.com/webdriverio/component-testing-examples), um Beispiele mit diesen und verschiedenen anderen Frameworks zu finden.