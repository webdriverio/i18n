---
id: call
title: call
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/call.ts
---

Ви можете використовувати `call` для виконання будь-якої асинхронної дії у вашому тесті.
Він приймає проміси та зупиняє виконання, доки проміс не буде вирішено.

:::info

Оскільки WebdriverIO відмовляється від синхронного використання (див. [RFC](https://github.com/webdriverio/webdriverio/discussions/6702)),
ця команда більше не є дуже корисною.

:::

##### Використання

```js
browser.call(callback)
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
      <td><code><var>callback</var></code></td>
      <td>`Function`</td>
      <td>функція, яка буде викликана</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js title="call.js"
it('some testing here', async () => {
    await browser.url('http://google.com')
    // make an asynchronous call using any 3rd party library supporting promises
    // e.g. call to backend or db to inject fixture data
    await browser.call(() => {
        return somePromiseLibrary.someMethod().then(() => {
            // ...
        })
    })

    // example for async call to 3rd party library that doesn't support promises
    const result = await browser.call(() => {
        return new Promise((resolve, reject) => {
            someOtherNodeLibrary.someMethod(param1, (err, res) => {
                if (err) {
                    return reject(err)
                }
                resolve(res)
            })
        })
    })
});
```