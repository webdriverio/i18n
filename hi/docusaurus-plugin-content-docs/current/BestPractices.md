---
id: bestpractices
title: सर्वोत्तम अभ्यास
---

# सर्वोत्तम अभ्यास

इस गाइड का उद्देश्य हमारे सर्वोत्तम अभ्यासों को साझा करना है जो आपको प्रदर्शनकारी और लचीले टेस्ट लिखने में मदद करते हैं।

## लचीले सेलेक्टर्स का उपयोग करें

DOM में परिवर्तनों के प्रति लचीले सेलेक्टर्स का उपयोग करके, आपके कम या यहां तक कि कोई टेस्ट फेल नहीं होंगे जब उदाहरण के लिए किसी एलीमेंट से क्लास हटा दी जाती है।

क्लासेस को कई एलीमेंट्स पर लागू किया जा सकता है और यदि संभव हो तो इनसे बचना चाहिए, जब तक कि आप जानबूझकर उस क्लास के सभी एलीमेंट्स को प्राप्त करना चाहते हों।

```js
// 👎
await $('.button')
```

ये सभी सेलेक्टर्स एक एकल एलीमेंट लौटाने चाहिए।

```js
// 👍
await $('aria/Submit')
await $('[test-id="submit-button"]')
await $('#submit-button')
```

__नोट:__ WebdriverIO द्वारा समर्थित सभी संभावित सेलेक्टर्स के बारे में जानने के लिए, हमारे [सेलेक्टर्स](./Selectors.md) पेज को देखें।

## एलीमेंट क्वेरीज़ की संख्या सीमित करें

हर बार जब आप [`$`](https://webdriver.io/docs/api/browser/$) या [`$$`](https://webdriver.io/docs/api/browser/$$) कमांड का उपयोग करते हैं (इसमें उन्हें चेन करना भी शामिल है), WebdriverIO DOM में एलीमेंट को ढूंढने का प्रयास करता है। ये क्वेरीज़ महंगी हैं इसलिए आपको उन्हें जितना संभव हो उतना सीमित करने का प्रयास करना चाहिए।

तीन एलीमेंट्स को क्वेरी करता है।

```js
// 👎
await $('table').$('tr').$('td')
```

केवल एक एलीमेंट को क्वेरी करता है।

``` js
// 👍
await $('table tr td')
```

चेनिंग का उपयोग करने का एकमात्र समय तब होता है जब आप विभिन्न [सेलेक्टर रणनीतियों](https://webdriver.io/docs/selectors/#custom-selector-strategies) को जोड़ना चाहते हैं।
इस उदाहरण में, हम [डीप सेलेक्टर्स](https://webdriver.io/docs/selectors#deep-selectors) का उपयोग करते हैं, जो एक एलीमेंट के शैडो DOM के अंदर जाने की रणनीति है।

``` js
// 👍
await $('custom-datepicker').$('#calendar').$('aria/Select')
```

### सूची से एक एलीमेंट लेने के बजाय एक एलीमेंट को ढूंढना पसंद करें

ऐसा करना हमेशा संभव नहीं होता है, लेकिन [:nth-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child) जैसे CSS स्यूडो-क्लासेस का उपयोग करके आप एलीमेंट्स को उनके माता-पिता की चाइल्ड लिस्ट में उनके इंडेक्स के आधार पर मैच कर सकते हैं।

सभी टेबल पंक्तियों को क्वेरी करता है।

```js
// 👎
await $$('table tr')[15]
```

एक एकल टेबल पंक्ति को क्वेरी करता है।

```js
// 👍
await $('table tr:nth-child(15)')
```

## बिल्ट-इन अस्सर्शन्स का उपयोग करें

मैन्युअल अस्सर्शन्स का उपयोग न करें जो स्वचालित रूप से परिणामों के मिलान के लिए प्रतीक्षा नहीं करते क्योंकि इससे अस्थिर टेस्ट होंगे।

```js
// 👎
expect(await button.isDisplayed()).toBe(true)
```

बिल्ट-इन अस्सर्शन्स का उपयोग करके WebdriverIO वास्तविक परिणाम के अपेक्षित परिणाम से मेल खाने के लिए स्वचालित रूप से प्रतीक्षा करेगा, जिससे लचीले टेस्ट प्राप्त होंगे।
यह अस्सर्शन को स्वचालित रूप से फिर से प्रयास करके हासिल किया जाता है जब तक कि यह पास न हो जाए या टाइम आउट न हो जाए।

```js
// 👍
await expect(button).toBeDisplayed()
```

## लेज़ी लोडिंग और प्रॉमिस चेनिंग

WebdriverIO के पास क्लीन कोड लिखने के मामले में कुछ तकनीकें हैं क्योंकि यह एलीमेंट को लेज़ी लोड कर सकता है जो आपको अपने प्रॉमिसेस को चेन करने और `await` की मात्रा को कम करने की अनुमति देता है। यह आपको एलीमेंट के बजाय ChainablePromiseElement के रूप में एलीमेंट पास करने और पेज ऑब्जेक्ट्स के साथ आसान उपयोग के लिए भी अनुमति देता है।

तो आपको `await` का उपयोग कब करना चाहिए?
आपको हमेशा `await` का उपयोग करना चाहिए, `$` और `$$` कमांड को छोड़कर।

```js
// 👎
const div = await $('div')
const button = await div.$('button')
await button.click()
// or
await (await (await $('div')).$('button')).click()
```

```js
// 👍
const button = $('div').$('button')
await button.click()
// or
await $('div').$('button').click()
```

## कमांड्स और अस्सर्शन्स का अत्यधिक उपयोग न करें

expect.toBeDisplayed का उपयोग करते समय, आप अप्रत्यक्ष रूप से एलीमेंट के अस्तित्व के लिए भी प्रतीक्षा करते हैं। waitForXXX कमांड्स का उपयोग करने की आवश्यकता नहीं है जब आपके पास पहले से ही एक अस्सर्शन है जो वही काम कर रहा है।

```js
// 👎
await button.waitForExist()
await expect(button).toBeDisplayed()

// 👎
await button.waitForDisplayed()
await expect(button).toBeDisplayed()

// 👍
await expect(button).toBeDisplayed()
```

इंटरैक्ट करते समय या जब उसके टेक्स्ट जैसे किसी चीज की पुष्टि करते समय, एलीमेंट के अस्तित्व या प्रदर्शित होने के लिए प्रतीक्षा करने की कोई आवश्यकता नहीं है, जब तक कि एलीमेंट स्पष्ट रूप से अदृश्य (उदाहरण के लिए opacity: 0) या स्पष्ट रूप से अक्षम (उदाहरण के लिए disabled एट्रिब्यूट) न हो, ऐसे मामले में एलीमेंट के प्रदर्शित होने के लिए प्रतीक्षा करना समझ में आता है।

```js
// 👎
await expect(button).toBeExisting()
await expect(button).toHaveText('Submit')

// 👎
await expect(button).toBeDisplayed()
await expect(button).toHaveText('Submit')

// 👎
await expect(button).toBeDisplayed()
await button.click()
```

```js
// 👍
await button.click()

// 👍
await expect(button).toHaveText('Submit')
```

## डायनामिक टेस्ट्स

डायनामिक टेस्ट डेटा, जैसे गुप्त क्रेडेंशियल्स, को अपने एनवायरनमेंट में स्टोर करने के लिए एनवायरनमेंट वेरिएबल्स का उपयोग करें, बजाय इन्हें टेस्ट में हार्ड कोड करने के। इस विषय पर अधिक जानकारी के लिए [पैरामीटराइज़ टेस्ट्स](parameterize-tests) पेज पर जाएं।

## अपने कोड को लिंट करें

अपने कोड को लिंट करने के लिए eslint का उपयोग करके आप संभावित त्रुटियों को जल्दी पकड़ सकते हैं, हमारे [लिंटिंग नियमों](https://www.npmjs.com/package/eslint-plugin-wdio) का उपयोग करें यह सुनिश्चित करने के लिए कि कुछ सर्वोत्तम अभ्यास हमेशा लागू किए जाते हैं।

## पॉज़ न करें

पॉज़ कमांड का उपयोग करने का प्रलोभन हो सकता है, लेकिन इसका उपयोग करना एक बुरा विचार है क्योंकि यह लचीला नहीं है और लंबे समय में केवल अस्थिर टेस्ट का कारण बनेगा।

```js
// 👎
await nameInput.setValue('Bob')
await browser.pause(200) // wait for submit button to enable
await submitFormButton.click()

// 👍
await nameInput.setValue('Bob')
await submitFormButton.waitForEnabled()
await submitFormButton.click()
```

## एसिंक लूप्स

जब आपके पास कुछ एसिंक्रोनस कोड है जिसे आप दोहराना चाहते हैं, तो यह जानना महत्वपूर्ण है कि सभी लूप्स ऐसा नहीं कर सकते हैं।
उदाहरण के लिए, Array की forEach फ़ंक्शन एसिंक्रोनस कॉलबैक्स की अनुमति नहीं देती है जैसा कि [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) पर पढ़ा जा सकता है।

__नोट:__ आप इनका उपयोग तब भी कर सकते हैं जब आपको ऑपरेशन को एसिंक्रोनस होने की आवश्यकता न हो, जैसा कि इस उदाहरण में दिखाया गया है `console.log(await $$('h1').map((h1) => h1.getText()))`।

नीचे कुछ उदाहरण दिए गए हैं कि इसका क्या अर्थ है।

निम्नलिखित काम नहीं करेगा क्योंकि एसिंक्रोनस कॉलबैक्स समर्थित नहीं हैं।

```js
// 👎
const characters = 'this is some example text that should be put in order'
characters.forEach(async (character) => {
    await browser.keys(character)
})
```

निम्नलिखित काम करेगा।

```js
// 👍
const characters = 'this is some example text that should be put in order'
for (const character of characters) {
    await browser.keys(character)
}
```

## इसे सरल रखें

कभी-कभी हम अपने उपयोगकर्ताओं को टेक्स्ट या वैल्यूज़ जैसे डेटा को मैप करते हुए देखते हैं। यह अक्सर आवश्यक नहीं होता है और अक्सर एक कोड स्मेल होता है, नीचे दिए गए उदाहरणों को देखें कि यह क्यों मामला है।

```js
// 👎 बहुत जटिल, सिंक्रोनस अस्सर्शन, अस्थिर टेस्ट को रोकने के लिए बिल्ट-इन अस्सर्शन्स का उपयोग करें
const headerText = ['Products', 'Prices']
const texts = await $$('th').map(e => e.getText());
expect(texts).toBe(headerText)

// 👎 बहुत जटिल
const headerText = ['Products', 'Prices']
const columns = await $$('th');
await expect(columns).toBeElementsArrayOfSize(2);
for (let i = 0; i < columns.length; i++) {
    await expect(columns[i]).toHaveText(headerText[i]);
}

// 👎 एलीमेंट्स को उनके टेक्स्ट द्वारा ढूंढता है लेकिन एलीमेंट्स की स्थिति को ध्यान में नहीं रखता
await expect($('th=Products')).toExist();
await expect($('th=Prices')).toExist();
```

```js
// 👍 अद्वितीय पहचानकर्ताओं का उपयोग करें (अक्सर कस्टम एलीमेंट्स के लिए उपयोग किया जाता है)
await expect($('[data-testid="Products"]')).toHaveText('Products');
// 👍 एक्सेसिबिलिटी नाम (अक्सर नेटिव html एलीमेंट्स के लिए उपयोग किया जाता है)
await expect($('aria/Product Prices')).toHaveText('Prices');
```

एक और चीज जो हम कभी-कभी देखते हैं, वह यह है कि सरल चीजों का एक अत्यधिक जटिल समाधान है।

```js
// 👎
class BadExample {
    public async selectOptionByValue(value: string) {
        await $('select').click();
        await $$('option')
            .map(async function (element) {
                const hasValue = (await element.getValue()) === value;
                if (hasValue) {
                    await $(element).click();
                }
                return hasValue;
            });
    }

    public async selectOptionByText(text: string) {
        await $('select').click();
        await $$('option')
            .map(async function (element) {
                const hasText = (await element.getText()) === text;
                if (hasText) {
                    await $(element).click();
                }
                return hasText;
            });
    }
}
```

```js
// 👍
class BetterExample {
    public async selectOptionByValue(value: string) {
        await $('select').click();
        await $(`option[value=${value}]`).click();
    }

    public async selectOptionByText(text: string) {
        await $('select').click();
        await $(`option=${text}]`).click();
    }
}
```

## समानांतर में कोड निष्पादित करना

यदि आप इस बात की परवाह नहीं करते कि कोड किस क्रम में चलाया जाता है, तो आप निष्पादन को तेज करने के लिए [`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) का उपयोग कर सकते हैं।

__नोट:__ चूंकि यह कोड को पढ़ने में कठिन बनाता है, आप इसे पेज ऑब्जेक्ट या फ़ंक्शन का उपयोग करके अमूर्त कर सकते हैं, हालांकि आपको यह भी सवाल करना चाहिए कि क्या प्रदर्शन में लाभ पठनीयता की लागत के लायक है।

```js
// 👎
await name.setValue('Bob')
await email.setValue('bob@webdriver.io')
await age.setValue('50')
await submitFormButton.waitForEnabled()
await submitFormButton.click()

// 👍
await Promise.all([
    name.setValue('Bob'),
    email.setValue('bob@webdriver.io'),
    age.setValue('50'),
])
await submitFormButton.waitForEnabled()
await submitFormButton.click()
```

यदि अमूर्त किया जाता है तो यह नीचे दिए गए जैसा दिख सकता है जहां लॉजिक को submitWithDataOf नामक मेथड में रखा गया है और डेटा Person क्लास द्वारा प्राप्त किया जाता है।

```js
// 👍
await form.submitData(new Person('bob@webdriver.io'))
```