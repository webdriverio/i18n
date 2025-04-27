---
id: accept
title: स्वीकार करें
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/accept.ts
---

जब डायलॉग स्वीकार कर लिया जाता है तब यह वापस आता है।

##### उपयोग

```js
await dialog.accept(promptText)
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
      <td><code><var>promptText</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`string`</td>
      <td>प्रॉम्प्ट में दर्ज करने के लिए एक टेक्स्ट। यदि डायलॉग का प्रकार प्रॉम्प्ट नहीं है तो कोई प्रभाव नहीं होता है।</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="dialogAccept.js"
await dialog.accept();
await dialog.accept(promptText);
```