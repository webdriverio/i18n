---
id: browser-logs
title: ブラウザログ
description: "WebDriver Bidi のログイベントを使用してテスト中にブラウザのコンソールログを取得し、収集したメッセージに対してアサーションを行います。"
---

テストを実行する際、ブラウザは関心のある重要な情報やアサーションを行いたい情報をログに出力することがあります。

<Tabs
defaultValue="bidi"
values={[
    {label: 'Bidi', value: 'bidi'},
    {label: 'Classic (Deprecated)', value: 'classic'
}]
}>

<TabItem value='bidi'>

WebdriverIO がブラウザを自動化するデフォルトの方法である WebDriver Bidi を使用する場合、ブラウザから送られてくるイベントをサブスクライブできます。ログイベントの場合は `log.entryAdded'` をリッスンします。例:

```ts
await browser.sessionSubscribe({ events: ['log.entryAdded'] })

/**
 * returns: {"type":"console","method":"log","realm":null,"args":[{"type":"string","value":"Hello Bidi"}],"level":"info","text":"Hello Bidi","timestamp":1657282076037}
 */
browser.on('log.entryAdded', (entryAdded) => console.log('received %s', entryAdded))
```

テストでは、ログイベントを配列に追加し、アクションが完了した後にその配列に対してアサーションを行うだけです。例:

```ts
import type { local } from 'webdriver'

describe('should log when doing a certain action', () => {
    const logs: string[] = []

    function logEvents (event: local.LogEntry) {
        logs.push(event.text) // ログメッセージを配列に追加
    }

    before(async () => {
        await browser.sessionSubscribe({ events: ['log.entryAdded'] })
        browser.on('log.entryAdded', logEvents)
    })

    it('should trigger the console event', () => {
        // ブラウザがコンソールにメッセージを送信するようトリガーする
        ...

        // ログが取得されたかアサートする
        expect(logs).toContain('Hello Bidi')
    })

    // 後でリスナーをクリーンアップする
    after(() => {
        browser.off('log.entryAdded', logEvents)
    })
})
```

</TabItem>

<TabItem value='classic'>

`'wdio:enforceWebDriverClassic': true` ケーパビリティで Bidi が無効になっている場合でも、Chromium セッションでは `getLogs` を使用してブラウザのログバッファを読み取ることができます:

```ts
const logs = await browser.getLogs('browser')
const logMessage = logs.find((log) => log.message.includes('Hello Bidi'))
expect(logMessage).toBeTruthy()
```

注意: `getLogs` コマンドはブラウザから最新のログのみを取得できます。古くなったログメッセージは最終的に削除される場合があります。
</TabItem>

</Tabs>

この方法を使用してエラーメッセージを取得し、アプリケーションでエラーが発生していないかを検証することもできます。