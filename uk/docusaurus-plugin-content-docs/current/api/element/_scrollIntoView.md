---
id: scrollIntoView
title: scrollIntoView
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/scrollIntoView.ts
---

Прокручування елемента у видиму область для настільних/мобільних веб-додатків <strong>ТА</strong> нативних мобільних додатків.

:::info

Прокручування для нативних мобільних додатків виконується на основі мобільної команди `swipe`.

:::

##### Використання

```js
$(selector).scrollIntoView({ behavior, block, inline, direction, maxScrolls, duration, scrollableElement, percent })
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
      <td>`object, boolean`</td>
      <td>параметри для `Element.scrollIntoView()`. За замовчуванням для настільних/мобільних веб: <br/> `{ block: 'start', inline: 'nearest' }` <br /> За замовчуванням для нативних мобільних додатків <br /> `{ maxScrolls: 10, scrollDirection: 'down' }`</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Тільки для настільних/мобільних веб</strong></td>
            </tr>
    <tr>
      <td><code><var>options.behavior</var></code><br /><span className="label labelWarning">необов'язковий</span></td>
      <td>`string`</td>
      <td>Дивіться [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>ТІЛЬКИ-ДЛЯ-ВЕБ</strong> (Настільні/Мобільні)</td>
    </tr>
    <tr>
      <td><code><var>options.block</var></code><br /><span className="label labelWarning">необов'язковий</span></td>
      <td>`string`</td>
      <td>Дивіться [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>ТІЛЬКИ-ДЛЯ-ВЕБ</strong> (Настільні/Мобільні)</td>
    </tr>
    <tr>
      <td><code><var>options.inline</var></code><br /><span className="label labelWarning">необов'язковий</span></td>
      <td>`string`</td>
      <td>Дивіться [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>ТІЛЬКИ-ДЛЯ-ВЕБ</strong> (Настільні/Мобільні)</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Тільки для нативних мобільних додатків</strong></td>
            </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">необов'язковий</span></td>
      <td>`string`</td>
      <td>Може бути одним з: `down`, `up`, `left` або `right`, за замовчуванням `up`. <br /><strong>ТІЛЬКИ-ДЛЯ-НАТИВНИХ-МОБІЛЬНИХ-ДОДАТКІВ</strong></td>
    </tr>
    <tr>
      <td><code><var>options.maxScrolls</var></code><br /><span className="label labelWarning">необов'язковий</span></td>
      <td>`number`</td>
      <td>Максимальна кількість прокручувань, після якої пошук елемента припиняється, за замовчуванням `10`. <br /><strong>ТІЛЬКИ-ДЛЯ-НАТИВНИХ-МОБІЛЬНИХ-ДОДАТКІВ</strong></td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">необов'язковий</span></td>
      <td>`number`</td>
      <td>Тривалість свайпу в мілісекундах. За замовчуванням `1500` мс. Чим менше значення, тим швидший свайп.<br /><strong>ТІЛЬКИ-ДЛЯ-НАТИВНИХ-МОБІЛЬНИХ-ДОДАТКІВ</strong></td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">необов'язковий</span></td>
      <td>`Element`</td>
      <td>Елемент, який використовується для прокрутки. Якщо елемент не вказано, буде використано наступний селектор для iOS `-ios predicate string:type == "XCUIElementTypeApplication"` і наступний для Android `//android.widget.ScrollView'`. Якщо селектору за замовчуванням відповідає кілька елементів, буде обрано перший відповідний елемент. <br /> <strong>ТІЛЬКИ-ДЛЯ-НАТИВНИХ-МОБІЛЬНИХ-ДОДАТКІВ</strong></td>
    </tr>
    <tr>
      <td><code><var>options.percent</var></code><br /><span className="label labelWarning">необов'язковий</span></td>
      <td>`number`</td>
      <td>Відсоток елемента прокрутки (за замовчуванням) для свайпу. Це значення від 0 до 1. За замовчуванням `0.95`.<br /><strong>НІКОЛИ</strong> не робіть свайп з точного верху|низу|лівого|правого краю екрану, це може викликати, наприклад, панель сповіщень або інші функції ОС/Додатку, що може призвести до неочікуваних результатів.<br /> <strong>ТІЛЬКИ-ДЛЯ-НАТИВНИХ-МОБІЛЬНИХ-ДОДАТКІВ</strong></td>
    </tr>
  </tbody>
</table>

##### Приклади

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