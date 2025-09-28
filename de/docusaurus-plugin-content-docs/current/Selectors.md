---
id: selectors
title: Selektoren
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

Wir __empfehlen__ und __empfehlen nicht__ die folgenden Selektoren:

| Selektor | Empfohlen | Hinweise |
| -------- | ----------- | ----- |
| `$('button')` | 🚨 Niemals | Schlechteste Wahl - zu generisch, kein Kontext. |
| `$('.btn.btn-large')` | 🚨 Niemals | Schlecht. An Styling gekoppelt. Stark änderungsanfällig. |
| `$('#main')` | ⚠️ Sparsam | Besser. Aber immer noch an Styling oder JS Event-Listener gekoppelt. |
| `$(() => document.queryElement('button'))` | ⚠️ Sparsam | Effektive Abfrage, komplex zu schreiben. |
| `$('button[name="submission"]')` | ⚠️ Sparsam | An das `name`-Attribut gekoppelt, das HTML-Semantik hat. |
| `$('button[data-testid="submit"]')` | ✅ Gut | Erfordert zusätzliches Attribut, nicht mit a11y verbunden. |
| `$('aria/Submit')` | ✅ Gut | Gut. Spiegelt wider, wie der Benutzer mit der Seite interagiert. Es wird empfohlen, Übersetzungsdateien zu verwenden, damit Ihre Tests nicht brechen, wenn Übersetzungen aktualisiert werden. Hinweis: Dieser Selektor kann auf großen Seiten langsamer sein als andere. |
| `$('button=Submit')` | ✅ Immer | Am besten. Spiegelt wider, wie der Benutzer mit der Seite interagiert und ist schnell. Es wird empfohlen, Übersetzungsdateien zu verwenden, damit Ihre Tests nicht brechen, wenn Übersetzungen aktualisiert werden. |

## CSS Query Selector

If not indicated otherwise, WebdriverIO will query elements using the [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) pattern, e.g.:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L7-L8
```

## Link Text

Um ein Ankerelement mit einem bestimmten Text zu erhalten, fragen Sie den Text ab, der mit einem Gleichheitszeichen (`=`) beginnt.

Zum Beispiel:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L3
```

Sie können dieses Element abrufen, indem Sie aufrufen:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L16-L18
```

## Partial Link Text

Um ein Ankerelement zu finden, dessen sichtbarer Text teilweise mit Ihrem Suchwert übereinstimmt,
fragen Sie es ab, indem Sie `*=` vor die Abfragezeichenfolge setzen (z.B. `*=driver`).

Sie können das Element aus dem obigen Beispiel auch abrufen, indem Sie aufrufen:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L24-L26
```

__Hinweis:__ Sie können nicht mehrere Selektorstrategien in einem Selektor mischen. Verwenden Sie mehrere verkettete Elementabfragen, um dasselbe Ziel zu erreichen, z.B.:

```js
const elem = await $('header h1*=Welcome') // funktioniert nicht!!!
// verwenden Sie stattdessen
const elem = await $('header').$('*=driver')
```

## Element mit bestimmtem Text

Die gleiche Technik kann auch auf Elemente angewendet werden. Zusätzlich ist es auch möglich, einen Abgleich ohne Berücksichtigung der Groß- und Kleinschreibung mit `.=` oder `.*=` innerhalb der Abfrage durchzuführen.

Zum Beispiel, hier ist eine Abfrage für eine Überschrift der Ebene 1 mit dem Text "Welcome to my Page":

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L2
```

Sie können dieses Element abrufen, indem Sie aufrufen:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L35C1-L38
```

Oder durch die Abfrage von Teiltext:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L44C9-L47
```

Das Gleiche funktioniert für `id` und `class` Namen:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L4
```

Sie können dieses Element abrufen, indem Sie aufrufen:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L49-L67
```

__Hinweis:__ Sie können nicht mehrere Selektorstrategien in einem Selektor mischen. Verwenden Sie mehrere verkettete Elementabfragen, um dasselbe Ziel zu erreichen, z.B.:

```js
const elem = await $('header h1*=Welcome') // funktioniert nicht!!!
// verwenden Sie stattdessen
const elem = await $('header').$('h1*=Welcome')
```

## Tag Name

Um ein Element mit einem bestimmten Tag-Namen abzufragen, verwenden Sie `<tag>` oder `<tag />`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L5
```

Sie können dieses Element abrufen, indem Sie aufrufen:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L61-L62
```

## Name Attribute

Zum Abfragen von Elementen mit einem bestimmten Name-Attribut können Sie entweder einen normalen CSS3-Selektor oder die vom [JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol) bereitgestellte Name-Strategie verwenden, indem Sie etwas wie [name="some-name"] als Selektor-Parameter übergeben:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L68-L69
```

__Hinweis:__ Diese Selektorstrategie ist veraltet und funktioniert nur in alten Browsern, die vom JSONWireProtocol ausgeführt werden oder bei Verwendung von Appium.

## xPath

Es ist auch möglich, Elemente über einen bestimmten [xPath](https://developer.mozilla.org/en-US/docs/Web/XPath) abzufragen.

Ein xPath-Selektor hat ein Format wie `//body/div[6]/div[1]/span[1]`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/xpath.html
```

Sie können den zweiten Absatz abrufen, indem Sie aufrufen:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L75-L76
```

Sie können xPath auch verwenden, um im DOM-Baum nach oben und unten zu navigieren:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L78-L79
```

## Accessibility Name Selector

Elemente anhand ihres zugänglichen Namens abfragen. Der zugängliche Name ist das, was von einem Screenreader angekündigt wird, wenn dieses Element den Fokus erhält. Der Wert des zugänglichen Namens kann sowohl visueller Inhalt als auch versteckte Textalternativen sein.

:::info

Mehr über diesen Selektor erfahren Sie in unserem [Release-Blog-Beitrag](/blog/2022/09/05/accessibility-selector)

:::

### Abrufen nach `aria-label`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L1
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L86-L87
```

### Abrufen nach `aria-labelledby`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L2-L3
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L93-L94
```

### Abrufen nach Inhalt

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L4
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L100-L101
```

### Abrufen nach Titel

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L5
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L107-L108
```

### Abrufen nach `alt`-Eigenschaft

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L114-L115
```

## ARIA - Role Attribute

Zum Abfragen von Elementen basierend auf [ARIA-Rollen](https://www.w3.org/TR/html-aria/#docconformance) können Sie direkt die Rolle des Elements wie `[role=button]` als Selektor-Parameter angeben:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L13
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L131-L132
```

## ID Attribute

Die Locator-Strategie "id" wird im WebDriver-Protokoll nicht unterstützt. Man sollte stattdessen entweder CSS- oder xPath-Selektorstrategien verwenden, um Elemente anhand ihrer ID zu finden.

Allerdings könnten einige Treiber (z.B. [Appium You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)) diesen Selektor immer noch [unterstützen](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies).

Aktuell unterstützte Selektor-Syntaxen für ID sind:

```js
//css locator
const button = await $('#someid')
//xpath locator
const button = await $('//*[@id="someid"]')
//id strategy
// Hinweis: funktioniert nur in Appium oder ähnlichen Frameworks, die die Locator-Strategie "ID" unterstützen
const button = await $('id=resource-id/iosname')
```

## JS Function

Sie können auch JavaScript-Funktionen verwenden, um Elemente mit nativen Web-APIs abzurufen. Natürlich können Sie dies nur innerhalb eines Web-Kontexts tun (z.B. `browser` oder Web-Kontext in mobilen Anwendungen).

Gegeben die folgende HTML-Struktur:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/js.html
```

Sie können das Geschwisterelement von `#elem` wie folgt abfragen:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L139-L143
```

## Deep Selectors

:::warning

Ab Version `v9` von WebdriverIO gibt es keinen Bedarf mehr für diesen speziellen Selektor, da WebdriverIO automatisch durch den Shadow DOM für Sie hindurchgeht. Es wird empfohlen, von diesem Selektor wegzumigrieren, indem Sie das `>>>` davor entfernen.

:::

Viele Frontend-Anwendungen verlassen sich stark auf Elemente mit [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM). Es ist technisch unmöglich, Elemente innerhalb des Shadow DOM ohne Umwege abzufragen. Die [`shadow$`](https://webdriver.io/docs/api/element/shadow$) und [`shadow$$`](https://webdriver.io/docs/api/element/shadow$$) waren solche Umwege, die ihre [Einschränkungen](https://github.com/Georgegriff/query-selector-shadow-dom#how-is-this-different-to-shadow) hatten. Mit dem Deep-Selektor können Sie jetzt alle Elemente innerhalb eines Shadow DOM mit dem üblichen Abfragebefehl abfragen.

Angenommen, wir haben eine Anwendung mit der folgenden Struktur:

![Chrome Example](https://github.com/Georgegriff/query-selector-shadow-dom/raw/main/Chrome-example.png "Chrome Example")

Mit diesem Selektor können Sie das `<button />` Element abfragen, das in einem anderen Shadow DOM verschachtelt ist, z.B.:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L147-L149
```

## Mobile Selectors

Für hybrides mobiles Testen ist es wichtig, dass sich der Automatisierungsserver im richtigen *Kontext* befindet, bevor Befehle ausgeführt werden. Für die Automatisierung von Gesten sollte der Treiber idealerweise auf den nativen Kontext eingestellt sein. Um jedoch Elemente aus dem DOM auszuwählen, muss der Treiber auf den Webview-Kontext der Plattform eingestellt werden. Erst *dann* können die oben genannten Methoden verwendet werden.

Für natives mobiles Testen gibt es keinen Wechsel zwischen Kontexten, da Sie mobile Strategien verwenden und direkt auf die zugrunde liegende Geräteautomatisierungstechnologie zugreifen müssen. Dies ist besonders nützlich, wenn ein Test eine feinere Kontrolle über das Finden von Elementen benötigt.

### Android UiAutomator

Android's UI Automator-Framework bietet eine Reihe von Möglichkeiten, Elemente zu finden. Sie können die [UI Automator API](https://developer.android.com/tools/testing-support-library/index.html#uia-apis), insbesondere die [UiSelector-Klasse](https://developer.android.com/reference/androidx/test/uiautomator/UiSelector) verwenden, um Elemente zu lokalisieren. In Appium senden Sie den Java-Code als String an den Server, der ihn in der Umgebung der Anwendung ausführt und das Element oder die Elemente zurückgibt.

```js
const selector = 'new UiSelector().text("Cancel").className("android.widget.Button")'
const button = await $(`android=${selector}`)
await button.click()
```

### Android DataMatcher and ViewMatcher (nur Espresso)

Android's DataMatcher-Strategie bietet eine Möglichkeit, Elemente mit [Data Matcher](https://developer.android.com/reference/android/support/test/espresso/DataInteraction) zu finden

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"]
})
await menuItem.click()
```

Und ähnlich [View Matcher](https://developer.android.com/reference/android/support/test/espresso/ViewInteraction)

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

Diese JavaScript [API](https://developer.apple.com/library/ios/documentation/DeveloperTools/Reference/UIAutomationRef/index.html#//apple_ref/doc/uid/TP40009771) hat Methoden, um auf die Ansicht und alles darauf zuzugreifen.

```js
const selector = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
const button = await $(`ios=${selector}`)
await button.click()
```

Sie können auch die Prädikatsuche innerhalb der iOS UI Automation in Appium verwenden, um die Elementauswahl noch weiter zu verfeinern. Details finden Sie [hier](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/ios/ios-predicate.md).

### iOS XCUITest Prädikat-Strings und Klassenverkettungen

Mit iOS 10 und höher (bei Verwendung des `XCUITest`-Treibers) können Sie [Prädikat-Strings](https://github.com/facebook/WebDriverAgent/wiki/Predicate-Queries-Construction-Rules) verwenden:

```js
const selector = `type == 'XCUIElementTypeSwitch' && name CONTAINS 'Allow'`
const switch = await $(`-ios predicate string:${selector}`)
await switch.click()
```

Und [Klassenverkettungen](https://github.com/facebook/WebDriverAgent/wiki/Class-Chain-Queries-Construction-Rules):

```js
const selector = '**/XCUIElementTypeCell[`name BEGINSWITH "D"`]/**/XCUIElementTypeButton'
const button = await $(`-ios class chain:${selector}`)
await button.click()
```

### Accessibility ID

Die Locator-Strategie `accessibility id` ist so konzipiert, dass sie eine eindeutige Kennung für ein UI-Element liest. Dies hat den Vorteil, dass sie sich während der Lokalisierung oder eines anderen Prozesses, der Text ändern könnte, nicht ändert. Außerdem kann sie bei der Erstellung plattformübergreifender Tests helfen, wenn Elemente, die funktional gleich sind, dieselbe Accessibility ID haben.

- Für iOS ist dies der `accessibility identifier`, der von Apple [hier](https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UIAccessibilityIdentification_Protocol/index.html) beschrieben wird.
- Für Android wird die `accessibility id` auf die `content-description` für das Element abgebildet, wie [hier](https://developer.android.com/training/accessibility/accessible-app.html) beschrieben.

Für beide Plattformen ist das Abrufen eines Elements (oder mehrerer Elemente) anhand ihrer `accessibility id` in der Regel die beste Methode. Es ist auch die bevorzugte Methode gegenüber der veralteten `name`-Strategie.

```js
const elem = await $('~my_accessibility_identifier')
await elem.click()
```

### Class Name

Die Strategie `class name` ist ein `string`, der ein UI-Element in der aktuellen Ansicht repräsentiert.

- Für iOS ist es der vollständige Name einer [UIAutomation-Klasse](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html) und beginnt mit `UIA-`, wie z.B. `UIATextField` für ein Textfeld. Eine vollständige Referenz finden Sie [hier](https://developer.apple.com/library/ios/navigation/#section=Frameworks&topic=UIAutomation).
- Für Android ist es der vollständig qualifizierte Name einer [UI Automator](https://developer.android.com/tools/testing-support-library/index.html#UIAutomator) [Klasse](https://developer.android.com/reference/android/widget/package-summary.html), wie z.B. `android.widget.EditText` für ein Textfeld. Eine vollständige Referenz finden Sie [hier](https://developer.android.com/reference/android/widget/package-summary.html).
- Für Youi.tv ist es der vollständige Name einer Youi.tv-Klasse und beginnt mit `CYI-`, wie z.B. `CYIPushButtonView` für ein Druckknopfelement. Eine vollständige Referenz finden Sie auf der [GitHub-Seite des You.i Engine Drivers](https://github.com/YOU-i-Labs/appium-youiengine-driver)

```js
// iOS Beispiel
await $('UIATextField').click()
// Android Beispiel
await $('android.widget.DatePicker').click()
// Youi.tv Beispiel
await $('CYIPushButtonView').click()
```

## Chain Selectors

Wenn Sie bei Ihrer Abfrage spezifischer sein möchten, können Sie Selektoren verketten, bis Sie das richtige Element gefunden haben. Wenn Sie `element` vor Ihrem eigentlichen Befehl aufrufen, beginnt WebdriverIO die Abfrage von diesem Element aus.

Wenn Sie beispielsweise eine DOM-Struktur wie die folgende haben:

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

Und Sie möchten Produkt B in den Warenkorb legen, wäre es schwierig, dies nur mit dem CSS-Selektor zu tun.

Mit der Selektor-Verkettung ist es viel einfacher. Grenzen Sie das gewünschte Element einfach Schritt für Schritt ein:

```js
await $('.row .entry:nth-child(2)').$('button*=Add').click()
```

### Appium Image Selector

Mit der Locator-Strategie `-image` ist es möglich, an Appium eine Bilddatei zu senden, die ein Element darstellt, auf das Sie zugreifen möchten.

Unterstützte Dateiformate: `jpg,png,gif,bmp,svg`

Eine vollständige Referenz finden Sie [hier](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md)

```js
const elem = await $('./file/path/of/image/test.jpg')
await elem.click()
```

**Hinweis**: Die Art und Weise, wie Appium mit diesem Selektor arbeitet, ist, dass es intern einen (App-)Screenshot macht und den bereitgestellten Bildselektor verwendet, um zu überprüfen, ob das Element in diesem (App-)Screenshot gefunden werden kann.

Beachten Sie, dass Appium möglicherweise den aufgenommenen (App-)Screenshot verkleinert, um ihn an die CSS-Größe Ihres (App-)Bildschirms anzupassen (dies geschieht auf iPhones, aber auch auf Mac-Geräten mit einem Retina-Display, da die DPR größer als 1 ist). Dies führt dazu, dass keine Übereinstimmung gefunden wird, da der bereitgestellte Bildselektor möglicherweise aus dem ursprünglichen Screenshot stammt.
Sie können dies beheben, indem Sie die Appium-Server-Einstellungen aktualisieren. Siehe die [Appium-Dokumentation](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md#related-settings) für die Einstellungen und [diesen Kommentar](https://github.com/webdriverio/webdriverio/issues/6097#issuecomment-726675579) für eine detaillierte Erklärung.

## React Selectors

WebdriverIO bietet eine Möglichkeit, React-Komponenten basierend auf dem Komponentennamen auszuwählen. Dazu haben Sie die Wahl zwischen zwei Befehlen: `react$` und `react$$`.

Diese Befehle ermöglichen es Ihnen, Komponenten aus dem [React VirtualDOM](https://reactjs.org/docs/faq-internals.html) auszuwählen und entweder ein einzelnes WebdriverIO-Element oder ein Array von Elementen zurückzugeben (abhängig davon, welche Funktion verwendet wird).

**Hinweis**: Die Befehle `react$` und `react$$` sind in ihrer Funktionalität ähnlich, mit dem Unterschied, dass `react$$` *alle* passenden Instanzen als Array von WebdriverIO-Elementen zurückgibt, und `react$` die erste gefundene Instanz zurückgibt.

#### Grundlegendes Beispiel

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

Mit dem Befehl `browser.react$` können Sie eine Instanz von `MyComponent` auswählen:

```js
const myCmp = await browser.react$('MyComponent')
```

Nachdem Sie das WebdriverIO-Element in der Variablen `myCmp` gespeichert haben, können Sie Element-Befehle darauf ausführen.

#### Filtern von Komponenten

Die Bibliothek, die WebdriverIO intern verwendet, ermöglicht es, Ihre Auswahl nach Props und/oder Zustand der Komponente zu filtern. Dazu müssen Sie ein zweites Argument für Props und/oder ein drittes Argument für den Zustand an den Browser-Befehl übergeben.

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

Wenn Sie die Instanz von `MyComponent` auswählen möchten, die ein Prop `name` mit dem Wert `WebdriverIO` hat, können Sie den Befehl wie folgt ausführen:

```js
const myCmp = await browser.react$('MyComponent', {
    props: { name: 'WebdriverIO' }
})
```

Wenn Sie Ihre Auswahl nach Zustand filtern möchten, würde der `browser`-Befehl etwa so aussehen:

```js
const myCmp = await browser.react$('MyComponent', {
    state: { myState: 'some value' }
})
```

#### Umgang mit `React.Fragment`

Wenn Sie den Befehl `react$` verwenden, um React [Fragments](https://reactjs.org/docs/fragments.html) auszuwählen, gibt WebdriverIO das erste Kind dieser Komponente als Knoten der Komponente zurück. Wenn Sie `react$$` verwenden, erhalten Sie ein Array, das alle HTML-Knoten innerhalb der Fragments enthält, die dem Selektor entsprechen.

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

Im obigen Beispiel würden die Befehle wie folgt funktionieren:

```js
await browser.react$('MyComponent') // gibt das WebdriverIO-Element für das erste <div /> zurück
await browser.react$$('MyComponent') // gibt die WebdriverIO-Elemente für das Array [<div />, <div />] zurück
```

**Hinweis:** Wenn Sie mehrere Instanzen von `MyComponent` haben und `react$$` verwenden, um diese Fragment-Komponenten auszuwählen, wird Ihnen ein eindimensionales Array aller Knoten zurückgegeben. Mit anderen Worten, wenn Sie 3 `<MyComponent />`-Instanzen haben, erhalten Sie ein Array mit sechs WebdriverIO-Elementen.

## Custom Selector Strategies


Wenn Ihre App eine spezifische Methode zum Abrufen von Elementen erfordert, können Sie selbst eine benutzerdefinierte Selektorstrategie definieren, die Sie mit `custom$` und `custom$$` verwenden können. Registrieren Sie dazu Ihre Strategie einmal zu Beginn des Tests, z.B. in einem `before`-Hook:

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L3-L10
```

Gegeben das folgende HTML-Snippet:

```html reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/example.html#L8-L12
```

Dann verwenden Sie es, indem Sie aufrufen:

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L16-L19
```

**Hinweis:** Dies funktioniert nur in einer Web-Umgebung, in der der Befehl [`execute`](/docs/api/browser/execute) ausgeführt werden kann.