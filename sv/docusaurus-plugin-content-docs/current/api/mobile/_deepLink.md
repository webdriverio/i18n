---
id: deepLink
title: deepLink
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/deepLink.ts
---

Öppna en deep link URL i mobilappen baserat på url och appens paketnamn (Android) eller bundle ID (iOS).

##### Användning

```js
browser.deepLink(link, appIdentifier)
```

##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>link</var></code></td>
      <td>`string`</td>
      <td>Deep link URL som ska öppnas i mobilappen. Det bör vara en giltig deep link URL (t.ex. `myapp://path`). Om det är en universal deep link, som kan användas för iOS, använd `browser.url("your-url")`-metoden.</td>
    </tr>
    <tr>
      <td><code><var>appIdentifier</var></code></td>
      <td>`string`</td>
      <td>Värdet av `package` (Android) eller `bundleId` (iOS) för appen som deep link ska öppna.</td>
    </tr>
  </tbody>
</table>

##### Exempel

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