---
id: newWindow
title: newWindow
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/newWindow.ts
---

Otwórz nowe okno lub zakładkę w przeglądarce (domyślnie nowe okno, jeśli nie określono inaczej).
Ta komenda jest równoważna funkcji `window.open()`. Ta komenda nie działa w środowiskach mobilnych.

__Uwaga:__ Po wywołaniu tej komendy automatycznie przełączasz się na nowe okno lub zakładkę.

##### Użycie

```js
browser.newWindow(url, { type, windowName, windowFeatures })
```

##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code></td>
      <td>`string`</td>
      <td>adres URL strony do otwarcia</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`NewWindowOptions`</td>
      <td>opcje komendy newWindow</td>
    </tr>
    <tr>
      <td><code><var>options.type</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`string`</td>
      <td>typ nowego okna: 'tab' lub 'window'</td>
    </tr>
    <tr>
      <td><code><var>options.windowName</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`String`</td>
      <td>nazwa nowego okna</td>
    </tr>
    <tr>
      <td><code><var>options.windowFeatures</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`String`</td>
      <td>właściwości otwartego okna (np. rozmiar, pozycja, paski przewijania itp.)</td>
    </tr>
  </tbody>
</table>

##### Przykłady

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

##### Zwraca

- **&lt;Object&gt;**
            **<code><var>return</var></code>:**           Obiekt zawierający uchwyt okna i typ nowego okna `{handle: string, type: string}` handle - ID uchwytu okna nowej zakładki lub okna, type - Typ nowego okna, 'tab' lub 'window'    
##### Rzuca

- **Error**:  Jeśli `url` jest nieprawidłowy, jeśli komenda jest używana na urządzeniu mobilnym lub `type` nie jest 'tab' lub 'window'.