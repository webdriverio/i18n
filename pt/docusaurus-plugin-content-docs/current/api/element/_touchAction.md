---
id: touchAction
title: touchAction
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/touchAction.ts
---

:::caution Aviso de Depreciação

O comando `touchAction` está __depreciado__ e será removido em uma versão futura.
Recomendamos usar o comando [`action`](/docs/api/browser/action) em vez disso, com
tipo de ponteiro `touch`, por exemplo:

```ts
await browser.action('pointer', {
  parameters: { pointerType: 'touch' }
})
```

:::

A API Touch Action fornece a base para todos os gestos que podem ser automatizados no Appium.
Atualmente, está disponível apenas para aplicativos nativos e não pode ser usada para interagir com webapps.
Em sua essência, está a capacidade de encadear ações individuais _ad hoc_, que serão então
aplicadas a um elemento no aplicativo no dispositivo. As ações básicas que podem ser usadas são:

- press (passar elemento ou (x,y) ou ambos)
- longPress (passar elemento ou (x,y) ou ambos)
- tap (passar elemento ou (x,y) ou ambos)
- moveTo (passar coordenadas absolutas x,y)
- wait (passar ms (em milissegundos))
- release (sem argumentos)

##### Uso

```js
$(selector).touchAction(action)
```

##### Parâmetros

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Detalhes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>action</var></code></td>
      <td>`TouchActions`</td>
      <td>ação a ser executada</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js title="touchAction.js"
it('should do a touch gesture', async () => {
    const screen = await $('//UITextbox');

    // simple touch action on element
    await screen.touchAction('tap');

    // simple touch action using selector and x y variables
    // tap location is 30px right and 20px down relative from the center of the element
    await screen.touchAction({
        action: 'tap', x: 30, y:20
    })

    // multi action on an element (drag&drop)
    await screen.touchAction([
        'press',
        { action: 'moveTo', x: 200, y: 300 },
        'release'
    ])

    // drag&drop to element
    const otherElement = await $('//UIAApplication[1]/UIAElement[2]')
    await screen.touchAction([
        'press',
        { action: 'moveTo', element: otherElement },
        'release'
    ])
});
```