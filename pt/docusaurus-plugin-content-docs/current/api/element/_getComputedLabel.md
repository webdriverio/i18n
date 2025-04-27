---
id: getComputedLabel
title: getComputedLabel
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getComputedLabel.ts
---

Obter o rótulo WAI-ARIA computado de um elemento.

##### Uso

```js
$(selector).getComputedLabel()
```

##### Exemplo

```js title="getComputedLabel.js"
it('should demonstrate the getComputedLabel command', async () => {
    await browser.url('https://www.google.com/ncr')
    const elem = await $('*[name="q"]');
    console.log(await elem.getComputedLabel()); // outputs: "Search"
})
```

##### Retorna

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  o rótulo WAI-ARIA computado