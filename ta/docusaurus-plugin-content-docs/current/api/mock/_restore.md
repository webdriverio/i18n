---
id: restore
title: மீட்டெடு
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/restore.ts
---

`mock.clear()` செய்வது அனைத்தையும் செய்கிறது, மேலும் மாற்றப்பட்ட திரும்பப் பெறும் மதிப்புகள் அல்லது அமலாக்கங்களையும் அகற்றுகிறது.
மீட்டெடுக்கப்பட்ட மாக் நிகழ்வுகளை வெளியிடாது மற்றும் பதில்களை மாக் செய்ய முடியாது.

##### பயன்பாடு

```js
mock.restore()
```

##### உதாரணம்

```js title="addValue.js"
it('should demonstrate the addValue command', async () => {
    const mock = await browser.mock('**\/googlelogo_color_272x92dp.png')
    mock.respond('https://webdriver.io/img/webdriverio.png')
    await browser.url('https://google.com') // shows WebdriverIO logo instead of Google

    await mock.restore()
    await browser.url('https://google.com') // shows normal Google logo again
})
```