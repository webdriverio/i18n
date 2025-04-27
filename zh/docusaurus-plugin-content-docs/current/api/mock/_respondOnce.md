---
id: respondOnce
title: respondOnce（一次性响应）
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/respondOnce.ts
---

只使用给定的覆盖进行一次响应。您可以连续多次调用 `respondOnce`，它将从您最后定义的响应开始。如果您只使用 `respondOnce`，且资源被调用的次数超过了定义的模拟次数，它将默认返回原始资源。

##### 用法

```js
mock.respondOnce(overwrites, { header, statusCode, fetchResponse })
```

##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>overwrites</var></code></td>
      <td>`MockOverwrite`</td>
      <td>用于覆盖响应的数据</td>
    </tr>
    <tr>
      <td><code><var>params</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`MockResponseParams`</td>
      <td>要覆盖的其他响应参数</td>
    </tr>
    <tr>
      <td><code><var>params.header</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Object`</td>
      <td>覆盖特定的头信息</td>
    </tr>
    <tr>
      <td><code><var>params.statusCode</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Number`</td>
      <td>覆盖响应状态码</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`Boolean`</td>
      <td>在响应模拟数据前获取真实响应</td>
    </tr>
  </tbody>
</table>

##### 示例

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