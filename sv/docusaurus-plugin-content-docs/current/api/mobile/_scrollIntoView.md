---
id: scrollIntoView
title: scrollIntoView
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/scrollIntoView.ts
---

Rulla element till synlig vy för Desktop/Mobil Webb <strong>OCH</strong> Mobila Native-appar.

:::info

Rullning för Mobila Native-appar görs baserat på mobilkommandot `swipe`.

Detta kommando fungerar endast med följande uppdaterade komponenter:
 - Appium-server (version 2.0.0 eller högre)
 - `appium-uiautomator2-driver` (för Android)
 - `appium-xcuitest-driver` (för iOS)

Se till att din lokala eller molnbaserade Appium-miljö uppdateras regelbundet för att undvika kompatibilitetsproblem.

:::

##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`object, boolean`</td>
      <td>alternativ för `Element.scrollIntoView()`. Standard för desktop/mobil webb: <br/> `{ block: 'start', inline: 'nearest' }` <br /> Standard för Mobil Native-app <br /> `{ maxScrolls: 10, scrollDirection: 'down' }`</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Endast Desktop/Mobil Webb</strong></td>
            </tr>
    <tr>
      <td><code><var>options.behavior</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`string`</td>
      <td>Se [MDN Referens](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>ENDAST-WEBB</strong> (Desktop/Mobil)</td>
    </tr>
    <tr>
      <td><code><var>options.block</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`string`</td>
      <td>Se [MDN Referens](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>ENDAST-WEBB</strong> (Desktop/Mobil)</td>
    </tr>
    <tr>
      <td><code><var>options.inline</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`string`</td>
      <td>Se [MDN Referens](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>ENDAST-WEBB</strong> (Desktop/Mobil)</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Endast Mobil Native-App</strong></td>
            </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`string`</td>
      <td>Kan vara en av `down`, `up`, `left` eller `right`, standard är `up`. <br /><strong>ENDAST-MOBIL-NATIVE-APP</strong></td>
    </tr>
    <tr>
      <td><code><var>options.maxScrolls</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`number`</td>
      <td>Maximalt antal rullningar tills sökningen efter elementet avbryts, standard är `10`. <br /><strong>ENDAST-MOBIL-NATIVE-APP</strong></td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`number`</td>
      <td>Varaktighet i millisekunder för svepningen. Standard är `1500` ms. Ju lägre värde, desto snabbare svepning.<br /><strong>ENDAST-MOBIL-NATIVE-APP</strong></td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Element`</td>
      <td>Element som används för att rulla inom. Om inget element anges kommer den att använda följande väljare för iOS `-ios predicate string:type == "XCUIElementTypeApplication"` och följande för Android `//android.widget.ScrollView'`. Om flera element matchar standardväljaren kommer den som standard att välja det första matchande elementet. <br /> <strong>ENDAST-MOBIL-NATIVE-APP</strong></td>
    </tr>
    <tr>
      <td><code><var>options.percent</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`number`</td>
      <td>Procentandel av det (standard) rullbara elementet att svepa. Detta är ett värde mellan 0 och 1. Standard är `0.95`.<br /><strong>ALDRIG</strong> svep från exakt topp|botten|vänster|höger av skärmen, du kan utlösa till exempel notifikationsfältet eller andra OS/App-funktioner som kan leda till oväntade resultat.<br /> <strong>ENDAST-MOBIL-NATIVE-APP</strong></td>
    </tr>
  </tbody>
</table>

##### Exempel

```js title="desktop.mobile.web.scrollIntoView.js"
it('should demonstrate the desktop/mobile web scrollIntoView command', async () => {
    const elem = await $('#myElement');
    // scroll to specific element
    await elem.scrollIntoView();
    // center element within the viewport
    await elem.scrollIntoView({ block: 'center', inline: 'center' });
});

```

```js title="mobile.native.app.scrollIntoView.js"
it('should demonstrate the mobile native app scrollIntoView command', async () => {
    const elem = await $('#myElement');
    // scroll to a specific element in the default scrollable element for Android or iOS for a maximum of 10 scrolls
    await elem.scrollIntoView();
    // Scroll to the left in the scrollable element called '#scrollable' for a maximum of 5 scrolls
    await elem.scrollIntoView({
        direction: 'left',
        maxScrolls: 5,
        scrollableElement: $('#scrollable')
    });
});
```