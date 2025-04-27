---
id: deepLink
title: deepLink
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/deepLink.ts
---

Öffnet einen Deep-Link-URL in der mobilen App basierend auf der URL und dem Paketnamen der App (Android) oder der Bundle-ID (iOS).

##### Verwendung

```js
browser.deepLink(link, appIdentifier)
```

##### Parameter

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
      <td>Die Deep-Link-URL, die in der mobilen App geöffnet werden soll. Es sollte eine gültige Deep-Link-URL sein (z.B. `myapp://path`). Wenn es sich um einen universellen Deep-Link handelt, der für iOS verwendet werden kann, nutzen Sie die `browser.url("your-url")`-Methode.</td>
    </tr>
    <tr>
      <td><code><var>appIdentifier</var></code></td>
      <td>`string`</td>
      <td>Der Wert des `package` (Android) oder `bundleId` (iOS) der App, die der Deep-Link öffnen soll.</td>
    </tr>
  </tbody>
</table>

##### Beispiel

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