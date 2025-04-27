---
id: call
title: call
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/call.ts
---

Вы можете использовать `call` для выполнения любого асинхронного действия в рамках вашей тестовой спецификации.
Эта команда принимает промисы и останавливает выполнение до тех пор, пока промис не будет разрешен.

:::info

Поскольку WebdriverIO отказывается от синхронного использования (см. [RFC](https://github.com/webdriverio/webdriverio/discussions/6702)),
эта команда больше не так полезна.

:::

##### Использование

```js
browser.call(callback)
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
      <td><code><var>callback</var></code></td>
      <td>`Function`</td>
      <td>функция, которая будет вызвана</td>
    </tr>
  </tbody>
</table>

##### Пример

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