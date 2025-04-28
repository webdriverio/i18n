---
id: tap
title: tap
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/tap.ts
---

Wykonuje gest dotknięcia na:
- podanym elemencie. Automatycznie **przewinie ekran** jeśli element nie jest widoczny.
- lub na ekranie urządzenia mobilnego poprzez podanie współrzędnych `x` i `y`

Wewnętrznie używa:
- Dotknięcie elementu:
     - komendy `click` dla środowisk Web (przeglądarki Chrome/Safari lub aplikacje hybrydowe)
     - Android [`mobile: clickGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-clickgesture)
lub iOS [`mobile: tap`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-tap) dla aplikacji natywnych, włączając komendę `scrollIntoView`
dla automatycznego przewijania
- Dotknięcie ekranu:
     - komendy `action` dla środowisk Web (przeglądarki Chrome/Safari lub aplikacje hybrydowe)
     - Android [`mobile: clickGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-clickgesture)
lub iOS [`mobile: tap`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-tap) dla aplikacji natywnych

Ta różnica sprawia, że komenda `tap` jest bardziej niezawodną alternatywą dla komendy `click` dla aplikacji mobilnych.

Dla aplikacji natywnych ta komenda różni się od komendy `click`, ponieważ <strong>automatycznie przewija</strong> do elementu za pomocą komendy `scrollIntoView`,
która nie jest wspierana dla aplikacji natywnych z komendą `click`. W aplikacjach hybrydowych lub środowiskach web, automatyczne przewijanie jest wspierane zarówno dla komend `click` jak i `tap`.

:::info

Ta komenda działa tylko z następującymi aktualnymi komponentami:
 - Appium server (wersja 2.0.0 lub wyższa)
 - `appium-uiautomator2-driver` (dla Androida)
 - `appium-xcuitest-driver` (dla iOS)

Upewnij się, że Twoje lokalne lub chmurowe środowisko Appium jest regularnie aktualizowane, aby uniknąć problemów z kompatybilnością.

:::

:::caution Dla dotknięć ekranu

Jeśli chcesz dotknąć określonego miejsca na ekranie i używasz zrzutu ekranu do określenia współrzędnych, pamiętaj, że
współrzędne dla iOS są oparte na rozmiarze ekranu urządzenia, a nie na rozmiarze zrzutu ekranu. Rozmiar zrzutu ekranu jest większy ze względu na współczynnik pikseli urządzenia.
Średni współczynnik pikseli urządzenia do iPhone'a 8 i obecnych iPadów wynosi 2, dla iPhone'ów od iPhone'a X współczynnik wynosi 3. Oznacza to, że rozmiar zrzutu ekranu
jest 2 lub 3 razy większy niż rozmiar ekranu urządzenia, co oznacza, że jeśli znajdziesz współrzędne na zrzucie ekranu, podziel je przez współczynnik pikseli
urządzenia, aby uzyskać prawidłowe współrzędne ekranu. Na przykład:

```js
const screenshotCoordinates = { x: 600, y: 900 };
const dpr = 3; // Przykład dla iPhone 16
const screenCoordinates = {
    x: screenshotCoordinates.x / dpr,
    y: screenshotCoordinates.y / dpr
};
await browser.tap(screenCoordinates);
```

:::

##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcjonalne</span></td>
      <td>`TapOptions`</td>
      <td>Opcje dotknięcia (opcjonalne)</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Opcje dotknięcia elementu</strong></td>
            </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">opcjonalne</span></td>
      <td>`number`</td>
      <td>Liczba (opcjonalna, obowiązkowa jeśli ustawiono y) <br /><strong>Tylko dla dotknięcia EKRANU, nie dla dotknięcia ELEMENTU</strong></td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">opcjonalne</span></td>
      <td>`number`</td>
      <td>Liczba (opcjonalna, obowiązkowa jeśli ustawiono x) <br /><strong>Tylko dla dotknięcia EKRANU, nie dla dotknięcia ELEMENTU</strong></td>
    </tr>
    <tr>
              <td colspan="3"><strong>Opcje dotknięcia ekranu</strong></td>
            </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">opcjonalne</span></td>
      <td>`string`</td>
      <td>Może być jednym z `down`, `up`, `left` lub `right`, domyślnie `down`. <br /><strong>Tylko dla dotknięcia ELEMENTU, nie dla dotknięcia EKRANU</strong><br /><strong>TYLKO-DLA-NATYWNYCH-APLIKACJI-MOBILNYCH</strong></td>
    </tr>
    <tr>
      <td><code><var>options.maxScrolls</var></code><br /><span className="label labelWarning">opcjonalne</span></td>
      <td>`number`</td>
      <td>Maksymalna liczba przewinięć, po której zakończy wyszukiwanie elementu, domyślnie `10`. <br /><strong>Tylko dla dotknięcia ELEMENTU, nie dla dotknięcia EKRANU</strong><br /><strong>TYLKO-DLA-NATYWNYCH-APLIKACJI-MOBILNYCH</strong></td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">opcjonalne</span></td>
      <td>`Element`</td>
      <td>Element, który jest używany do przewijania. Jeśli nie podano elementu, użyje następującego selektora dla iOS `-ios predicate string:type == "XCUIElementTypeApplication"` i następującego dla Androida `//android.widget.ScrollView'`. Jeśli więcej elementów pasuje do domyślnego selektora, domyślnie wybierze pierwszy pasujący element. <br /><strong>Tylko dla dotknięcia ELEMENTU, nie dla dotknięcia EKRANU</strong><br /><strong>TYLKO-DLA-NATYWNYCH-APLIKACJI-MOBILNYCH</strong></td>
    </tr>
  </tbody>
</table>

##### Przykłady

```js title="element.tap.example.js"
it('should be able to tap an on element', async () => {
    const elem = $('~myElement')
    // It will automatically scroll to the element if it's not already in the viewport
    await elem.tap()
})

```

```js title="element.tap.scroll.options.example.js"
it('should be able to swipe right 3 times in a custom scroll areas to an element and tap on the element', async () => {
    const elem = $('~myElement')
    // Swipe right 3 times in the custom scrollable element to find the element
    await elem.tap({
        direction: 'right',
        maxScrolls: 3,
        scrollableElement: $('#scrollable')
    })
})

```

```js title="screen.tap.example.js"
it('should be able to tap on screen coordinates', async () => {
    await browser.tap({ x: 200, y: 400 })
})
```