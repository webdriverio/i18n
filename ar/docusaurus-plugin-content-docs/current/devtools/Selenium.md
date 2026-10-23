---
id: selenium
title: Selenium DevTools
description: "أضف واجهة تصحيح الأخطاء DevTools إلى اختبارات Selenium WebDriver في Node.js أو Python مع أي مشغّل اختبارات، وفعّل وضع التتبّع."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

محوّل Selenium WebDriver لـ [WebdriverIO DevTools](https://github.com/webdriverio/devtools)، يوفّر واجهة تصحيح الأخطاء المرئية نفسها لأي اختبار Selenium، في **Node.js** أو **Python**، بغض النظر عن مشغّل الاختبارات.

يعمل Node.js مع **Mocha** أو **Jest** أو **Cucumber** أو سكربت عادي، إذ تكتشف الإضافة المشغّل تلقائيًا وتربط حدود الاختبارات وفقًا له. أما Python فيعمل مع **pytest** أو سكربت عادي، ولا يحتاج تحت pytest إلى أي تغيير في ملفات اختباراتك على الإطلاق.

اختر لغتك من علامات التبويب أدناه، وسيظل اختيارك ساريًا في بقية الصفحة.

## التثبيت

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

```bash
npm install @wdio/selenium-devtools
```

يتطلب `selenium-webdriver` بالإصدار 4.8 أو أحدث. ويحتاج ترميز تسجيل الشاشة بصيغة `.webm` إلى وجود `ffmpeg` في `PATH`.

</TabItem>
<TabItem value="python" label="Python">

```bash
pip install selenium-devtools-py
```

**يتطلب Python 3.10 أو أحدث و`selenium>=4.44`.** كلاهما مُعلن في بيانات الحزمة الوصفية، لذا يفرضهما pip بدلًا من أن تكتشف تبويب Network فارغًا أثناء التشغيل. يشترك التقاط الشبكة عبر واجهة أحداث BiDi العامة التي أعاد selenium توليدها في الإصدار 4.44، أما الاتصال الخاص الذي حلّت محله فقد أُزيل في الإصدار نفسه، والإصدار 4.44 هو ما يحدد الحد الأدنى لـ Python.

ثم ثبّت الواجهة الخلفية، مرة واحدة:

```bash
selenium-devtools install-backend
```

لا يستطيع pip القيام بذلك نيابةً عنك: فحزمة wheel لا تملك خطاف تثبيت، والواجهة الخلفية حزمة Node. إن تخطيت هذه الخطوة فستظل عمليات التشغيل تعمل، مع الرجوع إلى جلب `@wdio/devtools-backend` عبر `npx` عند أول استخدام. يكلّف هذا البديل رحلة ذهاب وإياب إلى السجل في كل تشغيل، ويفشل في منتصف الجلسة إذا رفض وكيل (proxy) الحزمة. يخبرك `selenium-devtools backend-path` ما إذا كانت الواجهة الخلفية مثبّتة، ويعيد `install-backend --force` تثبيت نسخة معطوبة، ويزيلها `uninstall-backend`. يتم التثبيت تحت `$XDG_CACHE_HOME` (الافتراضي `~/.cache`).

وجود `chromedriver` في `PATH` لا يطابق إصدار Chrome لديك يُفشل كل تشغيل لـ Selenium؛ أما إن لم يكن هناك واحد في `PATH`، فإن Selenium Manager يحدد إصدارًا مطابقًا.

</TabItem>
</Tabs>

## الإعداد

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

الحد الأدنى هو استيراد واحد، `import '@wdio/selenium-devtools'`، في ملف الاختبار. لا حاجة إلى أي شيء آخر تحت Mocha وJest وCucumber؛ فاستدعاء `DevTools.configure(...)` اختياري ولا يغيّر إلا القيم الافتراضية.

كل كتلة أدناه هي **مثال كامل جاهز للنسخ واللصق** يتضمن استدعاء `DevTools.configure(...)`. اختر المشغّل الذي تستخدمه، وضع المقتطف في مشروعك، ثم شغّله.

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

> بديل: تخطَّ الاستيراد في كل ملف واستخدم `mocha --require @wdio/selenium-devtools` لتحميل الإضافة مرة واحدة للتشغيل بأكمله. ستظل بحاجة إلى استدعاء `DevTools.configure(...)` لمرة واحدة في مكان ما إن أردت خيارات غير افتراضية.

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

شغّله (يحتاج ESM إلى العلَم التجريبي):

```bash
NODE_OPTIONS=--experimental-vm-modules jest --config jest.config.json
```

### Cucumber

بنية Cucumber المقسّمة تعني ثلاثة ملفات صغيرة: واحد لتحميل الإضافة، وواحد لـ World/الخطافات، وواحد لتعريفات الخطوات.

`features/support/setup.js` - تحميل الإضافة وتهيئتها مرة واحدة:

```js
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})
```

`features/support/world.js` - دورة حياة المشغّل (driver):

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

`cucumber.json` - اربط ملف الإعداد **أولًا** حتى تعدّل الإضافة Selenium قبل تشغيل أي خطوة:

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

إذا شغّلت `node tests/google.test.js` مباشرةً فلا يوجد مشغّل يمكن للإضافة الارتباط به تلقائيًا. افتراضيًا تحصل على صف واحد باسم "Selenium Session" في لوحة التحكم. للحصول على حدّ اختبار مُسمّى، استدعِ `DevTools.startTest` / `endTest` حول عملك:

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

> استخدم `startTest` / `endTest` لسكربتات Node العادية فقط. تحت Mocha / Jest / Cucumber تعرف الإضافة بالفعل متى يبدأ كل اختبار وينتهي، واستدعاؤهما يدويًا سيُنشئ صفوفًا مكررة.

</TabItem>
<TabItem value="python" label="Python">

### pytest

لا يُضاف شيء إلى ملفات اختباراتك، إذ تُكتشف الإضافة تلقائيًا، وعلَم واحد يفعّلها للتشغيل:

```bash
pytest --devtools tests/              # لوحة تحكم حيّة
pytest --devtools-trace tests/        # كتابة أرشيف تتبّع بدلًا من ذلك (يتضمن --devtools)
```

أو ثبّت الاختيار في المشروع، حتى لا يضطر أحد إلى تذكّر العلَم:

```toml title="pyproject.toml"
[tool.pytest.ini_options]
devtools = true
# devtools_trace = true                          # أرشيف تتبّع بدلًا من لوحة تحكم
# devtools_trace_granularity = "test"            # ... أرشيف واحد لكل اختبار
# devtools_trace_policy = "retain-on-failure"    # ... مع الاحتفاظ بما فشل فقط
```

يقبل ملف `pytest.ini` الذي يحتوي على قسم `[pytest]` المفاتيح نفسها. إعدادا التتبّع مشروحان تحت [كم عدد الأرشيفات، وأيّها يُحتفظ به](#how-many-archives-and-which-ones-to-keep).

الالتقاط اختياري دائمًا؛ فتثبيت الحزمة يجب ألا يغيّر أبدًا سلوك مجموعة اختبارات قائمة. كل ما يختلف هو *كيفية* موافقتك:

| طريقة التفعيل | النطاق |
|---|---|
| `--devtools` / `--devtools-trace` | هذا التشغيل |
| `devtools` / `devtools_trace` في `[tool.pytest.ini_options]` | هذا المشروع |
| `DEVTOOLS_ENABLE=1` (أو `DEVTOOLS_PORT=<n>`، الذي يرتبط أيضًا بلوحة تحكم تعمل مسبقًا) | هذه الصدفة (shell) - لبيئات CI |

الأعلى أولوية يفوز: سطر الأوامر، ثم ملف ini، ثم البيئة. يوقف `pytest -o devtools=false` القيمة الافتراضية للمشروع لتشغيل واحد، ولهذا لا يوجد `--no-devtools`. يختار `DEVTOOLS_TRACE=1` وضع التتبّع لكنه **لا** يفعّل الالتقاط بمفرده، لذا فإن تصديره لسكربتاتك الخاصة لن يلتقط أبدًا تشغيل pytest لم تطلبه.

في الوضع الحيّ تُفتح لوحة التحكم في نافذة متصفح مخصصة و**تبقى مفتوحة بعد انتهاء التشغيل** لتتمكن من فحص ما حدث؛ أغلقها (أو اضغط `Ctrl-C`) للإنهاء. نوعان من التشغيل يبقيان دون التقاط حتى عند التفعيل: `--collect-only`، حيث لا يُنفَّذ شيء، وتشغيل لم يجمع أي اختبارات، إذ لولا ذلك لعلّق مسار مكتوب خطأً طرفيتك على لوحة تحكم فارغة.

### سكربت Python عادي (بدون مشغّل اختبارات)

سطران حول شيفرة Selenium الحالية لديك:

```python title="login.py"
import selenium_devtools as devtools
from selenium import webdriver

devtools.enable()                     # افتح لوحة التحكم والتقط كل أمر
# devtools.enable(trace=True)         # أو: اكتب trace.zip ولا تفتح أي نافذة

driver = webdriver.Chrome()
driver.get('https://the-internet.herokuapp.com/login')
driver.find_element('id', 'username').send_keys('tomsmith')
driver.quit()

devtools.wait_for_dashboard_close()   # أبقِ الواجهة مفتوحة للفحص (لا يفعل شيئًا إن لم تكن هناك نافذة مفتوحة)
devtools.disable()
```

إذا تعذّر تشغيل الواجهة الخلفية أو الوصول إليها، يسجّل `enable()` تحذيرًا ويُرجع `None`. يُتخطّى الالتقاط وتستمر اختباراتك في العمل، فغياب لوحة التحكم لا يُفشل أي مجموعة اختبارات أبدًا.

### التشغيل المتوازي (`pytest -n`)

**يعمل pytest-xdist دون أي إعداد إضافي.** يجب على كل عملية ترسل تقاريرها إلى تشغيل واحد أن تتفق على معرّف تشغيل، وإلا تعامل الواجهة الخلفية كل اتصال كتشغيل جديد وتمسح ما التقطه السابق. ومع xdist تتفق العمليات فعلًا: تُحمَّل الإضافة في **المتحكّم (controller)** أيضًا، وتفعيل الالتقاط هناك يحدد المعرّف قبل أن يُنشئ xdist أي عامل، والعمّال عمليات فرعية فيرثونه.

ما يظهر فعلًا كتشغيلات منفصلة: استدعاءان مستقلان لـ `pytest`، أو عامل بدأ دون البيئة. صدّر `DEVTOOLS_RUN_ID` بنفسك لضمّ مثل هذه العمليات في تشغيل واحد.

### عناصر التحكم بالتشغيل (Run وRerun وRun-all)

تعمل الثلاثة تحت pytest ومع السكربت العادي. إعادة التشغيل ليست رسالة إلى العملية الجارية: إذ تُنشئ الواجهة الخلفية عملية جديدة من أمر ينشره المحوّل عند بدء التشغيل، وأي عنصر تحكم لا تستطيع خدمته يبقى معطّلًا مع ذكر السبب.

- تحت pytest يختار كل عنصر تحكم صفّه حسب **nodeid** (`file.py`، `file.py::Class`، `file.py::Class::test`)، مستخدمًا المفسّر الذي شغّل اختباراتك. أما مع السكربت العادي فتعيد الثلاثة تشغيل السكربت.
- تُحذف الخيارات التي تضيّق نطاق التشغيل من إعادة التشغيل المستهدفة: `-k` و`-m` و`--deselect` و`--lf`/`--ff`/`--sw` و`-n`/`--dist`. فأي مرشّح متبقٍّ لن يؤدي إلا إلى تضييق الاختبار المسمّى إلى لا شيء، وهو ما يبلّغ عنه pytest كخروج نظيف.
- تبدأ إعادة التشغيل في **rootdir** الخاص بـ pytest، وتُحوَّل المسارات الموضعية في أمر Run-all إلى مسارات مطلقة. أما الخيار الذي يحمل مسارًا *نسبيًا* (`-c`، `--junitxml`) فيُحلّ نسبةً إلى rootdir عند إعادة التشغيل.
- ترسل إعادة التشغيل تقاريرها إلى **لوحة التحكم التي ضغطت فيها الزر** ولا تفتح نافذة ثانية. ويحتفظ Run-all باستدعائك الأصلي حتى بعد إعادة تشغيل مستهدفة.

قيدان: لوحة التحكم التي كانت تعمل مسبقًا عند اتصالك تحتفظ بالمجلد الذي بدأت فيه، وتحت `pytest -n` تعود حالة لوحة التحكم إلى آخر عامل اتصل بها.

### الحفظ وإعادة التشغيل (Preserve & Rerun)

يحمل الصف الفاشل زرًا ثانيًا بجانب Rerun. يلتقط لقطة للمحاولة، ويعيد تشغيل الاختبار، ثم يعرض تبويب **Compare** الفروق بين الاثنين: الأوامر ووحدة التحكم والشبكة جنبًا إلى جنب. تُلتقط اللقطة قبل بدء إعادة التشغيل؛ ويُرفض الحفظ بعد اتصال تشغيل جديد (HTTP 409). أما Rerun العادي فيُسقط كل خطوط الأساس، لذا يختفي تبويب Compare بعد إعادة تشغيل عادية.

</TabItem>
</Tabs>

## خيارات التهيئة {#configuration-options}

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| الخيار | النوع | الافتراضي | الوصف |
|--------|------|---------|-------------|
| `port` | `number` | `3000` | منفذ خادم الواجهة الخلفية لـ DevTools. يُزاد تلقائيًا إن كان مستخدمًا بالفعل. |
| `hostname` | `string` | `'localhost'` | اسم المضيف الذي يرتبط به خادم الواجهة الخلفية. |
| `openUi` | `boolean` | `true` | فتح واجهة DevTools تلقائيًا في نافذة Chrome جديدة. اضبطه على `false` في CI. |
| `captureScreenshots` | `boolean` | `true` | التقاط لقطة شاشة بعد كل أمر WebDriver ناجح. |
| `headless` | `boolean` | `false` | تشغيل متصفح **الاختبار** دون واجهة (يحقن `--headless=old`). لا تتأثر نافذة واجهة DevTools. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | تسجيل فيديو `.webm` لكل جلسة. الخيارات مطابقة لصفحة [WebdriverIO Screencast](/docs/devtools/wdio/screencast). |
| `rerunCommand` | `string` | تلقائي | قالب أمر لإعادة تشغيل كل اختبار. يُستبدل `{{testName}}`. يُشتق تلقائيًا من argv الخاص بالمشغّل إن لم يُحدَّد. |
| `mode` | `'live' \| 'trace'` | `'live'` | يفتح `live` واجهة DevTools؛ ويتخطاها `trace` ويكتب ملفًا محمولًا بدلًا منها. راجع [وضع التتبّع](/docs/devtools/wdio/trace-mode). يتجاوز `openUi`. |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | بنية ملف التتبّع. لا يُطبَّق إلا عند `mode: 'trace'`. |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | تتبّع واحد لكل جلسة / ملف مواصفات / اختبار. يكتب `'test'` كل واحد إلى `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. لا يُطبَّق إلا عند `mode: 'trace'`. راجع [وضع التتبّع](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity). |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | أيّ التتبّعات يُحتفظ بها. يُقرن مع `traceGranularity: 'test'`. لا يُطبَّق إلا عند `mode: 'trace'`. |
| `filmstrip` | `boolean` | `true` | تسجيل شريط شاشة كثيف ومتواصل داخل التتبّع للتنقّل إطارًا بإطار في المشغّل. لا يُطبَّق إلا عند `mode: 'trace'`. |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | وضع التتبّع + `traceGranularity: 'test'`. لقطة شاشة لكل اختبار، تُرفق مضمّنة في Allure (`image/png`) عبر `allure-js-commons` عندما يكون محوّل مشغّل Allure نشطًا. |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | وضع التتبّع + `traceGranularity: 'test'`. فيديو تسجيل شاشة لكل اختبار، يُحتفظ به وفق السياسة المحددة، ويُرفق مضمّنًا في Allure (`video/webm`) عبر `allure-js-commons` عندما يكون محوّل مشغّل Allure نشطًا. |
| `emitArtifactsManifest` | `boolean` | تلقائي | كتابة البيان `devtools-artifacts-<sessionId>.json` — الفهرس العام الذي تستهلكه أدوات التقارير/CI لاكتشاف الملفات المُنتَجة — بجوار التتبّع. معطّل افتراضيًا؛ و**يُفعَّل تلقائيًا** عندما يكون وقت تشغيل `allure-js-commons` نشطًا. لوضع التتبّع فقط. |
| `captureAssertions` | `boolean` | `true` | التقاط تأكيدات `node:assert` (الناجحة والفاشلة) كصفوف إجراءات في التتبّع. اضبطه على `false` لإلغاء ذلك. |

```js
DevTools.configure({
  port: 3000,
  hostname: 'localhost',
  headless: false,
  openUi: true
})
```

> لا يسري `port` و`hostname` إلا قبل بدء الواجهة الخلفية، وهو ما يحدث عند بناء أول مشغّل (driver)، لذا استدعِ `DevTools.configure(...)` قبل ذلك؛ فالاستدعاء اللاحق يتجاهلهما مع تحذير. وتحتفظ إعادة التشغيل بالواجهة الخلفية الخاصة بالعملية الأم أيًّا كانت قيمتهما.

> **في CI**، اضبط كلًّا من `headless: true` (لإخفاء متصفح الاختبار) و`openUi: false` (لعدم محاولة فتح نافذة لوحة التحكم، إذ لا تملك بيئات CI شاشة عرض). تظل الواجهة الخلفية تعمل على المنفذ المُهيّأ لتتمكن من فتح الواجهة لاحقًا عند الحاجة.

</TabItem>
<TabItem value="python" label="Python">

لا يوجد كائن خيارات، ولا يلزم ظهور أي شيء خاص بـ devtools في شيفرة اختباراتك. تحت pytest تهيّئ المحوّل بالطريقة التي تهيّئ بها pytest؛ ويمرّر السكربت وسائط مسمّاة إلى `enable()`؛ وأي شيء ليس له علَم فهو متغير بيئة.

| علَم pytest | `[tool.pytest.ini_options]` | التأثير |
|---|---|---|
| `--devtools` | `devtools = true` | التقاط هذا التشغيل وفتح لوحة التحكم. |
| `--devtools-trace` | `devtools_trace = true` | التقاط هذا التشغيل وكتابة أرشيف تتبّع بدلًا من فتح لوحة تحكم. يتضمن `--devtools`. |
| `--devtools-trace-granularity <session\|test>` | `devtools_trace_granularity = test` | أرشيف واحد للتشغيل بأكمله (`session`، الافتراضي) أو واحد لكل اختبار. يتضمن `--devtools-trace`. |
| `--devtools-trace-policy <policy>` | `devtools_trace_policy = "retain-on-failure"` | أيّ الأرشيفات تستحق الاحتفاظ بها. يتضمن `--devtools-trace`. راجع [كم عدد الأرشيفات، وأيّها يُحتفظ به](#how-many-archives-and-which-ones-to-keep). |

الأعلى أولوية يفوز: سطر الأوامر، ثم ملف ini، ثم البيئة أدناه. يوقف `pytest -o devtools=false` القيمة الافتراضية للمشروع لتشغيل واحد، ويفعل `pytest -o devtools_trace_policy=on` الشيء نفسه لأي من الخيارات الأخرى.

| المتغير | التأثير |
|---|---|
| `DEVTOOLS_ENABLE=1` | تفعيل الالتقاط، إن لم يفعّله علَم أو خيار ini بالفعل. |
| `DEVTOOLS_PORT=<n>` | الارتباط بلوحة تحكم تستمع مسبقًا على هذا المنفذ؛ ويفعّل الالتقاط أيضًا. |
| `DEVTOOLS_HOST=<host>` | المضيف الذي يُوصَل منه إلى لوحة التحكم (الافتراضي `localhost`). |
| `DEVTOOLS_TRACE=1` | كتابة أرشيف تتبّع بدلًا من فتح لوحة تحكم. يحدد الوضع للسكربت العادي؛ وتحت pytest لا يفعّل التشغيل بمفرده. |
| `DEVTOOLS_TRACE_GRANULARITY=<session\|test>` | وضع التتبّع: أرشيف واحد للتشغيل بأكمله، أو واحد لكل اختبار. محيطي (ambient)، لذا لا يختار وضع التتبّع بمفرده أبدًا؛ اقرنه مع `DEVTOOLS_TRACE=1`. |
| `DEVTOOLS_TRACE_POLICY=<policy>` | وضع التتبّع: أيّ الأرشيفات تستحق الاحتفاظ بها. محيطي، لذا لا يختار وضع التتبّع بمفرده أبدًا؛ اقرنه مع `DEVTOOLS_TRACE=1`. |
| `DEVTOOLS_FILMSTRIP=0` | وضع التتبّع: استبعاد شريط الإطارات الكثيف من الأرشيف. |
| `DEVTOOLS_A11Y=0` | وضع التتبّع: تخطّي شجرة A11y ومستطيلات العناصر لكل إجراء. |
| `DEVTOOLS_OPEN=0` | عدم فتح نافذة لوحة التحكم (CI). |
| `DEVTOOLS_BIDI=0` | تعطيل BiDi، ومعه التقاط وحدة التحكم والشبكة. |
| `DEVTOOLS_RUN_ID=<id>` | ضمّ عدة عمليات في تشغيل واحد. |
| `DEVTOOLS_BACKEND_CMD=<cmd>` | بدء الواجهة الخلفية بأمر صريح بدلًا من الأمر المحدَّد تلقائيًا. |

متغيرات تُضبط نيابةً عنك لا بواسطتك (مذكورة حتى تتعرّف على أي قيمة غير متوقعة): `DEVTOOLS_RUNNER_CWD`، و`DEVTOOLS_APP_REUSE` / `DEVTOOLS_APP_HOST` / `DEVTOOLS_APP_PORT`، و`DEVTOOLS_RERUN_LAUNCH_COMMAND`.

الواجهة الخلفية تطبيق Node، لذا **يجب أن يتوفر Node.js 22.19 أو أحدث في كل الأوضاع**، حتى في وضع التتبّع حيث لا تُفتح أي نافذة للوحة التحكم. فالأمر لا يقتصر على الواجهة: إذ تخدم الواجهة الخلفية مجمّع الصفحة، ويمر تدفق الأحداث بأكمله عبر WebSocket الخاص بها، وفي وضع التتبّع هي أيضًا ما يبني الأرشيف. يتحقق `enable()` من وجود Node مسبقًا ويسمّي ما هو مفقود بدلًا من الفشل لاحقًا كمهلة إنشاء عملية. يعثر المحوّل على الواجهة الخلفية أو يشغّلها نيابةً عنك، بهذا الترتيب: واجهة خلفية أنشأت هذا التشغيل كإعادة تشغيل، ثم `DEVTOOLS_PORT` (ارتباط)، ثم `DEVTOOLS_BACKEND_CMD`، ثم الواجهة الخلفية المثبّتة عبر `selenium-devtools install-backend`، ثم `npx @wdio/devtools-backend@<pinned version>`. الإصدار المثبّت ثابت لكل إصدار من المحوّل حتى تتحدث الواجهة الخلفية دائمًا بعقد الاتصال الخاص بالمحوّل. راجع [تشغيل الواجهة الخلفية بشكل مستقل](/docs/devtools/dashboard#running-the-backend-on-its-own) إن كنت تفضّل إدارتها بنفسك، أو وجّه `DEVTOOLS_PORT` إلى واجهة تعمل لديك مسبقًا، وفي هذه الحالة لا حاجة إلى Node محليًا.

### التأكيدات

تظهر عبارات `assert` الناجحة والفاشلة كصفوف تحمل القيمة **المتوقعة** والقيمة **الفعلية**، وتصل حالات الفشل إلى تبويب Errors. في Python تُعد `assert` عبارة وليست استدعاءً، لذا على عكس تعديل `node:assert` في محوّل Node لا يوجد ما يُغلَّف، إذ تأتي النتيجة من المشغّل.

**تحت pytest**، تأتي القيم من معيد كتابة التأكيدات، لذا يحمل كل صف معاملات حقيقية. يحتاج التقاط التأكيدات *الناجحة* إلى `enable_assertion_pass_hook` الخاص بـ pytest، وتفعّله الإضافة بنفسها. تنبيه واحد: يقرر pytest لكل وحدة، *أثناء إعادة كتابتها*، ما إذا كان سيُصدر هذا الخطاف، لذا فإن الوحدة التي خُزّنت شيفرتها البايتية المعاد كتابتها مؤقتًا قبل تثبيت الإضافة تستمر في الإبلاغ عن حالات الفشل فقط. يذكر المحوّل ذلك مرة واحدة عند الجمع ويسمّي ذاكرة التخزين المؤقت التي يجب حذفها، وهي **ليست** دائمًا `__pycache__` المجاور لاختباراتك، لأن `sys.pycache_prefix` (المضبوط افتراضيًا في Python الخاص بنظام macOS) يرسل كل وحدة معاد كتابتها إلى شجرة مركزية واحدة.

**في سكربت عادي** لا يوجد معيد كتابة، لذا تأتي النتائج من أحداث الأسطر في المفسّر وتُقرأ القيم من الإطار الذي على وشك تنفيذ التأكيد. لا يُحَل إلا ما لا يمكن أن يُنفّذ شيفرتك عند قراءته: تُحَل القيمة الحرفية أو المتغير المحلي، ولا تُحَل الخاصية أو الاستدعاء، لأن تقييم `driver.current_url` مرة ثانية سيُصدر أمر WebDriver آخر.

</TabItem>
</Tabs>

## وضع التتبّع {#trace-mode}

مسار التقاط دون واجهة، في **كلتا اللغتين**: لا تُفتح أي نافذة لواجهة DevTools، ويكتب التشغيل أرشيف تتبّع محمولًا في مجلد `test-results/`، بنفس شكل ملف تتبّع WebdriverIO. يختلف الاثنان فقط في مدى قدرتك على ضبط الملف، وفي الجهة التي تبنيه.

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

عند نهاية الجلسة يكتب المحوّل `trace-<sessionId>.zip` (أو مجلدًا) بنفسه، في `test-results/` بجوار مجلد الاختبار / التهيئة المحدَّد.

```js
DevTools.configure({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // اختياري؛ الافتراضي 'zip'
})
```

يُتخطّى ربط منفذ الواجهة الخلفية ونافذة الواجهة وخيار `screencast` جميعًا في وضع التتبّع. للمرجع الكامل للميزات (محتويات الملف، والعارض، واختبار الأجهزة المحمولة، ومتى تختار `zip` مقابل `ndjson-directory`)، راجع [صفحة وضع التتبّع](/docs/devtools/wdio/trace-mode).

### ملفات لكل اختبار والاحتفاظ بها

عند `traceGranularity: 'test'` يحصل كل اختبار على مجلد ملفات خاص به، ويقرر `tracePolicy` أيّها يُحتفظ به (مثل `retain-on-failure`). في هذا الوضع يمكنك أيضًا التقاط `screenshot` (PNG) و`video` (`.webm`) لكل اختبار، وتفعيل `filmstrip` كثيف يُسجَّل داخل التتبّع للتنقّل إطارًا بإطار. عندما يكون محوّل مشغّل `allure-js-commons` نشطًا، تُرفق التتبّعات / لقطات الشاشة / الفيديوهات الخاصة بكل اختبار مضمّنة في تقرير Allure (ويُفعَّل `emitArtifactsManifest` تلقائيًا)؛ وإلا فتُكتب إلى `test-results/` وتُسجَّل في البيان.

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

لا يوجد كائن خيارات لضبطه، بل علَم تحت pytest، ووسيط مسمّى في السكربت:

```bash
pytest --devtools-trace tests/        # يتضمن --devtools
DEVTOOLS_TRACE=1 python3 login.py     # سكربت عادي؛ مماثل لـ devtools.enable(trace=True)
```

```python title="login.py"
devtools.enable(trace=True)           # اكتب trace.zip بدلًا من فتح لوحة تحكم
```

يُحفظ الأرشيف في `test-results/` بجوار ملف الاختبار الذي جاء منه أول أمر مُلتقَط، وهو المجلد نفسه الذي تُكتب إليه فيديوهات تسجيل الشاشة أصلًا، باسم `trace-<sessionId>.zip`، أو باسم كل اختبار عندما تطلب [أرشيفًا واحدًا لكل اختبار](#how-many-archives-and-which-ones-to-keep). إذا لم يحمل أي أمر موقعًا مصدريًا من شيفرتك، فإنه يعود إلى `test-results/` تحت المجلد الحالي.

**لا تُفتح أي نافذة للوحة التحكم.** الملف هو المُخرَج، والتشغيل الحيّ يبقى معلّقًا على النافذة حتى تغلقها، فوجود نافذة سيحوّل كتابة ملف إلى جلسة تفاعلية. تظل الواجهة الخلفية تبدأ، لأنها ما *يبني* الأرشيف: فتحويلات التتبّع مكتوبة بـ TypeScript، لذا يطلبها تشغيل Python من الواجهة الخلفية بدلًا من شحن نسخة ثانية منها. هذا هو الفرق الوحيد عن وضع التتبّع في محوّل Node.js الذي لا يحتاج إلى واجهة خلفية، وسبب [اشتراط Node.js 22.19 أو أحدث في كل الأوضاع](#configuration-options).

إلى جانب صفوف الأوامر، ولقطات الشاشة والمحدِّدات لكل أمر، ووحدة التحكم والشبكة التي يلتقطها كلا الوضعين، يحمل الأرشيف:

| في الأرشيف | الافتراضي | الإلغاء |
|---|---|---|
| السفر عبر الزمن في DOM - تدفق التغييرات الذي يعيد المشغّل تشغيله خطوة بخطوة | مفعّل | - |
| شريط إطارات كثيف - إطارات تسجيل الشاشة، محمولة داخل التتبّع بدلًا من `.webm` | مفعّل | `DEVTOOLS_FILMSTRIP=0` |
| شجرة A11y وتراكب العناصر - تُقرأ بجانب كل إجراء، بتكلفة رحلتي ذهاب وإياب إضافيتين لكل أمر | مفعّل | `DEVTOOLS_A11Y=0` |

لا يرمّز وضع التتبّع أي `.webm`، لذا لا يحتاج إلى `ffmpeg`؛ فالإطارات *هي* شريط الإطارات.

**يُطلب التصدير عند انتهاء التشغيل، لا عند خروج العملية**: يطلبه pytest عند `sessionfinish` ويصدّره `disable()` في السكربت قبل إغلاق قناة النقل، لذا تحصل CI على الملف سواء شاركت نافذة أم لا.

### كم عدد الأرشيفات، وأيّها يُحتفظ به {#how-many-archives-and-which-ones-to-keep}

إعدادان يقرران ذلك، ولا معنى لأي منهما خارج وضع التتبّع.

**الدقّة (Granularity)** - كم أرشيفًا يكتب التشغيل:

| `--devtools-trace-granularity` | النتيجة |
|---|---|
| `session` (الافتراضي) | أرشيف واحد للتشغيل بأكمله. |
| `test` | أرشيف واحد لكل اختبار، يحتوي كل منها فقط على أوامر ذلك الاختبار ووحدة تحكمه وشبكته وتغييرات DOM وأشجار a11y وإطارات تسجيل الشاشة الخاصة به. |

لا توجد قيمة `spec` هنا عن قصد. فملف المواصفات في هذا المحوّل *هو* ملف الاختبار، لذا فإن اسمًا ثالثًا لن يعني ضمنيًا إلا أحد الاثنين أعلاه.

**السياسة (Policy)** - أيّ تلك الأرشيفات يُحتفظ به:

| `--devtools-trace-policy` | النتيجة |
|---|---|
| `on` (الافتراضي) | الاحتفاظ بكل شيء. |
| `retain-on-failure` | الاحتفاظ بما فشل فقط. |
| `retain-on-first-failure`، `on-first-retry`، `on-all-retries`، `retain-on-failure-and-retries` | مقبولة، لكنها اليوم تتصرف **تمامًا مثل `retain-on-failure`**. |

هذه الأربعة الأخيرة لا تراعي إعادة المحاولات بعد، ومن الأفضل قول ذلك بوضوح بدلًا من اكتشافه من أرشيف كنت تتوقعه: لا شيء مما يرسله هذا المحوّل يحمل رقم المحاولة، لذا فإن الاختبار المعاد تجربته يكتب فوق نتيجته السابقة، ولا يمكن طرح سؤال إعادة المحاولة أصلًا. تسجّل الواجهة الخلفية هذا التراجع بدلًا من التظاهر بخلافه. اختر إحداها فقط إن أردت `retain-on-failure` تحت اسم سيعني أكثر لاحقًا.

يجتمع الإعدادان:

| الدقّة | السياسة | ما تحصل عليه |
|---|---|---|
| `test` | `retain-on-failure` | الاختبارات التي فشلت فقط. |
| `session` | `retain-on-failure` | أرشيف التشغيل بأكمله، إن فشل فيه أي شيء. |
| أيٌّ منهما | `on` | كل شيء. |

كل أرشيف يُحتفظ به عند دقّة `test` يُسمّى باسم اختباره (`trace-<test>-<hash>.zip`، حيث يُؤخذ الـ hash من nodeid الخاص بالاختبار حتى لا تكتب حالتان مُعلَّمتان (parametrised) تتشاركان العنوان فوق بعضهما). التشغيل الذي لا يحتفظ بشيء لا يكتب شيئًا على الإطلاق، وهذا هو المقصود: فالأرشيفات التي تبقى لديك هي التي تستحق الفتح، والتصدير المرفوض هو السياسة وهي تعمل لا حالة فشل.

اضبطهما لتشغيل واحد:

```bash
pytest --devtools-trace-granularity test --devtools-trace-policy retain-on-failure tests/
```

أو ثبّتهما في المشروع، حتى يلتقط المساهم الذي يستنسخ المشروع بالطريقة نفسها دون أن يُخبَر بذلك:

```ini title="pytest.ini"
[pytest]
devtools_trace = true
devtools_trace_granularity = test
devtools_trace_policy = retain-on-failure
```

يقبل `[tool.pytest.ini_options]` في `pyproject.toml` المفاتيح نفسها، ويتجاوز `pytest -o devtools_trace_policy=on tests/` أحدها لتشغيل واحد دون تعديل الملف. توجد نسخة مشروحة بالكامل، بكل إعداد وكل متغير بيئة مع الغرض من كل منها، في المستودع على [`examples/selenium-py/pytest/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium-py/pytest).

يمرّر السكربت العادي الإعدادين نفسيهما كوسائط مسمّاة:

```python title="login.py"
devtools.enable(trace_granularity='test', trace_policy='retain-on-failure')
```

**تسمية أيٍّ منهما صراحةً تختار وضع التتبّع.** فعلَم سطر الأوامر وخيار ini ووسيط `enable()` كلها تتضمنه، لأن السياسة أو الدقّة لا تعني شيئًا في الوضع الحيّ، واحترام أحدهما دون الوضع سيُسقط بصمت ما طلبته. أما `DEVTOOLS_TRACE_POLICY` و`DEVTOOLS_TRACE_GRANULARITY` فـ**لا** يفعلان ذلك عن قصد: فالمتغير المُصدَّر محيطي وربما ضُبط لسكربت آخر في الصدفة نفسها، لذا فإن تحويل تشغيل حيّ إلى وضع التتبّع على هذا الأساس سيسلب لوحة تحكم لم يطلب أحد التخلي عنها؛ اقرنهما مع `DEVTOOLS_TRACE=1`. التشغيل الذي ينتهي بتجاهل إعداد تتبّع مُصدَّر يسجّل تحذيرًا، بدلًا من أن يتركك تلاحظ أرشيفًا لم يظهر أبدًا.

</TabItem>
</Tabs>

### عرض التتبّع

افتح أي ملف تتبّع `.zip` في المشغّل الرسمي، وهو واجهة DevTools نفسها في وضع **player** مخصص:

```bash
npx show-trace path/to/trace.zip      # في مشروع يثبّت المحوّل
pnpm show-trace path/to/trace.zip     # من مستودع devtools الأحادي (monorepo)
```

يُشحن الملف التنفيذي `show-trace` مع `@wdio/selenium-devtools`، لذا فهو متاح في أي مشروع يثبّته، دون أي اعتمادية إضافية. لا يثبّت مشروع Python أي محوّل Node.js، لكن المشغّل نفسه يُشحن مع الواجهة الخلفية التي يجلبها المحوّل لك مسبقًا: `npx -p @wdio/devtools-backend show-trace path/to/trace.zip`.

لأن محوّل Selenium يلتقط **تدفق تغييرات DOM** الخاص بالصفحة ولقطة للعناصر / إمكانية الوصول لكل أمر إلى جانب كل لقطة شاشة، فإن تتبّع Selenium يشغّل مجموعة ميزات المشغّل كاملة: السفر عبر الزمن في DOM، وتبويب A11y وتراكب اختيار المحدِّد، وتبويب Transcript مع Copy-for-LLM، وتداخل Cucumber Feature ← Scenario ← Step، والخط الزمني القابل للتمرير. يحمل تتبّع Python تدفق التغييرات نفسه واللقطة الخاصة بكل إجراء (قراءة العناصر / a11y هناك لوضع التتبّع فقط، ومفعّلة افتراضيًا)؛ وتداخل Gherkin هو العنصر الوحيد الذي لا مقابل له في pytest.

يستخدم التتبّع مخطط NDJSON محمولًا، لذا يُفتح ملف `.zip` نفسه (أو المجلد) أيضًا في عارضات تتبّع متوافقة أخرى. راجع صفحة **[مشغّل التتبّع](/docs/devtools/trace-player)** للشرح الكامل.

## الواجهة البرمجية العامة

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

```js
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure(opts)             // ضبط خيارات وقت التشغيل (انظر أعلاه)
DevTools.startTest(name, meta?)      // تحديد حدّ اختبار مُسمّى (لسكربتات Node العادية فقط)
DevTools.endTest('passed'|'failed'|'skipped'|'pending')
```

تحت Mocha / Jest / Cucumber ترتبط الإضافة تلقائيًا بدورة حياة المشغّل، لذا لا تحتاج إلى `startTest` / `endTest` يدويًا، واستدعاؤهما سيُنشئ صفوفًا مكررة.

</TabItem>
<TabItem value="python" label="Python">

```python
import selenium_devtools as devtools

devtools.enable()                     # الاتصال والتجهيز؛ متساوي القوى (idempotent)
devtools.disable()                    # الإنهاء؛ آمن عند استدعائه مرتين
devtools.wait_for_dashboard_close()   # الانتظار حتى تُغلق النافذة
devtools.get_capturer()               # SessionCapturer الحيّ، أو None
devtools.dashboard_url()              # عنوان URL الذي تُخدم عليه لوحة التحكم
devtools.export_trace()               # كتابة أرشيف التتبّع الآن (وضع التتبّع فقط)
```

يقبل `enable()` المعاملين الاختياريين `host` و`port`، بالإضافة إلى وسائط مسمّاة:

```python
devtools.enable(trace=True)                            # اكتب trace.zip؛ ولا تفتح أي نافذة
devtools.enable(trace=True, filmstrip=False)           # ... دون شريط الإطارات الكثيف
devtools.enable(trace=True, a11y=False)                # ... دون قراءة العناصر / a11y لكل إجراء
devtools.enable(trace_granularity='test')              # ... أرشيف واحد لكل اختبار (يتضمن trace=True)
devtools.enable(trace_policy='retain-on-failure')      # ... الاحتفاظ بما فشل فقط (يتضمن trace=True)
```

ينطبق `filmstrip` و`a11y` على وضع التتبّع فقط، وكلاهما مفعّل افتراضيًا (يضبط `DEVTOOLS_FILMSTRIP` / `DEVTOOLS_A11Y` الشيء نفسه من البيئة). يعود `trace` إلى `DEVTOOLS_TRACE`. ويعود `trace_granularity` و`trace_policy` إلى `DEVTOOLS_TRACE_GRANULARITY` / `DEVTOOLS_TRACE_POLICY`، وتمرير أيٍّ منهما يفعّل وضع التتبّع بمفرده؛ راجع [كم عدد الأرشيفات، وأيّها يُحتفظ به](#how-many-archives-and-which-ones-to-keep). القيمة خارج المجموعة المقبولة تُصدر تحذيرًا وتعود إلى القيمة الافتراضية بدلًا من اكتشافها لاحقًا كملف مفقود.

تحت pytest تدير الإضافة كل هذا من `--devtools` / `--devtools-trace` (أو خيار ini المطابق، أو `DEVTOOLS_ENABLE=1`)، وتأتي حدود الاختبارات من خطافات pytest نفسه، فلا يوجد مقابل لـ `startTest` / `endTest` لاستدعائه.

</TabItem>
</Tabs>

## أمثلة

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

توجد أمثلة عاملة في مجلد `examples/` في المستوى الأعلى من المستودع. ابنِ مساحة العمل مرة واحدة (`pnpm install && pnpm build`)، ثم شغّل من جذر المستودع. يشغّل `pnpm demo:selenium` المثال الافتراضي (Cucumber)؛ أما المتغيرات الخاصة بكل مشغّل فهي:

| المجلد | المشغّل | الأمر |
|-----------|--------|---------|
| [`examples/selenium-js/mocha/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium-js/mocha) | Mocha | `pnpm --filter @wdio/selenium-devtools example:mocha` |
| [`examples/selenium-js/mocha/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium-js/mocha) | Mocha + allure-mocha | `pnpm --filter @wdio/selenium-devtools example:mocha:allure` |
| [`examples/selenium-js/jest/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium-js/jest) | Jest | `pnpm --filter @wdio/selenium-devtools example:jest` |
| [`examples/selenium-js/cucumber/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium-js/cucumber) | Cucumber | `pnpm demo:selenium` |
| [`examples/selenium-js/mobile/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium-js/mobile) | Mocha على Appium | `pnpm demo:selenium:mobile` |

</TabItem>
<TabItem value="python" label="Python">

توجد أمثلة Python في [`examples/selenium-py/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium-py). ثبّت المحوّل وابنِ مساحة العمل مرة واحدة (`pnpm install && pnpm build`، حتى تتوفر الواجهة الخلفية)، ثم شغّل من جذر المستودع. تعمل العروض التوضيحية بـ `python3` مجرّد، لذا يجب تثبيت المحوّل في ذلك المفسّر: `python3 -m venv .venv && source .venv/bin/activate && pip install -e packages/selenium-devtools-py`.

| المثال | ما يعرضه | الأمر |
|---|---|---|
| `scripts/web_form.py` | إعداد السكربت العادي في ثلاثة أسطر | `pnpm demo:python` |
| `scripts/login.py` | سكربت أطول: تنقّل، وملء نموذج، وتأكيدات | `pnpm demo:python:login` |
| `mobile/android/`، `mobile/ios/` | Appium: تطبيق الساعة في Android، أو الإعدادات في iOS مع `DEVTOOLS_MOBILE_PLATFORM=ios` (نفّذ `pip install -r examples/selenium-py/requirements-mobile.txt` أولًا) | `pnpm demo:python:mobile` |
| `pytest/` | pytest مع اختبار داخل صنف واختبار على مستوى الوحدة، بالإضافة إلى `pytest.ini` يثبّت وضع التتبّع والدقّة والاحتفاظ، وكل إعداد فيه مشروح بما يفعله | `pnpm demo:python:pytest` |

</TabItem>
</Tabs>

## الميزات

يوفّر محوّل Selenium تجربة واجهة DevTools نفسها التي يوفرها WebdriverIO، في كلتا اللغتين. كل ميزة أدناه تُلتقط تلقائيًا دون أي تهيئة خاصة بها: `DevTools.configure({})` الأساسي في Node.js، أو `pytest --devtools` في Python. تتدفق وحدة التحكم والشبكة عبر معالجات BiDi في Selenium، مع بديل المجمّع المحقون في Node.js. تؤدي الروابط إلى المرجع الكامل لكل ميزة.

- **[إعادة تشغيل الاختبارات التفاعلية والتصوّر](/docs/devtools/wdio/interactive-test-rerunning)** - معاينات حيّة للمتصفح، ولقطات شاشة لكل أمر، وإعادة تشغيل الاختبار/المجموعة بنقرة واحدة
- **[الحفظ وإعادة التشغيل (المقارنة)](/docs/devtools/wdio/preserve-and-rerun)** - التقاط لقطة لاختبار فاشل، وإعادة تشغيله، ومقارنة التشغيلين جنبًا إلى جنب
- **[دعم أطر عمل متعددة](/docs/devtools/wdio/multi-framework-support)** - اكتشاف تلقائي لـ Mocha أو Jest أو Cucumber أو سكربت عادي في Node.js؛ وpytest أو سكربت عادي في Python
- **[سجلات وحدة التحكم](/docs/devtools/wdio/console-logs)** - التقاط مُخرجات وحدة تحكم المتصفح وفحصها
- **[سجلات الشبكة](/docs/devtools/wdio/network-logs)** - مراقبة استدعاءات API ونشاط الشبكة
- **[البيانات الوصفية](/docs/devtools/wdio/metadata)** - قدرات الجلسة والبيئة والتوقيت لكل جلسة متصفح
- **[TestLens](/docs/devtools/wdio/testlens)** - الانتقال من أي أمر إلى سطر المصدر الذي أطلقه
- **[تسجيل شاشة الجلسة](/docs/devtools/wdio/screencast)** - تسجيل فيديو تلقائي لجلسات المتصفح
- **توقيتات التنقّل** - بعد كل أمر تنقّل، تُرفق توقيتات التحميل / جاهزية DOM / الاستجابة، وأعداد الموارد، وملفات تعريف الارتباط، ومعلومات المستند بصف ذلك الأمر
- **[وضع التتبّع](/docs/devtools/wdio/trace-mode)** - التقاط دون واجهة ينتج `trace.zip` محمولًا (دون نافذة واجهة)، في كلتا اللغتين، مع التقسيم لكل اختبار والاحتفاظ في كلتيهما (`traceGranularity` / `tracePolicy` في Node.js؛ و`--devtools-trace-granularity` / `--devtools-trace-policy` في Python). تبقى `screenshot` / `video` لكل اختبار والإرفاق المضمّن في Allure خاصة بـ Node.js فقط؛ راجع [وضع التتبّع](#trace-mode)

في Node.js، تسجيل الشاشة هو الميزة الوحيدة التي لها خيارات خاصة (راجع [خيارات التهيئة](#configuration-options)):

```js
DevTools.configure({ screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 } })
```

في Python تصل أيضًا مُخرجات التشغيل نفسه إلى تبويب Console: سجلات `logging` في Python (الخاصة بـ selenium والمحوّل) ومُخرجات `print()` للاختبار، التي تُنسخ بحيث تظل طرفيتك تعرضها.

في Python لا يحتاج تسجيل الشاشة إلى أي تهيئة: يبثّ Chrome الإطارات عبر CDP، وتعود المتصفحات الأخرى إلى لقطة شاشة واحدة لكل أمر، ويحتاج ترميز `.webm` إلى `ffmpeg` في `PATH`. في وضع التتبّع تصبح الإطارات نفسها شريط الإطارات الكثيف في الأرشيف بدلًا من `.webm`، لذا لا يُرمَّز شيء ولا حاجة إلى `ffmpeg`.

## كيف يعمل

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

تعدّل الإضافة النماذج الأولية (prototypes) لـ `Builder` و`WebDriver` و`WebElement` في `selenium-webdriver` وقت الاستيراد:

- **`Builder.build()`** - بعد الإنشاء، يُسجَّل المشغّل لدى ملتقِط الجلسة وتبدأ الواجهة الخلفية لـ DevTools في عملية فرعية منفصلة.
- **كل تابع عام في `WebDriver` / `WebElement`** - مُغلَّف بالتقاط الأوامر (الوسائط + النتيجة + لقطة الشاشة + مصدر الاستدعاء).
- **`WebDriver.quit()`** - خطاف تنظيف يُنتظر يُفرغ ترميز تسجيل الشاشة ومخزن WebSocket المؤقت والبيانات الوصفية النهائية قبل تنفيذ quit الأصلي.

عندما يتوفر BiDi (Chrome ≥114)، تتدفق سجلات وحدة التحكم واستثناءات JavaScript وأحداث الشبكة مباشرةً عبر معالجات BiDi في Selenium. وإلا تعود الإضافة إلى سكربت مجمّع محقون في جهة المتصفح، لذا تظل جلسة Safari أو Appium تسرد كل طلب، من مصدرين خاصين بالصفحة نفسها. يمر استدعاء `fetch` / `XMLHttpRequest` عبر تعديل المجمّع ويحمل طريقته وترويساته وحالته ومحتواه. أما كل تحميل آخر (المستند، والسكربتات، والأنماط، والصور، والخطوط) فيأتي من مخزن Resource Timing الخاص بالصفحة مع توقيته وحجمه، لكن دون ترويسات أو محتوى، ودون حالة في Safari؛ ويشير تبويب Network إلى ذلك في كل صف من هذا النوع.

يظهر `driver.wait()` كأمر واحد أصدره الاختبار، لا كصف لكل استطلاع.

يُسجَّل المجمّع في جهة الصفحة عند بداية المستند عبر BiDi (`script.addPreloadScript`)، لذا تُجهّز كل صفحة نفسها قبل تشغيل أي من سكربتاتها؛ ودون BiDi يعود إلى حقن `<script>` بعد كل تنقّل. يسجّل **تدفق تغييرات DOM** الخاص بالصفحة ولقطة للعناصر / إمكانية الوصول لكل أمر، لذا يحمل التتبّع ما يكفي لإعادة بناء DOM الحيّ في كل خطوة (مع ربط لكل تنقّل)، وهذا ما يشغّل السفر عبر الزمن في DOM وتبويب A11y في المشغّل بدلًا من إعادة تشغيل تعتمد على لقطات الشاشة فقط.

</TabItem>
<TabItem value="python" label="Python">

لا توجد نماذج أولية لتعديلها، لذا يغلّف محوّل Python تابعًا واحدًا بدلًا من ذلك:

- **`WebDriver.execute()`** - نقطة الاختناق الوحيدة التي يمر عبرها كل أمر. تفوّض توابع العناصر إليها أيضًا (`self._parent.execute`)، لذا تُلتقط `click` و`send_keys` و`text` بالغلاف نفسه دون المساس بأصناف العناصر.
- **إعداد الجلسة** - عند أول أمر حقيقي يُسجَّل المشغّل، وتُرسل البيانات الوصفية، ويُجهَّز BiDi والمجمّع وتسجيل الشاشة.
- **`quit()`** - يُعترض قبل إنهاء الجلسة، لذا يُرمَّز تسجيل الشاشة وتُفرغ الإطارات النهائية بينما لا يزال المشغّل موجودًا.

تتدفق وحدة التحكم واستثناءات JavaScript والشبكة عبر طبقة BiDi في selenium (4.44+)، التي يفعّلها المحوّل لك بحقن القدرة `webSocketUrl` في طلب `newSession`. وحيث لا يوفّر المشغّل BiDi على الإطلاق (Safari، وكل جلسة يخدمها Appium) يملأ مجمّع الصفحة المحقون تبويب Network بدلًا من ذلك، من مصدرين خاصين بالصفحة نفسها. يمر استدعاء `fetch` / `XMLHttpRequest` عبر تعديله ويحمل الطريقة والترويسات والحالة والمحتوى. أما كل تحميل آخر فيأتي من مخزن Resource Timing الخاص بالمستند مع توقيته وحجمه، لكن دون ترويسات أو محتوى، ودون حالة في Safari.

يأتي **تدفق تغييرات DOM** من المجمّع نفسه في جهة المتصفح كما في Node.js، ويُسجَّل عند بداية المستند عبر BiDi بحيث تُجهّز الصفحة نفسها قبل تشغيل أي من سكربتاتها. ومع تعطيل BiDi (`DEVTOOLS_BIDI=0`) يُحقن المجمّع لكل مستند عبر `<script>` بدلًا من ذلك. في Chrome يُدفع تسجيل الشاشة من المتصفح عبر websocket خاص بـ CDP، منفصل عن قناة أوامر الجلسة، وهذا ما يجعل بث الإطارات الفعلي آمنًا حين لا تكون جلسة Selenium آمنة للعمل مع الخيوط المتعددة.

</TabItem>
</Tabs>

## الأجهزة المحمولة (Appium)

تُلتقط جلسات Appium في الوضع الحيّ ووضع التتبّع، في كلتا اللغتين. تُلتقط جلسة متصفح الجوال مثل جلسة سطح المكتب؛ أما التطبيق الأصلي فيحصل على الأوامر ولقطات الشاشة وبيانات العناصر من شجرة XML الخاصة بالمنصة، دون DOM. يقرر هذا المحوّل بناءً على قدرات بدء التشغيل، لذا يُلتقط نصف webview في التطبيق الهجين كما لو كان لا يزال أصليًا (خدمة WebdriverIO وحدها تتبع تبديلات السياق).

جرّبه باستخدام `pnpm demo:selenium:mobile` (Node.js) أو `pnpm demo:python:mobile` (Python)، مع التشغيل من جذر نسخة مبنية من مستودع devtools (خطوات الإعداد في [تشغيل مثال](/docs/devtools/mobile#running-an-example)). يشغّل `DEVTOOLS_MOBILE_PLATFORM=ios` مواصفات iOS، ويقود `DEVTOOLS_MOBILE=web` متصفح الجهاز نفسه. المتطلبات المسبقة موجودة في [`examples/MOBILE.md`](https://github.com/webdriverio/devtools/blob/main/examples/MOBILE.md)؛ وراجع [صفحة اختبار الأجهزة المحمولة](/docs/devtools/mobile) للمرجع الكامل. تُلتقط شبكة التطبيق الأصلي عندما تضبط الجلسة `appium:intercept: true` ويشغّل Appium الإضافة appium-interceptor؛ راجع [شبكة التطبيق الأصلي](/docs/devtools/mobile#native-app-network).

## القيود

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| القيد | التفاصيل |
|-----------|--------|
| إعادة تشغيل خطوة Cucumber الفرعية | يستهدف مرشّح `--name` في Cucumber السيناريوهات، لا خطوات Gherkin الفردية. لذا تُعطَّل إعادة التشغيل لكل خطوة في لوحة التحكم تحت Cucumber. |
| تنبيه بخصوص الوضع دون واجهة | يحقن `headless: true` القيمة `--headless=old`؛ إذ ينتج `--headless=new` إطارات CDP سوداء بالكامل في تسجيل الشاشة. |
| منفذ العرض الأولي | يعود إطار اللقطة (iframe) في لوحة التحكم إلى 1280×800 حتى يكتمل أول تنقّل ويبلّغ المجمّع في جهة المتصفح عن منفذ العرض الحقيقي. |
| العمّال المتوازيون | تُحمّل كل عملية عامل في Jest/Vitest الإضافة وتبلّغ كتشغيل منفصل، لذا تحتفظ لوحة التحكم بحالة آخر عامل فقط. شغّل بشكل تسلسلي (`--runInBand`) للحصول على تشغيل واحد في لوحة التحكم. |
| Safari في الوضع الحيّ | يوصل Safari الإدخال المُصطنع إلى نافذته الأمامية فقط ومع ذلك يبلّغ عن النجاح، لذا فإن الإدخال الصادر بينما تكون نافذة أخرى في المقدمة لا يصل إلى شيء. في Safari تفتح الإضافة لوحة التحكم خلف المتصفح وتجلب نافذة الجلسة إلى المقدمة قبل كل نقرة على عنصر أو إدخال مفاتيح أو مسح أو إرسال. لا يفتح وضع التتبّع أي نافذة ولا يتأثر بذلك. |

</TabItem>
<TabItem value="python" label="Python">

| القيد | التفاصيل |
|-----------|--------|
| لا لقطة شاشة أو فيديو أو إرفاق Allure لكل اختبار | **أرشيفات التتبّع** لكل اختبار مدعومة (`--devtools-trace-granularity test`)، لكن خيارَي `screenshot` و`video` لكل اختبار في محوّل Node.js وإرفاقه المضمّن عبر `allure-js-commons` لا مقابل لها في Python، فالأرشيفات هي الملفات الناتجة. |
| تراجع الاحتفاظ المراعي لإعادة المحاولات | تُقبل `retain-on-first-failure` و`on-first-retry` و`on-all-retries` و`retain-on-failure-and-retries` لكنها تتصرف تمامًا مثل `retain-on-failure`: لا شيء مما يُرسل يحمل رقم المحاولة، لذا فإن الاختبار المعاد تجربته يكتب فوق نتيجته السابقة. تسجّل الواجهة الخلفية هذا التراجع. |
| Node مطلوب في كل الأوضاع | الواجهة الخلفية تطبيق Node، فهي تخدم مجمّع الصفحة، وتحمل تدفق الأحداث، وتبني أرشيف التتبّع، لذا يجب أن يتوفر Node.js 22.19 أو أحدث حتى في وضع التتبّع حيث لا تُفتح أي نافذة. يعثر المحوّل عليها أو يشغّلها نيابةً عنك. |
| خيارات المتصفح مسؤوليتك | لا يوجد خيار `headless`؛ هيّئ Chrome عبر كائن `Options` الخاص بـ selenium كما تفعل عادةً. |
| فيديو الوضع الحيّ يحتاج إلى ffmpeg | دون `ffmpeg` في `PATH` يُتخطّى ترميز `.webm` مع تحذير بدلًا من خطأ. لا يرمّز وضع التتبّع أي فيديو، إذ تذهب إطاراته إلى شريط الإطارات، لذا لا يحتاج إلى ffmpeg أبدًا. |

</TabItem>
</Tabs>