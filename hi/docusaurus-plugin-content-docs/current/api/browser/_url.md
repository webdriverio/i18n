---
id: url
title: url
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/url.ts
---

`url` कमांड ब्राउज़र में एक URL लोड करता है। यदि कॉन्फ़िग में एक baseUrl निर्दिष्ट किया गया है, तो वह node के url.resolve() विधि का उपयोग करके url पैरामीटर के साथ जोड़ दिया जाएगा। अंतिम बार की तरह ही एक ही url के साथ `browser.url('...')` को कॉल करने से पृष्ठ रीलोड होगा। हालांकि, यदि url में एक हैश शामिल है, तो ब्राउज़र एक नई नेविगेशन को ट्रिगर नहीं करेगा और उपयोगकर्ता को [refresh](/docs/api/webdriver#refresh) का उपयोग करके पृष्ठ को ट्रिगर करना होगा।

कमांड एक `WebdriverIO.Request` ऑब्जेक्ट लौटाता है जिसमें पेज लोड के अनुरोध और प्रतिक्रिया डेटा के बारे में जानकारी होती है:

```ts
interface WebdriverIO.Request {
  id?: string
  url: string
  timestamp: number
  navigation?: string
  redirectChain?: string[],
  headers: Record<string, string>
  cookies?: NetworkCookie[]
  \/**
   * Error message if request failed
   *\/
  error?: string
  response?: {
      fromCache: boolean
      headers: Record<string, string>
      mimeType: string
      status: number
  },
  /**
   * List of all requests that were made due to the main request.
   * Note: the list may be incomplete and does not contain request that were
   * made after the command has finished.
   *
   * The property will be undefined if the request is not a document request
   * that was initiated by the browser.
   *\/
  children?: Request[]
}
```

यह कमांड निम्नलिखित विकल्पों का समर्थन करता है:

### wait
अनुरोधित संसाधन की वांछित स्थिति जिसमें कमांड समाप्त होने से पहले होना चाहिए।
यह निम्नलिखित अवस्थाओं का समर्थन करता है:

 - `none`: पृष्ठ अनुरोध किए जाने और प्रतिक्रिया प्राप्त होने के बाद कोई इंतजार नहीं
 - `interactive`: पृष्ठ के इंटरैक्टिव होने तक इंतजार करें
 - `complete`: पृष्ठ के DOM ट्री के पूरी तरह से लोड होने तक इंतजार करें
 - `networkIdle`: तब तक इंतजार करें जब तक कोई लंबित नेटवर्क अनुरोध न हों

### headers

अनुरोध के साथ भेजे जाने वाले हेडर्स।

__Default:__ `{}`

### auth

बेसिक ऑथेंटिकेशन क्रेडेंशियल्स।
नोट: यह मौजूदा `Authorization` हेडर को ओवरराइट कर देगा अगर `headers` विकल्प में प्रदान किया गया है।

### timeout

यदि एक संख्या पर सेट किया गया है, तो कमांड वापस आने से पहले पृष्ठ को सभी प्रतिक्रियाओं को लोड करने के लिए निर्दिष्ट मिलीसेकंड तक इंतजार करेगा।

नोट: इसका प्रभाव होने के लिए, `wait` विकल्प को `networkIdle` पर सेट करना आवश्यक है।

__Default:__ `5000`

##### उपयोग

```js
browser.url(url, { wait, timeout, onBeforeLoad, auth, headers })
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
      <td><code><var>url</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`string`</td>
      <td>नेविगेट करने के लिए URL</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`UrlOptions`</td>
      <td>नेविगेशन विकल्प</td>
    </tr>
    <tr>
      <td><code><var>options.wait</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`'none', 'interactive', 'networkIdle', 'complete'`</td>
      <td>अनुरोधित संसाधन की वांछित स्थिति जिसमें कमांड समाप्त होने से पहले होना चाहिए। डिफ़ॉल्ट: 'complete'</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`number`</td>
      <td>यदि एक संख्या पर सेट किया गया है, तो कमांड वापस आने से पहले पृष्ठ को सभी प्रतिक्रियाओं को लोड करने के लिए निर्दिष्ट मिलीसेकंड तक इंतजार करेगा। डिफ़ॉल्ट: 5000</td>
    </tr>
    <tr>
      <td><code><var>options.onBeforeLoad</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Function`</td>
      <td>एक फंक्शन जो आपके पेज के सभी संसाधनों को लोड करने से पहले कॉल किया जाता है। यह आपको आसानी से वातावरण को मॉक करने की अनुमति देता है, जैसे उन वेब API को ओवरराइट करना जिन्हें आपका एप्लिकेशन उपयोग करता है।</td>
    </tr>
    <tr>
      <td><code><var>options.auth</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`{user: string, pass: string}`</td>
      <td>बेसिक ऑथेंटिकेशन क्रेडेंशियल्स</td>
    </tr>
    <tr>
      <td><code><var>options.headers</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Record<string, string>`</td>
      <td>अनुरोध के साथ भेजे जाने वाले हेडर्स</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="url.js"
// navigate to a new URL
const request = await browser.url('https://webdriver.io');
// log url
console.log(request.url); // outputs: "https://webdriver.io"
console.log(request.response?.status); // outputs: 200
console.log(request.response?.headers); // outputs: { 'content-type': 'text/html; charset=UTF-8' }

```

```js title="baseUrlResolutions.js"
// With a base URL of http://example.com/site, the following url parameters resolve as such:
// When providing a scheme:
// https://webdriver.io
await browser.url('https://webdriver.io');

// When not starting with a slash, the URL resolves relative to the baseUrl
// http://example.com/site/relative
await browser.url('relative');

// When starting with a slash, the URL resolves relative to the root path of the baseUrl
// http://example.com/rootRelative
await browser.url('/rootRelative');

```

```js title="basicAuth.js"
// navigate to a URL with basic authentication
await browser.url('https://the-internet.herokuapp.com/basic_auth', {
    auth: {
        user
        pass
    }
});
await expect($('p=Congratulations! You must have the proper credentials.').toBeDisplayed();

```

```js title="onBeforeLoad.js"
// navigate to a URL and mock the battery API
await browser.url('https://pazguille.github.io/demo-battery-api/', {
    onBeforeLoad (win) {
        // mock "navigator.battery" property
        // returning mock charge object
        win.navigator.getBattery = () => Promise.resolve({
            level: 0.5,
            charging: false,
            chargingTime: Infinity,
            dischargingTime: 3600, // seconds
        })
    }
})
// now we can assert actual text - we are charged at 50%
await expect($('.battery-percentage')).toHaveText('50%')
// and has enough juice for 1 hour
await expect($('.battery-remaining')).toHaveText('01:00)
```

##### रिटर्न

- **&lt;WebdriverIO.Request&gt;**
            **<code><var>returns</var></code>:**  पेज लोड का एक अनुरोध ऑब्जेक्ट जिसमें अनुरोध और प्रतिक्रिया डेटा के बारे में जानकारी है