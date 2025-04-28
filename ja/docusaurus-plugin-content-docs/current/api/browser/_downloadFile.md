---
id: downloadFile
title: downloadFile
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/downloadFile.ts
---

[`downloadFile`](https://webdriver.io/docs/api/selenium#downloadFile) コマンドを使用して、Seleniumノードを実行しているリモートコンピュータからローカルファイルシステムにファイルをダウンロードします。

:::info
このコマンドは、Chrome、Edge、Firefoxを使用した[Selenium Grid](https://www.selenium.dev/documentation/en/grid/)を使用し、
capabilities に `se:downloadsEnabled` フラグが設定されている場合にのみサポートされることに注意してください。
:::

##### 使用方法

```js
browser.downloadFile(fileName, targetDirectory)
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
      <td><code><var>fileName</var></code></td>
      <td>`string`</td>
      <td>ファイルへのリモートパス</td>
    </tr>
    <tr>
      <td><code><var>targetDirectory</var></code></td>
      <td>`string`</td>
      <td>ローカルコンピュータ上のターゲット場所</td>
    </tr>
  </tbody>
</table>