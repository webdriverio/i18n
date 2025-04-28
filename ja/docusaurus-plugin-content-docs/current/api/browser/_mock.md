---
id: mock
title: モック
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/mock.ts
---

リクエストの応答をモックします。[URLPattern](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern)に一致するモックとそれに対応するヘッダーとステータスコードを定義することができます。mockメソッドを呼び出すと、Webリソースの応答を変更するために使用できるスタブオブジェクトが返されます。

スタブオブジェクトを使用して、カスタムレスポンスを返すか、リクエストを失敗させることができます。

レスポンスを変更する方法は3つあります：
- カスタムJSONオブジェクトを返す（APIリクエストのスタブ化用）
- Webリソースをローカルファイルに置き換える（修正されたJavaScriptファイルを提供する）
- リソースを別のURLにリダイレクトする

:::info

`mock`コマンドの使用にはWebDriver Bidiのサポートが必要です。これは通常、ChromiumベースのブラウザやFirefoxでローカルにテストを実行する場合や、Selenium Grid v4以上を使用する場合に該当します。クラウドでテストを実行する場合は、クラウドプロバイダーがWebDriver Bidiをサポートしていることを確認してください。

:::

:::info

`URLPattern`は実験的な技術であり、Node.jsなどの一部の環境ではまだサポートされていません。
この機能がより広くサポートされるまで、[ポリフィル](https://www.npmjs.com/package/urlpattern-polyfill)をインポートすることをお勧めします。

:::

##### 使用法

```js
browser.mock(url, { method, requestHeaders, responseHeaders, postData, statusCode })
```

##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code></td>
      <td>`String`</td>
      <td>モックするURL</td>
    </tr>
    <tr>
      <td><code><var>filterOptions</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`MockFilterOptions`</td>
      <td>追加オプションでモックリソースをフィルタリング</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.method</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`String, Function`</td>
      <td>HTTPメソッドでリソースをフィルタリング</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.requestHeaders</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Object, Function`</td>
      <td>特定のリクエストヘッダーでリソースをフィルタリング</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.responseHeaders</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Object, Function`</td>
      <td>特定のレスポンスヘッダーでリソースをフィルタリング</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.postData</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`String, Function`</td>
      <td>リクエストのpostDataでリソースをフィルタリング</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.statusCode</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Number, Function`</td>
      <td>レスポンスのステータスコードでリソースをフィルタリング</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="mock.js"
it('should mock network resources', async () => {
    // via static string
    const userListMock = await browser.mock('**' + '/users/list')
    // or as regular expression
    const userListMock = await browser.mock(/https:\/\/(domainA|domainB)\.com\/.+/)
    // you can also specifying the mock even more by filtering resources
    // by request or response headers, status code, postData, e.g. mock only responses with specific
    // header set and statusCode
    const strictMock = await browser.mock('**', {
        // mock all json responses
        statusCode: 200,
        requestHeaders: { 'Content-Type': 'application/json' },
        responseHeaders: { 'Cache-Control': 'no-cache' },
        postData: 'foobar'
    })

    // comparator function
    const apiV1Mock = await browser.mock('**' + '/api/v1', {
        statusCode: (statusCode) => statusCode >= 200 && statusCode <= 203,
        requestHeaders: (headers) => headers['Authorization'] && headers['Authorization'].startsWith('Bearer '),
        responseHeaders: (headers) => headers['Impersonation'],
        postData: (data) => typeof data === 'string' && data.includes('foo')
    })
})

it('should modify API responses', async () => {
    // filter by method
    const todoMock = await browser.mock('**' + '/todos', {
        method: 'get'
    })

    // mock an endpoint with a fixed fixture
    todoMock.respond([{
        title: 'Injected Todo',
        order: null,
        completed: false,
        url: "http://todo-backend-express-knex.herokuapp.com/916"
    }])

    // respond with different status code or header
    todoMock.respond([{
        title: 'Injected Todo',
        order: null,
        completed: false,
        url: "http://todo-backend-express-knex.herokuapp.com/916"
    }], {
        statusCode: 404,
        headers: {
            'x-custom-header': 'foobar'
        }
    })
})

it('should modify text assets', async () => {
    const scriptMock = await browser.mock('**' + '/script.min.js')
    scriptMock.respond('./tests/fixtures/script.js')
})

it('should redirect web resources', async () => {
    const headerMock = await browser.mock('**' + '/header.png')
    headerMock.respond('https://media.giphy.com/media/F9hQLAVhWnL56/giphy.gif')

    const pageMock = await browser.mock('https://google.com/')
    pageMock.respond('https://webdriver.io')
    await browser.url('https://google.com')
    console.log(await browser.getTitle()) // returns "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
})
```

##### 戻り値

- **&lt;Mock&gt;**
            **<code><var>return</var></code>:**                                                レスポンスを変更するためのモックオブジェクト