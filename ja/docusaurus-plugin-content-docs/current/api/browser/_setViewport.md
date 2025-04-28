---
id: setViewport
title: setViewport（ビューポートの設定）
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setViewport.ts
---

ブラウザ内でブラウザのビューポートのサイズを変更します。`setWindowSize`とは異なり、
このコマンドはウィンドウサイズではなく、ビューポートサイズを変更します。

##### 使用方法

```js
browser.setViewport({ width, height, devicePixelRatio })
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
      <td>`SetViewportOptions`</td>
      <td>コマンド引数</td>
    </tr>
    <tr>
      <td><code><var>options.width</var></code></td>
      <td>`number`</td>
      <td>ビューポートの幅（ピクセル単位）</td>
    </tr>
    <tr>
      <td><code><var>options.height</var></code></td>
      <td>`number`</td>
      <td>ビューポートの高さ（ピクセル単位）</td>
    </tr>
    <tr>
      <td><code><var>options.devicePixelRatio</var></code></td>
      <td>`number`</td>
      <td>ビューポートのピクセル比</td>
    </tr>
  </tbody>
</table>

##### 戻り値

- **&lt;`Promise<void>`&gt;**