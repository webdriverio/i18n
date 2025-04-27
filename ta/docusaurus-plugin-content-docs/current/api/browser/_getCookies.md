---
id: getCookies
title: குக்கீகளைப் பெறுக
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/getCookies.ts
---

தற்போதைய பக்கத்தில் தெரியக்கூடிய [குக்கீ](https://w3c.github.io/webdriver/webdriver-spec.html#cookies)
ஐப் பெறுங்கள். குக்கீ பெயரை வழங்குவதன் மூலம் ஒரு குறிப்பிட்ட குக்கீயை நீங்கள் வினவலாம் அல்லது
எல்லாவற்றையும் பெறலாம்.

##### பயன்பாடு

```js
browser.getCookies(filter)
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
      <td><code><var>filter</var></code></td>
      <td>`remote.StorageCookieFilter`</td>
      <td>குறிப்பிட்ட பண்புகளுடன் குக்கீகளை வடிகட்ட அனுமதிக்கும் ஒரு பொருள்</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டு

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

##### திரும்பக் கிடைப்பவை

- **&lt;Cookie[]&gt;**
            **<code><var>return</var></code>:**                            கோரப்பட்ட குக்கீகள்