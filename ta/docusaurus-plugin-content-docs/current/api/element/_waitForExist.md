---
id: waitForExist
title: காத்திருப்பதற்காக
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForExist.ts
---

ஒரு உறுப்பு DOM-இல் இருப்பதற்காக வழங்கப்பட்ட மில்லிவினாடிகளுக்கு காத்திருக்கவும். தேர்வுசெய்பவர் DOM-இல் உள்ள குறைந்தபட்சம் ஒரு உறுப்பைப் பொருந்தினால் true ஐத் திருப்பித் தருகிறது, இல்லையெனில் பிழையை எழுப்புகிறது. reverse கொடி true என்றால், தேர்வுசெய்பவர் எந்த உறுப்புகளையும் பொருந்தவில்லை என்றால் கட்டளை true ஐத் திருப்பித் தரும்.

:::info

மற்ற உறுப்பு கட்டளைகளுக்கு மாறாக, இந்த கட்டளையை நிறைவேற்ற WebdriverIO உறுப்பு இருப்பதற்காகக் காத்திருக்காது.

:::

##### பயன்பாடு

```js
$(selector).waitForExist({ timeout, reverse, timeoutMsg, interval })
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
      <td>ms இல் நேரம் (இயல்புநிலை [`waitforTimeout`](/docs/configuration#waitfortimeout) கட்டமைப்பு மதிப்பின் அடிப்படையில் அமைக்கப்பட்டுள்ளது)</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>true என்றால் அது எதிர்மறைக்காக காத்திருக்கிறது (இயல்புநிலை: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>இருந்தால் அது இயல்புநிலை பிழை செய்தியை மேலெழுதுகிறது</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>சோதனைகளுக்கு இடையேயான இடைவெளி (இயல்புநிலை: `waitforInterval`)</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டு

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

##### திருப்பி அனுப்புகிறது

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true     if element exists (or doesn't if flag is set)    