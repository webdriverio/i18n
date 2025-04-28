---
id: executeAsync
title: executeAsync
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/executeAsync.ts
---

:::warning
Komenda `executeAsync` jest przestarzała i zostanie usunięta w przyszłej wersji.
Proszę używać komendy `execute`, ponieważ zapewnia lepszą obsługę 
błędów poprzez `async`/`await`.
:::

Wstrzykuje fragment kodu JavaScript do strony w celu wykonania w kontekście aktualnie wybranej
ramki, używając danego elementu jako zakresu. Ponieważ komenda działa w zakresie elementu, WebdriverIO
automatycznie poczeka na istnienie elementu przed wykonaniem skryptu.
Wykonywany skrypt jest traktowany jako asynchroniczny i musi zasygnalizować zakończenie przez wywołanie
dostarczonego wywołania zwrotnego (callback), które zawsze jest dostarczane jako ostatni argument funkcji. Wartość
przekazana do tego wywołania zwrotnego zostanie zwrócona do klienta.

Asynchroniczne komendy skryptowe nie mogą obejmować przeładowań strony. Jeśli zdarzenie wyładowania zostanie wywołane podczas oczekiwania
na wynik skryptu, klientowi powinien zostać zwrócony błąd.

Argument skryptu definiuje skrypt do wykonania w postaci treści funkcji. Funkcja zostanie
wywołana z podaną tablicą argumentów, a wartości mogą być dostępne przez obiekt arguments
w określonej kolejności. Ostatnim argumentem zawsze będzie funkcja wywołania zwrotnego, która musi zostać wywołana,
aby zasygnalizować, że skrypt zakończył działanie.

Argumenty mogą być dowolnymi prymitywami JSON, tablicami lub obiektami JSON. Obiekty JSON, które definiują referencję WebElement,
zostaną przekonwertowane na odpowiedni element DOM. Podobnie, wszelkie elementy WebElements w wyniku
skryptu zostaną zwrócone do klienta jako obiekty JSON WebElement.

:::caution

Proszę używać `execute` zamiast tej metody
:::

##### Użycie

```js
$(selector).executeAsync(script, arguments)
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
      <td><code><var>arguments</var></code><br /><span className="label labelWarning">opcjonalne</span></td>
      <td>`*`</td>
      <td>argumenty skryptu</td>
    </tr>
  </tbody>
</table>

##### Przykład

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

##### Zwraca

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              Wynik skryptu.