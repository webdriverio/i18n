---
id: executeAsync
title: executeAsync
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/executeAsync.ts
---

:::warning
Komenda `executeAsync` jest przestarzała i zostanie usunięta w przyszłej wersji.
Proszę używać zamiast tego komendy `execute`, ponieważ zapewnia ona lepszą obsługę
błędów poprzez `async`/`await`.
:::

Wstrzykuje fragment kodu JavaScript na stronę do wykonania w kontekście aktualnie wybranej
ramki. Zakłada się, że wykonywany skrypt jest asynchroniczny i musi zasygnalizować zakończenie poprzez wywołanie
dostarczonej funkcji zwrotnej (callback), która jest zawsze dostarczana jako ostatni argument do funkcji. Wartość
przekazana do tej funkcji zwrotnej zostanie zwrócona do klienta.

Komendy skryptów asynchronicznych nie mogą obejmować przeładowań strony. Jeśli podczas oczekiwania
na wynik skryptu zostanie uruchomione zdarzenie unload, powinien zostać zwrócony błąd do klienta.

Argument skryptu definiuje skrypt do wykonania w postaci treści funkcji. Funkcja zostanie
wywołana z dostarczoną tablicą argumentów, a wartości mogą być dostępne przez obiekt arguments
w określonej kolejności. Ostatnim argumentem zawsze będzie funkcja zwrotna, która musi zostać wywołana,
aby zasygnalizować, że skrypt został zakończony.

Argumenty mogą być dowolnymi prymitywami JSON, tablicami lub obiektami JSON. Obiekty JSON definiujące odniesienie
WebElement zostaną przekonwertowane na odpowiedni element DOM. Podobnie, wszystkie WebElements w wyniku
skryptu zostaną zwrócone do klienta jako obiekty JSON WebElement.

:::caution

Proszę używać zamiast tego `execute`
:::

##### Użycie

```js
browser.executeAsync(script, arguments)
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

##### Zwraca

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              Wynik skryptu.