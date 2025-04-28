---
id: saveScreenshot
title: ذخیره کردن تصویر صفحه
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/saveScreenshot.ts
---

ذخیره کردن تصویر صفحه مرورگر فعلی به عنوان یک فایل PNG در سیستم عامل شما. توجه داشته باشید که 
برخی از درایورهای مرورگر از کل سند تصویر می‌گیرند (مانند Geckodriver با Firefox)
و برخی دیگر فقط از بخش قابل مشاهده فعلی تصویر می‌گیرند (مانند Chromedriver با Chrome).

##### استفاده

```js
browser.saveScreenshot(filepath, { fullPage, format, quality, clip })
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
      <td>مسیر تصویر تولید شده (پسوند `.png` الزامی است) نسبت به دایرکتوری اجرا</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`Object`</td>
      <td>تنظیمات تصویر صفحه</td>
    </tr>
    <tr>
      <td><code><var>options.fullPage=false</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Boolean`</td>
      <td>آیا از کل صفحه تصویر گرفته شود یا فقط بخش قابل مشاهده فعلی</td>
    </tr>
    <tr>
      <td><code><var>options.format='png'</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`String`</td>
      <td>فرمت تصویر صفحه (یا `png` یا `jpeg`)</td>
    </tr>
    <tr>
      <td><code><var>options.quality=100</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Number`</td>
      <td>کیفیت تصویر صفحه در صورت استفاده از فرمت JPEG در محدوده 0 تا 100 درصد</td>
    </tr>
    <tr>
      <td><code><var>options.clip</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Object`</td>
      <td>برش یک مستطیل از تصویر صفحه</td>
    </tr>
  </tbody>
</table>

##### مثال‌ها

```js title="saveScreenshot.js"
it('should save a screenshot of the browser viewport', async () => {
    await browser.saveScreenshot('./some/path/screenshot.png');
});

it('should save a screenshot of the full page', async () => {
    await browser.saveScreenshot('./some/path/screenshot.png', { fullPage: true });
});

it('should save a screenshot of a specific rectangle', async () => {
    await browser.saveScreenshot('./some/path/screenshot.png', { clip: { x: 0, y: 0, width: 100, height: 100 } });
});

it('should save a screenshot of the full page in JPEG format', async () => {
    await browser.saveScreenshot('./some/path/screenshot.jpeg', { fullPage: true, format: 'jpeg' });
});

it('should save a screenshot of the full page in JPEG format with quality 50', async () => {
    await browser.saveScreenshot('./some/path/screenshot.jpeg', { fullPage: true, format: 'jpeg', quality: 50 });
});

 running from a hook, make sure to explicitly define the hook as async:

```

```js title="wdio.conf.js"
afterTest: async function(test) {
    await browser.saveScreenshot('./some/path/screenshot.png');
}
```

##### بازگشت

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**                             بافر تصویر صفحه