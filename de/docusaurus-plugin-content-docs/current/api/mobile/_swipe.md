---
id: swipe
title: wischen
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/swipe.ts
description: Wischgeste in einer bestimmten Richtung ausführen
---

Wische in eine bestimmte Richtung innerhalb des Viewports oder Elements für Desktop/Mobile Web <strong>UND</strong> Mobile Native Apps.

:::info

Das Wischen für Mobile Native Apps basiert auf dem W3C-Actions-Protokoll und simuliert einen Fingerdruck und eine Bewegung.
Dies unterscheidet sich vom [`mobile: scrollGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-scrollgesture) für Android
oder [`mobile: scroll`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-scroll) für iOS-Befehle, die auf dem Appium Driver Protokoll basieren und
nur für mobile Plattformen im NATIVE-Kontext verfügbar sind.

Dieser Befehl funktioniert nur mit den folgenden aktuellen Komponenten:
 - Appium Server (Version 2.0.0 oder höher)
 - `appium-uiautomator2-driver` (für Android)
 - `appium-xcuitest-driver` (für iOS)

Stelle sicher, dass deine lokale oder Cloud-basierte Appium-Umgebung regelmäßig aktualisiert wird, um Kompatibilitätsprobleme zu vermeiden.

:::

:::caution Wischen basierend auf Koordinaten

Vermeide die Verwendung von `from` und `to` Optionen, es sei denn, es ist unbedingt notwendig. Diese sind gerätespezifisch und funktionieren möglicherweise nicht konsistent auf verschiedenen Geräten.
Verwende die Option `scrollableElement` für zuverlässige Wischgesten innerhalb eines Elements.

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
      <td>Optionen für `browser.swipe()`. Standard für Desktop/Mobile Web: <br/> `{ direction: 'up', duration: 1500, percent: 0.95, scrollableElement: WebdriverIO.Element }`</td>
    </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>Kann einer von `down`, `up`, `left` oder `right` sein, Standard ist `up`. <br /><strong>NUR-FÜR-MOBILE-NATIVE-APPS</strong></td>
    </tr>
    <tr>
                      <td colspan="3"><strong>Down (Nach unten)</strong><br /><strong>Ausgangspunkt:</strong><br/>Du platzierst deinen Finger in Richtung der Oberseite des Bildschirms.<br/><strong>Bewegung:</strong><br/>Du gleitest mit deinem Finger nach unten in Richtung der Unterseite des Bildschirms.<br/><strong>Aktion:</strong><br/>Dies variiert je nach Kontext:<br />- Auf dem Startbildschirm oder in Anwendungen scrollt es typischerweise den Inhalt nach oben.<br />- Vom oberen Rand aus öffnet es oft das Benachrichtigungsfenster oder Schnelleinstellungen.<br />- In Browsern oder Lese-Apps kann es zum Scrollen durch Inhalte verwendet werden.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>Left (Nach links)</strong><br /><strong>Ausgangspunkt:</strong><br/>Du platzierst deinen Finger auf der rechten Seite des Bildschirms.<br/><strong>Bewegung:</strong><br/>Du gleitest mit deinem Finger horizontal nach links.><br/><strong>Aktion:</strong><br/>Die Reaktion auf diese Geste hängt von der Anwendung ab:<br />- Sie kann zum nächsten Element in einem Karussell oder einem Satz von Bildern wechseln.<br />- In einem Navigationskontext könnte sie zur vorherigen Seite zurückkehren oder die aktuelle Ansicht schließen.<br />- Auf dem Startbildschirm wechselt sie normalerweise zum nächsten virtuellen Desktop oder Bildschirm.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>Right (Nach rechts)</strong><br /><strong>Ausgangspunkt:</strong><br/>Du platzierst deinen Finger auf der linken Seite des Bildschirms.<br/><strong>Bewegung:</strong><br/>Du gleitest mit deinem Finger horizontal nach rechts.<br/><strong>Aktion:</strong><br/>Ähnlich wie beim Wischen nach links, aber in die entgegengesetzte Richtung:<br />-- Es bewegt sich oft zum vorherigen Element in einem Karussell oder einer Galerie.<br />- Kann verwendet werden, um Seitenmenüs oder Navigationsschubladen in Apps zu öffnen.<br />- Auf dem Startbildschirm wechselt es typischerweise zum vorherigen virtuellen Desktop.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>Up (Nach oben)</strong><br /><strong>Ausgangspunkt:</strong><br/>Du platzierst deinen Finger in Richtung der Unterseite des Bildschirms.<br/><strong>Bewegung:</strong><br/>Du gleitest mit deinem Finger nach oben in Richtung der Oberseite des Bildschirms.><br/><strong>Aktion:</strong><br/>Je nach Kontext können verschiedene Aktionen auftreten:<br />- Auf dem Startbildschirm oder in einer Liste scrollt dies normalerweise den Inhalt nach unten.<br />- In einer Vollbild-App könnte es zusätzliche Optionen oder die App-Schublade öffnen.<br />- Bei bestimmten Schnittstellen könnte es eine 'Aktualisieren'-Aktion auslösen oder eine Suchleiste öffnen.</td>
            </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Die Dauer der Wischgeste in Millisekunden. Standard ist `1500` ms. Je niedriger der Wert, desto schneller die Wischgeste.</td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Element`</td>
      <td>Element, innerhalb dessen gewischt wird. Wenn kein Element angegeben wird, wird für iOS der folgende Selektor verwendet `-ios predicate string:type == "XCUIElementTypeApplication"` und für Android `//android.widget.ScrollView'`. Wenn mehrere Elemente mit dem Standardselektor übereinstimmen, wird standardmäßig das erste übereinstimmende Element ausgewählt. <br /> <strong>NUR-FÜR-MOBILE-NATIVE-APPS</strong></td>
    </tr>
    <tr>
      <td><code><var>options.percent</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Der Prozentsatz des (Standard-)scrollbaren Elements, der gewischt werden soll. Dies ist ein Wert zwischen 0 und 1. Standard ist `0.95`.<br /><strong>NIEMALS</strong> vom exakten oberen|unteren|linken|rechten Rand des Bildschirms wischen, da du zum Beispiel die Benachrichtigungsleiste oder andere Betriebssystem-/App-Funktionen auslösen könntest, was zu unerwarteten Ergebnissen führen kann.<br />Dies hat keine Auswirkung, wenn `from` und `to` angegeben werden.</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Die folgenden Werte haben <strong>NUR</strong> eine Auswirkung, wenn das `scrollableElement` <strong>NICHT</strong> angegeben ist, andernfalls werden sie ignoriert.</strong></td>
            </tr>
    <tr>
      <td><code><var>options.from</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`object`</td>
      <td>Die x- und y-Koordinaten des Beginns der Wischgeste. Wenn ein `scrollableElement` angegeben ist, haben diese Koordinaten keine Auswirkung.</td>
    </tr>
    <tr>
      <td><code><var>options.from.x</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Die x-Koordinate des Beginns der Wischgeste.</td>
    </tr>
    <tr>
      <td><code><var>options.from.y</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Die y-Koordinate des Beginns der Wischgeste.</td>
    </tr>
    <tr>
      <td><code><var>options.to</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`object`</td>
      <td>Die x- und y-Koordinaten des Endes der Wischgeste. Wenn ein `scrollableElement` angegeben ist, haben diese Koordinaten keine Auswirkung.</td>
    </tr>
    <tr>
      <td><code><var>options.to.x</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Die x-Koordinate des Endes der Wischgeste.</td>
    </tr>
    <tr>
      <td><code><var>options.to.y</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Die y-Koordinate des Endes der Wischgeste.</td>
    </tr>
  </tbody>
</table>

##### Beispiele

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