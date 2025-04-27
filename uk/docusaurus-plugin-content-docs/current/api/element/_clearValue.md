---
id: clearValue
title: очистити значення
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/clearValue.ts
---

Очистити значення елемента введення або текстової області. Переконайтеся, що ви можете взаємодіяти з елементом перед використанням цієї команди. Ви не можете очистити елемент введення, який вимкнений або знаходиться в режимі лише для читання.

##### Використання

```js
$(selector).clearValue()
```

##### Приклад

```js title="clearValue.js"
it('should demonstrate the clearValue command', async () => {
    const elem = await $('.input')
    await elem.setValue('test123')

    const value = await elem.getValue()
    console.log(value) // returns 'test123'

    await elem.clearValue()
    value = await elem.getValue()
    assert(value === ''); // true
})
```