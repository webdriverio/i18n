---
id: selenium
title: أدوات DevTools لـ Selenium
description: "أضف واجهة تصحيح الأخطاء DevTools إلى اختبارات Selenium WebDriver في Node.js أو Python مع أي مشغّل اختبارات، وفعّل وضع التتبّع."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

محوّل Selenium WebDriver لـ [WebdriverIO DevTools](https://github.com/webdriverio/devtools). يوفّر واجهة تصحيح الأخطاء المرئية نفسها لأي اختبار Selenium، سواء في **Node.js** أو **Python**، وبصرف النظر عن مشغّل الاختبارات.

يعمل Node.js مع **Mocha** و**Jest** و**Cucumber** أو مع سكربت عادي. تكتشف الإضافة المشغّل تلقائيًا وتربط حدود الاختبارات وفقًا له. أما Python فيعمل مع **pytest** أو مع سكربت عادي، ولا يحتاج تحت pytest إلى أي تغيير في ملفات الاختبار على الإطلاق.

اختر لغتك من علامات التبويب أدناه، وسيبقى اختيارك ساريًا في بقية الصفحة.

## التثبيت

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

**يتطلّب Python 3.10+ و`selenium>=4.44`.** كلاهما مُعلَن في بيانات الحزمة الوصفية، لذا يفرضهما pip مسبقًا بدلًا من أن تكتشف تبويب Network فارغًا أثناء التشغيل. يشترك التقاط الشبكة عبر واجهة أحداث BiDi العامة التي أعاد selenium توليدها في الإصدار 4.44. أما الاتصال الخاص الذي حلّت محلّه فقد أُزيل في الإصدار نفسه، ولهذا يُعدّ 4.44 الحدّ الأدنى في Python.

</TabItem>
</Tabs>

## الإعداد

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

كل كتلة أدناه **مثال كامل جاهز للنسخ واللصق**، ويتضمّن استدعاء `DevTools.configure(...)`. اختر المشغّل الذي تستخدمه، وضع المقتطف في مشروعك، ثم شغّله.

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

شغّله:

```bash
mocha --timeout 60000 tests/example.test.js
```

> بديل: بدلًا من الاستيراد في كل ملف، استخدم `mocha --require @wdio/selenium-devtools` لتحميل الإضافة مرة واحدة للتشغيل بأكمله.

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

شغّله (تحتاج ESM إلى العلَم التجريبي):

```bash
NODE_OPTIONS=--experimental-vm-modules jest --config jest.config.json
```

### Cucumber

يعني تقسيم Cucumber للملفات أنك تحتاج إلى ثلاثة ملفات صغيرة: واحد لتحميل الإضافة، وآخر لـ World والخطّافات، وثالث لتعريفات الخطوات.

`features/support/setup.js`: حمّل الإضافة واضبطها مرة واحدة:

```js
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})
```

`features/support/world.js`: دورة حياة المشغّل:

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

`cucumber.json`: اربط ملف الإعداد **أولًا** حتى تعدّل الإضافة Selenium قبل تشغيل أي خطوة:

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

شغّله:

```bash
cucumber-js --config cucumber.json
```

### سكربت Node عادي (بدون مشغّل اختبارات)

إذا شغّلت `node tests/google.test.js` مباشرةً، فلن يوجد مشغّل تستطيع الإضافة الارتباط به تلقائيًا. ستحصل افتراضيًا على صف واحد باسم "Selenium Session" في لوحة التحكم. للحصول على حدود اختبار مُسمّاة، استدعِ `DevTools.startTest` / `endTest` حول الكود الذي تنفّذه:

```js
// tests/google.test.js
import { DevTools } from '@wdio/selenium-devtools'
import { Builder, By, until, Key } from 'selenium-webdriver'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 },
  headless: false
})

async function run () {
  DevTools.startTest('search Google for Selenium')   // اختياري - يُسمّي صف الاختبار

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

> استخدم `startTest` / `endTest` مع سكربتات Node العادية فقط. تحت Mocha / Jest / Cucumber تعرف الإضافة مسبقًا متى يبدأ كل اختبار ومتى ينتهي، واستدعاؤها يدويًا سيُنشئ صفوفًا مكرّرة.

</TabItem>
<TabItem value="python" label="Python">

### pytest

لا يُضاف شيء إلى ملفات الاختبار. تُكتشف الإضافة تلقائيًا، ويكفي علَم واحد لتفعيلها في التشغيل:

```bash
pytest --devtools tests/              # لوحة تحكم مباشرة
pytest --devtools-trace tests/        # اكتب أرشيف تتبّع بدلًا من ذلك (يتضمّن --devtools)
```

أو ثبّت هذا الاختيار في المشروع حتى لا يضطر أحد إلى تذكّر العلَم:

```toml title="pyproject.toml"
[tool.pytest.ini_options]
devtools = true
# devtools_trace = true                          # أرشيف تتبّع بدلًا من لوحة تحكم
# devtools_trace_granularity = "test"            # ... أرشيف واحد لكل اختبار
# devtools_trace_policy = "retain-on-failure"    # ... مع الاحتفاظ بما فشل فقط
```

يقبل ملف `pytest.ini` الذي يحتوي على قسم `[pytest]` المفاتيح نفسها. يُشرح إعدادا التتبّع في قسم [كم أرشيفًا، وأيّها يُحتفظ به](#how-many-archives-and-which-ones-to-keep).

الالتقاط اختياري دائمًا، فتثبيت الحزمة يجب ألا يغيّر أبدًا سلوك مجموعة اختبارات قائمة. الفرق الوحيد هو *طريقة* موافقتك:

| طريقة التفعيل | النطاق |
|---|---|
| `--devtools` / `--devtools-trace` | هذا التشغيل |
| `devtools` / `devtools_trace` في `[tool.pytest.ini_options]` | هذا المشروع |
| `DEVTOOLS_ENABLE=1` (أو `DEVTOOLS_PORT=<n>`، الذي يتّصل أيضًا بلوحة تحكم تعمل مسبقًا) | هذه الصدفة (shell)، وهو مناسب لـ CI |

الأولوية للأعلى: سطر الأوامر، ثم ini، ثم البيئة. يُوقف `pytest -o devtools=false` الإعداد الافتراضي للمشروع لتشغيل واحد، ولهذا لا يوجد `--no-devtools`. يختار `DEVTOOLS_TRACE=1` وضع التتبّع لكنه **لا** يفعّل الالتقاط بمفرده، لذا فإن تصديره لاستخدامه في سكربتاتك الخاصة لن يلتقط أبدًا تشغيل pytest لم تطلبه.

في الوضع المباشر تُفتح لوحة التحكم في نافذة متصفح مخصّصة و**تبقى مفتوحة بعد انتهاء التشغيل** لتتمكّن من فحص ما حدث. أغلقها (أو اضغط `Ctrl-C`) للإنهاء. هناك نوعان من التشغيل لا يُلتقطان حتى عند التفعيل: `--collect-only`، إذ لا يُنفَّذ فيه شيء، والتشغيل الذي لم يجمع أي اختبار، لأن مسارًا مكتوبًا بشكل خاطئ كان سيُبقي الطرفية معلّقة على لوحة تحكم فارغة.

### سكربت Python عادي (بدون مشغّل اختبارات)

سطران حول كود Selenium الموجود لديك:

```python title="login.py"
import selenium_devtools as devtools
from selenium import webdriver

devtools.enable()                     # افتح لوحة التحكم والتقط كل أمر
# devtools.enable(trace=True)         # أو: اكتب trace.zip دون فتح أي نافذة

driver = webdriver.Chrome()
driver.get('https://the-internet.herokuapp.com/login')
driver.find_element('id', 'username').send_keys('tomsmith')
driver.quit()

devtools.wait_for_dashboard_close()   # أبقِ الواجهة مفتوحة للفحص (لا يفعل شيئًا إن لم تكن هناك نافذة مفتوحة)
devtools.disable()
```

إذا تعذّر تشغيل الواجهة الخلفية أو الوصول إليها، يسجّل `enable()` تحذيرًا ويعيد `None`. يُتخطّى الالتقاط وتستمر اختباراتك في العمل، فغياب لوحة التحكم لا يُفشل مجموعة الاختبارات أبدًا.

### التشغيل المتوازي (`pytest -n`)

**يعمل pytest-xdist دون أي إعداد إضافي.** يجب أن تتّفق كل العمليات التي ترسل تقاريرها إلى تشغيل واحد على معرّف تشغيل، وإلا ستعامل الواجهة الخلفية كل اتصال على أنه تشغيل جديد وتمسح ما التقطه التشغيل السابق. ومع xdist يتحقّق هذا الاتفاق: تُحمَّل الإضافة في **المتحكّم** أيضًا، وتفعيل الالتقاط هناك يحدّد المعرّف قبل أن يُنشئ xdist أي عامل. العمّال عمليات فرعية، فيرثون المعرّف.

ما يُعدّ فعلًا تشغيلات منفصلة هو استدعاءان مستقلّان لـ `pytest`، أو عامل بدأ دون البيئة. صدّر `DEVTOOLS_RUN_ID` بنفسك لضمّ مثل هذه العمليات في تشغيل واحد.

</TabItem>
</Tabs>

## خيارات الإعداد

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| الخيار | النوع | الافتراضي | الوصف |
|--------|------|---------|-------------|
| `port` | `number` | `3000` | منفذ خادم DevTools الخلفي. يُزاد تلقائيًا إذا كان مستخدمًا. |
| `hostname` | `string` | `'localhost'` | اسم المضيف الذي يرتبط به الخادم الخلفي. |
| `openUi` | `boolean` | `true` | فتح واجهة DevTools تلقائيًا في نافذة Chrome جديدة. اضبطه على `false` في CI. |
| `captureScreenshots` | `boolean` | `true` | التقاط لقطة شاشة بعد كل أمر WebDriver. |
| `headless` | `boolean` | `false` | تشغيل متصفح **الاختبار** دون واجهة (يحقن `--headless=old`). لا تتأثّر نافذة واجهة DevTools. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | تسجيل فيديو `.webm` لكل جلسة. تطابق الخيارات صفحة [WebdriverIO Screencast](/docs/devtools/wdio/screencast). |
| `rerunCommand` | `string` | تلقائي | قالب الأمر لإعادة تشغيل كل اختبار، ويُستبدل فيه `{{testName}}`. يُستنتج تلقائيًا من argv الخاص بالمشغّل عند حذفه. |
| `mode` | `'live' \| 'trace'` | `'live'` | يفتح `live` واجهة DevTools، أما `trace` فيتخطّاها ويكتب بدلًا منها ملفًا قابلًا للنقل. راجع [وضع التتبّع](/docs/devtools/wdio/trace-mode). يتجاوز `openUi`. |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | بنية ملف التتبّع. يُطبَّق فقط عند `mode: 'trace'`. |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | تتبّع واحد لكل جلسة / ملف مواصفات / اختبار. تكتب القيمة `'test'` كل تتبّع إلى `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. يُطبَّق فقط عند `mode: 'trace'`. راجع [وضع التتبّع](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity). |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | التتبّعات التي يُحتفظ بها. يُستخدم مع `traceGranularity: 'test'`. يُطبَّق فقط عند `mode: 'trace'`. |
| `filmstrip` | `boolean` | `true` | تسجيل بث شاشة كثيف ومستمر داخل التتبّع للتنقّل إطارًا بإطار في المشغّل. يُطبَّق فقط عند `mode: 'trace'`. |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | وضع التتبّع + `traceGranularity: 'test'`. لقطة شاشة لكل اختبار تُرفق مباشرةً في Allure (`image/png`) عبر `allure-js-commons` عند تفعيل محوّل مشغّل Allure. |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | وضع التتبّع + `traceGranularity: 'test'`. فيديو بث شاشة لكل اختبار، يُحتفظ به وفق السياسة المحدّدة ويُرفق مباشرةً في Allure (`video/webm`) عبر `allure-js-commons` عند تفعيل محوّل مشغّل Allure. |
| `emitArtifactsManifest` | `boolean` | تلقائي | كتابة البيان `devtools-artifacts-<sessionId>.json` بجانب التتبّع. هذا البيان هو الفهرس العام الذي تستهلكه أدوات التقارير وCI لاكتشاف الملفات المُنتَجة. معطّل افتراضيًا، و**يُفعَّل تلقائيًا** عند تشغيل بيئة `allure-js-commons`. في وضع التتبّع فقط. |
| `captureAssertions` | `boolean` | `true` | التقاط تأكيدات `node:assert` (الناجحة والفاشلة) كصفوف إجراءات في التتبّع. اضبطه على `false` لإلغاء ذلك. |

```js
DevTools.configure({
  port: 3000,
  hostname: 'localhost',
  headless: false,
  openUi: true
})
```

> **في CI**، اضبط `headless: true` (لإخفاء متصفح الاختبار) و`openUi: false` (حتى لا تحاول الإضافة فتح نافذة لوحة التحكم، فبيئات CI لا تملك شاشة عرض). تستمر الواجهة الخلفية في العمل على المنفذ المُعدّ، لذا يمكنك فتح الواجهة لاحقًا عند الحاجة.

</TabItem>
<TabItem value="python" label="Python">

لا يوجد كائن خيارات، ولا يلزم ظهور أي شيء خاص بـ devtools في كود الاختبار. تحت pytest تضبط المحوّل بالطريقة التي تضبط بها pytest نفسه. أما السكربت فيمرّر وسائط مُسمّاة إلى `enable()`. وكل ما ليس له علَم يُضبط عبر متغيّر بيئة.

| علَم pytest | `[tool.pytest.ini_options]` | التأثير |
|---|---|---|
| `--devtools` | `devtools = true` | التقاط هذا التشغيل وفتح لوحة التحكم. |
| `--devtools-trace` | `devtools_trace = true` | التقاط هذا التشغيل وكتابة أرشيف تتبّع بدلًا من فتح لوحة التحكم. يتضمّن `--devtools`. |
| `--devtools-trace-granularity <session\|test>` | `devtools_trace_granularity = test` | أرشيف واحد للتشغيل كله (`session`، الافتراضي) أو أرشيف لكل اختبار. يتضمّن `--devtools-trace`. |
| `--devtools-trace-policy <policy>` | `devtools_trace_policy = "retain-on-failure"` | الأرشيفات التي تستحق الاحتفاظ بها. يتضمّن `--devtools-trace`. راجع [كم أرشيفًا، وأيّها يُحتفظ به](#how-many-archives-and-which-ones-to-keep). |

الأولوية للأعلى: سطر الأوامر، ثم ini، ثم البيئة الموضّحة أدناه. يُوقف `pytest -o devtools=false` الإعداد الافتراضي للمشروع لتشغيل واحد، ويفعل `pytest -o devtools_trace_policy=on` الشيء نفسه مع أي إعداد آخر.

| المتغيّر | التأثير |
|---|---|
| `DEVTOOLS_ENABLE=1` | تفعيل الالتقاط إن لم يفعّله علَم أو خيار ini. |
| `DEVTOOLS_PORT=<n>` | الاتصال بلوحة تحكم تستمع مسبقًا على هذا المنفذ، ويفعّل الالتقاط أيضًا. |
| `DEVTOOLS_HOST=<host>` | المضيف الذي تُتاح عليه لوحة التحكم (الافتراضي `localhost`). |
| `DEVTOOLS_TRACE=1` | كتابة أرشيف تتبّع بدلًا من فتح لوحة التحكم. يحدّد الوضع للسكربت العادي، أما تحت pytest فلا يفعّل التشغيل بمفرده. |
| `DEVTOOLS_TRACE_GRANULARITY=<session\|test>` | وضع التتبّع: أرشيف واحد للتشغيل كله، أو أرشيف لكل اختبار. هو متغيّر محيطي، فلا يختار وضع التتبّع بمفرده أبدًا. استخدمه مع `DEVTOOLS_TRACE=1`. |
| `DEVTOOLS_TRACE_POLICY=<policy>` | وضع التتبّع: الأرشيفات التي تستحق الاحتفاظ بها. هو متغيّر محيطي، فلا يختار وضع التتبّع بمفرده أبدًا. استخدمه مع `DEVTOOLS_TRACE=1`. |
| `DEVTOOLS_FILMSTRIP=0` | وضع التتبّع: استبعاد شريط الإطارات الكثيف من الأرشيف. |
| `DEVTOOLS_A11Y=0` | وضع التتبّع: تخطّي شجرة A11y ومستطيلات العناصر لكل إجراء. |
| `DEVTOOLS_OPEN=0` | عدم فتح نافذة لوحة التحكم (CI). |
| `DEVTOOLS_BIDI=0` | تعطيل BiDi، ومعه التقاط وحدة التحكم والشبكة. |
| `DEVTOOLS_RUN_ID=<id>` | ضمّ عدة عمليات في تشغيل واحد. |
| `DEVTOOLS_BACKEND_CMD=<cmd>` | تشغيل الواجهة الخلفية بأمر صريح بدلًا من الأمر المُستنتَج. |

الواجهة الخلفية تطبيق Node، لذا **يجب توفّر Node.js 22.19 أو أحدث في كل الأوضاع**، حتى في وضع التتبّع الذي لا تُفتح فيه أي نافذة للوحة التحكم. السبب لا يقتصر على الواجهة: فجامع الصفحة تقدّمه الواجهة الخلفية، وتدفّق الأحداث كله يمرّ عبر WebSocket الخاص بها، وفي وضع التتبّع هي أيضًا من يبني الأرشيف. يتحقّق `enable()` من وجود Node مسبقًا ويذكر ما ينقص، بدلًا من الفشل لاحقًا بمهلة تشغيل منتهية. يعثر المحوّل على الواجهة الخلفية أو يشغّلها نيابةً عنك. راجع [تشغيل الواجهة الخلفية بشكل مستقل](/docs/devtools/dashboard#running-the-backend-on-its-own) إن كنت تفضّل إدارتها بنفسك، أو وجّه `DEVTOOLS_PORT` إلى واجهة تعمل لديك مسبقًا، وفي هذه الحالة لا تحتاج إلى Node محليًا.

### التأكيدات

تظهر عبارات `assert` الناجحة والفاشلة كصفوف تحمل القيمة **المتوقّعة** والقيمة **الفعلية**، وتصل حالات الفشل إلى تبويب Errors. في Python تُعدّ `assert` عبارة وليست استدعاء دالة، لذا لا يوجد ما يمكن تغليفه، على عكس تعديل `node:assert` في محوّل Node. تأتي النتيجة من المشغّل.

**تحت pytest** تأتي القيم من مُعيد كتابة التأكيدات، فيحمل كل صف المعاملات الحقيقية. يحتاج التقاط التأكيدات *الناجحة* إلى `enable_assertion_pass_hook` في pytest، وتفعّله الإضافة بنفسها. هناك تحفّظ واحد: يقرّر pytest لكل وحدة على حدة، *أثناء إعادة كتابتها*، ما إذا كان سيُصدر ذلك الخطّاف. لذا فإن الوحدة التي خُزّن كودها البايتي المُعاد كتابته في الذاكرة المؤقتة قبل تثبيت الإضافة ستواصل الإبلاغ عن حالات الفشل فقط. ينبّه المحوّل إلى ذلك مرة واحدة أثناء الجمع ويذكر الذاكرة المؤقتة التي يجب حذفها. وهي **ليست** دائمًا مجلد `__pycache__` المجاور لاختباراتك، لأن `sys.pycache_prefix` (المضبوط افتراضيًا في Python المدمج في نظام macOS) يرسل كل وحدة مُعاد كتابتها إلى شجرة مركزية واحدة.

**في السكربت العادي** لا يوجد مُعيد كتابة، فتأتي النتائج من أحداث الأسطر في المفسّر، وتُقرأ القيم من الإطار الذي على وشك تنفيذ التأكيد. لا يُحلّ إلا ما يمكن قراءته دون تنفيذ أي من كودك: تُحلّ القيمة الحرفية أو المتغيّر المحلي، أما الخاصية أو الاستدعاء فلا، لأن تقييم `driver.current_url` مرة ثانية سيُصدر أمر WebDriver آخر.

</TabItem>
</Tabs>

## وضع التتبّع

مسار التقاط دون واجهة، متاح في **اللغتين**. لا تُفتح أي نافذة لواجهة DevTools، ويكتب التشغيل أرشيف تتبّع قابلًا للنقل في مجلد `test-results/`، بالبنية نفسها التي يتّبعها ملف تتبّع WebdriverIO. لا تختلف اللغتان إلا في مقدار ما يمكنك ضبطه من الملف، وفي الجهة التي تبنيه.

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

عند انتهاء الجلسة يكتب المحوّل بنفسه الملف `trace-<sessionId>.zip` (أو مجلدًا) داخل `test-results/` بجانب مجلد الاختبار / الإعداد المُستنتَج.

```js
DevTools.configure({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // اختياري؛ الافتراضي 'zip'
})
```

يُتخطّى في وضع التتبّع ربط منفذ الواجهة الخلفية ونافذة الواجهة وخيار `screencast`. للاطلاع على المرجع الكامل للميزات (محتويات الملف، العارض، اختبار الأجهزة المحمولة، ومتى تختار `zip` أو `ndjson-directory`)، راجع [صفحة وضع التتبّع](/docs/devtools/wdio/trace-mode).

### ملفات لكل اختبار والاحتفاظ بها

عند `traceGranularity: 'test'` يحصل كل اختبار على مجلد ملفات خاص به، ويحدّد `tracePolicy` ما يُحتفظ به (مثل `retain-on-failure`). في هذا الوضع يمكنك أيضًا التقاط `screenshot` (PNG) و`video` (`.webm`) لكل اختبار، وتفعيل `filmstrip` كثيف يُسجَّل داخل التتبّع للتنقّل إطارًا بإطار. عند تفعيل محوّل مشغّل `allure-js-commons` تُرفق التتبّعات ولقطات الشاشة والفيديوهات الخاصة بكل اختبار مباشرةً في تقرير Allure (ويُفعَّل `emitArtifactsManifest` تلقائيًا). وفي غير ذلك تُكتب إلى `test-results/` وتُسجَّل في البيان.

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

لا يوجد كائن خيارات لضبطه. يكفي علَم تحت pytest، أو وسيط مُسمّى في السكربت:

```bash
pytest --devtools-trace tests/        # يتضمّن --devtools
DEVTOOLS_TRACE=1 python3 login.py     # سكربت عادي؛ مماثل لـ devtools.enable(trace=True)
```

```python title="login.py"
devtools.enable(trace=True)           # اكتب trace.zip بدلًا من فتح لوحة التحكم
```

يُحفظ الأرشيف في `test-results/` بجانب ملف الاختبار الذي جاء منه أول أمر مُلتقَط، وهو المجلد نفسه الذي تُكتب فيه فيديوهات بث الشاشة. يحمل الأرشيف الاسم `trace-<sessionId>.zip`، أو يُسمّى باسم كل اختبار عندما تطلب [أرشيفًا لكل اختبار](#how-many-archives-and-which-ones-to-keep). إذا لم يحمل أي أمر موقعًا مصدريًا من كودك، يُستخدم `test-results/` داخل المجلد الحالي.

**لا تُفتح أي نافذة للوحة التحكم.** الملف هو المُخرَج، والتشغيل المباشر يبقى معلّقًا على النافذة حتى تغلقها، لذا كانت النافذة ستحوّل كتابة ملف إلى جلسة تفاعلية. ومع ذلك تبدأ الواجهة الخلفية، لأنها هي التي *تبني* الأرشيف: تحويلات التتبّع مكتوبة بـ TypeScript، فيطلبها تشغيل Python من الواجهة الخلفية بدلًا من شحن نسخة ثانية منها. هذا هو الاختلاف الوحيد عن وضع التتبّع في محوّل Node.js الذي يعمل دون واجهة خلفية، وهو سبب [اشتراط Node.js 22.19 أو أحدث في كل الأوضاع](#configuration-options).

إضافةً إلى ما يلتقطه الوضعان معًا، أي صفوف الأوامر ولقطات الشاشة والمحدّدات لكل أمر ووحدة التحكم والشبكة، يحمل الأرشيف ما يلي:

| في الأرشيف | الافتراضي | إلغاء التفعيل |
|---|---|---|
| السفر عبر الزمن في DOM، أي تدفّق التعديلات الذي يعيد المشغّل تشغيله خطوة بخطوة | مفعّل | - |
| شريط إطارات كثيف، أي إطارات بث الشاشة محمولة داخل التتبّع بدلًا من ملف `.webm` | مفعّل | `DEVTOOLS_FILMSTRIP=0` |
| شجرة A11y وتراكب العناصر، تُقرأ بجانب كل إجراء مقابل رحلتين إضافيتين ذهابًا وإيابًا لكل أمر | مفعّل | `DEVTOOLS_A11Y=0` |

لا يرمّز وضع التتبّع أي ملف `.webm`، لذا لا يحتاج إلى `ffmpeg`، فالإطارات *هي* شريط الإطارات.

**يُطلب التصدير عند انتهاء التشغيل، لا عند خروج العملية.** يطلبه pytest عند `sessionfinish`، ويُصدّر `disable()` في السكربت قبل إغلاق قناة النقل. وبذلك يحصل CI على الملف سواء فُتحت نافذة أم لا.

### كم أرشيفًا، وأيّها يُحتفظ به

يحدّد ذلك إعدادان، ولا معنى لأي منهما خارج وضع التتبّع.

**الدقّة**، أي عدد الأرشيفات التي يكتبها التشغيل:

| `--devtools-trace-granularity` | النتيجة |
|---|---|
| `session` (الافتراضي) | أرشيف واحد للتشغيل كله. |
| `test` | أرشيف لكل اختبار، يحتوي فقط على أوامر ذلك الاختبار ووحدة التحكم والشبكة وتعديلات DOM وأشجار a11y وإطارات بث الشاشة الخاصة به. |

لا توجد هنا قيمة `spec` عن قصد. ملف المواصفات في هذا المحوّل *هو* ملف الاختبار نفسه، لذا فإن أي اسم ثالث لن يعني إلا إحدى القيمتين السابقتين دون أن يُصرّح بذلك.

**السياسة**، أي الأرشيفات التي يُحتفظ بها:

| `--devtools-trace-policy` | النتيجة |
|---|---|
| `on` (الافتراضي) | الاحتفاظ بكل شيء. |
| `retain-on-failure` | الاحتفاظ بما فشل فقط. |
| `retain-on-first-failure`، `on-first-retry`، `on-all-retries`، `retain-on-failure-and-retries` | مقبولة، لكنها تتصرّف حاليًا **مثل `retain-on-failure` تمامًا**. |

هذه القيم الأربع الأخيرة لا تراعي إعادة المحاولة بعد، ومن الأفضل قول ذلك صراحةً بدلًا من أن تكتشفه من أرشيف كنت تتوقّعه. لا شيء مما يرسله هذا المحوّل يحمل رقم المحاولة، لذا يكتب الاختبار المُعاد محاولته فوق نتيجته السابقة، ولا يمكن أصلًا طرح سؤال مراعاة إعادة المحاولة. تسجّل الواجهة الخلفية هذا التراجع بدلًا من التظاهر بغير ذلك. لا تختر إحداها إلا إذا أردت `retain-on-failure` تحت اسم سيعني أكثر لاحقًا.

يجتمع الإعدادان على النحو التالي:

| الدقّة | السياسة | ما تحصل عليه |
|---|---|---|
| `test` | `retain-on-failure` | الاختبارات التي فشلت فقط. |
| `session` | `retain-on-failure` | أرشيف التشغيل كله، إذا فشل أي شيء فيه. |
| أيّهما | `on` | كل شيء. |

يُسمّى كل أرشيف يُحتفظ به بدقّة `test` باسم اختباره (`trace-<test>-<hash>.zip`). تُؤخذ قيمة hash من nodeid الخاص بالاختبار، حتى لا تكتب حالتان مُعامَلتان تشتركان في العنوان نفسه فوق بعضهما. التشغيل الذي لا يحتفظ بشيء لا يكتب شيئًا على الإطلاق، وهذا هو المقصود: الأرشيفات التي تتبقّى لديك هي التي تستحق الفتح، والتصدير المرفوض يعني أن السياسة تعمل وليس أن هناك فشلًا.

اضبطهما لتشغيل واحد:

```bash
pytest --devtools-trace-granularity test --devtools-trace-policy retain-on-failure tests/
```

أو ثبّتهما في المشروع، حتى يلتقط أي مساهم يستنسخ المشروع بالطريقة نفسها دون أن يُطلب منه ذلك:

```ini title="pytest.ini"
[pytest]
devtools_trace = true
devtools_trace_granularity = test
devtools_trace_policy = retain-on-failure
```

يقبل `[tool.pytest.ini_options]` في `pyproject.toml` المفاتيح نفسها، ويتجاوز `pytest -o devtools_trace_policy=on tests/` أحدها لتشغيل واحد دون تعديل الملف. توجد نسخة مشروحة بالكامل في المستودع، تتناول كل إعداد وكل متغيّر بيئة والغرض منه، في [`examples/selenium/python-test/trace-py-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/python-test/trace-py-test).

يمرّر السكربت العادي الإعدادين نفسيهما كوسائط مُسمّاة:

```python title="login.py"
devtools.enable(trace_granularity='test', trace_policy='retain-on-failure')
```

**تحديد أي منهما صراحةً يختار وضع التتبّع.** علَم سطر الأوامر وخيار ini ووسيط `enable()` كلها تتضمّنه، لأن السياسة أو الدقّة لا معنى لهما في الوضع المباشر، واحترام إحداهما دون الوضع كان سيُسقط ما طلبته دون أي تنبيه. أما `DEVTOOLS_TRACE_POLICY` و`DEVTOOLS_TRACE_GRANULARITY` فلا يتضمّنانه عن قصد. المتغيّر المُصدَّر محيطي وقد يكون ضُبط لسكربت آخر في الصدفة نفسها، وتحويل تشغيل مباشر إلى وضع التتبّع بناءً عليه سيحرمك من لوحة تحكم لم يطلب أحد التخلّي عنها. لذا استخدمهما مع `DEVTOOLS_TRACE=1`. والتشغيل الذي ينتهي بتجاهل إعداد تتبّع مُصدَّر يسجّل تحذيرًا، بدلًا من أن يتركك تلاحظ أرشيفًا لم يظهر أبدًا.

</TabItem>
</Tabs>

### عرض التتبّع

افتح أي ملف تتبّع `.zip` في المشغّل الرسمي، وهو واجهة DevTools نفسها في وضع **player** مخصّص:

```bash
npx show-trace path/to/trace.zip      # في مشروع يثبّت المحوّل
pnpm show-trace path/to/trace.zip     # من المستودع الأحادي devtools
```

يأتي الملف التنفيذي `show-trace` مع `@wdio/selenium-devtools`، لذا فهو متاح في أي مشروع يثبّته دون أي اعتمادية إضافية. لا يثبّت مشروع Python محوّل Node.js، لكن المشغّل نفسه يأتي مع الواجهة الخلفية التي يجلبها المحوّل لك مسبقًا: `npx -p @wdio/devtools-backend show-trace path/to/trace.zip`.

يلتقط محوّل Selenium **تدفّق تعديلات DOM** للصفحة ولقطة للعناصر / إمكانية الوصول لكل أمر بجانب كل لقطة شاشة. لذا يشغّل تتبّع Selenium مجموعة ميزات المشغّل كاملة: السفر عبر الزمن في DOM، وتبويب A11y وتراكب اختيار المحدّد، وتبويب Transcript مع Copy-for-LLM، وتداخل Cucumber Feature ← Scenario ← Step، والخط الزمني القابل للتمرير. يحمل تتبّع Python تدفّق التعديلات نفسه واللقطة نفسها لكل إجراء (قراءة العناصر / a11y هناك متاحة في وضع التتبّع فقط، ومفعّلة افتراضيًا). أما تداخل Gherkin فهو العنصر الوحيد الذي لا مقابل له في pytest.

يستخدم التتبّع مخطط NDJSON قابلًا للنقل، لذا يُفتح ملف `.zip` نفسه (أو المجلد) أيضًا في عارضات تتبّع أخرى متوافقة. راجع صفحة **[Trace Player](/docs/devtools/trace-player)** للاطلاع على الشرح الكامل.

## الواجهة البرمجية العامة

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

```js
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure(opts)             // اضبط خيارات وقت التشغيل (انظر أعلاه)
DevTools.startTest(name, meta?)      // حدّد حدود اختبار مُسمّى (لسكربتات Node العادية فقط)
DevTools.endTest('passed'|'failed'|'skipped'|'pending')
```

تحت Mocha / Jest / Cucumber ترتبط الإضافة تلقائيًا بدورة حياة المشغّل، فلا تحتاج إلى `startTest` / `endTest` يدويًا، واستدعاؤهما سيُنشئ صفوفًا مكرّرة.

</TabItem>
<TabItem value="python" label="Python">

```python
import selenium_devtools as devtools

devtools.enable()                     # اتصل وفعّل الأدوات؛ متساوي القوة (idempotent)
devtools.disable()                    # أوقف التشغيل؛ آمن عند استدعائه مرتين
devtools.wait_for_dashboard_close()   # انتظر حتى تُغلق النافذة
devtools.get_capturer()               # كائن SessionCapturer النشط، أو None
devtools.dashboard_url()              # عنوان URL الذي تُقدَّم عليه لوحة التحكم
```

يقبل `enable()` معاملي `host` و`port` اختياريين، إضافةً إلى وسائط مُسمّاة:

```python
devtools.enable(trace=True)                            # اكتب trace.zip دون فتح أي نافذة
devtools.enable(trace=True, filmstrip=False)           # ... دون شريط الإطارات الكثيف
devtools.enable(trace=True, a11y=False)                # ... دون قراءة العناصر / a11y لكل إجراء
devtools.enable(trace_granularity='test')              # ... أرشيف واحد لكل اختبار (يتضمّن trace=True)
devtools.enable(trace_policy='retain-on-failure')      # ... احتفظ بما فشل فقط (يتضمّن trace=True)
```

يُطبَّق `filmstrip` و`a11y` في وضع التتبّع فقط، وكلاهما مفعّل افتراضيًا (يضبط `DEVTOOLS_FILMSTRIP` / `DEVTOOLS_A11Y` الشيء نفسه من البيئة). يرجع `trace` إلى `DEVTOOLS_TRACE` عند غيابه. ويرجع `trace_granularity` و`trace_policy` إلى `DEVTOOLS_TRACE_GRANULARITY` / `DEVTOOLS_TRACE_POLICY`، وتمرير أي منهما يفعّل وضع التتبّع بمفرده. راجع [كم أرشيفًا، وأيّها يُحتفظ به](#how-many-archives-and-which-ones-to-keep). القيمة الخارجة عن المجموعة المقبولة تُصدر تحذيرًا وترجع إلى القيمة الافتراضية، بدلًا من أن تُكتشف لاحقًا كملف مفقود.

تحت pytest تتحكّم الإضافة في كل ذلك من خلال `--devtools` / `--devtools-trace` (أو خيار ini المقابل، أو `DEVTOOLS_ENABLE=1`)، وتأتي حدود الاختبارات من خطّافات pytest نفسه. لا يوجد مقابل لـ `startTest` / `endTest` لاستدعائه.

</TabItem>
</Tabs>

## أمثلة

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

توجد أمثلة عاملة في المجلد `examples/` على المستوى الأعلى من المستودع. ابنِ مساحة العمل مرة واحدة (`pnpm install && pnpm build`)، ثم شغّل من جذر المستودع. يشغّل `pnpm demo:selenium` المثال الافتراضي (Cucumber)، أما الأمثلة الخاصة بكل مشغّل فهي:

| المجلد | المشغّل | الأمر |
|-----------|--------|---------|
| [`examples/selenium/mocha-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/mocha-test) | Mocha | `pnpm --filter @wdio/selenium-devtools example:mocha` |
| [`examples/selenium/jest-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/jest-test) | Jest | `pnpm --filter @wdio/selenium-devtools example:jest` |
| [`examples/selenium/cucumber-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/cucumber-test) | Cucumber | `pnpm demo:selenium` |

</TabItem>
<TabItem value="python" label="Python">

توجد أمثلة Python في [`examples/selenium/python-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/python-test). ثبّت المحوّل وابنِ مساحة العمل مرة واحدة (`pnpm install && pnpm build`، حتى تتوفّر الواجهة الخلفية)، ثم شغّل من جذر المستودع:

| المثال | ما يوضّحه | الأمر |
|---|---|---|
| `web_form.py` | إعداد السكربت العادي بثلاثة أسطر | `pnpm demo:python` |
| `login.py` | سكربت أطول: تنقّل، وملء نموذج، وتأكيدات | `pnpm demo:python:login` |
| `trace-py-test/` | pytest مع صنف واختبار على مستوى الوحدة، إضافةً إلى ملف `pytest.ini` يثبّت وضع التتبّع والدقّة والاحتفاظ، مع شرح لوظيفة كل إعداد فيه | `pnpm demo:python:pytest` |

</TabItem>
</Tabs>

## الميزات

يوفّر محوّل Selenium تجربة واجهة DevTools نفسها التي يوفّرها WebdriverIO، وفي اللغتين. تُلتقط كل ميزة أدناه تلقائيًا دون أي إعداد خاص بها، ويكفي `DevTools.configure({})` الأساسي في Node.js، أو `pytest --devtools` في Python. يتدفّق محتوى وحدة التحكم والشبكة عبر معالجات BiDi في Selenium، مع جامع محقون كبديل احتياطي في Node.js. تقود الروابط إلى المرجع الكامل لكل ميزة.

- **[إعادة تشغيل الاختبارات التفاعلية والتصوّر](/docs/devtools/wdio/interactive-test-rerunning)** - معاينات مباشرة للمتصفح، ولقطات شاشة لكل أمر، وإعادة تشغيل الاختبار / المجموعة بنقرة واحدة
- **[الحفظ وإعادة التشغيل (المقارنة)](/docs/devtools/wdio/preserve-and-rerun)** - التقط لقطة لاختبار فاشل، وأعد تشغيله، وقارن التشغيلين جنبًا إلى جنب
- **[دعم أطر عمل متعددة](/docs/devtools/wdio/multi-framework-support)** - يكتشف تلقائيًا Mocha أو Jest أو Cucumber أو سكربتًا عاديًا في Node.js، وpytest أو سكربتًا عاديًا في Python
- **[سجلات وحدة التحكم](/docs/devtools/wdio/console-logs)** - التقاط مخرجات وحدة تحكم المتصفح وفحصها
- **[سجلات الشبكة](/docs/devtools/wdio/network-logs)** - مراقبة استدعاءات API ونشاط الشبكة
- **[البيانات الوصفية](/docs/devtools/wdio/metadata)** - قدرات الجلسة والبيئة والتوقيت لكل جلسة متصفح
- **[TestLens](/docs/devtools/wdio/testlens)** - الانتقال من أي أمر إلى سطر المصدر الذي استدعاه
- **[بث شاشة الجلسة](/docs/devtools/wdio/screencast)** - تسجيل فيديو تلقائي لجلسات المتصفح
- **[وضع التتبّع](/docs/devtools/wdio/trace-mode)** - التقاط دون واجهة يُنتج ملف `trace.zip` قابلًا للنقل (دون نافذة واجهة)، في اللغتين، مع تقسيم لكل اختبار واحتفاظ في كلتيهما (`traceGranularity` / `tracePolicy` في Node.js، و`--devtools-trace-granularity` / `--devtools-trace-policy` في Python). يبقى `screenshot` / `video` لكل اختبار والإرفاق المباشر في Allure خاصًّا بـ Node.js، راجع [وضع التتبّع](#trace-mode)

في Node.js، بث الشاشة هو الميزة الوحيدة التي لها خيارات خاصة (راجع [خيارات الإعداد](#configuration-options)):

```js
DevTools.configure({ screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 } })
```

في Python لا يحتاج إلى أي إعداد. يبثّ Chrome الإطارات عبر CDP، وتلجأ المتصفحات الأخرى إلى لقطة شاشة واحدة لكل أمر، ويحتاج ترميز ملف `.webm` إلى وجود `ffmpeg` في `PATH`. في وضع التتبّع تصبح الإطارات نفسها شريط الإطارات الكثيف في الأرشيف بدلًا من ملف `.webm`، فلا يُرمَّز شيء ولا حاجة إلى `ffmpeg`.

## كيف يعمل

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

تعدّل الإضافة النماذج الأولية (prototypes) لكل من `Builder` و`WebDriver` و`WebElement` في `selenium-webdriver` عند الاستيراد:

- **`Builder.build()`** - بعد الإنشاء، يُسجَّل المشغّل لدى ملتقط الجلسة وتبدأ الواجهة الخلفية لـ DevTools في عملية فرعية منفصلة.
- **كل دالة عامة في `WebDriver` / `WebElement`** - تُغلَّف بالتقاط الأوامر (الوسائط + النتيجة + لقطة الشاشة + مصدر الاستدعاء).
- **`WebDriver.quit()`** - يُفرغ خطّاف تنظيف يُنتظر اكتماله ترميزَ بث الشاشة ومخزنَ WebSocket المؤقت والبياناتِ الوصفية النهائية قبل تنفيذ quit الأصلي.

عند توفّر BiDi (Chrome ≥114)، تتدفّق سجلات وحدة التحكم واستثناءات JavaScript وأحداث الشبكة مباشرةً عبر معالجات BiDi في Selenium. وإلا تلجأ الإضافة إلى سكربت جامع محقون في جهة المتصفح.

يسجّل الجامع المحقون نفسه أيضًا **تدفّق تعديلات DOM** للصفحة ولقطة للعناصر / إمكانية الوصول لكل أمر. وبذلك يحمل التتبّع ما يكفي لإعادة بناء DOM الحي في كل خطوة (مع ربط لكل عملية تنقّل)، وهذا ما يشغّل السفر عبر الزمن في DOM وتبويب A11y في المشغّل بدلًا من إعادة تشغيل تعتمد على لقطات الشاشة فقط.

</TabItem>
<TabItem value="python" label="Python">

لا توجد نماذج أولية لتعديلها، لذا يغلّف محوّل Python دالة واحدة بدلًا من ذلك:

- **`WebDriver.execute()`** - نقطة العبور الوحيدة التي يمرّ بها كل أمر. تفوّض دوال العناصر إليها أيضًا (`self._parent.execute`)، لذا تُلتقط `click` و`send_keys` و`text` بالغلاف نفسه دون المساس بأصناف العناصر.
- **إعداد الجلسة** - عند أول أمر حقيقي يُسجَّل المشغّل، وتُرسل البيانات الوصفية، ويُجهَّز كل من BiDi والجامع وبث الشاشة.
- **`quit()`** - يُعترض قبل إنهاء الجلسة، فيُرمَّز بث الشاشة وتُفرغ الإطارات النهائية بينما لا يزال المشغّل موجودًا.

تتدفّق وحدة التحكم واستثناءات JavaScript والشبكة عبر طبقة BiDi في selenium (4.44+)، ويفعّلها المحوّل لك بحقن القدرة `webSocketUrl` في طلب `newSession`.

يأتي **تدفّق تعديلات DOM** من جامع جهة المتصفح نفسه المستخدم في Node.js، ويُسجَّل عند بدء المستند عبر BiDi حتى تُجهّز الصفحة نفسها قبل تشغيل أي من سكربتاتها. في Chrome يدفع المتصفح بث الشاشة عبر websocket خاص بـ CDP، منفصل عن قناة أوامر الجلسة. هذا الفصل هو ما يجعل تدفّق إطارات حقيقيًا آمنًا رغم أن جلسة Selenium ليست آمنة للاستخدام من عدة خيوط.

</TabItem>
</Tabs>

## القيود

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| القيد | التفاصيل |
|-----------|--------|
| إعادة تشغيل خطوات Cucumber الطرفية | يستهدف مرشّح `--name` في Cucumber السيناريوهات، لا خطوات Gherkin الفردية. لذا تُعطَّل إعادة التشغيل لكل خطوة في لوحة التحكم تحت Cucumber. |
| تحفّظ وضع headless | يحقن `headless: true` القيمة `--headless=old`، لأن `--headless=new` ينتج إطارات CDP سوداء بالكامل في بث الشاشة. |
| منفذ العرض الأولي | يلجأ إطار iframe الخاص باللقطة في لوحة التحكم إلى 1280×800 حتى يكتمل أول تنقّل ويُبلغ جامع جهة المتصفح عن منفذ العرض الحقيقي. |

</TabItem>
<TabItem value="python" label="Python">

| القيد | التفاصيل |
|-----------|--------|
| لا لقطة شاشة أو فيديو أو إرفاق في Allure لكل اختبار | **أرشيفات التتبّع** لكل اختبار مدعومة (`--devtools-trace-granularity test`)، لكن خيارَي `screenshot` و`video` لكل اختبار في محوّل Node.js وإرفاقه المباشر عبر `allure-js-commons` ليس لها مقابل في Python، فالأرشيفات هي الملفات المُنتَجة. |
| تراجع الاحتفاظ المراعي لإعادة المحاولة | تُقبل `retain-on-first-failure` و`on-first-retry` و`on-all-retries` و`retain-on-failure-and-retries` لكنها تتصرّف مثل `retain-on-failure` تمامًا. لا شيء مما يُرسل يحمل رقم المحاولة، لذا يكتب الاختبار المُعاد محاولته فوق نتيجته السابقة. تسجّل الواجهة الخلفية هذا التراجع. |
| Node مطلوب في كل الأوضاع | الواجهة الخلفية تطبيق Node، فهي تقدّم جامع الصفحة وتنقل تدفّق الأحداث وتبني أرشيف التتبّع. لذا يجب وجود Node.js 22.19 أو أحدث حتى في وضع التتبّع الذي لا تُفتح فيه أي نافذة. يعثر المحوّل عليها أو يشغّلها لك. |
| خيارات المتصفح مسؤوليتك | لا يوجد خيار `headless`. اضبط Chrome عبر كائن `Options` الخاص بـ selenium كما تفعل عادةً. |
| فيديو الوضع المباشر يحتاج إلى ffmpeg | دون وجود `ffmpeg` في `PATH` يُتخطّى ترميز `.webm` مع تحذير بدلًا من خطأ. لا يرمّز وضع التتبّع أي فيديو، إذ تذهب إطاراته إلى شريط الإطارات، فلا يحتاج إلى ffmpeg أبدًا. |

</TabItem>
</Tabs>