---
id: clear
title: پاک کردن
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/clear.ts
---

تمام اطلاعات ذخیره شده در آرایه `mock.calls` را بازنشانی می‌کند.

##### استفاده

```js
mock.clear()
```

##### مثال

```js title="clear.js"
it('should clear mock', async () => {
    const mock = await browser.mock('https://google.com/')
    await browser.url('https://google.com')

    console.log(mock.calls.length) // returns 1
    mock.clear()
    console.log(mock.calls.length) // returns 0
})
```