---
id: dragAndDrop
title: खींचें और छोड़ें (dragAndDrop)
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/dragAndDrop.ts
---

किसी आइटम को गंतव्य तत्व या स्थिति पर खींचें।

:::info

इस कमांड की कार्यक्षमता बहुत हद तक आपके ऐप में ड्रैग और ड्रॉप के कार्यान्वयन पर निर्भर करती है। यदि आप समस्याओं का अनुभव करते हैं, तो कृपया अपना उदाहरण [#4134](https://github.com/webdriverio/webdriverio/issues/4134) में पोस्ट करें।

यह भी सुनिश्चित करें कि जिस तत्व को आप खींच रहे हैं और जहां आप छोड़ रहे हैं, वे दोनों स्क्रीन पर दिखाई दे रहे हों।

यह कमांड केवल निम्नलिखित अद्यतित घटकों के साथ काम करता है:
 - Appium सर्वर (वर्शन 2.0.0 या उच्चतर)
 - `appium-uiautomator2-driver` (Android के लिए)
 - `appium-xcuitest-driver` (iOS के लिए)

सुनिश्चित करें कि आपका स्थानीय या क्लाउड-आधारित Appium वातावरण नियमित रूप से अपडेट किया गया है ताकि संगतता समस्याओं से बचा जा सके।

:::

##### उपयोग

```js
$(selector).dragAndDrop(target, { duration })
```

##### पैरामीटर

<table>
  <thead>
    <tr>
      <th>नाम</th><th>प्रकार</th><th>विवरण</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>target</var></code></td>
      <td>`Element, DragAndDropCoordinate`</td>
      <td>गंतव्य तत्व या x और y गुणों के साथ ऑब्जेक्ट</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`DragAndDropOptions`</td>
      <td>dragAndDrop कमांड विकल्प</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Number`</td>
      <td>खींचने में कितना समय लगना चाहिए</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="example.test.js"
it('should demonstrate the dragAndDrop command', async () => {
    const elem = $('#someElem')
    const target = $('#someTarget')

    // drag and drop to other element
    await elem.dragAndDrop(target)

    // drag and drop relative from current position
    await elem.dragAndDrop({ x: 100, y: 200 })
})
```