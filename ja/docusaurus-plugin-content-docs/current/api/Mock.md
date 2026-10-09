---
id: mock
title: モックオブジェクト
---

モックオブジェクトは、ネットワークモックを表すオブジェクトで、指定された `url` と `filterOptions` に一致したリクエストに関する情報を含んでいます。[`mock`](/docs/api/browser/mock) コマンドを使用して取得できます。

:::info

`mock` コマンドを使用するには、Chrome DevTools プロトコルのサポートが必要です。
このサポートは、Chromium ベースのブラウザでローカルにテストを実行する場合、または
Selenium Grid v4 以上を使用する場合に提供されます。このコマンドは、クラウドで自動テストを
実行する場合には使用__できません__。詳しくは [Automation Protocols](/docs/automationProtocols) セクションをご覧ください。

:::

WebdriverIO におけるリクエストとレスポンスのモックについて詳しくは、[Mocks and Spies](/docs/mocksandspies) ガイドをご覧ください。

## マルチリモート

[マルチリモート](/docs/multiremote) ブラウザでは、[`browser.mock()`](/docs/api/browser/mock) はこのオブジェクトの代わりに `MultiRemoteMock` を返します。`instances` にはブラウザ名が列挙され、`getInstance(name)` はそのブラウザの `Mock` を返します。`respond()`、`restore()`、および以下のその他のメソッドは、すべてのインスタンスで実行されます。`calls` は各インスタンスのモックに保持されます: `mock.getInstance('myChromeBrowser').calls`。

`name` が `instances` のいずれでもない場合、`getInstance` は `Multi-remote object has no instance named "<name>"` をスローします。

## プロパティ

モックオブジェクトには以下のプロパティが含まれます:

| 名前 | 型 | 詳細 |
| ---- | ---- | ------- |
| `url` | `String` | mock コマンドに渡された url |
| `filterOptions` | `Object` | mock コマンドに渡されたリソースフィルターオプション |
| `browser` | `Object` | モックオブジェクトの取得に使用された [Browser Object](/docs/api/browser)。 |
| `calls` | `Object[]` | 一致したブラウザリクエストに関する情報。`url`、`method`、`headers`、`initialPriority`、`referrerPolic`、`statusCode`、`responseHeaders`、`body` などのプロパティを含みます |

## メソッド

モックオブジェクトは、`mock` セクションに記載されているさまざまなコマンドを提供しており、ユーザーはこれらを使用してリクエストやレスポンスの動作を変更できます。

- [`abort`](/docs/api/mock/abort)
- [`abortOnce`](/docs/api/mock/abortOnce)
- [`clear`](/docs/api/mock/clear)
- [`request`](/docs/api/mock/request)
- [`requestOnce`](/docs/api/mock/requestOnce)
- [`respond`](/docs/api/mock/respond)
- [`respondOnce`](/docs/api/mock/respondOnce)
- [`restore`](/docs/api/mock/restore)
- [`waitForResponse`](/docs/api/mock/waitForResponse)

## イベント

モックオブジェクトは EventEmitter であり、ユースケースに応じて利用できるいくつかのイベントが発行されます。

以下はイベントの一覧です。

### `request`

このイベントは、モックパターンに一致するネットワークリクエストが開始されたときに発行されます。イベントコールバックにはリクエストが渡されます。

リクエストインターフェース:
```ts
interface RequestEvent {
    requestId: number
    request: Matches
    responseStatusCode: number
    responseHeaders: Record<string, string>
}
```

### `overwrite`

このイベントは、ネットワークレスポンスが [`respond`](/docs/api/mock/respond) または [`respondOnce`](/docs/api/mock/respondOnce) で上書きされたときに発行されます。イベントコールバックにはレスポンスが渡されます。

レスポンスインターフェース:
```ts
interface OverwriteEvent {
    requestId: number
    responseCode: number
    responseHeaders: Record<string, string>
    body?: string | Record<string, any>
}
```

### `fail`

このイベントは、ネットワークリクエストが [`abort`](/docs/api/mock/abort) または [`abortOnce`](/docs/api/mock/abortOnce) で中断されたときに発行されます。イベントコールバックには失敗情報が渡されます。

失敗インターフェース:
```ts
interface FailEvent {
    requestId: number
    errorReason: Protocol.Network.ErrorReason
}
```

### `match`

このイベントは、`continue` または `overwrite` の前に、新しい一致が追加されたときに発行されます。イベントコールバックには一致情報が渡されます。

一致インターフェース:
```ts
interface MatchEvent {
    url: string // リクエスト URL（フラグメントを除く）。
    urlFragment?: string // リクエストされた URL のハッシュで始まるフラグメント（存在する場合）。
    method: string // HTTP リクエストメソッド。
    headers: Record<string, string> // HTTP リクエストヘッダー。
    postData?: string // HTTP POST リクエストデータ。
    hasPostData?: boolean // リクエストに POST データがある場合は true。
    mixedContentType?: MixedContentType // リクエストの混在コンテンツのエクスポートタイプ。
    initialPriority: ResourcePriority // リクエスト送信時点でのリソースリクエストの優先度。
    referrerPolicy: ReferrerPolicy // https://www.w3.org/TR/referrer-policy/ で定義されている、リクエストのリファラーポリシー
    isLinkPreload?: boolean // link preload 経由で読み込まれたかどうか。
    body: string | Buffer | JsonCompatible // 実際のリソースのレスポンスボディ。
    responseHeaders: Record<string, string> // HTTP レスポンスヘッダー。
    statusCode: number // HTTP レスポンスステータスコード。
    mockedResponse?: string | Buffer // イベントを発行したモックがレスポンスも変更した場合。
}
```

### `continue`

このイベントは、ネットワークレスポンスが上書きも中断もされなかった場合、またはレスポンスが別のモックによってすでに送信されていた場合に発行されます。イベントコールバックには `requestId` が渡されます。

## 例

保留中のリクエスト数を取得する:

```js
let pendingRequests = 0
const mock = await browser.mock('**') // すべてのリクエストに一致させることが重要です。そうしないと、結果の値が非常にわかりにくくなる可能性があります。
mock.on('request', ({request}) => {
    pendingRequests++
    console.log(`matched request to ${request.url}, pending ${pendingRequests} requests`)
})
mock.on('match', ({url}) => {
    pendingRequests--
    console.log(`resolved request to ${url}, pending ${pendingRequests} requests`)
})
```

404 のネットワーク失敗時にエラーをスローする:

```js
browser.addCommand('loadPageWithout404', (url, {selector, predicate}) => new Promise(async (resolve, reject) => {
    const mock = await this.mock('**')

    mock.on('match', ({url, statusCode}) => {
        if (statusCode === 404) {
            reject(new Error(`request to ${url} failed with "Not Found"`))
        }
    })

    await this.url(url).catch(reject)

    // 一部のリクエストがまだ保留中の可能性があるため、ここで待機します
    if (selector) {
        await this.$(selector).waitForExist().catch(reject)
    }

    if (predicate) {
        await this.waitUntil(predicate).catch(reject)
    }

    resolve()
}))

await browser.loadPageWithout404(browser, 'some/url', { selector: 'main' })
```

モックの respond の値が使用されたかどうかを判定する:

```js
const firstMock = await browser.mock('**/foo/**')
const secondMock = await browser.mock('**/foo/bar/**')

firstMock.respondOnce({id: 3, title: 'three'})
secondMock.respond({id: 4, title: 'four'})

firstMock.on('overwrite', () => {
    // '**/foo/**' への最初のリクエストでトリガーされます
}).on('continue', () => {
    // '**/foo/**' への残りのリクエストでトリガーされます
})

secondMock.on('continue', () => {
    // '**/foo/bar/**' への最初のリクエストでトリガーされます
}).on('overwrite', () => {
    // '**/foo/bar/**' への残りのリクエストでトリガーされます
})
```

この例では、`firstMock` が最初に定義され、`respondOnce` の呼び出しが 1 回あるため、`secondMock` のレスポンス値は最初のリクエストには使用されませんが、残りのリクエストには使用されます。