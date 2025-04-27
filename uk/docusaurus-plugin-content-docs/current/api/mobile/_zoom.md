---
id: zoom
title: zoom (масштабування)
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/zoom.ts
---

Виконує жест масштабування на вказаному елементі екрану.

:::info

Масштабування здійснюється на основі нативних мобільних жестів. Підтримується лише для наступних драйверів:
- [appium-uiautomator2-driver](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-pinchopengesture) для Android
- [appium-xcuitest-driver](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-pinch) для iOS

Ця команда працює лише з наступними актуальними компонентами:
 - Appium сервер (версія 2.0.0 або вище)
 - `appium-uiautomator2-driver` (для Android)
 - `appium-xcuitest-driver` (для iOS)

Переконайтеся, що ваше локальне або хмарне середовище Appium регулярно оновлюється, щоб уникнути проблем із сумісністю.

:::

##### Використання

```js
$(selector).zoom({ duration, scale })
```

##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`PinchAndZoomOptions`</td>
      <td>Параметри масштабування (необов'язково)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`number`</td>
      <td>Тривалість у мілісекундах того, як швидко має виконуватися масштабування, мінімум - 500 мс, максимум - 10000 мс. За замовчуванням - 1500 мс (1.5 секунди) (необов'язково)</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`number`</td>
      <td>Масштаб того, наскільки великим має бути збільшення відносно екрану. Допустимі значення повинні бути числами з плаваючою точкою в діапазоні 0..1, де 1.0 - це 100% (необов'язково)</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js title="zoom.js"
it('should demonstrate a zoom on Google maps', async () => {
    const mapsElement = $('//*[@resource-id="com.google.android.apps.maps:id/map_frame"]')
    // Zoom with the default duration scale
    await mapsElement.zoom()
    // Zoom with a custom duration and scale
    await mapsElement.zoom({ duration: 4000, scale: 0.9 })
})
```