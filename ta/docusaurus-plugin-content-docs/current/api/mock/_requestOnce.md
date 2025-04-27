---
id: requestOnce
title: requestOnce
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/requestOnce.ts
---

அடுத்த கோரிக்கைக்கு கொடுக்கப்பட்ட மேலெழுதலுடன் கோரிக்கை அளவுருவை ஒரு முறை மட்டுமே மாற்றவும். நீங்கள் `requestOnce` பல தொடர்ச்சியான முறைகள் அழைக்கலாம், மற்றும் அது வரிசையில் மேலெழுதல்களை பயன்படுத்தும். நீங்கள் `requestOnce` மட்டுமே பயன்படுத்தினால் மற்றும் ஒரு பதிலி வரையறுக்கப்பட்டதை விட வளம் பல முறை அழைக்கப்பட்டால், அது அசல் வளத்திற்கு திரும்பும்.

##### பயன்பாடு

```js
mock.requestOnce({ header, cookies, method, url, header, statusCode, fetchResponse })
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
      <td><code><var>overwrites</var></code></td>
      <td>`MockOverwrite`</td>
      <td>பதிலை மேலெழுத பேலோடு</td>
    </tr>
    <tr>
      <td><code><var>overwrites.header</var></code></td>
      <td>`Record<string, string>`</td>
      <td>குறிப்பிட்ட தலைப்புகளை மேலெழுதவும்</td>
    </tr>
    <tr>
      <td><code><var>overwrites.cookies</var></code></td>
      <td>`Record<string, string>`</td>
      <td>கோரிக்கை குக்கீகளை மேலெழுதவும்</td>
    </tr>
    <tr>
      <td><code><var>overwrites.method</var></code></td>
      <td>`string`</td>
      <td>கோரிக்கை முறையை மேலெழுதவும்</td>
    </tr>
    <tr>
      <td><code><var>overwrites.url</var></code></td>
      <td>`string`</td>
      <td>திருப்பிவிடுதலை தொடங்க கோரிக்கை url ஐ மேலெழுதவும்</td>
    </tr>
    <tr>
      <td><code><var>params</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`MockResponseParams`</td>
      <td>மேலெழுத கூடுதல் பதில் அளவுருக்கள்</td>
    </tr>
    <tr>
      <td><code><var>params.header</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Object`</td>
      <td>குறிப்பிட்ட தலைப்புகளை மேலெழுதவும்</td>
    </tr>
    <tr>
      <td><code><var>params.statusCode</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>பதில் நிலை குறியீட்டை மேலெழுதவும்</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>மாற்று தரவுடன் பதிலளிப்பதற்கு முன் உண்மையான பதிலைப் பெறுக</td>
    </tr>
  </tbody>
</table>

##### உதாரணம்

```js title="respond.js"
it('adds different auth headers to my API requests', async () => {
    const mock = await browser.mock('https://application.com/api', {
        method: 'get'
    })

    mock.requestOnce({
        headers: { 'Authorization': 'Bearer token' }
    })
    mock.requestOnce({
        headers: { 'Authorization': 'Another bearer token' }
    })

    await browser.url('https://application.com')
    // ...
})
```