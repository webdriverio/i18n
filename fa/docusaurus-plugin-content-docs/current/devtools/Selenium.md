---
id: selenium
title: DevTools برای Selenium
description: "رابط کاربری اشکال‌زدایی DevTools را با هر اجراکنندهٔ تستی به تست‌های Selenium WebDriver در Node.js یا Python اضافه کنید و حالت trace را فعال کنید."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

آداپتور Selenium WebDriver برای [WebdriverIO DevTools](https://github.com/webdriverio/devtools). این آداپتور همان رابط کاربری بصری اشکال‌زدایی را، فارغ از اجراکنندهٔ تست، به هر تست Selenium در **Node.js** یا **Python** می‌آورد.

نسخهٔ Node.js با **Mocha**، **Jest**، **Cucumber** یا یک اسکریپت ساده کار می‌کند. پلاگین اجراکننده را خودکار تشخیص می‌دهد و مرزهای تست را بر همان اساس متصل می‌کند. نسخهٔ Python با **pytest** یا یک اسکریپت ساده کار می‌کند و در pytest اصلاً نیازی به تغییر فایل‌های تست شما ندارد.

زبان خود را از زبانه‌های زیر انتخاب کنید. این انتخاب در سراسر صفحه حفظ می‌شود.

## نصب

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

```bash
npm install @wdio/selenium-devtools
```

به `selenium-webdriver` نسخهٔ 4.8 یا بالاتر نیاز دارد. برای انکود کردن screencast به `.webm` باید `ffmpeg` در `PATH` باشد.

</TabItem>
<TabItem value="python" label="Python">

```bash
pip install selenium-devtools-py
```

**به Python 3.10+ و `selenium>=4.44` نیاز دارد.** هر دو در متادیتای بسته اعلام شده‌اند. به این ترتیب pip خودش آن‌ها را الزامی می‌کند و لازم نیست در زمان اجرا با یک زبانهٔ Network خالی مواجه شوید. ضبط شبکه از طریق API عمومی رویدادهای BiDi انجام می‌شود که selenium در نسخهٔ 4.44 آن را بازتولید کرد. اتصال خصوصی‌ای که این API جایگزینش شد در همان نسخه حذف شد، و همین 4.44 است که حداقل نسخهٔ Python را تعیین می‌کند.

سپس backend را یک بار نصب کنید:

```bash
selenium-devtools install-backend
```

pip نمی‌تواند این کار را برای شما انجام دهد، چون یک wheel هیچ hook نصبی ندارد و backend یک بستهٔ Node است. اگر این مرحله را رد کنید، اجراها همچنان کار می‌کنند و در اولین استفاده با `npx` بستهٔ `@wdio/devtools-backend` را دریافت می‌کنند. اما این روش جایگزین در هر اجرا یک رفت‌وبرگشت به registry هزینه دارد. همچنین اگر یک proxy بسته را رد کند، وسط نشست شکست می‌خورد.

دستورهای مرتبط:

- `selenium-devtools backend-path` نشان می‌دهد که backend نصب شده است یا نه.
- `install-backend --force` یک backend خراب را دوباره نصب می‌کند.
- `uninstall-backend` آن را حذف می‌کند.

محل نصب زیر `$XDG_CACHE_HOME` است (پیش‌فرض `~/.cache`).

اگر یک `chromedriver` در `PATH` باشد که با Chrome شما هم‌خوانی نداشته باشد، همهٔ اجراهای Selenium خراب می‌شوند. اگر هیچ‌کدام در `PATH` نباشد، Selenium Manager یک نسخهٔ سازگار را پیدا می‌کند.

</TabItem>
</Tabs>

## راه‌اندازی

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

حداقل کار لازم یک import در فایل تست شماست: `import '@wdio/selenium-devtools'`. در Mocha، Jest و Cucumber به چیز دیگری نیاز نیست. فراخوانی `DevTools.configure(...)` اختیاری است و فقط مقادیر پیش‌فرض را تغییر می‌دهد.

هر بلوک زیر یک **نمونهٔ کامل و آمادهٔ کپی** است که فراخوانی `DevTools.configure(...)` را هم شامل می‌شود. اجراکننده‌ای را که استفاده می‌کنید انتخاب کنید، قطعه‌کد را در پروژهٔ خود قرار دهید و اجرا کنید.

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

اجرا:

```bash
mocha --timeout 60000 tests/example.test.js
```

> روش جایگزین: به‌جای import در هر فایل، از `mocha --require @wdio/selenium-devtools` استفاده کنید تا پلاگین یک بار برای کل اجرا بارگذاری شود. اگر گزینه‌های غیرپیش‌فرض می‌خواهید، همچنان باید `DevTools.configure(...)` را یک بار در جایی فراخوانی کنید.

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

اجرا (ESM به فلگ آزمایشی نیاز دارد):

```bash
NODE_OPTIONS=--experimental-vm-modules jest --config jest.config.json
```

### Cucumber

ساختار تفکیک‌شدهٔ Cucumber یعنی سه فایل کوچک: یکی برای بارگذاری پلاگین، یکی برای World/hookها و یکی برای تعریف stepها.

`features/support/setup.js`: پلاگین را بارگذاری و یک بار پیکربندی کنید:

```js
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})
```

`features/support/world.js`: چرخهٔ عمر driver:

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

`cucumber.json`: فایل setup را **اول** متصل کنید تا پلاگین پیش از اجرای هر step، Selenium را patch کند:

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

اجرا:

```bash
cucumber-js --config cucumber.json
```

### اسکریپت سادهٔ Node (بدون اجراکنندهٔ تست)

اگر `node tests/google.test.js` را مستقیماً اجرا کنید، هیچ اجراکننده‌ای وجود ندارد که پلاگین خودکار به آن متصل شود. در این حالت به‌طور پیش‌فرض یک ردیف واحد «Selenium Session» در داشبورد خواهید داشت. برای داشتن یک مرز تست نام‌دار، `DevTools.startTest` / `endTest` را دور کار خود فراخوانی کنید:

```js
// tests/google.test.js
import { DevTools } from '@wdio/selenium-devtools'
import { Builder, By, until, Key } from 'selenium-webdriver'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 },
  headless: false
})

async function run () {
  DevTools.startTest('search Google for Selenium')   // اختیاری - نام ردیف تست را تعیین می‌کند

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

> از `startTest` / `endTest` فقط برای اسکریپت‌های سادهٔ Node استفاده کنید. در Mocha / Jest / Cucumber پلاگین خودش می‌داند هر تست کی شروع و کی تمام می‌شود، و فراخوانی دستی آن‌ها ردیف‌های تکراری ایجاد می‌کند.

</TabItem>
<TabItem value="python" label="Python">

### pytest

هیچ چیزی در فایل‌های تست شما قرار نمی‌گیرد. پلاگین خودکار کشف می‌شود و یک فلگ آن را برای اجرا روشن می‌کند:

```bash
pytest --devtools tests/              # داشبورد زنده
pytest --devtools-trace tests/        # به‌جای آن یک آرشیو trace می‌نویسد (به‌طور ضمنی --devtools را فعال می‌کند)
```

یا این انتخاب را commit کنید تا کسی مجبور نباشد فلگ را به خاطر بسپارد:

```toml title="pyproject.toml"
[tool.pytest.ini_options]
devtools = true
# devtools_trace = true                          # آرشیو trace به‌جای داشبورد
# devtools_trace_granularity = "test"            # ... یک آرشیو برای هر تست
# devtools_trace_policy = "retain-on-failure"    # ... فقط موارد شکست‌خورده نگه داشته می‌شوند
```

یک `pytest.ini` با بخش `[pytest]` همین کلیدها را می‌پذیرد. دو تنظیم trace در بخش [چند آرشیو، و کدام‌ها نگه داشته شوند](#how-many-archives-and-which-ones-to-keep) توضیح داده شده‌اند.

ضبط همیشه انتخابی است: نصب بسته هرگز نباید رفتار یک مجموعه تست موجود را تغییر دهد. تنها تفاوت در این است که *چگونه* موافقت خود را اعلام می‌کنید:

| روش فعال‌سازی | دامنه |
|---|---|
| `--devtools` / `--devtools-trace` | همین اجرا |
| `devtools` / `devtools_trace` در `[tool.pytest.ini_options]` | همین پروژه |
| `DEVTOOLS_ENABLE=1` (یا `DEVTOOLS_PORT=<n>` که به داشبوردی که از قبل در حال اجراست نیز متصل می‌شود) | همین shell، برای CI |

اولویت از بالا به پایین است: CLI، سپس ini، سپس متغیرهای محیطی. `pytest -o devtools=false` پیش‌فرض پروژه را برای یک اجرا خاموش می‌کند، و به همین دلیل `--no-devtools` وجود ندارد. `DEVTOOLS_TRACE=1` حالت trace را انتخاب می‌کند، اما به‌تنهایی ضبط را روشن **نمی‌کند**. بنابراین export کردن آن برای اسکریپت‌های خودتان هرگز اجرای pytest‌ای را که نخواسته‌اید ضبط نمی‌کند.

در حالت live، داشبورد در یک پنجرهٔ مرورگر اختصاصی باز می‌شود و **پس از پایان اجرا باز می‌ماند** تا بتوانید آنچه رخ داده را بررسی کنید. برای پایان کار آن را ببندید (یا `Ctrl-C` بزنید).

دو نوع اجرا حتی با فعال‌سازی هم ضبط نمی‌شوند:

- `--collect-only`، که در آن چیزی اجرا نمی‌شود.
- اجرایی که هیچ تستی جمع‌آوری نکرده است. در غیر این صورت یک مسیر اشتباه تایپ‌شده ترمینال شما را روی یک داشبورد خالی معطل می‌کرد.

### اسکریپت سادهٔ Python (بدون اجراکنندهٔ تست)

دو خط دور کد Selenium موجود شما:

```python title="login.py"
import selenium_devtools as devtools
from selenium import webdriver

devtools.enable()                     # داشبورد را باز می‌کند و همهٔ دستورها را ضبط می‌کند
# devtools.enable(trace=True)         # یا: یک trace.zip می‌نویسد و هیچ پنجره‌ای باز نمی‌کند

driver = webdriver.Chrome()
driver.get('https://the-internet.herokuapp.com/login')
driver.find_element('id', 'username').send_keys('tomsmith')
driver.quit()

devtools.wait_for_dashboard_close()   # رابط کاربری را برای بررسی باز نگه می‌دارد (وقتی پنجره‌ای باز نیست کاری نمی‌کند)
devtools.disable()
```

اگر backend راه‌اندازی نشود یا در دسترس نباشد، `enable()` یک هشدار ثبت می‌کند و `None` برمی‌گرداند. در این حالت ضبط انجام نمی‌شود اما تست‌های شما همچنان اجرا می‌شوند. نبودِ داشبورد هرگز باعث شکست یک مجموعه تست نمی‌شود.

### اجراهای موازی (`pytest -n`)

**pytest-xdist بدون هیچ پیکربندی اضافه‌ای کار می‌کند.** همهٔ فرایندهایی که به یک اجرا گزارش می‌دهند باید روی یک شناسهٔ اجرا (run id) توافق داشته باشند. در غیر این صورت backend هر اتصال را یک اجرای جدید در نظر می‌گیرد و آنچه اجرای قبلی ضبط کرده را پاک می‌کند. در xdist این توافق برقرار است: پلاگین در **controller** هم بارگذاری می‌شود و فعال‌سازی ضبط در آنجا، پیش از آنکه xdist هر worker را ایجاد کند، شناسه را تعیین می‌کند. workerها فرایندهای فرزند هستند و آن را به ارث می‌برند.

مواردی که واقعاً اجراهای جداگانه محسوب می‌شوند: دو فراخوانی مستقل `pytest`، یا workerای که بدون متغیرهای محیطی راه‌اندازی شده باشد. برای پیوستن چنین فرایندهایی به یک اجرا، خودتان `DEVTOOLS_RUN_ID` را export کنید.

### کنترل‌های اجرا (Run، Rerun، Run-all)

هر سه در pytest و برای یک اسکریپت ساده کار می‌کنند. rerun پیامی به فرایند در حال اجرا نیست. backend یک فرایند تازه را از دستوری ایجاد می‌کند که آداپتور هنگام شروع منتشر کرده است. کنترلی که backend نتواند انجامش دهد، همراه با ذکر دلیل غیرفعال می‌ماند.

- در pytest هر کنترل ردیف خود را با **nodeid** انتخاب می‌کند (`file.py`، `file.py::Class`، `file.py::Class::test`) و از همان مفسری استفاده می‌کند که تست‌های شما را اجرا کرده است. برای یک اسکریپت ساده، هر سه کنترل اسکریپت را دوباره اجرا می‌کنند.
- گزینه‌هایی که دامنهٔ اجرا را محدود می‌کنند، در rerun هدفمند حذف می‌شوند: `-k`، `-m`، `--deselect`، `--lf`/`--ff`/`--sw` و `-n`/`--dist`. فیلتری که باقی بماند فقط می‌تواند تست نام‌برده را به هیچ محدود کند، و pytest این را به‌عنوان یک خروج بدون خطا گزارش می‌دهد.
- rerun در **rootdir** مربوط به pytest ایجاد می‌شود و مسیرهای موقعیتی در دستور Run-all مطلق می‌شوند. گزینه‌ای که یک مسیر *نسبی* دارد (`-c`، `--junitxml`) در rerun نسبت به rootdir تعیین می‌شود.
- rerun به **همان داشبوردی که دکمه را در آن فشرده‌اید** گزارش می‌دهد و پنجرهٔ دومی باز نمی‌کند. Run-all حتی پس از یک rerun هدفمند، فراخوانی اصلی شما را حفظ می‌کند.

دو محدودیت وجود دارد:

- داشبوردی که هنگام اتصال شما از قبل در حال اجرا بوده، همان دایرکتوری‌ای را حفظ می‌کند که در آن راه‌اندازی شده است.
- در `pytest -n` وضعیت داشبورد متعلق به workerای است که آخر از همه متصل شده است.

### Preserve & Rerun

یک ردیف شکست‌خورده دکمهٔ دومی کنار Rerun دارد. این دکمه از تلاش فعلی snapshot می‌گیرد، تست را دوباره اجرا می‌کند و زبانهٔ **Compare** تفاوت این دو را نشان می‌دهد: دستورها، console و network در کنار هم.

snapshot پیش از شروع rerun گرفته می‌شود. اگر پس از اتصال یک اجرای جدید درخواست حفظ بدهید، رد می‌شود (HTTP 409). یک Rerun ساده همهٔ baselineها را حذف می‌کند، بنابراین زبانهٔ Compare پس از یک rerun معمولی ناپدید می‌شود.

</TabItem>
</Tabs>

## گزینه‌های پیکربندی

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| گزینه | نوع | پیش‌فرض | توضیح |
|--------|------|---------|-------------|
| `port` | `number` | `3000` | پورت سرور backend مربوط به DevTools. اگر از قبل در حال استفاده باشد، خودکار افزایش می‌یابد. |
| `hostname` | `string` | `'localhost'` | hostnameای که سرور backend به آن bind می‌شود. |
| `openUi` | `boolean` | `true` | رابط کاربری DevTools را خودکار در یک پنجرهٔ جدید Chrome باز می‌کند. برای CI روی `false` تنظیم کنید. |
| `captureScreenshots` | `boolean` | `true` | پس از هر دستور موفق WebDriver یک screenshot می‌گیرد. |
| `headless` | `boolean` | `false` | مرورگر **تست** را به‌صورت headless اجرا می‌کند (`--headless=old` را تزریق می‌کند). پنجرهٔ رابط کاربری DevTools تحت تأثیر قرار نمی‌گیرد. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | ضبط ویدیوی `.webm` برای هر نشست. گزینه‌ها با صفحهٔ [WebdriverIO Screencast](/docs/devtools/wdio/screencast) یکسان هستند. |
| `rerunCommand` | `string` | خودکار | قالب دستور برای rerun هر تست. `{{testName}}` جایگزین می‌شود. اگر حذف شود، به‌طور خودکار از argv اجراکننده استخراج می‌شود. |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` رابط کاربری DevTools را باز می‌کند. `trace` آن را رد می‌کند و به‌جایش یک artifact قابل‌حمل می‌نویسد. [Trace Mode](/docs/devtools/wdio/trace-mode) را ببینید. بر `openUi` اولویت دارد. |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | ساختار artifact مربوط به trace. فقط وقتی `mode: 'trace'` باشد اعمال می‌شود. |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | یک trace برای هر نشست / فایل spec / تست. `'test'` هرکدام را در `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip` می‌نویسد. فقط وقتی `mode: 'trace'` باشد اعمال می‌شود. [Trace Mode](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity) را ببینید. |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | کدام traceها نگه داشته شوند. همراه با `traceGranularity: 'test'` استفاده می‌شود. فقط وقتی `mode: 'trace'` باشد اعمال می‌شود. |
| `filmstrip` | `boolean` | `true` | یک screencast متراکم و پیوسته را برای پیمایش فریم‌به‌فریم در player درون trace ضبط می‌کند. فقط وقتی `mode: 'trace'` باشد اعمال می‌شود. |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | حالت trace + `traceGranularity: 'test'`. screenshot برای هر تست. وقتی یک آداپتور اجراکنندهٔ Allure فعال باشد، از طریق `allure-js-commons` به‌صورت inline به Allure (`image/png`) پیوست می‌شود. |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | حالت trace + `traceGranularity: 'test'`. ویدیوی screencast برای هر تست که بر اساس سیاست داده‌شده نگه داشته می‌شود. وقتی یک آداپتور اجراکنندهٔ Allure فعال باشد، از طریق `allure-js-commons` به‌صورت inline به Allure (`video/webm`) پیوست می‌شود. |
| `emitArtifactsManifest` | `boolean` | خودکار | manifest با نام `devtools-artifacts-<sessionId>.json` را کنار trace می‌نویسد. این فهرست عمومی‌ای است که reporterها/CI برای کشف artifactهای تولیدشده از آن استفاده می‌کنند. به‌طور پیش‌فرض خاموش است و وقتی یک runtime از `allure-js-commons` فعال باشد **خودکار فعال می‌شود**. فقط در حالت trace. |
| `captureAssertions` | `boolean` | `true` | assertionهای `node:assert` (چه موفق و چه ناموفق) را به‌عنوان ردیف‌های action در trace ضبط می‌کند. برای غیرفعال کردن روی `false` تنظیم کنید. |

```js
DevTools.configure({
  port: 3000,
  hostname: 'localhost',
  headless: false,
  openUi: true
})
```

> `port` و `hostname` فقط پیش از شروع backend اثر دارند، و backend زمانی شروع می‌شود که اولین driver ساخته شود. پس `DevTools.configure(...)` را پیش از آن فراخوانی کنید. فراخوانی بعدی این دو را همراه با یک هشدار نادیده می‌گیرد. یک rerun، صرف‌نظر از مقدار آن‌ها، backend والد خود را حفظ می‌کند.

> **برای CI**، هم `headless: true` (پنهان کردن مرورگر تست) و هم `openUi: false` (تلاش نکردن برای باز کردن پنجرهٔ داشبورد، چون محیط‌های CI نمایشگر ندارند) را تنظیم کنید. backend روی پورت پیکربندی‌شده به اجرا ادامه می‌دهد تا در صورت نیاز بتوانید بعداً رابط کاربری را باز کنید.

</TabItem>
<TabItem value="python" label="Python">

هیچ شیء گزینه‌ای وجود ندارد و لازم نیست هیچ چیز مختص devtools در کد تست شما ظاهر شود. روش پیکربندی بسته به نوع اجرا فرق می‌کند:

- در pytest، آداپتور را همان‌طور پیکربندی می‌کنید که خود pytest را.
- یک اسکریپت آرگومان‌های کلیدواژه‌ای را به `enable()` پاس می‌دهد.
- هر تنظیمی که فلگ ندارد، یک متغیر محیطی است.

| فلگ pytest | `[tool.pytest.ini_options]` | اثر |
|---|---|---|
| `--devtools` | `devtools = true` | این اجرا را ضبط می‌کند و داشبورد را باز می‌کند. |
| `--devtools-trace` | `devtools_trace = true` | این اجرا را ضبط می‌کند و به‌جای باز کردن داشبورد، یک آرشیو trace می‌نویسد. به‌طور ضمنی `--devtools` را فعال می‌کند. |
| `--devtools-trace-granularity <session\|test>` | `devtools_trace_granularity = test` | یک آرشیو برای کل اجرا (`session`، پیش‌فرض) یا یکی برای هر تست. به‌طور ضمنی `--devtools-trace` را فعال می‌کند. |
| `--devtools-trace-policy <policy>` | `devtools_trace_policy = "retain-on-failure"` | کدام آرشیوها ارزش نگه داشتن دارند. به‌طور ضمنی `--devtools-trace` را فعال می‌کند. [چند آرشیو، و کدام‌ها نگه داشته شوند](#how-many-archives-and-which-ones-to-keep) را ببینید. |

اولویت از بالا به پایین است: CLI، سپس ini، سپس متغیرهای محیطی زیر. `pytest -o devtools=false` پیش‌فرض پروژه را برای یک اجرا خاموش می‌کند، و `pytest -o devtools_trace_policy=on` همین کار را برای هر یک از تنظیمات دیگر انجام می‌دهد.

| متغیر | اثر |
|---|---|
| `DEVTOOLS_ENABLE=1` | ضبط را روشن می‌کند، وقتی هیچ فلگ یا گزینهٔ ini این کار را نکرده باشد. |
| `DEVTOOLS_PORT=<n>` | به داشبوردی متصل می‌شود که از قبل روی این پورت گوش می‌دهد. ضبط را هم فعال می‌کند. |
| `DEVTOOLS_HOST=<host>` | میزبانی که داشبورد روی آن در دسترس است (پیش‌فرض `localhost`). |
| `DEVTOOLS_TRACE=1` | به‌جای باز کردن داشبورد، یک آرشیو trace می‌نویسد. برای یک اسکریپت ساده حالت را انتخاب می‌کند. در pytest به‌تنهایی اجرا را فعال نمی‌کند. |
| `DEVTOOLS_TRACE_GRANULARITY=<session\|test>` | حالت trace: یک آرشیو برای کل اجرا، یا یکی برای هر تست. محیطی است و به‌تنهایی هرگز حالت trace را انتخاب نمی‌کند. آن را با `DEVTOOLS_TRACE=1` همراه کنید. |
| `DEVTOOLS_TRACE_POLICY=<policy>` | حالت trace: کدام آرشیوها ارزش نگه داشتن دارند. محیطی است و به‌تنهایی هرگز حالت trace را انتخاب نمی‌کند. آن را با `DEVTOOLS_TRACE=1` همراه کنید. |
| `DEVTOOLS_FILMSTRIP=0` | حالت trace: filmstrip متراکم را در آرشیو قرار نمی‌دهد. |
| `DEVTOOLS_A11Y=0` | حالت trace: درخت A11y و مستطیل‌های عنصر برای هر action را رد می‌کند. |
| `DEVTOOLS_OPEN=0` | پنجرهٔ داشبورد را باز نمی‌کند (CI). |
| `DEVTOOLS_BIDI=0` | BiDi و همراه با آن ضبط console و network را غیرفعال می‌کند. |
| `DEVTOOLS_RUN_ID=<id>` | چند فرایند را در یک اجرا به هم می‌پیوندد. |
| `DEVTOOLS_BACKEND_CMD=<cmd>` | backend را به‌جای دستور تعیین‌شده، با یک دستور صریح راه‌اندازی می‌کند. |

متغیرهای زیر را شما تنظیم نمی‌کنید و برای شما تنظیم می‌شوند. فهرست آن‌ها در اینجا آمده تا یک مقدار غیرمنتظره قابل تشخیص باشد: `DEVTOOLS_RUNNER_CWD`، `DEVTOOLS_APP_REUSE` / `DEVTOOLS_APP_HOST` / `DEVTOOLS_APP_PORT` و `DEVTOOLS_RERUN_LAUNCH_COMMAND`.

backend یک برنامهٔ Node است، بنابراین **Node.js 22.19 یا بالاتر باید در همهٔ حالت‌ها در دسترس باشد**، حتی در حالت trace که هیچ پنجرهٔ داشبوردی باز نمی‌شود. نقش backend فقط رابط کاربری نیست:

- collector صفحه توسط backend سرو می‌شود.
- کل جریان رویدادها از WebSocket آن عبور می‌کند.
- در حالت trace، همان چیزی است که آرشیو را می‌سازد.

`enable()` از ابتدا وجود Node را بررسی می‌کند و به‌جای اینکه بعداً به‌صورت timeout در spawn شکست بخورد، نام چیزی را که کم است اعلام می‌کند.

آداپتور backend را به این ترتیب برای شما پیدا یا راه‌اندازی می‌کند:

1. backendی که این اجرا را به‌عنوان rerun ایجاد کرده است
2. `DEVTOOLS_PORT` (اتصال)
3. `DEVTOOLS_BACKEND_CMD`
4. backendی که با `selenium-devtools install-backend` نصب شده است
5. `npx @wdio/devtools-backend@<pinned version>`

نسخهٔ pin‌شده برای هر انتشار آداپتور ثابت است تا backend همیشه با قرارداد ارتباطی آداپتور سازگار باشد. اگر ترجیح می‌دهید خودتان backend را مدیریت کنید، [اجرای backend به‌صورت مستقل](/docs/devtools/dashboard#running-the-backend-on-its-own) را ببینید. همچنین می‌توانید `DEVTOOLS_PORT` را به backendی که از قبل اجرا کرده‌اید اشاره دهید، که در این صورت به Node محلی نیازی نیست.

### Assertionها

دستورهای `assert` موفق و ناموفق به‌صورت ردیف‌هایی همراه با **expected** و **actual** نمایش داده می‌شوند و شکست‌ها به زبانهٔ Errors می‌رسند. `assert` در Python یک statement است، نه یک فراخوانی. بنابراین برخلاف patch کردن `node:assert` در آداپتور Node، چیزی برای wrap کردن وجود ندارد و نتیجه از اجراکننده می‌آید.

**در pytest**، مقادیر از assertion rewriter می‌آیند، بنابراین هر ردیف عملوندهای واقعی را دارد. ضبط assertionهای *موفق* به `enable_assertion_pass_hook` در pytest نیاز دارد که پلاگین خودش آن را روشن می‌کند.

یک نکته وجود دارد: pytest برای هر ماژول، *در حین بازنویسی آن*، تصمیم می‌گیرد که آن hook را منتشر کند یا نه. بنابراین ماژولی که bytecode بازنویسی‌شده‌اش پیش از نصب پلاگین کش شده باشد، همچنان فقط شکست‌ها را گزارش می‌دهد. آداپتور این موضوع را یک بار هنگام collection اعلام می‌کند و نام کشی را که باید حذف شود ذکر می‌کند. این کش **همیشه** `__pycache__` کنار تست‌های شما نیست، چون `sys.pycache_prefix` (که در Python سیستمی macOS به‌طور پیش‌فرض تنظیم شده است) همهٔ ماژول‌های بازنویسی‌شده را به یک درخت مرکزی می‌فرستد.

**در یک اسکریپت ساده** هیچ rewriterی وجود ندارد. نتایج از رویدادهای خط مفسر می‌آیند و مقادیر از frameای خوانده می‌شوند که در آستانهٔ اجرای assert است. فقط خواندن‌هایی تعیین می‌شوند که نمی‌توانند کد شما را اجرا کنند: یک literal یا یک متغیر محلی تعیین می‌شود، اما یک attribute یا یک فراخوانی نه. دلیلش این است که ارزیابی دوبارهٔ `driver.current_url` یک دستور WebDriver دیگر صادر می‌کند.

</TabItem>
</Tabs>

## حالت trace

مسیر ضبط headless است و در **هر دو زبان** در دسترس است. هیچ پنجرهٔ رابط کاربری DevTools باز نمی‌شود و اجرا یک آرشیو trace قابل‌حمل را در پوشهٔ `test-results/` می‌نویسد که شکلی مشابه artifact مربوط به trace در WebdriverIO دارد. تفاوت دو زبان فقط در میزان قابل‌تنظیم بودن artifact و در سازندهٔ آن است.

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

در پایان نشست، آداپتور خودش `trace-<sessionId>.zip` (یا یک دایرکتوری) را در `test-results/` کنار دایرکتوری تست / پیکربندی تعیین‌شده می‌نویسد.

```js
DevTools.configure({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // اختیاری؛ پیش‌فرض 'zip'
})
```

bind شدن پورت backend، پنجرهٔ رابط کاربری و گزینهٔ `screencast` همگی در حالت trace رد می‌شوند. برای مرجع کامل قابلیت‌ها (محتوای artifact، نمایشگر، تست موبایل، و زمان انتخاب `zip` در برابر `ndjson-directory`)، [صفحهٔ Trace Mode](/docs/devtools/wdio/trace-mode) را ببینید.

### artifactهای هر تست و نگهداری

با `traceGranularity: 'test'` هر تست پوشهٔ artifact مخصوص خود را دارد و `tracePolicy` تعیین می‌کند کدام‌ها نگه داشته شوند (مثلاً `retain-on-failure`). در این حالت می‌توانید این موارد را هم داشته باشید:

- `screenshot` (PNG) برای هر تست
- `video` (`.webm`) برای هر تست
- یک `filmstrip` متراکم که برای پیمایش فریم‌به‌فریم درون trace ضبط می‌شود

وقتی یک آداپتور اجراکنندهٔ `allure-js-commons` فعال باشد، traceها / screenshotها / ویدیوهای هر تست به‌صورت inline به گزارش Allure پیوست می‌شوند (و `emitArtifactsManifest` خودکار فعال می‌شود). در غیر این صورت در `test-results/` نوشته و در manifest ثبت می‌شوند.

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

هیچ شیء گزینه‌ای برای تنظیم وجود ندارد: در pytest یک فلگ، و در اسکریپت یک آرگومان کلیدواژه‌ای:

```bash
pytest --devtools-trace tests/        # به‌طور ضمنی --devtools را فعال می‌کند
DEVTOOLS_TRACE=1 python3 login.py     # اسکریپت ساده؛ معادل devtools.enable(trace=True)
```

```python title="login.py"
devtools.enable(trace=True)           # به‌جای باز کردن داشبورد، یک trace.zip می‌نویسد
```

آرشیو در `test-results/` کنار فایل تستی قرار می‌گیرد که اولین دستور ضبط‌شده از آن آمده است. این همان دایرکتوری‌ای است که ویدیوهای screencast هم در آن نوشته می‌شوند. نام آرشیو `trace-<sessionId>.zip` است، یا وقتی [یک آرشیو برای هر تست](#how-many-archives-and-which-ones-to-keep) درخواست کنید، به نام هر تست نام‌گذاری می‌شود. وقتی هیچ دستوری موقعیت منبعی از کد شما نداشته باشد، به `test-results/` زیر دایرکتوری جاری بازمی‌گردد.

**هیچ پنجرهٔ داشبوردی باز نمی‌شود.** خروجی همان artifact است. یک اجرای live تا بستن پنجره منتظر می‌ماند، پس وجود پنجره نوشتن یک فایل را به یک نشست تعاملی تبدیل می‌کرد.

با این حال backend همچنان شروع می‌شود، چون همان چیزی است که آرشیو را *می‌سازد*. تبدیل‌های trace به TypeScript نوشته شده‌اند، بنابراین یک اجرای Python به‌جای همراه داشتن نسخهٔ دومی از آن‌ها، آن‌ها را از backend درخواست می‌کند. این تنها تفاوت با حالت trace بدون backend در آداپتور Node.js است و دلیل اینکه [Node.js 22.19 یا بالاتر در همهٔ حالت‌ها لازم است](#configuration-options).

علاوه بر ردیف‌های دستور، screenshotها و selectorهای هر دستور، و console و networkی که هر دو حالت ضبط می‌کنند، آرشیو این موارد را هم دارد:

| در آرشیو | پیش‌فرض | غیرفعال‌سازی |
|---|---|---|
| سفر در زمان DOM: جریان mutationهایی که player گام‌به‌گام بازپخش می‌کند | روشن | - |
| filmstrip متراکم: فریم‌های screencast که به‌جای یک `.webm` درون trace قرار می‌گیرند | روشن | `DEVTOOLS_FILMSTRIP=0` |
| درخت A11y و overlay عنصر: کنار هر action خوانده می‌شود، با دو رفت‌وبرگشت اضافه برای هر دستور | روشن | `DEVTOOLS_A11Y=0` |

حالت trace هیچ `.webm`ای انکود نمی‌کند، بنابراین به `ffmpeg` نیازی ندارد. فریم‌ها *خودشان* filmstrip هستند.

**export زمانی درخواست می‌شود که اجرا تمام شود، نه زمانی که فرایند خارج شود.** pytest در `sessionfinish` درخواست می‌دهد و `disable()` در یک اسکریپت پیش از بستن transport، export را انجام می‌دهد. به این ترتیب CI چه پنجره‌ای درگیر بوده باشد چه نه، artifact را دریافت می‌کند.

### چند آرشیو، و کدام‌ها نگه داشته شوند

دو تنظیم این را تعیین می‌کنند و هیچ‌کدام خارج از حالت trace معنایی ندارند.

**Granularity**: اجرا چند آرشیو می‌نویسد:

| `--devtools-trace-granularity` | نتیجه |
|---|---|
| `session` (پیش‌فرض) | یک آرشیو برای کل اجرا. |
| `test` | یک آرشیو برای هر تست. هرکدام فقط دستورها، console، network، mutationهای DOM، درخت‌های a11y و فریم‌های screencast همان تست را دارد. |

در اینجا عمداً مقدار `spec` وجود ندارد. spec در این آداپتور *همان* فایل تست است، پس نام سوم فقط می‌توانست بی‌سروصدا به یکی از دو مورد بالا اشاره کند.

**Policy**: کدام‌یک از آن آرشیوها نگه داشته شوند:

| `--devtools-trace-policy` | نتیجه |
|---|---|
| `on` (پیش‌فرض) | همه چیز نگه داشته می‌شود. |
| `retain-on-failure` | فقط موارد شکست‌خورده نگه داشته می‌شوند. |
| `retain-on-first-failure`، `on-first-retry`، `on-all-retries`، `retain-on-failure-and-retries` | پذیرفته می‌شوند، اما در حال حاضر **دقیقاً مانند `retain-on-failure`** رفتار می‌کنند. |

آن چهار مورد آخر هنوز retry را در نظر نمی‌گیرند. بهتر است این را صریحاً بگوییم تا اینکه از روی آرشیوی که انتظارش را داشتید کشفش کنید. هیچ چیزی که این آداپتور منتقل می‌کند شمارهٔ تلاش را ندارد. بنابراین یک تست retry‌شده نتیجهٔ قبلی خودش را بازنویسی می‌کند و اصلاً نمی‌توان پرسشی مبتنی بر retry مطرح کرد. backend به‌جای وانمود کردن به خلاف آن، این تنزل را ثبت می‌کند. یکی از این‌ها را فقط زمانی انتخاب کنید که `retain-on-failure` را با نامی بخواهید که بعدها معنای بیشتری خواهد داشت.

این دو با هم ترکیب می‌شوند:

| Granularity | Policy | آنچه دریافت می‌کنید |
|---|---|---|
| `test` | `retain-on-failure` | فقط تست‌هایی که شکست خورده‌اند. |
| `session` | `retain-on-failure` | آرشیو کل اجرا، اگر چیزی در آن شکست خورده باشد. |
| هرکدام | `on` | همه چیز. |

هر آرشیوی که با granularity برابر `test` نگه داشته شود، به نام تست خود نام‌گذاری می‌شود: `trace-<test>-<hash>.zip`. hash از nodeid تست گرفته می‌شود تا دو مورد parametrised با عنوان مشترک نتوانند یکدیگر را بازنویسی کنند.

اجرایی که هیچ چیز را نگه ندارد، اصلاً چیزی نمی‌نویسد، و هدف هم همین است. آرشیوهایی که برایتان باقی می‌مانند همان‌هایی هستند که ارزش باز کردن دارند. یک export ردشده یعنی policy درست کار می‌کند، نه اینکه شکستی رخ داده است.

برای یک اجرا تنظیمشان کنید:

```bash
pytest --devtools-trace-granularity test --devtools-trace-policy retain-on-failure tests/
```

یا آن‌ها را commit کنید تا مشارکت‌کننده‌ای که پروژه را clone می‌کند، بدون اینکه به او گفته شود، به همان شکل ضبط کند:

```ini title="pytest.ini"
[pytest]
devtools_trace = true
devtools_trace_granularity = test
devtools_trace_policy = retain-on-failure
```

`[tool.pytest.ini_options]` در `pyproject.toml` همین کلیدها را می‌پذیرد، و `pytest -o devtools_trace_policy=on tests/` یکی از آن‌ها را بدون ویرایش فایل برای یک اجرا override می‌کند. یک نسخهٔ کاملاً توضیح‌دار، شامل همهٔ تنظیمات و همهٔ متغیرهای محیطی همراه با کاربرد هرکدام، در مخزن در [`examples/selenium-py/pytest/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium-py/pytest) قرار دارد.

یک اسکریپت ساده همین دو را به‌عنوان آرگومان کلیدواژه‌ای پاس می‌دهد:

```python title="login.py"
devtools.enable(trace_granularity='test', trace_policy='retain-on-failure')
```

**نام بردن صریح از هرکدام، حالت trace را انتخاب می‌کند.** فلگ CLI، گزینهٔ ini و آرگومان `enable()` همگی به‌طور ضمنی آن را فعال می‌کنند. دلیلش این است که policy یا granularity در حالت live معنایی ندارد، و رعایت آن بدون حالت trace بی‌سروصدا درخواست شما را نادیده می‌گرفت.

`DEVTOOLS_TRACE_POLICY` و `DEVTOOLS_TRACE_GRANULARITY` عمداً این کار را **نمی‌کنند**. یک متغیر export‌شده محیطی است و ممکن است برای اسکریپت دیگری در همان shell تنظیم شده باشد. تغییر یک اجرای live به حالت trace بر این اساس، داشبوردی را می‌گرفت که کسی نخواسته از دست بدهد. پس آن‌ها را با `DEVTOOLS_TRACE=1` همراه کنید. اجرایی که در نهایت یک تنظیم trace اکسپورت‌شده را نادیده بگیرد، یک هشدار ثبت می‌کند تا لازم نباشد خودتان متوجه آرشیوی شوید که هرگز ایجاد نشده است.

</TabItem>
</Tabs>

### مشاهدهٔ trace

هر trace با پسوند `.zip` را در player رسمی باز کنید. این همان رابط کاربری DevTools در یک حالت اختصاصی **player** است:

```bash
npx show-trace path/to/trace.zip      # در پروژه‌ای که آداپتور را نصب کرده است
pnpm show-trace path/to/trace.zip     # از monorepo مربوط به devtools
```

فایل اجرایی `show-trace` همراه با `@wdio/selenium-devtools` منتشر می‌شود، پس در هر پروژه‌ای که آن را نصب کند بدون وابستگی اضافه در دسترس است. یک پروژهٔ Python آداپتور Node.js را نصب نمی‌کند، اما همان player همراه backendی منتشر می‌شود که آداپتور از قبل برایتان دریافت می‌کند: `npx -p @wdio/devtools-backend show-trace path/to/trace.zip`.

آداپتور Selenium کنار هر screenshot، **جریان mutationهای DOM** صفحه و یک snapshot از عنصر / دسترس‌پذیری برای هر دستور را ضبط می‌کند. به همین دلیل یک trace از Selenium کل مجموعهٔ قابلیت‌های player را فعال می‌کند:

- سفر در زمان DOM
- زبانهٔ A11y و overlay انتخاب locator
- زبانهٔ Transcript همراه با Copy-for-LLM
- تودرتویی Feature ← Scenario ← Step در Cucumber
- خط زمانی قابل‌پیمایش

یک trace از Python همان جریان mutation و snapshot هر action را دارد (خواندن عنصر / a11y در آنجا فقط در حالت trace انجام می‌شود و به‌طور پیش‌فرض روشن است). تودرتویی Gherkin تنها موردی است که معادلی در pytest ندارد.

trace از یک schema قابل‌حمل NDJSON استفاده می‌کند، بنابراین همان `.zip` (یا دایرکتوری) در سایر نمایشگرهای trace سازگار هم باز می‌شود. برای راهنمای کامل، صفحهٔ **[Trace Player](/docs/devtools/trace-player)** را ببینید.

## API عمومی

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

```js
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure(opts)             // تنظیم گزینه‌های زمان اجرا (بالا را ببینید)
DevTools.startTest(name, meta?)      // علامت‌گذاری یک مرز تست نام‌دار (فقط اسکریپت‌های سادهٔ Node)
DevTools.endTest('passed'|'failed'|'skipped'|'pending')
```

در Mocha / Jest / Cucumber پلاگین خودکار به چرخهٔ عمر اجراکننده متصل می‌شود، پس نیازی به فراخوانی دستی `startTest` / `endTest` ندارید. فراخوانی آن‌ها ردیف‌های تکراری ایجاد می‌کند.

</TabItem>
<TabItem value="python" label="Python">

```python
import selenium_devtools as devtools

devtools.enable()                     # اتصال و instrument کردن؛ idempotent
devtools.disable()                    # برچیدن؛ فراخوانی دوباره بی‌خطر است
devtools.wait_for_dashboard_close()   # تا بسته شدن پنجره منتظر می‌ماند
devtools.get_capturer()               # SessionCapturer زنده، یا None
devtools.dashboard_url()              # URLای که داشبورد روی آن سرو می‌شود
devtools.export_trace()               # آرشیو trace را همین حالا می‌نویسد (فقط حالت trace)
```

`enable()` یک `host` و `port` اختیاری، به‌علاوهٔ آرگومان‌های کلیدواژه‌ای می‌پذیرد:

```python
devtools.enable(trace=True)                            # یک trace.zip می‌نویسد؛ هیچ پنجره‌ای باز نمی‌کند
devtools.enable(trace=True, filmstrip=False)           # ... بدون filmstrip متراکم
devtools.enable(trace=True, a11y=False)                # ... بدون خواندن عنصر / a11y برای هر action
devtools.enable(trace_granularity='test')              # ... یک آرشیو برای هر تست (به‌طور ضمنی trace=True)
devtools.enable(trace_policy='retain-on-failure')      # ... فقط موارد شکست‌خورده نگه داشته می‌شوند (به‌طور ضمنی trace=True)
```

جزئیات این آرگومان‌ها:

- `filmstrip` و `a11y` فقط در حالت trace اعمال می‌شوند و هرکدام به‌طور پیش‌فرض روشن هستند. `DEVTOOLS_FILMSTRIP` / `DEVTOOLS_A11Y` همین را از طریق متغیرهای محیطی تنظیم می‌کنند.
- `trace` در صورت نبود به `DEVTOOLS_TRACE` بازمی‌گردد.
- `trace_granularity` و `trace_policy` به `DEVTOOLS_TRACE_GRANULARITY` / `DEVTOOLS_TRACE_POLICY` بازمی‌گردند، و پاس دادن هرکدام به‌تنهایی حالت trace را روشن می‌کند. [چند آرشیو، و کدام‌ها نگه داشته شوند](#how-many-archives-and-which-ones-to-keep) را ببینید.

مقداری خارج از مجموعهٔ پذیرفته‌شده یک هشدار می‌دهد و به پیش‌فرض بازمی‌گردد، به‌جای اینکه بعداً به‌صورت یک فایل گمشده کشف شود.

در pytest، پلاگین همهٔ این‌ها را از `--devtools` / `--devtools-trace` (یا گزینهٔ ini متناظر، یا `DEVTOOLS_ENABLE=1`) هدایت می‌کند و مرزهای تست از hookهای خود pytest می‌آیند. هیچ معادل `startTest` / `endTest` برای فراخوانی وجود ندارد.

</TabItem>
</Tabs>

## نمونه‌ها

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

نمونه‌های کاربردی در دایرکتوری سطح‌بالای `examples/` در مخزن قرار دارند. workspace را یک بار build کنید (`pnpm install && pnpm build`) و سپس از ریشهٔ مخزن اجرا کنید. `pnpm demo:selenium` نمونهٔ پیش‌فرض (Cucumber) را اجرا می‌کند. نسخه‌های مخصوص هر اجراکننده عبارت‌اند از:

| دایرکتوری | اجراکننده | دستور |
|-----------|--------|---------|
| [`examples/selenium-js/mocha/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium-js/mocha) | Mocha | `pnpm --filter @wdio/selenium-devtools example:mocha` |
| [`examples/selenium-js/mocha/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium-js/mocha) | Mocha + allure-mocha | `pnpm --filter @wdio/selenium-devtools example:mocha:allure` |
| [`examples/selenium-js/jest/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium-js/jest) | Jest | `pnpm --filter @wdio/selenium-devtools example:jest` |
| [`examples/selenium-js/cucumber/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium-js/cucumber) | Cucumber | `pnpm demo:selenium` |
| [`examples/selenium-js/mobile/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium-js/mobile) | Mocha روی Appium | `pnpm demo:selenium:mobile` |

</TabItem>
<TabItem value="python" label="Python">

نمونه‌های Python در [`examples/selenium-py/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium-py) قرار دارند.

1. workspace را یک بار build کنید (`pnpm install && pnpm build`) تا backend وجود داشته باشد.
2. آداپتور را نصب کنید. دموها `python3` خام را اجرا می‌کنند، پس آداپتور باید در همان مفسر نصب شود: `python3 -m venv .venv && source .venv/bin/activate && pip install -e packages/selenium-devtools-py`.
3. نمونه‌ها را از ریشهٔ مخزن اجرا کنید.

| نمونه | آنچه نشان می‌دهد | دستور |
|---|---|---|
| `scripts/web_form.py` | راه‌اندازی سه‌خطی اسکریپت ساده | `pnpm demo:python` |
| `scripts/login.py` | یک اسکریپت طولانی‌تر: پیمایش، پر کردن فرم، assertionها | `pnpm demo:python:login` |
| `mobile/android/`، `mobile/ios/` | Appium: برنامهٔ Clock اندروید، یا Settings در iOS با `DEVTOOLS_MOBILE_PLATFORM=ios` (ابتدا `pip install -r examples/selenium-py/requirements-mobile.txt`) | `pnpm demo:python:mobile` |
| `pytest/` | pytest با یک class و یک تست سطح ماژول، به‌علاوهٔ یک `pytest.ini` که حالت trace، granularity و نگهداری را commit می‌کند. هر تنظیم در آن با توضیح کاربردش مستند شده است | `pnpm demo:python:pytest` |

</TabItem>
</Tabs>

## قابلیت‌ها

آداپتور Selenium در هر دو زبان همان تجربهٔ رابط کاربری DevTools را ارائه می‌دهد که WebdriverIO دارد. همهٔ قابلیت‌های زیر بدون هیچ پیکربندی مختص هر قابلیت، به‌طور خودکار ضبط می‌شوند. کافی است `DevTools.configure({})` پایه را در Node.js، یا `pytest --devtools` را در Python داشته باشید. console و network از طریق handlerهای BiDi در Selenium منتقل می‌شوند و در Node.js یک collector تزریق‌شده به‌عنوان جایگزین وجود دارد. پیوندها به مرجع کامل هر قابلیت می‌روند.

- **[Interactive Test Rerunning & Visualization](/docs/devtools/wdio/interactive-test-rerunning)**: پیش‌نمایش زندهٔ مرورگر، screenshot برای هر دستور، و اجرای دوبارهٔ تست/مجموعه با یک کلیک
- **[Preserve & Rerun (Compare)](/docs/devtools/wdio/preserve-and-rerun)**: از یک تست ناموفق snapshot بگیرید، دوباره اجرایش کنید و دو اجرا را کنار هم مقایسه کنید
- **[Multi-Framework Support](/docs/devtools/wdio/multi-framework-support)**: تشخیص خودکار Mocha، Jest، Cucumber یا یک اسکریپت ساده در Node.js، و pytest یا یک اسکریپت ساده در Python
- **[Console Logs](/docs/devtools/wdio/console-logs)**: ضبط و بررسی خروجی console مرورگر
- **[Network Logs](/docs/devtools/wdio/network-logs)**: پایش فراخوانی‌های API و فعالیت شبکه
- **[Metadata](/docs/devtools/wdio/metadata)**: capabilityهای نشست، محیط و زمان‌بندی برای هر نشست مرورگر
- **[TestLens](/docs/devtools/wdio/testlens)**: پرش از هر دستور به خط منبعی که آن را فعال کرده است
- **[Session Screencast](/docs/devtools/wdio/screencast)**: ضبط خودکار ویدیوی نشست‌های مرورگر
- **زمان‌بندی‌های پیمایش**: پس از هر دستور پیمایش، زمان‌بندی‌های load / DOM-ready / response، تعداد منابع، کوکی‌ها و اطلاعات سند به ردیف همان دستور پیوست می‌شوند
- **[Trace Mode](/docs/devtools/wdio/trace-mode)**: ضبط headless که یک `trace.zip` قابل‌حمل تولید می‌کند (بدون پنجرهٔ رابط کاربری)، در هر دو زبان. برش برای هر تست و سیاست نگهداری در هر دو زبان پشتیبانی می‌شود (`traceGranularity` / `tracePolicy` در Node.js، و `--devtools-trace-granularity` / `--devtools-trace-policy` در Python). `screenshot` / `video` برای هر تست و پیوست inline به Allure فقط در Node.js در دسترس است. [حالت trace](#trace-mode) را ببینید

در Node.js، screencast تنها قابلیتی است که گزینه‌های مخصوص خود را دارد ([گزینه‌های پیکربندی](#configuration-options) را ببینید):

```js
DevTools.configure({ screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 } })
```

در Python، خروجی خود اجرا هم به زبانهٔ Console می‌رسد: رکوردهای `logging` در Python (هم مال selenium و هم مال آداپتور) و خروجی `print()` تست. این خروجی tee می‌شود، پس ترمینال شما همچنان آن را نشان می‌دهد.

در Python، screencast به هیچ پیکربندی نیاز ندارد:

- Chrome فریم‌ها را از طریق CDP منتقل می‌کند.
- سایر مرورگرها به یک screenshot برای هر دستور بازمی‌گردند.
- انکود کردن `.webm` به `ffmpeg` در `PATH` نیاز دارد.

در حالت trace همین فریم‌ها به‌جای یک `.webm` به filmstrip متراکم آرشیو تبدیل می‌شوند، بنابراین چیزی انکود نمی‌شود و `ffmpeg` لازم نیست.

## نحوهٔ کار

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

پلاگین در زمان import، prototypeهای `Builder`، `WebDriver` و `WebElement` در `selenium-webdriver` را patch می‌کند:

- **`Builder.build()`**: پس از ساخت، driver در session capturer ثبت می‌شود و backend مربوط به DevTools در یک فرایند فرزند جداشده شروع می‌شود.
- **همهٔ متدهای عمومی `WebDriver` / `WebElement`**: با ضبط دستور wrap می‌شوند (آرگومان‌ها + نتیجه + screenshot + منبع فراخوانی).
- **`WebDriver.quit()`**: یک hook پاک‌سازی await‌شده، پیش از اجرای quit اصلی، انکود screencast، بافر WebSocket و متادیتای نهایی را flush می‌کند.

وقتی BiDi در دسترس باشد (Chrome ≥114)، لاگ‌های console، استثناهای JavaScript و رویدادهای network مستقیماً از طریق handlerهای BiDi در Selenium منتقل می‌شوند.

در غیر این صورت، پلاگین به یک اسکریپت collector تزریق‌شده در سمت مرورگر بازمی‌گردد. به این ترتیب یک نشست Safari یا Appium همچنان همهٔ درخواست‌ها را از دو منبع خود صفحه فهرست می‌کند:

- یک فراخوانی `fetch` / `XMLHttpRequest` از patch مربوط به collector عبور می‌کند و method، headerها، status و body آن را دارد.
- هر بارگذاری دیگر (سند، اسکریپت‌ها، styleها، تصاویر، فونت‌ها) از بافر Resource Timing صفحه همراه با زمان‌بندی و اندازه می‌آید، اما بدون header یا body، و در Safari بدون status. زبانهٔ Network این را روی هر ردیف از این نوع اعلام می‌کند.

یک `driver.wait()` به‌صورت همان یک دستوری که تست صادر کرده نمایش داده می‌شود، نه یک ردیف برای هر polling.

collector سمت صفحه در شروع سند از طریق BiDi (`script.addPreloadScript`) ثبت می‌شود، بنابراین هر صفحه پیش از اجرای هر اسکریپت خودش instrument می‌شود. بدون BiDi، پس از هر پیمایش یک `<script>` تزریق می‌شود.

این collector **جریان mutationهای DOM** صفحه و یک snapshot از عنصر / دسترس‌پذیری برای هر دستور را ثبت می‌کند. بنابراین یک trace به اندازهٔ کافی اطلاعات دارد تا DOM زنده را در هر گام بازسازی کند (نگاشت برای هر پیمایش). همین است که سفر در زمان DOM و زبانهٔ A11y در player را ممکن می‌کند، به‌جای یک بازپخش صرفاً مبتنی بر screenshot.

</TabItem>
<TabItem value="python" label="Python">

هیچ prototypeی برای patch کردن وجود ندارد، بنابراین آداپتور Python به‌جای آن یک متد را wrap می‌کند:

- **`WebDriver.execute()`**: گلوگاه واحدی که همهٔ دستورها از آن عبور می‌کنند. متدهای عنصر هم به آن واگذار می‌کنند (`self._parent.execute`)، پس `click`، `send_keys` و `text` بدون دست زدن به کلاس‌های عنصر، توسط همین wrapper ضبط می‌شوند.
- **راه‌اندازی نشست**: در اولین دستور واقعی، driver ثبت می‌شود، متادیتا ارسال می‌شود و BiDi، collector و screencast آماده می‌شوند.
- **`quit()`**: پیش از برچیده شدن نشست رهگیری می‌شود، تا screencast انکود شود و فریم‌های نهایی در حالی flush شوند که driver هنوز وجود دارد.

console، استثناهای JavaScript و network از طریق لایهٔ BiDi در selenium (4.44+) منتقل می‌شوند. آداپتور این لایه را با تزریق capability مربوط به `webSocketUrl` در درخواست `newSession` برای شما فعال می‌کند.

جایی که driver اصلاً BiDi ارائه نمی‌دهد (Safari، و همهٔ نشست‌هایی که Appium سرو می‌کند)، collector تزریق‌شده در صفحه به‌جای آن زبانهٔ Network را از دو منبع خود صفحه پر می‌کند:

- یک فراخوانی `fetch` / `XMLHttpRequest` از patch آن عبور می‌کند و method، headerها، status و body را دارد.
- هر بارگذاری دیگر از بافر Resource Timing سند همراه با زمان‌بندی و اندازه می‌آید، اما بدون header یا body، و در Safari بدون status.

**جریان mutationهای DOM** از همان collector سمت مرورگر در Node.js می‌آید. این collector در شروع سند از طریق BiDi ثبت می‌شود تا صفحه پیش از اجرای هر اسکریپت خودش instrument شود. با BiDi غیرفعال (`DEVTOOLS_BIDI=0`)، collector به‌جای آن با یک `<script>` برای هر سند تزریق می‌شود.

در Chrome، screencast توسط مرورگر از طریق یک websocket مستقل CDP ارسال می‌شود که از کانال دستورات نشست جداست. همین جدایی است که یک جریان واقعی فریم را امن می‌کند، چون یک نشست Selenium thread-safe نیست.

</TabItem>
</Tabs>

## موبایل (Appium)

نشست‌های Appium در حالت live و trace، در هر دو زبان ضبط می‌شوند:

- یک نشست مرورگر موبایل مانند یک نشست دسکتاپ ضبط می‌شود.
- یک برنامهٔ native، دستورها، screenshotها و داده‌های عنصر را از درخت XML پلتفرم دریافت می‌کند و DOM ندارد.

این آداپتور بر اساس capabilityهای شروع تصمیم می‌گیرد. بنابراین بخش webview یک برنامهٔ hybrid طوری ضبط می‌شود که انگار هنوز native است (فقط سرویس WebdriverIO تغییرات context را دنبال می‌کند).

آن را با `pnpm demo:selenium:mobile` (Node.js) یا `pnpm demo:python:mobile` (Python) امتحان کنید. این دستورها را از ریشهٔ یک checkout ساخته‌شده از مخزن devtools اجرا کنید (مراحل راه‌اندازی در [اجرای یک نمونه](/docs/devtools/mobile#running-an-example)).

- `DEVTOOLS_MOBILE_PLATFORM=ios` spec مربوط به iOS را اجرا می‌کند.
- `DEVTOOLS_MOBILE=web` مرورگر خود دستگاه را هدایت می‌کند.

پیش‌نیازها در [`examples/MOBILE.md`](https://github.com/webdriverio/devtools/blob/main/examples/MOBILE.md) آمده‌اند. برای مرجع کامل موبایل، [صفحهٔ Mobile Testing](/docs/devtools/mobile) را ببینید.

network یک برنامهٔ native زمانی ضبط می‌شود که نشست `appium:intercept: true` را تنظیم کند و Appium پلاگین appium-interceptor را اجرا کند. [Native app network](/docs/devtools/mobile#native-app-network) را ببینید.

## محدودیت‌ها

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| محدودیت | جزئیات |
|-----------|--------|
| rerun برای stepهای برگ در Cucumber | فیلتر `--name` در Cucumber سناریوها را هدف می‌گیرد، نه stepهای جداگانهٔ Gherkin. rerun برای هر step در داشبورد، تحت Cucumber غیرفعال است. |
| نکتهٔ حالت headless | `headless: true` گزینهٔ `--headless=old` را تزریق می‌کند. `--headless=new` در screencast فریم‌های CDP کاملاً سیاه تولید می‌کند. |
| viewport اولیه | iframe مربوط به snapshot در داشبورد، تا زمانی که اولین پیمایش کامل شود و collector سمت مرورگر viewport واقعی را گزارش دهد، به 1280×800 بازمی‌گردد. |
| workerهای موازی | هر فرایند worker در Jest/Vitest پلاگین را بارگذاری می‌کند و به‌عنوان یک اجرای جداگانه گزارش می‌دهد. بنابراین داشبورد فقط وضعیت آخرین worker را نگه می‌دارد. برای یک اجرای واحد در داشبورد، به‌صورت سریالی (`--runInBand`) اجرا کنید. |
| Safari در حالت live | Safari ورودی‌های شبیه‌سازی‌شده را فقط به پنجرهٔ جلویی خود تحویل می‌دهد و با این حال موفقیت گزارش می‌کند. بنابراین ورودی‌ای که در زمان جلو بودن پنجرهٔ دیگری صادر شود، به جایی نمی‌رسد. در Safari، پلاگین داشبورد را پشت مرورگر باز می‌کند و پیش از هر کلیک روی عنصر، ورود کلید، clear یا submit، پنجرهٔ خود نشست را به جلو می‌آورد. حالت trace هیچ پنجره‌ای باز نمی‌کند و تحت تأثیر قرار نمی‌گیرد. |

</TabItem>
<TabItem value="python" label="Python">

| محدودیت | جزئیات |
|-----------|--------|
| بدون screenshot، ویدیو یا پیوست Allure برای هر تست | **آرشیوهای trace** برای هر تست پشتیبانی می‌شوند (`--devtools-trace-granularity test`). اما گزینه‌های `screenshot` و `video` برای هر تست در آداپتور Node.js و پیوست inline آن به `allure-js-commons` معادلی در Python ندارند. خود آرشیوها همان artifactها هستند. |
| نگهداری مبتنی بر retry تنزل می‌یابد | `retain-on-first-failure`، `on-first-retry`، `on-all-retries` و `retain-on-failure-and-retries` پذیرفته می‌شوند اما دقیقاً مانند `retain-on-failure` رفتار می‌کنند. هیچ چیزی که منتقل می‌شود شمارهٔ تلاش را ندارد، بنابراین یک تست retry‌شده نتیجهٔ قبلی خودش را بازنویسی می‌کند. backend این تنزل را ثبت می‌کند. |
| Node در همهٔ حالت‌ها لازم است | backend یک برنامهٔ Node است: collector صفحه را سرو می‌کند، جریان رویدادها را منتقل می‌کند و آرشیو trace را می‌سازد. بنابراین Node.js 22.19 یا بالاتر باید حتی در حالت trace، که هیچ پنجره‌ای باز نمی‌شود، موجود باشد. آداپتور آن را برای شما پیدا یا راه‌اندازی می‌کند. |
| گزینه‌های مرورگر با خودتان است | هیچ گزینهٔ `headless`ای وجود ندارد. Chrome را مثل همیشه از طریق شیء `Options` خود selenium پیکربندی کنید. |
| ویدیو در حالت live به ffmpeg نیاز دارد | بدون `ffmpeg` در `PATH`، انکود `.webm` همراه با یک هشدار رد می‌شود، نه با خطا. حالت trace هیچ ویدیویی انکود نمی‌کند و فریم‌هایش به filmstrip می‌روند، پس هرگز به ffmpeg نیاز ندارد. |

</TabItem>
</Tabs>