---
id: test-output
title: Тестовый вывод
---

:::info

[Этот демонстрационный сайт WebdriverIO](https://guinea-pig.webdriver.io/image-compare.html) использовался для примеров изображений.

:::

## `enableLayoutTesting`

Это можно установить как в [Опциях сервиса](./service-options#enablelayouttesting), так и на [уровне метода](./method-options).

```js
// wdio.conf.(js|ts)
export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            'visual',
            {
                enableLayoutTesting: true
            }
        ]
    ]
    // ...
}
```

Вывод изображения для [Опций сервиса](./service-options#enablelayouttesting) идентичен [Методу](./method-options), смотрите ниже.

### Вывод изображения

<Tabs
    defaultValue="saveelement"
    values={[
        {label: 'saveElement | checkElement', value: 'saveelement'},
        {label: 'saveScreen | checkScreen', value: 'savescreen'},
        {label: 'saveFullPageScreen | checkFullPageScreen', value: 'savefullpagescreen'},
        {label: 'saveTabbablePage | checkTabbablePage', value: 'saveTabbablePage'},
    ]}
>
<TabItem value="saveelement">

```js
await browser.saveElement(".features_vqN4", "example-element-tag", {enableLayoutTesting: true})
// Or
await browser.checkElement(".features_vqN4", "example-element-tag", {enableLayoutTesting: true})
```

![saveElement Desktop](/img/visual/layout-element-local-chrome-latest-1366x768.png)

</TabItem>

<TabItem value="savescreen">

```js
await browser.saveScreen("example-page-tag")
```

![saveScreen Desktop](/img/visual/layout-viewportScreenshot-chrome-latest-1366x768.png)

</TabItem>

<TabItem value="savefullpagescreen">

```js
await browser.saveFullPageScreen("full-page-tag")
// Or
await browser.checkFullPageScreen("full-page-tag", {enableLayoutTesting: true})
```

![saveFullPageScreens Desktop](/img/visual/layout-fullPage-chrome-latest-1366x768.png)

</TabItem>

<TabItem value="saveTabbablePage">

```js
await browser.saveTabbablePage("tabbable-page-tag")
// Or
await browser.checkTabbablePage("tabbable-page-tag", {enableLayoutTesting: true})
```

![saveFullPageScreens Desktop](/img/visual/layout-tabbable-chrome-latest-1366x768.png)

</TabItem>
</Tabs>


## save(Screen/Element/FullPageScreen)

### Вывод в консоль

Методы `save(Screen/Element/FullPageScreen)` предоставляют следующую информацию после выполнения:

```js
const saveResult = await browser.saveFullPageScreen({ ... })
console.log(saveResults)
/**
 * {
 *   // Соотношение пикселей устройства, на котором выполнялся запуск
 *   devicePixelRatio: 1,
 *   // Отформатированное имя файла, зависит от опции `formatImageName`
 *   fileName: "examplePage-chrome-latest-1366x768.png",
 *   // Путь, где можно найти фактический файл скриншота
 *   path: "/path/to/project/.tmp/actual/desktop_chrome",
 * };
 */
```

### Вывод изображения

<Tabs
    defaultValue="saveelement"
    values={[
        {label: 'saveElement', value: 'saveelement'},
        {label: 'saveScreen', value: 'savescreen'},
        {label: 'saveFullPageScreen', value: 'savefullpagescreen'},
    ]}
>
<TabItem value="saveelement">

```js
await browser.saveElement(".hero__title-logo", "example-element-tag")
```

<Tabs
    defaultValue="desktop"
    values={[
        {label: 'Desktop', value: 'desktop'},
        {label: 'Android', value: 'android'},
        {label: 'iOS', value: 'ios'},
    ]}
>
<TabItem value="desktop">
![saveElement Desktop](/img/visual/wdioLogo-chrome-latest-1-1366x768.png)
</TabItem>
<TabItem value="android">
![saveElement Mobile Android](/img/visual/wdioLogo-EmulatorAndroidGoogleAPIPortraitNativeWebScreenshot14.0-384x640.png)
</TabItem>
<TabItem value="ios">
![saveElement Mobile iOS](/img/visual/wdioLogo-Iphone12Portrait16-390x844.png)
</TabItem>
</Tabs>
</TabItem>

<TabItem value="savescreen">

```js
await browser.saveScreen("example-page-tag")
```

<Tabs
    defaultValue="desktop"
    values={[
        {label: 'Desktop', value: 'desktop'},
        {label: 'Android ChromeDriver', value: 'android-chromedriver'},
        {label: 'Android nativeWebScreenshot', value: 'android-native'},
        {label: 'iOS', value: 'ios'},
    ]}
>
<TabItem value="desktop">
![saveScreen Desktop](/img/visual/examplePage-chrome-latest-1366x768.png)
</TabItem>
<TabItem value="android-chromedriver">
![saveScreen Mobile Android ChromeDriver](/img/visual/screenshot-EmulatorAndroidGoogleAPIPortraitChromeDriver14.0-384x640.png)
</TabItem>
<TabItem value="android-native">
![saveScreen Mobile Android nativeWebScreenshot](/img/visual/screenshot-EmulatorAndroidGoogleAPIPortraitNativeWebScreenshot14.0-384x640.png)
</TabItem>
<TabItem value="ios">

:::info СОВЕТ
Выполнение `saveScreen` для iOS по умолчанию не включает скругленные углы устройства. Чтобы включить их, добавьте опцию `addIOSBezelCorners:true` при инициализации сервиса, см. [здесь](./service-options#addiosbezelcorners)
:::

![saveScreen Mobile iOS](/img/visual/screenshot-Iphone12Portrait15-390x844.png)
</TabItem>
</Tabs>
</TabItem>

<TabItem value="savefullpagescreen">

```js
await browser.saveFullPageScreen("full-page-tag")
```

<Tabs
    defaultValue="desktop"
    values={[
        {label: 'Desktop', value: 'desktop'},
        {label: 'Android', value: 'android'},
        {label: 'iOS', value: 'ios'},
    ]}
>
<TabItem value="desktop">
![saveFullPageScreens Desktop](/img/visual/fullPage-chrome-latest-1366x768.png)
</TabItem>
<TabItem value="android">
![saveFullPageScreens Mobile Android](/img/visual/fullPage-EmulatorAndroidGoogleAPIPortraitChromeDriver14.0-384x640.png)
</TabItem>
<TabItem value="ios">
![saveFullPageScreens Mobile iOS](/img/visual/fullPage-Iphone12Portrait16-390x844.png)
</TabItem>
</Tabs>
</TabItem>
</Tabs>

## check(Screen/Element/FullPageScreen)

### Вывод в консоль

По умолчанию методы `check(Screen/Element/FullPageScreen)` предоставляют только процент несоответствия, например `1.23`, но когда у плагина установлена опция `returnAllCompareData: true`, предоставляется следующая информация после выполнения метода:

```js
const checkResult = await browser.checkFullPageScreen({ ... })
console.log(checkResult)
/**
 * {
 *     // Отформатированное имя файла, зависит от опции `formatImageName`
 *     fileName: "examplePage-chrome-headless-latest-1366x768.png",
 *     folders: {
 *         // Папка фактических изображений и имя файла
 *         actual: "/path/to/project/.tmp/actual/desktop_chrome/examplePage-chrome-headless-latest-1366x768.png",
 *         // Папка эталонных изображений и имя файла
 *         baseline:
 *             "/path/to/project/localBaseline/desktop_chrome/examplePage-chrome-headless-latest-1366x768.png",
 *         // Следующая папка опциональна и существует только при несоответствии
 *         // Папка, содержащая различия, и имя файла
 *         diff: "/path/to/project/.tmp/diff/desktop_chrome/examplePage-chrome-headless-latest-1366x768.png",
 *     },
 *     // Процент несоответствия
 *     misMatchPercentage: 2.34,
 * };
 */
```

### Вывод изображения

:::info
Изображения ниже показывают только различия в результате выполнения команд проверки. Показаны только различия в браузере, но вывод для Android и iOS аналогичен.
:::

<Tabs
    defaultValue="checkelement"
    values={[
        {label: 'checkElement', value: 'checkelement'},
        {label: 'checkScreen', value: 'checkscreen'},
        {label: 'checkFullPageScreen', value: 'checkfullpagescreen'},
    ]}
>
<TabItem value="checkelement">

```js
await browser.checkElement("#__docusaurus_skipToContent_fallback > header > div > div.buttons_pzbO > a:nth-child(1)", "example-element-tag")
```

:::info
Текст кнопки был изменен с `Get Started` на `Getting Started!` и обнаружен как изменение.
:::

![Button Check Result](/img/visual/button-check.png)
</TabItem>

<TabItem value="checkscreen">

```js
await browser.checkScreen("example-page-tag")
```

:::info
Текст кнопки был изменен с `Get Started` на `Getting Started!` и обнаружен как изменение.
:::

![Button Check Result](/img/visual/screen-check.png)

</TabItem>

<TabItem value="checkfullpagescreen">

```js
await browser.checkFullPageScreen("full-page-tag")
```

:::info
Текст кнопки был изменен с `Get Started` на `Getting Started!` и обнаружен как изменение.
:::

![Button Check Result](/img/visual/fullpage-check.png)

</TabItem>

</Tabs>

## Блокировка областей (Block-Outs)

Здесь вы найдете пример вывода для блокировки областей в Android NativeWebScreenshot и iOS, где статус+адрес и панель инструментов заблокированы.

<Tabs
    defaultValue="nativeWebScreenshot"
    values={[
        {label: 'Android nativeWebScreenshot', value: 'nativeWebScreenshot'},
        {label: 'iOS', value: 'ios'},
    ]}
>
<TabItem value="nativeWebScreenshot">

![Blockouts Android](/img/visual/android.blockouts.png)

</TabItem>

<TabItem value="ios">

![Blockouts iOS](/img/visual/ios.blockouts.png)

</TabItem>

</Tabs>