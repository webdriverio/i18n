---
id: isClickable
title: isClickable
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isClickable.ts
---

Un elemento è considerato cliccabile quando sono soddisfatte le seguenti condizioni:

- l'elemento esiste
- l'elemento è visualizzato
- l'elemento non è disabilitato
- l'elemento è all'interno del viewport
- l'elemento può essere scorribile all'interno del viewport
- il centro dell'elemento non è sovrapposto con un altro elemento

altrimenti restituisce false.

:::info

Si noti che `isClickable` funziona solo nei browser web e nelle webview mobili,
non funziona nel contesto nativo delle app mobili. Inoltre, a differenza di altri comandi
di elemento, WebdriverIO non attenderà che l'elemento esista per eseguire questo comando.

:::

##### Utilizzo

```js
$(selector).isClickable()
```

##### Esempio

```js title="isClickable.js"
it('should detect if an element is clickable', async () => {
    const el = await $('#el')
    let clickable = await el.isClickable();
    console.log(clickable); // outputs: true or false

    // wait for element to be clickable
    await browser.waitUntil(() => el.isClickable())
});
```

##### Restituisce

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**             true se l'elemento è cliccabile