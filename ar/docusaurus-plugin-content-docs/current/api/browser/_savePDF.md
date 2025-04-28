---
id: savePDF
title: حفظ PDF
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/savePDF.ts
---

يقوم بطباعة صفحة سياق التصفح الحالي إلى ملف PDF على نظام التشغيل الخاص بك.

##### الاستخدام

```js
browser.savePDF(filepath, { orientation, scale, background, width, height, top, bottom, left, right, shrinkToFit, pageRanges })
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
      <td>المسار إلى ملف PDF المُنشأ (اللاحقة `.pdf` مطلوبة) بالنسبة لدليل التنفيذ</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`PDFPrintOptions`</td>
      <td>خيارات طباعة PDF</td>
    </tr>
    <tr>
      <td><code><var>options.orientation</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`String`</td>
      <td>اتجاه صفحة PDF</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>مقياس صفحة PDF</td>
    </tr>
    <tr>
      <td><code><var>options.background</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`boolean`</td>
      <td>تضمين خلفية صفحة PDF</td>
    </tr>
    <tr>
      <td><code><var>options.width</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>عرض صفحة PDF</td>
    </tr>
    <tr>
      <td><code><var>options.height</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>ارتفاع صفحة PDF</td>
    </tr>
    <tr>
      <td><code><var>options.top</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>تباعد علوي لصفحة PDF</td>
    </tr>
    <tr>
      <td><code><var>options.bottom</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>تباعد سفلي لصفحة PDF</td>
    </tr>
    <tr>
      <td><code><var>options.left</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>تباعد أيسر لصفحة PDF</td>
    </tr>
    <tr>
      <td><code><var>options.right</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>تباعد أيمن لصفحة PDF</td>
    </tr>
    <tr>
      <td><code><var>options.shrinkToFit</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`boolean`</td>
      <td>تقليص الصفحة لتناسب الصفحة</td>
    </tr>
    <tr>
      <td><code><var>options.pageRanges</var></code></td>
      <td>`object[]`</td>
      <td>نطاق الصفحات المراد تضمينها في PDF</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="savePDF.js"
it('should save a PDF screenshot of the browser view', function () {
    await browser.savePDF('./some/path/screenshot.pdf');
});
```

##### الإرجاع

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**    مخزن مؤقت للقطة الشاشة