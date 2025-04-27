---
id: request
title: request (запрос)
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/request.ts
---

Позволяет изменять запросы, которые браузер делает во время сессии. Это может быть полезно для следующих случаев использования:

- проверка правильности отправки полезной нагрузки запросов вашим приложением
- передача заголовков авторизации для тестирования защищенных ресурсов
- установка сессионных cookie для тестирования аутентификации пользователей
- изменение запросов для тестирования граничных случаев

##### Использование

```js
mock.request({ header, cookies, method, url, header, statusCode, fetchResponse })
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
      <td>полезная нагрузка для перезаписи ответа</td>
    </tr>
    <tr>
      <td><code><var>overwrites.header</var></code></td>
      <td>`Record<string,string>`</td>
      <td>перезаписать определенные заголовки</td>
    </tr>
    <tr>
      <td><code><var>overwrites.cookies</var></code></td>
      <td>`Record<string,string>`</td>
      <td>перезаписать cookie запроса</td>
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
      <td><code><var>params</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`MockResponseParams`</td>
      <td>дополнительные параметры ответа для перезаписи</td>
    </tr>
    <tr>
      <td><code><var>params.header</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Object`</td>
      <td>перезаписать определенные заголовки</td>
    </tr>
    <tr>
      <td><code><var>params.statusCode</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>перезаписать код статуса ответа</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>получить реальный ответ перед ответом с имитированными данными</td>
    </tr>
  </tbody>
</table>

##### Пример

```js title="respond.js"
it('adds an auth header to my API requests', async () => {
    const mock = await browser.mock('https://application.com/api', {
        method: 'get'
    })

    mock.request({
        headers: { 'Authorization': 'Bearer token' }
    })

    await browser.url('https://application.com')
    // ...
})
```