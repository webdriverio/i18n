---
id: waitForStable
title: waitForStable
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForStable.ts
---

Ожидает, пока элемент не станет стабильным (без анимации) в течение указанного количества миллисекунд. Возвращает true, если селектор соответствует хотя бы одному стабильному элементу в DOM, в противном случае выдает ошибку. Если флаг reverse установлен в true, команда вместо этого вернет true, если селектор не соответствует ни одному стабильному элементу.

__Примечание:__ лучше отключить анимацию вместо использования этой команды

##### Использование

```js
$(selector).waitForStable({ timeout, reverse, timeoutMsg, interval })
```

##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Описание</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`WaitForOptions`</td>
      <td>опции waitForStable (опционально)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`Number`</td>
      <td>время в мс (по умолчанию установлено на основе значения конфигурации [`waitforTimeout`](/docs/configuration#waitfortimeout))</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`Boolean`</td>
      <td>если true, ожидает противоположного (по умолчанию: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`String`</td>
      <td>если существует, переопределяет сообщение об ошибке по умолчанию</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`Number`</td>
      <td>интервал между проверками (по умолчанию: `waitforInterval`)</td>
    </tr>
  </tbody>
</table>

##### Примеры

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

##### Возвращает

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true если элемент стабилен