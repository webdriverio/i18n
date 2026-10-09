---
id: timeouts
title: टाइमआउट
description: "टेस्ट को विश्वसनीय बनाए रखने के लिए WebDriver सेशन टाइमआउट, WebdriverIO waitfor टाइमआउट और टेस्ट फ्रेमवर्क टाइमआउट कॉन्फ़िगर करें।"
---

WebdriverIO में प्रत्येक कमांड एक एसिंक्रोनस ऑपरेशन है। Selenium सर्वर (या [Sauce Labs](https://saucelabs.com) जैसी किसी क्लाउड सेवा) को एक रिक्वेस्ट भेजी जाती है, और एक्शन के पूरा होने या विफल होने के बाद उसके रिस्पॉन्स में परिणाम होता है।

इसलिए, पूरी टेस्टिंग प्रक्रिया में समय एक महत्वपूर्ण घटक है। जब कोई एक्शन किसी दूसरे एक्शन की स्थिति पर निर्भर करता है, तो आपको यह सुनिश्चित करना होगा कि वे सही क्रम में एक्ज़ीक्यूट हों। इन समस्याओं से निपटने में टाइमआउट महत्वपूर्ण भूमिका निभाते हैं।

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## WebDriver टाइमआउट

### सेशन स्क्रिप्ट टाइमआउट

एक सेशन से एक सेशन स्क्रिप्ट टाइमआउट जुड़ा होता है जो एसिंक्रोनस स्क्रिप्ट के चलने के लिए प्रतीक्षा का समय निर्दिष्ट करता है। जब तक अन्यथा न कहा जाए, यह 30 सेकंड होता है। आप इस टाइमआउट को इस तरह सेट कर सकते हैं:

```js
await browser.setTimeout({ 'script': 60000 })
await browser.execute(async () => {
    console.log('this should not fail')
    await new Promise((resolve) => setTimeout(resolve, 59000))
})
```

### सेशन पेज लोड टाइमआउट

एक सेशन से एक सेशन पेज लोड टाइमआउट जुड़ा होता है जो पेज लोडिंग पूरी होने के लिए प्रतीक्षा का समय निर्दिष्ट करता है। जब तक अन्यथा न कहा जाए, यह 300,000 मिलीसेकंड होता है।

आप इस टाइमआउट को इस तरह सेट कर सकते हैं:

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> `pageLoad` WebDriver [टाइमआउट](https://www.w3.org/TR/webdriver/#set-timeouts) का नाम है। WebdriverIO v10 केवल यही key स्वीकार करता है।

### सेशन इम्प्लिसिट वेट टाइमआउट

एक सेशन से एक सेशन इम्प्लिसिट वेट टाइमआउट जुड़ा होता है। यह [`findElement`](/docs/api/webdriver#findelement) या [`findElements`](/docs/api/webdriver#findelements) कमांड (WDIO टेस्टरनर के साथ या उसके बिना WebdriverIO चलाते समय क्रमशः [`$`](/docs/api/browser/$) या [`$$`](/docs/api/browser/$$)) का उपयोग करके एलिमेंट्स को लोकेट करते समय इम्प्लिसिट एलिमेंट लोकेशन स्ट्रैटेजी के लिए प्रतीक्षा का समय निर्दिष्ट करता है। जब तक अन्यथा न कहा जाए, यह 0 मिलीसेकंड होता है।

आप इस टाइमआउट को इस तरह सेट कर सकते हैं:

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## WebdriverIO से संबंधित टाइमआउट

### `WaitFor*` टाइमआउट

WebdriverIO एलिमेंट्स के किसी निश्चित स्थिति (जैसे enabled, visible, existing) तक पहुँचने की प्रतीक्षा करने के लिए कई कमांड प्रदान करता है। ये कमांड एक सेलेक्टर आर्गुमेंट और एक टाइमआउट संख्या लेते हैं, जो यह निर्धारित करती है कि इंस्टेंस को उस एलिमेंट के उस स्थिति तक पहुँचने के लिए कितनी देर प्रतीक्षा करनी चाहिए। `waitforTimeout` विकल्प आपको सभी `waitFor*` कमांड के लिए ग्लोबल टाइमआउट सेट करने की सुविधा देता है, ताकि आपको बार-बार एक ही टाइमआउट सेट न करना पड़े। _(छोटे अक्षर `f` पर ध्यान दें!)_

```js
// wdio.conf.js
export const config = {
    // ...
    waitforTimeout: 5000,
    // ...
}
```

अपने टेस्ट में, अब आप यह कर सकते हैं:

```js
const myElem = await $('#myElem')
await myElem.waitForDisplayed()

// आवश्यकता होने पर आप डिफ़ॉल्ट टाइमआउट को ओवरराइट भी कर सकते हैं
await myElem.waitForDisplayed({ timeout: 10000 })
```

## फ्रेमवर्क से संबंधित टाइमआउट

WebdriverIO के साथ आप जिस टेस्टिंग फ्रेमवर्क का उपयोग कर रहे हैं, उसे टाइमआउट से निपटना पड़ता है, खासकर इसलिए क्योंकि सब कुछ एसिंक्रोनस है। यह सुनिश्चित करता है कि कुछ गलत होने पर टेस्ट प्रक्रिया अटक न जाए।

डिफ़ॉल्ट रूप से, टाइमआउट 10 सेकंड होता है, जिसका अर्थ है कि एक सिंगल टेस्ट को इससे अधिक समय नहीं लेना चाहिए।

Mocha में एक सिंगल टेस्ट इस तरह दिखता है:

```js
it('should login into the application', async () => {
    await browser.url('/login')

    const form = await $('form')
    const username = await $('#username')
    const password = await $('#password')

    await username.setValue('userXY')
    await password.setValue('******')
    await form.submit()

    expect(await browser.getTitle()).to.be.equal('Admin Area')
})
```

Cucumber में, टाइमआउट एक सिंगल स्टेप डेफ़िनिशन पर लागू होता है। हालाँकि, यदि आप टाइमआउट बढ़ाना चाहते हैं क्योंकि आपका टेस्ट डिफ़ॉल्ट मान से अधिक समय लेता है, तो आपको इसे फ्रेमवर्क विकल्पों में सेट करना होगा।

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
    {label: 'Cucumber', value: 'cucumber'}
  ]
}>
<TabItem value="mocha">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'mocha',
    mochaOpts: {
        timeout: 20000
    },
    // ...
}
```

</TabItem>
<TabItem value="jasmine">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'jasmine',
    jasmineOpts: {
        defaultTimeoutInterval: 20000
    },
    // ...
}
```

</TabItem>
<TabItem value="cucumber">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'cucumber',
    cucumberOpts: {
        timeout: 20000
    },
    // ...
}
```

</TabItem>
</Tabs>