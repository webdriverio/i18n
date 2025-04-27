---
id: setTimeout
title: setTimeout
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setTimeout.ts
---

தற்போதைய அமர்வுடன் தொடர்புடைய நேரமுடிவுகளை அமைக்கிறது, நேரமுடிவு காலங்கள் ஸ்கிரிப்ட் செருகல், ஆவண வழிசெலுத்தல் மற்றும் உறுப்பு மீட்டெடுப்பு போன்ற செயல்பாடுகளை கட்டுப்படுத்துகின்றன.
மேலும் தகவல் மற்றும் எடுத்துக்காட்டுகளுக்கு, [timeouts guide](https://webdriver.io/docs/timeouts#selenium-timeouts) ஐப் பார்க்கவும்.

:::info

`implicit` நேரமுடிவுகளை அமைப்பது பரிந்துரைக்கப்படவில்லை, ஏனெனில் அவை WebdriverIO இன் செயல்பாட்டை பாதிக்கும்
மற்றும் சில கட்டளைகளில் பிழைகளை ஏற்படுத்தலாம், எ.கா. தலைகீழ் கொடியுடன் `waitForExist`.

:::

##### பயன்பாடு

```js
browser.setTimeout({ implicit, pageLoad, script })
```

##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>timeouts</var></code></td>
      <td>`Timeouts`</td>
      <td>அமர்வு நேரமுடிவு மதிப்புகளைக் கொண்ட பொருள்</td>
    </tr>
    <tr>
      <td><code><var>timeouts.implicit</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>ஓர் உறுப்பைக் கண்டறியும்போது உறுப்பு இருப்பிட உத்தியை மீண்டும் முயற்சிக்க மில்லிவினாடிகளில் நேரம்.</td>
    </tr>
    <tr>
      <td><code><var>timeouts.pageLoad</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>ஆவணம் ஏற்றுவதை முடிக்க காத்திருக்க மில்லிவினாடிகளில் நேரம்.</td>
    </tr>
    <tr>
      <td><code><var>timeouts.script</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>[`execute`](https://webdriver.io/docs/api/browser/execute) அல்லது [`executeAsync`](https://webdriver.io/docs/api/browser/executeAsync) மூலம் செருகப்பட்ட ஸ்கிரிப்ட்கள் ஸ்கிரிப்ட் நேரமுடிவு காலத்தை அடையும் வரை இயங்கும், இதுவும் மில்லிவினாடிகளில் கொடுக்கப்படுகிறது.</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டு

```js title="setTimeout.js"
it('should change timeout duration for session with long code duration', async () => {
    await browser.setTimeout({
        'pageLoad': 10000,
        'script': 60000
    });
    // Execute code which takes a long time
    await browser.executeAsync((done) => {
        console.log('Wake me up before you go!');
        setTimeout(done, 59000);
    });
});
```