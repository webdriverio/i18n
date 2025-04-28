---
id: setValue
title: setValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/setValue.ts
---

入力をクリアした後に要素にキーストロークのシーケンスを送信します。要素を最初にクリアする必要がない場合は、[`addValue`](/docs/api/element/addValue)を使用してください。

:::info

特殊文字を使用したい場合、例えば値をある入力フィールドから別の入力フィールドにコピー＆ペーストする場合は、
[`keys`](/docs/api/browser/keys)コマンドを使用してください。

:::

##### 使用法

```js
$(selector).setValue(value)
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

```js title="setValue.js"
it('should set value for a certain element', async () => {
    const input = await $('.input');
    await input.setValue('test')
    await input.setValue(123)

    console.log(await input.getValue()); // outputs: '123'
});
```