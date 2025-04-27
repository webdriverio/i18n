---
id: setSystemTime
title: முறைமை நேரத்தை அமைக்க
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/setSystemTime.ts
---

முறைமை நேரத்தை புதிய நேரத்திற்கு மாற்றவும். இப்போது ஒரு நேர முத்திரை, தேதி பொருள், அல்லது அனுப்பப்படாவிட்டால் இயல்பாக 0 ஆக இருக்கும். எந்த டைமர்களும் அழைக்கப்படாது, மேலும் அவற்றை தூண்டுவதற்கு முன் மீதமுள்ள நேரமும் மாறாது.

##### பயன்பாடு

```js
const clock = await browser.emulate('clock', { ... })
await clock.setSystemTime(date)
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
      <td><code><var>date</var></code></td>
      <td>` Date ,  number `</td>
      <td>முறைமை நேரத்தை அமைக்க வேண்டிய புதிய தேதி.</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டு

```js title="setSystemTime.js"
const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383600000

await clock.setSystemTime(new Date(2011, 3, 15))
console.log(await browser.execute(() => new Date().getTime())) // returns 1302850800000
```

##### திருப்பி அனுப்புவது

- **&lt; `Promise<void>` &gt;**