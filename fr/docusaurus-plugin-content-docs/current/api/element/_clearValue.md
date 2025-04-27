---
id: clearValue
title: clearValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/clearValue.ts
---

Effacer la valeur d'un élément input ou textarea. Assurez-vous de pouvoir interagir avec
l'élément avant d'utiliser cette commande. Vous ne pouvez pas effacer un élément input qui est désactivé ou en 
mode lecture seule.

##### Usage

```js
$(selector).clearValue()
```

##### Exemple

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