---
id: custom$$
title: custom$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/custom$$.ts
---

دستور `customs$$` به شما اجازه می‌دهد از استراتژی سفارشی که با استفاده از `browser.addLocatorStrategy` تعریف شده است، استفاده کنید.
برای اطلاعات بیشتر درباره استراتژی‌های انتخابگر سفارشی به [مستندات انتخابگر](../../selectors#custom-selector-strategies) مراجعه کنید.

##### استفاده

```js
browser.custom$$(strategyName, strategyArguments)
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
      <td><code><var>strategyName</var></code></td>
      <td>`string`</td>
      <td></td>
    </tr>
    <tr>
      <td><code><var>strategyArguments</var></code></td>
      <td>`*`</td>
      <td></td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="example.js"
it('should get all the plugin wrapper buttons', async () => {
    await browser.url('https://webdriver.io')
    await browser.addLocatorStrategy('myStrategy', (selector) => {
        return document.querySelectorAll(selector)
    })

    const pluginWrapper = await browser.custom$$('myStrategy', '.pluginWrapper')

    console.log(await pluginWrapper.length) // 4
})
```

##### مقادیر بازگشتی

- **&lt;WebdriverIO.ElementArray&gt;**