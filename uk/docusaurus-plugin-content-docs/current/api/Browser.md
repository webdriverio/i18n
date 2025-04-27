---
id: browser
title: Об'єкт Browser
---

__Розширює:__ [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)

Об'єкт browser — це екземпляр сесії, який ви використовуєте для керування браузером або мобільним пристроєм. Якщо ви використовуєте тест-ранер WDIO, ви можете отримати доступ до екземпляра WebDriver через глобальний об'єкт `browser` або `driver` або імпортувати його з пакета [`@wdio/globals`](/docs/api/globals). Якщо ви використовуєте WebdriverIO в автономному режимі, об'єкт browser повертається методом [`remote`](/docs/api/modules#remoteoptions-modifier).

Сесія ініціалізується тест-ранером. Те саме стосується і завершення сесії. Це також виконується процесом тест-ранера.

## Властивості

Об'єкт browser має такі властивості:

| Назва | Тип | Деталі |
| ---- | ---- | ------- |
| `capabilities` | `Object` | Призначені можливості від віддаленого сервера.<br /><b>Приклад:</b><pre>\{<br />  acceptInsecureCerts: false,<br />  browserName: 'chrome',<br />  browserVersion: '105.0.5195.125',<br />  chrome: \{<br />    chromedriverVersion: '105.0.5195.52',<br />    userDataDir: '/var/folders/3_/pzc_f56j15vbd9z3r0j050sh0000gn/T/.com.google.Chrome.76HD3S'<br />  \},<br />  'goog:chromeOptions': \{ debuggerAddress: 'localhost:64679' \},<br />  networkConnectionEnabled: false,<br />  pageLoadStrategy: 'normal',<br />  platformName: 'mac os x',<br />  proxy: \{},<br />  setWindowRect: true,<br />  strictFileInteractability: false,<br />  timeouts: \{ implicit: 0, pageLoad: 300000, script: 30000 \},<br />  unhandledPromptBehavior: 'dismiss and notify',<br />  'webauthn:extension:credBlob': true,<br />  'webauthn:extension:largeBlob': true,<br />  'webauthn:virtualAuthenticators': true<br />\}</pre> |
| `requestedCapabilities` | `Object` | Можливості, запитані від віддаленого сервера.<br /><b>Приклад:</b><pre>\{ browserName: 'chrome' \}</pre>
| `sessionId` | `String` | Ідентифікатор сесії, призначений віддаленим сервером. |
| `options` | `Object` | [Опції](/docs/configuration) WebdriverIO залежно від того, як був створений об'єкт browser. Дивіться більше в [типах налаштування](/docs/setuptypes). |
| `commandList` | `String[]` | Список команд, зареєстрованих для екземпляра браузера |
| `isW3C` | `Boolean` | Вказує, чи це сесія W3C |
| `isChrome` | `Boolean` | Вказує, чи це екземпляр Chrome |
| `isFirefox` | `Boolean` | Вказує, чи це екземпляр Firefox |
| `isBidi` | `Boolean` | Вказує, чи ця сесія використовує Bidi |
| `isSauce` | `Boolean` | Вказує, чи ця сесія працює в Sauce Labs |
| `isMacApp` | `Boolean` | Вказує, чи ця сесія працює для нативної програми Mac |
| `isWindowsApp` | `Boolean` | Вказує, чи ця сесія працює для нативної програми Windows |
| `isMobile` | `Boolean` | Вказує на мобільну сесію. Дивіться більше в розділі [Мобільні прапори](#mobile-flags). |
| `isIOS` | `Boolean` | Вказує на сесію iOS. Дивіться більше в розділі [Мобільні прапори](#mobile-flags). |
| `isAndroid` | `Boolean` | Вказує на сесію Android. Дивіться більше в розділі [Мобільні прапори](#mobile-flags). |
| `isNativeContext` | `Boolean`  | Вказує, чи мобільний пристрій знаходиться в контексті `NATIVE_APP`. Дивіться більше в розділі [Мобільні прапори](#mobile-flags). |
| `mobileContext` | `string`  | Надасть **поточний** контекст, в якому знаходиться драйвер, наприклад `NATIVE_APP`, `WEBVIEW_<packageName>` для Android або `WEBVIEW_<pid>` для iOS. Це заощадить додатковий WebDriver запит до `driver.getContext()`. Дивіться більше в розділі [Мобільні прапори](#mobile-flags). |


## Методи

На основі автоматизаційного бекенду, який використовується для вашої сесії, WebdriverIO визначає, які [Протокольні команди](/docs/api/protocols) будуть приєднані до [об'єкта browser](/docs/api/browser). Наприклад, якщо ви запускаєте автоматизовану сесію в Chrome, ви матимете доступ до специфічних команд Chromium, таких як [`elementHover`](/docs/api/chromium#elementhover), але не до жодної з [команд Appium](/docs/api/appium).

Крім того, WebdriverIO надає набір зручних методів, які рекомендується використовувати для взаємодії з [браузером](/docs/api/browser) або [елементами](/docs/api/element) на сторінці.

Додатково доступні такі команди:

| Назва | Параметри | Деталі |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (Тип: `String`)<br />- `fn` (Тип: `Function`)<br />- `attachToElement` (Тип: `boolean`) | Дозволяє визначати власні команди, які можна викликати з об'єкта browser для цілей композиції. Дізнайтеся більше в посібнику [Користувацька команда](/docs/customcommands). |
| `overwriteCommand` | - `commandName` (Тип: `String`)<br />- `fn` (Тип: `Function`)<br />- `attachToElement` (Тип: `boolean`) | Дозволяє перезаписати будь-яку команду браузера власною функціональністю. Використовуйте обережно, оскільки це може заплутати користувачів фреймворку. Дізнайтеся більше в посібнику [Користувацька команда](/docs/customcommands#overwriting-native-commands). |
| `addLocatorStrategy` | - `strategyName` (Тип: `String`)<br />- `fn` (Тип: `Function`) | Дозволяє визначити власну стратегію селектора, дізнайтеся більше в посібнику [Селектори](/docs/selectors#custom-selector-strategies). |

## Примітки

### Мобільні прапори

Якщо вам потрібно змінити свій тест залежно від того, чи виконується ваша сесія на мобільному пристрої, ви можете перевірити мобільні прапори.

Наприклад, за такої конфігурації:

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

Ви можете отримати доступ до цих прапорів у своєму тесті наступним чином:

```js
// Примітка: `driver` еквівалентний об'єкту `browser`, але семантично більш правильний
// ви можете вибрати, яку глобальну змінну використовувати
console.log(driver.isMobile) // виведе: true
console.log(driver.isIOS) // виведе: true
console.log(driver.isAndroid) // виведе: false
```

Це може бути корисно, наприклад, якщо ви хочете визначити селектори у своїх [об'єктах сторінок](../pageobjects) на основі типу пристрою, ось так:

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

Ви також можете використовувати ці прапори для запуску певних тестів лише для певних типів пристроїв:

```js
// mytest.e2e.js
describe('my test', () => {
    // ...
    // запускати тест лише для пристроїв Android
    if (driver.isAndroid) {
        it('tests something only for Android', () => {
            // ...
        })
    }
    // ...
})
```

### Події
Об'єкт browser є EventEmitter, і для ваших випадків використання генерується кілька подій.

Ось список подій. Майте на увазі, що це ще не повний список доступних подій.
Не соромтеся робити внесок для оновлення документа, додаючи описи інших подій тут.

#### `command`

Ця подія генерується кожного разу, коли WebdriverIO надсилає команду класичного WebDriver. Вона містить наступну інформацію:

- `command`: назва команди, наприклад, `navigateTo`
- `method`: HTTP-метод, який використовується для надсилання запиту команди, наприклад, `POST`
- `endpoint`: кінцева точка команди, наприклад, `/session/fc8dbda381a8bea36a225bd5fd0c069b/url`
- `body`: корисне навантаження команди, наприклад, `{ url: 'https://webdriver.io' }`

#### `result`

Ця подія генерується кожного разу, коли WebdriverIO отримує результат команди класичного WebDriver. Вона містить ту саму інформацію, що й подія `command`, з додаванням такої інформації:

- `result`: результат команди

#### `bidiCommand`

Ця подія генерується кожного разу, коли WebdriverIO надсилає команду WebDriver Bidi до драйвера браузера. Вона містить інформацію про:

- `method`: метод команди WebDriver Bidi
- `params`: пов'язаний параметр команди (див. [API](/docs/api/webdriverBidi))

#### `bidiResult`

У випадку успішного виконання команди, корисне навантаження події буде:

- `type`: `success`
- `id`: ідентифікатор команди
- `result`: результат команди (див. [API](/docs/api/webdriverBidi))

У випадку помилки команди, корисне навантаження події буде:

- `type`: `error`
- `id`: ідентифікатор команди
- `error`: код помилки, наприклад, `invalid argument`
- `message`: деталі про помилку
- `stacktrace`: трасування стеку

#### `request.start`
Ця подія запускається перед надсиланням запиту WebDriver до драйвера. Вона містить інформацію про запит та його корисне навантаження.

```ts
browser.on('request.start', (ev: RequestInit) => {
    // ...
})
```

#### `request.end`
Ця подія запускається після отримання відповіді на запит до драйвера. Об'єкт події містить або тіло відповіді як результат, або помилку, якщо команда WebDriver не виконалася.

```ts
browser.on('request.end', (ev: { result: unknown, error?: Error }) => {
    // ...
})
```

#### `request.retry`
Подія повторної спроби може повідомити вас, коли WebdriverIO намагається повторно запустити команду, наприклад, через проблеми з мережею. Вона містить інформацію про помилку, яка спричинила повторну спробу, та кількість уже виконаних повторних спроб.

```ts
browser.on('request.retry', (ev: { error: Error, retryCount: number }) => {
    // ...
})
```

#### `request.performance`
Це подія для вимірювання операцій на рівні WebDriver. Щоразу, коли WebdriverIO надсилає запит до бекенду WebDriver, ця подія буде генеруватися з корисною інформацією:

- `durationMillisecond`: Тривалість запиту в мілісекундах.
- `error`: Об'єкт помилки, якщо запит не вдався.
- `request`: Об'єкт запиту. Ви можете знайти url, метод, заголовки тощо.
- `retryCount`: Якщо це `0`, запит був першою спробою. Він збільшуватиметься, коли WebDriverIO повторюватиме спробу.
- `success`: Булеве значення, що представляє, чи запит був успішним чи ні. Якщо це `false`, також буде надано властивість `error`.

Приклад події:
```js
Object {
  "durationMillisecond": 0.01770925521850586,
  "error": [Error: Timeout],
  "request": Object { ... },
  "retryCount": 0,
  "success": false,
},
```

### Користувацькі команди

Ви можете встановити користувацькі команди в області браузера для абстрагування робочих процесів, які часто використовуються. Перегляньте наш посібник з [Користувацьких команд](/docs/customcommands#adding-custom-commands) для отримання додаткової інформації.