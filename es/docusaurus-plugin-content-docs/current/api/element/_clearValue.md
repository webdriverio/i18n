---
id: clearValue
title: clearValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/clearValue.ts
---

Borra el valor de un elemento input o textarea. Asegúrate de que puedes interactuar con el
elemento antes de usar este comando. No puedes borrar un elemento input que esté deshabilitado o en
modo de solo lectura.

##### Uso

```js
$(selector).clearValue()
```

##### Ejemplo

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