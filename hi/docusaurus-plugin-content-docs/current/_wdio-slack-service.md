---
id: wdio-slack-service
title: स्लैक सेवा
custom_edit_url: https://github.com/carmenmitru/wdio-slack-service/edit/master/README.md
---


> wdio-slack-service एक तीसरी पार्टी पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/carmenmitru/wdio-slack-service) | [npm](https://www.npmjs.com/package/wdio-slack-service)
Webdriverio लाइब्रेरी परीक्षण परिणामों को स्लैक अधिसूचना/संदेश के रूप में चैनलों पर भेजने के लिए

## इंस्टॉलेशन

सबसे आसान तरीका `wdio-slack-service` को अपने `package.json` में devDependency के रूप में रखना है।

```json
{
  "devDependencies": {
    "wdio-slack-service": "2.0.8"
  }
}
```

आप इसे आसानी से कर सकते हैं:

```bash
npm install wdio-slack-service --save-dev
```

`WebdriverIO` को कैसे इंस्टॉल करें इसके निर्देश [यहां मिल सकते हैं।](https://webdriver.io/docs/gettingstarted.html)

## कॉन्फिगरेशन

सबसे पहले, सेवा को wdio कॉन्फिग फाइल `wdio.conf.js` में इम्पोर्ट करें

```js
// wdio.conf.js
const slack = require('wdio-slack-service');
```

सेवा का उपयोग करने के लिए आपको अधिसूचना भेजने के लिए स्लैक वेबहुक url की आवश्यकता होती है और आपको अपनी `services` ऐरे में `slack` जोड़ना होगा

उदाहरण:

```js
// wdio.conf.js
export.config = {
    // ...
    services: [
        [slack, {
            webHookUrl: "<SLACK_WEBHOOK_URL>", // किसी विशेष चैनल पर अधिसूचना पोस्ट करने के लिए उपयोग किया जाता है
            notifyOnlyOnFailure: true, // केवल परीक्षण विफलता पर अधिसूचना भेजें
            messageTitle: "<NOTIFICATION_TITLE>" // अधिसूचना का नाम
        }]
]
```
## विशेषताएं

- परीक्षण परिणामों की परवाह किए बिना अधिसूचना भेजें
- केवल परीक्षण विफलता पर अधिसूचना भेजें
- `mocha`, `jasmine` और `cucumber` के लिए समर्थन
- रीट्राई/रीरन परीक्षण अतिरिक्त जानकारी के साथ लॉग किए जाएंगे
- परीक्षण अवधि जानकारी
- त्रुटि विवरण
- Cucumber सीनारियो/स्टेप रिपोर्टिंग
- ब्राउज़र और संस्करण जानकारी

## यह कैसे काम करता है
`mocha`/`jasmine` के लिए, अधिसूचना स्पेक स्तर पर भेजी जाएगी और `cucumber` के लिए, यह फीचर स्तर पर होगी। मान लीजिए, यदि आपके पास 10 स्पेक/फीचर फाइलें हैं, तो आपको 10 अधिसूचनाएं प्राप्त होंगी क्योंकि यह `after` हुक में ट्रिगर होती है

## विकल्प

अधिसूचना भेजने के लिए, आपके पास स्लैक वेबहुक url होना चाहिए। स्लैक वेबहुक URL कैसे बनाया जाता है, यह जानने के लिए, इस [पेज](https://api.slack.com/messaging/webhooks) को देखें

### webHookUrl

इस url का उपयोग पोस्ट संदेश की पहचान/प्रमाणीकरण के लिए किया जाता है और इसे स्लैक चैनल पर भेजता है

प्रकार: `String` <br/>
वैकल्पिक: `नहीं` <br/>
डिफ़ॉल्ट: `NA`

### notifyOnlyOnFailure

यदि आप केवल परीक्षण विफलता पर स्लैक अधिसूचनाएं प्राप्त करना चाहते हैं, तो इस विकल्प को `true` पर सेट करें। अन्यथा, यह पास/फेल की परवाह किए बिना सभी परीक्षण निष्पादनों के लिए अधिसूचना भेजता है

प्रकार: `Boolean` <br/>
वैकल्पिक: `हां` <br/>
डिफ़ॉल्ट: `false`

### messageTitle

अधिसूचना का शीर्षक

प्रकार: `String` <br/>
वैकल्पिक: `हां` <br/>
डिफ़ॉल्ट: `Webdriverio Slack Reporter`

## स्क्रीनशॉट

### Cucumber पास/फेल

![Cucumber पास/फेल](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/Cucumber.PNG)

### Cucumber रीट्राई

![Cucumber रीट्राई](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/Cucumberretry.PNG)

### सभी पास

![सभी पास](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/allpass.PNG)

### फेल पास

![फेल पास](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/failpass.PNG)

### रीट्राई फेल्ड

![रीट्राई फेल्ड](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/retryfail.PNG)

### रीट्राई पास्ड

![रीट्राई पास्ड](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/retrypassed.PNG)

---

WebdriverIO पर अधिक जानकारी के लिए [होमपेज](https://webdriver.io) देखें।