---
id: getComputedRole
title: getComputedRole
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getComputedRole.ts
---

Pobierz obliczoną etykietę WAI-ARIA elementu.

##### Użycie

```js
$(selector).getComputedRole()
```

##### Przykład

```js title="getComputedRole.js"
it('should demonstrate the getComputedRole command', async () => {
    await browser.url('https://www.google.com/ncr')
    const elem = await $('*[name="q"]');
    console.log(await elem.getComputedRole()); // outputs: "combobox"
})
```

##### Zwraca

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  obliczoną etykietę WAI-ARIA