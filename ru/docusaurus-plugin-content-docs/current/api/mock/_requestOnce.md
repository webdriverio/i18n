---
id: requestOnce
title: requestOnce
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/requestOnce.ts
---

Изменяет параметры запроса только один раз с заданной перезаписью для следующего запроса. Вы можете вызывать `requestOnce` несколько раз подряд, и эти перезаписи будут применяться по порядку. Если вы используете только `requestOnce`, и ресурс вызывается больше раз, чем определено в моке, то он возвращается к исходному ресурсу.

##### Использование

```js
mock.requestOnce({ header, cookies, method, url, header, statusCode, fetchResponse })
```

##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>overwrites</var></code></td>
      <td>`MockOverwrite`</td>
      <td>данные для перезаписи ответа</td>
    </tr>
    <tr>
      <td><code><var>overwrites.header</var></code></td>
      <td>`Record<string, string>`</td>
      <td>перезаписать определенные заголовки</td>
    </tr>
    <tr>
      <td><code><var>overwrites.cookies</var></code></td>
      <td>`Record<string, string>`</td>
      <td>перезаписать куки запроса</td>
    </tr>
    <tr>
      <td><code><var>overwrites.method</var></code></td>
      <td>`string`</td>
      <td>перезаписать метод запроса</td>
    </tr>
    <tr>
      <td><code><var>overwrites.url</var></code></td>
      <td>`string`</td>
      <td>перезаписать URL запроса для инициирования перенаправления</td>
    </tr>
    <tr>
      <td><code><var>params</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`MockResponseParams`</td>
      <td>дополнительные параметры ответа для перезаписи</td>
    </tr>
    <tr>
      <td><code><var>params.header</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`Object`</td>
      <td>перезаписать определенные заголовки</td>
    </tr>
    <tr>
      <td><code><var>params.statusCode</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`Number`</td>
      <td>перезаписать код статуса ответа</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`Boolean`</td>
      <td>получить реальный ответ перед ответом с моковыми данными</td>
    </tr>
  </tbody>
</table>

##### Пример

```js title="respond.js"
it('adds different auth headers to my API requests', async () => {
    const mock = await browser.mock('https://application.com/api', {
        method: 'get'
    })

    mock.requestOnce({
        headers: { 'Authorization': 'Bearer token' }
    })
    mock.requestOnce({
        headers: { 'Authorization': 'Another bearer token' }
    })

    await browser.url('https://application.com')
    // ...
})
```