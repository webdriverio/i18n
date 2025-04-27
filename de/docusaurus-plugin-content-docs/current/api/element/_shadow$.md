Here's the translated content:

---
id: shadow$
title: shadow$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/shadow$.ts
---

Greift auf ein Element innerhalb des shadowRoot eines gegebenen Elements zu. Wenn Sie mit vielen verschachtelten Shadow Roots arbeiten, ist eine alternative Methode zu `shadow$` die Verwendung des [Deep Selectors](https://webdriver.io/docs/selectors#deep-selectors).

:::info

WebdriverIO durchdringt automatisch Shadow Roots, wenn Sie die Befehle `$` oder `$$` verwenden.
Dieser Befehl wird nur benötigt, wenn Sie in einer Umgebung automatisieren, die WebDriver Bidi noch nicht unterstützt, z.B. beim mobilen Web-Testing mit Appium.

:::

##### Verwendung

```js
$(selector).shadow$(selector)
```

##### Parameter

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
      <td>Selektor oder JS-Funktion, um ein bestimmtes Element abzurufen</td>
    </tr>
  </tbody>
</table>

##### Beispiel

```js title="shadow$$.js"
it('should return an element inside a shadowRoot', async () => {
    const innerEl = await $('custom-component').shadow$('#innerEl');
    console.log(await innerEl.getValue()); // outputs: 'test123'
});
```

##### Gibt zurück

- **&lt;WebdriverIO.Element&gt;**