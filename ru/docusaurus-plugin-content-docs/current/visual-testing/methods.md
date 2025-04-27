---
id: methods
title: Методы
---

Следующие методы добавлены к глобальному объекту WebdriverIO [`browser`](/docs/api/browser).

## Методы сохранения

:::info СОВЕТ
Используйте методы сохранения только когда вы **не** хотите сравнивать скриншоты, а просто хотите получить снимок элемента/экрана.
:::

### `saveElement`

Сохраняет изображение элемента.

#### Использование

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

#### Поддержка

- Настольные браузеры
- Мобильные браузеры
- Мобильные гибридные приложения
- Мобильные нативные приложения

#### Параметры

-   **`element`:**
    -   **Обязательный:** Да
    -   **Тип:** Элемент WebdriverIO
-   **`tag`:**
    -   **Обязательный:** Да
    -   **Тип:** строка
-   **`saveElementOptions`:**
    -   **Обязательный:** Нет
    -   **Тип:** объект с опциями, см. [Опции сохранения](./method-options#save-options)

#### Вывод:

См. страницу [Вывод теста](./test-output#savescreenelementfullpagescreen).

### `saveScreen`

Сохраняет изображение области просмотра.

#### Использование

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

#### Поддержка

- Настольные браузеры
- Мобильные браузеры
- Мобильные гибридные приложения
- Мобильные нативные приложения

#### Параметры
-   **`tag`:**
    -   **Обязательный:** Да
    -   **Тип:** строка
-   **`saveScreenOptions`:**
    -   **Обязательный:** Нет
    -   **Тип:** объект с опциями, см. [Опции сохранения](./method-options#save-options)

#### Вывод:

См. страницу [Вывод теста](./test-output#savescreenelementfullpagescreen).

### `saveFullPageScreen`

#### Использование

Сохраняет изображение полного экрана.

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

#### Поддержка

- Настольные браузеры
- Мобильные браузеры

#### Параметры
-   **`tag`:**
    -   **Обязательный:** Да
    -   **Тип:** строка
-   **`saveFullPageScreenOptions`:**
    -   **Обязательный:** Нет
    -   **Тип:** объект с опциями, см. [Опции сохранения](./method-options#save-options)

#### Вывод:

См. страницу [Вывод теста](./test-output#savescreenelementfullpagescreen).

### `saveTabbablePage`

Сохраняет изображение полного экрана с отмеченными линиями и точками табуляции.

#### Использование

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

#### Поддержка

- Настольные браузеры

#### Параметры
-   **`tag`:**
    -   **Обязательный:** Да
    -   **Тип:** строка
-   **`saveTabbableOptions`:**
    -   **Обязательный:** Нет
    -   **Тип:** объект с опциями, см. [Опции сохранения](./method-options#save-options)

#### Вывод:

См. страницу [Вывод теста](./test-output#savescreenelementfullpagescreen).

## Методы проверки

:::info СОВЕТ
Когда методы `check` используются впервые, вы увидите предупреждение в логах. Это означает, что вам не нужно комбинировать методы `save` и `check`, если вы хотите создать базовое изображение.

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

Сравнивает изображение элемента с базовым изображением.

#### Использование

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

#### Поддержка

- Настольные браузеры
- Мобильные браузеры
- Мобильные гибридные приложения
- Мобильные нативные приложения

#### Параметры
-   **`element`:**
    -   **Обязательный:** Да
    -   **Тип:** Элемент WebdriverIO
-   **`tag`:**
    -   **Обязательный:** Да
    -   **Тип:** строка
-   **`checkElementOptions`:**
    -   **Обязательный:** Нет
    -   **Тип:** объект с опциями, см. [Опции сравнения/проверки](./method-options#compare-check-options)

#### Вывод:

См. страницу [Вывод теста](./test-output#checkscreenelementfullpagescreen).

### `checkScreen`

Сравнивает изображение области просмотра с базовым изображением.

#### Использование

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

#### Поддержка

- Настольные браузеры
- Мобильные браузеры
- Мобильные гибридные приложения
- Мобильные нативные приложения

#### Параметры
-   **`tag`:**
    -   **Обязательный:** Да
    -   **Тип:** строка
-   **`checkScreenOptions`:**
    -   **Обязательный:** Нет
    -   **Тип:** объект с опциями, см. [Опции сравнения/проверки](./method-options#compare-check-options)

#### Вывод:

См. страницу [Вывод теста](./test-output#checkscreenelementfullpagescreen).

### `checkFullPageScreen`

Сравнивает изображение полного экрана с базовым изображением.

#### Использование

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

#### Поддержка

- Настольные браузеры
- Мобильные браузеры

#### Параметры
-   **`tag`:**
    -   **Обязательный:** Да
    -   **Тип:** строка
-   **`checkFullPageOptions`:**
    -   **Обязательный:** Нет
    -   **Тип:** объект с опциями, см. [Опции сравнения/проверки](./method-options#compare-check-options)

#### Вывод:

См. страницу [Вывод теста](./test-output#checkscreenelementfullpagescreen).

### `checkTabbablePage`

Сравнивает изображение полного экрана с отмеченными линиями и точками табуляции с базовым изображением.

#### Использование

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

#### Поддержка

- Настольные браузеры

#### Параметры
-   **`tag`:**
    -   **Обязательный:** Да
    -   **Тип:** строка
-   **`checkTabbableOptions`:**
    -   **Обязательный:** Нет
    -   **Тип:** объект с опциями, см. [Опции сравнения/проверки](./method-options#compare-check-options)

#### Вывод:

См. страницу [Вывод теста](./test-output#checkscreenelementfullpagescreen).