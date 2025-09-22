---
id: service-options
title: Параметры сервиса
---

Параметры сервиса - это опции, которые можно установить при создании экземпляра сервиса и которые будут использоваться для каждого вызова метода.

```js
// wdio.conf.(js|ts)
export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // The options
            },
        ],
    ],
    // ...
};
```

## Параметры по умолчанию

### `addressBarShadowPadding`

-   **Тип:** `number`
-   **Обязательный:** Нет
-   **По умолчанию:** `6`
-   **Поддерживаемые контексты приложения:** Web

Отступ, который необходимо добавить к адресной строке на iOS и Android для правильного обрезания области просмотра.

### `autoElementScroll`

-   **Тип:** `boolean`
-   **Обязательный:** Нет
-   **По умолчанию:** `true`
-   **Поддерживаемые контексты приложения:** Web, Hybrid App (Webview)

Этот параметр позволяет отключить автоматическую прокрутку элемента в поле зрения при создании снимка экрана элемента.

### `addIOSBezelCorners`

-   **Тип:** `boolean`
-   **Обязательный:** Нет
-   **По умолчанию:** `false`
-   **Поддерживаемые контексты приложения:** Web, Hybrid App (Webview), Native App

Добавить закругленные углы рамки и вырез/динамический остров к скриншоту для устройств iOS.

:::info ПРИМЕЧАНИЕ
Это можно сделать только когда имя устройства **МОЖЕТ** быть автоматически определено и соответствует следующему списку нормализованных имен устройств. Нормализация будет выполнена этим модулем.
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
    **iPads:**
-   iPad Mini 6th Generation: `ipadmini`
-   iPad Air 4th Generation: `ipadair`
-   iPad Air 5th Generation: `ipadair`
-   iPad Pro (11-inch) 1st Generation: `ipadpro11`
-   iPad Pro (11-inch) 2nd Generation: `ipadpro11`
-   iPad Pro (11-inch) 3rd Generation: `ipadpro11`
-   iPad Pro (12.9-inch) 3rd Generation: `ipadpro129`
-   iPad Pro (12.9-inch) 4th Generation: `ipadpro129`
-   iPad Pro (12.9-inch) 5th Generation: `ipadpro129`

:::

### `autoSaveBaseline`

-   **Тип:** `boolean`
-   **Обязательный:** Нет
-   **По умолчанию:** `true`
-   **Поддерживаемые контексты приложения:** Web, Hybrid App (Webview), Native App

Если во время сравнения не найдено базовое изображение, оно автоматически копируется в папку с базовыми изображениями.

### `baselineFolder`

-   **Тип:** `string|()=> string`
-   **Обязательный:** Нет
-   **По умолчанию:** `.path/to/testfile/__snapshots__/`
-   **Поддерживаемые контексты приложения:** Web, Hybrid App (Webview), Native App

Директория, которая будет содержать все базовые изображения, используемые при сравнении. Если не установлено, будет использоваться значение по умолчанию, которое будет хранить файлы в папке `__snapshots__/` рядом со спецификацией, выполняющей визуальные тесты. Функция, возвращающая `string`, также может использоваться для установки значения `baselineFolder`:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// ИЛИ
{
    baselineFolder: () => {
        // Делаем здесь какую-то магию
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **Тип:** `boolean`
-   **Обязательный:** Нет
-   **По умолчанию:** `false`
-   **Поддерживаемые контексты приложения:** Web, Hybrid App (Webview), Native App

Удалить папку времени выполнения (`actual` и `diff`) при инициализации

:::info ПРИМЕЧАНИЕ
Это будет работать только если [`screenshotPath`](#screenshotpath) установлен через параметры плагина и **НЕ БУДЕТ РАБОТАТЬ**, если вы устанавливаете папки в методах
:::

### `createJsonReportFiles` **(НОВОЕ)**

-   **Тип:** `boolean`
-   **Обязательный:** Нет
-   **По умолчанию:** `false`

Теперь у вас есть возможность экспортировать результаты сравнения в JSON-файл отчета. Предоставляя опцию `createJsonReportFiles: true`, каждое сравниваемое изображение создаст отчет, хранящийся в папке `actual`, рядом с каждым результатом `actual` изображения. Вывод будет выглядеть так:

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

Когда все тесты выполнены, новый JSON-файл с коллекцией сравнений будет сгенерирован и его можно найти в корне вашей папки `actual`. Данные группируются по:

-   `describe` для Jasmine/Mocha или `Feature` для CucumberJS
-   `it` для Jasmine/Mocha или `Scenario` для CucumberJS
    и затем сортируются по:
-   `commandName`, которые являются именами методов сравнения, используемых для сравнения изображений
-   `instanceData`, сначала браузер, затем устройство, затем платформа
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

Данные отчета дадут вам возможность создать свой собственный визуальный отчет без необходимости самостоятельно выполнять всю магию и сбор данных.

:::info ПРИМЕЧАНИЕ
Вам нужно использовать версию `@wdio/visual-testing` 5.2.0 или выше
:::

### `disableBlinkingCursor`

-   **Тип:** `boolean`
-   **Обязательный:** Нет
-   **По умолчанию:** `false`
-   **Поддерживаемые контексты приложения:** Web, Hybrid App (Webview)

Включить/отключить "мигание" каретки для всех `input`, `textarea`, `[contenteditable]` в приложении. Если установлено в `true`, каретка будет установлена на `transparent` перед созданием скриншота
и сброшена после завершения

### `disableCSSAnimation`

-   **Тип:** `boolean`
-   **Обязательный:** Нет
-   **По умолчанию:** `false`
-   **Поддерживаемые контексты приложения:** Web, Hybrid App (Webview)

Включить/отключить все CSS-анимации в приложении. Если установлено в `true`, все анимации будут отключены перед созданием скриншота
и сброшены после завершения

### `enableLayoutTesting`

-   **Тип:** `boolean`
-   **Обязательный:** Нет
-   **По умолчанию:** `false`
-   **Поддерживаемые контексты приложения:** Web

Это скроет весь текст на странице, так что для сравнения будет использоваться только макет. Скрытие будет выполнено путем добавления стиля `'color': 'transparent !important'` к **каждому** элементу.

Для вывода см. [Вывод теста](/docs/visual-testing/test-output#enablelayouttesting)

:::info
При использовании этого флага каждый элемент, содержащий текст (не только `p, h1, h2, h3, h4, h5, h6, span, a, li`, но и `div|button|..`), получит это свойство. **Нет** возможности настроить это.
:::

### `formatImageName`

-   **Тип:** `string`
-   **Обязательный:** Нет
-   **По умолчанию:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **Поддерживаемые контексты приложения:** Web, Hybrid App (Webview), Native App

Имя сохраняемых изображений можно настроить, передав параметр `formatImageName` со строкой формата, например:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

Следующие переменные могут быть переданы для форматирования строки и будут автоматически считываться из возможностей экземпляра.
Если их нельзя определить, будут использованы значения по умолчанию.

-   `browserName`: Имя браузера в предоставленных возможностях
-   `browserVersion`: Версия браузера, указанная в возможностях
-   `deviceName`: Имя устройства из возможностей
-   `dpr`: Отношение пикселей устройства
-   `height`: Высота экрана
-   `logName`: LogName из возможностей
-   `mobile`: Это добавит `_app` или имя браузера после `deviceName` для различия скриншотов приложения от скриншотов браузера
-   `platformName`: Имя платформы в предоставленных возможностях
-   `platformVersion`: Версия платформы, указанная в возможностях
-   `tag`: Тег, который предоставляется в вызываемых методах
-   `width`: Ширина экрана

:::info

Вы не можете предоставлять пользовательские пути/папки в `formatImageName`. Если вы хотите изменить путь, то, пожалуйста, проверьте изменение следующих опций:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- [`folderOptions`](/docs/visual-testing/method-options#folder-options) для каждого метода

:::

### `fullPageScrollTimeout`

-   **Тип:** `number`
-   **Обязательный:** Нет
-   **По умолчанию:** `1500`
-   **Поддерживаемые контексты приложения:** Web

Таймаут в миллисекундах для ожидания после прокрутки. Это может помочь идентифицировать страницы с ленивой загрузкой.

:::info

Это будет работать только когда опция сервиса/метода `userBasedFullPageScreenshot` установлена на `true`, см. также [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)

:::

### `hideScrollBars`

-   **Тип:** `boolean`
-   **Обязательный:** Нет
-   **По умолчанию:** `true`
-   **Поддерживаемые контексты приложения:** Web, Hybrid App (Webview)

Скрыть полосы прокрутки в приложении. Если установлено в true, все полосы прокрутки будут отключены перед созданием скриншота. По умолчанию установлено `true` для предотвращения дополнительных проблем.

### `logLevel`

-   **Тип:** `string`
-   **Обязательный:** Нет
-   **По умолчанию:** `info`
-   **Поддерживаемые контексты приложения:** Web, Hybrid App (Webview), Native App

Добавляет дополнительные логи, варианты: `debug | info | warn | silent`

Ошибки всегда записываются в консоль.

### `savePerInstance`

-   **Тип:** `boolean`
-   **По умолчанию:** `false`
-   **Обязательный:** нет
-   **Поддерживаемые контексты приложения:** Web, Hybrid App (Webview), Native App

Сохранять изображения для каждого экземпляра в отдельной папке, так, например, все скриншоты Chrome будут сохранены в папке Chrome, например `desktop_chrome`.

### `screenshotPath`

-   **Тип:** `string | () => string`
-   **По умолчанию:** `.tmp/`
-   **Обязательный:** нет
-   **Поддерживаемые контексты приложения:** Web, Hybrid App (Webview), Native App

Директория, которая будет содержать все актуальные/различающиеся скриншоты. Если не установлено, будет использоваться значение по умолчанию. Функция, возвращающая строку, также может использоваться для установки значения screenshotPath:

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// ИЛИ
{
    screenshotPath: () => {
        // Делаем здесь какую-то магию
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

### `toolBarShadowPadding`

-   **Тип:** `number`
-   **Обязательный:** Нет
-   **По умолчанию:** `6` для Android и `15` для iOS (`6` по умолчанию и `9` будут добавлены автоматически для возможной домашней панели на iPhone с вырезом или iPad с домашней панелью)
-   **Поддерживаемые контексты приложения:** Web

Отступ, который необходимо добавить к панели инструментов на iOS и Android для правильного обрезания области просмотра.

### `userBasedFullPageScreenshot`

-   **Тип:** `boolean`
-   **Обязательный:** Нет
-   **По умолчанию:** `false`
-   **Поддерживаемые контексты приложения:** Web, Hybrid App (Webview) **Введено в visual-service@7.0.0**

По умолчанию, полностраничные скриншоты на настольном веб-сайте создаются с использованием протокола WebDriver BiDi, который обеспечивает быстрые, стабильные и согласованные скриншоты без прокрутки.
Когда userBasedFullPageScreenshot установлен в true, процесс создания скриншота имитирует реального пользователя: прокрутка через страницу, захват скриншотов размером с область просмотра и их сшивание вместе. Этот метод полезен для страниц с контентом с ленивой загрузкой или динамическим рендерингом, который зависит от положения прокрутки.

Используйте эту опцию, если ваша страница зависит от загрузки содержимого при прокрутке или если вы хотите сохранить поведение старых методов создания скриншотов.

### `waitForFontsLoaded`

-   **Тип:** `boolean`
-   **Обязательный:** Нет
-   **По умолчанию:** `true`
-   **Поддерживаемые контексты приложения:** Web, Hybrid App (Webview)

Шрифты, включая сторонние, могут загружаться синхронно или асинхронно. Асинхронная загрузка означает, что шрифты могут загружаться после того, как WebdriverIO определит, что страница полностью загружена. Чтобы предотвратить проблемы с отображением шрифтов, этот модуль, по умолчанию, будет ждать загрузки всех шрифтов перед созданием скриншота.

## Параметры Tabbable

:::info ПРИМЕЧАНИЕ

Этот модуль также поддерживает отображение пути, которым пользователь использовал бы клавиатуру для _tab_-перемещения по веб-сайту, рисуя линии и точки от одного tabbable-элемента к другому.<br/>
Работа вдохновлена блог-постом [Viv Richards](https://github.com/vivrichards600) о ["АВТОМАТИЗАЦИИ TABABILITY СТРАНИЦЫ (ЭТО СЛОВО?) С ВИЗУАЛЬНЫМ ТЕСТИРОВАНИЕМ"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).<br/>
Способ выбора tabbable-элементов основан на модуле [tabbable](https://github.com/davidtheclark/tabbable). Если есть какие-либо проблемы с табуляцией, пожалуйста, проверьте [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) и особенно раздел [More details](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

### `tabbableOptions`

-   **Тип:** `object`
-   **Обязательный:** Нет
-   **По умолчанию:** См. [здесь](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всех значений по умолчанию
-   **Поддерживаемые контексты приложения:** Web

Параметры, которые можно изменить для линий и точек, если вы используете методы `{save|check}Tabbable`. Параметры объяснены ниже.

#### `tabbableOptions.circle`

-   **Тип:** `object`
-   **Обязательный:** Нет
-   **По умолчанию:** См. [здесь](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всех значений по умолчанию
-   **Поддерживаемые контексты приложения:** Web

Параметры для изменения круга.

##### `tabbableOptions.circle.backgroundColor`

-   **Тип:** `string`
-   **Обязательный:** Нет
-   **По умолчанию:** См. [здесь](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всех значений по умолчанию
-   **Поддерживаемые контексты приложения:** Web

Цвет фона круга.

##### `tabbableOptions.circle.borderColor`

-   **Тип:** `string`
-   **Обязательный:** Нет
-   **По умолчанию:** См. [здесь](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всех значений по умолчанию
-   **Поддерживаемые контексты приложения:** Web

Цвет границы круга.

##### `tabbableOptions.circle.borderWidth`

-   **Тип:** `number`
-   **Обязательный:** Нет
-   **По умолчанию:** См. [здесь](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всех значений по умолчанию
-   **Поддерживаемые контексты приложения:** Web

Ширина границы круга.

##### `tabbableOptions.circle.fontColor`

-   **Тип:** `string`
-   **Обязательный:** Нет
-   **По умолчанию:** См. [здесь](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всех значений по умолчанию
-   **Поддерживаемые контексты приложения:** Web

Цвет шрифта текста в круге. Это будет показано только если [`showNumber`](./#tabbableoptionscircleshownumber) установлен на `true`.

##### `tabbableOptions.circle.fontFamily`

-   **Тип:** `string`
-   **Обязательный:** Нет
-   **По умолчанию:** См. [здесь](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всех значений по умолчанию
-   **Поддерживаемые контексты приложения:** Web

Семейство шрифта текста в круге. Это будет показано только если [`showNumber`](./#tabbableoptionscircleshownumber) установлен на `true`.

Убедитесь, что используете шрифты, поддерживаемые браузерами.

##### `tabbableOptions.circle.fontSize`

-   **Тип:** `number`
-   **Обязательный:** Нет
-   **По умолчанию:** См. [здесь](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всех значений по умолчанию
-   **Поддерживаемые контексты приложения:** Web

Размер шрифта текста в круге. Это будет показано только если [`showNumber`](./#tabbableoptionscircleshownumber) установлен на `true`.

##### `tabbableOptions.circle.size`

-   **Тип:** `number`
-   **Обязательный:** Нет
-   **По умолчанию:** См. [здесь](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всех значений по умолчанию
-   **Поддерживаемые контексты приложения:** Web

Размер круга.

##### `tabbableOptions.circle.showNumber`

-   **Тип:** `showNumber`
-   **Обязательный:** Нет
-   **По умолчанию:** См. [здесь](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всех значений по умолчанию
-   **Поддерживаемые контексты приложения:** Web

Показать номер последовательности табуляции в круге.

#### `tabbableOptions.line`

-   **Тип:** `object`
-   **Обязательный:** Нет
-   **По умолчанию:** См. [здесь](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всех значений по умолчанию
-   **Поддерживаемые контексты приложения:** Web

Параметры для изменения линии.

##### `tabbableOptions.line.color`

-   **Тип:** `string`
-   **Обязательный:** Нет
-   **По умолчанию:** См. [здесь](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всех значений по умолчанию
-   **Поддерживаемые контексты приложения:** Web

Цвет линии.

##### `tabbableOptions.line.width`

-   **Тип:** `number`
-   **Обязательный:** Нет
-   **По умолчанию:** См. [здесь](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всех значений по умолчанию
-   **Поддерживаемые контексты приложения:** Web

Ширина линии.

## Параметры сравнения

### `compareOptions`

-   **Тип:** `object`
-   **Обязательный:** Нет
-   **По умолчанию:** См. [здесь](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) для всех значений по умолчанию
-   **Поддерживаемые контексты приложения:** Web, Hybrid App (Webview), Native App (См. [Параметры сравнения методов](./method-options#compare-check-options) для более подробной информации)

Параметры сравнения также могут быть установлены как параметры сервиса, они описаны в [Параметрах сравнения методов](/docs/visual-testing/method-options#compare-check-options)