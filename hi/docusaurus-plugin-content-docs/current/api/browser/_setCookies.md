---
id: setCookies
title: setCookies
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setCookies.ts
---

वर्तमान पेज के लिए एक या अधिक [cookies](https://w3c.github.io/webdriver/#cookies) सेट करता है। सुनिश्चित करें कि आप
उस पेज पर हैं जिसे कुकी प्राप्त करनी चाहिए। आप उस पेज पर होए बिना किसी भी मनमाने पेज के लिए
कुकी सेट नहीं कर सकते।

##### उपयोग

```js
browser.setCookies({ name, value, path, domain, secure, httpOnly, expiry, sameSite })
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
      <td><code><var>cookie</var></code></td>
      <td>`Array<WebDriverCookie>, WebDriverCookie`</td>
      <td>कुकी ऑब्जेक्ट या ऑब्जेक्ट एरे।</td>
    </tr>
    <tr>
      <td><code><var>cookie.name</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`String`</td>
      <td>कुकी का नाम।</td>
    </tr>
    <tr>
      <td><code><var>cookie.value</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`String`</td>
      <td>कुकी का मान।</td>
    </tr>
    <tr>
      <td><code><var>cookie.path</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`String`</td>
      <td>कुकी पथ। कुकी जोड़ते समय छोड़ दिया जाए तो डिफ़ॉल्ट "/"।</td>
    </tr>
    <tr>
      <td><code><var>cookie.domain</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`String`</td>
      <td>वह डोमेन जिसमें कुकी दिखाई देती है। कुकी जोड़ते समय छोड़ दिया जाए तो डिफ़ॉल्ट वर्तमान ब्राउज़िंग कॉन्टेक्स्ट के सक्रिय दस्तावेज़ के URL डोमेन पर।</td>
    </tr>
    <tr>
      <td><code><var>cookie.secure</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Boolean`</td>
      <td>क्या कुकी एक सुरक्षित कुकी है। कुकी जोड़ते समय छोड़ दिया जाए तो डिफ़ॉल्ट false।</td>
    </tr>
    <tr>
      <td><code><var>cookie.httpOnly</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Boolean`</td>
      <td>क्या कुकी एक HTTP केवल कुकी है। कुकी जोड़ते समय छोड़ दिया जाए तो डिफ़ॉल्ट false।</td>
    </tr>
    <tr>
      <td><code><var>cookie.expiry</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Number`</td>
      <td>कुकी कब समाप्त होती है, यूनिक्स एपोक के बाद से सेकंडों में निर्दिष्ट। कुकी जोड़ते समय छोड़ दिया जाए तो सेट नहीं किया जाना चाहिए।</td>
    </tr>
    <tr>
      <td><code><var>cookie.sameSite</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`String`</td>
      <td>क्या कुकी SameSite नीति पर लागू होती है। कुकी जोड़ते समय छोड़ दिया जाए तो डिफ़ॉल्ट None। "Lax" या "Strict" पर सेट किया जा सकता है।</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="setCookies.js"
it('should set a cookie for the page', async () => {
    await browser.url('/')

    // set a single cookie
    await browser.setCookies({
        name: 'test1',
        value: 'one'
        // The below options are optional
        // path: '/foo', // The cookie path. Defaults to "/"
        // domain: '.example.com', // The domain the cookie is visible to. Defaults to the current browsing context's active document's URL domain
        // secure: true, // Whether the cookie is a secure cookie. Defaults to false
        // httpOnly: true, // Whether the cookie is an HTTP only cookie. Defaults to false
        // expiry: 1551393875 // When the cookie expires, specified in seconds since Unix Epoch
    })

    // set multiple cookies
    await browser.setCookies([
        {name: 'test2', value: 'two'},
        {name: 'test3', value: 'three'}
    ])

    const cookies = await browser.getCookies()
    console.log(cookies);
    // outputs:
    // [
    //      {name: 'test1', value: 'one', domain: 'www.example.com'},
    //      {name: 'test2', value: 'two', domain: 'www.example.com'},
    //      {name: 'test3', value: 'three', domain: 'www.example.com'}
    // ]
});
```