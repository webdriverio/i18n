---
id: scroll
title: przewijanie
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/scroll.ts
---

Przewijanie w obrębie widoku przeglądarki. Należy zauważyć, że współrzędne `x` i `y` są względne do aktualnej
pozycji przewijania, dlatego `browser.scroll(0, 0)` nie wykonuje żadnej operacji.

##### Użycie

```js
browser.scroll(x, y)
```

##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x=0</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`number`</td>
      <td>pozioma pozycja przewijania (domyślnie: `0`)</td>
    </tr>
    <tr>
      <td><code><var>y=0</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`number`</td>
      <td>pionowa pozycja przewijania (domyślnie: `0`)</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js title="scroll.js"
it('should demonstrate the scroll command', async () => {
    await browser.url('https://webdriver.io')

    console.log(await browser.execute(() => window.scrollY)) // returns 0
    await browser.scroll(0, 200)
    console.log(await browser.execute(() => window.scrollY)) // returns 200
});
```