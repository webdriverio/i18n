---
id: emulate
title: emulate
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/emulate.ts
---

WebdriverIO позволяет эмулировать Web API с помощью команды `emulate`. Эти Web API могут затем
вести себя точно так, как вы укажете. Поддерживаются следующие области:

- `geolocation`: Эмуляция API геолокации
- `userAgent`: Эмуляция пользовательского агента
- `colorScheme`: Эмуляция цветовой схемы
- `onLine`: Эмуляция статуса подключения к сети
- `device`: Эмуляция конкретного мобильного или настольного устройства
- `clock`: Эмуляция системных часов

Команда `emulate` возвращает функцию, которую можно вызвать для сброса эмуляции. Это полезно,
когда вы хотите сбросить эмуляцию после теста или набора тестов.

Подробнее об этом в рекомендациях [Emulation](/docs/emulation).

:::info

За исключением области `clock`, невозможно изменить эмулируемое значение без перезагрузки страницы.

:::

:::info

Эта функция требует поддержки WebDriver Bidi для браузера. Хотя последние версии Chrome, Edge
и Firefox имеют такую поддержку, Safari __не поддерживает__. Для обновлений следите за [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/script/add_preload_script/add_preload_script.py?label=experimental&label=master&aligned).
Кроме того, если вы используете облачный сервис для запуска браузеров, убедитесь, что ваш провайдер также поддерживает WebDriver Bidi.

:::

Объект `EmulationOptions` может иметь следующие свойства в зависимости от области:

| Область       | Опции                                            |
|---------------|--------------------------------------------------|
| `geolocation` | `{ latitude: number, longitude: number }`        |
| `userAgent`   | `string`                                         |
| `colorScheme` | `'light' \| 'dark'`                              |
| `onLine`      | `boolean`                                        |
| `clock`       | `FakeTimerInstallOpts`                           |

##### Использование

```js
browser.emulate(scope, options)
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
      <td><code><var>scope</var></code></td>
      <td>`string`</td>
      <td>функция браузера, которую вы хотите эмулировать, может быть `clock`, `geolocation`, `userAgent`, `colorScheme` или `onLine`</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`EmulationOptions`</td>
      <td>параметры эмуляции для конкретной области</td>
    </tr>
  </tbody>
</table>

##### Примеры

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9bff2baf8a0678c6886f8591d9fc8dea201895d3/emulate/example.js#L4-L18
```

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9bff2baf8a0678c6886f8591d9fc8dea201895d3/emulate/example.js#L20-L36
```

##### Возвращает

- **&lt;Function&gt;**
            **<code><var>returns</var></code>:**   функция для сброса эмуляции