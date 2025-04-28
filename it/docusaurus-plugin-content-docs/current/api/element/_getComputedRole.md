---
id: getComputedRole
title: getComputedRole
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getComputedRole.ts
---

Ottieni l'etichetta WAI-ARIA calcolata di un elemento.

##### Utilizzo

```js
$(selector).getComputedRole()
```

##### Esempio

```js title="getComputedRole.js"
it('should demonstrate the getComputedRole command', async () => {
    await browser.url('https://www.google.com/ncr')
    const elem = await $('*[name="q"]');
    console.log(await elem.getComputedRole()); // outputs: "combobox"
})
```

##### Restituisce

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  l'etichetta WAI-ARIA calcolata