---
id: action
title: एक्शन
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/action.ts
---

एक्शन कमांड वेब ब्राउज़र को वर्चुअलाइज्ड डिवाइस इनपुट क्रियाएँ प्रदान करने के लिए एक निम्न-स्तरीय इंटरफेस है।

`scrollIntoView`, `doubleClick` जैसे उच्च स्तरीय कमांड्स के अलावा, एक्शन्स API नामित इनपुट डिवाइसेज़ के सटीक नियंत्रण का विस्तृत विकल्प प्रदान करता है। WebdriverIO 3 प्रकार के इनपुट सोर्सेज के लिए इंटरफेस प्रदान करता है:

- कीबोर्ड डिवाइसेज के लिए की इनपुट
- माउस, पेन या टच डिवाइसेज के लिए पॉइंटर इनपुट
- और स्क्रॉल व्हील डिवाइसेज के लिए व्हील इनपुट

एक्शन कमांड्स की हर श्रृंखला को क्रियाओं को ट्रिगर करने के लिए `perform` कॉल करके पूरा किया जाना चाहिए। इससे एक्शन्स [रिलीज़ हो जाते हैं](https://w3c.github.io/webdriver/#release-actions) और इवेंट्स फायर होते हैं। आप `true` पास करके इसे स्किप कर सकते हैं (जैसे `browser.actions(...).perform(true)`)।

:::info

इस कमांड और विशिष्ट क्रियाओं के लिए समर्थन वातावरण के आधार पर भिन्न हो सकता है। विकास की प्रगति पर [wpt.fyi](https://wpt.fyi/results/webdriver/tests/perform_actions?label=experimental&label=master&aligned) पर नज़र रखी जा सकती है।
मोबाइल के लिए आप [iOS](https://github.com/appium/appium-xcuitest-driver#mobile-pinch) और [Android](https://github.com/appium/appium-uiautomator2-driver#mobile-gesture-commands) पर Appium विशिष्ट जेश्चर कमांड्स का उपयोग करना चाह सकते हैं।

:::

### की इनपुट सोर्स

की इनपुट सोर्स एक इनपुट सोर्स है जो कीबोर्ड-प्रकार के डिवाइस से जुड़ा हुआ है। इसे `key` टाइप पैरामीटर का उपयोग करके ट्रिगर किया जा सकता है। उदाहरण के लिए:

```ts
browser.action('key')
```

यह एक `KeyAction` ऑब्जेक्ट रिटर्न करता है जो निम्नलिखित क्रियाओं का समर्थन करता है:

- `down(value: string)`: की डाउन एक्शन जनरेट करता है
- `up(value: string)`: की अप एक्शन जनरेट करता है
- `pause(ms: number)`: इंगित करता है कि एक इनपुट सोर्स एक विशेष टिक के दौरान कुछ नहीं करता है

#### विशेष अक्षर

अगर आप विशेष अक्षरों जैसे `Control`, `Page Up` या `Shift` का उपयोग करना चाहते हैं, तो सुनिश्चित करें कि आप `webdriverio` पैकेज से [`Key`](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/constants.ts#L352-L417) ऑब्जेक्ट को इम्पोर्ट करें:

```ts
import { Key } from 'webdriverio'
```

यह ऑब्जेक्ट आपको वांछित विशेष अक्षर के यूनिकोड प्रतिनिधित्व तक पहुंचने की अनुमति देता है।

### पॉइंटर इनपुट सोर्स

पॉइंटर इनपुट सोर्स एक इनपुट सोर्स है जो पॉइंटर-प्रकार के इनपुट डिवाइस से जुड़ा हुआ है। `action` कमांड का उपयोग करते समय प्रकार निर्दिष्ट किया जा सकता है, उदाहरण के लिए:

```ts
browser.action('pointer', {
    parameters: { pointerType: 'mouse' } // "mouse" डिफॉल्ट वैल्यू है, "pen" या "touch" भी संभव है
})
```

यह एक `PointerAction` ऑब्जेक्ट रिटर्न करता है जो निम्नलिखित क्रियाओं का समर्थन करता है:

- `down (button: 'left' | 'middle' | 'right')`: एक बटन दबाने के लिए एक्शन बनाता है
- `down (params: PointerActionParams)`: विस्तृत पैरामीटर्स के साथ एक बटन दबाने के लिए एक्शन बनाता है
- `move (x: number, y: number)`: व्यूपोर्ट से `x` और `y` पिक्सेल दूर पॉइंटर को मूव करने के लिए एक्शन बनाता है
- `move (params: PointerActionMoveParams)`: निर्दिष्ट `origin` से `x` और `y` पिक्सेल दूर पॉइंटर को मूव करने के लिए एक्शन बनाता है। `origin` पॉइंटर की वर्तमान स्थिति (जैसे "pointer"), व्यूपोर्ट (जैसे "viewport") या विशिष्ट एलिमेंट के केंद्र के रूप में परिभाषित किया जा सकता है।
- `up (button: 'left' | 'middle' | 'right')`: एक बटन छोड़ने के लिए एक्शन बनाता है
- `up (params: PointerActionUpParams)`: विस्तृत पैरामीटर्स के साथ एक बटन छोड़ने के लिए एक्शन बनाता है
- `cancel()`: इस पॉइंटर के वर्तमान इनपुट को रद्द करने वाला एक्शन।
- `pause(ms: number)`: इंगित करता है कि एक इनपुट सोर्स एक विशेष टिक के दौरान कुछ नहीं करता है

आप [`PointerActionParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L20-L35), [`PointerActionMoveParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L20-L42) और [`PointerActionUpParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L13-L19) पैरामीटर प्रकारों पर विस्तृत जानकारी प्रोजेक्ट टाइप डेफिनिशन में पा सकते हैं।

### व्हील इनपुट सोर्स

व्हील इनपुट सोर्स एक इनपुट सोर्स है जो व्हील-प्रकार के इनपुट डिवाइस से जुड़ा हुआ है।

```ts
browser.action('wheel')
```

यह एक `WheelAction` ऑब्जेक्ट रिटर्न करता है जो निम्नलिखित क्रियाओं का समर्थन करता है:

- `scroll (params: ScrollParams)`: दिए गए कोऑर्डिनेट्स या ओरिजिन पर पेज को स्क्रॉल करता है
- `pause(ms: number)`: इंगित करता है कि एक इनपुट सोर्स एक विशेष टिक के दौरान कुछ नहीं करता है

आप [`ScrollParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/wheel.ts#L4-L29) पैरामीटर प्रकार पर विस्तृत जानकारी प्रोजेक्ट टाइप डेफिनिशन में पा सकते हैं।

##### उपयोग

```js
browser.action()
```

##### उदाहरण

```js title="pointer-action.js"
it('drag and drop using pointer action command', async () => {
    const origin = await $('#source')
    const targetOrigin = await $('#target')

    return browser.action('pointer')
        .move({ duration: 0, origin, x: 0, y: 0 })
        .down({ button: 0 }) // left button
        .pause(10)
        .move({ duration: 0, origin: targetOrigin })
        .up({ button: 0 })
        .perform()
});
```

```js title="key-action.js"
import { Key } from 'webdriverio'

it('should emit key events using key action commands', async () => {
    const elem = await $('input')
    await elem.click() // make element active

    await browser.action('key')
        .down('f')
        .down('o')
        .down('o')
        .up('f')
        .up('o')
        .up('o')
        .perform()

    console.log(await elem.getValue()) // returns "foo"

    // copy value out of input element
    await browser.action('key')
        .down(Key.Ctrl).down('c')
        .pause(10)
        .up(Key.Ctrl).up('c')
        .perform()
})
```

```js title="wheel-action.js"
it('should scroll using wheel action commands', async () => {
    console.log(await browser.execute(() => window.scrollY)) // returns 0
    await browser.action('wheel').scroll({
        deltaX: 0,
        deltaY: 500,
        duration: 200
    }).perform()
    console.log(await browser.execute(() => window.scrollY)) // returns 500
})
```