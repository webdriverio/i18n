---
id: tap
title: tap
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/tap.ts
---

Führt eine Tipp-Geste aus auf:
- entweder dem angegebenen Element. Es wird **automatisch scrollen**, wenn es nicht gefunden werden kann.
- oder dem Bildschirm eines mobilen Geräts durch Angabe von `x` und `y` Koordinaten

Intern verwendet es:
- Element-Tipp:
     - den `click`-Befehl für Web-Umgebungen (Chrome/Safari-Browser oder Hybrid-Apps)
     - den Android [`mobile: clickGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-clickgesture)
oder iOS [`mobile: tap`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-tap) für native Apps, einschließlich des `scrollIntoView`
Befehls für automatisches Scrollen
- Bildschirm-Tipp:
     - den `action`-Befehl für Web-Umgebungen (Chrome/Safari-Browser oder Hybrid-Apps)
     - den Android [`mobile: clickGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-clickgesture)
oder iOS [`mobile: tap`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-tap) für native Apps

Dieser Unterschied macht den `tap`-Befehl zu einer zuverlässigeren Alternative zum `click`-Befehl für mobile Apps.

Für native Apps unterscheidet sich dieser Befehl vom `click`-Befehl, da er <strong>automatisch</strong> zum Element wischt, indem der `scrollIntoView`-Befehl verwendet wird,
der für native Apps mit dem `click`-Befehl nicht unterstützt wird. In Hybrid-Apps oder Web-Umgebungen wird automatisches Scrollen sowohl für `click`- als auch für `tap`-Befehle unterstützt.

:::info

Dieser Befehl funktioniert nur mit den folgenden aktuellen Komponenten:
 - Appium-Server (Version 2.0.0 oder höher)
 - `appium-uiautomator2-driver` (für Android)
 - `appium-xcuitest-driver` (für iOS)

Stellen Sie sicher, dass Ihre lokale oder cloudbasierte Appium-Umgebung regelmäßig aktualisiert wird, um Kompatibilitätsprobleme zu vermeiden.

:::

:::caution Für Bildschirm-Tipps

Wenn Sie auf eine bestimmte Koordinate auf dem Bildschirm tippen möchten und einen Screenshot verwenden, um die Koordinaten zu bestimmen, denken Sie daran, dass
die Koordinaten für iOS auf der Bildschirmgröße des Geräts basieren und nicht auf der Screenshot-Größe. Die Screenshot-Größe ist aufgrund des Gerätepixelverhältnisses größer.
Das durchschnittliche Gerätepixelverhältnis bis zum iPhone 8 und den aktuellen iPads beträgt 2, für iPhones ab dem iPhone X beträgt das Verhältnis 3. Das bedeutet, dass die Screenshot-Größe
2 oder 3 Mal größer ist als die Bildschirmgröße des Geräts, was bedeutet, dass wenn Sie die Koordinaten auf dem Screenshot finden, teilen Sie sie durch das Gerätepixelverhältnis,
um die korrekten Bildschirmkoordinaten zu erhalten. Zum Beispiel:

```js
const screenshotCoordinates = { x: 600, y: 900 };
const dpr = 3; // Beispiel für iPhone 16
const screenCoordinates = {
    x: screenshotCoordinates.x / dpr,
    y: screenshotCoordinates.y / dpr
};
await browser.tap(screenCoordinates);
```

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
      <td>`TapOptions`</td>
      <td>Tipp-Optionen (optional)</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Element-Tipp-Optionen</strong></td>
            </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Zahl (optional, obligatorisch wenn y gesetzt ist) <br /><strong>Nur für BILDSCHIRM-Tipp, nicht für ELEMENT-Tipp</strong></td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Zahl (optional, obligatorisch wenn x gesetzt ist) <br /><strong>Nur für BILDSCHIRM-Tipp, nicht für ELEMENT-Tipp</strong></td>
    </tr>
    <tr>
              <td colspan="3"><strong>Bildschirm-Tipp-Optionen</strong></td>
            </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>Kann einer der Werte `down`, `up`, `left` oder `right` sein, Standard ist `down`. <br /><strong>Nur für ELEMENT-Tipp, nicht für BILDSCHIRM-Tipp</strong><br /><strong>NUR-MOBILE-NATIVE-APP</strong></td>
    </tr>
    <tr>
      <td><code><var>options.maxScrolls</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Die maximale Anzahl von Scrolls, bis die Suche nach dem Element beendet wird, Standard ist `10`. <br /><strong>Nur für ELEMENT-Tipp, nicht für BILDSCHIRM-Tipp</strong><br /><strong>NUR-MOBILE-NATIVE-APP</strong></td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Element`</td>
      <td>Element, das zum Scrollen verwendet wird. Wenn kein Element angegeben wird, wird für iOS der folgende Selektor verwendet: `-ios predicate string:type == "XCUIElementTypeApplication"` und für Android der folgende: `//android.widget.ScrollView'`. Wenn mehrere Elemente dem Standardselektor entsprechen, wird standardmäßig das erste passende Element ausgewählt. <br /><strong>Nur für ELEMENT-Tipp, nicht für BILDSCHIRM-Tipp</strong><br /><strong>NUR-MOBILE-NATIVE-APP</strong></td>
    </tr>
  </tbody>
</table>

##### Beispiele

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