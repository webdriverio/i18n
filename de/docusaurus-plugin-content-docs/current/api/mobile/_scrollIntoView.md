---
id: scrollIntoView
title: scrollIntoView
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/scrollIntoView.ts
---

Scrollt das Element ins Sichtfeld für Desktop/Mobile Web <strong>UND</strong> Mobile Native Apps.

:::info

Das Scrollen für Mobile Native Apps basiert auf dem mobilen `swipe`-Befehl.

Dieser Befehl funktioniert nur mit den folgenden aktuellen Komponenten:
 - Appium Server (Version 2.0.0 oder höher)
 - `appium-uiautomator2-driver` (für Android)
 - `appium-xcuitest-driver` (für iOS)

Stellen Sie sicher, dass Ihre lokale oder Cloud-basierte Appium-Umgebung regelmäßig aktualisiert wird, um Kompatibilitätsprobleme zu vermeiden.

:::

##### Parameter

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
      <td>Optionen für `Element.scrollIntoView()`. Standard für Desktop/Mobile Web: <br/> `{ block: 'start', inline: 'nearest' }` <br /> Standard für Mobile Native App <br /> `{ maxScrolls: 10, scrollDirection: 'down' }`</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Nur Desktop/Mobile Web</strong></td>
            </tr>
    <tr>
      <td><code><var>options.behavior</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>Siehe [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>NUR WEB</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
      <td><code><var>options.block</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>Siehe [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>NUR WEB</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
      <td><code><var>options.inline</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>Siehe [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>NUR WEB</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Nur Mobile Native App</strong></td>
            </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>Kann entweder `down`, `up`, `left` oder `right` sein, Standard ist `up`. <br /><strong>NUR MOBILE-NATIVE-APP</strong></td>
    </tr>
    <tr>
      <td><code><var>options.maxScrolls</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Die maximale Anzahl an Scrolls, bis die Suche nach dem Element beendet wird, Standard ist `10`. <br /><strong>NUR MOBILE-NATIVE-APP</strong></td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Die Dauer in Millisekunden für den Wisch. Standard ist `1500` ms. Je niedriger der Wert, desto schneller der Wisch.<br /><strong>NUR MOBILE-NATIVE-APP</strong></td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Element`</td>
      <td>Element, in dem gescrollt wird. Wenn kein Element angegeben wird, wird für iOS der folgende Selektor verwendet: `-ios predicate string:type == "XCUIElementTypeApplication"` und für Android: `//android.widget.ScrollView'`. Wenn mehrere Elemente dem Standardselektor entsprechen, wird standardmäßig das erste passende Element ausgewählt. <br /> <strong>NUR MOBILE-NATIVE-APP</strong></td>
    </tr>
    <tr>
      <td><code><var>options.percent</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Der Prozentsatz des (Standard-)scrollbaren Elements, der gewischt werden soll. Dies ist ein Wert zwischen 0 und 1. Standard ist `0,95`.<br /><strong>NIEMALS</strong> vom exakten oberen|unteren|linken|rechten Rand des Bildschirms wischen, da Sie beispielsweise die Benachrichtigungsleiste oder andere Betriebssystem-/App-Funktionen auslösen könnten, was zu unerwarteten Ergebnissen führen kann.<br /> <strong>NUR MOBILE-NATIVE-APP</strong></td>
    </tr>
  </tbody>
</table>

##### Beispiele

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