---
id: execute
title: execute
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/execute.ts
---

Wprowadź fragment JavaScript na stronę do wykonania w kontekście aktualnie wybranej ramki.
Wykonywany skrypt jest uznawany za synchroniczny, a wynik ewaluacji skryptu jest zwracany do
klienta.

Argument script definiuje skrypt do wykonania w formie ciała funkcji. Wartość zwrócona przez
tę funkcję zostanie zwrócona do klienta. Funkcja zostanie wywołana z dostarczonym tablicą args,
a wartości mogą być dostępne za pośrednictwem obiektu arguments w określonej kolejności.

Argumenty mogą być dowolnymi wartościami prymitywnymi JSON, tablicą lub obiektem JSON. Obiekty JSON definiujące odniesienie WebElement
zostaną przekonwertowane na odpowiedni element DOM. Podobnie, wszystkie WebElements w wyniku skryptu
zostaną zwrócone do klienta jako obiekty JSON WebElement.

##### Użycie

```js
browser.execute(script, arguments)
```

##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>script</var></code></td>
      <td>`String, Function`</td>
      <td>Skrypt do wykonania.</td>
    </tr>
    <tr>
      <td><code><var>arguments</var></code><br /><span className="label labelWarning">opcjonalnie</span></td>
      <td>`*`</td>
      <td>argumenty skryptu</td>
    </tr>
  </tbody>
</table>

##### Przykład

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

##### Zwraca

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              Wynik skryptu.