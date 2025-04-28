---
id: setWindowSize
title: ウィンドウサイズの設定
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setWindowSize.ts
---

指定された幅と高さに従って、ブラウザウィンドウの外側のサイズを変更します。お使いのオペレーティングシステムによっては、ブラウザウィンドウの幅が`500px`より小さくなることを許可しない場合があります。例えばiPhoneのビューポートを模倣したい場合は、`setViewport`コマンドの使用を検討してください。

##### 使用方法

```js
browser.setWindowSize(width, height)
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
      <td><code><var>width</var></code></td>
      <td>`number`</td>
      <td>ブラウザは指定された幅にリサイズされます</td>
    </tr>
    <tr>
      <td><code><var>height</var></code></td>
      <td>`number`</td>
      <td>ブラウザは指定された高さにリサイズされます</td>
    </tr>
  </tbody>
</table>

##### 戻り値

- **&lt;Null|Object&gt;**
            **<code><var>return</var></code>:**  非W3Cブラウザの場合はNull、W3Cブラウザの場合はオブジェクト `{x, y, width, height}`