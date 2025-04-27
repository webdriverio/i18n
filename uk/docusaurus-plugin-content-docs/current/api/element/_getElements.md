---
id: getElements
title: getElements
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getElements.ts
---

Доступ до властивостей `WebdriverIO.ElementArray`, таких як `length` або `selector`, з посилання на елементи.

##### Використання

```js
$(selector).getElements()
```

##### Приклад

```ts title="getElements.ts"
it('should allow me to inspect WebdriverIO.Element properties', async () => {
    const divs = await $$('div').getElements();
    console.log(divs.length); // outputs: 43
});
```

##### Повертає

- **&lt;WebdriverIO.ElementArray&gt;**