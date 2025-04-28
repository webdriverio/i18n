---
id: clearValue
title: clearValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/clearValue.ts
---

Cancella il valore di un elemento input o textarea. Assicurati di poter interagire con l'elemento prima di utilizzare questo comando. Non puoi cancellare un elemento input che è disabilitato o in modalità di sola lettura.

##### Utilizzo

```js
$(selector).clearValue()
```

##### Esempio

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