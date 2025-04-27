---
id: getText
title: getText
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getText.ts
---

Hole den Textinhalt von einem DOM-Element. Stelle sicher, dass das Element,
von dem du den Text anfordern möchtest, [interaktionsfähig ist](http://www.w3.org/TR/webdriver/#interactable),
sonst bekommst du einen leeren String als Rückgabewert. Wenn das Element deaktiviert oder nicht
sichtbar ist und du trotzdem den Textinhalt erhalten möchtest, verwende [getHTML](https://webdriver.io/docs/api/element/getHTML)
als Workaround.

##### Usage

```js
$(selector).getText()
```

##### Examples

```html title="index.html"
<div id="elem">
    Lorem ipsum <strong>dolor</strong> sit amet,<br />
    consetetur sadipscing elitr
</div>
<span style="display: none">I am invisible</span>
```

```js title="getText.js"
it('should demonstrate the getText function', async () => {
    const elem = await $('#elem');
    console.log(await elem.getText());
    // outputs the following:
    // "Lorem ipsum dolor sit amet,consetetur sadipscing elitr"

    const span = await $('span');
    console.log(await span.getText());
    // outputs "" (empty string) since element is not interactable
});
it('get content from table cell', async () => {
    await browser.url('http://the-internet.herokuapp.com/tables');
    const rows = await $$('#table1 tr');
    const columns = await rows[1].$$('td'); // get columns of 2nd row
    console.log(await columns[2].getText()); // get text of 3rd column
});
```

##### Returns

- **&lt;String&gt;**
            **<code><var>return</var></code>:** Inhalt des ausgewählten Elements (alle HTML-Tags werden entfernt)
