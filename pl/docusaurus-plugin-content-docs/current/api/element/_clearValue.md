---
id: clearValue
title: clearValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/clearValue.ts
---

Wyczyść wartość elementu input lub textarea. Upewnij się, że możesz wchodzić w interakcję z
elementem przed użyciem tego polecenia. Nie możesz wyczyścić elementu input, który jest wyłączony lub w
trybie tylko do odczytu.

##### Użycie

```js
$(selector).clearValue()
```

##### Przykład

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