---
id: execute
title: execute
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/execute.ts
---

Wstrzykuje fragment kodu JavaScript do strony w celu wykonania go w kontekście aktualnie wybranej
ramki, używając danego elementu jako zakresu. Ponieważ jest to w zakresie elementu, oznacza to, że WebdriverIO
automatycznie poczeka na istnienie elementu przed wykonaniem skryptu.
Zakłada się, że wykonywany skrypt jest synchroniczny, a wynik oceny skryptu jest zwracany do
klienta.

Argument script definiuje skrypt do wykonania w formie ciała funkcji. Wartość zwrócona przez
tę funkcję zostanie zwrócona do klienta. Funkcja zostanie wywołana z dostarczonym tablicą args,
a wartości można uzyskać poprzez obiekt arguments w określonej kolejności.

Argumenty mogą być dowolnymi prymitywami JSON, tablicami lub obiektami JSON. Obiekty JSON definiujące referencję
WebElement zostaną przekonwertowane na odpowiedni element DOM. Podobnie, każdy WebElement w wyniku
skryptu zostanie zwrócony do klienta jako obiekt JSON WebElement.

##### Użycie

```js
$(selector).execute(script, arguments)
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
      <td><code><var>arguments</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`*`</td>
      <td>argumenty skryptu</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js title="execute.js"
it('should wait for the element to exist, then executes javascript on the page with the element as first argument', async () => {
    const text = await $('div').execute((elem, a, b, c, d) => {
        return elem.textContent + a + b + c + d
    }, 1, 2, 3, 4);
    // node.js context - client and console are available
    console.log(text); // outputs "Hello World1234"
});
```

##### Zwraca

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              Wynik skryptu.