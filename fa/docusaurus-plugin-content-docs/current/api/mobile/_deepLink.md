---
id: deepLink
title: لینک عمیق
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/deepLink.ts
---

باز کردن یک URL لینک عمیق در برنامه موبایل بر اساس آدرس و نام بسته برنامه (اندروید) یا شناسه باندل (iOS).

##### استفاده

```js
browser.deepLink(link, appIdentifier)
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
      <td><code><var>link</var></code></td>
      <td>`string`</td>
      <td>آدرس لینک عمیقی که باید در برنامه موبایل باز شود. باید یک آدرس لینک عمیق معتبر باشد (مانند `myapp://path`). اگر یک لینک عمیق جهانی است که می‌تواند برای iOS استفاده شود، از متد `browser.url("your-url")` استفاده کنید.</td>
    </tr>
    <tr>
      <td><code><var>appIdentifier</var></code></td>
      <td>`string`</td>
      <td>مقدار `package` (اندروید) یا `bundleId` (iOS) برنامه‌ای که لینک عمیق باید در آن باز شود.</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="deeplink.js"
it('should open a deep link for the WDIO native demo app', async () => {
    // open the Drag tab with a deep link (this the bundleId for the iOS Demo App)
    await browser.deepLink('wdio://drag', 'org.reactjs.native.example.wdiodemoapp');

    // Or open the Drag tab with a deep link (this the package name for the Android Demo App)
    await browser.deepLink('wdio://drag', 'com.wdiodemoapp');

    // Or if you want to have it "cross-platform" you can use it like this
    await browser.deepLink('wdio://drag', browser.isIOS ? 'org.reactjs.native.example.wdiodemoapp' : 'com.wdiodemoapp');
})
```