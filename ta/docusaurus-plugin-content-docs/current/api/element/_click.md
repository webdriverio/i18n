---
id: click
title: கிளிக்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/click.ts
---

Click on an element.

This issues a WebDriver `click` command for the selected element , which generally scrolls to and then clicks the
selected element when no options are passed. When options object is passed it uses action class instead of webdriver click which
give added capabilities like passing button type, coordinates etc. By default, when using options a release action
command is send after performing the click action, pass `option.skipRelease=true` to skip this action.

:::info

If you have fixed-position elements (such as a fixed header or footer) that cover up the
selected element after it is scrolled within the viewport, the click will be issued at the given coordinates, but will
be received by your fixed (overlaying) element. In these cased the following error is thrown:

```
Element is not clickable at point (x, x). Other element would receive the click: ..."
```

To work around this, try to find the overlaying element and remove it via `execute` command so it doesn't interfere
the click. You also can try to scroll to the element yourself using `scroll` with an offset appropriate for your
scenario.

:::

:::info

The click command can also be used to simulate a long press on a mobile device. This is done by setting the `duration`.
See the example below for more information.

:::

##### பயன்பாடு

```js
$(selector).click({ button, x, y, skipRelease, duration })
```

##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`ClickOptions`</td>
      <td>கிளிக் விருப்பங்கள் (விருப்பத்தேர்வு)</td>
    </tr>
    <tr>
      <td><code><var>options.button</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`string, number`</td>
      <td>பின்வருவனவற்றில் ஒன்றாக இருக்கலாம் `[0, "left", 1, "middle", 2, "right"]` <br /><strong>WEB-ONLY</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`number`</td>
      <td>எலிமென்ட் இருக்கும் இடத்திலிருந்து X கிடைமட்ட பிக்ஸல்கள் தொலைவில் கிளிக் செய்கிறது (எலிமென்ட்டின் மைய புள்ளியிலிருந்து)<br /><strong>WEB and Native</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`number`</td>
      <td>எலிமென்ட் இருக்கும் இடத்திலிருந்து Y செங்குத்து பிக்ஸல்கள் தொலைவில் கிளிக் செய்கிறது (எலிமென்ட்டின் மைய புள்ளியிலிருந்து)<br /><strong>WEB and Native support</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
      <td><code><var>options.skipRelease</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`boolean`</td>
      <td>பூலியன் (விருப்பத்தேர்வு) <br /><strong>WEB-ONLY</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`number`</td>
      <td>கிளிக்கின் கால அளவு, அதாவது "நீண்ட அழுத்தம்" <br /><strong>MOBILE-NATIVE-APP-ONLY</strong> (Mobile)</td>
    </tr>
  </tbody>
</table>

##### உதாரணங்கள்

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