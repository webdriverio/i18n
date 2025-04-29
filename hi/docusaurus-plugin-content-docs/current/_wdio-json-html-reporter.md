---
id: wdio-json-html-reporter
title: JSON HTML रिपोर्टर रिपोर्टर
custom_edit_url: https://github.com/aswinchembath/wdio-json-html-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-json-html-reporter एक तृतीय पक्ष पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/aswinchembath/wdio-json-html-reporter) | [npm](https://www.npmjs.com/package/wdio-json-html-reporter)

यह एक कस्टम WebDriverIO रिपोर्टर है जो परीक्षण निष्पादन के दौरान विस्तृत JSON रिपोर्ट जनरेट करता है और आपके परीक्षण परिणामों को विज़ुअलाइज़ करने के लिए एक पोर्टेबल HTML रिपोर्ट जनरेटर प्रदान करता है। यह टाइमस्टैंप्स, निष्पादन मेटाडेटा को लॉग करता है, और मांग पर स्क्रीनशॉट्स कैप्चर कर सकता है। यह पैकेज रिपोर्टर्स के लिए WebDriverIO कन्वेंशन का पालन करता है और `wdio-json-html-reporter` नाम के तहत एक npm पैकेज के रूप में प्रकाशित किया गया है।

## विषय सूची

- [अवलोकन](#overview)
- [विशेषताएँ](#features)
- [स्थापना](#installation)
  - [1. पैकेज स्थापित करें](#1-install-the-package)
  - [2. स्थापना सत्यापित करें](#2-verify-installation)
  - [3. WebDriverIO कॉन्फ़िगरेशन अपडेट करें](#3-update-webdriverio-configuration)
  - [4. अपने परीक्षण चलाएँ](#4-run-your-tests)
- [CLI उपयोग](#cli-usage)
- [इतिहास विकल्प और समेकित इतिहास जनरेशन](#history-option-and-aggregated-history-generation)
- [स्क्रीनशॉट](#screenshots)

## अवलोकन

WDIO JSON HTML REPORTER दो मुख्य घटक प्रदान करता है:

- **JSONReporter**: एक कस्टम रिपोर्टर जो परीक्षण इवेंट्स को एकत्र करने और मेटाडेटा, परीक्षण परिणामों और (वैकल्पिक रूप से) स्क्रीनशॉट्स के साथ JSON फ़ाइल जनरेट करने के लिए WebDriverIO रिपोर्टर इंटरफेस का विस्तार करता है।
- **HTMLReportGenerator**: एक यूटिलिटी जो कई JSON रिपोर्ट फ़ाइलों को इंटरैक्टिव चार्ट, फ़िल्टरिंग और निर्यात कार्यक्षमता के साथ एक व्यापक HTML रिपोर्ट में परिवर्तित करती है। इसके अतिरिक्त, रिपोर्ट जनरेटर अब एक वैकल्पिक इतिहास फ़ाइल का समर्थन करता है जो ऐतिहासिक निष्पादन डेटा प्रदर्शित करता है यदि उपलब्ध हो। जब कोई इतिहास डेटा प्रदान नहीं किया जाता है, तो रिपोर्ट ऐतिहासिक अनुभाग को छोड़ देती है और केवल अद्वितीय त्रुटियाँ दिखाती है।

ये उपकरण आपको अपने परीक्षण रन के बारे में स्पष्ट अंतर्दृष्टि प्राप्त करने में मदद करते हैं, जो डीबगिंग और निरंतर एकीकरण के लिए आवश्यक है।

## विशेषताएँ

- **JSON रिपोर्टिंग**: टाइमस्टैम्प, सूट नाम, परीक्षण परिणाम, त्रुटियों और वैकल्पिक स्क्रीनशॉट के साथ विस्तृत रिपोर्ट।
- **HTML रिपोर्टिंग**: JSON रिपोर्ट को डैशबोर्ड, चार्ट, विस्तृत परीक्षण रिपोर्ट और फ़िल्टरिंग क्षमताओं के साथ पोर्टेबल HTML रिपोर्ट में परिवर्तित करता है।
- **Excel में निर्यात**: विस्तृत परीक्षण रिपोर्ट को Excel फ़ाइल में निर्यात किया जा सकता है।
- **स्क्रीनशॉट समर्थन**: आपके कॉन्फ़िगरेशन के आधार पर असफल परीक्षणों (या सभी परीक्षणों) के लिए स्क्रीनशॉट कैप्चर करें।
- **निष्पादन मेटाडेटा**: ब्राउज़र जानकारी, निष्पादन प्रारंभ/समाप्ति समय और समग्र अवधि लॉग करता है।
- **ऐतिहासिक निष्पादन (वैकल्पिक)**: सूट द्वारा ऐतिहासिक निष्पादन डेटा शामिल करने के लिए एक इतिहास JSON फ़ाइल प्रदान करें। यदि कोई ऐतिहासिक डेटा प्रदान नहीं किया जाता है, तो रिपोर्ट स्वचालित रूप से इस अनुभाग को छिपा देगी और केवल अद्वितीय त्रुटियाँ प्रदर्शित करेगी।
- **समेकित इतिहास जनरेशन**: JSON रिपोर्टर अब एक समेकित इतिहास जनरेशन सुविधा शामिल करता है। स्थैतिक विधि `JSONReporter.generateAggregateHistory({ reportPaths, historyPath, maxHistory })` का उपयोग करके, आप स्वचालित रूप से अपनी रिपोर्ट डायरेक्टरी में सभी JSON रिपोर्ट फ़ाइलों (पैटर्न `test-report-*.json` से मेल खाते) को स्कैन कर सकते हैं, परीक्षण परिणामों को एकत्रित कर सकते हैं, और ऐतिहासिक डेटा के आधार पर दोष तुलना की गणना कर सकते हैं। समेकित इतिहास रिकॉर्ड फिर आपकी इतिहास फ़ाइल में जोड़ा जाता है और HTML रिपोर्ट जनरेटर द्वारा समय के साथ रुझानों को विज़ुअलाइज़ करने के लिए उपयोग किया जा सकता है।

## स्थापना

`wdio-json-html-reporter` पैकेज को स्थापित करने के लिए, इन चरणों का पालन करें:

### 1. पैकेज स्थापित करें

पैकेज को विकास निर्भरता के रूप में स्थापित करने के लिए निम्न कमांड चलाएँ:

```bash
npm install --save-dev wdio-json-html-reporter
```

### 2. स्थापना सत्यापित करें

सुनिश्चित करें कि पैकेज सही ढंग से स्थापित किया गया है:

```bash
npm list wdio-json-html-reporter
```

यदि सही ढंग से स्थापित किया गया है, तो आपको इसके समान आउटपुट दिखाई देगा:

```bash
wdio-json-html-reporter@x.x.x
```

### 3. WebDriverIO कॉन्फ़िगरेशन अपडेट करें

कस्टम रिपोर्टर शामिल करने के लिए अपनी `wdio.conf.js` या `wdio.conf.ts` फ़ाइल को संशोधित करें:

```javascript
import { JSONReporter, HTMLReportGenerator } from 'wdio-json-html-reporter';

export const config = {
  reporters: [
    [JSONReporter, { outputFile: './reports/test-results.json', screenshotOption: 'OnFailure' }],  // Options: "No", "OnFailure", "Full"
  ],
  onComplete: async function() {
    const outputFilePath = './reports/test-report.html';
    const jsonFolder = './reports'; // Directory where JSON reports are saved

    // If you want to include historical data, specify the history JSON file path here.
    const historyFile = './reports/history.json'; // Optional

    // Optionally, generate aggregated history data before generating the HTML report.
    // JSONReporter.generateAggregateHistory({ reportPaths: jsonFolder, historyPath: historyFile });

    const reportGenerator = new HTMLReportGenerator(outputFilePath, historyFile);
    await reportGenerator.convertJSONFolderToHTML(jsonFolder);
  }
};
```

### 4. अपने परीक्षण चलाएँ

अपना WebDriverIO परीक्षण सूट निष्पादित करें:

```bash
npx wdio run wdio.conf.js
```

## CLI उपयोग

WebDriverIO के साथ एकीकरण के अलावा, आप बिल्ट-इन CLI का उपयोग करके HTML रिपोर्ट जनरेटर को सीधे कमांड लाइन से चला सकते हैं।

**उपयोग:**

```bash
generate-html <inputFolder> <outputFile> [historyFile]
```

उदाहरण के लिए, यदि आपके पास `test/reports/json-reports` नामक फ़ोल्डर में JSON फ़ाइलें हैं और आप `test/reports/report.html` नामक HTML रिपोर्ट जनरेट करना चाहते हैं, तो आप चला सकते हैं:

```bash
npx wdio-json-html-reporter generate-html test/reports/json-reports test/reports/report.html
```

यदि आपके पास इतिहास फ़ाइल भी है (जैसे, `test/reports/history.json`), तो इसे एक वैकल्पिक चौथे पैरामीटर के रूप में शामिल करें:

```bash
npx wdio-json-html-reporter generate-html test/reports/json-reports test/reports/report.html test/reports/history.json
```

**नोट:**  
CLI फ़ंक्शनैलिटी केवल तभी ट्रिगर होती है जब आप पहले पैरामीटर के रूप में `generate-html` कमांड पास करते हैं। WebDriverIO के माध्यम से चलाते समय (जैसे, `wdio run wdio.conf.js` के साथ), CLI लॉजिक को बायपास किया जाता है।

## इतिहास विकल्प और समेकित इतिहास जनरेशन

HTML रिपोर्ट जनरेटर अब एक **इतिहास विकल्प** का समर्थन करता है। यह आपको ऐतिहासिक निष्पादन डेटा वाली JSON फ़ाइल प्रदान करने की अनुमति देता है जिसे "Historical Execution by Suite" अनुभाग के अंतर्गत रिपोर्ट में मर्ज किया जाता है। यदि इतिहास फ़ाइल प्रदान की जाती है और उसमें वैध डेटा होता है, तो रिपोर्ट इंटरैक्टिव चार्ट और प्रत्येक सूट के लिए एक अकॉर्डियन के साथ ऐतिहासिक रुझानों को प्रदर्शित करेगी। यदि कोई इतिहास फ़ाइल पास नहीं की जाती है या यदि फ़ाइल में कोई सूट डेटा नहीं है, तो रिपोर्ट स्वचालित रूप से ऐतिहासिक अनुभाग को छिपा देगी और केवल अद्वितीय त्रुटियों का अवलोकन प्रदर्शित करेगी।

इसके अतिरिक्त, JSON रिपोर्टर अब एक **समेकित इतिहास जनरेशन** सुविधा शामिल करता है। स्थैतिक विधि `JSONReporter.generateAggregateHistory({ reportPaths, historyPath, maxHistory })` के साथ, आप स्वचालित रूप से अपनी रिपोर्ट डायरेक्टरी में सभी JSON रिपोर्ट फ़ाइलों (पैटर्न `test-report-*.json` से मेल खाते) को स्कैन कर सकते हैं, परीक्षण परिणामों को एकत्रित कर सकते हैं (परीक्षण गिनती को जोड़कर और सूट डेटा को मर्ज करके), और पिछले समेकित रिकॉर्ड के साथ तुलना करके दोष तुलना की गणना कर सकते हैं। नवनिर्मित इतिहास रिकॉर्ड फिर निर्दिष्ट इतिहास फ़ाइल में जोड़ा जाता है। इस समेकित इतिहास डेटा का उपयोग बाद में HTML रिपोर्ट जनरेटर द्वारा कई परीक्षण रनों पर ऐतिहासिक निष्पादन अंतर्दृष्टि प्रदान करने के लिए किया जा सकता है।

## स्क्रीनशॉट

### डैशबोर्ड  
![डैशबोर्ड](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/dashboard.png)

### परीक्षण परिणाम  
![परीक्षण परिणाम](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/testdetails.png)

### स्क्रीनशॉट  
![स्क्रीनशॉट](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/screesnshots.png)

### फिल्टर्स  
![फिल्टर्स](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/filters.png)

### Excel निर्यात  
![Excel निर्यात](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/exportedfile.png)