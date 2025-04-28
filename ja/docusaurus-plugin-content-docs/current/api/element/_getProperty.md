---
id: getProperty
title: getProperty
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getProperty.ts
---

Get Element Propertyコマンドは、要素のプロパティを取得した結果を返します。

##### 使用方法

```js
$(selector).getProperty(property)
```

##### パラメータ

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>property</var></code></td>
      <td>`string`</td>
      <td>要素プロパティの名前</td>
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
            **<code><var>return</var></code>:** 選択された要素のプロパティの値