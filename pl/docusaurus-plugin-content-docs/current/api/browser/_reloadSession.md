---
id: reloadSession
title: reloadSession
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/reloadSession.ts
---

Tworzy nową sesję Selenium z aktualnymi możliwościami. Jest to przydatne, jeśli
testujesz aplikacje o wysokim stopniu stanowości, gdzie potrzebujesz czyścić sesję przeglądarki między
testami w pliku specyfikacji, aby uniknąć tworzenia setek pojedynczych plików testowych z WDIO.
Bądź jednak ostrożny, to polecenie znacząco wpływa na czas testowania, ponieważ tworzenie
nowych sesji Selenium jest bardzo czasochłonne, szczególnie przy korzystaniu z usług chmurowych.

Parametry połączenia, takie jak hostname, port, protokół itp., mogą być dodane obok
browserName, gdy chcesz połączyć się z inną usługą zdalną. Jest to przydatne
w sytuacji, na przykład, gdy rozpoczynasz test w aplikacji natywnej i musisz zweryfikować
dane w aplikacji internetowej.

Jeśli zaczynasz od usługi zdalnej, możesz podać 0.0.0.0 jako hostname, jeśli chcesz
przełączyć się na sterowniki lokalne.

##### Użycie

```js
browser.reloadSession(newCapabilities)
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
      <td><code><var>newCapabilities</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`WebdriverIO.Capabilities`</td>
      <td>nowe możliwości do utworzenia sesji</td>
    </tr>
  </tbody>
</table>

##### Przykład

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