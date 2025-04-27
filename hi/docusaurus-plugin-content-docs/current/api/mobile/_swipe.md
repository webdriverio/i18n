---
id: swipe
title: स्वाइप
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/swipe.ts
---

डेस्कटॉप/मोबाइल वेब <strong>और</strong> मोबाइल नेटिव ऐप्स के लिए व्यूपोर्ट या तत्व के भीतर किसी विशिष्ट दिशा में स्वाइप करें।

:::info

मोबाइल नेटिव ऐप्स के लिए स्वाइपिंग W3C-एक्शन्स प्रोटोकॉल पर आधारित है, जो उंगली के दबाव और आंदोलन का अनुकरण करता है।
यह Android के लिए [`mobile: scrollGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-scrollgesture) 
या iOS के लिए [`mobile: scroll`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-scroll) कमांड से अलग है जो Appium ड्राइवर प्रोटोकॉल पर आधारित है और 
केवल NATIVE संदर्भ में मोबाइल प्लेटफॉर्म के लिए उपलब्ध है।

यह कमांड केवल निम्नलिखित अप-टू-डेट कंपोनेंट्स के साथ काम करता है:
 - Appium सर्वर (वर्जन 2.0.0 या उच्चतर)
 - `appium-uiautomator2-driver` (Android के लिए)
 - `appium-xcuitest-driver` (iOS के लिए)

संगतता समस्याओं से बचने के लिए सुनिश्चित करें कि आपका स्थानीय या क्लाउड-आधारित Appium वातावरण नियमित रूप से अपडेट किया गया है।

:::

:::caution निर्देशांक पर आधारित स्वाइपिंग

जब तक बिल्कुल आवश्यक न हो, `from` और `to` विकल्पों का उपयोग करने से बचें। ये डिवाइस-विशिष्ट हैं और हो सकता है कि सभी डिवाइसों पर सुसंगत रूप से काम न करें।
किसी तत्व के भीतर विश्वसनीय स्वाइप के लिए `scrollableElement` विकल्प का उपयोग करें।

:::

##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>नाम</th><th>टाइप</th><th>विवरण</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`object, boolean`</td>
      <td>`browser.swipe()` के लिए विकल्प। डेस्कटॉप/मोबाइल वेब के लिए डिफॉल्ट: <br/> `{ direction: 'up', duration: 1500, percent: 0.95, scrollableElement: WebdriverIO.Element }`</td>
    </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`string`</td>
      <td>`down`, `up`, `left` या `right` में से एक हो सकता है, डिफॉल्ट `up` है। <br /><strong>केवल-मोबाइल-नेटिव-ऐप</strong></td>
    </tr>
    <tr>
                      <td colspan="3"><strong>नीचे (Down)</strong><br /><strong>प्रारंभिक बिंदु:</strong><br/>आप अपनी उंगली को स्क्रीन के शीर्ष की ओर रखते हैं।<br/><strong>आंदोलन:</strong><br/>आप अपनी उंगली को नीचे की ओर स्क्रीन के निचले हिस्से की तरफ स्लाइड करते हैं।<br/><strong>क्रिया:</strong><br/>यह संदर्भ के अनुसार भिन्न होता है:<br />- होम स्क्रीन पर या एप्लिकेशन में, यह आमतौर पर सामग्री को ऊपर की ओर स्क्रॉल करता है।<br />- शीर्ष किनारे से, यह अक्सर नोटिफिकेशन पैनल या त्वरित सेटिंग्स खोलता है।<br />- ब्राउज़र या पढ़ने वाले ऐप्स में, इसका उपयोग सामग्री के माध्यम से स्क्रॉल करने के लिए किया जा सकता है।</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>बाएँ (Left)</strong><br /><strong>प्रारंभिक बिंदु:</strong><br/>आप अपनी उंगली को स्क्रीन के दाईं ओर रखते हैं।<br/><strong>आंदोलन:</strong><br/>आप अपनी उंगली को क्षैतिज रूप से बाईं ओर स्लाइड करते हैं।><br/><strong>क्रिया:</strong><br/>इस जेस्चर के प्रति प्रतिक्रिया एप्लिकेशन पर निर्भर करती है:<br />- यह एक कैरोसेल या छवियों के सेट में अगले आइटम पर जा सकता है।<br />- नेविगेशन संदर्भ में, यह पिछले पृष्ठ पर वापस जा सकता है या वर्तमान दृश्य को बंद कर सकता है।<br />- होम स्क्रीन पर, यह आमतौर पर अगले वर्चुअल डेस्कटॉप या स्क्रीन पर स्विच करता है।</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>दाएँ (Right)</strong><br /><strong>प्रारंभिक बिंदु:</strong><br/>आप अपनी उंगली को स्क्रीन के बाईं ओर रखते हैं।<br/><strong>आंदोलन:</strong><br/>आप अपनी उंगली को क्षैतिज रूप से दाईं ओर स्लाइड करते हैं।<br/><strong>क्रिया:</strong><br/>बाएँ स्वाइप करने के समान, लेकिन विपरीत दिशा में:<br />-- यह अक्सर कैरोसेल या गैलरी में पिछले आइटम पर जाता है।<br />- ऐप्स में साइड मेनू या नेविगेशन ड्रॉअर खोलने के लिए इस्तेमाल किया जा सकता है।<br />- होम स्क्रीन पर, यह आमतौर पर पिछले वर्चुअल डेस्कटॉप पर स्विच करता है।</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>ऊपर (Up)</strong><br /><strong>प्रारंभिक बिंदु:</strong><br/>आप अपनी उंगली को स्क्रीन के निचले हिस्से की ओर रखते हैं।<br/><strong>आंदोलन:</strong><br/>आप अपनी उंगली को ऊपर की ओर स्क्रीन के शीर्ष की तरफ स्लाइड करते हैं।><br/><strong>क्रिया:</strong><br/>संदर्भ के आधार पर, विभिन्न क्रियाएँ हो सकती हैं:<br />- होम स्क्रीन पर या सूची में, यह आमतौर पर सामग्री को नीचे की ओर स्क्रॉल करता है।<br />- फुल-स्क्रीन ऐप में, यह अतिरिक्त विकल्प या ऐप ड्रॉअर खोल सकता है।<br />- कुछ इंटरफेस पर, यह एक 'रिफ्रेश' क्रिया को ट्रिगर कर सकता है या सर्च बार खोल सकता है।</td>
            </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`number`</td>
      <td>स्वाइप के लिए मिलीसेकंड में अवधि। डिफॉल्ट `1500` ms है। मान जितना कम होगा, स्वाइप उतना तेज होगा।</td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Element`</td>
      <td>वह तत्व जिसके भीतर स्वाइप करने के लिए उपयोग किया जाता है। यदि कोई तत्व प्रदान नहीं किया गया है तो यह iOS के लिए निम्न सेलेक्टर का उपयोग करेगा `-ios predicate string:type == "XCUIElementTypeApplication"` और Android के लिए निम्न का उपयोग करेगा `//android.widget.ScrollView'`। यदि डिफॉल्ट सेलेक्टर से अधिक तत्व मिलते हैं, तो डिफॉल्ट रूप से यह पहले मिलने वाले तत्व को चुनेगा। <br /> <strong>केवल-मोबाइल-नेटिव-ऐप</strong></td>
    </tr>
    <tr>
      <td><code><var>options.percent</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`number`</td>
      <td>स्वाइप करने के लिए (डिफॉल्ट) स्क्रॉलेबल तत्व का प्रतिशत। यह 0 और 1 के बीच का मान है। डिफॉल्ट `0.95` है।<br /><strong>कभी भी</strong> स्क्रीन के बिल्कुल शीर्ष|तल|बाएँ|दाएँ से स्वाइप न करें, आप उदाहरण के लिए नोटिफिकेशन बार या अन्य OS/ऐप सुविधाओं को ट्रिगर कर सकते हैं जिससे अप्रत्याशित परिणाम हो सकते हैं।<br />यदि `from` और `to` प्रदान किए गए हैं तो इसका कोई प्रभाव नहीं होता है।</td>
    </tr>
    <tr>
              <td colspan="3"><strong>नीचे दिए गए मान <strong>केवल</strong> तभी प्रभावी होते हैं जब `scrollableElement` <strong>प्रदान नहीं</strong> किया गया है, अन्यथा उन्हें नजरअंदाज कर दिया जाता है।</strong></td>
            </tr>
    <tr>
      <td><code><var>options.from</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`object`</td>
      <td>स्वाइप के शुरुआत के x और y निर्देशांक। यदि `scrollableElement` प्रदान किया गया है, तो इन निर्देशांकों का कोई प्रभाव नहीं होता है।</td>
    </tr>
    <tr>
      <td><code><var>options.from.x</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`number`</td>
      <td>स्वाइप के शुरुआत का x-निर्देशांक।</td>
    </tr>
    <tr>
      <td><code><var>options.from.y</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`number`</td>
      <td>स्वाइप के शुरुआत का y-निर्देशांक।</td>
    </tr>
    <tr>
      <td><code><var>options.to</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`object`</td>
      <td>स्वाइप के अंत के x और y निर्देशांक। यदि `scrollableElement` प्रदान किया गया है, तो इन निर्देशांकों का कोई प्रभाव नहीं होता है।</td>
    </tr>
    <tr>
      <td><code><var>options.to.x</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`number`</td>
      <td>स्वाइप के अंत का x-निर्देशांक।</td>
    </tr>
    <tr>
      <td><code><var>options.to.y</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`number`</td>
      <td>स्वाइप के अंत का y-निर्देशांक।</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="swipe.js"
it('should execute a default swipe', async () => {
    // Default will be a swipe from the bottom to the top, meaning it will swipe UP
    await browser.swipe();
});

```

```js title="swipe.with.options.js"
it('should execute a swipe with options', async () => {
    await browser.swipe({
        direction: 'left',                  // Swipe from right to left
        duration: 5000,                     // Last for 5 seconds
        percent: 0.5,                       // Swipe 50% of the scrollableElement
        scrollableElement: $('~carousel'),  // The element to swipe within
    })
});
```