---
id: browser-logs
title: لاگ‌های مرورگر
description: "ثبت لاگ‌های کنسول مرورگر در طول تست با استفاده از رویدادهای لاگ WebDriver Bidi و بررسی (assert) پیام‌های جمع‌آوری‌شده."
---

هنگام اجرای تست‌ها، مرورگر ممکن است اطلاعات مهمی را لاگ کند که برای شما جالب باشد یا بخواهید آن‌ها را بررسی (assert) کنید.

<Tabs
defaultValue="bidi"
values={[
    {label: 'Bidi', value: 'bidi'},
    {label: 'Classic (Deprecated)', value: 'classic'
}]
}>

<TabItem value='bidi'>

هنگام استفاده از WebDriver Bidi، که روش پیش‌فرض WebdriverIO برای خودکارسازی مرورگر است، می‌توانید در رویدادهایی که از مرورگر می‌آیند مشترک شوید. برای رویدادهای لاگ باید به `log.entryAdded'` گوش دهید، برای مثال:

```ts
await browser.sessionSubscribe({ events: ['log.entryAdded'] })

/**
 * returns: {"type":"console","method":"log","realm":null,"args":[{"type":"string","value":"Hello Bidi"}],"level":"info","text":"Hello Bidi","timestamp":1657282076037}
 */
browser.on('log.entryAdded', (entryAdded) => console.log('received %s', entryAdded))
```

در یک تست می‌توانید به سادگی رویدادهای لاگ را به یک آرایه اضافه کنید و پس از انجام عمل مورد نظر، آن آرایه را بررسی کنید، برای مثال:

```ts
import type { local } from 'webdriver'

describe('should log when doing a certain action', () => {
    const logs: string[] = []

    function logEvents (event: local.LogEntry) {
        logs.push(event.text) // افزودن پیام لاگ به آرایه
    }

    before(async () => {
        await browser.sessionSubscribe({ events: ['log.entryAdded'] })
        browser.on('log.entryAdded', logEvents)
    })

    it('should trigger the console event', () => {
        // وادار کردن مرورگر به ارسال یک پیام به کنسول
        ...

        // بررسی اینکه آیا لاگ ثبت شده است
        expect(logs).toContain('Hello Bidi')
    })

    // پاک‌سازی شنونده (listener) پس از اتمام
    after(() => {
        browser.off('log.entryAdded', logEvents)
    })
})
```

</TabItem>

<TabItem value='classic'>

اگر Bidi با قابلیت `'wdio:enforceWebDriverClassic': true` غیرفعال شده باشد، نشست‌های Chromium همچنان می‌توانند بافر لاگ مرورگر را با `getLogs` بخوانند:

```ts
const logs = await browser.getLogs('browser')
const logMessage = logs.find((log) => log.message.includes('Hello Bidi'))
expect(logMessage).toBeTruthy()
```

توجه: دستور `getLogs` فقط می‌تواند جدیدترین لاگ‌ها را از مرورگر دریافت کند. ممکن است پیام‌های لاگ در صورت قدیمی شدن، در نهایت پاک شوند.
</TabItem>

</Tabs>

لطفاً توجه داشته باشید که می‌توانید از این روش برای دریافت پیام‌های خطا و بررسی اینکه آیا برنامه شما با خطایی مواجه شده است یا خیر، استفاده کنید.