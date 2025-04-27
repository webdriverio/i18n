---
id: execute
title: execute
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/execute.ts
---

Injiziert ein JavaScript-Snippet in die Seite zur Ausführung im Kontext des aktuell ausgewählten
Frames, wobei das angegebene Element als Gültigkeitsbereich verwendet wird. Da es sich im Gültigkeitsbereich des Elements befindet, bedeutet dies, dass WebdriverIO
automatisch darauf wartet, dass das Element existiert, bevor das Skript ausgeführt wird.
Das ausgeführte Skript wird als synchron angenommen, und das Ergebnis der Auswertung des Skripts wird an
den Client zurückgegeben.

Das Skriptargument definiert das auszuführende Skript in Form eines Funktionskörpers. Der von
dieser Funktion zurückgegebene Wert wird an den Client zurückgegeben. Die Funktion wird mit dem angegebenen Args-Array
aufgerufen, und auf die Werte kann über das Arguments-Objekt in der angegebenen Reihenfolge zugegriffen werden.

Argumente können ein JSON-Primitiv, Array oder JSON-Objekt sein. JSON-Objekte, die eine WebElement-
Referenz definieren, werden in das entsprechende DOM-Element konvertiert. Ebenso werden alle WebElements im Skript-
Ergebnis als WebElement-JSON-Objekte an den Client zurückgegeben.

##### Usage

```js
$(selector).execute(script, arguments)
```

##### Parameters

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

##### Example

```js title="execute.js"
it('should wait for the element to exist, then executes javascript on the page with the element as first argument', async () => {
    const text = await $('div').execute((elem, a, b, c, d) => {
        return elem.textContent + a + b + c + d
    }, 1, 2, 3, 4);
    // node.js context - client and console are available
    console.log(text); // outputs "Hello World1234"
});
```

##### Returns

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              Das Skriptergebnis.
