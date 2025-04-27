---
id: scroll
title: scroll
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/scroll.ts
---

Scroll within the browser viewport. Note that `x` and `y` coordinates are relative to the current
scroll positon, therefore `browser.scroll(0, 0)` is a non operation.

##### Usage

```js
browser.scroll(x, y)
```

##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x=0</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>horizontal scroll position (default: `0`)</td>
    </tr>
    <tr>
      <td><code><var>y=0</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>vertical scroll position (default: `0`)</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="scroll.js"
it('should demonstrate the scroll command', async () => {
    await browser.url('https://webdriver.io')

    console.log(await browser.execute(() => window.scrollY)) // returns 0
    await browser.scroll(0, 200)
    console.log(await browser.execute(() => window.scrollY)) // returns 200
});
```

