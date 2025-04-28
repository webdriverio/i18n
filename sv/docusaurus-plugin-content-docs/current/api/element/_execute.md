---
id: execute
title: execute
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/execute.ts
---

Injicera ett kodavsnitt av JavaScript i sidan för exekvering i kontexten av den för närvarande valda
ramen med det givna elementet som omfattning, eftersom det är inom elementets omfattning betyder det att WebdriverIO
automatiskt kommer att vänta på att elementet existerar innan skriptet körs.
Det exekverade skriptet förutsätts vara synkront och resultatet av att utvärdera skriptet returneras till
klienten.

Scriptargumentet definierar skriptet som ska köras i form av en funktionskropp. Värdet som returneras av
den funktionen kommer att returneras till klienten. Funktionen kommer att anropas med den tillhandahållna args-arrayen
och värdena kan nås via arguments-objektet i den angivna ordningen.

Argument kan vara vilken JSON-primitiv, array eller JSON-objekt som helst. JSON-objekt som definierar en WebElement-
referens kommer att konverteras till motsvarande DOM-element. På samma sätt kommer alla WebElements i skriptets
resultat att returneras till klienten som WebElement JSON-objekt.

##### Användning

```js
$(selector).execute(script, arguments)
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
      <td>Skriptet som ska köras.</td>
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
it('should wait for the element to exist, then executes javascript on the page with the element as first argument', async () => {
    const text = await $('div').execute((elem, a, b, c, d) => {
        return elem.textContent + a + b + c + d
    }, 1, 2, 3, 4);
    // node.js context - client and console are available
    console.log(text); // outputs "Hello World1234"
});
```

##### Returnerar

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              Skriptresultatet.