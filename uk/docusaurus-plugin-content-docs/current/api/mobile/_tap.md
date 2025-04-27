---
id: tap
title: tap
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/tap.ts
---

Виконує жест натискання на:
- або вказаний елемент. Він **автоматично прокрутить** екран, якщо елемент не знайдено.
- або на екрані мобільного пристрою, надаючи координати `x` та `y`

Внутрішньо використовує:
- Натискання на елемент:
     - команду `click` для веб-середовищ (браузери Chrome/Safari або гібридні додатки)
     - Android [`mobile: clickGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-clickgesture)
або iOS [`mobile: tap`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-tap) для нативних додатків, включаючи команду `scrollIntoView`
для автоматичної прокрутки
- Натискання на екран:
     - команду `action` для веб-середовищ (браузери Chrome/Safari або гібридні додатки)
     - Android [`mobile: clickGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-clickgesture)
або iOS [`mobile: tap`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-tap) для нативних додатків

Ця відмінність робить команду `tap` більш надійною альтернативою команді `click` для мобільних додатків.

Для нативних додатків ця команда відрізняється від команди `click` тим, що вона <strong>автоматично прокручує</strong> до елемента, використовуючи команду `scrollIntoView`,
яка не підтримується для нативних додатків з командою `click`. У гібридних додатках або веб-середовищах автоматична прокрутка підтримується як для команд `click`, так і для `tap`.

:::info

Ця команда працює лише з наступними актуальними компонентами:
 - Appium сервер (версія 2.0.0 або вище)
 - `appium-uiautomator2-driver` (для Android)
 - `appium-xcuitest-driver` (для iOS)

Переконайтеся, що ваше локальне або хмарне середовище Appium регулярно оновлюється, щоб уникнути проблем із сумісністю.

:::

:::caution Для натискань на екран

Якщо ви хочете натиснути на певні координати на екрані і використовуєте скріншот для визначення координат, пам'ятайте, що
координати для iOS базуються на розмірі екрану пристрою, а не на розмірі скріншоту. Розмір скріншоту більший через співвідношення пікселів пристрою.
Середнє співвідношення пікселів пристрою до iPhone 8 та поточних iPad становить 2, для iPhone, починаючи з iPhone X, це співвідношення становить 3. Це означає, що розмір скріншоту
в 2 або 3 рази більший, ніж розмір екрану пристрою, що означає, що якщо ви знаходите координати на скріншоті, поділіть їх на співвідношення пікселів
пристрою, щоб отримати правильні екранні координати. Наприклад:

```js
const screenshotCoordinates = { x: 600, y: 900 };
const dpr = 3; // Приклад для iPhone 16
const screenCoordinates = {
    x: screenshotCoordinates.x / dpr,
    y: screenshotCoordinates.y / dpr
};
await browser.tap(screenCoordinates);
```

:::

##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`TapOptions`</td>
      <td>Параметри натискання (необов'язково)</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Параметри натискання на елемент</strong></td>
            </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Число (необов'язково, обов'язково, якщо встановлено y) <br /><strong>Тільки для натискання на ЕКРАН, не для натискання на ЕЛЕМЕНТ</strong></td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Число (необов'язково, обов'язково, якщо встановлено x) <br /><strong>Тільки для натискання на ЕКРАН, не для натискання на ЕЛЕМЕНТ</strong></td>
    </tr>
    <tr>
              <td colspan="3"><strong>Параметри натискання на екран</strong></td>
            </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>Може бути одним з `down`, `up`, `left` або `right`, за замовчуванням `down`. <br /><strong>Тільки для натискання на ЕЛЕМЕНТ, не для натискання на ЕКРАН</strong><br /><strong>ТІЛЬКИ-ДЛЯ-МОБІЛЬНИХ-НАТИВНИХ-ДОДАТКІВ</strong></td>
    </tr>
    <tr>
      <td><code><var>options.maxScrolls</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Максимальна кількість прокруток, після якої пошук елемента припиниться, за замовчуванням `10`. <br /><strong>Тільки для натискання на ЕЛЕМЕНТ, не для натискання на ЕКРАН</strong><br /><strong>ТІЛЬКИ-ДЛЯ-МОБІЛЬНИХ-НАТИВНИХ-ДОДАТКІВ</strong></td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Element`</td>
      <td>Елемент, який використовується для прокрутки. Якщо елемент не надано, буде використано наступний селектор для iOS `-ios predicate string:type == "XCUIElementTypeApplication"` та наступний для Android `//android.widget.ScrollView'`. Якщо декілька елементів відповідають селектору за замовчуванням, то за замовчуванням буде обрано перший відповідний елемент. <br /><strong>Тільки для натискання на ЕЛЕМЕНТ, не для натискання на ЕКРАН</strong><br /><strong>ТІЛЬКИ-ДЛЯ-МОБІЛЬНИХ-НАТИВНИХ-ДОДАТКІВ</strong></td>
    </tr>
  </tbody>
</table>

##### Examples

```js title="element.tap.example.js"
it('should be able to tap an on element', async () => {
    const elem = $('~myElement')
    // It will automatically scroll to the element if it's not already in the viewport
    await elem.tap()
})

```

```js title="element.tap.scroll.options.example.js"
it('should be able to swipe right 3 times in a custom scroll areas to an element and tap on the element', async () => {
    const elem = $('~myElement')
    // Swipe right 3 times in the custom scrollable element to find the element
    await elem.tap({
        direction: 'right',
        maxScrolls: 3,
        scrollableElement: $('#scrollable')
    })
})

```

```js title="screen.tap.example.js"
it('should be able to tap on screen coordinates', async () => {
    await browser.tap({ x: 200, y: 400 })
})
```