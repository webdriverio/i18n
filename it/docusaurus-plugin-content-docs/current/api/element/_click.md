---
id: click
title: click
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/click.ts
---

Clicca su un elemento.

Questo emette un comando WebDriver `click` per l'elemento selezionato, che generalmente scorre fino all'elemento selezionato e poi ci clicca sopra quando non vengono passate opzioni. Quando viene passato un oggetto options, utilizza invece la classe action invece del click webdriver, che offre funzionalità aggiuntive come la possibilità di specificare il tipo di pulsante, le coordinate ecc. Per impostazione predefinita, quando si utilizzano le opzioni, viene inviato un comando di rilascio dopo aver eseguito l'azione di clic; passare `option.skipRelease=true` per saltare questa azione.

:::info

Se hai elementi a posizione fissa (come un'intestazione o un piè di pagina fissi) che coprono l'elemento selezionato dopo che è stato fatto scorrere all'interno della viewport, il clic verrà emesso alle coordinate specificate, ma sarà ricevuto dal tuo elemento fisso (sovrapposto). In questi casi viene generato il seguente errore:

```
Element is not clickable at point (x, x). Other element would receive the click: ..."
```

Per aggirare questo problema, prova a trovare l'elemento sovrapposto e rimuoverlo tramite il comando `execute` in modo che non interferisca con il clic. Puoi anche provare a scorrere fino all'elemento da solo usando `scroll` con un offset appropriato per il tuo scenario.

:::

:::info

Il comando click può anche essere utilizzato per simulare una pressione prolungata su un dispositivo mobile. Questo viene fatto impostando il `duration`.
Vedi l'esempio qui sotto per maggiori informazioni.

:::

##### Utilizzo

```js
$(selector).click({ button, x, y, skipRelease, duration })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`ClickOptions`</td>
      <td>Opzioni di clic (opzionale)</td>
    </tr>
    <tr>
      <td><code><var>options.button</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`string, number`</td>
      <td>Può essere uno tra `[0, "left", 1, "middle", 2, "right"]` <br /><strong>SOLO-WEB</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`number`</td>
      <td>Clicca X pixel orizzontali lontano dalla posizione dell'elemento (dal punto centrale dell'elemento)<br /><strong>WEB e Native</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`number`</td>
      <td>Clicca Y pixel verticali lontano dalla posizione dell'elemento (dal punto centrale dell'elemento)<br /><strong>Supporto WEB e Native</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
      <td><code><var>options.skipRelease</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`boolean`</td>
      <td>Booleano (opzionale) <br /><strong>SOLO-WEB</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`number`</td>
      <td>Durata del clic, noto anche come "LongPress" <br /><strong>SOLO-APP-NATIVE-MOBILE</strong> (Mobile)</td>
    </tr>
  </tbody>
</table>

##### Esempi

```html title="example.html"
<button id="myButton" onclick="document.getElementById('someText').innerHTML='I was clicked'">Click me</button>
<div id="someText">I was not clicked</div>
```

```js title="click.js"
it('should demonstrate the click command', async () => {
    const myButton = await $('#myButton')
    await myButton.click()
    const myText = await $('#someText')
    const text = await myText.getText()
    assert(text === 'I was clicked') // true
})
```

```js title="example.js"
it('should fetch menu links and visit each page', async () => {
    const links = await $$('#menu a')
    await links.forEach(async (link) => {
        await link.click()
    })
})

```

```html title="example.html"
<button id="myButton">Click me</button>
```

```js title="example.js"
it('should demonstrate a click using an offset', async () => {
    const myButton = await $('#myButton')
    await myButton.click({ x: 30 }) // clicks 30 horizontal pixels away from location of the button (from center point of element)
})

```

```html title="example.html"
<button id="myButton">Click me</button>
```

```js title="example.js"
it('should demonstrate a right click passed as string', async () => {
    const myButton = await $('#myButton')
    await myButton.click({ button: 'right' }) // opens the contextmenu at the location of the button
})
it('should demonstrate a right click passed as number while adding an offset', async () => {
    const myButton = await $('#myButton')
    await myButton.click({ button: 2, x: 30, y: 40 }) // opens the contextmenu 30 horizontal and 40 vertical pixels away from location of the button (from the center of element)
})
it('should skip sending releaseAction command that cause unexpected alert closure', async () => {
    const myButton = await $('#myButton')
    await myButton.click({ button: 2, x: 30, y: 40, skipRelease:true }) // skips sending releaseActions
})

```

```js title="longpress.example.js"
it('should be able to open the contacts menu on iOS by executing a longPress', async () => {
    const contacts = await $('~Contacts')
    // opens the Contacts menu on iOS where you can quickly create
    // a new contact, edit your home screen, or remove the app
    await contacts.click({ duration: 2000 })
})
```