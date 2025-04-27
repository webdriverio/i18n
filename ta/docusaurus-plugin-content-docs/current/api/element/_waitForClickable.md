---
id: waitForClickable
title: காத்திருக்க க்ளிக்கெபிள்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForClickable.ts
---

ஒரு உறுப்பு கிளிக் செய்யக்கூடியதாக அல்லது கிளிக் செய்ய முடியாததாக இருக்க வழங்கப்பட்ட மில்லிவினாடிகள் அளவிற்கு காத்திருக்கவும்.

:::info

மற்ற உறுப்பு கட்டளைகளைப் போலல்லாமல், இந்த கட்டளையை நிறைவேற்ற WebdriverIO உறுப்பு இருப்பதற்கு காத்திருக்காது.

:::

##### பயன்பாடு

```js
$(selector).waitForClickable({ timeout, reverse, timeoutMsg, interval })
```

##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`WaitForOptions`</td>
      <td>waitForEnabled விருப்பங்கள் (விருப்பமானது)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>மில்லிவினாடிகளில் நேரம் (இயல்புநிலை [`waitforTimeout`](/docs/configuration#waitfortimeout) கட்டமைப்பு மதிப்பின் அடிப்படையில் அமைக்கப்பட்டுள்ளது)</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>true எனில் அது எதிர்மறைக்காக காத்திருக்கிறது (இயல்புநிலை: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>இருந்தால் அது இயல்புநிலை பிழை செய்தியை மாற்றியமைக்கிறது</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>சோதனைகளுக்கு இடையேயான இடைவெளி (இயல்புநிலை: `waitforInterval`)</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டு

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

##### திரும்ப பெறுகிறது

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  உறுப்பு கிளிக் செய்யக்கூடியதாக இருந்தால் `true` (அல்லது கொடி அமைக்கப்பட்டிருந்தால் இல்லை)