---
id: overwriteCommand
title: overwriteCommand
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/overwriteCommand.ts
---

ब्राउज़र विधि `overwriteCommand` आपको ब्राउज़र और एलिमेंट के मूल कमांड जैसे `pause` और `click` को ओवरराइट करने में मदद करती है।

:::info

आप इस पर अधिक जानकारी [कस्टम कमांड](/docs/customcommands#overwriting-native-commands) अनुभाग में देख सकते हैं।

:::

##### उपयोग

```js
browser.overwriteCommand(name, callback, elementScope)
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
      <td><code><var>name</var></code></td>
      <td>`string`</td>
      <td>मूल कमांड का नाम</td>
    </tr>
    <tr>
      <td><code><var>callback</var></code></td>
      <td>`Function`</td>
      <td>मूल फंक्शन पास करें</td>
    </tr>
    <tr>
      <td><code><var>elementScope</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Boolean`</td>
      <td>Browser ऑब्जेक्ट के बजाय Element ऑब्जेक्ट का विस्तार करें</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

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