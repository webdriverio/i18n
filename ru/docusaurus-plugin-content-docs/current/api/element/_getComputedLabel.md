---
id: getComputedLabel
title: getComputedLabel
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getComputedLabel.ts
---

Получить вычисленную WAI-ARIA метку элемента.

##### Использование

```js
$(selector).getComputedLabel()
```

##### Пример

```js title="getComputedLabel.js"
it('should demonstrate the getComputedLabel command', async () => {
    await browser.url('https://www.google.com/ncr')
    const elem = await $('*[name="q"]');
    console.log(await elem.getComputedLabel()); // outputs: "Search"
})
```

##### Возвращает

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  вычисленную WAI-ARIA метку
```