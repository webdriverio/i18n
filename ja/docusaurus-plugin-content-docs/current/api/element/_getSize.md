---
id: getSize
title: getSize
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getSize.ts
---

DOM要素の幅と高さを取得します。

##### 使用方法

```js
$(selector).getSize(prop)
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
      <td><code><var>prop</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`String`</td>
      <td>取得するサイズ [オプション] ("width"または"height")</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="getSize.js"
it('should demonstrate the getSize command', async () => {
    await browser.url('http://github.com')
    const logo = await $('.octicon-mark-github')

    const size = await logo.getSize()
    console.log(size) // outputs: { width: 32, height: 32 }

    const width = await logo.getSize('width')
    console.log(width) // outputs: 32

    const height = await logo.getSize('height')
    console.log(height) // outputs: 32
})
```

##### 戻り値

- **&lt;Object|Number&gt;**
            **<code><var>return</var></code>:**     要求された要素のサイズ (`{ width: <Number>, height: <Number> }`) または、propパラメータが指定された場合は実際の幅/高さを数値で返します