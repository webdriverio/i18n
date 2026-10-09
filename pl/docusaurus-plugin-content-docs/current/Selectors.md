---
id: selectors
title: Selektory
description: "Znajduj elementy za pomocą CSS, tekstu, XPath, nazwy dostępności, roli ARIA i innych strategii selektorów oraz dowiedz się, które z nich są najbardziej odporne na zmiany."
---

[Protokół WebDriver](https://w3c.github.io/webdriver/) udostępnia kilka strategii selektorów do wyszukiwania elementów. WebdriverIO upraszcza je, aby wybieranie elementów było proste. Pamiętaj, że choć polecenia do wyszukiwania elementów nazywają się `$` i `$$`, nie mają one nic wspólnego z jQuery ani z [Sizzle Selector Engine](https://github.com/jquery/sizzle).

Choć dostępnych jest wiele różnych selektorów, tylko kilka z nich zapewnia niezawodny sposób na znalezienie właściwego elementu. Weźmy na przykład następujący przycisk:

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

__Zalecamy__ i __nie zalecamy__ następujących selektorów:

| Selektor | Zalecany | Uwagi |
| -------- | ----------- | ----- |
| `$('button')` | 🚨 Nigdy | Najgorszy – zbyt ogólny, brak kontekstu. |
| `$('.btn.btn-large')` | 🚨 Nigdy | Zły. Powiązany ze stylami. Bardzo podatny na zmiany. |
| `$('#main')` | ⚠️ Oszczędnie | Lepszy. Ale nadal powiązany ze stylami lub nasłuchiwaczami zdarzeń JS. |
| `$(() => document.queryElement('button'))` | ⚠️ Oszczędnie | Skuteczne wyszukiwanie, ale skomplikowane w zapisie. |
| `$('button[name="submission"]')` | ⚠️ Oszczędnie | Powiązany z atrybutem `name`, który ma semantykę HTML. |
| `$('button[data-testid="submit"]')` | ✅ Dobry | Wymaga dodatkowego atrybutu, niezwiązanego z dostępnością (a11y). |
| `$('aria/Submit')` | ✅ Dobry | Dobry. Odzwierciedla sposób, w jaki użytkownik wchodzi w interakcję ze stroną. Zaleca się korzystanie z plików tłumaczeń, aby testy nie przestawały działać po aktualizacji tłumaczeń. W sesjach WebDriver BiDi wykorzystuje drzewo dostępności przeglądarki. W sesjach Classic przechodzi na XPath i może działać wolniej na dużych stronach. |
| `$('button=Submit')` | ✅ Zawsze | Najlepszy. Odzwierciedla sposób, w jaki użytkownik wchodzi w interakcję ze stroną, i jest szybki. Zaleca się korzystanie z plików tłumaczeń, aby testy nie przestawały działać po aktualizacji tłumaczeń. |

## Tryb ścisły {#strict-mode}

Od wersji v10 polecenie [`$`](/docs/api/browser/$) jest __ścisłe__: reprezentuje dokładnie jeden element. Jeśli selektor pasuje do więcej niż jednego elementu, polecenie zgłasza `StrictSelectorError` zamiast po cichu wybierać pierwsze dopasowanie:

```js
// na stronie znajduje się 12 przycisków
await $('button').click()
// StrictSelectorError: strict mode violation: `$("button")` resolved to 12 elements, expected 1.
```

Jest to takie samo zachowanie jak w przypadku [lokatorów Playwright](https://playwright.dev/docs/locators#strictness). Cypress działa inaczej: jego zapytania mogą zwracać wiele elementów, a to polecenia akcji, takie jak [`.click()`](https://docs.cypress.io/api/commands/click#Click-all-elements-with-id-starting-with-btn), domyślnie odrzucają podmiot składający się z wielu elementów. Tryb ścisły ujawnia zbyt szerokie selektory, które w przeciwnym razie po cichu wchodziłyby w interakcję z niewłaściwym elementem, gdy tylko strona się rozrośnie.

Reguła ta dotyczy każdego kroku [łańcucha](#chain-selectors) oraz każdego typu selektora akceptowanego przez `$` — selektorów tekstowych (w tym tych przenikających shadow DOM), [funkcji JS](#js-function), [selektorów mobilnych](#mobile-selectors) oraz odwołań do [niestandardowych strategii](#custom-selector-strategies).

### Czego to nie dotyczy

- `$$` nadal zwraca zero lub wiele elementów jako [`ElementArray`](/docs/api/browser/$$). Użyj `await` na liście (lub jej `.length`), zanim odczytasz liczbę elementów lub użyjesz `for...of`. `for await` działa bezpośrednio na liście.
- Dedykowane polecenia pomocnicze `custom$`, `shadow$` i `react$` nie są ścisłe — nadal zwracają pierwsze dopasowanie, podobnie jak ich odpowiedniki `$$`.
- Selektor, który niczego nie dopasowuje, nadal zwraca element rozwiązywany leniwie, więc [`waitForExist`](/docs/api/element/waitForExist) oraz mechanizm [automatycznego oczekiwania](/docs/autowait) pozostają bez zmian.
- Przekazanie referencji do elementu, np. `$(await browser.getActiveElement())`, zawsze odnosi się do pojedynczego węzła i nigdy nie jest sprawdzane.

:::info Migracja do v10

Informacje o tym, jak sprawdzić swój zestaw testów pod kątem naruszeń trybu ścisłego, zawęzić lub wyłączyć go dla poszczególnych zapytań oraz wyłączyć tryb ścisły w całym projekcie, znajdziesz w [przewodniku migracji do v10](/docs/v10-migration).

:::

## Selektor zapytań CSS

Jeśli nie wskazano inaczej, WebdriverIO wyszukuje elementy za pomocą wzorca [selektora CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors), np.:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L7-L8
```

## Tekst linku

Aby pobrać element kotwicy (anchor) zawierający określony tekst, wyszukaj tekst poprzedzony znakiem równości (`=`).

Na przykład:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L3
```

Możesz wyszukać ten element, wywołując:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L16-L18
```

## Częściowy tekst linku

Aby znaleźć element kotwicy, którego widoczny tekst częściowo pasuje do szukanej wartości,
użyj `*=` przed ciągiem zapytania (np. `*=driver`).

Element z powyższego przykładu możesz również wyszukać, wywołując:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L24-L26
```

__Uwaga:__ Nie można łączyć wielu strategii selektorów w jednym selektorze. Aby osiągnąć ten sam cel, użyj kilku połączonych w łańcuch zapytań o elementy, np.:

```js
const elem = await $('header h1*=Welcome') // nie działa!!!
// zamiast tego użyj
const elem = await $('header').$('*=driver')
```

## Element z określonym tekstem

Tę samą technikę można zastosować również do innych elementów. Dodatkowo możliwe jest dopasowywanie bez rozróżniania wielkości liter za pomocą `.=` lub `.*=` w zapytaniu.

Na przykład oto zapytanie o nagłówek pierwszego poziomu z tekstem „Welcome to my Page”:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L2
```

Możesz wyszukać ten element, wywołując:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L35C1-L38
```

Lub używając zapytania o częściowy tekst:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L44C9-L47
```

To samo działa dla nazw `id` i `class`:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L4
```

Możesz wyszukać ten element, wywołując:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L49-L67
```

__Uwaga:__ Nie można łączyć wielu strategii selektorów w jednym selektorze. Aby osiągnąć ten sam cel, użyj kilku połączonych w łańcuch zapytań o elementy, np.:

```js
const elem = await $('header h1*=Welcome') // nie działa!!!
// zamiast tego użyj
const elem = await $('header').$('h1*=Welcome')
```

## Nazwa tagu

Aby wyszukać element o określonej nazwie tagu, użyj `<tag>` lub `<tag />`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L5
```

Możesz wyszukać ten element, wywołując:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L61-L62
```

## Atrybut name

Aby wyszukać elementy z określonym atrybutem name, użyj selektora CSS, takiego jak `[name="some-name"]`. W sesji mobilnej ten sam skrót jest wysyłany ze strategią lokatora `name` Appium:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L68-L69
```

__Uwaga:__ Strategia lokatora `name` jest lokatorem Appium. Sesje desktopowe zachowują `[name="some-name"]` w strategii CSS.

## xPath

Możliwe jest również wyszukiwanie elementów za pomocą określonego [xPath](https://developer.mozilla.org/en-US/docs/Web/XPath).

Selektor xPath ma format podobny do `//body/div[6]/div[1]/span[1]`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/xpath.html
```

Możesz wyszukać drugi akapit, wywołując:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L75-L76
```

Za pomocą xPath możesz również poruszać się w górę i w dół drzewa DOM:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L78-L79
```

## Selektor nazwy dostępności

Wyszukuj elementy według ich nazwy dostępności (accessible name). Nazwa dostępności to to, co odczytuje czytnik ekranu, gdy element otrzymuje fokus. Wartością nazwy dostępności może być zarówno treść wizualna, jak i ukryte alternatywy tekstowe.

W sesjach [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/) (Chrome, Edge, Firefox i inne przeglądarki obsługujące BiDi) WebdriverIO najpierw używa [`browsingContext.locateNodes`](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes) z lokatorem dostępności. Wysyła on zapytanie bezpośrednio do drzewa dostępności przeglądarki i jest zazwyczaj znacznie szybszy niż przybliżenie oparte na XPath. Jeśli lokator dostępności niczego nie znajdzie, WebdriverIO przechodzi na heurystykę XPath z trybu Classic, dzięki czemu istniejące zapytania `aria/` nadal działają.

:::info

Więcej o tym selektorze możesz przeczytać w naszym [wpisie na blogu o wydaniu](/blog/2022/09/05/accessibility-selector)

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

### Pobieranie według treści

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

## Selektor roli {#role-selector}

Wyszukuj elementy według ich roli ARIA i nazwy dostępności, tak jak opisuje je czytnik ekranu: „przycisk *Add to cart*”. Rola wraz z nazwą nadal pasuje, gdy zmieniają się nazwy klas, identyfikatory testowe lub struktura DOM.

```js
await $('role/button[name="Add to cart"]').click()
await expect($('role/heading[name="Order summary"]')).toBeDisplayed()

// tylko rola
const rows = await $$('role/row')

// w zakresie elementu nadrzędnego
const dialog = $('role/dialog[name="Checkout"]')
await dialog.$('role/button[name="Pay now"]').click()
```

Składnia to `role/<role>` lub `role/<role>[name="<accessible name>"]`. Działają również apostrofy, a cudzysłów wewnątrz nazwy jest poprzedzany ukośnikiem wstecznym: `role/button[name="Say \"hi\""]`.

- Nazwa musi pasować do pełnej nazwy dostępności.
- Rola musi być rolą ARIA. Literówka kończy się błędem wskazującym najbliższą poprawną rolę, na przykład `"buton" is not an ARIA role. Did you mean "button"?`.
- `img` i jej nazwa z ARIA 1.3, `image`, to ta sama rola.
- Selektor, jak każdy inny selektor, podlega [trybowi ścisłemu](#strict-mode) polecenia `$`.

W sesji [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/) WebdriverIO przekazuje rolę i nazwę do [`browsingContext.locateNodes`](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes). Przeglądarka sama oblicza obie wartości, w ten sam sposób, w jaki stronę widzą technologie wspomagające. Znajdowane są elementy wewnątrz otwartych shadow rootów oraz wewnątrz ramek, w tym ramek z innego źródła (origin). Jeśli przeglądarka nie znajdzie żadnego elementu, nie ma przejścia na heurystykę. Pamiętaj, że to przeglądarka decyduje o roli: na przykład `<table>` bez nagłówków lub podpisu może być tabelą układu, a jej wiersze nie mają wtedy roli `row`.

W sesji WebDriver Classic, a także gdy przeglądarka nie obsługuje lokatora ról, WebdriverIO oblicza rolę i nazwę dostępności na stronie za pomocą [`dom-accessibility-api`](https://github.com/eps1lon/dom-accessibility-api) — implementacji używanej przez Testing Library. Pole tekstowe bez etykiety otrzymuje nazwę z atrybutu `placeholder`, tak jak robią to przeglądarki. Selektor roli nie jest dostępny w natywnym kontekście aplikacji mobilnej. Użyj tam [accessibility id](#accessibility-id).

## ARIA – atrybut role

Aby wyszukiwać elementy na podstawie [ról ARIA](https://www.w3.org/TR/html-aria/#docconformance), możesz bezpośrednio podać rolę elementu, np. `[role=button]`, jako parametr selektora. Ten selektor przybliża rolę na podstawie nazwy elementu i jego atrybutów. Preferuj [selektor roli](#role-selector), który używa roli obliczonej przez przeglądarkę i może również dopasowywać nazwę dostępności:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L13
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L131-L132
```

## Atrybut ID

Strategia lokatora „id” nie jest obsługiwana w protokole WebDriver; aby znaleźć elementy według ID, należy zamiast tego użyć strategii selektorów CSS lub xPath.

Niektóre sterowniki (np. [Appium You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)) mogą jednak nadal [obsługiwać](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies) ten selektor.

Obecnie obsługiwane składnie selektorów dla ID to:

```js
//lokator css
const button = await $('#someid')
//lokator xpath
const button = await $('//*[@id="someid"]')
//strategia id
// Uwaga: działa tylko w Appium lub podobnych frameworkach obsługujących strategię lokatora "ID"
const button = await $('id=resource-id/iosname')
```

## Funkcja JS {#js-function}

Możesz również używać funkcji JavaScript do pobierania elementów za pomocą natywnych API przeglądarki. Oczywiście możesz to robić tylko w kontekście webowym (np. `browser` lub kontekst webowy na urządzeniu mobilnym).

Mając następującą strukturę HTML:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/js.html
```

Możesz wyszukać element sąsiadujący z `#elem` w następujący sposób:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L139-L143
```

## Selektory głębokie

:::warning

Począwszy od wersji `v9` WebdriverIO ten specjalny selektor nie jest potrzebny, ponieważ WebdriverIO automatycznie przenika za Ciebie przez Shadow DOM. Zaleca się rezygnację z tego selektora poprzez usunięcie poprzedzającego go `>>>`.

:::

Wiele aplikacji frontendowych w dużym stopniu opiera się na elementach z [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM). Technicznie niemożliwe jest wyszukiwanie elementów w shadow DOM bez obejść. Takimi obejściami były [`shadow$`](https://webdriver.io/docs/api/element/shadow$) i [`shadow$$`](https://webdriver.io/docs/api/element/shadow$$), które miały swoje [ograniczenia](https://github.com/Georgegriff/query-selector-shadow-dom#how-is-this-different-to-shadow). Dzięki selektorowi głębokiemu możesz teraz wyszukiwać wszystkie elementy w dowolnym shadow DOM za pomocą zwykłego polecenia zapytania.

Załóżmy, że mamy aplikację o następującej strukturze:

![Chrome Example](https://github.com/Georgegriff/query-selector-shadow-dom/raw/main/Chrome-example.png "Chrome Example")

Za pomocą tego selektora możesz wyszukać element `<button />` zagnieżdżony w innym shadow DOM, np.:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L147-L149
```

## Selektory mobilne {#mobile-selectors}

W przypadku hybrydowych testów mobilnych ważne jest, aby serwer automatyzacji znajdował się we właściwym *kontekście* przed wykonaniem poleceń. Do automatyzacji gestów sterownik powinien najlepiej być ustawiony na kontekst natywny. Jednak aby wybierać elementy z DOM, sterownik musi być ustawiony na kontekst webview danej platformy. Dopiero *wtedy* można używać metod wymienionych powyżej.

W przypadku natywnych testów mobilnych nie ma przełączania między kontekstami, ponieważ trzeba używać strategii mobilnych i bezpośrednio korzystać z bazowej technologii automatyzacji urządzenia. Jest to szczególnie przydatne, gdy test wymaga precyzyjnej kontroli nad wyszukiwaniem elementów.

### Android UiAutomator

Framework UI Automator systemu Android udostępnia wiele sposobów wyszukiwania elementów. Do lokalizowania elementów możesz użyć [UI Automator API](https://developer.android.com/tools/testing-support-library/index.html#uia-apis), w szczególności [klasy UiSelector](https://developer.android.com/reference/androidx/test/uiautomator/UiSelector). W Appium wysyłasz kod Java jako ciąg znaków do serwera, który wykonuje go w środowisku aplikacji i zwraca element lub elementy.

```js
const selector = 'new UiSelector().text("Cancel").className("android.widget.Button")'
const button = await $(`android=${selector}`)
await button.click()
```

### Android DataMatcher i ViewMatcher (tylko Espresso)

Strategia DataMatcher systemu Android umożliwia wyszukiwanie elementów za pomocą [Data Matcher](https://developer.android.com/reference/android/support/test/espresso/DataInteraction)

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"]
})
await menuItem.click()
```

I analogicznie [View Matcher](https://developer.android.com/reference/android/support/test/espresso/ViewInteraction)

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"],
  "class": "androidx.test.espresso.matcher.ViewMatchers"
})
await menuItem.click()
```

### Android View Tag (tylko Espresso)

Strategia view tag zapewnia wygodny sposób wyszukiwania elementów według ich [tagu](https://developer.android.com/reference/android/support/test/espresso/matcher/ViewMatchers.html#withTagValue%28org.hamcrest.Matcher%3Cjava.lang.Object%3E%29).

```js
const elem = await $('-android viewtag:tag_identifier')
await elem.click()
```

### iOS UIAutomation

Podczas automatyzacji aplikacji iOS do wyszukiwania elementów można użyć [frameworka UI Automation](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html) firmy Apple.

To [API](https://developer.apple.com/library/ios/documentation/DeveloperTools/Reference/UIAutomationRef/index.html#//apple_ref/doc/uid/TP40009771) JavaScript zawiera metody umożliwiające dostęp do widoku i wszystkiego, co się na nim znajduje.

```js
const selector = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
const button = await $(`ios=${selector}`)
await button.click()
```

W Appium możesz również używać wyszukiwania za pomocą predykatów w iOS UI Automation, aby jeszcze bardziej doprecyzować wybór elementów. Szczegóły znajdziesz [tutaj](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/ios/ios-predicate.md).

### Ciągi predykatów i łańcuchy klas iOS XCUITest

W iOS 10 i nowszych (przy użyciu sterownika `XCUITest`) możesz używać [ciągów predykatów](https://github.com/facebook/WebDriverAgent/wiki/Predicate-Queries-Construction-Rules):

```js
const selector = `type == 'XCUIElementTypeSwitch' && name CONTAINS 'Allow'`
const switch = await $(`-ios predicate string:${selector}`)
await switch.click()
```

Oraz [łańcuchów klas](https://github.com/facebook/WebDriverAgent/wiki/Class-Chain-Queries-Construction-Rules):

```js
const selector = '**/XCUIElementTypeCell[`name BEGINSWITH "D"`]/**/XCUIElementTypeButton'
const button = await $(`-ios class chain:${selector}`)
await button.click()
```

### Accessibility ID {#accessibility-id}

Strategia lokatora `accessibility id` służy do odczytywania unikalnego identyfikatora elementu interfejsu użytkownika. Jej zaletą jest to, że identyfikator nie zmienia się podczas lokalizacji ani żadnego innego procesu, który mógłby zmienić tekst. Ponadto może ona pomóc w tworzeniu testów wieloplatformowych, jeśli elementy pełniące tę samą funkcję mają ten sam accessibility id.

- W iOS jest to `accessibility identifier` opisany przez Apple [tutaj](https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UIAccessibilityIdentification_Protocol/index.html).
- W Androidzie `accessibility id` odpowiada atrybutowi `content-description` elementu, jak opisano [tutaj](https://developer.android.com/training/accessibility/accessible-app.html).

Na obu platformach pobieranie elementu (lub wielu elementów) według ich `accessibility id` jest zazwyczaj najlepszą metodą. Jest to również sposób preferowany w stosunku do przestarzałej strategii `name`.

```js
const elem = await $('~my_accessibility_identifier')
await elem.click()
```

### Nazwa klasy

Strategia `class name` to `string` reprezentujący element interfejsu użytkownika w bieżącym widoku.

- W iOS jest to pełna nazwa [klasy UIAutomation](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html), zaczynająca się od `UIA-`, np. `UIATextField` dla pola tekstowego. Pełną dokumentację można znaleźć [tutaj](https://developer.apple.com/library/ios/navigation/#section=Frameworks&topic=UIAutomation).
- W Androidzie jest to w pełni kwalifikowana nazwa [klasy](https://developer.android.com/reference/android/widget/package-summary.html) [UI Automator](https://developer.android.com/tools/testing-support-library/index.html#UIAutomator), np. `android.widget.EditText` dla pola tekstowego. Pełną dokumentację można znaleźć [tutaj](https://developer.android.com/reference/android/widget/package-summary.html).
- W Youi.tv jest to pełna nazwa klasy Youi.tv, zaczynająca się od `CYI-`, np. `CYIPushButtonView` dla elementu przycisku. Pełną dokumentację można znaleźć na [stronie GitHub sterownika You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver)

```js
// przykład dla iOS
await $('UIATextField').click()
// przykład dla Androida
await $('android.widget.DatePicker').click()
// przykład dla Youi.tv
await $('CYIPushButtonView').click()
```

## Łączenie selektorów w łańcuch {#chain-selectors}

Jeśli chcesz, aby zapytanie było bardziej precyzyjne, możesz łączyć selektory w łańcuch, aż znajdziesz właściwy
element. Jeśli wywołasz `element` przed właściwym poleceniem, WebdriverIO rozpocznie zapytanie od tego elementu.

Na przykład, jeśli masz strukturę DOM taką jak:

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

I chcesz dodać produkt B do koszyka, trudno byłoby to zrobić, używając wyłącznie selektora CSS.

Dzięki łączeniu selektorów w łańcuch jest to znacznie prostsze. Po prostu zawężaj wyszukiwanie żądanego elementu krok po kroku:

```js
await $('.row .entry:nth-child(2)').$('button*=Add').click()
```

### Selektor obrazów Appium

Korzystając ze strategii lokatora `-image`, można wysłać do Appium plik obrazu przedstawiający element, do którego chcesz uzyskać dostęp.

Obsługiwane formaty plików: `jpg,png,gif,bmp,svg`

Pełną dokumentację można znaleźć [tutaj](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md)

```js
const elem = await $('./file/path/of/image/test.jpg')
await elem.click()
```

**Uwaga**: Appium działa z tym selektorem w ten sposób, że wewnętrznie wykonuje zrzut ekranu (aplikacji) i używa podanego selektora obrazu,
aby sprawdzić, czy element można znaleźć na tym zrzucie ekranu (aplikacji).

Pamiętaj, że Appium może zmienić rozmiar wykonanego zrzutu ekranu (aplikacji), aby dopasować go do rozmiaru CSS ekranu (aplikacji) (dzieje się tak
na iPhone'ach, ale także na komputerach Mac z wyświetlaczem Retina, ponieważ DPR jest większy niż 1). Spowoduje to brak dopasowania, ponieważ
podany selektor obrazu mógł zostać wykonany z oryginalnego zrzutu ekranu.
Możesz to naprawić, aktualizując ustawienia serwera Appium — zobacz [dokumentację Appium](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md#related-settings),
aby poznać ustawienia, oraz [ten komentarz](https://github.com/webdriverio/webdriverio/issues/6097#issuecomment-726675579) ze szczegółowym wyjaśnieniem.

## Selektory React

WebdriverIO umożliwia wybieranie komponentów React na podstawie nazwy komponentu. Do tego celu możesz użyć jednego z dwóch poleceń: `react$` i `react$$`.

Polecenia te pozwalają wybierać komponenty z [React VirtualDOM](https://reactjs.org/docs/faq-internals.html) i zwracają pojedynczy element WebdriverIO lub tablicę elementów (w zależności od użytej funkcji).

**Uwaga**: Polecenia `react$` i `react$$` działają podobnie, z tą różnicą, że `react$$` zwraca *wszystkie* pasujące instancje jako tablicę elementów WebdriverIO, a `react$` zwraca pierwszą znalezioną instancję.

Polecenia działają z React w wersjach od 16 do 19, dla aplikacji uruchamianej za pomocą `createRoot` lub `ReactDOM.render`. Odczytują one komponenty bieżącego renderowania, więc znajdują również komponenty dodane w wyniku zmiany stanu. Jeśli React nie wyrenderował jeszcze korzenia (root) strony, czekają na niego do 5 sekund.

#### Podstawowy przykład

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

W powyższym kodzie w aplikacji znajduje się prosta instancja `MyComponent`, którą React renderuje wewnątrz elementu HTML z `id="root"`.

Za pomocą polecenia `browser.react$` możesz wybrać instancję `MyComponent`:

```js
const myCmp = await browser.react$('MyComponent')
```

Teraz, gdy element WebdriverIO jest przechowywany w zmiennej `myCmp`, możesz wykonywać na nim polecenia elementu.

#### Filtrowanie komponentów

Możesz filtrować wybór według właściwości (props) i/lub stanu (state) komponentu. Aby to zrobić, przekaż `props` i/lub `state` w drugim argumencie polecenia.

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

Jeśli chcesz wybrać instancję `MyComponent`, która ma właściwość `name` równą `WebdriverIO`, możesz wykonać polecenie w następujący sposób:

```js
const myCmp = await browser.react$('MyComponent', {
    props: { name: 'WebdriverIO' }
})
```

Gdybyś chciał filtrować wybór według stanu, polecenie `browser` wyglądałoby mniej więcej tak:

```js
const myCmp = await browser.react$('MyComponent', {
    state: { myState: 'some value' }
})
```

Filtr pasuje, gdy pasuje każdy z jego kluczy, który posiada również komponent. Klucz, którego komponent nie ma, jest ignorowany. Zagnieżdżony obiekt dopasowywany jest w ten sam sposób, a tablica pasuje, gdy ma co najmniej jedną wartość wspólną z tablicą komponentu. `null`, `false` i `0` pasują do tej samej wartości. W przypadku komponentu funkcyjnego z hookami stanem jest stan pierwszego hooka (`useState` lub `useReducer`): jeśli pierwszym hookiem jest inny hook, na przykład `useRef`, filtr stanu nie pasuje. Przy jednoczesnym użyciu `props` i `state` komponent musi pasować do obu.

#### Reguły selektorów

- `*` pasuje do jednego lub więcej znaków: `browser.react$$('My*')` znajduje `MyComponent` i `MyOtherComponent`.
- Nazwy oddzielone spacjami znajdują komponent wewnątrz innego komponentu: `browser.react$$('List Item')` znajduje każdy `Item` wewnątrz `List`.
- Nazwą komponentu jest jego `displayName`, a w przeciwnym razie nazwa jego funkcji lub klasy. Komponent `React.memo` ma nazwę swojej funkcji (wersja deweloperska React 17 nadaje mu również `displayName` obiektu memo). Komponent `React.forwardRef` nie ma nazwy, chyba że ma `displayName`.
- W przypadku komponentu wyższego rzędu o nazwie takiej jak `withRouter(MyComponent)` używana jest nazwa w nawiasach: `MyComponent`.
- Bez zakresu elementu polecenia przeszukują wszystkie korzenie React na stronie w kolejności dokumentu, także korzenie wewnątrz innych korzeni oraz korzenie w otwartych shadow rootach. `react$` zwraca pierwsze dopasowanie. Aby przeszukać tylko jeden korzeń, wywołaj polecenie na jego kontenerze lub na elemencie tego korzenia: `$('#other-root').react$$('MyComponent')`.
- Wyniki zwracane są korzeń po korzeniu. W obrębie korzenia występują w kolejności drzewa komponentów, poziom po poziomie, a nie w kolejności dokumentu. `react$$` zwraca każdy węzeł DOM tylko raz.
- W przypadku aplikacji w ramce wywołaj polecenie na kontekście przeglądania ramki lub na elemencie ramki: `(await page.frame({ selector: 'iframe' })).react$$('MyComponent')`.

Znane ograniczenia:

- Komponent, który renderuje tylko tekst, zwraca węzeł tekstowy. W WebDriver Classic węzła tekstowego nie można odesłać, a polecenie kończy się błędem `javascript error: circular reference`.
- Podczas gdy React hydratuje granicę `Suspense` strony renderowanej po stronie serwera, komponenty wewnątrz niej jeszcze nie istnieją. Poczekaj, aż strona zakończy hydratację.

#### Obsługa `React.Fragment`

Gdy używasz polecenia `react$` do wybierania [fragmentów](https://reactjs.org/docs/fragments.html) React, WebdriverIO zwróci pierwsze dziecko tego komponentu jako węzeł komponentu. Jeśli użyjesz `react$$`, otrzymasz tablicę zawierającą wszystkie węzły HTML wewnątrz fragmentów pasujących do selektora.

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

W powyższym przykładzie polecenia działałyby następująco:

```js
await browser.react$('MyComponent') // zwraca element WebdriverIO dla pierwszego <div />
await browser.react$$('MyComponent') // zwraca elementy WebdriverIO dla tablicy [<div />, <div />]
```

**Uwaga:** Jeśli masz wiele instancji `MyComponent` i użyjesz `react$$` do wybrania tych komponentów-fragmentów, otrzymasz jednowymiarową tablicę wszystkich węzłów. Innymi słowy, jeśli masz 3 instancje `<MyComponent />`, otrzymasz tablicę z sześcioma elementami WebdriverIO.

## Niestandardowe strategie selektorów {#custom-selector-strategies}


Jeśli Twoja aplikacja wymaga specyficznego sposobu pobierania elementów, możesz samodzielnie zdefiniować niestandardową strategię selektora, której możesz używać z `custom$` i `custom$$`. W tym celu zarejestruj swoją strategię raz na początku testu, np. w hooku `before`:

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L3-L10
```

Mając następujący fragment HTML:

```html reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/example.html#L8-L12
```

Użyj jej, wywołując:

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L16-L19
```

**Uwaga:** działa to tylko w środowisku webowym, w którym można uruchomić polecenie [`execute`](/docs/api/browser/execute).