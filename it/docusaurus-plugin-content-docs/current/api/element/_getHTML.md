---
id: getHTML
title: getHTML
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getHTML.ts
---

Ottieni il codice sorgente dell'elemento DOM specificato tramite selettore. Per impostazione predefinita, attraversa automaticamente
tutte le shadow root degli elementi contenuti nell'elemento.

##### Utilizzo

```js
$(selector).getHTML({ includeSelectorTag, pierceShadowRoot, removeCommentNodes, prettify })
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
      <td><code><var>options</var></code></td>
      <td>`GetHTMLOptions`</td>
      <td>opzioni del comando</td>
    </tr>
    <tr>
      <td><code><var>options.includeSelectorTag</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Boolean`</td>
      <td>se true include il tag dell'elemento selettore (predefinito: `true`)</td>
    </tr>
    <tr>
      <td><code><var>options.pierceShadowRoot</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Boolean`</td>
      <td>se true include il contenuto delle shadow root di tutti i componenti web nel DOM (predefinito: `true`)</td>
    </tr>
    <tr>
      <td><code><var>options.removeCommentNodes</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Boolean`</td>
      <td>se true rimuove tutti i nodi di commento dall'HTML, ad esempio `<!--?lit$206212805$--><!--?lit$206212805$-->` (predefinito: `true`)</td>
    </tr>
    <tr>
      <td><code><var>options.prettify</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Boolean`</td>
      <td>se true, l'output HTML sarà formattato in modo leggibile (predefinito: `true`)</td>
    </tr>
  </tbody>
</table>

##### Esempi

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

##### Restituisce

- **&lt;String&gt;**
            **<code><var>return</var></code>:**   l'HTML dell'elemento specificato