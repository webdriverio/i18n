---
id: pause
title: paus
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/pause.ts
---

Pausar exekvering under en specifik tidsperiod. Det rekommenderas att inte använda detta kommando för att vänta på att 
ett element ska visas. För att undvika opålitliga testresultat är det bättre att använda kommandon som
[`waitForExist`](/docs/api/element/waitForExist) eller andra waitFor* kommandon.

##### Användning

```js
browser.pause(milliseconds)
```

##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>milliseconds</var></code></td>
      <td>`number`</td>
      <td>tid i ms</td>
    </tr>
  </tbody>
</table>

##### Exempel

```js title="pause.js"
it('should pause the execution', async () => {
    const starttime = new Date().getTime()
    await browser.pause(3000)
    const endtime = new Date().getTime()
    console.log(endtime - starttime) // outputs: 3000
});
```