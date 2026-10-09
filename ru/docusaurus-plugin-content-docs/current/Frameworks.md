---
id: frameworks
title: Фреймворки
description: "Настройте Mocha, Jasmine или Cucumber.js в качестве тестового фреймворка для WDIO testrunner или интегрируйте сторонние фреймворки, такие как Serenity/JS."
---

WebdriverIO Runner имеет встроенную поддержку [Mocha](http://mochajs.org/), [Jasmine](http://jasmine.github.io/) и [Cucumber.js](https://cucumber.io/). Вы также можете интегрировать его со сторонними open-source фреймворками, такими как [Serenity/JS](#using-serenityjs).

:::tip Интеграция WebdriverIO с тестовыми фреймворками
Чтобы интегрировать WebdriverIO с тестовым фреймворком, вам понадобится пакет-адаптер, доступный в NPM.
Обратите внимание, что пакет-адаптер должен быть установлен в том же месте, где установлен WebdriverIO.
Поэтому, если вы установили WebdriverIO глобально, обязательно установите пакет-адаптер тоже глобально.
:::

Интеграция WebdriverIO с тестовым фреймворком позволяет получить доступ к экземпляру WebDriver с помощью глобальной переменной `browser`
в ваших файлах спецификаций или определениях шагов.
Обратите внимание, что WebdriverIO также позаботится о создании и завершении сессии Selenium, так что вам не нужно делать это
самостоятельно.

## Использование Mocha

Сначала установите пакет-адаптер из NPM:

```bash npm2yarn
npm install @wdio/mocha-framework --save-dev
```

По умолчанию WebdriverIO предоставляет встроенную [библиотеку утверждений](assertion), которой можно сразу начать пользоваться:

```js
describe('my awesome website', () => {
    it('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

WebdriverIO v10 поставляется с [Mocha 12](https://mochajs.org/) и поддерживает [интерфейсы](https://mochajs.org/#interfaces) Mocha `BDD` (по умолчанию), `TDD` и `QUnit`.

Если вы предпочитаете писать спецификации в стиле TDD, установите свойство `ui` в конфигурации `mochaOpts` в значение `tdd`. Теперь ваши тестовые файлы должны быть написаны так:

```js
suite('my awesome website', () => {
    test('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

Если вы хотите задать другие специфичные для Mocha настройки, вы можете сделать это с помощью ключа `mochaOpts` в вашем файле конфигурации. Список всех опций можно найти на [сайте проекта Mocha](https://mochajs.org/api/mocha).

__Примечание:__ WebdriverIO не поддерживает устаревшее использование колбэков `done` в Mocha:

```js
it('should test something', (done) => {
    done() // throws "done is not a function"
})
```

### Опции Mocha

Следующие опции можно применить в вашем `wdio.conf.js` для настройки окружения Mocha. __Примечание:__ поддерживаются не все опции Mocha. `parallel` по-прежнему относится к собственному пулу воркеров Mocha и здесь вызовет ошибку — WDIO testrunner уже распараллеливает спецификации по capabilities и воркерам. CLI Mocha 12 также перешёл с yargs на `util.parseArgs` из Node; это влияет только на прямой вызов `mocha`, но не на `mochaOpts`, передаваемые через `wdio`. Вы можете передавать эти опции фреймворка как аргументы, например:

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

<Option type="string|string[]" default="[]">

Опция `require` полезна, когда вы хотите добавить или расширить некоторую базовую функциональность (опция фреймворка WebdriverIO).

</Option>

#### allowUncaught

<Option type="boolean" default="false">

Пробрасывать неперехваченные ошибки.

</Option>

#### bail

<Option type="boolean" default="false">

Прервать выполнение после первого упавшего теста.

</Option>

#### checkLeaks

<Option type="boolean" default="false">

Проверять утечки глобальных переменных.

</Option>

#### delay

<Option type="boolean" default="false">

Отложить выполнение корневого набора тестов.

</Option>

#### failHookAffectedTests

<Option type="boolean" default="true">

Сообщать о каждом тесте, пропущенном из-за упавшего хука `before` или `beforeEach`, как о провале. WebdriverIO включает эту опцию, чтобы сломанный хук настройки был виден в каждой пропущенной им спецификации. Установите значение `false`, чтобы сообщать только о хуке.

</Option>

#### fgrep

<Option type="string" default="null">

Фильтр тестов по заданной строке.

</Option>

#### forbidOnly

<Option type="boolean" default="false">

Тесты, помеченные `only`, приводят к провалу набора.

</Option>

#### forbidPending

<Option type="boolean" default="false">

Отложенные (pending) тесты приводят к провалу набора.

</Option>

#### fullTrace

<Option type="boolean" default="false">

Полная трассировка стека при сбое.

</Option>

#### global

<Option type="string[]" default="[]">

Переменные, ожидаемые в глобальной области видимости.

</Option>

#### grep

<Option type="RegExp|string" default="null">

Фильтр тестов по заданному регулярному выражению. Mocha 12 принимает в этом фильтре современные флаги RegExp (например, `s` или `d`).

</Option>

#### invert

<Option type="boolean" default="false">

Инвертировать совпадения фильтра тестов.

</Option>

#### retries

<Option type="number" default="0">

Количество повторных попыток для упавших тестов.

</Option>

#### timeout

<Option type="number" default="30000">

Пороговое значение тайм-аута (в мс).

</Option>

## Использование Jasmine

Сначала установите пакет-адаптер из NPM:

```bash npm2yarn
npm install @wdio/jasmine-framework --save-dev
```

Затем вы можете настроить окружение Jasmine, задав свойство `jasmineOpts` в вашей конфигурации. Список всех опций можно найти на [сайте проекта Jasmine](https://jasmine.github.io/api/edge/Configuration.html).

### Опции Jasmine

Следующие опции можно применить в вашем `wdio.conf.js` для настройки окружения Jasmine с помощью свойства `jasmineOpts`. Подробнее об этих опциях конфигурации см. в [документации Jasmine](https://jasmine.github.io/api/edge/Configuration). Вы можете передавать эти опции фреймворка как аргументы, например:

```sh
wdio run wdio.conf.ts --jasmineOpts.grep "my test" --jasmineOpts.failSpecWithNoExpectations --no-jasmineOpts.random
```

Это передаст следующие опции Jasmine:

```ts
{
    grep: 'my test',
    failSpecWithNoExpectations: true,
    random: false
}
```

Поддерживаются следующие опции Jasmine:

#### defaultTimeoutInterval

<Option type="number" default="60000">

Интервал тайм-аута по умолчанию для операций Jasmine.

</Option>

#### helpers

<Option type="string[]" default="[]">

Массив путей к файлам (и glob-шаблонов) относительно spec_dir, которые подключаются перед спецификациями jasmine.

</Option>

#### requires

<Option type="string[]" default="[]">

Опция `requires` полезна, когда вы хотите добавить или расширить некоторую базовую функциональность.

</Option>

#### random

<Option type="boolean" default="false">

Нужно ли рандомизировать порядок выполнения спецификаций. В самом Jasmine значение по умолчанию — `true`, но WebdriverIO запускает спецификации по порядку, если вы не установите эту опцию.

</Option>

#### seed

<Option type="Function" default="null">

Seed, используемый как основа для рандомизации. Значение null приводит к тому, что seed определяется случайным образом в начале выполнения.

</Option>

#### failSpecWithNoExpectations

<Option type="boolean" default="false">

Нужно ли считать спецификацию проваленной, если в ней не было выполнено ни одного ожидания. По умолчанию спецификация без ожиданий считается пройденной. Установка значения true приведёт к тому, что такая спецификация будет считаться проваленной.

</Option>

#### oneFailurePerSpec

<Option type="boolean" default="false">

Останавливать спецификацию на первом проваленном ожидании. Проваленный синхронный матчер сразу останавливает спецификацию, а ожидаемый (awaited) асинхронный матчер останавливает её, когда его промис завершится. Остальные спецификации продолжают выполняться.

</Option>

#### specFilter

<Option type="Function" default="(spec) => true">

Функция для фильтрации спецификаций.

</Option>

#### grep

<Option type="string|Regexp" default="null">

Запускать только тесты, соответствующие этой строке или регулярному выражению. (Применимо, только если не задана пользовательская функция `specFilter`)

</Option>

#### invertGrep

<Option type="boolean" default="false">

Если true, инвертирует совпадающие тесты и запускает только тесты, которые не соответствуют выражению, используемому в `grep`. (Применимо, только если не задана пользовательская функция `specFilter`)

</Option>

#### stopOnSpecFailure

<Option type="boolean" default="false">

Останавливать файл спецификации на первой проваленной спецификации (`it`): остальные спецификации файла не запускаются, в том числе в других блоках `describe`. Другие файлы спецификаций выполняются в своих собственных воркерах и продолжают работу.

</Option>

#### cleanStack

<Option type="boolean" default="true">

Удалять строки пакетов из `node_modules` из трассировок стека при сбоях.

</Option>

#### expectationResultHandler

<Option type="Function" default="null">

Вызывается с `(passed, assertion)` для каждого ожидания, например, чтобы сделать скриншот при провале ожидания. Если функция выбрасывает исключение для пройденного ожидания, ожидание проваливается с этой ошибкой.

</Option>

### Утверждения

В Jasmine глобальный `expect` объединяет матчеры Jasmine и [матчеры WebdriverIO](/docs/api/expect-webdriverio):

- Матчеры Jasmine (`toBe`, `toEqual`, `toHaveBeenCalled`, …) и матчеры, которые вы добавляете с помощью `jasmine.addMatchers`, синхронны. Они возвращают `undefined`, поэтому `await` не нужен.
- Матчеры WebdriverIO, асинхронные матчеры Jasmine (`toBeResolved`, `toBeRejectedWith`, …) и матчеры, которые вы добавляете с помощью `jasmine.addAsyncMatchers`, возвращают промис. Всегда используйте для них `await`.

Используйте `expect()` для обоих типов: он сам направляет каждый матчер в `expect` или `expectAsync` Jasmine. `await expectAsync($('#logo')).toBeDisplayed()` тоже работает. Для TypeScript `@wdio/jasmine-framework` в `types` также добавляет матчеры WebdriverIO в `expectAsync()`.

```js
it('checks the page', async () => {
    expect([1, 2]).toHaveSize(2)                                   // Jasmine, sync
    await expect($('#logo')).toHaveSize({ width: 32, height: 32 }) // WebdriverIO, async
    await expect(loadData()).toBeResolved()                        // Jasmine async matcher
})
```

`toHaveSize` существует в обеих библиотеках. Матчер WebdriverIO работает со значениями WebdriverIO: элементом, массивом элементов или `Element[]` (например, результатом `$$().filter()`), multi-remote элементом, браузером, контекстом браузинга, моком, обёрткой `some()` или промисом, таким как цепочечный `$()`. Матчер Jasmine работает со всеми остальными значениями.

Асимметричные матчеры обеих библиотек работают как в матчерах Jasmine, так и в матчерах WebdriverIO: `jasmine.any()`, `jasmine.objectContaining()`, `jasmine.stringMatching()`, … и `expect.any()`, `expect.stringContaining()`, `expect.oneOf()`, `expect.multiRemote()`, `expect.not.stringContaining()`, …. Чтобы использовать `some()`, импортируйте его:

```js
import { some } from 'expect-webdriverio/api'

await expect(some($$('li'))).toHaveAttribute('data-state', 'on')
```

Части `expect` из Jest недоступны с Jasmine: матчеры, существующие только в Jest, такие как `toStrictEqual` или `toHaveLength`, и `expect.soft()`. Чтобы добавить пользовательский матчер, используйте `expect.extend()` в файле спецификации или в хуке `before` (см. [Пользовательские матчеры](/docs/custommatchers)), либо `jasmine.addMatchers` для синхронного матчера и `jasmine.addAsyncMatchers` для асинхронного.

Для TypeScript добавьте `jasmine` в `types`, см. [Настройка TypeScript](/docs/typescript).

## Использование Cucumber

Сначала установите пакет-адаптер из NPM:

```bash npm2yarn
npm install @wdio/cucumber-framework --save-dev
```

Если вы хотите использовать Cucumber, установите свойство `framework` в значение `cucumber`, добавив `framework: 'cucumber'` в [файл конфигурации](configurationfile).

Опции для Cucumber можно задать в файле конфигурации с помощью `cucumberOpts`. Полный список опций смотрите [здесь](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options). Адаптер использует Cucumber 13. `tagExpression` удалён; для фильтрации используйте `tags`. См. [руководство по миграции на v10](v10-migration#cucumber).

Чтобы быстро начать работу с Cucumber, взгляните на наш проект [`cucumber-boilerplate`](https://github.com/webdriverio/cucumber-boilerplate), который поставляется со всеми необходимыми для начала определениями шагов, и вы сразу сможете писать feature-файлы.

### Опции Cucumber

Следующие опции можно применить в вашем `wdio.conf.js` для настройки окружения Cucumber с помощью свойства `cucumberOpts`:

:::tip Настройка опций через командную строку
`cucumberOpts`, например пользовательские `tags` для фильтрации тестов, можно указать через командную строку. Это делается с использованием формата `cucumberOpts.{optionName}="value"`.

Например, если вы хотите запустить только тесты, помеченные тегом `@smoke`, можно использовать следующую команду:

```sh
# When you only want to run tests that hold the tag "@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.tags="@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.name="some scenario name" --cucumberOpts.failFast
```

Эта команда устанавливает опцию `tags` в `cucumberOpts` в значение `@smoke`, гарантируя, что будут выполнены только тесты с этим тегом.

:::

#### backtrace

<Option type="Boolean" default="true">

Показывать полную трассировку для ошибок.

</Option>

#### requireModule

<Option type="string[]" default="[]">

Подключать модули перед подключением любых вспомогательных файлов.

</Option>
Пример:

```js
cucumberOpts: {
    requireModule: ['@babel/register']
    // or
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

<Option type="boolean" default="false">

Прервать запуск при первом сбое.

</Option>

#### name

<Option type="RegExp[]" default="[]">

Выполнять только сценарии, имя которых соответствует выражению (можно повторять).

</Option>

#### require

<Option type="string[]" default="[]">

Подключать файлы с вашими определениями шагов перед выполнением фич. Вы также можете указать glob-шаблон для ваших определений шагов.

</Option>
Пример:

```js
cucumberOpts: {
    require: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### import

<Option type="String[]" default="[]">

Пути к вашему вспомогательному коду, для ESM.

</Option>
Пример:

```js
cucumberOpts: {
    import: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### strict

<Option type="boolean" default="false">

Завершать с ошибкой, если есть неопределённые или отложенные шаги.

</Option>

#### tags

<Option type="String" default="">

Выполнять только фичи или сценарии с тегами, соответствующими выражению.
Подробнее см. в [документации Cucumber](https://docs.cucumber.io/cucumber/api/#tag-expressions).

</Option>

#### timeout

<Option type="Number" default="30000">

Тайм-аут в миллисекундах для определений шагов.

</Option>

#### retry

<Option type="Number" default="0">

Укажите количество повторных попыток для упавших тест-кейсов.

</Option>

#### retryTagFilter

<Option type="RegExp">

Повторять только фичи или сценарии с тегами, соответствующими выражению (можно повторять). Эта опция требует указания '--retry'.

</Option>

#### language

<Option type="String" default="en">

Язык по умолчанию для ваших feature-файлов

</Option>

#### order

<Option type="String" default="defined">

Запускать тесты в заданном / случайном порядке

</Option>

#### format

<Option type="string[]">

Имя и путь к выходному файлу используемого форматтера.
WebdriverIO в основном поддерживает только те [форматтеры](https://github.com/cucumber/cucumber-js/blob/main/docs/formatters.md), которые записывают вывод в файл.

</Option>

#### formatOptions

<Option type="object">

Опции, передаваемые форматтерам

</Option>

#### tagsInTitle

<Option type="Boolean" default="false">

Добавлять теги cucumber к имени фичи или сценария

</Option>
***Обратите внимание, что это опция, специфичная для @wdio/cucumber-framework, и сам cucumber-js её не распознаёт***<br/>

#### ignoreUndefinedDefinitions

<Option type="Boolean" default="false">

Рассматривать неопределённые определения как предупреждения.

</Option>
***Обратите внимание, что это опция, специфичная для @wdio/cucumber-framework, и сам cucumber-js её не распознаёт***<br/>

#### failAmbiguousDefinitions

<Option type="Boolean" default="false">

Рассматривать неоднозначные определения как ошибки.

</Option>
***Обратите внимание, что это опция, специфичная для @wdio/cucumber-framework, и сам cucumber-js её не распознаёт***<br/>

#### profile

<Option type="string[]" default="[]">

Укажите используемый профиль.

</Option>
***Обратите внимание, что в профилях поддерживаются только определённые значения (worldParameters, name, retryTagFilter), так как `cucumberOpts` имеет приоритет. Кроме того, при использовании профиля убедитесь, что указанные значения не объявлены в `cucumberOpts`.***

### Пропуск тестов в cucumber

Обратите внимание, что если вы хотите пропустить тест, используя обычные возможности фильтрации тестов cucumber, доступные в `cucumberOpts`, то он будет пропущен для всех браузеров и устройств, настроенных в capabilities. Чтобы иметь возможность пропускать сценарии только для определённых комбинаций capabilities без запуска сессии, если в этом нет необходимости, webdriverio предоставляет следующий специальный синтаксис тегов для cucumber:

`@skip([condition])`

где condition — это необязательная комбинация свойств capabilities с их значениями, при совпадении **всех** из которых помеченный сценарий или фича будут пропущены. Конечно, вы можете добавить несколько тегов к сценариям и фичам, чтобы пропускать тесты при нескольких различных условиях.

Вы также можете использовать аннотацию '@skip', чтобы пропускать тесты без изменения `tags`. В этом случае пропущенные тесты будут отображаться в отчёте о тестировании.

Вот несколько примеров этого синтаксиса:
- `@skip` или `@skip()`: всегда пропускает помеченный элемент
- `@skip(browserName="chrome")`: тест не будет выполняться в браузерах chrome.
- `@skip(browserName="firefox";platformName="linux")`: пропустит тест при выполнении в firefox на linux.
- `@skip(browserName=["chrome","firefox"])`: помеченные элементы будут пропущены как для браузера chrome, так и для firefox.
- `@skip(browserName=/i.*explorer/)`: capabilities с браузерами, соответствующими регулярному выражению, будут пропущены (например, `iexplorer`, `internet explorer`, `internet-explorer`, ...).

### Импорт хелперов определения шагов

Чтобы использовать хелперы определения шагов, такие как `Given`, `When` или `Then`, или хуки, их нужно импортировать из `@cucumber/cucumber`, например так:

```js
import { Given, When, Then } from '@cucumber/cucumber'
```

Если же вы уже используете Cucumber для других типов тестов, не связанных с WebdriverIO, и применяете для них определённую версию, вам нужно импортировать эти хелперы в ваших e2e-тестах из пакета WebdriverIO Cucumber, например:

```js
import { Given, When, Then, world, context } from '@wdio/cucumber-framework'
```

Это гарантирует, что вы используете правильные хелперы в рамках фреймворка WebdriverIO, и позволяет использовать независимую версию Cucumber для других типов тестирования.

### Публикация отчёта

Cucumber предоставляет возможность публиковать отчёты о запусках тестов на `https://reports.cucumber.io/`, что можно контролировать либо установкой флага `publish` в `cucumberOpts`, либо настройкой переменной окружения `CUCUMBER_PUBLISH_TOKEN`. Однако при использовании `WebdriverIO` для выполнения тестов у этого подхода есть ограничение: отчёты обновляются отдельно для каждого feature-файла, что затрудняет просмотр сводного отчёта.

Чтобы обойти это ограничение, мы добавили в `@wdio/cucumber-framework` основанный на промисах метод `publishCucumberReport`. Этот метод следует вызывать в хуке `onComplete`, который является оптимальным местом для его вызова. `publishCucumberReport` требует указания каталога, в котором хранятся отчёты cucumber message.

Вы можете генерировать отчёты `cucumber message`, настроив опцию `format` в ваших `cucumberOpts`. Настоятельно рекомендуется указывать динамическое имя файла в опции формата `cucumber message`, чтобы избежать перезаписи отчётов и гарантировать точную запись каждого запуска тестов.

Перед использованием этой функции обязательно установите следующие переменные окружения:
- CUCUMBER_PUBLISH_REPORT_URL: URL, по которому вы хотите опубликовать отчёт Cucumber. Если не указан, будет использован URL по умолчанию 'https://messages.cucumber.io/api/reports'.
- CUCUMBER_PUBLISH_REPORT_TOKEN: токен авторизации, необходимый для публикации отчёта. Если этот токен не установлен, функция завершится без публикации отчёта.

Вот пример необходимых настроек и кода для реализации:

```javascript
import { v4 as uuidv4 } from 'uuid'
import { publishCucumberReport } from '@wdio/cucumber-framework';

export const config = {
    // ... Other Configuration Options
    cucumberOpts: {
        // ... Cucumber Options Configuration
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

Обратите внимание, что `./reports/` — это каталог, в котором будут храниться отчёты `cucumber message`.

## Использование Serenity/JS

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) — это open-source фреймворк, созданный для того, чтобы сделать приёмочное и регрессионное тестирование сложных программных систем быстрее, удобнее для совместной работы и проще в масштабировании.

Для наборов тестов WebdriverIO Serenity/JS предлагает:
- [Расширенную отчётность](https://serenity-js.org/handbook/reporting/?pk_campaign=wdio8&pk_source=webdriver.io) — вы можете использовать Serenity/JS
  как прямую замену любого встроенного фреймворка WebdriverIO для создания подробных отчётов о выполнении тестов и живой документации вашего проекта.
- [API паттерна Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) — чтобы сделать ваш тестовый код переносимым и повторно используемым в разных проектах и командах,
  Serenity/JS предоставляет необязательный [слой абстракции](https://serenity-js.org/api/webdriverio?pk_campaign=wdio8&pk_source=webdriver.io) поверх нативных API WebdriverIO.
- [Интеграционные библиотеки](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io) — для наборов тестов, следующих паттерну Screenplay,
  Serenity/JS также предоставляет необязательные интеграционные библиотеки, которые помогут вам писать [API-тесты](https://serenity-js.org/api/rest/?pk_campaign=wdio8&pk_source=webdriver.io),
  [управлять локальными серверами](https://serenity-js.org/api/local-server/?pk_campaign=wdio8&pk_source=webdriver.io), [выполнять утверждения](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io) и многое другое!

![Serenity BDD Report Example](/img/serenity-bdd-reporter.png)

### Установка Serenity/JS

Чтобы добавить Serenity/JS в [существующий проект WebdriverIO](https://webdriver.io/docs/gettingstarted), установите следующие модули Serenity/JS из NPM:

```sh npm2yarn
npm install @serenity-js/{core,web,webdriverio,assertions,console-reporter,serenity-bdd} --save-dev
```

Подробнее о модулях Serenity/JS:
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

    // Укажите WebdriverIO использовать фреймворк Serenity/JS
    framework: '@serenity-js/webdriverio',

    // Конфигурация Serenity/JS
    serenity: {
        // Настройте Serenity/JS на использование подходящего адаптера для вашего тест-раннера
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Зарегистрируйте сервисы отчётности Serenity/JS, т. н. "stage crew"
        crew: [
            // Необязательно, вывод результатов выполнения тестов в стандартный вывод
            '@serenity-js/console-reporter',

            // Необязательно, создание отчётов Serenity BDD и живой документации (HTML)
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],

            // Необязательно, автоматическое создание скриншотов при сбое взаимодействия
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Настройте ваш раннер Cucumber
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

    // Укажите WebdriverIO использовать фреймворк Serenity/JS
    framework: '@serenity-js/webdriverio',

    // Конфигурация Serenity/JS
    serenity: {
        // Настройте Serenity/JS на использование подходящего адаптера для вашего тест-раннера
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Зарегистрируйте сервисы отчётности Serenity/JS, т. н. "stage crew"
        crew: [
            '@serenity-js/console-reporter',
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Настройте ваш раннер Cucumber
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

Подробнее:
- [Опции конфигурации Cucumber в Serenity/JS](https://serenity-js.org/api/cucumber-adapter/interface/CucumberConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Опции конфигурации Jasmine в Serenity/JS](https://serenity-js.org/api/jasmine-adapter/interface/JasmineConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Опции конфигурации Mocha в Serenity/JS](https://serenity-js.org/api/mocha-adapter/interface/MochaConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Файл конфигурации WebdriverIO](configurationfile)

### Создание отчётов Serenity BDD и живой документации

[Отчёты Serenity BDD и живая документация](https://serenity-bdd.github.io/docs/reporting/the_serenity_reports) генерируются с помощью [Serenity BDD CLI](https://github.com/serenity-bdd/serenity-core/tree/main/serenity-cli) —
Java-программы, которая загружается и управляется модулем [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io).

Чтобы создавать отчёты Serenity BDD, ваш набор тестов должен:
- загрузить Serenity BDD CLI, вызвав `serenity-bdd update`, который кэширует `jar` CLI локально
- создавать промежуточные `.json`-отчёты Serenity BDD, зарегистрировав [`SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io) согласно [инструкциям по настройке](#configuring-serenityjs)
- вызывать Serenity BDD CLI, когда вы хотите создать отчёт, с помощью `serenity-bdd run`

Шаблон, используемый во всех [шаблонах проектов Serenity/JS](https://serenity-js.org/handbook/project-templates/?pk_campaign=wdio8&pk_source=webdriver.io#webdriverio), основан
на использовании:
- NPM-скрипта [`postinstall`](https://docs.npmjs.com/cli/v9/using-npm/scripts#life-cycle-operation-order) для загрузки Serenity BDD CLI
- [`npm-failsafe`](https://www.npmjs.com/package/npm-failsafe) для запуска процесса создания отчётов, даже если сам набор тестов провалился (а именно тогда отчёты о тестах нужнее всего...).
- [`rimraf`](https://www.npmjs.com/package/rimraf) как удобного способа удалить все отчёты о тестах, оставшиеся от предыдущего запуска

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

Чтобы узнать больше о `SerenityBDDReporter`, обратитесь к:
- инструкциям по установке в [документации `@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io),
- примерам конфигурации в [документации API `SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io),
- [примерам Serenity/JS на GitHub](https://github.com/serenity-js/serenity-js/tree/main/examples).

### Использование API паттерна Screenplay в Serenity/JS

[Паттерн Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) — это инновационный, ориентированный на пользователя подход к написанию высококачественных автоматизированных приёмочных тестов. Он направляет вас к эффективному использованию уровней абстракции,
помогает вашим тестовым сценариям отражать бизнес-язык вашей предметной области и прививает вашей команде хорошие привычки в тестировании и разработке программного обеспечения.

По умолчанию, когда вы регистрируете `@serenity-js/webdriverio` в качестве `framework` WebdriverIO,
Serenity/JS настраивает [состав](https://serenity-js.org/api/core/class/Cast/?pk_campaign=wdio8&pk_source=webdriver.io) [актёров](https://serenity-js.org/api/core/class/Actor/?pk_campaign=wdio8&pk_source=webdriver.io) по умолчанию,
где каждый актёр может:
- [`BrowseTheWebWithWebdriverIO`](https://serenity-js.org/api/webdriverio/class/BrowseTheWebWithWebdriverIO/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`TakeNotes.usingAnEmptyNotepad()`](https://serenity-js.org/api/core/class/TakeNotes/?pk_campaign=wdio8&pk_source=webdriver.io)

Этого должно быть достаточно, чтобы начать добавлять тестовые сценарии, следующие паттерну Screenplay, даже в существующий набор тестов, например:

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

Чтобы узнать больше о паттерне Screenplay, ознакомьтесь с:
- [Паттерн Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Веб-тестирование с Serenity/JS](https://serenity-js.org/handbook/web-testing/?pk_campaign=wdio8&pk_source=webdriver.io)
- ["BDD in Action, Second Edition"](https://www.manning.com/books/bdd-in-action-second-edition)