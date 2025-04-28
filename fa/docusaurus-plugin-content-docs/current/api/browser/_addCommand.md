---
id: addCommand
title: افزودن دستور
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/addCommand.ts
---

متد مرورگر `addCommand` به شما کمک می‌کند تا مجموعه‌ای از دستورات خود را بنویسید.

:::info

شما می‌توانید اطلاعات بیشتر در مورد افزودن دستورات سفارشی را در راهنمای [دستور سفارشی](/docs/customcommands#adding-custom-commands) پیدا کنید.

:::

##### استفاده

```js
browser.addCommand(name, callback, elementScope)
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
      <td><code><var>name</var></code></td>
      <td>`string`</td>
      <td>نام دستور سفارشی</td>
    </tr>
    <tr>
      <td><code><var>callback</var></code></td>
      <td>`Function`</td>
      <td>تابعی که باید فراخوانی شود</td>
    </tr>
    <tr>
      <td><code><var>elementScope</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Boolean`</td>
      <td>گسترش شیء Element به جای شیء Browser</td>
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