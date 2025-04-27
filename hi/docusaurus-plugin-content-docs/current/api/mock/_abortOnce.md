---
id: abortOnce
title: abortOnce
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/abortOnce.ts
---

निम्नलिखित त्रुटि कोड में से एक के साथ अनुरोध को एक बार रद्द करें:
`Failed`, `Aborted`, `TimedOut`, `AccessDenied`, `ConnectionClosed`,
`ConnectionReset`, `ConnectionRefused`, `ConnectionAborted`,
`ConnectionFailed`, `NameNotResolved`, `InternetDisconnected`,
`AddressUnreachable`, `BlockedByClient`, `BlockedByResponse`।

##### उपयोग

```js
mock.abortOnce(errorCode)
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
      <td><code><var>errorCode</var></code></td>
      <td>`ErrorCode`</td>
      <td>प्रतिक्रिया का त्रुटि कोड, निम्न में से एक हो सकता है: `Failed`, `Aborted`, `TimedOut`, `AccessDenied`, `ConnectionClosed`, `ConnectionReset`, `ConnectionRefused`, `ConnectionAborted`, `ConnectionFailed`, `NameNotResolved`, `InternetDisconnected`, `AddressUnreachable`, `BlockedByClient`, `BlockedByResponse`</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="abortOnce.js"
it('should block mock only once', async () => {
    const mock = await browser.mock('https://webdriver.io')
    mock.abortOnce('Failed')

    await browser.url('https://webdriver.io')
        // catch failing command as page can't be loaded
        .catch(() => {})
    console.log(await browser.getTitle()) // outputs: ""

    await browser.url('https://webdriver.io')
    console.log(await browser.getTitle()) // outputs: "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
})
```