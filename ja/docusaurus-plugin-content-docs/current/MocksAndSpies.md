---
id: mocksandspies
title: リクエストモックとスパイ
---

WebdriverIOには、バックエンドやモックサーバーをセットアップすることなく、フロントエンドアプリケーションのテストに集中できるように、ネットワークレスポンスを変更するためのサポートが組み込まれています。テスト内でREST APIリクエストなどのウェブリソースに対するカスタムレスポンスを定義し、それらを動的に変更することができます。

:::info

`mock`コマンドを使用するには、Chrome DevToolsプロトコルのサポートが必要です。このサポートは、Chromiumベースのブラウザでテストをローカルで実行する場合、Selenium Grid v4以上を介して、またはChrome DevToolsプロトコルをサポートするクラウドベンダー（例：SauceLabs、BrowserStack、LambdaTest）を通じて提供されます。必要なプリミティブが[Webdriver Bidi](https://wpt.fyi/results/webdriver/tests/bidi/network?label=experimental&label=master&aligned)に実装され、それぞれのブラウザに実装されると、完全なクロスブラウザサポートが利用可能になります。

:::

## モックの作成

任意のレスポンスを変更する前に、まずモックを定義する必要があります。このモックはリソースURLによって記述され、[リクエストメソッド](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)や[ヘッダー](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)によってフィルタリングすることができます。リソースは[minimatch](https://www.npmjs.com/package/minimatch)によるグロブ表現をサポートしています：

```js
// "/users/list"で終わるすべてのリソースをモック
const userListMock = await browser.mock('**/users/list')

// または、ヘッダーやステータスコードでリソースをフィルタリングして
// モックを指定することもできます。JSONリソースへの成功したリクエストのみをモック
const strictMock = await browser.mock('**', {
    // すべてのJSONレスポンスをモック
    requestHeaders: { 'Content-Type': 'application/json' },
    // 成功したもののみ
    statusCode: 200
})
```

## カスタムレスポンスの指定

モックを定義した後、そのモックに対してカスタムレスポンスを定義することができます。これらのカスタムレスポンスは、JSONを応答するオブジェクト、カスタムフィクスチャで応答するローカルファイル、またはインターネットからのリソースでレスポンスを置き換えるウェブリソースのいずれかになります。

### APIリクエストのモック

JSONレスポンスが期待されるAPIリクエストをモックするには、返したい任意のオブジェクトでモックオブジェクトの`respond`を呼び出すだけです：

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
    // レスポンスヘッダーを次のヘッダーとマージ
    headers: { 'x-custom-header': 'foobar' }
})
```

バックエンドに全く呼び出しをしたくない場合は、`fetchResponse`フラグに`false`を渡すことができます。

```js
mock.respond({ ... }, {
    // 実際のバックエンドを呼び出さない
    fetchResponse: false
})
```

カスタムレスポンスはフィクスチャファイルに保存して、テスト内で以下のように読み込むことをお勧めします：

```js
// JSONインポートアサーションをサポートするにはNode.js v16.14.0以上が必要
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### テキストリソースのモック

JavaScript、CSSファイル、またはその他のテキストベースのリソースなどを変更したい場合は、単にファイルパスを渡すだけでWebdriverIOが元のリソースをそれに置き換えます：

```js
const scriptMock = await browser.mock('**/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// または独自のJSで応答
scriptMock.respond('alert("I am a mocked resource")')
```

### ウェブリソースのリダイレクト

希望するレスポンスがすでにウェブ上でホストされている場合は、ウェブリソースを別のウェブリソースに置き換えることもできます。これは個々のページリソースだけでなく、ウェブページ自体でも機能します：

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"を返します
```

### 動的なレスポンス

モックレスポンスが元のリソースレスポンスに依存する場合は、元のレスポンスをパラメータとして受け取り、戻り値に基づいてモックを設定する関数を渡すことで、リソースを動的に変更することもできます：

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
    method: 'get'
})

mock.respond((req) => {
    // todoの内容をリスト番号に置き換える
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

カスタムレスポンスを返す代わりに、以下のHTTPエラーのいずれかでリクエストを中止することもできます：

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

これは、機能テストに悪影響を与える可能性がある3rdパーティのスクリプトをページからブロックしたい場合に非常に便利です。モックを中止するには、単に`abort`または`abortOnce`を呼び出します：

```js
const mock = await browser.mock('https://www.google-analytics.com/**')
mock.abort('Failed')
```

## スパイ

すべてのモックは自動的にスパイとなり、ブラウザがそのリソースに対して行ったリクエストの数をカウントします。モックにカスタムレスポンスや中止理由を適用しない場合、通常受け取るデフォルトのレスポンスで継続されます。これにより、ブラウザが特定のAPIエンドポイントなどに対して何回リクエストを行ったかを確認することができます。

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

マッチするリクエストのレスポンスを待機する必要がある場合は、`mock.waitForResponse(options)`を使用してください。APIリファレンスを参照: [waitForResponse](/docs/api/mock/waitForResponse)。