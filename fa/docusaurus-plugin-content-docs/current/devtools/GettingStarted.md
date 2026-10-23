---
id: getting-started
title: شروع به کار
description: "WebdriverIO DevTools را نصب کنید و اولین تست خود را در حالت زنده یا حالت ردیابی اجرا کنید تا DOM، اسکرین‌شات‌ها، شبکه و خروجی کنسول را بازپخش کنید."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

WebdriverIO DevTools به تست‌های end-to-end مرورگر شما یک رابط کاربری ابزارهای توسعه‌دهنده برای اجرا، اشکال‌زدایی و بررسی اتوماسیون می‌دهد — بازپخش DOM، اسکرین‌شات برای هر دستور، ضبط شبکه و کنسول، و اسکرین‌کست جلسه. این ابزار در دو حالت اجرا می‌شود. **حالت زنده** یک [داشبورد](/docs/devtools/dashboard) تعاملی را در یک پنجره مرورگر باز می‌کند در حالی که تست‌های شما اجرا می‌شوند، تا بتوانید آن‌ها را به‌صورت بلادرنگ مشاهده و دوباره اجرا کنید. **حالت ردیابی** از رابط کاربری صرف‌نظر می‌کند و یک [آرتیفکت ردیابی](/docs/devtools/wdio/trace-mode) قابل‌حمل و آفلاین (`trace.zip`) می‌نویسد که می‌توانید بعداً آن را در پخش‌کننده `show-trace` باز کنید — ایده‌آل برای CI. این صفحه شما را به‌سرعت وارد حالت زنده می‌کند؛ حالت ردیابی تنها با یک گزینه فاصله دارد.

## نصب و اولین اجرا

آداپتور خود را انتخاب کنید، آن را نصب کنید و حداقل پیکربندی زیر را اضافه کنید. تست‌های خود را طبق معمول اجرا کنید — داشبورد DevTools به‌طور خودکار در یک پنجره جدید مرورگر باز می‌شود.

<Tabs
defaultValue="wdio"
values={[
{label: 'WebdriverIO', value: 'wdio'},
{label: 'Selenium', value: 'selenium'},
{label: 'Nightwatch', value: 'nightwatch'},
{label: 'Python', value: 'python'},
]}
>
<TabItem value="wdio">

سرویس را نصب کنید:

```sh
npm install @wdio/devtools-service --save-dev
```

آن را به پیکربندی اجراکننده تست خود اضافه کنید:

```ts
// wdio.conf.ts
export const config = {
  services: ['devtools'],
}
```

تست‌های WebdriverIO خود را طبق معمول اجرا کنید — رابط کاربری DevTools به‌طور خودکار باز می‌شود و تست‌ها بلافاصله شروع به نمایش بصری می‌کنند.

</TabItem>
<TabItem value="selenium">

با Mocha، Jest، Cucumber یا یک اسکریپت ساده `node` کار می‌کند — افزونه به‌طور خودکار اجراکننده را تشخیص می‌دهد. آن را نصب کنید:

```bash
npm install @wdio/selenium-devtools
```

یک import و یک فراخوانی `configure` را در بالای فایل تست خود اضافه کنید (نمونه Mocha):

```js
// tests/example.test.js
import { Builder, By, until } from 'selenium-webdriver'
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})

describe('smoke test', function () {
  let driver

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build()
  })

  after(async function () {
    if (driver) {
      await driver.quit()
    }
  })

  it('loads example.com', async function () {
    await driver.get('https://example.com')
    await driver.wait(until.elementLocated(By.css('h1')), 10000)
  })
})
```

آن را اجرا کنید — رابط کاربری DevTools در یک پنجره جدید Chrome باز می‌شود:

```bash
mocha --timeout 60000 tests/example.test.js
```

برای راه‌اندازی‌های Jest، Cucumber و Node ساده، [صفحه Selenium](/docs/devtools/selenium) را ببینید.

</TabItem>
<TabItem value="nightwatch">

آداپتور را نصب کنید:

```bash
npm install @wdio/nightwatch-devtools
```

آن را از طریق `globals` به پیکربندی Nightwatch خود متصل کنید — نیازی به تغییر فایل‌های تست نیست:

```js
// nightwatch.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default

module.exports = {
  src_folders: ['tests'],

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        // برای ضبط درخواست‌های شبکه لازم است
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

تست‌های خود را طبق معمول اجرا کنید — رابط کاربری DevTools به‌طور خودکار باز می‌شود:

```bash
nightwatch
```

برای راه‌اندازی Cucumber/BDD، [صفحه Nightwatch](/docs/devtools/nightwatch) را ببینید.

</TabItem>
<TabItem value="python">

به Python 3.10+، `selenium>=4.44` و Node.js 22.19+ در `PATH` نیاز دارد (بک‌اند داشبورد یک برنامه Node است). آداپتور را نصب کنید، سپس یک‌بار بک‌اند را نصب کنید:

```bash
pip install selenium-devtools-py
selenium-devtools install-backend
```

در pytest هیچ چیزی در فایل‌های تست شما قرار نمی‌گیرد. ضبط را با یک فلگ فعال کنید:

```bash
pytest --devtools tests/          # داشبورد زنده
pytest --devtools-trace tests/    # به‌جای آن یک آرشیو ردیابی بنویس
```

برای اسکریپت‌های ساده، گزینه‌های ini و متغیرهای محیطی، تب‌های Python را در [صفحه Selenium](/docs/devtools/selenium) ببینید.

</TabItem>
</Tabs>

## گام‌های بعدی

- **[حالت ردیابی](/docs/devtools/wdio/trace-mode)** — `mode: 'trace'` را تنظیم کنید تا از رابط کاربری صرف‌نظر شود و یک آرتیفکت ردیابی قابل‌حمل و آفلاین برای CI تولید شود.
- **[مرجع پیکربندی](/docs/devtools/reference)**: تمام گزینه‌ها در همه آداپتورها.
- **[تست موبایل](/docs/devtools/mobile)**: ضبط جلسات Appium.
- **فریم‌ورک‌ها** — راهنماهای کامل برای هر آداپتور: [WebdriverIO](/docs/devtools/wdio)، [Selenium](/docs/devtools/selenium)، [Nightwatch](/docs/devtools/nightwatch).