---
id: addCommand
title: إضافة أمر
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/addCommand.ts
---

تساعدك طريقة المتصفح `addCommand` على كتابة مجموعتك الخاصة من الأوامر.

:::info

يمكنك العثور على مزيد من المعلومات حول إضافة أوامر مخصصة في دليل [الأوامر المخصصة](/docs/customcommands#adding-custom-commands).

:::

##### الاستخدام

```js
browser.addCommand(name, callback, elementScope)
```

##### المعاملات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>name</var></code></td>
      <td>`string`</td>
      <td>اسم الأمر المخصص</td>
    </tr>
    <tr>
      <td><code><var>callback</var></code></td>
      <td>`Function`</td>
      <td>الدالة التي سيتم استدعاؤها</td>
    </tr>
    <tr>
      <td><code><var>elementScope</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Boolean`</td>
      <td>توسيع كائن العنصر بدلاً من كائن المتصفح</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="execute.js"
await browser.addCommand('getUrlAndTitle', async function (customParam) {
    // `this` refers to the `browser` scope
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customParam: customParam
    }
})
//usage
it('should use my add command', async () => {
    await browser.url('https://webdriver.io')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://webdriver.io')
    assert.strictEqual(result.title, 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    assert.strictEqual(result.customParam, 'foobar')
})
```