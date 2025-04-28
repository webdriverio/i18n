---
id: selectors
title: Selektorer
---

The [WebDriver Protocol](https://w3c.github.io/webdriver/) provides several selector strategies to query an element. WebdriverIO simplifies them to keep selecting elements simple. Please note that even though the command to query elements is called `$` and `$$`, they have nothing to do with jQuery or the [Sizzle Selector Engine](https://github.com/jquery/sizzle).

While there are so many different selectors available, only a few of them provide a resilient way to find the right element. For example, given the following button:

```html
<button
  id="main"
  class="btn btn-large"
  name="submission"
  role="button"
  data-testid="submit"
>
  Submit
</button>
```

Vi __rekommenderar__ och __rekommenderar inte__ följande selektorer:

| Selektor | Rekommenderad | Anteckningar |
| -------- | ----------- | ----- |
| `$('button')` | 🚨 Aldrig | Sämst - för generisk, ingen kontext. |
| `$('.btn.btn-large')` | 🚨 Aldrig | Dålig. Kopplad till styling. Mycket benägen att ändras. |
| `$('#main')` | ⚠️ Sparsamt | Bättre. Men fortfarande kopplad till styling eller JS-händelselyssnare. |
| `$(() => document.queryElement('button'))` | ⚠️ Sparsamt | Effektiv sökning, komplex att skriva. |
| `$('button[name="submission"]')` | ⚠️ Sparsamt | Kopplad till attributet `name` som har HTML-semantik. |
| `$('button[data-testid="submit"]')` | ✅ Bra | Kräver ytterligare attribut, inte kopplad till a11y. |
| `$('aria/Submit')` eller `$('button=Submit')` | ✅ Alltid | Bäst. Liknar hur användaren interagerar med sidan. Det rekommenderas att använda ditt frontends översättningsfiler så att dina tester aldrig misslyckas när översättningarna uppdateras |

## CSS Query Selector

If not indicated otherwise, WebdriverIO will query elements using the [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) pattern, e.g.:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L7-L8
```

## Link Text

För att få ett ankarelement med en specifik text i det, sök efter texten som börjar med likhetstecken (`=`).

Till exempel:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L3
```

Du kan söka efter detta element genom att anropa:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L16-L18
```

## Partial Link Text

För att hitta ett ankarelement vars synliga text delvis matchar ditt sökvärde,
sök efter det genom att använda `*=` framför söksträngen (t.ex. `*=driver`).

Du kan söka efter elementet från exemplet ovan genom att också anropa:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L24-L26
```

__Obs:__ Du kan inte kombinera flera selektor-strategier i en selektor. Använd flera kedjade elementfrågor för att uppnå samma mål, t.ex.:

```js
const elem = await $('header h1*=Welcome') // fungerar inte!!!
// använd istället
const elem = await $('header').$('*=driver')
```

## Element with certain text

Samma teknik kan tillämpas på element också. Dessutom är det också möjligt att göra en skiftlägesokänslig matchning med `.=` eller `.*=` i frågan.

Till exempel, här är en sökning efter en rubrik på nivå 1 med texten "Welcome to my Page":

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L2
```

Du kan söka efter detta element genom att anropa:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L35C1-L38
```

Eller genom att söka med delvis text:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L44C9-L47
```

Detsamma fungerar för `id` och `class` namn:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L4
```

Du kan söka efter detta element genom att anropa:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L49-L67
```

__Obs:__ Du kan inte kombinera flera selektor-strategier i en selektor. Använd flera kedjade elementfrågor för att uppnå samma mål, t.ex.:

```js
const elem = await $('header h1*=Welcome') // fungerar inte!!!
// använd istället
const elem = await $('header').$('h1*=Welcome')
```

## Tag Name

För att söka efter ett element med ett specifikt taggnamn, använd `<tag>` eller `<tag />`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L5
```

Du kan söka efter detta element genom att anropa:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L61-L62
```

## Name Attribute

För att söka efter element med ett specifikt name-attribut kan du antingen använda en vanlig CSS3-selektor eller använda namnstrategin från [JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol) genom att skicka något som [name="some-name"] som selektor-parameter:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L68-L69
```

__Obs:__ Denna selektor-strategi är föråldrad och fungerar endast i gamla webbläsare som körs av JSONWireProtocol-protokollet eller genom att använda Appium.

## xPath

Det är också möjligt att söka efter element via en specifik [xPath](https://developer.mozilla.org/en-US/docs/Web/XPath).

En xPath-selektor har ett format som `//body/div[6]/div[1]/span[1]`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/xpath.html
```

Du kan söka efter den andra paragrafen genom att anropa:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L75-L76
```

Du kan använda xPath för att också traversera upp och ner i DOM-trädet:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L78-L79
```

## Accessibility Name Selector

Sök efter element med deras tillgängliga namn. Det tillgängliga namnet är vad som annonseras av en skärmläsare när elementet får fokus. Värdet på det tillgängliga namnet kan vara både visuellt innehåll eller dolda textalternativ.

:::info

Du kan läsa mer om denna selektor i vårt [release-blogginlägg](/blog/2022/09/05/accessibility-selector)

:::

### Hämta med `aria-label`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L1
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L86-L87
```

### Hämta med `aria-labelledby`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L2-L3
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L93-L94
```

### Hämta med innehåll

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L4
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L100-L101
```

### Hämta med titel

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L5
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L107-L108
```

### Hämta med `alt`-egenskap

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L114-L115
```

## ARIA - Role Attribute

För att söka efter element baserat på [ARIA-roller](https://www.w3.org/TR/html-aria/#docconformance), kan du direkt ange elementets roll som `[role=button]` som selektor-parameter:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L13
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L131-L132
```

## ID Attribute

Platsstrategin "id" stöds inte i WebDriver-protokollet, man bör istället använda antingen CSS eller xPath-selektor-strategier för att hitta element med hjälp av ID.

Dock kan vissa drivrutiner (t.ex. [Appium You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)) fortfarande [stödja](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies) denna selektor.

För närvarande stödda selektor-syntaxer för ID är:

```js
//css locator
const button = await $('#someid')
//xpath locator
const button = await $('//*[@id="someid"]')
//id strategy
// Note: works only in Appium or similar frameworks which supports locator strategy "ID"
const button = await $('id=resource-id/iosname')
```

## JS Function

Du kan också använda JavaScript-funktioner för att hämta element med hjälp av webb-native API:er. Naturligtvis kan du bara göra detta inom en webbkontext (t.ex. `browser`, eller webbkontext i mobil).

Med följande HTML-struktur:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/js.html
```

Du kan söka efter siblingelementet till `#elem` på följande sätt:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L139-L143
```

## Deep Selectors

:::warning

Från och med `v9` av WebdriverIO finns det inget behov av denna speciella selektor eftersom WebdriverIO automatiskt tränger igenom Shadow DOM för dig. Det rekommenderas att migrera bort från denna selektor genom att ta bort `>>>` framför den.

:::

Många frontend-applikationer förlitar sig starkt på element med [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM). Det är tekniskt omöjligt att söka efter element inom shadow DOM utan workarounds. [`shadow$`](https://webdriver.io/docs/api/element/shadow$) och [`shadow$$`](https://webdriver.io/docs/api/element/shadow$$) har varit sådana workarounds som hade sina [begränsningar](https://github.com/Georgegriff/query-selector-shadow-dom#how-is-this-different-to-shadow). Med deep-selektorn kan du nu söka efter alla element inom shadow DOM med det vanliga sökkommandot.

Antag att vi har en applikation med följande struktur:

![Chrome Example](https://github.com/Georgegriff/query-selector-shadow-dom/raw/main/Chrome-example.png "Chrome Example")

Med denna selektor kan du söka efter `<button />` elementet som är nästlat inom en annan shadow DOM, t.ex.:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L147-L149
```

## Mobile Selectors

För hybrid mobil testning är det viktigt att automatiseringsservern är i rätt *kontext* innan kommandon utförs. För att automatisera gester bör drivrutinen idealt sett ställas in på nativ kontext. Men för att välja element från DOM måste drivrutinen vara inställd på plattformens webview-kontext. Endast *då* kan metoderna som nämnts ovan användas.

För nativ mobil testning finns det ingen växling mellan kontexter, eftersom du måste använda mobila strategier och använda den underliggande enhetsautomatiseringstekniken direkt. Detta är särskilt användbart när ett test behöver en viss finkornig kontroll över att hitta element.

### Android UiAutomator

Androids UI Automator-ramverk ger ett antal sätt att hitta element. Du kan använda [UI Automator API](https://developer.android.com/tools/testing-support-library/index.html#uia-apis), särskilt [UiSelector-klassen](https://developer.android.com/reference/androidx/test/uiautomator/UiSelector) för att hitta element. I Appium skickar du Java-koden, som en sträng, till servern, som kör den i applikationens miljö och returnerar elementet eller elementen.

```js
const selector = 'new UiSelector().text("Cancel").className("android.widget.Button")'
const button = await $(`android=${selector}`)
await button.click()
```

### Android DataMatcher and ViewMatcher (Endast Espresso)

Androids DataMatcher-strategi ger ett sätt att hitta element med [Data Matcher](https://developer.android.com/reference/android/support/test/espresso/DataInteraction)

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"]
})
await menuItem.click()
```

Och på liknande sätt [View Matcher](https://developer.android.com/reference/android/support/test/espresso/ViewInteraction)

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"],
  "class": "androidx.test.espresso.matcher.ViewMatchers"
})
await menuItem.click()
```

### Android View Tag (Endast Espresso)

View tag-strategin ger ett bekvämt sätt att hitta element genom deras [tagg](https://developer.android.com/reference/android/support/test/espresso/matcher/ViewMatchers.html#withTagValue%28org.hamcrest.Matcher%3Cjava.lang.Object%3E%29).

```js
const elem = await $('-android viewtag:tag_identifier')
await elem.click()
```

### iOS UIAutomation

Vid automatisering av en iOS-applikation kan Apples [UI Automation-ramverk](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html) användas för att hitta element.

Detta JavaScript [API](https://developer.apple.com/library/ios/documentation/DeveloperTools/Reference/UIAutomationRef/index.html#//apple_ref/doc/uid/TP40009771) har metoder för att få tillgång till vyn och allt på den.

```js
const selector = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
const button = await $(`ios=${selector}`)
await button.click()
```

Du kan också använda predikat-sökning inom iOS UI Automation i Appium för att ytterligare förfina elementvalet. Se [här](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/ios/ios-predicate.md) för detaljer.

### iOS XCUITest predicate strings and class chains

Med iOS 10 och högre (med `XCUITest`-drivrutin), kan du använda [predicate strings](https://github.com/facebook/WebDriverAgent/wiki/Predicate-Queries-Construction-Rules):

```js
const selector = `type == 'XCUIElementTypeSwitch' && name CONTAINS 'Allow'`
const switch = await $(`-ios predicate string:${selector}`)
await switch.click()
```

Och [class chains](https://github.com/facebook/WebDriverAgent/wiki/Class-Chain-Queries-Construction-Rules):

```js
const selector = '**/XCUIElementTypeCell[`name BEGINSWITH "D"`]/**/XCUIElementTypeButton'
const button = await $(`-ios class chain:${selector}`)
await button.click()
```

### Accessibility ID

Selektorstrategin `accessibility id` är utformad för att läsa en unik identifierare för ett UI-element. Detta har fördelen att det inte ändras under lokalisering eller någon annan process som kan ändra text. Dessutom kan det vara till hjälp vid skapandet av plattformsöverskridande tester, om element som är funktionellt desamma har samma tillgänglighets-id.

- För iOS är detta `accessibility identifier` som anges av Apple [här](https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UIAccessibilityIdentification_Protocol/index.html).
- För Android motsvarar `accessibility id` `content-description` för elementet, som beskrivs [här](https://developer.android.com/training/accessibility/accessible-app.html).

För båda plattformarna är att hämta ett element (eller flera element) genom deras `accessibility id` vanligtvis den bästa metoden. Det är också det föredragna sättet jämfört med den föråldrade strategin `name`.

```js
const elem = await $('~my_accessibility_identifier')
await elem.click()
```

### Class Name

Strategin `class name` är en `string` som representerar ett UI-element i den aktuella vyn.

- För iOS är det hela namnet på en [UIAutomation-klass](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html), och kommer att börja med `UIA-`, som `UIATextField` för ett textfält. En fullständig referens finns [här](https://developer.apple.com/library/ios/navigation/#section=Frameworks&topic=UIAutomation).
- För Android är det det fullständigt kvalificerade namnet på en [UI Automator](https://developer.android.com/tools/testing-support-library/index.html#UIAutomator) [klass](https://developer.android.com/reference/android/widget/package-summary.html), som `android.widget.EditText` för ett textfält. En fullständig referens finns [här](https://developer.android.com/reference/android/widget/package-summary.html).
- För Youi.tv är det hela namnet på en Youi.tv-klass, och kommer att börja med `CYI-`, som `CYIPushButtonView` för ett tryckknappselement. En fullständig referens finns på [You.i Engine Driver's GitHub-sida](https://github.com/YOU-i-Labs/appium-youiengine-driver)

```js
// iOS example
await $('UIATextField').click()
// Android example
await $('android.widget.DatePicker').click()
// Youi.tv example
await $('CYIPushButtonView').click()
```

## Chain Selectors

Om du vill vara mer specifik i din sökning kan du kedja selektorer tills du har hittat rätt element. Om du anropar `element` innan ditt faktiska kommando, startar WebdriverIO sökningen från det elementet.

Till exempel, om du har en DOM-struktur som:

```html
<div class="row">
  <div class="entry">
    <label>Product A</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
  <div class="entry">
    <label>Product B</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
  <div class="entry">
    <label>Product C</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
</div>
```

Och du vill lägga till produkt B i varukorgen, skulle det vara svårt att göra det enbart med CSS-selektorn.

Med selektor-kedjedning är det mycket enklare. Du begränsar helt enkelt det önskade elementet steg för steg:

```js
await $('.row .entry:nth-child(2)').$('button*=Add').click()
```

### Appium Image Selector

Med selektorstrategin `-image` är det möjligt att skicka Appium en bildfil som representerar ett element du vill komma åt.

Stödda filformat är `jpg,png,gif,bmp,svg`

Fullständig referens finns [här](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md)

```js
const elem = await $('./file/path/of/image/test.jpg')
await elem.click()
```

**Observera**: Sättet hur Appium fungerar med denna selektor är att den internt tar en (app)skärmdump och använder den tillhandahållna bildselektorn för att verifiera om elementet kan hittas i den (app)skärmdumpen.

Var medveten om att Appium kan ändra storlek på den tagna (app)skärmdumpen för att få den att matcha CSS-storleken på din (app)skärm (detta kommer att hända på iPhones men också på Mac-maskiner med en Retina-skärm eftersom DPR är större än 1). Detta kommer att resultera i att ingen match hittas eftersom den tillhandahållna bildselektorn kan ha tagits från den ursprungliga skärmdumpen.
Du kan åtgärda detta genom att uppdatera Appium Server-inställningarna, se [Appium docs](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md#related-settings) för inställningarna och [denna kommentar](https://github.com/webdriverio/webdriverio/issues/6097#issuecomment-726675579) för en detaljerad förklaring.

## React Selectors

WebdriverIO tillhandahåller ett sätt att välja React-komponenter baserat på komponentnamnet. För att göra detta har du två kommandon att välja mellan: `react$` och `react$$`.

Dessa kommandon låter dig välja komponenter från [React VirtualDOM](https://reactjs.org/docs/faq-internals.html) och returnera antingen ett enskilt WebdriverIO-element eller en array av element (beroende på vilken funktion som används).

**Observera**: Kommandona `react$` och `react$$` liknar varandra i funktionalitet, förutom att `react$$` kommer att returnera *alla* matchande instanser som en array av WebdriverIO-element, och `react$` kommer att returnera den första hittade instansen.

#### Grundläggande exempel

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent() {
    return (
        <div>
            MyComponent
        </div>
    )
}

function App() {
    return (<MyComponent />)
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

I koden ovan finns det en enkel `MyComponent`-instans inuti applikationen, som React renderar inuti ett HTML-element med `id="root"`.

Med kommandot `browser.react$` kan du välja en instans av `MyComponent`:

```js
const myCmp = await browser.react$('MyComponent')
```

Nu när du har WebdriverIO-elementet lagrat i variabeln `myCmp` kan du utföra elementkommandon mot det.

#### Filtrering av komponenter

Biblioteket som WebdriverIO använder internt tillåter filtrering av ditt val efter props och/eller tillstånd för komponenten. För att göra detta behöver du skicka ett andra argument för props och/eller ett tredje argument för state till webbläsarkommandot.

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent(props) {
    return (
        <div>
            Hello { props.name || 'World' }!
        </div>
    )
}

function App() {
    return (
        <div>
            <MyComponent name="WebdriverIO" />
            <MyComponent />
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

Om du vill välja den instans av `MyComponent` som har en prop `name` som `WebdriverIO`, kan du köra kommandot så här:

```js
const myCmp = await browser.react$('MyComponent', {
    props: { name: 'WebdriverIO' }
})
```

Om du ville filtrera ditt val efter tillstånd, skulle `browser`-kommandot se ut ungefär så här:

```js
const myCmp = await browser.react$('MyComponent', {
    state: { myState: 'some value' }
})
```

#### Hantering av `React.Fragment`

När du använder kommandot `react$` för att välja React [fragment](https://reactjs.org/docs/fragments.html), kommer WebdriverIO att returnera det första barnet till den komponenten som komponentens nod. Om du använder `react$$`, kommer du att få en array som innehåller alla HTML-noder inuti fragmenten som matchar selektorn.

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent() {
    return (
        <React.Fragment>
            <div>
                MyComponent
            </div>
            <div>
                MyComponent
            </div>
        </React.Fragment>
    )
}

function App() {
    return (<MyComponent />)
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

Med tanke på exemplet ovan, så fungerar kommandona så här:

```js
await browser.react$('MyComponent') // returnerar WebdriverIO-elementet för den första <div />
await browser.react$$('MyComponent') // returnerar WebdriverIO-elementen för arrayen [<div />, <div />]
```

**Obs:** Om du har flera instanser av `MyComponent` och du använder `react$$` för att välja dessa fragment-komponenter, kommer du att få en endimensionell array av alla noder. Med andra ord, om du har 3 `<MyComponent />`-instanser, kommer du att få en array med sex WebdriverIO-element.

## Custom Selector Strategies


Om din app kräver ett specifikt sätt att hämta element kan du själv definiera en anpassad selektor-strategi som du kan använda med `custom$` och `custom$$`. För det registrerar du din strategi en gång i början av testet, t.ex. i en `before`-hook:

```js reference
https://github.com/webdriverio/example-recipes/blob/f5730428ec3605e856e90bf58be17c9c9da891de/queryElements/customStrategy.js#L2-L11
```

Med följande HTML-snippet:

```html reference
https://github.com/webdriverio/example-recipes/blob/f5730428ec3605e856e90bf58be17c9c9da891de/queryElements/example.html#L8-L12
```

Använd den sedan genom att anropa:

```js reference
https://github.com/webdriverio/example-recipes/blob/f5730428ec3605e856e90bf58be17c9c9da891de/queryElements/customStrategy.js#L16-L19
```

**Obs:** detta fungerar endast i en webbmiljö där kommandot [`execute`](/docs/api/browser/execute) kan köras.