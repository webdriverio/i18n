---
id: saveRecordingScreen
title: ذخیره‌سازی صفحه در حال ضبط
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/saveRecordingScreen.ts
---

ذخیره یک ویدیو که با دستور [`startRecordingScreen`](/docs/api/appium#startrecordingscreen) شروع شده است در فایل.

:::info

این دستور فقط برای جلسات موبایل که روی [Appium](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/start-recording-screen/) اجرا می‌شوند پشتیبانی می‌شود.

:::

##### استفاده

```js
browser.saveRecordingScreen(filepath)
```

##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>filepath</var></code></td>
      <td>`String`</td>
      <td>مسیر کامل یا نسبی به دایرکتوری اجرایی برای ویدیوی تولید شده</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="saveRecordingScreen.js"
it('should save a video', async () => {
    await browser.startRecordingScreen();
    await $('~BUTTON').click();
    await browser.saveRecordingScreen('./some/path/video.mp4');
});
```

##### خروجی

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**             بافر ویدیو