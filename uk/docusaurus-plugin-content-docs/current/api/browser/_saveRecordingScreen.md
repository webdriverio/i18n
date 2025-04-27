---
id: saveRecordingScreen
title: saveRecordingScreen
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/saveRecordingScreen.ts
---

Зберегти відео, розпочате командою [`startRecordingScreen`](/docs/api/appium#startrecordingscreen), у файл.

:::info

Ця команда підтримується тільки для мобільних сесій, що працюють на [Appium](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/start-recording-screen/).

:::

##### Використання

```js
browser.saveRecordingScreen(filepath)
```

##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>filepath</var></code></td>
      <td>`String`</td>
      <td>повний або відносний до директорії виконання шлях до згенерованого відео</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js title="saveRecordingScreen.js"
it('should save a video', async () => {
    await browser.startRecordingScreen();
    await $('~BUTTON').click();
    await browser.saveRecordingScreen('./some/path/video.mp4');
});
```

##### Повертає

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**             відео буфер