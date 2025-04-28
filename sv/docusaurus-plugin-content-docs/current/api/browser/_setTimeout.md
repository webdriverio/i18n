---
id: setTimeout
title: setTimeout
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setTimeout.ts
---

Ställer in tidsgränser associerade med den aktuella sessionen, tidsgränser kontrollerar sånt 
beteende som tidsgränser för skriptinjektion, dokumentnavigering och elementhämtning.
För mer information och exempel, se [timeouts guide](https://webdriver.io/docs/timeouts#selenium-timeouts).

:::info

Det rekommenderas inte att ställa in `implicit` tidsgränser eftersom de påverkar WebdriverIOs beteende
och kan orsaka fel i vissa kommandon, t.ex. `waitForExist` med omvänd flagga.

:::

##### Användning

```js
browser.setTimeout({ implicit, pageLoad, script })
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
      <td><code><var>timeouts</var></code></td>
      <td>`Timeouts`</td>
      <td>Objekt som innehåller sessionens tidsgränsvärden</td>
    </tr>
    <tr>
      <td><code><var>timeouts.implicit</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Number`</td>
      <td>Tid i millisekunder för att försöka igen med elementlokaliseringsstrategin när ett element hittas.</td>
    </tr>
    <tr>
      <td><code><var>timeouts.pageLoad</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Number`</td>
      <td>Tid i millisekunder att vänta på att dokumentet ska slutföra laddningen.</td>
    </tr>
    <tr>
      <td><code><var>timeouts.script</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Number`</td>
      <td>Skript som injiceras med [`execute`](https://webdriver.io/docs/api/browser/execute) eller [`executeAsync`](https://webdriver.io/docs/api/browser/executeAsync) kommer att köras tills de når skriptets tidsgräns, som också anges i millisekunder.</td>
    </tr>
  </tbody>
</table>

##### Exempel

```js title="setTimeout.js"
it('should change timeout duration for session with long code duration', async () => {
    await browser.setTimeout({
        'pageLoad': 10000,
        'script': 60000
    });
    // Execute code which takes a long time
    await browser.executeAsync((done) => {
        console.log('Wake me up before you go!');
        setTimeout(done, 59000);
    });
});
```