---
id: keys
title: キー操作
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/keys.ts
---

「アクティブな」要素にキーストロークのシーケンスを送信します。入力要素をクリックするだけでアクティブにすることができます。「左矢印」や「バックスペース」などの特殊キーを使用するには、WebdriverIOパッケージから`Key`オブジェクトをインポートしてください。

`Control`、`Shift`、`Alt`、`Command`などの修飾キーは押された状態を維持するため、解除するには再度トリガーする必要があります。ただし、クリックの修飾は[performActions](https://webdriver.io/docs/api/webdriver#performactions)メソッドを通じてWebDriver Actions APIを使用する必要があります。

:::info

制御キーはブラウザが実行されているオペレーティングシステムによって異なります（例：MacOSでは`Command`、Windowsでは`Control`）。
WebdriverIOはクロスブラウザの修飾制御キーとして`Ctrl`を提供しています（以下の例を参照）。

:::

##### 使用方法

```js
browser.keys(value)
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
      <td>`String, String[]`</td>
      <td>入力するキーのシーケンス。配列または文字列を指定する必要があります。</td>
    </tr>
  </tbody>
</table>

##### 例

```js reference title="keys.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/355434bdef13d29608d6d5fbfbeaa034c8a2aa74/keys/keys.js#L1-L17
```