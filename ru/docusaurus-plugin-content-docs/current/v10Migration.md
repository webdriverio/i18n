---
id: v10-migration
title: Переход с v9 на v10
description: Обновление проекта WebdriverIO с v9 до v10, включая все несовместимые изменения и навык для ИИ-агента, который применяет это руководство.
---

В этом руководстве собраны несовместимые изменения WebdriverIO `v10` и описано, что с ними нужно сделать.

В отличие от предыдущих мажорных версий, большинство этих изменений нельзя применить с помощью [codemod](https://github.com/webdriverio/codemod) WebdriverIO, потому что они зависят от того, что на самом деле проверяют ваши тесты. Изменения [устаревших сигнатур команд](#legacy-command-signatures) ниже — это механические замены. В остальных разделах описано, как найти затронутые места в вашем наборе тестов.

## Миграция с помощью ИИ-агента

Дайте своему агенту навык миграции на v10 и попросите его перевести набор тестов на WebdriverIO v10, следуя этой странице. Навык описывает процедуру: что искать, какой codemod запускать и когда остановиться. Эта страница — источник истины для каждого несовместимого изменения.

Установите навык из проекта, который вы обновляете. [CLI skills](https://skills.sh) читает [`.agents/skills/wdio-v10-migration/SKILL.md`](https://github.com/webdriverio/webdriverio/blob/main/.agents/skills/wdio-v10-migration/SKILL.md) из этого репозитория и записывает его в каталог навыков выбранных вами агентов:

```sh
npx skills add webdriverio/webdriverio --skill wdio-v10-migration
```

`--skill wdio-v10-migration` устанавливает этот навык. Навыки для работы с репозиторием WebdriverIO помечены как внутренние и не предлагаются. CLI спрашивает, для каких агентов выполнить установку, и записывает навык в каталог проекта каждого агента. Вы также можете прикрепить этот файл к чату.

Строгие селекторы и списки `specs` / `exclude` без префикса в capabilities проявляются только при запуске тестов. Навык не может определить их только по исходному коду.

## Node.js

WebdriverIO v10 требует Node.js 22.19.0 или новее. Node.js 18 и 20 больше не поддерживаются. CI покрывает Node.js 22, 24 и 26.

## Компонентные тесты

Браузерный раннер по-прежнему работает в Chrome 90, Edge 90, Firefox 90 и Safari 14.1 или новее. См. [Поддержка браузеров](/docs/component-testing#browser-support).

Код, передаваемый в `browser.execute`, остаётся на уровне ES2021, поэтому он может выполняться в более старых тестируемых браузерах. Этот минимальный уровень не изменился.

## Mocha

`@wdio/mocha-framework` и `@wdio/browser-runner` зависят от [Mocha 12](https://mochajs.org/blog/mocha-12-stable/). Mocha 12 требует Node.js `^20.19.0 || >=22.12.0`, что покрывается минимальной версией v10 — 22.19.0.

```diff
- mochaOpts: { compilers: ['ts:ts-node/register'] }
+ mochaOpts: { require: ['ts-node/register'] }
```

`mochaOpts.compilers` удалён. Mocha убрала давно устаревший флаг `--compilers`, поэтому оставшиеся сопоставления компиляторов игнорируются. Загружайте транспиляторы или другие файлы настройки через `mochaOpts.require`.

`failHookAffectedTests` по умолчанию равен `true`. Упавший хук `before` или `beforeEach` помечает как упавшие тесты, которые были пропущены из-за этого хука. Установите `mochaOpts.failHookAffectedTests` в `false`, чтобы сообщать только о хуке.

Используйте `expect-webdriverio` 8, см. [expect-webdriverio 8](#expect-webdriverio-8). Mocha может загрузить этот пакет дважды в одном процессе; он разделяет состояние утверждений между этими копиями ([expect-webdriverio#2221](https://github.com/webdriverio/expect-webdriverio/pull/2221)).

Изменения Mocha 12, которые могут проявиться через `mochaOpts`:

- `grep` принимает современные флаги RegExp.
- `ui` по-прежнему `bdd`, `tdd`, `qunit` или `exports`. Пользовательские интерфейсы должны сохранять суффикс `*-bdd`, `*-tdd` или `*-qunit`.
- `parallel` по-прежнему не поддерживается. Параллелизмом спецификаций управляет WDIO; пул воркеров Mocha выдаст ошибку, если вы его включите.

Mocha 12 ориентирована в первую очередь на ESM (`"type": "module"`). Программный `require('mocha')` по-прежнему работает в Node 22 благодаря `require(esm)`. CLI Mocha в WDIO (`wdio run … --mochaOpts.*`) не изменился; собственный CLI Mocha теперь использует `util.parseArgs` вместо yargs.

## Cucumber

`@wdio/cucumber-framework` зависит от [`@cucumber/cucumber` 13](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300).

Cucumber 13 требует Node.js 22, 24 или 26 и новее. Он не работает на Node.js 20, 23 или 25. Пакет фреймворка объявляет тот же диапазон, начиная с минимальной версии v10 — 22.19.0.

```diff
- cucumberOpts: { tagExpression: '@smoke' }
+ cucumberOpts: { tags: '@smoke' }
```

Для `tagExpression` нет псевдонима. Его установка вызывает исключение, чтобы оставшийся фильтр не привёл незаметно к запуску всех сценариев.

Cucumber 13 больше не экспортирует `Cli`. Программные запуски выполняются через `runCucumber` из `@cucumber/cucumber/api`, который адаптер уже использует.

Другие несовместимые изменения Cucumber 13 (неоднозначные пути форматтеров, параллельные воркеры, `BeforeAll` / `AfterAll`) описаны в [руководстве по обновлению Cucumber](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300).

## Jasmine

`@wdio/jasmine-framework` зависит от [Jasmine 6](https://jasmine.github.io/upgrade-guides/6.0). Jasmine 6 тестируется на Node.js 20, 22 и 24. Минимальная версия v10 — 22.19.0 — уже покрывает этот диапазон.

`jasmineNodeOpts` удалён. Настраивайте Jasmine через `jasmineOpts`. Установка `jasmineNodeOpts` вызывает исключение:

```text
The option "jasmineNodeOpts" was removed in WebdriverIO v10. Use "jasmineOpts" instead.
```

```diff
- jasmineNodeOpts: { defaultTimeoutInterval: 60000 }
+ jasmineOpts: { defaultTimeoutInterval: 60000 }
```

`jasmineOpts.failFast` больше не читается. Используйте `jasmineOpts.stopOnSpecFailure`. Оставшийся `failFast` не останавливает набор тестов. `failFast` в Cucumber — это другая опция, и она по-прежнему работает.

```diff
- jasmineOpts: { failFast: true }
+ jasmineOpts: { stopOnSpecFailure: true }
```

`jasmineOpts.stopSpecOnExpectationFailure` удалён. Используйте `jasmineOpts.oneFailurePerSpec`. Установка старого ключа вызывает исключение:

```text
The option "jasmineOpts.stopSpecOnExpectationFailure" was removed in WebdriverIO v10. Use "jasmineOpts.oneFailurePerSpec" instead.
```

```diff
- jasmineOpts: { stopSpecOnExpectationFailure: true }
+ jasmineOpts: { oneFailurePerSpec: true }
```

Синхронные матчеры Jasmine снова синхронны. В v9 глобальный `expect` был `expectAsync` из Jasmine, поэтому `expect(1).toBe(1)` возвращал промис. В v10 встроенные матчеры Jasmine и матчеры, добавленные через `jasmine.addMatchers`, возвращают `undefined`. Матчеры WebdriverIO, асинхронные матчеры Jasmine и матчеры из `jasmine.addAsyncMatchers` по-прежнему возвращают промис, поэтому продолжайте использовать для них `await`. Вам не нужно менять `await expect($('#logo')).toBeDisplayed()` на `expectAsync()`: глобальный `expect` сам направляет матчеры WebdriverIO в `expectAsync`. `await expect(1).toBe(1)` продолжает работать.

Упавшее синхронное утверждение без `await` теперь приводит к падению спецификации. В v9 это был отклонённый промис: если его никто не ожидал, спецификация могла пройти, оставив в логе только необработанное отклонение. После обновления посмотрите на спецификации, которые начали падать. В v9 у них была скрытая ошибка, и исправлять нужно тест или приложение, а не вызов `expect`:

```js
it('saves the form', async () => {
    const onSave = jasmine.createSpy('onSave')
    await submitForm(onSave)
    // v9: проходил, даже если `onSave` не был вызван
    // v10: падает, если `onSave` не был вызван
    expect(onSave).toHaveBeenCalled()
})
```

Результат синхронного матчера теперь `undefined`, поэтому `.then()` или `.catch()` на нём вызывает `TypeError`:

```diff
- expect(total).toBe(3).then(() => log('ok'))
+ expect(total).toBe(3)
+ log('ok')
```

Другие последствия этого изменения:

- `oneFailurePerSpec` теперь останавливает спецификацию на первом упавшем утверждении: сразу для синхронного матчера и при завершении промиса для ожидаемого асинхронного матчера.
- Матчеры шпионов Jasmine работают без `await`. В v9 `toHaveBeenCalled`, `toHaveSpyInteractions` и `toHaveNoOtherSpyInteractions` падали с ошибкой "Does not take arguments", а невызванный шпион проходил проверку без `await`.
- `jasmine.addMatchers` больше не подменяется, поэтому Jasmine больше не показывает предупреждение "Monkey patching detected".

`toHaveSize` имеет два значения. Для значения WebdriverIO это матчер WebdriverIO, проверяющий размер элемента: элемент, массив элементов (включая результат `$$().filter()`), `Element[]`, multi-remote элемент, браузер, контекст просмотра, мок, обёртка `some()` или промис, например цепочечный `$()`. Для любого другого значения это матчер Jasmine, проверяющий длину. В v9 всегда выполнялся матчер Jasmine.

```js
expect([1, 2]).toHaveSize(2)                                   // Jasmine, синхронно
await expect($('#logo')).toHaveSize({ width: 32, height: 32 }) // WebdriverIO, асинхронно
```

Типы следуют тем же правилам. `@wdio/jasmine-framework` теперь типизирует глобальный `expect` матчерами Jasmine, а также матчерами WebdriverIO и асинхронными матчерами Jasmine, которые возвращают промис. Удалите `expect-webdriverio/jasmine-wdio-expect-async` из `types` в вашем `tsconfig.json`, потому что он типизирует все матчеры как асинхронные. Добавьте `jasmine`, если его там нет:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "types": ["node", "@wdio/globals/types", "expect-webdriverio/jasmine-wdio-expect-async", "@wdio/jasmine-framework"]
+        "types": ["node", "jasmine", "@wdio/globals/types", "@wdio/jasmine-framework"]
     }
 }
```

`expect.oneOf()` и `expect.multiRemote()` теперь также работают в спецификациях Jasmine. Раньше их не было в `expect` Jasmine во время выполнения.

## expect-webdriverio 8

`@wdio/globals`, `@wdio/runner` и `@wdio/browser-runner` требуют `expect-webdriverio` 8 в качестве peer-зависимости. В v9 это был `expect-webdriverio` 7. Если ваш `package.json` содержит `expect-webdriverio`, обновите его до версии 8 в том же изменении, что и пакеты `@wdio/*`.

У `expect-webdriverio` 8 есть собственные несовместимые изменения. В его [руководстве по миграции с v7 на v8](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/Migrations.md#migration-guide-v7-to-v8) перечислены все изменения и их замены. Наиболее вероятно на набор тестов повлияют следующие изменения:

- `toHaveText` для `$$()` сравнивает элементы по индексу. Ожидаемый массив в порядке, отличном от порядка на странице, не проходит проверку. Используйте порядок страницы, `expect.oneOf()` или `expect.arrayContaining()`.
- Массив ожидаемых значений для одного элемента приводит к падению `toHaveText`, `toHaveHTML`, `toHaveComputedLabel` и `toHaveComputedRole`. Используйте `expect.oneOf()`.
- `setFeatureFlags()` и опция `featureFlags` удалены.
- Удалены следующие устаревшие API: `setOptions` (используйте `setDefaultOptions`), `getConfig` (используйте `getDefaultOptions`), `matchers` (используйте `wdioCustomMatchers`), `toHaveAttr` (используйте `toHaveAttribute`), `toHaveClass` (используйте `toHaveElementClass`), `toBeRequestedWithResponse()` (используйте `toBeRequestedWith({ response })`) и `expect-webdriverio/types` (используйте `expect-webdriverio/expect-global`).
- Хуки `beforeAssertion` и `afterAssertion` получают имя псевдонима, который вызвал тест, для `toBeExisting`, `toBePresent`, `toHaveLink`, `toHaveValue` и `toBeRequested`. В v9 они получали имя матчера, стоящего за псевдонимом, например `toExist` для `toBeExisting`.
- В multi-remote браузере передавайте в `expect` результат `$$()`. Обычный массив, например `[...elements]` или `Array.from(elements)`, не распознаётся как элементы, и утверждение падает.

В multi-remote браузере одно утверждение проверяет все экземпляры, а `expect.multiRemote()` задаёт одно ожидаемое значение для каждого экземпляра. См. [Утверждения в multiremote](/docs/multiremote#assertions).

## Глобальная переменная Multi-remote

Глобальная переменная `multiremotebrowser` в нижнем регистре удалена из `@wdio/globals`, а также из глобальных переменных `eslint-plugin-wdio`. Используйте `multiRemoteBrowser`.

```diff
- import { multiremotebrowser } from '@wdio/globals'
+ import { multiRemoteBrowser } from '@wdio/globals'
```

## Capabilities

`specs` и `exclude` в capabilities больше не читаются. Используйте `wdio:specs` и `wdio:exclude`.

```diff
  capabilities: [{
      browserName: 'chrome',
-     specs: ['./test/specs/chrome/**/*.js'],
-     exclude: ['./test/specs/chrome/skip.js']
+     'wdio:specs': ['./test/specs/chrome/**/*.js'],
+     'wdio:exclude': ['./test/specs/chrome/skip.js']
  }]
```

Ключи конфигурации верхнего уровня остаются `specs` и `exclude`. Оставшийся список без префикса в capability не выбирает файлы для этой capability. В этом случае capability использует `specs` и `exclude` верхнего уровня.

Псевдонимы `tunnelIdentifier` и `parentTunnel` удалены из типов опций Sauce Labs. Используйте `tunnelName` и `tunnelOwner`.

## TypeScript

Типы `Element`, `MultiRemoteBrowser` и `MultiRemoteElement`, экспортируемые `webdriverio`, удалены. Используйте глобальное пространство имён `WebdriverIO`.

```diff
- import type { Element } from 'webdriverio'
- const elem: Element = await $('#foo')
+ const elem: WebdriverIO.Element = await $('#foo')
```

`ChainablePromiseElement` теперь объявляет `then`, а `ChainablePromiseArray` объявляет `then`, `catch` и `finally`. Цепочечные типы описывают значение до `await`. Они больше не подходят для ожидаемого значения:

```ts
let elem: ChainablePromiseElement
elem = await $('h1')
// TS2741: Property 'then' is missing in type 'Element' but required in type 'ChainablePromiseElement'.

let elems: ChainablePromiseArray
elems = await $$('li')
// TS2322: Type 'ElementArray' is not assignable to type 'ChainablePromiseArray'.
```

Типизируйте ожидаемое значение как `WebdriverIO.Element` или `WebdriverIO.ElementArray`:

```diff
- let elem: ChainablePromiseElement = await $('h1')
- let elems: ChainablePromiseArray = await $$('li')
+ let elem: WebdriverIO.Element = await $('h1')
+ let elems: WebdriverIO.ElementArray = await $$('li')
```

Оба цепочечных типа теперь соответствуют `T extends PromiseLike<unknown>`. Условный тип, проверяющий `PromiseLike`, для `$()` и `$$()` выбирает другую ветку, чем в v9. Например, `Awaited<ChainablePromiseElement>` теперь равен `WebdriverIO.Element`, а `Awaited<ChainablePromiseArray>` — `WebdriverIO.ElementArray`.

Свойства неожидаемого `$$()` изменили тип. Они доступны сразу, до разрешения запроса, поэтому читайте их без `await` или `.then()`:

| Свойство | v9 | v10 |
|---|---|---|
| `selector` | `Promise<Selector>` | `Selector \| undefined` |
| `parent` | `Promise<...>` | родитель, а не промис (см. ниже) |
| `foundWith` | нет | команда, которая нашла список, например `$$` или `custom$$` |
| `props` | нет | дополнительные аргументы этой команды |

```diff
- const selector = await $$('li').selector
+ const selector = $$('li').selector
```

В цепочечном запросе, например `$('form').$$('input')`, `parent` является цепочечным `$('form')` до разрешения списка и разрешённым элементом после этого. Дождитесь списка через `await`, прежде чем использовать `parent` как элемент.

Во время выполнения `filter()`, `filterSeries()` и `slice()` для списка `$$()` возвращают список элементов, а не обычный массив. Результат сохраняет `selector`, `foundWith`, `parent` и `props` исходного списка. В v9 `filter()` возвращал обычный массив без этих свойств. Типы пока этого не отражают: `filter()` и `filterSeries()` объявлены как возвращающие `Promise<WebdriverIO.Element[]>`, а `slice()` возвращает `WebdriverIO.Element[]`, поэтому TypeScript сообщает об ошибке, когда вы читаете эти свойства у результата.

WebdriverIO не выполняет запрос повторно для самого производного списка: индекс за его пределами не ожидает дополнительных совпадений, и список никогда не возвращает элемент, исключённый фильтром. Его элементы по-прежнему являются элементами исходного запроса со своими исходными `selector` и `index`. Если элемент становится устаревшим (stale), WebdriverIO снова получает его из исходного запроса по этому индексу, и это может оказаться другой элемент, если страница изменилась. Код, который повторно выполняет запрос списка по его свойствам, например `parent[foundWith](selector, ...props)`, получает полный список, а не отфильтрованный.

Опубликованные пакеты устанавливают `typeScriptVersion` в 6.0.3, что соответствует версии TypeScript, с которой компилируется этот репозиторий.

`browser.mock()` принимает `URLPattern` из `urlpattern-polyfill` и нативный `URLPattern` (глобальный в Node.js 24 и типизированный библиотекой `dom` в TypeScript 6).

TypeScript 6 объявляет устаревшими `"moduleResolution": "node"` и `"baseUrl"` и делает `strict` значением по умолчанию. `create-wdio` теперь генерирует `"moduleResolution": "bundler"` для ESM-проектов и `"NodeNext"` для CommonJS-проектов. Если вы обновляете TypeScript в существующем проекте, измените эти опции в своём `tsconfig.json`.

Для ESM-проекта:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "moduleResolution": "node",
+        "moduleResolution": "bundler",
         "module": "ESNext"
     }
 }
```

Для CommonJS-проекта используйте `NodeNext` для обеих опций, как это делает `create-wdio`:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "moduleResolution": "node",
-        "module": "CommonJS"
+        "moduleResolution": "NodeNext",
+        "module": "NodeNext"
     }
 }
```

TypeScript 6 также меняет значение `types` по умолчанию на `[]`, поэтому он больше не загружает все установленные пакеты `@types/*`. Если в вашем `tsconfig.json` нет списка `types`, глобальные переменные, такие как `describe` и `it` из Mocha, падают с ошибкой `Cannot find name`. Перечислите пакеты типов, которые используют ваши тесты, как это делает `create-wdio`. Например, для Mocha:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
+        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
     }
 }
```

`npm create wdio@latest` записывает `compilerOptions.target` и `compilerOptions.lib` как `es2024`. Для проверки типов этого файла нужен TypeScript 5.7 или новее. `tsx`, который запускает конфигурацию и тесты, не выполняет проверку типов, поэтому более старый компилятор имеет значение только тогда, когда вы сами запускаете `tsc`.

Существующий `tsconfig.json` не перезаписывается. Сгенерированная конфигурация, которая расширяет другую конфигурацию, сохраняет `target` и `lib` родительской.

В хуке `afterAssertion` тип `params.result` теперь `{ pass, message }`, как его передают матчеры. В v9 тип был `{ result, message }`, но `params.result.result` во время выполнения всегда был `undefined`. Читайте `params.result.pass`:

```diff
  afterAssertion (params) {
-     console.log(params.matcherName, params.result.result)
+     console.log(params.matcherName, params.result.pass)
  }
```

`pass` равен `true`, когда значение соответствует ожидаемому, в том числе с `.not`. Таким образом, с `.not` утверждение проходит, когда `pass` равен `false`. Хук не сообщает, использовал ли тест `.not`.

## Репортеры

Браузерное событие `result` передаётся репортерам как `client:afterCommand`. Эти данные и тип `AfterCommandArgs` больше не имеют свойства `name`. Читайте вместо него `command`. Пользовательские команды уже отправляли `command`.

```diff
  onAfterCommand(args) {
-     console.log(args.name)
+     console.log(args.command)
  }
```

### Allure

`addEnvironment(name, value)` в `@wdio/allure-reporter` удалён. Он ни на что не влиял. Задавайте строки окружения через [`reportedEnvironmentVars`](/docs/allure-reporter) в опциях репортера Allure.

## `$` строгий

`$` теперь представляет __ровно один__ элемент. Если селектор находит более одного элемента, команда выбрасывает `StrictSelectorError` вместо того, чтобы молча использовать первое совпадение:

```js
// v9 — кликает по первой кнопке, даже если их 12
await $('button').click()

// v10
await $('button').click()
// StrictSelectorError: strict mode violation: `$("button")` resolved to 12 elements, expected 1.
// Use `$$("button")` to work with all matches, `$$("button")[0]` if you explicitly want the first one,
// or narrow down the selector so it matches a single element.
```

Это соответствует [локаторам Playwright](https://playwright.dev/docs/locators#strictness). Cypress ведёт себя иначе: его запросы могут находить несколько элементов, а команды действий, такие как [`.click()`](https://docs.cypress.io/api/commands/click#Click-all-elements-with-id-starting-with-btn), по умолчанию отклоняют субъект из нескольких элементов. Селектор, который незаметно находит несколько элементов, почти всегда является скрытой ошибкой: сегодня тест проходит, а как только кто-то добавит на страницу вторую кнопку, он начнёт взаимодействовать не с тем элементом.

Правило применяется к каждому шагу цепочки (`$('form').$('input')`) и к каждому типу селектора, который принимает `$`, — строковым селекторам (включая проникающие в shadow DOM), JS-функциям, мобильным селекторам и ссылкам на пользовательские стратегии.

### Что не изменилось

- `$$` по-прежнему возвращает ноль или несколько элементов. Начиная с v10 этот список является [`ElementArray`](/docs/api/browser/$$): настоящим массивом, который можно ожидать через `await`, с `for await` и асинхронными `map` / `filter`, доступными до его разрешения. `await $$('button').length` — это количество. `$$('button').length > 0` — нет, потому что `length` является промисом до разрешения списка. `for (const el of $$('button'))` выбрасывает исключение, пока вы не дождались списка; используйте `for await` или `for...of` после `await`.
- Специальные вспомогательные команды `custom$`, `shadow$` и `react$` не являются строгими — они по-прежнему возвращают первое совпадение, как и их аналоги `$$`.
- Селектор, который ничего не находит, по-прежнему возвращает лениво разрешаемый элемент, поэтому `waitForExist` и [автоожидание](/docs/autowait) работают как раньше.
- Передача ссылки на элемент, например `$(await browser.getActiveElement())`, всегда указывает на один узел и никогда не проверяется.

### Как проверить ваш набор тестов

Codemod для этого нет: только вы можете определить, является ли второе совпадение ошибкой или намеренным. Два практичных подхода:

1. __Запустите набор тестов.__ Каждое нарушение выбрасывает исключение с селектором и количеством совпадений, чего обычно достаточно, чтобы сразу его исправить.
2. __Заранее проверьте широкие селекторы.__ Для каждого общего `$(...)` в ваших page objects выведите, сколько элементов он на самом деле находит:

   ```js
   console.log(await $$('button').length) // 12 → `$('button')` слишком широкий
   ```

Затем либо сузьте селектор — в идеале до запроса, ориентированного на пользователя, например `$('button=Submit')` или `$('aria/Submit')`, см. [Селекторы](/docs/selectors), — либо явно укажите, что вам нужно первое совпадение:

```js
await $('button[type="submit"]').click()
// ...или, если вам действительно нужна первая
await $$('button')[0].click()
```

### Отключение

Для одного запроса:

```js
await $('button', { strict: false }).click()
```

Для всего проекта, восстанавливая поведение v9:

```js title="wdio.conf.js"
export const config = {
    // ...
    strictSelectors: false
}
```

Элемент запоминает, как он был запрошен, поэтому его повторное получение — после устаревшей ссылки на элемент или через `waitForExist` — сохраняет строгость исходного вызова.

:::info

Внутри строгий `$` отправляет запрос `findElements` вместо `findElement`, поскольку подсчёт совпадений — единственный способ соблюсти правило. В обоих случаях это один запрос туда и обратно, но это заметно для пользовательских сервисов и моков WebDriver, которые ориентируются на команду `findElement`.

:::

## Устаревшие сигнатуры команд

v9 ещё принимала старые позиционные формы и выводила предупреждение. v10 принимает только объект опций.

[Codemod](https://github.com/webdriverio/codemod) для v10 переписывает `addCommand` и `overwriteCommand`, когда третий аргумент — логическое значение, `getHTML(true)` и `getHTML(false)`, а также `getCookies`, когда фильтр — строка или массив из одного элемента. Вызов `getCookies` с более чем одним именем остаётся без изменений, потому что один фильтр соответствует одному имени.

Сначала установите codemod. WebdriverIO не зависит от него.

```sh
npm install jscodeshift @wdio/codemod
npx jscodeshift -t ./node_modules/@wdio/codemod/v10 ./e2e/
```

Используйте `--parser=tsx` для файлов TypeScript.

### `addCommand` и `overwriteCommand`

```diff
- browser.addCommand('myFn', fn, true)
+ browser.addCommand('myFn', fn, { attachToElement: true })

- browser.overwriteCommand('click', fn, true)
+ browser.overwriteCommand('click', fn, { attachToElement: true })
```

Логическое значение в качестве третьего аргумента — ошибка TypeScript. Во время выполнения оно вызывает исключение:

```
Passing a boolean as the third argument to `addCommand` was removed in WebdriverIO v10. Use `addCommand(name, fn, { attachToElement: true })`.
```

`proto` и `instances` указываются в том же объекте опций. Опустите третий аргумент, чтобы прикрепить команду к браузеру.

### `getCookies`

Фильтры в виде строки и массива строк отклоняются. Передайте [объект фильтра cookie](https://w3c.github.io/webdriver-bidi/#type-storage-CookieFilter). Один вызов фильтрует одно имя; для другого имени вызовите команду ещё раз.

```diff
- await browser.getCookies('session')
- await browser.getCookies(['session', 'auth'])
+ await browser.getCookies({ name: 'session' })
+ await browser.getCookies({ name: 'auth' })
```

`getCookies()` без аргументов по-прежнему возвращает все cookie, видимые странице.

### `getHTML`

```diff
- await $('h1').getHTML(false)
+ await $('h1').getHTML({ includeSelectorTag: false })
```

`getHTML()` без аргументов по-прежнему включает собственный тег элемента.

### `newWindow`

`windowName` и `windowFeatures` удалены. Они применялись только к WebDriver Classic. Команда по-прежнему принимает `type`:

```diff
- await browser.newWindow('https://webdriver.io', {
-     windowName: 'WebdriverIO window',
-     windowFeatures: 'width=420,height=230,resizable,scrollbars=yes,status=1',
- })
+ await browser.newWindow('https://webdriver.io', { type: 'window' })
```

Используйте `type: 'tab'`, чтобы открыть вкладку.

### `startActivity`

Принимается только объект опций. `appWaitPackage`, `appWaitActivity` и `optionalIntentArguments` удалены. Они применялись только к удалённой HTTP-конечной точке Appium. `mobile: startActivity` их не принимает, и их передача вызывает исключение.

```diff
- await browser.startActivity('com.example.app', '.MainActivity')
- await browser.startActivity({
-     appPackage: 'com.example.app',
-     appActivity: '.MainActivity',
-     appWaitPackage: 'com.example.app',
-     appWaitActivity: '.MainActivity',
-     optionalIntentArguments: '--ez extra true',
- })
+ await browser.startActivity({
+     appPackage: 'com.example.app',
+     appActivity: '.MainActivity',
+ })
```

## Удалённые команды

`browser.throttle` и устаревшие команды `touchAction` удалены.

| v9 | v10 |
| --- | --- |
| `browser.throttle('Regular3G')` | [`browser.throttleNetwork('Regular3G')`](/docs/api/browser/throttleNetwork) |
| `browser.touchAction(...)` / `element.touchAction(...)` | [Actions API](/docs/api/browser/action) с сенсорным указателем или мобильные команды [`tap`](/docs/api/mobile/tap) и [`swipe`](/docs/api/mobile/swipe) |

Сенсорный жест с помощью Actions API:

```js
await browser.action('pointer', { parameters: { pointerType: 'touch' } })
    .move({ x: 100, y: 500 })
    .down()
    .move({ x: 100, y: 100, duration: 300 })
    .up()
    .perform()
```

## `uploadFile`

`browser.uploadFile()` удалён. Он архивировал локальный файл и отправлял его на конечную точку Selenium `file`, которая не является частью WebDriver или WebDriver BiDi. Задавайте значение поля ввода файла через [`element.setFiles()`](/docs/api/element/setFiles).

```diff
- const remotePath = await browser.uploadFile('/path/to/file.png')
- await $('#file-upload').setValue(remotePath)
+ await $('#file-upload').setFiles('/path/to/file.png')
+ await $('#file-upload').setFiles(['/path/to/a.png', '/path/to/b.png'])
```

`setFiles` требует сессии BiDi. Пути открываются браузером. Относительный путь разрешается относительно `process.cwd()`. Размещение файлов в Selenium Grid не входит в v10. Набор тестов, который полагался на `uploadFile` для передачи данных на узел, должен поместить файл туда, где браузер может его прочитать, а затем вызвать `setFiles`.

В классической локальной сессии `element.setValue('/local/path')` по-прежнему вводит путь, который локальный браузер уже видит. Необработанная конечная точка Selenium остаётся доступной как `browser.file()` для пользователей Grid, которые вызывают её напрямую.

## `executeAsync`

`browser.executeAsync` и `element.executeAsync` удалены. Передайте `async`-функцию в [`execute`](/docs/api/browser/execute). Возвращаемое значение функции, включая возвращаемый промис, является результатом команды. Тайм-аут `script` по-прежнему применяется.

```ts
const result = await browser.execute(async (a, b) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return a + b
}, 1, 2)
```

Уберите колбэк WebDriver `done`. Строковый скрипт, который ожидал этот колбэк в качестве последнего аргумента, должен вместо этого возвращать промис. Во время выполнения `executeAsync` не является функцией.

## `switchToFrame`

`browser.switchToFrame` больше не является публичной командой.

В сессии WebDriver BiDi `switchFrame` и `switchWindow` выбрасывают исключение. Вкладка, окно и фрейм — это `WebdriverIO.BrowsingContext`, который вы держите. `browser.url()` выполняет навигацию в исходном контексте верхнего уровня сессии и возвращает его. `browser.newWindow()` возвращает новый контекст и не переключается на него. `context.frame()` возвращает дочерний фрейм. `context.parent` — это фрейм, из которого вы его открыли.

```ts
const page = await browser.url('https://example.com')
const other = await browser.newWindow('https://webdriver.io', { type: 'tab' })
console.log(await page.getTitle())
const frame = await page.frame('iframe')
console.log(await frame.$('h1').getText())
const pages = await browser.browsingContexts()
```

`context.url` — это строка URL документа. Выполняйте навигацию в удерживаемом контексте через `context.navigate(url)`. Метаданные загрузки из `browser.url()` доступны как `context.request`.

В сессии Classic продолжайте вызывать `switchFrame` с элементом или с `null` для фрейма верхнего уровня. Строка или функция там отклоняются.

```diff
- await browser.switchToFrame(await $('iframe'))
- await browser.switchToFrame(null)
+ await browser.switchFrame($('iframe'))
+ await browser.switchFrame(null)
```

## `setTimeout`

Ключ JSON Wire Protocol `page load` отклоняется. Используйте `pageLoad`.

```diff
- await browser.setTimeout({ 'page load': 10000 })
+ await browser.setTimeout({ pageLoad: 10000 })
```

`implicit` и `script` не изменились.

## Доступ к экземплярам multi-remote

Multi-remote браузер больше не хранит каждую сессию как отдельное свойство. То же самое относится к multi-remote элементу. Для обращения к одной сессии используются `getInstance` и `select`.

```diff
- await browser.myChromeBrowser.url('https://webdriver.io')
- await (await browser.$('button')).myChromeBrowser.click()
+ await browser.getInstance('myChromeBrowser').url('https://webdriver.io')
+ await (await browser.$('button')).getInstance('myChromeBrowser').click()
```

Расширение TypeScript, которое добавляет `myChromeBrowser: WebdriverIO.Browser` в `WebdriverIO.MultiRemoteBrowser`, больше не соответствует свойству во время выполнения. Удалите это расширение и вызывайте `getInstance`.

При использовании testrunner с включённым `injectGlobals` имя экземпляра по-прежнему является глобальной переменной (`myChromeBrowser.url(...)`). Эта глобальная переменная — отдельная сессия. Это не `browser.myChromeBrowser`.

Результаты команд остаются в порядке capabilities: первая запись принадлежит первому ключу в объекте capabilities.

`browser.$$()` в multi-remote браузере возвращает `WebdriverIO.MultiRemoteElementArray`, а не обычный `MultiRemoteElement[]`. Это по-прежнему массив, поэтому чтение по индексу, например `elements[0]`, продолжает работать.

Его методы `map`, `filter`, `forEach`, `find`, `findIndex`, `some`, `every` и `reduce` асинхронны, как у `WebdriverIO.ElementArray`, и возвращают промис, в том числе после `await`. То же самое относится к спискам, которые возвращают `custom$$()`, `react$$()` и `shadow$$()`. В v9 это были синхронные методы обычного массива:

```diff
  const items = await browser.$$('li')
- const ids = items.map((item) => item.selector)
+ const ids = await items.map((item) => item.selector)
```

`custom$()`, `react$()` и, для элемента, `shadow$()`, `nextElement()`, `previousElement()` и `parentElement()` возвращают один `WebdriverIO.MultiRemoteElement`, как и `$()`. В v9 они возвращали по одному элементу на экземпляр в обычном массиве. Получайте элемент одного браузера через `getInstance`:

```diff
- const [chromeHost, firefoxHost] = await browser.custom$('byTestId', 'host')
- await chromeHost.click()
+ const host = await browser.custom$('byTestId', 'host')
+ await host.getInstance('myChromeBrowser').click()
```

`custom$$()`, `react$$()` и, для элемента, `shadow$$()` возвращают один `WebdriverIO.MultiRemoteElementArray`, как и `$$()`. В v9 они возвращали по одному списку на экземпляр в обычном массиве. Каждая запись обращается ко всем экземплярам. У экземпляра, который находит меньше элементов, нет элемента по этому индексу:

```diff
- const [chromeItems, firefoxItems] = await browser.custom$$('byTestId', 'item')
- await chromeItems[0].click()
+ const items = await browser.custom$$('byTestId', 'item')
+ await items[0].getInstance('myChromeBrowser').click()
```

`WebdriverIO.MultiRemoteElement['selector']` имеет тип `Selector`, как и `WebdriverIO.Element['selector']`. В v9 он имел тип `string`, но значение также могло быть функцией или ссылкой на пользовательскую стратегию. Код TypeScript, который использует его как строку, например `element.selector.includes('…')`, должен сначала проверить тип.

`WDIO_ENABLE_MULTI_REMOTE_SELECT` и `WDIO_ENABLE_MULTI_REMOTE_ELEMENT_ARRAY` удалены. `select()` доступен всегда, а `$$()` всегда возвращает описанный выше массив элементов. Удалите обе переменные.

## Бинарные ответы моков

`mock.respond()` и `mock.respondOnce()` принимают данные `Uint8Array` и `ArrayBuffer`, включая полифил `Buffer` в компонентных тестах без глобального `Buffer`.

`mock.getBinaryResponse()` теперь типизирован как `Uint8Array | null`. В Node.js он по-прежнему возвращает `Buffer`, а в браузере — `Uint8Array`. Чтобы использовать специфичные для Buffer методы в Node.js, сначала преобразуйте ненулевой результат:

```diff
- const base64 = mock.getBinaryResponse(requestId)?.toString('base64')
+ const bytes = mock.getBinaryResponse(requestId)
+ const base64 = bytes === null ? undefined : Buffer.from(bytes).toString('base64')
```

## Сетевые моки в multi-remote

`browser.mock()` в multi-remote браузере возвращает `WebdriverIO.MultiRemoteMock`, а не массив моков. `respond`, `restore` и другие методы мока выполняются на всех экземплярах. Читайте перехваченные запросы из мока для одного браузера. Используйте тип `WebdriverIO.MultiRemoteMock` из глобального пространства имён `WebdriverIO`.

```diff
- const [chromeMock, firefoxMock] = await browser.mock('*/api')
- expect(chromeMock.calls).toHaveLength(1)
+ const mock = await browser.mock('*/api')
+ mock.respond({ ok: true })
+ expect(mock.getInstance('myChromeBrowser').calls).toHaveLength(1)
+ expect(mock.instances).toEqual(['myChromeBrowser', 'myFirefoxBrowser'])
```

`getInstance` выбрасывает `Multi-remote object has no instance named "<name>"`, если имени нет среди `instances`. Мок из `browser.select('myFirefoxBrowser', 'myChromeBrowser')` перечисляет эти экземпляры в указанном порядке, который может отличаться от `browser.instances`. Не предполагайте, что `mocks[0]` — определённый браузер.

## Ответы моков, минующие бэкенд

`mock.respond(..., { fetchResponse: false })` не обращается к бэкенду. В v9 мок, который дополнительно фильтровал по `statusCode` или `responseHeaders`, игнорировал этот фильтр и всё равно отвечал на каждый подходящий запрос. В v10 `respond()` и `respondOnce()` выбрасывают исключение, потому что эти фильтры можно проверить только по ответу бэкенда.

```diff
- const mock = await browser.mock('**/users', { statusCode: 200 })
- mock.respond({ name: 'Ada' }, { fetchResponse: false })
+ const mock = await browser.mock('**/users')
+ mock.respond({ name: 'Ada' }, { fetchResponse: false })
```

Чтобы сохранить фильтр, опустите `fetchResponse`, чтобы мок получил ответ, проверил статус или заголовки, а затем заменил тело.

## Ссылки на элементы

Идентификаторы элементов используют ключ W3C WebDriver `element-6066-11e4-a52e-4f735466cecf` и свойство `elementId`. Поле JSON Wire Protocol `ELEMENT` больше не является частью контракта элемента.

`WebdriverIO.Element` больше не объявляет `ELEMENT`. Читайте `element.elementId`, который экземпляры элементов уже предоставляют.

`browser.execute` и встроенные скрипты, которые передают элемент на страницу (`getHTML`, `isClickable`, `isDisplayed`, `scrollIntoView` и остальные), передают только ссылку W3C:

```diff
- await browser.execute((el) => el.ELEMENT, elem)
+ await browser.execute(
+     (el) => el['element-6066-11e4-a52e-4f735466cecf'],
+     elem
+ )
```

Тело ответа поиска элемента, содержащее только `{ ELEMENT: '...' }`, не является элементом. Включите ключ W3C. Если присутствуют оба ключа, WebdriverIO использует идентификатор W3C.

Jasmine выводит результат цепочечного `$()` через `toJSON`. Это значение — та же ссылка W3C, `{ 'element-6066-11e4-a52e-4f735466cecf': elementId }`.

В WebDriver BiDi скрипт, который возвращает `NodeList` (например, из `querySelectorAll`) или `HTMLCollection` (например, `element.children`), теперь даёт список ссылок на элементы, как и WebDriver Classic. В v9 он давал необработанные значения BiDi, поэтому `browser.execute` возвращал объекты, не являющиеся элементами, а стратегия `custom$` или `custom$$`, возвращавшая `querySelectorAll(...)`, не находила ни одного элемента. Обходной путь вроде `Array.from(document.querySelectorAll(...))` по-прежнему работает, и его можно удалить:

```diff
  browser.addLocatorStrategy('byCss', (selector) =>
-     Array.from(document.querySelectorAll(selector))
+     document.querySelectorAll(selector)
  )
```

## Селекторы React

`react$` и `react$$` теперь работают с React от 16 до 19 для приложения, которое запускается через `createRoot` или `ReactDOM.render`. Раньше `browser.react$` и `browser.react$$` падали с React 18 и новее (`Could not find the root element of your application`), а в любой версии результат мог относиться к рендеру до последнего обновления, поэтому компонент, добавленный изменением состояния, не находился.

На странице, где React ещё не отрендерил корень, команды теперь ждут его до 5 секунд, прежде чем завершиться ошибкой. Раньше они падали сразу, поэтому приложение, запустившееся с задержкой, не находилось.

Команды больше не используют библиотеку [resq](https://github.com/baruchvlz/resq), и WebdriverIO больше её не устанавливает. Правила селекторов не меняются (см. [Селекторы React](/docs/selectors#react-selectors)), за следующими исключениями:

- `react$` с `props` и `state` одновременно находит компонент, который соответствует обоим. Раньше он игнорировал `props`, если также был указан `state`.
- `react$$` возвращает каждый DOM-узел один раз. Раньше компонент высшего порядка и его потомок в некоторых браузерах давали один и тот же элемент дважды.
- Фрагмент, содержащий фрагмент, даёт один плоский список узлов. Раньше `react$` мог вернуть список.
- Фильтр со значением `null` работает. Раньше он падал с ошибкой `Cannot convert undefined or null to object`.
- Без области видимости элемента команды ищут во всех корнях React на странице в порядке документа, включая корни внутри других корней и корни в открытых shadow root. `react$` возвращает первое совпадение. Раньше они искали только в первом корне, даже если React ещё не отрендерил его или уже размонтировал, и не искали в shadow root. На странице с несколькими корнями `react$$` теперь может вернуть больше элементов: чтобы искать только в одном корне, вызовите команду на его контейнере, например `$('#root').react$$('MyComponent')`.
- На контейнере корня, находящегося внутри другого корня, команды ищут во внутреннем корне. Раньше они искали во внешнем.
- На контексте просмотра фрейма и на элементе фрейма команды работают. Раньше команда контекста падала с `this.executeScript is not a function`, а команда элемента — с `Could not find instance of React in given element`.

Внутренний скрипт `webdriverio/scripts/resq` удалён.

## Компонентное тестирование

`@wdio/browser-runner` реэкспортирует `fn`, `spyOn` и типы моков из `@vitest/spy` 5 (ранее 3). Мок, который ваш код вызывает через `new`, требует реализации в виде `function` или `class`. Стрелочная функция выбрасывает `is not a constructor`, а `mockReturnValue` выбрасывает исключение, когда мок вызывается через `new`.

```diff
- const Client = fn(() => ({ close: fn() }))
+ const Client = fn(function () { return { close: fn() } })
```

Другие изменения шпионов описаны в [руководстве по миграции Vitest](https://vitest.dev/guide/migration).

## Puppeteer

`webdriverio` принимает `puppeteer-core` `>=24 <26`, включая Puppeteer 25. `getPuppeteer()` и `@wdio/lighthouse-service` тестируются на этой линейке.

## ESLint

`eslint-plugin-wdio` требует ESLint 10. ESLint 9 достиг [конца срока поддержки](https://eslint.org/version-support/) 2026-08-06 и больше не поддерживается. С TypeScript используйте `typescript-eslint` 8.56.0 или новее.

```sh
npm install --save-dev eslint@10 eslint-plugin-wdio
```

`eslint-plugin-wdio` экспортирует только flat-конфигурацию `flat/recommended`. Имя eslintrc `plugin:wdio/recommended` удалено.

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    wdioConfig['flat/recommended'],
]
```

Рекомендуемая конфигурация переключается на правило `wdio/no-floating-promise` с учётом типов вместо `wdio/await-expect`, когда установлен пакет `typescript-eslint`. Установки только `@typescript-eslint/eslint-plugin` недостаточно.

```sh
npm install --save-dev typescript typescript-eslint
```

В этом режиме конфигурация разбирает каждый подходящий файл с помощью сервиса проекта TypeScript. Ограничьте её файлами TypeScript и убедитесь, что они входят в `tsconfig.json`:

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    { files: ['**/*.{ts,mts,cts,tsx}'], ...wdioConfig['flat/recommended'] },
]
```

Подходящий файл JavaScript, который не входит в проект TypeScript, например `wdio.conf.js`, падает с ошибкой "was not found by the project service". Чтобы проверять линтером и файлы JavaScript, установите `"allowJs": true`, добавьте их в `include` в `tsconfig.json` и расширьте шаблон до `**/*.{js,mjs,cjs,ts,mts,cts,tsx}`.

## Пользовательские фреймворки

`setupExpect` в адаптере пользовательского фреймворка больше не принимает `Map` матчеров, а раннер больше не добавляет метод `entries` в объект матчеров. Перебирайте их через `Object.entries(wdioMatchers)`.

## Профиль Firefox

`@wdio/firefox-profile-service` больше не рассматривает `legacy` как опцию сервиса. Этот флаг применялся только к Firefox 55 и более старым версиям. Удалите его. Оставшийся `legacy: true` записывается в профиль как настройка с именем `legacy`.

## Протокол WebDriver

Каждая сессия является сессией [W3C WebDriver](https://w3c.github.io/webdriver/). WebdriverIO не поддерживает JSON Wire Protocol и Mobile JSON Wire Protocol. В v9 эти команды были удалены. В v10 также убрана обёртка ответа, которую использовали эти протоколы, поэтому сервер, который всё ещё её возвращает, не может запустить сессию.

`browser.isW3C` удалён, включая значение, которое ранее передавалось в сообщении воркера `sessionStarted`. Передача `isW3C` в `attach` игнорируется. Набор команд BiDi остаётся на клиенте. Активное соединение BiDi по-прежнему зависит от `webSocketUrl`.

### `browser.back()` и `browser.forward()` в BiDi

Места вызова остаются `await browser.back()` и `await browser.forward()`. Ни одна из команд не принимает аргументов и не возвращает значения.

В сессии BiDi эти команды вызывают `browsingContext.traverseHistory` с `delta` `-1` или `1` в контексте просмотра верхнего уровня, а затем ждут готовности документа, соответствующей `pageLoadStrategy`. `none` возвращает управление, когда команда перехода принята. `eager` ждёт `browsingContext.domContentLoaded`. `normal`, значение по умолчанию, ждёт `browsingContext.load`. Восстановление из кэша back-forward не генерирует эти события; команда возвращает управление, когда `readyState` зафиксированного документа уже соответствует стратегии. Ожидание использует тайм-аут загрузки страницы сессии (`timeouts.pageLoad`, 300000 мс, если не задан). Сессии Classic по-прежнему отправляют запросы на `POST /session/:sessionId/back` и `POST /session/:sessionId/forward`.

Отсутствующая запись истории по-прежнему приводит к отклонению. В BiDi сообщение исходит от `browsingContext.traverseHistory` и содержит `no such history entry`, а не текст классической ошибки WebDriver. Переход, который так и не достигает ожидаемой готовности, отклоняется с `History traversal timed out after <ms>ms waiting for browsingContext.domContentLoaded` или `browsingContext.load`.

### Ответ на создание сессии

Create Session должен возвращать тело в формате W3C. WebdriverIO читает `value.sessionId` и `value.capabilities`:

```json
{
  "value": {
    "sessionId": "8e8a5c2e",
    "capabilities": {
      "browserName": "chrome",
      "browserVersion": "131.0.6778.85"
    }
  }
}
```

Тело в формате JSON Wire Protocol отклоняется. В таком теле `sessionId` и `status` находятся рядом с `value`, а capabilities помещаются в сам `value`:

```json
{
  "sessionId": "8e8a5c2e",
  "status": 0,
  "value": {
    "browserName": "chrome",
    "version": "131.0"
  }
}
```

Тогда создание сессии выбрасывает `WebDriver new session response is missing a session id or capabilities. WebdriverIO requires a W3C WebDriver server.` Та же ошибка возникает, если отсутствует `value.capabilities`, даже если `value.sessionId` присутствует.

Плоский объект capabilities в вашей конфигурации по-прежнему допустим. WebdriverIO оборачивает `{ browserName: 'chrome' }` в `alwaysMatch` перед отправкой запроса. Ключи с префиксом вендора, смешанные с ключами вне набора capabilities W3C, по-прежнему отклоняются. Помещайте настройки вендора в `sauce:options`, `bstack:options`, `appium:options` или другой ключ с префиксом.

### Ответы на команды

Результат команды — `{ "value": … }`. HTTP 200 без `error` в `value` означает успех. Отсутствующий элемент — это HTTP 404 с `value.error`, равным `"no such element"`, что по-прежнему позволяет ленивый поиск элемента. Числовой `status` в теле игнорируется, включая `status: 0` и старый код `status: 7` ("no such element"). Вместо этого отправляйте объект ошибки W3C.

Экспортируемый тип ошибки `JSONWPCommandError` теперь называется `SessionRequestError`.

### Серверы

Драйверы, с которыми работает WebdriverIO, уже используют W3C в клиентском соединении:

- ChromeDriver использует W3C по умолчанию начиная с Chrome 75. Edge на базе Chromium ведёт себя так же. Текущий ChromeDriver всё ещё принимает `goog:chromeOptions.w3c: false`, что переключает эту сессию обратно на устаревший протокол. WebdriverIO не поддерживает это переключение.
- geckodriver и safaridriver от Apple поддерживают только W3C. Ответ Safari без `platformName` или `browserVersion` всё равно является W3C.
- Selenium 4 и Grid 4 используют W3C. Grid перестал транслировать JSON Wire Protocol в версии 4.9.
- Appium 2 отказался от JSON Wire Protocol и Mobile JSON Wire Protocol. Appium 3 также убрал оставшиеся формы параметров. v10 требует Appium 3, см. ниже. Мобильная сессия без `setWindowRect` всё равно является W3C; эта capability означает, что устройство не может изменять размер окна.

Следующие серверы всё ещё используют JSON Wire Protocol и не поддерживаются: Selenium 3, PhantomJS, EdgeHTML (`--jwp`) и WinAppDriver при прямом подключении. Драйвер Appium Windows остаётся поддерживаемым как клиент W3C. Он транслирует команды в WinAppDriver, включая Get Element Property в конечную точку атрибута. Направляйте WebdriverIO на Appium, а не на порт WinAppDriver.

[`@wdio/jsonwp-service`](https://www.npmjs.com/package/@wdio/jsonwp-service) не позволяет этим серверам работать с v10. Запуск сессии по-прежнему требует описанного выше тела W3C, а результаты команд по-прежнему игнорируют числовой `status`. Оставайтесь на WebdriverIO 9, если такой сервер всё ещё необходим.

`webdriver.remote.sessionid` больше не помечает сессию Selenium standalone. Selenium Grid 4 по-прежнему определяется по `se:cdp`.

Ключ тайм-аута `page load` описан в разделе [`setTimeout`](#settimeout). Идентификаторы элементов описаны в разделе [Ссылки на элементы](#element-references). На десктопе `[name="..."]` является CSS-селектором. Стратегия локатора `name` остаётся для мобильных сессий.

## Appium

WebdriverIO 10 требует **Appium 3** и актуальных официальных драйверов (UiAutomator2, XCUITest, Espresso, Windows, Mac2 и т. д.). Appium 1.x и 2.x не поддерживаются. Оставайтесь на WebdriverIO 9, если не можете обновить сервер.

```sh
npm i -D appium@^3
appium driver update installed
```

`@wdio/appium-service` объявляет необязательную peer-зависимость `appium` версии `>=3` и отказывается запускать более старый сервер. `create-wdio` устанавливает `appium@^3`, если Appium отсутствует или его версия старше 3.

Облачным провайдерам, которые всё ещё предоставляют Appium 2, нужен образ с Appium 3, иначе вам придётся остаться на WebdriverIO 9.

### Мобильные команды больше не откатываются на HTTP

В v9 многие мобильные помощники пробовали `browser.execute('mobile: …')` и при ошибке неизвестного метода откатывались на удалённую HTTP-конечную точку Appium. В v10 этот откат удалён: та же ошибка сообщает, что нужно обновиться до Appium 3. Предпочитайте мобильные команды WebdriverIO (`browser.lock()`, `browser.shake()`, …) или непосредственно `browser.execute('mobile: …')`.

### Удалённые команды протокола

Appium 3 [удалил многие устаревшие конечные точки базового драйвера](https://appium.io/docs/en/latest/guides/migrating-2-to-3/). WebdriverIO больше не предоставляет клиентские методы для большинства этих маршрутов (например, `appiumLock`, `touchPerform` и карту Mobile JSON Wire Protocol). Вместо них используйте W3C Actions, соответствующую мобильную команду или метод драйвера `mobile:` через execute.

### Область действия `--allow-insecure` в Appium

Appium 3 требует префикса драйвера или области `*` для функций `--allow-insecure`, например `uiautomator2:adb_shell` или `*:adb_shell`.

### Capabilities Appium без префикса больше не выбирают сессию Appium

`automationName`, `deviceName` и `appiumVersion` без префикса `appium:` больше не указывают WebdriverIO пропустить браузерный драйвер и подключить сервис Appium. Используйте capability с префиксом или вложите её в `appium:options`:

```diff
- capabilities: { platformName: 'Android', automationName: 'UiAutomator2', deviceName: 'emulator' }
+ capabilities: {
+     platformName: 'Android',
+     'appium:automationName': 'UiAutomator2',
+     'appium:deviceName': 'emulator'
+ }
```

`wdio repl` теперь выводит эти ключи с префиксом, включая `appium:app`, `appium:platformVersion` и `appium:udid`.

### `getValue` на мобильных устройствах читает свойство элемента

`element.getValue()` вызывает Get Element Property во всех сессиях, включая Appium 3. В мобильной сессии ранее вызывался Get Element Attribute.

### Сигнатура `stopRecordingScreen` приведена в соответствие с `startRecordingScreen`

`driver.stopRecordingScreen` теперь принимает только один аргумент `options` вместо прежних 4 аргументов, в соответствии с `driver.startRecordingScreen`. Перенесите отдельные аргументы в объект:

```diff
- driver.stopRecordingScreen('webdriver.io', undefined, undefined, 'POST')
+ driver.stopRecordingScreen({ remotePath: 'webdriver.io', method: 'POST' })
```

## Именование multi-remote

API, написанные как `multiremote` или `Multiremote`, теперь записываются в camelCase / PascalCase как `multiRemote` / `MultiRemote`. Для старых имён нет псевдонимов.

| v9 | v10 |
|----|-----|
| `multiremote()` (`webdriverio`) | `multiRemote()` |
| `WebdriverIO.MultiremoteConfig` | `WebdriverIO.MultiRemoteConfig` |
| `isMultiremote` у браузера, результатов `$` и `$$` | `isMultiRemote` |
| `Capabilities.RequestedMultiremoteCapabilities` | `Capabilities.RequestedMultiRemoteCapabilities` |
| `Capabilities.WithRequestedMultiremoteCapabilities` | `Capabilities.WithRequestedMultiRemoteCapabilities` |
| `runner.isMultiremote` (репортеры) | `runner.isMultiRemote` |
| `Launcher#isMultiremote`, `Launcher#isParallelMultiremote` (`@wdio/cli`) | `isMultiRemote`, `isParallelMultiRemote` |
| `isMultiremote` в `Workers.WorkerMessage`, `WorkerInstance` (`@wdio/local-runner`) и `SpecReporter#getTestLink()` | `isMultiRemote` |
| `browser.multiremoteFetch()` (`@wdio/webdriver-mock-service`) | `browser.multiRemoteFetch()` |

Найдите `multiremote` и `Multiremote` (с учётом регистра) и замените каждое совпадение. Отчёты Allure также помечают multi-remote тесты как `isMultiRemote` вместо `isMultiremote`.

## Виртуальные дисплеи в Linux

`@wdio/xvfb` заменён на `@wdio/display-server`. Вместо того чтобы оборачивать каждый воркер в `xvfb-run`, testrunner запускает один сервер дисплея на весь прогон, до хука `onPrepare` любого сервиса. Он предпочитает Weston в headless-режиме и откатывается на Xvfb. Подробности см. в разделе [Headless-режим и серверы дисплея](/docs/headless-and-display-servers).

Опции переименованы. Старые имена в v10 ещё работают, но выводят предупреждение об устаревании и будут удалены в v11. Если заданы оба имени, приоритет имеет новое:

```diff
- autoXvfb: false,
+ displayServerEnabled: false,
- xvfbAutoInstall: true,
+ displayServerAutoInstall: true,
- xvfbAutoInstallMode: 'sudo',
+ displayServerAutoInstallMode: 'sudo',
- xvfbAutoInstallCommand: 'my-install-command',
+ displayServerAutoInstallCommand: 'my-install-command',
```

`xvfbMaxRetries` и `xvfbRetryDelay` ни на что не влияют и также будут удалены в v11. Запуск больше не повторяется: если Weston не запускается, testrunner пробует Xvfb, а если не запускается ни один из них, прогон продолжается без дисплея.

Конфигурация, которая задаёт одну из четырёх переименованных опций без её замены и не задаёт `displayServer`, продолжает использовать Xvfb, как в v9. Если она не отключает сервер дисплея, она также выводит `Preferring Xvfb, as v9 did, because the config sets v9 display keys`. После переименования опций добавьте `displayServer: 'xvfb'`, чтобы сохранить Xvfb, или не указывайте его, чтобы предпочесть Weston. В автоматическом режиме пользовательская команда установки сначала выполняется для Weston и повторно для Xvfb только в том случае, если Weston всё ещё недоступен или не запускается, а Xvfb всё ещё отсутствует, поэтому задайте `displayServer` равным серверу, который она устанавливает, чтобы пропустить попытку для другого сервера.

Автоустановка больше не поддерживает `yum`, который v9 использовала на хостах без `dnf`. v10 распознаёт только `apt-get`, `dnf`, `zypper`, `pacman`, `apk` и `xbps-install`, поэтому на хосте только с `yum` установите Xvfb самостоятельно.

Массив `xvfbAutoInstallCommand` в v9 выполнялся через оболочку, поэтому элементы вроде `&&` или `VAR=value` работали. Теперь массивы выполняются без оболочки при любом имени опции, поэтому для синтаксиса оболочки используйте строку.

Другие изменения, которые вы можете заметить:

- Все воркеры используют один дисплей. В v9 у каждого воркера был собственный дисплей. Страницы Chrome и Edge теперь могут не иметь фокуса, см. [Фокус окна](/docs/headless-and-display-servers#window-focus).
- Номер дисплея Xvfb не фиксирован. Читайте его из `DISPLAY` вместо того, чтобы предполагать `:99`.
- Хост, на котором задан только `WAYLAND_DISPLAY`, теперь считается имеющим дисплей. v9 запускала воркеры там под Xvfb, поскольку `DISPLAY` не был задан. v10 ничего не запускает, открывает окна браузера в вашем композиторе и устанавливает `XDG_SESSION_TYPE`, `GDK_BACKEND` и `ELECTRON_OZONE_PLATFORM_HINT` в `wayland` на время прогона. Чтобы запускать их под Xvfb, как раньше, сбросьте `WAYLAND_DISPLAY` и задайте `displayServer: 'xvfb'`.
- Экран по умолчанию — 1920x1080. v9 использовала значение по умолчанию `xvfb-run`, которое составляет 1280x1024 в Debian и Ubuntu и 640x480 в Fedora, RHEL и Arch. Чтобы сохранить размер, который используют ваши эталонные снимки, задайте его в `displayServerWidth` и `displayServerHeight`.
- Браузеры выбирают Wayland или X11 по `XDG_SESSION_TYPE`, который устанавливает сервер дисплея. Под Weston WebdriverIO также добавляет `--ozone-platform=wayland` к запускаемым Chrome и Edge, поскольку Chrome и Edge до версии 140 (Chrome for Testing до 135) игнорируют `XDG_SESSION_TYPE`. Weston не предоставляет `DISPLAY`, поэтому если вашим тестам или инструментам нужен X11, задайте `displayServer: 'xvfb'`.
- Если вы использовали `XvfbManager` или экземпляр `xvfb` из `@wdio/xvfb` напрямую, используйте вместо них `DisplayServerManager` из `@wdio/display-server`. Там, где вы запускали `xvfb.init()` и оборачивали команды в `xvfb-run` или порождали процессы через `ProcessFactory`, запустите дисплей и передайте его окружение процессам, которым оно нужно. В примере используется Xvfb с разрешением 1280x1024, как в v9 на Debian и Ubuntu. На хосте, где задан только `WAYLAND_DISPLAY`, сначала сбросьте его, иначе `startDaemon()` ничего не запустит:

  ```js
  import { spawn } from 'node:child_process'
  import { once } from 'node:events'
  import { DisplayServerManager } from '@wdio/display-server'

  const manager = new DisplayServerManager({ displayServer: 'xvfb' })
  const daemon = await manager.startDaemon({ width: 1280, height: 1024 })
  // startDaemon() также возвращает null, если дисплей уже существует
  if (!daemon && manager.shouldRun()) {
      throw new Error('Xvfb could not be started')
  }
  try {
      const child = spawn('your-command', { shell: true, stdio: 'inherit', env: { ...process.env, ...daemon?.env } })
      const [code] = await once(child, 'exit')
      process.exitCode = code ?? 1
  } finally {
      await daemon?.stop()
  }
  ```

## Эмуляция

`browser.emulate()` управляет модулем эмуляции WebDriver BiDi для текущего контекста просмотра верхнего уровня. v9 внедряла preload-скрипт, который подменял `navigator.geolocation.getCurrentPosition`, `navigator.userAgent`, `window.matchMedia` и `navigator.onLine`. Эти скрипты удалены. `browser.emulate('clock', …)` по-прежнему устанавливает фальшивые таймеры на текущей странице и на страницах, открытых после этого.

Для областей BiDi перезагрузка больше не требуется.

```diff
  await browser.emulate('onLine', false)
- // изменился только `navigator.onLine`; трафик по-прежнему шёл
+ // контекст просмотра офлайн, включая fetch, WebSocket и WebTransport
```

- `onLine: false` вызывает `emulation.setNetworkConditions` с `{ type: 'offline' }`. `true` и восстановление области сбрасывают это. Пропускная способность и задержка по-прежнему задаются через `browser.throttleNetwork()`.
- `colorScheme` устанавливает медиа-функцию `prefers-color-scheme`, поэтому CSS `@media (prefers-color-scheme)` следует за `matchMedia`.
- `userAgent` — это переопределение user-agent браузера, а не подменённое свойство `navigator.userAgent`.
- `geolocation` использует стек геолокации браузера. Странице всё ещё может понадобиться `browser.setPermissions({ name: 'geolocation' }, 'granted')`. `{ error: 'positionUnavailable' }` сообщает об этой ошибке вместо координат.
- `colorScheme` и `media` используют одну общую карту медиа-функций. Более поздний вызов заменяет всю карту, а восстановление любой из областей очищает её.
- `device` устанавливает user agent, область просмотра, сенсорный ввод, мобильную раскладку текста и viewport meta из дескриптора устройства. Он не изменяет `screen` или `orientation`.

Новые области: `media`, `locale`, `timezone`, `touch`, `orientation`, `screen`, `viewportMeta`, `textLayout`, `scripting`, `scrollbar` и `forcedColors`. Браузер, который не реализует команду, отклоняет вызов со своей ошибкой (`unknown command` или `unsupported operation`). WebdriverIO не откатывается на preload-скрипт или CDP. Если `device` отклоняется на полпути, восстанавливаются прежние user agent, область просмотра, сенсорный ввод, раскладка текста и viewport meta.

`wdio session emulate` принимает те же области. Он больше не предлагает перезагрузить страницу для переопределения, которое применяется немедленно. Пресеты `emulate network` и `emulate cpu` не изменились и по-прежнему работают только в Chromium. См. [Эмуляция](/docs/emulation).

## Следующие шаги

- Скопируйте [навык миграции](#migrate-with-a-coding-agent) в проект и попросите агента применить его.
- [WebdriverIO для ИИ-агентов](/docs/ai-agents) — для написания новых тестов на v10.
- [Headless-режим и серверы дисплея](/docs/headless-and-display-servers) — если набор тестов запускается в Linux.