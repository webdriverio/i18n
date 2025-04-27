---
id: waitForStable
title: waitForStable
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForStable.ts
---

Очікує на елемент протягом вказаної кількості
мілісекунд, щоб він став стабільним (не анімувався). Повертає true, якщо селектор
відповідає принаймні одному елементу, який є стабільним у DOM, інакше видає
помилку. Якщо прапорець reverse встановлено як true, команда натомість поверне true,
якщо селектор не відповідає жодному стабільному елементу.

__Примітка:__ краще вимкнути анімації замість використання цієї команди

##### Використання

```js
$(selector).waitForStable({ timeout, reverse, timeoutMsg, interval })
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
      <td>`WaitForOptions`</td>
      <td>параметри waitForStable (необов'язково)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`Number`</td>
      <td>час у мс (значення за замовчуванням базується на конфігурації [`waitforTimeout`](/docs/configuration#waitfortimeout))</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`Boolean`</td>
      <td>якщо true, то чекає на протилежне (за замовчуванням: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`String`</td>
      <td>якщо існує, то замінює повідомлення про помилку за замовчуванням</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`Number`</td>
      <td>інтервал між перевірками (за замовчуванням: `waitforInterval`)</td>
    </tr>
  </tbody>
</table>

##### Приклади

```html title="index.html"
<head>
    <style>
        div {
            width: 200px;
            height: 200px;
            background-color: red;
        }
        #has-animation {
            animation: 3s 0s alternate slidein;
        }
        @keyframes slidein {
            from {
                margin-left: 100%;
                width: 300%;
            }

            to {
                margin-left: 0%;
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <div #has-animation></div>
    <div #has-no-animation></div>
</body>

```

```js title="waitForStable.js"
it('should detect that element is instable and will wait for the element to become stable', async () => {
    const elem = await $('#has-animation')
    await elem.waitForStable({ timeout: 3000 });
});
it('should detect that element is stable and will not wait', async () => {
    const elem = await $('#has-no-animation')
    await elem.waitForStable();
});
```

##### Повертає

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true, якщо елемент стабільний