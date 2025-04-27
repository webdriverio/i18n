---
id: scrollIntoView
title: scrollIntoView
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/scrollIntoView.ts
---

Прокрутить элемент в область видимости для Десктопа/Мобильного Веба <strong>И</strong> Мобильных Нативных Приложений.

:::info

Прокрутка для Мобильных Нативных Приложений выполняется на основе мобильной команды `swipe`.

:::

##### Использование

```js
$(selector).scrollIntoView({ behavior, block, inline, direction, maxScrolls, duration, scrollableElement, percent })
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
      <td>`object, boolean`</td>
      <td>опции для `Element.scrollIntoView()`. По умолчанию для десктоп/мобильного веба: <br/> `{ block: 'start', inline: 'nearest' }` <br /> По умолчанию для Мобильного Нативного Приложения <br /> `{ maxScrolls: 10, scrollDirection: 'down' }`</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Только для Десктоп/Мобильного Веба</strong></td>
            </tr>
    <tr>
      <td><code><var>options.behavior</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`string`</td>
      <td>См. [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>ТОЛЬКО-ДЛЯ-ВЕБА</strong> (Десктоп/Мобильный)</td>
    </tr>
    <tr>
      <td><code><var>options.block</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`string`</td>
      <td>См. [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>ТОЛЬКО-ДЛЯ-ВЕБА</strong> (Десктоп/Мобильный)</td>
    </tr>
    <tr>
      <td><code><var>options.inline</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`string`</td>
      <td>См. [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>ТОЛЬКО-ДЛЯ-ВЕБА</strong> (Десктоп/Мобильный)</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Только для Мобильного Нативного Приложения</strong></td>
            </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`string`</td>
      <td>Может быть одним из `down`, `up`, `left` или `right`, по умолчанию `up`. <br /><strong>ТОЛЬКО-ДЛЯ-МОБИЛЬНОГО-НАТИВНОГО-ПРИЛОЖЕНИЯ</strong></td>
    </tr>
    <tr>
      <td><code><var>options.maxScrolls</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`number`</td>
      <td>Максимальное количество прокруток до завершения поиска элемента, по умолчанию `10`. <br /><strong>ТОЛЬКО-ДЛЯ-МОБИЛЬНОГО-НАТИВНОГО-ПРИЛОЖЕНИЯ</strong></td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`number`</td>
      <td>Продолжительность свайпа в миллисекундах. По умолчанию `1500` мс. Чем меньше значение, тем быстрее свайп.<br /><strong>ТОЛЬКО-ДЛЯ-МОБИЛЬНОГО-НАТИВНОГО-ПРИЛОЖЕНИЯ</strong></td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`Element`</td>
      <td>Элемент, который используется для прокрутки. Если элемент не указан, будет использоваться следующий селектор для iOS `-ios predicate string:type == "XCUIElementTypeApplication"` и следующий для Android `//android.widget.ScrollView'`. Если несколько элементов соответствуют селектору по умолчанию, то по умолчанию будет выбран первый соответствующий элемент. <br /> <strong>ТОЛЬКО-ДЛЯ-МОБИЛЬНОГО-НАТИВНОГО-ПРИЛОЖЕНИЯ</strong></td>
    </tr>
    <tr>
      <td><code><var>options.percent</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`number`</td>
      <td>Процент (по умолчанию) прокручиваемого элемента для свайпа. Это значение от 0 до 1. По умолчанию `0.95`.<br /><strong>НИКОГДА</strong> не делайте свайп с точного верха|низа|левой|правой стороны экрана, вы можете вызвать, например, панель уведомлений или другие функции ОС/Приложения, что может привести к неожиданным результатам.<br /> <strong>ТОЛЬКО-ДЛЯ-МОБИЛЬНОГО-НАТИВНОГО-ПРИЛОЖЕНИЯ</strong></td>
    </tr>
  </tbody>
</table>

##### Примеры

```js title="desktop.mobile.web.scrollIntoView.js"
it('should demonstrate the desktop/mobile web scrollIntoView command', async () => {
    const elem = await $('#myElement');
    // scroll to specific element
    await elem.scrollIntoView();
    // center element within the viewport
    await elem.scrollIntoView({ block: 'center', inline: 'center' });
});

```

```js title="mobile.native.app.scrollIntoView.js"
it('should demonstrate the mobile native app scrollIntoView command', async () => {
    const elem = await $('#myElement');
    // scroll to a specific element in the default scrollable element for Android or iOS for a maximum of 10 scrolls
    await elem.scrollIntoView();
    // Scroll to the left in the scrollable element called '#scrollable' for a maximum of 5 scrolls
    await elem.scrollIntoView({
        direction: 'left',
        maxScrolls: 5,
        scrollableElement: $('#scrollable')
    });
});
```