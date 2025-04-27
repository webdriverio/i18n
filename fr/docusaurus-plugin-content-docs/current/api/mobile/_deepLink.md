---
id: deepLink
title: deepLink
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/deepLink.ts
---

Ouvrez un lien profond URL dans l'application mobile basé sur l'url et le nom du package de l'application (Android) ou l'ID du bundle (iOS).

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
      <td>L'URL du lien profond qui devrait être ouverte dans l'application mobile. Elle devrait être une URL de lien profond valide (par exemple `myapp://path`). S'il s'agit d'un lien profond universel, qui peut être utilisé pour iOS, utilisez la méthode `browser.url("your-url")`.</td>
    </tr>
    <tr>
      <td><code><var>appIdentifier</var></code></td>
      <td>`string`</td>
      <td>La valeur du `package` (Android) ou `bundleId` (iOS) de l'application que le lien profond devrait ouvrir.</td>
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