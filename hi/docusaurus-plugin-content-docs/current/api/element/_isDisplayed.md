---
id: isDisplayed
title: isDisplayed (प्रदर्शित है)
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isDisplayed.ts
---

चयनित DOM-एलिमेंट प्रदर्शित होने पर true वापस करता है (यहां तक कि जब एलिमेंट व्यूपोर्ट के बाहर हो)। यह निर्धारित करने के लिए ब्राउज़र द्वारा प्रदान किए गए [`checkVisibility`](https://developer.mozilla.org/en-US/docs/Web/API/Element/checkVisibility#visibilityproperty) विधि का उपयोग करता है कि कोई एलिमेंट प्रदर्शित हो रहा है या नहीं। चूंकि WebdriverIO एक वास्तविक उपयोगकर्ता के रूप में कार्य करता है, `contentVisibilityAuto`, `opacityProperty`, और `visibilityProperty` फ्लैग्स के लिए डिफ़ॉल्ट मान अधिक सख्त व्यवहार के लिए `true` पर सेट होते हैं। इसका मतलब है कि कमांड यह जांच करेगा कि एलिमेंट अपने `content-visibility`, `opacity`, और `visibility` गुणों के मान के कारण दिखाई दे रहा है या नहीं।

यदि आप यह भी सत्यापित करना चाहते हैं कि एलिमेंट व्यूपोर्ट के भीतर भी है, तो कमांड को `withinViewport` फ्लैग प्रदान करें।

:::info

अन्य एलिमेंट कमांड के विपरीत WebdriverIO इस कमांड को निष्पादित करने के लिए
एलिमेंट के मौजूद होने की प्रतीक्षा नहीं करेगा।

:::

WebdriverIO, ब्राउज़र परीक्षण करते समय, एक [कस्टम स्क्रिप्ट](https://github.com/webdriverio/webdriverio/blob/59d349ca847950354d02b9e548f60cc50e7871f0/packages/webdriverio/src/scripts/isElementDisplayed.ts) का उपयोग करता है जो विशेष रूप से एलिमेंट्स की दृश्यता का आकलन करने के लिए डिज़ाइन किया गया है। यह स्क्रिप्ट यह निर्धारित करने में महत्वपूर्ण है कि क्या कोई एलिमेंट पेज पर प्रदर्शित है। इसके विपरीत, Appium के साथ नेटिव मोबाइल परीक्षण परिदृश्यों के लिए, WebdriverIO Appium द्वारा प्रदान किए गए [`isElementDisplayed`](https://appium.io/docs/en/2.1/reference/interfaces/appium_types.ExternalDriver/#elementdisplayed) कमांड पर निर्भर करता है। यह कमांड अंतर्निहित Appium ड्राइवर द्वारा स्थापित मानदंडों का उपयोग करके एलिमेंट्स की दृश्यता का मूल्यांकन करता है, जिससे मोबाइल एप्लिकेशन के लिए सटीक और ड्राइवर-विशिष्ट आकलन सुनिश्चित होता है।

##### उपयोग

```js
$(selector).isDisplayed(withinViewport, contentVisibilityAuto, opacityProperty, visibilityProperty)
```

##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>नाम</th><th>प्रकार</th><th>विवरण</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>withinViewport=false</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Boolean`</td>
      <td>यह जांचने के लिए `true` कि एलिमेंट व्यूपोर्ट के भीतर है। डिफ़ॉल्ट रूप से `false`।</td>
    </tr>
    <tr>
      <td><code><var>contentVisibilityAuto=true</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Boolean`</td>
      <td>यह जांचने के लिए `true` कि एलिमेंट का content-visibility गुण (या विरासत में मिला हुआ) मान auto है, और वर्तमान में यह अपनी रेंडरिंग को छोड़ रहा है। डिफ़ॉल्ट रूप से `true`।</td>
    </tr>
    <tr>
      <td><code><var>opacityProperty=true</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Boolean`</td>
      <td>यह जांचने के लिए `true` कि एलिमेंट के opacity गुण (या विरासत में मिला हुआ) का मान 0 है। डिफ़ॉल्ट रूप से `true`।</td>
    </tr>
    <tr>
      <td><code><var>visibilityProperty=true</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Boolean`</td>
      <td>यह जांचने के लिए `true` कि एलिमेंट अपने visibility गुण के मान के कारण अदृश्य है। डिफ़ॉल्ट रूप से `true`।</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```html title="index.html"
<div id="noSize"></div>
<div id="noSizeWithContent">Hello World!</div>
<div id="notDisplayed" style="width: 10px; height: 10px; display: none"></div>
<div id="notVisible" style="width: 10px; height: 10px; visibility: hidden"></div>
<div id="zeroOpacity" style="width: 10px; height: 10px; opacity: 0"></div>
<div id="notInViewport" style="width: 10px; height: 10px; position:fixed; top: 999999; left: 999999"></div>
```

```js title="isDisplayed.js"
it('should detect if an element is displayed', async () => {
    elem = await $('#notExisting');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    let elem = await $('#noSize');
    let isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    let elem = await $('#noSizeWithContent');
    let isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: true

    let elem = await $('#notDisplayed');
    let isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    elem = await $('#notVisible');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    elem = await $('#zeroOpacity');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    elem = await $('#notInViewport');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: true
});
isDisplayedWithinViewport.js
it('should detect if an element is visible within the viewport', async () => {
    let isDisplayedInViewport = await $('#notDisplayed').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#notVisible').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#notExisting').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#notInViewport').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#zeroOpacity').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false
});
```

##### रिटर्न्स

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  यदि एलिमेंट प्रदर्शित होता है तो true