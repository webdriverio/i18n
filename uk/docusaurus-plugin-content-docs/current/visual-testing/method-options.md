---
id: method-options
title: Опції методів
---

Опції методів - це опції, які можна встановити для кожного [методу](./methods). Якщо опція має той самий ключ, що й опція, яка була встановлена під час створення екземпляра плагіна, ця опція методу перевизначить значення опції плагіна.

## Опції збереження

### `disableBlinkingCursor`

-   **Тип:** `boolean`
-   **Обов'язково:** Ні
-   **За замовчуванням:** `false`
-   **Підтримується:** Веб, Гібридні додатки (Webview)

Увімкнути/вимкнути "миготіння" курсора для всіх `input`, `textarea`, `[contenteditable]` в додатку. Якщо встановлено значення `true`, курсор буде встановлено як `transparent` перед знімком екрана
і повернуто до початкового стану після завершення

### `disableCSSAnimation`

-   **Тип:** `boolean`
-   **Обов'язково:** Ні
-   **За замовчуванням:** `false`
-   **Підтримується:** Веб, Гібридні додатки (Webview)

Увімкнути/вимкнути всі CSS-анімації у додатку. Якщо встановлено значення `true`, всі анімації будуть вимкнені перед знімком екрана
і повернуті до початкового стану після завершення

### `enableLayoutTesting`

-   **Тип:** `boolean`
-   **Обов'язково:** Ні
-   **За замовчуванням:** `false`
-   **Використовується з:** Усіма [методами](./methods)
-   **Підтримується:** Веб

Це приховає весь текст на сторінці, щоб для порівняння використовувався лише макет. Приховування відбувається шляхом додавання стилю `'color': 'transparent !important'` до __кожного__ елемента.

Приклад виводу див. [Test Output](./test-output#enablelayouttesting)

:::info
Використовуючи цей прапорець, кожен елемент, який містить текст (не лише `p, h1, h2, h3, h4, h5, h6, span, a, li`, але також `div|button|..`), отримає цю властивість. __Немає__ опцій для налаштування цього.
:::

### `hideScrollBars`

-   **Тип:** `boolean`
-   **Обов'язково:** Ні
-   **За замовчуванням:** `true`
-   **Використовується з:** Усіма [методами](./methods)
-   **Підтримується:** Веб, Гібридні додатки (Webview)

Приховати смуги прокрутки в додатку. Якщо встановлено значення true, всі смуги прокрутки будуть вимкнені перед знімком екрана. За замовчуванням встановлено `true`, щоб запобігти додатковим проблемам.

### `hideElements`

-   **Тип:** `array`
-   **Обов'язково:** ні
-   **Використовується з:** Усіма [методами](./methods)
-   **Підтримується:** Веб, Гібридні додатки (Webview), Нативні додатки

Цей метод може приховати один або кілька елементів, додавши властивість `visibility: hidden` до них, надавши масив елементів.

### `removeElements`

-   **Тип:** `array`
-   **Обов'язково:** ні
-   **Використовується з:** Усіма [методами](./methods)
-   **Підтримується:** Веб, Гібридні додатки (Webview), Нативні додатки

Цей метод може _видалити_ один або кілька елементів, додавши властивість `display: none` до них, надавши масив елементів.

### `resizeDimensions`

-   **Тип:** `object`
-   **Обов'язково:** ні
-   **За замовчуванням:** `{ top: 0, right: 0, bottom: 0, left: 0}`
-   **Використовується з:** Тільки для [`saveElement`](./methods#saveelement) або [`checkElement`](./methods#checkelement)
-   **Підтримується:** Веб, Гібридні додатки (Webview), Нативні додатки

Об'єкт, який повинен містити кількість пікселів `top`, `right`, `bottom` і `left`, які потрібні для збільшення вирізаного елемента.

### `fullPageScrollTimeout`

-   **Тип:** `number`
-   **Обов'язково:** Ні
-   **За замовчуванням:** `1500`
-   **Використовується з:** Тільки для [`saveFullPageScreen`](./methods#savefullpagescreen) або [`saveTabbablePage`](./methods#savetabbablepage)
-   **Підтримується:** Веб

Тайм-аут у мілісекундах для очікування після прокрутки. Це може допомогти ідентифікувати сторінки з лінивим завантаженням.

### `hideAfterFirstScroll`

-   **Тип:** `array`
-   **Обов'язково:** ні
-   **Використовується з:** Тільки для [`saveFullPageScreen`](./methods#savefullpagescreen) або [`saveTabbablePage`](./methods#savetabbablepage)
-   **Підтримується:** Веб

Цей метод приховає один або кілька елементів, додавши властивість `visibility: hidden` до них, надавши масив елементів.
Це буде зручно, коли сторінка, наприклад, містить фіксовані елементи, які прокручуються разом зі сторінкою при прокрутці, але створюють неприємний ефект при знімку всієї сторінки

### `waitForFontsLoaded`

-   **Тип:** `boolean`
-   **Обов'язково:** Ні
-   **За замовчуванням:** `true`
-   **Використовується з:** Усіма [методами](./methods)
-   **Підтримується:** Веб, Гібридні додатки (Webview)

Шрифти, включаючи сторонні шрифти, можуть завантажуватися синхронно або асинхронно. Асинхронне завантаження означає, що шрифти можуть завантажитися після того, як WebdriverIO визначить, що сторінка повністю завантажена. Щоб запобігти проблемам рендерингу шрифтів, цей модуль за замовчуванням чекатиме завантаження всіх шрифтів перед знімком екрана.

## Опції порівняння (перевірки)

Опції порівняння - це опції, які впливають на спосіб виконання порівняння за допомогою [ResembleJS](https://github.com/Huddle/Resemble.js).

:::info ПРИМІТКА

-   Всі опції з [Опцій збереження](#опції-збереження) можуть бути використані для методів порівняння
-   Всі опції порівняння можуть бути використані під час створення екземпляра сервісу __або__ для кожного окремого методу перевірки. Якщо опція методу має той самий ключ, що й опція, яка була встановлена під час створення екземпляра сервісу, то опція порівняння методу перевизначить значення опції порівняння сервісу.
- Всі опції можуть бути використані для:
    - Веб
    - Гібридних додатків
    - Нативних додатків

:::

### `ignoreAlpha`

-   **Тип:** `boolean`
-   **За замовчуванням:** `false`
-   **Обов'язково:** ні

Порівнювати зображення та ігнорувати альфа-канал.

### `blockOutSideBar`

-   **Тип:** `boolean`
-   **За замовчуванням:** `true`
-   **Обов'язково:** ні
-   **Примітка:** _Може використовуватися тільки для `checkScreen()`. Це **тільки для iPad**_

Автоматично блокувати бічну панель для iPad в альбомному режимі під час порівнянь. Це запобігає помилкам на нативному компоненті вкладки/приватності/закладок.

### `blockOutStatusBar`

-   **Тип:** `boolean`
-   **За замовчуванням:** `true`
-   **Обов'язково:** ні
-   **Примітка:** _Це **тільки для мобільних пристроїв**_

Автоматично блокувати рядок стану та адресну панель під час порівнянь. Це запобігає помилкам щодо часу, Wi-Fi або стану батареї.

### `blockOutToolBar`

-   **Тип:** `boolean`
-   **За замовчуванням:** `true`
-   **Обов'язково:** ні
-   **Примітка:** _Це **тільки для мобільних пристроїв**_

Автоматично блокувати панель інструментів.

### `ignoreAntialiasing`

-   **Тип:** `boolean`
-   **За замовчуванням:** `false`
-   **Обов'язково:** ні

Порівнювати зображення та ігнорувати згладжування.

### `ignoreColors`

-   **Тип:** `boolean`
-   **За замовчуванням:** `false`
-   **Обов'язково:** ні

Навіть якщо зображення кольорові, порівняння буде порівнювати 2 чорно-білі зображення

### `ignoreLess`

-   **Тип:** `boolean`
-   **За замовчуванням:** `false`
-   **Обов'язково:** ні

Порівнювати зображення з параметрами `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`

### `ignoreNothing`

-   **Тип:** `boolean`
-   **За замовчуванням:** `false`
-   **Обов'язково:** ні

Порівнювати зображення з параметрами `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`

### `rawMisMatchPercentage`

-   **Тип:** `boolean`
-   **За замовчуванням:** `false`
-   **Обов'язково:** ні

Якщо true, відсоток повернення буде як `0.12345678`, за замовчуванням - `0.12`

### `returnAllCompareData`

-   **Тип:** `boolean`
-   **За замовчуванням:** `false`
-   **Обов'язково:** ні

Це поверне всі дані порівняння, а не лише відсоток невідповідності

### `saveAboveTolerance`

-   **Тип:** `number`
-   **За замовчуванням:** `0`
-   **Обов'язково:** ні

Допустиме значення `misMatchPercentage`, яке запобігає збереженню зображень з відмінностями

### `largeImageThreshold`

-   **Тип:** `number`
-   **За замовчуванням:** `0`
-   **Обов'язково:** ні

Порівняння великих зображень може призвести до проблем з продуктивністю.
При вказанні кількості пікселів (більше 0), алгоритм порівняння пропускає пікселі, коли ширина або висота зображення більша за `largeImageThreshold` пікселів.

### `scaleImagesToSameSize`

-   **Тип:** `boolean`
-   **За замовчуванням:** `false`
-   **Обов'язково:** ні

Масштабує 2 зображення до однакового розміру перед виконанням порівняння. Наполегливо рекомендується увімкнути `ignoreAntialiasing` та `ignoreAlpha`

## Опції папок

Основна папка та папки знімків екрана (actual, diff) - це опції, які можна встановити під час створення екземпляру плагіна або методу. Щоб встановити опції папок для конкретного методу, передайте опції папок до об'єкта опцій методу. Це можна використовувати для:

- Веб
- Гібридних додатків
- Нативних додатків

```ts
import path from 'node:path'

const methodOptions = {
    actualFolder: path.join(process.cwd(), 'customActual'),
    baselineFolder: path.join(process.cwd(), 'customBaseline'),
    diffFolder: path.join(process.cwd(), 'customDiff'),
}

// Ви можете використовувати це для всіх методів
await expect(
    await browser.checkFullPageScreen("checkFullPage", methodOptions)
).toEqual(0)
```

### `actualFolder`

-   **Тип:** `string`
-   **Обов'язково:** ні

Папка для знімка, який був зроблений під час тесту.

### `baselineFolder`

-   **Тип:** `string`
-   **Обов'язково:** ні

Папка для базового зображення, яке використовується для порівняння.

### `diffFolder`

-   **Тип:** `string`
-   **Обов'язково:** ні

Папка для різниці зображень, яку створює ResembleJS.