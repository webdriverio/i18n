---
id: clearValue
title: clearValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/clearValue.ts
---

Limpa o valor de um elemento input ou textarea. Certifique-se de que você pode interagir com o
elemento antes de usar este comando. Você não pode limpar um elemento input que esteja desativado ou em
modo somente leitura.

##### Uso

```js
$(selector).clearValue()
```

##### Exemplo

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