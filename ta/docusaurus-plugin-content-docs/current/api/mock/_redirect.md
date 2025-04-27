---
id: redirect
title: வழிமாற்று
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/redirect.ts
---

கொடுக்கப்பட்ட மாக்கிற்கான வழிமாற்றலை அமைக்கிறது. இது ஒரு கோரிக்கையை வேறொரு URL-க்கு வழிமாற்ற அனுமதிக்கிறது.
குறிப்பு: இந்த வழிமாற்றல்கள் உலாவியில் உள்ள ஸ்கிரிப்ட் மூலம் செய்யப்படும் கோரிக்கைகளுக்கு மட்டுமே பொருந்தும், `url` கட்டளையை அழைக்கும்போது அல்ல.

##### பயன்பாடு

```js
mock.redirect(url)
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
      <td><code><var>url</var></code></td>
      <td>`string`</td>
      <td>கோரிக்கைகளை வழிமாற்றுவதற்கான இலக்கு வளம்</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டு

```js title="respond.js"
it('redirects all my API request to my staging server', async () => {
    const mock = await browser.mock('https://application.com/api/*')
    mock.redirect('https://staging.application.com/api/*')

    // is the same as
    mock.request({ url: 'https://staging.application.com/api/*' })

    // ...
})
```