---
id: getCookies
title: getCookies
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/getCookies.ts
---

Получение [cookie](https://w3c.github.io/webdriver/webdriver-spec.html#cookies), 
видимых на текущей странице. Вы можете запросить определенный cookie, указав его имя, или 
получить все.

##### Использование

```js
browser.getCookies(filter)
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
      <td><code><var>filter</var></code></td>
      <td>`remote.StorageCookieFilter`</td>
      <td>объект, который позволяет фильтровать cookies по определенным атрибутам</td>
    </tr>
  </tbody>
</table>

##### Пример

```js title="getCookies.js"
it('should return a cookie for me', async () => {
    await browser.setCookies([
        {name: 'test', value: '123'},
        {name: 'test2', value: '456'}
    ])
    const testCookie = await browser.getCookies(['test'])
    console.log(testCookie); // outputs: [{ name: 'test', value: '123' }]

    const allCookies = await browser.getCookies()
    console.log(allCookies);
    // outputs:
    // [
    //    { name: 'test', value: '123' },
    //    { name: 'test2', value: '456' }
    // ]

    // filter cookies by domain
    const stagingCookies = await browser.getCookies({
        domain: 'staging.myapplication.com'
    })
})
```

##### Возвращает

- **&lt;Cookie[]&gt;**
            **<code><var>return</var></code>:**                            запрошенные cookies