---
id: longPress
title: longPress
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/longPress.ts
---

Виконує жест довгого натискання на заданому елементі на екрані.

Ця команда видає WebDriver команду `action` для вибраного елемента. Вона базується на команді `click`.

:::info

Ця команда працює лише з наступними актуальними компонентами:
 - Appium server (версія 2.0.0 або вище)
 - `appium-uiautomator2-driver` (для Android)
 - `appium-xcuitest-driver` (для iOS)

Переконайтеся, що ваше локальне або хмарне середовище Appium регулярно оновлюється, щоб уникнути проблем сумісності.

:::

##### Використання

```js
$(selector).longPress({ x, y, duration })
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
      <td>`LongPressOptions`</td>
      <td>Опції довгого натискання (необов'язково)</td>
    </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`number`</td>
      <td>Число (необов'язково)</td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`number`</td>
      <td>Число (необов'язково)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`number`</td>
      <td>Тривалість натискання в мс, за замовчуванням 1500 мс <br /><strong>ТІЛЬКИ ДЛЯ МОБІЛЬНИХ</strong></td>
    </tr>
  </tbody>
</table>

##### Приклади

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