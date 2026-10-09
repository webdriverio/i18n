---
id: service-options
title: Параметры сервиса
description: "Настройка параметров по умолчанию для визуального сервиса, включая захват скриншотов, полностраничные скриншоты, эталонные изображения, папки и отчёты."
---

Параметры сервиса задаются при создании экземпляра сервиса и применяются при каждом вызове метода.

```js
// wdio.conf.(js|ts)
export const config = {
    // ...
    // =====
    // Настройка
    // =====
    services: [
        [
            "visual",
            {
                // Параметры
            },
        ],
    ],
    // ...
};
```

# Параметры по умолчанию

## Захват скриншотов

---

### `hideScrollBars`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

Скрывает полосы прокрутки в приложении. Если установлено значение true, все полосы прокрутки будут отключены перед созданием скриншота. По умолчанию установлено значение `true`, чтобы избежать дополнительных проблем.

</Option>
### `disableBlinkingCursor`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview)">

Включает/отключает «мигание» каретки во всех элементах `input`, `textarea`, `[contenteditable]` в приложении. Если установлено значение `true`, перед созданием скриншота каретка станет `transparent`,
а после завершения будет возвращена в исходное состояние.

</Option>
### `disableCSSAnimation`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview)">

Включает/отключает все CSS-анимации в приложении. Если установлено значение `true`, все анимации будут отключены перед созданием скриншота,
а после завершения будут восстановлены.

</Option>
### `enableLayoutTesting`

<Option type="boolean" default="false" required="No" contexts="Web">

Скрывает весь текст на странице, чтобы для сравнения использовался только макет. Скрытие выполняется путём добавления стиля `'color': 'transparent !important'` к **каждому** элементу.

Пример результата смотрите в разделе [Результаты тестов](/docs/visual-testing/test-output#enablelayouttesting)

:::info
При использовании этого флага каждый элемент, содержащий текст (то есть не только `p, h1, h2, h3, h4, h5, h6, span, a, li`, но и `div|button|..`), получит это свойство. Возможности настроить это поведение **нет**.
:::

</Option>
### `ignoreRegionPadding`

<Option type="number" default="1" required="No" contexts="Web, Hybrid App (Webview)">

Отступ в аппаратных пикселях, добавляемый к каждой стороне игнорируемых областей, в результате чего каждая область становится шире и выше на удвоенное значение. Это помогает избежать различий в 1 px на границах, которые могут возникать на дисплеях с высоким DPR или при использовании протокола скриншотов BiDi. Установите `0`, чтобы отключить.

</Option>
### `waitForFontsLoaded`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

Шрифты, включая сторонние, могут загружаться синхронно или асинхронно. Асинхронная загрузка означает, что шрифты могут загрузиться уже после того, как WebdriverIO определит, что страница полностью загружена. Чтобы избежать проблем с отображением шрифтов, этот модуль по умолчанию ожидает загрузки всех шрифтов перед созданием скриншота.

</Option>
## Полностраничные скриншоты

---

### `userBasedFullPageScreenshot`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview) **Introduced in visual-service@7.0.0">

По умолчанию полностраничные скриншоты в десктопном вебе создаются с помощью протокола WebDriver BiDi, который позволяет делать быстрые, стабильные и согласованные скриншоты без прокрутки.
Если для userBasedFullPageScreenshot установлено значение true, процесс создания скриншота имитирует действия реального пользователя: страница прокручивается, делаются скриншоты размером с область просмотра, которые затем склеиваются. Этот метод полезен для страниц с отложенной загрузкой контента или динамическим рендерингом, зависящим от положения прокрутки.

Используйте этот параметр, если ваша страница загружает контент при прокрутке или если вы хотите сохранить поведение старых методов создания скриншотов.

</Option>
### `fullPageScrollTimeout`

<Option type="number" default="1500" required="No" contexts="Web">

Время ожидания в миллисекундах после прокрутки. Это может помочь в работе со страницами с отложенной загрузкой.

:::info

Работает только в том случае, если параметр сервиса/метода `userBasedFullPageScreenshot` установлен в `true`, см. также [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedfullpagescreenshot)

:::

</Option>
## Мобильные устройства

---

### `isHybridApp`

<Option type="boolean" default="false" required="No" contexts="Hybrid App (Webview)">

Установите значение `true` при тестировании гибридного приложения (нативная оболочка с одним или несколькими встроенными webview). Это изменяет то, как модуль обрабатывает вырезание строки состояния и адресной строки на экранах на основе webview, используя безопасные значения по умолчанию, если нативные данные о прямоугольниках устройства недоступны.

</Option>
### `addIOSBezelCorners`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview), Native App">

Добавляет к скриншоту скруглённые углы рамки и вырез/Dynamic Island для устройств iOS.

:::info ПРИМЕЧАНИЕ
Это возможно только в том случае, если имя устройства **МОЖЕТ** быть определено автоматически и соответствует одному из нормализованных имён устройств из следующего списка. Нормализация выполняется этим модулем.
**iPhone:**

-   iPhone X: `iphonex`
-   iPhone XS: `iphonexs`
-   iPhone XS Max: `iphonexsmax`
-   iPhone XR: `iphonexr`
-   iPhone 11: `iphone11`
-   iPhone 11 Pro: `iphone11pro`
-   iPhone 11 Pro Max: `iphone11promax`
-   iPhone 12: `iphone12`
-   iPhone 12 Mini: `iphone12mini`
-   iPhone 12 Pro: `iphone12pro`
-   iPhone 12 Pro Max: `iphone12promax`
-   iPhone 13: `iphone13`
-   iPhone 13 Mini: `iphone13mini`
-   iPhone 13 Pro: `iphone13pro`
-   iPhone 13 Pro Max: `iphone13promax`
-   iPhone 14: `iphone14`
-   iPhone 14 Plus: `iphone14plus`
-   iPhone 14 Pro: `iphone14pro`
-   iPhone 14 Pro Max: `iphone14promax`
    **iPad:**
-   iPad Mini 6-го поколения: `ipadmini`
-   iPad Air 4-го поколения: `ipadair`
-   iPad Air 5-го поколения: `ipadair`
-   iPad Pro (11 дюймов) 1-го поколения: `ipadpro11`
-   iPad Pro (11 дюймов) 2-го поколения: `ipadpro11`
-   iPad Pro (11 дюймов) 3-го поколения: `ipadpro11`
-   iPad Pro (12,9 дюйма) 3-го поколения: `ipadpro129`
-   iPad Pro (12,9 дюйма) 4-го поколения: `ipadpro129`
-   iPad Pro (12,9 дюйма) 5-го поколения: `ipadpro129`
:::

</Option>
### `addressBarShadowPadding`

<Option type="number" default="6" required="No" contexts="Web">

Отступ, который необходимо добавить к адресной строке на iOS и Android для корректного вырезания области просмотра.

</Option>
### `toolBarShadowPadding`

<Option type="number" default={`6 for Android and \`15\` for iOS (\`6\` by default and \`9\` will be added automatically for the possible home bar on iPhones with a notch or iPads that have a home bar)`} required="No" contexts="Web">

Отступ, который необходимо добавить к панели инструментов на iOS и Android для корректного вырезания области просмотра.

</Option>
## Управление файлами и папками

---

### `baselineFolder`

<Option type="string|()=> string" default=".path/to/testfile/__snapshots__/" required="No" contexts="Web, Hybrid App (Webview), Native App">

Каталог, в котором будут храниться все эталонные изображения, используемые при сравнении. Если параметр не задан, будет использовано значение по умолчанию, при котором файлы сохраняются в папке `__snapshots__/` рядом со спецификацией, выполняющей визуальные тесты. Для задания значения `baselineFolder` также можно использовать функцию, возвращающую `string`:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// ИЛИ
{
    baselineFolder: () => {
        // Здесь происходит какая-то магия
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

</Option>
### `screenshotPath`

<Option type="string | () => string" default=".tmp/" required="no" contexts="Web, Hybrid App (Webview), Native App">

Каталог, в котором будут храниться все фактические скриншоты и скриншоты с различиями. Если параметр не задан, будет использовано значение по умолчанию. Для задания значения screenshotPath также можно использовать функцию,
возвращающую строку:

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// ИЛИ
{
    screenshotPath: () => {
        // Здесь происходит какая-то магия
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

</Option>
### `clearRuntimeFolder`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview), Native App">

Удаляет папку времени выполнения (`actual` и `diff`) при инициализации

:::info ПРИМЕЧАНИЕ
Работает только в том случае, если [`screenshotPath`](#screenshotpath) задан через параметры плагина, и **НЕ БУДЕТ РАБОТАТЬ**, если вы задаёте папки в методах
:::

</Option>
### `savePerInstance`

<Option type="boolean" default="false" required="no" contexts="Web, Hybrid App (Webview), Native App">

Сохраняет изображения для каждого экземпляра в отдельную папку, например все скриншоты Chrome будут сохранены в папку Chrome, такую как `desktop_chrome`.

</Option>
### `formatImageName`

<Option type="string" default={`{tag}-{browserName}-{width}x{height}-dpr-{dpr}`} required="No" contexts="Web, Hybrid App (Webview), Native App">

Имя сохраняемых изображений можно настроить, передав параметр `formatImageName` со строкой формата, например:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

Для форматирования строки можно использовать следующие переменные, которые будут автоматически считаны из capabilities экземпляра.
Если их не удастся определить, будут использованы значения по умолчанию.

-   `browserName`: имя браузера из переданных capabilities
-   `browserVersion`: версия браузера из переданных capabilities
-   `deviceName`: имя устройства из capabilities
-   `dpr`: соотношение пикселей устройства (device pixel ratio)
-   `height`: высота экрана
-   `logName`: logName из capabilities
-   `mobile`: добавляет `_app` или имя браузера после `deviceName`, чтобы отличать скриншоты приложений от скриншотов браузера
-   `platformName`: имя платформы из переданных capabilities
-   `platformVersion`: версия платформы из переданных capabilities
-   `tag`: тег, переданный в вызываемый метод
-   `width`: ширина экрана

:::info

В `formatImageName` нельзя указывать пользовательские пути/папки. Если вы хотите изменить путь, используйте следующие параметры:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- [`folderOptions`](/docs/visual-testing/method-options#folder-options) для каждого метода

:::

</Option>
## Эталонные изображения и сохранение

---

### `autoSaveBaseline`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview), Native App">

Если при сравнении эталонное изображение не найдено, изображение автоматически копируется в папку эталонов.

</Option>
### `autoElementScroll`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

Этот параметр позволяет отключить автоматическую прокрутку элемента в область видимости при создании скриншота элемента.

</Option>
### `alwaysSaveActualImage`

<Option type="boolean" default="true" required="No" contexts="All">

Если установить этот параметр в `false`, то:

- фактическое изображение не будет сохраняться, если различий **нет**
- файл JSON-отчёта не будет сохраняться, если `createJsonReportFiles` установлен в `true`. Также в логах будет выведено предупреждение о том, что `createJsonReportFiles` отключён

Это должно повысить производительность, поскольку файлы не записываются в систему, и избавить папку `actual` от лишнего «шума».

</Option>
## Отчёты

---

### `createJsonReportFiles` **(НОВОЕ)**

<Option type="boolean" default="false" required="No">

Теперь у вас есть возможность экспортировать результаты сравнения в файл JSON-отчёта. При указании параметра `createJsonReportFiles: true` для каждого сравниваемого изображения будет создан отчёт, сохраняемый в папке `actual` рядом с каждым результатом `actual`. Результат будет выглядеть так:

```json
{
    "parent": "check methods",
    "test": "should fail comparing with a baseline",
    "tag": "examplePageFail",
    "instanceData": {
        "browser": {
            "name": "chrome-headless-shell",
            "version": "126.0.6478.183"
        },
        "platform": {
            "name": "mac",
            "version": "not-known"
        }
    },
    "commandName": "checkScreen",
    "boundingBoxes": {
        "diffBoundingBoxes": [
            {
                "left": 1088,
                "top": 717,
                "right": 1186,
                "bottom": 730
            }
            //....
        ],
        "ignoredBoxes": [
            {
                "left": 159,
                "top": 652,
                "right": 356,
                "bottom": 703
            }
            //...
        ]
    },
    "fileData": {
        "actualFilePath": "/Users/wdio/visual-testing/.tmp/actual/desktop_chrome-headless-shellexamplePageFail-local-chrome-latest-1366x768.png",
        "baselineFilePath": "/Users/wdio/visual-testing/localBaseline/desktop_chrome-headless-shellexamplePageFail-local-chrome-latest-1366x768.png",
        "diffFilePath": "/Users/wdio/visual-testing/.tmp/diff/desktop_chrome-headless-shell/examplePageFail-local-chrome-latest-1366x768png",
        "fileName": "examplePageFail-local-chrome-latest-1366x768.png",
        "size": {
            "actual": {
                "height": 768,
                "width": 1366
            },
            "baseline": {
                "height": 768,
                "width": 1366
            },
            "diff": {
                "height": 768,
                "width": 1366
            }
        }
    },
    "misMatchPercentage": "12.90",
    "rawMisMatchPercentage": 12.900729014153246
}
```

После выполнения всех тестов будет сгенерирован новый JSON-файл со сводкой всех сравнений, который можно найти в корне папки `actual`. Данные группируются по:

-   `describe` для Jasmine/Mocha или `Feature` для CucumberJS
-   `it` для Jasmine/Mocha или `Scenario` для CucumberJS
    а затем сортируются по:
-   `commandName` — именам методов сравнения, использованных для сравнения изображений
-   `instanceData` — сначала браузер, затем устройство, затем платформа
    это будет выглядеть так

```json
[
    {
        "description": "check methods",
        "data": [
            {
                "test": "should fail comparing with a baseline",
                "data": [
                    {
                        "tag": "examplePageFail",
                        "instanceData": {},
                        "commandName": "checkScreen",
                        "framework": "mocha",
                        "boundingBoxes": {
                            "diffBoundingBoxes": [],
                            "ignoredBoxes": []
                        },
                        "fileData": {},
                        "misMatchPercentage": "14.34",
                        "rawMisMatchPercentage": 14.335403703025868
                    },
                    {
                        "tag": "exampleElementFail",
                        "instanceData": {},
                        "commandName": "checkElement",
                        "framework": "mocha",
                        "boundingBoxes": {
                            "diffBoundingBoxes": [],
                            "ignoredBoxes": []
                        },
                        "fileData": {},
                        "misMatchPercentage": "1.34",
                        "rawMisMatchPercentage": 1.335403703025868
                    }
                ]
            }
        ]
    }
]
```

Данные отчёта дают возможность создать собственный визуальный отчёт, не выполняя всю «магию» и сбор данных самостоятельно.

:::info ПРИМЕЧАНИЕ
Необходимо использовать `@wdio/visual-testing` версии `5.2.0` или выше
:::

</Option>
### `diffPixelBoundingBoxProximity`

<Option type="number" default="5" required="No" contexts="Web, Hybrid App (Webview), Native App">

Близость пикселей, используемая для группировки пикселей различий в JSON-отчёте, создаваемом с помощью [`createJsonReportFiles`](#createjsonreportfiles). Более высокие значения объединяют больше пикселей в меньшее количество ограничивающих прямоугольников; более низкие значения дают более точные, но более многочисленные прямоугольники.

</Option>
## Общие

---

### `logLevel`

<Option type="string" default="info" required="No" contexts="Web, Hybrid App (Webview), Native App">

Добавляет дополнительные логи, возможные значения: `debug | info | warn | silent`

Ошибки всегда выводятся в консоль.

</Option>
## Параметры Tabbable

:::info ПРИМЕЧАНИЕ

Этот модуль также поддерживает отрисовку того, как пользователь перемещается по сайту с помощью клавиши _Tab_ на клавиатуре, рисуя линии и точки от одного доступного для табуляции элемента к другому.<br/>
Эта работа вдохновлена постом в блоге [Viv Richards](https://github.com/vivrichards600) ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).<br/>
Выбор элементов, доступных для табуляции, основан на модуле [tabbable](https://github.com/davidtheclark/tabbable). Если возникнут проблемы, связанные с табуляцией, ознакомьтесь с [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) и особенно с [разделом More details](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

### `tabbableOptions`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Параметры линий и точек, которые можно изменить при использовании методов `{save|check}Tabbable`. Параметры описаны ниже.

</Option>
#### `tabbableOptions.circle`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Параметры для изменения круга.

</Option>
##### `tabbableOptions.circle.backgroundColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Цвет фона круга.

</Option>
##### `tabbableOptions.circle.borderColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Цвет границы круга.

</Option>
##### `tabbableOptions.circle.borderWidth`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Ширина границы круга.

</Option>
##### `tabbableOptions.circle.fontColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Цвет шрифта текста в круге. Отображается, только если [`showNumber`](./#tabbableoptionscircleshownumber) установлен в `true`.

</Option>
##### `tabbableOptions.circle.fontFamily`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Семейство шрифта текста в круге. Отображается, только если [`showNumber`](./#tabbableoptionscircleshownumber) установлен в `true`.

Убедитесь, что указанные шрифты поддерживаются браузерами.

</Option>
##### `tabbableOptions.circle.fontSize`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Размер шрифта текста в круге. Отображается, только если [`showNumber`](./#tabbableoptionscircleshownumber) установлен в `true`.

</Option>
##### `tabbableOptions.circle.size`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Размер круга.

</Option>
##### `tabbableOptions.circle.showNumber`

<Option type="showNumber" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Показывает порядковый номер табуляции в круге.

</Option>
#### `tabbableOptions.line`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Параметры для изменения линии.

</Option>
##### `tabbableOptions.line.color`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Цвет линии.

</Option>
##### `tabbableOptions.line.width`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Ширина линии.

</Option>
## Параметры сравнения

### `compareOptions`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) for all default values" required="No" contexts="Web, Hybrid App (Webview), Native App (See [Method Compare options](./method-options#compare-check-options) for more information)">

Параметры сравнения также можно задать как параметры сервиса, они описаны в разделе [Параметры сравнения методов](/docs/visual-testing/method-options#compare-check-options)

</Option>