---
id: wdio-roku-service
title: Roku Сервіс
custom_edit_url: https://github.com/theREDspace/wdio-roku-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-roku-service є пакетом від третьої сторони, для більш детальної інформації дивіться [GitHub](https://github.com/theREDspace/wdio-roku-service) | [npm](https://www.npmjs.com/package/wdio-roku-service)
Цей сервіс перевизначає багато частин WebdriverIO, щоб їх можна було використовувати з додатками Roku, та надає доступ до [Roku ECP](https://developer.roku.com/en-ca/docs/developer-program/dev-tools/external-control-api.md) для управління Roku під час тестування.

## Вимоги

### Roku
Тестовий канал/channel.zip та пристрій Roku (з увімкненим режимом розробника) в тій же мережі, що й ваш комп'ютер Mac.

### WebdriverIO
Це не самостійний продукт — він використовується як плагін тестового фреймворку WebdriverIO (або Сервіс на їхньому жаргоні). Перед використанням вам слід пройти налаштування WDIO, запустивши `npm init wdio@latest`.

Під час проходження налаштувань, щоб не доводилося переглядати всі питання/опції, ви можете просто вибрати такі варіанти під час фази ініціалізації:
- Roku Testing (ПРИМІТКА: Використовуйте це, якщо ваш репозиторій буде використовуватися тільки для тестування Roku, оскільки це стане типовим і єдиним встановленим сервісом. В іншому випадку використовуйте E2E Testing, щоб можна було встановити кілька сервісів.)
- On my local machine (E2E only)
- Web (E2E only)
- Chrome (E2E only)
- Mocha
- Typescript [modules працює для TS і JS, тому виберіть будь-який]
- autogenerate some test files (Y)
-- default location
- page objects (Y)
-- default location
- spec reporter
- additional plugins (N)
- Visual Testing (N)
- services (roku)
- npm install (Y)

### Typescript Config
Якщо ви хочете використовувати Typescript для написання тестів, вам потрібно переконатися, що наступні опції встановлені у файлі tsconfig.json, згенерованому Webdriverio.
```
"moduleResolution": "nodenext",
"module": "NodeNext",
```
Потім ви можете використовувати сервіс, імпортуючи його у свої тести, як детально описано нижче.

### WDIO Config
На даний момент тестування підтримується лише для одного пристрою Roku. Потрібні такі оновлення конфігурації:
* `maxInstances` та `maxInstancesPerCapability` повинні бути 1. Автоматичне тестування на кількох пристроях не підтримується і призведе до дублювання команд, що надсилаються на Roku. Має бути лише одна можливість.
```js
//wdio.conf.js
export const config: WebdriverIO.Config = {

maxInstances: 1,

    capabilities: [{
        browserName: 'chrome'
        // or if you want headless mode:
        browserName: 'chrome',
        'goog:chromeOptions': { 
            args: ['--headless', '--disable-gpu']
        }
    }],
    //...
}
```

* Рекомендується збільшити `waitforInterval` і `waitforTimeout`, оскільки кожен інтервал передбачає завантаження xml з Roku. Щоб отримати більше від функції `browser.debug()`, ви також можете вирішити розширити час очікування для тестового запуску mocha до 5+ хвилин для розробницького середовища.
```js
//wdio.conf.js
export const config: WebdriverIO.Config = {
    waitforTimeout: 30000,
    
    //optional:
    mochaOpts: {
        ui: 'bdd',
        timeout: 600000
    },
    //...
}
```

Ви готові написати свій перший тест!

```js
import { installFromZip } from 'wdio-roku-service/install'
import { exitChannel } from 'wdio-roku-service/channel'
import { Buttons, keyPress, keySequence } from 'wdio-roku-service/controller'

describe('first test', () => {
    before('On the landing screen of the test channel', async () => {
        await installFromZip(process.env.ROKU_APP_PATH)
    })

    it('should launch to the homescreen without login', async () => {
        await $("//LoadingIndicator").waitForDisplayed({ reverse: true })
        await expect($("//ContentCarousel")).toBeDisplayed()
    })

    after('should return to home', async () => {
        await exitChannel()
    })
})

```

Також рекомендується використовувати функцію `browser.debug()` у wdio для зупинки тесту для налагодження та створення тестів:

```js
// ...
    it('should launch to the homescreen without login', async () => {
        await $("//LoadingIndicator").waitForDisplayed({ reverse: true })
        await expect($("//ContentCarousel")).toBeDisplayed()
        await browser.debug()
        // the test halts, a REPL becomes available for commands

```
Якщо chrome не запущений у headless режимі, ви можете побачити останній раз, коли було викликано `openRokuXML()` (ймовірно через `waitForX` або `expect`). Використовуючи REPL у вашому терміналі, ви можете використовувати будь-які дійсні команди `$` і кілька ключових спеціальних команд, які додані (`browser.openRokuXML()` і `browser.saveScreenshot('path/to/ss.jpg')`) — клас `controller` не приєднаний до об'єкта `browser`, тому ви не можете використовувати його зараз. На щастя, ви, ймовірно, сидите поруч з Roku і маєте пульт, яким можете користуватися для навігації і час від часу викликати `browser.openRokuXML()`, щоб побачити, що сталося зі станом сторінки! І пам'ятайте, що XML працює з xpathing у самому браузері chrome, тож ви можете оцінювати/розробляти свої селектори безпосередньо в консолі chrome під час налагодження.

### .env
Див. файл `.env.example`. Скопіюйте його та перейменуйте на `.env` у вашому проекті WebdriverIO, який використовує цей сервіс. Ви, ймовірно, захочете також додати його до .gitignore.

* `ROKU_IP` має бути IP-адресою вашого Roku. Команди будуть використовувати цей IP для зв'язку з ним. Це обов'язково.
* `ROKU_USER` і `ROKU_PW`: Облікові дані для входу потрібні для встановлення архіву, а також для створення знімків екрана.
* `ROKU_APP_PATH` має бути абсолютним шляхом до zip-файлу каналу Roku.
* `ROKU_CHANNEL_ID` має бути ID каналу вашого Roku (зазвичай це "dev").
* `DEBUG=wdio-roku-service` увімкне повідомлення для налагодження. Видаліть '#' на початку рядка, якщо хочете їх бачити.

## Змінені функції
### Browser
* `waitUntil` буде отримувати xml з Roku на кожній ітерації, щоб перевірити зміни.
* `saveScreenshot` завантажить знімок екрана поточного екрана з Roku. Зокрема, ці знімки екрана мають формат .jpg, а не .png, який зазвичай використовує WebdriverIO.
* `openRokuXML` отримає xml з Roku, якщо вам потрібно зробити це вручну, а не з очікуваннями.

### Elements
* Усі очікування підтримуються так само, як і Browser. `waitForClickable` відображається на `waitForDisplayed`, а `waitForStable` відображається на `waitForExist`.
* `click`, `doubleClick` і `moveTo` не підтримуються. Ви повинні вручну переміщатися по додатку.
* `isFocused` перевірить атрибут `focused` на елементі, що дорівнює true.
* `isDisplayed` перевірить атрибут `bounds` на елементі і переконається, що `visible` не встановлений на false. Якщо встановлений `withinViewport`, межі порівнюватимуться з розміром екрана Roku.
* `getSize` і `getLocation` беруть значення з атрибута `bounds`, повертаючи 0 для розміру і -Infinity для позиції, якщо атрибут відсутній.

Інші функції не змінювалися, але багато з них все ще працюють як очікувалося.

### Matchers
Більшість матчерів були оновлені для отримання xml під час очікування. Деякі мають дещо іншу функціональність.
* `toBeDisplayed`, `toBeDisplayedInViewport`, `toBeFocused`, `toBeExisting`, `toBePresent`, `toExist`, `toHaveSize`, `toHaveWidth`, `toHaveHeight`, і `toHaveAttribute` всі працюють як очікувалося, з урахуванням змін у Element.
* `toHaveElementProperty` відображається на `toHaveAttribute`.
* `toHaveElementClass` перевіряє атрибут `name` елемента.
* `toHaveId` відображається на `toHaveElementClass`.
* `toHaveText` перевіряє атрибут `text` елемента.
* `toHaveChildren` перевіряє атрибут `children` елемента.
* `toHaveHTML` буде обробляти xml так, ніби це HTML, хоча це, ймовірно, не дуже корисно.

Наступні зараз не підтримуються:
* `toBeSelected` - Може бути підтримано незабаром після визначення того, як виглядає xml для вибраних кнопок, якщо є різниця.
* `toBeChecked` - Може бути підтримано незабаром після визначення того, як виглядає xml для відмічених прапорців, якщо є різниця.
* `toHaveComputedLabel` - Якщо у вас є еквівалент цього на елементах Roku, перевірте атрибут за допомогою `toHaveAttribute`.
* `toHaveComputedRole` - Якщо у вас є еквівалент цього на елементах Roku, перевірте атрибут за допомогою `toHaveAttribute`.
* `toHaveHref` - Якщо у вас є URL-адреси на елементах Roku, перевірте атрибут за допомогою `toHaveAttribute`.
* `toHaveStyle` - Елементи xml не мають стилів.
* `toHaveClipboardText` - Це невідомо.
* `toHaveTitle` - Заголовок буде випадково згенерованим тимчасовим іменем файлу xml.
* `toHaveUrl` - URL-адреса буде шляхом до xml-файлу на вашому комп'ютері.

## Використання
### Встановлення каналу

Це вимагає, щоб вашому каналу був призначений ідентифікатор.
```js
import { installByID } from 'wdio-roku-service/install';

async before() {
    await installByID(process.env.ROKU_CHANNEL_ID);
}
```

Встановлення архіву

Рекомендується зберігати шлях в .env, особливо якщо у вас є кілька розробників, які можуть мати різні місця розташування та/або імена файлів.
```js
import { installFromZip } from 'wdio-roku-service/install';

async before() {
    await installFromZip(process.env.ROKU_ARCHIVE_PATH);
}
```

Попередньо встановлений канал

Якщо ви вже встановили канал самостійно перед тестуванням, ви можете просто запустити його.
```js
import { launchChannel, exitChannel } from 'wdio-roku-service/channel';

async before() {
    // Close the channel if it's already open. If the channel supports instant resume, this will merely background it
    await exitChannel();
    // Using the channel ID of 'dev' will launch the sideloaded application.
    await launchChannel('dev');
}
```

### Тестування
`wdio-roku-service/controller` надає можливість надсилати натискання кнопок на Roku. `keySequence` є основною, що надсилає кілька натискань кнопок послідовно.
```js
import { Buttons, keySequence } from 'wdio-roku-service/controller';

// Navigate through the app
await keySequence(Buttons.LEFT, Buttons.LEFT, Buttons.SELECT, Buttons.DOWN, Buttons.SELECT);
// Fetch the current app UI from the Roku and load it into the browser
await browser.openRokuXML();
// Or, use waits, which will repeatedly load the XML until it times out or the condition passes
await browser.waitUntil(condition);
await element.waitForDisplayed();
// use WDIO matchers on the roku XML as if it was a webpage
await expect(element).toHaveAttr('focused');
```

`wdio-roku-service/controller` також має функції для утримування або відпускання кнопок, а також для введення тексту на клавіатурі.
```js
import { Buttons, keyboardInput, keyPress, keySequence } from 'wdio-roku-service/controller';

await keySequence(Buttons.DOWN, Buttons.DOWN, Buttons.SELECT);
await keyboardInput('example');
await keyPress(Buttons.ENTER);
await browser.openRokuXML();
```

### Deeplinking
`wdio-roku-service/channel` надає функціональність, пов'язану з каналом. `inputChannel` дозволяє надсилати довільну інформацію вашому додатку.
```js
import { exitChannel, launchChannel, MediaType } from 'wdio-roku-service/channel';
await exitChannel();
await launchChannel(process.env.ROKU_CHANNEL_ID, myContent, MediaType.MOVIE, {myExtraParameter:true});
await expect(MyContent.header).toBeDisplayed();
```

### Інші функції
`wdio-roku-service/info` надає різноманітну функціональність, наприклад, отримання іконки додатка або осиротілих вузлів.
```js
import { getAppIcon } from 'wdio-roku-service/info';
const response = await getAppIcon(process.env.ROKU_CHANNEL_ID);
expect(response.headers.get('Content-Type')).toBe('image/jpg');
```
`wdio-roku-service/ecp` є безпосереднім інтерфейсом з ECP, якщо вам потрібно зробити щось дуже специфічне.
```js
import { ECP } from 'wdio-roku-service/ecp';
await ECP('search/browse?keyword=voyage&type=movie&tmsid=MV000058030000', 'POST');
```

## Поширені проблеми
* Елементи Roku мають свій текст у атрибуті 'text', а не між їхніми тегами. При використанні селекторів, `$('element=Text')` не працюватиме для майже кожного елемента. Замість цього вам доведеться використовувати `$('element[text=Text]')`.

## Майбутні можливості
* Незабаром буде представлено PR, який дозволить встановити цей сервіс під час опитування `npm init wdio@latest`.
* Зараз оцінюємо Socket комунікацію з Roku, щоб можна було використовувати більше функцій, наприклад, засіб для пробудження сплячого Roku.
* Функції мережевого проксі, що дозволяють реагувати на мережеву активність.

## Використання звітів Allure з прикріпленими знімками екрана та файлами XML

За замовчуванням, Allure Reporting не має конфігурації для генерації знімків екрана додатка або копії XML-коду, що представляє поточний стан додатка Roku в будь-якій точці виконання тесту. Наступна документація пояснює, як вирішити це, щоб знімок екрана поточного стану додатка створювався та прикріплювався до звіту Allure кожного разу, коли тест `it` завершує своє виконання. Це також дозволяє отримати знімок XML, що представляє поточний стан додатка Roku, коли виконання тесту `it` не вдається.

Для повної документації щодо Allure Reporter, відвідайте документацію @wdio/allure-reporter https://webdriver.io/docs/allure-reporter/

### Залежність Utils.js
Додайте наступний код до файлу під назвою `Utils.js`. Цей файл може знаходитися у вашій папці `/helpers` або подібній.
```js
/**
 * Returns a string representation of the 'now' timestamp in milliseconds for the epoch.
 */
export const getEpochTimestamp = async () => {
    return Date.now().toString()
}

/**
 * Returns a string representation of the 'now' timestamp following the pattern: {YYYY}-{MM}-{DD}_{hour in 24H}-{Minute}-{Second}-{Milliseconds}
 */
export const getLongFormatTimestamp = async () => {
    const now = new Date(Date.now())
    const result = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}_${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}-${now.getMilliseconds()}`
    return result
}

/**
 * An object containing the string representations of possible file extensions used for reporting purposes.
 */
export const FILE_EXTENSIONS = {
    JPG: '.jpg',
    XML: '.xml'
}

/**
 * An object containing the string representations of possible MIME types used for reporting purposes.
 */
export const FILE_MIME_TYPES = {
    JPG: 'image/jpeg',
    XML: 'application/xml'
}

/**
 * A function to generate a filename with a possible prefix, a timestamp and one of the possible extensions provided.
 * @param {string} fileExtension Use one of the values from the FILE_EXTENSIONS object defined previously.
 * @param {string} [fileNamePrefix] A prefix to be appended at the beginning of the filename if provided.  Defaults to an empty string.
 */
export const getFileNameWithTimestamp = async (fileExtension, fileNamePrefix = '') => {
    return (fileNamePrefix !== '')
        ? `${fileNamePrefix}_${await getLongFormatTimestamp()}${fileExtension}`
        : `${await getLongFormatTimestamp()}${fileExtension}`
}

```

### Код wdio.conf.js
Додайте наступні інструкції імпорту до файлу `wdio.conf.js`:
```js
import { readFile, rm } from 'node:fs/promises'
import { addAttachment } from '@wdio/allure-reporter'
import { FILE_EXTENSIONS, FILE_MIME_TYPES, getFileNameWithTimestamp } from './<Utils.js file path>/Utils.js'  // Replace <Utils.js file path> with actual relative path to file Utils.js

```

Визначте наступний хук `afterTest` у файлі `wdio.conf.js`. Якщо у вас вже є працюючий код у цьому хуку, додайте наведений нижче код до нього.
```js
afterTest: async function (test, context, result) {
        // Screenshot saving and attaching logic regardless of test outcome.
        const fileName = await getFileNameWithTimestamp(FILE_EXTENSIONS.JPG)
        try {
            const tempScreenshotPath = `./allure-results/${fileName}`
            await browser.saveScreenshot(tempScreenshotPath)
            const screenShotData = await readFile(tempScreenshotPath)
            addAttachment(`${fileName}`, screenShotData, FILE_MIME_TYPES.JPG)
            await rm(tempScreenshotPath).catch((rmError) => {
                console.error(`Failed to remove file: ${tempScreenshotPath}`, rmError)
            })
        } catch (error) {
            console.error('Error handling screenshot or attachment: ', error)
        }

        // XML attaching logic on test failure.
        if (result.passed === false) {
            const fileName = await getFileNameWithTimestamp(FILE_EXTENSIONS.XML, 'AppStateAfterTestFail')
            const rawSourceString = String(await browser.getPageSource())
            const extractedXMLSubstring = '<?xml version="1.0" encoding="UTF-8" ?>\n'.concat(rawSourceString.substring(rawSourceString.search('<app-ui xmlns="">'), rawSourceString.search('</app-ui>')).concat('</app-ui>')).replace('<app-ui xmlns="">', '<app-ui>')
            try {
                addAttachment(`${fileName}`, extractedXMLSubstring, FILE_MIME_TYPES.XML)
            } catch (error) {
                console.log(error)
            }
        }
    },
```

### Очікувана поведінка
З цим кодом у конфігурації проекту очікується, що кожного разу, коли запускається тест `it`, незалежно від результату тесту, знімок екрана буде зроблено наприкінці запуску і прикріплено до відповідного розділу у звіті Allure. У конкретному випадку, коли тест не виконується, знімок джерела стану додатка у форматі XML також буде прикріплено до розділу тесту у звіті Allure.

### Примітки
* За замовчуванням Allure reports підтримують знімки екрана у форматі `.png`. Перевизначення методів у цьому сервісі підтримують зображення у форматі `.jpg` замість цього.
* Вкладення XML можна переглядати в самому звіті Allure або відкривати в окремій вкладці в браузері.