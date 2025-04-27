---
id: getComputedRole
title: getComputedRole
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getComputedRole.ts
---

Obtenir le rôle WAI-ARIA calculé d'un élément.

##### Utilisation

```js
$(selector).getComputedRole()
```

##### Exemple

```js title="getComputedRole.js"
it('should demonstrate the getComputedRole command', async () => {
    await browser.url('https://www.google.com/ncr')
    const elem = await $('*[name="q"]');
    console.log(await elem.getComputedRole()); // outputs: "combobox"
})
```

##### Retourne

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  le rôle WAI-ARIA calculé