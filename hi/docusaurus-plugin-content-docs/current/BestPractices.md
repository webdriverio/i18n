---
id: bestpractices
title: सर्वोत्तम प्रथाएं
description: "स्थिर सेलेक्टर्स, कम एलिमेंट क्वेरीज़, बिल्ट-इन असर्शन्स का उपयोग करके और मैन्युअल पॉज़ से बचकर WebdriverIO के साथ तेज़ और मज़बूत टेस्ट लिखें।"
---

# सर्वोत्तम प्रथाएं

इस गाइड का उद्देश्य हमारी उन सर्वोत्तम प्रथाओं को साझा करना है जो आपको प्रदर्शनकारी और मज़बूत टेस्ट लिखने में मदद करती हैं।

## मज़बूत सेलेक्टर्स का उपयोग करें

ऐसे सेलेक्टर्स का उपयोग करके जो DOM में होने वाले बदलावों के प्रति मज़बूत हों, उदाहरण के लिए जब किसी एलिमेंट से कोई क्लास हटा दी जाती है, तो आपके कम या बिल्कुल भी टेस्ट फेल नहीं होंगे।

क्लासेस कई एलिमेंट्स पर लागू की जा सकती हैं और जहां तक संभव हो इनसे बचना चाहिए, जब तक कि आप जानबूझकर उस क्लास वाले सभी एलिमेंट्स को प्राप्त नहीं करना चाहते।

```js
// 👎
await $('.button')
```

ये सभी सेलेक्टर्स एक ही एलिमेंट लौटाने चाहिए।

```js
// 👍
await $('aria/Submit')
await $('[test-id="submit-button"]')
await $('#submit-button')
```

__नोट:__ WebdriverIO द्वारा समर्थित सभी संभावित सेलेक्टर्स के बारे में जानने के लिए, हमारा [Selectors](./Selectors.md) पेज देखें।

## एलिमेंट क्वेरीज़ की संख्या सीमित करें

हर बार जब आप [`$`](https://webdriver.io/docs/api/browser/$) या [`$$`](https://webdriver.io/docs/api/browser/$$) कमांड का उपयोग करते हैं (इसमें उन्हें चेन करना भी शामिल है), WebdriverIO DOM में एलिमेंट को खोजने का प्रयास करता है। ये क्वेरीज़ महंगी होती हैं, इसलिए आपको जितना संभव हो सके इन्हें सीमित करने का प्रयास करना चाहिए।

तीन एलिमेंट्स की क्वेरी करता है।

```js
// 👎
await $('table').$('tr').$('td')
```

केवल एक एलिमेंट की क्वेरी करता है।

``` js
// 👍
await $('table tr td')
```

चेनिंग का उपयोग केवल तभी करना चाहिए जब आप विभिन्न [सेलेक्टर स्ट्रैटेजीज़](https://webdriver.io/docs/selectors/#custom-selector-strategies) को संयोजित करना चाहते हों।
उदाहरण में हम [Deep Selectors](https://webdriver.io/docs/selectors#deep-selectors) का उपयोग करते हैं, जो किसी एलिमेंट के shadow DOM के अंदर जाने की एक स्ट्रैटेजी है।

``` js
// 👍
await $('custom-datepicker').$('#calendar').$('aria/Select')
```

### सूची में से एक लेने के बजाय एक ही एलिमेंट को खोजने को प्राथमिकता दें

ऐसा करना हमेशा संभव नहीं होता, लेकिन [:nth-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child) जैसे CSS pseudo-classes का उपयोग करके आप एलिमेंट्स को उनके पैरेंट्स की चाइल्ड सूची में उनके इंडेक्स के आधार पर मैच कर सकते हैं।

सभी टेबल रोज़ की क्वेरी करता है।

```js
// 👎
await $$('table tr')[15]
```

एक ही टेबल रो की क्वेरी करता है।

```js
// 👍
await $('table tr:nth-child(15)')
```

## बिल्ट-इन असर्शन्स का उपयोग करें

ऐसे मैन्युअल असर्शन्स का उपयोग न करें जो परिणामों के मैच होने का स्वचालित रूप से इंतज़ार नहीं करते, क्योंकि इससे टेस्ट अस्थिर (flaky) हो जाएंगे।

```js
// 👎
expect(await button.isDisplayed()).toBe(true)
```

बिल्ट-इन असर्शन्स का उपयोग करके WebdriverIO स्वचालित रूप से वास्तविक परिणाम के अपेक्षित परिणाम से मैच होने का इंतज़ार करेगा, जिसके परिणामस्वरूप मज़बूत टेस्ट बनते हैं।
यह असर्शन के पास होने या टाइम आउट होने तक उसे स्वचालित रूप से दोबारा आज़माकर ऐसा करता है।

```js
// 👍
await expect(button).toBeDisplayed()
```

## लेज़ी लोडिंग और प्रॉमिस चेनिंग

साफ़ कोड लिखने के मामले में WebdriverIO के पास कुछ तरकीबें हैं, क्योंकि यह एलिमेंट को लेज़ी लोड कर सकता है जो आपको अपने प्रॉमिसेस को चेन करने की अनुमति देता है और `await` की संख्या को कम करता है। यह आपको एलिमेंट को Element के बजाय ChainablePromiseElement के रूप में पास करने की भी अनुमति देता है और पेज ऑब्जेक्ट्स के साथ उपयोग को आसान बनाता है।

तो आपको `await` का उपयोग कब करना है?
`$` और `$$` कमांड को छोड़कर आपको हमेशा `await` का उपयोग करना चाहिए।

```js
// 👎
const div = await $('div')
const button = await div.$('button')
await button.click()
// या
await (await (await $('div')).$('button')).click()
```

```js
// 👍
const button = $('div').$('button')
await button.click()
// या
await $('div').$('button').click()
```

## कमांड्स और असर्शन्स का अत्यधिक उपयोग न करें

expect.toBeDisplayed का उपयोग करते समय आप परोक्ष रूप से एलिमेंट के मौजूद होने का भी इंतज़ार करते हैं। जब आपके पास पहले से ही वही काम करने वाला असर्शन हो, तो waitForXXX कमांड्स का उपयोग करने की कोई आवश्यकता नहीं है।

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

इंटरैक्ट करते समय या उसके टेक्स्ट जैसी किसी चीज़ का असर्शन करते समय एलिमेंट के मौजूद होने या प्रदर्शित होने का इंतज़ार करने की कोई आवश्यकता नहीं है, जब तक कि एलिमेंट स्पष्ट रूप से अदृश्य (उदाहरण के लिए opacity: 0) न हो सकता हो या स्पष्ट रूप से अक्षम (उदाहरण के लिए disabled एट्रिब्यूट) न हो सकता हो, ऐसी स्थिति में एलिमेंट के प्रदर्शित होने का इंतज़ार करना समझ में आता है।

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

## डायनामिक टेस्ट

डायनामिक टेस्ट डेटा, जैसे गुप्त क्रेडेंशियल्स, को टेस्ट में हार्ड कोड करने के बजाय अपने एनवायरनमेंट में संग्रहीत करने के लिए एनवायरनमेंट वेरिएबल्स का उपयोग करें। इस विषय पर अधिक जानकारी के लिए [Parameterize Tests](parameterize-tests) पेज पर जाएं।

## अपने कोड को लिंट करें

अपने कोड को लिंट करने के लिए eslint का उपयोग करके आप संभावित रूप से त्रुटियों को जल्दी पकड़ सकते हैं, यह सुनिश्चित करने के लिए हमारे [लिंटिंग नियमों](https://www.npmjs.com/package/eslint-plugin-wdio) का उपयोग करें कि कुछ सर्वोत्तम प्रथाएं हमेशा लागू हों।

## पॉज़ न करें

pause कमांड का उपयोग करना लुभावना हो सकता है, लेकिन इसका उपयोग करना एक बुरा विचार है क्योंकि यह मज़बूत नहीं है और लंबे समय में केवल अस्थिर (flaky) टेस्ट का कारण बनेगा।

```js
// 👎
await nameInput.setValue('Bob')
await browser.pause(200) // सबमिट बटन के सक्षम होने का इंतज़ार करें
await submitFormButton.click()

// 👍
await nameInput.setValue('Bob')
await submitFormButton.waitForEnabled()
await submitFormButton.click()
```

## एसिंक लूप्स

जब आपके पास कुछ एसिंक्रोनस कोड हो जिसे आप दोहराना चाहते हैं, तो यह जानना महत्वपूर्ण है कि सभी लूप्स ऐसा नहीं कर सकते।
उदाहरण के लिए, Array का forEach फ़ंक्शन एसिंक्रोनस कॉलबैक की अनुमति नहीं देता, जैसा कि [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) पर पढ़ा जा सकता है।

__नोट:__ आप अभी भी इनका उपयोग कर सकते हैं जब आपको ऑपरेशन के एसिंक्रोनस होने की आवश्यकता न हो, जैसा कि इस उदाहरण में दिखाया गया है `console.log(await $$('h1').map((h1) => h1.getText()))`।

इसका क्या अर्थ है, इसके कुछ उदाहरण नीचे दिए गए हैं।

निम्नलिखित काम नहीं करेगा क्योंकि एसिंक्रोनस कॉलबैक समर्थित नहीं हैं।

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

कभी-कभी हम देखते हैं कि हमारे उपयोगकर्ता टेक्स्ट या वैल्यूज़ जैसे डेटा को मैप करते हैं। इसकी अक्सर आवश्यकता नहीं होती और यह अक्सर एक code smell होता है, ऐसा क्यों है यह जानने के लिए नीचे दिए गए उदाहरण देखें।

```js
// 👎 बहुत जटिल, सिंक्रोनस असर्शन, अस्थिर टेस्ट को रोकने के लिए बिल्ट-इन असर्शन्स का उपयोग करें
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

// 👎 एलिमेंट्स को उनके टेक्स्ट से खोजता है लेकिन एलिमेंट्स की स्थिति को ध्यान में नहीं रखता
await expect($('th=Products')).toExist();
await expect($('th=Prices')).toExist();
```

```js
// 👍 यूनिक आइडेंटिफ़ायर्स का उपयोग करें (अक्सर कस्टम एलिमेंट्स के लिए उपयोग किया जाता है)
await expect($('[data-testid="Products"]')).toHaveText('Products');
// 👍 एक्सेसिबिलिटी नाम (अक्सर नेटिव html एलिमेंट्स के लिए उपयोग किया जाता है)
await expect($('aria/Product Prices')).toHaveText('Prices');
```

एक और चीज़ जो हम कभी-कभी देखते हैं वह यह है कि सरल चीज़ों का अत्यधिक जटिल समाधान होता है।

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

## कोड को समानांतर रूप से निष्पादित करना

यदि आपको इस बात की परवाह नहीं है कि कुछ कोड किस क्रम में चलता है, तो आप निष्पादन को तेज़ करने के लिए [`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) का उपयोग कर सकते हैं।

__नोट:__ चूंकि इससे कोड को पढ़ना कठिन हो जाता है, आप इसे पेज ऑब्जेक्ट या फ़ंक्शन का उपयोग करके एब्स्ट्रैक्ट कर सकते हैं, हालांकि आपको यह भी सोचना चाहिए कि क्या प्रदर्शन में मिलने वाला लाभ पठनीयता की कीमत के लायक है।

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

यदि इसे एब्स्ट्रैक्ट किया जाए तो यह कुछ नीचे दिए गए जैसा दिख सकता है, जहां लॉजिक को submitWithDataOf नामक मेथड में रखा गया है और डेटा Person क्लास द्वारा प्राप्त किया जाता है।

```js
// 👍
await form.submitData(new Person('bob@webdriver.io'))
```