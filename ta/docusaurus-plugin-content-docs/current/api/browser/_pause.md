---
id: pause
title: இடைநிறுத்து
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/pause.ts
---

குறிப்பிட்ட அளவு நேரத்திற்கு செயல்பாட்டை இடைநிறுத்துகிறது. ஒரு உறுப்பு தோன்றுவதற்கு காத்திருக்க இந்த கட்டளையைப் பயன்படுத்தாமல் இருப்பது பரிந்துரைக்கப்படுகிறது. சோதனை முடிவுகளில் ஏற்படும் நிலையற்ற தன்மையைத் தவிர்க்க, [`waitForExist`](/docs/api/element/waitForExist) அல்லது மற்ற waitFor* கட்டளைகளைப் பயன்படுத்துவது சிறந்தது.

##### பயன்பாடு

```js
browser.pause(milliseconds)
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
      <td><code><var>milliseconds</var></code></td>
      <td>`number`</td>
      <td>மில்லிவினாடிகளில் நேரம்</td>
    </tr>
  </tbody>
</table>

##### உதாரணம்

```js title="pause.js"
it('should pause the execution', async () => {
    const starttime = new Date().getTime()
    await browser.pause(3000)
    const endtime = new Date().getTime()
    console.log(endtime - starttime) // outputs: 3000
});
```