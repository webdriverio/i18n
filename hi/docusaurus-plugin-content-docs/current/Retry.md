---
id: retry
title: अस्थिर (Flaky) टेस्ट को दोबारा चलाएँ
description: "Mocha, Jasmine या Cucumber में अस्थिर टेस्ट को दोबारा चलाएँ, पूरी spec फ़ाइलों को फिर से चलाएँ और अस्थिरता का पता लगाने के लिए किसी विशिष्ट टेस्ट को कई बार चलाएँ।"
---

आप WebdriverIO testrunner के साथ उन कुछ टेस्ट को दोबारा चला सकते हैं जो अस्थिर नेटवर्क या race conditions जैसी चीज़ों के कारण अस्थिर साबित होते हैं। (हालाँकि, यदि टेस्ट अस्थिर हो जाते हैं तो केवल rerun दर बढ़ाने की अनुशंसा नहीं की जाती है!)

## Mocha में suites को दोबारा चलाएँ

Mocha के संस्करण 3 से, आप पूरे टेस्ट suites (एक `describe` ब्लॉक के अंदर की हर चीज़) को दोबारा चला सकते हैं। यदि आप Mocha का उपयोग करते हैं तो आपको WebdriverIO के implementation के बजाय इसी retry तंत्र को प्राथमिकता देनी चाहिए, क्योंकि WebdriverIO का implementation आपको केवल कुछ टेस्ट ब्लॉक (एक `it` ब्लॉक के अंदर की हर चीज़) को दोबारा चलाने की अनुमति देता है। `this.retries()` मेथड का उपयोग करने के लिए, suite ब्लॉक `describe` को fat arrow function `() => {}` के बजाय एक unbound function `function(){}` का उपयोग करना होगा, जैसा कि [Mocha docs](https://mochajs.org/#arrow-functions) में बताया गया है। Mocha का उपयोग करके आप अपनी `wdio.conf.js` में `mochaOpts.retries` का उपयोग करके सभी specs के लिए retry संख्या भी सेट कर सकते हैं।

यहाँ एक उदाहरण है:

```js
describe('retries', function () {
    // इस suite के सभी टेस्ट को अधिकतम 4 बार दोबारा चलाएँ
    this.retries(4)

    beforeEach(async () => {
        await browser.url('http://www.yahoo.com')
    })

    it('should succeed on the 3rd try', async function () {
        // इस टेस्ट को केवल अधिकतम 2 बार दोबारा चलाने के लिए निर्दिष्ट करें
        this.retries(2)
        console.log('run')
        await expect($('.foo')).toBeDisplayed()
    })
})
```

## Jasmine या Mocha में एकल टेस्ट को दोबारा चलाएँ

किसी विशेष टेस्ट ब्लॉक को दोबारा चलाने के लिए आप बस टेस्ट ब्लॉक फ़ंक्शन के बाद अंतिम पैरामीटर के रूप में reruns की संख्या लागू कर सकते हैं:

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
  ]
}>
<TabItem value="mocha">

```js
describe('my flaky app', () => {
    /**
     * spec जो अधिकतम 4 बार चलता है (1 वास्तविक run + 3 reruns)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // retries की संख्या लौटाता है
        // ...
    }, 3)
})
```

यही hooks के लिए भी काम करता है:

```js
describe('my flaky app', () => {
    /**
     * hook जो अधिकतम 2 बार चलता है (1 वास्तविक run + 1 rerun)
     */
    beforeEach(async () => {
        // ...
    }, 1)

    // ...
})
```

</TabItem>
<TabItem value="jasmine">

```js
describe('my flaky app', () => {
    /**
     * spec जो अधिकतम 4 बार चलता है (1 वास्तविक run + 3 reruns)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // retries की संख्या लौटाता है
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 3)
})
```

यही hooks के लिए भी काम करता है:

```js
describe('my flaky app', () => {
    /**
     * hook जो अधिकतम 2 बार चलता है (1 वास्तविक run + 1 rerun)
     */
    beforeEach(async () => {
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 1)

    // ...
})
```

यदि आप Jasmine का उपयोग कर रहे हैं, तो दूसरा पैरामीटर timeout के लिए आरक्षित है। retry पैरामीटर लागू करने के लिए आपको timeout को उसके डिफ़ॉल्ट मान `jasmine.DEFAULT_TIMEOUT_INTERVAL` पर सेट करना होगा और फिर अपनी retry संख्या लागू करनी होगी।

</TabItem>
</Tabs>

यह retry तंत्र केवल एकल hooks या टेस्ट ब्लॉक को दोबारा चलाने की अनुमति देता है। यदि आपके टेस्ट के साथ आपके एप्लिकेशन को सेट अप करने के लिए कोई hook है, तो वह hook नहीं चलाया जाता है। [Mocha](https://mochajs.org/#retry-tests) नेटिव टेस्ट retries प्रदान करता है जो यह व्यवहार देते हैं, जबकि Jasmine ऐसा नहीं करता। आप `afterTest` hook में निष्पादित retries की संख्या तक पहुँच सकते हैं।

Mocha के साथ, किसी टेस्ट या hook के सभी प्रयास उसका timeout साझा करते हैं: Mocha टाइमर को एक बार शुरू करता है, और जब सभी प्रयास मिलकर timeout से अधिक समय लेते हैं तो वह टेस्ट को विफल कर देता है। इसलिए यह तंत्र उस टेस्ट या hook को दोबारा चलाता है जो विफल होता है (उदाहरण के लिए एक विफल assertion या command), लेकिन उसे नहीं जो अपने timeout तक पहुँच जाता है, क्योंकि बाद का कोई प्रयास समय पर पूरा नहीं हो पाएगा। WebdriverIO retries वाले किसी टेस्ट या hook की timeout त्रुटि उस प्रयास का नाम बताती है जिसका timeout हुआ, उदाहरण के लिए `(WDIO attempt 2/3)`। जिन टेस्ट का timeout हो सकता है, उनके लिए [Mocha के retries](https://mochajs.org/#retry-tests) (`this.retries()`) का उपयोग करें: Mocha प्रत्येक प्रयास को पूरे timeout के साथ फिर से चलाता है।

## Cucumber में दोबारा चलाना

### Cucumber में पूरे suites को दोबारा चलाएँ

cucumber >=6 के लिए आप [`retry`](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#retry-failing-tests) कॉन्फ़िगरेशन विकल्प के साथ एक वैकल्पिक `retryTagFilter` पैरामीटर प्रदान कर सकते हैं, ताकि आपके सभी या कुछ विफल scenarios को सफल होने तक अतिरिक्त retries मिलें।

### Cucumber में Step Definitions को दोबारा चलाएँ

किसी विशेष step definition के लिए rerun दर निर्धारित करने के लिए बस उस पर एक retry विकल्प लागू करें, जैसे:

```js
export default function () {
    /**
     * step definition जो अधिकतम 3 बार चलती है (1 वास्तविक run + 2 reruns)
     */
    this.Given(/^some step definition$/, { wrapperOptions: { retry: 2 } }, async () => {
        // ...
    })
    // ...
})
```

Reruns केवल आपकी step definitions फ़ाइल में ही परिभाषित किए जा सकते हैं, कभी भी आपकी feature फ़ाइल में नहीं।

## प्रति-specfile आधार पर retries जोड़ें

पहले, केवल टेस्ट-स्तर और suite-स्तर के retries उपलब्ध थे, जो अधिकांश मामलों में ठीक हैं।

लेकिन किसी भी ऐसे टेस्ट में जिसमें state शामिल हो (जैसे किसी सर्वर पर या किसी डेटाबेस में), पहली टेस्ट विफलता के बाद state अमान्य रह सकती है। उसके बाद के किसी भी retry के पास पास होने का कोई मौका नहीं हो सकता, क्योंकि वे अमान्य state के साथ शुरू होंगे।

प्रत्येक specfile के लिए एक नया `browser` instance बनाया जाता है, जो इसे किसी भी अन्य state (सर्वर, डेटाबेस) को hook और सेटअप करने के लिए एक आदर्श स्थान बनाता है। इस स्तर पर retries का मतलब है कि पूरी सेटअप प्रक्रिया बस दोहराई जाएगी, ठीक वैसे ही जैसे किसी नई specfile के लिए होती।

```js title="wdio.conf.js"
export const config = {
    // ...
    /**
     * पूरी specfile के समग्र रूप से विफल होने पर उसे दोबारा चलाने की संख्या
     */
    specFileRetries: 1,
    /**
     * spec फ़ाइल retry प्रयासों के बीच सेकंड में विलंब
     */
    specFileRetriesDelay: 0,
    /**
     * दोबारा चलाई जाने वाली specfiles को queue की शुरुआत में डाला जाता है और तुरंत दोबारा चलाया जाता है
     */
    specFileRetriesDeferred: false
}
```

## किसी विशिष्ट टेस्ट को कई बार चलाएँ

यह codebase में अस्थिर टेस्ट को आने से रोकने में मदद के लिए है। `--repeat` cli विकल्प जोड़ने पर यह निर्दिष्ट specs या suites को N बार चलाएगा। इस cli flag का उपयोग करते समय `--spec` या `--suite` flag भी निर्दिष्ट किया जाना चाहिए।

किसी codebase में नए टेस्ट जोड़ते समय, विशेष रूप से CI/CD प्रक्रिया के माध्यम से, टेस्ट पास होकर merge हो सकते हैं लेकिन बाद में अस्थिर हो सकते हैं। यह अस्थिरता कई चीज़ों से आ सकती है जैसे नेटवर्क समस्याएँ, सर्वर लोड, डेटाबेस का आकार, आदि। अपनी CD/CD प्रक्रिया में `--repeat` flag का उपयोग करने से इन अस्थिर टेस्ट को मुख्य codebase में merge होने से पहले पकड़ने में मदद मिल सकती है।

एक रणनीति यह है कि अपनी CI/CD प्रक्रिया में अपने टेस्ट को सामान्य रूप से चलाएँ, लेकिन यदि आप कोई नया टेस्ट जोड़ रहे हैं तो आप `--spec` में निर्दिष्ट नई spec के साथ `--repeat` का उपयोग करके टेस्ट का एक और सेट चला सकते हैं, ताकि यह नए टेस्ट को x बार चलाए। यदि टेस्ट उनमें से किसी भी बार विफल होता है तो टेस्ट merge नहीं होगा और यह देखना होगा कि वह क्यों विफल हुआ।

```sh
# यह example.e2e.js spec को 5 बार चलाएगा
npx wdio run ./wdio.conf.js --spec example.e2e.js --repeat 5
```