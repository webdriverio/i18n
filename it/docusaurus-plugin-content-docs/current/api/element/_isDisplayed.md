---
id: isDisplayed
title: isDisplayed
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isDisplayed.ts
---

Restituisce true se l'elemento DOM selezionato è visualizzato (anche quando l'elemento è fuori dal viewport). Utilizza 
il metodo [`checkVisibility`](https://developer.mozilla.org/en-US/docs/Web/API/Element/checkVisibility#visibilityproperty)
fornito dal browser per determinare se un elemento viene visualizzato o meno. Poiché WebdriverIO agisce come un
utente reale, i valori predefiniti per i flag `contentVisibilityAuto`, `opacityProperty` e `visibilityProperty`
sono impostati su `true` per impostare un comportamento più rigoroso. Ciò significa che il comando verificherà se l'elemento è
visibile in base al valore delle sue proprietà `content-visibility`, `opacity` e `visibility`.

Se vuoi verificare anche che l'elemento sia all'interno del viewport, fornisci il flag `withinViewport` al comando.

:::info

A differenza di altri comandi per elementi, WebdriverIO non attenderà che l'elemento
esista per eseguire questo comando.

:::

WebdriverIO, durante i test del browser, utilizza uno [script personalizzato](https://github.com/webdriverio/webdriverio/blob/59d349ca847950354d02b9e548f60cc50e7871f0/packages/webdriverio/src/scripts/isElementDisplayed.ts)
appositamente progettato per valutare la visibilità degli elementi. Questo script è fondamentale per determinare se un
elemento è visualizzato sulla pagina. Al contrario, per scenari di test su dispositivi mobili nativi con Appium, WebdriverIO
si affida al comando [`isElementDisplayed`](https://appium.io/docs/en/2.1/reference/interfaces/appium_types.ExternalDriver/#elementdisplayed)
fornito da Appium. Questo comando valuta la visibilità degli elementi utilizzando criteri stabiliti dal
driver Appium sottostante, garantendo valutazioni accurate e specifiche del driver per le applicazioni mobili.

##### Utilizzo

```js
$(selector).isDisplayed(withinViewport, contentVisibilityAuto, opacityProperty, visibilityProperty)
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
      <td><code><var>withinViewport=false</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Boolean`</td>
      <td>`true` per verificare se l'elemento è all'interno del viewport. `false` per impostazione predefinita.</td>
    </tr>
    <tr>
      <td><code><var>contentVisibilityAuto=true</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Boolean`</td>
      <td>`true` per verificare se la proprietà content-visibility dell'elemento ha (o eredita) il valore auto, e sta attualmente saltando il rendering. `true` per impostazione predefinita.</td>
    </tr>
    <tr>
      <td><code><var>opacityProperty=true</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Boolean`</td>
      <td>`true` per verificare se la proprietà opacity dell'elemento ha (o eredita) un valore di 0. `true` per impostazione predefinita.</td>
    </tr>
    <tr>
      <td><code><var>visibilityProperty=true</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Boolean`</td>
      <td>`true` per verificare se l'elemento è invisibile a causa del valore della sua proprietà visibility. `true` per impostazione predefinita.</td>
    </tr>
  </tbody>
</table>

##### Esempi

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

##### Restituisce

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true se l'elemento è visualizzato