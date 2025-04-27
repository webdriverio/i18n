---
id: switchContext
title: switchContext
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/switchContext.ts
---

Перемикання на певний контекст, використовуючи задане `name`, `title` або `url` веб-вікна.

Цей метод розширює стандартну команду Appium `context`, пропонуючи більшу гнучкість і точність 
для перемикання між нативним контекстом та контекстом веб-вікна в гібридних мобільних додатках.

### Як працюють контексти
Для огляду гібридних додатків та веб-вікон зверніться до [документації щодо гібридних додатків](/docs/api/mobile#hybrid-apps).
Нижче наведено короткий огляд того, як команда `switchContext` вирішує поширені проблеми:

#### Проблеми Android
- Веб-вікна часто містять кілька сторінок (подібно до вкладок браузера). Ідентифікація правильної сторінки потребує додаткових
  метаданих, таких як `title` або `url`, які не надаються методами Appium за замовчуванням.
- Методи Appium за замовчуванням повертають лише базові назви контекстів (наприклад, `WEBVIEW_{packageName}`) без деталей про
  вміст або сторінки в межах веб-вікна.
- Перемикання контекстів на Android включає два кроки, які автоматично обробляються цим методом:
  1. Перемикання на контекст веб-вікна за допомогою `WEBVIEW_{packageName}`.
  2. Вибір відповідної сторінки в межах веб-вікна за допомогою методу `switchToWindow`.

#### Проблеми iOS
- Веб-вікна ідентифікуються загальними ідентифікаторами (наприклад, `WEBVIEW_{id}`), які не надають інформації про вміст
  чи екран додатку, якому вони відповідають.
- Визначення правильного веб-вікна для взаємодії часто потребує методу проб і помилок.

Метод `switchContext` спрощує цей процес, отримуючи детальні метадані (наприклад, `title`, `url` та видимість)
для забезпечення точного та надійного перемикання контексту.

### Чому слід використовувати цей метод?
- **Спрощене перемикання**: Якщо ви знаєте `title` або `url` бажаного веб-вікна, цей метод усуває потребу в
  додаткових викликах `getContexts` або комбінуванні кількох методів, таких як `switchContext({id})` та `getTitle()`.
- **Автоматичне співставлення контексту**: Знаходить найкраще співпадіння для контексту на основі:
  - Специфічних для платформи ідентифікаторів (`bundleId` для iOS, `packageName` для Android).
  - Точних або часткових співпадінь для `title` або `url` (підтримує як рядки, так і регулярні вирази).
  - Перевірок для Android, щоб забезпечити прикріплення та видимість веб-вікон.
- **Детальний контроль**: Користувацькі інтервали повторних спроб та тайм-аути (тільки для Android) дозволяють обробляти затримки в ініціалізації веб-вікна.
- **Доступ до методу Appium за замовчуванням**: За необхідності ви можете використовувати стандартну команду Appium `switchContext` через `driver.switchAppiumContext()`.

:::info Примітки та обмеження

- Якщо `title` або `url` бажаного веб-вікна відомий, цей метод може автоматично знайти та перемкнутися на відповідний контекст без додаткових викликів `getContexts`.
- Специфічні для Android опції, такі як `androidWebviewConnectionRetryTime` та `androidWebviewConnectTimeout`, не застосовуються до iOS.
- Записує причини невдач при співставленні контексту для допомоги в налагодженні.
- При використанні об'єкта як вхідних даних вимагається або `title`, або `url`.

:::

##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>context</var></code></td>
      <td>`string, SwitchContextOptions`</td>
      <td>Назва контексту для перемикання. Можна надати об'єкт з додатковими опціями контексту.</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`SwitchContextOptions`</td>
      <td>Опції команди switchContext</td>
    </tr>
    <tr>
      <td><code><var>options.title</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string, RegExp`</td>
      <td>Заголовок сторінки для перемикання. Це буде вміст тегу title веб-сторінки. Ви можете використовувати рядок, який має повністю збігатися, або регулярний вираз.<br /><strong>ВАЖЛИВО:</strong> При використанні опцій потрібно вказати або властивість `title`, або `url`.</td>
    </tr>
    <tr>
      <td><code><var>options.url</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string, RegExp`</td>
      <td>URL сторінки для перемикання. Це буде `url` веб-сторінки. Ви можете використовувати рядок, який має повністю збігатися, або регулярний вираз.<br /><strong>ВАЖЛИВО:</strong> При використанні опцій потрібно вказати або властивість `title`, або `url`.</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Час у мілісекундах для очікування між кожною спробою підключення до веб-вікна. За замовчуванням `500` мс (необов'язково). <br /><strong>ТІЛЬКИ ДЛЯ ANDROID</strong> і буде використовуватися лише коли вказано `title` або `url`.</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Максимальний час у мілісекундах для очікування виявлення сторінки веб-вікна. За замовчуванням `5000` мс (необов'язково). <br /><strong>ТІЛЬКИ ДЛЯ ANDROID</strong> і буде використовуватися лише коли вказано `title` або `url`.</td>
    </tr>
  </tbody>
</table>

##### Приклади

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