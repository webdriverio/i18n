---
id: getComputedLabel
title: getComputedLabel
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getComputedLabel.ts
---

ஒரு உறுப்பின் கணக்கிடப்பட்ட WAI-ARIA லேபிளைப் பெறுங்கள்.

##### பயன்பாடு

```js
$(selector).getComputedLabel()
```

##### எடுத்துக்காட்டு

```js title="getComputedLabel.js"
it('should demonstrate the getComputedLabel command', async () => {
    await browser.url('https://www.google.com/ncr')
    const elem = await $('*[name="q"]');
    console.log(await elem.getComputedLabel()); // outputs: "Search"
})
```

##### திரும்பப் பெறுபவை

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  கணக்கிடப்பட்ட WAI-ARIA லேபிள்