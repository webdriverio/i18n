---
id: ai-steps
title: گام‌های هوش مصنوعی در تست‌ها
description: گام‌های تست را به‌صورت هدف با browser.act() بنویسید و داده‌های تایپ‌شده را با browser.extract() با استفاده از @wdio/ai-service بخوانید، سپس آن‌ها را بدون مدل از یک کش کامیت‌شده دوباره اجرا کنید و هر ترمیم را بازبینی کنید.
---

`@wdio/ai-service` به یک تست اجازه می‌دهد به‌جای اسکریپت‌نویسی یک گام، آن را توصیف کند: `browser.act('Add a blue shirt to the cart')` از مدل شما می‌خواهد آن را انجام دهد، دستورات WebdriverIO اجراشده را ضبط می‌کند و در هر اجرای بعدی آن‌ها را از یک فایل کش دوباره اجرا می‌کند. مدل فقط زمانی دوباره فراخوانی می‌شود که صفحه تغییر کرده باشد و یک گام ضبط‌شده دیگر بدون آن قابل ترمیم نباشد. از آن برای جریان‌هایی استفاده کنید که markup آن‌ها اغلب تغییر می‌کند، یا برای اینکه پیش از دانستن selectorها یک تست را به اجرا برسانید. برای هر چیزی که از قبل می‌دانید چگونه اسکریپت کنید، از دستورات ساده WebdriverIO استفاده کنید.

## راه‌اندازی سرویس

سرویس و بسته LangChain مربوط به ارائه‌دهنده مدل خود را نصب کنید:

```sh
npm install --save-dev @wdio/ai-service @langchain/anthropic zod
```

سرویس را به پیکربندی خود اضافه کنید و کلید API ارائه‌دهنده (در اینجا `ANTHROPIC_API_KEY`) را در محیط تنظیم کنید:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    specs: ['./test/specs/**/*.e2e.ts'],
    capabilities: [{
        browserName: 'chrome',
        webSocketUrl: true
    }],
    framework: 'mocha',
    services: [['ai', {
        model: 'anthropic:claude-sonnet-5-5'
    }]]
}
```

`webSocketUrl: true` یک نشست WebDriver BiDi باز می‌کند. این سرویس روی WebDriver Classic نیز کار می‌کند، اما BiDi به آن اجازه می‌دهد بررسی کند هر گام چه کاری انجام داده و پاسخ‌های API صفحه را بخواند. برای همه گزینه‌ها و ارائه‌دهندگان، از جمله مدل‌های محلی از طریق Ollama، صفحه [AI Service](/docs/ai-service) را ببینید.

## نوشتن یک تست

```ts title="test/specs/cart.e2e.ts"
import { browser, expect } from '@wdio/globals'
import { z } from 'zod'

describe('cart', () => {
    it('adds a shirt', async () => {
        await browser.url('https://shop.example/')
        await browser.act('Add a blue shirt in size M to the shopping cart')

        const cart = await browser.extract(
            'the line items in the cart',
            z.array(z.object({ name: z.string(), size: z.string(), qty: z.number() }))
        )
        expect(cart).toContainEqual({ name: 'Blue Shirt', size: 'M', qty: 1 })
    })
})
```

- `act` گام را انجام می‌دهد و هرگز assertion انجام نمی‌دهد. نتیجه را با `expect` بررسی کنید.
- `extract` فقط صفحه را می‌خواند و پاسخ را در برابر schema اعتبارسنجی می‌کند. این هرگز کش نمی‌شود.
- اطلاعات محرمانه در placeholderها قرار می‌گیرند. مدل `{{password}}` را می‌بیند، هرگز مقدار را نمی‌بیند:

```ts
await browser.act('Log in as {{email}} with password {{password}}', {
    values: { email: process.env.SHOP_USER!, password: process.env.SHOP_PASS! }
})
```

- `act` را روی یک المان فراخوانی کنید تا مدل درون آن بماند، یا روی یک frame یا tab نگه‌داشته‌شده:

```ts
await $('form#billing').act('Fill in a valid German address')
```

## یک بار ضبط کنید، بدون مدل دوباره اجرا کنید

اولین اجرا گام‌های هر فراخوانی `act` را در `__act__/<spec file>.json` در کنار فایل spec ضبط می‌کند:

```sh
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

پوشه `__act__` را کامیت کنید. اجراهای بعدی دستورات ضبط‌شده را دوباره اجرا می‌کنند، بنابراین یک اجرای موفق هیچ فراخوانی مدلی انجام نمی‌دهد و هیچ توکنی هزینه نمی‌کند.

| `cache` | کاربرد |
| --- | --- |
| `auto` (پیش‌فرض) | `write` به‌صورت محلی، `heal` زمانی که `process.env.CI` تنظیم شده باشد |
| `write` | ضبط و به‌روزرسانی فایل‌های کش |
| `heal` | CI: ترمیم گام‌های ناموفق، نوشتن ورودی‌های ترمیم‌شده در `<outputDir>/act-cache/` و دست‌نزدن به فایل‌های کش |
| `locked` | اجراهای CI که نباید مدل را فراخوانی کنند: فقط اجرای مجدد، و شکست زمانی که یک گام بدون مدل قابل ترمیم نباشد |
| `off` | همیشه از مدل بپرس |

برای ضبط دوباره همه فراخوانی‌های `act`، دستور `npx wdio run wdio.conf.ts -s` را اجرا کنید.

## بازبینی ترمیم‌ها

وقتی یک گام ضبط‌شده شکست می‌خورد، سرویس ابتدا selectorهای دیگری را که برای المان ضبط کرده امتحان می‌کند و سپس role و نام دسترس‌پذیر (accessible name) آن را. فقط اگر این کار شکست بخورد، مدل از گام ناموفق ادامه می‌دهد. هر گام اجراشده یا ترمیم‌شده باید همان کاری را انجام دهد که هنگام ضبط انجام داده بود: همان درخواست‌ها را ارسال کند، به همان صفحه برود و همان بخش‌های صفحه را تغییر دهد. ترمیمی که روی یک دکمه مشابه اما اشتباه انجام شود، رد می‌شود.

اجرا با یک خلاصه به پایان می‌رسد:

```
@wdio/ai-service: 42 act calls · 39 from cache · 2 healed without the model · 1 healed by the model · 0 recorded by the model · 3.1k tokens
Healed:
  cart.e2e.ts › cart adds a shirt "Add a blue shirt in size M to the shopping cart": step 2 [data-testid="add"] → role/button[name="Add to cart"] (without the model)
    evidence: ./logs/ai/heals/cart.e2e.ts-cart-adds-a-shirt-1c71c48d
```

پوشه شواهد شامل یک اسکرین‌شات از صفحه در لحظه شکست گام، یک اسکرین‌شات پس از هر گام ترمیم، و یک ویدیو از ترمیم در مرورگرهایی است که screencast مربوط به WebDriver BiDi را ضبط می‌کنند (در حال حاضر Firefox). ترمیم را بازبینی کنید، سپس فایل کش به‌روزشده را کامیت کنید.

## تبدیل گام‌ها به کد ساده

وقتی یک جریان پایدار شد، فراخوانی‌های `act` آن را با دستورات ضبط‌شده جایگزین کنید:

```sh
npx wdio-ai eject test/specs/cart.e2e.ts
```

```ts
// act: Add a blue shirt in size M to the shopping cart
await $('role/link[name="Blue Shirt"]').click()
await $('role/combobox[name="Size"]').selectByVisibleText('M')
await $('role/button[name="Add to cart"]').click()
```

## عیب‌یابی

| خطا | راه‌حل |
| --- | --- |
| `act("…") failed: no model is configured. Set the `model` option of the service or the WDIO_AI_MODEL environment variable.` | `model` را در گزینه‌های سرویس تنظیم کنید یا `WDIO_AI_MODEL=anthropic:claude-sonnet-5-5` را export کنید. |
| `[@wdio/ai-service] The "anthropic" provider needs "@langchain/anthropic". Install it with `npm install --save-dev @langchain/anthropic`.` | بسته ارائه‌دهنده را نصب کنید. |
| `[@wdio/ai-service] No API key for "anthropic". Set ANTHROPIC_API_KEY or pass `apiKey` in the model config.` | کلید را در shell یا secret مربوط به CI که تست‌ها را اجرا می‌کند export کنید. |
| `act("…") failed: no cached steps for "…" and the cache is locked` | فراخوانی را به‌صورت محلی با `cache: 'write'` ضبط کنید و فایل `__act__` را کامیت کنید. |
| `act("…") failed: cached step 1 (…) ran, but the step no longer causes POST /api/cart → 2xx. The app may have changed behavior, not just markup.` | المان هنوز وجود دارد اما کار دیگری انجام می‌دهد: این یک regression است، نه تغییر markup. برنامه را بررسی کنید. |
| `act("…") failed: …` و پس از آن `Evidence: <folder>` | مدل نتوانست دستورالعمل را کامل کند. این پوشه شامل همه snapshotهایی که گرفته، رویدادهای console و network و گام‌هایی است که اجرا شده‌اند. |

## گام‌های بعدی

- [AI Service](/docs/ai-service): همه گزینه‌ها، قالب کش، اثرات گام‌ها و workspace
- [Selectors](/docs/selectors#role-selector): selector `role/` که گام‌های ضبط‌شده از آن استفاده می‌کنند
- [WebdriverIO for Coding Agents](/docs/ai-agents): نوشتن تست‌ها همراه با یک coding agent