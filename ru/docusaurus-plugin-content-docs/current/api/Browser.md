---
id: browser
title: Объект Browser
---

__Наследует:__ [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)

Объект browser — это экземпляр сессии, который вы используете для управления браузером или мобильным устройством. Если вы используете тест-раннер WDIO, вы можете получить доступ к экземпляру WebDriver через глобальные объекты `browser` или `driver`, либо импортировать его с помощью [`@wdio/globals`](/docs/api/globals). Если вы используете WebdriverIO в автономном режиме, объект browser возвращается методом [`remote`](/docs/api/modules#remoteoptions-modifier).

Сессия инициализируется тест-раннером. То же самое касается завершения сессии. Это также выполняется процессом тест-раннера.

## Свойства

Объект browser имеет следующие свойства:

| Имя | Тип | Подробности |
| ---- | ---- | ------- |
| `capabilities` | `Object` | Назначенные возможности с удаленного сервера.<br /><b>Пример:</b><pre>\{<br />  acceptInsecureCerts: false,<br />  browserName: 'chrome',<br />  browserVersion: '105.0.5195.125',<br />  chrome: \{<br />    chromedriverVersion: '105.0.5195.52',<br />    userDataDir: '/var/folders/3_/pzc_f56j15vbd9z3r0j050sh0000gn/T/.com.google.Chrome.76HD3S'<br />  \},<br />  'goog:chromeOptions': \{ debuggerAddress: 'localhost:64679' \},<br />  networkConnectionEnabled: false,<br />  pageLoadStrategy: 'normal',<br />  platformName: 'mac os x',<br />  proxy: \{},<br />  setWindowRect: true,<br />  strictFileInteractability: false,<br />  timeouts: \{ implicit: 0, pageLoad: 300000, script: 30000 \},<br />  unhandledPromptBehavior: 'dismiss and notify',<br />  'webauthn:extension:credBlob': true,<br />  'webauthn:extension:largeBlob': true,<br />  'webauthn:virtualAuthenticators': true<br />\}</pre> |
| `requestedCapabilities` | `Object` | Запрошенные возможности с удаленного сервера.<br /><b>Пример:</b><pre>\{ browserName: 'chrome' \}</pre>
| `sessionId` | `String` | Идентификатор сессии, назначенный с удаленного сервера. |
| `options` | `Object` | [Опции](/docs/configuration) WebdriverIO в зависимости от способа создания объекта browser. Подробнее в [типах настройки](/docs/setuptypes). |
| `commandList` | `String[]` | Список команд, зарегистрированных для экземпляра браузера |
| `isW3C` | `Boolean` | Указывает, является ли это сессией W3C |
| `isChrome` | `Boolean` | Указывает, является ли это экземпляром Chrome |
| `isFirefox` | `Boolean` | Указывает, является ли это экземпляром Firefox |
| `isBidi` | `Boolean` | Указывает, использует ли эта сессия Bidi |
| `isSauce` | `Boolean` | Указывает, запущена ли эта сессия на Sauce Labs |
| `isMacApp` | `Boolean` | Указывает, запущена ли эта сессия для нативного приложения Mac |
| `isWindowsApp` | `Boolean` | Указывает, запущена ли эта сессия для нативного приложения Windows |
| `isMobile` | `Boolean` | Указывает на мобильную сессию. Подробнее в разделе [Мобильные флаги](#mobile-flags). |
| `isIOS` | `Boolean` | Указывает на сессию iOS. Подробнее в разделе [Мобильные флаги](#mobile-flags). |
| `isAndroid` | `Boolean` | Указывает на сессию Android. Подробнее в разделе [Мобильные флаги](#mobile-flags). |
| `isNativeContext` | `Boolean`  | Указывает, находится ли мобильное устройство в контексте `NATIVE_APP`. Подробнее в разделе [Мобильные флаги](#mobile-flags). |
| `mobileContext` | `string`  | Предоставляет **текущий** контекст, в котором находится драйвер, например `NATIVE_APP`, `WEBVIEW_<packageName>` для Android или `WEBVIEW_<pid>` для iOS. Это сэкономит дополнительный вызов WebDriver к `driver.getContext()`. Подробнее в разделе [Мобильные флаги](#mobile-flags). |


## Методы

В зависимости от используемого для вашей сессии автоматизационного бэкенда, WebdriverIO определяет, какие [Команды протокола](/docs/api/protocols) будут прикреплены к [объекту браузера](/docs/api/browser). Например, если вы запускаете автоматизированную сессию в Chrome, у вас будет доступ к специфичным для Chromium командам, таким как [`elementHover`](/docs/api/chromium#elementhover), но не к какой-либо из [команд Appium](/docs/api/appium).

Кроме того, WebdriverIO предоставляет набор удобных методов, которые рекомендуется использовать для взаимодействия с [браузером](/docs/api/browser) или [элементами](/docs/api/element) на странице.

Помимо этого доступны следующие команды:

| Имя | Параметры | Подробности |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (Тип: `String`)<br />- `fn` (Тип: `Function`)<br />- `attachToElement` (Тип: `boolean`) | Позволяет определять пользовательские команды, которые можно вызывать из объекта браузера в целях композиции. Подробнее в руководстве [Пользовательские команды](/docs/customcommands). |
| `overwriteCommand` | - `commandName` (Тип: `String`)<br />- `fn` (Тип: `Function`)<br />- `attachToElement` (Тип: `boolean`) | Позволяет перезаписать любую команду браузера пользовательской функциональностью. Используйте осторожно, так как это может запутать пользователей фреймворка. Подробнее в руководстве [Пользовательские команды](/docs/customcommands#overwriting-native-commands). |
| `addLocatorStrategy` | - `strategyName` (Тип: `String`)<br />- `fn` (Тип: `Function`) | Позволяет определить пользовательскую стратегию селектора. Подробнее в руководстве [Селекторы](/docs/selectors#custom-selector-strategies). |

## Примечания

### Мобильные флаги

Если вам нужно изменить ваш тест в зависимости от того, выполняется ли ваша сессия на мобильном устройстве, вы можете использовать мобильные флаги для проверки.

Например, учитывая эту конфигурацию:

```js
// wdio.conf.js
export const config = {
    // ...
    capabilities: \\{
        platformName: 'iOS',
        app: 'net.company.SafariLauncher',
        udid: '123123123123abc',
        deviceName: 'iPhone',
        // ...
    }
    // ...
}
```

Вы можете получить доступ к этим флагам в своем тесте следующим образом:

```js
// Примечание: `driver` эквивалентен объекту `browser`, но семантически более корректен
// вы можете выбрать, какую глобальную переменную хотите использовать
console.log(driver.isMobile) // выводит: true
console.log(driver.isIOS) // выводит: true
console.log(driver.isAndroid) // выводит: false
```

Это может быть полезно, например, если вы хотите определить селекторы в ваших [объектах страниц](../pageobjects) в зависимости от типа устройства, например:

```js
// mypageobject.page.js
import Page from './page'

class LoginPage extends Page {
    // ...
    get username() {
        const selectorAndroid = 'new UiSelector().text("Cancel").className("android.widget.Button")'
        const selectorIOS = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
        const selectorType = driver.isAndroid ? 'android' : 'ios'
        const selector = driver.isAndroid ? selectorAndroid : selectorIOS
        return $(`${selectorType}=${selector}`)
    }
    // ...
}
```

Вы также можете использовать эти флаги для запуска только определенных тестов для определенных типов устройств:

```js
// mytest.e2e.js
describe('my test', () => {
    // ...
    // запускать тест только на устройствах Android
    if (driver.isAndroid) {
        it('tests something only for Android', () => {
            // ...
        })
    }
    // ...
})
```

### События
Объект browser является EventEmitter, и для ваших случаев использования генерируется несколько событий.

Вот список событий. Имейте в виду, что это еще не полный список доступных событий.
Не стесняйтесь вносить свой вклад, добавляя описания других событий здесь.

#### `command`

Это событие генерируется всякий раз, когда WebdriverIO отправляет классическую команду WebDriver. Оно содержит следующую информацию:

- `command`: имя команды, например, `navigateTo`
- `method`: HTTP-метод, использованный для отправки запроса команды, например, `POST`
- `endpoint`: конечная точка команды, например, `/session/fc8dbda381a8bea36a225bd5fd0c069b/url`
- `body`: полезная нагрузка команды, например, `{ url: 'https://webdriver.io' }`

#### `result`

Это событие генерируется всякий раз, когда WebdriverIO получает результат классической команды WebDriver. Оно содержит ту же информацию, что и событие `command`, с добавлением следующей информации:

- `result`: результат команды

#### `bidiCommand`

Это событие генерируется всякий раз, когда WebdriverIO отправляет команду WebDriver Bidi драйверу браузера. Оно содержит информацию о:

- `method`: метод команды WebDriver Bidi
- `params`: связанные параметры команды (см. [API](/docs/api/webdriverBidi))

#### `bidiResult`

В случае успешного выполнения команды, полезная нагрузка события будет:

- `type`: `success`
- `id`: идентификатор команды
- `result`: результат команды (см. [API](/docs/api/webdriverBidi))

В случае ошибки команды, полезная нагрузка события будет:

- `type`: `error`
- `id`: идентификатор команды
- `error`: код ошибки, например, `invalid argument`
- `message`: детали об ошибке
- `stacktrace`: трассировка стека

#### `request.start`
Это событие срабатывает до того, как запрос WebDriver отправляется драйверу. Оно содержит информацию о запросе и его полезной нагрузке.

```ts
browser.on('request.start', (ev: RequestInit) => {
    // ...
})
```

#### `request.end`
Это событие срабатывает, когда запрос к драйверу получает ответ. Объект события содержит либо тело ответа в качестве результата, либо ошибку, если команда WebDriver не удалась.

```ts
browser.on('request.end', (ev: { result: unknown, error?: Error }) => {
    // ...
})
```

#### `request.retry`
Событие повторной попытки может уведомить вас, когда WebdriverIO пытается повторно выполнить команду, например, из-за проблемы с сетью. Оно содержит информацию об ошибке, которая вызвала повторную попытку, и количество уже выполненных повторных попыток.

```ts
browser.on('request.retry', (ev: { error: Error, retryCount: number }) => {
    // ...
})
```

#### `request.performance`
Это событие для измерения операций на уровне WebDriver. Всякий раз, когда WebdriverIO отправляет запрос в бэкенд WebDriver, это событие будет генерироваться с некоторой полезной информацией:

- `durationMillisecond`: Продолжительность запроса в миллисекундах.
- `error`: Объект ошибки, если запрос не удался.
- `request`: Объект запроса. Вы можете найти url, метод, заголовки и т.д.
- `retryCount`: Если это `0`, запрос был первой попыткой. Увеличивается, когда WebDriverIO повторяет попытку внутри себя.
- `success`: Логическое значение, представляющее успешность запроса. Если `false`, свойство `error` также будет предоставлено.

Пример события:
```js
Object {
  "durationMillisecond": 0.01770925521850586,
  "error": [Error: Timeout],
  "request": Object { ... },
  "retryCount": 0,
  "success": false,
},
```

### Пользовательские команды

Вы можете установить пользовательские команды в области действия браузера для абстрагирования часто используемых рабочих процессов. Ознакомьтесь с нашим руководством по [Пользовательским командам](/docs/customcommands#adding-custom-commands) для получения дополнительной информации.