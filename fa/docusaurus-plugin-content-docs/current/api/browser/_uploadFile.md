---
id: uploadFile
title: آپلود فایل
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/uploadFile.ts
---

فایلی را به سرور Selenium Standalone یا سایر درایورهای مرورگر 
(مانند Chromedriver یا EdgeDriver) با استفاده از دستور [`file`](https://webdriver.io/docs/api/selenium#file) آپلود می‌کند.
_توجه:_ این دستور فقط در صورتی پشتیبانی می‌شود که از Selenium Hub،
Chromedriver یا EdgeDriver به طور مستقیم استفاده کنید.

__توجه:__ این دستور از ویژگی غیر رسمی پروتکل استفاده می‌کند که در حال حاضر
فقط در کروم و هنگام اجرای [Selenium Grid](https://www.selenium.dev/documentation/en/grid/) پشتیبانی می‌شود.

##### استفاده

```js
browser.uploadFile(localPath)
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
      <td><code><var>localPath</var></code></td>
      <td>`string`</td>
      <td>مسیر محلی به فایل</td>
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

##### مقادیر بازگشتی

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  URL از راه دور