---
id: addInitScript
title: افزودن اسکریپت اولیه
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/addInitScript.ts
---

اسکریپتی را اضافه می‌کند که در یکی از سناریوهای زیر ارزیابی می‌شود:

- هر زمان که صفحه پیمایش می‌شود.
- هر زمان که فریم فرزند پیوست یا پیمایش می‌شود. در این حالت، اسکریپت در زمینه فریم تازه پیوست‌شده ارزیابی می‌شود.

اسکریپت پس از ایجاد سند اما قبل از اجرای هر یک از اسکریپت‌های آن ارزیابی می‌شود.
برای حذف مجدد اسکریپت مقداردهی اولیه از صفحه، تابعی را که توسط این تابع برگردانده شده است، فراخوانی کنید.

این برای اصلاح محیط جاوااسکریپت مفید است، به عنوان مثال برای مقداردهی اولیه Math.random.

##### استفاده

```js
browser.addInitScript(script, args)
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
      <td><code><var>script</var></code></td>
      <td>`Function`</td>
      <td>تابعی که به عنوان اسکریپت مقداردهی اولیه تزریق می‌شود</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>`number, string, boolean`</td>
      <td>پارامترهایی برای اسکریپت</td>
    </tr>
  </tbody>
</table>

##### مثال‌ها

```js title="addInitScript.js"
const script = await browser.addInitScript((seed) => {
    Math.random = () => seed
}, 42)

await browser.url('https://webdriver.io')
console.log(await browser.execute(() => Math.random())) // returns 42

await reset()
await browser.url('https://webdriver.io')
console.log(await browser.execute(() => Math.random())) // returns a random number

hermore you can also use the `emit` function to send data back to the Node.js environment.
 is useful if you want to observe certain events in the browser environment, e.g.:

```

```js title="addInitScriptWithEmit.js"
const script = await browser.addInitScript((emit) => {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      emit(mutation.target.nodeName)
    }
  })
  observer.observe(document, { childList: true, subtree: true })
})

script.on('data', (data) => {
  console.log(data) // prints: BODY, DIV, P, ...
})
```