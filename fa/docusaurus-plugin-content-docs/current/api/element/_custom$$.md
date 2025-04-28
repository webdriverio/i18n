---
id: custom$$
title: انتخابگر سفارشی چندتایی
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/custom$$.ts
---

دستور `customs$$` به شما اجازه می‌دهد از یک استراتژی سفارشی که با استفاده از `browser.addLocatorStrategy` تعریف شده است، استفاده کنید.
اطلاعات بیشتر درباره استراتژی‌های انتخابگر سفارشی را در [مستندات انتخابگرها](../../selectors#custom-selector-strategies) بخوانید.

##### استفاده

```js
$(selector).custom$$(strategyName, strategyArguments)
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
    await browser.addLocatorStrategy('myStrat', (selector) => {
        return document.querySelectorAll(selector)
    })

    const pluginRowBlock = await browser.custom$('myStrat', '.pluginRowBlock')
    const pluginWrapper = await pluginRowBlock.custom$$('myStrat', '.pluginWrapper')

    console.log(pluginWrapper.length) // 4
})
```

##### مقادیر بازگشتی

- **&lt;WebdriverIO.ElementArray&gt;**