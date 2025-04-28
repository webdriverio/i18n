---
id: downloadFile
title: downloadFile
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/downloadFile.ts
---

Seleniumノードを実行しているリモートコンピュータからローカルファイルシステムへ、[`downloadFile`](https://webdriver.io/docs/api/selenium#downloadFile)コマンドを使用してファイルをダウンロードします。

:::info
このコマンドは、Chrome、EdgeまたはFirefoxで[Selenium Grid](https://www.selenium.dev/documentation/en/grid/)を使用し、
capabilitiesに`se:downloadsEnabled`フラグを設定している場合にのみサポートされることに注意してください。
:::

##### 使用法

```js
browser.downloadFile(fileName, targetDirectory)
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
      <td><code><var>fileName</var></code></td>
      <td>`string`</td>
      <td>ファイルへのリモートパス</td>
    </tr>
    <tr>
      <td><code><var>targetDirectory</var></code></td>
      <td>`string`</td>
      <td>ローカルコンピュータ上の対象位置</td>
    </tr>
  </tbody>
</table>