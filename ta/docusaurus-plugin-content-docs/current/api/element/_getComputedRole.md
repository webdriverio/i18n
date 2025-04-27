---
id: getComputedRole
title: getComputedRole
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getComputedRole.ts
---

ஒரு உறுப்பின் கணக்கிடப்பட்ட WAI-ARIA லேபிளைப் பெறுதல்.

##### பயன்பாடு

```js
$(selector).getComputedRole()
```

##### எடுத்துக்காட்டு

```js title="getComputedRole.js"
it('should demonstrate the getComputedRole command', async () => {
    await browser.url('https://www.google.com/ncr')
    const elem = await $('*[name="q"]');
    console.log(await elem.getComputedRole()); // outputs: "combobox"
})
```

##### திருப்பும் மதிப்பு

- **&lt;String&gt;**
            **<code><var>return</var></code>:** கணக்கிடப்பட்ட WAI-ARIA லேபிள்