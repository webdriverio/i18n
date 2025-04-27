---
id: executeAsync
title: executeAsync
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/executeAsync.ts
---

:::warning
Der Befehl `executeAsync` ist veraltet und wird in einer zukünftigen Version entfernt.
Bitte verwenden Sie stattdessen den Befehl `execute`, da er eine bessere Unterstützung für
Fehlerbehandlung über `async`/`await` bietet.
:::

Injiziert ein JavaScript-Snippet in die Seite zur Ausführung im Kontext des aktuell ausgewählten
Frames, wobei das angegebene Element als Geltungsbereich verwendet wird. Da es sich im Elementbereich befindet, bedeutet dies, dass WebdriverIO
automatisch darauf wartet, dass das Element existiert, bevor das Skript ausgeführt wird.
Das ausgeführte Skript wird als asynchron angenommen und muss signalisieren, dass es abgeschlossen ist, indem es
den bereitgestellten Callback aufruft, der immer als letztes Argument an die Funktion übergeben wird. Der Wert
dieses Callbacks wird an den Client zurückgegeben.

Asynchrone Skriptbefehle dürfen keine Seitenladungen umfassen. Wenn ein Unload-Ereignis ausgelöst wird, während auf ein
Skriptergebnis gewartet wird, sollte ein Fehler an den Client zurückgegeben werden.

Das Skriptargument definiert das auszuführende Skript in Form eines Funktionskörpers. Die Funktion wird
mit dem bereitgestellten args-Array aufgerufen, und auf die Werte kann über das arguments-Objekt
in der angegebenen Reihenfolge zugegriffen werden. Das letzte Argument ist immer eine Callback-Funktion, die aufgerufen werden muss,
um zu signalisieren, dass das Skript abgeschlossen ist.

Argumente können beliebige JSON-Primitive, Arrays oder JSON-Objekte sein. JSON-Objekte, die eine WebElement-Referenz
definieren, werden in das entsprechende DOM-Element konvertiert. Ebenso werden alle WebElements im Skriptergebnis
als WebElement-JSON-Objekte an den Client zurückgegeben.

:::caution

Bitte verwenden Sie stattdessen `execute`
:::

##### Verwendung

```js
$(selector).executeAsync(script, arguments)
```

##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>script</var></code></td>
      <td>`String, Function`</td>
      <td>Das auszuführende Skript.</td>
    </tr>
    <tr>
      <td><code><var>arguments</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`*`</td>
      <td>Skriptargumente</td>
    </tr>
  </tbody>
</table>

##### Beispiel

```js title="executeAsync.js"
it('should wait for the element to exist, then executes async javascript on the page with the element as first argument', async () => {
    await browser.setTimeout({ script: 5000 })
    const text = await $('div').execute((elem, a, b, c, d) => {
        // browser context - you may not access client or console
        setTimeout(() => {
            done(elem.textContent + a + b + c + d)
        }, 3000);
    }, 1, 2, 3, 4);
    // node.js context - client and console are available
    // node.js context - client and console are available
    console.log(text); // outputs "Hello World1234"
});
```

##### Gibt zurück

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              Das Skriptergebnis.
