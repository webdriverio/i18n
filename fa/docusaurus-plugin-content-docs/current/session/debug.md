---
id: debug
title: دیباگ یک تست با یک سشن
description: یک اجرای ناموفق WebdriverIO را متوقف کنید و آن را با wdio session بررسی کنید، سپس آن را ادامه دهید یا ببندید.
---

`wdio run --debug=agent` ورکر را در `await browser.debug()` و پس از یک تست ناموفق متوقف می‌کند و تایم‌اوت فریم‌ورک را به ۲۴ ساعت افزایش می‌دهد. این توقف هم تست‌های Mocha و هم استپ‌های Cucumber را پوشش می‌دهد. اجرا، نام سشن را چاپ می‌کند (`debug-0-0` برای اولین ورکر):

```sh
npx wdio run wdio.conf.ts --debug=agent
npx wdio session -s debug-0-0 snapshot
npx wdio session -s debug-0-0 exec -e "await browser.getTitle()"
npx wdio session -s debug-0-0 resume
```

اجرای `close` روی آن سشن، تست متوقف‌شده را با پیام `Session closed from wdio session` ناموفق می‌کند. وقتی تست باید ادامه پیدا کند، از resume استفاده کنید. وقتی می‌خواهید اجرا در نقطه توقف ناموفق شود، از close استفاده کنید.

`browser.debug()` بدون `--debug=agent` همچنان [REPL](/docs/repl) را داخل تست باز می‌کند. `--debug=agent` مسیری است که به یک پروسه دیگر، از جمله یک ایجنت کدنویسی، اجازه می‌دهد ورکر متوقف‌شده را با `wdio session` کنترل کند.

## متصل کردن یک REPL

`wdio repl --session <name>` به سشنی که از قبل باز است متصل می‌شود و هنگام خروج، آن را در حال اجرا باقی می‌گذارد:

```sh
npx wdio session open chrome https://webdriver.io
npx wdio repl --session default
```

هر خط REPL به‌صورت `wdio session exec` اجرا می‌شود. `.exit` پیام `Detached from "default" (still running)` را چاپ می‌کند.

## Doctor

`npx wdio session doctor` پیش از باز کردن یک سشن، Node.js، مرورگر، Appium، SDKها و اعتبارنامه‌های کلود را بررسی می‌کند. `doctor <target>` فقط مواردی را بررسی می‌کند که آن تارگت به آن‌ها نیاز دارد. وقتی یک بررسی ناموفق باشد، پروسه با کد 1 خارج می‌شود. سشنی که هنوز در حال راه‌اندازی است، دست‌نخورده باقی می‌ماند. سشنی که پروسه‌اش دیگر وجود ندارد، حذف می‌شود.

## عیب‌یابی

| پیام | چه باید کرد |
| --- | --- |
| `Session closed from wdio session` | شما سشن دیباگ را بسته‌اید. وقتی تست باید ادامه پیدا کند، از `resume` استفاده کنید. |
| سشن `debug-0-0` وجود ندارد | اجرا هنوز متوقف نشده است، یا از شناسه ورکر دیگری استفاده کرده است. `wdio session list` نام‌ها را چاپ می‌کند. |
| توقف هرگز رخ نمی‌دهد | دستور باید `wdio run --debug=agent` باشد. یک تست موفق متوقف نمی‌شود، مگر اینکه `browser.debug()` را فراخوانی کند. |

## گام‌های بعدی

- [دیباگ کردن](/docs/debugging) — `browser.debug()`، بریک‌پوینت‌ها و تست‌های ناپایدار
- [REPL](/docs/repl) — شل تعاملی
- [wdio session](/docs/session) — باز کردن سشنی که به یک اجرای تست متصل نیست