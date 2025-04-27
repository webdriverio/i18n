---
id: getHTML
title: getHTML
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getHTML.ts
---

Holt den Quellcode des angegebenen DOM-Elements anhand des Selektors. Standardmäßig durchdringt es automatisch
alle Shadow Roots von Elementen, die im Element enthalten sind.

##### Verwendung

```js
$(selector).getHTML({ includeSelectorTag, pierceShadowRoot, removeCommentNodes, prettify })
```

##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`GetHTMLOptions`</td>
      <td>Befehlsoptionen</td>
    </tr>
    <tr>
      <td><code><var>options.includeSelectorTag</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>wenn true, wird das Selector-Element-Tag eingeschlossen (Standard: `true`)</td>
    </tr>
    <tr>
      <td><code><var>options.pierceShadowRoot</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>wenn true, wird der Inhalt der Shadow Roots aller Webkomponenten im DOM eingeschlossen (Standard: `true`)</td>
    </tr>
    <tr>
      <td><code><var>options.removeCommentNodes</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>wenn true, werden alle Kommentarknoten aus dem HTML entfernt, z.B. `<!--?lit$206212805$--><!--?lit$206212805$-->` (Standard: `true`)</td>
    </tr>
    <tr>
      <td><code><var>options.prettify</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>wenn true, wird die HTML-Ausgabe formatiert (Standard: `true`)</td>
    </tr>
  </tbody>
</table>

##### Beispiele

```html title="index.html"
<div id="test">
    <span>Lorem ipsum dolor amet</span>
</div>
```

```js title="getHTML.js"
it('should get html for certain elements', async () => {
    var outerHTML = await $('#test').getHTML();
    console.log(outerHTML);
    // outputs:
    // "<div id="test"><span>Lorem ipsum dolor amet</span></div>"

    var innerHTML = await $('#test').getHTML({ includeSelectorTag: false });
    console.log(innerHTML);
    // outputs:
    // "<span>Lorem ipsum dolor amet</span>"
});
```

```js title="getHTMLShadow.js"
it('allows to snapshot shadow dom', async () => {
    await browser.url('https://ionicframework.com/docs/usage/v8/button/basic/demo.html?ionic:mode=md')

    // get snapshot of web component without its styles
    const snapshot = await $('ion-button').getHTML({ excludeElements: ['style'] })

    // assert snapshot
    await expect(snapshot).toMatchInlineSnapshot(`
        <ion-button class="md button button-solid ion-activatable ion-focusable hydrated">Default
            <template shadowrootmode="open">
                <button type="button" class="button-native" part="native">
                <span class="button-inner">
                    <slot name="icon-only"></slot>
                    <slot name="start"></slot>
                    <slot></slot>
                    <slot name="end"></slot>
                </span>
                <ion-ripple-effect role="presentation" class="md hydrated">
                    <template shadowrootmode="open"></template>
                </ion-ripple-effect>
                </button>
            </template>
        </ion-button>
    `)
});
```

##### Rückgabewert

- **&lt;String&gt;**
            **<code><var>return</var></code>:**   das HTML des angegebenen Elements
