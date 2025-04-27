---
id: emulate
title: емуляція
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/emulate.ts
---

WebdriverIO дозволяє емулювати Web API за допомогою команди `emulate`. Ці Web API можуть поводитися саме так, як ви вказали. Підтримуються наступні області:

- `geolocation`: Емуляція API геолокації
- `userAgent`: Емуляція користувацького агента
- `colorScheme`: Емуляція кольорової схеми
- `onLine`: Емуляція статусу онлайн
- `device`: Емуляція конкретного мобільного чи десктопного пристрою
- `clock`: Емуляція системного годинника

Команда `emulate` повертає функцію, яку можна викликати для скидання емуляції. Це корисно, коли ви хочете скинути емуляцію після тесту або набору тестів.

Детальніше про це читайте в рекомендаціях з [Емуляції](/docs/emulation).

:::info

Крім області `clock`, неможливо змінити емульоване значення без перезавантаження сторінки.

:::

:::info

Ця функція вимагає підтримки WebDriver Bidi для браузера. У той час як останні версії Chrome, Edge та Firefox мають таку підтримку, Safari __не має__. Слідкуйте за оновленнями на [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/script/add_preload_script/add_preload_script.py?label=experimental&label=master&aligned).
Крім того, якщо ви використовуєте хмарного постачальника для запуску браузерів, переконайтеся, що ваш постачальник також підтримує WebDriver Bidi.

:::

Об'єкт `EmulationOptions` може мати наступні властивості в залежності від області:

| Область       | Опції                                           |
|---------------|--------------------------------------------------|
| `geolocation` | `{ latitude: number, longitude: number }`        |
| `userAgent`   | `string`                                         |
| `colorScheme` | `'light' \| 'dark'`                              |
| `onLine`      | `boolean`                                        |
| `clock`       | `FakeTimerInstallOpts`                           |

##### Використання

```js
browser.emulate(scope, options)
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
      <td><code><var>scope</var></code></td>
      <td>`string`</td>
      <td>функція браузера, яку ви хочете емулювати, може бути `clock`, `geolocation`, `userAgent`, `colorScheme` або `onLine`</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`EmulationOptions`</td>
      <td>опція емуляції для конкретної області</td>
    </tr>
  </tbody>
</table>

##### Приклади

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9bff2baf8a0678c6886f8591d9fc8dea201895d3/emulate/example.js#L4-L18
```

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9bff2baf8a0678c6886f8591d9fc8dea201895d3/emulate/example.js#L20-L36
```

##### Повертає

- **&lt;Function&gt;**
            **<code><var>returns</var></code>:**   функція для скидання емуляції