---
id: getHTML
title: getHTML
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getHTML.ts
---

获取通过选择器指定的DOM元素的源代码。默认情况下，它会自动穿透元素包含的所有shadow roots。

##### 用法

```js
$(selector).getHTML({ includeSelectorTag, pierceShadowRoot, removeCommentNodes, prettify })
```

##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`GetHTMLOptions`</td>
      <td>命令选项</td>
    </tr>
    <tr>
      <td><code><var>options.includeSelectorTag</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Boolean`</td>
      <td>如果为true，则包含选择器元素标签（默认：`true`）</td>
    </tr>
    <tr>
      <td><code><var>options.pierceShadowRoot</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Boolean`</td>
      <td>如果为true，则包含DOM中所有Web组件的shadow roots内容（默认：`true`）</td>
    </tr>
    <tr>
      <td><code><var>options.removeCommentNodes</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Boolean`</td>
      <td>如果为true，则从HTML中删除所有注释节点，例如 `<!--?lit$206212805$--><!--?lit$206212805$-->`（默认：`true`）</td>
    </tr>
    <tr>
      <td><code><var>options.prettify</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Boolean`</td>
      <td>如果为true，HTML输出将被美化（默认：`true`）</td>
    </tr>
  </tbody>
</table>

##### 示例

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

##### 返回值

- **&lt;String&gt;**
            **<code><var>return</var></code>:**   指定元素的HTML代码