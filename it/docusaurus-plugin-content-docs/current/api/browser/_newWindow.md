---
id: newWindow
title: newWindow
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/newWindow.ts
---

Apre una nuova finestra o scheda nel browser (predefinita a una nuova finestra se non specificato).
Questo comando è la funzione equivalente a `window.open()`. Questo comando non funziona in ambienti mobili.

__Nota:__ Quando richiami questo comando passi automaticamente alla nuova finestra o scheda.

##### Utilizzo

```js
browser.newWindow(url, { type, windowName, windowFeatures })
```

##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code></td>
      <td>`string`</td>
      <td>URL del sito web da aprire</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`NewWindowOptions`</td>
      <td>opzioni del comando newWindow</td>
    </tr>
    <tr>
      <td><code><var>options.type</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`string`</td>
      <td>tipo di nuova finestra: 'tab' o 'window'</td>
    </tr>
    <tr>
      <td><code><var>options.windowName</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`String`</td>
      <td>nome della nuova finestra</td>
    </tr>
    <tr>
      <td><code><var>options.windowFeatures</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`String`</td>
      <td>caratteristiche della finestra aperta (es. dimensione, posizione, barre di scorrimento, ecc.)</td>
    </tr>
  </tbody>
</table>

##### Esempi

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

##### Restituisce

- **&lt;Object&gt;**
            **<code><var>return</var></code>:**           Un oggetto contenente l'handle della finestra e il tipo di nuova finestra `{handle: string, type: string}` handle - L'ID dell'handle della finestra della nuova scheda o finestra, type - Il tipo della nuova finestra, 'tab' o 'window'    
##### Genera errore

- **Error**:  Se `url` non è valido, se il comando viene utilizzato su dispositivi mobili, o se `type` non è 'tab' o 'window'.