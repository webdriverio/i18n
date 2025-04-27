---
id: deepLink
title: deepLink
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/deepLink.ts
---

Открывает URL глубокой ссылки в мобильном приложении на основе URL и имени пакета приложения (Android) или идентификатора пакета (iOS).

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
      <td>URL глубокой ссылки, который должен быть открыт в мобильном приложении. Должен быть действительным URL глубокой ссылки (например, `myapp://path`). Если это универсальная глубокая ссылка, которая может использоваться для iOS, используйте метод `browser.url("your-url")`.</td>
    </tr>
    <tr>
      <td><code><var>appIdentifier</var></code></td>
      <td>`string`</td>
      <td>Значение `package` (Android) или `bundleId` (iOS) приложения, которое должно открыть глубокую ссылку.</td>
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