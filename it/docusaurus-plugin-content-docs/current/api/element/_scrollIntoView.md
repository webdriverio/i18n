---
id: scrollIntoView
title: scrollIntoView
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/scrollIntoView.ts
---

Scorri l'elemento nel viewport per Desktop/Mobile Web <strong>E</strong> App Native Mobile.

:::info

Lo scorrimento per App Native Mobile viene effettuato in base al comando mobile `swipe`.

:::

##### Utilizzo

```js
$(selector).scrollIntoView({ behavior, block, inline, direction, maxScrolls, duration, scrollableElement, percent })
```

##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`object, boolean`</td>
      <td>opzioni per `Element.scrollIntoView()`. Predefinito per desktop/mobile web: <br/> `{ block: 'start', inline: 'nearest' }` <br /> Predefinito per App Native Mobile <br /> `{ maxScrolls: 10, scrollDirection: 'down' }`</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Solo Desktop/Mobile Web</strong></td>
            </tr>
    <tr>
      <td><code><var>options.behavior</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`string`</td>
      <td>Vedi [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>SOLO-WEB</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
      <td><code><var>options.block</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`string`</td>
      <td>Vedi [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>SOLO-WEB</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
      <td><code><var>options.inline</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`string`</td>
      <td>Vedi [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>SOLO-WEB</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Solo App Native Mobile</strong></td>
            </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`string`</td>
      <td>Può essere uno tra `down`, `up`, `left` o `right`, il valore predefinito è `up`. <br /><strong>SOLO-APP-NATIVE-MOBILE</strong></td>
    </tr>
    <tr>
      <td><code><var>options.maxScrolls</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`number`</td>
      <td>Il numero massimo di scorrimenti prima di interrompere la ricerca dell'elemento, il valore predefinito è `10`. <br /><strong>SOLO-APP-NATIVE-MOBILE</strong></td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`number`</td>
      <td>La durata in millisecondi per lo swipe. Il valore predefinito è `1500` ms. Più basso è il valore, più veloce sarà lo swipe.<br /><strong>SOLO-APP-NATIVE-MOBILE</strong></td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Element`</td>
      <td>Elemento utilizzato per scorrere all'interno. Se non viene fornito alcun elemento, verrà utilizzato il seguente selettore per iOS `-ios predicate string:type == "XCUIElementTypeApplication"` e il seguente per Android `//android.widget.ScrollView'`. Se più elementi corrispondono al selettore predefinito, per impostazione predefinita verrà scelto il primo elemento corrispondente. <br /> <strong>SOLO-APP-NATIVE-MOBILE</strong></td>
    </tr>
    <tr>
      <td><code><var>options.percent</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`number`</td>
      <td>La percentuale dell'elemento scrollabile (predefinito) da scorrere. Questo è un valore compreso tra 0 e 1. Il valore predefinito è `0.95`.<br /><strong>MAI</strong> scorrere dall'estremità superiore|inferiore|sinistra|destra dello schermo, potresti attivare ad esempio la barra delle notifiche o altre funzionalità del sistema operativo/app che possono portare a risultati imprevisti.<br /> <strong>SOLO-APP-NATIVE-MOBILE</strong></td>
    </tr>
  </tbody>
</table>

##### Esempi

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