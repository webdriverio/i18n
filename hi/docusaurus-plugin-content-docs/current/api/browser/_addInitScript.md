---
id: addInitScript
title: प्रारंभिक स्क्रिप्ट जोड़ें
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/addInitScript.ts
---

एक स्क्रिप्ट जोड़ता है जो निम्नलिखित परिदृश्यों में से एक में मूल्यांकित की जाएगी:

- जब भी पेज नेविगेट किया जाता है।
- जब भी चाइल्ड फ्रेम अटैच या नेविगेट किया जाता है। इस मामले में, स्क्रिप्ट को
  नए अटैच किए गए फ्रेम के संदर्भ में मूल्यांकित किया जाता है।

स्क्रिप्ट का मूल्यांकन दस्तावेज़ बनाए जाने के बाद लेकिन उसकी किसी भी स्क्रिप्ट के चलने से पहले किया जाता है।
पेज से इनिशियलाइजेशन स्क्रिप्ट को फिर से हटाने के लिए, इस फंक्शन द्वारा
वापस किए गए फंक्शन को कॉल करें।

यह जावास्क्रिप्ट पर्यावरण को संशोधित करने के लिए उपयोगी है, जैसे Math.random के बीज डालने के लिए।

##### उपयोग

```js
browser.addInitScript(script, args)
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
      <td><code><var>script</var></code></td>
      <td>`Function`</td>
      <td>फंक्शन जिसे इनिशियलाइजेशन स्क्रिप्ट के रूप में इंजेक्ट किया जाएगा</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>`number, string, boolean`</td>
      <td>स्क्रिप्ट के लिए पैरामीटर्स</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

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