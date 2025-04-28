---
id: clock
title: شیء ساعت (Clock)
---

شما می‌توانید ساعت سیستم مرورگر را با استفاده از دستور [`emulate`](/docs/emulation) تغییر دهید. این دستور توابع جهانی مربوط به زمان را بازنویسی می‌کند و به شما امکان می‌دهد آنها را به صورت همزمان از طریق `clock.tick()` یا شیء ساعت بازگردانده شده کنترل کنید. این شامل کنترل موارد زیر است:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

ساعت از عصر یونیکس (timestamp برابر با 0) شروع می‌شود. این بدان معناست که وقتی در برنامه خود یک Date جدید ایجاد می‌کنید، زمان آن اول ژانویه ۱۹۷۰ خواهد بود، مگر اینکه گزینه‌های دیگری را به دستور `emulate` ارسال کنید.

## مثال

هنگامی که `browser.emulate('clock', { ... })` را فراخوانی می‌کنید، بلافاصله توابع جهانی را برای صفحه فعلی و همچنین تمام صفحات بعدی بازنویسی می‌کند، برای مثال:

```ts
const clock = await browser.emulate('clock', { now: new Date(1989, 7, 4) })

console.log(await browser.execute(() => (new Date()).toString()))
// returns "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://webdriverio')
console.log(await browser.execute(() => (new Date()).toString()))
// returns "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await clock.restore()

console.log(await browser.execute(() => (new Date()).toString()))
// returns "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"

await browser.url('http://guinea-pig.webdriver.io/pointer.html')
console.log(await browser.execute(() => (new Date()).toString()))
// returns "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"
```

شما می‌توانید زمان سیستم را با فراخوانی [`setSystemTime`](/docs/api/clock/setSystemTime) یا [`tick`](/docs/api/clock/tick) تغییر دهید.