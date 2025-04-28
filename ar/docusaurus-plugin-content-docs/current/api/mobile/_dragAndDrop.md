---
id: dragAndDrop
title: السحب والإفلات
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/dragAndDrop.ts
---

سحب عنصر إلى عنصر وجهة أو موضع محدد.

:::info

تعتمد وظيفة هذا الأمر بشكل كبير على طريقة تنفيذ السحب والإفلات في تطبيقك. إذا واجهت مشاكل، يرجى نشر مثالك في 
[#4134](https://github.com/webdriverio/webdriverio/issues/4134).

تأكد أيضًا من أن العنصر الذي تقوم بسحبه والهدف الذي تقوم بالإفلات فيه ظاهران على الشاشة.

يعمل هذا الأمر فقط مع المكونات المحدثة التالية:
 - خادم Appium (الإصدار 2.0.0 أو أعلى)
 - `appium-uiautomator2-driver` (لنظام Android)
 - `appium-xcuitest-driver` (لنظام iOS)

تأكد من تحديث بيئة Appium المحلية أو السحابية بانتظام لتجنب مشاكل التوافق.

:::

##### الاستخدام

```js
$(selector).dragAndDrop(target, { duration })
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
      <td><code><var>target</var></code></td>
      <td>`Element, DragAndDropCoordinate`</td>
      <td>عنصر الوجهة أو كائن به خصائص x و y</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`DragAndDropOptions`</td>
      <td>خيارات أمر السحب والإفلات</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Number`</td>
      <td>المدة التي يجب أن تستغرقها عملية السحب</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="example.test.js"
it('should demonstrate the dragAndDrop command', async () => {
    const elem = $('#someElem')
    const target = $('#someTarget')

    // drag and drop to other element
    await elem.dragAndDrop(target)

    // drag and drop relative from current position
    await elem.dragAndDrop({ x: 100, y: 200 })
})
```