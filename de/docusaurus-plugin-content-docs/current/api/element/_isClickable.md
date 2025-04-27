---
id: isClickable
title: isClickable
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isClickable.ts
---

Ein Element gilt als anklickbar, wenn die folgenden Bedingungen erfüllt sind:

- das Element existiert
- das Element wird angezeigt
- das Element ist nicht deaktiviert
- das Element befindet sich innerhalb des Viewports
- das Element kann in den Viewport gescrollt werden
- die Mitte des Elements wird nicht von einem anderen Element überlappt

andernfalls wird false zurückgegeben.

:::info

Bitte beachten Sie, dass `isClickable` nur in Webbrowsern und in mobilen Webviews funktioniert,
es funktioniert nicht im nativen Kontext mobiler Apps. Im Gegensatz zu anderen Element-
Befehlen wartet WebdriverIO nicht darauf, dass das Element existiert, um diesen Befehl auszuführen.

:::

##### Verwendung

```js
$(selector).isClickable()
```

##### Beispiel

```js title="isClickable.js"
it('should detect if an element is clickable', async () => {
    const el = await $('#el')
    let clickable = await el.isClickable();
    console.log(clickable); // outputs: true or false

    // wait for element to be clickable
    await browser.waitUntil(() => el.isClickable())
});
```

##### Gibt zurück

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**             true wenn Element anklickbar ist