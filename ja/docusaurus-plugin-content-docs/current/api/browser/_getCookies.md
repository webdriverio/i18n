---
id: getCookies
title: getCookies
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/getCookies.ts
---

現在のページで表示される[クッキー](https://w3c.github.io/webdriver/webdriver-spec.html#cookies)を取得します。
クッキー名を指定して特定のクッキーを照会したり、すべてを取得したりすることができます。

##### 使用方法

```js
browser.getCookies(filter)
```

##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>filter</var></code></td>
      <td>`remote.StorageCookieFilter`</td>
      <td>特定の属性を持つクッキーをフィルタリングするためのオブジェクト</td>
    </tr>
  </tbody>
</table>

##### 例

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

##### 戻り値

- **&lt;Cookie[]&gt;**
            **<code><var>return</var></code>:**                            リクエストされたクッキー