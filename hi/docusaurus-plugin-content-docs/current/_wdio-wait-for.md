---
id: wdio-wait-for
title: उपयोगी अपेक्षित शर्तों की लाइब्रेरी सेवा
custom_edit_url: https://github.com/webdriverio/wdio-wait-for/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-wait-for एक तृतीय पक्ष पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/webdriverio/wdio-wait-for) | [npm](https://www.npmjs.com/package/wdio-wait-for)

> wdio-wait-for [WebdriverIO](http://webdriver.io/) के लिए एक Node.js लाइब्रेरी है जो सामान्य शर्तों का एक सेट प्रदान करती है जो निश्चित कार्य पूरा होने तक निश्चित शर्तों के लिए प्रतीक्षा करने की कार्यक्षमता प्रदान करती है।

## स्थापना
अपने प्रोजेक्ट में `wdio-wait-for` का उपयोग करने के लिए, चलाएँ:

```shell
npm i -D wdio-wait-for
```

अगर आप Yarn का उपयोग करते हैं, तो चलाएँ:

```sh
yarn add --dev wdio-wait-for
```

## [API](https://github.com/webdriverio/wdio-wait-for/blob/main/./docs/modules.md)

- [alertIsPresent](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/browser_alertispresent.md)
- [numberOfWindowsToBe​](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/browser_numberofwindowstobe_.md)
- [titleContains](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/browser_titlecontains.md)
- [titleIs](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/browser_titleis.md)
- [urlContains](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/browser_urlcontains.md)
- [urlIs](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/browser_urlis.md)
- [elementToBeClickable](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/element_elementtobeclickable.md)
- [elementToBeEnabled](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/element_elementtobeenabled.md)
- [elementToBeSelected](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/element_elementtobeselected.md)
- [invisibilityOf](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/element_invisibilityof.md)
- [numberOfElementsToBe](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/element_numberofelementstobe.md)
- [numberOfElementsToBeLessThan](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/element_numberofelementstobelessthan.md)
- [numberOfElementsToBeMoreThan​](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/element_numberofelementstobemorethan_.md)
- [presenceOf](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/element_presenceof.md)
- [sizeOfElementToBe](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/element_sizeofelementtobe.md)
- [stalenessOf](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/element_stalenessof.md)
- [textToBePresentInElement](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/element_texttobepresentinelement.md)
- [textToBePresentInElementValue](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/element_texttobepresentinelementvalue.md)
- [visibilityOf](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/element_visibilityof.md)
- [and](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/logical_and.md)
- [not](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/logical_not.md)
- [or](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/logical_or.md)

## उदाहरण

### आयात
#### CommonJS

अगर आप WebdriverIO v7 और निम्न संस्करण [CommonJS](https://en.wikipedia.org/wiki/CommonJS) के साथ उपयोग कर रहे हैं, तो आपको पैकेज आयात करने के लिए `require` का उपयोग करना होगा, उदाहरण के लिए:

```javascript
// import all methods
const EC = require('wdio-wait-for');

browser.waitUntil(EC.alertIsPresent(), { timeout: 5000, timeoutMsg: 'Failed, after waiting for the alert to be present' })
```

```javascript
// import specific method
const { alertIsPresent } = require('wdio-wait-for');

browser.waitUntil(alertIsPresent(), { timeout: 5000, timeoutMsg: 'Failed, after waiting for the alert to be present' })
```

#### ESM

TypeScript या WebdriverIO v8 और उससे ऊपर के संस्करण के साथ, आप सभी सहायक विधियों को आयात करने के लिए `import` स्टेटमेंट का उपयोग कर सकते हैं, उदाहरण के लिए:

```typescript
// import all methods
import * as EC from 'wdio-wait-for';

browser.waitUntil(EC.elementToBeEnabled('input'), { timeout: 5000, timeoutMsg: 'Failed, after waiting for the element to be enabled' })
```

या केवल विशिष्ट विधियों को, उदाहरण के लिए:

```typescript
// import specific method
import { elementToBeEnabled } from 'wdio-wait-for';

browser.waitUntil(elementToBeEnabled('input'), { timeout: 5000, timeoutMsg: 'Failed, after waiting for the element to be enabled' })
```

### अलर्ट के लिए प्रतीक्षा करें
यह कोड स्निपेट दिखाता है कि शर्तों का उपयोग कैसे करें

```typescript
browser.waitUntil(alertIsPresent(), { timeout: 5000, timeoutMsg: 'Failed, after waiting for the alert to be present' })
```

### तत्वों के लिए प्रतीक्षा करें

यह कोड स्निपेट दिखाता है कि शर्तों का उपयोग कैसे करें, उदाहरण के लिए, तत्वों की एक निश्चित संख्या के मौजूद होने के लिए प्रतीक्षा करना:

```typescript
browser.waitUntil(numberOfElementsToBe('.links', 2), { timeout: 5000, timeoutMsg: 'Failed, after waiting for the 2 elements' })
```

## लाइसेंस

[MIT licensed](https://github.com/webdriverio/wdio-wait-for/blob/main/./LICENSE).

## लेखक

Yevhen Laichenkov - `elaichenkov@gmail.com`<br />
Christian Bromann - `mail@bromann.dev`