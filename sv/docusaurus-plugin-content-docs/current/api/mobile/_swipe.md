---
id: swipe
title: svep
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/swipe.ts
---

Svep i en specifik riktning inom viewport eller element för Desktop/Mobil Webb <strong>OCH</strong> Mobila Applikationer.

:::info

Svepning för Mobila Applikationer baseras på W3C-actions protokollet, som simulerar ett fingertryck och rörelse.
Detta skiljer sig från [`mobile: scrollGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-scrollgesture) för Android
eller [`mobile: scroll`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-scroll) för iOS-kommandot som baseras på Appium Driver-protokollet och är
endast tillgängligt för mobila plattformar i NATIVE-kontext.

Detta kommando fungerar endast med följande uppdaterade komponenter:
 - Appium server (version 2.0.0 eller högre)
 - `appium-uiautomator2-driver` (för Android)
 - `appium-xcuitest-driver` (för iOS)

Se till att din lokala eller molnbaserade Appium-miljö uppdateras regelbundet för att undvika kompatibilitetsproblem.

:::

:::caution Svepning baserad på koordinater

Undvik att använda alternativen `from` och `to` om det inte är absolut nödvändigt. Dessa är enhetsspecifika och fungerar kanske inte konsekvent på olika enheter.
Använd alternativet `scrollableElement` för pålitliga svep inom ett element.

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
      <td>`object, boolean`</td>
      <td>alternativ för `browser.swipe()`. Standard för desktop/mobil webb: <br/> `{ direction: 'up', duration: 1500, percent: 0.95, scrollableElement: WebdriverIO.Element }`</td>
    </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>Kan vara en av `down`, `up`, `left` eller `right`, standard är `up`. <br /><strong>ENDAST-MOBIL-NATIV-APP</strong></td>
    </tr>
    <tr>
                      <td colspan="3"><strong>Down</strong><br /><strong>Startpunkt:</strong><br/>Du placerar ditt finger mot toppen av skärmen.<br/><strong>Rörelse:</strong><br/>Du glider fingret nedåt mot botten av skärmen.<br/><strong>Handling:</strong><br/>Detta varierar också beroende på sammanhang:<br />- På hemskärmen eller i applikationer, scrollar det vanligtvis innehållet uppåt.<br />- Från övre kanten öppnar det ofta aviseringspanelen eller snabbinställningar.<br />- I webbläsare eller läsappar kan det användas för att bläddra genom innehåll.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>Left</strong><br /><strong>Startpunkt:</strong><br/>Du placerar ditt finger på höger sida av skärmen.<br/><strong>Rörelse:</strong><br/>Du glider fingret horisontellt till vänster.><br/><strong>Handling:</strong><br/>Svaret på denna gest beror på applikationen:<br />- Det kan flytta till nästa objekt i en karusell eller en uppsättning bilder.<br />- I ett navigationssammanhang kan det gå tillbaka till föregående sida eller stänga den aktuella vyn.<br />- På hemskärmen växlar det vanligtvis till nästa virtuella skrivbord eller skärm.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>Right</strong><br /><strong>Startpunkt:</strong><br/>Du placerar ditt finger på vänster sida av skärmen.<br/><strong>Rörelse:</strong><br/>Du glider fingret horisontellt till höger.<br/><strong>Handling:</strong><br/>Liknande att svepa åt vänster, men i motsatt riktning:<br />-- Det flyttar ofta till föregående objekt i en karusell eller galleri.<br />- Kan användas för att öppna sidomenyer eller navigeringslådor i appar.<br />- På hemskärmen växlar det vanligtvis till föregående virtuella skrivbord.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>Up</strong><br /><strong>Startpunkt:</strong><br/>Du placerar ditt finger mot botten av skärmen.<br/><strong>Rörelse:</strong><br/>Du glider fingret uppåt mot toppen av skärmen.><br/><strong>Handling:</strong><br/>Beroende på sammanhanget kan olika åtgärder inträffa:<br />- På hemskärmen eller i en lista, scrollar detta vanligtvis innehållet nedåt.<br />- I en fullskärmsapp kan det öppna ytterligare alternativ eller applådan.<br />- På vissa gränssnitt kan det utlösa en "uppdatera"-åtgärd eller öppna ett sökfält.</td>
            </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Varaktigheten i millisekunder för svepningen. Standard är `1500` ms. Ju lägre värde, desto snabbare svepning.</td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Element`</td>
      <td>Element som används för att svepa inom. Om inget element anges kommer den att använda följande väljare för iOS `-ios predicate string:type == "XCUIElementTypeApplication"` och följande för Android `//android.widget.ScrollView'`. Om flera element matchar standardväljaren kommer den som standard att välja det första matchande elementet. <br /> <strong>ENDAST-MOBIL-NATIV-APP</strong></td>
    </tr>
    <tr>
      <td><code><var>options.percent</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Procentandelen av det (standard) scrollbara elementet att svepa. Detta är ett värde mellan 0 och 1. Standard är `0.95`.<br /><strong>ALDRIG</strong> svep från exakt topp|botten|vänster|höger på skärmen, du kan utlösa till exempel aviseringsfältet eller andra OS/App-funktioner som kan leda till oväntade resultat.<br />Detta har ingen effekt om `from` och `to` tillhandahålls.</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Värdena nedan har <strong>ENDAST</strong> effekt om `scrollableElement` <strong>INTE</strong> tillhandahålls, annars ignoreras de.</strong></td>
            </tr>
    <tr>
      <td><code><var>options.from</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`object`</td>
      <td>X- och y-koordinaterna för början av svepningen. Om ett `scrollableElement` tillhandahålls har dessa koordinater ingen effekt.</td>
    </tr>
    <tr>
      <td><code><var>options.from.x</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>X-koordinaten för början av svepningen.</td>
    </tr>
    <tr>
      <td><code><var>options.from.y</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Y-koordinaten för början av svepningen.</td>
    </tr>
    <tr>
      <td><code><var>options.to</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`object`</td>
      <td>X- och y-koordinaterna för slutet av svepningen. Om ett `scrollableElement` tillhandahålls har dessa koordinater ingen effekt.</td>
    </tr>
    <tr>
      <td><code><var>options.to.x</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>X-koordinaten för slutet av svepningen.</td>
    </tr>
    <tr>
      <td><code><var>options.to.y</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Y-koordinaten för slutet av svepningen.</td>
    </tr>
  </tbody>
</table>

##### Examples

```js title="swipe.js"
it('should execute a default swipe', async () => {
    // Default will be a swipe from the bottom to the top, meaning it will swipe UP
    await browser.swipe();
});

```

```js title="swipe.with.options.js"
it('should execute a swipe with options', async () => {
    await browser.swipe({
        direction: 'left',                  // Swipe from right to left
        duration: 5000,                     // Last for 5 seconds
        percent: 0.5,                       // Swipe 50% of the scrollableElement
        scrollableElement: $('~carousel'),  // The element to swipe within
    })
});
```