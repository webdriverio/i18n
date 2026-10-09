---
id: debugging
title: Debugging
description: "Debuggen Sie WebdriverIO-Tests mit browser.debug, Breakpoints in VS Code oder WebStorm, Strategien für instabile Tests sowie CPU- und Heap-Profiling."
---

Debugging ist deutlich schwieriger, wenn mehrere Prozesse Dutzende von Tests in mehreren Browsern starten.

<iframe width="560" height="315" src="https://www.youtube.com/embed/_bw_VWn5IzU" frameborder="0" allowFullScreen></iframe>

Zunächst ist es äußerst hilfreich, die Parallelität zu begrenzen, indem Sie `maxInstances` auf `1` setzen und nur die Specs und Browser auswählen, die debuggt werden müssen.

In `wdio.conf`:

```js
export const config = {
    // ...
    maxInstances: 1,
    specs: [
        '**/myspec.spec.js'
    ],
    capabilities: [{
        browserName: 'firefox'
    }],
    // ...
}
```

## Der Debug-Befehl

In vielen Fällen können Sie [`browser.debug()`](/docs/api/browser/debug) verwenden, um Ihren Test anzuhalten und den Browser zu untersuchen.

Ihre Kommandozeile wechselt außerdem in den REPL-Modus. In diesem Modus können Sie mit Befehlen und Elementen auf der Seite herumexperimentieren. Im REPL-Modus können Sie auf das `browser`-Objekt&mdash;oder die Funktionen `$` und `$$`&mdash;genauso zugreifen wie in Ihren Tests.

Wenn Sie `browser.debug()` verwenden, müssen Sie wahrscheinlich das Timeout des Test-Runners erhöhen, damit der Test-Runner den Test nicht wegen zu langer Laufzeit fehlschlagen lässt. Zum Beispiel:

In `wdio.conf`:

```js
jasmineOpts: {
    defaultTimeoutInterval: (24 * 60 * 60 * 1000)
}
```

Weitere Informationen dazu, wie Sie dies mit anderen Frameworks umsetzen, finden Sie unter [Timeouts](timeouts).

Um nach dem Debuggen mit den Tests fortzufahren, verwenden Sie in der Shell die Tastenkombination `^C` oder den Befehl `.exit`.

### Pausieren für einen Coding-Agenten (`--debug=agent`)

`wdio run --debug=agent` erhöht das Framework-Timeout auf 24 Stunden und pausiert den Worker, wenn eine Spec `await browser.debug()` aufruft oder wenn ein Test fehlschlägt. Der Lauf gibt eine Zeile wie diese aus:

```text
Paused in cart.e2e.ts › adds a blue t-shirt. Inspect with `wdio session -s debug-0-0 snapshot`, continue with `wdio session -s debug-0-0 resume`.
```

Untersuchen Sie den pausierten Browser mit [`wdio session`](/docs/session/debug) (`snapshot`, `exec`, …) und verwenden Sie anschließend `wdio session -s debug-0-0 resume`, um fortzufahren. `wdio session -s debug-0-0 close` lässt den pausierten Test mit `Session closed from wdio session` fehlschlagen. Der Sitzungsname lautet `debug-<cid>` (`debug-0-0` für den ersten Worker). Der Rest dieses Workflows ist im Abschnitt [WebdriverIO Session](/docs/session) beschrieben.
## Dynamische Konfiguration

Beachten Sie, dass `wdio.conf.js` JavaScript enthalten kann. Da Sie Ihren Timeout-Wert wahrscheinlich nicht dauerhaft auf 1 Tag ändern möchten, kann es oft hilfreich sein, diese Einstellungen über die Kommandozeile mithilfe einer Umgebungsvariable zu ändern.

Mit dieser Technik können Sie die Konfiguration dynamisch ändern:

```js
const debug = process.env.DEBUG
const defaultCapabilities = ...
const defaultTimeoutInterval = ...
const defaultSpecs = ...

export const config = {
    // ...
    maxInstances: debug ? 1 : 100,
    capabilities: debug ? [{ browserName: 'chrome' }] : defaultCapabilities,
    execArgv: debug ? ['--inspect'] : [],
    jasmineOpts: {
      defaultTimeoutInterval: debug ? (24 * 60 * 60 * 1000) : defaultTimeoutInterval
    }
    // ...
}
```

Sie können dem `wdio`-Befehl dann das `debug`-Flag voranstellen:

```
$ DEBUG=true npx wdio wdio.conf.js --spec ./tests/e2e/myspec.test.js
```

...und Ihre Spec-Datei mit den DevTools debuggen!

## Debugging mit Visual Studio Code (VSCode)

Wenn Sie Ihre Tests mit Breakpoints im aktuellen VSCode debuggen möchten, haben Sie zwei Möglichkeiten, den Debugger zu starten, wobei Option 1 die einfachste Methode ist:
 1. automatisches Anhängen des Debuggers
 2. Anhängen des Debuggers über eine Konfigurationsdatei

### VSCode Toggle Auto Attach

Sie können den Debugger automatisch anhängen, indem Sie in VSCode die folgenden Schritte ausführen:
 - Drücken Sie CMD + Shift + P (Linux und macOS) oder CTRL + Shift + P (Windows)
 - Geben Sie "attach" in das Eingabefeld ein
 - Wählen Sie "Debug: Toggle Auto Attach"
 - Wählen Sie "Only With Flag"

 Das war's! Wenn Sie jetzt Ihre Tests ausführen (denken Sie daran, dass das --inspect-Flag wie zuvor gezeigt in Ihrer Konfiguration gesetzt sein muss), wird der Debugger automatisch gestartet und hält beim ersten erreichten Breakpoint an.

### VSCode-Konfigurationsdatei

Es ist möglich, alle oder ausgewählte Spec-Dateien auszuführen. Debug-Konfiguration(en) müssen zu `.vscode/launch.json` hinzugefügt werden. Um eine ausgewählte Spec zu debuggen, fügen Sie die folgende Konfiguration hinzu:
```
{
    "name": "run select spec",
    "type": "node",
    "request": "launch",
    "args": ["wdio.conf.js", "--spec", "${file}"],
    "cwd": "${workspaceFolder}",
    "autoAttachChildProcesses": true,
    "program": "${workspaceRoot}/node_modules/@wdio/cli/bin/wdio.js",
    "console": "integratedTerminal",
    "skipFiles": [
        "${workspaceFolder}/node_modules/**/*.js",
        "${workspaceFolder}/lib/**/*.js",
        "<node_internals>/**/*.js"
    ]
},
```

Um alle Spec-Dateien auszuführen, entfernen Sie `"--spec", "${file}"` aus `"args"`

Beispiel: [.vscode/launch.json](https://github.com/mgrybyk/webdriverio-devtools/blob/master/.vscode/launch.json)

Weitere Informationen: https://code.visualstudio.com/docs/nodejs/nodejs-debugging

## Dynamische REPL mit Atom

Wenn Sie ein [Atom](https://atom.io/)-Hacker sind, können Sie [`wdio-repl`](https://github.com/kurtharriger/wdio-repl) von [@kurtharriger](https://github.com/kurtharriger) ausprobieren. Dabei handelt es sich um eine dynamische REPL, mit der Sie einzelne Codezeilen in Atom ausführen können. Sehen Sie sich [dieses](https://www.youtube.com/watch?v=kdM05ChhLQE) YouTube-Video an, um eine Demo zu sehen.

## Debugging mit WebStorm / IntelliJ
Sie können eine Node.js-Debug-Konfiguration wie diese erstellen:
![Screenshot from 2021-05-29 17-33-33](https://user-images.githubusercontent.com/18728354/120088460-81844c00-c0a5-11eb-916b-50f21c8472a8.png)
Sehen Sie sich dieses [YouTube-Video](https://www.youtube.com/watch?v=Qcqnmle6Wu8) an, um weitere Informationen zum Erstellen einer Konfiguration zu erhalten.

## Debugging instabiler Tests

Instabile (flaky) Tests können sehr schwer zu debuggen sein. Deshalb finden Sie hier einige Tipps, wie Sie versuchen können, das instabile Ergebnis aus Ihrer CI lokal zu reproduzieren.

### Netzwerk
Um netzwerkbedingte Instabilität zu debuggen, verwenden Sie den Befehl [throttleNetwork](https://webdriver.io/docs/api/browser/throttleNetwork).
```js
await browser.throttleNetwork('Regular3G')
```

### Rendering-Geschwindigkeit
Um Instabilität im Zusammenhang mit der Gerätegeschwindigkeit zu debuggen, verwenden Sie den Befehl [throttleCPU](https://webdriver.io/docs/api/browser/throttleCPU).
Dadurch werden Ihre Seiten langsamer gerendert, was viele Ursachen haben kann, z. B. das Ausführen mehrerer Prozesse in Ihrer CI, die Ihre Tests verlangsamen könnten.
```js
await browser.throttleCPU(4)
```

### Geschwindigkeit der Testausführung

Wenn Ihre Tests davon nicht betroffen zu sein scheinen, ist es möglich, dass WebdriverIO schneller ist als die Aktualisierung durch das Frontend-Framework / den Browser. Dies passiert bei der Verwendung synchroner Assertions, da WebdriverIO keine Möglichkeit mehr hat, diese Assertions zu wiederholen. Einige Beispiele für Code, der dadurch fehlschlagen kann:
```js
expect(elementList.length).toEqual(7) // list might not be populated at the time of the assertion
expect(await elem.getText()).toEqual('this button was clicked 3 times') // text might not be updated yet at the time of assertion resulting in an error ("this button was clicked 2 times" does not match the expected "this button was clicked 3 times")
expect(await elem.isDisplayed()).toBe(true) // might not be displayed yet
```
Um dieses Problem zu lösen, sollten stattdessen asynchrone Assertions verwendet werden. Die obigen Beispiele würden dann so aussehen:
```js
await expect(elementList).toBeElementsArrayOfSize(7)
await expect(elem).toHaveText('this button was clicked 3 times')
await expect(elem).toBeDisplayed()
```
Mit diesen Assertions wartet WebdriverIO automatisch, bis die Bedingung erfüllt ist. Beim Prüfen von Text bedeutet das, dass das Element existieren muss und der Text dem erwarteten Wert entsprechen muss.
Mehr dazu erfahren Sie in unserem [Best Practices Guide](https://webdriver.io/docs/bestpractices#use-the-built-in-assertions).

## Performance-Profiling

WebdriverIO ermöglicht es Ihnen, Performance-Profile Ihrer Tests zu erfassen, um Engpässe bei der Testausführung oder Speicherlecks zu identifizieren. Dabei werden die nativen Profiling-Funktionen von Node.js verwendet.

### CPU-Profiling

Um ein CPU-Profil zu erfassen, können Sie das CLI-Flag `--cpu-prof` verwenden oder `cpuProf: true` in Ihrer Konfiguration setzen.

```bash
npx wdio run wdio.conf.js --cpu-prof
```

Dadurch wird für jeden Worker-Prozess eine `.cpuprofile`-Datei im Verzeichnis `./profiles` (Standard) erzeugt. Sie können diese Datei in **Chrome DevTools > Performance > Load Profile** laden, um die Ausführung zu analysieren.

### Heap-Profiling

Um ein Heap-Profil zu erfassen, verwenden Sie das CLI-Flag `--heap-prof` oder setzen Sie `heapProf: true` in Ihrer Konfiguration.

```bash
npx wdio run wdio.conf.js --heap-prof
```

Dadurch wird eine `.heapprofile`-Datei im Verzeichnis `./profiles` erzeugt (verwendet den Sampling-Heap-Profiler). Sie können diese in **Chrome DevTools > Memory > Load** laden, um die Speichernutzung zu analysieren.

### Timing-Metriken

Wenn Profiling aktiviert ist, protokolliert WebdriverIO außerdem automatisch Timing-Metriken für die Setup-, Ausführungs- und Teardown-Phasen Ihres Tests. So können Sie nachvollziehen, wofür Zeit aufgewendet wird.

```
📊 Performance Metrics:
────────────────────────────────────────
  Setup:     1.25s
  Execution: 3.42s
  Teardown:  0.15s
```