---
id: service-options
title: Опции сервиса
---

Опции сервиса - это параметры, которые можно установить при создании экземпляра сервиса и которые будут использоваться для каждого вызова метода.

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

## Опции по умолчанию

### `addressBarShadowPadding`

-   **Тип:** `number`
-   **Обязательно:** Нет
-   **По умолчанию:** `6`
-   **Поддерживаемые контексты приложений:** Web

Отступ, который необходимо добавить к адресной строке на iOS и Android для правильного обрезания области просмотра.

### `autoElementScroll`

-   **Тип:** `boolean`
-   **Обязательно:** Нет
-   **По умолчанию:** `true`
-   **Поддерживаемые контексты приложений:** Web, Hybrid App (Webview)

Этот параметр позволяет отключить автоматическую прокрутку элемента в зону видимости при создании скриншота элемента.

### `addIOSBezelCorners`

-   **Тип:** `boolean`
-   **Обязательно:** Нет
-   **По умолчанию:** `false`
-   **Поддерживаемые контексты приложений:** Web, Hybrid App (Webview), Native App

Добавляет рамку экрана и вырез/динамический остров к скриншоту для устройств iOS.

:::info ПРИМЕЧАНИЕ
Это можно сделать только в том случае, если название устройства **МОЖЕТ** быть автоматически определено и соответствует следующему списку нормализованных названий устройств. Нормализация будет выполнена данным модулем.
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
-   **Обязательно:** Нет
-   **По умолчанию:** `true`
-   **Поддерживаемые контексты приложений:** Web, Hybrid App (Webview), Native App

Если во время сравнения не найдено базовое изображение, оно автоматически копируется в папку базовых изображений.

### `alwaysSaveActualImage`

-   **Тип:** `boolean`
-   **Обязательно:** Нет
-   **По умолчанию:** `true`
-   **Поддерживаемые контексты приложений:** Все

При установке этого параметра в значение `false`:

- не сохраняется фактическое изображение, если **нет** разницы
- не сохраняется файл jsonreport, если `createJsonReportFiles` установлен в `true`. Также в логах будет показано предупреждение о том, что `createJsonReportFiles` отключен

Это должно обеспечить лучшую производительность, поскольку файлы не записываются в систему, и должно гарантировать, что в папке `actual` не будет много лишних файлов.

### `baselineFolder`

-   **Тип:** `string|()=> string`
-   **Обязательно:** Нет
-   **По умолчанию:** `.path/to/testfile/__snapshots__/`
-   **Поддерживаемые контексты приложений:** Web, Hybrid App (Webview), Native App

Директория, которая будет содержать все базовые изображения, используемые при сравнении. Если не установлено, будет использовано значение по умолчанию, которое будет хранить файлы в папке `__snapshots__/` рядом с файлом спецификации, выполняющим визуальные тесты. Функция, возвращающая `string`, также может использоваться для установки значения `baselineFolder`:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// ИЛИ
{
    baselineFolder: () => {
        // Делаем какую-то магию здесь
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **Тип:** `boolean`
-   **Обязательно:** Нет
-   **По умолчанию:** `false`
-   **Поддерживаемые контексты приложений:** Web, Hybrid App (Webview), Native App

Удалять рабочую папку (`actual` и `diff`) при инициализации

:::info ПРИМЕЧАНИЕ
Это будет работать только если [`screenshotPath`](#screenshotpath) установлен через опции плагина, и **НЕ БУДЕТ РАБОТАТЬ**, если вы устанавливаете папки в методах
:::

### `createJsonReportFiles` **(НОВОЕ)**

-   **Тип:** `boolean`
-   **Обязательно:** Нет
-   **По умолчанию:** `false`

Теперь у вас есть возможность экспортировать результаты сравнения в JSON-файл отчета. Предоставляя опцию `createJsonReportFiles: true`, для каждого сравниваемого изображения будет создан отчет, который сохраняется в папке `actual` рядом с каждым результатом `actual` изображения. Вывод будет выглядеть примерно так:

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

Когда все тесты будут выполнены, новый JSON-файл с коллекцией сравнений будет сгенерирован и может быть найден в корне вашей папки `actual`. Данные сгруппированы по:

-   `describe` для Jasmine/Mocha или `Feature` для CucumberJS
-   `it` для Jasmine/Mocha или `Scenario` для CucumberJS
    и затем отсортированы по:
-   `commandName`, который является именем метода сравнения, используемого для сравнения изображений
-   `instanceData`, сначала браузер, затем устройство, затем платформа
    это будет выглядеть так:

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

Данные отчета дадут вам возможность создать собственный визуальный отчет без необходимости самостоятельно выполнять всю магию и сбор данных.

:::info ПРИМЕЧАНИЕ
Вам нужно использовать `@wdio/visual-testing` версии `5.2.0` или выше
:::

### `disableBlinkingCursor`

-   **Тип:** `boolean`
-   **Обязательно:** Нет
-   **По умолчанию:** `false`
-   **Поддерживаемые контексты приложений:** Web, Hybrid App (Webview)

Включить/отключить "мигание" курсора во всех элементах `input`, `textarea`, `[contenteditable]` в приложении. Если установлено значение `true`, курсор будет установлен на `transparent` перед созданием скриншота
и сброшен по окончании

### `disableCSSAnimation`

-   **Тип:** `boolean`
-   **Обязательно:** Нет
-   **По умолчанию:** `false`
-   **Поддерживаемые контексты приложений:** Web, Hybrid App (Webview)

Включить/отключить все CSS-анимации в приложении. Если установлено значение `true`, все анимации будут отключены перед созданием скриншота
и сброшены по окончании

### `enableLayoutTesting`

-   **Тип:** `boolean`
-   **Обязательно:** Нет
-   **По умолчанию:** `false`
-   **Поддерживаемые контексты приложений:** Web

Это скроет весь текст на странице, так что для сравнения будет использоваться только макет. Скрытие будет выполнено путем добавления стиля `'color': 'transparent !important'` к **каждому** элементу.

Для вывода см. [Результаты тестов](/docs/visual-testing/test-output#enablelayouttesting)

:::info
При использовании этого флага каждый элемент, содержащий текст (не только `p, h1, h2, h3, h4, h5, h6, span, a, li`, но также `div|button|..`), получит это свойство. **Нет** возможности настроить это поведение.
:::

### `formatImageName`

-   **Тип:** `string`
-   **Обязательно:** Нет
-   **По умолчанию:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **Поддерживаемые контексты приложений:** Web, Hybrid App (Webview), Native App

Имя сохраненных изображений может быть настроено путем передачи параметра `formatImageName` с форматной строкой, например:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

Следующие переменные могут быть переданы для форматирования строки и будут автоматически считаны из возможностей экземпляра.
Если они не могут быть определены, будут использованы значения по умолчанию.

-   `browserName`: Имя браузера в предоставленных возможностях
-   `browserVersion`: Версия браузера, указанная в возможностях
-   `deviceName`: Имя устройства из возможностей
-   `dpr`: Соотношение пикселей устройства
-   `height`: Высота экрана
-   `logName`: LogName из возможностей
-   `mobile`: Это добавит `_app` или имя браузера после `deviceName` для различения скриншотов приложения от скриншотов браузера
-   `platformName`: Имя платформы в предоставленных возможностях
-   `platformVersion`: Версия платформы, указанная в возможностях
-   `tag`: Тег, который предоставляется в вызываемых методах
-   `width`: Ширина экрана

:::info

Вы не можете указать пользовательские пути/папки в `formatImageName`. Если вы хотите изменить путь, пожалуйста, проверьте изменение следующих опций:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- [`folderOptions`](/docs/visual-testing/method-options#folder-options) для каждого метода

:::

### `fullPageScrollTimeout`

-   **Тип:** `number`
-   **Обязательно:** Нет
-   **По умолчанию:** `1500`
-   **Поддерживаемые контексты приложений:** Web

Время ожидания в миллисекундах после прокрутки. Это может помочь идентифицировать страницы с ленивой загрузкой.

:::info

Это будет работать только тогда, когда опция сервиса/метода `userBasedFullPageScreenshot` установлена на `true`, см. также [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)

:::

### `hideScrollBars`

-   **Тип:** `boolean`
-   **Обязательно:** Нет
-   **По умолчанию:** `true`
-   **Поддерживаемые контексты приложений:** Web, Hybrid App (Webview)

Скрыть полосы прокрутки в приложении. Если установлено значение true, все полосы прокрутки будут отключены перед созданием скриншота. Это установлено по умолчанию в `true`, чтобы предотвратить дополнительные проблемы.

### `logLevel`

-   **Тип:** `string`
-   **Обязательно:** Нет
-   **По умолчанию:** `info`
-   **Поддерживаемые контексты приложений:** Web, Hybrid App (Webview), Native App

Добавляет дополнительные логи, варианты: `debug | info | warn | silent`

Ошибки всегда выводятся в консоль.

### `savePerInstance`

-   **Тип:** `boolean`
-   **По умолчанию:** `false`
-   **Обязательно:** нет
-   **Поддерживаемые контексты приложений:** Web, Hybrid App (Webview), Native App

Сохранять изображения для каждого экземпляра в отдельной папке, например, все скриншоты Chrome будут сохранены в папке Chrome, например, `desktop_chrome`.

### `screenshotPath`

-   **Тип:** `string | () => string`
-   **По умолчанию:** `.tmp/`
-   **Обязательно:** нет
-   **Поддерживаемые контексты приложений:** Web, Hybrid App (Webview), Native App

Директория, которая будет содержать все фактические/различающиеся скриншоты. Если не установлено, будет использовано значение по умолчанию. Функция, возвращающая строку, также может использоваться для установки значения screenshotPath:

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// ИЛИ
{
    screenshotPath: () => {
        // Делаем какую-то магию здесь
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

### `toolBarShadowPadding`

-   **Тип:** `number`
-   **Обязательно:** Нет
-   **По умолчанию:** `6` для Android и `15` для iOS (`6` по умолчанию и `9` будет добавлено автоматически для возможной домашней панели на iPhone с вырезом или iPad, которые имеют домашнюю панель)
-   **Поддерживаемые контексты приложений:** Web

Отступ, который необходимо добавить к панели инструментов на iOS и Android для правильного обрезания области просмотра.

### `userBasedFullPageScreenshot`

-   **Тип:** `boolean`
-   **Обязательно:** Нет
-   **По умолчанию:** `false`
-   **Поддерживаемые контексты приложений:** Web, Hybrid App (Webview) **Введено в visual-service@7.0.0**

По умолчанию полностраничные скриншоты на настольных веб-приложениях делаются с использованием протокола WebDriver BiDi, который обеспечивает быстрые, стабильные и последовательные скриншоты без прокрутки.
Когда userBasedFullPageScreenshot установлен в true, процесс снятия скриншота имитирует реального пользователя: прокрутку страницы, захват скриншотов размером с область просмотра и их сшивание. Этот метод полезен для страниц с ленивой загрузкой контента или динамическим рендерингом, который зависит от положения прокрутки.

Используйте эту опцию, если ваша страница зависит от загрузки контента при прокрутке или если вы хотите сохранить поведение старых методов снятия скриншотов.

### `waitForFontsLoaded`

-   **Тип:** `boolean`
-   **Обязательно:** Нет
-   **По умолчанию:** `true`
-   **Поддерживаемые контексты приложений:** Web, Hybrid App (Webview)

Шрифты, включая сторонние шрифты, могут загружаться синхронно или асинхронно. Асинхронная загрузка означает, что шрифты могут загрузиться после того, как WebdriverIO определит, что страница полностью загружена. Чтобы предотвратить проблемы с рендерингом шрифтов, этот модуль, по умолчанию, будет ждать загрузки всех шрифтов перед созданием скриншота.

## Опции Tabbable

:::info ПРИМЕЧАНИЕ

Этот модуль также поддерживает рисование того, как пользователь мог бы использовать свою клавиатуру для перемещения по сайту с помощью клавиши _Tab_, рисуя линии и точки от одного элемента с возможностью табуляции к другому.<br/>
Работа вдохновлена постом в блоге [Viv Richards](https://github.com/vivrichards600) о ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).<br/>
Способ выбора элементов с возможностью табуляции основан на модуле [tabbable](https://github.com/davidtheclark/tabbable). Если у вас возникнут проблемы с табуляцией, пожалуйста, проверьте [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) и особенно раздел [More details](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

### `tabbableOptions`

-   **Тип:** `object`
-   **Обязательно:** Нет
-   **По умолчанию:** Смотрите [здесь](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всех значений по умолчанию
-   **Поддерживаемые контексты приложений:** Web

Опции, которые можно изменить для линий и точек при использовании методов `{save|check}Tabbable`. Опции описаны ниже.

#### `tabbableOptions.circle`

-   **Тип:** `object`
-   **Обязательно:** Нет
-   **По умолчанию:** Смотрите [здесь](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всех значений по умолчанию
-   **Поддерживаемые контексты приложений:** Web

Опции для изменения круга.

##### `tabbableOptions.circle.backgroundColor`

-   **Тип:** `string`
-   **Обязательно:** Нет
-   **По умолчанию:** Смотрите [здесь](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всех значений по умолчанию
-   **Поддерживаемые контексты приложений:** Web

Фоновый цвет круга.

##### `tabbableOptions.circle.borderColor`

-   **Тип:** `string`
-   **Обязательно:** Нет
-   **По умолчанию:** Смотрите [здесь](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всех значений по умолчанию
-   **Поддерживаемые контексты приложений:** Web

Цвет границы круга.

##### `tabbableOptions.circle.borderWidth`

-   **Тип:** `number`
-   **Обязательно:** Нет
-   **По умолчанию:** Смотрите [здесь](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всех значений по умолчанию
-   **Поддерживаемые контексты приложений:** Web

Ширина границы круга.

##### `tabbableOptions.circle.fontColor`

-   **Тип:** `string`
-   **Обязательно:** Нет
-   **По умолчанию:** Смотрите [здесь](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всех значений по умолчанию
-   **Поддерживаемые контексты приложений:** Web

Цвет шрифта текста в круге. Это будет показано только если [`showNumber`](./#tabbableoptionscircleshownumber) установлен в `true`.

##### `tabbableOptions.circle.fontFamily`

-   **Тип:** `string`
-   **Обязательно:** Нет
-   **По умолчанию:** Смотрите [здесь](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всех значений по умолчанию
-   **Поддерживаемые контексты приложений:** Web

Семейство шрифта текста в круге. Это будет показано только если [`showNumber`](./#tabbableoptionscircleshownumber) установлен в `true`.

Убедитесь, что установлены шрифты, поддерживаемые браузерами.

##### `tabbableOptions.circle.fontSize`

-   **Тип:** `number`
-   **Обязательно:** Нет
-   **По умолчанию:** Смотрите [здесь](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всех значений по умолчанию
-   **Поддерживаемые контексты приложений:** Web

Размер шрифта текста в круге. Это будет показано только если [`showNumber`](./#tabbableoptionscircleshownumber) установлен в `true`.

##### `tabbableOptions.circle.size`

-   **Тип:** `number`
-   **Обязательно:** Нет
-   **По умолчанию:** Смотрите [здесь](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всех значений по умолчанию
-   **Поддерживаемые контексты приложений:** Web

Размер круга.

##### `tabbableOptions.circle.showNumber`

-   **Тип:** `showNumber`
-   **Обязательно:** Нет
-   **По умолчанию:** Смотрите [здесь](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всех значений по умолчанию
-   **Поддерживаемые контексты приложений:** Web

Показать номер последовательности табуляции в круге.

#### `tabbableOptions.line`

-   **Тип:** `object`
-   **Обязательно:** Нет
-   **По умолчанию:** Смотрите [здесь](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всех значений по умолчанию
-   **Поддерживаемые контексты приложений:** Web

Опции для изменения линии.

##### `tabbableOptions.line.color`

-   **Тип:** `string`
-   **Обязательно:** Нет
-   **По умолчанию:** Смотрите [здесь](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всех значений по умолчанию
-   **Поддерживаемые контексты приложений:** Web

Цвет линии.

##### `tabbableOptions.line.width`

-   **Тип:** `number`
-   **Обязательно:** Нет
-   **По умолчанию:** Смотрите [здесь](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всех значений по умолчанию
-   **Поддерживаемые контексты приложений:** Web

Ширина линии.

## Опции сравнения

### `compareOptions`

-   **Тип:** `object`
-   **Обязательно:** Нет
-   **По умолчанию:** Смотрите [здесь](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) для всех значений по умолчанию
-   **Поддерживаемые контексты приложений:** Web, Hybrid App (Webview), Native App (Смотрите [Опции сравнения методов](./method-options#compare-check-options) для дополнительной информации)

Опции сравнения также могут быть установлены как опции сервиса, они описаны в разделе [Опции сравнения методов](/docs/visual-testing/method-options#compare-check-options)