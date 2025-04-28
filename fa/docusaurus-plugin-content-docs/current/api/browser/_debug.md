---
id: debug
title: دیباگ
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/debug.ts
---

این دستور به شما کمک می‌کند تا تست‌های یکپارچه خود را دیباگ کنید. این دستور مرورگر در حال اجرا را متوقف می‌کند و به شما زمان می‌دهد تا به آن وارد شوید و وضعیت برنامه خود را بررسی کنید (مثلاً با استفاده از ابزارهای توسعه).
ترمینال شما به یک رابط [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) تبدیل می‌شود که به شما اجازه می‌دهد برخی دستورات را امتحان کنید، عناصر را پیدا کنید و اقدامات را روی آن‌ها آزمایش کنید.

[![WebdriverIO REPL](https://webdriver.io/img/repl.gif)](https://webdriver.io/img/repl.gif)

اگر از اجراکننده تست WDIO استفاده می‌کنید، مطمئن شوید که ویژگی مهلت زمانی فریم‌ورک تستی که استفاده می‌کنید (مانند Mocha یا Jasmine) را افزایش می‌دهید تا از خاتمه تست به دلیل مهلت زمانی تست جلوگیری شود.
همچنین از اجرای این دستور با چندین قابلیت که همزمان در حال اجرا هستند، خودداری کنید.

<iframe width="560" height="315" src="https://www.youtube.com/embed/xWwP-3B_YyE" frameborder="0" allowFullScreen></iframe>

##### استفاده

```js
browser.debug()
```

##### مثال

```js title="debug.js"
it('should demonstrate the debug command', async () => {
    await $('#input').setValue('FOO')
    await browser.debug() // jumping into the browser and change value of #input to 'BAR'
    const value = await $('#input').getValue()
    console.log(value) // outputs: "BAR"
})
```