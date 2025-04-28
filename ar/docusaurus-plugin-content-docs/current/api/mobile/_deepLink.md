---
id: deepLink
title: الرابط العميق
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/deepLink.ts
---

فتح عنوان URL للرابط العميق في تطبيق الجوال استنادًا إلى عنوان URL واسم حزمة التطبيق (Android) أو معرّف الحزمة (iOS).

##### الاستخدام

```js
browser.deepLink(link, appIdentifier)
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
      <td><code><var>link</var></code></td>
      <td>`string`</td>
      <td>عنوان URL للرابط العميق الذي يجب فتحه في تطبيق الجوال. يجب أن يكون عنوان URL رابط عميق صالح (مثل `myapp://path`). إذا كان رابطًا عميقًا عالميًا، والذي يمكن استخدامه لـ iOS، استخدم طريقة `browser.url("your-url")`.</td>
    </tr>
    <tr>
      <td><code><var>appIdentifier</var></code></td>
      <td>`string`</td>
      <td>قيمة `package` (Android) أو `bundleId` (iOS) للتطبيق الذي يجب أن يفتح الرابط العميق.</td>
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