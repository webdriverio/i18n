---
id: getProperty
title: getProperty
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getProperty.ts
---

要素のプロパティを取得するコマンドで、要素のプロパティの結果を返します。

##### 使い方

```js
$(selector).getProperty(property)
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
      <td><code><var>property</var></code></td>
      <td>`string`</td>
      <td>要素のプロパティ名</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="getProperty.js"
it('should demonstrate the getProperty command', async () => {
    var elem = await $('body')
    var tag = await elem.getProperty('tagName')
    console.log(tag) // outputs: "BODY"
})
```

##### 戻り値

- **&lt;unknown&gt;**
            **<code><var>return</var></code>:** 選択した要素のプロパティの値