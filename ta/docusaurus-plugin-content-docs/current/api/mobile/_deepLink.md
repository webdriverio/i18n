---
id: deepLink
title: ஆழ்இணைப்பு
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/deepLink.ts
---

மொபைல் செயலியில் ஆழ் இணைப்பு URL-ஐ URL மற்றும் செயலியின் பேக்கேஜ் பெயர் (Android) அல்லது பண்டில் ID (iOS) அடிப்படையில் திறக்கவும்.

##### பயன்பாடு

```js
browser.deepLink(link, appIdentifier)
```

##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>link</var></code></td>
      <td>`string`</td>
      <td>மொபைல் செயலியில் திறக்க வேண்டிய ஆழ் இணைப்பு URL. இது செல்லுபடியாகும் ஆழ் இணைப்பு URL ஆக இருக்க வேண்டும் (எ.கா. `myapp://path`). இது iOS-க்காகப் பயன்படுத்தக்கூடிய உலகளாவிய ஆழ் இணைப்பாக இருந்தால், `browser.url("your-url")`-முறையைப் பயன்படுத்தவும்.</td>
    </tr>
    <tr>
      <td><code><var>appIdentifier</var></code></td>
      <td>`string`</td>
      <td>ஆழ் இணைப்பு திறக்க வேண்டிய செயலியின் `package` (Android) அல்லது `bundleId` (iOS) மதிப்பு.</td>
    </tr>
  </tbody>
</table>

##### உதாரணம்

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