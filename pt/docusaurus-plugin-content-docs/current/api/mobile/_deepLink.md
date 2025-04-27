---
id: deepLink
title: deepLink
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/deepLink.ts
---

Abrir um link profundo (deep link) na aplicação móvel baseado na URL e no nome do pacote do aplicativo (Android) ou ID do pacote (iOS).

##### Uso

```js
browser.deepLink(link, appIdentifier)
```

##### Parâmetros

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Detalhes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>link</var></code></td>
      <td>`string`</td>
      <td>A URL do link profundo que deve ser aberta no aplicativo móvel. Deve ser uma URL de link profundo válida (ex: `myapp://path`). Se for um link profundo universal, que pode ser usado para iOS, use o método `browser.url("your-url")`.</td>
    </tr>
    <tr>
      <td><code><var>appIdentifier</var></code></td>
      <td>`string`</td>
      <td>O valor do `package` (Android) ou `bundleId` (iOS) do aplicativo que o link profundo deve abrir.</td>
    </tr>
  </tbody>
</table>

##### Exemplo

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