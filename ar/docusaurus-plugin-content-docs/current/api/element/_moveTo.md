---
id: moveTo
title: تحريك إلى
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/moveTo.ts
---

حرك الماوس بمقدار إزاحة للعنصر المحدد. إذا لم يتم تحديد أي عنصر،
فإن التحريك سيكون نسبيًا لموضع مؤشر الماوس الحالي. إذا تم توفير عنصر ولكن
بدون إزاحة، سيتم تحريك الماوس إلى مركز العنصر. إذا كان العنصر
غير مرئي، سيتم التمرير إليه ليظهر في الواجهة.

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
      <td>خيارات أمر التحريك</td>
    </tr>
    <tr>
      <td><code><var>options.xOffset</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Number`</td>
      <td>إزاحة X المراد التحرك إليها، بالنسبة لمركز العنصر. إذا لم يتم تحديدها، سيتحرك الماوس إلى مركز العنصر.</td>
    </tr>
    <tr>
      <td><code><var>options.yOffset</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Number`</td>
      <td>إزاحة Y المراد التحرك إليها، بالنسبة لمركز العنصر. إذا لم يتم تحديدها، سيتحرك الماوس إلى مركز العنصر.</td>
    </tr>
  </tbody>
</table>