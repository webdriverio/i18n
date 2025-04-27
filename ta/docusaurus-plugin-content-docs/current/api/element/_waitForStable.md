---
id: waitForStable
title: நிலைப்படுத்தகாத்திரு
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForStable.ts
---

Wait for an element for the provided amount of
milliseconds to be stable (not animating). Returns true if the selector
matches at least one element that is stable in the DOM, otherwise throws an
error. If the reverse flag is true, the command will instead return true
if the selector does not match any stable elements.

__Note:__ it's best to disable animations instead of using this command

##### Usage

```js
$(selector).waitForStable({ timeout, reverse, timeoutMsg, interval })
```

##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`WaitForOptions`</td>
      <td>நிலைப்படுத்தகாத்திரு விருப்பங்கள் (விருப்பத்தேர்வு)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>மில்லி செகண்டுகளில் நேரம் (இயல்புநிலை [`waitforTimeout`](/docs/configuration#waitfortimeout) கட்டமைப்பு மதிப்பின் அடிப்படையில் அமைக்கப்பட்டுள்ளது)</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>உண்மை எனில் எதிர்மறைக்காக காத்திருக்கும் (இயல்புநிலை: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>இருந்தால் இயல்புநிலை பிழை செய்தியை மீறுகிறது</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>சரிபார்ப்புகளுக்கு இடையில் உள்ள இடைவெளி (இயல்புநிலை: `waitforInterval`)</td>
    </tr>
  </tbody>
</table>

##### Examples

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

##### Returns

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  உறுப்பு நிலையானதாக இருந்தால் உண்மை