---
id: getContext
title: getContext
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/getContext.ts
---

Получение контекста текущей сессии.

Этот метод расширяет стандартную команду Appium `context`/WebdriverIO `getContext`, предоставляя возможность 
получать подробную информацию о контексте, что упрощает работу с гибридными приложениями, использующими веб-представления.

### Как работают контексты
Обратитесь к [документации по гибридным приложениям](/docs/api/mobile#hybrid-apps) для получения дополнительной информации. Ниже приведено объяснение сложностей, связанных с командой `getContext`:

#### Для Android:
- Веб-представления могут содержать несколько страниц (как вкладки браузера), и идентификация правильной страницы требует дополнительных метаданных, 
  таких как `title` или `url`.
- Стандартные методы Appium предоставляют только базовые имена контекстов (например, `WEBVIEW_{packageName}`) без подробной информации 
  о страницах внутри веб-представления.

#### Для iOS:
- Каждое веб-представление идентифицируется общей строкой `WEBVIEW_{id}`, которая не указывает на его содержимое или экран приложения, 
  к которому оно принадлежит.

### Почему стоит использовать этот метод?
- **Стандартное поведение**:
  - Возвращает текущий контекст в виде строки (например, `NATIVE_APP` или `WEBVIEW_{id}`).
- **Подробный контекст**:
  - Когда `returnDetailedContext` включен, извлекаются метаданные, такие как:
    - **Android**: `packageName`, `title`, `url` и `webviewPageId`.
    - **iOS**: `bundleId`, `title` и `url`.
- **Опции, специфичные для Android**:
  - Интервалы повторных попыток и тайм-ауты могут быть настроены для обработки задержек при инициализации веб-представления.

:::info Примечания и ограничения

- Если `returnDetailedContext` не включен, метод ведет себя как стандартный метод Appium `getContext`.
- Если вы хотите использовать "стандартный" метод Appium `context`, вы можете использовать метод `driver.getAppiumContext()`, см.
также команду [Appium Contexts](/docs/api/appium#getappiumcontext).
- **Android:** Опции, специфичные для Android (`androidWebviewConnectionRetryTime` и `androidWebviewConnectTimeout`), не влияют на iOS.
- Выводит предупреждения, если найдено несколько или ни одного подробного контекста:
  - `We found more than 1 detailed context for the current context '{context}'. We will return the first context.`
  - `We did not get back any detailed context for the current context '{context}'. We will return the current context as a string.`

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
      <td><code><var>options</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`GetContextsOptions`</td>
      <td>Опции `getContext` (необязательно)</td>
    </tr>
    <tr>
      <td><code><var>options.returnDetailedContext</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`boolean`</td>
      <td>По умолчанию мы возвращаем только имя контекста на основе стандартного API Appium `context`, которое является только строкой. Если вы хотите получить подробную информацию о контексте, установите значение `true`. По умолчанию `false` (необязательно).</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`number`</td>
      <td>Время в миллисекундах ожидания между каждой попыткой подключения к веб-представлению. По умолчанию `500` мс (необязательно). <br /><strong>ТОЛЬКО ДЛЯ ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`number`</td>
      <td>Максимальное время в миллисекундах ожидания обнаружения страницы веб-представления. По умолчанию `5000` мс (необязательно). <br /><strong>ТОЛЬКО ДЛЯ ANDROID</strong></td>
    </tr>
  </tbody>
</table>

##### Примеры

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