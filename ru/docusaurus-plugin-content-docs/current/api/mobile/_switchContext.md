---
id: switchContext
title: switchContext
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/switchContext.ts
---

Переключение на определенный контекст, используя указанное Webview `name`, `title` или `url`.

Этот метод расширяет стандартную команду Appium `context`, предлагая больше гибкости и точности
при переключении между нативным и webview контекстами в гибридных мобильных приложениях.

### Как работают контексты
Для общего обзора гибридных приложений и вебвью, обратитесь к [документации по гибридным приложениям](/docs/api/mobile#hybrid-apps).
Ниже приведено описание того, как команда `switchContext` решает распространенные проблемы:

#### Проблемы на Android
- Webview часто содержат несколько страниц (аналогично вкладкам браузера). Определение правильной страницы требует дополнительных
  метаданных, таких как `title` или `url`, которые не предоставляются стандартными методами Appium.
- Стандартные методы Appium возвращают только базовые имена контекстов (например, `WEBVIEW_{packageName}`) без подробностей о
  содержимом или страницах внутри webview.
- Переключение контекстов на Android включает два шага, которые автоматически выполняются этим методом:
  1. Переключение на контекст Webview, используя `WEBVIEW_{packageName}`.
  2. Выбор соответствующей страницы внутри Webview с помощью метода `switchToWindow`.

#### Проблемы на iOS
- Webview идентифицируются общими идентификаторами (например, `WEBVIEW_{id}`), которые не предоставляют информацию о содержимом
  или экране приложения, которому они соответствуют.
- Определение правильного webview для взаимодействия часто требует проб и ошибок.

Метод `switchContext` упрощает этот процесс, получая подробные метаданные (например, `title`, `url` и видимость)
для обеспечения точного и надежного переключения контекстов.

### Почему стоит использовать этот метод?
- **Упрощенное переключение**: Если вы знаете `title` или `url` нужного вебвью, этот метод устраняет необходимость в
  дополнительных вызовах `getContexts` или комбинировании нескольких методов, таких как `switchContext({id})` и `getTitle()`.
- **Автоматическое сопоставление контекстов**: Находит наилучшее соответствие для контекста на основе:
  - Идентификаторов, специфичных для платформы (`bundleId` для iOS, `packageName` для Android).
  - Точных или частичных совпадений `title` или `url` (поддерживает как строки, так и регулярные выражения).
  - Проверок, специфичных для Android, чтобы убедиться, что webview прикреплены и видимы.
- **Детальный контроль**: Пользовательские интервалы повторных попыток и тайм-ауты (только для Android) позволяют вам обрабатывать задержки при инициализации webview.
- **Доступ к стандартному методу Appium**: При необходимости вы можете использовать стандартную команду Appium `switchContext` через `driver.switchAppiumContext()`.

:::info Примечания и ограничения

- Если `title` или `url` желаемого webview известны, этот метод может автоматически найти и переключиться на соответствующий контекст без дополнительных вызовов `getContexts`.
- Опции, специфичные для Android, такие как `androidWebviewConnectionRetryTime` и `androidWebviewConnectTimeout`, не применимы к iOS.
- Записывает причины неудач при сопоставлении контекстов для помощи в отладке.
- При использовании объекта в качестве входных данных требуется указать либо `title`, либо `url`.

:::

##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>context</var></code></td>
      <td>`string, SwitchContextOptions`</td>
      <td>Имя контекста для переключения. Может быть предоставлен объект с дополнительными параметрами контекста.</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`SwitchContextOptions`</td>
      <td>Опции команды switchContext</td>
    </tr>
    <tr>
      <td><code><var>options.title</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string, RegExp`</td>
      <td>Заголовок страницы для переключения. Это будет содержимое тега title веб-страницы. Вы можете использовать строку, которая должна полностью совпадать, или регулярное выражение.<br /><strong>ВАЖНО:</strong> При использовании опций обязательно должно быть указано свойство `title` или `url`.</td>
    </tr>
    <tr>
      <td><code><var>options.url</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string, RegExp`</td>
      <td>URL страницы для переключения. Это будет `url` веб-страницы. Вы можете использовать строку, которая должна полностью совпадать, или регулярное выражение.<br /><strong>ВАЖНО:</strong> При использовании опций обязательно должно быть указано свойство `title` или `url`.</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Время в миллисекундах ожидания между попытками подключения к webview. По умолчанию `500` мс (опционально). <br /><strong>ТОЛЬКО ДЛЯ ANDROID</strong> и будет использоваться только при указании `title` или `url`.</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Максимальное время в миллисекундах ожидания обнаружения страницы webview. По умолчанию `5000` мс (опционально). <br /><strong>ТОЛЬКО ДЛЯ ANDROID</strong> и будет использоваться только при указании `title` или `url`.</td>
    </tr>
  </tbody>
</table>

##### Примеры

```js title="example.test.js"
it('should switch to a webview by name and uses the default Appium `context`-method', async () => {
    // For Android, the context will be '`WEBVIEW_{packageName}`'
    await driver.switchContext('WEBVIEW_com.wdiodemoapp')
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.switchContext('WEBVIEW_94703.19')
})

```

```js title="exact.title.test.js"
it('should switch to a webview and match a webview based on an EXACT match of the `title` of the webview', async () => {
    await driver.switchContext({
        // In this case the title needs to be an exact match
        title: 'Webview Title',
    })
})

```

```js title="exact.url.test.js"
it('should switch to a webview and match a webview based on an EXACT match of the `title` of the webview', async () => {
    await driver.switchContext({
        // In this case the url needs to be an exact match
        url: 'https://webdriver.io',
    })
})

```

```js title="regex.title.url.test.js"
it('should switch to a webview and match a webview based on regex match of the `title` and `url` of the webview', async () => {
    await driver.switchContext({
        // The title should NOT end with 'foo'
        title: /^(?!.*foo$)/,
        // Matches any string that contains the substring `docs/api/mobile/switchContext`
        url: /.*docs\/api\/mobile\/switchContext/,
    })
})

```

```js title="android.context.waits.test.js"
it('should switch to a webview for Android but wait longer to connect and find a webview based on provided options', async () => {
    await driver.switchContext({
        // In this case the title need to be an exact match
        title: 'Webview Title',
        // For Android we might need to wait a bit longer to connect to the webview, so we can provide some additional options
        androidWebviewConnectionRetryTime: 1*1000,  // Retry every 1 second
        androidWebviewConnectTimeout: 10*1000,      // Timeout after 10 seconds
    })
})
```