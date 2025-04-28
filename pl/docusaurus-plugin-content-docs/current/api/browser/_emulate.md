---
id: emulate
title: emulacja
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/emulate.ts
---

WebdriverIO pozwala na emulację interfejsów API za pomocą polecenia `emulate`. Te interfejsy API mogą wtedy
zachowywać się dokładnie tak, jak je określisz. Obsługiwane są następujące zakresy:

- `geolocation`: Emulacja API geolokalizacji
- `userAgent`: Emulacja user agenta
- `colorScheme`: Emulacja schematu kolorów
- `onLine`: Emulacja statusu online
- `device`: Emulacja konkretnego urządzenia mobilnego lub komputera
- `clock`: Emulacja zegara systemowego

Polecenie `emulate` zwraca funkcję, którą można wywołać, aby zresetować emulację. Jest to przydatne,
gdy chcesz zresetować emulację po teście lub zestawie testów.

Przeczytaj więcej na ten temat w wytycznych [Emulacja](/docs/emulation).

:::info

Z wyjątkiem zakresu `clock` nie jest możliwa zmiana emulowanej wartości bez ponownego załadowania strony.

:::

:::info

Ta funkcja wymaga wsparcia WebDriver Bidi dla przeglądarki. Podczas gdy najnowsze wersje Chrome, Edge
i Firefox posiadają takie wsparcie, Safari __nie posiada__. Aby śledzić aktualizacje, odwiedź [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/script/add_preload_script/add_preload_script.py?label=experimental&label=master&aligned).
Ponadto, jeśli korzystasz z dostawcy chmurowego do uruchamiania przeglądarek, upewnij się, że Twój dostawca również wspiera WebDriver Bidi.

:::

Obiekt `EmulationOptions` może mieć następujące właściwości w zależności od zakresu:

| Zakres        | Opcje                                            |
|---------------|-------------------------------------------------|
| `geolocation` | `{ latitude: number, longitude: number }`        |
| `userAgent`   | `string`                                         |
| `colorScheme` | `'light' \| 'dark'`                              |
| `onLine`      | `boolean`                                        |
| `clock`       | `FakeTimerInstallOpts`                           |

##### Użycie

```js
browser.emulate(scope, options)
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
      <td><code><var>scope</var></code></td>
      <td>`string`</td>
      <td>funkcja przeglądarki, którą chcesz emulować, może być `clock`, `geolocation`, `userAgent`, `colorScheme` lub `onLine`</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`EmulationOptions`</td>
      <td>opcje emulacji dla określonego zakresu</td>
    </tr>
  </tbody>
</table>

##### Przykłady

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9bff2baf8a0678c6886f8591d9fc8dea201895d3/emulate/example.js#L4-L18
```

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9bff2baf8a0678c6886f8591d9fc8dea201895d3/emulate/example.js#L20-L36
```

##### Zwraca

- **&lt;Function&gt;**
            **<code><var>returns</var></code>:**   funkcja do resetowania emulacji