---
id: reloadSession
title: reloadSession
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/reloadSession.ts
---

現在の機能で新しいSeleniumセッションを作成します。これは、テスト間でブラウザセッションをクリーンアップする必要がある高度にステートフルなアプリケーションをテストする場合に便利です。これにより、WDIOで数百の単一テストファイルを作成する必要がなくなります。ただし、新しいSeleniumセッションの作成は非常に時間がかかるため、特にクラウドサービスを使用している場合は、このコマンドがテスト時間に大きく影響することに注意してください。

ホスト名、ポート、プロトコルなどの接続パラメータは、別のリモートサービスに接続したい場合に、browserNameと一緒に追加できます。これは、例えばネイティブアプリでテストを開始し、Webアプリでデータを確認する必要がある場合に便利です。

リモートサービスから開始する場合、ローカルドライバーに切り替えたい場合はホスト名として0.0.0.0を渡すことができます。

##### 使用法

```js
browser.reloadSession(newCapabilities)
```

##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>タイプ</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>newCapabilities</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`WebdriverIO.Capabilities`</td>
      <td>セッションを作成するための新しい機能</td>
    </tr>
  </tbody>
</table>

##### 例

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