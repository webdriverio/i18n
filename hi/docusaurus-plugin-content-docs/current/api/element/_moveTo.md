---
id: moveTo
title: माउस को स्थानांतरित करें
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/moveTo.ts
---

निर्दिष्ट तत्व के ऑफसेट द्वारा माउस को स्थानांतरित करें। यदि कोई तत्व निर्दिष्ट नहीं है,
तो स्थानांतरण वर्तमान माउस कर्सर के सापेक्ष होता है। यदि कोई तत्व प्रदान किया गया है लेकिन
कोई ऑफसेट नहीं है, तो माउस को तत्व के केंद्र में स्थानांतरित किया जाएगा। यदि तत्व
दिखाई नहीं दे रहा है, तो इसे स्क्रॉल करके दृश्य में लाया जाएगा।

##### उपयोग

```js
$(selector).moveTo({ xOffset, yOffset })
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
      <td>`MoveToOptions`</td>
      <td>moveTo कमांड विकल्प</td>
    </tr>
    <tr>
      <td><code><var>options.xOffset</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Number`</td>
      <td>X ऑफसेट जिस पर स्थानांतरित करना है, तत्व के केंद्र के सापेक्ष। यदि निर्दिष्ट नहीं है, तो माउस तत्व के केंद्र में स्थानांतरित होगा।</td>
    </tr>
    <tr>
      <td><code><var>options.yOffset</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Number`</td>
      <td>Y ऑफसेट जिस पर स्थानांतरित करना है, तत्व के केंद्र के सापेक्ष। यदि निर्दिष्ट नहीं है, तो माउस तत्व के केंद्र में स्थानांतरित होगा।</td>
    </tr>
  </tbody>
</table>