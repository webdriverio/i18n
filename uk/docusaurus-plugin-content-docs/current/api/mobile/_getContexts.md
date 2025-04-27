---
id: getContexts
title: getContexts
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/getContexts.ts
---

Метод WebdriverIO `getContexts` є вдосконаленою версією стандартної команди Appium `contexts` 
(та попередньої команди WebdriverIO `getContexts`). Він надає детальну та корисну інформацію 
про доступні контексти в сесії мобільного додатку, вирішуючи обмеження стандартних методів Appium.

### Як працюють веб-представлення та чим цей метод допомагає
Для отримання докладнішої інформації зверніться до [документації по гібридним додаткам](/docs/api/mobile#hybrid-apps). Нижче наведено короткий огляд проблем, які вирішує команда `getContexts`:

#### Проблеми Android
- Одне веб-представлення (наприклад, `WEBVIEW_{packageName}`) може містити кілька сторінок (подібно до вкладок браузера).
- Стандартні методи Appium не включають деталі про ці сторінки, такі як `title`, `url` або видимість,
  що ускладнює ідентифікацію потрібної сторінки та може призвести до нестабільності.

#### Проблеми iOS
- Стандартний метод Appium повертає лише загальні ідентифікатори веб-представлень (наприклад, `WEBVIEW_{id}`) без додаткових метаданих.
- Це ускладнює визначення, яке веб-представлення відповідає цільовому екрану додатка.

Вдосконалений метод `getContexts` вирішує ці проблеми, повертаючи детальні об'єкти контексту, які включають:
- **Для Android:** `title`, `url`, `packageName`, `webviewPageId` та деталі макету (`screenX`, `screenY`, `width` та `height`).
- **Для iOS:** `bundleId`, `title` та `url`.

Ці вдосконалення роблять налагодження та взаємодію з гібридними додатками більш надійною.

### Чому варто використовувати цей метод?
За замовчуванням метод Appium `contexts` повертає лише масив рядків, що представляють доступні контексти:
- **Для Android:** `['NATIVE_APP', 'WEBVIEW_com.wdiodemoapp', ...]`
- **Для iOS:** `['NATIVE_APP', 'WEBVIEW_84392.1', ...]`

Хоча цього достатньо для простих сценаріїв, цим стандартним відповідям бракує критичних метаданих для тестування гібридних додатків:
- **Для Android:** Відсутність метаданих, специфічних для сторінки, ускладнює взаємодію з потрібним веб-представленням.
- **Для iOS:** Загальні ідентифікатори веб-представлень не дають уявлення про вміст чи екран додатка, який вони представляють.

Вдосконалений метод `getContexts` забезпечує:
- Детальні метадані як для Android, так і для iOS.
- Можливості фільтрувати та налаштовувати контексти, що повертаються, для кращого таргетування та взаємодії.

:::info Примітки та обмеження

- Вдосконалений метод `getContexts` працює як на платформах Android, так і iOS. Однак дані, що повертаються, можуть відрізнятися залежно від платформи та тестованого додатка.
- Якщо ви не вказуєте опцію `returnDetailedContexts`, метод поводиться як стандартний метод Appium `contexts`, повертаючи простий масив контекстів.
- Щоб використовувати "стандартний" метод Appium `contexts`, використовуйте `driver.getAppiumContexts()`. Для отримання додаткової інформації див. [документацію по контекстам Appium](/docs/api/appium#getappiumcontexts).

#### Веб-представлення Android:
- Метадані, такі як `androidWebviewData`, доступні лише коли `returnAndroidDescriptionData` встановлено як `true`.
- Використання методу `getContexts` у браузері Chrome може іноді повертати неповні дані через невідповідність версій браузера/Webview/ChromeDriver. У таких випадках можуть повертатися значення за замовчуванням або неправильний `webviewPageId` (наприклад, `0`).

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
      <td><code><var>options</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`GetContextsOptions`</td>
      <td>Опції `getContexts` (необов'язково)</td>
    </tr>
    <tr>
      <td><code><var>options.returnDetailedContexts</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`boolean`</td>
      <td>За замовчуванням, ми повертаємо лише назви контекстів на основі стандартного API Appium `contexts`. Якщо ви хочете отримати всі дані, ви можете встановити це значення як `true`. За замовчуванням - `false` (необов'язково).</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`number`</td>
      <td>Час у мілісекундах для очікування між кожною спробою підключення до веб-представлення. За замовчуванням - `500` мс (необов'язково). <br /><strong>ТІЛЬКИ ДЛЯ ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`number`</td>
      <td>Максимальний час у мілісекундах для очікування виявлення сторінки веб-представлення. За замовчуванням - `5000` мс (необов'язково). <br /><strong>ТІЛЬКИ ДЛЯ ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.filterByCurrentAndroidApp</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`boolean`</td>
      <td>За замовчуванням ми повертаємо всі веб-представлення. Якщо ви хочете фільтрувати веб-представлення за поточним відкритим додатком Android, ви можете встановити це значення як `true`. За замовчуванням - `false` (необов'язково). <br /><strong>ПРИМІТКА:</strong> Зверніть увагу, що ви також можете НЕ знайти жодного Webview на основі цього "обмеження". <br /><strong>ТІЛЬКИ ДЛЯ ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.isAndroidWebviewVisible</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`boolean`</td>
      <td>За замовчуванням ми повертаємо лише веб-представлення, які приєднані та видимі. Якщо ви хочете отримати всі веб-представлення, ви можете встановити це значення як `false` (необов'язково). За замовчуванням - `true`. <br /><strong>ТІЛЬКИ ДЛЯ ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.returnAndroidDescriptionData</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`boolean`</td>
      <td>За замовчуванням немає даних опису веб-представлення Android (Chrome). Якщо ви хочете отримати всі дані, ви можете встановити це значення як `true`. За замовчуванням - `false` (необов'язково). <br />Увімкнувши цю опцію, ви отримаєте додаткові дані у відповіді, див. `description.data.test.js` для отримання додаткової інформації. <br /><strong>ТІЛЬКИ ДЛЯ ANDROID</strong></td>
    </tr>
  </tbody>
</table>

##### Приклади

```js title="example.test.js"
it('should return all contexts in the current session with the default Appium `contexts`-method.', async () => {
    // For Android
    await driver.getContexts()
    // Returns ['NATIVE_APP', 'WEBVIEW_com.wdiodemoapp', ...]
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContexts()
    // Returns [ 'NATIVE_APP', 'WEBVIEW_84392.1', ... ]
})

```

```js title="detailed.test.js"
it('should return all contexts in the current session with detailed info.', async () => {
    // For Android
    await driver.getContexts({returnDetailedContexts: true})
    // Returns [
    //   { id: 'NATIVE_APP' },
    //   {
    //       id: 'WEBVIEW_com.wdiodemoapp',
    //       title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //       url: 'https://webdriver.io/',
    //       packageName: 'com.wdiodemoapp',
    //       webviewPageId: '58B0AA2DBBBBBE9008C35AE42385BB0D'
    //   },
    //   {
    //       id: 'WEBVIEW_chrome',
    //       title: 'Android | Get more done with Google on Android-phones and devices',
    //       url: 'https://www.android.com/',
    //       packageName: 'com.android.chrome',
    //       webviewPageId: '0'
    //   }
    // ]
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContexts({returnDetailedContexts: true})
    // Returns: [
    //   { id: 'NATIVE_APP' },
    //   {
    //       id: 'WEBVIEW_86150.1',
    //       title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //       url: 'https://webdriver.io/',
    //       bundleId: 'org.reactjs.native.example.wdiodemoapp'
    //   },
    //   {
    //       id: 'WEBVIEW_86152.1',
    //       title: 'Apple',
    //       url: 'https://www.apple.com/',
    //       bundleId: 'com.apple.mobilesafari'
    //   }
    // ]
})

```

```js title="description.data.test.js"
it('should return Android description data for the webview', async () => {
    // For Android
    await driver.getContexts({returnDetailedContexts: true, returnAndroidDescriptionData: true})
    // Returns [
    //   { id: 'NATIVE_APP' },
    //   {
    //       androidWebviewData: {
    //          // Indicates whether the web page is currently attached to a web view.
    //          // `true` means the page is attached and likely active, `false` indicates it is not.
    //          attached: true,
    //          // Indicates whether the web page is empty or not. An empty page typically means that
    //          // there is no significant content loaded in it. `true` indicates the page is empty,
    //          // `false` indicates it has content.
    //          empty: false,
    //          // Indicates whether the page has never been attached to a web view. If `true`, the
    //          // page has never been attached, which could indicate a new or unused page. If `false`,
    //          // the page has been attached at some point.
    //          neverAttached: false,
    //          // Indicates whether the web page is visible on the screen. `true` means the page is
    //          // visible to the user, `false` means it is not.
    //          visible: true,
    //          // This data can be super useful to determine where on the screen the webview is located
    //          // and can come in handy when you want to interact with elements on the screen based on
    //          // coordinates based on the top-left corner of the screen
    //          screenX: 0,
    //          screenY: 151,
    //          height: 2589,
    //          width: 1344
    //       },
    //       id: 'WEBVIEW_com.wdiodemoapp',
    //       title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //       url: 'https://webdriver.io/',
    //       packageName: 'com.wdiodemoapp',
    //       webviewPageId: '58B0AA2DBBBBBE9008C35AE42385BB0D'
    //   }
    // ]
})
```