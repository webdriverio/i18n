---
id: execute
title: execute
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/execute.ts
---

Injiziert ein JavaScript-Snippet in die Seite zur Ausführung im Kontext des aktuell ausgewählten Frames.
Das ausgeführte Skript wird als synchron angenommen, und das Ergebnis der Auswertung des Skripts wird an
den Client zurückgegeben.

Das Skript-Argument definiert das auszuführende Skript in Form eines Funktionskörpers. Der von dieser
Funktion zurückgegebene Wert wird an den Client zurückgegeben. Die Funktion wird mit dem bereitgestellten
args-Array aufgerufen, und auf die Werte kann über das arguments-Objekt in der angegebenen Reihenfolge zugegriffen werden.

Argumente können beliebige JSON-Primitive, Arrays oder JSON-Objekte sein. JSON-Objekte, die eine WebElement-
Referenz definieren, werden in das entsprechende DOM-Element konvertiert. Ebenso werden alle WebElements im Skript-
Ergebnis als WebElement-JSON-Objekte an den Client zurückgegeben.

##### Usage

```js
browser.execute(script, arguments)
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
      <td>Skript-Argumente</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="execute.js"
it('should inject javascript on the page', async () => {
    const result = await browser.execute((a, b, c, d) => {
        // browser context - you may not access client or console
        return a + b + c + d
    }, 1, 2, 3, 4)
    // node.js context - client and console are available
    console.log(result) // outputs: 10
});
```

##### Returns

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              Das Skript-Ergebnis.
