---
id: pause
title: pause
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/pause.ts
---

Mette in pausa l'esecuzione per un periodo di tempo specifico. Si raccomanda di non utilizzare questo comando per attendere che un elemento venga visualizzato. Per evitare risultati di test instabili è meglio utilizzare comandi come [`waitForExist`](/docs/api/element/waitForExist) o altri comandi waitFor*.

##### Utilizzo

```js
browser.pause(milliseconds)
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
      <td><code><var>milliseconds</var></code></td>
      <td>`number`</td>
      <td>tempo in ms</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js title="pause.js"
it('should pause the execution', async () => {
    const starttime = new Date().getTime()
    await browser.pause(3000)
    const endtime = new Date().getTime()
    console.log(endtime - starttime) // outputs: 3000
});
```