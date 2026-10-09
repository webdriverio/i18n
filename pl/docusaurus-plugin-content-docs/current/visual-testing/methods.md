---
id: methods
title: Metody
description: "Używaj metod save i check usługi wizualnej, aby przechwytywać zrzuty ekranu oraz porównywać ekrany, elementy i pełne strony z obrazami bazowymi."
---

Poniższe metody są dodawane do globalnego obiektu WebdriverIO [`browser`](/docs/api/browser).

## Metody zapisu

:::info WSKAZÓWKA
Używaj metod zapisu tylko wtedy, gdy **nie** chcesz porównywać ekranów, a jedynie chcesz uzyskać zrzut elementu/ekranu.
:::

### `saveElement`

Zapisuje obraz elementu.

#### Użycie

```ts
await browser.saveElement(
    // element
    await $('#element-selector'),
    // tag
    'your-reference',
    // saveElementOptions
    {
        // ...
    }
);
```

#### Obsługa

- Przeglądarki desktopowe
- Przeglądarki mobilne
- Mobilne aplikacje hybrydowe
- Mobilne aplikacje natywne

#### Parametry

-   **`element`:**
    -   **Wymagany:** Tak
    -   **Typ:** WebdriverIO Element
-   **`tag`:**
    -   **Wymagany:** Tak
    -   **Typ:** string
-   **`saveElementOptions`:**
    -   **Wymagany:** Nie
    -   **Typ:** obiekt opcji, zobacz [Opcje zapisu](./method-options#save-options)

#### Wynik:

Zobacz stronę [Wynik testu](./test-output#savescreenelementfullpagescreen).

### `saveScreen`

Zapisuje obraz obszaru widoku (viewport).

#### Użycie

```ts
await browser.saveScreen(
    // tag
    'your-reference',
    // saveScreenOptions
    {
        // ...
    }
);
```

#### Obsługa

- Przeglądarki desktopowe
- Przeglądarki mobilne
- Mobilne aplikacje hybrydowe
- Mobilne aplikacje natywne

#### Parametry
-   **`tag`:**
    -   **Wymagany:** Tak
    -   **Typ:** string
-   **`saveScreenOptions`:**
    -   **Wymagany:** Nie
    -   **Typ:** obiekt opcji, zobacz [Opcje zapisu](./method-options#save-options)

#### Wynik:

Zobacz stronę [Wynik testu](./test-output#savescreenelementfullpagescreen).

### `saveFullPageScreen`

#### Użycie

Zapisuje obraz całego ekranu.

```ts
await browser.saveFullPageScreen(
    // tag
    'your-reference',
    // saveFullPageScreenOptions
    {
        // ...
    }
);
```

#### Obsługa

- Przeglądarki desktopowe
- Przeglądarki mobilne

#### Parametry
-   **`tag`:**
    -   **Wymagany:** Tak
    -   **Typ:** string
-   **`saveFullPageScreenOptions`:**
    -   **Wymagany:** Nie
    -   **Typ:** obiekt opcji, zobacz [Opcje zapisu](./method-options#save-options)

#### Wynik:

Zobacz stronę [Wynik testu](./test-output#savescreenelementfullpagescreen).

### `saveTabbablePage`

Zapisuje obraz całego ekranu z liniami i punktami oznaczającymi elementy dostępne za pomocą klawisza Tab.

#### Użycie

```ts
await browser.saveTabbablePage(
    // tag
    'your-reference',
    // saveTabbableOptions
    {
        // ...
    }
);
```

#### Obsługa

- Przeglądarki desktopowe

#### Parametry
-   **`tag`:**
    -   **Wymagany:** Tak
    -   **Typ:** string
-   **`saveTabbableOptions`:**
    -   **Wymagany:** Nie
    -   **Typ:** obiekt opcji, zobacz [Opcje zapisu](./method-options#save-options)

#### Wynik:

Zobacz stronę [Wynik testu](./test-output#savescreenelementfullpagescreen).

## Metody sprawdzania

:::info WSKAZÓWKA
Przy pierwszym użyciu metod `check` w logach pojawi się poniższe ostrzeżenie. Oznacza to, że nie musisz łączyć metod `save` i `check`, jeśli chcesz utworzyć obraz bazowy.

```shell
#####################################################################################
 Baseline image not found, save the actual image manually to the baseline.
 The image can be found here:
 /Users/wswebcreation/project/.tmp/actual/desktop_chrome/examplePage-chrome-latest-1366x768.png
 If you want the module to auto save a non existing image to the baseline you
 can provide 'autoSaveBaseline: true' to the options.
#####################################################################################
```

:::

### `checkElement`

Porównuje obraz elementu z obrazem bazowym.

#### Użycie

```ts
await browser.checkElement(
    // element
    '#element-selector',
    // tag
    'your-reference',
    // checkElementOptions
    {
        // ...
    }
);
```

#### Obsługa

- Przeglądarki desktopowe
- Przeglądarki mobilne
- Mobilne aplikacje hybrydowe
- Mobilne aplikacje natywne

#### Parametry
-   **`element`:**
    -   **Wymagany:** Tak
    -   **Typ:** WebdriverIO Element
-   **`tag`:**
    -   **Wymagany:** Tak
    -   **Typ:** string
-   **`checkElementOptions`:**
    -   **Wymagany:** Nie
    -   **Typ:** obiekt opcji, zobacz [Opcje porównania/sprawdzania](./method-options#compare-check-options)

#### Wynik:

Zobacz stronę [Wynik testu](./test-output#checkscreenelementfullpagescreen).

### `checkScreen`

Porównuje obraz obszaru widoku (viewport) z obrazem bazowym.

#### Użycie

```ts
await browser.checkScreen(
    // tag
    'your-reference',
    // checkScreenOptions
    {
        // ...
    }
);
```

#### Obsługa

- Przeglądarki desktopowe
- Przeglądarki mobilne
- Mobilne aplikacje hybrydowe
- Mobilne aplikacje natywne

#### Parametry
-   **`tag`:**
    -   **Wymagany:** Tak
    -   **Typ:** string
-   **`checkScreenOptions`:**
    -   **Wymagany:** Nie
    -   **Typ:** obiekt opcji, zobacz [Opcje porównania/sprawdzania](./method-options#compare-check-options)

#### Wynik:

Zobacz stronę [Wynik testu](./test-output#checkscreenelementfullpagescreen).

### `checkFullPageScreen`

Porównuje obraz całego ekranu z obrazem bazowym.

#### Użycie

```ts
await browser.checkFullPageScreen(
    // tag
    'your-reference',
    // checkFullPageOptions
    {
        // ...
    }
);
```

#### Obsługa

- Przeglądarki desktopowe
- Przeglądarki mobilne

#### Parametry
-   **`tag`:**
    -   **Wymagany:** Tak
    -   **Typ:** string
-   **`checkFullPageOptions`:**
    -   **Wymagany:** Nie
    -   **Typ:** obiekt opcji, zobacz [Opcje porównania/sprawdzania](./method-options#compare-check-options)

#### Wynik:

Zobacz stronę [Wynik testu](./test-output#checkscreenelementfullpagescreen).

### `checkTabbablePage`

Porównuje obraz całego ekranu z liniami i punktami oznaczającymi elementy dostępne za pomocą klawisza Tab z obrazem bazowym.

#### Użycie

```ts
await browser.checkTabbablePage(
    // tag
    'your-reference',
    // checkTabbableOptions
    {
        // ...
    }
);
```

#### Obsługa

- Przeglądarki desktopowe

#### Parametry
-   **`tag`:**
    -   **Wymagany:** Tak
    -   **Typ:** string
-   **`checkTabbableOptions`:**
    -   **Wymagany:** Nie
    -   **Typ:** obiekt opcji, zobacz [Opcje porównania/sprawdzania](./method-options#compare-check-options)

#### Wynik:

Zobacz stronę [Wynik testu](./test-output#checkscreenelementfullpagescreen).