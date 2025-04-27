---
id: getComputedRole
title: getComputedRole
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getComputedRole.ts
---

Отримання обчисленої ролі WAI-ARIA елемента.

##### Використання

```js
$(selector).getComputedRole()
```

##### Приклад

```js title="getComputedRole.js"
it('should demonstrate the getComputedRole command', async () => {
    await browser.url('https://www.google.com/ncr')
    const elem = await $('*[name="q"]');
    console.log(await elem.getComputedRole()); // outputs: "combobox"
})
```

##### Повертає

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  обчислена мітка WAI-ARIA