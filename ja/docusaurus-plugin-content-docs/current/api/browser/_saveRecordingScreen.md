---
id: saveRecordingScreen
title: saveRecordingScreen
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/saveRecordingScreen.ts
---

[`startRecordingScreen`](/docs/api/appium#startrecordingscreen)コマンドで開始した画面録画をファイルに保存します。

:::info

このコマンドは、[Appium](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/start-recording-screen/)で実行されているモバイルセッションでのみサポートされています。

:::

##### 使用法

```js
browser.saveRecordingScreen(filepath)
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
      <td><code><var>filepath</var></code></td>
      <td>`String`</td>
      <td>生成されたビデオへの完全または実行ディレクトリからの相対パス</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="saveRecordingScreen.js"
it('should save a video', async () => {
    await browser.startRecordingScreen();
    await $('~BUTTON').click();
    await browser.saveRecordingScreen('./some/path/video.mp4');
});
```

##### 戻り値

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**             ビデオバッファ