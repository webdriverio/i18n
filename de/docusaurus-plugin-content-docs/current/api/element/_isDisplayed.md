---
id: isDisplayed
title: isDisplayed
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isDisplayed.ts
---

Gibt true zurück, wenn das ausgewählte DOM-Element angezeigt wird (auch wenn das Element außerhalb des Viewports liegt). Es verwendet die [`checkVisibility`](https://developer.mozilla.org/en-US/docs/Web/API/Element/checkVisibility#visibilityproperty) Methode des Browsers, um zu bestimmen, ob ein Element angezeigt wird oder nicht. Da WebdriverIO wie ein echter Benutzer agiert, sind die Standardwerte für die Flags `contentVisibilityAuto`, `opacityProperty` und `visibilityProperty` auf `true` gesetzt, um ein strengeres Verhalten zu bevorzugen. Das bedeutet, dass der Befehl prüft, ob das Element aufgrund des Wertes seiner Eigenschaften `content-visibility`, `opacity` und `visibility` sichtbar ist.

Wenn Sie auch überprüfen möchten, ob sich das Element innerhalb des Viewports befindet, geben Sie das Flag `withinViewport` an den Befehl.

:::info

Im Gegensatz zu anderen Element-Befehlen wartet WebdriverIO nicht darauf, dass das Element existiert, um diesen Befehl auszuführen.

:::

WebdriverIO verwendet bei Browser-Tests ein [benutzerdefiniertes Skript](https://github.com/webdriverio/webdriverio/blob/59d349ca847950354d02b9e548f60cc50e7871f0/packages/webdriverio/src/scripts/isElementDisplayed.ts), das speziell entwickelt wurde, um die Sichtbarkeit von Elementen zu bewerten. Dieses Skript ist entscheidend, um festzustellen, ob ein Element auf der Seite angezeigt wird. Bei nativen mobilen Tests mit Appium verlässt sich WebdriverIO hingegen auf den [`isElementDisplayed`](https://appium.io/docs/en/2.1/reference/interfaces/appium_types.ExternalDriver/#elementdisplayed) Befehl von Appium. Dieser Befehl bewertet die Sichtbarkeit von Elementen anhand von Kriterien, die vom zugrunde liegenden Appium-Treiber festgelegt wurden, um genaue und treiberspezifische Bewertungen für mobile Anwendungen zu gewährleisten.

##### Usage

```js
$(selector).isDisplayed(withinViewport, contentVisibilityAuto, opacityProperty, visibilityProperty)
```

##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>withinViewport=false</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>`true` to check if the element is within the viewport. `false` by default.</td>
    </tr>
    <tr>
      <td><code><var>contentVisibilityAuto=true</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>`true` to check if the element content-visibility property has (or inherits) the value auto, and it is currently skipping its rendering. `true` by default.</td>
    </tr>
    <tr>
      <td><code><var>opacityProperty=true</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>`true` to check if the element opacity property has (or inherits) a value of 0. `true` by default.</td>
    </tr>
    <tr>
      <td><code><var>visibilityProperty=true</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>`true` to check if the element is invisible due to the value of its visibility property. `true` by default.</td>
    </tr>
  </tbody>
</table>

##### Examples

```html title="index.html"
<div id="noSize"></div>
<div id="noSizeWithContent">Hello World!</div>
<div id="notDisplayed" style="width: 10px; height: 10px; display: none"></div>
<div id="notVisible" style="width: 10px; height: 10px; visibility: hidden"></div>
<div id="zeroOpacity" style="width: 10px; height: 10px; opacity: 0"></div>
<div id="notInViewport" style="width: 10px; height: 10px; position:fixed; top: 999999; left: 999999"></div>
```

```js title="isDisplayed.js"
it('should detect if an element is displayed', async () => {
    elem = await $('#notExisting');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    let elem = await $('#noSize');
    let isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    let elem = await $('#noSizeWithContent');
    let isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: true

    let elem = await $('#notDisplayed');
    let isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    elem = await $('#notVisible');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    elem = await $('#zeroOpacity');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    elem = await $('#notInViewport');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: true
});
isDisplayedWithinViewport.js
it('should detect if an element is visible within the viewport', async () => {
    let isDisplayedInViewport = await $('#notDisplayed').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#notVisible').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#notExisting').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#notInViewport').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#zeroOpacity').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false
});
```

##### Returns

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true if element is displayed