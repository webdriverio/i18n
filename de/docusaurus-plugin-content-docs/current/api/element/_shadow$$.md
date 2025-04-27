---
id: shadow$$
title: shadow$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/shadow$$.ts
---

Greife auf Elemente innerhalb des shadowRoot eines gegebenen Elements zu. Wenn du mit vielen verschachtelten Shadow Roots arbeitest, ist eine alternative Herangehensweise zu `shadow$$` die Verwendung des [Deep Selektors](https://webdriver.io/docs/selectors#deep-selectors).

:::info

WebdriverIO durchdringt automatisch Shadow Roots, wenn du die Befehle `$` oder `$$` verwendest.
Dieser Befehl wird nur benötigt, wenn du in einer Umgebung automatisierst, die WebDriver Bidi noch nicht unterstützt, z.B. bei Mobile-Web-Tests mit Appium.

:::

##### Usage

```js
$(selector).shadow$$(selector)
```

##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>selector</var></code></td>
      <td>`String, Function`</td>
      <td>selector or JS Function to fetch a certain element</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="shadow$$.js"
it('should return elements inside a shadowRoot', async () => {
    const innerEl = await $('.input').shadow$$('#innerEl');
    console.log(await innerEl.getValue()); // outputs: 'test123'
});
```

##### Returns

- **&lt;WebdriverIO.ElementArray&gt;**