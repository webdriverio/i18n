---
id: downloadFile
title: फ़ाइल डाउनलोड करें
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/downloadFile.ts
---

Selenium नोड चलाने वाले रिमोट कंप्यूटर से स्थानीय फ़ाइल सिस्टम पर फ़ाइल डाउनलोड करने के लिए [`downloadFile`](https://webdriver.io/docs/api/selenium#downloadFile) कमांड का उपयोग करें।

:::info
ध्यान दें कि यह कमांड केवल तभी समर्थित है जब आप Chrome, Edge या Firefox के साथ
[Selenium Grid](https://www.selenium.dev/documentation/en/grid/) का उपयोग करते हैं
और capabilities में `se:downloadsEnabled` फ्लैग सेट किया हुआ है।
:::

##### उपयोग

```js
browser.downloadFile(fileName, targetDirectory)
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
      <td><code><var>fileName</var></code></td>
      <td>`string`</td>
      <td>रिमोट फ़ाइल का पथ</td>
    </tr>
    <tr>
      <td><code><var>targetDirectory</var></code></td>
      <td>`string`</td>
      <td>स्थानीय कंप्यूटर पर लक्षित स्थान</td>
    </tr>
  </tbody>
</table>