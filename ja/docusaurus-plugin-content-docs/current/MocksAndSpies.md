---
id: mocksandspies
title: リクエストモックとスパイ
---

WebdriverIOには、バックエンドやモックサーバーをセットアップすることなく、フロントエンドアプリケーションのテストに集中できるようにするネットワークレスポンスを変更するための組み込みサポートがあります。テスト内でREST APIリクエストなどのウェブリソースに対するカスタムレスポンスを定義し、動的に変更することができます。

:::info

`mock`コマンドを使用するにはChrome DevToolsプロトコルのサポートが必要であることに注意してください。このサポートは、Chromiumベースのブラウザでローカルにテストを実行する場合、Selenium Grid v4以上を介して、またはChrome DevToolsプロトコルをサポートするクラウドベンダー（SauceLabs、BrowserStack、LambdaTestなど）を通じて提供されます。完全なクロスブラウザサポートは、必要なプリミティブが[Webdriver Bidi](https://wpt.fyi/results/webdriver/tests/bidi/network?label=experimental&label=master&aligned)で利用可能になり、それぞれのブラウザで実装された時点で提供されます。

:::

## モックの作成

レスポンスを変更する前に、まずモックを定義する必要があります。このモックはリソースURLによって記述され、[リクエストメソッド](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)や[ヘッダー](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)によってフィルタリングできます。リソースは[minimatch](https://www.npmjs.com/package/minimatch)によるグロブ式をサポートしています：

```js
// "/users/list"で終わるすべてのリソースをモック
const userListMock = await browser.mock('**/users/list')

// またはヘッダーやステータスコードでリソースをフィルタリングしてモックを指定できます
// JSONリソースへの成功したリクエストだけをモック
const strictMock = await browser.mock('**', {
    // すべてのJSONレスポンスをモック
    requestHeaders: { 'Content-Type': 'application/json' },
    // 成功したものだけ
    statusCode: 200
})
```

## カスタムレスポンスの指定

モックを定義したら、そのモックに対してカスタムレスポンスを定義できます。これらのカスタムレスポンスは、JSONを返すオブジェクト、カスタムフィクスチャで応答するローカルファイル、またはインターネットからのリソースでレスポンスを置き換えるウェブリソースのいずれかです。

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

また、以下のようにモックレスポンスパラメータを渡すことで、レスポンスヘッダーとステータスコードも変更できます：

```js
mock.respond({ ... }, {
    // ステータスコード404で応答
    statusCode: 404,
    // 以下のヘッダーでレスポンスヘッダーをマージ
    headers: { 'x-custom-header': 'foobar' }
})
```

モックがバックエンドを呼び出さないようにするには、`fetchResponse`フラグに`false`を渡すことができます。

```js
mock.respond({ ... }, {
    // 実際のバックエンドを呼び出さない
    fetchResponse: false
})
```

カスタムレスポンスはフィクスチャファイルに保存し、テスト内で以下のように要求することをお勧めします：

```js
// JSON importアサーションをサポートするにはNode.js v16.14.0以上が必要
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### テキストリソースのモック

JavaScript、CSSファイルなどのテキストベースのリソースを変更したい場合は、ファイルパスを渡すだけでWebdriverIOが元のリソースを置き換えます：

```js
const scriptMock = await browser.mock('**/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// または独自のJSで応答
scriptMock.respond('alert("I am a mocked resource")')
```

### ウェブリソースのリダイレクト

希望するレスポンスがすでにウェブ上にホストされている場合、ウェブリソースを別のウェブリソースで置き換えることもできます。これは個々のページリソースだけでなく、ウェブページ自体でも機能します：

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"を返す
```

### 動的レスポンス

モックレスポンスが元のリソースレスポンスに依存する場合、元のレスポンスをパラメータとして受け取る関数を渡すことで、返り値に基づいてモックを設定することもできます：

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
    method: 'get'
})

mock.respond((req) => {
    // todoコンテンツをリスト番号に置き換える
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

カスタムレスポンスを返す代わりに、以下のいずれかのHTTPエラーでリクエストを中止することもできます：

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

これは、機能テストに悪影響を与えるサードパーティのスクリプトをページからブロックしたい場合に非常に便利です。`abort`または`abortOnce`を呼び出すだけでモックを中止できます：

```js
const mock = await browser.mock('https://www.google-analytics.com/**')
mock.abort('Failed')
```

## スパイ

すべてのモックは自動的にスパイとなり、ブラウザがそのリソースに対して行ったリクエストの回数をカウントします。モックにカスタムレスポンスや中止理由を適用しない場合、通常受け取るデフォルトのレスポンスで続行します。これにより、ブラウザが特定のAPIエンドポイントなどにリクエストを何回行ったかを確認できます。

```js
const mock = await browser.mock('**/user', { method: 'post' })
console.log(mock.calls.length) // 0を返す

// ユーザー登録
await $('#username').setValue('randomUser')
await $('password').setValue('password123')
await $('password_repeat').setValue('password123')
await $('button[type="submit"]').click()

// APIリクエストが行われたか確認
expect(mock.calls.length).toBe(1)

// レスポンスを検証
expect(mock.calls[0].body).toEqual({ success: true })
```