---
id: browser-logs
title: لاگ‌های مرورگر
---

هنگام اجرای تست‌ها، مرورگر ممکن است اطلاعات مهمی را ثبت کند که شما به آن علاقه‌مند هستید یا می‌خواهید در برابر آن اثبات کنید.

<Tabs
defaultValue="bidi"
values={[
    {label: 'Bidi', value: 'bidi'},
    {label: 'Classic (Deprecated)', value: 'classic'
}]
}>

<TabItem value='bidi'>

هنگام استفاده از WebDriver Bidi، که روش پیش‌فرض اتوماسیون مرورگر در WebdriverIO است، می‌توانید در رویدادهای مرورگر مشترک شوید. برای رویدادهای لاگ، باید به `log.entryAdded` گوش دهید، به عنوان مثال:

```ts
await browser.sessionSubscribe({ events: ['log.entryAdded'] })

/**
 * returns: {"type":"console","method":"log","realm":null,"args":[{"type":"string","value":"Hello Bidi"}],"level":"info","text":"Hello Bidi","timestamp":1657282076037}
 */
browser.on('log.entryAdded', (entryAdded) => console.log('received %s', entryAdded))
```

در یک تست می‌توانید رویدادهای لاگ را به یک آرایه اضافه کنید و پس از انجام عملیات مورد نظر، آن آرایه را بررسی کنید، به عنوان مثال:

```ts
import type { local } from 'webdriver'

describe('should log when doing a certain action', () => {
    const logs: string[] = []

    function logEvents (event: local.LogEntry) {
        logs.push(event.text) // add log message to the array
    }

    before(async () => {
        await browser.sessionSubscribe({ events: ['log.entryAdded'] })
        browser.on('log.entryAdded', logEvents)
    })

    it('should trigger the console event', () => {
        // trigger the browser send a message to the console
        ...

        // assert if log was captured
        expect(logs).toContain('Hello Bidi')
    })

    // clean up listener afterwards
    after(() => {
        browser.off('log.entryAdded', logEvents)
    })
})
```

</TabItem>

<TabItem value='classic'>

اگر هنوز از WebDriver Classic استفاده می‌کنید یا استفاده از Bidi را از طریق قابلیت `'wdio:enforceWebDriverClassic': true` غیرفعال کرده‌اید، می‌توانید از دستور JSONWire به نام `getLogs` برای دریافت آخرین لاگ‌ها استفاده کنید. از آنجایی که WebdriverIO این دستورات منسوخ شده را حذف کرده است، باید از [JSONWP Service](https://github.com/webdriverio-community/wdio-jsonwp-service) برای اضافه کردن مجدد این دستور به نمونه مرورگر خود استفاده کنید.

بعد از اضافه کردن یا راه‌اندازی سرویس، می‌توانید لاگ‌ها را از این طریق دریافت کنید:

```ts
const logs = await browser.getLogs('browser')
const logMessage = logs.find((log) => log.message.includes('Hello Bidi'))
expect(logMessage).toBeTruthy()
```

توجه: دستور `getLogs` فقط می‌تواند جدیدترین لاگ‌ها را از مرورگر دریافت کند. ممکن است پیام‌های لاگ را در نهایت پاک کند اگر خیلی قدیمی شوند.
</TabItem>

</Tabs>

لطفاً توجه داشته باشید که می‌توانید از این روش برای بازیابی پیام‌های خطا و بررسی اینکه آیا برنامه شما با خطایی مواجه شده است، استفاده کنید.