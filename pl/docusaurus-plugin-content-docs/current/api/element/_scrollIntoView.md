---
id: scrollIntoView
title: scrollIntoView
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/scrollIntoView.ts
---

Przewiń element do widoku zarówno dla Desktop/Mobile Web <strong>ORAZ</strong> Natywnych Aplikacji Mobilnych.

:::info

Przewijanie dla Natywnych Aplikacji Mobilnych jest realizowane na podstawie mobilnej komendy `swipe`.

:::

##### Użycie

```js
$(selector).scrollIntoView({ behavior, block, inline, direction, maxScrolls, duration, scrollableElement, percent })
```

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
      <td>opcje dla `Element.scrollIntoView()`. Domyślnie dla desktop/mobile web: <br/> `{ block: 'start', inline: 'nearest' }` <br /> Domyślnie dla Natywnej Aplikacji Mobilnej <br /> `{ maxScrolls: 10, scrollDirection: 'down' }`</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Tylko Desktop/Mobile Web</strong></td>
            </tr>
    <tr>
      <td><code><var>options.behavior</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`string`</td>
      <td>Zobacz [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>TYLKO-WEB</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
      <td><code><var>options.block</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`string`</td>
      <td>Zobacz [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>TYLKO-WEB</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
      <td><code><var>options.inline</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`string`</td>
      <td>Zobacz [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>TYLKO-WEB</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Tylko Natywne Aplikacje Mobilne</strong></td>
            </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`string`</td>
      <td>Może być jednym z `down`, `up`, `left` lub `right`, domyślnie jest `up`. <br /><strong>TYLKO-NATYWNE-APLIKACJE-MOBILNE</strong></td>
    </tr>
    <tr>
      <td><code><var>options.maxScrolls</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`number`</td>
      <td>Maksymalna liczba przewinięć do momentu zatrzymania wyszukiwania elementu, domyślnie jest `10`. <br /><strong>TYLKO-NATYWNE-APLIKACJE-MOBILNE</strong></td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`number`</td>
      <td>Czas trwania przesunięcia w milisekundach. Domyślnie to `1500` ms. Im niższa wartość, tym szybsze przesunięcie.<br /><strong>TYLKO-NATYWNE-APLIKACJE-MOBILNE</strong></td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`Element`</td>
      <td>Element używany do przewijania. Jeśli nie podano elementu, zostanie użyty następujący selektor dla iOS `-ios predicate string:type == "XCUIElementTypeApplication"` oraz następujący dla Androida `//android.widget.ScrollView'`. Jeśli więcej elementów pasuje do domyślnego selektora, domyślnie zostanie wybrany pierwszy pasujący element. <br /> <strong>TYLKO-NATYWNE-APLIKACJE-MOBILNE</strong></td>
    </tr>
    <tr>
      <td><code><var>options.percent</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`number`</td>
      <td>Procent (domyślnego) przewijalnego elementu do przesunięcia. Jest to wartość między 0 a 1. Domyślnie to `0.95`.<br /><strong>NIGDY</strong> nie przesuwaj z dokładnego górnego|dolnego|lewego|prawego brzegu ekranu, możesz wywołać na przykład pasek powiadomień lub inne funkcje systemu operacyjnego/aplikacji, co może prowadzić do nieoczekiwanych rezultatów.<br /> <strong>TYLKO-NATYWNE-APLIKACJE-MOBILNE</strong></td>
    </tr>
  </tbody>
</table>

##### Przykłady

```js title="desktop.mobile.web.scrollIntoView.js"
it('should demonstrate the desktop/mobile web scrollIntoView command', async () => {
    const elem = await $('#myElement');
    // scroll to specific element
    await elem.scrollIntoView();
    // center element within the viewport
    await elem.scrollIntoView({ block: 'center', inline: 'center' });
});

```

```js title="mobile.native.app.scrollIntoView.js"
it('should demonstrate the mobile native app scrollIntoView command', async () => {
    const elem = await $('#myElement');
    // scroll to a specific element in the default scrollable element for Android or iOS for a maximum of 10 scrolls
    await elem.scrollIntoView();
    // Scroll to the left in the scrollable element called '#scrollable' for a maximum of 5 scrolls
    await elem.scrollIntoView({
        direction: 'left',
        maxScrolls: 5,
        scrollableElement: $('#scrollable')
    });
});
```