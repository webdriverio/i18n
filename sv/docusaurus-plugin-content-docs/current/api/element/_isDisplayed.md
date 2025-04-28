---
id: isDisplayed
title: isDisplayed
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isDisplayed.ts
---

Returnerar sant om det valda DOM-elementet visas (även när elementet är utanför synfältet). Den använder
[`checkVisibility`](https://developer.mozilla.org/en-US/docs/Web/API/Element/checkVisibility#visibilityproperty)
metoden som tillhandahålls av webbläsaren för att avgöra om ett element visas eller inte. Eftersom WebdriverIO agerar som en
riktig användare, är standardvärdena för flaggorna `contentVisibilityAuto`, `opacityProperty` och `visibilityProperty`
inställda på `true` för att som standard ha ett mer strikt beteende. Detta innebär att kommandot kommer att kontrollera om elementet är
synligt på grund av värdet på dess `content-visibility`, `opacity` och `visibility` egenskaper.

Om du också vill verifiera att elementet är inom synfältet, tillhandahåll flaggan `withinViewport` till kommandot.

:::info

Till skillnad från andra elementkommandon kommer WebdriverIO inte att vänta på att elementet
ska existera för att utföra detta kommando.

:::

WebdriverIO, när det utför webbläsartester, använder ett [anpassat skript](https://github.com/webdriverio/webdriverio/blob/59d349ca847950354d02b9e548f60cc50e7871f0/packages/webdriverio/src/scripts/isElementDisplayed.ts)
speciellt utformat för att bedöma synligheten av element. Detta skript är nyckeln för att avgöra om ett
element visas på sidan. Däremot, för nativa mobiltestscenarier med Appium, använder WebdriverIO
kommandot [`isElementDisplayed`](https://appium.io/docs/en/2.1/reference/interfaces/appium_types.ExternalDriver/#elementdisplayed)
som tillhandahålls av Appium. Detta kommando utvärderar synligheten av element med hjälp av kriterier som etablerats av den
underliggande Appium-drivrutinen, vilket säkerställer korrekta och drivrutinsspecifika bedömningar för mobilapplikationer.

##### Användning

```js
$(selector).isDisplayed(withinViewport, contentVisibilityAuto, opacityProperty, visibilityProperty)
```

##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>withinViewport=false</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Boolean`</td>
      <td>`true` för att kontrollera om elementet är inom synfältet. `false` som standard.</td>
    </tr>
    <tr>
      <td><code><var>contentVisibilityAuto=true</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Boolean`</td>
      <td>`true` för att kontrollera om elementets content-visibility-egenskap har (eller ärver) värdet auto, och det för närvarande hoppar över sin rendering. `true` som standard.</td>
    </tr>
    <tr>
      <td><code><var>opacityProperty=true</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Boolean`</td>
      <td>`true` för att kontrollera om elementets opacity-egenskap har (eller ärver) ett värde på 0. `true` som standard.</td>
    </tr>
    <tr>
      <td><code><var>visibilityProperty=true</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Boolean`</td>
      <td>`true` för att kontrollera om elementet är osynligt på grund av värdet på dess visibility-egenskap. `true` som standard.</td>
    </tr>
  </tbody>
</table>

##### Exempel

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

##### Returnerar

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  sant om elementet visas