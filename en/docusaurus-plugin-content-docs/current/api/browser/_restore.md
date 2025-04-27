---
id: restore
title: restore
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/restore.ts
---

This command restores specific or all emulated behaviors that were set using the `emulate` command.

##### Usage

```js
browser.restore()
```

##### Example

```js title="restore.js"
before(async () => {
    await browser.emulate('geolocation', { latitude: 52.52, longitude: 13.405 })
    await browser.emulate('userAgent', 'foobar')
    await browser.emulate('colorScheme', 'dark')
    await browser.emulate('onLine', false)
})

it('should restore all emulated behavior', async () => {
    await browser.url('https://webdriver.io')
    // test within an emulated environment...
})

after(async () => {
    // restore all emulated behavior
    await browser.restore()
    // or only restore specific emulated behavior
    // await browser.restore(['geolocation', 'userAgent'])
})
```

