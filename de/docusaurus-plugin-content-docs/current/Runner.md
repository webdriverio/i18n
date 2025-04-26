---
id: runner
title: Runner
---

import CodeBlock from '@theme/CodeBlock';

Ein Runner in WebdriverIO orchestriert, wie und wo Tests ausgeführt werden, wenn der Testrunner verwendet wird. WebdriverIO unterstützt derzeit zwei verschiedene Arten von Runnern: lokaler Runner und Browser-Runner.

## Local Runner

Der [Local Runner](https://www.npmjs.com/package/@wdio/local-runner) initiiert Ihr Framework (z.B. Mocha, Jasmine oder Cucumber) innerhalb eines Worker-Prozesses und führt alle Ihre Testdateien in Ihrer Node.js-Umgebung aus. Jede Testdatei wird in einem separaten Worker-Prozess pro Capability ausgeführt, was maximale Parallelität ermöglicht. Jeder Worker-Prozess verwendet eine einzelne Browser-Instanz und führt daher seine eigene Browser-Sitzung aus, was maximale Isolation ermöglicht.

Da jeder Test in seinem eigenen isolierten Prozess ausgeführt wird, ist es nicht möglich, Daten über Testdateien hinweg zu teilen. Es gibt zwei Möglichkeiten, dies zu umgehen:

- Verwenden Sie den [`@wdio/shared-store-service`](https://www.npmjs.com/package/@wdio/shared-store-service), um Daten über alle Worker hinweg zu teilen
- Gruppieren Sie Spec-Dateien (lesen Sie mehr unter [Organizing Test Suite](https://webdriver.io/docs/organizingsuites#grouping-test-specs-to-run-sequentially))

Wenn in der `wdio.conf.js` nichts anderes definiert ist, ist der Local Runner der Standard-Runner in WebdriverIO.

### Installation

Um den Local Runner zu verwenden, können Sie ihn wie folgt installieren:

```sh
npm install --save-dev @wdio/local-runner
```

### Einrichtung

Der Local Runner ist der Standard-Runner in WebdriverIO, daher müssen Sie ihn nicht in Ihrer `wdio.conf.js` definieren. Wenn Sie ihn explizit festlegen möchten, können Sie ihn wie folgt definieren:

```js
// wdio.conf.js
export const {
    // ...
    runner: 'local',
    // ...
}
```

## Browser Runner

Im Gegensatz zum [Local Runner](https://www.npmjs.com/package/@wdio/local-runner) initiiert und führt der [Browser Runner](https://www.npmjs.com/package/@wdio/browser-runner) das Framework innerhalb des Browsers aus. Dies ermöglicht es Ihnen, Unit-Tests oder Komponententests in einem echten Browser auszuführen, anstatt in einer JSDOM wie bei vielen anderen Test-Frameworks.

Während [JSDOM](https://www.npmjs.com/package/jsdom) für Testzwecke weit verbreitet ist, ist es letztendlich kein echter Browser, noch können Sie damit mobile Umgebungen emulieren. Mit diesem Runner ermöglicht WebdriverIO Ihnen, Ihre Tests einfach im Browser auszuführen und WebDriver-Befehle zu verwenden, um mit auf der Seite gerenderten Elementen zu interagieren.

Hier ist ein Überblick über die Ausführung von Tests in JSDOM im Vergleich zum WebdriverIO Browser Runner

| | JSDOM | WebdriverIO Browser Runner |
|-|-------|----------------------------|
|1.| Führt Ihre Tests in Node.js aus und verwendet eine Reimplementierung von Webstandards, insbesondere der WHATWG DOM und HTML Standards | Führt Ihren Test in einem echten Browser aus und führt den Code in einer Umgebung aus, die Ihre Benutzer verwenden |
|2.| Interaktionen mit Komponenten können nur über JavaScript imitiert werden | Sie können die [WebdriverIO API](api) verwenden, um mit Elementen über das WebDriver-Protokoll zu interagieren |
|3.| Canvas-Unterstützung erfordert [zusätzliche Abhängigkeiten](https://www.npmjs.com/package/canvas) und [hat Einschränkungen](https://github.com/Automattic/node-canvas/issues) | Sie haben Zugriff auf die echte [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) |
|4.| JSDOM hat einige [Einschränkungen](https://github.com/jsdom/jsdom#caveats) und nicht unterstützte Web-APIs | Alle Web-APIs werden unterstützt, da Tests in einem echten Browser laufen |
|5.| Unmöglich, Fehler browserübergreifend zu erkennen | Unterstützung für alle Browser einschließlich mobiler Browser |
|6.| Kann Elementpseudozustände __nicht__ testen | Unterstützung für Pseudozustände wie `:hover` oder `:active` |

Dieser Runner verwendet [Vite](https://vitejs.dev/), um Ihren Testcode zu kompilieren und in den Browser zu laden. Er enthält Voreinstellungen für die folgenden Komponenten-Frameworks:

- React
- Preact
- Vue.js
- Svelte
- SolidJS
- Stencil

Jede Testdatei / Testdateigruppe läuft innerhalb einer einzelnen Seite, was bedeutet, dass zwischen jedem Test die Seite neu geladen wird, um die Isolation zwischen Tests zu gewährleisten.

### Installation

Um den Browser Runner zu verwenden, können Sie ihn wie folgt installieren:

```sh
npm install --save-dev @wdio/browser-runner
```

### Einrichtung

Um den Browser Runner zu verwenden, müssen Sie eine `runner`-Eigenschaft in Ihrer `wdio.conf.js`-Datei definieren, z.B.:

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

Wenn Sie Komponenten mit einem der oben genannten Frameworks testen, können Sie ein Preset definieren, das sicherstellt, dass alles von Anfang an konfiguriert ist. Diese Option kann nicht zusammen mit `viteConfig` verwendet werden.

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

Definieren Sie Ihre eigene [Vite-Konfiguration](https://vitejs.dev/config/). Sie können entweder ein benutzerdefiniertes Objekt übergeben oder eine bestehende `vite.conf.ts`-Datei importieren, wenn Sie Vite.js für die Entwicklung verwenden. Beachten Sie, dass WebdriverIO benutzerdefinierte Vite-Konfigurationen beibehält, um die Testumgebung einzurichten.

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
    // die Sie nur auflösen möchten, wenn der Wert gelesen wird
    runner: ['browser', {
        viteConfig: () => ({
            // ...
        })
    }],
    // ...
}
```

#### `headless`

Wenn auf `true` gesetzt, aktualisiert der Runner die Capabilities, um Tests im Headless-Modus auszuführen. Standardmäßig ist dies in CI-Umgebungen aktiviert, in denen eine `CI`-Umgebungsvariable auf `'1'` oder `'true'` gesetzt ist.

__Typ:__ `boolean`<br />
__Standard:__ `false`, auf `true` gesetzt, wenn die `CI`-Umgebungsvariable gesetzt ist

#### `rootDir`

Projektstammverzeichnis.

__Typ:__ `string`<br />
__Standard:__ `process.cwd()`

#### `coverage`

WebdriverIO unterstützt die Berichterstattung über Testabdeckung durch [`istanbul`](https://istanbul.js.org/). Weitere Details finden Sie unter [Coverage-Optionen](#coverage-options).

__Typ:__ `object`<br />
__Standard:__ `undefined`

### Coverage-Optionen

Die folgenden Optionen ermöglichen die Konfiguration der Coverage-Berichterstattung.

#### `enabled`

Aktiviert die Coverage-Erfassung.

__Typ:__ `boolean`<br />
__Standard:__ `false`

#### `include`

Liste der in die Coverage eingeschlossenen Dateien als Glob-Muster.

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

Liste der Dateierweiterungen, die der Bericht enthalten sollte.

__Typ:__ `string | string[]`<br />
__Standard:__ `['.js', '.cjs', '.mjs', '.ts', '.mts', '.cts', '.tsx', '.jsx', '.vue', '.svelte']`

#### `reportsDirectory`

Verzeichnis, in das der Coverage-Bericht geschrieben werden soll.

__Typ:__ `string`<br />
__Standard:__ `./coverage`

#### `reporter`

Zu verwendende Coverage-Reporter. Siehe [istanbul-Dokumentation](https://istanbul.js.org/docs/advanced/alternative-reporters/) für eine detaillierte Liste aller Reporter.

__Typ:__ `string[]`<br />
__Standard:__ `['text', 'html', 'clover', 'json-summary']`

#### `perFile`

Überprüft Schwellenwerte pro Datei. Siehe `lines`, `functions`, `branches` und `statements` für die tatsächlichen Schwellenwerte.

__Typ:__ `boolean`<br />
__Standard:__ `false`

#### `clean`

Bereinigt Coverage-Ergebnisse vor dem Ausführen von Tests.

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

Schwellenwert für Branches.

__Typ:__ `number`<br />
__Standard:__ `undefined`

#### `statements`

Schwellenwert für Anweisungen.

__Typ:__ `number`<br />
__Standard:__ `undefined`

### Einschränkungen

Bei der Verwendung des WebdriverIO Browser Runners ist es wichtig zu beachten, dass Thread-blockierende Dialoge wie `alert` oder `confirm` nicht nativ verwendet werden können. Dies liegt daran, dass sie die Webseite blockieren, was bedeutet, dass WebdriverIO nicht weiter mit der Seite kommunizieren kann, was dazu führt, dass die Ausführung hängen bleibt.

In solchen Situationen stellt WebdriverIO Standard-Mocks mit Standardrückgabewerten für diese APIs bereit. Dies stellt sicher, dass, wenn der Benutzer versehentlich synchrone Popup-Web-APIs verwendet, die Ausführung nicht hängen bleibt. Es wird jedoch empfohlen, dass der Benutzer diese Web-APIs für eine bessere Erfahrung mockt. Lesen Sie mehr unter [Mocking](/docs/component-testing/mocking).

### Beispiele

Schauen Sie sich unbedingt die Dokumentation zum [Komponententesting](https://webdriver.io/docs/component-testing) an und werfen Sie einen Blick in das [Beispiel-Repository](https://github.com/webdriverio/component-testing-examples) für Beispiele, die diese und verschiedene andere Frameworks verwenden.