---
id: tap
title: tap
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/tap.ts
---

Utför en tap-gest på:
- eller det angivna elementet. Den kommer **automatiskt att scrolla** om det inte kan hittas.
- eller skärmen på en mobil enhet genom att ange `x` och `y` koordinater

Internt använder den:
- Element tap:
     - kommandot `click` för webbmiljöer (Chrome/Safari-webbläsare eller hybridappar)
     - Android [`mobile: clickGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-clickgesture)
eller iOS [`mobile: tap`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-tap) för nativa appar, inklusive kommandot `scrollIntoView`
för automatisk scrollning
- Skärm tap:
     - kommandot `action` för webbmiljöer (Chrome/Safari-webbläsare eller hybridappar)
     - Android [`mobile: clickGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-clickgesture)
eller iOS [`mobile: tap`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-tap) för nativa appar

Denna skillnad gör `tap`-kommandot till ett mer pålitligt alternativ till `click`-kommandot för mobila appar.

För nativa appar skiljer sig detta kommando från `click`-kommandot eftersom det <strong>automatiskt sveper</strong> till elementet med hjälp av `scrollIntoView`-kommandot,
vilket inte stöds för nativa appar med `click`-kommandot. I hybridappar eller webbmiljöer stöds automatisk scrollning för både `click` och `tap`-kommandona.

:::info

Detta kommando fungerar endast med följande uppdaterade komponenter:
 - Appium-server (version 2.0.0 eller högre)
 - `appium-uiautomator2-driver` (för Android)
 - `appium-xcuitest-driver` (för iOS)

Se till att din lokala eller molnbaserade Appium-miljö uppdateras regelbundet för att undvika kompatibilitetsproblem.

:::

:::caution För skärmtryckningar

Om du vill trycka på en specifik koordinat på skärmen och du använder en skärmdump för att bestämma koordinaterna, kom ihåg att
koordinaterna för iOS baseras på enhetens skärmstorlek, inte skärmdumpens storlek. Skärmdumpens storlek är större på grund av enhetens pixelförhållande.
Det genomsnittliga pixelförhållandet fram till iPhone 8 och de nuvarande iPads är 2, för iPhones från iPhone X är förhållandet 3. Detta innebär att skärmdumpens
storlek är 2 eller 3 gånger större än enhetens skärmstorlek, vilket betyder att om du hittar koordinaterna på skärmdumpen, dividera dem med enhetens pixelförhållande
för att få korrekta skärmkoordinater. Till exempel:

```js
const screenshotCoordinates = { x: 600, y: 900 };
const dpr = 3; // Exempel för iPhone 16
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
      <td>Tap-alternativ (valfritt)</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Element tap-alternativ</strong></td>
            </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Nummer (valfritt, obligatoriskt om y är inställt) <br /><strong>Endast för SKÄRM-tap, inte för ELEMENT-tap</strong></td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Nummer (valfritt, obligatoriskt om x är inställt) <br /><strong>Endast för SKÄRM-tap, inte för ELEMENT-tap</strong></td>
    </tr>
    <tr>
              <td colspan="3"><strong>Skärm tap-alternativ</strong></td>
            </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>Kan vara en av `down`, `up`, `left` eller `right`, standard är `down`. <br /><strong>Endast för ELEMENT-tap, inte för SKÄRM-tap</strong><br /><strong>ENDAST-MOBIL-NATIV-APP</strong></td>
    </tr>
    <tr>
      <td><code><var>options.maxScrolls</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Det maximala antalet scrollningar tills sökningen efter elementet avbryts, standard är `10`. <br /><strong>Endast för ELEMENT-tap, inte för SKÄRM-tap</strong><br /><strong>ENDAST-MOBIL-NATIV-APP</strong></td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Element`</td>
      <td>Element som används för att scrolla inom. Om inget element anges kommer den att använda följande väljare för iOS `-ios predicate string:type == "XCUIElementTypeApplication"` och följande för Android `//android.widget.ScrollView'`. Om flera element matchar standardväljaren kommer den som standard att välja det första matchande elementet. <br /><strong>Endast för ELEMENT-tap, inte för SKÄRM-tap</strong><br /><strong>ENDAST-MOBIL-NATIV-APP</strong></td>
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