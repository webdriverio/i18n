---
id: getComputedRole
title: गणना किया गया भूमिका प्राप्त करना
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getComputedRole.ts
---

किसी तत्व का गणना किया गया WAI-ARIA लेबल प्राप्त करें।

##### उपयोग

```js
$(selector).getComputedRole()
```

##### उदाहरण

```js title="getComputedRole.js"
it('should demonstrate the getComputedRole command', async () => {
    await browser.url('https://www.google.com/ncr')
    const elem = await $('*[name="q"]');
    console.log(await elem.getComputedRole()); // outputs: "combobox"
})
```

##### रिटर्न्स

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  गणना किया गया WAI-ARIA लेबल