---
id: reloadSession
title: reloadSession
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/reloadSession.ts
---

Creates a new Selenium session with your current capabilities. This is useful if you
test highly stateful application where you need to clean the browser session between
the tests in your spec file to avoid creating hundreds of single test files with WDIO.
Be careful though, this command affects your test time tremendously since spawning
new Selenium sessions is very time consuming especially when using cloud services.

Connection parameters such as hostname, port, protocol, etc. can be added along side
browserName when you want to connect to a different remote service. This is useful
in a situation, for example, where you start a test in native app and need to verify
data in web app.

If you start from remote service, you can pass in 0.0.0.0 for hostname if you want
to switch to local drivers.

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
      <td>new capabilities to create a session with</td>
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