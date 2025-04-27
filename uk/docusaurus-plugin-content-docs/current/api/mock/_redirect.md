---
id: redirect
title: перенаправлення
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/redirect.ts
---

Налаштовує перенаправлення для заданого моку. Це дозволяє перенаправити запит на інший URL.
Примітка: ці перенаправлення застосовуються лише до запитів, зроблених скриптом у браузері, а не при виклику команди `url`.

##### Використання

```js
mock.redirect(url)
```

##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code></td>
      <td>`string`</td>
      <td>цільовий ресурс для перенаправлення запитів</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js title="respond.js"
it('redirects all my API request to my staging server', async () => {
    const mock = await browser.mock('https://application.com/api/*')
    mock.redirect('https://staging.application.com/api/*')

    // is the same as
    mock.request({ url: 'https://staging.application.com/api/*' })

    // ...
})
```