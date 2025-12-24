---
id: service-options
title: Параметри сервісу
---

Параметри сервісу - це параметри, які можна встановити при інстанціюванні сервісу та які будуть використовуватися для кожного виклику методу.

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

## Параметри за замовчуванням

### `addressBarShadowPadding`

-   **Тип:** `number`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `6`
-   **Підтримувані контексти додатків:** Веб

Відступ, який необхідно додати до адресного рядка на iOS та Android для правильного вирізу області перегляду.

### `autoElementScroll`

-   **Тип:** `boolean`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `true`
-   **Підтримувані контексти додатків:** Веб, Гібридний додаток (Webview)

Цей параметр дозволяє вам вимкнути автоматичне прокручування елемента у поле зору при створенні знімка екрану елемента.

### `addIOSBezelCorners`

-   **Тип:** `boolean`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `false`
-   **Підтримувані контексти додатків:** Веб, Гібридний додаток (Webview), Нативний додаток

Додавання кутів рамки та виїмки/динамічного острову до знімку екрану для пристроїв iOS.

:::info ПРИМІТКА
Це можливо тільки, коли назва пристрою **МОЖЕ** бути автоматично визначена та відповідає наступному списку нормалізованих назв пристроїв. Нормалізація буде виконана цим модулем.
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
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `true`
-   **Підтримувані контексти додатків:** Веб, Гібридний додаток (Webview), Нативний додаток

Якщо під час порівняння не знайдено базового зображення, зображення автоматично копіюється до папки базового зображення.

### `alwaysSaveActualImage`

-   **Тип:** `boolean`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `true`
-   **Підтримувані контексти додатків:** Всі

При встановленні цього параметра на `false`:

- не зберігатиме фактичне зображення, коли **немає** різниці
- не зберігатиме файл jsonreport, коли `createJsonReportFiles` встановлено на `true`. Також у логах з'явиться попередження про те, що `createJsonReportFiles` вимкнено

Це має покращити продуктивність, оскільки файли не записуються в систему, і має забезпечити відсутність зайвого шуму в папці `actual`.

### `baselineFolder`

-   **Тип:** `string|()=> string`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `.path/to/testfile/__snapshots__/`
-   **Підтримувані контексти додатків:** Веб, Гібридний додаток (Webview), Нативний додаток

Каталог, в якому зберігатимуться всі базові зображення, що використовуються під час порівняння. Якщо не встановлено, буде використовуватися значення за замовчуванням, яке зберігатиме файли в папці `__snapshots__/` поруч із специфікацією, яка виконує візуальні тести. Функція, яка повертає `string`, також може використовуватися для встановлення значення `baselineFolder`:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// АБО
{
    baselineFolder: () => {
        // Робимо якусь магію тут
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **Тип:** `boolean`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `false`
-   **Підтримувані контексти додатків:** Веб, Гібридний додаток (Webview), Нативний додаток

Видалення папки runtime (`actual` і `diff`) при ініціалізації

:::info ПРИМІТКА
Це працюватиме, лише коли [`screenshotPath`](#screenshotpath) встановлено через опції плагіна, і **НЕ ПРАЦЮВАТИМЕ**, якщо ви встановлюєте папки в методах
:::

### `createJsonReportFiles` **(НОВЕ)**

-   **Тип:** `boolean`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `false`

Тепер у вас є можливість експортувати результати порівняння у файл звіту JSON. Надавши опцію `createJsonReportFiles: true`, для кожного порівнюваного зображення буде створений звіт, що зберігатиметься в папці `actual` поруч із кожним результатом `actual` зображення. Вивід буде виглядати так:

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

Коли всі тести виконано, буде згенеровано новий JSON-файл із збіркою порівнянь, який можна знайти в корені вашої папки `actual`. Дані згруповані за:

-   `describe` для Jasmine/Mocha або `Feature` для CucumberJS
-   `it` для Jasmine/Mocha або `Scenario` для CucumberJS
    а потім відсортовані за:
-   `commandName`, що є назвами методів порівняння, використаних для порівняння зображень
-   `instanceData`, спочатку браузер, потім пристрій, потім платформа
    це буде виглядати так

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

Дані звіту дадуть вам можливість створити власний візуальний звіт без необхідності самостійно виконувати всю магію та збір даних.

:::info ПРИМІТКА
Вам потрібно використовувати `@wdio/visual-testing` версії `5.2.0` або новішої
:::

### `disableBlinkingCursor`

-   **Тип:** `boolean`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `false`
-   **Підтримувані контексти додатків:** Веб, Гібридний додаток (Webview)

Увімкнути/вимкнути "блимання" курсора у всіх `input`, `textarea`, `[contenteditable]` у додатку. Якщо встановлено `true`, курсор буде встановлено на `transparent` перед створенням знімку екрану та скинуто після завершення

### `disableCSSAnimation`

-   **Тип:** `boolean`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `false`
-   **Підтримувані контексти додатків:** Веб, Гібридний додаток (Webview)

Увімкнути/вимкнути всі CSS-анімації в додатку. Якщо встановлено `true`, всі анімації будуть вимкнені перед створенням знімку екрану та скинуті після завершення

### `enableLayoutTesting`

-   **Тип:** `boolean`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `false`
-   **Підтримувані контексти додатків:** Веб

Це сховає весь текст на сторінці, тому для порівняння буде використовуватися лише макет. Приховування буде здійснено шляхом додавання стилю `'color': 'transparent !important'` до **кожного** елемента.

Для виводу дивіться [Вивід тесту](/docs/visual-testing/test-output#enablelayouttesting)

:::info
Використовуючи цей прапор, кожен елемент, який містить текст (тобто не лише `p, h1, h2, h3, h4, h5, h6, span, a, li`, а й `div|button|..`), отримає цю властивість. **Немає** можливості налаштувати це.
:::

### `formatImageName`

-   **Тип:** `string`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **Підтримувані контексти додатків:** Веб, Гібридний додаток (Webview), Нативний додаток

Назву збережених зображень можна налаштувати, передавши параметр `formatImageName` з форматним рядком, як:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

Наступні змінні можуть бути передані для форматування рядка і будуть автоматично прочитані з можливостей екземпляра.
Якщо їх не можна визначити, будуть використані значення за замовчуванням.

-   `browserName`: Назва браузера в наданих можливостях
-   `browserVersion`: Версія браузера, вказана в можливостях
-   `deviceName`: Назва пристрою з можливостей
-   `dpr`: Співвідношення пікселів пристрою
-   `height`: Висота екрану
-   `logName`: LogName з можливостей
-   `mobile`: Це додасть `_app` або назву браузера після `deviceName`, щоб розрізняти знімки екрану додатків від знімків екрану браузера
-   `platformName`: Назва платформи в наданих можливостях
-   `platformVersion`: Версія платформи, вказана в можливостях
-   `tag`: Тег, який надається в методах, що викликаються
-   `width`: Ширина екрану

:::info

Ви не можете вказати користувацькі шляхи/папки в `formatImageName`. Якщо ви хочете змінити шлях, будь ласка, перевірте зміну наступних параметрів:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- [`folderOptions`](/docs/visual-testing/method-options#folder-options) для кожного методу

:::

### `fullPageScrollTimeout`

-   **Тип:** `number`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `1500`
-   **Підтримувані контексти додатків:** Веб

Таймаут у мілісекундах для очікування після прокрутки. Це може допомогти ідентифікувати сторінки з лінивим завантаженням.

:::info

Це працюватиме лише тоді, коли опція сервісу/методу `userBasedFullPageScreenshot` встановлена на `true`, див. також [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)

:::

### `hideScrollBars`

-   **Тип:** `boolean`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `true`
-   **Підтримувані контексти додатків:** Веб, Гібридний додаток (Webview)

Приховати смуги прокрутки в додатку. Якщо встановлено true, всі смуги прокрутки будуть вимкнені перед створенням знімка екрану. За замовчуванням встановлено `true`, щоб запобігти додатковим проблемам.

### `logLevel`

-   **Тип:** `string`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `info`
-   **Підтримувані контексти додатків:** Веб, Гібридний додаток (Webview), Нативний додаток

Додає додаткові логи, опції: `debug | info | warn | silent`

Помилки завжди виводяться в консоль.

### `savePerInstance`

-   **Тип:** `boolean`
-   **За замовчуванням:** `false`
-   **Обов'язковий:** ні
-   **Підтримувані контексти додатків:** Веб, Гібридний додаток (Webview), Нативний додаток

Зберігати зображення для кожного екземпляра в окремій папці, так що, наприклад, всі знімки екрану Chrome будуть збережені в папці Chrome, як `desktop_chrome`.

### `screenshotPath`

-   **Тип:** `string | () => string`
-   **За замовчуванням:** `.tmp/`
-   **Обов'язковий:** ні
-   **Підтримувані контексти додатків:** Веб, Гібридний додаток (Webview), Нативний додаток

Каталог, в якому будуть зберігатися всі фактичні/різні знімки екрану. Якщо не встановлено, буде використовуватися значення за замовчуванням. Функція, яка повертає рядок, також може бути використана для встановлення значення screenshotPath:

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// АБО
{
    screenshotPath: () => {
        // Робимо якусь магію тут
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

### `toolBarShadowPadding`

-   **Тип:** `number`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `6` для Android та `15` для iOS (`6` за замовчуванням і `9` буде додано автоматично для можливої домашньої панелі на iPhone з виїмкою або iPad, які мають домашню панель)
-   **Підтримувані контексти додатків:** Веб

Відступ, який потрібно додати до панелі інструментів на iOS та Android для правильного вирізу області перегляду.

### `userBasedFullPageScreenshot`

-   **Тип:** `boolean`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `false`
-   **Підтримувані контексти додатків:** Веб, Гібридний додаток (Webview) **Введено у visual-service@7.0.0**

За замовчуванням, знімки екрану повної сторінки на настільному вебі створюються за допомогою протоколу WebDriver BiDi, який забезпечує швидкі, стабільні та послідовні знімки екрану без прокрутки.
Коли userBasedFullPageScreenshot встановлено на true, процес створення знімка екрану імітує дії реального користувача: прокрутку через сторінку, захоплення знімків екрану розміром з область перегляду та їх зшивання. Цей метод корисний для сторінок із вмістом, що завантажується ліниво, або з динамічним рендерингом, який залежить від позиції прокрутки.

Використовуйте цю опцію, якщо ваша сторінка залежить від завантаження вмісту під час прокрутки або якщо ви хочете зберегти поведінку старіших методів створення знімків екрану.

### `waitForFontsLoaded`

-   **Тип:** `boolean`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `true`
-   **Підтримувані контексти додатків:** Веб, Гібридний додаток (Webview)

Шрифти, включаючи сторонні шрифти, можуть завантажуватися синхронно або асинхронно. Асинхронне завантаження означає, що шрифти можуть завантажуватися після того, як WebdriverIO визначить, що сторінка повністю завантажена. Щоб запобігти проблемам з рендерингом шрифтів, цей модуль, за замовчуванням, буде чекати, поки всі шрифти завантажаться, перш ніж робити знімок екрану.

## Опції Tabbable

:::info ПРИМІТКА

Цей модуль також підтримує візуалізацію шляху, яким користувач використовував би свою клавіатуру для _переходу_ через веб-сайт, малюючи лінії та точки від одного елемента, доступного через Tab, до іншого.<br/>
Робота натхненна блог-постом [Viv Richards](https://github.com/vivrichards600) про ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).<br/>
Спосіб вибору елементів, доступних через Tab, базується на модулі [tabbable](https://github.com/davidtheclark/tabbable). Якщо є будь-які проблеми щодо переходу через Tab, будь ласка, перевірте [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) і особливо [розділ з додатковими деталями](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

### `tabbableOptions`

-   **Тип:** `object`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** Дивіться [тут](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всіх значень за замовчуванням
-   **Підтримувані контексти додатків:** Веб

Опції, які можна змінити для ліній і точок, якщо ви використовуєте методи `{save|check}Tabbable`. Опції пояснюються нижче.

#### `tabbableOptions.circle`

-   **Тип:** `object`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** Дивіться [тут](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всіх значень за замовчуванням
-   **Підтримувані контексти додатків:** Веб

Опції для зміни кола.

##### `tabbableOptions.circle.backgroundColor`

-   **Тип:** `string`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** Дивіться [тут](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всіх значень за замовчуванням
-   **Підтримувані контексти додатків:** Веб

Колір фону кола.

##### `tabbableOptions.circle.borderColor`

-   **Тип:** `string`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** Дивіться [тут](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всіх значень за замовчуванням
-   **Підтримувані контексти додатків:** Веб

Колір рамки кола.

##### `tabbableOptions.circle.borderWidth`

-   **Тип:** `number`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** Дивіться [тут](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всіх значень за замовчуванням
-   **Підтримувані контексти додатків:** Веб

Ширина рамки кола.

##### `tabbableOptions.circle.fontColor`

-   **Тип:** `string`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** Дивіться [тут](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всіх значень за замовчуванням
-   **Підтримувані контексти додатків:** Веб

Колір шрифту тексту в колі. Це буде показано тільки якщо [`showNumber`](./#tabbableoptionscircleshownumber) встановлено на `true`.

##### `tabbableOptions.circle.fontFamily`

-   **Тип:** `string`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** Дивіться [тут](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всіх значень за замовчуванням
-   **Підтримувані контексти додатків:** Веб

Сімейство шрифту тексту в колі. Це буде показано тільки якщо [`showNumber`](./#tabbableoptionscircleshownumber) встановлено на `true`.

Переконайтесь, що встановлені шрифти підтримуються браузерами.

##### `tabbableOptions.circle.fontSize`

-   **Тип:** `number`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** Дивіться [тут](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всіх значень за замовчуванням
-   **Підтримувані контексти додатків:** Веб

Розмір шрифту тексту в колі. Це буде показано тільки якщо [`showNumber`](./#tabbableoptionscircleshownumber) встановлено на `true`.

##### `tabbableOptions.circle.size`

-   **Тип:** `number`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** Дивіться [тут](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всіх значень за замовчуванням
-   **Підтримувані контексти додатків:** Веб

Розмір кола.

##### `tabbableOptions.circle.showNumber`

-   **Тип:** `showNumber`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** Дивіться [тут](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всіх значень за замовчуванням
-   **Підтримувані контексти додатків:** Веб

Показати номер послідовності Tab в колі.

#### `tabbableOptions.line`

-   **Тип:** `object`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** Дивіться [тут](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всіх значень за замовчуванням
-   **Підтримувані контексти додатків:** Веб

Опції для зміни лінії.

##### `tabbableOptions.line.color`

-   **Тип:** `string`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** Дивіться [тут](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всіх значень за замовчуванням
-   **Підтримувані контексти додатків:** Веб

Колір лінії.

##### `tabbableOptions.line.width`

-   **Тип:** `number`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** Дивіться [тут](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) для всіх значень за замовчуванням
-   **Підтримувані контексти додатків:** Веб

Ширина лінії.

## Параметри порівняння

### `compareOptions`

-   **Тип:** `object`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** Дивіться [тут](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) для всіх значень за замовчуванням
-   **Підтримувані контексти додатків:** Веб, Гібридний додаток (Webview), Нативний додаток (Дивіться [Параметри порівняння методу](./method-options#compare-check-options) для отримання додаткової інформації)

Параметри порівняння також можна встановити як параметри сервісу, вони описані в [Параметрах порівняння методу](/docs/visual-testing/method-options#compare-check-options)