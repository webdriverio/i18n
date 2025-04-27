---
id: reloadSession
title: reloadSession
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/reloadSession.ts
---

Создает новую сессию Selenium с вашими текущими возможностями. Это полезно, если вы
тестируете приложения с сильной зависимостью от состояния, где вам нужно очищать сессию браузера между
тестами в вашем spec-файле, чтобы избежать создания сотен отдельных тестовых файлов с WDIO.
Однако будьте осторожны, эта команда существенно влияет на время выполнения тестов, поскольку создание
новых сессий Selenium занимает много времени, особенно при использовании облачных сервисов.

Параметры подключения, такие как имя хоста, порт, протокол и т.д., могут быть добавлены вместе с
browserName, когда вы хотите подключиться к другому удаленному сервису. Это полезно
в ситуации, например, когда вы начинаете тест в нативном приложении и хотите проверить
данные в веб-приложении.

Если вы начинаете с удаленного сервиса, вы можете передать 0.0.0.0 в качестве имени хоста, если хотите
переключиться на локальные драйверы.

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
      <td>новые возможности для создания сессии</td>
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