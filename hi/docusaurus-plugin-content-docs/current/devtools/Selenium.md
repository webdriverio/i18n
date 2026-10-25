---
id: selenium
title: Selenium DevTools
description: "किसी भी टेस्ट रनर के साथ Node.js या Python में Selenium WebDriver टेस्ट में DevTools डीबगिंग UI जोड़ें, और ट्रेस मोड सक्षम करें।"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[WebdriverIO DevTools](https://github.com/webdriverio/devtools) के लिए Selenium WebDriver एडॉप्टर - यह किसी भी Selenium टेस्ट में, **Node.js** या **Python** में, टेस्ट रनर चाहे कोई भी हो, वही विज़ुअल डीबगिंग UI लाता है।

Node.js **Mocha**, **Jest**, **Cucumber**, या एक साधारण स्क्रिप्ट के साथ काम करता है - प्लगइन रनर को स्वतः पहचान लेता है और उसके अनुसार टेस्ट की सीमाएँ जोड़ता है। Python **pytest** या एक साधारण स्क्रिप्ट के साथ काम करता है, और pytest के अंतर्गत आपकी टेस्ट फ़ाइलों में किसी भी बदलाव की आवश्यकता नहीं होती।

नीचे दिए गए टैब में अपनी भाषा चुनें; आपकी पसंद पूरे पेज पर लागू रहती है।

## इंस्टॉलेशन

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

```bash
npm install @wdio/selenium-devtools
```

`selenium-webdriver` 4.8 या उसके बाद का संस्करण आवश्यक है। स्क्रीनकास्ट `.webm` को एनकोड करने के लिए `PATH` पर `ffmpeg` होना चाहिए।

</TabItem>
<TabItem value="python" label="Python">

```bash
pip install selenium-devtools-py
```

**Python 3.10+ और `selenium>=4.44` आवश्यक हैं।** दोनों पैकेज मेटाडेटा में घोषित हैं, इसलिए pip इन्हें लागू करता है, बजाय इसके कि आपको रनटाइम पर एक खाली Network टैब मिले। नेटवर्क कैप्चर उस सार्वजनिक BiDi इवेंट API के माध्यम से सब्सक्राइब करता है जिसे selenium ने 4.44 में पुनः जनरेट किया था; जिस निजी कनेक्शन की जगह इसने ली, वह उसी रिलीज़ में हटा दिया गया, और 4.44 ही Python के लिए न्यूनतम सीमा तय करता है।

फिर बैकएंड को एक बार इंस्टॉल करें:

```bash
selenium-devtools install-backend
```

pip यह आपके लिए नहीं कर सकता: wheel में कोई इंस्टॉल हुक नहीं होता, और बैकएंड एक Node पैकेज है। इसे छोड़ देने पर भी रन काम करते हैं, और पहली बार उपयोग पर `npx` से `@wdio/devtools-backend` को फ़ेच करने का विकल्प अपनाते हैं। इस फ़ॉलबैक में हर रन पर रजिस्ट्री तक एक राउंड ट्रिप लगती है और यदि कोई प्रॉक्सी पैकेज को अस्वीकार कर दे तो यह सेशन के बीच में विफल हो जाता है। `selenium-devtools backend-path` बताता है कि बैकएंड इंस्टॉल है या नहीं, `install-backend --force` एक खराब इंस्टॉलेशन को फिर से इंस्टॉल करता है, और `uninstall-backend` उसे हटा देता है। इंस्टॉलेशन `$XDG_CACHE_HOME` (डिफ़ॉल्ट `~/.cache`) के अंतर्गत होता है।

`PATH` पर मौजूद ऐसा `chromedriver` जो आपके Chrome से मेल नहीं खाता, हर Selenium रन को तोड़ देता है; यदि `PATH` पर कोई नहीं है, तो Selenium Manager एक मेल खाने वाला ढूँढ लेता है।

</TabItem>
</Tabs>

## सेटअप

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

न्यूनतम आवश्यकता आपकी टेस्ट फ़ाइल में एक import, `import '@wdio/selenium-devtools'`, है। Mocha, Jest और Cucumber के अंतर्गत और कुछ आवश्यक नहीं है; `DevTools.configure(...)` वैकल्पिक है और केवल डिफ़ॉल्ट बदलता है।

नीचे दिया गया हर ब्लॉक `DevTools.configure(...)` कॉल सहित एक **पूर्ण, कॉपी-पेस्ट के लिए तैयार उदाहरण** है। जिस रनर का आप उपयोग करते हैं उसे चुनें, स्निपेट को अपने प्रोजेक्ट में डालें, और चलाएँ।

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

> विकल्प: प्रति-फ़ाइल import को छोड़ दें और पूरे रन के लिए प्लगइन को एक बार लोड करने हेतु `mocha --require @wdio/selenium-devtools` का उपयोग करें। यदि आप गैर-डिफ़ॉल्ट विकल्प चाहते हैं, तो फिर भी आपको कहीं एक बार `DevTools.configure(...)` कॉल करना होगा।

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

Cucumber के विभाजित लेआउट का अर्थ है तीन छोटी फ़ाइलें - एक प्लगइन लोड करने के लिए, एक World/hooks के लिए, और एक step definitions के लिए।

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

`cucumber.json` - सेटअप फ़ाइल को **सबसे पहले** जोड़ें ताकि कोई भी step चलने से पहले प्लगइन Selenium को पैच कर दे:

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

### साधारण Node स्क्रिप्ट (बिना टेस्ट रनर)

यदि आप सीधे `node tests/google.test.js` चलाते हैं, तो प्लगइन के स्वतः हुक करने के लिए कोई रनर नहीं होता। डिफ़ॉल्ट रूप से आपको डैशबोर्ड में एक ही "Selenium Session" पंक्ति मिलती है। नामित टेस्ट सीमा पाने के लिए, अपने काम के चारों ओर `DevTools.startTest` / `endTest` कॉल करें:

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

> `startTest` / `endTest` का उपयोग केवल साधारण Node स्क्रिप्ट के लिए करें। Mocha / Jest / Cucumber के अंतर्गत प्लगइन पहले से जानता है कि हर टेस्ट कब शुरू और समाप्त होता है - इन्हें मैन्युअल रूप से कॉल करने से डुप्लिकेट पंक्तियाँ बन जाएँगी।

</TabItem>
<TabItem value="python" label="Python">

### pytest

आपकी टेस्ट फ़ाइलों में कुछ नहीं जाता - प्लगइन स्वतः खोजा जाता है, और एक फ़्लैग इसे रन के लिए चालू करता है:

```bash
pytest --devtools tests/              # लाइव डैशबोर्ड
pytest --devtools-trace tests/        # इसके बजाय एक ट्रेस आर्काइव लिखें (--devtools निहित है)
```

या इस विकल्प को कमिट कर दें, ताकि किसी को फ़्लैग याद न रखना पड़े:

```toml title="pyproject.toml"
[tool.pytest.ini_options]
devtools = true
# devtools_trace = true                          # डैशबोर्ड के बजाय ट्रेस आर्काइव
# devtools_trace_granularity = "test"            # ... प्रति टेस्ट एक आर्काइव
# devtools_trace_policy = "retain-on-failure"    # ... केवल विफल हुए को रखते हुए
```

`[pytest]` सेक्शन वाली `pytest.ini` भी यही keys लेती है। दोनों ट्रेस सेटिंग्स को [कितने आर्काइव, और कौन से रखने हैं](#how-many-archives-and-which-ones-to-keep) के अंतर्गत समझाया गया है।

कैप्चर हमेशा opt-in होता है - पैकेज इंस्टॉल करने से किसी मौजूदा सूट का व्यवहार कभी नहीं बदलना चाहिए। अंतर केवल इतना है कि आप हाँ *कैसे* कहते हैं:

| आप कैसे opt in करते हैं | दायरा |
|---|---|
| `--devtools` / `--devtools-trace` | यह रन |
| `[tool.pytest.ini_options]` में `devtools` / `devtools_trace` | यह प्रोजेक्ट |
| `DEVTOOLS_ENABLE=1` (या `DEVTOOLS_PORT=<n>`, जो पहले से चल रहे डैशबोर्ड से भी जुड़ जाता है) | यह शेल - CI के लिए |

सर्वोच्च प्राथमिकता जीतती है: CLI, फिर ini, फिर environment। `pytest -o devtools=false` एक रन के लिए प्रोजेक्ट डिफ़ॉल्ट को बंद कर देता है, इसीलिए कोई `--no-devtools` नहीं है। `DEVTOOLS_TRACE=1` ट्रेस मोड चुनता है लेकिन अपने आप कैप्चर को चालू **नहीं** करता, इसलिए अपनी स्क्रिप्ट्स के लिए इसे export करने से कभी ऐसा pytest रन कैप्चर नहीं होता जो आपने नहीं माँगा था।

लाइव मोड में डैशबोर्ड एक समर्पित ब्राउज़र विंडो में खुलता है और **रन के बाद भी खुला रहता है** ताकि आप देख सकें कि क्या हुआ; समाप्त करने के लिए इसे बंद करें (या `Ctrl-C`)। दो प्रकार के रन opt in करने पर भी कैप्चर नहीं होते: `--collect-only`, जहाँ कुछ भी निष्पादित नहीं होता, और ऐसा रन जिसने कोई टेस्ट collect नहीं किया - अन्यथा एक गलत टाइप किया गया पथ आपके टर्मिनल को एक खाली डैशबोर्ड पर अटका देता।

### साधारण Python स्क्रिप्ट (बिना टेस्ट रनर)

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

devtools.wait_for_dashboard_close()   # निरीक्षण के लिए UI खुला रखें (कोई विंडो खुली न होने पर no-op)
devtools.disable()
```

यदि बैकएंड लॉन्च या उस तक पहुँचा नहीं जा सकता, तो `enable()` एक चेतावनी लॉग करता है और `None` लौटाता है। कैप्चर छोड़ दिया जाता है और आपके टेस्ट फिर भी चलते हैं - डैशबोर्ड का न होना कभी किसी सूट को विफल नहीं करता।

### समानांतर रन (`pytest -n`)

**pytest-xdist बिना किसी अतिरिक्त कॉन्फ़िगरेशन के काम करता है।** एक रन में रिपोर्ट करने वाली हर प्रोसेस को एक run id पर सहमत होना होता है, अन्यथा बैकएंड हर कनेक्ट को एक नया रन मानता है और पिछले द्वारा कैप्चर किए गए को मिटा देता है। xdist के साथ वे सहमत होती हैं: प्लगइन **controller** में भी लोड होता है, और वहाँ कैप्चर सक्षम करने से xdist किसी भी worker को spawn करने से पहले id तय हो जाती है - workers चाइल्ड प्रोसेस हैं, इसलिए वे इसे विरासत में पाते हैं।

जो वास्तव में अलग-अलग रन के रूप में दिखते हैं: दो स्वतंत्र `pytest` invocations, या environment के बिना शुरू किया गया worker। ऐसी प्रोसेसों को एक रन में जोड़ने के लिए स्वयं `DEVTOOLS_RUN_ID` export करें।

### रन नियंत्रण (Run, Rerun, Run-all)

तीनों pytest के अंतर्गत और साधारण स्क्रिप्ट के लिए काम करते हैं। Rerun चल रही प्रोसेस को भेजा गया संदेश नहीं है: बैकएंड उस कमांड से एक नई प्रोसेस spawn करता है जिसे एडॉप्टर स्टार्टअप पर प्रकाशित करता है, और जिस नियंत्रण को वह पूरा नहीं कर सकता वह एक कारण के साथ अक्षम रहता है।

- pytest के अंतर्गत हर नियंत्रण अपनी पंक्ति को **nodeid** (`file.py`, `file.py::Class`, `file.py::Class::test`) से चुनता है, उसी interpreter का उपयोग करते हुए जिसने आपके टेस्ट चलाए। साधारण स्क्रिप्ट के लिए तीनों स्क्रिप्ट को फिर से लॉन्च करते हैं।
- रन को सीमित करने वाले विकल्प लक्षित rerun से हटा दिए जाते हैं: `-k`, `-m`, `--deselect`, `--lf`/`--ff`/`--sw`, और `-n`/`--dist`। बचा हुआ फ़िल्टर नामित टेस्ट को केवल शून्य तक सीमित कर सकता था, जिसे pytest एक साफ़ exit के रूप में रिपोर्ट करता है।
- Rerun pytest की **rootdir** में spawn होता है, और Run-all कमांड में positional पथ absolute बना दिए जाते हैं। *सापेक्ष* पथ वाला विकल्प (`-c`, `--junitxml`) rerun पर rootdir के सापेक्ष हल होता है।
- Rerun **उसी डैशबोर्ड में रिपोर्ट करता है जिसमें आपने बटन दबाया** और कोई दूसरी विंडो नहीं खोलता। Run-all लक्षित rerun के बाद भी आपका मूल invocation रखता है।

दो सीमाएँ: जब आप कनेक्ट हुए तब पहले से चल रहा डैशबोर्ड उसी डायरेक्टरी को रखता है जिसमें वह शुरू हुआ था, और `pytest -n` के अंतर्गत डैशबोर्ड की स्थिति उस worker की होती है जो सबसे अंत में कनेक्ट हुआ।

### Preserve & Rerun

विफल पंक्ति में Rerun के बगल में एक दूसरा बटन होता है। यह प्रयास का स्नैपशॉट लेता है, टेस्ट को फिर से चलाता है, और **Compare** टैब दोनों का diff दिखाता है: commands, console और network साथ-साथ। स्नैपशॉट rerun शुरू होने से पहले लिया जाता है; नया रन कनेक्ट हो जाने के बाद preserve करना अस्वीकार कर दिया जाता है (HTTP 409)। साधारण Rerun हर baseline को हटा देता है, इसलिए सामान्य rerun के बाद Compare टैब गायब हो जाता है।

</TabItem>
</Tabs>

## कॉन्फ़िगरेशन विकल्प {#configuration-options}

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| विकल्प | प्रकार | डिफ़ॉल्ट | विवरण |
|--------|------|---------|-------------|
| `port` | `number` | `3000` | DevTools बैकएंड सर्वर के लिए पोर्ट। पहले से उपयोग में होने पर स्वतः बढ़ाया जाता है। |
| `hostname` | `string` | `'localhost'` | वह hostname जिससे बैकएंड सर्वर bind होता है। |
| `openUi` | `boolean` | `true` | DevTools UI को एक नई Chrome विंडो में स्वतः खोलें। CI के लिए `false` सेट करें। |
| `captureScreenshots` | `boolean` | `true` | हर सफल WebDriver कमांड के बाद एक स्क्रीनशॉट कैप्चर करें। |
| `headless` | `boolean` | `false` | **टेस्ट** ब्राउज़र को headless चलाएँ (`--headless=old` इंजेक्ट करता है)। DevTools UI विंडो प्रभावित नहीं होती। |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | प्रति-सेशन `.webm` वीडियो रिकॉर्डिंग। विकल्प [WebdriverIO Screencast](/docs/devtools/wdio/screencast) पेज से मेल खाते हैं। |
| `rerunCommand` | `string` | auto | प्रति-टेस्ट rerun के लिए कमांड टेम्पलेट। `{{testName}}` प्रतिस्थापित किया जाता है। छोड़ने पर रनर argv से स्वतः व्युत्पन्न होता है। |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` DevTools UI खोलता है; `trace` इसे छोड़कर इसके बजाय एक पोर्टेबल artifact लिखता है। देखें [Trace Mode](/docs/devtools/wdio/trace-mode)। `openUi` को ओवरराइड करता है। |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | ट्रेस artifact का लेआउट। केवल `mode: 'trace'` होने पर लागू होता है। |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | प्रति सेशन / spec फ़ाइल / टेस्ट एक ट्रेस। `'test'` हर एक को `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip` में लिखता है। केवल `mode: 'trace'` होने पर लागू होता है। देखें [Trace Mode](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity)। |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | कौन से ट्रेस रखने हैं। `traceGranularity: 'test'` के साथ जोड़ा जाता है। केवल `mode: 'trace'` होने पर लागू होता है। |
| `filmstrip` | `boolean` | `true` | प्लेयर में frame-by-frame scrubbing के लिए ट्रेस में एक सघन, निरंतर स्क्रीनकास्ट रिकॉर्ड करें। केवल `mode: 'trace'` होने पर लागू होता है। |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | ट्रेस मोड + `traceGranularity: 'test'`। प्रति-टेस्ट स्क्रीनशॉट, Allure रनर एडॉप्टर सक्रिय होने पर `allure-js-commons` के माध्यम से Allure में inline (`image/png`) संलग्न। |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | ट्रेस मोड + `traceGranularity: 'test'`। प्रति-टेस्ट स्क्रीनकास्ट वीडियो, दी गई policy के अनुसार रखा गया, Allure रनर एडॉप्टर सक्रिय होने पर `allure-js-commons` के माध्यम से Allure में inline (`video/webm`) संलग्न। |
| `emitArtifactsManifest` | `boolean` | auto | ट्रेस के बगल में `devtools-artifacts-<sessionId>.json` manifest लिखें — वह सामान्य index जिसे reporters/CI उत्पादित artifacts खोजने के लिए उपयोग करते हैं। डिफ़ॉल्ट रूप से बंद; `allure-js-commons` रनटाइम सक्रिय होने पर **स्वतः सक्षम** होता है। केवल ट्रेस मोड। |
| `captureAssertions` | `boolean` | `true` | `node:assert` assertions (पास और फ़ेल दोनों) को ट्रेस action पंक्तियों के रूप में कैप्चर करें। opt out करने के लिए `false` सेट करें। |

```js
DevTools.configure({
  port: 3000,
  hostname: 'localhost',
  headless: false,
  openUi: true
})
```

> `port` और `hostname` केवल बैकएंड शुरू होने से पहले प्रभावी होते हैं, जो पहला ड्राइवर बनने पर होता है, इसलिए उससे पहले `DevTools.configure(...)` कॉल करें; बाद की कॉल एक चेतावनी के साथ इन्हें अनदेखा कर देती है। Rerun अपने पैरेंट का बैकएंड ही रखता है, चाहे वे कुछ भी कहें।

> **CI के लिए**, `headless: true` (टेस्ट ब्राउज़र छिपाएँ) और `openUi: false` (डैशबोर्ड विंडो खोलने का प्रयास न करें - CI वातावरण में कोई डिस्प्ले नहीं होता) दोनों सेट करें। बैकएंड कॉन्फ़िगर किए गए पोर्ट पर चलता रहता है ताकि ज़रूरत पड़ने पर आप बाद में भी UI खोल सकें।

</TabItem>
<TabItem value="python" label="Python">

कोई options ऑब्जेक्ट नहीं है - आपके टेस्ट कोड में devtools-विशिष्ट कुछ भी दिखने की आवश्यकता नहीं है। pytest के अंतर्गत आप एडॉप्टर को उसी तरह कॉन्फ़िगर करते हैं जैसे pytest को; एक स्क्रिप्ट `enable()` को keyword arguments देती है; जिसका कोई फ़्लैग नहीं है वह एक environment variable है।

| pytest फ़्लैग | `[tool.pytest.ini_options]` | प्रभाव |
|---|---|---|
| `--devtools` | `devtools = true` | इस रन को कैप्चर करें और डैशबोर्ड खोलें। |
| `--devtools-trace` | `devtools_trace = true` | इस रन को कैप्चर करें और डैशबोर्ड खोलने के बजाय एक ट्रेस आर्काइव लिखें। `--devtools` निहित है। |
| `--devtools-trace-granularity <session\|test>` | `devtools_trace_granularity = test` | पूरे रन के लिए एक आर्काइव (`session`, डिफ़ॉल्ट) या प्रति टेस्ट एक। `--devtools-trace` निहित है। |
| `--devtools-trace-policy <policy>` | `devtools_trace_policy = "retain-on-failure"` | कौन से आर्काइव रखने लायक हैं। `--devtools-trace` निहित है। देखें [कितने आर्काइव, और कौन से रखने हैं](#how-many-archives-and-which-ones-to-keep)। |

सर्वोच्च प्राथमिकता जीतती है: CLI, फिर ini, फिर नीचे दिया गया environment। `pytest -o devtools=false` एक रन के लिए प्रोजेक्ट डिफ़ॉल्ट को बंद कर देता है, और `pytest -o devtools_trace_policy=on` बाकी किसी के लिए भी यही करता है।

| वेरिएबल | प्रभाव |
|---|---|
| `DEVTOOLS_ENABLE=1` | कैप्चर चालू करें, जब किसी फ़्लैग या ini विकल्प ने पहले से ऐसा न किया हो। |
| `DEVTOOLS_PORT=<n>` | इस पोर्ट पर पहले से सुन रहे डैशबोर्ड से जुड़ें; यह opt in भी करता है। |
| `DEVTOOLS_HOST=<host>` | वह host जिस पर डैशबोर्ड तक पहुँचा जाता है (डिफ़ॉल्ट `localhost`)। |
| `DEVTOOLS_TRACE=1` | डैशबोर्ड खोलने के बजाय एक ट्रेस आर्काइव लिखें। साधारण स्क्रिप्ट के लिए मोड चुनता है; pytest के अंतर्गत यह अपने आप रन को opt in नहीं करता। |
| `DEVTOOLS_TRACE_GRANULARITY=<session\|test>` | ट्रेस मोड: पूरे रन के लिए एक आर्काइव, या प्रति टेस्ट एक। Ambient है, इसलिए यह अपने आप कभी ट्रेस मोड नहीं चुनता - इसे `DEVTOOLS_TRACE=1` के साथ जोड़ें। |
| `DEVTOOLS_TRACE_POLICY=<policy>` | ट्रेस मोड: कौन से आर्काइव रखने लायक हैं। Ambient है, इसलिए यह अपने आप कभी ट्रेस मोड नहीं चुनता - इसे `DEVTOOLS_TRACE=1` के साथ जोड़ें। |
| `DEVTOOLS_FILMSTRIP=0` | ट्रेस मोड: सघन filmstrip को आर्काइव से बाहर रखें। |
| `DEVTOOLS_A11Y=0` | ट्रेस मोड: प्रति-action A11y tree और element rects छोड़ दें। |
| `DEVTOOLS_OPEN=0` | डैशबोर्ड विंडो न खोलें (CI)। |
| `DEVTOOLS_BIDI=0` | BiDi को अक्षम करें, और उसके साथ console और network कैप्चर को भी। |
| `DEVTOOLS_RUN_ID=<id>` | कई प्रोसेसों को एक रन में जोड़ें। |
| `DEVTOOLS_BACKEND_CMD=<cmd>` | हल किए गए कमांड के बजाय एक स्पष्ट कमांड से बैकएंड शुरू करें। |

ये आपके लिए सेट किए जाते हैं, आपके द्वारा नहीं (यहाँ सूचीबद्ध हैं ताकि कोई अप्रत्याशित मान पहचाना जा सके): `DEVTOOLS_RUNNER_CWD`, `DEVTOOLS_APP_REUSE` / `DEVTOOLS_APP_HOST` / `DEVTOOLS_APP_PORT`, और `DEVTOOLS_RERUN_LAUNCH_COMMAND`।

बैकएंड एक Node एप्लिकेशन है, इसलिए **हर मोड में Node.js 22.19 या उसके बाद का संस्करण उपलब्ध होना चाहिए** - ट्रेस मोड में भी, जहाँ कभी कोई डैशबोर्ड विंडो नहीं खुलती। यह केवल UI नहीं है: पेज collector बैकएंड द्वारा परोसा जाता है, पूरा इवेंट स्ट्रीम उसके WebSocket पर जाता है, और ट्रेस मोड में यही आर्काइव भी बनाता है। `enable()` शुरुआत में ही Node की जाँच करता है और बाद में spawn timeout के रूप में विफल होने के बजाय बताता है कि क्या गायब है। एडॉप्टर आपके लिए बैकएंड को इस क्रम में ढूँढता या लॉन्च करता है: वह बैकएंड जिसने इस रन को rerun के रूप में spawn किया, फिर `DEVTOOLS_PORT` (attach), फिर `DEVTOOLS_BACKEND_CMD`, फिर `selenium-devtools install-backend` द्वारा इंस्टॉल किया गया बैकएंड, फिर `npx @wdio/devtools-backend@<pinned version>`। Pin प्रति एडॉप्टर रिलीज़ तय होता है ताकि बैकएंड हमेशा एडॉप्टर के wire contract के अनुसार बात करे। यदि आप इसे स्वयं प्रबंधित करना पसंद करेंगे तो [बैकएंड को अलग से चलाना](/docs/devtools/dashboard#running-the-backend-on-its-own) देखें, या `DEVTOOLS_PORT` को किसी ऐसे बैकएंड पर इंगित करें जिसे आप पहले से चला रहे हैं, जिस स्थिति में किसी स्थानीय Node की आवश्यकता नहीं है।

### Assertions

पास और फ़ेल होने वाले `assert` statements **expected** और **actual** वाली पंक्तियों के रूप में दिखाई देते हैं, और विफलताएँ Errors टैब तक पहुँचती हैं। Python का `assert` एक कॉल के बजाय एक statement है, इसलिए Node एडॉप्टर के `node:assert` पैचिंग के विपरीत यहाँ wrap करने के लिए कुछ नहीं है - परिणाम रनर से आता है।

**pytest के अंतर्गत**, मान assertion rewriter से आते हैं, इसलिए हर पंक्ति में वास्तविक operands होते हैं। *पास होने वाले* assertions को कैप्चर करने के लिए pytest के `enable_assertion_pass_hook` की आवश्यकता होती है, जिसे प्लगइन अपने लिए स्वयं चालू करता है। एक सावधानी: pytest प्रति मॉड्यूल, *उसे rewrite करते समय*, तय करता है कि वह hook emit करना है या नहीं, इसलिए जिस मॉड्यूल का rewritten bytecode प्लगइन इंस्टॉल होने से पहले cache हो गया था, वह केवल विफलताएँ ही रिपोर्ट करता रहता है। एडॉप्टर collection के समय एक बार यह बताता है और हटाने योग्य cache का नाम बताता है - जो हमेशा आपके टेस्ट के बगल वाला `__pycache__` **नहीं** होता, क्योंकि `sys.pycache_prefix` (macOS के सिस्टम Python पर डिफ़ॉल्ट रूप से सेट) हर rewritten मॉड्यूल को एक केंद्रीय tree में भेज देता है।

**साधारण स्क्रिप्ट में** कोई rewriter नहीं होता, इसलिए परिणाम interpreter के line events से आते हैं और मान उस frame से पढ़े जाते हैं जो assert चलाने वाला है। केवल वही reads हल किए जाते हैं जो आपका कोड निष्पादित नहीं कर सकते: एक literal या local हल होता है, एक attribute या कॉल नहीं, क्योंकि `driver.current_url` का दूसरी बार मूल्यांकन करने से एक और WebDriver कमांड जारी हो जाता।

</TabItem>
</Tabs>

## ट्रेस मोड {#trace-mode}

Headless कैप्चर पथ, **दोनों भाषाओं** में - कोई DevTools UI विंडो नहीं खुलती, और रन एक `test-results/` फ़ोल्डर में एक पोर्टेबल ट्रेस आर्काइव लिखता है, जिसका आकार WebdriverIO ट्रेस artifact जैसा ही होता है। दोनों में अंतर केवल इतना है कि आप artifact को कितना ट्यून कर सकते हैं, और इसे कौन बनाता है।

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

सेशन के अंत में एडॉप्टर स्वयं `trace-<sessionId>.zip` (या एक डायरेक्टरी) को हल की गई test / config डायरेक्टरी के बगल में `test-results/` में लिखता है।

```js
DevTools.configure({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // वैकल्पिक; डिफ़ॉल्ट 'zip'
})
```

ट्रेस मोड में बैकएंड port-bind, UI विंडो, और `screencast` विकल्प सभी छोड़ दिए जाते हैं। पूर्ण फ़ीचर संदर्भ (artifact की सामग्री, viewer, मोबाइल टेस्टिंग, `zip` बनाम `ndjson-directory` कब चुनें) के लिए, [Trace Mode पेज](/docs/devtools/wdio/trace-mode) देखें।

### प्रति-टेस्ट artifacts और retention

`traceGranularity: 'test'` पर हर टेस्ट को अपना artifact फ़ोल्डर मिलता है, और `tracePolicy` तय करता है कि कौन से रखे जाएँ (उदा. `retain-on-failure`)। उस मोड में आप प्रति-टेस्ट `screenshot` (PNG) और `video` (`.webm`) भी कैप्चर कर सकते हैं, और frame-by-frame scrubbing के लिए ट्रेस में रिकॉर्ड की गई एक सघन `filmstrip` सक्षम कर सकते हैं। जब `allure-js-commons` रनर एडॉप्टर सक्रिय होता है, तो प्रति-टेस्ट traces / screenshots / videos Allure रिपोर्ट में inline संलग्न किए जाते हैं (और `emitArtifactsManifest` स्वतः सक्षम हो जाता है); अन्यथा वे `test-results/` में लिखे जाते हैं और manifest में दर्ज होते हैं।

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

सेट करने के लिए कोई options ऑब्जेक्ट नहीं है - pytest के अंतर्गत एक फ़्लैग, स्क्रिप्ट में एक keyword argument:

```bash
pytest --devtools-trace tests/        # --devtools निहित है
DEVTOOLS_TRACE=1 python3 login.py     # साधारण स्क्रिप्ट; devtools.enable(trace=True) के समान
```

```python title="login.py"
devtools.enable(trace=True)           # डैशबोर्ड खोलने के बजाय एक trace.zip लिखें
```

आर्काइव उस टेस्ट फ़ाइल के बगल में `test-results/` में आता है जहाँ से पहला कैप्चर किया गया कमांड आया था - वही डायरेक्टरी जिसमें स्क्रीनकास्ट वीडियो पहले से लिखे जाते हैं - और इसका नाम `trace-<sessionId>.zip` होता है, या जब आप [प्रति टेस्ट एक आर्काइव](#how-many-archives-and-which-ones-to-keep) माँगते हैं तो हर टेस्ट के नाम पर। जब किसी कमांड में आपका कोई source location नहीं था, तो यह वर्तमान डायरेक्टरी के अंतर्गत `test-results/` का उपयोग करता है।

**कोई डैशबोर्ड विंडो नहीं खुलती।** Artifact ही आउटपुट है, और लाइव रन विंडो पर तब तक रुका रहता है जब तक आप उसे बंद न करें - एक विंडो फ़ाइल लिखने को एक इंटरैक्टिव सेशन में बदल देती। बैकएंड फिर भी शुरू होता है, क्योंकि यही आर्काइव *बनाता* है: ट्रेस transforms TypeScript में हैं, इसलिए Python रन उनकी दूसरी प्रति साथ लाने के बजाय बैकएंड से उन्हें माँगता है। यही एकमात्र तरीका है जिसमें यह Node.js एडॉप्टर के बैकएंड-मुक्त ट्रेस मोड से अलग है, और यही कारण है कि [हर मोड में Node.js 22.19 या उसके बाद का संस्करण आवश्यक है](#configuration-options)।

दोनों मोड जो command पंक्तियाँ, प्रति-कमांड screenshots और selectors, console और network कैप्चर करते हैं, उनके अलावा आर्काइव में यह भी होता है:

| आर्काइव में | डिफ़ॉल्ट | Opt out |
|---|---|---|
| DOM time-travel - mutation stream जिसे प्लेयर step by step replay करता है | चालू | - |
| सघन filmstrip - स्क्रीनकास्ट frames, `.webm` के बजाय ट्रेस में शामिल | चालू | `DEVTOOLS_FILMSTRIP=0` |
| A11y tree और element overlay - हर action के बगल में पढ़ा गया, प्रति कमांड दो अतिरिक्त round trips पर | चालू | `DEVTOOLS_A11Y=0` |

ट्रेस मोड कोई `.webm` एनकोड नहीं करता, इसलिए इसे `ffmpeg` की आवश्यकता नहीं है - frames *ही* filmstrip हैं।

**Export रन समाप्त होने पर माँगा जाता है, प्रोसेस exit होने पर नहीं** - pytest `sessionfinish` पर माँगता है और स्क्रिप्ट का `disable()` transport बंद करने से पहले export करता है, इसलिए CI को artifact मिलता है चाहे कोई विंडो कभी शामिल रही हो या नहीं।

### कितने आर्काइव, और कौन से रखने हैं {#how-many-archives-and-which-ones-to-keep}

दो सेटिंग्स यह तय करती हैं, और ट्रेस मोड के बाहर दोनों का कोई अर्थ नहीं है।

**Granularity** - रन कितने आर्काइव लिखता है:

| `--devtools-trace-granularity` | परिणाम |
|---|---|
| `session` (डिफ़ॉल्ट) | पूरे रन के लिए एक आर्काइव। |
| `test` | प्रति टेस्ट एक आर्काइव, जिसमें केवल उसी टेस्ट के अपने commands, console, network, DOM mutations, a11y trees और स्क्रीनकास्ट frames होते हैं। |

यहाँ जानबूझकर कोई `spec` मान नहीं है। इस एडॉप्टर का spec *ही* इसकी टेस्ट फ़ाइल है, इसलिए एक तीसरा नाम चुपचाप ऊपर के दोनों में से किसी एक का ही अर्थ रखता।

**Policy** - उनमें से कौन से आर्काइव रखे जाते हैं:

| `--devtools-trace-policy` | परिणाम |
|---|---|
| `on` (डिफ़ॉल्ट) | सब कुछ रखें। |
| `retain-on-failure` | केवल विफल हुए को रखें। |
| `retain-on-first-failure`, `on-first-retry`, `on-all-retries`, `retain-on-failure-and-retries` | स्वीकार किए जाते हैं, लेकिन आज वे **बिल्कुल `retain-on-failure` की तरह** व्यवहार करते हैं। |

अंतिम चार अभी retry-aware नहीं हैं, और यह स्पष्ट रूप से कहना उचित है बजाय इसके कि आपको किसी अपेक्षित आर्काइव से यह पता चले: यह एडॉप्टर wire पर जो कुछ भी भेजता है उसमें कोई attempt number नहीं होता, इसलिए दोबारा चलाया गया टेस्ट अपने पिछले परिणाम को ओवरराइट कर देता है और retry-aware प्रश्न पूछा ही नहीं जा सकता। बैकएंड कुछ और दिखाने के बजाय इस गिरावट को लॉग करता है। इनमें से किसी को तभी चुनें जब आप `retain-on-failure` को ऐसे नाम के अंतर्गत चाहते हैं जिसका बाद में अधिक अर्थ होगा।

दोनों मिलकर:

| Granularity | Policy | आपको क्या मिलता है |
|---|---|---|
| `test` | `retain-on-failure` | केवल वे टेस्ट जो विफल हुए। |
| `session` | `retain-on-failure` | पूरे रन का आर्काइव, यदि उसमें कुछ भी विफल हुआ। |
| कोई भी | `on` | सब कुछ। |

`test` granularity पर रखा गया हर आर्काइव अपने टेस्ट के नाम पर होता है (`trace-<test>-<hash>.zip`, hash टेस्ट के nodeid से लिया जाता है ताकि एक ही title साझा करने वाले दो parametrised cases एक-दूसरे को ओवरराइट न कर सकें)। जो रन कुछ नहीं रखता वह कुछ भी नहीं लिखता, और यही उद्देश्य है - आपके पास जो आर्काइव बचते हैं वे खोलने लायक होते हैं, और अस्वीकृत export विफलता नहीं बल्कि policy का काम करना है।

इन्हें एक रन के लिए सेट करें:

```bash
pytest --devtools-trace-granularity test --devtools-trace-policy retain-on-failure tests/
```

या इन्हें कमिट करें, ताकि प्रोजेक्ट clone करने वाला contributor बिना बताए उसी तरह कैप्चर करे:

```ini title="pytest.ini"
[pytest]
devtools_trace = true
devtools_trace_granularity = test
devtools_trace_policy = retain-on-failure
```

`pyproject.toml` में `[tool.pytest.ini_options]` भी यही keys लेता है, और `pytest -o devtools_trace_policy=on tests/` फ़ाइल संपादित किए बिना एक रन के लिए उनमें से किसी एक को ओवरराइड करता है। एक पूर्ण टिप्पणी-युक्त संस्करण - हर सेटिंग और हर environment variable, प्रत्येक किस लिए है इसके साथ - repo में [`examples/selenium-py/pytest/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium-py/pytest) पर है।

साधारण स्क्रिप्ट यही दोनों keyword arguments के रूप में देती है:

```python title="login.py"
devtools.enable(trace_granularity='test', trace_policy='retain-on-failure')
```

**इनमें से किसी को भी स्पष्ट रूप से नाम देने से ट्रेस मोड चुना जाता है।** CLI फ़्लैग, ini विकल्प और `enable()` argument सभी इसे निहित करते हैं, क्योंकि लाइव मोड में policy या granularity का कोई अर्थ नहीं है और मोड के बिना किसी का पालन करने से आपकी माँगी गई चीज़ चुपचाप छूट जाती। `DEVTOOLS_TRACE_POLICY` और `DEVTOOLS_TRACE_GRANULARITY` जानबूझकर ऐसा **नहीं** करते: export किया गया वेरिएबल ambient होता है और हो सकता है उसी शेल में किसी अन्य स्क्रिप्ट के लिए सेट किया गया हो, इसलिए उसके आधार पर लाइव रन को ट्रेस मोड में बदलना वह डैशबोर्ड छीन लेता जिसे खोना किसी ने नहीं माँगा था - इन्हें `DEVTOOLS_TRACE=1` के साथ जोड़ें। जो रन किसी export की गई ट्रेस सेटिंग को अनदेखा करता है वह एक चेतावनी लॉग करता है, बजाय इसके कि आपको एक ऐसा आर्काइव ढूँढना पड़े जो कभी बना ही नहीं।

</TabItem>
</Tabs>

### ट्रेस देखना

किसी भी ट्रेस `.zip` को first-party प्लेयर में खोलें — वही DevTools UI एक समर्पित **player** मोड में:

```bash
npx show-trace path/to/trace.zip      # ऐसे प्रोजेक्ट में जो एडॉप्टर इंस्टॉल करता है
pnpm show-trace path/to/trace.zip     # devtools monorepo से
```

`show-trace` bin `@wdio/selenium-devtools` के साथ आता है, इसलिए यह किसी भी ऐसे प्रोजेक्ट में उपलब्ध है जो इसे इंस्टॉल करता है — कोई अतिरिक्त dependency नहीं। Python प्रोजेक्ट कोई Node.js एडॉप्टर इंस्टॉल नहीं करता, लेकिन वही प्लेयर उस बैकएंड के साथ आता है जिसे एडॉप्टर पहले से आपके लिए फ़ेच करता है: `npx -p @wdio/devtools-backend show-trace path/to/trace.zip`।

चूँकि Selenium एडॉप्टर हर स्क्रीनशॉट के साथ पेज का **DOM mutation stream** और प्रति-कमांड element / accessibility snapshot कैप्चर करता है, एक Selenium ट्रेस प्लेयर के पूरे फ़ीचर सेट को चलाता है — DOM time-travel, A11y टैब और pick-locator overlay, Copy-for-LLM के साथ Transcript टैब, Cucumber Feature → Scenario → Step nesting, और scrub करने योग्य timeline। Python ट्रेस में वही mutation stream और प्रति-action snapshot होता है (वहाँ element / a11y read केवल ट्रेस मोड में होता है, और डिफ़ॉल्ट रूप से चालू); Gherkin nesting ही एकमात्र प्रविष्टि है जिसका कोई pytest समकक्ष नहीं है।

ट्रेस एक पोर्टेबल NDJSON schema का उपयोग करता है, इसलिए वही `.zip` (या डायरेक्टरी) अन्य संगत ट्रेस viewers में भी खुलता है। पूर्ण walkthrough के लिए **[Trace Player](/docs/devtools/trace-player)** पेज देखें।

## सार्वजनिक API

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

```js
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure(opts)             // रनटाइम विकल्प सेट करें (ऊपर देखें)
DevTools.startTest(name, meta?)      // एक नामित टेस्ट सीमा चिह्नित करें (केवल साधारण Node स्क्रिप्ट)
DevTools.endTest('passed'|'failed'|'skipped'|'pending')
```

Mocha / Jest / Cucumber के अंतर्गत प्लगइन रनर के लाइफ़साइकल को स्वतः हुक करता है, इसलिए आपको `startTest` / `endTest` मैन्युअल रूप से कॉल करने की आवश्यकता नहीं है - इन्हें कॉल करने से डुप्लिकेट पंक्तियाँ बन जाएँगी।

</TabItem>
<TabItem value="python" label="Python">

```python
import selenium_devtools as devtools

devtools.enable()                     # कनेक्ट और instrument करें; idempotent
devtools.disable()                    # बंद करें; दो बार कॉल करना सुरक्षित है
devtools.wait_for_dashboard_close()   # विंडो बंद होने तक रुकें
devtools.get_capturer()               # लाइव SessionCapturer, या None
devtools.dashboard_url()              # वह URL जिस पर डैशबोर्ड परोसा जाता है
devtools.export_trace()               # ट्रेस आर्काइव अभी लिखें (केवल ट्रेस मोड)
```

`enable()` एक वैकल्पिक `host` और `port`, तथा keyword arguments लेता है:

```python
devtools.enable(trace=True)                            # एक trace.zip लिखें; कोई विंडो न खोलें
devtools.enable(trace=True, filmstrip=False)           # ... सघन filmstrip के बिना
devtools.enable(trace=True, a11y=False)                # ... प्रति-action element / a11y read के बिना
devtools.enable(trace_granularity='test')              # ... प्रति टेस्ट एक आर्काइव (trace=True निहित)
devtools.enable(trace_policy='retain-on-failure')      # ... केवल विफल हुए को रखें (trace=True निहित)
```

`filmstrip` और `a11y` केवल ट्रेस मोड पर लागू होते हैं, और प्रत्येक डिफ़ॉल्ट रूप से चालू होता है (`DEVTOOLS_FILMSTRIP` / `DEVTOOLS_A11Y` environment से यही सेट करते हैं)। `trace` के लिए `DEVTOOLS_TRACE` फ़ॉलबैक है। `trace_granularity` और `trace_policy` के लिए `DEVTOOLS_TRACE_GRANULARITY` / `DEVTOOLS_TRACE_POLICY` फ़ॉलबैक हैं, और इनमें से किसी एक को पास करने से ट्रेस मोड अपने आप चालू हो जाता है - देखें [कितने आर्काइव, और कौन से रखने हैं](#how-many-archives-and-which-ones-to-keep)। स्वीकृत सेट से बाहर का मान चेतावनी देता है और डिफ़ॉल्ट पर लौट आता है, बजाय इसके कि बाद में एक गायब फ़ाइल के रूप में पता चले।

pytest के अंतर्गत प्लगइन यह सब `--devtools` / `--devtools-trace` (या मेल खाने वाले ini विकल्प, या `DEVTOOLS_ENABLE=1`) से संचालित करता है, और टेस्ट सीमाएँ pytest के अपने hooks से आती हैं - कॉल करने के लिए कोई `startTest` / `endTest` समकक्ष नहीं है।

</TabItem>
</Tabs>

## उदाहरण

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

काम करने वाले उदाहरण repo की शीर्ष-स्तरीय `examples/` डायरेक्टरी में हैं। वर्कस्पेस को एक बार build करें (`pnpm install && pnpm build`), फिर repo root से चलाएँ। `pnpm demo:selenium` डिफ़ॉल्ट (Cucumber) उदाहरण चलाता है; प्रति-रनर वेरिएंट ये हैं:

| डायरेक्टरी | रनर | कमांड |
|-----------|--------|---------|
| [`examples/selenium-js/mocha/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium-js/mocha) | Mocha | `pnpm --filter @wdio/selenium-devtools example:mocha` |
| [`examples/selenium-js/mocha/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium-js/mocha) | Mocha + allure-mocha | `pnpm --filter @wdio/selenium-devtools example:mocha:allure` |
| [`examples/selenium-js/jest/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium-js/jest) | Jest | `pnpm --filter @wdio/selenium-devtools example:jest` |
| [`examples/selenium-js/cucumber/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium-js/cucumber) | Cucumber | `pnpm demo:selenium` |
| [`examples/selenium-js/mobile/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium-js/mobile) | Appium पर Mocha | `pnpm demo:selenium:mobile` |

</TabItem>
<TabItem value="python" label="Python">

Python उदाहरण [`examples/selenium-py/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium-py) में हैं। एडॉप्टर इंस्टॉल करें और वर्कस्पेस को एक बार build करें (`pnpm install && pnpm build`, ताकि बैकएंड मौजूद हो), फिर repo root से चलाएँ। डेमो सीधे `python3` चलाते हैं, इसलिए एडॉप्टर उसी interpreter में इंस्टॉल होना चाहिए: `python3 -m venv .venv && source .venv/bin/activate && pip install -e packages/selenium-devtools-py`।

| उदाहरण | यह क्या दिखाता है | कमांड |
|---|---|---|
| `scripts/web_form.py` | तीन-पंक्ति वाला साधारण-स्क्रिप्ट सेटअप | `pnpm demo:python` |
| `scripts/login.py` | एक लंबी स्क्रिप्ट: navigation, form fill, assertions | `pnpm demo:python:login` |
| `mobile/android/`, `mobile/ios/` | Appium: Android Clock ऐप, या `DEVTOOLS_MOBILE_PLATFORM=ios` के साथ iOS Settings (पहले `pip install -r examples/selenium-py/requirements-mobile.txt`) | `pnpm demo:python:mobile` |
| `pytest/` | एक class और एक module-level टेस्ट के साथ pytest, साथ ही एक `pytest.ini` जो ट्रेस मोड, granularity और retention को कमिट करती है - इसकी हर सेटिंग पर टिप्पणी है कि वह क्या करती है | `pnpm demo:python:pytest` |

</TabItem>
</Tabs>

## फ़ीचर्स

Selenium एडॉप्टर दोनों भाषाओं में WebdriverIO जैसा ही DevTools UI अनुभव प्रदान करता है। नीचे दिया गया हर फ़ीचर बिना किसी प्रति-फ़ीचर कॉन्फ़िग के स्वतः कैप्चर होता है — Node.js में आधार `DevTools.configure({})`, या Python में `pytest --devtools`। Console और network Selenium के BiDi handlers के माध्यम से stream होते हैं, Node.js में injected-collector फ़ॉलबैक के साथ। लिंक प्रत्येक फ़ीचर के पूर्ण संदर्भ पर ले जाते हैं।

- **[Interactive Test Rerunning & Visualization](/docs/devtools/wdio/interactive-test-rerunning)** - लाइव ब्राउज़र प्रीव्यू, प्रति-कमांड स्क्रीनशॉट, और एक-क्लिक test/suite rerunning
- **[Preserve & Rerun (Compare)](/docs/devtools/wdio/preserve-and-rerun)** - विफल टेस्ट का स्नैपशॉट लें, उसे फिर से चलाएँ, और दोनों रन का साथ-साथ diff देखें
- **[Multi-Framework Support](/docs/devtools/wdio/multi-framework-support)** - Node.js में Mocha, Jest, Cucumber, या साधारण स्क्रिप्ट को स्वतः पहचानता है; Python में pytest या साधारण स्क्रिप्ट
- **[Console Logs](/docs/devtools/wdio/console-logs)** - ब्राउज़र console आउटपुट को कैप्चर और निरीक्षण करें
- **[Network Logs](/docs/devtools/wdio/network-logs)** - API कॉल और नेटवर्क गतिविधि की निगरानी करें
- **[Metadata](/docs/devtools/wdio/metadata)** - प्रति ब्राउज़र सेशन session capabilities, environment, और timing
- **[TestLens](/docs/devtools/wdio/testlens)** - किसी भी कमांड से उस source line पर जाएँ जिसने उसे ट्रिगर किया
- **[Session Screencast](/docs/devtools/wdio/screencast)** - ब्राउज़र सेशन की स्वचालित वीडियो रिकॉर्डिंग
- **Navigation timings** - हर navigation कमांड के बाद, load / DOM-ready / response timings, resource counts, cookies और document info उस कमांड पंक्ति से संलग्न किए जाते हैं
- **[Trace Mode](/docs/devtools/wdio/trace-mode)** - एक पोर्टेबल `trace.zip` बनाने वाला headless कैप्चर (कोई UI विंडो नहीं), दोनों भाषाओं में, दोनों में प्रति-टेस्ट slicing और retention के साथ (Node.js में `traceGranularity` / `tracePolicy`; Python में `--devtools-trace-granularity` / `--devtools-trace-policy`)। प्रति-टेस्ट `screenshot` / `video` और inline Allure attachment केवल Node.js में ही हैं; देखें [ट्रेस मोड](#trace-mode)

Node.js में, स्क्रीनकास्ट ही एकमात्र फ़ीचर है जिसके अपने विकल्प हैं (देखें [कॉन्फ़िगरेशन विकल्प](#configuration-options)):

```js
DevTools.configure({ screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 } })
```

Python में रन का अपना आउटपुट भी Console टैब तक पहुँचता है: Python `logging` records (selenium के और एडॉप्टर के) और टेस्ट का `print()` आउटपुट, जिसे tee किया जाता है ताकि आपका टर्मिनल भी उसे दिखाता रहे।

Python में स्क्रीनकास्ट को किसी कॉन्फ़िगरेशन की आवश्यकता नहीं है: Chrome CDP पर frames stream करता है, अन्य ब्राउज़र प्रति कमांड एक स्क्रीनशॉट पर लौट आते हैं, और `.webm` एनकोड करने के लिए `PATH` पर `ffmpeg` आवश्यक है। ट्रेस मोड में वही frames `.webm` के बजाय आर्काइव की सघन filmstrip बन जाते हैं, इसलिए कुछ भी एनकोड नहीं होता और `ffmpeg` की आवश्यकता नहीं है।

## यह कैसे काम करता है

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

प्लगइन import के समय `selenium-webdriver` के `Builder`, `WebDriver`, और `WebElement` prototypes को पैच करता है:

- **`Builder.build()`** - construction के बाद, ड्राइवर को session capturer के साथ पंजीकृत किया जाता है और DevTools बैकएंड को एक detached चाइल्ड प्रोसेस में शुरू किया जाता है।
- **हर सार्वजनिक `WebDriver` / `WebElement` मेथड** - command capture (args + result + screenshot + call source) के साथ wrap किया जाता है।
- **`WebDriver.quit()`** - एक awaited cleanup hook मूल quit चलने से पहले screencast encoding, WebSocket buffer, और अंतिम metadata को flush करता है।

जब BiDi उपलब्ध होता है (Chrome ≥114), console logs, JavaScript exceptions, और network events सीधे Selenium BiDi handlers के माध्यम से stream होते हैं। अन्यथा प्लगइन एक injected browser-side collector script पर लौट आता है, इसलिए Safari या Appium सेशन भी हर request को सूचीबद्ध करता है, पेज के अपने दो स्रोतों से। एक `fetch` / `XMLHttpRequest` कॉल collector के patch से होकर जाती है और उसमें method, headers, status और body होते हैं। हर अन्य load (document, scripts, styles, images, fonts) पेज के Resource Timing buffer से उसकी timing और size के साथ आता है, लेकिन headers या body के बिना, और Safari पर status के बिना; Network टैब ऐसी हर पंक्ति पर यह बताता है।

एक `driver.wait()` टेस्ट द्वारा किए गए एक कमांड के रूप में दिखता है, प्रति poll एक पंक्ति के रूप में नहीं।

पेज-साइड collector document start पर BiDi (`script.addPreloadScript`) के माध्यम से पंजीकृत होता है, इसलिए हर पेज अपनी किसी भी script के चलने से पहले स्वयं को instrument करता है; BiDi के बिना यह हर navigation के बाद एक `<script>` इंजेक्ट करने पर लौट आता है। यह पेज का **DOM mutation stream** और प्रति-कमांड element / accessibility snapshot रिकॉर्ड करता है, इसलिए एक ट्रेस में हर step पर लाइव DOM को फिर से बनाने के लिए पर्याप्त जानकारी होती है (प्रति-navigation mapping) — यही प्लेयर के DOM time-travel और A11y टैब को शक्ति देता है, न कि केवल स्क्रीनशॉट वाला replay।

</TabItem>
<TabItem value="python" label="Python">

पैच करने के लिए कोई prototypes नहीं हैं, इसलिए Python एडॉप्टर इसके बजाय एक मेथड को wrap करता है:

- **`WebDriver.execute()`** - वह एकल chokepoint जिससे हर कमांड गुज़रता है। Element मेथड भी इसी को delegate करते हैं (`self._parent.execute`), इसलिए `click`, `send_keys` और `text` element classes को छुए बिना उसी wrapper द्वारा कैप्चर होते हैं।
- **Session setup** - पहले वास्तविक कमांड पर ड्राइवर पंजीकृत होता है, metadata भेजा जाता है, और BiDi, collector तथा screencast तैयार किए जाते हैं।
- **`quit()`** - सेशन बंद होने से पहले intercept किया जाता है, इसलिए ड्राइवर के अस्तित्व में रहते हुए screencast एनकोड होता है और अंतिम frames flush होते हैं।

Console, JavaScript exceptions और network selenium की BiDi layer (4.44+) पर stream होते हैं, जिसे एडॉप्टर `newSession` request में `webSocketUrl` capability इंजेक्ट करके आपके लिए सक्षम करता है। जहाँ ड्राइवर कोई BiDi प्रदान नहीं करता (Safari, और हर सेशन जिसे Appium परोसता है), वहाँ injected पेज collector इसके बजाय Network टैब भरता है, पेज के अपने दो स्रोतों से। एक `fetch` / `XMLHttpRequest` कॉल इसके patch से होकर जाती है और उसमें method, headers, status और body होते हैं। हर अन्य load document के Resource Timing buffer से उसकी timing और size के साथ आता है, लेकिन headers या body के बिना, और Safari पर status के बिना।

**DOM mutation stream** Node.js जैसे ही browser-side collector से आता है, जो document start पर BiDi के माध्यम से पंजीकृत होता है ताकि पेज अपनी किसी भी script के चलने से पहले स्वयं को instrument करे। BiDi अक्षम होने पर (`DEVTOOLS_BIDI=0`) collector इसके बजाय प्रति document एक `<script>` के साथ इंजेक्ट किया जाता है। Chrome पर screencast ब्राउज़र द्वारा अपने स्वयं के CDP websocket पर भेजा जाता है — सेशन के command channel से अलग, और यही वास्तविक frame stream को सुरक्षित बनाता है जबकि Selenium सेशन thread-safe नहीं होता।

</TabItem>
</Tabs>

## मोबाइल (Appium)

Appium सेशन लाइव और ट्रेस मोड में, दोनों भाषाओं में कैप्चर होते हैं। मोबाइल-ब्राउज़र सेशन डेस्कटॉप सेशन की तरह कैप्चर होता है; एक native ऐप को commands, screenshots और element data प्लेटफ़ॉर्म के XML tree से मिलते हैं, बिना DOM के। यह एडॉप्टर startup capabilities से निर्णय लेता है, इसलिए hybrid ऐप का webview हिस्सा ऐसे कैप्चर होता है मानो वह अभी भी native हो (केवल WebdriverIO service context switches का अनुसरण करती है)।

इसे `pnpm demo:selenium:mobile` (Node.js) या `pnpm demo:python:mobile` (Python) के साथ आज़माएँ, devtools repo के built checkout के root से चलाकर (सेटअप steps [Running an example](/docs/devtools/mobile#running-an-example) में)। `DEVTOOLS_MOBILE_PLATFORM=ios` iOS spec चलाता है, और `DEVTOOLS_MOBILE=web` डिवाइस के अपने ब्राउज़र को चलाता है। पूर्वापेक्षाएँ [`examples/MOBILE.md`](https://github.com/webdriverio/devtools/blob/main/examples/MOBILE.md) में हैं; पूर्ण मोबाइल संदर्भ के लिए [Mobile Testing पेज](/docs/devtools/mobile) देखें। Native ऐप का network तब कैप्चर होता है जब सेशन `appium:intercept: true` सेट करता है और Appium appium-interceptor प्लगइन चलाता है; देखें [Native app network](/docs/devtools/mobile#native-app-network)।

## सीमाएँ

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| सीमा | विवरण |
|-----------|--------|
| Cucumber leaf-step rerun | Cucumber का `--name` फ़िल्टर scenarios को लक्षित करता है, अलग-अलग Gherkin steps को नहीं। Cucumber के अंतर्गत डैशबोर्ड का प्रति-step rerun अक्षम है। |
| Headless मोड सावधानी | `headless: true` `--headless=old` इंजेक्ट करता है; `--headless=new` स्क्रीनकास्ट में पूरी तरह काले CDP frames बनाता है। |
| प्रारंभिक viewport | डैशबोर्ड का snapshot iframe तब तक 1280×800 पर रहता है जब तक पहला navigation पूरा न हो और browser-side collector वास्तविक viewport रिपोर्ट न करे। |
| समानांतर workers | Jest/Vitest worker प्रोसेस में से प्रत्येक प्लगइन लोड करती है और अलग रन के रूप में रिपोर्ट करती है, इसलिए डैशबोर्ड केवल नवीनतम worker की स्थिति रखता है। एक ही डैशबोर्ड रन के लिए क्रमिक रूप से चलाएँ (`--runInBand`)। |
| लाइव मोड में Safari | Safari synthesized input केवल अपनी सबसे आगे वाली विंडो को देता है और फिर भी सफलता रिपोर्ट करता है, इसलिए किसी अन्य विंडो के आगे होने पर दिया गया input कहीं नहीं पहुँचता। Safari पर प्लगइन डैशबोर्ड को ब्राउज़र के पीछे खोलता है और हर element click, key input, clear या submit से पहले सेशन की अपनी विंडो को आगे लाता है। ट्रेस मोड कोई विंडो नहीं खोलता और प्रभावित नहीं होता। |

</TabItem>
<TabItem value="python" label="Python">

| सीमा | विवरण |
|-----------|--------|
| कोई प्रति-टेस्ट screenshot, video या Allure attach नहीं | प्रति-टेस्ट **ट्रेस आर्काइव** समर्थित हैं (`--devtools-trace-granularity test`), लेकिन Node.js एडॉप्टर के प्रति-टेस्ट `screenshot` और `video` विकल्पों और उसके inline `allure-js-commons` attachment का कोई Python समकक्ष नहीं है - आर्काइव ही artifacts हैं। |
| Retry-aware retention का स्तर घटता है | `retain-on-first-failure`, `on-first-retry`, `on-all-retries` और `retain-on-failure-and-retries` स्वीकार किए जाते हैं लेकिन बिल्कुल `retain-on-failure` की तरह व्यवहार करते हैं: wire पर किसी भी चीज़ में attempt number नहीं होता, इसलिए दोबारा चलाया गया टेस्ट अपने पिछले परिणाम को ओवरराइट कर देता है। बैकएंड इस गिरावट को लॉग करता है। |
| हर मोड में Node आवश्यक है | बैकएंड एक Node एप्लिकेशन है - यह पेज collector परोसता है, इवेंट स्ट्रीम ले जाता है, और ट्रेस आर्काइव बनाता है - इसलिए Node.js 22.19 या उसके बाद का संस्करण ट्रेस मोड में भी मौजूद होना चाहिए, जहाँ कोई विंडो नहीं खुलती। एडॉप्टर इसे आपके लिए ढूँढता या लॉन्च करता है। |
| ब्राउज़र विकल्प आपके हाथ में हैं | कोई `headless` विकल्प नहीं है; Chrome को selenium के अपने `Options` ऑब्जेक्ट के माध्यम से वैसे ही कॉन्फ़िगर करें जैसे आप सामान्यतः करते हैं। |
| लाइव-मोड वीडियो के लिए ffmpeg आवश्यक है | `PATH` पर `ffmpeg` के बिना `.webm` एनकोड एक त्रुटि के बजाय एक चेतावनी के साथ छोड़ दिया जाता है। ट्रेस मोड कुछ भी एनकोड नहीं करता - उसके frames filmstrip में जाते हैं - इसलिए उसे कभी ffmpeg की आवश्यकता नहीं होती। |

</TabItem>
</Tabs>