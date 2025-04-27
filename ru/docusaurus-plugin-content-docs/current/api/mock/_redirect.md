---
id: redirect
title: redirect
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/redirect.ts
---

Настраивает перенаправление для заданного мока. Это позволяет перенаправить запрос на другой URL.
Примечание: эти перенаправления применяются только к запросам, сделанным скриптом в браузере, а не при вызове команды `url`.

##### Использование

```js
mock.redirect(url)
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
      <td><code><var>url</var></code></td>
      <td>`string`</td>
      <td>целевой ресурс для перенаправления запросов</td>
    </tr>
  </tbody>
</table>

##### Пример

```js title="respond.js"
it('redirects all my API request to my staging server', async () => {
    const mock = await browser.mock('https://application.com/api/*')
    mock.redirect('https://staging.application.com/api/*')

    // is the same as
    mock.request({ url: 'https://staging.application.com/api/*' })

    // ...
})
```