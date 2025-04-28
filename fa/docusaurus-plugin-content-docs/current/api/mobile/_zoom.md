---
id: zoom
title: بزرگنمایی
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/zoom.ts
---

انجام حرکت بزرگنمایی روی عنصر مورد نظر در صفحه نمایش.

:::info

بزرگنمایی بر اساس حرکات بومی موبایل انجام می‌شود. این قابلیت فقط برای درایورهای زیر پشتیبانی می‌شود:
- [appium-uiautomator2-driver](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-pinchopengesture) برای اندروید
- [appium-xcuitest-driver](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-pinch) برای iOS

این دستور فقط با اجزای به‌روز شده زیر کار می‌کند:
 - سرور Appium (نسخه 2.0.0 یا بالاتر)
 - `appium-uiautomator2-driver` (برای اندروید)
 - `appium-xcuitest-driver` (برای iOS)

اطمینان حاصل کنید که محیط Appium محلی یا مبتنی بر ابر شما به طور منظم به‌روزرسانی می‌شود تا از مشکلات سازگاری جلوگیری شود.

:::

##### استفاده

```js
$(selector).zoom({ duration, scale })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`PinchAndZoomOptions`</td>
      <td>گزینه‌های بزرگنمایی (اختیاری)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`number`</td>
      <td>مدت زمان به میلی‌ثانیه که بزرگنمایی باید اجرا شود، حداقل 500 میلی‌ثانیه و حداکثر 10000 میلی‌ثانیه است. مقدار پیش‌فرض 1500 میلی‌ثانیه (1.5 ثانیه) است (اختیاری)</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`number`</td>
      <td>مقیاس بزرگی بزرگنمایی نسبت به صفحه نمایش. مقادیر معتبر باید اعداد اعشاری در محدوده 0..1 باشند، که 1.0 معادل 100٪ است (اختیاری)</td>
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