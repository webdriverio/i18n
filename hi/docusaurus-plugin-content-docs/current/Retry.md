---
id: retry
title: असफल हुए टेस्ट को दोबारा चलाना
---

आप WebdriverIO टेस्टरनर के साथ कुछ विशेष टेस्ट को दोबारा चला सकते हैं जो अस्थिर नेटवर्क या रेस कंडीशन्स जैसे कारणों से अस्थिर हो जाते हैं। (हालांकि, अगर टेस्ट अस्थिर हो जाते हैं तो केवल दोबारा चलाने की दर बढ़ाना अनुशंसित नहीं है!)

## Mocha में सुइट्स को दोबारा चलाना

Mocha के वर्जन 3 से, आप पूरे टेस्ट सुइट्स को दोबारा चला सकते हैं (एक `describe` ब्लॉक के अंदर का सब कुछ)। अगर आप Mocha का उपयोग करते हैं तो आपको WebdriverIO के कार्यान्वयन के बजाय इस रीट्राई मैकेनिज्म का उपयोग करना चाहिए जो आपको केवल कुछ टेस्ट ब्लॉक्स को दोबारा चलाने की अनुमति देता है (एक `it` ब्लॉक के अंदर का सब कुछ)। `this.retries()` मेथड का उपयोग करने के लिए, सुइट ब्लॉक `describe` में अनबाउंड फंक्शन `function(){}` का उपयोग करना चाहिए, न कि फैट एरो फंक्शन `() => {}` का, जैसा कि [Mocha docs](https://mochajs.org/#arrow-functions) में वर्णित है। Mocha का उपयोग करके आप अपने `wdio.conf.js` में `mochaOpts.retries` का उपयोग करके सभी स्पेक्स के लिए रीट्राई काउंट भी सेट कर सकते हैं।

यहां एक उदाहरण है:

```js
describe('retries', function () {
    // Retry all tests in this suite up to 4 times
    this.retries(4)

    beforeEach(async () => {
        await browser.url('http://www.yahoo.com')
    })

    it('should succeed on the 3rd try', async function () {
        // Specify this test to only retry up to 2 times
        this.retries(2)
        console.log('run')
        await expect($('.foo')).toBeDisplayed()
    })
})
```

## Jasmine या Mocha में एकल टेस्ट को दोबारा चलाना

किसी विशेष टेस्ट ब्लॉक को दोबारा चलाने के लिए आप टेस्ट ब्लॉक फंक्शन के बाद अंतिम पैरामीटर के रूप में पुनः प्रयासों की संख्या को लागू कर सकते हैं:

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
     * spec that runs max 4 times (1 actual run + 3 reruns)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // returns number of retries
        // ...
    }, 3)
})
```

यह हुक्स के लिए भी काम करता है:

```js
describe('my flaky app', () => {
    /**
     * hook that runs max 2 times (1 actual run + 1 rerun)
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
     * spec that runs max 4 times (1 actual run + 3 reruns)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // returns number of retries
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 3)
})
```

यह हुक्स के लिए भी काम करता है:

```js
describe('my flaky app', () => {
    /**
     * hook that runs max 2 times (1 actual run + 1 rerun)
     */
    beforeEach(async () => {
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 1)

    // ...
})
```

अगर आप Jasmine का उपयोग कर रहे हैं, तो दूसरा पैरामीटर टाइमआउट के लिए आरक्षित है। रीट्राई पैरामीटर लागू करने के लिए आपको टाइमआउट को इसके डिफॉल्ट वैल्यू `jasmine.DEFAULT_TIMEOUT_INTERVAL` पर सेट करना होगा और फिर अपना रीट्राई काउंट लागू करना होगा।

</TabItem>
</Tabs>

यह रीट्राई मैकेनिज्म केवल एकल हुक्स या टेस्ट ब्लॉक्स को दोबारा चलाने की अनुमति देता है। अगर आपके टेस्ट के साथ आपके एप्लिकेशन को सेट अप करने के लिए एक हुक है, तो यह हुक नहीं चलता है। [Mocha ऑफर करता है](https://mochajs.org/#retry-tests) नेटिव टेस्ट रीट्राई जो इस व्यवहार को प्रदान करते हैं जबकि Jasmine नहीं करता। आप `afterTest` हुक में निष्पादित रीट्राई की संख्या तक पहुँच सकते हैं।

## Cucumber में दोबारा चलाना

### Cucumber में पूरे सुइट्स को दोबारा चलाना

Cucumber >=6 के लिए आप [`retry`](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#retry-failing-tests) कॉन्फिगरेशन विकल्प के साथ एक `retryTagFilter` वैकल्पिक पैरामीटर प्रदान कर सकते हैं ताकि आपके सभी या कुछ विफल परिदृश्यों को सफल होने तक अतिरिक्त पुनः प्रयास मिलें। इस सुविधा के काम करने के लिए आपको `scenarioLevelReporter` को `true` पर सेट करना होगा।

### Cucumber में स्टेप डेफिनिशन्स को दोबारा चलाना

किसी विशेष स्टेप डेफिनिशन के लिए एक रीरन रेट परिभाषित करने के लिए बस उसमें एक रीट्राई विकल्प लागू करें, जैसे:

```js
export default function () {
    /**
     * step definition that runs max 3 times (1 actual run + 2 reruns)
     */
    this.Given(/^some step definition$/, { wrapperOptions: { retry: 2 } }, async () => {
        // ...
    })
    // ...
})
```

रीरन केवल आपकी स्टेप डेफिनिशन फाइल में परिभाषित किए जा सकते हैं, कभी भी आपकी फीचर फाइल में नहीं।

## प्रति-स्पेसफाइल के आधार पर रीट्राई जोड़ें

पहले, केवल टेस्ट- और सुइट-लेवल रीट्राई उपलब्ध थे, जो अधिकांश मामलों में ठीक हैं।

लेकिन किसी भी टेस्ट में जिसमें स्टेट शामिल है (जैसे सर्वर पर या डेटाबेस में) पहले टेस्ट की विफलता के बाद स्टेट अमान्य छोड़ा जा सकता है। कोई भी बाद के पुनः प्रयास को पास होने का कोई मौका नहीं हो सकता है, क्योंकि वे जिस अमान्य स्टेट से शुरू होंगे।

प्रत्येक स्पेसफाइल के लिए एक नया `browser` इंस्टेंस बनाया जाता है, जो इसे हुक और किसी अन्य स्टेट्स (सर्वर, डेटाबेस) को सेटअप करने के लिए एक आदर्श स्थान बनाता है। इस स्तर पर रीट्राई का मतलब है कि पूरी सेटअप प्रक्रिया को बस दोहराया जाएगा, जैसे कि यह एक नई स्पेसफाइल के लिए हो।

```js title="wdio.conf.js"
export const config = {
    // ...
    /**
     * The number of times to retry the entire specfile when it fails as a whole
     */
    specFileRetries: 1,
    /**
     * Delay in seconds between the spec file retry attempts
     */
    specFileRetriesDelay: 0,
    /**
     * Retried specfiles are inserted at the beginning of the queue and retried immediately
     */
    specFileRetriesDeferred: false
}
```

## एक विशिष्ट टेस्ट को कई बार चलाएं

यह कोडबेस में अस्थिर टेस्ट को प्रवेश करने से रोकने में मदद करने के लिए है। `--repeat` CLI विकल्प जोड़कर यह निर्दिष्ट स्पेक्स या सुइट्स को N बार चलाएगा। इस CLI फ्लैग का उपयोग करते समय `--spec` या `--suite` फ्लैग भी निर्दिष्ट होना चाहिए।

जब कोडबेस में नए टेस्ट जोड़ते हैं, विशेष रूप से CI/CD प्रक्रिया के माध्यम से, टेस्ट पास हो सकते हैं और मर्ज हो सकते हैं लेकिन बाद में अस्थिर हो जाते हैं। यह अस्थिरता नेटवर्क समस्याओं, सर्वर लोड, डेटाबेस आकार आदि जैसी कई चीजों से आ सकती है। आपकी CD/CD प्रक्रिया में `--repeat` फ्लैग का उपयोग इन अस्थिर टेस्ट को मुख्य कोडबेस में मर्ज होने से पहले पकड़ने में मदद कर सकता है।

एक रणनीति उपयोग करने के लिए है अपने CI/CD प्रक्रिया में नियमित रूप से अपने टेस्ट चलाएं लेकिन अगर आप एक नया टेस्ट पेश कर रहे हैं तो आप `--spec` में निर्दिष्ट नए स्पेक के साथ `--repeat` के साथ टेस्ट के एक और सेट चला सकते हैं ताकि यह नए टेस्ट को x संख्या में बार चलाए। अगर टेस्ट उन समयों में से किसी भी समय विफल होता है तो टेस्ट मर्ज नहीं होगा और यह देखने की आवश्यकता होगी कि यह क्यों विफल हुआ।

```sh
# This will run the example.e2e.js spec 5 times
npx wdio run ./wdio.conf.js --spec example.e2e.js --repeat 5
```