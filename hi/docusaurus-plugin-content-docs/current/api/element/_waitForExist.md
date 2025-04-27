---
id: waitForExist
title: waitForExist
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForExist.ts
---

DOM के भीतर किसी तत्व के मौजूद होने के लिए प्रदान की गई मिलीसेकंड की राशि तक प्रतीक्षा करें। यदि सिलेक्टर कम से कम एक ऐसे तत्व से मेल खाता है जो DOM में मौजूद है, तो true वापस करता है, अन्यथा एक त्रुटि फेंकता है। यदि reverse फ्लैग true है, तो यदि सिलेक्टर किसी भी तत्व से मेल नहीं खाता है तो कमांड इसके बजाय true वापस करेगा।

:::info

अन्य तत्व कमांड के विपरीत, WebdriverIO इस कमांड को निष्पादित करने के लिए तत्व के मौजूद होने की प्रतीक्षा नहीं करेगा।

:::

##### उपयोग

```js
$(selector).waitForExist({ timeout, reverse, timeoutMsg, interval })
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
      <td>ms में समय (डिफॉल्ट [`waitforTimeout`](/docs/configuration#waitfortimeout) कॉन्फिगरेशन मान के आधार पर सेट)</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Boolean`</td>
      <td>यदि true है तो यह विपरीत के लिए प्रतीक्षा करता है (डिफॉल्ट: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`String`</td>
      <td>यदि मौजूद है तो यह डिफॉल्ट त्रुटि संदेश को ओवरराइड करता है</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Number`</td>
      <td>जांच के बीच अंतराल (डिफॉल्ट: `waitforInterval`)</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="waitForExistSyncExample.js"
it('should display a notification message after successful form submit', async () => {
    const form = await $('form');
    const notification = await $('.notification');
    await form.$(".send").click();
    await notification.waitForExist({ timeout: 5000 });
    expect(await notification.getText()).to.be.equal('Data transmitted successfully!')
});
it('should remove a message after successful form submit', async () => {
    const form = await $('form');
    const message = await $('.message');
    await form.$(".send").click();
    await message.waitForExist({ reverse: true });
});
```

##### रिटर्न्स

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true     यदि तत्व मौजूद है (या नहीं है यदि फ्लैग सेट है)    