---
id: tap
title: tap
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/tap.ts
---

Esegue un gesto di tap su:
- l'elemento specificato. **Scorrerà automaticamente** se non è possibile trovarlo.
- o sullo schermo di un dispositivo mobile fornendo le coordinate `x` e `y`

Internamente utilizza:
- Tap su elemento:
     - il comando `click` per ambienti Web (browser Chrome/Safari o app ibride)
     - l'Android [`mobile: clickGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-clickgesture)
o iOS [`mobile: tap`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-tap) per app Native, incluso il comando
`scrollIntoView` per lo scorrimento automatico
- Tap sullo schermo:
     - il comando `action` per ambienti Web (browser Chrome/Safari o app ibride)
     - l'Android [`mobile: clickGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-clickgesture)
o iOS [`mobile: tap`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-tap) per app Native

Questa differenza rende il comando `tap` un'alternativa più affidabile al comando `click` per le app mobili.

Per le app Native, questo comando differisce dal comando `click` in quanto <strong>scorrerà automaticamente</strong> fino all'elemento utilizzando il comando `scrollIntoView`,
che non è supportato per le app native con il comando `click`. Nelle app ibride o negli ambienti web, lo scorrimento automatico è supportato sia per i comandi `click` che per i comandi `tap`.

:::info

Questo comando funziona solo con i seguenti componenti aggiornati:
 - Server Appium (versione 2.0.0 o superiore)
 - `appium-uiautomator2-driver` (per Android)
 - `appium-xcuitest-driver` (per iOS)

Assicurati che il tuo ambiente Appium locale o basato su cloud sia regolarmente aggiornato per evitare problemi di compatibilità.

:::

:::caution Per i tap sullo schermo

Se desideri eseguire un tap su coordinate specifiche dello schermo e utilizzi uno screenshot per determinare le coordinate, ricorda che le
coordinate per iOS si basano sulle dimensioni dello schermo del dispositivo e non sulle dimensioni dello screenshot. Le dimensioni dello screenshot sono maggiori a causa del rapporto di pixel del dispositivo.
Il rapporto medio di pixel del dispositivo fino all'iPhone 8 e gli iPad attuali è 2, per gli iPhone a partire dall'iPhone X il rapporto è 3. Ciò significa che le dimensioni
dello screenshot sono 2 o 3 volte più grandi delle dimensioni dello schermo del dispositivo, il che significa che se trovi le coordinate sullo screenshot, dividile per il rapporto
di pixel del dispositivo per ottenere le coordinate corrette dello schermo. Per esempio:

```js
const screenshotCoordinates = { x: 600, y: 900 };
const dpr = 3; // Esempio per iPhone 16
const screenCoordinates = {
    x: screenshotCoordinates.x / dpr,
    y: screenshotCoordinates.y / dpr
};
await browser.tap(screenCoordinates);
```

:::

##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`TapOptions`</td>
      <td>Opzioni tap (opzionale)</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Opzioni tap su elemento</strong></td>
            </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Numero (opzionale, obbligatorio se y è impostato) <br /><strong>Solo per tap su SCHERMO, non per tap su ELEMENTO</strong></td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Numero (opzionale, obbligatorio se x è impostato) <br /><strong>Solo per tap su SCHERMO, non per tap su ELEMENTO</strong></td>
    </tr>
    <tr>
              <td colspan="3"><strong>Opzioni tap su schermo</strong></td>
            </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>Può essere uno tra `down`, `up`, `left` o `right`, il valore predefinito è `down`. <br /><strong>Solo per tap su ELEMENTO, non per tap su SCHERMO</strong><br /><strong>SOLO PER APP NATIVE MOBILI</strong></td>
    </tr>
    <tr>
      <td><code><var>options.maxScrolls</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Il numero massimo di scorrimenti fino a quando smetterà di cercare l'elemento, il valore predefinito è `10`. <br /><strong>Solo per tap su ELEMENTO, non per tap su SCHERMO</strong><br /><strong>SOLO PER APP NATIVE MOBILI</strong></td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Element`</td>
      <td>Elemento utilizzato per scorrere all'interno. Se non viene fornito alcun elemento, utilizzerà il seguente selettore per iOS `-ios predicate string:type == "XCUIElementTypeApplication"` e il seguente per Android `//android.widget.ScrollView'`. Se più elementi corrispondono al selettore predefinito, per impostazione predefinita sceglierà il primo elemento corrispondente. <br /><strong>Solo per tap su ELEMENTO, non per tap su SCHERMO</strong><br /><strong>SOLO PER APP NATIVE MOBILI</strong></td>
    </tr>
  </tbody>
</table>

##### Examples

```js title="element.tap.example.js"
it('should be able to tap an on element', async () => {
    const elem = $('~myElement')
    // It will automatically scroll to the element if it's not already in the viewport
    await elem.tap()
})

```

```js title="element.tap.scroll.options.example.js"
it('should be able to swipe right 3 times in a custom scroll areas to an element and tap on the element', async () => {
    const elem = $('~myElement')
    // Swipe right 3 times in the custom scrollable element to find the element
    await elem.tap({
        direction: 'right',
        maxScrolls: 3,
        scrollableElement: $('#scrollable')
    })
})

```

```js title="screen.tap.example.js"
it('should be able to tap on screen coordinates', async () => {
    await browser.tap({ x: 200, y: 400 })
})
```