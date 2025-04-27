---
id: service-options
title: Опції сервісу
---

Опції сервісу - це опції, що можуть бути встановлені при створенні екземпляра сервісу і будуть використовуватися для кожного виклику методу.

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
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `6`
-   **Підтримується:** Web

Відступ, який потрібно додати до адресного рядка на iOS та Android для правильного вирізання області перегляду.

### `autoElementScroll`

-   **Тип:** `boolean`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `true`
-   **Підтримується:** Web, Hybrid App (Webview)

Ця опція дозволяє вимкнути автоматичне прокручування елемента у видиму область під час створення знімка екрана елемента.

### `addIOSBezelCorners`

-   **Тип:** `boolean`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `false`
-   **Підтримується:** Web, Hybrid App (Webview), Native App

Додає кути рамки та виріз/динамічний острів до знімка екрана для iOS пристроїв.

:::info ПРИМІТКА
Це можна зробити лише у випадку, коли назву пристрою **МОЖНА** автоматично визначити, і вона відповідає наведеному нижче списку нормалізованих назв пристроїв. Нормалізація буде виконана цим модулем.
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
-   **Підтримується:** Web, Hybrid App (Webview), Native App

Якщо базового зображення не знайдено під час порівняння, зображення автоматично копіюється в папку з базовими зображеннями.

### `baselineFolder`

-   **Тип:** `string|()=> string`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `.path/to/testfile/__snapshots__/`
-   **Підтримується:** Web, Hybrid App (Webview), Native App

Директорія, що міститиме всі базові зображення, які використовуються під час порівняння. Якщо не встановлено, використовуватиметься значення за замовчуванням, яке зберігає файли в папці `__snapshots__/` поруч зі специфікацією, яка виконує візуальні тести. Також можна використовувати функцію, яка повертає `string`, для встановлення значення `baselineFolder`:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// OR
{
    baselineFolder: () => {
        // Do some magic here
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **Тип:** `boolean`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `false`
-   **Підтримується:** Web, Hybrid App (Webview), Native App

Видаляти папку часу виконання (`actual` і `diff`) під час ініціалізації

:::info ПРИМІТКА
Це працюватиме лише коли [`screenshotPath`](#screenshotpath) встановлено через опції плагіна, і **НЕ ПРАЦЮВАТИМЕ**, якщо ви встановлюєте папки в методах
:::

### `createJsonReportFiles` **(НОВЕ)**

-   **Тип:** `boolean`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `false`

Тепер у вас є можливість експортувати результати порівняння у файл звіту JSON. Надавши опцію `createJsonReportFiles: true`, для кожного зображення, яке порівнюється, буде створено звіт, який зберігається в папці `actual`, поруч із кожним результатом зображення `actual`. Вивід виглядатиме так:

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

Після виконання всіх тестів буде створено новий JSON-файл з колекцією порівнянь, який можна знайти в корені папки `actual`. Дані згруповані за:

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

Дані звіту дадуть вам можливість створити власний візуальний звіт без необхідності робити всю магію та збір даних самостійно.

:::info ПРИМІТКА
Вам потрібно використовувати `@wdio/visual-testing` версії `5.2.0` або вище
:::

### `disableBlinkingCursor`

-   **Тип:** `boolean`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `false`
-   **Підтримується:** Web, Hybrid App (Webview)

Увімкнути/вимкнути "блимання" курсора у всіх `input`, `textarea`, `[contenteditable]` у застосунку. Якщо встановлено значення `true`, курсор буде встановлено на `transparent` перед створенням знімка
і відновлено після завершення

### `disableCSSAnimation`

-   **Тип:** `boolean`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `false`
-   **Підтримується:** Web, Hybrid App (Webview)

Увімкнути/вимкнути всі CSS-анімації в застосунку. Якщо встановлено значення `true`, всі анімації будуть вимкнені перед створенням знімка
і відновлені після завершення

### `enableLayoutTesting`

-   **Тип:** `boolean`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `false`
-   **Підтримується:** Web

Це приховає весь текст на сторінці, тому для порівняння використовуватиметься тільки макет. Приховування буде здійснено шляхом додавання стилю `'color': 'transparent !important'` до **кожного** елемента.

Для виводу див. [Тестовий вивід](/docs/visual-testing/test-output#enablelayouttesting)

:::info
Використовуючи цей прапорець, кожен елемент, який містить текст (тобто не тільки `p, h1, h2, h3, h4, h5, h6, span, a, li`, але також `div|button|..`), отримає цю властивість. **Немає** можливості налаштувати це.
:::

### `formatImageName`

-   **Тип:** `string`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **Підтримується:** Web, Hybrid App (Webview), Native App

Назву збережених зображень можна налаштувати, передавши параметр `formatImageName` із рядком формату, наприклад:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

Наступні змінні можна передати для форматування рядка, і вони будуть автоматично зчитані з можливостей екземпляра.
Якщо їх неможливо визначити, використовуватимуться значення за замовчуванням.

-   `browserName`: Назва браузера в наданих можливостях
-   `browserVersion`: Версія браузера в наданих можливостях
-   `deviceName`: Назва пристрою з можливостей
-   `dpr`: Співвідношення пікселів пристрою
-   `height`: Висота екрану
-   `logName`: LogName з можливостей
-   `mobile`: Це додасть `_app` або назву браузера після `deviceName`, щоб відрізнити знімки екрана застосунку від знімків екрана браузера
-   `platformName`: Назва платформи в наданих можливостях
-   `platformVersion`: Версія платформи в наданих можливостях
-   `tag`: Тег, який надається в методах, що викликаються
-   `width`: Ширина екрану

:::info

Ви не можете вказати власні шляхи/папки в `formatImageName`. Якщо ви хочете змінити шлях, перевірте зміну наступних опцій:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- [`folderOptions`](/docs/visual-testing/method-options#folder-options) для кожного методу

:::

### `fullPageScrollTimeout`

-   **Тип:** `number`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `1500`
-   **Підтримується:** Web

Час очікування в мілісекундах після прокрутки. Це може допомогти ідентифікувати сторінки з відкладеним завантаженням.

:::info

Це працюватиме лише якщо опція сервісу/методу `userBasedFullPageScreenshot` встановлена на `true`, див. також [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)

:::

### `hideScrollBars`

-   **Тип:** `boolean`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `true`
-   **Підтримується:** Web, Hybrid App (Webview)

Приховати смуги прокрутки в застосунку. Якщо встановлено значення true, всі смуги прокрутки будуть вимкнені перед створенням знімка. Це встановлено за замовчуванням на `true`, щоб запобігти додатковим проблемам.

### `logLevel`

-   **Тип:** `string`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `info`
-   **Підтримується:** Web, Hybrid App (Webview), Native App

Додає додаткові журнали, опції: `debug | info | warn | silent`

Помилки завжди виводяться в консоль.

### `savePerInstance`

-   **Тип:** `boolean`
-   **За замовчуванням:** `false`
-   **Обов'язковий:** Ні
-   **Підтримується:** Web, Hybrid App (Webview), Native App

Зберігати зображення для кожного екземпляра в окремій папці, наприклад, всі знімки екрана Chrome будуть збережені в папці Chrome, наприклад, `desktop_chrome`.

### `screenshotPath`

-   **Тип:** `string | () => string`
-   **За замовчуванням:** `.tmp/`
-   **Обов'язковий:** Ні
-   **Підтримується:** Web, Hybrid App (Webview), Native App

Директорія, яка міститиме всі фактичні/різні знімки екрана. Якщо не встановлено, використовуватиметься значення за замовчуванням. Функцію, що повертає рядок, також можна використовувати для встановлення значення screenshotPath:

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// OR
{
    screenshotPath: () => {
        // Do some magic here
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

### `toolBarShadowPadding`

-   **Тип:** `number`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `6` для Android та `15` для iOS (`6` за замовчуванням і `9` буде додано автоматично для можливого домашнього бару на iPhone з вирізом або iPad, які мають домашній бар)
-   **Підтримується:** Web

Відступ, який потрібно додати до панелі інструментів на iOS та Android для правильного вирізання області перегляду.

### `userBasedFullPageScreenshot`

-   **Тип:** `boolean`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `false`
-   **Підтримується:** Web, Hybrid App (Webview) **Запроваджено у visual-service@7.0.0**

За замовчуванням знімки повної сторінки на настільному веб-інтерфейсі робляться за допомогою протоколу WebDriver BiDi, що забезпечує швидкі, стабільні та узгоджені знімки екрана без прокрутки.
Коли userBasedFullPageScreenshot встановлено на true, процес знімка імітує реального користувача: прокручує сторінку, робить знімки екрана розміром з вікно перегляду та зшиває їх разом. Цей метод корисний для сторінок із вмістом, що завантажується ліниво, або динамічним рендерингом, який залежить від положення прокрутки.

Використовуйте цю опцію, якщо ваша сторінка покладається на завантаження вмісту під час прокрутки або якщо ви хочете зберегти поведінку старіших методів знімків екрана.

### `waitForFontsLoaded`

-   **Тип:** `boolean`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `true`
-   **Підтримується:** Web, Hybrid App (Webview)

Шрифти, включаючи сторонні шрифти, можуть завантажуватися синхронно або асинхронно. Асинхронне завантаження означає, що шрифти можуть завантажитися після того, як WebdriverIO визначить, що сторінка повністю завантажена. Щоб запобігти проблемам відображення шрифтів, цей модуль за замовчуванням чекатиме, доки всі шрифти завантажаться, перш ніж робити знімок екрана.

## Опції табуляції

:::info ПРИМІТКА

Цей модуль також підтримує відображення способу, яким користувач використовує свою клавіатуру для навігації _Tab_ через веб-сайт, малюючи лінії та точки від елемента, що підтримує табуляцію, до елемента, що підтримує табуляцію.<br/>
Робота натхненна постом у блозі [Viv Richards](https://github.com/vivrichards600) про ["АВТОМАТИЗАЦІЮ СТОРІНКИ ТАБУЛАЦІЇ (ЦЕ СЛОВО?) З ВІЗУАЛЬНИМ ТЕСТУВАННЯМ"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).<br/>
Спосіб вибору елементів, що підтримують табуляцію, базується на модулі [tabbable](https://github.com/davidtheclark/tabbable). Якщо є проблеми з табуляцією, перевірте [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) і особливо [розділ Більше деталей](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

### `tabbableOptions`

-   **Тип:** `object`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** Див. [тут](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) для всіх значень за замовчуванням
-   **Підтримується:** Web

Опції, які можна змінити для ліній і точок, якщо ви використовуєте методи `{save|check}Tabbable`. Опції пояснюються нижче.

#### `tabbableOptions.circle`

-   **Тип:** `object`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** Див. [тут](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) для всіх значень за замовчуванням
-   **Підтримується:** Web

Опції для зміни кола.

##### `tabbableOptions.circle.backgroundColor`

-   **Тип:** `string`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** Див. [тут](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) для всіх значень за замовчуванням
-   **Підтримується:** Web

Колір фону кола.

##### `tabbableOptions.circle.borderColor`

-   **Тип:** `string`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** Див. [тут](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) для всіх значень за замовчуванням
-   **Підтримується:** Web

Колір межі кола.

##### `tabbableOptions.circle.borderWidth`

-   **Тип:** `number`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** Див. [тут](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) для всіх значень за замовчуванням
-   **Підтримується:** Web

Ширина межі кола.

##### `tabbableOptions.circle.fontColor`

-   **Тип:** `string`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** Див. [тут](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) для всіх значень за замовчуванням
-   **Підтримується:** Web

Колір шрифту тексту в колі. Це буде показано лише якщо [`showNumber`](./#tabbableoptionscircleshownumber) встановлено на `true`.

##### `tabbableOptions.circle.fontFamily`

-   **Тип:** `string`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** Див. [тут](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) для всіх значень за замовчуванням
-   **Підтримується:** Web

Сімейство шрифту тексту в колі. Це буде показано лише якщо [`showNumber`](./#tabbableoptionscircleshownumber) встановлено на `true`.

Переконайтеся, що використовуєте шрифти, які підтримуються браузерами.

##### `tabbableOptions.circle.fontSize`

-   **Тип:** `number`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** Див. [тут](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) для всіх значень за замовчуванням
-   **Підтримується:** Web

Розмір шрифту тексту в колі. Це буде показано лише якщо [`showNumber`](./#tabbableoptionscircleshownumber) встановлено на `true`.

##### `tabbableOptions.circle.size`

-   **Тип:** `number`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** Див. [тут](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) для всіх значень за замовчуванням
-   **Підтримується:** Web

Розмір кола.

##### `tabbableOptions.circle.showNumber`

-   **Тип:** `showNumber`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** Див. [тут](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) для всіх значень за замовчуванням
-   **Підтримується:** Web

Показувати номер послідовності табуляції в колі.

#### `tabbableOptions.line`

-   **Тип:** `object`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** Див. [тут](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) для всіх значень за замовчуванням
-   **Підтримується:** Web

Опції для зміни лінії.

##### `tabbableOptions.line.color`

-   **Тип:** `string`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** Див. [тут](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) для всіх значень за замовчуванням
-   **Підтримується:** Web

Колір лінії.

##### `tabbableOptions.line.width`

-   **Тип:** `number`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** Див. [тут](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) для всіх значень за замовчуванням
-   **Підтримується:** Web

Ширина лінії.

## Опції порівняння

### `compareOptions`

-   **Тип:** `object`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** Див. [тут](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) для всіх значень за замовчуванням
-   **Підтримується:** Web, Hybrid App (Webview), Native App (Див. [Опції порівняння методів](./method-options#compare-check-options) для більш детальної інформації)

Опції порівняння також можуть бути встановлені як опції сервісу, вони описані в [Опціях порівняння методів](/docs/visual-testing/method-options#compare-check-options)