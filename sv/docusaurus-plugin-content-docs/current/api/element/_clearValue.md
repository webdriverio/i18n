---
id: clearValue
title: clearValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/clearValue.ts
---

Rensa värdet av ett input- eller textarea-element. Se till att du kan interagera med
elementet innan du använder detta kommando. Du kan inte rensa ett input-element som är inaktiverat eller
i skrivskyddat läge.

##### Användning

```js
$(selector).clearValue()
```

##### Exempel

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