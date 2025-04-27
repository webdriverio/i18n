---
id: getContexts
title: getContexts
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/getContexts.ts
---

Метод WebdriverIO `getContexts` — это улучшенная версия стандартной команды Appium `contexts` 
(и предыдущей WebdriverIO команды `getContexts`). Он предоставляет подробную и удобную информацию 
о доступных контекстах в сессии мобильного приложения, решая ограничения стандартных методов Appium.

### Как работают Webview и чем помогает этот метод
Для получения подробной информации обратитесь к [документации по гибридным приложениям](/docs/api/mobile#hybrid-apps). Ниже приведено краткое описание проблем, которые решает команда `getContexts`:

#### Проблемы Android
- Один webview (например, `WEBVIEW_{packageName}`) может содержать несколько страниц (аналогично вкладкам браузера).
- Стандартные методы Appium не включают подробности об этих страницах, такие как `title`, `url` или видимость,
  что затрудняет идентификацию правильной страницы и может привести к нестабильности.

#### Проблемы iOS
- Стандартный метод Appium возвращает только общие идентификаторы webview (например, `WEBVIEW_{id}`) без дополнительных метаданных.
- Это затрудняет определение того, какой webview соответствует целевому экрану приложения.

Улучшенный метод `getContexts` решает эти проблемы, возвращая подробные объекты контекста, которые включают:
- **Для Android:** `title`, `url`, `packageName`, `webviewPageId` и детали макета (`screenX`, `screenY`, `width` и `height`).
- **Для iOS:** `bundleId`, `title` и `url`.

Эти улучшения делают отладку и взаимодействие с гибридными приложениями более надежными.

### Почему следует использовать этот метод?
По умолчанию метод Appium `contexts` возвращает только массив строк, представляющих доступные контексты:
- **Для Android:** `['NATIVE_APP', 'WEBVIEW_com.wdiodemoapp', ...]`
- **Для iOS:** `['NATIVE_APP', 'WEBVIEW_84392.1', ...]`

Хотя этого достаточно для простых сценариев, в таких стандартных ответах отсутствуют критически важные метаданные для тестирования гибридных приложений:
- **Для Android:** Отсутствие метаданных для конкретных страниц затрудняет взаимодействие с правильным webview.
- **Для iOS:** Общие идентификаторы webview не дают представления о содержимом или экране приложения, которые они представляют.

Улучшенный метод `getContexts` предоставляет:
- Подробные метаданные как для Android, так и для iOS.
- Возможности фильтрации и настройки возвращаемых контекстов для лучшего таргетирования и взаимодействия.

:::info Примечания и ограничения

- Улучшенный метод `getContexts` работает как на платформах Android, так и iOS. Однако возвращаемые данные могут различаться в зависимости от платформы и тестируемого приложения.
- Если вы не укажете опцию `returnDetailedContexts`, метод будет работать как стандартный метод Appium `contexts`, возвращая простой массив контекстов.
- Чтобы использовать "стандартный" метод Appium `contexts`, используйте `driver.getAppiumContexts()`. Для получения дополнительной информации см. [документацию Appium Contexts](/docs/api/appium#getappiumcontexts).

#### Android Webviews:
- Метаданные, такие как `androidWebviewData`, доступны только при значении `returnAndroidDescriptionData` равном `true`.
- Использование метода `getContexts` в браузере Chrome иногда может возвращать неполные данные из-за несоответствия версий браузера/Webview/ChromeDriver. В таких случаях могут возвращаться значения по умолчанию или неверный `webviewPageId` (например, `0`).

:::

##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Подробности</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`GetContextsOptions`</td>
      <td>Опции `getContexts` (опционально)</td>
    </tr>
    <tr>
      <td><code><var>options.returnDetailedContexts</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`boolean`</td>
      <td>По умолчанию мы возвращаем только имена контекстов на основе стандартного API Appium `contexts`. Если вы хотите получить все данные, вы можете установить это значение в `true`. По умолчанию `false` (опционально).</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`number`</td>
      <td>Время в миллисекундах ожидания между каждой попыткой подключения к webview. По умолчанию `500` мс (опционально). <br /><strong>ТОЛЬКО ДЛЯ ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`number`</td>
      <td>Максимальное время в миллисекундах для ожидания обнаружения страницы web view. По умолчанию `5000` мс (опционально). <br /><strong>ТОЛЬКО ДЛЯ ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.filterByCurrentAndroidApp</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`boolean`</td>
      <td>По умолчанию мы возвращаем все webview. Если вы хотите отфильтровать webview по текущему открытому приложению Android, вы можете установить это значение в `true`. По умолчанию `false` (опционально). <br /><strong>ПРИМЕЧАНИЕ:</strong> Имейте в виду, что при этом "ограничении" вы также можете НЕ найти никаких Webview. <br /><strong>ТОЛЬКО ДЛЯ ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.isAndroidWebviewVisible</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`boolean`</td>
      <td>По умолчанию мы возвращаем только webview, которые прикреплены и видимы. Если вы хотите получить все webview, вы можете установить это значение в `false` (опционально). По умолчанию `true`. <br /><strong>ТОЛЬКО ДЛЯ ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.returnAndroidDescriptionData</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`boolean`</td>
      <td>По умолчанию данные описания Android Webview (Chrome) не возвращаются. Если вы хотите получить все данные, вы можете установить это значение в `true`. По умолчанию `false` (опционально). <br />При включении этой опции вы получите дополнительные данные в ответе, для получения дополнительной информации см. `description.data.test.js`. <br /><strong>ТОЛЬКО ДЛЯ ANDROID</strong></td>
    </tr>
  </tbody>
</table>

##### Примеры

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