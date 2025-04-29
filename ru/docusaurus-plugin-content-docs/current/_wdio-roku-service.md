---
id: wdio-roku-service
title: Roku Сервис
custom_edit_url: https://github.com/theREDspace/wdio-roku-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-roku-service — это сторонний пакет, для получения дополнительной информации, пожалуйста, посетите [GitHub](https://github.com/theREDspace/wdio-roku-service) | [npm](https://www.npmjs.com/package/wdio-roku-service)
Этот сервис переопределяет многие части WebdriverIO, чтобы обеспечить их использование с приложениями Roku, и предоставляет доступ к [Roku ECP](https://developer.roku.com/en-ca/docs/developer-program/dev-tools/external-control-api.md) для управления Roku во время тестирования.

## Требования

### Roku
Тестовый канал/channel.zip и устройство Roku (с включенным режимом разработчика) в той же сети, что и ваш Mac.

### WebdriverIO
Это не самостоятельный продукт — он используется как плагин для тестирования WebdriverIO (или Сервис, на их языке). Перед использованием вы должны пройти настройку WDIO, запустив `npm init wdio@latest`.

При прохождении этапов настройки, чтобы не пришлось проходить через все вопросы/варианты, вы можете просто выбрать следующие пункты во время фазы инициализации:
- Roku Testing (ПРИМЕЧАНИЕ: Используйте это, если ваш репозиторий будет использоваться только для тестирования Roku, так как он станет сервисом по умолчанию и единственным установленным сервисом. В противном случае используйте E2E Testing, чтобы вы могли установить несколько сервисов.)
- On my local machine (только для E2E)
- Web (только для E2E)
- Chrome (только для E2E)
- Mocha
- Typescript [modules работает как для TS, так и для JS, так что выбирайте любой]
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
Если вы хотите использовать Typescript для написания тестов, вам необходимо убедиться, что следующие параметры установлены в файле tsconfig.json, сгенерированном Webdriverio.
```
"moduleResolution": "nodenext",
"module": "NodeNext",
```
Затем вы можете использовать сервис, импортируя его в свои тесты, как описано ниже.

### WDIO Config
В настоящее время тестирование поддерживается только для одного устройства Roku. Требуются следующие обновления конфигурации:
* `maxInstances` и `maxInstancesPerCapability` должны быть равны 1. Автоматическое тестирование на нескольких устройствах не поддерживается и приведет к дублированию команд, отправляемых на Roku. Должна быть только одна возможность.
```js
//wdio.conf.js
export const config: WebdriverIO.Config = {

maxInstances: 1,

    capabilities: [{
        browserName: 'chrome'
        // или если вы хотите режим headless:
        browserName: 'chrome',
        'goog:chromeOptions': { 
            args: ['--headless', '--disable-gpu']
        }
    }],
    //...
}
```

* Рекомендуется увеличить `waitforInterval` и `waitforTimeout`, так как каждый интервал включает загрузку xml с Roku. Чтобы получить больше от функции `browser.debug()`, вы также можете расширить тайм-аут тестового раннера mocha до 5+ минут для разработки.
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

Вы готовы написать свой первый тест!

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

Также рекомендуется использовать функцию `browser.debug()` в wdio для остановки теста для отладки и создания тестов:

```js
// ...
    it('should launch to the homescreen without login', async () => {
        await $("//LoadingIndicator").waitForDisplayed({ reverse: true })
        await expect($("//ContentCarousel")).toBeDisplayed()
        await browser.debug()
        // тест останавливается, становится доступен REPL для команд

```
Если chrome не в режиме headless, вы можете увидеть последний раз, когда была вызвана `openRokuXML()` (вероятно, через `waitForX` или `expect`). Используя REPL в вашем терминале, вы можете использовать любые допустимые команды `$` и несколько ключевых пользовательских команд (`browser.openRokuXML()` и `browser.saveScreenshot('path/to/ss.jpg')`) -- класс `controller` не прикреплен к объекту `browser`, поэтому вы не можете использовать их в данный момент. К счастью, вы, вероятно, сидите рядом с Roku и у вас есть пульт, который вы можете использовать для навигации и иногда вызывать `browser.openRokuXML()`, чтобы увидеть, что произошло с состоянием страницы! И помните, что XML работает нативно с xpath в самом браузере chrome, поэтому вы можете непосредственно оценивать/разрабатывать свои селекторы в консоли chrome во время отладки.

### .env
См. файл `.env.example`. Скопируйте его и переименуйте в `.env` в вашем проекте WebdriverIO, который использует этот сервис. Возможно, вы также захотите добавить его в .gitignore.

* `ROKU_IP` должен быть IP-адресом вашего Roku. Команды будут использовать этот IP для связи с ним. Это обязательно.
* `ROKU_USER` и `ROKU_PW`: Учетные данные для входа необходимы для установки архива, а также для создания скриншотов.
* `ROKU_APP_PATH` должен быть абсолютным путем к zip-файлу канала Roku.
* `ROKU_CHANNEL_ID` должен быть ID вашего канала Roku (обычно это "dev").
* `DEBUG=wdio-roku-service` включит отладочные сообщения. Удалите символ '#' в начале строки, если вы хотите их видеть.

## Измененные функции
### Browser
* `waitUntil` будет получать xml с Roku при каждой итерации, чтобы проверить изменения.
* `saveScreenshot` загрузит скриншот текущего экрана с Roku. Примечательно, что эти скриншоты имеют формат .jpg, а не .png, который обычно использует WebdriverIO.
* `openRokuXML` получит xml с Roku, если вам нужно сделать это вручную, а не с помощью ожиданий.

### Elements
* Все ожидания поддерживаются так же, как и Browser. `waitForClickable` сопоставляется с `waitForDisplayed`, а `waitForStable` сопоставляется с `waitForExist`.
* `click`, `doubleClick` и `moveTo` не поддерживаются. Вы должны вручную перемещаться по приложению.
* `isFocused` проверит наличие атрибута `focused` на элементе, равного true.
* `isDisplayed` проверит наличие атрибута `bounds` на элементе и что `visible` не установлен на false. Если установлен `withinViewport`, границы будут сравниваться с размером экрана Roku.
* `getSize` и `getLocation` берут значения из атрибута `bounds`, возвращая 0 для размера и -Infinity для позиции, если они отсутствуют.

Другие функции не изменились, но многие по-прежнему работают как ожидалось.

### Matchers
Большинство матчеров были обновлены для получения xml во время ожидания. Некоторые имеют немного другую функциональность.
* `toBeDisplayed`, `toBeDisplayedInViewport`, `toBeFocused`, `toBeExisting`, `toBePresent`, `toExist`, `toHaveSize`, `toHaveWidth`, `toHaveHeight` и `toHaveAttribute` работают как ожидается, с учетом изменений в Element.
* `toHaveElementProperty` сопоставляется с `toHaveAttribute`.
* `toHaveElementClass` проверяет атрибут `name` элемента.
* `toHaveId` сопоставляется с `toHaveElementClass`.
* `toHaveText` проверяет атрибут `text` элемента.
* `toHaveChildren` проверяет атрибут `children` элемента.
* `toHaveHTML` будет обрабатывать xml так, как если бы это был HTML, хотя, вероятно, это не очень полезно.

Следующие функции в настоящее время не поддерживаются:
* `toBeSelected` - Может быть поддержано в ближайшее время после определения того, как выглядит xml для выбранных кнопок, если есть разница.
* `toBeChecked` - Может быть поддержано в ближайшее время после определения того, как выглядит xml для отмеченных флажков, если есть разница.
* `toHaveComputedLabel` - Если у вас есть эквивалент этого на ваших элементах Roku, проверьте атрибут с помощью `toHaveAttribute`.
* `toHaveComputedRole` - Если у вас есть эквивалент этого на ваших элементах Roku, проверьте атрибут с помощью `toHaveAttribute`.
* `toHaveHref` - Если у вас есть URL на ваших элементах Roku, проверьте атрибут с помощью `toHaveAttribute`.
* `toHaveStyle` - Элементы xml не имеют стилей.
* `toHaveClipboardText` - Это неизвестно.
* `toHaveTitle` - Заголовком будет случайно сгенерированное временное имя файла xml.
* `toHaveUrl` - URL будет путем к файлу xml на вашем компьютере.

## Использование
### Установка канала

Это требует, чтобы ваш канал имел назначенный ID.
```js
import { installByID } from 'wdio-roku-service/install';

async before() {
    await installByID(process.env.ROKU_CHANNEL_ID);
}
```

Установка архива

Рекомендуется хранить путь в .env, особенно если у вас несколько разработчиков, которые могут иметь разные расположения и/или имена файлов.
```js
import { installFromZip } from 'wdio-roku-service/install';

async before() {
    await installFromZip(process.env.ROKU_ARCHIVE_PATH);
}
```

Предустановленный канал

Если вы уже установили канал самостоятельно до тестирования, вы можете просто запустить его.
```js
import { launchChannel, exitChannel } from 'wdio-roku-service/channel';

async before() {
    // Закройте канал, если он уже открыт. Если канал поддерживает быстрое возобновление, это просто переместит его в фоновый режим
    await exitChannel();
    // Использование ID канала 'dev' запустит боковую загрузку приложения.
    await launchChannel('dev');
}
```

### Тестирование
`wdio-roku-service/controller` предоставляет возможность отправлять нажатия кнопок на Roku. `keySequence` — это основная функция, отправляющая несколько нажатий кнопок последовательно.
```js
import { Buttons, keySequence } from 'wdio-roku-service/controller';

// Навигация по приложению
await keySequence(Buttons.LEFT, Buttons.LEFT, Buttons.SELECT, Buttons.DOWN, Buttons.SELECT);
// Получение текущего UI приложения с Roku и загрузка его в браузер
await browser.openRokuXML();
// Или используйте ожидания, которые будут неоднократно загружать XML до истечения тайм-аута или выполнения условия
await browser.waitUntil(condition);
await element.waitForDisplayed();
// используйте матчеры WDIO для roku XML, как если бы это была веб-страница
await expect(element).toHaveAttr('focused');
```

`wdio-roku-service/controller` также имеет функции для удержания или отпускания кнопок, а также ввода текста на клавиатуре.
```js
import { Buttons, keyboardInput, keyPress, keySequence } from 'wdio-roku-service/controller';

await keySequence(Buttons.DOWN, Buttons.DOWN, Buttons.SELECT);
await keyboardInput('example');
await keyPress(Buttons.ENTER);
await browser.openRokuXML();
```

### Deeplinking
`wdio-roku-service/channel` предоставляет функциональность, связанную с каналом. `inputChannel` позволяет отправлять произвольную информацию в ваше приложение.
```js
import { exitChannel, launchChannel, MediaType } from 'wdio-roku-service/channel';
await exitChannel();
await launchChannel(process.env.ROKU_CHANNEL_ID, myContent, MediaType.MOVIE, {myExtraParameter:true});
await expect(MyContent.header).toBeDisplayed();
```

### Другие функции
`wdio-roku-service/info` предоставляет разнообразную функциональность, такую как получение иконки приложения или осиротевших узлов.
```js
import { getAppIcon } from 'wdio-roku-service/info';
const response = await getAppIcon(process.env.ROKU_CHANNEL_ID);
expect(response.headers.get('Content-Type')).toBe('image/jpg');
```
`wdio-roku-service/ecp` — это прямой интерфейс с ECP, если вам нужно сделать что-то очень специфическое.
```js
import { ECP } from 'wdio-roku-service/ecp';
await ECP('search/browse?keyword=voyage&type=movie&tmsid=MV000058030000', 'POST');
```

## Распространенные проблемы
* Элементы Roku имеют свой текст в атрибуте 'text', а не между своими тегами. При использовании селекторов, выполнение `$('element=Text')` не будет работать почти для каждого элемента. Вместо этого, вам придется сделать `$('element[text=Text]')`.

## План развития функций
* Скоро будет отправлен PR, который позволит устанавливать этот сервис во время анкеты `npm init wdio@latest`.
* В настоящее время оценивается сокетное соединение с Roku, так что могут быть разработаны больше функций, таких как средства для пробуждения спящего Roku.
* Функция(и) сетевого прокси, которые позволяют отслеживать сетевую активность.

## Использование отчетов Allure с прикрепленными снимками экрана и XML файлами

По умолчанию Allure Reporting не имеет настройки для создания снимков экрана приложения или копии XML-кода, представляющего текущее состояние приложения Roku в любой момент выполнения теста. Документация, которая следует, объясняет, как решить эту проблему, чтобы снимок экрана текущего состояния приложения генерировался и прикреплялся к отчету Allure каждый раз, когда тест `it` завершает свой запуск. Это также позволяет получить исходный снимок XML, представляющий текущее состояние приложения Roku, когда тест `it` завершается неудачей.

Полную документацию по Allure Reporter можно найти на @wdio/allure-reporter docs https://webdriver.io/docs/allure-reporter/

### Зависимость Utils.js
Добавьте следующий код в файл с именем `Utils.js`. Этот файл может находиться в вашей папке `/helpers` или аналогичной.
```js
/**
 * Возвращает строковое представление временной метки 'сейчас' в миллисекундах для эпохи.
 */
export const getEpochTimestamp = async () => {
    return Date.now().toString()
}

/**
 * Возвращает строковое представление временной метки 'сейчас' по следующему шаблону: {ГГГГ}-{ММ}-{ДД}_{час в 24Ч}-{Минута}-{Секунда}-{Миллисекунды}
 */
export const getLongFormatTimestamp = async () => {
    const now = new Date(Date.now())
    const result = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}_${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}-${now.getMilliseconds()}`
    return result
}

/**
 * Объект, содержащий строковые представления возможных расширений файлов, используемых для целей отчетности.
 */
export const FILE_EXTENSIONS = {
    JPG: '.jpg',
    XML: '.xml'
}

/**
 * Объект, содержащий строковые представления возможных MIME-типов, используемых для целей отчетности.
 */
export const FILE_MIME_TYPES = {
    JPG: 'image/jpeg',
    XML: 'application/xml'
}

/**
 * Функция для генерации имени файла с возможным префиксом, временной меткой и одним из возможных расширений.
 * @param {string} fileExtension Используйте одно из значений из объекта FILE_EXTENSIONS, определенного ранее.
 * @param {string} [fileNamePrefix] Префикс, который будет добавлен в начало имени файла, если он предоставлен. По умолчанию пустая строка.
 */
export const getFileNameWithTimestamp = async (fileExtension, fileNamePrefix = '') => {
    return (fileNamePrefix !== '')
        ? `${fileNamePrefix}_${await getLongFormatTimestamp()}${fileExtension}`
        : `${await getLongFormatTimestamp()}${fileExtension}`
}

```

### Код wdio.conf.js
Добавьте следующие операторы импорта в файл `wdio.conf.js`:
```js
import { readFile, rm } from 'node:fs/promises'
import { addAttachment } from '@wdio/allure-reporter'
import { FILE_EXTENSIONS, FILE_MIME_TYPES, getFileNameWithTimestamp } from './<Utils.js file path>/Utils.js'  // Замените <Utils.js file path> фактическим относительным путем к файлу Utils.js

```

Определите следующий хук `afterTest` в файле `wdio.conf.js`. Если у вас уже есть рабочий код в этом хуке, добавьте приведенный ниже код к нему.
```js
afterTest: async function (test, context, result) {
        // Логика сохранения и прикрепления скриншотов независимо от результата теста.
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

        // Логика прикрепления XML при сбое теста.
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

### Ожидаемое поведение
С этим кодом в конфигурации проекта ожидается, что каждый раз при запуске теста `it`, независимо от результата теста, в конце запуска будет сделан снимок экрана и прикреплен к соответствующему разделу в отчете Allure. В случае если тест завершится неудачей, в отчет Allure будет также прикреплен исходный снимок состояния приложения в формате XML.

### Примечания
* По умолчанию отчеты Allure поддерживают скриншоты в формате `.png`. Переопределения методов в этом сервисе поддерживают изображения в формате `.jpg` вместо этого.
* Вложения XML можно просматривать в самом отчете Allure или открывать в отдельной вкладке в браузере.