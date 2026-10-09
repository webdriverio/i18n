---
id: ai-agents
title: WebdriverIO برای عامل‌های کدنویسی
description: Cursor، Claude Code، Copilot یا هر عامل کدنویسی دیگری را طوری راه‌اندازی کنید که با استفاده از مستندات قابل‌خواندن برای ماشین، سرور MCP وب‌درایورآی‌او و ردهای DevTools، تست‌های WebdriverIO را بنویسد، اجرا کند و اشکال‌زدایی کند.
---

امروزه بیشتر تست‌های WebdriverIO با همراهی یک عامل کدنویسی (coding agent) نوشته می‌شوند. این صفحه نشان می‌دهد چگونه سه چیزی را که یک عامل برای انجام درست این کار نیاز دارد در اختیارش قرار دهید: **مستندات به‌روز** (تا به جای حدس زدن، کد v10 بنویسد)، **راهی برای کنترل برنامهٔ تحت تست** (تا بتواند رابط کاربری را کاوش کند و انتخابگرها را بررسی کند) و **اجرای تست‌های قابل اشکال‌زدایی** (تا بتواند تست‌های ناموفق را خودش اصلاح کند).

## 1. مستندات را در اختیار عامل خود قرار دهید

هر صفحه از این سایت به صورت Markdown تمیز، بدون ناوبری، اسکریپت یا استایل در دسترس است:

| منبع | URL | کاربرد |
| --- | --- | --- |
| فهرست مستندات | [`https://webdriver.io/llms.txt`](https://webdriver.io/llms.txt) | نقشه‌ای گزینش‌شده از همهٔ صفحات همراه با خلاصه‌های یک‌خطی. از اینجا شروع کنید. |
| مستندات کامل | [`https://webdriver.io/llms-full.txt`](https://webdriver.io/llms-full.txt) | کل مستندات در یک فایل، برای عامل‌هایی با پنجرهٔ زمینه (context window) بزرگ. |
| هر صفحهٔ منفرد | `.md` را به انتهای URL اضافه کنید، مثلاً [`/docs/api/browser/url.md`](https://webdriver.io/docs/api/browser/url.md) | بارگذاری دقیقاً همان صفحه‌ای که عامل نیاز دارد. |
| مذاکرهٔ محتوا (Content negotiation) | هر URL از نوع `/docs/*` را با `Accept: text/markdown` درخواست کنید | عامل‌ها و ابزارهایی که URLها را بدون تغییر دریافت می‌کنند. |

هر صفحهٔ مستندات همچنین یک منوی **Copy page** دارد که گزینه‌هایی برای کپی کردن صفحه به صورت Markdown یا باز کردن مستقیم آن در ChatGPT، Claude یا Cursor ارائه می‌دهد.

### سرور MCP مستندات

مستندات همچنین به صورت یک سرور MCP راه‌دور در `https://webdriver.io/mcp` در دسترس است. این سرور سه ابزار در اختیار عامل قرار می‌دهد: `search_docs` برای یافتن صفحهٔ مناسب، `get_page` برای خواندن آن به صورت Markdown و `list_sections` برای بارگذاری یکجای یک بخش کامل. آن را در کنار سرور MCP وب‌درایورآی‌او که در ادامه توضیح داده شده اضافه کنید:

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

## اجازه دهید عامل شما از `wdio session` استفاده کند

[`wdio session`](/docs/session) یک نشست WebdriverIO را بین دستورات شل زنده نگه می‌دارد. یک عامل می‌تواند یک مرورگر، گوشی یا برنامهٔ دسکتاپ را باز کند، از آنچه روی صفحه است اسنپ‌شات بگیرد، روی refها عمل کند و مراحلی را که جواب داده‌اند به صورت یک تست خروجی بگیرد. این روش پیش‌فرض برای کنترل یک برنامه توسط عامل کدنویسی است. [سرور MCP](/docs/mcp) در بخش بعدی جایگزینی است برای زمانی که عامل باید به جای شل، ابزارها را فراخوانی کند.

مهارت (skill) را در پروژه نصب کنید:

```sh
npx wdio session skill --install .
```

این کار فایل `.agents/skills/wdio-session/SKILL.md` را می‌نویسد. `npm init wdio` نیز هنگامی که پشتیبانی از عامل کدنویسی را بپذیرید همین فایل را می‌نویسد و قوانین پروژهٔ زیر را اضافه می‌کند.

یک عامل می‌تواند خودش پروژه را ایجاد کند. ویزارد برای هر سؤال یک فلگ می‌پذیرد و `--yes` بقیه را با مقادیر پیش‌فرض پر می‌کند، بنابراین هرگز منتظر ورودی نمی‌ماند:

```sh
npm init wdio@latest . -- --yes --typescript --framework mocha --browsers chrome --reporters spec
```

`npm init wdio@latest -- --help` همهٔ فلگ‌ها و مقادیر آن‌ها را فهرست می‌کند. [پاسخ دادن به ویزارد با فلگ‌ها](/docs/gettingstarted#answer-the-wizard-with-flags) را ببینید. بخش [WebdriverIO Session](/docs/session) اهداف (targets)، اسنپ‌شات‌ها، `exec`، خروجی گرفتن و اشکال‌زدایی را پوشش می‌دهد. مرجع دستورات: [دستورات wdio session](/docs/session-commands).

### مستندات را به عامل خود اضافه کنید

برای اینکه مستندات در هر گفتگو در دسترس باشد، فهرست را به عامل خود اضافه کنید:

- **Cursor**: `https://webdriver.io/llms.txt` را به عنوان یک مستند سفارشی در تنظیمات Cursor (_Indexing & Docs_) اضافه کنید، سپس در گفتگو با `@` و نامی که به آن داده‌اید به آن ارجاع دهید.
- **Claude Code / Codex / سایر عامل‌های CLI**: لینک را به فایل `AGENTS.md` یا `CLAUDE.md` پروژهٔ خود اضافه کنید (به [قوانین پروژه](#3-add-project-rules) در ادامه مراجعه کنید). عامل‌ها صفحات مورد نیاز خود را در صورت لزوم دریافت می‌کنند.

## 2. اجازه دهید عامل شما مرورگر یا برنامه را کنترل کند

[سرور MCP وب‌درایورآی‌او](/docs/mcp) (`@wdio/mcp`) به یک عامل امکان می‌دهد مرورگرها (Chrome، Firefox، Edge، Safari)، برنامه‌های موبایل بومی و هیبریدی (از طریق Appium) و دستگاه‌های ابری را باز کند، درخت دسترس‌پذیری (accessibility tree) را بررسی کند، کلیک کند، تایپ کند و اسکرین‌شات بگیرد. عامل‌ها از آن برای کاوش یک صفحه پیش از نوشتن تست، یافتن انتخابگرهای مستحکم و بازتولید گام‌به‌گام یک خطا استفاده می‌کنند.

آن را به پیکربندی کلاینت MCP خود اضافه کنید (برای مثال `.mcp.json` یا `.cursor/mcp.json` در پروژهٔ شما):

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

## 3. قوانین پروژه را اضافه کنید

عامل‌ها زمانی که قراردادهای یک پروژه مکتوب شده باشند، با اطمینان بسیار بیشتری از آن‌ها پیروی می‌کنند. بخشی مانند نمونهٔ زیر را به `AGENTS.md` (یا `CLAUDE.md`، `.cursor/rules`) پروژهٔ تست خود اضافه کنید و مسیرها و دستورات را تنظیم کنید:

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

قوانین بالا بازتاب توصیه‌های موجود در [بهترین شیوه‌ها](/docs/bestpractices)، [انتخابگرها](/docs/selectors) و [انتظار خودکار](/docs/autowait) هستند.

## 4. اجازه دهید عامل تست‌های ناموفق را اشکال‌زدایی کند

سرویس [WebdriverIO DevTools](/docs/devtools) می‌تواند از هر اجرا یک **رد (trace)** ضبط کند: یک فایل قابل‌حمل شامل رونوشت گام‌به‌گام به صورت Markdown، اسکرین‌شات‌ها، اسنپ‌شات‌های درخت دسترس‌پذیری و لاگ‌های شبکه برای هر عمل. این کار همان اطلاعاتی را که یک انسان با تماشای تست به دست می‌آورد، بدون نیاز به پنجرهٔ مرورگر در اختیار عامل قرار می‌دهد.

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
            // یک رد برای هر تست، سپردن یک خطای منفرد به عامل را آسان می‌کند
            traceGranularity: 'test',
            // فایل‌های ساده به جای zip، تا عامل‌ها بتوانند مستقیماً آن‌ها را بخوانند
            traceFormat: 'ndjson-directory'
        }]
    ]
}
```

پس از اجرا، ردها در `test-results/` نوشته می‌شوند. عامل خود را به پوشهٔ تست ناموفق هدایت کنید و از آن بخواهید ابتدا `transcript.md` را بخواند. برای همهٔ گزینه‌ها، از جمله دانه‌بندی (granularity) و نگهداری (retention)، به [حالت Trace](/docs/devtools/wdio/trace-mode) مراجعه کنید.

## گردش کار پیشنهادی

1. از عامل بخواهید قابلیت تحت تست را با سرور MCP کاوش کند و انتخابگرهایی پیشنهاد دهد.
2. اجازه دهید spec و page object را طبق قوانین پروژهٔ شما بنویسد و در صورت نیاز صفحات مستندات WebdriverIO را دریافت کند.
3. از آن بخواهید spec منفرد را با `--spec` اجرا کند و تا زمانی که موفق شود تکرار کند.
4. اگر تستی در CI ناموفق شد، رد آن تست را به عامل بدهید و اجازه دهید تست را اصلاح کند یا باگ را گزارش دهد.

## گام‌های بعدی

- [شروع به کار](/docs/gettingstarted) - ایجاد یک پروژه با `npm init wdio@latest`
- [WebdriverIO MCP](/docs/mcp) - همهٔ ابزارهایی که سرور MCP ارائه می‌دهد
- [DevTools](/docs/devtools) - حالت زنده و حالت trace
- [بهترین شیوه‌ها](/docs/bestpractices) - تست‌های خوب WebdriverIO چه شکلی هستند
- [از v9 به v10](/docs/v10-migration#migrate-with-a-coding-agent) - مهارت مهاجرت برای یک مجموعه تست موجود