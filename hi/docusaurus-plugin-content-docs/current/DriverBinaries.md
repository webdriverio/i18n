---
id: driverbinaries
title: ड्राइवर बाइनरीज़
---

WebDriver प्रोटोकॉल पर आधारित ऑटोमेशन चलाने के लिए आपको ब्राउज़र ड्राइवर्स की आवश्यकता होती है जो ऑटोमेशन कमांड्स का अनुवाद करते हैं और उन्हें ब्राउज़र में निष्पादित कर सकते हैं।

## स्वचालित सेटअप

WebdriverIO `v8.14` और उससे ऊपर के संस्करणों में मैन्युअल रूप से किसी भी ब्राउज़र ड्राइवर को डाउनलोड और सेटअप करने की आवश्यकता नहीं है क्योंकि यह WebdriverIO द्वारा संभाला जाता है। आपको केवल उस ब्राउज़र को निर्दिष्ट करना होगा जिसे आप परीक्षण करना चाहते हैं और WebdriverIO बाकी काम कर देगा।

### स्वचालन के स्तर को अनुकूलित करना

WebdriverIO के तीन स्तर के स्वचालन हैं:

**1. [@puppeteer/browsers](https://www.npmjs.com/package/@puppeteer/browsers) का उपयोग करके ब्राउज़र डाउनलोड और इंस्टॉल करें।**

यदि आप [capabilities](configuration#capabilities-1) कॉन्फ़िगरेशन में `browserName`/`browserVersion` संयोजन निर्दिष्ट करते हैं, तो WebdriverIO अनुरोधित संयोजन को डाउनलोड और इंस्टॉल करेगा, चाहे मशीन पर पहले से कोई इंस्टॉलेशन मौजूद हो या नहीं। यदि आप `browserVersion` छोड़ते हैं, तो WebdriverIO पहले [locate-app](https://www.npmjs.com/package/locate-app) के साथ मौजूदा इंस्टॉलेशन का पता लगाने और उपयोग करने का प्रयास करेगा, अन्यथा यह वर्तमान स्थिर ब्राउज़र रिलीज को डाउनलोड और इंस्टॉल करेगा। `browserVersion` के बारे में अधिक जानकारी के लिए, [यहां](capabilities#automate-different-browser-channels) देखें।

:::caution

स्वचालित ब्राउज़र सेटअप Microsoft Edge का समर्थन नहीं करता है। वर्तमान में, केवल Chrome, Chromium और Firefox समर्थित हैं।

:::

यदि आपके पास एक ऐसे स्थान पर ब्राउज़र इंस्टॉलेशन है जिसे WebdriverIO द्वारा स्वचालित रूप से पता नहीं लगाया जा सकता है, तो आप ब्राउज़र बाइनरी निर्दिष्ट कर सकते हैं जो स्वचालित डाउनलोड और इंस्टॉलेशन को अक्षम कर देगा।

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

**2. [Chromedriver](https://www.npmjs.com/package/chromedriver), [Edgedriver](https://www.npmjs.com/package/edgedriver) या [Geckodriver](https://www.npmjs.com/package/geckodriver) का उपयोग करके ड्राइवर डाउनलोड और इंस्टॉल करें।**

WebdriverIO हमेशा यह करेगा, जब तक कि कॉन्फ़िगरेशन में ड्राइवर [binary](capabilities#binary) निर्दिष्ट नहीं किया गया है:

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

:::info

WebdriverIO स्वचालित रूप से Safari ड्राइवर डाउनलोड नहीं करेगा क्योंकि यह पहले से ही macOS पर इंस्टॉल है।

:::

:::caution

ब्राउज़र के लिए `binary` निर्दिष्ट करने और संबंधित ड्राइवर `binary` को छोड़ने या इसके विपरीत से बचें। यदि केवल `binary` मानों में से एक ही निर्दिष्ट किया गया है, तो WebdriverIO उसके साथ संगत ब्राउज़र/ड्राइवर का उपयोग करने या डाउनलोड करने का प्रयास करेगा। हालांकि, कुछ परिदृश्यों में यह एक असंगत संयोजन के परिणामस्वरूप हो सकता है। इसलिए, संस्करण असंगतताओं के कारण होने वाली किसी भी समस्या से बचने के लिए हमेशा दोनों को निर्दिष्ट करने की सिफारिश की जाती है।

:::

**3. ड्राइवर को शुरू/बंद करें।**

डिफ़ॉल्ट रूप से, WebdriverIO स्वचालित रूप से एक मनमाने अप्रयुक्त पोर्ट का उपयोग करके ड्राइवर को शुरू और बंद करेगा। निम्नलिखित में से किसी भी कॉन्फ़िगरेशन को निर्दिष्ट करने से यह सुविधा अक्षम हो जाएगी, जिसका अर्थ है कि आपको मैन्युअल रूप से ड्राइवर को शुरू और बंद करने की आवश्यकता होगी:

- [port](configuration#port) के लिए कोई भी मान।
- [protocol](configuration#protocol), [hostname](configuration#hostname), [path](configuration#path) के लिए डिफ़ॉल्ट से अलग कोई भी मान।
- [user](configuration#user) और [key](configuration#key) दोनों के लिए कोई भी मान।

## मैनुअल सेटअप

निम्नलिखित बताता है कि आप अभी भी प्रत्येक ड्राइवर को व्यक्तिगत रूप से कैसे सेट कर सकते हैं। आप [`awesome-selenium`](https://github.com/christian-bromann/awesome-selenium#driver) README में सभी ड्राइवरों की एक सूची पा सकते हैं।

:::tip

यदि आप मोबाइल और अन्य UI प्लेटफार्म सेट करना चाहते हैं, तो हमारे [Appium Setup](appium) गाइड पर एक नज़र डालें।

:::

### Chromedriver

Chrome को ऑटोमेट करने के लिए आप Chromedriver को सीधे [project website](http://chromedriver.chromium.org/downloads) पर या NPM पैकेज के माध्यम से डाउनलोड कर सकते हैं:

```bash npm2yarn
npm install -g chromedriver
```

फिर आप इसे इस प्रकार शुरू कर सकते हैं:

```sh
chromedriver --port=4444 --verbose
```

### Geckodriver

Firefox को ऑटोमेट करने के लिए अपने पर्यावरण के लिए `geckodriver` का नवीनतम संस्करण डाउनलोड करें और इसे अपनी प्रोजेक्ट डायरेक्टरी में अनपैक करें:

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
# Run as privileged session. Right-click and set 'Run as Administrator'
# Use geckodriver-v0.24.0-win32.zip for 32 bit Windows
$url = "https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-win64.zip"
$output = "geckodriver.zip" # will drop into current directory unless defined otherwise
$unzipped_file = "geckodriver" # will unzip to this folder name

# By default, Powershell uses TLS 1.0 the site security requires TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# Downloads Geckodriver
Invoke-WebRequest -Uri $url -OutFile $output

# Unzip Geckodriver
Expand-Archive $output -DestinationPath $unzipped_file
cd $unzipped_file

# Globally Set Geckodriver to PATH
[System.Environment]::SetEnvironmentVariable("PATH", "$Env:Path;$pwd\geckodriver.exe", [System.EnvironmentVariableTarget]::Machine)
```

</TabItem>
</Tabs>

**नोट:** अन्य `geckodriver` रिलीज [यहां](https://github.com/mozilla/geckodriver/releases) उपलब्ध हैं। डाउनलोड के बाद आप ड्राइवर को इस प्रकार शुरू कर सकते हैं:

```sh
/path/to/binary/geckodriver --port 4444
```

### Edgedriver

आप Microsoft Edge के लिए ड्राइवर को [project website](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/) पर या NPM पैकेज के माध्यम से डाउनलोड कर सकते हैं:

```sh
npm install -g edgedriver
edgedriver --version # prints: Microsoft Edge WebDriver 115.0.1901.203 (a5a2b1779bcfe71f081bc9104cca968d420a89ac)
```

### Safaridriver

Safaridriver आपके MacOS पर पहले से इंस्टॉल है और इसे सीधे इस प्रकार शुरू किया जा सकता है:

```sh
safaridriver -p 4444
```