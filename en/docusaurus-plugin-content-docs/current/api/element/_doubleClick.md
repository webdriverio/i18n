---
id: doubleClick
title: doubleClick
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/doubleClick.ts
---

Double-click on an element.

##### Usage

```js
$(selector).doubleClick()
```

##### Examples

```html title="example.html"
<button id="myButton" ondblclick="document.getElementById('someText').innerHTML='I was dblclicked'">Click me</button>
<div id="someText">I was not clicked</div>
```

```js title="doubleClick.js"
it('should demonstrate the doubleClick command', async () => {
    const myButton = await $('#myButton')
    await myButton.doubleClick()

    const value = await myButton.getText()
    assert(value === 'I was dblclicked') // true
})
```

