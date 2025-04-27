---
id: newWindow
title: nouvelleFenêtre
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/newWindow.ts
---

Ouvrir une nouvelle fenêtre ou un nouvel onglet dans le navigateur (par défaut, une nouvelle fenêtre si non spécifié).
Cette commande est l'équivalent fonctionnel de `window.open()`. Cette commande ne fonctionne pas dans les environnements mobiles.

__Remarque:__ Lorsque vous appelez cette commande, vous basculez automatiquement vers la nouvelle fenêtre ou le nouvel onglet.

##### Utilisation

```js
browser.newWindow(url, { type, windowName, windowFeatures })
```

##### Paramètres

<table>
  <thead>
    <tr>
      <th>Nom</th><th>Type</th><th>Détails</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code></td>
      <td>`string`</td>
      <td>URL du site web à ouvrir</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`NewWindowOptions`</td>
      <td>options de la commande newWindow</td>
    </tr>
    <tr>
      <td><code><var>options.type</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`string`</td>
      <td>type de nouvelle fenêtre: 'tab' ou 'window'</td>
    </tr>
    <tr>
      <td><code><var>options.windowName</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`String`</td>
      <td>nom de la nouvelle fenêtre</td>
    </tr>
    <tr>
      <td><code><var>options.windowFeatures</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`String`</td>
      <td>caractéristiques de la fenêtre ouverte (par ex. taille, position, barres de défilement, etc.)</td>
    </tr>
  </tbody>
</table>

##### Exemples

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

##### Retourne

- **&lt;Object&gt;**
            **<code><var>return</var></code>:**           Un objet contenant le handle de la fenêtre et le type de nouvelle fenêtre `{handle: string, type: string}` handle - L'ID du handle de la fenêtre du nouvel onglet ou de la nouvelle fenêtre, type - Le type de la nouvelle fenêtre, soit 'tab' ou 'window'    
##### Lève

- **Error**:  Si `url` est invalide, si la commande est utilisée sur mobile, ou si `type` n'est pas 'tab' ou 'window'.