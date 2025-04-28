---
id: getComputedRole
title: getComputedRole
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getComputedRole.ts
---

Hämta den beräknade WAI-ARIA-etiketten för ett element.

##### Användning

```js
$(selector).getComputedRole()
```

##### Exempel

```js title="getComputedRole.js"
it('should demonstrate the getComputedRole command', async () => {
    await browser.url('https://www.google.com/ncr')
    const elem = await $('*[name="q"]');
    console.log(await elem.getComputedRole()); // outputs: "combobox"
})
```

##### Returnerar

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  den beräknade WAI-ARIA-etiketten