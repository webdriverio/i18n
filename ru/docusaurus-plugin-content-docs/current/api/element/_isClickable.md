---
id: isClickable
title: isClickable
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isClickable.ts
---

Элемент считается кликабельным, когда выполняются следующие условия:

- элемент существует
- элемент отображается
- элемент не отключен
- элемент находится в области видимости
- элемент можно прокрутить в область видимости
- центр элемента не перекрывается другим элементом

в противном случае возвращается false.

:::info

Обратите внимание, что `isClickable` работает только в веб-браузере и в мобильных веб-представлениях,
он не работает в нативном контексте мобильного приложения. Также, в отличие от других команд элементов,
WebdriverIO не будет ждать существования элемента для выполнения этой команды.

:::

##### Использование

```js
$(selector).isClickable()
```

##### Пример

```js title="isClickable.js"
it('should detect if an element is clickable', async () => {
    const el = await $('#el')
    let clickable = await el.isClickable();
    console.log(clickable); // outputs: true or false

    // wait for element to be clickable
    await browser.waitUntil(() => el.isClickable())
});
```

##### Возвращает

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**             true если элемент кликабельный