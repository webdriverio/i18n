---
id: coverage
title: Pokrycie kodu
description: "Zbieraj dane o pokryciu kodu dla testów komponentów za pomocą browser runnera, który instrumentuje Twój kod przy użyciu istanbul poprzez Vite."
---

Browser runner WebdriverIO obsługuje raportowanie pokrycia kodu przy użyciu [`istanbul`](https://istanbul.js.org/). Testrunner automatycznie zinstrumentuje Twój kod za pomocą Vite i zbierze dla Ciebie dane o pokryciu kodu.

## Jak to działa

`@wdio/browser-runner` używa Vite do serwowania Twojej aplikacji. Po włączeniu pokrycia kodu dodaje on do serwera Vite wtyczkę, która próbuje instrumentować Twój kod źródłowy w locie, w momencie gdy jest on żądany przez przeglądarkę.

:::warning Ważne
**Nie opuszczaj strony test runnera!**

Pokrycie kodu opiera się na plikach serwowanych i instrumentowanych przez lokalny serwer Vite uruchomiony przez WebdriverIO.
Jeśli użyjesz `browser.url('http://...')` lub `browser.url('file://...')`, aby przejść na inną stronę, opuszczasz zinstrumentowane środowisko. Twój kod zostanie wykonany, ale **żadne dane o pokryciu nie zostaną zebrane**.

**Prawidłowe podejście (testowanie komponentów):**
Renderuj swój komponent lub importuj swój moduł bezpośrednio w pliku testowym.

```js
import { myFunction } from '../src/utils.js'

it('should cover my function', () => {
    myFunction() // To jest pokryte
})
```

**Nieprawidłowe podejście (styl E2E):**
```js
it('will not have coverage', async () => {
    // ❌ przejście na inną stronę psuje instrumentację
    await browser.url('http://localhost:3000')
})
```
:::

## Konfiguracja

Aby włączyć raportowanie pokrycia kodu, włącz je w konfiguracji browser runnera WebdriverIO, np.:

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

Zapoznaj się ze wszystkimi [opcjami pokrycia kodu](/docs/runner#coverage-options), aby dowiedzieć się, jak poprawnie je skonfigurować.

:::tip Wskazówki dotyczące konfiguracji
Jeśli testujesz niestandardowe pliki (takie jak skrypty inline w plikach `.html`) lub jeśli Twoje pliki nie są wykrywane, może być konieczne jawne sprawdzenie opcji `include` i `extension`:

```js
coverage: {
    enabled: true,
    // Jawnie wskaż swoje pliki źródłowe, jeśli domyślne rozwiązywanie zawiedzie
    include: ['src/**/*.js', 'src/**/*.vue'],
    // Dodaj .html, jeśli masz skrypty inline
    extension: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.html']
}
```
:::

## Ignorowanie kodu

Mogą istnieć fragmenty Twojej bazy kodu, które celowo chcesz wykluczyć ze śledzenia pokrycia. Aby to zrobić, możesz użyć następujących wskazówek dla parsera:

- `/* istanbul ignore if */`: ignoruje następną instrukcję if.
- `/* istanbul ignore else */`: ignoruje część else instrukcji if.
- `/* istanbul ignore next */`: ignoruje następny element w kodzie źródłowym (funkcje, instrukcje if, klasy i cokolwiek innego).
- `/* istanbul ignore file */`: ignoruje cały plik źródłowy (należy to umieścić na początku pliku).

:::info

Zaleca się wykluczenie plików testowych z raportowania pokrycia kodu, ponieważ mogą one powodować błędy, np. podczas wywoływania komendy `execute`. Jeśli chcesz zachować je w raporcie, upewnij się, że wykluczasz je z instrumentacji za pomocą:

```ts
await browser.execute(/* istanbul ignore next */() => {
    // ...
})
```

:::