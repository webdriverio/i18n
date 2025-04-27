---
id: getComputedRole
title: getComputedRole
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getComputedRole.ts
---

Получение вычисленной WAI-ARIA роли элемента.

##### Использование

```js
$(selector).getComputedRole()
```

##### Пример

```js title="getComputedRole.js"
it('should demonstrate the getComputedRole command', async () => {
    await browser.url('https://www.google.com/ncr')
    const elem = await $('*[name="q"]');
    console.log(await elem.getComputedRole()); // outputs: "combobox"
})
```

##### Возвращает

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  вычисленную WAI-ARIA роль