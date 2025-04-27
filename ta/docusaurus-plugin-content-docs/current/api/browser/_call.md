---
id: call
title: அழைப்பு
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/call.ts
---

உங்கள் சோதனை விவரக்குறிப்பில் எந்த ஒரு அசிங்க் செயலையும் செயல்படுத்த நீங்கள் `call` ஐப் பயன்படுத்தலாம்.
இது உறுதிமொழிகளை (promises) ஏற்றுக்கொள்கிறது மற்றும் உறுதிமொழி தீர்க்கப்படும் வரை செயல்பாட்டை நிறுத்துகிறது.

:::info

WebdriverIO ஒத்திசைவான பயன்பாட்டை நீக்குவதால் (பார்க்க [RFC](https://github.com/webdriverio/webdriverio/discussions/6702))
இந்த கட்டளை இனி அவ்வளவு பயனுள்ளதாக இல்லை.

:::

##### பயன்பாடு

```js
browser.call(callback)
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
      <td><code><var>callback</var></code></td>
      <td>`Function`</td>
      <td>அழைக்கப்பட வேண்டிய செயல்பாடு</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டு

```js title="call.js"
it('some testing here', async () => {
    await browser.url('http://google.com')
    // make an asynchronous call using any 3rd party library supporting promises
    // e.g. call to backend or db to inject fixture data
    await browser.call(() => {
        return somePromiseLibrary.someMethod().then(() => {
            // ...
        })
    })

    // example for async call to 3rd party library that doesn't support promises
    const result = await browser.call(() => {
        return new Promise((resolve, reject) => {
            someOtherNodeLibrary.someMethod(param1, (err, res) => {
                if (err) {
                    return reject(err)
                }
                resolve(res)
            })
        })
    })
});
```