---
id: compare-options
title: Opcje porównywania
description: "Dostosuj sposób porównywania zrzutów ekranu za pomocą opcji czułości wizualnej, pixelmatch, maskowania elementów na urządzeniach mobilnych oraz raportowania dla usługi visual."
---

Opcje porównywania to opcje, które wpływają na sposób wykonywania porównania.

:::info UWAGA
Wszystkie opcje porównywania mogą być używane podczas tworzenia instancji usługi lub dla każdego pojedynczego wywołania `checkElement`,`checkScreen` i `checkFullPageScreen`. Jeśli opcja metody ma ten sam klucz co opcja ustawiona podczas tworzenia instancji usługi, to opcja porównywania metody nadpisze wartość opcji porównywania usługi.
:::

## Czułość wizualna

---

:::info Historia wersji opcji `ignore*`
Presety `ignore*` zmieniły swoje działanie jeden raz, jako zmiana niekompatybilna wstecz (breaking change), gdy silnik porównywania został zmieniony z ResembleJS na Pixelmatch:

| Wersja | Silnik | Uwagi |
| --- | --- | --- |
| v9 i starsze | ResembleJS | Oryginalna semantyka `ignore*` (oparta na RGB/jasności, z własną kolejnością presetów resemble). |
| v10 i nowsze | Pixelmatch | Presety `ignore*` są mapowane na ustawienia threshold/AA w pixelmatch. Aktualne wartości domyślne i działanie są opisane przy każdej opcji poniżej; nowe funkcje/poprawki wprowadzone później są oznaczone notatką „Od wersji” przy odpowiedniej opcji. |

:::

**Kolejność „ostatni wygrywa”:** gdy jednocześnie włączona jest więcej niż jedna flaga `ignore*`, faktycznie stosowany jest tylko jeden preset, zgodnie z następującą kolejnością (późniejszy wygrywa): `ignoreAlpha` → `ignoreAntialiasing` → `ignoreColors` → `ignoreLess` → `ignoreNothing`. Logowane jest ostrzeżenie wskazujące, który preset wygrał.

### `ignoreColors`

<Option type="boolean" default="false" required="no">

-   **Uwaga:** _Może być również używana dla `checkElement`, `checkScreen()` i `checkFullPageScreen()`. Nadpisze ustawienie pluginu_
-   **Od wersji:** `v10.1.0`: porównanie wyłącznie jasności z użyciem wag luminancji resemble (`0.3/0.59/0.11`).

Porównuje wyłącznie jasność, ignorując różnice odcienia/koloru. Preset: ścisły próg (~16/255), antyaliasing nie jest wybaczany.

**Używaj tego, gdy** sam kolor może się zmieniać (np. UI z motywami, obrazy zmieniające kolory w zależności od środowiska), ale nadal chcesz wychwytywać zmiany układu lub jasności.

</Option>
### `ignoreAlpha`

<Option type="boolean" default="false" required="no">

-   **Uwaga:** _Może być również używana dla `checkElement`, `checkScreen()` i `checkFullPageScreen()`. Nadpisze ustawienie pluginu_
-   **Od wersji:** `v10.1.0`: stosuje własną regułę threshold/AA niezależnie od innych flag `ignore*`.

Porównuje obrazy, pomijając różnice w kanale alfa. Preset: ścisły próg (~16/255), antyaliasing nie jest wybaczany.

**Używaj tego, gdy** renderowanie przezroczystości/krycia jest niestabilne (np. nakładki, półprzezroczyste elementy), ale liczą się rzeczywiste kolory pikseli pod spodem.

</Option>
### `ignoreAntialiasing`

<Option type="boolean" default="true" required="no">

-   **Uwaga:** _Może być również używana dla `checkElement`, `checkScreen()` i `checkFullPageScreen()`. Nadpisze ustawienie pluginu_
-   **Od wersji:** `v10`: wartość domyślna zmieniona na `true` (w v9 i starszych było `false`).

Wybacza piksele z antyaliasingiem podczas porównania (złagodzony próg ~32/255). Jest to jedyny preset, który wybacza antyaliasing, i jest domyślnie włączony, aby szum renderowania subpikselowego nie powodował niepowodzenia porównań od razu. Ustaw na `false`, aby uzyskać ścisłe porównanie, w którym piksele z antyaliasingiem są liczone jako niezgodności.

**Używaj tego, aby** rozwiązać najczęstsze źródło niestabilności testów wizualnych: krawędzie tekstu i kształtów renderowane z nieco innym antyaliasingiem na różnych maszynach/przeglądarkach, mimo że nic się faktycznie nie zmieniło.

</Option>
### `ignoreLess`

<Option type="boolean" default="false" required="no">

-   **Uwaga:** _Może być również używana dla `checkElement`, `checkScreen()` i `checkFullPageScreen()`. Nadpisze ustawienie pluginu_
-   **Od wersji:** `v10.1.0`: stosuje własną regułę threshold/AA niezależnie od innych flag `ignore*`.

Porównuje obrazy z użyciem złagodzonej tolerancji RGB (~16/255 na kanał w przestrzeni YIQ). Preset: ścisły próg, antyaliasing nie jest wybaczany.

**Używaj tego, gdy** chcesz mieć trochę swobody dla drobnego szumu renderowania (artefakty kompresji w stylu JPEG, niewielkie zaokrąglenia kolorów) bez wybaczania antyaliasingu.

</Option>
### `ignoreNothing`

<Option type="boolean" default="false" required="no">

-   **Uwaga:** _Może być również używana dla `checkElement`, `checkScreen()` i `checkFullPageScreen()`. Nadpisze ustawienie pluginu_
-   **Od wersji:** `v10.1.0`: stosuje własną regułę threshold/AA niezależnie od innych flag `ignore*`.

Stosuje zerową tolerancję: każda różnica pikseli jest liczona jako niezgodność, łącznie z antyaliasingiem.

**Używaj tego, gdy** potrzebujesz dowodu z dokładnością co do piksela, że nic się nie zmieniło, np. przy weryfikacji, czy poprawka nie wprowadziła żadnej regresji, nawet najmniejszej.

</Option>
### `scaleImagesToSameSize`

<Option type="boolean" default="false" required="no">

-   **Uwaga:** _Może być również używana dla `checkElement`, `checkScreen()` i `checkFullPageScreen()`. Nadpisze ustawienie pluginu_

Skaluje 2 obrazy do tego samego rozmiaru przed wykonaniem porównania. Zdecydowanie zaleca się włączenie `ignoreAntialiasing` i `ignoreAlpha`

</Option>
## Bezpośrednia kontrola pixelmatch

---

:::info Dodano w v10.1.0
`compareOptions.pixelmatch` nie ma odpowiednika w v9 (ResembleJS). Jest to całkowicie nowy sposób bezpośredniej kontroli silnika porównywania, zamiast używania presetu `ignore*`.
:::

### `compareOptions.pixelmatch`

<Option type="object" default="undefined" required="no">

-   **Uwaga:** _Może być również używana dla `checkElement`, `checkScreen()` i `checkFullPageScreen()`. Nadpisze ustawienie pluginu dla tej konkretnej użytej metody_
-   **Dodano w:** `v10.1.0`

Przekazuje ustawienia bezpośrednio do [pixelmatch](https://github.com/mapbox/pixelmatch) zamiast używać presetu `ignore*`. **Używaj tego, gdy pięć presetów `ignore*` jest zbyt mało precyzyjnych:** potrzebujesz konkretnej wartości progu, której presety nie oferują, lub obrazu różnic, który jest faktycznie czytelny w twoich raportach/wynikach CI zamiast domyślnego podświetlenia w kolorze magenta.

:::warning Wzajemnie wykluczające się w obrębie tego samego obiektu opcji
Umieszczenie dowolnego klucza `ignore*` i `pixelmatch` w **tym samym** obiekcie opcji powoduje rzucenie `CompareOptionsConflictError`, nawet jeśli wartość `ignore*` to `false` (zobacz nieprawidłowy przykład poniżej). Wybierz jeden tryb na obiekt: presety `ignore*` albo `pixelmatch`, nigdy oba.

Dotyczy to tylko jednego obiektu. Konfiguracja usługi i opcje wywołania metody to osobne obiekty, więc wywołanie `check*` **może** używać innego trybu niż konfiguracja usługi, na przykład usługa używa presetów `ignore*`, ale jedno wywołanie przekazuje zamiast tego `pixelmatch` (lub odwrotnie). W takim przypadku nie ma błędu, jedynie logowane jest ostrzeżenie o zmianie trybu porównywania.
:::

| Pole | Typ | Domyślnie | Do czego służy |
| --- | --- | --- | --- |
| `threshold` | `number` | `0.1` | Czułość od 0 (każda różnica pikseli powoduje niepowodzenie) do 1 (prawie nic nie powoduje niepowodzenia). Użyj tego, aby ustawić jedną dokładną wartość czułości zamiast wybierać najbliższy preset `ignore*`. |
| `includeAA` | `boolean` | `false` | `true` liczy piksele krawędzi z antyaliasingiem jako niezgodności; `false` je wybacza. Wyłącz to, jeśli różnice w renderowaniu krawędzi czcionek/kształtów powodują niestabilne niepowodzenia. |
| `diffColor` | `[number, number, number]` | `[255, 0, 255]` (magenta) | Kolor RGB dla niezgodnych pikseli w obrazie różnic. Zmień go, jeśli magenta zlewa się z twoim UI (np. różowy/fioletowy motyw) i niezgodności są trudne do zauważenia. |
| `aaColor` | `[number, number, number]` | `[255, 0, 255]` (magenta) | Kolor RGB dla pikseli z antyaliasingiem, wizualnie oddzielony od rzeczywistych niezgodności, aby na pierwszy rzut oka odróżnić „szum renderowania” od „faktycznego błędu”. |
| `diffColorAlt` | `[number, number, number]` | `[255, 0, 255]` (magenta) | Kolor RGB dla pikseli, które zostały dodane lub usunięte (a nie tylko zmieniły kolor), przydatny do odróżniania przesunięć układu od zmian koloru. |
| `alpha` | `number` | `0.1` | Krycie nakładki różnic na rzeczywistym zrzucie ekranu. Zwiększ, aby różnice były bardziej widoczne w raportach; zmniejsz, aby nadal wyraźnie widzieć UI pod spodem. Niezwiązane z presetem `ignoreAlpha`. |
| `diffMask` | `boolean` | `false` | Ustaw `true`, aby zwrócić tylko surowe różnice (przezroczyste tło) zamiast różnic narysowanych na zrzucie ekranu; przydatne do budowania własnej przeglądarki/raportu różnic. |
| `checkerboard` | `boolean` | `true` | Kontroluje sposób renderowania półprzezroczystych pikseli w obrazie różnic. Wyłącz, jeśli wzór szachownicy łatwo pomylić z rzeczywistą zawartością twoich zrzutów ekranu. |

**Konfiguracja usługi:**

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['visual', {
            compareOptions: {
                pixelmatch: {
                    threshold: 0.063,
                    includeAA: true,
                },
            },
        }],
    ],
}
```

**Nadpisanie w metodzie, gdy usługa używa presetów `ignore*`:**

```js
await browser.checkScreen('homepage', {
    pixelmatch: { threshold: 0.05 },
})
```

**Nadpisanie w metodzie, gdy usługa używa `pixelmatch`:**

```js
await browser.checkScreen('homepage', {
    ignoreLess: true,
})
```

**Nieprawidłowe: rzuca `CompareOptionsConflictError`**

```js
compareOptions: {
    ignoreLess: false,
    pixelmatch: { threshold: 0.063 },
}
```

Pełną semantykę opcji znajdziesz w [dokumentacji pixelmatch](https://github.com/mapbox/pixelmatch).

</Option>
## Maskowanie elementów na urządzeniach mobilnych

---

### `blockOutStatusBar`

<Option type="boolean" default="true" required="no">

-   **Uwaga:** _Może być również używana dla `checkElement`, `checkScreen()` i `checkFullPageScreen()`. Nadpisze ustawienie pluginu. Dotyczy **tylko urządzeń mobilnych**_

Automatycznie maskuje pasek stanu i pasek adresu podczas porównań. Zapobiega to niepowodzeniom związanym z godziną, statusem wifi lub baterii.

</Option>
### `blockOutToolBar`

<Option type="boolean" default="true" required="no">

-   **Uwaga:** _Może być również używana dla `checkElement`, `checkScreen()` i `checkFullPageScreen()`. Nadpisze ustawienie pluginu. Dotyczy **tylko urządzeń mobilnych**_

Automatycznie maskuje pasek narzędzi.

</Option>
### `blockOutSideBar`

<Option type="boolean" default="true" required="no">

-   **Uwaga:** _Może być używana tylko dla `checkScreen()`. Nadpisze ustawienie pluginu. Dotyczy **tylko iPadów**_

Automatycznie maskuje pasek boczny na iPadach w trybie poziomym podczas porównań. Zapobiega to niepowodzeniom związanym z natywnym komponentem kart/trybu prywatnego/zakładek.

</Option>
## Wyniki i raportowanie

---

### `rawMisMatchPercentage`

<Option type="boolean" default="false" required="no">

-   **Uwaga:** _Może być również używana dla `checkElement`, `checkScreen()` i `checkFullPageScreen()`. Nadpisze ustawienie pluginu_

Jeśli ustawione na true, zwracany procent będzie miał postać `0.12345678`, domyślnie jest to `0.12`

</Option>
### `returnAllCompareData`

<Option type="boolean" default="false" required="no">

-   **Uwaga:** _Może być również używana dla `checkElement`, `checkScreen()` i `checkFullPageScreen()`. Nadpisze ustawienie pluginu_

Zwraca wszystkie dane porównania, a nie tylko procent niezgodności

</Option>
### `saveAboveTolerance`

<Option type="number" default="0" required="no">

-   **Uwaga:** _Może być również używana dla `checkElement`, `checkScreen()` i `checkFullPageScreen()`. Nadpisze ustawienie pluginu_

Dopuszczalna wartość `misMatchPercentage`, która zapobiega zapisywaniu obrazów z różnicami

</Option>
### `diffPixelBoundingBoxProximity`

<Option type="number" default="5" required="no">

-   **Uwaga:** _Może być również używana dla `checkElement`, `checkScreen()` i `checkFullPageScreen()`. Ma znaczenie tylko wtedy, gdy włączona jest opcja [`createJsonReportFiles`](/docs/visual-testing/service-options#createjsonreportfiles)._

Odległość w pikselach używana do grupowania pikseli różnic w raportach JSON. Wyższe wartości grupują więcej pikseli w mniejszą liczbę ramek ograniczających (bounding boxes); niższe wartości dają dokładniejsze, ale liczniejsze ramki.

</Option>