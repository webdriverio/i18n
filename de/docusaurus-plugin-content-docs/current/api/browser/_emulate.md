---
id: emulate
title: emulate
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/emulate.ts
---

WebdriverIO ermöglicht es Ihnen, Web-APIs mit dem Befehl `emulate` zu emulieren. Diese Web-APIs können dann genau so funktionieren, wie Sie es angeben. Die folgenden Bereiche werden unterstützt:

- `geolocation`: Emulieren der Geolocation-API
- `userAgent`: Emulieren des User-Agents
- `colorScheme`: Emulieren des Farbschemas
- `onLine`: Emulieren des Online-Status
- `device`: Emulieren eines bestimmten mobilen oder Desktop-Geräts
- `clock`: Emulieren der Systemuhr

Der Befehl `emulate` gibt eine Funktion zurück, die aufgerufen werden kann, um die Emulation zurückzusetzen. Dies ist nützlich, wenn Sie die Emulation nach einem Test oder einer Testsuite zurücksetzen möchten.

Lesen Sie mehr dazu in den [Emulation](/docs/emulation)-Richtlinien.

:::info

Mit Ausnahme des `clock`-Bereichs ist es nicht möglich, den emulierten Wert zu ändern, ohne die Seite neu zu laden.

:::

:::info

Diese Funktion erfordert WebDriver Bidi-Unterstützung für den Browser. Während neuere Versionen von Chrome, Edge und Firefox diese Unterstützung haben, unterstützt Safari sie __nicht__. Für Updates folgen Sie [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/script/add_preload_script/add_preload_script.py?label=experimental&label=master&aligned).
Darüber hinaus, wenn Sie einen Cloud-Anbieter zum Starten von Browsern verwenden, stellen Sie sicher, dass Ihr Anbieter auch WebDriver Bidi unterstützt.

:::

Das `EmulationOptions`-Objekt kann je nach Bereich die folgenden Eigenschaften haben:

| Bereich       | Optionen                                         |
|---------------|--------------------------------------------------|
| `geolocation` | `{ latitude: number, longitude: number }`        |
| `userAgent`   | `string`                                         |
| `colorScheme` | `'light' \| 'dark'`                              |
| `onLine`      | `boolean`                                        |
| `clock`       | `FakeTimerInstallOpts`                           |

##### Verwendung

```js
browser.emulate(scope, options)
```

##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>scope</var></code></td>
      <td>`string`</td>
      <td>Funktion des Browsers, die Sie emulieren möchten, kann entweder `clock`, `geolocation`, `userAgent`, `colorScheme` oder `onLine` sein</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`EmulationOptions`</td>
      <td>Emulationsoption für den spezifischen Bereich</td>
    </tr>
  </tbody>
</table>

##### Beispiele

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9bff2baf8a0678c6886f8591d9fc8dea201895d3/emulate/example.js#L4-L18
```

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9bff2baf8a0678c6886f8591d9fc8dea201895d3/emulate/example.js#L20-L36
```

##### Rückgabe

- **&lt;Function&gt;**
            **<code><var>returns</var></code>:**   eine Funktion zum Zurücksetzen der Emulation
