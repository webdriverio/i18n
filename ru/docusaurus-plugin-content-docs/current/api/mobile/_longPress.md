---
id: longPress
title: longPress
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/longPress.ts
---

Выполняет жест долгого нажатия на заданном элементе на экране.

Это вызывает команду WebDriver `action` для выбранного элемента. Основано на команде `click`.

:::info

Эта команда работает только со следующими актуальными компонентами:
 - Сервер Appium (версия 2.0.0 или выше)
 - `appium-uiautomator2-driver` (для Android)
 - `appium-xcuitest-driver` (для iOS)

Убедитесь, что ваша локальная или облачная среда Appium регулярно обновляется, чтобы избежать проблем совместимости.

:::

##### Использование

```js
$(selector).longPress({ x, y, duration })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`LongPressOptions`</td>
      <td>Опции долгого нажатия (необязательно)</td>
    </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`number`</td>
      <td>Число (необязательно)</td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`number`</td>
      <td>Число (необязательно)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`number`</td>
      <td>Продолжительность нажатия в мс, по умолчанию 1500 мс <br /><strong>ТОЛЬКО ДЛЯ МОБИЛЬНЫХ</strong></td>
    </tr>
  </tbody>
</table>

##### Примеры

```js title="longpress.offset.js"
it('should demonstrate a longPress using an offset on the iOS Contacts icon', async () => {
    const contacts = $('~Contacts')
    // opens the Contacts menu on iOS where you can quickly create
    // a new contact, edit your home screen, or remove the app
    // clicks 30 horizontal and 10 vertical pixels away from location of the icon (from center point of element)
    await contacts.longPress({ x: 30, y: 10 })
})

```

```js title="longpress.example.js"
it('should be able to open the contacts menu on iOS by executing a longPress of 5 seconds', async () => {
    const contacts = $('~Contacts')
    // opens the Contacts menu on iOS where you can quickly create
    // a new contact, edit your home screen, or remove the app
    await contacts.longPress({ duration: 5 * 1000 })
})
```