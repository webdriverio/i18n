---
id: writing-tests
title: टेस्ट लिखना
description: "Flutter कॉन्टेक्स्ट पर स्विच करके और flutter_driver एक्सटेंशन के माध्यम से विजेट्स के साथ इंटरैक्ट करके Flutter ऐप्स के लिए WebdriverIO टेस्ट लिखें।"
---

यह सेक्शन स्वचालित टेस्ट परिदृश्य बनाने की व्यावहारिक संरचना को कवर करता है, और यह बताता है कि WebdriverIO का उपयोग करके Flutter के आंतरिक कंपोनेंट ट्री के साथ सीधे कैसे इंटरैक्ट करें।

### कॉन्टेक्स्ट स्विचिंग क्यों आवश्यक है?

Appium के साथ ऑटोमेशन सेशन शुरू करते समय, ड्राइवर ऑपरेटिंग सिस्टम के नेटिव कॉन्टेक्स्ट को मैप करके निष्पादन शुरू करता है, जिसे `NATIVE_APP` के रूप में जाना जाता है। यह कॉन्टेक्स्ट केवल एप्लिकेशन को घेरने वाले नेटिव शेल को देख सकता है (जैसे सिस्टम स्टेटस बार या नेटिव Android/iOS डायलॉग)।

चूंकि Flutter अपने यूज़र इंटरफ़ेस को एक पृथक Canvas के अंदर रेंडर करता है, इसलिए आंतरिक एलिमेंट्स `NATIVE_APP` कॉन्टेक्स्ट के भीतर अदृश्य होते हैं। Flutter के टेस्ट एक्सटेंशन (`flutter_driver`) को सीधे कमांड भेजने के लिए, हमें ऑटोमेशन फोकस को स्पष्ट रूप से `FLUTTER` कॉन्टेक्स्ट पर स्विच करना होगा। इस स्विच के बिना, किसी Widget को खोजने का कोई भी प्रयास element not found त्रुटि में परिणत होगा।

:::tip सर्वोत्तम अभ्यास: हमेशा `beforeEach` में कॉन्टेक्स्ट स्विच करें
हर टेस्ट फ़ाइल में `beforeEach` हुक में `await driver.switchContext('FLUTTER')` शामिल करना एक अनुशंसित सर्वोत्तम अभ्यास है। यह सुनिश्चित करता है कि हर टेस्ट `FLUTTER` कॉन्टेक्स्ट में निष्पादन शुरू करे, जिससे फ़्लेकीनेस या स्टेट लीकेज से बचा जा सके यदि किसी पिछले टेस्ट ने `NATIVE_APP` पर स्विच किया हो (उदाहरण के लिए, OS परमिशन डायलॉग को संभालने के लिए) या यदि कोई सेशन सक्रिय कॉन्टेक्स्ट को रीसेट कर दे।
:::

### `appium-flutter-finder` क्यों आवश्यक है?

पारंपरिक WebdriverIO सेलेक्टर्स, जैसे `$('~selector')` या `$('#id')`, वेब या मोबाइल नेटिव इंटरफ़ेस के लिए बनाई गई रणनीतियों (जैसे resource IDs या XPath) का उपयोग करके एलिमेंट्स खोजने के लिए डिज़ाइन किए गए हैं।

Flutter अपने स्वयं के आंतरिक एलिमेंट्स का प्रबंधन करता है और अपनी विशिष्ट खोज विधियों (जैसे `byValueKey`, `byText`, `byType`) का उपयोग करता है। `appium-flutter-finder` लाइब्रेरी आवश्यक है क्योंकि यह एक अनुवादक के रूप में कार्य करती है: यह इन Flutter-विशिष्ट लोकेटर रणनीतियों को एक सीरियलाइज़्ड फ़ॉर्मेट (Base64/JSON) में प्रस्तुत करती है जिसे `appium-flutter-driver` Dart Virtual Machine (VM) के अंदर समझ और निष्पादित कर सकता है।

### व्यावहारिक टेस्ट उदाहरण

हम विजेट्स को खोजने के लिए `appium-flutter-finder` का उपयोग करते हुए सामान्य परिदृश्यों का दस्तावेज़ीकरण करते हैं, जिन्हें `driver.execute('flutter:<command>')` के माध्यम से निष्पादित सीधे एक्सटेंशन कमांड्स के साथ जोड़ा गया है।

:::info Flutter Driver एक्सटेंशन कमांड्स और Finders
`appium-flutter-driver` Flutter एप्लिकेशन के साथ इंटरैक्ट करने के लिए विशेष कमांड्स प्रदान करता है, जिनमें शामिल हैं:
- `flutter:waitFor`: किसी विजेट के दिखाई देने तक प्रतीक्षा करता है।
- `flutter:waitForAbsent`: किसी विजेट के गायब होने तक प्रतीक्षा करता है।
- `flutter:scroll` / `flutter:scrollIntoView` / `flutter:scrollUntilVisible`: स्क्रॉल करने योग्य व्यूज़ के भीतर स्क्रॉलिंग को संभालता है।
- `flutter:setTextEntryEmulation`: टेक्स्ट इनपुट व्यवहार को कॉन्फ़िगर करता है।

उपलब्ध कमांड्स, पैरामीटर्स और रिटर्न टाइप्स की पूरी सूची के लिए, [Appium Flutter Driver Commands Documentation](https://github.com/appium/appium-flutter-driver#commands), [Node.js Finder source code](https://github.com/appium/appium-flutter-driver/tree/main/finder/nodejs), और [npm पर appium-flutter-finder](https://www.npmjs.com/package/appium-flutter-finder) देखें।
:::

### उदाहरण A — सरल इंटरैक्शन (Counter फ़्लो)

```typescript
// counter.spec.ts
import find from 'appium-flutter-finder';

describe('Flutter Counter Flow', () => {

    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    it('The counter should be successfully incremented by clicking the button.', async () => {
        const incrementButton = find.byTooltip('Increment');
        const counterText = find.byValueKey('counter_text');

        const initialValue = await driver.getElementText(counterText);
        expect(initialValue).toBe('0');

        await driver.elementClick(incrementButton);

        const finalValue = await driver.getElementText(counterText);
        expect(finalValue).toBe('1');
    });
});
```

### उदाहरण B — स्थिर नेविगेशन (Timeouts से बचना)

```typescript
// redirects.spec.ts
import find from 'appium-flutter-finder';

describe('Flutter Redirects Flow', () => {

    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    it('The user should be able to navigate between the Redirect Example views and back to the first view.', async () => {
        const buttonGoToRedirectExampleTwoView = find.byValueKey('redirect_example_two_button');
        await driver.elementClick(buttonGoToRedirectExampleTwoView);

        const redirectExampleTwoBody = find.byValueKey('redirect_example_two_body');
        await driver.execute('flutter:waitFor', redirectExampleTwoBody);
        const textRedirectExampleTwoBody = await driver.getElementText(redirectExampleTwoBody);
        expect(textRedirectExampleTwoBody).toBe('This is the Redirect Example Two View');

        const buttonGoBackToRedirectExampleView = find.byValueKey('redirect_example_two_back_button');
        await driver.elementClick(buttonGoBackToRedirectExampleView);

        const redirectExampleBody = find.byValueKey('redirect_example_body');
        await driver.execute('flutter:waitFor', redirectExampleBody);
        const textRedirectExampleBody = await driver.getElementText(redirectExampleBody);
        expect(textRedirectExampleBody).toBe('This is the Redirect Example View');
    });
});
```

### उदाहरण C — कॉन्टेक्स्ट स्विच करना (नेटिव OS डायलॉग और परमिशन)

```typescript
// native_dialog_context.spec.ts
import find from 'appium-flutter-finder';

describe('Flutter & Native Context Switching Flow', () => {
    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    it('The user should trigger a native dialog, interact with OS controls, and return to Flutter context.', async () => {
        // 1. FLUTTER कॉन्टेक्स्ट में: उस विजेट पर क्लिक करें जो OS-स्तरीय परमिशन या अलर्ट डायलॉग ट्रिगर करता है
        const buttonRequestPermission = find.byValueKey('request_permission_button');
        await driver.elementClick(buttonRequestPermission);

        // 2. OS डायलॉग के साथ इंटरैक्ट करने के लिए NATIVE_APP कॉन्टेक्स्ट पर स्विच करें
        await driver.switchContext('NATIVE_APP');

        // मानक WebdriverIO सेलेक्टर्स का उपयोग करके नेटिव बटन खोजें और क्लिक करें
        const nativeAllowButton = await $('//*[@text="Allow" or @text="While using the app" or @label="Allow"]');
        await nativeAllowButton.waitForDisplayed();
        await nativeAllowButton.click();

        // 3. Flutter विजेट्स की जाँच जारी रखने के लिए वापस FLUTTER कॉन्टेक्स्ट पर स्विच करें
        await driver.switchContext('FLUTTER');

        const permissionStatusText = find.byValueKey('permission_status_text');
        await driver.execute('flutter:waitFor', permissionStatusText);
        const status = await driver.getElementText(permissionStatusText);
        expect(status).toBe('Permission Granted');
    });
});
```

## बिल्ड और निष्पादन फ़्लो

यह सुनिश्चित करने के लिए कि आपके हाल के Dart कोड और Key परिवर्तन टेस्ट्स को दिखाई दें, हमेशा इन चरणों का पालन करें:

```bash
flutter build apk -t lib/main_e2e.dart --debug
npx wdio run wdio.conf.ts
```

आप रिपॉज़िटरी में कोड उदाहरण देख सकते हैं: https://github.com/webdriverio/appium-boilerplate