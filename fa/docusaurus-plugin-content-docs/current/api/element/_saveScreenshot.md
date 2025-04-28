---
id: saveScreenshot
title: saveScreenshot
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/saveScreenshot.ts
---

ذخیره کردن تصویر از یک المان به فایل PNG در سیستم عامل شما.

##### استفاده

```js
$(selector).saveScreenshot(filename)
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
      <td><code><var>filename</var></code></td>
      <td>`String`</td>
      <td>مسیر به تصویر تولید شده (پسوند `.png` مورد نیاز است) نسبت به دایرکتوری اجرا</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="saveScreenshot.js"
it('should save a screenshot of the browser view', async () => {
    const elem = await $('#someElem');
    await elem.saveScreenshot('./some/path/elemScreenshot.png');
});
```

##### برمی‌گرداند

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**             بافر تصویر