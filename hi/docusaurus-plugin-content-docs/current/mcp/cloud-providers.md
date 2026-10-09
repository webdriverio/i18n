---
id: cloud-providers
title: क्लाउड प्रोवाइडर्स
description: "क्लाउड डिवाइस फ़ार्म पर WebdriverIO MCP ब्राउज़र और मोबाइल सेशन चलाएँ, जिसमें क्रेडेंशियल्स, ऐप अपलोड, टनल और रिपोर्टिंग शामिल हैं।"
---

WebdriverIO MCP सर्वर क्लाउड डिवाइस फ़ार्म पर ब्राउज़र और मोबाइल ऑटोमेशन सेशन चलाने के लिए नेटिव सपोर्ट प्रदान करता है। किसी लोकल ड्राइवर, एमुलेटर या सिम्युलेटर की आवश्यकता नहीं है। चार प्रोवाइडर्स समर्थित हैं:

- **BrowserStack** — [Automate](https://www.browserstack.com/automate) (ब्राउज़र) और [App Automate](https://www.browserstack.com/app-automate) (मोबाइल ऐप्स)
- **Sauce Labs** — [Sauce Labs](https://saucelabs.com) रियल डिवाइस क्लाउड और वर्चुअल ब्राउज़र
- **TestMu (पूर्व में LambdaTest)** — [TestMu](https://www.lambdatest.com) रियल डिवाइस और ब्राउज़र क्लाउड
- **TestingBot** — [TestingBot](https://testingbot.com) रियल डिवाइस क्लाउड और ब्राउज़र ग्रिड

चारों प्रोवाइडर्स एक ही वर्कफ़्लो साझा करते हैं: क्रेडेंशियल्स सेट करें, वैकल्पिक रूप से एक मोबाइल ऐप अपलोड करें, फिर प्रोवाइडर के नाम के साथ `start_session` को कॉल करें। रिपोर्टिंग लेबल, टनल कॉन्फ़िगरेशन और मोबाइल ऐप लाइफ़साइकिल सभी प्रोवाइडर्स में एक समान हैं।

## पूर्वापेक्षाएँ

MCP सर्वर शुरू करने से पहले अपने क्रेडेंशियल्स को एनवायरनमेंट वेरिएबल्स के रूप में सेट करें:

```bash
# BrowserStack
export BROWSERSTACK_USERNAME="your_username"
export BROWSERSTACK_ACCESS_KEY="your_access_key"

# Sauce Labs
export SAUCE_USERNAME="your_username"
export SAUCE_ACCESS_KEY="your_access_key"

# TestMu
export TESTMU_USERNAME="your_username"
export TESTMU_ACCESS_KEY="your_access_key"

# TestingBot
export TESTINGBOT_KEY="your_key"
export TESTINGBOT_SECRET="your_secret"
```

| प्रोवाइडर     | यूज़रनेम वेरिएबल       | एक्सेस की वेरिएबल       | कहाँ मिलेगा                                                      |
| ------------ | ----------------------- | ------------------------- | ------------------------------------------------------------------ |
| BrowserStack | `BROWSERSTACK_USERNAME` | `BROWSERSTACK_ACCESS_KEY` | [अकाउंट सेटिंग्स](https://www.browserstack.com/accounts/settings) |
| Sauce Labs   | `SAUCE_USERNAME`        | `SAUCE_ACCESS_KEY`        | [यूज़र सेटिंग्स](https://app.saucelabs.com/user-settings)           |
| TestMu       | `TESTMU_USERNAME`       | `TESTMU_ACCESS_KEY`       | [अकाउंट सेटिंग्स](https://accounts.lambdatest.com/detail/profile) |
| TestingBot   | `TESTINGBOT_KEY`        | `TESTINGBOT_SECRET`       | [अकाउंट सेटिंग्स](https://testingbot.com/membership)              |

## ब्राउज़र ऑटोमेशन

`start_session` में `provider` सेट करके किसी भी क्लाउड प्रोवाइडर पर ब्राउज़र सेशन चलाएँ:

```js
// BrowserStack — Windows + Chrome
start_session({
  provider: "browserstack",
  platform: "browser",
  browser: "chrome",
  browserVersion: "latest",
  os: "Windows",
  osVersion: "11"
})

// Sauce Labs — macOS + Safari
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "safari",
  browserVersion: "latest",
  os: "macOS",
  osVersion: "Sequoia"
})

// TestMu — Linux + Firefox
start_session({
  provider: "testmu",
  platform: "browser",
  browser: "firefox",
  browserVersion: "latest",
  os: "Linux"
})

// TestingBot — Windows + Chrome
start_session({
  provider: "testingbot",
  platform: "browser",
  browser: "chrome",
  browserVersion: "latest",
  os: "Windows",
  osVersion: "11"
})
```

सभी प्रोवाइडर्स `browser` के लिए `"chrome"`, `"firefox"`, `"edge"`, `"safari"` का समर्थन करते हैं। यदि आप `os` / `osVersion` छोड़ देते हैं, तो प्रोवाइडर उचित डिफ़ॉल्ट मानों का उपयोग करता है (आमतौर पर ब्राउज़र सेशन के लिए नवीनतम Linux)।

### Sauce Labs रीजन

Sauce Labs कई डेटा सेंटर रीजन का समर्थन करता है। `start_session` में `region` पैरामीटर सेट करें:

```js
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "chrome",
  region: "us-west-1"
})
```

समर्थित मान: `"us-west-1"`, `"eu-central-1"` (डिफ़ॉल्ट), `"apac-southeast-1"`।

## मोबाइल ऐप ऑटोमेशन

मोबाइल वर्कफ़्लो में तीन चरण होते हैं, जो सभी प्रोवाइडर्स में एक समान हैं:

### चरण 1: अपना ऐप अपलोड करें

```js
upload_app({ provider: "browserstack", path: "/absolute/path/to/app.apk" })
upload_app({ provider: "saucelabs", path: "/path/to/app.ipa" })
upload_app({ provider: "testmu", path: "/path/to/app.apk" })
upload_app({ provider: "testingbot", path: "/path/to/app.apk" })
```

प्रत्येक एक ऐप रेफ़रेंस लौटाता है जिसका उपयोग आप `start_session` में करेंगे:
- BrowserStack: `bs://abc123...`
- Sauce Labs: `storage:filename=MyApp.ipa`
- TestMu: `lt://abc123...`
- TestingBot: `https://api.testingbot.com/v1/storage/<app_url>`

अपलोड्स के बीच स्थिर रेफ़रेंस के लिए आप वैकल्पिक रूप से एक `customId` सेट कर सकते हैं:

```js
upload_app({ provider: "saucelabs", path: "/path/to/app.ipa", customId: "MyApp-v2.1" })
```

Sauce Labs के लिए, अपने स्टोरेज रीजन से मेल खाने के लिए `region` जोड़ें (डिफ़ॉल्ट `"eu-central-1"`)।

### चरण 2: उपलब्ध ऐप्स की सूची देखें

```js
list_apps({ provider: "browserstack" })
list_apps({ provider: "saucelabs" })
list_apps({ provider: "testmu" })
list_apps({ provider: "testingbot" })
```

सभी प्रोवाइडर्स के लिए वैकल्पिक पैरामीटर:
- `sortBy`: `"app_name"` या `"uploaded_at"` (डिफ़ॉल्ट)
- `limit`: अधिकतम परिणाम (डिफ़ॉल्ट 20)

BrowserStack संगठन के सभी अपलोड्स की सूची देखने के लिए `organizationWide: true` का भी समर्थन करता है। Sauce Labs `region` स्वीकार करता है।

### चरण 3: सेशन शुरू करें

`upload_app` से प्राप्त ऐप रेफ़रेंस, या एक `customId` का उपयोग करें:

```js
// BrowserStack — Android
start_session({
  provider: "browserstack",
  platform: "android",
  deviceName: "Samsung Galaxy S24",
  platformVersion: "14.0",
  app: "bs://abc123..."
})

// Sauce Labs — iOS
start_session({
  provider: "saucelabs",
  platform: "ios",
  deviceName: "iPhone 15",
  platformVersion: "17.0",
  app: "storage:filename=MyApp.ipa"
})

// TestMu — Android
start_session({
  provider: "testmu",
  platform: "android",
  deviceName: "Samsung Galaxy S24",
  platformVersion: "14.0",
  app: "lt://abc123..."
})

// TestingBot — Android
start_session({
  provider: "testingbot",
  platform: "android",
  deviceName: "Samsung Galaxy S24",
  platformVersion: "14.0",
  app: "<app_url from upload_app>"
})
```

## लोकल टनल

सभी प्रोवाइडर्स एक लोकल टनल का समर्थन करते हैं ताकि क्लाउड सेशन आपकी मशीन पर मौजूद सर्वरों (localhost, स्टेजिंग एनवायरनमेंट, आंतरिक सेवाएँ) तक पहुँच सकें।

MCP सर्वर एक **एकीकृत `tunnel` पैरामीटर** का उपयोग करता है जो सभी प्रोवाइडर्स में एक समान रूप से काम करता है:

### स्वतः-प्रबंधित टनल (अनुशंसित)

MCP सर्वर टनल को स्वचालित रूप से शुरू और बंद करता है:

```js
start_session({
  provider: "browserstack",
  platform: "browser",
  browser: "chrome",
  tunnel: true
})
```

`tunnel: true` के साथ आपके पहले सेशन से पहले, MCP सर्वर टनल बाइनरी को डाउनलोड करने और शुरू करने का काम संभालता है। यदि आप सेटअप को मैन्युअल रूप से सत्यापित करना चाहते हैं, तो प्रोवाइडर का local-binary रिसोर्स पढ़ें:

- `wdio://browserstack/local-binary`
- `wdio://saucelabs/local-binary`
- `wdio://testmu/local-binary`
- `wdio://testingbot/local-binary`

जब आप सेशन बंद करते हैं तो टनल स्वचालित रूप से बंद हो जाता है।

### बाहरी टनल

यदि आप पहले से ही एक अलग प्रोसेस में टनल चला रहे हैं:

```js
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "chrome",
  tunnel: "external",
  tunnelName: "my-sauce-tunnel"
})
```

`"external"` MCP सर्वर को बताता है कि एक टनल पहले से चल रहा है; यह उपयुक्त capability फ़्लैग सेट करता है लेकिन कोई प्रोसेस शुरू या बंद नहीं करता। चल रहे टनल से मेल खाने के लिए `tunnelName` सेट करें।

### मैन्युअल टनल सेटअप

यदि आप टनल को मैन्युअल रूप से चलाना पसंद करते हैं, तो अपने प्रोवाइडर और प्लेटफ़ॉर्म के लिए MCP रिसोर्स से सेटअप निर्देश पढ़ें। उदाहरण के लिए:

```text
// सेटअप निर्देश पढ़ें (अपने AI क्लाइंट से)
wdio://saucelabs/local-binary
wdio://testingbot/local-binary
```

प्रत्येक रिसोर्स डाउनलोड URL, प्लेटफ़ॉर्म-विशिष्ट कमांड और डेमन निर्देश लौटाता है।

## रिपोर्टिंग

प्रोवाइडर के डैशबोर्ड के लिए सेशन को प्रोजेक्ट, बिल्ड और सेशन लेबल के साथ टैग करें। यह सभी प्रोवाइडर्स में एक समान रूप से काम करता है:

```js
start_session({
  provider: "browserstack",
  platform: "browser",
  browser: "chrome",
  reporting: {
    project: "My Project",
    build: "v2.1.0",
    session: "Login flow test"
  }
})
```

सेशन प्रोवाइडर के डैशबोर्ड में निर्दिष्ट प्रोजेक्ट और बिल्ड के अंतर्गत दिखाई देते हैं:
- BrowserStack: [Automate डैशबोर्ड](https://automate.browserstack.com)
- Sauce Labs: [टेस्ट परिणाम](https://app.saucelabs.com/dashboard/builds)
- TestMu: [Automation डैशबोर्ड](https://automation.lambdatest.com)
- TestingBot: [टेस्ट परिणाम](https://testingbot.com/members)

## प्रोवाइडर-विशिष्ट नोट्स

### BrowserStack

- ब्राउज़र सेशन: `os` के लिए `"Windows"` या `"OS X"` स्वीकार्य हैं। Windows संस्करण: `"10"`, `"11"`। macOS संस्करण: `"Ventura"`, `"Sonoma"`, `"Sequoia"`।
- ऐप मैनेजमेंट API: `list_apps` पर `organizationWide: true` सभी टीम अपलोड्स की सूची देता है।

### Sauce Labs

- **रीजन मायने रखते हैं।** डिफ़ॉल्ट रीजन `eu-central-1` है। यदि आपका अकाउंट किसी अन्य रीजन में है, तो मेल खाने के लिए `start_session`, `list_apps` और `upload_app` पर `region` सेट करें।
- मोबाइल सेशन `automationName` (`"XCUITest"` या `"UiAutomator2"`) का समर्थन करते हैं; प्रत्येक प्लेटफ़ॉर्म के लिए डिफ़ॉल्ट मान उचित हैं।
- Sauce Connect टनल `saucelabs` npm पैकेज के माध्यम से स्वतः-प्रबंधित होता है। `tunnel: true` के लिए किसी बाहरी बाइनरी की आवश्यकता नहीं है।

### TestMu

- `start_session`, `list_apps` और `upload_app` में प्रोवाइडर का नाम `"testmu"` है।
- ब्राउज़र सेशन `hub.lambdatest.com` से कनेक्ट होते हैं; मोबाइल सेशन `mobile-hub.lambdatest.com` से कनेक्ट होते हैं; यह स्वचालित रूप से संभाला जाता है।
- टनल `@lambdatest/node-tunnel` npm पैकेज के माध्यम से स्वतः-प्रबंधित होता है।
- मोबाइल ऐप मैनेजमेंट अलग-अलग API कॉल के माध्यम से Android और iOS दोनों ऐप्स प्राप्त करता है, फिर परिणामों को मर्ज करता है।

### TestingBot

- `start_session`, `list_apps` और `upload_app` में प्रोवाइडर का नाम `"testingbot"` है।
- ब्राउज़र और मोबाइल दोनों सेशन पोर्ट 443 पर `hub.testingbot.com` से कनेक्ट होते हैं (स्वचालित रूप से संभाला जाता है)।
- क्रेडेंशियल्स `TESTINGBOT_KEY` और `TESTINGBOT_SECRET` का उपयोग करते हैं (अन्य प्रोवाइडर्स की तरह username/access-key जोड़ी नहीं)।
- टनल `testingbot-tunnel-launcher` npm पैकेज के माध्यम से स्वतः-प्रबंधित होता है (Java 11+ आवश्यक)।
- कोई region पैरामीटर नहीं — TestingBot का हब ग्लोबल है।
- मोबाइल ब्राउज़र/एमुलेटर मोड समर्थित है: `app` के बजाय `browser` नाम (जैसे, `"chrome"`) के साथ `platform: "android"` या `"ios"` सेट करें।