---
id: debug
title: اشکال‌زدایی یک تست با یک نشست
description: یک اجرای ناموفق WebdriverIO را متوقف کنید و آن را با wdio session بررسی کنید، سپس آن را ادامه دهید یا ببندید.
---

`wdio run --debug=agent` کارگر (worker) را روی `await browser.debug()` و پس از یک تست ناموفق متوقف می‌کند و timeout فریم‌ورک را به ۲۴ ساعت افزایش می‌دهد. این توقف هم تست‌های Mocha و هم گام‌های Cucumber را پوشش می‌دهد. اجرا نام نشست را چاپ می‌کند (`debug-0-0` برای اولین کارگر):

```sh
npx wdio run wdio.conf.ts --debug=agent
npx wdio session -s debug-0-0 snapshot
npx wdio session -s debug-0-0 exec -e "await browser.getTitle()"
npx wdio session -s debug-0-0 resume
```

اجرای `close` روی آن نشست، تست متوقف‌شده را با پیام `Session closed from wdio session` ناموفق می‌کند. وقتی تست باید ادامه یابد، از resume استفاده کنید. وقتی می‌خواهید اجرا در نقطهٔ توقف ناموفق شود، از close استفاده کنید.

`browser.debug()` بدون `--debug=agent` همچنان [REPL](/docs/repl) را داخل تست باز می‌کند. `--debug=agent` مسیری است که به یک فرایند دیگر، از جمله یک عامل کدنویسی (coding agent)، اجازه می‌دهد کارگر متوقف‌شده را با `wdio session` کنترل کند.

## متصل کردن یک REPL

`wdio repl --session <name>` به نشستی که از قبل باز است متصل می‌شود و هنگام خروج، آن را در حال اجرا باقی می‌گذارد:

```sh
npx wdio session open chrome https://webdriver.io
npx wdio repl --session default
```

هر خط REPL به‌صورت `wdio session exec` اجرا می‌شود. `.exit` پیام `Detached from "default" (still running)` را چاپ می‌کند.

## Doctor

`npx wdio session doctor` پیش از باز کردن یک نشست، Node.js، مرورگر، Appium، SDKها و اعتبارنامه‌های ابری را بررسی می‌کند. `doctor <target>` فقط مواردی را بررسی می‌کند که آن target به آن‌ها نیاز دارد. وقتی یک بررسی ناموفق باشد، فرایند با کد 1 خارج می‌شود. نشستی که هنوز در حال راه‌اندازی است دست‌نخورده باقی می‌ماند. نشستی که فرایند آن دیگر وجود ندارد حذف می‌شود.

## عیب‌یابی

| پیام | چه باید کرد |
| --- | --- |
| `Session closed from wdio session` | شما نشست اشکال‌زدایی را بسته‌اید. وقتی تست باید ادامه یابد، از `resume` استفاده کنید. |
| نشست `debug-0-0` وجود ندارد | اجرا هنوز متوقف نشده است، یا از شناسهٔ کارگر دیگری استفاده کرده است. `wdio session list` نام‌ها را چاپ می‌کند. |
| توقف هرگز رخ نمی‌دهد | دستور باید `wdio run --debug=agent` باشد. یک تست موفق متوقف نمی‌شود مگر اینکه `browser.debug()` را فراخوانی کند. |

## گام‌های بعدی

- [اشکال‌زدایی](/docs/debugging) — `browser.debug()`، نقاط توقف (breakpoints) و تست‌های ناپایدار (flaky)
- [REPL](/docs/repl) — پوستهٔ تعاملی
- [wdio session](/docs/session) — باز کردن نشستی که به یک اجرای تست متصل نیست