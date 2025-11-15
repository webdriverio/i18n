---
id: mock
title: モックオブジェクト
---

モックオブジェクトは、ネットワークモックを表し、指定された`url`と`filterOptions`に一致するリクエストに関する情報を含むオブジェクトです。これは[`mock`](/docs/api/browser/mock)コマンドを使用して取得できます。

:::info

`mock`コマンドの使用にはChrome DevToolsプロトコルのサポートが必要であることに注意してください。
このサポートは、Chromiumベースのブラウザでローカルにテストを実行する場合、または
Selenium Grid v4以上を使用する場合に提供されます。このコマンドは、クラウドで自動化テストを実行する場合には使用**できません**。詳細は[自動化プロトコル](/docs/automationProtocols)セクションをご覧ください。

:::

WebdriverIOでのリクエストとレスポンスのモッキングについて詳しくは、[モックとスパイ](/docs/mocksandspies)ガイドをご覧ください。

## プロパティ

モックオブジェクトには以下のプロパティが含まれています：

| 名前 | 型 | 詳細 |
| ---- | ---- | ------- |
| `url` | `String` | モックコマンドに渡されたURL |
| `filterOptions` | `Object` | モックコマンドに渡されたリソースフィルターオプション |
| `browser` | `Object` | モックオブジェクトの取得に使用された[ブラウザオブジェクト](/docs/api/browser)。 |
| `calls` | `Object[]` | 一致するブラウザリクエストに関する情報。`url`、`method`、`headers`、`initialPriority`、`referrerPolic`、`statusCode`、`responseHeaders`、`body`などのプロパティを含む |

## メソッド

モックオブジェクトは、リクエストやレスポンスの動作を変更できる様々なコマンドを提供しています。これらは`mock`セクションに記載されています。

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

モックオブジェクトはEventEmitterであり、ユースケースに応じていくつかのイベントが発行されます。

以下はイベントのリストです。

### `request`

このイベントは、モックパターンに一致するネットワークリクエストを開始したときに発行されます。リクエストはイベントコールバックに渡されます。

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

このイベントは、[`respond`](/docs/api/mock/respond)または[`respondOnce`](/docs/api/mock/respondOnce)でネットワークレスポンスが上書きされたときに発行されます。レスポンスはイベントコールバックに渡されます。

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

このイベントは、[`abort`](/docs/api/mock/abort)または[`abortOnce`](/docs/api/mock/abortOnce)でネットワークリクエストが中断されたときに発行されます。失敗はイベントコールバックに渡されます。

失敗インターフェース：
```ts
interface FailEvent {
    requestId: number
    errorReason: Protocol.Network.ErrorReason
}
```

### `match`

このイベントは、新しい一致が追加された時、`continue`または`overwrite`の前に発行されます。一致はイベントコールバックに渡されます。

一致インターフェース：
```ts
interface MatchEvent {
    url: string // リクエストURL（フラグメントなし）
    urlFragment?: string // 存在する場合、ハッシュから始まるリクエストURLのフラグメント
    method: string // HTTPリクエストメソッド
    headers: Record<string, string> // HTTPリクエストヘッダー
    postData?: string // HTTP POSTリクエストデータ
    hasPostData?: boolean // リクエストがPOSTデータを持つ場合はtrue
    mixedContentType?: MixedContentType // リクエストの混合コンテンツエクスポートタイプ
    initialPriority: ResourcePriority // リクエスト送信時のリソースリクエストの優先度
    referrerPolicy: ReferrerPolicy // https://www.w3.org/TR/referrer-policy/で定義されたリクエストのリファラーポリシー
    isLinkPreload?: boolean // リンクプリロードを介して読み込まれるかどうか
    body: string | Buffer | JsonCompatible // 実際のリソースのボディレスポンス
    responseHeaders: Record<string, string> // HTTPレスポンスヘッダー
    statusCode: number // HTTPレスポンスステータスコード
    mockedResponse?: string | Buffer // モックがイベントを発行し、そのレスポンスも変更した場合
}
```

### `continue`

このイベントは、ネットワークレスポンスが上書きも中断もされていない場合、または別のモックによってレスポンスがすでに送信された場合に発行されます。`requestId`はイベントコールバックに渡されます。

## 例

保留中のリクエスト数の取得：

```js
let pendingRequests = 0
const mock = await browser.mock('**') // すべてのリクエストを一致させることが重要です。そうしないと、結果の値が非常に混乱する可能性があります。
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

    // いくつかのリクエストがまだ保留中である可能性があるため、ここで待機
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

モックのレスポンド値が使用されたかどうかの判断：

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

この例では、`firstMock`が最初に定義され、1つの`respondOnce`呼び出しを持っているため、最初のリクエストには`secondMock`のレスポンス値は使用されませんが、残りのリクエストには使用されます。