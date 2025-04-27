---
id: isClickable
title: isClickable
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isClickable.ts
---

Елемент вважається доступним для кліку, коли виконуються наступні умови:

- елемент існує
- елемент відображається
- елемент не вимкнений
- елемент знаходиться в межах видимої області
- елемент можна прокрутити до видимої області
- центр елемента не перекривається іншим елементом

інакше повертається false.

:::info

Зверніть увагу, що `isClickable` працює лише у веб-браузері та в мобільних веб-представленнях,
він не працює в нативному контексті мобільного додатку. Також, на відміну від інших команд елемента,
WebdriverIO не чекатиме існування елемента для виконання цієї команди.

:::

##### Використання

```js
$(selector).isClickable()
```

##### Приклад

```js title="isClickable.js"
it('should detect if an element is clickable', async () => {
    const el = await $('#el')
    let clickable = await el.isClickable();
    console.log(clickable); // outputs: true or false

    // wait for element to be clickable
    await browser.waitUntil(() => el.isClickable())
});
```

##### Повертає

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**             true якщо елемент доступний для кліку