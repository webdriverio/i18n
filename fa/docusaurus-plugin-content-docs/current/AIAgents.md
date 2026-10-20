---
id: ai-agents
title: WebdriverIO برای ایجنت‌های کدنویسی
description: Cursor، Claude Code، Copilot یا هر ایجنت کدنویسی دیگری را طوری راه‌اندازی کنید که با استفاده از مستندات قابل‌خواندن برای ماشین، سرور MCP وب‌درایورآی‌او (WebdriverIO) و تریس‌های DevTools، تست‌های WebdriverIO را بنویسد، اجرا کند و دیباگ کند.
---

امروزه بیشتر تست‌های WebdriverIO با کمک یک ایجنت کدنویسی نوشته می‌شوند. این صفحه نشان می‌دهد چطور سه چیزی را که یک ایجنت برای انجام درست این کار نیاز دارد در اختیارش بگذارید: **مستندات به‌روز** (تا به‌جای حدس زدن، کد v10 بنویسد)، **راهی برای کنترل برنامه‌ی تحت تست** (تا بتواند رابط کاربری را بررسی کند و سلکتورها را تأیید کند) و **اجرای تست‌های قابل دیباگ** (تا بتواند تست‌های ناموفق را خودش اصلاح کند).

## ۱. مستندات را در اختیار ایجنت خود قرار دهید

هر صفحه از این سایت به‌صورت Markdown تمیز، بدون ناوبری، اسکریپت یا استایل در دسترس است:

| منبع | URL | کاربرد |
| --- | --- | --- |
| فهرست مستندات | [`https://webdriver.io/llms.txt`](https://webdriver.io/llms.txt) | نقشه‌ای گزینش‌شده از همه‌ی صفحات با خلاصه‌های یک‌خطی. از اینجا شروع کنید. |
| مستندات کامل | [`https://webdriver.io/llms-full.txt`](https://webdriver.io/llms-full.txt) | کل مستندات در یک فایل، برای ایجنت‌هایی با پنجره‌ی context بزرگ. |
| هر صفحه‌ی منفرد | `.md` را به انتهای URL اضافه کنید، مثلاً [`/docs/api/browser/url.md`](https://webdriver.io/docs/api/browser/url.md) | بارگذاری دقیقاً همان صفحه‌ای که ایجنت نیاز دارد. |
| Content negotiation | هر URL از نوع `/docs/*` را با `Accept: text/markdown` درخواست کنید | ایجنت‌ها و ابزارهایی که URLها را همان‌طور که هستند دریافت می‌کنند. |

هر صفحه‌ی مستندات همچنین یک منوی **Copy page** دارد که گزینه‌هایی برای کپی صفحه به‌صورت Markdown یا باز کردن مستقیم آن در ChatGPT، Claude یا Cursor ارائه می‌دهد.

### سرور MCP مستندات

مستندات همچنین به‌صورت یک سرور MCP راه دور در آدرس `https://webdriver.io/mcp` در دسترس است. این سرور سه ابزار در اختیار ایجنت قرار می‌دهد: `search_docs` برای پیدا کردن صفحه‌ی مناسب، `get_page` برای خواندن آن به‌صورت Markdown و `list_sections` برای بارگذاری یک بخش کامل به‌یک‌باره. آن را در کنار سرور MCP وب‌درایورآی‌او که در ادامه توضیح داده شده اضافه کنید:

```json title=".mcp.json"
{
    "mcpServers": {
        "webdriverio-docs": {
            "url": "https://webdriver.io/mcp"
        }
    }
}
```

برای Claude Code، دستور `claude mcp add --transport http webdriverio-docs https://webdriver.io/mcp` را اجرا کنید.

## اجازه دهید ایجنت شما از `wdio session` استفاده کند

[`wdio session`](/docs/session) یک نشست (session) وب‌درایورآی‌او را بین دستورات شل زنده نگه می‌دارد. یک ایجنت می‌تواند یک مرورگر، گوشی یا برنامه‌ی دسکتاپ را باز کند، از آنچه روی صفحه است snapshot بگیرد، روی refها عمل کند و مراحلی را که جواب داده‌اند به‌صورت یک تست خروجی بگیرد. این روش پیش‌فرض برای کنترل یک برنامه توسط ایجنت کدنویسی است. [سرور MCP](/docs/mcp) در بخش بعد، جایگزینی است برای زمانی که ایجنت باید به‌جای شل، ابزارها را فراخوانی کند.

skill را در پروژه نصب کنید:

```sh
npx wdio session skill --install .
```

این دستور فایل `.agents/skills/wdio-session/SKILL.md` را ایجاد می‌کند. `npm init wdio` نیز وقتی پشتیبانی از ایجنت کدنویسی را بپذیرید همین فایل را می‌نویسد و قوانین پروژه‌ی زیر را اضافه می‌کند.

یک ایجنت می‌تواند خودش پروژه را ایجاد کند. ویزارد برای هر سؤال یک فلگ می‌پذیرد و `--yes` بقیه را با مقادیر پیش‌فرض پر می‌کند، بنابراین هرگز منتظر ورودی نمی‌ماند:

```sh
npm init wdio@latest . -- --yes --typescript --framework mocha --browsers chrome --reporters spec
```

دستور `npm init wdio@latest -- --help` همه‌ی فلگ‌ها و مقادیرشان را فهرست می‌کند. [پاسخ دادن به ویزارد با فلگ‌ها](/docs/gettingstarted#answer-the-wizard-with-flags) را ببینید. بخش [WebdriverIO Session](/docs/session) به اهداف (targets)، snapshotها، `exec`، خروجی گرفتن و دیباگ کردن می‌پردازد. مرجع دستورات: [دستورات wdio session](/docs/session-commands).

### مستندات را به ایجنت خود اضافه کنید

برای اینکه مستندات در هر گفتگو در دسترس باشد، فهرست را به ایجنت خود اضافه کنید:

- **Cursor**: آدرس `https://webdriver.io/llms.txt` را به‌عنوان یک مستند سفارشی در تنظیمات Cursor (_Indexing & Docs_) اضافه کنید، سپس در گفتگو با `@` و نامی که به آن داده‌اید به آن ارجاع دهید.
- **Claude Code / Codex / سایر ایجنت‌های CLI**: لینک را به فایل `AGENTS.md` یا `CLAUDE.md` پروژه‌ی خود اضافه کنید (به [قوانین پروژه](#3-add-project-rules) در ادامه مراجعه کنید). ایجنت‌ها صفحاتی را که نیاز دارند در صورت لزوم دریافت می‌کنند.

## ۲. اجازه دهید ایجنت شما مرورگر یا برنامه را کنترل کند

[سرور MCP وب‌درایورآی‌او](/docs/mcp) (`@wdio/mcp`) به یک ایجنت اجازه می‌دهد مرورگرها (Chrome، Firefox، Edge، Safari)، برنامه‌های موبایل native و hybrid (از طریق Appium) و دستگاه‌های ابری را باز کند، درخت دسترسی‌پذیری (accessibility tree) را بررسی کند، کلیک کند، تایپ کند و اسکرین‌شات بگیرد. ایجنت‌ها از آن برای بررسی یک صفحه پیش از نوشتن تست، یافتن سلکتورهای مقاوم و بازتولید گام‌به‌گام یک خطا استفاده می‌کنند.

آن را به پیکربندی کلاینت MCP خود اضافه کنید (برای مثال `.mcp.json` یا `.cursor/mcp.json` در پروژه‌ی خود):

```json title=".mcp.json"
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"]
        }
    }
}
```

برای Claude Code، آن را از خط فرمان ثبت کنید:

```sh
claude mcp add --transport stdio wdio-mcp -- npx -y @wdio/mcp
```

برای گزینه‌های نشست به [پیکربندی MCP](/docs/mcp/configuration) و برای اجرا روی BrowserStack، Sauce Labs، TestMu AI یا TestingBot به [ارائه‌دهندگان ابری](/docs/mcp/cloud-providers) مراجعه کنید.

## ۳. قوانین پروژه را اضافه کنید

ایجنت‌ها وقتی قراردادهای یک پروژه مکتوب شده باشند، با اطمینان بسیار بیشتری از آن‌ها پیروی می‌کنند. بخشی مانند نمونه‌ی زیر را به فایل `AGENTS.md` (یا `CLAUDE.md`، `.cursor/rules`) پروژه‌ی تست خود اضافه کنید و مسیرها و دستورات را تنظیم کنید:

````md title="AGENTS.md"
## End-to-end tests (WebdriverIO v10)

- Docs: https://webdriver.io/llms.txt - fetch the relevant page as Markdown (append `.md`) before using an API you are not sure about. Do not use APIs from WebdriverIO v8 or older.
- Config: `wdio.conf.ts`. Specs: `test/specs/**/*.e2e.ts`. Page objects: `test/pageobjects/`.
- Run all tests: `npx wdio run wdio.conf.ts`
- Run a single spec: `npx wdio run wdio.conf.ts --spec test/specs/login.e2e.ts`
- Tests are async: always `await` commands, e.g. `await $('button').click()`. Never use the removed sync mode.
- Prefer user-facing selectors: accessibility name or text (`$('aria/Submit')`, `$('button=Submit')`), then `data-testid`. Avoid XPath and generated CSS classes.
- Rely on auto-waiting and `expect-webdriverio` matchers (`await expect($('h1')).toHaveText('Welcome')`) instead of `browser.pause()`.
- To explore the app or verify a selector, use the `wdio-mcp` MCP server.
- To drive the app from the shell, follow `.agents/skills/wdio-session/SKILL.md` (`npx wdio session`).
- When a test fails, read the DevTools trace in `test-results/` (see `transcript.md`) before changing code.
````

قوانین بالا منعکس‌کننده‌ی توصیه‌های موجود در [بهترین شیوه‌ها](/docs/bestpractices)، [سلکتورها](/docs/selectors) و [انتظار خودکار](/docs/autowait) هستند.

## ۴. اجازه دهید ایجنت تست‌های ناموفق را دیباگ کند

سرویس [WebdriverIO DevTools](/docs/devtools) می‌تواند از هر اجرا یک **trace** ضبط کند: یک فایل قابل‌حمل شامل رونوشت گام‌به‌گام به‌صورت Markdown، اسکرین‌شات‌ها، snapshotهای درخت دسترسی‌پذیری و لاگ‌های شبکه برای هر اقدام. این کار همان اطلاعاتی را که یک انسان با تماشای تست به دست می‌آورد، بدون نیاز به پنجره‌ی مرورگر در اختیار ایجنت قرار می‌دهد.

سرویس را نصب کنید و حالت trace را فعال کنید:

```sh
npm install @wdio/devtools-service --save-dev
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    services: [
        ['devtools', {
            mode: 'trace',
            // یک trace برای هر تست، سپردن یک خطای منفرد به ایجنت را آسان می‌کند
            traceGranularity: 'test',
            // فایل‌های ساده به‌جای zip، تا ایجنت‌ها بتوانند مستقیماً آن‌ها را بخوانند
            traceFormat: 'ndjson-directory'
        }]
    ]
}
```

پس از هر اجرا، traceها در `test-results/` نوشته می‌شوند. ایجنت خود را به پوشه‌ی تست ناموفق هدایت کنید و از آن بخواهید ابتدا `transcript.md` را بخواند. برای همه‌ی گزینه‌ها، از جمله granularity و نگهداری، به [حالت Trace](/docs/devtools/wdio/trace-mode) مراجعه کنید.

## گردش کار پیشنهادی

1. از ایجنت بخواهید قابلیت تحت تست را با سرور MCP بررسی کند و سلکتورهایی پیشنهاد دهد.
2. اجازه دهید spec و page object را مطابق قوانین پروژه‌ی شما بنویسد و در صورت نیاز صفحات مستندات WebdriverIO را دریافت کند.
3. از آن بخواهید spec منفرد را با `--spec` اجرا کند و تا زمانی که موفق شود آن را تکرار کند.
4. اگر تستی در CI ناموفق شد، trace آن تست را به ایجنت بدهید و اجازه دهید تست را اصلاح کند یا باگ را گزارش دهد.

## گام‌های بعدی

- [شروع به کار](/docs/gettingstarted) - ایجاد یک پروژه با `npm init wdio@latest`
- [WebdriverIO MCP](/docs/mcp) - همه‌ی ابزارهایی که سرور MCP ارائه می‌دهد
- [DevTools](/docs/devtools) - حالت live و حالت trace
- [بهترین شیوه‌ها](/docs/bestpractices) - تست‌های خوب WebdriverIO چه شکلی دارند
- [از v9 به v10](/docs/v10-migration#migrate-with-a-coding-agent) - skill مهاجرت برای یک مجموعه‌ی تست موجود