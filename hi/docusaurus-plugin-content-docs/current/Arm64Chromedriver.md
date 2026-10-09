---
id: arm64-chromedriver
title: ARM64 पर Chromedriver
description: WebdriverIO ARM64 macOS, Windows और Linux पर Chromedriver को कैसे सेट अप करता है, और जब कोई मेल खाने वाला Linux ARM64 ड्राइवर मौजूद न हो तो क्या करें।
---

WebdriverIO ARM64 पर Chromedriver को स्वचालित रूप से सेट अप करता है। **macOS** (Apple silicon) पर, Chrome for Testing हर संस्करण के लिए एक नेटिव `mac-arm64` Chromedriver प्रकाशित करता है, इसलिए कुछ भी सेट अप करने की आवश्यकता नहीं है। **Windows 11 on Arm** पर भी यह बिना किसी कॉन्फ़िगरेशन के काम करता है: Chrome for Testing कोई `win-arm64` Chromedriver प्रकाशित नहीं करता, लेकिन इसका `win64` (x64) Chromedriver Windows के पारदर्शी [x64 इम्यूलेशन](https://learn.microsoft.com/en-us/windows/arm/apps-on-arm-x86-emulation) के तहत चलता है और इंस्टॉल किए गए ARM64 Chrome तथा उस x64 Chrome for Testing ब्राउज़र, दोनों को चलाता है जिसे WebdriverIO अन्यथा डाउनलोड करता है। **Linux ARM64** पर, `153.0.8001.0` से पुराने Chrome संस्करणों पर अधिक ध्यान देने की आवश्यकता है, जिसे नीचे कवर किया गया है।

## Linux ARM64

Chrome for Testing, Chrome **`153.0.8001.0`** से आगे के लिए `linux-arm64` Chromedriver बनाता है, और WebdriverIO इसका सीधे उपयोग करता है। किसी पुराने Chrome या Chromium के लिए, जैसे कि `goog:chromeOptions.binary` के रूप में सेट किया गया कोई ब्राउज़र, यह किसी [Electron रिलीज़](https://github.com/electron/electron/releases) में बंडल किया गया वह Chromedriver डाउनलोड करता है जो आवश्यक Chromium मेजर संस्करण से मेल खाता है। यह डाउनलोड `CHROMEDRIVER_CDNURL` सेट होने पर भी GitHub से आता है, क्योंकि Chrome for Testing के पास `153.0.8001.0` से नीचे कोई `linux-arm64` Chromedriver नहीं है जिसे कोई मिरर उपलब्ध करा सके; ऑफ़लाइन होने पर, [नीचे](#no-electron-release-ships-a-matching-chromedriver) दिखाए अनुसार अपने डिस्ट्रीब्यूशन के Chromium और ड्राइवर का उपयोग करें।

Chrome for Testing के पास `153.0.8001.0` से पहले कोई `linux-arm64` ब्राउज़र बिल्ड भी नहीं है, इसलिए `browserVersion` को उससे नीचे केवल तभी पिन करें जब साथ में `goog:chromeOptions.binary` किसी ARM64 ब्राउज़र की ओर इंगित कर रहा हो।

## Electron ऐप्स

`wdio:electronVersion` हर ARM64 प्लेटफ़ॉर्म पर, किसी दिए गए Electron रिलीज़ के साथ बंडल किया गया Chromedriver डाउनलोड करता है। किसी Electron ऐप के लिए, Electron सर्विस इसे ऐप के Electron संस्करण से सेट करती है। विवरण के लिए [Capabilities](capabilities#wdioelectronversion) देखें।

## समस्या निवारण

### कोई भी Electron रिलीज़ मेल खाने वाला Chromedriver प्रदान नहीं करता

कुछ Chromium मेजर संस्करण, जैसे 145, कभी किसी Electron रिलीज़ में शामिल नहीं हुए। ऐसे में WebdriverIO बेमेल ड्राइवर इंस्टॉल करने के बजाय विफल हो जाता है:

```
Chrome for Testing has no linux-arm64 Chromedriver before v153.0.8001.0, and no Electron release ships one for Chrome v145.0.7632.117. See https://webdriver.io/docs/arm64-chromedriver
```

इसे हल करने के लिए:

- **Chrome/Chromium `153.0.8001.0` या बाद के संस्करण का उपयोग करें** ताकि Chrome for Testing सीधे ड्राइवर उपलब्ध करा सके।
- **Debian पर, उसके Chromium और ड्राइवर का उपयोग करें**, जो एक मेल खाने वाली arm64 जोड़ी है:
  ```bash
  sudo apt-get install -y chromium chromium-driver
  ```
  ```ts title="wdio.conf.ts"
  export const config: WebdriverIO.Config = {
      // ...
      capabilities: [{
          browserName: 'chrome',
          'goog:chromeOptions': { binary: '/usr/bin/chromium' },
          'wdio:chromedriverOptions': { binary: '/usr/bin/chromedriver' }
      }]
  }
  ```
- **अपना स्वयं का Chromedriver लाएँ** `wdio:chromedriverOptions.binary` के साथ, जो डाउनलोड को पूरी तरह से अक्षम कर देता है।

## संबंधित

- [Driver Binaries](driverbinaries): WebdriverIO ब्राउज़र ड्राइवरों को कैसे डाउनलोड और कैश करता है, जिसमें Chrome for Testing के विफल होने पर फ़ॉलबैक भी शामिल है।
- [Capabilities](capabilities#wdioelectronversion): `wdio:electronVersion` विकल्प।