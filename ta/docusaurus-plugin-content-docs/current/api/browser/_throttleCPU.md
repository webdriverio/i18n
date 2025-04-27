---
id: throttleCPU
title: CPU வேகத்தைக் குறைத்தல்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/throttleCPU.ts
---

Throttles the CPU to emulate a slower processor.

:::info

குறிப்பு: `throttleCPU` கட்டளையைப் பயன்படுத்த Chrome DevTools நெறிமுறை ஆதரவு தேவைப்படுகிறது மற்றும் எ.கா.
கிளவுடில் தானியங்கி சோதனைகளை இயக்கும்போது பயன்படுத்த முடியாது. Chrome DevTools நெறிமுறை இயல்பாகவே நிறுவப்படவில்லை,
அதை நிறுவ `npm install puppeteer-core` ஐப் பயன்படுத்தவும்.
[Automation Protocols](/docs/automationProtocols) பிரிவில் மேலும் அறியவும்.

:::

##### பயன்பாடு

```js
browser.throttleCPU(factor)
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
      <td><code><var>factor</var></code></td>
      <td>`number`</td>
      <td>வேகக் குறைப்பு காரணி (1 என்றால் வேகக் குறைப்பு இல்லை, 2 என்றால் 2x வேகக் குறைப்பு, போன்றவை)</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டு

```js title="throttleCPU.js"
it('should throttle the CPU', async () => {
    await browser.throttleCPU(2) // 2x slowdown
});
```