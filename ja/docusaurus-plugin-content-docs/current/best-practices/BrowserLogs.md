---
id: browser-logs
title: ブラウザログ
---

テストを実行する際、ブラウザは関心のある重要な情報をログに記録したり、アサーションの対象としたい情報を出力したりすることがあります。

<Tabs
defaultValue="bidi"
values={[
    {label: 'Bidi', value: 'bidi'},
    {label: 'Classic (Deprecated)', value: 'classic'
}]
}>

<TabItem value='bidi'>

WebDriver Bidiを使用する場合（WebdriverIOがブラウザを自動化するデフォルトの方法）、ブラウザから送信されるイベントを購読できます。ログイベントの場合は、`log.entryAdded'`をリッスンします。例：

```ts
await browser.sessionSubscribe({ events: ['log.entryAdded'] })

/**
 * returns: {"type":"console","method":"log","realm":null,"args":[{"type":"string","value":"Hello Bidi"}],"level":"info","text":"Hello Bidi","timestamp":1657282076037}
 */
browser.on('log.entryAdded', (entryAdded) => console.log('received %s', entryAdded))
```

テストでは、ログイベントを配列にプッシュして、アクションが完了したらその配列に対してアサーションを行うことができます：

```ts
import type { local } from 'webdriver'

describe('should log when doing a certain action', () => {
    const logs: string[] = []

    function logEvents (event: local.LogEntry) {
        logs.push(event.text) // add log message to the array
    }

    before(async () => {
        await browser.sessionSubscribe({ events: ['log.entryAdded'] })
        browser.on('log.entryAdded', logEvents)
    })

    it('should trigger the console event', () => {
        // trigger the browser send a message to the console
        ...

        // assert if log was captured
        expect(logs).toContain('Hello Bidi')
    })

    // clean up listener afterwards
    after(() => {
        browser.off('log.entryAdded', logEvents)
    })
})
```

</TabItem>

<TabItem value='classic'>

WebDriver Classicを使用している場合や、`'wdio:enforceWebDriverClassic': true`機能によってBidiの使用を無効にしている場合は、JSONWireの`getLogs`コマンドを使用して最新のログを取得できます。WebdriverIOはこれらの非推奨コマンドを削除しているため、[JSONWP Service](https://github.com/webdriverio-community/wdio-jsonwp-service)を使用してコマンドをブラウザインスタンスに追加する必要があります。

サービスを追加または初期化した後、以下のようにログを取得できます：

```ts
const logs = await browser.getLogs('browser')
const logMessage = logs.find((log) => log.message.includes('Hello Bidi'))
expect(logMessage).toBeTruthy()
```

注意：`getLogs`コマンドはブラウザから最新のログのみを取得できます。古くなりすぎるとログメッセージは最終的にクリーンアップされる可能性があります。
</TabItem>

</Tabs>

この方法を使用して、エラーメッセージを取得し、アプリケーションにエラーが発生したかどうかを確認できることに注意してください。