---
id: wdio-vscode-service
title: Сервіс Тестування Розширень VSCode
custom_edit_url: https://github.com/webdriverio-community/wdio-vscode-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-vscode-service є пакетом сторонніх розробників, для отримання додаткової інформації відвідайте [GitHub](https://github.com/webdriverio-community/wdio-vscode-service) | [npm](https://www.npmjs.com/package/wdio-vscode-service)

Протестовано на:

[![VSCode Version](https://img.shields.io/badge/VSCode%20Version-insiders%20/%20stable%20/%20v1.86.0%20/%20web-brightgreen)](https://github.com/webdriverio-community/wdio-vscode-service/actions/workflows/ci.yml) [![CI Status](https://img.shields.io/badge/Platform-windows%20%2F%20macos%20%2F%20ubuntu-brightgreen)](https://github.com/webdriverio-community/wdio-vscode-service/actions/workflows/ci.yml)

> Сервіс WebdriverIO для тестування розширень VSCode.

Цей сервіс WebdriverIO дозволяє безперешкодно тестувати ваші розширення VSCode від початку до кінця в настільному середовищі VSCode IDE або як веб-розширення. Вам потрібно лише вказати шлях до вашого розширення, і сервіс зробить решту, а саме:

- 🏗️ Встановлення VSCode (або `stable`, `insiders`, або вказаної версії)
- ⬇️ Завантаження Chromedriver, що відповідає конкретній версії VSCode
- 🚀 Надає вам доступ до API VSCode з ваших тестів
- 🖥️ Запускає VSCode з користувацькими налаштуваннями (включаючи підтримку VSCode на Ubuntu, MacOS та Windows)
- 🌐 Або надає VSCode з сервера для доступу через будь-який браузер для тестування [веб-розширень](https://code.visualstudio.com/api/extension-guides/web-extensions)
- 📔 Створює об'єкти сторінок з локаторами, що відповідають вашій версії VSCode

Цей проект був значною мірою натхненний проектом [vscode-extension-tester](https://www.npmjs.com/package/vscode-extension-tester), який базується на Selenium. Цей пакет бере ідею і адаптує її до WebdriverIO.

Починаючи з VSCode v1.86 необхідно використовувати `webdriverio` v8.14 або новішої версії для встановлення Chromedriver без необхідності додаткової конфігурації. Якщо вам потрібно тестувати більш ранні версії VSCode, див. розділ [Налаштування Chromedriver](#chromedriver) нижче.

## Встановлення

Щоб ініціювати новий проект WebdriverIO, виконайте:

```bash
npm create wdio ./
```

Майстер встановлення проведе вас через процес. Переконайтеся, що ви вибрали TypeScript як компілятор і не вибираєте опцію генерації об'єктів сторінок, оскільки цей проект включає всі необхідні об'єкти сторінок. Потім переконайтеся, що ви вибрали `vscode` у списку сервісів:

![Install Demo](https://raw.githubusercontent.com/webdriverio-community/wdio-vscode-service/main/.github/assets/demo.gif "Install Demo")

Для отримання додаткової інформації про встановлення `WebdriverIO` перегляньте [документацію проекту](https://webdriver.io/docs/gettingstarted).

## Приклад конфігурації

Щоб використовувати сервіс, вам потрібно додати `vscode` до вашого списку сервісів, опціонально з об'єктом конфігурації. Це змусить WebdriverIO завантажити вказані бінарні файли VSCode і відповідну версію Chromedriver:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.86.0', // "insiders" або "stable" для останньої версії VSCode
        'wdio:vscodeOptions': {
            extensionPath: __dirname,
            userSettings: {
                "editor.fontSize": 14
            }
        }
    }],
    services: ['vscode'],
    /**
     * Опціонально визначте шлях, де WebdriverIO зберігає всі бінарні файли VSCode, наприклад:
     * services: [['vscode', { cachePath: __dirname }]]
     */
    // ...
};
```

Якщо ви визначите `wdio:vscodeOptions` з будь-яким іншим `browserName`, окрім `vscode`, наприклад, `chrome`, сервіс надаватиме розширення як веб-розширення. Якщо ви тестуєте на Chrome, жодного додаткового сервісу драйвера не потрібно, наприклад:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'chrome',
        'wdio:vscodeOptions': {
            extensionPath: __dirname
        }
    }],
    services: ['vscode'],
    // ...
};
```

_Примітка:_ при тестуванні веб-розширень ви можете вибирати лише між `stable` або `insiders` як `browserVersion`.

### Налаштування TypeScript

У вашому `tsconfig.json` переконайтеся, що ви додали `wdio-vscode-service` до списку типів:

```json
{
    "compilerOptions": {
        "types": [
            "node",
            "webdriverio/async",
            "@wdio/mocha-framework",
            "expect-webdriverio",
            "wdio-vscode-service"
        ],
        "target": "es2019",
        "moduleResolution": "node",
        "esModuleInterop": true
    }
}
```

## Використання

Ви можете використовувати метод `getWorkbench` для доступу до об'єктів сторінок для локаторів, що відповідають бажаній версії VSCode:

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

### Доступ до API VSCode

Якщо ви хочете виконати певну автоматизацію через [API VSCode](https://code.visualstudio.com/api/references/vscode-api), ви можете це зробити, виконуючи віддалені команди через власну команду `executeWorkbench`. Ця команда дозволяє віддалено виконувати код з вашого тесту в середовищі VSCode і надає вам доступ до API VSCode. Ви можете передавати довільні параметри у функцію, які потім будуть передані у функцію. Об'єкт `vscode` завжди буде переданий як перший аргумент, після якого йдуть зовнішні параметри функції. Зауважте, що ви не можете отримати доступ до змінних поза областю функції, оскільки зворотний виклик виконується віддалено. Ось приклад:

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // виведе: "I am an API call!"
```

Для повної документації об'єктів сторінок перегляньте [документацію](https://webdriverio-community.github.io/wdio-vscode-service/modules.html). Ви можете знайти різні приклади використання в [наборі тестів цього проекту](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs).

## Конфігурація

За допомогою конфігурації сервісу ви можете керувати версією VSCode, а також користувацькими налаштуваннями для VSCode:

### Опції сервісу

Опції сервісу - це опції, необхідні для налаштування тестового середовища.

#### `cachePath`

Визначте шлях до кешу, щоб уникнути повторного завантаження пакетів VS Code. Це корисно для CI/CD, щоб уникнути повторного завантаження VSCode для кожного тестового запуску.

Тип: `string`<br />
За замовчуванням: `process.cwd()`

### Можливості VSCode (`wdio:vscodeOptions`)

Щоб запускати тести через VSCode, ви повинні визначити `vscode` як `browserName`. Ви можете вказати версію VSCode, надавши можливість `browserVersion`. Користувацькі опції VSCode потім визначаються в межах спеціальної можливості `wdio:vscodeOptions`. Опції такі:

#### `binary`

Шлях до локально встановленого VSCode. Якщо опція не надана, сервіс завантажить VSCode на основі заданого `browserVersion` (або `stable`, якщо не вказано).

Тип: `string`

#### `extensionPath`

Визначає директорію до розширення, яке ви хочете тестувати.

Тип: `string`

#### `storagePath`

Визначає власне розташування для VS Code для зберігання всіх своїх даних. Це корінь для внутрішніх директорій VS Code, таких як (неповний список)
* **user-data-dir**: Директорія, де зберігаються всі налаштування користувача (глобальні налаштування), журнали розширень тощо.
* **extension-install-dir**: Директорія, де встановлені розширення VS Code.

Якщо не надано, використовується тимчасова директорія.

Тип: `string`

#### `userSettings`

Визначте користувацькі налаштування, які будуть застосовані до VSCode.

Тип: `Record<string, number | string | object | boolean>`<br />
За замовчуванням: `{}`

#### `workspacePath`

Відкриває VSCode для конкретного робочого простору. Якщо не надано, VSCode запускається без відкритого робочого простору.

Тип: `string`

#### `filePath`

Відкриває VSCode з конкретним відкритим файлом.

Тип: `string`

#### `vscodeArgs`

Додаткові аргументи запуску як об'єкт, наприклад:

```ts
vscodeArgs: { fooBar: true, 'bar-foo': '/foobar' }
```

будуть передані як:

```ts
--foo-bar --fooBar --bar-foo=/foobar
```

Тип: `Record<string, string | boolean>`<br />
За замовчуванням: див. [`constants.ts#L5-L14`](https://github.com/webdriverio-community/wdio-vscode-service/blob/196a69be3ac2fb82d9c7e4f19a2a1c8ccbaec1e2/src/constants.ts#L5-L14)

#### `verboseLogging`

Якщо встановлено значення true, сервіс реєструє вихід VSCode з хоста розширення та API консолі.

Тип: `boolean`<br />
За замовчуванням: `false`

#### `vscodeProxyOptions`

Конфігурації проксі API VSCode визначають, як WebdriverIO підключається до робочого середовища VSCode, щоб надати вам доступ до API VSCode.

Тип: `VSCodeProxyOptions`<br />
За замовчуванням:

```ts
{
    /**
     * Якщо встановлено значення true, сервіс намагається встановити з'єднання з
     * робочим середовищем VSCode, щоб надати доступ до API VSCode
     */
    enable: true,
    /**
     * Порт WebSocket-з'єднання, яке використовується для підключення до робочого середовища.
     * За замовчуванням встановлюється на доступний порт у вашій операційній системі.
     */
    // port?: number
    /**
     * Таймаут для підключення до WebSocket всередині VSCode
     */
    connectionTimeout: 5000,
    /**
     * Таймаут для виконання команди всередині VSCode
     */
    commandTimeout: 5000
}
```

### Chromedriver

Починаючи з VSCode v1.86 необхідно використовувати `webdriverio` v8.14 або новішої версії для встановлення Chromedriver без необхідності конфігурації. [Спрощене налаштування автоматизації браузера](https://webdriver.io/blog/2023/07/31/driver-management) обробляє все за вас.

Щоб тестувати більш ранні версії VS Code, знайдіть очікувану версію Chromedriver з журналів, завантажте [Chromedriver](https://chromedriver.chromium.org/downloads) і налаштуйте шлях. Наприклад:

```
[0-0] ERROR webdriver: Failed downloading chromedriver v108: Download failed: ...
```

```ts
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.80.0',
        'wdio:chromedriverOptions': {
            binary: path.join(cacheDir, 'chromedriver-108.0.5359.71')
```

## Створення власних PageObjects

Ви можете повторно використовувати компоненти, використовувані в цьому сервісі, для своїх власних об'єктів сторінок перегляду. Для цього спочатку створіть файл, який визначає всі ваші селектори, наприклад:

```ts
// e.g. in /test/pageobjects/locators.ts
export const componentA = {
    elem: 'form', // component container element
    submit: 'button[type="submit"]', // submit button
    username: 'input.username', // username input
    password: 'input.password' // password input
}
```

Тепер ви можете створити об'єкт сторінки наступним чином:

```ts
// e.g. in /test/pageobjects/loginForm.ts
import { PageDecorator, IPageDecorator, BasePage } from 'wdio-vscode-service'
import * as locatorMap, { componentA as componentALocators } from './locators'
export interface LoginForm extends IPageDecorator<typeof componentALocators> {}
@PageDecorator(componentALocators)
export class LoginForm extends BasePage<typeof componentALocators, typeof locatorMap> {
    /**
     * @private locator key to identify locator map (see locators.ts)
     */
    public locatorKey = 'componentA' as const

    public login (username: string, password: string) {
        await this.username$.setValue(username)
        await this.password$.setValue(password)
        await this.submit$.click()
    }
}
```

Тепер у вашому тесті ви можете використовувати ваш об'єкт сторінки наступним чином:

```ts
import { LoginForm } from '../pageobjects/loginForm'
import * as locatorMap from '../locators'

// e.g. in /test/specs/example.e2e.ts
describe('my extension', () => {
    it('should login', async () => {
        const loginForm = new LoginForm(locatorMap)
        await loginForm.login('admin', 'test123')

        // you can also use page object elements directly via `[selector]$`
        // or `[selector]$$`, e.g.:
        await loginForm.submit$.click()

        // or access locators directly
        console.log(loginForm.locators.username)
        // outputs: "input.username"
    })
})
```

## Підтримка TypeScript

Якщо ви використовуєте WebdriverIO з TypeScript, переконайтеся, що ви додали `wdio-vscode-service` до ваших `types` у вашому `tsconfig.json`, наприклад:

```json
{
    "compilerOptions": {
        "moduleResolution": "node",
        "types": [
            "webdriverio/async",
            "@wdio/mocha-framework",
            "expect-webdriverio",
            // add this service to your types
            "wdio-devtools-service"
        ],
        "target": "es2019"
    }
}
```

## Підтримка проксі

Під час ініціалізації цього сервісу завантажуються ChromeDriver і дистрибутив VSCode. Ви можете провести ці запити через проксі, встановивши змінну середовища `HTTPS_PROXY` або `https_proxy`. Наприклад:

```bash
HTTPS_PROXY=http://127.0.0.1:1080 npm run wdio
```

## Посилання

Наступні розширення VS Code використовують `wdio-vscode-service`:

- [Marquee](https://marketplace.visualstudio.com/items?itemName=stateful.marquee) (27k завантажень)
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (27.8m завантажень)
- [DVC Extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=Iterative.dvc) (11.2k завантажень)
- [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) (1.2m завантажень)
- [inlang – i18n supercharged](https://marketplace.visualstudio.com/items?itemName=inlang.vs-code-extension) (3k завантажень)

## Внесок

Перед публікацією запиту на злиття, будь ласка, виконайте наступне:

1. `git clone git@github.com:webdriverio-community/wdio-vscode-service.git`
1. `cd wdio-vscode-service`
1. `npm install`
1. `npm run build`
1. `npm run test` (або `npm run ci`)

## Дізнайтеся більше

Якщо ви хочете дізнатися більше про тестування розширень VSCode, перегляньте доповідь [Christian Bromann'а](https://twitter.com/bromann) на [OpenJS World 2022](https://www.youtube.com/watch?v=PhGNTioBUiU):

[![Testing VSCode Extensions at OpenJS World 2022](https://img.youtube.com/vi/PhGNTioBUiU/sddefault.jpg)](https://www.youtube.com/watch?v=PhGNTioBUiU)

---

Для отримання додаткової інформації про WebdriverIO перегляньте [домашню сторінку](https://webdriver.io) проекту.