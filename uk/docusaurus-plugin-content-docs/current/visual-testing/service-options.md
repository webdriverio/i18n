---
id: service-options
title: Опції Сервісу
---

Опції сервісу - це налаштування, які можна встановити під час ініціалізації сервісу і які будуть використовуватися для кожного виклику методу.

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

## Опції за замовчуванням

### `addressBarShadowPadding`

-   **Тип:** `number`
-   **Обов'язково:** Ні
-   **За замовчуванням:** `6`
-   **Підтримувані контексти додатків:** Web

Відступ, який потрібно додати до адресного рядка на iOS та Android для належного обрізання області перегляду.

### `autoElementScroll`

-   **Тип:** `boolean`
-   **Обов'язково:** Ні
-   **За замовчуванням:** `true`
-   **Підтримувані контексти додатків:** Web, Hybrid App (Webview)

Ця опція дозволяє вимкнути автоматичне прокручування елемента до видимої області під час створення знімка елемента.

### `addIOSBezelCorners`

-   **Тип:** `boolean`
-   **Обов'язково:** Ні
-   **За замовчуванням:** `false`
-   **Підтримувані контексти додатків:** Web, Hybrid App (Webview), Native App

Додає закруглені кути та виріз/динамічний острівець до знімка екрану для пристроїв iOS.

:::info ПРИМІТКА
Це можна зробити лише коли ім'я пристрою **МОЖЕ** бути автоматично визначено та відповідає наступному списку нормалізованих назв пристроїв. Нормалізація буде виконана цим модулем.
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
-   **Обов'язково:** Ні
-   **За замовчуванням:** `true`
-   **Підтримувані контексти додатків:** Web, Hybrid App (Webview), Native App

Якщо під час порівняння не знайдено базового зображення, зображення автоматично копіюється в папку з базовими зображеннями.

### `baselineFolder`

-   **Тип:** `string|()=> string`
-   **Обов'язково:** Ні
-   **За замовчуванням:** `.path/to/testfile/__snapshots__/`
-   **Підтримувані контексти додатків:** Web, Hybrid App (Webview), Native App

Директорія, яка міститиме всі базові зображення, що використовуються під час порівняння. Якщо не встановлено, буде використовуватися значення за замовчуванням, яке зберігатиме файли в папці `__snapshots__/` поруч зі специфікацією, яка виконує візуальні тести. Функція, що повертає `string`, також може використовуватися для встановлення значення `baselineFolder`:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// АБО
{
    baselineFolder: () => {
        // Виконуємо якусь магію тут
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **Тип:** `boolean`
-   **Обов'язково:** Ні
-   **За замовчуванням:** `false`
-   **Підтримувані контексти додатків:** Web, Hybrid App (Webview), Native App

Видаляти папку часу виконання (`actual` і `diff`) при ініціалізації

:::info ПРИМІТКА
Це працюватиме лише коли [`screenshotPath`](#screenshotpath) встановлено через параметри плагіна, і **НЕ ПРАЦЮВАТИМЕ**, якщо ви встановите папки в методах
:::

### `createJsonReportFiles` **(НОВЕ)**

-   **Тип:** `boolean`
-   **Обов'язково:** Ні
-   **За замовчуванням:** `false`

Тепер ви маєте можливість експортувати результати порівняння у файл звіту JSON. Надавши опцію `createJsonReportFiles: true`, для кожного порівняного зображення буде створено звіт, збережений у папці `actual`, поруч із кожним результатом зображення `actual`. Вихідні дані будуть виглядати так:

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

Після виконання всіх тестів буде створено новий файл JSON зі збіркою порівнянь, який можна знайти в корені папки `actual`. Дані згруповані за:

-   `describe` для Jasmine/Mocha або `Feature` для CucumberJS
-   `it` для Jasmine/Mocha або `Scenario` для CucumberJS
    і потім відсортовані за:
-   `commandName`, які є назвами методів порівняння, що використовуються для порівняння зображень
-   `instanceData`, спочатку браузер, потім пристрій, потім платформа
    це виглядатиме так

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

Дані звіту нададуть вам можливість створити власний візуальний звіт без необхідності самостійно виконувати всю магію та збір даних.

:::info ПРИМІТКА
Вам потрібно використовувати `@wdio/visual-testing` версії `5.2.0` або вище
:::

### `disableBlinkingCursor`

-   **Тип:** `boolean`
-   **Обов'язково:** Ні
-   **За замовчуванням:** `false`
-   **Підтримувані контексти додатків:** Web, Hybrid App (Webview)

Увімкнути/вимкнути "блимання" курсору для всіх елементів `input`, `textarea`, `[contenteditable]` у додатку. Якщо встановлено значення `true`, курсор буде встановлено на `transparent` перед створенням знімка
і скинуто після завершення

### `disableCSSAnimation`

-   **Тип:** `boolean`
-   **Обов'язково:** Ні
-   **За замовчуванням:** `false`
-   **Підтримувані контексти додатків:** Web, Hybrid App (Webview)

Увімкнути/вимкнути всі CSS-анімації в додатку. Якщо встановлено значення `true`, всі анімації будуть вимкнені перед створенням знімка
і скинуті після завершення

### `enableLayoutTesting`

-   **Тип:** `boolean`
-   **Обов'язково:** Ні
-   **За замовчуванням:** `false`
-   **Підтримувані контексти додатків:** Web

Це приховає весь текст на сторінці, тому для порівняння буде використовуватися лише макет. Приховування буде виконано шляхом додавання стилю `'color': 'transparent !important'` до **кожного** елемента.

Для виведення див. [Вихідні дані тесту](/docs/visual-testing/test-output#enablelayouttesting)

:::info
При використанні цього прапорця кожен елемент, який містить текст (тобто не тільки `p, h1, h2, h3, h4, h5, h6, span, a, li`, але й `div|button|..`), отримає цю властивість. **Немає** можливості налаштувати це.
:::

### `formatImageName`

-   **Тип:** `string`
-   **Обов'язково:** Ні
-   **За замовчуванням:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **Підтримувані контексти додатків:** Web, Hybrid App (Webview), Native App

Ім'я збережених зображень можна налаштувати, передавши параметр `formatImageName` з форматним рядком, наприклад:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

Наступні змінні можуть бути передані для форматування рядка та будуть автоматично зчитані з можливостей екземпляра.
Якщо вони не можуть бути визначені, будуть використані значення за замовчуванням.

-   `browserName`: Назва браузера в наданих можливостях
-   `browserVersion`: Версія браузера, вказана в можливостях
-   `deviceName`: Назва пристрою з можливостей
-   `dpr`: Співвідношення пікселів пристрою
-   `height`: Висота екрану
-   `logName`: Назва журналу з можливостей
-   `mobile`: Це додасть `_app` або назву браузера після `deviceName` для розрізнення знімків додатка від знімків браузера
-   `platformName`: Назва платформи в наданих можливостях
-   `platformVersion`: Версія платформи, вказана в можливостях
-   `tag`: Тег, який надається в методах, що викликаються
-   `width`: Ширина екрану

:::info

Ви не можете надавати власні шляхи/папки в `formatImageName`. Якщо ви хочете змінити шлях, будь ласка, перевірте зміну наступних опцій:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- [`folderOptions`](/docs/visual-testing/method-options#folder-options) для кожного методу

:::

### `fullPageScrollTimeout`

-   **Тип:** `number`
-   **Обов'язково:** Ні
-   **За замовчуванням:** `1500`
-   **Підтримувані контексти додатків:** Web

Час очікування в мілісекундах після прокрутки. Це може допомогти ідентифікувати сторінки з лінивим завантаженням.

:::info

Це працюватиме лише коли параметр сервісу/методу `userBasedFullPageScreenshot` встановлено на `true`, див. також [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)

:::

### `hideScrollBars`

-   **Тип:** `boolean`
-   **Обов'язково:** Ні
-   **За замовчуванням:** `true`
-   **Підтримувані контексти додатків:** Web, Hybrid App (Webview)

Приховати смуги прокрутки в додатку. Якщо встановлено значення true, всі смуги прокрутки будуть вимкнені перед створенням знімка. За замовчуванням встановлено на `true` для запобігання додатковим проблемам.

### `logLevel`

-   **Тип:** `string`
-   **Обов'язково:** Ні
-   **За замовчуванням:** `info`
-   **Підтримувані контексти додатків:** Web, Hybrid App (Webview), Native App

Додає додаткові журнали, опції: `debug | info | warn | silent`

Помилки завжди виводяться в консоль.

### `savePerInstance`

-   **Тип:** `boolean`
-   **За замовчуванням:** `false`
-   **Обов'язково:** ні
-   **Підтримувані контексти додатків:** Web, Hybrid App (Webview), Native App

Зберігати зображення для кожного екземпляра в окремій папці, щоб, наприклад, всі знімки Chrome зберігалися в папці Chrome, наприклад `desktop_chrome`.

### `screenshotPath`

-   **Тип:** `string | () => string`
-   **За замовчуванням:** `.tmp/`
-   **Обов'язково:** ні
-   **Підтримувані контексти додатків:** Web, Hybrid App (Webview), Native App

Директорія, яка міститиме всі фактичні/різні знімки екрану. Якщо не встановлено, буде використовуватися значення за замовчуванням. Функція, що
повертає рядок, також може використовуватися для встановлення значення screenshotPath:

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// АБО
{
    screenshotPath: () => {
        // Виконуємо якусь магію тут
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

### `toolBarShadowPadding`

-   **Тип:** `number`
-   **Обов'язково:** Ні
-   **За замовчуванням:** `6` для Android та `15` для iOS (`6` за замовчуванням і `9` буде додано автоматично для можливої домашньої панелі на iPhone з вирізом або на iPad, які мають домашню панель)
-   **Підтримувані контексти додатків:** Web

Відступ, який потрібно додати до панелі інструментів на iOS та Android, щоб правильно вирізати область перегляду.

### `userBasedFullPageScreenshot`

-   **Тип:** `boolean`
-   **Обов'язково:** Ні
-   **За замовчуванням:** `false`
-   **Підтримувані контексти додатків:** Web, Hybrid App (Webview) **Представлено в visual-service@7.0.0**

За замовчуванням, повносторінкові знімки екрана на настільному вебі захоплюються за допомогою протоколу WebDriver BiDi, який забезпечує швидкі, стабільні та послідовні знімки без прокрутки.
Коли userBasedFullPageScreenshot встановлено на true, процес знімка екрана імітує реального користувача: прокрутка сторінки, захоплення знімків розміром з область перегляду та їх зшивання. Цей метод корисний для сторінок із вмістом, що завантажується лінивим способом, або динамічного рендерингу, який залежить від позиції прокрутки.

Використовуйте цю опцію, якщо ваша сторінка залежить від завантаження вмісту під час прокрутки або якщо ви хочете зберегти поведінку старіших методів знімка екрана.

### `waitForFontsLoaded`

-   **Тип:** `boolean`
-   **Обов'язково:** Ні
-   **За замовчуванням:** `true`
-   **Підтримувані контексти додатків:** Web, Hybrid App (Webview)

Шрифти, включаючи шрифти третіх сторін, можуть завантажуватися синхронно або асинхронно. Асинхронне завантаження означає, що шрифти можуть завантажитися після того, як WebdriverIO визначить, що сторінка повністю завантажена. Щоб запобігти проблемам із відображенням шрифтів, цей модуль за замовчуванням чекатиме завантаження всіх шрифтів перед створенням знімка.

## Опції вкладок

:::info ПРИМІТКА

Цей модуль також підтримує малювання того, як користувач міг би використовувати клавіатуру для переходу _вкладками_ по веб-сайту, малюючи лінії та крапки від елемента вкладки до елемента вкладки.<br/>
Робота натхненна блогом [Viv Richards](https://github.com/vivrichards600) та його статтею ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).<br/>
Спосіб вибору елементів вкладок заснований на модулі [tabbable](https://github.com/davidtheclark/tabbable). Якщо є будь-які проблеми щодо вкладок, будь ласка, перевірте [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) і особливо [розділ More details](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

### `tabbableOptions`

-   **Тип:** `object`
-   **Обов'язково:** Ні
-   **За замовчуванням:** Див. [тут](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всіх значень за замовчуванням
-   **Підтримувані контексти додатків:** Web

Опції, які можна змінити для ліній і крапок, якщо ви використовуєте методи `{save|check}Tabbable`. Опції пояснюються нижче.

#### `tabbableOptions.circle`

-   **Тип:** `object`
-   **Обов'язково:** Ні
-   **За замовчуванням:** Див. [тут](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всіх значень за замовчуванням
-   **Підтримувані контексти додатків:** Web

Опції для зміни кола.

##### `tabbableOptions.circle.backgroundColor`

-   **Тип:** `string`
-   **Обов'язково:** Ні
-   **За замовчуванням:** Див. [тут](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всіх значень за замовчуванням
-   **Підтримувані контексти додатків:** Web

Фоновий колір кола.

##### `tabbableOptions.circle.borderColor`

-   **Тип:** `string`
-   **Обов'язково:** Ні
-   **За замовчуванням:** Див. [тут](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всіх значень за замовчуванням
-   **Підтримувані контексти додатків:** Web

Колір рамки кола.

##### `tabbableOptions.circle.borderWidth`

-   **Тип:** `number`
-   **Обов'язково:** Ні
-   **За замовчуванням:** Див. [тут](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всіх значень за замовчуванням
-   **Підтримувані контексти додатків:** Web

Ширина рамки кола.

##### `tabbableOptions.circle.fontColor`

-   **Тип:** `string`
-   **Обов'язково:** Ні
-   **За замовчуванням:** Див. [тут](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всіх значень за замовчуванням
-   **Підтримувані контексти додатків:** Web

Колір шрифту тексту в колі. Це буде показано, тільки якщо [`showNumber`](./#tabbableoptionscircleshownumber) встановлено на `true`.

##### `tabbableOptions.circle.fontFamily`

-   **Тип:** `string`
-   **Обов'язково:** Ні
-   **За замовчуванням:** Див. [тут](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всіх значень за замовчуванням
-   **Підтримувані контексти додатків:** Web

Сімейство шрифту тексту в колі. Це буде показано, тільки якщо [`showNumber`](./#tabbableoptionscircleshownumber) встановлено на `true`.

Переконайтеся, що встановлені шрифти підтримуються браузерами.

##### `tabbableOptions.circle.fontSize`

-   **Тип:** `number`
-   **Обов'язково:** Ні
-   **За замовчуванням:** Див. [тут](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всіх значень за замовчуванням
-   **Підтримувані контексти додатків:** Web

Розмір шрифту тексту в колі. Це буде показано, тільки якщо [`showNumber`](./#tabbableoptionscircleshownumber) встановлено на `true`.

##### `tabbableOptions.circle.size`

-   **Тип:** `number`
-   **Обов'язково:** Ні
-   **За замовчуванням:** Див. [тут](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всіх значень за замовчуванням
-   **Підтримувані контексти додатків:** Web

Розмір кола.

##### `tabbableOptions.circle.showNumber`

-   **Тип:** `showNumber`
-   **Обов'язково:** Ні
-   **За замовчуванням:** Див. [тут](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всіх значень за замовчуванням
-   **Підтримувані контексти додатків:** Web

Показати номер послідовності вкладки в колі.

#### `tabbableOptions.line`

-   **Тип:** `object`
-   **Обов'язково:** Ні
-   **За замовчуванням:** Див. [тут](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всіх значень за замовчуванням
-   **Підтримувані контексти додатків:** Web

Опції для зміни лінії.

##### `tabbableOptions.line.color`

-   **Тип:** `string`
-   **Обов'язково:** Ні
-   **За замовчуванням:** Див. [тут](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всіх значень за замовчуванням
-   **Підтримувані контексти додатків:** Web

Колір лінії.

##### `tabbableOptions.line.width`

-   **Тип:** `number`
-   **Обов'язково:** Ні
-   **За замовчуванням:** Див. [тут](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всіх значень за замовчуванням
-   **Підтримувані контексти додатків:** Web

Ширина лінії.

## Опції порівняння

### `compareOptions`

-   **Тип:** `object`
-   **Обов'язково:** Ні
-   **За замовчуванням:** Див. [тут](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) для всіх значень за замовчуванням
-   **Підтримувані контексти додатків:** Web, Hybrid App (Webview), Native App (Див. [Опції методу порівняння](./method-options#compare-check-options) для отримання додаткової інформації)

Опції порівняння також можна встановити як опції сервісу, вони описані в розділі [Опції методу порівняння](/docs/visual-testing/method-options#compare-check-options)