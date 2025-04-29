---
id: wdio-gmail-service
title: जीमेल सेवा
custom_edit_url: https://github.com/webdriverio-community/wdio-gmail-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-gmail-service एक तृतीय पक्ष पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/webdriverio-community/wdio-gmail-service) | [npm](https://www.npmjs.com/package/wdio-gmail-service)

[Gmail Tester](https://github.com/levz0r/gmail-tester) का उपयोग करके Google Mail से ई-मेल प्राप्त करने के लिए एक WebdriverIO प्लगइन।

## इंस्टालेशन

सबसे आसान तरीका है `wdio-gmail-service` को अपने package.json में `devDependency` के रूप में रखना।

```json
{
  "devDependencies": {
    "wdio-gmail-service": "^2.0.0"
  }
}
```

आप इसे आसानी से कर सकते हैं:

```sh
npm install wdio-gmail-service --save-dev
```

## उपयोग

### जीमेल प्रमाणीकरण

आपको [Gmail Tester](https://github.com/levz0r/gmail-tester) पर दिए गए निर्देशों का पालन करके `credentials.json` (OAuth2 प्रमाणीकरण फ़ाइल) और `token.json` (OAuth2 टोकन) बनाने की आवश्यकता होगी।

### कॉन्फ़िगरेशन

सेवा सूची में `gmail` जोड़कर सेवा जोड़ें, उदाहरण के लिए:

```js
// wdio.conf.js
import path from 'path'

export const config = {
    // ...
    services: [['gmail', {
        credentialsJsonPath: path.join(process.cwd(), './credentials.json'),
        tokenJsonPath: join(process.cwd(), './token.json'),
        intervalSec: 10,
        timeoutSec: 60
    }]]
    // ...
};
```

## सेवा विकल्प

### credentialsJsonPath
क्रेडेंशियल्स JSON फ़ाइल का पूर्ण पथ।

प्रकार: `string`

आवश्यक: `true`

### tokenJsonPath
टोकन JSON फ़ाइल का पूर्ण पथ।

प्रकार: `string`

आवश्यक: `true`

### intervalSec
जीमेल इनबॉक्स जांच के बीच अंतराल।

प्रकार: `number`

डिफ़ॉल्ट: `10`

आवश्यक: `false`

### timeoutSec
दिए गए फ़िल्टर के लिए ईमेल खोजने के लिए प्रतीक्षा करने का अधिकतम समय।

प्रकार: `number`

डिफ़ॉल्ट: `60`

आवश्यक: `false`


## टेस्ट लिखना

अपने WebdriverIO टेस्ट में, अब आप जांच सकते हैं कि क्या ईमेल प्राप्त हुआ था।

```js
describe('Example', () => {
    it('Should check email', () => {
        // perform some actions that will send an email to setup gmail account
        const emails = await browser.checkInbox({ from: 'AccountSupport@ubi.com', subject: 'Ubisoft Password Change Request' });
        expect(emails[0].body.html).toContain('https://account-uplay.ubi.com/en-GB/action/change-password?genomeid=')
    })
})
```

## `checkInbox` पैरामीटर्स

कमांड पैरामीटर्स के लिए कम से कम एक `from`, `to`, या `subject` की आवश्यकता होती है:

### `from`
प्राप्तकर्ता के ईमेल पते पर फ़िल्टर करें।

प्रकार: `String`

### `to`
प्रेषक के ईमेल पते पर फ़िल्टर करें।

प्रकार: `String`

### `subject`
ईमेल के विषय पर फ़िल्टर करें।

प्रकार: `String`

### `includeBody`
डिकोड किए गए ईमेल बॉडी को प्राप्त करने के लिए true पर सेट करें।

प्रकार: `boolean`

### `includeAttachments`
base64-एन्कोडेड ईमेल अटैचमेंट प्राप्त करने के लिए true पर सेट करें।

प्रकार: `boolean`

### `before`
निर्दिष्ट तिथि से पहले प्राप्त संदेशों को फ़िल्टर करें।

प्रकार: `Date`

### `after`
निर्दिष्ट तिथि के बाद प्राप्त संदेशों को फ़िल्टर करें।

प्रकार: `Date`

### `label`
डिफ़ॉल्ट लेबल 'INBOX' है, लेकिन इसे 'SPAM', 'TRASH' या कस्टम लेबल में बदला जा सकता है। बिल्ट-इन लेबल की पूरी सूची के लिए, देखें https://developers.google.com/gmail/api/guides/labels?hl=en

प्रकार: `String`

---

WebdriverIO के बारे में अधिक जानकारी के लिए [होमपेज](https://webdriver.io) देखें।