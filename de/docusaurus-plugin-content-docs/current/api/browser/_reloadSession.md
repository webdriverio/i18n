---
id: reloadSession
title: reloadSession
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/reloadSession.ts
---

Erstellt eine neue Selenium-Sitzung mit Ihren aktuellen Capabilities. Dies ist nützlich, wenn Sie
stark zustandsbehaftete Anwendungen testen, bei denen Sie die Browser-Sitzung zwischen
den Tests in Ihrer Spec-Datei bereinigen müssen, um zu vermeiden, dass Hunderte von einzelnen Testdateien mit WDIO erstellt werden.
Seien Sie jedoch vorsichtig, da dieser Befehl Ihre Testzeit erheblich beeinflusst, da das Erzeugen
neuer Selenium-Sitzungen sehr zeitaufwendig ist, besonders bei der Verwendung von Cloud-Diensten.

Verbindungsparameter wie Hostname, Port, Protokoll usw. können neben
browserName hinzugefügt werden, wenn Sie eine Verbindung zu einem anderen Remote-Dienst herstellen möchten. Dies ist nützlich
in einer Situation, in der Sie beispielsweise einen Test in einer nativen App starten und Daten
in einer Web-App überprüfen müssen.

Wenn Sie von einem Remote-Dienst aus starten, können Sie 0.0.0.0 als Hostname übergeben, wenn Sie
zu lokalen Treibern wechseln möchten.

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
      <td>neue Capabilities, mit denen eine Sitzung erstellt werden soll</td>
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