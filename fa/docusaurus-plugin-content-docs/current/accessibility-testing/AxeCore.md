---
id: axe-core
title: Axe Core
description: "با استفاده از آداپتور متن‌باز Axe از Deque، بررسی‌های خودکار دسترس‌پذیری را در تست‌های خود، در حالت مستقل یا testrunner، اجرا کنید."
---

شما می‌توانید تست‌های دسترس‌پذیری را با استفاده از ابزارهای متن‌باز دسترس‌پذیری [از Deque به نام Axe](https://www.deque.com/axe/) در مجموعه تست WebdriverIO خود بگنجانید. راه‌اندازی بسیار آسان است، تنها کاری که باید انجام دهید نصب آداپتور Axe برای WebdriverIO از طریق دستور زیر است:

```bash npm2yarn
npm install -g @axe-core/webdriverio
```

آداپتور Axe را می‌توان در حالت [مستقل یا testrunner](/docs/setuptypes) استفاده کرد، کافی است آن را import کرده و با [شیء browser](/docs/api/browser) مقداردهی اولیه کنید، برای مثال:

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

می‌توانید مستندات بیشتری درباره آداپتور Axe برای WebdriverIO را [در GitHub](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/webdriverio#usage) پیدا کنید.