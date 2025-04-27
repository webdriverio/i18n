---
id: service-options
title: Опции сервиса
---

Опции сервиса - это параметры, которые можно задать при инициализации сервиса и которые будут использоваться для каждого вызова метода.

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
-   **Обязательный:** Нет
-   **По умолчанию:** `6`
-   **Поддерживается:** Web

Отступ, который необходимо добавить к адресной строке на iOS и Android для правильного вырезания области просмотра.

### `autoElementScroll`

-   **Тип:** `boolean`
-   **Обязательный:** Нет
-   **По умолчанию:** `true`
-   **Поддерживается:** Web, Hybrid App (Webview)

Эта опция позволяет отключить автоматическую прокрутку элемента в поле зрения при создании скриншота элемента.

### `addIOSBezelCorners`

-   **Тип:** `boolean`
-   **Обязательный:** Нет
-   **По умолчанию:** `false`
-   **Поддерживается:** Web, Hybrid App (Webview), Native App

Добавляет скругленные углы рамки и вырез/динамический островок к скриншоту для устройств iOS.

:::info ПРИМЕЧАНИЕ
Это можно сделать только в том случае, если имя устройства **МОЖЕТ** быть автоматически определено и соответствует следующему списку нормализованных имен устройств. Нормализация будет выполнена этим модулем.
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
-   **Поддерживается:** Web, Hybrid App (Webview), Native App

Если во время сравнения не найдено базовое изображение, оно автоматически копируется в папку с базовыми изображениями.

### `baselineFolder`

-   **Тип:** `string|()=> string`
-   **Обязательный:** Нет
-   **По умолчанию:** `.path/to/testfile/__snapshots__/`
-   **Поддерживается:** Web, Hybrid App (Webview), Native App

Директория, которая будет содержать все базовые изображения, используемые во время сравнения. Если не задано, будет использоваться значение по умолчанию, которое сохраняет файлы в папке `__snapshots__/` рядом со спецификацией, выполняющей визуальные тесты. Также можно использовать функцию, возвращающую `string`, для установки значения `baselineFolder`:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// ИЛИ
{
    baselineFolder: () => {
        // Делаем магию
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **Тип:** `boolean`
-   **Обязательный:** Нет
-   **По умолчанию:** `false`
-   **Поддерживается:** Web, Hybrid App (Webview), Native App

Удалить временную папку (`actual` и `diff`) при инициализации

:::info ПРИМЕЧАНИЕ
Это будет работать только если [`screenshotPath`](#screenshotpath) установлен через опции плагина, и **НЕ БУДЕТ РАБОТАТЬ**, если вы устанавливаете папки в методах
:::

### `createJsonReportFiles` **(НОВОЕ)**

-   **Тип:** `boolean`
-   **Обязательный:** Нет
-   **По умолчанию:** `false`

Теперь у вас есть возможность экспортировать результаты сравнения в JSON-файл отчета. Указав опцию `createJsonReportFiles: true`, для каждого сравниваемого изображения будет создан отчет, хранящийся в папке `actual`, рядом с каждым результатом `actual`. Вывод будет выглядеть так:

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

После выполнения всех тестов будет создан новый JSON-файл с коллекцией сравнений, который можно найти в корне папки `actual`. Данные сгруппированы по:

-   `describe` для Jasmine/Mocha или `Feature` для CucumberJS
-   `it` для Jasmine/Mocha или `Scenario` для CucumberJS
    а затем отсортированы по:
-   `commandName`, методы сравнения, используемые для сравнения изображений
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
Вам необходимо использовать `@wdio/visual-testing` версии `5.2.0` или выше
:::

### `disableBlinkingCursor`

-   **Тип:** `boolean`
-   **Обязательный:** Нет
-   **По умолчанию:** `false`
-   **Поддерживается:** Web, Hybrid App (Webview)

Включить/отключить "мигание" курсора во всех `input`, `textarea`, `[contenteditable]` в приложении. Если установлено в `true`, курсор будет установлен как `transparent` перед созданием скриншота и восстановлен после завершения.

### `disableCSSAnimation`

-   **Тип:** `boolean`
-   **Обязательный:** Нет
-   **По умолчанию:** `false`
-   **Поддерживается:** Web, Hybrid App (Webview)

Включить/отключить все CSS-анимации в приложении. Если установлено в `true`, все анимации будут отключены перед созданием скриншота и восстановлены после завершения.

### `enableLayoutTesting`

-   **Тип:** `boolean`
-   **Обязательный:** Нет
-   **По умолчанию:** `false`
-   **Поддерживается:** Web

Это скроет весь текст на странице, чтобы для сравнения использовался только макет. Скрытие будет осуществляться путем добавления стиля `'color': 'transparent !important'` к **каждому** элементу.

Результат см. в [Test Output](/docs/visual-testing/test-output#enablelayouttesting)

:::info
При использовании этого флага каждый элемент, содержащий текст (не только `p, h1, h2, h3, h4, h5, h6, span, a, li`, но также `div|button|..`), получит это свойство. **Нет** возможности настроить это.
:::

### `formatImageName`

-   **Тип:** `string`
-   **Обязательный:** Нет
-   **По умолчанию:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **Поддерживается:** Web, Hybrid App (Webview), Native App

Имя сохраняемых изображений можно настроить, передав параметр `formatImageName` с форматной строкой, например:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

Следующие переменные могут быть переданы для форматирования строки и будут автоматически считаны из capabilities экземпляра.
Если они не могут быть определены, будут использоваться значения по умолчанию.

-   `browserName`: Имя браузера в предоставленных capabilities
-   `browserVersion`: Версия браузера, указанная в capabilities
-   `deviceName`: Имя устройства из capabilities
-   `dpr`: Соотношение пикселей устройства
-   `height`: Высота экрана
-   `logName`: LogName из capabilities
-   `mobile`: Добавит `_app` или имя браузера после `deviceName` для различения скриншотов приложения от скриншотов браузера
-   `platformName`: Имя платформы в предоставленных capabilities
-   `platformVersion`: Версия платформы, указанная в capabilities
-   `tag`: Тег, который предоставляется в вызываемых методах
-   `width`: Ширина экрана

:::info

Вы не можете указать пользовательские пути/папки в `formatImageName`. Если вы хотите изменить путь, проверьте изменение следующих опций:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- [`folderOptions`](/docs/visual-testing/method-options#folder-options) для каждого метода

:::

### `fullPageScrollTimeout`

-   **Тип:** `number`
-   **Обязательный:** Нет
-   **По умолчанию:** `1500`
-   **Поддерживается:** Web

Тайм-аут в миллисекундах для ожидания после прокрутки. Это может помочь в идентификации страниц с ленивой загрузкой.

:::info

Это будет работать только когда опция сервиса/метода `userBasedFullPageScreenshot` установлена в `true`, см. также [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)

:::

### `hideScrollBars`

-   **Тип:** `boolean`
-   **Обязательный:** Нет
-   **По умолчанию:** `true`
-   **Поддерживается:** Web, Hybrid App (Webview)

Скрывать полосы прокрутки в приложении. Если установлено в true, все полосы прокрутки будут отключены перед созданием скриншота. По умолчанию установлено в `true` для предотвращения дополнительных проблем.

### `logLevel`

-   **Тип:** `string`
-   **Обязательный:** Нет
-   **По умолчанию:** `info`
-   **Поддерживается:** Web, Hybrid App (Webview), Native App

Добавляет дополнительные логи, опции: `debug | info | warn | silent`

Ошибки всегда записываются в консоль.

### `savePerInstance`

-   **Тип:** `boolean`
-   **По умолчанию:** `false`
-   **Обязательный:** нет
-   **Поддерживается:** Web, Hybrid App (Webview), Native App

Сохранять изображения для каждого экземпляра в отдельной папке, например, все скриншоты Chrome будут сохранены в папке Chrome, например, `desktop_chrome`.

### `screenshotPath`

-   **Тип:** `string | () => string`
-   **По умолчанию:** `.tmp/`
-   **Обязательный:** нет
-   **Поддерживается:** Web, Hybrid App (Webview), Native App

Директория, которая будет содержать все фактические/различающиеся скриншоты. Если не установлено, будет использовано значение по умолчанию. Функция, возвращающая строку, также может использоваться для установки значения screenshotPath:

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// ИЛИ
{
    screenshotPath: () => {
        // Делаем магию
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

### `toolBarShadowPadding`

-   **Тип:** `number`
-   **Обязательный:** Нет
-   **По умолчанию:** `6` для Android и `15` для iOS (`6` по умолчанию и `9` будет добавлено автоматически для возможной домашней панели на iPhone с вырезом или iPad с домашней панелью)
-   **Поддерживается:** Web

Отступ, который необходимо добавить к панели инструментов на iOS и Android для правильного вырезания области просмотра.

### `userBasedFullPageScreenshot`

-   **Тип:** `boolean`
-   **Обязательный:** Нет
-   **По умолчанию:** `false`
-   **Поддерживается:** Web, Hybrid App (Webview) **Введено в visual-service@7.0.0**

По умолчанию скриншоты полной страницы на десктопном вебе создаются с использованием протокола WebDriver BiDi, который обеспечивает быстрые, стабильные и согласованные скриншоты без прокрутки.
Когда userBasedFullPageScreenshot установлен в true, процесс создания скриншота имитирует реального пользователя: прокручивая страницу, делая скриншоты размером с область просмотра и соединяя их вместе. Этот метод полезен для страниц с ленивой загрузкой контента или динамическим рендерингом, зависящим от положения прокрутки.

Используйте эту опцию, если ваша страница зависит от загрузки контента при прокрутке или если вы хотите сохранить поведение старых методов создания скриншотов.

### `waitForFontsLoaded`

-   **Тип:** `boolean`
-   **Обязательный:** Нет
-   **По умолчанию:** `true`
-   **Поддерживается:** Web, Hybrid App (Webview)

Шрифты, включая сторонние, могут загружаться синхронно или асинхронно. Асинхронная загрузка означает, что шрифты могут загрузиться после того, как WebdriverIO определит, что страница полностью загружена. Чтобы предотвратить проблемы с рендерингом шрифтов, этот модуль по умолчанию будет ждать загрузки всех шрифтов перед созданием скриншота.

## Опции для табуляции

:::info ПРИМЕЧАНИЕ

Этот модуль также поддерживает отображение того, как пользователь использовал бы клавишу _tab_ для перемещения по сайту, рисуя линии и точки от элемента к элементу, доступного через табуляцию.<br/>
Работа вдохновлена постом в блоге [Viv Richards](https://github.com/vivrichards600) о ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).<br/>
Выбор элементов, доступных через табуляцию, основан на модуле [tabbable](https://github.com/davidtheclark/tabbable). При возникновении проблем с табуляцией, пожалуйста, проверьте [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) и особенно раздел [More details section](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

### `tabbableOptions`

-   **Тип:** `object`
-   **Обязательный:** Нет
-   **По умолчанию:** См. [здесь](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) для всех значений по умолчанию
-   **Поддерживается:** Web

Опции, которые можно изменить для линий и точек, если вы используете методы `{save|check}Tabbable`. Опции описаны ниже.

#### `tabbableOptions.circle`

-   **Тип:** `object`
-   **Обязательный:** Нет
-   **По умолчанию:** См. [здесь](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) для всех значений по умолчанию
-   **Поддерживается:** Web

Опции для изменения круга.

##### `tabbableOptions.circle.backgroundColor`

-   **Тип:** `string`
-   **Обязательный:** Нет
-   **По умолчанию:** См. [здесь](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) для всех значений по умолчанию
-   **Поддерживается:** Web

Цвет фона круга.

##### `tabbableOptions.circle.borderColor`

-   **Тип:** `string`
-   **Обязательный:** Нет
-   **По умолчанию:** См. [здесь](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) для всех значений по умолчанию
-   **Поддерживается:** Web

Цвет границы круга.

##### `tabbableOptions.circle.borderWidth`

-   **Тип:** `number`
-   **Обязательный:** Нет
-   **По умолчанию:** См. [здесь](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) для всех значений по умолчанию
-   **Поддерживается:** Web

Ширина границы круга.

##### `tabbableOptions.circle.fontColor`

-   **Тип:** `string`
-   **Обязательный:** Нет
-   **По умолчанию:** См. [здесь](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) для всех значений по умолчанию
-   **Поддерживается:** Web

Цвет шрифта текста в круге. Это будет отображаться только если [`showNumber`](./#tabbableoptionscircleshownumber) установлен в `true`.

##### `tabbableOptions.circle.fontFamily`

-   **Тип:** `string`
-   **Обязательный:** Нет
-   **По умолчанию:** См. [здесь](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) для всех значений по умолчанию
-   **Поддерживается:** Web

Семейство шрифта текста в круге. Это будет отображаться только если [`showNumber`](./#tabbableoptionscircleshownumber) установлен в `true`.

Убедитесь, что установлены шрифты, поддерживаемые браузерами.

##### `tabbableOptions.circle.fontSize`

-   **Тип:** `number`
-   **Обязательный:** Нет
-   **По умолчанию:** См. [здесь](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) для всех значений по умолчанию
-   **Поддерживается:** Web

Размер шрифта текста в круге. Это будет отображаться только если [`showNumber`](./#tabbableoptionscircleshownumber) установлен в `true`.

##### `tabbableOptions.circle.size`

-   **Тип:** `number`
-   **Обязательный:** Нет
-   **По умолчанию:** См. [здесь](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) для всех значений по умолчанию
-   **Поддерживается:** Web

Размер круга.

##### `tabbableOptions.circle.showNumber`

-   **Тип:** `showNumber`
-   **Обязательный:** Нет
-   **По умолчанию:** См. [здесь](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) для всех значений по умолчанию
-   **Поддерживается:** Web

Показывать номер последовательности табуляции в круге.

#### `tabbableOptions.line`

-   **Тип:** `object`
-   **Обязательный:** Нет
-   **По умолчанию:** См. [здесь](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) для всех значений по умолчанию
-   **Поддерживается:** Web

Опции для изменения линии.

##### `tabbableOptions.line.color`

-   **Тип:** `string`
-   **Обязательный:** Нет
-   **По умолчанию:** См. [здесь](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) для всех значений по умолчанию
-   **Поддерживается:** Web

Цвет линии.

##### `tabbableOptions.line.width`

-   **Тип:** `number`
-   **Обязательный:** Нет
-   **По умолчанию:** См. [здесь](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) для всех значений по умолчанию
-   **Поддерживается:** Web

Ширина линии.

## Опции сравнения

### `compareOptions`

-   **Тип:** `object`
-   **Обязательный:** Нет
-   **По умолчанию:** См. [здесь](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) для всех значений по умолчанию
-   **Поддерживается:** Web, Hybrid App (Webview), Native App (См. [Опции метода сравнения](./method-options#compare-check-options) для получения дополнительной информации)

Опции сравнения также могут быть установлены как опции сервиса, они описаны в [Опциях метода сравнения](/docs/visual-testing/method-options#compare-check-options)