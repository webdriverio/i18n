---
id: setCookies
title: குக்கீகளை அமைக்க
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setCookies.ts
---

தற்போதைய பக்கத்திற்கு ஒன்று அல்லது அதற்கு மேற்பட்ட [குக்கீகளை](https://w3c.github.io/webdriver/#cookies) அமைக்கிறது. குக்கீயைப் பெற வேண்டிய பக்கத்தில் நீங்கள் இருப்பதை உறுதிப்படுத்திக் கொள்ளுங்கள். அந்த பக்கத்தில் இல்லாமல் ஒரு தன்னிச்சையான பக்கத்திற்கு குக்கீயை அமைக்க முடியாது.

##### பயன்பாடு

```js
browser.setCookies({ name, value, path, domain, secure, httpOnly, expiry, sameSite })
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
      <td><code><var>cookie</var></code></td>
      <td>`Array<WebDriverCookie>, WebDriverCookie`</td>
      <td>குக்கீ பொருள் அல்லது பொருள் வரிசை.</td>
    </tr>
    <tr>
      <td><code><var>cookie.name</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`String`</td>
      <td>குக்கீயின் பெயர்.</td>
    </tr>
    <tr>
      <td><code><var>cookie.value</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`String`</td>
      <td>குக்கீ மதிப்பு.</td>
    </tr>
    <tr>
      <td><code><var>cookie.path</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`String`</td>
      <td>குக்கீ பாதை. குக்கீயை சேர்க்கும்போது விடப்பட்டால் இயல்பாக "/" ஆக இருக்கும்.</td>
    </tr>
    <tr>
      <td><code><var>cookie.domain</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`String`</td>
      <td>குக்கீ காணக்கூடிய டொமைன். குக்கீயை சேர்க்கும்போது விடப்பட்டால், தற்போதைய உலாவும் சூழலின் செயலில் உள்ள ஆவணத்தின் URL டொமைனுக்கு இயல்பாக அமைக்கப்படும்.</td>
    </tr>
    <tr>
      <td><code><var>cookie.secure</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`Boolean`</td>
      <td>குக்கீ பாதுகாப்பான குக்கீயா என்பது. குக்கீயை சேர்க்கும்போது விடப்பட்டால் இயல்பாக 'false' ஆக இருக்கும்.</td>
    </tr>
    <tr>
      <td><code><var>cookie.httpOnly</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`Boolean`</td>
      <td>குக்கீ HTTP மட்டும் குக்கீயா என்பது. குக்கீயை சேர்க்கும்போது விடப்பட்டால் இயல்பாக 'false' ஆக இருக்கும்.</td>
    </tr>
    <tr>
      <td><code><var>cookie.expiry</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`Number`</td>
      <td>குக்கீ காலாவதியாகும் நேரம், யூனிக்ஸ் எபாக் முதல் வினாடிகளில் குறிப்பிடப்பட்டுள்ளது. குக்கீயை சேர்க்கும்போது விடப்பட்டால் அமைக்கப்படக்கூடாது.</td>
    </tr>
    <tr>
      <td><code><var>cookie.sameSite</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`String`</td>
      <td>குக்கீ SameSite கொள்கைக்கு பொருந்துமா என்பது. குக்கீயை சேர்க்கும்போது விடப்பட்டால் இயல்பாக 'None' ஆக இருக்கும். "Lax" அல்லது "Strict" என அமைக்கலாம்.</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டு

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