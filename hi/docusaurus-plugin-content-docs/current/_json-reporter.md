---
id: json-reporter
title: जेसन रिपोर्टर
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-json-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## इंस्टालेशन

```bash
npm install @wdio/json-reporter --save-dev
```

## कॉन्फिगरेशन

### `stdout` पर परिणाम

```js
reporters: [
    'dot',
    ['json', { stdout: true }]
],
```

### फाइल में परिणाम

```js
reporters: [
    'dot',
    ['json',{
        outputDir: './results'
    }]
],
```

### कस्टम फाइल नाम के साथ फाइल में परिणाम

```js
reporters: [
    'dot',
    ['json',{
        outputDir: './results',
        outputFileFormat: (opts) => {
            return `results-${opts.cid}.${opts.capabilities.browserName}.json`
        }
    }]
],
```

## परिणाम फाइलें

WDIO v5 के आगे, रिपोर्टिंग एक केंद्रीकृत प्रक्रिया से हटकर ऐसी प्रक्रिया में बदल गई है जो समानांतर परीक्षण निष्पादन के लिए स्पिन अप की गई प्रत्येक "सेशन" द्वारा संभाली जाती है। इस परिवर्तन ने WDIO परीक्षण निष्पादन के दौरान चैटर की मात्रा को कम करने में मदद की और इस प्रकार प्रदर्शन में सुधार किया। इसका नुकसान यह है कि अब सभी परीक्षण निष्पादन के लिए एक ही रिपोर्ट प्राप्त करना संभव नहीं है।

`@wdio/json-reporter` एकाधिक json फाइलों को एक फाइल में मर्ज करने के लिए एक उपयोगिता फंक्शन प्रदान करता है। उपयोगिता का लाभ उठाने के लिए नीचे दिए गए चरणों का पालन करें।

आप इसे अपने `wdio.conf.js` के [`onComplete`](https://webdriver.io/docs/configuration#oncomplete) में निष्पादित कर सकते हैं:

```javascript
// wdio.conf.js
import mergeResults from '@wdio/json-reporter/mergeResults'

export const config = {
    // ...
    onComplete: function (exitCode, config, capabilities, results) {
        mergeResults('./results', 'wdio-.*-json-reporter.json', 'wdio-custom-filename.json')
    }
    // ...
}
```

_नोट:_ `wdio-custom-filename.json` वैकल्पिक है, यदि पैरामीटर प्रदान नहीं किया गया है तो डिफॉल्ट मान `wdio-merged.json` है।

## योगदान

इस रिपोर्टर का सोर्स कोड [Jim Davis](https://github.com/fijijavis) द्वारा बनाए गए [`wdio-json-reporter`](https://github.com/fijijavis/wdio-json-reporter) कम्युनिटी रिपोर्टर से अत्यधिक प्रेरित था। परियोजना के रखरखाव में सभी कार्य के लिए धन्यवाद!

---

WebdriverIO पर अधिक जानकारी के लिए [होमपेज](http://webdriver.io) देखें।