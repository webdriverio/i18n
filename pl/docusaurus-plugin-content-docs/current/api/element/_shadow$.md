---
id: shadow$
title: shadow$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/shadow$.ts
---

Dostęp do elementu wewnątrz shadowRoot danego elementu. Jeśli pracujesz
z wieloma zagnieżdżonymi shadow rootami, alternatywnym podejściem do `shadow$` jest
użycie [selektora głębokiego](https://webdriver.io/docs/selectors#deep-selectors).

:::info

WebdriverIO automatycznie przenika przez shadow rooty przy użyciu poleceń `$` lub `$$`.
To polecenie jest potrzebne tylko wtedy, gdy automatyzacja działa w środowisku, które nie
obsługuje jeszcze WebDriver Bidi, np. testowanie mobilne z Appium.

:::

##### Użycie

```js
$(selector).shadow$(selector)
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
      <td><code><var>selector</var></code></td>
      <td>`String, Function`</td>
      <td>selektor lub funkcja JS do pobrania określonego elementu</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js title="shadow$$.js"
it('should return an element inside a shadowRoot', async () => {
    const innerEl = await $('custom-component').shadow$('#innerEl');
    console.log(await innerEl.getValue()); // outputs: 'test123'
});
```

##### Zwraca

- **&lt;WebdriverIO.Element&gt;**