---
id: getComputedLabel
title: getComputedLabel
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getComputedLabel.ts
---

Ottieni l'etichetta WAI-ARIA calcolata di un elemento.

##### Utilizzo

```js
$(selector).getComputedLabel()
```

##### Esempio

```js title="getComputedLabel.js"
it('should demonstrate the getComputedLabel command', async () => {
    await browser.url('https://www.google.com/ncr')
    const elem = await $('*[name="q"]');
    console.log(await elem.getComputedLabel()); // outputs: "Search"
})
```

##### Restituisce

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  l'etichetta WAI-ARIA calcolata