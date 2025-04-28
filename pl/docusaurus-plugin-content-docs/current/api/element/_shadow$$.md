---
id: shadow$$
title: shadow$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/shadow$$.ts
---

Dostęp do elementów wewnątrz shadowRoot danego elementu. Jeśli pracujesz
z wieloma zagnieżdżonymi shadow rootami, alternatywnym podejściem do `shadow$$`
jest użycie [selektora deep](https://webdriver.io/docs/selectors#deep-selectors).

:::info

WebdriverIO automatycznie przechodzi przez shadow rooty przy użyciu poleceń `$` lub `$$`.
To polecenie jest potrzebne tylko wtedy, gdy automatyzujesz w środowisku, które nie
obsługuje jeszcze WebDriver Bidi, np. testowanie mobilnej wersji stron internetowych z Appium.

:::

##### Użycie

```js
$(selector).shadow$$(selector)
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
it('should return elements inside a shadowRoot', async () => {
    const innerEl = await $('.input').shadow$$('#innerEl');
    console.log(await innerEl.getValue()); // outputs: 'test123'
});
```

##### Zwraca

- **&lt;WebdriverIO.ElementArray&gt;**