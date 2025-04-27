---
id: tick
title: டிக்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/tick.ts
---

கடிகாரத்தை குறிப்பிட்ட எண்ணிக்கையிலான `milliseconds` நகர்த்துகிறது. பாதிக்கப்பட்ட நேர வரம்பிற்குள் உள்ள எந்த டைமர்களும் அழைக்கப்படும்.

##### பயன்பாடு

```js
const clock = await browser.emulate('clock', { ... })
await clock.tick(ms)
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
      <td><code><var>ms</var></code></td>
      <td>` number `</td>
      <td>கடிகாரத்தை நகர்த்த வேண்டிய மில்லிவினாடிகளின் எண்ணிக்கை.</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டு

```js title="tick.js"
const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383600000

await clock.tick(1000)
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383601000
```

##### திரும்ப அளிப்பவை

- **&lt; `Promise<void>` &gt;**