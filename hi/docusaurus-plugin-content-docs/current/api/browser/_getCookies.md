---
id: getCookies
title: getCookies
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/getCookies.ts
---

वर्तमान पेज के लिए दृश्यमान [कुकी](https://w3c.github.io/webdriver/webdriver-spec.html#cookies) प्राप्त करें। आप कुकी का नाम प्रदान करके किसी विशिष्ट कुकी को क्वेरी कर सकते हैं या सभी प्राप्त कर सकते हैं।

##### उपयोग

```js
browser.getCookies(filter)
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
      <td><code><var>filter</var></code></td>
      <td>`remote.StorageCookieFilter`</td>
      <td>एक ऑब्जेक्ट जो विशिष्ट विशेषताओं वाले कुकीज़ को फ़िल्टर करने की अनुमति देता है</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="getCookies.js"
it('should return a cookie for me', async () => {
    await browser.setCookies([
        {name: 'test', value: '123'},
        {name: 'test2', value: '456'}
    ])
    const testCookie = await browser.getCookies(['test'])
    console.log(testCookie); // outputs: [{ name: 'test', value: '123' }]

    const allCookies = await browser.getCookies()
    console.log(allCookies);
    // outputs:
    // [
    //    { name: 'test', value: '123' },
    //    { name: 'test2', value: '456' }
    // ]

    // filter cookies by domain
    const stagingCookies = await browser.getCookies({
        domain: 'staging.myapplication.com'
    })
})
```

##### रिटर्न्स

- **&lt;Cookie[]&gt;**
            **<code><var>return</var></code>:**                            अनुरोधित कुकीज़