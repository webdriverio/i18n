---
id: requestOnce
title: requestOnce
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/requestOnce.ts
---

Змінює параметр запиту лише один раз із заданим перезаписом для наступного запиту. Ви можете викликати `requestOnce` кілька
разів поспіль, і перезаписи будуть застосовані по порядку. Якщо ви використовуєте тільки `requestOnce`, а ресурс викликається
більше разів, ніж визначено мок, то за замовчуванням він повертається до оригінального ресурсу.

##### Використання

```js
mock.requestOnce({ header, cookies, method, url, header, statusCode, fetchResponse })
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
      <td><code><var>overwrites</var></code></td>
      <td>`MockOverwrite`</td>
      <td>дані для перезапису відповіді</td>
    </tr>
    <tr>
      <td><code><var>overwrites.header</var></code></td>
      <td>`Record<string, string>`</td>
      <td>перезапис конкретних заголовків</td>
    </tr>
    <tr>
      <td><code><var>overwrites.cookies</var></code></td>
      <td>`Record<string, string>`</td>
      <td>перезапис кукі запиту</td>
    </tr>
    <tr>
      <td><code><var>overwrites.method</var></code></td>
      <td>`string`</td>
      <td>перезапис методу запиту</td>
    </tr>
    <tr>
      <td><code><var>overwrites.url</var></code></td>
      <td>`string`</td>
      <td>перезапис URL запиту для ініціювання перенаправлення</td>
    </tr>
    <tr>
      <td><code><var>params</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`MockResponseParams`</td>
      <td>додаткові параметри відповіді для перезапису</td>
    </tr>
    <tr>
      <td><code><var>params.header</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`Object`</td>
      <td>перезапис конкретних заголовків</td>
    </tr>
    <tr>
      <td><code><var>params.statusCode</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`Number`</td>
      <td>перезапис коду статусу відповіді</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`Boolean`</td>
      <td>отримати реальну відповідь перед відповіддю з мокованими даними</td>
    </tr>
  </tbody>
</table>

##### Приклад

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