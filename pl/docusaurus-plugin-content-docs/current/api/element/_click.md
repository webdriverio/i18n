---
id: click
title: kliknij
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/click.ts
---

Kliknij na element.

Ta komenda wydaje polecenie WebDriver `click` dla wybranego elementu, które zazwyczaj przewija do elementu, a następnie klika
wybrany element, gdy nie przekazano żadnych opcji. Gdy przekazywany jest obiekt opcji, używa klasy akcji zamiast kliknięcia webdriver, co
daje dodatkowe możliwości, takie jak przekazywanie typu przycisku, współrzędnych itp. Domyślnie, przy użyciu opcji, polecenie zwolnienia akcji
jest wysyłane po wykonaniu akcji kliknięcia, przekaż `option.skipRelease=true`, aby pominąć tę akcję.

:::info

Jeśli masz elementy o stałej pozycji (takie jak stały nagłówek lub stopka), które zasłaniają
wybrany element po przewinięciu w obszarze widocznym, kliknięcie zostanie wykonane na podanych współrzędnych, ale będzie
odebrane przez Twój stały (nakładający się) element. W takich przypadkach wyrzucany jest następujący błąd:

```
Element is not clickable at point (x, x). Other element would receive the click: ..."
```

Aby to obejść, spróbuj znaleźć nakładający się element i usunąć go za pomocą komendy `execute`, aby nie zakłócał
kliknięcia. Możesz też spróbować samodzielnie przewinąć do elementu za pomocą `scroll` z odpowiednim przesunięciem dla Twojego
scenariusza.

:::

:::info

Komenda click może być również używana do symulowania długiego naciśnięcia na urządzeniu mobilnym. Odbywa się to przez ustawienie `duration`.
Zobacz przykład poniżej, aby uzyskać więcej informacji.

:::

##### Użycie

```js
$(selector).click({ button, x, y, skipRelease, duration })
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
      <td>`ClickOptions`</td>
      <td>Opcje kliknięcia (opcjonalne)</td>
    </tr>
    <tr>
      <td><code><var>options.button</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`string, number`</td>
      <td>Może być jednym z `[0, "left", 1, "middle", 2, "right"]` <br /><strong>TYLKO-WEB</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`number`</td>
      <td>Klika X pikseli poziomo od lokalizacji elementu (od środkowego punktu elementu)<br /><strong>WEB i Natywne</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`number`</td>
      <td>Klika Y pikseli pionowo od lokalizacji elementu (od środkowego punktu elementu)<br /><strong>Obsługa WEB i Natywne</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
      <td><code><var>options.skipRelease</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`boolean`</td>
      <td>Boolean (opcjonalne) <br /><strong>TYLKO-WEB</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`number`</td>
      <td>Czas trwania kliknięcia, tzw. "LongPress" <br /><strong>TYLKO-MOBILNE-NATYWNE-APLIKACJE</strong> (Mobile)</td>
    </tr>
  </tbody>
</table>

##### Przykłady

```html title="example.html"
<button id="myButton" onclick="document.getElementById('someText').innerHTML='I was clicked'">Click me</button>
<div id="someText">I was not clicked</div>
```

```js title="click.js"
it('should demonstrate the click command', async () => {
    const myButton = await $('#myButton')
    await myButton.click()
    const myText = await $('#someText')
    const text = await myText.getText()
    assert(text === 'I was clicked') // true
})
```

```js title="example.js"
it('should fetch menu links and visit each page', async () => {
    const links = await $$('#menu a')
    await links.forEach(async (link) => {
        await link.click()
    })
})

```

```html title="example.html"
<button id="myButton">Click me</button>
```

```js title="example.js"
it('should demonstrate a click using an offset', async () => {
    const myButton = await $('#myButton')
    await myButton.click({ x: 30 }) // clicks 30 horizontal pixels away from location of the button (from center point of element)
})

```

```html title="example.html"
<button id="myButton">Click me</button>
```

```js title="example.js"
it('should demonstrate a right click passed as string', async () => {
    const myButton = await $('#myButton')
    await myButton.click({ button: 'right' }) // opens the contextmenu at the location of the button
})
it('should demonstrate a right click passed as number while adding an offset', async () => {
    const myButton = await $('#myButton')
    await myButton.click({ button: 2, x: 30, y: 40 }) // opens the contextmenu 30 horizontal and 40 vertical pixels away from location of the button (from the center of element)
})
it('should skip sending releaseAction command that cause unexpected alert closure', async () => {
    const myButton = await $('#myButton')
    await myButton.click({ button: 2, x: 30, y: 40, skipRelease:true }) // skips sending releaseActions
})

```

```js title="longpress.example.js"
it('should be able to open the contacts menu on iOS by executing a longPress', async () => {
    const contacts = await $('~Contacts')
    // opens the Contacts menu on iOS where you can quickly create
    // a new contact, edit your home screen, or remove the app
    await contacts.click({ duration: 2000 })
})
```