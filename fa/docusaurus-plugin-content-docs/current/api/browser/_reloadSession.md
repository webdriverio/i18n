---
id: reloadSession
title: بارگیری مجدد جلسه
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/reloadSession.ts
---

یک جلسه جدید Selenium با قابلیت‌های فعلی شما ایجاد می‌کند. این برای زمانی مفید است که
برنامه‌های کاربردی با وضعیت‌های پیچیده را آزمایش می‌کنید که نیاز دارید جلسه مرورگر را بین
آزمون‌ها در فایل spec خود پاک کنید تا از ایجاد صدها فایل آزمون تکی با WDIO جلوگیری کنید.
البته مراقب باشید، این دستور به طور قابل توجهی بر زمان آزمون شما تأثیر می‌گذارد زیرا ایجاد
جلسات جدید Selenium بسیار زمان‌بر است، به خصوص هنگام استفاده از خدمات ابری.

پارامترهای اتصال مانند نام میزبان، پورت، پروتکل و غیره را می‌توان در کنار
browserName اضافه کرد، هنگامی که می‌خواهید به یک سرویس از راه دور متفاوت متصل شوید. این در
موقعیت‌هایی مفید است، به عنوان مثال، وقتی آزمون را در یک برنامه بومی شروع می‌کنید و نیاز دارید
داده‌ها را در برنامه وب تأیید کنید.

اگر از یک سرویس از راه دور شروع می‌کنید، می‌توانید 0.0.0.0 را برای نام میزبان وارد کنید اگر می‌خواهید
به درایورهای محلی تغییر وضعیت دهید.

##### استفاده

```js
browser.reloadSession(newCapabilities)
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
      <td><code><var>newCapabilities</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`WebdriverIO.Capabilities`</td>
      <td>قابلیت‌های جدید برای ایجاد یک جلسه</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="reloadSync.js"
it('should reload my session with current capabilities', async () => {
    console.log(browser.sessionId) // outputs: e042b3f3cd5a479da4e171825e96e655
    await browser.reloadSession()
    console.log(browser.sessionId) // outputs: 9a0d9bf9d4864160aa982c50cf18a573
})

it('should reload my session with new capabilities', async () => {
    console.log(browser.capabilities.browserName) // outputs: chrome
    await browser.reloadSession({
        browserName: 'firefox'
    })
    console.log(browser.capabilities.browserName) // outputs: firefox
})

it('should reload my session with new remote', async () => {
    console.log(browser.capabilities.browserName) // outputs: chrome
    await browser.reloadSession({
        protocol: 'https',
        host: '0.0.0.1',
        port: 4444,
        path: '/wd/hub',
        browserName: 'firefox'
    })
    console.log(browser.capabilities.browserName) // outputs: firefox
})
```