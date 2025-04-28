---
id: isDisplayed
title: isDisplayed
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isDisplayed.ts
---

Returnerar true om det valda DOM-elementet visas (även när elementet är utanför vyn). Den använder 
[`checkVisibility`](https://developer.mozilla.org/en-US/docs/Web/API/Element/checkVisibility#visibilityproperty)
metoden som tillhandahålls av webbläsaren för att avgöra om ett element visas eller inte. Eftersom WebdriverIO agerar som en
verklig användare, är standardvärdena för flaggorna `contentVisibilityAuto`, `opacityProperty`, och `visibilityProperty`
inställda på `true` för att använda ett mer strikt beteende. Detta innebär att kommandot kommer att kontrollera om elementet är
synligt baserat på värdet av dess egenskaper `content-visibility`, `opacity` och `visibility`.

Om du också vill verifiera att elementet finns inom vyn, ange flaggan `withinViewport` till kommandot.

:::info

Till skillnad från andra elementkommandon kommer WebdriverIO inte att vänta på att elementet
ska existera för att utföra detta kommando.

:::

WebdriverIO, när det utför webbläsartester, använder ett [anpassat skript](https://github.com/webdriverio/webdriverio/blob/59d349ca847950354d02b9e548f60cc50e7871f0/packages/webdriverio/src/scripts/isElementDisplayed.ts)
som är särskilt utformat för att bedöma synligheten hos element. Detta skript är nyckeln till att avgöra om ett
element visas på sidan. Däremot, för nativa mobiltestscenarier med Appium, förlitar sig WebdriverIO
på kommandot [`isElementDisplayed`](https://appium.io/docs/en/2.1/reference/interfaces/appium_types.ExternalDriver/#elementdisplayed)
som tillhandahålls av Appium. Detta kommando utvärderar synligheten hos element med hjälp av kriterier som fastställts av
den underliggande Appium-drivrutinen, vilket säkerställer korrekta och drivrutinsspecifika bedömningar för mobilapplikationer.

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