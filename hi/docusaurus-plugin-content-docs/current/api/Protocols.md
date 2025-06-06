---
id: protocols
title: प्रोटोकॉल कमांड्स
---

WebdriverIO एक ऑटोमेशन फ्रेमवर्क है जो किसी रिमोट एजेंट को नियंत्रित करने के लिए विभिन्न ऑटोमेशन प्रोटोकॉल पर निर्भर करता है, जैसे ब्राउज़र, मोबाइल डिवाइस या टेलीविज़न के लिए। अलग-अलग रिमोट डिवाइस के आधार पर विभिन्न प्रोटोकॉल काम में आते हैं। ये कमांड रिमोट सर्वर (जैसे ब्राउज़र ड्राइवर) द्वारा सेशन जानकारी के आधार पर [Browser](/docs/api/browser) या [Element](/docs/api/element) ऑब्जेक्ट को असाइन किए जाते हैं।

आंतरिक रूप से WebdriverIO रिमोट एजेंट के साथ लगभग सभी इंटरैक्शन के लिए प्रोटोकॉल कमांड का उपयोग करता है। हालांकि, [Browser](/docs/api/browser) या [Element](/docs/api/element) ऑब्जेक्ट को असाइन किए गए अतिरिक्त कमांड WebdriverIO के उपयोग को सरल बनाते हैं, उदाहरण के लिए, प्रोटोकॉल कमांड का उपयोग करके किसी एलिमेंट का टेक्स्ट प्राप्त करना इस प्रकार दिखेगा:

```js
const searchInput = await browser.findElement('css selector', '#lst-ib')
await client.getElementText(searchInput['element-6066-11e4-a52e-4f735466cecf'])
```

[Browser](/docs/api/browser) या [Element](/docs/api/element) ऑब्जेक्ट के सुविधाजनक कमांड का उपयोग करके इसे इतना कम किया जा सकता है:

```js
$('#lst-ib').getText()
```

निम्नलिखित खंड प्रत्येक व्यक्तिगत प्रोटोकॉल की व्याख्या करते हैं।

## WebDriver प्रोटोकॉल

[WebDriver](https://w3c.github.io/webdriver/#elements) प्रोटोकॉल ब्राउज़र को स्वचालित करने के लिए एक वेब मानक है। कुछ अन्य E2E टूल के विपरीत, यह गारंटी देता है कि ऑटोमेशन वास्तविक ब्राउज़रों पर किया जा सकता है जिनका उपयोग आपके उपयोगकर्ता करते हैं, जैसे फ़ायरफ़ॉक्स, सफारी और क्रोम और क्रोमियम आधारित ब्राउज़र जैसे एज, और केवल ब्राउज़र इंजन पर नहीं, जैसे WebKit, जो बहुत अलग हैं।

[Chrome DevTools](https://w3c.github.io/webdriver/#elements) जैसे डीबगिंग प्रोटोकॉल के विपरीत WebDriver प्रोटोकॉल का उपयोग करने का लाभ यह है कि आपके पास कमांड का एक विशिष्ट सेट है जो सभी ब्राउज़रों में एक ही तरीके से ब्राउज़र के साथ इंटरैक्ट करने की अनुमति देता है, जिससे अस्थिरता की संभावना कम हो जाती है। इसके अलावा, यह प्रोटोकॉल [Sauce Labs](https://saucelabs.com/), [BrowserStack](https://www.browserstack.com/) और [अन्य](https://github.com/christian-bromann/awesome-selenium#cloud-services) जैसे क्लाउड वेंडर का उपयोग करके बड़े पैमाने पर स्केलेबिलिटी की क्षमता प्रदान करता है।

## WebDriver Bidi प्रोटोकॉल

[WebDriver Bidi](https://w3c.github.io/webdriver-bidi/) प्रोटोकॉल प्रोटोकॉल की दूसरी पीढ़ी है और वर्तमान में अधिकांश ब्राउज़र वेंडर द्वारा इस पर काम किया जा रहा है। अपने पूर्व-पूर्ववर्ती की तुलना में प्रोटोकॉल फ्रेमवर्क और रिमोट डिवाइस के बीच द्विदिशात्मक संचार (इसलिए "Bidi") का समर्थन करता है। यह इसके अलावा बेहतर ब्राउज़र इंट्रोस्पेक्शन के लिए अतिरिक्त प्रिमिटिव्स पेश करता है ताकि ब्राउज़र में आधुनिक वेब एप्लिकेशन को बेहतर ढंग से स्वचालित किया जा सके।

दिया गया यह प्रोटोकॉल वर्तमान में प्रगति पर है, समय के साथ और अधिक सुविधाएँ जोड़ी जाएंगी और ब्राउज़र द्वारा समर्थित होंगी। यदि आप WebdriverIO के सुविधाजनक कमांड का उपयोग करते हैं तो आपके लिए कुछ भी नहीं बदलेगा। WebdriverIO इन नई प्रोटोकॉल क्षमताओं का उपयोग करेगा जैसे ही वे उपलब्ध होंगी और ब्राउज़र में समर्थित होंगी।

## Appium

[Appium](https://appium.io/) प्रोजेक्ट मोबाइल, डेस्कटॉप और अन्य सभी प्रकार के IoT डिवाइसों को स्वचालित करने की क्षमताएं प्रदान करता है। जबकि WebDriver ब्राउज़र और वेब पर केंद्रित है, Appium का दृष्टिकोण समान दृष्टिकोण का उपयोग करना है, लेकिन किसी भी मनमाने डिवाइस के लिए। WebDriver द्वारा परिभाषित कमांड के अलावा, इसमें विशेष कमांड हैं जो अक्सर उस रिमोट डिवाइस के लिए विशिष्ट होते हैं जिसे स्वचालित किया जा रहा है। मोबाइल टेस्टिंग परिदृश्यों के लिए यह आदर्श है जब आप एंड्रॉइड और iOS एप्लिकेशन दोनों के लिए एक ही टेस्ट लिखना और चलाना चाहते हैं।

Appium के [दस्तावेज़ीकरण](https://appium.github.io/appium.io/docs/en/about-appium/intro/?lang=en) के अनुसार, इसे निम्नलिखित चार सिद्धांतों द्वारा रेखांकित दर्शन के अनुसार मोबाइल ऑटोमेशन आवश्यकताओं को पूरा करने के लिए डिज़ाइन किया गया था:

- आपको अपने ऐप को पुनः संकलित करने या इसे किसी भी तरह से संशोधित करने की आवश्यकता नहीं होनी चाहिए ताकि इसे स्वचालित किया जा सके।
- आपको अपने टेस्ट लिखने और चलाने के लिए किसी विशिष्ट भाषा या फ्रेमवर्क में लॉक नहीं होना चाहिए।
- एक मोबाइल ऑटोमेशन फ्रेमवर्क को ऑटोमेशन API के मामले में पहिये का पुनरावर्तन नहीं करना चाहिए।
- एक मोबाइल ऑटोमेशन फ्रेमवर्क को भावना और अभ्यास के साथ-साथ नाम में भी ओपन सोर्स होना चाहिए!

## Chromium

Chromium प्रोटोकॉल WebDriver प्रोटोकॉल के ऊपर कमांड का एक सुपर सेट प्रदान करता है जो केवल तभी समर्थित होता है जब [Chromedriver](https://chromedriver.chromium.org/chromedriver-canary) या [Edgedriver](https://developer.microsoft.com/fr-fr/microsoft-edge/tools/webdriver) के माध्यम से स्वचालित सत्र चलाया जाता है।

## Firefox

Firefox प्रोटोकॉल WebDriver प्रोटोकॉल के ऊपर कमांड का एक सुपर सेट प्रदान करता है जो केवल तभी समर्थित होता है जब [Geckodriver](https://github.com/mozilla/geckodriver) के माध्यम से स्वचालित सत्र चलाया जाता है।

## Sauce Labs

[Sauce Labs](https://saucelabs.com/) प्रोटोकॉल WebDriver प्रोटोकॉल के ऊपर कमांड का एक सुपर सेट प्रदान करता है जो केवल तभी समर्थित होता है जब Sauce Labs क्लाउड का उपयोग करके स्वचालित सत्र चलाया जाता है।

## Selenium Standalone

[Selenium Standalone](https://www.selenium.dev/documentation/grid/advanced_features/endpoints/) प्रोटोकॉल WebDriver प्रोटोकॉल के ऊपर कमांड का एक सुपर सेट प्रदान करता है जो केवल तभी समर्थित होता है जब Selenium Grid का उपयोग करके स्वचालित सत्र चलाया जाता है।

## JSON Wire प्रोटोकॉल

[JSON Wire प्रोटोकॉल](https://www.selenium.dev/documentation/legacy/json_wire_protocol/) WebDriver प्रोटोकॉल का पूर्व-पूर्ववर्ती है और आज __अप्रचलित__ है। हालांकि कुछ कमांड अभी भी कुछ वातावरणों में समर्थित हो सकते हैं, इसके किसी भी कमांड का उपयोग करने की सिफारिश नहीं की जाती है।

## Mobile JSON Wire प्रोटोकॉल

[Mobile JSON Wire प्रोटोकॉल](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md) JSON Wire प्रोटोकॉल के ऊपर मोबाइल कमांड का एक सुपर सेट है। देखते हुए कि यह अप्रचलित है, Mobile JSON Wire प्रोटोकॉल भी __अप्रचलित__ हो गया है। Appium अभी भी इसके कुछ कमांड का समर्थन कर सकता है, लेकिन उनका उपयोग करने की सिफारिश नहीं की जाती है।