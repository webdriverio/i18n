---
id: browser
title: Объект Browser
---

__Расширяет:__ [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)

Объект browser — это экземпляр сессии, с помощью которого вы управляете браузером или мобильным устройством. Если вы используете тестовый раннер WDIO, вы можете получить доступ к экземпляру WebDriver через глобальный объект `browser` или `driver` либо импортировать его с помощью [`@wdio/globals`](/docs/api/globals). Если вы используете WebdriverIO в автономном режиме, объект browser возвращается методом [`remote`](/docs/api/modules#remoteoptions-modifier).

Сессия инициализируется тестовым раннером. То же самое относится и к завершению сессии — это также выполняется процессом тестового раннера.

## Свойства

Объект browser имеет следующие свойства:

| Имя | Тип | Подробности |
| ---- | ---- | ------- |
| `capabilities` | `Object` | Возможности (capabilities), назначенные удалённым сервером.<br /><b>Пример:</b><pre>\{<br />  acceptInsecureCerts: false,<br />  browserName: 'chrome',<br />  browserVersion: '105.0.5195.125',<br />  chrome: \{<br />    chromedriverVersion: '105.0.5195.52',<br />    userDataDir: '/var/folders/3_/pzc_f56j15vbd9z3r0j050sh0000gn/T/.com.google.Chrome.76HD3S'<br />  \},<br />  'goog:chromeOptions': \{ debuggerAddress: 'localhost:64679' \},<br />  networkConnectionEnabled: false,<br />  pageLoadStrategy: 'normal',<br />  platformName: 'mac os x',<br />  proxy: \{},<br />  setWindowRect: true,<br />  strictFileInteractability: false,<br />  timeouts: \{ implicit: 0, pageLoad: 300000, script: 30000 \},<br />  unhandledPromptBehavior: 'dismiss and notify',<br />  'webauthn:extension:credBlob': true,<br />  'webauthn:extension:largeBlob': true,<br />  'webauthn:virtualAuthenticators': true<br />\}</pre> |
| `requestedCapabilities` | `Object` | Возможности, запрошенные у удалённого сервера.<br /><b>Пример:</b><pre>\{ browserName: 'chrome' \}</pre>
| `sessionId` | `String` | Идентификатор сессии, назначенный удалённым сервером. |
| `options` | `Object` | [Опции](/docs/configuration) WebdriverIO в зависимости от того, как был создан объект browser. Подробнее о [типах настройки](/docs/setuptypes). |
| `commandList` | `String[]` | Список команд, зарегистрированных в экземпляре браузера |
| `isChrome` | `Boolean` | Указывает, является ли это экземпляром Chrome |
| `isFirefox` | `Boolean` | Указывает, является ли это экземпляром Firefox |
| `isBidi` | `Boolean` | Указывает, использует ли эта сессия Bidi |
| `isSauce` | `Boolean` | Указывает, выполняется ли эта сессия в Sauce Labs |
| `isMacApp` | `Boolean` | Указывает, выполняется ли эта сессия для нативного приложения Mac |
| `isWindowsApp` | `Boolean` | Указывает, выполняется ли эта сессия для нативного приложения Windows |
| `isMobile` | `Boolean` | Указывает на мобильную сессию. Подробнее в разделе [Мобильные флаги](#mobile-flags). |
| `isIOS` | `Boolean` | Указывает на сессию iOS. Подробнее в разделе [Мобильные флаги](#mobile-flags). |
| `isAndroid` | `Boolean` | Указывает на сессию Android. Подробнее в разделе [Мобильные флаги](#mobile-flags). |
| `isNativeContext` | `Boolean`  | Указывает, находится ли мобильное устройство в контексте `NATIVE_APP`. Подробнее в разделе [Мобильные флаги](#mobile-flags). |
| `mobileContext` | `string`  | Предоставляет **текущий** контекст, в котором находится драйвер, например `NATIVE_APP`, `WEBVIEW_<packageName>` для Android или `WEBVIEW_<pid>` для iOS. Это избавляет от дополнительного вызова WebDriver `driver.getContext()`. Подробнее в разделе [Мобильные флаги](#mobile-flags). |


## Методы

В зависимости от бэкенда автоматизации, используемого для вашей сессии, WebdriverIO определяет, какие [команды протокола](/docs/api/protocols) будут подключены к [объекту browser](/docs/api/browser). Например, если вы запускаете автоматизированную сессию в Chrome, у вас будет доступ к специфичным для Chromium командам, таким как [`elementHover`](/docs/api/chromium#elementhover), но не к [командам Appium](/docs/api/appium).

Кроме того, WebdriverIO предоставляет набор удобных методов, которые рекомендуется использовать для взаимодействия с [браузером](/docs/api/browser) или [элементами](/docs/api/element) на странице.

В дополнение к этому доступны следующие команды:

| Имя | Параметры | Подробности |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (Тип: `String`)<br />- `fn` (Тип: `Function`)<br />- `attachToElement` (Тип: `boolean`) | Позволяет определять пользовательские команды, которые можно вызывать из объекта browser для целей композиции. Подробнее в руководстве [Пользовательские команды](/docs/customcommands). |
| `overwriteCommand` | - `commandName` (Тип: `String`)<br />- `fn` (Тип: `Function`)<br />- `attachToElement` (Тип: `boolean`) | Позволяет перезаписать любую команду браузера пользовательской функциональностью. Используйте с осторожностью, так как это может запутать пользователей фреймворка. Подробнее в руководстве [Пользовательские команды](/docs/customcommands#overwriting-native-commands). |
| `addLocatorStrategy` | - `strategyName` (Тип: `String`)<br />- `fn` (Тип: `Function`) | Позволяет определить пользовательскую стратегию селекторов, подробнее в руководстве [Селекторы](/docs/selectors#custom-selector-strategies). |

## Примечания

### Мобильные флаги

Если вам нужно изменить тест в зависимости от того, выполняется ли ваша сессия на мобильном устройстве, вы можете проверить мобильные флаги.

Например, при такой конфигурации:

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

Вы можете получить доступ к этим флагам в тесте следующим образом:

```js
// Примечание: `driver` эквивалентен объекту `browser`, но семантически более корректен
// вы можете выбрать, какую глобальную переменную использовать
console.log(driver.isMobile) // выводит: true
console.log(driver.isIOS) // выводит: true
console.log(driver.isAndroid) // выводит: false
```

Это может быть полезно, если, например, вы хотите определять селекторы в своих [объектах страниц](../pageobjects) в зависимости от типа устройства, например так:

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

Вы также можете использовать эти флаги, чтобы запускать определённые тесты только для определённых типов устройств:

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
Объект browser является EventEmitter, и для ваших сценариев использования генерируется ряд событий.

Ниже приведён список событий. Имейте в виду, что это пока не полный список доступных событий.
Не стесняйтесь вносить вклад в обновление документации, добавляя сюда описания других событий.

#### `command`

Это событие генерируется каждый раз, когда WebdriverIO отправляет команду WebDriver Classic. Оно содержит следующую информацию:

- `command`: имя команды, например `navigateTo`
- `method`: HTTP-метод, используемый для отправки запроса команды, например `POST`
- `endpoint`: конечная точка команды, например `/session/fc8dbda381a8bea36a225bd5fd0c069b/url`
- `body`: полезная нагрузка команды, например `{ url: 'https://webdriver.io' }`

#### `result`

Это событие генерируется каждый раз, когда WebdriverIO получает результат команды WebDriver Classic. Оно содержит ту же информацию, что и событие `command`, а также следующую информацию:

- `result`: результат команды

#### `bidiCommand`

Это событие генерируется каждый раз, когда WebdriverIO отправляет команду WebDriver Bidi драйверу браузера. Оно содержит информацию о:

- `method`: метод команды WebDriver Bidi
- `params`: связанный параметр команды (см. [API](/docs/api/webdriverBidi))

#### `bidiResult`

В случае успешного выполнения команды полезная нагрузка события будет следующей:

- `type`: `success`
- `id`: идентификатор команды
- `result`: результат команды (см. [API](/docs/api/webdriverBidi))

В случае ошибки команды полезная нагрузка события будет следующей:

- `type`: `error`
- `id`: идентификатор команды
- `error`: код ошибки, например `invalid argument`
- `message`: подробности об ошибке
- `stacktrace`: трассировка стека

#### `request.start`
Это событие срабатывает перед отправкой запроса WebDriver драйверу. Оно содержит информацию о запросе и его полезной нагрузке.

```ts
browser.on('request.start', (ev: RequestInit) => {
    // ...
})
```

#### `request.end`
Это событие срабатывает, как только запрос к драйверу получил ответ. Объект события содержит либо тело ответа в качестве результата, либо ошибку, если команда WebDriver завершилась неудачей.

```ts
browser.on('request.end', (ev: { result: unknown, error?: Error }) => {
    // ...
})
```

#### `request.retry`
Событие повтора может уведомить вас, когда WebdriverIO пытается повторно выполнить команду, например из-за проблем с сетью. Оно содержит информацию об ошибке, вызвавшей повтор, и количестве уже выполненных повторов.

```ts
browser.on('request.retry', (ev: { error: Error, retryCount: number }) => {
    // ...
})
```

#### `request.performance`
Это событие для измерения операций на уровне WebDriver. Каждый раз, когда WebdriverIO отправляет запрос бэкенду WebDriver, это событие генерируется с полезной информацией:

- `durationMillisecond`: продолжительность запроса в миллисекундах.
- `error`: объект ошибки, если запрос завершился неудачей.
- `request`: объект запроса. В нём можно найти url, метод, заголовки и т. д.
- `retryCount`: если значение равно `0`, запрос был первой попыткой. Значение увеличивается, когда WebDriverIO выполняет повторы под капотом.
- `success`: логическое значение, показывающее, был ли запрос успешным. Если оно равно `false`, также будет предоставлено свойство `error`.

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

Вы можете задавать пользовательские команды в области видимости browser, чтобы абстрагировать часто используемые рабочие процессы. Дополнительную информацию см. в нашем руководстве [Пользовательские команды](/docs/customcommands#adding-custom-commands).