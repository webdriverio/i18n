---
id: getComputedLabel
title: getComputedLabel
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getComputedLabel.ts
---

Get the computed WAI-ARIA label of an element.

##### Usage

```js
$(selector).getComputedLabel()
```

##### Example

```js title="getComputedLabel.js"
it('should demonstrate the getComputedLabel command', async () => {
    await browser.url('https://www.google.com/ncr')
    const elem = await $('*[name="q"]');
    console.log(await elem.getComputedLabel()); // outputs: "Search"
})
```

##### Returns

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  the computed WAI-ARIA label    

