---
id: overwriteCommand
title: overwriteCommand
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/overwriteCommand.ts
---

உலாவியின் `overwriteCommand` முறை உலாவி மற்றும் உறுப்புகளின் இயல்பான கட்டளைகளான `pause` மற்றும் `click` போன்றவற்றை மேலெழுத உதவுகிறது.

:::info

இதுபற்றிய மேலும் தகவலை [தனிப்பயன் கட்டளை](/docs/customcommands#overwriting-native-commands) பிரிவில் காணலாம்.

:::

##### பயன்பாடு

```js
browser.overwriteCommand(name, callback, elementScope)
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
      <td><code><var>name</var></code></td>
      <td>`string`</td>
      <td>அசல் கட்டளையின் பெயர்</td>
    </tr>
    <tr>
      <td><code><var>callback</var></code></td>
      <td>`Function`</td>
      <td>அசல் செயல்பாட்டை அனுப்புகிறது</td>
    </tr>
    <tr>
      <td><code><var>elementScope</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`Boolean`</td>
      <td>உலாவி பொருளுக்குப் பதிலாக உறுப்பு பொருளை நீட்டிக்கவும்</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டு

```js title="execute.js"
// print milliseconds before pause and return its value.
await browser.overwriteCommand('pause', function (origPauseFunction, ms) {
    console.log(`Sleeping for ${ms}`)
    origPauseFunction(ms)
    return ms
})

// usage
it('should use my overwrite command', async () => {
    await browser.url('https://webdriver.io')
    await browser.pause(1000) // outputs "Sleeping for 1000"
})
```