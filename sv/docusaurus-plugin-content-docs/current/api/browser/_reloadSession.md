---
id: reloadSession
title: reloadSession
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/reloadSession.ts
---

Skapar en ny Selenium-session med dina nuvarande kapaciteter. Detta är användbart om du
testar högt tillståndsberoende applikationer där du behöver rensa webbläsarsessionen mellan
testerna i din spec-fil för att undvika att skapa hundratals enskilda testfiler med WDIO.
Var dock försiktig, detta kommando påverkar din testtid enormt eftersom skapandet av
nya Selenium-sessioner är mycket tidskrävande, särskilt när du använder molntjänster.

Anslutningsparametrar som värdnamn, port, protokoll, etc. kan läggas till tillsammans med
browserName när du vill ansluta till en annan fjärrtjänst. Detta är användbart
i en situation, till exempel, där du startar ett test i en nativ app och behöver verifiera
data i en webbapp.

Om du startar från en fjärrtjänst kan du ange 0.0.0.0 som värdnamn om du vill
byta till lokala drivrutiner.

##### Användning

```js
browser.reloadSession(newCapabilities)
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
      <td><code><var>newCapabilities</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`WebdriverIO.Capabilities`</td>
      <td>nya kapaciteter för att skapa en session med</td>
    </tr>
  </tbody>
</table>

##### Exempel

```js title="reloadSync.js"
it('should reload my session with current capabilities', async () => {
    console.log(browser.sessionId) // outputs: e042b3f3cd5a479da4e171825e96e655
    await browser.reloadSession()
    console.log(browser.sessionId) // outputs: 9a0d9bf9d4864160aa982c50cf18a573
})

it('should reload my session with new capabilities', async () => {
    console.log(browser.capabilities.browserName) // outputs: chrome
    await browser.reloadSession({
        browserName: 'firefox'
    })
    console.log(browser.capabilities.browserName) // outputs: firefox
})

it('should reload my session with new remote', async () => {
    console.log(browser.capabilities.browserName) // outputs: chrome
    await browser.reloadSession({
        protocol: 'https',
        host: '0.0.0.1',
        port: 4444,
        path: '/wd/hub',
        browserName: 'firefox'
    })
    console.log(browser.capabilities.browserName) // outputs: firefox
})
```