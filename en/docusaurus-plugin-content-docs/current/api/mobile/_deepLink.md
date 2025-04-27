---
id: deepLink
title: deepLink
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/deepLink.ts
---

Open a deep link URL in the mobile app based on the url and the app's package name (Android) or bundle ID (iOS).

##### Usage

```js
browser.deepLink(link, appIdentifier)
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
      <td><code><var>link</var></code></td>
      <td>`string`</td>
      <td>The deep link URL that should be opened in the mobile app. It should be a valid deep link URL (e.g. `myapp://path`). If it's a universal deep link, which can be used for iOS, use the `browser.url("your-url")`-method.</td>
    </tr>
    <tr>
      <td><code><var>appIdentifier</var></code></td>
      <td>`string`</td>
      <td>The value of the `package` (Android) or `bundleId` (iOS) of the app that the deep link should open.</td>
    </tr>
  </tbody>
</table>

##### Example

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

