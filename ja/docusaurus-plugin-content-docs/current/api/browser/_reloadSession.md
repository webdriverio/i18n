---
id: reloadSession
title: reloadSession
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/reloadSession.ts
---

現在の機能を使用して新しいSeleniumセッションを作成します。これは、非常にステートフルなアプリケーションをテストしており、何百もの単一テストファイルをWDIOで作成することを避けるために、スペックファイル内のテスト間でブラウザセッションをクリーンアップする必要がある場合に便利です。
ただし、新しいSeleniumセッションの生成は、特にクラウドサービスを使用する場合には非常に時間がかかるため、このコマンドはテスト時間に大きな影響を与えることに注意してください。

ホスト名、ポート、プロトコルなどの接続パラメータは、別のリモートサービスに接続したい場合に、browserNameと一緒に追加できます。これは例えば、ネイティブアプリでテストを開始し、Webアプリでデータを検証する必要がある状況で役立ちます。

リモートサービスから開始する場合、ローカルドライバーに切り替えたい場合はホスト名に0.0.0.0を指定できます。

##### 使用方法

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