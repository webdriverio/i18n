---
id: reloadSession
title: reloadSession
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/reloadSession.ts
---

Створює нову сесію Selenium з вашими поточними можливостями. Це корисно, якщо ви
тестуєте програми з високим рівнем залежності від стану, де вам потрібно очистити сесію браузера між
тестами у вашому spec файлі, щоб уникнути створення сотень окремих тестових файлів з WDIO.
Будьте обережні, ця команда суттєво впливає на час тестування, оскільки створення
нових сесій Selenium займає багато часу, особливо при використанні хмарних сервісів.

Параметри підключення, такі як hostname, port, protocol тощо, можна додати поряд з
browserName, коли ви хочете підключитися до іншого віддаленого сервісу. Це корисно
в ситуації, наприклад, коли ви починаєте тест у нативному додатку і вам потрібно перевірити
дані в веб-додатку.

Якщо ви починаєте з віддаленого сервісу, ви можете передати 0.0.0.0 як hostname, якщо хочете
перейти на локальні драйвери.

##### Usage

```js
browser.reloadSession(newCapabilities)
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
      <td><code><var>newCapabilities</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`WebdriverIO.Capabilities`</td>
      <td>нові можливості для створення сесії</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="reloadSync.js"
it('should reload my session with current capabilities', async () => {
    console.log(browser.sessionId) // outputs: e042b3f3cd5a479da4e171825e96e655
    await browser.reloadSession()
    console.log(browser.sessionId) // outputs: 9a0d9bf9d4864160aa982c50cf18a573
})

it('should reload my session with new capabilities', async () => {
    console.log(browser.capabilities.browserName) // outputs: chrome
    await browser.reloadSession({
        browserName: 'firefox'
    })
    console.log(browser.capabilities.browserName) // outputs: firefox
})

it('should reload my session with new remote', async () => {
    console.log(browser.capabilities.browserName) // outputs: chrome
    await browser.reloadSession({
        protocol: 'https',
        host: '0.0.0.1',
        port: 4444,
        path: '/wd/hub',
        browserName: 'firefox'
    })
    console.log(browser.capabilities.browserName) // outputs: firefox
})
```