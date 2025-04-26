---
id: debugging
title: Debugging
---

Debugging ist deutlich schwieriger, wenn mehrere Prozesse Dutzende von Tests in mehreren Browsern starten.

<iframe width="560" height="315" src="https://www.youtube.com/embed/_bw_VWn5IzU" frameborder="0" allowFullScreen></iframe>

Zunächst ist es äußerst hilfreich, die Parallelität zu begrenzen, indem man `maxInstances` auf `1` setzt und nur die Spezifikationen und Browser anvisiert, die debuggt werden müssen.

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

Ihre Befehlszeilenschnittstelle wechselt auch in den REPL-Modus. Dieser Modus ermöglicht es Ihnen, mit Befehlen und Elementen auf der Seite zu experimentieren. Im REPL-Modus können Sie auf das `browser`-Objekt oder die Funktionen `$` und `$$` zugreifen, wie Sie es in Ihren Tests tun können.

Bei Verwendung von `browser.debug()` müssen Sie wahrscheinlich das Timeout des Testrunners erhöhen, um zu verhindern, dass der Testrunner den Test wegen zu langer Dauer fehlschlagen lässt. Zum Beispiel:

In `wdio.conf`:

```js
jasmineOpts: {
    defaultTimeoutInterval: (24 * 60 * 60 * 1000)
}
```

Weitere Informationen dazu, wie Sie dies mit anderen Frameworks tun können, finden Sie unter [Timeouts](timeouts).

Um nach dem Debugging mit den Tests fortzufahren, verwenden Sie in der Shell die Tastenkombination `^C` oder den Befehl `.exit`.
## Dynamische Konfiguration

Beachten Sie, dass `wdio.conf.js` Javascript enthalten kann. Da Sie wahrscheinlich nicht dauerhaft Ihren Timeout-Wert auf 1 Tag ändern möchten, kann es oft hilfreich sein, diese Einstellungen über eine Umgebungsvariable von der Befehlszeile aus zu ändern.

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

Sie können dann den `wdio`-Befehl mit dem `debug`-Flag voranstellen:

```
$ DEBUG=true npx wdio wdio.conf.js --spec ./tests/e2e/myspec.test.js
```

...und debuggen Sie Ihre Spec-Datei mit den DevTools!

## Debugging mit Visual Studio Code (VSCode)

Wenn Sie Ihre Tests mit Breakpoints im neuesten VSCode debuggen möchten, haben Sie zwei Möglichkeiten, den Debugger zu starten, wobei Option 1 die einfachste Methode ist:
 1. automatisches Anhängen des Debuggers
 2. Anhängen des Debuggers über eine Konfigurationsdatei

### VSCode Toggle Auto Attach

Sie können den Debugger automatisch anhängen, indem Sie diese Schritte in VSCode ausführen:
 - Drücken Sie CMD + Shift + P (Linux und Macos) oder CTRL + Shift + P (Windows)
 - Geben Sie "attach" in das Eingabefeld ein
 - Wählen Sie "Debug: Toggle Auto Attach"
 - Wählen Sie "Only With Flag"

 Das war's! Wenn Sie jetzt Ihre Tests ausführen (denken Sie daran, dass Sie das Flag --inspect in Ihrer Konfiguration setzen müssen, wie zuvor gezeigt), wird der Debugger automatisch gestartet und beim ersten Breakpoint angehalten.

### VSCode Konfigurationsdatei

Es ist möglich, alle oder ausgewählte Spec-Datei(en) auszuführen. Debug-Konfiguration(en) müssen zu `.vscode/launch.json` hinzugefügt werden. Um eine ausgewählte Spec zu debuggen, fügen Sie die folgende Konfiguration hinzu:
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

Zusätzliche Informationen: https://code.visualstudio.com/docs/nodejs/nodejs-debugging

## Dynamisches Repl mit Atom

Wenn Sie ein [Atom](https://atom.io/)-Hacker sind, können Sie [`wdio-repl`](https://github.com/kurtharriger/wdio-repl) von [@kurtharriger](https://github.com/kurtharriger) ausprobieren, was ein dynamisches Repl ist, mit dem Sie einzelne Codezeilen in Atom ausführen können. Schauen Sie sich [dieses](https://www.youtube.com/watch?v=kdM05ChhLQE) YouTube-Video an, um eine Demo zu sehen.

## Debugging mit WebStorm / Intellij
Sie können eine node.js-Debug-Konfiguration wie folgt erstellen:
![Screenshot from 2021-05-29 17-33-33](https://user-images.githubusercontent.com/18728354/120088460-81844c00-c0a5-11eb-916b-50f21c8472a8.png)
Schauen Sie sich dieses [YouTube-Video](https://www.youtube.com/watch?v=Qcqnmle6Wu8) für weitere Informationen darüber an, wie Sie eine Konfiguration erstellen können.

## Debugging von instabilen Tests

Instabile Tests können wirklich schwer zu debuggen sein. Hier sind einige Tipps, wie Sie versuchen können, das instabile Ergebnis, das Sie in Ihrer CI erhalten haben, lokal zu reproduzieren.

### Netzwerk
Um netzwerkbezogene Instabilität zu debuggen, verwenden Sie den Befehl [throttleNetwork](https://webdriver.io/docs/api/browser/throttleNetwork).
```js
await browser.throttleNetwork('Regular3G')
```

### Rendering-Geschwindigkeit
Um gerätebezogene Instabilität zu debuggen, verwenden Sie den Befehl [throttleCPU](https://webdriver.io/docs/api/browser/throttleCPU).
Dies führt dazu, dass Ihre Seiten langsamer gerendert werden, was durch viele Dinge verursacht werden kann, wie z.B. das Ausführen mehrerer Prozesse in Ihrer CI, die Ihre Tests verlangsamen könnten.
```js
await browser.throttleCPU(4)
```

### Testausführungsgeschwindigkeit

Wenn Ihre Tests nicht betroffen zu sein scheinen, ist es möglich, dass WebdriverIO schneller ist als das Update vom Frontend-Framework / Browser. Dies geschieht, wenn synchrone Assertions verwendet werden, da WebdriverIO keine Möglichkeit mehr hat, diese Assertions erneut zu versuchen. Einige Beispiele für Code, der deswegen fehlschlagen kann:
```js
expect(elementList.length).toEqual(7) // Liste ist möglicherweise zum Zeitpunkt der Assertion noch nicht gefüllt
expect(await elem.getText()).toEqual('this button was clicked 3 times') // Text ist möglicherweise zum Zeitpunkt der Assertion noch nicht aktualisiert, was zu einem Fehler führt ("this button was clicked 2 times" stimmt nicht mit dem erwarteten "this button was clicked 3 times" überein)
expect(await elem.isDisplayed()).toBe(true) // wird möglicherweise noch nicht angezeigt
```
Um dieses Problem zu lösen, sollten stattdessen asynchrone Assertions verwendet werden. Die obigen Beispiele würden so aussehen:
```js
await expect(elementList).toBeElementsArrayOfSize(7)
await expect(elem).toHaveText('this button was clicked 3 times')
await expect(elem).toBeDisplayed()
```
Bei Verwendung dieser Assertions wartet WebdriverIO automatisch, bis die Bedingung erfüllt ist. Bei der Überprüfung von Text bedeutet dies, dass das Element existieren muss und der Text dem erwarteten Wert entsprechen muss.
Wir sprechen mehr darüber in unserem [Best Practices Guide](https://webdriver.io/docs/bestpractices#use-the-built-in-assertions).