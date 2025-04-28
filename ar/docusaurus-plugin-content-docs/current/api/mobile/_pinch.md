---
id: pinch
title: القرص
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/pinch.ts
---

يقوم بإجراء حركة قرص على العنصر المحدد على الشاشة.

:::info

تتم حركة القرص باستخدام الإيماءات الأصلية للجوال. وهي مدعومة فقط للسائقين التاليين:
- [appium-uiautomator2-driver](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-pinchclosegesture) لنظام Android
- [appium-xcuitest-driver](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-pinch) لنظام iOS

يعمل هذا الأمر فقط مع المكونات المحدثة التالية:
 - خادم Appium (الإصدار 2.0.0 أو أحدث)
 - `appium-uiautomator2-driver` (لنظام Android)
 - `appium-xcuitest-driver` (لنظام iOS)

تأكد من تحديث بيئة Appium المحلية أو السحابية بانتظام لتجنب مشاكل التوافق.

:::

##### الاستخدام

```js
$(selector).pinch({ duration, scale })
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
      <td>`PinchOptions`</td>
      <td>خيارات القرص (اختياري)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>المدة بالميلي ثانية لمدى سرعة تنفيذ حركة القرص، الحد الأدنى هو 500 ميلي ثانية والحد الأقصى هو 10000 ميلي ثانية. القيمة الافتراضية هي 1500 ميلي ثانية (1.5 ثانية) (اختياري)</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>مقياس حجم القرص بالنسبة للشاشة. يجب أن تكون القيم الصالحة أرقامًا عشرية في النطاق 0..1، حيث 1.0 تمثل 100% (اختياري)</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="pinch.js"
it('should demonstrate a pinch on Google maps', async () => {
    const mapsElement = $('//*[@resource-id="com.google.android.apps.maps:id/map_frame"]')
    // Pinch with the default duration scale
    await mapsElement.pinch()
    // Pinch with a custom duration and scale
    await mapsElement.pinch({ duration: 4000, scale: 0.9 })
})
```