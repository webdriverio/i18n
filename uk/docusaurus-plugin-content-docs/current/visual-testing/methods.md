---
id: methods
title: Методи
---

Наступні методи додаються до глобального об'єкту WebdriverIO [`browser`](/docs/api/browser).

## Методи збереження

:::info ПОРАДА
Використовуйте методи збереження тільки тоді, коли **не** хочете порівнювати екрани, а просто хочете мати знімок елемента/екрана.
:::

### `saveElement`

Зберігає зображення елемента.

#### Використання

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

#### Підтримка

- Десктопні браузери
- Мобільні браузери
- Мобільні гібридні додатки
- Мобільні нативні додатки

#### Параметри

-   **`element`:**
    -   **Обов'язково:** Так
    -   **Тип:** WebdriverIO Element
-   **`tag`:**
    -   **Обов'язково:** Так
    -   **Тип:** string
-   **`saveElementOptions`:**
    -   **Обов'язково:** Ні
    -   **Тип:** об'єкт опцій, див. [Опції збереження](./method-options#save-options)

#### Вивід:

Див. сторінку [Результати тестів](./test-output#savescreenelementfullpagescreen).

### `saveScreen`

Зберігає зображення області перегляду.

#### Використання

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

#### Підтримка

- Десктопні браузери
- Мобільні браузери
- Мобільні гібридні додатки
- Мобільні нативні додатки

#### Параметри
-   **`tag`:**
    -   **Обов'язково:** Так
    -   **Тип:** string
-   **`saveScreenOptions`:**
    -   **Обов'язково:** Ні
    -   **Тип:** об'єкт опцій, див. [Опції збереження](./method-options#save-options)

#### Вивід:

Див. сторінку [Результати тестів](./test-output#savescreenelementfullpagescreen).

### `saveFullPageScreen`

#### Використання

Зберігає зображення повного екрану.

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

#### Підтримка

- Десктопні браузери
- Мобільні браузери

#### Параметри
-   **`tag`:**
    -   **Обов'язково:** Так
    -   **Тип:** string
-   **`saveFullPageScreenOptions`:**
    -   **Обов'язково:** Ні
    -   **Тип:** об'єкт опцій, див. [Опції збереження](./method-options#save-options)

#### Вивід:

Див. сторінку [Результати тестів](./test-output#savescreenelementfullpagescreen).

### `saveTabbablePage`

Зберігає зображення повного екрану з лініями та точками для табуляції.

#### Використання

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

#### Підтримка

- Десктопні браузери

#### Параметри
-   **`tag`:**
    -   **Обов'язково:** Так
    -   **Тип:** string
-   **`saveTabbableOptions`:**
    -   **Обов'язково:** Ні
    -   **Тип:** об'єкт опцій, див. [Опції збереження](./method-options#save-options)

#### Вивід:

Див. сторінку [Результати тестів](./test-output#savescreenelementfullpagescreen).

## Методи перевірки

:::info ПОРАДА
Коли методи `check` використовуються вперше, ви побачите наступне попередження в логах. Це означає, що вам не потрібно комбінувати методи `save` та `check`, якщо ви хочете створити базовий зразок.

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

Порівнює зображення елемента з базовим зображенням.

#### Використання

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

#### Підтримка

- Десктопні браузери
- Мобільні браузери
- Мобільні гібридні додатки
- Мобільні нативні додатки

#### Параметри
-   **`element`:**
    -   **Обов'язково:** Так
    -   **Тип:** WebdriverIO Element
-   **`tag`:**
    -   **Обов'язково:** Так
    -   **Тип:** string
-   **`checkElementOptions`:**
    -   **Обов'язково:** Ні
    -   **Тип:** об'єкт опцій, див. [Опції порівняння/перевірки](./method-options#compare-check-options)

#### Вивід:

Див. сторінку [Результати тестів](./test-output#checkscreenelementfullpagescreen).

### `checkScreen`

Порівнює зображення області перегляду з базовим зображенням.

#### Використання

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

#### Підтримка

- Десктопні браузери
- Мобільні браузери
- Мобільні гібридні додатки
- Мобільні нативні додатки

#### Параметри
-   **`tag`:**
    -   **Обов'язково:** Так
    -   **Тип:** string
-   **`checkScreenOptions`:**
    -   **Обов'язково:** Ні
    -   **Тип:** об'єкт опцій, див. [Опції порівняння/перевірки](./method-options#compare-check-options)

#### Вивід:

Див. сторінку [Результати тестів](./test-output#checkscreenelementfullpagescreen).

### `checkFullPageScreen`

Порівнює зображення повного екрану з базовим зображенням.

#### Використання

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

#### Підтримка

- Десктопні браузери
- Мобільні браузери

#### Параметри
-   **`tag`:**
    -   **Обов'язково:** Так
    -   **Тип:** string
-   **`checkFullPageOptions`:**
    -   **Обов'язково:** Ні
    -   **Тип:** об'єкт опцій, див. [Опції порівняння/перевірки](./method-options#compare-check-options)

#### Вивід:

Див. сторінку [Результати тестів](./test-output#checkscreenelementfullpagescreen).

### `checkTabbablePage`

Порівнює зображення повного екрану з лініями та точками для табуляції з базовим зображенням.

#### Використання

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

#### Підтримка

- Десктопні браузери

#### Параметри
-   **`tag`:**
    -   **Обов'язково:** Так
    -   **Тип:** string
-   **`checkTabbableOptions`:**
    -   **Обов'язково:** Ні
    -   **Тип:** об'єкт опцій, див. [Опції порівняння/перевірки](./method-options#compare-check-options)

#### Вивід:

Див. сторінку [Результати тестів](./test-output#checkscreenelementfullpagescreen).