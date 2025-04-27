---
id: getElements
title: getElements
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getElements.ts
---

Доступ к свойствам `WebdriverIO.ElementArray`, таким как `length` или `selector`, из ссылки на элементы.

##### Использование

```js
$(selector).getElements()
```

##### Пример

```ts title="getElements.ts"
it('should allow me to inspect WebdriverIO.Element properties', async () => {
    const divs = await $$('div').getElements();
    console.log(divs.length); // outputs: 43
});
```

##### Возвращает

- **&lt;WebdriverIO.ElementArray&gt;**