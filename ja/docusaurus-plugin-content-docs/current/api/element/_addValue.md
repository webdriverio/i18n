---
id: addValue
title: addValue（値を追加）
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/addValue.ts
---

指定されたセレクタで見つかった入力要素またはテキストエリア要素に値を追加します。

:::info

特殊文字を使用したい場合、例えば、ある入力から別の入力に値をコピー＆ペーストするには、
[`keys`](/docs/api/browser/keys)コマンドを使用してください。

:::

##### 使用方法

```js
$(selector).addValue(value)
```

##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>タイプ</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>value</var></code></td>
      <td>`string, number`</td>
      <td>追加する値</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="addValue.js"
it('should demonstrate the addValue command', async () => {
    let input = await $('.input')
    await input.addValue('test')
    await input.addValue(123)

    value = await input.getValue()
    assert(value === 'test123') // true
})
```