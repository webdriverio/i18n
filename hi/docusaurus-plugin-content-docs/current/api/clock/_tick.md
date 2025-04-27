---
id: tick
title: टिक
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/clock/tick.ts
---

घड़ी को निर्दिष्ट संख्या के `milliseconds` आगे बढ़ाएँ। प्रभावित समय सीमा के भीतर कोई भी टाइमर कॉल किए जाएंगे।

##### उपयोग

```js
const clock = await browser.emulate('clock', { ... })
await clock.tick(ms)
```

##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>नाम</th><th>प्रकार</th><th>विवरण</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>ms</var></code></td>
      <td>` number `</td>
      <td>घड़ी को कितने मिलीसेकंड आगे बढ़ाना है।</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="tick.js"
const clock = await browser.emulate('clock', { now: new Date(2021, 3, 14) })
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383600000

await clock.tick(1000)
console.log(await browser.execute(() => new Date().getTime())) // returns 1618383601000
```

##### रिटर्न्स

- **&lt; `Promise<void>` &gt;**