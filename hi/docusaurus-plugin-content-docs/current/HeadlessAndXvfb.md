---
id: headless-and-xvfb
title: टेस्टरनर के साथ हेडलेस और Xvfb
description: WebdriverIO लिनक्स पर हेडलेस टेस्टिंग के लिए Xvfb का उपयोग कैसे करता है, कॉन्फ़िगरेशन विकल्प, CI रेसिपी, और समस्या निवारण।
---

इस पेज में बताया गया है कि WebdriverIO टेस्टरनर Xvfb (X Virtual Framebuffer) का उपयोग करके लिनक्स पर हेडलेस एक्जीक्यूशन का समर्थन कैसे करता है। यह कवर करता है कि Xvfb कब उपयोगी है, इसे कैसे कॉन्फ़िगर करें, और यह CI और Docker में कैसे व्यवहार करता है।

## कब Xvfb बनाम नेटिव हेडलेस का उपयोग करें

- जब संभव हो तो न्यूनतम ओवरहेड के लिए नेटिव हेडलेस (जैसे, Chrome `--headless=...`) का उपयोग करें।
- Xvfb का उपयोग करें जब:
  - इलेक्ट्रॉन या ऐसे ऐप्स का परीक्षण कर रहे हों जिन्हें विंडो मैनेजर या डेस्कटॉप वातावरण की आवश्यकता हो
  - आप GLX या विंडो-मैनेजर पर निर्भर व्यवहारों पर निर्भर हैं
  - आपके टूल्स को डिस्प्ले सर्वर (`DISPLAY`) की अपेक्षा है
  - आप Chromium त्रुटियों से सामना करते हैं जैसे:
    - `session not created: probably user data directory is already in use ...`
    - `Chrome failed to start: exited abnormally. (DevToolsActivePort file doesn't exist)`
    उपयोगकर्ता डेटा डायरेक्टरी टकराव त्रुटि भ्रामक हो सकती है क्योंकि यह अक्सर ब्राउज़र क्रैश और तत्काल रीस्टार्ट का परिणाम होती है जो पिछले इंस्टेंस से समान प्रोफाइल डायरेक्टरी का पुन: उपयोग करती है। स्थिर डिस्प्ले सुनिश्चित करना (जैसे, Xvfb के माध्यम से) अक्सर इसे हल करता है - यदि नहीं, तो आपको प्रति वर्कर एक अद्वितीय `--user-data-dir` पास करना चाहिए।

## कॉन्फिगरेशन

चार रनर विकल्प Xvfb व्यवहार को नियंत्रित करते हैं:

- `autoXvfb` (boolean, डिफ़ॉल्ट: true)
  - उपयोग के लिए आधिकारिक टॉगल। यदि `false`, रनर कभी भी Xvfb का उपयोग नहीं करता।
  - यदि `true`, रनर आवश्यकतानुसार Xvfb का उपयोग कर सकता है।

- `xvfbAutoInstall` (boolean, डिफ़ॉल्ट: false)
  - यदि `xvfb-run` गायब है तो स्वचालित इंस्टॉलेशन सक्षम करें
  - जब false होता है, तो रनर चेतावनी देगा और इंस्टॉल किए बिना जारी रखेगा

- `xvfbAutoInstallMode` ('root' | 'sudo', डिफ़ॉल्ट: 'sudo')
  - 'root': केवल रूट के रूप में चलने पर इंस्टॉल करें (सुडो नहीं)
  - 'sudo': यदि रूट नहीं है तो गैर-इंटरएक्टिव सुडो (`sudo -n`) की अनुमति दें; यदि सुडो गायब है तो छोड़ दें

- `xvfbAutoInstallCommand` (string | string[], वैकल्पिक)
  - अंतर्निहित पैकेज मैनेजर डिटेक्शन के बजाय इंस्टॉलेशन के लिए उपयोग करने के लिए कस्टम कमांड
  - जब प्रदान किया जाता है, तो यह कमांड जैसा है वैसा ही निष्पादित होता है और अंतर्निहित इंस्टॉलेशन लॉजिक को ओवरराइड करता है

- `xvfbMaxRetries` (number, डिफ़ॉल्ट: 3)
  - xvfb प्रोसेस विफलताओं के लिए पुनः प्रयास की संख्या।
  - अस्थिर CI वातावरण के लिए उपयोगी जहां Xvfb स्टार्टअप कभी-कभी विफल हो सकता है।

- `xvfbRetryDelay` (number, डिफ़ॉल्ट: 1000)
  - xvfb प्रोसेस विफलताओं के लिए पुनः प्रयासों के बीच मिलीसेकंड में आधार देरी।
  - प्रगतिशील देरी का उपयोग करता है: देरी × प्रयास संख्या (जैसे, 1000ms, 2000ms, 3000ms, आदि)।

उदाहरण:

```ts
export const config: WebdriverIO.Config = {
  // आवश्यकतानुसार Xvfb का उपयोग करें
  autoXvfb: true,

  // sudo का उपयोग करके Xvfb पैकेज स्वचालित रूप से इंस्टॉल करें
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

```ts
export const config: WebdriverIO.Config = {
  // आवश्यकतानुसार Xvfb का उपयोग करें
  autoXvfb: true,

  // कस्टम कमांड और sudo का उपयोग करके Xvfb पैकेज स्वचालित रूप से इंस्टॉल करें
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',
  xvfbAutoInstallCommand: 'curl -L https://github.com/X11/xvfb/releases/download/v1.20.14/xvfb-linux-x64.tar.gz | tar -xz -C /usr/local/bin/',

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

```ts
export const config: WebdriverIO.Config = {
  // आवश्यकतानुसार Xvfb का उपयोग करें
  autoXvfb: true,

  // sudo का उपयोग करके Xvfb पैकेज स्वचालित रूप से इंस्टॉल करें
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',

  // अस्थिर CI वातावरणों के लिए रिट्राई व्यवहार कॉन्फ़िगर करें
  xvfbMaxRetries: 5,
  xvfbRetryDelay: 1500,

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

## डिटेक्शन लॉजिक

- रनर Xvfb पर विचार करता है जब:

  - लिनक्स पर चल रहा हो
  - कोई `DISPLAY` सेट नहीं है (हेडलेस वातावरण), या हेडलेस ब्राउज़र फ्लैग पास किए गए हों

- यदि `DISPLAY` सेट है, तो रनर डिफ़ॉल्ट रूप से Xvfb को फोर्स नहीं करेगा और आपके मौजूदा X सर्वर/विंडो मैनेजर का सम्मान करेगा।

नोट्स:
- `autoXvfb: false` Xvfb उपयोग को पूरी तरह से अक्षम करता है (कोई `xvfb-run` के साथ रैपिंग नहीं)।
- `xvfbAutoInstall` केवल इंस्टॉलेशन को प्रभावित करता है यदि `xvfb-run` गायब है; यह उपयोग को चालू/बंद नहीं करता।
- `xvfbAutoInstallMode` इंस्टॉलेशन विधि को नियंत्रित करता है: 'root' केवल रूट इंस्टॉल के लिए, 'sudo' सुडो-आधारित इंस्टॉल के लिए (डिफ़ॉल्ट: 'sudo')।
- अंतर्निहित पैकेज इंस्टॉल हमेशा गैर-इंटरैक्टिव होते हैं। केवल रूट जब तक आप 'sudo' मोड में ऑप्ट इन नहीं करते।
- रिट्राई तंत्र प्रगतिशील देरी का उपयोग करता है: `xvfbRetryDelay × प्रयास संख्या` (जैसे, 1000ms, 2000ms, 3000ms, आदि)।

## CI में मौजूदा DISPLAY का उपयोग करना

यदि आपका CI अपना स्वयं का X सर्वर/विंडो मैनेजर सेट करता है (जैसे, `Xvfb :99` और WM के साथ), तो या तो:

- `autoXvfb: true` छोड़ दें और सुनिश्चित करें कि `DISPLAY` एक्सपोर्ट किया गया है; रनर इसका सम्मान करेगा और रैपिंग से बचेगा।
- या `autoXvfb: false` सेट करें ताकि रनर से किसी भी Xvfb व्यवहार को स्पष्ट रूप से अक्षम किया जा सके।

## CI और Docker रेसिपी

GitHub Actions (नेटिव हेडलेस का उपयोग करना):

```yaml
- name: Run tests
  run: npx wdio run ./wdio.conf.ts
```

GitHub Actions (यदि गायब है और ऑप्ट इन किया गया है तो Xvfb के माध्यम से वर्चुअल डिस्प्ले):

```ts
// wdio.conf.ts
export const config = {
  autoXvfb: true,
  xvfbAutoInstall: true
}
```

Docker (Ubuntu/Debian उदाहरण – xvfb प्री-इंस्टॉल):

```Dockerfile
RUN apt-get update -qq && apt-get install -y xvfb
```

अन्य डिस्ट्रीब्यूशन के लिए, पैकेज मैनेजर और पैकेज नाम को तदनुसार समायोजित करें (उदा., Fedora/RHEL-आधारित पर `dnf install xorg-x11-server-Xvfb`, openSUSE/SLE पर `zypper install xvfb-run`)।

## स्वचालित इंस्टॉलेशन सपोर्ट (xvfbAutoInstall)

जब `xvfbAutoInstall` सक्षम होता है, तो WebdriverIO आपके सिस्टम पैकेज मैनेजर का उपयोग करके `xvfb` इंस्टॉल करने का प्रयास करता है। निम्नलिखित मैनेजर और पैकेज समर्थित हैं:

| पैकेज मैनेजर | कमांड         | डिस्ट्रीब्यूशन (उदाहरण)                                      | पैकेज नाम                        |
|-----------------|-----------------|-------------------------------------------------------------|----------------------------------|
| apt             | `apt-get`       | Ubuntu, Debian, Pop!_OS, Mint, Elementary, Zorin, आदि।      | `xvfb`                           |
| dnf             | `dnf`           | Fedora, Rocky Linux, AlmaLinux, Nobara, Bazzite, आदि।       | `xorg-x11-server-Xvfb`           |
| yum             | `yum`           | CentOS, RHEL (लेगेसी)                                       | `xorg-x11-server-Xvfb`           |
| zypper          | `zypper`        | openSUSE, SUSE Linux Enterprise                             | `xvfb-run`                       |
| pacman          | `pacman`        | Arch Linux, Manjaro, EndeavourOS, CachyOS, आदि।             | `xorg-server-xvfb`               |
| apk             | `apk`           | Alpine Linux, PostmarketOS                                  | `xvfb-run`                       |
| xbps-install    | `xbps-install`  | Void Linux                                                  | `xvfb`                           |

नोट्स:
- यदि आपका वातावरण एक अलग पैकेज मैनेजर का उपयोग करता है, तो इंस्टॉल त्रुटि के साथ विफल हो जाएगा; `xvfb` को मैन्युअल रूप से इंस्टॉल करें।
- पैकेज नाम डिस्ट्रो-विशिष्ट हैं; तालिका प्रति परिवार सामान्य नामों को दर्शाती है।

## समस्या निवारण

- "xvfb-run failed to start"
  - रनर प्रगतिशील बैकऑफ के साथ Xvfb-संबंधित विफलताओं को स्वचालित रूप से पुनः प्रयास करता है। यदि विफलताएं बनी रहती हैं, तो अस्थिर वातावरणों के लिए `xvfbMaxRetries` और `xvfbRetryDelay` बढ़ाएं।

- CI में अनपेक्षित रूप से Xvfb रैप्ड
  - यदि आपके पास एक कस्टम `DISPLAY` / WM सेटअप है, तो `autoXvfb: false` सेट करें या सुनिश्चित करें कि रनर शुरू होने से पहले `DISPLAY` एक्सपोर्ट किया गया है।

- गायब `xvfb-run`
  - वातावरण को संशोधित करने से बचने के लिए `xvfbAutoInstall: false` रखें; अपनी बेस इमेज के माध्यम से इंस्टॉल करें या ऑप्ट इन करने के लिए `xvfbAutoInstall: true` सेट करें।

- CI में बार-बार Xvfb स्टार्टअप विफलताएँ
  - अस्थिर वातावरणों में अधिक लचीला व्यवहार के लिए `xvfbMaxRetries` (जैसे, 5-10 तक) और `xvfbRetryDelay` (जैसे, 2000ms तक) बढ़ाएं।

## उन्नत

- रनर एक फैक्टरी के माध्यम से प्रोसेस बनाता है जो नोड वर्कर को `xvfb-run` के साथ रैप करता है यदि Xvfb की आवश्यकता हो और उपलब्ध हो।
- हेडलेस ब्राउज़र फ्लैग (Chrome/Edge/Firefox) हेडलेस उपयोग का संकेत देते हैं और `DISPLAY` के बिना वातावरणों में Xvfb को ट्रिगर कर सकते हैं।