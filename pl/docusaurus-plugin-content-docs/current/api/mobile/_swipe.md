---
id: swipe
title: przesunięcie (swipe)
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/swipe.ts
---

Przesuwanie w określonym kierunku w obszarze widoku lub elemencie dla aplikacji Desktop/Mobile Web <strong>ORAZ</strong> natywnych aplikacji mobilnych.

:::info

Przesuwanie dla natywnych aplikacji mobilnych opiera się na protokole W3C-actions, symulującym naciśnięcie palcem i ruch.
To różni się od komendy [`mobile: scrollGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-scrollgesture) dla Androida
lub [`mobile: scroll`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-scroll) dla iOS, które opierają się na protokole Appium Driver i są
dostępne tylko dla platform mobilnych w kontekście NATIVE.

Ta komenda działa tylko z następującymi aktualnymi komponentami:
 - Serwer Appium (wersja 2.0.0 lub wyższa)
 - `appium-uiautomator2-driver` (dla Androida)
 - `appium-xcuitest-driver` (dla iOS)

Upewnij się, że twoje lokalne lub oparte na chmurze środowisko Appium jest regularnie aktualizowane, aby uniknąć problemów z kompatybilnością.

:::

:::caution Przesuwanie oparte na współrzędnych

Unikaj używania opcji `from` i `to`, chyba że jest to absolutnie konieczne. Są one specyficzne dla urządzenia i mogą nie działać spójnie na różnych urządzeniach.
Użyj opcji `scrollableElement` dla niezawodnych przesunięć w obrębie elementu.

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
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`object, boolean`</td>
      <td>opcje dla `browser.swipe()`. Domyślnie dla desktop/mobile web: <br/> `{ direction: 'up', duration: 1500, percent: 0.95, scrollableElement: WebdriverIO.Element }`</td>
    </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`string`</td>
      <td>Może być jednym z: `down`, `up`, `left` lub `right`, domyślnie `up`. <br /><strong>TYLKO-DLA-NATYWNYCH-APLIKACJI-MOBILNYCH</strong></td>
    </tr>
    <tr>
                      <td colspan="3"><strong>W dół</strong><br /><strong>Punkt początkowy:</strong><br/>Umieszczasz palec w górnej części ekranu.<br/><strong>Ruch:</strong><br/>Przesuwasz palec w dół w kierunku dolnej części ekranu.<br/><strong>Akcja:</strong><br/>To zależy od kontekstu:<br />- Na ekranie głównym lub w aplikacjach, zazwyczaj przewija zawartość w górę.<br />- Z górnej krawędzi, często otwiera panel powiadomień lub szybkie ustawienia.<br />- W przeglądarkach lub aplikacjach do czytania, może służyć do przewijania treści.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>W lewo</strong><br /><strong>Punkt początkowy:</strong><br/>Umieszczasz palec po prawej stronie ekranu.<br/><strong>Ruch:</strong><br/>Przesuwasz palec poziomo w lewo.><br/><strong>Akcja:</strong><br/>Odpowiedź na ten gest zależy od aplikacji:<br />- Może przejść do następnego elementu w karuzeli lub zestawie obrazów.<br />- W kontekście nawigacji, może wrócić do poprzedniej strony lub zamknąć bieżący widok.<br />- Na ekranie głównym, zwykle przełącza na następny wirtualny pulpit lub ekran.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>W prawo</strong><br /><strong>Punkt początkowy:</strong><br/>Umieszczasz palec po lewej stronie ekranu.<br/><strong>Ruch:</strong><br/>Przesuwasz palec poziomo w prawo.<br/><strong>Akcja:</strong><br/>Podobnie jak przesunięcie w lewo, ale w przeciwnym kierunku:<br />-- Często przechodzi do poprzedniego elementu w karuzeli lub galerii.<br />- Może służyć do otwierania menu bocznych lub szuflad nawigacyjnych w aplikacjach.<br />- Na ekranie głównym, zazwyczaj przełącza na poprzedni wirtualny pulpit.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>W górę</strong><br /><strong>Punkt początkowy:</strong><br/>Umieszczasz palec w dolnej części ekranu.<br/><strong>Ruch:</strong><br/>Przesuwasz palec w górę w kierunku górnej części ekranu.><br/><strong>Akcja:</strong><br/>W zależności od kontekstu, mogą wystąpić różne działania:<br />- Na ekranie głównym lub na liście, zwykle przewija zawartość w dół.<br />- W aplikacji pełnoekranowej, może otworzyć dodatkowe opcje lub szufladę aplikacji.<br />- W niektórych interfejsach, może wywołać akcję 'odświeżania' lub otworzyć pasek wyszukiwania.</td>
            </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`number`</td>
      <td>Czas trwania przesunięcia w milisekundach. Domyślnie `1500` ms. Im niższa wartość, tym szybsze przesunięcie.</td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`Element`</td>
      <td>Element, który jest używany do przesuwania w jego obrębie. Jeśli nie podano żadnego elementu, zostanie użyty następujący selektor dla iOS `-ios predicate string:type == "XCUIElementTypeApplication"` i następujący dla Androida `//android.widget.ScrollView'`. Jeśli więcej elementów odpowiada domyślnemu selektorowi, wtedy domyślnie wybierze pierwszy pasujący element. <br /> <strong>TYLKO-DLA-NATYWNYCH-APLIKACJI-MOBILNYCH</strong></td>
    </tr>
    <tr>
      <td><code><var>options.percent</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`number`</td>
      <td>Procent (domyślnego) przewijalnego elementu do przesunięcia. Jest to wartość między 0 a 1. Domyślnie `0.95`.<br /><strong>NIGDY</strong> nie przesuwaj z dokładnej górnej|dolnej|lewej|prawej krawędzi ekranu, możesz uruchomić na przykład pasek powiadomień lub inne funkcje systemu operacyjnego/aplikacji, co może prowadzić do nieoczekiwanych wyników.<br />Nie ma to wpływu, jeśli podano `from` i `to`.</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Poniższe wartości <strong>TYLKO</strong> mają wpływ, jeśli `scrollableElement` <strong>NIE</strong> jest podany, w przeciwnym razie są ignorowane.</strong></td>
            </tr>
    <tr>
      <td><code><var>options.from</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`object`</td>
      <td>Współrzędne x i y początku przesunięcia. Jeśli podano `scrollableElement`, te współrzędne nie mają wpływu.</td>
    </tr>
    <tr>
      <td><code><var>options.from.x</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`number`</td>
      <td>Współrzędna x początku przesunięcia.</td>
    </tr>
    <tr>
      <td><code><var>options.from.y</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`number`</td>
      <td>Współrzędna y początku przesunięcia.</td>
    </tr>
    <tr>
      <td><code><var>options.to</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`object`</td>
      <td>Współrzędne x i y końca przesunięcia. Jeśli podano `scrollableElement`, te współrzędne nie mają wpływu.</td>
    </tr>
    <tr>
      <td><code><var>options.to.x</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`number`</td>
      <td>Współrzędna x końca przesunięcia.</td>
    </tr>
    <tr>
      <td><code><var>options.to.y</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`number`</td>
      <td>Współrzędna y końca przesunięcia.</td>
    </tr>
  </tbody>
</table>

##### Przykłady

```js title="swipe.js"
it('should execute a default swipe', async () => {
    // Default will be a swipe from the bottom to the top, meaning it will swipe UP
    await browser.swipe();
});

```

```js title="swipe.with.options.js"
it('should execute a swipe with options', async () => {
    await browser.swipe({
        direction: 'left',                  // Swipe from right to left
        duration: 5000,                     // Last for 5 seconds
        percent: 0.5,                       // Swipe 50% of the scrollableElement
        scrollableElement: $('~carousel'),  // The element to swipe within
    })
});
```