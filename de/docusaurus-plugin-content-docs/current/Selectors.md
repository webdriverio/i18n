---
id: selectors
title: Selektoren
description: "Finden Sie Elemente mit CSS, Text, XPath, Accessibility-Name, ARIA-Rolle und anderen Selektor-Strategien und erfahren Sie, welche davon am robustesten sind."
---

Das [WebDriver-Protokoll](https://w3c.github.io/webdriver/) bietet mehrere Selektor-Strategien, um ein Element abzufragen. WebdriverIO vereinfacht diese, damit die Auswahl von Elementen einfach bleibt. Bitte beachten Sie, dass die Befehle zum Abfragen von Elementen zwar `$` und `$$` heißen, sie jedoch nichts mit jQuery oder der [Sizzle Selector Engine](https://github.com/jquery/sizzle) zu tun haben.

Obwohl es so viele verschiedene Selektoren gibt, bieten nur wenige davon eine robuste Möglichkeit, das richtige Element zu finden. Nehmen wir zum Beispiel den folgenden Button:

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

Folgende Selektoren empfehlen wir __bzw.__ empfehlen wir __nicht__:

| Selektor | Empfohlen | Hinweise |
| -------- | ----------- | ----- |
| `$('button')` | 🚨 Niemals | Am schlechtesten – zu generisch, kein Kontext. |
| `$('.btn.btn-large')` | 🚨 Niemals | Schlecht. An das Styling gekoppelt. Sehr anfällig für Änderungen. |
| `$('#main')` | ⚠️ Sparsam | Besser. Aber immer noch an Styling oder JS-Event-Listener gekoppelt. |
| `$(() => document.queryElement('button'))` | ⚠️ Sparsam | Effektive Abfrage, aber komplex zu schreiben. |
| `$('button[name="submission"]')` | ⚠️ Sparsam | An das `name`-Attribut gekoppelt, das HTML-Semantik hat. |
| `$('button[data-testid="submit"]')` | ✅ Gut | Erfordert ein zusätzliches Attribut, nicht mit a11y verbunden. |
| `$('aria/Submit')` | ✅ Gut | Gut. Entspricht der Art, wie der Benutzer mit der Seite interagiert. Es wird empfohlen, Übersetzungsdateien zu verwenden, damit Ihre Tests nicht fehlschlagen, wenn Übersetzungen aktualisiert werden. In WebDriver-BiDi-Sessions wird hierfür der Accessibility-Tree des Browsers verwendet. In Classic-Sessions wird auf XPath zurückgegriffen, was auf großen Seiten langsamer sein kann. |
| `$('button=Submit')` | ✅ Immer | Am besten. Entspricht der Art, wie der Benutzer mit der Seite interagiert, und ist schnell. Es wird empfohlen, Übersetzungsdateien zu verwenden, damit Ihre Tests nicht fehlschlagen, wenn Übersetzungen aktualisiert werden. |

## Strict Mode

Ab v10 ist der Befehl [`$`](/docs/api/browser/$) __strikt__: Er repräsentiert genau ein Element. Wenn der Selektor auf mehr als ein Element passt, wirft der Befehl einen `StrictSelectorError`, anstatt stillschweigend den ersten Treffer auszuwählen:

```js
// there are 12 buttons on the page
await $('button').click()
// StrictSelectorError: strict mode violation: `$("button")` resolved to 12 elements, expected 1.
```

Dies entspricht dem Verhalten von [Playwright-Locators](https://playwright.dev/docs/locators#strictness). Cypress unterscheidet sich hier: Dessen Abfragen können sich zu mehreren Elementen auflösen, und es sind die Aktionsbefehle wie [`.click()`](https://docs.cypress.io/api/commands/click#Click-all-elements-with-id-starting-with-btn), die ein Subjekt mit mehreren Elementen standardmäßig ablehnen. Der Strict Mode deckt zu breit gefasste Selektoren auf, die sonst stillschweigend mit dem falschen Element interagieren würden, sobald die Seite wächst.

Die Regel gilt für jeden Schritt einer [Kette](#chain-selectors) und für jeden Selektortyp, den `$` akzeptiert – String-Selektoren (einschließlich solcher, die das Shadow DOM durchdringen), [JS-Funktionen](#js-function), [mobile Selektoren](#mobile-selectors) und Referenzen auf [benutzerdefinierte Strategien](#custom-selector-strategies).

### Was nicht betroffen ist

- `$$` gibt weiterhin null oder mehrere Elemente als [`ElementArray`](/docs/api/browser/$$) zurück. Warten Sie mit `await` auf die Liste (oder deren `.length`), bevor Sie die Anzahl auslesen oder `for...of` verwenden. `for await` funktioniert direkt auf der Liste.
- Die speziellen Hilfsbefehle `custom$`, `shadow$` und `react$` sind nicht strikt – sie geben weiterhin ihren ersten Treffer zurück, ebenso wie ihre `$$`-Gegenstücke.
- Ein Selektor, der auf nichts passt, gibt weiterhin ein verzögert aufgelöstes Element zurück, sodass [`waitForExist`](/docs/api/element/waitForExist) und das [Auto-Waiting](/docs/autowait)-Verhalten unverändert bleiben.
- Die Übergabe einer Elementreferenz, z. B. `$(await browser.getActiveElement())`, bezieht sich immer auf einen einzelnen Knoten und wird nie geprüft.

:::info Migration auf v10

Wie Sie Ihre Testsuite auf Strict-Mode-Verstöße überprüfen, einzelne Abfragen eingrenzen oder davon ausnehmen und den Strict Mode projektweit deaktivieren, erfahren Sie im [v10-Migrationsleitfaden](/docs/v10-migration).

:::

## CSS Query Selector

Wenn nicht anders angegeben, fragt WebdriverIO Elemente mithilfe des [CSS-Selektor](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)-Musters ab, z. B.:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L7-L8
```

## Link Text

Um ein Anker-Element mit einem bestimmten Text zu erhalten, fragen Sie den Text beginnend mit einem Gleichheitszeichen (`=`) ab.

Zum Beispiel:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L3
```

Sie können dieses Element wie folgt abfragen:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L16-L18
```

## Partial Link Text

Um ein Anker-Element zu finden, dessen sichtbarer Text teilweise mit Ihrem Suchwert übereinstimmt,
fragen Sie es mit `*=` vor dem Suchstring ab (z. B. `*=driver`).

Sie können das Element aus dem obigen Beispiel auch wie folgt abfragen:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L24-L26
```

__Hinweis:__ Sie können nicht mehrere Selektor-Strategien in einem Selektor mischen. Verwenden Sie stattdessen mehrere verkettete Elementabfragen, um dasselbe Ziel zu erreichen, z. B.:

```js
const elem = await $('header h1*=Welcome') // doesn't work!!!
// use instead
const elem = await $('header').$('*=driver')
```

## Element mit bestimmtem Text

Dieselbe Technik kann auch auf Elemente angewendet werden. Zusätzlich ist es möglich, mit `.=` oder `.*=` innerhalb der Abfrage eine Groß-/Kleinschreibung ignorierende Übereinstimmung durchzuführen.

Hier ist zum Beispiel eine Abfrage für eine Überschrift der Ebene 1 mit dem Text "Welcome to my Page":

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L2
```

Sie können dieses Element wie folgt abfragen:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L35C1-L38
```

Oder mithilfe einer Teiltext-Abfrage:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L44C9-L47
```

Dasselbe funktioniert für `id`- und `class`-Namen:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L4
```

Sie können dieses Element wie folgt abfragen:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L49-L67
```

__Hinweis:__ Sie können nicht mehrere Selektor-Strategien in einem Selektor mischen. Verwenden Sie stattdessen mehrere verkettete Elementabfragen, um dasselbe Ziel zu erreichen, z. B.:

```js
const elem = await $('header h1*=Welcome') // doesn't work!!!
// use instead
const elem = await $('header').$('h1*=Welcome')
```

## Tag-Name

Um ein Element mit einem bestimmten Tag-Namen abzufragen, verwenden Sie `<tag>` oder `<tag />`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L5
```

Sie können dieses Element wie folgt abfragen:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L61-L62
```

## Name-Attribut

Um Elemente mit einem bestimmten name-Attribut abzufragen, verwenden Sie einen CSS-Selektor wie `[name="some-name"]`. In einer mobilen Session wird dieselbe Kurzschreibweise mit der `name`-Locator-Strategie von Appium gesendet:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L68-L69
```

__Hinweis:__ Die `name`-Locator-Strategie ist ein Appium-Locator. Desktop-Sessions behalten `[name="some-name"]` bei der CSS-Strategie.

## xPath

Es ist auch möglich, Elemente über einen bestimmten [xPath](https://developer.mozilla.org/en-US/docs/Web/XPath) abzufragen.

Ein xPath-Selektor hat ein Format wie `//body/div[6]/div[1]/span[1]`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/xpath.html
```

Sie können den zweiten Absatz wie folgt abfragen:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L75-L76
```

Sie können xPath auch verwenden, um im DOM-Baum nach oben und unten zu navigieren:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L78-L79
```

## Accessibility-Name-Selektor

Fragen Sie Elemente anhand ihres zugänglichen Namens (Accessible Name) ab. Der zugängliche Name ist das, was ein Screenreader ansagt, wenn das Element den Fokus erhält. Der Wert des zugänglichen Namens kann sowohl sichtbarer Inhalt als auch versteckte Textalternativen sein.

In [WebDriver-BiDi](https://w3c.github.io/webdriver-bidi/)-Sessions (Chrome, Edge, Firefox und andere BiDi-fähige Browser) verwendet WebdriverIO zunächst [`browsingContext.locateNodes`](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes) mit einem Accessibility-Locator. Dieser fragt den Accessibility-Tree des Browsers direkt ab und ist in der Regel deutlich schneller als die XPath-Annäherung. Wenn der Accessibility-Locator nichts findet, greift WebdriverIO auf die Classic-XPath-Heuristik zurück, sodass bestehende `aria/`-Abfragen weiterhin Treffer liefern.

:::info

Mehr über diesen Selektor können Sie in unserem [Release-Blogbeitrag](/blog/2022/09/05/accessibility-selector) lesen.

:::

### Abfrage über `aria-label`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L1
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L86-L87
```

### Abfrage über `aria-labelledby`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L2-L3
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L93-L94
```

### Abfrage über den Inhalt

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L4
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L100-L101
```

### Abfrage über den Titel

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L5
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L107-L108
```

### Abfrage über die `alt`-Eigenschaft

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L114-L115
```

## Role-Selektor

Fragen Sie Elemente anhand ihrer ARIA-Rolle und ihres zugänglichen Namens ab – so, wie ein Screenreader sie beschreibt: „der Button *Add to cart*“. Eine Rolle zusammen mit einem Namen liefert weiterhin Treffer, wenn sich Klassennamen, Test-IDs oder die DOM-Struktur ändern.

```js
await $('role/button[name="Add to cart"]').click()
await expect($('role/heading[name="Order summary"]')).toBeDisplayed()

// role only
const rows = await $$('role/row')

// scoped to a parent element
const dialog = $('role/dialog[name="Checkout"]')
await dialog.$('role/button[name="Pay now"]').click()
```

Die Syntax lautet `role/<role>` oder `role/<role>[name="<accessible name>"]`. Einfache Anführungszeichen funktionieren ebenfalls, und ein Anführungszeichen innerhalb des Namens wird mit einem Backslash maskiert: `role/button[name="Say \"hi\""]`.

- Der Name muss mit dem vollständigen zugänglichen Namen übereinstimmen.
- Die Rolle muss eine ARIA-Rolle sein. Ein Tippfehler schlägt mit der nächstliegenden gültigen Rolle fehl, zum Beispiel `"buton" is not an ARIA role. Did you mean "button"?`.
- `img` und sein ARIA-1.3-Name `image` sind dieselbe Rolle.
- Der Selektor folgt wie jeder andere Selektor dem [Strict Mode](#strict-mode) von `$`.

In einer [WebDriver-BiDi](https://w3c.github.io/webdriver-bidi/)-Session übergibt WebdriverIO Rolle und Name an [`browsingContext.locateNodes`](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes). Der Browser berechnet beides selbst, auf dieselbe Weise, wie assistive Technologien die Seite sehen. Elemente innerhalb offener Shadow Roots und innerhalb von Frames, einschließlich Frames anderer Origins, werden gefunden. Wenn der Browser kein Element findet, gibt es keinen Rückgriff auf eine Heuristik. Beachten Sie, dass der Browser die Rolle bestimmt: Beispielsweise kann eine `<table>` ohne Header oder Caption eine Layout-Tabelle sein, deren Zeilen dann keine `row`-Rolle haben.

In einer WebDriver-Classic-Session, und wenn ein Browser den Role-Locator nicht unterstützt, berechnet WebdriverIO Rolle und zugänglichen Namen in der Seite mit [`dom-accessibility-api`](https://github.com/eps1lon/dom-accessibility-api), der Implementierung, die auch Testing Library verwendet. Ein Textfeld ohne Label wird, wie in Browsern, über seinen `placeholder` benannt. Der Role-Selektor ist in einem nativen mobilen App-Kontext nicht verfügbar. Verwenden Sie dort eine [Accessibility ID](#accessibility-id).

## ARIA - Role-Attribut

Um Elemente anhand von [ARIA-Rollen](https://www.w3.org/TR/html-aria/#docconformance) abzufragen, können Sie die Rolle des Elements direkt als Selektorparameter angeben, z. B. `[role=button]`. Dieser Selektor leitet die Rolle näherungsweise aus dem Elementnamen und den Attributen ab. Bevorzugen Sie den [Role-Selektor](#role-selector), der die vom Browser berechnete Rolle verwendet und zusätzlich den zugänglichen Namen abgleichen kann:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L13
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L131-L132
```

## ID-Attribut

Die Locator-Strategie "id" wird im WebDriver-Protokoll nicht unterstützt. Stattdessen sollten CSS- oder xPath-Selektor-Strategien verwendet werden, um Elemente über ihre ID zu finden.

Einige Treiber (z. B. [Appium You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)) könnten diesen Selektor jedoch weiterhin [unterstützen](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies).

Derzeit unterstützte Selektor-Syntaxen für IDs sind:

```js
//css locator
const button = await $('#someid')
//xpath locator
const button = await $('//*[@id="someid"]')
//id strategy
// Note: works only in Appium or similar frameworks which supports locator strategy "ID"
const button = await $('id=resource-id/iosname')
```

## JS-Funktion

Sie können auch JavaScript-Funktionen verwenden, um Elemente mithilfe nativer Web-APIs abzurufen. Dies ist natürlich nur innerhalb eines Web-Kontexts möglich (z. B. `browser` oder Web-Kontext auf Mobilgeräten).

Gegeben sei die folgende HTML-Struktur:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/js.html
```

Sie können das Geschwisterelement von `#elem` wie folgt abfragen:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L139-L143
```

## Deep Selectors

:::warning

Ab `v9` von WebdriverIO wird dieser spezielle Selektor nicht mehr benötigt, da WebdriverIO das Shadow DOM automatisch für Sie durchdringt. Es wird empfohlen, von diesem Selektor wegzumigrieren, indem Sie das `>>>` davor entfernen.

:::

In einer WebDriver-BiDi-Session suchen `$` und `$$` in jedem offenen Shadow Root: in Roots, die mit `attachShadow()` erstellt wurden, und in deklarativen Shadow Roots (`<template shadowrootmode="open">`), die die Seite oder `setHTMLUnsafe()` dem Dokument hinzufügt. Sie suchen nicht in einem geschlossenen deklarativen Shadow Root oder in einem deklarativen Shadow Root, den `setHTMLUnsafe()` in einem Element erstellt, das noch nicht im Dokument ist. Verwenden Sie für diese Fälle [`shadow$`](https://webdriver.io/docs/api/element/shadow$) auf dem Host-Element.

Viele Frontend-Anwendungen setzen stark auf Elemente mit [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM). Es ist technisch unmöglich, Elemente innerhalb des Shadow DOM ohne Workarounds abzufragen. [`shadow$`](https://webdriver.io/docs/api/element/shadow$) und [`shadow$$`](https://webdriver.io/docs/api/element/shadow$$) waren solche Workarounds, die ihre [Einschränkungen](https://github.com/Georgegriff/query-selector-shadow-dom#how-is-this-different-to-shadow) hatten. Mit dem Deep Selector können Sie nun alle Elemente innerhalb eines beliebigen Shadow DOM mit dem üblichen Abfragebefehl abfragen.

Angenommen, wir haben eine Anwendung mit folgender Struktur:

![Chrome Example](https://github.com/Georgegriff/query-selector-shadow-dom/raw/main/Chrome-example.png "Chrome Example")

Mit diesem Selektor können Sie das `<button />`-Element abfragen, das in einem anderen Shadow DOM verschachtelt ist, z. B.:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L147-L149
```

## Mobile Selektoren

Beim hybriden mobilen Testen ist es wichtig, dass sich der Automatisierungsserver im richtigen *Kontext* befindet, bevor Befehle ausgeführt werden. Für die Automatisierung von Gesten sollte der Treiber idealerweise auf den nativen Kontext eingestellt sein. Um jedoch Elemente aus dem DOM auszuwählen, muss der Treiber auf den Webview-Kontext der Plattform eingestellt sein. Erst *dann* können die oben genannten Methoden verwendet werden.

Beim nativen mobilen Testen gibt es keinen Wechsel zwischen Kontexten, da Sie mobile Strategien verwenden und die zugrunde liegende Geräteautomatisierungstechnologie direkt nutzen müssen. Dies ist besonders nützlich, wenn ein Test eine feinkörnige Kontrolle über das Auffinden von Elementen benötigt.

### Android UiAutomator

Das UI-Automator-Framework von Android bietet eine Reihe von Möglichkeiten, Elemente zu finden. Sie können die [UI Automator API](https://developer.android.com/tools/testing-support-library/index.html#uia-apis), insbesondere die [UiSelector-Klasse](https://developer.android.com/reference/androidx/test/uiautomator/UiSelector), verwenden, um Elemente zu lokalisieren. In Appium senden Sie den Java-Code als String an den Server, der ihn in der Umgebung der Anwendung ausführt und das Element bzw. die Elemente zurückgibt.

```js
const selector = 'new UiSelector().text("Cancel").className("android.widget.Button")'
const button = await $(`android=${selector}`)
await button.click()
```

### Android DataMatcher und ViewMatcher (nur Espresso)

Die DataMatcher-Strategie von Android bietet eine Möglichkeit, Elemente per [Data Matcher](https://developer.android.com/reference/android/support/test/espresso/DataInteraction) zu finden.

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"]
})
await menuItem.click()
```

Und analog dazu per [View Matcher](https://developer.android.com/reference/android/support/test/espresso/ViewInteraction)

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"],
  "class": "androidx.test.espresso.matcher.ViewMatchers"
})
await menuItem.click()
```

### Android View Tag (nur Espresso)

Die View-Tag-Strategie bietet eine bequeme Möglichkeit, Elemente anhand ihres [Tags](https://developer.android.com/reference/android/support/test/espresso/matcher/ViewMatchers.html#withTagValue%28org.hamcrest.Matcher%3Cjava.lang.Object%3E%29) zu finden.

```js
const elem = await $('-android viewtag:tag_identifier')
await elem.click()
```

### iOS UIAutomation

Bei der Automatisierung einer iOS-Anwendung kann Apples [UI Automation Framework](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html) verwendet werden, um Elemente zu finden.

Diese JavaScript-[API](https://developer.apple.com/library/ios/documentation/DeveloperTools/Reference/UIAutomationRef/index.html#//apple_ref/doc/uid/TP40009771) verfügt über Methoden, um auf die View und alles darauf zuzugreifen.

```js
const selector = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
const button = await $(`ios=${selector}`)
await button.click()
```

Sie können innerhalb von iOS UI Automation in Appium auch die Prädikatsuche verwenden, um die Elementauswahl weiter zu verfeinern. Details finden Sie [hier](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/ios/ios-predicate.md).

### iOS XCUITest Predicate Strings und Class Chains

Ab iOS 10 (mit dem `XCUITest`-Treiber) können Sie [Predicate Strings](https://github.com/facebook/WebDriverAgent/wiki/Predicate-Queries-Construction-Rules) verwenden:

```js
const selector = `type == 'XCUIElementTypeSwitch' && name CONTAINS 'Allow'`
const switch = await $(`-ios predicate string:${selector}`)
await switch.click()
```

Und [Class Chains](https://github.com/facebook/WebDriverAgent/wiki/Class-Chain-Queries-Construction-Rules):

```js
const selector = '**/XCUIElementTypeCell[`name BEGINSWITH "D"`]/**/XCUIElementTypeButton'
const button = await $(`-ios class chain:${selector}`)
await button.click()
```

### Accessibility ID

Die Locator-Strategie `accessibility id` ist dafür gedacht, einen eindeutigen Bezeichner für ein UI-Element auszulesen. Dies hat den Vorteil, dass er sich bei der Lokalisierung oder anderen Prozessen, die Text verändern könnten, nicht ändert. Darüber hinaus kann sie beim Erstellen plattformübergreifender Tests hilfreich sein, wenn funktional gleiche Elemente dieselbe Accessibility ID haben.

- Für iOS ist dies der `accessibility identifier`, wie von Apple [hier](https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UIAccessibilityIdentification_Protocol/index.html) beschrieben.
- Für Android entspricht die `accessibility id` der `content-description` des Elements, wie [hier](https://developer.android.com/training/accessibility/accessible-app.html) beschrieben.

Für beide Plattformen ist das Abrufen eines Elements (oder mehrerer Elemente) über ihre `accessibility id` in der Regel die beste Methode. Sie ist außerdem der veralteten `name`-Strategie vorzuziehen.

```js
const elem = await $('~my_accessibility_identifier')
await elem.click()
```

### Class Name

Die `class name`-Strategie ist ein `string`, der ein UI-Element in der aktuellen View repräsentiert.

- Für iOS ist es der vollständige Name einer [UIAutomation-Klasse](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html) und beginnt mit `UIA-`, z. B. `UIATextField` für ein Textfeld. Eine vollständige Referenz finden Sie [hier](https://developer.apple.com/library/ios/navigation/#section=Frameworks&topic=UIAutomation).
- Für Android ist es der vollqualifizierte Name einer [UI Automator](https://developer.android.com/tools/testing-support-library/index.html#UIAutomator)-[Klasse](https://developer.android.com/reference/android/widget/package-summary.html), z. B. `android.widget.EditText` für ein Textfeld. Eine vollständige Referenz finden Sie [hier](https://developer.android.com/reference/android/widget/package-summary.html).
- Für Youi.tv ist es der vollständige Name einer Youi.tv-Klasse und beginnt mit `CYI-`, z. B. `CYIPushButtonView` für ein Push-Button-Element. Eine vollständige Referenz finden Sie auf der [GitHub-Seite des You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver)

```js
// iOS example
await $('UIATextField').click()
// Android example
await $('android.widget.DatePicker').click()
// Youi.tv example
await $('CYIPushButtonView').click()
```

## Verkettete Selektoren

Wenn Sie Ihre Abfrage genauer gestalten möchten, können Sie Selektoren verketten, bis Sie das richtige
Element gefunden haben. Wenn Sie `element` vor Ihrem eigentlichen Befehl aufrufen, beginnt WebdriverIO die Abfrage bei diesem Element.

Wenn Sie zum Beispiel eine DOM-Struktur wie diese haben:

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

Und Sie möchten Produkt B in den Warenkorb legen, wäre das allein mit dem CSS-Selektor schwierig.

Mit der Verkettung von Selektoren ist es viel einfacher. Grenzen Sie das gewünschte Element einfach Schritt für Schritt ein:

```js
await $('.row .entry:nth-child(2)').$('button*=Add').click()
```

### Appium Image Selector

Mit der Locator-Strategie `-image` ist es möglich, Appium eine Bilddatei zu senden, die ein Element repräsentiert, auf das Sie zugreifen möchten.

Unterstützte Dateiformate: `jpg,png,gif,bmp,svg`

Eine vollständige Referenz finden Sie [hier](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md)

```js
const elem = await $('./file/path/of/image/test.jpg')
await elem.click()
```

**Hinweis**: Appium arbeitet mit diesem Selektor so, dass intern ein (App-)Screenshot erstellt und der bereitgestellte Bild-Selektor verwendet wird,
um zu prüfen, ob das Element in diesem (App-)Screenshot gefunden werden kann.

Beachten Sie, dass Appium den aufgenommenen (App-)Screenshot möglicherweise skaliert, damit er der CSS-Größe Ihres (App-)Bildschirms entspricht (dies geschieht
auf iPhones, aber auch auf Mac-Rechnern mit Retina-Display, da die DPR größer als 1 ist). Dies führt dazu, dass kein Treffer gefunden wird, weil
der bereitgestellte Bild-Selektor möglicherweise aus dem ursprünglichen Screenshot stammt.
Sie können dies beheben, indem Sie die Einstellungen des Appium-Servers anpassen. Siehe die [Appium-Dokumentation](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md#related-settings)
für die Einstellungen und [diesen Kommentar](https://github.com/webdriverio/webdriverio/issues/6097#issuecomment-726675579) für eine ausführliche Erklärung.

## React-Selektoren

WebdriverIO bietet eine Möglichkeit, React-Komponenten anhand des Komponentennamens auszuwählen. Dazu stehen Ihnen zwei Befehle zur Verfügung: `react$` und `react$$`.

Mit diesen Befehlen können Sie Komponenten aus dem [React VirtualDOM](https://reactjs.org/docs/faq-internals.html) auswählen und entweder ein einzelnes WebdriverIO-Element oder ein Array von Elementen zurückgeben (je nachdem, welche Funktion verwendet wird).

**Hinweis**: Die Befehle `react$` und `react$$` sind in ihrer Funktionalität ähnlich, mit dem Unterschied, dass `react$$` *alle* passenden Instanzen als Array von WebdriverIO-Elementen zurückgibt, während `react$` die erste gefundene Instanz zurückgibt.

Die Befehle funktionieren mit React 16 bis 19, für eine App, die mit `createRoot` oder mit `ReactDOM.render` startet. Sie lesen die Komponenten des aktuellen Renderings, finden also auch Komponenten, die durch eine Zustandsänderung hinzugekommen sind. Wenn React noch keinen Root der Seite gerendert hat, warten sie bis zu 5 Sekunden darauf.

#### Einfaches Beispiel

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

Im obigen Code gibt es eine einfache `MyComponent`-Instanz innerhalb der Anwendung, die React in einem HTML-Element mit `id="root"` rendert.

Mit dem Befehl `browser.react$` können Sie eine Instanz von `MyComponent` auswählen:

```js
const myCmp = await browser.react$('MyComponent')
```

Da Sie das WebdriverIO-Element nun in der Variable `myCmp` gespeichert haben, können Sie Element-Befehle darauf ausführen.

#### Komponenten filtern

Sie können Ihre Auswahl nach den Props und/oder dem State der Komponente filtern. Übergeben Sie dazu `props` und/oder `state` im zweiten Argument des Befehls.

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

Wenn Sie die Instanz von `MyComponent` auswählen möchten, die eine Prop `name` mit dem Wert `WebdriverIO` hat, können Sie den Befehl wie folgt ausführen:

```js
const myCmp = await browser.react$('MyComponent', {
    props: { name: 'WebdriverIO' }
})
```

Wenn Sie Ihre Auswahl nach State filtern möchten, würde der `browser`-Befehl etwa so aussehen:

```js
const myCmp = await browser.react$('MyComponent', {
    state: { myState: 'some value' }
})
```

Ein Filter passt, wenn jeder seiner Schlüssel, den auch die Komponente hat, übereinstimmt. Ein Schlüssel, den die Komponente nicht hat, wird ignoriert. Ein verschachteltes Objekt wird auf dieselbe Weise abgeglichen, und ein Array passt, wenn es einen Wert mit dem Array der Komponente gemeinsam hat. `null`, `false` und `0` passen auf denselben Wert. Bei einer Funktionskomponente mit Hooks ist der State der State des ersten Hooks (`useState` oder `useReducer`): Wenn der erste Hook ein anderer Hook ist, zum Beispiel `useRef`, passt der State-Filter nicht. Bei Angabe von sowohl `props` als auch `state` muss eine Komponente beide erfüllen.

#### Selektor-Regeln

- `*` passt auf ein oder mehrere Zeichen: `browser.react$$('My*')` findet `MyComponent` und `MyOtherComponent`.
- Durch Leerzeichen getrennte Namen finden eine Komponente innerhalb einer anderen: `browser.react$$('List Item')` findet jedes `Item` innerhalb einer `List`.
- Der Name einer Komponente ist ihr `displayName`, andernfalls der Name ihrer Funktion oder Klasse. Eine Komponente von `React.memo` hat den Namen ihrer Funktion (der Development-Build von React 17 gibt ihr außerdem den `displayName` des Memo-Objekts). Eine Komponente von `React.forwardRef` hat keinen Namen, es sei denn, sie hat einen `displayName`.
- Bei einer Higher-Order-Komponente mit einem Namen wie `withRouter(MyComponent)` wird der Name innerhalb der Klammern verwendet: `MyComponent`.
- Ohne Element-Scope durchsuchen die Befehle alle React-Roots der Seite in Dokumentreihenfolge, auch Roots innerhalb anderer Roots und Roots in offenen Shadow Roots. `react$` liefert den ersten Treffer. Um nur einen Root zu durchsuchen, rufen Sie den Befehl auf dessen Container oder auf einem Element dieses Roots auf: `$('#other-root').react$$('MyComponent')`.
- Die Ergebnisse kommen Root für Root. Innerhalb eines Roots kommen sie in der Reihenfolge des Komponentenbaums, Ebene für Ebene, nicht in Dokumentreihenfolge. `react$$` liefert jeden DOM-Knoten nur einmal.
- Für eine App in einem Frame rufen Sie den Befehl auf dem Browsing-Kontext des Frames oder auf einem Element des Frames auf: `(await page.frame({ selector: 'iframe' })).react$$('MyComponent')`.

Bekannte Einschränkungen:

- Eine Komponente, die nur Text rendert, liefert einen Textknoten. Mit WebDriver Classic kann ein Textknoten nicht zurückgesendet werden, und der Befehl schlägt mit `javascript error: circular reference` fehl.
- Während React eine `Suspense`-Boundary einer serverseitig gerenderten Seite hydriert, existieren die Komponenten darin noch nicht. Warten Sie, bis die Seite die Hydrierung abgeschlossen hat.

#### Umgang mit `React.Fragment`

Wenn Sie den Befehl `react$` verwenden, um React-[Fragments](https://reactjs.org/docs/fragments.html) auszuwählen, gibt WebdriverIO das erste Kind dieser Komponente als Knoten der Komponente zurück. Wenn Sie `react$$` verwenden, erhalten Sie ein Array mit allen HTML-Knoten innerhalb der Fragments, die dem Selektor entsprechen.

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

Im obigen Beispiel würden die Befehle so funktionieren:

```js
await browser.react$('MyComponent') // returns the WebdriverIO Element for the first <div />
await browser.react$$('MyComponent') // returns the WebdriverIO Elements for the array [<div />, <div />]
```

**Hinweis:** Wenn Sie mehrere Instanzen von `MyComponent` haben und `react$$` verwenden, um diese Fragment-Komponenten auszuwählen, erhalten Sie ein eindimensionales Array aller Knoten. Mit anderen Worten: Wenn Sie 3 `<MyComponent />`-Instanzen haben, erhalten Sie ein Array mit sechs WebdriverIO-Elementen.

## Benutzerdefinierte Selektor-Strategien


Wenn Ihre App eine spezielle Methode zum Abrufen von Elementen erfordert, können Sie selbst eine benutzerdefinierte Selektor-Strategie definieren, die Sie mit `custom$` und `custom$$` verwenden können. Registrieren Sie dazu Ihre Strategie einmalig zu Beginn des Tests, z. B. in einem `before`-Hook:

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L3-L10
```

Gegeben sei das folgende HTML-Snippet:

```html reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/example.html#L8-L12
```

Verwenden Sie die Strategie dann wie folgt:

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L16-L19
```

**Hinweis:** Dies funktioniert nur in einer Web-Umgebung, in der der Befehl [`execute`](/docs/api/browser/execute) ausgeführt werden kann.