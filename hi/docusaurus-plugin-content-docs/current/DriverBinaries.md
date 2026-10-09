---
id: driverbinaries
title: ड्राइवर बाइनरी
description: "WebdriverIO को ब्राउज़र ड्राइवर स्वचालित रूप से डाउनलोड और प्रबंधित करने दें, या Chromedriver, Geckodriver, Edgedriver और Safaridriver को मैन्युअल रूप से सेट अप करें।"
---

WebDriver प्रोटोकॉल पर आधारित ऑटोमेशन चलाने के लिए आपके पास ब्राउज़र ड्राइवर सेट अप होने चाहिए जो ऑटोमेशन कमांड का अनुवाद करते हैं और उन्हें ब्राउज़र में निष्पादित करने में सक्षम होते हैं।

## स्वचालित सेटअप

WebdriverIO `v8.14` और उससे ऊपर के संस्करणों के साथ अब किसी भी ब्राउज़र ड्राइवर को मैन्युअल रूप से डाउनलोड और सेटअप करने की आवश्यकता नहीं है क्योंकि यह WebdriverIO द्वारा संभाला जाता है। आपको बस वह ब्राउज़र निर्दिष्ट करना है जिसका आप परीक्षण करना चाहते हैं और बाकी काम WebdriverIO कर देगा।

ARM64 पर, macOS, Windows और Linux पर ड्राइवर सेटअप कैसे काम करता है, और जब इसे स्वचालित रूप से सेट अप नहीं किया जा सकता तो क्या करना है, इसके लिए [ARM64 पर Chromedriver](arm64-chromedriver) देखें।

### ऑटोमेशन के स्तर को कस्टमाइज़ करना

WebdriverIO में ऑटोमेशन के तीन स्तर हैं:

**1. [@puppeteer/browsers](https://www.npmjs.com/package/@puppeteer/browsers) का उपयोग करके ब्राउज़र डाउनलोड और इंस्टॉल करें।**

यदि आप [capabilities](configuration#capabilities-1) कॉन्फ़िगरेशन में `browserName`/`browserVersion` संयोजन निर्दिष्ट करते हैं, तो WebdriverIO अनुरोधित संयोजन को डाउनलोड और इंस्टॉल करेगा, भले ही मशीन पर पहले से कोई इंस्टॉलेशन मौजूद हो या नहीं। यदि आप `browserVersion` को छोड़ देते हैं, तो WebdriverIO पहले [locate-app](https://www.npmjs.com/package/locate-app) के साथ किसी मौजूदा इंस्टॉलेशन को खोजने और उपयोग करने का प्रयास करेगा, अन्यथा यह वर्तमान स्थिर ब्राउज़र रिलीज़ को डाउनलोड और इंस्टॉल करेगा। `browserVersion` के बारे में अधिक जानकारी के लिए, [यहाँ](capabilities#automate-different-browser-channels) देखें।

:::caution

स्वचालित ब्राउज़र सेटअप Microsoft Edge का समर्थन नहीं करता है। वर्तमान में, केवल Chrome, Chromium और Firefox समर्थित हैं।

:::

यदि आपके पास किसी ऐसे स्थान पर ब्राउज़र इंस्टॉलेशन है जिसे WebdriverIO द्वारा स्वतः पता नहीं लगाया जा सकता, तो आप ब्राउज़र बाइनरी निर्दिष्ट कर सकते हैं जो स्वचालित डाउनलोड और इंस्टॉलेशन को अक्षम कर देगा।

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // या 'firefox' या 'chromium'
            'goog:chromeOptions': { // या 'moz:firefoxOptions' या 'wdio:chromedriverOptions'
                binary: '/path/to/chrome'
            },
        }
    ]
}
```

**2. ड्राइवर डाउनलोड और इंस्टॉल करें: [Chrome for Testing](https://googlechromelabs.github.io/chrome-for-testing/) से Chromedriver, [edgedriver](https://www.npmjs.com/package/edgedriver) और [geckodriver](https://www.npmjs.com/package/geckodriver) पैकेज के साथ Edgedriver और Geckodriver।**

WebdriverIO हमेशा ऐसा करेगा, जब तक कि कॉन्फ़िगरेशन में ड्राइवर [binary](capabilities#binary) निर्दिष्ट न हो:

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // या 'firefox', 'msedge', 'safari', 'chromium'
            'wdio:chromedriverOptions': { // या 'wdio:geckodriverOptions', 'wdio:edgedriverOptions'
                binary: '/path/to/chromedriver' // या 'geckodriver', 'msedgedriver'
            }
        }
    ]
}
```

WebdriverIO डिफ़ॉल्ट रूप से Chrome for Testing से Chromedriver डाउनलोड करता है, लेकिन कुछ मामलों में यह [Electron रिलीज़](https://github.com/electron/electron/releases) का उपयोग करेगा:

- किसी Electron ऐप के लिए [`wdio:electronVersion`](capabilities#wdioelectronversion) सेट है। यह उसी रिलीज़ का उपयोग करता है, जब तक कि `browserVersion` और `CHROMEDRIVER_CDNURL` दोनों सेट न हों।
- Linux ARM64 पर Chrome `153.0.8001.0` से पुराना है, जहाँ Chrome for Testing के पास कोई Chromedriver बिल्ड नहीं है ([ARM64 पर Chromedriver](arm64-chromedriver) देखें)। यह समान Chromium मेजर वाली अंतिम रिलीज़ का उपयोग करता है।
- Chrome for Testing डाउनलोड विफल हो जाता है, उदाहरण के लिए किसी आउटेज के दौरान, और `CHROMEDRIVER_CDNURL` सेट नहीं है। यह समान Chromium मेजर वाली अंतिम रिलीज़ का उपयोग करता है।

:::info

WebdriverIO स्वचालित रूप से Safari ड्राइवर डाउनलोड नहीं करेगा क्योंकि यह macOS पर पहले से इंस्टॉल होता है।

:::

:::info Firefox / Geckodriver

Firefox ब्राउज़र के लिए (जैसे `stable_151.0.1`) [Geckodriver](https://github.com/mozilla/geckodriver/releases) (जैसे `0.36.0`) से अलग वर्ज़निंग योजना का उपयोग करता है, इसलिए ड्राइवर संस्करण चुनने के लिए `browserVersion` का उपयोग **नहीं** किया जाता है। डिफ़ॉल्ट रूप से WebdriverIO नवीनतम Geckodriver डाउनलोड करता है। किसी विशिष्ट ड्राइवर संस्करण को पिन करने के लिए, `wdio:geckodriverOptions` में `geckoDriverVersion` सेट करें:

```ts
{
    capabilities: [
        {
            browserName: 'firefox',
            browserVersion: 'stable_151.0.1',
            'wdio:geckodriverOptions': {
                geckoDriverVersion: '0.36.0'
            }
        }
    ]
}
```

:::

:::caution

ब्राउज़र के लिए `binary` निर्दिष्ट करने और संबंधित ड्राइवर `binary` को छोड़ने या इसके विपरीत करने से बचें। यदि केवल एक `binary` मान निर्दिष्ट किया गया है, तो WebdriverIO उसके साथ संगत ब्राउज़र/ड्राइवर का उपयोग करने या डाउनलोड करने का प्रयास करेगा। हालाँकि, कुछ परिदृश्यों में इसके परिणामस्वरूप असंगत संयोजन हो सकता है। इसलिए, यह अनुशंसा की जाती है कि संस्करण असंगतताओं के कारण होने वाली किसी भी समस्या से बचने के लिए आप हमेशा दोनों निर्दिष्ट करें।

:::

**3. ड्राइवर को शुरू/बंद करें।**

डिफ़ॉल्ट रूप से, WebdriverIO किसी मनमाने अप्रयुक्त पोर्ट का उपयोग करके ड्राइवर को स्वचालित रूप से शुरू और बंद करेगा। निम्नलिखित में से कोई भी कॉन्फ़िगरेशन निर्दिष्ट करने से यह सुविधा अक्षम हो जाएगी, जिसका अर्थ है कि आपको ड्राइवर को मैन्युअल रूप से शुरू और बंद करना होगा:

- [port](configuration#port) के लिए कोई भी मान।
- [protocol](configuration#protocol), [hostname](configuration#hostname), [path](configuration#path) के लिए डिफ़ॉल्ट से भिन्न कोई भी मान।
- [user](configuration#user) और [key](configuration#key) दोनों के लिए कोई भी मान।

## मैन्युअल सेटअप

निम्नलिखित में बताया गया है कि आप अभी भी प्रत्येक ड्राइवर को अलग-अलग कैसे सेट अप कर सकते हैं। आप सभी ड्राइवरों की सूची [`awesome-selenium`](https://github.com/christian-bromann/awesome-selenium#driver) README में पा सकते हैं।

:::tip

यदि आप मोबाइल और अन्य UI प्लेटफ़ॉर्म सेट अप करना चाहते हैं, तो हमारी [Appium Setup](appium) गाइड देखें।

:::

### Chromedriver

Chrome को स्वचालित करने के लिए आप Chromedriver को सीधे [प्रोजेक्ट वेबसाइट](http://chromedriver.chromium.org/downloads) से या NPM पैकेज के माध्यम से डाउनलोड कर सकते हैं:

```bash npm2yarn
npm install -g chromedriver
```

फिर आप इसे इस प्रकार शुरू कर सकते हैं:

```sh
chromedriver --port=4444 --verbose
```

### Geckodriver

Firefox को स्वचालित करने के लिए अपने एनवायरनमेंट के लिए `geckodriver` का नवीनतम संस्करण डाउनलोड करें और इसे अपनी प्रोजेक्ट डायरेक्टरी में अनपैक करें:

<Tabs
  defaultValue="npm"
  values={[
    {label: 'NPM', value: 'npm'},
    {label: 'Curl', value: 'curl'},
    {label: 'Brew', value: 'brew'},
    {label: 'Windows (64 bit / Chocolatey)', value: 'chocolatey'},
    {label: 'Windows (64 bit / Powershell) DevTools', value: 'powershell'},
  ]
}>
<TabItem value="npm">

```bash npm2yarn
npm install geckodriver
```

</TabItem>
<TabItem value="curl">

Linux:

```sh
curl -L https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-linux64.tar.gz | tar xz
```

MacOS (64 bit):

```sh
curl -L https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-macos.tar.gz | tar xz
```

</TabItem>
<TabItem value="brew">

```sh
brew install geckodriver
```

</TabItem>
<TabItem value="chocolatey">

```sh
choco install selenium-gecko-driver
```

</TabItem>
<TabItem value="powershell">

```sh
# विशेषाधिकार प्राप्त सत्र के रूप में चलाएँ। राइट-क्लिक करें और 'Run as Administrator' सेट करें
# 32 बिट Windows के लिए geckodriver-v0.24.0-win32.zip का उपयोग करें
$url = "https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-win64.zip"
$output = "geckodriver.zip" # अन्यथा परिभाषित न होने पर वर्तमान डायरेक्टरी में रखा जाएगा
$unzipped_file = "geckodriver" # इस फ़ोल्डर नाम में अनज़िप होगा

# डिफ़ॉल्ट रूप से, Powershell TLS 1.0 का उपयोग करता है, जबकि साइट सुरक्षा के लिए TLS 1.2 आवश्यक है
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# Geckodriver डाउनलोड करता है
Invoke-WebRequest -Uri $url -OutFile $output

# Geckodriver को अनज़िप करें
Expand-Archive $output -DestinationPath $unzipped_file
cd $unzipped_file

# Geckodriver को वैश्विक रूप से PATH में सेट करें
[System.Environment]::SetEnvironmentVariable("PATH", "$Env:Path;$pwd\geckodriver.exe", [System.EnvironmentVariableTarget]::Machine)
```

</TabItem>
</Tabs>

**नोट:** अन्य `geckodriver` रिलीज़ [यहाँ](https://github.com/mozilla/geckodriver/releases) उपलब्ध हैं। डाउनलोड के बाद आप ड्राइवर को इस प्रकार शुरू कर सकते हैं:

```sh
/path/to/binary/geckodriver --port 4444
```

### Edgedriver

आप Microsoft Edge के लिए ड्राइवर को [प्रोजेक्ट वेबसाइट](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/) से या NPM पैकेज के रूप में इस प्रकार डाउनलोड कर सकते हैं:

```sh
npm install -g edgedriver
edgedriver --version # प्रिंट करता है: Microsoft Edge WebDriver 115.0.1901.203 (a5a2b1779bcfe71f081bc9104cca968d420a89ac)
```

### Safaridriver

Safaridriver आपके MacOS पर पहले से इंस्टॉल आता है और इसे सीधे इस प्रकार शुरू किया जा सकता है:

```sh
safaridriver -p 4444
```