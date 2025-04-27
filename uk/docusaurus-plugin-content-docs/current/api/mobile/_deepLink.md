---
id: deepLink
title: deepLink
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/deepLink.ts
---

Відкрийте URL глибокого посилання в мобільному додатку на основі URL-адреси та назви пакета додатка (Android) або ідентифікатора пакета (iOS).

##### Використання

```js
browser.deepLink(link, appIdentifier)
```

##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>link</var></code></td>
      <td>`string`</td>
      <td>URL-адреса глибокого посилання, яка повинна бути відкрита в мобільному додатку. Це повинна бути дійсна URL-адреса глибокого посилання (наприклад, `myapp://path`). Якщо це універсальне глибоке посилання, яке можна використовувати для iOS, використовуйте метод `browser.url("your-url")`.</td>
    </tr>
    <tr>
      <td><code><var>appIdentifier</var></code></td>
      <td>`string`</td>
      <td>Значення `package` (Android) або `bundleId` (iOS) додатка, який повинен відкрити глибоке посилання.</td>
    </tr>
  </tbody>
</table>

##### Приклад

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