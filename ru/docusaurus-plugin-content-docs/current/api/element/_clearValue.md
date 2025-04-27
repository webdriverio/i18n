---
id: clearValue
title: clearValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/clearValue.ts
---

Очистить значение элемента input или textarea. Убедитесь, что вы можете взаимодействовать с
элементом перед использованием этой команды. Вы не можете очистить элемент input, который отключен или находится в
режиме только для чтения.

##### Usage

```js
$(selector).clearValue()
```

##### Example

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