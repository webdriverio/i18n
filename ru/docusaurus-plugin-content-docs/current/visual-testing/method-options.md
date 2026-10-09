---
id: method-options
title: Параметры методов
description: "Задавайте для каждого метода визуального тестирования собственные параметры сохранения, сравнения и папок, которые переопределяют параметры уровня сервиса."
---

Параметры методов — это параметры, которые можно задать для каждого [метода](./methods) отдельно. Если параметр имеет тот же ключ, что и параметр, заданный при создании экземпляра плагина, то параметр метода переопределит значение параметра плагина.

:::info ПРИМЕЧАНИЕ

-   Все параметры из раздела [Параметры сохранения](#save-options) можно использовать для методов [сравнения](#compare-check-options)
-   Все параметры сравнения можно использовать при создании экземпляра сервиса __или__ для каждого отдельного метода проверки. Если параметр метода имеет тот же ключ, что и параметр, заданный при создании экземпляра сервиса, то параметр сравнения метода переопределит значение параметра сравнения сервиса.
- Все параметры можно использовать в следующих контекстах приложений, если не указано иное:
    - Веб
    - Гибридное приложение
    - Нативное приложение
- Приведённые ниже примеры используют методы `save*`, но их также можно использовать с методами `check*`

:::

# Параметры сохранения

## Отображение и рендеринг

---

### `hideScrollBars`

<Option type="boolean" default="true" required="No">

- **Используется с:** Всеми [методами](./methods)
- **Поддерживаемые контексты приложений:** Веб, гибридное приложение (Webview)

Скрывает полосы прокрутки в приложении. Если установлено значение true, все полосы прокрутки будут отключены перед созданием скриншота. По умолчанию установлено значение `true`, чтобы избежать дополнительных проблем.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideScrollBars: false
    }
)
```

</Option>
### `disableBlinkingCursor`

<Option type="boolean" default="false" required="No">

- **Используется с:** Всеми [методами](./methods)
- **Поддерживаемые контексты приложений:** Веб, гибридное приложение (Webview)

Включает/отключает «мигание» каретки во всех элементах `input`, `textarea`, `[contenteditable]` в приложении. Если установлено значение `true`, каретка будет сделана `transparent` перед созданием скриншота
и восстановлена после его завершения.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableBlinkingCursor: true
    }
)
```

</Option>
### `disableCSSAnimation`

<Option type="boolean" default="false" required="No">

- **Используется с:** Всеми [методами](./methods)
- **Поддерживаемые контексты приложений:** Веб, гибридное приложение (Webview)

Включает/отключает все CSS-анимации в приложении. Если установлено значение `true`, все анимации будут отключены перед созданием скриншота
и восстановлены после его завершения

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableCSSAnimation: true
    }
)
```

</Option>
### `enableLayoutTesting`

<Option type="boolean" default="false" required="No">

- **Используется с:** Всеми [методами](./methods)
- **Поддерживаемые контексты приложений:** Веб, гибридное приложение (Webview)

Скрывает весь текст на странице, чтобы для сравнения использовался только макет. Скрытие выполняется путём добавления стиля `'color': 'transparent !important'` к __каждому__ элементу.

Пример результата см. в разделе [Результаты тестов](./test-output#enablelayouttesting).

:::info
При использовании этого флага каждый элемент, содержащий текст (то есть не только `p, h1, h2, h3, h4, h5, h6, span, a, li`, но и `div|button|..`), получит это свойство. Возможности настроить это поведение __нет__.
:::

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLayoutTesting: true
    }
)
```

</Option>
### `enableLegacyScreenshotMethod`

<Option type="boolean" default="false" required="No">

- **Используется с:** Всеми [методами](./methods)
- **Поддерживаемые контексты приложений:** Веб, гибридное приложение (Webview)

Используйте этот параметр, чтобы вернуться к «старому» методу создания скриншотов на основе протокола W3C-WebDriver. Это может быть полезно, если ваши тесты зависят от существующих эталонных изображений или если вы работаете в средах, которые не полностью поддерживают новые скриншоты на основе BiDi.
Обратите внимание, что включение этого параметра может привести к созданию скриншотов с немного отличающимся разрешением или качеством.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLegacyScreenshotMethod: true
    }
)
```

</Option>
### `ignoreRegionPadding`

<Option type="number" default="1" required="No">

- **Используется с:** Всеми [методами](./methods)
- **Поддерживаемые контексты приложений:** Веб, гибридное приложение (Webview)

Отступ в пикселях устройства, добавляемый с каждой стороны игнорируемых областей, в результате чего каждая область становится шире и выше на удвоенное значение. Это помогает избежать различий на границах в 1 px, которые могут появляться на дисплеях с высоким DPR или при использовании протокола скриншотов BiDi. Установите `0`, чтобы отключить.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        ignoreRegionPadding: 0
    }
)
```

</Option>
### `waitForFontsLoaded`

<Option type="boolean" default="true" required="No">

- **Используется с:** Всеми [методами](./methods)
- **Поддерживаемые контексты приложений:** Веб, гибридное приложение (Webview)

Шрифты, включая сторонние, могут загружаться синхронно или асинхронно. Асинхронная загрузка означает, что шрифты могут загрузиться после того, как WebdriverIO определит, что страница полностью загружена. Чтобы избежать проблем с отображением шрифтов, этот модуль по умолчанию ожидает загрузки всех шрифтов перед созданием скриншота.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        waitForFontsLoaded: true
    }
)
```

</Option>
## Видимость элементов

---

### `hideElements`

<Option type="array" required="No">

- **Используется с:** Всеми [методами](./methods)
- **Поддерживаемые контексты приложений:** Веб, гибридное приложение (Webview)

Этот метод может скрыть один или несколько элементов, добавляя к ним свойство `visibility: hidden`, если передать массив элементов.

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

</Option>
### `removeElements`

<Option type="array" required="No">

- **Используется с:** Всеми [методами](./methods)
- **Поддерживаемые контексты приложений:** Веб, гибридное приложение (Webview)

Этот метод может _удалить_ один или несколько элементов, добавляя к ним свойство `display: none`, если передать массив элементов.

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

</Option>
## Параметры для элементов

---

### `resizeDimensions`

<Option type="object" default={`{ top: 0, right: 0, bottom: 0, left: 0}`} required="No">

- **Используется с:** Только с [`saveElement`](./methods#saveelement) или [`checkElement`](./methods#checkelement)
- **Поддерживаемые контексты приложений:** Веб, гибридное приложение (Webview), нативное приложение

Объект, который должен содержать количество пикселей `top`, `right`, `bottom` и `left`, на которое нужно увеличить вырезаемую область элемента.

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

</Option>
### `biDiOrigin`

<Option type="'document' | 'viewport'" default="'document'" required="No">

- **Используется с:** Только с [`saveElement`](./methods#saveelement) или [`checkElement`](./methods#checkelement)
- **Поддерживаемые контексты приложений:** Веб, гибридное приложение (Webview)

Параметр, доступный только для BiDi, который определяет, какое начало координат используется при создании скриншотов элементов через протокол WebDriver BiDi.

- `'document'` _(по умолчанию)_: рендерит макет документа. Работает при любом положении элемента, но **не** захватывает композитные слои (например, полосы прокрутки, фиксированные/липкие оверлеи, элементы с `will-change`).
- `'viewport'`: захватывает композитный кадр в том виде, в котором он отрисован, включая полосы прокрутки и оверлеи. Требует, чтобы элемент был **полностью видим** в области просмотра; выбрасывает понятную ошибку, если элемент находится за пределами области просмотра или больше неё.

```typescript
await browser.saveElement(
    await $('#my-element'),
    'sample-tag',
    {
        biDiOrigin: 'viewport'
    }
)
```

</Option>
## Параметры для полностраничных скриншотов

---

### `userBasedFullPageScreenshot`

<Option type="boolean" default="false" required="No">

- **Используется с:** Только с [`saveFullPageScreen`](./methods#savefullpagescreen), [`saveTabbablePage`](./methods#savetabbablepage), [`checkFullPageScreen`](./methods#checkfullpagescreen) или [`checkTabbablePage`](./methods#checktabbablepage)
- **Поддерживаемые контексты приложений:** Веб, гибридное приложение (Webview)

Если установлено значение `true`, этот параметр включает **стратегию прокрутки и склейки** для создания полностраничных скриншотов.
Вместо использования встроенных возможностей браузера для создания скриншотов страница прокручивается вручную, а несколько скриншотов склеиваются вместе.
Этот метод особенно полезен для страниц с **лениво загружаемым контентом** или сложными макетами, которым для полного отображения требуется прокрутка.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        userBasedFullPageScreenshot: true
    }
)
```

</Option>
### `fullPageScrollTimeout`

<Option type="number" default="1500" required="No">

- **Используется с:** Только с [`saveFullPageScreen`](./methods#savefullpagescreen) или [`saveTabbablePage`](./methods#savetabbablepage)
- **Поддерживаемые контексты приложений:** Веб, гибридное приложение (Webview)

Время ожидания в миллисекундах после прокрутки. Это может помочь при работе со страницами с ленивой загрузкой.

> **ПРИМЕЧАНИЕ:** Работает, только если `userBasedFullPageScreenshot` установлен в `true`

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        fullPageScrollTimeout: 3 * 1000
    }
)
```

</Option>
### `hideAfterFirstScroll`

<Option type="array" required="No">

- **Используется с:** Только с [`saveFullPageScreen`](./methods#savefullpagescreen) или [`saveTabbablePage`](./methods#savetabbablepage)
- **Поддерживаемые контексты приложений:** Веб, гибридное приложение (Webview)

Этот метод скроет один или несколько элементов, добавляя к ним свойство `visibility: hidden`, если передать массив элементов.
Это удобно, например, когда на странице есть липкие элементы, которые перемещаются вместе со страницей при её прокрутке, но создают раздражающий эффект при создании полностраничного скриншота

> **ПРИМЕЧАНИЕ:** Работает, только если `userBasedFullPageScreenshot` установлен в `true`

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

# Параметры сравнения (проверки)

Параметры сравнения — это параметры, которые влияют на то, как выполняется сравнение.

</Option>
## Визуальная чувствительность

---

:::info История версий для параметров `ignore*`
Поведение этих пресетов изменилось один раз — как критическое изменение, — когда движок сравнения был заменён с ResembleJS (v9 и ниже) на Pixelmatch (v10 и выше). Подробности см. в [таблице истории версий](./compare-options#visual-sensitivity) на странице «Параметры сравнения». Все изменения начиная с v10.0.0 отмечены пометкой «Начиная с» у соответствующего параметра ниже.
:::

**Порядок «побеждает последний»:** если одновременно включено несколько флагов `ignore*`, применяется только один пресет в следующем порядке (побеждает более поздний): `ignoreAlpha` → `ignoreAntialiasing` → `ignoreColors` → `ignoreLess` → `ignoreNothing`. Начиная с `v10.1.0` в лог выводится предупреждение с указанием победившего пресета.

### `ignoreColors`

<Option type="boolean" default="false" required="No">

- **Используется с:** Всеми [методами проверки](./methods#check-methods)
- **Поддерживаемые контексты приложений:** Все
- **Начиная с:** `v10.1.0`: сравнение только по яркости с использованием весов яркости resemble (`0.3/0.59/0.11`).

Сравнивает только яркость (веса яркости resemble `0.3/0.59/0.11`), игнорируя различия в оттенке/цвете. Используйте этот параметр, когда ожидается, что сам цвет может меняться, но вы всё равно хотите отлавливать изменения макета или яркости.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreColors: true
    }
)
```

</Option>
### `ignoreAlpha`

<Option type="boolean" default="false" required="No">

- **Используется с:** Всеми [методами проверки](./methods#check-methods)
- **Поддерживаемые контексты приложений:** Все
- **Начиная с:** `v10.1.0`: применяет собственное правило порога/AA независимо от других флагов `ignore*`.

Сравнивает изображения, отбрасывая различия в альфа-канале. Используйте этот параметр, когда рендеринг прозрачности/непрозрачности нестабилен, но цвета пикселей под ним важны.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAlpha: true
    }
)
```

</Option>
### `ignoreAntialiasing`

<Option type="boolean" default="true" required="No">

- **Используется с:** Всеми [методами проверки](./methods#check-methods)
- **Поддерживаемые контексты приложений:** Все
- **Начиная с:** `v10`: значение по умолчанию изменено на `true` (было `false` в v9 и ниже).

Прощает сглаженные пиксели при сравнении. Установите `false` для строгого сравнения, при котором сглаженные пиксели должны считаться несовпадениями. Это решает самую распространённую причину нестабильности визуальных тестов: края текста/фигур отрисовываются с немного разным сглаживанием на разных машинах, хотя ничего не изменилось.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAntialiasing: true
    }
)
```

</Option>
### `ignoreLess`

<Option type="boolean" default="false" required="No">

- **Используется с:** Всеми [методами проверки](./methods#check-methods)
- **Поддерживаемые контексты приложений:** Все
- **Начиная с:** `v10.1.0`: применяет собственное правило порога/AA независимо от других флагов `ignore*`.

Сравнивает изображения с ослабленным допуском RGB (~16/255 на канал в пространстве YIQ). Сглаживание не прощается. Используйте этот параметр, чтобы получить небольшой запас на шум рендеринга (артефакты сжатия, округление цветов), не прощая при этом сглаживание.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreLess: true
    }
)
```

</Option>
### `ignoreNothing`

<Option type="boolean" default="false" required="No">

- **Используется с:** Всеми [методами проверки](./methods#check-methods)
- **Поддерживаемые контексты приложений:** Все
- **Начиная с:** `v10.1.0`: применяет собственное правило порога/AA независимо от других флагов `ignore*`.

Использует нулевой допуск: любое различие пикселей считается несовпадением, включая сглаживание. Используйте этот параметр, когда нужно попиксельное доказательство того, что ничего не изменилось.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreNothing: true
    }
)
```

</Option>
### `pixelmatch`

<Option type="object" default="undefined" required="No">

- **Используется с:** Всеми [методами проверки](./methods#check-methods)
- **Поддерживаемые контексты приложений:** Все
- **Добавлено в:** `v10.1.0`

Переопределяет режим сравнения для одного вызова `check*` с помощью прямых настроек [pixelmatch](https://github.com/mapbox/pixelmatch) (`threshold`, `includeAA`, `diffColor`, `aaColor`, `diffColorAlt`, `alpha`, `diffMask`, `checkerboard`) вместо пресета `ignore*`. Используйте этот параметр, когда пресеты слишком грубы для конкретного теста, например, если ему нужно собственное значение порога или цвет различий, который действительно выделяется в вашем отчёте. Полный справочник полей и описание того, какую проблему решает каждое из них, см. в разделе [Прямое управление pixelmatch](./compare-options#direct-pixelmatch-control).

Не может сочетаться с параметрами `ignore*` в одном и том же объекте параметров вызова: это приводит к выбрасыванию `CompareOptionsConflictError`. Однако он может переопределить конфигурацию сервиса, использующую пресеты `ignore*` (и наоборот); при переключении режима сравнения таким образом в вызове метода в лог выводится предупреждение.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        pixelmatch: { threshold: 0.05 }
    }
)
```

</Option>
### `scaleImagesToSameSize`

<Option type="boolean" default="false" required="No">

- **Используется с:** Всеми [методами проверки](./methods#check-methods)
- **Поддерживаемые контексты приложений:** Все

Масштабирует 2 изображения до одинакового размера перед выполнением сравнения. Настоятельно рекомендуется включить `ignoreAntialiasing` и `ignoreAlpha`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        scaleImagesToSameSize: true
    }
)
```

</Option>
## Блокировка областей на мобильных устройствах

---

### `blockOutStatusBar`

<Option type="boolean" default="true" required="No">

- **Используется с:** _Только для **мобильных устройств**_
- **Поддерживаемые контексты приложений:** Гибридные (нативная часть) и нативные приложения

Автоматически блокирует строку состояния и адресную строку при сравнении. Это предотвращает сбои из-за времени, состояния Wi-Fi или батареи.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutStatusBar: true
    }
)
```

</Option>
### `blockOutToolBar`

<Option type="boolean" default="true" required="No">

- **Используется с:** _Только для **мобильных устройств**_
- **Поддерживаемые контексты приложений:** Гибридные (нативная часть) и нативные приложения

Автоматически блокирует панель инструментов.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutToolBar: true
    }
)
```

</Option>
### `blockOutSideBar`

<Option type="boolean" default="true" required="No">

- **Используется с:** _Может использоваться только с `checkScreen()`. Только для **iPad**_
- **Поддерживаемые контексты приложений:** Все

Автоматически блокирует боковую панель на iPad в альбомной ориентации при сравнении. Это предотвращает сбои из-за нативного компонента вкладок/приватного режима/закладок.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutSideBar: true
    }
)
```

</Option>
## Работа с областями

---

### `blockOut`

<Option type="array" required="No">

- **Используется с:** Всеми [методами проверки](./methods#check-methods)
- **Поддерживаемые контексты приложений:** Все

Массив прямоугольных областей, которые нужно заблокировать перед сравнением. Каждый элемент должен быть объектом со значениями `x`, `y`, `width` и `height` (в пикселях). Заблокированные области закрашиваются до вычисления различий, поэтому они не влияют на процент несовпадения.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOut: [
            { x: 0, y: 0, width: 100, height: 50 },
            { x: 300, y: 200, width: 80, height: 80 },
        ]
    }
)
```

</Option>
### `ignore`

<Option type="array" required="No">

- **Используется с:** Только с методом `checkScreen`, **НЕ** с методом `checkElement`
- **Поддерживаемые контексты приложений:** Нативное приложение

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

</Option>
## Результаты и отчёты

---

### `rawMisMatchPercentage`

<Option type="boolean" default="false" required="No">

- **Используется с:** Всеми [методами проверки](./methods#check-methods)
- **Поддерживаемые контексты приложений:** Все

Если установлено значение true, возвращаемый процент будет иметь вид `0.12345678`, по умолчанию — `0.12`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        rawMisMatchPercentage: true
    }
)
```

</Option>
### `returnAllCompareData`

<Option type="boolean" default="false" required="No">

- **Используется с:** Всеми [методами проверки](./methods#check-methods)
- **Поддерживаемые контексты приложений:** Все

Возвращает все данные сравнения, а не только процент несовпадения, см. также [Вывод в консоль](./test-output#console-output-1)

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        returnAllCompareData: true
    }
)
```

</Option>
### `saveAboveTolerance`

<Option type="number" default="0" required="No">

- **Используется с:** Всеми [методами проверки](./methods#check-methods)
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

</Option>
### `diffPixelBoundingBoxProximity`

<Option type="number" default="5" required="No">

- **Используется с:** Всеми [методами проверки](./methods#check-methods)
- **Поддерживаемые контексты приложений:** Все

Близость пикселей, используемая для группировки пикселей различий в JSON-отчётах. Более высокие значения объединяют больше пикселей в меньшее количество ограничивающих рамок; более низкие значения дают более точные, но более многочисленные рамки. Имеет значение, только если включён параметр [`createJsonReportFiles`](/docs/visual-testing/service-options#createjsonreportfiles).

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        diffPixelBoundingBoxProximity: 10
    }
)
```

# Параметры папок

---

Папка эталонных изображений и папки скриншотов (actual, diff) — это параметры, которые можно задать при создании экземпляра плагина или для метода. Чтобы задать параметры папок для конкретного метода, передайте их в объект параметров метода. Это можно использовать для:

- Веб
- Гибридное приложение
- Нативное приложение

```ts
import path from 'node:path'

const methodOptions = {
    actualFolder: path.join(process.cwd(), 'customActual'),
    baselineFolder: path.join(process.cwd(), 'customBaseline'),
    diffFolder: path.join(process.cwd(), 'customDiff'),
}

// Это можно использовать для всех методов
await expect(
    await browser.checkFullPageScreen("checkFullPage", methodOptions)
).toEqual(0)
```

</Option>
### `actualFolder`

<Option type="string" required="No" contexts="All">

Папка для снимка, сделанного в тесте.

</Option>
### `baselineFolder`

<Option type="string" required="No" contexts="All">

Папка для эталонного изображения, с которым выполняется сравнение.

</Option>
### `diffFolder`

<Option type="string" required="No" contexts="All">

Папка для изображения различий, сформированного при сравнении.

</Option>