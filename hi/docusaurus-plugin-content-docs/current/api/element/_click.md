---
id: click
title: क्लिक
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/click.ts
---

किसी एलिमेंट पर क्लिक करें।

यह चयनित एलिमेंट के लिए WebDriver `click` कमांड जारी करता है, जो आमतौर पर कोई विकल्प पास नहीं किए जाने पर चयनित एलिमेंट तक स्क्रॉल करता है और फिर उस पर क्लिक करता है। जब options ऑब्जेक्ट पास किया जाता है, तो यह वेबड्राइवर क्लिक के बजाय एक्शन क्लास का उपयोग करता है, जो बटन प्रकार, कोऑर्डिनेट्स आदि जैसी अतिरिक्त क्षमताएं प्रदान करता है। डिफॉल्ट रूप से, विकल्पों का उपयोग करते समय, क्लिक क्रिया करने के बाद एक रिलीज़ एक्शन कमांड भेजा जाता है, इस क्रिया को छोड़ने के लिए `option.skipRelease=true` पास करें।

:::info

यदि आपके पास फिक्स्ड-पोजिशन एलिमेंट्स हैं (जैसे फिक्स्ड हेडर या फुटर) जो व्यूपोर्ट के भीतर स्क्रॉल किए जाने के बाद चयनित एलिमेंट को ढक देते हैं, तो क्लिक दिए गए कोऑर्डिनेट्स पर जारी किया जाएगा, लेकिन इसे आपके फिक्स्ड (ओवरलेइंग) एलिमेंट द्वारा प्राप्त किया जाएगा। इन मामलों में निम्न त्रुटि फेंकी जाती है:

```
Element is not clickable at point (x, x). Other element would receive the click: ..."
```

इससे बचने के लिए, ओवरलेइंग एलिमेंट को खोजने का प्रयास करें और इसे `execute` कमांड के माध्यम से हटा दें ताकि यह क्लिक में हस्तक्षेप न करे। आप अपने परिदृश्य के लिए उपयुक्त ऑफसेट के साथ `scroll` का उपयोग करके एलिमेंट तक स्वयं स्क्रॉल करने का प्रयास भी कर सकते हैं।

:::

:::info

क्लिक कमांड का उपयोग मोबाइल डिवाइस पर लॉन्ग प्रेस सिमुलेट करने के लिए भी किया जा सकता है। यह `duration` सेट करके किया जाता है। अधिक जानकारी के लिए नीचे दिए गए उदाहरण देखें।

:::

##### उपयोग

```js
$(selector).click({ button, x, y, skipRelease, duration })
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
      <td>`ClickOptions`</td>
      <td>क्लिक विकल्प (वैकल्पिक)</td>
    </tr>
    <tr>
      <td><code><var>options.button</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`string, number`</td>
      <td>इनमें से एक हो सकता है `[0, "left", 1, "middle", 2, "right"]` <br /><strong>केवल-वेब</strong> (डेस्कटॉप/मोबाइल)</td>
    </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`number`</td>
      <td>एलिमेंट के स्थान से X क्षैतिज पिक्सेल दूर क्लिक करता है (एलिमेंट के केंद्र बिंदु से)<br /><strong>वेब और नेटिव</strong> (डेस्कटॉप/मोबाइल)</td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`number`</td>
      <td>एलिमेंट के स्थान से Y ऊर्ध्वाधर पिक्सेल दूर क्लिक करता है (एलिमेंट के केंद्र बिंदु से)<br /><strong>वेब और नेटिव समर्थन</strong> (डेस्कटॉप/मोबाइल)</td>
    </tr>
    <tr>
      <td><code><var>options.skipRelease</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`boolean`</td>
      <td>बूलियन (वैकल्पिक) <br /><strong>केवल-वेब</strong> (डेस्कटॉप/मोबाइल)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`number`</td>
      <td>क्लिक की अवधि, यानी "लॉन्गप्रेस" <br /><strong>केवल-मोबाइल-नेटिव-एप्प</strong> (मोबाइल)</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```html title="example.html"
<button id="myButton" onclick="document.getElementById('someText').innerHTML='I was clicked'">Click me</button>
<div id="someText">I was not clicked</div>
```

```js title="click.js"
it('should demonstrate the click command', async () => {
    const myButton = await $('#myButton')
    await myButton.click()
    const myText = await $('#someText')
    const text = await myText.getText()
    assert(text === 'I was clicked') // true
})
```

```js title="example.js"
it('should fetch menu links and visit each page', async () => {
    const links = await $$('#menu a')
    await links.forEach(async (link) => {
        await link.click()
    })
})

```

```html title="example.html"
<button id="myButton">Click me</button>
```

```js title="example.js"
it('should demonstrate a click using an offset', async () => {
    const myButton = await $('#myButton')
    await myButton.click({ x: 30 }) // clicks 30 horizontal pixels away from location of the button (from center point of element)
})

```

```html title="example.html"
<button id="myButton">Click me</button>
```

```js title="example.js"
it('should demonstrate a right click passed as string', async () => {
    const myButton = await $('#myButton')
    await myButton.click({ button: 'right' }) // opens the contextmenu at the location of the button
})
it('should demonstrate a right click passed as number while adding an offset', async () => {
    const myButton = await $('#myButton')
    await myButton.click({ button: 2, x: 30, y: 40 }) // opens the contextmenu 30 horizontal and 40 vertical pixels away from location of the button (from the center of element)
})
it('should skip sending releaseAction command that cause unexpected alert closure', async () => {
    const myButton = await $('#myButton')
    await myButton.click({ button: 2, x: 30, y: 40, skipRelease:true }) // skips sending releaseActions
})

```

```js title="longpress.example.js"
it('should be able to open the contacts menu on iOS by executing a longPress', async () => {
    const contacts = await $('~Contacts')
    // opens the Contacts menu on iOS where you can quickly create
    // a new contact, edit your home screen, or remove the app
    await contacts.click({ duration: 2000 })
})
```