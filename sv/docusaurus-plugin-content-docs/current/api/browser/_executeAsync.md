---
id: executeAsync
title: executeAsync
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/executeAsync.ts
---

:::warning
Kommandot `executeAsync` är föråldrat och kommer att tas bort i en framtida version.
Använd istället kommandot `execute` eftersom det ger bättre stöd för 
felhantering via `async`/`await`.
:::

Injicera ett JavaScript-fragment i sidan för exekvering i kontexten av den för närvarande valda
ramen. Det exekverade skriptet antas vara asynkront och måste signalera att det är klart genom att anropa
den tillhandahållna återanropsfunktionen, som alltid tillhandahålls som det sista argumentet till funktionen. Värdet
till denna återanropsfunktion kommer att returneras till klienten.

Asynkrona skriptkommandon får inte sträcka sig över sidladdningar. Om en urladdningshändelse utlöses medan man väntar
på ett skriptresultat, bör ett fel returneras till klienten.

Skriptargumentet definierar skriptet som ska exekveras i form av en funktionskropp. Funktionen kommer
att anropas med den tillhandahållna args-arrayen och värdena kan nås via arguments-objektet
i den angivna ordningen. Det sista argumentet kommer alltid att vara en återanropsfunktion som måste anropas
för att signalera att skriptet har avslutats.

Argument kan vara vilken JSON-primitiv, array eller JSON-objekt som helst. JSON-objekt som definierar en WebElement-
referens kommer att konverteras till motsvarande DOM-element. På samma sätt kommer alla WebElements i skriptets
resultat att returneras till klienten som WebElement JSON-objekt.

:::caution

Vänligen använd `execute` istället
:::

##### Användning

```js
browser.executeAsync(script, arguments)
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

```js title="executeAsync.js"
it('should execute async JavaScript on the page', async () => {
    await browser.setTimeout({ script: 5000 })
    const result = await browser.executeAsync(function(a, b, c, d, done) {
        // browser context - you may not access client or console
        setTimeout(() => {
            done(a + b + c + d)
        }, 3000);
    }, 1, 2, 3, 4)
    // node.js context - client and console are available
    console.log(result) // outputs: 10
});
```

##### Returnerar

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              Skriptresultatet.