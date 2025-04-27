---
id: tap
title: tap
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/tap.ts
---

Выполняет жест касания на:
- элементе. Будет **автоматически прокручивать**, если элемент не найден.
- экране мобильного устройства, с предоставлением координат `x` и `y`

Внутри использует:
- Касание элемента:
     - команду `click` для веб-окружений (браузеры Chrome/Safari или гибридные приложения)
     - Android [`mobile: clickGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-clickgesture)
или iOS [`mobile: tap`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-tap) для нативных приложений, включая команду `scrollIntoView`
для автоматической прокрутки
- Касание экрана:
     - команду `action` для веб-окружений (браузеры Chrome/Safari или гибридные приложения)
     - Android [`mobile: clickGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-clickgesture)
или iOS [`mobile: tap`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-tap) для нативных приложений

Это различие делает команду `tap` более надежной альтернативой команде `click` для мобильных приложений.

Для нативных приложений эта команда отличается от команды `click` тем, что она <strong>автоматически прокручивает</strong> к элементу, используя команду `scrollIntoView`,
которая не поддерживается для нативных приложений командой `click`. В гибридных приложениях или веб-средах автоматическая прокрутка поддерживается обеими командами: `click` и `tap`.

:::info

Эта команда работает только со следующими актуальными компонентами:
 - Сервер Appium (версия 2.0.0 или выше)
 - `appium-uiautomator2-driver` (для Android)
 - `appium-xcuitest-driver` (для iOS)

Убедитесь, что ваша локальная или облачная среда Appium регулярно обновляется, чтобы избежать проблем с совместимостью.

:::

:::caution Для касаний экрана

Если вы хотите коснуться определенной координаты на экране, и вы используете скриншот для определения координат, помните, что
координаты для iOS основаны на размере экрана устройства, а не на размере скриншота. Размер скриншота больше из-за плотности пикселей устройства.
Средняя плотность пикселей устройства до iPhone 8 и текущих iPad составляет 2, для iPhone начиная с iPhone X соотношение равно 3. Это означает, что размер скриншота
в 2 или 3 раза больше, чем размер экрана устройства, что означает, что если вы найдете координаты на скриншоте, разделите их на плотность пикселей
устройства, чтобы получить правильные координаты экрана. Например:

```js
const screenshotCoordinates = { x: 600, y: 900 };
const dpr = 3; // Пример для iPhone 16
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
      <td>Параметры касания (необязательно)</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Параметры касания элемента</strong></td>
            </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Число (необязательно, обязательно если установлен y) <br /><strong>Только для касания ЭКРАНА, не для касания ЭЛЕМЕНТА</strong></td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Число (необязательно, обязательно если установлен x) <br /><strong>Только для касания ЭКРАНА, не для касания ЭЛЕМЕНТА</strong></td>
    </tr>
    <tr>
              <td colspan="3"><strong>Параметры касания экрана</strong></td>
            </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>Может быть одним из `down`, `up`, `left` или `right`, по умолчанию `down`. <br /><strong>Только для касания ЭЛЕМЕНТА, не для касания ЭКРАНА</strong><br /><strong>ТОЛЬКО-ДЛЯ-НАТИВНЫХ-МОБИЛЬНЫХ-ПРИЛОЖЕНИЙ</strong></td>
    </tr>
    <tr>
      <td><code><var>options.maxScrolls</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Максимальное количество прокруток до остановки поиска элемента, по умолчанию `10`. <br /><strong>Только для касания ЭЛЕМЕНТА, не для касания ЭКРАНА</strong><br /><strong>ТОЛЬКО-ДЛЯ-НАТИВНЫХ-МОБИЛЬНЫХ-ПРИЛОЖЕНИЙ</strong></td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Element`</td>
      <td>Элемент, используемый для прокрутки. Если элемент не предоставлен, будет использован следующий селектор для iOS `-ios predicate string:type == "XCUIElementTypeApplication"` и следующий для Android `//android.widget.ScrollView'`. Если несколько элементов соответствуют селектору по умолчанию, то по умолчанию будет выбран первый соответствующий элемент. <br /><strong>Только для касания ЭЛЕМЕНТА, не для касания ЭКРАНА</strong><br /><strong>ТОЛЬКО-ДЛЯ-НАТИВНЫХ-МОБИЛЬНЫХ-ПРИЛОЖЕНИЙ</strong></td>
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