---
id: saveRecordingScreen
title: حفظ تسجيل الشاشة
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/saveRecordingScreen.ts
---

حفظ فيديو تم بدؤه بواسطة أمر [`startRecordingScreen`](/docs/api/appium#startrecordingscreen) إلى ملف.

:::info

هذا الأمر مدعوم فقط لجلسات الموبايل التي تعمل على [Appium](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/start-recording-screen/).

:::

##### الاستخدام

```js
browser.saveRecordingScreen(filepath)
```

##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>filepath</var></code></td>
      <td>`String`</td>
      <td>المسار الكامل أو النسبي لدليل التنفيذ للفيديو المُنشأ</td>
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

##### الإرجاع

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**             buffer الفيديو