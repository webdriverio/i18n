---
id: selectors
title: Selektorer
description: "Hitta element med CSS, text, XPath, tillgängligt namn, ARIA-roll och andra selektorstrategier, och lär dig vilka som är mest robusta."
---

[WebDriver-protokollet](https://w3c.github.io/webdriver/) erbjuder flera selektorstrategier för att söka efter ett element. WebdriverIO förenklar dem så att det förblir enkelt att välja element. Observera att även om kommandona för att söka efter element heter `$` och `$$`, har de ingenting med jQuery eller [Sizzle Selector Engine](https://github.com/jquery/sizzle) att göra.

Det finns många olika selektorer, men bara ett fåtal av dem ger ett robust sätt att hitta rätt element. Ta till exempel följande knapp:

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

Vi __rekommenderar__ respektive __rekommenderar inte__ följande selektorer:

| Selektor | Rekommenderas | Anteckningar |
| -------- | ----------- | ----- |
| `$('button')` | 🚨 Aldrig | Sämst – för generisk, ingen kontext. |
| `$('.btn.btn-large')` | 🚨 Aldrig | Dålig. Kopplad till stilsättning. Ändras ofta. |
| `$('#main')` | ⚠️ Sparsamt | Bättre. Men fortfarande kopplad till stilsättning eller JS-händelselyssnare. |
| `$(() => document.queryElement('button'))` | ⚠️ Sparsamt | Effektiv sökning, komplicerad att skriva. |
| `$('button[name="submission"]')` | ⚠️ Sparsamt | Kopplad till attributet `name`, som har HTML-semantik. |
| `$('button[data-testid="submit"]')` | ✅ Bra | Kräver ytterligare attribut, inte kopplad till tillgänglighet (a11y). |
| `$('aria/Submit')` | ✅ Bra | Bra. Liknar hur användaren interagerar med sidan. Det rekommenderas att använda översättningsfiler så att dina tester inte går sönder när översättningarna uppdateras. I WebDriver BiDi-sessioner används webbläsarens tillgänglighetsträd. I Classic-sessioner faller den tillbaka på XPath och kan vara långsammare på stora sidor. |
| `$('button=Submit')` | ✅ Alltid | Bäst. Liknar hur användaren interagerar med sidan och är snabb. Det rekommenderas att använda översättningsfiler så att dina tester inte går sönder när översättningarna uppdateras. |

## Strikt läge

Från och med v10 är kommandot [`$`](/docs/api/browser/$) __strikt__: det representerar exakt ett element. Om selektorn matchar mer än ett element kastar kommandot ett `StrictSelectorError` i stället för att tyst välja den första träffen:

```js
// det finns 12 knappar på sidan
await $('button').click()
// StrictSelectorError: strict mode violation: `$("button")` resolved to 12 elements, expected 1.
```

Detta är samma beteende som hos [Playwright-lokatorer](https://playwright.dev/docs/locators#strictness). Cypress skiljer sig åt: dess sökningar kan matcha flera element, och det är åtgärdskommandon som [`.click()`](https://docs.cypress.io/api/commands/click#Click-all-elements-with-id-starting-with-btn) som som standard avvisar ett subjekt med flera element. Strikt läge synliggör selektorer som är för breda och som annars tyst skulle interagera med fel element så snart sidan växer.

Regeln gäller för varje steg i en [kedja](#chain-selectors) och för varje selektortyp som `$` accepterar — strängselektorer (inklusive sådana som tränger igenom shadow DOM), [JS-funktioner](#js-function), [mobila selektorer](#mobile-selectors) och referenser till [anpassade strategier](#custom-selector-strategies).

### Vad som inte påverkas

- `$$` returnerar fortfarande noll eller flera element, som en [`ElementArray`](/docs/api/browser/$$). Använd await på listan (eller dess `.length`) innan du läser antalet eller använder `for...of`. `for await` fungerar direkt på listan.
- De dedikerade hjälpkommandona `custom$`, `shadow$` och `react$` är inte strikta — de returnerar fortfarande sin första träff, liksom deras `$$`-motsvarigheter.
- En selektor som inte matchar något returnerar fortfarande ett element som löses upp lat, så [`waitForExist`](/docs/api/element/waitForExist) och beteendet för [automatisk väntan](/docs/autowait) är oförändrade.
- Att skicka in en elementreferens, t.ex. `$(await browser.getActiveElement())`, refererar alltid till en enda nod och kontrolleras aldrig.

:::info Migrera till v10

För hur du granskar din testsvit efter överträdelser av strikt läge, snävar in eller undantar enskilda sökningar och inaktiverar strikt läge för hela projektet, se [migreringsguiden för v10](/docs/v10-migration).

:::

## CSS-sökselektor

Om inget annat anges söker WebdriverIO efter element med mönstret för [CSS-selektorer](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors), t.ex.:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L7-L8
```

## Länktext

För att hämta ett ankarelement med en specifik text, sök på texten med ett inledande likhetstecken (`=`).

Till exempel:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L3
```

Du kan söka efter detta element genom att anropa:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L16-L18
```

## Partiell länktext

För att hitta ett ankarelement vars synliga text delvis matchar ditt sökvärde,
sök efter det genom att använda `*=` framför söksträngen (t.ex. `*=driver`).

Du kan även söka efter elementet från exemplet ovan genom att anropa:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L24-L26
```

__Obs:__ Du kan inte blanda flera selektorstrategier i en och samma selektor. Använd flera kedjade elementsökningar för att uppnå samma mål, t.ex.:

```js
const elem = await $('header h1*=Welcome') // fungerar inte!!!
// använd istället
const elem = await $('header').$('*=driver')
```

## Element med viss text

Samma teknik kan även tillämpas på element. Dessutom går det att göra en skiftlägesokänslig matchning med `.=` eller `.*=` i sökningen.

Här är till exempel en sökning efter en rubrik på nivå 1 med texten "Welcome to my Page":

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L2
```

Du kan söka efter detta element genom att anropa:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L35C1-L38
```

Eller genom att söka på partiell text:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L44C9-L47
```

Samma sak fungerar för `id`- och `class`-namn:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L4
```

Du kan söka efter detta element genom att anropa:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L49-L67
```

__Obs:__ Du kan inte blanda flera selektorstrategier i en och samma selektor. Använd flera kedjade elementsökningar för att uppnå samma mål, t.ex.:

```js
const elem = await $('header h1*=Welcome') // fungerar inte!!!
// använd istället
const elem = await $('header').$('h1*=Welcome')
```

## Taggnamn

För att söka efter ett element med ett specifikt taggnamn, använd `<tag>` eller `<tag />`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L5
```

Du kan söka efter detta element genom att anropa:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L61-L62
```

## Name-attribut

För att söka efter element med ett specifikt name-attribut, använd en CSS-selektor som `[name="some-name"]`. I en mobil session skickas samma förkortning med Appiums lokaliseringsstrategi `name`:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L68-L69
```

__Obs:__ Lokaliseringsstrategin `name` är en Appium-lokator. Desktopsessioner behåller `[name="some-name"]` på CSS-strategin.

## xPath

Det är också möjligt att söka efter element via en specifik [xPath](https://developer.mozilla.org/en-US/docs/Web/XPath).

En xPath-selektor har ett format som `//body/div[6]/div[1]/span[1]`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/xpath.html
```

Du kan söka efter det andra stycket genom att anropa:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L75-L76
```

Du kan också använda xPath för att förflytta dig uppåt och nedåt i DOM-trädet:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L78-L79
```

## Selektor för tillgängligt namn

Sök efter element utifrån deras tillgängliga namn. Det tillgängliga namnet är det som en skärmläsare läser upp när elementet får fokus. Värdet på det tillgängliga namnet kan vara både visuellt innehåll och dolda textalternativ.

I [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/)-sessioner (Chrome, Edge, Firefox och andra BiDi-kompatibla webbläsare) använder WebdriverIO först [`browsingContext.locateNodes`](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes) med en tillgänglighetslokator. Den söker direkt i webbläsarens tillgänglighetsträd och är vanligtvis mycket snabbare än XPath-approximationen. Om tillgänglighetslokatorn inte hittar något faller WebdriverIO tillbaka på Classic-heuristiken med XPath så att befintliga `aria/`-sökningar fortsätter att matcha.

:::info

Du kan läsa mer om denna selektor i vårt [blogginlägg om lanseringen](/blog/2022/09/05/accessibility-selector)

:::

### Hämta via `aria-label`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L1
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L86-L87
```

### Hämta via `aria-labelledby`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L2-L3
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L93-L94
```

### Hämta via innehåll

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L4
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L100-L101
```

### Hämta via titel

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L5
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L107-L108
```

### Hämta via egenskapen `alt`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L114-L115
```

## Rollselektor

Sök efter element utifrån deras ARIA-roll och tillgängliga namn, på samma sätt som en skärmläsare beskriver dem: "knappen *Add to cart*". En roll plus ett namn fortsätter att matcha när klassnamn, test-id:n eller DOM-strukturen ändras.

```js
await $('role/button[name="Add to cart"]').click()
await expect($('role/heading[name="Order summary"]')).toBeDisplayed()

// endast roll
const rows = await $$('role/row')

// avgränsad till ett föräldraelement
const dialog = $('role/dialog[name="Checkout"]')
await dialog.$('role/button[name="Pay now"]').click()
```

Syntaxen är `role/<role>` eller `role/<role>[name="<accessible name>"]`. Enkla citattecken fungerar också, och ett citattecken inuti namnet escapas med ett omvänt snedstreck: `role/button[name="Say \"hi\""]`.

- Namnet måste matcha hela det tillgängliga namnet.
- Rollen måste vara en ARIA-roll. Ett stavfel misslyckas med närmaste giltiga roll, till exempel `"buton" is not an ARIA role. Did you mean "button"?`.
- `img` och dess ARIA 1.3-namn `image` är samma roll.
- Selektorn följer det [strikta läget](#strict-mode) för `$` precis som alla andra selektorer.

I en [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/)-session skickar WebdriverIO roll och namn till [`browsingContext.locateNodes`](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes). Webbläsaren beräknar båda själv, på samma sätt som hjälpmedelsteknik ser sidan. Element inuti öppna shadow roots och inuti ramar, inklusive ramar från ett annat ursprung, hittas. Om webbläsaren inte hittar något element finns det ingen reserv i form av en heuristik. Observera att det är webbläsaren som bestämmer rollen: till exempel kan en `<table>` utan rubriker eller bildtext vara en layouttabell, och dess rader har då ingen `row`-roll.

I en WebDriver Classic-session, och när en webbläsare inte stöder rollokatorn, beräknar WebdriverIO roll och tillgängligt namn på sidan med [`dom-accessibility-api`](https://github.com/eps1lon/dom-accessibility-api), den implementation som Testing Library använder. Ett textfält utan etikett får sitt namn från sin `placeholder`, precis som i webbläsare. Rollselektorn är inte tillgänglig i en native mobilappskontext. Använd ett [accessibility id](#accessibility-id) där.

## ARIA – role-attribut

För att söka efter element baserat på [ARIA-roller](https://www.w3.org/TR/html-aria/#docconformance) kan du direkt ange elementets roll, som `[role=button]`, som selektorparameter. Denna selektor approximerar rollen utifrån elementets namn och attribut. Föredra [rollselektorn](#role-selector), som använder den roll som webbläsaren beräknar och även kan matcha det tillgängliga namnet:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L13
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L131-L132
```

## ID-attribut

Lokaliseringsstrategin "id" stöds inte i WebDriver-protokollet; man bör i stället använda selektorstrategierna CSS eller xPath för att hitta element via ID.

Vissa drivrutiner (t.ex. [Appium You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)) kan dock fortfarande [stödja](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies) denna selektor.

De selektorsyntaxer för ID som stöds för närvarande är:

```js
//css-lokator
const button = await $('#someid')
//xpath-lokator
const button = await $('//*[@id="someid"]')
//id-strategi
// Obs: fungerar endast i Appium eller liknande ramverk som stöder lokaliseringsstrategin "ID"
const button = await $('id=resource-id/iosname')
```

## JS-funktion

Du kan också använda JavaScript-funktioner för att hämta element med webbens inbyggda API:er. Detta kan du naturligtvis bara göra i en webbkontext (t.ex. `browser`, eller webbkontext i mobil).

Givet följande HTML-struktur:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/js.html
```

Kan du söka efter syskonelementet till `#elem` så här:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L139-L143
```

## Djupa selektorer

:::warning

Från och med `v9` av WebdriverIO behövs inte denna speciella selektor, eftersom WebdriverIO automatiskt tränger igenom Shadow DOM åt dig. Det rekommenderas att sluta använda denna selektor genom att ta bort `>>>` framför den.

:::

Många frontend-applikationer förlitar sig i hög grad på element med [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM). Det är tekniskt omöjligt att söka efter element inom shadow DOM utan provisoriska lösningar. [`shadow$`](https://webdriver.io/docs/api/element/shadow$) och [`shadow$$`](https://webdriver.io/docs/api/element/shadow$$) har varit sådana lösningar, som hade sina [begränsningar](https://github.com/Georgegriff/query-selector-shadow-dom#how-is-this-different-to-shadow). Med den djupa selektorn kan du nu söka efter alla element inom valfri shadow DOM med det vanliga sökkommandot.

Anta att vi har en applikation med följande struktur:

![Chrome Example](https://github.com/Georgegriff/query-selector-shadow-dom/raw/main/Chrome-example.png "Chrome Example")

Med denna selektor kan du söka efter elementet `<button />` som är nästlat inuti en annan shadow DOM, t.ex.:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L147-L149
```

## Mobila selektorer

Vid hybrid mobiltestning är det viktigt att automationsservern befinner sig i rätt *kontext* innan kommandon körs. För att automatisera gester bör drivrutinen helst vara inställd på native-kontext. Men för att välja element från DOM måste drivrutinen vara inställd på plattformens webview-kontext. Först *då* kan metoderna som nämns ovan användas.

Vid native mobiltestning växlar man inte mellan kontexter, eftersom du måste använda mobila strategier och använda den underliggande automationstekniken för enheten direkt. Detta är särskilt användbart när ett test behöver finkornig kontroll över hur element hittas.

### Android UiAutomator

Androids ramverk UI Automator erbjuder ett antal sätt att hitta element. Du kan använda [UI Automator API](https://developer.android.com/tools/testing-support-library/index.html#uia-apis), särskilt [klassen UiSelector](https://developer.android.com/reference/androidx/test/uiautomator/UiSelector), för att lokalisera element. I Appium skickar du Java-koden som en sträng till servern, som kör den i applikationens miljö och returnerar elementet eller elementen.

```js
const selector = 'new UiSelector().text("Cancel").className("android.widget.Button")'
const button = await $(`android=${selector}`)
await button.click()
```

### Android DataMatcher och ViewMatcher (endast Espresso)

Androids DataMatcher-strategi erbjuder ett sätt att hitta element med [Data Matcher](https://developer.android.com/reference/android/support/test/espresso/DataInteraction)

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

### Android View Tag (endast Espresso)

View tag-strategin erbjuder ett bekvämt sätt att hitta element via deras [tagg](https://developer.android.com/reference/android/support/test/espresso/matcher/ViewMatchers.html#withTagValue%28org.hamcrest.Matcher%3Cjava.lang.Object%3E%29).

```js
const elem = await $('-android viewtag:tag_identifier')
await elem.click()
```

### iOS UIAutomation

När du automatiserar en iOS-applikation kan Apples [UI Automation-ramverk](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html) användas för att hitta element.

Detta JavaScript-[API](https://developer.apple.com/library/ios/documentation/DeveloperTools/Reference/UIAutomationRef/index.html#//apple_ref/doc/uid/TP40009771) har metoder för att komma åt vyn och allt som finns på den.

```js
const selector = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
const button = await $(`ios=${selector}`)
await button.click()
```

Du kan också använda predikatsökning inom iOS UI Automation i Appium för att förfina elementvalet ytterligare. Se [här](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/ios/ios-predicate.md) för detaljer.

### iOS XCUITest predikatsträngar och klasskedjor

Med iOS 10 och senare (med drivrutinen `XCUITest`) kan du använda [predikatsträngar](https://github.com/facebook/WebDriverAgent/wiki/Predicate-Queries-Construction-Rules):

```js
const selector = `type == 'XCUIElementTypeSwitch' && name CONTAINS 'Allow'`
const switch = await $(`-ios predicate string:${selector}`)
await switch.click()
```

Och [klasskedjor](https://github.com/facebook/WebDriverAgent/wiki/Class-Chain-Queries-Construction-Rules):

```js
const selector = '**/XCUIElementTypeCell[`name BEGINSWITH "D"`]/**/XCUIElementTypeButton'
const button = await $(`-ios class chain:${selector}`)
await button.click()
```

### Accessibility ID

Lokaliseringsstrategin `accessibility id` är utformad för att läsa en unik identifierare för ett UI-element. Detta har fördelen att den inte ändras vid lokalisering eller någon annan process som kan ändra text. Dessutom kan den underlätta skapandet av plattformsoberoende tester, om element som är funktionellt lika har samma accessibility id.

- För iOS är detta den `accessibility identifier` som Apple beskriver [här](https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UIAccessibilityIdentification_Protocol/index.html).
- För Android motsvarar `accessibility id` elementets `content-description`, enligt beskrivningen [här](https://developer.android.com/training/accessibility/accessible-app.html).

För båda plattformarna är det oftast bäst att hämta ett element (eller flera element) via deras `accessibility id`. Det är också att föredra framför den föråldrade strategin `name`.

```js
const elem = await $('~my_accessibility_identifier')
await elem.click()
```

### Klassnamn

Strategin `class name` är en `string` som representerar ett UI-element i den aktuella vyn.

- För iOS är det det fullständiga namnet på en [UIAutomation-klass](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html) och börjar med `UIA-`, till exempel `UIATextField` för ett textfält. En fullständig referens finns [här](https://developer.apple.com/library/ios/navigation/#section=Frameworks&topic=UIAutomation).
- För Android är det det fullständigt kvalificerade namnet på en [UI Automator](https://developer.android.com/tools/testing-support-library/index.html#UIAutomator)-[klass](https://developer.android.com/reference/android/widget/package-summary.html), till exempel `android.widget.EditText` för ett textfält. En fullständig referens finns [här](https://developer.android.com/reference/android/widget/package-summary.html).
- För Youi.tv är det det fullständiga namnet på en Youi.tv-klass och börjar med `CYI-`, till exempel `CYIPushButtonView` för ett tryckknappselement. En fullständig referens finns på [You.i Engine Drivers GitHub-sida](https://github.com/YOU-i-Labs/appium-youiengine-driver)

```js
// iOS-exempel
await $('UIATextField').click()
// Android-exempel
await $('android.widget.DatePicker').click()
// Youi.tv-exempel
await $('CYIPushButtonView').click()
```

## Kedjade selektorer

Om du vill vara mer specifik i din sökning kan du kedja selektorer tills du har hittat rätt
element. Om du anropar `element` före ditt egentliga kommando startar WebdriverIO sökningen från det elementet.

Om du till exempel har en DOM-struktur som:

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

Och du vill lägga produkt B i varukorgen, skulle det vara svårt att göra det enbart med CSS-selektorn.

Med kedjade selektorer är det mycket enklare. Ringa helt enkelt in det önskade elementet steg för steg:

```js
await $('.row .entry:nth-child(2)').$('button*=Add').click()
```

### Appium bildselektor

Med lokaliseringsstrategin `-image` är det möjligt att skicka en bildfil till Appium som representerar ett element du vill komma åt.

Filformat som stöds: `jpg,png,gif,bmp,svg`

En fullständig referens finns [här](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md)

```js
const elem = await $('./file/path/of/image/test.jpg')
await elem.click()
```

**Obs**: Appium hanterar denna selektor genom att internt ta en (app-)skärmdump och använda den angivna bildselektorn
för att kontrollera om elementet kan hittas i den (app-)skärmdumpen.

Tänk på att Appium kan ändra storlek på den tagna (app-)skärmdumpen så att den matchar CSS-storleken på din (app-)skärm (detta sker
på iPhones men även på Mac-datorer med Retina-skärm eftersom DPR är större än 1). Detta leder till att ingen matchning hittas eftersom
den angivna bildselektorn kan ha tagits från den ursprungliga skärmdumpen.
Du kan åtgärda detta genom att uppdatera inställningarna för Appium-servern, se [Appium-dokumentationen](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md#related-settings)
för inställningarna och [den här kommentaren](https://github.com/webdriverio/webdriverio/issues/6097#issuecomment-726675579) för en detaljerad förklaring.

## React-selektorer

WebdriverIO erbjuder ett sätt att välja React-komponenter baserat på komponentnamnet. För detta kan du välja mellan två kommandon: `react$` och `react$$`.

Dessa kommandon låter dig välja komponenter från [React VirtualDOM](https://reactjs.org/docs/faq-internals.html) och returnerar antingen ett enskilt WebdriverIO-element eller en array av element (beroende på vilken funktion som används).

**Obs**: Kommandona `react$` och `react$$` har liknande funktionalitet, förutom att `react$$` returnerar *alla* matchande instanser som en array av WebdriverIO-element, medan `react$` returnerar den första instansen som hittas.

Kommandona fungerar med React 16 till 19, för en app som startar med `createRoot` eller med `ReactDOM.render`. De läser komponenterna i den aktuella renderingen, så de hittar även komponenter som har lagts till genom en tillståndsändring. Om React ännu inte har renderat en rot på sidan väntar de upp till 5 sekunder på den.

#### Grundläggande exempel

```jsx
// index.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'

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

createRoot(document.querySelector('#root')).render(<App />)
```

I koden ovan finns en enkel `MyComponent`-instans i applikationen, som React renderar inuti ett HTML-element med `id="root"`.

Med kommandot `browser.react$` kan du välja en instans av `MyComponent`:

```js
const myCmp = await browser.react$('MyComponent')
```

Nu när du har WebdriverIO-elementet lagrat i variabeln `myCmp` kan du köra elementkommandon mot det.

#### Filtrera komponenter

Du kan filtrera ditt urval utifrån komponentens props och/eller tillstånd. För att göra det, skicka `props` och/eller `state` som kommandots andra argument.

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

Om du vill välja den instans av `MyComponent` som har en prop `name` med värdet `WebdriverIO` kan du köra kommandot så här:

```js
const myCmp = await browser.react$('MyComponent', {
    props: { name: 'WebdriverIO' }
})
```

Om du ville filtrera vårt urval utifrån tillstånd skulle `browser`-kommandot se ut ungefär så här:

```js
const myCmp = await browser.react$('MyComponent', {
    state: { myState: 'some value' }
})
```

Ett filter matchar när var och en av dess nycklar som komponenten också har matchar. En nyckel som komponenten inte har ignoreras. Ett nästlat objekt matchar på samma sätt, och en array matchar när den har ett värde gemensamt med komponentens array. `null`, `false` och `0` matchar samma värde. För en funktionskomponent med hooks är tillståndet det första hookens tillstånd (`useState` eller `useReducer`): om den första hooken är en annan hook, till exempel `useRef`, matchar inte tillståndsfiltret. Med både `props` och `state` måste en komponent matcha båda.

#### Selektorregler

- `*` matchar ett eller flera tecken: `browser.react$$('My*')` hittar `MyComponent` och `MyOtherComponent`.
- Namn separerade med mellanslag hittar en komponent inuti en annan: `browser.react$$('List Item')` hittar varje `Item` inuti en `List`.
- En komponents namn är dess `displayName`, annars namnet på dess funktion eller klass. En komponent från `React.memo` har namnet på sin funktion (utvecklingsbygget av React 17 ger den även memo-objektets `displayName`). En komponent från `React.forwardRef` har inget namn, såvida den inte har ett `displayName`.
- För en högre ordningens komponent med ett namn som `withRouter(MyComponent)` används namnet inom parentesen: `MyComponent`.
- Utan elementavgränsning söker kommandona igenom alla React-rötter på sidan, i dokumentordning, även rötter inuti andra rötter och rötter i öppna shadow roots. `react$` ger den första träffen. För att bara söka i en rot, anropa kommandot på dess container eller på ett element i den roten: `$('#other-root').react$$('MyComponent')`.
- Resultaten kommer rot för rot. Inom en rot kommer de i komponentträdets ordning, nivå för nivå, inte i dokumentordning. `react$$` ger varje DOM-nod en gång.
- För en app i en ram, anropa kommandot på ramens surfkontext (browsing context), eller på ett element i ramen: `(await page.frame({ selector: 'iframe' })).react$$('MyComponent')`.

Kända begränsningar:

- En komponent som endast renderar text ger en textnod. Med WebDriver Classic kan en textnod inte skickas tillbaka, och kommandot misslyckas med `javascript error: circular reference`.
- Medan React hydrerar en `Suspense`-gräns på en serverrenderad sida finns komponenterna inuti den ännu inte. Vänta tills sidan har hydrerats färdigt.

#### Hantera `React.Fragment`

När du använder kommandot `react$` för att välja React-[fragment](https://reactjs.org/docs/fragments.html) returnerar WebdriverIO komponentens första barn som komponentens nod. Om du använder `react$$` får du en array som innehåller alla HTML-noder inuti de fragment som matchar selektorn.

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

Givet exemplet ovan fungerar kommandona så här:

```js
await browser.react$('MyComponent') // returnerar WebdriverIO-elementet för den första <div />
await browser.react$$('MyComponent') // returnerar WebdriverIO-elementen för arrayen [<div />, <div />]
```

**Obs:** Om du har flera instanser av `MyComponent` och använder `react$$` för att välja dessa fragmentkomponenter får du tillbaka en endimensionell array med alla noder. Med andra ord, om du har 3 `<MyComponent />`-instanser får du tillbaka en array med sex WebdriverIO-element.

## Anpassade selektorstrategier


Om din app kräver ett specifikt sätt att hämta element kan du själv definiera en anpassad selektorstrategi som du kan använda med `custom$` och `custom$$`. Registrera i så fall din strategi en gång i början av testet, t.ex. i en `before`-hook:

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L3-L10
```

Givet följande HTML-kodsnutt:

```html reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/example.html#L8-L12
```

Använd den sedan genom att anropa:

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L16-L19
```

**Obs:** detta fungerar endast i en webbmiljö där kommandot [`execute`](/docs/api/browser/execute) kan köras.