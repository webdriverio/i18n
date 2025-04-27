---
id: saveRecordingScreen
title: saveRecordingScreen
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/saveRecordingScreen.ts
---

Сохранение видео, начатого командой [`startRecordingScreen`](/docs/api/appium#startrecordingscreen), в файл.

:::info

Эта команда поддерживается только для мобильных сессий, работающих на [Appium](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/start-recording-screen/).

:::

##### Использование

```js
browser.saveRecordingScreen(filepath)
```

##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>filepath</var></code></td>
      <td>`String`</td>
      <td>полный или относительный путь к директории выполнения для сгенерированного видео</td>
    </tr>
  </tbody>
</table>

##### Пример

```js title="saveRecordingScreen.js"
it('should save a video', async () => {
    await browser.startRecordingScreen();
    await $('~BUTTON').click();
    await browser.saveRecordingScreen('./some/path/video.mp4');
});
```

##### Возвращает

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**             видео буфер