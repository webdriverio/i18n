---
id: longPress
title: longPress
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/longPress.ts
---

Wykonuje gest długiego naciśnięcia na danym elemencie na ekranie.

Polecenie to wydaje komendę WebDrivera `action` dla wybranego elementu. Bazuje ono na komendzie `click`.

:::info

Ta komenda działa tylko z następującymi aktualnymi komponentami:
 - Serwer Appium (wersja 2.0.0 lub wyższa)
 - `appium-uiautomator2-driver` (dla Androida)
 - `appium-xcuitest-driver` (dla iOS)

Upewnij się, że Twoje lokalne lub chmurowe środowisko Appium jest regularnie aktualizowane, aby uniknąć problemów z kompatybilnością.

:::

##### Użycie

```js
$(selector).longPress({ x, y, duration })
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
      <td>`LongPressOptions`</td>
      <td>Opcje długiego naciśnięcia (opcjonalne)</td>
    </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`number`</td>
      <td>Liczba (opcjonalna)</td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`number`</td>
      <td>Liczba (opcjonalna)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`number`</td>
      <td>Czas trwania naciśnięcia w ms, domyślnie 1500 ms <br /><strong>TYLKO DLA URZĄDZEŃ MOBILNYCH</strong></td>
    </tr>
  </tbody>
</table>

##### Przykłady

```js title="longpress.offset.js"
it('should demonstrate a longPress using an offset on the iOS Contacts icon', async () => {
    const contacts = $('~Contacts')
    // opens the Contacts menu on iOS where you can quickly create
    // a new contact, edit your home screen, or remove the app
    // clicks 30 horizontal and 10 vertical pixels away from location of the icon (from center point of element)
    await contacts.longPress({ x: 30, y: 10 })
})

```

```js title="longpress.example.js"
it('should be able to open the contacts menu on iOS by executing a longPress of 5 seconds', async () => {
    const contacts = $('~Contacts')
    // opens the Contacts menu on iOS where you can quickly create
    // a new contact, edit your home screen, or remove the app
    await contacts.longPress({ duration: 5 * 1000 })
})
```