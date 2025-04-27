---
id: pinch
title: защипування
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/pinch.ts
---

Виконує жест защипування на заданому елементі на екрані.

:::info

Защипування виконується на основі нативних мобільних жестів. Це підтримується лише для наступних драйверів:
- [appium-uiautomator2-driver](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-pinchclosegesture) для Android
- [appium-xcuitest-driver](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-pinch) для iOS

Ця команда працює лише з наступними оновленими компонентами:
 - Appium сервер (версія 2.0.0 або вище)
 - `appium-uiautomator2-driver` (для Android)
 - `appium-xcuitest-driver` (для iOS)

Переконайтеся, що ваше локальне або хмарне середовище Appium регулярно оновлюється, щоб уникнути проблем із сумісністю.

:::

##### Використання

```js
$(selector).pinch({ duration, scale })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">необов'язковий</span></td>
      <td>`PinchOptions`</td>
      <td>опції защипування (необов'язково)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">необов'язковий</span></td>
      <td>`number`</td>
      <td>Тривалість у мілісекундах того, як швидко має бути виконане защипування, мінімум 500 мс і максимум 10000 мс. За замовчуванням 1500 мс (1,5 секунди) (необов'язково)</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">необов'язковий</span></td>
      <td>`number`</td>
      <td>Масштаб того, наскільки великим має бути защипування відносно екрану. Допустимі значення повинні бути числами з плаваючою точкою в діапазоні 0..1, де 1.0 це 100% (необов'язково)</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js title="pinch.js"
it('should demonstrate a pinch on Google maps', async () => {
    const mapsElement = $('//*[@resource-id="com.google.android.apps.maps:id/map_frame"]')
    // Pinch with the default duration scale
    await mapsElement.pinch()
    // Pinch with a custom duration and scale
    await mapsElement.pinch({ duration: 4000, scale: 0.9 })
})
```