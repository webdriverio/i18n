---
id: getElement
title: getElement
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getElement.ts
---

Доступ до властивостей `WebdriverIO.Element` таких як `selector` або `elementId` з посилання на елемент.

##### Використання

```js
$(selector).getElement()
```

##### Приклад

```ts title="getElement.ts"
it('should allow me to inspect WebdriverIO.Element properties', async () => {
    const elem = await $('#elem').getElement();
    console.log(elem.selector); // outputs: '#elem'
});
```

##### Повертає

- **&lt;WebdriverIO.Element&gt;**