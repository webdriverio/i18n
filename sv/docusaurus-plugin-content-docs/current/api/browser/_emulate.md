---
id: emulate
title: emulera
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/emulate.ts
---

WebdriverIO tillåter dig att emulera Web API:er med hjälp av kommandot `emulate`. Dessa Web API:er kan sedan
bete sig exakt som du specificerar. Följande omfattningar stöds:

- `geolocation`: Emulera platspositionerings-API
- `userAgent`: Emulera användaragenten
- `colorScheme`: Emulera färgschema
- `onLine`: Emulera onlinestatus
- `device`: Emulera en specifik mobil eller skrivbordsenhet
- `clock`: Emulera systemklockan

Kommandot `emulate` returnerar en funktion som kan anropas för att återställa emuleringen. Detta är användbart
när du vill återställa emuleringen efter ett test eller en testsvit.

Läs mer om detta i [Emulation](/docs/emulation) riktlinjerna.

:::info

Förutom för omfattningen `clock` är det inte möjligt att ändra det emulerade värdet utan att ladda om sidan.

:::

:::info

Denna funktion kräver WebDriver Bidi-stöd för webbläsaren. Medan nyare versioner av Chrome, Edge
och Firefox har sådant stöd, har Safari __inte__ det. För uppdateringar följ [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/script/add_preload_script/add_preload_script.py?label=experimental&label=master&aligned).
Dessutom, om du använder en molnleverantör för att starta webbläsare, se till att din leverantör också stöder WebDriver Bidi.

:::

Objektet `EmulationOptions` kan ha följande egenskaper baserat på omfattningen:

| Omfattning    | Alternativ                                       |
|---------------|--------------------------------------------------|
| `geolocation` | `{ latitude: number, longitude: number }`        |
| `userAgent`   | `string`                                         |
| `colorScheme` | `'light' \| 'dark'`                              |
| `onLine`      | `boolean`                                        |
| `clock`       | `FakeTimerInstallOpts`                           |

##### Användning

```js
browser.emulate(scope, options)
```

##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>scope</var></code></td>
      <td>`string`</td>
      <td>funktion i webbläsaren du vill emulera, kan vara antingen `clock`, `geolocation`, `userAgent`, `colorScheme` eller `onLine`</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`EmulationOptions`</td>
      <td>emuleringsoption för specifik omfattning</td>
    </tr>
  </tbody>
</table>

##### Exempel

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9bff2baf8a0678c6886f8591d9fc8dea201895d3/emulate/example.js#L4-L18
```

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9bff2baf8a0678c6886f8591d9fc8dea201895d3/emulate/example.js#L20-L36
```

##### Returnerar

- **&lt;Function&gt;**
            **<code><var>returns</var></code>:**   en funktion för att återställa emuleringen