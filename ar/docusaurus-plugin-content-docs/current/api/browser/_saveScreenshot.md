---
id: saveScreenshot
title: حفظ لقطة الشاشة
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/saveScreenshot.ts
---

حفظ لقطة شاشة لسياق التصفح الحالي إلى ملف PNG على نظام التشغيل الخاص بك. كن على علم بأن
بعض سائقي المتصفح يأخذون لقطات شاشة للمستند بأكمله (مثل Geckodriver مع Firefox)
والبعض الآخر يأخذ فقط لقطة للعرض الحالي (مثل Chromedriver مع Chrome).

##### الاستخدام

```js
browser.saveScreenshot(filepath, { fullPage, format, quality, clip })
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
      <td>المسار إلى الصورة المنشأة (لاحقة `.png` مطلوبة) بالنسبة إلى دليل التنفيذ</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`Object`</td>
      <td>خيارات لقطة الشاشة</td>
    </tr>
    <tr>
      <td><code><var>options.fullPage=false</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Boolean`</td>
      <td>ما إذا كان سيتم التقاط لقطة شاشة للصفحة الكاملة أو فقط العرض الحالي</td>
    </tr>
    <tr>
      <td><code><var>options.format='png'</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`String`</td>
      <td>تنسيق لقطة الشاشة (إما `png` أو `jpeg`)</td>
    </tr>
    <tr>
      <td><code><var>options.quality=100</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Number`</td>
      <td>جودة لقطة الشاشة في حالة تنسيق JPEG في نطاق 0-100 بالمائة</td>
    </tr>
    <tr>
      <td><code><var>options.clip</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Object`</td>
      <td>اقتصاص مستطيل من لقطة الشاشة</td>
    </tr>
  </tbody>
</table>

##### أمثلة

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

##### القيم المرجعة

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**                             مخزن مؤقت للقطة الشاشة