---
id: selenium
title: Selenium DevTools
description: "افزودن رابط کاربری اشکال‌زدایی DevTools به تست‌های Selenium WebDriver در Node.js یا Python با هر اجراکننده تست، و فعال‌سازی حالت trace."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

آداپتور Selenium WebDriver برای [WebdriverIO DevTools](https://github.com/webdriverio/devtools) - همان رابط کاربری اشکال‌زدایی بصری را به هر تست Selenium می‌آورد، در **Node.js** یا **Python**، صرف‌نظر از اجراکننده تست.

Node.js با **Mocha**، **Jest**، **Cucumber** یا یک اسکریپت ساده کار می‌کند - افزونه اجراکننده را به‌طور خودکار تشخیص می‌دهد و مرزهای تست را متناسب با آن متصل می‌کند. Python با **pytest** یا یک اسکریپت ساده کار می‌کند و تحت pytest اصلاً نیازی به تغییر فایل‌های تست شما ندارد.

زبان خود را در زبانه‌های زیر انتخاب کنید؛ این انتخاب در سراسر صفحه با شما همراه است.

## نصب

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

```bash
npm install @wdio/selenium-devtools
```

</TabItem>
<TabItem value="python" label="Python">

```bash
pip install selenium-devtools-py
```

**به Python 3.10+ و `selenium>=4.44` نیاز دارد.** هر دو در فراداده بسته اعلام شده‌اند، بنابراین pip آن‌ها را الزامی می‌کند، به‌جای اینکه بگذارد در زمان اجرا با یک زبانه Network خالی مواجه شوید. ضبط شبکه از طریق API عمومی رویدادهای BiDi که selenium در نسخه 4.44 بازتولید کرد مشترک می‌شود؛ اتصال خصوصی‌ای که این API جایگزینش شد در همان انتشار حذف شد، و همین 4.44 است که حداقل نسخه مورد نیاز را در Python تعیین می‌کند.

</TabItem>
</Tabs>

## راه‌اندازی

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

هر بلوک زیر یک **نمونه کامل و آماده کپی‌وچسباندن** است که فراخوانی `DevTools.configure(...)` را نیز شامل می‌شود. اجراکننده‌ای را که استفاده می‌کنید انتخاب کنید، قطعه کد را در پروژه خود قرار دهید و اجرا کنید.

### Mocha

```js
// tests/example.test.js
import { strict as assert } from 'node:assert'
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

  it('loads example.com and reads the heading', async function () {
    await driver.get('https://example.com')
    const heading = await driver.wait(until.elementLocated(By.css('h1')), 10000)
    assert.equal(await heading.getText(), 'Example Domain')
  })
})
```

اجرای آن:

```bash
mocha --timeout 60000 tests/example.test.js
```

> جایگزین: از import در هر فایل صرف‌نظر کنید و از `mocha --require @wdio/selenium-devtools` استفاده کنید تا افزونه یک‌بار برای کل اجرا بارگذاری شود.

### Jest

```js
// test/example.js
import { DevTools } from '@wdio/selenium-devtools'
import { Builder, By, until } from 'selenium-webdriver'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})

describe('login flow', () => {
  let driver

  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build()
  }, 60000)

  afterEach(async () => {
    if (driver) {
      await driver.quit()
    }
  })

  test('logs in with valid credentials', async () => {
    await driver.get('https://the-internet.herokuapp.com/login')
    await driver.findElement(By.id('username')).sendKeys('tomsmith')
    await driver.findElement(By.id('password')).sendKeys('SuperSecretPassword!')
    await driver.findElement(By.css('button[type="submit"]')).click()

    await driver.wait(until.urlContains('/secure'), 10000)
    const flash = await driver.findElement(By.id('flash'))
    expect(await flash.getText()).toMatch(/You logged into a secure area/i)
  }, 60000)
})
```

`jest.config.json`:

```json
{
  "testEnvironment": "node",
  "testMatch": ["<rootDir>/test/example.js"],
  "testTimeout": 60000,
  "transform": {}
}
```

اجرای آن (ESM به پرچم آزمایشی نیاز دارد):

```bash
NODE_OPTIONS=--experimental-vm-modules jest --config jest.config.json
```

### Cucumber

چیدمان تفکیک‌شده Cucumber یعنی سه فایل کوچک - یکی برای بارگذاری افزونه، یکی برای World/hooks، و یکی برای تعاریف گام‌ها.

`features/support/setup.js` - بارگذاری افزونه و پیکربندی یک‌باره:

```js
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})
```

`features/support/world.js` - چرخه عمر درایور:

```js
import {
  setWorldConstructor,
  World,
  Before,
  After,
  setDefaultTimeout
} from '@cucumber/cucumber'
import { Builder } from 'selenium-webdriver'

setDefaultTimeout(60000)

class CustomWorld extends World {
  constructor (options) {
    super(options)
    this.driver = null
  }
}

setWorldConstructor(CustomWorld)

Before(async function () {
  this.driver = await new Builder().forBrowser('chrome').build()
})

After(async function () {
  if (this.driver) {
    await this.driver.quit()
    this.driver = null
  }
})
```

`cucumber.json` - فایل setup را **اول** متصل کنید تا افزونه پیش از اجرای هر گامی Selenium را patch کند:

```json
{
  "default": {
    "import": [
      "features/support/setup.js",
      "features/support/world.js",
      "features/support/steps.js"
    ],
    "paths": ["features/*.feature"],
    "format": ["progress"]
  }
}
```

اجرای آن:

```bash
cucumber-js --config cucumber.json
```

### اسکریپت ساده Node (بدون اجراکننده تست)

اگر `node tests/google.test.js` را مستقیماً اجرا کنید، هیچ اجراکننده‌ای وجود ندارد که افزونه به‌طور خودکار به آن متصل شود. به‌طور پیش‌فرض یک ردیف واحد "Selenium Session" در داشبورد دریافت می‌کنید. برای داشتن یک مرز تست نام‌دار، `DevTools.startTest` / `endTest` را پیرامون کار خود فراخوانی کنید:

```js
// tests/google.test.js
import { DevTools } from '@wdio/selenium-devtools'
import { Builder, By, until, Key } from 'selenium-webdriver'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 },
  headless: false
})

async function run () {
  DevTools.startTest('search Google for Selenium')   // اختیاری - ردیف تست را نام‌گذاری می‌کند

  const driver = await new Builder().forBrowser('chrome').build()
  try {
    await driver.get('https://www.google.com')
    const searchBox = await driver.findElement(By.name('q'))
    await searchBox.sendKeys('Selenium WebDriver JavaScript', Key.ENTER)
    await driver.wait(until.titleContains('Selenium'), 10000)
    DevTools.endTest('passed')
  } catch (err) {
    DevTools.endTest('failed')
    throw err
  } finally {
    await driver.quit()
  }
}

run()
```

```bash
node tests/google.test.js
```

> فقط برای اسکریپت‌های ساده Node از `startTest` / `endTest` استفاده کنید. تحت Mocha / Jest / Cucumber افزونه از قبل می‌داند هر تست چه زمانی شروع و تمام می‌شود - فراخوانی دستی این‌ها ردیف‌های تکراری ایجاد می‌کند.

</TabItem>
<TabItem value="python" label="Python">

### pytest

هیچ چیزی در فایل‌های تست شما قرار نمی‌گیرد - افزونه به‌طور خودکار کشف می‌شود و یک پرچم آن را برای اجرا روشن می‌کند:

```bash
pytest --devtools tests/              # داشبورد زنده
pytest --devtools-trace tests/        # به‌جای آن یک آرشیو trace می‌نویسد (به‌طور ضمنی --devtools را شامل می‌شود)
```

یا این انتخاب را commit کنید تا لازم نباشد کسی پرچم را به خاطر بسپارد:

```toml title="pyproject.toml"
[tool.pytest.ini_options]
devtools = true
# devtools_trace = true                          # آرشیو trace به‌جای داشبورد
# devtools_trace_granularity = "test"            # ... یک آرشیو برای هر تست
# devtools_trace_policy = "retain-on-failure"    # ... فقط نگه داشتن موارد ناموفق
```

یک `pytest.ini` با بخش `[pytest]` همان کلیدها را می‌پذیرد. دو تنظیم trace در بخش [چند آرشیو، و کدام‌ها را نگه داریم](#how-many-archives-and-which-ones-to-keep) پوشش داده شده‌اند.

ضبط همیشه اختیاری (opt-in) است - نصب بسته هرگز نباید رفتار یک مجموعه تست موجود را تغییر دهد. تنها تفاوت در این است که *چگونه* موافقت خود را اعلام می‌کنید:

| نحوه فعال‌سازی | دامنه |
|---|---|
| `--devtools` / `--devtools-trace` | این اجرا |
| `devtools` / `devtools_trace` در `[tool.pytest.ini_options]` | این پروژه |
| `DEVTOOLS_ENABLE=1` (یا `DEVTOOLS_PORT=<n>` که به داشبوردی که از قبل در حال اجراست نیز متصل می‌شود) | این shell - برای CI |

بالاترین اولویت برنده است: CLI، سپس ini، سپس محیط. `pytest -o devtools=false` پیش‌فرض پروژه را برای یک اجرای واحد خاموش می‌کند، به همین دلیل `--no-devtools` وجود ندارد. `DEVTOOLS_TRACE=1` حالت trace را انتخاب می‌کند اما به‌تنهایی ضبط را روشن **نمی‌کند**، بنابراین export کردن آن برای اسکریپت‌های خودتان هرگز اجرایی از pytest را که درخواست نکرده‌اید ضبط نمی‌کند.

در حالت زنده، داشبورد در یک پنجره مرورگر اختصاصی باز می‌شود و **پس از اجرا باز می‌ماند** تا بتوانید آنچه رخ داده را بررسی کنید؛ برای پایان دادن آن را ببندید (یا `Ctrl-C`). دو نوع اجرا حتی با فعال‌سازی هم ضبط نمی‌شوند: `--collect-only`، که در آن چیزی اجرا نمی‌شود، و اجرایی که هیچ تستی جمع‌آوری نکرده است - در غیر این صورت یک مسیر اشتباه تایپ‌شده ترمینال شما را روی یک داشبورد خالی معطل می‌کرد.

### اسکریپت ساده Python (بدون اجراکننده تست)

دو خط پیرامون کد Selenium موجود شما:

```python title="login.py"
import selenium_devtools as devtools
from selenium import webdriver

devtools.enable()                     # باز کردن داشبورد، ضبط همه دستورات
# devtools.enable(trace=True)         # یا: نوشتن یک trace.zip بدون باز کردن هیچ پنجره‌ای

driver = webdriver.Chrome()
driver.get('https://the-internet.herokuapp.com/login')
driver.find_element('id', 'username').send_keys('tomsmith')
driver.quit()

devtools.wait_for_dashboard_close()   # باز نگه داشتن UI برای بررسی (وقتی پنجره‌ای باز نیست کاری انجام نمی‌دهد)
devtools.disable()
```

اگر backend قابل راه‌اندازی یا دسترسی نباشد، `enable()` یک هشدار ثبت می‌کند و `None` برمی‌گرداند. ضبط نادیده گرفته می‌شود و تست‌های شما همچنان اجرا می‌شوند - نبود داشبورد هرگز باعث شکست یک مجموعه تست نمی‌شود.

### اجراهای موازی (`pytest -n`)

**pytest-xdist بدون هیچ پیکربندی اضافی کار می‌کند.** همه فرایندهایی که به یک اجرا گزارش می‌دهند باید روی یک شناسه اجرا توافق داشته باشند، وگرنه backend هر اتصال را یک اجرای جدید در نظر می‌گیرد و آنچه اجرای قبلی ضبط کرده بود را پاک می‌کند. با xdist این توافق وجود دارد: افزونه در **controller** نیز بارگذاری می‌شود و فعال‌سازی ضبط در آنجا شناسه را پیش از آنکه xdist هر workerی را ایجاد کند تعیین می‌کند - workerها فرایندهای فرزند هستند، بنابراین آن را به ارث می‌برند.

آنچه واقعاً به‌صورت اجراهای جداگانه دیده می‌شود: دو فراخوانی مستقل `pytest`، یا workerی که بدون محیط شروع شده است. برای پیوستن چنین فرایندهایی به یک اجرا، خودتان `DEVTOOLS_RUN_ID` را export کنید.

</TabItem>
</Tabs>

## گزینه‌های پیکربندی {#configuration-options}

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| گزینه | نوع | پیش‌فرض | توضیحات |
|--------|------|---------|-------------|
| `port` | `number` | `3000` | پورت سرور backend مربوط به DevTools. اگر از قبل در حال استفاده باشد به‌طور خودکار افزایش می‌یابد. |
| `hostname` | `string` | `'localhost'` | نام میزبانی که سرور backend به آن متصل می‌شود. |
| `openUi` | `boolean` | `true` | باز کردن خودکار رابط کاربری DevTools در یک پنجره جدید Chrome. برای CI روی `false` تنظیم کنید. |
| `captureScreenshots` | `boolean` | `true` | گرفتن اسکرین‌شات پس از هر دستور WebDriver. |
| `headless` | `boolean` | `false` | اجرای مرورگر **تست** به‌صورت headless (`--headless=old` را تزریق می‌کند). پنجره رابط کاربری DevTools تحت تأثیر قرار نمی‌گیرد. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | ضبط ویدیوی `.webm` برای هر نشست. گزینه‌ها با صفحه [WebdriverIO Screencast](/docs/devtools/wdio/screencast) مطابقت دارند. |
| `rerunCommand` | `string` | خودکار | قالب دستور برای اجرای مجدد هر تست. `{{testName}}` جایگزین می‌شود. در صورت حذف، به‌طور خودکار از argv اجراکننده استخراج می‌شود. |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` رابط کاربری DevTools را باز می‌کند؛ `trace` از آن صرف‌نظر کرده و به‌جای آن یک artifact قابل حمل می‌نویسد. [حالت Trace](/docs/devtools/wdio/trace-mode) را ببینید. `openUi` را بازنویسی می‌کند. |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | چیدمان artifact مربوط به trace. فقط وقتی `mode: 'trace'` باشد اعمال می‌شود. |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | یک trace برای هر نشست / فایل spec / تست. `'test'` هرکدام را در `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip` می‌نویسد. فقط وقتی `mode: 'trace'` باشد اعمال می‌شود. [حالت Trace](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity) را ببینید. |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | کدام traceها نگه داشته شوند. همراه با `traceGranularity: 'test'` به کار می‌رود. فقط وقتی `mode: 'trace'` باشد اعمال می‌شود. |
| `filmstrip` | `boolean` | `true` | ضبط یک screencast پیوسته و متراکم در trace برای پیمایش فریم‌به‌فریم در پخش‌کننده. فقط وقتی `mode: 'trace'` باشد اعمال می‌شود. |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | حالت trace + `traceGranularity: 'test'`. اسکرین‌شات برای هر تست، که هنگام فعال بودن یک آداپتور اجراکننده Allure، از طریق `allure-js-commons` به‌صورت درون‌خطی به Allure (`image/png`) پیوست می‌شود. |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | حالت trace + `traceGranularity: 'test'`. ویدیوی screencast برای هر تست، که طبق سیاست داده‌شده نگه داشته می‌شود و هنگام فعال بودن یک آداپتور اجراکننده Allure، از طریق `allure-js-commons` به‌صورت درون‌خطی به Allure (`video/webm`) پیوست می‌شود. |
| `emitArtifactsManifest` | `boolean` | خودکار | نوشتن manifest با نام `devtools-artifacts-<sessionId>.json` — فهرست عمومی‌ای که گزارشگرها/CI برای کشف artifactهای تولیدشده از آن استفاده می‌کنند — در کنار trace. به‌طور پیش‌فرض خاموش است؛ وقتی یک runtime از `allure-js-commons` فعال باشد **به‌طور خودکار فعال می‌شود**. فقط در حالت trace. |
| `captureAssertions` | `boolean` | `true` | ضبط assertionهای `node:assert` (هم موفق و هم ناموفق) به‌عنوان ردیف‌های اقدام در trace. برای غیرفعال‌سازی روی `false` تنظیم کنید. |

```js
DevTools.configure({
  port: 3000,
  hostname: 'localhost',
  headless: false,
  openUi: true
})
```

> **برای CI**، هم `headless: true` (پنهان کردن مرورگر تست) و هم `openUi: false` (تلاش نکردن برای باز کردن پنجره داشبورد - محیط‌های CI نمایشگر ندارند) را تنظیم کنید. backend روی پورت پیکربندی‌شده به اجرا ادامه می‌دهد تا در صورت نیاز بتوانید بعداً UI را باز کنید.

</TabItem>
<TabItem value="python" label="Python">

هیچ شیء گزینه‌ای وجود ندارد - لازم نیست هیچ چیز مختص devtools در کد تست شما ظاهر شود. تحت pytest آداپتور را همان‌طور پیکربندی می‌کنید که pytest را پیکربندی می‌کنید؛ یک اسکریپت آرگومان‌های کلیدواژه‌ای را به `enable()` می‌دهد؛ و هر چیزی که پرچم ندارد یک متغیر محیطی است.

| پرچم pytest | `[tool.pytest.ini_options]` | اثر |
|---|---|---|
| `--devtools` | `devtools = true` | ضبط این اجرا و باز کردن داشبورد. |
| `--devtools-trace` | `devtools_trace = true` | ضبط این اجرا و نوشتن یک آرشیو trace به‌جای باز کردن داشبورد. به‌طور ضمنی `--devtools` را شامل می‌شود. |
| `--devtools-trace-granularity <session\|test>` | `devtools_trace_granularity = test` | یک آرشیو برای کل اجرا (`session`، پیش‌فرض) یا یکی برای هر تست. به‌طور ضمنی `--devtools-trace` را شامل می‌شود. |
| `--devtools-trace-policy <policy>` | `devtools_trace_policy = "retain-on-failure"` | کدام آرشیوها ارزش نگهداری دارند. به‌طور ضمنی `--devtools-trace` را شامل می‌شود. [چند آرشیو، و کدام‌ها را نگه داریم](#how-many-archives-and-which-ones-to-keep) را ببینید. |

بالاترین اولویت برنده است: CLI، سپس ini، سپس متغیرهای محیطی زیر. `pytest -o devtools=false` پیش‌فرض پروژه را برای یک اجرا خاموش می‌کند، و `pytest -o devtools_trace_policy=on` همین کار را برای هر یک از موارد دیگر انجام می‌دهد.

| متغیر | اثر |
|---|---|
| `DEVTOOLS_ENABLE=1` | روشن کردن ضبط، وقتی هیچ پرچم یا گزینه ini از قبل این کار را نکرده باشد. |
| `DEVTOOLS_PORT=<n>` | اتصال به داشبوردی که از قبل روی این پورت گوش می‌دهد؛ ضبط را نیز فعال می‌کند. |
| `DEVTOOLS_HOST=<host>` | میزبانی که داشبورد روی آن در دسترس است (پیش‌فرض `localhost`). |
| `DEVTOOLS_TRACE=1` | نوشتن یک آرشیو trace به‌جای باز کردن داشبورد. حالت را برای یک اسکریپت ساده انتخاب می‌کند؛ تحت pytest به‌تنهایی اجرا را فعال نمی‌کند. |
| `DEVTOOLS_TRACE_GRANULARITY=<session\|test>` | حالت trace: یک آرشیو برای کل اجرا، یا یکی برای هر تست. محیطی (ambient) است، بنابراین هرگز به‌تنهایی حالت trace را انتخاب نمی‌کند - آن را همراه با `DEVTOOLS_TRACE=1` به کار ببرید. |
| `DEVTOOLS_TRACE_POLICY=<policy>` | حالت trace: کدام آرشیوها ارزش نگهداری دارند. محیطی (ambient) است، بنابراین هرگز به‌تنهایی حالت trace را انتخاب نمی‌کند - آن را همراه با `DEVTOOLS_TRACE=1` به کار ببرید. |
| `DEVTOOLS_FILMSTRIP=0` | حالت trace: کنار گذاشتن filmstrip متراکم از آرشیو. |
| `DEVTOOLS_A11Y=0` | حالت trace: صرف‌نظر از درخت A11y و مستطیل‌های عناصر برای هر اقدام. |
| `DEVTOOLS_OPEN=0` | پنجره داشبورد باز نشود (CI). |
| `DEVTOOLS_BIDI=0` | غیرفعال کردن BiDi، و همراه با آن ضبط console و network. |
| `DEVTOOLS_RUN_ID=<id>` | پیوستن چند فرایند به یک اجرا. |
| `DEVTOOLS_BACKEND_CMD=<cmd>` | شروع backend با یک دستور صریح به‌جای دستور تعیین‌شده. |

backend یک برنامه Node است، بنابراین **Node.js 22.19 یا بالاتر باید در همه حالت‌ها در دسترس باشد** - حتی در حالت trace، که هیچ پنجره داشبوردی باز نمی‌شود. موضوع فقط UI نیست: page collector توسط backend ارائه می‌شود، کل جریان رویدادها از طریق WebSocket آن منتقل می‌شود، و در حالت trace همان است که آرشیو را می‌سازد. `enable()` از ابتدا وجود Node را بررسی می‌کند و آنچه را که کم است نام می‌برد، به‌جای اینکه بعداً به‌صورت timeout در spawn شکست بخورد. آداپتور backend را برای شما پیدا یا راه‌اندازی می‌کند - اگر ترجیح می‌دهید خودتان آن را مدیریت کنید [اجرای backend به‌تنهایی](/docs/devtools/dashboard#running-the-backend-on-its-own) را ببینید، یا `DEVTOOLS_PORT` را به backendی که از قبل در حال اجراست اشاره دهید، که در این صورت به Node محلی نیازی نیست.

### Assertionها

عبارات `assert` موفق و ناموفق به‌صورت ردیف‌هایی حاوی **expected** و **actual** ظاهر می‌شوند، و شکست‌ها به زبانه Errors می‌رسند. `assert` در Python یک statement است نه یک فراخوانی، بنابراین برخلاف patch کردن `node:assert` در آداپتور Node، چیزی برای wrap کردن وجود ندارد - نتیجه از اجراکننده می‌آید.

**تحت pytest**، مقادیر از assertion rewriter می‌آیند، بنابراین هر ردیف عملوندهای واقعی را در بر دارد. ضبط assertionهای *موفق* به `enable_assertion_pass_hook` در pytest نیاز دارد، که افزونه خودش آن را روشن می‌کند. یک نکته: pytest برای هر ماژول، *در حین بازنویسی آن*، تصمیم می‌گیرد که آیا آن hook را منتشر کند یا نه، بنابراین ماژولی که bytecode بازنویسی‌شده‌اش پیش از نصب افزونه cache شده باشد همچنان فقط شکست‌ها را گزارش می‌دهد. آداپتور این را یک‌بار در زمان جمع‌آوری اعلام می‌کند و cacheی را که باید حذف شود نام می‌برد - که لزوماً `__pycache__` کنار تست‌های شما **نیست**، زیرا `sys.pycache_prefix` (که به‌طور پیش‌فرض در Python سیستمی macOS تنظیم شده) هر ماژول بازنویسی‌شده را به یک درخت مرکزی می‌فرستد.

**در یک اسکریپت ساده** هیچ rewriterی وجود ندارد، بنابراین نتایج از رویدادهای خط (line events) مفسر می‌آیند و مقادیر از frameی خوانده می‌شوند که در آستانه اجرای assert است. فقط خواندن‌هایی که نمی‌توانند کد شما را اجرا کنند تعیین می‌شوند: یک literal یا یک متغیر محلی تعیین می‌شود، اما یک attribute یا یک فراخوانی نه، زیرا ارزیابی دوباره `driver.current_url` یک دستور WebDriver دیگر صادر می‌کند.

</TabItem>
</Tabs>

## حالت trace {#trace-mode}

مسیر ضبط headless، در **هر دو زبان** - هیچ پنجره رابط کاربری DevTools باز نمی‌شود، و اجرا یک آرشیو trace قابل حمل را در پوشه `test-results/` می‌نویسد، با همان ساختار artifact مربوط به trace در WebdriverIO. تفاوت این دو فقط در این است که چه مقدار از artifact را می‌توانید تنظیم کنید، و اینکه چه کسی آن را می‌سازد.

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

در پایان نشست، آداپتور خودش `trace-<sessionId>.zip` (یا یک دایرکتوری) را در `test-results/` کنار دایرکتوری تست / پیکربندی تعیین‌شده می‌نویسد.

```js
DevTools.configure({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // اختیاری؛ پیش‌فرض 'zip'
})
```

اتصال پورت backend، پنجره UI و گزینه `screencast` همگی در حالت trace نادیده گرفته می‌شوند. برای مرجع کامل ویژگی‌ها (محتوای artifact، نمایشگر، تست موبایل، زمان انتخاب `zip` در مقابل `ndjson-directory`)، [صفحه حالت Trace](/docs/devtools/wdio/trace-mode) را ببینید.

### artifactهای هر تست و نگهداری

در `traceGranularity: 'test'` هر تست پوشه artifact مخصوص خود را دریافت می‌کند، و `tracePolicy` تعیین می‌کند کدام‌ها نگه داشته شوند (مثلاً `retain-on-failure`). در این حالت همچنین می‌توانید `screenshot` (PNG) و `video` (`.webm`) برای هر تست ضبط کنید و یک `filmstrip` متراکم را فعال کنید که برای پیمایش فریم‌به‌فریم در trace ضبط می‌شود. وقتی یک آداپتور اجراکننده `allure-js-commons` فعال باشد، traceها / اسکرین‌شات‌ها / ویدیوهای هر تست به‌صورت درون‌خطی به گزارش Allure پیوست می‌شوند (و `emitArtifactsManifest` به‌طور خودکار فعال می‌شود)؛ در غیر این صورت در `test-results/` نوشته شده و در manifest ثبت می‌شوند.

```js
DevTools.configure({
  mode: 'trace',
  traceGranularity: 'test',
  tracePolicy: 'retain-on-failure',
  filmstrip: true,
  screenshot: 'only-on-failure',
  video: 'retain-on-failure'
})
```

</TabItem>
<TabItem value="python" label="Python">

هیچ شیء گزینه‌ای برای تنظیم وجود ندارد - یک پرچم تحت pytest، یا یک آرگومان کلیدواژه‌ای در یک اسکریپت:

```bash
pytest --devtools-trace tests/        # به‌طور ضمنی --devtools را شامل می‌شود
DEVTOOLS_TRACE=1 python3 login.py     # اسکریپت ساده؛ معادل devtools.enable(trace=True)
```

```python title="login.py"
devtools.enable(trace=True)           # نوشتن یک trace.zip به‌جای باز کردن داشبورد
```

آرشیو در `test-results/` کنار فایل تستی قرار می‌گیرد که اولین دستور ضبط‌شده از آن آمده است - همان دایرکتوری‌ای که ویدیوهای screencast از قبل در آن نوشته می‌شوند - با نام `trace-<sessionId>.zip`، یا وقتی [یک آرشیو برای هر تست](#how-many-archives-and-which-ones-to-keep) درخواست کنید، به نام هر تست. وقتی هیچ دستوری مکان منبعی از کد شما را در بر نداشته باشد، به `test-results/` زیر دایرکتوری فعلی بازمی‌گردد.

**هیچ پنجره داشبوردی باز نمی‌شود.** artifact خودِ خروجی است، و یک اجرای زنده تا زمانی که پنجره را ببندید روی آن مسدود می‌ماند - یک پنجره، نوشتن یک فایل را به یک نشست تعاملی تبدیل می‌کرد. backend همچنان شروع می‌شود، زیرا همان چیزی است که آرشیو را *می‌سازد*: تبدیل‌های trace به TypeScript نوشته شده‌اند، بنابراین یک اجرای Python آن‌ها را از backend درخواست می‌کند به‌جای اینکه نسخه دومی از آن‌ها را همراه داشته باشد. این تنها تفاوت با حالت trace بدون backend در آداپتور Node.js است، و دلیل اینکه [Node.js 22.19 یا بالاتر در همه حالت‌ها لازم است](#configuration-options).

فراتر از ردیف‌های دستور، اسکرین‌شات‌ها و selectorهای هر دستور، و console و network که هر دو حالت ضبط می‌کنند، آرشیو موارد زیر را در بر دارد:

| در آرشیو | پیش‌فرض | غیرفعال‌سازی |
|---|---|---|
| سفر در زمان DOM - جریان mutationها که پخش‌کننده گام‌به‌گام بازپخش می‌کند | روشن | - |
| filmstrip متراکم - فریم‌های screencast، که به‌جای یک `.webm` در trace قرار می‌گیرند | روشن | `DEVTOOLS_FILMSTRIP=0` |
| درخت A11y و overlay عناصر - که کنار هر اقدام خوانده می‌شوند، با هزینه دو رفت‌وبرگشت اضافی برای هر دستور | روشن | `DEVTOOLS_A11Y=0` |

حالت trace هیچ `.webm`ی را encode نمی‌کند، بنابراین به `ffmpeg` نیازی ندارد - فریم‌ها *خودِ* filmstrip هستند.

**export هنگام پایان اجرا درخواست می‌شود، نه هنگام خروج فرایند** - pytest در `sessionfinish` درخواست می‌دهد و `disable()` در یک اسکریپت پیش از بستن transport عمل export را انجام می‌دهد، بنابراین CI artifact را دریافت می‌کند، چه پنجره‌ای درگیر بوده باشد چه نه.

### چند آرشیو، و کدام‌ها را نگه داریم {#how-many-archives-and-which-ones-to-keep}

دو تنظیم این را تعیین می‌کنند، و هیچ‌کدام خارج از حالت trace معنایی ندارند.

**Granularity (دانه‌بندی)** - اجرا چند آرشیو می‌نویسد:

| `--devtools-trace-granularity` | نتیجه |
|---|---|
| `session` (پیش‌فرض) | یک آرشیو برای کل اجرا. |
| `test` | یک آرشیو برای هر تست، که هرکدام فقط دستورات، console، network، mutationهای DOM، درخت‌های a11y و فریم‌های screencast خود آن تست را در بر دارد. |

عمداً هیچ مقدار `spec`ی در اینجا وجود ندارد. spec این آداپتور *همان* فایل تست آن است، بنابراین یک نام سوم فقط می‌توانست بی‌صدا به معنای یکی از دو مورد بالا باشد.

**Policy (سیاست)** - کدام‌یک از آن آرشیوها نگه داشته می‌شوند:

| `--devtools-trace-policy` | نتیجه |
|---|---|
| `on` (پیش‌فرض) | همه چیز نگه داشته می‌شود. |
| `retain-on-failure` | فقط موارد ناموفق نگه داشته می‌شوند. |
| `retain-on-first-failure`، `on-first-retry`، `on-all-retries`، `retain-on-failure-and-retries` | پذیرفته می‌شوند، اما در حال حاضر **دقیقاً مانند `retain-on-failure`** رفتار می‌کنند. |

آن چهار مورد آخر هنوز از تلاش مجدد (retry) آگاه نیستند، و بهتر است این را صریحاً بگوییم تا اینکه آن را از روی آرشیوی که انتظارش را داشتید کشف کنید: هیچ چیزی که این آداپتور ارسال می‌کند شماره تلاش را در بر ندارد، بنابراین تستی که دوباره اجرا شده نتیجه قبلی خود را بازنویسی می‌کند و پرسش مربوط به retry اصلاً قابل طرح نیست. backend این تنزل عملکرد را ثبت می‌کند به‌جای اینکه وانمود کند چنین نیست. فقط در صورتی یکی از آن‌ها را انتخاب کنید که بخواهید `retain-on-failure` را تحت نامی داشته باشید که بعداً معنای بیشتری خواهد داشت.

این دو با هم ترکیب می‌شوند:

| دانه‌بندی | سیاست | آنچه دریافت می‌کنید |
|---|---|---|
| `test` | `retain-on-failure` | فقط تست‌هایی که شکست خورده‌اند. |
| `session` | `retain-on-failure` | آرشیو کل اجرا، در صورتی که چیزی در آن شکست خورده باشد. |
| هرکدام | `on` | همه چیز. |

هر آرشیوی که در دانه‌بندی `test` نگه داشته شود به نام تست خود نام‌گذاری می‌شود (`trace-<test>-<hash>.zip`، که hash از nodeid تست گرفته می‌شود تا دو حالت پارامتری با عنوان مشترک نتوانند یکدیگر را بازنویسی کنند). اجرایی که چیزی را نگه ندارد اصلاً چیزی نمی‌نویسد، و نکته همین است - آرشیوهایی که برایتان باقی می‌مانند همان‌هایی هستند که ارزش باز کردن دارند، و یک export ردشده یعنی سیاست درست کار می‌کند، نه اینکه شکستی رخ داده است.

آن‌ها را برای یک اجرا تنظیم کنید:

```bash
pytest --devtools-trace-granularity test --devtools-trace-policy retain-on-failure tests/
```

یا آن‌ها را commit کنید تا مشارکت‌کننده‌ای که پروژه را clone می‌کند، بدون اینکه به او گفته شود، به همان شیوه ضبط کند:

```ini title="pytest.ini"
[pytest]
devtools_trace = true
devtools_trace_granularity = test
devtools_trace_policy = retain-on-failure
```

`[tool.pytest.ini_options]` در `pyproject.toml` همان کلیدها را می‌پذیرد، و `pytest -o devtools_trace_policy=on tests/` یکی از آن‌ها را برای یک اجرای واحد و بدون ویرایش فایل بازنویسی می‌کند. یک نسخه با توضیحات کامل - شامل هر تنظیم و هر متغیر محیطی، همراه با کاربرد هرکدام - در مخزن در [`examples/selenium/python-test/trace-py-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/python-test/trace-py-test) موجود است.

یک اسکریپت ساده همان دو مورد را به‌عنوان آرگومان‌های کلیدواژه‌ای ارسال می‌کند:

```python title="login.py"
devtools.enable(trace_granularity='test', trace_policy='retain-on-failure')
```

**نام بردن صریح از هرکدام، حالت trace را انتخاب می‌کند.** پرچم CLI، گزینه ini و آرگومان `enable()` همگی به‌طور ضمنی آن را شامل می‌شوند، زیرا یک سیاست یا دانه‌بندی در حالت زنده معنایی ندارد و اعمال آن بدون این حالت، آنچه را درخواست کرده‌اید بی‌صدا کنار می‌گذاشت. `DEVTOOLS_TRACE_POLICY` و `DEVTOOLS_TRACE_GRANULARITY` عمداً این کار را **نمی‌کنند**: یک متغیر export‌شده محیطی است و ممکن است برای اسکریپت دیگری در همان shell تنظیم شده باشد، بنابراین تغییر یک اجرای زنده به حالت trace بر این اساس، داشبوردی را از بین می‌برد که هیچ‌کس نخواسته بود از دست بدهد - آن‌ها را همراه با `DEVTOOLS_TRACE=1` به کار ببرید. اجرایی که در نهایت یک تنظیم trace export‌شده را نادیده بگیرد یک هشدار ثبت می‌کند، به‌جای اینکه شما را رها کند تا خودتان متوجه آرشیوی شوید که هرگز ظاهر نشد.

</TabItem>
</Tabs>

### مشاهده trace

هر `.zip` مربوط به trace را در پخش‌کننده رسمی (first-party) باز کنید — همان رابط کاربری DevTools در یک حالت اختصاصی **player**:

```bash
npx show-trace path/to/trace.zip      # در پروژه‌ای که آداپتور را نصب می‌کند
pnpm show-trace path/to/trace.zip     # از monorepo مربوط به devtools
```

فایل اجرایی `show-trace` همراه با `@wdio/selenium-devtools` ارائه می‌شود، بنابراین در هر پروژه‌ای که آن را نصب کند در دسترس است — بدون وابستگی اضافی. یک پروژه Python هیچ آداپتور Node.jsی نصب نمی‌کند، اما همان پخش‌کننده همراه با backendی ارائه می‌شود که آداپتور از قبل برای شما دریافت می‌کند: `npx -p @wdio/devtools-backend show-trace path/to/trace.zip`.

از آنجا که آداپتور Selenium **جریان mutationهای DOM** صفحه و یک snapshot عنصر / دسترس‌پذیری برای هر دستور را در کنار هر اسکرین‌شات ضبط می‌کند، یک trace از Selenium مجموعه کامل ویژگی‌های پخش‌کننده را به کار می‌اندازد — سفر در زمان DOM، زبانه A11y و overlay انتخاب locator، زبانه Transcript با Copy-for-LLM، تودرتویی Feature → Scenario → Step در Cucumber، و timeline قابل پیمایش. یک trace از Python همان جریان mutation و snapshot هر اقدام را در بر دارد (خواندن عنصر / a11y در آنجا فقط در حالت trace انجام می‌شود و به‌طور پیش‌فرض روشن است)؛ تودرتویی Gherkin تنها موردی است که معادلی در pytest ندارد.

trace از یک schema قابل حمل NDJSON استفاده می‌کند، بنابراین همان `.zip` (یا دایرکتوری) در سایر نمایشگرهای سازگار trace نیز باز می‌شود. برای راهنمای کامل، صفحه **[Trace Player](/docs/devtools/trace-player)** را ببینید.

## API عمومی

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

```js
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure(opts)             // تنظیم گزینه‌های زمان اجرا (بالا را ببینید)
DevTools.startTest(name, meta?)      // علامت‌گذاری یک مرز تست نام‌دار (فقط اسکریپت‌های ساده Node)
DevTools.endTest('passed'|'failed'|'skipped'|'pending')
```

تحت Mocha / Jest / Cucumber افزونه به‌طور خودکار به چرخه عمر اجراکننده متصل می‌شود، بنابراین نیازی به فراخوانی دستی `startTest` / `endTest` ندارید - فراخوانی آن‌ها ردیف‌های تکراری ایجاد می‌کند.

</TabItem>
<TabItem value="python" label="Python">

```python
import selenium_devtools as devtools

devtools.enable()                     # اتصال و instrument کردن؛ idempotent
devtools.disable()                    # برچیدن؛ فراخوانی دوباره بی‌خطر است
devtools.wait_for_dashboard_close()   # مسدود ماندن تا زمان بسته شدن پنجره
devtools.get_capturer()               # SessionCapturer زنده، یا None
devtools.dashboard_url()              # URLی که داشبورد روی آن ارائه می‌شود
```

`enable()` یک `host` و `port` اختیاری، به‌علاوه آرگومان‌های کلیدواژه‌ای می‌پذیرد:

```python
devtools.enable(trace=True)                            # نوشتن یک trace.zip؛ بدون باز کردن پنجره
devtools.enable(trace=True, filmstrip=False)           # ... بدون filmstrip متراکم
devtools.enable(trace=True, a11y=False)                # ... بدون خواندن عنصر / a11y برای هر اقدام
devtools.enable(trace_granularity='test')              # ... یک آرشیو برای هر تست (به‌طور ضمنی trace=True)
devtools.enable(trace_policy='retain-on-failure')      # ... فقط نگه داشتن موارد ناموفق (به‌طور ضمنی trace=True)
```

`filmstrip` و `a11y` فقط در حالت trace اعمال می‌شوند، و هرکدام به‌طور پیش‌فرض روشن هستند (`DEVTOOLS_FILMSTRIP` / `DEVTOOLS_A11Y` همین را از طریق محیط تنظیم می‌کنند). `trace` در صورت عدم تعیین به `DEVTOOLS_TRACE` بازمی‌گردد. `trace_granularity` و `trace_policy` به `DEVTOOLS_TRACE_GRANULARITY` / `DEVTOOLS_TRACE_POLICY` بازمی‌گردند، و ارسال هرکدام به‌تنهایی حالت trace را روشن می‌کند - [چند آرشیو، و کدام‌ها را نگه داریم](#how-many-archives-and-which-ones-to-keep) را ببینید. مقداری خارج از مجموعه پذیرفته‌شده یک هشدار می‌دهد و به پیش‌فرض بازمی‌گردد، به‌جای اینکه بعداً به‌صورت یک فایل گمشده کشف شود.

تحت pytest افزونه همه این‌ها را از طریق `--devtools` / `--devtools-trace` (یا گزینه ini متناظر، یا `DEVTOOLS_ENABLE=1`) هدایت می‌کند، و مرزهای تست از hookهای خود pytest می‌آیند - هیچ معادلی برای `startTest` / `endTest` وجود ندارد که لازم باشد فراخوانی کنید.

</TabItem>
</Tabs>

## نمونه‌ها

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

نمونه‌های کاربردی در دایرکتوری سطح بالای `examples/` در مخزن قرار دارند. workspace را یک‌بار build کنید (`pnpm install && pnpm build`)، سپس از ریشه مخزن اجرا کنید. `pnpm demo:selenium` نمونه پیش‌فرض (Cucumber) را اجرا می‌کند؛ نسخه‌های مختص هر اجراکننده عبارت‌اند از:

| دایرکتوری | اجراکننده | دستور |
|-----------|--------|---------|
| [`examples/selenium/mocha-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/mocha-test) | Mocha | `pnpm --filter @wdio/selenium-devtools example:mocha` |
| [`examples/selenium/jest-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/jest-test) | Jest | `pnpm --filter @wdio/selenium-devtools example:jest` |
| [`examples/selenium/cucumber-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/cucumber-test) | Cucumber | `pnpm demo:selenium` |

</TabItem>
<TabItem value="python" label="Python">

نمونه‌های Python در [`examples/selenium/python-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/python-test) قرار دارند. آداپتور را نصب کرده و workspace را یک‌بار build کنید (`pnpm install && pnpm build`، تا backend وجود داشته باشد)، سپس از ریشه مخزن اجرا کنید:

| نمونه | آنچه نشان می‌دهد | دستور |
|---|---|---|
| `web_form.py` | راه‌اندازی سه‌خطی اسکریپت ساده | `pnpm demo:python` |
| `login.py` | یک اسکریپت طولانی‌تر: ناوبری، پر کردن فرم، assertionها | `pnpm demo:python:login` |
| `trace-py-test/` | pytest با یک کلاس و یک تست در سطح ماژول، به‌علاوه یک `pytest.ini` که حالت trace، دانه‌بندی و نگهداری را commit می‌کند - هر تنظیم در آن با توضیح کاربردش همراه است | `pnpm demo:python:pytest` |

</TabItem>
</Tabs>

## ویژگی‌ها

آداپتور Selenium همان تجربه رابط کاربری DevTools را که WebdriverIO ارائه می‌دهد، در هر دو زبان فراهم می‌کند. هر ویژگی زیر بدون هیچ پیکربندی مختص آن ویژگی به‌طور خودکار ضبط می‌شود — با `DevTools.configure({})` پایه در Node.js، یا `pytest --devtools` در Python. console و network از طریق handlerهای BiDi در Selenium جریان می‌یابند، و در Node.js یک collector تزریق‌شده به‌عنوان جایگزین وجود دارد. پیوندها به مرجع کامل هر ویژگی می‌روند.

- **[اجرای مجدد تعاملی تست و بصری‌سازی](/docs/devtools/wdio/interactive-test-rerunning)** - پیش‌نمایش زنده مرورگر، اسکرین‌شات برای هر دستور، و اجرای مجدد تست/مجموعه با یک کلیک
- **[حفظ و اجرای مجدد (مقایسه)](/docs/devtools/wdio/preserve-and-rerun)** - از یک تست ناموفق snapshot بگیرید، آن را دوباره اجرا کنید و دو اجرا را کنار هم مقایسه کنید
- **[پشتیبانی از چند فریم‌ورک](/docs/devtools/wdio/multi-framework-support)** - تشخیص خودکار Mocha، Jest، Cucumber یا یک اسکریپت ساده در Node.js؛ pytest یا یک اسکریپت ساده در Python
- **[لاگ‌های Console](/docs/devtools/wdio/console-logs)** - ضبط و بررسی خروجی console مرورگر
- **[لاگ‌های Network](/docs/devtools/wdio/network-logs)** - پایش فراخوانی‌های API و فعالیت شبکه
- **[فراداده](/docs/devtools/wdio/metadata)** - قابلیت‌های نشست، محیط و زمان‌بندی برای هر نشست مرورگر
- **[TestLens](/docs/devtools/wdio/testlens)** - پرش از هر دستور به خط منبعی که آن را فعال کرده است
- **[Screencast نشست](/docs/devtools/wdio/screencast)** - ضبط خودکار ویدیوی نشست‌های مرورگر
- **[حالت Trace](/docs/devtools/wdio/trace-mode)** - ضبط headless که یک `trace.zip` قابل حمل تولید می‌کند (بدون پنجره UI)، در هر دو زبان، با تفکیک و نگهداری برای هر تست در هر دو (`traceGranularity` / `tracePolicy` در Node.js؛ `--devtools-trace-granularity` / `--devtools-trace-policy` در Python). `screenshot` / `video` برای هر تست و پیوست درون‌خطی Allure همچنان فقط در Node.js در دسترس هستند؛ [حالت trace](#trace-mode) را ببینید

در Node.js، screencast تنها ویژگی‌ای است که گزینه‌های خاص خود را دارد ([گزینه‌های پیکربندی](#configuration-options) را ببینید):

```js
DevTools.configure({ screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 } })
```

در Python به پیکربندی نیازی ندارد: Chrome فریم‌ها را از طریق CDP جریان می‌دهد، مرورگرهای دیگر به یک اسکرین‌شات برای هر دستور بازمی‌گردند، و encode کردن `.webm` به وجود `ffmpeg` در `PATH` نیاز دارد. در حالت trace همان فریم‌ها به‌جای یک `.webm` به filmstrip متراکم آرشیو تبدیل می‌شوند، بنابراین چیزی encode نمی‌شود و به `ffmpeg` نیازی نیست.

## نحوه کار

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

افزونه prototypeهای `Builder`، `WebDriver` و `WebElement` در `selenium-webdriver` را در زمان import، patch می‌کند:

- **`Builder.build()`** - پس از ساخت، درایور در session capturer ثبت می‌شود و backend مربوط به DevTools در یک فرایند فرزند جداشده (detached) شروع می‌شود.
- **هر متد عمومی `WebDriver` / `WebElement`** - با ضبط دستور wrap می‌شود (آرگومان‌ها + نتیجه + اسکرین‌شات + منبع فراخوانی).
- **`WebDriver.quit()`** - یک hook پاک‌سازی await‌شده، encode کردن screencast، بافر WebSocket و فراداده نهایی را پیش از اجرای quit اصلی flush می‌کند.

وقتی BiDi در دسترس باشد (Chrome ≥114)، لاگ‌های console، استثناهای JavaScript و رویدادهای شبکه مستقیماً از طریق handlerهای BiDi در Selenium جریان می‌یابند. در غیر این صورت افزونه به یک اسکریپت collector تزریق‌شده در سمت مرورگر بازمی‌گردد.

همان collector تزریق‌شده همچنین **جریان mutationهای DOM** صفحه و یک snapshot عنصر / دسترس‌پذیری برای هر دستور را ضبط می‌کند، بنابراین یک trace داده کافی برای بازسازی DOM زنده در هر گام (با نگاشت به ازای هر ناوبری) در بر دارد — این همان چیزی است که سفر در زمان DOM و زبانه A11y پخش‌کننده را ممکن می‌سازد، به‌جای یک بازپخش صرفاً مبتنی بر اسکرین‌شات.

</TabItem>
<TabItem value="python" label="Python">

هیچ prototypeی برای patch کردن وجود ندارد، بنابراین آداپتور Python به‌جای آن یک متد را wrap می‌کند:

- **`WebDriver.execute()`** - تنها گلوگاهی که همه دستورات از آن عبور می‌کنند. متدهای عنصر نیز به آن واگذار می‌کنند (`self._parent.execute`)، بنابراین `click`، `send_keys` و `text` بدون دست زدن به کلاس‌های عنصر، توسط همان wrapper ضبط می‌شوند.
- **راه‌اندازی نشست** - در اولین دستور واقعی، درایور ثبت می‌شود، فراداده ارسال می‌شود، و BiDi، collector و screencast آماده می‌شوند.
- **`quit()`** - پیش از برچیده شدن نشست رهگیری می‌شود، تا screencast در حالی که درایور هنوز وجود دارد encode شده و فریم‌های نهایی flush شوند.

console، استثناهای JavaScript و network از طریق لایه BiDi در selenium (4.44+) جریان می‌یابند، که آداپتور با تزریق قابلیت `webSocketUrl` به درخواست `newSession` آن را برای شما فعال می‌کند.

**جریان mutationهای DOM** از همان collector سمت مرورگری می‌آید که در Node.js استفاده می‌شود، و از طریق BiDi در ابتدای سند ثبت می‌شود تا صفحه پیش از اجرای هر یک از اسکریپت‌های خودش instrument شود. در Chrome، screencast توسط مرورگر از طریق یک websocket مستقل CDP ارسال می‌شود — جدا از کانال دستورات نشست، و همین است که یک جریان فریم واقعی را امن می‌کند، در حالی که یک نشست Selenium thread-safe نیست.

</TabItem>
</Tabs>

## محدودیت‌ها

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| محدودیت | جزئیات |
|-----------|--------|
| اجرای مجدد گام‌های برگ در Cucumber | فیلتر `--name` در Cucumber سناریوها را هدف قرار می‌دهد، نه گام‌های منفرد Gherkin. اجرای مجدد هر گام در داشبورد تحت Cucumber غیرفعال است. |
| نکته حالت headless | `headless: true`، `--headless=old` را تزریق می‌کند؛ `--headless=new` در screencast فریم‌های CDP کاملاً سیاه تولید می‌کند. |
| viewport اولیه | iframe مربوط به snapshot در داشبورد تا زمانی که اولین ناوبری کامل شود و collector سمت مرورگر viewport واقعی را گزارش دهد، به 1280×800 بازمی‌گردد. |

</TabItem>
<TabItem value="python" label="Python">

| محدودیت | جزئیات |
|-----------|--------|
| بدون اسکرین‌شات، ویدیو یا پیوست Allure برای هر تست | **آرشیوهای trace** برای هر تست پشتیبانی می‌شوند (`--devtools-trace-granularity test`)، اما گزینه‌های `screenshot` و `video` برای هر تست در آداپتور Node.js و پیوست درون‌خطی `allure-js-commons` آن، معادلی در Python ندارند - آرشیوها خودِ artifactها هستند. |
| نگهداری آگاه از retry تنزل می‌یابد | `retain-on-first-failure`، `on-first-retry`، `on-all-retries` و `retain-on-failure-and-retries` پذیرفته می‌شوند اما دقیقاً مانند `retain-on-failure` رفتار می‌کنند: هیچ داده ارسالی شماره تلاش را در بر ندارد، بنابراین تستی که دوباره اجرا شده نتیجه قبلی خود را بازنویسی می‌کند. backend این تنزل را ثبت می‌کند. |
| Node در همه حالت‌ها لازم است | backend یک برنامه Node است - page collector را ارائه می‌دهد، جریان رویدادها را منتقل می‌کند و آرشیو trace را می‌سازد - بنابراین Node.js 22.19 یا بالاتر حتی در حالت trace، که هیچ پنجره‌ای باز نمی‌شود، باید موجود باشد. آداپتور آن را برای شما پیدا یا راه‌اندازی می‌کند. |
| گزینه‌های مرورگر بر عهده شماست | هیچ گزینه `headless`ی وجود ندارد؛ Chrome را مانند همیشه از طریق شیء `Options` خود selenium پیکربندی کنید. |
| ویدیوی حالت زنده به ffmpeg نیاز دارد | بدون `ffmpeg` در `PATH`، encode کردن `.webm` با یک هشدار نادیده گرفته می‌شود نه با یک خطا. حالت trace هیچ چیزی encode نمی‌کند - فریم‌هایش به filmstrip می‌روند - بنابراین هرگز به ffmpeg نیاز ندارد. |

</TabItem>
</Tabs>