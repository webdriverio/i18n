---
id: waitForDisplayed
title: காண்பிக்கப்படும் வரை காத்திரு
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForDisplayed.ts
---

ஒரு உறுப்பு காண்பிக்கப்படுவதற்கு அல்லது காண்பிக்கப்படாமல் இருப்பதற்கு குறிப்பிட்ட மில்லி வினாடிகள் வரை காத்திருக்கவும்.

:::info

மற்ற உறுப்பு கட்டளைகளுக்கு மாறாக, இந்த கட்டளையை செயல்படுத்த WebdriverIO உறுப்பு இருப்பதற்காக காத்திருக்காது.

:::

##### பயன்பாடு

```js
$(selector).waitForDisplayed({ timeout, reverse, timeoutMsg, interval, withinViewport })
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
      <td>waitForDisplayed விருப்பங்கள் (விரும்பினால்)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>மில்லி வினாடிகளில் நேரம் (இயல்புநிலை [`waitforTimeout`](/docs/configuration#waitfortimeout) உள்ளமைவு மதிப்பின் அடிப்படையில் அமைக்கப்பட்டுள்ளது)</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>true என்றால் எதிர்மறைக்காக காத்திருக்கும் (இயல்புநிலை: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>இருந்தால் இயல்புநிலை பிழை செய்தியை மேலெழுதும்</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>சோதனைகளுக்கு இடையில் இடைவெளி (இயல்புநிலை: `waitforInterval`)</td>
    </tr>
    <tr>
      <td><code><var>options.withinViewport</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>உறுப்பு பார்வை எல்லைக்குள் காண்பிக்கப்படும் வரை காத்திருக்க `true` என அமைக்கவும் (இயல்புநிலை: `false`)</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டுகள்

```html reference title="index.html" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitForDisplayed/index.html#L3-L8
```

```js reference title="waitForDisplayedExample.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9ac16b4d4cf4bc8ec87f6369439a2d0bcaae4483/waitForDisplayed/waitForDisplayedExample.js#L6-L14
```

##### திரும்பப் பெறுபவை

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:** உறுப்பு காண்பிக்கப்பட்டால் (அல்லது கொடி அமைக்கப்பட்டிருந்தால் காண்பிக்கப்படவில்லை என்றால்) true