---
id: mocksandspies
title: リクエストのモックとスパイ
description: "browser.mock を使ってテスト内でネットワークリクエストとレスポンスをモックし、リクエストを中断したり、スパイで呼び出しを検査したりします。"
---

WebdriverIO には、ネットワークレスポンスを変更する機能が組み込まれています。これにより、バックエンドやモックサーバーをセットアップすることなく、フロントエンドアプリケーションのテストに集中できます。REST API リクエストなどの Web リソースに対するカスタムレスポンスをテスト内で定義し、動的に変更することができます。

:::info

`mock` コマンドを使用するには WebDriver Bidi のサポートが必要です。通常、Chromium ベースのブラウザや Firefox でローカルにテストを実行する場合や、Selenium Grid v4 以上を使用する場合はサポートされています。クラウドでテストを実行する場合は、クラウドプロバイダーが WebDriver Bidi をサポートしていることを確認してください。

:::

## モックの作成

レスポンスを変更する前に、まずモックを定義する必要があります。このモックはリソース URL によって記述され、[リクエストメソッド](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)や[ヘッダー](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)でフィルタリングできます。リソースは [`URLPattern`](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern) を使用してマッチングされ、`*` は任意の文字列にマッチします。プロトコルを含まない URL はリクエストのパスのみと照合されるため、`*/users/list` は任意のオリジン上のそのパスにマッチします：

```js
// "/users/list" で終わるすべてのリソースをモックする
const userListMock = await browser.mock('*/users/list')

// または、ヘッダーやステータスコードでリソースをフィルタリングして
// モックを指定することもできます。JSON リソースへの成功したリクエストのみをモックします
const strictMock = await browser.mock('*', {
    // すべての JSON レスポンスをモックする
    requestHeaders: { 'Content-Type': 'application/json' },
    // 成功したもの
    statusCode: 200
})

// 文字列の代わりに `URLPattern` を渡すこともできます。ポリフィルは
// ネイティブの URLPattern をサポートしないランタイムでも動作します
import { URLPattern } from 'urlpattern-polyfill'
const patternMock = await browser.mock(new URLPattern({ pathname: '/users/list' }))
```

:::warning

URL のワイルドカードには単一の `*` を使用してください。これは `/` にもマッチします。`**/api/**` や `**/data.json` のように固定テキストの前にワイルドカードを連続させると、無関係な URL に対して過度な正規表現のバックトラッキングが発生し、テストがフリーズする可能性があります。[issue #13548](https://github.com/webdriverio/webdriverio/issues/13548) を参照してください。コンポーネントテストでは、ランナーのトラフィックをインターセプトの対象外にするため、固定のプロトコルとホスト名も使用してください。[コンポーネントテストのリクエストモック](/docs/component-testing/mocking#requests)を参照してください。

:::

## カスタムレスポンスの指定

モックを定義したら、それに対するカスタムレスポンスを定義できます。カスタムレスポンスには、JSON で応答するためのオブジェクト、カスタムフィクスチャで応答するためのローカルファイル、またはインターネット上のリソースでレスポンスを置き換えるための Web リソースを指定できます。

### API リクエストのモック

JSON レスポンスを期待する API リクエストをモックするには、返したい任意のオブジェクトを引数としてモックオブジェクトの `respond` を呼び出すだけです。例：

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/')

mock.respond([{
    title: 'Injected (non) completed Todo',
    order: null,
    completed: false
}, {
    title: 'Injected completed Todo',
    order: null,
    completed: true
}], {
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    fetchResponse: false
})

await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')

await $('#todo-list li').waitForExist()
console.log(await $$('#todo-list li').map(el => el.getText()))
// 出力: "[ 'Injected (non) completed Todo', 'Injected completed Todo' ]"
```

次のようにモックレスポンスのパラメータを渡すことで、レスポンスヘッダーやステータスコードも変更できます：

```js
mock.respond({ ... }, {
    // ステータスコード 404 で応答する
    statusCode: 404,
    // レスポンスヘッダーを以下のヘッダーとマージする
    headers: { 'x-custom-header': 'foobar' }
})
```

モックがバックエンドを一切呼び出さないようにしたい場合は、`fetchResponse` フラグに `false` を渡します。

```js
mock.respond({ ... }, {
    // 実際のバックエンドを呼び出さない
    fetchResponse: false
})
```

`fetchResponse: false` はバックエンドを一切呼び出しません。`statusCode` または `responseHeaders` フィルターを指定して作成されたモックは、マッチするかどうかを判断するためにそのレスポンスを必要とするため、これらを組み合わせると `respond()` および `respondOnce()` はエラーをスローします。レスポンスフィルターを削除するか、`fetchResponse` を未設定のままにして、モックがバックエンドのレスポンスを読み取ってから置き換えられるようにしてください。

カスタムレスポンスはフィクスチャファイルに保存しておくことを推奨します。そうすれば、次のようにテスト内で読み込むだけで済みます：

```js
// JSON インポートアサーションをサポートするには Node.js v16.14.0 以上が必要です
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### テキストリソースのモック

JavaScript や CSS ファイル、その他のテキストベースのリソースを変更したい場合は、ファイルパスを渡すだけで、WebdriverIO が元のリソースをそれに置き換えます。例：

```js
const scriptMock = await browser.mock('*/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// またはカスタム JS で応答する
scriptMock.respond('alert("I am a mocked resource")')
```

### Web リソースのリダイレクト

目的のレスポンスがすでに Web 上でホストされている場合は、Web リソースを別の Web リソースに置き換えることもできます。これは個々のページリソースだけでなく、Web ページ自体にも有効です。例：

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js" を返す
```

### 動的レスポンス

モックレスポンスが元のリソースのレスポンスに依存する場合は、元のレスポンスをパラメータとして受け取る関数を渡し、その戻り値に基づいてモックを設定することで、リソースを動的に変更することもできます。例：

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
    method: 'get'
})

mock.respond((req) => {
    // todo の内容をリスト番号に置き換える
    return req.body.map((item, i) => ({ ...item, title: i }))
})

await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')

await $('#todo-list li').waitForExist()
console.log(await $$('#todo-list li label').map((el) => el.getText()))
// 戻り値
// [
//   '0',  '1',  '2',  '19', '20',
//   '21', '3',  '4',  '5',  '6',
//   '7',  '8',  '9',  '10', '11',
//   '12', '13', '14', '15', '16',
//   '17', '18', '22'
// ]
```

## モックの中断

カスタムレスポンスを返す代わりに、次のいずれかの HTTP エラーでリクエストを中断することもできます：

- Failed
- Aborted
- TimedOut
- AccessDenied
- ConnectionClosed
- ConnectionReset
- ConnectionRefused
- ConnectionAborted
- ConnectionFailed
- NameNotResolved
- InternetDisconnected
- AddressUnreachable
- BlockedByClient
- BlockedByResponse

これは、機能テストに悪影響を与えるサードパーティのスクリプトをページからブロックしたい場合に非常に便利です。`abort` または `abortOnce` を呼び出すだけでモックを中断できます。例：

```js
const mock = await browser.mock('https://www.google-analytics.com/*')
mock.abort('Failed')
```

## スパイ

すべてのモックは自動的にスパイとなり、ブラウザがそのリソースに対して行ったリクエストの数をカウントします。モックにカスタムレスポンスや中断理由を適用しない場合は、通常受け取るデフォルトのレスポンスでそのまま処理が続行されます。これにより、ブラウザが特定の API エンドポイントなどに対して何回リクエストを行ったかを確認できます。

```js
const mock = await browser.mock('*/user', { method: 'post' })
console.log(mock.calls.length) // 0 を返す

// ユーザーを登録する
await $('#username').setValue('randomUser')
await $('password').setValue('password123')
await $('password_repeat').setValue('password123')
await $('button[type="submit"]').click()

// API リクエストが行われたか確認する
expect(mock.calls.length).toBe(1)

// レスポンスをアサートする
expect(mock.calls[0].body).toEqual({ success: true })
```

マッチするリクエストがレスポンスを返すまで待機する必要がある場合は、`mock.waitForResponse(options)` を使用してください。API リファレンス：[waitForResponse](/docs/api/mock/waitForResponse) を参照してください。

## マルチリモート

[マルチリモート](/docs/multiremote)ブラウザでは、`mock()` は単一の `Mock` ではなく `MultiRemoteMock` を返します。`respond()` や `restore()` などのメソッドはすべてのインスタンスで実行されます。`waitForResponse()` は、すべてのインスタンスがマッチするレスポンスを受け取るまで待機します。キャプチャされたリクエストは、そのブラウザのモックに保持されます：

```ts
const mock = await browser.mock('*/user', { method: 'post' })
mock.respond({ success: true })

// 各セッションがリクエストを送信するように、すべてのブラウザでユーザーを登録する
await browser.$('#username').setValue('randomUser')
await browser.$('#password').setValue('password123')
await browser.$('#password_repeat').setValue('password123')
await browser.$('button[type="submit"]').click()

await mock.waitForResponse()

expect(mock.getInstance('myChromeBrowser').calls).toHaveLength(1)
expect(mock.getInstance('myFirefoxBrowser').calls).toHaveLength(1)
```

`mock.instances` は、モックが作成された順にそれらの名前を一覧表示します。名前がその一覧にない場合、`getInstance` は `Multi-remote object has no instance named "<name>"` をスローします。`browser.select('myFirefoxBrowser', 'myChromeBrowser')` から作成されたモックでは Firefox が最初に表示されるため、`browser.instances` とは順序が異なる場合があります。

1 つのブラウザのみをスタブするには、そのインスタンスで `mock()` を呼び出します：

```ts
const chromeOnly = await browser.getInstance('myChromeBrowser').mock('*/user')
```