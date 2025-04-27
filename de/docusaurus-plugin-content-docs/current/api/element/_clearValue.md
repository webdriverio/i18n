---
id: clearValue
title: clearValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/clearValue.ts
---

Löschen Sie den Wert eines Eingabe- oder Textarea-Elements. Stellen Sie sicher, dass Sie mit dem 
Element interagieren können, bevor Sie diesen Befehl verwenden. Sie können den Wert eines Eingabeelements nicht löschen, das deaktiviert ist oder sich im 
Nur-Lese-Modus befindet.

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