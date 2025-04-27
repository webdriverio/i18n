---
id: request
title: கோரிக்கை
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/request.ts
---

அமர்வின் போது உலாவி செய்யும் கோரிக்கைகளை மாற்ற இது உங்களை அனுமதிக்கிறது. பின்வரும் பயன்பாட்டு வழக்குகளுக்கு இது பயனுள்ளதாக இருக்கலாம்:

- உங்கள் பயன்பாடு சரியான கோரிக்கை பேலோட்களை அனுப்புகிறதா என்பதை சரிபார்த்தல்
- பாதுகாக்கப்பட்ட ஆதாரங்களை சோதிக்க அங்கீகார தலைப்புகளை கடத்துதல்
- பயனர் அங்கீகாரத்தை சோதிக்க அமர்வு குக்கீகளை அமைத்தல்
- விளிம்பு வழக்குகளை சோதிக்க கோரிக்கைகளை மாற்றுதல்

##### பயன்பாடு

```js
mock.request({ header, cookies, method, url, header, statusCode, fetchResponse })
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
      <td>`Record<string,string>`</td>
      <td>குறிப்பிட்ட தலைப்புகளை மேலெழுதுதல்</td>
    </tr>
    <tr>
      <td><code><var>overwrites.cookies</var></code></td>
      <td>`Record<string,string>`</td>
      <td>கோரிக்கை குக்கீகளை மேலெழுதுதல்</td>
    </tr>
    <tr>
      <td><code><var>overwrites.method</var></code></td>
      <td>`string`</td>
      <td>கோரிக்கை முறையை மேலெழுதுதல்</td>
    </tr>
    <tr>
      <td><code><var>overwrites.url</var></code></td>
      <td>`string`</td>
      <td>வழிமாற்றலைத் தொடங்க கோரிக்கை url-ஐ மேலெழுதுதல்</td>
    </tr>
    <tr>
      <td><code><var>params</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`MockResponseParams`</td>
      <td>மேலெழுத கூடுதல் பதில் அளவுருக்கள்</td>
    </tr>
    <tr>
      <td><code><var>params.header</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Object`</td>
      <td>குறிப்பிட்ட தலைப்புகளை மேலெழுதுதல்</td>
    </tr>
    <tr>
      <td><code><var>params.statusCode</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>பதில் நிலை குறியீட்டை மேலெழுதுதல்</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>போலியான தரவுடன் பதிலளிப்பதற்கு முன் உண்மையான பதிலைப் பெறுதல்</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டு

```js title="respond.js"
it('adds an auth header to my API requests', async () => {
    const mock = await browser.mock('https://application.com/api', {
        method: 'get'
    })

    mock.request({
        headers: { 'Authorization': 'Bearer token' }
    })

    await browser.url('https://application.com')
    // ...
})
```