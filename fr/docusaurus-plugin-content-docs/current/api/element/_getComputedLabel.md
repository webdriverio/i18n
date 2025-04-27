---
id: getComputedLabel
title: getComputedLabel
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getComputedLabel.ts
---

Obtenir l'étiquette WAI-ARIA calculée d'un élément.

##### Usage

```js
$(selector).getComputedLabel()
```

##### Exemple

```js title="getComputedLabel.js"
it('should demonstrate the getComputedLabel command', async () => {
    await browser.url('https://www.google.com/ncr')
    const elem = await $('*[name="q"]');
    console.log(await elem.getComputedLabel()); // outputs: "Search"
})
```

##### Retourne

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  l'étiquette WAI-ARIA calculée