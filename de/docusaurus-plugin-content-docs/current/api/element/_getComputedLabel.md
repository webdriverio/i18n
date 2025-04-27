---
id: getComputedLabel
title: getComputedLabel
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getComputedLabel.ts
---

Bekomme das berechnete WAI-ARIA Label eines Elements.

##### Verwendung

```js
$(selector).getComputedLabel()
```

##### Beispiel

```js title="getComputedLabel.js"
it('should demonstrate the getComputedLabel command', async () => {
    await browser.url('https://www.google.com/ncr')
    const elem = await $('*[name="q"]');
    console.log(await elem.getComputedLabel()); // outputs: "Search"
})
```

##### Rückgabewert

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  das berechnete WAI-ARIA Label
