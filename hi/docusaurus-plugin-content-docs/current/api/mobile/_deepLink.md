---
id: deepLink
title: डीपलिंक
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/deepLink.ts
---

मोबाइल ऐप में URL और ऐप के पैकेज नाम (Android) या बंडल ID (iOS) के आधार पर डीप लिंक URL खोलें।

##### उपयोग

```js
browser.deepLink(link, appIdentifier)
```

##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>नाम</th><th>प्रकार</th><th>विवरण</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>link</var></code></td>
      <td>`string`</td>
      <td>डीप लिंक URL जो मोबाइल ऐप में खोला जाना चाहिए। यह एक वैध डीप लिंक URL होना चाहिए (जैसे `myapp://path`)। अगर यह एक यूनिवर्सल डीप लिंक है, जिसे iOS के लिए उपयोग किया जा सकता है, तो `browser.url("your-url")`-मेथड का उपयोग करें।</td>
    </tr>
    <tr>
      <td><code><var>appIdentifier</var></code></td>
      <td>`string`</td>
      <td>ऐप के `package` (Android) या `bundleId` (iOS) का मान, जिसमें डीप लिंक खुलना चाहिए।</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

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