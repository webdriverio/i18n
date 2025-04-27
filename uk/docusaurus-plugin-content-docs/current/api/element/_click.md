---
id: click
title: клік
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/click.ts
---

Клік на елементі.

Це видає команду WebDriver `click` для вибраного елемента, яка зазвичай прокручує до вибраного елемента і клікає на нього, коли не передаються опції. Коли передається об'єкт опцій, використовується клас дій замість кліку webdriver, що надає додаткові можливості, такі як передача типу кнопки, координат тощо. За замовчуванням при використанні опцій команда відпускання надсилається після виконання дії кліку, передайте `option.skipRelease=true`, щоб пропустити цю дію.

:::info

Якщо у вас є елементи з фіксованим положенням (наприклад, фіксований заголовок або нижній колонтитул), які закривають вибраний елемент після його прокрутки всередині області перегляду, клік буде виконано за заданими координатами, але його отримає ваш фіксований (перекриваючий) елемент. У таких випадках виникає наступна помилка:

```
Element is not clickable at point (x, x). Other element would receive the click: ..."
```

Щоб обійти це, спробуйте знайти перекриваючий елемент і видалити його за допомогою команди `execute`, щоб він не заважав кліку. Ви також можете спробувати прокрутити до елемента самостійно, використовуючи `scroll` з відступом, відповідним для вашого сценарію.

:::

:::info

Команда кліку також може бути використана для імітації довгого натискання на мобільному пристрої. Це робиться шляхом встановлення `duration`.
Дивіться приклад нижче для отримання додаткової інформації.

:::

##### Використання

```js
$(selector).click({ button, x, y, skipRelease, duration })
```

##### Параметри

<table>
  <thead>
    <tr>
      <th>Ім'я</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`ClickOptions`</td>
      <td>Опції кліку (необов'язково)</td>
    </tr>
    <tr>
      <td><code><var>options.button</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`string, number`</td>
      <td>Може бути одним з `[0, "left", 1, "middle", 2, "right"]` <br /><strong>ТІЛЬКИ-ДЛЯ-WEB</strong> (Десктоп/Мобільний)</td>
    </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`number`</td>
      <td>Клікає X пікселів по горизонталі від місцезнаходження елемента (від центральної точки елемента)<br /><strong>WEB та Native</strong> (Десктоп/Мобільний)</td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`number`</td>
      <td>Клікає Y пікселів по вертикалі від місцезнаходження елемента (від центральної точки елемента)<br /><strong>Підтримка WEB та Native</strong> (Десктоп/Мобільний)</td>
    </tr>
    <tr>
      <td><code><var>options.skipRelease</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`boolean`</td>
      <td>Булеве значення (необов'язково) <br /><strong>ТІЛЬКИ-ДЛЯ-WEB</strong> (Десктоп/Мобільний)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`number`</td>
      <td>Тривалість кліку, також відомий як "LongPress" <br /><strong>ТІЛЬКИ-ДЛЯ-МОБІЛЬНИХ-НАТИВНИХ-ДОДАТКІВ</strong> (Мобільний)</td>
    </tr>
  </tbody>
</table>

##### Приклади

```html title="example.html"
<button id="myButton" onclick="document.getElementById('someText').innerHTML='I was clicked'">Click me</button>
<div id="someText">I was not clicked</div>
```

```js title="click.js"
it('should demonstrate the click command', async () => {
    const myButton = await $('#myButton')
    await myButton.click()
    const myText = await $('#someText')
    const text = await myText.getText()
    assert(text === 'I was clicked') // true
})
```

```js title="example.js"
it('should fetch menu links and visit each page', async () => {
    const links = await $$('#menu a')
    await links.forEach(async (link) => {
        await link.click()
    })
})

```

```html title="example.html"
<button id="myButton">Click me</button>
```

```js title="example.js"
it('should demonstrate a click using an offset', async () => {
    const myButton = await $('#myButton')
    await myButton.click({ x: 30 }) // clicks 30 horizontal pixels away from location of the button (from center point of element)
})

```

```html title="example.html"
<button id="myButton">Click me</button>
```

```js title="example.js"
it('should demonstrate a right click passed as string', async () => {
    const myButton = await $('#myButton')
    await myButton.click({ button: 'right' }) // opens the contextmenu at the location of the button
})
it('should demonstrate a right click passed as number while adding an offset', async () => {
    const myButton = await $('#myButton')
    await myButton.click({ button: 2, x: 30, y: 40 }) // opens the contextmenu 30 horizontal and 40 vertical pixels away from location of the button (from the center of element)
})
it('should skip sending releaseAction command that cause unexpected alert closure', async () => {
    const myButton = await $('#myButton')
    await myButton.click({ button: 2, x: 30, y: 40, skipRelease:true }) // skips sending releaseActions
})

```

```js title="longpress.example.js"
it('should be able to open the contacts menu on iOS by executing a longPress', async () => {
    const contacts = await $('~Contacts')
    // opens the Contacts menu on iOS where you can quickly create
    // a new contact, edit your home screen, or remove the app
    await contacts.click({ duration: 2000 })
})
```