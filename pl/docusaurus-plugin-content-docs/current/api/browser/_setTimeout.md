---
id: setTimeout
title: setTimeout
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setTimeout.ts
---

Ustawia limity czasu powiązane z bieżącą sesją, długości limitów czasu kontrolują takie 
zachowania jak limity czasu na wstrzykiwanie skryptów, nawigację dokumentu i pobieranie elementów.
Więcej informacji i przykładów znajdziesz w [przewodniku po limitach czasu](https://webdriver.io/docs/timeouts#selenium-timeouts).

:::info

Nie zaleca się ustawiania limitów czasu `implicit`, ponieważ wpływają one na zachowanie WebdriverIO
i mogą powodować błędy w niektórych poleceniach, np. `waitForExist` z odwróconą flagą.

:::

##### Użycie

```js
browser.setTimeout({ implicit, pageLoad, script })
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
      <td><code><var>timeouts</var></code></td>
      <td>`Timeouts`</td>
      <td>Obiekt zawierający wartości limitów czasu sesji</td>
    </tr>
    <tr>
      <td><code><var>timeouts.implicit</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`Number`</td>
      <td>Czas w milisekundach na ponowienie strategii lokalizacji elementu podczas wyszukiwania elementu.</td>
    </tr>
    <tr>
      <td><code><var>timeouts.pageLoad</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`Number`</td>
      <td>Czas w milisekundach na oczekiwanie na zakończenie ładowania dokumentu.</td>
    </tr>
    <tr>
      <td><code><var>timeouts.script</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`Number`</td>
      <td>Skrypty wstrzyknięte za pomocą [`execute`](https://webdriver.io/docs/api/browser/execute) lub [`executeAsync`](https://webdriver.io/docs/api/browser/executeAsync) będą działać do czasu osiągnięcia limitu czasu skryptu, który również jest podany w milisekundach.</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js title="setTimeout.js"
it('should change timeout duration for session with long code duration', async () => {
    await browser.setTimeout({
        'pageLoad': 10000,
        'script': 60000
    });
    // Execute code which takes a long time
    await browser.executeAsync((done) => {
        console.log('Wake me up before you go!');
        setTimeout(done, 59000);
    });
});
```