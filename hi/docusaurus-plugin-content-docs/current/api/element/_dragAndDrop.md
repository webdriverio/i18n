---
id: dragAndDrop
title: ड्रैग एंड ड्रॉप
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/dragAndDrop.ts
---

किसी आइटम को एक लक्ष्य तत्व या स्थिति पर खींचें।

:::info

इस कमांड की कार्यक्षमता अत्यधिक आपके ऐप में ड्रैग और ड्रॉप के कार्यान्वयन पर निर्भर करती है। यदि आप समस्याओं का अनुभव करते हैं तो कृपया अपना उदाहरण [#4134](https://github.com/webdriverio/webdriverio/issues/4134) में पोस्ट करें।

:::

##### उपयोग

```js
$(selector).dragAndDrop(target, { duration })
```

##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>नाम</th><th>टाइप</th><th>विवरण</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>target</var></code></td>
      <td>`Element, DragAndDropCoordinate`</td>
      <td>लक्ष्य तत्व या x और y गुणों वाला ऑब्जेक्ट</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`DragAndDropOptions`</td>
      <td>dragAndDrop कमांड विकल्प</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Number`</td>
      <td>ड्रैग कितने समय तक होना चाहिए</td>
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