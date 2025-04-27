---
id: waitForClickable
title: क्लिक करने योग्य होने की प्रतीक्षा करें
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForClickable.ts
---

किसी तत्व के लिए प्रदान की गई मिलीसेकंड की मात्रा के लिए क्लिक करने योग्य होने या क्लिक करने योग्य न होने की प्रतीक्षा करें।

:::info

अन्य तत्व कमांड के विपरीत WebdriverIO इस कमांड को निष्पादित करने के लिए तत्व के मौजूद होने की प्रतीक्षा नहीं करेगा।

:::

##### उपयोग

```js
$(selector).waitForClickable({ timeout, reverse, timeoutMsg, interval })
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
      <td>`WaitForOptions`</td>
      <td>waitForEnabled विकल्प (वैकल्पिक)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Number`</td>
      <td>मिलीसेकंड में समय (डिफ़ॉल्ट [`waitforTimeout`](/docs/configuration#waitfortimeout) कॉन्फ़िगरेशन मान पर आधारित)</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Boolean`</td>
      <td>यदि सही है तो यह विपरीत के लिए प्रतीक्षा करता है (डिफ़ॉल्ट: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`String`</td>
      <td>यदि मौजूद है तो यह डिफ़ॉल्ट त्रुटि संदेश को ओवरराइड करता है</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Number`</td>
      <td>जांच के बीच अंतराल (डिफ़ॉल्ट: `waitforInterval`)</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="waitForClickable.js"
it('should detect when element is clickable', async () => {
    const elem = await $('#elem')
    await elem.waitForClickable({ timeout: 3000 });
});
it('should detect when element is no longer clickable', async () => {
    const elem = await $('#elem')
    await elem.waitForClickable({ reverse: true });
});
```

##### रिटर्न्स

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  `true` अगर तत्व क्लिक करने योग्य है (या नहीं अगर फ्लैग सेट है)