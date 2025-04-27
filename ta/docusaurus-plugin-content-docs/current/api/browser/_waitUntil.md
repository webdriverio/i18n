---
id: waitUntil
title: காத்திரு வரை
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/waitUntil.ts
---

இந்த காத்திரு கட்டளை நீங்கள் ஏதாவது ஒன்றுக்கு காத்திருக்க விரும்பினால் உங்கள் பொதுவான ஆயுதமாகும். இது ஒரு நிபந்தனையை எதிர்பார்க்கிறது மற்றும் அந்த நிபந்தனை உண்மையான மதிப்பைத் திருப்பி அனுப்ப நிறைவேற்றப்படும் வரை காத்திருக்கிறது.

ஒரு பொதுவான எடுத்துக்காட்டு என்னவென்றால், ஒரு குறிப்பிட்ட உறுப்பு ஒரு குறிப்பிட்ட உரையைக் கொண்டிருக்கும் வரை காத்திருப்பது (எடுத்துக்காட்டைப் பார்க்கவும்).

##### பயன்பாடு

```js
browser.waitUntil(condition, { timeout, timeoutMsg, interval })
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
      <td><code><var>condition</var></code></td>
      <td>`Function`</td>
      <td>உண்மையான மதிப்பைத் திருப்பித் தரும் வரை காத்திருக்க வேண்டிய நிபந்தனை</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`WaitUntilOptions`</td>
      <td>கட்டளை விருப்பங்கள்</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`Number`</td>
      <td>மில்லி வினாடிகளில் நேரம் (இயல்புநிலை [`waitforTimeout`](/docs/configuration#waitfortimeout) கட்டமைப்பு மதிப்பின் அடிப்படையில் அமைக்கப்பட்டுள்ளது)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`String`</td>
      <td>waitUntil நேரம் முடிவடையும்போது எறிய வேண்டிய பிழை செய்தி</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`Number`</td>
      <td>நிபந்தனை சரிபார்ப்புகளுக்கு இடையேயான இடைவெளி (இயல்புநிலை [`waitforInterval`](/docs/configuration#waitforinterval) கட்டமைப்பு மதிப்பின் அடிப்படையில் அமைக்கப்பட்டுள்ளது)</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டுகள்

```html reference title="index.html" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitUntil/index.html#L3-L8
```

```js reference title="waitUntilExample.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0c9252b0a4f7e18a34cece74e5798c1fe464c120/waitUntil/waitUntilExample.js#L16-L24
```

##### திரும்பப் பெறுபவை

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  நிபந்தனை நிறைவேற்றப்பட்டால் உண்மை