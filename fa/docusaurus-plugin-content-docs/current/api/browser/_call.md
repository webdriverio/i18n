---
id: call
title: فراخوانی
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/call.ts
---

شما می‌توانید از `call` برای اجرای هر عمل غیرهمزمان در تست خود استفاده کنید.
این دستور قول‌ها (promises) را می‌پذیرد و اجرا را تا زمانی که قول حل شود، متوقف می‌کند.

:::info

با توجه به اینکه WebdriverIO استفاده همزمان را منسوخ کرده است (به [RFC](https://github.com/webdriverio/webdriverio/discussions/6702) مراجعه کنید)،
این دستور دیگر چندان مفید نیست.

:::

##### استفاده

```js
browser.call(callback)
```

##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>callback</var></code></td>
      <td>`Function`</td>
      <td>تابعی که باید فراخوانی شود</td>
    </tr>
  </tbody>
</table>

##### مثال

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