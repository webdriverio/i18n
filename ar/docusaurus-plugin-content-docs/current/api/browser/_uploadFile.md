---
id: uploadFile
title: تحميل الملف
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/uploadFile.ts
---

يقوم بتحميل ملف إلى خادم Selenium Standalone أو برنامج تشغيل متصفح آخر
(مثل Chromedriver أو EdgeDriver) باستخدام أمر [`file`](https://webdriver.io/docs/api/selenium#file).
_ملاحظة:_ هذا الأمر مدعوم فقط إذا كنت تستخدم Selenium Hub،
أو Chromedriver أو EdgeDriver مباشرة.

__ملاحظة:__ يستخدم هذا الأمر ميزة بروتوكول غير رسمية مدعومة حاليًا
فقط في Chrome وعند تشغيل [Selenium Grid](https://www.selenium.dev/documentation/en/grid/).

##### الاستخدام

```js
browser.uploadFile(localPath)
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
      <td><code><var>localPath</var></code></td>
      <td>`string`</td>
      <td>المسار المحلي للملف</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="uploadFile.js"
import path from 'node:path'

it('should upload a file', async () => {
    await browser.url('https://the-internet.herokuapp.com/upload')

    const filePath = '/path/to/some/file.png'
    const remoteFilePath = await browser.uploadFile(filePath)

    await $('#file-upload').setValue(remoteFilePath)
    await $('#file-submit').click()
});
```

##### القيمة المرجعة

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  عنوان URL عن بعد