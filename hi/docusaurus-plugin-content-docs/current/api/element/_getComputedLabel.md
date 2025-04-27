---
id: getComputedLabel
title: getComputedLabel
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getComputedLabel.ts
---

किसी तत्व का कम्प्यूटेड WAI-ARIA लेबल प्राप्त करें।

##### उपयोग

```js
$(selector).getComputedLabel()
```

##### उदाहरण

```js title="getComputedLabel.js"
it('should demonstrate the getComputedLabel command', async () => {
    await browser.url('https://www.google.com/ncr')
    const elem = await $('*[name="q"]');
    console.log(await elem.getComputedLabel()); // outputs: "Search"
})
```

##### रिटर्न

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  कम्प्यूटेड WAI-ARIA लेबल