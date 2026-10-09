---
id: methods
title: Методы
description: "Используйте методы save и check визуального сервиса для создания скриншотов и сравнения экранов, элементов и полных страниц с эталонными изображениями."
---

Следующие методы добавляются к глобальному объекту WebdriverIO [`browser`](/docs/api/browser).

## Методы сохранения

:::info СОВЕТ
Используйте методы сохранения только тогда, когда вы **не** хотите сравнивать экраны, а хотите лишь получить скриншот элемента или экрана.
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

- Десктопные браузеры
- Мобильные браузеры
- Мобильные гибридные приложения
- Мобильные нативные приложения

#### Параметры

-   **`element`:**
    -   **Обязательный:** Да
    -   **Тип:** WebdriverIO Element
-   **`tag`:**
    -   **Обязательный:** Да
    -   **Тип:** string
-   **`saveElementOptions`:**
    -   **Обязательный:** Нет
    -   **Тип:** объект опций, см. [Опции сохранения](./method-options#save-options)

#### Результат:

См. страницу [Результаты тестов](./test-output#savescreenelementfullpagescreen).

### `saveScreen`

Сохраняет изображение области просмотра (viewport).

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

- Десктопные браузеры
- Мобильные браузеры
- Мобильные гибридные приложения
- Мобильные нативные приложения

#### Параметры
-   **`tag`:**
    -   **Обязательный:** Да
    -   **Тип:** string
-   **`saveScreenOptions`:**
    -   **Обязательный:** Нет
    -   **Тип:** объект опций, см. [Опции сохранения](./method-options#save-options)

#### Результат:

См. страницу [Результаты тестов](./test-output#savescreenelementfullpagescreen).

### `saveFullPageScreen`

#### Использование

Сохраняет изображение всего экрана.

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

- Десктопные браузеры
- Мобильные браузеры

#### Параметры
-   **`tag`:**
    -   **Обязательный:** Да
    -   **Тип:** string
-   **`saveFullPageScreenOptions`:**
    -   **Обязательный:** Нет
    -   **Тип:** объект опций, см. [Опции сохранения](./method-options#save-options)

#### Результат:

См. страницу [Результаты тестов](./test-output#savescreenelementfullpagescreen).

### `saveTabbablePage`

Сохраняет изображение всего экрана с линиями и точками, отображающими порядок перехода по клавише Tab.

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

- Десктопные браузеры

#### Параметры
-   **`tag`:**
    -   **Обязательный:** Да
    -   **Тип:** string
-   **`saveTabbableOptions`:**
    -   **Обязательный:** Нет
    -   **Тип:** объект опций, см. [Опции сохранения](./method-options#save-options)

#### Результат:

См. страницу [Результаты тестов](./test-output#savescreenelementfullpagescreen).

## Методы проверки

:::info СОВЕТ
При первом использовании методов `check` вы увидите в логах приведённое ниже предупреждение. Это означает, что вам не нужно комбинировать методы `save` и `check`, если вы хотите создать эталонное изображение.

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

Сравнивает изображение элемента с эталонным изображением.

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

- Десктопные браузеры
- Мобильные браузеры
- Мобильные гибридные приложения
- Мобильные нативные приложения

#### Параметры
-   **`element`:**
    -   **Обязательный:** Да
    -   **Тип:** WebdriverIO Element
-   **`tag`:**
    -   **Обязательный:** Да
    -   **Тип:** string
-   **`checkElementOptions`:**
    -   **Обязательный:** Нет
    -   **Тип:** объект опций, см. [Опции сравнения/проверки](./method-options#compare-check-options)

#### Результат:

См. страницу [Результаты тестов](./test-output#checkscreenelementfullpagescreen).

### `checkScreen`

Сравнивает изображение области просмотра (viewport) с эталонным изображением.

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

- Десктопные браузеры
- Мобильные браузеры
- Мобильные гибридные приложения
- Мобильные нативные приложения

#### Параметры
-   **`tag`:**
    -   **Обязательный:** Да
    -   **Тип:** string
-   **`checkScreenOptions`:**
    -   **Обязательный:** Нет
    -   **Тип:** объект опций, см. [Опции сравнения/проверки](./method-options#compare-check-options)

#### Результат:

См. страницу [Результаты тестов](./test-output#checkscreenelementfullpagescreen).

### `checkFullPageScreen`

Сравнивает изображение всего экрана с эталонным изображением.

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

- Десктопные браузеры
- Мобильные браузеры

#### Параметры
-   **`tag`:**
    -   **Обязательный:** Да
    -   **Тип:** string
-   **`checkFullPageOptions`:**
    -   **Обязательный:** Нет
    -   **Тип:** объект опций, см. [Опции сравнения/проверки](./method-options#compare-check-options)

#### Результат:

См. страницу [Результаты тестов](./test-output#checkscreenelementfullpagescreen).

### `checkTabbablePage`

Сравнивает изображение всего экрана с линиями и точками, отображающими порядок перехода по клавише Tab, с эталонным изображением.

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

- Десктопные браузеры

#### Параметры
-   **`tag`:**
    -   **Обязательный:** Да
    -   **Тип:** string
-   **`checkTabbableOptions`:**
    -   **Обязательный:** Нет
    -   **Тип:** объект опций, см. [Опции сравнения/проверки](./method-options#compare-check-options)

#### Результат:

См. страницу [Результаты тестов](./test-output#checkscreenelementfullpagescreen).