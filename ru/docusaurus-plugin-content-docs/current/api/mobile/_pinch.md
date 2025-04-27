---
id: pinch
title: pinch (щипок)
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/pinch.ts
---

Выполняет жест щипка на указанном элементе экрана.

:::info

Щипок выполняется на основе нативных мобильных жестов. Он поддерживается только для следующих драйверов:
- [appium-uiautomator2-driver](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-pinchclosegesture) для Android
- [appium-xcuitest-driver](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-pinch) для iOS

Эта команда работает только со следующими актуальными компонентами:
 - Сервер Appium (версия 2.0.0 или выше)
 - `appium-uiautomator2-driver` (для Android)
 - `appium-xcuitest-driver` (для iOS)

Убедитесь, что ваша локальная или облачная среда Appium регулярно обновляется, чтобы избежать проблем совместимости.

:::

##### Использование

```js
$(selector).pinch({ duration, scale })
```

##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`PinchOptions`</td>
      <td>параметры щипка (опционально)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`number`</td>
      <td>Продолжительность в миллисекундах того, как быстро должен выполняться щипок, минимум 500 мс и максимум 10000 мс. По умолчанию 1500 мс (1.5 секунды) (опционально)</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`number`</td>
      <td>Масштаб того, насколько большим должен быть щипок относительно экрана. Допустимые значения должны быть числами с плавающей точкой в диапазоне 0..1, где 1.0 соответствует 100% (опционально)</td>
    </tr>
  </tbody>
</table>

##### Пример

```js title="pinch.js"
it('should demonstrate a pinch on Google maps', async () => {
    const mapsElement = $('//*[@resource-id="com.google.android.apps.maps:id/map_frame"]')
    // Pinch with the default duration scale
    await mapsElement.pinch()
    // Pinch with a custom duration and scale
    await mapsElement.pinch({ duration: 4000, scale: 0.9 })
})
```