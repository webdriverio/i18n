Hier ist die übersetzte Version des Markdown-Inhalts von Englisch nach Deutsch:

---
id: click
title: click
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/click.ts
---

Klicken auf ein Element.

Dies löst einen WebDriver `click`-Befehl für das ausgewählte Element aus, der im Allgemeinen zum ausgewählten Element scrollt und dann darauf klickt, wenn keine Optionen übergeben werden. Wenn ein Options-Objekt übergeben wird, verwendet es stattdessen die Aktionsklasse statt des WebDriver-Klicks, was zusätzliche Möglichkeiten wie die Übergabe von Button-Typ, Koordinaten usw. bietet. Standardmäßig wird bei Verwendung von Optionen nach der Ausführung der Klickaktion ein Release-Action-Befehl gesendet. Übergeben Sie `option.skipRelease=true`, um diese Aktion zu überspringen.

:::info

Wenn Sie Elemente mit fester Position haben (wie einen festen Header oder Footer), die das ausgewählte Element überdecken, nachdem es innerhalb des Viewports gescrollt wurde, wird der Klick an den angegebenen Koordinaten ausgegeben, aber von Ihrem festen (überlagernden) Element empfangen. In diesen Fällen wird folgender Fehler ausgelöst:

```
Element is not clickable at point (x, x). Other element would receive the click: ..."
```

Um dieses Problem zu umgehen, versuchen Sie, das überlagernde Element zu finden und über den `execute`-Befehl zu entfernen, damit es den Klick nicht stört. Sie können auch versuchen, selbst mit `scroll` zu dem Element zu scrollen, mit einem für Ihr Szenario geeigneten Offset.

:::

:::info

Der Klick-Befehl kann auch verwendet werden, um einen langen Druck auf einem mobilen Gerät zu simulieren. Dies geschieht durch Setzen der `duration`. Weitere Informationen finden Sie im Beispiel unten.

:::

##### Verwendung

```js
$(selector).click({ button, x, y, skipRelease, duration })
```

##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`ClickOptions`</td>
      <td>Klick-Optionen (optional)</td>
    </tr>
    <tr>
      <td><code><var>options.button</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string, number`</td>
      <td>Kann einer von `[0, "left", 1, "middle", 2, "right"]` sein <br /><strong>NUR WEB</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Klickt X horizontale Pixel entfernt vom Standort des Elements (vom Mittelpunkt des Elements)<br /><strong>WEB und Native</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Klickt Y vertikale Pixel entfernt vom Standort des Elements (vom Mittelpunkt des Elements)<br /><strong>WEB und Native Unterstützung</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
      <td><code><var>options.skipRelease</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`boolean`</td>
      <td>Boolean (optional) <br /><strong>NUR WEB</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Dauer des Klicks, auch "LongPress" genannt <br /><strong>NUR MOBILE-NATIVE-APP</strong> (Mobile)</td>
    </tr>
  </tbody>
</table>

##### Beispiele

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