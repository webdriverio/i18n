---
id: scroll
title: défilement
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/scroll.ts
---

Faire défiler dans la fenêtre du navigateur. Notez que les coordonnées `x` et `y` sont relatives à la position
de défilement actuelle, par conséquent `browser.scroll(0, 0)` est une opération sans effet.

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
      <td>position de défilement horizontal (par défaut: `0`)</td>
    </tr>
    <tr>
      <td><code><var>y=0</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>position de défilement vertical (par défaut: `0`)</td>
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