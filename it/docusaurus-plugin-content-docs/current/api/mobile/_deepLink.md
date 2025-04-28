---
id: deepLink
title: deepLink
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/deepLink.ts
---

Apri un URL di deep link nell'app mobile basato sull'url e sul nome del pacchetto dell'app (Android) o sull'ID del bundle (iOS).

##### Utilizzo

```js
browser.deepLink(link, appIdentifier)
```

##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>link</var></code></td>
      <td>`string`</td>
      <td>L'URL del deep link che dovrebbe essere aperto nell'app mobile. Dovrebbe essere un URL di deep link valido (es. `myapp://path`). Se è un deep link universale, che può essere utilizzato per iOS, usa il metodo `browser.url("your-url")`.</td>
    </tr>
    <tr>
      <td><code><var>appIdentifier</var></code></td>
      <td>`string`</td>
      <td>Il valore del `package` (Android) o `bundleId` (iOS) dell'app che il deep link dovrebbe aprire.</td>
    </tr>
  </tbody>
</table>

##### Esempio

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