---
id: pause
title: pause
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/pause.ts
---

Wstrzymuje wykonanie na określony czas. Zaleca się nie używać tego polecenia, aby czekać na
pojawienie się elementu. Aby uniknąć zawodnych wyników testów, lepiej używać poleceń takich jak
[`waitForExist`](/docs/api/element/waitForExist) lub innych poleceń waitFor*.

##### Użycie

```js
browser.pause(milliseconds)
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
      <td><code><var>milliseconds</var></code></td>
      <td>`number`</td>
      <td>czas w ms</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js title="pause.js"
it('should pause the execution', async () => {
    const starttime = new Date().getTime()
    await browser.pause(3000)
    const endtime = new Date().getTime()
    console.log(endtime - starttime) // outputs: 3000
});
```