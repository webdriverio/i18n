---
id: protractor-migration
title: प्रोट्रैक्टर से
---

यह ट्यूटोरियल उन लोगों के लिए है जो प्रोट्रैक्टर का उपयोग कर रहे हैं और अपने फ्रेमवर्क को WebdriverIO में माइग्रेट करना चाहते हैं। यह Angular टीम [द्वारा घोषणा](https://github.com/angular/protractor/issues/5502) के बाद शुरू किया गया था कि प्रोट्रैक्टर का समर्थन अब और नहीं किया जाएगा। WebdriverIO प्रोट्रैक्टर के कई डिजाइन निर्णयों से प्रभावित हुआ है, जिस कारण से यह शायद माइग्रेट करने के लिए सबसे नजदीकी फ्रेमवर्क है। WebdriverIO टीम हर एक प्रोट्रैक्टर योगदानकर्ता के काम की सराहना करती है और आशा करती है कि यह ट्यूटोरियल WebdriverIO में संक्रमण को आसान और सीधा बनाता है।

हालांकि हम इसके लिए पूरी तरह से स्वचालित प्रक्रिया चाहते हैं, वास्तविकता अलग दिखती है। हर किसी का सेटअप अलग है और प्रोट्रैक्टर का उपयोग अलग-अलग तरीकों से करता है। हर कदम को मार्गदर्शन के रूप में देखा जाना चाहिए और कम से कम कदम से कदम निर्देश के रूप में। यदि आपको माइग्रेशन के साथ समस्याएं हैं, तो [हमसे संपर्क](https://github.com/webdriverio/codemod/discussions/new) करने में संकोच न करें।

## सेटअप

प्रोट्रैक्टर और WebdriverIO API वास्तव में बहुत समान है, एक बिंदु तक जहां अधिकांश कमांड्स को [कोडमोड](https://github.com/webdriverio/codemod) के माध्यम से स्वचालित तरीके से पुनः लिखा जा सकता है।

कोडमोड इंस्टॉल करने के लिए, चलाएँ:

```sh
npm install jscodeshift @wdio/codemod
```

## रणनीति

कई माइग्रेशन रणनीतियां हैं। आपकी टीम के आकार, टेस्ट फाइलों की संख्या और माइग्रेट करने की तात्कालिकता के आधार पर आप सभी टेस्ट को एक साथ या फाइल दर फाइल परिवर्तित करने का प्रयास कर सकते हैं। यह देखते हुए कि प्रोट्रैक्टर को Angular वर्जन 15 (2022 के अंत) तक बनाए रखा जाएगा, आपके पास अभी भी पर्याप्त समय है। आप प्रोट्रैक्टर और WebdriverIO टेस्ट एक साथ चला सकते हैं और WebdriverIO में नए टेस्ट लिखना शुरू कर सकते हैं। अपने समय बजट के अनुसार आप पहले महत्वपूर्ण टेस्ट केस माइग्रेट करना शुरू कर सकते हैं और फिर उन टेस्ट पर काम कर सकते हैं जिन्हें आप शायद हटा भी सकते हैं।

## पहले कॉन्फिग फाइल

कोडमोड इंस्टॉल करने के बाद हम पहली फाइल को परिवर्तित करना शुरू कर सकते हैं। पहले [WebdriverIO के कॉन्फिगरेशन विकल्पों](configuration) को देखें। कॉन्फिग फाइलें बहुत जटिल हो सकती हैं और यह समझदारी हो सकती है कि केवल आवश्यक भागों को पोर्ट किया जाए और देखें कि बाकी कैसे जोड़ा जा सकता है जब संबंधित टेस्ट जिन्हें कुछ विकल्पों की आवश्यकता होती है, माइग्रेट किए जाते हैं।

पहले माइग्रेशन के लिए हम केवल कॉन्फिग फाइल को परिवर्तित करते हैं और चलाते हैं:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./conf.ts
```

:::info

 आपके कॉन्फिग का नाम अलग हो सकता है, हालांकि सिद्धांत समान होना चाहिए: पहले कॉन्फिग को माइग्रेट करना शुरू करें।

:::

## WebdriverIO डिपेंडेंसीज इंस्टॉल करें

अगला कदम एक न्यूनतम WebdriverIO सेटअप को कॉन्फिगर करना है जिसे हम एक फ्रेमवर्क से दूसरे में माइग्रेट करते समय बनाना शुरू करते हैं। पहले हम WebdriverIO CLI को इंस्टॉल करते हैं:

```sh
npm install --save-dev @wdio/cli
```

फिर हम कॉन्फिगरेशन विज़ार्ड चलाते हैं:

```sh
npx wdio config
```

यह आपको कुछ प्रश्नों के माध्यम से ले जाएगा। इस माइग्रेशन परिदृश्य के लिए आप:
- डिफ़ॉल्ट विकल्प चुनें
- हम उदाहरण फाइलों को स्वचालित रूप से जेनरेट न करने की सिफारिश करते हैं
- WebdriverIO फाइलों के लिए एक अलग फोल्डर चुनें
- और Jasmine के बजाय Mocha चुनें।

:::info Mocha क्यों?
भले ही आप पहले Jasmine के साथ प्रोट्रैक्टर का उपयोग कर रहे हों, लेकिन Mocha बेहतर पुनः प्रयास तंत्र प्रदान करता है। विकल्प आपका है!
:::

छोटे प्रश्नावली के बाद विज़ार्ड सभी आवश्यक पैकेज इंस्टॉल करेगा और उन्हें आपके `package.json` में स्टोर करेगा।

## कॉन्फिगरेशन फाइल माइग्रेट करें

एक परिवर्तित `conf.ts` और एक नई `wdio.conf.ts` के बाद, अब एक कॉन्फिग से दूसरे में कॉन्फिगरेशन माइग्रेट करने का समय है। सुनिश्चित करें कि केवल वही कोड पोर्ट करें जो सभी टेस्ट के चलने के लिए आवश्यक है। हमारे में हम हुक फंक्शन और फ्रेमवर्क टाइमआउट को पोर्ट करते हैं।

हम अब केवल अपनी `wdio.conf.ts` फाइल के साथ जारी रखेंगे और इसलिए मूल प्रोट्रैक्टर कॉन्फिग में किसी भी बदलाव की आवश्यकता नहीं होगी। हम उन्हें वापस ला सकते हैं ताकि दोनों फ्रेमवर्क एक-दूसरे के बगल में चल सकें और हम एक समय में एक फाइल पोर्ट कर सकें।

## टेस्ट फाइल माइग्रेट करें

हम अब पहली टेस्ट फाइल को पोर्ट करने के लिए तैयार हैं। सरल शुरुआत के लिए, आइए ऐसी फाइल से शुरू करें जिसमें तीसरे पक्ष के पैकेज या PageObjects जैसी अन्य फाइलों पर बहुत अधिक निर्भरता न हो। हमारे उदाहरण में पहली फाइल जिसे माइग्रेट करना है वह है `first-test.spec.ts`। पहले उस डायरेक्टरी को बनाएं जहां नया WebdriverIO कॉन्फिगरेशन अपनी फाइलें अपेक्षित करता है और फिर इसे मूव करें:

```sh
mv mkdir -p ./test/specs/
mv test-suites/first-test.spec.ts ./test/specs
```

अब इस फाइल को ट्रांसफॉर्म करें:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./test/specs/first-test.spec.ts
```

बस इतना ही! यह फाइल इतनी सरल है कि हमें अब किसी अतिरिक्त परिवर्तन की आवश्यकता नहीं है और सीधे WebdriverIO को चलाने का प्रयास कर सकते हैं:

```sh
npx wdio run wdio.conf.ts
```

बधाई हो 🥳 आपने अभी पहली फाइल माइग्रेट की है!

## अगले कदम

इस बिंदु से आप टेस्ट दर टेस्ट और पेज ऑब्जेक्ट दर पेज ऑब्जेक्ट परिवर्तित करना जारी रखें। ऐसी संभावनाएं हैं कि कोडमोड कुछ फाइलों के लिए इस तरह की त्रुटि के साथ विफल हो जाएगा:

```
ERR /path/to/project/test/testdata/failing_submit.js Transformation error (Error transforming /test/testdata/failing_submit.js:2)
Error transforming /test/testdata/failing_submit.js:2

> login_form.submit()
  ^

The command "submit" is not supported in WebdriverIO. We advise to use the click command to click on the submit button instead. For more information on this configuration, see https://webdriver.io/docs/api/element/click.
  at /path/to/project/test/testdata/failing_submit.js:132:0
```

कुछ प्रोट्रैक्टर कमांड्स के लिए WebdriverIO में कोई प्रतिस्थापन नहीं है। इस मामले में कोडमोड आपको इसे रिफैक्टर करने के तरीके के बारे में कुछ सलाह देगा। यदि आप इस तरह के त्रुटि संदेशों पर बहुत अधिक बार पहुंचते हैं, तो बेझिझक [एक मुद्दा उठाएं](https://github.com/webdriverio/codemod/issues/new) और एक निश्चित परिवर्तन जोड़ने का अनुरोध करें। जबकि कोडमोड पहले से ही प्रोट्रैक्टर API के अधिकांश हिस्से को परिवर्तित करता है, वहां अभी भी सुधार के लिए बहुत गुंजाइश है।

## निष्कर्ष

हमें आशा है कि यह ट्यूटोरियल आपको WebdriverIO में माइग्रेशन प्रक्रिया के माध्यम से थोड़ा मार्गदर्शन करता है। समुदाय विभिन्न टीमों और विभिन्न संगठनों के साथ परीक्षण करते हुए कोडमोड में सुधार करना जारी रखता है। यदि आपके पास फीडबैक है तो [एक मुद्दा उठाने](https://github.com/webdriverio/codemod/issues/new) में संकोच न करें या यदि आप माइग्रेशन प्रक्रिया के दौरान संघर्ष करते हैं तो [चर्चा शुरू करें](https://github.com/webdriverio/codemod/discussions/new)।