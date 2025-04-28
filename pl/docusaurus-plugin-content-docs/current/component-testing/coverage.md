---
id: coverage
title: Pokrycie kodu
---

Narzędzie do uruchamiania przeglądarki WebdriverIO obsługuje raportowanie pokrycia kodu przy użyciu [`istanbul`](https://istanbul.js.org/). Testrunner automatycznie instrumentuje Twój kod i zbiera informacje o pokryciu kodu.

## Konfiguracja

Aby włączyć raportowanie pokrycia kodu, włącz tę funkcję w konfiguracji przeglądarki WebdriverIO, np.:

```js title=wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: process.env.WDIO_PRESET,
        coverage: {
            enabled: true
        }
    }],
    // ...
}
```

Sprawdź wszystkie [opcje pokrycia](/docs/runner#coverage-options), aby dowiedzieć się, jak poprawnie je skonfigurować.

## Ignorowanie kodu

Mogą istnieć fragmenty kodu, które chcesz celowo wykluczyć ze śledzenia pokrycia. Możesz to zrobić, używając następujących wskazówek parsowania:

- `/* istanbul ignore if */`: ignoruj następną instrukcję if.
- `/* istanbul ignore else */`: ignoruj część else instrukcji if.
- `/* istanbul ignore next */`: ignoruj następną rzecz w kodzie źródłowym (funkcje, instrukcje if, klasy, cokolwiek).
- `/* istanbul ignore file */`: ignoruj cały plik źródłowy (to powinno być umieszczone na początku pliku).

:::info

Zaleca się wykluczenie plików testowych z raportowania pokrycia, ponieważ może to powodować błędy, np. podczas wywoływania poleceń `execute` lub `executeAsync`. Jeśli chcesz zachować je w raporcie, pamiętaj o wykluczeniu ich z instrumentacji za pomocą:

```ts
await browser.execute(/* istanbul ignore next */() => {
    // ...
})
```

:::