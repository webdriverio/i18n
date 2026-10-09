---
id: configuration
title: कॉन्फ़िगरेशन
description: "WebdriverIO MCP सर्वर को कॉन्फ़िगर करें, जिसमें सेशन, ब्राउज़र, मोबाइल, क्लाउड प्रोवाइडर, एलिमेंट डिटेक्शन और Appium विकल्प शामिल हैं।"
---

यह पेज WebdriverIO MCP सर्वर के सभी कॉन्फ़िगरेशन विकल्पों का दस्तावेज़ीकरण करता है।

## MCP सर्वर कॉन्फ़िगरेशन

MCP सर्वर को कॉन्फ़िगरेशन फ़ाइलों या कमांड के माध्यम से कॉन्फ़िगर किया जाता है।

### बेसिक कॉन्फ़िगरेशन

अपनी MCP कॉन्फ़िगरेशन फ़ाइल (जैसे `./.mcp.json`) को एडिट करें और निम्नलिखित जोड़ें:

```json
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"]
        }
    }
}
```

## सेशन विकल्प

सभी सेशन विकल्प `start_session` टूल को पास किए जाते हैं। ब्राउज़र और मोबाइल सेशन के लिए एक ही एकीकृत टूल है; `platform` पैरामीटर सेशन का प्रकार निर्धारित करता है।

### सामान्य विकल्प

#### `platform`

<Option type={`"browser" | "ios" | "android"`} required="Yes">

वह प्लेटफ़ॉर्म जिसे ऑटोमेट करना है।

</Option>
#### `provider`

<Option type={`"local" | "browserstack" | "saucelabs" | "testmu" | "testingbot"`} default={`"local"`} required="No">

सेशन कहाँ चलता है। रिमोट डिवाइस के लिए क्लाउड प्रोवाइडर का नाम उपयोग करें; प्रत्येक को अपने स्वयं के एनवायरनमेंट वेरिएबल्स की आवश्यकता होती है। विवरण के लिए [Cloud Providers](./cloud-providers) देखें।

</Option>
## ब्राउज़र सेशन विकल्प

`platform: "browser"` सेशन के लिए विकल्प।

### `browser`

<Option type={`"chrome" | "firefox" | "edge" | "safari"`} required="Yes (for browser platform)">

लॉन्च करने के लिए ब्राउज़र।

</Option>
### `browserVersion`

<Option type="string" default={`"latest"`} required="No">

ब्राउज़र वर्ज़न। केवल क्लाउड प्रोवाइडर के लिए (डिफ़ॉल्ट: latest)।

</Option>
### `os` / `osVersion`

<Option type="string" required="No">

क्लाउड प्रोवाइडर ब्राउज़र सेशन के लिए ऑपरेटिंग सिस्टम। उदाहरण: `os: "Windows"`, `osVersion: "11"` या `os: "OS X"`, `osVersion: "Sequoia"`।

</Option>
### `headless`

<Option type="boolean" default="true" required="No">

ब्राउज़र को headless मोड में चलाएँ (कोई दिखाई देने वाली विंडो नहीं)। ब्राउज़र देखने के लिए `false` पर सेट करें।

</Option>
### `windowWidth`

<Option type="number" default="1920" required="No">

-   **रेंज:** `400` - `3840`

पिक्सेल में प्रारंभिक ब्राउज़र विंडो की चौड़ाई।

</Option>
### `windowHeight`

<Option type="number" default="1080" required="No">

-   **रेंज:** `400` - `2160`

पिक्सेल में प्रारंभिक ब्राउज़र विंडो की ऊँचाई।

</Option>
### `navigationUrl`

<Option type="string" required="No">

ब्राउज़र शुरू करने के तुरंत बाद नेविगेट करने के लिए URL। `start_session` और उसके बाद `navigate` को अलग-अलग कॉल करने की तुलना में अधिक कुशल।

</Option>
### `attach`

<Option type="boolean" default="false" required="No">

नया Chrome इंस्टेंस लॉन्च करने के बजाय किसी मौजूदा Chrome इंस्टेंस से अटैच करें। CDP के माध्यम से कनेक्ट करने के लिए `launch_chrome` के बाद उपयोग करें।

</Option>
### `attachConfig`

<Option type={`{ port?: number; host?: string }`} default={`{ port: 9222, host: "localhost" }`} required="No">

Chrome रिमोट डिबगिंग कनेक्शन कॉन्फ़िगरेशन। केवल तब लागू होता है जब `attach: true` हो।

</Option>
## मोबाइल सेशन विकल्प

`platform: "ios"` या `platform: "android"` सेशन के लिए विकल्प।

### `deviceName`

<Option type="string" required="Yes (for mobile platforms)">

डिवाइस, सिम्युलेटर या एमुलेटर का नाम।

**उदाहरण:**
-   iOS सिम्युलेटर: `"iPhone 16"`, `"iPad Air (5th generation)"`
-   Android एमुलेटर: `"Pixel 7"`, `"Nexus 5X"`
-   रियल डिवाइस: आपके सिस्टम में दिखाया गया डिवाइस का नाम

</Option>
### `platformVersion`

<Option type="string" required="No">

डिवाइस/सिम्युलेटर/एमुलेटर का OS वर्ज़न (जैसे, iOS के लिए `"18.0"`, Android के लिए `"14"`)।

</Option>
### `automationName`

<Option type={`"XCUITest" | "UiAutomator2"`} required="No">

ऑटोमेशन ड्राइवर। iOS के लिए डिफ़ॉल्ट `XCUITest` और Android के लिए `UiAutomator2` है।

</Option>
### `udid`

<Option type="string" required="No (Required for real iOS devices)">

यूनिक डिवाइस आइडेंटिफ़ायर। रियल iOS डिवाइस के लिए आवश्यक (40-कैरेक्टर आइडेंटिफ़ायर)।

**UDID ढूँढना:**
-   **iOS:** डिवाइस कनेक्ट करें, Finder खोलें, डिवाइस पर क्लिक करें → Serial Number (UDID दिखाने के लिए क्लिक करें)
-   **Android:** टर्मिनल में `adb devices` चलाएँ

</Option>
### `appPath`

<Option type="string" required="No">

इंस्टॉल और लॉन्च करने के लिए एप्लिकेशन फ़ाइल का पाथ।

**समर्थित फ़ॉर्मेट:**
-   iOS सिम्युलेटर: `.app` डायरेक्टरी
-   iOS रियल डिवाइस: `.ipa` फ़ाइल
-   Android: `.apk` फ़ाइल

या तो `appPath` प्रदान किया जाना चाहिए, या पहले से चल रहे ऐप से कनेक्ट करने के लिए `noReset: true` सेट होना चाहिए।

</Option>
### `app`

<Option type="string" required="No">

क्लाउड प्रोवाइडर ऐप URL (BrowserStack के लिए `bs://...`, Sauce Labs के लिए `storage:filename=`, TestMu के लिए `lt://...`, TestingBot app_url) या `customId`। क्लाउड मोबाइल सेशन के लिए `appPath` के बजाय उपयोग किया जाता है।

</Option>
### `appWaitActivity`

<Option type="string" required="No (Android only)">

ऐप लॉन्च होने पर जिस activity की प्रतीक्षा करनी है। यदि निर्दिष्ट नहीं है, तो ऐप की main/launcher activity का उपयोग किया जाता है।

**उदाहरण:** `"com.example.app.MainActivity"`

</Option>
### सेशन स्टेट विकल्प

#### `noReset`

<Option type="boolean" required="No">

सेशन के बीच ऐप की स्टेट को सुरक्षित रखें। जब `true` हो:
-   ऐप डेटा सुरक्षित रहता है (लॉगिन स्टेट, प्राथमिकताएँ, आदि)
-   सेशन बंद होने के बजाय **detach** होगा (ऐप चलता रहता है)
-   पहले से चल रहे ऐप से कनेक्ट करने के लिए `appPath` के बिना उपयोग किया जा सकता है

</Option>
#### `fullReset`

<Option type="boolean" required="No">

सेशन से पहले ऐप को पूरी तरह से रीसेट करें:
-   iOS: ऐप को अनइंस्टॉल और फिर से इंस्टॉल करता है
-   Android: ऐप डेटा और कैश साफ़ करता है

ऐप स्टेट को पूरी तरह सुरक्षित रखने के लिए `noReset: true` के साथ `fullReset: false` सेट करें।

</Option>
### सेशन टाइमआउट

#### `newCommandTimeout`

<Option type="number" default="300" required="No">

सेशन समाप्त करने से पहले Appium नए कमांड के लिए कितने समय (सेकंड में) तक प्रतीक्षा करेगा। लंबे डिबगिंग सेशन के लिए इसे बढ़ाएँ।

</Option>
### स्वचालित हैंडलिंग

#### `autoGrantPermissions`

<Option type="boolean" default="true" required="No">

इंस्टॉल/लॉन्च पर ऐप अनुमतियाँ स्वचालित रूप से प्रदान करें (कैमरा, माइक्रोफ़ोन, लोकेशन, आदि)।

:::note केवल Android
यह विकल्प मुख्य रूप से Android को प्रभावित करता है। सिस्टम प्रतिबंधों के कारण iOS अनुमतियों को अलग तरीके से संभालना होगा।
:::

</Option>
#### `autoAcceptAlerts`

<Option type="boolean" default="true" required="No">

ऑटोमेशन के दौरान सिस्टम अलर्ट (डायलॉग) को स्वचालित रूप से स्वीकार करें ("Allow notifications?", आदि)।

</Option>
#### `autoDismissAlerts`

<Option type="boolean" default="false" required="No">

सिस्टम अलर्ट को स्वीकार करने के बजाय खारिज करें। `true` होने पर `autoAcceptAlerts` पर प्राथमिकता लेता है।

</Option>
### Appium सर्वर कनेक्शन

`appiumConfig` का उपयोग करके प्रति-सेशन आधार पर Appium सर्वर कनेक्शन को ओवरराइड करें:

```js
start_session({
  platform: "ios",
  deviceName: "iPhone 16",
  appPath: "/path/to/app.app",
  appiumConfig: { host: "192.168.1.100", port: 4724, path: "/wd/hub" }
})
```

#### `appiumConfig`

<Option type={`{ host?: string; port?: number; path?: string }`} required="No">

Appium सर्वर कनेक्शन। डिफ़ॉल्ट `{ host: "127.0.0.1", port: 4723, path: "/" }` है।

</Option>
## क्लाउड प्रोवाइडर विकल्प

### क्रेडेंशियल्स

प्रत्येक क्लाउड प्रोवाइडर को अपने स्वयं के एनवायरनमेंट वेरिएबल्स की आवश्यकता होती है:

| प्रोवाइडर     | Username वेरिएबल       | Access Key वेरिएबल       |
| ------------ | ----------------------- | ------------------------- |
| BrowserStack | `BROWSERSTACK_USERNAME` | `BROWSERSTACK_ACCESS_KEY` |
| Sauce Labs   | `SAUCE_USERNAME`        | `SAUCE_ACCESS_KEY`        |
| TestMu       | `TESTMU_USERNAME`       | `TESTMU_ACCESS_KEY`       |
| TestingBot   | `TESTINGBOT_KEY`        | `TESTINGBOT_SECRET`       |

MCP सर्वर शुरू करने से पहले इन्हें सेट करें।

### `region`

<Option type={`"us-west-1" | "eu-central-1" | "apac-southeast-1"`} default={`"eu-central-1"`} required="No">

Sauce Labs डेटा सेंटर रीजन। अन्य प्रोवाइडर्स के लिए अनदेखा किया जाता है।

</Option>
### `tunnel`

<Option type={`boolean | "external"`} default="false" required="No">

क्लाउड प्रोवाइडर सेशन के लिए लोकल टनल रूटिंग सक्षम करें (localhost, स्टेजिंग एनवायरनमेंट, आंतरिक सेवाओं तक पहुँचने के लिए)।

-   `true` — सेशन से पहले टनल को स्वचालित रूप से शुरू करें और बंद होने पर इसे रोकें
-   `"external"` — टनल पहले से बाहरी रूप से चल रहा है; केवल प्रोवाइडर-उपयुक्त फ़्लैग सेट करता है

`true` का उपयोग करने से पहले, अपने OS और आर्किटेक्चर के लिए विशिष्ट सेटअप निर्देशों के लिए प्रोवाइडर का local-binary रिसोर्स (`wdio://browserstack/local-binary`, `wdio://saucelabs/local-binary`, `wdio://testmu/local-binary`, या `wdio://testingbot/local-binary`) पढ़ें।

</Option>
### `tunnelName`

<Option type="string" required="No">

टनल आइडेंटिफ़ायर नाम। चल रहे टनल से मिलान करने के लिए `tunnel: "external"` होने पर आवश्यक। जब `tunnel: true` हो, तो प्रदान न किए जाने पर एक यूनिक नाम स्वचालित रूप से जनरेट होता है।

</Option>
### `reporting`

<Option type={`{ project?: string; build?: string; session?: string }`} required="No">

क्लाउड प्रोवाइडर सेशन लेबल जो प्रोवाइडर के डैशबोर्ड में दिखाई देते हैं। BrowserStack, Sauce Labs, TestMu और TestingBot में एक समान रूप से काम करता है।

</Option>
### `trace`

<Option type="boolean" default="false" required="No">

ट्रेस रिकॉर्डिंग सक्षम करें। `close_session` पर `.trace/` में सेव की गई एक Playwright-संगत `.trace` zip फ़ाइल बनाता है। ट्रेस को [player.vibium.dev](https://player.vibium.dev) पर देखें।

</Option>
## एलिमेंट डिटेक्शन विकल्प

`get_elements` टूल के लिए विकल्प।

### `inViewportOnly`

<Option type="boolean" default="false" required="No">

केवल वर्तमान viewport में दिखाई देने वाले एलिमेंट लौटाएँ। लंबे पेजों पर परिणाम कम करने के लिए `true` पर सेट करें।

</Option>
### `includeContainers`

<Option type="boolean" default="false" required="No">

परिणामों में container/layout एलिमेंट शामिल करें:

**Android कंटेनर:** `ViewGroup`, `FrameLayout`, `LinearLayout`, `RelativeLayout`, `ConstraintLayout`, `ScrollView`, `RecyclerView`

**iOS कंटेनर:** `View`, `StackView`, `CollectionView`, `ScrollView`, `TableView`

</Option>
### `includeBounds`

<Option type="boolean" default="false" required="No">

रिस्पॉन्स में एलिमेंट के bounding box कोऑर्डिनेट्स (x, y, width, height) शामिल करें।

</Option>
### पेजिनेशन

#### `limit`

<Option type="number" default="0 (unlimited)" required="No">

लौटाए जाने वाले एलिमेंट्स की अधिकतम संख्या।

</Option>
#### `offset`

<Option type="number" default="0" required="No">

परिणाम लौटाने से पहले छोड़े जाने वाले एलिमेंट्स की संख्या।

**उदाहरण:** एलिमेंट 21–40 प्राप्त करें:
```text
Get elements with limit 20 and offset 20
```

</Option>
## Accessibility Tree विकल्प

`get_accessibility_tree` टूल (केवल ब्राउज़र) के लिए विकल्प।

### `limit`

<Option type="number" default="0 (unlimited)" required="No">

लौटाए जाने वाले नोड्स की अधिकतम संख्या।

</Option>
### `offset`

<Option type="number" default="0" required="No">

पेजिनेशन के लिए छोड़े जाने वाले नोड्स की संख्या।

</Option>
### `roles`

<Option type="string[]" default="All roles" required="No">

विशिष्ट accessibility roles तक फ़िल्टर करें।

**सामान्य roles:** `button`, `link`, `textbox`, `checkbox`, `radio`, `heading`, `img`, `listitem`

**उदाहरण:** केवल बटन और लिंक प्राप्त करें:
```text
Get accessibility tree filtered to button and link roles
```

</Option>
## स्क्रीनशॉट

`get_screenshot` टूल कोई पैरामीटर नहीं लेता। स्क्रीनशॉट स्वचालित रूप से प्रोसेस किए जाते हैं:

| ऑप्टिमाइज़ेशन  | मान    | विवरण                                       |
| ------------- | -------- | ------------------------------------------------- |
| अधिकतम डाइमेंशन | 2000px   | 2000px से बड़ी इमेज को छोटा किया जाता है         |
| अधिकतम फ़ाइल आकार | 1MB      | इमेज को 1MB से कम रखने के लिए कंप्रेस किया जाता है           |
| फ़ॉर्मेट        | PNG/JPEG | अधिकतम कम्प्रेशन के साथ PNG; आकार के लिए आवश्यक होने पर JPEG |

## सेशन व्यवहार

### सेशन प्रकार

| प्रकार      | विवरण         | ऑटो-डिटैच                              |
| --------- | ------------------- | ---------------------------------------- |
| `browser` | ब्राउज़र सेशन     | नहीं                                       |
| `ios`     | iOS ऐप सेशन     | हाँ (यदि `noReset: true` या कोई `appPath` नहीं) |
| `android` | Android ऐप सेशन | हाँ (यदि `noReset: true` या कोई `appPath` नहीं) |

### सिंगल-सेशन मॉडल

MCP सर्वर **सिंगल-सेशन मॉडल** के साथ काम करता है:

-   एक समय में केवल एक ब्राउज़र या ऐप सेशन सक्रिय हो सकता है
-   नया सेशन शुरू करने से वर्तमान सेशन बंद/डिटैच हो जाएगा
-   सेशन स्टेट टूल कॉल्स में वैश्विक रूप से बनी रहती है

### Detach बनाम Close

| क्रिया     | `detach: false` (Close)      | `detach: true` (Detach)                      |
| ---------- | ---------------------------- | -------------------------------------------- |
| ब्राउज़र    | ब्राउज़र को पूरी तरह बंद करता है    | ब्राउज़र चलता रहता है, WebDriver डिस्कनेक्ट होता है |
| मोबाइल ऐप | ऐप को समाप्त करता है               | ऐप को वर्तमान स्टेट में चलता रखता है           |
| उपयोग का मामला   | अगले सेशन के लिए साफ़ शुरुआत | स्टेट सुरक्षित रखना, मैन्युअल निरीक्षण            |

## प्रदर्शन संबंधी विचार

### ब्राउज़र ऑटोमेशन

-   **Headless मोड** तेज़ है लेकिन विज़ुअल एलिमेंट्स को रेंडर नहीं करता
-   **छोटे विंडो आकार** स्क्रीनशॉट कैप्चर समय को कम करते हैं
-   **एलिमेंट डिटेक्शन** एक ही स्क्रिप्ट एक्ज़ीक्यूशन के साथ ऑप्टिमाइज़ किया गया है
-   **स्क्रीनशॉट ऑप्टिमाइज़ेशन** कुशल प्रोसेसिंग के लिए इमेज को 1MB से कम रखता है

### मोबाइल ऑटोमेशन

-   **XML पेज सोर्स पार्सिंग** केवल 2 HTTP कॉल्स का उपयोग करती है (पारंपरिक एलिमेंट क्वेरीज़ के लिए 600+ की तुलना में)
-   **Accessibility ID सेलेक्टर्स** सबसे तेज़ और सबसे विश्वसनीय हैं
-   **XPath सेलेक्टर्स** सबसे धीमे हैं; केवल अंतिम उपाय के रूप में उपयोग करें
-   **पेजिनेशन** (`limit` और `offset`) कई एलिमेंट्स वाली स्क्रीन के लिए टोकन उपयोग को कम करता है

### टोकन उपयोग के सुझाव

| सेटिंग                    | प्रभाव                                              |
| -------------------------- | --------------------------------------------------- |
| `inViewportOnly: true`     | ऑफ़-स्क्रीन एलिमेंट्स को फ़िल्टर करता है, रिस्पॉन्स आकार कम करता है |
| `includeContainers: false` | लेआउट एलिमेंट्स (ViewGroup, आदि) को बाहर रखता है          |
| `includeBounds: false`     | x/y/width/height डेटा को छोड़ देता है                         |
| पेजिनेशन के साथ `limit`    | सभी एलिमेंट्स को एक साथ प्रोसेस करने के बजाय बैच में प्रोसेस करें  |

## Appium सर्वर सेटअप

मोबाइल ऑटोमेशन का उपयोग करने से पहले, सुनिश्चित करें कि Appium ठीक से कॉन्फ़िगर है।

### बेसिक सेटअप

```sh
# Appium को ग्लोबली इंस्टॉल करें
npm install -g appium

# ड्राइवर्स इंस्टॉल करें
appium driver install xcuitest    # iOS
appium driver install uiautomator2  # Android

# सर्वर शुरू करें
appium
```

### कस्टम सर्वर कॉन्फ़िगरेशन

```sh
# कस्टम होस्ट और पोर्ट के साथ शुरू करें
appium --address 0.0.0.0 --port 4724

# लॉगिंग के साथ शुरू करें
appium --log-level debug

# विशिष्ट बेस पाथ के साथ शुरू करें
appium --base-path /wd/hub
```

### इंस्टॉलेशन सत्यापित करें

```sh
# इंस्टॉल किए गए ड्राइवर्स जाँचें
appium driver list --installed

# Appium वर्ज़न जाँचें
appium --version

# कनेक्शन टेस्ट करें
curl http://localhost:4723/status
```

## कॉन्फ़िगरेशन समस्या निवारण

### MCP सर्वर शुरू नहीं हो रहा

1. सत्यापित करें कि npm/npx इंस्टॉल है: `npm --version`
2. मैन्युअल रूप से चलाने का प्रयास करें: `npx @wdio/mcp`
3. त्रुटियों के लिए अपने हार्नेस के लॉग्स जाँचें

### Appium कनेक्शन समस्याएँ

1. सत्यापित करें कि Appium चल रहा है: `curl http://localhost:4723/status`
2. जाँचें कि `start_session` में `appiumConfig` Appium सर्वर सेटिंग्स से मेल खाता है
3. सुनिश्चित करें कि फ़ायरवॉल Appium पोर्ट पर कनेक्शन की अनुमति देता है

### सेशन शुरू नहीं हो रहा

1. **ब्राउज़र:** सुनिश्चित करें कि लक्षित ब्राउज़र इंस्टॉल है
2. **iOS:** सत्यापित करें कि Xcode और सिम्युलेटर्स उपलब्ध हैं
3. **Android:** `ANDROID_HOME` जाँचें और सुनिश्चित करें कि एमुलेटर चल रहा है
4. विस्तृत त्रुटि संदेशों के लिए Appium सर्वर लॉग्स की समीक्षा करें

### सेशन टाइमआउट

यदि डिबगिंग के दौरान सेशन टाइमआउट हो रहे हैं:
1. सेशन शुरू करते समय `newCommandTimeout` बढ़ाएँ
2. सेशन के बीच स्टेट सुरक्षित रखने के लिए `noReset: true` का उपयोग करें
3. ऐप को चलता रखने के लिए बंद करते समय `detach: true` का उपयोग करें