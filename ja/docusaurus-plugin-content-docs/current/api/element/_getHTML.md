---
id: getHTML
title: getHTML
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getHTML.ts
---

セレクターで指定されたDOM要素のソースコードを取得します。デフォルトでは、要素に含まれるすべての要素のシャドウルートを自動的に貫通します。

##### 使用方法

```js
$(selector).getHTML({ includeSelectorTag, pierceShadowRoot, removeCommentNodes, prettify })
```

##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`GetHTMLOptions`</td>
      <td>コマンドオプション</td>
    </tr>
    <tr>
      <td><code><var>options.includeSelectorTag</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Boolean`</td>
      <td>trueの場合、セレクター要素タグを含めます（デフォルト: `true`）</td>
    </tr>
    <tr>
      <td><code><var>options.pierceShadowRoot</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Boolean`</td>
      <td>trueの場合、DOM内のすべてのWebコンポーネントのシャドウルートのコンテンツを含めます（デフォルト: `true`）</td>
    </tr>
    <tr>
      <td><code><var>options.removeCommentNodes</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Boolean`</td>
      <td>trueの場合、HTMLからすべてのコメントノードを削除します。例：`<!--?lit$206212805$--><!--?lit$206212805$-->`（デフォルト: `true`）</td>
    </tr>
    <tr>
      <td><code><var>options.prettify</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Boolean`</td>
      <td>trueの場合、HTML出力を整形します（デフォルト: `true`）</td>
    </tr>
  </tbody>
</table>

##### 例

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

##### 戻り値

- **&lt;String&gt;**
            **<code><var>return</var></code>:**   指定された要素のHTML