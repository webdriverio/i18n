---
id: click
title: click
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/click.ts
---

Клик по элементу.

Эта команда выполняет WebDriver команду `click` для выбранного элемента, которая обычно прокручивает к выбранному элементу, а затем кликает по нему, когда не передаются опции. Когда передается объект options, вместо клика webdriver используется класс действий, что дает дополнительные возможности, такие как передача типа кнопки, координат и т.д. По умолчанию, при использовании опций после выполнения действия клика отправляется команда отпускания (release), передайте `option.skipRelease=true`, чтобы пропустить это действие.

:::info

Если у вас есть элементы с фиксированным положением (например, фиксированный заголовок или футер), которые закрывают
выбранный элемент после его прокрутки в области видимости, клик будет выполнен по указанным координатам, но будет
получен вашим фиксированным (перекрывающим) элементом. В этих случаях возникает следующая ошибка:

```
Element is not clickable at point (x, x). Other element would receive the click: ..."
```

Для решения этой проблемы попробуйте найти перекрывающий элемент и удалить его с помощью команды `execute`, чтобы он не мешал
клику. Вы также можете попробовать самостоятельно прокрутить к элементу, используя `scroll` с подходящим для вашего
сценария смещением.

:::

:::info

Команда клика также может использоваться для имитации долгого нажатия на мобильном устройстве. Это делается путем установки `duration`.
Смотрите пример ниже для получения дополнительной информации.

:::

##### Использование

```js
$(selector).click({ button, x, y, skipRelease, duration })
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
      <td>`ClickOptions`</td>
      <td>Опции клика (опционально)</td>
    </tr>
    <tr>
      <td><code><var>options.button</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`string, number`</td>
      <td>Может быть одним из `[0, "left", 1, "middle", 2, "right"]` <br /><strong>ТОЛЬКО ДЛЯ ВЕБА</strong> (Десктоп/Мобильный)</td>
    </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`number`</td>
      <td>Клик на X горизонтальных пикселей от местоположения элемента (от центральной точки элемента)<br /><strong>WEB и Native</strong> (Десктоп/Мобильный)</td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`number`</td>
      <td>Клик на Y вертикальных пикселей от местоположения элемента (от центральной точки элемента)<br /><strong>WEB и Native поддержка</strong> (Десктоп/Мобильный)</td>
    </tr>
    <tr>
      <td><code><var>options.skipRelease</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`boolean`</td>
      <td>Булево значение (опционально) <br /><strong>ТОЛЬКО ДЛЯ ВЕБА</strong> (Десктоп/Мобильный)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`number`</td>
      <td>Продолжительность клика, также известная как "LongPress" <br /><strong>ТОЛЬКО ДЛЯ МОБИЛЬНЫХ НАТИВНЫХ ПРИЛОЖЕНИЙ</strong> (Мобильный)</td>
    </tr>
  </tbody>
</table>

##### Примеры

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