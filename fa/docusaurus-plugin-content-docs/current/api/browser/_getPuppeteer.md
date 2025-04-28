---
id: getPuppeteer
title: دریافت puppeteer
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/getPuppeteer.ts
---

دریافت [نمونه مرورگر Puppeteer](https://pptr.dev/#?product=Puppeteer&version=v5.1.0&show=api-class-browser)
برای اجرای دستورات با Puppeteer. توجه داشته باشید که تمام دستورات Puppeteer
به صورت پیش‌فرض غیرهمزمان هستند، بنابراین برای تبدیل بین اجرای همزمان و غیرهمزمان،
مطمئن شوید که فراخوانی‌های Puppeteer خود را در داخل دستور `browser.call`
قرار دهید، همانطور که در مثال نشان داده شده است.

:::info

توجه داشته باشید که استفاده از Puppeteer نیازمند پشتیبانی از پروتکل Chrome DevTools است و
به عنوان مثال نمی‌تواند هنگام اجرای آزمون‌های خودکار در ابر استفاده شود. پروتکل Chrome DevTools به طور پیش‌فرض نصب نمی‌شود،
از `npm install puppeteer-core` برای نصب آن استفاده کنید.
اطلاعات بیشتر را در بخش [پروتکل‌های اتوماسیون](/docs/automationProtocols) بیابید.

:::

:::info

توجه: Puppeteer در حال حاضر هنگام اجرای [آزمون‌های کامپوننت](/docs/component-testing) __پشتیبانی نمی‌شود__.

:::

##### استفاده

```js
browser.getPuppeteer()
```

##### مثال

```js title="getPuppeteer.test.js"
it('should allow me to use Puppeteer', async () => {
    // WebDriver command
    await browser.url('https://webdriver.io')

    const puppeteerBrowser = await browser.getPuppeteer()
    // switch to Puppeteer
    const metrics = await browser.call(async () => {
        const pages = await puppeteerBrowser.pages()
        pages[0].setGeolocation({ latitude: 59.95, longitude: 30.31667 })
        return pages[0].metrics()
    })

    console.log(metrics.LayoutCount) // returns LayoutCount value
})
```

##### برگشتی

- **&lt;PuppeteerBrowser&gt;**
            **<code><var>return</var></code>:**   نمونه puppeteer راه‌اندازی شده متصل به مرورگر