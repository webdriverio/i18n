---
id: waitForStable
title: waitForStable
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForStable.ts
---

प्रदान की गई मिलीसेकंड समय के लिए एक एलिमेंट का स्थिर (एनिमेशन न कर रहा हो) होने का इंतजार करें। यदि सिलेक्टर कम से कम एक ऐसे एलिमेंट से मेल खाता है जो DOM में स्थिर है, तो true लौटाता है, अन्यथा एक त्रुटि फेंकता है। यदि रिवर्स फ्लैग सही है, तो कमांड तब true लौटाएगा जब सिलेक्टर किसी भी स्थिर एलिमेंट से मेल नहीं खाता है।

__नोट:__ इस कमांड का उपयोग करने के बजाय एनिमेशन को अक्षम करना सबसे अच्छा है

##### उपयोग

```js
$(selector).waitForStable({ timeout, reverse, timeoutMsg, interval })
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
      <td>waitForStable विकल्प (वैकल्पिक)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Number`</td>
      <td>समय मिलीसेकंड में (डिफॉल्ट [`waitforTimeout`](/docs/configuration#waitfortimeout) कॉन्फिग मान पर आधारित है)</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Boolean`</td>
      <td>यदि सही है तो यह विपरीत का इंतजार करता है (डिफॉल्ट: false)</td>
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

```html title="index.html"
<head>
    <style>
        div {
            width: 200px;
            height: 200px;
            background-color: red;
        }
        #has-animation {
            animation: 3s 0s alternate slidein;
        }
        @keyframes slidein {
            from {
                margin-left: 100%;
                width: 300%;
            }

            to {
                margin-left: 0%;
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <div #has-animation></div>
    <div #has-no-animation></div>
</body>

```

```js title="waitForStable.js"
it('should detect that element is instable and will wait for the element to become stable', async () => {
    const elem = await $('#has-animation')
    await elem.waitForStable({ timeout: 3000 });
});
it('should detect that element is stable and will not wait', async () => {
    const elem = await $('#has-no-animation')
    await elem.waitForStable();
});
```

##### रिटर्न

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:** यदि एलिमेंट स्थिर है तो true