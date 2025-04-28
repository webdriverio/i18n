---
id: restore
title: بازیابی
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/restore.ts
---

تمام کارهایی که `mock.clear()` انجام می‌دهد را انجام داده و همچنین هر مقدار بازگشتی یا پیاده‌سازی موک شده را حذف می‌کند.
موک بازیابی شده رویدادی منتشر نمی‌کند و نمی‌تواند پاسخ‌ها را موک کند.

##### استفاده

```js
mock.restore()
```

##### مثال

```js title="addValue.js"
it('should demonstrate the addValue command', async () => {
    const mock = await browser.mock('**\/googlelogo_color_272x92dp.png')
    mock.respond('https://webdriver.io/img/webdriverio.png')
    await browser.url('https://google.com') // shows WebdriverIO logo instead of Google

    await mock.restore()
    await browser.url('https://google.com') // shows normal Google logo again
})
```