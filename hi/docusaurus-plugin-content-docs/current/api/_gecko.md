---
id: gecko
title: फ़ायरफ़ॉक्स
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/gecko.ts
---

## fullPageScreenshot
पूरे पेज का स्क्रीनशॉट कैप्चर करता है।<br /><br />फ़ायरफ़ॉक्स कमांड। अधिक विवरण [आधिकारिक प्रोटोकॉल दस्तावेज़ों](https://phabricator.services.mozilla.com/source/mozilla-central/browse/default/testing/geckodriver/src/command.rs$43-46) में पाया जा सकता है।

##### उपयोग

```js
browser.fullPageScreenshot()
```


##### रिटर्न

- **&lt;String&gt;**
            **<code><var>screenshot</var></code>:** पूरे पेज के स्क्रीनशॉट को शामिल करने वाला base64-एन्कोडेड PNG इमेज डेटा।


---

## getMozContext
वर्तमान में प्रभावी संदर्भ प्राप्त करें, जैसे `CHROME` या `CONTENT`।<br /><br />फ़ायरफ़ॉक्स कमांड। अधिक विवरण [आधिकारिक प्रोटोकॉल दस्तावेज़ों](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L615-L622) में पाया जा सकता है।

##### उपयोग

```js
browser.getMozContext()
```

##### उदाहरण


```js
console.log(await browser.getMozContext()); // outputs: 'CHROME'
```


##### रिटर्न

- **&lt;String&gt;**
            **<code><var>Context</var></code>:** ब्राउज़र संदर्भ, या तो `CHROME` या `CONTENT`


---

## setMozContext
क्रोम और कंटेंट के बीच कमांड के लिए लक्ष्य संदर्भ बदलता है।<br /><br />वर्तमान संदर्भ बदलने का सभी बाद के कमांड पर स्थिति प्रभाव पड़ता है। `CONTENT` संदर्भ में सामान्य वेब प्लेटफॉर्म दस्तावेज़ अनुमतियां होती हैं, जैसे कि आप मनमाना जावास्क्रिप्ट मूल्यांकन करेंगे। `CHROME` संदर्भ को उन्नत अनुमतियां मिलती हैं जो आपको ब्राउज़र क्रोम को खुद से हेरफेर करने देती हैं, XUL टूलकिट तक पूर्ण पहुंच के साथ।<br /><br />फ़ायरफ़ॉक्स कमांड। अधिक विवरण [आधिकारिक प्रोटोकॉल दस्तावेज़ों](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L615-L645) में पाया जा सकता है।

##### उपयोग

```js
browser.setMozContext(context)
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
      <td><code><var>context</var></code></td>
      <td>string</td>
      <td>ब्राउज़र संदर्भ, या तो `CHROME` या `CONTENT`</td>
    </tr>
  </tbody>
</table>

##### उदाहरण


```js
console.log(await browser.getMozContext()); // outputs: 'CHROME'
browser.setMozContext('CONTENT');
console.log(await browser.getMozContext()); // outputs: 'CONTENT'
```



---

## installAddOn
वर्तमान सत्र के साथ एक नया एडऑन स्थापित करता है। यह फ़ंक्शन एक ID वापस करेगा जिसे बाद में `uninstallAddon` का उपयोग करके एडऑन को अनइंस्टॉल करने के लिए उपयोग किया जा सकता है।<br /><br />फ़ायरफ़ॉक्स कमांड। अधिक विवरण [आधिकारिक प्रोटोकॉल दस्तावेज़ों](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L647-L668) में पाया जा सकता है।

##### उपयोग

```js
browser.installAddOn(addon, temporary)
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
      <td><code><var>addon</var></code></td>
      <td>string</td>
      <td>एड ऑन फ़ाइल का base64 स्ट्रिंग</td>
    </tr>
    <tr>
      <td><code><var>temporary</var></code></td>
      <td>boolean</td>
      <td>अस्थायी फ्लैग जो यह इंगित करता है कि एक्सटेंशन को अस्थायी रूप से स्थापित किया जाना चाहिए - रीस्टार्ट पर हटा दिया जाता है</td>
    </tr>
  </tbody>
</table>

##### उदाहरण


```js
// Create a buffer of the add on .zip file
const extension = await fs.promises.readFile('/path/to/extension.zip')
// Load extension in Firefox
const id = await browser.installAddOn(extension.toString('base64'), false);
```


##### रिटर्न

- **&lt;String&gt;**
            **<code><var>id</var></code>:** एक प्रॉमिस जो नव स्थापित एडऑन के लिए एक ID में हल होगा।


---

## uninstallAddOn
वर्तमान ब्राउज़र सत्र की प्रोफ़ाइल से एक एडऑन अनइंस्टॉल करता है।<br /><br />फ़ायरफ़ॉक्स कमांड। अधिक विवरण [आधिकारिक प्रोटोकॉल दस्तावेज़ों](https://github.com/SeleniumHQ/selenium/blob/586affe0cf675b1d5c8abc756defa4a46d95391b/javascript/node/selenium-webdriver/firefox.js#L670-L687) में पाया जा सकता है।

##### उपयोग

```js
browser.uninstallAddOn(id)
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
      <td><code><var>id</var></code></td>
      <td>string</td>
      <td>अनइंस्टॉल करने के लिए एडऑन का id ID</td>
    </tr>
  </tbody>
</table>

##### उदाहरण


```js
// Create a buffer of the add on .zip file
const extension = await fs.promises.readFile('/path/to/extension.zip')
// Load extension in Firefox
const id = await browser.installAddOn(extension.toString('base64'), false);
// ...
await browser.uninstallAddOn(id)
```