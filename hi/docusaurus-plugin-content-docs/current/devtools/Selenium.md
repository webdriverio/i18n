---
id: selenium
title: Selenium DevTools
description: "Node.js या Python में किसी भी टेस्ट रनर के साथ Selenium WebDriver टेस्ट में DevTools डिबगिंग UI जोड़ें, और ट्रेस मोड सक्षम करें।"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[WebdriverIO DevTools](https://github.com/webdriverio/devtools) के लिए Selenium WebDriver एडैप्टर - टेस्ट रनर चाहे कोई भी हो, **Node.js** या **Python** में, किसी भी Selenium टेस्ट में वही विज़ुअल डिबगिंग UI लाता है।

Node.js **Mocha**, **Jest**, **Cucumber**, या एक सादी स्क्रिप्ट के साथ काम करता है - प्लगइन अपने आप रनर का पता लगाता है और उसी के अनुसार टेस्ट सीमाओं को जोड़ता है। Python **pytest** या एक सादी स्क्रिप्ट के साथ काम करता है, और pytest के तहत आपकी टेस्ट फ़ाइलों में किसी भी बदलाव की ज़रूरत नहीं होती।

नीचे दिए गए टैब में अपनी भाषा चुनें; आपका चुनाव पूरे पेज पर लागू रहता है।

## इंस्टॉलेशन

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

**Python 3.10+ और `selenium>=4.44` आवश्यक हैं।** दोनों पैकेज मेटाडेटा में घोषित हैं, इसलिए pip उन्हें लागू करता है, बजाय इसके कि आपको रनटाइम पर एक खाली Network टैब मिले। नेटवर्क कैप्चर उस सार्वजनिक BiDi इवेंट API के माध्यम से सब्सक्राइब करता है जिसे selenium ने 4.44 में पुनः जनरेट किया; जिस निजी कनेक्शन को इसने बदला, वह उसी रिलीज़ में हटा दिया गया था, और 4.44 ही Python के लिए न्यूनतम संस्करण तय करता है।

</TabItem>
</Tabs>

## सेटअप

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

नीचे दिया गया हर ब्लॉक `DevTools.configure(...)` कॉल सहित एक **पूर्ण, कॉपी-पेस्ट के लिए तैयार उदाहरण** है। आप जिस रनर का उपयोग करते हैं उसे चुनें, स्निपेट को अपने प्रोजेक्ट में डालें, और चलाएँ।

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

इसे चलाएँ:

```bash
mocha --timeout 60000 tests/example.test.js
```

> विकल्प: प्रति-फ़ाइल import छोड़ दें और पूरे रन के लिए प्लगइन को एक बार लोड करने हेतु `mocha --require @wdio/selenium-devtools` का उपयोग करें।

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

इसे चलाएँ (ESM के लिए experimental फ़्लैग आवश्यक है):

```bash
NODE_OPTIONS=--experimental-vm-modules jest --config jest.config.json
```

### Cucumber

Cucumber के विभाजित लेआउट का अर्थ है तीन छोटी फ़ाइलें - एक प्लगइन लोड करने के लिए, एक World/hooks के लिए, और एक स्टेप डेफ़िनिशन के लिए।

`features/support/setup.js` - प्लगइन लोड करें और एक बार कॉन्फ़िगर करें:

```js
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})
```

`features/support/world.js` - ड्राइवर लाइफ़साइकल:

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

`cucumber.json` - setup फ़ाइल को **सबसे पहले** जोड़ें ताकि कोई भी स्टेप चलने से पहले प्लगइन Selenium को पैच कर दे:

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

इसे चलाएँ:

```bash
cucumber-js --config cucumber.json
```

### सादी Node स्क्रिप्ट (बिना टेस्ट रनर)

यदि आप सीधे `node tests/google.test.js` चलाते हैं, तो प्लगइन के लिए अपने आप हुक करने को कोई रनर नहीं होता। डिफ़ॉल्ट रूप से आपको डैशबोर्ड में एक ही "Selenium Session" पंक्ति मिलती है। एक नामित टेस्ट सीमा पाने के लिए, अपने काम के चारों ओर `DevTools.startTest` / `endTest` कॉल करें:

```js
// tests/google.test.js
import { DevTools } from '@wdio/selenium-devtools'
import { Builder, By, until, Key } from 'selenium-webdriver'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 },
  headless: false
})

async function run () {
  DevTools.startTest('search Google for Selenium')   // वैकल्पिक - टेस्ट पंक्ति को नाम देता है

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

> `startTest` / `endTest` का उपयोग केवल सादी Node स्क्रिप्ट के लिए करें। Mocha / Jest / Cucumber के तहत प्लगइन पहले से जानता है कि हर टेस्ट कब शुरू और समाप्त होता है - इन्हें मैन्युअल रूप से कॉल करने से डुप्लिकेट पंक्तियाँ बनेंगी।

</TabItem>
<TabItem value="python" label="Python">

### pytest

आपकी टेस्ट फ़ाइलों में कुछ भी नहीं जाता - प्लगइन अपने आप खोजा जाता है, और एक फ़्लैग इसे रन के लिए चालू करता है:

```bash
pytest --devtools tests/              # लाइव डैशबोर्ड
pytest --devtools-trace tests/        # इसके बजाय एक ट्रेस आर्काइव लिखें (--devtools निहित है)
```

या इस चुनाव को कमिट कर दें, ताकि किसी को फ़्लैग याद न रखना पड़े:

```toml title="pyproject.toml"
[tool.pytest.ini_options]
devtools = true
# devtools_trace = true                          # डैशबोर्ड के बजाय ट्रेस आर्काइव
# devtools_trace_granularity = "test"            # ... प्रति टेस्ट एक आर्काइव
# devtools_trace_policy = "retain-on-failure"    # ... केवल विफल हुए को रखते हुए
```

`[pytest]` सेक्शन वाली `pytest.ini` भी वही कुंजियाँ लेती है। दोनों ट्रेस सेटिंग्स [कितने आर्काइव, और कौन से रखें](#how-many-archives-and-which-ones-to-keep) के अंतर्गत बताई गई हैं।

कैप्चर हमेशा opt-in होता है - पैकेज इंस्टॉल करने से किसी मौजूदा सूट का व्यवहार कभी नहीं बदलना चाहिए। फ़र्क केवल इतना है कि आप हाँ *कैसे* कहते हैं:

| आप कैसे opt in करते हैं | दायरा |
|---|---|
| `--devtools` / `--devtools-trace` | यह रन |
| `[tool.pytest.ini_options]` में `devtools` / `devtools_trace` | यह प्रोजेक्ट |
| `DEVTOOLS_ENABLE=1` (या `DEVTOOLS_PORT=<n>`, जो पहले से चल रहे डैशबोर्ड से भी जुड़ जाता है) | यह शेल - CI के लिए |

सबसे ऊँची प्राथमिकता वाला लागू होता है: CLI, फिर ini, फिर environment। `pytest -o devtools=false` एक रन के लिए प्रोजेक्ट डिफ़ॉल्ट को बंद कर देता है, यही कारण है कि कोई `--no-devtools` नहीं है। `DEVTOOLS_TRACE=1` ट्रेस मोड चुनता है लेकिन अपने आप कैप्चर चालू **नहीं** करता, इसलिए अपनी स्क्रिप्ट्स के लिए इसे export करने से कभी कोई ऐसा pytest रन कैप्चर नहीं होता जिसके लिए आपने नहीं कहा।

लाइव मोड में डैशबोर्ड एक समर्पित ब्राउज़र विंडो में खुलता है और **रन के बाद भी खुला रहता है** ताकि आप जाँच सकें कि क्या हुआ; समाप्त करने के लिए इसे बंद करें (या `Ctrl-C` दबाएँ)। opt in करने पर भी दो प्रकार के रन कैप्चर नहीं होते: `--collect-only`, जहाँ कुछ भी execute नहीं होता, और ऐसा रन जिसने कोई टेस्ट collect नहीं किया - अन्यथा एक गलत टाइप किया गया पाथ आपके टर्मिनल को एक खाली डैशबोर्ड पर अटका देता।

### सादी Python स्क्रिप्ट (बिना टेस्ट रनर)

आपके मौजूदा Selenium कोड के चारों ओर दो पंक्तियाँ:

```python title="login.py"
import selenium_devtools as devtools
from selenium import webdriver

devtools.enable()                     # डैशबोर्ड खोलें, हर कमांड कैप्चर करें
# devtools.enable(trace=True)         # या: एक trace.zip लिखें और कोई विंडो न खोलें

driver = webdriver.Chrome()
driver.get('https://the-internet.herokuapp.com/login')
driver.find_element('id', 'username').send_keys('tomsmith')
driver.quit()

devtools.wait_for_dashboard_close()   # जाँच के लिए UI खुला रखें (कोई विंडो न खुली हो तो no-op)
devtools.disable()
```

यदि बैकएंड लॉन्च नहीं हो पाता या उस तक पहुँचा नहीं जा सकता, तो `enable()` एक चेतावनी लॉग करता है और `None` लौटाता है। कैप्चर छोड़ दिया जाता है और आपके टेस्ट फिर भी चलते हैं - डैशबोर्ड का न होना कभी किसी सूट को विफल नहीं करता।

### समानांतर रन (`pytest -n`)

**pytest-xdist बिना किसी अतिरिक्त कॉन्फ़िगरेशन के काम करता है।** एक रन में रिपोर्ट करने वाली हर प्रोसेस को एक run id पर सहमत होना पड़ता है, अन्यथा बैकएंड हर कनेक्शन को एक नए रन के रूप में मानता है और पिछले द्वारा कैप्चर किए गए डेटा को मिटा देता है। xdist के साथ वे सहमत होती हैं: प्लगइन **controller** में भी लोड होता है, और वहाँ कैप्चर सक्षम करने से xdist द्वारा किसी worker को spawn करने से पहले ही id तय हो जाती है - workers चाइल्ड प्रोसेस होते हैं, इसलिए वे इसे विरासत में पाते हैं।

जो वास्तव में अलग-अलग रन के रूप में दिखते हैं: दो स्वतंत्र `pytest` इनवोकेशन, या environment के बिना शुरू किया गया कोई worker। ऐसी प्रोसेस को एक रन में जोड़ने के लिए स्वयं `DEVTOOLS_RUN_ID` export करें।

</TabItem>
</Tabs>

## कॉन्फ़िगरेशन विकल्प {#configuration-options}

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| विकल्प | प्रकार | डिफ़ॉल्ट | विवरण |
|--------|------|---------|-------------|
| `port` | `number` | `3000` | DevTools बैकएंड सर्वर के लिए पोर्ट। यदि पहले से उपयोग में हो तो अपने आप बढ़ा दिया जाता है। |
| `hostname` | `string` | `'localhost'` | वह hostname जिससे बैकएंड सर्वर बाइंड होता है। |
| `openUi` | `boolean` | `true` | DevTools UI को एक नई Chrome विंडो में अपने आप खोलें। CI के लिए `false` सेट करें। |
| `captureScreenshots` | `boolean` | `true` | हर WebDriver कमांड के बाद एक स्क्रीनशॉट कैप्चर करें। |
| `headless` | `boolean` | `false` | **टेस्ट** ब्राउज़र को headless चलाएँ (`--headless=old` इंजेक्ट करता है)। DevTools UI विंडो अप्रभावित रहती है। |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | प्रति-सेशन `.webm` वीडियो रिकॉर्डिंग। विकल्प [WebdriverIO Screencast](/docs/devtools/wdio/screencast) पेज से मेल खाते हैं। |
| `rerunCommand` | `string` | auto | प्रति-टेस्ट rerun के लिए कमांड टेम्पलेट। `{{testName}}` प्रतिस्थापित किया जाता है। छोड़े जाने पर रनर argv से अपने आप निकाला जाता है। |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` DevTools UI खोलता है; `trace` इसे छोड़ देता है और इसके बजाय एक पोर्टेबल आर्टिफ़ैक्ट लिखता है। [Trace Mode](/docs/devtools/wdio/trace-mode) देखें। `openUi` को ओवरराइड करता है। |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | ट्रेस आर्टिफ़ैक्ट लेआउट। केवल `mode: 'trace'` होने पर लागू होता है। |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | प्रति सेशन / spec फ़ाइल / टेस्ट एक ट्रेस। `'test'` हर एक को `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip` में लिखता है। केवल `mode: 'trace'` होने पर लागू होता है। [Trace Mode](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity) देखें। |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | कौन से ट्रेस रखने हैं। `traceGranularity: 'test'` के साथ उपयोग होता है। केवल `mode: 'trace'` होने पर लागू होता है। |
| `filmstrip` | `boolean` | `true` | प्लेयर में फ़्रेम-दर-फ़्रेम स्क्रबिंग के लिए ट्रेस में एक सघन, निरंतर screencast रिकॉर्ड करें। केवल `mode: 'trace'` होने पर लागू होता है। |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | ट्रेस मोड + `traceGranularity: 'test'`। प्रति-टेस्ट स्क्रीनशॉट, जो किसी Allure रनर एडैप्टर के सक्रिय होने पर `allure-js-commons` के माध्यम से Allure में इनलाइन (`image/png`) संलग्न किया जाता है। |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | ट्रेस मोड + `traceGranularity: 'test'`। प्रति-टेस्ट screencast वीडियो, दी गई पॉलिसी के अनुसार रखा जाता है, और किसी Allure रनर एडैप्टर के सक्रिय होने पर `allure-js-commons` के माध्यम से Allure में इनलाइन (`video/webm`) संलग्न किया जाता है। |
| `emitArtifactsManifest` | `boolean` | auto | ट्रेस के बगल में `devtools-artifacts-<sessionId>.json` मैनिफ़ेस्ट लिखें — वह सामान्य इंडेक्स जिसका उपयोग reporters/CI उत्पन्न आर्टिफ़ैक्ट्स खोजने के लिए करते हैं। डिफ़ॉल्ट रूप से बंद; `allure-js-commons` रनटाइम सक्रिय होने पर **अपने आप सक्षम** होता है। केवल ट्रेस मोड। |
| `captureAssertions` | `boolean` | `true` | `node:assert` assertions (पास और फ़ेल दोनों) को ट्रेस action पंक्तियों के रूप में कैप्चर करें। opt out करने के लिए `false` सेट करें। |

```js
DevTools.configure({
  port: 3000,
  hostname: 'localhost',
  headless: false,
  openUi: true
})
```

> **CI के लिए**, `headless: true` (टेस्ट ब्राउज़र छिपाएँ) और `openUi: false` (डैशबोर्ड विंडो खोलने का प्रयास न करें - CI वातावरण में कोई डिस्प्ले नहीं होता) दोनों सेट करें। बैकएंड कॉन्फ़िगर किए गए पोर्ट पर चलता रहता है, ताकि ज़रूरत पड़ने पर आप बाद में भी UI खोल सकें।

</TabItem>
<TabItem value="python" label="Python">

कोई options ऑब्जेक्ट नहीं है - आपके टेस्ट कोड में devtools-विशिष्ट कुछ भी दिखने की ज़रूरत नहीं है। pytest के तहत आप एडैप्टर को उसी तरह कॉन्फ़िगर करते हैं जैसे pytest को; एक स्क्रिप्ट `enable()` को कीवर्ड आर्ग्युमेंट पास करती है; जिसका कोई फ़्लैग नहीं है, वह एक environment variable है।

| pytest फ़्लैग | `[tool.pytest.ini_options]` | प्रभाव |
|---|---|---|
| `--devtools` | `devtools = true` | इस रन को कैप्चर करें और डैशबोर्ड खोलें। |
| `--devtools-trace` | `devtools_trace = true` | इस रन को कैप्चर करें और डैशबोर्ड खोलने के बजाय एक ट्रेस आर्काइव लिखें। `--devtools` निहित है। |
| `--devtools-trace-granularity <session\|test>` | `devtools_trace_granularity = test` | पूरे रन के लिए एक आर्काइव (`session`, डिफ़ॉल्ट) या प्रति टेस्ट एक। `--devtools-trace` निहित है। |
| `--devtools-trace-policy <policy>` | `devtools_trace_policy = "retain-on-failure"` | कौन से आर्काइव रखने लायक हैं। `--devtools-trace` निहित है। [कितने आर्काइव, और कौन से रखें](#how-many-archives-and-which-ones-to-keep) देखें। |

सबसे ऊँची प्राथमिकता वाला लागू होता है: CLI, फिर ini, फिर नीचे दिया गया environment। `pytest -o devtools=false` एक रन के लिए प्रोजेक्ट डिफ़ॉल्ट को बंद कर देता है, और `pytest -o devtools_trace_policy=on` बाकी किसी के लिए भी यही करता है।

| वेरिएबल | प्रभाव |
|---|---|
| `DEVTOOLS_ENABLE=1` | कैप्चर चालू करें, जब किसी फ़्लैग या ini विकल्प ने पहले से ऐसा न किया हो। |
| `DEVTOOLS_PORT=<n>` | इस पोर्ट पर पहले से सुन रहे डैशबोर्ड से जुड़ें; यह opt in भी करता है। |
| `DEVTOOLS_HOST=<host>` | वह होस्ट जिस पर डैशबोर्ड तक पहुँचा जाता है (डिफ़ॉल्ट `localhost`)। |
| `DEVTOOLS_TRACE=1` | डैशबोर्ड खोलने के बजाय एक ट्रेस आर्काइव लिखें। सादी स्क्रिप्ट के लिए मोड चुनता है; pytest के तहत यह अपने आप रन को opt in नहीं करता। |
| `DEVTOOLS_TRACE_GRANULARITY=<session\|test>` | ट्रेस मोड: पूरे रन के लिए एक आर्काइव, या प्रति टेस्ट एक। यह ambient है, इसलिए यह कभी अपने आप ट्रेस मोड नहीं चुनता - इसे `DEVTOOLS_TRACE=1` के साथ उपयोग करें। |
| `DEVTOOLS_TRACE_POLICY=<policy>` | ट्रेस मोड: कौन से आर्काइव रखने लायक हैं। यह ambient है, इसलिए यह कभी अपने आप ट्रेस मोड नहीं चुनता - इसे `DEVTOOLS_TRACE=1` के साथ उपयोग करें। |
| `DEVTOOLS_FILMSTRIP=0` | ट्रेस मोड: सघन filmstrip को आर्काइव से बाहर रखें। |
| `DEVTOOLS_A11Y=0` | ट्रेस मोड: प्रति-action A11y ट्री और element rects छोड़ दें। |
| `DEVTOOLS_OPEN=0` | डैशबोर्ड विंडो न खोलें (CI)। |
| `DEVTOOLS_BIDI=0` | BiDi को अक्षम करें, और उसके साथ console और network कैप्चर को भी। |
| `DEVTOOLS_RUN_ID=<id>` | कई प्रोसेस को एक रन में जोड़ें। |
| `DEVTOOLS_BACKEND_CMD=<cmd>` | हल की गई कमांड के बजाय एक स्पष्ट कमांड से बैकएंड शुरू करें। |

बैकएंड एक Node एप्लिकेशन है, इसलिए **हर मोड में Node.js 22.19 या उसके बाद का संस्करण उपलब्ध होना चाहिए** - ट्रेस मोड में भी, जहाँ कोई डैशबोर्ड विंडो कभी नहीं खुलती। यह केवल UI नहीं है: page collector बैकएंड द्वारा परोसा जाता है, पूरी इवेंट स्ट्रीम इसके WebSocket से होकर जाती है, और ट्रेस मोड में यही आर्काइव भी बनाता है। `enable()` पहले ही Node की जाँच करता है और बाद में spawn timeout के रूप में विफल होने के बजाय बताता है कि क्या कमी है। एडैप्टर आपके लिए बैकएंड ढूँढता या लॉन्च करता है - यदि आप इसे स्वयं प्रबंधित करना चाहें तो [बैकएंड को अलग से चलाना](/docs/devtools/dashboard#running-the-backend-on-its-own) देखें, या `DEVTOOLS_PORT` को उस बैकएंड पर इंगित करें जिसे आप पहले से चला रहे हैं, इस स्थिति में स्थानीय Node की ज़रूरत नहीं होती।

### Assertions

पास और फ़ेल होने वाले `assert` स्टेटमेंट **expected** और **actual** वाली पंक्तियों के रूप में दिखाई देते हैं, और विफलताएँ Errors टैब तक पहुँचती हैं। Python का `assert` एक कॉल नहीं बल्कि एक स्टेटमेंट है, इसलिए Node एडैप्टर की `node:assert` पैचिंग के विपरीत, यहाँ wrap करने के लिए कुछ नहीं है - परिणाम रनर से आता है।

**pytest के तहत**, मान assertion rewriter से आते हैं, इसलिए हर पंक्ति में वास्तविक operands होते हैं। *पास होने वाले* assertions कैप्चर करने के लिए pytest के `enable_assertion_pass_hook` की आवश्यकता होती है, जिसे प्लगइन स्वयं चालू कर देता है। एक चेतावनी: pytest हर मॉड्यूल के लिए, *उसे rewrite करते समय*, तय करता है कि वह hook emit करे या नहीं, इसलिए जिस मॉड्यूल का rewritten bytecode प्लगइन इंस्टॉल होने से पहले कैश हो गया था, वह केवल विफलताएँ ही रिपोर्ट करता रहता है। एडैप्टर collection के समय एक बार यह बताता है और हटाने के लिए कैश का नाम देता है - जो हमेशा आपके टेस्ट के बगल वाला `__pycache__` **नहीं** होता, क्योंकि `sys.pycache_prefix` (macOS के सिस्टम Python पर डिफ़ॉल्ट रूप से सेट) हर rewritten मॉड्यूल को एक केंद्रीय ट्री में भेजता है।

**सादी स्क्रिप्ट में** कोई rewriter नहीं होता, इसलिए परिणाम interpreter के line events से आते हैं और मान उस frame से पढ़े जाते हैं जो assert चलाने वाला है। केवल वही reads हल किए जाते हैं जो आपका कोड execute नहीं कर सकते: एक literal या local हल हो जाता है, attribute या कॉल नहीं, क्योंकि `driver.current_url` को दूसरी बार evaluate करने से एक और WebDriver कमांड जारी हो जाएगी।

</TabItem>
</Tabs>

## ट्रेस मोड {#trace-mode}

Headless कैप्चर पाथ, **दोनों भाषाओं में** - कोई DevTools UI विंडो नहीं खुलती, और रन एक `test-results/` फ़ोल्डर में एक पोर्टेबल ट्रेस आर्काइव लिखता है, जिसका स्वरूप WebdriverIO ट्रेस आर्टिफ़ैक्ट जैसा ही होता है। दोनों में अंतर केवल इतना है कि आप आर्टिफ़ैक्ट को कितना ट्यून कर सकते हैं, और उसे कौन बनाता है।

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

सेशन के अंत में एडैप्टर स्वयं `trace-<sessionId>.zip` (या एक डायरेक्टरी) को, हल की गई test / config डायरेक्टरी के बगल में `test-results/` में लिखता है।

```js
DevTools.configure({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // वैकल्पिक; डिफ़ॉल्ट 'zip'
})
```

ट्रेस मोड में बैकएंड port-bind, UI विंडो, और `screencast` विकल्प सभी छोड़ दिए जाते हैं। पूर्ण फ़ीचर संदर्भ (आर्टिफ़ैक्ट सामग्री, viewer, मोबाइल टेस्टिंग, `zip` बनाम `ndjson-directory` कब चुनें) के लिए, [Trace Mode पेज](/docs/devtools/wdio/trace-mode) देखें।

### प्रति-टेस्ट आर्टिफ़ैक्ट और रिटेंशन

`traceGranularity: 'test'` पर हर टेस्ट को अपना आर्टिफ़ैक्ट फ़ोल्डर मिलता है, और `tracePolicy` तय करता है कि कौन से रखे जाएँ (जैसे `retain-on-failure`)। उस मोड में आप प्रति-टेस्ट `screenshot` (PNG) और `video` (`.webm`) भी कैप्चर कर सकते हैं, और फ़्रेम-दर-फ़्रेम स्क्रबिंग के लिए ट्रेस में रिकॉर्ड किया गया एक सघन `filmstrip` सक्षम कर सकते हैं। जब कोई `allure-js-commons` रनर एडैप्टर सक्रिय होता है, तो प्रति-टेस्ट ट्रेस / स्क्रीनशॉट / वीडियो Allure रिपोर्ट में इनलाइन संलग्न होते हैं (और `emitArtifactsManifest` अपने आप सक्षम हो जाता है); अन्यथा उन्हें `test-results/` में लिखा जाता है और मैनिफ़ेस्ट में दर्ज किया जाता है।

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

सेट करने के लिए कोई options ऑब्जेक्ट नहीं है - pytest के तहत एक फ़्लैग, और स्क्रिप्ट में एक कीवर्ड आर्ग्युमेंट:

```bash
pytest --devtools-trace tests/        # --devtools निहित है
DEVTOOLS_TRACE=1 python3 login.py     # सादी स्क्रिप्ट; devtools.enable(trace=True) के समान
```

```python title="login.py"
devtools.enable(trace=True)           # डैशबोर्ड खोलने के बजाय एक trace.zip लिखें
```

आर्काइव उस टेस्ट फ़ाइल के बगल में `test-results/` में बनता है जिससे पहली कैप्चर की गई कमांड आई थी - वही डायरेक्टरी जिसमें screencast वीडियो पहले से लिखे जाते हैं - और इसका नाम `trace-<sessionId>.zip` होता है, या जब आप [प्रति टेस्ट एक आर्काइव](#how-many-archives-and-which-ones-to-keep) माँगते हैं तो हर टेस्ट के नाम पर। जब किसी कमांड में आपकी कोई source location नहीं थी, तो यह वर्तमान डायरेक्टरी के अंतर्गत `test-results/` का उपयोग करता है।

**कोई डैशबोर्ड विंडो नहीं खुलती।** आर्टिफ़ैक्ट ही आउटपुट है, और एक लाइव रन विंडो बंद करने तक उस पर रुका रहता है - विंडो होने से फ़ाइल लिखना एक इंटरैक्टिव सेशन में बदल जाता। बैकएंड फिर भी शुरू होता है, क्योंकि यही आर्काइव *बनाता* है: ट्रेस transforms TypeScript में हैं, इसलिए एक Python रन उनकी दूसरी प्रति साथ रखने के बजाय उन्हें बैकएंड से माँगता है। यही एकमात्र अंतर है जिसमें यह Node.js एडैप्टर के बैकएंड-रहित ट्रेस मोड से अलग है, और यही कारण है कि [हर मोड में Node.js 22.19 या उसके बाद का संस्करण आवश्यक है](#configuration-options)।

कमांड पंक्तियों, प्रति-कमांड स्क्रीनशॉट और selectors, तथा console और network के अलावा, जिन्हें दोनों मोड कैप्चर करते हैं, आर्काइव में ये भी होते हैं:

| आर्काइव में | डिफ़ॉल्ट | Opt out |
|---|---|---|
| DOM time-travel - वह mutation स्ट्रीम जिसे प्लेयर क़दम-दर-क़दम replay करता है | चालू | - |
| सघन filmstrip - screencast फ़्रेम, जो `.webm` के बजाय ट्रेस में रखे जाते हैं | चालू | `DEVTOOLS_FILMSTRIP=0` |
| A11y ट्री और element overlay - हर action के साथ पढ़े जाते हैं, प्रति कमांड दो अतिरिक्त round trips की कीमत पर | चालू | `DEVTOOLS_A11Y=0` |

ट्रेस मोड कोई `.webm` encode नहीं करता, इसलिए इसे `ffmpeg` की ज़रूरत नहीं होती - फ़्रेम *ही* filmstrip हैं।

**Export का अनुरोध रन समाप्त होने पर किया जाता है, प्रोसेस के exit होने पर नहीं** - pytest `sessionfinish` पर अनुरोध करता है और स्क्रिप्ट का `disable()` transport बंद करने से पहले export करता है, इसलिए CI को आर्टिफ़ैक्ट मिलता है, चाहे कोई विंडो कभी शामिल रही हो या नहीं।

### कितने आर्काइव, और कौन से रखें {#how-many-archives-and-which-ones-to-keep}

दो सेटिंग्स यह तय करती हैं, और ट्रेस मोड के बाहर दोनों का कोई अर्थ नहीं है।

**Granularity** - रन कितने आर्काइव लिखता है:

| `--devtools-trace-granularity` | परिणाम |
|---|---|
| `session` (डिफ़ॉल्ट) | पूरे रन के लिए एक आर्काइव। |
| `test` | प्रति टेस्ट एक आर्काइव, जिसमें केवल उसी टेस्ट के अपने कमांड, console, network, DOM mutations, a11y ट्री और screencast फ़्रेम होते हैं। |

यहाँ जानबूझकर कोई `spec` मान नहीं है। इस एडैप्टर का spec *ही* इसकी टेस्ट फ़ाइल है, इसलिए तीसरा नाम चुपचाप ऊपर के दोनों में से किसी एक का ही अर्थ रखता।

**Policy** - उनमें से कौन से आर्काइव रखे जाते हैं:

| `--devtools-trace-policy` | परिणाम |
|---|---|
| `on` (डिफ़ॉल्ट) | सब कुछ रखें। |
| `retain-on-failure` | केवल वही रखें जो विफल हुआ। |
| `retain-on-first-failure`, `on-first-retry`, `on-all-retries`, `retain-on-failure-and-retries` | स्वीकार किए जाते हैं, लेकिन आज वे **बिल्कुल `retain-on-failure` की तरह** व्यवहार करते हैं। |

वे अंतिम चार अभी retry-aware नहीं हैं, और इसे स्पष्ट रूप से कहना बेहतर है, बजाय इसके कि आपको किसी अपेक्षित आर्काइव से इसका पता चले: यह एडैप्टर wire पर जो कुछ भी भेजता है उसमें कोई attempt संख्या नहीं होती, इसलिए दोबारा चलाया गया टेस्ट अपने ही पिछले परिणाम को ओवरराइट कर देता है और retry-aware प्रश्न पूछा ही नहीं जा सकता। बैकएंड दिखावा करने के बजाय इस सीमा को लॉग करता है। इनमें से किसी को केवल तभी चुनें जब आप `retain-on-failure` को ऐसे नाम के तहत चाहते हों जिसका बाद में अधिक अर्थ होगा।

दोनों मिलकर:

| Granularity | Policy | आपको क्या मिलता है |
|---|---|---|
| `test` | `retain-on-failure` | केवल वे टेस्ट जो विफल हुए। |
| `session` | `retain-on-failure` | पूरे रन का आर्काइव, यदि उसमें कुछ भी विफल हुआ। |
| कोई भी | `on` | सब कुछ। |

`test` granularity पर रखा गया हर आर्काइव अपने टेस्ट के नाम पर होता है (`trace-<test>-<hash>.zip`, hash टेस्ट के nodeid से लिया जाता है ताकि एक ही शीर्षक वाले दो parametrised केस एक-दूसरे को ओवरराइट न कर सकें)। जो रन कुछ नहीं रखता, वह कुछ भी नहीं लिखता, और यही उद्देश्य है - आपके पास बचे आर्काइव वही हैं जो खोलने लायक हैं, और अस्वीकृत export कोई विफलता नहीं बल्कि पॉलिसी का सही काम करना है।

इन्हें एक रन के लिए सेट करें:

```bash
pytest --devtools-trace-granularity test --devtools-trace-policy retain-on-failure tests/
```

या इन्हें कमिट करें, ताकि प्रोजेक्ट क्लोन करने वाला कोई भी योगदानकर्ता बिना बताए उसी तरह कैप्चर करे:

```ini title="pytest.ini"
[pytest]
devtools_trace = true
devtools_trace_granularity = test
devtools_trace_policy = retain-on-failure
```

`pyproject.toml` में `[tool.pytest.ini_options]` वही कुंजियाँ लेता है, और `pytest -o devtools_trace_policy=on tests/` फ़ाइल संपादित किए बिना एक रन के लिए उनमें से किसी एक को ओवरराइड करता है। पूरी तरह टिप्पणी किया गया संस्करण - हर सेटिंग और हर environment variable, साथ में हर एक किसलिए है - रिपो में [`examples/selenium/python-test/trace-py-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/python-test/trace-py-test) पर उपलब्ध है।

सादी स्क्रिप्ट वही दोनों कीवर्ड आर्ग्युमेंट के रूप में पास करती है:

```python title="login.py"
devtools.enable(trace_granularity='test', trace_policy='retain-on-failure')
```

**इनमें से किसी एक को भी स्पष्ट रूप से निर्दिष्ट करना ट्रेस मोड चुन लेता है।** CLI फ़्लैग, ini विकल्प और `enable()` आर्ग्युमेंट सभी इसे निहित करते हैं, क्योंकि लाइव मोड में policy या granularity का कोई अर्थ नहीं है और मोड के बिना किसी एक का पालन करने से चुपचाप वह छूट जाता जो आपने माँगा था। `DEVTOOLS_TRACE_POLICY` और `DEVTOOLS_TRACE_GRANULARITY` जानबूझकर ऐसा **नहीं** करते: export किया गया वेरिएबल ambient होता है और हो सकता है उसी शेल में किसी अन्य स्क्रिप्ट के लिए सेट किया गया हो, इसलिए उसके आधार पर लाइव रन को ट्रेस मोड में बदलना वह डैशबोर्ड छीन लेता जिसे खोने के लिए किसी ने नहीं कहा - उन्हें `DEVTOOLS_TRACE=1` के साथ उपयोग करें। जो रन किसी export की गई ट्रेस सेटिंग को अनदेखा करता है, वह एक चेतावनी लॉग करता है, बजाय इसके कि आपको किसी ऐसे आर्काइव पर ध्यान देना पड़े जो कभी बना ही नहीं।

</TabItem>
</Tabs>

### ट्रेस देखना

किसी भी ट्रेस `.zip` को first-party प्लेयर में खोलें — वही DevTools UI, एक समर्पित **player** मोड में:

```bash
npx show-trace path/to/trace.zip      # ऐसे प्रोजेक्ट में जो एडैप्टर इंस्टॉल करता है
pnpm show-trace path/to/trace.zip     # devtools monorepo से
```

`show-trace` bin `@wdio/selenium-devtools` के साथ आता है, इसलिए यह उसे इंस्टॉल करने वाले किसी भी प्रोजेक्ट में उपलब्ध है — कोई अतिरिक्त dependency नहीं। Python प्रोजेक्ट कोई Node.js एडैप्टर इंस्टॉल नहीं करता, लेकिन वही प्लेयर उस बैकएंड के साथ आता है जिसे एडैप्टर पहले से आपके लिए लाता है: `npx -p @wdio/devtools-backend show-trace path/to/trace.zip`।

क्योंकि Selenium एडैप्टर हर स्क्रीनशॉट के साथ पेज की **DOM mutation स्ट्रीम** और प्रति-कमांड element / accessibility स्नैपशॉट कैप्चर करता है, एक Selenium ट्रेस प्लेयर के पूरे फ़ीचर सेट का उपयोग करता है — DOM time-travel, A11y टैब और pick-locator overlay, Copy-for-LLM के साथ Transcript टैब, Cucumber Feature → Scenario → Step nesting, और स्क्रब करने योग्य टाइमलाइन। एक Python ट्रेस में वही mutation स्ट्रीम और प्रति-action स्नैपशॉट होता है (वहाँ element / a11y read केवल ट्रेस मोड में होता है, और डिफ़ॉल्ट रूप से चालू रहता है); Gherkin nesting ही एकमात्र प्रविष्टि है जिसका कोई pytest समकक्ष नहीं है।

ट्रेस एक पोर्टेबल NDJSON schema का उपयोग करता है, इसलिए वही `.zip` (या डायरेक्टरी) अन्य संगत ट्रेस viewers में भी खुलता है। पूर्ण walkthrough के लिए **[Trace Player](/docs/devtools/trace-player)** पेज देखें।

## सार्वजनिक API

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

```js
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure(opts)             // रनटाइम विकल्प सेट करें (ऊपर देखें)
DevTools.startTest(name, meta?)      // एक नामित टेस्ट सीमा चिह्नित करें (केवल सादी Node स्क्रिप्ट)
DevTools.endTest('passed'|'failed'|'skipped'|'pending')
```

Mocha / Jest / Cucumber के तहत प्लगइन रनर के लाइफ़साइकल में अपने आप हुक करता है, इसलिए आपको मैन्युअल रूप से `startTest` / `endTest` की ज़रूरत नहीं है - इन्हें कॉल करने से डुप्लिकेट पंक्तियाँ बनेंगी।

</TabItem>
<TabItem value="python" label="Python">

```python
import selenium_devtools as devtools

devtools.enable()                     # कनेक्ट और instrument करें; idempotent
devtools.disable()                    # बंद करें; दो बार कॉल करना सुरक्षित
devtools.wait_for_dashboard_close()   # विंडो बंद होने तक ब्लॉक करें
devtools.get_capturer()               # लाइव SessionCapturer, या None
devtools.dashboard_url()              # वह URL जिस पर डैशबोर्ड परोसा जाता है
```

`enable()` एक वैकल्पिक `host` और `port`, साथ ही कीवर्ड आर्ग्युमेंट लेता है:

```python
devtools.enable(trace=True)                            # एक trace.zip लिखें; कोई विंडो न खोलें
devtools.enable(trace=True, filmstrip=False)           # ... सघन filmstrip के बिना
devtools.enable(trace=True, a11y=False)                # ... प्रति-action element / a11y read के बिना
devtools.enable(trace_granularity='test')              # ... प्रति टेस्ट एक आर्काइव (trace=True निहित है)
devtools.enable(trace_policy='retain-on-failure')      # ... केवल विफल हुए को रखें (trace=True निहित है)
```

`filmstrip` और `a11y` केवल ट्रेस मोड पर लागू होते हैं, और दोनों डिफ़ॉल्ट रूप से चालू होते हैं (`DEVTOOLS_FILMSTRIP` / `DEVTOOLS_A11Y` environment से यही सेट करते हैं)। `trace` के न दिए जाने पर `DEVTOOLS_TRACE` का उपयोग होता है। `trace_granularity` और `trace_policy` के न दिए जाने पर `DEVTOOLS_TRACE_GRANULARITY` / `DEVTOOLS_TRACE_POLICY` का उपयोग होता है, और इनमें से किसी एक को पास करना अपने आप ट्रेस मोड चालू कर देता है - [कितने आर्काइव, और कौन से रखें](#how-many-archives-and-which-ones-to-keep) देखें। स्वीकृत सेट से बाहर का मान चेतावनी देता है और डिफ़ॉल्ट पर लौट जाता है, बजाय इसके कि बाद में किसी गायब फ़ाइल के रूप में पता चले।

pytest के तहत प्लगइन यह सब `--devtools` / `--devtools-trace` (या संबंधित ini विकल्प, या `DEVTOOLS_ENABLE=1`) से संचालित करता है, और टेस्ट सीमाएँ pytest के अपने hooks से आती हैं - कॉल करने के लिए कोई `startTest` / `endTest` समकक्ष नहीं है।

</TabItem>
</Tabs>

## उदाहरण

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

काम करने वाले उदाहरण रिपो की शीर्ष-स्तरीय `examples/` डायरेक्टरी में हैं। वर्कस्पेस को एक बार बिल्ड करें (`pnpm install && pnpm build`), फिर रिपो रूट से चलाएँ। `pnpm demo:selenium` डिफ़ॉल्ट (Cucumber) उदाहरण चलाता है; प्रति-रनर वेरिएंट ये हैं:

| डायरेक्टरी | रनर | कमांड |
|-----------|--------|---------|
| [`examples/selenium/mocha-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/mocha-test) | Mocha | `pnpm --filter @wdio/selenium-devtools example:mocha` |
| [`examples/selenium/jest-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/jest-test) | Jest | `pnpm --filter @wdio/selenium-devtools example:jest` |
| [`examples/selenium/cucumber-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/cucumber-test) | Cucumber | `pnpm demo:selenium` |

</TabItem>
<TabItem value="python" label="Python">

Python उदाहरण [`examples/selenium/python-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/python-test) में हैं। एडैप्टर इंस्टॉल करें और वर्कस्पेस को एक बार बिल्ड करें (`pnpm install && pnpm build`, ताकि बैकएंड मौजूद हो), फिर रिपो रूट से चलाएँ:

| उदाहरण | यह क्या दिखाता है | कमांड |
|---|---|---|
| `web_form.py` | तीन पंक्तियों वाला सादी-स्क्रिप्ट सेटअप | `pnpm demo:python` |
| `login.py` | एक लंबी स्क्रिप्ट: नेविगेशन, फ़ॉर्म भरना, assertions | `pnpm demo:python:login` |
| `trace-py-test/` | एक class और एक module-level टेस्ट के साथ pytest, साथ ही एक `pytest.ini` जो ट्रेस मोड, granularity और retention को कमिट करता है - इसकी हर सेटिंग पर टिप्पणी है कि वह क्या करती है | `pnpm demo:python:pytest` |

</TabItem>
</Tabs>

## फ़ीचर्स

Selenium एडैप्टर दोनों भाषाओं में WebdriverIO जैसा ही DevTools UI अनुभव प्रदान करता है। नीचे दिया गया हर फ़ीचर बिना किसी प्रति-फ़ीचर कॉन्फ़िग के अपने आप कैप्चर होता है — Node.js में आधारभूत `DevTools.configure({})`, या Python में `pytest --devtools`। Console और network Selenium के BiDi handlers के माध्यम से स्ट्रीम होते हैं, और Node.js में injected-collector fallback भी होता है। लिंक हर फ़ीचर के पूर्ण संदर्भ पर ले जाते हैं।

- **[Interactive Test Rerunning & Visualization](/docs/devtools/wdio/interactive-test-rerunning)** - लाइव ब्राउज़र प्रीव्यू, प्रति-कमांड स्क्रीनशॉट, और एक-क्लिक में टेस्ट/सूट को दोबारा चलाना
- **[Preserve & Rerun (Compare)](/docs/devtools/wdio/preserve-and-rerun)** - विफल टेस्ट का स्नैपशॉट लें, उसे दोबारा चलाएँ, और दोनों रन की साथ-साथ तुलना करें
- **[Multi-Framework Support](/docs/devtools/wdio/multi-framework-support)** - Node.js में Mocha, Jest, Cucumber, या सादी स्क्रिप्ट का अपने आप पता लगाता है; Python में pytest या सादी स्क्रिप्ट
- **[Console Logs](/docs/devtools/wdio/console-logs)** - ब्राउज़र console आउटपुट कैप्चर करें और जाँचें
- **[Network Logs](/docs/devtools/wdio/network-logs)** - API कॉल और नेटवर्क गतिविधि की निगरानी करें
- **[Metadata](/docs/devtools/wdio/metadata)** - प्रति ब्राउज़र सेशन, सेशन capabilities, environment, और timing
- **[TestLens](/docs/devtools/wdio/testlens)** - किसी भी कमांड से उस source line पर जाएँ जिसने उसे ट्रिगर किया
- **[Session Screencast](/docs/devtools/wdio/screencast)** - ब्राउज़र सेशन की स्वचालित वीडियो रिकॉर्डिंग
- **[Trace Mode](/docs/devtools/wdio/trace-mode)** - Headless कैप्चर जो एक पोर्टेबल `trace.zip` उत्पन्न करता है (कोई UI विंडो नहीं), दोनों भाषाओं में, और दोनों में प्रति-टेस्ट slicing और retention के साथ (Node.js में `traceGranularity` / `tracePolicy`; Python में `--devtools-trace-granularity` / `--devtools-trace-policy`)। प्रति-टेस्ट `screenshot` / `video` और इनलाइन Allure attachment केवल Node.js में उपलब्ध हैं; [ट्रेस मोड](#trace-mode) देखें

Node.js में, screencast ही एकमात्र फ़ीचर है जिसके अपने विकल्प हैं ([कॉन्फ़िगरेशन विकल्प](#configuration-options) देखें):

```js
DevTools.configure({ screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 } })
```

Python में इसे किसी कॉन्फ़िगरेशन की ज़रूरत नहीं है: Chrome CDP पर फ़्रेम स्ट्रीम करता है, अन्य ब्राउज़र प्रति कमांड एक स्क्रीनशॉट का उपयोग करते हैं, और `.webm` encode करने के लिए `PATH` पर `ffmpeg` होना चाहिए। ट्रेस मोड में वही फ़्रेम `.webm` के बजाय आर्काइव की सघन filmstrip बन जाते हैं, इसलिए कुछ भी encode नहीं होता और `ffmpeg` की ज़रूरत नहीं होती।

## यह कैसे काम करता है

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

प्लगइन import के समय `selenium-webdriver` के `Builder`, `WebDriver`, और `WebElement` prototypes को पैच करता है:

- **`Builder.build()`** - निर्माण के बाद, ड्राइवर को session capturer के साथ पंजीकृत किया जाता है और DevTools बैकएंड एक detached चाइल्ड प्रोसेस में शुरू किया जाता है।
- **हर सार्वजनिक `WebDriver` / `WebElement` मेथड** - कमांड कैप्चर (args + result + screenshot + call source) के साथ wrap किया जाता है।
- **`WebDriver.quit()`** - एक awaited cleanup hook मूल quit चलने से पहले screencast encoding, WebSocket buffer, और अंतिम metadata को flush करता है।

जब BiDi उपलब्ध होता है (Chrome ≥114), तो console logs, JavaScript exceptions, और network events सीधे Selenium BiDi handlers के माध्यम से स्ट्रीम होते हैं। अन्यथा प्लगइन एक injected ब्राउज़र-साइड collector स्क्रिप्ट का उपयोग करता है।

वही injected collector पेज की **DOM mutation स्ट्रीम** और प्रति-कमांड element / accessibility स्नैपशॉट भी रिकॉर्ड करता है, ताकि एक ट्रेस में हर स्टेप पर लाइव DOM को फिर से बनाने के लिए पर्याप्त जानकारी हो (प्रति-navigation mapping) — यही प्लेयर के DOM time-travel और A11y टैब को संभव बनाता है, न कि केवल स्क्रीनशॉट वाला replay।

</TabItem>
<TabItem value="python" label="Python">

पैच करने के लिए कोई prototypes नहीं हैं, इसलिए Python एडैप्टर इसके बजाय एक मेथड को wrap करता है:

- **`WebDriver.execute()`** - वह एकल chokepoint जिससे होकर हर कमांड गुज़रती है। Element मेथड भी इसी को delegate करते हैं (`self._parent.execute`), इसलिए `click`, `send_keys` और `text` element classes को छुए बिना उसी wrapper द्वारा कैप्चर हो जाते हैं।
- **सेशन सेटअप** - पहली वास्तविक कमांड पर ड्राइवर पंजीकृत होता है, metadata भेजा जाता है, और BiDi, collector और screencast तैयार किए जाते हैं।
- **`quit()`** - सेशन बंद होने से पहले intercept किया जाता है, ताकि ड्राइवर के मौजूद रहते ही screencast encode हो जाए और अंतिम फ़्रेम flush हो जाएँ।

Console, JavaScript exceptions और network selenium की BiDi layer (4.44+) पर स्ट्रीम होते हैं, जिसे एडैप्टर `newSession` अनुरोध में `webSocketUrl` capability इंजेक्ट करके आपके लिए सक्षम करता है।

**DOM mutation स्ट्रीम** Node.js वाले उसी ब्राउज़र-साइड collector से आती है, जो BiDi के माध्यम से document start पर पंजीकृत होता है ताकि पेज अपनी किसी भी स्क्रिप्ट के चलने से पहले स्वयं को instrument कर ले। Chrome पर screencast ब्राउज़र द्वारा उसके अपने CDP websocket पर भेजा जाता है — जो सेशन के कमांड चैनल से अलग है, और यही Selenium सेशन के thread-safe न होने पर भी वास्तविक फ़्रेम स्ट्रीम को सुरक्षित बनाता है।

</TabItem>
</Tabs>

## सीमाएँ

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| सीमा | विवरण |
|-----------|--------|
| Cucumber leaf-step rerun | Cucumber का `--name` फ़िल्टर scenarios को लक्षित करता है, अलग-अलग Gherkin steps को नहीं। Cucumber के तहत डैशबोर्ड का प्रति-स्टेप rerun अक्षम है। |
| Headless मोड से जुड़ी चेतावनी | `headless: true` `--headless=old` इंजेक्ट करता है; `--headless=new` screencast में पूरी तरह काले CDP फ़्रेम उत्पन्न करता है। |
| प्रारंभिक viewport | डैशबोर्ड का स्नैपशॉट iframe तब तक 1280×800 का उपयोग करता है जब तक पहला navigation पूरा न हो जाए और ब्राउज़र-साइड collector वास्तविक viewport रिपोर्ट न कर दे। |

</TabItem>
<TabItem value="python" label="Python">

| सीमा | विवरण |
|-----------|--------|
| कोई प्रति-टेस्ट स्क्रीनशॉट, वीडियो या Allure attach नहीं | प्रति-टेस्ट **ट्रेस आर्काइव** समर्थित हैं (`--devtools-trace-granularity test`), लेकिन Node.js एडैप्टर के प्रति-टेस्ट `screenshot` और `video` विकल्पों और उसके इनलाइन `allure-js-commons` attachment का कोई Python समकक्ष नहीं है - आर्काइव ही आर्टिफ़ैक्ट हैं। |
| Retry-aware retention सीमित है | `retain-on-first-failure`, `on-first-retry`, `on-all-retries` और `retain-on-failure-and-retries` स्वीकार किए जाते हैं लेकिन बिल्कुल `retain-on-failure` की तरह व्यवहार करते हैं: wire पर किसी भी चीज़ में attempt संख्या नहीं होती, इसलिए दोबारा चलाया गया टेस्ट अपने ही पिछले परिणाम को ओवरराइट कर देता है। बैकएंड इस सीमा को लॉग करता है। |
| हर मोड में Node आवश्यक है | बैकएंड एक Node एप्लिकेशन है - यह page collector परोसता है, इवेंट स्ट्रीम ले जाता है, और ट्रेस आर्काइव बनाता है - इसलिए Node.js 22.19 या उसके बाद का संस्करण ट्रेस मोड में भी मौजूद होना चाहिए, जहाँ कोई विंडो नहीं खुलती। एडैप्टर आपके लिए इसे ढूँढता या लॉन्च करता है। |
| ब्राउज़र विकल्प आपके नियंत्रण में हैं | कोई `headless` विकल्प नहीं है; Chrome को selenium के अपने `Options` ऑब्जेक्ट के माध्यम से वैसे ही कॉन्फ़िगर करें जैसे आप सामान्य रूप से करते हैं। |
| लाइव-मोड वीडियो के लिए ffmpeg आवश्यक है | `PATH` पर `ffmpeg` न होने पर `.webm` encode त्रुटि के बजाय चेतावनी के साथ छोड़ दिया जाता है। ट्रेस मोड कुछ भी encode नहीं करता - इसके फ़्रेम filmstrip में जाते हैं - इसलिए इसे कभी ffmpeg की ज़रूरत नहीं होती। |

</TabItem>
</Tabs>