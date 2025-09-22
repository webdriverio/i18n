---
id: method-options
title: Опции методов
---

Опции методов — это параметры, которые можно установить для каждого [метода](./methods). Если опция имеет такой же ключ, как опция, установленная при инициализации плагина, то опция метода переопределит значение опции плагина.

:::info ПРИМЕЧАНИЕ

-   Все опции из [Save Options](#save-options) могут использоваться для методов [Compare](#compare-check-options)
-   Все опции сравнения могут использоваться как при инициализации сервиса, __так и__ для каждого отдельного метода проверки. Если опция метода имеет такой же ключ, как опция, установленная при инициализации сервиса, то опция сравнения метода переопределит значение опции сравнения сервиса.
- Все опции могут использоваться для следующих контекстов приложений, если не указано иное:
    - Web
    - Hybrid App
    - Native App
- Приведенные ниже примеры используют методы `save*`, но также могут использоваться с методами `check*`

:::

## Save Options

### `disableBlinkingCursor`

- **Тип:** `boolean`
- **Обязательно:** Нет
- **По умолчанию:** `false`
- **Используется с:** Все [методы](./methods)
- **Поддерживаемые контексты приложений:** Web, Hybrid App (Webview)

Включает/отключает "мигание" курсора во всех `input`, `textarea`, `[contenteditable]` в приложении. Если установлено значение `true`, курсор будет установлен как `transparent` перед снятием скриншота
и сброшен по завершении.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableBlinkingCursor: true
    }
)
```

### `disableCSSAnimation`

- **Тип:** `boolean`
- **Обязательно:** Нет
- **По умолчанию:** `false`
- **Используется с:** Все [методы](./methods)
- **Поддерживаемые контексты приложений:** Web, Hybrid App (Webview)

Включает/отключает все CSS-анимации в приложении. Если установлено значение `true`, все анимации будут отключены перед снятием скриншота
и сброшены по завершении

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableCSSAnimation: true
    }
)
```

### `enableLegacyScreenshotMethod`

- **Тип:** `boolean`
- **Обязательно:** Нет
- **По умолчанию:** `false`
- **Используется с:** Все [методы](./methods)
- **Поддерживаемые контексты приложений:** Web, Hybrid App (Webview)

Используйте эту опцию для возврата к "старому" методу снятия скриншотов на основе протокола W3C-WebDriver. Это может быть полезно, если ваши тесты полагаются на существующие базовые изображения или если вы работаете в средах, которые не полностью поддерживают новые скриншоты на основе BiDi.
Обратите внимание, что включение этой опции может привести к созданию скриншотов с немного другим разрешением или качеством.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLegacyScreenshotMethod: true
    }
)
```

### `enableLayoutTesting`

- **Тип:** `boolean`
- **Обязательно:** Нет
- **По умолчанию:** `false`
- **Используется с:** Все [методы](./methods)
- **Поддерживаемые контексты приложений:** Web, Hybrid App (Webview)

Это скроет весь текст на странице, поэтому для сравнения будет использоваться только макет. Скрытие будет выполнено путем добавления стиля `'color': 'transparent !important'` к __каждому__ элементу.

Для вывода см. [Test Output](./test-output#enablelayouttesting).

:::info
При использовании этого флага каждый элемент, содержащий текст (не только `p, h1, h2, h3, h4, h5, h6, span, a, li`, но и `div|button|..`), получит это свойство. __Нет__ возможности настроить это.
:::

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLayoutTesting: true
    }
)
```

### `hideScrollBars`

- **Тип:** `boolean`
- **Обязательно:** Нет
- **По умолчанию:** `true`
- **Используется с:** Все [методы](./methods)
- **Поддерживаемые контексты приложений:** Web, Hybrid App (Webview)

Скрыть полосы прокрутки в приложении. Если установлено значение true, все полосы прокрутки будут отключены перед снятием скриншота. По умолчанию установлено значение `true` для предотвращения дополнительных проблем.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideScrollBars: false
    }
)
```

### `hideElements`

- **Тип:** `array`
- **Обязательно:** Нет
- **Используется с:** Все [методы](./methods)
- **Поддерживаемые контексты приложений:** Web, Hybrid App (Webview)

Этот метод может скрыть 1 или несколько элементов, добавив к ним свойство `visibility: hidden`, предоставив массив элементов.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideElements: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

### `removeElements`

- **Тип:** `array`
- **Обязательно:** Нет
- **Используется с:** Все [методы](./methods)
- **Поддерживаемые контексты приложений:** Web, Hybrid App (Webview)

Этот метод может _удалить_ 1 или несколько элементов, добавив к ним свойство `display: none`, предоставив массив элементов.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        removeElements: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

### `resizeDimensions`

- **Тип:** `object`
- **Обязательно:** Нет
- **По умолчанию:** `{ top: 0, right: 0, bottom: 0, left: 0}`
- **Используется с:** Только для [`saveElement`](./methods#saveelement) или [`checkElement`](./methods#checkelement)
- **Поддерживаемые контексты приложений:** Web, Hybrid App (Webview), Native App

Объект, который должен содержать количество пикселей `top`, `right`, `bottom` и `left`, на которые нужно увеличить вырезку элемента.

```typescript
await browser.saveElement(
    'sample-tag',
    {
        resizeDimensions: {
            top: 50,
            left: 100,
            right: 10,
            bottom: 90,
        },
    }
)
```

### `userBasedFullPageScreenshot`

- **Тип:** `boolean`
- **Обязательно:** Нет
- **По умолчанию:** `false`
- **Используется с:** Только для [`saveFullPageScreen`](./methods#savefullpagescreen), [`saveTabbablePage`](./methods#savetabbablepage), [`checkFullPageScreen`](./methods#checkfullpagescreen) или [`checkTabbablePage`](./methods#checktabbablepage)
- **Поддерживаемые контексты приложений:** Web, Hybrid App (Webview)

При установке значения `true` эта опция включает **стратегию прокрутки и сшивания** для создания полноэкранных снимков.
Вместо использования встроенных возможностей браузера для создания скриншотов, он вручную прокручивает страницу и сшивает несколько скриншотов вместе.
Этот метод особенно полезен для страниц с **ленивой загрузкой контента** или сложными макетами, требующими прокрутки для полного отображения.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        userBasedFullPageScreenshot: true
    }
)
```

### `fullPageScrollTimeout`

- **Тип:** `number`
- **Обязательно:** Нет
- **По умолчанию:** `1500`
- **Используется с:** Только для [`saveFullPageScreen`](./methods#savefullpagescreen) или [`saveTabbablePage`](./methods#savetabbablepage)
- **Поддерживаемые контексты приложений:** Web, Hybrid App (Webview)

Таймаут в миллисекундах для ожидания после прокрутки. Это может помочь с идентификацией страниц с ленивой загрузкой.

> **ПРИМЕЧАНИЕ:** Это работает только когда `userBasedFullPageScreenshot` установлен в `true`

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        fullPageScrollTimeout: 3 * 1000
    }
)
```

### `hideAfterFirstScroll`

- **Тип:** `array`
- **Обязательно:** Нет
- **Используется с:** Только для [`saveFullPageScreen`](./methods#savefullpagescreen) или [`saveTabbablePage`](./methods#savetabbablepage)
- **Поддерживаемые контексты приложений:** Web, Hybrid App (Webview)

Этот метод скроет один или несколько элементов, добавив к ним свойство `visibility: hidden`, предоставив массив элементов.
Это будет полезно, например, когда на странице есть прилипающие элементы, которые будут прокручиваться вместе со страницей при её прокрутке, но создадут раздражающий эффект при создании полноэкранного снимка

> **ПРИМЕЧАНИЕ:** Это работает только когда `userBasedFullPageScreenshot` установлен в `true`

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        hideAfterFirstScroll: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

### `waitForFontsLoaded`

- **Тип:** `boolean`
- **Обязательно:** Нет
- **По умолчанию:** `true`
- **Используется с:** Все [методы](./methods)
- **Поддерживаемые контексты приложений:** Web, Hybrid App (Webview)

Шрифты, включая шрифты третьих сторон, могут загружаться синхронно или асинхронно. Асинхронная загрузка означает, что шрифты могут загружаться после того, как WebdriverIO определит, что страница полностью загружена. Чтобы предотвратить проблемы с рендерингом шрифтов, этот модуль по умолчанию будет ждать загрузки всех шрифтов перед снятием скриншота.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        waitForFontsLoaded: true
    }
)
```

## Compare (Check) Options

Опции сравнения — это опции, которые влияют на способ выполнения сравнения с помощью [ResembleJS](https://github.com/Huddle/Resemble.js).

### `ignoreAlpha`

- **Тип:** `boolean`
- **По умолчанию:** `false`
- **Обязательно:** Нет
- **Используется с:** Все [методы проверки](./methods#check-methods)
- **Поддерживаемые контексты приложений:** Все

Сравнивать изображения и игнорировать альфа-канал.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAlpha: true
    }
)
```

### `blockOutSideBar`

- **Тип:** `boolean`
- **По умолчанию:** `true`
- **Обязательно:** Нет
- **Используется с:** _Может использоваться только для `checkScreen()`. Это **только для iPad**_
- **Поддерживаемые контексты приложений:** Все

Автоматически блокирует боковую панель для iPad в ландшафтном режиме во время сравнений. Это предотвращает сбои на нативном компоненте вкладок/приватности/закладок.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutSideBar: true
    }
)
```

### `blockOutStatusBar`

- **Тип:** `boolean`
- **По умолчанию:** `true`
- **Обязательно:** Нет
- **Используется с:** _Это **только для мобильных устройств**_
- **Поддерживаемые контексты приложений:** Hybrid (нативная часть) и Native Apps

Автоматически блокирует строку состояния и адресную строку во время сравнений. Это предотвращает сбои из-за времени, Wi-Fi или состояния батареи.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutStatusBar: true
    }
)
```

### `blockOutToolBar`

- **Тип:** `boolean`
- **По умолчанию:** `true`
- **Обязательно:** Нет
- **Используется с:** _Это **только для мобильных устройств**_
- **Поддерживаемые контексты приложений:** Hybrid (нативная часть) и Native Apps

Автоматически блокирует панель инструментов.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutToolBar: true
    }
)
```

### `ignoreAntialiasing`

- **Тип:** `boolean`
- **По умолчанию:** `false`
- **Обязательно:** Нет
- **Используется с:** Все [методы проверки](./methods#check-methods)
- **Поддерживаемые контексты приложений:** Все

Сравнивать изображения и игнорировать сглаживание.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAntialiasing: true
    }
)
```

### `ignoreColors`

- **Тип:** `boolean`
- **По умолчанию:** `false`
- **Обязательно:** Нет
- **Используется с:** Все [методы проверки](./methods#check-methods)
- **Поддерживаемые контексты приложений:** Все

Несмотря на то, что изображения цветные, сравнение будет сравнивать 2 черно-белых изображения

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreColors: true
    }
)
```

### `ignoreLess`

- **Тип:** `boolean`
- **По умолчанию:** `false`
- **Обязательно:** Нет
- **Используется с:** Все [методы проверки](./methods#check-methods)
- **Поддерживаемые контексты приложений:** Все

Сравнивать изображения с параметрами `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreLess: true
    }
)
```

### `ignoreNothing`

- **Тип:** `boolean`
- **По умолчанию:** `false`
- **Обязательно:** Нет
- **Используется с:** Все [методы проверки](./methods#check-methods)
- **Поддерживаемые контексты приложений:** Все

Сравнивать изображения с параметрами `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreNothing: true
    }
)
```

### `rawMisMatchPercentage`

- **Тип:** `boolean`
- **По умолчанию:** `false`
- **Обязательно:** Нет
- **Используется с:** Все [методы проверки](./methods#check-methods)
- **Поддерживаемые контексты приложений:** Все

Если true, возвращаемый процент будет выглядеть как `0.12345678`, по умолчанию `0.12`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        rawMisMatchPercentage: true
    }
)
```

### `returnAllCompareData`

- **Тип:** `boolean`
- **По умолчанию:** `false`
- **Обязательно:** Нет
- **Используется с:** Все [методы проверки](./methods#check-methods)
- **Поддерживаемые контексты приложений:** Все

Это вернет все данные сравнения, не только процент несоответствия, см. также [Console Output](./test-output#console-output-1)

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        returnAllCompareData: true
    }
)
```

### `saveAboveTolerance`

- **Тип:** `number`
- **По умолчанию:** `0`
- **Обязательно:** Нет
- **Используется с:** Все [методы проверки](./methods#check-methods)
- **Поддерживаемые контексты приложений:** Все

Допустимое значение `misMatchPercentage`, которое предотвращает сохранение изображений с различиями

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        saveAboveTolerance: 0.25
    }
)
```

### `largeImageThreshold`

- **Тип:** `number`
- **По умолчанию:** `0`
- **Обязательно:** Нет
- **Используется с:** Все [методы проверки](./methods#check-methods)
- **Поддерживаемые контексты приложений:** Все

Сравнение больших изображений может привести к проблемам с производительностью.
При указании количества пикселей здесь (больше 0), алгоритм сравнения пропускает пиксели, когда ширина или высота изображения превышает `largeImageThreshold` пикселей.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        largeImageThreshold: 1500
    }
)
```

### `scaleImagesToSameSize`

- **Тип:** `boolean`
- **По умолчанию:** `false`
- **Обязательно:** Нет
- **Используется с:** Все [методы проверки](./methods#check-methods)
- **Поддерживаемые контексты приложений:** Все

Масштабирует 2 изображения до одного размера перед выполнением сравнения. Настоятельно рекомендуется включить `ignoreAntialiasing` и `ignoreAlpha`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        scaleImagesToSameSize: true
    }
)
```

### `ignore`

- **Тип:** `array`
- **Обязательно:** Нет
- **Используется с:** Только с методом `checkScreen`, **НЕ** с методом `checkElement`
- **Поддерживаемые контексты приложений:** Native App

Этот метод автоматически блокирует элементы или область на экране на основе массива элементов или объекта `x|y|width|height`.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignore: [
            $('~element-1'),
            await $('~element-2'),
            {
                x: 150,
                y: 250,
                width: 100,
                height: 100,
            }
        ]
    }
)
```

## Folder options

Папка базовой линии и папки скриншотов (актуальные, различия) — это опции, которые можно установить при инициализации плагина или метода. Чтобы установить опции папок для конкретного метода, передайте опции папок в объект опций метода. Это можно использовать для:

- Web
- Hybrid App
- Native App

```ts
import path from 'node:path'

const methodOptions = {
    actualFolder: path.join(process.cwd(), 'customActual'),
    baselineFolder: path.join(process.cwd(), 'customBaseline'),
    diffFolder: path.join(process.cwd(), 'customDiff'),
}

// Вы можете использовать это для всех методов
await expect(
    await browser.checkFullPageScreen("checkFullPage", methodOptions)
).toEqual(0)
```

### `actualFolder`

- **Тип:** `string`
- **Обязательно:** Нет
- **Поддерживаемые контексты приложений:** Все

Папка для снимка, который был сделан в тесте.

### `baselineFolder`

- **Тип:** `string`
- **Обязательно:** Нет
- **Поддерживаемые контексты приложений:** Все

Папка для базового изображения, которое используется для сравнения.

### `diffFolder`

- **Тип:** `string`
- **Обязательно:** Нет
- **Поддерживаемые контексты приложений:** Все

Папка для изображения различий, созданного ResembleJS.