---
id: getElement
title: getElement
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getElement.ts
---

Доступ к свойствам `WebdriverIO.Element`, таким как `selector` или `elementId`, из ссылки на элемент.

##### Использование

```js
$(selector).getElement()
```

##### Пример

```ts title="getElement.ts"
it('should allow me to inspect WebdriverIO.Element properties', async () => {
    const elem = await $('#elem').getElement();
    console.log(elem.selector); // outputs: '#elem'
});
```

##### Возвращает

- **&lt;WebdriverIO.Element&gt;**