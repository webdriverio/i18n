---
id: getComputedLabel
title: getComputedLabel
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getComputedLabel.ts
---

Hämta den beräknade WAI-ARIA etiketten för ett element.

##### Användning

```js
$(selector).getComputedLabel()
```

##### Exempel

```js title="getComputedLabel.js"
it('should demonstrate the getComputedLabel command', async () => {
    await browser.url('https://www.google.com/ncr')
    const elem = await $('*[name="q"]');
    console.log(await elem.getComputedLabel()); // outputs: "Search"
})
```

##### Returnerar

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  den beräknade WAI-ARIA etiketten