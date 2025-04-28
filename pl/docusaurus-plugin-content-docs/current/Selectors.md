---
id: selectors
title: Selektory
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

Oto, czego __zalecamy__ i czego __nie zalecamy__ używać jako selektorów:

| Selektor | Zalecane | Uwagi |
| -------- | ----------- | ----- |
| `$('button')` | 🚨 Nigdy | Najgorzej - zbyt ogólny, brak kontekstu. |
| `$('.btn.btn-large')` | 🚨 Nigdy | Źle. Powiązane ze stylami. Wysoce podatne na zmiany. |
| `$('#main')` | ⚠️ Oszczędnie | Lepiej. Ale nadal powiązane ze stylami lub nasłuchiwaczami zdarzeń JS. |
| `$(() => document.queryElement('button'))` | ⚠️ Oszczędnie | Skuteczne zapytanie, złożone do napisania. |
| `$('button[name="submission"]')` | ⚠️ Oszczędnie | Związane z atrybutem `name`, który ma semantykę HTML. |
| `$('button[data-testid="submit"]')` | ✅ Dobrze | Wymaga dodatkowego atrybutu, niezwiązanego z a11y. |
| `$('aria/Submit')` lub `$('button=Submit')` | ✅ Zawsze | Najlepiej. Odzwierciedla, jak użytkownik wchodzi w interakcję ze stroną. Zaleca się używanie plików tłumaczeń frontendu, aby testy nigdy nie zawiodły, gdy tłumaczenia zostaną zaktualizowane |

## Selektor zapytań CSS

Jeśli nie wskazano inaczej, WebdriverIO będzie wyszukiwać elementy za pomocą wzorca [selektora CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors), np.:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L7-L8
```

## Tekst łącza

Aby uzyskać element kotwicy z określonym tekstem, wyszukaj tekst zaczynający się od znaku równości (`=`).

Na przykład:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L3
```

Możesz zapytać o ten element, wywołując:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L16-L18
```

## Częściowy tekst łącza

Aby znaleźć element kotwicy, którego widoczny tekst częściowo pasuje do szukanej wartości,
wyszukaj go, używając `*=` przed ciągiem zapytania (np. `*=driver`).

Możesz zapytać o element z powyższego przykładu, wywołując również:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L24-L26
```

__Uwaga:__ Nie można mieszać wielu strategii selektorów w jednym selektorze. Użyj wielu łańcuchowych zapytań o elementy, aby osiągnąć ten sam cel, np.:

```js
const elem = await $('header h1*=Welcome') // nie działa!!!
// zamiast tego użyj
const elem = await $('header').$('*=driver')
```

## Element z określonym tekstem

Ta sama technika może być zastosowana również do elementów. Dodatkowo możliwe jest również dopasowanie bez uwzględniania wielkości liter za pomocą `.=` lub `.*=` w zapytaniu.

Na przykład, oto zapytanie o nagłówek poziomu 1 z tekstem "Welcome to my Page":

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L2
```

Możesz zapytać o ten element, wywołując:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L35C1-L38
```

Lub używając częściowego tekstu zapytania:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L44C9-L47
```

To samo działa dla nazw `id` i `class`:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L4
```

Możesz zapytać o ten element, wywołując:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L49-L67
```

__Uwaga:__ Nie można mieszać wielu strategii selektorów w jednym selektorze. Użyj wielu łańcuchowych zapytań o elementy, aby osiągnąć ten sam cel, np.:

```js
const elem = await $('header h1*=Welcome') // nie działa!!!
// zamiast tego użyj
const elem = await $('header').$('h1*=Welcome')
```

## Nazwa znacznika

Aby zapytać o element z określoną nazwą znacznika, użyj `<tag>` lub `<tag />`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L5
```

Możesz zapytać o ten element, wywołując:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L61-L62
```

## Atrybut nazwy

Do zapytania o elementy z określonym atrybutem nazwy możesz użyć normalnego selektora CSS3 lub dostarczonej strategii nazwy z [JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol), przekazując coś takiego jak [name="some-name"] jako parametr selektora:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L68-L69
```

__Uwaga:__ Ta strategia selektora jest przestarzała i działa tylko w starych przeglądarkach, które są uruchamiane przez protokół JSONWireProtocol lub przy użyciu Appium.

## xPath

Możliwe jest również zapytanie o elementy za pomocą określonego [xPath](https://developer.mozilla.org/en-US/docs/Web/XPath).

Selektor xPath ma format jak `//body/div[6]/div[1]/span[1]`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/xpath.html
```

Możesz zapytać o drugi paragraf, wywołując:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L75-L76
```

Możesz użyć xPath, aby przemieszczać się w górę i w dół drzewa DOM:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L78-L79
```

## Selektor nazwy dostępności

Wyszukiwanie elementów według ich dostępnej nazwy. Dostępna nazwa jest tym, co jest ogłaszane przez czytnik ekranu, gdy ten element otrzymuje fokus. Wartość dostępnej nazwy może być zarówno zawartością wizualną, jak i ukrytymi alternatywami tekstowymi.

:::info

Więcej informacji o tym selektorze znajdziesz w naszym [poście na blogu o wydaniu](/blog/2022/09/05/accessibility-selector)

:::

### Pobieranie według `aria-label`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L1
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L86-L87
```

### Pobieranie według `aria-labelledby`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L2-L3
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L93-L94
```

### Pobieranie według zawartości

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L4
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L100-L101
```

### Pobieranie według tytułu

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L5
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L107-L108
```

### Pobieranie według właściwości `alt`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L114-L115
```

## ARIA - Atrybut roli

Do zapytania o elementy na podstawie [ról ARIA](https://www.w3.org/TR/html-aria/#docconformance), możesz bezpośrednio określić rolę elementu, np. `[role=button]` jako parametr selektora:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L13
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L131-L132
```

## Atrybut ID

Strategia lokalizatora "id" nie jest obsługiwana w protokole WebDriver, należy zamiast tego używać strategii selektorów CSS lub xPath, aby znaleźć elementy za pomocą ID.

Jednak niektóre sterowniki (np. [Appium You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)) mogą nadal [obsługiwać](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies) ten selektor.

Obecnie obsługiwane składnie selektorów dla ID to:

```js
//lokalizator css
const button = await $('#someid')
//lokalizator xpath
const button = await $('//*[@id="someid"]')
//strategia id
// Uwaga: działa tylko w Appium lub podobnych frameworkach, które obsługują strategię lokalizatora "ID"
const button = await $('id=resource-id/iosname')
```

## Funkcja JS

Możesz również używać funkcji JavaScript do pobierania elementów za pomocą natywnych interfejsów API sieci. Oczywiście możesz to zrobić tylko w kontekście sieci (np. `browser` lub kontekst sieci w urządzeniach mobilnych).

Mając następującą strukturę HTML:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/js.html
```

Możesz zapytać o element sąsiadujący `#elem` w następujący sposób:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L139-L143
```

## Selektory głębokie

:::warning

Począwszy od wersji `v9` WebdriverIO nie ma potrzeby stosowania tego specjalnego selektora, ponieważ WebdriverIO automatycznie przechodzi przez Shadow DOM. Zaleca się migrację z tego selektora poprzez usunięcie `>>>` przed nim.

:::

Wiele aplikacji frontendowych mocno polega na elementach z [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM). Z technicznego punktu widzenia niemożliwe jest zapytanie o elementy w obrębie shadow DOM bez obejścia. Metody [`shadow$`](https://webdriver.io/docs/api/element/shadow$) i [`shadow$$`](https://webdriver.io/docs/api/element/shadow$$) były takimi obejściami, które miały swoje [ograniczenia](https://github.com/Georgegriff/query-selector-shadow-dom#how-is-this-different-to-shadow). Dzięki głębokiemu selektorowi możesz teraz wyszukiwać wszystkie elementy w dowolnym shadow DOM za pomocą wspólnego polecenia zapytania.

Załóżmy, że mamy aplikację o następującej strukturze:

![Chrome Example](https://github.com/Georgegriff/query-selector-shadow-dom/raw/main/Chrome-example.png "Chrome Example")

Za pomocą tego selektora możesz wyszukać element `<button />`, który jest zagnieżdżony w innym shadow DOM, np.:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L147-L149
```

## Selektory mobilne

W przypadku hybrydowego testowania mobilnego ważne jest, aby serwer automatyzacji znajdował się we właściwym *kontekście* przed wykonaniem poleceń. Do automatyzacji gestów sterownik powinien być idealnie ustawiony na natywny kontekst. Ale aby wybrać elementy z DOM, sterownik będzie musiał być ustawiony na kontekst webview platformy. *Dopiero wtedy* można zastosować metody wymienione powyżej.

W przypadku natywnego testowania mobilnego nie ma przełączania między kontekstami, ponieważ musisz używać strategii mobilnych i bezpośrednio korzystać z podstawowej technologii automatyzacji urządzeń. Jest to szczególnie przydatne, gdy test wymaga pewnej dokładnej kontroli nad znajdowaniem elementów.

### Android UiAutomator

Framework UI Automator Androida zapewnia wiele sposobów znajdowania elementów. Możesz użyć [API UI Automator](https://developer.android.com/tools/testing-support-library/index.html#uia-apis), w szczególności klasy [UiSelector](https://developer.android.com/reference/androidx/test/uiautomator/UiSelector) do lokalizowania elementów. W Appium wysyłasz kod Java jako ciąg znaków do serwera, który wykonuje go w środowisku aplikacji, zwracając element lub elementy.

```js
const selector = 'new UiSelector().text("Cancel").className("android.widget.Button")'
const button = await $(`android=${selector}`)
await button.click()
```

### Android DataMatcher i ViewMatcher (tylko Espresso)

Strategia DataMatcher Androida zapewnia sposób znajdowania elementów za pomocą [Data Matcher](https://developer.android.com/reference/android/support/test/espresso/DataInteraction)

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"]
})
await menuItem.click()
```

I podobnie [View Matcher](https://developer.android.com/reference/android/support/test/espresso/ViewInteraction)

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"],
  "class": "androidx.test.espresso.matcher.ViewMatchers"
})
await menuItem.click()
```

### Android View Tag (tylko Espresso)

Strategia znacznika widoku zapewnia wygodny sposób znajdowania elementów według ich [tagu](https://developer.android.com/reference/android/support/test/espresso/matcher/ViewMatchers.html#withTagValue%28org.hamcrest.Matcher%3Cjava.lang.Object%3E%29).

```js
const elem = await $('-android viewtag:tag_identifier')
await elem.click()
```

### iOS UIAutomation

Podczas automatyzacji aplikacji iOS można użyć frameworka [UI Automation](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html) firmy Apple do znajdowania elementów.

To [API](https://developer.apple.com/library/ios/documentation/DeveloperTools/Reference/UIAutomationRef/index.html#//apple_ref/doc/uid/TP40009771) JavaScript zawiera metody dostępu do widoku i wszystkiego, co się na nim znajduje.

```js
const selector = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
const button = await $(`ios=${selector}`)
await button.click()
```

Możesz również użyć wyszukiwania predikatów w iOS UI Automation w Appium, aby jeszcze bardziej udoskonalić wybór elementów. Szczegóły znajdziesz [tutaj](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/ios/ios-predicate.md).

### iOS XCUITest ciągi predykatów i łańcuchy klas

W systemie iOS 10 i nowszych (używając sterownika `XCUITest`) możesz używać [ciągów predykatów](https://github.com/facebook/WebDriverAgent/wiki/Predicate-Queries-Construction-Rules):

```js
const selector = `type == 'XCUIElementTypeSwitch' && name CONTAINS 'Allow'`
const switch = await $(`-ios predicate string:${selector}`)
await switch.click()
```

I [łańcuchów klas](https://github.com/facebook/WebDriverAgent/wiki/Class-Chain-Queries-Construction-Rules):

```js
const selector = '**/XCUIElementTypeCell[`name BEGINSWITH "D"`]/**/XCUIElementTypeButton'
const button = await $(`-ios class chain:${selector}`)
await button.click()
```

### Accessibility ID

Strategia lokalizatora `accessibility id` jest zaprojektowana do odczytu unikalnego identyfikatora dla elementu UI. Ma to tę zaletę, że nie zmienia się podczas lokalizacji lub jakiegokolwiek innego procesu, który może zmienić tekst. Dodatkowo może to być pomocne w tworzeniu testów międzyplatformowych, jeśli elementy, które są funkcjonalnie takie same, mają ten sam identyfikator dostępności.

- Dla iOS jest to `accessibility identifier` określony przez Apple [tutaj](https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UIAccessibilityIdentification_Protocol/index.html).
- Dla Androida `accessibility id` mapuje się na `content-description` dla elementu, jak opisano [tutaj](https://developer.android.com/training/accessibility/accessible-app.html).

Dla obu platform uzyskanie elementu (lub wielu elementów) według ich `accessibility id` jest zazwyczaj najlepszą metodą. Jest to również preferowany sposób niż przestarzała strategia `name`.

```js
const elem = await $('~my_accessibility_identifier')
await elem.click()
```

### Nazwa klasy

Strategia `class name` to `string` reprezentujący element UI w bieżącym widoku.

- Dla iOS jest to pełna nazwa [klasy UIAutomation](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html) i będzie zaczynać się od `UIA-`, takie jak `UIATextField` dla pola tekstowego. Pełną referencję można znaleźć [tutaj](https://developer.apple.com/library/ios/navigation/#section=Frameworks&topic=UIAutomation).
- Dla Androida jest to w pełni kwalifikowana nazwa [klasy UI Automator](https://developer.android.com/tools/testing-support-library/index.html#UIAutomator) [class](https://developer.android.com/reference/android/widget/package-summary.html), takie jak `android.widget.EditText` dla pola tekstowego. Pełną referencję można znaleźć [tutaj](https://developer.android.com/reference/android/widget/package-summary.html).
- Dla Youi.tv jest to pełna nazwa klasy Youi.tv i będzie zaczynać się od `CYI-`, takie jak `CYIPushButtonView` dla elementu przycisku. Pełną referencję można znaleźć na [stronie GitHub You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver)

```js
// przykład iOS
await $('UIATextField').click()
// przykład Android
await $('android.widget.DatePicker').click()
// przykład Youi.tv
await $('CYIPushButtonView').click()
```

## Selektory łańcuchowe

Jeśli chcesz być bardziej precyzyjny w swoim zapytaniu, możesz łączyć selektory, aż znajdziesz właściwy element. Jeśli wywołasz `element` przed właściwym poleceniem, WebdriverIO rozpocznie zapytanie od tego elementu.

Na przykład, jeśli masz strukturę DOM typu:

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

I chcesz dodać produkt B do koszyka, byłoby trudno zrobić to tylko za pomocą selektora CSS.

Dzięki łączeniu selektorów jest to znacznie łatwiejsze. Po prostu zawęź poszukiwany element krok po kroku:

```js
await $('.row .entry:nth-child(2)').$('button*=Add').click()
```

### Appium Image Selector

Używając strategii lokalizatora `-image`, możliwe jest wysłanie do Appium pliku obrazu reprezentującego element, do którego chcesz uzyskać dostęp.

Obsługiwane formaty plików `jpg,png,gif,bmp,svg`

Pełną referencję można znaleźć [tutaj](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md)

```js
const elem = await $('./file/path/of/image/test.jpg')
await elem.click()
```

**Uwaga**: Sposób, w jaki Appium pracuje z tym selektorem, polega na tym, że wewnętrznie wykona (zrzut ekranu aplikacji) i użyje dostarczonego selektora obrazu, aby sprawdzić, czy element można znaleźć na tym (zrzucie ekranu aplikacji).

Pamiętaj, że Appium może zmienić rozmiar wykonanego (zrzutu ekranu aplikacji), aby dopasować go do rozmiaru CSS twojego (ekranu aplikacji) (stanie się to na iPhone'ach, ale także na komputerach Mac z wyświetlaczem Retina, ponieważ DPR jest większy niż 1). Spowoduje to brak dopasowania, ponieważ dostarczony selektor obrazu mógł zostać pobrany z oryginalnego zrzutu ekranu.
Możesz to naprawić, aktualizując ustawienia serwera Appium, zobacz [dokumentację Appium](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md#related-settings) dla ustawień i [ten komentarz](https://github.com/webdriverio/webdriverio/issues/6097#issuecomment-726675579) dla szczegółowego wyjaśnienia.

## Selektory React

WebdriverIO zapewnia sposób wybierania komponentów React na podstawie nazwy komponentu. Aby to zrobić, masz wybór dwóch poleceń: `react$` i `react$$`.

Te polecenia pozwalają wybierać komponenty z [VirtualDOM React](https://reactjs.org/docs/faq-internals.html) i zwracać pojedynczy element WebdriverIO lub tablicę elementów (w zależności od tego, która funkcja jest używana).

**Uwaga**: Polecenia `react$` i `react$$` są podobne funkcjonalnie, z tą różnicą, że `react$$` zwróci *wszystkie* pasujące instancje jako tablicę elementów WebdriverIO, a `react$` zwróci pierwszą znalezioną instancję.

#### Podstawowy przykład

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

W powyższym kodzie istnieje prosta instancja `MyComponent` wewnątrz aplikacji, którą React renderuje wewnątrz elementu HTML z `id="root"`.

Za pomocą polecenia `browser.react$` możesz wybrać instancję `MyComponent`:

```js
const myCmp = await browser.react$('MyComponent')
```

Teraz, gdy masz element WebdriverIO przechowywany w zmiennej `myCmp`, możesz wykonać polecenia elementu na nim.

#### Filtrowanie komponentów

Biblioteka, której WebdriverIO używa wewnętrznie, pozwala filtrować wybór według właściwości i/lub stanu komponentu. Aby to zrobić, musisz przekazać drugi argument dla właściwości i/lub trzeci argument dla stanu do polecenia przeglądarki.

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

Jeśli chcesz wybrać instancję `MyComponent`, która ma właściwość `name` jako `WebdriverIO`, możesz wykonać polecenie w następujący sposób:

```js
const myCmp = await browser.react$('MyComponent', {
    props: { name: 'WebdriverIO' }
})
```

Jeśli chciałbyś filtrować wybór według stanu, polecenie `browser` wyglądałoby mniej więcej tak:

```js
const myCmp = await browser.react$('MyComponent', {
    state: { myState: 'some value' }
})
```

#### Obsługa `React.Fragment`

Podczas używania polecenia `react$` do wybierania [fragmentów](https://reactjs.org/docs/fragments.html) React, WebdriverIO zwróci pierwszy podrzędny element tego komponentu jako węzeł komponentu. Jeśli używasz `react$$`, otrzymasz tablicę zawierającą wszystkie węzły HTML wewnątrz fragmentów, które pasują do selektora.

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

W powyższym przykładzie, oto jak działałyby polecenia:

```js
await browser.react$('MyComponent') // zwraca element WebdriverIO dla pierwszego <div />
await browser.react$$('MyComponent') // zwraca elementy WebdriverIO dla tablicy [<div />, <div />]
```

**Uwaga:** Jeśli masz wiele instancji `MyComponent` i używasz `react$$` do wybierania tych komponentów fragmentów, zostanie zwrócona jednowymiarowa tablica wszystkich węzłów. Innymi słowy, jeśli masz 3 instancje `<MyComponent />`, zostanie zwrócona tablica z sześcioma elementami WebdriverIO.

## Niestandardowe strategie selektorów


Jeśli Twoja aplikacja wymaga określonego sposobu pobierania elementów, możesz zdefiniować własną strategię selektora, której możesz używać z `custom$` i `custom$$`. W tym celu zarejestruj swoją strategię raz na początku testu, np. w hooku `before`:

```js reference
https://github.com/webdriverio/example-recipes/blob/f5730428ec3605e856e90bf58be17c9c9da891de/queryElements/customStrategy.js#L2-L11
```

Mając następujący fragment HTML:

```html reference
https://github.com/webdriverio/example-recipes/blob/f5730428ec3605e856e90bf58be17c9c9da891de/queryElements/example.html#L8-L12
```

Następnie użyj tego, wywołując:

```js reference
https://github.com/webdriverio/example-recipes/blob/f5730428ec3605e856e90bf58be17c9c9da891de/queryElements/customStrategy.js#L16-L19
```

**Uwaga:** działa to tylko w środowisku sieciowym, w którym można uruchomić polecenie [`execute`](/docs/api/browser/execute).