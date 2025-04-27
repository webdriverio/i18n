---
id: deepLink
title: 深度链接
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/deepLink.ts
---

根据URL和应用程序的包名(Android)或Bundle ID(iOS)，在移动应用程序中打开深度链接URL。

##### 用法

```js
browser.deepLink(link, appIdentifier)
```

##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>link</var></code></td>
      <td>`string`</td>
      <td>应该在移动应用程序中打开的深度链接URL。它应该是一个有效的深度链接URL(例如 `myapp://path`)。如果是可用于iOS的通用深度链接，请使用 `browser.url("your-url")`-方法。</td>
    </tr>
    <tr>
      <td><code><var>appIdentifier</var></code></td>
      <td>`string`</td>
      <td>应用程序的`package`(Android)或`bundleId`(iOS)的值，深度链接应该在该应用程序中打开。</td>
    </tr>
  </tbody>
</table>

##### 示例

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