---
id: timeouts
title: टाइमआउट्स
---

WebdriverIO में प्रत्येक कमांड एक अतुल्यकालिक (अनसिंक्रोनस) ऑपरेशन है। Selenium सर्वर (या [Sauce Labs](https://saucelabs.com) जैसी क्लाउड सर्विस) पर एक अनुरोध भेजा जाता है, और इसका प्रतिउत्तर परिणाम को तब शामिल करता है जब क्रिया पूरी हो जाती है या विफल हो जाती है।

इसलिए, समय पूरी परीक्षण प्रक्रिया में एक महत्वपूर्ण घटक है। जब कोई निश्चित क्रिया किसी अन्य क्रिया की स्थिति पर निर्भर करती है, तो आपको यह सुनिश्चित करना होगा कि वे सही क्रम में निष्पादित हों। इन मुद्दों से निपटते समय टाइमआउट महत्वपूर्ण भूमिका निभाते हैं।

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## WebDriver टाइमआउट्स

### सेशन स्क्रिप्ट टाइमआउट

एक सेशन में एक संबंधित सेशन स्क्रिप्ट टाइमआउट होता है जो अतुल्यकालिक स्क्रिप्ट के चलने के लिए प्रतीक्षा का समय निर्दिष्ट करता है। जब तक अन्यथा न कहा जाए, यह 30 सेकंड है। आप इस टाइमआउट को इस प्रकार सेट कर सकते हैं:

```js
await browser.setTimeout({ 'script': 60000 })
await browser.executeAsync((done) => {
    console.log('this should not fail')
    setTimeout(done, 59000)
})
```

### सेशन पेज लोड टाइमआउट

एक सेशन में एक संबंधित सेशन पेज लोड टाइमआउट होता है जो पेज लोडिंग के पूरा होने की प्रतीक्षा के लिए समय निर्दिष्ट करता है। जब तक अन्यथा न कहा जाए, यह 300,000 मिलीसेकंड है।

आप इस टाइमआउट को इस प्रकार सेट कर सकते हैं:

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> `pageLoad` कीवर्ड आधिकारिक WebDriver [स्पेसिफिकेशन](https://www.w3.org/TR/webdriver/#set-timeouts) का हिस्सा है, लेकिन आपके ब्राउज़र के लिए [समर्थित](https://github.com/seleniumhq/selenium-google-code-issue-archive/issues/687) नहीं हो सकता है (पिछला नाम `page load` है)।

### सेशन इम्प्लिसिट वेट टाइमआउट

एक सेशन में एक संबंधित सेशन इम्प्लिसिट वेट टाइमआउट होता है। यह [`findElement`](/docs/api/webdriver#findelement) या [`findElements`](/docs/api/webdriver#findelements) कमांड्स ([`$`](/docs/api/browser/$) या [`$$`](/docs/api/browser/$$), जब WebdriverIO को WDIO टेस्टरनर के साथ या बिना चलाते हैं) का उपयोग करके तत्वों का पता लगाने के लिए इम्प्लिसिट एलिमेंट लोकेशन स्ट्रेटेजी के लिए प्रतीक्षा का समय निर्दिष्ट करता है। जब तक अन्यथा न कहा जाए, यह 0 मिलीसेकंड है।

आप इस टाइमआउट को इस प्रकार सेट कर सकते हैं:

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## WebdriverIO संबंधित टाइमआउट्स

### `WaitFor*` टाइमआउट

WebdriverIO एलिमेंट्स के किसी निश्चित स्थिति (जैसे सक्षम, दृश्यमान, अस्तित्व में) तक पहुंचने की प्रतीक्षा करने के लिए कई कमांड्स प्रदान करता है। ये कमांड्स एक सिलेक्टर आर्गुमेंट और एक टाइमआउट नंबर लेते हैं, जो निर्धारित करता है कि इंस्टेंस को उस एलिमेंट के उस स्थिति तक पहुंचने के लिए कितने समय तक प्रतीक्षा करनी चाहिए। `waitforTimeout` विकल्प आपको सभी `waitFor*` कमांड्स के लिए ग्लोबल टाइमआउट सेट करने की अनुमति देता है, ताकि आपको बार-बार एक ही टाइमआउट सेट न करना पड़े। _(नोट करें कि `f` लोअरकेस में है!)_

```js
// wdio.conf.js
export const config = {
    // ...
    waitforTimeout: 5000,
    // ...
}
```

अपने टेस्ट्स में, अब आप यह कर सकते हैं:

```js
const myElem = await $('#myElem')
await myElem.waitForDisplayed()

// आप आवश्यकतानुसार डिफॉल्ट टाइमआउट को ओवरराइट भी कर सकते हैं
await myElem.waitForDisplayed({ timeout: 10000 })
```

## फ्रेमवर्क संबंधित टाइमआउट्स

टेस्टिंग फ्रेमवर्क जिसका आप WebdriverIO के साथ उपयोग कर रहे हैं, उसे टाइमआउट्स से निपटना होता है, विशेष रूप से क्योंकि सब कुछ अतुल्यकालिक है। यह सुनिश्चित करता है कि अगर कुछ गड़बड़ हो जाए तो टेस्ट प्रक्रिया अटक न जाए।

डिफॉल्ट रूप से, टाइमआउट 10 सेकंड का होता है, जिसका अर्थ है कि एक अकेला टेस्ट उससे अधिक समय नहीं लेना चाहिए।

Mocha में एक अकेला टेस्ट ऐसा दिखता है:

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

Cucumber में, टाइमआउट एक अकेली स्टेप डेफिनिशन पर लागू होता है। हालांकि, यदि आप टाइमआउट बढ़ाना चाहते हैं क्योंकि आपका टेस्ट डिफॉल्ट मान से अधिक समय लेता है, तो आपको इसे फ्रेमवर्क विकल्पों में सेट करना होगा।

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