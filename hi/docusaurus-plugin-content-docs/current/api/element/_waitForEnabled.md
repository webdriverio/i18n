---
id: waitForEnabled
title: प्रतीक्षा करें सक्षम होने के लिए
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForEnabled.ts
---

किसी तत्व (css सिलेक्टर द्वारा चयनित) के लिए प्रदान की गई मिलीसेकंड की मात्रा के लिए (अक्षम/सक्षम) होने की प्रतीक्षा करें। यदि दिए गए सिलेक्टर द्वारा कई तत्वों की क्वेरी की जाती है, तो यह सत्य लौटाता है यदि कम से कम एक तत्व (अक्षम/सक्षम) है।

:::info

अन्य तत्व कमांड के विपरीत WebdriverIO इस कमांड को निष्पादित करने के लिए तत्व के मौजूद होने की प्रतीक्षा नहीं करेगा।

:::

##### उपयोग

```js
$(selector).waitForEnabled({ timeout, reverse, timeoutMsg, interval })
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
      <td>समय मिलीसेकंड में (डिफ़ॉल्ट [`waitforTimeout`](/docs/configuration#waitfortimeout) कॉन्फ़िगरेशन मान पर आधारित)</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Boolean`</td>
      <td>यदि सत्य है तो यह विपरीत के लिए प्रतीक्षा करता है (डिफ़ॉल्ट: false)</td>
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

```html title="index.html"
<input type="text" id="username" value="foobar" disabled="disabled"></input>
<script type="text/javascript">
    setTimeout(() => {
        document.getElementById('username').disabled = false
    }, 2000);
</script>
```

```js title="waitForEnabledExample.js"
it('should detect when element is enabled', async () => {
    await $('#username').waitForEnabled({ timeout: 3000 });
});

it('should detect when element is disabled', async () => {
    elem = await $('#username');
    await elem.waitForEnabled({ reverse: true })
});
```

##### रिटर्न्स

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true     अगर तत्व (अक्षम/सक्षम) है