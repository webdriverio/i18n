---
id: execute
title: execute
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/execute.ts
---

Injicera ett JavaScript-fragment i sidan för exekvering i kontexten av den för närvarande valda ramen.
Det exekverade skriptet antas vara synkront och resultatet av att utvärdera skriptet returneras till
klienten.

Skriptargumentet definierar skriptet som ska exekveras i form av en funktionskropp. Värdet som returneras av
den funktionen kommer att returneras till klienten. Funktionen kommer att anropas med den angivna args-arrayen
och värdena kan nås via arguments-objektet i den angivna ordningen.

Argument kan vara vilken JSON-primitiv, array eller JSON-objekt som helst. JSON-objekt som definierar en WebElement-
referens kommer att konverteras till motsvarande DOM-element. På samma sätt kommer alla WebElements i skriptets
resultat att returneras till klienten som WebElement JSON-objekt.

##### Användning

```js
browser.execute(script, arguments)
```

##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>script</var></code></td>
      <td>`String, Function`</td>
      <td>Skriptet som ska exekveras.</td>
    </tr>
    <tr>
      <td><code><var>arguments</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`*`</td>
      <td>skriptargument</td>
    </tr>
  </tbody>
</table>

##### Exempel

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

##### Returnerar

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              Skriptresultatet.