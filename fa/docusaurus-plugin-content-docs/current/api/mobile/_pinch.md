---
id: pinch
title: پینچ (نیشگون)
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/pinch.ts
---

Performs a pinch gesture on the given element on the screen.

:::info

Pinching is done based on native mobile gestures. It is only supported for the following drivers:
- [appium-uiautomator2-driver](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-pinchclosegesture) for Android
- [appium-xcuitest-driver](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-pinch) for iOS

This command only works with the following up-to-date components:
 - Appium server (version 2.0.0 or higher)
 - `appium-uiautomator2-driver` (for Android)
 - `appium-xcuitest-driver` (for iOS)

Make sure your local or cloud-based Appium environment is regularly updated to avoid compatibility issues.

:::

##### Usage

```js
$(selector).pinch({ duration, scale })
```

##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`PinchOptions`</td>
      <td>گزینه‌های پینچ (اختیاری)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>مدت زمان اجرای حرکت پینچ بر حسب میلی‌ثانیه، حداقل ۵۰۰ میلی‌ثانیه و حداکثر ۱۰۰۰۰ میلی‌ثانیه است. مقدار پیش‌فرض ۱۵۰۰ میلی‌ثانیه (۱.۵ ثانیه) می‌باشد (اختیاری)</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>مقیاس بزرگی پینچ نسبت به صفحه نمایش. مقادیر معتبر باید اعداد اعشاری در محدوده ۰ تا ۱ باشند، که ۱.۰ معادل ۱۰۰٪ است (اختیاری)</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="pinch.js"
it('should demonstrate a pinch on Google maps', async () => {
    const mapsElement = $('//*[@resource-id="com.google.android.apps.maps:id/map_frame"]')
    // Pinch with the default duration scale
    await mapsElement.pinch()
    // Pinch with a custom duration and scale
    await mapsElement.pinch({ duration: 4000, scale: 0.9 })
})
```