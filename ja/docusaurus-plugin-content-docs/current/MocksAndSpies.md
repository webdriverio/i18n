---
id: mocksandspies
title: リクエストモックとスパイ
---

WebdriverIOには、バックエンドやモックサーバーをセットアップしなくても、フロントエンドアプリケーションのテストに集中できるネットワークレスポンスを変更するための組み込みサポートがあります。REST APIリクエストなどのウェブリソースに対するカスタムレスポンスをテストで定義し、動的に変更することができます。

:::info

`mock`コマンドを使用するには、Chrome DevToolsプロトコルのサポートが必要です。このサポートは、Chromiumベースのブラウザでローカルにテストを実行する場合、Selenium Grid v4以上を介して、またはChrome DevToolsプロトコルをサポートするクラウドベンダー（SauceLabs、BrowserStack、LambdaTestなど）を通じて提供されます。完全なクロスブラウザサポートは、必要なプリミティブが[Webdriver Bidi](https://wpt.fyi/results/webdriver/tests/bidi/network?label=experimental&label=master&aligned)に導入され、それぞれのブラウザに実装された後に利用可能になります。

:::

## モックの作成

レスポンスを変更する前に、まずモックを定義する必要があります。このモックはリソースURLによって記述され、[リクエストメソッド](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)や[ヘッダー](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)によってフィルタリングできます。リソースは[minimatch](https://www.npmjs.com/package/minimatch)によるグロブ表現をサポートしています：

```js
// "/users/list"で終わるすべてのリソースをモック
const userListMock = await browser.mock('**/users/list')

// または、ヘッダーやステータスコードでリソースをフィルタリングしてモックを指定することもできます
// JSONリソースへの成功したリクエストのみをモック
const strictMock = await browser.mock('**', {
    // すべてのJSONレスポンスをモック
    requestHeaders: { 'Content-Type': 'application/json' },
    // 成功したものだけ
    statusCode: 200
})
```

## カスタムレスポンスの指定

モックを定義したら、それに対するカスタムレスポンスを定義できます。これらのカスタムレスポンスは、JSONを返すオブジェクト、カスタムフィクスチャで応答するローカルファイル、またはインターネットからのリソースでレスポンスを置き換えるウェブリソースのいずれかになります。

### APIリクエストのモック

JSONレスポンスを期待するAPIリクエストをモックするには、モックオブジェクトに対して返したい任意のオブジェクトを指定して`respond`を呼び出すだけです：

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

モックがバックエンドを一切呼び出さないようにしたい場合は、`fetchResponse`フラグに`false`を渡すことができます。

```js
mock.respond({ ... }, {
    // 実際のバックエンドを呼び出さない
    fetchResponse: false
})
```

カスタムレスポンスをフィクスチャファイルに保存し、テストで以下のように読み込むことをお勧めします：

```js
// JSONインポートアサーションをサポートするにはNode.js v16.14.0以上が必要
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### テキストリソースのモック

JavaScript、CSSファイルなどのテキストベースのリソースを変更したい場合は、ファイルパスを渡すだけでWebdriverIOが元のリソースと置き換えます：

```js
const scriptMock = await browser.mock('**/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// またはカスタムJSで応答
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

モックレスポンスが元のリソースレスポンスに依存する場合、元のレスポンスをパラメータとして受け取る関数を渡すことで、リソースを動的に変更することもできます。戻り値に基づいてモックが設定されます：

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
// 戻り値:
// [
//   '0',  '1',  '2',  '19', '20',
//   '21', '3',  '4',  '5',  '6',
//   '7',  '8',  '9',  '10', '11',
//   '12', '13', '14', '15', '16',
//   '17', '18', '22'
// ]
```

## モックの中断

カスタムレスポンスを返す代わりに、以下のいずれかのHTTPエラーでリクエストを中断することもできます：

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

これは、機能テストに悪影響を与えるようなページのサードパーティスクリプトをブロックしたい場合に非常に便利です。モックを中断するには、`abort`または`abortOnce`を呼び出すだけです：

```js
const mock = await browser.mock('https://www.google-analytics.com/**')
mock.abort('Failed')
```

## スパイ

すべてのモックは自動的にスパイとなり、ブラウザがそのリソースにリクエストを行った回数をカウントします。モックにカスタムレスポンスや中断理由を適用しない場合、通常受け取るデフォルトのレスポンスが継続されます。これにより、ブラウザが特定のAPIエンドポイントなどにリクエストを行った回数を確認できます。

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