---
id: methods
title: Metody
---

Poniższe metody są dodawane do globalnego obiektu WebdriverIO [`browser`](/docs/api/browser).

## Metody zapisu

:::info PORADA
Używaj metod zapisu tylko wtedy, gdy **nie** chcesz porównywać ekranów, a jedynie chcesz mieć zrzut elementu/ekranu.
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

#### Wsparcie

- Przeglądarki stacjonarne
- Przeglądarki mobilne
- Mobilne aplikacje hybrydowe
- Mobilne aplikacje natywne

#### Parametry

-   **`element`:**
    -   **Obowiązkowy:** Tak
    -   **Typ:** Element WebdriverIO
-   **`tag`:**
    -   **Obowiązkowy:** Tak
    -   **Typ:** string
-   **`saveElementOptions`:**
    -   **Obowiązkowy:** Nie
    -   **Typ:** obiekt opcji, zobacz [Opcje zapisu](./method-options#save-options)

#### Wyjście:

Zobacz stronę [Test Output](./test-output#savescreenelementfullpagescreen).

### `saveScreen`

Zapisuje obraz widoku ekranu.

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

#### Wsparcie

- Przeglądarki stacjonarne
- Przeglądarki mobilne
- Mobilne aplikacje hybrydowe
- Mobilne aplikacje natywne

#### Parametry
-   **`tag`:**
    -   **Obowiązkowy:** Tak
    -   **Typ:** string
-   **`saveScreenOptions`:**
    -   **Obowiązkowy:** Nie
    -   **Typ:** obiekt opcji, zobacz [Opcje zapisu](./method-options#save-options)

#### Wyjście:

Zobacz stronę [Test Output](./test-output#savescreenelementfullpagescreen).

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

#### Wsparcie

- Przeglądarki stacjonarne
- Przeglądarki mobilne

#### Parametry
-   **`tag`:**
    -   **Obowiązkowy:** Tak
    -   **Typ:** string
-   **`saveFullPageScreenOptions`:**
    -   **Obowiązkowy:** Nie
    -   **Typ:** obiekt opcji, zobacz [Opcje zapisu](./method-options#save-options)

#### Wyjście:

Zobacz stronę [Test Output](./test-output#savescreenelementfullpagescreen).

### `saveTabbablePage`

Zapisuje obraz całego ekranu z liniami i kropkami dostępnymi za pomocą klawisza Tab.

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

#### Wsparcie

- Przeglądarki stacjonarne

#### Parametry
-   **`tag`:**
    -   **Obowiązkowy:** Tak
    -   **Typ:** string
-   **`saveTabbableOptions`:**
    -   **Obowiązkowy:** Nie
    -   **Typ:** obiekt opcji, zobacz [Opcje zapisu](./method-options#save-options)

#### Wyjście:

Zobacz stronę [Test Output](./test-output#savescreenelementfullpagescreen).

## Metody sprawdzania

:::info PORADA
Gdy metody `check` są używane po raz pierwszy, zobaczysz poniższe ostrzeżenie w logach. Oznacza to, że nie musisz łączyć metod `save` i `check`, jeśli chcesz utworzyć bazowy obraz.

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

#### Wsparcie

- Przeglądarki stacjonarne
- Przeglądarki mobilne
- Mobilne aplikacje hybrydowe
- Mobilne aplikacje natywne

#### Parametry
-   **`element`:**
    -   **Obowiązkowy:** Tak
    -   **Typ:** Element WebdriverIO
-   **`tag`:**
    -   **Obowiązkowy:** Tak
    -   **Typ:** string
-   **`checkElementOptions`:**
    -   **Obowiązkowy:** Nie
    -   **Typ:** obiekt opcji, zobacz [Opcje porównywania/sprawdzania](./method-options#compare-check-options)

#### Wyjście:

Zobacz stronę [Test Output](./test-output#checkscreenelementfullpagescreen).

### `checkScreen`

Porównuje obraz widoku ekranu z obrazem bazowym.

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

#### Wsparcie

- Przeglądarki stacjonarne
- Przeglądarki mobilne
- Mobilne aplikacje hybrydowe
- Mobilne aplikacje natywne

#### Parametry
-   **`tag`:**
    -   **Obowiązkowy:** Tak
    -   **Typ:** string
-   **`checkScreenOptions`:**
    -   **Obowiązkowy:** Nie
    -   **Typ:** obiekt opcji, zobacz [Opcje porównywania/sprawdzania](./method-options#compare-check-options)

#### Wyjście:

Zobacz stronę [Test Output](./test-output#checkscreenelementfullpagescreen).

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

#### Wsparcie

- Przeglądarki stacjonarne
- Przeglądarki mobilne

#### Parametry
-   **`tag`:**
    -   **Obowiązkowy:** Tak
    -   **Typ:** string
-   **`checkFullPageOptions`:**
    -   **Obowiązkowy:** Nie
    -   **Typ:** obiekt opcji, zobacz [Opcje porównywania/sprawdzania](./method-options#compare-check-options)

#### Wyjście:

Zobacz stronę [Test Output](./test-output#checkscreenelementfullpagescreen).

### `checkTabbablePage`

Porównuje obraz całego ekranu z liniami i kropkami dostępnymi za pomocą klawisza Tab z obrazem bazowym.

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

#### Wsparcie

- Przeglądarki stacjonarne

#### Parametry
-   **`tag`:**
    -   **Obowiązkowy:** Tak
    -   **Typ:** string
-   **`checkTabbableOptions`:**
    -   **Obowiązkowy:** Nie
    -   **Typ:** obiekt opcji, zobacz [Opcje porównywania/sprawdzania](./method-options#compare-check-options)

#### Wyjście:

Zobacz stronę [Test Output](./test-output#checkscreenelementfullpagescreen).