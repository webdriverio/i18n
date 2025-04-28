---
id: executeAsync
title: executeAsync
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/executeAsync.ts
---

:::warning
Kommandot `executeAsync` är föråldrat och kommer att tas bort i en framtida version.
Använd istället kommandot `execute` eftersom det ger bättre stöd för
felhantering via `async`/`await`.
:::

Injicera ett JavaScript-kodsegment på sidan för exekvering i kontexten av den aktuellt valda
ramen med det givna elementet som omfattning. Eftersom det är inom elementets omfattning innebär det att WebdriverIO
automatiskt kommer att vänta på att elementet existerar innan skriptet körs.
Det exekverade skriptet antas vara asynkront och måste signalera att det är klart genom att anropa
den tillhandahållna callback-funktionen, som alltid tillhandahålls som det sista argumentet till funktionen. Värdet
till denna callback kommer att returneras till klienten.

Asynkrona skriptkommandon får inte sträcka sig över sidladdningar. Om en unload-händelse utlöses medan man väntar
på ett skriptresultat, bör ett fel returneras till klienten.

Skriptargumentet definierar det skript som ska köras i form av en funktionskropp. Funktionen kommer
att anropas med den angivna args-arrayen och värdena kan nås via arguments-objektet
i den angivna ordningen. Det sista argumentet kommer alltid att vara en callback-funktion som måste anropas
för att signalera att skriptet har avslutats.

Argument kan vara vilken JSON-primitiv, array eller JSON-objekt som helst. JSON-objekt som definierar en WebElement-
referens kommer att konverteras till motsvarande DOM-element. På samma sätt kommer alla WebElements i skript-
resultatet att returneras till klienten som WebElement JSON-objekt.

:::caution

Använd `execute` istället
:::

##### Användning

```js
$(selector).executeAsync(script, arguments)
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

##### Returnerar

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              Skriptresultatet.