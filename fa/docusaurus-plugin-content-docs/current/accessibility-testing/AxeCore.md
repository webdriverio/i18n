---
id: axe-core
title: هسته اکس
---

شما می‌توانید تست‌های دسترسی‌پذیری را با استفاده از ابزارهای دسترسی‌پذیری متن‌باز [از Deque با نام Axe](https://www.deque.com/axe/) در مجموعه تست WebdriverIO خود قرار دهید. تنظیم آن بسیار آسان است، تنها کاری که باید انجام دهید نصب آداپتور Axe برای WebdriverIO است:

```bash npm2yarn
npm install -g @axe-core/webdriverio
```

آداپتور Axe می‌تواند در هر دو حالت [standalone یا testrunner](/docs/setuptypes) با وارد کردن و راه‌اندازی آن با [شیء browser](/docs/api/browser) استفاده شود، به عنوان مثال:

```ts
import { browser } from '@wdio/globals'
import AxeBuilder from '@axe-core/webdriverio'

describe('Accessibility Test', () => {
    it('should get the accessibility results from a page', async () => {
        const builder = new AxeBuilder({ client: browser })

        await browser.url('https://testingbot.com')
        const result = await builder.analyze()
        console.log('Acessibility Results:', result)
    })
})
```

شما می‌توانید مستندات بیشتری در مورد آداپتور Axe برای WebdriverIO را [در GitHub](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/webdriverio#usage) پیدا کنید.