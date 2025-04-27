---
id: newWindow
title: novaJanela
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/newWindow.ts
---

Abrir nova janela ou aba no navegador (o padrão é uma nova janela se não for especificado).
Este comando é a função equivalente ao `window.open()`. Este comando não funciona em ambientes móveis.

__Nota:__ Ao chamar este comando, você automaticamente muda para a nova janela ou aba.

##### Uso

```js
browser.newWindow(url, { type, windowName, windowFeatures })
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
      <td><code><var>url</var></code></td>
      <td>`string`</td>
      <td>URL do site a ser aberto</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`NewWindowOptions`</td>
      <td>opções do comando newWindow</td>
    </tr>
    <tr>
      <td><code><var>options.type</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`string`</td>
      <td>tipo de nova janela: 'tab' ou 'window'</td>
    </tr>
    <tr>
      <td><code><var>options.windowName</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`String`</td>
      <td>nome da nova janela</td>
    </tr>
    <tr>
      <td><code><var>options.windowFeatures</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`String`</td>
      <td>características da janela aberta (por exemplo, tamanho, posição, barras de rolagem, etc.)</td>
    </tr>
  </tbody>
</table>

##### Exemplos

```js title="newWindowSync.js"
it('should open a new window', async () => {
    await browser.url('https://google.com')
    console.log(await browser.getTitle()) // outputs: "Google"

    const result = await browser.newWindow('https://webdriver.io', {
        windowName: 'WebdriverIO window',
        windowFeature: 'width=420,height=230,resizable,scrollbars=yes,status=1',
    })
    console.log(await browser.getTitle()) // outputs: "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
    console.log(result.type) // outputs: "window"
    const handles = await browser.getWindowHandles()
    await browser.switchToWindow(handles[1])
    await browser.closeWindow()
    await browser.switchToWindow(handles[0])
    console.log(await browser.getTitle()) // outputs: "Google"
});

```

```js title="newTabSync.js"
  it('should open a new tab', async () => {
      await browser.url('https://google.com')
      console.log(await browser.getTitle()) // outputs: "Google"

      await browser.newWindow('https://webdriver.io', {
          type:'tab',
          windowName: 'WebdriverIO window',
          windowFeature: 'width=420,height=230,resizable,scrollbars=yes,status=1',
      })
      console.log(await browser.getTitle()) // outputs: "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
      console.log(result.type) // outputs: "tab"
      const handles = await browser.getWindowHandles()
      await browser.switchToWindow(handles[1])
      await browser.closeWindow()
      await browser.switchToWindow(handles[0])
      console.log(await browser.getTitle()) // outputs: "Google"
 });
```

##### Retorna

- **&lt;Object&gt;**
            **<code><var>return</var></code>:**           Um objeto contendo o identificador da janela e o tipo de nova janela `{handle: string, type: string}` handle - O ID do identificador da janela da nova aba ou janela, type - O tipo da nova janela, 'tab' ou 'window'    
##### Lança

- **Error**:  Se `url` for inválido, se o comando for usado em dispositivos móveis, ou se `type` não for 'tab' ou 'window'.