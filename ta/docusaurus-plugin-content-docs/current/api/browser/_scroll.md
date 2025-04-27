---
id: scroll
title: உருட்டு
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/scroll.ts
---

உலாவி காட்சியில் உருட்டவும். கவனிக்கவும், `x` மற்றும் `y` ஆயங்கள் தற்போதைய
உருட்டு நிலைக்கு தொடர்புடையதாக இருக்கும், எனவே `browser.scroll(0, 0)` என்பது எந்த செயலும் செய்யாது.

##### பயன்பாடு

```js
browser.scroll(x, y)
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
      <td><code><var>x=0</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`number`</td>
      <td>கிடைமட்ட உருட்டு நிலை (இயல்புநிலை: `0`)</td>
    </tr>
    <tr>
      <td><code><var>y=0</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`number`</td>
      <td>செங்குத்து உருட்டு நிலை (இயல்புநிலை: `0`)</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டு

```js title="scroll.js"
it('should demonstrate the scroll command', async () => {
    await browser.url('https://webdriver.io')

    console.log(await browser.execute(() => window.scrollY)) // returns 0
    await browser.scroll(0, 200)
    console.log(await browser.execute(() => window.scrollY)) // returns 200
});
```