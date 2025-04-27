---
id: frameworks
title: Фреймворки
---

WebdriverIO Runner имеет встроенную поддержку [Mocha](http://mochajs.org/), [Jasmine](http://jasmine.github.io/) и [Cucumber.js](https://cucumber.io/). Вы также можете интегрировать его со сторонними фреймворками с открытым исходным кодом, такими как [Serenity/JS](#using-serenityjs).

:::tip Интеграция WebdriverIO с тестовыми фреймворками
Для интеграции WebdriverIO с тестовым фреймворком вам понадобится адаптер-пакет, доступный в NPM.
Обратите внимание, что пакет адаптера должен быть установлен в том же месте, где установлен WebdriverIO.
Поэтому, если вы установили WebdriverIO глобально, убедитесь, что также установили пакет адаптера глобально.
:::

Интеграция WebdriverIO с тестовым фреймворком позволяет получить доступ к экземпляру WebDriver с помощью глобальной переменной `browser`
в ваших спецификациях или определениях шагов.
Обратите внимание, что WebdriverIO также позаботится о создании и завершении сессии Selenium, поэтому вам не нужно делать это
самостоятельно.

## Использование Mocha

Сначала установите пакет адаптера из NPM:

```bash npm2yarn
npm install @wdio/mocha-framework --save-dev
```

По умолчанию WebdriverIO предоставляет [библиотеку утверждений](assertion), которая встроена и с которой можно начать работу сразу:

```js
describe('my awesome website', () => {
    it('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

WebdriverIO поддерживает интерфейсы Mocha `BDD` (по умолчанию), `TDD` и `QUnit` [interfaces](https://mochajs.org/#interfaces).

Если вы хотите писать спецификации в стиле TDD, установите свойство `ui` в вашей конфигурации `mochaOpts` на `tdd`. Теперь ваши тестовые файлы должны быть написаны так:

```js
suite('my awesome website', () => {
    test('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

Если вы хотите определить другие настройки, специфичные для Mocha, вы можете сделать это с помощью ключа `mochaOpts` в файле конфигурации. Список всех опций можно найти на [сайте проекта Mocha](https://mochajs.org/api/mocha).

__Примечание:__ WebdriverIO не поддерживает устаревшее использование обратных вызовов `done` в Mocha:

```js
it('should test something', (done) => {
    done() // выбрасывает ошибку "done is not a function"
})
```

### Опции Mocha

Следующие опции могут быть применены в вашем `wdio.conf.js` для настройки вашей среды Mocha. __Примечание:__ не все опции поддерживаются, например, применение опции `parallel` вызовет ошибку, так как тестовый запуск WDIO имеет свой собственный способ запуска тестов параллельно. Вы можете передать эти опции фреймворка в качестве аргументов, например:

```sh
wdio run wdio.conf.ts --mochaOpts.grep "my test" --mochaOpts.bail --no-mochaOpts.checkLeaks
```

Это передаст следующие опции Mocha:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

Поддерживаются следующие опции Mocha:

#### require
Опция `require` полезна, когда вы хотите добавить или расширить базовую функциональность (опция фреймворка WebdriverIO).

Тип: `string|string[]`<br />
По умолчанию: `[]`

#### compilers
Использовать указанный модуль (модули) для компиляции файлов. Компиляторы будут включены перед требованиями (опция фреймворка WebdriverIO).

Тип: `string[]`<br />
По умолчанию: `[]`

#### allowUncaught
Распространять необработанные ошибки.

Тип: `boolean`<br />
По умолчанию: `false`

#### bail
Прервать выполнение после первой ошибки теста.

Тип: `boolean`<br />
По умолчанию: `false`

#### checkLeaks
Проверять на утечки глобальных переменных.

Тип: `boolean`<br />
По умолчанию: `false`

#### delay
Задержка выполнения корневого набора.

Тип: `boolean`<br />
По умолчанию: `false`

#### fgrep
Фильтровать тесты по заданной строке.

Тип: `string`<br />
По умолчанию: `null`

#### forbidOnly
Тесты, помеченные как `only`, приводят к неудаче набора.

Тип: `boolean`<br />
По умолчанию: `false`

#### forbidPending
Ожидающие тесты приводят к неудаче набора.

Тип: `boolean`<br />
По умолчанию: `false`

#### fullTrace
Полная трассировка стека при сбое.

Тип: `boolean`<br />
По умолчанию: `false`

#### global
Переменные, которые ожидаются в глобальной области.

Тип: `string[]`<br />
По умолчанию: `[]`

#### grep
Фильтр тестов по заданному регулярному выражению.

Тип: `RegExp|string`<br />
По умолчанию: `null`

#### invert
Инвертировать совпадения фильтра тестов.

Тип: `boolean`<br />
По умолчанию: `false`

#### retries
Количество повторных попыток для неудачных тестов.

Тип: `number`<br />
По умолчанию: `0`

#### timeout
Значение порога тайм-аута (в мс).

Тип: `number`<br />
По умолчанию: `30000`

## Использование Jasmine

Сначала установите пакет адаптера из NPM:

```bash npm2yarn
npm install @wdio/jasmine-framework --save-dev
```

Затем вы можете настроить свою среду Jasmine, установив свойство `jasmineOpts` в вашей конфигурации. Список всех опций можно найти на [сайте проекта Jasmine](https://jasmine.github.io/api/3.5/Configuration.html).

### Опции Jasmine

Следующие опции могут быть применены в вашем `wdio.conf.js` для настройки вашей среды Jasmine, используя свойство `jasmineOpts`. Для получения дополнительной информации об этих опциях конфигурации обратитесь к [документации Jasmine](https://jasmine.github.io/api/edge/Configuration). Вы можете передать эти опции фреймворка в качестве аргументов, например:

```sh
wdio run wdio.conf.ts --jasmineOpts.grep "my test" --jasmineOpts.failSpecWithNoExpectations --no-jasmineOpts.random
```

Это передаст следующие опции Mocha:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

Поддерживаются следующие опции Jasmine:

#### defaultTimeoutInterval
Интервал времени ожидания по умолчанию для операций Jasmine.

Тип: `number`<br />
По умолчанию: `60000`

#### helpers
Массив путей к файлам (и шаблонов) относительно spec_dir для включения перед спецификациями jasmine.

Тип: `string[]`<br />
По умолчанию: `[]`

#### requires
Опция `requires` полезна, когда вы хотите добавить или расширить базовую функциональность.

Тип: `string[]`<br />
По умолчанию: `[]`

#### random
Следует ли рандомизировать порядок выполнения спецификаций.

Тип: `boolean`<br />
По умолчанию: `true`

#### seed
Сид, который будет использоваться как основа для рандомизации. Null приведет к тому, что сид будет определен случайным образом в начале выполнения.

Тип: `Function`<br />
По умолчанию: `null`

#### failSpecWithNoExpectations
Следует ли считать спецификацию неудачной, если она не выполняла ожиданий. По умолчанию спецификация, которая не выполняла ожиданий, сообщается как успешная. Установка этого параметра в true будет сообщать о такой спецификации как о неудачной.

Тип: `boolean`<br />
По умолчанию: `false`

#### oneFailurePerSpec
Следует ли ограничить спецификации одним сбоем ожидания.

Тип: `boolean`<br />
По умолчанию: `false`

#### specFilter
Функция, которую следует использовать для фильтрации спецификаций.

Тип: `Function`<br />
По умолчанию: `(spec) => true`

#### grep
Запускать только тесты, соответствующие этой строке или регулярному выражению. (Применимо только если не установлена пользовательская функция `specFilter`)

Тип: `string|Regexp`<br />
По умолчанию: `null`

#### invertGrep
Если true, инвертирует совпадающие тесты и запускает только тесты, которые не соответствуют выражению, используемому в `grep`. (Применимо только если не установлена пользовательская функция `specFilter`)

Тип: `boolean`<br />
По умолчанию: `false`

## Использование Cucumber

Сначала установите пакет адаптера из NPM:

```bash npm2yarn
npm install @wdio/cucumber-framework --save-dev
```

Если вы хотите использовать Cucumber, установите свойство `framework` в `cucumber`, добавив `framework: 'cucumber'` в [файл конфигурации](configurationfile).

Опции для Cucumber можно указать в файле конфигурации с помощью `cucumberOpts`. Ознакомьтесь с полным списком опций [здесь](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options).

Чтобы быстро начать работу с Cucumber, посмотрите наш проект [`cucumber-boilerplate`](https://github.com/webdriverio/cucumber-boilerplate), который поставляется со всеми определениями шагов, необходимыми для начала работы, и вы сразу сможете писать feature-файлы.

### Опции Cucumber

Следующие опции могут быть применены в вашем `wdio.conf.js` для настройки вашей среды Cucumber, используя свойство `cucumberOpts`:

:::tip Настройка опций через командную строку
Опции `cucumberOpts`, такие как пользовательские `tags` для фильтрации тестов, могут быть указаны через командную строку. Это достигается с помощью формата `cucumberOpts.{optionName}="value"`.

Например, если вы хотите запустить только тесты, отмеченные тегом `@smoke`, вы можете использовать следующую команду:

```sh
# Когда вы хотите запустить только тесты с тегом "@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.tags="@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.name="some scenario name" --cucumberOpts.failFast
```

Эта команда устанавливает опцию `tags` в `cucumberOpts` на `@smoke`, гарантируя, что будут выполнены только тесты с этим тегом.

:::

#### backtrace
Показывать полную трассировку стека для ошибок.

Тип: `Boolean`<br />
По умолчанию: `true`

#### requireModule
Требовать модули перед требованием любых файлов поддержки.

Тип: `string[]`<br />
По умолчанию: `[]`<br />
Пример:

```js
cucumberOpts: {
    requireModule: ['@babel/register']
    // или
    requireModule: [
        [
            '@babel/register',
            {
                rootMode: 'upward',
                ignore: ['node_modules']
            }
        ]
    ]
 }
 ```

#### failFast
Прервать выполнение при первом сбое.

Тип: `boolean`<br />
По умолчанию: `false`

#### name
Выполнять только сценарии с именем, соответствующим выражению (может повторяться).

Тип: `RegExp[]`<br />
По умолчанию: `[]`

#### require
Требовать файлы, содержащие ваши определения шагов, перед выполнением функций. Вы также можете указать шаблон для ваших определений шагов.

Тип: `string[]`<br />
По умолчанию: `[]`
Пример:

```js
cucumberOpts: {
    require: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### import
Пути к вашему коду поддержки для ESM.

Тип: `String[]`<br />
По умолчанию: `[]`
Пример:

```js
cucumberOpts: {
    import: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### strict
Завершать с ошибкой, если есть неопределенные или ожидающие шаги.

Тип: `boolean`<br />
По умолчанию: `false`

#### tags
Выполнять только функции или сценарии с тегами, соответствующими выражению.
Пожалуйста, см. [документацию Cucumber](https://docs.cucumber.io/cucumber/api/#tag-expressions) для получения дополнительной информации.

Тип: `String`<br />
По умолчанию: ``

#### timeout
Тайм-аут в миллисекундах для определений шагов.

Тип: `Number`<br />
По умолчанию: `30000`

#### retry
Укажите количество повторных попыток для неудачных тестовых случаев.

Тип: `Number`<br />
По умолчанию: `0`

#### retryTagFilter
Повторять только функции или сценарии с тегами, соответствующими выражению (может повторяться). Эта опция требует указания '--retry'.

Тип: `RegExp`

#### language
Язык по умолчанию для ваших feature-файлов

Тип: `String`<br />
По умолчанию: `en`

#### order
Запускать тесты в определенном / случайном порядке

Тип: `String`<br />
По умолчанию: `defined`

#### format
Имя и путь вывода форматтера, который следует использовать.
WebdriverIO в основном поддерживает только [Форматтеры](https://github.com/cucumber/cucumber-js/blob/main/docs/formatters.md), которые записывают вывод в файл.

Тип: `string[]`<br />

#### formatOptions
Опции, которые должны быть предоставлены форматтерам

Тип: `object`<br />

#### tagsInTitle
Добавлять теги cucumber к имени функции или сценария

Тип: `Boolean`<br />
По умолчанию: `false`

***Обратите внимание, что это специфическая опция @wdio/cucumber-framework и не распознается самим cucumber-js***<br/>

#### ignoreUndefinedDefinitions
Обрабатывать неопределенные определения как предупреждения.

Тип: `Boolean`<br />
По умолчанию: `false`

***Обратите внимание, что это специфическая опция @wdio/cucumber-framework и не распознается самим cucumber-js***<br/>

#### failAmbiguousDefinitions
Обрабатывать неоднозначные определения как ошибки.

Тип: `Boolean`<br />
По умолчанию: `false`

***Обратите внимание, что это специфическая опция @wdio/cucumber-framework и не распознается самим cucumber-js***<br/>

#### tagExpression
Выполнять только функции или сценарии с тегами, соответствующими выражению.
Пожалуйста, см. [документацию Cucumber](https://docs.cucumber.io/cucumber/api/#tag-expressions) для получения дополнительной информации.

Тип: `String`<br />
По умолчанию: ``

***Обратите внимание, что эта опция устареет в будущем. Используйте свойство конфигурации [`tags`](#tags) вместо этого***

#### profile
Укажите используемый профиль.

Тип: `string[]`<br />
По умолчанию: `[]`

***Обратите внимание, что только определенные значения (worldParameters, name, retryTagFilter) поддерживаются в профилях, так как `cucumberOpts` имеет приоритет. Кроме того, при использовании профиля убедитесь, что упомянутые значения не объявлены в `cucumberOpts`.***

### Пропуск тестов в cucumber

Обратите внимание, что если вы хотите пропустить тест, используя обычные возможности фильтрации тестов cucumber, доступные в `cucumberOpts`, вы сделаете это для всех браузеров и устройств, настроенных в capabilities. Чтобы иметь возможность пропускать сценарии только для определенных комбинаций capabilities без необходимости начинать сессию, если это не нужно, webdriverio предоставляет следующий специфический синтаксис тегов для cucumber:

`@skip([condition])`

где condition - это необязательная комбинация свойств capabilities с их значениями, которые при **всех** совпадениях вызовут пропуск помеченного сценария или функции. Конечно, вы можете добавить несколько тегов к сценариям и функциям, чтобы пропускать тесты при нескольких различных условиях.

Вы также можете использовать аннотацию '@skip' для пропуска тестов без изменения `tagExpression'. В этом случае пропущенные тесты будут отображаться в отчете о тестировании.

Вот несколько примеров этого синтаксиса:
- `@skip` или `@skip()`: всегда пропускать помеченный элемент
- `@skip(browserName="chrome")`: тест не будет выполняться в браузерах chrome.
- `@skip(browserName="firefox";platformName="linux")`: пропустить тест при выполнении в firefox на linux.
- `@skip(browserName=["chrome","firefox"])`: помеченные элементы будут пропущены для браузеров chrome и firefox.
- `@skip(browserName=/i.*explorer/)`: capabilities с браузерами, соответствующими регулярному выражению, будут пропущены (например, `iexplorer`, `internet explorer`, `internet-explorer`, ...).

### Импорт помощника определения шагов

Чтобы использовать помощника определения шагов, такие как `Given`, `When` или `Then` или хуки, вы должны импортировать их из `@cucumber/cucumber`, например, так:

```js
import { Given, When, Then } from '@cucumber/cucumber'
```

Теперь, если вы уже используете Cucumber для других типов тестов, не связанных с WebdriverIO, для которых вы используете определенную версию, вам нужно импортировать эти помощники в ваши e2e-тесты из пакета WebdriverIO Cucumber, например:

```js
import { Given, When, Then, world, context } from '@wdio/cucumber-framework'
```

Это гарантирует, что вы используете правильные помощники в рамках фреймворка WebdriverIO и позволяет вам использовать независимую версию Cucumber для других типов тестирования.

### Публикация отчета

Cucumber предоставляет функцию для публикации отчетов о запуске тестов на `https://reports.cucumber.io/`, которую можно контролировать либо установкой флага `publish` в `cucumberOpts`, либо настройкой переменной окружения `CUCUMBER_PUBLISH_TOKEN`. Однако, когда вы используете `WebdriverIO` для выполнения тестов, существует ограничение этого подхода. Он обновляет отчеты отдельно для каждого feature-файла, что затрудняет просмотр консолидированного отчета.

Чтобы преодолеть это ограничение, мы представили метод на основе промисов под названием `publishCucumberReport` в `@wdio/cucumber-framework`. Этот метод должен вызываться в хуке `onComplete`, который является оптимальным местом для его вызова. `publishCucumberReport` требует ввода каталога отчетов, где хранятся отчеты с сообщениями cucumber.

Вы можете создавать отчеты `cucumber message`, настроив опцию `format` в ваших `cucumberOpts`. Настоятельно рекомендуется предоставлять динамическое имя файла в опции формата `cucumber message`, чтобы предотвратить перезапись отчетов и гарантировать, что каждый запуск теста точно записывается.

Перед использованием этой функции убедитесь, что установлены следующие переменные окружения:
- CUCUMBER_PUBLISH_REPORT_URL: URL, куда вы хотите опубликовать отчет Cucumber. Если не указано, будет использоваться URL по умолчанию 'https://messages.cucumber.io/api/reports'.
- CUCUMBER_PUBLISH_REPORT_TOKEN: Токен авторизации, необходимый для публикации отчета. Если этот токен не установлен, функция завершится без публикации отчета.

Вот пример необходимых конфигураций и примеров кода для реализации:

```javascript
import { v4 as uuidv4 } from 'uuid'
import { publishCucumberReport } from '@wdio/cucumber-framework';

export const config = {
    // ... Другие опции конфигурации
    cucumberOpts: {
        // ... Конфигурация опций Cucumber
        format: [
            ['message', `./reports/${uuidv4()}.ndjson`],
            ['json', './reports/test-report.json']
        ]
    },
    async onComplete() {
        await publishCucumberReport('./reports');
    }
}
```

Обратите внимание, что `./reports/` - это каталог, где будут храниться отчеты `cucumber message`.

## Использование Serenity/JS

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) - это фреймворк с открытым исходным кодом, разработанный для того, чтобы сделать приемочное и регрессионное тестирование сложных программных систем быстрее, более совместным и легче масштабируемым.

Для тестовых комплектов WebdriverIO, Serenity/JS предлагает:
- [Расширенная отчетность](https://serenity-js.org/handbook/reporting/?pk_campaign=wdio8&pk_source=webdriver.io) - Вы можете использовать Serenity/JS
  как замену любого встроенного фреймворка WebdriverIO для создания подробных отчетов о выполнении тестов и живой документации вашего проекта.
- [API шаблона сценария](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) - Чтобы сделать ваш тестовый код переносимым и повторно используемым в проектах и командах,
  Serenity/JS предоставляет вам дополнительный [слой абстракции](https://serenity-js.org/api/webdriverio?pk_campaign=wdio8&pk_source=webdriver.io) поверх нативных API WebdriverIO.
- [Интеграционные библиотеки](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io) - Для тестовых комплектов, которые следуют шаблону сценария,
  Serenity/JS также предоставляет дополнительные интеграционные библиотеки, чтобы помочь вам писать [API-тесты](https://serenity-js.org/api/rest/?pk_campaign=wdio8&pk_source=webdriver.io),
  [управлять локальными серверами](https://serenity-js.org/api/local-server/?pk_campaign=wdio8&pk_source=webdriver.io), [выполнять утверждения](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io) и многое другое!

![Пример отчета Serenity BDD](/img/serenity-bdd-reporter.png)

### Установка Serenity/JS

Чтобы добавить Serenity/JS в [существующий проект WebdriverIO](https://webdriver.io/docs/gettingstarted), установите следующие модули Serenity/JS из NPM:

```sh npm2yarn
npm install @serenity-js/{core,web,webdriverio,assertions,console-reporter,serenity-bdd} --save-dev
```

Узнайте больше о модулях Serenity/JS:
- [`@serenity-js/core`](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/web`](https://serenity-js.org/api/web/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/webdriverio`](https://serenity-js.org/api/webdriverio/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/assertions`](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/console-reporter`](https://serenity-js.org/api/console-reporter/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)

### Настройка Serenity/JS

Чтобы включить интеграцию с Serenity/JS, настройте WebdriverIO следующим образом:

<Tabs>
<TabItem value="wdio-conf-typescript" label="TypeScript" default>

```typescript title="wdio.conf.ts"
import { WebdriverIOConfig } from '@serenity-js/webdriverio';

export const config: WebdriverIOConfig = {

    // Сказать WebdriverIO использовать фреймворк Serenity/JS
    framework: '@serenity-js/webdriverio',

    // Конфигурация Serenity/JS
    serenity: {
        // Настройте Serenity/JS для использования соответствующего адаптера для вашего тестового раннера
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Зарегистрируйте службы отчетности Serenity/JS, также известные как "stage crew"
        crew: [
            // Опционально, печатать результаты выполнения тестов в стандартный вывод
            '@serenity-js/console-reporter',

            // Опционально, создавать отчеты Serenity BDD и живую документацию (HTML)
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],

            // Опционально, автоматически делать скриншоты при сбоях взаимодействия
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Настройте свой раннер Cucumber
    cucumberOpts: {
        // см. опции конфигурации Cucumber ниже
    },


    // ... или раннер Jasmine
    jasmineOpts: {
        // см. опции конфигурации Jasmine ниже
    },

    // ... или раннер Mocha
    mochaOpts: {
        // см. опции конфигурации Mocha ниже
    },

    runner: 'local',

    // Любая другая конфигурация WebdriverIO
};
```

</TabItem>
<TabItem value="wdio-conf-javascript" label="JavaScript">

```typescript title="wdio.conf.js"
export const config = {

    // Сказать WebdriverIO использовать фреймворк Serenity/JS
    framework: '@serenity-js/webdriverio',

    // Конфигурация Serenity/JS
    serenity: {
        // Настройте Serenity/JS для использования соответствующего адаптера для вашего тестового раннера
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Зарегистрируйте службы отчетности Serenity/JS, также известные как "stage crew"
        crew: [
            '@serenity-js/console-reporter',
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Настройте свой раннер Cucumber
    cucumberOpts: {
        // см. опции конфигурации Cucumber ниже
    },


    // ... или раннер Jasmine
    jasmineOpts: {
        // см. опции конфигурации Jasmine ниже
    },

    // ... или раннер Mocha
    mochaOpts: {
        // см. опции конфигурации Mocha ниже
    },

    runner: 'local',

    // Любая другая конфигурация WebdriverIO
};
```

</TabItem>
</Tabs>

Узнайте больше о:
- [Опциях конфигурации Cucumber Serenity/JS](https://serenity-js.org/api/cucumber-adapter/interface/CucumberConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Опциях конфигурации Jasmine Serenity/JS](https://serenity-js.org/api/jasmine-adapter/interface/JasmineConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Опциях конфигурации Mocha Serenity/JS](https://serenity-js.org/api/mocha-adapter/interface/MochaConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Файле конфигурации WebdriverIO](configurationfile)

### Создание отчетов и живой документации Serenity BDD

[Отчеты Serenity BDD и живая документация](https://serenity-bdd.github.io/docs/reporting/the_serenity_reports) генерируются [Serenity BDD CLI](https://github.com/serenity-bdd/serenity-core/tree/main/serenity-cli),
программой Java, которая загружается и управляется модулем [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io).

Чтобы создать отчеты Serenity BDD, ваш тестовый набор должен:
- загрузить Serenity BDD CLI, вызвав `serenity-bdd update`, что кэширует CLI `jar` локально
- создать промежуточные отчеты Serenity BDD `.json`, зарегистрировав [`SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io) в соответствии с [инструкциями по конфигурации](#configuring-serenityjs)
- вызвать Serenity BDD CLI, когда вы хотите создать отчет, вызвав `serenity-bdd run`

Шаблон, используемый всеми [шаблонами проектов Serenity/JS](https://serenity-js.org/handbook/project-templates/?pk_campaign=wdio8&pk_source=webdriver.io#webdriverio), основан
на использовании:
- скрипта NPM [`postinstall`](https://docs.npmjs.com/cli/v9/using-npm/scripts#life-cycle-operation-order) для загрузки Serenity BDD CLI
- [`npm-failsafe`](https://www.npmjs.com/package/npm-failsafe) для запуска процесса отчетности, даже если сам тестовый набор завершился с ошибкой (что именно тогда, когда вам особенно нужны отчеты о тестах...).
- [`rimraf`](https://www.npmjs.com/package/rimraf) в качестве удобного метода для удаления любых тестовых отчетов, оставшихся от предыдущего запуска

```json title="package.json"
{
  "scripts": {
    "postinstall": "serenity-bdd update",
    "clean": "rimraf target",
    "test": "failsafe clean test:execute test:report",
    "test:execute": "wdio wdio.conf.ts",
    "test:report": "serenity-bdd run"
  }
}
```

Чтобы узнать больше о `SerenityBDDReporter`, пожалуйста, обратитесь к:
- инструкциям по установке в документации [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io),
- примерам конфигурации в API-документации [`SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io),
- [примерам Serenity/JS на GitHub](https://github.com/serenity-js/serenity-js/tree/main/examples).

### Использование API шаблона сценария Serenity/JS

[Шаблон сценария](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) - это инновационный, ориентированный на пользователя подход к написанию высококачественных автоматизированных приемочных тестов. Он направляет вас к эффективному использованию слоев абстракции,
помогает вашим тестовым сценариям отражать бизнес-лексикон вашего домена и поощряет хорошие привычки тестирования и программной инженерии в вашей команде.

По умолчанию, когда вы регистрируете `@serenity-js/webdriverio` в качестве вашего `framework` WebdriverIO,
Serenity/JS настраивает стандартный [актерский состав](https://serenity-js.org/api/core/class/Cast/?pk_campaign=wdio8&pk_source=webdriver.io) [акторов](https://serenity-js.org/api/core/class/Actor/?pk_campaign=wdio8&pk_source=webdriver.io),
где каждый актор может:
- [`BrowseTheWebWithWebdriverIO`](https://serenity-js.org/api/webdriverio/class/BrowseTheWebWithWebdriverIO/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`TakeNotes.usingAnEmptyNotepad()`](https://serenity-js.org/api/core/class/TakeNotes/?pk_campaign=wdio8&pk_source=webdriver.io)

Этого должно быть достаточно, чтобы помочь вам начать внедрение тестовых сценариев, которые следуют шаблону сценария, даже в существующий тестовый комплект, например:

```typescript title="specs/example.spec.ts"
import { actorCalled } from '@serenity-js/core'
import { Navigate, Page } from '@serenity-js/web'
import { Ensure, equals } from '@serenity-js/assertions'

describe('My awesome website', () => {
    it('can have test scenarios that follow the Screenplay Pattern', async () => {
        await actorCalled('Alice').attemptsTo(
            Navigate.to(`https://webdriver.io`),
            Ensure.that(
                Page.current().title(),
                equals(`WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO`)
            ),
        )
    })

    it('can have non-Screenplay scenarios too', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser)
            .toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

Чтобы узнать больше о шаблоне сценария, ознакомьтесь с:
- [Шаблон сценария](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Веб-тестирование с Serenity/JS](https://serenity-js.org/handbook/web-testing/?pk_campaign=wdio8&pk_source=webdriver.io)
- ["BDD in Action, Second Edition"](https://www.manning.com/books/bdd-in-action-second-edition)