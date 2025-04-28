---
id: mock
title: モックオブジェクト
---

モックオブジェクトは、ネットワークモックを表すオブジェクトであり、指定された`url`と`filterOptions`に一致するリクエストに関する情報を含んでいます。これは[`mock`](/docs/api/browser/mock)コマンドを使用して取得できます。

:::info

`mock`コマンドを使用するには、Chrome DevToolsプロトコルのサポートが必要です。
このサポートは、Chromiumベースのブラウザでテストをローカルで実行する場合や、
Selenium Grid v4以上を使用する場合に提供されます。このコマンドは、クラウドで自動テストを実行する際には使用__できません__。詳細は[オートメーションプロトコル](/docs/automationProtocols)セクションをご覧ください。

:::

WebdriverIOでのリクエストとレスポンスのモック化について詳しくは、[モックとスパイ](/docs/mocksandspies)ガイドをご覧ください。

## プロパティ

モックオブジェクトには以下のプロパティが含まれています：

| 名前 | 型 | 詳細 |
| ---- | ---- | ------- |
| `url` | `String` | mockコマンドに渡されたURL |
| `filterOptions` | `Object` | mockコマンドに渡されたリソースフィルターオプション |
| `browser` | `Object` | モックオブジェクトの取得に使用された[ブラウザオブジェクト](/docs/api/browser) |
| `calls` | `Object[]` | 一致するブラウザリクエストに関する情報で、`url`、`method`、`headers`、`initialPriority`、`referrerPolic`、`statusCode`、`responseHeaders`、`body`などのプロパティを含みます |

## メソッド

モックオブジェクトは、`mock`セクションにリストされているさまざまなコマンドを提供し、リクエストやレスポンスの動作を変更することができます。

- [`abort`](/docs/api/mock/abort)
- [`abortOnce`](/docs/api/mock/abortOnce)
- [`clear`](/docs/api/mock/clear)
- [`request`](/docs/api/mock/request)
- [`requestOnce`](/docs/api/mock/requestOnce)
- [`respond`](/docs/api/mock/respond)
- [`respondOnce`](/docs/api/mock/respondOnce)
- [`restore`](/docs/api/mock/restore)

## イベント

モックオブジェクトはEventEmitterであり、いくつかのイベントがユースケースのために発行されます。

以下はイベントのリストです。

### `request`

このイベントは、モックパターンに一致するネットワークリクエストを開始するときに発行されます。リクエストはイベントコールバックで渡されます。

リクエストインターフェース：
```ts
interface RequestEvent {
    requestId: number
    request: Matches
    responseStatusCode: number
    responseHeaders: Record<string, string>
}
```

### `overwrite`

このイベントは、[`respond`](/docs/api/mock/respond)または[`respondOnce`](/docs/api/mock/respondOnce)でネットワークレスポンスが上書きされるときに発行されます。レスポンスはイベントコールバックで渡されます。

レスポンスインターフェース：
```ts
interface OverwriteEvent {
    requestId: number
    responseCode: number
    responseHeaders: Record<string, string>
    body?: string | Record<string, any>
}
```

### `fail`

このイベントは、[`abort`](/docs/api/mock/abort)または[`abortOnce`](/docs/api/mock/abortOnce)でネットワークリクエストが中断されるときに発行されます。失敗はイベントコールバックで渡されます。

失敗インターフェース：
```ts
interface FailEvent {
    requestId: number
    errorReason: Protocol.Network.ErrorReason
}
```

### `match`

このイベントは、新しい一致が追加されたとき、`continue`または`overwrite`の前に発行されます。一致はイベントコールバックで渡されます。

一致インターフェース：
```ts
interface MatchEvent {
    url: string // リクエストURL（フラグメントなし）。
    urlFragment?: string // 存在する場合、ハッシュから始まるリクエストされたURLのフラグメント。
    method: string // HTTPリクエストメソッド。
    headers: Record<string, string> // HTTPリクエストヘッダー。
    postData?: string // HTTP POSTリクエストデータ。
    hasPostData?: boolean // リクエストがPOSTデータを持つ場合はtrue。
    mixedContentType?: MixedContentType // リクエストの混合コンテンツエクスポートタイプ。
    initialPriority: ResourcePriority // リクエスト送信時のリソースリクエストの優先度。
    referrerPolicy: ReferrerPolicy // https://www.w3.org/TR/referrer-policy/で定義されているリクエストのリファラーポリシー。
    isLinkPreload?: boolean // リンクプリロードを介して読み込まれているかどうか。
    body: string | Buffer | JsonCompatible // 実際のリソースのボディレスポンス。
    responseHeaders: Record<string, string> // HTTPレスポンスヘッダー。
    statusCode: number // HTTPレスポンスステータスコード。
    mockedResponse?: string | Buffer // モックがイベントを発行し、レスポンスも変更した場合。
}
```

### `continue`

このイベントは、ネットワークレスポンスが上書きされず、中断されていない場合、または別のモックによってレスポンスが既に送信されている場合に発行されます。イベントコールバックでは`requestId`が渡されます。

## 例

保留中のリクエスト数を取得する：

```js
let pendingRequests = 0
const mock = await browser.mock('**') // すべてのリクエストを一致させることが重要です。さもないと、結果の値が非常に混乱する可能性があります。
mock.on('request', ({request}) => {
    pendingRequests++
    console.log(`matched request to ${request.url}, pending ${pendingRequests} requests`)
})
mock.on('match', ({url}) => {
    pendingRequests--
    console.log(`resolved request to ${url}, pending ${pendingRequests} requests`)
})
```

404ネットワークエラー時にエラーをスローする：

```js
browser.addCommand('loadPageWithout404', (url, {selector, predicate}) => new Promise(async (resolve, reject) => {
    const mock = await this.mock('**')

    mock.on('match', ({url, statusCode}) => {
        if (statusCode === 404) {
            reject(new Error(`request to ${url} failed with "Not Found"`))
        }
    })

    await this.url(url).catch(reject)

    // 一部のリクエストがまだ保留中である可能性があるため、ここで待機
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

モックのレスポンス値が使用されたかどうかを判断する：

```js
const firstMock = await browser.mock('**/foo/**')
const secondMock = await browser.mock('**/foo/bar/**')

firstMock.respondOnce({id: 3, title: 'three'})
secondMock.respond({id: 4, title: 'four'})

firstMock.on('overwrite', () => {
    // '**/foo/**'への最初のリクエストに対してトリガーされる
}).on('continue', () => {
    // '**/foo/**'への残りのリクエストに対してトリガーされる
})

secondMock.on('continue', () => {
    // '**/foo/bar/**'への最初のリクエストに対してトリガーされる
}).on('overwrite', () => {
    // '**/foo/bar/**'への残りのリクエストに対してトリガーされる
})
```

この例では、`firstMock`が最初に定義され、1つの`respondOnce`呼び出しがあるため、最初のリクエストに対しては`secondMock`のレスポンス値は使用されませんが、残りのリクエストには使用されます。