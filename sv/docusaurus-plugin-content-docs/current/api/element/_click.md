---
id: click
title: klicka
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/click.ts
---

Klicka på ett element.

Detta utfärdar ett WebDriver `click`-kommando för det valda elementet, vilket generellt bläddrar till och sedan klickar på
det valda elementet när inga alternativ anges. När alternativ-objektet skickas används istället action-klassen istället för webdriver click vilket
ger ytterligare funktioner som att ange knapptype, koordinater osv. Som standard, när alternativ används, skickas ett release-action
kommando efter att klickåtgärden utförts, ange `option.skipRelease=true` för att hoppa över denna åtgärd.

:::info

Om du har element med fast position (som ett fast sidhuvud eller sidfot) som täcker över
det valda elementet efter att det rullas inom visningsområdet, kommer klicket att utfärdas vid de angivna koordinaterna, men kommer att
tas emot av ditt fasta (överlappande) element. I dessa fall kastas följande fel:

```
Element is not clickable at point (x, x). Other element would receive the click: ..."
```

För att kringgå detta, försök hitta det överlappande elementet och ta bort det via `execute`-kommandot så att det inte stör
klicket. Du kan också försöka bläddra till elementet själv med hjälp av `scroll` med en offset som passar för ditt
scenario.

:::

:::info

Klick-kommandot kan också användas för att simulera ett långt tryck på en mobil enhet. Detta görs genom att ställa in `duration`.
Se exemplet nedan för mer information.

:::

##### Användning

```js
$(selector).click({ button, x, y, skipRelease, duration })
```

##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`ClickOptions`</td>
      <td>Klickalternativ (valfritt)</td>
    </tr>
    <tr>
      <td><code><var>options.button</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`string, number`</td>
      <td>Kan vara en av `[0, "left", 1, "middle", 2, "right"]` <br /><strong>ENDAST-WEBB</strong> (Desktop/Mobil)</td>
    </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`number`</td>
      <td>Klickar X horisontella pixlar från elementets position (från elementets mittpunkt)<br /><strong>WEBB och Native</strong> (Desktop/Mobil)</td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`number`</td>
      <td>Klickar Y vertikala pixlar från elementets position (från elementets mittpunkt)<br /><strong>WEBB och Native-stöd</strong> (Desktop/Mobil)</td>
    </tr>
    <tr>
      <td><code><var>options.skipRelease</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`boolean`</td>
      <td>Boolean (valfritt) <br /><strong>ENDAST-WEBB</strong> (Desktop/Mobil)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`number`</td>
      <td>Klickens varaktighet, även kallad "LongPress" <br /><strong>ENDAST-MOBIL-NATIVE-APP</strong> (Mobil)</td>
    </tr>
  </tbody>
</table>

##### Exempel

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