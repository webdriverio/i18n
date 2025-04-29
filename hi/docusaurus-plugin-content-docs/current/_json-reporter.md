---
id: json-reporter
title: Json रिपोर्टर
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-json-reporter/README.md
---



## स्थापना

```bash
npm install @wdio/json-reporter --save-dev
```

## कॉन्फ़िगरेशन

### `stdout` पर परिणाम

```js
reporters: [
    'dot',
    ['json', { stdout: true }]
],
```

### फ़ाइल में परिणाम

```js
reporters: [
    'dot',
    ['json',{
        outputDir: './results'
    }]
],
```

### कस्टम फ़ाइल नाम के साथ फ़ाइल में परिणाम

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

## परिणाम फ़ाइलें

WDIO v5 से आगे, रिपोर्टिंग एक केंद्रीकृत प्रक्रिया से बदलकर ऐसी प्रक्रिया में आ गई है जिसे समानांतर परीक्षण निष्पादन के लिए स्पिन अप किए गए प्रत्येक "सत्र" द्वारा संभाला जाता है। इस परिवर्तन ने WDIO परीक्षण निष्पादन के दौरान संवाद की मात्रा को कम करने में मदद की और इसलिए प्रदर्शन में सुधार हुआ। इसका नुकसान यह है कि सभी परीक्षण निष्पादन के लिए एक ही रिपोर्ट प्राप्त करना अब संभव नहीं है।

`@wdio/json-reporter` बहुत सारी json फाइलों को एक फाइल में मर्ज करने के लिए एक उपयोगिता फ़ंक्शन प्रदान करता है। यूटिलिटी का लाभ उठाने के लिए नीचे दिए गए चरणों का पालन करें।

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

_नोट:_ `wdio-custom-filename.json` वैकल्पिक है, यदि पैरामीटर प्रदान नहीं किया गया है तो डिफ़ॉल्ट मान `wdio-merged.json` है।

## योगदान

इस रिपोर्टर का सोर्स कोड [Jim Davis](https://github.com/fijijavis) द्वारा निर्मित [`wdio-json-reporter`](https://github.com/fijijavis/wdio-json-reporter) कम्युनिटी रिपोर्टर से अत्यधिक प्रेरित था। प्रोजेक्ट को बनाए रखने के सभी कार्यों के लिए धन्यवाद!

---

WebdriverIO पर अधिक जानकारी के लिए [होमपेज](http://webdriver.io) देखें।