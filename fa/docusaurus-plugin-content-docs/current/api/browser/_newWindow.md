---
id: newWindow
title: پنجره جدید
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/newWindow.ts
---

باز کردن پنجره یا تب جدید در مرورگر (اگر مشخص نشده باشد، به طور پیش‌فرض یک پنجره جدید باز می‌شود).
این دستور معادل تابع `window.open()` است. این دستور در محیط‌های موبایل کار نمی‌کند.

__نکته:__ هنگام فراخوانی این دستور، به طور خودکار به پنجره یا تب جدید منتقل می‌شوید.

##### استفاده

```js
browser.newWindow(url, { type, windowName, windowFeatures })
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
      <td><code><var>url</var></code></td>
      <td>`string`</td>
      <td>آدرس وب‌سایتی که باید باز شود</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`NewWindowOptions`</td>
      <td>گزینه‌های دستور newWindow</td>
    </tr>
    <tr>
      <td><code><var>options.type</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`string`</td>
      <td>نوع پنجره جدید: 'tab' یا 'window'</td>
    </tr>
    <tr>
      <td><code><var>options.windowName</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`String`</td>
      <td>نام پنجره جدید</td>
    </tr>
    <tr>
      <td><code><var>options.windowFeatures</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`String`</td>
      <td>ویژگی‌های پنجره باز شده (مانند اندازه، موقعیت، نوار اسکرول و غیره)</td>
    </tr>
  </tbody>
</table>

##### مثال‌ها

```js title="newWindowSync.js"
it('should open a new window', async () => {
    await browser.url('https://google.com')
    console.log(await browser.getTitle()) // outputs: "Google"

    const result = await browser.newWindow('https://webdriver.io', {
        windowName: 'WebdriverIO window',
        windowFeature: 'width=420,height=230,resizable,scrollbars=yes,status=1',
    })
    console.log(await browser.getTitle()) // outputs: "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
    console.log(result.type) // outputs: "window"
    const handles = await browser.getWindowHandles()
    await browser.switchToWindow(handles[1])
    await browser.closeWindow()
    await browser.switchToWindow(handles[0])
    console.log(await browser.getTitle()) // outputs: "Google"
});

```

```js title="newTabSync.js"
  it('should open a new tab', async () => {
      await browser.url('https://google.com')
      console.log(await browser.getTitle()) // outputs: "Google"

      await browser.newWindow('https://webdriver.io', {
          type:'tab',
          windowName: 'WebdriverIO window',
          windowFeature: 'width=420,height=230,resizable,scrollbars=yes,status=1',
      })
      console.log(await browser.getTitle()) // outputs: "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
      console.log(result.type) // outputs: "tab"
      const handles = await browser.getWindowHandles()
      await browser.switchToWindow(handles[1])
      await browser.closeWindow()
      await browser.switchToWindow(handles[0])
      console.log(await browser.getTitle()) // outputs: "Google"
 });
```

##### مقادیر برگشتی

- **&lt;Object&gt;**
            **<code><var>return</var></code>:**           یک شی شامل شناسه پنجره و نوع پنجره جدید `{handle: string, type: string}` handle - شناسه‌ی پنجره تب یا پنجره جدید، type - نوع پنجره جدید، که می‌تواند 'tab' یا 'window' باشد    
##### خطاها

- **Error**:  اگر `url` نامعتبر باشد، اگر فرمان روی موبایل استفاده شود، یا `type` 'tab' یا 'window' نباشد.