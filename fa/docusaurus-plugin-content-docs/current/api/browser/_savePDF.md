---
id: savePDF
title: ذخیره PDF
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/savePDF.ts
---

صفحه مرورگر فعلی را در یک فایل PDF در سیستم عامل شما چاپ می‌کند.

##### استفاده

```js
browser.savePDF(filepath, { orientation, scale, background, width, height, top, bottom, left, right, shrinkToFit, pageRanges })
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
      <td>مسیر فایل PDF تولید شده (پسوند `.pdf` الزامی است) نسبت به دایرکتوری اجرایی</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`PDFPrintOptions`</td>
      <td>گزینه‌های چاپ PDF</td>
    </tr>
    <tr>
      <td><code><var>options.orientation</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`String`</td>
      <td>جهت صفحه PDF</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`number`</td>
      <td>مقیاس صفحه PDF</td>
    </tr>
    <tr>
      <td><code><var>options.background</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`boolean`</td>
      <td>شامل کردن پس‌زمینه صفحه PDF</td>
    </tr>
    <tr>
      <td><code><var>options.width</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`number`</td>
      <td>عرض صفحه PDF</td>
    </tr>
    <tr>
      <td><code><var>options.height</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`number`</td>
      <td>ارتفاع صفحه PDF</td>
    </tr>
    <tr>
      <td><code><var>options.top</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`number`</td>
      <td>فاصله از بالای صفحه PDF</td>
    </tr>
    <tr>
      <td><code><var>options.bottom</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`number`</td>
      <td>فاصله از پایین صفحه PDF</td>
    </tr>
    <tr>
      <td><code><var>options.left</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`number`</td>
      <td>فاصله از چپ صفحه PDF</td>
    </tr>
    <tr>
      <td><code><var>options.right</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`number`</td>
      <td>فاصله از راست صفحه PDF</td>
    </tr>
    <tr>
      <td><code><var>options.shrinkToFit</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`boolean`</td>
      <td>کوچک کردن صفحه برای متناسب‌سازی</td>
    </tr>
    <tr>
      <td><code><var>options.pageRanges</var></code></td>
      <td>`object[]`</td>
      <td>محدوده صفحات برای گنجاندن در PDF</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="savePDF.js"
it('should save a PDF screenshot of the browser view', function () {
    await browser.savePDF('./some/path/screenshot.pdf');
});
```

##### برگشتی

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**    بافر تصویر    