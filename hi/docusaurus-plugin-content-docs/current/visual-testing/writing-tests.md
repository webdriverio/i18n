---
id: writing-tests
title: टेस्ट लिखना
description: "Mocha, Jasmine या Cucumber के साथ विज़ुअल टेस्ट लिखें जो स्क्रीनशॉट सेव करते हैं या कस्टम मैचर्स और check मेथड्स के साथ उन्हें बेसलाइन से मिलाते हैं।"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## टेस्टरनर फ्रेमवर्क सपोर्ट

`@wdio/visual-service` टेस्ट-रनर फ्रेमवर्क से स्वतंत्र है, जिसका अर्थ है कि आप इसे WebdriverIO द्वारा सपोर्ट किए जाने वाले सभी फ्रेमवर्क्स के साथ उपयोग कर सकते हैं, जैसे:

-   [`Mocha`](https://webdriver.io/docs/frameworks#using-mocha)
-   [`Jasmine`](https://webdriver.io/docs/frameworks#using-jasmine)
-   [`CucumberJS`](https://webdriver.io/docs/frameworks#using-cucumber)

अपने टेस्ट के भीतर, आप स्क्रीनशॉट _सेव_ कर सकते हैं या टेस्ट के अंतर्गत अपने एप्लिकेशन की वर्तमान विज़ुअल स्थिति को बेसलाइन से मिला सकते हैं। इसके लिए, सर्विस [कस्टम मैचर](/docs/api/expect-webdriverio#visual-matcher), साथ ही _check_ मेथड्स प्रदान करती है:

<Tabs
    defaultValue="mocha"
    values={[
        {label: 'Mocha', value: 'mocha'},
        {label: 'Jasmine', value: 'jasmine'},
        {label: 'CucumberJS', value: 'cucumberjs'},
    ]}
>
<TabItem value="mocha">

```ts
describe('Mocha Example', () => {
    beforeEach(async () => {
        await browser.url('https://webdriver.io')
    })

    it('using visual matchers to assert against baseline', async () => {
        // जाँचें कि स्क्रीन बेसलाइन से बिल्कुल मेल खाती है
        await expect(browser).toMatchScreenSnapshot('partialPage')
        // जाँचें कि एलिमेंट का बेसलाइन के साथ मिसमैच प्रतिशत 5% है
        await expect(browser).toMatchScreenSnapshot('partialPage', 5)
        // `saveScreen` कमांड के विकल्पों के साथ एलिमेंट की जाँच करें
        await expect(browser).toMatchScreenSnapshot('partialPage', {
            /* कुछ विकल्प */
        })

        // जाँचें कि एलिमेंट बेसलाइन से बिल्कुल मेल खाता है
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
        // जाँचें कि एलिमेंट का बेसलाइन के साथ मिसमैच प्रतिशत 5% है
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
        // `saveElement` कमांड के विकल्पों के साथ एलिमेंट की जाँच करें
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
            /* कुछ विकल्प */
        })

        // जाँचें कि फुल पेज स्क्रीनशॉट बेसलाइन से मेल खाता है
        await expect(browser).toMatchFullPageSnapshot('fullPage')
        // जाँचें कि फुल पेज स्क्रीनशॉट का बेसलाइन के साथ मिसमैच प्रतिशत 5% है
        await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
        // `checkFullPageScreen` कमांड के विकल्पों के साथ फुल पेज स्क्रीनशॉट की जाँच करें
        await expect(browser).toMatchFullPageSnapshot('fullPage', {
            /* कुछ विकल्प */
        })

        // सभी टैब एक्ज़ीक्यूशन के साथ फुल पेज स्क्रीनशॉट की जाँच करें
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
        // जाँचें कि फुल पेज स्क्रीनशॉट का बेसलाइन के साथ मिसमैच प्रतिशत 5% है
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
        // `checkTabbablePage` कमांड के विकल्पों के साथ फुल पेज स्क्रीनशॉट की जाँच करें
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
            /* कुछ विकल्प */
        })
    })

    it('should save some screenshots', async () => {
        // एक स्क्रीन सेव करें
        await browser.saveScreen('examplePage', {
            /* कुछ विकल्प */
        })

        // एक एलिमेंट सेव करें
        await browser.saveElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* कुछ विकल्प */
            }
        )

        // एक फुल पेज स्क्रीनशॉट सेव करें
        await browser.saveFullPageScreen('fullPage', {
            /* कुछ विकल्प */
        })

        // सभी टैब एक्ज़ीक्यूशन के साथ एक फुल पेज स्क्रीनशॉट सेव करें
        await browser.saveTabbablePage('save-tabbable', {
            /* कुछ विकल्प, saveFullPageScreen के समान विकल्पों का उपयोग करें */
        })
    })

    it('should compare successful with a baseline', async () => {
        // एक स्क्रीन की जाँच करें
        await expect(
            await browser.checkScreen('examplePage', {
                /* कुछ विकल्प */
            })
        ).toEqual(0)

        // एक एलिमेंट की जाँच करें
        await expect(
            await browser.checkElement(
                await $('#element-id'),
                'firstButtonElement',
                {
                    /* कुछ विकल्प */
                }
            )
        ).toEqual(0)

        // एक फुल पेज स्क्रीनशॉट की जाँच करें
        await expect(
            await browser.checkFullPageScreen('fullPage', {
                /* कुछ विकल्प */
            })
        ).toEqual(0)

        // सभी टैब एक्ज़ीक्यूशन के साथ एक फुल पेज स्क्रीनशॉट की जाँच करें
        await expect(
            await browser.checkTabbablePage('check-tabbable', {
                /* कुछ विकल्प, checkFullPageScreen के समान विकल्पों का उपयोग करें */
            })
        ).toEqual(0)
    })
})
```

</TabItem>
<TabItem value="jasmine">

```ts
describe('Jasmine Example', () => {
    beforeEach(async () => {
        await browser.url('https://webdriver.io')
    })

    it('using visual matchers to assert against baseline', async () => {
        // जाँचें कि स्क्रीन बेसलाइन से बिल्कुल मेल खाती है
        await expect(browser).toMatchScreenSnapshot('partialPage')
        // जाँचें कि एलिमेंट का बेसलाइन के साथ मिसमैच प्रतिशत 5% है
        await expect(browser).toMatchScreenSnapshot('partialPage', 5)
        // `saveScreen` कमांड के विकल्पों के साथ एलिमेंट की जाँच करें
        await expect(browser).toMatchScreenSnapshot('partialPage', {
            /* कुछ विकल्प */
        })

        // जाँचें कि एलिमेंट बेसलाइन से बिल्कुल मेल खाता है
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
        // जाँचें कि एलिमेंट का बेसलाइन के साथ मिसमैच प्रतिशत 5% है
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
        // `saveElement` कमांड के विकल्पों के साथ एलिमेंट की जाँच करें
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
            /* कुछ विकल्प */
        })

        // जाँचें कि फुल पेज स्क्रीनशॉट बेसलाइन से मेल खाता है
        await expect(browser).toMatchFullPageSnapshot('fullPage')
        // जाँचें कि फुल पेज स्क्रीनशॉट का बेसलाइन के साथ मिसमैच प्रतिशत 5% है
        await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
        // `checkFullPageScreen` कमांड के विकल्पों के साथ फुल पेज स्क्रीनशॉट की जाँच करें
        await expect(browser).toMatchFullPageSnapshot('fullPage', {
            /* कुछ विकल्प */
        })

        // सभी टैब एक्ज़ीक्यूशन के साथ फुल पेज स्क्रीनशॉट की जाँच करें
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
        // जाँचें कि फुल पेज स्क्रीनशॉट का बेसलाइन के साथ मिसमैच प्रतिशत 5% है
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
        // `checkTabbablePage` कमांड के विकल्पों के साथ फुल पेज स्क्रीनशॉट की जाँच करें
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
            /* कुछ विकल्प */
        })
    })

    it('should save some screenshots', async () => {
        // एक स्क्रीन सेव करें
        await browser.saveScreen('examplePage', {
            /* कुछ विकल्प */
        })

        // एक एलिमेंट सेव करें
        await browser.saveElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* कुछ विकल्प */
            }
        )

        // एक फुल पेज स्क्रीनशॉट सेव करें
        await browser.saveFullPageScreen('fullPage', {
            /* कुछ विकल्प */
        })

        // सभी टैब एक्ज़ीक्यूशन के साथ एक फुल पेज स्क्रीनशॉट सेव करें
        await browser.saveTabbablePage('save-tabbable', {
            /* कुछ विकल्प, saveFullPageScreen के समान विकल्पों का उपयोग करें */
        })
    })

    it('should compare successful with a baseline', async () => {
        // एक स्क्रीन की जाँच करें
        await expect(
            await browser.checkScreen('examplePage', {
                /* कुछ विकल्प */
            })
        ).toEqual(0)

        // एक एलिमेंट की जाँच करें
        await expect(
            await browser.checkElement(
                await $('#element-id'),
                'firstButtonElement',
                {
                    /* कुछ विकल्प */
                }
            )
        ).toEqual(0)

        // एक फुल पेज स्क्रीनशॉट की जाँच करें
        await expect(
            await browser.checkFullPageScreen('fullPage', {
                /* कुछ विकल्प */
            })
        ).toEqual(0)

        // सभी टैब एक्ज़ीक्यूशन के साथ एक फुल पेज स्क्रीनशॉट की जाँच करें
        await expect(
            await browser.checkTabbablePage('check-tabbable', {
                /* कुछ विकल्प, checkFullPageScreen के समान विकल्पों का उपयोग करें */
            })
        ).toEqual(0)
    })
})
```

</TabItem>
<TabItem value="cucumberjs">

```ts
import { When, Then } from '@wdio/cucumber-framework'

When('I save some screenshots', async function () {
    // एक स्क्रीन सेव करें
    await browser.saveScreen('examplePage', {
        /* कुछ विकल्प */
    })

    // एक एलिमेंट सेव करें
    await browser.saveElement(await $('#element-id'), 'firstButtonElement', {
        /* कुछ विकल्प */
    })

    // एक फुल पेज स्क्रीनशॉट सेव करें
    await browser.saveFullPageScreen('fullPage', {
        /* कुछ विकल्प */
    })

    // सभी टैब एक्ज़ीक्यूशन के साथ एक फुल पेज स्क्रीनशॉट सेव करें
    await browser.saveTabbablePage('save-tabbable', {
        /* कुछ विकल्प, saveFullPageScreen के समान विकल्पों का उपयोग करें */
    })
})

Then('I should be able to match some screenshots with a baseline', async function () {
    // जाँचें कि स्क्रीन बेसलाइन से बिल्कुल मेल खाती है
    await expect(browser).toMatchScreenSnapshot('partialPage')
    // जाँचें कि एलिमेंट का बेसलाइन के साथ मिसमैच प्रतिशत 5% है
    await expect(browser).toMatchScreenSnapshot('partialPage', 5)
    // `saveScreen` कमांड के विकल्पों के साथ एलिमेंट की जाँच करें
    await expect(browser).toMatchScreenSnapshot('partialPage', {
        /* कुछ विकल्प */
    })

    // जाँचें कि एलिमेंट बेसलाइन से बिल्कुल मेल खाता है
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
    // जाँचें कि एलिमेंट का बेसलाइन के साथ मिसमैच प्रतिशत 5% है
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
    // `saveElement` कमांड के विकल्पों के साथ एलिमेंट की जाँच करें
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
        /* कुछ विकल्प */
    })

    // जाँचें कि फुल पेज स्क्रीनशॉट बेसलाइन से मेल खाता है
    await expect(browser).toMatchFullPageSnapshot('fullPage')
    // जाँचें कि फुल पेज स्क्रीनशॉट का बेसलाइन के साथ मिसमैच प्रतिशत 5% है
    await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
    // `checkFullPageScreen` कमांड के विकल्पों के साथ फुल पेज स्क्रीनशॉट की जाँच करें
    await expect(browser).toMatchFullPageSnapshot('fullPage', {
        /* कुछ विकल्प */
    })

    // सभी टैब एक्ज़ीक्यूशन के साथ फुल पेज स्क्रीनशॉट की जाँच करें
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
    // जाँचें कि फुल पेज स्क्रीनशॉट का बेसलाइन के साथ मिसमैच प्रतिशत 5% है
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
    // `checkTabbablePage` कमांड के विकल्पों के साथ फुल पेज स्क्रीनशॉट की जाँच करें
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
        /* कुछ विकल्प */
    })
})

Then('I should be able to compare some screenshots with a baseline', async function () {
    // एक स्क्रीन की जाँच करें
    await expect(
        await browser.checkScreen('examplePage', {
            /* कुछ विकल्प */
        })
    ).toEqual(0)

    // एक एलिमेंट की जाँच करें
    await expect(
        await browser.checkElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* कुछ विकल्प */
            }
        )
    ).toEqual(0)

    // एक फुल पेज स्क्रीनशॉट की जाँच करें
    await expect(
        await browser.checkFullPageScreen('fullPage', {
            /* कुछ विकल्प */
        })
    ).toEqual(0)

    // सभी टैब एक्ज़ीक्यूशन के साथ एक फुल पेज स्क्रीनशॉट की जाँच करें
    await expect(
        await browser.checkTabbablePage('check-tabbable', {
            /* कुछ विकल्प, checkFullPageScreen के समान विकल्पों का उपयोग करें */
        })
    ).toEqual(0)
})
```

</TabItem>
</Tabs>

:::note महत्वपूर्ण

यह सर्विस `save` और `check` मेथड्स प्रदान करती है। यदि आप अपने टेस्ट पहली बार चला रहे हैं, तो आपको `save` और `compare` मेथड्स को **एक साथ नहीं** मिलाना चाहिए, `check`-मेथड्स आपके लिए स्वचालित रूप से एक बेसलाइन इमेज बना देंगे

```sh
#####################################################################################
 INFO:
 Autosaved the image to
 /Users/wswebcreation/sample/baselineFolder/desktop_chrome/examplePage-chrome-latest-1366x768.png
#####################################################################################
```


जब आपने [बेसलाइन इमेज को स्वचालित रूप से सेव करना अक्षम](service-options#autosavebaseline) कर दिया हो, तो Promise निम्नलिखित चेतावनी के साथ रिजेक्ट हो जाएगा।

```sh
#####################################################################################
 Baseline image not found, save the actual image manually to the baseline.
 The image can be found here:
 /Users/wswebcreation/sample/.tmp/actual/desktop_chrome/examplePage-chrome-latest-1366x768.png
#####################################################################################
```

इसका अर्थ है कि वर्तमान स्क्रीनशॉट actual फ़ोल्डर में सेव हो गया है और आपको **इसे मैन्युअल रूप से अपनी बेसलाइन में कॉपी करना होगा**। यदि आप `@wdio/visual-service` को [`autoSaveBaseline: true`](./service-options#autosavebaseline) के साथ इंस्टैंशिएट करते हैं, तो इमेज स्वचालित रूप से बेसलाइन फ़ोल्डर में सेव हो जाएगी।

:::