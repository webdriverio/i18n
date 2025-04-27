---
id: getHTML
title: getHTML
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getHTML.ts
---

Получить исходный код указанного DOM-элемента по селектору. По умолчанию, автоматически
проникает через все теневые корни элементов, содержащихся в элементе.

##### Использование

```js
$(selector).getHTML({ includeSelectorTag, pierceShadowRoot, removeCommentNodes, prettify })
```

##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`GetHTMLOptions`</td>
      <td>опции команды</td>
    </tr>
    <tr>
      <td><code><var>options.includeSelectorTag</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`Boolean`</td>
      <td>если true, включает тег элемента селектора (по умолчанию: `true`)</td>
    </tr>
    <tr>
      <td><code><var>options.pierceShadowRoot</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`Boolean`</td>
      <td>если true, включает содержимое теневых корней всех веб-компонентов в DOM (по умолчанию: `true`)</td>
    </tr>
    <tr>
      <td><code><var>options.removeCommentNodes</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`Boolean`</td>
      <td>если true, удаляет все узлы комментариев из HTML, например, `<!--?lit$206212805$--><!--?lit$206212805$-->` (по умолчанию: `true`)</td>
    </tr>
    <tr>
      <td><code><var>options.prettify</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`Boolean`</td>
      <td>если true, вывод HTML будет отформатирован (по умолчанию: `true`)</td>
    </tr>
  </tbody>
</table>

##### Примеры

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

##### Возвращает

- **&lt;String&gt;**
            **<code><var>return</var></code>:**   HTML указанного элемента    
```