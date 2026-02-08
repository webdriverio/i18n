---
id: mocksandspies
title: リクエストモックとスパイ
---

WebdriverIOには、バックエンドやモックサーバーをセットアップすることなく、フロントエンドアプリケーションのテストに集中できるようにするための、ネットワークレスポンスを変更する組み込みサポートが用意されています。REST API リクエストなどのウェブリソースに対するカスタムレスポンスをテスト内で定義し、動的に変更することができます。

:::info

`mock`コマンドを使用するには、Chrome DevTools プロトコルのサポートが必要です。このサポートは、Chromium ベースのブラウザでテストをローカルで実行する場合、Selenium Grid v4 以上を介して実行する場合、または Chrome DevTools プロトコルをサポートするクラウドベンダー（SauceLabs、BrowserStack、TestMu AI（旧 LambdaTest）など）を通じて実行する場合に提供されます。完全なクロスブラウザサポートは、必要なプリミティブが [Webdriver Bidi](https://wpt.fyi/results/webdriver/tests/bidi/network?label=experimental&label=master&aligned) に組み込まれ、それぞれのブラウザに実装されるようになれば利用可能になります。

:::

## モックの作成

レスポンスを変更する前に、最初にモックを定義する必要があります。このモックはリソースURLによって記述され、[リクエストメソッド](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)や[ヘッダー](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)によってフィルタリングすることができます。リソースは[minimatch](https://www.npmjs.com/package/minimatch)によるグロブ式をサポートしています：

```js
// "/users/list"で終わるすべてのリソースをモック
const userListMock = await browser.mock('**/users/list')

// またはヘッダーやステータスコードでリソースをフィルタリングしてモックを指定できます
// jsonリソースへの成功したリクエストだけをモック
const strictMock = await browser.mock('**', {
    // すべてのJSONレスポンスをモック
    requestHeaders: { 'Content-Type': 'application/json' },
    // 成功したものだけ
    statusCode: 200
})
```

## カスタムレスポンスの指定

モックを定義したら、そのモックに対してカスタムレスポンスを定義できます。これらのカスタムレスポンスは、JSONを応答するオブジェクト、カスタムフィクスチャで応答するローカルファイル、またはインターネットからのリソースでレスポンスを置き換えるウェブリソースのいずれかにすることができます。

### APIリクエストのモック

JSONレスポンスを期待するAPIリクエストをモックするには、モックオブジェクトに対して`respond`を呼び出し、返したい任意のオブジェクトを渡すだけです：

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

以下のようにモックレスポンスパラメータを渡すことで、レスポンスヘッダーやステータスコードも変更できます：

```js
mock.respond({ ... }, {
    // ステータスコード404で応答
    statusCode: 404,
    // レスポンスヘッダーを以下のヘッダーとマージ
    headers: { 'x-custom-header': 'foobar' }
})
```

バックエンドを全く呼び出したくない場合は、`fetchResponse`フラグに`false`を渡すことができます。

```js
mock.respond({ ... }, {
    // 実際のバックエンドを呼び出さない
    fetchResponse: false
})
```

カスタムレスポンスはフィクスチャファイルに保存して、次のようにテスト内でそれを要求することをお勧めします：

```js
// JSONインポートアサーションをサポートするにはNode.js v16.14.0以上が必要
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### テキストリソースのモック

JavaScript、CSSファイル、またはその他のテキストベースのリソースを変更したい場合は、ファイルパスを渡すだけで、WebdriverIOは元のリソースをそれで置き換えます：

```js
const scriptMock = await browser.mock('**/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// または独自のJSで応答
scriptMock.respond('alert("I am a mocked resource")')
```

### ウェブリソースのリダイレクト

希望するレスポンスがすでにウェブ上にホストされている場合、ウェブリソースを別のウェブリソースに置き換えることもできます。これは個々のページリソースだけでなく、ウェブページ自体でも機能します：

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"を返す
```

### 動的レスポンス

モックレスポンスが元のリソースレスポンスに依存する場合、元のレスポンスをパラメータとして受け取る関数を渡すことで、リソースを動的に変更することもできます。この関数の戻り値に基づいてモックが設定されます：

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
    method: 'get'
})

mock.respond((req) => {
    // todoコンテンツをリスト番号で置き換える
    return req.body.map((item, i) => ({ ...item, title: i }))
})

await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')

await $('#todo-list li').waitForExist()
console.log(await $$('#todo-list li label').map((el) => el.getText()))
// 返り値
// [
//   '0',  '1',  '2',  '19', '20',
//   '21', '3',  '4',  '5',  '6',
//   '7',  '8',  '9',  '10', '11',
//   '12', '13', '14', '15', '16',
//   '17', '18', '22'
// ]
```

## モックの中止

カスタムレスポンスを返す代わりに、次のようなHTTPエラーでリクエストを中止することもできます：

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

これは、機能テストに悪影響を与えるサードパーティのスクリプトをページからブロックしたい場合に非常に便利です。モックを中止するには、`abort`または`abortOnce`を呼び出すだけです：

```js
const mock = await browser.mock('https://www.google-analytics.com/**')
mock.abort('Failed')
```

## スパイ

すべてのモックは自動的にスパイとなり、ブラウザがそのリソースに対して行ったリクエストの数をカウントします。モックにカスタムレスポンスや中止理由を適用しない場合、通常受け取るデフォルトのレスポンスで続行します。これにより、ブラウザが特定のAPIエンドポイントなどにリクエストを何回行ったかを確認できます。

```js
const mock = await browser.mock('**/user', { method: 'post' })
console.log(mock.calls.length) // 0を返す

// ユーザーを登録
await $('#username').setValue('randomUser')
await $('password').setValue('password123')
await $('password_repeat').setValue('password123')
await $('button[type="submit"]').click()

// APIリクエストが行われたかチェック
expect(mock.calls.length).toBe(1)

// レスポンスを検証
expect(mock.calls[0].body).toEqual({ success: true })
```

一致するリクエストが応答するまで待機する必要がある場合は、`mock.waitForResponse(options)`を使用してください。APIリファレンスを参照してください：[waitForResponse](/docs/api/mock/waitForResponse)。