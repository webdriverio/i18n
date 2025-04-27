---
id: longPress
title: longPress
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/longPress.ts
---

Executa um gesto de pressionar longamente no elemento dado na tela.

Isso emite um comando WebDriver `action` para o elemento selecionado. É baseado no comando `click`.

:::info

Este comando só funciona com os seguintes componentes atualizados:
 - Servidor Appium (versão 2.0.0 ou superior)
 - `appium-uiautomator2-driver` (para Android)
 - `appium-xcuitest-driver` (para iOS)

Certifique-se de que seu ambiente Appium local ou baseado em nuvem seja atualizado regularmente para evitar problemas de compatibilidade.

:::

##### Uso

```js
$(selector).longPress({ x, y, duration })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`LongPressOptions`</td>
      <td>Opções de pressão longa (opcional)</td>
    </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>Número (opcional)</td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>Número (opcional)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>Duração da pressão em ms, padrão é 1500 ms <br /><strong>APENAS-MOBILE</strong></td>
    </tr>
  </tbody>
</table>

##### Exemplos

```js title="longpress.offset.js"
it('should demonstrate a longPress using an offset on the iOS Contacts icon', async () => {
    const contacts = $('~Contacts')
    // opens the Contacts menu on iOS where you can quickly create
    // a new contact, edit your home screen, or remove the app
    // clicks 30 horizontal and 10 vertical pixels away from location of the icon (from center point of element)
    await contacts.longPress({ x: 30, y: 10 })
})

```

```js title="longpress.example.js"
it('should be able to open the contacts menu on iOS by executing a longPress of 5 seconds', async () => {
    const contacts = $('~Contacts')
    // opens the Contacts menu on iOS where you can quickly create
    // a new contact, edit your home screen, or remove the app
    await contacts.longPress({ duration: 5 * 1000 })
})
```