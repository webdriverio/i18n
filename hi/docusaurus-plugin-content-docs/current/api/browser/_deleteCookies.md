---
id: deleteCookies
title: कुकीज़ हटाएं
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/deleteCookies.ts
---

वर्तमान पेज के लिए दिखाई देने वाली कुकीज़ को हटाएं। एक कुकी नाम प्रदान करके
यह केवल एकल कुकी को हटाता है या अधिक जब कई नाम पास किए जाते हैं।

##### उपयोग

```js
browser.deleteCookies(filter)
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
      <td><code><var>filter</var></code></td>
      <td>`StorageCookieFilter[]`</td>
      <td>मेल खाने वाले मानदंडों के आधार पर विशिष्ट कुकीज़ की पहचान करने और उन्हें हटाने के लिए फिल्टर प्रॉपर्टी का उपयोग करें।</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/deleteCookies/example.js#L9-L29
```

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/deleteCookies/example.js#L31-L35
```