---
id: restore
title: استعادة
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/restore.ts
---

يقوم بكل ما يفعله `mock.clear()` وكذلك يزيل أي قيم مُرجعة مزيفة أو تنفيذات.
النموذج المُستعاد لا يصدر أحداثاً ولا يمكنه محاكاة الاستجابات.

##### الاستخدام

```js
mock.restore()
```

##### مثال

```js title="addValue.js"
it('should demonstrate the addValue command', async () => {
    const mock = await browser.mock('**\/googlelogo_color_272x92dp.png')
    mock.respond('https://webdriver.io/img/webdriverio.png')
    await browser.url('https://google.com') // shows WebdriverIO logo instead of Google

    await mock.restore()
    await browser.url('https://google.com') // shows normal Google logo again
})
```