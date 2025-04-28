---
id: swipe
title: swipe
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/swipe.ts
---

Scorri in una direzione specifica all'interno del viewport o dell'elemento per Desktop/Mobile Web <strong>E</strong> App Native Mobile.

:::info

Lo scorrimento per App Native Mobile è basato sul protocollo W3C-actions, simulando la pressione e il movimento di un dito.
Questo è diverso dai comandi [`mobile: scrollGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-scrollgesture) per Android
o [`mobile: scroll`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-scroll) per iOS che sono basati sul protocollo del Driver Appium e sono
disponibili solo per piattaforme mobili nel contesto NATIVE.

Questo comando funziona solo con i seguenti componenti aggiornati:
 - Server Appium (versione 2.0.0 o superiore)
 - `appium-uiautomator2-driver` (per Android)
 - `appium-xcuitest-driver` (per iOS)

Assicurati che il tuo ambiente Appium locale o basato su cloud sia regolarmente aggiornato per evitare problemi di compatibilità.

:::

:::caution Scorrimento basato su coordinate

Evita di utilizzare le opzioni `from` e `to` a meno che non sia assolutamente necessario. Queste sono specifiche per dispositivo e potrebbero non funzionare in modo coerente su tutti i dispositivi.
Utilizza l'opzione `scrollableElement` per scorrimenti affidabili all'interno di un elemento.

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
      <td>opzioni per `browser.swipe()`. Default per desktop/mobile web: <br/> `{ direction: 'up', duration: 1500, percent: 0.95, scrollableElement: WebdriverIO.Element }`</td>
    </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>Può essere uno tra `down`, `up`, `left` o `right`, il predefinito è `up`. <br /><strong>SOLO-APP-NATIVE-MOBILE</strong></td>
    </tr>
    <tr>
                      <td colspan="3"><strong>Down</strong><br /><strong>Punto di partenza:</strong><br/>Posizioni il dito verso la parte superiore dello schermo.<br/><strong>Movimento:</strong><br/>Fai scorrere il dito verso il basso verso la parte inferiore dello schermo.<br/><strong>Azione:</strong><br/>Questo varia anche in base al contesto:<br />- Nella schermata iniziale o nelle applicazioni, in genere scorre il contenuto verso l'alto.<br />- Dal bordo superiore, spesso apre il pannello delle notifiche o le impostazioni rapide.<br />- Nei browser o nelle app di lettura, può essere utilizzato per scorrere i contenuti.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>Left</strong><br /><strong>Punto di partenza:</strong><br/>Posizioni il dito sul lato destro dello schermo.<br/><strong>Movimento:</strong><br/>Fai scorrere il dito orizzontalmente verso sinistra.><br/><strong>Azione:</strong><br/>La risposta a questo gesto dipende dall'applicazione:<br />- Può passare all'elemento successivo in un carosello o in un set di immagini.<br />- In un contesto di navigazione, potrebbe tornare alla pagina precedente o chiudere la vista corrente.<br />- Nella schermata iniziale, di solito passa al desktop o alla schermata virtuale successiva.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>Right</strong><br /><strong>Punto di partenza:</strong><br/>Posizioni il dito sul lato sinistro dello schermo.<br/><strong>Movimento:</strong><br/>Fai scorrere il dito orizzontalmente verso destra.<br/><strong>Azione:</strong><br/>Simile allo scorrimento verso sinistra, ma nella direzione opposta:<br />-- Spesso passa all'elemento precedente in un carosello o galleria.<br />- Può essere utilizzato per aprire menu laterali o cassetti di navigazione nelle app.<br />- Nella schermata iniziale, in genere passa al desktop virtuale precedente.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>Up</strong><br /><strong>Punto di partenza:</strong><br/>Posizioni il dito verso la parte inferiore dello schermo.<br/><strong>Movimento:</strong><br/>Fai scorrere il dito verso l'alto verso la parte superiore dello schermo.><br/><strong>Azione:</strong><br/>A seconda del contesto, possono verificarsi diverse azioni:<br />- Nella schermata iniziale o in un elenco, questo di solito scorre il contenuto verso il basso.<br />- In un'app a schermo intero, potrebbe aprire opzioni aggiuntive o il cassetto delle app.<br />- Su determinate interfacce, potrebbe attivare un'azione di 'aggiornamento' o aprire una barra di ricerca.</td>
            </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>La durata in millisecondi per lo scorrimento. Il valore predefinito è `1500` ms. Più basso è il valore, più veloce sarà lo scorrimento.</td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Element`</td>
      <td>Elemento utilizzato per scorrere all'interno. Se non viene fornito alcun elemento, utilizzerà il seguente selettore per iOS `-ios predicate string:type == "XCUIElementTypeApplication"` e il seguente per Android `//android.widget.ScrollView'`. Se più elementi corrispondono al selettore predefinito, per impostazione predefinita selezionerà il primo elemento corrispondente. <br /> <strong>SOLO-APP-NATIVE-MOBILE</strong></td>
    </tr>
    <tr>
      <td><code><var>options.percent</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>La percentuale dell'elemento scorrevole (predefinito) da scorrere. È un valore compreso tra 0 e 1. Il valore predefinito è `0.95`.<br /><strong>MAI</strong> scorrere dall'esatto alto|basso|sinistra|destra dello schermo, potresti attivare ad esempio la barra delle notifiche o altre funzionalità del sistema operativo/app che possono portare a risultati imprevisti.<br />Questo non ha effetto se vengono forniti `from` e `to`.</td>
    </tr>
    <tr>
              <td colspan="3"><strong>I valori sottostanti hanno effetto <strong>SOLO</strong> se `scrollableElement` <strong>NON</strong> è fornito, altrimenti vengono ignorati.</strong></td>
            </tr>
    <tr>
      <td><code><var>options.from</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`object`</td>
      <td>Le coordinate x e y dell'inizio dello scorrimento. Se viene fornito un `scrollableElement`, queste coordinate non avranno effetto.</td>
    </tr>
    <tr>
      <td><code><var>options.from.x</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>La coordinata x dell'inizio dello scorrimento.</td>
    </tr>
    <tr>
      <td><code><var>options.from.y</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>La coordinata y dell'inizio dello scorrimento.</td>
    </tr>
    <tr>
      <td><code><var>options.to</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`object`</td>
      <td>Le coordinate x e y della fine dello scorrimento. Se viene fornito un `scrollableElement`, queste coordinate non avranno effetto.</td>
    </tr>
    <tr>
      <td><code><var>options.to.x</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>La coordinata x della fine dello scorrimento.</td>
    </tr>
    <tr>
      <td><code><var>options.to.y</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>La coordinata y della fine dello scorrimento.</td>
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