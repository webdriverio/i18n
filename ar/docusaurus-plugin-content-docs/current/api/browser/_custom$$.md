---
id: custom$$
title: مخصص$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/custom$$.ts
---

يسمح لك `customs$$` باستخدام استراتيجية مخصصة معلنة باستخدام `browser.addLocatorStrategy`.
اقرأ المزيد عن استراتيجيات المحدد المخصصة في [وثائق المحدد](../../selectors#custom-selector-strategies).

##### الاستخدام

```js
browser.custom$$(strategyName, strategyArguments)
```

##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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

##### يعيد

- **&lt;WebdriverIO.ElementArray&gt;**