---
id: moveTo
title: تحريك إلى
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/moveTo.ts
---

تحريك الماوس بإزاحة للعنصر المحدد. إذا لم يتم تحديد عنصر، ستكون الحركة نسبية إلى مؤشر الماوس الحالي. إذا تم توفير عنصر ولكن بدون إزاحة، سيتم تحريك الماوس إلى وسط العنصر. إذا كان العنصر غير مرئي، سيتم التمرير لعرضه.

##### الاستخدام

```js
$(selector).moveTo({ xOffset, yOffset })
```

##### المعاملات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`MoveToOptions`</td>
      <td>خيارات أمر moveTo</td>
    </tr>
    <tr>
      <td><code><var>options.xOffset</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Number`</td>
      <td>إزاحة X للتحرك إليها، نسبة إلى مركز العنصر. إذا لم يتم تحديدها، سيتحرك الماوس إلى وسط العنصر.</td>
    </tr>
    <tr>
      <td><code><var>options.yOffset</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Number`</td>
      <td>إزاحة Y للتحرك إليها، نسبة إلى مركز العنصر. إذا لم يتم تحديدها، سيتحرك الماوس إلى وسط العنصر.</td>
    </tr>
  </tbody>
</table>