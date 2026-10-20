---
id: selenium
title: أدوات المطور لـ Selenium
description: "أضف واجهة تصحيح الأخطاء DevTools إلى اختبارات Selenium WebDriver في Node.js أو Python مع أي مشغّل اختبارات، وفعّل وضع التتبّع."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

محوّل Selenium WebDriver لـ [WebdriverIO DevTools](https://github.com/webdriverio/devtools). يوفّر واجهة تصحيح الأخطاء المرئية نفسها لأي اختبار Selenium، سواء في **Node.js** أو **Python**، وبغضّ النظر عن مشغّل الاختبارات.

يعمل في Node.js مع **Mocha** و**Jest** و**Cucumber** أو مع سكربت عادي. تكتشف الإضافة المشغّل تلقائيًا وتربط حدود الاختبارات وفقًا له. ويعمل في Python مع **pytest** أو مع سكربت عادي، ولا يتطلّب أي تغيير في ملفات الاختبار عند استخدام pytest.

اختر لغتك من التبويبات أدناه، وسيبقى اختيارك ساريًا في بقية الصفحة.

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

**يتطلّب Python 3.10+ و`selenium>=4.44`.** كلاهما مُعلَن في البيانات الوصفية للحزمة، لذا يفرضهما pip عند التثبيت بدلًا من أن تكتشف تبويب Network فارغًا أثناء التشغيل. يشترك التقاط الشبكة عبر واجهة أحداث BiDi العامة التي أعاد selenium توليدها في الإصدار 4.44. أُزيل الاتصال الخاص الذي حلّت محلّه في الإصدار نفسه، ولهذا يُعدّ 4.44 الحدّ الأدنى في Python.

</TabItem>
</Tabs>

## الإعداد

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

كل كتلة أدناه **مثال كامل جاهز للنسخ واللصق** ويتضمّن استدعاء `DevTools.configure(...)`. اختر المشغّل الذي تستخدمه، وضع المقتطف في مشروعك، ثم شغّله.

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

> بديل: يمكنك الاستغناء عن الاستيراد في كل ملف واستخدام `mocha --require @wdio/selenium-devtools` لتحميل الإضافة مرة واحدة للتشغيل بأكمله.

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

شغّله (يحتاج ESM إلى العَلَم التجريبي):

```bash
NODE_OPTIONS=--experimental-vm-modules jest --config jest.config.json
```

### Cucumber

يعتمد Cucumber على تقسيم الإعداد إلى ثلاثة ملفات صغيرة: ملف لتحميل الإضافة، وملف لـ World والخطافات، وملف لتعريفات الخطوات.

`features/support/setup.js`: يحمّل الإضافة ويضبطها مرة واحدة:

```js
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})
```

`features/support/world.js`: يدير دورة حياة المشغّل (driver):

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

`cucumber.json`: اربط ملف الإعداد **أولًا** كي تعدّل الإضافة Selenium قبل تشغيل أي خطوة:

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

إذا شغّلت `node tests/google.test.js` مباشرةً، فلن يوجد مشغّل تستطيع الإضافة الارتباط به تلقائيًا. في هذه الحالة تحصل افتراضيًا على صف واحد باسم "Selenium Session" في لوحة التحكم. للحصول على حدود اختبار مُسمّاة، استدعِ `DevTools.startTest` / `endTest` حول الشيفرة التي تنفّذها:

```js
// tests/google.test.js
import { DevTools } from '@wdio/selenium-devtools'
import { Builder, By, until, Key } from 'selenium-webdriver'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 },
  headless: false
})

async function run () {
  DevTools.startTest('search Google for Selenium')   // اختياري - يسمّي صف الاختبار

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

> استخدم `startTest` / `endTest` مع سكربتات Node العادية فقط. مع Mocha / Jest / Cucumber تعرف الإضافة مسبقًا متى يبدأ كل اختبار ومتى ينتهي، واستدعاؤهما يدويًا سيُنشئ صفوفًا مكرّرة.

</TabItem>
<TabItem value="python" label="Python">

### pytest

لا تحتاج إلى إضافة أي شيء إلى ملفات الاختبار. تُكتشف الإضافة تلقائيًا، ويكفي عَلَم واحد لتفعيلها في التشغيل:

```bash
pytest --devtools tests/              # لوحة تحكم مباشرة
pytest --devtools-trace tests/        # كتابة أرشيف تتبّع بدلًا من ذلك (يتضمّن --devtools)
```

أو ثبّت هذا الاختيار في المشروع حتى لا يضطر أحد إلى تذكّر العَلَم:

```toml title="pyproject.toml"
[tool.pytest.ini_options]
devtools = true
# devtools_trace = true                          # أرشيف تتبّع بدلًا من لوحة التحكم
# devtools_trace_granularity = "test"            # ... أرشيف واحد لكل اختبار
# devtools_trace_policy = "retain-on-failure"    # ... مع الاحتفاظ بما فشل فقط
```

يقبل ملف `pytest.ini` الذي يحتوي على قسم `[pytest]` المفاتيح نفسها. يتناول قسم [كم أرشيفًا، وأيّها يُحتفظ به](#how-many-archives-and-which-ones-to-keep) إعدادَي التتبّع.

الالتقاط اختياري دائمًا، فلا ينبغي أن يغيّر تثبيت الحزمة سلوك أي مجموعة اختبارات قائمة. الفرق الوحيد هو *طريقة* تفعيله:

| طريقة التفعيل | النطاق |
|---|---|
| `--devtools` / `--devtools-trace` | هذا التشغيل |
| `devtools` / `devtools_trace` في `[tool.pytest.ini_options]` | هذا المشروع |
| `DEVTOOLS_ENABLE=1` (أو `DEVTOOLS_PORT=<n>`، الذي يرتبط أيضًا بلوحة تحكم قيد التشغيل) | هذه الصدفة (shell)، وهو مناسب لـ CI |

الأولوية من الأعلى إلى الأدنى: CLI، ثم ini، ثم البيئة. يعطّل `pytest -o devtools=false` الإعداد الافتراضي للمشروع في تشغيل واحد، ولهذا لا يوجد عَلَم `--no-devtools`. يختار `DEVTOOLS_TRACE=1` وضع التتبّع لكنه **لا** يفعّل الالتقاط وحده، فتصدير هذا المتغير لسكربتاتك الخاصة لن يؤدي إلى التقاط تشغيل pytest لم تطلبه.

في الوضع المباشر تُفتح لوحة التحكم في نافذة متصفح مخصّصة و**تبقى مفتوحة بعد انتهاء التشغيل** لتتمكّن من فحص ما حدث. أغلقها (أو اضغط `Ctrl-C`) للإنهاء. يبقى نوعان من التشغيل دون التقاط حتى مع التفعيل: `--collect-only`، لأنه لا يُنفَّذ فيه شيء، والتشغيل الذي لم يجمع أي اختبارات، لأن خطأً في كتابة المسار كان سيترك الطرفية عالقة أمام لوحة تحكم فارغة.

### سكربت Python عادي (بدون مشغّل اختبارات)

يكفي سطران حول شيفرة Selenium الحالية:

```python title="login.py"
import selenium_devtools as devtools
from selenium import webdriver

devtools.enable()                     # افتح لوحة التحكم والتقط كل أمر
# devtools.enable(trace=True)         # أو: اكتب trace.zip دون فتح أي نافذة

driver = webdriver.Chrome()
driver.get('https://the-internet.herokuapp.com/login')
driver.find_element('id', 'username').send_keys('tomsmith')
driver.quit()

devtools.wait_for_dashboard_close()   # أبقِ الواجهة مفتوحة للفحص (لا تفعل شيئًا إن لم تكن هناك نافذة مفتوحة)
devtools.disable()
```

إذا تعذّر تشغيل الخادم الخلفي أو الوصول إليه، يسجّل `enable()` تحذيرًا ويُعيد `None`. يُتخطّى الالتقاط وتستمر الاختبارات في العمل، فغياب لوحة التحكم لا يُفشل أي مجموعة اختبارات.

### التشغيل المتوازي (`pytest -n`)

**يعمل pytest-xdist دون أي إعداد إضافي.** يجب أن تتّفق جميع العمليات التي ترسل بياناتها إلى تشغيل واحد على معرّف التشغيل، وإلا سيعامل الخادم الخلفي كل اتصال على أنه تشغيل جديد ويمحو ما التقطه التشغيل السابق. مع xdist يتحقّق هذا الاتفاق: تُحمَّل الإضافة في **المتحكّم** أيضًا، ويحدّد تفعيل الالتقاط هناك المعرّف قبل أن ينشئ xdist أي عامل. والعمّال عمليات فرعية، لذا يرثون هذا المعرّف.

الحالات التي تظهر فعلًا كتشغيلات منفصلة هي: استدعاءان مستقلان لـ `pytest`، أو عامل بدأ دون متغيرات البيئة. صدّر `DEVTOOLS_RUN_ID` بنفسك لضمّ هذه العمليات في تشغيل واحد.

</TabItem>
</Tabs>

## خيارات الإعداد

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| الخيار | النوع | القيمة الافتراضية | الوصف |
|--------|------|---------|-------------|
| `port` | `number` | `3000` | منفذ خادم DevTools الخلفي. يُزاد تلقائيًا إذا كان مستخدمًا. |
| `hostname` | `string` | `'localhost'` | اسم المضيف الذي يرتبط به الخادم الخلفي. |
| `openUi` | `boolean` | `true` | يفتح واجهة DevTools تلقائيًا في نافذة Chrome جديدة. اضبطه على `false` في CI. |
| `captureScreenshots` | `boolean` | `true` | يلتقط لقطة شاشة بعد كل أمر WebDriver. |
| `headless` | `boolean` | `false` | يشغّل متصفح **الاختبار** دون واجهة (يحقن `--headless=old`). لا يتأثر به نافذة واجهة DevTools. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | تسجيل فيديو `.webm` لكل جلسة. الخيارات مطابقة لصفحة [WebdriverIO Screencast](/docs/devtools/wdio/screencast). |
| `rerunCommand` | `string` | تلقائي | قالب الأمر لإعادة تشغيل كل اختبار على حدة، ويُستبدل فيه `{{testName}}`. إذا لم يُحدَّد يُشتق تلقائيًا من argv الخاصة بالمشغّل. |
| `mode` | `'live' \| 'trace'` | `'live'` | يفتح `live` واجهة DevTools، بينما يتخطّاها `trace` ويكتب ملفًا قابلًا للنقل بدلًا منها. راجع [وضع التتبّع](/docs/devtools/wdio/trace-mode). يتجاوز قيمة `openUi`. |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | بنية ملف التتبّع. يُطبَّق فقط عند `mode: 'trace'`. |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | تتبّع واحد لكل جلسة / ملف spec / اختبار. تكتب القيمة `'test'` كل تتبّع في `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. يُطبَّق فقط عند `mode: 'trace'`. راجع [وضع التتبّع](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity). |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | يحدّد التتبّعات التي يُحتفظ بها. يُستخدم مع `traceGranularity: 'test'`. يُطبَّق فقط عند `mode: 'trace'`. |
| `filmstrip` | `boolean` | `true` | يسجّل بثًّا شاشيًّا كثيفًا ومستمرًا داخل التتبّع للتنقّل إطارًا بإطار في المشغّل. يُطبَّق فقط عند `mode: 'trace'`. |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | يتطلّب وضع التتبّع مع `traceGranularity: 'test'`. لقطة شاشة لكل اختبار تُرفق مباشرةً بتقرير Allure (`image/png`) عبر `allure-js-commons` عندما يكون محوّل مشغّل Allure نشطًا. |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | يتطلّب وضع التتبّع مع `traceGranularity: 'test'`. فيديو بث شاشي لكل اختبار يُحتفظ به وفق السياسة المحدّدة، ويُرفق مباشرةً بتقرير Allure (`video/webm`) عبر `allure-js-commons` عندما يكون محوّل مشغّل Allure نشطًا. |
| `emitArtifactsManifest` | `boolean` | تلقائي | يكتب البيان `devtools-artifacts-<sessionId>.json` بجانب التتبّع، وهو الفهرس العام الذي تعتمد عليه أدوات التقارير وCI لاكتشاف الملفات الناتجة. معطّل افتراضيًا، و**يُفعَّل تلقائيًا** عندما تكون بيئة تشغيل `allure-js-commons` نشطة. في وضع التتبّع فقط. |
| `captureAssertions` | `boolean` | `true` | يلتقط تأكيدات `node:assert` (الناجحة والفاشلة) كصفوف إجراءات في التتبّع. اضبطه على `false` لإلغاء الاشتراك. |

```js
DevTools.configure({
  port: 3000,
  hostname: 'localhost',
  headless: false,
  openUi: true
})
```

> **في CI**، اضبط `headless: true` (لإخفاء متصفح الاختبار) و`openUi: false` (لتجنّب محاولة فتح نافذة لوحة التحكم، إذ لا توجد شاشة في بيئات CI). يستمر الخادم الخلفي في العمل على المنفذ المُعدّ، فيمكنك فتح الواجهة لاحقًا عند الحاجة.

</TabItem>
<TabItem value="python" label="Python">

لا يوجد كائن خيارات، ولا يلزم أن يظهر أي شيء خاص بـ devtools في شيفرة الاختبار. مع pytest تضبط المحوّل بالطريقة نفسها التي تضبط بها pytest. أما في السكربت فتمرّر وسائط مسمّاة إلى `enable()`. وكل ما ليس له عَلَم يُضبط عبر متغير بيئة.

| عَلَم pytest | `[tool.pytest.ini_options]` | التأثير |
|---|---|---|
| `--devtools` | `devtools = true` | يلتقط هذا التشغيل ويفتح لوحة التحكم. |
| `--devtools-trace` | `devtools_trace = true` | يلتقط هذا التشغيل ويكتب أرشيف تتبّع بدلًا من فتح لوحة التحكم. يتضمّن `--devtools`. |
| `--devtools-trace-granularity <session\|test>` | `devtools_trace_granularity = test` | أرشيف واحد للتشغيل كاملًا (`session`، وهو الافتراضي) أو أرشيف لكل اختبار. يتضمّن `--devtools-trace`. |
| `--devtools-trace-policy <policy>` | `devtools_trace_policy = "retain-on-failure"` | يحدّد الأرشيفات التي تستحق الاحتفاظ بها. يتضمّن `--devtools-trace`. راجع [كم أرشيفًا، وأيّها يُحتفظ به](#how-many-archives-and-which-ones-to-keep). |

الأولوية من الأعلى إلى الأدنى: CLI، ثم ini، ثم متغيرات البيئة أدناه. يعطّل `pytest -o devtools=false` الإعداد الافتراضي للمشروع في تشغيل واحد، ويفعل `pytest -o devtools_trace_policy=on` الشيء نفسه مع أي خيار آخر.

| المتغير | التأثير |
|---|---|
| `DEVTOOLS_ENABLE=1` | يفعّل الالتقاط إذا لم يفعّله عَلَم أو خيار ini مسبقًا. |
| `DEVTOOLS_PORT=<n>` | يرتبط بلوحة تحكم تستمع بالفعل على هذا المنفذ، ويفعّل الالتقاط أيضًا. |
| `DEVTOOLS_HOST=<host>` | المضيف الذي يُوصَل منه إلى لوحة التحكم (الافتراضي `localhost`). |
| `DEVTOOLS_TRACE=1` | يكتب أرشيف تتبّع بدلًا من فتح لوحة التحكم. يحدّد الوضع في السكربت العادي، لكنه لا يفعّل الالتقاط وحده مع pytest. |
| `DEVTOOLS_TRACE_GRANULARITY=<session\|test>` | في وضع التتبّع: أرشيف واحد للتشغيل كاملًا أو أرشيف لكل اختبار. متغير محيطي، لذا لا يختار وضع التتبّع وحده. استخدمه مع `DEVTOOLS_TRACE=1`. |
| `DEVTOOLS_TRACE_POLICY=<policy>` | في وضع التتبّع: يحدّد الأرشيفات التي تستحق الاحتفاظ بها. متغير محيطي، لذا لا يختار وضع التتبّع وحده. استخدمه مع `DEVTOOLS_TRACE=1`. |
| `DEVTOOLS_FILMSTRIP=0` | في وضع التتبّع: يستبعد شريط الإطارات الكثيف من الأرشيف. |
| `DEVTOOLS_A11Y=0` | في وضع التتبّع: يتخطّى شجرة A11y ومستطيلات العناصر لكل إجراء. |
| `DEVTOOLS_OPEN=0` | لا يفتح نافذة لوحة التحكم (لـ CI). |
| `DEVTOOLS_BIDI=0` | يعطّل BiDi، ومعه التقاط وحدة التحكم والشبكة. |
| `DEVTOOLS_RUN_ID=<id>` | يضمّ عدة عمليات في تشغيل واحد. |
| `DEVTOOLS_BACKEND_CMD=<cmd>` | يشغّل الخادم الخلفي بأمر صريح بدلًا من الأمر المُحدَّد تلقائيًا. |

الخادم الخلفي تطبيق Node، لذا **يجب توفّر Node.js 22.19 أو أحدث في جميع الأوضاع**، حتى في وضع التتبّع الذي لا تُفتح فيه أي نافذة. فهو لا يقتصر على الواجهة: الخادم الخلفي هو الذي يقدّم مُجمِّع الصفحة، وعبر WebSocket الخاص به ينتقل تدفّق الأحداث كاملًا، وفي وضع التتبّع هو أيضًا الذي يبني الأرشيف. يتحقّق `enable()` من وجود Node مسبقًا ويحدّد ما ينقص، بدلًا من أن يفشل لاحقًا بانتهاء مهلة التشغيل. يعثر المحوّل على الخادم الخلفي أو يشغّله نيابةً عنك. إذا فضّلت إدارته بنفسك فراجع [تشغيل الخادم الخلفي بشكل مستقل](/docs/devtools/dashboard#running-the-backend-on-its-own)، أو وجّه `DEVTOOLS_PORT` إلى خادم يعمل لديك، وفي هذه الحالة لا تحتاج إلى Node محليًا.

### التأكيدات

تظهر عبارات `assert` الناجحة والفاشلة كصفوف تحمل القيمة **المتوقَّعة** والقيمة **الفعلية**، وتصل حالات الفشل إلى تبويب Errors. عبارة `assert` في Python جملة وليست استدعاء دالة، لذا لا يوجد ما يمكن تغليفه كما يفعل محوّل Node مع `node:assert`، وتأتي النتيجة من المشغّل.

**مع pytest**، تأتي القيم من مُعيد كتابة التأكيدات، لذا يحمل كل صف المعاملات الحقيقية. يتطلّب التقاط التأكيدات *الناجحة* الخطاف `enable_assertion_pass_hook` في pytest، وتفعّله الإضافة بنفسها. هناك تحفّظ واحد: يقرّر pytest لكل وحدة، *أثناء إعادة كتابتها*، ما إذا كان سيُصدر هذا الخطاف. لذلك فإن أي وحدة خُزّنت شيفرتها المعاد كتابتها مؤقتًا قبل تثبيت الإضافة ستواصل الإبلاغ عن حالات الفشل فقط. ينبّه المحوّل إلى ذلك مرة واحدة أثناء الجمع ويحدّد ذاكرة التخزين المؤقت التي يجب حذفها. وهي **ليست** دائمًا `__pycache__` الموجودة بجانب اختباراتك، لأن `sys.pycache_prefix` (المضبوط افتراضيًا في Python النظام على macOS) يرسل كل وحدة معاد كتابتها إلى شجرة مركزية واحدة.

**في السكربت العادي** لا يوجد مُعيد كتابة، لذا تأتي النتائج من أحداث الأسطر في المفسّر، وتُقرأ القيم من الإطار الذي يوشك على تنفيذ التأكيد. لا تُحلّ إلا القراءات التي لا يمكنها تنفيذ شيفرتك: تُحلّ القيم الحرفية والمتغيرات المحلية، ولا تُحلّ الخصائص والاستدعاءات، لأن تقييم `driver.current_url` مرة ثانية سيُصدر أمر WebDriver إضافيًا.

</TabItem>
</Tabs>

## وضع التتبّع

مسار التقاط دون واجهة، ومتاح في **كلتا اللغتين**. لا تُفتح فيه نافذة واجهة DevTools، ويكتب التشغيل أرشيف تتبّع قابلًا للنقل في مجلد `test-results/` بالبنية نفسها لملف تتبّع WebdriverIO. يقتصر الفرق بين اللغتين على مقدار ما يمكنك ضبطه في الملف، وعلى الجهة التي تبنيه.

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

عند انتهاء الجلسة يكتب المحوّل بنفسه `trace-<sessionId>.zip` (أو مجلدًا) في `test-results/` بجانب مجلد الاختبار / الإعداد المُحدَّد.

```js
DevTools.configure({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // اختياري؛ الافتراضي 'zip'
})
```

في وضع التتبّع يُتخطّى ربط منفذ الخادم الخلفي ونافذة الواجهة وخيار `screencast`. للاطلاع على المرجع الكامل للميزة (محتويات الملف، والعارض، واختبار الأجهزة المحمولة، ومتى تختار `zip` أو `ndjson-directory`)، راجع [صفحة وضع التتبّع](/docs/devtools/wdio/trace-mode).

### ملفات لكل اختبار والاحتفاظ بها

مع `traceGranularity: 'test'` يحصل كل اختبار على مجلد ملفات خاص به، ويحدّد `tracePolicy` ما يُحتفظ به (مثل `retain-on-failure`). في هذا الوضع يمكنك أيضًا التقاط `screenshot` (PNG) و`video` (`.webm`) لكل اختبار، وتفعيل `filmstrip` كثيف يُسجَّل في التتبّع للتنقّل إطارًا بإطار. عندما يكون محوّل مشغّل `allure-js-commons` نشطًا، تُرفق التتبّعات / لقطات الشاشة / الفيديوهات الخاصة بكل اختبار مباشرةً بتقرير Allure (ويُفعَّل `emitArtifactsManifest` تلقائيًا). وفي غير ذلك تُكتب في `test-results/` وتُسجَّل في البيان.

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

لا يوجد كائن خيارات تضبطه. يكفي عَلَم مع pytest، أو وسيط مسمّى في السكربت:

```bash
pytest --devtools-trace tests/        # يتضمّن --devtools
DEVTOOLS_TRACE=1 python3 login.py     # سكربت عادي؛ مماثل لـ devtools.enable(trace=True)
```

```python title="login.py"
devtools.enable(trace=True)           # اكتب trace.zip بدلًا من فتح لوحة التحكم
```

يوضع الأرشيف في `test-results/` بجانب ملف الاختبار الذي جاء منه أول أمر مُلتقَط، وهو المجلد نفسه الذي تُكتب فيه فيديوهات البث الشاشي. يُسمّى `trace-<sessionId>.zip`، أو يحمل اسم كل اختبار عندما تطلب [أرشيفًا واحدًا لكل اختبار](#how-many-archives-and-which-ones-to-keep). إذا لم يحمل أي أمر موقعًا مصدريًا من شيفرتك، يُستخدم `test-results/` في المجلد الحالي.

**لا تُفتح أي نافذة للوحة التحكم.** الملف هو الناتج، والتشغيل المباشر يبقى معلّقًا على النافذة حتى تغلقها، فوجود نافذة كان سيحوّل كتابة ملف إلى جلسة تفاعلية. مع ذلك يبدأ الخادم الخلفي، لأنه هو الذي *يبني* الأرشيف: تحويلات التتبّع مكتوبة بـ TypeScript، لذا يطلبها تشغيل Python من الخادم الخلفي بدلًا من شحن نسخة ثانية منها. هذا هو الاختلاف الوحيد عن وضع التتبّع في محوّل Node.js الذي لا يحتاج إلى خادم خلفي، وهو سبب [اشتراط Node.js 22.19 أو أحدث في جميع الأوضاع](#configuration-options).

إضافةً إلى صفوف الأوامر، ولقطات الشاشة والمحدّدات لكل أمر، ووحدة التحكم والشبكة التي يلتقطها كلا الوضعين، يحمل الأرشيف ما يلي:

| في الأرشيف | الافتراضي | إلغاء الاشتراك |
|---|---|---|
| التنقّل عبر الزمن في DOM: تدفّق التغييرات الذي يعيد المشغّل تشغيله خطوة بخطوة | مفعّل | - |
| شريط إطارات كثيف: إطارات البث الشاشي محفوظة في التتبّع بدلًا من `.webm` | مفعّل | `DEVTOOLS_FILMSTRIP=0` |
| شجرة A11y وطبقة إبراز العناصر: تُقرأ مع كل إجراء، بتكلفة رحلتي ذهاب وإياب إضافيتين لكل أمر | مفعّل | `DEVTOOLS_A11Y=0` |

لا يرمّز وضع التتبّع أي ملف `.webm`، لذا لا يحتاج إلى `ffmpeg`، فالإطارات نفسها *هي* شريط الإطارات.

**يُطلب التصدير عند انتهاء التشغيل، لا عند خروج العملية.** يطلبه pytest عند `sessionfinish`، ويصدّر `disable()` في السكربت قبل إغلاق قناة النقل، فيحصل CI على الملف سواء فُتحت نافذة أم لم تُفتح.

### كم أرشيفًا، وأيّها يُحتفظ به

يحدّد ذلك إعدادان، ولا معنى لأي منهما خارج وضع التتبّع.

**الدقّة**: عدد الأرشيفات التي يكتبها التشغيل:

| `--devtools-trace-granularity` | النتيجة |
|---|---|
| `session` (الافتراضي) | أرشيف واحد للتشغيل كاملًا. |
| `test` | أرشيف لكل اختبار، يحتوي فقط على أوامر ذلك الاختبار ووحدة التحكم والشبكة وتغييرات DOM وأشجار a11y وإطارات البث الشاشي الخاصة به. |

لا توجد هنا قيمة `spec`، وذلك عن قصد. ملف spec في هذا المحوّل *هو* ملف الاختبار نفسه، لذا لن يعني اسم ثالث سوى إحدى القيمتين أعلاه دون أن يظهر ذلك.

**السياسة**: الأرشيفات التي يُحتفظ بها:

| `--devtools-trace-policy` | النتيجة |
|---|---|
| `on` (الافتراضي) | الاحتفاظ بكل شيء. |
| `retain-on-failure` | الاحتفاظ بما فشل فقط. |
| `retain-on-first-failure`, `on-first-retry`, `on-all-retries`, `retain-on-failure-and-retries` | مقبولة، لكنها حاليًا تتصرّف **تمامًا مثل `retain-on-failure`**. |

القيم الأربع الأخيرة لا تدعم إعادة المحاولة بعد، ومن الأفضل التصريح بذلك بوضوح بدلًا من أن تكتشفه من أرشيف كنت تتوقّعه. لا يحمل أي شيء يرسله هذا المحوّل رقم المحاولة، فيستبدل الاختبار المعاد نتيجته السابقة، ولا يمكن أصلًا طرح سؤال يعتمد على إعادة المحاولة. يسجّل الخادم الخلفي هذا التراجع بدلًا من التظاهر بغير ذلك. اختر إحداها فقط إذا أردت سلوك `retain-on-failure` تحت اسم سيكتسب معنى أكبر لاحقًا.

يمكن الجمع بين الإعدادين:

| الدقّة | السياسة | ما تحصل عليه |
|---|---|---|
| `test` | `retain-on-failure` | الاختبارات التي فشلت فقط. |
| `session` | `retain-on-failure` | أرشيف التشغيل كاملًا، إذا فشل أي شيء فيه. |
| أيّهما | `on` | كل شيء. |

يحمل كل أرشيف يُحتفظ به بدقّة `test` اسم اختباره (`trace-<test>-<hash>.zip`)، ويؤخذ الـ hash من nodeid الخاص بالاختبار حتى لا تستبدل حالتان مُعامَلتان تشتركان في العنوان إحداهما الأخرى. التشغيل الذي لا يحتفظ بشيء لا يكتب شيئًا على الإطلاق، وهذا هو المقصود: الأرشيفات المتبقية هي التي تستحق الفتح، ورفض التصدير يعني أن السياسة تعمل كما ينبغي وليس أن خطأً حدث.

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

يقبل `[tool.pytest.ini_options]` في `pyproject.toml` المفاتيح نفسها، ويتجاوز `pytest -o devtools_trace_policy=on tests/` أحدها في تشغيل واحد دون تعديل الملف. توجد في المستودع نسخة مشروحة بالكامل، تتضمّن كل إعداد وكل متغير بيئة والغرض منه، في [`examples/selenium/python-test/trace-py-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/python-test/trace-py-test).

يمرّر السكربت العادي الإعدادين نفسيهما كوسائط مسمّاة:

```python title="login.py"
devtools.enable(trace_granularity='test', trace_policy='retain-on-failure')
```

**تحديد أيٍّ منهما صراحةً يختار وضع التتبّع.** عَلَم CLI وخيار ini ووسيط `enable()` جميعها تتضمّن هذا الوضع، لأن السياسة أو الدقّة لا معنى لهما في الوضع المباشر، واحترام أحدهما دون الوضع سيُسقط ما طلبته دون تنبيه. أما `DEVTOOLS_TRACE_POLICY` و`DEVTOOLS_TRACE_GRANULARITY` فهما **لا** يفعلان ذلك عن قصد: المتغير المُصدَّر محيطي، وربما ضُبط لسكربت آخر في الصدفة نفسها، وتحويل تشغيل مباشر إلى وضع التتبّع بناءً عليه سيحرمك من لوحة تحكم لم يطلب أحد إزالتها. لذا استخدمهما مع `DEVTOOLS_TRACE=1`. إذا انتهى تشغيل بتجاهل إعداد تتبّع مُصدَّر، فإنه يسجّل تحذيرًا بدلًا من أن يتركك تلاحظ بنفسك أرشيفًا لم يظهر قط.

</TabItem>
</Tabs>

### عرض التتبّع

افتح أي ملف تتبّع `.zip` في المشغّل الرسمي، وهو واجهة DevTools نفسها في وضع **player** مخصّص:

```bash
npx show-trace path/to/trace.zip      # في مشروع يثبّت المحوّل
pnpm show-trace path/to/trace.zip     # من المستودع الأحادي devtools
```

يأتي الملف التنفيذي `show-trace` مع `@wdio/selenium-devtools`، لذا يتوفّر في أي مشروع يثبّته دون أي اعتمادية إضافية. لا يثبّت مشروع Python أي محوّل Node.js، لكن المشغّل نفسه يأتي مع الخادم الخلفي الذي يجلبه المحوّل لك مسبقًا: `npx -p @wdio/devtools-backend show-trace path/to/trace.zip`.

يلتقط محوّل Selenium **تدفّق تغييرات DOM** في الصفحة، ولقطة للعناصر / إمكانية الوصول لكل أمر إلى جانب كل لقطة شاشة. لذلك يدعم تتبّع Selenium مجموعة ميزات المشغّل كاملة: التنقّل عبر الزمن في DOM، وتبويب A11y وطبقة اختيار المحدّد، وتبويب Transcript مع Copy-for-LLM، والتداخل Feature ← Scenario ← Step في Cucumber، والخط الزمني القابل للتمرير. يحمل تتبّع Python تدفّق التغييرات نفسه واللقطة نفسها لكل إجراء (قراءة العناصر / a11y متاحة هناك في وضع التتبّع فقط، ومفعّلة افتراضيًا). أما تداخل Gherkin فهو العنصر الوحيد الذي لا مقابل له في pytest.

يستخدم التتبّع مخطط NDJSON قابلًا للنقل، لذا يمكن فتح ملف `.zip` نفسه (أو المجلد) في عارضات تتبّع متوافقة أخرى أيضًا. راجع صفحة **[Trace Player](/docs/devtools/trace-player)** للاطلاع على الشرح الكامل.

## الواجهة البرمجية العامة

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

```js
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure(opts)             // ضبط خيارات وقت التشغيل (انظر أعلاه)
DevTools.startTest(name, meta?)      // تحديد حدود اختبار مُسمّى (لسكربتات Node العادية فقط)
DevTools.endTest('passed'|'failed'|'skipped'|'pending')
```

مع Mocha / Jest / Cucumber ترتبط الإضافة تلقائيًا بدورة حياة المشغّل، لذا لا تحتاج إلى استدعاء `startTest` / `endTest` يدويًا، واستدعاؤهما سيُنشئ صفوفًا مكرّرة.

</TabItem>
<TabItem value="python" label="Python">

```python
import selenium_devtools as devtools

devtools.enable()                     # الاتصال والتجهيز؛ متساوي الأثر عند التكرار
devtools.disable()                    # الإيقاف والتنظيف؛ آمن عند استدعائه مرتين
devtools.wait_for_dashboard_close()   # الانتظار حتى تُغلق النافذة
devtools.get_capturer()               # كائن SessionCapturer النشط، أو None
devtools.dashboard_url()              # عنوان URL الذي تُقدَّم عليه لوحة التحكم
```

يقبل `enable()` قيمتين اختياريتين `host` و`port`، إضافةً إلى وسائط مسمّاة:

```python
devtools.enable(trace=True)                            # اكتب trace.zip؛ ولا تفتح أي نافذة
devtools.enable(trace=True, filmstrip=False)           # ... دون شريط الإطارات الكثيف
devtools.enable(trace=True, a11y=False)                # ... دون قراءة العناصر / a11y لكل إجراء
devtools.enable(trace_granularity='test')              # ... أرشيف واحد لكل اختبار (يتضمّن trace=True)
devtools.enable(trace_policy='retain-on-failure')      # ... الاحتفاظ بما فشل فقط (يتضمّن trace=True)
```

ينطبق `filmstrip` و`a11y` على وضع التتبّع فقط، وكلاهما مفعّل افتراضيًا (ويضبط `DEVTOOLS_FILMSTRIP` / `DEVTOOLS_A11Y` الأمر نفسه من البيئة). يعود `trace` إلى قيمة `DEVTOOLS_TRACE` إذا لم يُحدَّد. ويعود `trace_granularity` و`trace_policy` إلى `DEVTOOLS_TRACE_GRANULARITY` / `DEVTOOLS_TRACE_POLICY`، وتمرير أيٍّ منهما يفعّل وضع التتبّع وحده. راجع [كم أرشيفًا، وأيّها يُحتفظ به](#how-many-archives-and-which-ones-to-keep). أي قيمة خارج المجموعة المقبولة تُصدر تحذيرًا وتُستبدل بالقيمة الافتراضية، بدلًا من أن تكتشفها لاحقًا على شكل ملف مفقود.

مع pytest تتحكّم الإضافة في كل ذلك عبر `--devtools` / `--devtools-trace` (أو خيار ini المقابل، أو `DEVTOOLS_ENABLE=1`)، وتأتي حدود الاختبارات من خطافات pytest نفسه، فلا يوجد مقابل لـ `startTest` / `endTest` تستدعيه.

</TabItem>
</Tabs>

## أمثلة

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

توجد أمثلة عاملة في المجلد `examples/` على المستوى الأعلى من المستودع. ابنِ مساحة العمل مرة واحدة (`pnpm install && pnpm build`)، ثم شغّل الأوامر من جذر المستودع. يشغّل `pnpm demo:selenium` المثال الافتراضي (Cucumber)، أما الأمثلة الخاصة بكل مشغّل فهي:

| المجلد | المشغّل | الأمر |
|-----------|--------|---------|
| [`examples/selenium/mocha-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/mocha-test) | Mocha | `pnpm --filter @wdio/selenium-devtools example:mocha` |
| [`examples/selenium/jest-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/jest-test) | Jest | `pnpm --filter @wdio/selenium-devtools example:jest` |
| [`examples/selenium/cucumber-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/cucumber-test) | Cucumber | `pnpm demo:selenium` |

</TabItem>
<TabItem value="python" label="Python">

توجد أمثلة Python في [`examples/selenium/python-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/python-test). ثبّت المحوّل وابنِ مساحة العمل مرة واحدة (`pnpm install && pnpm build`، حتى يتوفّر الخادم الخلفي)، ثم شغّل الأوامر من جذر المستودع:

| المثال | ما يوضّحه | الأمر |
|---|---|---|
| `web_form.py` | إعداد السكربت العادي بثلاثة أسطر | `pnpm demo:python` |
| `login.py` | سكربت أطول: التنقّل، وملء النماذج، والتأكيدات | `pnpm demo:python:login` |
| `trace-py-test/` | pytest مع صنف واختبار على مستوى الوحدة، إضافةً إلى ملف `pytest.ini` يثبّت وضع التتبّع والدقّة والاحتفاظ، وكل إعداد فيه مشروح بتعليق يوضّح وظيفته | `pnpm demo:python:pytest` |

</TabItem>
</Tabs>

## الميزات

يوفّر محوّل Selenium تجربة واجهة DevTools نفسها التي يوفّرها WebdriverIO، وفي كلتا اللغتين. تُلتقط كل الميزات أدناه تلقائيًا دون إعداد خاص بكل ميزة، ويكفي الإعداد الأساسي `DevTools.configure({})` في Node.js، أو `pytest --devtools` في Python. يُبثّ محتوى وحدة التحكم والشبكة عبر معالجات BiDi في Selenium، مع مُجمِّع محقون كبديل احتياطي في Node.js. تقود الروابط إلى المرجع الكامل لكل ميزة.

- **[إعادة تشغيل الاختبارات تفاعليًا وعرضها مرئيًا](/docs/devtools/wdio/interactive-test-rerunning)**: معاينات حيّة للمتصفح، ولقطات شاشة لكل أمر، وإعادة تشغيل الاختبار/المجموعة بنقرة واحدة
- **[الحفظ وإعادة التشغيل (المقارنة)](/docs/devtools/wdio/preserve-and-rerun)**: التقط لقطة لاختبار فاشل، وأعد تشغيله، وقارن التشغيلين جنبًا إلى جنب
- **[دعم أطر عمل متعددة](/docs/devtools/wdio/multi-framework-support)**: يكتشف تلقائيًا Mocha أو Jest أو Cucumber أو سكربتًا عاديًا في Node.js، وpytest أو سكربتًا عاديًا في Python
- **[سجلات وحدة التحكم](/docs/devtools/wdio/console-logs)**: التقاط مخرجات وحدة تحكم المتصفح وفحصها
- **[سجلات الشبكة](/docs/devtools/wdio/network-logs)**: مراقبة استدعاءات API ونشاط الشبكة
- **[البيانات الوصفية](/docs/devtools/wdio/metadata)**: إمكانيات الجلسة والبيئة والتوقيت لكل جلسة متصفح
- **[TestLens](/docs/devtools/wdio/testlens)**: الانتقال من أي أمر إلى سطر الشيفرة الذي استدعاه
- **[البث الشاشي للجلسة](/docs/devtools/wdio/screencast)**: تسجيل فيديو تلقائي لجلسات المتصفح
- **[وضع التتبّع](/docs/devtools/wdio/trace-mode)**: التقاط دون واجهة ينتج `trace.zip` قابلًا للنقل (دون نافذة واجهة)، في كلتا اللغتين، مع التقسيم لكل اختبار والاحتفاظ في كلتيهما (`traceGranularity` / `tracePolicy` في Node.js، و`--devtools-trace-granularity` / `--devtools-trace-policy` في Python). يبقى `screenshot` / `video` لكل اختبار والإرفاق المباشر في Allure متاحين في Node.js فقط. راجع [وضع التتبّع](#trace-mode)

في Node.js، البث الشاشي هو الميزة الوحيدة التي لها خيارات خاصة بها (راجع [خيارات الإعداد](#configuration-options)):

```js
DevTools.configure({ screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 } })
```

في Python لا يحتاج إلى أي إعداد: يبثّ Chrome الإطارات عبر CDP، وتعتمد المتصفحات الأخرى على لقطة شاشة واحدة لكل أمر، ويحتاج ترميز `.webm` إلى وجود `ffmpeg` في `PATH`. في وضع التتبّع تصبح الإطارات نفسها شريط الإطارات الكثيف في الأرشيف بدلًا من `.webm`، فلا يُرمَّز شيء ولا حاجة إلى `ffmpeg`.

## آلية العمل

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

تعدّل الإضافة نماذج (prototypes) كلٍّ من `Builder` و`WebDriver` و`WebElement` في `selenium-webdriver` لحظة الاستيراد:

- **`Builder.build()`**: بعد الإنشاء يُسجَّل المشغّل لدى ملتقط الجلسة، ويبدأ خادم DevTools الخلفي في عملية فرعية منفصلة.
- **كل دالة عامة في `WebDriver` / `WebElement`**: تُغلَّف بالتقاط الأوامر (الوسائط + النتيجة + لقطة الشاشة + مصدر الاستدعاء).
- **`WebDriver.quit()`**: خطاف تنظيف يُنتظر تنفيذه، يُنهي ترميز البث الشاشي ويفرّغ مخزن WebSocket ويرسل البيانات الوصفية النهائية قبل تنفيذ quit الأصلي.

عندما يتوفّر BiDi (Chrome ≥114)، تُبثّ سجلات وحدة التحكم واستثناءات JavaScript وأحداث الشبكة مباشرةً عبر معالجات BiDi في Selenium. وإلا تعود الإضافة إلى سكربت مُجمِّع يُحقن في جانب المتصفح.

يسجّل المُجمِّع المحقون نفسه أيضًا **تدفّق تغييرات DOM** في الصفحة، ولقطة للعناصر / إمكانية الوصول لكل أمر. بذلك يحمل التتبّع ما يكفي لإعادة بناء DOM الحي في كل خطوة (مع ربط لكل عملية تنقّل)، وهذا ما يتيح التنقّل عبر الزمن في DOM وتبويب A11y في المشغّل بدلًا من إعادة تشغيل تعتمد على لقطات الشاشة فقط.

</TabItem>
<TabItem value="python" label="Python">

لا توجد نماذج (prototypes) لتعديلها، لذا يغلّف محوّل Python دالة واحدة فقط:

- **`WebDriver.execute()`**: نقطة العبور الوحيدة التي يمرّ بها كل أمر. تفوّض دوال العناصر إليها أيضًا (`self._parent.execute`)، لذا تُلتقط `click` و`send_keys` و`text` بالمغلِّف نفسه دون المساس بأصناف العناصر.
- **إعداد الجلسة**: عند أول أمر حقيقي يُسجَّل المشغّل، وتُرسل البيانات الوصفية، ويُجهَّز BiDi والمُجمِّع والبث الشاشي.
- **`quit()`**: يُعترض قبل إنهاء الجلسة، فيُرمَّز البث الشاشي وتُفرَّغ الإطارات الأخيرة بينما لا يزال المشغّل موجودًا.

تُبثّ وحدة التحكم واستثناءات JavaScript والشبكة عبر طبقة BiDi في selenium (4.44+)، ويفعّلها المحوّل نيابةً عنك بحقن الإمكانية `webSocketUrl` في طلب `newSession`.

يأتي **تدفّق تغييرات DOM** من مُجمِّع جانب المتصفح نفسه المستخدم في Node.js، ويُسجَّل عند بداية المستند عبر BiDi حتى تُجهّز الصفحة نفسها قبل تشغيل أي من سكربتاتها. في Chrome يدفع المتصفح البث الشاشي عبر websocket خاص به لـ CDP، منفصل عن قناة أوامر الجلسة، وهذا ما يجعل تدفّق الإطارات الحقيقي آمنًا مع أن جلسة Selenium ليست آمنة للاستخدام من عدة خيوط.

</TabItem>
</Tabs>

## القيود

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| القيد | التفاصيل |
|-----------|--------|
| إعادة تشغيل الخطوات الفرعية في Cucumber | يستهدف مرشّح `--name` في Cucumber السيناريوهات، لا خطوات Gherkin المنفردة. لذلك تُعطَّل إعادة تشغيل كل خطوة على حدة في لوحة التحكم مع Cucumber. |
| تحفّظ على الوضع دون واجهة | يحقن `headless: true` القيمة `--headless=old`، لأن `--headless=new` ينتج إطارات CDP سوداء بالكامل في البث الشاشي. |
| منفذ العرض الأولي | يستخدم إطار اللقطة (iframe) في لوحة التحكم الأبعاد 1280×800 إلى أن تكتمل أول عملية تنقّل ويُبلغ مُجمِّع جانب المتصفح عن منفذ العرض الحقيقي. |

</TabItem>
<TabItem value="python" label="Python">

| القيد | التفاصيل |
|-----------|--------|
| لا توجد لقطة شاشة أو فيديو أو إرفاق في Allure لكل اختبار | **أرشيفات التتبّع** لكل اختبار مدعومة (`--devtools-trace-granularity test`)، لكن خيارَي `screenshot` و`video` لكل اختبار في محوّل Node.js والإرفاق المباشر عبر `allure-js-commons` لا مقابل لها في Python، فالأرشيفات نفسها هي الملفات الناتجة. |
| تراجع سياسات الاحتفاظ المعتمدة على إعادة المحاولة | القيم `retain-on-first-failure` و`on-first-retry` و`on-all-retries` و`retain-on-failure-and-retries` مقبولة لكنها تتصرّف تمامًا مثل `retain-on-failure`: لا يحمل أي شيء مُرسَل رقم المحاولة، فيستبدل الاختبار المعاد نتيجته السابقة. يسجّل الخادم الخلفي هذا التراجع. |
| Node مطلوب في جميع الأوضاع | الخادم الخلفي تطبيق Node، فهو يقدّم مُجمِّع الصفحة وينقل تدفّق الأحداث ويبني أرشيف التتبّع. لذلك يجب توفّر Node.js 22.19 أو أحدث حتى في وضع التتبّع الذي لا تُفتح فيه أي نافذة. يعثر المحوّل على الخادم الخلفي أو يشغّله نيابةً عنك. |
| خيارات المتصفح مسؤوليتك | لا يوجد خيار `headless`، فاضبط Chrome عبر كائن `Options` الخاص بـ selenium كما تفعل عادةً. |
| فيديو الوضع المباشر يحتاج إلى ffmpeg | إذا لم يوجد `ffmpeg` في `PATH`، يُتخطّى ترميز `.webm` مع تحذير بدلًا من خطأ. لا يرمّز وضع التتبّع أي فيديو، إذ تذهب إطاراته إلى شريط الإطارات، لذا لا يحتاج إلى ffmpeg أبدًا. |

</TabItem>
</Tabs>