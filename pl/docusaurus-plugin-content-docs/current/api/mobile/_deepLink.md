---
id: deepLink
title: deepLink
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/deepLink.ts
---

Otwórz głęboki link URL w aplikacji mobilnej na podstawie adresu URL i nazwy pakietu aplikacji (Android) lub identyfikatora pakietu (iOS).

##### Użycie

```js
browser.deepLink(link, appIdentifier)
```

##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>link</var></code></td>
      <td>`string`</td>
      <td>Głęboki link URL, który powinien zostać otwarty w aplikacji mobilnej. Powinien to być prawidłowy głęboki link URL (np. `myapp://path`). Jeśli jest to uniwersalny głęboki link, który może być używany dla iOS, użyj metody `browser.url("your-url")`.</td>
    </tr>
    <tr>
      <td><code><var>appIdentifier</var></code></td>
      <td>`string`</td>
      <td>Wartość `package` (Android) lub `bundleId` (iOS) aplikacji, którą powinien otworzyć głęboki link.</td>
    </tr>
  </tbody>
</table>

##### Przykład

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