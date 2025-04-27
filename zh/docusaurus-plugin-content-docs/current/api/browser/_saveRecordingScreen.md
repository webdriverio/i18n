---
id: saveRecordingScreen
title: 保存屏幕录制
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/saveRecordingScreen.ts
---

将通过 [`startRecordingScreen`](/docs/api/appium#startrecordingscreen) 命令开始的视频保存到文件。

:::info

此命令仅支持在 [Appium](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/start-recording-screen/) 上运行的移动会话。

:::

##### 用法

```js
browser.saveRecordingScreen(filepath)
```

##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>filepath</var></code></td>
      <td>`String`</td>
      <td>生成视频的完整路径或相对于执行目录的路径</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="saveRecordingScreen.js"
it('should save a video', async () => {
    await browser.startRecordingScreen();
    await $('~BUTTON').click();
    await browser.saveRecordingScreen('./some/path/video.mp4');
});
```

##### 返回

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**             视频缓冲区