---
id: getComputedLabel
title: getComputedLabel
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getComputedLabel.ts
---

Obtener la etiqueta WAI-ARIA computada de un elemento.

##### Uso

```js
$(selector).getComputedLabel()
```

##### Ejemplo

```js title="getComputedLabel.js"
it('should demonstrate the getComputedLabel command', async () => {
    await browser.url('https://www.google.com/ncr')
    const elem = await $('*[name="q"]');
    console.log(await elem.getComputedLabel()); // outputs: "Search"
})
```

##### Devuelve

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  la etiqueta WAI-ARIA computada