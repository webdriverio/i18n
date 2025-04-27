---
id: reloadSession
title: reloadSession (सेशन रिलोड करें)
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/reloadSession.ts
---

आपकी वर्तमान क्षमताओं के साथ एक नया सेलेनियम सेशन बनाता है। यह उपयोगी है अगर आप
ऐसे अत्यधिक स्टेटफुल एप्लिकेशन का परीक्षण करते हैं जहां आपको अपने स्पेक फ़ाइल में परीक्षणों के बीच ब्राउज़र सेशन को साफ़ करने की आवश्यकता होती है ताकि WDIO के साथ सैकड़ों एकल परीक्षण फ़ाइलें बनाने से बचा जा सके।
हालांकि सावधान रहें, यह कमांड आपके परीक्षण समय को बहुत प्रभावित करती है क्योंकि नए सेलेनियम सेशन शुरू करना बहुत समय लेने वाला होता है, विशेष रूप से क्लाउड सेवाओं का उपयोग करते समय।

होस्टनेम, पोर्ट, प्रोटोकॉल, आदि जैसे कनेक्शन पैरामीटर को browserName के साथ जोड़ा जा सकता है जब आप किसी अलग रिमोट सेवा से जुड़ना चाहते हैं। यह एक ऐसी स्थिति में उपयोगी है, उदाहरण के लिए, जहां आप नेटिव ऐप में परीक्षण शुरू करते हैं और वेब ऐप में डेटा को सत्यापित करने की आवश्यकता होती है।

अगर आप रिमोट सेवा से शुरू करते हैं, तो आप होस्टनेम के लिए 0.0.0.0 पास कर सकते हैं अगर आप लोकल ड्राइवर्स पर स्विच करना चाहते हैं।

##### उपयोग

```js
browser.reloadSession(newCapabilities)
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
      <td><code><var>newCapabilities</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`WebdriverIO.Capabilities`</td>
      <td>सेशन बनाने के लिए नई क्षमताएँ</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="reloadSync.js"
it('should reload my session with current capabilities', async () => {
    console.log(browser.sessionId) // outputs: e042b3f3cd5a479da4e171825e96e655
    await browser.reloadSession()
    console.log(browser.sessionId) // outputs: 9a0d9bf9d4864160aa982c50cf18a573
})

it('should reload my session with new capabilities', async () => {
    console.log(browser.capabilities.browserName) // outputs: chrome
    await browser.reloadSession({
        browserName: 'firefox'
    })
    console.log(browser.capabilities.browserName) // outputs: firefox
})

it('should reload my session with new remote', async () => {
    console.log(browser.capabilities.browserName) // outputs: chrome
    await browser.reloadSession({
        protocol: 'https',
        host: '0.0.0.1',
        port: 4444,
        path: '/wd/hub',
        browserName: 'firefox'
    })
    console.log(browser.capabilities.browserName) // outputs: firefox
})
```