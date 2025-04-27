---
id: setCookies
title: setCookies
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setCookies.ts
---

Устанавливает один или несколько [cookies](https://w3c.github.io/webdriver/#cookies) для текущей страницы. Убедитесь, что вы
находитесь на странице, которая должна получить cookie. Вы не можете установить cookie для произвольной страницы,
не находясь на этой странице.

##### Использование

```js
browser.setCookies({ name, value, path, domain, secure, httpOnly, expiry, sameSite })
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
      <td><code><var>cookie</var></code></td>
      <td>`Array<WebDriverCookie>, WebDriverCookie`</td>
      <td>объект cookie или массив объектов.</td>
    </tr>
    <tr>
      <td><code><var>cookie.name</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`String`</td>
      <td>Имя cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.value</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`String`</td>
      <td>Значение cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.path</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`String`</td>
      <td>Путь cookie. По умолчанию "/" если опущено при добавлении cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.domain</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`String`</td>
      <td>Домен, для которого видим cookie. По умолчанию используется домен URL активного документа текущего контекста просмотра, если опущено при добавлении cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.secure</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`Boolean`</td>
      <td>Является ли cookie безопасным. По умолчанию false, если опущено при добавлении cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.httpOnly</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`Boolean`</td>
      <td>Является ли cookie доступным только через HTTP. По умолчанию false, если опущено при добавлении cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.expiry</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`Number`</td>
      <td>Когда срок действия cookie истекает, указано в секундах с начала эпохи Unix. Не должно устанавливаться, если опущено при добавлении cookie.</td>
    </tr>
    <tr>
      <td><code><var>cookie.sameSite</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`String`</td>
      <td>Применяется ли к cookie политика SameSite. По умолчанию None, если опущено при добавлении cookie. Может быть установлено в "Lax" или "Strict".</td>
    </tr>
  </tbody>
</table>

##### Пример

```js title="setCookies.js"
it('should set a cookie for the page', async () => {
    await browser.url('/')

    // set a single cookie
    await browser.setCookies({
        name: 'test1',
        value: 'one'
        // The below options are optional
        // path: '/foo', // The cookie path. Defaults to "/"
        // domain: '.example.com', // The domain the cookie is visible to. Defaults to the current browsing context's active document's URL domain
        // secure: true, // Whether the cookie is a secure cookie. Defaults to false
        // httpOnly: true, // Whether the cookie is an HTTP only cookie. Defaults to false
        // expiry: 1551393875 // When the cookie expires, specified in seconds since Unix Epoch
    })

    // set multiple cookies
    await browser.setCookies([
        {name: 'test2', value: 'two'},
        {name: 'test3', value: 'three'}
    ])

    const cookies = await browser.getCookies()
    console.log(cookies);
    // outputs:
    // [
    //      {name: 'test1', value: 'one', domain: 'www.example.com'},
    //      {name: 'test2', value: 'two', domain: 'www.example.com'},
    //      {name: 'test3', value: 'three', domain: 'www.example.com'}
    // ]
});
```