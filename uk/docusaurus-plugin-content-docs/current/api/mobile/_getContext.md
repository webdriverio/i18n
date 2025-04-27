---
id: getContext
title: getContext
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/getContext.ts
---

Отримати контекст поточного сеансу.

Цей метод розширює стандартну команду Appium `context`/WebdriverIO `getContext`, надаючи можливість
повертати детальну інформацію про контекст, що полегшує роботу з гібридними додатками, які використовують веб-перегляд.

### Як працюють контексти
Зверніться до [документації Hybrid Apps](/docs/api/mobile#hybrid-apps) для отримання додаткової інформації. Нижче наведено пояснення проблем, пов'язаних з командою `getContext`:

#### Для Android:
- Веб-перегляди можуть містити кілька сторінок (як вкладки браузера), і для ідентифікації правильної сторінки потрібні додаткові метадані,
  такі як `title` або `url`.
- Стандартні методи Appium надають лише основні назви контекстів (наприклад, `WEBVIEW_{packageName}`) без детальної інформації
  про сторінки всередині веб-перегляду.

#### Для iOS:
- Кожен веб-перегляд ідентифікується загальним рядком `WEBVIEW_{id}`, який не вказує на його вміст або екран додатка,
  до якого він належить.

### Чому варто використовувати цей метод?
- **Стандартна поведінка**:
  - Повертає поточний контекст як рядок (наприклад, `NATIVE_APP` або `WEBVIEW_{id}`).
- **Детальний контекст**:
  - Коли увімкнено `returnDetailedContext`, отримує метадані, такі як:
    - **Android**: `packageName`, `title`, `url` та `webviewPageId`.
    - **iOS**: `bundleId`, `title` та `url`.
- **Специфічні опції для Android**:
  - Інтервали повторних спроб і час очікування можна налаштувати для обробки затримок під час ініціалізації веб-перегляду.

:::info Примітки та обмеження

- Якщо `returnDetailedContext` не увімкнено, метод поводиться як стандартний метод Appium `getContext`.
- Якщо ви хочете використовувати "стандартний" метод Appium `context`, ви можете використовувати метод `driver.getAppiumContext()`, див.
також команду [Appium Contexts](/docs/api/appium#getappiumcontext).
- **Android:** Спеціальні опції для Android (`androidWebviewConnectionRetryTime` і `androidWebviewConnectTimeout`) не впливають на iOS.
- Виводить попередження, якщо знайдено кілька або жодного детального контексту:
  - `Ми знайшли більше 1 детального контексту для поточного контексту '{context}'. Ми повернемо перший контекст.`
  - `Ми не отримали жодного детального контексту для поточного контексту '{context}'. Ми повернемо поточний контекст як рядок.`

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
      <td><code><var>options</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>`GetContextsOptions`</td>
      <td>Опції `getContext` (опціонально)</td>
    </tr>
    <tr>
      <td><code><var>options.returnDetailedContext</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>`boolean`</td>
      <td>За замовчуванням ми повертаємо лише назву контексту на основі стандартного API Appium `context`, який є лише рядком. Якщо ви хочете отримати детальну інформацію про контекст, встановіть значення `true`. За замовчуванням `false` (опціонально).</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>`number`</td>
      <td>Час у мілісекундах для очікування між кожною спробою підключення до веб-перегляду. За замовчуванням `500` мс (опціонально). <br /><strong>ТІЛЬКИ ДЛЯ ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>`number`</td>
      <td>Максимальний час у мілісекундах для очікування виявлення сторінки веб-перегляду. За замовчуванням `5000` мс (опціонально). <br /><strong>ТІЛЬКИ ДЛЯ ANDROID</strong></td>
    </tr>
  </tbody>
</table>

##### Приклади

```js title="default.test.js"
it('should return the current context with the default Appium `context` method', async () => {
    // For Android
    await driver.getContext()
    // Returns 'WEBVIEW_com.wdiodemoapp' or 'NATIVE_APP'
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContext()
    // Returns 'WEBVIEW_94703.19' or 'NATIVE_APP'
})

```

```js title="detailed.test.js"
it('should return the context of the current session with more detailed information', async () => {
    // For Android
    await driver.getContext({ returnDetailedContext: true})
    // Returns or `NATIVE_APP`, or
    // {
    //   id: 'WEBVIEW_com.wdiodemoapp',
    //   title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //   url: 'https://webdriver.io/',
    //   packageName: 'com.wdiodemoapp',
    //   webviewPageId: '5C0425CF67E9B169245F48FF21172912'
    // }
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContext({ returnDetailedContext: true})
    // Returns or `NATIVE_APP`, or
    // {
    //   id: 'WEBVIEW_64981.1',
    //   title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //   url: 'https://webdriver.io/',
    //   bundleId: 'org.reactjs.native.example.wdiodemoapp'
    // }
})

```

```js title="customize.retry.test.js"
it('should be able to cusomize the retry intervals and timeouts to handle delayed webview initialization', async () => {
    // For Android
    await driver.getContext({
        returnDetailedContext: true,
        // NOTE: The following options are Android-specific
        // For Android we might need to wait a bit longer to connect to the webview, so we can provide some additional options
        androidWebviewConnectionRetryTime: 1*1000,  // Retry every 1 second
        androidWebviewConnectTimeout: 10*1000,      // Timeout after 10 seconds
    })
})
```