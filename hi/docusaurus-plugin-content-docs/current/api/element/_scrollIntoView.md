---
id: scrollIntoView
title: scrollIntoView
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/scrollIntoView.ts
---

डेस्कटॉप/मोबाइल वेब <strong>और</strong> मोबाइल नेटिव ऐप्स के लिए तत्व को व्यूपोर्ट में स्क्रॉल करें।

:::info

मोबाइल नेटिव ऐप्स के लिए स्क्रॉलिंग मोबाइल `swipe` कमांड के आधार पर की जाती है।

:::

##### उपयोग

```js
$(selector).scrollIntoView({ behavior, block, inline, direction, maxScrolls, duration, scrollableElement, percent })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`object, boolean`</td>
      <td>`Element.scrollIntoView()` के लिए विकल्प। डेस्कटॉप/मोबाइल वेब के लिए डिफ़ॉल्ट: <br/> `{ block: 'start', inline: 'nearest' }` <br /> मोबाइल नेटिव ऐप के लिए डिफ़ॉल्ट <br /> `{ maxScrolls: 10, scrollDirection: 'down' }`</td>
    </tr>
    <tr>
              <td colspan="3"><strong>केवल डेस्कटॉप/मोबाइल वेब</strong></td>
            </tr>
    <tr>
      <td><code><var>options.behavior</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`string`</td>
      <td>देखें [MDN संदर्भ](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)। <br /><strong>केवल-वेब</strong> (डेस्कटॉप/मोबाइल)</td>
    </tr>
    <tr>
      <td><code><var>options.block</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`string`</td>
      <td>देखें [MDN संदर्भ](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)। <br /><strong>केवल-वेब</strong> (डेस्कटॉप/मोबाइल)</td>
    </tr>
    <tr>
      <td><code><var>options.inline</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`string`</td>
      <td>देखें [MDN संदर्भ](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)। <br /><strong>केवल-वेब</strong> (डेस्कटॉप/मोबाइल)</td>
    </tr>
    <tr>
              <td colspan="3"><strong>केवल मोबाइल नेटिव ऐप</strong></td>
            </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`string`</td>
      <td>`down`, `up`, `left` या `right` में से एक हो सकता है, डिफ़ॉल्ट `up` है। <br /><strong>केवल-मोबाइल-नेटिव-ऐप</strong></td>
    </tr>
    <tr>
      <td><code><var>options.maxScrolls</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`number`</td>
      <td>स्क्रॉल्स की अधिकतम संख्या जब तक यह तत्व की खोज बंद कर देगा, डिफ़ॉल्ट `10` है। <br /><strong>केवल-मोबाइल-नेटिव-ऐप</strong></td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`number`</td>
      <td>स्वाइप के लिए मिलीसेकंड में अवधि। डिफ़ॉल्ट `1500` ms है। मान जितना कम होगा, स्वाइप उतना ही तेज़ होगा।<br /><strong>केवल-मोबाइल-नेटिव-ऐप</strong></td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Element`</td>
      <td>वह तत्व जिसके भीतर स्क्रॉल करने के लिए उपयोग किया जाता है। यदि कोई तत्व प्रदान नहीं किया गया है तो यह iOS के लिए निम्न सेलेक्टर का उपयोग करेगा `-ios predicate string:type == "XCUIElementTypeApplication"` और Android के लिए निम्न `//android.widget.ScrollView'`। यदि डिफ़ॉल्ट सेलेक्टर से अधिक तत्व मेल खाते हैं, तो डिफ़ॉल्ट रूप से यह पहले मेल खाने वाले तत्व को चुनेगा। <br /> <strong>केवल-मोबाइल-नेटिव-ऐप</strong></td>
    </tr>
    <tr>
      <td><code><var>options.percent</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`number`</td>
      <td>स्वाइप करने के लिए (डिफ़ॉल्ट) स्क्रॉल योग्य तत्व का प्रतिशत। यह 0 और 1 के बीच का मान है। डिफ़ॉल्ट `0.95` है।<br /><strong>कभी भी</strong> स्क्रीन के बिल्कुल ऊपर|नीचे|बाएँ|दाएँ से स्वाइप न करें, आप उदाहरण के लिए नोटिफिकेशन बार या अन्य OS/ऐप सुविधाओं को ट्रिगर कर सकते हैं जिससे अप्रत्याशित परिणाम हो सकते हैं।<br /> <strong>केवल-मोबाइल-नेटिव-ऐप</strong></td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="desktop.mobile.web.scrollIntoView.js"
it('should demonstrate the desktop/mobile web scrollIntoView command', async () => {
    const elem = await $('#myElement');
    // scroll to specific element
    await elem.scrollIntoView();
    // center element within the viewport
    await elem.scrollIntoView({ block: 'center', inline: 'center' });
});

```

```js title="mobile.native.app.scrollIntoView.js"
it('should demonstrate the mobile native app scrollIntoView command', async () => {
    const elem = await $('#myElement');
    // scroll to a specific element in the default scrollable element for Android or iOS for a maximum of 10 scrolls
    await elem.scrollIntoView();
    // Scroll to the left in the scrollable element called '#scrollable' for a maximum of 5 scrolls
    await elem.scrollIntoView({
        direction: 'left',
        maxScrolls: 5,
        scrollableElement: $('#scrollable')
    });
});
```