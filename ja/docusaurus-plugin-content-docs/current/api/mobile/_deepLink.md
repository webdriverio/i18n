---
id: deepLink
title: ディープリンク
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/deepLink.ts
---

URLとアプリのパッケージ名（Android）またはバンドルID（iOS）に基づいて、モバイルアプリでディープリンクURLを開きます。

##### 使用方法

```js
browser.deepLink(link, appIdentifier)
```

##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>link</var></code></td>
      <td>`string`</td>
      <td>モバイルアプリで開くべきディープリンクURL。有効なディープリンクURL（例：`myapp://path`）である必要があります。iOSで使用できるユニバーサルディープリンクの場合は、`browser.url("your-url")`メソッドを使用してください。</td>
    </tr>
    <tr>
      <td><code><var>appIdentifier</var></code></td>
      <td>`string`</td>
      <td>ディープリンクを開くアプリの`package`（Android）または`bundleId`（iOS）の値。</td>
    </tr>
  </tbody>
</table>

##### 例

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