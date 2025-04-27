---
id: getHTML
title: getHTML
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getHTML.ts
---

குறிப்பிட்ட DOM கூறுகளின் மூல குறியீட்டை தேர்வாளர் மூலம் பெறுங்கள். இயல்பாக, இது தானியங்கியாக
கூறு கொண்டுள்ள அனைத்து நிழல் வேர்களையும் துளையிடுகிறது.

##### பயன்பாடு

```js
$(selector).getHTML({ includeSelectorTag, pierceShadowRoot, removeCommentNodes, prettify })
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
      <td><code><var>options</var></code></td>
      <td>`GetHTMLOptions`</td>
      <td>கட்டளை விருப்பங்கள்</td>
    </tr>
    <tr>
      <td><code><var>options.includeSelectorTag</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`Boolean`</td>
      <td>உண்மை என்றால் அது தேர்வாளர் கூறு டேக்கை உள்ளடக்குகிறது (இயல்புநிலை: `true`)</td>
    </tr>
    <tr>
      <td><code><var>options.pierceShadowRoot</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`Boolean`</td>
      <td>உண்மை என்றால் DOM-இல் உள்ள அனைத்து வலை கூறுகளின் நிழல் வேர்களின் உள்ளடக்கத்தையும் உள்ளடக்குகிறது (இயல்புநிலை: `true`)</td>
    </tr>
    <tr>
      <td><code><var>options.removeCommentNodes</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`Boolean`</td>
      <td>உண்மை என்றால் HTML-இலிருந்து அனைத்து கருத்து முனைகளையும் அகற்றுகிறது, எ.கா. `<!--?lit$206212805$--><!--?lit$206212805$-->` (இயல்புநிலை: `true`)</td>
    </tr>
    <tr>
      <td><code><var>options.prettify</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`Boolean`</td>
      <td>உண்மை என்றால், html வெளியீடு அழகாக்கப்படும் (இயல்புநிலை: `true`)</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டுகள்

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

##### திரும்பப் பெறுவது

- **&lt;String&gt;**
            **<code><var>return</var></code>:**   குறிப்பிட்ட கூறுகளின் HTML