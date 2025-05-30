---
id: respondOnce
title: respondOnce（一度だけ応答する）
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/respondOnce.ts
---

指定された上書きで一度だけ応答します。複数回連続して `respondOnce` を呼び出すことができ、最後に定義した応答から始まります。もし `respondOnce` のみを使用し、モックが定義されている回数よりも多くリソースが呼び出された場合は、元のリソースに戻ります。

##### 使用方法

```js
mock.respondOnce(overwrites, { header, statusCode, fetchResponse })
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
      <td><code><var>overwrites</var></code></td>
      <td>`MockOverwrite`</td>
      <td>レスポンスを上書きするペイロード</td>
    </tr>
    <tr>
      <td><code><var>params</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`MockResponseParams`</td>
      <td>上書きする追加の応答パラメータ</td>
    </tr>
    <tr>
      <td><code><var>params.header</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Object`</td>
      <td>特定のヘッダーを上書きする</td>
    </tr>
    <tr>
      <td><code><var>params.statusCode</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Number`</td>
      <td>レスポンスステータスコードを上書きする</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`Boolean`</td>
      <td>モックデータで応答する前に実際のレスポンスを取得する</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="respondOnce.js"
async function getToDos () {
    await $('#todo-list li').waitForExist()
    return $$('#todo-list li').map(el => el.getText())
}

it('should demonstrate the respondOnce command', async () => {
    const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
        method: 'get'
    })

    mock.respondOnce([{
        title: '3'
    }, {
        title: '2'
    }, {
        title: '1'
    }])

    mock.respondOnce([{
        title: '2'
    }, {
        title: '1'
    }])

    mock.respondOnce([{
        title: '1'
    }])

    await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')
    console.log(await getToDos()) // outputs [ '3', '2', '1' ]
    await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')
    console.log(await getToDos()) // outputs [ '2', '1' ]
    await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')
    console.log(await getToDos()) // outputs [ '1' ]
    await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')
    console.log(await getToDos()) // outputs actual resource response
})
```