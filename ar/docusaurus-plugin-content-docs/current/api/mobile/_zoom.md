---
id: zoom
title: تكبير
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/zoom.ts
---

يؤدي إيماءة التكبير على العنصر المحدد على الشاشة.

:::info

يتم التكبير بناءً على إيماءات الجوال الأصلية. وهو مدعوم فقط لبرامج التشغيل التالية:
- [appium-uiautomator2-driver](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-pinchopengesture) لنظام أندرويد
- [appium-xcuitest-driver](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-pinch) لنظام iOS

يعمل هذا الأمر فقط مع المكونات التالية المحدثة:
 - خادم Appium (الإصدار 2.0.0 أو أعلى)
 - `appium-uiautomator2-driver` (لنظام أندرويد)
 - `appium-xcuitest-driver` (لنظام iOS)

تأكد من تحديث بيئة Appium المحلية أو السحابية بانتظام لتجنب مشاكل التوافق.

:::

##### الاستخدام

```js
$(selector).zoom({ duration, scale })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`PinchAndZoomOptions`</td>
      <td>خيارات التكبير (اختياري)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>المدة بالميلي ثانية لمدى سرعة تنفيذ التكبير، الحد الأدنى هو 500 ميلي ثانية والحد الأقصى هو 10000 ميلي ثانية. القيمة الافتراضية هي 1500 ميلي ثانية (1.5 ثانية) (اختياري)</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>مقياس مدى كبر التكبير وفقاً للشاشة. يجب أن تكون القيم الصالحة أرقاماً عشرية في النطاق 0..1، حيث تمثل 1.0 نسبة 100% (اختياري)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="zoom.js"
it('should demonstrate a zoom on Google maps', async () => {
    const mapsElement = $('//*[@resource-id="com.google.android.apps.maps:id/map_frame"]')
    // Zoom with the default duration scale
    await mapsElement.zoom()
    // Zoom with a custom duration and scale
    await mapsElement.zoom({ duration: 4000, scale: 0.9 })
})
```