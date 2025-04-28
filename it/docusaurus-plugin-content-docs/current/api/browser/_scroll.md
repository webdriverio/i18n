---
id: scroll
title: scroll
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/scroll.ts
---

Scorri all'interno del viewport del browser. Nota che le coordinate `x` e `y` sono relative alla posizione
di scorrimento corrente, quindi `browser.scroll(0, 0)` non produce alcuna operazione.

##### Utilizzo

```js
browser.scroll(x, y)
```

##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x=0</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`number`</td>
      <td>posizione di scorrimento orizzontale (predefinito: `0`)</td>
    </tr>
    <tr>
      <td><code><var>y=0</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`number`</td>
      <td>posizione di scorrimento verticale (predefinito: `0`)</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js title="scroll.js"
it('should demonstrate the scroll command', async () => {
    await browser.url('https://webdriver.io')

    console.log(await browser.execute(() => window.scrollY)) // returns 0
    await browser.scroll(0, 200)
    console.log(await browser.execute(() => window.scrollY)) // returns 200
});
```