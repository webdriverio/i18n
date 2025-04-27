---
id: addInitScript
title: addInitScript
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/addInitScript.ts
---

பின்வரும் சூழல்களில் ஒன்றில் மதிப்பீடு செய்யப்படும் ஒரு ஸ்கிரிப்டைச் சேர்க்கிறது:

- பக்கம் வழிசெலுத்தப்படும் போதெல்லாம்.
- சேய் ஃப்ரேம் இணைக்கப்பட்டாலோ அல்லது வழிசெலுத்தப்பட்டாலோ. இந்த சூழலில், புதிதாக இணைக்கப்பட்ட ஃப்ரேமின் சூழலில் ஸ்கிரிப்ட் மதிப்பீடு செய்யப்படுகிறது.

ஆவணம் உருவாக்கப்பட்ட பிறகு, ஆனால் அதன் ஸ்கிரிப்ட்கள் எதுவும் இயங்குவதற்கு முன் ஸ்கிரிப்ட் மதிப்பீடு செய்யப்படுகிறது.
பக்கத்திலிருந்து துவக்க ஸ்கிரிப்டை மீண்டும் அகற்ற, இந்த செயல்பாட்டால் திருப்பி அனுப்பப்பட்ட செயல்பாட்டை அழைக்கவும்.

இது JavaScript சூழலை திருத்துவதற்கு பயனுள்ளதாக இருக்கும், எ.கா. Math.random ஐ விதைக்க.

##### பயன்பாடு

```js
browser.addInitScript(script, args)
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
      <td><code><var>script</var></code></td>
      <td>`Function`</td>
      <td>துவக்க ஸ்கிரிப்டாக செலுத்தப்படும் செயல்பாடு</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>`number, string, boolean`</td>
      <td>ஸ்கிரிப்டிற்கான அளவுருக்கள்</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டுகள்

```js title="addInitScript.js"
const script = await browser.addInitScript((seed) => {
    Math.random = () => seed
}, 42)

await browser.url('https://webdriver.io')
console.log(await browser.execute(() => Math.random())) // returns 42

await reset()
await browser.url('https://webdriver.io')
console.log(await browser.execute(() => Math.random())) // returns a random number

hermore you can also use the `emit` function to send data back to the Node.js environment.
 is useful if you want to observe certain events in the browser environment, e.g.:

```

```js title="addInitScriptWithEmit.js"
const script = await browser.addInitScript((emit) => {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      emit(mutation.target.nodeName)
    }
  })
  observer.observe(document, { childList: true, subtree: true })
})

script.on('data', (data) => {
  console.log(data) // prints: BODY, DIV, P, ...
})
```